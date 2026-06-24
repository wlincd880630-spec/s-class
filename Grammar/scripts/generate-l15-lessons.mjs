#!/usr/bin/env node
/**
 * 生成 L15 词性转换与词汇 · 全套互动页、目录、讲义、课堂同步片段
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const L15 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../L15");
const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L15/assets/img";
const img = (n) => `assets/img/l15-p${String(n).padStart(2, "0")}-${["word-formation-lab", "exam-vocab-cards", "suffix-rules", "exam-drill", "collocations", "idioms", "chart-vocab", "gap-vocab"][n - 1] || "scene"}.png`;

const ACCENT = "#6366f1";

function pageShell(title, pageNum, totalScreens, screensHtml, extraScripts = "", opts = {}) {
  const quizAssets = opts.quiz
    ? `  <link rel="stylesheet" href="l15-vocab-quiz.css" />
  <script src="l15-vocab-quiz-generator.js"></script>
  <script src="l15-vocab-quiz-runner.js"></script>
`
    : "";
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>词性转换与词汇 · ${title}</title>
  <link rel="stylesheet" href="assets/lesson-screen-16x9.css" />
  <link rel="stylesheet" href="l15-index-nav.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="l15-lesson-shell.css" />
  <link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="l15-page-components.css" />
  <link rel="stylesheet" href="l15-readable-global.css" />
  <link rel="stylesheet" href="l15-scene-images.css" />
  <link rel="stylesheet" href="l15-vocab-browser.css" />
  <link rel="stylesheet" href="l15-design-v3.css" />
${quizAssets}  <style>
    :root {
      --l15-accent: ${ACCENT};
      --l15-accent-ink: #4338ca;
      --grammar-pager-accent: ${ACCENT};
      --grammar-pager-accent-ink: #4338ca;
    }
    html, body { margin:0; min-height:100dvh; line-height:1.55; }
    .vocab-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:.55rem; margin-top:.5rem; }
    .rule-table { width:100%; border-collapse:collapse; font-size:.86rem; margin-top:.5rem; }
    .rule-table th, .rule-table td { padding:.45rem .55rem; text-align:left; }
  </style>
  <script src="assets/lesson-tts-bootstrap.js"></script>
  <script src="../shared/lesson-tts-azure-play.js"></script>
  <script src="assets/l15-tts-manifest.js"></script>
  <script src="l15-ui-helpers.js"></script>
  <script src="l15-progress.js"></script>
  <script src="l15-quiz-engine.js?v=1"></script>
</head>
<body class="has-lesson-pager">
  <div id="app"><div id="l15-book" class="book">
    <header class="top-bar"><div class="top-bar-main"><strong>词性转换与词汇 · L15</strong></div>
      <a class="l15-index-link" href="index.html">学习目录</a></header>
    <div class="l15-scroll">${screensHtml}
    </div>
    <nav class="lesson-pager is-intra-nav" aria-label="分页">
      <div class="pager-zone pager-zone--left">
        <button type="button" class="pager-prev" id="pager-prev" disabled>上一页</button>
      </div>
      <a class="pager-logo" href="index.html" aria-label="本讲目录"><img src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png" alt="Steven's Class" width="204" height="61" decoding="async" /></a>
      <div class="pager-zone pager-zone--right">
        <span class="pager-mid" id="pager-mid" aria-live="polite">1 / ${totalScreens}</span>
        <button type="button" class="pager-next" id="pager-next">下一页</button>
      </div>
    </nav>
  </div></div>
  <script src="l15-corpus-pool.js?v=3"></script>
  <script src="l15-vocab-browser.js"></script>
  <script src="l15-index-nav.js"></script>
  <script src="l15-lesson-pager.js"></script>
  <script>
  (function(){
    var pager = window.L15LessonPager && L15LessonPager.init();
    ${extraScripts}
  })();
  </script>
</body></html>`;
}

function screen(i, total, title, body) {
  return `<section class="lesson-page${i === 0 ? " active" : ""}" data-page="${i + 1}">
    <div class="page-head"><span class="page-kicker">${i + 1} / ${total}</span><h2 class="page-title">${title}</h2></div>
    <div class="panel">${body}</div></section>`;
}

// ── Page 01: 词性转换总览 ──
const p01Screens = [
  screen(0, 4, "词性转换 · 中考 B 卷核心", `
    <div class="panel-split">
      <div class="scene-frame"><img src="${img(1)}" alt="词性转换实验室" width="800" height="600" style="aspect-ratio:4/3" loading="lazy"/></div>
      <div><p class="panel-lead"><strong>定义</strong>：同一词根在不同词性间变形，使句子语法正确。</p>
      <p class="zh-hint">成都中考 B 卷「12 选 10」每年必考；全库 <strong>${"699"}</strong> 条（词性转换 + Tier2/3 + 词组习语僻义 + 预测）。<a href="lesson15-page10-vocab-master.html" style="color:#c4b5fd">→ 全库检索</a></p>
      <ol><li>判定：名词 / 动词 / 形容词 / 副词 / 代词</li><li>技巧：形容词 + -ly → 副词；动词 + -tion/-ment → 名词</li><li>迁移：they→their；little→less；good→well</li></ol></div></div>`),
  screen(1, 4, "四步判定法", `
    <table class="rule-table"><thead><tr><th>步骤</th><th>问什么</th><th>例子</th></tr></thead><tbody>
    <tr><td>① 看位置</td><td>作主语/宾语/表语/状语？</td><td>副词修饰动词 → -ly</td></tr>
    <tr><td>② 看前后</td><td>冠词/形容词/介词后接什么？</td><td>their + 名词</td></tr>
    <tr><td>③ 看词库</td><td>12 词各用一次</td><td>2018–2026 真题词库</td></tr>
    <tr><td>④ 写形式</td><td>拼写变化（双写/y变i）</td><td>happy→happily</td></tr></tbody></table>
    <p class="teacher-script">口诀：先词性，后拼写；代词变格，比较变级。</p>`),
  screen(2, 4, "高频后缀速查", `<div id="suffix-grid" class="vocab-grid"></div>`),
  screen(3, 4, "小测 · 判词性", `<div id="p01-quiz"></div>`),
];
fs.writeFileSync(
  path.join(L15, "lesson15-page01-overview.html"),
  pageShell("总览与技巧", 1, 4, p01Screens.join("\n"), `
    var g = document.getElementById("suffix-grid");
    L15Corpus.WORD_FORM_RULES.forEach(function(r){
      g.innerHTML += '<div class="vocab-chip"><strong>'+r.suffix+'</strong>'+r.example+' → '+r.result+'</div>';
    });
    var q = L15Corpus.getPageQuiz("p01")[0];
    var box = document.getElementById("p01-quiz");
    box.innerHTML = '<p>'+q.stem+'</p>';
    var done = false;
    q.opts.forEach(function(o){
      var b = document.createElement("button"); b.className="quiz-opt"; b.textContent=o;
      b.onclick=function(){
        if(done) return; done=true;
        box.querySelectorAll(".quiz-opt").forEach(function(btn){
          btn.disabled = true;
          if(btn.textContent===q.ans) btn.classList.add("correct");
        });
        b.classList.add(o===q.ans?"correct":"wrong");
      };
      box.appendChild(b);
    });
  `),
  "utf8"
);

// ── Page 02: 后缀技巧 ──
const p02Screens = [
  screen(0, 3, "形容词 → 副词 · -ly", `<p class="zh-hint">副词修饰动词 / 形容词 / 全句；注意 y→i+ly、辅音双写。</p><div id="ly-list" class="vb-list"></div>`),
  screen(1, 3, "动词/形容词 → 名词", `<div id="noun-list" class="vb-list"></div>`),
  screen(2, 3, "不规则与易错", `<div id="irreg-list" class="vb-list"></div>`),
];
fs.writeFileSync(
  path.join(L15, "lesson15-page02-suffix-lab.html"),
  pageShell("后缀实验室", 2, 3, p02Screens.join("\n"), `
    function wfCard(base, form) {
      var hit = L15Corpus.byCat("word-form").find(function(x){ return x.base===base && x.form===form; });
      if (hit && window.L15VocabCardHtml) return L15VocabCardHtml(hit);
      return '<article class="vocab-card" data-cat="word-form"><div class="vocab-card-en">'+base+' → '+form+'</div></article>';
    }
    L15Corpus.SUFFIX_LY.forEach(function(x){
      document.getElementById("ly-list").innerHTML += wfCard(x.base, x.form);
    });
    L15Corpus.SUFFIX_NOUN.forEach(function(x){
      document.getElementById("noun-list").innerHTML += wfCard(x.base, x.form);
    });
    L15Corpus.IRREGULAR.forEach(function(x){
      var hit = L15Corpus.byCat("word-form").find(function(w){ return w.base===x.base; });
      document.getElementById("irreg-list").innerHTML += hit && window.L15VocabCardHtml ? L15VocabCardHtml(hit) : wfCard(x.base, x.form);
    });
    document.querySelectorAll(".tts-btn").forEach(function(btn){
      btn.onclick=function(){ if(window.playLessonAzureTtsPlain) window.playLessonAzureTtsPlain(btn.getAttribute("data-tts")); };
    });
  `),
  "utf8"
);

// ── Page 03: 2018–2026 B卷词库 + 词性转换 + Tier2/3 ──
const p03Screens = [
  screen(0, 2, "B 卷词库 · 2018–2026 完整", `<p class="zh-hint">每年 12 词各用一次；下方为各年原词 + 全部词性转化参考答案。</p><div data-l15-word-banks></div>`),
  screen(1, 2, "Tier 2 / Tier 3 · 真题词汇", `<div data-l15-vocab-browser data-cats="tier2,tier3" data-per-page="12"></div>`),
];
fs.writeFileSync(
  path.join(L15, "lesson15-page03-exam-wordbanks.html"),
  pageShell("真题词库", 3, 2, p03Screens.join("\n"), `
    if (window.L15VocabBrowserInit) L15VocabBrowserInit();
  `),
  "utf8"
);

// ── Page 04: 动词词组 & 固定搭配 ──
const p04Screens = [
  screen(0, 2, "动词词组 · 97 条", `<div data-l15-vocab-browser data-cats="verb-phrase" data-per-page="12" data-default-cat="verb-phrase"></div>`),
  screen(1, 2, "形容词/名词词组 + 固定搭配", `<div data-l15-vocab-browser data-cats="adj-noun-phrase,collocation" data-per-page="12" data-default-cat="adj-noun-phrase"></div>`),
];
fs.writeFileSync(
  path.join(L15, "lesson15-page04-phrases.html"),
  pageShell("词组与搭配", 4, 2, p04Screens.join("\n"), `
    if (window.L15VocabBrowserInit) L15VocabBrowserInit();
  `),
  "utf8"
);

// ── Page 05: 习语俚语 + 熟词僻义 ──
fs.writeFileSync(
  path.join(L15, "lesson15-page05-idioms.html"),
  pageShell("习语与固定表达", 5, 2, [
    screen(0, 2, "习语 · 谚语 · 俚语 · 42 条", `<div data-l15-vocab-browser data-cats="idiom" data-per-page="12"></div>`),
    screen(1, 2, "熟词僻义 · 45 条", `<div data-l15-vocab-browser data-cats="polysemy" data-per-page="12"></div>`),
  ].join("\n"), `
    if (window.L15VocabBrowserInit) L15VocabBrowserInit();
  `),
  "utf8"
);

// ── Page 11: 全库五种测验 ──
fs.writeFileSync(
  path.join(L15, "lesson15-page11-vocab-quiz.html"),
  pageShell("全库词汇测验", 11, 1, [
    screen(0, 1, "词汇测验中心 · 五种方式 × 全库", `<div data-l15-vocab-quiz></div>`),
  ].join("\n"), `
    if (window.L15VocabQuizRunner) L15VocabQuizRunner.init();
  `, { quiz: true }),
  "utf8"
);

console.log("OK lesson pages 01-08");

// ── Page 10: 全库总览 ──
fs.writeFileSync(
  path.join(L15, "lesson15-page10-vocab-master.html"),
  pageShell("全库总览", 10, 1, [
    screen(0, 1, "词性转换与词汇 · 全库检索", `
      <p class="zh-hint">2018–2026 成都中考 Tier 2/3 完整收录；含词组、固定搭配、习语俚语、熟词僻义；另附初中预测补充。</p>
      <div id="stats-bar" class="stats-strip"></div>
      <div data-l15-vocab-browser data-cats="word-form,verb-phrase,adj-noun-phrase,collocation,idiom,polysemy,chart,tier2,tier3,predict" data-per-page="12" data-default-cat="word-form"></div>`),
  ].join("\n"), `
    var s = L15Corpus.STATS, html = "";
    Object.keys(s).forEach(function(k){
      html += '<div class="stat-pill"><strong>'+s[k]+'</strong><span>'+L15Corpus.CAT_LABEL[k]+'</span></div>';
    });
    html += '<div class="stat-pill"><strong>'+L15Corpus.TOTAL+'</strong><span>合计</span></div>';
    document.getElementById("stats-bar").innerHTML = html;
    if (window.L15VocabBrowserInit) L15VocabBrowserInit();
  `),
  "utf8"
);

// ── 背诵讲义（全库分卷） ──
const handoutHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="../shared/grammar-handout.css" />
  <title>词性转换与词汇 · 背诵讲义</title>
  <link rel="stylesheet" href="l15-readable-global.css" />
  <script src="l15-corpus-pool.js?v=3"></script>
  <style>
    .cat-block { margin-bottom: 1.25rem; break-inside: avoid; }
    .cat-block h3 { font-size: 1rem; color: #6d28d9; margin: 0 0 .4rem; }
    .cat-block table { width: 100%; font-size: .78rem; border-collapse: collapse; }
    .cat-block th, .cat-block td { border: 1px solid #cbd5e1; padding: .25rem .35rem; text-align: left; vertical-align: top; }
    .cat-block th { background: #f5f3ff; }
    .handout-stats { font-size: .85rem; color: #64748b; margin-bottom: 1rem; }
  </style>
</head>
<body class="grammar-handout-page">
  <header class="grammar-handout-top">
    <div class="top-bar-main"><strong>词性转换与词汇 · L15</strong><span class="subtitle-line">Steven's Class</span></div>
    <a class="grammar-handout-index-link" href="index.html">本讲目录</a>
  </header>
  <main class="sheet" id="handout-pdf-source">
    <div class="inner">
      <h1 class="doc-title">第15讲 · 词性转换与词汇 · 背诵讲义（全库）</h1>
      <p class="doc-subtitle">2018–2026 成都中考 · 合计 <span id="total-n">—</span> 条</p>
      <p class="handout-stats" id="stats-line"></p>
      <section id="sec-banks"><h2 class="section-title">① 2018–2026 B 卷词库</h2><div id="bank-table"></div></section>
      <section id="sec-corpus"><h2 class="section-title">② 分类全库速查</h2><div id="corpus-sections"></div></section>
    </div>
  </main>
  <script>
  (function(){
    document.getElementById("total-n").textContent = L15Corpus.TOTAL;
    var stats = [];
    Object.keys(L15Corpus.STATS).forEach(function(k){
      stats.push(L15Corpus.CAT_LABEL[k] + " " + L15Corpus.STATS[k]);
    });
    document.getElementById("stats-line").textContent = stats.join(" · ");
    var bhtml = "";
    Object.keys(L15Corpus.WORD_BANKS).sort().forEach(function(y){
      bhtml += "<p><strong>"+y+"</strong>："+L15Corpus.WORD_BANKS[y].join(" · ")+"</p>";
    });
    document.getElementById("bank-table").innerHTML = bhtml;
    var cats = ["word-form","verb-phrase","adj-noun-phrase","collocation","idiom","polysemy","chart","tier2","tier3","predict"];
    var out = "";
    cats.forEach(function(cat){
      var rows = L15Corpus.byCat(cat);
      out += '<div class="cat-block"><h3>'+L15Corpus.CAT_LABEL[cat]+'（'+rows.length+'）</h3><table><thead><tr><th>英文</th><th>中文</th><th>例句</th><th>语境</th></tr></thead><tbody>';
      rows.forEach(function(r){
        out += "<tr><td lang=\\"en\\">"+r.en+"</td><td>"+r.zh+"</td><td lang=\\"en\\">"+(r.exEn||"—")+"<br/><small>"+(r.exZh||"")+"</small></td><td>"+(r.ctx||r.year||"—")+"</td></tr>";
      });
      out += "</tbody></table></div>";
    });
    document.getElementById("corpus-sections").innerHTML = out;
  })();
  </script>
</body>
</html>`;
fs.writeFileSync(path.join(L15, "lesson15-page09-handout.html"), handoutHtml, "utf8");

// ── 目录 index ──
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN" class="g-index-scaled">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>词性转换与词汇 · 目录</title>
  <link rel="stylesheet" href="../shared/grammar-index.css" />
  <link rel="stylesheet" href="../shared/grammar-index-scale.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="l15-index-extra.css" />
</head>
<body class="g-index-scaled">
  <div class="g-index-bg" aria-hidden="true"></div>
  <div class="g-index-grid" aria-hidden="true"></div>
  <main class="g-index">
    <p class="g-index-logo-wrap">
      <a href="index.html" aria-label="课程主页">
        <img class="g-index-logo" src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png" alt="Steven's Class" width="200" height="64" decoding="async" />
      </a>
    </p>
    <h1>词性转换与词汇</h1>
    <p class="l15-index-sub">2018–2026 成都中考全库 · 例句语境 + 五种测验<br/><span class="l15-index-badge">699 条 × 5 模式 = 3495 题</span></p>
    <ol>
      <li><a href="lesson15-page01-overview.html"><span class="num">01</span><span class="link-body"><span class="label">总览：词性转换四步判定法</span></span></a></li>
      <li><a href="lesson15-page02-suffix-lab.html"><span class="num">02</span><span class="link-body"><span class="label">后缀实验室 · -ly / -tion / -ness</span></span></a></li>
      <li><a href="lesson15-page03-exam-wordbanks.html"><span class="num">03</span><span class="link-body"><span class="label">2018–2026 B卷词库 + Tier2/3</span></span></a></li>
      <li><a href="lesson15-page04-phrases.html"><span class="num">04</span><span class="link-body"><span class="label">动词词组 · 固定搭配（151+70 条）</span></span></a></li>
      <li><a href="lesson15-page05-idioms.html"><span class="num">05</span><span class="link-body"><span class="label">习语 · 谚语 · 俚语 · 熟词僻义</span></span></a></li>
      <li><a href="lesson15-page11-vocab-quiz.html"><span class="num">09</span><span class="link-body"><span class="label">全库测验中心 · 5 模式 × 699 条</span></span></a></li>
      <li><a href="lesson15-page10-vocab-master.html"><span class="num">10</span><span class="link-body"><span class="label">全库检索 · 例句语境卡片</span></span></a></li>
      <li><a href="lesson15-handout-classroom-full.html"><span class="num">11</span><span class="link-body"><span class="label">课堂同步全面讲义 · 第 1–10 页填空</span></span></a></li>
      <li><a href="lesson15-page09-handout.html"><span class="num">12</span><span class="link-body"><span class="label">背诵讲义 · 全库速查表</span></span></a></li>
    </ol>
    <p class="back"><a href="../index.html">← 课程总目录</a></p>
  </main>
  <link rel="stylesheet" href="assets/lesson-image-lightbox.css" />
  <script src="assets/lesson-image-lightbox.js" defer></script>
</body>
</html>`;
fs.writeFileSync(path.join(L15, "index.html"), indexHtml, "utf8");

console.log("OK page08-11 + handout + index");
