/**
 * 不规则动词模块 · 共享工具
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "iv-selected-verbs-v1";

  function getAllVerbs() {
    var d = global.IRREGULAR_VERBS_DATA;
    return d && d.verbs ? d.verbs : [];
  }

  function getSelectedIds() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) return arr;
      }
    } catch (e) {}
    return getAllVerbs().map(function (v) {
      return v.id;
    });
  }

  function setSelectedIds(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  function getSelectedVerbs() {
    var ids = getSelectedIds();
    var map = {};
    getAllVerbs().forEach(function (v) {
      map[v.id] = v;
    });
    return ids.map(function (id) {
      return map[id];
    }).filter(Boolean);
  }

  function getVerbById(id) {
    return getAllVerbs().find(function (v) {
      return v.id === id;
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function pickRandom(arr, n) {
    return shuffle(arr).slice(0, Math.min(n, arr.length));
  }

  function mediaUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    var base = (global.IRREGULAR_VERBS_DATA && global.IRREGULAR_VERBS_DATA.mediaBase) || "";
    return base + String(path).replace(/^\//, "");
  }

  function highlightVerb(sentence, form) {
    if (!sentence || !form) return sentence;
    var parts = String(form).split(/\s*\/\s*/);
    var result = sentence;
    parts.forEach(function (p) {
      var word = p.trim();
      if (!word || word === "—") return;
      var re = new RegExp("\\b(" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "gi");
      result = result.replace(re, "<mark>$1</mark>");
    });
    return result;
  }

  function saveProgress(key, data) {
    try {
      localStorage.setItem("iv-progress-" + key, JSON.stringify(data));
    } catch (e) {}
  }

  function loadProgress(key) {
    try {
      var raw = localStorage.getItem("iv-progress-" + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  global.IrregularVerbsUtil = {
    STORAGE_KEY: STORAGE_KEY,
    getAllVerbs: getAllVerbs,
    getSelectedIds: getSelectedIds,
    setSelectedIds: setSelectedIds,
    getSelectedVerbs: getSelectedVerbs,
    getVerbById: getVerbById,
    shuffle: shuffle,
    pickRandom: pickRandom,
    mediaUrl: mediaUrl,
    highlightVerb: highlightVerb,
    saveProgress: saveProgress,
    loadProgress: loadProgress,
  };
})(typeof window !== "undefined" ? window : this);
