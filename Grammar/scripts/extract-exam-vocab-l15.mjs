#!/usr/bin/env node
/** 从 2018–2026 成都中考 HTML 提取词汇与词组 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const EXAMS = [
  { year: 2018, file: path.join(ROOT, "HET/2018成都中考.html") },
  { year: 2019, file: path.join(ROOT, "HET/2019成都中考.html") },
  { year: 2020, file: path.join(ROOT, "HET/2020成都中考.html") },
  { year: 2021, file: path.join(ROOT, "HET/2021成都中考.html") },
  { year: 2022, file: path.join(ROOT, "HET/2022成都中考.html") },
  { year: 2023, file: path.join(ROOT, "HET/2023成都中考.html") },
  { year: 2024, file: path.join(ROOT, "HET/2024成都中考.html") },
  { year: 2025, file: path.join(ROOT, "HET/2025成都中考.html") },
  { year: 2026, file: path.join(ROOT, "2026EXAM/HET/2026成都中考英语真题.html") },
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<img[^>]+alt="([^"]*)"[^>]*>/gi, " $1 ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractWordBank(html) {
  const m = html.match(/<div class="word-bank">([\s\S]*?)<\/div>/);
  if (!m) return [];
  return stripHtml(m[1])
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z'-]/g, ""))
    .filter((w) => w.length > 1);
}

const wordFreq = {};
const wordBanksByYear = {};
const allText = [];

for (const ex of EXAMS) {
  if (!fs.existsSync(ex.file)) continue;
  const html = fs.readFileSync(ex.file, "utf8");
  const plain = stripHtml(html);
  allText.push(plain);
  const bank = extractWordBank(html);
  wordBanksByYear[ex.year] = bank;
  bank.forEach((w) => {
    wordFreq[w.toLowerCase()] = (wordFreq[w.toLowerCase()] || 0) + 1;
  });
}

const corpus = stripHtml(allText.join(" "));
const words = corpus.match(/\b[a-zA-Z]{3,}\b/g) || [];
const freq = {};
words.forEach((w) => {
  const lw = w.toLowerCase();
  if (lw.length < 4) return;
  freq[lw] = (freq[lw] || 0) + 1;
});

const topWords = Object.entries(freq)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 400)
  .map(([w, c]) => ({ w, c }));

const out = { wordBanksByYear, wordBankFreq: wordFreq, topWords };
const outPath = path.join(ROOT, "Grammar/L15/data/exam-vocab-extract.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
console.log("OK", outPath, "years", Object.keys(wordBanksByYear).length, "top", topWords.length);
