/**
 * 为 Primary 目录全部 HTML 注入全站响应式 CSS/JS，并规范 viewport。
 * 运行：node scripts/patch-primary-responsive.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIMARY = path.join(ROOT, "Primary");
const MARKER = "primary-responsive.css";
const CSS_VER = "1";
const JS_VER = "1";

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

function relAsset(fromFile, assetName) {
  const fromDir = path.dirname(fromFile);
  const assetsDir = path.join(PRIMARY, "assets");
  let rel = path.relative(fromDir, assetsDir).replace(/\\/g, "/");
  if (!rel || rel === ".") rel = "assets";
  return `${rel}/${assetName}`;
}

function normalizeViewport(html) {
  const vpRe = /<meta\s+name="viewport"\s+content="[^"]*"\s*\/?>/i;
  const ideal =
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />';
  if (vpRe.test(html)) {
    return html.replace(vpRe, (m) => {
      if (/viewport-fit=cover/i.test(m)) return m;
      return ideal;
    });
  }
  return html.replace(/<head([^>]*)>/i, `<head$1>\n  ${ideal}`);
}

function injectAssets(html, file) {
  if (html.includes(MARKER)) return html;
  const cssHref = relAsset(file, `primary-responsive.css?v=${CSS_VER}`);
  const jsSrc = relAsset(file, `primary-responsive.js?v=${JS_VER}`);
  const link = `  <link rel="stylesheet" href="${cssHref}" />\n`;
  const script = `  <script src="${jsSrc}" defer></script>\n`;

  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${link}</head>`);
  }
  if (/<\/body>/i.test(html)) {
    html = html.replace(/<\/body>/i, `${script}</body>`);
  } else {
    html += script;
  }
  return html;
}

const files = walk(PRIMARY);
let updated = 0;
let skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = normalizeViewport(html);
  html = injectAssets(html, file);
  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    updated++;
  } else {
    skipped++;
  }
}

console.log(`Primary responsive patch: updated ${updated}, skipped ${skipped}, total ${files.length}`);
