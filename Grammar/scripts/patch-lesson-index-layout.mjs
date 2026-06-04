#!/usr/bin/env node
/**
 * 为各讲 index.html 注入统一版式外壳（g-index-bg / brand）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = "";
const SHELL =
  '  <div class="g-index-bg" aria-hidden="true"></div>\n' +
  '  <div class="g-index-grid" aria-hidden="true"></div>\n';

const dirs = fs.readdirSync(ROOT).filter((name) => {
  const p = path.join(ROOT, name);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, "index.html"));
});

let n = 0;
for (const dir of dirs) {
  if (dir === "scripts" || dir === "node_modules") continue;
  const fp = path.join(ROOT, dir, "index.html");
  let html = fs.readFileSync(fp, "utf8");
  if (!html.includes("grammar-index.css") && dir !== "index.html") {
    console.log("SKIP (no grammar-index.css):", dir);
    continue;
  }
  if (dir === path.basename(ROOT)) continue;

  // 根目录 index 跳过
  if (dir === "." || fp === path.join(ROOT, "index.html")) continue;

  const isRootIndex = path.basename(path.dirname(fp)) === path.basename(ROOT) && dir === "index.html";
  if (isRootIndex) continue;

  let changed = false;

  if (!html.includes('class="g-index-bg"')) {
    html = html.replace(/<body>\s*\n\s*<main class="g-index">/, "<body>\n" + SHELL + "  <main class=\"g-index\">");
    changed = true;
  }

  if (!html.includes("g-index-brand")) {
    html = html.replace(
      /<main class="g-index">\s*\n\s*<h1>/,
      '<main class="g-index">\n' + BRAND + "    <h1>"
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, html, "utf8");
    n++;
    console.log("PATCHED", dir);
  }
}

console.log("Done:", n, "files");
