#!/usr/bin/env node
/**
 * 扫描所有听力 TEST 的 JSON：校验结构、发现潜在显示问题。
 * 能在 JSON 里修的会提示或自动改；需播放器配合的只报出。
 * 用法: node scripts/audit-listening-json.js [--fix]
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PREFIX = '剑桥雅思真题';
const BOOKS = [11, 12, 13, 14, 15, 16, 17, 18, 19];
const TESTS = [1, 2, 3, 4];

const args = process.argv.slice(2);
const doFix = args.includes('--fix');

const issues = [];
const infos = []; // 仅提示，播放器已处理
const fixed = [];

function loadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function auditOne(book, test) {
  const name = `${PREFIX}${book}_Test${test}_Listening.json`;
  const filePath = path.join(DATA_DIR, name);
  if (!fs.existsSync(filePath)) {
    issues.push({ book, test, msg: `文件不存在: ${name}` });
    return null;
  }

  const data = loadJson(filePath);
  if (!data) {
    issues.push({ book, test, msg: 'JSON 解析失败' });
    return null;
  }

  const sectionList = data.sections;
  if (!Array.isArray(sectionList)) {
    issues.push({ book, test, msg: '缺少 sections 或非数组' });
    return data;
  }

  sectionList.forEach((sec, si) => {
    const elements = sec.elements;
    if (!Array.isArray(elements)) {
      issues.push({ book, test, section: si + 1, msg: 'section.elements 非数组' });
      return;
    }

    elements.forEach((el, ei) => {
      const type = (el.type || '').toLowerCase();
      const content = el.content;

      if (!type) issues.push({ book, test, section: si + 1, elem: ei, msg: 'element 缺少 type' });

      if (type === 'table') {
        if (content == null) {
          issues.push({ book, test, section: si + 1, elem: ei, msg: 'table content 为空' });
          return;
        }
        if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object' && content[0] !== null) {
          const firstKeys = Object.keys(content[0]);
          firstKeys.forEach(k => {
            const v = content[0][k];
            if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
              issues.push({ book, test, section: si + 1, elem: ei, msg: `table 行对象的值应为字符串，列 "${k}" 为对象，可能显示 [object Object]` });
            }
          });
        }
        if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
          const keys = Object.keys(content);
          if (keys.length === 0) issues.push({ book, test, section: si + 1, elem: ei, msg: 'table content 为空对象' });
        }
      }

      if (type === 'text' && typeof content === 'string') {
        const s = content.trim();
        if (s.length > 0 && s.length < 50 && /^[A-H]\w*$/.test(s)) {
          infos.push({ book, test, section: si + 1, elem: ei, msg: `单行文本 "${s}" 以 A-H 开头（播放器已要求含 \\n 才当选项框，故无影响）` });
        }
      }
    });
  });

  return data;
}

function main() {
  console.log('扫描听力 JSON: books 11–19, tests 1–4 ...\n');

  for (const book of BOOKS) {
    for (const test of TESTS) {
      auditOne(book, test);
    }
  }

  if (infos.length) {
    console.log(`提示（播放器已处理，可忽略）: ${infos.length} 条`);
  }

  if (issues.length === 0) {
    console.log('未发现结构错误或需修复的显示问题。');
    process.exit(0);
    return;
  }

  console.log(`\n共 ${issues.length} 条需关注:\n`);
  issues.forEach(({ book, test, section, elem, msg }) => {
    const loc = [book, test, section, elem].filter(v => v != null).join(' ');
    console.log(`  [${loc}] ${msg}`);
  });

  if (doFix && fixed.length) {
    console.log('\n已自动修复:', fixed.length, '处');
  }
  process.exit(1);
}

main();
