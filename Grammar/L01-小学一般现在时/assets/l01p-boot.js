(function (global) {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var id = document.body.getAttribute("data-l01p-id");
    if (!id || !global.L01pEngine) return;
    global.L01pEngine.render(id);
    if (global.initHandoutLookup) {
      global.initHandoutLookup({ root: "#l01pApp", hint: false });
    } else if (global.L01pWord) {
      global.L01pWord.bind(document.getElementById("l01pApp"));
    }
  });
})(typeof window !== "undefined" ? window : null);
