/**
 * L14 · 课件进度本地保存（localStorage）
 */
(function (global) {
  "use strict";
  var PREFIX = "l14-progress:";

  function load(pageId) {
    try {
      var raw = localStorage.getItem(PREFIX + pageId);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function save(pageId, data) {
    try {
      localStorage.setItem(PREFIX + pageId, JSON.stringify(data));
    } catch (e) { /* quota / private mode */ }
  }

  function clear(pageId) {
    try {
      localStorage.removeItem(PREFIX + pageId);
    } catch (e) { /* ignore */ }
  }

  global.L14Progress = {
    load: load,
    save: save,
    clear: clear
  };
})(typeof window !== "undefined" ? window : this);
