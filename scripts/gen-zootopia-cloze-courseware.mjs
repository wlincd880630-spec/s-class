/**
 * 生成「疯狂动物城2」主题选词填空课件（DeepSeek 内容 + 套题33 模板）
 * 用法: node scripts/gen-zootopia-cloze-courseware.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COURSEWARE_DIR = path.join(ROOT, "HET", "词形填空练习", "courseware");
const TEMPLATE = path.join(COURSEWARE_DIR, "套题33选词填空.html");
const HANDOUT_TEMPLATE = path.join(COURSEWARE_DIR, "套题33选词填空handout.html");
const OUT_BASE = "新课01疯狂动物城2选词填空";

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || "sk-daa16008e81843deba6fefe9dce51465";
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const WORD_BANK = [
  "appear", "divide", "effort", "invent", "prevent", "quick",
  "regret", "save", "secret", "while", "worth", "wrong",
];

const EXAM_ANSWERS = {
  1: "disappearance",
  2: "wrongly",
  3: "quicker",
  4: "was divided",
  5: "to prevent",
  6: "efforts",
  7: "secretly",
  8: "while",
  9: "regretted",
  10: "worth",
};

const DISTRACTORS = ["invent", "save"];

const CORRECT_PASSAGE = `Zootopia 2 is a hit movie about Judy the rabbit and Nick the fox. In the story, a sudden __1__ of Zootopia's weather wall blueprint shocks the whole city. A snake named Gary is __2__ seen as a criminal at first.

However, fear soon spreads through the city. The villainous Lynxley family spreads lies to make fear spread even __3__. Although Zootopia was peaceful before, the city __4__ as people stop trusting one another. Judy and Nick act fast __5__ things from getting worse.

The two detectives find the truth in an old library. The Lynxleys stole the blueprint and hid the reptiles' hard __6__ to protect the city.

Judy and Nick risk their lives and enter the Lynxleys' house __7__. Nick overcomes his fears __8__ Judy learns more about fairness. Many animals later __9__ missing chances to understand others.

At the end, Judy says that teamwork and understanding are __10__ far more than fear and prejudice.`;

const PROMPT = `你是中国中考英语命题与教学设计专家。请为「选词填空」互动课件生成完整 JSON 数据。

## 题目背景（参照真题截图）
主题：《疯狂动物城2》(Zootopia 2) 剧情短文填空。
词库（12词，每词限用一次，10空）：${WORD_BANK.join(", ")}
正确答案（空号1-10）：
${Object.entries(EXAM_ANSWERS).map(([k, v]) => `${k}: ${v}`).join("\n")}
干扰项（未使用）：${DISTRACTORS.join(", ")}

## 输出要求
返回**纯 JSON**（不要 markdown 代码块），结构如下：
{
  "title": "短文标题（中文副标题可含疯狂动物城2）",
  "themeIntro": "一句英文迁移句（关于团队合作、理解、克服偏见，可用于TTS）",
  "passage": "完整英文短文，用 __1__ 到 __10__ 标记十个空（不要用61-70）。约180-220词，5段，中考难度，讲述 Judy 和 Nick 调查天气墙蓝图失踪、揭露 Lynxley 家族谎言、帮助 Gary 等爬行动物被误解的故事。语言自然、有叙事张力。",
  "vocabUnits": [ 12个对象，顺序与词库一致 ]
}

每个 vocabUnits 项结构：
{
  "headword": "原形",
  "spell": "原形",
  "ttsWord": "原形",
  "defA2": "A2英文释义（一句）",
  "defReadAloud": "适合朗读的英文释义",
  "usages": [
    { "label": "中文用法标签", "sentence": "自编中考难度英文例句（不复述本题passage原文）", "sentenceZh": "中文译文", "explain": "中文解释", "rephrase": "更简单的英文改写" }
  ],  // 恰好3条，对写作/口语有实用价值
  "derivatives": [
    {
      "q": "Step3标题如「名词 disappearance」",
      "answer": "派生形式",
      "readAloud": "朗读词",
      "note": "拼写/用法提示",
      "exampleSentence": "自编例句（不复述passage）",
      "exampleZh": "译文",
      "induct": { "title": "归纳标题", "peers": ["6个同类词/短语"], "tip": "语法提示" }
    }
  ],  // 1-2个派生/变形；考点词须有对应考试形式的派生
  "examTarget": {
    "form": "本题答案词形",
    "examExamples": [
      { "readSentence": "含 blankAnswer 的完整句（可含本题语境类似句+另1-2句迁移句）", "readSentenceZh": "译文", "blankAnswer": "答案词形" }
    ],  // 2-3条
    "note": "套题说明：考点与词形判断依据（中文）"
  }
}

## 质量要求
- 所有例句具备高度语言意义，可用于写作或口语表达
- 符合中国中考（初三）词汇与语法难度
- invent/save 作为干扰项，examTarget.form 仍填原形，note 标明「干扰项」
- appear→disappearance, wrong→wrongly, quick→quicker, divide→was divided, prevent→to prevent, effort→efforts, secret→secretly, while→while, regret→regretted, worth→worth
- JSON 必须合法，字符串内双引号须转义`;

async function callDeepSeek() {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DEEPSEEK_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You output only valid JSON. No markdown fences." },
        { role: "user", content: PROMPT },
      ],
      temperature: 0.4,
      max_tokens: 16000,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${await res.text()}`);
  const data = await res.json();
  let text = data.choices?.[0]?.message?.content || "";
  text = text.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
  return JSON.parse(text);
}

function formatJsonBlock(obj, indent = 4) {
  const pad = " ".repeat(indent);
  return JSON.stringify(obj, null, 4)
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

function answerKeyLine(answers) {
  return Object.entries(answers)
    .map(([k, v]) => `${k} ${v}`)
    .join(" · ");
}

function patchCourseware(template, data) {
  let html = fs.readFileSync(template, "utf8");

  const title = `短文填空 · 新课01 · 疯狂动物城2 · 词形课件`;
  html = html.replace(/<title>[^<]+<\/title>/, `<title>${title}</title>`);

  // Replace WORD_BANK
  html = html.replace(
    /const WORD_BANK = \[[^\]]+\];/,
    `const WORD_BANK = ${JSON.stringify(WORD_BANK)};`
  );

  // Replace PRACTICE_ANS
  const ansObj = {};
  for (const [k, v] of Object.entries(EXAM_ANSWERS)) ansObj[k] = v;
  html = html.replace(
    /const PRACTICE_ANS = \{[\s\S]*?\};/,
    `const PRACTICE_ANS = ${formatJsonBlock(ansObj)};`
  );

  // Replace PASSAGE (use exam-aligned passage, not raw DeepSeek draft)
  const passageEsc = CORRECT_PASSAGE.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
  html = html.replace(
    /const PASSAGE = `[\s\S]*?`;/,
    `const PASSAGE = \`${passageEsc}\`;`
  );

  // Replace VOCAB_UNITS
  html = html.replace(
    /const VOCAB_UNITS = \[[\s\S]*?\]\s*\n\n    const slides/,
    `const VOCAB_UNITS = ${formatJsonBlock(data.vocabUnits)}\n\n    const slides`
  );

  const keyLine = answerKeyLine(EXAM_ANSWERS);
  const distractorNote = DISTRACTORS.join(" / ");

  // Slide intro blocks (targeted replacements only — do not use greedy regex across slides)
  html = html.replace(
    /<title>[^<]+<\/title>/,
    `<title>${title}</title>`
  );

  html = html.replace(
    /短文填空 · 套题 33｜2021 年金牛区二诊 · 校运会接力/,
    "短文填空 · 新课01 · 疯狂动物城2"
  );

  html = html.replace(
    /<li>校运会 · 4×400m 接力 · 叙事\/感悟<\/li>\s*<li>方框 12 词 · 语篇 10 空；干扰项：<strong>happy \/ pass<\/strong><\/li>\s*<li>复盘：<span class="mono">[^<]+<\/span><\/li>/,
    `<li>疯狂动物城2 · 蓝图失踪 · 偏见与真相</li>
          <li>方框 12 词 · 语篇 10 空；干扰项：<strong>${distractorNote}</strong></li>
          <li>复盘：<span class="mono">${keyLine}</span></li>`
  );

  html = html.replace(
    /<h2 class="slide-h2">接力赛 · 训练与临场 · 团队精神<\/h2>/,
    `<h2 class="slide-h2">疯狂动物城2 · 信任与理解 · 克服偏见</h2>`
  );

  html = html.replace(
    /data-text="Relay races reward teamwork, courage, and trust between teammates\."/,
    `data-text="${data.themeIntro.replace(/"/g, "&quot;")}"`
  );

  html = html.replace(
    /<p class="mono">catch \/ forward \/ happy \/ inspire \/ last \/ nervous \/ pass \/ possible \/ sign \/ shout \/ start \/ total<\/p>\s*<div class="card"><h3>策略提示<\/h3><p>先标出十大槽位，再回填变形；干扰项勿强行代入。<\/p><\/div>/,
    `<p class="mono">${WORD_BANK.join(" / ")}</p>
      <div class="card"><h3>策略提示</h3><p>先标出十大槽位，再回填变形；注意名词化、副词化、被动语态与不定式；干扰项勿强行代入。</p></div>`
  );

  html = html.replace(
    /pushVocabProgram\(VOCAB_UNITS, "本题"\)/,
    `pushVocabProgram(VOCAB_UNITS, "新课01")`
  );

  html = html.replace(
    /<div class="sense">处理后五空：注意被动、不定式、比较级、名动形转换。<\/div>/,
    `<div class="sense">处理后五空：注意副词 secretly、连词 while、过去式 regretted、形容词 worth 等。</div>`
  );

  html = html.replace(
    /<div class="card"><h3>快速核对清单<\/h3><p class="mono">[^<]+<\/p><\/div>`\);/,
    `<div class="card"><h3>快速核对清单</h3><p class="mono">${keyLine}</p></div>\`);`
  );

  html = html.replace(
    /本题词汇流（12 词族 · 方框 12 词）/,
    "新课01 词汇流（12 词族 · 方框 12 词）"
  );

  return html;
}

function patchHandout(template, data, coursewareHtml) {
  let html = fs.readFileSync(template, "utf8");
  const title = `短文填空 · 新课01 · 疯狂动物城2 · Handout`;

  html = html.replace(/<title>[^<]+<\/title>/, `<title>${title}</title>`);
  html = html.replace(
    /const WORD_BANK = \[[^\]]+\];/,
    `const WORD_BANK = ${JSON.stringify(WORD_BANK)};`
  );
  const ansObj = {};
  for (const [k, v] of Object.entries(EXAM_ANSWERS)) ansObj[k] = v;
  html = html.replace(
    /const PRACTICE_ANS = \{[\s\S]*?\};/,
    `const PRACTICE_ANS = ${formatJsonBlock(ansObj)};`
  );
  const passageEsc = CORRECT_PASSAGE.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
  html = html.replace(
    /const PASSAGE = `[\s\S]*?`;/,
    `const PASSAGE = \`${passageEsc}\`;`
  );

  const startCw = coursewareHtml.indexOf("const VOCAB_UNITS");
  const endCw = coursewareHtml.indexOf("const slides");
  const vocabSection = coursewareHtml.slice(startCw, endCw).trim();
  const startHo = html.indexOf("const VOCAB_UNITS");
  const endHo = html.indexOf("function escapeHtml");
  html = html.slice(0, startHo) + vocabSection + "\n\n    " + html.slice(endHo);

  html = html.replace(
    /<h1>[^<]+<\/h1>/,
    `<h1>短文填空 · 新课01 · 疯狂动物城2</h1>`
  );
  html = html.replace(
    /class="sub">[^<]+<\/p>/,
    `class="sub">选词填空 · 方框 12 词 · 10 空 · 中考难度</p>`
  );
  html = html.replace(
    /<strong>[^<]+Handout<\/strong>/,
    `<strong>新课01 · 疯狂动物城2 · Handout</strong>`
  );
  html = html.replace(
    /href="套题33选词填空\.html"/,
    `href="${OUT_BASE}.html"`
  );
  html = html.replace(
    /短文填空课件 · [^<]+<\/footer>/,
    `短文填空课件 · 新课01 · 疯狂动物城2 handout · 对齐 <code>courseware/${OUT_BASE}.html</code></footer>`
  );
  return html;
}

function patchIndex() {
  const indexPath = path.join(COURSEWARE_DIR, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  if (html.includes(OUT_BASE)) return;

  const card = `
    <article class="set-card" style="grid-column: 1 / -1; border-color: rgba(129,199,132,.35);">
      <div class="meta">
        <div class="num">主题课</div>
        <div class="tit">新课01 · 疯狂动物城2 选词填空</div>
      </div>
      <div class="actions">
        <a class="primary" href="${OUT_BASE}.html">课堂练习</a>
        <a class="secondary" href="${OUT_BASE}handout.html">Handout</a>
      </div>
    </article>`;

  html = html.replace(
    /<p>中考相关练习：共 53 套互动课件/,
    `<p>主题练习 + 中考相关练习：共 53 套互动课件`
  );
  html = html.replace(/<div class="grid">/, `<div class="grid">${card}`);
  fs.writeFileSync(indexPath, html, "utf8");
}

async function main() {
  console.log("Calling DeepSeek...");
  const data = await callDeepSeek();
  const cachePath = path.join(COURSEWARE_DIR, ".zootopia-cloze-data.json");
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), "utf8");
  console.log("Saved cache:", cachePath);

  if (!data.vocabUnits || data.vocabUnits.length !== 12) {
    throw new Error(`Expected 12 vocab units, got ${data.vocabUnits?.length}`);
  }

  const outHtml = patchCourseware(TEMPLATE, data);
  const outHandout = patchHandout(HANDOUT_TEMPLATE, data, outHtml);
  fs.writeFileSync(path.join(COURSEWARE_DIR, `${OUT_BASE}.html`), outHtml, "utf8");
  fs.writeFileSync(path.join(COURSEWARE_DIR, `${OUT_BASE}handout.html`), outHandout, "utf8");
  patchIndex();
  console.log("Generated:", OUT_BASE + ".html", OUT_BASE + "handout.html");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
