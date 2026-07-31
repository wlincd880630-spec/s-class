#!/usr/bin/env node
/**
 * 从 Psle/set_*_typeflow.html 提取考点候选（Wave 1 + Wave 2 规则）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const OUT = path.join(ROOT, "Psle/knowledge-registry/extracts");

const TAG_RULES = [
  // Wave 1
  { re: /比较级|comparative|than/i, id: "G-comparative-than", type: "grammar", title: "比较级 + than" },
  { re: /最高级|superlative|one of the most/i, id: "G-superlative-one-of-most", type: "grammar", title: "最高级 · one of the most" },
  { re: /第三人称单数|三单|doesn't|does not|第三人称/i, id: "G-present-simple-3rd", type: "grammar", title: "一般现在时 · 第三人称单数" },
  { re: /there\s+is|there\s+are|There be/i, id: "G-there-be", type: "grammar", title: "There be 句型" },
  { re: /不规则.*复数|irregular.*plural|children|feet|teeth|mice/i, id: "G-noun-plural-irregular", type: "grammar", title: "名词不规则复数" },
  { re: /不规则动词|irregular verb|went|bought|thought/i, id: "G-past-irregular-verbs", type: "grammar", title: "一般过去时 · 不规则动词" },
  { re: /look forward to/i, id: "V-look-forward-to", type: "vocab", title: "look forward to doing" },
  { re: /on sale|go shopping|shopping centre/i, id: "V-on-sale-shopping", type: "vocab", title: "on sale · go shopping" },
  // Wave 2
  { re: /情态动词|modal|can\b|could\b|should\b|must\b|may\b/i, id: "G-modals-can-should", type: "grammar", title: "情态动词 can/should/must" },
  { re: /冠词|不定冠词|定冠词|\ba an\b|a\/an\/the/i, id: "G-articles-a-an-the", type: "grammar", title: "冠词 a/an/the" },
  { re: /可数名词|不可数|uncountable|much\b.*many|many\b.*much|a lot of/i, id: "G-countable-uncountable", type: "grammar", title: "可数与不可数名词" },
  { re: /祈使句|imperative|Don't\b|Do not\b|Please\b/i, id: "G-imperative", type: "grammar", title: "祈使句" },
  { re: /一般将来|will be|will\s+\w+|next Monday|next week/i, id: "G-future-will", type: "grammar", title: "一般将来时 will" },
  { re: /感叹句|What a\b|How\s+\w+!/i, id: "G-exclamatory", type: "grammar", title: "感叹句 What/How" },
  { re: /too\s+\w+\s+to|enough to/i, id: "G-too-enough", type: "grammar", title: "too…to / enough to" },
  { re: /a few\b|a little\b|\bfew\b|\blittle\b/i, id: "G-few-little", type: "grammar", title: "a few / a little / few / little" },
  { re: /too\b.*句末|either\b|also\b|neither\b/i, id: "V-too-either-also", type: "vocab", title: "too / either / also / neither" },
  { re: /forget to|forget doing|remember to|remember doing/i, id: "V-forget-remember-doing", type: "vocab", title: "forget/remember + to do/doing" },
];

function stripHtml(s) {
  return String(s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function classifyItem(item, setNum) {
  const stem = stripHtml(item.stem);
  const exp = (item.teaching?.explanation_md || "") + (item.teaching?.knowledge_expansion_md || "");
  const blob = stem + " " + exp + " " + JSON.stringify(item.options || {});
  const hits = [];
  const seen = new Set();
  for (const rule of TAG_RULES) {
    if (rule.re.test(blob) && !seen.has(rule.id)) {
      seen.add(rule.id);
      hits.push(rule);
    }
  }
  return hits.map((h) => ({
    kp_id: h.id,
    type: h.type,
    title: h.title,
    set: setNum,
    num: item.number,
    stem: stem.slice(0, 200),
    answer: item.teaching?.correct_answer || item.correct_answer || "",
  }));
}

function loadSet(n) {
  const name = n < 10 ? `set_0${n}_typeflow.html` : `set_${n}_typeflow.html`;
  const file = path.join(ROOT, "Psle", name);
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/id="exam-embed">([\s\S]*?)<\/script>/);
  if (!m) return [];
  const data = JSON.parse(m[1]);
  const rows = [];
  for (const sec of data.sections || []) {
    for (const item of sec.items || []) {
      rows.push(...classifyItem(item, n));
    }
  }
  return rows;
}

function main() {
  const sets = process.argv.slice(2).map(Number).filter(Boolean);
  const range = sets.length ? sets : [8, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  const all = [];
  for (const n of range) all.push(...loadSet(n));
  fs.mkdirSync(OUT, { recursive: true });
  const outFile = path.join(
    OUT,
    `set-${String(range[0]).padStart(2, "0")}-${String(range[range.length - 1]).padStart(2, "0")}.json`
  );
  fs.writeFileSync(outFile, JSON.stringify(all, null, 2));
  console.log("Wrote", all.length, "refs to", outFile);
}

main();
