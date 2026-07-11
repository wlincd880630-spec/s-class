/**
 * L13 课件 · 清爽课堂外壳
 * 只负责进度与控件层级，不改动各课原有教学数据和步骤状态机。
 */
(function () {
  'use strict';

  var app = document.querySelector('.app-container');
  if (!app) return;

  document.body.classList.add('l13rc-clarity-ui');

  app.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('.page-actions button');
    if (!button) return;
    var active = button.closest('.page[data-page]');
    var stagedBefore = active
      ? Array.prototype.slice.call(active.querySelectorAll('.step-item:not(.guide-hidden), .p5-right .question-box:not(.guide-hidden)'))
      : [];
    queueMicrotask(function () {
      var stagedAfter = active
        ? Array.prototype.slice.call(active.querySelectorAll('.step-item:not(.guide-hidden), .p5-right .question-box:not(.guide-hidden)'))
        : [];
      var newStage = stagedAfter.find(function (item) {
        return stagedBefore.indexOf(item) < 0;
      });
      var hiddenAction = newStage && newStage.querySelector('.reveal-btn');
      if (!hiddenAction) return;

      var originalUnlockAudio = window.unlockAudio;
      var originalSpeak = window.speak;
      window.unlockAudio = function () { return Promise.resolve(); };
      window.speak = function () { return Promise.resolve(); };
      try {
        hiddenAction.click();
      } finally {
        queueMicrotask(function () {
          window.unlockAudio = originalUnlockAudio;
          window.speak = originalSpeak;
        });
      }
    });
  }, true);

  var lessonPages = Array.prototype.slice
    .call(document.querySelectorAll('.page[data-page]'))
    .filter(function (page) {
      return page.getAttribute('data-page') !== 'welcome';
    });

  var progress = document.createElement('div');
  progress.className = 'l13rc-lesson-progress';
  progress.setAttribute('aria-live', 'polite');
  progress.hidden = true;
  app.appendChild(progress);

  var homeLink = document.createElement('a');
  homeLink.className = 'l13rc-course-home';
  homeLink.href = 'index.html';
  homeLink.textContent = '课程目录';
  app.appendChild(homeLink);

  function pageLabel(index) {
    var ratio = lessonPages.length ? index / lessonPages.length : 0;
    if (ratio >= 0.88) return '拓展';
    if (ratio >= 0.62) return '深化';
    return '核心';
  }

  function updateProgress() {
    var active = document.querySelector('.page.active[data-page]');
    if (!active || active.classList.contains('page-welcome')) {
      progress.hidden = true;
      return;
    }
    var index = lessonPages.indexOf(active);
    if (index < 0) {
      progress.hidden = true;
      return;
    }
    progress.hidden = false;
    progress.textContent = pageLabel(index + 1) + ' · ' + (index + 1) + ' / ' + lessonPages.length;
  }

  lessonPages.forEach(function (page) {
    var actions = page.querySelector('.page-actions');
    if (!actions) return;

    actions.querySelectorAll('button').forEach(function (button) {
      var text = (button.textContent || '').trim();
      var onclick = button.getAttribute('onclick') || '';
      if (/重播|上一页/.test(text)) button.classList.add('l13rc-action-hidden');
      if (/下一页|进入/.test(text) || /goToPage/.test(onclick)) {
        button.classList.add('l13rc-action-next-page');
      } else {
        button.classList.add('l13rc-action-primary');
      }
    });
  });

  var observer = new MutationObserver(function (records) {
    if (
      records.some(function (record) {
        return record.type === 'attributes' && record.attributeName === 'class';
      })
    ) {
      requestAnimationFrame(updateProgress);
    }
  });

  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'r' || !event.altKey) return;
    var active = document.querySelector('.page.active');
    var readButton = active && active.querySelector('.tts-btn:not(.l13rc-tts-duplicate)');
    if (readButton) {
      event.preventDefault();
      readButton.click();
    }
  });

  updateProgress();
})();
