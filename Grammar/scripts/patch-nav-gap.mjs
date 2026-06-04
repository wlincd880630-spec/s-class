#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPLACEMENTS = [
  ["--lesson-pager-gap: 4.35rem", "--lesson-pager-gap: 2.35rem"],
  ["--lesson-pager-gap:4.35rem", "--lesson-pager-gap:2.35rem"],
  ["var(--lesson-pager-gap, 4.35rem)", "var(--lesson-pager-gap, 2.35rem)"],
  ["--lesson-pager-gap: 2.65rem", "--lesson-pager-gap: 2.35rem"],
  ["var(--lesson-pager-gap, 3.65rem)", "var(--lesson-pager-gap, 2.35rem)"],
  ["--grammar-pager-gap: 2.75rem", "--grammar-pager-gap: 2.35rem"],
  ["--grammar-pager-logo-slot: clamp(9.5rem, 38vw, 16.5rem)", "--grammar-pager-logo-slot: clamp(4.25rem, 17vw, 6.5rem)"],
  ["--grammar-pager-logo-slot: clamp(4.25rem, 18vw, 7.25rem)", "--grammar-pager-logo-slot: clamp(4.25rem, 17vw, 6.5rem)"],
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === "scripts") continue;
      walk(fp, out);
    } else if (/\.(html|css)$/i.test(name)) {
      out.push(fp);
    }
  }
  return out;
}

let n = 0;
for (const fp of walk(ROOT)) {
  let src = fs.readFileSync(fp, "utf8");
  let next = src;
  for (const [from, to] of REPLACEMENTS) {
    next = next.split(from).join(to);
  }
  if (next !== src) {
    fs.writeFileSync(fp, next, "utf8");
    n++;
  }
}
console.log("patched", n, "files");
