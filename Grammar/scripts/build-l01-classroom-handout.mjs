/**
 * 生成 L01 课堂同步全面讲义 HTML
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "L01", "lesson01-handout-zhongkao.html");
const INSERT = join(ROOT, "L01", "assets", "l01-classroom-flow-insert.html");
const OUT = join(ROOT, "L01", "lesson01-handout-classroom-full.html");

let html = readFileSync(SRC, "utf8");
const insert = readFileSync(INSERT, "utf8");

html = html.replace(
  /<title>[^<]*<\/title>/,
  "<title>一般现在时 · 课堂同步全面讲义</title>"
);

html = html.replace(
  /<body class="([^"]*)">/,
  '<body class="$1 l01-handout-classroom handout-continuous">'
);

if (!html.includes("l01-handout-classroom.css")) {
  html = html.replace(
    /(<link rel="stylesheet" href="assets\/l01-handout-sheet\.css" \/>)/,
    '$1\n  <link rel="stylesheet" href="assets/l01-handout-classroom.css" />'
  );
}

html = html.replace(
  "动作义与状态义 · Be 动词 · 第三人称单数 · 否定与疑问",
  "P01–P08 课堂同步填空 · 课后背诵与拓展附录"
);

/* 必须插在封面 </header> 之后，不能插在 </header> 之前（否则会陷进 handout-cover 内） */
const marker =
  /(\s*<\/header>\s*\n+)(\s*<section class="handout-section" id="sec-1">)/;
if (!marker.test(html)) {
  throw new Error("未找到 sec-1 插入点");
}
html = html.replace(marker, `$1\n${insert}\n$2`);

html = html.replace(
  /<nav class="handout-section-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/,
  `<nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sync-guide">同步说明</a>
    <a href="#sync-p01">P01</a>
    <a href="#sync-p02">P02</a>
    <a href="#sync-p03">P03</a>
    <a href="#sync-p04">P04</a>
    <a href="#sync-p05">P05</a>
    <a href="#sync-p06">P06</a>
    <a href="#sync-p07">P07</a>
    <a href="#sync-p08">P08</a>
    <a href="#sec-1">附录①</a>
    <a href="#sec-2">附录②</a>
    <a href="#sec-3">附录③</a>
    <a href="#sec-4">附录④</a>
  </nav>`
);

writeFileSync(OUT, html, "utf8");
console.log("OK", OUT);
