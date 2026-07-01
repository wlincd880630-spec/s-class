#!/usr/bin/env node
/**
 * 将讲义 manifest 中的 assets/tts-mp3/… 相对路径改为 COS 绝对 URL（便于在线播放）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/";

function lessonFolderFromPath(fp) {
  const rel = path.relative(ROOT, fp).replace(/\\/g, "/");
  return rel.split("/")[0];
}

function cosifyUrl(lesson, val) {
  let v = String(val).trim();
  v = v.replace(/\/assets\/assets\/tts-mp3\//g, "/assets/tts-mp3/");
  if (/^https?:\/\//i.test(v)) return v;
  const m = v.match(/^(?:\.\.\/)*assets\/tts-mp3\/([^"'\s]+\.mp3)$/i);
  if (!m) return v;
  return COS + lesson + "/assets/tts-mp3/" + m[1];
}

function patchManifestText(text, lesson) {
  return text.replace(/("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g, (full, kPart, vPart) => {
    try {
      const val = JSON.parse(vPart);
      const next = cosifyUrl(lesson, val);
      if (next === val) return full;
      return kPart + ": " + JSON.stringify(next);
    } catch {
      return full;
    }
  });
}

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (/manifest\.js$/i.test(name) || /handout-tts-manifest\.js$/i.test(name) || /embed\.js$/i.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

let n = 0;
for (const fp of walk(ROOT)) {
  const lesson = lessonFolderFromPath(fp);
  const raw = fs.readFileSync(fp, "utf8");
  const fixed = patchManifestText(raw, lesson);
  if (fixed !== raw) {
    fs.writeFileSync(fp, fixed, "utf8");
    n++;
    console.log(path.relative(ROOT, fp));
  }
}

function walkHandouts(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkHandouts(p, acc);
    else if (/handout/i.test(name) && name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let nh = 0;
for (const fp of walkHandouts(ROOT)) {
  if (!fs.readFileSync(fp, "utf8").includes("__LESSON_TTS_MANIFEST")) continue;
  const lesson = lessonFolderFromPath(fp);
  let html = fs.readFileSync(fp, "utf8");
  const fixed = html.replace(
    /(window\.__LESSON_TTS_MANIFEST\s*=\s*\{[\s\S]*?\n\};)/g,
    (block) => patchManifestText(block, lesson)
  );
  if (fixed !== html) {
    fs.writeFileSync(fp, fixed, "utf8");
    nh++;
    console.log("html", path.relative(ROOT, fp));
  }
}

console.log("cosified manifests:", n, "html:", nh);
