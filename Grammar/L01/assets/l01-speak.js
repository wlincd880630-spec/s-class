/**
 * L01 课件朗读：仅 manifest 本地 MP3（file:// 用 playLocalMp3Url）。
 */
(function (global) {
  "use strict";
  if (!global) return;

  function norm(s) {
    if (global.LessonTTSBootstrap && global.LessonTTSBootstrap.norm) {
      return global.LessonTTSBootstrap.norm(s);
    }
    return String(s || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function lookupRel(text) {
    var t = norm(text);
    if (!t) return "";
    if (global.LessonTTSBootstrap && global.LessonTTSBootstrap.lookupUrl) {
      return global.LessonTTSBootstrap.lookupUrl(t);
    }
    var m = global.__LESSON_TTS_MANIFEST || {};
    return m[t] || m[text] || m[String(text || "").trim()] || "";
  }

  /**
   * @param {string} text
   * @returns {Promise<void>}
   */
  function speak(text) {
    return new Promise(function (resolve, reject) {
      var t = norm(text);
      if (!t) {
        resolve();
        return;
      }

      function done(ok) {
        if (ok) {
          resolve();
          return;
        }
        var rel = lookupRel(t);
        reject(
          new Error(
            rel
              ? "本地 MP3 无法播放。请确认存在文件：\n" +
                  rel +
                  "\n（若用 Chrome 打开，请刷新后重试；仍不行可用 Edge，或运行 scripts/start-local-preview.bat 用 http://localhost 打开）"
              : "未在 manifest 中配置该句，请补全映射与 MP3 文件：\n" + t.slice(0, 120)
          )
        );
      }

      var playPromise;
      if (global.LessonTTSBootstrap && global.LessonTTSBootstrap.playLocalIfAvailable) {
        playPromise = global.LessonTTSBootstrap.playLocalIfAvailable(t);
      } else if (typeof global.playLocalMp3Url === "function") {
        var relOnly = lookupRel(t);
        if (!relOnly) {
          reject(new Error("未在 manifest 中配置该句，请补全映射与 MP3 文件：\n" + t.slice(0, 120)));
          return;
        }
        playPromise = global.playLocalMp3Url(relOnly);
      } else {
        reject(new Error("朗读组件未加载（缺少 play-local-mp3.js）"));
        return;
      }

      var timer = setTimeout(function () {
        timer = null;
        reject(new Error("朗读超时，请刷新页面后重试。"));
      }, 45000);
      playPromise.then(function (ok) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        done(ok);
      });
    });
  }

  global.L01Speak = {
    norm: norm,
    lookupRel: lookupRel,
    speak: speak,
  };
})();
