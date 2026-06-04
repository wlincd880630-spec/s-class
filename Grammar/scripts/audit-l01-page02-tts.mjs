#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(ROOT, "L01", "lesson01-page02-concept-map.html"), "utf8");

const cards = [...html.matchAll(/text:\s*"((?:\\.|[^"\\])*)"/g)].map((m) =>
  JSON.parse('"' + m[1] + '"')
);
const finalM = html.match(/const FINAL_LINE =\s*\n\s*"((?:\\.|[^"\\])*)"/);
const finalLine = finalM ? JSON.parse('"' + finalM[1] + '"') : "";

const manifestBlock = html.match(/window\.__LESSON_TTS_MANIFEST = \{([\s\S]*?)\};/);
const manifest = {};
if (manifestBlock) {
  const re = /"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(manifestBlock[1]))) {
    manifest[JSON.parse('"' + m[1] + '"')] = JSON.parse('"' + m[2] + '"');
  }
}

const cardTexts = cards.filter((t) => t.length > 10 && /^[A-Z]/.test(t));
console.log("CARDS to speak:", cardTexts.length);
for (const t of cardTexts) {
  const rel = manifest[t];
  const mp3 = rel ? path.join(ROOT, "L01", rel) : null;
  const ok = mp3 && fs.existsSync(mp3) && fs.statSync(mp3).size > 80;
  console.log(ok ? "OK" : "MISS", t.slice(0, 55));
}
console.log("\nFINAL_LINE:", finalLine.slice(0, 60));
const fr = manifest[finalLine];
console.log("FINAL in manifest:", !!fr, fr || "");
if (fr) {
  const fp = path.join(ROOT, "L01", fr);
  console.log("FINAL mp3 exists:", fs.existsSync(fp), fp);
}
