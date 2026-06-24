#!/usr/bin/env node
/**
 * 从 HET 套题 04–11 与 2026 真题 HTML 提取 B 卷短文 + 空格占位
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const HET_MAP = {
  "2018": "套题04",
  "2019": "套题05",
  "2020": "套题06",
  "2021": "套题07",
  "2022": "套题08",
  "2023": "套题09",
  "2024": "套题10",
  "2025": "套题11",
};

function extractHet(year) {
  const file = path.join(ROOT, "HET/词形填空练习/courseware", `${HET_MAP[year]}选词填空.html`);
  const t = fs.readFileSync(file, "utf8");
  const pm = t.match(/const PASSAGE = `([\s\S]*?)`;/);
  if (!pm) throw new Error("PASSAGE not found: " + file);
  return pm[1].trim();
}

function extract2026() {
  const file = path.join(ROOT, "2026EXAM/HET/2026成都中考英语真题.html");
  const t = fs.readFileSync(file, "utf8");
  const block = t.match(/<div class="passage fill-word-pick">([\s\S]*?)<\/div>/);
  if (!block) throw new Error("2026 passage not found");
  let html = block[1];
  html = html.replace(/<p>/gi, "\n\n");
  html = html.replace(/<\/p>/gi, "");
  html = html.replace(/<span class="blank-wrap"[^>]*>[\s\S]*?<\/span>/gi, (m) => {
    const nm = m.match(/blank-num">(\d+)\./);
    return nm ? `__${nm[1]}__` : "______";
  });
  html = html.replace(/<[^>]+>/g, "");
  html = html.replace(/&nbsp;/g, " ");
  html = html.replace(/\n{3,}/g, "\n\n");
  return html.trim();
}

/** 统一为 __1__ … __10__（2026 题为 61–70，映射为 1–10） */
function normalizePassage(year, raw) {
  if (year === "2026") {
    const order = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
    let p = raw;
    order.forEach((oldN, i) => {
      p = p.replace(new RegExp(`__${oldN}__`, "g"), `__${i + 1}__`);
    });
    return p;
  }
  return raw;
}

const out = {};
for (const y of Object.keys(HET_MAP)) {
  out[y] = normalizePassage(y, extractHet(y));
}
out["2026"] = normalizePassage("2026", extract2026());

export default out;

if (process.argv[1] && process.argv[1].endsWith("extract-wf-passages.mjs")) {
  console.log(JSON.stringify(out, null, 0).slice(0, 500) + "...");
}
