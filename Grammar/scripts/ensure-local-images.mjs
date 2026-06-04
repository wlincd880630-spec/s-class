#!/usr/bin/env node
/**
 * 将 HTML/CSS/JS 中腾讯云 COS Grammar 资源链接改为本地相对路径。
 * 用法: node scripts/ensure-local-images.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const LESSON = "(?:L\\d{2}(?:-[^/]+)?|L00-[^/]+)";
/** 匹配 Grammar/{lesson}/ 之后到常见资源扩展名（可含 ?query） */
const COS_RE = new RegExp(
  `https://s-class-1403296481\\.cos\\.ap-chengdu\\.myqcloud\\.com/s-class/Grammar/(${LESSON}/((?:assets|asset|images)(?:/[A-Za-z0-9_.@#%-]+)+\\.(?:png|jpe?g|webp|gif|svg|ico|bmp|avif|mp4|webm|mp3|pdf|woff2?|ttf)))(?:\\?[^"'\\s)\\]]*)?`,
  "gi"
);

function walk(dir, acc = [], extRe = /\.(html|css|js|json)$/i) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(p, acc, extRe);
    } else if (extRe.test(name)) acc.push(p);
  }
  return acc;
}

function lessonFromPath(filePath) {
  const rel = path.relative(ROOT, filePath);
  const top = rel.split(path.sep)[0];
  if (/^L\d{2}/.test(top) || top.startsWith("L00-")) return top;
  return null;
}

function toRelAsset(filePath, lesson, subPath) {
  const sub = subPath.replace(/^\.\//, "");
  const fileLesson = lessonFromPath(filePath);
  if (fileLesson === lesson) return sub.replace(/\\/g, "/");
  return path.posix.join("..", lesson, sub).replace(/\\/g, "/");
}

function resolveLocalAbs(lesson, subPath) {
  const clean = subPath.replace(/\?.*$/, "");
  return path.normalize(path.join(ROOT, lesson, clean.replace(/\//g, path.sep)));
}

function replaceCosUrls(content, filePath, stats) {
  return content.replace(COS_RE, (full, _lessonPath, subPath) => {
    const lesson = _lessonPath.split("/")[0];
    const rel = toRelAsset(filePath, lesson, subPath);
    const abs = resolveLocalAbs(lesson, subPath);
    if (!fs.existsSync(abs)) {
      stats.missing.push({ file: path.relative(ROOT, filePath), url: full.slice(0, 120), abs });
    } else {
      stats.replaced++;
    }
    return rel;
  });
}

/** JS 内 COS 根路径 → 本课相对根（空串或 images/） */
function replaceCosBasePrefixes(content, filePath) {
  const lesson = lessonFromPath(filePath);
  if (!lesson) return content;
  const esc = lesson.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefix = `https://s-class-1403296481\\.cos\\.ap-chengdu\\.myqcloud\\.com/s-class/Grammar/${esc}/`;
  return content.replace(new RegExp(prefix, "g"), "");
}

function fixKnownBrokenPaths(content) {
  return content
    .replace(/assets\/external\/assets\//g, "assets/")
    .replace(/\?v=20260428/g, "");
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const files = walk(ROOT).filter((f) => !f.includes(`${path.sep}scripts${path.sep}`));

  const stats = { filesChanged: 0, replaced: 0, missing: [] };
  const seenMissing = new Set();

  for (const fp of files) {
    let c = fs.readFileSync(fp, "utf8");
    if (!c.includes("cos.ap-chengdu") && !c.includes("assets/external/assets")) continue;
    let nc = replaceCosUrls(c, fp, stats);
    nc = replaceCosBasePrefixes(nc, fp);
    nc = fixKnownBrokenPaths(nc);
    if (nc !== c) {
      if (!dryRun) fs.writeFileSync(fp, nc, "utf8");
      stats.filesChanged++;
    }
  }

  const uniqueMissing = [];
  for (const m of stats.missing) {
    const k = m.abs;
    if (seenMissing.has(k)) continue;
    seenMissing.add(k);
    uniqueMissing.push(m);
  }

  console.log("=== COS → 本地路径 ===");
  console.log("替换次数:", stats.replaced);
  console.log("修改文件:", stats.filesChanged, dryRun ? "(dry-run)" : "");
  console.log("本地文件不存在（唯一）:", uniqueMissing.length);
  uniqueMissing.forEach((m) => console.log(" ", path.relative(ROOT, m.abs)));

  const htmlFiles = walk(ROOT, [], /\.html$/i).filter((f) => !f.includes(`${path.sep}scripts${path.sep}`));
  let cosHtml = 0;
  let remoteImg = 0;
  for (const fp of htmlFiles) {
    const c = fs.readFileSync(fp, "utf8");
    if (/cos\.ap-chengdu/.test(c)) cosHtml++;
    const re =
      /(?:src|href|poster)\s*=\s*["'](https?:\/\/[^"']+)["']|url\s*\(\s*["']?(https?:\/\/[^"')]+)["']?\s*\)/gi;
    let m;
    while ((m = re.exec(c)) !== null) {
      const u = m[1] || m[2];
      if (!u || /fonts\.googleapis|cdn\.jsdelivr|aka\.ms|unpkg\.com/i.test(u)) continue;
      if (/\.(png|jpe?g|webp|gif|svg|ico|mp4|webm)(\?|$)/i.test(u) || u.includes("cos.ap-chengdu")) remoteImg++;
    }
  }
  console.log("\n=== 审计 HTML ===");
  console.log("仍含 COS 的 HTML:", cosHtml);
  console.log("仍含远程图片/视频 URL 的引用处:", remoteImg);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
