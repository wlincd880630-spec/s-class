/**
 * 外研版教材单词 · 纸质练习生成器
 * 覆盖所有可在纸上完成的复习游戏题型
 */
(function (global) {
  'use strict';

  const OPT_LETTERS = ['A', 'B', 'C', 'D'];
  const SHEET_ICONS = {
    maze: '🔍',
    spell: '🔤',
    connect: '🔗',
    'zh-en': '🇨🇳→🇬🇧',
    'en-zh': '🇬🇧→🇨🇳',
    memory: '🃏',
    sentence: '📝',
    pick: '🎯',
  };

  const SHEET_MODES = {
    maze: 'maze',
    spell: 'spell',
    connect: 'connect',
    'zh-en': 'quiz',
    'en-zh': 'quiz',
    memory: 'memory',
    sentence: 'sentence',
    pick: 'pick',
  };

  function cfg() {
    return global.PRINT_WORKSHEETS || {};
  }

  function bookName() {
    return cfg().bookName || '外研版小学英语';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function sheetHeader(title, sub, mode) {
    const icon = SHEET_ICONS[mode] || '📄';
    const cls = SHEET_MODES[mode] || '';
    return (
      `<div class="pw-sheet pw-sheet--${cls}" data-type="${esc(mode)}">` +
      `<div class="pw-sheet-hdr">` +
      `<h2>${icon} ${esc(title)}</h2>` +
      `<div class="pw-meta">${esc(sub)}</div>` +
      `</div>` +
      `<div class="pw-name-line">姓名：<span></span> &nbsp; 班级：<span></span> &nbsp; 日期：<span></span></div>`
    );
  }

  function sheetFooter() {
    return `<div class="pw-sheet-footer">Steven's Class · ${esc(bookName())}</div></div>`;
  }

  function padGroupToFour(group, source) {
    const words = group.slice();
    const src = shuffle(source.slice());
    while (words.length < 4) {
      const cands = src.filter((w) => !words.some((x) => x.id === w.id));
      words.push((cands.length ? cands : src)[Math.floor(Math.random() * (cands.length ? cands : src).length)]);
    }
    return shuffle(words.slice(0, 4));
  }

  function padGroupToThree(group, source) {
    const words = group.slice();
    const src = shuffle(source.slice());
    while (words.length < 3) {
      words.push(src[Math.floor(Math.random() * src.length)]);
    }
    return shuffle(words.slice(0, 3));
  }

  function renderMazeSheet(words, idx, total, showAns) {
    const prepared = padGroupToFour(words, words);
    let maze = null;
    let tries = 0;
    do {
      maze = generateMazeGrid(prepared);
      tries++;
    } while (tries < 12 && (!maze || !maze.grid || !maze.grid[0] || !maze.grid[0].length));

    const sz = maze?.size || maze?.grid?.length || 0;
    let html = sheetHeader(
      `${bookName()} · 单词迷宫`,
      `第 ${idx} / ${total} 组 · ${sz}×${sz}`,
      'maze'
    );
    if (showAns) html = html.replace('class="pw-sheet', 'class="pw-sheet pw-answer-key');

    html += '<div class="pw-maze-targets">';
    prepared.forEach((w, i) => {
      html += `<div class="pw-maze-target"><div class="pw-num">${i + 1}</div>`;
      html += `<img src="${esc(w.image)}" alt="" />`;
      html += `<div class="pw-zh">${esc(shortMeaning(w))}</div>`;
      if (showAns) html += `<div class="pw-ans">${esc(w.word)}</div>`;
      html += '</div>';
    });
    html += '</div>';

    if (maze && maze.grid && maze.grid.length) {
      html += `<div class="pw-maze-grid" style="grid-template-columns:repeat(${sz},1fr)">`;
      maze.grid.forEach((row) => {
        row.forEach((ch) => {
          html += `<div class="pw-maze-cell">${esc((ch || '?').toUpperCase())}</div>`;
        });
      });
      html += '</div>';
    } else {
      html += '<p class="pw-hint" style="color:#c62828">宫格生成失败，请重新点击「生成练习纸」</p>';
    }

    html += `<p class="pw-hint">${showAns ? '✅ 教师答案页' : '在宫格中找出 4 个单词（横/竖直线方向）'}</p>`;
    html += sheetFooter();
    return html;
  }

  function renderSpellSheet(words, showAns, startNum = 1) {
    let html = sheetHeader(`${bookName()} · 字母排序`, `看图 · 乱序字母 · 写出单词 · 共 ${words.length} 题`, 'spell');
    if (showAns) html = html.replace('class="pw-sheet', 'class="pw-sheet pw-answer-key');

    html += '<div class="pw-spell-list">';
    words.forEach((w, i) => {
      const letters = w.word.replace(/[\s-]/g, '').split('');
      const scrambled = shuffle(letters);
      html += `<div class="pw-spell-item">`;
      html += `<img src="${esc(w.image)}" alt="" />`;
      html += `<div><div class="pw-spell-zh">${startNum + i}. ${esc(shortMeaning(w))}</div>`;
      html += `<div class="pw-spell-letters">${scrambled.map((ch) => `<span>${esc(ch)}</span>`).join('')}</div>`;
      html += `<div class="pw-spell-write">写出单词：`;
      html += showAns ? `<span class="pw-ans">${esc(w.word)}</span>` : '<span class="pw-spell-line"></span>';
      html += '</div></div></div>';
    });
    html += '</div>';

    html += sheetFooter();
    return html;
  }

  function renderConnectSheet(group, idx, total, showAns) {
    const words = shuffle(group.slice());
    const shuffled = shuffle(words.slice());
    let html = sheetHeader(`${bookName()} · 图片单词连线`, `第 ${idx} / ${total} 页`, 'connect');
    if (showAns) html = html.replace('class="pw-sheet', 'class="pw-sheet pw-answer-key');

    html += '<div class="pw-connect-hdr"><div>🖼️ 图片</div><div>🔤 单词（已打乱）</div></div>';
    words.forEach((w, i) => {
      html += `<div class="pw-connect-row">`;
      html += `<div class="pw-connect-item pw-connect-item--img"><img src="${esc(w.image)}" alt="" /></div>`;
      html += `<div class="pw-connect-item pw-connect-item--word"><span class="pw-connect-word">${esc(shuffled[i].word)}</span></div>`;
      html += '</div>';
    });

    if (showAns) {
      html += '<p class="pw-hint">答案：' + words.map((w) => `${esc(w.word)} ↔ ${esc(shortMeaning(w))}`).join(' &nbsp;·&nbsp; ') + '</p>';
    } else {
      html += '<p class="pw-hint">用线将左侧图片与右侧对应的英文单词相连（右侧顺序已打乱）</p>';
    }

    html += sheetFooter();
    return html;
  }

  function renderQuizSheet(words, mode, showAns, distractorPool, pageIdx, pageTotal, startNum = 1) {
    const title = mode === 'zh-en' ? '看中文选英文' : '看单词选中文';
    const sub = pageTotal > 1 ? `第 ${pageIdx} / ${pageTotal} 页 · 本页 ${words.length} 题 · 四选一` : `共 ${words.length} 题 · 四选一`;
    let html = sheetHeader(`${bookName()} · ${title}`, sub, mode);
    if (showAns) html = html.replace('class="pw-sheet', 'class="pw-sheet pw-answer-key');

    const all = distractorPool;
    html += '<div class="pw-quiz-list">';
    words.forEach((w, i) => {
      const opts = pickQuizOptions(w, all, 4, (item) => (mode === 'zh-en' ? item.word : shortMeaning(item)));
      html += `<div class="pw-quiz-item">`;
      html += `<img src="${esc(w.image)}" alt="" />`;
      html += `<div><div class="pw-quiz-q"><strong>${startNum + i}.</strong> ${mode === 'zh-en' ? esc(shortMeaning(w)) : esc(w.word)}</div>`;
      html += `<div class="pw-quiz-options">${opts.map((o, j) => `<span class="pw-quiz-opt"><span class="pw-opt-letter">${OPT_LETTERS[j]}</span>${esc(o.label)}</span>`).join('')}</div>`;
      if (showAns) {
        html += `<div class="pw-ans" style="margin-top:6px">✅ 答案：${mode === 'zh-en' ? esc(w.word) : esc(shortMeaning(w))}</div>`;
      }
      html += '</div></div>';
    });
    html += '</div>';

    html += sheetFooter();
    return html;
  }

  function renderPickImgSheet(words, distractorPool, showAns, pageIdx, pageTotal, startNum = 1) {
    const all = distractorPool;
    const sub = pageTotal > 1 ? `第 ${pageIdx} / ${pageTotal} 页 · 本页 ${words.length} 题 · 四选一` : `共 ${words.length} 题 · 四选一`;
    let html = sheetHeader(`${bookName()} · 看单词选图`, sub, 'pick');
    if (showAns) html = html.replace('class="pw-sheet', 'class="pw-sheet pw-answer-key');

    words.forEach((w, i) => {
      const opts = pickQuizOptions(w, all, 4, (item) => item.word);
      html += `<div class="pw-pick-item">`;
      html += `<div class="pw-pick-word">${startNum + i}. ${esc(w.word)}</div>`;
      html += `<div class="pw-pick-grid">${opts.map((o, j) => `<div class="pw-pick-opt"><span class="pw-opt-letter">${OPT_LETTERS[j]}</span><img src="${esc(o.word.image)}" alt="" /></div>`).join('')}</div>`;
      if (showAns) html += `<div class="pw-ans" style="text-align:center;margin-top:6px">✅ 答案：${OPT_LETTERS[opts.findIndex((o) => o.word.id === w.id)] || '?'}</div>`;
      html += '</div>';
    });

    html += sheetFooter();
    return html;
  }

  function paginate(list, size) {
    const pages = [];
    for (let i = 0; i < list.length; i += size) pages.push(list.slice(i, i + size));
    return pages.length ? pages : [[]];
  }

  function renderMemorySheet(group, idx, total, showAns) {
    let html = sheetHeader(`${bookName()} · 翻翻配对卡片`, `第 ${idx} / ${total} 组 · 剪下配对`, 'memory');
    if (showAns) html = html.replace('class="pw-sheet', 'class="pw-sheet pw-answer-key');

    html += '<div class="pw-memory-grid">';
    group.forEach((w) => {
      html += `<div class="pw-memory-card"><img src="${esc(w.image)}" alt="" /><div class="pw-card-word">${esc(w.word)}</div></div>`;
      html += `<div class="pw-memory-card">${showAns ? `<div class="pw-ans pw-card-word">${esc(w.word)}</div>` : '<div class="pw-card-word">?</div>'}<div>${esc(shortMeaning(w))}</div></div>`;
    });
    html += '</div>';
    html += '<p class="pw-hint">✂️ 剪下卡片，翻面后凭记忆配对单词与图片/中文</p>';
    html += sheetFooter();
    return html;
  }

  function renderSentenceSheet(items, showAns) {
    let html = sheetHeader(`${bookName()} · 句子排序`, `共 ${items.length} 句 · 看图 · 排列语序`, 'sentence');
    if (showAns) html = html.replace('class="pw-sheet', 'class="pw-sheet pw-answer-key');

    items.forEach((item, i) => {
      const parts = item.en.replace(/[.!?]+$/, '').split(/\s+/);
      const scrambled = shuffle(parts);
      const img = item.image || item.wordImage || '';
      html += `<div class="pw-sentence-item">`;
      if (img) {
        html += `<img class="pw-sentence-img" src="${esc(img)}" alt="" />`;
      } else {
        html += `<div class="pw-sentence-img pw-sentence-img--empty" aria-hidden="true"></div>`;
      }
      html += `<div class="pw-sentence-body">`;
      html += `<div class="pw-sentence-zh"><strong>${i + 1}.</strong> ${esc(item.zh)}</div>`;
      html += `<div class="pw-sentence-words">${scrambled.map((p) => `<span>${esc(p)}</span>`).join('')}</div>`;
      html += `<div class="pw-sentence-write">正确语序：`;
      html += showAns
        ? `<span class="pw-ans">${esc(item.en)}</span>`
        : '<span class="pw-sentence-line"></span>';
      html += `</div></div></div>`;
    });

    html += sheetFooter();
    return html;
  }

  function generate(opts) {
    const {
      pool,
      optMaze,
      optSpell,
      optConnect,
      optZhPickEn,
      optEnPickZh,
      optMemory,
      optSentence,
      optPickImg,
      optAnswers,
    } = opts;

    let html = '';
    const mazeWords = pool.filter((w) => isMazeWord(w));

    if (optMaze) {
      if (!mazeWords.length) {
        html += `<div class="pw-sheet"><p class="pw-hint">迷宫需要至少 1 个无空格单词（含空格的词不参与迷宫，可用字母排序练习）</p></div>`;
      } else {
        const groups = [];
        const shuffled = shuffle(mazeWords.slice());
        for (let i = 0; i < shuffled.length; i += 4) groups.push(shuffled.slice(i, i + 4));
        groups.forEach((g, i) => { html += renderMazeSheet(g, i + 1, groups.length, false); });
        if (optAnswers) groups.forEach((g, i) => { html += renderMazeSheet(g, i + 1, groups.length, true); });
      }
    }

    if (optSpell) {
      const spellWords = shuffle(pool.slice());
      const spellPages = paginate(spellWords, 4);
      let spellOffset = 0;
      spellPages.forEach((page) => {
        html += renderSpellSheet(page, false, spellOffset + 1);
        spellOffset += page.length;
      });
      if (optAnswers) {
        spellOffset = 0;
        spellPages.forEach((page) => {
          html += renderSpellSheet(page, true, spellOffset + 1);
          spellOffset += page.length;
        });
      }
    }

    if (optConnect) {
      const connGroups = [];
      const shuffled = shuffle(pool.slice());
      for (let i = 0; i < shuffled.length; i += 3) connGroups.push(padGroupToThree(shuffled.slice(i, i + 3), pool));
      connGroups.forEach((g, i) => { html += renderConnectSheet(g, i + 1, connGroups.length, false); });
      if (optAnswers) connGroups.forEach((g, i) => { html += renderConnectSheet(g, i + 1, connGroups.length, true); });
    }

    if (optZhPickEn) {
      const zhEnPages = paginate(shuffle(pool.slice()), 5);
      let zhOffset = 0;
      zhEnPages.forEach((page, i) => {
        html += renderQuizSheet(page, 'zh-en', false, pool, i + 1, zhEnPages.length, zhOffset + 1);
        zhOffset += page.length;
      });
      if (optAnswers) {
        zhOffset = 0;
        paginate(pool, 5).forEach((page, i) => {
          html += renderQuizSheet(page, 'zh-en', true, pool, i + 1, zhEnPages.length, zhOffset + 1);
          zhOffset += page.length;
        });
      }
    }

    if (optEnPickZh) {
      const enZhPages = paginate(shuffle(pool.slice()), 5);
      let enOffset = 0;
      enZhPages.forEach((page, i) => {
        html += renderQuizSheet(page, 'en-zh', false, pool, i + 1, enZhPages.length, enOffset + 1);
        enOffset += page.length;
      });
      if (optAnswers) {
        enOffset = 0;
        paginate(pool, 5).forEach((page, i) => {
          html += renderQuizSheet(page, 'en-zh', true, pool, i + 1, enZhPages.length, enOffset + 1);
          enOffset += page.length;
        });
      }
    }

    if (optPickImg) {
      const pickWords = shuffle(pool.slice());
      const pickPages = paginate(pickWords, 2);
      let pickOffset = 0;
      pickPages.forEach((page, i) => {
        html += renderPickImgSheet(page, pool, false, i + 1, pickPages.length, pickOffset + 1);
        pickOffset += page.length;
      });
      if (optAnswers) {
        pickOffset = 0;
        pickPages.forEach((page, i) => {
          html += renderPickImgSheet(page, pool, true, i + 1, pickPages.length, pickOffset + 1);
          pickOffset += page.length;
        });
      }
    }

    if (optMemory) {
      const memGroups = [];
      const shuffled = shuffle(pool.slice());
      for (let i = 0; i < shuffled.length; i += 4) memGroups.push(padGroupToFour(shuffled.slice(i, i + 4), pool));
      memGroups.forEach((g, i) => { html += renderMemorySheet(g, i + 1, memGroups.length, false); });
      if (optAnswers) memGroups.forEach((g, i) => { html += renderMemorySheet(g, i + 1, memGroups.length, true); });
    }

    if (optSentence) {
      const sentences = shuffle(
        pool
          .filter((w) => w.sentences && w.sentences[0])
          .map((w) => ({
            ...w.sentences[0],
            wordImage: w.image || '',
          }))
      );
      if (sentences.length) {
        // 带图后每页 2 句，避免作答区与插图挤在一起
        const sentencePages = paginate(sentences, 2);
        sentencePages.forEach((page) => { html += renderSentenceSheet(page, false); });
        if (optAnswers) sentencePages.forEach((page) => { html += renderSentenceSheet(page, true); });
      }
    }

    return html || '<p class="pw-empty">请至少勾选一种练习类型</p>';
  }

  function updateChips(pool) {
    const host = document.getElementById('pwWordChips');
    const countEl = document.getElementById('pwWordCount');
    if (!host) return;
    host.innerHTML = '';
    if (countEl) countEl.textContent = `已选 ${pool.length} 个单词`;
    pool.forEach((w) => {
      const s = document.createElement('span');
      s.className = 'pw-chip';
      s.textContent = w.word;
      host.appendChild(s);
    });
  }

  function boot() {
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    function getPool() {
      if (typeof getReviewWords === 'function') return getReviewWords();
      return [];
    }

    function doGenerate() {
      const pool = getPool();
      updateChips(pool);

      if (!pool.length) {
        printArea.innerHTML = '<p class="pw-empty">请先在首页「选择复习单词」区域勾选至少一个单词</p>';
        return;
      }

      printArea.innerHTML = generate({
        pool,
        optMaze: document.getElementById('optMaze')?.checked,
        optSpell: document.getElementById('optSpell')?.checked,
        optConnect: document.getElementById('optConnect')?.checked,
        optZhPickEn: document.getElementById('optZhPickEn')?.checked,
        optEnPickZh: document.getElementById('optEnPickZh')?.checked,
        optMemory: document.getElementById('optMemory')?.checked,
        optSentence: document.getElementById('optSentence')?.checked,
        optPickImg: document.getElementById('optPickImg')?.checked,
        optAnswers: document.getElementById('optAnswers')?.checked,
      });
    }

    document.getElementById('btnGen')?.addEventListener('click', doGenerate);

    document.querySelectorAll('.pw-toolbar input[type=checkbox]').forEach((cb) => {
      cb.addEventListener('change', doGenerate);
    });

    document.getElementById('btnPrint')?.addEventListener('click', () => {
      if (!document.querySelector('#printArea .pw-sheet')) doGenerate();
      document.body.classList.add('print-worksheet-print');
      window.print();
    });

    window.addEventListener('beforeprint', () => document.body.classList.add('print-worksheet-print'));
    window.addEventListener('afterprint', () => document.body.classList.remove('print-worksheet-print'));

    doGenerate();
  }

  global.PrintWorksheets = { generate, boot };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(typeof window !== 'undefined' ? window : this);
