/**
 * PET 各页入口：讲义 PDF / 文章 PDF / 复习游戏
 * 词汇课放在顶栏右上角，新标签打开，避免中断当前进度。
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

  function link(href, label) {
    return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
  }

  var unit = unitFromPath();
  var root = base();
  var isVocab = /\/PET\/\d{2}\//.test(location.pathname || "");
  var bar = document.createElement("div");
  bar.id = "pet-studio-entry";
  bar.innerHTML = unit
    ? link(root + "print.html?type=handout&unit=" + unit, "讲义 PDF") +
      link(root + "read.html?unit=" + unit, "文章学习") +
      link(root + "print.html?type=passage&unit=" + unit, "文章 PDF") +
      link(root + "games.html?unit=" + unit, "复习游戏")
    : link(root + "index.html", "PET 讲义 / 游戏");

  var st = document.createElement("style");
  st.textContent =
    "#pet-studio-entry{position:fixed;top:12px;right:14px;left:auto;z-index:1400;" +
      "display:flex;gap:6px;flex-wrap:nowrap;align-items:center;max-width:calc(100vw - 24px)}" +
    "#pet-studio-entry a{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;" +
      "font:800 12px/1 Nunito,Noto Sans SC,sans-serif;padding:8px 11px;border-radius:999px;white-space:nowrap;" +
      "box-shadow:0 8px 20px rgba(79,70,229,.35)}" +
    (isVocab
      ? "#app nav.h-16 .flex.items-center.gap-3{margin-right:328px}" +
        "@media (max-width:900px){" +
          "#pet-studio-entry{top:70px;right:12px;flex-wrap:wrap;justify-content:flex-end}" +
          "#app nav.h-16 .flex.items-center.gap-3{margin-right:0}" +
        "}"
      : "");
  document.head.appendChild(st);

  function mount() {
    if (!document.body) return;
    if (!bar.parentNode) document.body.appendChild(bar);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
