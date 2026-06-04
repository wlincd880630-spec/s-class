/**
 * L13RC · 定语从句 · 顶栏「学习目录」
 */
(function () {
  function inject() {
    if (document.body.classList.contains("grammar-handout-page")) return;
    var top = document.querySelector("#l13rc-book .top-bar");
    if (top && !top.querySelector(".l13rc-index-link")) {
      var link = document.createElement("a");
      link.className = "l13rc-index-link";
      link.href = "index.html";
      link.textContent = "学习目录";
      link.setAttribute("aria-label", "返回定语从句学习目录");
      top.appendChild(link);
    } else if (top) {
      var ex = top.querySelector(".l13rc-index-link");
      if (ex) {
        ex.textContent = "学习目录";
        ex.setAttribute("aria-label", "返回定语从句学习目录");
      }
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
