import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fp = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "L07",
  "lesson07-page10-handout-zhongkao.html"
);

let html = fs.readFileSync(fp, "utf8");

html = html.replace(
  /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/,
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />'
);

html = html.replace(
  /<style>[\s\S]*?<\/style>\s*/,
  `<link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l07-handout-sheet.css" />
`
);

html = html.replace(
  /<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-logo\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-handout\.css" \/>\s*<link rel="stylesheet" href="\.\.\/grammar-lesson-pager\.css" \/>\s*<link rel="stylesheet" href="assets\/l07-handout-sheet\.css" \/>\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" [\s\S]*?<link rel="stylesheet" href="\.\.\/grammar-lesson-pager\.css" \/>\s*/,
  `<link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l07-handout-sheet.css" />
`
);

html = html.replace(
  /<main class="sheet" id="handout-pdf-source">/,
  '<main class="sheet l07-handout" id="handout-pdf-source">'
);

html = html.replace(/class="data-table"/g, 'class="data"');

fs.writeFileSync(fp, html, "utf8");
console.log("fixed L07 handout layout");
