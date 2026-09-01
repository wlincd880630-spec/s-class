/**
 * PET 各页悬浮入口：讲义 PDF / 文章 PDF / 复习游戏
 */
(function () {
  "use strict";
  if (window.__PET_STUDIO_ENTRY) return;
  window.__PET_STUDIO_ENTRY = true;

  function unitFromPath() {
    var p = location.pathname || "";
    var m = p.match(/\/PET\/(\d{2})\//);
    if (m) return Math.ceil(parseInt(m[1], 10) / 2);
    var m2 = p.match(/Unit(\d+)_/);
    if (m2) return parseInt(m2[1], 10);
    return 0;
  }

  function base() {
    var p = location.pathname || "";
    if (/\/PET\/studio\//.test(p)) return "./";
    if (/\/PET\/Unit\d+_/.test(p) || /\/PET\/\d{2}\//.test(p)) return "../studio/";
    return "PET/studio/";
  }

  var unit = unitFromPath();
  var root = base();
  var bar = document.createElement("div");
  bar.id = "pet-studio-entry";
  bar.innerHTML =
    (unit
      ? '<a href="' + root + "print.html?type=handout&unit=" + unit + '">讲义 PDF</a>' +
        '<a href="' + root + "print.html?type=passage&unit=" + unit + '">文章 PDF</a>' +
        '<a href="' + root + "games.html?unit=" + unit + '">复习游戏</a>'
      : '<a href="' + root + 'index.html">PET 讲义 / 游戏</a>');
  var st = document.createElement("style");
  st.textContent =
    "#pet-studio-entry{position:fixed;top:14px;left:14px;z-index:1400;display:flex;gap:6px;flex-wrap:wrap}" +
    "#pet-studio-entry a{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;" +
    "font:800 12px/1 Nunito,Noto Sans SC,sans-serif;padding:8px 10px;border-radius:999px;" +
    "box-shadow:0 8px 20px rgba(79,70,229,.35)}";
  document.head.appendChild(st);
  function mount() {
    if (!document.body) return;
    document.body.appendChild(bar);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
