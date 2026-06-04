/**
 * 全课程 HTML：可点击放大的配图（事件委托 + 动态插入图片）
 * 排除：灯箱自身、极小图标、贴纸、显式 data-no-lightbox、交互配图区、L12 专用 p4-click-zoom
 */
(function (global) {
  "use strict";

  var LB_ID = "lesson-img-lightbox";
  var MIN_DISPLAY_PX = 36;

  function isExcluded(img) {
    if (!img || img.tagName !== "IMG") return true;
    var src = String(img.currentSrc || img.src || "").trim();
    if (!src) return true;
    if (img.closest("#" + LB_ID)) return true;
    if (img.classList.contains("lesson-img-lightbox-img")) return true;
    if (img.classList.contains("no-lightbox") || img.hasAttribute("data-no-lightbox")) return true;
    if (img.closest("[data-no-lightbox], .no-lightbox-zone, .viewport-media")) return true;
    if (img.classList.contains("p4-click-zoom")) return true;
    if (img.closest(".sticker-token, .sticker-placed, .tts-chip")) return true;
    if (img.closest("button") && !img.closest(".scene-frame, .comic-frame, figure")) return true;

    var rect = img.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0 && rect.width < MIN_DISPLAY_PX && rect.height < MIN_DISPLAY_PX) {
      return true;
    }
    return false;
  }

  function captionFor(img) {
    var cap =
      img.getAttribute("data-lightbox-caption") ||
      img.getAttribute("data-caption") ||
      img.getAttribute("title") ||
      "";
    if (cap) return String(cap).trim();
    var fig = img.closest("figure");
    if (fig) {
      var fc = fig.querySelector("figcaption");
      if (fc) return fc.textContent.trim();
    }
    var frame = img.closest(".comic-frame");
    if (frame) {
      var tag = frame.querySelector(".comic-panel-tag");
      if (tag) return tag.textContent.trim();
    }
    return img.alt ? String(img.alt).trim() : "";
  }

  function ensureLightbox() {
    var lb = document.getElementById(LB_ID);
    if (lb) return lb;

    lb = document.createElement("div");
    lb.id = LB_ID;
    lb.className = "lesson-img-lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "配图放大");

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lesson-img-lightbox-close";
    closeBtn.setAttribute("aria-label", "关闭");
    closeBtn.textContent = "\u00d7";

    var big = document.createElement("img");
    big.className = "lesson-img-lightbox-img";
    big.alt = "";

    var capEl = document.createElement("p");
    capEl.className = "lesson-img-lightbox-caption";
    capEl.hidden = true;

    lb.appendChild(closeBtn);
    lb.appendChild(big);
    lb.appendChild(capEl);
    document.body.appendChild(lb);

    function close() {
      lb.hidden = true;
      document.body.style.overflow = "";
      closeBtn.blur();
    }

    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      close();
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target === big) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.hidden && e.key === "Escape") close();
    });

    lb._lessonClose = close;
    return lb;
  }

  function openLightbox(img) {
    if (!img || isExcluded(img)) return;
    var lb = ensureLightbox();
    var big = lb.querySelector(".lesson-img-lightbox-img");
    var capEl = lb.querySelector(".lesson-img-lightbox-caption");
    var cap = captionFor(img);
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || "配图";
    if (cap) {
      capEl.textContent = cap;
      capEl.hidden = false;
    } else {
      capEl.hidden = true;
    }
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function decorate(img) {
    if (isExcluded(img)) return;
    img.classList.add("lesson-img-zoomable");
    if (!img.title && !img.getAttribute("data-lightbox-caption")) {
      img.title = "点击放大";
    }
  }

  function scan(root) {
    (root || document).querySelectorAll("img").forEach(decorate);
  }

  function onClick(e) {
    var img = e.target.closest("img");
    if (!img || isExcluded(img)) return;
    e.preventDefault();
    e.stopPropagation();
    openLightbox(img);
  }

  function init() {
    if (document.documentElement.dataset.lessonImageLightbox === "1") return;
    document.documentElement.dataset.lessonImageLightbox = "1";

    ensureLightbox();
    scan(document);

    document.addEventListener("click", onClick, true);

    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === "IMG") decorate(node);
          else if (node.querySelectorAll) scan(node);
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  global.isLessonImageLightboxOpen = function () {
    var lb = document.getElementById(LB_ID);
    return !!(lb && !lb.hidden);
  };
  global.initLessonImageLightbox = init;
  global.openLessonImageLightbox = openLightbox;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
