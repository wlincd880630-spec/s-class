/**
 * Phonics Lab TTS
 * 单词：Azure Neural 整词朗读
 * 单音素：SSML <phoneme alphabet="ipa|ups|sapi"> 隔离发音
 *         内文用中点，避免引擎忽略 ph 后把 thhh / 字母名读出来
 *         全失败再读例词，绝不回退 stretch
 * 拼读：音素序列 + 整词
 * 失败时回退 Web Speech API
 */
(function (global) {
  "use strict";

  var AZURE = {
    subscriptionKey: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
    region: "southeastasia",
    language: "en-GB",
    voice: "en-GB-RyanNeural",
    phonemeVoice: "en-GB-SoniaNeural",
    rate: "0.92"
  };

  var sdkReady = null;
  var currentSynth = null;

  function loadSdk() {
    if (global.SpeechSDK) return Promise.resolve(global.SpeechSDK);
    if (sdkReady) return sdkReady;
    sdkReady = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://aka.ms/csspeech/jsbrowserpackageraw";
      s.onload = function () {
        resolve(global.SpeechSDK);
      };
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

  function wrapSpeak(inner, voice) {
    return (
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" ' +
      'xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="' +
      AZURE.language +
      '"><voice name="' +
      (voice || AZURE.voice) +
      '">' +
      inner +
      "</voice></speak>"
    );
  }

  function browserSpeak(text, rate) {
    if (!text || !global.speechSynthesis) return Promise.resolve(false);
    return new Promise(function (resolve) {
      try {
        global.speechSynthesis.cancel();
      } catch (e0) {}
      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = "en-GB";
      u.rate = rate || 0.88;
      u.onend = function () {
        resolve(true);
      };
      u.onerror = function () {
        resolve(false);
      };
      global.speechSynthesis.speak(u);
    });
  }

  function speakSsml(ssml, fallbackText) {
    return loadSdk()
      .then(function (sdk) {
        var cfg = sdk.SpeechConfig.fromSubscription(AZURE.subscriptionKey, AZURE.region);
        cfg.speechSynthesisVoiceName = AZURE.voice;
        cfg.speechSynthesisOutputFormat =
          sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
        if (currentSynth) {
          try {
            currentSynth.close();
          } catch (e1) {}
        }
        var synthesizer = new sdk.SpeechSynthesizer(
          cfg,
          sdk.AudioConfig.fromDefaultSpeakerOutput()
        );
        currentSynth = synthesizer;
        return new Promise(function (resolve) {
          synthesizer.speakSsmlAsync(
            ssml,
            function (result) {
              try {
                synthesizer.close();
              } catch (e2) {}
              currentSynth = null;
              var ok =
                result &&
                result.reason === sdk.ResultReason.SynthesizingAudioCompleted;
              if (ok) resolve(true);
              else browserSpeak(fallbackText || "").then(resolve);
            },
            function () {
              try {
                synthesizer.close();
              } catch (e3) {}
              currentSynth = null;
              browserSpeak(fallbackText || "").then(resolve);
            }
          );
        });
      })
      .catch(function () {
        return browserSpeak(fallbackText || "");
      });
  }

  function stop() {
    if (currentSynth) {
      try {
        currentSynth.close();
      } catch (e4) {}
      currentSynth = null;
    }
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (e5) {}
  }

  function speakWord(text, options) {
    options = options || {};
    stop();
    var rate = options.slow ? "0.72" : AZURE.rate;
    var inner =
      '<prosody rate="' +
      rate +
      '">' +
      escapeSsml(text) +
      "</prosody>";
    return speakSsml(wrapSpeak(inner, AZURE.voice), text);
  }

  function phonemeSsmlBody(ph, alphabet) {
    var code =
      alphabet === "ups"
        ? ph.azureUps
        : alphabet === "sapi"
        ? ph.azureSapi
        : ph.azureIsolate || ph.azureIpa;
    if (!code) return "";
    var pause = ph.holdable ? "300ms" : "80ms";
    var rate = ph.holdable ? "-18%" : "-30%";
    return (
      '<mstts:silence type="Leading-exact" value="50ms"/>' +
      '<prosody rate="' +
      rate +
      '" volume="+20%">' +
      '<phoneme alphabet="' +
      alphabet +
      '" ph="' +
      escapeSsml(code) +
      '">·</phoneme>' +
      "</prosody>" +
      '<break time="' +
      pause +
      '"/>'
    );
  }

  function speakPhoneme() {
    return Promise.resolve(false);
  }

  function speakPhonemeThenWord(id) {
    var ph = global.PHONEMES && global.PHONEMES[id];
    return speakWord(ph ? ph.keyword : id, { slow: true });
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function speakBlend(phonemeIds, word) {
    if (!word) return Promise.resolve(false);
    return speakWord(word, { slow: true }).then(function () {
      return wait(200);
    }).then(function () {
      return speakWord(word);
    });
  }

  function speakLetterName(letter) {
    return speakWord(letter);
  }

  global.PhonicsTTS = {
    AZURE: AZURE,
    loadSdk: loadSdk,
    stop: stop,
    speakWord: speakWord,
    speakPhoneme: speakPhoneme,
    speakPhonemeThenWord: speakPhonemeThenWord,
    speakBlend: speakBlend,
    speakLetterName: speakLetterName
  };
})(typeof window !== "undefined" ? window : this);
