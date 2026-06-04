#!/usr/bin/env node
/**
 * 从各讲 handout sheet CSS 中移除 @page 块，避免覆盖 grammar-handout-print.css
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const files = [
  "L01/assets/l01-handout-sheet.css",
  "L02/assets/l02-handout-sheet.css",
  "L03/assets/l03-handout-sheet.css",
  "L05/assets/l05-handout-sheet.css",
  "L06/assets/l06-handout-sheet.css",
  "L07/assets/l07-handout-sheet.css",
  "L08/assets/l08-handout-sheet.css",
  "L09/assets/l09-handout-sheet.css",
  "L10/assets/l10-handout-sheet.css",
  "L11/assets/l11-handout-sheet.css",
  "L12/assets/l12-handout-sheet.css",
  "L13/l13-page08-handout.css",
];

const PAGE_BLOCK_RE = /@page\s*\{[^}]*\}\s*/g;

for (const rel of files) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.warn("missing:", rel);
    continue;
  }
  let css = fs.readFileSync(file, "utf8");
  const before = css;
  css = css.replace(PAGE_BLOCK_RE, "");
  if (css === before) {
    console.log("no @page:", rel);
    continue;
  }
  if (!css.includes("grammar-handout-print.css")) {
    css = css.replace(
      /@media print\s*\{/,
      "/* 页边距/正文字号：见shared/grammar-handout-print.css */\n@media print {"
    );
  }
  fs.writeFileSync(file, css, "utf8");
  console.log("stripped @page:", rel);
}

console.log("done");
