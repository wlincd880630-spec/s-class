#!/usr/bin/env node
/**
 * 五上（5GA）例句配图：生成提示词清单、整理本地图片、上传 COS、回写 data.js
 *
 * 用法:
 *   node scripts/generate-5ga-sentence-images.mjs audit
 *   node scripts/generate-5ga-sentence-images.mjs prompts          # DeepSeek 批量生成配图 prompt
 *   node scripts/generate-5ga-sentence-images.mjs import <dir>    # 将生成图导入 sentences 目录
 *   node scripts/generate-5ga-sentence-images.mjs upload
 *   node scripts/generate-5ga-sentence-images.mjs patch
 *   node scripts/generate-5ga-sentence-images.mjs finish           # upload + patch + upload data.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import COS from 'cos-nodejs-sdk-v5';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GRADE = '5GA';
const STB = path.join(ROOT, 'Primary', 'School_textbook', 'Courseware');
const DATA_JS = path.join(STB, GRADE, 'assets', 'data', 'data.js');
const SENTENCE_IMG_DIR = path.join(STB, 'assets', 'images', 'sentences');
const MANIFEST = path.join(STB, GRADE, '.sentence-image-manifest.json');
const PROGRESS = path.join(STB, GRADE, '.sentence-image-progress.json');
const COS_HOST = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/';
const STYLE_PREFIX =
  'Modern premium educational illustration for Chinese primary school English textbook, warm natural lighting, soft cinematic depth of field, clean composition, vibrant but gentle colors, child-friendly positive mood, highly detailed, photorealistic digital art style matching high-end textbook visuals. Single clear scene that visually expresses the sentence meaning. No text, no letters, no words, no captions, no watermarks, no logos. ';

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || 'sk-daa16008e81843deba6fefe9dce51465';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

function safeSlug(word) {
  return word
    .replace(/\(.*?\)/g, '')
    .replace(/[<>:"/\\|?*.（）]/g, '')
    .replace(/ /g, '_')
    .replace(/['\u2018\u2019`´]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase()
    .slice(0, 50) || 'word';
}

function loadData() {
  const code = fs.readFileSync(DATA_JS, 'utf8');
  return { code, data: Function(code + '; return TEXTBOOK_DATA;')() };
}

function collectSentences() {
  const { data } = loadData();
  const items = [];
  for (const unit of data.units) {
    for (const w of unit.words) {
      for (const s of w.sentences || []) {
        const seed = (s.image?.match(/seed\/([^/]+)/) || [])[1] || `${safeSlug(w.word)}-${s.source}`;
        items.push({
          seed,
          word: w.word,
          chinese: w.chinese,
          unit: unit.name,
          source: s.source,
          en: s.en,
          zh: s.zh,
          image: s.image || '',
        });
      }
    }
  }
  return items;
}

function sentenceCosUrl(seed) {
  const rel = `Primary/School_textbook/Courseware/assets/images/sentences/${seed}.jpg`;
  return COS_HOST + rel.split('/').map((p) => encodeURIComponent(p)).join('/');
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST)) return { items: [], generatedAt: null };
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

function saveManifest(m) {
  fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 2), 'utf8');
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS)) return { done: [], failed: [] };
  return JSON.parse(fs.readFileSync(PROGRESS, 'utf8'));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 2), 'utf8');
}

function getCosConfig() {
  const configPath = path.join(ROOT, '.cos-config.json');
  if (fs.existsSync(configPath)) {
    const c = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (c.SecretId && c.SecretKey && !String(c.SecretId).includes('填')) return c;
  }
  const sid = process.env.COS_SECRET_ID || process.env.TENCENT_SECRET_ID;
  const sk = process.env.COS_SECRET_KEY || process.env.TENCENT_SECRET_KEY;
  if (sid && sk) {
    return {
      SecretId: sid,
      SecretKey: sk,
      Bucket: process.env.COS_BUCKET || 's-class-1403296481',
      Region: process.env.COS_REGION || 'ap-chengdu',
      CosPrefix: process.env.COS_PREFIX || 's-class/',
    };
  }
  return null;
}

function audit() {
  const items = collectSentences();
  const manifest = loadManifest();
  const bySeed = new Map((manifest.items || []).map((i) => [i.seed, i]));
  let hasPrompt = 0;
  let hasLocal = 0;
  let hasCos = 0;
  let picsum = 0;
  for (const it of items) {
    if (it.image.includes('picsum')) picsum++;
    if (it.image.includes('cos.ap-chengdu')) hasCos++;
    const m = bySeed.get(it.seed);
    if (m?.prompt) hasPrompt++;
    const local = path.join(SENTENCE_IMG_DIR, `${it.seed}.jpg`);
    if (fs.existsSync(local) && fs.statSync(local).size > 2000) hasLocal++;
  }
  console.log(`5GA 例句: ${items.length}`);
  console.log(`  picsum 占位: ${picsum}`);
  console.log(`  已有 COS URL: ${hasCos}`);
  console.log(`  已有 prompt: ${hasPrompt}`);
  console.log(`  已有本地图: ${hasLocal}`);
  return items.length;
}

async function callDeepseek(prompt) {
  const res = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            '你是小学英语教材配图专家。为英文例句写 Imagen/DALL-E 风格英文场景描述。只输出合法 JSON，不要 markdown。',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}`);
  const json = await res.json();
  return json.choices[0].message.content;
}

async function generatePrompts() {
  const items = collectSentences();
  const manifest = loadManifest();
  const existing = new Map((manifest.items || []).map((i) => [i.seed, i]));
  const pending = items.filter((it) => !existing.get(it.seed)?.prompt);
  console.log(`待生成 prompt: ${pending.length}/${items.length}`);
  if (!pending.length) return;

  const BATCH = 10;
  for (let i = 0; i < pending.length; i += BATCH) {
    const batch = pending.slice(i, i + BATCH);
    const lines = batch.map(
      (it) =>
        `- seed: ${JSON.stringify(it.seed)}\n  word: ${it.word} (${it.chinese})\n  sentence: ${it.en}\n  meaning: ${it.zh}`
    );
    const userPrompt = `为下列小学英语例句各写 1 条英文图像生成 prompt（JSON 对象，key=seed 值，value=prompt 字符串）。

要求：
1. 画面必须一眼看懂例句含义（达意），场景具体、现代、精美
2. 人物可为亚洲/多元儿童或青少年，积极健康
3. prompt 用英文，80-160 词，描述一个完整场景
4. 末尾强调：No text, no letters, no words, no captions
5. 不要复述例句原文当画面文字

${lines.join('\n\n')}`;

    try {
      const content = await callDeepseek(userPrompt);
      const parsed = JSON.parse(content.replace(/^```json\s*|\s*```$/g, '').trim());
      for (const it of batch) {
        const p = parsed[it.seed];
        if (!p) {
          console.warn('  SKIP prompt:', it.seed);
          continue;
        }
        existing.set(it.seed, {
          ...it,
          prompt: STYLE_PREFIX + String(p).trim(),
        });
        console.log('  OK prompt:', it.seed);
      }
    } catch (e) {
      console.error(`批次 ${i / BATCH + 1} 失败:`, e.message);
    }
    await new Promise((r) => setTimeout(r, 600));
  }

  manifest.items = items.map((it) => existing.get(it.seed) || { ...it, prompt: existing.get(it.seed)?.prompt || null });
  manifest.generatedAt = new Date().toISOString();
  saveManifest(manifest);
  console.log('manifest 已保存:', MANIFEST);
}

function importImages(srcDir) {
  if (!srcDir || !fs.existsSync(srcDir)) {
    console.error('请提供有效目录: import <dir>');
    process.exit(1);
  }
  fs.mkdirSync(SENTENCE_IMG_DIR, { recursive: true });
  const progress = loadProgress();
  let ok = 0;
  for (const name of fs.readdirSync(srcDir)) {
    const lower = name.toLowerCase();
    if (!/\.(png|jpg|jpeg|webp)$/.test(lower)) continue;
    const seed = name.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    const src = path.join(srcDir, name);
    const dest = path.join(SENTENCE_IMG_DIR, `${seed}.jpg`);
    fs.copyFileSync(src, dest);
    if (!progress.done.includes(seed)) progress.done.push(seed);
    ok++;
    console.log('import:', seed);
  }
  saveProgress(progress);
  console.log(`导入 ${ok} 张到 ${SENTENCE_IMG_DIR}`);
}

async function uploadImages() {
  const config = getCosConfig();
  if (!config) {
    console.error('缺少 .cos-config.json 或 COS_SECRET_ID/COS_SECRET_KEY 环境变量');
    process.exit(1);
  }
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey, Timeout: 600000 });
  const prefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';
  const cosRoot = `${prefix}Primary/School_textbook/Courseware/assets/images/sentences/`;
  if (!fs.existsSync(SENTENCE_IMG_DIR)) {
    console.error('无本地例句图目录');
    process.exit(1);
  }
  const files = fs.readdirSync(SENTENCE_IMG_DIR).filter((f) => f.endsWith('.jpg'));
  let ok = 0;
  let fail = 0;
  for (const name of files) {
    const local = path.join(SENTENCE_IMG_DIR, name);
    const Key = cosRoot + name;
    try {
      await new Promise((res, rej) => {
        cos.putObject(
          {
            Bucket: config.Bucket,
            Region: config.Region,
            Key,
            Body: fs.readFileSync(local),
            ContentLength: fs.statSync(local).size,
            ContentType: 'image/jpeg',
          },
          (e) => (e ? rej(e) : res())
        );
      });
      ok++;
      if (ok % 50 === 0) console.log(`  uploaded ${ok}/${files.length}`);
    } catch (e) {
      fail++;
      console.error('  fail', name, e.message);
    }
  }
  console.log(`COS upload: ${ok} ok, ${fail} fail`);
}

function patchDataJs() {
  let content = fs.readFileSync(DATA_JS, 'utf8');
  const items = collectSentences();
  let n = 0;
  for (const it of items) {
    const cos = sentenceCosUrl(it.seed);
    const escaped = it.seed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(https://picsum\\.photos/seed/${escaped}/\\d+/\\d+)`, 'g');
    const next = content.replace(re, cos);
    if (next !== content) {
      content = next;
      n++;
    }
  }
  fs.writeFileSync(DATA_JS, content, 'utf8');
  console.log(`data.js 已替换 ${n} 处 picsum → COS`);
}

async function uploadDataJs() {
  const config = getCosConfig();
  if (!config) return;
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
  const prefix = (config.CosPrefix || 's-class/').replace(/\/+$/, '') + '/';
  const Key = `${prefix}Primary/School_textbook/Courseware/${GRADE}/assets/data/data.js`;
  await new Promise((res, rej) => {
    cos.putObject(
      {
        Bucket: config.Bucket,
        Region: config.Region,
        Key,
        Body: fs.readFileSync(DATA_JS),
        ContentLength: fs.statSync(DATA_JS).size,
        ContentType: 'application/javascript; charset=utf-8',
      },
      (e) => (e ? rej(e) : res())
    );
  });
  console.log('已上传 data.js 到 COS');
}

const [,, cmd, arg] = process.argv;

if (cmd === 'audit') audit();
else if (cmd === 'prompts') generatePrompts().catch((e) => { console.error(e); process.exit(1); });
else if (cmd === 'import') importImages(arg);
else if (cmd === 'upload') uploadImages().catch((e) => { console.error(e); process.exit(1); });
else if (cmd === 'patch') patchDataJs();
else if (cmd === 'finish') {
  uploadImages()
    .then(() => { patchDataJs(); return uploadDataJs(); })
    .catch((e) => { console.error(e); process.exit(1); });
} else {
  console.log('命令: audit | prompts | import <dir> | upload | patch | finish');
}
