#!/usr/bin/env node
/**
 * 将根目录 assets/ 中的共享资源复制到各课程文件夹的 assets/，
 * 并把 ../assets/ 引用改为 assets/（L13-定语从句 Demo 改为 ../L13/assets/）。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ROOT_ASSETS = path.join(ROOT, "assets");

const LESSON_DIR_RE = /^(L\d{2}(?:-[^\\/]+)?|L00-[^\\/]+)$/;

function walkFiles(dir, acc = [], extRe = /\.(html|js|css|json)$/i) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === "node_modules" || name === ".git" || name === "scripts") continue;
      walkFiles(p, acc, extRe);
    } else if (extRe.test(name)) acc.push(p);
  }
  return acc;
}

function lessonFromFile(filePath) {
  const rel = path.relative(ROOT, filePath);
  const top = rel.split(path.sep)[0];
  return LESSON_DIR_RE.test(top) ? top : null;
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest) || fs.statSync(src).mtimeMs > fs.statSync(dest).mtimeMs) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

function copyTree(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return 0;
  let n = 0;
  for (const name of fs.readdirSync(srcDir)) {
    const s = path.join(srcDir, name);
    const d = path.join(destDir, name);
    if (fs.statSync(s).isDirectory()) n += copyTree(s, d);
    else if (copyFile(s, d)) n++;
  }
  return n;
}

/** @type {Map<string, Set<string>>} lesson -> relative paths under root assets */
const needed = new Map();

const refRe = /(?:\.\.\/)+assets\/([^\s"'`)]+)/g;

for (const fp of walkFiles(ROOT)) {
  const lesson = lessonFromFile(fp);
  if (!lesson) continue;
  const c = fs.readFileSync(fp, "utf8");
  let m;
  while ((m = refRe.exec(c)) !== null) {
    const rel = m[1].replace(/\\/g, "/");
    if (!needed.has(lesson)) needed.set(lesson, new Set());
    needed.get(lesson).add(rel);
  }
}

// L02 专用：复习配图（当前 HTML 未引用，仍归档到 L02）
const reviewDir = path.join(ROOT_ASSETS, "review-l01-l02-tenses");
if (fs.existsSync(reviewDir)) {
  if (!needed.has("L02")) needed.set("L02", new Set());
  for (const name of fs.readdirSync(reviewDir)) {
    if (/\.(png|jpe?g|webp)$/i.test(name)) {
      needed.get("L02").add(`review-l01-l02-tenses/${name}`);
    }
  }
}

let copied = 0;
for (const [lesson, files] of needed) {
  const destAssets = path.join(ROOT, lesson, "assets");
  for (const rel of files) {
    const src = path.join(ROOT_ASSETS, rel);
    const dest = path.join(destAssets, rel);
    if (!fs.existsSync(src)) {
      console.warn("WARN missing in root assets:", rel, "for", lesson);
      continue;
    }
    if (fs.statSync(src).isDirectory()) copied += copyTree(src, dest);
    else if (copyFile(src, dest)) copied++;
  }
}

// 路径替换
let patchedFiles = 0;
for (const fp of walkFiles(ROOT)) {
  const lesson = lessonFromFile(fp);
  if (!lesson) continue;
  let c = fs.readFileSync(fp, "utf8");
  let nc = c;

  if (lesson === "L13-定语从句") {
    nc = nc.replace(/\.\.\/assets\//g, "../L13/assets/");
  } else {
    nc = nc.replace(/\.\.\/\.\.\/assets\//g, "../assets/");
    nc = nc.replace(/\.\.\/assets\//g, "assets/");
  }

  if (nc !== c) {
    fs.writeFileSync(fp, nc, "utf8");
    patchedFiles++;
  }
}

// 修正 L06 manifest 中错误的 ../assets/tts-mp3 前缀
const l06mf = path.join(ROOT, "L06", "assets", "tts-mp3", "l06-page02", "manifest.json");
if (fs.existsSync(l06mf)) {
  let j = fs.readFileSync(l06mf, "utf8");
  const nj = j.replace(/"\.\.\/assets\/tts-mp3\//g, '"assets/tts-mp3/');
  if (nj !== j) {
    fs.writeFileSync(l06mf, nj, "utf8");
    console.log("fixed L06 l06-page02 manifest.json paths");
  }
}

// 删除根 assets（仅当为空或已成功复制）
function rmEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) rmEmpty(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

if (fs.existsSync(ROOT_ASSETS)) {
  rmEmpty(ROOT_ASSETS);
  console.log("removed root assets/");
}

console.log("lessons updated:", needed.size);
console.log("files copied:", copied);
console.log("content files patched:", patchedFiles);
for (const [lesson, files] of [...needed.entries()].sort()) {
  console.log(`  ${lesson}: ${files.size} asset(s)`);
}
