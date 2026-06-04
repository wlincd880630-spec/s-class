#!/usr/bin/env node
/** 检查 lesson-pager 中 href 指向的 html 是否存在 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const issues = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (["node_modules", ".git", "scripts", "handout2"].includes(name)) continue;
    const p = path.join(dir, name);
    if (!fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) check(p);
    else walk(p);
  }
}

function walkDir(d) {
  for (const name of fs.readdirSync(d)) {
    if (["node_modules", ".git", "scripts"].includes(name)) continue;
    const p = path.join(d, name);
    if (fs.statSync(p).isDirectory()) walkDir(p);
    else if (name.endsWith(".html")) check(p);
  }
}

function check(fp) {
  const c = fs.readFileSync(fp, "utf8");
  if (!/lesson-pager/i.test(c)) return;
  const rel = path.relative(ROOT, fp);
  for (const m of c.matchAll(/<a[^>]*class="[^"]*pager-(?:prev|next)[^"]*"[^>]*href=["']([^"'#]+)["']/gi)) {
    const href = m[1].trim();
    if (!href.endsWith(".html")) continue;
    const target = path.normalize(path.join(path.dirname(fp), href));
    if (!fs.existsSync(target)) issues.push({ from: rel, href });
  }
  for (const m of c.matchAll(/href=["']([^"'#]+)["'][^>]*class="[^"]*pager-(?:prev|next)/gi)) {
    const href = m[1].trim();
    if (!href.endsWith(".html")) continue;
    const target = path.normalize(path.join(path.dirname(fp), href));
    if (!fs.existsSync(target)) {
      if (!issues.some((x) => x.from === rel && x.href === href)) issues.push({ from: rel, href });
    }
  }
}

walkDir(ROOT);
console.log("分页链接断裂:", issues.length);
for (const x of issues) console.log(" ", x.from, "→", x.href);
if (issues.length) process.exitCode = 1;
