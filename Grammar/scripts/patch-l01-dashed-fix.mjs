#!/usr/bin/env node
/** 为 L01 课件页注入 lesson-dashed-fix.css */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const L01 = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "L01");
const LINK =
  '  <link rel="stylesheet" href="assets/lesson-dashed-fix.css" />\n';
const OLD_BEFORE =
  /    \.(book|sheet|detail-hall-card)::before \{\s*\n      content: "";\s*\n      position: absolute;\s*\n      inset: [\d.]+px;\s*\n      border: 2px dashed[^;]+;\s*\n      border-radius:[^;]+;\s*\n      pointer-events: none;\s*\n    \}/g;

const NEW_BOOK = `    .book::before {
      content: "";
      position: absolute;
      inset: 8px;
      border-radius: 4px 20px 8px 6px;
      pointer-events: none;
    }`;

const NEW_SHEET = `    .sheet::before {
      content: "";
      position: absolute;
      inset: 10px;
      border-radius: 6px 22px 10px 8px;
      pointer-events: none;
    }`;

const NEW_DETAIL = `    .detail-hall-card::before {
      content: "";
      position: absolute;
      inset: 10px;
      border-radius: 6px 20px 10px 14px;
      pointer-events: none;
    }`;

let n = 0;
for (const name of fs.readdirSync(L01)) {
  if (!/^lesson01.*\.html$/i.test(name) && name !== "lesson01-handout-zhongkao.html") continue;
  const fp = path.join(L01, name);
  let html = fs.readFileSync(fp, "utf8");
  let changed = false;

  if (!html.includes("lesson-dashed-fix.css")) {
    if (html.includes("</head>")) {
      html = html.replace("</head>", LINK + "</head>");
      changed = true;
    }
  }

  const next = html
    .replace(
      /    \.book::before \{\s*\n      content: "";\s*\n      position: absolute;\s*\n      inset: 8px;\s*\n      border: 2px dashed[^;]+;\s*\n      border-radius: 4px 20px 8px 6px;\s*\n      pointer-events: none;\s*\n    \}/g,
      NEW_BOOK
    )
    .replace(
      /    \.sheet::before \{\s*\n      content: "";\s*\n      position: absolute;\s*\n      inset: 10px;\s*\n      border: 2px dashed[^;]+;\s*\n      border-radius: 6px 22px 10px 8px;\s*\n      pointer-events: none;\s*\n    \}/g,
      NEW_SHEET
    )
    .replace(
      /    \.detail-hall-card::before \{\s*\n      content: "";\s*\n      position: absolute;\s*\n      inset: 10px;\s*\n      border: 2px dashed[^;]+;\s*\n      border-radius: 6px 20px 10px 14px;\s*\n      pointer-events: none;\s*\n    \}/g,
      NEW_DETAIL
    );

  if (next !== html) {
    html = next;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, html, "utf8");
    n++;
    console.log("PATCHED", name);
  }
}
console.log("Done:", n, "files");
