/**
 * 校验并修正 courseware data.js 中的自然拼读音素映射（DeepSeek API）
 *
 * 用法:
 *   node scripts/verify-phonemes-deepseek.mjs audit              # 仅本地审计
 *   node scripts/verify-phonemes-deepseek.mjs fix --grade 5GA    # 修正指定册
 *   node scripts/verify-phonemes-deepseek.mjs fix --all          # 修正全部
 *   node scripts/verify-phonemes-deepseek.mjs fix --grade 5GA --dry  # 预览不写回
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STB = path.join(ROOT, 'Primary', 'School_textbook', 'Courseware');
const PROGRESS = path.join(STB, '.phoneme_verify_progress.json');

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || 'sk-daa16008e81843deba6fefe9dce51465';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const BATCH_SIZE = 10;

const GRADES = ['3GA', '3GB', '4GA', '4GB', '5GA', '5GB', '6GA'];

const RULES = `
## 自然拼读音素拆分规则（必须严格遵守）

1. 每个字素(grapheme)对应一个 IPA 音素，写在 ipa 字段，格式如 /f/、/aɪ/、/ə/
2. 字素拼接（忽略空格、连字符）必须能还原单词拼写
3. 英式英语(RP)发音
4. **每个 box 必须显示音标，禁止单独出现「—」静音格**（短语词间空格除外）
5. 常见字素组合优先识别（固定组合视为一个音素，不得拆成单字母）：
   - 辅音混合：bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sc, sk, sl, sm, sn, sp, st, str, sw, tr, tw 等
   - 静音组合并入同一格：wr→/r/, kn→/n/, gn→/n/, mb→/m/（如 write→wr/i/te，不是 w(—)+r）
   - 二合字母：sh→/ʃ/, ch→/tʃ/, th→/θ/或/ð/, ph→/f/, wh→/w/, ck→/k/, ng→/ŋ/, tion→/ʃən/
   - 元音组合：igh→/aɪ/, oo→/uː/或/ʊ/, ee→/iː/, ea→/iː/或/e/, ai→/eɪ/, ay→/eɪ/, oa→/əʊ/, ou→/aʊ/, ow→/əʊ/或/aʊ/
   - r 控元音：ar→/ɑː/, er→/ə/, ir→/ɜː/, or→/ɔː/, ur→/ɜː/, our→/ɔː/（如 your→y/our）
6. Magic-e：元音读长音；静音 e 与前面辅音字符合并为同一格且该格必须有音标（如 plate→pl/a/te, write→wr/i/te）
7. 复合词按词根拆分：everyone→every(e/v/e/r/y)+one(o/ne)，词间用 letter:" " ipa:"—"（不显示 box）
8. 短语按单词分别拆分；单词 are 整体一格：are→/ɑː/
9. 正确示例：
   - write: [{"letter":"wr","ipa":"/r/"},{"letter":"i","ipa":"/aɪ/"},{"letter":"te","ipa":"/t/"}]
   - are: [{"letter":"are","ipa":"/ɑː/"}]
   - your: [{"letter":"y","ipa":"/j/"},{"letter":"our","ipa":"/ɔː/"}]
   - everyone: [{"letter":"e","ipa":"/e/"},{"letter":"v","ipa":"/v/"},{"letter":"e","ipa":"/ə/"},{"letter":"r","ipa":"/r/"},{"letter":"y","ipa":"/i/"},{"letter":" ","ipa":"—"},{"letter":"o","ipa":"/w/"},{"letter":"ne","ipa":"/n/"}]
   - plate: [{"letter":"pl","ipa":"/pl/"},{"letter":"a","ipa":"/eɪ/"},{"letter":"te","ipa":"/t/"}]
   - group: [{"letter":"gr","ipa":"/ɡr/"},{"letter":"ou","ipa":"/uː/"},{"letter":"p","ipa":"/p/"}]
`;

const GRAPHEMES = [
  'tion', 'ture', 'igh', 'air', 'ear', 'ore', 'oul', 'our', 'ey', 'ay', 'ai', 'ee', 'ea', 'ie', 'ue', 'oy',
  'wh', 'wr', 'kn', 'gn', 'mb', 'ck', 'ng', 'sh', 'ch', 'th', 'ph', 'qu', 'ci', 'en', 'ce',
  'scr', 'spl', 'spr', 'str', 'squ',
  'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw',
  'ar', 'er', 'ir', 'or', 'ur', 'au', 'ou', 'ow', 'oa', 'oo',
];

function loadDataJs(grade) {
  const p = path.join(STB, grade, 'assets', 'data', 'data.js');
  const code = fs.readFileSync(p, 'utf8');
  const fn = new Function(code + '; return TEXTBOOK_DATA;');
  return { path: p, data: fn(), raw: code };
}

function lettersJoined(phonemes) {
  return phonemes.map(p => p.letter).join('').replace(/\s/g, '');
}

function normalizeWord(w) {
  return w
    .replace(/\s+/g, '')
    .replace(/-/g, '')
    .replace(/['\u2018\u2019`´]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\.\.\./g, '')
    .replace(/sb\/sth/gi, '')
    .replace(/\//g, '')
    .toLowerCase();
}

function spellOk(word, phonemes) {
  const joined = normalizeWord(lettersJoined(phonemes));
  const target = normalizeWord(word);
  if (joined === target) return true;
  // T-shirt / let's 等
  const alt = word.replace(/\s/g, '').replace(/-/g, '').toLowerCase()
    .replace(/['\u2018\u2019]/g, '');
  return joined === alt || joined === word.replace(/\s/g, '').toLowerCase();
}

function hasSpellIssue(word, phonemes) {
  return !spellOk(word, phonemes);
}

function findGraphemeIssues(word, phonemes) {
  const issues = [];
  const letters = phonemes.map(p => p.letter);
  const wl = word.replace(/\s/g, '').replace(/-/g, '').toLowerCase();
  for (const g of GRAPHEMES) {
    if (!wl.includes(g)) continue;
    if (letters.some(l => l === g)) continue;
    for (let i = 0; i < letters.length; i++) {
      let acc = '';
      for (let j = i; j < letters.length && acc.length < g.length; j++) {
        acc += letters[j];
        if (acc === g && letters.slice(i, j + 1).every(l => l.length === 1) && j > i) {
          issues.push({ grapheme: g, split: letters.slice(i, j + 1) });
          break;
        }
      }
    }
  }
  return issues;
}

function auditWord(word, phonemes) {
  const problems = [];
  if (!phonemes?.length) problems.push('empty');
  if (!spellOk(word, phonemes)) problems.push(`spell:${lettersJoined(phonemes)}`);
  const gi = findGraphemeIssues(word, phonemes);
  if (gi.length) problems.push(`grapheme:${gi.map(x => x.grapheme).join(',')}`);
  return problems;
}

function collectAll(grades) {
  const items = [];
  for (const grade of grades) {
    const { data } = loadDataJs(grade);
    for (const unit of data.units) {
      for (const w of unit.words) {
        items.push({ grade, unit: unit.id, word: w.word, chinese: w.chinese, phonemes: w.phonemes });
      }
    }
  }
  return items;
}

function audit(grades) {
  let bad = 0;
  const byGrade = {};
  for (const item of collectAll(grades)) {
    const probs = auditWord(item.word, item.phonemes);
    if (probs.length) {
      bad++;
      byGrade[item.grade] = (byGrade[item.grade] || 0) + 1;
      console.log(`[${item.grade}] ${item.word}: ${probs.join(' | ')}`);
    }
  }
  console.log(`\n审计完成: ${bad} 个单词有问题`);
  for (const [g, n] of Object.entries(byGrade)) console.log(`  ${g}: ${n}`);
  return bad;
}

function toSymbol(ipa) {
  if (ipa === '—' || ipa === '-') return '—';
  return ipa.startsWith('/') ? ipa : `/${ipa}/`;
}

function normalizeItems(items) {
  return items.map(p => ({ symbol: toSymbol(p.ipa || p.symbol), letter: p.letter }));
}

function validateItems(word, items) {
  if (!items?.length) return false;
  const norm = items.map(p => ({ letter: p.letter, ipa: p.ipa || p.symbol }));
  if (!spellOk(word, norm)) return false;
  return norm.every(p => p.ipa || p.symbol);
}

async function callDeepseek(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(DEEPSEEK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: '你是英语自然拼读专家。只输出合法 JSON 对象，不要 markdown 代码块。' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.1,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.choices[0].message.content;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, (i + 1) * 2000));
    }
  }
}

function serializePhonemes(phonemes, indent = '          ') {
  const lines = phonemes.map(p => {
    const sym = JSON.stringify(p.symbol);
    const lettr = JSON.stringify(p.letter);
    return `${indent}  {\n${indent}    "symbol": ${sym},\n${indent}    "letter": ${lettr}\n${indent}  }`;
  });
  return `${indent}"phonemes": [\n${lines.join(',\n')}\n${indent}]`;
}

function patchWordPhonemes(raw, word, phonemes) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `("word":\\s*${JSON.stringify(word).slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?)"phonemes":\\s*\\[[\\s\\S]*?\\]`,
    'm'
  );
  // safer: use JSON.stringify for word match
  const wordPat = `"word": ${JSON.stringify(word)}`;
  const idx = raw.indexOf(wordPat);
  if (idx < 0) return { raw, ok: false };
  const phStart = raw.indexOf('"phonemes":', idx);
  if (phStart < 0 || phStart > idx + 500) return { raw, ok: false };
  const arrStart = raw.indexOf('[', phStart);
  let depth = 0, arrEnd = -1;
  for (let i = arrStart; i < raw.length; i++) {
    if (raw[i] === '[') depth++;
    else if (raw[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  if (arrEnd < 0) return { raw, ok: false };
  const newBlock = serializePhonemes(phonemes).trim();
  const updated = raw.slice(0, phStart) + newBlock + raw.slice(arrEnd + 1);
  return { raw: updated, ok: true };
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS)) return { done: {} };
  return JSON.parse(fs.readFileSync(PROGRESS, 'utf8'));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 2), 'utf8');
}

async function fixWords(grade, wordList, { dry = false } = {}) {
  const { path: dataPath, data, raw: initialRaw } = loadDataJs(grade);
  let raw = initialRaw;
  const map = new Map();
  for (const unit of data.units) {
    for (const w of unit.words) map.set(w.word, w);
  }
  const todo = wordList.map(w => map.get(w)).filter(Boolean);
  console.log(`\n=== ${grade}: 重试 ${todo.length} 词 ===`);
  let fixed = 0;
  for (let i = 0; i < todo.length; i += BATCH_SIZE) {
    const batch = todo.slice(i, i + BATCH_SIZE);
    const lines = batch.map(w => {
      const old = w.phonemes.map(p => ({ letter: p.letter, ipa: p.symbol }));
      return `- ${JSON.stringify(w.word)}（${w.chinese}）当前：${JSON.stringify(old)}`;
    });
    const prompt = `${RULES}

【重要】letter 字段拼接（忽略空格、连字符、括号注释）必须精确还原单词可见拼写。
请修正以下单词的音素拆分。输出 JSON：key=单词原文，value=[{"letter":"字素","ipa":"/音标/"或"—"}]

${lines.join('\n')}`;
    let parsed = {};
    try {
      const content = await callDeepseek(prompt);
      parsed = JSON.parse(content.replace(/^```json\s*|\s*```$/g, '').trim());
    } catch (e) {
      console.error('  API失败:', e.message);
      continue;
    }
    for (const w of batch) {
      const items = parsed[w.word];
      if (!items?.length) { console.warn(`  SKIP ${w.word}: 无返回`); continue; }
      const normalized = normalizeItems(items);
      if (!spellOk(w.word, normalized)) {
        console.warn(`  SKIP ${w.word}: 拼写仍不匹配 → ${lettersJoined(normalized)}`);
        continue;
      }
      if (JSON.stringify(w.phonemes) !== JSON.stringify(normalized)) {
        console.log(`  FIX ${w.word}: ${w.phonemes.map(p => p.letter).join('/')} → ${normalized.map(p => p.letter).join('/')}`);
        fixed++;
        if (!dry) {
          const result = patchWordPhonemes(raw, w.word, normalized);
          if (result.ok) raw = result.raw;
        }
      } else {
        console.log(`  OK  ${w.word}`);
      }
    }
    if (!dry) fs.writeFileSync(dataPath, raw, 'utf8');
    await new Promise(r => setTimeout(r, 800));
  }
  return { fixed };
}

async function fixGrade(grade, { dry = false, onlyIssues = false, spellOnly = false } = {}) {
  const { path: dataPath, data, raw: initialRaw } = loadDataJs(grade);
  let raw = initialRaw;
  const words = [];
  for (const unit of data.units) {
    for (const w of unit.words) words.push(w);
  }

  const progress = loadProgress();
  const doneSet = new Set(progress.done[grade] || []);
  const todo = words.filter(w => {
    if (doneSet.has(w.word) && !onlyIssues && !spellOnly) return false;
    if (spellOnly) return hasSpellIssue(w.word, w.phonemes);
    if (onlyIssues) return auditWord(w.word, w.phonemes).length > 0;
    return true;
  });

  console.log(`\n=== ${grade}: ${todo.length} 词待校验（共 ${words.length}）===`);
  let fixed = 0, skipped = 0;

  for (let i = 0; i < todo.length; i += BATCH_SIZE) {
    const batch = todo.slice(i, i + BATCH_SIZE);
    const lines = batch.map(w => {
      const old = w.phonemes.map(p => ({ letter: p.letter, ipa: p.symbol }));
      return `- ${JSON.stringify(w.word)}（${w.chinese}）当前：${JSON.stringify(old)}`;
    });
    const prompt = `${RULES}

请检查并修正以下小学英语单词的自然拼读音素拆分。若当前拆分完全正确则原样返回；若有误（尤其 magic-e、固定字素被拆散、元音发音错误）则给出修正版。
输出 JSON：key=单词原文（与下列完全一致），value=[{"letter":"字素","ipa":"/音标/"或"—"}]

${lines.join('\n')}`;

    let parsed = {};
    try {
      const content = await callDeepseek(prompt);
      const cleaned = content.replace(/^```json\s*|\s*```$/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error(`  批次 ${i / BATCH_SIZE + 1} API/解析失败:`, e.message);
      continue;
    }

    for (const w of batch) {
      const items = parsed[w.word];
      if (!items || !validateItems(w.word, items)) {
        console.warn(`  SKIP ${w.word}: 校验未通过`);
        skipped++;
        continue;
      }
      const normalized = normalizeItems(items);
      const oldStr = JSON.stringify(w.phonemes);
      const newStr = JSON.stringify(normalized);
      if (oldStr === newStr) {
        console.log(`  OK  ${w.word} (无变化)`);
      } else {
        console.log(`  FIX ${w.word}: ${w.phonemes.map(p => p.letter).join('/')} → ${normalized.map(p => p.letter).join('/')}`);
        fixed++;
        if (!dry) {
          const result = patchWordPhonemes(raw, w.word, normalized);
          if (result.ok) raw = result.raw;
          else console.warn(`    写回失败: ${w.word}`);
        }
      }
      doneSet.add(w.word);
    }

    if (!dry) {
      progress.done[grade] = [...doneSet];
      progress.last = { grade, batch: i / BATCH_SIZE + 1, at: new Date().toISOString() };
      saveProgress(progress);
      fs.writeFileSync(dataPath, raw, 'utf8');
    }
    await new Promise(r => setTimeout(r, 800));
  }

  console.log(`${grade} 完成: 修正 ${fixed}, 跳过 ${skipped}`);
  return { fixed, skipped };
}

function parseArgs() {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'audit';
  const gradeIdx = args.indexOf('--grade');
  const grade = gradeIdx >= 0 ? args[gradeIdx + 1] : null;
  const all = args.includes('--all');
  const dry = args.includes('--dry');
  const onlyIssues = args.includes('--only-issues');
  const spellOnly = args.includes('--spell-only');
  return { cmd, grade, all, dry, onlyIssues, spellOnly };
}

async function main() {
  const { cmd, grade, all, dry, onlyIssues, spellOnly } = parseArgs();
  const grades = grade ? [grade] : (all ? GRADES : GRADES);

  if (cmd === 'audit') {
    audit(grades);
    return;
  }

  if (cmd === 'fix') {
    let totalFixed = 0;
    for (const g of grades) {
      if (!GRADES.includes(g)) { console.error('未知册:', g); continue; }
      const r = await fixGrade(g, { dry, onlyIssues, spellOnly });
      totalFixed += r.fixed;
    }
    console.log(`\n全部完成，共修正 ${totalFixed} 个单词${dry ? '（预览模式）' : ''}`);
    return;
  }

  if (cmd === 'retry') {
    const RETRY = {
      '3GA': ["let\u2019s = let us", 'think', 'miaow'],
      '3GB': ['these', 'half past one / two...'],
      '4GA': ['outside', 'sometimes', 'picnic', 'live'],
      '5GA': ['choose', 'always', 'healthily'],
      '5GB': ['Merry Christmas!'],
      '6GA': ['exhibition'],
    };
    let total = 0;
    for (const [g, words] of Object.entries(RETRY)) {
      const r = await fixWords(g, words, { dry });
      total += r.fixed;
    }
    console.log(`\n重试完成，共修正 ${total} 个`);
    return;
  }

  console.log('用法: audit | fix [--grade 5GA] [--all] [--dry] [--only-issues] [--spell-only] | retry');
}

export { fixWords, loadDataJs, patchWordPhonemes, normalizeItems, callDeepseek, RULES };

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch(e => { console.error(e); process.exit(1); });
}
