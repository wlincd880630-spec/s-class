/**
 * 第 07 讲：仅使用 L07 下预生成的本地 MP3（默认 assets/tts-mp3/l07-google-mp3/）。
 *
 * file:// 打开时浏览器通常无法 fetch manifest.json，请在页面中 **先于本脚本** 引入：
 *   <script src="assets/tts-mp3/l07-google-mp3/manifest.embed.js"></script>
 * （运行 node tools/generate-l07-google-tts.mjs 或 node tools/embed-l07-manifest.mjs 会生成该文件。）
 *
 * http(s) 下也可仅用 manifest.json（由下方 MANIFEST_REL fetch）。
 *
 * 可选覆盖（在引入本脚本前设置）：
 *   window.__L07_LOCAL_TTS_MANIFEST__ = "assets/tts-mp3/l07-google-mp3/manifest.json";
 *   window.__L07_LOCAL_TTS_BASE__     = "assets/tts-mp3/l07-google-mp3/";
 *
 * 播放失败后 window.__L07_TTS_FAIL_REASON__ 可能为：
 *   empty | map_miss | manifest | audio | play_rejected
 */
(function (global) {
  "use strict";
  if (!global) return;

  var MANIFEST_REL = String(
    global.__L07_LOCAL_TTS_MANIFEST__ || "assets/tts-mp3/l07-google-mp3/manifest.json"
  ).trim();
  var BASE_REL = String(
    global.__L07_LOCAL_TTS_BASE__ ||
      "assets/tts-mp3/l07-google-mp3/"
  ).trim();

  var mapNormToFile = Object.create(null);
  var mapExactToFile = Object.create(null);
  var loadPromise = null;
  var loadError = null;
  var didIngestEmbed = false;

  var _l07Audio = null;

  function normPhrase(t) {
    return String(t || "")
      .replace(/\s+/g, " ")
      .replace(/\u00a0/g, " ")
      .trim();
  }

  /** 与课件 / TTS 脚本间常见差异：弯引号、撇号 */
  function unifyQuotesApostrophes(s) {
    return String(s || "")
      .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")
      .replace(/[\u201C\u201D]/g, '"');
  }

  /** em dash / en dash 等与 ASCII 连字符对齐，便于清单匹配 */
  function normalizeDashes(s) {
    return String(s || "")
      .replace(/\u2014/g, "-")
      .replace(/\u2013/g, "-")
      .replace(/\u2012/g, "-");
  }

  function tightenEndPunctuation(s) {
    return String(s || "").replace(/\s+([.!?])\s*$/g, "$1");
  }

  /** 生成若干等价 lookup key（不去改变朗读语义，仅对齐标点形态） */
  function lookupKeyVariants(text) {
    var u = unifyQuotesApostrophes(text);
    var d = normalizeDashes(u);
    var n = normPhrase(d);
    var tight = tightenEndPunctuation(n);
    var seen = Object.create(null);
    var out = [];
    function push(x) {
      var k = String(x || "").trim();
      if (!k || seen[k]) return;
      seen[k] = 1;
      out.push(k);
    }
    push(text);
    push(u);
    push(d);
    push(n);
    push(tight);
    return out;
  }

  function registerManifestEntry(text, file) {
    var keys = lookupKeyVariants(text);
    for (var i = 0; i < keys.length; i++) {
      mapNormToFile[keys[i]] = file;
    }
    mapExactToFile[String(text)] = file;
  }

  function resolveFileForText(text) {
    var keys = lookupKeyVariants(text);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (mapExactToFile[k]) return mapExactToFile[k];
      if (mapNormToFile[k]) return mapNormToFile[k];
    }
    return "";
  }

  function ingestManifestObject(data) {
    mapNormToFile = Object.create(null);
    mapExactToFile = Object.create(null);
    var entries = (data && data.entries) || [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (!e || !e.file || e.error) continue;
      var raw = e.text;
      if (raw == null) continue;
      registerManifestEntry(String(raw), e.file);
    }
  }

  function resolveUrl(relPath) {
    var s = String(relPath || "").trim().replace(/\\/g, "/");
    if (!s || /^https?:\/\//i.test(s) || /^data:/i.test(s) || /^blob:/i.test(s)) return s;
    try {
      return new URL(s, document.baseURI).href;
    } catch (e) {
      return s;
    }
  }

  function loadManifest() {
    if (global.__L07_LOCAL_MANIFEST_EMBED__) {
      if (!didIngestEmbed) {
        ingestManifestObject(global.__L07_LOCAL_MANIFEST_EMBED__);
        didIngestEmbed = true;
        loadError = null;
      }
      return Promise.resolve(true);
    }

    if (loadError) return Promise.reject(loadError);
    if (loadPromise) return loadPromise;

    var url = resolveUrl(MANIFEST_REL);
    var isFile = typeof location !== "undefined" && location.protocol === "file:";

    function loadJsonFromUrl(absUrl) {
      if (!isFile) {
        return fetch(absUrl).then(function (res) {
          if (!res.ok) throw new Error("manifest HTTP " + res.status);
          return res.json();
        });
      }
      return new Promise(function (resolve, reject) {
        try {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", absUrl, true);
          xhr.responseType = "text";
          xhr.onload = function () {
            var st = xhr.status;
            if (st !== 200 && st !== 0) {
              reject(new Error("manifest xhr " + st));
              return;
            }
            try {
              resolve(JSON.parse(xhr.responseText || "{}"));
            } catch (e) {
              reject(e);
            }
          };
          xhr.onerror = function () {
            reject(new Error("manifest xhr error"));
          };
          xhr.send();
        } catch (e) {
          reject(e);
        }
      });
    }

    loadPromise = loadJsonFromUrl(url)
      .then(function (data) {
        ingestManifestObject(data);
        return true;
      })
      .catch(function (err) {
        loadError = err;
        loadPromise = null;
        console.error("[L07LocalTts] manifest 加载失败:", err);
        throw err;
      });
    return loadPromise;
  }

  function stopLessonL07LocalTts() {
    try {
      if (_l07Audio) {
        _l07Audio.pause();
        _l07Audio = null;
      }
    } catch (e) {}
    try {
      if (global.__lessonArenaAudio) {
        global.__lessonArenaAudio.pause();
        global.__lessonArenaAudio = null;
      }
    } catch (e2) {}
    try {
      if (global.currentAudio) {
        global.currentAudio.pause();
        global.currentAudio = null;
      }
    } catch (e3) {}
  }

  /**
   * @param {string} text 英文原文（与课件中朗读字符串一致）
   * @returns {Promise<boolean>}
   */
  function playLessonL07LocalTts(text) {
    global.__L07_TTS_FAIL_REASON__ = "";
    var raw = String(text || "");
    var n = normPhrase(raw);
    if (!n) {
      global.__L07_TTS_FAIL_REASON__ = "empty";
      return Promise.resolve(false);
    }

    stopLessonL07LocalTts();

    function playRelPath(relPath) {
      var rel = String(relPath || "").trim().replace(/\\/g, "/");
      if (!rel || !/^assets\/tts-mp3\//i.test(rel)) {
        global.__L07_TTS_FAIL_REASON__ = "map_miss";
        return Promise.resolve(false);
      }
      var isFile =
        typeof location !== "undefined" && location.protocol === "file:";
      var playSrc = isFile ? rel : resolveUrl(rel);
      if (typeof global.playLocalMp3Url === "function") {
        return global.playLocalMp3Url(playSrc).then(function (ok) {
          if (!ok) global.__L07_TTS_FAIL_REASON__ = "audio";
          else global.__L07_TTS_FAIL_REASON__ = "";
          return !!ok;
        });
      }
      return Promise.resolve(false);
    }

    var aliases = global.__L07_PAGE01_MP3_ALIASES__;
    if (aliases) {
      var keys = lookupKeyVariants(raw);
      for (var ai = 0; ai < keys.length; ai++) {
        if (aliases[keys[ai]]) {
          return playRelPath(aliases[keys[ai]]);
        }
      }
    }

    return loadManifest()
      .then(function () {
        var file = resolveFileForText(raw);
        if (!file) {
          global.__LAST_L07_LOCAL_TTS_MISS__ = n;
          global.__L07_TTS_FAIL_REASON__ = "map_miss";
          console.warn("[L07LocalTts] 无对应 MP3:", n.slice(0, 140));
          return false;
        }

        var relPath = BASE_REL.replace(/\/?$/, "/") + file;
        var isFile =
          typeof location !== "undefined" && location.protocol === "file:";
        var playSrc = isFile ? relPath : resolveUrl(relPath);

        if (typeof global.playLocalMp3Url === "function") {
          return global.playLocalMp3Url(playSrc).then(function (ok) {
            if (!ok) {
              global.__L07_TTS_FAIL_REASON__ = "audio";
              console.warn("[L07LocalTts] 本地 MP3 无法播放:", playSrc);
            } else {
              global.__L07_TTS_FAIL_REASON__ = "";
            }
            return !!ok;
          });
        }

        var audio = new Audio(playSrc);
        _l07Audio = audio;
        global.__lessonArenaAudio = audio;
        global.currentAudio = audio;

        return new Promise(function (resolve) {
          function done(ok) {
            try {
              if (_l07Audio === audio) _l07Audio = null;
              if (global.__lessonArenaAudio === audio) global.__lessonArenaAudio = null;
              if (global.currentAudio === audio) global.currentAudio = null;
            } catch (e) {}
            resolve(!!ok);
          }
          audio.addEventListener(
            "ended",
            function () {
              global.__L07_TTS_FAIL_REASON__ = "";
              done(true);
            },
            { once: true }
          );
          audio.addEventListener(
            "error",
            function () {
              global.__L07_TTS_FAIL_REASON__ = "audio";
              console.warn("[L07LocalTts] Audio 加载/解码失败:", playSrc);
              done(false);
            },
            { once: true }
          );
          var p = audio.play();
          if (p && typeof p.catch === "function") {
            p.catch(function () {
              global.__L07_TTS_FAIL_REASON__ = "play_rejected";
              done(false);
            });
          }
        });
      })
      .catch(function () {
        global.__L07_TTS_FAIL_REASON__ = "manifest";
        return false;
      });
  }

  global.stopLessonL07LocalTts = stopLessonL07LocalTts;
  global.playLessonL07LocalTts = playLessonL07LocalTts;
  /** 兼容旧课件命名（原为 Azure） */
  global.playLessonAzureTtsPlain = playLessonL07LocalTts;
})(typeof window !== "undefined" ? window : null);
