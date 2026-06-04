import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "handout-catalog.json"), "utf8")
);

function pad2(n) {
  return String(n).padStart(2, "0");
}

function relToRoot(fromDir) {
  const rel = path.relative(fromDir, ROOT).split(path.sep).filter(Boolean);
  return rel.length ? rel.map(() => "..").join("/") + "/" : "";
}

function ensureHeadLinks(html, prefix) {
  const links = [
    `<link rel="stylesheet" href="${prefix}grammar-handout.css" />`,
    `<link rel="stylesheet" href="${prefix}grammar-lesson-pager.css" />`,
    `<link rel="stylesheet" href="${prefix}grammar-logo.css" />`,
  ];
  let out = html;
  for (const link of links) {
    const href = link.match(/href="([^"]+)"/)[1];
    if (!out.includes(href)) {
      out = out.replace(/<\/head>/i, `  ${link}\n</head>`);
    }
  }
  if (!out.includes("grammar-handout.js")) {
    out = out.replace(
      /<\/body>/i,
      `  <script src="${prefix}grammar-handout.js" defer></script>\n</body>`
    );
  }
  return out;
}

function ensureBodyClass(html, variant) {
  const extra = ["grammar-handout-page", "has-lesson-pager"];
  if (variant === "interactive") extra.push("grammar-handout--interactive");
  return html.replace(/<body(\s[^>]*)?>/i, (m, attrs = "") => {
    const classes = extra.join(" ");
    if (/class="/.test(m)) {
      return m.replace(/class="([^"]*)"/, (_, c) => {
        const set = new Set(c.split(/\s+/).filter(Boolean));
        extra.forEach((x) => set.add(x));
        return `class="${[...set].join(" ")}"`;
      });
    }
    return `<body${attrs} class="${classes}">`;
  });
}

const HANDOUT_BRAND = "Steven's Class";

function buildChrome(meta, prefix) {
  return `  <header class="grammar-handout-top">
    <div class="top-bar-main">
      <strong>${meta.topic}</strong>
      <span class="subtitle-line">${HANDOUT_BRAND}</span>
    </div>
    <a class="grammar-handout-index-link" href="index.html">本讲目录</a>
  </header>
  <p class="grammar-handout-print-hint no-print">打印：浏览器「打印」→ 勾选「背景图形」→ 另存为 PDF（单栏）。屏幕底栏导航在打印时自动隐藏。</p>
  <div class="grammar-handout-pdf-bar no-print">
    <button type="button" class="btn-handout-pdf" id="btnHandoutPrint">打印 / 另存 PDF</button>
  </div>
`;
}

function stripOldChrome(html) {
  return html
    .replace(/<header class="(?:l13-handout-top|grammar-handout-top)"[\s\S]*?<\/header>\s*/gi, "")
    .replace(/<p class="(?:grammar-handout-print-hint|no-print-hint)[^"]*"[^>]*>[\s\S]*?<\/p>\s*/gi, "")
    .replace(
      /<div class="(?:grammar-handout-pdf-bar|handout-pdf-bar)[^"]*"[^>]*>[\s\S]*?<\/div>\s*/gi,
      ""
    )
    .replace(/<section class="intro">[\s\S]*?<\/section>\s*/gi, "");
}

function fixBrokenIntroInSection(html) {
  return html.replace(
    /<section id="([^"]+)">\s*<section class="intro">([\s\S]*?)<\/section>\s*<h2/g,
    `<section class="intro">$2</section>\n\n      <section id="$1">\n        <h2`
  );
}

function injectChrome(html, chrome) {
  const cleaned = stripOldChrome(html);
  return cleaned.replace(/<body[^>]*>/i, (m) => `${m}\n${chrome}`);
}

function dedupeHeadLinks(html) {
  const seen = new Set();
  return html.replace(/<link rel="stylesheet" href="([^"]+)"\s*\/>/g, (m, href) => {
    if (seen.has(href)) return "";
    seen.add(href);
    return m;
  });
}

function standardTitle(meta) {
  return meta.topic;
}

function standardSubtitle() {
  return HANDOUT_BRAND;
}

function patchTitles(html, meta) {
  const title = standardTitle(meta);
  const sub = standardSubtitle();
  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

  if (/<h1 class="doc-title">/.test(out)) {
    out = out.replace(/<h1 class="doc-title">[^<]*<\/h1>/i, `<h1 class="doc-title">${title}</h1>`);
  } else if (meta.variant === "table" && /<h1>/.test(out)) {
    out = out.replace(/<h1>[^<]*<\/h1>/i, `<h1 class="doc-title">${title}</h1>`);
  }

  if (/<p class="doc-subtitle">/.test(out)) {
    out = out.replace(/<p class="doc-subtitle">[^<]*<\/p>/i, `<p class="doc-subtitle">${sub}</p>`);
  } else if (/<h1 class="doc-title">/.test(out) && !/<p class="doc-subtitle">/.test(out)) {
    out = out.replace(
      /(<h1 class="doc-title">[\s\S]*?<\/h1>)/i,
      `$1\n      <p class="doc-subtitle">${sub}</p>`
    );
  } else if (meta.variant === "table" && /<p class="sub">/.test(out)) {
    out = out.replace(/<p class="sub">[^<]*<\/p>/i, `<p class="doc-subtitle">${sub}</p>`);
  }

  return out;
}

function ensurePrintHeader(html) {
  if (/<div class="print-header">/.test(html)) return html;
  const block = `      <div class="print-header">
        <div class="field"><label>姓名</label><div class="line"></div></div>
        <div class="field"><label>日期</label><div class="line"></div></div>
      </div>
`;
  if (/<p class="doc-subtitle">/.test(html)) {
    return html.replace(/(<p class="doc-subtitle">[\s\S]*?<\/p>)/i, `$1\n${block}`);
  }
  if (/<h1 class="doc-title">/.test(html)) {
    return html.replace(/(<h1 class="doc-title">[\s\S]*?<\/h1>)/i, `$1\n${block}`);
  }
  return html;
}

const INTRO_HTML = `<section class="intro">
        <strong>使用方法：</strong>① 熟读公式与口诀 ② 对照例句理解用法 ③ 完成默写与易错自测。
        建议每天 <strong>15 分钟</strong>：朗读例句 → 中译英或英译中 1～2 句 → 对照易错点自改。
      </section>`;

function ensureIntro(html) {
  if (/<section class="intro">/.test(html)) {
    return html.replace(/<section class="intro">[\s\S]*?<\/section>/i, INTRO_HTML);
  }
  if (/<main class="sheet"/.test(html) && /<h2 class="section-title">/.test(html)) {
    return html.replace(/(<h2 class="section-title">)/i, `${INTRO_HTML}\n\n      $1`);
  }
  return html;
}

function normalizeIndexLink(html) {
  return html
    .replace(/class="l13-index-link"/g, 'class="grammar-handout-index-link"')
    .replace(/<a class="lesson-index-link"[^>]*>[\s\S]*?<\/a>/gi, "");
}

function wrapTableVariant(html, meta) {
  if (!html.includes('class="wrap"')) return html;
  if (html.includes("grammar-handout-table-wrap")) return html;
  const title = standardTitle(meta);
  const sub = standardSubtitle(meta);
  let out = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
  out = out.replace(/<p class="(?:sub|doc-subtitle)">[\s\S]*?<\/p>\s*/i, "");
  return out.replace(
    /<div class="wrap">/,
    `<div class="wrap grammar-handout-table-wrap">
    <h1 class="doc-title">${title}</h1>
    <p class="doc-subtitle">${sub}</p>`
  );
}

function ensureMainSheet(html) {
  if (/<main class="sheet"/.test(html)) return html;
  return html;
}

let count = 0;
for (const [rel, meta] of Object.entries(CATALOG)) {
  const fp = path.join(ROOT, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fp)) {
    console.warn("missing", rel);
    continue;
  }
  const dir = path.dirname(fp);
  const prefix = relToRoot(dir);
  let html = fs.readFileSync(fp, "utf8");

  html = ensureHeadLinks(html, prefix);
  html = dedupeHeadLinks(html);
  html = ensureBodyClass(html, meta.variant);
  html = injectChrome(html, buildChrome(meta, prefix));
  html = patchTitles(html, meta);
  html = normalizeIndexLink(html);

  if (meta.variant === "sheet") {
    html = fixBrokenIntroInSection(html);
    html = ensurePrintHeader(html);
    html = ensureIntro(html);
    html = ensureMainSheet(html);
  }
  if (meta.variant === "table") {
    html = wrapTableVariant(html, meta);
  }

  fs.writeFileSync(fp, html, "utf8");
  console.log("OK", rel);
  count++;
}

// 复制静态资源到各讲 assets（若存在）
const staticFiles = ["grammar-handout.css", "grammar-handout.js", "grammar-lesson-pager.css"];
for (const dir of fs.readdirSync(ROOT)) {
  const assets = path.join(ROOT, dir, "assets");
  if (!fs.statSync(path.join(ROOT, dir)).isDirectory()) continue;
  if (!fs.existsSync(assets)) continue;
  if (!/^L\d{2}/.test(dir) && !dir.startsWith("L00-")) continue;
  for (const f of staticFiles) {
    const src = path.join(ROOT, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(assets, f));
  }
}

console.log("\nPatched", count, "handout pages");
