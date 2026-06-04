import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L13", "lesson13-page08-handout.html");
let h = fs.readFileSync(fp, "utf8");

h = h.replace(/<link rel="stylesheet" href="l13-index-nav\.css" \/>\s*/, "");
h = h.replace(/<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>\s*/, "");

h = h.replace(
  /<body class="l13-handout-page has-lesson-pager grammar-handout-page">/,
  '<body class="l13-handout-page l13-handout has-lesson-pager grammar-handout-page">'
);

h = h.replace(
  /<main class="sheet" id="handout-pdf-source">/,
  '<main class="sheet l13-handout" id="handout-pdf-source">'
);

h = h.replace(
  /<h1 class="doc-title">过去完成时<\/h1>\s*<p class="doc-subtitle">[\s\S]*?<\/div>\s*\n\n\n      <section class="intro">/,
  `<header class="handout-header">
        <h1 class="doc-title">过去完成时</h1>
        <p class="doc-subtitle">Steven's Class</p>
        <div class="print-header">
          <div class="field"><label>姓名</label><div class="line"></div></div>
          <div class="field"><label>日期</label><div class="line"></div></div>
        </div>
      </header>

      <section class="intro">`
);

const ids = [
  "sec-1",
  "sec-2",
  "sec-3",
  "sec-4",
  "sec-5",
  "sec-6",
  "sec-7",
  "sec-8",
  "sec-10",
  "sec-10b",
  "sec-11",
];
for (const id of ids) {
  h = h.replace(
    new RegExp(`<section id="${id}"( class="[^"]*")?>`),
    `<section class="handout-section$1" id="${id}">`.replace('$1""', "").replace(
      'class="handout-section class="story-set"',
      'class="handout-section story-set"'
    )
  );
  // fix double class
  h = h.replace(
    `class="handout-section" class="story-set"`,
    'class="handout-section story-set"'
  );
}

h = h.replace(
  /<details id="sec-9" open>\s*<summary>⑨ 易错红线 · 10 条<\/summary>/,
  '<section class="handout-section" id="sec-9">\n        <h2 class="section-title">⑨ 易错红线 · 10 条</h2>'
);
h = h.replace(
  /<\/details>\s*\n\s*<section class="handout-section" id="sec-10">/,
  "</section>\n\n      <section class=\"handout-section\" id=\"sec-10\">"
);

if (!h.includes("grammar-handout-footer")) {
  h = h.replace(
    /(<\/section>\s*)\s*<\/div>\s*<\/main>/,
    `$1
      <p class="grammar-handout-footer">过去完成时</p>
    </div>
  </main>`
  );
}

// fix sec-11 closing
h = h.replace(
  /(<div class="quote-box">[\s\S]*?<\/div>)\s*<\/section>\s*<\/div>/,
  "$1\n      </section>\n    </div>"
);

fs.writeFileSync(fp, h);
console.log("done", h.split("\n").length);
console.log("details", (h.match(/<details/g) || []).length);
