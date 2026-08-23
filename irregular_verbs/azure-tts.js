/**
 * 不规则动词模块 · Azure 英式慢速男声 TTS
 * en-GB-RyanNeural · rate 0.85
 */
(function (global) {
  "use strict";

  var AZURE = {
    subscriptionKey: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
    region: "southeastasia",
    language: "en-GB",
    voice: "en-GB-RyanNeural",
    speechRate: "0.85",
  };

  var sdkReady = null;
  var currentSynth = null;

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

  function stop() {
    try {
      if (currentSynth) {
        currentSynth.close();
        currentSynth = null;
      }
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (e) {}
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
      u.rate = options.slow ? 0.75 : 0.85;
      u.onend = function () {
        resolve(true);
      };
      u.onerror = function () {
        resolve(false);
      };
      global.speechSynthesis.speak(u);
    });
  }

  function speak(text, options) {
    options = options || {};
    var raw = String(text || "").trim();
    if (!raw) return Promise.resolve(false);
    stop();
    var rate = options.slow ? "0.75" : AZURE.speechRate;
    var ssml =
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' +
      AZURE.language +
      '"><voice name="' +
      AZURE.voice +
      '"><prosody rate="' +
      rate +
      '">' +
      escapeSsml(raw) +
      "</prosody></voice></speak>";
    return loadSdk()
      .then(function () {
        var sdk = global.SpeechSDK;
        var cfg = sdk.SpeechConfig.fromSubscription(AZURE.subscriptionKey, AZURE.region);
        cfg.speechSynthesisVoiceName = AZURE.voice;
        var synthesizer = new sdk.SpeechSynthesizer(cfg, sdk.AudioConfig.fromDefaultSpeakerOutput());
        currentSynth = synthesizer;
        return new Promise(function (resolve) {
          synthesizer.speakSsmlAsync(
            ssml,
            function () {
              try {
                synthesizer.close();
              } catch (e1) {}
              if (currentSynth === synthesizer) currentSynth = null;
              if (options.onDone) options.onDone();
              resolve(true);
            },
            function () {
              try {
                synthesizer.close();
              } catch (e2) {}
              if (currentSynth === synthesizer) currentSynth = null;
              browserSpeak(raw, options).then(function (ok) {
                if (options.onDone) options.onDone();
                resolve(ok);
              });
            }
          );
        });
      })
      .catch(function () {
        return browserSpeak(raw, options).then(function (ok) {
          if (options.onDone) options.onDone();
          return ok;
        });
      });
  }

  global.IrregularVerbsTTS = { speak: speak, stop: stop, AZURE: AZURE };
})(typeof window !== "undefined" ? window : this);
