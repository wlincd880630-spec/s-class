#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const RE = /<nav class="lesson-pager is-file-nav"[\s\S]*?<\/nav>/g;

function walk(d, a = []) {
  for (const n of fs.readdirSync(d)) {
    const p = path.join(d, n);
    if (fs.statSync(p).isDirectory()) {
      if (!["node_modules", ".git", "scripts"].includes(n)) walk(p, a);
    } else if (/\.html$/i.test(n)) a.push(p);
  }
  return a;
}

let n = 0;
for (const fp of walk(ROOT)) {
  let h = fs.readFileSync(fp, "utf8");
  const m = [...h.matchAll(RE)];
  if (m.length <= 1) continue;
  for (let i = 1; i < m.length; i++) h = h.replace(m[i][0], "");
  fs.writeFileSync(fp, h, "utf8");
  n++;
  console.log("dedupe", path.relative(ROOT, fp), m.length);
}
console.log("done", n);
