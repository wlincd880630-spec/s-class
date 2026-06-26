#!/usr/bin/env node
/**
 * 批量调用 DeepSeek 生成干货解析，写入 HET/exam-shared/parse-data/*.js
 * 用法: node scripts/generate-exam-parse.mjs [zhenti|mock1|mock2|all]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DEEPSEEK_API_KEY = "sk-daa16008e81843deba6fefe9dce51465";
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";
const BATCH_SIZE = 6;

const EXAMS = {
  zhenti: {
    html: path.join(ROOT, "2026EXAM/HET/2026成都中考英语真题-答案与解析.html"),
    out: path.join(ROOT, "HET/exam-shared/parse-data/zhenti.js"),
  },
  mock1: {
    html: path.join(ROOT, "HET/2026 Mock 1/2026成都英语黑卷-答案与解析.html"),
    out: path.join(ROOT, "HET/exam-shared/parse-data/mock1.js"),
  },
  mock2: {
    html: path.join(ROOT, "HET/2026 Mock 2/2026成都英语白卷-答案与解析.html"),
    out: path.join(ROOT, "HET/2026 Mock 2/../exam-shared/parse-data/mock2.js".replace("2026 Mock 2/../", "")),
  },
};
EXAMS.mock2.out = path.join(ROOT, "HET/exam-shared/parse-data/mock2.js");

const SYSTEM_PROMPT =
  "你是成都中考英语首席教研员。为教师写「干货解析」，禁止套话、禁止「带学生找答案」式逐步啰嗦、禁止重复题干原文。\n" +
  "只输出一个 JSON 对象（不要 markdown 代码块），键为题 id（如 key-26），值为 HTML 字符串。\n" +
  "每个 HTML 值结构固定：\n" +
  '<div class="parse-dry"><p><strong>答案</strong> …</p><p><strong>考点</strong> …</p><p><strong>依据</strong> …</p><p><strong>易错</strong> …（无则省略此段）</p></div>\n' +
  "选择题说明为何正确项对、干扰项错（各一句）；填空题说明搭配/语法；任务型阅读给可抄写的英文要点。\n" +
  "每题全篇不超过 140 字（开放题 180 字）。";

function extractKeys(html) {
  const doc = new JSDOM(html).window.document;
  const keys = [];
  doc.querySelectorAll(".teacher-key").forEach((el) => {
    const id = el.id;
    if (!id) return;
    keys.push({
      id,
      head: el.querySelector(".tk-head")?.textContent?.trim() || "",
      ans: el.querySelector(".tk-ans")?.textContent?.trim() || "",
      oldParse: (el.querySelector(".tk-parse")?.textContent || "").trim().slice(0, 2200),
      sample: el.querySelector(".tk-sample")?.textContent?.trim() || "",
      rubric: el.querySelector(".tk-rubric")?.textContent?.trim() || "",
    });
  });
  return keys;
}

function parseJsonFromText(raw) {
  const t = String(raw || "").trim();
  const m = t.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("无 JSON");
  return JSON.parse(m[0]);
}

async function deepseekChat(system, user, temperature) {
  const res = await fetch(DEEPSEEK_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + DEEPSEEK_API_KEY,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: temperature == null ? 0.22 : temperature,
    }),
  });
  if (!res.ok) throw new Error("DeepSeek " + res.status + " " + (await res.text()).slice(0, 200));
  const data = await res.json();
  return (data?.choices?.[0]?.message?.content || "").trim();
}

function normalizeDryHtml(html) {
  let s = String(html || "")
    .replace(/```html?/gi, "")
    .replace(/```/g, "")
    .trim();
  if (!s.includes("parse-dry")) {
    s = '<div class="parse-dry">' + s + "</div>";
  }
  return s;
}

function ruleBasedDry(key) {
  const text = key.oldParse;
  const pick = (label) => {
    const re = new RegExp(label + "[^\\n]*\\n([^【]+)", "u");
    const m = text.match(re);
    return m ? m[1].trim().slice(0, 200) : "";
  };
  const kaodian = pick("考点与命题意图") || pick("考点");
  const yiju = pick("证据") || pick("解题思路");
  const yicuo = pick("选项分析");
  const parts = [`<p><strong>答案</strong> ${key.ans || "—"}</p>`];
  if (kaodian) parts.push(`<p><strong>考点</strong> ${kaodian}</p>`);
  if (yiju) parts.push(`<p><strong>依据</strong> ${yiju}</p>`);
  if (yicuo && /错|干扰|排除/.test(yicuo)) {
    parts.push(`<p><strong>易错</strong> ${yicuo.slice(0, 120)}</p>`);
  }
  return '<div class="parse-dry">' + parts.join("") + "</div>";
}

async function generateBatch(batch) {
  const user =
    "请为以下各题分别生成干货解析，JSON 键必须与 ===id=== 完全一致：\n\n" +
    batch
      .map(
        (k) =>
          `===${k.id}===\n题号：${k.head}\n正确答案：${k.ans}\n书面参考：${k.sample}\n评分要点：${k.rubric}\n旧解析（只提炼事实）：\n${k.oldParse}`
      )
      .join("\n\n");

  const raw = await deepseekChat(SYSTEM_PROMPT, user, 0.22);
  const obj = parseJsonFromText(raw);
  const out = {};
  for (const k of batch) {
    if (obj[k.id]) out[k.id] = normalizeDryHtml(obj[k.id]);
    else out[k.id] = ruleBasedDry(k);
  }
  return out;
}

function writeParseFile(outPath, examId, data) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const entries = Object.keys(data)
    .sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10) || 0;
      const nb = parseInt(b.replace(/\D/g, ""), 10) || 0;
      return na - nb;
    })
    .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(data[k])}`)
    .join(",\n");
  const content =
    `/** 预生成干货解析 · ${examId} · 由 scripts/generate-exam-parse.mjs 生成 */\n` +
    `window.EXAM_PARSE_DRY = {\n${entries}\n};\n`;
  fs.writeFileSync(outPath, content, "utf8");
  console.log("Written", outPath, Object.keys(data).length, "keys");
}

async function generateExam(examId) {
  const cfg = EXAMS[examId];
  if (!fs.existsSync(cfg.html)) {
    console.error("缺少 HTML:", cfg.html);
    return;
  }
  const html = fs.readFileSync(cfg.html, "utf8");
  const keys = extractKeys(html);
  console.log(examId, "keys:", keys.length);

  const data = {};
  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    const batch = keys.slice(i, i + BATCH_SIZE);
    const label = `${examId} ${i + 1}-${i + batch.length}/${keys.length}`;
    process.stdout.write(label + " … ");
    try {
      const part = await generateBatch(batch);
      Object.assign(data, part);
      console.log("ok");
    } catch (e) {
      console.log("fallback (" + e.message + ")");
      for (const k of batch) data[k.id] = ruleBasedDry(k);
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  writeParseFile(cfg.out, examId, data);
}

async function main() {
  const arg = process.argv[2] || "all";
  const list = arg === "all" ? Object.keys(EXAMS) : [arg];
  for (const id of list) {
    if (!EXAMS[id]) {
      console.error("未知:", id, Object.keys(EXAMS));
      process.exit(1);
    }
    await generateExam(id);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
