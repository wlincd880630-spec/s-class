#!/usr/bin/env node
/** 检查各课 index.html 中 href 是否指向存在的 html */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const issues = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (["node_modules", ".git", "scripts", "handout2"].includes(name)) continue;
    const p = path.join(dir, name);
    if (!fs.statSync(p).isDirectory()) continue;
    const idx = path.join(p, "index.html");
    if (fs.existsSync(idx)) checkIndex(idx);
    walk(p);
  }
}

function checkIndex(fp) {
  const c = fs.readFileSync(fp, "utf8");
  const relDir = path.relative(ROOT, path.dirname(fp));
  for (const m of c.matchAll(/<a\s+[^>]*href=["']([^"'#?]+)["']/gi)) {
    let href = m[1].trim();
    if (!href.endsWith(".html")) continue;
    const target = path.normalize(path.join(path.dirname(fp), href));
    if (!fs.existsSync(target)) {
      issues.push({ index: relDir + "/index.html", href, msg: "目标不存在" });
    }
  }
  // 序号连续性（g-index num）
  const nums = [...c.matchAll(/<span class="num">(\d+)<\/span>/g)].map((x) => parseInt(x[1], 10));
  if (nums.length) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== i + 1) {
        issues.push({ index: relDir + "/index.html", href: "", msg: `序号断裂：第${i + 1}项为 ${nums[i]}` });
        break;
      }
    }
  }
}

walk(ROOT);
console.log("index 链接检查:", issues.length ? "" : "通过");
for (const x of issues) console.log(" ", x.index, "→", x.href || x.msg, x.msg && x.href ? x.msg : "");
if (issues.length) process.exitCode = 1;
