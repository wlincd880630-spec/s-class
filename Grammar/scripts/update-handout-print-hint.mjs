#!/usr/bin/env node
/** 统一各讲义「打印提示」文案（强调关闭浏览器页眉页脚） */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, "scripts", "handout-catalog.json"), "utf8")
);

const HINT =
  "打印 PDF：目标选「另存为 PDF」→ 纸张 A4 → 勾选「<strong>背景图形</strong>」→ <strong>取消「页眉和页脚」</strong>（勿带出文件路径与日期）。";

const HINT_RE =
  /<p class="(?:grammar-handout-print-hint|no-print-hint)[^"]*">[\s\S]*?<\/p>/;

for (const rel of Object.keys(catalog)) {
  const file = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  const m = html.match(HINT_RE);
  if (!m) {
    console.warn("no hint:", rel);
    continue;
  }
  const next = `<p class="grammar-handout-print-hint no-print">${HINT}</p>`;
  if (m[0] === next) {
    console.log("ok:", rel);
    continue;
  }
  html = html.replace(HINT_RE, next);
  fs.writeFileSync(file, html, "utf8");
  console.log("updated:", rel);
}

console.log("done");
