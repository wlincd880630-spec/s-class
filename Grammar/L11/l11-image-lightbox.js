/**
 * TL11 配图点击放大（scene-frame / comic-frame）
 * 事件委托，支持动态换图（pair-scene-img、disc-scene-img 等）
 */
(function () {
  const LB_ID = "lesson-img-lightbox";
  const ZOOM_IMG =
    "#l11-book .scene-frame img, #app .scene-frame img, #l11-book .comic-frame img, #app .comic-frame img";

  function isZoomTarget(img) {
    if (!img || img.tagName !== "IMG" || !img.src) return false;
    if (img.closest("#" + LB_ID)) return false;
    if (img.closest(".sticker-token, .sticker-placed")) return false;
    if (img.classList.contains("lesson-img-lightbox-img")) return false;
    return !!(img.closest(".scene-frame") || img.closest(".comic-frame"));
  }

  function ensureLightbox() {
    let lb = document.getElementById(LB_ID);
    if (lb) return lb;

    lb = document.createElement("div");
    lb.id = LB_ID;
    lb.className = "lesson-img-lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "配图放大");

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lesson-img-lightbox-close";
    closeBtn.setAttribute("aria-label", "关闭");
    closeBtn.textContent = "×";

    const img = document.createElement("img");
    img.className = "lesson-img-lightbox-img";
    img.alt = "";

    const cap = document.createElement("p");
    cap.className = "lesson-img-lightbox-caption";
    cap.hidden = true;

    lb.appendChild(closeBtn);
    lb.appendChild(img);
    lb.appendChild(cap);
    document.body.insertBefore(lb, document.body.firstChild);

    function close() {
      lb.hidden = true;
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      close();
    });
    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.classList.contains("lesson-img-lightbox-img")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.hidden && e.key === "Escape") close();
    });

    return lb;
  }

  function openLightbox(src, alt, caption) {
    if (!src) return;
    const lb = ensureLightbox();
    const img = lb.querySelector(".lesson-img-lightbox-img");
    const cap = lb.querySelector(".lesson-img-lightbox-caption");
    img.src = src;
    img.alt = alt || "配图";
    if (caption) {
      cap.textContent = caption;
      cap.hidden = false;
    } else {
      cap.hidden = true;
    }
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function decorateZoomImages(root) {
    root.querySelectorAll(ZOOM_IMG).forEach((img) => {
      if (!isZoomTarget(img)) return;
      img.style.cursor = "zoom-in";
      if (!img.title) img.title = "点击放大";
    });
  }

  function initLessonImageLightbox() {
    const root = document.getElementById("l11-book") || document.querySelector("#app");
    if (!root || root.dataset.l11Lightbox === "1") return;
    root.dataset.l11Lightbox = "1";

    ensureLightbox();
    decorateZoomImages(root);

    root.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!isZoomTarget(img)) return;
      e.stopPropagation();
      const frame = img.closest(".comic-frame");
      const tag = frame && frame.querySelector(".comic-panel-tag");
      const caption = tag ? tag.textContent.trim() : "";
      openLightbox(img.currentSrc || img.src, img.alt, caption);
    });

    const obs = new MutationObserver(() => decorateZoomImages(root));
    obs.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
  }

  window.isLessonImageLightboxOpen = function () {
    const lb = document.getElementById(LB_ID);
    return lb && !lb.hidden;
  };

  window.initLessonImageLightbox = initLessonImageLightbox;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLessonImageLightbox);
  } else {
    initLessonImageLightbox();
  }
})();
