/**
 * 从全部选词填空课件提取词形练习题库 → vocab-drill-bank.js
 * 用法: node scripts/build-vocab-drill-bank.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "HET", "词形填空练习", "courseware");
const OUT_JS = path.join(DIR, "vocab-drill-bank.js");
const OUT_JSON = path.join(DIR, "vocab-drill-bank.json");

function extractArray(html, name) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) return null;
  let i = start + marker.length;
  while (/\s/.test(html[i])) i++;
  if (html[i] !== "[") return null;
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
      if (depth === 0) {
        return Function(`"use strict"; return (${html.slice(i, j + 1)});`)();
      }
    }
  }
  return null;
}

function blankSentence(sentence, answer) {
  const s = String(sentence || "").trim();
  const a = String(answer || "").trim();
  if (!s) return "";
  if (/_{3,}|…{2,}|…+|＿+/.test(s) || s.includes("________")) return s.replace(/_{3,}/g, "________");
  if (!a) return s;
  const re = new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  if (re.test(s)) return s.replace(re, "________");
  // multi-word answers like "was divided" / "to prevent"
  const re2 = new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  if (re2.test(s)) return s.replace(re2, "________");
  return `${s} ________`;
}

function sourceLabel(filename) {
  if (filename.startsWith("新课")) return filename.replace(/选词填空\.html$/, "").trim();
  const m = filename.match(/套题(\d+)/);
  return m ? `套题${m[1]}` : filename;
}

function collect() {
  const files = fs
    .readdirSync(DIR)
    .filter((f) => /选词填空\.html$/.test(f) && !f.includes("handout"))
    .sort((a, b) => a.localeCompare(b, "zh"));

  const questions = [];
  const wordIndex = new Map(); // headword -> meta

  for (const file of files) {
    const html = fs.readFileSync(path.join(DIR, file), "utf8");
    const units = extractArray(html, "VOCAB_UNITS");
    if (!Array.isArray(units)) continue;
    const source = sourceLabel(file);
    const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1] || source;

    units.forEach((u, ui) => {
      const headword = String(u.headword || "").trim();
      if (!headword) return;

      if (!wordIndex.has(headword.toLowerCase())) {
        wordIndex.set(headword.toLowerCase(), {
          headword,
          defA2: u.defA2 || "",
          forms: new Set([headword]),
          sources: new Set(),
          count: 0,
        });
      }
      const wi = wordIndex.get(headword.toLowerCase());
      wi.sources.add(source);
      (u.derivatives || []).forEach((d) => {
        if (d.answer) wi.forms.add(String(d.answer).trim());
      });
      if (u.examTarget?.form) wi.forms.add(String(u.examTarget.form).trim());

      const examples = u.examTarget?.examExamples || [];
      examples.forEach((ex, ei) => {
        const answer = String(ex.blankAnswer || u.examTarget?.form || "").trim();
        if (!answer || !ex.readSentence) return;
        const q = {
          id: `${source}-${headword}-exam-${ei}`,
          source,
          sourceTitle: title,
          headword,
          answer,
          prompt: blankSentence(ex.readSentence, answer),
          promptFull: String(ex.readSentence).trim(),
          zh: String(ex.readSentenceZh || "").trim(),
          explain: String(u.examTarget?.note || "").trim(),
          kind: "exam",
          formLabel: answer === headword ? "原形" : `词形 · ${answer}`,
        };
        questions.push(q);
        wi.count++;
      });

      (u.derivatives || []).forEach((d, di) => {
        const answer = String(d.answer || "").trim();
        const sentence = String(d.exampleSentence || "").trim();
        if (!answer || !sentence) return;
        // skip if identical to an exam example promptFull
        const q = {
          id: `${source}-${headword}-der-${di}`,
          source,
          sourceTitle: title,
          headword,
          answer,
          prompt: blankSentence(sentence, answer),
          promptFull: sentence,
          zh: String(d.exampleZh || "").trim(),
          explain: [d.q, d.note].filter(Boolean).join(" · "),
          kind: "derivative",
          formLabel: d.q || `词形 · ${answer}`,
        };
        questions.push(q);
        wi.count++;
      });
    });
  }

  // dedupe by prompt+answer+headword
  const seen = new Set();
  const unique = [];
  for (const q of questions) {
    const key = `${q.headword.toLowerCase()}|${q.answer.toLowerCase()}|${q.prompt.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
  }

  const words = [...wordIndex.values()]
    .map((w) => ({
      headword: w.headword,
      defA2: w.defA2,
      forms: [...w.forms].sort((a, b) => a.localeCompare(b)),
      sources: [...w.sources].sort(),
      count: unique.filter((q) => q.headword.toLowerCase() === w.headword.toLowerCase()).length,
    }))
    .filter((w) => w.count > 0)
    .sort((a, b) => a.headword.localeCompare(b.headword));

  return {
    generatedAt: new Date().toISOString(),
    stats: {
      sources: files.length,
      words: words.length,
      questions: unique.length,
    },
    words,
    questions: unique,
  };
}

const bank = collect();
fs.writeFileSync(OUT_JSON, JSON.stringify(bank, null, 2), "utf8");
const js = `/* auto-generated by scripts/build-vocab-drill-bank.mjs — do not edit by hand */\nwindow.VOCAB_DRILL_BANK = ${JSON.stringify(bank)};\n`;
fs.writeFileSync(OUT_JS, js, "utf8");
console.log("Wrote", OUT_JS);
console.log(bank.stats);
