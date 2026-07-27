(function (global) {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var id = document.body.getAttribute("data-l03p-id");
    if (!id || !global.L03pEngine) return;
    global.L03pEngine.render(id);
    if (global.initHandoutLookup) {
      global.initHandoutLookup({ root: "#l03pApp", hint: false });
    } else if (global.L03pWord) {
      global.L03pWord.bind(document.getElementById("l03pApp"));
    }
  });
})(typeof window !== "undefined" ? window : null);
