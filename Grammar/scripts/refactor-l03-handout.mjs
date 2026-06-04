/**
 * L03 讲义 → 统一 grammar-handout 外壳 + 专题 CSS，移除 16:9 / L03 课件内联样式
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L03", "lesson03-page15-handout.html");
const cssOut = path.join(ROOT, "L03", "assets", "l03-handout-sheet.css");
const appOut = path.join(ROOT, "L03", "assets", "l03-handout-app.js");

let html = fs.readFileSync(fp, "utf8");

const sheetMatch = html.match(
  /<style>\s*\n    :root\s*\{[\s\S]*?<\/style>\s*<style>\s*\/\* inlined from assets\/lesson-screen-16x9\.css/
);
if (!sheetMatch) {
  console.error("未找到 L03 讲义专题样式块");
  process.exit(1);
}

let sheetCss = sheetMatch[0]
  .replace(/\s*<style>\s*\/\* inlined from assets\/lesson-screen-16x9\.css[\s\S]*$/, "")
  .replace(/^<style>\s*/, "")
  .replace(/\s*<\/style>\s*$/, "")
  .trim();

sheetCss = `/**\n * L03 一般过去时讲义 · 专题样式（外壳见 ../shared/grammar-handout.css）\n */\n\n${sheetCss}`;
sheetCss = sheetCss.replace(/^    body\s*\{/m, "body.grammar-handout-page.l03-handout {");
sheetCss = sheetCss.replace(/^    \.sheet\s*\{/m, "body.grammar-handout-page main.sheet.l03-handout {");

sheetCss += `

body.grammar-handout-page.l03-handout .doc-subtitle {
  text-align: center;
  color: var(--ink-soft);
  font-weight: 800;
  font-size: 0.92rem;
  margin: 0 0 1rem;
}

body.grammar-handout-page.l03-handout .intro {
  margin-bottom: 0.75rem;
  padding: 0.75rem 0.9rem;
  border-radius: 14px;
  border: 3px solid var(--crayon-orange);
  background: linear-gradient(180deg, rgba(255, 249, 240, 0.95), #fff);
  font-size: 0.88rem;
  line-height: 1.65;
}

body.grammar-handout-page.l03-handout .quote-box {
  margin-top: 0.75rem;
  padding: 0.65rem 0.85rem;
  border: 2px dashed var(--crayon-orange);
  border-radius: 12px;
  background: rgba(255, 249, 240, 0.95);
  font-size: 0.9rem;
  line-height: 1.7;
  font-weight: 700;
}

body.grammar-handout-page.l03-handout .data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
  margin: 0.5rem 0;
}

@media print {
  body.grammar-handout-page.l03-handout .ex-pair,
  body.grammar-handout-page.l03-handout .usage-group-title,
  body.grammar-handout-page.l03-handout table.data-table tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
`;

fs.writeFileSync(cssOut, sheetCss, "utf8");

const headScriptsMatch = html.match(
  /<script>\s*\/\* inlined: L03\/assets\/js\/l03-audio-manifest\.js \*\/[\s\S]*?<\/script>\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css"/
);
if (!headScriptsMatch) {
  console.error("未找到 head 内联脚本块");
  process.exit(1);
}
const headScripts = headScriptsMatch[0].replace(/\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css"\s*$/, "");

const appMatch = html.match(/<script>\s*\n  \(function \(\) \{\s*\n    "use strict";\s*\n\s*var HANDOUT_DATA[\s\S]*?<\/script>\s*<link rel="stylesheet" href="assets\/lesson-image-lightbox\.css"/);
if (!appMatch) {
  console.error("未找到讲义渲染脚本");
  process.exit(1);
}

let appJs = appMatch[0]
  .replace(/^<script>\s*/, "")
  .replace(/\s*<\/script>\s*<link rel="stylesheet" href="assets\/lesson-image-lightbox\.css"\s*$/, "")
  .trim();

appJs = appJs.replace(
  /\s*var btnHandoutPrint = document\.getElementById\("btnHandoutPrint"\);[\s\S]*?window\.addEventListener\("beforeprint", syncNameShow\);\s*/,
  "\n    window.addEventListener(\"beforeprint\", syncNameShow);\n\n"
);

fs.writeFileSync(
  appOut,
  `/**\n * L03 一般过去时讲义 · 动态渲染与 TTS 绑定\n */\n${appJs}\n`,
  "utf8"
);

const newHead = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>一般过去时</title>
  <script src="assets/lesson-tts-azure-config.js"></script>
  <script src="assets/lesson-tts-azure-play.js"></script>
  <link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l03-handout-sheet.css" />
</head>`;

const bodyStart = html.indexOf("<body class=\"has-lesson-pager grammar-handout-page\">");
const bodyEnd = html.lastIndexOf("</html>");
if (bodyStart < 0) {
  console.error("未找到 body");
  process.exit(1);
}

let body = html.slice(bodyStart, bodyEnd + 7);

body = body.replace(
  /<body class="has-lesson-pager grammar-handout-page">/,
  '<body class="has-lesson-pager grammar-handout-page l03-handout">'
);

body = body.replace(
  /<div class="grammar-handout-pdf-bar no-print">[\s\S]*?<\/div>\s*\n\s*<main class="sheet tap-card"/,
  `<div class="grammar-handout-pdf-bar no-print">
    <button type="button" class="btn-handout-pdf" id="btnHandoutPrint">打印 / 另存 PDF</button>
  </div>

  <nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sec-chant">①口诀</a>
    <a href="#sec-usage">②用法</a>
    <a href="#sec-verbs">③动词</a>
    <a href="#sec-write">④金句</a>
  </nav>

  <main class="sheet l03-handout"`
);

body = body.replace(
  /<\/header>\s*\n\s*<div class="intro-strip"/,
  `</header>

      <section class="intro">
        <strong>使用方法：</strong>① 朗读「终极护身口诀」② 按用法分类背诵例句 ③ 对照不规则动词家族表 ④ 默写写作金句并自改。
        建议每天 <strong>15 分钟</strong>：口诀 1 遍 → 朗读 3 句（点 🔊）→ 中译英 1 句。
      </section>

      <div class="intro-strip"`
);

body = body.replace(
  /<div class="chant tap-card" id="chantBox"><\/div>/,
  '<div class="chant tap-card" id="chantBox" id="sec-chant"></div>'
);
// fix duplicate id - use wrapper
body = body.replace(
  /<div class="chant tap-card" id="chantBox" id="sec-chant"><\/div>/,
  '<section id="sec-chant" aria-label="口诀"><div class="chant tap-card" id="chantBox"></div></section>'
);

body = body.replace(
  /<h2 class="section-label">用法分类 · 完整例句速背<\/h2>\s*<div class="usage-host" id="usageHost"><\/div>/,
  '<h2 class="section-label" id="sec-usage">用法分类 · 完整例句速背</h2>\n      <div class="usage-host" id="usageHost"></div>'
);

body = body.replace(
  /<h2 class="section-label">魔法不规则动词速记表<\/h2>\s*<table class="data-table" id="tbl"><\/table>/,
  '<h2 class="section-label" id="sec-verbs">魔法不规则动词速记表</h2>\n      <table class="data data-table" id="tbl"></table>'
);

body = body.replace(
  /<h2 class="section-label">写作金句（英汉对照 · 可点 🔊 朗读）<\/h2>\s*<div id="sents"><\/div>/,
  '<h2 class="section-label" id="sec-write">写作金句（英汉对照 · 可点 🔊 朗读）</h2>\n      <div id="sents"></div>'
);

body = body.replace(
  /<div id="sents"><\/div>\s*\n\s*<\/div>\s*\n\s*<\/main>/,
  `<div id="sents"></div>

      <div class="quote-box" aria-label="背诵口诀">
        过去事情讲从前，标志词汇记心间；<br />
        Be 动词分 was 和 were，实义动词要变脸；<br />
        规则加 ed 有四法，不规则词靠魔法；<br />
        若是 Did 来带队，动词乖乖回原形。
      </div>

      <p class="grammar-handout-footer">一般过去时</p>
    </div>
  </main>`
);

body = body.replace(
  /<nav class="lesson-pager[\s\S]*?<script>[\s\S]*?<\/script>\s*<link rel="stylesheet" href="assets\/lesson-image-lightbox\.css"/,
  `<nav class="lesson-pager is-file-nav" aria-label="页面导航">
    <a class="pager-prev" href="lesson03-page14-summary.html">上一页</a>
    <a class="pager-logo" href="../index.html" aria-label="课程主页"><img src="../logo2.png" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
    <span class="pager-next pager-muted" aria-disabled="true">下一页</span>
  </nav>
  ${headScripts}
  <script src="assets/l03-handout-app.js" defer></script>
  <link rel="stylesheet" href="assets/lesson-image-lightbox.css"`
);

fs.writeFileSync(fp, newHead + "\n" + body, "utf8");
console.log("OK:", path.relative(ROOT, fp));
console.log("OK:", path.relative(ROOT, cssOut));
console.log("OK:", path.relative(ROOT, appOut));
