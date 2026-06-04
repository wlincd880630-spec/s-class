#!/usr/bin/env node
/**
 * 逐一审计 Grammar 内每个 HTML 的媒体链接是否指向腾讯 COS。
 * 用法: node Grammar/scripts/audit-cos-html-per-file.mjs [--json report.json]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const GRAMMAR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const COS_HOST = "s-class-1403296481.cos.ap-chengdu.myqcloud.com";
const COS_PREFIX = `https://${COS_HOST}/s-class/Grammar/`;

const MEDIA_EXT = /\.(jpg|jpeg|png|gif|webp|bmp|svg|ico|avif|mp4|webm|mov|avi|mkv|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i;
const SKIP_DIRS = new Set(["node_modules", ".git", "scripts", "handout2"]);

/** @type {{ id: string, label: string, re: RegExp, hint?: string }[]} */
const CHECKS = [
  {
    id: "attr_relative_media",
    label: "src/href/poster 相对媒体路径",
    re: /\b(?:src|href|poster)\s*=\s*["']((?!https?:\/\/)(?!data:)(?!#)[^"']+)["']/gi,
    filter: (u) => MEDIA_EXT.test(u.split("?")[0]),
  },
  {
    id: "css_url_relative",
    label: "CSS url() 相对媒体",
    re: /url\s*\(\s*["']?((?!https?:\/\/)(?!data:)[^"')]+)["']?\s*\)/gi,
    filter: (u) => MEDIA_EXT.test(u.trim().split("?")[0]),
  },
  {
    id: "quoted_assets_media",
    label: "引号内 assets/asset/images 媒体路径",
    re: /["']((?!https?:\/\/)(?:(?:\.\.\/)*)(?:assets|asset|images)\/[^"']+)["']/gi,
    filter: (u) => MEDIA_EXT.test(u.split("?")[0]),
  },
  {
    id: "quoted_logo",
    label: "logo2.png 相对路径",
    re: /["']((?:\.\.\/)*logo2\.png)["']/gi,
    filter: () => true,
  },
  {
    id: "cross_lesson_media",
    label: "跨课 ../Lxx/ 相对媒体",
    re: /["']((?:\.\.\/)+(?:L\d{2}(?:-[^/]+)?|L00-[^/]+)\/(?:assets|asset|images)\/[^"']+)["']/gi,
    filter: (u) => MEDIA_EXT.test(u.split("?")[0]),
  },
  {
    id: "audio_dir_base",
    label: "JS 音频/图片目录基址（非 COS）",
    re: /var\s+\w+\s*=\s*["']((?!https?:)(?:\.\.\/)*(?:assets|asset)\/(?:audio|tts-mp3|img)\/[^"']+\/?)["']/gi,
    filter: () => true,
  },
  {
    id: "audio_prefix_base",
    label: "JS 音频文件名前缀（非 COS）",
    re: /var\s+\w+\s*=\s*["']((?!https?:)(?:\.\.\/)*(?:assets|asset)\/audio\/[^"']+-)["']/gi,
    filter: () => true,
  },
  {
    id: "dynamic_img_prefix",
    label: "动态图片前缀（非 COS）",
    re: /["']((?!https?:\/\/)(?:(?:\.\.\/)*)(?:assets|asset|images)\/img\/[A-Za-z0-9_.-]+-)["']\s*\+/gi,
    filter: () => true,
  },
  {
    id: "broken_cos_concat",
    label: "错误拼接 VAR + COS URL",
    re: /[\w.]+\s*\+\s*["']https:\/\/s-class-1403296481[^"']+["']/g,
    filter: () => true,
  },
  {
    id: "cos_double_slash",
    label: "COS URL 异常（双斜杠 /manifest.json/ 等）",
    re: /https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Grammar\/[^"'\s)]+\/\//g,
    filter: () => true,
  },
  {
    id: "cos_wrong_probe_suffix",
    label: "COS URL 含 probe 残留",
    re: /https:\/\/s-class-1403296481[^"'\s)]*probe\.(mp3|png)/gi,
    filter: () => true,
  },
  {
    id: "new_url_assets",
    label: "new URL(assets/...) 相对路径",
    re: /new\s+URL\s*\(\s*["']((?!https?:)(?:assets|asset)\/[^"']+)["']/gi,
    filter: (u) => /img\/|audio\/|tts-mp3\//.test(u),
  },
  {
    id: "l07_media_root_concat",
    label: "L07_MEDIA_ROOT + 相对路径",
    re: /L07_MEDIA_ROOT\s*\+\s*["']((?!https?:)[^"']+)["']/gi,
    filter: (u) => MEDIA_EXT.test(u) || /^assets\//.test(u),
  },
];

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkHtml(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function snippet(content, index, len = 120) {
  const start = Math.max(0, index - 30);
  const end = Math.min(content.length, index + len);
  return content.slice(start, end).replace(/\s+/g, " ").trim();
}

function auditFile(fp) {
  const rel = path.relative(GRAMMAR, fp).replace(/\\/g, "/");
  const content = fs.readFileSync(fp, "utf8");
  const hasCos = content.includes(COS_HOST);
  const issues = [];

  for (const check of CHECKS) {
    check.re.lastIndex = 0;
    let m;
    while ((m = check.re.exec(content)) !== null) {
      const raw = m[1] !== undefined ? m[1] : m[0];
      const val = String(raw).trim();
      if (check.filter && !check.filter(val)) continue;
      // 排除纯 HTML 页面链接、CSS/JS 脚本引用
      if (check.id === "attr_relative_media") {
        const ext = val.split("?")[0].split(".").pop()?.toLowerCase() || "";
        if (["html", "css", "js"].includes(ext)) continue;
      }
      issues.push({
        check: check.id,
        label: check.label,
        value: val.length > 100 ? val.slice(0, 97) + "…" : val,
        line: lineOf(content, m.index),
        snippet: snippet(content, m.index),
      });
    }
  }

  // 统计 COS 媒体引用数
  const cosMediaRefs = (content.match(new RegExp(COS_HOST.replace(/\./g, "\\.") + "[^\"'\\s)]*\\.(?:mp3|png|jpe?g|webp|gif|mp4|webm)", "gi")) || []).length;

  return {
    file: rel,
    hasCos,
    cosMediaRefs,
    issueCount: issues.length,
    issues,
    status: issues.length === 0 ? (hasCos || cosMediaRefs === 0 ? "ok" : "ok_no_media") : "fail",
  };
}

function main() {
  const jsonOut = process.argv.includes("--json")
    ? process.argv[process.argv.indexOf("--json") + 1]
    : null;

  const files = walkHtml(GRAMMAR).sort((a, b) =>
    path.relative(GRAMMAR, a).localeCompare(path.relative(GRAMMAR, b), "zh")
  );

  const results = files.map(auditFile);
  const failed = results.filter((r) => r.status === "fail");
  const okNoMedia = results.filter((r) => r.status === "ok_no_media");
  const ok = results.filter((r) => r.status === "ok");

  console.log("=== Grammar HTML 逐一 COS 审计 ===\n");
  console.log(`总计 HTML: ${results.length}`);
  console.log(`通过（含 COS 媒体）: ${ok.length}`);
  console.log(`通过（无媒体引用）: ${okNoMedia.length}`);
  console.log(`未通过: ${failed.length}\n`);

  if (failed.length) {
    console.log("--- 未通过文件明细 ---");
    for (const r of failed) {
      console.log(`\n✗ ${r.file} (${r.issueCount} 处)`);
      for (const iss of r.issues.slice(0, 8)) {
        console.log(`    L${iss.line} [${iss.label}] ${iss.value}`);
      }
      if (r.issues.length > 8) console.log(`    … 另有 ${r.issues.length - 8} 处`);
    }
  }

  console.log("\n--- 全部文件清单 ---");
  for (const r of results) {
    const mark = r.status === "fail" ? "✗" : r.status === "ok_no_media" ? "○" : "✓";
    const cosNote = r.hasCos ? `COS×${r.cosMediaRefs || "?"}` : "无COS";
    console.log(`${mark} ${r.file.padEnd(58)} ${cosNote}${r.issueCount ? `  ⚠${r.issueCount}` : ""}`);
  }

  if (jsonOut) {
    fs.writeFileSync(jsonOut, JSON.stringify({ summary: { total: results.length, ok: ok.length, okNoMedia: okNoMedia.length, failed: failed.length }, results }, null, 2), "utf8");
    console.log(`\nJSON 报告: ${jsonOut}`);
  }

  process.exit(failed.length ? 1 : 0);
}

main();
