#!/usr/bin/env node
/**
 * 审计全库 HTML：图片 / 音频 / 视频 是否均为本地路径
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const MEDIA_EXT =
  /\.(png|jpe?g|webp|gif|svg|ico|bmp|avif|mp3|mp4|webm|m4a|ogg|wav|mov|pdf|woff2?|ttf)(\?[^"'\s)\]]*)?$/i;

const SKIP_HOST =
  /fonts\.googleapis|fonts\.gstatic|cdn\.jsdelivr|unpkg\.com|aka\.ms|googleapis\.com\/css|placehold\.co/i;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walkHtml(p, acc);
    } else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function lessonFrom(fp) {
  const top = path.relative(ROOT, fp).split(path.sep)[0];
  return /^L\d{2}/.test(top) || top.startsWith("L00-") ? top : null;
}

function resolveLocal(fp, src) {
  const clean = String(src).split("?")[0].trim();
  if (!clean || /^data:/i.test(clean)) return { kind: "data", abs: null };
  if (/^https?:\/\//i.test(clean)) return { kind: "remote", abs: null, url: clean };
  if (/^\/\//.test(clean)) return { kind: "remote", abs: null, url: "https:" + clean };

  const lesson = lessonFrom(fp);
  let abs;
  if (
    lesson &&
    (clean.startsWith("assets/") ||
      clean.startsWith("asset/") ||
      clean.startsWith("images/") ||
      clean.startsWith("../"))
  ) {
    if (clean.startsWith("../")) {
      abs = path.normalize(path.join(path.dirname(fp), clean));
    } else {
      abs = path.normalize(path.join(ROOT, lesson, clean));
    }
  } else {
    abs = path.normalize(path.join(path.dirname(fp), clean));
  }
  return { kind: "local", abs };
}

function extractRefs(content) {
  const refs = [];
  const patterns = [
    { re: /src\s*=\s*["']([^"']+)["']/gi, via: "src" },
    { re: /href\s*=\s*["']([^"']+\.(?:mp3|mp4|webm|m4a|ogg|wav|pdf))["']/gi, via: "href" },
    { re: /poster\s*=\s*["']([^"']+)["']/gi, via: "poster" },
    { re: /url\s*\(\s*["']?([^"')]+)["']?\s*\)/gi, via: "css-url" },
    { re: /(?:image|video|audio|poster|src|mp3|sound)\s*:\s*["']([^"']+)["']/gi, via: "js-prop" },
    { re: /(?:img|image|video|audio|poster|mp3)\s*[=:]\s*["']([^"']+)["']/gi, via: "js-assign" },
  ];
  for (const { re, via } of patterns) {
    let m;
    while ((m = re.exec(content)) !== null) {
      refs.push({ via, raw: m[1] });
    }
  }
  return refs;
}

const htmls = walkHtml(ROOT);
const cosInHtml = [];
const remote = [];
const missingLocal = [];
const ok = { img: 0, audio: 0, video: 0, other: 0 };

for (const fp of htmls) {
  const rel = path.relative(ROOT, fp);
  const content = fs.readFileSync(fp, "utf8");
  if (/cos\.ap-chengdu/.test(content)) cosInHtml.push(rel);

  for (const { via, raw } of extractRefs(content)) {
    if (!raw || raw.length < 3) continue;
    if (!MEDIA_EXT.test(raw) && !/\.(mp3|mp4|webm|m4a)/i.test(raw)) continue;
    if (/^data:/i.test(raw)) continue;

    const r = resolveLocal(fp, raw);
    const type = /\.(mp3|m4a|ogg|wav)/i.test(raw)
      ? "audio"
      : /\.(mp4|webm|mov)/i.test(raw)
        ? "video"
        : /\.(png|jpe?g|gif|webp|svg|ico)/i.test(raw)
          ? "img"
          : "other";

    if (r.kind === "remote") {
      if (SKIP_HOST.test(raw)) continue;
      remote.push({ file: rel, via, type, url: raw.slice(0, 100) });
      continue;
    }
    if (r.kind === "local") {
      if (!fs.existsSync(r.abs)) {
        missingLocal.push({ file: rel, via, type, src: raw.slice(0, 90), abs: path.relative(ROOT, r.abs) });
      } else {
        ok[type === "other" ? "other" : type]++;
      }
    }
  }
}

const um = new Map();
for (const x of missingLocal) um.set(x.abs, x);
const ur = new Map();
for (const x of remote) ur.set(x.file + "|" + x.url, x);

console.log("=== 全库媒体链接审计（HTML）===");
console.log("HTML 文件数:", htmls.length);
console.log("仍含 COS 域名:", cosInHtml.length);
if (cosInHtml.length) cosInHtml.forEach((f) => console.log("  ", f));

console.log("\n本地媒体引用（文件存在）:");
console.log("  图片:", ok.img, "  音频:", ok.audio, "  视频:", ok.video, "  其他:", ok.other);

console.log("\n远程 https 媒体 URL（唯一）:", ur.size);
[...ur.values()].forEach((x) => console.log(`  [${x.type}] ${x.file} (${x.via})`, x.url));

console.log("\n本地路径但文件缺失（唯一）:", um.size);
[...um.values()].forEach((x) => console.log(`  [${x.type}] ${x.abs}`, "<-", x.file));

// JS 配置文件中的 COS
const cosJs = [];
function walkJs(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walkJs(p);
    } else if (/\.(js|css)$/.test(name)) {
      const c = fs.readFileSync(p, "utf8");
      if (/cos\.ap-chengdu/.test(c)) cosJs.push(path.relative(ROOT, p));
    }
  }
}
walkJs(ROOT);
console.log("\nJS/CSS 仍含 COS:", cosJs.length);
cosJs.forEach((f) => console.log("  ", f));
