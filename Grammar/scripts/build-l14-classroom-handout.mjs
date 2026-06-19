/**
 * 生成 L14 被动语态 · 课堂同步全面讲义 HTML
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LESSON = join(ROOT, "L14");
const SRC = join(LESSON, "lesson14-page11-handout.html");
const INSERT = join(LESSON, "assets", "l14-classroom-flow-insert.html");
const OUT = join(LESSON, "lesson14-handout-classroom-full.html");

let html = readFileSync(SRC, "utf8");
const insert = readFileSync(INSERT, "utf8");

html = html.replace(
  /<title>[^<]*<\/title>/,
  "<title>被动语态 · 课堂同步全面讲义</title>"
);

if (!html.includes("l14-handout-classroom")) {
  html = html.replace(
    /<body class="([^"]*)"([^>]*)>/,
    '<body class="$1 l14-handout-classroom"$2>'
  );
}

if (!html.includes("l14-handout-classroom")) {
  throw new Error("未添加 l14-handout-classroom body 类");
}

if (!html.includes("l14-handout-classroom.css")) {
  html = html.replace(
    /(<link rel="stylesheet" href="l14-page11-handout\.css" \/>)/,
    '$1\n  <link rel="stylesheet" href="assets/l14-handout-classroom.css" />\n  <link rel="stylesheet" href="assets/l14-handout-classroom-publisher.css" media="print" />\n  <link rel="stylesheet" href="../shared/grammar-handout-appendix-panel.css" />'
  );
}

html = html.replace(
  "be + 过去分词 · 现在/过去/情态/将来/完成 · 打印 A4",
  "第 1–10 页课堂同步填空 · 课后背诵附录"
);

const marker = /<section id="sec-1">/;
if (!marker.test(html)) {
  throw new Error("未找到 sec-1 插入点");
}
html = html.replace(marker, `${insert.trim()}\n\n      <section id="sec-1">`);

const navBlock = `<nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sync-guide">同步说明</a>
    <a href="#sync-p01">第1页</a>
    <a href="#sync-p02">第2页</a>
    <a href="#sync-p03">第3页</a>
    <a href="#sync-p04">第4页</a>
    <a href="#sync-p05">第5页</a>
    <a href="#sync-p06">第6页</a>
    <a href="#sync-p07">第7页</a>
    <a href="#sync-p08">第8页</a>
    <a href="#sync-p09">第9页</a>
    <a href="#sync-p10">第10页</a>
    <a href="#sec-homework">作业</a>
    <a href="#sec-1">附录①</a>
    <a href="#sec-2">附录②</a>
    <a href="#sec-3">附录③</a>
    <a href="#sec-4">附录④</a>
    <a href="#sec-5">附录⑤</a>
    <a href="#sec-6">附录⑥</a>
    <a href="#sec-7">附录⑦</a>
    <a href="#sec-8">附录⑧</a>
    <a href="#sec-9">附录⑨</a>
    <a href="#sec-10">附录⑩</a>
    <a href="#sec-11">附录⑪</a>
    <a href="#sec-12">附录⑫</a>
  </nav>`;

html = html.replace(
  /<nav class="handout-section-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/,
  navBlock
);

html = html.replace(
  '<p class="no-print-hint">',
  '<p class="grammar-handout-print-hint no-print">'
);

writeFileSync(OUT, html, "utf8");
console.log("OK", OUT);
