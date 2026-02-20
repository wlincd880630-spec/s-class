/**
 * 将 Listening JSON 中的「键值对表格」统一为 headers + rows 格式，
 * 便于 player.html 只保留一种表格渲染逻辑。
 * 用法：在 IELTS-exam/Listening 目录下执行 node normalize-listening-json.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

function isPlainStringOrNumber(v) {
  return v === null || v === undefined || typeof v === 'string' || typeof v === 'number';
}

function allValuesStringOrNumber(obj) {
  return Object.values(obj).every(isPlainStringOrNumber);
}

/** 键值对 → headers + rows（每列按 \n 拆成多行） */
function keyValueToHeadersRows(content) {
  const keys = Object.keys(content);
  const rowsByCol = keys.map(k => String(content[k] ?? '').split('\n'));
  const rowCount = Math.max(1, ...rowsByCol.map(a => a.length));
  const headers = keys;
  const rows = [];
  for (let r = 0; r < rowCount; r++) {
    const row = {};
    keys.forEach((k, c) => { row[k] = rowsByCol[c][r] ?? ''; });
    rows.push(row);
  }
  return { headers, rows };
}

/** title + data（data 为扁平对象）→ headers: ["Field", "Details"], rows */
function titleDataToHeadersRows(content) {
  const data = content.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  if (!allValuesStringOrNumber(data)) return null;
  const rows = Object.entries(data).map(([k, v]) => ({ 'Field': k, 'Details': String(v ?? '') }));
  return { headers: ['Field', 'Details'], rows };
}

function normalizeTableContent(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) return content;
  if (Array.isArray(content.headers) && Array.isArray(content.rows)) return content;

  const keys = Object.keys(content);
  if (keys.length === 0) return content;

  if (keys.length === 2 && keys.includes('title') && keys.includes('data')) {
    const converted = titleDataToHeadersRows(content);
    if (converted) return converted;
  }

  if (allValuesStringOrNumber(content)) return keyValueToHeadersRows(content);
  return content;
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error('Parse error:', filePath, e.message);
    return 0;
  }

  let count = 0;
  if (data.sections && Array.isArray(data.sections)) {
    data.sections.forEach(sec => {
      if (!sec.elements) return;
      sec.elements.forEach(el => {
        if (el.type === 'table' && typeof el.content === 'object' && el.content !== null && !Array.isArray(el.content)) {
          const normalized = normalizeTableContent(el.content);
          if (normalized !== el.content) {
            el.content = normalized;
            count++;
          }
        }
      });
    });
  }

  if (count > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(filePath, '→ 转换了', count, '处 table');
  }
  return count;
}

function main() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error('data 目录不存在:', DATA_DIR);
    process.exit(1);
  }
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('_Listening.json'));
  let total = 0;
  files.forEach(f => {
    total += processFile(path.join(DATA_DIR, f));
  });
  console.log('合计转换', total, '处');
}

main();
