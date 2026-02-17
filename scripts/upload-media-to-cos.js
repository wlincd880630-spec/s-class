/**
 * 自动扫描项目中的媒体文件并上传到腾讯云 COS（增量上传）。
 *
 * 用法：
 *   node scripts/upload-media-to-cos.js          上传所有新增/更新的媒体
 *   node scripts/upload-media-to-cos.js --dry     只列出将要上传的文件，不实际上传
 *   node scripts/upload-media-to-cos.js --all     强制上传所有媒体（跳过增量判断）
 */

const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('找不到 .cos-config.json，请先配置 SecretId / SecretKey。');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

if (!config.SecretId || !config.SecretKey || config.SecretId.includes('填') || config.SecretKey.includes('填')) {
  console.error('.cos-config.json 中的 SecretId / SecretKey 还没有填写，请先配置。');
  process.exit(1);
}

const DRY = process.argv.includes('--dry');
const FORCE_ALL = process.argv.includes('--all');

const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

const MEDIA_EXT = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico',
  '.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv', '.wmv',
  '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'
]);

const IGNORE_DIRS = new Set(['.git', 'node_modules', 'scripts']);

function toForwardSlash(p) { return p.replace(/\\/g, '/'); }

function walkMedia(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      if (!IGNORE_DIRS.has(e.name)) walkMedia(path.join(dir, e.name), list);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (MEDIA_EXT.has(ext)) list.push(path.join(dir, e.name));
    }
  }
  return list;
}

function listAllCosObjects() {
  return new Promise((resolve, reject) => {
    const allObjects = {};
    let marker = '';

    function fetchPage() {
      cos.getBucket({
        Bucket, Region,
        Prefix: cosPrefix,
        MaxKeys: 1000,
        Marker: marker
      }, (err, data) => {
        if (err) return reject(err);
        if (data.Contents) {
          for (const obj of data.Contents) {
            allObjects[obj.Key] = parseInt(obj.Size, 10);
          }
        }
        if (data.IsTruncated === 'true' && data.NextMarker) {
          marker = data.NextMarker;
          fetchPage();
        } else {
          resolve(allObjects);
        }
      });
    }
    fetchPage();
  });
}

function putObject(key, filePath) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket, Region, Key: key,
      Body: fs.createReadStream(filePath),
      ContentLength: fs.statSync(filePath).size,
    }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

async function main() {
  const mediaFiles = walkMedia(ROOT);
  console.log('扫描到 ' + mediaFiles.length + ' 个本地媒体文件。');

  if (mediaFiles.length === 0) {
    console.log('没有媒体文件需要上传。');
    return;
  }

  let cosObjects = {};
  if (!FORCE_ALL) {
    console.log('正在获取 COS 已有文件列表...');
    cosObjects = await listAllCosObjects();
    console.log('COS 上已有 ' + Object.keys(cosObjects).length + ' 个文件。');
  }

  const toUpload = [];
  for (const localPath of mediaFiles) {
    const rel = toForwardSlash(path.relative(ROOT, localPath));
    const cosKey = cosPrefix + rel;
    if (FORCE_ALL) {
      toUpload.push({ localPath, rel, cosKey });
    } else {
      const localSize = fs.statSync(localPath).size;
      const remoteSize = cosObjects[cosKey];
      if (remoteSize === undefined || remoteSize !== localSize) {
        toUpload.push({ localPath, rel, cosKey });
      }
    }
  }

  if (toUpload.length === 0) {
    console.log('所有媒体文件已与 COS 同步，无需上传。');
    return;
  }

  console.log('需要上传 ' + toUpload.length + ' 个文件。');

  if (DRY) {
    for (const f of toUpload) {
      console.log('[dry] 将上传: ' + f.rel + ' -> ' + f.cosKey);
    }
    console.log('[dry] 共 ' + toUpload.length + ' 个文件。去掉 --dry 执行即可上传。');
    return;
  }

  let uploaded = 0;
  let failed = 0;
  for (const f of toUpload) {
    try {
      await putObject(f.cosKey, f.localPath);
      console.log('已上传: ' + f.rel);
      uploaded++;
    } catch (err) {
      console.error('上传失败: ' + f.rel + ' - ' + err.message);
      failed++;
    }
  }

  console.log('');
  console.log('完成！上传 ' + uploaded + '，失败 ' + failed + '。');
  if (failed > 0) process.exit(1);
}

main().catch(err => {
  console.error('脚本出错：', err);
  process.exit(1);
});
