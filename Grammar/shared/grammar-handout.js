(function () {
  "use strict";

  var PRINT_HINT_KEY = "grammar-handout-print-no-headers-v1";

  function remindNoBrowserHeaders() {
    try {
      if (sessionStorage.getItem(PRINT_HINT_KEY)) return;
      sessionStorage.setItem(PRINT_HINT_KEY, "1");
    } catch (e) {
      /* ignore */
    }
    window.alert(
      "导出 PDF 时请在打印窗口：\n\n" +
        "① 目标选「另存为 PDF」\n" +
        "② 勾选「背景图形」\n" +
        "③ 关闭「页眉和页脚」（避免带出文件路径与日期）"
    );
  }

  function bindPrint() {
    var ids = ["btnHandoutPrint", "btnPrint", "btnPrintPdf"];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.dataset.ghPrintBound) return;
      el.dataset.ghPrintBound = "1";
      el.addEventListener("click", function () {
        remindNoBrowserHeaders();
        window.print();
      });
    });
  }

  function normalizePrintHint() {
    var el = document.querySelector(".grammar-handout-print-hint, .no-print-hint");
    if (!el || el.dataset.ghHintNormalized) return;
    el.dataset.ghHintNormalized = "1";
    el.innerHTML =
      "打印 PDF：目标选「另存为 PDF」→ 纸张 A4 → 勾选「<strong>背景图形</strong>」→ " +
      "<strong>取消「页眉和页脚」</strong>（勿带出文件路径与日期）。";
  }

  function init() {
    bindPrint();
    normalizePrintHint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
