/**
 * 生成「苏秦刺股」主题选词填空课件 + handout（套题16 模板）
 * 用法: node scripts/gen-suqin-cloze-courseware.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COURSEWARE_DIR = path.join(ROOT, "HET", "词形填空练习", "courseware");
const TEMPLATE = path.join(COURSEWARE_DIR, "套题16选词填空.html");
const HANDOUT_TEMPLATE = path.join(COURSEWARE_DIR, "套题16选词填空handout.html");
const OUT_BASE = "新课02苏秦刺股选词填空";
const LESSON_TAG = "新课02";

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || "sk-daa16008e81843deba6fefe9dce51465";
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const WORD_BANK = [
  "cold", "effort", "he", "painful", "pay", "pierce", "receive",
  "shame", "something", "wake", "warm", "year",
];

const EXAM_ANSWERS = {
  1: "to pay",
  2: "himself",
  3: "year's",
  4: "received",
  5: "coldly",
  6: "effort",
  7: "was pierced",
  8: "awake",
  9: "pain",
  10: "shame",
};

const DISTRACTORS = ["warm", "something"];

const CORRECT_PASSAGE = `During the Warring States Period, there lived a man named Su Qin. He was poor when he was young and had no money __1__ an education. In order to make a living, he had to work for others. But he wanted to better __2__, so he left home and went to the State of Qi to study.

After a __3__ study, he thought that he had learned all of his teacher's skills. He quickly said goodbye to his teacher and classmates, then traveled from place to place to make a living. However, a year later, he had __4__ nothing and had to go back home.

When he got home, his family treated him __5__. His wife sighed (叹息) and kept making cloth. His sister-in-law turned and walked off, not ready to cook for him. His parents, brothers, and sisters all laughed at him. Feeling sad, he closed the door and then took out all his books, sparing no __6__ to study.

He studied late every night. One day, he was so sleepy that he fell asleep at his desk. But he woke up suddenly because his arm __7__ by something—it was an awl (锥子). Then he had an idea to stay __8__: piercing his legs! After that, every time he felt sleepy, he used the awl to pierce his leg. The __9__ would wake him up at once.

Seeing this, his family said, "We know you want to succeed, but you should not treat yourself like this." Su Qin replied, "If I do not do this, I will forget my past __10__." After a year of such hard study, Su Qin became a man of great learning. And he finally became good at the "zong-heng" principle (纵横之术) and a famous prime minister in the Warring States period.`;

const PROMPT = `你是中国中考英语命题与教学设计专家。请为「选词填空」互动课件生成完整 JSON 数据。

## 题目背景
主题：战国时期苏秦「刺股苦读」励志短文填空（悬梁刺股典故之一）。
词库（12词，每词限用一次，10空）：${WORD_BANK.join(", ")}
正确答案（空号1-10）：
${Object.entries(EXAM_ANSWERS).map(([k, v]) => `${k}: ${v}`).join("\n")}
干扰项（未使用）：${DISTRACTORS.join(", ")}

## 输出要求
返回**纯 JSON**（不要 markdown 代码块），结构如下：
{
  "title": "短文标题（中文，含苏秦刺股）",
  "themeIntro": "一句英文迁移句（关于刻苦学习、不忘耻辱、持之以恒，可用于TTS）",
  "passage": "完整英文短文，用 __1__ 到 __10__ 标记十个空。约200词，5段，中考难度。",
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
  ],
  "derivatives": [
    {
      "q": "Step3标题",
      "answer": "派生形式",
      "readAloud": "朗读词",
      "note": "拼写/用法提示",
      "exampleSentence": "自编例句（不复述passage）",
      "exampleZh": "译文",
      "induct": { "title": "归纳标题", "peers": ["6个同类词/短语"], "tip": "语法提示" }
    }
  ],
  "examTarget": {
    "form": "本题答案词形",
    "examExamples": [
      { "readSentence": "含 blankAnswer 的完整句", "readSentenceZh": "译文", "blankAnswer": "答案词形" }
    ],
    "note": "套题说明：考点与词形判断依据（中文）"
  }
}

## 质量要求
- usages 恰好3条；derivatives 1-2个（考点词须有对应考试形式的派生）
- warm/something 作为干扰项，examTarget.form 仍填原形，note 标明「干扰项」
- cold→coldly, he→himself, year→year's, receive→received, pierce→was pierced, wake→awake, painful→pain
- JSON 必须合法`;

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
  const title = `短文填空 · ${LESSON_TAG} · 苏秦刺股 · 词形课件`;

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

  const vocabStart = html.indexOf("const VOCAB_UNITS");
  const vocabEnd = html.indexOf("const slides");
  if (vocabStart < 0 || vocabEnd < 0) throw new Error("VOCAB_UNITS block not found in template");
  html = html.slice(0, vocabStart)
    + `const VOCAB_UNITS = ${formatJsonBlock(data.vocabUnits)}\n\n    `
    + html.slice(vocabEnd);

  const keyLine = answerKeyLine(EXAM_ANSWERS);
  const distractorNote = DISTRACTORS.join(" / ");

  html = html.replace(
    /短文填空 · 套题16 · 陌生人善意与北京暴雨/,
    `短文填空 · ${LESSON_TAG} · 苏秦刺股`
  );

  html = html.replace(
    /<li>记叙议论 · 旅途互助 · pay it forward<\/li>\s*<li>方框 12 词 · 语篇 10 空；干扰项：<strong>[^<]+<\/strong><\/li>\s*<li>复盘：<span class="mono">[^<]+<\/span><\/li>/,
    `<li>战国励志 · 苏秦刺股 · 悬梁刺股</li>
          <li>方框 12 词 · 语篇 10 空；干扰项：<strong>${distractorNote}</strong></li>
          <li>复盘：<span class="mono">${keyLine}</span></li>`
  );

  html = html.replace(
    /<h2 class="slide-h2">记叙议论 · 旅途互助 · pay it forward<\/h2>/,
    `<h2 class="slide-h2">战国励志 · 苏秦刺股 · 刻苦攻读</h2>`
  );

  html = html.replace(
    /data-text="Brave teens rehearse plain sentences until tricky passages feel friendly\."/,
    `data-text="${data.themeIntro.replace(/"/g, "&quot;")}"`
  );

  html = html.replace(
    /<p class="mono">able \/ continue \/ experience \/ join \/ just \/ lie \/ send \/ still \/ they \/ true \/ where \/ walk<\/p>\s*<div class="card"><h3>策略提示<\/h3><p>先标出十大槽位，再回填变形；干扰项勿强行代入。<\/p><\/div>/,
    `<p class="mono">${WORD_BANK.join(" / ")}</p>
      <div class="card"><h3>策略提示</h3><p>先标出十大槽位，再回填变形；注意反身代词、所有格、副词、被动语态与名动转换；干扰项勿强行代入。</p></div>`
  );

  html = html.replace(
    /pushVocabProgram\(VOCAB_UNITS, "本题"\)/,
    `pushVocabProgram(VOCAB_UNITS, "${LESSON_TAG}")`
  );

  html = html.replace(
    /<div class="sense">处理后五空：注意被动、不定式、比较级、名动形转换。<\/div>/,
    `<div class="sense">处理后五空：注意 received、coldly、was pierced、awake、pain、shame 等词形与搭配。</div>`
  );

  html = html.replace(
    /<div class="card"><h3>快速核对清单<\/h3><p class="mono">[^<]+<\/p><\/div>`\);/,
    `<div class="card"><h3>快速核对清单</h3><p class="mono">${keyLine}</p></div>\`);`
  );

  html = html.replace(
    /本题词汇流（12 词族 · 方框 12 词）/,
    `${LESSON_TAG} 词汇流（12 词族 · 方框 12 词）`
  );

  return html;
}

function patchHandout(template, coursewareHtml) {
  let html = fs.readFileSync(template, "utf8");
  const title = `短文填空 · ${LESSON_TAG} · 苏秦刺股 · Handout`;

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
    `<h1>短文填空 · ${LESSON_TAG} · 苏秦刺股</h1>`
  );
  html = html.replace(
    /<strong>[^<]+Handout<\/strong>/,
    `<strong>${LESSON_TAG} · 苏秦刺股 · Handout</strong>`
  );
  html = html.replace(
    /href="套题16选词填空\.html"/,
    `href="${OUT_BASE}.html"`
  );
  html = html.replace(
    /短文填空课件 · [^<]+<\/footer>/,
    `短文填空课件 · ${LESSON_TAG} · 苏秦刺股 handout · 对齐 <code>courseware/${OUT_BASE}.html</code></footer>`
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
        <div class="tit">${LESSON_TAG} · 苏秦刺股 选词填空</div>
      </div>
      <div class="actions">
        <a class="primary" href="${OUT_BASE}.html">课堂练习</a>
        <a class="secondary" href="${OUT_BASE}handout.html">Handout</a>
      </div>
    </article>`;

  const anchor = `新课01疯狂动物城2选词填空handout.html">Handout</a>
      </div>
    </article>`;
  html = html.replace(anchor, `${anchor}${card}`);
  fs.writeFileSync(indexPath, html, "utf8");
}

async function main() {
  const cachePath = path.join(COURSEWARE_DIR, ".suqin-cloze-data.json");
  let data;
  if (fs.existsSync(cachePath)) {
    console.log("Using cache:", cachePath);
    data = JSON.parse(fs.readFileSync(cachePath, "utf8"));
  } else {
    console.log("Calling DeepSeek...");
    data = await callDeepSeek();
    fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Saved cache:", cachePath);
  }

  if (!data.vocabUnits || data.vocabUnits.length !== 12) {
    throw new Error(`Expected 12 vocab units, got ${data.vocabUnits?.length}`);
  }

  const outHtml = patchCourseware(TEMPLATE, data);
  const outHandout = patchHandout(HANDOUT_TEMPLATE, outHtml);
  fs.writeFileSync(path.join(COURSEWARE_DIR, `${OUT_BASE}.html`), outHtml, "utf8");
  fs.writeFileSync(path.join(COURSEWARE_DIR, `${OUT_BASE}handout.html`), outHandout, "utf8");
  patchIndex();
  console.log("Generated:", OUT_BASE + ".html", OUT_BASE + "handout.html");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
