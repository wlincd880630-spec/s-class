import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L10", "L10-handout.html");
let h = fs.readFileSync(fp, "utf8");

const scriptMatch = h.match(/<script>\s*\(function \(\) \{([\s\S]*?)\}\)\(\);\s*<\/script>/);
if (!scriptMatch) throw new Error("inline script not found");

let appBody = scriptMatch[1];
appBody = appBody.replace(/var btnPrint[\s\S]*?window\.print\(\);\s*\}\);\s*\}\s*/m, "");

const appJs =
  "/** L10 现在完成时讲义 · 动词表渲染与朗读绑定 */\n(function () {\n  \"use strict\";\n" +
  appBody.trim() +
  "\n})();\n";

fs.writeFileSync(path.join(ROOT, "L10", "assets", "l10-handout-app.js"), appJs);

const bodyStart = h.indexOf('<body class="has-lesson-pager grammar-handout-page">');
const mainEnd = h.indexOf("  <script>\n(function ()");
if (bodyStart === -1 || mainEnd === -1) throw new Error("body/main markers not found");
h = h.slice(bodyStart + '<body class="has-lesson-pager grammar-handout-page">'.length, mainEnd).trim();

const head = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>现在完成时</title>
  <script src="assets/l10-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>
  <script src="assets/l10-tts-play.js"></script>
  <script src="assets/js/l10-verb-pdf.js" defer></script>
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l10-handout-sheet.css" />
</head>
<body class="has-lesson-pager grammar-handout-page l10-handout">
`;

const tail = `
  <script src="assets/l10-handout-app.js" defer></script>
  <link rel="stylesheet" href="assets/lesson-image-lightbox.css" />
  <script src="assets/lesson-image-lightbox.js" defer></script>
  <nav class="lesson-pager is-file-nav" aria-label="页面导航">
    <a class="pager-prev" href="L10-14-teacher-notes.html">上一页</a>
    <a class="pager-logo" href="../index.html" aria-label="课程主页"><img src="../logo2.png" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
    <span class="pager-next pager-muted" aria-disabled="true">下一页</span>
  </nav>
  <script src="../shared/grammar-handout.js" defer></script>
</body>
</html>
`;

h = head + h.trim() + tail;

if (!h.includes("handout-section-nav")) {
  h = h.replace(
    /(<div class="grammar-handout-pdf-bar no-print">[\s\S]*?<\/div>\s*)\n(\s*<main)/,
    `$1
  <nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sec-1">①构成</a>
    <a href="#sec-2">②用法</a>
    <a href="#sec-3">③标志</a>
    <a href="#sec-4">④持续</a>
    <a href="#sec-5">⑤对比</a>
    <a href="#sec-6">⑥延续</a>
    <a href="#sec-7">⑦口诀</a>
    <a href="#sec-8">⑧词表</a>
    <a href="#sec-9">⑨自测</a>
  </nav>

$2`
  );
}

h = h.replace(
  /<h1 class="doc-title">现在完成时<\/h1>\s*<p class="doc-subtitle">[\s\S]*?<\/div>\s*\n\s*<section class="intro">/,
  `<header class="handout-header">
        <h1 class="doc-title">现在完成时</h1>
        <p class="doc-subtitle">Steven's Class</p>
        <div class="print-header">
          <div class="field"><label>姓名</label><div class="line"></div></div>
          <div class="field"><label>日期</label><div class="line"></div></div>
        </div>
      </header>

      <section class="intro">`
);

h = h.replace(
  /<strong>使用方法：<\/strong>① 背清构成与标志词[\s\S]*?完成文末默写自测。/,
  "<strong>使用方法：</strong>① 背清构成与标志词 ② 先圈时间状语，再定「一般过去时」或「现在完成时」③ 对照⑧动词表朗读对比例句 ④ 完成⑨默写（屏幕可展开答案）。<br />\n        建议每天 <strong>15 分钟</strong>：朗读公式 → 各读 1 组对比例句 → 自测 3 题。"
);

const sectionMap = [
  [/① 构成/, "sec-1"],
  [/② 三大用法/, "sec-2"],
  [/③ 标志词/, "sec-3"],
  [/④ for \/ since/, "sec-4"],
  [/⑤ 现在完成时 vs/, "sec-5"],
  [/⑥ 延续动词/, "sec-6"],
  [/⑦ 易错红线/, "sec-7"],
  [/⑧ 不规则动词/, "sec-8"],
  [/⑨ 默写与自测/, "sec-9"],
];

for (const [titleRe, id] of sectionMap) {
  h = h.replace(
    new RegExp(`<section class="handout-section">\\s*<h2 class="section-title">${titleRe.source}`),
    `<section class="handout-section" id="${id}">\n        <h2 class="section-title">${titleRe.source}`
  );
}

if (!h.includes("grammar-handout-footer")) {
  h = h.replace(
    /(<\/details>\s*<\/section>\s*)\s*<\/div>\s*<\/main>/,
    `$1

      <p class="grammar-handout-footer">现在完成时</p>
    </div>
  </main>`
  );
}

h = h.replace(/class="zh-line" style="margin-top:0\.35rem;padding:0;"/g, 'class="zh-line card-lead"');

fs.writeFileSync(fp, h);
console.log("lines", h.split("\n").length);
console.log("nav", h.includes("handout-section-nav"));
console.log("app.js ok");
