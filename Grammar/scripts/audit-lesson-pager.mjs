import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const issues = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (["node_modules", ".git", "scripts"].includes(name)) continue;
      walk(p);
    } else if (/\.html$/i.test(name)) {
      check(p);
    }
  }
}

function check(fp) {
  const html = fs.readFileSync(fp, "utf8");
  if (!/<nav[^>]*lesson-pager/i.test(html)) return;

  const rel = path.relative(ROOT, fp).replace(/\\/g, "/");
  const navM = html.match(/<nav class="lesson-pager[^"]*"[^>]*>([\s\S]*?)<\/nav>/i);
  const inner = navM ? navM[1] : "";

  const kids = [];
  for (const m of inner.matchAll(/<(?:a|button|span)\s+[^>]*class="([^"]*)"[^>]*>/gi)) {
    const cls = m[1];
    let key = cls
      .split(/\s+/)
      .find((c) => /^pager-/.test(c) || /^lesson-index/.test(c) || /^l13-index/.test(c));
    if (cls.includes("pager-home--logo")) key = "pager-logo";
    if (key) kids.push(key);
  }

  const problems = [];
  const hasPagerCss = /grammar-lesson-pager\.css/.test(html);
  const hasLogoCss = /grammar-logo\.css/.test(html);
  const hasBody = /has-lesson-pager/.test(html);
  const isFile = /is-file-nav/.test(html);
  const isL00 = /is-l00-unified/.test(html);
  const hasZone = /pager-zone/.test(inner);
  const logoTags = (inner.match(/pager-logo|pager-home--logo/g) || []).length;

  if (!hasPagerCss) problems.push("缺 grammar-lesson-pager.css");
  if (!hasLogoCss) problems.push("缺 grammar-logo.css");
  if (!hasBody) problems.push("body 无 has-lesson-pager");
  if (!logoTags) problems.push("无 Logo");
  if (logoTags > 1) problems.push("Logo 重复 ×" + logoTags);
  if (/pager-home--logo/.test(inner)) problems.push("仍用 pager-home--logo（建议 pager-logo）");
  if (isL00 && !hasZone) problems.push("L00 未使用 pager-zone 三区");
  if (isFile && kids.length !== 3) {
    problems.push(`is-file-nav 应有 3 项，实际 ${kids.length}：${kids.join(", ")}`);
  }

  const isIntra =
    /is-intra-nav/.test(html) || /button[^>]*pager-prev|id="pager-prev"/i.test(inner);
  if (isIntra && !isL00 && !isFile) {
    if (!/is-intra-nav/.test(html)) problems.push("课内翻页未加 is-intra-nav");
    if (!hasZone) problems.push("课内翻页未使用 pager-zone 三区");
    const order = kids.join(" → ");
    const iPrev = kids.indexOf("pager-prev");
    const iMid = kids.indexOf("pager-mid");
    const iLogo = kids.findIndex((k) => k === "pager-logo" || k === "pager-home--logo");
    const iNext = kids.lastIndexOf("pager-next");
    if (iLogo < 0) problems.push("课内翻页缺 Logo");
    else if (iMid >= 0 && (iLogo > iMid || iLogo < iPrev)) {
      problems.push(`Logo/页码顺序异常：${order}`);
    }
  }

  if (problems.length) {
    issues.push({ rel, problems, kids: kids.join(" | ") });
  }
}

walk(ROOT);

// CSS 是否与根目录同步
const rootCss = fs.readFileSync(path.join(ROOT, "grammar-lesson-pager.css"), "utf8");
const stale = [];
for (const dir of fs.readdirSync(ROOT)) {
  const assets = path.join(ROOT, dir, "assets", "grammar-lesson-pager.css");
  if (!fs.existsSync(assets)) continue;
  if (fs.readFileSync(assets, "utf8") !== rootCss) stale.push(dir + "/assets/grammar-lesson-pager.css");
}

console.log("导航问题文件:", issues.length);
for (const x of issues) {
  console.log("\n" + x.rel);
  console.log("  " + x.problems.join("\n  "));
  if (x.kids) console.log("  [" + x.kids + "]");
}
console.log("\n过期 pager CSS:", stale.length ? stale.join(", ") : "无");
