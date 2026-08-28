/**
 * 国家地理复习游戏 · Azure TTS 增强层
 * 在 LocalAudio 之后自动回退到 Azure Speech SDK，再回退浏览器朗读
 */
(function (global) {
  "use strict";

  var AZURE = {
    subscriptionKey: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
    region: "southeastasia",
    language: "en-GB",
    voice: "en-GB-RyanNeural",
    speechRate: "0.90",
  };

  var sdkReady = null;
  var playbackGen = 0;
  var playbackAudio = null;

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

  function buildSsml(text, slow) {
    var rate = slow ? "0.80" : AZURE.speechRate;
    return (
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' +
      AZURE.language +
      '"><voice name="' +
      AZURE.voice +
      '"><prosody rate="' +
      rate +
      '">' +
      escapeSsml(text) +
      "</prosody></voice></speak>"
    );
  }

  function stopPlayback() {
    playbackGen += 1;
    if (!playbackAudio) return;
    try {
      playbackAudio.onended = null;
      playbackAudio.onerror = null;
      playbackAudio.pause();
      playbackAudio.removeAttribute("src");
      playbackAudio.load();
    } catch (e0) {}
    playbackAudio = null;
  }

  function playAudioData(data, mime, gen) {
    return new Promise(function (resolve) {
      if (gen !== playbackGen) {
        resolve(false);
        return;
      }
      if (!data || !data.byteLength) {
        resolve(false);
        return;
      }
      var blob = new Blob([data], { type: mime || "audio/wav" });
      var url = URL.createObjectURL(blob);
      var audio = new Audio();
      playbackAudio = audio;
      var settled = false;
      function finish(ok) {
        if (settled) return;
        settled = true;
        if (playbackAudio === audio) playbackAudio = null;
        try {
          URL.revokeObjectURL(url);
        } catch (e1) {}
        resolve(!!ok && gen === playbackGen);
      }
      audio.onended = function () {
        finish(true);
      };
      audio.onerror = function () {
        finish(false);
      };
      audio.src = url;
      var p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          finish(false);
        });
      }
    });
  }

  function browserSpeak(text, options) {
    options = options || {};
    if (!global.speechSynthesis) return Promise.resolve(false);
    return new Promise(function (resolve) {
      try {
        global.speechSynthesis.cancel();
      } catch (e0) {}
      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = "en-GB";
      u.rate = options.slow ? 0.82 : 0.9;
      u.onend = function () {
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
    var slow = !!options.slow;
    var onDone = options.onDone;
    var ssml = buildSsml(text, slow);
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

  /**
   * 合成后用 Audio 播放，Promise 在整段播完（onended）才结束。
   * 用于逐层朗读：上一层结束再读下一层。
   */
  function azureSpeakPlayback(text, options) {
    options = options || {};
    var slow = !!options.slow;
    var onDone = options.onDone;
    var myGen = playbackGen + 1;
    stopPlayback();
    myGen = playbackGen;
    var ssml = buildSsml(text, slow);
    return loadSdk()
      .then(function () {
        if (myGen !== playbackGen) return false;
        var sdk = global.SpeechSDK;
        var cfg = sdk.SpeechConfig.fromSubscription(AZURE.subscriptionKey, AZURE.region);
        cfg.speechSynthesisVoiceName = AZURE.voice;
        if (sdk.SpeechSynthesisOutputFormat && sdk.SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm != null) {
          cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm;
        }
        var synthesizer = new sdk.SpeechSynthesizer(cfg, null);
        return new Promise(function (resolve) {
          synthesizer.speakSsmlAsync(
            ssml,
            function (result) {
              try {
                synthesizer.close();
              } catch (e3) {}
              if (myGen !== playbackGen) {
                if (onDone) onDone();
                resolve(false);
                return;
              }
              var data = result && result.audioData;
              playAudioData(data, "audio/wav", myGen).then(function (ok) {
                if (ok) {
                  if (onDone) onDone();
                  resolve(true);
                  return;
                }
                browserSpeak(text, options).then(function (ok2) {
                  if (onDone) onDone();
                  resolve(ok2);
                });
              });
            },
            function () {
              try {
                synthesizer.close();
              } catch (e4) {}
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
    var orig = api.speak ? api.speak.bind(api) : null;
    var origStop = api.stop ? api.stop.bind(api) : null;
    api.speak = function (text, options) {
      options = options || {};
      var onDone = options.onDone;
      stopPlayback();
      if (origStop) origStop();
      try {
        if (global.speechSynthesis) global.speechSynthesis.cancel();
      } catch (e3) {}
      if (orig) {
        return orig(text, options).then(function (ok) {
          if (ok) return true;
          return azureSpeak(text, { slow: options.slow, onDone: onDone });
        });
      }
      return azureSpeak(text, { slow: options.slow, onDone: onDone });
    };
    api.stop = function () {
      stopPlayback();
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
    speakPlayback: azureSpeakPlayback,
    stopPlayback: stopPlayback,
    AZURE: AZURE,
  };
})(typeof window !== "undefined" ? window : this);
