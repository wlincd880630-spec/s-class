#!/usr/bin/env node
/**
 * 逐 Test、逐 Section、逐 Element 检查所有听力 JSON，列出所有潜在问题。
 * 只读 Listening.json，不读听写稿/答案。
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PREFIX = '剑桥雅思真题';
const BOOKS = [11, 12, 13, 14, 15, 16, 17, 18, 19];
const TESTS = [1, 2, 3, 4];
const KNOWN_TYPES = new Set(['heading', 'instruction', 'text', 'table', 'list', 'question_block', 'map']);

const allIssues = [];

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function add(book, test, sectionNum, elemIdx, type, msg, severity = 'warn') {
  allIssues.push({ book, test, sectionNum, elemIdx, type, msg, severity });
}

function checkElement(book, test, sectionNum, elemIdx, el) {
  const t = (el.type || '').toLowerCase();
  const content = el.content;

  if (!t) {
    add(book, test, sectionNum, elemIdx, '-', '缺少 type', 'error');
    return;
  }
  if (!KNOWN_TYPES.has(t)) {
    add(book, test, sectionNum, elemIdx, t, `未知 type: ${el.type}，播放器可能当默认文本渲染`, 'warn');
  }

  if (t === 'heading') {
    if (content == null || (typeof content === 'string' && !content.trim())) {
      add(book, test, sectionNum, elemIdx, t, 'heading content 为空', 'error');
    }
    return;
  }

  if (t === 'instruction') {
    if (content == null && content !== '') {
      add(book, test, sectionNum, elemIdx, t, 'instruction content 为空', 'warn');
    }
    return;
  }

  if (t === 'text') {
    if (content == null) {
      add(book, test, sectionNum, elemIdx, t, 'text content 为空', 'warn');
      return;
    }
    const s = String(content).trim();
    if (s.length === 0) {
      add(book, test, sectionNum, elemIdx, t, 'text content 仅空白', 'warn');
    }
    if (s.length > 0 && s.length < 60 && /^[A-H][a-z]*$/.test(s)) {
      add(book, test, sectionNum, elemIdx, t, `单行 "${s}" 以 A-H 开头（播放器已要求含换行才当选项框）`, 'info');
    }
    return;
  }

  if (t === 'table') {
    if (content == null) {
      add(book, test, sectionNum, elemIdx, t, 'table content 为空', 'error');
      return;
    }
    if (typeof content === 'string') {
      const str = content.trim();
      if (!str) add(book, test, sectionNum, elemIdx, t, 'table 字符串为空', 'error');
      if (str.includes('Example\n') && str.includes('\n• ')) {
        const afterExample = str.split('Example\n')[1];
        if (afterExample && !afterExample.startsWith('•') && !afterExample.startsWith('\n')) {
          const firstLine = afterExample.split('\n')[0].trim();
          if (firstLine.length > 0 && firstLine.length < 50 && !/^[•\-]/.test(firstLine)) {
            add(book, test, sectionNum, elemIdx, t, `Example 后紧跟 "${firstLine.slice(0, 30)}..." 无 bullet，应与下一行 bullet 对齐（可在 JSON 中改为 "Example\\n• ${firstLine}\\n..."）`, 'warn');
          }
        }
      }
      return;
    }
    if (Array.isArray(content)) {
      if (content.length === 0) {
        add(book, test, sectionNum, elemIdx, t, 'table 数组为空', 'error');
        return;
      }
      const first = content[0];
      if (typeof first !== 'object' || first === null || Array.isArray(first)) {
        add(book, test, sectionNum, elemIdx, t, 'table 数组首项应为行对象', 'error');
        return;
      }
      const keys = Object.keys(first);
      content.forEach((row, ri) => {
        if (typeof row !== 'object' || row === null) {
          add(book, test, sectionNum, elemIdx, t, `table 第 ${ri + 1} 行非对象`, 'error');
          return;
        }
        keys.forEach(k => {
          const v = row[k];
          if (v != null && typeof v !== 'string' && typeof v !== 'number') {
            add(book, test, sectionNum, elemIdx, t, `table 行 ${ri + 1} 列 "${k}" 值非字符串/数字，可能显示 [object Object]`, 'error');
          }
        });
      });
      return;
    }
    if (typeof content === 'object') {
      const keys = Object.keys(content);
      if (keys.length === 0) {
        add(book, test, sectionNum, elemIdx, t, 'table 对象无键', 'error');
        return;
      }
      if (keys.includes('title')) {
        const rest = keys.filter(k => k !== 'title' && k !== 'afterTitle');
        const onlyHeadersRows = (rest.length === 2 && rest.includes('headers') && rest.includes('rows')) ||
          (rest.length === 1 && rest[0] === 'rows');
        const rowsAreObjects = Array.isArray(content.rows) && content.rows.length > 0 &&
          typeof content.rows[0] === 'object' && content.rows[0] !== null && !Array.isArray(content.rows[0]);
        rest.forEach(k => {
          const v = content[k];
          if (k === 'rows' && onlyHeadersRows && rowsAreObjects) return;
          if (k === 'options' && typeof v === 'object' && v !== null && !Array.isArray(v)) {
            add(book, test, sectionNum, elemIdx, t, 'table.options 为对象（播放器已支持转为 A/B/C 列表）', 'info');
            return;
          }
          if (Array.isArray(v)) {
            v.forEach((item, i) => {
              if (item != null && typeof item !== 'string' && typeof item !== 'number') {
                add(book, test, sectionNum, elemIdx, t, `table.${k}[${i}] 非字符串/数字`, 'error');
              }
            });
          } else if (v != null && typeof v === 'object' && !Array.isArray(v)) {
            add(book, test, sectionNum, elemIdx, t, `table.${k} 为对象，播放器会 String() 可能显示 [object Object]`, 'error');
          }
        });
        return;
      }
      if (keys.includes('headers') && keys.includes('rows')) {
        const rows = content.rows;
        if (!Array.isArray(rows)) add(book, test, sectionNum, elemIdx, t, 'table.rows 非数组', 'error');
        return;
      }
      add(book, test, sectionNum, elemIdx, t, 'table 对象无 title 且无 headers/rows，将按「列名为 key、值为按行 join」处理', 'info');
    }
    return;
  }

  if (t === 'list') {
    if (!Array.isArray(content)) {
      add(book, test, sectionNum, elemIdx, t, 'list content 应为数组', 'error');
      return;
    }
    content.forEach((item, i) => {
      const str = String(item ?? '');
      if (str.trim().length === 0) {
        add(book, test, sectionNum, elemIdx, t, `list[${i}] 为空`, 'warn');
      }
    });
    return;
  }

  if (t === 'question_block') {
    if (content == null && !el.options) {
      add(book, test, sectionNum, elemIdx, t, 'question_block 无 content 且无 options', 'warn');
    }
    if (el.options && !Array.isArray(el.options)) {
      add(book, test, sectionNum, elemIdx, t, 'question_block.options 非数组', 'warn');
    }
    return;
  }

  if (t === 'map') {
    if (content == null) add(book, test, sectionNum, elemIdx, t, 'map content 为空', 'warn');
    return;
  }
}

function run() {
  console.log('逐 Test、逐 Section 检查所有 Listening.json ...\n');

  for (const book of BOOKS) {
    for (const test of TESTS) {
      const name = `${PREFIX}${book}_Test${test}_Listening.json`;
      const filePath = path.join(DATA_DIR, name);
      if (!fs.existsSync(filePath)) {
        allIssues.push({ book, test, sectionNum: '-', elemIdx: '-', type: '-', msg: `文件不存在: ${name}`, severity: 'error' });
        continue;
      }
      const data = loadJson(filePath);
      if (!data) {
        allIssues.push({ book, test, sectionNum: '-', elemIdx: '-', type: '-', msg: 'JSON 解析失败', severity: 'error' });
        continue;
      }
      const sections = data.sections;
      if (!Array.isArray(sections)) {
        allIssues.push({ book, test, sectionNum: '-', elemIdx: '-', type: '-', msg: 'sections 非数组', severity: 'error' });
        continue;
      }
      sections.forEach((sec, si) => {
        const num = sec.section_number != null ? sec.section_number : si + 1;
        const elements = sec.elements;
        if (!Array.isArray(elements)) {
          add(book, test, num, -1, '-', 'elements 非数组', 'error');
          return;
        }
        elements.forEach((el, ei) => {
          checkElement(book, test, num, ei, el);
        });
      });
    }
  }

  const errors = allIssues.filter(i => i.severity === 'error');
  const warns = allIssues.filter(i => i.severity === 'warn');
  const infos = allIssues.filter(i => i.severity === 'info');

  console.log('=== 按 Test 汇总 ===');
  const byTest = {};
  allIssues.forEach(i => {
    const key = `${i.book}-${i.test}`;
    if (!byTest[key]) byTest[key] = { error: 0, warn: 0, info: 0 };
    byTest[key][i.severity]++;
  });
  Object.keys(byTest).sort().forEach(key => {
    const [book, test] = key.split('-');
    const v = byTest[key];
    const parts = [];
    if (v.error) parts.push(`错误 ${v.error}`);
    if (v.warn) parts.push(`警告 ${v.warn}`);
    if (v.info) parts.push(`提示 ${v.info}`);
    console.log(`  剑桥${book} Test${test}: ${parts.join(', ') || '无'}`);
  });

  console.log('\n=== 错误 (error) ===');
  if (errors.length === 0) console.log('  无');
  else errors.forEach(i => console.log(`  [${i.book} Test${i.test} Sec${i.sectionNum} #${i.elemIdx} ${i.type}] ${i.msg}`));

  console.log('\n=== 警告 (warn) - 建议修复 ===');
  if (warns.length === 0) console.log('  无');
  else warns.forEach(i => console.log(`  [${i.book} Test${i.test} Sec${i.sectionNum} #${i.elemIdx} ${i.type}] ${i.msg}`));

  console.log('\n=== 提示 (info) ===');
  if (infos.length === 0) console.log('  无');
  else infos.forEach(i => console.log(`  [${i.book} Test${i.test} Sec${i.sectionNum} #${i.elemIdx}] ${i.msg}`));

  console.log('\n--- 合计 ---');
  console.log(`错误: ${errors.length}, 警告: ${warns.length}, 提示: ${infos.length}`);
  process.exit(errors.length > 0 ? 1 : 0);
}

run();
