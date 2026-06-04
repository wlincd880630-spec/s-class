/**
 * 巩固练习 · 将 .section-card 内每道 .exercise-item 拆为一页，题间翻页
 */
(function () {
  'use strict';

  var frame = document.getElementById('app-frame');
  if (!frame) return;

  frame.classList.add('practice-book');

  var built = false;
  var pages = [];
  var idx = 0;
  var stepper = null;
  var midEl = null;
  var prevBtn = null;
  var nextBtn = null;

  function ensureStepper() {
    if (stepper) return;
    stepper = document.createElement('nav');
    stepper.className = 'practice-pager';
    stepper.setAttribute('aria-label', '题目翻页');
    stepper.innerHTML =
      '<button type="button" id="practice-prev">上一题</button>' +
      '<span class="practice-mid" id="practice-mid" aria-live="polite">1 / 1</span>' +
      '<button type="button" id="practice-next">下一题</button>';
    document.body.appendChild(stepper);
    prevBtn = stepper.querySelector('#practice-prev');
    nextBtn = stepper.querySelector('#practice-next');
    midEl = stepper.querySelector('#practice-mid');
    prevBtn.addEventListener('click', function () {
      show(idx - 1);
    });
    nextBtn.addEventListener('click', function () {
      show(idx + 1);
    });
  }

  function buildPages() {
    if (built) return;
    var sections = frame.querySelectorAll('.section-card');
    if (!sections.length) return;

    var footer = frame.querySelector(':scope > div[style*="text-align: center"]');
    if (footer) footer.remove();

    sections.forEach(function (section) {
      var titleEl = section.querySelector('h2');
      var partTitle = titleEl ? titleEl.textContent.trim() : '';
      if (titleEl) titleEl.remove();

      var sectionInstr = section.querySelector(':scope > .instruction');
      var instrText = sectionInstr ? sectionInstr.textContent.trim() : '';
      if (sectionInstr) sectionInstr.remove();

      var items = section.querySelectorAll('.exercise-item');
      items.forEach(function (item, itemIdx) {
        var page = document.createElement('div');
        page.className = 'practice-page';
        page.setAttribute('data-practice-index', String(pages.length));
        page.setAttribute('data-part-title', partTitle);

        var head = document.createElement('header');
        head.className = 'practice-head';
        head.innerHTML =
          '<p class="practice-kicker">第 ' +
          (pages.length + 1) +
          ' 题</p>' +
          '<h2 class="practice-part-title"></h2>' +
          '<p class="practice-instruction"></p>';
        head.querySelector('.practice-part-title').textContent = partTitle;
        head.querySelector('.practice-instruction').textContent = instrText;
        if (!instrText) head.querySelector('.practice-instruction').hidden = true;

        var body = document.createElement('div');
        body.className = 'practice-body';
        body.appendChild(item);

        page.appendChild(head);
        page.appendChild(body);
        frame.appendChild(page);
        pages.push(page);
      });

      section.remove();
    });

    built = pages.length > 0;
    if (built) show(0);
  }

  function show(i) {
    if (!pages.length) return;
    idx = Math.max(0, Math.min(pages.length - 1, i));
    pages.forEach(function (p, n) {
      p.classList.toggle('active', n === idx);
    });
    if (midEl) midEl.textContent = idx + 1 + ' / ' + pages.length;
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx >= pages.length - 1;
    if (window.L13RCFitPractice) window.L13RCFitPractice();
    else if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('l13rc-practice-page'));
    }
  }

  function ensurePrintReady() {
    buildPages();
    frame.classList.add('is-started');
    frame.style.display = 'flex';
    if (stepper) stepper.classList.add('is-visible');
  }

  function onStart() {
    buildPages();
    ensureStepper();
    frame.classList.add('is-started');
    if (stepper) stepper.classList.add('is-visible');
    show(idx);
  }

  var origStart = window.startApp;
  window.startApp = function () {
    if (typeof origStart === 'function') origStart.apply(this, arguments);
    else {
      var w = document.getElementById('welcome-view');
      if (w) w.style.display = 'none';
      frame.style.display = 'flex';
    }
    onStart();
  };

  document.addEventListener('keydown', function (e) {
    if (!built || !stepper || !stepper.classList.contains('is-visible')) return;
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      show(idx - 1);
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      show(idx + 1);
    }
  });

  document.querySelectorAll('.choice-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var parent = this.parentElement;
      if (!parent) return;
      parent.querySelectorAll('.choice-btn').forEach(function (b) {
        b.style.borderColor = '#e2e8f0';
        b.style.background = 'white';
      });
      this.style.borderColor = 'var(--primary-color, #0ea5e9)';
      this.style.background = '#f0f9ff';
    });
  });

  window.L13RCPracticePager = {
    show: show,
    rebuild: buildPages,
    ensurePrintReady: ensurePrintReady,
    getIndex: function () {
      return idx;
    },
  };
})();
