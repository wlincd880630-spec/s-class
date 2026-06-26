#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const STB = path.join(ROOT, "Primary/School_textbook");
const CW = path.join(STB, "Courseware");
const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/";
const AUDIO_COS = `${COS}Primary/School_textbook/Courseware/audio/`;

function walkHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(p, acc);
    else if (/\.html$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

const htmlFiles = walkHtml(STB);

const issues = [];
const dataFiles = [];
function walkData(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkData(p);
    else if (e.name === "data.js") dataFiles.push(p);
  }
}
walkData(CW);

for (const fp of htmlFiles) {
  const rel = path.relative(STB, fp).replace(/\\/g, "/");
  const s = fs.readFileSync(fp, "utf8");
  const needsAudio = s.includes('src="assets/js/utils.js"') || s.includes("speakText");

  if (/src="assets\/images\//.test(s)) {
    issues.push({ file: rel, type: "html-img-relative", sample: s.match(/src="assets\/images\/[^"]+"/)?.[0] });
  }
  if (/src='\.\/assets\/images\//.test(s) || /src="\.\/assets\/images\//.test(s)) {
    issues.push({ file: rel, type: "html-img-dot-relative" });
  }
  if (needsAudio && !rel.endsWith("index.html")) {
    if (!s.includes("School_textbook/Courseware/audio/audio-manifest.js")) {
      issues.push({ file: rel, type: "html-audio-manifest-missing" });
    }
    if (!s.includes("School_textbook/Courseware/audio/local-audio.js")) {
      issues.push({ file: rel, type: "html-local-audio-missing" });
    }
    if (/src="\.\.\/audio\//.test(s) || /src="audio\/audio-manifest/.test(s)) {
      issues.push({ file: rel, type: "html-audio-relative" });
    }
  }
  const imgs = [...s.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of imgs) {
    if (src && !src.startsWith("http") && !src.startsWith("data:") && !src.includes("${") && src !== "") {
      issues.push({ file: rel, type: "html-img-non-cos", sample: src });
    }
  }
}

for (const fp of dataFiles) {
  const rel = path.relative(CW, fp).replace(/\\/g, "/");
  const s = fs.readFileSync(fp, "utf8");
  const relImgs = [...s.matchAll(/"image": "assets\/images\/[^"]+"/g)];
  if (relImgs.length) {
    issues.push({ file: rel, type: "data-js-image-relative", count: relImgs.length });
  }
  const picsum = [...s.matchAll(/picsum\.photos/g)];
  if (picsum.length) {
    issues.push({ file: rel, type: "data-js-picsum-placeholder", count: picsum.length });
  }
}

const byType = {};
for (const i of issues) {
  byType[i.type] = (byType[i.type] || 0) + 1;
}

console.log("HTML files:", htmlFiles.length);
console.log("data.js files:", dataFiles.length);
console.log("Issues by type:", byType);
if (issues.length) {
  console.log("\nSamples:");
  const seen = new Set();
  for (const i of issues) {
    const k = i.type;
    if (seen.has(k)) continue;
    seen.add(k);
    console.log(JSON.stringify(i));
  }
  const detail = issues.filter((i) => i.type !== "data-js-picsum-placeholder").slice(0, 20);
  if (detail.length) {
    console.log("\nFirst issues:");
    detail.forEach((i) => console.log(i.file, i.type, i.sample || i.count || ""));
  }
} else {
  console.log("\nAll clear (except optional picsum placeholders).");
}

process.exit(issues.some((i) => i.type !== "data-js-picsum-placeholder") ? 1 : 0);
