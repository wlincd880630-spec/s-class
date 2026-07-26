#!/usr/bin/env node
/**
 * Use DeepSeek to enrich low-quality G9 vocab entries (examples/usage/collocations/etc).
 *
 * Usage:
 *   node scripts/enrich-g9-vocab-deepseek.mjs              # enrich all generic
 *   node scripts/enrich-g9-vocab-deepseek.mjs --unit 1
 *   node scripts/enrich-g9-vocab-deepseek.mjs --dry
 *   node scripts/enrich-g9-vocab-deepseek.mjs --limit 10
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const G9 = path.join(ROOT, 'junior_vocab', 'G9');
const CW = path.join(ROOT, 'junior_vocab', 'Courseware', 'G9');
const PROGRESS = path.join(ROOT, 'junior_vocab', 'G9', '.enrich_progress.json');

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || 'sk-daa16008e81843deba6fefe9dce51465';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
const BATCH_SIZE = 5;
const CONCURRENCY = 2;

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const UNIT_ONLY = (() => {
  const i = args.indexOf('--unit');
  return i >= 0 ? Number(args[i + 1]) : null;
})();
const LIMIT = (() => {
  const i = args.indexOf('--limit');
  return i >= 0 ? Number(args[i + 1]) : Infinity;
})();

function isGeneric(w) {
  const ex = (w.examples || [])[0]?.en || '';
  return /We learned the word|We learned "|Please use "|in today's English class|Can you make a sentence with/.test(ex)
    || w.collocations === w.word
    || /Classroom scene for|Illustration for "|与“.*”相关/.test(String(w.image_desc_cn || '') + String(w.image_prompts?.[0] || ''));
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS)) return { done: {} };
  try { return JSON.parse(fs.readFileSync(PROGRESS, 'utf8')); } catch { return { done: {} }; }
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 2));
}

function collectTargets() {
  const out = [];
  const progress = loadProgress();
  for (let u = 1; u <= 14; u++) {
    if (UNIT_ONLY && u !== UNIT_ONLY) continue;
    const jp = path.join(G9, `Unit${u}`, `Unit${u}.json`);
    if (!fs.existsSync(jp)) continue;
    const data = JSON.parse(fs.readFileSync(jp, 'utf8'));
    data.words.forEach((w, idx) => {
      const key = `${u}::${w.word}`;
      if (progress.done[key]) return;
      if (!isGeneric(w)) return;
      out.push({ unit: u, idx, word: w.word, meaning_cn: w.meaning_cn || '', usage: w.usage || '', ipa: w.ipa || '', key });
    });
  }
  return out.slice(0, LIMIT);
}

function extractJson(text) {
  if (!text) throw new Error('empty response');
  let s = text.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();
  const start = s.indexOf('[');
  const end = s.lastIndexOf(']');
  if (start >= 0 && end > start) s = s.slice(start, end + 1);
  return JSON.parse(s);
}

async function callDeepSeek(batch) {
  const prompt = `你是初中英语教材词汇内容主编。请为下列人教版九年级单词生成高质量教学字段。

严格要求：
1. 例句必须自然、地道，适合中国初三学生；禁止出现 “We learned the word…” / “make a sentence with…” 这类元语言例句。
2. 每词 2 条例句：第1条贴近课本场景（学校/生活），第2条稍有拓展但仍简单。
3. collocations 给 2–4 个真实搭配，逗号分隔。
4. preposition_combos 若无介词搭配，写 "N/A"；否则给常见介词搭配。
5. usage 写清词性与简要用法（中英均可，简洁）。
6. socratic_questions 1题，中文提问+中文 hint。
7. fill_blank：1个空，4选项，correct_index 指向正确项；句子必须能自然填入目标词/短语。
8. image_prompts：两句英文画面描述（具体可视，不要抽象）。
9. image_desc_en / image_desc_cn：对应画面简述。
10. 只返回 JSON 数组，不要 markdown，不要解释。

每项格式：
{
  "word": "...",
  "usage": "...",
  "collocations": "...",
  "preposition_combos": "...",
  "examples": [{"en":"...","cn":"..."},{"en":"...","cn":"..."}],
  "socratic_questions": [{"question":"...","answer_hint":"..."}],
  "fill_blank": {"sentences":["... ___ ..."],"options":["A","B","C","D"],"correct_index":0},
  "image_prompts": ["...","..."],
  "image_desc_en": "...",
  "image_desc_cn": "..."
}

待生成词条：
${JSON.stringify(batch.map(b => ({ word: b.word, meaning_cn: b.meaning_cn, usage: b.usage, ipa: b.ipa })), null, 2)}
`;

  const res = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a careful junior-high English lexicographer. Output valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 4096
    })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`DeepSeek ${res.status}: ${t.slice(0, 300)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';
  return extractJson(content);
}

function applyEnrichment(wordObj, enrich) {
  if (!enrich || typeof enrich !== 'object') return wordObj;
  const next = { ...wordObj };
  for (const k of ['usage', 'collocations', 'preposition_combos', 'image_desc_en', 'image_desc_cn']) {
    if (enrich[k]) next[k] = enrich[k];
  }
  if (Array.isArray(enrich.examples) && enrich.examples.length >= 2) {
    next.examples = enrich.examples.slice(0, 2).map((ex) => ({
      en: String(ex.en || '').trim(),
      cn: String(ex.cn || '').trim()
    }));
  }
  if (Array.isArray(enrich.socratic_questions) && enrich.socratic_questions.length) {
    next.socratic_questions = enrich.socratic_questions.slice(0, 1).map((q) => ({
      question: String(q.question || '').trim(),
      answer_hint: String(q.answer_hint || '').trim()
    }));
  }
  if (enrich.fill_blank?.sentences?.length && enrich.fill_blank?.options?.length) {
    next.fill_blank = {
      sentences: enrich.fill_blank.sentences.slice(0, 1).map(String),
      options: enrich.fill_blank.options.slice(0, 4).map(String),
      correct_index: Number(enrich.fill_blank.correct_index) || 0
    };
  }
  if (Array.isArray(enrich.image_prompts) && enrich.image_prompts.length >= 2) {
    next.image_prompts = enrich.image_prompts.slice(0, 2).map(String);
  }
  return next;
}

function syncUnitHtml(unitNum, unitData) {
  const htmlPath = path.join(G9, `Unit${unitNum}`, `Unit${unitNum}.html`);
  if (!fs.existsSync(htmlPath)) return;
  let html = fs.readFileSync(htmlPath, 'utf8');
  const marker = 'window.VOCAB_DATA=';
  const idx = html.indexOf(marker);
  if (idx < 0) return;
  let i = idx + marker.length;
  while (i < html.length && /\s/.test(html[i])) i++;
  if (html[i] !== '{') return;
  let depth = 0, inStr = false, esc = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === '"') { inStr = false; continue; }
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        let after = i + 1;
        while (after < html.length && /\s/.test(html[after])) after++;
        const hasSemi = html[after] === ';';
        const payload = { units: [{ unit: unitNum, source: unitData.source, words: unitData.words }] };
        html = html.slice(0, idx) + marker + JSON.stringify(payload) + (hasSemi ? ';' : '') + html.slice(hasSemi ? after + 1 : i + 1);
        fs.writeFileSync(htmlPath, html);
        return;
      }
    }
  }
}

function rebuildCourseware() {
  const TITLES = {
    1: ['How can we become good learners?', '我们怎样才能成为好的学习者？'],
    2: ['I think that mooncakes are delicious!', '我认为月饼很好吃！'],
    3: ['Could you please tell me where the restrooms are?', '你能告诉我洗手间在哪里吗？'],
    4: ['I used to be afraid of the dark.', '我过去害怕黑暗。'],
    5: ['What are the shirts made of?', '这些衬衫是用什么做的？'],
    6: ['When was it invented?', '它是什么时候发明的？'],
    7: ['Teenagers should be allowed to choose their own clothes.', '应该允许青少年选择自己的衣服。'],
    8: ['It must belong to Carla.', '它一定属于卡拉。'],
    9: ['I like music that I can dance to.', '我喜欢能跟着跳舞的音乐。'],
    10: ["You're supposed to shake hands.", '你应该握手。'],
    11: ['Sad movies make me cry.', '悲伤的电影让我哭。'],
    12: ['Life is full of the unexpected.', '生活充满意外。'],
    13: ["We're trying to save the earth!", '我们正在努力拯救地球！'],
    14: ['I remember meeting all of you in Grade 7.', '我记得在七年级遇见你们所有人。']
  };
  const COS = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/junior_vocab';
  function safeSlug(word) {
    let name = String(word || '').replace(/\(.*?\)/g, '');
    name = name.replace(/[<>:"/\\|?*.']/g, '');
    name = name.replace(/ /g, '_').replace(/['\u2018\u2019`´']/g, '');
    name = name.replace(/_+/g, '_').replace(/^_|_$/g, '');
    return (name || 'word').slice(0, 80);
  }
  function asList(v) {
    if (!v) return [];
    if (Array.isArray(v)) return v.map(String).filter(Boolean);
    return String(v).split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  }
  function resolveImage(unitNum, rel, word = '') {
    const unitDir = path.join(G9, `Unit${unitNum}`);
    if (rel && /^https?:\/\//i.test(rel)) return rel;
    const clean = rel ? String(rel).replace(/^\.?\/+/, '').replace(/^Unit\d+\//, '') : '';
    const candidates = [];
    if (clean) candidates.push(path.join(unitDir, clean));
    if (word) {
      const s = safeSlug(word);
      candidates.push(path.join(unitDir, 'images', `${s}_1.jpg`));
      candidates.push(path.join(unitDir, 'images', `${s}_1.png`));
    }
    for (const local of candidates) {
      if (local && fs.existsSync(local)) return `../../G9/Unit${unitNum}/images/${path.basename(local)}`;
    }
    if (!clean) return '';
    return `${COS}/G9/Unit${unitNum}/${clean}`;
  }

  const units = [];
  let wid = 1;
  for (let unit = 1; unit <= 14; unit++) {
    const raw = JSON.parse(fs.readFileSync(path.join(G9, `Unit${unit}`, `Unit${unit}.json`), 'utf8'));
    const titles = TITLES[unit];
    const words = (raw.words || []).map((w) => {
      const examples = Array.isArray(w.examples) ? w.examples : [];
      const sentences = examples.slice(0, 2).map((ex, i) => ({
        en: ex.en || '',
        zh: ex.cn || ex.zh || '',
        source: i === 0 ? 'textbook' : 'context',
        image: ''
      }));
      return {
        id: `w${wid++}`,
        word: w.word,
        chinese: w.meaning_cn || '',
        ipa: w.ipa || '',
        phonemes: [],
        image: resolveImage(unit, w.img1, w.word),
        image2: resolveImage(unit, w.img2, w.word),
        usage: w.usage || '',
        collocations: asList(w.collocations),
        preposition_combos: asList(w.preposition_combos),
        image_desc_cn: w.image_desc_cn || '',
        sentences
      };
    });
    units.push({ id: `unit${unit}`, name: `Unit ${unit} · ${titles[0]}`, title: titles[1], words });
  }
  const data = { book: { id: 'pep-g9', name: '人教版九年级全一册', grade: 9, semester: '全', folder: 'G9' }, units };
  const total = units.reduce((n, u) => n + u.words.length, 0);
  fs.writeFileSync(
    path.join(CW, 'assets/data/data.js'),
    `/**\n * 人教版九年级全一册 单词数据\n * 由 scripts/build-junior-wordpark.mjs 从 junior_vocab/G9 生成\n */\nconst TEXTBOOK_DATA = ${JSON.stringify(data, null, 2)};\n`
  );
  // counts
  const indexPath = path.join(CW, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  indexHtml = indexHtml.replace(/共 \d+ 个单元 · \d+ 个单词/, `共 14 个单元 · ${total} 个单词`);
  fs.writeFileSync(indexPath, indexHtml);
  const hub = path.join(ROOT, 'junior_vocab/Courseware/index.html');
  let hubHtml = fs.readFileSync(hub, 'utf8');
  hubHtml = hubHtml.replace(/(九年级<\/h3><p class="meta">)\d+ 单元 · \d+ 词/, `$114 单元 · ${total} 词`);
  fs.writeFileSync(hub, hubHtml);
  return total;
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

async function mapPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const cur = i++;
      results[cur] = await fn(items[cur], cur);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

async function main() {
  const targets = collectTargets();
  console.log(`targets=${targets.length} model=${MODEL} dry=${DRY}`);
  if (!targets.length) {
    console.log('nothing to enrich');
    if (!DRY) console.log('courseware total', rebuildCourseware());
    return;
  }

  const batches = chunk(targets, BATCH_SIZE);
  const progress = loadProgress();
  const unitDirty = new Set();

  await mapPool(batches, CONCURRENCY, async (batch, bi) => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`batch ${bi + 1}/${batches.length} attempt ${attempt}: ${batch.map((b) => b.word).join(' | ')}`);
        const enriched = await callDeepSeek(batch);
        const byWord = new Map();
        for (const e of enriched) {
          if (e?.word) byWord.set(String(e.word).toLowerCase(), e);
        }
        // group by unit for write
        const byUnit = new Map();
        for (const item of batch) byUnit.set(item.unit, true);
        for (const unit of byUnit.keys()) {
          const jp = path.join(G9, `Unit${unit}`, `Unit${unit}.json`);
          const data = JSON.parse(fs.readFileSync(jp, 'utf8'));
          let changed = 0;
          for (const item of batch.filter((b) => b.unit === unit)) {
            const enrich = byWord.get(item.word.toLowerCase());
            if (!enrich) {
              console.warn(`  missing enrich for ${item.word}`);
              continue;
            }
            // quality gate
            const ex0 = enrich.examples?.[0]?.en || '';
            if (/We learned the word|make a sentence with/i.test(ex0)) {
              console.warn(`  low-quality returned for ${item.word}, skip`);
              continue;
            }
            if (!DRY) {
              data.words[item.idx] = applyEnrichment(data.words[item.idx], enrich);
              progress.done[item.key] = true;
              changed++;
            } else {
              console.log('  dry sample', item.word, '=>', enrich.examples?.[0]?.en);
              progress.done[item.key] = true;
            }
          }
          if (!DRY && changed) {
            fs.writeFileSync(jp, JSON.stringify(data, null, 2) + '\n');
            syncUnitHtml(unit, data);
            unitDirty.add(unit);
          }
        }
        saveProgress(progress);
        break;
      } catch (err) {
        console.error(`  batch ${bi + 1} failed:`, err.message);
        if (attempt === 3) throw err;
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  });

  if (!DRY) {
    const total = rebuildCourseware();
    console.log('enriched units', [...unitDirty].sort((a, b) => a - b).join(','));
    console.log('courseware total words', total);
  }
  const left = collectTargets().length;
  console.log('remaining generic', left);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
