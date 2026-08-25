/**
 * Phonics Lab TTS
 * 单词：Azure Neural 整词朗读
 * 单音素：SSML <phoneme alphabet="ipa|sapi"> 隔离发音
 *         可拉长音辅以 stretch 回退；爆破音短促截断
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
    if (!global.speechSynthesis) return Promise.resolve(false);
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

  function phonemeInner(ph, useSapi) {
    var alphabet = useSapi ? "sapi" : "ipa";
    var code = useSapi ? ph.azureSapi : ph.azureIpa;
    var visible = ph.holdable ? ph.stretch || ph.graphemes[0] : ph.graphemes[0];
    var pause = ph.holdable ? "280ms" : "120ms";
    return (
      '<mstts:silence type="Leading-exact" value="80ms"/>' +
      '<prosody rate="-15%" volume="+20%">' +
      '<phoneme alphabet="' +
      alphabet +
      '" ph="' +
      escapeSsml(code) +
      '">' +
      escapeSsml(visible) +
      "</phoneme>" +
      "</prosody>" +
      '<break time="' +
      pause +
      '"/>'
    );
  }

  function speakPhoneme(id, options) {
    options = options || {};
    stop();
    var ph = global.PHONEMES && global.PHONEMES[id];
    if (!ph) return speakWord(id);
    var inner = phonemeInner(ph, !!options.sapi);
    var ssml = wrapSpeak(inner, AZURE.phonemeVoice);
    return speakSsml(ssml, ph.stretch || ph.graphemes[0]).then(function (ok) {
      if (ok || options.sapi) return ok;
      var retry = wrapSpeak(phonemeInner(ph, true), AZURE.phonemeVoice);
      return speakSsml(retry, ph.stretch || ph.graphemes[0]);
    });
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function speakBlend(phonemeIds, word, options) {
    options = options || {};
    var gap = options.gap || 420;
    var chain = Promise.resolve();
    (phonemeIds || []).forEach(function (pid) {
      chain = chain.then(function () {
        return speakPhoneme(pid).then(function () {
          return wait(gap);
        });
      });
    });
    if (word) {
      chain = chain.then(function () {
        return wait(180);
      }).then(function () {
        return speakWord(word, { slow: true });
      });
    }
    return chain;
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
    speakBlend: speakBlend,
    speakLetterName: speakLetterName
  };
})(typeof window !== "undefined" ? window : this);
