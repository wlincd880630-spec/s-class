/**
 * 为所有讲义 HTML 追加 grammar-handout-print-unify.css（打印样式链最后加载）
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UNIFY_HREF = "../grammar-handout-print-unify.css";
const UNIFY_TAG = `<link rel="stylesheet" href="${UNIFY_HREF}" media="print" />`;

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "node_modules" || name === "handout") continue;
      walkHtml(p, out);
    } else if (/handout.*\.html$/i.test(name) || /rel-clause-handout\.html$/i.test(name)) {
      out.push(p);
    }
  }
  return out;
}

function patchFile(absPath) {
  let html = readFileSync(absPath, "utf8");
  if (!html.includes("grammar-handout-print.css")) return { path: absPath, skipped: true };
  if (html.includes("grammar-handout-print-unify.css")) return { path: absPath, skipped: true };

  const relPrefix = UNIFY_HREF; // all handouts use ../ to root
  const tag = `<link rel="stylesheet" href="${relPrefix}" media="print" />`;

  const pubMatch = html.match(
    /<link[^>]+handout-publisher\.css[^>]*>\s*/i
  );
  const printMatch = html.match(
    /<link[^>]+grammar-handout-print\.css[^>]*>\s*/i
  );

  if (pubMatch) {
    const idx = html.indexOf(pubMatch[0]) + pubMatch[0].length;
    html = html.slice(0, idx) + `  ${tag}\n` + html.slice(idx);
  } else if (printMatch) {
    const idx = html.indexOf(printMatch[0]) + printMatch[0].length;
    html = html.slice(0, idx) + `  ${tag}\n` + html.slice(idx);
  } else {
    html = html.replace(/<\/head>/i, `  ${tag}\n</head>`);
  }

  writeFileSync(absPath, html, "utf8");
  return { path: absPath, patched: true };
}

const files = walkHtml(ROOT);
const results = files.map(patchFile);
const patched = results.filter((r) => r.patched);
const skipped = results.filter((r) => r.skipped);
console.log("已追加 unify.css:", patched.length);
patched.forEach((r) => console.log(" ", r.path.replace(ROOT + "\\", "")));
console.log("跳过:", skipped.length);
