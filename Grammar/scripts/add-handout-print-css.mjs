#!/usr/bin/env node
/**
 * 为全课程 handout HTML 引入出版物级打印样式（紧挨 </head> 前，最后加载）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "scripts", "handout-catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const PRINT_LINK =
  '  <link rel="stylesheet" href="../shared/grammar-handout-print.css" media="print" />\n';
const PRINT_RE = /\s*<link[^>]+grammar-handout-print\.css"[^>]*\/>\s*\n/g;

for (const rel of Object.keys(catalog)) {
  const file = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) {
    console.warn("skip missing:", rel);
    continue;
  }
  let html = fs.readFileSync(file, "utf8");
  const had = html.includes("grammar-handout-print.css");
  html = html.replace(PRINT_RE, "\n");
  html = html.replace(/<\/head>/i, `${PRINT_LINK}</head>`);
  fs.writeFileSync(file, html, "utf8");
  console.log(had ? "reordered:" : "patched:", rel);
}

console.log("done");
