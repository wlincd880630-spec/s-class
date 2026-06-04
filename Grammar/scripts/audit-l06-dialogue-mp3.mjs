#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  { html: "L06/lesson06-page02-cancant.html", sub: "l06-page02", pattern: (id, i) => `${id}-${String(i).padStart(2, "0")}.mp3` },
  { html: "L06/lesson06-page03-musthaveto.html", sub: "l06-page03", eng: true, cn: true },
  { html: "L06/lesson06-page04-mustnt-donthaveto.html", sub: "l06-page04", numbered: true },
];

const missing = [];

for (const p of pages) {
  const fp = path.join(ROOT, p.html);
  const c = fs.readFileSync(fp, "utf8");
  const dir = path.join(ROOT, "L06", "assets", "tts-mp3", p.sub);
  const need = new Set();

  if (p.pattern) {
    for (const block of c.matchAll(/id:\s*"([^"]+)"[\s\S]*?lines:\s*\[([\s\S]*?)\]/g)) {
      const id = block[1];
      const lines = block[2].match(/"[^"]+"/g) || [];
      lines.forEach((_, i) => need.add(p.pattern(id, i + 1)));
    }
  }
  if (p.eng) {
    const engCount = (c.match(/eng-\d+/g) || []).length;
    for (let i = 1; i <= 20; i++) need.add(`eng-${String(i).padStart(2, "0")}.mp3`);
  }
  if (p.cn) {
    for (let i = 1; i <= 20; i++) need.add(`cn-${String(i).padStart(2, "0")}.mp3`);
  }
  if (p.numbered) {
    for (let i = 1; i <= 30; i++) need.add(`${String(i).padStart(2, "0")}.mp3`);
  }

  for (const name of need) {
    const abs = path.join(dir, name);
    if (!fs.existsSync(abs) || fs.statSync(abs).size < 80) {
      missing.push({ page: p.html, sub: p.sub, name });
    }
  }
}

console.log("L06 对话 MP3 缺失:", missing.length);
missing.forEach((x) => console.log(x.sub, x.name));
