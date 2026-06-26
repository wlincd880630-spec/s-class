#!/usr/bin/env node
/**
 * Generate 2026 Mock 3 (绿卷) student exam HTML + mock3-answers.json
 * Usage: node scripts/build-mock3-exam.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MOCK2_HTML = path.join(ROOT, "HET/2026 Mock 2/2026成都英语白卷.html");
const OUT_DIR = path.join(ROOT, "HET/2026 Mock 3");
const OUT_HTML = path.join(OUT_DIR, "2026成都英语绿卷.html");
const OUT_ANSWERS = path.join(OUT_DIR, "mock3-answers.json");
const COS_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/HET/2026 Mock 3/";

// ── CSS from Mock 2 white卷 ──────────────────────────────────────────────
function readCss() {
  const html = fs.readFileSync(MOCK2_HTML, "utf8");
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!m) throw new Error("CSS block not found in Mock 2 white卷");
  return m[1]
    .replace("--accent:#1d4ed8", "--accent:#059669")
    .replace("--accent-soft:#eff6ff", "--accent-soft:#ecfdf5")
    .replace(
      "background:linear-gradient(90deg,#1e3a5f,#2563eb)",
      "background:linear-gradient(90deg,#065f46,#10b981)"
    )
    .replace("border:1px solid #bfdbfe", "border:1px solid #a7f3d0");
}

// ── HTML helpers ─────────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineBlank(num, name = `q${num}`) {
  return `<span class="inline-blank" id="blank-${name}"><span class="blank-num">${num}.</span><input type="text" name="${name}" class="blank-line-input screen-only" maxlength="1" autocomplete="off" aria-label="填空${name}"><span class="cloze-line print-only"></span></span>`;
}

function passageBlank(num) {
  return `<span class="passage-blank-wrap"><span class="blank-num">${num}.</span><span class="passage-blank-line" aria-hidden="true">______</span></span>`;
}

function bBlank(num, name) {
  return `<span class="blank-wrap b-blank-wrap"><span class="blank-num">${num}.</span><input type="text" name="${name}" class="inline chart-blank" autocomplete="off"><span class="chart-blank-line print-only" aria-hidden="true"></span></span>`;
}

function wordBank(items) {
  return `<ul class="word-bank">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
}

function wordBankWide(items) {
  return `<ul class="word-bank wide">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
}

function mcOpts(q, opts) {
  return opts
    .map(
      ([k, body]) =>
        `<label class="opt" for="${q}_${k}"><input type="radio" name="${q}" id="${q}_${k}" value="${k}"><span class="opt-key">${k}.</span> <span class="opt-body">${esc(body)}</span></label>`
    )
    .join("");
}

function mcItem(id, num, stem, opts, extra = "") {
  return `<div class="q-item print-q-page" id="${id}"><p class="q-stem"><span class="q-num">${num}.</span> ${extra}${esc(stem).replace(/\\n/g, "<br>")}</p><div class="q-opts">${mcOpts(id, opts)}</div></div>`;
}

function abcRow(id, num, opts) {
  const cells = opts
    .map(
      ([k, body]) =>
        `<label class="opt opt-cell" for="${id}_${k}"><input type="radio" name="${id}" id="${id}_${k}" value="${k}"><span class="opt-key">${k}.</span><span class="opt-body">${esc(body)}</span></label>`
    )
    .join("");
  return `<div class="q-row-opts-grid print-q-page" id="${id}"><span class="q-num">${num}.</span>${cells}</div>`;
}

function shortAns(num, name, q) {
  return `<p>${num}. ${esc(q)}<br><textarea class="screen-only" name="${name}" rows="2"></textarea><span class="line-block print-only"><span class="line"></span><span class="line"></span><span class="line"></span></span></p>`;
}

function shortAnsLong(num, name, q) {
  return `<p>${num}. ${esc(q)}<br><textarea class="screen-only" name="${name}" rows="4"></textarea><span class="line-block print-only"><span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span></span></p>`;
}

// ── Exam content ─────────────────────────────────────────────────────────
const ANSWERS = {};

function setAns(key, answer, parse, evidence = "") {
  ANSWERS[key] = { answer, parse, evidence };
}

// Part 1 — 选词 1-5
const SELECT_WORDS = {
  bank: ["A. in public", "B. in advance", "C. take turns", "D. ended up", "E. pass on"],
  keys: ["B", "A", "C", "D", "E"],
  passage: `<p>Last summer, the Sanxingdui Museum invited middle school students to join its young guide program. More than ninety teens applied, but only thirty-five were chosen after interviews. Before meeting visitors in the exhibition halls, they had to finish a two-week training course ${inlineBlank(1)}.</p>
<p>During their first month, many volunteers felt nervous about explaining ancient artifacts ${inlineBlank(2)}. To build confidence, experienced guides let newcomers ${inlineBlank(3)} leading small groups while adults stayed nearby. Slowly, they learned to answer unexpected questions calmly.</p>
<p>Still, not every day went smoothly. When two visitors disagreed about the meaning of a bronze mask, the discussion ${inlineBlank(4)} lasting twenty minutes. The teens later wrote a report and ${inlineBlank(5)} their solutions to the next team. "Small problems can teach us a lot," said 14-year-old Chen Lin.</p>`,
};

SELECT_WORDS.keys.forEach((k, i) => {
  setAns(String(i + 1), k, `选词第${i + 1}空，正确答案为 ${k}。`, SELECT_WORDS.bank.find((w) => w.startsWith(k + ".")) || k);
});

// Part 1 — 对话 6-10
const DIALOGUE = {
  bank: [
    "A. What should I wear?",
    "B. What's it about?",
    "C. Where shall we meet?",
    "D. There's a volunteer program at East Lake Sports Park.",
    "E. How can I sign up?",
  ],
  keys: ["D", "B", "E", "C", "A"],
  lines: [
    `<p><strong>Amy:</strong> Hi, Tom! ${inlineBlank(6)}</p>`,
    `<p><strong>Tom:</strong> Really? ${inlineBlank(7)}</p>`,
    `<p><strong>Amy:</strong> We're going to help with recycling and guiding visitors this weekend.</p>`,
    `<p><strong>Tom:</strong> That sounds meaningful. ${inlineBlank(8)} I've never worked at a large sports event.</p>`,
    `<p><strong>Amy:</strong> Fill in a form on the class webpage before Thursday.</p>`,
    `<p><strong>Tom:</strong> ${inlineBlank(9)}</p>`,
    `<p><strong>Amy:</strong> At the school gate at 7:00 on Saturday. Wear your school uniform and sports shoes.</p>`,
    `<p><strong>Tom:</strong> Got it. ${inlineBlank(10)}</p>`,
    `<p><strong>Amy:</strong> That's right — uniform and comfortable sports shoes will be fine.</p>`,
  ],
};

DIALOGUE.keys.forEach((k, i) => {
  setAns(String(i + 6), k, `补全对话第${i + 6}空，正确答案为 ${k}。`, DIALOGUE.bank.find((w) => w.startsWith(k + ".")) || k);
});

// Part 1 — 完形 11-20
const CLOZE = {
  passage: `<p>When workers at the Sanxingdui restoration lab first unpacked a newly unearthed bronze figure, they found it in hundreds of tiny pieces. At first, the task seemed almost ${passageBlank(11)} — impossible to finish before the autumn exhibition opened. However, the team refused to ${passageBlank(12)}.</p>
<p>They used 3D scanning to record each fragment. Slowly, the pieces were ${passageBlank(13)} together on a computer screen before being fixed in real life. Teen volunteers who helped label the fragments said they felt ${passageBlank(14)} to take part in such meaningful work.</p>
<p>The project also drew wide public ${passageBlank(15)}. Online viewers followed live updates and left thousands of comments. To museum director Dr. Li, the work did more than repair an object — it helped ${passageBlank(16)} people with a civilization that disappeared thousands of years ago.</p>
<p>Some visitors worried the repaired figure might look "too new" and lose its history. In fact, experts left a few cracks visible on purpose so the artifact could still tell its story. "Perfection isn't always the goal," Dr. Li explained. "Sometimes an honest ${passageBlank(17)} teaches us more than a perfect copy."</p>
<p>The exhibition finally opened on schedule. Students who visited said the figure gave them ${passageBlank(18)} to learn archaeology. The success was widely ${passageBlank(19)} in national media, and similar methods were later ${passageBlank(20)} with other damaged relics across the province.</p>`,
  opts: {
    11: [["A", "simple"], ["B", "hopeless"], ["C", "common"]],
    12: [["A", "quit"], ["B", "celebrate"], ["C", "relax"]],
    13: [["A", "thrown"], ["B", "pieced"], ["C", "locked"]],
    14: [["A", "ashamed"], ["B", "honored"], ["C", "bored"]],
    15: [["A", "attention"], ["B", "silence"], ["C", "doubt"]],
    16: [["A", "connect"], ["B", "compare"], ["C", "replace"]],
    17: [["A", "accident"], ["B", "promise"], ["C", "imperfection"]],
    18: [["A", "courage"], ["B", "permission"], ["C", "excuse"]],
    19: [["A", "reported"], ["B", "ignored"], ["C", "doubted"]],
    20: [["A", "shared"], ["B", "argued"], ["C", "competed"]],
  },
  keys: ["B", "A", "B", "B", "A", "A", "C", "A", "A", "A"],
};

CLOZE.keys.forEach((k, i) => {
  const n = i + 11;
  setAns(String(n), k, `完形第${n}空，正确答案为 ${k}。`, `Sanxingdui bronze restoration, blank ${n}`);
});

// Part 2 — 阅读 A 21-25
const READ_A = {
  passage: `<h4 class="passage-title">Join the Green Campus Challenge!</h4>
<p class="passage-lead">Our school is running a four-week challenge to help students cut waste and save energy. Read the guide below and decide what your class can do.</p>
<div class="read-columns">
  <div class="read-col">
    <div class="read-box">
      <p class="box-title"><strong>Track Your Class Waste</strong></p>
      <p>Weigh classroom rubbish every Friday. If your weekly waste is <strong>over 4 kg</strong>, your class should make a plan to reduce it.</p>
      <table class="data" style="width:100%;margin:8px 0;font-size:0.95em;">
      <tr><th>Item</th><th>Tip</th></tr>
      <tr><td>Paper</td><td>Use both sides; start a scratch-paper box.</td></tr>
      <tr><td>Plastic bottles</td><td>Bring your own cup; recycle empty bottles.</td></tr>
      <tr><td>Food waste</td><td>Take only what you can finish at lunch.</td></tr>
      </table>
    </div>
    <div class="read-box">
      <p class="box-title"><strong>Save Electricity Wisely</strong></p>
      <p>Turn off lights and AC when leaving the classroom. Projectors and fans should be switched off during breaks, not left on "just in case".</p>
    </div>
  </div>
  <div class="read-col">
    <div class="read-box">
      <p class="box-title"><strong>Low-Carbon Lunch Choices</strong></p>
      <p>Choosing vegetables more often can lower your carbon footprint(碳足迹). On <strong>Meatless Monday</strong>, the canteen offers a cheaper plant-based set meal. Students who join three times in a month receive a reusable lunch bag.</p>
    </div>
    <div class="read-box">
      <p class="box-title"><span class="passage-blank">____<span class="tri-mark">▲</span>____</span></p>
      <p>Walk or ride a bike for trips under 2 km. If you must take a car, try to share rides with classmates who live nearby. Fewer short car trips mean cleaner air around campus.</p>
    </div>
    <div class="read-box">
      <p class="box-title"><strong>Report &amp; Reward</strong></p>
      <p>Classes that cut waste by 15% or more will get a "Green Star" flag. The best idea each month will be shared on the school radio.</p>
    </div>
  </div>
</div>`,
  questions: [
    {
      n: 21,
      stem: "According to the guide, what should a class do if its weekly waste is 5 kg?",
      opts: [["A", "Make a plan to reduce waste."], ["B", "Get a Green Star flag immediately."], ["C", "Stop using the school canteen."]],
      key: "A",
      parse: "超过 4 kg 需制定减量计划，5 kg 应选 A。",
    },
    {
      n: 22,
      stem: "What can students get if they choose the plant-based meal three times in a month?",
      opts: [["A", "A free bicycle."], ["B", "A reusable lunch bag."], ["C", "A ticket to the museum."]],
      key: "B",
      parse: "参加 Meatless Monday 三次可得 reusable lunch bag。",
    },
    {
      n: 23,
      tag: `<span class="tag-new">💡新考法</span> <span class="tag-type">推理判断</span> `,
      stem: "Why does the school introduce Meatless Monday?",
      opts: [["A", "To punish students who eat too much meat."], ["B", "To encourage lower-carbon eating habits."], ["C", "Because the canteen has no meat left."]],
      key: "B",
      parse: "该段强调蔬菜饮食可降低碳足迹。",
    },
    {
      n: 24,
      tag: `<span class="tag-new">💡新考法</span> <span class="tag-type">语篇逻辑</span> `,
      stem: 'Which of the following can be put in "____▲____"?',
      opts: [["A", "Choose greener transport"], ["B", "Sleep earlier at night"], ["C", "Buy more snacks online"]],
      key: "A",
      parse: "▲ 后讲步行、骑车、拼车，对应 greener transport。",
    },
    {
      n: 25,
      stem: "What is the main purpose of the text?",
      opts: [["A", "To guide students to take part in a green campus challenge."], ["B", "To explain how the school canteen cooks meals."], ["C", "To compare different kinds of plastic bottles."]],
      key: "A",
      parse: "全文为绿色校园挑战行动指南。",
    },
  ],
};

READ_A.questions.forEach((q) => setAns(String(q.n), q.key, q.parse, `Green campus reading Q${q.n}`));

// Part 2 — 阅读 B 26-30
const READ_B = {
  passage: [
    `<p class="read-para"><span class="para-mark">①</span>On June 25, 2024, China's Chang'e-6 probe successfully returned to Earth with rock and soil samples from the far side of the moon. It was the first time in human history that samples from this hidden side of the moon were brought back to our planet.</p>`,
    `<p class="read-para"><span class="para-mark">②</span>The mission was highly challenging. The far side of the moon always faces away from Earth, so direct communication is impossible. Scientists used a relay satellite(中继卫星) named Queqiao to send signals between the probe and ground control. The landing area was also full of craters(环形山) and rocks, which made a safe landing even harder.</p>`,
    `<p class="read-para"><span class="para-mark">③</span>After landing, the probe collected about 2 kilograms of samples. Researchers hope these materials will help them learn more about the moon's early history and how it was formed. The samples may also provide clues about whether useful resources exist on the moon.</p>`,
    `<p class="read-para"><span class="para-mark">④</span>Chang'e-6 is another major step in China's lunar exploration program. It shows the country's growing strength in space science and technology. Many Chinese people felt proud when they watched the return capsule land safely in Inner Mongolia.</p>`,
  ],
  questions: [
    {
      n: 26,
      tag: `<span class="tag-new">💡新考法</span> <span class="tag-type">推理判断</span> `,
      stem: "What can we infer from Paragraph 1?",
      opts: [
        ["A", "Scientists had never landed any probe on the moon before 2024."],
        ["B", "Collecting samples from the moon's far side was a breakthrough."],
        ["C", "The far side of the moon is easier to study than the near side."],
      ],
      key: "B",
      parse: "第一段强调人类首次从月球背面带回样品，属重大突破。",
    },
    {
      n: 27,
      stem: "Why was a relay satellite needed for the mission?",
      opts: [
        ["A", "Because signals cannot travel directly from the far side to Earth."],
        ["B", "Because the probe had no cameras on board."],
        ["C", "Because the samples were too heavy to carry."],
      ],
      key: "A",
      parse: "第二段：背面始终背对地球，无法直接通信，需中继卫星。",
    },
    {
      n: 28,
      stem: "Which of the following is NOT mentioned about the samples?",
      opts: [
        ["A", "They may help explain how the moon was formed."],
        ["B", "They weigh about 2 kilograms."],
        ["C", "They have already been sold to other countries."],
      ],
      key: "C",
      parse: "第三段未提及样品出售给他国；A、B 均有依据。",
    },
    {
      n: 29,
      stem: "What does the author mainly want to show in Paragraph 4?",
      opts: [
        ["A", "The price of building a space station."],
        ["B", "The importance of the mission to China's space program."],
        ["C", "How astronauts live on the moon."],
      ],
      key: "B",
      parse: "第四段强调嫦娥六号是中国探月重大一步，展示航天实力。",
    },
    {
      n: 30,
      tag: `<span class="tag-new">💡新考法</span> <span class="tag-type">信息匹配</span> `,
      stem: "Match the subtitle with each paragraph.",
      matchRef: true,
      opts: [
        ["A", "①-c, ②-a, ③-b, ④-d"],
        ["B", "①-b, ②-a, ③-c, ④-d"],
        ["C", "①-a, ②-c, ③-b, ④-d"],
      ],
      key: "B",
      parse: "①历史首次→b；②任务挑战/中继卫星→a；③样品研究价值→c；④中国航天意义→d。",
    },
  ],
};

READ_B.questions.forEach((q) => setAns(String(q.n), q.key, q.parse, `Chang'e-6 reading Q${q.n}`));

// Part 2 — 阅读 C 31-35
const READ_C = {
  passage: [
    `<p>In Chengdu, Shu embroidery(蜀绣) is more than a beautiful craft on silk. For centuries, skilled artists have used colorful threads to create flowers, birds, and pandas that seem alive. Today, young designers are trying to bring this tradition into modern life.</p>`,
    `<p>At a small studio near Kuanzhai Alley, 16-year-old Lin Mei spends weekends learning basic stitches(针法) from her grandmother. "It is harder than it looks," she says. "One wrong move can ruin a whole pattern." Yet Lin enjoys the patience the work requires. She has even designed a phone case decorated with Shu embroidery for a school competition.</p>`,
    `<p>Local shops now sell notebooks, scarves, and bags with embroidery patterns. Some products are made by machines, while high-end gifts are still finished by hand. Experts say machine work helps the craft reach more buyers, but hand embroidery keeps the finest details and cultural value.</p>`,
    `<p>The city government has also set up training classes and online courses so that more teenagers can try the craft. "If only old masters keep the skill, it may slowly disappear," says craftsman Wang Jun. "We need young people to practice, create, and tell the story behind each stitch."</p>`,
  ],
  questions: [
    {
      n: 31,
      stem: "What do we know about Lin Mei from Paragraph 2?",
      opts: [["A", "She thinks Shu embroidery is easy to learn."], ["B", "She is learning the craft from her grandmother."], ["C", "She refuses to use embroidery in modern products."]],
      key: "B",
      parse: "第二段：林梅周末跟祖母学基本针法。",
    },
    {
      n: 32,
      tag: `<span class="tag-new">💡新考法</span> <span class="tag-type">推理判断</span> `,
      stem: "What can we infer from Paragraph 3?",
      opts: [["A", "Machine-made embroidery is always better than hand work."], ["B", "Shops have found new ways to sell Shu embroidery products."], ["C", "Scarves with embroidery are no longer popular in Chengdu."]],
      key: "B",
      parse: "第三段提到笔记本、围巾、包等新品类，说明销售方式多元化。",
    },
    {
      n: 33,
      stem: "According to Wang Jun, why should young people learn Shu embroidery?",
      opts: [["A", "To replace all machine-made products."], ["B", "To keep the craft from disappearing."], ["C", "To earn money as quickly as possible."]],
      key: "B",
      parse: "第四段：若只有老匠人掌握技艺，工艺可能消失。",
    },
    {
      n: 34,
      stem: "Which word best describes Lin Mei's attitude toward learning embroidery?",
      opts: [["A", "Patient."], ["B", "Doubtful."], ["C", "Uninterested."]],
      key: "A",
      parse: "她虽觉难，却享受耐心练习的过程。",
    },
    {
      n: 35,
      stem: "What is the best title for the text?",
      opts: [["A", "Shu Embroidery: A Living Tradition in Modern Chengdu"], ["B", "How to Win a School Phone Case Competition"], ["C", "Why Machines Will Replace All Chinese Crafts"]],
      key: "A",
      parse: "全文写蜀绣在成都的传承与创新。",
    },
  ],
};

READ_C.questions.forEach((q) => setAns(String(q.n), q.key, q.parse, `Shu embroidery reading Q${q.n}`));

// B卷 — 短文填空 b1-b10（12 选 10，仅 ancient 用原形；其余含过去式、完成时、分词、形容词化等）
const B_WORDS = {
  bank: ["discover", "include", "ancient", "prove", "remain", "value", "protect", "attract", "serve", "spread", "cover", "wide"],
  keys: ["discovered", "including", "ancient", "proved", "remained", "attracted", "served", "valuable", "protected", "covered"],
  passage: `<p>The Golden Sun Bird, a famous gold ornament, was ${bBlank(1, "b1")} at Jinsha Site in Chengdu in 2001. The site, ${bBlank(2, "b2")} many gold masks and jade tools, helps us understand the ${bBlank(3, "b3")} Shu Kingdom.</p>
<p>When archaeologists first studied the piece, it quickly ${bBlank(4, "b4")} how advanced ancient Shu culture was. The artifact ${bBlank(5, "b5")} in the ground for more than 3,000 years before it was unearthed.</p>
<p>Since 2001, the symbol has ${bBlank(6, "b6")} visitors from around the world. In 2005, it ${bBlank(7, "b7")} as Chengdu's city logo. Today the find is considered deeply ${bBlank(8, "b8")} to Chinese history.</p>
<p>Over the years, museums have ${bBlank(9, "b9")} the relic with great care. Newspapers and TV programs ${bBlank(10, "b10")} the story widely across the country.</p>`,
};

B_WORDS.keys.forEach((k, i) => {
  const notes = {
    discovered: "（一般过去时被动）",
    including: "（现在分词）",
    ancient: "（唯一原形）",
    proved: "（一般过去时）",
    remained: "（一般过去时）",
    attracted: "（现在完成时）",
    served: "（一般过去时）",
    valuable: "（形容词）",
    protected: "（现在完成时）",
    covered: "（一般过去时）",
  };
  setAns(`b${i + 1}`, k, `B卷短文填空第${i + 1}空：${k}${notes[k] || ""}。`, `Jinsha Golden Sun Bird blank ${i + 1}`);
});

// B卷 — 补全短文 b11-b15
const B_CLOZE_FIXED = {
  bank: [
    "A. Turn your care into action.",
    "B. You should also take breaks from bad news.",
    "C. But it is better to use several different ones.",
    "D. Always remember to take notes while reading.",
    "E. Engineers and artists create helpful or beautiful things.",
    "F. The news can easily make us feel worried or helpless.",
  ],
  keys: ["F", "C", "B", "E", "A"],
  passage: `<p>Reading news helps us learn about exciting discoveries, like a new space mission or a record broken by young athletes. But it also brings sad stories, such as natural disasters or serious accidents.${inlineBlank(1, "b11")} So how should we deal with news wisely? Here is a simple guide.</p>
<p>Check your sources(来源). Some people rely on only one favorite website or app.${inlineBlank(2, "b12")} Compare reports from different places. This helps you avoid one-sided ideas and see a fuller picture.</p>
<p>Keep it balanced. People often focus more on bad news than good news.${inlineBlank(3, "b13")} For example, go for a walk, talk with friends, or share your feelings with an adult after reading upsetting reports.</p>
<p>Find the good. Scientists work hard to treat diseases.${inlineBlank(4, "b14")} Look for these warm stories and share them with your family.</p>
<p>${inlineBlank(5, "b15")} If a problem worries you, do not stay upset for too long. You can donate, volunteer, or start a small project at school to help solve it.</p>`,
};

B_CLOZE_FIXED.keys.forEach((k, i) => {
  setAns(`b${i + 11}`, k, `B卷补全短文第${i + 1}空：${k}。`, B_CLOZE_FIXED.bank.find((w) => w.startsWith(k + ".")) || k);
});

// B卷 — 图表 b16-b20
const B_CHART_DATA = {
  article: `<article class="reading"><p>Do you know Chinese bookmarks? With modern reading apps, this small object has gradually gone out of sight. However, traditional Chinese bookmarks still carry beautiful cultural meanings and are loved by many readers today.</p>
<p>The history of Chinese bookmarks dates back to ancient times. During the Han Dynasty, the earliest bookmarks were mostly made of bamboo or wood. They were simple in shape and were used to mark where people stopped reading. By the Tang and Song Dynasties, making skills became better. More materials could be used, such as ivory(象牙) and jade(玉), and some bookmarks were carved(雕刻) with simple patterns.</p>
<p>There were small differences between scholars and common people. Scholars often used excellent materials like bamboo or jade, sometimes with famous poems carved on them to show good taste. Common people used practical ones made of less expensive materials, such as paper or wood.</p>
<p>Traditional bookmarks have different patterns, each with a special meaning. Patterns of pine trees and cranes(鹤) stand for long life, while lotus(荷花) flowers mean purity(纯洁). Over thousands of years, bookmarks have become an important part of Chinese reading culture.</p>
<p>Although modern bookmarks are quite different, traditional ones are still cherished(珍视). Today they are regarded as small works of art and cultural gifts that show the love for reading is a long-lasting tradition.</p></article>`,
  keys: {
    b16: "development",
    b17: "natural",
    b18: "carved",
    b19: "less expensive",
    b20: "carry on",
  },
  table: `<table class="chart bookmark-chart">
<caption>Chinese bookmarks</caption>
<tr><th>History and <span class="blank-wrap b-blank-wrap"><span class="blank-num">1.</span>${bBlank(1, "b16")}</span></th><th>Differences</th></tr>
<tr><td><strong>Han Dynasty</strong><ul class="chart-list"><li>made of <span class="blank-wrap b-blank-wrap"><span class="blank-num">2.</span>${bBlank(2, "b17")}</span> materials, bamboo or wood</li><li>simple in shape</li></ul><strong>Tang &amp; Song</strong><ul class="chart-list"><li>made of ivory or jade</li><li><span class="blank-wrap b-blank-wrap"><span class="blank-num">3.</span>${bBlank(3, "b18")}</span> with simple patterns</li></ul></td>
<td><ul class="chart-list"><li>For scholars: excellent materials, sometimes with poems</li><li>For common people: <span class="blank-wrap b-blank-wrap"><span class="blank-num">4.</span>${bBlank(4, "b19")}</span> materials like paper or wood</li></ul></td></tr>
<tr><th colspan="2">Present meanings</th></tr>
<tr><td colspan="2"><ul class="chart-list"><li>works of art and cultural gifts</li><li>help to <span class="blank-wrap b-blank-wrap"><span class="blank-num">5.</span>${bBlank(5, "b20")}</span> the reading tradition</li></ul></td></tr>
</table>`,
};

Object.entries(B_CHART_DATA.keys).forEach(([k, v]) => {
  setAns(k, v, `B卷图表填空 ${k}：${v}。`, "Chinese bookmarks chart");
});

// B卷 — 任务阅读 b21-b25
const B_TASK = {
  article: [
    `<p>In Dujiangyan, Sichuan, a 2,000-year-old irrigation(灌溉) system is still helping farmers today. Built during the Warring States period under the guidance of Li Bing and his son, it turned the Min River from a frequent disaster into a life-giving water source for the Chengdu Plain.</p>`,
    `<p>Before the project, floods often destroyed crops in summer, while droughts hurt harvests in other seasons. Li Bing's team cut a channel through Yulei Mountain and built the famous Fish Mouth levee(鱼嘴分水堤) to split the river into inner and outer streams. The inner stream irrigates farmland, while the outer stream carries away extra sand and floodwater.</p>`,
    `<p>What makes the system special is that it uses natural forces instead of dams to control water. For centuries, local workers have maintained it with simple tools and careful observation. In 2000, Dujiangyan was listed as a UNESCO World Heritage Site.</p>`,
    `<p>Today, the ancient project attracts millions of visitors every year. A digital museum nearby uses VR and interactive models to show how water flows through the levee. Students can "build" channels on a screen and see what happens when rainfall changes.</p>`,
    `<p>Engineers say Dujiangyan still offers lessons for modern water management: respect nature, plan for the long term, and keep learning from experience. Protecting this heritage is not only about history — it is also about our future water security.</p>`,
  ],
  questions: [
    {
      n: 6,
      name: "b21",
      q: "What problems did farmers face before Dujiangyan was built?",
      key: "Floods in summer and droughts in other seasons. / Floods and droughts.",
      parse: "第二段：夏季洪涝毁庄稼，其他季节干旱影响收成。",
    },
    {
      n: 7,
      name: "b22",
      q: "What is the function of the Fish Mouth levee?",
      key: "To split the river into inner and outer streams. / It divides the river into two streams.",
      parse: "鱼嘴分水堤将河流分为内江与外江。",
    },
    {
      n: 8,
      name: "b23",
      q: "Why is the system considered special according to Paragraph 3?",
      key: "Because it uses natural forces instead of dams to control water.",
      parse: "第三段：依靠自然力量而非大坝治水。",
    },
    {
      n: 9,
      name: "b24",
      q: "How can students learn about the irrigation system in the digital museum?",
      key: "By using VR and interactive models. / They can use VR and build channels on a screen.",
      parse: "第四段：VR 与互动模型展示水流，可在屏幕上修建渠道。",
    },
    {
      n: 10,
      name: "b25",
      q: "What do you think we can learn from Dujiangyan today? What will you do to protect water resources?",
      key: "(open)",
      parse: "开放题，需结合尊重自然、长期规划、节水护水等观点作答。",
    },
  ],
};

B_TASK.questions.forEach((q) => setAns(q.name, q.key, q.parse, `Dujiangyan reading Q${q.n}`));

setAns("writing", "(sample)", "书面表达：How to Save Water at School，80词左右，需涵盖图示要点并给出节水建议。", "writing.png");

// ── Build HTML sections ──────────────────────────────────────────────────
function buildPartBasic() {
  const clozeRows = Object.entries(CLOZE.opts)
    .map(([n, opts]) => abcRow(`q${n}`, n, opts))
    .join("");

  return `<section class="part" id="part-basic">
    <h3>第一部分  基础知识运用（共20小题；计40分）</h3>
    <div class="sec"><h4>一、阅读下面短文，从方框内的选项中选出可以填入空白处的最佳选项。（共5小题；每小题2分，计10分）</h4>
    <p class="section-caption"><span class="tag-new">💡新考法</span> <span class="caption-title">三星堆博物馆青少年志愿者</span></p>
    <div class="passage passage-select">
    ${SELECT_WORDS.passage}
    </div>
    ${wordBank(SELECT_WORDS.bank)}
    </div>
    <div class="sec"><h4>二、补全对话 根据对话内容，从下边方框中选出适当的选项补全对话。（共5小题；每小题2分，计10分）</h4>
    <p class="section-caption"><span class="tag-new">💡新考法</span> <span class="caption-title">东安湖体育公园志愿者招募</span></p>
    <div class="dialogue-box">
    ${DIALOGUE.lines.join("\n    ")}
    </div>
    ${wordBank(DIALOGUE.bank)}
    </div>
    <div class="sec"><h4>三、完形填空 阅读下面短文，根据短文内容，从A、B、C三个选项中选出可以填入空白处的最佳选项。（共10小题；每小题2分，计20分）</h4>
    <p class="section-caption"><span class="tag-new">💡新考法</span> <span class="caption-title">三星堆青铜器数字化修复</span></p>
    <div class="passage passage-cloze-mc">${CLOZE.passage}</div>
    <div class="q-abc-grid cloze-abc-grid">${clozeRows}</div>
    </div>
  </section>`;
}

function buildPartReading() {
  const readAqs = READ_A.questions
    .map((q) => mcItem(`q${q.n}`, q.n, q.stem, q.opts, q.tag || ""))
    .join("");

  const readBqs = READ_B.questions
    .map((q) => {
      if (q.matchRef) {
        return `<div class="q-item print-q-page match-q" id="q${q.n}">
      <p class="q-stem"><span class="q-num">${q.n}.</span> ${q.tag}${esc(q.stem)}</p>
      <div class="match-ref">
        <p class="match-ref-title"><strong>Subtitles:</strong></p>
        <ul class="match-subs">
          <li><strong>a.</strong> Mission Challenges</li>
          <li><strong>b.</strong> A Historic First</li>
          <li><strong>c.</strong> Value of the Samples</li>
          <li><strong>d.</strong> Pride in Space Science</li>
        </ul>
        <p class="match-ref-title"><strong>Paragraphs:</strong></p>
        <ul class="match-paras">
          <li><strong>①</strong> = Paragraph 1</li>
          <li><strong>②</strong> = Paragraph 2</li>
          <li><strong>③</strong> = Paragraph 3</li>
          <li><strong>④</strong> = Paragraph 4</li>
        </ul>
      </div>
      <div class="q-opts match-opts">${mcOpts(`q${q.n}`, q.opts)}</div>
    </div>`;
      }
      return mcItem(`q${q.n}`, q.n, q.stem, q.opts, q.tag || "");
    })
    .join("");

  const readCqs = READ_C.questions
    .map((q) => mcItem(`q${q.n}`, q.n, q.stem, q.opts, q.tag || ""))
    .join("");

  return `<section class="part part-page" id="part-reading">
    <h3>第二部分  阅读理解（共15小题；计30分）</h3>
    <div class="sec sec-reading"><h4>四、阅读下列短文，根据短文内容选择最佳选项。（共15小题；每小题2分，计30分）</h4>
      <div class="read-block">
        <p class="read-label">A</p>
        <article class="reading read-passage-a">${READ_A.passage}</article>
        <div class="read-a-questions">${readAqs}</div>
      </div>
      <div class="read-block">
        <p class="read-label">B</p>
        <article class="reading read-passage-b">${READ_B.passage.join("\n    ")}</article>
        <div class="read-a-questions">${readBqs}</div>
      </div>
      <div class="read-block">
        <p class="read-label">C</p>
        <article class="reading read-passage-c">${READ_C.passage.join("\n    ")}</article>
        <div class="read-a-questions">${readCqs}</div>
      </div>
    </div>
  </section>`;
}

function buildPartB() {
  const taskShort = B_TASK.questions
    .map((q) => (q.n === 10 ? shortAnsLong(q.n, q.name, q.q) : shortAns(q.n, q.name, q.q)))
    .join("");

  return `<section class="part b-page">
    <p class="vol-title">B卷（共50分）</p>
    <div class="sec"><h4>一、短文填空 从下面方框中选出10个单词，将其正确形式填入短文，使短文意思正确通顺（每词限用一次）。（共10小题；每小题1分，计10分）</h4>
    ${wordBankWide(B_WORDS.bank)}
    <div class="passage">${B_WORDS.passage}</div>
    </div>
    <div class="sec"><h4>二、补全短文 根据短文内容，从短文后的A~F选项中，选出5个适当的选项补全短文。（共5小题；每小题1分，计5分）</h4>
    ${wordBank(B_CLOZE_FIXED.bank)}
    <div class="passage passage-cloze passage-select">
    ${B_CLOZE_FIXED.passage}
    </div>
    </div>
    <div class="sec"><h4>三、阅读表达（共10小题；计20分）</h4>
      <p class="sub-sec-title"><strong>A. 完成图表</strong> 根据短文内容，完成图表中所缺信息（每空不超过三个词）。（共5小题；每小题2分，计10分）</p>
      ${B_CHART_DATA.article}
      <p class="chart-task-hint">根据表格内容，完成下面的图表（每空不超过三个词）。</p>
      ${B_CHART_DATA.table}
      <p class="sub-sec-title"><strong>B. 任务型阅读</strong> 根据短文内容，按要求回答问题。（共5小题；每小题2分，计10分）</p>
      <article class="reading">${B_TASK.article.join("\n    ")}</article>
      <div class="short-ans">${taskShort}</div>
    </div>
    <div class="sec"><h4>四、书面表达（计15分）</h4>
    <div class="writing-prompt">
    <p>水是生命之源，节约用水人人有责。你校英语报正在开展"节水从我做起"主题征文，请根据以下图示，以"How to Save Water at School"为题，写一篇80词左右的英语短文。</p>
    <p class="note">注意：1. 文中不能出现真实姓名及学校名称；2. 词数80左右；3. 开头已给出，不计入总词数。</p>
    <figure class="writing-fig"><img src="writing.png" alt="写作图示 How to Save Water at School"></figure>
    <p><strong>How to Save Water at School</strong></p>
    <p>Water is precious. As students, we can do a lot to save water at school.</p>
    <textarea name="writing" class="writing-area screen-only" rows="12" placeholder="请在此作答…"></textarea>
    <div class="writing-lines print-only" aria-hidden="true"></div>
    </div>
    </div>
  </section>`;
}

function buildHtml(css) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>2026年成都市中考英语（绿卷 Mock 3）</title>
<style>${css}</style>
</head>
<body>
<div class="toolbar no-print">
  <h1>2026成都中考英语（绿卷 Mock 3）·在线答题</h1>
</div>
<div class="wrap">
<form id="exam" class="sheet" autocomplete="off">
  <header class="exam-masthead">
    <div class="line1">2026年成都市高中阶段教育学校统一招生暨初中学业水平考试</div>
    <div class="line2">英&nbsp;&nbsp;语</div>
    <div class="student-bar">
      <span class="field">姓名<span class="uline wide"></span></span>
      <span class="field">准考证号<span class="uline wide"></span></span>
    </div>
    <div class="score-bar">
      <span>A卷70分</span><span>B卷50分</span><span>总分120分</span><span>考试时间100分钟</span>
    </div>
  </header>
  <section class="notice-exam">
    <div class="title">注意事项：</div>
    <ol>
      <li>全卷分A卷和B卷，A卷满分70分，B卷满分50分；全卷共120分；考试时间100分钟。</li>
      <li>在作答前，考生务必将自己的姓名、准考证号涂写在试卷和答题卡规定的地方。考试结束，监考人员将试卷和答题卡一并收回。</li>
      <li>选择题部分必须使用2B铅笔填涂；非选择题部分必须使用0.5毫米黑色签字笔书写，字体工整，笔迹清楚。</li>
      <li>请按照题号在答题卡上各题目对应的答题区域内作答，超出答题区域书写的答案无效；在草稿纸、试卷上答题均无效。</li>
      <li>保持答题卡清洁，不得折叠、污染、破损等。</li>
    </ol>
  </section>

  <section class="notice-screen no-print">
    <strong>在线作答提示：</strong>选择题点选；填空与作文可输入文字。完成后可使用浏览器打印功能保存试卷。
  </section>

  <p class="vol-title">A卷（共70分）</p>
  ${buildPartBasic()}
  ${buildPartReading()}
  ${buildPartB()}
</form>
</div>
<script>
/* Mock 3 绿卷 — 无听力，最小脚本 */
if (typeof window !== 'undefined') {
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('.blank-line-input').forEach(function (el) {
      el.setAttribute('data-print-val', el.value);
    });
  });
}
</script>
</body>
</html>`;
}

// ── Main ─────────────────────────────────────────────────────────────────
function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const css = readCss();
  const html = buildHtml(css);
  fs.writeFileSync(OUT_HTML, html, "utf8");
  fs.writeFileSync(OUT_ANSWERS, JSON.stringify(ANSWERS, null, 2) + "\n", "utf8");

  const htmlLines = html.split("\n").length;
  const ansLines = fs.readFileSync(OUT_ANSWERS, "utf8").split("\n").length;
  const scriptLines = fs.readFileSync(path.join(ROOT, "scripts/build-mock3-exam.mjs"), "utf8").split("\n").length;

  console.log("Generated:");
  console.log(`  ${OUT_HTML} (${htmlLines} lines)`);
  console.log(`  ${OUT_ANSWERS} (${ansLines} lines)`);
  console.log(`  scripts/build-mock3-exam.mjs (${scriptLines} lines)`);
  console.log(`  COS base: ${COS_BASE}`);
}

main();
