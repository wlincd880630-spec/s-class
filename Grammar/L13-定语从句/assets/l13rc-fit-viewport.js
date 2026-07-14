/**
 * 定语从句 · 将当前屏内容等比缩放到可视区域内（适配各设备视口 / 横竖屏 / 虚拟键盘）
 */
(function () {
  'use strict';

  var isIndexPage =
    document.body.classList.contains('g-index-scaled') ||
    document.documentElement.classList.contains('g-index-scaled');

  /* 目录页需要整页滚动；课件/练习页才锁定视口 */
  if (!isIndexPage) {
    document.documentElement.classList.add('l13rc-no-scroll-root');
  }

  var PAD = 6;
  var rafId = 0;
  var lastTarget = null;
  var isHandout = document.body.classList.contains('grammar-handout-page');

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  function viewportSize() {
    var vv = window.visualViewport;
    if (vv) {
      return { w: vv.width, h: vv.height, offsetTop: vv.offsetTop || 0 };
    }
    return { w: window.innerWidth, h: window.innerHeight, offsetTop: 0 };
  }

  function getMinScale(stage) {
    var w = viewportSize().w;
    if (stage && stage.id === 'app-frame') {
      if (w < 360) return 0.38;
      if (w < 480) return 0.42;
      return 0.48;
    }
    if (w < 360) return 0.4;
    if (w < 480) return 0.45;
    if (w < 768) return 0.5;
    if (w < 1024) return 0.55;
    return 0.58;
  }

  function getStage() {
    var appFrame = document.getElementById('app-frame');
    if (appFrame && appFrame.style.display !== 'none' && appFrame.offsetParent !== null) {
      return appFrame;
    }
    var ac = document.querySelector('.app-container');
    if (ac) return ac;
    var book = document.getElementById('l13rc-book');
    if (book) return book.closest('#app') || book;
    var idx = document.querySelector('body.g-index-scaled .g-index');
    if (idx) return idx;
    return null;
  }

  function getFitTarget(stage) {
    if (!stage) return null;
    if (stage.classList && stage.classList.contains('app-container')) {
      var activePage = stage.querySelector('.page.active') || stage.querySelector('.page-welcome.active');
      if (activePage && activePage.querySelector('.picture-pick-split')) {
        return (
          activePage.querySelector('.picture-pick-copy') ||
          activePage.querySelector('.picture-pick-text')
        );
      }
      return activePage;
    }
    if (stage.id === 'app-frame') {
      var practicePage = stage.querySelector('.practice-page.active');
      if (practicePage) return practicePage;
      return stage;
    }
    if (stage.id === 'l13rc-book' || stage.querySelector('#l13rc-book')) {
      var book = stage.id === 'l13rc-book' ? stage : stage.querySelector('#l13rc-book');
      var lessonPage = book && book.querySelector('.lesson-page.active');
      if (!lessonPage) return book;
      return lessonPage.querySelector('.panel') || lessonPage;
    }
    if (stage.classList && stage.classList.contains('g-index')) return stage;
    return stage;
  }

  function clearFit(el) {
    if (!el) return;
    el.classList.remove('l13rc-fit-target', 'l13rc-fit-no-scale');
    el.style.transform = '';
    el.style.width = '';
    el.style.marginLeft = '';
    el.style.marginRight = '';
  }

  function markScrollRegions(stage, on) {
    if (!stage) return;
    var list = [stage];
    if (stage.classList && stage.classList.contains('app-container')) {
      var page = stage.querySelector('.page.active');
      if (page) list.push(page);
    }
    if (stage.id === 'app-frame') {
      var pp = stage.querySelector('.practice-page.active');
      if (pp) {
        list.push(pp);
        var body = pp.querySelector('.practice-body');
        if (body) list.push(body);
      }
    }
    list.forEach(function (el) {
      el.classList.toggle('l13rc-scroll-region', on);
      el.classList.toggle('l13rc-uses-scroll', on);
    });
    document.body.classList.toggle('l13rc-uses-scroll', on);
  }

  function stageBox(stage) {
    var vp = viewportSize();
    var rect = stage.getBoundingClientRect();
    var top = Math.max(rect.top, vp.offsetTop);
    var h = Math.min(rect.height, vp.h - Math.max(0, rect.top - vp.offsetTop));
    var w = Math.min(rect.width, vp.w);
    return {
      top: top,
      h: Math.max(40, h - PAD),
      w: Math.max(40, w - PAD),
    };
  }

  function fitOne(stage, target) {
    clearFit(target);
    markScrollRegions(stage, false);
    if (!stage || !target) return;

    target.classList.add('l13rc-fit-target');
    target.style.transform = 'none';

    var box = stageBox(stage);
    if (box.h < 40 || box.w < 40) return;

    var contentH = target.scrollHeight;
    var contentW = target.scrollWidth;
    if (contentH < 2 || contentW < 2) return;

    var minScale = getMinScale(stage);
    var fitScale = Math.min(1, box.h / contentH, box.w / contentW);
    var preserveMergeLesson =
      target.matches &&
      target.matches('.page') &&
      target.querySelector('.p5-two-col');

    /* 合并句教学及桌面投影优先保留课堂字号；内容较多时改用区内滚动。 */
    if ((preserveMergeLesson || viewportSize().w >= 900) && fitScale < 0.995) {
      target.classList.add('l13rc-fit-no-scale');
      markScrollRegions(stage, true);
      return;
    }

    /* 缩放过小仍放不下 → 保持原字号，区内滚动 */
    if (fitScale < minScale + 0.02) {
      target.classList.add('l13rc-fit-no-scale');
      markScrollRegions(stage, true);
      return;
    }

    var scale = Math.max(minScale, fitScale);

    if (scale >= 0.995) return;

    target.style.transform = 'scale(' + scale + ')';
    target.style.width = 100 / scale + '%';
    target.style.marginLeft = 'auto';
    target.style.marginRight = 'auto';
  }

  function fitAll() {
    if (isHandout) return;
    if (document.body.classList.contains('g-index-scaled')) return;
    if (document.body.classList.contains('l13rc-practice-printing')) return;
    if (lastTarget) clearFit(lastTarget);
    lastTarget = null;

    var stage = getStage();
    var target = getFitTarget(stage);
    if (!target) return;

    lastTarget = target;
    fitOne(stage, target);
  }

  function queueFit() {
    if (isHandout) return;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function () {
      rafId = 0;
      fitAll();
      requestAnimationFrame(fitAll);
    });
  }

  var onResize = debounce(queueFit, 100);

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', function () {
    setTimeout(queueFit, 80);
    setTimeout(queueFit, 350);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onResize);
    window.visualViewport.addEventListener('scroll', onResize);
  }

  window.addEventListener('load', function () {
    setTimeout(queueFit, 80);
    setTimeout(queueFit, 400);
  });

  if (typeof MutationObserver !== 'undefined' && !isHandout) {
    var mo = new MutationObserver(queueFit);
    mo.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden'],
      childList: true,
    });
  }

  var origGo = window.goToPageSafe;
  if (typeof origGo === 'function') {
    window.goToPageSafe = function () {
      var out = origGo.apply(this, arguments);
      queueFit();
      return out;
    };
  }

  var origLeave = window.leaveWelcomeAndGoTo;
  if (typeof origLeave === 'function') {
    window.leaveWelcomeAndGoTo = function () {
      var out = origLeave.apply(this, arguments);
      queueFit();
      return out;
    };
  }

  if (typeof window.startApp === 'function') {
    var origStart = window.startApp;
    window.startApp = function () {
      var out = origStart.apply(this, arguments);
      setTimeout(queueFit, 50);
      setTimeout(queueFit, 300);
      return out;
    };
  }

  document.addEventListener(
    'click',
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (
        t.closest('.reveal-btn') ||
        t.closest('.guide-launch') ||
        t.closest('.tts-btn') ||
        t.closest('.yesno-btn') ||
        t.closest('.image-card') ||
        t.closest('.corpus-tab') ||
        t.closest('.carousel-dots') ||
        t.closest('.tier-tab') ||
        t.closest('#pager-prev') ||
        t.closest('#pager-next')
      ) {
        setTimeout(queueFit, 60);
        setTimeout(queueFit, 350);
      }
    },
    true
  );

  window.L13RCFitPractice = queueFit;
  window.addEventListener('l13rc-practice-page', queueFit);

  queueFit();
})();
