/**
 * 全课统一：发音按钮只播本地 MP3（data-mp3="assets/tts-mp3/xxx.mp3"）。
 * 在 manifest 与 play-local-mp3.js 之后加载；可 defer。
 */
(function (global) {
  "use strict";
  if (!global || !global.document) return;

  global.__LESSON_TTS_LOCAL_ONLY__ = true;

  var _current = null;

  function normText(s) {
    return String(s || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function englishTtsText(s) {
    if (typeof global.extractEnglishForTts === "function") {
      return global.extractEnglishForTts(s);
    }
    return normText(s);
  }

  function isPlayableMp3(src) {
    var s = String(src || "").trim().replace(/\\/g, "/");
    if (!s) return false;
    if (/^https?:\/\//i.test(s)) return true;
    return /^assets\/(?:tts-mp3|audio)\//i.test(s);
  }

  /** 按句子在 manifest 查相对路径 */
  function mp3RelForText(text) {
    var t = normText(text);
    var eng = englishTtsText(text) || t;
    if (!eng && !t) return "";
    var m = global.__LESSON_TTS_MANIFEST || {};
    if (m[eng] || m[t] || m[text]) return m[eng] || m[t] || m[text];
    var l03 =
      global.L03AudioManifest && global.L03AudioManifest.entries
        ? global.L03AudioManifest.entries
        : null;
    if (l03 && (l03[t] || l03[text])) return l03[t] || l03[text];
    return "";
  }

  function dispatch(name) {
    try {
      global.document.dispatchEvent(new CustomEvent(name));
    } catch (e) {}
  }

  function stopCurrent() {
    try {
      var shared = global.document && global.document.getElementById("lesson-shared-audio");
      if (shared) {
        shared.pause();
        shared.removeAttribute("src");
        shared.load();
      }
      if (_current) {
        _current.pause();
        _current.removeAttribute("src");
        _current.load();
        _current = null;
      }
    } catch (e) {}
  }

  /**
   * @param {string} relPath 如 assets/tts-mp3/abc.mp3（相对当前 HTML）
   * @returns {Promise<boolean>}
   */
  function playMp3Rel(relPath) {
    var rel = String(relPath || "").trim().replace(/\\/g, "/");
    if (!isPlayableMp3(rel)) {
      return Promise.resolve(false);
    }

    stopCurrent();
    dispatch("lesson-audio-start");

    if (typeof global.playLocalMp3Url === "function") {
      return global.playLocalMp3Url(rel).then(function (ok) {
        if (!ok) stopCurrent();
        dispatch("lesson-audio-end");
        return !!ok;
      });
    }

    return new Promise(function (resolve) {
      var done = false;
      function fin(ok) {
        if (done) return;
        done = true;
        if (!ok) stopCurrent();
        dispatch("lesson-audio-end");
        resolve(!!ok);
      }
      var a = new Audio();
      _current = a;
      a.addEventListener("ended", function () {
        fin(true);
      }, { once: true });
      a.addEventListener("error", function () {
        fin(false);
      }, { once: true });
      a.src = rel;
      var p = a.play();
      if (p && typeof p.catch === "function") p.catch(function () {
        fin(false);
      });
    });
  }

  function resolveMp3FromButton(btn) {
    var direct = btn.getAttribute("data-mp3");
    if (direct && isPlayableMp3(direct)) return direct.trim();

    var enc = btn.getAttribute("data-tts-read");
    if (enc) {
      try {
        var fromEnc = mp3RelForText(decodeURIComponent(enc));
        if (fromEnc) return fromEnc;
      } catch (e) {}
    }

    var tts = btn.getAttribute("data-tts");
    if (tts) return mp3RelForText(tts);

    return "";
  }

  function warnMissing(btn, hint) {
    var msg = "未找到本地 MP3：" + (hint || "").slice(0, 100);
    if (typeof console !== "undefined" && console.warn) console.warn("[LessonAudio]", msg);
    try {
      if (typeof global.alert === "function") global.alert(msg + "\n\n请确认 manifest 与 assets/tts-mp3 文件齐全。");
    } catch (e) {}
  }

  global.document.addEventListener(
    "click",
    function (e) {
      var btn = e.target.closest(
        "[data-mp3], [data-tts-id], .tts-read-btn, .tts-chip[data-tts], .tts-chip[data-mp3], .tts-chip[data-tts-read], .tts-mini, .tts-huge, button[data-tts-read], [data-tts-read]"
      );
      if (!btn) return;

      var mp3 = resolveMp3FromButton(btn);
      if (!mp3) {
        var ttsText = englishTtsText(
          btn.getAttribute("data-tts") ||
            (function () {
              try {
                return decodeURIComponent(btn.getAttribute("data-tts-read") || "");
              } catch (e) {
                return "";
              }
            })()
        );
        if (
          ttsText &&
          global.LessonTTSBootstrap &&
          typeof global.LessonTTSBootstrap.playLocalIfAvailable === "function"
        ) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          global.LessonTTSBootstrap.playLocalIfAvailable(ttsText).then(function (ok) {
            if (!ok && typeof global.playLessonAzureTtsPlain === "function") {
              global.playLessonAzureTtsPlain(ttsText).then(function (azureOk) {
                if (!azureOk) warnMissing(btn, ttsText);
              });
              return;
            }
            if (!ok) warnMissing(btn, ttsText);
          });
          return;
        }
        if (
          btn.hasAttribute("data-mp3") ||
          btn.hasAttribute("data-tts") ||
          btn.hasAttribute("data-tts-read") ||
          btn.classList.contains("tts-read-btn") ||
          btn.classList.contains("tts-mini")
        ) {
          warnMissing(
            btn,
            btn.getAttribute("data-tts") ||
              btn.getAttribute("data-tts-read") ||
              "（无映射）"
          );
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (btn.id === "btnFinalTts") {
        try {
          global.document.dispatchEvent(new CustomEvent("lesson-final-tts-click"));
        } catch (e2) {}
      } else {
        e.stopImmediatePropagation();
      }

      playMp3Rel(mp3).then(function (ok) {
        if (!ok && typeof global.playLessonAzureTtsPlain === "function") {
          var fallbackText = englishTtsText(
            btn.getAttribute("data-tts") ||
              (function () {
                try {
                  return decodeURIComponent(btn.getAttribute("data-tts-read") || "");
                } catch (e) {
                  return "";
                }
              })()
          );
          if (fallbackText) {
            global.playLessonAzureTtsPlain(fallbackText).then(function (azureOk) {
              if (!azureOk) warnMissing(btn, mp3);
            });
            return;
          }
        }
        if (!ok) warnMissing(btn, mp3);
      });
    },
    true
  );

  /** 为讲义 chip 等补上 data-mp3 */
  function wireTtsChips(root) {
    var scope = root || global.document;
    scope.querySelectorAll(".tts-chip[data-tts], [data-tts]:not([data-mp3])").forEach(function (el) {
      if (el.getAttribute("data-mp3")) return;
      var rel = mp3RelForText(el.getAttribute("data-tts") || "");
      if (rel) el.setAttribute("data-mp3", rel);
    });
    scope.querySelectorAll(".tts-read-btn[data-tts-read]").forEach(function (el) {
      if (el.getAttribute("data-mp3")) return;
      try {
        var rel = mp3RelForText(decodeURIComponent(el.getAttribute("data-tts-read") || ""));
        if (rel) el.setAttribute("data-mp3", rel);
      } catch (e) {}
    });
  }

  function boot() {
    wireTtsChips(global.document);
  }

  if (global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  global.LessonLocalAudio = {
    normText: normText,
    mp3RelForText: mp3RelForText,
    play: playMp3Rel,
    wireTtsChips: wireTtsChips,
  };

  global.playLessonMp3 = playMp3Rel;
})();
