/**
 * L13 课件 · 清爽课堂外壳
 * 只负责进度与控件层级，不改动各课原有教学数据和步骤状态机。
 */
(function () {
  'use strict';

  var app = document.querySelector('.app-container');
  if (!app) return;

  document.body.classList.add('l13rc-clarity-ui');

  var lessonPages = Array.prototype.slice
    .call(app.querySelectorAll('.page[data-page]'))
    .filter(function (page) {
      return page.getAttribute('data-page') !== 'welcome';
    });

  var progress = document.createElement('div');
  progress.className = 'l13rc-lesson-progress';
  progress.setAttribute('aria-live', 'polite');
  progress.hidden = true;
  app.appendChild(progress);

  function pageLabel(index) {
    var ratio = lessonPages.length ? index / lessonPages.length : 0;
    if (ratio >= 0.88) return '拓展';
    if (ratio >= 0.62) return '深化';
    return '核心';
  }

  function updateProgress() {
    var active = app.querySelector('.page.active[data-page]');
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

  observer.observe(app, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'r' || !event.altKey) return;
    var active = app.querySelector('.page.active');
    var readButton = active && active.querySelector('.tts-btn:not(.l13rc-tts-duplicate)');
    if (readButton) {
      event.preventDefault();
      readButton.click();
    }
  });

  updateProgress();
})();
