/**
 * 在原版课件 Demo 末尾追加拓展屏：保留 guide-hidden / 分步演示 / 思考对比 思路
 */
import fs from "fs";
import path from "path";

const DIR = path.resolve("L13-定语从句");

const DEMO01_PAGE9 = `
  <div class="page" data-page="9">
    <h1>拓展 · who 与 whom 对比思考</h1>
    <p class="lead">在已学融合步骤基础上，对比「关系代词在从句中作主语还是宾语」。</p>

    <div class="sentence-block guide-hidden" id="p10-compare">
      <p><strong>作主语 → who</strong></p>
      <p lang="en">The girl <span class="modifier">who won the speech contest</span> is from Class 3.</p>
      <p style="margin-top:14px;"><strong>作宾语 → whom</strong></p>
      <p lang="en">The scientist <span class="modifier">whom the reporter interviewed</span> is famous.</p>
    </div>

    <div class="question-box guide-hidden" id="p10-qbox">
      <p class="guide-hidden" id="p10-qs1"><strong>问题 1：</strong> 第一句中，who 在从句里作主语还是宾语？</p>
      <p class="guide-hidden" id="p10-a1"><strong>答案 1：</strong> who 在从句中作主语（who won…）。</p>
      <p class="guide-hidden" id="p10-qs2"><strong>问题 2：</strong> 第二句中，whom 在从句里作主语还是宾语？</p>
      <p class="guide-hidden" id="p10-a2"><strong>答案 2：</strong> whom 作 interviewed 的宾语（interviewed whom）。</p>
      <p class="guide-hidden" id="p10-qs3"><strong>问题 3：</strong> 中考口语里，作宾语时 who 可以吗？</p>
      <p class="guide-hidden" id="p10-a3"><strong>答案 3：</strong> 可以，who 作宾语在口语和中考中常见；书面正式仍可用 whom。</p>
    </div>

    <div class="question-box guide-hidden" id="p10-practice">
      <p><strong>教师演示 · 再练一句</strong></p>
      <p class="p5-demo-line">1. I know a boy. The boy's mother is a nurse.</p>
      <p class="guide-hidden" id="p10-whose-hint"><strong>思考：</strong> 这里不是 who/whom，而是所属关系 → 预习 <strong>whose</strong>。</p>
      <p class="guide-hidden" id="p10-whose-ans" lang="en"><strong>融合：</strong> I know a boy whose mother is a nurse.</p>
      <button class="reveal-btn" type="button" onclick="var e=document.getElementById('p10-whose-hint');var a=document.getElementById('p10-whose-ans');if(e)e.classList.remove('guide-hidden');if(a)a.classList.remove('guide-hidden');if(window.speak)window.speak('I know a boy whose mother is a nurse.').catch(function(){});">显示思路与答案</button>
    </div>

    <div class="page-actions">
      <button class="reveal-btn" type="button" onclick="window.pageStepNextSafe && window.pageStepNextSafe(9)">显示下一步并朗读</button>
      <button class="reveal-btn ghost-btn" type="button" onclick="window.replayPageGuide && window.replayPageGuide(9)">重播本页引导</button>
      <button class="reveal-btn ghost-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(8)">上一页</button>
    </div>
  </div>
`;

const DEMO02_PAGE9 = `
  <div class="page" data-page="9">
    <h1>拓展 · whose 与 that 思考</h1>
    <p class="lead">在 which 指物基础上，思考「……的」所属关系与 that 的用法。</p>

    <div class="sentence-block guide-hidden" id="p10-whose-demo">
      <p lang="en">The house <strong>whose roof</strong> is red was built in 1990.</p>
      <p style="margin-top:10px;" class="zh-hint">whose + 名词 = ……的（屋顶）</p>
    </div>

    <div class="question-box guide-hidden" id="p10-whose-q">
      <p class="guide-hidden" id="p10-wq1"><strong>问题 1：</strong> whose 后面必须有什么？</p>
      <p class="guide-hidden" id="p10-wa1"><strong>答案 1：</strong> whose 后接名词，表示所属。</p>
      <p class="guide-hidden" id="p10-wq2"><strong>问题 2：</strong> 指物时 which 与 that 有何不同？</p>
      <p class="guide-hidden" id="p10-wa2"><strong>答案 2：</strong> 作主语/宾语均可；作宾语时 that/which 常可省略；介词后只用 which。</p>
      <p class="guide-hidden" id="p10-wq3"><strong>问题 3：</strong> 非限制性从句能用 that 吗？</p>
      <p class="guide-hidden" id="p10-wa3"><strong>答案 3：</strong> 非限制性从句（逗号隔开、补充说明）不用 that。</p>
    </div>

    <div class="page-actions">
      <button class="reveal-btn" type="button" onclick="window.pageStepNextSafe && window.pageStepNextSafe(9)">显示下一步并朗读</button>
      <button class="reveal-btn ghost-btn" type="button" onclick="window.replayPageGuide && window.replayPageGuide(9)">重播本页引导</button>
      <button class="reveal-btn ghost-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(8)">上一页</button>
    </div>
  </div>
`;

const DEMO03_PAGE7 = `
  <div class="page" data-page="7">
    <h1>拓展 · the reason why</h1>
    <p class="lead">时间、地点之外，表「原因」的先行词常用 why。</p>

    <div class="sentence-block guide-hidden" id="p7-why-demo">
      <p class="p5-demo-line">1. This is the reason.</p>
      <p class="p5-demo-line">2. He was late for the reason.</p>
      <p class="guide-hidden" id="p7-why-merge" style="margin-top:12px;font-weight:700;color:var(--color-accent);" lang="en">→ This is the reason why he was late.</p>
    </div>

    <div class="question-box guide-hidden" id="p7-why-q">
      <p class="guide-hidden" id="p7-yq1"><strong>问题 1：</strong> reason 在从句中作什么成分？</p>
      <p class="guide-hidden" id="p7-ya1"><strong>答案 1：</strong> 作原因状语（for the reason → why）。</p>
      <p class="guide-hidden" id="p7-yq2"><strong>问题 2：</strong> 能用 which 吗？</p>
      <p class="guide-hidden" id="p7-ya2"><strong>答案 2：</strong> 表原因优先用 why；for which 也可，但 why 更自然。</p>
    </div>

    <div class="page-actions">
      <button class="reveal-btn" type="button" onclick="window.p7WhyStepNext && window.p7WhyStepNext()">显示下一步并朗读</button>
      <button class="reveal-btn ghost-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(6)">上一页</button>
      <button class="reveal-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(8)">下一页</button>
    </div>
  </div>

  <div class="page" data-page="8">
    <h1>拓展 · 宾语 vs 状语 辨析</h1>
    <p class="lead">对比：先行词在从句中作宾语 → which；作时间/地点状语 → when / where。</p>

    <table class="data handout-table-compact guide-hidden" id="p8-cmp-table" style="width:100%;margin:12px 0;">
      <thead><tr><th>例句</th><th>关系词</th><th>原因</th></tr></thead>
      <tbody>
        <tr><td lang="en">The summer which we spent in Yunnan…</td><td>which</td><td>spent 的宾语</td></tr>
        <tr><td lang="en">The day when we first met…</td><td>when</td><td>时间状语</td></tr>
        <tr><td lang="en">The school where I studied…</td><td>where</td><td>地点状语</td></tr>
      </tbody>
    </table>

    <div class="question-box guide-hidden" id="p8-cmp-q">
      <p class="guide-hidden" id="p8-cq1"><strong>问题 1：</strong> Tsinghua is the university ______ many students want to enter. 填 which 还是 where？</p>
      <p class="guide-hidden" id="p8-ca1"><strong>答案 1：</strong> which（university 作 enter 的宾语）。</p>
      <p class="guide-hidden" id="p8-cq2"><strong>问题 2：</strong> Chengdu is a city ______ pandas are protected. 填 which 还是 where？</p>
      <p class="guide-hidden" id="p8-ca2"><strong>答案 2：</strong> where（表地点状语）。</p>
    </div>

    <div class="page-actions">
      <button class="reveal-btn" type="button" onclick="window.p8CmpStepNext && window.p8CmpStepNext()">显示下一步并朗读</button>
      <button class="reveal-btn ghost-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(7)">上一页</button>
    </div>
  </div>
`;

const MAP_PATCH_01 = `
      9: [
        { id: 'p10-compare', text: 'Compare who as subject and whom as object in two sentences.' },
        { id: 'p10-qbox', text: 'Let us answer three thinking questions.' },
        { id: 'p10-qs1', text: 'Question one. In the first sentence, is who a subject or an object in the clause?' },
        { id: 'p10-a1', text: 'Answer one. Who is the subject in the clause.' },
        { id: 'p10-qs2', text: 'Question two. In the second sentence, is whom a subject or an object?' },
        { id: 'p10-a2', text: 'Answer two. Whom is the object of interviewed.' },
        { id: 'p10-qs3', text: 'Question three. Can we use who as object in exams?' },
        { id: 'p10-a3', text: 'Answer three. Yes, who as object is common in spoken English and exams.' },
        { id: 'p10-practice', text: 'Preview whose with a boy whose mother is a nurse.' }
      ],`;

const MAP_PATCH_02 = `
      9: [
        { id: 'p10-whose-demo', text: 'Look at whose plus a noun.' },
        { id: 'p10-whose-q', text: 'Three thinking questions about whose and that.' },
        { id: 'p10-wq1', text: 'Question one. What must follow whose?' },
        { id: 'p10-wa1', text: 'Answer one. Whose must be followed by a noun.' },
        { id: 'p10-wq2', text: 'Question two. How are which and that different for things?' },
        { id: 'p10-wa2', text: 'Answer two. Both work as subject or object; after prepositions use which only.' },
        { id: 'p10-wq3', text: 'Question three. Can we use that in non-restrictive clauses?' },
        { id: 'p10-wa3', text: 'Answer three. No. Non-restrictive clauses do not use that.' }
      ],`;

const SCRIPT_PATCH_03 = `
  window.__p7WhyStep = -1;
  window.p7WhyStepNext = async function() {
    var steps = [
      { id: 'p7-why-demo', text: 'The reason why he was late.' },
      { id: 'p7-why-q', text: 'Think about the role of reason in the clause.' },
      { id: 'p7-yq1', text: 'Question one. What role does reason play?' },
      { id: 'p7-ya1', text: 'Answer one. Reason acts as adverbial of cause.' },
      { id: 'p7-yq2', text: 'Question two. Can we use which?' },
      { id: 'p7-ya2', text: 'Answer two. Why is more natural for reason.' }
    ];
    window.__p7WhyStep = Math.min(window.__p7WhyStep + 1, steps.length - 1);
    var s = steps[window.__p7WhyStep];
    var el = document.getElementById(s.id);
    if (el) { el.classList.remove('guide-hidden'); void el.offsetWidth; el.classList.add('guide-reveal'); }
    try { if (window.unlockAudio) await window.unlockAudio(); if (window.speak && s.text) await window.speak(s.text); } catch(_) {}
  };
  window.__p8CmpStep = -1;
  window.p8CmpStepNext = async function() {
    var steps = [
      { id: 'p8-cmp-table', text: 'Compare which for object and when or where for adverbials.' },
      { id: 'p8-cmp-q', text: 'Two comparison questions.' },
      { id: 'p8-cq1', text: 'Question one. University as object of enter.' },
      { id: 'p8-ca1', text: 'Answer one. Use which.' },
      { id: 'p8-cq2', text: 'Question two. City as place adverbial.' },
      { id: 'p8-ca2', text: 'Answer two. Use where.' }
    ];
    window.__p8CmpStep = Math.min(window.__p8CmpStep + 1, steps.length - 1);
    var s = steps[window.__p8CmpStep];
    var el = document.getElementById(s.id);
    if (el) { el.classList.remove('guide-hidden'); void el.offsetWidth; el.classList.add('guide-reveal'); }
    try { if (window.unlockAudio) await window.unlockAudio(); if (window.speak && s.text) await window.speak(s.text); } catch(_) {}
  };
`;

function injectDemo01() {
  const fp = path.join(DIR, "课件Demo_Lesson_Relative_Clause_01.html");
  let html = fs.readFileSync(fp, "utf8");
  if (html.includes('data-page="9"') && html.includes("p10-compare")) {
    console.log("demo01 already injected");
    return;
  }
  html = html.replace(
    /(\s+<button class="reveal-btn ghost-btn" data-go-page="7"[^>]*>上一页<\/button>\s*<\/div>\s*<\/div>\s*\n\s*<\/div>)/,
    `$1${DEMO01_PAGE9}`
  );
  html = html.replace(
    /(<button class="reveal-btn ghost-btn" data-go-page="7" type="button" onclick="window\.goToPageSafe && window\.goToPageSafe\(7\)">上一页<\/button>)\s*(<\/div>\s*<\/div>\s*<\/div>)/,
    `$1\n      <button class="reveal-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(9)">下一页</button>\n    $2`
  );
  html = html.replace("if (current < 8) goToPage(current + 1);", "if (current < 9) goToPage(current + 1);");
  html = html.replace(
    "window.__manualSafeIdx = { 2: -1, 3: -1, 4: -1, 5: -1, 6: -1, 7: -1, 8: -1 };",
    "window.__manualSafeIdx = { 2: -1, 3: -1, 4: -1, 5: -1, 6: -1, 7: -1, 8: -1, 9: -1 };"
  );
  html = html.replace(
    /(\s+8: \[\s+\{ id: 'p9-step8'[\s\S]*?\}\s+\])\s+(\};)/,
    `$1,${MAP_PATCH_01}$2`
  );
  if (!html.includes("replayPageGuide(9)")) {
    html = html.replace(
      "window.replayPageGuide = function(pageNum) {",
      `window.replayPageGuide = function(pageNum) {
    if (Number(pageNum) === 9) { window.__manualSafeIdx[9] = -1; return; }`
    );
  }
  fs.writeFileSync(fp, html, "utf8");
  console.log("injected demo01");
}

function injectDemo02() {
  const fp = path.join(DIR, "课件Demo_Lesson_Relative_Clause_02.html");
  let html = fs.readFileSync(fp, "utf8");
  if (html.includes("p10-whose-demo")) {
    console.log("demo02 already injected");
    return;
  }
  html = html.replace(
    /(\s+<\/div>\s*<\/div>\s*\n<\/div>\s*\n<div class="hidden")/,
    `${DEMO02_PAGE9}$1`
  );
  html = html.replace(
    /(<button class="reveal-btn ghost-btn" data-go-page="7"[^>]*>上一页<\/button>)\s*(<\/div>\s*<\/div>\s*<\/div>\s*\n<\/div>)/,
    `$1\n      <button class="reveal-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(9)">下一页</button>\n    $2`
  );
  if (html.includes("window.__manualSafeIdx")) {
    html = html.replace(
      /window\.__manualSafeIdx = \{([^}]+)\}/,
      (m, inner) => `window.__manualSafeIdx = {${inner}, 9: -1 }`
    );
  }
  if (html.includes("pageStepNextSafe")) {
    html = html.replace(
      /(\s+8: \[[\s\S]*?p9-step8[\s\S]*?\]\s*)(\n\s*\};)/,
      `$1,${MAP_PATCH_02}$2`
    );
  }
  fs.writeFileSync(fp, html, "utf8");
  console.log("injected demo02");
}

function injectDemo03() {
  const fp = path.join(DIR, "课件Demo_Lesson_Relative_Clause_03.html");
  let html = fs.readFileSync(fp, "utf8");
  if (html.includes("p7-why-demo")) {
    console.log("demo03 already injected");
    return;
  }
  const marker = "</div>\n\n<div class=\"hidden\"";
  if (!html.includes(marker)) {
    console.warn("demo03 marker not found");
    return;
  }
  html = html.replace(marker, `${DEMO03_PAGE7}\n${marker}`);
  html = html.replace(
    /(<div class="page-actions[^"]*">[\s\S]*?data-go-page="6"[^<]*<\/button>)\s*(<\/div>\s*<\/div>)(\s*\n<\/div>\s*\n<div class="hidden")/,
    `$1\n      <button class="reveal-btn" type="button" onclick="window.goToPageSafe && window.goToPageSafe(7)">下一页</button>\n    $2$3`
  );
  if (!html.includes("p7WhyStepNext")) {
    html = html.replace("<script>\n(function() {", `<script>\n${SCRIPT_PATCH_03}\n(function() {`);
  }
  fs.writeFileSync(fp, html, "utf8");
  console.log("injected demo03");
}

injectDemo01();
injectDemo02();
injectDemo03();
