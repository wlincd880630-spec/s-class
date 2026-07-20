/**
 * 全课统一：朗读优先 manifest 本地 MP3；失败时 Azure（http）→ 浏览器 Speech。
 * 须在 play-local-mp3.js 之后引入。
 */
(function (global) {
  "use strict";
  if (!global) return;

  global.__LESSON_TTS_LOCAL_ONLY__ = true;

  function norm(s) {
    return String(s || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function playLocalText(text) {
    var t = norm(text);
    if (!t) return Promise.resolve(false);
    if (global.LessonTTSBootstrap && typeof global.LessonTTSBootstrap.playLocalOnly === "function") {
      return global.LessonTTSBootstrap.playLocalOnly(t);
    }
    if (typeof global.playLessonL07LocalTts === "function") {
      return global.playLessonL07LocalTts(t);
    }
    if (typeof global.playLocalMp3Url === "function" && global.__LESSON_TTS_MANIFEST) {
      var m = global.__LESSON_TTS_MANIFEST;
      var rel = m[t] || m[text];
      if (rel) return global.playLocalMp3Url(rel);
    }
    return Promise.resolve(false);
  }

  function playAzureText(text) {
    if (typeof global.playLessonAzureTtsPlain === "function") {
      return global.playLessonAzureTtsPlain(norm(text));
    }
    return Promise.resolve(false);
  }

  function playBrowserSpeech(utterance, text) {
    if (!global.speechSynthesis || !global.speechSynthesis.__lessonOrigSpeak) return Promise.resolve(false);
    return new Promise(function (resolve) {
      var u =
        utterance && utterance instanceof SpeechSynthesisUtterance
          ? utterance
          : new SpeechSynthesisUtterance(text);
      if (!u.lang) u.lang = "en-GB";
      u.onend = function () {
        resolve(true);
      };
      u.onerror = function () {
        resolve(false);
      };
      try {
        global.speechSynthesis.__lessonOrigSpeak(u);
      } catch (e) {
        resolve(false);
      }
    });
  }

  function playLocalTextWarn(text, utterance) {
    return playLocalText(text).then(function (ok) {
      if (ok) return true;
      return playAzureText(text).then(function (azureOk) {
        if (azureOk) return true;
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[LessonTTS] 本地/Azure 均未命中，尝试浏览器朗读:", norm(text).slice(0, 120));
        }
        return playBrowserSpeech(utterance, norm(text));
      });
    });
  }

  function hijackSpeechSynthesis() {
    if (!global.speechSynthesis || global.speechSynthesis.__lessonLocalHijacked) return;
    var synth = global.speechSynthesis;
    var origSpeak = synth.speak.bind(synth);
    synth.__lessonOrigSpeak = origSpeak;
    synth.speak = function (utterance) {
      var text = utterance && String(utterance.text || "").trim();
      if (!text) {
        try {
          origSpeak(utterance);
        } catch (e) {}
        return;
      }
      playLocalTextWarn(text, utterance);
    };
    synth.__lessonLocalHijacked = true;
  }

  global.LessonSpeakLocal = {
    norm: norm,
    play: playLocalTextWarn,
    playEnglish: playLocalTextWarn,
    playText: playLocalTextWarn,
  };

  if (!global.LessonSpeak) {
    global.LessonSpeak = global.LessonSpeakLocal;
  }

  if (global.document && global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", hijackSpeechSynthesis);
  } else {
    hijackSpeechSynthesis();
  }
})();
