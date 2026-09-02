import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const LEVELS = ["j1", "j2", "j3", "s1", "s2", "s3"];
export const LEVEL_LABEL = {
  j1: "初一",
  j2: "初二",
  j3: "初三",
  s1: "高一",
  s2: "高二",
  s3: "高三"
};
export const UNITS = [
  { id: 1, lessons: ["01", "02"] },
  { id: 2, lessons: ["03", "04"] },
  { id: 3, lessons: ["05", "06"] },
  { id: 4, lessons: ["07", "08"] },
  { id: 5, lessons: ["09", "10"] },
  { id: 6, lessons: ["11", "12"] },
  { id: 7, lessons: ["13", "14"] },
  { id: 8, lessons: ["15", "16"] },
  { id: 9, lessons: ["17", "18"] },
  { id: 10, lessons: ["19", "20"] },
  { id: 11, lessons: ["21", "22"] },
  { id: 12, lessons: ["23", "24"] },
  { id: 13, lessons: ["25", "26"] },
  { id: 14, lessons: ["27", "28"] },
  { id: 15, lessons: ["29", "30"] },
  { id: 16, lessons: ["31", "32"] },
  { id: 17, lessons: ["33", "34"] },
  { id: 18, lessons: ["35", "36"] }
];

export function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export function stripHtml(html) {
  return String(html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function itemKey(it) {
  return String(it.word || it.phrase || "").trim();
}

export function meaningOf(it) {
  return String(it.correct_answer || it.definition_cn || it.meaning || "").trim();
}

export function loadUnitSource(unit) {
  const vocab = [];
  const colloc = [];
  const grammar = [];
  unit.lessons.forEach((lesson) => {
    const data = readJson(path.join(ROOT, "PET", lesson, "course_data.json"));
    (data.vocabulary || []).forEach((it) => {
      const k = itemKey(it);
      if (!k) return;
      vocab.push({
        key: k,
        word: k,
        kind: "vocab",
        phonetic: it.phonetic || "",
        meaning: meaningOf(it),
        definitionEn: it.definition_en || "",
        usage: it.usage || "",
        exam: (it.examples || [])
          .filter((ex) => ex && ex.sentence && !/article/i.test(ex.source || ""))
          .map((ex) => ({ sentence: ex.sentence, trans: ex.trans || "", source: ex.source || "" }))
      });
    });
    (data.collocations || []).forEach((it) => {
      const k = itemKey(it);
      if (!k) return;
      colloc.push({
        key: k,
        word: k,
        kind: "phrase",
        phonetic: it.phonetic || "",
        meaning: meaningOf(it),
        definitionEn: it.definition_en || "",
        usage: it.usage || "",
        exam: (it.examples || [])
          .filter((ex) => ex && ex.sentence && !/article/i.test(ex.source || ""))
          .map((ex) => ({ sentence: ex.sentence, trans: ex.trans || "", source: ex.source || "" }))
      });
    });
    (data.grammar || []).forEach((g) => {
      grammar.push({
        key: g.title || "",
        titleEn: g.title || "",
        sourceSentence: g.source_sentence || "",
        sourceSentenceCn: g.source_sentence_cn || "",
        explanation: stripHtml(g.explanation || ""),
        zhongkaoTips: stripHtml(g.zhongkao_tips || ""),
        examples: (g.examples || []).map((ex) => ({
          en: ex.en || ex.sentence || "",
          cn: ex.cn || ex.trans || ""
        }))
      });
    });
  });
  return { unit: unit.id, vocab, colloc, grammar };
}

export function extractJson(text) {
  let s = String(text || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  const startObj = s.indexOf("{");
  const startArr = s.indexOf("[");
  let start = -1;
  let open = "{";
  let close = "}";
  if (startObj >= 0 && (startArr < 0 || startObj < startArr)) {
    start = startObj;
  } else if (startArr >= 0) {
    start = startArr;
    open = "[";
    close = "]";
  }
  if (start < 0) throw new Error("no JSON");
  s = s.slice(start);
  let depth = 0;
  let inStr = false;
  let esc = false;
  let end = -1;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') {
      inStr = true;
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const slice = end > 0 ? s.slice(0, end) : s;
  const attempts = [
    slice,
    slice.replace(/,\s*([}\]])/g, "$1"),
    slice.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ""),
    slice.replace(/\\(?!["\\/bfnrtu])/g, "\\\\")
  ];
  let last;
  for (const a of attempts) {
    try {
      return JSON.parse(a);
    } catch (e) {
      last = e;
    }
  }
  throw new Error("JSON parse failed: " + last.message);
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
