/**
 * 巩固练习 · 打印 PDF：封面 + 每 Part 一页，屏幕仍为一题一页
 */
(function () {
  'use strict';

  var LOGO_URL =
    'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png';

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

  function readPrintMeta() {
    var body = document.body;
    var frame = document.getElementById('app-frame');
    var source = frame || body;
    return {
      kicker:
        source.getAttribute('data-practice-kicker') ||
        '第13讲 · 定语从句 · 课堂练习',
      title:
        source.getAttribute('data-practice-title') ||
        document.title.replace(/^第13讲[^·]*·\s*/, '').trim() ||
        'Relative Clauses',
      subtitle:
        source.getAttribute('data-practice-subtitle') ||
        '定语从句巩固练习',
      partCount: source.getAttribute('data-practice-parts') || '',
      questionCount: source.getAttribute('data-practice-questions') || '',
    };
  }

  function parsePartTitle(title) {
    var raw = String(title || '').trim();
    var match = raw.match(/^Part\s+(\d+)\s*:\s*(.+)$/i);
    if (match) {
      return { badge: 'Part ' + match[1], label: match[2].trim() };
    }
    return { badge: '', label: raw || '练习' };
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

  function buildCoverPage(sheet, meta, partTotal, questionTotal) {
    var cover = document.createElement('section');
    cover.className = 'practice-print-cover';

    var logo = document.createElement('img');
    logo.className = 'practice-print-logo';
    logo.src = LOGO_URL;
    logo.alt = "Steven's Class";
    logo.width = 204;
    logo.height = 61;
    logo.decoding = 'async';

    var banner = document.createElement('div');
    banner.className = 'practice-print-cover-banner';
    banner.innerHTML =
      '<p class="practice-print-cover-kicker"></p>' +
      '<h1 class="practice-print-cover-title"></h1>' +
      '<p class="practice-print-cover-sub"></p>';
    banner.querySelector('.practice-print-cover-kicker').textContent = meta.kicker;
    banner.querySelector('.practice-print-cover-title').textContent = meta.title;
    banner.querySelector('.practice-print-cover-sub').textContent = meta.subtitle;

    var stats = document.createElement('ul');
    stats.className = 'practice-print-cover-stats';
    if (partTotal) {
      var partLi = document.createElement('li');
      partLi.textContent = partTotal + ' 个 Part';
      stats.appendChild(partLi);
    }
    if (questionTotal) {
      var qLi = document.createElement('li');
      qLi.textContent = questionTotal + ' 道题';
      stats.appendChild(qLi);
    }

    var foot = document.createElement('p');
    foot.className = 'practice-print-cover-foot';
    foot.textContent =
      '打印提示：目标选「另存为 PDF」→ 纸张 A4 → 勾选「背景图形」→ 取消「页眉和页脚」。';

    cover.appendChild(logo);
    cover.appendChild(banner);
    if (stats.children.length) cover.appendChild(stats);
    cover.appendChild(foot);
    sheet.appendChild(cover);
  }

  function buildPrintByPart(frame) {
    var existing = document.getElementById('l13rc-print-sheet');
    if (existing) existing.remove();

    var pages = Array.from(frame.querySelectorAll('.practice-page'));
    if (!pages.length) return null;

    var meta = readPrintMeta();
    var groups = groupPagesByPart(pages);
    var sheet = document.createElement('div');
    sheet.className = 'practice-print-sheet';
    sheet.id = 'l13rc-print-sheet';
    var moves = [];

    buildCoverPage(
      sheet,
      meta,
      meta.partCount || String(groups.length),
      meta.questionCount || String(pages.length)
    );

    groups.forEach(function (group, gi) {
      var partMeta = parsePartTitle(group.title);
      var section = document.createElement('section');
      section.className = 'practice-print-part';
      section.setAttribute('data-part-index', String(gi));

      var head = document.createElement('header');
      head.className = 'practice-print-part-head';
      head.innerHTML =
        '<span class="practice-print-part-badge"></span>' +
        '<h2 class="practice-print-part-title"></h2>' +
        '<p class="practice-print-instruction"></p>';
      head.querySelector('.practice-print-part-badge').textContent =
        partMeta.badge || 'Part ' + (gi + 1);
      head.querySelector('.practice-print-part-title').textContent = partMeta.label;
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

      var partFoot = document.createElement('footer');
      partFoot.className = 'practice-print-part-foot';
      partFoot.textContent =
        "Steven's Class · " + meta.title + ' · ' + (partMeta.badge || 'Part ' + (gi + 1));

      section.appendChild(head);
      section.appendChild(body);
      section.appendChild(partFoot);
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

  function stripPlaceholders() {
    document.querySelectorAll('input[type="text"]').forEach(function (inp) {
      inp.dataset.placeholderBackup = inp.getAttribute('placeholder') || '';
      inp.removeAttribute('placeholder');
    });
  }

  function restorePlaceholders() {
    document.querySelectorAll('input[type="text"]').forEach(function (inp) {
      if (inp.dataset.placeholderBackup) {
        inp.setAttribute('placeholder', inp.dataset.placeholderBackup);
        delete inp.dataset.placeholderBackup;
      }
    });
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
    stripPlaceholders();

    if (frame) {
      snapshot.printLayout = buildPrintByPart(frame);
    }
  }

  function restorePrint() {
    if (!snapshot) return;

    var frame = document.getElementById('app-frame');
    var welcome = document.getElementById('welcome-view');

    teardownPrintByPart(snapshot.printLayout);
    restorePlaceholders();

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

  function mountPdfBar() {
    if (document.getElementById('l13rc-practice-pdf-bar')) return;

    document.body.classList.add('l13rc-practice-pdf');

    var bar = document.createElement('div');
    bar.className = 'practice-pdf-bar';
    bar.id = 'l13rc-practice-pdf-bar';
    bar.innerHTML =
      '<button type="button" class="btn-practice-pdf" id="btnPracticePdf" title="按 Part 分页打印练习册">' +
      '<i class="fas fa-file-pdf" aria-hidden="true"></i>' +
      '<span>打印 PDF</span>' +
      '</button>' +
      '<p class="practice-pdf-hint no-print">' +
      '目标选「<strong>另存为 PDF</strong>」→ A4 → 勾选「<strong>背景图形</strong>」→ 取消「页眉和页脚」。' +
      '每 Part 独占一页。' +
      '</p>';

    document.body.appendChild(bar);
    bar.querySelector('#btnPracticePdf').addEventListener('click', function () {
      window.l13rcPracticePrint();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountPdfBar);
  } else {
    mountPdfBar();
  }
})();
