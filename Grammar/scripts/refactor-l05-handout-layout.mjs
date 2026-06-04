/**
 * L05 讲义 → 与其他 handout 一致的 main.sheet 布局
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fp = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "L05",
  "lesson05-page09-handout.html"
);

let html = fs.readFileSync(fp, "utf8");

// 1) 精简 head：去掉 16:9 / 互动大屏 / 巨型内联样式
html = html.replace(
  /<script src="https:\/\/aka\.ms[\s\S]*?<\/style>\s*/,
  `<link rel="stylesheet" href="assets/l05-handout-sheet.css" />
  <link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
`
);

html = html.replace(
  /<script src="assets\/lesson-tts-bootstrap\.js"><\/script>\s*<script>[\s\S]*?<\/script>\s*/,
  ""
);

html = html.replace(
  /<body class="has-lesson-pager grammar-handout-page grammar-handout--interactive">/,
  '<body class="has-lesson-pager grammar-handout-page">'
);

// 2) 去掉重复工具条与全屏互动层
html = html.replace(
  /\s*<div class="handout-toolbar">[\s\S]*?<\/div>\s*<canvas id="confettiCanvas"><\/canvas>\s*<div class="screen-app">[\s\S]*?<\/div>\s*\n/,
  "\n"
);

// 3) print-handout → main.sheet
html = html.replace(
  /<section class="print-handout">\s*<div class="print-cover">\s*/,
  `<main class="sheet" id="handout-pdf-source">
    <div class="inner">
`
);

html = html.replace(
  /<\/div>\s*\n\s*<section class="print-section">/,
  `</div>

      <section class="intro">
        <strong>使用方法：</strong>① 熟读公式与口诀 ② 对照例句理解用法 ③ 完成默写与易错自测。
        建议每天 <strong>15 分钟</strong>：朗读例句 → 中译英或英译中 1～2 句 → 对照易错点自改。
      </section>

      <section class="handout-section">`
);

// 首个 section 已替换，其余 print-section
html = html.replace(/<section class="print-section">/g, '<section class="handout-section">');

// h2 加 section-title（handout-section 内）
html = html.replace(
  /(<section class="handout-section">)\s*<h2>/g,
  '$1\n        <h2 class="section-title">'
);

html = html.replace(/class="print-table"/g, 'class="data"');

// h3 → block-title
html = html.replace(
  /(<section class="handout-section">[\s\S]*?)<h3>/g,
  (m) => m
); // skip global - do per file with simpler replace
html = html.replace(/<h3>/g, '<h3 class="block-title">');

// 4) 结尾与互动脚本
html = html.replace(
  /<\/section>\s*\n\s*<script>\s*\(function \(\) \{[\s\S]*?<\/script>\s*/,
  `    </div>
  </main>

`
);

// 若仍残留 print-handout 闭合
html = html.replace(/<\/section>\s*(\s*<link rel="stylesheet" href="assets\/lesson-image)/, `  </main>\n\n$1`);

fs.writeFileSync(fp, html, "utf8");
console.log("refactored", path.basename(fp));
