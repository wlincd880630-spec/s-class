/**
 * 确认：所有在 HTML 中引用的 COS 媒体 +（若有）Git 中跟踪的媒体文件是否都在 COS 中。
 * 1) 扫描 HTML 中指向 COS 的媒体 URL
 * 2) 可选：git ls-files 列出被跟踪的媒体文件，对应 COS Key = prefix + 相对路径
 * 与 COS 桶内对象列表对比，报告缺失项。
 *
 * 用法：node scripts/verify-cos-media.js
 * 依赖：.cos-config.json 已配置且可访问 COS
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');

const COS_BASE_URL = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/';
const MEDIA_EXT = /\.(jpg|jpeg|png|gif|webp|bmp|svg|ico|mp4|webm|mov|avi|mkv|mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i;
const MEDIA_EXT_SET = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico', '.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv', '.wmv', '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac']);

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('找不到 .cos-config.json，无法访问 COS。');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';
const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const Bucket = config.Bucket;
const Region = config.Region;

function toForwardSlash(p) { return p.replace(/\\/g, '/'); }

// ---------- 0. Git 中已跟踪的媒体文件（即“在 GitHub 上的媒体”）对应的 COS Key ----------
function getTrackedMediaKeys() {
  const keys = new Set();
  try {
    const out = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
    out.split(/\r?\n/).filter(Boolean).forEach(rel => {
      const ext = path.extname(rel).toLowerCase();
      if (MEDIA_EXT_SET.has(ext)) keys.add(cosPrefix.replace(/\/+$/, '') + '/' + toForwardSlash(rel));
    });
  } catch (e) { /* git not available or error */ }
  return keys;
}

// ---------- 1. 扫描所有 HTML，提取 COS 媒体 URL 对应的 Key ----------
function getAllHtmlFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== '.git' && e.name !== 'scripts') getAllHtmlFiles(full, list);
    } else if (e.name.toLowerCase().endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

function extractCosMediaKeys(htmlPath) {
  const content = fs.readFileSync(htmlPath, 'utf8');
  const keys = new Set();
  // 匹配 src="..." 或 href="..." 中为 COS 基址 + 媒体扩展的 URL
  const regex = /(?:src|href)=["'](https?:\/\/[^"']+?)["']/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const url = m[1].trim();
    if (!url.startsWith(COS_BASE_URL)) continue;
    const pathPart = url.slice(COS_BASE_URL.length).split('?')[0].replace(/\/+/g, '/').trim();
    if (!pathPart || !MEDIA_EXT.test(pathPart)) continue;
    // COS Key = prefix + pathPart（与 upload 时一致）
    const key = cosPrefix.replace(/\/+$/, '') + '/' + pathPart.replace(/^\//, '');
    keys.add(key);
  }
  return keys;
}

const htmlFiles = getAllHtmlFiles(ROOT, []);
const referencedKeys = new Set();

// 从 HTML 中引用的 COS 媒体
for (const f of htmlFiles) {
  try {
    for (const k of extractCosMediaKeys(f)) referencedKeys.add(k);
  } catch (e) {
    console.warn('读取失败:', path.relative(ROOT, f), e.message);
  }
}

// 合并：Git 中已跟踪的媒体（若在 GitHub 上，则应对应在 COS 中）
const trackedKeys = getTrackedMediaKeys();
if (trackedKeys.size > 0) {
  console.log('Git 中已跟踪的媒体文件（会出现在 GitHub）:', trackedKeys.size, '个');
  trackedKeys.forEach(k => referencedKeys.add(k));
}

// ---------- 2. 列出 COS 上所有对象（带 prefix） ----------
function listAllCosObjects() {
  return new Promise((resolve, reject) => {
    const all = [];
    let marker = '';
    function fetchPage() {
      cos.getBucket({
        Bucket,
        Region,
        Prefix: cosPrefix,
        MaxKeys: 1000,
        Marker: marker
      }, (err, data) => {
        if (err) return reject(err);
        if (data.Contents) all.push(...data.Contents);
        if (data.IsTruncated === 'true' && data.NextMarker) {
          marker = data.NextMarker;
          fetchPage();
        } else {
          resolve(all);
        }
      });
    }
    fetchPage();
  });
}

// ---------- 3. 对比并输出结果 ----------
(async () => {
  console.log('正在扫描本地 HTML 中引用的 COS 媒体 URL…');
  const refList = [...referencedKeys].sort();
  console.log('共引用', refList.length, '个 COS 媒体对象（去重后）。\n');

  if (refList.length === 0) {
    console.log('未在 HTML 中发现指向 COS 的媒体链接（可能尚未运行 rewrite-html-media 或媒体均用相对路径）。');
    process.exit(0);
  }

  console.log('正在拉取 COS 桶内对象列表…');
  const cosObjects = await listAllCosObjects();
  const cosKeys = new Set(cosObjects.map(o => o.Key));

  const missing = refList.filter(k => !cosKeys.has(k));
  const ok = refList.filter(k => cosKeys.has(k));

  if (missing.length > 0) {
    console.log('\n【缺失】以下', missing.length, '个在 HTML 中被引用，但 COS 中不存在：');
    missing.forEach(k => console.log('  ', k));
    console.log('\n建议：在项目根目录执行 node scripts/upload-media-to-cos.js 上传本地媒体，或检查路径是否写错。');
    process.exit(1);
  }

  console.log('\n【结果】所有在 HTML 中引用的 COS 媒体文件均存在于 COS 中（共', ok.length, '个）。');
  process.exit(0);
})().catch(err => {
  console.error('执行出错:', err.message || err);
  process.exit(1);
});
