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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectHints);
  else injectHints();
})();
