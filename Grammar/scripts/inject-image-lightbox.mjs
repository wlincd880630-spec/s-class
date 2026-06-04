#!/usr/bin/env node
/**
 * 为所有课件 HTML 注入 lesson-image-lightbox（CSS + JS）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_JS = path.join(ROOT, "lesson-image-lightbox.js");
const SRC_CSS = path.join(ROOT, "lesson-image-lightbox.css");

const ASSET_DIRS = [
  "L00-主谓宾与非谓语",
  "L00-主系表与非谓语",
  "L01",
  "L02",
  "L03",
  "L05",
  "L06",
  "L07",
  "L08",
  "L09",
  "L10",
  "L11",
  "L12",
  "L13",
  "L13-定语从句",
];

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === "node_modules" || name === ".git" || name === "scripts") continue;
      walkHtml(p, acc);
    } else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function copyAssets() {
  const js = fs.readFileSync(SRC_JS, "utf8");
  const css = fs.readFileSync(SRC_CSS, "utf8");
  for (const lesson of ASSET_DIRS) {
    const assetsDir = path.join(ROOT, lesson, "assets");
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    fs.writeFileSync(path.join(assetsDir, "lesson-image-lightbox.js"), js);
    fs.writeFileSync(path.join(assetsDir, "lesson-image-lightbox.css"), css);
  }
  console.log("Copied lightbox assets to", ASSET_DIRS.length, "lesson folders");
}

function lightboxPathFor(htmlPath) {
  const rel = path.relative(ROOT, htmlPath);
  const lesson = rel.split(path.sep)[0];
  if (lesson === "L13-定语从句") {
    return "../L13/assets/lesson-image-lightbox";
  }
  return "assets/lesson-image-lightbox";
}

const MARK_CSS = "lesson-image-lightbox.css";
const MARK_JS = "lesson-image-lightbox.js";
const OLD_SCRIPTS = ["l11-image-lightbox.js", "l13-image-lightbox.js"];

function inject(htmlPath) {
  let c = fs.readFileSync(htmlPath, "utf8");
  let changed = false;

  for (const old of OLD_SCRIPTS) {
    const re = new RegExp(`\\s*<script[^>]+src=["'][^"']*${old}["'][^>]*>\\s*</script>\\s*`, "gi");
    if (re.test(c)) {
      c = c.replace(re, "\n");
      changed = true;
    }
  }

  if (c.includes(MARK_JS)) return { changed: false, skipped: true };

  const base = lightboxPathFor(htmlPath);
  const block =
    `  <link rel="stylesheet" href="${base}.css" />\n` +
    `  <script src="${base}.js" defer></script>\n`;

  // 只替换最后一个 </body>，避免误改 JS 字符串里的 "</body></html>"
  const bodyClose = c.lastIndexOf("</body>");
  if (bodyClose !== -1) {
    c = c.slice(0, bodyClose) + block + c.slice(bodyClose);
    changed = true;
  }

  if (changed) fs.writeFileSync(htmlPath, c, "utf8");
  return { changed, skipped: false };
}

copyAssets();

let patched = 0;
let skipped = 0;
for (const fp of walkHtml(ROOT)) {
  if (path.basename(fp) === "index.html" && path.dirname(fp) === ROOT) {
    skipped++;
    continue;
  }
  const r = inject(fp);
  if (r.skipped) skipped++;
  else if (r.changed) {
    patched++;
    console.log("PATCH", path.relative(ROOT, fp));
  }
}
console.log("Done. patched:", patched, "skipped (already):", skipped);
