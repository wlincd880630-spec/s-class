#!/usr/bin/env node
/**
 * 核对 Git 历史中的图片与 COS，把仍缺的对象补传上去（同 Key 同大小则跳过）。
 *
 * 默认对照最后一次仍跟踪图片的提交（#335 合入前的 18f748ae），
 * 并补扫全历史里后来被删掉的图片路径。
 *
 * 用法:
 *   node scripts/upload-git-images-to-cos.js [--dry] [--concurrency 32]
 *       [--tree 18f748ae] [--no-history] [--out-dir /tmp/git-cos-images]
 */
const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');
const DRY = process.argv.includes('--dry');
const NO_HISTORY = process.argv.includes('--no-history');
const cIdx = process.argv.indexOf('--concurrency');
const CONCURRENCY = cIdx >= 0 ? Math.max(1, Number(process.argv[cIdx + 1]) || 32) : 32;
const tIdx = process.argv.indexOf('--tree');
const TREE = tIdx >= 0 ? String(process.argv[tIdx + 1] || '').trim() : '18f748ae';
const oIdx = process.argv.indexOf('--out-dir');
const OUT_DIR = oIdx >= 0
  ? path.resolve(process.argv[oIdx + 1])
  : path.join('/tmp', 'git-cos-images');

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico']);

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('missing .cos-config.json');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const cos = new COS({
  SecretId: config.SecretId,
  SecretKey: config.SecretKey,
  Timeout: 180000,
  FileParallelLimit: CONCURRENCY,
  ChunkParallelLimit: 6,
});
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

function toForwardSlash(p) { return p.replace(/\\/g, '/'); }
function isImagePath(p) { return IMAGE_EXT.has(path.extname(p).toLowerCase()); }

function git(args, opts = {}) {
  return execFileSync('git', args, {
    cwd: ROOT,
    encoding: opts.encoding === null ? undefined : (opts.encoding || 'utf8'),
    maxBuffer: 80 * 1024 * 1024,
    ...opts,
  });
}

/** @returns {Map<string, {hash: string, size: number, source: string}>} */
function listTreeImages(treeish) {
  const out = git(['ls-tree', '-r', '-l', treeish]);
  const map = new Map();
  for (const line of out.split('\n')) {
    if (!line) continue;
    // mode type hash size\tpath
    const tab = line.indexOf('\t');
    if (tab < 0) continue;
    const meta = line.slice(0, tab).trim().split(/\s+/);
    const rel = line.slice(tab + 1);
    if (!isImagePath(rel)) continue;
    const hash = meta[2];
    const size = parseInt(meta[3], 10);
    if (!hash || !Number.isFinite(size)) continue;
    map.set(rel, { hash, size, source: treeish });
  }
  return map;
}

function addHistoryImages(map) {
  const globs = ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.webp', '*.bmp', '*.svg', '*.ico'];
  const raw = git([
    'log', '--all', '--diff-filter=ACMR',
    '--pretty=format:COMMIT %H', '--name-only', '--', ...globs,
  ]);
  let commit = '';
  const firstCommitForPath = new Map();
  for (const line of raw.split('\n')) {
    if (line.startsWith('COMMIT ')) {
      commit = line.slice(7).trim();
      continue;
    }
    const rel = line.trim();
    if (!rel || !isImagePath(rel) || firstCommitForPath.has(rel)) continue;
    firstCommitForPath.set(rel, commit);
  }
  const extras = [];
  for (const [rel, c] of firstCommitForPath) {
    if (!map.has(rel)) extras.push({ rel, spec: `${c}:${rel}`, source: c });
  }
  let added = 0;
  let skippedMissing = 0;
  if (extras.length) {
    const input = extras.map((e) => e.spec).join('\n') + '\n';
    const checked = git(['cat-file', '--batch-check'], { input });
    const rows = checked.trim().split('\n');
    for (let i = 0; i < extras.length; i++) {
      const parts = (rows[i] || '').trim().split(/\s+/);
      // hash type size  OR  spec missing
      if (parts[1] === 'missing' || parts.length < 3 || parts[1] !== 'blob') {
        skippedMissing++;
        continue;
      }
      const size = parseInt(parts[2], 10);
      map.set(extras[i].rel, { hash: parts[0], size, source: extras[i].source });
      added++;
    }
  }
  return { historyPaths: firstCommitForPath.size, added, skippedMissing };
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

function extractBlob(hash, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const fd = fs.openSync(destPath, 'w');
  try {
    const r = spawnSync('git', ['cat-file', 'blob', hash], {
      cwd: ROOT,
      stdio: ['ignore', fd, 'pipe'],
    });
    if (r.status !== 0) {
      throw new Error((r.stderr && r.stderr.toString()) || `git cat-file ${hash} failed`);
    }
  } finally {
    fs.closeSync(fd);
  }
}

function put(key, filePath) {
  const size = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.gif': 'image/gif', '.webp': 'image/webp', '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  };
  const run = () => new Promise((resolve, reject) => {
    cos.putObject({
      Bucket, Region, Key: key,
      Body: fs.createReadStream(filePath),
      ContentLength: size,
      ContentType: types[ext] || 'application/octet-stream',
    }, (err, data) => (err ? reject(err) : resolve(data)));
  });
  return (async () => {
    let last;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await run();
      } catch (e) {
        last = e;
        if (attempt === 3) throw last;
        await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
  })();
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
  console.log('tree', TREE, 'history', NO_HISTORY ? 'off' : 'on', 'concurrency', CONCURRENCY);
  const images = listTreeImages(TREE);
  console.log('images in tree', images.size);
  if (!NO_HISTORY) {
    const hist = addHistoryImages(images);
    console.log(
      'history unique paths', hist.historyPaths,
      'added missing-from-tree', hist.added,
      'unresolvable', hist.skippedMissing,
      'total candidates', images.size,
    );
  }

  console.log('listing COS prefix', cosPrefix);
  const remote = await listPrefix(cosPrefix);
  console.log('COS objects under prefix', Object.keys(remote).length);

  const toUpload = [];
  let skip = 0;
  let localHit = 0;
  for (const [rel, meta] of images) {
    const key = cosPrefix + rel;
    if (remote[key] === meta.size) {
      skip++;
      continue;
    }
    const localPath = path.join(ROOT, rel);
    let filePath = null;
    if (fs.existsSync(localPath) && fs.statSync(localPath).size === meta.size) {
      filePath = localPath;
      localHit++;
    }
    toUpload.push({ rel, key, hash: meta.hash, size: meta.size, source: meta.source, filePath });
  }
  console.log('skip (same size on COS)', skip, 'need upload', toUpload.length, 'reuse local file', localHit);
  if (DRY) {
    const sample = toUpload.slice(0, 40);
    for (const f of sample) console.log('[dry]', f.rel, f.size, f.source);
    if (toUpload.length > sample.length) console.log('[dry] ...', toUpload.length - sample.length, 'more');
    return;
  }
  if (!toUpload.length) {
    console.log('DONE ok 0 fail 0 skipped', skip);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let extracted = 0;
  for (const f of toUpload) {
    if (f.filePath) continue;
    const dest = path.join(OUT_DIR, f.rel);
    extractBlob(f.hash, dest);
    const got = fs.statSync(dest).size;
    if (got !== f.size) {
      throw new Error('size mismatch after extract ' + f.rel + ' expected ' + f.size + ' got ' + got);
    }
    f.filePath = dest;
    extracted++;
    if (extracted % 50 === 0) {
      fs.writeSync(1, 'extracted ' + extracted + ' / ' + (toUpload.length - localHit) + '\n');
    }
  }
  console.log('extracted from git', extracted);

  let ok = 0;
  let fail = 0;
  const failed = [];
  await pool(toUpload, CONCURRENCY, async (f) => {
    try {
      await put(f.key, f.filePath);
      ok++;
      if (ok % 10 === 0 || ok + fail === toUpload.length) {
        fs.writeSync(1, 'progress ' + ok + ' ok ' + fail + ' fail / ' + toUpload.length + '\n');
      }
    } catch (e) {
      fail++;
      failed.push(f.rel + ' ' + (e.message || e));
      console.error('FAIL', f.rel, e.message || e);
    }
  });
  console.log('DONE ok', ok, 'fail', fail, 'skipped', skip);
  const reportDir = '/tmp';
  fs.writeFileSync(path.join(reportDir, 'cos-git-image-upload-report.json'), JSON.stringify({
    tree: TREE,
    skip,
    uploaded: ok,
    fail,
    failed,
    uploadedRels: toUpload.map((f) => f.rel),
  }, null, 2));
  fs.writeFileSync(
    path.join(reportDir, 'cos-git-image-uploaded.txt'),
    toUpload.map((f) => f.rel).join('\n') + (toUpload.length ? '\n' : ''),
  );
  if (failed.length) {
    fs.writeFileSync(path.join(reportDir, 'cos-git-image-upload-failures.txt'), failed.join('\n') + '\n');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
