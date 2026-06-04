#!/usr/bin/env node
/** 移除 L01 课件最外层虚线内框（.book::before / .sheet::before / .detail-hall-card::before） */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const L01 = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "L01");

const RULES = [
  /    \.book::before \{\s*\n      content: "";\s*\n      position: absolute;\s*\n      inset: 8px;\s*\n      border-radius: 4px 20px 8px 6px;\s*\n      pointer-events: none;\s*\n    \}\s*\n/g,
  /    \.sheet::before \{\s*\n      content: "";\s*\n      position: absolute;\s*\n      inset: 10px;\s*\n      border-radius: 6px 22px 10px 8px;\s*\n      pointer-events: none;\s*\n    \}\s*\n/g,
  /    \.detail-hall-card::before \{\s*\n      content: "";\s*\n      position: absolute;\s*\n      inset: 10px;\s*\n      border-radius: 6px 20px 10px 14px;\s*\n      pointer-events: none;\s*\n    \}\s*\n/g,
  /      \.sheet::before \{\s*\n        display: none !important;\s*\n      \}\s*\n/g,
];

let n = 0;
for (const name of fs.readdirSync(L01)) {
  if (!name.endsWith(".html") || name === "index.html") continue;
  const fp = path.join(L01, name);
  let html = fs.readFileSync(fp, "utf8");
  const orig = html;
  for (const re of RULES) html = html.replace(re, "");
  if (html !== orig) {
    fs.writeFileSync(fp, html, "utf8");
    n++;
    console.log("OK", name);
  }
}
console.log("Removed outer frame from", n, "files");
