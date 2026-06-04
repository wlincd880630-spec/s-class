import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "handout-catalog.json"), "utf8")
);

const STANDARD_PRINT_HEADER = `      <div class="print-header">
        <div class="field"><label>姓名</label><div class="line"></div></div>
        <div class="field"><label>日期</label><div class="line"></div></div>
      </div>`;

const GOOD_PRINT_HEADER =
  /<div class="print-header">\s*<div class="field"><label>姓名<\/label><div class="line"><\/div><\/div>\s*<div class="field"><label>日期<\/label><div class="line"><\/div><\/div>\s*<\/div>/i;

const ORPHAN_CHUNK =
  /(?:\s*<\/div>|\s*<div class="field"[^>]*>[\s\S]*?<\/div>)+/;

const NEXT_VALID =
  /(?=\s*<\/header>|\s*<p class="(?:handout-subtitle|doc-tag)"|\s*<section|\s*<table|\s*<div class="intro|\s*<div class="cover|<h2\s)/i;

function stripBottomNotes(html) {
  return html
    .replace(/<div class="foot"[^>]*>[\s\S]*?<\/div>\s*/gi, "")
    .replace(/<p class="foot"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="footer-min"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="footer-note"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="grammar-handout-footer"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(/<p class="print-hint"[^>]*>[\s\S]*?<\/p>\s*/gi, "");
}

function stripNameToolbar(html) {
  return html.replace(/<div class="name-toolbar[^"]*"[^>]*>[\s\S]*?<\/div>\s*/gi, "");
}

function removeExtraPrintHeaders(html) {
  const blocks = [...html.matchAll(/<div class="print-header"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi)];
  if (blocks.length <= 1) return html;
  let first = true;
  return html.replace(/<div class="print-header"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, (m) => {
    if (first) {
      first = false;
      return m;
    }
    return "";
  });
}

function fixOrphanPrintHeaderGarbage(html) {
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

function ensureStandardPrintHeader(html) {
  if (GOOD_PRINT_HEADER.test(html)) {
    return fixOrphanPrintHeaderGarbage(html);
  }
  html = html.replace(/<div class="print-header"[^>]*>[\s\S]*?<\/div>\s*(?:<\/div>\s*)*/gi, "");
  if (/<p class="doc-subtitle">/i.test(html)) {
    return html.replace(
      /(<p class="doc-subtitle">[\s\S]*?<\/p>)/i,
      `$1\n${STANDARD_PRINT_HEADER}`
    );
  }
  if (/<h1 class="doc-title">/i.test(html)) {
    return html.replace(
      /(<h1 class="doc-title">[\s\S]*?<\/h1>)/i,
      `$1\n${STANDARD_PRINT_HEADER}`
    );
  }
  return html;
}

function stripClassField(html) {
  return html.replace(/<label>班级<\/label>[\s\S]*?<\/div>\s*/gi, "");
}

let n = 0;
for (const rel of Object.keys(CATALOG)) {
  const fp = path.join(ROOT, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, "utf8");
  const before = html;
  html = stripBottomNotes(html);
  html = stripNameToolbar(html);
  html = stripClassField(html);
  html = removeExtraPrintHeaders(html);
  html = ensureStandardPrintHeader(html);
  if (html !== before) {
    fs.writeFileSync(fp, html, "utf8");
    console.log("OK", rel);
    n++;
  }
}

console.log("\nCleaned", n, "handout files");
