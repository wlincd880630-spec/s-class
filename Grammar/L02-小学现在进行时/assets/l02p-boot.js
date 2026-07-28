(function (global) {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var id = document.body.getAttribute("data-l02p-id");
    if (!id || !global.L02pEngine) return;
    global.L02pEngine.render(id);
    if (global.initHandoutLookup) {
      global.initHandoutLookup({ root: "#l02pApp", hint: false });
    } else if (global.L02pWord) {
      global.L02pWord.bind(document.getElementById("l02pApp"));
    }
  });
})(typeof window !== "undefined" ? window : null);
