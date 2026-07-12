/**
 * 修正课件单词音素拆分：合并静音字素、固定字素组合、复合词拆分
 *
 * 原则：每个 box 必须显示音标，不出现单独的「—」静音格（短语空格除外）
 *
 * 用法:
 *   node scripts/fix-phoneme-graphemes.mjs audit
 *   node scripts/fix-phoneme-graphemes.mjs fix [--grade 3GA] [--all] [--dry]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadDataJs, patchWordPhonemes } from './verify-phonemes-deepseek.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRADES = ['3GA', '3GB', '4GA', '4GB', '5GA', '5GB', '6GA'];

const SKIP_SILENT_LETTERS = new Set([' ', '-', '.', "'", '\u2019', '/', '(', ')', '（', '）']);

/** 精确覆盖（优先级最高） */
const OVERRIDES = {
  are: [{ letter: 'are', symbol: '/ɑː/' }],
  your: [{ letter: 'y', symbol: '/j/' }, { letter: 'our', symbol: '/ɔː/' }],
  write: [{ letter: 'wr', symbol: '/r/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 'te', symbol: '/t/' }],
  writer: [{ letter: 'wr', symbol: '/r/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 't', symbol: '/t/' }, { letter: 'er', symbol: '/ə/' }],
  wrong: [{ letter: 'wr', symbol: '/r/' }, { letter: 'o', symbol: '/ɒ/' }, { letter: 'ng', symbol: '/ŋ/' }],
  hour: [{ letter: 'h', symbol: '/aʊ/' }, { letter: 'our', symbol: '/ə/' }],
  everyone: [
    { letter: 'e', symbol: '/e/' }, { letter: 'v', symbol: '/v/' }, { letter: 'e', symbol: '/ə/' },
    { letter: 'r', symbol: '/r/' }, { letter: 'y', symbol: '/i/' },
    { letter: ' ', symbol: '—' },
    { letter: 'o', symbol: '/w/' }, { letter: 'ne', symbol: '/n/' },
  ],
  someone: [
    { letter: 's', symbol: '/s/' }, { letter: 'o', symbol: '/ʌ/' }, { letter: 'me', symbol: '/m/' },
    { letter: ' ', symbol: '—' },
    { letter: 'o', symbol: '/w/' }, { letter: 'ne', symbol: '/n/' },
  ],
  anyone: [
    { letter: 'a', symbol: '/e/' }, { letter: 'n', symbol: '/n/' }, { letter: 'y', symbol: '/i/' },
    { letter: ' ', symbol: '—' },
    { letter: 'o', symbol: '/w/' }, { letter: 'ne', symbol: '/n/' },
  ],
  number: [{ letter: 'n', symbol: '/n/' }, { letter: 'u', symbol: '/ʌ/' }, { letter: 'mb', symbol: '/m/' }, { letter: 'er', symbol: '/ə/' }],
  friend: [{ letter: 'fr', symbol: '/fr/' }, { letter: 'ie', symbol: '/e/' }, { letter: 'nd', symbol: '/nd/' }],
  from: [{ letter: 'fr', symbol: '/fr/' }, { letter: 'o', symbol: '/ɒ/' }, { letter: 'm', symbol: '/m/' }],
  twin: [{ letter: 'tw', symbol: '/tw/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'n', symbol: '/n/' }],
  open: [{ letter: 'o', symbol: '/əʊ/' }, { letter: 'p', symbol: '/p/' }, { letter: 'en', symbol: '/n/' }],
  listen: [{ letter: 'l', symbol: '/l/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'st', symbol: '/s/' }, { letter: 'en', symbol: '/n/' }],
  pen: [{ letter: 'p', symbol: '/p/' }, { letter: 'en', symbol: '/n/' }],
  pencil: [{ letter: 'p', symbol: '/p/' }, { letter: 'en', symbol: '/n/' }, { letter: 'ci', symbol: '/s/' }, { letter: 'l', symbol: '/l/' }],
  please: [{ letter: 'pl', symbol: '/pl/' }, { letter: 'ea', symbol: '/iː/' }, { letter: 'se', symbol: '/z/' }],
  orange: [{ letter: 'or', symbol: '/ɒ/' }, { letter: 'a', symbol: '/r/' }, { letter: 'nge', symbol: '/ndʒ/' }],
  black: [{ letter: 'bl', symbol: '/bl/' }, { letter: 'a', symbol: '/æ/' }, { letter: 'ck', symbol: '/k/' }],
  seven: [{ letter: 's', symbol: '/s/' }, { letter: 'e', symbol: '/e/' }, { letter: 'v', symbol: '/v/' }, { letter: 'en', symbol: '/n/' }],
  ten: [{ letter: 't', symbol: '/t/' }, { letter: 'en', symbol: '/n/' }],
  eleven: [
    { letter: 'e', symbol: '/ɪ/' }, { letter: 'l', symbol: '/l/' }, { letter: 'e', symbol: '/e/' },
    { letter: 'v', symbol: '/v/' }, { letter: 'en', symbol: '/n/' },
  ],
  sweet: [{ letter: 'sw', symbol: '/sw/' }, { letter: 'ee', symbol: '/iː/' }, { letter: 't', symbol: '/t/' }],
  bedroom: [{ letter: 'b', symbol: '/b/' }, { letter: 'e', symbol: '/e/' }, { letter: 'dr', symbol: '/dr/' }, { letter: 'oo', symbol: '/uː/' }, { letter: 'm', symbol: '/m/' }],
  kitchen: [{ letter: 'k', symbol: '/k/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'tch', symbol: '/tʃ/' }, { letter: 'en', symbol: '/n/' }],
  vegetable: [{ letter: 'v', symbol: '/v/' }, { letter: 'e', symbol: '/e/' }, { letter: 'g', symbol: '/dʒ/' }, { letter: 'e', symbol: '/ə/' }, { letter: 't', symbol: '/t/' }, { letter: 'a', symbol: '/b/' }, { letter: 'ble', symbol: '/l/' }],
  evening: [{ letter: 'e', symbol: '/iː/' }, { letter: 'v', symbol: '/v/' }, { letter: 'en', symbol: '/n/' }, { letter: 'ing', symbol: '/ɪŋ/' }],
  science: [{ letter: 's', symbol: '/s/' }, { letter: 'ci', symbol: '/aɪ/' }, { letter: 'en', symbol: '/n/' }, { letter: 'ce', symbol: '/s/' }],
  children: [{ letter: 'ch', symbol: '/tʃ/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'l', symbol: '/l/' }, { letter: 'dr', symbol: '/d/' }, { letter: 'en', symbol: '/n/' }],
  fruit: [{ letter: 'fr', symbol: '/fr/' }, { letter: 'ui', symbol: '/uː/' }, { letter: 't', symbol: '/t/' }],
  free: [{ letter: 'fr', symbol: '/fr/' }, { letter: 'ee', symbol: '/iː/' }],
  swim: [{ letter: 'sw', symbol: '/sw/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'm', symbol: '/m/' }],
  then: [{ letter: 'th', symbol: '/ð/' }, { letter: 'en', symbol: '/n/' }],
  when: [{ letter: 'wh', symbol: '/w/' }, { letter: 'en', symbol: '/n/' }],
  answer: [{ letter: 'a', symbol: '/ɑː/' }, { letter: 'n', symbol: '/n/' }, { letter: 'sw', symbol: '/s/' }, { letter: 'er', symbol: '/ə/' }],
  chicken: [{ letter: 'ch', symbol: '/tʃ/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'ck', symbol: '/k/' }, { letter: 'en', symbol: '/n/' }],
  cucumber: [{ letter: 'c', symbol: '/k/' }, { letter: 'u', symbol: '/juː/' }, { letter: 'c', symbol: '/k/' }, { letter: 'u', symbol: '/ʌ/' }, { letter: 'mb', symbol: '/m/' }, { letter: 'er', symbol: '/ə/' }],
  dumpling: [{ letter: 'd', symbol: '/d/' }, { letter: 'u', symbol: '/ʌ/' }, { letter: 'mp', symbol: '/m/' }, { letter: 'l', symbol: '/l/' }, { letter: 'ing', symbol: '/ɪŋ/' }],
  basketball: [{ letter: 'b', symbol: '/b/' }, { letter: 'a', symbol: '/ɑː/' }, { letter: 'sk', symbol: '/sk/' }, { letter: 'et', symbol: '/ɪ/' }, { letter: 'ball', symbol: '/bɔːl/' }],
  sport: [{ letter: 'sp', symbol: '/sp/' }, { letter: 'or', symbol: '/ɔː/' }, { letter: 't', symbol: '/t/' }],
  across: [{ letter: 'a', symbol: '/ə/' }, { letter: 'cr', symbol: '/kr/' }, { letter: 'o', symbol: '/ɒ/' }, { letter: 'ss', symbol: '/s/' }],
  remember: [{ letter: 'r', symbol: '/r/' }, { letter: 'e', symbol: '/ɪ/' }, { letter: 'm', symbol: '/m/' }, { letter: 'em', symbol: '/e/' }, { letter: 'b', symbol: '/b/' }, { letter: 'er', symbol: '/ə/' }],
  try: [{ letter: 'tr', symbol: '/tr/' }, { letter: 'y', symbol: '/aɪ/' }],
  star: [{ letter: 'st', symbol: '/st/' }, { letter: 'ar', symbol: '/ɑː/' }],
  player: [{ letter: 'pl', symbol: '/pl/' }, { letter: 'ay', symbol: '/eɪ/' }, { letter: 'er', symbol: '/ə/' }],
  sweep: [{ letter: 'sw', symbol: '/sw/' }, { letter: 'ee', symbol: '/iː/' }, { letter: 'p', symbol: '/p/' }],
  desk: [{ letter: 'd', symbol: '/d/' }, { letter: 'e', symbol: '/e/' }, { letter: 'sk', symbol: '/sk/' }],
  enjoy: [{ letter: 'e', symbol: '/ɪ/' }, { letter: 'n', symbol: '/n/' }, { letter: 'j', symbol: '/dʒ/' }, { letter: 'oy', symbol: '/ɔɪ/' }],
  diary: [{ letter: 'd', symbol: '/d/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 'a', symbol: '/ə/' }, { letter: 'ry', symbol: '/ri/' }],
  spring: [{ letter: 'spr', symbol: '/spr/' }, { letter: 'ing', symbol: '/ɪŋ/' }],
  favorite: [{ letter: 'f', symbol: '/f/' }, { letter: 'a', symbol: '/eɪ/' }, { letter: 'v', symbol: '/v/' }, { letter: 'or', symbol: '/ə/' }, { letter: 'ite', symbol: '/t/' }],
  city: [{ letter: 'c', symbol: '/s/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 't', symbol: '/t/' }, { letter: 'y', symbol: '/i/' }],
  bamboo: [{ letter: 'b', symbol: '/b/' }, { letter: 'a', symbol: '/æ/' }, { letter: 'mb', symbol: '/m/' }, { letter: 'oo', symbol: '/uː/' }],
  library: [{ letter: 'l', symbol: '/l/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 'br', symbol: '/br/' }, { letter: 'a', symbol: '/ə/' }, { letter: 'ry', symbol: '/ri/' }],
  center: [{ letter: 'c', symbol: '/s/' }, { letter: 'e', symbol: '/e/' }, { letter: 'n', symbol: '/n/' }, { letter: 't', symbol: '/t/' }, { letter: 'er', symbol: '/ə/' }],
  cinema: [{ letter: 'c', symbol: '/s/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'n', symbol: '/n/' }, { letter: 'e', symbol: '/ə/' }, { letter: 'ma', symbol: '/mə/' }],
  hospital: [{ letter: 'h', symbol: '/h/' }, { letter: 'o', symbol: '/ɒ/' }, { letter: 'sp', symbol: '/sp/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 't', symbol: '/t/' }, { letter: 'al', symbol: '/l/' }],
  fast: [{ letter: 'f', symbol: '/f/' }, { letter: 'a', symbol: '/ɑː/' }, { letter: 'st', symbol: '/st/' }],
  small: [{ letter: 'sm', symbol: '/sm/' }, { letter: 'a', symbol: '/ɔː/' }, { letter: 'll', symbol: '/l/' }],
  zebra: [{ letter: 'z', symbol: '/z/' }, { letter: 'e', symbol: '/e/' }, { letter: 'br', symbol: '/br/' }, { letter: 'a', symbol: '/ə/' }],
  ostrich: [{ letter: 'o', symbol: '/ɒ/' }, { letter: 'str', symbol: '/str/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'tch', symbol: '/tʃ/' }],
  grow: [{ letter: 'gr', symbol: '/ɡr/' }, { letter: 'ow', symbol: '/əʊ/' }],
  first: [{ letter: 'f', symbol: '/f/' }, { letter: 'ir', symbol: '/ɜː/' }, { letter: 'st', symbol: '/st/' }],
  around: [{ letter: 'a', symbol: '/ə/' }, { letter: 'r', symbol: '/r/' }, { letter: 'ou', symbol: '/aʊ/' }, { letter: 'nd', symbol: '/nd/' }],
  'here you are': [
    { letter: 'h', symbol: '/h/' }, { letter: 'ere', symbol: '/ɪə/' }, { letter: ' ', symbol: '—' },
    { letter: 'y', symbol: '/j/' }, { letter: 'ou', symbol: '/uː/' }, { letter: ' ', symbol: '—' },
    { letter: 'are', symbol: '/ɑː/' },
  ],
  sometimes: [
    { letter: 's', symbol: '/s/' }, { letter: 'o', symbol: '/ʌ/' }, { letter: 'me', symbol: '/m/' },
    { letter: 't', symbol: '/t/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 'm', symbol: '/m/' }, { letter: 'es', symbol: '/z/' },
  ],
  sometime: [
    { letter: 's', symbol: '/s/' }, { letter: 'o', symbol: '/ʌ/' }, { letter: 'me', symbol: '/m/' },
    { letter: 't', symbol: '/t/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 'me', symbol: '/m/' },
  ],
  autumn: [{ letter: 'au', symbol: '/ɔː/' }, { letter: 't', symbol: '/t/' }, { letter: 'u', symbol: '/ə/' }, { letter: 'mn', symbol: '/m/' }],
  often: [{ letter: 'o', symbol: '/ɒ/' }, { letter: 'f', symbol: '/f/' }, { letter: 'ten', symbol: '/n/' }],
  would: [{ letter: 'w', symbol: '/w/' }, { letter: 'ou', symbol: '/ʊ/' }, { letter: 'ld', symbol: '/d/' }],
  daughter: [{ letter: 'd', symbol: '/d/' }, { letter: 'augh', symbol: '/ɔː/' }, { letter: 't', symbol: '/t/' }, { letter: 'er', symbol: '/ə/' }],
  surprise: [{ letter: 's', symbol: '/s/' }, { letter: 'ur', symbol: '/ə/' }, { letter: 'pr', symbol: '/pr/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 'se', symbol: '/z/' }],
  climb: [{ letter: 'cl', symbol: '/kl/' }, { letter: 'i', symbol: '/aɪ/' }, { letter: 'mb', symbol: '/m/' }],
  yesterday: [{ letter: 'y', symbol: '/j/' }, { letter: 'e', symbol: '/e/' }, { letter: 's', symbol: '/s/' }, { letter: 't', symbol: '/t/' }, { letter: 'er', symbol: '/ə/' }, { letter: 'd', symbol: '/d/' }, { letter: 'ay', symbol: '/eɪ/' }],
  worried: [{ letter: 'w', symbol: '/w/' }, { letter: 'o', symbol: '/ʌ/' }, { letter: 'rr', symbol: '/r/' }, { letter: 'i', symbol: '/i/' }, { letter: 'ed', symbol: '/d/' }],
  difference: [{ letter: 'd', symbol: '/d/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'ff', symbol: '/f/' }, { letter: 'er', symbol: '/ə/' }, { letter: 'en', symbol: '/n/' }, { letter: 'ce', symbol: '/s/' }],
  exhibition: [{ letter: 'exh', symbol: '/eks/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'b', symbol: '/b/' }, { letter: 'i', symbol: '/ɪ/' }, { letter: 'ti', symbol: '/ʃ/' }, { letter: 'on', symbol: '/n/' }],
  blackboard: [
    { letter: 'bl', symbol: '/bl/' }, { letter: 'a', symbol: '/æ/' }, { letter: 'ck', symbol: '/k/' },
    { letter: 'b', symbol: '/b/' }, { letter: 'oar', symbol: '/ɔː/' }, { letter: 'd', symbol: '/d/' },
  ],
  unanswered: [{ letter: 'un', symbol: '/ʌn/' }, { letter: 'a', symbol: '/ɑː/' }, { letter: 'n', symbol: '/n/' }, { letter: 'sw', symbol: '/s/' }, { letter: 'er', symbol: '/ə/' }, { letter: 'ed', symbol: '/d/' }],
};

function isSkippableSilent(letter) {
  return SKIP_SILENT_LETTERS.has(letter) || letter === '';
}

function hasBadSilent(phonemes) {
  return phonemes.some(p => (p.symbol === '—' || p.symbol === '/—/') && !isSkippableSilent(p.letter));
}

function lettersJoined(phonemes) {
  return phonemes.map(p => p.letter).join('').replace(/\s/g, '');
}

function normalizeWord(w) {
  return w.replace(/\s+/g, '').replace(/-/g, '').replace(/['\u2018\u2019`´]/g, '')
    .replace(/\(.*?\)/g, '').replace(/\.\.\./g, '').toLowerCase();
}

function spellOk(word, phonemes) {
  const joined = normalizeWord(lettersJoined(phonemes));
  const target = normalizeWord(word);
  return joined === target || joined === word.replace(/\s/g, '').toLowerCase();
}

/** 自动合并静音字素 */
function autoMerge(word, phonemes) {
  const ph = phonemes.map(p => ({ ...p }));
  let changed = true;
  let guard = 0;
  while (changed && guard++ < 20) {
    changed = false;
    for (let i = 0; i < ph.length; i++) {
      const curr = ph[i];
      const next = ph[i + 1];
      const third = ph[i + 2];

      if (!curr || curr.symbol !== '—' || isSkippableSilent(curr.letter)) continue;

      // wr / kn / gn 静音首字母组合
      if (next && ['w', 'k', 'g'].includes(curr.letter) && next.letter === (curr.letter === 'w' ? 'r' : 'n')) {
        ph.splice(i, 2, { letter: curr.letter + next.letter, symbol: next.symbol });
        changed = true;
        break;
      }

      // mb 尾静音：m + b(—)
      if (curr.symbol !== '—' && next?.symbol === '—' && next.letter === 'b' && curr.letter === 'm') {
        ph.splice(i, 2, { letter: 'mb', symbol: curr.symbol });
        changed = true;
        break;
      }

      // ou + r(—) → our
      if (curr.symbol !== '—' && next?.symbol === '—' && next.letter === 'r' && curr.letter === 'ou') {
        ph.splice(i, 2, { letter: 'our', symbol: curr.symbol });
        changed = true;
        break;
      }

      // or + silent letters
      if (curr.symbol !== '—' && next?.symbol === '—' && next.letter === 'r' && curr.letter === 'o' && !third) {
        ph.splice(i, 2, { letter: 'or', symbol: curr.symbol });
        changed = true;
        break;
      }

      // are 单词：a + r(—) + e
      if (word === 'are' && curr.letter === 'a' && next?.symbol === '—' && next.letter === 'r' && third?.letter === 'e') {
        ph.splice(i, 3, { letter: 'are', symbol: curr.symbol });
        changed = true;
        break;
      }

      // 短语末尾 are：... are
      if (word.endsWith(' are') && curr.letter === 'a' && next?.symbol === '—' && next.letter === 'r' && third?.letter === 'e' && i + 2 === ph.length - 1) {
        ph.splice(i, 3, { letter: 'are', symbol: curr.symbol });
        changed = true;
        break;
      }

      // gh 静音：au + gh(—) → augh
      if (curr.symbol !== '—' && next?.symbol === '—' && next.letter === 'gh') {
        ph.splice(i, 2, { letter: curr.letter + 'gh', symbol: curr.symbol });
        changed = true;
        break;
      }

      // s + w(—) → sw（answer 等）
      if (curr.letter === 's' && next?.symbol === '—' && next.letter === 'w') {
        ph.splice(i, 2, { letter: 'sw', symbol: curr.symbol });
        changed = true;
        break;
      }

      // x + h(—) → ex（exhibition）
      if (curr.letter === 'e' && next?.letter === 'x' && third?.symbol === '—' && third?.letter === 'h') {
        ph.splice(i, 3, { letter: 'ex', symbol: '/eks/' });
        changed = true;
        break;
      }

      // a + y(—) 词尾 → ay
      if (curr.letter === 'a' && next?.symbol === '—' && next.letter === 'y' && i + 1 === ph.length - 1) {
        ph.splice(i, 2, { letter: 'ay', symbol: '/eɪ/' });
        changed = true;
        break;
      }

      // 短语末尾 are：a + r(—) + e（最后三个）
      if (curr.letter === 'a' && next?.symbol === '—' && next.letter === 'r' && third?.symbol === '—' && third.letter === 'e' && i + 2 >= ph.length - 1) {
        ph.splice(i, 3, { letter: 'are', symbol: '/ɑː/' });
        changed = true;
        break;
      }

      // 末尾 r(—) + e(—) 在 are 短语中
      if (curr.symbol === '—' && curr.letter === 'r' && next?.symbol === '—' && next.letter === 'e' && i >= 2 && ph[i - 1].letter === 'a') {
        ph.splice(i - 1, 3, { letter: 'are', symbol: '/ɑː/' });
        changed = true;
        break;
      }

      // magic-e：辅音格 + e(—) → 合并（如 te, ce, ste）
      if (curr.symbol !== '—' && next?.symbol === '—' && next.letter === 'e') {
        ph.splice(i, 2, { letter: curr.letter + 'e', symbol: curr.symbol });
        changed = true;
        break;
      }

      // 单独静音 w 在 wr 词中
      if (curr.symbol === '—' && curr.letter === 'w' && next?.letter === 'r') {
        ph.splice(i, 2, { letter: 'wr', symbol: next.symbol });
        changed = true;
        break;
      }

      // 单独静音 k 在 kn 词中
      if (curr.symbol === '—' && curr.letter === 'k' && next?.letter === 'n') {
        ph.splice(i, 2, { letter: 'kn', symbol: next.symbol });
        changed = true;
        break;
      }

      // igh + t(—) → ight
      if (curr.letter === 'igh' && next?.symbol === '—' && next.letter === 't') {
        ph.splice(i, 2, { letter: 'ight', symbol: curr.symbol });
        changed = true;
        break;
      }
    }
  }
  return ph;
}

function fixPhonemes(word, phonemes) {
  if (OVERRIDES[word]) return OVERRIDES[word].map(p => ({ ...p }));
  let result = autoMerge(word, phonemes);
  if (OVERRIDES[word]) return OVERRIDES[word].map(p => ({ ...p }));
  return result;
}

function patchAllOccurrences(raw, word, phonemes) {
  const wordLit = JSON.stringify(word).slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `("word":\\s*"${wordLit}"[\\s\\S]*?"phonemes":\\s*)\\[[\\s\\S]*?\\]`,
    'g'
  );
  const indent = '          ';
  const body = phonemes.map(p =>
    `${indent}  {\n${indent}    "symbol": ${JSON.stringify(p.symbol)},\n${indent}    "letter": ${JSON.stringify(p.letter)}\n${indent}  }`
  ).join(',\n');
  const block = `$1[\n${body}\n${indent}]`;
  const matches = (raw.match(re) || []).length;
  return { raw: raw.replace(re, block), count: matches };
}

function audit(grades) {
  let bad = 0;
  for (const grade of grades) {
    const { data } = loadDataJs(grade);
    for (const unit of data.units) {
      for (const w of unit.words) {
        const issues = [];
        if (hasBadSilent(w.phonemes)) issues.push('silent-box');
        if (!spellOk(w.word, w.phonemes)) issues.push(`spell:${lettersJoined(w.phonemes)}`);
        if (issues.length) {
          bad++;
          console.log(`[${grade}] ${w.word}: ${issues.join(' | ')}`);
        }
      }
    }
  }
  console.log(`\n审计: ${bad} 个单词仍有问题`);
  return bad;
}

function fixGrades(grades, { dry = false } = {}) {
  let total = 0;
  for (const grade of grades) {
    const { path: dataPath, data, raw: initialRaw } = loadDataJs(grade);
    let raw = initialRaw;
    let fixed = 0;
    for (const unit of data.units) {
      for (const w of unit.words) {
        const newPh = fixPhonemes(w.word, w.phonemes);
        if (JSON.stringify(newPh) === JSON.stringify(w.phonemes)) continue;
        if (!spellOk(w.word, newPh)) {
          console.warn(`  SKIP spell ${grade} ${w.word}: ${lettersJoined(newPh)}`);
          continue;
        }
        if (hasBadSilent(newPh)) {
          console.warn(`  SKIP silent ${grade} ${w.word}`);
          continue;
        }
        console.log(`  FIX ${grade} ${w.word}: ${w.phonemes.map(p => p.letter).join('/')} → ${newPh.map(p => p.letter).join('/')}`);
        fixed++;
        if (!dry) {
          const result = patchAllOccurrences(raw, w.word, newPh);
          raw = result.raw;
        }
      }
    }
    if (!dry && fixed) fs.writeFileSync(dataPath, raw, 'utf8');
    console.log(`${grade}: 修正 ${fixed} 词`);
    total += fixed;
  }
  console.log(`\n共修正 ${total} 词${dry ? '（预览）' : ''}`);
  return total;
}

const args = process.argv.slice(2);
const cmd = args[0] || 'audit';
const gradeIdx = args.indexOf('--grade');
const grade = gradeIdx >= 0 ? args[gradeIdx + 1] : null;
const all = args.includes('--all');
const dry = args.includes('--dry');
const grades = grade ? [grade] : (all ? GRADES : GRADES);

if (cmd === 'audit') audit(grades);
else if (cmd === 'fix') fixGrades(grades, { dry });
else console.log('用法: audit | fix [--grade 3GA] [--all] [--dry]');
