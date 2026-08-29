/**
 * 国家地理复习游戏 · Azure TTS 增强层
 * 在 LocalAudio 之后自动回退到 Azure Speech SDK，再回退浏览器朗读
 *
 * 学课文「选慢 / 选正常」必须是两档明显不同的语速：
 * 慢速 0.70，正常 1.00（不再用 0.80 对 0.90，听起来几乎一样）。
 */
(function (global) {
  "use strict";

  var AZURE = {
    subscriptionKey: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
    region: "southeastasia",
    language: "en-GB",
    voice: "en-GB-RyanNeural",
    speechRate: "1.00",
    slowRate: "0.70",
  };

  var RATE_SLOW = 0.7;
  var RATE_NORMAL = 1;
  var sdkReady = null;
  var localBase = "";
  var rateAudio = null;
  var rateGen = 0;

  function loadSdk() {
    if (global.SpeechSDK) return Promise.resolve();
    if (sdkReady) return sdkReady;
    sdkReady = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://aka.ms/csspeech/jsbrowserpackageraw";
      s.onload = resolve;
      s.onerror = function () {
        reject(new Error("Speech SDK load failed"));
      };
      document.head.appendChild(s);
    });
    return sdkReady;
  }

  function escapeSsml(t) {
    return String(t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function resolveTargetRate(options) {
    options = options || {};
    if (options.rate != null && !isNaN(parseFloat(String(options.rate)))) {
      return parseFloat(String(options.rate)) < 0.88 ? RATE_SLOW : RATE_NORMAL;
    }
    return options.slow ? RATE_SLOW : RATE_NORMAL;
  }

  function storyOpts(slow) {
    return slow ? { rate: RATE_SLOW, slow: true } : { rate: RATE_NORMAL, slow: false };
  }

  function rememberSpeak(source, rate, text) {
    global.NgAzureTTS.lastSpeak = {
      source: source,
      rate: rate,
      slow: rate < 0.88,
      text: String(text || ""),
    };
  }

  function normalizeText(text) {
    return String(text)
      .replace(/[\u2018\u2019\u201A\uFF07]/g, "'")
      .replace(/\r\n/g, " ")
      .trim();
  }

  function textVariants(text) {
    var t = normalizeText(text);
    var out = [];
    function add(x) {
      if (x && out.indexOf(x) < 0) out.push(x);
    }
    add(t);
    add(t.toLowerCase());
    add(t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
    return out;
  }

  function findLocalClip(text, targetRate) {
    var m = global.__LOCAL_AUDIO_MANIFEST;
    if (!m || !m.lookup) return null;
    var preferred = targetRate < 0.88 ? ["0.80", "0.90", "0.92"] : ["0.90", "0.92", "0.80"];
    var texts = textVariants(text);
    var i, j, key, rel;
    for (j = 0; j < preferred.length; j++) {
      for (i = 0; i < texts.length; i++) {
        key = texts[i] + "|" + preferred[j];
        rel = m.lookup[key];
        if (rel) return { rel: rel, sourceRate: parseFloat(preferred[j]) };
      }
    }
    return null;
  }

  function detectLocalBase() {
    if (localBase) return localBase;
    var scripts = document.getElementsByTagName("script");
    var i, src;
    for (i = 0; i < scripts.length; i++) {
      src = scripts[i].src || "";
      if (/local-audio\.js(\?|$)/i.test(src)) {
        try {
          return new URL("./", src).href;
        } catch (e0) {}
      }
    }
    return "";
  }

  function buildAudioUrl(base, rel) {
    var parts = String(rel).split("/").filter(Boolean);
    var encoded = parts.map(function (p) {
      return encodeURIComponent(p);
    });
    try {
      return new URL(encoded.join("/"), base).href;
    } catch (e) {
      return base.replace(/\/?$/, "/") + encoded.join("/");
    }
  }

  function stopRateAudio() {
    rateGen++;
    if (rateAudio) {
      try {
        rateAudio.pause();
        rateAudio.src = "";
      } catch (e1) {}
      rateAudio = null;
    }
  }

  function playLocalWithRate(text, targetRate) {
    var clip = findLocalClip(text, targetRate);
    var base = detectLocalBase();
    if (!clip || !base) return Promise.resolve(false);
    var url = buildAudioUrl(base, clip.rel);
    var playback = targetRate / (clip.sourceRate || 1);
    playback = Math.max(0.5, Math.min(1.5, playback));
    var gen = rateGen;
    return new Promise(function (resolve) {
      if (gen !== rateGen) {
        resolve(false);
        return;
      }
      var a = new Audio();
      rateAudio = a;
      a.preload = "auto";
      a.playbackRate = playback;
      a.onended = function () {
        if (rateAudio === a) rateAudio = null;
        resolve(gen === rateGen);
      };
      a.onerror = function () {
        if (rateAudio === a) rateAudio = null;
        resolve(false);
      };
      a.src = url;
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          resolve(false);
        });
      }
    }).then(function (ok) {
      if (ok) rememberSpeak("local", targetRate, text);
      return ok;
    });
  }

  function browserSpeak(text, options) {
    options = options || {};
    if (!global.speechSynthesis) return Promise.resolve(false);
    var rate = resolveTargetRate(options);
    return new Promise(function (resolve) {
      try {
        global.speechSynthesis.cancel();
      } catch (e0) {}
      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = "en-GB";
      u.rate = rate;
      u.onend = function () {
        rememberSpeak("browser", rate, text);
        resolve(true);
      };
      u.onerror = function () {
        resolve(false);
      };
      global.speechSynthesis.speak(u);
    });
  }

  function azureSpeak(text, options) {
    options = options || {};
    var onDone = options.onDone;
    var rate = resolveTargetRate(options);
    var rateStr = rate < 0.88 ? AZURE.slowRate : AZURE.speechRate;
    var ssml =
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' +
      AZURE.language +
      '"><voice name="' +
      AZURE.voice +
      '"><prosody rate="' +
      rateStr +
      '">' +
      escapeSsml(text) +
      "</prosody></voice></speak>";
    global.NgAzureTTS.lastSsml = ssml;
    return loadSdk()
      .then(function () {
        var sdk = global.SpeechSDK;
        var cfg = sdk.SpeechConfig.fromSubscription(AZURE.subscriptionKey, AZURE.region);
        cfg.speechSynthesisVoiceName = AZURE.voice;
        var synthesizer = new sdk.SpeechSynthesizer(cfg, sdk.AudioConfig.fromDefaultSpeakerOutput());
        return new Promise(function (resolve) {
          synthesizer.speakSsmlAsync(
            ssml,
            function () {
              try {
                synthesizer.close();
              } catch (e1) {}
              rememberSpeak("azure", rate, text);
              if (onDone) onDone();
              resolve(true);
            },
            function () {
              try {
                synthesizer.close();
              } catch (e2) {}
              browserSpeak(text, options).then(function (ok) {
                if (onDone) onDone();
                resolve(ok);
              });
            }
          );
        });
      })
      .catch(function () {
        return browserSpeak(text, options).then(function (ok) {
          if (onDone) onDone();
          return ok;
        });
      });
  }

  function enhance(apiName) {
    var api = global[apiName];
    if (!api || api.__azureEnhanced) return;
    var origStop = api.stop ? api.stop.bind(api) : null;
    var origSetBase = api.setBase ? api.setBase.bind(api) : null;
    if (origSetBase) {
      api.setBase = function (b) {
        if (b) localBase = b;
        return origSetBase(b);
      };
    } else {
      api.setBase = function (b) {
        if (b) localBase = b;
      };
    }
    api.speak = function (text, options) {
      options = options || {};
      var onDone = options.onDone;
      var rate = resolveTargetRate(options);
      if (origStop) origStop();
      stopRateAudio();
      try {
        if (global.speechSynthesis) global.speechSynthesis.cancel();
      } catch (e3) {}
      return playLocalWithRate(text, rate).then(function (ok) {
        if (ok) {
          if (onDone) onDone();
          return true;
        }
        return azureSpeak(text, { rate: rate, slow: rate < 0.88, onDone: onDone });
      });
    };
    api.stop = function () {
      stopRateAudio();
      if (origStop) origStop();
      try {
        if (global.speechSynthesis) global.speechSynthesis.cancel();
      } catch (e4) {}
    };
    api.voice = (api.voice || "en-GB") + " + Azure";
    api.__azureEnhanced = true;
  }

  global.NgAzureTTS = {
    enhance: enhance,
    speak: azureSpeak,
    AZURE: AZURE,
    storyOpts: storyOpts,
    resolveTargetRate: resolveTargetRate,
    lastSpeak: null,
    lastSsml: "",
  };
})(typeof window !== "undefined" ? window : this);
