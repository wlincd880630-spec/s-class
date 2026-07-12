/**
 * L13 语料中心 · 成都中考真题定语从句专栏
 */
(function () {
  'use strict';

  var data = window.P13RC_ZK;
  if (!data || !data.years) return;

  var root = document.getElementById('corpus-zk-years');
  if (!root) return;

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function displaySentence(item) {
    return item.sentenceComplete || item.sentence || '';
  }

  function highlightFills(sentence, fills) {
    if (!fills || !fills.length) return esc(sentence);
    var marks = fills
      .map(function (fill) {
        var index = sentence.indexOf(fill.answer);
        if (index < 0) return null;
        return { index: index, end: index + fill.answer.length };
      })
      .filter(Boolean)
      .sort(function (a, b) {
        return a.index - b.index;
      });
    if (!marks.length) return esc(sentence);
    var html = '';
    var cursor = 0;
    marks.forEach(function (mark) {
      if (mark.index < cursor) return;
      html += esc(sentence.slice(cursor, mark.index));
      html +=
        '<span class="corpus-zk__hl is-fill">' +
        esc(sentence.slice(mark.index, mark.end)) +
        '</span>';
      cursor = mark.end;
    });
    html += esc(sentence.slice(cursor));
    return html;
  }

  function highlightSentence(sentence, highlights, fills) {
    var source = String(sentence || '');
    if (!highlights || !highlights.length) return esc(source);

    var marks = highlights
      .map(function (part) {
        var index = source.indexOf(part.text);
        if (index < 0) return null;
        return { index: index, end: index + part.text.length, type: part.type || 'clause' };
      })
      .filter(Boolean)
      .sort(function (a, b) {
        return a.index - b.index;
      });

    if (!marks.length) return esc(source);

    var html = '';
    var cursor = 0;
    marks.forEach(function (mark) {
      if (mark.index < cursor) return;
      html += esc(source.slice(cursor, mark.index));
      html +=
        '<span class="corpus-zk__hl is-' +
        esc(mark.type) +
        '">' +
        esc(source.slice(mark.index, mark.end)) +
        '</span>';
      cursor = mark.end;
    });
    html += esc(source.slice(cursor));
    return html;
  }

  function sectionClass(section) {
    return (
      {
        阅读: 'is-reading',
        '12选10': 'is-fill10',
        '6选5': 'is-fill5',
        图表阅读: 'is-chart',
        完形填空: 'is-cloze',
      }[section] || 'is-reading'
    );
  }

  function renderCard(item) {
    var actions = [
      { key: 'socratic', label: '苏格拉底引导' },
      { key: 'structure', label: '句子结构' },
      { key: 'highlight', label: '从句高亮' },
      { key: 'zh', label: '中文翻译' },
    ];
    var sentence = displaySentence(item);

    return (
      '<article class="corpus-zk__card" data-zk-id="' +
      esc(item.id) +
      '">' +
      '<header class="corpus-zk__card-head">' +
      '<span class="corpus-zk__badge ' +
      sectionClass(item.section) +
      '">' +
      esc(item.section) +
      '</span>' +
      '<span class="corpus-zk__paper">' +
      esc(item.paper) +
      '</span>' +
      '<span class="corpus-zk__relation">' +
      esc(item.relation) +
      ' · ' +
      esc(item.role) +
      '</span>' +
      '</header>' +
      '<p class="corpus-zk__sentence" lang="en">' +
      highlightFills(sentence, item.fills) +
      '</p>' +
      '<p class="corpus-zk__context">' +
      esc(item.context) +
      '</p>' +
      '<div class="corpus-zk__actions">' +
      actions
        .map(function (action) {
          return (
            '<button type="button" class="corpus-zk__action" data-zk-action="' +
            action.key +
            '">' +
            esc(action.label) +
            '</button>'
          );
        })
        .join('') +
      '</div>' +
      '<div class="corpus-zk__panel" data-zk-panel="socratic" hidden>' +
      '<h4>苏格拉底式引导</h4><ol>' +
      (item.socratic || [])
        .map(function (q) {
          return '<li>' + esc(q) + '</li>';
        })
        .join('') +
      '</ol></div>' +
      '<div class="corpus-zk__panel" data-zk-panel="structure" hidden>' +
      '<h4>句子结构分析</h4><div class="corpus-zk__structure">' +
      (item.structure || '') +
      '</div></div>' +
      '<div class="corpus-zk__panel" data-zk-panel="highlight" hidden>' +
      '<h4>定语从句高亮</h4>' +
      '<p class="corpus-zk__sentence corpus-zk__sentence--hl" lang="en">' +
      highlightSentence(sentence, item.highlights, item.fills) +
      '</p>' +
      '<p class="corpus-zk__meta">先行词：<strong>' +
      esc(item.antecedent) +
      '</strong></p></div>' +
      '<div class="corpus-zk__panel" data-zk-panel="zh" hidden>' +
      '<h4>中文翻译</h4><p class="corpus-zk__zh">' +
      esc(item.zh) +
      '</p></div>' +
      '</article>'
    );
  }

  root.innerHTML = data.years
    .map(function (yearGroup) {
      var count = yearGroup.items.length;
      return (
        '<details class="corpus-zk__year" open>' +
        '<summary><span class="corpus-zk__year-label">' +
        esc(yearGroup.label) +
        '</span><span class="corpus-zk__year-meta">' +
        count +
        ' 句 · 真题语料</span></summary>' +
        '<div class="corpus-zk__year-body">' +
        yearGroup.items.map(renderCard).join('') +
        '</div></details>'
      );
    })
    .join('');

  root.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-zk-action]');
    if (!button) return;
    var card = button.closest('.corpus-zk__card');
    if (!card) return;
    var key = button.getAttribute('data-zk-action');
    var panel = card.querySelector('[data-zk-panel="' + key + '"]');
    if (!panel) return;

    var isOpen = !panel.hidden;
    card.querySelectorAll('.corpus-zk__panel').forEach(function (node) {
      node.hidden = true;
    });
    card.querySelectorAll('.corpus-zk__action').forEach(function (node) {
      node.classList.remove('is-active');
    });

    if (!isOpen) {
      panel.hidden = false;
      button.classList.add('is-active');
      panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });

  var stat = document.getElementById('corpus-zk-stat');
  if (stat) {
    var total = data.years.reduce(function (sum, year) {
      return sum + year.items.length;
    }, 0);
    stat.textContent =
      '共收录 ' +
      total +
      ' 句定语从句 · 覆盖 ' +
      data.years.length +
      ' 个年份（2018–2026 真题与模拟卷）';
  }
})();
