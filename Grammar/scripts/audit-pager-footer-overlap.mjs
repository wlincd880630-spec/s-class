import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hits = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.name.startsWith(".") || name.name === "node_modules" || name.name === "scripts") continue;
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.name.endsWith(".html")) check(p);
  }
}

function check(file) {
  const t = fs.readFileSync(file, "utf8");
  if (!t.includes("lesson-pager") && !t.includes("has-lesson-pager")) return;
  const rel = path.relative(root, file).replace(/\\/g, "/");

  const bodyPager = /<body[^>]*has-lesson-pager[\s\S]*<nav[^>]*lesson-pager/.test(t) || (t.includes("has-lesson-pager") && /<\/body>\s*<nav[^>]*lesson-pager/.test(t) === false && t.includes('<nav class="lesson-pager'));

  const fixedFooterBar =
    t.includes('class="footer-bar"') &&
    /\.footer-bar\s*\{[^}]*position\s*:\s*fixed[^}]*bottom\s*:\s*0/s.test(t);

  const fixedBottomClasses = [];
  for (const cls of ["footer-bar", "page-foot", "bottom-bar", "ctrl-dock", "nav-dock", "sticky-foot"]) {
    const re = new RegExp(`\\.${cls}\\s*\\{[^}]*position\\s*:\\s*fixed[^}]*bottom\\s*:\\s*0`, "s");
    if (re.test(t)) fixedBottomClasses.push(cls);
  }

  if (fixedFooterBar || fixedBottomClasses.length) {
    hits.push({ rel, fixedBottomClasses, bodyPager: t.includes("> .footer-bar") || t.includes('class="footer-bar"') });
  }
}

walk(root);
console.log("Potential fixed-bottom + lesson-pager overlap:", hits.length);
for (const h of hits) console.log(`  ${h.rel}  [${h.fixedBottomClasses.join(", ")}]`);
