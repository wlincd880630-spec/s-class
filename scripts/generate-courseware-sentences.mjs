/**
 * 为课件缺例句的单词调用 DeepSeek 生成例句并写回 data.js
 *
 * 用法:
 *   node scripts/generate-courseware-sentences.mjs audit
 *   node scripts/generate-courseware-sentences.mjs generate --grade 3GA
 *   node scripts/generate-courseware-sentences.mjs generate --all
 *   node scripts/generate-courseware-sentences.mjs generate --all --dry
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STB = path.join(ROOT, 'Primary', 'School_textbook', 'Courseware');
const PROGRESS = path.join(STB, '.sentence_generate_progress.json');

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || 'sk-daa16008e81843deba6fefe9dce51465';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const BATCH_SIZE = 8;
const GRADES = ['3GA', '3GB', '4GA', '4GB', '5GA', '5GB', '6GA'];
const COS_SENT = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware/assets/images/sentences/';

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

function loadDataJs(grade) {
  const p = path.join(STB, grade, 'assets', 'data', 'data.js');
  const code = fs.readFileSync(p, 'utf8');
  const data = Function(code + '; return TEXTBOOK_DATA;')();
  return { path: p, data, raw: code };
}

function sentenceImage(word, source) {
  return `${COS_SENT}${safeSlug(word)}-${source}.jpg`;
}

function buildSentences(word, items) {
  const bySource = {};
  for (const it of items) bySource[it.source] = it;
  const out = [];
  for (const source of ['textbook', 'context']) {
    const it = bySource[source];
    if (!it) continue;
    out.push({
      en: it.en.trim(),
      zh: it.zh.trim(),
      source,
      image: sentenceImage(word, source),
    });
  }
  return out.length >= 2 ? out : null;
}

function collectEmpty(grades) {
  const list = [];
  for (const grade of grades) {
    const { data } = loadDataJs(grade);
    const book = data.book || {};
    for (const unit of data.units) {
      for (const w of unit.words) {
        if (!w.sentences?.length) {
          list.push({
            grade,
            unit: unit.name,
            id: w.id,
            word: w.word,
            chinese: w.chinese,
            gradeNum: book.grade,
            bookName: book.name,
          });
        }
      }
    }
  }
  return list;
}

function serializeSentences(sentences, indent = '          ') {
  const lines = sentences.map(s =>
    `${indent}  {\n${indent}    "en": ${JSON.stringify(s.en)},\n${indent}    "zh": ${JSON.stringify(s.zh)},\n${indent}    "source": ${JSON.stringify(s.source)},\n${indent}    "image": ${JSON.stringify(s.image)}\n${indent}  }`
  );
  return `${indent}"sentences": [\n${lines.join(',\n')}\n${indent}]`;
}

function patchWordSentences(raw, word, sentences, wordId = null) {
  const wordLit = JSON.stringify(word).slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let re;
  if (wordId) {
    re = new RegExp(
      `("word":\\s*"${wordLit}"[\\s\\S]*?"id":\\s*"${wordId}"[\\s\\S]*?)"sentences":\\s*\\[[\\s\\S]*?\\]|("word":\\s*"${wordLit}"[\\s\\S]*?)"sentences":\\s*\\[\\s*\\]([\\s\\S]*?"id":\\s*"${wordId}")`,
      'm'
    );
  }
  // 匹配该 word 后第一个 sentences 块（空或非空）
  re = new RegExp(
    `("word":\\s*"${wordLit}"[\\s\\S]*?)"sentences":\\s*\\[[\\s\\S]*?\\]`,
    'm'
  );
  const block = serializeSentences(sentences).trim();
  const m = raw.match(re);
  if (!m) return { raw, ok: false };
  const next = raw.replace(re, `$1${block}`);
  return { raw: next, ok: next !== raw };
}

function patchWordSentencesById(raw, wordId, sentences) {
  const idIdx = raw.indexOf(`"id": ${JSON.stringify(wordId)}`);
  if (idIdx < 0) return { raw, ok: false };
  const chunk = raw.slice(Math.max(0, idIdx - 4000), idIdx + 200);
  const wordMatch = chunk.match(/"word":\s*"([^"]+)"/g);
  if (!wordMatch?.length) return { raw, ok: false };
  const wordLine = wordMatch[wordMatch.length - 1];
  const word = wordLine.match(/"word":\s*"([^"]+)"/)[1];
  const start = raw.lastIndexOf(wordLine, idIdx);
  const seg = raw.slice(start, idIdx + 500);
  const re = /"sentences":\s*\[[\s\S]*?\]/;
  if (!re.test(seg)) return { raw, ok: false };
  const block = serializeSentences(sentences).trim();
  const newSeg = seg.replace(re, block);
  return { raw: raw.slice(0, start) + newSeg + raw.slice(idIdx + 500), ok: true };
}

function patchEmptySentences(raw, word, wordId, sentences) {
  if (wordId) {
    const r = patchWordSentencesById(raw, wordId, sentences);
    if (r.ok) return r;
  }
  const wordLit = JSON.stringify(word).slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `("word":\\s*"${wordLit}"[\\s\\S]*?)"sentences":\\s*\\[\\s*\\]`,
    'm'
  );
  const block = serializeSentences(sentences).trim();
  if (!re.test(raw)) return { raw, ok: false };
  return { raw: raw.replace(re, `$1${block}`), ok: true };
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS)) return { done: {} };
  return JSON.parse(fs.readFileSync(PROGRESS, 'utf8'));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 2), 'utf8');
}

function gradeLevel(item) {
  const g = item.gradeNum || parseInt(item.grade, 10) || 3;
  if (g <= 3) return '小学三年级，句子极短（4–8 词），词汇简单';
  if (g <= 4) return '小学四年级，句子简短（5–10 词）';
  if (g <= 5) return '小学五年级，句子适中（6–12 词）';
  return '小学六年级，句子稍长（8–14 词）';
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
        { role: 'system', content: '你是小学英语教材编写专家。只输出合法 JSON，不要 markdown。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.choices[0].message.content;
}

function audit(grades) {
  const empty = collectEmpty(grades);
  const byGrade = {};
  for (const it of empty) {
    byGrade[it.grade] = (byGrade[it.grade] || 0) + 1;
    console.log(`[${it.grade}] ${it.word} (${it.chinese})`);
  }
  console.log(`\n共 ${empty.length} 个单词缺例句`);
  for (const [g, n] of Object.entries(byGrade)) console.log(`  ${g}: ${n}`);
  return empty.length;
}

async function generate(grades, { dry = false, force = false } = {}) {
  const progress = loadProgress();
  let all = collectEmpty(grades);
  if (!force) {
    all = all.filter(it => {
      const key = `${it.grade}|${it.id || it.word}`;
      return !(progress.done[it.grade] || []).includes(key);
    });
  }

  console.log(`待生成: ${all.length} 个单词`);
  if (!all.length) return 0;

  const rawByGrade = {};
  for (const g of grades) rawByGrade[g] = loadDataJs(g).raw;

  let fixed = 0;
  for (let i = 0; i < all.length; i += BATCH_SIZE) {
    const batch = all.slice(i, i + BATCH_SIZE);
    const level = gradeLevel(batch[0]);
    const lines = batch.map(w =>
      `- key: ${JSON.stringify(w.word)}\n  释义: ${w.chinese}\n  单元: ${w.unit}`
    );
    const prompt = `请为下列小学英语单词各写 **2 条例句**（JSON），适合${level}。

要求：
1. 每词恰好 2 句：source 分别为 "textbook"（贴近课文、规范）和 "context"（生活情景、自然）
2. 英文句子必须包含该单词（大小写可变；短语需完整出现）
3. 中文翻译准确、适合小学生
4. 句子有意义、积极健康，符合中国小学生认知
5. 不要编号、不要解释

输出 JSON 对象：key=单词原文（与下列完全一致），value=[{"en":"...","zh":"...","source":"textbook"},{"en":"...","zh":"...","source":"context"}]

${lines.join('\n')}`;

    let parsed = {};
    try {
      const content = await callDeepseek(prompt);
      parsed = JSON.parse(content.replace(/^```json\s*|\s*```$/g, '').trim());
    } catch (e) {
      console.error(`批次 ${i / BATCH_SIZE + 1} 失败:`, e.message);
      continue;
    }

    for (const w of batch) {
      const items = parsed[w.word];
      if (!items?.length) {
        console.warn(`  SKIP ${w.grade} ${w.word}: 无返回`);
        continue;
      }
      const sentences = buildSentences(w.word, items);
      if (!sentences) {
        console.warn(`  SKIP ${w.grade} ${w.word}: 格式不全`);
        continue;
      }
      const en0 = sentences[0].en.toLowerCase();
      const target = w.word.toLowerCase().replace(/['\u2019]/g, "'");
      if (!en0.includes(target.split(' ')[0]) && !sentences.some(s => s.en.toLowerCase().includes(target.split(' ')[0]))) {
        console.warn(`  WARN ${w.word}: 例句可能未包含目标词`);
      }
      console.log(`  OK  ${w.grade} ${w.word}`);
      sentences.forEach(s => console.log(`      [${s.source}] ${s.en}`));
      fixed++;
      if (!dry) {
        const r = patchEmptySentences(rawByGrade[w.grade], w.word, w.id, sentences);
        if (!r.ok) console.warn(`    写回失败: ${w.word}`);
        else rawByGrade[w.grade] = r.raw;
        const key = `${w.id || w.word}`;
        if (!progress.done[w.grade]) progress.done[w.grade] = [];
        if (!progress.done[w.grade].includes(key)) progress.done[w.grade].push(key);
      }
    }

    if (!dry) {
      for (const g of [...new Set(batch.map(b => b.grade))]) {
        const p = path.join(STB, g, 'assets', 'data', 'data.js');
        fs.writeFileSync(p, rawByGrade[g], 'utf8');
      }
      saveProgress(progress);
    }
    await new Promise(r => setTimeout(r, 800));
  }

  console.log(`\n完成: ${fixed} 个单词${dry ? '（预览）' : ''}`);
  return fixed;
}

const args = process.argv.slice(2);
const cmd = args[0] || 'audit';
const gradeIdx = args.indexOf('--grade');
const grade = gradeIdx >= 0 ? args[gradeIdx + 1] : null;
const grades = grade ? [grade] : (args.includes('--all') ? GRADES : GRADES);
const dry = args.includes('--dry');
const force = args.includes('--force');

if (cmd === 'audit') audit(grades);
else if (cmd === 'generate') generate(grades, { dry, force }).catch(e => { console.error(e); process.exit(1); });
else console.log('用法: audit | generate [--grade 3GA] [--all] [--dry] [--force]');
