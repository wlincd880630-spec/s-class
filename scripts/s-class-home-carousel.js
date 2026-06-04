/**
 * 首页卡片轮播：教学方法 / 各学段模块卡片 — 支持左右滑动、自动播放、手动切换
 */
(function () {
  "use strict";

  var AUTOPLAY_MS = 5500;

  function buildCarousel(container, slideSelector) {
    if (!container || container.dataset.carouselReady === "1") return;

    var slides = [];
    for (var i = 0; i < container.children.length; i++) {
      var child = container.children[i];
      if (child.matches(slideSelector)) slides.push(child);
    }
    if (slides.length <= 1) return;

    container.dataset.carouselReady = "1";
    container.classList.add("is-carousel");
    container.dataset.autoplay = String(AUTOPLAY_MS);

    var viewport = document.createElement("div");
    viewport.className = "card-carousel-viewport";
    viewport.setAttribute("tabindex", "0");
    viewport.setAttribute("aria-roledescription", "carousel");

    var track = document.createElement("div");
    track.className = "card-carousel-track";

    slides.forEach(function (slide, idx) {
      slide.classList.add("carousel-slide");
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", idx + 1 + " / " + slides.length);
      track.appendChild(slide);
    });

    viewport.appendChild(track);

    var controls = document.createElement("div");
    controls.className = "card-carousel-controls";
    controls.innerHTML =
      '<button type="button" class="carousel-btn carousel-prev" aria-label="上一张"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>' +
      '<div class="carousel-dots" role="tablist"></div>' +
      '<button type="button" class="carousel-btn carousel-next" aria-label="下一张"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>' +
      '<button type="button" class="carousel-btn carousel-toggle is-playing" aria-label="暂停自动播放" title="暂停/继续自动播放"><i class="fas fa-pause" aria-hidden="true"></i></button>';

    container.textContent = "";
    container.appendChild(viewport);
    container.appendChild(controls);

    var dotsWrap = controls.querySelector(".carousel-dots");
    slides.forEach(function (_, idx) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (idx === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "第 " + (idx + 1) + " 张");
      dot.dataset.index = String(idx);
      dotsWrap.appendChild(dot);
    });

    bindCarousel(container, viewport, track, slides, controls);
  }

  function bindCarousel(root, viewport, track, slides, controls) {
    var index = 0;
    var timer = null;
    var paused = false;
    var autoplayMs = parseInt(root.dataset.autoplay, 10) || AUTOPLAY_MS;

    function scrollToIndex(i, smooth) {
      index = (i + slides.length) % slides.length;
      var slide = slides[index];
      var left = slide.offsetLeft - track.offsetLeft;
      viewport.scrollTo({ left: left, behavior: smooth === false ? "auto" : "smooth" });
      updateDots();
    }

    function updateDots() {
      var dots = controls.querySelectorAll(".carousel-dot");
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle("is-active", d === index);
      }
      for (var s = 0; s < slides.length; s++) {
        slides[s].setAttribute("aria-hidden", s === index ? "false" : "true");
      }
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (paused || slides.length <= 1) return;
      timer = setInterval(function () {
        scrollToIndex(index + 1, true);
      }, autoplayMs);
    }

    function nearestIndex() {
      var left = viewport.scrollLeft;
      var best = 0;
      var bestDist = Infinity;
      for (var i = 0; i < slides.length; i++) {
        var dist = Math.abs(slides[i].offsetLeft - track.offsetLeft - left);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      return best;
    }

    controls.querySelector(".carousel-prev").addEventListener("click", function () {
      scrollToIndex(index - 1, true);
      startAutoplay();
    });

    controls.querySelector(".carousel-next").addEventListener("click", function () {
      scrollToIndex(index + 1, true);
      startAutoplay();
    });

    controls.querySelector(".carousel-toggle").addEventListener("click", function () {
      var btn = this;
      paused = !paused;
      btn.classList.toggle("is-playing", !paused);
      btn.setAttribute("aria-label", paused ? "继续自动播放" : "暂停自动播放");
      var icon = btn.querySelector("i");
      if (icon) {
        icon.className = paused ? "fas fa-play" : "fas fa-pause";
      }
      if (paused) stopAutoplay();
      else startAutoplay();
    });

    controls.querySelector(".carousel-dots").addEventListener("click", function (e) {
      var dot = e.target.closest(".carousel-dot");
      if (!dot) return;
      scrollToIndex(parseInt(dot.dataset.index, 10), true);
      startAutoplay();
    });

    viewport.addEventListener(
      "scroll",
      function () {
        window.clearTimeout(viewport._carouselScrollT);
        viewport._carouselScrollT = window.setTimeout(function () {
          index = nearestIndex();
          updateDots();
        }, 80);
      },
      { passive: true }
    );

    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);
    viewport.addEventListener("focusin", stopAutoplay);
    viewport.addEventListener("focusout", startAutoplay);

    viewport.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(index - 1, true);
        startAutoplay();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(index + 1, true);
        startAutoplay();
      }
    });

    window.addEventListener("resize", function () {
      scrollToIndex(index, false);
    });

    updateDots();
    startAutoplay();
  }

  function init() {
    var pillarGrid = document.querySelector(".pillar-grid");
    if (pillarGrid) buildCarousel(pillarGrid, ".pillar-card");

    /* 学段模块改为静态网格，仅教学方法区轮播 */
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
