#!/usr/bin/env node
/**
 * 审计：manifest 引用的 MP3 是否存在于各课 assets/tts-mp3/
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(p, acc);
    } else if (/\.(html|js)$/i.test(name)) acc.push(p);
  }
  return acc;
}

function lessonFromPath(filePath) {
  const rel = path.relative(ROOT, filePath);
  const top = rel.split(path.sep)[0];
  if (/^L\d{2}/.test(top) || top.startsWith("L00-")) return top;
  return null;
}

/** manifest 中 assets/tts-mp3/ 相对各课根目录 */
function resolveManifestMp3(filePath, url) {
  const u = String(url).split("?")[0];
  if (/^https?:\/\//i.test(u)) return { abs: null, remote: true };
  const lesson = lessonFromPath(filePath);
  if (!lesson) return { abs: null, remote: false };
  const rel = u.replace(/^\.\//, "");
  if (rel.startsWith("assets/tts-mp3/") || rel.startsWith("../")) {
    const abs = path.normalize(path.join(ROOT, lesson, rel.replace(/^\.\.\/[^/]+\//, "")));
    if (rel.startsWith("../")) {
      return { abs: path.normalize(path.join(path.dirname(filePath), rel)), remote: false };
    }
    return { abs: path.join(ROOT, lesson, rel), remote: false };
  }
  return { abs: path.normalize(path.join(path.dirname(filePath), rel)), remote: false };
}

function extractManifestPairs(content) {
  const pairs = [];
  const re =
    /(?:window\.__LESSON_TTS_MANIFEST\s*=\s*Object\.assign\([^,]+,\s*\{|window\.__LESSON_TTS_MANIFEST\s*=\s*\{)([\s\S]*?\r?\n\});/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const block = m[1];
    const pairRe = /("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g;
    let p;
    while ((p = pairRe.exec(block)) !== null) {
      try {
        const text = JSON.parse(p[1]);
        const url = JSON.parse(p[2]);
        if (!/assets\/(tts-mp3|audio)\//.test(url)) continue;
        pairs.push({ text, url });
      } catch {}
    }
  }
  return pairs;
}

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

const files = walk(ROOT);
const missing = [];
const remoteUrls = [];
const seen = new Set();

for (const fp of files) {
  const content = fs.readFileSync(fp, "utf8");
  if (!content.includes("__LESSON_TTS_MANIFEST")) continue;
  const relFile = path.relative(ROOT, fp);
  for (const { text, url } of extractManifestPairs(content)) {
    const key = relFile + "|" + url;
    if (seen.has(key)) continue;
    seen.add(key);
    const { abs, remote } = resolveManifestMp3(fp, url);
    if (remote) {
      remoteUrls.push({ file: relFile, url, text: String(text).slice(0, 60) });
      continue;
    }
    if (!abs || !fs.existsSync(abs) || fs.statSync(abs).size < 80) {
      missing.push({ file: relFile, url, abs, text: String(text).slice(0, 80) });
    }
  }
}

// HTML 含语音但无 bootstrap
const noBootstrap = [];
const onlinePrimary = [];
const cosRefs = [];

for (const fp of files.filter((f) => f.endsWith(".html"))) {
  const c = fs.readFileSync(fp, "utf8");
  const rel = path.relative(ROOT, fp);
  const hasVoice =
    /data-tts|speakAzure|playAudio|playLocalIfAvailable|L10LocalTts|LessonTTSBootstrap|__LESSON_TTS_MANIFEST/i.test(
      c
    );
  if (!hasVoice) continue;
  if (hasVoice && !/lesson-tts-bootstrap\.js|L10LocalTts|lesson-tts-l07-local/i.test(c)) {
    noBootstrap.push(rel);
  }
  if (/cos\.ap-chengdu[^"']*tts-mp3/i.test(c)) cosRefs.push(rel);
  if (
    /\bfetch\s*\(\s*[`'"]https:\/\/[^`'"]*tts\.speech\.microsoft/i.test(c) &&
    !/playLocalIfAvailable|interceptAzure|blockAzure/i.test(c)
  ) {
    onlinePrimary.push(rel);
  }
}

console.log("=== Manifest MP3 文件检查 ===");
console.log("唯一 manifest 条目:", seen.size);
console.log("远程 URL:", remoteUrls.length);
console.log("缺失/损坏 MP3:", missing.length);
if (remoteUrls.length) {
  console.log("\n远程 manifest URL（前20）:");
  remoteUrls.slice(0, 20).forEach((x) => console.log(" ", x.file, x.url));
}
if (missing.length) {
  console.log("\n缺失 MP3（全部）:");
  missing.forEach((x) => console.log(" ", x.file, "->", x.url, "\n   ", x.abs));
}

console.log("\n=== HTML 语音机制 ===");
console.log("COS tts-mp3 引用:", cosRefs.length, cosRefs.length ? cosRefs.join(", ") : "");
console.log("有语音但未引 bootstrap:", noBootstrap.length);
noBootstrap.forEach((x) => console.log("  ", x));
console.log("可能仍直连 Azure fetch（无本地拦截标记）:", onlinePrimary.length);
onlinePrimary.forEach((x) => console.log("  ", x));
