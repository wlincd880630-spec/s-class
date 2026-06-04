#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SNIP =
  '  <script src="../shared/play-local-mp3.js"></script>\n  <script src="../shared/lesson-speak-local-only.js"></script>\n';

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkHtml(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let n = 0;
for (const fp of walkHtml(ROOT)) {
  let c = fs.readFileSync(fp, "utf8");
  if (!/handout-tts\.js|l08-handout-tts|l09-handout-tts/i.test(c)) continue;
  if (c.includes("play-local-mp3.js")) continue;
  const needle = '<script src="assets/lesson-tts-bootstrap.js"></script>';
  if (!c.includes(needle)) continue;
  c = c.replace(needle, SNIP + needle);
  fs.writeFileSync(fp, c, "utf8");
  n++;
  console.log(path.relative(ROOT, fp));
}
console.log("patched", n);
