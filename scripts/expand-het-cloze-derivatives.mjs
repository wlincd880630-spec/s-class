/**
 * 为全部 HET 选词填空套题补充常见词族变形（不局限于题目答案）
 *
 * 用法:
 *   node scripts/expand-het-cloze-derivatives.mjs --set 33
 *   node scripts/expand-het-cloze-derivatives.mjs --from 1 --to 10
 *   node scripts/expand-het-cloze-derivatives.mjs --all
 *   node scripts/expand-het-cloze-derivatives.mjs --all --force
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "HET", "词形填空练习", "courseware");
const PROGRESS = path.join(DIR, ".expand-cloze-derivs-progress.json");
const CACHE_DIR = path.join(DIR, ".expand-cloze-derivs-cache");

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || "sk-daa16008e81843deba6fefe9dce51465";
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const force = args.includes("--force");
const setArg = args.includes("--set") ? args[args.indexOf("--set") + 1] : null;
const fromArg = args.includes("--from") ? Number(args[args.indexOf("--from") + 1]) : null;
const toArg = args.includes("--to") ? Number(args[args.indexOf("--to") + 1]) : null;
const runAll = args.includes("--all");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function listSets() {
  const numbered = fs
    .readdirSync(DIR)
    .filter((f) => /^套题\d+选词填空\.html$/.test(f))
    .map((f) => ({ num: Number(f.match(/套题(\d+)/)[1]), file: f, key: pad2(Number(f.match(/套题(\d+)/)[1])) }))
    .sort((a, b) => a.num - b.num);
  const themes = fs
    .readdirSync(DIR)
    .filter((f) => /^新课\d+.+选词填空\.html$/.test(f) && !f.includes("handout"))
    .map((f) => ({ num: 1000 + Number((f.match(/新课(\d+)/) || [])[1] || 0), file: f, key: f.replace(/\.html$/, "") }));
  return [...themes, ...numbered];
}

function resolveTargets() {
  const all = listSets();
  if (setArg) {
    if (String(setArg).startsWith("新课") || String(setArg).includes("疯狂")) {
      const hit = all.find((s) => s.file.includes(String(setArg)) || s.key.includes(String(setArg)));
      if (!hit) throw new Error(`未找到 ${setArg}`);
      return [hit];
    }
    const num = Number(setArg);
    const hit = all.find((s) => s.num === num);
    if (!hit) throw new Error(`套题 ${setArg} 不存在`);
    return [hit];
  }
  if (fromArg != null || toArg != null) {
    const lo = fromArg ?? 1;
    const hi = toArg ?? 53;
    return all.filter((s) => s.num >= lo && s.num <= hi);
  }
  if (runAll) return all;
  console.log(`用法:
  node scripts/expand-het-cloze-derivatives.mjs --set 33
  node scripts/expand-het-cloze-derivatives.mjs --set 新课01
  node scripts/expand-het-cloze-derivatives.mjs --from 1 --to 10
  node scripts/expand-het-cloze-derivatives.mjs --all [--force]`);
  process.exit(0);
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS)) return { done: {} };
  return JSON.parse(fs.readFileSync(PROGRESS, "utf8"));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 2), "utf8");
}

function extractArrayLiteral(html, name) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`未找到 ${name}`);
  let i = start + marker.length;
  while (/\s/.test(html[i])) i++;
  if (html[i] !== "[") throw new Error(`${name} 不是数组`);
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
      if (depth === 0) return { start, arrayStart: i, end: j + 1, text: html.slice(i, j + 1) };
    }
  }
  throw new Error(`无法解析 ${name}`);
}

function formatJsonBlock(obj, indent = 4) {
  const pad = " ".repeat(indent);
  return JSON.stringify(obj, null, 4)
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

function buildBatchPrompt(batch, setNum) {
  const lines = batch
    .map(
      (b) =>
        `- headword: ${b.headword}\n  examForm(保持): ${b.examForm}\n  现有变形: ${b.existing.join(", ") || "(无)"}`
    )
    .join("\n");

  return `你是中国中考英语词形教学专家。请为「选词填空套题${pad2(setNum)}」补充每个词的常见词族变形。

## 原则
- **不要只教题目答案**：须覆盖该词中考高频词族（名词/动词/形容词/副词、常见前后缀、比较级、被动、否定前缀等）
- 原形已在 Step1，derivatives 的 answer **禁止重复原形 headword**；每条 answer 必须是不同拼写
- 禁止把同一词写三遍；每条须有真实变形（-ed/-ing/-ly/-tion/-ness/比较级/否定前缀等）
- 例：forward → forwards / forwarded / forwarding；start → started / starting / starter；total → totally / totals
- 功能词也尽量给出相关变化，禁止 answer 填三次相同原形
- 例句情境具体、可用于写作口语；中文译文忠实通顺
- examForm 必须原样保留在 examTarget.form

## 词表
${lines}

## 输出纯 JSON（无 markdown）
{
  "items": [
    {
      "headword": "inspire",
      "derivatives": [
        {
          "q": "过去分词 / 被动 inspired",
          "answer": "inspired",
          "readAloud": "inspired",
          "note": "构词或用法提示",
          "exampleSentence": "自编例句",
          "exampleZh": "译文",
          "induct": { "title": "归纳标题", "peers": ["6个同类"], "tip": "提示" }
        }
      ],
      "examTarget": {
        "form": "与 examForm 完全一致",
        "examExamples": [
          { "readSentence": "含 blankAnswer 的完整句", "readSentenceZh": "译文", "blankAnswer": "某变形" }
        ],
        "note": "套题${pad2(setNum)} · 考点 + 提醒掌握整族变形"
      }
    }
  ]
}

examExamples：3–4 条，**覆盖不同变形**（含考点答案 + 其他常见形式）。
items 顺序与词表一致。JSON 合法。`;
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

function cleanDerivatives(headword, ders) {
  const hw = String(headword).toLowerCase();
  const seen = new Set();
  const out = [];
  for (const d of ders || []) {
    const ans = String(d.answer || "").trim();
    if (!ans) continue;
    const key = ans.toLowerCase();
    if (key === hw) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ ...d, answer: ans });
  }
  return out;
}

function mergeUnits(oldUnits, itemsByHeadword, setNum) {
  return oldUnits.map((oldU) => {
    const n = itemsByHeadword[oldU.headword];
    if (!n) throw new Error(`缺少 ${oldU.headword}`);
    let ders = cleanDerivatives(oldU.headword, n.derivatives);
    if (ders.length < 1) {
      ders = cleanDerivatives(oldU.headword, oldU.derivatives);
      console.warn(`  [warn] ${oldU.headword} API 无有效新变形，保留旧内容 (${ders.length})`);
    }
    // 仍为空时：若考点词形≠原形，至少保留考点词形一条
    if (ders.length < 1) {
      const form = oldU.examTarget?.form;
      if (form && String(form).toLowerCase() !== String(oldU.headword).toLowerCase()) {
        ders = [
          {
            q: `考点词形 ${form}`,
            answer: form,
            readAloud: form,
            note: "本题考点形式；请结合用法继续积累同族词。",
            exampleSentence: oldU.examTarget?.examExamples?.[0]?.readSentence || "",
            exampleZh: oldU.examTarget?.examExamples?.[0]?.readSentenceZh || "",
            induct: {
              title: "归纳 · 关注本题考点",
              peers: [form, oldU.headword],
              tip: "该词变形较少，先掌握考点用法。",
            },
          },
        ];
      }
    }
    const examForm = oldU.examTarget?.form || oldU.headword;
    // 确保考点词形始终出现在 Step3（若与原形不同）
    if (
      examForm &&
      String(examForm).toLowerCase() !== String(oldU.headword).toLowerCase() &&
      !ders.some((d) => String(d.answer).toLowerCase() === String(examForm).toLowerCase())
    ) {
      ders.unshift({
        q: `考点词形 ${examForm}`,
        answer: examForm,
        readAloud: examForm,
        note: "本题填空所需形式，优先掌握。",
        exampleSentence: oldU.examTarget?.examExamples?.[0]?.readSentence || "",
        exampleZh: oldU.examTarget?.examExamples?.[0]?.readSentenceZh || "",
        induct: {
          title: "归纳 · 本题考点",
          peers: [examForm],
          tip: "先牢记考点形式，再扩展同族词。",
        },
      });
    }
    return {
      ...oldU,
      derivatives: ders.length ? ders : oldU.derivatives || [],
      examTarget: {
        form: examForm,
        examExamples: n.examTarget?.examExamples?.length
          ? n.examTarget.examExamples
          : oldU.examTarget?.examExamples || [],
        note:
          n.examTarget?.note ||
          oldU.examTarget?.note ||
          `套题${pad2(setNum)} · 考点：${examForm}`,
      },
    };
  });
}

function patchCourseware(html, units) {
  const { start } = extractArrayLiteral(html, "VOCAB_UNITS");
  const slidesIdx = html.indexOf("const slides", start);
  if (slidesIdx < 0) throw new Error("未找到 const slides");
  const block = `const VOCAB_UNITS = ${formatJsonBlock(units)}\n\n    `;
  return html.slice(0, start) + block + html.slice(slidesIdx);
}

function patchHandout(handoutHtml, coursewareHtml) {
  const startCw = coursewareHtml.indexOf("const VOCAB_UNITS");
  const endCw = coursewareHtml.indexOf("const slides", startCw);
  const vocabSection = coursewareHtml.slice(startCw, endCw).trim();
  const startHo = handoutHtml.indexOf("const VOCAB_UNITS");
  const endHo = handoutHtml.indexOf("function escapeHtml");
  if (startHo < 0 || endHo < 0) throw new Error("handout VOCAB_UNITS 缺失");
  return handoutHtml.slice(0, startHo) + vocabSection + "\n\n    " + handoutHtml.slice(endHo);
}

async function processSet(setInfo, progress) {
  const { num, file } = setInfo;
  const key = setInfo.key || pad2(num);
  if (!force && progress.done[key]) {
    console.log(`[skip] ${key}`);
    return;
  }

  const filePath = path.join(DIR, file);
  const handoutPath = path.join(DIR, file.replace(".html", "handout.html"));
  const html = fs.readFileSync(filePath, "utf8");
  const { text } = extractArrayLiteral(html, "VOCAB_UNITS");
  const oldUnits = Function(`"use strict"; return (${text});`)();

  const batches = [];
  for (let i = 0; i < oldUnits.length; i += 3) {
    batches.push(
      oldUnits.slice(i, i + 3).map((u) => ({
        headword: u.headword,
        examForm: u.examTarget?.form || u.headword,
        existing: (u.derivatives || []).map((d) => d.answer),
      }))
    );
  }

  if (dry) {
    console.log(`[dry] ${key}: ${oldUnits.map((u) => u.headword).join(", ")} · ${batches.length} batches`);
    return;
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const itemsByHeadword = {};
  const cachePrefix = String(key).replace(/[^\w\u4e00-\u9fff-]+/g, "_");
  const setLabel = num < 1000 ? num : 0;

  for (let bi = 0; bi < batches.length; bi++) {
    const batch = batches[bi];
    const cachePath = path.join(CACHE_DIR, `${cachePrefix}-b${bi}.json`);
    let result;
    if (!force && fs.existsSync(cachePath)) {
      result = JSON.parse(fs.readFileSync(cachePath, "utf8"));
      console.log(`[cache] ${key} batch ${bi + 1}/${batches.length}`);
    } else {
      console.log(`[api] ${key} batch ${bi + 1}/${batches.length}: ${batch.map((b) => b.headword).join(", ")}`);
      result = await callDeepSeek(buildBatchPrompt(batch, setLabel));
      fs.writeFileSync(cachePath, JSON.stringify(result, null, 2), "utf8");
      await new Promise((r) => setTimeout(r, 800));
    }
    const items = result.items || [];
    if (items.length !== batch.length) {
      throw new Error(`${key} batch ${bi + 1}: 期望 ${batch.length}，得 ${items.length}`);
    }
    for (const it of items) itemsByHeadword[it.headword] = it;
  }

  const merged = mergeUnits(oldUnits, itemsByHeadword, setLabel);
  const out = patchCourseware(html, merged);
  fs.writeFileSync(filePath, out, "utf8");

  if (fs.existsSync(handoutPath)) {
    const ho = fs.readFileSync(handoutPath, "utf8");
    fs.writeFileSync(handoutPath, patchHandout(ho, out), "utf8");
  }

  const dens = merged.map((u) => `${u.headword}(${(u.derivatives || []).length})`).join(" ");
  progress.done[key] = { at: new Date().toISOString(), dens };
  saveProgress(progress);
  console.log(`[done] ${key} · ${dens}`);
}

async function main() {
  const targets = resolveTargets();
  const progress = loadProgress();
  console.log(`待处理 ${targets.length} 套${force ? "（强制）" : ""}${dry ? "（dry）" : ""}`);

  for (const setInfo of targets) {
    try {
      await processSet(setInfo, progress);
    } catch (e) {
      console.error(`[fail] 套题 ${pad2(setInfo.num)}:`, e.message);
      if (setArg) process.exit(1);
    }
  }
  console.log("完成。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
