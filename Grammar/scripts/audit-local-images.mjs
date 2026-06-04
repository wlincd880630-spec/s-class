#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_RE = /\.(png|jpe?g|webp|gif|svg|ico|bmp|avif)(\?[^"'\s)]*)?/i;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walkHtml(p, acc);
    } else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function lessonFrom(fp) {
  const top = path.relative(ROOT, fp).split(path.sep)[0];
  return /^L\d{2}/.test(top) || top.startsWith("L00-") ? top : null;
}

function resolveSrc(fp, src) {
  if (!src || /^data:/i.test(src) || /^https?:\/\//i.test(src)) return { abs: null, remote: !!src };
  const clean = src.split("?")[0];
  const lesson = lessonFrom(fp);
  if (!lesson) return { abs: path.normalize(path.join(path.dirname(fp), clean)), remote: false };
  if (clean.startsWith("assets/") || clean.startsWith("asset/") || clean.startsWith("images/")) {
    return { abs: path.normalize(path.join(ROOT, lesson, clean)), remote: false };
  }
  return { abs: path.normalize(path.join(path.dirname(fp), clean)), remote: false };
}

const htmls = walkHtml(ROOT);
const missing = [];
const remote = [];
const cos = [];

for (const fp of htmls) {
  const c = fs.readFileSync(fp, "utf8");
  if (/cos\.ap-chengdu/.test(c)) cos.push(path.relative(ROOT, fp));
  const patterns = [
    /src\s*=\s*["']([^"']+)["']/gi,
    /poster\s*=\s*["']([^"']+)["']/gi,
    /url\s*\(\s*["']?([^"')]+)["']?\s*\)/gi,
    /image:\s*["']([^"']+)["']/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(c)) !== null) {
      const src = m[1].trim();
      if (!IMG_RE.test(src)) continue;
      if (/^https?:\/\//i.test(src)) {
        if (!/fonts\.googleapis|cdn\.jsdelivr/i.test(src)) remote.push({ file: path.relative(ROOT, fp), src: src.slice(0, 90) });
        continue;
      }
      const { abs } = resolveSrc(fp, src);
      if (abs && !fs.existsSync(abs)) {
        missing.push({ file: path.relative(ROOT, fp), src: src.slice(0, 90), abs: path.relative(ROOT, abs) });
      }
    }
  }
}

const um = new Map();
for (const x of missing) um.set(x.abs, x);
const ur = new Map();
for (const x of remote) ur.set(x.file + x.src, x);

console.log("HTML 总数:", htmls.length);
console.log("仍含 COS:", cos.length, cos.join(", ") || "(无)");
console.log("远程 https 图片:", ur.size);
console.log("本地路径但文件缺失（唯一）:", um.size);
[...ur.values()].slice(0, 10).forEach((x) => console.log("  remote", x.file, x.src));
[...um.values()].slice(0, 30).forEach((x) => console.log("  missing", x.abs));
