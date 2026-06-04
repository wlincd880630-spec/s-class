#!/usr/bin/env node
/**
 * 出版级校对总报告（汇总各 audit 脚本逻辑，一次输出）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_RE = /^(L\d{2}(?:-[^/]+)?|L00-[^/]+)$/;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (["node_modules", ".git", "scripts", "handout2"].includes(name)) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkHtml(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const htmls = walkHtml(ROOT);
const report = {
  totalHtml: htmls.length,
  indexBroken: [],
  pagerBroken: [],
  cosUrls: [],
  missingCssJs: [],
  ttsNoBootstrap: [],
  handoutNotes: [],
  fragmentInserts: 0,
};

// index links
for (const fp of htmls) {
  if (path.basename(fp) !== "index.html") continue;
  const c = fs.readFileSync(fp, "utf8");
  const relDir = path.relative(ROOT, path.dirname(fp));
  const nums = [...c.matchAll(/<span class="num">(\d+)<\/span>/g)].map((x) => +x[1]);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      report.indexBroken.push(`${relDir}/index.html 序号第${i + 1}项为 ${nums[i]}`);
      break;
    }
  }
  for (const m of c.matchAll(/href=["']([^"'#?]+)["']/gi)) {
    const href = m[1].trim();
    if (!href.endsWith(".html")) continue;
    const t = path.normalize(path.join(path.dirname(fp), href));
    if (!fs.existsSync(t)) report.indexBroken.push(`${relDir}/index.html → ${href}`);
  }
}

// pager hrefs
for (const fp of htmls) {
  const c = fs.readFileSync(fp, "utf8");
  if (!/lesson-pager/i.test(c)) continue;
  const rel = path.relative(ROOT, fp);
  for (const m of c.matchAll(/<a[^>]*href=["']([^"'#]+)["'][^>]*class="[^"]*pager-(?:prev|next)/gi)) {
    const href = m[1].trim();
    if (!href.endsWith(".html")) continue;
    const t = path.normalize(path.join(path.dirname(fp), href));
    if (!fs.existsSync(t)) report.pagerBroken.push(`${rel} → ${href}`);
  }
  for (const m of c.matchAll(/class="[^"]*pager-(?:prev|next)[^"]*"[^>]*href=["']([^"'#]+)["']/gi)) {
    const href = m[1].trim();
    if (!href.endsWith(".html")) continue;
    const t = path.normalize(path.join(path.dirname(fp), href));
    if (!fs.existsSync(t)) report.pagerBroken.push(`${rel} → ${href}`);
  }
}

// cos, css/js, tts bootstrap
for (const fp of htmls) {
  const rel = path.relative(ROOT, fp);
  const c = fs.readFileSync(fp, "utf8");
  if (/cos\.ap-chengdu|s-class-1403296481/.test(c)) report.cosUrls.push(rel);
  if (/-classroom-flow-insert\.html$/i.test(rel)) report.fragmentInserts++;

  const hasVoice = /🔊|朗读|tts-chip|playEnglish|LessonSpeak|btn-tts|speaker-dot/i.test(c);
  const hasBoot = /lesson-tts-bootstrap\.js/.test(c);
  if (hasVoice && !hasBoot && !/-classroom-flow-insert/i.test(rel)) {
    if (!/lesson-tts-azure-play|L03AudioManifest|l06-page02/i.test(c)) {
      report.ttsNoBootstrap.push(rel);
    }
  }

  for (const m of c.matchAll(/<(?:script|link)[^>]+(?:src|href)=["']([^"']+)["']/gi)) {
    const url = m[1];
    if (!url || /^https?:\/\//i.test(url) || url.startsWith("data:")) continue;
    if (!/\.(js|css)(\?|$)/i.test(url)) continue;
    const lesson = rel.split(path.sep)[0];
    let abs;
    if (LESSON_RE.test(lesson) && url.startsWith("assets/")) abs = path.join(ROOT, lesson, url);
    else if (url.startsWith("../shared/")) abs = path.join(ROOT, "shared", url.replace(/^\.\.\/shared\//, ""));
    else abs = path.normalize(path.join(path.dirname(fp), url));
    if (!fs.existsSync(abs)) report.missingCssJs.push({ rel, url });
  }
}

// handout: 新模板用 grammar-handout-top，非 doc-title
for (const fp of htmls) {
  const rel = path.relative(ROOT, fp);
  if (!/handout/i.test(rel) || !/grammar-handout-page/.test(fs.readFileSync(fp, "utf8"))) continue;
  const c = fs.readFileSync(fp, "utf8");
  if (!/grammar-handout-top/.test(c)) report.handoutNotes.push(`${rel}: 缺 grammar-handout-top`);
  if (!/btnHandoutPrint|btn-handout-pdf/.test(c)) report.handoutNotes.push(`${rel}: 缺打印按钮`);
}

console.log("=== 出版级校对总报告 ===\n");
console.log("HTML 总数:", report.totalHtml);
console.log("片段 insert（无 body，可忽略）:", report.fragmentInserts);
console.log("\n【必修】");
console.log("  目录 index 断裂:", report.indexBroken.length || "无");
report.indexBroken.forEach((x) => console.log("    -", x));
console.log("  分页 prev/next 断裂:", report.pagerBroken.length || "无");
report.pagerBroken.forEach((x) => console.log("    -", x));
console.log("  本地 CSS/JS 缺失:", report.missingCssJs.length || "无");
report.missingCssJs.slice(0, 20).forEach((x) => console.log("    -", x.rel, x.url));
if (report.missingCssJs.length > 20) console.log("    ...", report.missingCssJs.length - 20, "条");

console.log("\n【建议】");
console.log("  COS 外链残留:", report.cosUrls.length || "无");
console.log("  有语音未引 bootstrap:", report.ttsNoBootstrap.length || "无");
report.ttsNoBootstrap.forEach((x) => console.log("    -", x));
console.log("  讲义结构异常:", report.handoutNotes.length || "无");
report.handoutNotes.forEach((x) => console.log("    -", x));

const r = spawnSync(process.execPath, ["scripts/audit-tts-local.mjs"], { cwd: ROOT, encoding: "utf8" });
const ttsOut = (r.stdout || "").split("\n").slice(0, 12).join("\n");
console.log("\n【TTS 审计摘要】\n" + ttsOut);

const critical =
  report.indexBroken.length + report.pagerBroken.length + report.missingCssJs.length + report.cosUrls.length;
process.exitCode = critical > 0 ? 1 : 0;
