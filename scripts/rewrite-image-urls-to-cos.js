#!/usr/bin/env node
/**
 * 把 HTML/JS/JSON/CSS 中的相对图片路径改成腾讯云 COS 绝对 URL。
 * 用法: node scripts/rewrite-image-urls-to-cos.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');
const COS_HOST = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/';
const IMG_EXT = /\.(jpg|jpeg|png|gif|webp|bmp|svg|ico)(\?[^"'()\s]*)?$/i;
const SKIP_DIRS = new Set(['.git', 'node_modules', 'scripts']);
const TEXT_EXT = new Set(['.html', '.js', '.json', '.css']);

function toFwd(p) { return p.replace(/\\/g, '/'); }

function cosUrlFromRepoRel(rel, query) {
  const clean = toFwd(rel).replace(/^\/+/, '');
  const encoded = clean.split('/').map(encodeURIComponent).join('/');
  return COS_HOST + encoded + (query || '');
}

function splitQuery(url) {
  const i = url.indexOf('?');
  if (i < 0) return { path: url, query: '' };
  return { path: url.slice(0, i), query: url.slice(i) };
}

function resolveRel(filePath, url, opts = {}) {
  const { path: raw, query } = splitQuery(url.trim().replace(/^\.\//, ''));
  let dir = path.dirname(filePath);
  for (let i = 0; i < 8; i++) {
    const abs = path.normalize(path.join(dir, raw));
    const rel = toFwd(path.relative(ROOT, abs));
    if (rel && !rel.startsWith('..')) {
      const exists = fs.existsSync(abs);
      if (opts.requireExists) {
        if (exists) return { rel, query };
      } else if (exists || i === 0) {
        return { rel, query };
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function isSkippableUrl(url) {
  if (!url || typeof url !== 'string') return true;
  const t = url.trim();
  if (!t || t.startsWith('data:') || t.startsWith('#') || t.startsWith('javascript:')) return true;
  if (/^https?:\/\//i.test(t)) return true;
  return false;
}

function rewriteQuotedUrl(filePath, url, opts = {}) {
  if (isSkippableUrl(url)) return null;
  if (!IMG_EXT.test(url.trim().split('?')[0])) return null;
  const resolved = resolveRel(filePath, url, { requireExists: !!opts.requireExists });
  if (!resolved) return null;
  if (opts.requireSlash && !url.replace(/^\.\//, '').includes('/')) return null;
  if (opts.requireExists) {
    const abs = path.join(ROOT, resolved.rel);
    if (!fs.existsSync(abs)) return null;
  }
  return cosUrlFromRepoRel(resolved.rel, resolved.query);
}

function rewriteDirBase(filePath, dirUrl) {
  if (isSkippableUrl(dirUrl)) return null;
  let d = dirUrl.trim();
  if (!d.endsWith('/')) d += '/';
  if (!/(images|img|assets\/img|assets\/images|coloring|avatars|fx|science|lifecycle|sentences|words-meaning|words|story)\//i.test(d)
      && !/\/img\/$/i.test(d)) {
    return null;
  }
  const resolved = resolveRel(filePath, d, { requireExists: true });
  if (!resolved) return null;
  const dirRel = resolved.rel.endsWith('/') ? resolved.rel : resolved.rel + '/';
  return cosUrlFromRepoRel(dirRel, '');
}

function patchContent(filePath, content) {
  let s = content;
  let n = 0;

  // 1) MEDIA_COS IIFE that blanks out on s-class.top / localhost
  s = s.replace(
    /var MEDIA_COS = \(function \(\) \{\s*var cos = ("https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/[^"]+");\s*var h = \(location\.hostname \|\| ""\)\.toLowerCase\(\);\s*if \(h === "localhost" \|\| h === "127\.0\.0\.1" \|\| h === "www\.s-class\.top" \|\| h\.endsWith\("\.s-class\.top"\)\) return "";\s*return cos;\s*\}\)\(\);/g,
    (full, cos) => {
      n++;
      return `var MEDIA_COS = ${cos};`;
    }
  );

  // 2) src/href/poster/data-src
  s = s.replace(/\b(src|href|poster|data-src)=(["'])([^"']+)\2/gi, (full, attr, q, url) => {
    const next = rewriteQuotedUrl(filePath, url);
    if (!next || next === url) return full;
    n++;
    return `${attr}=${q}${next}${q}`;
  });

  // 3) CSS url(...)
  s = s.replace(/url\((['"]?)([^'")]+)\1\)/gi, (full, q, url) => {
    const next = rewriteQuotedUrl(filePath, url.trim());
    if (!next || next === url.trim()) return full;
    n++;
    const qq = q || '"';
    return `url(${qq}${next}${qq})`;
  });

  // 4) JS/JSON quoted image paths that include a folder (not bare filenames)
  s = s.replace(/(["'])([^"']+\.(?:jpg|jpeg|png|gif|webp|bmp|svg|ico)(?:\?[^"']*)?)\1/gi, (full, q, url) => {
    if (isSkippableUrl(url)) return full;
    const next = rewriteQuotedUrl(filePath, url, { requireSlash: true, requireExists: true });
    if (!next || next === url) return full;
    n++;
    return q + next + q;
  });

  // 5) directory bases used to concatenate filenames
  s = s.replace(
    /\b(var|const|let)\s+(IMG|IMAGE_BASE|IMG_BASE|imgBase)\s*=\s*(["'])([^"']+)\3/g,
    (full, kw, name, q, url) => {
      const next = rewriteDirBase(filePath, url);
      if (!next) return full;
      n++;
      return `${kw} ${name} = ${q}${next}${q}`;
    }
  );

  s = s.replace(
    /return "assets\/img\/" \+ String\(it\.image\)/g,
    (full) => {
      const next = rewriteDirBase(filePath, 'assets/img/');
      if (!next) return full;
      n++;
      return `return "${next}" + String(it.image)`;
    }
  );
  s = s.replace(
    /return "\.\.\/kp-shared\/img\/" \+ String\(name\)/g,
    (full) => {
      const next = rewriteDirBase(filePath, '../kp-shared/img/');
      if (!next) return full;
      n++;
      return `return "${next}" + String(name)`;
    }
  );

  return { text: s, n };
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(p, out);
    } else if (TEXT_EXT.has(path.extname(e.name).toLowerCase())) {
      out.push(p);
    }
  }
  return out;
}

function patchCatalogJs(filePath, content) {
  const base = cosUrlFromRepoRel('PET/studio/', '');
  let s = content;
  let n = 0;
  if (!s.includes('PET/studio/img/')) {
    s = s.replace(
      /function articleImg\(unitId\) \{\s*var n = Number\(unitId\);\s*if \(!n\) return "img\/hub-hero\.jpg";\s*return "img\/article-u" \+ pad2\(n\) \+ "\.jpg";\s*\}/,
      `function articleImg(unitId) {\n    var n = Number(unitId);\n    if (!n) return "${base}img/hub-hero.jpg";\n    return "${base}img/article-u" + pad2(n) + ".jpg";\n  }`
    );
    s = s.replace(
      /return "img\/article-u" \+ pad2\(unitId\) \+ "-p2\.jpg";/,
      `return "${base}img/article-u" + pad2(unitId) + "-p2.jpg";`
    );
    s = s.replace(
      /function gameImg\(gameId\) \{\s*return "img\/game-" \+ pad2\(gameId\) \+ "\.jpg";\s*\}/,
      `function gameImg(gameId) {\n    return "${base}img/game-" + pad2(gameId) + ".jpg";\n  }`
    );
    if (s !== content) n += 3;
  }
  return { text: s, n };
}

function patchLetterData(filePath, content) {
  const next = rewriteDirBase(filePath, 'assets/img/');
  if (!next) return { text: content, n: 0 };
  const text = content.replace(/var IMG = "assets\/img\/";/, `var IMG = "${next}";`);
  return { text, n: text === content ? 0 : 1 };
}

const files = walk(ROOT);
let filesChanged = 0;
let replacements = 0;
const changed = [];

for (const f of files) {
  const rel = toFwd(path.relative(ROOT, f));
  const original = fs.readFileSync(f, 'utf8');
  let raw = original;
  let total = 0;
  if (rel === 'PET/studio/js/catalog.js') {
    const r = patchCatalogJs(f, raw);
    raw = r.text; total += r.n;
  }
  if (/^Primary\/The_Alphabet\/[A-Z][a-z]\/assets\/js\/[a-z]{2}-data\.js$/.test(rel)) {
    const r = patchLetterData(f, raw);
    raw = r.text; total += r.n;
  }
  const r = patchContent(f, raw);
  raw = r.text; total += r.n;
  if (raw !== original) {
    filesChanged++;
    replacements += total;
    changed.push(rel + ' (' + total + ')');
    if (!DRY) fs.writeFileSync(f, raw, 'utf8');
  }
}

console.log((DRY ? '[dry] ' : '') + 'files', filesChanged, 'replacements', replacements);
for (const c of changed) console.log(' ', c);
