/**
 * 巩固练习 · 打印：按 Part 分页（每 Part 一页），屏幕仍为一题一页
 */
(function () {
  'use strict';

  var snapshot = null;

  function clearFitStyles() {
    document.querySelectorAll('.l13rc-fit-target').forEach(function (el) {
      el.classList.remove('l13rc-fit-target');
      el.style.transform = '';
      el.style.width = '';
      el.style.marginLeft = '';
      el.style.marginRight = '';
    });
  }

  function groupPagesByPart(pages) {
    var groups = [];
    var current = null;

    pages.forEach(function (page) {
      var titleEl = page.querySelector('.practice-part-title');
      var title =
        page.getAttribute('data-part-title') ||
        (titleEl ? titleEl.textContent.trim() : '') ||
        '练习';
      var instrEl = page.querySelector('.practice-instruction');
      var instr =
        instrEl && !instrEl.hidden ? instrEl.textContent.trim() : '';

      if (!current || current.title !== title) {
        current = { title: title, instr: instr, pages: [] };
        groups.push(current);
      } else if (instr && !current.instr) {
        current.instr = instr;
      }
      current.pages.push(page);
    });

    return groups;
  }

  function buildPrintByPart(frame) {
    var existing = document.getElementById('l13rc-print-sheet');
    if (existing) existing.remove();

    var pages = Array.from(frame.querySelectorAll('.practice-page'));
    if (!pages.length) return null;

    var sheet = document.createElement('div');
    sheet.className = 'practice-print-sheet';
    sheet.id = 'l13rc-print-sheet';
    var moves = [];

    groupPagesByPart(pages).forEach(function (group, gi) {
      var section = document.createElement('section');
      section.className = 'practice-print-part';
      section.setAttribute('data-part-index', String(gi));

      var head = document.createElement('header');
      head.className = 'practice-print-part-head';
      head.innerHTML =
        '<h2 class="practice-print-part-title"></h2>' +
        '<p class="practice-print-instruction"></p>';
      head.querySelector('.practice-print-part-title').textContent = group.title;
      var instrNode = head.querySelector('.practice-print-instruction');
      if (group.instr) {
        instrNode.textContent = group.instr;
      } else {
        instrNode.hidden = true;
      }

      var body = document.createElement('div');
      body.className = 'practice-print-part-body';

      group.pages.forEach(function (page, qi) {
        var practiceBody = page.querySelector('.practice-body');
        var item =
          (practiceBody && practiceBody.querySelector('.exercise-item')) ||
          practiceBody;
        if (!item) return;

        var wrap = document.createElement('div');
        wrap.className = 'practice-print-item';
        wrap.setAttribute('data-item-index', String(qi));

        moves.push({
          node: item,
          parent: item.parentNode,
          next: item.nextSibling,
          wrap: wrap,
        });

        wrap.appendChild(item);
        body.appendChild(wrap);
        page.classList.add('l13rc-print-source-hidden');
      });

      section.appendChild(head);
      section.appendChild(body);
      sheet.appendChild(section);
    });

    frame.appendChild(sheet);
    return { sheet: sheet, moves: moves, pages: pages };
  }

  function teardownPrintByPart(layout) {
    if (!layout) return;
    layout.moves.forEach(function (m) {
      if (m.parent && m.node.parentNode !== m.parent) {
        if (m.next && m.next.parentNode === m.parent) {
          m.parent.insertBefore(m.node, m.next);
        } else {
          m.parent.appendChild(m.node);
        }
      }
    });
    layout.pages.forEach(function (page) {
      page.classList.remove('l13rc-print-source-hidden');
    });
    if (layout.sheet && layout.sheet.parentNode) {
      layout.sheet.parentNode.removeChild(layout.sheet);
    }
  }

  function preparePrint() {
    if (snapshot) return;

    var frame = document.getElementById('app-frame');
    var welcome = document.getElementById('welcome-view');

    snapshot = {
      welcomeDisplay: welcome ? welcome.style.display : '',
      frameDisplay: frame ? frame.style.display : '',
      frameStarted: frame ? frame.classList.contains('is-started') : false,
      activeIndex:
        window.L13RCPracticePager && typeof window.L13RCPracticePager.getIndex === 'function'
          ? window.L13RCPracticePager.getIndex()
          : 0,
      printLayout: null,
    };

    if (window.L13RCPracticePager && typeof window.L13RCPracticePager.ensurePrintReady === 'function') {
      window.L13RCPracticePager.ensurePrintReady();
    } else if (frame) {
      frame.style.display = 'block';
      frame.classList.add('is-started');
    }

    if (welcome) welcome.style.display = 'none';
    if (frame) {
      frame.style.display = 'block';
      frame.classList.add('is-started');
    }

    document.body.classList.add('l13rc-practice-printing');
    clearFitStyles();

    if (frame) {
      snapshot.printLayout = buildPrintByPart(frame);
    }
  }

  function restorePrint() {
    if (!snapshot) return;

    var frame = document.getElementById('app-frame');
    var welcome = document.getElementById('welcome-view');

    teardownPrintByPart(snapshot.printLayout);

    document.body.classList.remove('l13rc-practice-printing');
    document.querySelectorAll('#app-frame .practice-page').forEach(function (page) {
      page.classList.remove('l13rc-print-show', 'l13rc-print-source-hidden');
    });

    if (welcome) welcome.style.display = snapshot.welcomeDisplay;
    if (frame) {
      frame.style.display = snapshot.frameDisplay;
      if (!snapshot.frameStarted) frame.classList.remove('is-started');
    }

    if (window.L13RCPracticePager && typeof window.L13RCPracticePager.show === 'function') {
      window.L13RCPracticePager.show(snapshot.activeIndex);
    }

    if (window.L13RCFitPractice) window.L13RCFitPractice();

    snapshot = null;
  }

  window.l13rcPracticePrint = function () {
    preparePrint();
    window.print();
  };

  window.addEventListener('beforeprint', preparePrint);
  window.addEventListener('afterprint', restorePrint);
})();
