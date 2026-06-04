import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L08", "lesson08-page10-handout.html");
let h = fs.readFileSync(fp, "utf8");

const headNew = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>将来时与条件句</title>
  <script src="assets/l08-handout-manifest.embed.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l08-handout-sheet.css" />
</head>
<body class="has-lesson-pager grammar-handout-page l08-handout">`;

h = h.replace(
  /^<!DOCTYPE html>[\s\S]*?<body class="has-lesson-pager grammar-handout-page">/,
  headNew
);

if (!h.includes("handout-section-nav")) {
  h = h.replace(
    /(<div class="grammar-handout-pdf-bar no-print">[\s\S]*?<\/div>\s*)\n(\s*<main)/,
    `$1
  <nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sec-1">①导图</a>
    <a href="#sec-2">②going</a>
    <a href="#sec-3">③will</a>
    <a href="#sec-4">④If</a>
    <a href="#sec-5">⑤问句</a>
    <a href="#sec-6">⑥综括</a>
    <a href="#sec-7">⑦金句</a>
    <a href="#sec-8">⑧口诀</a>
  </nav>

$2`
  );
}

h = h.replace(
  /<main class="sheet" id="handout-pdf-source">/,
  '<main class="sheet l08-handout" id="handout-pdf-source">'
);

h = h.replace(
  /<section class="handout-section">\s*<section class="intro">([\s\S]*?)<\/section>\s*<h2 class="section-title">🗺️/,
  '<section class="intro">$1</section>\n\n      <section class="handout-section" id="sec-1">\n      <h2 class="section-title">🗺️'
);

const sectionPatches = [
  [/① be going to/, "sec-2"],
  [/② will ·/, "sec-3"],
  [/③ If 引导/, "sec-4"],
  [/④ 否定句/, "sec-5"],
  [/🔀 三者混搭/, "sec-6"],
  [/✨ 高频重组句/, "sec-7"],
];

for (const [titleRe, id] of sectionPatches) {
  h = h.replace(
    new RegExp(
      `<section class="handout-section">\\s*<h2 class="section-title">${titleRe.source}`
    ),
    `<section class="handout-section" id="${id}">\n        <h2 class="section-title">${titleRe.source}`
  );
}

h = h.replace("初中课标「将来」三大支柱", "「将来」三大支柱");

h = h.replace(
  /<strong>使用方法：<\/strong>① 熟读公式与口诀 ② 对照例句理解用法 ③ 完成默写与易错自测。[\s\S]*?对照易错点自改。/,
  "<strong>使用方法：</strong>① 读全景导图分清 going to / will / If ② 按①→⑦背诵例句（点 🔊）③ 模仿综括段写 3 句混搭 ④ 对照⑧口诀自测。<br />\n        建议每天 <strong>15 分钟</strong>：朗读 3 句 → 说明「计划／预测／条件」→ 仿写 1 句。"
);

if (!h.includes("grammar-handout-footer")) {
  h = h.replace(
    /(<div class="ex-pair"><p class="en-line"><strong>If young people[\s\S]*?<\/section>\s*)\s*<\/div>\s*<\/main>/,
    `$1
      <section class="handout-section" id="sec-8">
        <h2 class="section-title">📌 背诵口诀 · 易错红线</h2>
        <div class="quote-box">
          打算用 going to，预测许诺用 will；<br />
          If 从句现在时，主句 will 表将来；<br />
          否定 not 在 be / will 后，疑问 be / Will 提前；<br />
          going to 有计划，will 当场定；二者可同段，逻辑要分清。
        </div>
        <div class="warn-strip" style="margin-top:0.65rem;">
          切忌：If 从句写 will（✗ If it will rain）→ 用一般现在时（✓ If it rains）；修饰将来时间状语从句同理遵循「主将从现」。
        </div>
      </section>

      <p class="grammar-handout-footer">将来时与条件句</p>
    </div>
  </main>`
  );
}

h = h.replace(
  /<script>\s*\(function \(\) \{[\s\S]*?Azure Speech[\s\S]*?\}\)\(\);\s*<\/script>/,
  '<script src="assets/l08-handout-tts.js" defer></script>'
);

fs.writeFileSync(fp, h);
console.log("lines:", h.split("\n").length);
console.log("nav:", h.includes("handout-section-nav"));
console.log("azure:", h.includes("AZURE_KEY"));
console.log("sec-8:", h.includes('id="sec-8"'));
