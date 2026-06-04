/**
 * 本地 MP3：file:// 仅用相对路径 assets/tts-mp3/…；http 可用绝对 URL。
 */
(function () {
  "use strict";

  if (typeof window !== "undefined") {
    window.__LESSON_RUNTIME_LOCAL_FILE__ =
      typeof location !== "undefined" && location.protocol === "file:";
  }

  function isFileProtocol() {
    return typeof location !== "undefined" && location.protocol === "file:";
  }

  function normRel(src) {
    return String(src || "")
      .trim()
      .replace(/\\/g, "/");
  }

  function inlineDataUri(rel) {
    var map = window.__LESSON_INLINE_AUDIO_BLOBS;
    if (!map) return "";
    var r = normRel(rel);
    return map[r] || "";
  }

  function sharedAudio() {
    if (typeof document === "undefined") return null;
    var el = document.getElementById("lesson-shared-audio");
    if (el && el.tagName === "AUDIO") return el;
    return null;
  }

  function playRelative(rel, rate) {
    rate = rate || 1;
    var embedded = inlineDataUri(rel);
    var src = embedded || rel;

    return new Promise(function (resolve) {
      var a = sharedAudio() || new Audio();
      var done = false;

      function fin(ok) {
        if (done) return;
        done = true;
        resolve(!!ok);
      }

      try {
        a.pause();
        a.onended = function () {
          fin(true);
        };
        a.onerror = function () {
          fin(false);
        };
        if (rate !== 1) a.playbackRate = rate;
        else a.playbackRate = 1;
        a.src = src;
        a.load();

        function tryPlay() {
          var p = a.play();
          if (p && typeof p.catch === "function") {
            p.catch(function () {
              fin(false);
            });
          }
        }

        if (a.readyState >= 2) {
          tryPlay();
        } else {
          a.addEventListener(
            "canplay",
            function () {
              tryPlay();
            },
            { once: true }
          );
          setTimeout(function () {
            if (!done && a.readyState >= 2) tryPlay();
            else if (!done && a.readyState < 2) fin(false);
          }, 12000);
        }
      } catch (e) {
        fin(false);
      }
    });
  }

  function playLocalMp3Url(src, opts) {
    opts = opts || {};
    var raw = normRel(src);
    if (!raw) return Promise.resolve(false);

    var rate = Number(opts.playbackRate);
    if (!isFinite(rate) || rate <= 0) rate = 1;

    if (/^blob:|^data:/i.test(raw)) {
      return playRelative(raw, rate);
    }

    if (isFileProtocol()) {
      if (/^file:\/\//i.test(raw)) return Promise.resolve(false);
      if (!/^assets\/tts-mp3\//i.test(raw)) return Promise.resolve(false);
      return playRelative(raw, rate);
    }

    var abs = raw;
    try {
      if (!/^https?:\/\//i.test(raw)) {
        abs = new URL(raw, window.location.href).href;
      }
    } catch (e) {}
    return playRelative(abs, rate);
  }

  window.playLocalMp3Url = playLocalMp3Url;
  window.playLocalMp3Rel = playLocalMp3Url;
})();
