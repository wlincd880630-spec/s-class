#!/usr/bin/bin/node
/**
 * 从 2018–2026 成都中考 HTML 提取 Tier2/3 候选：词组、搭配、阅读段落高频词
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const EXAMS = [
  [2018, "HET/2018成都中考.html"],
  [2019, "HET/2019成都中考.html"],
  [2020, "HET/2020成都中考.html"],
  [2021, "HET/2021成都中考.html"],
  [2022, "HET/2022成都中考.html"],
  [2023, "HET/2023成都中考.html"],
  [2024, "HET/2024成都中考.html"],
  [2025, "HET/2025成都中考.html"],
  [2026, "2026EXAM/HET/2026成都中考英语真题.html"],
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<img[^>]+alt="([^"]*)"[^>]*>/gi, " $1 ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&amp;|&lt;|&gt;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractWordBanks(html) {
  const banks = [];
  const re = /word-bank[^>]*>([\s\S]*?)<\/div>/gi;
  let m;
  while ((m = re.exec(html))) {
    banks.push(
      stripHtml(m[1])
        .split(/\s+/)
        .map((w) => w.replace(/[^a-zA-Z'-]/g, ""))
        .filter((w) => w.length > 1)
    );
  }
  // inline bank lines (2022-2024)
  const inline = html.match(/(?:actual|clear|age|die)\s+&[^;]+(?:<br>|;)/gi);
  if (inline) {
    for (const line of inline) {
      const words = stripHtml(line)
        .split(/\s+/)
        .filter((w) => /^[a-zA-Z]{2,}$/.test(w));
      if (words.length >= 8) banks.push(words);
    }
  }
  return banks;
}

function extractPhrases(text) {
  const phrases = new Set();
  // multi-word patterns common in exams
  const patterns = [
    /\b(?:be|get|make|take|keep|lose|give|pay|look|turn|break|carry|hold|pick|run|stay|used|supposed|allowed|regarded|known|interested| worried|afraid|full|proud|aware|responsible|similar|different|familiar|popular|ready|able|likely|bound|used)\s+\w+(?:\s+\w+){0,4}\b/gi,
    /\b(?:one of|even though|as long as|so that|in order to|according to|because of|instead of|such as|rather than|not only|as soon as|by the time|used to|be used to|get used to|make sure|afford to|full of|lose heart|keep calm|carry on|feel at home|hand in|pick up|stay up|run out|take part|provide .{1,20} with|be responsible for|make a difference|look forward to|get along|give up|take care of|pay attention to|in fact|at least|at most|no longer|not .{1,15} anymore)\b[^.!?]{0,40}/gi,
  ];
  for (const p of patterns) {
    for (const m of text.matchAll(p)) {
      const s = m[0].replace(/\s+/g, " ").trim();
      if (s.length >= 6 && s.length < 80) phrases.add(s.toLowerCase());
    }
  }
  return [...phrases];
}

const allPhrases = new Set();
const banksByYear = {};
const readingChunks = [];

for (const [year, rel] of EXAMS) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) continue;
  const html = fs.readFileSync(fp, "utf8");
  const plain = stripHtml(html);
  readingChunks.push({ year, len: plain.length });
  extractPhrases(plain).forEach((p) => allPhrases.add(p));
  const banks = extractWordBanks(html);
  if (banks.length) banksByYear[year] = banks.flat();
  else {
    // manual fallback from known banks
    const manual = {
      2022: "clear complete excite follow health interview luck shine silence ten touch well".split(" "),
      2023: "actual advantage chance child difficult difference few hear many possible silence tell".split(" "),
      2024: "age agree decide follow lead mean perform please solve talent they wide".split(" "),
      2026: "die be sudden discover little they keep sad touch challenge".split(" "),
    };
    if (manual[year]) banksByYear[year] = manual[year];
  }
}

const out = {
  banksByYear,
  phraseCount: allPhrases.size,
  phrases: [...allPhrases].sort().slice(0, 200),
};
fs.writeFileSync(path.join(ROOT, "Grammar/L15/data/exam-phrases-extract.json"), JSON.stringify(out, null, 2));
console.log("years", Object.keys(banksByYear).length, "phrases", allPhrases.size);
