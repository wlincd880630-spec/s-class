/**
 * L07 本地朗读：manifest.embed.js 提供 text→file，MP3 默认从腾讯云 COS 拉取。
 * 可选覆盖：window.__L07_COS_BASE__ = "https://.../s-class/Grammar/L07/"
 */
(function (g) {
  "use strict";

  var COS_ROOT = String(
    g.__L07_COS_BASE__ ||
      "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L07/"
  ).replace(/\/?$/, "/");
  var GOOGLE_MP3_DIR = COS_ROOT + "assets/tts-mp3/l07-google-mp3/";

  var _map = null;
  var _currentAudio = null;

  function norm(t) {
    return String(t || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function buildMap() {
    var out = Object.create(null);
    var m = g.__L07_LOCAL_MANIFEST_EMBED__;
    if (!m || !Array.isArray(m.entries)) return out;
    for (var i = 0; i < m.entries.length; i++) {
      var e = m.entries[i];
      if (!e || !e.text || !e.file) continue;
      var k = norm(e.text);
      if (!k || out[k]) continue;
      out[k] = GOOGLE_MP3_DIR + String(e.file).replace(/^\/+/, "");
    }
    return out;
  }

  function ensureMap() {
    if (!_map) _map = buildMap();
    return _map;
  }

  function stopLessonL07LocalTts() {
    if (_currentAudio) {
      try {
        _currentAudio.pause();
      } catch (e) {}
      try {
        _currentAudio.removeAttribute("src");
        _currentAudio.load();
      } catch (e2) {}
      _currentAudio = null;
    }
    g.__L07_TTS_FAIL_REASON__ = "";
  }

  function playLessonL07LocalTts(text) {
    stopLessonL07LocalTts();
    var key = norm(text);
    if (!key) {
      g.__L07_TTS_FAIL_REASON__ = "empty";
      return Promise.resolve(false);
    }
    var map = ensureMap();
    if (!Object.keys(map).length) {
      g.__L07_TTS_FAIL_REASON__ = "manifest";
      return Promise.resolve(false);
    }
    var url = map[key];
    if (!url) {
      g.__L07_TTS_FAIL_REASON__ = "map_miss";
      return Promise.resolve(false);
    }
    var a = new Audio(url);
    _currentAudio = a;
    g.__L07_TTS_FAIL_REASON__ = "";
    return new Promise(function (resolve) {
      function fin(ok) {
        if (_currentAudio === a) _currentAudio = null;
        if (!ok) g.__L07_TTS_FAIL_REASON__ = g.__L07_TTS_FAIL_REASON__ || "audio";
        resolve(!!ok);
      }
      a.addEventListener(
        "ended",
        function () {
          fin(true);
        },
        { once: true }
      );
      a.addEventListener(
        "error",
        function () {
          fin(false);
        },
        { once: true }
      );
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          g.__L07_TTS_FAIL_REASON__ = "play_rejected";
          fin(false);
        });
      }
    });
  }

  g.playLessonL07LocalTts = playLessonL07LocalTts;
  g.stopLessonL07LocalTts = stopLessonL07LocalTts;
})(typeof window !== "undefined" ? window : this);
