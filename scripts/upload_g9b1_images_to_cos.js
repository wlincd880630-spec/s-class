#!/usr/bin/env node
/**
 * Upload only junior_vocab/G9_B1 image files to Tencent COS (parallel).
 * Usage: node scripts/upload_g9b1_images_to_cos.js [--dry] [--concurrency 12]
 */
const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'junior_vocab', 'G9_B1');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');
const DRY = process.argv.includes('--dry');
const cIdx = process.argv.indexOf('--concurrency');
const CONCURRENCY = cIdx >= 0 ? Math.max(1, Number(process.argv[cIdx + 1]) || 12) : 12;

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

function walk(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, list);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name) && !e.name.startsWith('.')) list.push(p);
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
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket, Region, Key: key,
      Body: fs.createReadStream(filePath),
      ContentLength: size,
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
  const files = walk(SRC).filter((p) => /\/images\//.test(p.replace(/\\/g, '/')));
  console.log('local G9_B1 images:', files.length, 'concurrency:', CONCURRENCY);
  const remotePrefix = cosPrefix + 'junior_vocab/G9_B1/';
  const remote = DRY ? {} : await listPrefix(remotePrefix);
  console.log('remote G9_B1 objects:', Object.keys(remote).length);

  const toUpload = [];
  for (const local of files) {
    const rel = path.relative(ROOT, local).replace(/\\/g, '/');
    const key = cosPrefix + rel;
    const localSize = fs.statSync(local).size;
    if (remote[key] === localSize) continue;
    toUpload.push({ local, rel, key, size: localSize });
  }
  console.log('need upload:', toUpload.length, 'skip:', files.length - toUpload.length);
  if (DRY) {
    toUpload.slice(0, 8).forEach((f) => console.log('[dry]', f.rel));
    return;
  }

  let ok = 0;
  let fail = 0;
  await pool(toUpload, CONCURRENCY, async (f) => {
    try {
      await put(f.key, f.local);
      const n = ++ok;
      if (n % 40 === 0 || n === toUpload.length) {
        console.log('uploaded', n, '/', toUpload.length, 'fail', fail);
      }
    } catch (e) {
      fail++;
      console.error('FAIL', f.rel, e.message);
    }
  });
  console.log('done ok=', ok, 'fail=', fail);
  if (fail) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
