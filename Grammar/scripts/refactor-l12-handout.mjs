import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L12", "lesson12-page07-handout.html");
let h = fs.readFileSync(fp, "utf8");

h = h.replace(
  /<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>\s*/,
  ""
);

h = h.replace(
  /<body class="has-lesson-pager grammar-handout-page">/,
  '<body class="has-lesson-pager grammar-handout-page l12-handout">'
);

h = h.replace(
  /<main class="sheet" id="handout-pdf-source">/,
  '<main class="sheet l12-handout" id="handout-pdf-source">'
);

if (!h.includes("handout-section-nav")) {
  h = h.replace(
    /(<div class="grammar-handout-pdf-bar no-print">[\s\S]*?<\/div>\s*)\n(\s*<main)/,
    `$1
  <nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sec-1">①三要素</a>
    <a href="#sec-2">②否定</a>
    <a href="#sec-3">③时态</a>
    <a href="#sec-4">④语料</a>
    <a href="#sec-5">⑤易错</a>
    <a href="#sec-6">⑥自检</a>
    <a href="#sec-7">⑦英译</a>
    <a href="#sec-8">⑧汉译</a>
    <a href="#sec-9">⑨口诀</a>
  </nav>

$2`
  );
}

h = h.replace(
  /<h1 class="doc-title">宾语从句<\/h1>\s*<p class="doc-subtitle">[\s\S]*?<\/div>\s*\n\n      <section>\s*<section class="intro">([\s\S]*?)<\/section>\s*\n\n      <h2 class="section-title">①/,
  `<header class="handout-header">
        <h1 class="doc-title">宾语从句</h1>
        <p class="doc-subtitle">Steven's Class</p>
        <div class="print-header">
          <div class="field"><label>姓名</label><div class="line"></div></div>
          <div class="field"><label>日期</label><div class="line"></div></div>
        </div>
      </header>

      <section class="intro">$1</section>

      <section class="handout-section" id="sec-1">
      <h2 class="section-title">①`
);

h = h.replace(
  /<strong>使用方法：<\/strong>① 熟读公式与口诀[\s\S]*?对照易错点自改。/,
  "<strong>使用方法：</strong>① 背清三要素（引导词·语序·时态）② 精读②③表与④语料 ③ 对照⑤易错红线 ④ 完成⑦⑧默写 ⑤ 背⑨口诀。<br />\n        建议每天 <strong>15 分钟</strong>：读 1 张要素卡 + 3 句语料 → 口头说明引导词与语序 → 仿写 1 句。"
);

h = h.replace(
  /可与 Page02–04 课堂页交叉背诵。/,
  "可与本讲前几课课件交叉背诵。"
);

const sections = [
  [/② 否定转移/, "sec-2"],
  [/③ 时态后退/, "sec-3"],
  [/④ 实用语料库/, "sec-4"],
  [/⑦ 默写区（英译汉/, "sec-7"],
  [/⑧ 默写区（汉译英/, "sec-8"],
  [/⑨ 背诵口诀/, "sec-9"],
];

for (const [titleRe, id] of sections) {
  h = h.replace(
    new RegExp(`<section>\\s*<h2 class="section-title">${titleRe.source}`),
    `<section class="handout-section" id="${id}">\n        <h2 class="section-title">${titleRe.source}`
  );
}

h = h.replace(
  /<details open>\s*<summary>⑤ 易错红线 · 课堂速改（10 条）<\/summary>/,
  '<section class="handout-section" id="sec-5">\n        <h2 class="section-title">⑤ 易错红线 · 速改（10 条）</h2>'
);
h = h.replace(
  /<\/details>\s*\n\s*<details open>\s*<summary>⑥ 综测前 · 自检清单<\/summary>/,
  '</section>\n\n      <section class="handout-section" id="sec-6">\n        <h2 class="section-title">⑥ 测前自检清单</h2>'
);
h = h.replace(/<\/details>\s*\n\s*<section class="handout-section" id="sec-7">/, "</section>\n\n      <section class=\"handout-section\" id=\"sec-7\">");

if (!h.includes("grammar-handout-footer")) {
  h = h.replace(
    /(<\/section>\s*)\s*<\/div>\s*<\/main>/,
    `$1
      <p class="grammar-handout-footer">宾语从句</p>
    </div>
  </main>`
  );
}

h = h.replace('style="margin-bottom:0"', 'class="note note-tight"');
h = h.replace('<p class="note" class="note note-tight"', '<p class="note note-tight"');

fs.writeFileSync(fp, h);
console.log("lines", h.split("\n").length);
console.log("details", (h.match(/<details/g) || []).length);
