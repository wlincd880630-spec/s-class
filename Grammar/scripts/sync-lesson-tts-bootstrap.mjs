#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(ROOT, "shared", "lesson-tts-bootstrap.js"), "utf8");
let n = 0;
for (const name of fs.readdirSync(ROOT)) {
  const fp = path.join(ROOT, name, "assets", "lesson-tts-bootstrap.js");
  if (!fs.existsSync(fp)) continue;
  if (fs.readFileSync(fp, "utf8") !== src) {
    fs.writeFileSync(fp, src, "utf8");
    n++;
  }
}
console.log("synced", n, "bootstrap files");
