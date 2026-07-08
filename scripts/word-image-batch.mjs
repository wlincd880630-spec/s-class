/**
 * 单词配图分批：上传 COS + 更新 data.js
 * 用法: node scripts/word-image-batch.mjs patch 5GA Unit1
 *       node scripts/word-image-batch.mjs upload 5GA Unit1
 *       node scripts/word-image-batch.mjs status
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import COS from 'cos-nodejs-sdk-v5';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STB = path.join(ROOT, 'Primary', 'School_textbook');
const PROGRESS = path.join(STB, 'Courseware', '.image_batch_progress.json');
const CONFIG_PATH = path.join(ROOT, '.cos-config.json');
const COS_BASE = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware';

function safeFilename(word) {
  let name = word.replace(/\(.*?\)/g, '');
  name = name.replace(/[<>:"/\\|?*.]/g, '');
  name = name.replace(/ /g, '_').replace(/\//g, '-');
  name = name.replace(/['\u2018\u2019`´]/g, '');
  name = name.replace(/_+/g, '_').replace(/^_|_$/g, '');
  return (name || 'word').slice(0, 60);
}

function unitFolder(uk) {
  return uk.replace(/ /g, '');
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS)) {
    return { completed: [], pending: [] };
  }
  return JSON.parse(fs.readFileSync(PROGRESS, 'utf8'));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 2), 'utf8');
}

function imagePath(grade, unit, word) {
  const uf = unitFolder(unit);
  const slug = safeFilename(word);
  const fname = `${slug}_风格A.png`;
  const rel = `Primary/School_textbook/Courseware/${grade}/assets/images/words/${uf}/${slug}/${fname}`;
  return { rel, local: path.join(ROOT, rel), slug, fname, uf };
}

function cosUrl(grade, unit, word) {
  const { uf, slug, fname } = imagePath(grade, unit, word);
  const encoded = encodeURIComponent(fname).replace(/%20/g, '%20');
  return `${COS_BASE}/${grade}/assets/images/words/${uf}/${slug}/${encoded}`;
}

function patchDataJs(grade, unit, words) {
  const dataPath = path.join(STB, 'Courseware', grade, 'assets', 'data', 'data.js');
  let content = fs.readFileSync(dataPath, 'utf8');
  const uf = unitFolder(unit);
  let count = 0;
  for (const word of words) {
    const url = cosUrl(grade, unit, word);
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(
      `("word":\\s*"${escaped}"[\\s\\S]*?"image":\\s*")[^"]+(")`,
      'm'
    );
    const next = content.replace(re, `$1${url}$2`);
    if (next !== content) {
      content = next;
      count++;
    }
  }
  fs.writeFileSync(dataPath, content, 'utf8');
  console.log(`已更新 ${grade} ${unit} 共 ${count} 个单词主图链接`);
  return count;
}

async function uploadUnit(grade, unit, words) {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
  const cosPrefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';
  let ok = 0, fail = 0;
  for (const word of words) {
    const { rel, local } = imagePath(grade, unit, word);
    if (!fs.existsSync(local)) {
      console.error('缺少文件:', rel);
      fail++;
      continue;
    }
    const key = cosPrefix + rel.replace(/\\/g, '/');
    await new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        Body: fs.createReadStream(local),
      }, (err) => (err ? reject(err) : resolve()));
    }).then(() => { console.log('上传 OK:', rel); ok++; })
      .catch(e => { console.error('上传失败:', rel, e.message); fail++; });
  }
  console.log(`上传完成: ${ok} 成功, ${fail} 失败`);
  return fail === 0;
}

function markDone(grade, unit, words) {
  const p = loadProgress();
  const key = `${grade}|${unit}`;
  if (!p.completed.includes(key)) p.completed.push(key);
  p.last = { grade, unit, words: words.length, at: new Date().toISOString() };
  saveProgress(p);
}

const [,, cmd, grade, unit, ...rest] = process.argv;

if (cmd === 'status') {
  console.log(JSON.stringify(loadProgress(), null, 2));
} else if (cmd === 'path') {
  const word = rest.join(' ');
  console.log(imagePath(grade, unit, word));
} else if (cmd === 'url') {
  const word = rest.join(' ');
  console.log(cosUrl(grade, unit, word));
} else if (cmd === 'patch') {
  const words = rest.length ? rest : JSON.parse(fs.readFileSync(0, 'utf8'));
  patchDataJs(grade, unit, words);
} else if (cmd === 'upload') {
  const words = rest.length ? rest : JSON.parse(fs.readFileSync(0, 'utf8'));
  uploadUnit(grade, unit, words).then(ok => {
    if (ok) markDone(grade, unit, words);
    process.exit(ok ? 0 : 1);
  });
} else if (cmd === 'finish') {
  const words = rest.length ? rest : JSON.parse(fs.readFileSync(0, 'utf8'));
  patchDataJs(grade, unit, words);
  uploadUnit(grade, unit, words).then(ok => {
    if (ok) markDone(grade, unit, words);
    process.exit(ok ? 0 : 1);
  });
} else {
  console.log('命令: status | path | url | patch | upload | finish');
}
