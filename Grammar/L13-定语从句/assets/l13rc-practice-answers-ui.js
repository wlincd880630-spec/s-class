/**
 * 巩固练习 · 注入详细答案与句法分析面板
 */
(function () {
  'use strict';

  var DATA = window.L13RC_PRACTICE_ANSWERS;
  if (!DATA || !DATA.length) return;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function buildStructureHtml(rows) {
    if (!rows || !rows.length) return '';
    var html = '<ol class="practice-structure-list">';
    rows.forEach(function (row) {
      html +=
        '<li><strong>' +
        esc(row.label) +
        '</strong><span>' +
        esc(row.text) +
        '</span></li>';
    });
    return html + '</ol>';
  }

  function buildPanel(data) {
    var panel = document.createElement('div');
    panel.className = 'practice-answer-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', '参考答案与句法分析');

    var inner = '<div class="practice-answer-inner">';
    inner += '<h3 class="practice-answer-title">参考答案与句法分析</h3>';

    if (data.answer) {
      inner +=
        '<p class="practice-answer-key"><span class="practice-answer-label">参考答案</span>' +
        esc(data.answer) +
        '</p>';
    }
    if (data.answers && data.answers.length) {
      inner += '<div class="practice-answer-multi">';
      data.answers.forEach(function (a, i) {
        inner +=
          '<p class="practice-answer-key"><span class="practice-answer-label">' +
          esc(a.label || String.fromCharCode(65 + i)) +
          '</span>' +
          esc(a.text) +
          '</p>';
      });
      inner += '</div>';
    }
    if (data.answerZh) {
      inner += '<p class="practice-answer-zh">' + esc(data.answerZh) + '</p>';
    }
    if (data.mcCorrect) {
      inner +=
        '<p class="practice-answer-mc"><span class="practice-answer-label">正确选项</span>' +
        esc(data.mcCorrect) +
        (data.mcNote ? ' — ' + esc(data.mcNote) : '') +
        '</p>';
    }

    if (data.structure && data.structure.length) {
      inner += '<h4 class="practice-structure-heading">句子结构分析</h4>';
      inner += buildStructureHtml(data.structure);
    }
    if (data.tip) {
      inner += '<p class="practice-answer-tip"><strong>教师提示：</strong>' + esc(data.tip) + '</p>';
    }
    inner += '</div>';
    panel.innerHTML = inner;
    return panel;
  }

  function wireMc(item, data) {
    if (!data.mcCorrect) return;
    var container = item.querySelector('.options-container') || item;
    var buttons = container.querySelectorAll('.choice-btn');
    if (!buttons.length) return;
    var correct = String(data.mcCorrect).trim().charAt(0).toUpperCase();

    buttons.forEach(function (btn) {
      var label = (btn.textContent || '').trim().charAt(0).toUpperCase();
      btn.dataset.choiceLabel = label;
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.classList.remove('is-correct', 'is-wrong');
        });
        if (label === correct) {
          btn.classList.add('is-correct');
        } else {
          btn.classList.add('is-wrong');
          buttons.forEach(function (b) {
            if (b.dataset.choiceLabel === correct) b.classList.add('is-correct');
          });
        }
      });
    });
  }

  function inject() {
    var items = document.querySelectorAll('#app-frame .exercise-item');
    if (items.length !== DATA.length) {
      console.warn(
        '[L13RC] 答案条数(' +
          DATA.length +
          ')与题目数(' +
          items.length +
          ')不一致'
      );
    }
    items.forEach(function (item, i) {
      if (item.querySelector('.practice-answer-panel')) return;
      var data = DATA[i];
      if (!data) return;

      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'practice-answer-toggle';
      toggle.textContent = '查看答案与句法分析';
      toggle.setAttribute('aria-expanded', 'false');

      var panel = buildPanel(data);
      toggle.addEventListener('click', function () {
        var open = panel.hidden;
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.textContent = open ? '收起解析' : '查看答案与句法分析';
        toggle.classList.toggle('is-open', open);
        if (open && window.L13RCFitPractice) window.L13RCFitPractice();
        else if (open) {
          window.dispatchEvent(new CustomEvent('l13rc-practice-page'));
        }
      });

      item.appendChild(toggle);
      item.appendChild(panel);
      wireMc(item, data);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
