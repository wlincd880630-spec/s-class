#!/usr/bin/env node
/**
 * 2018–2026 成都中考 B 卷短文填空 · 词形变化全量归类
 * 数据源：HET/词形填空练习 套题04–11 + 2026 真题语篇
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PASSAGES from "./extract-wf-passages.mjs";
import { getBlankPrompts } from "./word-form-blank-prompts.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "Grammar/L15/data/word-form-taxonomy-2018-2026.json");
const OUT_JS = path.join(ROOT, "Grammar/L15/l15-word-form-taxonomy.js");

function buildPrompts(blank, catLabel, year, passage, bank) {
  return getBlankPrompts(year, blank, passage, bank);
}

/** 2026 真题题号为 61–70，语篇占位统一为 __1__–__10__ */
function passageSlot(blank, year) {
  if (year === "2026" && blank.n >= 61) return blank.n - 60;
  return blank.n;
}

const YEARS = {
  "2018": {
    bank: ["but", "choice", "color", "direct", "fly", "high", "important", "instead", "it", "many", "quick", "slow"],
    blanks: [
      { n: 1, base: "color", form: "colorful", cat: "adj-derive", rule: "名词/动词 → 形容词（-ful）" },
      { n: 2, base: "choice", form: "chose", cat: "verb-past", rule: "名词同源 → 动词过去式（不规则 choose）" },
      { n: 3, base: "fly", form: "flying", cat: "verb-ing", rule: "start + doing" },
      { n: 4, base: "high", form: "higher", cat: "adj-comp", rule: "比较级（go higher）" },
      { n: 5, base: "slow", form: "Slowly", cat: "adv-ly", rule: "形容词 → 副词（句首评注）" },
      { n: 6, base: "but", form: "but", cat: "conj-fixed", rule: "not A but B 固定结构" },
      { n: 7, base: "it", form: "itself", cat: "pron-reflex", rule: "反身代词" },
      { n: 8, base: "direct", form: "direction", cat: "noun-derive", rule: "形容词 → 名词（-tion）" },
      { n: 9, base: "instead", form: "instead", cat: "adv-fixed", rule: "副词原位（定语从句中）" },
      { n: 10, base: "important", form: "importance", cat: "noun-derive", rule: "形容词 → 名词（-ance）" },
    ],
    unused: ["many", "quick"],
  },
  "2019": {
    bank: ["bad", "British", "consider", "fun", "hope", "pleasure", "power", "they", "total", "understand", "we", "win"],
    blanks: [
      { n: 1, base: "British", form: "Britain", cat: "noun-proper", rule: "形容词 → 国名名词" },
      { n: 2, base: "power", form: "powerful", cat: "adj-derive", rule: "名词 → 形容词（-ful）" },
      { n: 3, base: "they", form: "themselves", cat: "pron-reflex", rule: "反身代词" },
      { n: 4, base: "bad", form: "badly", cat: "adv-ly", rule: "形容词 → 副词（修饰分词 treated）" },
      { n: 5, base: "fun", form: "funnier", cat: "adj-comp", rule: "比较级" },
      { n: 6, base: "win", form: "winning", cat: "verb-ing", rule: "动名词/现在分词" },
      { n: 7, base: "hope", form: "hopeless", cat: "adj-derive", rule: "名词 → 形容词（-less）" },
      { n: 8, base: "pleasure", form: "pleasant", cat: "adj-derive", rule: "名词 → 形容词" },
      { n: 9, base: "total", form: "totally", cat: "adv-ly", rule: "形容词 → 副词" },
      { n: 10, base: "understand", form: "to understand", cat: "verb-inf", rule: "make it + adj + to do" },
    ],
    unused: ["consider", "we"],
  },
  "2020": {
    bank: ["able", "catch", "difficult", "hold", "learn", "little", "possible", "speech", "success", "tie", "true", "we"],
    blanks: [
      { n: 1, base: "tie", form: "tied", cat: "verb-past", rule: "动词过去式/过去分词" },
      { n: 2, base: "true", form: "truth", cat: "noun-derive", rule: "形容词 → 名词" },
      { n: 3, base: "hold", form: "to hold", cat: "verb-inf", rule: "enough + to do" },
      { n: 4, base: "little", form: "little", cat: "adj-fixed", rule: "形容词原级（little courage）" },
      { n: 5, base: "speech", form: "speechless", cat: "adj-derive", rule: "名词 → 形容词（-less）" },
      { n: 6, base: "possible", form: "impossible", cat: "adj-prefix", rule: "否定前缀 im-" },
      { n: 7, base: "able", form: "abilities", cat: "noun-plural", rule: "形容词 → 名词复数（-ity→-ities）" },
      { n: 8, base: "learn", form: "learning", cat: "noun-gerund", rule: "动名词作主语/宾语" },
      { n: 9, base: "success", form: "succeed", cat: "verb-base", rule: "名词 → 动词原形" },
      { n: 10, base: "we", form: "ourselves", cat: "pron-reflex", rule: "反身代词" },
    ],
    unused: ["catch", "difficult"],
  },
  "2021": {
    bank: ["argue", "beautiful", "care", "far", "for", "good", "heat", "include", "special", "succeed", "under", "work"],
    blanks: [
      { n: 1, base: "under", form: "under", cat: "prep-fixed", rule: "介词原位" },
      { n: 2, base: "far", form: "further", cat: "adj-comp", rule: "far 比较级（抽象「进一步」）" },
      { n: 3, base: "include", form: "including", cat: "verb-ing", rule: "介词 including" },
      { n: 4, base: "special", form: "special", cat: "adj-fixed", rule: "形容词原级" },
      { n: 5, base: "succeed", form: "successfully", cat: "adv-derive", rule: "动词 → 副词（-fully）" },
      { n: 6, base: "work", form: "works", cat: "noun-plural", rule: "可数名词复数（著作）" },
      { n: 7, base: "beautiful", form: "beauty", cat: "noun-derive", rule: "形容词 → 名词（-y）" },
      { n: 8, base: "heat", form: "heated", cat: "adj-derive", rule: "名词/动词 → 形容词（-ed）" },
      { n: 9, base: "argue", form: "arguing", cat: "verb-ing", rule: "动名词/现在分词" },
      { n: 10, base: "good", form: "best", cat: "adj-super", rule: "最高级（不规则）" },
    ],
    unused: ["care", "for"],
  },
  "2022": {
    bank: ["clear", "complete", "excite", "follow", "health", "interview", "luck", "shine", "silence", "ten", "touch", "well"],
    blanks: [
      { n: 1, base: "silence", form: "silent", cat: "adj-derive", rule: "名词 → 形容词（-ent/-ant）" },
      { n: 2, base: "clear", form: "clearly", cat: "adv-ly", rule: "形容词 → 副词" },
      { n: 3, base: "luck", form: "unluckily", cat: "adv-derive", rule: "名词 → 副词（un- + -ly）" },
      { n: 4, base: "touch", form: "was touched", cat: "verb-passive", rule: "一般过去时被动" },
      { n: 5, base: "health", form: "healthy", cat: "adj-derive", rule: "名词 → 形容词（-y）" },
      { n: 6, base: "complete", form: "completed", cat: "verb-past", rule: "动词过去式/过去分词" },
      { n: 7, base: "ten", form: "tenth", cat: "num-ordinal", rule: "基数词 → 序数词" },
      { n: 8, base: "follow", form: "followers", cat: "noun-plural", rule: "动词 → 名词复数（-er）" },
      { n: 9, base: "well", form: "better", cat: "adv-comp", rule: "副词比较级（不规则）" },
      { n: 10, base: "shine", form: "shine", cat: "verb-base", rule: "情态动词后动词原形" },
    ],
    unused: ["excite", "interview"],
  },
  "2023": {
    bank: ["actual", "advantage", "chance", "child", "difficult", "difference", "few", "hear", "many", "possible", "silence", "tell"],
    blanks: [
      { n: 1, base: "child", form: "children's", cat: "noun-poss", rule: "不规则复数 + 名词所有格" },
      { n: 2, base: "silence", form: "silent", cat: "adj-derive", rule: "名词 → 形容词" },
      { n: 3, base: "actual", form: "actually", cat: "adv-ly", rule: "形容词 → 副词" },
      { n: 4, base: "hear", form: "to hear", cat: "verb-inf", rule: "不定式" },
      { n: 5, base: "many", form: "more", cat: "adj-comp", rule: "比较级（不规则）" },
      { n: 6, base: "tell", form: "to tell", cat: "verb-inf", rule: "不定式" },
      { n: 7, base: "difference", form: "differently", cat: "adv-ly", rule: "名词 → 副词（-ently）" },
      { n: 8, base: "chance", form: "chance", cat: "noun-fixed", rule: "名词原形" },
      { n: 9, base: "advantage", form: "advantages", cat: "noun-plural", rule: "可数名词复数" },
      { n: 10, base: "difficult", form: "difficulty", cat: "noun-derive", rule: "形容词 → 名词（-y）" },
    ],
    unused: ["few", "possible"],
  },
  "2024": {
    bank: ["age", "agree", "decide", "follow", "lead", "mean", "perform", "please", "solve", "talent", "they", "wide"],
    blanks: [
      { n: 1, base: "wide", form: "widely", cat: "adv-ly", rule: "形容词 → 副词" },
      { n: 2, base: "follow", form: "to follow", cat: "verb-inf", rule: "不定式" },
      { n: 3, base: "lead", form: "led", cat: "verb-past", rule: "动词过去式（不规则）" },
      { n: 4, base: "talent", form: "talented", cat: "adj-derive", rule: "名词 → 形容词（-ed）" },
      { n: 5, base: "they", form: "them", cat: "pron-obj", rule: "人称代词宾格" },
      { n: 6, base: "please", form: "pleasure", cat: "noun-derive", rule: "动词 → 名词" },
      { n: 7, base: "agree", form: "disagree", cat: "verb-prefix", rule: "否定前缀 dis-" },
      { n: 8, base: "perform", form: "performed", cat: "verb-past", rule: "动词过去式" },
      { n: 9, base: "mean", form: "means", cat: "noun-plural", rule: "名词复数（手段）" },
      { n: 10, base: "age", form: "ages", cat: "noun-plural", rule: "可数名词复数" },
    ],
    unused: ["decide", "solve"],
  },
  "2025": {
    bank: ["after", "busy", "choose", "direct", "enjoy", "expect", "notice", "offer", "outside", "rule", "run", "they"],
    blanks: [
      { n: 1, base: "busy", form: "busy", cat: "adj-fixed", rule: "形容词原级" },
      { n: 2, base: "rule", form: "rule", cat: "noun-fixed", rule: "名词原形" },
      { n: 3, base: "offer", form: "to offer", cat: "verb-inf", rule: "不定式" },
      { n: 4, base: "direct", form: "directly", cat: "adv-ly", rule: "形容词 → 副词" },
      { n: 5, base: "run", form: "has run", cat: "verb-perfect", rule: "现在完成时" },
      { n: 6, base: "expect", form: "expected", cat: "verb-past", rule: "动词过去式/过去分词" },
      { n: 7, base: "outside", form: "outside", cat: "adv-fixed", rule: "副词原位" },
      { n: 8, base: "after", form: "after", cat: "prep-fixed", rule: "介词原位" },
      { n: 9, base: "they", form: "themselves", cat: "pron-reflex", rule: "反身代词" },
      { n: 10, base: "choose", form: "choose", cat: "verb-base", rule: "动词原形（情态/使役后）" },
    ],
    unused: ["enjoy", "notice"],
  },
  "2026": {
    bank: ["army", "be", "challenge", "die", "discover", "keep", "little", "much", "sad", "sudden", "they", "touch"],
    blanks: [
      { n: 61, base: "die", form: "death", cat: "noun-derive", rule: "动词 → 名词（-th）" },
      { n: 62, base: "be", form: "were", cat: "verb-past", rule: "一般过去时（主系表）" },
      { n: 63, base: "sudden", form: "Suddenly", cat: "adv-ly", rule: "形容词 → 副词（句首评注）" },
      { n: 64, base: "discover", form: "discovery", cat: "noun-derive", rule: "动词 → 名词（-y）" },
      { n: 65, base: "little", form: "less", cat: "adj-comp", rule: "比较级（不规则）" },
      { n: 66, base: "they", form: "their", cat: "pron-poss-adj", rule: "形容词性物主代词" },
      { n: 67, base: "sad", form: "sadly", cat: "adv-ly", rule: "副词修饰动词 have" },
      { n: 68, base: "keep", form: "keep", cat: "verb-base", rule: "动词原形（will keep）" },
      { n: 69, base: "touch", form: "to touch", cat: "verb-inf", rule: "not to do 不定式" },
      { n: 70, base: "challenge", form: "challenge", cat: "noun-fixed", rule: "名词原形" },
    ],
    unused: ["army", "much"],
  },
};

const CAT_LABEL = {
  "noun-plural": "名词 · 复数",
  "noun-poss": "名词 · 所有格",
  "noun-derive": "名词 · 派生（-tion/-th/-y 等）",
  "noun-proper": "名词 · 专有/国名",
  "noun-gerund": "名词 · 动名词",
  "noun-fixed": "名词 · 原形",
  "verb-past": "动词 · 过去式/过去分词",
  "verb-passive": "动词 · 被动语态",
  "verb-perfect": "动词 · 完成时",
  "verb-ing": "动词 · -ing",
  "verb-inf": "动词 · 不定式",
  "verb-base": "动词 · 原形",
  "verb-prefix": "动词 · 前缀变形",
  "pron-reflex": "代词 · 反身代词",
  "pron-poss-adj": "代词 · 形容词性物主代词",
  "pron-obj": "代词 · 宾格",
  "adj-derive": "形容词 · 派生",
  "adj-comp": "形容词/副词 · 比较级",
  "adj-super": "形容词/副词 · 最高级",
  "adj-prefix": "形容词 · 前缀",
  "adj-fixed": "形容词 · 原形",
  "adv-ly": "副词 · -ly",
  "adv-derive": "副词 · 其他派生",
  "adv-fixed": "副词 · 原位",
  "conj-fixed": "连词 · 固定",
  "prep-fixed": "介词 · 原位",
  "num-ordinal": "数词 · 序数词",
};

const byCat = {};
const allBases = new Set();
const allForms = new Set();
const baseToCats = {};
let unchangedBlanks = 0;
let transformedBlanks = 0;
const transformCats = new Set();

for (const [year, data] of Object.entries(YEARS)) {
  data.passage = PASSAGES[year] || "";
  data.blanks = data.blanks.map((b) => ({
    ...b,
    slot: passageSlot(b, year),
    prompts: buildPrompts(b, CAT_LABEL[b.cat] || b.cat, year, data.passage, data.bank),
  }));
  for (const b of data.blanks) {
    allBases.add(b.base);
    allForms.add(b.form);
    if (String(b.form) === String(b.base)) {
      unchangedBlanks++;
    } else {
      transformedBlanks++;
      transformCats.add(b.cat);
    }
    if (!byCat[b.cat]) byCat[b.cat] = [];
    byCat[b.cat].push({ ...b, year });
    if (!baseToCats[b.base]) baseToCats[b.base] = new Set();
    baseToCats[b.base].add(b.cat);
  }
}

const summary = {
  meta: {
    title: "2018–2026 成都中考 B 卷短文填空 · 词形变化归类",
    years: Object.keys(YEARS),
    blankCount: Object.values(YEARS).reduce((s, y) => s + y.blanks.length, 0),
    unchangedBlanks,
    transformedBlanks,
    transformTypeCount: transformCats.size,
    uniqueBases: allBases.size,
    uniqueForms: allForms.size,
  },
  CAT_LABEL,
  byYear: YEARS,
  byCategory: Object.fromEntries(
    Object.entries(byCat).map(([cat, items]) => [
      cat,
      {
        label: CAT_LABEL[cat] || cat,
        count: items.length,
        items: items.sort((a, b) => a.year.localeCompare(b.year) || a.n - b.n),
        vocab: [...new Set(items.map((i) => `${i.base} → ${i.form}`))].sort(),
      },
    ])
  ),
  allVocabByBase: [...allBases].sort().map((base) => ({
    base,
    appearances: Object.entries(YEARS).flatMap(([year, d]) =>
      d.blanks.filter((b) => b.base === base).map((b) => ({ year, form: b.form, cat: b.cat }))
    ),
  })),
};

const CAT_GROUP = {
  noun: ["noun-plural", "noun-poss", "noun-derive", "noun-proper", "noun-gerund", "noun-fixed"],
  verb: ["verb-past", "verb-passive", "verb-perfect", "verb-ing", "verb-inf", "verb-base", "verb-prefix"],
  pron: ["pron-reflex", "pron-poss-adj", "pron-obj"],
  adj: ["adj-derive", "adj-comp", "adj-super", "adj-prefix", "adj-fixed"],
  adv: ["adv-ly", "adv-derive", "adv-fixed", "adv-comp"],
  other: ["conj-fixed", "prep-fixed", "num-ordinal"],
};
const CAT_GROUP_LABEL = {
  noun: "名词",
  verb: "动词",
  pron: "代词",
  adj: "形容词",
  adv: "副词",
  other: "连词 / 介词 / 数词",
};

summary.CAT_GROUP = CAT_GROUP;
summary.CAT_GROUP_LABEL = CAT_GROUP_LABEL;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(summary, null, 2), "utf8");
const js = `/**
 * L15 · 2018–2026 成都中考 B 卷词形变化归类
 * 自动生成：node Grammar/scripts/build-word-form-taxonomy.mjs
 */
(function (global) {
  "use strict";
  global.L15WordFormTaxonomy = ${JSON.stringify(summary)};
})(typeof window !== "undefined" ? window : globalThis);
`;
fs.writeFileSync(OUT_JS, js, "utf8");
console.log("Wrote", OUT);
console.log("Wrote", OUT_JS);
console.log("Categories:", Object.keys(byCat).length);
console.log("Unchanged blanks:", unchangedBlanks);
console.log("Transformed blanks:", transformedBlanks);
console.log("Transform types used:", transformCats.size);
console.log("Unique bases:", allBases.size);
