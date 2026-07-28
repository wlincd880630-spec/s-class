#!/usr/bin/env node
/**
 * 将 DeepSeek 语料编译为 l02p-corpus.js / l02p-data.js / l02p-scenes.js / l02p-img.js
 * 并输出配图任务清单 images-todo.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const CORPUS = JSON.parse(fs.readFileSync(path.join(ASSETS, "_deepseek-corpus.json"), "utf8"));

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
  const image = imgName("l02p-scene-", s.en, i + 1);
  return { ...s, tokens, image, imageHint: s.imageHint || s.en };
});

function byFocus(f) {
  return scenes.filter((s) => s.focus === f);
}

function pick(arr, n) {
  return (arr || []).slice(0, n);
}

function first(arr, i = 0) {
  return arr[i] || scenes[0];
}

function mapVocab(list, kind) {
  return (list || []).map((v, i) => {
    const example = v.example || v.word;
    const image = imgName("l02p-" + kind + "-", example, i + 1);
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

const vocabIng = mapVocab(CORPUS.vocabIng, "ing");
const vocabMarkers = mapVocab(CORPUS.vocabMarkers, "marker");
const vocabStative = mapVocab(CORPUS.vocabStative, "stat");
const vocabBe = mapVocab(CORPUS.vocabBe, "be");

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

const qBeIng = mapQ(CORPUS.qBeIng);
const qSpelling = mapQ(CORPUS.qSpelling);
const qNeg = mapQ(CORPUS.qNeg);
const qQuestion = mapQ(CORPUS.qQuestion);
const qMix = mapQ(CORPUS.qMix);
const matchPairs = CORPUS.matchPairs || [];
const listenPick = CORPUS.listenPick || [];
const classifyItems = (CORPUS.classifyItems || []).map((it) => ({
  text: it.text || it.sentence || "",
  bucket: it.bucket === "simple" || it.tense === "simple" ? "simple" : "continuous",
  hint: it.hint || "",
  zh: it.zh || "",
}));

const sAmIsAre = byFocus("am-is-are");
const sIng = byFocus("ing-spelling");
const sNow = byFocus("now-marker");
const sNeg = byFocus("negative");
const sQ = byFocus("question");
const sStative = byFocus("stative");
const sContrast = byFocus("simple-contrast");

function mainIngVerb(en) {
  const toks = wordTokens(en);
  for (const t of toks) {
    const low = String(t).toLowerCase();
    if (/ing$/i.test(low)) return low;
  }
  return "doing";
}

function normalizeNeg(s) {
  if (!s) return s;
  const out = { ...s };
  let en = String(out.en || "");
  en = en.replace(/\bI am not\b/gi, "I'm not");
  en = en.replace(/\bis not\b/gi, "isn't");
  en = en.replace(/\bare not\b/gi, "aren't");
  out.en = en;
  out.tokens = wordTokens(en);
  return out;
}

/** 关键页配图：精讲页 + 核心练习页优先用 scene；扩展用 vocab 图 */
const heroImages = {};
function useImg(name, hint, en) {
  if (!name) return;
  heroImages[name] = { name, hint: hint || en || name, en: en || "" };
}

scenes.forEach((s) => useImg(s.image, s.imageHint, s.en));
[...vocabIng, ...vocabMarkers, ...vocabStative, ...vocabBe].forEach((v) =>
  useImg(v.image, v.imageHint, v.example)
);
useImg(
  "l02p-continuous-vs-simple.jpg",
  "Split illustration: left now with kids playing football in present continuous, right every day calendar with routine simple present habits, crayon children book style",
  "continuous vs simple"
);
useImg(
  "l02p-playground.jpg",
  "Colorful elementary school playground with kids, warm afternoon light, crayon children's book illustration",
  "playground"
);
useImg(
  "l02p-am-is-are-chart.jpg",
  "Friendly classroom chart showing I am, He/She/It is, You/We/They are with cute icons, crayon style",
  "am is are chart"
);

// ---------- corpus.js ----------
const corpusJs = `(function (global) {
  "use strict";
  /** DeepSeek 生成 · 小学 5–6 年级 / 小升初现在进行时语料 */
  var VOCAB_ING = ${JSON.stringify(vocabIng, null, 2)};
  var VOCAB_MARKERS = ${JSON.stringify(vocabMarkers, null, 2)};
  var VOCAB_STATIVE = ${JSON.stringify(vocabStative, null, 2)};
  var VOCAB_BE = ${JSON.stringify(vocabBe, null, 2)};
  var Q_BE_ING = ${JSON.stringify(qBeIng, null, 2)};
  var Q_SPELLING = ${JSON.stringify(qSpelling, null, 2)};
  var Q_NEG = ${JSON.stringify(qNeg, null, 2)};
  var Q_QUESTION = ${JSON.stringify(qQuestion, null, 2)};
  var Q_MIX = ${JSON.stringify(qMix.concat(qBeIng, qSpelling, qNeg, qQuestion), null, 2)};
  var MATCH_PAIRS = ${JSON.stringify(matchPairs, null, 2)};
  var LISTEN_PICK = ${JSON.stringify(listenPick, null, 2)};

  global.L02pCorpus = {
    vocabIng: VOCAB_ING,
    vocabMarkers: VOCAB_MARKERS,
    vocabStative: VOCAB_STATIVE,
    vocabBe: VOCAB_BE,
    vocabRegular: VOCAB_ING,
    vocabTime: VOCAB_MARKERS,
    vocabIrregular: VOCAB_STATIVE,
    vocabDaily: VOCAB_ING,
    qBeIng: Q_BE_ING,
    qSpelling: Q_SPELLING,
    qNeg: Q_NEG,
    qQuestion: Q_QUESTION,
    qMix: Q_MIX,
    matchPairs: MATCH_PAIRS,
    listenPick: LISTEN_PICK,
  };
})(typeof window !== "undefined" ? window : null);
`;

fs.writeFileSync(path.join(ASSETS, "l02p-corpus.js"), corpusJs, "utf8");

// ---------- scenes.js ----------
const sceneMap = {};
scenes.forEach((s) => {
  sceneMap[s.en] = s.image;
});
const scenesJs = `(function (global) {
  "use strict";
  global.L02pScenes = ${JSON.stringify(sceneMap, null, 2)};
})(typeof window !== "undefined" ? window : null);
`;
fs.writeFileSync(path.join(ASSETS, "l02p-scenes.js"), scenesJs, "utf8");

// ---------- img.js ----------
const imgJs = `(function (global) {
  "use strict";
  var COS =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L02-小学现在进行时/assets/img/";
  global.L02pImg = {
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
fs.writeFileSync(path.join(ASSETS, "l02p-img.js"), imgJs, "utf8");

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

const pages = [];

const am1 = first(sAmIsAre, 0);
const is1 = first(sAmIsAre, 1);
const is2 = first(sAmIsAre, 2);
const are1 = first(sAmIsAre, 3);

pages.push({
  id: "p01",
  section: "导入",
  title: "听一听 · 正在发生的事",
  type: "sound-first",
  badge: "sound",
  badgeText: "🔊 声音先行",
  audio: am1.en + " " + is1.en,
  soundHint: "先听，不要看文字。听完再点「显示」。这些事发生在什么时候？",
  question: "这些句子说的是「此刻正在做」，还是「每天的习惯」？",
  image: am1.image,
  sentence: am1.en,
  zh: am1.zh,
  source: "DeepSeek · 导入",
});

pages.push({
  id: "p02",
  section: "导入",
  title: "苏格拉底 · 此刻还是每天？",
  type: "socratic",
  badge: "ask",
  badgeText: "💭 想一想",
  image: "l02p-continuous-vs-simple.jpg",
  question: "「" + am1.en + "」说的是什么时候？",
  choices: [
    { text: "现在正在发生", correct: true, fb: "对了！now / look / listen → 现在进行时！" },
    { text: "过去某一时间发生的事", correct: false, fb: "过去发生的事要用一般过去时。" },
    { text: "每天经常发生", correct: false, fb: "每天经常发生才用一般现在时。" },
  ],
  sentence: am1.en,
  zh: am1.zh,
  source: am1.source,
});

pages.push({
  id: "p03",
  section: "时间标志",
  title: "时间小侦探 · now 标志词",
  type: "scene",
  badge: "demo",
  badgeText: "🕒 时间",
  image: first(sNow).image,
  lead: "看见 now / look / listen / at the moment / right now，优先想现在进行时！",
  sentence: first(sNow).en,
  zh: first(sNow).zh,
  source: first(sNow).source,
});

pages.push({
  id: "p04",
  section: "时间标志",
  title: "分类游戏 · 进行时 vs 一般现在时",
  type: "classify",
  badge: "ask",
  badgeText: "🧺 分类",
  image: "l02p-continuous-vs-simple.jpg",
  lead: "把句子放进正确的篮子",
  buckets: [
    { key: "continuous", label: "🔄 现在进行时" },
    { key: "simple", label: "🔁 一般现在时" },
  ],
  items: classifyItems.map((it) => ({
    text: it.text,
    bucket: it.bucket,
    hint: it.hint,
    zh: it.zh,
  })),
});

pages.push(scenePage("p05", "am / is / are", "am · 第一人称", "state", "💙 am", am1, "I → am + V-ing", "state"));
pages.push(scenePage("p06", "am / is / are", "is · 第三人称单数", "state", "💙 is", is1, "He / She / It / 人名 / 单数 → is", "state"));
pages.push(scenePage("p07", "am / is / are", "例句 · is 再练", "state", "💙 is", is2, "单数主语用 is + V-ing", "state"));
pages.push(scenePage("p08", "am / is / are", "are · 复数", "state", "💙 are", are1, "You / We / They / 复数 → are", "state"));

/** p09 配对：主语必须是完整名词短语，答案只能是 am/is/are */
const BE_MATCH_DRILL = [
  { subject: "I", ans: "am", sentence: "I am reading a storybook in the library now.", zh: "我现在正在图书馆里读故事书。" },
  { subject: "My mother", ans: "is", sentence: "My mother is cooking dinner in the kitchen now.", zh: "我的妈妈现在正在厨房做晚饭。" },
  { subject: "My parents", ans: "are", sentence: "My parents are watching TV in the living room.", zh: "我的父母正在客厅看电视。" },
  { subject: "Tom", ans: "is", sentence: "Tom is swimming in the pool right now.", zh: "汤姆现在正在游泳池里游泳。" },
  { subject: "The boys", ans: "are", sentence: "The boys are playing football on the playground.", zh: "男孩们正在操场上踢足球。" },
  { subject: "Tom and Lily", ans: "are", sentence: "Tom and Lily are dancing in the music room.", zh: "汤姆和莉莉正在音乐室里跳舞。" },
  { subject: "We", ans: "are", sentence: "We are having an English class now.", zh: "我们现在正在上英语课。" },
];

pages.push({
  id: "p09",
  section: "am / is / are",
  title: "am / is / are 配对",
  type: "be-match",
  badge: "demo",
  badgeText: "🔗 配对",
  image: "l02p-am-is-are-chart.jpg",
  lead: "看主语选 be：I → am；单数（He/She/人名/My mother）→ is；复数（We/They/My parents）→ are",
  chart: [
    { subjects: "I", be: "am" },
    { subjects: "He / She / It / 人名 / My mother（单数）", be: "is" },
    { subjects: "You / We / They / My parents / Tom and Lily（复数）", be: "are" },
    { subjects: "否定", be: "isn't / aren't / am not" },
  ],
  beOpts: ["am", "is", "are"],
  drill: BE_MATCH_DRILL,
});

pages.push({
  id: "p10",
  section: "am / is / are",
  title: "苏格拉底 · am / is / are",
  type: "socratic",
  badge: "ask",
  badgeText: "💭 am/is/are",
  image: are1.image,
  question: "「" + are1.en.replace(/\bare\b/i, "_____") + "」选哪个？",
  choices: [
    { text: "am", correct: false, fb: "am 只用于 I。" },
    { text: "is", correct: false, fb: "is 用于单数主语，They 要用 are。" },
    { text: "are", correct: true, fb: "太棒了！They / You / We → are。" },
  ],
  sentence: are1.en,
  zh: are1.zh,
});

/** 对比页专用：必须是 play → playing */
const playCont =
  sAmIsAre.find((s) => /\bplaying\b/i.test(s.en) && /\bfootball\b/i.test(s.en)) ||
  sAmIsAre.find((s) => /\bplaying\b/i.test(s.en)) ||
  first(sAmIsAre, 2);
const ing1 = first(sIng, 0);
const ing2 = first(sIng.filter((s) => s !== ing1), 0);

pages.push({
  id: "p11",
  section: "V-ing 形式",
  title: "对比发现 · play → playing",
  type: "discover",
  badge: "demo",
  badgeText: "🔍 自我发现",
  lead: "点击左右卡片听句子，再点「我发现了」对比动词变化。",
  leftImage: "l02p-playground.jpg",
  leftLabel: "I play football every day.",
  rightImage: playCont.image,
  rightLabel: playCont.en,
  leftSentence: "I play football every day.",
  leftZh: "我每天踢足球。",
  rightSentence: playCont.en,
  rightZh: playCont.zh,
  morphBase: "play",
  morphPast: "playing",
  morphHighlight: "ing",
  morphSpeak: "I play football every day. " + playCont.en,
  discovery: "发现了吗？此刻正在发生的动作，要用 be + V-ing：play → playing！",
});

pages.push(scenePage("p12", "V-ing 形式", "进行时例句 ①", "action", "🏃 V-ing", ing1, "动词加 -ing，前面加 am/is/are", "action"));
pages.push(scenePage("p13", "V-ing 形式", "进行时例句 ②", "action", "🏃 V-ing", ing2, "注意 now / look 等时间标志词", "action"));

const spellSamples = [
  {
    tab: "规则① +ing",
    rule: "大多数动词直接加 ing",
    examples: [
      { from: "play", to: "playing" },
      { from: "read", to: "reading" },
      { from: "sing", to: "singing" },
      { from: "draw", to: "drawing" },
    ],
    sample: playCont.en,
    sampleZh: playCont.zh,
    sampleImage: playCont.image,
    focusVerb: "playing",
  },
  {
    tab: "规则② 去e+ing",
    rule: "以不发音 e 结尾，去 e 加 ing",
    examples: [
      { from: "write", to: "writing" },
      { from: "dance", to: "dancing" },
      { from: "make", to: "making" },
    ],
    sample: "Lily is writing a letter to her grandma.",
    sampleZh: "莉莉正在给奶奶写信。",
    sampleImage: imgName("l02p-scene-", "Lily is writing a letter to her grandma.", 901),
    focusVerb: "writing",
  },
  {
    tab: "规则③ 双写+ing",
    rule: "短元音 + 单辅音结尾，双写辅音再加 ing",
    examples: [
      { from: "run", to: "running" },
      { from: "sit", to: "sitting" },
      { from: "swim", to: "swimming" },
    ],
    sample: "Chen Tao is running in the park.",
    sampleZh: "陈涛正在公园跑步。",
    sampleImage: imgName("l02p-scene-", "Chen Tao is running in the park.", 902),
    focusVerb: "running",
  },
  {
    tab: "规则④ ie→y+ing",
    rule: "以 ie 结尾，变 ie 为 y 再加 ing",
    examples: [
      { from: "lie", to: "lying" },
      { from: "tie", to: "tying" },
    ],
    sample: "The cat is lying on the sofa.",
    sampleZh: "猫正躺在沙发上。",
    sampleImage: imgName("l02p-scene-", "The cat is lying on the sofa.", 903),
    focusVerb: "lying",
  },
];
spellSamples.forEach((r) => useImg(r.sampleImage, r.sample, r.sample));

pages.push({
  id: "p14",
  section: "V-ing 形式",
  title: "拼写实验室 · -ing 规律",
  type: "spelling",
  badge: "demo",
  badgeText: "✏️ 规律",
  image: spellSamples[0].sampleImage,
  lead: "点开每条规律，看动词变化，再读匹配的例句。",
  rules: spellSamples,
});

pages.push({
  id: "p15",
  section: "V-ing 形式",
  title: "拼写小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: ing1.image,
  ...(qSpelling[0] || {
    q: "He is ___ (run) in the park now.",
    opts: ["run", "running", "runs"],
    ans: 1,
    hint: "now → 双写 n + ing",
    sentence: ing1.en,
    zh: ing1.zh,
  }),
});

pages.push({
  id: "p16",
  section: "V-ing 形式",
  title: "拼写小测 ②",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: ing2.image,
  ...(qSpelling[1] || qSpelling[0]),
});

const stat1 = first(sStative, 0);
const stat2 = first(sStative, 1);
const stat1Verb = wordTokens(stat1.en)[1] || "know";
const stat2Verb = wordTokens(stat2.en)[1] || "like";

pages.push(
  scenePage(
    "p17",
    "状态动词",
    "状态动词 · " + stat1Verb,
    "state",
    "🧠 状态",
    stat1,
    "like / know / want 等状态动词一般不用进行时",
    "stative"
  )
);
pages.push(
  scenePage(
    "p18",
    "状态动词",
    "状态动词 · " + stat2Verb,
    "state",
    "🧠 状态",
    stat2,
    "说喜欢、知道、想要，用一般现在时即可",
    "stative"
  )
);

pages.push({
  id: "p19",
  section: "V-ing 形式",
  title: "V-ing 词汇卡",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabIng",
  lead: "点开单词卡片：看例句配图，再做句子排序和看图造句。",
});

pages.push({
  id: "p20",
  section: "状态动词",
  title: "be + V-ing 小测 ①",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: am1.image,
  ...(qBeIng[0] || {}),
});

pages.push({
  id: "p21",
  section: "状态动词",
  title: "be + V-ing 小测 ②",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: is1.image,
  ...(qBeIng[1] || qBeIng[0] || {}),
});

pages.push({
  id: "p22",
  section: "V-ing 形式",
  title: "配对 · 英文 ↔ 中文",
  type: "match-pairs",
  badge: "game",
  badgeText: "🔗 配对",
  pool: "matchPairs",
  image: "l02p-playground.jpg",
  pairs: matchPairs,
});

/** 否定 / 疑问动态演示：HTML、朗读、例句、配图必须同一组句子 */
const demoPlayAff = playCont;
const demoPlayNeg = normalizeNeg({
  en: "He isn't playing football on the playground.",
  zh: "他没有在操场上踢足球。",
  image: playCont.image,
  tokens: wordTokens("He isn't playing football on the playground."),
  source: "教材对比句 · isn't",
});
const demoReadAff = am1;
const demoReadQ =
  sQ.find((s) => /^Is\b/i.test(s.en) && /reading/i.test(s.en)) ||
  normalizeNeg({
    en: "Is Chen Tao reading a book?",
    zh: "陈涛正在看书吗？",
    image: am1.image,
    tokens: wordTokens("Is Chen Tao reading a book?"),
    source: "教材对比句 · Is",
  });
useImg(demoPlayNeg.image, demoPlayNeg.en, demoPlayNeg.en);
useImg(demoReadQ.image, demoReadQ.en, demoReadQ.en);

let negExtra =
  sNeg.find((s) => /sleep|homework|library|street/i.test(s.en) && !/playing football/i.test(s.en)) ||
  first(sNeg, 0);
negExtra = normalizeNeg(negExtra);

let qExtra = sQ.find((s) => !/reading a book/i.test(s.en)) || first(sQ, 0);
if (qExtra && /^(Is|Are|Am)\b/i.test(qExtra.en) && !/[?？]$/.test(qExtra.en.trim())) {
  qExtra = { ...qExtra, en: qExtra.en.replace(/[.。]?$/, "?"), tokens: wordTokens(qExtra.en.replace(/[.。]?$/, "?")) };
}

pages.push({
  id: "p23",
  section: "否定句",
  title: "动态演示 · isn't / aren't",
  type: "dynamic",
  badge: "demo",
  badgeText: "🎬 动态",
  image: demoPlayAff.image,
  lead: "否定：be + not + V-ing → isn't / aren't / am not",
  steps: [
    {
      html:
        '<span class="l02p-token l02p-token--subj">He</span><span class="l02p-token l02p-token--be">is</span><span class="l02p-token l02p-token--verb">playing</span><span class="l02p-token l02p-token--obj">football</span>',
      speak: demoPlayAff.en,
    },
    {
      html:
        '<span class="l02p-token l02p-token--subj">He</span><span class="l02p-token l02p-token--aux">isn\'t</span><span class="l02p-token l02p-token--verb">playing</span><span class="l02p-token l02p-token--obj">football</span>',
      speak: demoPlayNeg.en,
    },
  ],
  sentence: demoPlayNeg.en,
  zh: demoPlayNeg.zh,
});

pages.push(
  scenePage(
    "p24",
    "否定句",
    "例句 · isn't",
    "neg",
    "🚫 否定",
    demoPlayNeg,
    "isn't / aren't + V-ing（动词仍用 -ing 形式）",
    "action"
  )
);
pages.push(
  scenePage(
    "p25",
    "否定句",
    "例句 · aren't 再练",
    "neg",
    "🚫 否定",
    negExtra,
    "I → am not；is → isn't；are → aren't",
    "action"
  )
);

pages.push({
  id: "p26",
  section: "否定句",
  title: "否定小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: demoPlayNeg.image,
  ...(qNeg[0] || {}),
});

pages.push({
  id: "p27",
  section: "疑问句",
  title: "动态演示 · Am / Is / Are",
  type: "dynamic",
  badge: "demo",
  badgeText: "🎬 动态",
  image: demoReadAff.image,
  lead: "疑问：Am / Is / Are + 主语 + V-ing？",
  steps: [
    {
      html:
        '<span class="l02p-token l02p-token--subj">Chen Tao</span><span class="l02p-token l02p-token--be">is</span><span class="l02p-token l02p-token--verb">reading</span><span class="l02p-token l02p-token--obj">a book</span>',
      speak: "Chen Tao is reading a book.",
    },
    {
      html:
        '<span class="l02p-token l02p-token--aux l02p-token--fly">Is</span><span class="l02p-token l02p-token--subj">Chen Tao</span><span class="l02p-token l02p-token--verb">reading</span><span class="l02p-token l02p-token--obj">a book</span><span class="l02p-token">?</span>',
      speak: demoReadQ.en,
    },
  ],
  sentence: demoReadQ.en,
  zh: demoReadQ.zh,
});

pages.push(scenePage("p28", "疑问句", "例句 · Is ①", "q", "❓ 疑问", demoReadQ, "Is / Are / Am 提到句首", "q"));
pages.push(scenePage("p29", "疑问句", "例句 · Are ②", "q", "❓ 疑问", qExtra, "回答：Yes, … is/are. / No, … isn't/aren't.", "q"));

pages.push({
  id: "p30",
  section: "疑问句",
  title: "疑问小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: demoReadQ.image,
  ...(qQuestion[0] || {}),
});

// 综合练习
pages.push({
  id: "p31",
  section: "综合练习",
  title: "看图造句 ①",
  type: "picture-build",
  badge: "action",
  badgeText: "🧩 造句",
  image: ing1.image,
  instruction: "单词已打乱。点选填入空格，组成正确进行时句子：",
  tokens: ing1.tokens,
  sentence: ing1.en,
  zh: ing1.zh,
});

pages.push({
  id: "p32",
  section: "综合练习",
  title: "听音排序 ①",
  type: "listen-order",
  badge: "sound",
  badgeText: "🎧 听音",
  image: is1.image,
  audio: is1.en,
  tokens: is1.tokens,
  sentence: is1.en,
  zh: is1.zh,
});

pages.push({
  id: "p33",
  section: "综合练习",
  title: "am/is/are 小测",
  type: "quiz",
  badge: "ask",
  badgeText: "📝 测试",
  image: am1.image,
  ...(qBeIng[2] || qBeIng[0] || {}),
});

pages.push({
  id: "p34",
  section: "综合练习",
  title: "看图造句 ②",
  type: "picture-build",
  badge: "state",
  badgeText: "🧩 造句",
  image: are1.image,
  instruction: "组成 am/is/are + V-ing 句子：",
  tokens: are1.tokens,
  sentence: are1.en,
  zh: are1.zh,
});

pages.push({
  id: "p35",
  section: "综合练习",
  title: "听音排序 ②",
  type: "listen-order",
  badge: "sound",
  badgeText: "🎧 听音",
  image: demoReadQ.image,
  audio: demoReadQ.en,
  tokens: demoReadQ.tokens,
  sentence: demoReadQ.en,
  zh: demoReadQ.zh,
});

pages.push({
  id: "p36",
  section: "综合练习",
  title: "终极小测",
  type: "quiz",
  badge: "ask",
  badgeText: "🏆 终极",
  image: demoPlayNeg.image,
  ...(qMix[0] || qNeg[1] || qNeg[0] || {}),
});

pages.push({
  id: "p37",
  section: "课堂练习",
  title: "课堂练习中心",
  type: "practice-hub",
  badge: "game",
  badgeText: "🎮 练习",
  image: "l02p-playground.jpg",
  lead: "选择一种练习模式，巩固现在进行时！语料由 DeepSeek 生成，对齐 5–6 年级 + 小升初。",
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
  title: "V-ing 词汇卡",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabIng",
  lead: "点开单词卡片：看例句配图，再做句子排序和看图造句。",
});

pages.push({
  id: "p39",
  section: "词汇拓展",
  title: "now 标志词",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabMarkers",
  lead: "点开卡片学习 now / look / listen / at the moment，并可做排序练习。",
});

pages.push({
  id: "p40",
  section: "词汇拓展",
  title: "状态动词",
  type: "vocab-cards",
  badge: "vocab",
  badgeText: "📖 词汇",
  pool: "vocabStative",
  lead: "点开卡片：哪些动词一般不用进行时？",
});

const extraScenes = scenes
  .filter((s) => ![ing1, is1, am1, are1, demoPlayNeg, demoReadQ, negExtra].includes(s))
  .filter((s) => s.focus === "ing-spelling" || s.focus === "am-is-are" || s.focus === "simple-contrast")
  .slice(0, 4);
while (extraScenes.length < 4) extraScenes.push(scenes[extraScenes.length % scenes.length]);

extraScenes.forEach((s, i) => {
  const verb = mainIngVerb(s.en);
  pages.push(
    scenePage(
      "p" + String(41 + i),
      "拓展例句",
      "拓展例句 · " + verb,
      s.focus === "am-is-are" ? "state" : "action",
      s.focus === "simple-contrast" ? "⚖️ 对比" : "🏃 V-ing",
      s,
      (s.focus === "simple-contrast"
        ? "对比：一般现在时 vs 现在进行时"
        : "be + V-ing · 注意时间标志词") +
        " · " +
        (s.source || ""),
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
  title: "课堂套题 ① · am/is/are",
  type: "multi-quiz",
  badge: "ask",
  badgeText: "📝 套题",
  image: "l02p-am-is-are-chart.jpg",
  lead: "共 6 题 · am / is / are + V-ing",
  questions: multiFrom(qBeIng, 6),
});

pages.push({
  id: "p46",
  section: "套题练习",
  title: "课堂套题 ② · 拼写与否定",
  type: "multi-quiz",
  badge: "ask",
  badgeText: "📝 套题",
  image: ing1.image,
  lead: "共 6 题",
  questions: multiFrom(qSpelling, 3).concat(multiFrom(qNeg, 3)),
});

pages.push({
  id: "p47",
  section: "套题练习",
  title: "课堂套题 ③ · 综合",
  type: "multi-quiz",
  badge: "ask",
  badgeText: "📝 套题",
  image: "l02p-playground.jpg",
  lead: "共 8 题 · 小升初难度",
  questions: multiFrom(qMix, 8),
});

pages.push({
  id: "p48",
  section: "限时挑战",
  title: "限时 · am/is/are 45秒",
  type: "timed-quiz",
  badge: "timed",
  badgeText: "⏱ 限时",
  pool: "qBeIng",
  seconds: 45,
  perQuestion: 10,
  pass: 4,
  lead: "每题约 10 秒！",
});

pages.push({
  id: "p49",
  section: "限时挑战",
  title: "限时 · 拼写 60秒",
  type: "timed-quiz",
  badge: "timed",
  badgeText: "⏱ 限时",
  pool: "qSpelling",
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
  title: "连对闯关 · 拼写",
  type: "streak-quiz",
  badge: "game",
  badgeText: "🔥 连对",
  pool: "qSpelling",
  target: 5,
  lead: "连续答对 5 题通关！",
});

pages.push({
  id: "p52",
  section: "连对闯关",
  title: "连对闯关 · 疑问句",
  type: "streak-quiz",
  badge: "game",
  badgeText: "🔥 连对",
  pool: "qQuestion",
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
  image: "l02p-playground.jpg",
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
  image: am1.image,
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
  image: is1.image,
});

pages.push({
  id: "p56",
  section: "课堂游戏",
  title: "看图造句 ③",
  type: "picture-build",
  badge: "action",
  badgeText: "🧩 造句",
  image: first(sIng, 2).image,
  instruction: "单词已打乱。点选填入，组成正确句子：",
  tokens: first(sIng, 2).tokens,
  sentence: first(sIng, 2).en,
  zh: first(sIng, 2).zh,
});

pages.push({
  id: "p57",
  section: "课堂游戏",
  title: "听音排序 ③",
  type: "listen-order",
  badge: "sound",
  badgeText: "🎧 听音",
  image: negExtra.image,
  audio: negExtra.en,
  tokens: negExtra.tokens,
  sentence: negExtra.en,
  zh: negExtra.zh,
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
  image: "l02p-playground.jpg",
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
  title: "本讲小结 · 现在进行时",
  type: "summary",
  badge: "demo",
  badgeText: "📌 小结",
  image: "l02p-continuous-vs-simple.jpg",
  checklist: [
    "时间标志：now / look / listen / at the moment / right now → 现在进行时",
    "结构：I am / He-She-It is / You-We-They are + V-ing",
    "拼写：+ing / 去e+ing / 双写+ing / ie→y+ing",
    "状态动词：like, know, want… 一般不用进行时",
    "否定：isn't / aren't / am not + V-ing",
    "疑问：Am / Is / Are + 主语 + V-ing？",
  ],
  chant: "Look! I am playing.\\nNow they are singing.\\nShe isn't sleeping —\\nAre you listening?",
  chantSpeak: "Look! I am playing. Now they are singing. She isn't sleeping. Are you listening?",
});

const dataJs = `(function (global) {
  "use strict";
  var PAGES = ${JSON.stringify(pages, null, 2)};
  global.L02pData = {
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

fs.writeFileSync(path.join(ASSETS, "l02p-data.js"), dataJs, "utf8");

/** 配图任务：场景 + 词汇 + 概念图全部入清单 */
const used = new Set(Object.keys(heroImages));
pages.forEach((p) => {
  if (p.image) used.add(p.image);
  if (p.leftImage) used.add(p.leftImage);
  if (p.rightImage) used.add(p.rightImage);
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

/** 构建时校验：标题/动态步骤中的目标词必须出现在对应例句里 */
function assertAlign(pagesList) {
  const problems = [];
  for (const p of pagesList) {
    const sent = p.sentence || p.rightSentence || "";
    const m = String(p.title || "").match(/[·•]\s*([A-Za-z']+)$/);
    if (m && sent && p.type === "scene") {
      const claim = m[1].toLowerCase();
      if (["stative", "continuous", "simple", "v-ing"].includes(claim)) continue;
      if (claim === "isn't" || claim === "isnt") {
        if (!/\bisn'?t\b/i.test(sent) && !/\bis not\b/i.test(sent)) {
          problems.push(p.id + " title isn't but sentence lacks isn't: " + sent);
        }
      } else if (claim === "aren't" || claim === "arent") {
        if (!/\baren't\b/i.test(sent) && !/\bare not\b/i.test(sent)) {
          problems.push(p.id + " title aren't but sentence lacks aren't: " + sent);
        }
      } else if (claim === "is" || claim === "are" || claim === "am") {
        if (!new RegExp("\\b" + claim + "\\b", "i").test(sent)) {
          problems.push(p.id + " title " + claim + " missing in: " + sent);
        }
      } else if (!new RegExp("\\b" + claim.replace(/'/g, "['']?") + "\\b", "i").test(sent)) {
        problems.push(p.id + " title " + claim + " missing in: " + sent);
      }
    }
    if (p.type === "dynamic" && Array.isArray(p.steps)) {
      for (const st of p.steps) {
        const html = String(st.html || "").replace(/<[^>]+>/g, " ");
        const speak = String(st.speak || "");
        const htmlWords = html.toLowerCase().match(/[a-z']+/g) || [];
        const speakWords = new Set((speak.toLowerCase().match(/[a-z']+/g) || []));
        const key = htmlWords.filter((w) => !["to", "the", "a", "an", "in", "on", "of"].includes(w));
        const verbs = key.filter(
          (w) =>
            /ing$/.test(w) ||
            ["play", "playing", "reading", "isn't", "arent", "aren't", "is", "are", "am"].includes(w) ||
            w === "isn't"
        );
        for (const v of verbs) {
          if (v === "book" || v === "football") continue;
          const norm = v.replace(/'/g, "'");
          if (
            !speakWords.has(norm) &&
            !(norm === "isn't" && (speakWords.has("isnt") || /\bis not\b/i.test(speak))) &&
            !speak.toLowerCase().includes(norm)
          ) {
            problems.push(p.id + " step html/speak mismatch: html~" + v + " speak=" + speak);
          }
        }
      }
      if (p.sentence && p.steps[1] && p.steps[1].speak && p.steps[1].speak !== p.sentence) {
        problems.push(p.id + " final step speak != page sentence");
      }
    }
    if (p.type === "spelling") {
      for (const r of p.rules || []) {
        if (r.focusVerb && r.sample && !r.sample.includes(r.focusVerb)) {
          problems.push(p.id + " " + r.tab + " focusVerb not in sample");
        }
      }
    }
    if (p.type === "discover") {
      if (p.morphPast && p.rightSentence && !p.rightSentence.includes(p.morphPast)) {
        problems.push(p.id + " morphPast not in rightSentence");
      }
    }
  }
  if (problems.length) {
    console.error("ALIGNMENT ERRORS:\n" + problems.map((x) => " - " + x).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("alignment: ok");
  }
}
assertAlign(pages);

if (pages.length !== 61) {
  console.error("Expected 61 pages, got", pages.length);
  process.exitCode = 1;
}

console.log("pages:", pages.length);
console.log("images todo:", todo.length);
console.log("wrote corpus/data/scenes/img + images-todo.json");
