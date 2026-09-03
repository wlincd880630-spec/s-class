/**
 * 课文 PDF 二维码深链：?view=story&i=4 打开学课文第 4 句（i 从 1 起）。
 * 也支持 #story-4。
 */
(function (global) {
  "use strict";

  function parse() {
    var view = "";
    var index = null;
    try {
      var q = new URLSearchParams(global.location.search || "");
      view = String(q.get("view") || q.get("v") || "").toLowerCase();
      var raw = q.get("i") || q.get("n") || q.get("p");
      if (raw != null && String(raw).trim() !== "") {
        var n = parseInt(raw, 10);
        if (!isNaN(n)) index = n;
      }
    } catch (e1) {}
    var hash = String((global.location && location.hash) || "").replace(/^#/, "");
    var m = hash.match(/^story(?:[-/=](\d+))?$/i);
    if (m) {
      view = view || "story";
      if (m[1]) {
        var h = parseInt(m[1], 10);
        if (!isNaN(h)) index = h;
      }
    }
    return { view: view, index: index };
  }

  function wantsStory() {
    var d = parse();
    return d.view === "story" || (d.view === "" && d.index != null);
  }

  /**
   * @param {{ length: number, go: function(number): void }} opts
   * go 收到 0-based 句序号。
   */
  function openStory(opts) {
    if (!opts || typeof opts.go !== "function") return false;
    if (!wantsStory()) return false;
    var d = parse();
    var len = opts.length > 0 ? opts.length : 1;
    var i = 0;
    if (d.index != null) {
      i = d.index >= 1 ? d.index - 1 : 0;
    }
    if (i < 0) i = 0;
    if (i >= len) i = len - 1;
    opts.go(i);
    return true;
  }

  global.NgStoryDeepLink = {
    parse: parse,
    wantsStory: wantsStory,
    openStory: openStory,
  };
})(typeof window !== "undefined" ? window : this);
