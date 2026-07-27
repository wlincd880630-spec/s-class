#!/usr/bin/env node
/**
 * 将 DeepSeek 语料编译为 l03p-corpus.js / l03p-data.js / l03p-scenes.js / l03p-img.js
 * 并输出配图任务清单 images-todo.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const CORPUS = JSON.parse(fs.readFileSync(path.join(ASSETS, "_deepseek-corpus.json"), "utf8"));

function escJs(s) {
  return JSON.stringify(s == null ? "" : s);
}

function slugify(en) {
  return String(en || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function wordTokens(en) {
  return String(en || "")
    .replace(/[.!?？！。]+$/g, "")
    .replace(/,/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function imgName(prefix, en, i) {
  const s = slugify(en) || "scene-" + i;
  return prefix + s + ".jpg";
}

/** 规范化 scene：补全 word tokens + 图片名 */
const scenes = (CORPUS.sceneSentences || []).map((s, i) => {
  const tokens = wordTokens(s.en);
  const image = imgName("l03p-scene-", s.en, i + 1);
  return { ...s, tokens, image, imageHint: s.imageHint || s.en };
});

function byFocus(f) {
  return scenes.filter((s) => s.focus === f);
}

function pick(arr, n) {
  return (arr || []).slice(0, n);
}

function mapVocab(list, kind) {
  return (list || []).map((v, i) => {
    const example = v.example || v.word;
    const image = imgName("l03p-" + kind + "-", example, i + 1);
    return {
      word: v.word,
      base: v.base || "",
      phonetic: v.phonetic || "",
      zh: v.zh,
      example,
      exampleZh: v.exampleZh || "",
      rule: v.rule || "",
      image,
      imageHint: v.imageHint || example,
      source: v.source || "DeepSeek · 5–6年级",
    };
  });
}

const vocabRegular = mapVocab(CORPUS.vocabRegular, "reg");
const vocabIrregular = mapVocab(CORPUS.vocabIrregular, "irr");
const vocabTime = mapVocab(CORPUS.vocabTime, "time");
const vocabBePast = mapVocab(CORPUS.vocabBePast, "be");

function mapQ(list) {
  return (list || []).map((q) => ({
    q: q.q,
    opts: q.opts,
    ans: q.ans,
    hint: q.hint || "",
    sentence: q.sentence || "",
    zh: q.zh || "",
    source: q.source || "DeepSeek · 小升初",
  }));
}

const qWasWere = mapQ(CORPUS.qWasWere);
const qRegular = mapQ(CORPUS.qRegular);
const qIrregular = mapQ(CORPUS.qIrregular);
const qNeg = mapQ(CORPUS.qNeg);
const qDid = mapQ(CORPUS.qDid);
const qMix = mapQ(CORPUS.qMix);
const matchPairs = CORPUS.matchPairs || [];
const listenPick = CORPUS.listenPick || [];
const classifyItems = (CORPUS.classifyItems || []).map((it) => ({
  text: it.text,
  bucket: it.bucket === "present" ? "present" : "past",
  hint: it.hint || "",
  zh: it.zh || "",
}));

const IRREG_PAST = new Set(
  `was were been went saw ate ran came got gave took made said told thought bought brought caught taught fought found heard held kept left felt met put read sat stood slept spoke wrote drew drove flew grew knew threw wore won began drank sang swam fell hid chose broke woke forgot understood meant spent sent built hurt cut hit let set cost shut spread led fed bled dug hung lit lost paid sold shot stuck struck swept swung wound did had became bent bound crept dealt dreamt fled froze knelt lay laid mistook rode rang rose shook shone shrank sank slid spun sprang stole stung stank strode strung swore wept wove wrung blew`.split(
    /\s+/
  )
);

function hasIrregPast(en) {
  return wordTokens(en).some((t) => IRREG_PAST.has(String(t).toLowerCase()));
}

const sWas = byFocus("was");
const sWere = byFocus("were");
/** 规则页只用真正规则变化句，避免 stood/blew 等混入 */
const sReg = byFocus("regular").filter((s) => !hasIrregPast(s.en));
const sIrr = byFocus("irregular").concat(byFocus("regular").filter((s) => hasIrregPast(s.en)));
const sNeg = byFocus("negative");
const sQ = byFocus("question");
const sTime = byFocus("time");

function S(i, fallbackIdx) {
  return scenes[i] || scenes[fallbackIdx] || scenes[0];
}
function first(arr, i = 0) {
  return arr[i] || scenes[0];
}

/** 关键页配图：精讲页 + 核心练习页优先用 scene；扩展用 vocab 图 */
const heroImages = {};
function useImg(name, hint, en) {
  if (!name) return;
  heroImages[name] = { name, hint: hint || en || name, en: en || "" };
}

scenes.forEach((s) => useImg(s.image, s.imageHint, s.en));
[...vocabRegular, ...vocabIrregular, ...vocabTime, ...vocabBePast].forEach((v) =>
  useImg(v.image, v.imageHint, v.example)
);
useImg("l03p-past-vs-present.jpg", "Split illustration: left yesterday calendar with kids playing football in past, right every day calendar with routine present habits, crayon children book style", "past vs present");
useImg("l03p-playground.jpg", "Colorful elementary school playground with kids, warm afternoon light, crayon children's book illustration", "playground");
useImg("l03p-was-were-chart.jpg", "Friendly classroom chart showing I/He/She/It was and You/We/They were with cute icons, crayon style", "was were chart");

// ---------- corpus.js ----------
const corpusJs = `(function (global) {
  "use strict";
  /** DeepSeek 生成 · 小学 5–6 年级 / 小升初一般过去时语料 */
  var VOCAB_REGULAR = ${JSON.stringify(vocabRegular, null, 2)};
  var VOCAB_IRREGULAR = ${JSON.stringify(vocabIrregular, null, 2)};
  var VOCAB_TIME = ${JSON.stringify(vocabTime, null, 2)};
  var VOCAB_BE = ${JSON.stringify(vocabBePast, null, 2)};
  var Q_WAS_WERE = ${JSON.stringify(qWasWere, null, 2)};
  var Q_REGULAR = ${JSON.stringify(qRegular, null, 2)};
  var Q_IRREGULAR = ${JSON.stringify(qIrregular, null, 2)};
  var Q_NEG = ${JSON.stringify(qNeg, null, 2)};
  var Q_DID = ${JSON.stringify(qDid, null, 2)};
  var Q_MIX = ${JSON.stringify(qMix.concat(qWasWere, qRegular, qIrregular, qNeg, qDid), null, 2)};
  var MATCH_PAIRS = ${JSON.stringify(matchPairs, null, 2)};
  var LISTEN_PICK = ${JSON.stringify(listenPick, null, 2)};

  global.L03pCorpus = {
    vocabRegular: VOCAB_REGULAR,
    vocabIrregular: VOCAB_IRREGULAR,
    vocabTime: VOCAB_TIME,
    vocabBe: VOCAB_BE,
    vocabDaily: VOCAB_REGULAR.concat(VOCAB_IRREGULAR),
    qWasWere: Q_WAS_WERE,
    qRegular: Q_REGULAR,
    qIrregular: Q_IRREGULAR,
    qNeg: Q_NEG,
    qDid: Q_DID,
    qMix: Q_MIX,
    matchPairs: MATCH_PAIRS,
    listenPick: LISTEN_PICK,
  };
})(typeof window !== "undefined" ? window : null);
`;

fs.writeFileSync(path.join(ASSETS, "l03p-corpus.js"), corpusJs, "utf8");

// ---------- scenes.js ----------
const sceneMap = {};
scenes.forEach((s) => {
  sceneMap[s.en] = s.image;
});
const scenesJs = `(function (global) {
  "use strict";
  global.L03pScenes = ${JSON.stringify(sceneMap, null, 2)};
})(typeof window !== "undefined" ? window : null);
`;
fs.writeFileSync(path.join(ASSETS, "l03p-scenes.js"), scenesJs, "utf8");

// ---------- img.js ----------
const imgJs = `(function (global) {
  "use strict";
  var COS =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L03-小学一般过去时/assets/img/";
  global.L03pImg = {
    url: function (name) {
      if (!name) return "";
      if (/^https?:\\/\\//i.test(name)) return name;
      return COS + String(name).replace(/^\\/+/, "");
    },
    local: function (name) {
      return "assets/img/" + String(name || "").replace(/^\\/+/, "");
    },
  };
})(typeof window !== "undefined" ? window : null);
`;
fs.writeFileSync(path.join(ASSETS, "l03p-img.js"), imgJs, "utf8");

// ---------- helper for pages ----------
function scenePage(id, section, title, badge, badgeText, s, lead, verbType) {
  return {
    id,
    section,
    title,
    type: "scene",
    badge,
    badgeText,
    image: s.image,
    lead: lead || "",
    sentence: s.en,
    zh: s.zh,
    verbType: verbType || s.focus,
    source: s.source || "DeepSeek · 5–6年级",
  };
}

const leadAudio = first(sTime.length ? sTime : sWas).en + " " + (first(sReg).en || "");
const pages = [];

pages.push({
  id: "p01",
  section: "导入",
  title: "听一听 · 昨天的故事",
  type: "sound-first",
  badge: "sound",
  badgeText: "🔊 声音先行",
  audio: first(sWas).en + " " + first(sReg).en,
  soundHint: "先听，不要看文字。听完再点「显示」。这些事发生在什么时候？",
  question: "这些句子说的是现在，还是过去？",
  image: first(sWas).image,
  sentence: first(sWas).en,
  zh: first(sWas).zh,
  source: "DeepSeek · 导入",
});

pages.push({
  id: "p02",
  section: "导入",
  title: "苏格拉底 · 昨天还是每天？",
  type: "socratic",
  badge: "ask",
  badgeText: "💭 想一想",
  image: "l03p-past-vs-present.jpg",
  question: "「" + first(sWas).en + "」说的是什么时候？",
  choices: [
    { text: "现在正在发生", correct: false, fb: "正在发生要用现在进行时。" },
    { text: "过去某一时间发生的事", correct: true, fb: "对了！yesterday / last… / ago → 一般过去时！" },
    { text: "每天经常发生", correct: false, fb: "每天经常发生才用一般现在时。" },
  ],
  sentence: first(sWas).en,
  zh: first(sWas).zh,
  source: first(sWas).source,
});

pages.push({
  id: "p03",
  section: "时间标志",
  title: "时间小侦探 · 过去标志词",
  type: "scene",
  badge: "demo",
  badgeText: "🕒 时间",
  image: first(sTime).image,
  lead: "看见 yesterday / last week / … ago，优先想一般过去时！",
  sentence: first(sTime).en,
  zh: first(sTime).zh,
  source: first(sTime).source,
});

pages.push({
  id: "p04",
  section: "时间标志",
  title: "分类游戏 · 过去 vs 现在",
  type: "classify",
  badge: "ask",
  badgeText: "🧺 分类",
  image: "l03p-past-vs-present.jpg",
  lead: "把句子放进正确的篮子",
  buckets: [
    { key: "past", label: "⏪ 一般过去时" },
    { key: "present", label: "🔁 一般现在时" },
  ],
  items: classifyItems.map((it) => ({
    text: it.text,
    bucket: it.bucket,
    hint: it.hint,
    zh: it.zh,
  })),
});

const was1 = first(sWas, 0);
const was2 = first(sWas, 1);
const were1 = first(sWere, 0);
const were2 = first(sWere, 1);

pages.push(scenePage("p05", "was / were", "was · 单数过去", "state", "💙 was", was1, "I / He / She / It / 人名 / 单数 → was", "state"));
pages.push(scenePage("p06", "was / were", "were · 复数过去", "state", "💙 were", were1, "You / We / They / 复数 → were", "state"));
pages.push(scenePage("p07", "was / were", "例句 · was 再练", "state", "💙 was", was2, "人名 / 单数事物用 was", "state"));
pages.push(scenePage("p08", "was / were", "例句 · were 再练", "state", "💙 were", were2, "两个人或复数用 were", "state"));

pages.push({
  id: "p09",
  section: "was / were",
  title: "was / were 配对",
  type: "be-match",
  badge: "demo",
  badgeText: "🔗 配对",
  image: "l03p-was-were-chart.jpg",
  lead: "记住：I/He/She/It → was；You/We/They → were",
  chart: [
    { subjects: "I / He / She / It / 人名 / 单数", be: "was" },
    { subjects: "You / We / They / 复数", be: "were" },
    { subjects: "否定", be: "wasn't / weren't" },
  ],
  beOpts: ["was", "were", "is"],
  drill: pick(qWasWere, 5).map((q) => ({
    subject: (q.sentence || q.q).split(/\s+/)[0],
    ans: q.opts[q.ans],
    sentence: q.sentence,
    zh: q.zh,
  })),
});

pages.push({
  id: "p10",
  section: "was / were",
  title: "苏格拉底 · was 还是 were",
  type: "socratic",
  badge: "ask",
  badgeText: "💭 was/were",
  image: were1.image,
  question: "「" + (were1.en.replace(/were|was/i, "_____")) + "」选哪个？",
  choices: [
    { text: "was", correct: false, fb: "主语若是复数或 You/We/They，要用 were。" },
    { text: "were", correct: true, fb: "太棒了！复数 / You/We/They → were。" },
    { text: "is", correct: false, fb: "is 是现在时，过去要用 was/were。" },
  ],
  sentence: were1.en,
  zh: were1.zh,
});

/** 对比页专用：必须是 play → played，不能被语料首句冲掉 */
const playPast =
  sReg.find((s) => /\bplayed\b/i.test(s.en) && /\bfootball\b/i.test(s.en)) ||
  sReg.find((s) => /\bplayed\b/i.test(s.en)) ||
  first(sReg, 0);
const reg1 = playPast;
const reg2 = first(
  sReg.filter((s) => s !== playPast),
  0
);
/** 不规则导入句优先 go → went */
const goPast =
  sIrr.find((s) => /\bwent\b/i.test(s.en)) ||
  first(sIrr, 0);
const irr1 = goPast;
const irr2 = first(
  sIrr.filter((s) => s !== goPast),
  0
);

pages.push({
  id: "p11",
  section: "规则动词",
  title: "对比发现 · play → played",
  type: "discover",
  badge: "demo",
  badgeText: "🔍 自我发现",
  lead: "点击左右卡片听句子，再点「我发现了」对比动词变化。",
  leftImage: "l03p-playground.jpg",
  leftLabel: "I play football every day.",
  rightImage: playPast.image,
  rightLabel: playPast.en,
  leftSentence: "I play football every day.",
  leftZh: "我每天踢足球。",
  rightSentence: playPast.en,
  rightZh: playPast.zh,
  morphBase: "play",
  morphPast: "played",
  morphHighlight: "ed",
  morphSpeak: "I play football every day. " + playPast.en,
  discovery: "发现了吗？过去发生的动作，规则动词要加 -ed：play → played！",
});

pages.push(scenePage("p12", "规则动词", "规则动词例句 ①", "action", "🏃 +ed", reg1, "规则变化：原形 + ed", "action"));
pages.push(scenePage("p13", "规则动词", "规则动词例句 ②", "action", "🏃 +ed", reg2, "注意时间标志词", "action"));

const spellSamples = [
  {
    tab: "规则① +ed",
    rule: "大多数规则动词直接加 ed",
    examples: [
      { from: "play", to: "played" },
      { from: "watch", to: "watched" },
      { from: "clean", to: "cleaned" },
      { from: "want", to: "wanted" },
    ],
    sample: "Lily played football with her friends in the park yesterday.",
    sampleZh: "莉莉昨天和朋友们在公园踢足球。",
    sampleImage: playPast.image,
    focusVerb: "played",
  },
  {
    tab: "规则② +d",
    rule: "以不发音 e 结尾，只加 d",
    examples: [
      { from: "live", to: "lived" },
      { from: "like", to: "liked" },
      { from: "hope", to: "hoped" },
    ],
    sample: "Emma liked the colorful lanterns at the festival last night.",
    sampleZh: "艾玛昨晚很喜欢节日里那些彩色的灯笼。",
    sampleImage: imgName("l03p-scene-", "Emma liked the colorful lanterns at the festival last night.", 901),
    focusVerb: "liked",
  },
  {
    tab: "规则③ y→ied",
    rule: "辅音 + y 结尾：变 y 为 i 再加 ed",
    examples: [
      { from: "study", to: "studied" },
      { from: "carry", to: "carried" },
      { from: "try", to: "tried" },
    ],
    sample: "Han Lin studied English in the quiet library yesterday evening.",
    sampleZh: "韩林昨天晚上在安静的图书馆学英语。",
    sampleImage: imgName("l03p-scene-", "Han Lin studied English in the quiet library yesterday evening.", 902),
    focusVerb: "studied",
  },
  {
    tab: "规则④ 双写",
    rule: "短元音 + 单辅音结尾，双写辅音再加 ed",
    examples: [
      { from: "stop", to: "stopped" },
      { from: "plan", to: "planned" },
      { from: "shop", to: "shopped" },
    ],
    sample: "The yellow school bus stopped in front of the gate yesterday.",
    sampleZh: "黄色校车昨天停在校门口。",
    sampleImage: imgName("l03p-scene-", "The yellow school bus stopped in front of the gate yesterday.", 903),
    focusVerb: "stopped",
  },
];
spellSamples.forEach((r) => useImg(r.sampleImage, r.sample, r.sample));

pages.push({
  id: "p14",
  section: "规则动词",
  title: "拼写实验室 · -ed 规律",
  type: "spelling",
  badge: "demo",
  badgeText: "✏️ 规律",
  image: spellSamples[0].sampleImage,
  lead: "点开每条规律，看动词变化，再读匹配的例句。",
  rules: spellSamples,
});

pages.push({
  id: "p15",
  section: "规则动词",
  title: "规则动词小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: reg1.image,
  ...(qRegular[0] || { q: "Lily ___ football yesterday.", opts: ["play", "played", "playing"], ans: 1, hint: "yesterday → 过去式", sentence: reg1.en, zh: reg1.zh }),
});

pages.push({
  id: "p16",
  section: "规则动词",
  title: "规则动词小测 ②",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: reg2.image,
  ...(qRegular[1] || qRegular[0]),
});

pages.push(scenePage("p17", "不规则动词", "不规则 · went", "action", "⚡ 不规则", irr1, "不规则动词要整词记忆：go → went", "action"));
pages.push(scenePage("p18", "不规则动词", "不规则 · 再练", "action", "⚡ 不规则", irr2, "看图说过去：发生了什么？", "action"));

pages.push({
  id: "p19",
  section: "不规则动词",
  title: "不规则动词词汇卡",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabIrregular",
  lead: "小升初高频不规则：go/see/have/eat/take/write/come/make/buy/think…",
  image: irr1.image,
});

pages.push({
  id: "p20",
  section: "不规则动词",
  title: "不规则小测 ①",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: irr1.image,
  ...(qIrregular[0] || {}),
});

pages.push({
  id: "p21",
  section: "不规则动词",
  title: "不规则小测 ②",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: irr2.image,
  ...(qIrregular[1] || qIrregular[0] || {}),
});

pages.push({
  id: "p22",
  section: "不规则动词",
  title: "配对 · 原形 ↔ 过去式句子",
  type: "match-pairs",
  badge: "game",
  badgeText: "🔗 配对",
  pool: "matchPairs",
  image: "l03p-playground.jpg",
  pairs: matchPairs,
});

const neg1 = first(sNeg, 0);
const neg2 = first(sNeg, 1);
const q1 = first(sQ, 0);
const q2 = first(sQ, 1);

pages.push({
  id: "p23",
  section: "否定句",
  title: "动态演示 · didn't",
  type: "dynamic",
  badge: "demo",
  badgeText: "🎬 动态",
  image: neg1.image,
  lead: "否定：did not / didn't + 动词原形（不是过去式！）",
  steps: [
    { html: '<span class="l03p-token l03p-token--subj">Lily</span><span class="l03p-token l03p-token--verb">played</span><span class="l03p-token l03p-token--obj">football</span>', speak: reg1.en },
    { html: "<span class=\"l03p-token l03p-token--subj\">Lily</span><span class=\"l03p-token l03p-token--aux\">didn't</span><span class=\"l03p-token l03p-token--verb\">play</span><span class=\"l03p-token l03p-token--obj\">football</span>", speak: neg1.en },
  ],
  sentence: neg1.en,
  zh: neg1.zh,
});

pages.push(scenePage("p24", "否定句", "例句 · didn't", "neg", "🚫 否定", neg1, "didn't 后面用原形", "action"));
pages.push(scenePage("p25", "否定句", "例句 · wasn't / didn't", "neg", "🚫 否定", neg2, "be 用 wasn't/weren't；实义动词用 didn't", "action"));

pages.push({
  id: "p26",
  section: "否定句",
  title: "否定小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: neg1.image,
  ...(qNeg[0] || {}),
});

pages.push({
  id: "p27",
  section: "疑问句",
  title: "动态演示 · Did",
  type: "dynamic",
  badge: "demo",
  badgeText: "🎬 动态",
  image: q1.image,
  lead: "疑问：Did + 主语 + 动词原形？",
  steps: [
    { html: '<span class="l03p-token l03p-token--subj">Tom</span><span class="l03p-token l03p-token--verb">went</span><span class="l03p-token l03p-token--obj">to the park</span>', speak: irr1.en },
    { html: '<span class="l03p-token l03p-token--aux l03p-token--fly">Did</span><span class="l03p-token l03p-token--subj">Tom</span><span class="l03p-token l03p-token--verb">go</span><span class="l03p-token l03p-token--obj">to the park</span><span class="l03p-token">?</span>', speak: q1.en },
  ],
  sentence: q1.en,
  zh: q1.zh,
});

pages.push(scenePage("p28", "疑问句", "例句 · Did ①", "q", "❓ 疑问", q1, "Did 后动词用原形", "q"));
pages.push(scenePage("p29", "疑问句", "例句 · Did ②", "q", "❓ 疑问", q2, "回答：Yes, … did. / No, … didn't.", "q"));

pages.push({
  id: "p30",
  section: "疑问句",
  title: "疑问小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: q1.image,
  ...(qDid[0] || {}),
});

// 综合练习
pages.push({
  id: "p31",
  section: "综合练习",
  title: "看图造句 ①",
  type: "picture-build",
  badge: "action",
  badgeText: "🧩 造句",
  image: reg1.image,
  instruction: "单词已打乱。点选填入空格，组成正确过去时句子：",
  tokens: reg1.tokens,
  sentence: reg1.en,
  zh: reg1.zh,
});

pages.push({
  id: "p32",
  section: "综合练习",
  title: "听音排序 ①",
  type: "listen-order",
  badge: "sound",
  badgeText: "🎧 听音",
  image: irr1.image,
  audio: irr1.en,
  tokens: irr1.tokens,
  sentence: irr1.en,
  zh: irr1.zh,
});

pages.push({
  id: "p33",
  section: "综合练习",
  title: "was/were 小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: was1.image,
  ...(qWasWere[2] || qWasWere[0] || {}),
});

pages.push({
  id: "p34",
  section: "综合练习",
  title: "看图造句 ②",
  type: "picture-build",
  badge: "state",
  badgeText: "🧩 造句",
  image: was1.image,
  instruction: "组成 was/were 句子：",
  tokens: was1.tokens,
  sentence: was1.en,
  zh: was1.zh,
});

pages.push({
  id: "p35",
  section: "综合练习",
  title: "听音排序 ②",
  type: "listen-order",
  badge: "sound",
  badgeText: "🎧 听音",
  image: q1.image,
  audio: q1.en,
  tokens: q1.tokens,
  sentence: q1.en,
  zh: q1.zh,
});

pages.push({
  id: "p36",
  section: "综合练习",
  title: "终极小测",
  type: "quiz",
  badge: "ask",
  badgeText: "🏆 终极",
  image: neg1.image,
  ...(qMix[0] || qNeg[1] || qNeg[0] || {}),
});

pages.push({
  id: "p37",
  section: "课堂练习",
  title: "课堂练习中心",
  type: "practice-hub",
  badge: "game",
  badgeText: "🎮 练习",
  image: "l03p-playground.jpg",
  lead: "选择一种练习模式，巩固一般过去时！语料由 DeepSeek 生成，对齐 5–6 年级 + 小升初。",
  modes: [
    { icon: "📖", title: "词汇拓展", desc: "p38-40", href: "p38.html" },
    { icon: "🖼", title: "拓展例句", desc: "p41-44", href: "p41.html" },
    { icon: "📝", title: "套题练习", desc: "p45-47", href: "p45.html" },
    { icon: "⏱", title: "限时挑战", desc: "p48-50", href: "p48.html" },
    { icon: "🔥", title: "连对闯关", desc: "p51-52", href: "p51.html" },
    { icon: "🔗", title: "配对游戏", desc: "p53", href: "p53.html" },
    { icon: "🎧", title: "听音快选", desc: "p54-55", href: "p54.html" },
    { icon: "🧩", title: "看图造句", desc: "p56", href: "p56.html" },
    { icon: "🎵", title: "听音排序", desc: "p57", href: "p57.html" },
    { icon: "🏆", title: "终极闯关", desc: "p58-60", href: "p58.html" },
  ],
});

pages.push({
  id: "p38",
  section: "词汇拓展",
  title: "规则动词词汇卡",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabRegular",
  lead: "规则过去式 · 可点词查 DeepSeek 词典",
  image: reg1.image,
});

pages.push({
  id: "p39",
  section: "词汇拓展",
  title: "不规则动词词汇卡",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabIrregular",
  lead: "小升初高频不规则动词",
  image: irr1.image,
});

pages.push({
  id: "p40",
  section: "词汇拓展",
  title: "时间标志词",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabTime",
  lead: "yesterday / last week / … ago",
  image: first(sTime).image,
});

const extraScenes = scenes.filter((s) => ![reg1, irr1, was1, were1, neg1, q1].includes(s)).slice(0, 4);
while (extraScenes.length < 4) extraScenes.push(scenes[extraScenes.length % scenes.length]);

extraScenes.forEach((s, i) => {
  pages.push(
    scenePage(
      "p" + String(41 + i),
      "拓展例句",
      "拓展例句 · " + (s.focus || "past"),
      s.focus === "was" || s.focus === "were" ? "state" : "action",
      s.focus === "was" || s.focus === "were" ? "💙 be过去" : "🖼 例句",
      s,
      "DeepSeek 语料 · " + (s.source || ""),
      s.focus
    )
  );
});

function multiFrom(pool, n) {
  return pick(pool, n).map((q) => ({ q: q.q, opts: q.opts, ans: q.ans }));
}

pages.push({
  id: "p45",
  section: "套题练习",
  title: "课堂套题 ① · was/were",
  type: "multi-quiz",
  badge: "ask",
  badgeText: "📝 套题",
  image: "l03p-was-were-chart.jpg",
  lead: "共 6 题 · was / were",
  questions: multiFrom(qWasWere, 6),
});

pages.push({
  id: "p46",
  section: "套题练习",
  title: "课堂套题 ② · 规则与不规则",
  type: "multi-quiz",
  badge: "ask",
  badgeText: "📝 套题",
  image: irr1.image,
  lead: "共 6 题",
  questions: multiFrom(qRegular, 3).concat(multiFrom(qIrregular, 3)),
});

pages.push({
  id: "p47",
  section: "套题练习",
  title: "课堂套题 ③ · 综合",
  type: "multi-quiz",
  badge: "ask",
  badgeText: "📝 套题",
  image: "l03p-playground.jpg",
  lead: "共 8 题 · 小升初难度",
  questions: multiFrom(qMix, 8),
});

pages.push({
  id: "p48",
  section: "限时挑战",
  title: "限时 · was/were 45秒",
  type: "timed-quiz",
  badge: "timed",
  badgeText: "⏱ 限时",
  pool: "qWasWere",
  seconds: 45,
  perQuestion: 10,
  pass: 4,
  lead: "每题约 10 秒！",
});

pages.push({
  id: "p49",
  section: "限时挑战",
  title: "限时 · 规则动词 60秒",
  type: "timed-quiz",
  badge: "timed",
  badgeText: "⏱ 限时",
  pool: "qRegular",
  seconds: 60,
  perQuestion: 10,
  pass: 5,
});

pages.push({
  id: "p50",
  section: "限时挑战",
  title: "限时 · 综合 60秒",
  type: "timed-quiz",
  badge: "timed",
  badgeText: "⏱ 限时",
  pool: "qMix",
  seconds: 60,
  perQuestion: 10,
  pass: 5,
});

pages.push({
  id: "p51",
  section: "连对闯关",
  title: "连对闯关 · 不规则",
  type: "streak-quiz",
  badge: "game",
  badgeText: "🔥 连对",
  pool: "qIrregular",
  target: 5,
  lead: "连续答对 5 题通关！",
});

pages.push({
  id: "p52",
  section: "连对闯关",
  title: "连对闯关 · didn't / Did",
  type: "streak-quiz",
  badge: "game",
  badgeText: "🔥 连对",
  pool: "qDid",
  target: 5,
});

pages.push({
  id: "p53",
  section: "配对游戏",
  title: "中英配对",
  type: "match-pairs",
  badge: "game",
  badgeText: "🔗 配对",
  pool: "matchPairs",
  image: "l03p-playground.jpg",
  pairs: matchPairs,
});

pages.push({
  id: "p54",
  section: "听音快选",
  title: "听音快选 ①",
  type: "listen-pick",
  badge: "sound",
  badgeText: "🎧 听音",
  pool: "listenPick",
  startIndex: 0,
  image: first(sWas).image,
});

pages.push({
  id: "p55",
  section: "听音快选",
  title: "听音快选 ②",
  type: "listen-pick",
  badge: "sound",
  badgeText: "🎧 听音",
  pool: "listenPick",
  startIndex: 3,
  image: irr1.image,
});

pages.push({
  id: "p56",
  section: "课堂游戏",
  title: "看图造句 ③",
  type: "picture-build",
  badge: "action",
  badgeText: "🧩 造句",
  image: first(sIrr, 2).image,
  instruction: "单词已打乱。点选填入，组成正确句子：",
  tokens: first(sIrr, 2).tokens,
  sentence: first(sIrr, 2).en,
  zh: first(sIrr, 2).zh,
});

pages.push({
  id: "p57",
  section: "课堂游戏",
  title: "听音排序 ③",
  type: "listen-order",
  badge: "sound",
  badgeText: "🎧 听音",
  image: neg1.image,
  audio: neg1.en,
  tokens: neg1.tokens,
  sentence: neg1.en,
  zh: neg1.zh,
});

pages.push({
  id: "p58",
  section: "终极闯关",
  title: "听音快选 ③ · 五题连战",
  type: "listen-pick",
  badge: "sound",
  badgeText: "🎧 听音",
  pool: "listenPick",
  rounds: 5,
  image: "l03p-playground.jpg",
});

pages.push({
  id: "p59",
  section: "终极闯关",
  title: "限时综合 · 90秒",
  type: "timed-quiz",
  badge: "timed",
  badgeText: "⏱ 限时",
  pool: "qMix",
  seconds: 90,
  perQuestion: 10,
  pass: 7,
});

pages.push({
  id: "p60",
  section: "终极闯关",
  title: "连对 · 综合 8 连击",
  type: "streak-quiz",
  badge: "game",
  badgeText: "🔥 连对",
  pool: "qMix",
  target: 8,
});

pages.push({
  id: "p61",
  section: "小结",
  title: "本讲小结 · 一般过去时",
  type: "summary",
  badge: "demo",
  badgeText: "📌 小结",
  image: "l03p-past-vs-present.jpg",
  checklist: [
    "时间标志：yesterday / last… / … ago → 一般过去时",
    "be：I/He/She/It → was；You/We/They → were",
    "规则动词：+ed / +d / y→ied / 双写+ed",
    "不规则：go→went, see→saw, have→had…（整词记）",
    "否定：didn't + 原形；wasn't / weren't",
    "疑问：Did + 主语 + 原形？",
  ],
  chant: "Yesterday I played.\\nLast week we went.\\nI didn't cry —\\nDid you smile then?",
  chantSpeak: "Yesterday I played. Last week we went. I didn't cry. Did you smile then?",
});

const dataJs = `(function (global) {
  "use strict";
  var PAGES = ${JSON.stringify(pages, null, 2)};
  global.L03pData = {
    pages: PAGES,
    total: PAGES.length,
    byId: function (id) {
      for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return PAGES[i];
      return null;
    },
    indexOf: function (id) {
      for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return i;
      return -1;
    },
  };
})(typeof window !== "undefined" ? window : null);
`;

fs.writeFileSync(path.join(ASSETS, "l03p-data.js"), dataJs, "utf8");

/** 配图任务：优先页面实际用到的图 */
const used = new Set();
pages.forEach((p) => {
  if (p.image) used.add(p.image);
  if (p.leftImage) used.add(p.leftImage);
  if (p.rightImage) used.add(p.rightImage);
});
Object.values(heroImages).forEach((h) => {
  if (used.has(h.name)) return;
});

const todo = [...used].map((name) => {
  const meta = heroImages[name] || { name, hint: name, en: "" };
  return {
    filename: name,
    sentence: meta.en || "",
    prompt:
      "Children's educational crayon illustration, warm paper texture, soft colors, clear focal subject, no text, no watermark, friendly elementary-school textbook style. Scene: " +
      (meta.hint || meta.en || name),
  };
});

fs.writeFileSync(path.join(ASSETS, "images-todo.json"), JSON.stringify(todo, null, 2), "utf8");

console.log("pages:", pages.length);
console.log("images todo:", todo.length);
console.log("wrote corpus/data/scenes/img + images-todo.json");
