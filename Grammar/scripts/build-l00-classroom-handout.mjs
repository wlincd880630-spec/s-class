/**
 * 生成 L00 主系表与非谓语 · 课堂同步全面讲义 HTML
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LESSON = join(ROOT, "L00-主系表与非谓语");
const SRC = join(LESSON, "link-handout-junior.html");
const INSERT = join(LESSON, "assets", "l00-classroom-flow-insert.html");
const OUT = join(LESSON, "link-handout-classroom-full.html");

let html = readFileSync(SRC, "utf8");
const insert = readFileSync(INSERT, "utf8");

html = html.replace(
  /<title>[^<]*<\/title>/,
  "<title>主系表与非谓语 · 课堂同步全面讲义</title>"
);

if (!html.includes("l00-handout-classroom")) {
  html = html.replace(
    /<body class="([^"]*)"([^>]*)>/,
    '<body class="$1 l00-handout-classroom"$2>'
  );
}

html = html.replace(
  /<strong>主系表与非谓语 · 初中<\/strong>/,
  "<strong>主系表与非谓语</strong>"
);

if (!html.includes("l00-handout-classroom")) {
  throw new Error("未添加 l00-handout-classroom body 类（请检查 <body> 标签格式）");
}

if (!html.includes("l00-handout-classroom.css")) {
  html = html.replace(
    /(<link rel="stylesheet" href="assets\/l00-link-junior-handout\.css" \/>)/,
    '$1\n  <link rel="stylesheet" href="assets/l00-handout-classroom.css" />\n  <link rel="stylesheet" href="assets/l00-handout-publisher.css" media="print" />'
  );
}

html = html.replace(
  "初中必会 · 45 条搭配 · be / 感官系动词 · 全例句",
  "第 1–4 页课堂同步填空 · 课后背诵附录（45 条）"
);

const marker =
  /(\s*<\/header>\s*\n+)(\s*<section class="handout-section" id="sec-1">)/;
if (!marker.test(html)) {
  throw new Error("未找到 sec-1 插入点");
}
html = html.replace(marker, `$1\n${insert}\n$2`);

const navBlock = `<nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sync-guide">同步说明</a>
    <a href="#sync-p01">第1页</a>
    <a href="#sync-p02">第2页</a>
    <a href="#sync-p03">第3页</a>
    <a href="#sync-p04">第4页</a>
    <a href="#sec-homework">作业</a>
    <a href="#sec-1">附录①</a>
    <a href="#sec-2">附录②</a>
    <a href="#sec-vocab">词表</a>
    <a href="#sec-chant">口诀</a>
  </nav>`;

if (html.includes('class="handout-section-nav')) {
  html = html.replace(
    /<nav class="handout-section-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/,
    navBlock
  );
} else {
  html = html.replace(
    /(<div class="grammar-handout-pdf-bar no-print">[\s\S]*?<\/div>\s*\n)/,
    `$1\n  ${navBlock}\n`
  );
}

html = html.replace(
  /<a class="grammar-handout-index-link" href="link-handout-senior\.html"[^>]*>→ 高中版讲义<\/a>/,
  '<a class="grammar-handout-index-link" href="link-handout-classroom-full.html" style="margin-left:0.5rem">课堂同步讲义</a>\n    <a class="grammar-handout-index-link" href="link-handout-senior.html" style="margin-left:0.5rem">→ 高中版</a>'
);

writeFileSync(OUT, html, "utf8");
console.log("OK", OUT);
