/**
 * 上传各册 Courseware data.js 到腾讯云 COS（线上课件立即生效）
 * 用法: node scripts/upload-courseware-data-js.mjs [3GA 3GB ...]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import COS from 'cos-nodejs-sdk-v5';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COURSEWARE = path.join(ROOT, 'Primary', 'School_textbook', 'Courseware');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');

const grades = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(COURSEWARE).filter(d => /^\d[A-Z]{2}$/.test(d));

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('缺少 .cos-config.json');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
const prefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';

for (const g of grades) {
  const local = path.join(COURSEWARE, g, 'assets/data/data.js');
  if (!fs.existsSync(local)) {
    console.warn('跳过', g, '无 data.js');
    continue;
  }
  const Key = `${prefix}Primary/School_textbook/Courseware/${g}/assets/data/data.js`;
  await new Promise((res, rej) => {
    cos.putObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key,
      Body: fs.readFileSync(local),
      ContentType: 'application/javascript; charset=utf-8',
    }, e => (e ? rej(e) : res()));
  });
  console.log('上传 OK:', g, Key);
}

console.log('完成，共', grades.length, '册');
