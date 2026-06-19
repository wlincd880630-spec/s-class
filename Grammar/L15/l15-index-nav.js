/**
 * L15 · 注入「学习目录」链接 → index.html（对齐 L13/L14）
 */
(function () {
  function inject() {
    if (document.body.classList.contains("grammar-handout-page")) {
      return;
    }

    var top = document.querySelector("#l15-book .top-bar");
    if (top && !top.querySelector(".l15-index-link")) {
      var topLink = document.createElement("a");
      topLink.className = "l15-index-link";
      topLink.href = "index.html";
      topLink.textContent = "学习目录";
      topLink.setAttribute("aria-label", "返回词性转换与词汇学习目录");
      top.appendChild(topLink);
    } else if (top) {
      var existing = top.querySelector(".l15-index-link");
      if (existing) {
        existing.textContent = "学习目录";
        existing.setAttribute("aria-label", "返回词性转换与词汇学习目录");
      }
    }

    var handoutBar = document.querySelector(".handout-pdf-bar");
    if (handoutBar && !handoutBar.querySelector(".grammar-handout-index-link")) {
      var handoutLink = document.querySelector(".grammar-handout-index-link");
      if (!handoutLink && handoutBar.querySelector(".l15-index-link")) {
        var old = handoutBar.querySelector(".l15-index-link");
        old.textContent = "本讲目录";
        old.className = "grammar-handout-index-link";
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
