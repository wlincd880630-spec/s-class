/**
 * 本地 MP3 优先（配合各讲 assets 中 window.__LESSON_TTS_MANIFEST）。
 * 1) playLocalIfAvailable：按规范化英文句查找并播放。
 * 2) fetch 拦截：课件内对 Azure TTS 的 fetch(SSML) 若 manifest 有对应句，则改为 fetch(本地 mp3)。
 */
(function () {
  "use strict";

  function norm(s) {
    return String(s || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function map() {
    return typeof window !== "undefined" && window.__LESSON_TTS_MANIFEST ? window.__LESSON_TTS_MANIFEST : {};
  }

  /** 从 SSML 中取 <voice>…</voice> 内纯文本（去内层标签与常见实体；须与 manifest 键一致） */
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

  /** file:// 下 fetch(本地 mp3) 常被拦截，用 XHR 读 ArrayBuffer 再封装成 Response（部分浏览器仍可能失败，失败则回退 Azure）。 */
  function xhrGetArrayBuffer(absUrl) {
    return new Promise(function (resolve, reject) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", absUrl, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
          var st = xhr.status;
          if (st === 200 || st === 0) resolve(xhr.response);
          else reject(new Error("xhr " + st));
        };
        xhr.onerror = function () {
          reject(new Error("xhr error"));
        };
        xhr.send();
      } catch (e) {
        reject(e);
      }
    });
  }

  function fetchLocalMp3AsResponse(rel) {
    var absUrl = rel;
    try {
      absUrl = new URL(rel, window.location.href).href;
    } catch (e0) {}
    var isFile = typeof location !== "undefined" && location.protocol === "file:";
    if (isFile) {
      return xhrGetArrayBuffer(absUrl).then(function (buf) {
        return new Response(buf, { status: 200, headers: { "Content-Type": "audio/mpeg" } });
      });
    }
    return origFetch(rel, { method: "GET", credentials: "same-origin", cache: "force-cache" });
  }

  if (origFetch) {
    window.fetch = function (input, init) {
      if (isAzureTtsRequest(input, init) && map() && typeof init.body === "string") {
        var phrase = extractSsmlVoicePlain(init.body);
        if (phrase) {
          var m = map();
          var rel = m[phrase] || m[norm(phrase)];
          if (rel) {
            return fetchLocalMp3AsResponse(rel)
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

  /**
   * @param {string} text
   * @returns {Promise<boolean>} true 已播放本地文件
   */
  function playLocalIfAvailable(text) {
    var k = norm(text);
    if (!k) return Promise.resolve(false);
    var m = map();
    var rel = m[k] || m[text] || m[String(text || "").trim()];
    if (!rel) return Promise.resolve(false);
    var absUrl = rel;
    try {
      absUrl = new URL(rel, window.location.href).href;
    } catch (e0) {}
    return new Promise(function (resolve) {
      var a = new Audio();
      var done = false;
      var started = false;
      function fin(ok) {
        if (done) return;
        done = true;
        resolve(!!ok);
      }
      function onMediaErr() {
        try {
          var code = a.error ? a.error.code : 0;
          if (typeof console !== "undefined" && console.warn) {
            console.warn("[LessonTTS] 本地 MP3 无法播放:", rel, "MEDIA_ERR=" + code);
          }
        } catch (e1) {}
        fin(false);
      }
      function tryPlayOnce() {
        if (started) return;
        started = true;
        var p = a.play();
        if (p && typeof p.catch === "function") {
          p.catch(function (err) {
            try {
              if (typeof console !== "undefined" && console.warn) {
                console.warn("[LessonTTS] audio.play() 失败:", err && err.message ? err.message : err);
              }
            } catch (e2) {}
            fin(false);
          });
        }
      }
      a.addEventListener(
        "ended",
        function () {
          fin(true);
        },
        { once: true }
      );
      a.addEventListener("error", onMediaErr, { once: true });
      a.preload = "auto";
      a.volume = 1;
      a.src = absUrl;
      a.addEventListener("canplay", tryPlayOnce, { once: true });
      a.load();
      if (a.readyState >= 2) tryPlayOnce();
    });
  }

  window.LessonTTSBootstrap = {
    norm: norm,
    playLocalIfAvailable: playLocalIfAvailable,
    extractSsmlVoicePlain: extractSsmlVoicePlain
  };
})();
