#!/usr/bin/env node
/**
 * 把小学 8 页 KP 课扩成初中同款教学路径：
 * 导入 → 构成公式 → 发现 → 精讲 → 辨析 → 句型转换 → 操练 → 检测 → 小结
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import { SPECS } from "./primary-junior-expand-spec.mjs";
import { ROOT, pageHtml, indexHtml, buildDataJs } from "../kp-shared/gen-lesson.mjs";

const GRAMMAR = path.join(ROOT, "Grammar");

function loadKpData(folder) {
  const file = path.join(GRAMMAR, folder, "assets", "kp-data.js");
  const code = fs.readFileSync(file, "utf8");
  const sandbox = { globalThis: {} };
  vm.runInNewContext(
    code.replace(/typeof window !== "undefined" \? window : null/, "globalThis"),
    sandbox
  );
  return sandbox.globalThis.KpData;
}

function loadCosBase(folder) {
  const file = path.join(GRAMMAR, folder, "assets", "kp-img.js");
  const code = fs.readFileSync(file, "utf8");
  const m = code.match(/var COS = "([^"]+)"/);
  return m ? m[1] : "";
}

function byType(pages, type) {
  return pages.find((p) => p.type === type);
}

/** 已拓展过的课再跑生成器时，只保留原 8 页课型，避免公式/综测等页重复叠加。 */
const GENERATED_TYPES = new Set([
  "formula",
  "scene",
  "transform",
  "picture-build",
  "multi-quiz",
  "timed-quiz",
  "streak-quiz",
  "match-pairs",
  "listen-pick",
]);

function seedPages(pages) {
  const out = [];
  let sawSocratic = false;
  let sawSummary = false;
  for (const p of pages) {
    if (GENERATED_TYPES.has(p.type)) continue;
    if (p.type === "socratic") {
      if (sawSocratic) continue;
      sawSocratic = true;
    }
    if (p.type === "summary") {
      if (sawSummary) continue;
      sawSummary = true;
    }
    out.push(p);
  }
  return out;
}

function uniqueList(items) {
  const seen = new Set();
  const out = [];
  for (const t of items) {
    if (t == null || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

function rebuild(oldPages, spec) {
  const img = spec.image || oldPages[0]?.image || "";
  const sound = byType(oldPages, "sound-first");
  const soc = byType(oldPages, "socratic");
  const disc = byType(oldPages, "discover");
  const clas = byType(oldPages, "classify");
  const be = byType(oldPages, "be-match");
  const spell = byType(oldPages, "spelling");
  const quiz = byType(oldPages, "quiz");
  const listen = byType(oldPages, "listen-order");
  const sum = byType(oldPages, "summary");
  const pages = [];

  if (sound) pages.push({ ...sound, section: "导入" });
  if (soc) pages.push({ ...soc, section: "导入" });

  pages.push({
    section: "构成",
    title: spec.formula.title || "构成公式",
    type: "formula",
    badge: "demo",
    badgeText: "📐 公式",
    image: img,
    lead: spec.formula.lead,
    formula: spec.formula.formula,
    parts: spec.formula.parts,
    samples: spec.formula.samples,
  });

  if (disc) pages.push({ ...disc, section: "发现" });

  (spec.scenes || []).forEach((s) => {
    pages.push({
      section: "精讲",
      title: s.title,
      type: "scene",
      badge: "image",
      badgeText: "🖼 例句",
      image: s.image || img,
      lead: s.lead,
      sentence: s.sentence,
      zh: s.zh,
      source: s.source || "课堂精讲 · 对齐初中",
    });
  });

  if (spell) pages.push({ ...spell, section: "精讲" });
  if (clas) pages.push({ ...clas, section: "辨析" });
  else if (be) pages.push({ ...be, section: "辨析" });

  pages.push({
    section: "辨析",
    title: spec.trap.title || "易错点 · 苏格拉底",
    type: "socratic",
    badge: "ask",
    badgeText: "💭 易错",
    image: img,
    question: spec.trap.question,
    choices: spec.trap.choices,
    sentence: spec.trap.sentence,
    zh: spec.trap.zh,
  });

  pages.push({
    section: "转换",
    title: spec.transform.title || "句型转换",
    type: "transform",
    badge: "demo",
    badgeText: "🔄 转换",
    image: img,
    lead: spec.transform.lead,
    items: spec.transform.items,
  });

  const buildSent = spec.build?.sentence || listen?.sentence;
  const buildTokens = spec.build?.tokens || listen?.tokens;
  pages.push({
    section: "操练",
    title: "看图造句",
    type: "picture-build",
    badge: "action",
    badgeText: "🧩 造句",
    image: img,
    instruction: spec.build?.instruction || "对照初中造句操练：点选乱序单词组成正确句子。",
    tokens: buildTokens,
    sentence: buildSent,
    zh: spec.build?.zh || listen?.zh,
  });

  if (listen) pages.push({ ...listen, section: "操练" });
  if (quiz) pages.push({ ...quiz, section: "检测" });

  const allQs = [];
  if (quiz) {
    allQs.push({
      q: quiz.q,
      opts: quiz.opts,
      ans: quiz.ans,
      hint: quiz.hint,
      sentence: quiz.sentence,
      zh: quiz.zh,
    });
  }
  (spec.extraQs || []).forEach((q) => allQs.push(q));

  pages.push({
    section: "检测",
    title: "综合测试",
    type: "multi-quiz",
    badge: "q",
    badgeText: "📝 综测",
    image: img,
    lead: "对齐初中综合测试：全部做完再交卷。",
    questions: allQs,
  });
  pages.push({
    section: "检测",
    title: "限时挑战 60 秒",
    type: "timed-quiz",
    badge: "timed",
    badgeText: "⏱ 限时",
    lead: "对照初中课堂竞赛：60 秒内尽量多答对。",
    seconds: 60,
    perQuestion: 12,
    pass: 4,
    questions: allQs,
  });
  pages.push({
    section: "检测",
    title: "连对闯关",
    type: "streak-quiz",
    badge: "game",
    badgeText: "🔥 连对",
    lead: "连续答对 5 题通关，答错连击清零。",
    target: 5,
    questions: allQs,
  });
  pages.push({
    section: "游戏",
    title: "英中配对",
    type: "match-pairs",
    badge: "game",
    badgeText: "🔗 配对",
    image: img,
    pairs: spec.pairs,
  });

  const audio = spec.listenPick?.audio || listen?.audio || listen?.sentence;
  const opts = spec.listenPick?.opts || [audio, ...(spec.distractors || [])];
  pages.push({
    section: "听音",
    title: "听音快选",
    type: "listen-pick",
    badge: "sound",
    badgeText: "🎧 听音",
    image: img,
    audio,
    opts,
    ans: spec.listenPick?.ans ?? 0,
    hint: spec.listenPick?.hint || "先听完整句，再选文字。",
    sentence: audio,
    zh: spec.listenPick?.zh || listen?.zh,
  });

  const checklist = uniqueList([...(sum?.checklist || []), ...(spec.extraChecklist || [])]);
  pages.push({
    section: "小结",
    title: "本讲小结",
    type: "summary",
    badge: "demo",
    badgeText: "📌 小结",
    image: sum?.image || img,
    checklist,
    chant: spec.chant || sum?.chant,
    chantSpeak: spec.chantSpeak || sum?.chantSpeak,
  });

  return pages.map((p, i) => ({
    ...p,
    id: "p" + String(i + 1).padStart(2, "0"),
  }));
}

function writeCourse(folder, spec, pages) {
  const outDir = path.join(GRAMMAR, folder);
  const assets = path.join(outDir, "assets");
  const cos = loadCosBase(folder);
  const hero = spec.image || pages[0]?.image || "";
  const lesson = {
    folder: "Grammar/" + folder,
    code: spec.pNum || folder,
    title: spec.title,
    badge: spec.badge,
    intro: spec.intro,
    features: spec.features,
    psleNote: spec.psleNote,
    juniorNote: spec.juniorNote,
    juniorHref: spec.juniorHref,
    juniorLabel: spec.juniorLabel,
    heroImage: /^https?:/i.test(hero) ? hero : cos + hero,
    backLink: "../index.html",
    pages,
  };

  fs.writeFileSync(path.join(assets, "kp-data.js"), buildDataJs(lesson));
  fs.writeFileSync(path.join(outDir, "index.html"), indexHtml(lesson));

  const ids = pages.map((p) => p.id);
  const existing = fs.readdirSync(outDir).filter((n) => /^p\d+\.html$/i.test(n));
  existing.forEach((n) => {
    if (!ids.includes(n.replace(/\.html$/i, ""))) fs.unlinkSync(path.join(outDir, n));
  });
  ids.forEach((id, i) => {
    fs.writeFileSync(
      path.join(outDir, id + ".html"),
      pageHtml(lesson, id, i > 0 ? ids[i - 1] : null, i < ids.length - 1 ? ids[i + 1] : null)
    );
  });
  return ids.length;
}

const folders = Object.keys(SPECS);
let totalPages = 0;
for (const folder of folders) {
  const spec = SPECS[folder];
  const data = loadKpData(folder);
  const pages = rebuild(seedPages(data.pages), spec);
  const n = writeCourse(folder, spec, pages);
  totalPages += n;
  console.log(folder, data.pages.length, "→", n);
}
console.log("Done:", folders.length, "courses,", totalPages, "pages");
