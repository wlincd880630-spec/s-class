#!/usr/bin/env node
/**
 * Upload only junior_vocab/G9_B1 image files to Tencent COS.
 * Usage: node scripts/upload_g9b1_images_to_cos.js [--dry]
 */
const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'junior_vocab', 'G9_B1');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');
const DRY = process.argv.includes('--dry');

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
    else if (/\.(jpe?g|png|webp)$/i.test(e.name) && e.name.startsWith('.') === false) {
      list.push(p);
    }
  }
  return list;
}

function put(key, filePath) {
  const size = fs.statSync(filePath).size;
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket,
      Region,
      Key: key,
      Body: fs.createReadStream(filePath),
      ContentLength: size,
    }, (err, data) => (err ? reject(err) : resolve(data)));
  });
}

async function main() {
  const files = walk(SRC).filter((p) => /\/images\//.test(p.replace(/\\/g, '/')));
  console.log('local G9_B1 images:', files.length);
  let ok = 0;
  let fail = 0;
  for (const local of files) {
    const rel = path.relative(ROOT, local).replace(/\\/g, '/');
    const key = cosPrefix + rel;
    if (DRY) {
      console.log('[dry]', rel);
      ok++;
      continue;
    }
    try {
      await put(key, local);
      ok++;
      if (ok % 20 === 0) console.log('uploaded', ok, '/', files.length);
    } catch (e) {
      fail++;
      console.error('FAIL', rel, e.message);
    }
  }
  console.log('done ok=', ok, 'fail=', fail);
  if (fail) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
