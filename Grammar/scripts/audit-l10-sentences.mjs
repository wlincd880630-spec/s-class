#!/usr/bin/env node
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const L10 = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "L10");
const mp3Dir = path.join(L10, "assets", "tts-mp3");

function sha20(t) {
  return crypto.createHash("sha1").update(String(t), "utf8").digest("hex").slice(0, 20);
}
function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

const sentences = new Set();
for (const name of fs.readdirSync(L10)) {
  if (!name.endsWith(".html")) continue;
  const c = fs.readFileSync(path.join(L10, name), "utf8");
  for (const m of c.matchAll(/sentence\s*:\s*"((?:\\.|[^"\\])*)"/g)) {
    try {
      sentences.add(norm(JSON.parse('"' + m[1] + '"')));
    } catch {
      sentences.add(norm(m[1]));
    }
  }
  for (const m of c.matchAll(/(?:en|text|line|stem)\s*:\s*"((?:\\.|[^"\\])*)"/g)) {
    const t = m[1];
    if (/^[A-Za-z]/.test(t) && t.length > 8) {
      try {
        sentences.add(norm(JSON.parse('"' + t + '"')));
      } catch {
        sentences.add(norm(t));
      }
    }
  }
}

let miss = 0;
const missing = [];
for (const s of sentences) {
  const fn = sha20(s) + ".mp3";
  if (!fs.existsSync(path.join(mp3Dir, fn))) {
    miss++;
    missing.push({ s, fn });
  }
}
console.log("L10 内嵌 sentence/en 等英文句:", sentences.size);
console.log("缺失 sha20 MP3:", miss);
missing.slice(0, 25).forEach((x) => console.log(" ", x.fn, x.s.slice(0, 75)));
