#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, "..", "assets");
const KEY = process.env.DEEPSEEK_KEY || "sk-daa16008e81843deba6fefe9dce51465";

const SYSTEM = `你是资深小学英语教材作者。只输出合法 JSON，不要 markdown。
难度：5–6年级/小升初。人名：Lily,Tom,Emma,Jack,Chen Tao,Miss Li,Mr Wang,Teng Fei,Han Lin,Linda。
句子要有画面细节（动作、道具、天气、情绪），避免「某人在某地」式干句。`;

async function chat(user, max_tokens = 5000) {
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
      temperature: 0.8,
      max_tokens,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return (data.choices?.[0]?.message?.content || "").trim();
}

function extractJson(text) {
  let t = String(text || "").trim();
  if (t.startsWith("```")) t = t.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) t = t.slice(start, end + 1);
  // trailing commas fix
  t = t.replace(/,\s*([}\]])/g, "$1");
  return JSON.parse(t);
}

const JOBS = [
  {
    name: "scenes-a",
    prompt: `生成 {"sceneSentences":[18条]}。每项含 id(e01起),en,zh,focus,imageHint,source,tokens(按空格分词无句末标点)。
focus 分配：was×3,were×2,regular×5,irregular×5,negative×2,question×1。
场景要丰富生动：运动会冲刺、雨天黄伞、生日蜡烛、火锅蒸汽、图书馆踮脚拿书、农场喂羊、科学展火山模型、高铁窗边、川剧变脸、画室颜料等。`,
  },
  {
    name: "scenes-b",
    prompt: `生成 {"sceneSentences":[18条]}。每项含 id(e19起),en,zh,focus,imageHint,source,tokens。
focus：was×2,were×2,regular×4,irregular×5,negative×2,question×2,time×1。
场景：放风筝、游泳池跳水、菜市场买草莓、露营帐篷、踢足球进球、做手工灯笼、看望爷爷下棋、夜空看星星、熊猫基地拍照、课堂小剧场等。句子必须生动有细节。`,
  },
  {
    name: "games",
    prompt: `生成 JSON：
{"matchPairs":[12],"listenPick":[10],"vocabBoost":[12]}
matchPairs:{"en":"生动过去时句","zh":"..."}
listenPick:{"audio":"正确句","opts":["正确","干扰1","干扰2"],"ans":0,"zh":"..."}
vocabBoost:{"word":"过去式","base":"原形","zh":"...","example":"生动例句","exampleZh":"...","rule":"+ed|+d|y→ied|双写+ed|irregular","imageHint":"..."}`,
  },
];

async function run(job) {
  console.log(">>", job.name);
  for (let i = 0; i < 3; i++) {
    try {
      const text = await chat(job.prompt);
      fs.writeFileSync(path.join(ASSETS, `_enrich-raw-${job.name}.txt`), text, "utf8");
      const parsed = extractJson(text);
      fs.writeFileSync(path.join(ASSETS, `_enrich-part-${job.name}.json`), JSON.stringify(parsed, null, 2));
      console.log(
        "  ok",
        Object.keys(parsed)
          .map((k) => `${k}:${Array.isArray(parsed[k]) ? parsed[k].length : "?"}`)
          .join(", ")
      );
      return parsed;
    } catch (e) {
      console.error("  retry", i, e.message.slice(0, 180));
      await new Promise((r) => setTimeout(r, 1200));
    }
  }
  throw new Error("failed " + job.name);
}

async function main() {
  const merged = { sceneSentences: [], matchPairs: [], listenPick: [], vocabBoost: [] };
  for (const job of JOBS) {
    const part = await run(job);
    if (part.sceneSentences) merged.sceneSentences.push(...part.sceneSentences);
    if (part.matchPairs) merged.matchPairs = part.matchPairs;
    if (part.listenPick) merged.listenPick = part.listenPick;
    if (part.vocabBoost) merged.vocabBoost = part.vocabBoost;
  }
  // renumber ids
  merged.sceneSentences = merged.sceneSentences.map((s, i) => ({
    ...s,
    id: "e" + String(i + 1).padStart(2, "0"),
  }));
  const out = path.join(ASSETS, "_enrich-scenes.json");
  fs.writeFileSync(out, JSON.stringify(merged, null, 2));
  console.log("MERGED scenes=", merged.sceneSentences.length, out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
