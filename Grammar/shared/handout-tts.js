/**
 * 语法讲义 · 例句朗读（manifest / COS MP3，失败时明确提示）
 */
(function () {
  "use strict";

  var ttsLock = false;

  function norm(s) {
    return String(s || "")
      .replace(/['']/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function englishOnly(text) {
    if (typeof window.extractEnglishForTts === "function") {
      return window.extractEnglishForTts(text);
    }
    return norm(text);
  }

  function mp3For(text) {
    var t = englishOnly(text);
    if (!t) return "";
    if (window.LessonLocalAudio && window.LessonLocalAudio.mp3RelForText) {
      return window.LessonLocalAudio.mp3RelForText(t) || "";
    }
    var m = window.__LESSON_TTS_MANIFEST || {};
    return m[t] || m[text] || "";
  }

  function playMp3(url) {
    if (window.LessonLocalAudio && window.LessonLocalAudio.play) {
      return window.LessonLocalAudio.play(url);
    }
    if (typeof window.playLocalMp3Url === "function") {
      return window.playLocalMp3Url(url);
    }
    return Promise.resolve(false);
  }

  function playAzureFallback(t) {
    if (typeof window.playLessonAzureTtsPlain === "function") {
      return window.playLessonAzureTtsPlain(t).then(function (ok) {
        if (!ok) {
          throw new Error("朗读失败，请检查网络连接后重试。");
        }
      });
    }
    return Promise.reject(
      new Error("未找到该句语音文件。\n请强制刷新页面（Ctrl+F5）后重试。")
    );
  }

  function speakPreferred(text) {
    if (ttsLock) {
      return Promise.reject(new Error("朗读进行中，请稍候"));
    }
    var t = englishOnly(text);
    if (!t) return Promise.resolve();

    var url = mp3For(t);
    ttsLock = true;

    if (!url) {
      return playAzureFallback(t).then(
        function () {
          ttsLock = false;
        },
        function (err) {
          ttsLock = false;
          throw err;
        }
      );
    }

    return playMp3(url).then(
      function (ok) {
        if (ok) {
          ttsLock = false;
          return;
        }
        return playAzureFallback(t).then(function () {
          ttsLock = false;
        });
      },
      function (err) {
        ttsLock = false;
        throw err;
      }
    );
  }

  function wireChips() {
    if (window.LessonLocalAudio && window.LessonLocalAudio.wireTtsChips) {
      window.LessonLocalAudio.wireTtsChips(document);
    }
  }

  /** lesson-local-audio.js 已在 capture 阶段统一处理 .tts-chip，避免双重播放 */
  if (window.LessonLocalAudio) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", wireChips);
    } else {
      wireChips();
    }
    return;
  }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented) return;
    var chip = e.target.closest(".tts-chip[data-tts]");
    if (!chip) return;
    e.preventDefault();
    e.stopPropagation();
    var txt = chip.getAttribute("data-tts") || "";
    speakPreferred(txt).catch(function (err) {
      alert(err && err.message ? err.message : "朗读失败，请检查网络后重试。");
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireChips);
  } else {
    wireChips();
  }
})();
