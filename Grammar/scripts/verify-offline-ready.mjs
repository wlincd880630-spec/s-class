#!/usr/bin/env node
/**
 * 离线 file:// 就绪检查：HTML 引用的本地资源是否存在、是否仍有远程/COS 链接
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_RE = /^(L\d{2}(?:-[^/]+)?|L00-[^/]+)$/;

function walk(dir, acc = [], ext = /\.html$/i) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (["node_modules", ".git", "scripts"].includes(name)) continue;
      walk(p, acc, ext);
    } else if (ext.test(name)) acc.push(p);
  }
  return acc;
}

function lessonOf(fp) {
  const top = path.relative(ROOT, fp).split(path.sep)[0];
  return LESSON_RE.test(top) ? top : null;
}

function resolveAsset(htmlPath, url) {
  const u = String(url).split("?")[0].trim();
  if (!u || /^data:/i.test(u) || /^https?:\/\//i.test(u) || /^\/\//.test(u)) {
    return { kind: /^https?:\/\//i.test(u) ? "remote" : "skip", abs: null };
  }
  const lesson = lessonOf(htmlPath);
  if (u.startsWith("../") && lesson === "L13-定语从句") {
    return { kind: "local", abs: path.normalize(path.join(path.dirname(htmlPath), u)) };
  }
  if (lesson && (u.startsWith("assets/") || u.startsWith("asset/") || u.startsWith("images/"))) {
    return { kind: "local", abs: path.normalize(path.join(ROOT, lesson, u)) };
  }
  return { kind: "local", abs: path.normalize(path.join(path.dirname(htmlPath), u)) };
}

const htmls = walk(ROOT);
const issues = {
  cos: [],
  remoteMedia: [],
  remoteScript: [],
  missingAsset: [],
  parentAssets: [],
  brokenBootstrap: [],
};

const mediaExt = /\.(png|jpe?g|webp|gif|svg|ico|mp3|mp4|webm|m4a|ogg|wav|css|js)(\?|$)/i;
const skipHost = /fonts\.google|cdn\.jsdelivr|cdnjs\.cloudflare|aka\.ms|unpkg\.com/i;

for (const fp of htmls) {
  const rel = path.relative(ROOT, fp);
  const c = fs.readFileSync(fp, "utf8");

  if (/cos\.ap-chengdu|s-class-1403296481/.test(c)) issues.cos.push(rel);
  if (/\.\.\/assets\//.test(c) && !c.includes("../L13/assets/")) issues.parentAssets.push(rel);

  // script / link href
  const refs = [
    ...c.matchAll(/<script[^>]+src=["']([^"']+)["']/gi),
    ...c.matchAll(/<link[^>]+href=["']([^"']+)["']/gi),
    ...c.matchAll(/(?:src|href|poster)=["']([^"']+)["']/gi),
    ...c.matchAll(/<source[^>]+src=["']([^"']+)["']/gi),
  ];

  for (const m of refs) {
    const url = m[1];
    if (!url || url.startsWith("#") || url.startsWith("data:")) continue;

    if (/^https?:\/\//i.test(url)) {
      if (skipHost.test(url)) {
        if (/\.(js|mjs)\b/i.test(url)) issues.remoteScript.push({ file: rel, url: url.slice(0, 80) });
        continue;
      }
      if (mediaExt.test(url)) issues.remoteMedia.push({ file: rel, url: url.slice(0, 80) });
      continue;
    }

    if (!mediaExt.test(url) && !/assets\/|asset\/|images\//.test(url)) continue;

    const r = resolveAsset(fp, url);
    if (r.kind === "remote") issues.remoteMedia.push({ file: rel, url });
    else if (r.kind === "local" && r.abs && !fs.existsSync(r.abs)) {
      // 忽略注释中的引用
      const idx = c.indexOf(url);
      const lineStart = c.lastIndexOf("\n", idx) + 1;
      const line = c.slice(lineStart, c.indexOf("\n", idx));
      if (line.trim().startsWith("/*") || line.includes("inlined")) continue;
      issues.missingAsset.push({ file: rel, url, abs: path.relative(ROOT, r.abs) });
    }
  }

  // 需要 bootstrap 但未引入且未内联
  if (
    /playLocalIfAvailable|__LESSON_TTS_MANIFEST|L10LocalTts/.test(c) &&
    !/lesson-tts-bootstrap\.js/.test(c) &&
    !/LessonTTSBootstrap/.test(c)
  ) {
    issues.brokenBootstrap.push(rel);
  }
}

// manifest MP3
let manifestRemote = 0;
let manifestMissing = 0;
for (const fp of walk(ROOT, [], /\.(html|js)$/i)) {
  const c = fs.readFileSync(fp, "utf8");
  if (!c.includes("__LESSON_TTS_MANIFEST")) continue;
  const lesson = lessonOf(fp);
  for (const m of c.matchAll(/:\s*("(?:\\.|[^"\\])*")/g)) {
    try {
      const v = JSON.parse(m[1]);
      if (!/\.mp3$/i.test(v) && !/assets\/|asset\//.test(v)) continue;
      if (/^https?:\/\//i.test(v)) {
        manifestRemote++;
        continue;
      }
      if (/\.mp3$/i.test(v) && lesson) {
        const abs = resolveAsset(fp, v).abs;
        if (abs && !fs.existsSync(abs)) manifestMissing++;
      }
    } catch {}
  }
}

const um = new Map();
for (const x of issues.missingAsset) um.set(x.abs, x);

console.log("=== 离线就绪检查 ===");
console.log("HTML 总数:", htmls.length);
console.log("含 COS 域名:", issues.cos.length, issues.cos.slice(0, 5).join(", "));
console.log("仍引用 ../assets/ (非 L13):", issues.parentAssets.length);
console.log("远程媒体 URL:", issues.remoteMedia.length);
console.log("CDN 脚本 (需联网):", new Set(issues.remoteScript.map((x) => x.url)).size, "个");
console.log("本地资源缺失 (唯一):", um.size);
[...um.values()].slice(0, 25).forEach((x) => console.log("  MISSING", x.abs, "<-", x.file));
console.log("Manifest 远程 MP3:", manifestRemote);
console.log("Manifest 缺失 MP3:", manifestMissing);
console.log("Bootstrap 可能缺失:", issues.brokenBootstrap.length);

let ok = true;
if (issues.cos.length || issues.parentAssets.length || issues.remoteMedia.length || um.size || manifestRemote || manifestMissing) ok = false;
console.log("\n总体:", ok ? "PASS（课件资源均为本地）" : "NEEDS FIX");
