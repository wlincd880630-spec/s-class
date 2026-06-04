import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fp = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "L09",
  "lesson09-handout.html"
);

let html = fs.readFileSync(fp, "utf8");

html = html.replace(
  /<style>[\s\S]*?<\/style>\s*/,
  `<link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l09-handout-sheet.css" />
`
);

html = html.replace(
  /<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-logo\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-handout\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-lesson-pager\.css" \/>\s*<link rel="stylesheet" href="assets\/l09-handout-sheet\.css" \/>\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-logo\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-handout\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-lesson-pager\.css" \/>\s*/,
  `<link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l09-handout-sheet.css" />
`
);

html = html.replace(
  /<main class="sheet tap-card" id="handout-pdf-source">/,
  '<main class="sheet l09-handout" id="handout-pdf-source">'
);

html = html.replace(
  /<header>\s*<h1 class="doc-title">过去进行时<\/h1>\s*<p class="doc-subtitle">Steven's Class<\/p>\s*<div class="print-header">[\s\S]*?<\/header>\s*\n\s*<div class="intro-strip">/,
  `<header class="handout-header">
        <h1 class="doc-title">过去进行时</h1>
      <p class="doc-subtitle">Steven's Class</p>
      <div class="print-header">
        <div class="field"><label>姓名</label><div class="line" id="fld-name" contenteditable="true" role="textbox" aria-label="填写姓名"></div></div>
        <div class="field"><label>日期</label><div class="line"></div></div>
      </div>
      </header>

      <section class="intro">
        <strong>使用方法：</strong>① 熟读口诀与 when/while 对照 ② 朗读例句并对照句法标注 ③ 完成句型框默写。
        建议每天 <strong>15 分钟</strong>：朗读例句 → 中译英或英译中 1～2 句 → 对照易错点自改。
      </section>

      <div class="intro-strip">`
);

html = html.replace(/class="section-label"/g, 'class="section-title"');
html = html.replace(/class="data-table"/g, 'class="data"');
html = html.replace(/<table class="data" id="tbl">/, '<table class="data" id="tbl">');

fs.writeFileSync(fp, html, "utf8");
console.log("fixed L09 handout layout");
