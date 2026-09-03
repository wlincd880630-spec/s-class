/* REFH courseware: viewport, hamburger nav, vocab card classes */
(function () {
  'use strict';

  function ensureViewport() {
    var meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    if (!/viewport-fit/.test(meta.content || '')) {
      meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    }
  }

  function enhanceNav(nav) {
    if (!nav || nav.dataset.refhResponsive === '1') return;
    nav.dataset.refhResponsive = '1';
    var links = nav.querySelector('.links');
    if (!links) return;
    if (nav.querySelector('.nav-toggle')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', '打开菜单');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '☰';
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '✕' : '☰';
    });
    nav.insertBefore(btn, links);

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '☰';
      }
    });
  }

  function scanNav() {
    document.querySelectorAll('nav.top-nav').forEach(enhanceNav);
  }

  function markVocabCards() {
    document.querySelectorAll('.card-grid .flip-card').forEach(function (card) {
      if (card.className.indexOf('flip-card--') !== -1) return;
      var badge = card.querySelector('.badge');
      var text = ((badge && badge.textContent) || '').trim();
      if (text === '句型' || /badge-pattern/.test((badge && badge.className) || '')) {
        card.classList.add('flip-card--pattern');
      } else if (/badge-verb|badge-noun|badge-adj/.test((badge && badge.className) || '') || /phrase|词组/.test(text)) {
        card.classList.add('flip-card--phrase');
      } else {
        card.classList.add('flip-card--word');
      }
    });
  }

  function observe() {
    if (!document.body) return;
    var scheduled = false;
    function run() {
      scheduled = false;
      scanNav();
      markVocabCards();
    }
    var mo = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(run);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    run();
  }

  ensureViewport();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
})();
