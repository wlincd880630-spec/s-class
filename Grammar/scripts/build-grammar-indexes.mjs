import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRAMMAR = path.join(__dirname, "..");

/** @type {{ dir: string, title: string, pages: { href: string, label: string }[] }[]} */
const MODULES = [
  {
    dir: "L00-主谓宾与非谓语",
    title: "主谓宾与非谓语",
    pages: [
      { href: "page1.html", label: "主语 · 谓语 · 宾语" },
      { href: "page2.html", label: "主谓宾多句练习" },
      { href: "page3.html", label: "谓语与非谓语" },
      { href: "page4.html", label: "非谓语三种形态" },
    ],
  },
  {
    dir: "L00-主系表与非谓语",
    title: "主系表与非谓语",
    pages: [
      { href: "page1.html", label: "主系表入门" },
      { href: "page2.html", label: "系动词家族" },
      { href: "page3.html", label: "非谓语与主系表辨析" },
      { href: "page4.html", label: "魔法词表 · 搭配巩固" },
    ],
  },
  {
    dir: "L01",
    title: "一般现在时",
    pages: [
      { href: "lesson01-page01-present.html", label: "动作家族与状态家族" },
      { href: "lesson01-page02-concept-map.html", label: "概念图" },
      { href: "lesson01-page03-be-magic.html", label: "Be 动词变身" },
      { href: "lesson01-page04-slp-advanced.html", label: "状态家族否定与提问" },
      { href: "lesson01-page05-svo-rules.html", label: "第三人称单数" },
      { href: "lesson01-page06-svo-negative.html", label: "否定句 don't / doesn't" },
      { href: "lesson01-page07-svo-question.html", label: "一般疑问 Do / Does" },
      { href: "lesson01-page08-wrap.html", label: "小结与迁移" },
      { href: "lesson01-handout-zhongkao.html", label: "讲义" },
      { href: "lesson01-exercise.html", label: "综合测试" },
    ],
  },
  {
    dir: "L02",
    title: "现在进行时",
    pages: [
      { href: "lesson02-page01-review.v2.html", label: "复习 · 动作 vs 状态" },
      { href: "lesson02-page02-contrast.html", label: "一般现在时 vs 进行时" },
      { href: "lesson02-page03-formula.html", label: "魔法公式" },
      { href: "lesson02-page04-spelling.html", label: "V-ing 拼写" },
      { href: "lesson02-page05-showdown.html", label: "语境大侦探" },
      { href: "lesson02-page06-force5.html", label: "Force 5 防守" },
      { href: "lesson02-page07-transformation.html", label: "句式变变变" },
      { href: "lesson02-page08-wrap.html", label: "结业典礼" },
      { href: "lesson02-page09-final-test.html", label: "终极试炼" },
      { href: "lesson02-handout-writing.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L03",
    title: "一般过去时",
    pages: [
      { href: "lesson03-page01-leadin.html", label: "复习启动" },
      { href: "lesson03-page02-audio.html", label: "盲听 was / were" },
      { href: "lesson03-page03-formula.html", label: "Be 动词分身" },
      { href: "lesson03-page04-patterns.html", label: "句式魔法" },
      { href: "lesson03-page05-action-leadin.html", label: "图片对比发现" },
      { href: "lesson03-page06-regular.html", label: "拼写炼金" },
      { href: "lesson03-page07-irregular.html", label: "不规则动词" },
      { href: "lesson03-page08-did.html", label: "Did / Wh- 提问" },
      { href: "lesson03-page09-quiz.html", label: "时光塔挑战" },
      { href: "lesson03-page10-pronunciation.html", label: "ed 发音" },
      { href: "lesson03-page11-reading.html", label: "侦探阅读" },
      { href: "lesson03-page12-writing.html", label: "故事接龙" },
      { href: "lesson03-page13-strategy.html", label: "时间轴侦探" },
      { href: "lesson03-page14-summary.html", label: "思维导图结案" },
      { href: "lesson03-page15-handout.html", label: "讲义" },
    ],
  },
  {
    dir: "L05",
    title: "名词所有格与 There be",
    pages: [
      { href: "lesson05-page01-leadin.html", label: "视听探案导入" },
      { href: "lesson05-page02-possessive.html", label: "所有权 · 所有格" },
      { href: "lesson05-page03-pronouns.html", label: "物主代词" },
      { href: "lesson05-page04-therebe.html", label: "There be" },
      { href: "lesson05-page05-prepositions.html", label: "方位介词" },
      { href: "lesson05-page06-preposition-possessive.html", label: "介词 × 所有格" },
      { href: "lesson05-page07-finale.html", label: "终极解密" },
      { href: "lesson05-page08-exam.html", label: "终极试炼" },
      { href: "lesson05-page09-handout.html", label: "讲义" },
    ],
  },
  {
    dir: "L06",
    title: "情态动词",
    pages: [
      { href: "lesson06-page01-leadin.html", label: "情境导入" },
      { href: "lesson06-page02-cancant.html", label: "Can 能力与许可" },
      { href: "lesson06-page03-musthaveto.html", label: "Must / have to" },
      { href: "lesson06-page04-mustnt-donthaveto.html", label: "mustn't / don't have to" },
      { href: "lesson06-page05-rulemaker.html", label: "规则定制" },
      { href: "lesson06-page06-diary.html", label: "日记纠错" },
      { href: "lesson06-page07-debate.html", label: "口语辩论" },
      { href: "lesson06-page08-escape.html", label: "禁闭室逃脱" },
      { href: "lesson06-page09-exam.html", label: "终极试炼" },
      { href: "lesson06-page10-handout.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L07",
    title: "比较级与最高级",
    pages: [
      { href: "lesson07-page01-arena.html", label: "竞技场破冰" },
      { href: "lesson07-page02-evolution.html", label: "比较级规则发现" },
      { href: "lesson07-page03-balance.html", label: "than / as…as" },
      { href: "lesson07-page04-twincities.html", label: "双城数据对决" },
      { href: "lesson07-page05-more-comparative.html", label: "more + 形容词" },
      { href: "lesson07-page06-arena.html", label: "最高级" },
      { href: "lesson07-page07-degree-adverbs.html", label: "程度副词 + 比较级" },
      { href: "lesson07-page08-irregular-comparison.html", label: "不规则比较" },
      { href: "lesson07-page09-practice.html", label: "综合测评" },
      { href: "lesson07-page10-handout-zhongkao.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L08",
    title: "将来时与条件句",
    pages: [
      { href: "lesson08-page01-archive.html", label: "时光档案室" },
      { href: "lesson08-page02-lab.html", label: "be going to 与 will" },
      { href: "lesson08-page03-crystal.html", label: "will + 原形" },
      { href: "lesson08-page04-catch.html", label: "going to vs will" },
      { href: "lesson08-page05-reactor.html", label: "第一条件与零条件" },
      { href: "lesson08-page06-chain.html", label: "第一条件句链" },
      { href: "lesson08-page07-traps.html", label: "语法陷阱" },
      { href: "lesson08-page08-masterplan.html", label: "2050 口语综括" },
      { href: "lesson08-page09-prophecy.html", label: "书面表达" },
      { href: "lesson08-page10-handout.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L09",
    title: "过去进行时",
    pages: [
      { href: "lesson09-page01-interrogation.html", label: "讯问桌" },
      { href: "lesson09-page02-timeline.html", label: "时间轴" },
      { href: "lesson09-page03-clueboard.html", label: "线索板" },
      { href: "lesson09-page04-reactor.html", label: "机房反应堆" },
      { href: "lesson09-page05-audio.html", label: "听力鉴定" },
      { href: "lesson09-page06-dossier.html", label: "语篇填空" },
      { href: "lesson09-page07-masterpiece.html", label: "看图写话" },
      { href: "lesson09-page08-archive.html", label: "知识卡总结" },
      { href: "lesson09-handout.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L10",
    title: "现在完成时",
    pages: [
      { href: "L10-00-index.html", label: "课程总览" },
      { href: "L10-01-warmup-review.html", label: "复习 · 一般过去时" },
      { href: "L10-02-present-perfect-form.html", label: "have/has + done" },
      { href: "L10-03-meaning-result-experience.html", label: "意义 · 结果与经历" },
      { href: "L10-04-adverbs-already-yet-just-ever-never.html", label: "标志词" },
      { href: "L10-05-speaking-have-you-ever.html", label: "口语 Have you ever" },
      { href: "L10-06-writing-new-term-prep.html", label: "写作" },
      { href: "L10-07-for-since-how-long.html", label: "for / since" },
      { href: "L10-08-contrast-past-simple.html", label: "vs 一般过去时" },
      { href: "L10-09-durative-verbs.html", label: "延续动词" },
      { href: "L10-10-translation-mimic.html", label: "翻译仿写" },
      { href: "L10-11-reading-mini.html", label: "微读" },
      { href: "L10-12-game-team-competition.html", label: "竞赛" },
      { href: "L10-13-assessment-exit-ticket.html", label: "测评" },
      { href: "L10-14-teacher-notes.html", label: "教师备注" },
      { href: "L10-handout.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L11",
    title: "状语从句",
    pages: [
      { href: "lesson11-page01-storyboard-intro.html", label: "发现与从句导入" },
      { href: "lesson11-page02-condition-reason.html", label: "条件与原因" },
      { href: "lesson11-page03-result-purpose.html", label: "结果与目的" },
      { href: "lesson11-page04-concession-no-double.html", label: "让步与不连用" },
      { href: "lesson11-page05-time-merge.html", label: "时间与合并" },
      { href: "lesson11-page06-reading-writing.html", label: "阅读与写作" },
      { href: "lesson11-page07-quiz.html", label: "当堂测" },
      { href: "lesson11-page08-handout.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L12",
    title: "宾语从句",
    pages: [
      { href: "lesson12-page01-library-access.html", label: "图书馆门禁" },
      { href: "lesson12-page02-that-object-clauses.html", label: "that 宾语从句" },
      { href: "lesson12-page03-reported-speech.html", label: "转述与时态后退" },
      { href: "lesson12-page04-wh-if-object-clauses.html", label: "wh- / if / whether" },
      { href: "lesson12-page05-passive-that-clauses.html", label: "被动与 that 从句" },
      { href: "lesson12-page06-comprehensive-test.html", label: "综合测试" },
      { href: "lesson12-page07-handout.html", label: "背诵讲义" },
    ],
  },
  {
    dir: "L13-定语从句",
    title: "定语从句",
    pages: [
      { href: "课件Demo_Lesson_Relative_Clause_01.html", label: "Who / Whom · 课件" },
      { href: "练习Demo_Lesson_Relative_Clause_01.html", label: "Who / Whom · 练习" },
      { href: "课件Demo_Lesson_Relative_Clause_02.html", label: "Which · 课件" },
      { href: "练习Demo_Lesson_Relative_Clause_02.html", label: "Which · 练习" },
      { href: "课件Demo_Lesson_Relative_Clause_03.html", label: "介词 + which/when/where · 课件" },
      { href: "练习Demo_Lesson_Relative_Clause_03.html", label: "介词 + which/when/where · 练习" },
    ],
  },
];

function renderIndex({ title, pages }) {
  const items = pages
    .map((p, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `      <li><a href="${p.href}"><span class="num">${num}</span><span class="label">${p.label}</span></a></li>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} · 目录</title>
  <link rel="stylesheet" href="../grammar-index.css" />
</head>
<body>
  <main class="g-index">
    <h1>${title}</h1>
    <ol>
${items}
    </ol>
    <p class="back"><a href="../../index.html">← 语法首页</a></p>
  </main>
</body>
</html>
`;
}

for (const mod of MODULES) {
  const dirPath = path.join(GRAMMAR, mod.dir);
  if (!fs.existsSync(dirPath)) {
    console.warn("skip (missing):", mod.dir);
    continue;
  }
  const out = path.join(dirPath, "index.html");
  fs.writeFileSync(out, renderIndex(mod), "utf8");
  console.log("wrote", out);
}
