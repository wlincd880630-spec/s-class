/**
 * L13 · 注入「学习目录」链接 → index.html
 */
(function () {
  function inject() {
    var top = document.querySelector("#l13-book .top-bar");
    if (top && !top.querySelector(".l13-index-link")) {
      var topLink = document.createElement("a");
      topLink.className = "l13-index-link";
      topLink.href = "index.html";
      topLink.textContent = "学习目录";
      topLink.setAttribute("aria-label", "返回过去完成时学习目录");
      top.appendChild(topLink);
    }

    var pager = document.querySelector("nav.lesson-pager");
    if (pager && !pager.querySelector("a.l13-index-link")) {
      var pagerLink = document.createElement("a");
      pagerLink.className = "l13-index-link";
      pagerLink.href = "index.html";
      pagerLink.textContent = "目录";
      pagerLink.setAttribute("aria-label", "返回学习目录");
      var mid = pager.querySelector(".pager-mid");
      if (mid) pager.insertBefore(pagerLink, mid);
      else pager.appendChild(pagerLink);
    }

    var handoutBar = document.querySelector(".handout-pdf-bar");
    if (handoutBar && !handoutBar.querySelector(".l13-index-link")) {
      var handoutLink = document.createElement("a");
      handoutLink.className = "l13-index-link";
      handoutLink.href = "index.html";
      handoutLink.textContent = "学习目录";
      handoutBar.appendChild(handoutLink);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
