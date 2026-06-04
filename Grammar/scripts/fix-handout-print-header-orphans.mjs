import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const GOOD_PRINT_HEADER =
  /<div class="print-header">\s*<div class="field"><label>姓名<\/label><div class="line"><\/div><\/div>\s*<div class="field"><label>日期<\/label><div class="line"><\/div><\/div>\s*<\/div>/i;

const ORPHAN_CHUNK =
  /(?:\s*<\/div>|\s*<div class="field"[^>]*>[\s\S]*?<\/div>)+/;

const NEXT_VALID =
  /(?=\s*<\/header>|\s*<p class="(?:handout-subtitle|doc-tag)"|\s*<section|\s*<table|\s*<div class="intro|\s*<div class="cover|<h2\s)/i;

function fixOrphans(html) {
  if (!GOOD_PRINT_HEADER.test(html)) return html;
  let out = html.replace(
    new RegExp(
      `(${GOOD_PRINT_HEADER.source})${ORPHAN_CHUNK.source}${NEXT_VALID.source}`,
      "gi"
    ),
    "$1\n"
  );
  out = out.replace(
    /<\/header>\s*(?:<\/div>\s*<div class="field">[\s\S]*?<\/div>\s*<\/div>\s*)+/gi,
    "\n      </header>\n\n"
  );
  return out;
}

function stripBottomNotes(html) {
  return html
    .replace(/<div class="foot"[^>]*>[\s\S]*?<\/div>\s*/gi, "")
    .replace(/<p class="foot"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="footer-min"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="footer-note"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="grammar-handout-footer"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="print-hint"[^>]*>[\s\S]*?<\/p>\s*/gi, "");
}

const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory() && !name.startsWith(".") && name !== "node_modules") walk(fp);
    else if (/handout/i.test(name) && name.endsWith(".html")) files.push(fp);
  }
}
walk(ROOT);

let n = 0;
for (const fp of files) {
  let html = fs.readFileSync(fp, "utf8");
  const before = html;
  html = stripBottomNotes(html);
  html = fixOrphans(html);
  if (html !== before) {
    fs.writeFileSync(fp, html, "utf8");
    console.log("fixed", path.relative(ROOT, fp));
    n++;
  }
}
console.log("\nDone:", n, "files");
