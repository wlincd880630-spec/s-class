#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BAD = /"\s*<link rel="stylesheet" href="[^"]*lesson-image-lightbox/;

function walk(dir, acc = []) {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) {
      if (["node_modules", ".git", "scripts"].includes(n)) continue;
      walk(p, acc);
    } else if (n.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const issues = [];
for (const fp of walk(ROOT)) {
  const c = fs.readFileSync(fp, "utf8");
  if (BAD.test(c)) issues.push(path.relative(ROOT, fp));
}
if (issues.length) {
  console.log("BROKEN lightbox in JS strings:", issues.length);
  issues.forEach((x) => console.log(" ", x));
  process.exit(1);
}
console.log("OK: no broken lightbox injections in", walk(ROOT).length, "html files");
