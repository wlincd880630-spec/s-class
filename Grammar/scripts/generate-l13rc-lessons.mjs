/**
 * 生成定语从句升级版互动页（L14 课壳 · 课内翻页）
 */
import fs from "fs";
import path from "path";

const OUT = path.resolve("L13-定语从句");

function buildPage(cfg) {
  const n = cfg.screens.length;
  const screens = cfg.screens
    .map(
      (s, i) => `<section class="lesson-page${i === 0 ? " active" : ""}" data-page="${i + 1}">
          <div class="page-head"><span class="page-kicker">${i + 1} / ${n}</span><h2 class="page-title">${s.title}</h2></div>
          <div class="panel">${s.body}</div>
        </section>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>定语从句 · ${cfg.title}</title>
  <script src="../shared/play-local-mp3.js"></script>
  <script src="../shared/lesson-local-audio.js" defer></script>
  <script src="../shared/lesson-speak-local-only.js"></script>
  <link rel="stylesheet" href="assets/lesson-screen-16x9.css" />
  <link rel="stylesheet" href="l13rc-index-nav.css" />
  <link rel="stylesheet" href="../shared/grammar-logo.css" />
  <link rel="stylesheet" href="l13rc-lesson-shell.css" />
  <link rel="stylesheet" href="assets/grammar-lesson-pager.css" />
  <link rel="stylesheet" href="l13rc-page-components.css" />
  <link rel="stylesheet" href="l13rc-readable-global.css" />
  <style>
    :root {
      --l13rc-accent: #7c3aed; --l13rc-accent-ink: #6d28d9;
      --l13rc-top-bg: linear-gradient(180deg, #fff, #f5f3ff);
      --l13rc-shadow: rgba(124, 58, 237, 0.35); --paper: #fff9f0; --ink: #2c2c2c; --edge: #5d4037;
    }
    html, body { margin: 0; min-height: 100dvh;
      font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      background: linear-gradient(165deg, #4c1d95 0%, #312e81 42%, #0f172a 100%);
      color: var(--ink); line-height: 1.55;
    }
    .route-strip, .rubric-mini { display: grid; gap: 0.45rem; margin-top: 0.55rem; }
    .route-strip { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .rubric-mini { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .route-strip span, .rubric-mini span {
      display: block; padding: 0.42rem 0.5rem; border: 2px solid rgba(93,64,55,.18);
      border-radius: 10px; background: rgba(255,255,255,.84); font-size: .8rem; font-weight: 800; color: #334155;
    }
    .example-card { margin: 0.5rem 0; padding: 0.55rem 0.65rem; border: 2px solid rgba(124,58,237,.2); border-radius: 12px; background: #fff; }
    .merge-pair { margin: 0.45rem 0; padding: 0.5rem; border-left: 4px solid var(--l13rc-accent); background: rgba(245,243,255,.9); }
    .merge-pair .hint { font-size: 0.82rem; color: #6d28d9; font-weight: 700; margin-top: 0.35rem; }
    @media (max-width: 720px) { .route-strip, .rubric-mini { grid-template-columns: 1fr; } }
  </style>
</head>
<body class="has-lesson-pager">
  <div id="ui-lock" aria-hidden="true"></div>
  <div id="app">
    <div id="l13rc-book" class="book">
      <header class="top-bar">
        <div class="top-bar-main"><strong>定语从句</strong></div>
        <a class="l13rc-index-link" href="index.html">学习目录</a>
      </header>
      <div class="l13rc-scroll">
${screens}
      </div>
    </div>
    <nav class="lesson-pager is-intra-nav" aria-label="分页">
      <div class="pager-zone pager-zone--left">
        <button type="button" class="pager-prev" id="pager-prev">上一页</button>
      </div>
      <a class="pager-logo" href="../index.html" aria-label="课程主页"><img src="../logo2.png" alt="Steven's Class" width="80" height="32" decoding="async" /></a>
      <div class="pager-zone pager-zone--right">
        <span class="pager-mid" id="pager-mid">1 / ${n}</span>
        <button type="button" class="pager-next" id="pager-next">下一页</button>
      </div>
    </nav>
  </div>
  <script src="l13rc-corpus-pool.js"></script>
  <script src="l13rc-ui-helpers.js"></script>
  <script src="l13rc-progress.js"></script>
  <script src="l13rc-quiz-engine.js"></script>
  <script src="l13rc-lesson-core.js"></script>
  <script src="l13rc-index-nav.js"></script>
  <script>
(function(){
  var PAGE_COUNT = ${n};
  ${cfg.init}
  L13RCLesson.initPager(PAGE_COUNT);
})();
  </script>
</body>
</html>`;
}

const pages = [
  {
    file: "lesson13rc-page01-who-whom.html",
    title: "关系代词 who / whom",
    screens: [
      { title: "导入 · 定语从句与四步法", body: `<p class="panel-lead">定语从句放在名词后，说明「哪一个 / 什么样的」。</p><div class="route-strip"><span>找先行词</span><span>写主句</span><span>写从句删重复</span><span>加关系词</span></div><ol class="compact" id="merge-steps-ol"></ol>` },
      { title: "who / whom 用法表", body: `<p class="panel-lead"><span class="tier-label">分层 A</span>指人：作主语 who；作宾语 whom（口语 who）。</p><table class="corpus-mini" id="who-table"></table>` },
      { title: "例句库 · 校园与人物", body: `<div id="who-examples"></div>` },
      { title: "分层测验 · 基础 A", body: `<p class="panel-lead"><span class="tier-label">分层 A</span>6 题</p><div class="quiz-stage"><div class="quiz-slot" id="quiz-who-a"></div></div>` },
      { title: "合并操练", body: `<div id="merge-drills-1"></div>` },
      { title: "易错要点", body: `<ul class="roadmap"><li>作主语 → who</li><li>作宾语 → whom / who</li><li>指物不用 who</li></ul>` },
      { title: "出口", body: `<a class="channel-btn" href="lesson13rc-page02-which-that.html">下一节 · which / that</a><p class="channel-links"><a href="index.html">学习目录</a></p>` }
    ],
    init: `L13RCLesson.renderTable('who-table', P13RC.whoWhomTable, L13RCLesson.escHtml);
  document.getElementById('merge-steps-ol').innerHTML = P13RC.mergeSteps.map(function(s){ return '<li>'+L13RCLesson.escHtml(s)+'</li>'; }).join('');
  L13RCLesson.renderExamples('who-examples', P13RC.whoExamples, L13RCLesson.escHtml);
  document.getElementById('merge-drills-1').innerHTML = P13RC.mergeDrills.slice(0,2).map(function(m){
    return '<div class="merge-pair"><p>'+L13RCLesson.escHtml(m.a)+'</p><p lang="en">'+L13RCLesson.escHtml(m.b)+'</p><p class="hint">'+L13RCLesson.escHtml(m.hint)+'</p></div>';
  }).join('');
  var e = L13RCLesson.mountQuiz({ key: 'who-a', items: P13RC.quizWhoA }); if (e) e.mount('quiz-who-a');`
  },
  {
    file: "lesson13rc-page02-which-that.html",
    title: "关系代词 which / that",
    screens: [
      { title: "which / that · 指物", body: `<p class="panel-lead"><span class="tier-label">分层 A</span></p><table class="corpus-mini" id="which-table"></table>` },
      { title: "例句", body: `<div id="which-examples"></div>` },
      { title: "分层测验 A", body: `<div class="quiz-stage"><div class="quiz-slot" id="quiz-which-a"></div></div>` },
      { title: "合并操练", body: `<div id="merge-drills-2"></div>` },
      { title: "出口", body: `<a class="channel-btn" href="lesson13rc-page03-prep-when-where.html">下一节 · when / where</a>` }
    ],
    init: `L13RCLesson.renderTable('which-table', P13RC.whichThatTable, L13RCLesson.escHtml);
  L13RCLesson.renderExamples('which-examples', P13RC.whichExamples, L13RCLesson.escHtml);
  document.getElementById('merge-drills-2').innerHTML = P13RC.mergeDrills.slice(1,4).map(function(m){
    return '<div class="merge-pair"><p>'+L13RCLesson.escHtml(m.a)+'</p><p lang="en">'+L13RCLesson.escHtml(m.b)+'</p><p class="hint">'+L13RCLesson.escHtml(m.hint)+'</p></div>';
  }).join('');
  var e = L13RCLesson.mountQuiz({ key: 'which-a', items: P13RC.quizWhichA }); if (e) e.mount('quiz-which-a');`
  },
  {
    file: "lesson13rc-page03-prep-when-where.html",
    title: "介词+which · when / where",
    screens: [
      { title: "when / where / 介词+which", body: `<table class="corpus-mini" id="when-table"></table><p class="editor-note">宾语用 which；时间/地点状语用 when/where。</p>` },
      { title: "例句", body: `<div id="prep-examples"></div>` },
      { title: "分层测验 B", body: `<p class="panel-lead"><span class="tier-label">分层 B</span></p><div class="quiz-stage"><div class="quiz-slot" id="quiz-prep-b"></div></div>` },
      { title: "辨析", body: `<ul class="roadmap"><li>spent the summer → which（宾语）</li><li>first met → when</li><li>studied → where</li></ul>` },
      { title: "出口", body: `<a class="channel-btn" href="lesson13rc-page04-whose-rules.html">下一节 · whose</a>` }
    ],
    init: `L13RCLesson.renderTable('when-table', P13RC.whenWhereTable, L13RCLesson.escHtml);
  L13RCLesson.renderExamples('prep-examples', P13RC.prepExamples, L13RCLesson.escHtml);
  var e = L13RCLesson.mountQuiz({ key: 'prep-b', items: P13RC.quizPrepB }); if (e) e.mount('quiz-prep-b');`
  },
  {
    file: "lesson13rc-page04-whose-rules.html",
    title: "whose · 限制与非限制",
    screens: [
      { title: "whose", body: `<table class="corpus-mini" id="whose-table"></table>` },
      { title: "限制 vs 非限制", body: `<ul class="roadmap" id="comma-rules"></ul>` },
      { title: "分层测验 C", body: `<div class="quiz-stage"><div class="quiz-slot" id="quiz-whose-c"></div></div>` },
      { title: "语料总表", body: `<table class="corpus-mini" id="corpus-table"></table>` },
      { title: "出口", body: `<a class="channel-btn" href="lesson13rc-page05-tiered-practice.html">分层练习场</a>` }
    ],
    init: `L13RCLesson.renderTable('whose-table', P13RC.whoseTable, L13RCLesson.escHtml);
  document.getElementById('comma-rules').innerHTML = P13RC.commaRules.map(function(t){ return '<li>'+L13RCLesson.escHtml(t)+'</li>'; }).join('');
  L13RCUI.initCorpusTable('corpus-table', P13RC.corpus, L13RCLesson.escHtml);
  var e = L13RCLesson.mountQuiz({ key: 'whose-c', items: P13RC.quizWhoseC }); if (e) e.mount('quiz-whose-c');`
  },
  {
    file: "lesson13rc-page05-tiered-practice.html",
    title: "分层练习场",
    screens: [
      { title: "说明 A–F", body: `<div class="rubric-mini"><span>基础 A</span><span>稳固 B–C</span><span>挑战 D–F</span></div>` },
      { title: "分层 A", body: `<div class="quiz-stage"><div class="quiz-slot" id="tier-a"></div></div>` },
      { title: "分层 B", body: `<div class="quiz-stage"><div class="quiz-slot" id="tier-b"></div></div>` },
      { title: "分层 C", body: `<div class="quiz-stage"><div class="quiz-slot" id="tier-c"></div></div>` },
      { title: "分层 D", body: `<div class="quiz-stage"><div class="quiz-slot" id="tier-d"></div></div>` },
      { title: "分层 E", body: `<div class="quiz-stage"><div class="quiz-slot" id="tier-e"></div></div>` },
      { title: "分层 F", body: `<div class="quiz-stage"><div class="quiz-slot" id="tier-f"></div></div>` },
      { title: "出口", body: `<a class="channel-btn" href="lesson13rc-page06-quiz.html">综合测试</a>` }
    ],
    init: `['a','b','c','d','e','f'].forEach(function(t){
    var T = t.toUpperCase();
    var eng = L13RCLesson.mountQuiz({ key: 'tier-'+t, items: P13RC.tierPractice[T] });
    if (eng) eng.mount('tier-'+t);
  });`
  },
  {
    file: "lesson13rc-page06-quiz.html",
    title: "综合测试",
    screens: [
      { title: "说明", body: `<p class="panel-lead">四节测验：who · which · when/where · whose</p>` },
      { title: "第 1 节", body: `<div class="quiz-stage"><div class="quiz-slot" id="quiz-comp1"></div></div>` },
      { title: "第 2 节", body: `<div class="quiz-stage"><div class="quiz-slot" id="quiz-comp2"></div></div>` },
      { title: "第 3 节", body: `<div class="quiz-stage"><div class="quiz-slot" id="quiz-comp3"></div></div>` },
      { title: "第 4 节", body: `<div class="quiz-stage"><div class="quiz-slot" id="quiz-comp4"></div></div>` },
      { title: "出口", body: `<a class="channel-btn" href="rel-clause-handout.html">背诵讲义</a> · <a href="rel-clause-handout-classroom-full.html">课堂全面讲义</a>` }
    ],
    init: `L13RCLesson.mountQuiz({ key: 'comp1', items: P13RC.quizWhoA });
  L13RCLesson.mountQuiz({ key: 'comp2', items: P13RC.quizWhichA });
  L13RCLesson.mountQuiz({ key: 'comp3', items: P13RC.quizPrepB });
  L13RCLesson.mountQuiz({ key: 'comp4', items: P13RC.quizWhoseC });`
  }
];

for (const p of pages) {
  fs.writeFileSync(path.join(OUT, p.file), buildPage(p), "utf8");
  console.log("wrote", p.file);
}
