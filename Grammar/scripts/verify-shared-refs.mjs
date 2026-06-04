#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (["node_modules", ".git", "scripts"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (/\.html$/i.test(name)) acc.push(p);
  }
  return acc;
}

const missing = [];
for (const fp of walk(ROOT)) {
  const c = fs.readFileSync(fp, "utf8");
  for (const m of c.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const url = m[1].split("?")[0];
    if (!url.includes("shared/grammar-") && !/^grammar-/.test(url)) continue;
    if (/^https?:/i.test(url)) continue;
    const abs = url.startsWith("shared/")
      ? path.join(ROOT, url)
      : path.normalize(path.join(path.dirname(fp), url));
    if (!fs.existsSync(abs)) missing.push({ file: path.relative(ROOT, fp), url });
  }
}

console.log("shared grammar refs missing:", missing.length);
missing.slice(0, 20).forEach((x) => console.log(" ", x.url, "<-", x.file));
process.exit(missing.length ? 1 : 0);
