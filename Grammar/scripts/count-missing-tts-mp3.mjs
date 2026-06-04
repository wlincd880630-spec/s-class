#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/tts-manifest\.js$/i.test(name)) acc.push(p);
  }
}

const files = [];
walk(ROOT, files);
let total = 0;
let missing = 0;
const byLesson = new Map();
const samples = [];

for (const fp of files) {
  const c = fs.readFileSync(fp, "utf8");
  const re = /("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g;
  let m;
  while ((m = re.exec(c))) {
    let text;
    let rel;
    try {
      text = JSON.parse(m[1]);
      rel = JSON.parse(m[2]);
    } catch {
      continue;
    }
    if (!/assets\/tts-mp3\//.test(rel)) continue;
    total++;
    const lesson = path.relative(ROOT, fp).split(path.sep)[0];
    const abs = path.join(ROOT, lesson, rel.replace(/^\.\//, ""));
    const ok = fs.existsSync(abs) && fs.statSync(abs).size > 80;
    if (!ok) {
      missing++;
      byLesson.set(lesson, (byLesson.get(lesson) || 0) + 1);
      if (samples.length < 15) samples.push({ lesson, text: text.slice(0, 80), rel });
    }
  }
}

console.log("manifest 文件:", files.length);
console.log("本地 mp3 条目:", total);
console.log("缺失/损坏:", missing);
if (byLesson.size) {
  console.log("\n按课缺失:");
  [...byLesson.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(" ", k, v));
}
if (samples.length) {
  console.log("\n样例:");
  samples.forEach((s) => console.log(" ", s.lesson, "→", s.text));
}
