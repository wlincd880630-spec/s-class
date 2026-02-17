/**
 * 批量删除腾讯云 COS 上的非媒体文件（html, txt, json, js, css 等）。
 * 只保留媒体文件（图片、视频、音频）。
 *
 * 用法：
 *   node scripts/clean-cos-non-media.js          列出将要删除的文件（预览）
 *   node scripts/clean-cos-non-media.js --delete  执行删除
 */

const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, '.cos-config.json'), 'utf8'));

const DELETE = process.argv.includes('--delete');

const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

const MEDIA_EXT = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico',
  '.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv', '.wmv',
  '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'
]);

function listAllCosObjects() {
  return new Promise((resolve, reject) => {
    const all = [];
    let marker = '';
    function fetchPage() {
      cos.getBucket({
        Bucket, Region,
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

function deleteObjects(keys) {
  return new Promise((resolve, reject) => {
    cos.deleteMultipleObject({
      Bucket, Region,
      Objects: keys.map(Key => ({ Key })),
      Quiet: true
    }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

async function main() {
  console.log('正在获取 COS 文件列表...');
  const allObjects = await listAllCosObjects();
  console.log('COS 上共 ' + allObjects.length + ' 个文件。');

  const nonMedia = allObjects.filter(obj => {
    const ext = path.extname(obj.Key).toLowerCase();
    if (obj.Key.endsWith('/') && obj.Size === '0') return true; // 空目录占位
    return !MEDIA_EXT.has(ext);
  });

  if (nonMedia.length === 0) {
    console.log('没有非媒体文件，无需清理。');
    return;
  }

  // 按扩展名分组统计
  const extCount = {};
  for (const obj of nonMedia) {
    const ext = path.extname(obj.Key).toLowerCase() || '(无扩展名/目录)';
    extCount[ext] = (extCount[ext] || 0) + 1;
  }

  console.log('');
  console.log('非媒体文件统计：');
  Object.entries(extCount).sort((a, b) => b[1] - a[1]).forEach(([ext, count]) => {
    console.log('  ' + ext + ': ' + count + ' 个');
  });
  console.log('  合计: ' + nonMedia.length + ' 个');
  console.log('');

  // 列出文件
  if (nonMedia.length <= 50) {
    nonMedia.forEach(obj => console.log('  ' + obj.Key));
  } else {
    nonMedia.slice(0, 30).forEach(obj => console.log('  ' + obj.Key));
    console.log('  ... 还有 ' + (nonMedia.length - 30) + ' 个文件 ...');
  }

  if (!DELETE) {
    console.log('');
    console.log('以上文件将被删除。确认后加 --delete 参数执行：');
    console.log('  node scripts/clean-cos-non-media.js --delete');
    return;
  }

  // 批量删除（COS 每次最多删 1000 个）
  console.log('');
  console.log('正在删除...');
  const keys = nonMedia.map(obj => obj.Key);
  let deleted = 0;
  for (let i = 0; i < keys.length; i += 1000) {
    const batch = keys.slice(i, i + 1000);
    await deleteObjects(batch);
    deleted += batch.length;
    console.log('已删除 ' + deleted + '/' + keys.length);
  }
  console.log('');
  console.log('完成！共删除 ' + deleted + ' 个非媒体文件。');
}

main().catch(err => {
  console.error('出错：', err);
  process.exit(1);
});
