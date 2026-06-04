/**
 * 生成 L06 情态动词 · 课堂同步全面讲义 HTML
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LESSON = join(ROOT, "L06");
const SRC = join(LESSON, "lesson06-page10-handout.html");
const INSERT = join(LESSON, "assets", "l06-classroom-flow-insert.html");
const OUT = join(LESSON, "lesson06-handout-classroom-full.html");

let html = readFileSync(SRC, "utf8");
const insert = readFileSync(INSERT, "utf8");

html = html.replace(
  /<title>[^<]*<\/title>/,
  "<title>情态动词 · 课堂同步全面讲义</title>"
);

if (!html.includes("l06-handout-classroom")) {
  html = html.replace(
    /<body class="([^"]*)"([^>]*)>/,
    '<body class="$1 l06-handout-classroom"$2>'
  );
}

if (!html.includes("l06-handout-classroom")) {
  throw new Error("未添加 l06-handout-classroom body 类");
}

if (!html.includes("l06-handout-classroom.css")) {
  html = html.replace(
    /(<link rel="stylesheet" href="assets\/l06-handout-publisher\.css" \/>)/,
    '$1\n  <link rel="stylesheet" href="assets/l06-handout-classroom.css" />\n  <link rel="stylesheet" href="assets/l06-handout-classroom-publisher.css" media="print" />'
  );
}

html = html.replace(
  "can / must / have to · 禁止与许可 · 推测 · 分层 A→E",
  "第 1–7 页课堂同步填空 · 课后背诵附录"
);

const marker = /<section class="handout-section" id="sec-map"/;
if (!marker.test(html)) {
  throw new Error("未找到 sec-map 插入点");
}
html = html.replace(marker, `${insert.trim()}\n\n      <section class="handout-section" id="sec-map"`);

const navBlock = `<nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sync-guide">同步说明</a>
    <a href="#sync-p01">第1页</a>
    <a href="#sync-p02">第2页</a>
    <a href="#sync-p03">第3页</a>
    <a href="#sync-p04">第4页</a>
    <a href="#sync-p05">第5页</a>
    <a href="#sync-p06">第6页</a>
    <a href="#sync-p07">第7页</a>
    <a href="#sec-homework">作业</a>
    <a href="#sec-map">附录①</a>
    <a href="#sec-a">附录②</a>
    <a href="#sec-b">附录③</a>
    <a href="#sec-c">附录④</a>
    <a href="#sec-d">附录⑤</a>
    <a href="#sec-e">附录⑥</a>
    <a href="#sec-chant">口诀</a>
  </nav>`;

html = html.replace(
  /<nav class="handout-section-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/,
  navBlock
);

writeFileSync(OUT, html, "utf8");
console.log("OK", OUT);
