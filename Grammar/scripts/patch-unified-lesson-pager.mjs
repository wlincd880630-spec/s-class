#!/usr/bin/env node
/**
 * 统一课件页底栏：L13 风格 · 上一页 / 主页 / 下一页
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSON_RE = /^(L\d{2}(?:-[^/]+)?|L00-[^/]+)$/;
const SKIP_FILES = new Set(["index.html"]);
const NAV_RE =
  /<nav\s+class="[^"]*(?:lesson-pager|lesson-footer-nav)[^"]*"[^>]*>[\s\S]*?<\/nav>/gi;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (["node_modules", ".git", "scripts"].includes(name)) continue;
      walkHtml(p, acc);
    } else if (/\.html$/i.test(name)) acc.push(p);
  }
  return acc;
}

function lessonDirOf(fp) {
  const rel = path.relative(ROOT, fp);
  const top = rel.split(path.sep)[0];
  return LESSON_RE.test(top) ? path.join(ROOT, top) : null;
}

function homeHrefFor(lessonDir) {
  const rel = path.relative(lessonDir, ROOT).split(path.sep).filter(Boolean);
  const up = rel.map(() => "..").join("/");
  return (up ? up + "/" : "") + "index.html";
}

function parseOrderFromIndex(lessonDir) {
  const idx = path.join(lessonDir, "index.html");
  if (!fs.existsSync(idx)) return null;
  const html = fs.readFileSync(idx, "utf8");
  const hrefs = [];
  for (const m of html.matchAll(/<a\s+href="([^"#?]+\.html)"/gi)) {
    const h = m[1].trim();
    if (h.startsWith("../") || h.startsWith("http")) continue;
    if (/^index\.html$/i.test(h)) continue;
    if (!hrefs.includes(h)) hrefs.push(h);
  }
  return hrefs.length ? hrefs : null;
}

function fallbackOrder(lessonDir) {
  return fs
    .readdirSync(lessonDir)
    .filter((n) => /\.html$/i.test(n) && !SKIP_FILES.has(n))
    .sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function isIntraPagePager(navInner) {
  return /<button[^>]+class="pager-prev"/i.test(navInner) || /id="pager-prev"/i.test(navInner);
}

function logoHrefFromHome(homeHref) {
  const depth = homeHref.split("/").filter((p) => p === "..").length;
  return (depth ? "../".repeat(depth) : "") + "logo2.png";
}

function buildFileNav(prev, next, homeHref) {
  const prevEl = prev
    ? `<a class="pager-prev" href="${prev}">上一页</a>`
    : `<span class="pager-prev pager-muted" aria-disabled="true">上一页</span>`;
  const nextEl = next
    ? `<a class="pager-next" href="${next}">下一页</a>`
    : `<span class="pager-next pager-muted" aria-disabled="true">下一页</span>`;
  const logoSrc = logoHrefFromHome(homeHref);
  return `<nav class="lesson-pager is-file-nav" aria-label="页面导航">
    ${prevEl}
    <a class="pager-logo" href="${homeHref}" aria-label="课程主页"><img src="${logoSrc}" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
    ${nextEl}
  </nav>`;
}

function patchIntraPageNav(navBlock, homeHref) {
  let s = navBlock;
  s = s.replace(/<button([^>]*class="pager-prev"[^>]*)>[^<]*<\/button>/i, "<button$1>上一页</button>");
  s = s.replace(/<button([^>]*class="pager-next"[^>]*)>[^<]*<\/button>/i, "<button$1>下一页</button>");
  s = s.replace(/<a class="l13-index-link"[^>]*>[\s\S]*?<\/a>\s*/gi, "");
  s = s.replace(/<a class="lesson-index-link"[^>]*>[\s\S]*?<\/a>\s*/gi, "");
  s = s.replace(/<a class="pager-logo"[^>]*>[\s\S]*?<\/a>\s*/gi, "");
  s = s.replace(/<a class="pager-home[^"]*"[^>]*>[\s\S]*?<\/a>\s*/gi, "");
  const logoSrc = logoHrefFromHome(homeHref);
  const logoLink = `<a class="pager-logo" href="${homeHref}" aria-label="课程主页"><img src="${logoSrc}" alt="Steven's Class" width="80" height="32" decoding="async" /></a>`;
  const intraRe =
    /<nav class="lesson-pager"([^>]*)>\s*<button([^>]*class="pager-prev"[^>]*)>[\s\S]*?<\/button>\s*(?:<a class="pager-(?:home|logo)[^"]*"[^>]*>[\s\S]*?<\/a>\s*)?<span([^>]*class="pager-mid"[^>]*)>[\s\S]*?<\/span>\s*<button([^>]*class="pager-next"[^>]*)>[\s\S]*?<\/button>\s*<\/nav>/i;
  if (intraRe.test(s)) {
    s = s.replace(intraRe, (block, navRest, _p, _m, _n) => {
      const prevBtn = block.match(/<button[^>]*class="pager-prev"[^>]*>[\s\S]*?<\/button>/i)?.[0] || "";
      const midSpan = block.match(/<span[^>]*class="pager-mid"[^>]*>[\s\S]*?<\/span>/i)?.[0] || "";
      const nextBtn = block.match(/<button[^>]*class="pager-next"[^>]*>[\s\S]*?<\/button>/i)?.[0] || "";
      return `<nav class="lesson-pager is-intra-nav"${navRest}>
      <div class="pager-zone pager-zone--left">
        ${prevBtn}
      </div>
      ${logoLink}
      <div class="pager-zone pager-zone--right">
        ${midSpan}
        ${nextBtn}
      </div>
    </nav>`;
    }
    if (!/is-intra-nav/.test(s)) {
      s = s.replace(/<nav class="lesson-pager"/, '<nav class="lesson-pager is-intra-nav"');
    }
    return s;
  }
  if (/<button[^>]*class="pager-prev"/i.test(s)) {
    s = s.replace(
      /(<button[^>]*class="pager-prev"[^>]*>上一页<\/button>)/i,
      `$1\n      ${logoLink}`
    );
  } else {
    s = s.replace(/(<nav class="lesson-pager"[^>]*>)/i, `$1\n      ${logoLink}`);
  }
  return s;
}

function pagerCssHref(fp, lessonDir) {
  const assets = path.join(lessonDir, "assets");
  if (fs.existsSync(assets)) return "assets/grammar-lesson-pager.css";
  const rel = path.relative(path.dirname(fp), ROOT).split(path.sep).filter(Boolean);
  return rel.map(() => "..").concat("grammar-lesson-pager.css").join("/");
}

function ensureCssLink(html, href) {
  if (html.includes("grammar-lesson-pager.css")) return html;
  const link = `  <link rel="stylesheet" href="${href}" />\n`;
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, link + "</head>");
  return link + html;
}

function ensureBodyClass(html) {
  if (/class="[^"]*has-lesson-pager/.test(html)) return html;
  return html.replace(/<body(\s[^>]*)?>/i, (m, attrs) => {
    const a = attrs || "";
    if (/class="/i.test(a)) {
      return m.replace(/class="([^"]*)"/, 'class="$1 has-lesson-pager"');
    }
    return "<body" + a + ' class="has-lesson-pager">';
  });
}

const orderCache = new Map();
let cssCopied = 0;
let patched = 0;
let intra = 0;

for (const fp of walkHtml(ROOT)) {
  const base = path.basename(fp);
  if (base === "index.html" && path.dirname(fp) === ROOT) continue;
  if (SKIP_FILES.has(base) && lessonDirOf(fp)) continue;

  const lessonDir = lessonDirOf(fp);
  if (!lessonDir) continue;

  if (!orderCache.has(lessonDir)) {
    orderCache.set(lessonDir, parseOrderFromIndex(lessonDir) || fallbackOrder(lessonDir));
  }
  const order = orderCache.get(lessonDir);
  const fileName = base;
  const idx = order.indexOf(fileName);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
  const homeHref = homeHrefFor(lessonDir);

  let html = fs.readFileSync(fp, "utf8");
  const orig = html;
  const navMatch = html.match(NAV_RE);

  if (navMatch) {
    const blocks = [...html.matchAll(NAV_RE)];
    for (const b of blocks) {
      const block = b[0];
      if (isIntraPagePager(block)) {
        html = html.replace(block, patchIntraPageNav(block, homeHref));
        intra++;
      } else {
        html = html.replace(block, buildFileNav(prev, next, homeHref));
      }
    }
  } else if (
    (order.includes(fileName) || /\.html$/i.test(fileName)) &&
    !/lesson-pager is-file-nav/.test(html)
  ) {
    const nav = buildFileNav(prev, next, homeHref);
    if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, nav + "\n</body>");
    else html += "\n" + nav;
  }

  const cssHref = pagerCssHref(fp, lessonDir);
  const assetsDir = path.join(lessonDir, "assets");
  if (fs.existsSync(assetsDir)) {
    const dest = path.join(assetsDir, "grammar-lesson-pager.css");
    fs.copyFileSync(path.join(ROOT, "grammar-lesson-pager.css"), dest);
    cssCopied++;
  }

  html = ensureCssLink(html, cssHref);
  html = ensureBodyClass(html);

  if (html !== orig) {
    fs.writeFileSync(fp, html, "utf8");
    patched++;
    console.log("OK", path.relative(ROOT, fp));
  }
}

console.log("\nPatched:", patched, "| intra-page:", intra, "| css copies:", cssCopied);
