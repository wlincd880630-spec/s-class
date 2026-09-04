/**
 * 教具工坊共用：为导出按钮补上「另存为 PDF」说明。
 */
(function () {
  "use strict";

  function injectHints() {
    document.querySelectorAll(".pack-intro").forEach(function (sec) {
      if (sec.querySelector(".hint-print")) return;
      if (!sec.querySelector("[data-export]")) return;
      var p = document.createElement("p");
      p.className = "hint-print";
      p.textContent = "点导出后会打开系统打印框。目标打印机请选「另存为 PDF / Save as PDF」。";
      sec.appendChild(p);
    });
  }

  function bindTopbarPill() {
    document.querySelectorAll(".topbar .pill").forEach(function (pill) {
      if (pill.getAttribute("data-export-pill") === "1") return;
      if (!/PDF|打印|导出/.test(pill.textContent || "")) return;
      pill.setAttribute("data-export-pill", "1");
      pill.setAttribute("role", "button");
      pill.tabIndex = 0;
      function go() {
        var pack = document.body.getAttribute("data-pack") || "book";
        if (window.AAPrint && typeof window.AAPrint.exportPack === "function") {
          window.AAPrint.exportPack(pack);
        } else {
          window.print();
        }
      }
      pill.addEventListener("click", go);
      pill.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
    });
  }

  function boot() {
    injectHints();
    bindTopbarPill();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
