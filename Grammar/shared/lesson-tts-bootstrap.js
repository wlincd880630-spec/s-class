/**
 * 本地 MP3 优先。file:// 下仅用相对路径 new Audio(rel)，禁止绝对 file:// / XHR。
 * 整段未命中 manifest 时，按句末标点拆分为多句顺序播放；http(s) 下可回退 Azure。
 */
(function () {
  "use strict";

  function norm(s) {
    return String(s || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function map() {
    return typeof window !== "undefined" && window.__LESSON_TTS_MANIFEST
      ? window.__LESSON_TTS_MANIFEST
      : {};
  }

  function l03Entries() {
    return typeof window !== "undefined" &&
      window.L03AudioManifest &&
      window.L03AudioManifest.entries
      ? window.L03AudioManifest.entries
      : null;
  }

  function lookupUrl(text) {
    var k = norm(text);
    if (!k) return "";
    var m = map();
    if (m[k]) return m[k];
    if (m[text]) return m[text];
    if (m[String(text || "").trim()]) return m[String(text || "").trim()];
    var l03 = l03Entries();
    if (l03) {
      if (l03[k]) return l03[k];
      if (l03[text]) return l03[text];
      if (l03[String(text || "").trim()]) return l03[String(text || "").trim()];
    }
    return "";
  }

  function splitForPlayback(text) {
    var k = norm(text);
    if (!k) return [];
    if (lookupUrl(k)) return [k];
    var parts = k
      .split(/(?<=[.?!])\s+/)
      .map(function (p) {
        return p.trim();
      })
      .filter(Boolean);
    if (parts.length <= 1) return [k];
    return parts;
  }

  function extractSsmlVoicePlain(ssml) {
    var m = String(ssml).match(/<voice[^>]*>([\s\S]*?)<\/voice>/i);
    if (!m) return "";
    var inner = m[1].replace(/<[^>]+>/g, " ");
    inner = inner
      .replace(/&#39;/g, "'")
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#x27;/gi, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&");
    return norm(inner);
  }

  function isAzureTtsRequest(input, init) {
    try {
      var u = typeof input === "string" ? input : input && input.url;
      if (!u || String(u).indexOf("tts.speech.microsoft.com") === -1) return false;
      if (!init || String(init.method || "GET").toUpperCase() !== "POST") return false;
      var ct = "";
      if (init.headers) {
        if (typeof init.headers.get === "function") ct = init.headers.get("Content-Type") || "";
        else ct = init.headers["Content-Type"] || init.headers["content-type"] || "";
      }
      if (!ct || String(ct).indexOf("ssml") === -1) return false;
      var body = init.body;
      if (typeof body !== "string" || body.indexOf("<speak") === -1) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  var origFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;

  if (origFetch) {
    window.fetch = function (input, init) {
      if (isAzureTtsRequest(input, init) && map() && typeof init.body === "string") {
        var phrase = extractSsmlVoicePlain(init.body);
        if (phrase) {
          var rel = lookupUrl(phrase);
          if (rel) {
            return origFetch(rel, { method: "GET", credentials: "omit", cache: "force-cache" })
              .then(function (res) {
                if (!res || !res.ok) return origFetch(input, init);
                return res;
              })
              .catch(function () {
                return origFetch(input, init);
              });
          }
        }
      }
      return origFetch(input, init);
    };
  }

  function playOnePhrase(phrase) {
    var rel = lookupUrl(phrase);
    if (!rel) return Promise.resolve(false);

    var relPath = rel.replace(/\\/g, "/");
    if (typeof window.playLocalMp3Url === "function") {
      return window.playLocalMp3Url(relPath);
    }

    return new Promise(function (resolve) {
      var a = new Audio(relPath);
      var done = false;
      function fin(ok) {
        if (done) return;
        done = true;
        resolve(!!ok);
      }
      a.onended = function () {
        fin(true);
      };
      a.onerror = function () {
        fin(false);
      };
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          fin(false);
        });
      }
    });
  }

  function playLocalIfAvailable(text) {
    var parts = splitForPlayback(text);
    if (!parts.length) return Promise.resolve(false);

    var i = 0;
    var playedAny = false;
    function next() {
      if (i >= parts.length) return Promise.resolve(playedAny);
      return playOnePhrase(parts[i++]).then(function (ok) {
        if (ok) playedAny = true;
        return next();
      });
    }

    return next().then(function (localOk) {
      if (localOk) return true;
      if (typeof window.playLessonAzureTtsPlain === "function") {
        return window.playLessonAzureTtsPlain(norm(text));
      }
      return false;
    });
  }

  window.LessonTTSBootstrap = {
    norm: norm,
    lookupUrl: lookupUrl,
    splitForPlayback: splitForPlayback,
    playLocalIfAvailable: playLocalIfAvailable,
    extractSsmlVoicePlain: extractSsmlVoicePlain,
  };
})();
