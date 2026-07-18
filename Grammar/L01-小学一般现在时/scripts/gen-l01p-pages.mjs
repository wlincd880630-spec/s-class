#!/usr/bin/env node
/**
 * 生成 L01P 分页 HTML 壳（从 l01p-data.js 自动生成全部页面）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "assets", "l01p-data.js");

const src = fs.readFileSync(DATA, "utf8");
const ids = [...src.matchAll(/id:\s*"(p\d+)"/g)].map((m) => m[1]);

const SHELL = (id, title) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>L01P · ${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" />
  <link rel="stylesheet" href="assets/l01p-shell.css" />
  <link rel="stylesheet" href="assets/l01p-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-handout-lookup.css" />
  <script src="../../js/api-config.js"></script>
  <script src="../shared/lesson-tts-azure-config.js"></script>
  <script src="assets/l01p-img.js"></script>
  <script src="assets/l01p-scenes.js"></script>
  <script src="assets/l01p-tts.js"></script>
  <script src="../shared/grammar-handout-lookup.js"></script>
  <script src="assets/l01p-word.js"></script>
  <script src="assets/l01p-data.js"></script>
  <script src="assets/l01p-engine.js"></script>
  <script src="assets/l01p-boot.js"></script>
</head>
<body class="l01p-body" data-l01p-id="${id}">
  <div id="l01pApp" class="l01p-stage" aria-live="polite"></div>
  <nav id="l01pPager" class="l01p-pager" aria-label="页面导航"></nav>
</body>
</html>
`;

const titles = {};
for (const m of src.matchAll(/id:\s*"(p\d+)"[\s\S]*?title:\s*"([^"]+)"/g)) {
  titles[m[1]] = m[2];
}

for (const id of ids) {
  const file = path.join(ROOT, id + ".html");
  fs.writeFileSync(file, SHELL(id, titles[id] || id), "utf8");
  console.log("wrote", id + ".html");
}

console.log("Done:", ids.length, "pages");
