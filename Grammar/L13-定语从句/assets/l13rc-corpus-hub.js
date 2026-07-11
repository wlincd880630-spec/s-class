/**
 * L13 语料中心 · 例句 / 辨析 / 应用
 */
(function () {
  'use strict';

  var data = window.P13RC;
  if (!data) return;

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function exampleCard(item) {
    return (
      '<article class="corpus-example">' +
      '<span class="corpus-example__tier">LEVEL ' +
      esc(item.tier || 'A') +
      '</span>' +
      '<p class="corpus-example__en" lang="en">' +
      esc(item.en) +
      '</p>' +
      '<p class="corpus-example__zh">' +
      esc(item.zh) +
      '</p>' +
      '</article>'
    );
  }

  var exampleGroups = [
    {
      step: '① 指人',
      title: 'who / whom',
      note: '人在从句中作主语用 who；正式宾语用 whom。',
      items: data.whoExamples,
    },
    {
      step: '② 指物',
      title: 'which / that',
      note: '物在从句中作主语或宾语；作宾语时常可省略。',
      items: data.whichExamples,
    },
    {
      step: '③ 时间地点',
      title: 'when / where / prep + which',
      note: '只有在从句中作状语时，才使用 when / where。',
      items: data.prepExamples,
    },
  ];

  var exampleRoot = document.getElementById('corpus-example-groups');
  if (exampleRoot) {
    exampleRoot.innerHTML = exampleGroups
      .map(function (group) {
        return (
          '<section class="corpus-topic">' +
          '<header><span>' +
          esc(group.step) +
          '</span><h3>' +
          esc(group.title) +
          '</h3><p>' +
          esc(group.note) +
          '</p></header>' +
          '<div class="corpus-topic__list">' +
          group.items.slice(0, 5).map(exampleCard).join('') +
          '</div></section>'
        );
      })
      .join('');
  }

  function tableCard(title, kicker, rows) {
    return (
      '<article class="corpus-contrast-card"><header><span>' +
      esc(kicker) +
      '</span><h3>' +
      esc(title) +
      '</h3></header><div class="corpus-rule-list">' +
      rows
        .map(function (row) {
          return (
            '<div class="corpus-rule"><div><strong>' +
            esc(row[1]) +
            '</strong><span>' +
            esc(row[0]) +
            '</span></div><p lang="en">' +
            esc(row[2]) +
            '</p></div>'
          );
        })
        .join('') +
      '</div></article>'
    );
  }

  var contrastRoot = document.getElementById('corpus-contrast-groups');
  if (contrastRoot) {
    contrastRoot.innerHTML =
      tableCard('宾语还是状语？', '最高频辨析', data.whenWhereTable) +
      tableCard('whose 表所属', '结构辨析', data.whoseTable) +
      '<article class="corpus-contrast-card"><header><span>标点辨析</span><h3>限制性 / 非限制性</h3></header>' +
      '<ol class="corpus-comma-rules">' +
      data.commaRules
        .map(function (rule) {
          return '<li>' + esc(rule) + '</li>';
        })
        .join('') +
      '</ol></article>';
  }

  var stepsRoot = document.getElementById('corpus-merge-steps');
  if (stepsRoot) {
    stepsRoot.innerHTML = data.mergeSteps
      .map(function (step, index) {
        return '<li><span>' + (index + 1) + '</span><strong>' + esc(step) + '</strong></li>';
      })
      .join('');
  }

  var drillsRoot = document.getElementById('corpus-merge-drills');
  if (drillsRoot) {
    drillsRoot.innerHTML = data.mergeDrills
      .map(function (drill, index) {
        return (
          '<article class="corpus-drill"><span class="corpus-drill__num">0' +
          (index + 1) +
          '</span><p class="corpus-drill__source" lang="en">' +
          esc(drill.a) +
          '</p><details><summary>查看合并与解析</summary><p class="corpus-drill__answer" lang="en">' +
          esc(drill.b) +
          '</p><p class="corpus-drill__hint">' +
          esc(drill.hint) +
          '</p></details></article>'
        );
      })
      .join('');
  }

  var themeRoot = document.getElementById('corpus-theme-list');
  if (themeRoot) {
    themeRoot.innerHTML = data.corpus
      .map(function (row) {
        return (
          '<article class="corpus-theme"><span>' +
          esc(row[0]) +
          '</span><div><p lang="en">' +
          esc(row[1]) +
          '</p><small>' +
          esc(row[2]) +
          '</small></div></article>'
        );
      })
      .join('');
  }

  var tabs = document.querySelectorAll('[data-corpus-tab]');
  var panels = document.querySelectorAll('[data-corpus-panel]');

  function activate(key) {
    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-corpus-tab') === key;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function (panel) {
      var active = panel.getAttribute('data-corpus-panel') === key;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab.getAttribute('data-corpus-tab'));
    });
  });
})();
