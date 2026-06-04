import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walkHandouts(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    if (fs.statSync(fp).isDirectory() && !name.startsWith(".") && name !== "node_modules") {
      walkHandouts(fp, out);
    } else if (/handout/i.test(name) && name.endsWith(".html")) {
      out.push(fp);
    }
  }
  return out;
}

function stripExamAndTextbookSources(html) {
  let out = html;

  out = out.replace(
    /<section class="print-section">\s*<h2>十一、2018-2025[\s\S]*?<\/section>\s*/i,
    ""
  );

  const pairs = [
    ["中考／衔接高中", ""],
    ["（中考／衔接高中）", ""],
    ["中考作文极高频开头", "作文常用开头"],
    ["中考作文中", "作文中"],
    ["中考写作提分金句", "写作金句"],
    ["中考写作金句", "写作金句"],
    ["中考德育主题", "德育主题"],
    ["中考口语/书面都实用", "口语与书面都实用"],
    ["中考高频陷阱", "常见易错点"],
    ["中考高频对照", "常见时态对照"],
    ["中考提分关键 · 高阶区", "高阶拓展"],
    ["中考提分关键", "高阶拓展"],
    ["中考题型映射：看到题目先想什么？", "常见设问与第一反应"],
    ["中考题型映射", "常见设问映射"],
    ["中考核心判断顺序", "核心判断顺序"],
    ["中考长句抓手", "长句表达抓手"],
    ["中考必背口诀", "必背口诀"],
    ["中考判断", "判断要点"],
    ["中考提醒", "注意"],
    ["中考红线", "重要提醒"],
    ["本讲到底考什么？", "本讲学什么？"],
    ["对应中考任务", "巩固方向"],
    ["一般现在时在考什么？", "一般现在时学什么？"],
    ["能在中考题中判断", "能判断"],
    ["并能在中考题中", "并能"],
    ["（句型转换常考）", ""],
    ["(句型转换常考)", ""],
    ["考题常优先", "练习中常优先"],
    ["按本讲考点要求判错", "按本讲要求判错"],
    ["（视教材）", ""],
    ["考点多在", "多用于"],
    ["（阅读定位高频）", ""],
    ["考试时怎么想？", "怎么想？"],
    ["考试常见 can", "常见 can"],
    ["考场上", "书写时"],
    ["考场记叙文", "记叙文"],
    ["议论文、说明文提分的", "议论文、说明文的"],
    ["终极结案报告", ""],
    ["单选、完形、短文填空", "句法与填空练习"],
    ["语法选择、看图写句", "句法判断与造句"],
    ["阅读定位、地图题、写作", "阅读与描写"],
    ["书面表达、任务型写作", "段落写作"],
    [
      "本讲义把第03讲的口诀、不规则动词家族与写作金句固化为一张纸",
      "本讲义把口诀、不规则动词家族与写作金句固化为一张纸",
    ],
    ["与 L01 的照妖镜法则一脉相承", "与前面学过的照妖镜法则一脉相承"],
    ['一般过去时 (Simple Past Tense) 终极结案报告', "一般过去时"],
    ["考点 A ·", "模块 A ·"],
    ["考点 B ·", "模块 B ·"],
    ["考点 C ·", "模块 C ·"],
    ["考点 D ·", "模块 D ·"],
  ];

  for (const [from, to] of pairs) {
    out = out.split(from).join(to);
  }

  out = out.replace(
    /本节对应 <strong>lesson07-page08-irregular-comparison\.html<\/strong>：/g,
    ""
  );
  out = out.replace(/视教材/g, "");
  out = out.replace(/中考/g, "");

  out = out.replace(/（\s*）/g, "");

  return out;
}

const files = walkHandouts(ROOT);
let n = 0;
for (const fp of files) {
  const before = fs.readFileSync(fp, "utf8");
  const after = stripExamAndTextbookSources(before);
  if (after !== before) {
    fs.writeFileSync(fp, after, "utf8");
    console.log("OK", path.relative(ROOT, fp));
    n++;
  }
}
console.log("\nPatched", n, "files");
