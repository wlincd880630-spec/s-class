/**
 * 本地 MP3：file:// 仅用相对路径 assets/…；http(s) 先试页面相对路径，失败则回退 COS。
 */
(function () {
  "use strict";

  var DEFAULT_COS_BASE =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class";

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

  function cosBase() {
    return String(
      (typeof window !== "undefined" && window.__LESSON_COS_BASE__) || DEFAULT_COS_BASE
    ).replace(/\/$/, "");
  }

  /** 将 assets/tts-mp3/… 解析为 COS 绝对地址（按当前页所在 Grammar/Lxx/ 目录） */
  function cosUrlForLessonAsset(rel) {
    var r = normRel(rel);
    if (!/^assets\//i.test(r)) return "";
    try {
      var path = String(location.pathname || "").replace(/\\/g, "/");
      var m = path.match(/\/Grammar\/([^/]+)\//);
      if (!m) return "";
      return cosBase() + "/Grammar/" + decodeURIComponent(m[1]) + "/" + r;
    } catch (e) {
      return "";
    }
  }

  function preferCosFirst() {
    try {
      return /(?:^|\.)s-class\.top$/i.test(location.hostname || "");
    } catch (e) {
      return false;
    }
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

  function playUrlChain(urls, rate) {
    var list = (urls || []).filter(Boolean);
    var i = 0;
    function next() {
      if (i >= list.length) return Promise.resolve(false);
      return playRelative(list[i++], rate).then(function (ok) {
        return ok ? true : next();
      });
    }
    return next();
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
      if (!/^assets\/(?:tts-mp3|audio)\//i.test(raw)) return Promise.resolve(false);
      return playRelative(raw, rate);
    }

    if (/^https?:\/\//i.test(raw)) {
      return playRelative(raw, rate);
    }

    var candidates = [];
    var pageAbs = raw;
    try {
      pageAbs = new URL(raw, window.location.href).href;
    } catch (e) {}

    var cos = cosUrlForLessonAsset(raw);
    if (preferCosFirst() && cos) {
      candidates.push(cos);
      if (pageAbs && candidates.indexOf(pageAbs) === -1) candidates.push(pageAbs);
    } else {
      if (pageAbs) candidates.push(pageAbs);
      if (cos && candidates.indexOf(cos) === -1) candidates.push(cos);
    }

    return playUrlChain(candidates, rate);
  }

  window.playLocalMp3Url = playLocalMp3Url;
  window.playLocalMp3Rel = playLocalMp3Url;
  window.lessonCosUrlForAsset = cosUrlForLessonAsset;
})();
