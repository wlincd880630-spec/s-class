#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_RE = /^(L\d{2}(?:-[^/]+)?|L00-[^/]+)$/;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (!["node_modules", ".git", "scripts"].includes(name)) walkHtml(p, acc);
    } else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function resolve(htmlPath, url) {
  const u = url.split("?")[0];
  if (/^https?:\/\//i.test(u)) return { remote: true };
  const top = path.relative(ROOT, htmlPath).split(path.sep)[0];
  let abs;
  if (u.startsWith("../")) abs = path.normalize(path.join(path.dirname(htmlPath), u));
  else if (LESSON_RE.test(top) && u.startsWith("assets/")) abs = path.join(ROOT, top, u);
  else abs = path.normalize(path.join(path.dirname(htmlPath), u));
  return { remote: false, abs };
}

const missing = [];
for (const fp of walkHtml(ROOT)) {
  const rel = path.relative(ROOT, fp);
  const c = fs.readFileSync(fp, "utf8");
  for (const m of c.matchAll(/<script[^>]*\ssrc=["']([^"']+)["']/gi)) {
    const url = m[1];
    if (url.startsWith("http")) continue; // CDN listed separately
    const r = resolve(fp, url);
    if (!r.remote && !fs.existsSync(r.abs)) missing.push({ html: rel, script: url, abs: path.relative(ROOT, r.abs) });
  }
  for (const m of c.matchAll(/<link[^>]*\shref=["']([^"']+\.css)["']/gi)) {
    const url = m[1];
    if (url.startsWith("http")) continue;
    const r = resolve(fp, url);
    if (!r.remote && !fs.existsSync(r.abs)) missing.push({ html: rel, script: url, abs: path.relative(ROOT, r.abs) });
  }
}

const uniq = new Map();
for (const x of missing) uniq.set(x.abs + "|" + x.html, x);
console.log("HTML 引用的本地 script/css 缺失:", uniq.size);
[...uniq.values()].forEach((x) => console.log(" ", x.html, "->", x.script, "\n    ", x.abs));
