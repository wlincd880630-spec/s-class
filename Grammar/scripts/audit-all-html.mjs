#!/usr/bin/env node
/**
 * 全库 HTML 健康检查
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_RE = /^(L\d{2}(?:-[^/]+)?|L00-[^/]+)$/;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (["node_modules", ".git", "scripts"].includes(name)) continue;
      walkHtml(p, acc);
    } else if (name.endsWith(".html")) acc.push(p);
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
    return { kind: "remote", abs: null };
  }
  const lesson = lessonOf(htmlPath);
  if (lesson === "L13-定语从句" && u.startsWith("../")) {
    return { kind: "local", abs: path.normalize(path.join(path.dirname(htmlPath), u)) };
  }
  if (lesson && (u.startsWith("assets/") || u.startsWith("asset/") || u.startsWith("images/"))) {
    return { kind: "local", abs: path.normalize(path.join(ROOT, lesson, u)) };
  }
  return { kind: "local", abs: path.normalize(path.join(path.dirname(htmlPath), u)) };
}

const htmls = walkHtml(ROOT);
const issues = {
  brokenLightboxInJs: [],
  brokenScriptString: [],
  unclosedScript: [],
  multipleBody: [],
  missingCharset: [],
  missingLocalAsset: [],
  cosUrl: [],
  parentAssets: [],
  duplicateLightbox: [],
  scriptAfterHtml: [],
};

const LIGHTBOX_BAD =
  /"\s*<link rel="stylesheet" href="[^"]*lesson-image-lightbox|"  <link rel="stylesheet" href="[^"]*lesson-image-lightbox|<\/div>\s*<link rel="stylesheet" href="[^"]*lesson-image-lightbox/;

for (const fp of htmls) {
  const rel = path.relative(ROOT, fp);
  let c;
  try {
    c = fs.readFileSync(fp, "utf8");
  } catch (e) {
    issues.missingLocalAsset.push({ file: rel, url: "(read error) " + e.message });
    continue;
  }

  if (LIGHTBOX_BAD.test(c)) issues.brokenLightboxInJs.push(rel);

  // 引号未转义的常见破坏：在 + "..." 行内出现裸的 rel="stylesheet"（非 \"）
  const lines = c.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      /\+\s*"/.test(line) &&
      /rel="stylesheet"/.test(line) &&
      !/rel=\\"stylesheet\\"/.test(line) &&
      /lesson-image-lightbox/.test(line)
    ) {
      issues.brokenScriptString.push({ file: rel, line: i + 1, snippet: line.trim().slice(0, 100) });
    }
    if (/\+\s*"/.test(line) && /<\/body><\/html>/.test(line) === false && /<script src=/.test(line) && !/\\/.test(line.match(/<script/)?.[0] || "")) {
      // skip
    }
  }

  if (!/<meta\s+charset\s*=\s*["']utf-8["']/i.test(c.slice(0, 2000))) {
    issues.missingCharset.push(rel);
  }

  const bodyOpens = (c.match(/<body\b/gi) || []).length;
  const bodyCloses = (c.match(/<\/body>/gi) || []).length;
  if (bodyOpens !== 1 || bodyCloses < 1) {
    issues.multipleBody.push({ file: rel, opens: bodyOpens, closes: bodyCloses });
  }

  if (/cos\.ap-chengdu|s-class-1403296481/.test(c)) issues.cosUrl.push(rel);

  if (/\.\.\/assets\//.test(c) && !c.includes("../L13/assets/")) issues.parentAssets.push(rel);

  const lbCss = (c.match(/lesson-image-lightbox\.css/g) || []).length;
  const lbJs = (c.match(/lesson-image-lightbox\.js/g) || []).length;
  if (lbCss > 1 || lbJs > 1) issues.duplicateLightbox.push({ file: rel, css: lbCss, js: lbJs });

  // script 标签粗略平衡（忽略 type=application/json 等极少情况）
  const scriptOpens = (c.match(/<script\b/gi) || []).length;
  const scriptCloses = (c.match(/<\/script>/gi) || []).length;
  if (scriptOpens !== scriptCloses) {
    issues.unclosedScript.push({ file: rel, opens: scriptOpens, closes: scriptCloses });
  }

  // 本地资源
  for (const m of c.matchAll(/<(?:script|link)[^>]+(?:src|href)=["']([^"']+)["']/gi)) {
    const url = m[1];
    if (!url || url.startsWith("#") || url.startsWith("data:")) continue;
    if (/^https?:\/\//i.test(url)) continue;
    if (!/\.(js|mjs|css)(\?|$)/i.test(url)) continue;
    const r = resolveAsset(fp, url);
    if (r.abs && !fs.existsSync(r.abs)) {
      issues.missingLocalAsset.push({ file: rel, url, abs: path.relative(ROOT, r.abs) });
    }
  }

  // lightbox 在 </html> 之后
  const htmlEnd = c.lastIndexOf("</html>");
  const lbAfter = c.indexOf("lesson-image-lightbox", htmlEnd > 0 ? htmlEnd : 0);
  if (htmlEnd > 0 && lbAfter > htmlEnd) issues.scriptAfterHtml.push(rel);
}

// 去重 missing assets
const missMap = new Map();
for (const x of issues.missingLocalAsset) {
  missMap.set(x.abs + "|" + x.file, x);
}
const missingUnique = [...missMap.values()];

console.log("=== 全库 HTML 检查 ===");
console.log("HTML 文件数:", htmls.length);
console.log("");

function report(title, arr, limit = 30) {
  console.log(title + ":", arr.length);
  const list = Array.isArray(arr) ? arr : [];
  list.slice(0, limit).forEach((x) => {
    if (typeof x === "string") console.log("  -", x);
    else if (x.file) console.log("  -", x.file, x.line ? `L${x.line}` : "", x.url || x.snippet || x.opens != null ? JSON.stringify(x) : "");
    else console.log("  -", JSON.stringify(x));
  });
  if (list.length > limit) console.log("  ... 还有", list.length - limit, "条");
  console.log("");
}

report("1. JS 字符串内误插 lightbox（严重）", issues.brokenLightboxInJs);
report("2. 字符串拼接行含未转义 lightbox（严重）", issues.brokenScriptString);
report("3. script 标签数量不匹配", issues.unclosedScript);
report("4. body 标签异常", issues.multipleBody);
report("5. 缺少 utf-8 charset（前 2KB）", issues.missingCharset);
report("6. 仍含 COS 域名", issues.cosUrl);
report("7. 错误 ../assets/ 路径", issues.parentAssets);
report("8. lightbox 重复引用", issues.duplicateLightbox);
report("9. </html> 后仍有 lightbox", issues.scriptAfterHtml);
report("10. 本地 script/css 缺失", missingUnique, 40);

const critical =
  issues.brokenLightboxInJs.length +
  issues.brokenScriptString.length +
  issues.unclosedScript.length;

const warn = missingUnique.length + issues.cosUrl.length + issues.parentAssets.length;

console.log("---");
if (critical === 0 && warn === 0) {
  console.log("结论: 未发现严重问题；无警告项。");
} else if (critical === 0) {
  console.log("结论: 无严重脚本错误；有", warn, "项警告（多为 CDN/可选资源）。");
} else {
  console.log("结论: 发现", critical, "类严重问题，需修复。");
  process.exit(1);
}
