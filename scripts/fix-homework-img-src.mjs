#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "Primary");
const BAD =
  /src="https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Primary\/[^"]+-homework\/\$\{IMG_BASE\}\$\{([^}]+)\}\.png"/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/抄写作业.*\.html$/i.test(e.name)) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, "utf8");
  const after = before.replace(BAD, 'src="${IMG_BASE}${$1}.png"');
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log("fixed", path.relative(ROOT, file));
  }
}
console.log(`Done: ${changed} files`);
