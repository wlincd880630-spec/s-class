/**
 * 为全站课程 HTML 注入触屏标注/白板 overlay（drawing-overlay.css + drawing-overlay.js）
 * 运行：node scripts/patch-drawing-overlay.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPTS_DIR = path.join(ROOT, "scripts");
const MARKER = "drawing-overlay.js";
const CSS_VER = "1";
const JS_VER = "1";

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "Grammar/scripts",
]);

const SKIP_FILE_PATTERNS = [
  /review-print\.html$/i,
  /-print\.html$/i,
  /print\.html$/i,
];

function shouldSkipDir(rel) {
  const norm = rel.replace(/\\/g, "/");
  for (const d of SKIP_DIRS) {
    if (norm === d || norm.startsWith(d + "/")) return true;
  }
  return false;
}

function shouldSkipFile(rel) {
  const norm = rel.replace(/\\/g, "/");
  if (norm === "index.html") return true;
  for (const re of SKIP_FILE_PATTERNS) {
    if (re.test(norm)) return true;
  }
  return false;
}

function walk(dir, relBase = "", out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = relBase ? `${relBase}/${name}` : name;
    if (shouldSkipDir(rel)) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, rel, out);
    else if (name.endsWith(".html")) out.push({ full, rel });
  }
  return out;
}

function relToScripts(fromFile) {
  const fromDir = path.dirname(fromFile);
  let rel = path.relative(fromDir, SCRIPTS_DIR).replace(/\\/g, "/");
  if (!rel || rel === ".") rel = "scripts";
  return rel;
}

function injectAssets(html, file) {
  if (html.includes(MARKER)) return html;
  const prefix = relToScripts(file);
  const cssHref = `${prefix}/drawing-overlay.css?v=${CSS_VER}`;
  const jsSrc = `${prefix}/drawing-overlay.js?v=${JS_VER}`;
  const link = `  <link rel="stylesheet" href="${cssHref}" />\n`;
  const script = `  <script src="${jsSrc}" defer></script>\n`;

  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${link}</head>`);
  } else {
    html = link + html;
  }

  if (/<\/body>/i.test(html)) {
    html = html.replace(/<\/body>/i, `${script}</body>`);
  } else {
    html += script;
  }
  return html;
}

const files = walk(ROOT).filter((f) => !shouldSkipFile(f.rel));
let updated = 0;
let skipped = 0;

for (const { full, rel } of files) {
  let html = fs.readFileSync(full, "utf8");
  const before = html;
  html = injectAssets(html, full);
  if (html !== before) {
    fs.writeFileSync(full, html, "utf8");
    updated++;
  } else {
    skipped++;
  }
}

console.log(
  `Drawing overlay patch: updated ${updated}, skipped ${skipped}, total ${files.length}`
);
