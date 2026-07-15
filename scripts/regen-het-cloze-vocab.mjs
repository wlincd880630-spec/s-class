/**
 * 批量重生成 HET 选词填空课件词汇例句（DeepSeek，对齐新课01质量标准）
 *
 * 用法:
 *   node scripts/regen-het-cloze-vocab.mjs --set 33          # 单套
 *   node scripts/regen-het-cloze-vocab.mjs --from 1 --to 5   # 范围
 *   node scripts/regen-het-cloze-vocab.mjs --all             # 全部 53 套（跳过已完成）
 *   node scripts/regen-het-cloze-vocab.mjs --all --force     # 强制重做
 *   node scripts/regen-het-cloze-vocab.mjs --set 01 --dry    # 仅打印，不调 API
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "HET", "词形填空练习", "courseware");
const PROGRESS = path.join(DIR, ".regen-cloze-vocab-progress.json");
const CACHE_DIR = path.join(DIR, ".regen-cloze-vocab-cache");

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
  return fs
    .readdirSync(DIR)
    .filter((f) => /^套题\d+选词填空\.html$/.test(f))
    .map((f) => ({ num: Number(f.match(/套题(\d+)/)[1]), file: f }))
    .sort((a, b) => a.num - b.num);
}

function setFileName(num) {
  return `套题${pad2(num)}选词填空.html`;
}

function resolveTargets() {
  const all = listSets();
  if (setArg) {
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
  node scripts/regen-het-cloze-vocab.mjs --set 33
  node scripts/regen-het-cloze-vocab.mjs --from 1 --to 10
  node scripts/regen-het-cloze-vocab.mjs --all [--force] [--dry]`);
  process.exit(0);
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS)) return { done: {} };
  return JSON.parse(fs.readFileSync(PROGRESS, "utf8"));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 2), "utf8");
}

function evalJsLiteral(code) {
  return Function(`"use strict"; return (${code});`)();
}

function extractConst(html, name) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`未找到 const ${name}`);
  let i = start + marker.length;
  while (i < html.length && /\s/.test(html[i])) i++;
  const open = html[i];
  if (open !== "[" && open !== "{") throw new Error(`${name} 不是对象/数组`);
  const close = open === "[" ? "]" : "}";
  let depth = 0;
  let inStr = false;
  let strCh = "";
  let escape = false;
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
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return html.slice(i, j + 1);
    }
  }
  throw new Error(`无法解析 ${name}`);
}

function parseCourseware(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1] || path.basename(filePath);
  const wordBank = evalJsLiteral(extractConst(html, "WORD_BANK"));
  const practiceAns = evalJsLiteral(extractConst(html, "PRACTICE_ANS"));
  const passage = (html.match(/const PASSAGE = `([\s\S]*?)`;/) || [])[1];
  if (!passage) throw new Error("未找到 PASSAGE");
  const vocabUnits = evalJsLiteral(extractConst(html, "VOCAB_UNITS"));
  return { html, title, wordBank, practiceAns, passage, vocabUnits };
}

function norm(s) {
  return String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function buildWordSpecs(wordBank, practiceAns, vocabUnits) {
  const ansValues = Object.values(practiceAns).map(norm);
  const ansEntries = Object.entries(practiceAns);

  return wordBank.map((headword) => {
    const unit = vocabUnits.find((u) => u.headword === headword) || { headword };
    const examForm = unit.examTarget?.form || headword;
    const blankEntry = ansEntries.find(([, v]) => norm(v) === norm(examForm));
    const isDistractor = !blankEntry && !ansValues.some((v) => v === norm(headword) || v.includes(norm(headword)));
    // fallback: if examForm matches an answer, it's used
    const usedInExam = Boolean(blankEntry) || ansValues.includes(norm(examForm));
    return {
      headword,
      examForm,
      blankNum: blankEntry ? blankEntry[0] : null,
      isDistractor: !usedInExam,
    };
  });
}

function buildPrompt(meta) {
  const { title, wordBank, practiceAns, passage, wordSpecs, setNum } = meta;
  const answerLines = Object.entries(practiceAns)
    .map(([k, v]) => `空${k}: ${v}`)
    .join("\n");
  const wordLines = wordSpecs
    .map((w) => {
      const role = w.isDistractor
        ? "干扰项（未入正文）"
        : `正文考点词形: ${w.examForm}${w.blankNum ? `（空${w.blankNum}）` : ""}`;
      return `- ${w.headword}: ${role}`;
    })
    .join("\n");

  return `你是中国中考英语命题与教学设计专家。请为「选词填空」互动课件重写全部词汇教学内容（仅 JSON）。

## 套题信息
- 套题编号: ${pad2(setNum)}
- 标题: ${title}
- 词库（12词，顺序固定）: ${wordBank.join(", ")}
- 正确答案:
${answerLines}
- 各词角色:
${wordLines}

## 语篇（只读参考，禁止改写或复述原文）
${passage}

## 输出
返回**纯 JSON**（无 markdown），结构:
{
  "vocabUnits": [ 12 个对象，顺序与词库一致 ]
}

每个 vocabUnits 项:
{
  "headword": "原形（与词库一致）",
  "spell": "原形",
  "ttsWord": "原形",
  "defA2": "一句简明 A2 英文释义",
  "defReadAloud": "适合朗读的英文释义",
  "usages": [
    {
      "label": "中文用法标签（具体、不空泛）",
      "sentence": "自编英文例句：语义清晰、情境具体、中考难度；禁止复述上方语篇原文",
      "sentenceZh": "准确自然的中文译文，与英文逐句对应，禁止意译到语义偏离",
      "explain": "中文：说明该用法与词性",
      "rephrase": "更简单的 A2 英文改写"
    }
  ],
  "derivatives": [
    {
      "q": "Step3 标题（如「名词 disappearance」「副词 wrongly」）",
      "answer": "目标词形",
      "readAloud": "朗读词",
      "note": "拼写/语法提示",
      "exampleSentence": "自编例句（不复述语篇）",
      "exampleZh": "准确中文译文",
      "induct": {
        "title": "归纳标题",
        "peers": ["6个同类词或短语"],
        "tip": "语法/构词提示"
      }
    }
  ],
  "examTarget": {
    "form": "本题应填词形（干扰项填原形）",
    "examExamples": [
      {
        "readSentence": "完整英文句，必须包含 blankAnswer 原词；可1句贴近考点语境+1-2句迁移句",
        "readSentenceZh": "准确中文译文",
        "blankAnswer": "与 form 一致"
      }
    ],
    "note": "套题${pad2(setNum)} · 考点说明（中文，说明为何填该词形）"
  }
}

## 质量红线（必须遵守）
1. 例句必须有明确主语、动作与结果，避免空洞套话（如泛泛的 "It is important to..." 无具体情境）
2. 中文译文必须忠实、通顺，不得出现语义不明或「莫名其妙」的翻译
3. 每条例句应对写作或口语有迁移价值（校园、家庭、社会热点、科普等真实情境）
4. 难度对齐中国中考（初三）；词汇与句长适中
5. usages 恰好 3 条；derivatives 1-2 条；examExamples 2-3 条
6. 考点词的 examTarget.form 必须与给定答案词形一致；干扰项 note 须含「干扰项」
7. 禁止修改语篇、答案或词库顺序；JSON 合法`;
}

async function callDeepSeek(prompt) {
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
      temperature: 0.35,
      max_tokens: 16000,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const data = await res.json();
  let text = data.choices?.[0]?.message?.content || "";
  text = text.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
  return JSON.parse(text);
}

function formatJsonBlock(obj, indent = 4) {
  const pad = " ".repeat(indent);
  return JSON.stringify(obj, null, 4)
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

function patchVocabInCourseware(html, vocabUnits) {
  const start = html.indexOf("const VOCAB_UNITS");
  const end = html.indexOf("const slides", start);
  if (start < 0 || end < 0) throw new Error("无法定位 VOCAB_UNITS 块（courseware）");
  const block = `const VOCAB_UNITS = ${formatJsonBlock(vocabUnits)}\n\n    `;
  return html.slice(0, start) + block + html.slice(end);
}

function patchVocabInHandout(handoutHtml, coursewareHtml) {
  const startCw = coursewareHtml.indexOf("const VOCAB_UNITS");
  const endCw = coursewareHtml.indexOf("const slides", startCw);
  const vocabSection = coursewareHtml.slice(startCw, endCw).trim();
  const startHo = handoutHtml.indexOf("const VOCAB_UNITS");
  const endHo = handoutHtml.indexOf("function escapeHtml");
  if (startHo < 0 || endHo < 0) throw new Error("无法定位 handout VOCAB_UNITS");
  return handoutHtml.slice(0, startHo) + vocabSection + "\n\n    " + handoutHtml.slice(endHo);
}

function validateVocab(vocabUnits, wordBank, practiceAns, wordSpecs) {
  if (!Array.isArray(vocabUnits) || vocabUnits.length !== wordBank.length) {
    throw new Error(`vocabUnits 数量应为 ${wordBank.length}，实际 ${vocabUnits?.length}`);
  }
  for (let i = 0; i < wordBank.length; i++) {
    if (vocabUnits[i].headword !== wordBank[i]) {
      throw new Error(`词序错误: 期望 ${wordBank[i]}，得 ${vocabUnits[i].headword}`);
    }
    if (!vocabUnits[i].usages || vocabUnits[i].usages.length < 3) {
      throw new Error(`${wordBank[i]} usages 不足 3 条`);
    }
    const spec = wordSpecs[i];
    if (!spec.isDistractor && vocabUnits[i].examTarget?.form) {
      const expected = norm(spec.examForm);
      const got = norm(vocabUnits[i].examTarget.form);
      if (expected !== got) {
        throw new Error(`${wordBank[i]} examTarget.form 应为 ${spec.examForm}，得 ${vocabUnits[i].examTarget.form}`);
      }
    }
  }
}

async function processSet(setInfo, progress) {
  const { num, file } = setInfo;
  const key = pad2(num);
  if (!force && progress.done[key]) {
    console.log(`[skip] 套题 ${key} 已完成`);
    return;
  }

  const filePath = path.join(DIR, file);
  const handoutPath = path.join(DIR, file.replace(".html", "handout.html"));
  const meta = parseCourseware(filePath);
  const wordSpecs = buildWordSpecs(meta.wordBank, meta.practiceAns, meta.vocabUnits);
  const prompt = buildPrompt({ ...meta, wordSpecs, setNum: num });

  if (dry) {
    console.log(`\n=== 套题 ${key} DRY ===\n${prompt.slice(0, 800)}...\n`);
    return;
  }

  const cachePath = path.join(CACHE_DIR, `set-${key}.json`);
  let result;
  if (!force && fs.existsSync(cachePath)) {
    result = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    console.log(`[cache] 套题 ${key}`);
  } else {
    console.log(`[api] 套题 ${key} · ${meta.title}`);
    result = await callDeepSeek(prompt);
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(cachePath, JSON.stringify(result, null, 2), "utf8");
  }

  validateVocab(result.vocabUnits, meta.wordBank, meta.practiceAns, wordSpecs);

  let html = patchVocabInCourseware(meta.html, result.vocabUnits);
  fs.writeFileSync(filePath, html, "utf8");

  if (fs.existsSync(handoutPath)) {
    const handoutHtml = fs.readFileSync(handoutPath, "utf8");
    fs.writeFileSync(handoutPath, patchVocabInHandout(handoutHtml, html), "utf8");
  }

  progress.done[key] = { at: new Date().toISOString(), title: meta.title };
  saveProgress(progress);
  console.log(`[done] 套题 ${key}`);
}

async function main() {
  const targets = resolveTargets();
  const progress = loadProgress();
  console.log(`待处理 ${targets.length} 套${force ? "（强制）" : ""}${dry ? "（dry）" : ""}`);

  for (const setInfo of targets) {
    try {
      await processSet(setInfo, progress);
      if (!dry) await new Promise((r) => setTimeout(r, 1200));
    } catch (e) {
      console.error(`[fail] 套题 ${pad2(setInfo.num)}:`, e.message);
      if (!runAll && !fromArg && setArg) process.exit(1);
    }
  }
  console.log("完成。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
