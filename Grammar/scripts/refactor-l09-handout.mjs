import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "L09", "lesson09-handout.html");
const html = fs.readFileSync(fp, "utf8");

const scriptMatch = html.match(/<script>\s*\(function \(\) \{([\s\S]*?)\}\)\(\);\s*<\/script>/);
if (!scriptMatch) throw new Error("inline script not found");

let body = scriptMatch[1];
body = body.replace(/function playEnglish[\s\S]*?var ttsLock = false;\s*/m, "");
body = body.replace(/function syncNameShow[\s\S]*?window\.addEventListener\("beforeprint", syncNameShow\);\s*/m, "");
body = body.replace(/var btnHandoutPrint[\s\S]*?window\.print\(\);\s*\}\);\s*\}\s*/m, "");
body = body.replace(
  /document\.getElementById\("chantBox"\)\.textContent = "终极护身口诀：" \+ HANDOUT_DATA\.chant;/,
  'var chantEl = document.getElementById("chantBox");\n    if (chantEl) chantEl.textContent = HANDOUT_DATA.chant;'
);
body = body.replace(/document\.addEventListener\("click"[\s\S]*?syncNameShow\(\);\s*/m, "");

const appJs =
  "/** L09 过去进行时讲义 · 动态渲染（数据与 TTS manifest 键一致） */\n(function () {\n  \"use strict\";\n" +
  body.trim() +
  "\n})();\n";

fs.writeFileSync(path.join(ROOT, "L09", "assets", "l09-handout-app.js"), appJs);

const newHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>过去进行时</title>
  <script src="assets/l09-tts-manifest.js"></script>
  <script src="assets/lesson-tts-bootstrap.js"></script>
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <link rel="stylesheet" href="../shared/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="assets/l09-handout-sheet.css" />
</head>
<body class="has-lesson-pager grammar-handout-page l09-handout">
  <header class="grammar-handout-top">
    <div class="top-bar-main">
      <strong>过去进行时</strong>
      <span class="subtitle-line">Steven's Class</span>
    </div>
    <a class="grammar-handout-index-link" href="index.html">本讲目录</a>
  </header>
  <p class="grammar-handout-print-hint no-print">打印：浏览器「打印」→ 勾选「背景图形」→ 另存为 PDF（单栏）。屏幕底栏导航在打印时自动隐藏。</p>
  <div class="grammar-handout-pdf-bar no-print">
    <button type="button" class="btn-handout-pdf" id="btnHandoutPrint">打印 / 另存 PDF</button>
  </div>

  <nav class="handout-section-nav no-print" aria-label="讲义节次">
    <a href="#sec-1">①概念</a>
    <a href="#sec-2">②口诀</a>
    <a href="#sec-3">③句型</a>
    <a href="#sec-4">④when</a>
    <a href="#sec-5">⑤例句</a>
    <a href="#sec-6">⑥范文</a>
    <a href="#sec-7">⑦红线</a>
  </nav>

  <main class="sheet l09-handout" id="handout-pdf-source">
    <div class="inner">
      <header class="handout-header">
        <h1 class="doc-title">过去进行时</h1>
        <p class="doc-subtitle">Steven's Class</p>
        <div class="print-header">
          <div class="field"><label>姓名</label><div class="line" id="fld-name" contenteditable="true" role="textbox" aria-label="填写姓名"></div></div>
          <div class="field"><label>日期</label><div class="line"></div></div>
        </div>
      </header>

      <section class="intro">
        <strong>使用方法：</strong>① 读「概念对照」分清长背景与短突变 ② 背口诀与 when/while 表 ③ 按知识卡朗读例句（点 🔊）并对照句法四标注 ④ 背诵看图写话八句骨架 ⑤ 对照⑦易错红线自测。<br />
        建议每天 <strong>15 分钟</strong>：朗读 3 句 → 口头标出主句/从句/背景/强调 → 仿写 1 句。
      </section>

      <section class="handout-section" id="sec-1">
        <h2 class="section-title">🗺️ 概念对照 · 录像带与快门</h2>
        <div class="intro-strip">
          <strong>核心图像：</strong>在过去的时间轴上，<strong>was / were + doing</strong> 铺「长背景」；<strong>一般过去时</strong>记「短突变」。<strong>when</strong> 常接突变或时刻，<strong>while</strong> 常接延续动作；<strong>find out / come across / realize / hear</strong> 表察觉或偶遇时多用一般过去，勿乱套进行时。
        </div>
      </section>

      <section class="handout-section" id="sec-2">
        <h2 class="section-title">📌 背诵口诀</h2>
        <div class="quote-box" id="chantBox"></div>
      </section>

      <section class="handout-section" id="sec-3">
        <h2 class="section-title">📐 核心对照 · 句型框</h2>
        <table class="data" id="tbl"></table>
      </section>

      <section class="handout-section" id="sec-4">
        <h2 class="section-title">🔀 when / while 逻辑门（速记）</h2>
        <table class="data">
          <thead>
            <tr><th>连词</th><th>从句侧重</th><th>常见搭配记忆</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>when</strong></td>
              <td>某一时刻或突变发生</td>
              <td>过去进行 + <strong>when</strong> + 一般过去（快门打断背景）</td>
            </tr>
            <tr>
              <td><strong>while</strong></td>
              <td>延续动作并行</td>
              <td><strong>While</strong> + 过去进行, + 主句（另一延续或突变，依语境）</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="handout-section" id="sec-5">
        <h2 class="section-title">📚 知识卡例句 · 英汉 + 句法四标注</h2>
        <div class="usage-host" id="usageHost"></div>
      </section>

      <section class="handout-section" id="sec-6">
        <h2 class="section-title">✨ 看图写话抢分骨架（八句连贯叙事）</h2>
        <div id="sents"></div>
      </section>

      <section class="handout-section" id="sec-7">
        <h2 class="section-title">⚠️ 易错红线 · 出版级自检</h2>
        <div class="warn-strip">
          ✗ 瞬间动词进行时：<code>was finding out</code> → ✓ <code>found out</code> &nbsp;|&nbsp;
          ✗ when 从句误用进行：<code>when I was seeing the sign</code>（表看见）→ ✓ <code>when I saw …</code>
        </div>
        <div class="tip-strip">
          <strong>写作顺序：</strong>先铺 1～2 句 was/were doing 背景 → when 引出突变 → while 可写双线并行 → 末句用一般过去收束感受或结果。
        </div>
      </section>

      <p class="grammar-handout-footer">过去进行时</p>
    </div>
  </main>

  <nav class="lesson-pager is-file-nav" aria-label="页面导航">
    <a class="pager-prev" href="lesson09-page08-archive.html">上一页</a>
    <a class="pager-logo" href="../index.html" aria-label="课程主页"><img src="../logo2.png" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
    <span class="pager-next pager-muted" aria-disabled="true">下一页</span>
  </nav>

  <script src="assets/l09-handout-app.js" defer></script>
  <script src="assets/l09-handout-tts.js" defer></script>
  <link rel="stylesheet" href="assets/lesson-image-lightbox.css" />
  <script src="assets/lesson-image-lightbox.js" defer></script>
  <script src="../shared/grammar-handout.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(fp, newHtml);
console.log("wrote", fp);
console.log("app.js lines", appJs.split("\n").length);
