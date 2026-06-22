/**
 * 本地 MP3 播放（en-GB-RyanNeural · 预生成）
 * 支持 file:// 双击打开 · 需先加载 audio-manifest.js
 */
(function (global) {
  "use strict";

  var __audio = null;
  var __gen = 0;

  function scriptBase() {
    var cs = document.currentScript;
    if (cs && cs.src) {
      try {
        return new URL("./", cs.src).href;
      } catch (e0) {}
      var s = String(cs.src).replace(/\\/g, "/");
      return s.replace(/[^/]*$/, "");
    }
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src;
      if (src && /local-audio\.js(\?|$)/i.test(src)) {
        try {
          return new URL("./", src).href;
        } catch (e1) {}
        src = String(src).replace(/\\/g, "/");
        return src.replace(/[^/]*$/, "");
      }
    }
    try {
      return new URL("audio/", global.location.href).href;
    } catch (e2) {
      return "audio/";
    }
  }

  var __base = scriptBase();

  function normalizeText(text) {
    return String(text)
      .replace(/[\u2018\u2019\u201A\uFF07]/g, "'")
      .replace(/\r\n/g, " ")
      .trim();
  }

  function normalizeRate(rate) {
    var f = parseFloat(String(rate));
    if (isNaN(f)) return "0.90";
    if (Math.abs(f - 0.8) < 0.02) return "0.80";
    if (Math.abs(f - 0.92) < 0.02) return "0.92";
    if (f >= 0.98) return "0.90";
    return String(rate);
  }

  function resolveRate(options) {
    options = options || {};
    if (options.rate != null && !isNaN(parseFloat(String(options.rate)))) {
      return normalizeRate(options.rate);
    }
    if (options.slow) return "0.80";
    return "0.90";
  }

  function buildAudioUrl(base, rel) {
    var parts = String(rel).split("/").filter(Boolean);
    var encoded = parts.map(function (p) {
      return encodeURIComponent(p);
    });
    try {
      return new URL(encoded.join("/"), base).href;
    } catch (e) {
      var sep = base.indexOf("?") >= 0 ? "&" : "";
      return base + (/\/$/.test(base) ? "" : "/") + encoded.join("/");
    }
  }

  function lookupPath(text, rate) {
    var m = global.__LOCAL_AUDIO_MANIFEST;
    if (!m || !m.lookup) return null;
    var t = normalizeText(text);
    if (!t) return null;
    rate = normalizeRate(rate);

    var texts = [t];
    if (t.toLowerCase() !== t) texts.push(t.toLowerCase());
    var titled = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
    if (texts.indexOf(titled) < 0) texts.push(titled);

    var rates = [rate];
    if (rates.indexOf("0.90") < 0) rates.push("0.90");
    if (rates.indexOf("0.80") < 0) rates.push("0.80");

    var i, j, key;
    for (i = 0; i < texts.length; i++) {
      for (j = 0; j < rates.length; j++) {
        key = texts[i] + "|" + rates[j];
        if (m.lookup[key]) return m.lookup[key];
      }
    }
    return null;
  }

  function stop() {
    __gen++;
    if (__audio) {
      try {
        __audio.pause();
        __audio.src = "";
      } catch (e) {}
      __audio = null;
    }
  }

  function playUrl(url, gen) {
    return new Promise(function (resolve) {
      if (gen !== __gen) {
        resolve(false);
        return;
      }
      var a = new Audio();
      __audio = a;
      a.preload = "auto";
      a.onended = function () {
        if (__audio === a) __audio = null;
        resolve(gen === __gen);
      };
      a.onerror = function () {
        if (__audio === a) __audio = null;
        resolve(false);
      };
      a.src = url;
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          resolve(false);
        });
      }
    });
  }

  function speak(text, options) {
    stop();
    var gen = __gen;
    options = options || {};
    var t = normalizeText(text);
    if (!t) {
      if (options.onDone) options.onDone();
      return Promise.resolve(false);
    }
    var rate = resolveRate(options);
    var rel = lookupPath(t, rate);
    if (!rel) {
      if (options.onDone) options.onDone();
      return Promise.resolve(false);
    }
    var url = buildAudioUrl(__base, rel);
    return playUrl(url, gen).then(function (ok) {
      if (options.onDone) options.onDone();
      return ok;
    });
  }

  function createApi(exportName) {
    var api = { speak: speak, stop: stop, voice: "en-GB-RyanNeural (local)" };
    if (exportName) global[exportName] = api;
    return api;
  }

  global.LocalAudio = {
    speak: speak,
    stop: stop,
    createApi: createApi,
    setBase: function (b) {
      if (b) __base = b;
    },
  };
})(typeof window !== "undefined" ? window : this);
