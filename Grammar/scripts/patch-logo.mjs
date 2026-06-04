import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO_CSS = '  <link rel="stylesheet" href="LOGO_CSS_HREF" />\n';

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

function relToRoot(fromFile) {
  const dir = path.dirname(fromFile);
  const rel = path.relative(dir, ROOT).split(path.sep).filter(Boolean);
  if (!rel.length) return "";
  return rel.map(() => "..").join("/") + "/";
}

function logoCssHref(fromFile) {
  const prefix = relToRoot(fromFile);
  return prefix + "grammar-logo.css";
}

function logoImgHref(fromFile) {
  return relToRoot(fromFile) + "logo2.png";
}

function homeHrefForLessonPage(fromFile) {
  const dir = path.dirname(fromFile);
  const rel = path.relative(dir, ROOT).split(path.sep).filter(Boolean);
  return (rel.length ? rel.map(() => "..").join("/") + "/" : "") + "index.html";
}

function homeHrefForLessonIndex(fromFile) {
  return relToRoot(fromFile) + "index.html";
}

function ensureLogoCss(html, fromFile) {
  const href = logoCssHref(fromFile);
  if (html.includes("grammar-logo.css")) return html;
  const link = LOGO_CSS.replace("LOGO_CSS_HREF", href);
  if (html.includes("grammar-lesson-pager.css")) {
    return html.replace(
      /(<link rel="stylesheet" href="[^"]*grammar-lesson-pager\.css" \/>)\n?/,
      `$1\n${link}`
    );
  }
  if (html.includes("grammar-index-scale.css")) {
    return html.replace(
      /(<link rel="stylesheet" href="[^"]*grammar-index-scale\.css" \/>)\n?/,
      `$1\n${link}`
    );
  }
  if (html.includes("grammar-index.css")) {
    return html.replace(
      /(<link rel="stylesheet" href="(?:\.\.\/)?grammar-index\.css" \/>)\n?/,
      `$1\n${link}`
    );
  }
  if (html.includes("l00-unified-pager.css")) {
    return html.replace(
      /(<link rel="stylesheet" href="[^"]*l00-unified-pager\.css" \/>)\n?/,
      `$1\n${link}`
    );
  }
  return html.replace("</head>", `${link}</head>`);
}

function patchIndexLogo(html, fromFile) {
  if (html.includes("g-index-logo")) return html;
  const logoSrc = logoImgHref(fromFile);
  const isRoot = path.dirname(fromFile) === ROOT;
  const homeHref = isRoot ? "index.html" : "index.html";
  const block = `    <p class="g-index-logo-wrap">
      <a href="${homeHref}" aria-label="课程主页">
        <img class="g-index-logo" src="${logoSrc}" alt="Steven's Class" width="480" height="104" decoding="async" />
      </a>
    </p>
`;
  // 插入在 g-index-brand 之前
  if (html.includes('class="g-index-brand"')) {
    return html.replace(/(\s*<p class="g-index-brand">)/, `${block}$1`);
  }
  return html.replace(/(<main class="g-index[^"]*">)/, `$1\n${block}`);
}

function resolveHomeFromPagerHome(navBlock, fromFile) {
  const m = navBlock.match(/class="pager-home"[^>]*href="([^"]+)"/i);
  if (m) return m[1];
  const m2 = navBlock.match(/class="pager-lesson-index"[^>]*href="([^"]+)"/i);
  if (m2) return m2[1];
  return homeHrefForLessonPage(fromFile);
}

function logoAnchor(homeHref, logoSrc) {
  return `<a class="pager-logo" href="${homeHref}" aria-label="课程主页"><img src="${logoSrc}" alt="Steven's Class" width="204" height="61" decoding="async" /></a>`;
}

function patchPagerLogo(html, fromFile) {
  const logoSrc = logoImgHref(fromFile);
  const NAV_RE = /<nav\s+class="[^"]*lesson-pager[^"]*"[^>]*>[\s\S]*?<\/nav>/gi;

  return html.replace(NAV_RE, (navBlock) => {
    if (navBlock.includes('class="pager-logo"') && navBlock.includes("<img")) return navBlock;

    const homeHref = resolveHomeFromPagerHome(navBlock, fromFile);

    // 已有独立 pager-logo
    let s = navBlock;

    // 将 pager-home 文字主页 改为带图（单页多屏）
    s = s.replace(
      /<a\s+class="pager-home"([^>]*)>[\s\S]*?<\/a>/i,
      `<a class="pager-home pager-home--logo"$1 aria-label="课程主页"><img src="${logoSrc}" alt="Steven's Class" width="204" height="61" decoding="async" /></a>`
    );

    // 若无 pager-home（file-nav 等），在首个子元素后插入居中 logo
    if (!/class="pager-home/i.test(s) && !/class="pager-logo"/i.test(s)) {
      s = s.replace(
        /(<nav[^>]*>)\s*/,
        `$1\n    ${logoAnchor(homeHref, logoSrc)}\n    `
      );
    } else if (!/class="pager-logo"/i.test(s)) {
      // 有 pager-home--logo 时仍加 pager-logo 供 L00 等；若已改 home 则加独立 logo
      if (/is-l00-unified/i.test(s)) {
        s = s.replace(
          /(<nav[^>]*>)\s*/,
          `$1\n    ${logoAnchor(homeHref, logoSrc)}\n    `
        );
      }
    }

    // L00：保留课程列表，居中用 pager-logo（home 指向总目录）
    if (/is-l00-unified/i.test(s)) {
      const rootHome = homeHrefForLessonPage(fromFile);
      if (!s.includes('class="pager-logo"')) {
        s = s.replace(
          /(<nav[^>]*>)\s*/,
          `$1\n    ${logoAnchor(rootHome, logoSrc)}\n    `
        );
      }
    }

    // file-nav：居中 Logo，去掉文字「主页」避免重复
    if (/is-file-nav/i.test(s)) {
      if (/class="pager-home--logo"/i.test(s)) {
        s = s.replace(/\s*<a class="pager-logo"[^>]*>[\s\S]*?<\/a>\s*/i, "\n    ");
      } else if (/class="pager-logo"/i.test(s) && /class="pager-home"/i.test(s)) {
        s = s.replace(/\s*<a class="pager-home"[^>]*>[\s\S]*?<\/a>\s*/i, "\n    ");
      } else if (!/class="pager-logo"/i.test(s) && !/class="pager-home"/i.test(s)) {
        s = s.replace(
          /(<nav[^>]*>)\s*([\s\S]*?)(\s*<\/nav>)/i,
          (full, open, inner, close) => {
            const prevM = inner.match(/<(a|span)[^>]*class="pager-prev"[\s\S]*?<\/\1>/i);
            const nextM = inner.match(/<(a|span)[^>]*class="pager-next"[\s\S]*?<\/\1>/i);
            const prev = prevM ? prevM[0] : "";
            const next = nextM ? nextM[0] : "";
            return `${open}\n    ${prev}\n    ${logoAnchor(homeHref, logoSrc)}\n    ${next}\n  ${close}`;
          }
        );
      }
    }

    return s;
  });
}

let indexCount = 0;
let pagerCount = 0;

for (const file of walkHtml(ROOT)) {
  const base = path.basename(file);
  const isIndex = base === "index.html";
  const isLessonHtml = /\.html$/i.test(base) && !isIndex;

  let html = fs.readFileSync(file, "utf8");
  const orig = html;

  html = ensureLogoCss(html, file);

  if (isIndex && html.includes("g-index")) {
    html = patchIndexLogo(html, file);
    if (html !== orig) indexCount++;
  }

  if (html.includes("lesson-pager") && isLessonHtml) {
    const before = html;
    html = patchPagerLogo(html, file);
    if (html !== before) pagerCount++;
  }

  if (html !== orig || html !== fs.readFileSync(file, "utf8")) {
    fs.writeFileSync(file, html, "utf8");
  }
}

// 根 index 的 logo 链接应为 index.html
const rootIdx = path.join(ROOT, "index.html");
let rh = fs.readFileSync(rootIdx, "utf8");
rh = rh.replace('href="index.html" aria-label="课程主页"', 'href="index.html" aria-label="Steven's Class 主页"');
if (!rh.includes("grammar-logo.css")) {
  rh = ensureLogoCss(rh, rootIdx);
}
fs.writeFileSync(rootIdx, rh, "utf8");

console.log("index pages with logo:", indexCount);
console.log("lesson pages pager logo:", pagerCount);
