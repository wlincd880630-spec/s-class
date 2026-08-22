#!/usr/bin/env node
/**
 * 用 DeepSeek 为小学语法课生成语料库 + 练习题。
 * 密钥只读环境变量 DEEPSEEK_API_KEY，不写入仓库。
 *
 *   DEEPSEEK_API_KEY=sk-... node Grammar/scripts/generate-primary-corpus.mjs
 *   DEEPSEEK_API_KEY=sk-... node Grammar/scripts/generate-primary-corpus.mjs L08-小学冠词
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SPECS } from "./primary-junior-expand-spec.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "Grammar/scripts/primary-corpus-packs");
const KEY = process.env.DEEPSEEK_API_KEY || "";
const API = "https://api.deepseek.com/chat/completions";
const SCENES = [
  "cat", "apple", "moon", "library", "basketball", "taller",
  "classroom", "bus", "panda", "dinner", "umbrella", "doctor",
  "window", "piano", "playground", "shop",
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractJson(text) {
  const raw = String(text || "").trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fence ? fence[1] : raw;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("no JSON object");
  return JSON.parse(body.slice(start, end + 1));
}

async function chat(messages, retries = 3) {
  let last;
  for (let i = 0; i < retries; i++) {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + KEY,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.7,
        max_tokens: 8192,
        messages,
      }),
    });
    const data = await res.json();
    if (data.error) {
      last = new Error(data.error.message || JSON.stringify(data.error));
      await sleep(1200 * (i + 1));
      continue;
    }
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      last = new Error("empty content");
      await sleep(800);
      continue;
    }
    try {
      return extractJson(content);
    } catch (e) {
      last = e;
      await sleep(800);
    }
  }
  throw last || new Error("DeepSeek failed");
}

function brief(folder, spec) {
  const samples = (spec.formula?.samples || []).map((s) => s.sentence).join(" | ");
  const parts = (spec.formula?.parts || []).map((p) => p.mark + " " + p.label).join("; ");
  return [
    "课程文件夹: " + folder,
    "课名: " + spec.title,
    "构成公式: " + (spec.formula?.formula || ""),
    "公式部件: " + parts,
    "已有例句（请大幅拓展，不要只围着这几句打转）: " + samples,
    "易错点: " + (spec.trap?.question || ""),
  ].join("\n");
}

function systemPrompt() {
  return `你是成都小学 3–6 年级英语语法老师。为指定语法点生成「课堂语料库 + 练习题包」。
要求：
1. 词汇控制在小学范围，句子自然、情景多样：学校、家庭、食堂、图书馆、操场、商店、天气、成都熊猫/火锅、公交、兴趣班。禁止 20 句都围着同一只猫/同一本书。
2. 每题必须有且仅有一个正确答案；opts 3 个选项；ans 为 0 起始下标。
3. 英文语法正确；中文简洁。填空题用 _____。
4. scene 只能从这些里选：${SCENES.join(", ")}。
5. 只输出一个 JSON 对象，不要 markdown。

JSON 形状：
{
  "examples": [ {"en":"...", "zh":"...", "tag":"daily_use|exam_use|writing_use", "scene":"library"} ],
  "questions": [ {"q":"... _____ ...", "opts":["A","B","C"], "ans":0, "hint":"...", "sentence":"完整正确句", "zh":"..."} ],
  "transforms": [ {"from":"原句", "fromZh":"...", "label":"改成……", "opts":["正确","错1","错2"], "ans":0, "hint":"...", "sentence":"正确句", "zh":"..."} ],
  "pairs": [ {"en":"短语或短句", "zh":"中文"} ],
  "builds": [ {"sentence":"完整句，单词间空格", "zh":"...", "scene":"shop"} ],
  "listen": [ {"audio":"完整正确句", "opts":["正确句","错句1","错句2"], "ans":0, "hint":"...", "zh":"..."} ],
  "scenes": [ {"title":"例句 · 小标题", "lead":"点明规则", "sentence":"...", "zh":"...", "scene":"piano"} ]
}

数量：examples 24（日常/考点/写作大约 8/8/8），questions 28，transforms 6，pairs 10，builds 6，listen 8，scenes 3。`;
}

function normalize(pack) {
  const out = {
    examples: [],
    questions: [],
    transforms: [],
    pairs: [],
    builds: [],
    listen: [],
    scenes: [],
  };
  const sceneOk = new Set(SCENES);
  for (const ex of pack.examples || []) {
    if (!ex?.en) continue;
    const scene = sceneOk.has(ex.scene) ? ex.scene : "classroom";
    const tag = ["daily_use", "exam_use", "writing_use"].includes(ex.tag) ? ex.tag : "daily_use";
    out.examples.push({ en: String(ex.en).trim(), zh: String(ex.zh || "").trim(), tag, scene, image: "kp3d-" + scene + ".png" });
  }
  for (const q of pack.questions || []) {
    if (!q?.q || !Array.isArray(q.opts) || q.opts.length < 2) continue;
    const ans = Number(q.ans);
    if (!Number.isInteger(ans) || ans < 0 || ans >= q.opts.length) continue;
    out.questions.push({
      q: String(q.q).trim(),
      opts: q.opts.map(String),
      ans,
      hint: String(q.hint || "").trim(),
      sentence: String(q.sentence || "").trim(),
      zh: String(q.zh || "").trim(),
    });
  }
  for (const t of pack.transforms || []) {
    if (!t?.from || !Array.isArray(t.opts) || t.opts.length < 2) continue;
    const ans = Number(t.ans);
    if (!Number.isInteger(ans) || ans < 0 || ans >= t.opts.length) continue;
    out.transforms.push({
      from: String(t.from).trim(),
      fromZh: String(t.fromZh || "").trim(),
      label: String(t.label || "改写句子").trim(),
      opts: t.opts.map(String),
      ans,
      hint: String(t.hint || "").trim(),
      sentence: String(t.sentence || t.opts[ans]).trim(),
      zh: String(t.zh || "").trim(),
    });
  }
  for (const p of pack.pairs || []) {
    if (!p?.en || !p?.zh) continue;
    out.pairs.push({ en: String(p.en).trim(), zh: String(p.zh).trim() });
  }
  for (const b of pack.builds || []) {
    const sentence = String(b.sentence || "").trim();
    if (!sentence) continue;
    const scene = sceneOk.has(b.scene) ? b.scene : "classroom";
    const tokens = Array.isArray(b.tokens) && b.tokens.length
      ? b.tokens.map(String)
      : sentence.replace(/[.!?。！？]+$/g, "").trim().split(/\s+/);
    out.builds.push({ sentence, zh: String(b.zh || "").trim(), tokens, scene, image: "kp3d-" + scene + ".png" });
  }
  for (const L of pack.listen || []) {
    if (!L?.audio || !Array.isArray(L.opts) || L.opts.length < 2) continue;
    const ans = Number(L.ans);
    if (!Number.isInteger(ans) || ans < 0 || ans >= L.opts.length) continue;
    out.listen.push({
      audio: String(L.audio).trim(),
      opts: L.opts.map(String),
      ans,
      hint: String(L.hint || "再听一遍。").trim(),
      zh: String(L.zh || "").trim(),
      sentence: String(L.audio).trim(),
    });
  }
  for (const s of pack.scenes || []) {
    if (!s?.sentence) continue;
    const scene = sceneOk.has(s.scene) ? s.scene : "classroom";
    out.scenes.push({
      title: String(s.title || "例句").trim(),
      lead: String(s.lead || "").trim(),
      sentence: String(s.sentence).trim(),
      zh: String(s.zh || "").trim(),
      scene,
      image: "kp3d-" + scene + ".png",
    });
  }
  return out;
}

async function one(folder, spec) {
  const pack = await chat([
    { role: "system", content: systemPrompt() },
    { role: "user", content: brief(folder, spec) + "\n请现在生成完整 JSON。" },
  ]);
  const norm = normalize(pack);
  if (norm.examples.length < 12 || norm.questions.length < 12) {
    throw new Error("too thin: ex=" + norm.examples.length + " q=" + norm.questions.length);
  }
  return norm;
}

async function pool(items, n, fn) {
  const q = items.slice();
  const running = [];
  const out = [];
  async function run(item) {
    try {
      out.push(await fn(item));
    } catch (e) {
      out.push({ error: e, item });
    }
  }
  while (q.length || running.length) {
    while (q.length && running.length < n) {
      const item = q.shift();
      const p = run(item).finally(() => {
        const i = running.indexOf(p);
        if (i >= 0) running.splice(i, 1);
      });
      running.push(p);
    }
    if (running.length) await Promise.race(running);
  }
  return out;
}

async function main() {
  if (!KEY) {
    console.error("Missing DEEPSEEK_API_KEY");
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const folders = only.length ? only : Object.keys(SPECS);
  const force = process.argv.includes("--force");
  const jobs = folders.filter((f) => {
    if (!SPECS[f]) {
      console.error("unknown folder", f);
      return false;
    }
    const dest = path.join(OUT, f + ".json");
    if (!force && fs.existsSync(dest)) {
      console.log("skip", f);
      return false;
    }
    return true;
  });
  console.log("generate", jobs.length, "packs");
  let ok = 0;
  let fail = 0;
  await pool(jobs, 3, async (folder) => {
    process.stdout.write("→ " + folder + "\n");
    try {
      const pack = await one(folder, SPECS[folder]);
      fs.writeFileSync(path.join(OUT, folder + ".json"), JSON.stringify(pack, null, 2));
      ok++;
      console.log("ok", folder, "ex", pack.examples.length, "q", pack.questions.length);
    } catch (e) {
      fail++;
      console.error("fail", folder, e.message || e);
      throw e;
    }
  });
  console.log("Done ok=", ok, "fail=", fail);
  if (fail) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
