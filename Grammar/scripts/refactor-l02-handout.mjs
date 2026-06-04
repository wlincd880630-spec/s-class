/**
 * L02 讲义 → 统一 grammar-handout 外壳 + 专题 CSS，移除 16:9 内联
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L02", "lesson02-handout-writing.html");
const cssOut = path.join(ROOT, "L02", "assets", "l02-handout-sheet.css");

let html = fs.readFileSync(fp, "utf8");

const style1Match = html.match(/<style>\s*([\s\S]*?)<\/style>\s*<style>\s*\/\* inlined from assets\/lesson-screen-16x9\.css/);
if (!style1Match) {
  console.error("未找到 handout 内联样式块");
  process.exit(1);
}

let sheetCss = style1Match[1].trim();
sheetCss = `/**\n * L02 现在进行时讲义 · 专题样式（外壳见 ../shared/grammar-handout.css）\n */\n\n${sheetCss}`;

sheetCss = sheetCss.replace(/^    body\s*\{/m, "body.grammar-handout-page.l02-handout {");
sheetCss = sheetCss.replace(/^    \.sheet\s*\{/m, "body.grammar-handout-page main.sheet.l02-handout {");

sheetCss += `

body.grammar-handout-page.l02-handout .doc-subtitle {
  text-align: center;
  color: var(--ink-soft);
  font-weight: 800;
  font-size: 0.92rem;
  margin: 0 0 1rem;
}

body.grammar-handout-page.l02-handout .intro {
  margin-bottom: 0.85rem;
  padding: 0.75rem 0.9rem;
  border-radius: 14px;
  border: 3px solid var(--crayon-orange);
  background: linear-gradient(180deg, rgba(255, 249, 240, 0.95), #fff);
  font-size: 0.88rem;
  line-height: 1.65;
}

body.grammar-handout-page.l02-handout .quote-box {
  margin-top: 0.75rem;
  padding: 0.65rem 0.85rem;
  border: 2px dashed var(--crayon-orange);
  border-radius: 12px;
  background: rgba(255, 249, 240, 0.95);
  font-size: 0.9rem;
  line-height: 1.7;
  font-weight: 700;
}

@media print {
  body.grammar-handout-page.l02-handout .pattern-card,
  body.grammar-handout-page.l02-handout .block,
  body.grammar-handout-page.l02-handout .skeleton-wrap {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
`;

fs.writeFileSync(cssOut, sheetCss, "utf8");

html = html.replace(
  /<style>[\s\S]*?<\/style>\s*<style>\s*\/\* inlined from assets\/lesson-screen-16x9\.css[\s\S]*?<\/style>\s*<link rel="stylesheet" href="assets\/grammar-lesson-pager\.css"[\s\S]*?<link rel="stylesheet" href="\.\.\/grammar-lesson-pager\.css" \/>/,
  `<link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l02-handout-sheet.css" />`
);

html = html.replace(
  /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/,
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />'
);

html = html.replace(
  /<body class="has-lesson-pager grammar-handout-page">/,
  '<body class="has-lesson-pager grammar-handout-page l02-handout">'
);

html = html.replace(/<!-- spa-assets-inlined -->\s*\n\s*/g, "");

html = html.replace(
  /<div class="grammar-handout-pdf-bar no-print">\s*<button[^>]*id="btnHandoutPrint"[^>]*>[\s\S]*?<\/button>\s*<\/div>\s*\n\s*<main class="sheet"/,
  `<div class="grammar-handout-pdf-bar no-print">
    <button type="button" class="btn-handout-pdf" id="btnHandoutPrint">打印 / 另存 PDF</button>
  </div>

  <nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sec-1">①骨架</a>
    <a href="#sec-2">②此刻</a>
    <a href="#sec-3">③趋势</a>
    <a href="#sec-4">④拼写</a>
    <a href="#sec-5">⑤情感</a>
    <a href="#sec-6">⑥模板</a>
    <a href="#sec-7">⑦附录</a>
  </nav>

  <main class="sheet l02-handout"`
);

html = html.replace(
  /<section class="intro" aria-labelledby="intro-title">[\s\S]*?<\/section>/,
  `<section class="intro" id="sec-intro" aria-labelledby="intro-title">
      <h2 id="intro-title" class="visually-hidden">使用方法</h2>
      <p style="margin:0;font-size:0.88rem;line-height:1.65;">
        <strong>使用方法：</strong>① 熟记模块一四大句式公式 ② 按模块二～三选用时间标志词 ③ 背诵「神仙句子」并仿写 ④ 对照附录避开状态动词误用。
        建议每天 <strong>15 分钟</strong>：朗读 2 句英文 → 中译英 1 句 → 对照公式自改。
      </p>
      <p style="margin:0.65rem 0 0;font-size:0.88rem;line-height:1.65;">
        <strong>写作定位：</strong>现在进行时用于<strong>画面描写</strong>、<strong>社会趋势</strong>与<strong>带感情色彩的反复</strong>；动笔前先判断：本句是「此刻画面」「现阶段趋势」还是「状态/认知」（附录）？
      </p>
    </section>`
);

html = html.replace(
  /<!-- 模块一：四大基本句型 -->\s*<div class="skeleton-wrap"/,
  '<!-- 模块一：四大基本句型 -->\n    <div class="skeleton-wrap" id="sec-1"'
);

html = html.replace(
  /<section class="block" aria-labelledby="m2">/,
  '<section class="block handout-section" id="sec-2" aria-labelledby="m2">'
);
html = html.replace(
  /<section class="block" aria-labelledby="m3">/,
  '<section class="block handout-section" id="sec-3" aria-labelledby="m3">'
);
html = html.replace(
  /<section class="block" aria-labelledby="m4">/,
  '<section class="block handout-section" id="sec-4" aria-labelledby="m4">'
);
html = html.replace(
  /<section class="block" aria-labelledby="m5">/,
  '<section class="block handout-section" id="sec-5" aria-labelledby="m5">'
);
html = html.replace(
  /<section class="block" aria-labelledby="m6">/,
  '<section class="block handout-section" id="sec-6" aria-labelledby="m6">'
);
html = html.replace(
  /<section class="block" aria-labelledby="app">/,
  '<section class="block handout-section" id="sec-7" aria-labelledby="app">'
);

html = html.replace(
  /<\/section>\s*\n\s*<\/div>\s*\n\s*<\/main>/,
  `</section>

      <div class="quote-box" aria-label="背诵口诀">
        Be 加 doing 表进行，Look Listen 拉画面；<br />
        nowadays 论趋势，at present 写现状；<br />
        去 e 双写 ie 变 y，拼写错了要扣分；<br />
        always 加 doing 带感情，believe know 状态不动-ing。
      </div>

      <p class="grammar-handout-footer">现在进行时</p>
    </div>
  </main>`
);

html = html.replace(
  /<nav class="lesson-pager[\s\S]*?<\/script>\s*<link rel="stylesheet" href="assets\/lesson-image-lightbox\.css"/,
  `<nav class="lesson-pager is-file-nav" aria-label="页面导航">
    <a class="pager-prev" href="lesson02-page09-final-test.html">上一页</a>
    <a class="pager-logo" href="../index.html" aria-label="课程主页"><img src="../logo2.png" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
    <span class="pager-next pager-muted" aria-disabled="true">下一页</span>
  </nav>
  <link rel="stylesheet" href="assets/lesson-image-lightbox.css"`
);

fs.writeFileSync(fp, html, "utf8");
console.log("OK:", path.relative(ROOT, fp));
console.log("OK:", path.relative(ROOT, cssOut));
