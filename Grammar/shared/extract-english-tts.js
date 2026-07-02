/**
 * 讲义/课件朗读：从 data-tts 等混合文本中只提取英文，不朗读中文。
 */
(function (global) {
  "use strict";
  if (!global) return;

  var CJK_RE = /[\u3000-\u9fff\uff00-\uffef\u3400-\u4dbf\uf900-\ufaff]/;

  function extractEnglishForTts(text) {
    var t = String(text || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    if (!t) return "";

    var cjkAt = t.search(CJK_RE);
    if (cjkAt > 0) {
      t = t.slice(0, cjkAt).replace(/[\s—\-–,，;；:：]+$/, "").trim();
    } else if (cjkAt === 0) {
      t = "";
    }

    if (!t || !/[A-Za-z]/.test(t)) {
      var latin = String(text || "").match(/[A-Za-z][A-Za-z0-9'’\-/.,?!;:—\s]*/g);
      if (!latin || !latin.length) return "";
      t = latin
        .map(function (p) {
          return p.trim();
        })
        .filter(function (p) {
          return /[A-Za-z]{2,}/.test(p);
        })
        .join(" ")
        .trim();
    }

    return t.replace(/\s+/g, " ").trim();
  }

  global.extractEnglishForTts = extractEnglishForTts;
})(typeof window !== "undefined" ? window : null);
