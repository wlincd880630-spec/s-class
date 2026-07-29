#!/usr/bin/env node
/**
 * 通过 DeepSeek 为 80 个不规则动词生成 8 档难度 × 三态例句
 * 输出：irregular_verbs/pdf-examples-data.js
 *
 * 用法：CONCURRENCY=2 node irregular_verbs/scripts/generate-pdf-examples.mjs
 * 断点续跑：按动词+难度切片自动跳过已完成部分
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "pdf-examples-data.js");
const PROGRESS_FILE = path.join(ROOT, "scripts/.pdf-examples-progress.json");

const DEEPSEEK_KEY = "sk-daa16008e81843deba6fefe9dce51465";
const API_URL = "https://api.deepseek.com/v1/chat/completions";
const MODEL = "deepseek-chat";

const LEVELS = [
  { id: "g5", label: "小学五年级", desc: "短句、生活场景、词数约 6–10，无复杂从句" },
  { id: "g6", label: "小学六年级", desc: "稍长日常句，词数约 8–12，可用简单时间状语" },
  { id: "j1", label: "初一", desc: "校园/家庭场景，词数约 10–14，可用 because/when" },
  { id: "j2", label: "初二", desc: "稍正式语境，词数约 12–16，可用比较级或并列结构" },
  { id: "j3", label: "初三中考", desc: "中考常见表达，词数约 12–18，可用现在完成时标志词" },
  { id: "s1", label: "高一", desc: "抽象或社会话题，词数约 14–20，可用定语从句" },
  { id: "s2", label: "高二", desc: "议论文/说明文句式，词数约 16–22，可用被动或非谓语" },
  { id: "s3", label: "高三高考", desc: "高考难度，词数约 18–24，可用高级词汇与复杂从句" },
];

const SLICES = [
  LEVELS.slice(0, 2),
  LEVELS.slice(2, 4),
  LEVELS.slice(4, 6),
  LEVELS.slice(6, 8),
];

function loadVerbs() {
  const src = fs.readFileSync(path.join(ROOT, "verbs-data.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox);
  return sandbox.window.IRREGULAR_VERBS_DATA.verbs;
}

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
    } catch {
      return {};
    }
  }
  if (fs.existsSync(OUT_FILE)) {
    try {
      const src = fs.readFileSync(OUT_FILE, "utf8");
      const sandbox = { window: {} };
      vm.runInNewContext(src, sandbox);
      return sandbox.window.IV_PDF_EXAMPLES?.byId || {};
    } catch {
      return {};
    }
  }
  return {};
}

function saveProgress(byId) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(byId, null, 2));
  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    source: "deepseek-chat",
    levels: LEVELS.map((l) => ({ id: l.id, label: l.label })),
    byId,
  };
  const js =
    "/**\n * 不规则动词 · 分级例句（DeepSeek 生成）\n * 勿手改；用 scripts/generate-pdf-examples.mjs 重新生成\n */\n" +
    "window.IV_PDF_EXAMPLES = " +
    JSON.stringify(payload, null, 2) +
    ";\n";
  fs.writeFileSync(OUT_FILE, js);
}

function extractJson(text) {
  const raw = String(text || "").trim();
  if (!raw) throw new Error("empty model content");
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fence ? fence[1].trim() : raw;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("No JSON object in response");
  return JSON.parse(body.slice(start, end + 1));
}

function thirdPerson(base) {
  const b = String(base || "").toLowerCase();
  if (!b) return [];
  if (/[sxz]$/.test(b) || /(ch|sh)$/.test(b)) return [b + "es"];
  if (/[^aeiou]y$/.test(b)) return [b.slice(0, -1) + "ies"];
  if (b === "have") return ["has"];
  if (b === "do") return ["does"];
  if (b === "go") return ["goes"];
  return [b + "s"];
}

function presentVariants(verb) {
  const base = String(verb.base || "").toLowerCase();
  const extra = {
    be: ["am", "is", "are", "be", "being"],
    can: ["can"],
    have: ["have", "has"],
    do: ["do", "does"],
    go: ["go", "goes"],
  };
  const gerund =
    base === "be"
      ? []
      : /e$/.test(base) && !/(ee|ye|oe)$/.test(base)
        ? [base.slice(0, -1) + "ing"]
        : /([^aeiou])([aeiou])([^aeiou])$/.test(base)
          ? [base + base.slice(-1) + "ing", base + "ing"]
          : [base + "ing"];
  const list = new Set([
    base,
    ...(extra[verb.id] || []),
    ...thirdPerson(base),
    ...gerund,
  ]);
  return Array.from(list).filter(Boolean);
}

function pastVariants(verb) {
  return String(verb.past || "")
    .split(/\s*\/\s*/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function ppVariants(verb) {
  if (verb.id === "can") return ["been able to", "able to"];
  return String(verb.pp || "")
    .split(/\s*\/\s*/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function formAppears(sentence, variants) {
  const list = Array.isArray(variants) ? variants : [variants];
  const clean = list.map((s) => String(s || "").trim().toLowerCase()).filter(Boolean);
  if (!clean.length) return true;
  const lower = String(sentence || "").toLowerCase();
  return clean.some((v) => {
    if (v.includes(" ")) return lower.includes(v);
    const re = new RegExp("\\b" + v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    return re.test(lower);
  });
}

function levelComplete(block) {
  if (!block || typeof block !== "object") return false;
  return ["base", "past", "pp"].every(
    (key) => block[key] && String(block[key].en || "").trim() && String(block[key].cn || "").trim()
  );
}

function verbComplete(entry) {
  if (!entry || !entry.levels) return false;
  return LEVELS.every((level) => levelComplete(entry.levels[level.id]));
}

function validateLevelSlice(verb, data, levelSlice) {
  const errors = [];
  for (const level of levelSlice) {
    const block = data[level.id];
    if (!levelComplete(block)) {
      errors.push(level.id + " incomplete");
      continue;
    }
    for (const key of ["base", "past", "pp"]) {
      const item = block[key];
      const variants =
        key === "base"
          ? presentVariants(verb)
          : key === "past"
            ? pastVariants(verb)
            : ppVariants(verb);
      if (!formAppears(item.en, variants)) {
        errors.push(
          level.id + "." + key + " missing [" + variants.join("/") + "] in: " + item.en
        );
      }
    }
  }
  return errors;
}

async function callDeepSeekLevels(verb, levelSlice, attempt) {
  const levelGuide = levelSlice
    .map((l) => `- ${l.id}（${l.label}）：${l.desc}`)
    .join("\n");
  const keys = levelSlice.map((l) => l.id);

  const ppNote =
    verb.id === "can"
      ? `过去分词栏请用含 "been able to" 或 "able to" 的能力表达。`
      : `过去分词例句必须为现在完成时或被动，并包含 "${verb.pp}"。`;

  const skeleton = keys
    .map(
      (id) =>
        `  "${id}": {"base":{"en":"...","cn":"..."},"past":{"en":"...","cn":"..."},"pp":{"en":"...","cn":"..."}}`
    )
    .join(",\n");

  const user = `动词：${verb.base}
过去式：${verb.past}
过去分词：${verb.pp}
中文含义：${verb.cn}

仅为以下难度各写 3 条例句（原形/过去式/过去分词）：
${levelGuide}

硬性要求：
1. 原形句必须用限定现在时（可用 am/is/are、goes/does/has）；禁止只用动名词开头凑句。
2. 过去式句必须含正确过去式（${verb.past}）。
3. ${ppNote}
4. 贴近中国学生校园/生活，实用高价值；中文翻译准确简洁。
5. 只输出一个 JSON 对象，key 仅为：${keys.join(", ")}

结构：
{
${skeleton}
}`;

  const resp = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + DEEPSEEK_KEY,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: attempt > 1 ? 0.35 : 0.5,
      max_tokens: 2200,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "你是资深中小学英语教研员。只输出合法 JSON 对象，不要解释。",
        },
        {
          role: "user",
          content:
            attempt > 1
              ? user + "\n\n上次不合格。请补全每个难度的 base/past/pp，并确保目标动词形式出现在英文句中。"
              : user,
        },
      ],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("DeepSeek HTTP " + resp.status + ": " + text.slice(0, 300));
  }
  const json = await resp.json();
  const content = json.choices?.[0]?.message?.content || "";
  const finish = json.choices?.[0]?.finish_reason;
  if (finish === "length") throw new Error("truncated response");
  return extractJson(content);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateSlice(verb, levelSlice) {
  let lastErrors = [];
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const data = await callDeepSeekLevels(verb, levelSlice, attempt);
      const errors = validateLevelSlice(verb, data, levelSlice);
      if (!errors.length) return data;
      lastErrors = errors;
      console.warn(
        `  ⚠ ${verb.base} [${levelSlice.map((l) => l.id).join(",")}] #${attempt}:`,
        errors.slice(0, 3).join("; ")
      );
      await sleep(400);
    } catch (err) {
      lastErrors = [String(err.message || err)];
      console.warn(
        `  ⚠ ${verb.base} [${levelSlice.map((l) => l.id).join(",")}] #${attempt} error:`,
        lastErrors[0]
      );
      await sleep(600 * attempt);
    }
  }
  throw new Error(
    "slice failed " +
      verb.base +
      " (" +
      levelSlice.map((l) => l.id).join(",") +
      "): " +
      lastErrors.slice(0, 3).join("; ")
  );
}

function missingSlices(entry) {
  const levels = (entry && entry.levels) || {};
  return SLICES.filter((slice) => !slice.every((level) => levelComplete(levels[level.id])));
}

async function ensureVerb(verb, byId) {
  if (!byId[verb.id]) {
    byId[verb.id] = {
      base: verb.base,
      past: verb.past,
      pp: verb.pp,
      cn: verb.cn,
      levels: {},
    };
  }
  const entry = byId[verb.id];
  entry.levels = entry.levels || {};
  const todo = missingSlices(entry);
  for (const slice of todo) {
    const part = await generateSlice(verb, slice);
    Object.assign(entry.levels, part);
    await sleep(180);
  }
  if (!verbComplete(entry)) {
    throw new Error("still incomplete after slices");
  }
  return entry;
}

async function main() {
  const verbs = loadVerbs();
  const byId = loadProgress();
  const concurrency = Math.max(1, Number(process.env.CONCURRENCY || 2));
  const force = new Set(
    String(process.env.FORCE_IDS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

  const pending = verbs.filter((verb) => force.has(verb.id) || !verbComplete(byId[verb.id]));
  console.log(
    `Loaded ${verbs.length}; complete ${verbs.length - pending.length}; pending ${pending.length}; concurrency=${concurrency}`
  );

  let cursor = 0;
  let saveChain = Promise.resolve();
  function saveSafe() {
    saveChain = saveChain.then(() => {
      saveProgress(byId);
    });
    return saveChain;
  }

  async function worker(workerId) {
    while (cursor < pending.length) {
      const index = cursor++;
      const verb = pending[index];
      console.log(`[w${workerId}] ${index + 1}/${pending.length} ${verb.base}`);
      try {
        await ensureVerb(verb, byId);
        await saveSafe();
        const done = verbs.filter((v) => verbComplete(byId[v.id])).length;
        console.log(`  ✓ ${verb.base} (${done}/${verbs.length})`);
      } catch (err) {
        await saveSafe();
        console.error(`  ✗ ${verb.base}:`, err.message || err);
      }
      await sleep(150);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, (_, i) => worker(i + 1)));
  await saveChain;

  const missing = verbs.filter((v) => !verbComplete(byId[v.id])).map((v) => v.base);
  if (missing.length) {
    console.error("Still missing:", missing.join(", "));
    process.exitCode = 1;
  } else {
    console.log("All 80 verbs complete.");
  }
  console.log("Output:", OUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
