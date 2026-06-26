#!/usr/bin/env node
/**
 * 修复 Mock2 白卷教师版：阅读 B/C 题块改为与阅读 A 一致的 read-a-questions + 答案解析
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEACHER_HTML = path.join(ROOT, "HET/2026 Mock 2/2026成都英语白卷-答案与解析.html");
const STUDENT_HTML = path.join(ROOT, "HET/2026 Mock 2/2026成都英语白卷.html");
const PARSE_JS = path.join(ROOT, "HET/exam-shared/parse-data/mock2.js");

const ANSWERS = {
  51: "C",
  52: "C",
  53: "C",
  54: "B",
  55: "B",
  56: "C",
  57: "B",
  58: "A",
  59: "C",
  60: "C",
};

const KEYS = {
  51: {
    evidence:
      "Birds that nest in dark areas—like holes in trees—don't seem to be greatly influenced by light pollution.",
    kaodian: "细节理解：受光污染影响最小的鸟类类型。",
    steps: "① 题干 least influenced；② 首段末句树洞筑巢鸟类受影响较小；③ 选 C。",
    opts: "A 大眼睛鸟类反而受影响更大；B open areas 文中未提；C 树洞筑巢鸟类 — 正确。",
    yicuo: "误选 A，因前文提到 larger eyes 受影响强，题干问的是 least。",
    extend: "nest in holes in trees；light pollution 光污染。",
  },
  52: {
    evidence:
      "was looking for a way to get his students more interested in birds. He set up a microphone outdoors…",
    kaodian: "细节理解：Pease 最初架设麦克风的目的。",
    steps: "① 问 at first 的原因；② 第二段首句为让学生对鸟类更感兴趣；③ 选 C。",
    opts: "A 为研究录音是后续发展；B 研究光污染非最初目的；C 激发学生兴趣 — 正确。",
    yicuo: "选 A/B 混淆“后来研究”与“最初动机”。",
    extend: "get sb. interested in…；set up a microphone 架设麦克风。",
  },
  53: {
    evidence:
      "18 minutes earlier… an extra 32 minutes… 50 minutes longer every day.",
    kaodian: "写作手法：第三段如何呈现光污染影响。",
    steps: "① 第三段列举 18、32、50 等数据；② 用数字说明影响程度；③ 选 C。",
    opts: "A 因果解释 — 本段无；B 结果+原因 — 偏；C 列数据对比 — 正确。",
    yicuo: "选 B 因看到 research data，但本段重点是具体数字。",
    extend: "on average 平均；listing numbers 列数据。",
  },
  54: {
    evidence:
      "it's too early to tell if staying up late is actually harmful… Further study is still needed",
    kaodian: "推理判断：研究之后可能做什么。",
    steps: "① 末段说熬夜是否有害尚不清楚；② 需 further study；③ 选 B 研究是否有害。",
    opts: "A 演讲救鸟 — 无据；B 研究熬夜是否有害 — 正确；C 更多教学方式 — 非重点。",
    yicuo: "选 C 因第二段提到学生，但末段指向后续科研方向。",
    extend: "too early to tell；draw a conclusion 得出结论。",
  },
  55: {
    evidence: "① 研究发现；b ② 麦克风与 BirdWeather 方法 d；③ 数据结果 a；④ 结论展望 c",
    kaodian: "信息匹配（新考法）：段落与小标题对应。",
    steps: "①-b 研究发现；②-d 研究方法；③-a 数据结果；④-c 结论展望 → 选 B。",
    opts: "A/C 段落与标题错位；B ①-b, ②-d, ③-a, ④-c — 正确。",
    yicuo: "把②③对调；① 误选 a（数据）而非 b（发现）。",
    extend: "Research Findings / Method / Data Results / Conclusion and Outlook。",
  },
  56: {
    evidence:
      "presents many classic stories from the novel… powerful Monkey King IP",
    kaodian: "细节理解：西游主题乐园以何闻名。",
    steps: "① 问 Xiyou World famous for；② 首段强调西游记故事与角色；③ 选 C。",
    opts: "A 科技与设施是辅助；B 剧院数量属河南案例；C 西游记故事与角色 — 正确。",
    yicuo: "选 A 因看到 advanced technology，但 famous for 核心是 IP 与故事。",
    extend: "Journey to the West；theme park IP 主题公园 IP。",
  },
  57: {
    evidence: "beautifully designed… just as good as the Harry Potter ride",
    kaodian: "例证作用：Lisa 的例子说明什么。",
    steps: "① Lisa 称赞设计并与环球影城项目对比；② 用以展示好评；③ 选 B。",
    opts: "A 只描述最爱项目 — 片面；B 展示对公园的赞扬 — 正确；C 解释技术 — 非主旨。",
    yicuo: "选 A 只见 example 细节，忽略 mainly help to do。",
    extend: "take … as an example；praise 称赞。",
  },
  58: {
    evidence:
      "visitors can walk among the performers for a more immersive experience",
    kaodian: "细节理解：只有河南戏剧公园的特别体验。",
    steps: "① 问 Unique Henan 的特别之处；② 观众可走进演员之中；③ 选 A。",
    opts: "A 看演出并可走进演员之中 — 正确；B 花车巡游属西游园；C 高科技打斗 — 无据。",
    yicuo: "选 B 混淆淮安西游园与河南戏剧公园。",
    extend: "immersive experience 沉浸式体验；walk among performers。",
  },
  59: {
    evidence:
      "made great progress… still have room for improvement… need to catch up",
    kaodian: "观点态度：林焕杰对中国主题乐园未来的态度。",
    steps: "① 肯定进步；② 也指出不足需追赶；③ 既希望又客观 → C。",
    opts: "A 完全自信 — 过强；B 担忧失望 — 过重；C 希望且客观 — 正确。",
    yicuo: "选 A 只看 progress；选 B 只看 need to catch up。",
    extend: "hopeful and objective；room for improvement。",
  },
  60: {
    evidence:
      "cultural theme parks with traditional Chinese stories… in Development",
    kaodian: "主旨大意：最佳标题。",
    steps: "① 全文讲中国文化主题公园发展；② 举例+专家点评；③ 选 C 总括全文。",
    opts: "A 仅苏豫两地 — 以偏概全；B 外国乐园领先 — 片面；C 中国文化主题乐园发展 — 正确。",
    yicuo: "选 A 被例子地点限制；选 B 只抓末段一句。",
    extend: "main idea / best title 排除以偏概全。",
  },
};

function teacherKey(n, ans) {
  const k = KEYS[n];
  return (
    `<div class="teacher-key" id="key-${n}"><p class="tk-head"><strong>第 ${n} 题</strong> 参考答案：<span class="tk-ans">${ans}</span></p>` +
    `<div class="tk-parse"><p class="ex-sec"><strong>【正确答案】</strong></p><div class="ex-body">本题选 <span class="ans-letter">${ans}</span>。</div>` +
    `<p class="ex-sec"><strong>【原文证据】</strong></p><div class="ex-body"><em>${k.evidence}</em></div>` +
    `<p class="ex-sec"><strong>【考点与命题意图】</strong></p><div class="ex-body">${k.kaodian}</div>` +
    `<p class="ex-sec"><strong>【解题思路与步骤】</strong></p><div class="ex-body">${k.steps}</div>` +
    `<p class="ex-sec"><strong>【选项分析】</strong></p><div class="ex-body">${k.opts}</div>` +
    `<p class="ex-sec"><strong>【易错点与教学建议】</strong></p><div class="ex-body">${k.yicuo}</div></div>` +
    `<div class="tk-extend"><p class="ex-sec"><strong>【知识拓展】</strong></p><div class="ex-body">${k.extend}</div></div></div>`
  );
}

function dryParse(n, ans) {
  const k = KEYS[n];
  const kaodian = k.kaodian.replace(/。$/, "");
  let yicuo = "";
  if (/误选|混淆/.test(k.yicuo)) {
    const m = k.yicuo.match(/误选[^；。]+/);
    yicuo = m ? m[0] : k.yicuo.slice(0, 80);
  }
  const parts = [
    `<p><strong>答案</strong> ${ans}</p>`,
    `<p><strong>考点</strong> ${kaodian}</p>`,
    `<p><strong>依据</strong> ${k.evidence.slice(0, 100)}</p>`,
  ];
  if (yicuo) parts.push(`<p><strong>易错</strong> ${yicuo}</p>`);
  return `<div class="parse-dry">${parts.join("")}</div>`;
}

function markCorrect(qEl, ans) {
  qEl.querySelectorAll("label.opt").forEach((lab) => {
    const inp = lab.querySelector('input[type="radio"]');
    if (!inp) return;
    inp.setAttribute("disabled", "");
    lab.classList.remove("opt-correct");
    if (inp.value === ans) {
      lab.classList.add("opt-correct");
      inp.setAttribute("checked", "");
    } else {
      inp.removeAttribute("checked");
    }
  });
}

function normalizeStem(stemEl, n) {
  stemEl.className = "q-stem";
  const qn = stemEl.querySelector(".qn");
  if (qn) {
    qn.className = "q-num";
    qn.textContent = `${n}.`;
  }
}

function convertQuestion(qEl, n) {
  const ans = ANSWERS[n];
  const stem = qEl.querySelector(".q-stem, .read-q-stem");
  if (stem) normalizeStem(stem, n);

  const optsWrap = qEl.querySelector(".q-opts, .opts");
  if (optsWrap) {
    optsWrap.className = qEl.classList.contains("match-q")
      ? "q-opts match-opts"
      : "q-opts";
    optsWrap.querySelectorAll("label.opt").forEach((lab) => {
      const bracket = lab.querySelector(".bracket");
      if (bracket) bracket.remove();
      const txt = lab.querySelector(".opt-txt");
      if (txt) {
        const m = txt.textContent.match(/^([A-C])\.\s*(.*)$/s);
        if (m) {
          let key = lab.querySelector(".opt-key");
          if (!key) {
            key = qEl.ownerDocument.createElement("span");
            key.className = "opt-key";
            lab.insertBefore(key, txt);
          }
          key.textContent = m[1] + ".";
          const body = lab.querySelector(".opt-body");
          if (body) body.textContent = m[2];
          else {
            const span = qEl.ownerDocument.createElement("span");
            span.className = "opt-body";
            span.textContent = m[2];
            txt.replaceWith(span);
          }
        }
      }
      if (!lab.querySelector(".opt-key")) {
        const inp = lab.querySelector("input");
        const val = inp?.value;
        if (val) {
          const key = qEl.ownerDocument.createElement("span");
          key.className = "opt-key";
          key.textContent = val + ".";
          lab.insertBefore(key, inp.nextSibling);
        }
      }
    });
  }

  qEl.classList.remove("print-q-page", "read-q", "mc-q");
  markCorrect(qEl, ans);

  const unit = qEl.ownerDocument.createElement("div");
  unit.className = "q-unit";
  unit.id = `q${n}`;
  const item = qEl.ownerDocument.createElement("div");
  item.className = "q-item" + (qEl.classList.contains("match-q") ? " match-q" : "");
  item.innerHTML = qEl.innerHTML;
  unit.appendChild(item);
  const wrap = qEl.ownerDocument.createElement("div");
  wrap.innerHTML = teacherKey(n, ans);
  unit.appendChild(wrap.firstElementChild);
  return unit.outerHTML;
}

function buildQuestionsBlock(studentDoc, ids) {
  const parts = [];
  for (const n of ids) {
    const el = studentDoc.getElementById(`q${n}`);
    if (!el) throw new Error(`student q${n} not found`);
    parts.push(convertQuestion(el, n));
  }
  return `<div class="read-a-questions">${parts.join("")}</div>`;
}

function patchTeacherHtml() {
  const studentDoc = new JSDOM(fs.readFileSync(STUDENT_HTML, "utf8")).window.document;
  const blockB = buildQuestionsBlock(studentDoc, [51, 52, 53, 54, 55]);
  const blockC = buildQuestionsBlock(studentDoc, [56, 57, 58, 59, 60]);

  let html = fs.readFileSync(TEACHER_HTML, "utf8");

  html = html.replace(
    /(<p class="read-label">B<\/p>[\s\S]*?<div class="passage-zh">[\s\S]*?<\/div>)[\s\S]*?(?=<div class="read-block">\s*<p class="read-label">C<\/p>)/,
    `$1${blockB}\n      `
  );

  html = html.replace(
    /(<p class="read-label">C<\/p>[\s\S]*?<div class="passage-zh">[\s\S]*?<\/div>)[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>)/,
    `$1${blockC}\n      `
  );

  fs.writeFileSync(TEACHER_HTML, html, "utf8");
  console.log("patched", path.relative(ROOT, TEACHER_HTML));
}

function patchParseJs() {
  let js = fs.readFileSync(PARSE_JS, "utf8");
  for (let n = 51; n <= 60; n++) {
    const key = `key-${n}`;
    const entry = `  "${key}": ${JSON.stringify(dryParse(n, ANSWERS[n]))}`;
    if (js.includes(`"${key}"`)) {
      js = js.replace(new RegExp(`  "${key}": "[^"]*(?:\\\\.[^"]*)*"`, "m"), entry);
      js = js.replace(
        new RegExp(`  "${key}": '<div class=\\\\"parse-dry\\\\">[\\s\\S]*?</div>'`, "m"),
        entry
      );
      js = js.replace(
        new RegExp(`  "${key}": \`<div class="parse-dry">[\\s\\S]*?</div>\``, "m"),
        entry
      );
    } else {
      js = js.replace(/\n};\s*$/, `,\n${entry}\n};\n`);
    }
  }
  fs.writeFileSync(PARSE_JS, js, "utf8");
  console.log("patched", path.relative(ROOT, PARSE_JS));
}

patchTeacherHtml();
patchParseJs();
console.log("Done: Mock2 reading B/C teacher blocks fixed.");
