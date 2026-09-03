(function () {
  "use strict";

  if (window.__primaryResponsiveInit) return;
  window.__primaryResponsiveInit = true;

  function fitPageViewports() {
    if (window.matchMedia("print").matches) return;
    document.querySelectorAll(".page-viewport").forEach(function (vp) {
      var inner = vp.querySelector(".page, .coloring-sheet, .hw-page, .sheet");
      if (!inner) return;
      inner.style.transform = "none";
      inner.style.transformOrigin = "top left";
      var naturalW = inner.offsetWidth;
      var targetW = vp.clientWidth;
      if (!naturalW || !targetW) return;
      var scale = Math.min(1, targetW / naturalW);
      inner.style.transform = scale < 1 ? "scale(" + scale + ")" : "none";
      vp.style.height = scale < 1 ? inner.offsetHeight * scale + "px" : "auto";
    });
  }

  if (typeof window.fitPageViewports !== "function") {
    window.fitPageViewports = fitPageViewports;
    var fitTimer;
    function scheduleFit() {
      clearTimeout(fitTimer);
      fitTimer = setTimeout(fitPageViewports, 120);
    }
    window.addEventListener("resize", scheduleFit);
    window.addEventListener("orientationchange", fitPageViewports);
    window.addEventListener("load", function () {
      fitPageViewports();
      setTimeout(fitPageViewports, 280);
    });
  }

  function isCoursewarePortrait() {
    if (!document.querySelector("body > .app")) return false;
    return (
      window.matchMedia("(pointer: coarse) and (max-width: 1024px)").matches ||
      window.matchMedia("(max-width: 820px)").matches
    );
  }

  function applyCoursewarePortrait() {
    document.documentElement.classList.toggle("ng-courseware-portrait", isCoursewarePortrait());
  }

  applyCoursewarePortrait();
  window.addEventListener("resize", function () {
    setTimeout(function () {
      applyCoursewarePortrait();
      syncCoursewareLayout();
    }, 80);
  });
  window.addEventListener("orientationchange", function () {
    applyCoursewarePortrait();
    syncCoursewareLayout();
  });

  function syncCoursewareLayout() {
    var app = document.querySelector(".app");
    if (!app) return;
    if (isCoursewarePortrait()) {
      app.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
      return;
    }
    var main = app.querySelector(".book-main");
    if (main && main.scrollHeight > main.clientHeight + 2) {
      app.style.overflow = "hidden";
    }
  }

  window.addEventListener("load", syncCoursewareLayout);
})();
