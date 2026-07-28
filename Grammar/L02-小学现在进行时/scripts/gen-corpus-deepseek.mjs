#!/usr/bin/env node
/**
 * 分块调用 DeepSeek，生成小学现在进行时语料（更稳）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "assets");
const KEY = process.env.DEEPSEEK_KEY || "sk-daa16008e81843deba6fefe9dce51465";

const SYSTEM = `你是资深小学英语教研员。输出合法 JSON（不要 markdown 围栏）。
难度：外研 5–6 年级 + 小升初。人名：Lily,Tom,Emma,Jack,Chen Tao,Miss Li,Mr Wang,Teng Fei,Han Lin,Linda。
场景：校园、家庭、成都、周末出游、运动会、图书馆。语法：现在进行时（be + V-ing）。
句子自然、可配图、有交际价值。避免过于复杂的从句。`;

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
每项：{"id":"s01","en":"...","zh":"...","focus":"am-is-are|ing-spelling|now-marker|negative|question|stative|simple-contrast","imageHint":"英文插画描述，crayon children's book style","source":"5GA/6GA/小升初","tokens":["分词语块无句末标点"]}
覆盖：am/is/are + V-ing 各若干、-ing 拼写例句、now/at the moment/look/listen 标志词、isn't/aren't/am not 否定、Am/Is/Are 疑问、2-3 条状态动词不能用进行时、2-3 条一般现在时对比句。`,
  },
  {
    name: "vocab",
    prompt: `生成 JSON：
{"vocabIng":[14项],"vocabMarkers":[8项],"vocabStative":[8项],"vocabBe":[6项]}
vocabIng项：{"word":"playing","base":"play","zh":"...","example":"现在进行时例句含 playing","exampleZh":"...","rule":"+ing|去e+ing|双写+ing|ie→y+ing","imageHint":"..."}
vocabMarkers项：{"word":"now","zh":"...","example":"含 now 的进行时句","exampleZh":"...","imageHint":"..."}
vocabStative项：{"word":"like","zh":"...","example":"I like apples.（不用 liking）","exampleZh":"...","imageHint":"..."}
vocabBe项：{"word":"am","zh":"...","example":"I am reading a book.","exampleZh":"...","imageHint":"..."}`,
  },
  {
    name: "quizzes",
    prompt: `生成 JSON：
{"qBeIng":[10],"qSpelling":[10],"qNeg":[8],"qQuestion":[8],"qMix":[20]}
每题：{"q":"填空句 ___ ","opts":["a","b","c"],"ans":0,"hint":"中文提示","sentence":"完整正确句","zh":"中文","source":"5GA/小升初"}
q 用现在进行时语境；opts 含常见干扰（原形/第三人称单数/过去式/be 混用）。`,
  },
  {
    name: "games",
    prompt: `生成 JSON：
{"matchPairs":[12],"listenPick":[10],"classifyItems":[8]}
matchPairs：{"en":"进行时句子","zh":"中文"}
listenPick：{"audio":"正确进行时句子","opts":["正确","干扰1","干扰2"],"ans":0,"zh":"..."}
classifyItems：{"text":"句子","bucket":"continuous|simple","hint":"...","zh":"..."}（4 continuous + 4 simple）`,
  },
];

async function runJob(job) {
  console.log(">>", job.name);
  const text = await chat(job.prompt, 6000);
  fs.writeFileSync(path.join(OUT_DIR, `_raw-${job.name}.txt`), text, "utf8");
  const parsed = extractJson(text);
  fs.writeFileSync(path.join(OUT_DIR, `_part-${job.name}.json`), JSON.stringify(parsed, null, 2), "utf8");
  console.log(
    "   ok",
    Object.keys(parsed)
      .map((k) => `${k}:${Array.isArray(parsed[k]) ? parsed[k].length : "?"}`)
      .join(", ")
  );
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
