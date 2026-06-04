import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L11", "lesson11-page08-handout.html");
let h = fs.readFileSync(fp, "utf8");

const styleM = h.match(/<style>([\s\S]*?)<\/style>/);
if (!styleM) throw new Error("no style block");

let css = styleM[1].trim();
css = css.replace(/^:root/, "body.grammar-handout-page.l11-handout,\nbody.grammar-handout-page.l11-handout :root");
css = css.replace(/\n    body \{/g, "\nbody.grammar-handout-page.l11-handout {");
css = css.replace(/\n    \.sheet \{/g, "\nbody.grammar-handout-page main.sheet.l11-handout {");
css = css.replace(/\n    \.handout-pdf-bar[\s\S]*?\.btn-handout-pdf:hover \{ background: #f3e8ff; \}\n/, "\n");
css = css.replace(/\n    \.no-print-hint[\s\S]*?font-weight: 700;\n    \}\n/, "\n");
css = css.replace(
  /@media print \{\s*@page \{ size: A4 portrait; margin: 12mm; \}/,
  "@media print {\n  @page {\n    size: A4;\n    margin: 14mm 12mm 16mm;\n  }"
);
css = css.replace(
  /\.handout-pdf-bar, \.no-print-hint \{ display: none !important; \}/,
  "body.grammar-handout-page .handout-section-nav,\n      body.grammar-handout-page .grammar-handout-top,\n      body.grammar-handout-page .grammar-handout-pdf-bar,\n      body.grammar-handout-page .lesson-pager { display: none !important; }"
);

const cssOut =
  "/**\n * L11 状语从句讲义 · 专题样式（外壳见 ../shared/grammar-handout.css）\n */\n\n" +
  css +
  "\n\nbody.grammar-handout-page.l11-handout .grammar-handout-footer {\n  margin-top: 1.25rem;\n  padding-top: 0.65rem;\n  border-top: 1px solid rgba(123, 31, 162, 0.3);\n  font-size: 0.78rem;\n  color: var(--gh-ink-soft, #5d4037);\n  text-align: center;\n}\n\nbody.grammar-handout-page.l11-handout .note-tight {\n  margin-bottom: 0;\n}\n";

fs.writeFileSync(path.join(ROOT, "L11", "assets", "l11-handout-sheet.css"), cssOut);

h = h.replace(/<link rel="stylesheet" href="l11-index-nav\.css" \/>\s*<style>[\s\S]*?<\/style>\s*/, "");
h = h.replace(
  /<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>\s*/,
  ""
);
h = h.replace(
  /<link rel="stylesheet" href="\.\.\/grammar-lesson-pager\.css" \/>\s*<\/head>/,
  '<link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />\n  <link rel="stylesheet" href="assets/l11-handout-sheet.css" />\n</head>'
);

h = h.replace(
  /<body class="has-lesson-pager grammar-handout-page">/,
  '<body class="has-lesson-pager grammar-handout-page l11-handout">'
);
h = h.replace(
  /<main class="sheet" id="handout-pdf-source">/,
  '<main class="sheet l11-handout" id="handout-pdf-source">'
);

h = h.replace(
  /<h1 class="doc-title">状语从句<\/h1>\s*<p class="doc-subtitle">[\s\S]*?<\/div>\s*\n\n\n      <section id="sec-1">\s*<section class="intro">([\s\S]*?)<\/section>\s*\n      <h2 class="section-title">①/,
  `<header class="handout-header">
        <h1 class="doc-title">状语从句</h1>
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
  "<strong>使用方法：</strong>① 用①总表圈功能 ② 按②～⑦精读例句与色标 ③ 对照⑧易错红线 ④ 完成⑩⑪默写 ⑤ 背⑫口诀。<br />\n        建议每天 <strong>15 分钟</strong>：读 1 类连词 + 2 句例句 → 口头说明「时间/原因/条件…」→ 仿写 1 句。"
);

const ids = ["sec-1", "sec-2", "sec-3", "sec-4", "sec-5", "sec-6", "sec-7", "sec-10", "sec-11", "sec-12"];
for (const id of ids) {
  if (id === "sec-1") continue;
  h = h.replace(new RegExp(`<section id="${id}">`), `<section class="handout-section" id="${id}">`);
}

h = h.replace(
  /<details id="sec-8" open>\s*<summary>⑧ 易错红线 · 课堂速改（12 条）<\/summary>/,
  '<section class="handout-section" id="sec-8">\n        <h2 class="section-title">⑧ 易错红线 · 速改（12 条）</h2>'
);
h = h.replace(/<\/details>\s*\n\s*<details id="sec-9" open>\s*<summary>⑨ 当堂测前 · 自检清单<\/summary>/, "");
h = h.replace(
  /<\/ol>\s*<\/details>\s*\n\s*<section class="handout-section" id="sec-10">/,
  '</ol>\n      </section>\n\n      <section class="handout-section" id="sec-9">\n        <h2 class="section-title">⑨ 测前自检清单</h2>\n        <ol class="compact checklist">\n          <li>能说出六类功能各一句例句。</li>\n          <li>会辨 if / unless / until / as soon as。</li>\n          <li>会辨 so…that / such…that / so that / too…to。</li>\n          <li>见到 because…so、although…but 能改对。</li>\n          <li>合并句：先判关系再选连词。</li>\n          <li>微语篇：能找 As soon as / because / so that / Although。</li>\n          <li>完成练习后对照本讲义复盘。</li>\n        </ol>\n      </section>\n\n      <section class="handout-section" id="sec-10">'
);

// Remove duplicate sec-9 block if still present
h = h.replace(
  /<section class="handout-section" id="sec-9">\s*<h2 class="section-title">⑨ 测前自检清单<\/h2>[\s\S]*?<\/section>\s*\n\s*<section class="handout-section" id="sec-9">[\s\S]*?<\/section>\s*\n\s*<section class="handout-section" id="sec-10">/,
  (m) => m.split("</section>").slice(0, 2).join("</section>") + "\n\n      <section class=\"handout-section\" id=\"sec-10\">"
);

if (!h.includes("grammar-handout-footer")) {
  h = h.replace(
    /(<\/section>\s*)\s*<\/div>\s*<\/main>/,
    `$1
      <p class="grammar-handout-footer">状语从句</p>
    </div>
  </main>`
  );
}

h = h.replace('style="margin-bottom:0"', 'class="note note-tight"');
h = h.replace('<p class="note" class="note note-tight"', '<p class="note note-tight"');

// sec-1 needs handout-section class
h = h.replace('<section class="handout-section" id="sec-1">', '<section class="handout-section" id="sec-1">');

fs.writeFileSync(fp, h);
console.log("css bytes", cssOut.length);
console.log("html lines", h.split("\n").length);
console.log("details left", (h.match(/<details/g) || []).length);
console.log("footer", h.includes("grammar-handout-footer"));
