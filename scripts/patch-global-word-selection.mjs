#!/usr/bin/env node
/**
 * 将单词选择集中到册别首页，各游戏共用 localStorage 词表
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CW = path.join(ROOT, 'Primary/School_textbook/Courseware');
const GRADES = ['3GA', '3GB', '4GA', '4GB', '5GA', '5GB', '6GA'];

const UTILS_BLOCK = `
// ─── 全局复习词表（册别首页勾选，各游戏共用） ───

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getReviewStorageKey() {
  const id =
    typeof TEXTBOOK_DATA !== 'undefined' && TEXTBOOK_DATA.book
      ? TEXTBOOK_DATA.book.id
      : (location.pathname.match(/\\/([A-Za-z0-9]+)\\//) || [])[1] || 'courseware';
  return \`courseware-review-words-\${id}\`;
}

function loadReviewSelection() {
  try {
    const raw = localStorage.getItem(getReviewStorageKey());
    if (!raw) return { unitId: '', wordIds: [] };
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return { unitId: '', wordIds: data };
    return { unitId: data.unitId || '', wordIds: data.wordIds || [] };
  } catch {
    return { unitId: '', wordIds: [] };
  }
}

function saveReviewSelection(unitId, wordIds) {
  localStorage.setItem(
    getReviewStorageKey(),
    JSON.stringify({ unitId, wordIds, updatedAt: Date.now() })
  );
}

function getWordsByIds(ids) {
  if (!ids?.length || typeof TEXTBOOK_DATA === 'undefined') return [];
  const set = new Set(ids);
  const out = [];
  TEXTBOOK_DATA.units.forEach((u) => {
    u.words.forEach((w) => {
      if (set.has(w.id)) out.push(w);
    });
  });
  return out;
}

/** 读取首页保存的复习单词（已打乱） */
function getReviewWords(wordFilter = null) {
  const { wordIds } = loadReviewSelection();
  let words = getWordsByIds(wordIds);
  if (wordFilter) words = words.filter(wordFilter);
  return shuffle(words);
}

/** 游戏启动：校验词数，不足则提示回首页选词 */
function requireReviewWords({ wordFilter = null, minCount = 1, emptyMsg } = {}) {
  const words = getReviewWords(wordFilter);
  if (words.length < minCount) {
    alert(
      emptyMsg ||
        \`请先在首页选择至少 \${minCount} 个复习单词！\\n\\n返回首页 →「选择复习单词」区域勾选后，再进入游戏。\`
    );
    return null;
  }
  return words;
}

/** 游戏准备页：显示当前复习词摘要 */
function renderReviewWordSummary(host, { wordFilter = null, minCount = 1 } = {}) {
  if (!host) return;
  const { wordIds } = loadReviewSelection();
  let words = getWordsByIds(wordIds);
  if (wordFilter) words = words.filter(wordFilter);
  const ok = words.length >= minCount;
  const chips = words
    .slice(0, 24)
    .map((w) => \`<span class="review-word-chip">\${escHtml(w.word)}</span>\`)
    .join('');
  const more = words.length > 24 ? \`<span class="review-word-chip">+\${words.length - 24}</span>\` : '';
  host.innerHTML =
    \`<div class="review-word-summary\${ok ? '' : ' review-word-summary--empty'}">\` +
    \`<p><i class="fa-solid fa-list-check"></i> 当前复习：<strong>\${words.length}</strong> 个单词</p>\` +
    (words.length ? \`<div class="review-word-chips">\${chips}\${more}</div>\` : '') +
    \`<p class="review-word-hint">\${ok ? '在首页可更换复习单词' : \`请先在首页选择至少 \${minCount} 个单词\`}\` +
    \` · <a href="index.html#review-words">去选词</a></p></div>\`;
}

function updateReviewPickerUI(countEl, chipsEl) {
  const words = getWordsByIds(loadReviewSelection().wordIds);
  if (countEl) countEl.textContent = \`已选 \${words.length} 个单词（全书）\`;
  if (chipsEl) {
    chipsEl.innerHTML =
      words
        .slice(0, 40)
        .map((w) => \`<span class="review-word-chip">\${escHtml(w.word)}</span>\`)
        .join('') +
      (words.length > 40 ? \`<span class="review-word-chip">+\${words.length - 40}</span>\` : '');
  }
}

/** 册别首页：初始化全局复习词勾选 */
function initReviewWordPickerOnIndex() {
  const unitSelect = document.getElementById('unitSelect');
  const wordCheckArea = document.getElementById('wordCheckArea');
  const countEl = document.getElementById('reviewWordCount');
  const chipsEl = document.getElementById('reviewWordChips');
  if (!unitSelect || !wordCheckArea) return;

  let { unitId, wordIds } = loadReviewSelection();
  if (!wordIds.length) {
    const firstUnit = TEXTBOOK_DATA.units[0]?.id;
    wordIds = getAllWords(firstUnit).map((w) => w.id);
    saveReviewSelection(firstUnit, wordIds);
  }

  function mergeUnitSelection() {
    const currentIds = new Set(loadReviewSelection().wordIds);
    getAllWords(unitSelect.value).forEach((w) => currentIds.delete(w.id));
    getSelectedWordIds(wordCheckArea).forEach((id) => currentIds.add(id));
    saveReviewSelection(unitSelect.value, [...currentIds]);
    updateReviewPickerUI(countEl, chipsEl);
  }

  function refresh() {
    const sel = loadReviewSelection();
    buildWordCheckboxes(wordCheckArea, unitSelect.value, sel.wordIds);
    updateReviewPickerUI(countEl, chipsEl);
  }

  buildUnitSelector(unitSelect, () => {
    saveReviewSelection(unitSelect.value, loadReviewSelection().wordIds);
    refresh();
  });
  if (unitId) unitSelect.value = unitId;
  refresh();

  wordCheckArea.addEventListener('change', mergeUnitSelection);

  document.getElementById('btnSelectAll')?.addEventListener('click', () => {
    const currentIds = new Set(loadReviewSelection().wordIds);
    getAllWords(unitSelect.value).forEach((w) => currentIds.add(w.id));
    saveReviewSelection(unitSelect.value, [...currentIds]);
    refresh();
  });

  document.getElementById('btnClearUnit')?.addEventListener('click', () => {
    const unitSet = new Set(getAllWords(unitSelect.value).map((w) => w.id));
    const merged = loadReviewSelection().wordIds.filter((id) => !unitSet.has(id));
    saveReviewSelection(unitSelect.value, merged);
    refresh();
  });
}
`;

const CSS_BLOCK = `
/* 全局复习词表（首页选词 + 游戏摘要） */
.review-word-picker {
  padding: 1.25rem 1.5rem;
}

.review-picker-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 12px;
}

.review-word-count {
  margin: 12px 0 8px;
  font-size: 0.95rem;
  color: var(--text-muted, #636e72);
  font-weight: 600;
}

.review-word-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
}

.review-word-chip {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(108, 194, 74, 0.12);
  border: 1px solid rgba(108, 194, 74, 0.25);
  font-size: 0.82rem;
  color: var(--green-dark, #2d6a1e);
}

.review-word-summary {
  padding: 4px 0 12px;
}

.review-word-summary--empty {
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 193, 7, 0.1);
  border: 1px dashed rgba(255, 152, 0, 0.45);
}

.review-word-summary p {
  margin: 0 0 8px;
  color: #636e72;
  font-size: 0.95rem;
}

.review-word-summary strong {
  color: var(--green-dark, #2d6a1e);
  font-size: 1.1rem;
}

.review-word-hint {
  font-size: 0.85rem !important;
  margin-top: 8px !important;
}

.review-word-hint a {
  color: var(--primary, #6cc24a);
  font-weight: 600;
  text-decoration: none;
}

.review-word-hint a:hover {
  text-decoration: underline;
}
`;

const INDEX_SECTION = `    <section id="review-words">
      <h2 class="section-title"><i class="fa-solid fa-list-check"></i> 选择复习单词</h2>
      <div class="card review-word-picker">
        <p style="color:#636e72;margin:0 0 12px;">在此勾选要复习的单词，下方所有游戏与测试将<strong>共用这份词表</strong>，无需在每个游戏里重复选择。</p>
        <div class="control-row"><label>单元：</label><select id="unitSelect"></select></div>
        <div class="review-picker-actions">
          <button type="button" class="btn btn-sm btn-outline" id="btnSelectAll"><i class="fa-solid fa-check-double"></i> 全选本单元</button>
          <button type="button" class="btn btn-sm btn-outline" id="btnClearUnit"><i class="fa-solid fa-eraser"></i> 清空本单元</button>
        </div>
        <div id="wordCheckArea"></div>
        <p class="review-word-count" id="reviewWordCount">已选 0 个单词（全书）</p>
        <div class="review-word-chips" id="reviewWordChips"></div>
      </div>
    </section>

`;

const SETUP_SUMMARY = `      <div id="reviewWordSummary"></div>
`;

function patchUtils(file) {
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('function getReviewStorageKey(')) return false;
  const marker = '/** 从勾选区获取已选单词（已打乱） */';
  const idx = src.indexOf(marker);
  if (idx === -1) throw new Error(`marker not found in ${file}`);
  src = src.slice(0, idx) + UTILS_BLOCK + src.slice(idx);
  fs.writeFileSync(file, src);
  return true;
}

function patchCss(file) {
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('.review-word-picker')) return false;
  src += CSS_BLOCK;
  fs.writeFileSync(file, src);
  return true;
}

function patchIndex(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="review-words"')) return false;
  html = html.replace(
    /    <section>\n      <h2 class="section-title"><i class="fa-solid fa-gamepad"><\/i> 单词复习（游戏）<\/h2>/,
    INDEX_SECTION + '    <section>\n      <h2 class="section-title"><i class="fa-solid fa-gamepad"></i> 单词复习（游戏）</h2>'
  );
  html = html.replace(
    '  <script src="assets/data/data.js"></script>\n</body>',
    '  <script src="assets/data/data.js"></script>\n  <script src="assets/js/utils.js"></script>\n  <script>initReviewWordPickerOnIndex();</script>\n</body>'
  );
  fs.writeFileSync(file, html);
  return true;
}

function stripSetupPanel(html) {
  html = html.replace(
    /\s*<div class="control-row"><label>单元：<\/label><select id="unitSelect"><\/select><\/div>\n\s*<div id="wordCheckArea"><\/div>\n/,
    '\n' + SETUP_SUMMARY
  );
  return html;
}

function patchGame1(html) {
  html = stripSetupPanel(html);
  html = html.replace(
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');

    buildUnitSelector(unitSelect, () => buildWordCheckboxes(wordCheckArea, unitSelect.value));
    buildWordCheckboxes(wordCheckArea, unitSelect.value);
    document.getElementById('btnStart').addEventListener('click', startGame);`,
    `    renderReviewWordSummary(document.getElementById('reviewWordSummary'));
    document.getElementById('btnStart').addEventListener('click', startGame);`
  );
  html = html.replace(
    `    function startGame() {
      unitId = unitSelect.value;
      const ids = getSelectedWordIds(wordCheckArea);
      const all = shuffle(getAllWords(unitId).filter(w => ids.includes(w.id)));
      if (!all.length) return alert('请至少选择一个单词！');`,
    `    function startGame() {
      const all = requireReviewWords({ minCount: 1 });
      if (!all) return;`
  );
  return html;
}

function patchGame2(html) {
  html = stripSetupPanel(html);
  html = html.replace(
    `    const unitSelect = document.getElementById('unitSelect');
    const mazeGridEl = document.getElementById('mazeGrid');

    buildUnitSelector(unitSelect, refreshWordList);
    refreshWordList();
    document.getElementById('btnStart').addEventListener('click', startGame);`,
    `    const mazeGridEl = document.getElementById('mazeGrid');
    renderReviewWordSummary(document.getElementById('reviewWordSummary'), { wordFilter: isMazeWord, minCount: 4 });
    document.getElementById('btnStart').addEventListener('click', startGame);`
  );
  html = html.replace(
    `    function refreshWordList() {
      buildWordCheckboxes(document.getElementById('wordCheckArea'), unitSelect.value, [], isMazeWord);
    }

`,
    ''
  );
  html = html.replace(
    `    function startGame() {
      const ids = getSelectedWordIds(document.getElementById('wordCheckArea'));
      const all = shuffle(getMazeWords(unitSelect.value).filter(w => ids.includes(w.id)));
      if (!all.length) return alert('请至少选择一个单词！');
      if (all.length < 4) return alert('请至少选择 4 个单词！');`,
    `    function startGame() {
      const all = requireReviewWords({ wordFilter: isMazeWord, minCount: 4, emptyMsg: '请先在首页选择至少 4 个适合迷宫的单词（不含空格、长度≤9）！' });
      if (!all) return;`
  );
  return html;
}

function patchGame3to9(html, n) {
  html = stripSetupPanel(html);

  const minCounts = { 8: 3, 9: 4 };
  const minCount = minCounts[n] || 1;
  const extraOpts = n === 2 ? '' : n === 9 ? ', minCount: 4' : n === 8 ? ', minCount: 3' : '';

  // Remove initGameWordSelection blocks (various forms)
  html = html.replace(
    /    const unitSelect = document\.getElementById\('unitSelect'\);\n    const wordCheckArea = document\.getElementById\('wordCheckArea'\);\n    initGameWordSelection\(unitSelect, wordCheckArea[^;]*\);\n/g,
    `    renderReviewWordSummary(document.getElementById('reviewWordSummary')${extraOpts ? `{ minCount: ${minCount} }` : ''});\n`
  );

  // startGame patterns for game 3
  if (n === 3) {
    html = html.replace(
      `    function startGame() {
      const all = getSelectedWords(unitSelect.value, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');`,
      `    function startGame() {
      const all = requireReviewWords({ minCount: 1 });
      if (!all) return;`
    );
  }

  // game 4, 6, 7
  if ([4, 6, 7].includes(n)) {
    html = html.replace(
      `    function startGame() {
      unitId = unitSelect.value;
      const all = getSelectedWords(unitId, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      wordPool = all;`,
      `    function startGame() {
      const all = requireReviewWords({ minCount: 1 });
      if (!all) return;
      wordPool = all;`
    );
  }

  // game 5
  if (n === 5) {
    html = html.replace(
      `    function startGame() {
      const all = getSelectedWords(unitSelect.value, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      const pool = shuffle(all.map(w => ({ ...w.sentences[0], word: w })));`,
      `    function startGame() {
      const all = requireReviewWords({ minCount: 1 });
      if (!all) return;
      const pool = shuffle(all.map(w => ({ ...w.sentences[0], word: w })));`
    );
    html = html.replace(
      /    const unitSelect = document\.getElementById\('unitSelect'\);\n    const wordCheckArea = document\.getElementById\('wordCheckArea'\);\n    initGameWordSelection\(unitSelect, wordCheckArea\);\n/,
      `    renderReviewWordSummary(document.getElementById('reviewWordSummary'));\n`
    );
  }

  // game 8
  if (n === 8) {
    html = html.replace(
      `    function startGame() {
      unitId = unitSelect.value;
      const all = getSelectedWords(unitId, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      if (all.length < 3) return alert('请至少选择 3 个单词！');`,
      `    function startGame() {
      const all = requireReviewWords({ minCount: 3 });
      if (!all) return;`
    );
  }

  // game 9
  if (n === 9) {
    html = html.replace(
      `    function startGame() {
      unitId = unitSelect.value;
      wordPool = getSelectedWords(unitId, wordCheckArea);
      if (!wordPool.length) return alert('请至少选择一个单词！');
      if (wordPool.length < 4) return alert('请至少选择 4 个单词！');
      pool = wordPool;`,
      `    function startGame() {
      wordPool = requireReviewWords({ minCount: 4 });
      if (!wordPool) return;
      pool = wordPool;`
    );
  }

  return html;
}

function patchTest(html) {
  html = stripSetupPanel(html);
  html = html.replace(
    `    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);

`,
    `    renderReviewWordSummary(document.getElementById('reviewWordSummary'));

`
  );
  html = html.replace(
    `    function startTest() {
      unitId = unitSelect.value;
      testWords = getSelectedWords(unitId, wordCheckArea);
      if (!testWords.length) return alert('请至少选择一个单词！');`,
    `    function startTest() {
      unitId = unitSelect.value;
      testWords = requireReviewWords({ minCount: 1 });
      if (!testWords) return;`
  );
  // test still has unitSelect in DOM? We removed it - need to fix unitId for report
  html = html.replace(
    '      unitId = unitSelect.value;\n      testWords = requireReviewWords',
    '      testWords = requireReviewWords'
  );
  // Add reviewWordSummary to setup if missing
  if (!html.includes('reviewWordSummary')) {
    html = html.replace(
      '<div class="control-row"><label>单元：</label><select id="unitSelect"></select></div>',
      SETUP_SUMMARY.trim()
    );
  }
  return html;
}

function patchReviewPrint(html) {
  html = html.replace(
    /\s*<div class="control-row"><label>单元：<\/label><select id="unitSelect"><\/select><\/div>\n\s*<div id="wordCheckArea"><\/div>\n\s*<p class="pw-chip-count" id="pwWordCount">已选 0 个单词<\/p>\n\s*<div class="pw-chips" id="pwWordChips"><\/div>\n/,
    `\n      <div id="reviewWordSummary"></div>\n      <p class="pw-chip-count" id="pwWordCount">已选 0 个单词</p>\n      <div class="pw-chips" id="pwWordChips"></div>\n`
  );
  html = html.replace(
    '<script src="../assets/js/print-worksheets.js"></script>',
    `<script>
    document.addEventListener('DOMContentLoaded', () => {
      renderReviewWordSummary(document.getElementById('reviewWordSummary'));
    });
  </script>
  <script src="../assets/js/print-worksheets.js"></script>`
  );
  return html;
}

function patchPrintWorksheets() {
  const file = path.join(CW, 'assets/js/print-worksheets.js');
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('getReviewWords')) return false;
  src = src.replace(
    `  function boot() {
    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    const printArea = document.getElementById('printArea');

    if (!unitSelect || !wordCheckArea || !printArea) return;

    buildUnitSelector(unitSelect, () => {
      buildWordCheckboxes(wordCheckArea, unitSelect.value);
      doGenerate();
    });
    buildWordCheckboxes(wordCheckArea, unitSelect.value);

    wordCheckArea.addEventListener('change', doGenerate);

    function getPool() {
      const unitId = unitSelect.value;
      const ids = getSelectedWordIds(wordCheckArea);
      return shuffle(getAllWords(unitId).filter((w) => ids.includes(w.id)));
    }`,
    `  function boot() {
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    function getPool() {
      if (typeof getReviewWords === 'function') return getReviewWords();
      return [];
    }`
  );
  fs.writeFileSync(file, src);
  return true;
}

let counts = { utils: 0, css: 0, index: 0, games: 0, print: 0 };

for (const grade of GRADES) {
  if (patchUtils(path.join(CW, grade, 'assets/js/utils.js'))) counts.utils++;
  if (patchCss(path.join(CW, grade, 'assets/css/common.css'))) counts.css++;
  if (patchIndex(path.join(CW, grade, 'index.html'))) counts.index++;

  for (let n = 1; n <= 9; n++) {
    const file = path.join(CW, grade, `review-game${n}.html`);
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');
    const orig = html;
    if (n === 1) html = patchGame1(html);
    else if (n === 2) html = patchGame2(html);
    else html = patchGame3to9(html, n);
    if (html !== orig) {
      fs.writeFileSync(file, html);
      counts.games++;
    }
  }

  const testFile = path.join(CW, grade, 'test.html');
  if (fs.existsSync(testFile)) {
    const orig = fs.readFileSync(testFile, 'utf8');
    const patched = patchTest(orig);
    if (patched !== orig) {
      fs.writeFileSync(testFile, patched);
      counts.games++;
    }
  }

  const printFile = path.join(CW, grade, 'review-print.html');
  if (fs.existsSync(printFile)) {
    const orig = fs.readFileSync(printFile, 'utf8');
    const patched = patchReviewPrint(orig);
    if (patched !== orig) {
      fs.writeFileSync(printFile, patched);
      counts.print++;
    }
  }
}

if (patchPrintWorksheets()) counts.print++;

console.log('Patched:', counts);
