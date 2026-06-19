/**
 * 生成 L15 词性转换与词汇 · 课堂同步全面讲义 HTML
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LESSON = join(ROOT, "L15");
const SRC = join(LESSON, "lesson15-page09-handout.html");
const INSERT = join(LESSON, "assets", "l15-classroom-flow-insert.html");
const OUT = join(LESSON, "lesson15-handout-classroom-full.html");

let html = readFileSync(SRC, "utf8");
const insert = readFileSync(INSERT, "utf8");

html = html.replace(/<title>[^<]*<\/title>/, "<title>词性转换与词汇 · 课堂同步全面讲义</title>");

if (!html.includes("l15-handout-classroom")) {
  html = html.replace(/<body class="grammar-handout-page">/, '<body class="l15-handout-classroom grammar-handout-page">');
}

if (!html.includes("l15-handout-classroom.css")) {
  html = html.replace(
    "</head>",
    '  <link rel="stylesheet" href="assets/l15-handout-classroom.css" />\n  <link rel="stylesheet" href="assets/l15-handout-classroom-publisher.css" media="print" />\n  <link rel="stylesheet" href="../shared/grammar-handout-appendix-panel.css" />\n</head>'
  );
}

html = html.replace(
  "2018–2026 成都中考 · B卷词库 · 词组习语 · 图表词汇",
  "第 1–10 页课堂同步填空 · 课后背诵附录"
);

const marker = /<section id="sec-1">/;
if (!marker.test(html)) throw new Error("未找到 sec-1");
html = html.replace(marker, `${insert.trim()}\n\n      <section id="sec-1">`);

const navBlock = `<nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sync-guide">同步说明</a>
    <a href="#sync-p01">第1页</a><a href="#sync-p02">第2页</a><a href="#sync-p03">第3页</a>
    <a href="#sync-p04">第4页</a><a href="#sync-p05">第5页</a><a href="#sync-p06">第6页</a>
    <a href="#sync-p07">第7页</a><a href="#sync-p08">第8页</a><a href="#sync-p09">第9页</a>
    <a href="#sync-p10">第10页</a><a href="#sec-homework">作业</a>
    <a href="#sec-1">附录①</a><a href="#sec-2">附录②</a><a href="#sec-3">附录③</a>
    <a href="#sec-4">附录④</a><a href="#sec-5">附录⑤</a>
  </nav>`;

if (html.includes("handout-section-nav")) {
  html = html.replace(/<nav class="handout-section-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/, navBlock);
} else {
  html = html.replace("<main", navBlock + "\n  <main");
}

writeFileSync(OUT, html, "utf8");
console.log("OK", OUT);
