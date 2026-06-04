import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courses = ["L00-主谓宾与非谓语", "L00-主系表与非谓语"];

const pagerByPage = {
  page1: { prev: '<span class="pager-prev pager-muted" aria-disabled="true">上一页</span>', next: '<a class="pager-next" href="page2.html">下一页</a>' },
  page2: { prev: '<a class="pager-prev" href="page1.html">上一页</a>', next: '<a class="pager-next" href="page3.html">下一页</a>' },
  page3: { prev: '<a class="pager-prev" href="page2.html">上一页</a>', next: '<a class="pager-next" href="page4.html">下一页</a>' },
  page4: { prev: '<a class="pager-prev" href="page3.html">上一页</a>', next: '<span class="pager-next pager-muted" aria-disabled="true">下一页</span>' },
};

const unifiedNav = (prev, next, listTitle, rootHome, logoSrc) => `  <nav class="lesson-pager is-l00-unified" aria-label="页面导航">
    <div class="pager-zone pager-zone--left">
      ${prev}
      <a class="pager-lesson-index" href="index.html" title="${listTitle}">课程列表</a>
    </div>
    <a class="pager-logo" href="${rootHome}" aria-label="课程总目录"><img src="${logoSrc}" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
    <div class="pager-zone pager-zone--right">
      <button type="button" class="pager-step-prev" id="navPrevStep" disabled title="撤回本课内上一步">← 上一步</button>
      <button type="button" class="pager-step-next" id="nextBtn">下一步 →</button>
      ${next}
    </div>
  </nav>`;

const footerRe = /\s*<div class="footer-bar">\s*<div class="footer-toolbar">[\s\S]*?<\/div>\s*<\/div>\s*\n/;

const oldNavRe = /<nav class="lesson-pager(?: is-(?:file-nav|l00-unified))?" aria-label="[^"]*">[\s\S]*?<\/nav>/;

const cssLink = '  <link rel="stylesheet" href="assets/l00-unified-pager.css" />\n';

for (const course of courses) {
  const dir = path.join(root, course);
  const assetsSrc = path.join(root, "L00-主谓宾与非谓语", "assets", "l00-unified-pager.css");
  const assetsDst = path.join(dir, "assets", "l00-unified-pager.css");
  fs.copyFileSync(assetsSrc, assetsDst);

  const listTitle =
    course.includes("主谓宾") ? "返回主谓宾课程列表" : "返回主系表课程列表";

  for (const [page, links] of Object.entries(pagerByPage)) {
    const file = path.join(dir, `${page}.html`);
    let html = fs.readFileSync(file, "utf8");

    if (!footerRe.test(html)) {
      console.warn("no footer-bar:", file);
    } else {
      html = html.replace(footerRe, "\n");
    }

    const rootHome = "../index.html";
  const logoSrc = "../logo2.png";
  const nav = unifiedNav(links.prev, links.next, listTitle, rootHome, logoSrc);
    if (!oldNavRe.test(html)) {
      console.warn("no old nav:", file);
      continue;
    }
    html = html.replace(oldNavRe, nav);

    if (!html.includes("l00-unified-pager.css")) {
      html = html.replace(
        /(<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css" \/>)/,
        `$1\n${cssLink.trim()}`
      );
    }

    fs.writeFileSync(file, html, "utf8");
    console.log("patched", path.relative(root, file));
  }
}

// Run: node scripts/fix-l00-pager-dom-order.mjs after patch (nav must be before main script)
