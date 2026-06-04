#!/usr/bin/env node
/** 修复误插入到 JS 字符串内的 lightbox 标签 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BAD =
  /"\s*<link rel="stylesheet" href="[^"]*lesson-image-lightbox\.css" \/>\s*\n\s*<script src="[^"]*lesson-image-lightbox\.js" defer><\/script>\s*\n<\/body><\/html>"/g;

const BLOCK =
  '  <link rel="stylesheet" href="assets/lesson-image-lightbox.css" />\n' +
  '  <script src="assets/lesson-image-lightbox.js" defer></script>\n';

function walk(dir, acc = []) {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) {
      if (["node_modules", ".git", "scripts"].includes(n)) continue;
      walk(p, acc);
    } else if (n.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let fixed = 0;
for (const fp of walk(ROOT)) {
  let c = fs.readFileSync(fp, "utf8");
  if (!BAD.test(c)) continue;
  c = c.replace(BAD, '"</body></html>"');
  c = c.replace(
    /"\s*<\/div>\s*<link rel="stylesheet" href="[^"]*lesson-image-lightbox\.css"[^]*?<\/body><\/html>"/g,
    '"</div></body></html>"'
  );
  if (!c.includes("lesson-image-lightbox.js")) {
    const i = c.lastIndexOf("</body>");
    if (i !== -1) c = c.slice(0, i) + BLOCK + c.slice(i);
  }
  fs.writeFileSync(fp, c, "utf8");
  fixed++;
  console.log("FIX", path.relative(ROOT, fp));
}
console.log("fixed", fixed);
