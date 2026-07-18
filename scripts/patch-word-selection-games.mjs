#!/usr/bin/env node
/**
 * 为 Courseware 复习游戏 3–9 及 test.html 添加单词选择功能
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CW = path.join(ROOT, 'Primary/School_textbook/Courseware');
const GRADES = ['3GA', '3GB', '4GA', '4GB', '5GA', '5GB', '6GA'];

const UTILS_HELPERS = `
/** 从勾选区获取已选单词（已打乱） */
function getSelectedWords(unitId, container) {
  const ids = getSelectedWordIds(container);
  return shuffle(getAllWords(unitId).filter((w) => ids.includes(w.id)));
}

/** 绑定单元下拉与单词勾选区 */
function initGameWordSelection(unitSelect, wordCheckArea, wordFilter = null) {
  const refresh = () => buildWordCheckboxes(wordCheckArea, unitSelect.value, [], wordFilter);
  buildUnitSelector(unitSelect, refresh);
  refresh();
}
`;

function patchUtils(file) {
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('function getSelectedWords(')) return false;
  const marker = 'function getSelectedWordIds(container) {';
  const idx = src.indexOf(marker);
  if (idx === -1) throw new Error(`getSelectedWordIds not found in ${file}`);
  const end = src.indexOf('\n}', idx) + 2;
  src = src.slice(0, end) + UTILS_HELPERS + src.slice(end);
  fs.writeFileSync(file, src);
  return true;
}

function addWordCheckArea(html) {
  if (html.includes('id="wordCheckArea"')) return html;
  return html.replace(
    /(<div class="control-row"><label>单元：<\/label><select id="unitSelect"><\/select><\/div>)\n/,
    '$1\n      <div id="wordCheckArea"></div>\n'
  );
}

function patchGame3(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    buildUnitSelector(document.getElementById(\'unitSelect\'));\n',
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startGame() {
      const all = shuffle(getAllWords(document.getElementById('unitSelect').value));
      if (!all.length) return alert('该单元暂无单词！');`,
    `    function startGame() {
      const all = getSelectedWords(unitSelect.value, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');`
  );
  return html;
}

function patchGame4(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    let gameTimer = null, answered = false, unitId = \'\';\n',
    '    let gameTimer = null, answered = false, unitId = \'\', wordPool = [];\n'
  );
  html = html.replace(
    '    buildUnitSelector(document.getElementById(\'unitSelect\'));\n',
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      const all = shuffle(getAllWords(unitId));
      if (!all.length) return alert('该单元暂无单词！');`,
    `    function startGame() {
      unitId = unitSelect.value;
      const all = getSelectedWords(unitId, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      wordPool = all;`
  );
  html = html.replace(
    '      const all = getAllWords(unitId);\n      const el = document.getElementById(\'options\');',
    '      const el = document.getElementById(\'options\');'
  );
  html = html.replace(
    '      pickQuizOptions(w, all, 4, item => item.word)',
    '      pickQuizOptions(w, wordPool, 4, item => item.word)'
  );
  return html;
}

function patchGame5(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    buildUnitSelector(document.getElementById(\'unitSelect\'));\n',
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startGame() {
      const all = getAllWords(document.getElementById('unitSelect').value);
      const pool = shuffle(all.map(w => ({ ...w.sentences[0], word: w })));`,
    `    function startGame() {
      const all = getSelectedWords(unitSelect.value, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      const pool = shuffle(all.map(w => ({ ...w.sentences[0], word: w })));`
  );
  return html;
}

function patchGame6(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    let answered = false, unitId = \'\', streak = 0;\n',
    '    let answered = false, unitId = \'\', streak = 0, wordPool = [];\n'
  );
  html = html.replace(
    '    buildUnitSelector(document.getElementById(\'unitSelect\'));\n',
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      const all = shuffle(getAllWords(unitId));
      if (!all.length) return alert('该单元暂无单词！');`,
    `    function startGame() {
      unitId = unitSelect.value;
      const all = getSelectedWords(unitId, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      wordPool = all;`
  );
  html = html.replace(
    '      const pool = getAllWords(unitId);\n      const options = pickQuizOptions(currentWord, pool, 4, item => item.word);',
    '      const options = pickQuizOptions(currentWord, wordPool, 4, item => item.word);'
  );
  return html;
}

function patchGame7(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    let gameTimer = null, answered = false, unitId = \'\';\n',
    '    let gameTimer = null, answered = false, unitId = \'\', wordPool = [];\n'
  );
  html = html.replace(
    '    buildUnitSelector(document.getElementById(\'unitSelect\'));\n',
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      const all = shuffle(getAllWords(unitId));
      if (!all.length) return alert('该单元暂无单词！');`,
    `    function startGame() {
      unitId = unitSelect.value;
      const all = getSelectedWords(unitId, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      wordPool = all;`
  );
  html = html.replace(
    '      const all = getAllWords(unitId);\n      const el = document.getElementById(\'options\');',
    '      const el = document.getElementById(\'options\');'
  );
  html = html.replace(
    '      pickQuizOptions(w, all, 4, item => shortMeaning(item))',
    '      pickQuizOptions(w, wordPool, 4, item => shortMeaning(item))'
  );
  return html;
}

function patchGame8(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    let gameTimer = null, unitId = \'\';\n',
    '    let gameTimer = null, unitId = \'\';\n'
  );
  html = html.replace(
    '    buildUnitSelector(document.getElementById(\'unitSelect\'));\n',
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      const all = shuffle(getAllWords(unitId));
      if (all.length < 3) return alert('该单元至少需要 3 个单词！');`,
    `    function startGame() {
      unitId = unitSelect.value;
      const all = getSelectedWords(unitId, wordCheckArea);
      if (!all.length) return alert('请至少选择一个单词！');
      if (all.length < 3) return alert('请至少选择 3 个单词！');`
  );
  return html;
}

function patchGame9(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    let unitId = \'\', pool = [];\n',
    '    let unitId = \'\', pool = [], wordPool = [];\n'
  );
  html = html.replace(
    '    buildUnitSelector(document.getElementById(\'unitSelect\'));\n',
    `    const unitSelect = document.getElementById('unitSelect');
    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startGame() {
      unitId = document.getElementById('unitSelect').value;
      pool = shuffle(getAllWords(unitId));
      if (pool.length < 4) return alert('该单元至少需要 4 个单词！');`,
    `    function startGame() {
      unitId = unitSelect.value;
      wordPool = getSelectedWords(unitId, wordCheckArea);
      if (!wordPool.length) return alert('请至少选择一个单词！');
      if (wordPool.length < 4) return alert('请至少选择 4 个单词！');
      pool = wordPool;`
  );
  html = html.replace(
    '      const all = getAllWords(unitId);\n      const opts = pickQuizOptions(w, all, 4, item => item.word)',
    '      const opts = pickQuizOptions(w, wordPool, 4, item => item.word)'
  );
  return html;
}

function patchTest(html) {
  html = addWordCheckArea(html);
  html = html.replace(
    '    buildUnitSelector(unitSelect);\n',
    `    const wordCheckArea = document.getElementById('wordCheckArea');
    initGameWordSelection(unitSelect, wordCheckArea);
`
  );
  html = html.replace(
    `    function startTest() {
      unitId = unitSelect.value;
      testWords = shuffle(getAllWords(unitId));`,
    `    function startTest() {
      unitId = unitSelect.value;
      testWords = getSelectedWords(unitId, wordCheckArea);
      if (!testWords.length) return alert('请至少选择一个单词！');`
  );
  html = html.replace(
    /const all = getAllWords\(unitId\);/g,
    'const all = testWords;'
  );
  return html;
}

const GAME_PATCHERS = {
  3: patchGame3,
  4: patchGame4,
  5: patchGame5,
  6: patchGame6,
  7: patchGame7,
  8: patchGame8,
  9: patchGame9,
};

let utilsPatched = 0;
let filesPatched = 0;

for (const grade of GRADES) {
  const utilsFile = path.join(CW, grade, 'assets/js/utils.js');
  if (patchUtils(utilsFile)) utilsPatched++;
}

for (const grade of GRADES) {
  for (let n = 3; n <= 9; n++) {
    const file = path.join(CW, grade, `review-game${n}.html`);
    if (!fs.existsSync(file)) continue;
    const orig = fs.readFileSync(file, 'utf8');
    const patched = GAME_PATCHERS[n](orig);
    if (patched !== orig) {
      fs.writeFileSync(file, patched);
      filesPatched++;
      console.log(`patched ${grade}/review-game${n}.html`);
    }
  }
  const testFile = path.join(CW, grade, 'test.html');
  if (fs.existsSync(testFile)) {
    const orig = fs.readFileSync(testFile, 'utf8');
    const patched = patchTest(orig);
    if (patched !== orig) {
      fs.writeFileSync(testFile, patched);
      filesPatched++;
      console.log(`patched ${grade}/test.html`);
    }
  }
}

console.log(`Done: ${utilsPatched} utils.js, ${filesPatched} HTML files`);
