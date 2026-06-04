/**
 * L06 交互页统一本地朗读（file:// 优先 manifest MP3）
 */
(function (global) {
  "use strict";

  function norm(s) {
    return String(s || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function playL06Local(text) {
    var t = norm(text);
    if (!t) return Promise.resolve(false);

    if (global.LessonTTSBootstrap && typeof global.LessonTTSBootstrap.playLocalIfAvailable === "function") {
      return global.LessonTTSBootstrap.playLocalIfAvailable(t).then(function (ok) {
        if (ok) return true;
        return tryDirectRel(t);
      });
    }
    return tryDirectRel(t);
  }

  function tryDirectRel(t) {
    if (typeof global.playLocalMp3Url !== "function" || !global.__LESSON_TTS_MANIFEST) {
      return Promise.resolve(false);
    }
    var m = global.__LESSON_TTS_MANIFEST;
    var rel = m[t] || m[norm(t)];
    if (!rel) return Promise.resolve(false);
    return global.playLocalMp3Url(rel).then(function (ok) {
      return !!ok;
    });
  }

  global.playL06Local = playL06Local;
})(typeof window !== "undefined" ? window : globalThis);
