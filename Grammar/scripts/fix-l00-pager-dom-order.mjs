import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courses = ["L00-主谓宾与非谓语", "L00-主系表与非谓语"];

const navRe = /\n  <nav class="lesson-pager is-l00-unified"[\s\S]*?<\/nav>(?=\s*\n<\/body>)/;

for (const course of courses) {
  for (let p = 1; p <= 4; p++) {
    const file = path.join(root, course, `page${p}.html`);
    let html = fs.readFileSync(file, "utf8");
    const navMatch = html.match(navRe);
    if (!navMatch) {
      console.warn("skip (no nav at end):", file);
      continue;
    }
    const nav = navMatch[0];
    html = html.replace(navRe, "");

    const marker = 'getElementById("nextBtn")';
    const pos = html.indexOf(marker);
    if (pos === -1) {
      console.warn("skip (no nextBtn):", file);
      continue;
    }
    const before = html.slice(0, pos);
    const scriptIdx = before.lastIndexOf("<script>");
    if (scriptIdx === -1) {
      console.warn("skip (no script):", file);
      continue;
    }
    html = html.slice(0, scriptIdx) + nav + "\n" + html.slice(scriptIdx);
    fs.writeFileSync(file, html, "utf8");
    console.log("fixed DOM order:", path.relative(root, file));
  }
}
