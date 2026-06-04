#!/usr/bin/env node
/**
 * 审计 HTML 引用的 manifest JS 是否仍含相对媒体路径。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const GRAMMAR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA_IN_JS =
  /["']((?!https?:\/\/)(?:(?:\.\.\/)*)(?:assets|asset|images)\/[^"']+\.(?:mp3|png|jpe?g|webp|gif|mp4|webm))["']/gi;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (["node_modules", ".git", "scripts"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkHtml(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const htmls = walkHtml(GRAMMAR);
const seen = new Set();
const refs = [];

for (const html of htmls) {
  const c = fs.readFileSync(html, "utf8");
  const dir = path.dirname(html);
  for (const m of c.matchAll(/<script[^>]+src=["']([^"']+\.js[^"']*)["']/gi)) {
    let src = m[1].split("?")[0];
    if (/^https?:\/\//.test(src)) continue;
    const abs = path.normalize(path.join(dir, src));
    if (!abs.startsWith(GRAMMAR) || !fs.existsSync(abs)) continue;
    const key = abs.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    refs.push({ html: path.relative(GRAMMAR, html).replace(/\\/g, "/"), js: path.relative(GRAMMAR, abs).replace(/\\/g, "/"), abs });
  }
}

const relIssues = [];
const ok = [];

for (const r of refs) {
  const c = fs.readFileSync(r.abs, "utf8");
  const hits = [];
  MEDIA_IN_JS.lastIndex = 0;
  let m;
  while ((m = MEDIA_IN_JS.exec(c)) !== null) hits.push(m[1]);
  if (hits.length) relIssues.push({ ...r, hits: hits.slice(0, 5), total: hits.length });
  else ok.push(r.js);
}

console.log("=== HTML 引用的 manifest/JS 审计 ===");
console.log("引用 JS 文件数:", refs.length);
console.log("含相对媒体路径:", relIssues.length);
console.log("已全 COS:", ok.length);

if (relIssues.length) {
  console.log("\n--- 需修复 ---");
  for (const x of relIssues) {
    console.log(`\n${x.js} (被 ${x.html} 引用, ${x.total} 处)`);
    x.hits.forEach((h) => console.log("  ", h));
  }
  process.exit(1);
}

console.log("\n全部 manifest JS 媒体路径均为 COS 或无可媒体路径。");
