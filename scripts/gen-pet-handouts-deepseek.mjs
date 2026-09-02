/**
 * 用 DeepSeek v4-pro 重新生成 PET 讲义：高质量分层例句 + 每档 15 道语法题。
 * 运行：node scripts/gen-pet-handouts-deepseek.mjs
 * 断点续跑：同一命令即可。
 */
import fs from "fs";
import path from "path";
import {
  ROOT,
  LEVELS,
  LEVEL_LABEL,
  UNITS,
  loadUnitSource,
  extractJson,
  sleep
} from "./pet-handout-lib.mjs";

const KEY = process.env.DEEPSEEK_KEY || "sk-daa16008e81843deba6fefe9dce51465";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-v4-pro";
const OUT = path.join(ROOT, "PET/studio/data/handouts-deepseek");
const CONCURRENCY = Number(process.env.DS_CONCURRENCY || 3);
const ONLY_UNIT = process.env.ONLY_UNIT ? Number(process.env.ONLY_UNIT) : 0;

function cachePath(name) {
  return path.join(OUT, "_cache", name);
}

async function chat(prompt, maxTokens, thinking) {
  const body = {
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.35,
    max_tokens: maxTokens || 8192
  };
  if (thinking === false) body.thinking = { type: "disabled" };
  else if (thinking === "low") body.reasoning_effort = "low";
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + KEY
        },
        body: JSON.stringify(body)
      });
      const raw = await res.text();
      if (!res.ok) throw new Error("HTTP " + res.status + " " + raw.slice(0, 240));
      const data = JSON.parse(raw);
      const msg = (data.choices && data.choices[0] && data.choices[0].message) || {};
      const text = msg.content || "";
      if (!text.trim()) throw new Error("empty content; reasoning=" + String(msg.reasoning_content || "").slice(0, 80));
      return text;
    } catch (err) {
      lastErr = err;
      await sleep(800 * attempt * attempt);
    }
  }
  throw lastErr;
}

async function cached(name, prompt, maxTokens, thinking) {
  const p = cachePath(name + ".json");
  if (fs.existsSync(p)) {
    try {
      return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch {
      /* regenerate */
    }
  }
  const text = await chat(prompt, maxTokens, thinking);
  try {
    const json = extractJson(text);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(json));
    return json;
  } catch (err) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p.replace(/\.json$/, ".raw.txt"), text);
    throw err;
  }
}

function poolLimit(n) {
  let active = 0;
  const q = [];
  const run = () => {
    if (active >= n || !q.length) return;
    const { fn, resolve, reject } = q.shift();
    active++;
    Promise.resolve()
      .then(fn)
      .then(resolve, reject)
      .finally(() => {
        active--;
        run();
      });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      q.push({ fn, resolve, reject });
      run();
    });
}

const VOCAB_RULES = `
硬性要求：
1. 每个词必须恰好 6 条例句，level 依次为 j1 j2 j3 s1 s2 s3。
2. 英文必须自然、可记忆、有搭配价值；必须包含目标词/词组的正确形式。
3. 禁止套模板：不要写 We talked about X in class / This place looks X / Please X a better option / Students who X usually make faster progress 这类空壳句。
4. 初一：短句、生活场景、初中核心词汇。初二：稍长，出现常见搭配。初三：中考风格，可含状语从句，但不要在题干写“中考”。高一：从句/非谓语/较正式搭配。高二：地道书面语、对比或强调。高三：高考书面语，信息密度高，但句子仍通顺。
5. 中文翻译准确，不要把词义硬塞进不通的位置。
6. usageZh 用中文写常见用法（词性、搭配、语体），2–4 句。
7. family 给 2–5 个词性家族，每项含 word, pos, posZh, meaning（中文词义）。
8. 只输出 JSON，不要解释。`;

function vocabPrompt(items) {
  const payload = items.map((it) => ({
    word: it.word,
    kind: it.kind,
    meaning: it.meaning,
    definitionEn: it.definitionEn,
    usage: it.usage,
    exam: it.exam.slice(0, 2)
  }));
  return (
    "你是资深初高中英语教材编者，正在为 PET 讲义写“有使用价值”的例句。\n" +
    VOCAB_RULES +
    "\n词表：\n" +
    JSON.stringify(payload, null, 2) +
    `\n输出 JSON 数组，每项：
{"word":"...","usageZh":"...","family":[{"word":"...","pos":"...","posZh":"...","meaning":"..."}],"examples":[{"level":"j1","sentence":"...","trans":"..."}, ... 共6条]}`
  );
}

function grammarUsagePrompt(g) {
  return `你是高中英语语法主编。请把下列语法点扩写成可印刷讲义，而不是复述课文原句。

要求：
- title：中文标题，准确覆盖本语法点，可点明拓展范围（例如 can 要连带 could / be able to / may / might）。
- titleEn：英文标题。
- usage：中文详细用法，分自然段。必须包含：核心结构、肯定/否定/疑问、与近义结构对比、初中用法 vs 高中用法、2–4 条易错点。不要只写课文那一句。
- forms：3–6 条结构公式（中英均可）。
- notes：3–5 条易错提醒（中文）。不要每条都写“中考”；高中提醒写“高考/书面语/语域”。
- examples：恰好 6 条，level=j1..s3，字段 en, cn。例句必须体现该级别真实语言，并覆盖拓展的相关结构。

语法点资料：
${JSON.stringify(g, null, 2)}

只输出一个 JSON 对象：{"title","titleEn","usage","forms","notes","examples"}`;
}

function grammarExPrompt(g, band) {
  const levels = band === "junior" ? ["j1", "j2", "j3"] : ["s1", "s2", "s3"];
  const labels = levels.map((lv) => LEVEL_LABEL[lv]).join("/");
  const forbid =
    band === "junior"
      ? "初一/初二题干禁止出现“中考”“高考”。初三可以是中考难度，但不要每题都写“中考提醒”，题干应直接练语言点。"
      : "高一/高二/高三题干禁止出现“中考”“中考提醒”。高三可以是高考难度，但题干应直接练语言点，不要出“下列哪一项最能说明已经学会”这种空泛元认知题。";
  return `你是命题专家，请为语法点编写精选练习。每个级别恰好 15 题，三个级别共 45 题。

级别：${labels}（${levels.join(", ")}）
${forbid}

题型必须多样。每个级别 15 题建议构成：
- 5 道 choice（四选一，干扰项要像真实错误）
- 3 道 fill（挖空，答案唯一或可判定）
- 2 道 truefalse（options 为 ["正确","错误"] 或 ["True","False"]）
- 3 道 rewrite（改写：肯定↔否定、陈述↔疑问、同义转换、can↔be able to 等）
- 2 道 error（改错，题干给错句）

内容要求：
1. 围绕本语法点，并合理拓展相关结构（如 can 要练 could / be able to / may / might / must 的区别，但主线仍是本课语法）。
2. 题目必须有语言训练价值，不要出“先看公式再做题”这类学习方法题。
3. 题干语言与难度必须匹配该年级：初一短、高三可含从句和非谓语。
4. 每题含 type, level, q, options, answer, explain。explain 用中文 1 句点明考点。
5. choice 的 answer 必须是 options 里的某一完整选项文本。
6. 不要重复题干。

语法点：
标题：${g.titleEn}
课文句：${g.sourceSentence} / ${g.sourceSentenceCn}
讲解：${g.explanation}
中考提示（仅供命题参考，不要原样抄进高中题干）：${g.zhongkaoTips}

只输出 JSON：{"exercises":[ ...45 题... ]}`;
}

function normalizeExamples(list) {
  const by = {};
  (list || []).forEach((ex) => {
    const lv = String(ex.level || "");
    if (!LEVELS.includes(lv)) return;
    const sentence = String(ex.sentence || ex.en || "").trim();
    if (!sentence) return;
    by[lv] = {
      level: lv,
      sentence,
      trans: String(ex.trans || ex.cn || "").trim()
    };
  });
  return LEVELS.map((lv) => by[lv]).filter(Boolean);
}

function normalizeFamily(list) {
  return (list || [])
    .map((x) => ({
      word: String(x.word || "").trim(),
      pos: String(x.pos || "").trim(),
      posZh: String(x.posZh || "").trim(),
      meaning: String(x.meaning || "").trim()
    }))
    .filter((x) => x.word)
    .slice(0, 6);
}

function normalizeExercises(list, allowed) {
  const out = [];
  const seen = new Set();
  (list || []).forEach((ex) => {
    const level = String(ex.level || "");
    if (allowed && allowed.indexOf(level) < 0) return;
    const q = String(ex.q || ex.question || "").trim();
    if (!q || seen.has(level + "|" + q)) return;
    seen.add(level + "|" + q);
    let type = String(ex.type || "choice");
    if (!/^(choice|fill|truefalse|rewrite|error)$/.test(type)) {
      type = Array.isArray(ex.options) && ex.options.length ? "choice" : "fill";
    }
    const row = {
      type,
      level,
      q,
      options: Array.isArray(ex.options) ? ex.options.map((o) => String(o)) : [],
      answer: String(ex.answer || ex.correct || "").trim(),
      explain: String(ex.explain || ex.explanation || "").trim()
    };
    if (type === "truefalse" && !row.options.length) row.options = ["正确", "错误"];
    if (!row.answer) return;
    out.push(row);
  });
  return out;
}

async function genVocabMap(items, unitId, kind) {
  const map = {};
  const chunks = [];
  for (let i = 0; i < items.length; i += 3) chunks.push(items.slice(i, i + 3));
  const limit = poolLimit(CONCURRENCY);
  await Promise.all(
    chunks.map((chunk, idx) =>
      limit(async () => {
        const name = `u${String(unitId).padStart(2, "0")}-${kind}-${idx}`;
        try {
          const arr = await cached(name, vocabPrompt(chunk), 6144, false);
          const list = Array.isArray(arr) ? arr : arr.items || arr.words || [];
          list.forEach((row) => {
            const key = String(row.word || "").trim();
            if (!key) return;
            map[key] = {
              usageZh: String(row.usageZh || "").trim(),
              family: normalizeFamily(row.family),
              examples: normalizeExamples(row.examples)
            };
          });
          process.stdout.write(`[u${unitId} ${kind} ${idx + 1}/${chunks.length}] `);
        } catch (err) {
          console.error(`\nWARN ${name}: ${err.message}; retry once`);
          try {
            const arr = await cached(name + "-r", vocabPrompt(chunk) + "\n再次输出：必须是合法 JSON，字符串内引号要转义。", 6144, false);
            const list = Array.isArray(arr) ? arr : [];
            list.forEach((row) => {
              const key = String(row.word || "").trim();
              if (!key) return;
              map[key] = {
                usageZh: String(row.usageZh || "").trim(),
                family: normalizeFamily(row.family),
                examples: normalizeExamples(row.examples)
              };
            });
            process.stdout.write(`[u${unitId} ${kind} ${idx + 1}/${chunks.length} retry] `);
          } catch (err2) {
            console.error(`\nSKIP ${name}: ${err2.message}`);
          }
        }
      })
    )
  );
  items.forEach((it) => {
    if (!map[it.word]) {
      map[it.word] = {
        usageZh: it.usage || "",
        family: [{ word: it.word, pos: "", posZh: "", meaning: it.meaning }],
        examples: (it.exam || []).slice(0, 6).map((ex, i) => ({
          level: LEVELS[i],
          sentence: ex.sentence,
          trans: ex.trans
        }))
      };
    }
  });
  return map;
}

function log() {
  const line = Array.prototype.join.call(arguments, " ");
  console.log(line);
  try {
    fs.appendFileSync(path.join(OUT, "_progress.log"), new Date().toISOString() + " " + line + "\n");
  } catch {
    /* ignore */
  }
}

async function genGrammarPoint(g, unitId, gi) {
  const base = `u${String(unitId).padStart(2, "0")}-g${gi}`;
  const usage = await cached(base + "-usage", grammarUsagePrompt(g), 8192, false);
  const junior = await cached(base + "-jr", grammarExPrompt(g, "junior"), 16384, false);
  const senior = await cached(base + "-sr", grammarExPrompt(g, "senior"), 16384, false);
  const exercises = normalizeExercises(
    [].concat(junior.exercises || junior, senior.exercises || senior),
    LEVELS
  );
  const examples = (usage.examples || []).map((ex) => ({
    level: ex.level,
    en: ex.en || ex.sentence || "",
    cn: ex.cn || ex.trans || ""
  }));
  return {
    key: g.key || usage.titleEn || usage.title,
    title: usage.title || g.titleEn,
    titleEn: usage.titleEn || g.titleEn,
    usage: String(usage.usage || g.explanation || "").trim(),
    forms: Array.isArray(usage.forms) ? usage.forms.map(String) : [],
    notes: Array.isArray(usage.notes) ? usage.notes.map(String) : [],
    examples,
    exercises
  };
}

async function buildUnit(unit) {
  const src = loadUnitSource(unit);
  const file = `u${String(unit.id).padStart(2, "0")}.json`;
  const outFile = path.join(OUT, file);
  if (fs.existsSync(outFile)) {
    log("skip existing", file);
    return JSON.parse(fs.readFileSync(outFile, "utf8"));
  }
  log("\n== Unit", unit.id, "vocab", src.vocab.length, "colloc", src.colloc.length, "grammar", src.grammar.length);
  const vocab = await genVocabMap(src.vocab, unit.id, "v");
  const colloc = await genVocabMap(src.colloc, unit.id, "c");
  const grammar = [];
  const limit = poolLimit(2);
  let grammarFail = 0;
  await Promise.all(
    src.grammar.map((g, gi) =>
      limit(async () => {
        try {
          const packed = await genGrammarPoint(g, unit.id, gi);
          grammar[gi] = packed;
          const by = {};
          packed.exercises.forEach((e) => {
            by[e.level] = (by[e.level] || 0) + 1;
          });
          log(`  grammar ${gi + 1}/${src.grammar.length} ${packed.title} ${JSON.stringify(by)}`);
        } catch (err) {
          grammarFail++;
          log(`  grammar FAIL ${gi + 1}/${src.grammar.length} ${g.titleEn}: ${err.message}`);
        }
      })
    )
  );
  if (grammarFail || grammar.filter(Boolean).length !== src.grammar.length) {
    throw new Error("Unit " + unit.id + " grammar incomplete, not writing " + file);
  }
  const pack = { unit: unit.id, model: MODEL, levels: LEVELS, vocab, colloc, grammar };
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(pack));
  log("wrote", outFile);
  return pack;
}

async function main() {
  fs.mkdirSync(path.join(OUT, "_cache"), { recursive: true });
  const list = ONLY_UNIT ? UNITS.filter((u) => u.id === ONLY_UNIT) : UNITS;
  for (const u of list) {
    try {
      await buildUnit(u);
    } catch (err) {
      log("UNIT FAIL", u.id, err.message || String(err));
    }
  }
  log("done", OUT, "model", MODEL);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
