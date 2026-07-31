(function (global) {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var id = document.body.getAttribute("data-kp-id");
    if (!id || !global.KpEngine) return;
    global.KpEngine.render(id);
    if (global.initHandoutLookup) {
      global.initHandoutLookup({ root: "#kpApp", hint: false });
    } else if (global.KpWord) {
      global.KpWord.bind(document.getElementById("kpApp"));
    }
  });
})(typeof window !== "undefined" ? window : null);
