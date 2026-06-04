#!/usr/bin/env node
/**
 * 从全部课程 HTML 移除 course-guard.js 引用
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRS = new Set(["node_modules", ".git", "handout2", "scripts"]);
const TAG_RE = /\s*<script[^>]+course-guard\.js[^>]*>\s*<\/script>\s*\n?/gi;

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (/\.html?$/i.test(name)) acc.push(p);
  }
  return acc;
}

let n = 0;
for (const fp of walk(ROOT)) {
  const raw = fs.readFileSync(fp, "utf8");
  if (!/course-guard\.js/i.test(raw)) continue;
  const next = raw.replace(TAG_RE, "");
  if (next !== raw) {
    fs.writeFileSync(fp, next, "utf8");
    n += 1;
  }
}
console.log("removed from", n, "files");
