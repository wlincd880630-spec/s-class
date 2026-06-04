(function () {
  "use strict";
  function bindPrint() {
    var ids = ["btnHandoutPrint", "btnPrint", "btnPrintPdf"];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.dataset.ghPrintBound) return;
      el.dataset.ghPrintBound = "1";
      el.addEventListener("click", function () {
        window.print();
      });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindPrint);
  } else {
    bindPrint();
  }
})();
