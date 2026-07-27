#!/usr/bin/env node
/**
 * 分块调用 DeepSeek，生成小学一般过去时语料（更稳）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "assets");
const KEY = process.env.DEEPSEEK_KEY || "sk-daa16008e81843deba6fefe9dce51465";

const SYSTEM = `你是资深小学英语教研员。输出合法 JSON（不要 markdown 围栏）。
难度：外研 5–6 年级 + 小升初。人名：Lily,Tom,Emma,Jack,Chen Tao,Miss Li,Mr Wang,Teng Fei,Han Lin,Linda。
场景：校园、家庭、成都、周末出游。语法：一般过去时。句子自然、可配图、有交际价值。`;

async function chat(user, max_tokens = 4096) {
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + KEY,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: user },
      ],
      temperature: 0.65,
      max_tokens,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    // fallback model
    const res2 = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + KEY,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: user },
        ],
        temperature: 0.65,
        max_tokens,
      }),
    });
    const data2 = await res2.json();
    if (!res2.ok) throw new Error(JSON.stringify(data2));
    return (data2.choices?.[0]?.message?.content || "").trim();
  }
  return (data.choices?.[0]?.message?.content || "").trim();
}

function extractJson(text) {
  let t = String(text || "").trim();
  if (t.startsWith("```")) t = t.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) t = t.slice(start, end + 1);
  // also allow top-level array
  if (t[0] !== "{" && t[0] !== "[") {
    const a0 = text.indexOf("[");
    const a1 = text.lastIndexOf("]");
    if (a0 >= 0 && a1 > a0) t = text.slice(a0, a1 + 1);
  }
  return JSON.parse(t);
}

const JOBS = [
  {
    name: "scenes",
    prompt: `生成 JSON：{"sceneSentences":[...]} 共 28 条。
每项：{"id":"s01","en":"...","zh":"...","focus":"was|were|regular|irregular|negative|question|time","imageHint":"英文插画描述","source":"5GA/6GA/小升初","tokens":["分词语块无句末标点"]}
覆盖：was/were 各若干、规则过去式、不规则（went/saw/had/ate/took/wrote/came/made/bought/thought）、didn't、Did、yesterday/last weekend/ago。`,
  },
  {
    name: "vocab",
    prompt: `生成 JSON：
{"vocabRegular":[12项],"vocabIrregular":[14项],"vocabTime":[8项],"vocabBePast":[6项]}
regular项：{"word":"played","base":"play","zh":"...","example":"过去时例句","exampleZh":"...","rule":"+ed|+d|y→ied|双写+ed","imageHint":"..."}
irregular项：{"word":"went","base":"go","zh":"...","example":"...","exampleZh":"...","imageHint":"..."}
time项：{"word":"yesterday","zh":"...","example":"...","exampleZh":"...","imageHint":"..."}
bePast项：{"word":"was","zh":"...","example":"...","exampleZh":"...","imageHint":"..."}`,
  },
  {
    name: "quizzes",
    prompt: `生成 JSON：
{"qWasWere":[10],"qRegular":[10],"qIrregular":[12],"qNeg":[8],"qDid":[8],"qMix":[20]}
每题：{"q":"填空句 ___ ","opts":["a","b","c"],"ans":0,"hint":"中文提示","sentence":"完整正确句","zh":"中文","source":"5GA/小升初"}
q 用过去时语境；opts 含常见干扰（原形/现在时/进行时/be 混用）。`,
  },
  {
    name: "games",
    prompt: `生成 JSON：
{"matchPairs":[12],"listenPick":[10],"classifyItems":[8]}
matchPairs：{"en":"过去时句子","zh":"中文"}
listenPick：{"audio":"正确过去时句子","opts":["正确","干扰1","干扰2"],"ans":0,"zh":"..."}
classifyItems：{"text":"句子","bucket":"past|present","hint":"...","zh":"..."}（4 past + 4 present）`,
  },
];

async function runJob(job) {
  console.log(">>", job.name);
  const text = await chat(job.prompt, 6000);
  fs.writeFileSync(path.join(OUT_DIR, `_raw-${job.name}.txt`), text, "utf8");
  const parsed = extractJson(text);
  fs.writeFileSync(path.join(OUT_DIR, `_part-${job.name}.json`), JSON.stringify(parsed, null, 2), "utf8");
  console.log("   ok", Object.keys(parsed).map((k) => `${k}:${Array.isArray(parsed[k]) ? parsed[k].length : "?"}`).join(", "));
  return parsed;
}

async function main() {
  const merged = {};
  for (const job of JOBS) {
    let ok = false;
    for (let i = 0; i < 3 && !ok; i++) {
      try {
        Object.assign(merged, await runJob(job));
        ok = true;
      } catch (e) {
        console.error("retry", job.name, i, e.message.slice(0, 200));
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
    if (!ok) throw new Error("failed " + job.name);
  }
  const out = path.join(OUT_DIR, "_deepseek-corpus.json");
  fs.writeFileSync(out, JSON.stringify(merged, null, 2), "utf8");
  console.log("MERGED", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
