/**
 * Hello, penguins! · 本地 MP3 + Azure 英音男声（en-GB-RyanNeural）
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
    var rate = slow ? "0.80" : AZURE.speechRate;
    var ssml =
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' +
      AZURE.language +
      '"><voice name="' +
      AZURE.voice +
      '"><prosody rate="' +
      rate +
      '">' +
      escapeSsml(text) +
      "</prosody></voice></speak>";
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

  function enhance(api) {
    if (!api || api.__azureEnhanced) return api;
    var orig = api.speak ? api.speak.bind(api) : null;
    var origStop = api.stop ? api.stop.bind(api) : null;
    api.speak = function (text, options) {
      options = options || {};
      var onDone = options.onDone;
      var azureOnly = !!options.azureOnly;
      if (origStop) origStop();
      try {
        if (global.speechSynthesis) global.speechSynthesis.cancel();
      } catch (e3) {}
      if (azureOnly || !orig) {
        return azureSpeak(text, { slow: options.slow, onDone: onDone });
      }
      return orig(text, options).then(function (ok) {
        if (ok) return true;
        return azureSpeak(text, { slow: options.slow, onDone: onDone });
      });
    };
    api.stop = function () {
      if (origStop) origStop();
      try {
        if (global.speechSynthesis) global.speechSynthesis.cancel();
      } catch (e4) {}
    };
    api.voice = (api.voice || "en-GB") + " + Azure";
    api.__azureEnhanced = true;
    return api;
  }

  if (!global.LocalAudio || !global.__LOCAL_AUDIO_MANIFEST) {
    console.error("请先加载 audio-manifest.js 与 local-audio.js");
    return;
  }

  global.LocalAudio.createApi("HelloPenguinsTTS");
  if (global.HelloPenguinsTTS) {
    enhance(global.HelloPenguinsTTS);
  }

  global.HelloPenguinsAzureTTS = { speak: azureSpeak, AZURE: AZURE, enhance: enhance };
})(typeof window !== "undefined" ? window : this);
