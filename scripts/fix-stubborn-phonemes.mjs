/**
 * 对顽固单词逐个调用 DeepSeek 修正音素
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STB = path.join(__dirname, '..', 'Primary', 'School_textbook', 'Courseware');
const KEY = process.env.DEEPSEEK_API_KEY || 'sk-daa16008e81843deba6fefe9dce51465';

const TASKS = [
  ['5GA', 'choose', '挑选，选择'],
  ['5GA', 'always', '总是，一直'],
  ['5GA', 'healthily', '健康地'],
  ['4GA', 'sometimes', '有时'],
  ['4GA', 'picnic', '野餐'],
  ['3GA', 'let\u2019s = let us', '让我们'],
  ['3GB', 'half past one / two...', '一点半/两点钟等'],
  ['5GB', 'Merry Christmas!', '圣诞快乐'],
  ['6GA', 'exhibition', '展览'],
];

const RULES = `你是小学英语自然拼读专家。英式RP。
规则：每个字素对应一个IPA；字素拼接必须还原单词原文拼写（含空格、标点）；magic-e 合并；短语按词或音节拆分。
只输出 JSON 数组：[{"letter":"字素","ipa":"/音标/"或"—"}]`;

function loadRaw(grade) {
  return fs.readFileSync(path.join(STB, grade, 'assets', 'data', 'data.js'), 'utf8');
}

function patch(raw, word, phonemes) {
  const wp = `"word": ${JSON.stringify(word)}`;
  const idx = raw.indexOf(wp);
  const phStart = raw.indexOf('"phonemes":', idx);
  const arrStart = raw.indexOf('[', phStart);
  let d = 0, end = -1;
  for (let i = arrStart; i < raw.length; i++) {
    if (raw[i] === '[') d++;
    else if (raw[i] === ']') { d--; if (!d) { end = i; break; } }
  }
  const indent = '          ';
  const body = phonemes.map(p =>
    `${indent}  {\n${indent}    "symbol": ${JSON.stringify(p.symbol)},\n${indent}    "letter": ${JSON.stringify(p.letter)}\n${indent}  }`
  ).join(',\n');
  const block = `${indent}"phonemes": [\n${body}\n${indent}]`;
  return raw.slice(0, phStart) + block + raw.slice(end + 1);
}

async function fixOne(grade, word, chinese) {
  const prompt = `${RULES}\n\n单词：${JSON.stringify(word)}\n释义：${chinese}\n请给出完整音素拆分。`;
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: '只输出 JSON 数组，无 markdown。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
    }),
  });
  const json = await res.json();
  const raw = json.choices[0].message.content.replace(/^```json\s*|\s*```$/g, '').trim();
  const items = JSON.parse(raw);
  const phonemes = items.map(p => ({
    symbol: p.ipa === '—' ? '—' : (p.ipa.startsWith('/') ? p.ipa : `/${p.ipa}/`),
    letter: p.letter,
  }));
  const joined = phonemes.map(p => p.letter).join('');
  console.log(`${grade} ${word}: ${joined} | ${phonemes.map(p => p.letter + '=' + p.symbol).join(' ')}`);
  return phonemes;
}

let total = 0;
for (const [grade, word, zh] of TASKS) {
  try {
    const phonemes = await fixOne(grade, word, zh);
    const p = path.join(STB, grade, 'assets', 'data', 'data.js');
    const raw = loadRaw(grade);
    fs.writeFileSync(p, patch(raw, word, phonemes), 'utf8');
    total++;
    await new Promise(r => setTimeout(r, 600));
  } catch (e) {
    console.error(`FAIL ${grade} ${word}:`, e.message);
  }
}
console.log(`\n完成 ${total}/${TASKS.length}`);
