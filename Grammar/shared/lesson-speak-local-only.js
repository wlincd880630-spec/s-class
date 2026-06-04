/**

 * 全课统一：朗读仅走本地 manifest MP3（file:// 不请求 Azure / 不用浏览器朗读）。

 * 须在 play-local-mp3.js 之后、lesson-tts-azure-play.js 之前引入。

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

    if (global.LessonTTSBootstrap && typeof global.LessonTTSBootstrap.playLocalIfAvailable === "function") {

      return global.LessonTTSBootstrap.playLocalIfAvailable(t);

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



  function playLocalTextWarn(text) {

    return playLocalText(text).then(function (ok) {

      if (!ok && typeof console !== "undefined" && console.warn) {

        console.warn("[LessonTTS] 本地 MP3 未找到:", norm(text).slice(0, 120));

      }

      return ok;

    });

  }



  function hijackSpeechSynthesis() {

    if (!global.speechSynthesis || global.speechSynthesis.__lessonLocalHijacked) return;

    var synth = global.speechSynthesis;

    var origSpeak = synth.speak.bind(synth);

    synth.speak = function (utterance) {

      var text = utterance && String(utterance.text || "").trim();

      if (!text) {

        try {

          origSpeak(utterance);

        } catch (e) {}

        return;

      }

      playLocalTextWarn(text);

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


