/**
 * L06 讲义 → 提取专题 CSS，移除 lesson-screen-16x9 冲突
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L06", "lesson06-page10-handout.html");
const cssOut = path.join(ROOT, "L06", "assets", "l06-handout-sheet.css");

let html = fs.readFileSync(fp, "utf8");

const sheetMatch = html.match(/<style>\s*\n    :root\s*\{[\s\S]*?<\/style>\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css"/);
if (!sheetMatch) {
  console.error("未找到 L06 内联样式");
  process.exit(1);
}

let sheetCss = sheetMatch[0]
  .replace(/\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css"\s*$/, "")
  .replace(/^<style>\s*/, "")
  .replace(/\s*<\/style>\s*$/, "")
  .trim();

sheetCss = `/**\n * L06 情态动词讲义 · 专题样式（外壳见 ../shared/grammar-handout.css）\n */\n\n${sheetCss}`;
sheetCss = sheetCss.replace(/^    body\s*\{/m, "body.grammar-handout-page.l06-handout {");
sheetCss = sheetCss.replace(/^    \.sheet\s*\{/m, "body.grammar-handout-page main.sheet.l06-handout {");
sheetCss = sheetCss.replace(
  /padding: 1rem 1rem 3rem;\s*\n      font-size: 16px;\s*\n    \}\s*\n    body\.has-lesson-pager \{[\s\S]*?\}\s*\n\n    \.handout-pdf-bar/,
  "font-size: 16px;\n    }\n\n    .handout-pdf-bar"
);

sheetCss += `

body.grammar-handout-page main.sheet.l06-handout {
  max-width: var(--gh-sheet-max, 900px);
}

body.grammar-handout-page.l06-handout .quote-box {
  margin-top: 0.85rem;
  padding: 0.65rem 0.9rem;
  border-radius: 14px;
  border: 2px dashed var(--crayon-orange, #f0ad4e);
  background: linear-gradient(180deg, rgba(255, 249, 240, 0.95), #fff);
  font-size: 0.88rem;
  line-height: 1.7;
  font-weight: 700;
  color: #4e342e;
}

@media print {
  body.grammar-handout-page.l06-handout .drill-card .answer,
  body.grammar-handout-page.l06-handout .quick-check .answer {
    display: none !important;
  }
}
`;

fs.writeFileSync(cssOut, sheetCss, "utf8");

html = html.replace(
  /<link rel="stylesheet" href="assets\/lesson-screen-16x9\.css" \/>[\s\S]*?<\/style>\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css"[\s\S]*?<\/head>/,
  `<link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l06-handout-sheet.css" />
</head>`
);

fs.writeFileSync(fp, html, "utf8");
console.log("OK:", path.relative(ROOT, fp));
console.log("OK:", path.relative(ROOT, cssOut));
