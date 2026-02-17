/**
 * 批量将项目内 HTML 中的相对媒体链接替换为腾讯云 COS 地址（直接改文件内容）。
 * 用法：node scripts/rewrite-html-media.js
 * 可选：node scripts/rewrite-html-media.js --dry  仅打印将要修改的内容，不写回文件
 */

const fs = require('fs');
const path = require('path');

const COS_BASE = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/';
const MEDIA_EXT = /\.(jpg|jpeg|png|gif|webp|bmp|svg|ico|mp4|webm|mov|avi|mkv|mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i;
const DRY = process.argv.includes('--dry');

const rootDir = path.resolve(__dirname, '..');

function isRelativeMedia(url) {
  if (!url || typeof url !== 'string') return false;
  const t = url.trim();
  if (!t.length || /^https?:\/\//i.test(t) || /^data:/.test(t) || /^#/.test(t)) return false;
  return MEDIA_EXT.test(t.split('?')[0]);
}

function getAllHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== '.git' && e.name !== 'scripts') getAllHtmlFiles(full, list);
    } else if (e.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

function toForwardSlash(p) {
  return p.replace(/\\/g, '/');
}

function rewriteFile(htmlPath) {
  const relativePath = path.relative(rootDir, htmlPath);
  const rawPrefix = toForwardSlash(path.dirname(relativePath));
  const prefix = (rawPrefix === '.' || rawPrefix === '') ? '' : rawPrefix;
  let content = fs.readFileSync(htmlPath, 'utf8');
  let changed = false;

  // src="相对媒体路径" 或 src='相对媒体路径'
  content = content.replace(/\b(src|href)=(["'])([^"']+)\2/gi, (_, attr, quote, url) => {
    if (!isRelativeMedia(url)) return _;
    const pathPart = url.replace(/^\.\//, '').trim();
    const fullPath = prefix ? prefix + '/' + pathPart : pathPart;
    const newUrl = COS_BASE.replace(/\/+$/, '') + '/' + fullPath.replace(/\/+/g, '/');
    changed = true;
    return attr + '=' + quote + newUrl + quote;
  });

  if (changed && !DRY) fs.writeFileSync(htmlPath, content, 'utf8');
  return changed;
}

const htmlFiles = getAllHtmlFiles(rootDir);
let count = 0;
for (const f of htmlFiles) {
  if (rewriteFile(f)) {
    count++;
    const rel = path.relative(rootDir, f);
    console.log(DRY ? '[dry] 将修改: ' + rel : '已改写: ' + rel);
  }
}
console.log(DRY ? `[dry] 共 ${count} 个文件会被修改。去掉 --dry 执行即可写回。` : `完成，共修改 ${count} 个文件。`);
