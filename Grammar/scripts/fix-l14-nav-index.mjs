/**
 * L14 · 对齐 L01–L13：index 仅 label；课件顶栏/底栏导航统一
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve("L14");
const LESSON_GLOBS = fs
  .readdirSync(ROOT)
  .filter((f) => /^lesson14-.+\.html$/i.test(f));

const HEAD_LINKS = `  <link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
`;

function buildPager(mid) {
  return `<nav class="lesson-pager is-intra-nav" aria-label="分页">
      <div class="pager-zone pager-zone--left">
        <button type="button" class="pager-prev" id="pager-prev">上一页</button>
      </div>
      <a class="pager-logo" href="../index.html" aria-label="课程主页"><img src="../logo2.png" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
      <div class="pager-zone pager-zone--right">
        <span class="pager-mid" id="pager-mid">${mid}</span>
        <button type="button" class="pager-next" id="pager-next">下一页</button>
      </div>
    </nav>`;
}

const TOP_BAR = `<header class="top-bar">
        <div class="top-bar-main">
          <strong>被动语态</strong>
        </div>
        <a class="l14-index-link" href="index.html">学习目录</a>
      </header>`;

function fixLessonHtml(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  const base = path.basename(filePath);
  if (base === "lesson14-page11-handout.html") return { file: base, skipped: "handout" };

  if (!html.includes("assets/grammar-lesson-pager.css")) {
    html = html.replace(
      /(<link rel="stylesheet" href="l14-index-nav\.css" \/>)/,
      `$1\n${HEAD_LINKS}`
    );
  }

  html = html.replace(
    /<header class="top-bar">[\s\S]*?<\/header>/,
    TOP_BAR
  );

  html = html.replace(
    /<nav class="lesson-pager" aria-label="分页">[\s\S]*?<\/nav>/,
    (block) => {
      const m = block.match(/id="pager-mid">([^<]+)</);
      const mid = m ? m[1].trim() : "1 / 1";
      return buildPager(mid);
    }
  );

  html = html.replace(/<body>/, '<body class="has-lesson-pager">');
  html = html.replace(
    /\s*document\.body\.classList\.add\("has-lesson-pager"\);\s*/g,
    "\n"
  );
  html = html.replace(/返回主页/g, "学习目录");
  html = html.replace(/学习目录目录/g, "学习目录");

  fs.writeFileSync(filePath, html, "utf8");
  return { file: base, ok: true };
}

function fixHandout() {
  const fp = path.join(ROOT, "lesson14-page11-handout.html");
  let html = fs.readFileSync(fp, "utf8");
  html = html.replace(
    /<title>[^<]*<\/title>/,
    "<title>被动语态</title>"
  );
  if (!html.includes("grammar-handout.css")) {
    html = html.replace(
      /(<meta name="viewport"[^>]*\/>)/,
      `$1\n  <link rel="stylesheet" href="../shared/grammar-logo.css" />\n  <link rel="stylesheet" href="../shared/grammar-handout.css" />`
    );
  }
  html = html.replace(
    /<body class="l14-handout-page">/,
    '<body class="has-lesson-pager grammar-handout-page l14-handout-page">'
  );
  html = html.replace(
    /<header class="l14-handout-top">[\s\S]*?<\/header>/,
    `  <header class="grammar-handout-top l14-handout-top">
    <div class="top-bar-main">
      <strong>被动语态</strong>
      <span class="subtitle-line">Steven's Class</span>
    </div>
    <a class="grammar-handout-index-link" href="index.html">本讲目录</a>
  </header>`
  );
  html = html.replace(
    /<div class="handout-pdf-bar">\s*<a class="l14-index-link"[^>]*>[^<]*<\/a>\s*/,
    '<div class="handout-pdf-bar">\n    '
  );
  html = html.replace(/返回主页/g, "本讲目录");
  html = html.replace(/本讲目录目录/g, "本讲目录");
  fs.writeFileSync(fp, html, "utf8");
}

const results = LESSON_GLOBS.map((f) => fixLessonHtml(path.join(ROOT, f)));
fixHandout();
console.log(JSON.stringify(results, null, 2));
