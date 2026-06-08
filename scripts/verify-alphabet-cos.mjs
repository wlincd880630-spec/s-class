#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ALPHABET = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "Primary", "Alphabet");
const cos = /cos\.ap-chengdu\.myqcloud\.com/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(html|js)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const issues = [];
for (const f of walk(ALPHABET)) {
  const s = fs.readFileSync(f, "utf8");
  const rel = path.relative(ALPHABET, f).replace(/\\/g, "/");
  for (const m of s.matchAll(/['"`]([^'"`]*\.(png|jpe?g|gif|webp|mp3|mp4|wav|ogg|m4a|svg))['"`]/gi)) {
    const u = m[1];
    if (u.includes("${") || u.startsWith("data:")) continue;
    if (!cos.test(u) && !u.startsWith("http")) {
      if (/assets\/|^\.\/|^\.\.\//.test(u)) issues.push(`${rel}: ${u}`);
    }
  }
}
if (issues.length) {
  console.log("Local media paths still found:\n" + issues.join("\n"));
  process.exit(1);
}
console.log("OK: all media references use COS or are dynamic templates.");
