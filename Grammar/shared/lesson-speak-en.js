/**
 * 课件英文朗读：仅 manifest 本地 MP3（相对路径）。
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

  function playLocalFirst(text) {
    var t = normEn(text);
    if (!t) return Promise.resolve(false);

    if (global.LessonTTSBootstrap && typeof global.LessonTTSBootstrap.playLocalIfAvailable === "function") {
      return global.LessonTTSBootstrap.playLocalIfAvailable(t);
    }

    var m = global.__LESSON_TTS_MANIFEST;
    var rel = m && (m[t] || m[text]);
    if (rel && typeof global.playLocalMp3Url === "function") {
      return global.playLocalMp3Url(String(rel).replace(/\\/g, "/"));
    }

    if (typeof global.playLessonAzureTtsPlain === "function") {
      return global.playLessonAzureTtsPlain(t);
    }

    return Promise.resolve(false);
  }

  global.__lessonSpeakLocalFirst = playLocalFirst;
  global.lessonSpeakEn = playLocalFirst;
})();
