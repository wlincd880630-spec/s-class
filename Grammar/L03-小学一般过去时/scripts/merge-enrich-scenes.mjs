#!/usr/bin/env node
/**
 * 把 enrich 语料合并进主语料，并修正 was/were + V-ing（过去进行时）为一般过去时
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, "..", "assets");
const KEY = process.env.DEEPSEEK_KEY || "sk-daa16008e81843deba6fefe9dce51465";

function wordTokens(en) {
  return String(en || "")
    .replace(/[.!?？！。]+$/g, "")
    .replace(/,/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function slugify(en) {
  return String(en || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 52);
}

function isPastContinuous(en) {
  return /\b(was|were)\s+\w+ing\b/i.test(en);
}

async function rewriteToSimplePast(sentences) {
  const bad = sentences.filter((s) => isPastContinuous(s.en));
  if (!bad.length) return sentences;
  console.log("rewriting past continuous → simple past:", bad.length);
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + KEY,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "你是小学英语编辑。把过去进行时句子改写成一般过去时，保留画面细节与人物。只输出 JSON：{\"items\":[{\"id\":\"...\",\"en\":\"...\",\"zh\":\"...\",\"focus\":\"was|were|regular|irregular|...\",\"imageHint\":\"...\"}]}。不要 markdown。was/were 仅用于表语状态（happy/at home），不要 was doing。",
        },
        {
          role: "user",
          content: JSON.stringify({
            items: bad.map((s) => ({
              id: s.id,
              en: s.en,
              zh: s.zh,
              focus: s.focus,
              imageHint: s.imageHint,
            })),
          }),
        },
      ],
      temperature: 0.4,
      max_tokens: 4000,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  let text = (data.choices?.[0]?.message?.content || "").trim();
  if (text.startsWith("```")) text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  const parsed = JSON.parse(text.slice(start, end + 1).replace(/,\s*([}\]])/g, "$1"));
  const map = {};
  (parsed.items || []).forEach((it) => {
    map[it.id] = it;
  });
  return sentences.map((s) => {
    if (!map[s.id]) return s;
    const n = map[s.id];
    return {
      ...s,
      en: n.en,
      zh: n.zh || s.zh,
      focus: n.focus || s.focus,
      imageHint: n.imageHint || s.imageHint,
      tokens: wordTokens(n.en),
    };
  });
}

function normalizeSentence(s, i) {
  let en = String(s.en || "").trim();
  if (!/[.!?]$/.test(en)) en += ".";
  // fix focus if was/were used as linking only
  let focus = s.focus || "regular";
  if (/\bwas\b/i.test(en) && !/\bwere\b/i.test(en) && focus === "regular") focus = "was";
  if (/\bwere\b/i.test(en) && focus === "regular") focus = "were";
  if (/\bdidn'?t\b/i.test(en)) focus = "negative";
  if (/^Did\b|\?$/.test(en)) focus = "question";
  return {
    id: "e" + String(i + 1).padStart(2, "0"),
    en,
    zh: s.zh,
    focus,
    imageHint: s.imageHint || en,
    source: s.source || "DeepSeek·生动场景",
    tokens: wordTokens(en),
    image: "l03p-scene-" + slugify(en) + ".jpg",
  };
}

async function main() {
  const enrich = JSON.parse(fs.readFileSync(path.join(ASSETS, "_enrich-scenes.json"), "utf8"));
  const base = JSON.parse(fs.readFileSync(path.join(ASSETS, "_deepseek-corpus.json"), "utf8"));

  let scenes = await rewriteToSimplePast(enrich.sceneSentences || []);
  // drop any remaining past continuous
  scenes = scenes.filter((s) => !isPastContinuous(s.en));
  scenes = scenes.map((s, i) => normalizeSentence(s, i));

  // ensure coverage by focus
  const by = {};
  scenes.forEach((s) => {
    by[s.focus] = (by[s.focus] || 0) + 1;
  });
  console.log("focus counts", by);
  console.log("scenes kept", scenes.length);
  scenes.slice(0, 6).forEach((s) => console.log(s.focus, "|", s.en));

  base.sceneSentences = scenes;
  if (enrich.matchPairs?.length) base.matchPairs = enrich.matchPairs;
  if (enrich.listenPick?.length) {
    base.listenPick = enrich.listenPick.map((x) => ({
      audio: x.audio,
      opts: x.opts,
      ans: x.ans ?? 0,
      zh: x.zh || "",
    }));
  }
  if (enrich.vocabBoost?.length) {
    const reg = [];
    const irr = [];
    enrich.vocabBoost.forEach((v) => {
      const item = {
        word: v.word,
        base: v.base,
        zh: v.zh,
        example: v.example,
        exampleZh: v.exampleZh,
        rule: v.rule || "",
        imageHint: v.imageHint || v.example,
        source: "DeepSeek·生动场景",
      };
      if ((v.rule || "").includes("irregular") || !/ed$|d$/.test(v.word)) irr.push(item);
      else reg.push(item);
    });
    // prepend boost examples
    base.vocabRegular = [...reg, ...(base.vocabRegular || [])].slice(0, 16);
    base.vocabIrregular = [...irr, ...(base.vocabIrregular || [])].slice(0, 18);
  }

  fs.writeFileSync(path.join(ASSETS, "_deepseek-corpus.json"), JSON.stringify(base, null, 2));
  fs.writeFileSync(path.join(ASSETS, "_enrich-scenes.json"), JSON.stringify({ ...enrich, sceneSentences: scenes }, null, 2));

  // image todo for missing files
  const imgDir = path.join(ASSETS, "img");
  const have = new Set(fs.readdirSync(imgDir));
  const todo = scenes
    .filter((s) => !have.has(s.image))
    .map((s) => ({
      filename: s.image,
      sentence: s.en,
      prompt:
        "Children's educational crayon illustration, warm paper texture, soft pastel colors, clear focal action, NO text, NO watermark, friendly elementary textbook style. Scene: " +
        (s.imageHint || s.en),
    }));
  fs.writeFileSync(path.join(ASSETS, "images-todo-enrich.json"), JSON.stringify(todo, null, 2));
  console.log("images to generate:", todo.length);
  todo.slice(0, 8).forEach((t) => console.log(" -", t.filename));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
