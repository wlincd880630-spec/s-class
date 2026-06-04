#!/usr/bin/env node
/**
 * 推送前：将 Grammar 内 HTML 与 TTS manifest JS 中的相对媒体路径改为腾讯云 COS 绝对地址。
 * 用法: node Grammar/scripts/ensure-cos-media.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRAMMAR = path.join(__dirname, "..");
const COS_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/";

const MEDIA_EXT =
  /\.(jpg|jpeg|png|gif|webp|bmp|svg|ico|avif|mp4|webm|mov|avi|mkv|mp3|wav|ogg|m4a|aac|flac|pdf)(\?.*)?$/i;

const SKIP_DIR = new Set(["node_modules", ".git", "handout2"]);

function isMediaUrl(url) {
  if (!url || typeof url !== "string") return false;
  const t = url.trim();
  if (!t || /^https?:\/\//i.test(t) || /^data:/i.test(t) || /^#/.test(t)) return false;
  return MEDIA_EXT.test(t.split("?")[0]);
}

function walk(dir, acc = [], extRe = /\.(html|js)$/i) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "scripts" && dir === GRAMMAR) continue;
      walk(p, acc, extRe);
    } else if (extRe.test(name)) acc.push(p);
  }
  return acc;
}

function toCosUrl(filePath, relUrl) {
  if (!isMediaUrl(relUrl)) return null;
  const clean = relUrl.trim().replace(/^\.\//, "");
  const resolved = path.normalize(path.join(path.dirname(filePath), clean));
  let relFromGrammar = path.relative(GRAMMAR, resolved).replace(/\\/g, "/");
  if (relFromGrammar.startsWith("..")) {
    const base = path.basename(clean);
    if (base === "logo2.png") return COS_BASE + "logo2.png";
    return null;
  }
  return COS_BASE + relFromGrammar.replace(/\/+/g, "/");
}

function toCosDir(filePath, relDir) {
  if (!relDir || /^https?:\/\//i.test(relDir)) return relDir;
  const clean = relDir.trim().replace(/^\.\//, "");
  const probe = (clean.endsWith("/") ? clean : clean + "/") + "_probe_.mp3";
  const cos = toCosUrl(filePath, probe);
  if (!cos) return null;
  return cos.replace(/\/_probe_\.mp3$/, "/");
}

function fixPostProcess(content, filePath) {
  // VAR + "https://cos..." → 仅保留 COS 绝对地址
  content = content.replace(/[\w.]+\s*\+\s*(["'])(https:\/\/s-class-1403296481[^"']+)\1/g, "$1$2$1");

  // 目录型音频/图片基址（必须以 / 结尾，排除 manifest.json 等文件）
  content = content.replace(
    /(var\s+\w+\s*=\s*)(["'])((?!https?:)(?:\.\.\/)*(?:assets|asset)\/(?:audio|tts-mp3|img)\/[^"']+\/)\2/gi,
    (full, pre, q, dir) => {
      const cos = toCosDir(filePath, dir);
      return cos ? `${pre}${q}${cos}${q}` : full;
    }
  );

  // L07_LOCAL_TTS_DIR = L07_MEDIA_ROOT + "assets/tts-mp3/..."
  content = content.replace(
    /(var\s+L07_LOCAL_TTS_DIR\s*=\s*)L07_MEDIA_ROOT\s*\+\s*(["'])((?!https?:)(?:assets\/tts-mp3\/[^"']+\/?))\2/gi,
    (full, pre, q, dir) => {
      const cos = toCosDir(filePath, dir);
      return cos ? `${pre}${q}${cos}${q}` : full;
    }
  );

  // 动态图片前缀： "assets/img/l13-p04-" + cat
  content = content.replace(
    /(["'])((?!https?:\/\/)(?:(?:\.\.\/)*)(?:assets|asset|images)\/img\/[A-Za-z0-9_.-]+-)(["'])(\s*\+)/g,
    (full, q1, p, q2, plus) => {
      const cos = toCosUrl(filePath, p + "probe.png")?.replace(/probe\.png$/, "");
      return cos ? `${q1}${cos}${q2}${plus}` : full;
    }
  );

  // new URL("assets/img/", window.location.href)
  content = content.replace(
    /new\s+URL\s*\(\s*(["'])((?!https?:)(?:assets|asset)\/img\/)\1\s*,\s*window\.location\.href\s*\)\.href/g,
    (full, q, dir) => {
      const cos = toCosDir(filePath, dir);
      return cos ? JSON.stringify(cos) : full;
    }
  );

  content = content.replace(
    /return\s+(["'])((?!https?:)(?:assets|asset)\/img\/)\1\s*;/g,
    (full, q, dir) => {
      const cos = toCosDir(filePath, dir);
      return cos ? `return ${q}${cos}${q};` : full;
    }
  );

  // 带前缀的文件名基址：assets/audio/page05/lesson08-p05-corpus-
  content = content.replace(
    /(var\s+\w+\s*=\s*)(["'])((?!https?:)(?:\.\.\/)*(?:assets|asset)\/audio\/[^"']+-)\2/gi,
    (full, pre, q, prefix) => {
      const cos = toCosUrl(filePath, prefix + "probe.mp3")?.replace(/probe\.mp3$/, "");
      return cos ? `${pre}${q}${cos}${q}` : full;
    }
  );

  // manifest.json 绝对路径
  content = content.replace(
    /(var\s+\w+\s*=\s*)(["'])((?!https?:)(?:\.\.\/)*(?:assets|asset)\/audio\/[^"']+\.json)\2/gi,
    (full, pre, q, jsonPath) => {
      const cos = toCosUrl(filePath, jsonPath);
      return cos ? `${pre}${q}${cos}${q}` : full;
    }
  );

  return content;
}

function replaceMediaInContent(content, filePath) {
  let changed = false;
  let count = 0;

  const bump = (next, prev) => {
    if (next !== prev) {
      changed = true;
      count++;
    }
    return next;
  };

  // src / href / poster
  content = content.replace(/\b(src|href|poster)=(["'])([^"']+)\2/gi, (full, attr, q, url) => {
    const cos = toCosUrl(filePath, url);
    if (!cos) return full;
    return bump(`${attr}=${q}${cos}${q}`, full);
  });

  // CSS url(...)
  content = content.replace(/url\s*\(\s*(["']?)([^"')]+)\1\s*\)/gi, (full, _q, url) => {
    const cos = toCosUrl(filePath, url.trim());
    if (!cos) return full;
    return bump(`url("${cos}")`, full);
  });

  // JS / JSON 字符串中的相对媒体路径（TTS manifest、assetUrl 参数等）
  content = content.replace(/(["'])((?!https?:\/\/)(?:(?:\.\.\/)*)(?:assets|asset|images)(?:\/[^"']+)+)(\?[^"']*)?\1/gi, (full, q, p, query = "") => {
    const cos = toCosUrl(filePath, p + query);
    if (!cos) return full;
    return bump(`${q}${cos}${q}`, full);
  });

  // logo2.png
  content = content.replace(/(["'])((?:\.\.\/)*logo2\.png)\1/gi, (full, q, p) => {
    const cos = toCosUrl(filePath, p);
    if (!cos) return full;
    return bump(`${q}${cos}${q}`, full);
  });

  // 跨课引用 ../Lxx/assets/...
  content = content.replace(
    /(["'])((?:\.\.\/)+(?:L\d{2}(?:-[^/]+)?|L00-[^/]+)\/(?:assets|asset|images)\/[^"']+)(\?[^"']*)?\1/gi,
    (full, q, p, query = "") => {
      const cos = toCosUrl(filePath, p + query);
      if (!cos) return full;
      return bump(`${q}${cos}${q}`, full);
    }
  );

  // var PAGE02_AUDIO_BASE = "assets/audio/page02/"
  content = content.replace(
    /(var\s+PAGE02_AUDIO_BASE\s*=\s*["'])((?:\.\.\/)*(?:assets|asset)\/audio\/[^"']+\/?)(["'])/gi,
    (full, pre, base, suf) => {
      const cos = toCosUrl(filePath, base.endsWith("/") ? base.slice(0, -1) + "/x.mp3" : base);
      if (!cos) return full;
      const dir = cos.replace(/\/[^/]+\.mp3$/, "/");
      return bump(`${pre}${dir}${suf}`, full);
    }
  );

  const beforeFix = content;
  content = fixPostProcess(content, filePath);
  if (content !== beforeFix) changed = true;

  return { content, changed, count };
}

function patchCosConfig() {
  const fp = path.join(GRAMMAR, "L00-主系表与非谓语", "cos-config.js");
  if (!fs.existsSync(fp)) return;
  const lessonBase = COS_BASE + "L00-主系表与非谓语";
  const next = `/**
 * 静态资源根地址（腾讯 COS）。
 * 与 bucket 路径 s-class/Grammar/L00-主系表与非谓语/ 对应；不要末尾斜杠。
 */
window.LINKING_ASSET_BASE = "${lessonBase}";
`;
  fs.writeFileSync(fp, next, "utf8");
  console.log("updated cos-config.js");
}

function shouldProcessJs(fp) {
  const rel = path.relative(GRAMMAR, fp).replace(/\\/g, "/");
  if (!/\.js$/i.test(fp)) return false;
  if (rel.startsWith("scripts/")) return false;
  if (/play-local-mp3\.js$/i.test(rel)) return false;
  if (/manifest\.embed\.js$/i.test(rel)) return true;
  if (/lesson-tts-bootstrap\.js$/i.test(rel)) return false;
  if (/linking-assets\.js$/i.test(rel)) return false;
  if (/lesson-local-audio\.js$/i.test(rel)) return false;
  if (/lesson-speak-local-only\.js$/i.test(rel)) return false;
  const c = fs.readFileSync(fp, "utf8");
  return /(?:assets|asset|images)\/[^"'\s]+\.(?:mp3|png|jpe?g|webp|gif|mp4|webm)/i.test(c);
}

function auditHtml() {
  const htmls = walk(GRAMMAR, [], /\.html$/i).filter((f) => !f.includes(`${path.sep}scripts${path.sep}`));
  const relMedia = [];
  const cosMedia = [];
  for (const fp of htmls) {
    const rel = path.relative(GRAMMAR, fp);
    const c = fs.readFileSync(fp, "utf8");
    if (/cos\.ap-chengdu/.test(c)) cosMedia.push(rel);
    const re =
      /(?:src|href|poster)\s*=\s*["']((?!https?:)(?!data:)[^"']+)["']|url\s*\(\s*["']?((?!https?:)(?!data:)[^"')]+)["']?\s*\)|["']((?:\.\.\/)*(?:assets|asset|images)\/[^"']+\.(?:mp3|png|jpe?g|webp|gif|mp4|webm))["']/gi;
    let m;
    while ((m = re.exec(c)) !== null) {
      const u = m[1] || m[2] || m[3];
      if (u && isMediaUrl(u)) relMedia.push(`${rel}: ${u.slice(0, 80)}`);
    }
  }
  return { htmls: htmls.length, cosMedia: cosMedia.length, relMedia };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const files = [
    ...walk(GRAMMAR, [], /\.html$/i).filter((f) => !f.includes(`${path.sep}scripts${path.sep}`)),
    ...walk(GRAMMAR, [], /\.js$/i).filter(shouldProcessJs),
  ];

  let totalFiles = 0;
  let totalReplacements = 0;

  for (const fp of files) {
    const original = fs.readFileSync(fp, "utf8");
    const { content, changed, count } = replaceMediaInContent(original, fp);
    if (changed) {
      totalFiles++;
      totalReplacements += count;
      const rel = path.relative(GRAMMAR, fp);
      console.log(`${dryRun ? "[dry] " : ""}${rel} (${count})`);
      if (!dryRun) fs.writeFileSync(fp, content, "utf8");
    }
  }

  if (!dryRun) patchCosConfig();

  const audit = auditHtml();
  console.log(`\n=== 完成 ===`);
  console.log(`修改文件: ${totalFiles}${dryRun ? " (dry-run)" : ""}`);
  console.log(`替换次数: ${totalReplacements}`);
  console.log(`HTML 总数: ${audit.htmls}`);
  console.log(`含 COS 的 HTML: ${audit.cosMedia}`);
  console.log(`仍含相对媒体的 HTML 引用: ${audit.relMedia.length}`);
  if (audit.relMedia.length) {
    audit.relMedia.slice(0, 20).forEach((x) => console.log(" ", x));
    if (audit.relMedia.length > 20) console.log(`  … 另有 ${audit.relMedia.length - 20} 处`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
