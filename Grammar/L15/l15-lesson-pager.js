/**
 * L15 · 课内多屏翻页（对齐全课程 lesson-pager 标准）
 */
(function () {
  "use strict";

  function bindTts() {
    document.querySelectorAll(".tts-chip, .tts-btn").forEach(function (btn) {
      if (btn.dataset.l15TtsBound) return;
      btn.dataset.l15TtsBound = "1";
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-tts") || btn.textContent;
        if (window.playLessonAzureTtsPlain) window.playLessonAzureTtsPlain(t);
      });
    });
  }

  function init(opts) {
    opts = opts || {};
    var pages = document.querySelectorAll(".lesson-page");
    if (!pages.length) return null;

    var cur = 0;
    var prevBtn = document.getElementById("pager-prev");
    var nextBtn = document.getElementById("pager-next");
    var midEl = document.getElementById("pager-mid");

    function show(i) {
      cur = Math.max(0, Math.min(pages.length - 1, i));
      pages.forEach(function (p, j) {
        p.classList.toggle("active", j === cur);
      });
      if (midEl) midEl.textContent = cur + 1 + " / " + pages.length;
      if (prevBtn) prevBtn.disabled = cur === 0;
      if (nextBtn) nextBtn.disabled = cur >= pages.length - 1;
      if (typeof opts.onShow === "function") opts.onShow(cur, pages[cur]);
      bindTts();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        show(cur - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        show(cur + 1);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (!pages.length) return;
      if (e.key === "ArrowLeft" && cur > 0) {
        e.preventDefault();
        show(cur - 1);
      } else if (e.key === "ArrowRight" && cur < pages.length - 1) {
        e.preventDefault();
        show(cur + 1);
      }
    });

    bindTts();
    show(typeof opts.start === "number" ? opts.start : 0);

    return {
      show: show,
      getIndex: function () {
        return cur;
      },
    };
  }

  window.L15LessonPager = { init: init };
})();
