/**
 * 上传顺序抽取相关页面到腾讯云 COS（发布到 s-class.top 前执行一次）
 * 用法：node scripts/upload-order-draw-to-cos.js
 */
const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('找不到 .cos-config.json，请复制 .cos-config.json.example 并填写密钥后重试。');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const Bucket = config.Bucket;
const Region = config.Region;
const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

const FILES = [
  'index.html',
  'temp-order-draw.html',
  'styles/s-class-home.css'
];

function upload(key, filePath) {
  return new Promise((resolve, reject) => {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === '.css' ? 'text/css; charset=utf-8' : 'text/html; charset=utf-8';
    cos.putObject({
      Bucket,
      Region,
      Key: key,
      Body: fs.readFileSync(filePath),
      ContentType: contentType
    }, (err, data) => (err ? reject(err) : resolve(data)));
  });
}

(async () => {
  console.log('上传顺序抽取页面到 COS…');
  for (const rel of FILES) {
    const local = path.join(ROOT, rel);
    const key = cosPrefix + rel.replace(/\\/g, '/');
    if (!fs.existsSync(local)) {
      console.error('缺少文件:', rel);
      process.exit(1);
    }
    await upload(key, local);
    console.log('✓', key);
  }
  console.log('\n完成！请访问:');
  console.log('  https://s-class.top/temp-order-draw.html');
  console.log('  或 https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/temp-order-draw.html');
})();
