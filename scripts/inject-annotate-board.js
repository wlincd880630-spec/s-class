#!/usr/bin/env node
/**
 * 向全站 HTML 注入 scripts/annotate-board.js
 * 用法：node scripts/inject-annotate-board.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MARKER = 'annotate-board.js';
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.cursor',
  'media'
]);

function walk(dir, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (_) {
    return;
  }
  for (const ent of entries) {
    if (ent.name.startsWith('.')) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walk(full, out);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.html')) {
      out.push(full);
    }
  }
}

function relToScript(htmlFile) {
  const htmlDir = path.dirname(htmlFile);
  let rel = path.relative(htmlDir, path.join(ROOT, 'scripts', 'annotate-board.js'));
  rel = rel.split(path.sep).join('/');
  return rel;
}

function inject(htmlFile) {
  let src = fs.readFileSync(htmlFile, 'utf8');
  if (src.includes(MARKER)) return 'skip';

  // 已引入根目录 scripts/auth-check.js 的页面会由 auth-check 自动加载书写工具
  if (/scripts\/auth-check\.js/.test(src)) return 'skip-auth';

  const rel = relToScript(htmlFile);
  const tag = `<script src="${rel}" defer></script>`;

  // Prefer before </body>; else before </html>; else append
  const bodyClose = src.match(/<\/body\s*>/i);
  if (bodyClose) {
    src = src.slice(0, bodyClose.index) + tag + '\n' + src.slice(bodyClose.index);
  } else {
    const htmlClose = src.match(/<\/html\s*>/i);
    if (htmlClose) {
      src = src.slice(0, htmlClose.index) + tag + '\n' + src.slice(htmlClose.index);
    } else {
      src = src + '\n' + tag + '\n';
    }
  }

  fs.writeFileSync(htmlFile, src, 'utf8');
  return 'injected';
}

const files = [];
walk(ROOT, files);

// Skip docs under scripts/
const filtered = files.filter((f) => {
  const rel = path.relative(ROOT, f);
  if (rel.startsWith('scripts' + path.sep)) return false;
  return true;
});

let injected = 0;
let skipped = 0;
let skippedAuth = 0;
let failed = 0;

for (const f of filtered) {
  try {
    const r = inject(f);
    if (r === 'injected') injected++;
    else if (r === 'skip-auth') skippedAuth++;
    else skipped++;
  } catch (e) {
    failed++;
    console.error('FAIL', f, e.message);
  }
}

console.log(JSON.stringify({ total: filtered.length, injected, skipped, skippedAuth, failed }, null, 2));
