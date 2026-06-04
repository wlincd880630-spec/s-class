import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courses = ["L00-主谓宾与非谓语", "L00-主系表与非谓语"];
const scaleCss = path.join(root, "L00-主谓宾与非谓语", "assets", "l00-scale.css");
const linkTag = '  <link rel="stylesheet" href="assets/l00-scale.css" />\n';

for (const course of courses) {
  const dir = path.join(root, course);
  fs.copyFileSync(scaleCss, path.join(dir, "assets", "l00-scale.css"));

  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".html")) continue;
    const file = path.join(dir, name);
    let html = fs.readFileSync(file, "utf8");
    let changed = false;

    // 统一内联 zoom / width 为 1.4
    const next = html
      .replace(/zoom:\s*1\.(?:28|3|32|35)\s*;/g, "zoom: 1.4;")
      .replace(/calc\(100vw\s*\/\s*1\.(?:28|3|32|35)\)/g, "calc(100vw / 1.4)")
      .replace(/约\s*135%[^*]*\*/g, "整体缩放 140% */")
      .replace(/较原先 150% 缩小 10%[^*]*\*/g, "整体缩放 140% */");

    if (next !== html) {
      html = next;
      changed = true;
    }

    if (!html.includes("l00-scale.css")) {
      if (html.includes('href="assets/l00-unified-pager.css"')) {
        html = html.replace(
          /(<link rel="stylesheet" href="assets\/l00-unified-pager\.css" \/>)\n?/,
          `$1\n${linkTag}`
        );
      } else if (html.includes('href="../shared/grammar-index.css"')) {
        html = html.replace(
          /(<link rel="stylesheet" href="\.\.\/grammar-index\.css" \/>)\n/,
          `$1\n${linkTag}`
        );
      } else if (html.includes('href="assets/grammar-lesson-pager.css"')) {
        html = html.replace(
          /(<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>)\n?/,
          `$1\n${linkTag}`
        );
      } else {
        html = html.replace("</head>", `${linkTag}</head>`);
      }
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(file, html, "utf8");
      console.log("patched", path.relative(root, file));
    }
  }
}
