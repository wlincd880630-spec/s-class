#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const refRe = /assets\/([a-zA-Z0-9_./-]+\.(?:js|css))/g;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (!["node_modules", ".git", "scripts"].includes(name)) walkHtml(p, acc);
    } else if (/\.(html|js|css)$/.test(name)) acc.push(p);
  }
  return acc;
}

const missing = [];
for (const fp of walkHtml(ROOT)) {
  const rel = path.relative(ROOT, fp);
  const top = rel.split(path.sep)[0];
  if (!/^L\d{2}|^L00-/.test(top)) continue;
  const c = fs.readFileSync(fp, "utf8");
  let m;
  while ((m = refRe.exec(c)) !== null) {
    const assetRel = m[1];
    const abs = path.join(ROOT, top, "assets", assetRel);
    if (!fs.existsSync(abs)) {
      missing.push({ lesson: top, file: rel, asset: assetRel });
    }
  }
}

const uniq = new Map();
for (const x of missing) uniq.set(`${x.lesson}|${x.asset}`, x);
console.log("missing local assets:", uniq.size);
[...uniq.values()].slice(0, 40).forEach((x) => console.log(`  ${x.lesson}/assets/${x.asset}`));
