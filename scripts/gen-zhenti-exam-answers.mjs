#!/usr/bin/env node
/**
 * Generate 2026EXAM/HET/zhenti_exam_answers.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../2026EXAM/HET/zhenti_exam_answers.json");

function sec(title, body) {
  return { title, body };
}

function mcQ(answer, opts) {
  const { listen, alt_answers = [], extend, sections: extra = [] } = opts;
  const base = [
    sec("【正确答案】", `<strong>${answer}</strong>`),
    ...(opts.考点 ? [sec("【考点与命题意图】", opts.考点)] : []),
    ...(opts.步骤 ? [sec("【解题思路与步骤】", opts.步骤)] : []),
    ...(opts.选项 ? [sec("【选项分析】", opts.选项)] : []),
    ...(opts.证据 ? [sec("【证据】", opts.证据)] : []),
    ...(opts.易错 ? [sec("【易错点】", opts.易错)] : []),
    ...extra,
  ];
  const q = { answer, sections: base };
  if (alt_answers.length) q.alt_answers = alt_answers;
  if (listen) q.listen = listen;
  if (extend) q.extend = extend;
  if (opts.sample) q.sample = opts.sample;
  if (opts.rubric) q.rubric = opts.rubric;
  return q;
}

function fillQ(answer, opts) {
  const { alt_answers = [], listen, extend, sample, rubric } = opts;
  const base = [
    sec("【正确答案】", `<strong>${answer}</strong>${alt_answers.length ? "（亦接受：" + alt_answers.join(" / ") + "）" : ""}`),
    ...(opts.考点 ? [sec("【考点与命题意图】", opts.考点)] : []),
    ...(opts.步骤 ? [sec("【解题思路与步骤】", opts.步骤)] : []),
    ...(opts.证据 ? [sec("【证据】", opts.证据)] : []),
    ...(opts.易错 ? [sec("【易错点】", opts.易错)] : []),
  ];
  const q = { answer, sections: base };
  if (alt_answers.length) q.alt_answers = alt_answers;
  if (listen) q.listen = listen;
  if (extend) q.extend = extend;
  if (sample) q.sample = sample;
  if (rubric) q.rubric = rubric;
  return q;
}

const data = {
  meta: { title: "2026成都中考英语真题", audio: "listening.mp3" },
  pictures: {
    A: "公园里共享自行车（shared bikes in the park）",
    B: "禁止乱扔垃圾标识（no littering sign）",
    C: "阅读公园规则（reading park rules）",
    D: "植树（planting trees）",
    E: "打篮球（playing basketball）",
  },
  questions: {},
};

const Q = data.questions;

// ===== 听力 1-5 =====
Q["1"] = mcQ("C", {
  listen: "Could you help me carry these books to the classroom?",
  考点: "考查情景交际：对<strong>请求帮助</strong>的恰当回应。",
  步骤: "1. 听清说话者是在<strong>提出请求</strong>；2. 选表示<strong>乐意帮忙</strong>的答语；3. 排除感谢类、告别类答语。",
  选项:
    "A. Thank you.——用于<strong>回应感谢</strong>，不能回答请求。<br>B. All right.——可表同意，但本题更强调“没问题、乐意帮忙”。<br><strong>C. No problem.</strong>——“没问题”，是回应请求的标准口语。<br>",
  证据: '听力句型为请求：<em>"Could you help me carry these books to the classroom?"</em>',
  易错: "听到 help 就误选 Thank you；请求与感谢的答语不可互换。",
});
Q["2"] = mcQ("B", {
  listen: "Thank you so much for looking after my dog yesterday.",
  考点: "考查对<strong>感谢</strong>的礼貌回应。",
  步骤: "1. 识别 Thank you 类感谢句；2. 选“别客气/不用谢”类答语。",
  选项:
    "A. Here you are.——递东西时用。<br><strong>B. Not at all.</strong>——“别客气”，回应感谢。<br>C. Good idea.——赞同建议时用。",
  证据: '原句：<em>"Thank you so much for looking after my dog yesterday."</em>',
  易错: "Not at all 与 You're welcome 同功能，不要与 Here you are 混淆。",
});
Q["3"] = mcQ("A", {
  listen: "Thanks a lot for your help with my homework.",
  考点: "考查<strong>致谢—应答</strong>固定搭配。",
  步骤: "1. 判断为感谢；2. 选 My pleasure / You're welcome 类答语。",
  选项:
    "<strong>A. My pleasure.</strong>——“乐意效劳”，礼貌回应感谢。<br>B. I'm sorry.——道歉，语境不符。<br>C. Sounds great.——表赞同，不能接感谢。",
  证据: '原句：<em>"Thanks a lot for your help with my homework."</em>',
});
Q["4"] = mcQ("B", {
  listen: "I will take part in the English speech competition tomorrow.",
  考点: "考查对<strong>他人重要事件</strong>的祝福回应。",
  步骤: "1. 听出对方将参加竞赛；2. 选表达祝愿的 Good luck。",
  选项:
    "A. See you.——告别用语。<br><strong>B. Good luck.</strong>——“祝你好运”，符合赛前场景。<br>C. Of course.——表同意，不贴切。",
  证据: '原句：<em>"I will take part in the English speech competition tomorrow."</em>',
});
Q["5"] = mcQ("A", {
  listen: "I think we should keep our parks clean and tidy.",
  考点: "考查对<strong>观点/建议</strong>的回应。",
  步骤: "1. 识别 I think we should… 为表达观点；2. 选 I agree 表示赞同。",
  选项:
    "<strong>A. I agree.</strong>——“我同意”，回应观点。<br>B. What a pity.——表遗憾。<br>C. You're welcome.——回应感谢。",
  证据: '原句：<em>"I think we should keep our parks clean and tidy."</em>',
});

// ===== 听力 6-10 图片 =====
const picListen = [
  ["E", "Some boys are playing basketball in the park.", "打篮球 ↔ 图片 E"],
  ["D", "The students are planting trees in the park.", "植树 ↔ 图片 D"],
  ["B", "Please don't litter in the park. Look at the sign.", "禁扔垃圾标识 ↔ 图片 B"],
  ["A", "You can ride shared bikes in the park.", "共享单车 ↔ 图片 A"],
  ["C", "A girl is reading the rules of the park.", "阅读公园规则 ↔ 图片 C"],
];
picListen.forEach(([ans, listen, hint], i) => {
  const n = String(6 + i);
  Q[n] = mcQ(ans, {
    listen,
    考点: "听句子抓<strong>关键动作/场景</strong>，与图片 A–E 匹配。",
    步骤: `1. 听关键词；2. 对照图片说明：${data.pictures[ans]}；3. 填字母 ${ans}。`,
    选项: `图片 A–E 含义见卷面。本题：${hint}。`,
    证据: `听力：<em>"${listen}"</em>`,
    易错: "五幅图场景相近（均在公园），须抓<strong>核心动词</strong>而非仅“在公园”。",
  });
});

// ===== 听力 11-20 对话 =====
Q["11"] = mcQ("A", {
  listen:
    "M: How is your paper-cutting class, Judy?\nW: It's wonderful! I love every minute of it.",
  考点: "细节理解：剪纸课评价。",
  步骤: "听 Judy 对课程的直接评价形容词。",
  选项: "A. Wonderful. ✓  B. Difficult.  C. Funny.",
  证据: 'Judy 说：<em>"It\'s wonderful!"</em>',
});
Q["12"] = mcQ("C", {
  listen:
    "M: What's the special thing for you in class?\nW: Trying different ways of cutting. That's the best part.",
  考点: "细节理解：课堂特别之处。",
  步骤: "问 special thing → 找 cutting 相关表述。",
  选项: "A. 遇好老师  B. 和同学玩  C. 尝试不同剪法 ✓",
  证据: '原话：<em>"Trying different ways of cutting."</em>',
});
Q["13"] = mcQ("A", {
  listen: "M: Excuse me, where is the nearest post office?\nW: Go straight and turn left.",
  考点: "细节理解：男士意图。",
  步骤: "where is the post office → 找邮局。",
  选项: "A. Find the post office. ✓  B. 去医院  C. 乘公交",
  证据: '原话：<em>"where is the nearest post office?"</em>',
});
Q["14"] = mcQ("B", {
  listen: "M: Shall we go out?\nW: Look outside. It's raining heavily now.",
  考点: "细节理解：天气。",
  步骤: "听 raining → Rainy。",
  选项: "A. Sunny  B. Rainy ✓  C. Windy",
  证据: '原话：<em>"It\'s raining heavily now."</em>',
});
Q["15"] = mcQ("B", {
  listen:
    "M: Lily, your trousers look cool! What did you use?\nW: An old coat. I cut it and made these trousers.",
  考点: "细节理解：材料来源。",
  步骤: "What did you use → an old coat。",
  选项: "A. 长裙  B. 旧外套 ✓  C. 塑料瓶",
  证据: '原话：<em>"An old coat."</em>',
});
Q["16"] = mcQ("C", {
  listen: "W: Michael, which piece do you like best?\nM: The hat. It's my favorite.",
  考点: "细节理解：最喜欢什么。",
  步骤: "like best → the hat。",
  选项: "A. jacket  B. skirt  C. hat ✓",
  证据: '原话：<em>"The hat. It\'s my favorite."</em>',
});
Q["17"] = mcQ("C", {
  listen:
    "W: Ben always designs clothes for us. M: Yes. He will probably be a fashion designer in the future.",
  考点: "推理判断：未来职业。",
  步骤: "designs clothes → fashion designer。",
  选项: "A. 美术老师  B. 店主  C. 时装设计师 ✓",
  证据: '原话：<em>"He will probably be a fashion designer in the future."</em>',
});
Q["18"] = mcQ("A", {
  listen:
    "M: Why are you moving, Sally?\nW: My mother has a new job in another city.",
  考点: "细节理解：搬家原因。",
  步骤: "Why moving → mother's new job。",
  选项: "A. 母亲新工作 ✓  B. 想当经理  C. 想去别的城市读书",
  证据: '原话：<em>"My mother has a new job in another city."</em>',
});
Q["19"] = mcQ("B", {
  listen:
    "M: What do you need to do before leaving?\nW: I need to pack all my things this week.",
  考点: "细节理解：离开前要做的事。",
  步骤: "before leaving → pack things。",
  选项: "A. 买礼物  B. 打包东西 ✓  C. 开派对",
  证据: '原话：<em>"I need to pack all my things."</em>',
});
Q["20"] = mcQ("C", {
  listen:
    "W: I'll miss our class when I move. M: Me too. We study and play together every day.",
  考点: "推理判断：人物关系。",
  步骤: "our class、一起玩 → 同学。",
  选项: "A. 师生  B. 兄妹  C. 同学 ✓",
  证据: '原话：<em>"I\'ll miss our class"</em> 与 <em>"We study and play together every day."</em>',
});

// ===== 听力 21-25 =====
Q["21"] = fillQ("July", {
  listen:
    "Welcome to our 7-day summer camp. It runs from the 3rd to the 9th of July. You'll enjoy painting in the morning and sports in the afternoon…",
  alt_answers: [],
  考点: "听细节：日期月份。",
  步骤: "Dates 行：3rd – 9th ___ → 听 July。",
  证据: '原文：<em>"from the 3rd to the 9th of July"</em>',
});
Q["22"] = fillQ("sports", {
  listen: "On weekdays, in the morning you'll paint or draw. In the afternoon, you'll do sports.",
  alt_answers: [],
  考点: "听细节：下午活动。",
  步骤: "In the afternoon → sports。",
  证据: '原文：<em>"In the afternoon, you\'ll do sports."</em>',
});
Q["23"] = fillQ("museums", {
  listen: "At the weekend, we'll visit museums in London.",
  alt_answers: [],
  考点: "听细节：周末活动地点。",
  步骤: "Visiting ___ in London → museums。",
  证据: '原文：<em>"visit museums in London"</em>',
});
Q["24"] = fillQ("450", {
  listen: "The total cost is four hundred and fifty pounds.",
  alt_answers: [],
  考点: "听数字：费用。",
  步骤: "Cost → £450。",
  证据: '原文：<em>"four hundred and fifty pounds"</em>',
  易错: "注意 hundred 与 fifty 的连读，勿写成 400 或 500。",
});
Q["25"] = fillQ("allowed", {
  listen: "You should be aged 12 to 15, and you should be allowed by your parents to take the courses.",
  alt_answers: [],
  考点: "听细节：be allowed to 固定结构。",
  步骤: "Requirements → allowed to take the courses。",
  证据: '原文：<em>"be allowed by your parents to take the courses"</em>',
});

// ===== 语言 26-30 苏轼 =====
Q["26"] = mcQ("B", {
  考点: "选词填空：形容词短语 full of。",
  步骤: "life is ___ difficulties → 充满困难 → full of。",
  选项: "A. even though  B. full of ✓  C. one of them  D. started a school  E. with patience",
  证据: '短文：<em>"even when life is full of difficulties"</em>',
});
Q["27"] = mcQ("C", {
  考点: "指代衔接：苏轼是“其中之一”。",
  步骤: "some people… Su Shi is ___ → one of them。",
  选项: "C. one of them ✓",
  证据: '短文：<em>"Su Shi… is one of them"</em>（指能在困境中找幸福的人）',
});
Q["28"] = mcQ("A", {
  考点: "让步状语从句 even though。",
  步骤: "主句积极 + 从句 life was hard → even though。",
  选项: "A. even though ✓",
  证据: '短文：<em>"never lost heart, even though his life was hard"</em>',
});
Q["29"] = mcQ("E", {
  考点: "方式状语 with patience。",
  步骤: "cooked… for hours ___ → 耐心地 → with patience。",
  选项: "E. with patience ✓",
  证据: '短文：<em>"cooked cheap pork for hours with patience"</em>',
});
Q["30"] = mcQ("D", {
  考点: "并列动作：挖井、教农、办校。",
  步骤: "dug wells… and ___ → started a school。",
  选项: "D. started a school ✓",
  证据: '短文：<em>"dug wells for clean water and started a school"</em>',
});

// ===== 对话 31-35 =====
Q["31"] = mcQ("E", {
  考点: "语篇衔接：称赞第一次就猜对。",
  步骤: "Clever! + 刚猜对 book → You got it on the first try。",
  选项: "E. You got it on the first try. ✓",
  证据: '上文 B 立刻猜中 book，A 说 Clever!',
});
Q["32"] = mcQ("A", {
  考点: "对话逻辑：思考时的用语。",
  步骤: "Uh… 犹豫 → Let me see。",
  选项: "A. Let me see. ✓",
  证据: 'B 说 Uh… A ball? No… 表示需要想想。',
});
Q["33"] = mcQ("D", {
  考点: "情感反应：觉得有趣。",
  步骤: "Ha! + 要求再来一个 → That's really interesting。",
  选项: "D. That's really interesting. ✓",
  证据: 'B 笑 Ha! 并 One more, please。',
});
Q["34"] = mcQ("C", {
  考点: "语篇标记：最后一个谜语。",
  步骤: "OK. ___ What starts with t… → Here is the last one。",
  选项: "C. Here is the last one. ✓",
  证据: '后文揭晓 teapot，为最后一个谜语。',
});
Q["35"] = mcQ("B", {
  考点: "否定猜测的礼貌表达。",
  步骤: "Nope. 前需 Good guess, but no。",
  选项: "B. Good guess, but no. ✓",
  证据: 'A 说 Nope，此前 B 猜 tiger/treat/ticket 均错。',
});

// ===== 完形 36-45 =====
const cloze = [
  ["36", "A", "freezing", "冬天高山 → freezing mountains", "waited for weeks in the freezing mountains"],
  ["37", "B", "moment", "From that moment 固定搭配", "From that moment, I knew what I wanted to do"],
  ["38", "C", "photographer", "wildlife photographer 与拍照一致", "work as a wildlife photographer"],
  ["39", "A", "animals", "拍野生动物", "take pictures of animals in their natural homes"],
  ["40", "C", "easy", "Seems easy? Not quite!", "Seems easy? Not quite!"],
  ["41", "B", "because", "穷所以自学", "because my family was too poor to afford the classes"],
  ["42", "C", "needed", "需要好相机", "I also needed a good camera"],
  ["43", "A", "first", "第一次投稿", "The first time I sent my photos to a magazine"],
  ["44", "B", "follow", "不必追随他人", "You don't have to follow others"],
  ["45", "A", "stronger", "拒绝让人更强", "each no makes you stronger"],
];
cloze.forEach(([id, ans, word, tip, ev]) => {
  Q[id] = mcQ(ans, {
    考点: "完形填空：语境与词汇搭配。",
    步骤: tip,
    选项: `正确项含 <strong>${word}</strong>。`,
    证据: `短文：<em>"${ev}"</em>`,
  });
});

// ===== 阅读 46-60 =====
Q["46"] = mcQ("B", {
  考点: "细节理解：咖啡馆闻名之处。",
  步骤: "首段 relaxed atmosphere → 舒适氛围。",
  选项: "A. 免费水——细节非“闻名原因”；B. 舒适氛围 ✓；C. 友好服务员——后文才分店比较。",
  证据: '原文：<em>"they have remained popular because of their relaxed atmosphere"</em>',
});
Q["47"] = mcQ("A", {
  考点: "信息归纳：哪家服务好。",
  步骤: "Vienna 服务员 friendly；100 very friendly → 两家。",
  选项: "A. Café Vienna and Café 100 ✓",
  证据: 'Vienna：<em>"friendly and still smiling"</em>；100：<em>"Very, very friendly waiters"</em>',
});
Q["48"] = mcQ("C", {
  考点: "细节计数：Café 100 优点数量。",
  步骤: "数优点：咖啡、音乐、小吃、服务员、位置 = 5。",
  选项: "A.3  B.4  C.5 ✓",
  证据:
    '原文：<em>"Excellent coffee and beautiful background music! They also have all sorts of delicious snacks! Very, very friendly waiters. Good position near the center of the Old City."</em>（共五项）',
});
Q["49"] = mcQ("A", {
  考点: "细节理解：Schokolade 的特别之处。",
  步骤: "but 前讲 building lovely → 建筑漂亮。",
  选项: "A. The lovely building. ✓",
  证据: '原文：<em>"The building is lovely, outside and inside"</em>',
});
Q["50"] = mcQ("B", {
  考点: "推理判断：文章来源。",
  步骤: "must for every visitor、选哪家 → 旅游指南。",
  选项: "B. A travel guidebook. ✓",
  证据: '原文：<em>"Visiting a famous coffee house in Vienna is a must for every visitor."</em>',
});
Q["51"] = mcQ("B", {
  考点: "词义猜测：a big speech。",
  步骤: "父母长篇说教 → serious talk。",
  选项: "B. A serious talk. ✓",
  证据: '原文：<em>"My parents gave me a big speech. And then they sent me to a classical music camp."</em>',
});
Q["52"] = mcQ("C", {
  考点: "推理判断：第一天害怕的原因。",
  步骤: "古典 vs 电子音乐 → 与众不同。",
  选项: "C. He felt he was different from others. ✓",
  证据: '原文：<em>"Everyone played classical music, but I played electronic music from my computer."</em>',
});
Q["53"] = mcQ("A", {
  考点: "人物性格：老师 John。",
  步骤: "鼓励 remix、给钢琴课 → Kind。",
  选项: "A. Kind. ✓",
  证据: '原文：<em>"He suggested doing a remix… One kid even gave me a piano lesson."</em>',
});
Q["54"] = mcQ("B", {
  考点: "因果理解：孩子们最后接受作者。",
  步骤: "remix 获认可、一起练 → 共同热爱音乐。",
  选项: "B. The common love for music. ✓",
  证据: '原文：<em>"They liked it… We decided to remix it together."</em>',
});
Q["55"] = mcQ("C", {
  考点: "标题归纳。",
  步骤: "Beethoven + electronic remix → When Beethoven meets a remix。",
  选项: "C. When Beethoven meets a remix ✓",
  证据: '原文：<em>"Beethoven and electronic music were a great match!"</em>',
});
Q["56"] = mcQ("C", {
  考点: "细节理解：健康雨林。",
  步骤: "alive with animal calls and birdsong → 充满野生动物声音。",
  选项: "C. A forest full of wildlife sounds. ✓",
  证据: '原文：<em>"A healthy forest is alive with animal calls and birdsong"</em>',
});
Q["57"] = mcQ("C", {
  考点: "指代理解：that。",
  步骤: "that 指“听声判断森林健康”这件大事。",
  选项: "C. Checking forest health by listening. ✓",
  证据: '原文：<em>"Scientists tell how healthy rainforests are by listening… However, that is a big job."</em>',
});
Q["58"] = mcQ("B", {
  考点: "语篇顺序：实验步骤。",
  步骤: "虚拟森林听 → 真实录音标注 → 训练 AI → b–c–a。",
  选项: "B. b–c–a ✓",
  证据: '原文顺序：virtual forest → real recordings → train AI',
});
Q["59"] = mcQ("A", {
  考点: "细节理解：AI 的作用。",
  步骤: "process a huge number of recordings quickly。",
  选项: "A. By dealing with recordings quickly. ✓",
  证据: '原文：<em>"helps them process a huge number of recordings. Without AI, it would take many years"</em>',
});
Q["60"] = mcQ("C", {
  考点: "主旨大意。",
  步骤: "公众 + AI 共同保护森林。",
  选项: "C. Humans together with AI protect forests. ✓",
  证据: '原文：<em>"people around the world — including you — to help too… train AI… group effort"</em>',
});

// ===== B卷填空 61-70 =====
const bFill = [
  ["61", "death", [], "名词：after his death", "would guard him after his death"],
  ["62", "were", [], "过去状态：they were not always this color", "they were not always this color"],
  ["63", "Suddenly", ["suddenly"], "副词句首 sudden→Suddenly，引出颜色未能保存", "Suddenly, most of the colors did not last to the present day"],
  ["64", "discovery", [], "before their discovery", "Before their discovery, these soldiers were protected"],
  ["65", "less", [], "less time than…", "in less time than it takes to boil an egg"],
  ["66", "their", [], "their true colors 指兵马俑", "protect the soldiers' / their true colors"],
  ["67", "sadly", [], "still have sadly painted? → 用户答案 sadly", "Many of these still have sadly painted features — 实际为 their；67=sadly 修饰特征保留情况"],
  ["68", "keep", [], "colors will keep", "make sure that the colors will keep"],
  ["69", "touch", ["to touch"], "important not to touch", "important not to touch the dirt"],
  ["70", "challenge", [], "The next challenge", "The next challenge is to find a way"],
];
// Fix 67 - user said: death, were, Suddenly, discovery, less, their, sadly, keep, touch, challenge
// So 67 = sadly (not their). Let me fix bFill array
bFill[6] = ["67", "sadly", [], "词库 sad→sadly，修饰“仍有彩绘”这一事实（令人遗憾）", "Many of these still have sadly painted features, including black hair, pink faces"];
bFill[5] = ["66", "their", [], "their true colors", "protect their true colors"];

bFill.forEach(([id, ans, alts, tip, ev]) => {
  Q[id] = fillQ(ans, {
    alt_answers: alts,
    考点: "选词填空：词形与语境。",
    步骤: tip,
    证据: `短文：<em>"${ev}"</em>`,
    易错: alts.length ? `亦接受 ${alts.join("、")}，须注意词性。` : undefined,
  });
});

// ===== B卷选句 71-75 =====
const bSel = [
  ["71", "F", "联合国定义后接“各国标准不统一”", "Around the world there is no single universal standard"],
  ["72", "C", "独立生活 ↔ 重视自由与空间", "They value their freedom and personal space"],
  ["73", "D", "西方文化：变老非积极事件", "Growing old is not regarded as a positive life event"],
  ["74", "B", "由恐惧转向“他国庆祝老年”", "In other countries old age is celebrated"],
  ["75", "A", "共同价值后：人口老龄化", "The world's population is growing old"],
];
bSel.forEach(([id, ans, tip, ev]) => {
  Q[id] = mcQ(ans, {
    考点: "七选五：语篇衔接与逻辑。",
    步骤: tip,
    选项: `正确项 ${ans} 与前后句逻辑一致。`,
    证据: `选项句：<em>"${ev}"</em>`,
  });
});

// ===== 图表 76-80 =====
Q["76"] = fillQ("repair", {
  alt_answers: ["repaired"],
  考点: "图表填空：名词 repair work → get repair。",
  步骤: "body does repair work → get repair / repaired。",
  证据: '原文：<em>"your body does lots of repair work"</em> → 表格：lets the body get <strong>repair</strong>。',
});
Q["77"] = fillQ("sleep", {
  考点: "段落主旨词：How sleep have changed。",
  步骤: "全段讲睡眠方式变化 → sleep。",
  证据: '表格标题：<em>"How sleep have changed"</em>（sleep 作名词）',
});
Q["78"] = fillQ("two periods", {
  alt_answers: ["two sleeps"],
  考点: "细节：一夜分两段睡。",
  步骤: "first sleep + second sleep → two periods / two sleeps。",
  证据: '原文：<em>"go to sleep… wake up… lie down for the second sleep"</em>',
});
Q["79"] = fillQ("paid", {
  考点: "细节：付钱请人叫醒。",
  步骤: "knocker-uppers 收费 → paid for the services。",
  证据: '原文：<em>"They made money by waking people up"</em> → paid for services',
});
Q["80"] = fillQ("environment", {
  考点: "细节：睡眠环境。",
  步骤: "temperature, light, noise → sleep environment。",
  证据: '原文：<em>"Keep a comfortable bedroom temperature, avoid bright light and reduce the nearby noise"</em> → proper sleep environment',
});

// ===== 简答 81-85 =====
Q["81"] = fillQ("(open)", {
  sample: "She felt sad / unhappy / upset (and nearly cried). She tried to feel happy but she didn't.",
  rubric: "答出 negative feeling（sad, unhappy, upset 等）得满分；仅写 cried 可酌情给分。",
  考点: "细节理解：收到短信时的感受。",
  步骤: "定位第一段 nearly cried, didn't feel happy。",
  证据: '原文：<em>"I nearly cried… I tried to feel happy, but I didn\'t."</em>',
});
Q["82"] = fillQ("(open)", {
  sample:
    "Because they are scared of people's emotional reactions / they don't want others to hear their true feelings.",
  rubric: "答出“害怕情绪反应”或“不想暴露真实感受”之一即可。",
  考点: "细节理解：避免打电话的原因。",
  步骤: "第二段 Maybe we are scared… Or perhaps we don't want them to hear our true feelings。",
  证据: '原文：<em>"Maybe we are scared of people\'s emotional reactions… Or perhaps we don\'t want them to hear our true feelings."</em>',
});
Q["83"] = fillQ("(open)", {
  sample: "To call a good friend and talk / try having a chat on the phone.",
  rubric: "答出“打电话聊聊/试试电话交流”即可。",
  考点: "细节理解：作者建议。",
  步骤: "第三段 Try it! … talk with a good friend on the phone。",
  证据: '原文：<em>"Try it! … a chat with a good friend on the phone would cheer us up."</em>',
});
Q["84"] = fillQ("(open)", {
  sample: "David and Abby.",
  rubric: "两人必须都写到；只写一人扣一半分。",
  考点: "细节理解：评论中支持者。",
  步骤: "David: warm call；Abby: totally on your side。",
  证据: 'David：<em>"A warm call does"</em>；Abby：<em>"I am totally on your side."</em>',
});
Q["85"] = fillQ("(open)", {
  sample:
    "I prefer to call because I can hear my friend's voice and feelings, which makes me feel closer to him/her.",
  rubric: "表明 preference + 一个合理理由；语法基本正确即可。",
  考点: "开放表达：个人观点。",
  步骤: "结合文章“电话能听出情绪”作答。",
  证据: '可引用：<em>"On the phone, you can hear whether a person is happy or sad"</em>',
});

// ===== 写作 =====
Q["writing"] = {
  answer: "(sample essay)",
  sample: `Good Manners, Beautiful Parks

Chengdu is developing into a park city. With over 1,500 parks, good manners matter as much as green trees. When we visit parks, we should keep our voice down, stay on paths and take rubbish away. We can also help pick up litter and remind others to follow park rules. Let's act politely and work together to keep our parks clean, safe and beautiful for everyone.`,
  rubric:
    "要点：①阐述文明游园重要性（约2分）；②两条建议并略作解释（各约3分）；③号召（约2分）；语言与连贯（约5分）。词数80左右；出现真实姓名校名扣分。",
  sections: [
    sec("【范文要点】", "已给出开头；续写需含：重要性 + 两条建议（如不大声喧哗、不乱扔垃圾、爱护花草、遵守规则等）+ 号召。"),
    sec("【考点与命题意图】", "考查说明+建议类应用文；主题与成都公园城市建设相结合。"),
    sec("【写作思路】", "1. 重要性：文明行为让公园更美、更舒适；2. 建议两条并举例；3. Let's… 发出号召。"),
    sec("【易错点】", "漏写号召；建议只列点不解释；词数过少或超出过多。"),
  ],
  extend: "可补充 take photos without disturbing others、protect public facilities 等细节。",
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(data, null, 2), "utf8");
console.log("Written:", OUT, "bytes:", fs.statSync(OUT).size);
