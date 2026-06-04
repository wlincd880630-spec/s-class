#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const RE =
  /<script>\s*\/\* inlined: assets\/lesson-tts-bootstrap\.js \*\/[\s\S]*?\}\)\(\);\s*\n<\/script>/g;
const REPL = '  <script src="assets/lesson-tts-bootstrap.js"></script>';

function walk(d, acc = []) {
  for (const name of fs.readdirSync(d)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(d, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let n = 0;
for (const fp of walk(ROOT)) {
  let c = fs.readFileSync(fp, "utf8");
  if (!c.includes("inlined: assets/lesson-tts-bootstrap")) continue;
  const nc = c.replace(RE, REPL);
  if (nc !== c) {
    fs.writeFileSync(fp, nc, "utf8");
    console.log(path.relative(ROOT, fp));
    n++;
  }
}
console.log("replaced:", n);
