/**
 * L01 讲义 → 统一 grammar-handout 外壳 + 专题 CSS，移除 16:9 内联与重复底栏样式
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L01", "lesson01-handout-zhongkao.html");
const cssOut = path.join(ROOT, "L01", "assets", "l01-handout-sheet.css");

let html = fs.readFileSync(fp, "utf8");

const style1Match = html.match(/<style>\s*([\s\S]*?)<\/style>\s*<style>\s*\/\* inlined from assets\/lesson-screen-16x9\.css/);
if (!style1Match) {
  console.error("未找到 handout 内联样式块，中止");
  process.exit(1);
}

let sheetCss = style1Match[1].trim();
sheetCss = `/**\n * L01 一般现在时讲义 · 专题样式（外壳见 ../shared/grammar-handout.css）\n */\n\n${sheetCss}`;
sheetCss = sheetCss.replace(
  /^body\s*\{/m,
  "body.grammar-handout-page.l01-handout,\nbody.grammar-handout-page main.sheet.l01-handout {"
);
sheetCss = sheetCss.replace(
  /^    \.sheet\s*\{/m,
  "body.grammar-handout-page main.sheet.l01-handout {"
);
sheetCss += `

/* 与全课程 data 表统一 */
body.grammar-handout-page.l01-handout .data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
  margin: 0.5rem 0;
}
body.grammar-handout-page.l01-handout .data-table th,
body.grammar-handout-page.l01-handout .data-table td {
  border: 2px solid rgba(13, 148, 136, 0.25);
  padding: 0.4rem 0.5rem;
  vertical-align: top;
}
body.grammar-handout-page.l01-handout .data-table th {
  background: rgba(204, 251, 241, 0.55);
  color: var(--gh-accent-ink, #0f766e);
  font-weight: 800;
}

@media print {
  body.grammar-handout-page.l01-handout .data-table th,
  body.grammar-handout-page.l01-handout .data-table td {
    border: 0.45pt solid #333 !important;
  }
}
`;

fs.writeFileSync(cssOut, sheetCss, "utf8");

const manifestScriptMatch = html.match(
  /<script>\s*\/\* inlined: assets\/tts-manifest\.js \*\/([\s\S]*?)<\/script>\s*<link rel="stylesheet" href="assets\/lesson-dashed-fix\.css"/
);
if (!manifestScriptMatch) {
  console.error("未找到 TTS manifest 脚本块");
  process.exit(1);
}
const inlinedScripts = manifestScriptMatch[1].trim();

html = html.replace(
  /<style>[\s\S]*?<\/style>\s*<style>\s*\/\* inlined from assets\/lesson-screen-16x9\.css[\s\S]*?<\/style>\s*<script>[\s\S]*?<\/script>\s*<link rel="stylesheet" href="assets\/lesson-dashed-fix\.css"[\s\S]*?<link rel="stylesheet" href="\.\.\/grammar-lesson-pager\.css" \/>/,
  `<link rel="stylesheet" href="assets/lesson-dashed-fix.css" />
  <link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l01-handout-sheet.css" />`
);

html = html.replace(
  /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/,
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />'
);

html = html.replace(
  /<body class="has-lesson-pager grammar-handout-page">/,
  '<body class="has-lesson-pager grammar-handout-page l01-handout">'
);

html = html.replace(
  /<div class="grammar-handout-pdf-bar no-print">\s*<button[^>]*id="btnHandoutPrint"[^>]*>[\s\S]*?<\/button>\s*<\/div>\s*\n\s*<main class="sheet"/,
  `<div class="grammar-handout-pdf-bar no-print">
    <button type="button" class="btn-handout-pdf" id="btnHandoutPrint">打印 / 另存 PDF</button>
  </div>

  <nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sec-1">①全景</a>
    <a href="#sec-2">②Be</a>
    <a href="#sec-3">③实义</a>
    <a href="#sec-4">④拓展</a>
  </nav>

  <main class="sheet l01-handout"`
);

html = html.replace(
  /<section class="handout-section">\s*<section class="intro">/,
  '<section class="handout-section" id="sec-1">\n      <section class="intro">'
);

html = html.replace(
  /<\/section>\s*\n\s*<section class="handout-section">\s*<h2 class="section-title">🔵/,
  '</section>\n\n      <section class="handout-section" id="sec-2">\n      <h2 class="section-title">🔵'
);

html = html.replace(
  /<\/section>\s*\n\s*<section class="handout-section">\s*<h2 class="section-title">🟢/,
  '</section>\n\n      <section class="handout-section" id="sec-3">\n      <h2 class="section-title">🟢'
);

html = html.replace(
  /<\/section>\s*\n\s*<section class="handout-section">\s*<h2 class="section-title">🚀/,
  '</section>\n\n      <section class="handout-section" id="sec-4">\n      <h2 class="section-title">🚀'
);

html = html.replace(/class="data-table"/g, 'class="data data-table"');

html = html.replace(
  /\s*<script>\s*\(function \(\) \{\s*"use strict";\s*\/\*\* true：浏览器直连[\s\S]*?<\/script>\s*<link rel="stylesheet" href="assets\/lesson-image-lightbox\.css"/,
  `\n  <script>\n${inlinedScripts}\n  </script>\n  <script src="assets/l01-handout-tts.js" defer></script>\n  <link rel="stylesheet" href="assets/lesson-image-lightbox.css"`
);

fs.writeFileSync(fp, html, "utf8");
console.log("OK:", path.relative(ROOT, fp));
console.log("OK:", path.relative(ROOT, cssOut));
