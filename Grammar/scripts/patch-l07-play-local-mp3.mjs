#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const L07 = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "L07");
const TAG = '  <script src="../shared/play-local-mp3.js"></script>\n';
const NEEDLE = '  <script src="assets/lesson-tts-l07-local.js"></script>';
const REPL = TAG + NEEDLE;

let n = 0;
for (const name of fs.readdirSync(L07)) {
  if (!name.endsWith(".html")) continue;
  const fp = path.join(L07, name);
  let c = fs.readFileSync(fp, "utf8");
  if (!c.includes(NEEDLE) || c.includes("play-local-mp3.js")) continue;
  fs.writeFileSync(fp, c.replace(NEEDLE, REPL), "utf8");
  n++;
  console.log("patched", name);
}
console.log("done", n);
