(function (global) {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var id = document.body.getAttribute("data-l01p-id");
    if (!id || !global.L01pEngine) return;
    global.L01pEngine.render(id);
  });
})(typeof window !== "undefined" ? window : null);
