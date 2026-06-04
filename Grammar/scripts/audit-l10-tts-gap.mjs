#!/usr/bin/env node
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const L10 = path.join(ROOT, "L10");
const mp3Dir = path.join(L10, "assets", "tts-mp3");

function sha20(t) {
  return crypto.createHash("sha1").update(String(t), "utf8").digest("hex").slice(0, 20);
}
function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

const manifest = {};
const mf = fs.readFileSync(path.join(L10, "assets", "l10-tts-manifest.js"), "utf8");
for (const m of mf.matchAll(/"((?:\\.|[^"\\])*)"\s*:\s*"([^"]+)"/g)) {
  manifest[norm(JSON.parse('"' + m[1].replace(/\\"/g, '"') + '"'))] = m[2];
}
// fix parse - use JSON
const block = mf.match(/\{([\s\S]*)\}/)[1];
for (const m of block.matchAll(/("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g)) {
  manifest[norm(JSON.parse(m[1]))] = JSON.parse(m[2]);
}

const texts = new Set();
for (const name of fs.readdirSync(L10)) {
  if (!name.endsWith(".html")) continue;
  const c = fs.readFileSync(path.join(L10, name), "utf8");
  for (const m of c.matchAll(/azureSpeak(?:EnglishSlow)?\s*\(\s*([^,)]+)/g)) {
    const arg = m[1].trim();
    if (arg.startsWith('"') || arg.startsWith("'")) {
      try {
        texts.add(norm(JSON.parse(arg.replace(/^'/, '"').replace(/'$/, '"'))));
      } catch {}
    }
  }
  for (const m of c.matchAll(/speakText\s*\(\s*["']([^"']{3,})["']/g)) texts.add(norm(m[1]));
  for (const m of c.matchAll(/data-tts="([^"]+)"/g)) texts.add(norm(m[1]));
}

const missingFile = [];
const missingManifest = [];
for (const t of texts) {
  if (!t || t.length < 2) continue;
  const fn = sha20(t) + ".mp3";
  const abs = path.join(mp3Dir, fn);
  if (!fs.existsSync(abs)) missingFile.push({ t, fn });
  if (!manifest[t]) missingManifest.push({ t, fn });
}

console.log("L10 页面提取朗读句:", texts.size);
console.log("manifest 条数:", Object.keys(manifest).length);
console.log("无对应 MP3 文件:", missingFile.length);
missingFile.slice(0, 30).forEach((x) => console.log("  NO FILE", x.fn, x.t.slice(0, 70)));
if (missingFile.length > 30) console.log("  ... +" + (missingFile.length - 30));
console.log("有 MP3 但未写入 manifest:", missingManifest.length);
missingManifest.slice(0, 20).forEach((x) => console.log("  NO MANIFEST", x.fn, x.t.slice(0, 70)));
