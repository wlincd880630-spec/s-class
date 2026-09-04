#!/usr/bin/env node
/**
 * 并行把仓库内图片上传到腾讯云 COS（增量：同 Key 且同大小则跳过）。
 * 用法: node scripts/upload-images-to-cos-parallel.js [--dry] [--concurrency 8]
 */
const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');
const DRY = process.argv.includes('--dry');
const cIdx = process.argv.indexOf('--concurrency');
const CONCURRENCY = cIdx >= 0 ? Math.max(1, Number(process.argv[cIdx + 1]) || 8) : 8;

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico']);
const IGNORE_DIRS = new Set(['.git', 'node_modules', 'scripts']);

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('missing .cos-config.json');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const cos = new COS({
  SecretId: config.SecretId,
  SecretKey: config.SecretKey,
  Timeout: 180000,
});
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

function toForwardSlash(p) { return p.replace(/\\/g, '/'); }

function walk(dir, list = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!IGNORE_DIRS.has(e.name)) walk(path.join(dir, e.name), list);
    } else if (IMAGE_EXT.has(path.extname(e.name).toLowerCase())) {
      list.push(path.join(dir, e.name));
    }
  }
  return list;
}

function listPrefix(prefix) {
  return new Promise((resolve, reject) => {
    const all = {};
    let marker = '';
    function page() {
      cos.getBucket({
        Bucket, Region, Prefix: prefix, MaxKeys: 1000, Marker: marker,
      }, (err, data) => {
        if (err) return reject(err);
        for (const obj of data.Contents || []) all[obj.Key] = parseInt(obj.Size, 10);
        if (data.IsTruncated === 'true' && data.NextMarker) {
          marker = data.NextMarker;
          page();
        } else resolve(all);
      });
    }
    page();
  });
}

function put(key, filePath) {
  const size = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.gif': 'image/gif', '.webp': 'image/webp', '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  };
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket, Region, Key: key,
      Body: fs.createReadStream(filePath),
      ContentLength: size,
      ContentType: types[ext] || 'application/octet-stream',
    }, (err, data) => (err ? reject(err) : resolve(data)));
  });
}

async function pool(items, limit, worker) {
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const files = walk(ROOT);
console.log('local images', files.length);
console.log('listing COS prefix', cosPrefix);
process.stdout.write('');
  const remote = await listPrefix(cosPrefix);
  console.log('COS objects under prefix', Object.keys(remote).length);

  const toUpload = [];
  let skip = 0;
  for (const localPath of files) {
    const rel = toForwardSlash(path.relative(ROOT, localPath));
    const key = cosPrefix + rel;
    const size = fs.statSync(localPath).size;
    if (remote[key] === size) { skip++; continue; }
    toUpload.push({ localPath, rel, key, size });
  }
  console.log('skip (same size)', skip, 'upload', toUpload.length, 'concurrency', CONCURRENCY);
  if (DRY) {
    for (const f of toUpload.slice(0, 30)) console.log('[dry]', f.rel, f.size);
    if (toUpload.length > 30) console.log('[dry] ...', toUpload.length - 30, 'more');
    return;
  }
  let ok = 0;
  let fail = 0;
  const failed = [];
  await pool(toUpload, CONCURRENCY, async (f) => {
    try {
      await put(f.key, f.localPath);
      ok++;
      if (ok % 50 === 0 || ok + fail === toUpload.length) {
        process.stdout.write('progress ' + ok + ' ok ' + fail + ' fail / ' + toUpload.length + '\n');
      }
    } catch (e) {
      fail++;
      failed.push(f.rel + ' ' + (e.message || e));
      console.error('FAIL', f.rel, e.message || e);
    }
  });
  console.log('DONE ok', ok, 'fail', fail, 'skipped', skip);
  if (failed.length) {
    fs.writeFileSync(path.join(ROOT, 'scripts/.cos-image-upload-failures.txt'), failed.join('\n') + '\n');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
