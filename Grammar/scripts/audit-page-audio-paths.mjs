#!/usr/bin/env node
/** 扫描 HTML/JS 内引用的本地 mp3 是否存在于磁盘 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_RE = /^(L\d{2}(?:-[^/]+)?|L00-[^/]+)$/;
const missing = [];

function lessonOf(fp) {
  return path.relative(ROOT, fp).split(path.sep)[0];
}

function resolveMp3(htmlPath, rel) {
  const lesson = lessonOf(htmlPath);
  const u = rel.replace(/^\.\//, "");
  if (lesson && u.startsWith("assets/")) return path.join(ROOT, lesson, u);
  return path.normalize(path.join(path.dirname(htmlPath), u));
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (["node_modules", ".git", "scripts"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(html|js|json)$/i.test(name)) scan(p);
  }
}

function scan(fp) {
  const c = fs.readFileSync(fp, "utf8");
  const relFile = path.relative(ROOT, fp);
  const patterns = [
    /assets\/(?:tts-mp3|audio)[^"'\s)]+\.mp3/gi,
    /["']([^"']+\.mp3)["']/g,
    /`([^`]+\.mp3)`/g,
  ];
  const seen = new Set();
  for (const re of patterns) {
    let m;
    while ((m = re.exec(c))) {
      let raw = m[1] || m[0];
      if (!raw.endsWith(".mp3")) continue;
      if (raw.startsWith("http")) continue;
      if (raw.includes("${")) continue;
      raw = raw.replace(/\$\{[^}]+\}/g, "").replace(/\+/g, "");
      if (!/assets\//.test(raw) && !/^[\w-]+\.mp3$/i.test(raw)) continue;
      let abs;
      if (/^assets\//.test(raw)) abs = resolveMp3(fp, raw);
      else if (/^[\w-]+\.mp3$/i.test(raw) && /l07-page01|L07_LOCAL_TTS/i.test(c)) {
        abs = path.join(ROOT, "L07", "assets", "tts-mp3", "l07-page01", raw);
      } else continue;
      const key = abs;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!fs.existsSync(abs) || fs.statSync(abs).size < 80) {
        missing.push({ file: relFile, mp3: raw, abs: path.relative(ROOT, abs) });
      }
    }
  }
}

walk(ROOT);
console.log("缺失 MP3:", missing.length);
const byLesson = new Map();
for (const x of missing) {
  const L = x.file.split(/[/\\]/)[0];
  byLesson.set(L, (byLesson.get(L) || 0) + 1);
}
for (const [k, v] of [...byLesson.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(" ", k, v);
}
missing.slice(0, 40).forEach((x) => console.log(" ", x.file, "→", x.mp3));
if (missing.length > 40) console.log(" ...", missing.length - 40, "more");
