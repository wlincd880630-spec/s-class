#!/usr/bin/env node
/**
 * 将根目录公共 grammar-* 资源迁入 shared/，更新引用，删除冗余文件
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHARED = path.join(ROOT, "shared");

const MOVE = [
  "grammar-handout-appendix-panel.css",
  "grammar-handout-ex-pair.css",
  "grammar-handout-print-prep.js",
  "grammar-handout-print-unify.css",
  "grammar-handout-print.css",
  "grammar-handout-sentence-cards.css",
  "grammar-handout-time-chips.css",
  "grammar-handout.css",
  "grammar-handout.js",
  "grammar-index-scale.css",
  "grammar-index.css",
  "grammar-lesson-pager.css",
  "grammar-logo.css"
];

const DELETE = ["grammar-home.css", "lesson-image-lightbox.css", "lesson-image-lightbox.js"];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (["node_modules", ".git"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === "shared" && dir === ROOT) continue;
      walk(p, acc);
    } else if (/\.(html|css|js|mjs)$/i.test(name)) acc.push(p);
  }
  return acc;
}

function patchContent(text) {
  let s = text;
  s = s.replace(/href="\.\.\/grammar-/g, 'href="../shared/grammar-');
  s = s.replace(/src="\.\.\/grammar-/g, 'src="../shared/grammar-');
  s = s.replace(/href="shared/grammar-/g, 'href="shared/grammar-');
  s = s.replace(/src="shared/grammar-/g, 'src="shared/grammar-');
  s = s.replace(/@import url\("\.\.\/\.\.\/grammar-/g, '@import url("../../shared/grammar-');
  s = s.replace(/@import url\("grammar-/g, '@import url("shared/grammar-');
  s = s.replace(/shared/grammar-handout-print/g, "shared/grammar-handout-print");
  s = s.replace(/\.\.\/grammar-handout\.css/g, "../shared/grammar-handout.css");
  s = s.replace(/见 grammar-handout-print\.css/g, "见 shared/grammar-handout-print.css");
  return s;
}

fs.mkdirSync(SHARED, { recursive: true });

for (const name of MOVE) {
  const from = path.join(ROOT, name);
  const to = path.join(SHARED, name);
  if (!fs.existsSync(from)) {
    if (fs.existsSync(to)) continue;
    console.warn("skip missing:", name);
    continue;
  }
  if (fs.existsSync(to)) fs.unlinkSync(to);
  fs.renameSync(from, to);
  console.log("moved", name);
}

for (const name of DELETE) {
  const p = path.join(ROOT, name);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log("deleted", name);
  }
}

let patched = 0;
for (const fp of walk(ROOT)) {
  if (fp.startsWith(SHARED + path.sep) && fp.endsWith(".css")) continue;
  const raw = fs.readFileSync(fp, "utf8");
  const next = patchContent(raw);
  if (next !== raw) {
    fs.writeFileSync(fp, next, "utf8");
    patched++;
  }
}

console.log("patched files:", patched);
console.log("shared:", fs.readdirSync(SHARED).sort().join(", "));
