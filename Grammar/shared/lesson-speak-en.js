/**
 * 课件英文朗读：manifest 本地 MP3 → Azure → 浏览器 Speech。
 */
(function (global) {
  "use strict";
  if (!global) return;

  function normEn(s) {
    return String(s || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function playBrowserSpeech(text) {
    if (!global.speechSynthesis) return Promise.resolve(false);
    var speakFn = global.speechSynthesis.__lessonOrigSpeak || global.speechSynthesis.speak.bind(global.speechSynthesis);
    return new Promise(function (resolve) {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.onend = function () {
        resolve(true);
      };
      u.onerror = function () {
        resolve(false);
      };
      try {
        speakFn(u);
      } catch (e) {
        resolve(false);
      }
    });
  }

  function playLocalFirst(text) {
    var t = normEn(text);
    if (!t) return Promise.resolve(false);

    if (global.LessonTTSBootstrap && typeof global.LessonTTSBootstrap.playLocalIfAvailable === "function") {
      return global.LessonTTSBootstrap.playLocalIfAvailable(t);
    }

    var m = global.__LESSON_TTS_MANIFEST;
    var rel = m && (m[t] || m[text]);
    if (!rel && global.L03AudioManifest && global.L03AudioManifest.entries) {
      rel = global.L03AudioManifest.entries[t] || global.L03AudioManifest.entries[text];
    }
    if (rel && typeof global.playLocalMp3Url === "function") {
      return global.playLocalMp3Url(String(rel).replace(/\\/g, "/"));
    }

    if (typeof global.playLessonAzureTtsPlain === "function") {
      return global.playLessonAzureTtsPlain(t);
    }

    return playBrowserSpeech(t);
  }

  function playLocalFirstChain(text) {
    return playLocalFirst(text).then(function (ok) {
      if (ok) return true;
      if (typeof global.playLessonAzureTtsPlain === "function") {
        return global.playLessonAzureTtsPlain(normEn(text));
      }
      return playBrowserSpeech(normEn(text));
    });
  }

  global.__lessonSpeakLocalFirst = playLocalFirstChain;
  global.lessonSpeakEn = playLocalFirstChain;
  global.speakLessonEnglish = playLocalFirstChain;
})();
