/**
 * 一次性脚本：为所有 HTML 注入 auth-check.js 引用（紧接在 <head> 之后）
 * 运行：node scripts/inject-auth-check.js
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const authCheckMarker = 'auth-check.js';

function listHtml(dir, base = '') {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = base ? base + '/' + e.name : e.name;
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      files = files.concat(listHtml(path.join(dir, e.name), rel));
    } else if (e.name.endsWith('.html')) {
      files.push(rel);
    }
  }
  return files;
}

function relToScript(htmlRel) {
  const parts = htmlRel.replace(/\\/g, '/').split('/').filter(Boolean);
  const up = Math.max(0, parts.length - 1);
  if (up === 0) return 'scripts/auth-check.js';
  return '../'.repeat(up) + 'scripts/auth-check.js';
}

const htmlFiles = listHtml(rootDir);
let done = 0;
let skip = 0;

for (const rel of htmlFiles) {
  const fullPath = path.join(rootDir, rel);
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes(authCheckMarker)) {
    skip++;
    continue;
  }
  const scriptSrc = relToScript(rel);
  const tag = '<script src="' + scriptSrc + '"></script>';
  const insert = tag + '\n';
  if (content.indexOf('<head>') !== -1) {
    content = content.replace('<head>', '<head>\n    ' + tag.trim());
  } else if (content.indexOf('<HEAD>') !== -1) {
    content = content.replace('<HEAD>', '<HEAD>\n    ' + tag.trim());
  } else {
    console.warn('No <head>: ' + rel);
    continue;
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  done++;
}

console.log('Injected: ' + done + ', already had: ' + skip);
