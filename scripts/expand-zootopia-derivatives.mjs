/**
 * 为「新课01疯狂动物城2」补充常见词族变形（不限题目答案形式）
 * 用法: node scripts/expand-zootopia-derivatives.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "HET", "词形填空练习", "courseware");
const FILE = path.join(DIR, "新课01疯狂动物城2选词填空.html");
const HANDOUT = path.join(DIR, "新课01疯狂动物城2选词填空handout.html");

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || "sk-daa16008e81843deba6fefe9dce51465";
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

/** 中考常见词族目标（须覆盖，可再加 1 个合理变形） */
const FAMILY_TARGETS = {
  appear: ["appear", "appearance", "disappear", "disappearance"],
  wrong: ["wrong", "wrongly", "wrongness"],
  quick: ["quick", "quickly", "quicker", "quickest"],
  divide: ["divide", "divided", "division", "divisible"],
  prevent: ["prevent", "prevention", "preventable"],
  effort: ["effort", "efforts", "effortless", "effortlessly"],
  secret: ["secret", "secrets", "secretly", "secrecy"],
  while: ["while", "meanwhile"],
  regret: ["regret", "regretted", "regrettable", "regretful"],
  worth: ["worth", "worthy", "worthless", "worthwhile"],
  invent: ["invent", "invention", "inventor", "inventive"],
  save: ["save", "saved", "safe", "safety", "safely"],
};

function extractConstArray(html, name) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`missing ${name}`);
  let i = start + marker.length;
  while (/\s/.test(html[i])) i++;
  if (html[i] !== "[") throw new Error(`${name} not array`);
  let depth = 0,
    inStr = false,
    strCh = "",
    escape = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (inStr) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === "\\") {
        escape = true;
        continue;
      }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = true;
      strCh = c;
      continue;
    }
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return { start, end: j + 1, text: html.slice(i, j + 1) };
    }
  }
  throw new Error(`unclosed ${name}`);
}

function formatJsonBlock(obj, indent = 4) {
  const pad = " ".repeat(indent);
  return JSON.stringify(obj, null, 4)
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

function buildBatchPrompt(batch) {
  // batch: [{ headword, examForm, requiredForms }]
  const lines = batch
    .map(
      (b) =>
        `- headword: ${b.headword}\n  examForm(保持): ${b.examForm}\n  须覆盖变形: ${b.requiredForms.join(", ")}`
    )
    .join("\n");

  return `你是中国中考英语词形教学专家。请为下列词生成 Step3 词族变形（derivatives）与 Step4 考点例句（examExamples）。

## 词表
${lines}

## 输出纯 JSON（无 markdown）
{
  "items": [
    {
      "headword": "appear",
      "derivatives": [ /* 覆盖须覆盖变形中的非原形；每词 2-4 条 */ ],
      "examTarget": {
        "form": "与 examForm 完全一致",
        "examExamples": [ /* 3-4 条，覆盖不同变形 */ ],
        "note": "中文：考点 + 提醒掌握整族变形"
      }
    }
  ]
}

derivatives 每条：
{
  "q": "词性 · 词形（如：名词 appearance）",
  "answer": "拼写（appearance / disappear / disappearance / wrongly / quicker 等）",
  "readAloud": "朗读词",
  "note": "构词提示",
  "exampleSentence": "自编中考难度例句，情境具体，可用于写作口语",
  "exampleZh": "准确中文译文",
  "induct": { "title": "归纳标题", "peers": ["6个同类词/短语"], "tip": "提示" }
}

examExamples 每条：
{ "readSentence": "完整英文句且含 blankAnswer 原词", "readSentenceZh": "译文", "blankAnswer": "某变形" }

## 质量
- appear 族必须含 appearance、disappear、disappearance
- 例句语义清晰、译文忠实；禁止空洞套话
- items 顺序与词表一致；JSON 合法`;
}

async function callDeepSeek(prompt, retries = 2) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(DEEPSEEK_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DEEPSEEK_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "You output only valid JSON. No markdown fences." },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 8000,
        }),
      });
      if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${(await res.text()).slice(0, 400)}`);
      const data = await res.json();
      let text = data.choices?.[0]?.message?.content || "";
      text = text.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
      return JSON.parse(text);
    } catch (e) {
      lastErr = e;
      console.warn(`  retry ${attempt + 1}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  throw lastErr;
}

function mergeFromItems(oldUnits, itemsByHeadword) {
  return oldUnits.map((oldU) => {
    const n = itemsByHeadword[oldU.headword];
    if (!n) throw new Error(`缺少 ${oldU.headword}`);
    const ders = n.derivatives || [];
    const needNonBase = (FAMILY_TARGETS[oldU.headword] || []).filter((f) => f !== oldU.headword);
    const min = Math.min(2, Math.max(1, needNonBase.length));
    if (ders.length < min) {
      throw new Error(`${oldU.headword} derivatives 过少 (${ders.length}, 至少 ${min})`);
    }
    return {
      ...oldU,
      derivatives: ders,
      examTarget: {
        form: oldU.examTarget?.form,
        examExamples: n.examTarget?.examExamples?.length
          ? n.examTarget.examExamples
          : oldU.examTarget?.examExamples,
        note: n.examTarget?.note || oldU.examTarget?.note,
      },
    };
  });
}

function validateFamilies(units) {
  for (const u of units) {
    const need = (FAMILY_TARGETS[u.headword] || []).filter((f) => f !== u.headword);
    const got = new Set((u.derivatives || []).map((d) => String(d.answer).toLowerCase()));
    // also accept forms that appear only in examExamples
    for (const ex of u.examTarget?.examExamples || []) {
      got.add(String(ex.blankAnswer).toLowerCase());
    }
    const missing = need.filter((f) => {
      const fl = f.toLowerCase();
      // was divided / to prevent style
      if (fl === "divided") return ![...got].some((g) => g.includes("divided"));
      if (fl === "prevent") return false; // base form
      return !got.has(fl) && ![...got].some((g) => g === fl || g.endsWith(fl));
    });
    if (missing.length) {
      console.warn(`[warn] ${u.headword} 可能缺少: ${missing.join(", ")} | 现有: ${[...got].join(", ")}`);
    }
  }
}

function patchHtml(html, units) {
  const { start, end } = extractConstArray(html, "VOCAB_UNITS");
  // find "const slides" after VOCAB_UNITS to preserve spacing style of courseware
  const slidesIdx = html.indexOf("const slides", end);
  if (slidesIdx < 0) throw new Error("const slides not found");
  const block = `const VOCAB_UNITS = ${formatJsonBlock(units)}\n\n    `;
  return html.slice(0, start) + block + html.slice(slidesIdx);
}

function patchHandout(handoutHtml, coursewareHtml) {
  const startCw = coursewareHtml.indexOf("const VOCAB_UNITS");
  const endCw = coursewareHtml.indexOf("const slides", startCw);
  const vocabSection = coursewareHtml.slice(startCw, endCw).trim();
  const startHo = handoutHtml.indexOf("const VOCAB_UNITS");
  const endHo = handoutHtml.indexOf("function escapeHtml");
  if (startHo < 0 || endHo < 0) throw new Error("handout VOCAB_UNITS missing");
  return handoutHtml.slice(0, startHo) + vocabSection + "\n\n    " + handoutHtml.slice(endHo);
}

async function main() {
  const html = fs.readFileSync(FILE, "utf8");
  const { text } = extractConstArray(html, "VOCAB_UNITS");
  const oldUnits = Function(`"use strict"; return (${text});`)();

  const batches = [];
  for (let i = 0; i < oldUnits.length; i += 3) {
    batches.push(
      oldUnits.slice(i, i + 3).map((u) => ({
        headword: u.headword,
        examForm: u.examTarget?.form || u.headword,
        requiredForms: FAMILY_TARGETS[u.headword] || [u.headword],
      }))
    );
  }

  const itemsByHeadword = {};
  for (let bi = 0; bi < batches.length; bi++) {
    const batch = batches[bi];
    console.log(`[api] batch ${bi + 1}/${batches.length}: ${batch.map((b) => b.headword).join(", ")}`);
    const result = await callDeepSeek(buildBatchPrompt(batch));
    const items = result.items || result.vocabUnits || [];
    if (items.length !== batch.length) {
      throw new Error(`batch ${bi + 1} 期望 ${batch.length} 项，得 ${items.length}`);
    }
    for (const it of items) itemsByHeadword[it.headword] = it;
    await new Promise((r) => setTimeout(r, 800));
  }

  const merged = mergeFromItems(oldUnits, itemsByHeadword);
  validateFamilies(merged);

  const cache = path.join(DIR, ".zootopia-expanded-derivs.json");
  fs.writeFileSync(cache, JSON.stringify(merged, null, 2), "utf8");

  const out = patchHtml(html, merged);
  fs.writeFileSync(FILE, out, "utf8");

  if (fs.existsSync(HANDOUT)) {
    const ho = fs.readFileSync(HANDOUT, "utf8");
    fs.writeFileSync(HANDOUT, patchHandout(ho, out), "utf8");
  }

  for (const u of merged) {
    console.log(
      u.headword.padEnd(10),
      "→",
      (u.derivatives || []).map((d) => d.answer).join(", ")
    );
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
