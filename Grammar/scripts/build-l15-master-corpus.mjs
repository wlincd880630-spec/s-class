#!/usr/bin/env node
/**
 * 编译 L15 主语料库 → l15-corpus-pool.js + chengdu-exam-vocab-master.json
 * 目标：词性转换 + 词汇合计 500+ 条
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { enrichAll } from "./l15-example-engine.mjs";

const L15 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../L15");
const DATA = path.join(L15, "data");

function item(cat, en, zh, opts = {}) {
  return {
    cat,
    en: String(en).trim(),
    zh: String(zh).trim(),
    tier: opts.tier || (cat === "tier3" || cat === "polysemy" ? 3 : 2),
    year: opts.year || opts.years || "",
    tag: opts.tag || "",
    form: opts.form || "",
    base: opts.base || "",
    note: opts.note || "",
  };
}

const items = [];

// ── 词性转换（真题 B 卷 + 技巧）──
const WF = [
  ["quick", "quickly", "2018"], ["slow", "slowly", "2018"], ["many", "more", "2018"],
  ["direct", "direction", "2018"], ["important", "importance", "2018"], ["fly", "flying", "2018"],
  ["choice", "chose", "2018"], ["bad", "badly", "2019"], ["British", "Britain", "2019"],
  ["fun", "funnier", "2019"], ["pleasure", "pleasant", "2019"], ["total", "totally", "2019"],
  ["they", "their", "2019"], ["understand", "understanding", "2019"], ["tie", "tied", "2020"],
  ["true", "truly", "2020"], ["little", "less", "2020"], ["possible", "possibly", "2020"],
  ["able", "ability", "2020"], ["success", "success", "2020"], ["we", "ourselves", "2020"],
  ["difficult", "difficulty", "2020"], ["succeed", "success", "2021"], ["argue", "argument", "2021"],
  ["beautiful", "beauty", "2021"], ["good", "well", "2021"], ["work", "works", "2021"],
  ["silence", "silent", "2022"], ["sudden", "suddenly", "2022"], ["touch", "touched", "2022"],
  ["health", "healthy", "2022"], ["excite", "excited", "2022"], ["follow", "followers", "2022"],
  ["complete", "completely", "2022"], ["child", "children", "2023"], ["actual", "actually", "2023"],
  ["different", "differently", "2023"], ["advantage", "advantages", "2023"], ["hear", "heard", "2023"],
  ["wide", "widely", "2024"], ["decide", "decision", "2024"], ["perform", "performance", "2024"],
  ["mean", "meaning", "2024"], ["please", "pleasure", "2024"], ["lead", "led", "2024"],
  ["they", "their", "2024"], ["talent", "talented", "2024"], ["direct", "directly", "2025"],
  ["expect", "expected", "2025"], ["choose", "choice", "2025"], ["notice", "noticed", "2025"],
  ["die", "death", "2026"], ["discover", "discovery", "2026"], ["sudden", "Suddenly", "2026"],
  ["little", "less", "2026"], ["they", "their", "2026"], ["sad", "sadly", "2026"],
  ["touch", "to touch", "2026"], ["happy", "happily", "技巧"], ["die", "death", "技巧 -th"],
  ["grow", "growth", "技巧"], ["wide", "width", "技巧"], ["deep", "depth", "技巧"],
  ["strong", "strength", "技巧"], ["long", "length", "技巧"], ["high", "height", "技巧"],
  ["develop", "development", "技巧 -ment"], ["agree", "agreement", "2024/技巧"],
  ["improve", "improvement", "技巧"], ["encourage", "encouragement", "技巧"],
  ["organize", "organization", "技巧"], ["realize", "realization", "技巧"],
  ["happy", "happiness", "技巧 -ness"], ["kind", "kindness", "技巧"], ["dark", "darkness", "技巧"],
  ["ill", "illness", "技巧"], ["discuss", "discussion", "技巧 -sion"],
  ["express", "expression", "技巧"], ["impress", "impression", "技巧"],
  ["invent", "invention", "技巧"], ["connect", "connection", "技巧"],
  ["pollute", "pollution", "技巧"], ["protect", "protection", "技巧"],
  ["introduce", "introduction", "技巧"], ["produce", "production", "技巧"],
  ["child", "children", "不规则"], ["man", "men", "不规则"], ["woman", "women", "不规则"],
  ["foot", "feet", "不规则"], ["tooth", "teeth", "不规则"], ["mouse", "mice", "不规则"],
];
WF.forEach(([b, f, y]) => items.push(item("word-form", `${b} → ${f}`, `${b} 转化为 ${f}`, { base: b, form: f, year: y, tier: 2 })));

// ── 动词词组（真题）──
const VP = [
  ["make sure", "确保", "2026"], ["afford to do", "负担得起做", "2026"], ["not to touch", "不要触摸", "2026"],
  ["lose heart", "灰心", "2026"], ["started a school", "办起一所学校", "2026"],
  ["stick to your goals", "坚持目标", "2026"], ["never give up", "永不放弃", "2026"], ["dig wells", "挖井", "2026"], ["wind down", "放松下来", "2026"],
  ["put screens away", "放下屏幕", "2026"], ["form memories", "形成记忆", "2026"], ["overcome challenges", "克服挑战", "2026"],
  ["bring back to life", "使复活", "2026"], ["pick out", "挑出", "2026"], ["live independently", "独立生活", "2026"],
  ["get used to doing", "习惯于做", "2022/2024"], ["used to do", "过去常常做", "2022"], ["fall asleep", "入睡", "2022"],
  ["make it + adj.", "使…变得…", "2023"], ["regard … as …", "把…视为", "2020"], ["be supposed to do", "应该做", "2019"],
  ["hand in", "上交", "中考"], ["pick up", "接/捡起", "2018"], ["stay up", "熬夜", "阅读"],
  ["run out of", "用完", "预测"], ["take part in", "参加", "2023"], ["look forward to doing", "盼望做", "预测"],
  ["keep calm and carry on", "保持冷静继续前行", "2019"], ["pay by scanning", "扫码支付", "2020"],
  ["take advantage of", "利用", "2020"], ["social distancing", "社交距离", "2020"],
  ["prevent the spread of", "阻止传播", "2020"], ["come up with", "想出", "2022"],
  ["pretend to be hurt", "假装受伤", "2022"], ["focus on", "专注于", "2022"],
  ["drive all the way", "一路开车", "2023"], ["make pocket money", "赚零花钱", "2023"],
  ["take control of", "掌控", "2023"], ["carry out research", "开展研究", "2024"],
  ["take off a plane", "下飞机", "2025"], ["make one's flight", "赶上航班", "2025"],
  ["feel at home", "宾至如归", "2025"], ["fitted into", "融入", "2025"],
  ["get close to", "接近", "2018"], ["places of interest", "名胜古迹", "2018"],
  ["cultural exchanges", "文化交流", "2018"], ["work out", "解决/锻炼", "2018"],
  ["give a speech", "发表演讲", "2018"], ["overcome shyness", "克服害羞", "2018"],
  ["figure out", "弄清楚", "2018"], ["draw pictures of suspects", "画嫌疑犯", "2019"],
  ["put into practice", "付诸实践", "2019"], ["forest protection", "森林保护", "2019"],
  ["turn to", "转向", "2019"], ["win popularity", "赢得人气", "2020"],
  ["weaken one's health", "损害健康", "2020"], ["follow the examples of", "效仿", "2020"],
  ["form friendship", "形成友谊", "2020"], ["spread ideas", "传播思想", "2020"],
  ["travel alone", "独自旅行", "2021"], ["set up shop windows", "设橱窗", "2021"],
  ["make a living", "谋生", "2021"], ["bury food", "埋藏食物", "2022"],
  ["cry softly", "小声叫", "2022"], ["search for work", "外出谋生", "2025"],
  ["repair the old as old", "修旧如旧", "2025"], ["safe and sound", "安然无恙", "2025"],
  ["provide … with …", "向…提供", "预测"], ["be responsible for", "对…负责", "预测"],
  ["make a difference", "有影响", "2023"], ["pay attention to", "注意", "预测"],
  ["get along with", "与…相处", "预测"], ["give up", "放弃", "预测"],
  ["take care of", "照顾", "预测"], ["look after", "照料", "预测"],
  ["deal with", "处理", "2020"], ["depend on", "依赖", "预测"], ["insist on", "坚持", "预测"],
  ["keep in touch with", "保持联系", "预测"], ["catch up with", "赶上", "预测"],
  ["run out of time", "时间用完", "预测"], ["break out", "爆发", "预测"],
  ["find out", "查明", "预测"], ["point out", "指出", "预测"], ["carry on", "继续", "2019"],
  ["hold on", "等一下", "预测"], ["go on", "继续", "预测"], ["put on", "穿上/上演", "预测"],
  ["take off", "起飞/脱下", "预测"], ["set up", "建立", "预测"], ["give away", "赠送", "预测"],
  ["throw away", "扔掉", "预测"], ["cut down", "砍倒/减少", "预测"], ["use up", "用完", "预测"],
];
VP.forEach(([e, z, y]) => items.push(item("verb-phrase", e, z, { year: y, tier: 2 })));

// ── 形容词/名词词组 ──
const AN = [
  ["facial expressions", "面部表情", "2018/2024"], ["central nervous system", "中枢神经系统", "2018"],
  ["greenhouse gases", "温室气体", "2019"], ["global leaf area", "全球叶面积", "2019"],
  ["relaxed atmosphere", "轻松氛围", "2020/2026"], ["personification", "拟人手法", "2020"],
  ["peaceful society", "和谐社会", "2020"], ["unpaid work", "无偿劳动", "2021"],
  ["breathable shoes", "透气鞋", "2021"], ["intangible cultural heritage", "非物质文化遗产", "2021"],
  ["freezing weather", "严寒天气", "2021/2026"], ["climate change", "气候变化", "2021"],
  ["average life expectancy", "平均寿命", "2022"], ["environmental protection", "环境保护", "2022"],
  ["bright side", "积极面", "2023"], ["monkey mind", "杂念纷飞", "2024"],
  ["animal shelters", "动物收容所", "2024"], ["tourism infrastructure", "旅游基础设施", "2025"],
  ["ethnic-themed photography", "民族风旅拍", "2025"], ["Feelings Wheel", "情绪轮", "2025"],
  ["negative feelings", "负面情绪", "2025"], ["table service", "桌边服务", "2026"],
  ["virtual forest", "虚拟森林", "2026"], ["personal space", "个人空间", "2026"],
  ["low spirits", "情绪低落", "2026"], ["life-sized terracotta warriors", "真人大小的兵马俑", "2026"],
  ["wildlife photographer", "野生动物摄影师", "2026"], ["deep-rooted tradition", "深厚传统", "2026"],
  ["health care", "医疗保健", "2026"], ["community services", "社区服务", "2026"],
  ["Double Ninth Festival", "重阳节", "2026"], ["summer camp", "夏令营", "2026"],
  ["proper sleep environment", "合适睡眠环境", "2026"], ["sense of humor", "幽默感", "2019"],
  ["British humor", "英式幽默", "2019"], ["social peace", "社会和谐", "2020"],
  ["nature reserve", "自然保护区", "2021"], ["flour paste", "糨糊", "2021"],
  ["event horizon telescope", "事件视界望远镜", "2022"], ["Luban Lock", "鲁班锁", "2022"],
  ["Mercator Projection", "墨卡托投影", "2023"], ["longitude and latitude", "经纬度", "2023"],
  ["radiosonde balloon", "探空气球", "2024"], ["parasitic vines", "寄生藤蔓", "2025"],
  ["tree ring dating", "年轮测年", "2025"], ["homestay business", "民宿生意", "2025"],
  ["public transportation", "公共交通", "预测"], ["renewable energy", "可再生能源", "预测"],
  ["mental health", "心理健康", "预测"], ["food waste", "食物浪费", "HET新课"],
  ["carbon neutral", "碳中和", "预测"], ["rural revitalization", "乡村振兴", "预测"],
  ["digital literacy", "数字素养", "预测"], ["volunteer service", "志愿服务", "预测"],
];
AN.forEach(([e, z, y]) => items.push(item("adj-noun-phrase", e, z, { year: y, tier: 2 })));

// ── 固定搭配 collocations ──
const COL = [
  ["be regarded as", "被视为", "2020"], ["according to", "根据", "通用"], ["instead of", "而不是", "2018"],
  ["because of", "因为", "通用"], ["as long as", "只要", "2021"], ["so that", "以便", "2022"],
  ["in order to", "为了", "通用"], ["one of the", "…之一", "2026"], ["less than", "少于", "2026"],
  ["even though", "尽管", "2026"], ["full of", "充满（形容词短语，常与 be 连用）", "2026"],
  ["one of them", "他们中的一员", "2026"], ["with patience", "耐心地", "2026"],
  ["more and more", "越来越", "2020"], ["from time to time", "不时", "2026"],
  ["well worth a visit", "很值得一看", "2026"], ["not up to standard", "不达标", "2026"],
  ["accepted the challenge", "接受挑战", "2026"], ["a great match", "绝配", "2026"],
  ["group effort", "集体努力", "2026"], ["in a controlled way", "以可控方式", "2025"],
  ["never let you down", "从不让人失望", "2025"], ["in total", "总共", "2019"],
  ["straight face", "面无表情", "2019"], ["keep calm", "保持冷静", "2019"],
  ["have influence on", "对…有影响", "2019"], ["be separated from", "与…分离", "2019"],
  ["similar to", "与…相似", "2020"], ["connected to", "与…相连", "2020"],
  ["getting interested in", "对…越来越感兴趣", "2020"], ["sold out", "售罄", "2020"],
  ["at least", "至少", "通用"], ["at most", "最多", "通用"], ["no longer", "不再", "通用"],
  ["as soon as", "一…就", "通用"], ["by the time", "到…时候", "通用"], ["in fact", "事实上", "2023"],
  ["such as", "例如", "通用"], ["rather than", "而不是", "通用"], ["not only … but also", "不仅…而且", "通用"],
  ["both … and", "两者都", "通用"], ["either … or", "要么…要么", "2020"], ["neither … nor", "既不…也不", "通用"],
  ["not … until", "直到…才", "通用"], ["be fond of", "喜欢", "预测"], ["be proud of", "为…骄傲", "预测"],
  ["be afraid of", "害怕", "预测"], ["be full of", "充满", "2026"], ["be interested in", "对…感兴趣", "通用"],
  ["be good at", "擅长", "通用"], ["be weak in", "不擅长", "预测"], ["be famous for", "因…著名", "预测"],
  ["be ready for", "为…准备好", "预测"], ["be worried about", "担心", "预测"], ["be strict with", "对…严格", "预测"],
  ["be similar to", "与…相似", "2020"], ["be different from", "与…不同", "预测"], ["be thankful to", "感谢", "2020"],
  ["Go …, and you will …", "祈使+and表结果", "2024"], ["It is adj. to do", "做某事是…的", "2024"],
  ["make sure", "确保", "2026"], ["make friends", "交朋友", "预测"], ["make progress", "取得进步", "预测"],
  ["make mistakes", "犯错", "预测"], ["make decisions", "做决定", "2024"], ["take notes", "记笔记", "预测"],
  ["take photos", "拍照", "预测"], ["take action", "采取行动", "预测"], ["take risks", "冒险", "预测"],
  ["do harm to", "对…有害", "预测"], ["do exercise", "锻炼", "2023"], ["have fun", "玩得开心", "2019"],
  ["have trouble doing", "做某事有困难", "预测"], ["have a good time", "玩得愉快", "预测"],
];
COL.forEach(([e, z, y]) => items.push(item("collocation", e, z, { year: y, tier: 2 })));

// ── 习语 / 谚语 / 俚语 ──
const IDM = [
  ["Keep calm and carry on.", "保持冷静，继续前行。", "2019"], ["It's a bit windy today.", "今天有点风。（英式轻描淡写）", "2019"],
  ["Failure is the mother of success.", "失败是成功之母。", "2018"], ["It's up to you.", "由你决定。", "2018"],
  ["Do to others what you wish to be done to you.", "己所不欲，勿施于人。", "2020"],
  ["In the company of two others, I can always find one worthy of being my teacher.", "三人行必有我师。", "2020"],
  ["Good rain knows its time right.", "好雨知时节。", "2020"],
  ["Impervious to wind, rain or shine, I'll have my own will.", "一蓑烟雨任平生。", "2026"],
  ["lose heart", "灰心丧气", "2026"], ["catch a cold", "感冒（谜语：catch but can't throw）", "2026"],
  ["You got it on the first try.", "你一次就猜中了。", "2026"], ["What a pity!", "真遗憾！", "2026"],
  ["Red sky at night, sailor's delight.", "晚霞行千里。", "2024"], ["All that glitters isn't gold.", "发光的不都是金子。", "2024"],
  ["Good, better, best. Never let it rest.", "好更好最好，永不停歇。", "2021"],
  ["Life is like a horse, and either you ride it or it rides you.", "生活像匹马，不是你骑它就是它骑你。", "2020"],
  ["feed the parrots", "顾好生活中真正重要的事", "2020"], ["Internet-famous place", "网红打卡地", "2020"],
  ["snail mail", "纸质慢邮", "2023"], ["feel at home", "宾至如归", "2025"],
  ["step off / step on", "走下/走上平台", "2019"], ["think alike", "英雄所见略同", "2020"],
  ["Every cloud has a silver lining.", "黑暗中总有一线光明。", "预测"], ["Actions speak louder than words.", "行动胜于言语。", "预测"],
  ["Practice makes perfect.", "熟能生巧。", "预测"], ["Where there is a will, there is a way.", "有志者事竟成。", "预测"],
  ["It is never too late to learn.", "活到老学到老。", "预测"], ["The early bird catches the worm.", "早起的鸟儿有虫吃。", "预测"],
  ["Better late than never.", "迟做总比不做好。", "预测"], ["No pain, no gain.", "不劳无获。", "预测"],
  ["Time is money.", "时间就是金钱。", "预测"], ["Honesty is the best policy.", "诚实是上策。", "预测"],
  ["Rome wasn't built in a day.", "罗马不是一天建成的。", "预测"], ["When in Rome, do as the Romans do.", "入乡随俗。", "预测"],
  ["A friend in need is a friend indeed.", "患难见真情。", "预测"], ["The more, the merrier.", "人越多越热闹。", "预测"],
  ["Easier said than done.", "说起来容易做起来难。", "预测"], ["Out of sight, out of mind.", "眼不见心不念。", "预测"],
  ["Old-fashioned girl", "守旧派（自嘲）", "2026"], ["find a middle ground", "找折中方案", "2026"],
  ["hit on the nose", "一针见血", "2022"], ["doorway to the world", "通向世界的入口", "2022"],
];
IDM.forEach(([e, z, y]) => items.push(item("idiom", e, z, { year: y, tier: 2 })));

// ── 熟词僻义 polysemy ──
const POLY = [
  ["bank", "银行", "河岸", "The light from the riverboat…", "2020"],
  ["fine", "好的", "罚款（文明游园语境）", "Good Manners, Beautiful Parks", "2026"],
  ["run", "跑", "经营/运转", "homestay business runs successfully", "2025"],
  ["book", "书", "预订", "A book has words but never speaks.", "2026"],
  ["catch", "抓住", "染上（catch a cold）", "What can you catch but not throw?", "2026"],
  ["touch", "触摸", "感动", "Lai's hard work touched her son.", "2021"],
  ["cover", "覆盖", "封面", "book whose cover has a picture", "2020"],
  ["regard", "看待", "被视为", "regarded as an Internet-famous place", "2020"],
  ["shoot", "射击", "拍摄（perfect shot）", "perfect shot of a tiger", "2026"],
  ["strike", "打击", "雷击", "lightning strikes trees", "2025"],
  ["sound", "声音", "安然无恙（safe and sound）", "stays safe and sound", "2025"],
  ["company", "公司", "陪伴", "In the company of two others…", "2020"],
  ["figure", "数字", "认为/弄清楚", "To figure this out…", "2018"],
  ["express", "表达", "快车（语境：strong feelings）", "don't express strong feelings", "2019"],
  ["present", "礼物/现在", "呈现", "presenting it to the kids", "2026"],
  ["race", "比赛", "民族/马拉松", "42-kilometer race", "2022"],
  ["spring", "春天", "弹簧/春雨", "spring rain", "2020"],
  ["address", "地址", "演讲", "a big speech", "2026"],
  ["character", "角色", "汉字/品格", "Chinese character 间", "2025"],
  ["interest", "兴趣", "利息", "get interest from the bank", "2023"],
  ["experience", "经历", "经验/体验", "experiences in China", "2025"],
  ["lesson", "课", "教训", "lessons are not only about learning", "2025"],
  ["event", "事件", "活动", "events were organised", "2025"],
  ["fit", "适合", "融入（fit into）", "fitted into the university", "2025"],
  ["fail", "失败", "未能（lock failed）", "He tried his best but failed.", "2025"],
  ["receive", "收到", "得到（care received）", "The care I have received", "2025"],
  ["notice", "注意到", "通知/告示", "noticed her worries", "2025"],
  ["rule", "规则", "统治/修旧如旧", "rule of repairing the old as old", "2025"],
  ["challenge", "挑战", "难题（thing to find a way）", "The next challenge thing", "2026"],
  ["keep", "保持", "保存（colors will keep）", "colors will keep", "2026"],
  ["power", "力量/权力", "能（语境）", "British sense of power", "2019"],
  ["win", "赢", "最终成功", "clever people win at last", "2019"],
  ["hold", "握住", "容纳/举行", "enough to hold them", "2020"],
  ["tie", "系/领带", "绑住", "rope tied to their legs", "2020"],
  ["speech", "演讲", "说话能力", "give a speech in public", "2018"],
  ["light", "光/灯", "轻的/浅色的", "strong light may hurt eyes", "2026"],
  ["plant", "植物", "工厂/种植", "plants send out sounds", "2023"],
  ["race", "赛跑", "种族", "marathon race", "2022"],
  ["fine", "晴朗/好的", "细微的", "fine differences", "2023"],
  ["tell", "告诉", "分辨（tell differences）", "telling the differences", "2023"],
  ["lead", "领导", "导致（led to discussion）", "led to a discussion", "2024"],
  ["age", "年龄", "时代（through the ages）", "last through the ages", "2024"],
  ["perform", "表演", "运行/表现", "difficult to perform", "2024"],
  ["please", "请", "使高兴（pleasure）", "get pleasure from plays", "2024"],
  ["outside", "外面", "在国外/外出", "job in the big city", "2025"],
  ["after", "在…之后", "鉴于/由于", "after learning about changes", "2025"],
  ["busy", "忙碌的", "繁忙的（反义语境）", "when they are free", "2025"],
];
POLY.forEach(([w, c, e, ex, y]) =>
  items.push(item("polysemy", w, `常义：${c}；僻义：${e}`, { note: ex, year: y, tier: 3, tag: `常${c}→僻${e}` }))
);

// ── 图表阅读词汇 ──
const CHART = [
  ["survey", "调查", "2021/2023"], ["percentage", "百分比", "图表"], ["diagram", "示意图", "2021"],
  ["rank / ranking", "排名", "2023"], ["motivation", "动机", "2023"], ["venue", "场地", "2023"],
  ["household chores", "家务", "2021"], ["childcare", "育儿", "2021"], ["unpaid work", "无偿劳动", "2021"],
  ["walking / running / ping-pong", "运动项目", "2023"], ["greenways and parks", "绿道公园", "2023"],
  ["smart watches / sports apps", "智能设备", "2023"], ["reasons for exercise", "锻炼原因", "2023"],
  ["virtues", "美德", "2020"], ["ren (kindness)", "仁", "2020"], ["yi (fairness)", "义", "2020"],
  ["li (ceremony)", "礼", "2020"], ["zhi (knowledge)", "智", "2020"], ["xin (trust)", "信", "2020"],
  ["xiao", "孝", "2020"], ["Lunyu", "论语", "2020"], ["Confucius", "孔子", "2020"],
  ["repair work", "修复工作", "2026"], ["knocker-uppers", "敲窗叫醒者", "2026"],
  ["Industrial Revolution", "工业革命", "2026"], ["bedtime / wind down", "就寝放松", "2026"],
  ["two periods of sleeping", "分段睡眠", "2026"], ["Requirements aged 12-15", "年龄要求", "2026"],
  ["in total (cost)", "总计费用", "2026"], ["According to the chart", "根据图表", "通用"],
  ["The number increased/decreased", "数量增减", "通用"], ["accounts for … percent", "占百分之…", "通用"],
  ["The majority of", "大多数", "通用"], ["Compared with", "与…相比", "通用"],
  ["As we can see from the graph", "从图中可见", "通用"], ["eco-friendly", "环保的", "2019"],
  ["virtual tree", "虚拟树", "2019"], ["leaf area", "叶面积", "2019"], ["Ant Forest", "蚂蚁森林", "2019"],
  ["global warming", "全球变暖", "2019"], ["forest protection", "森林保护", "2019"],
  ["facial expression", "面部表情", "2024"], ["flight alert", "航班提醒", "2024"],
  ["sports center closed", "体育中心关闭", "2025"], ["give up one's seat", "让座", "2025"],
  ["transfer / layover", "转机经停", "2025"], ["advertisement", "广告", "2024"],
];
CHART.forEach(([e, z, y]) => items.push(item("chart", e, z, { year: y, tier: 2 })));

// ── Tier 2 单词 ──
const T2 = [
  ["passenger", "乘客", "2018"], ["pilot", "飞行员", "2018"], ["accent", "口音", "2018"],
  ["grammar", "语法", "2018"], ["suspect", "嫌疑犯", "2019"], ["medium", "中等的", "2019"],
  ["typhoon", "台风", "2019"], ["irony", "反讽", "2019"], ["vegetation", "植被", "2019"],
  ["algae", "藻类", "2019"], ["insect", "昆虫", "2019"], ["scanner", "扫描仪", "2020"],
  ["convenient", "方便的", "2020"], ["parrot", "鹦鹉", "2020"], ["couplet", "对联/诗联", "2020"],
  ["churro", "西班牙油条", "2020"], ["independent", "独立的", "2020"], ["translator", "翻译家", "2021"],
  ["breeding", "繁殖", "2021"], ["intangible", "非物质的", "2021"], ["barcode", "条形码", "2021"],
  ["plover", "千鸟", "2022"], ["scrub jay", "灌丛鸦", "2022"], ["chimpanzee", "黑猩猩", "2022"],
  ["brainstorming", "头脑风暴", "2022"], ["mulberry", "桑葚", "2022"], ["silkworm", "蚕", "2022"],
  ["pancake", "薄饼", "2023"], ["impressionist", "印象派画家", "2023"], ["pitch", "音高", "2023"],
  ["stressed", "受压的", "2023"], ["longitude", "经度", "2023"], ["projection", "投影", "2023"],
  ["whiskers", "（猫）胡须", "2024"], ["pupils", "瞳孔", "2024"], ["empathy", "共情", "2025"],
  ["heartbreak", "心碎", "2025"], ["hurdles", "跨栏", "2025"], ["archaeological", "考古的", "2025"],
  ["homestay", "民宿", "2025"], ["ecologist", "生态学家", "2025"], ["terracotta", "陶制的", "2026"],
  ["coating", "涂层", "2026"], ["elderly", "年长者", "2026"], ["rainforest", "雨林", "2026"],
  ["composer", "作曲家", "2026"], ["tuba", "大号", "2026"], ["photographer", "摄影师", "2026"],
  ["positive", "积极的", "2026"], ["patience", "耐心", "2026"], ["difficulties", "困难", "2026"],
  ["happiness", "幸福", "2026"], ["impervious", "不受影响的", "2026"], ["museum", "博物馆", "2026"],
  ["necessary", "必要的", "2025"], ["surprised", "惊讶的", "2025"], ["vacuum", "吸尘", "2025"],
  ["maintenance", "维修", "2025"], ["electronic", "电子的", "2025"], ["international", "国际的", "2025"],
  ["organised", "组织的", "2025"], ["gradually", "逐渐地", "2025"], ["apartment", "公寓", "2025"],
  ["confidence", "自信", "2018"], ["shyness", "害羞", "2018"], ["creativity", "创造力", "2019"],
  ["creativity", "创造力", "2019"], ["official", "官员", "2020"], ["virtue", "美德", "2020"],
  ["poetry", "诗歌", "2021"], ["precision", "精确", "2021"], ["disabled", "残疾的", "2022"],
  ["marathon", "马拉松", "2022"], ["platform", "平台", "2022"], ["machine", "机器", "2023"],
  ["advantage", "优势", "2023"], ["chance", "机会", "2023"], ["difference", "差异", "2023"],
  ["talent", "天赋", "2024"], ["solve", "解决", "2024"], ["agree", "同意", "2024"],
  ["enjoy", "享受", "2025"], ["offer", "提供", "2025"], ["rule", "规则", "2025"],
];
T2.forEach(([w, z, y]) => items.push(item("tier2", w, z, { year: y, tier: 2 })));

// ── Tier 3 单词 ──
const T3 = [
  ["disgust", "厌恶", "2018"], ["triggered", "触发", "2018"], ["creativity", "创造力", "2019"],
  ["polypropylene", "聚丙烯", "2023"], ["fungi", "真菌", "2023"], ["Sanjiangyuan", "三江源", "2023"],
  ["Tiangong Space Station", "天宫空间站", "2023"], ["Meteorologica", "气象学（著作）", "2024"],
  ["radiosonde", "无线电探空仪", "2024"], ["Hurricane Lee", "飓风李", "2024"],
  ["James Webb Space Telescope", "韦布望远镜", "2023"], ["Dipteryx oleifera", "巴拿马树种", "2025"],
  ["conductive", "可传导的", "2025"], ["parasitic", "寄生的", "2025"], ["impervious", "不受影响的", "2026"],
  ["knocker-uppers", "职业叫醒人", "2026"], ["understatement", "轻描淡写", "2019"],
  ["anthropomorphism", "拟人化", "2023"], ["remix", "混音改编", "2026"], ["snow leopard", "雪豹", "2026"],
  ["Café Schokolade", "维也纳巧克力咖啡馆", "2026"], ["Forest Listeners", "森林聆听者项目", "2026"],
  ["Boyi", "伯益（上古环保官）", "2022"], ["impossible foods", "植物肉公司", "2019"],
  ["personification", "拟人修辞", "2020"], ["Xu Yuanchong", "许渊冲", "2021"],
  ["Monet", "莫奈", "2023"], ["Shakespeare", "莎士比亚", "2024"], ["Aristotle", "亚里士多德", "2024"],
  ["Terracotta Warriors", "兵马俑", "2026"], ["Su Shi / Dongpo", "苏轼/东坡", "2026"],
  ["Huangzhou", "黄州", "2026"], ["Dongpo Pork", "东坡肉", "2026"], ["Saihanba", "塞罕坝", "2019"],
  ["Xu Yuanchong", "许渊冲", "2021"], ["Niu Yu", "牛钰", "2022"], ["Dashiban", "大石板村", "2025"],
];
T3.forEach(([w, z, y]) => items.push(item("tier3", w, z, { year: y, tier: 3 })));

// ── 预测补充（初中应掌握、真题未充分覆盖）──
const PRED = [
  ["artificial intelligence", "人工智能", "科技"], ["machine learning", "机器学习", "科技"],
  ["self-driving car", "自动驾驶汽车", "科技"], ["facial recognition", "人脸识别", "科技"],
  ["blockchain", "区块链", "科技"], ["livestream", "直播", "科技"], ["influencer", "网红", "科技"],
  ["cyberbullying", "网络欺凌", "社会"], ["privacy", "隐私", "社会"], ["password", "密码", "科技"],
  ["download", "下载", "科技"], ["upload", "上传", "科技"], ["Wi-Fi", "无线网络", "科技"],
  ["solar panel", "太阳能板", "环保"], ["wind power", "风能", "环保"], ["recycle", "回收", "环保"],
  ["reuse", "再利用", "环保"], ["reduce pollution", "减少污染", "环保"], ["plastic pollution", "塑料污染", "环保"],
  ["endangered species", "濒危物种", "环保"], ["wildlife protection", "野生动物保护", "环保"],
  ["deforestation", "滥伐森林", "环保"], ["drought", "干旱", "环保"], ["flood", "洪水", "环保"],
  ["earthquake", "地震", "2023新闻"], ["volunteer", "志愿者", "社会"], ["donate", "捐赠", "社会"],
  ["charity", "慈善", "社会"], ["poverty", "贫困", "社会"], ["equality", "平等", "社会"],
  ["discrimination", "歧视", "社会"], ["respect", "尊重", "社会"], ["responsibility", "责任", "社会"],
  ["cooperation", "合作", "社会"], ["competition", "竞争", "社会"], ["achievement", "成就", "学校"],
  ["scholarship", "奖学金", "学校"], ["graduation", "毕业", "学校"], ["admission", "录取", "学校"],
  ["application", "申请", "学校"], ["interview skills", "面试技巧", "学校"], ["presentation", "展示/陈述", "学校"],
  ["debate", "辩论", "学校"], ["essay", "短文", "学校"], ["paragraph", "段落", "学校"],
  ["vocabulary", "词汇", "学校"], ["pronunciation", "发音", "学校"], ["grammar rule", "语法规则", "学校"],
  ["tense", "时态", "语法"], ["passive voice", "被动语态", "语法"], ["relative clause", "定语从句", "语法"],
  ["object clause", "宾语从句", "语法"], ["adverbial clause", "状语从句", "语法"], ["article a/an/the", "冠词", "语法"],
  ["reflexive pronoun", "反身代词", "语法"], ["indefinite pronoun", "不定代词", "语法"],
  ["gerund", "动名词", "语法"], ["infinitive", "不定式", "语法"], ["participle", "分词", "语法"],
  ["anxiety", "焦虑", "心理"], ["depression", "抑郁", "心理"], ["stress", "压力", "心理"],
  ["relaxation", "放松", "心理"], ["meditation", "冥想", "心理"], ["therapy", "治疗", "心理"],
  ["nutrition", "营养", "健康"], ["balanced diet", "均衡饮食", "健康"], ["obesity", "肥胖", "健康"],
  ["insomnia", "失眠", "健康"], ["vaccine", "疫苗", "健康"], ["epidemic", "流行病", "健康"],
  ["pandemic", "大流行", "健康"], ["symptom", "症状", "健康"], ["treatment", "治疗", "健康"],
  ["surgery", "手术", "健康"], ["appointment", "预约", "健康"], ["pharmacy", "药店", "健康"],
  ["tradition", "传统", "文化"], ["custom", "习俗", "文化"], ["festival", "节日", "文化"],
  ["lantern", "灯笼", "文化"], ["dragon", "龙", "文化"], ["calligraphy", "书法", "文化"],
  ["paper-cutting", "剪纸", "文化"], ["martial arts", "武术", "文化"], ["opera", "歌剧/戏曲", "文化"],
  ["museum guide", "博物馆讲解员", "文化"], ["heritage site", "遗产地", "文化"],
  ["high-speed rail", "高铁", "交通"], ["subway", "地铁", "交通"], ["traffic jam", "堵车", "交通"],
  ["parking lot", "停车场", "交通"], ["helmet", "头盔", "交通"], ["seat belt", "安全带", "交通"],
  ["pedestrian", "行人", "交通"], ["crosswalk", "人行横道", "交通"], ["traffic light", "红绿灯", "交通"],
  ["economy", "经济", "社会"], ["industry", "工业", "社会"], ["agriculture", "农业", "社会"],
  ["immigrant", "移民", "社会"], ["refugee", "难民", "社会"], ["citizen", "公民", "社会"],
  ["democracy", "民主", "社会"], ["government", "政府", "社会"], ["policy", "政策", "社会"],
  ["law", "法律", "社会"], ["court", "法庭", "社会"], ["judge", "法官", "社会"],
  ["article", "冠词/文章", "熟词僻义"], ["coach", "教练/长途车", "熟词僻义"], ["coach", "教练", "熟词僻义"],
  ["coach", "长途汽车", "熟词僻义"], ["ticket", "票/罚单", "熟词僻义"], ["fine", "罚款", "熟词僻义"],
  ["spring", "春天/弹簧", "熟词僻义"], ["mine", "我的/矿井", "熟词僻义"], ["watch", "手表/观看", "熟词僻义"],
  ["second", "第二/秒", "熟词僻义"], ["letter", "信/字母", "熟词僻义"], ["right", "正确/右边/权利", "熟词僻义"],
  ["left", "离开/左边", "熟词僻义"], ["hard", "困难的/努力地", "熟词僻义"], ["close", "关闭/近的", "熟词僻义"],
  ["date", "日期/约会", "熟词僻义"], ["match", "比赛/匹配", "熟词僻义"], ["fair", "公平的/集市", "熟词僻义"],
  ["bill", "账单/法案", "熟词僻义"], ["capital", "首都/大写/资本", "熟词僻义"], ["state", "状态/州/陈述", "熟词僻义"],
  ["patient", "耐心的/病人", "熟词僻义"], ["content", "内容/满足的", "熟词僻义"], ["object", "物体/反对/宾语", "熟词僻义"],
  ["subject", "科目/主题/使服从", "熟词僻义"], ["produce", "生产/农产品", "熟词僻义"], ["change", "改变/零钱", "熟词僻义"],
  ["customs", "海关/习俗", "熟词僻义"], ["degree", "程度/度数/学位", "熟词僻义"], ["appreciate", "欣赏/感激", "熟词僻义"],
  ["attend", "参加/照料", "熟词僻义"], ["appear", "出现/似乎", "熟词僻义"], ["mean", "意思是/吝啬的", "熟词僻义"],
];
PRED.forEach(([e, z, t]) => items.push(item("predict", e, z, { tag: t, tier: 2 })));

// 去重（按 en+cat）
const seen = new Set();
const bare = [];
for (const it of items) {
  const k = `${it.cat}|${it.en.toLowerCase()}`;
  if (seen.has(k)) continue;
  seen.add(k);
  bare.push(it);
}

const tierExamScript = path.join(path.dirname(fileURLToPath(import.meta.url)), "extract-tier-exam-sentences.mjs");
spawnSync(process.execPath, [tierExamScript], { stdio: "inherit" });

const unique = enrichAll(bare);
unique.forEach((it, i) => {
  it.id = i + 1;
});

const stats = {};
unique.forEach((it) => {
  stats[it.cat] = (stats[it.cat] || 0) + 1;
});

fs.mkdirSync(DATA, { recursive: true });
fs.writeFileSync(path.join(DATA, "chengdu-exam-vocab-master.json"), JSON.stringify({ meta: { total: unique.length, stats }, items: unique }, null, 0), "utf8");

const js = `/**
 * L15 · 词性转换与词汇 · 主语料库 v2
 * 自动生成：node Grammar/scripts/build-l15-master-corpus.mjs
 * 合计 ${unique.length} 条（目标 ≥500）
 */
(function (global) {
  "use strict";
  var VERSION = "3.0";
  var MASTER = ${JSON.stringify(unique, null, 2)};

  var CAT_LABEL = {
    "word-form": "词性转换",
    "verb-phrase": "动词词组",
    "adj-noun-phrase": "形容词/名词词组",
    "collocation": "固定搭配",
    "idiom": "习语/谚语/俚语",
    "polysemy": "熟词僻义",
    "chart": "图表阅读",
    "tier2": "Tier 2 词汇",
    "tier3": "Tier 3 词汇",
    "predict": "预测补充"
  };

  var STATS = ${JSON.stringify(stats, null, 2)};

  function byCat(cat) { return MASTER.filter(function (x) { return x.cat === cat; }); }
  function byTier(t) { return MASTER.filter(function (x) { return x.tier === t; }); }
  function byYear(y) { return MASTER.filter(function (x) { return String(x.year).indexOf(String(y)) >= 0; }); }
  function examOnly() { return MASTER.filter(function (x) { return x.cat !== "predict" && String(x.year).match(/20(1[89]|2[0-6])/); }); }

  // 兼容旧 API（page01 第 5 屏用 base / hint / form）
  function wfHint(x, base, form) {
    if (/ly$/i.test(form)) return "副词 · -ly · " + (x.year || "");
    if (/tion|sion|ment|ness|ity|th$/i.test(form)) return "名词派生 · " + (x.year || "");
    if (/^(their|them|us|our|we|they|children|men|women|feet|teeth|mice)$/i.test(form))
      return "代词/复数 · " + (x.year || "");
    if (/^(less|more|better|worse|well)$/i.test(form)) return "比较级/特殊 · " + (x.year || "");
    return (x.zh || "") + (x.year ? " · " + x.year : "");
  }
  var WORD_FORM_RULES = byCat("word-form").slice(0, 12).map(function (x) {
    var p = x.en.split(" → ");
    var base = x.base || p[0] || x.en;
    var form = x.form || p[1] || "";
    var hint = wfHint(x, base, form);
    return {
      base: base,
      form: form,
      hint: hint,
      suffix: form,
      example: base,
      result: form,
      tip: x.zh,
      year: x.year || "",
    };
  });

  var P01_SENTENCE_ADVERBS = ${JSON.stringify(
    JSON.parse(
      fs.readFileSync(path.join(L15, "data/p01-sentence-adverbs.json"), "utf8")
    ),
    null,
    4
  ).replace(/\n/g, "\n  ")};
  var SUFFIX_LY = byCat("word-form").filter(function (x) { return (x.form || "").indexOf("ly") >= 0; }).map(function (x) {
    return { base: x.base || x.en.split(" → ")[0], form: x.form || x.en.split(" → ")[1], year: x.year };
  });
  var SUFFIX_NOUN = byCat("word-form").filter(function (x) {
    var f = x.form || "";
    return /tion|ness|th|ment|ity|ence/.test(f);
  }).map(function (x) {
    return { base: x.base || x.en.split(" → ")[0], form: x.form || x.en.split(" → ")[1], year: x.year };
  });
  var IRREGULAR = byCat("word-form").filter(function (x) { return x.note || /不规则|比较|代词/.test(x.year); }).map(function (x) {
    return { base: x.base || x.en, form: x.form || "", note: x.zh };
  });
  var WORD_BANKS = ${JSON.stringify(
    Object.fromEntries(
      [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y) => [
        String(y),
        unique.filter((i) => i.cat === "word-form" && String(i.year).includes(String(y))).map((i) => i.base).filter(Boolean),
      ])
    ),
    null,
    2
  )};
  // restore full word banks from known data
  WORD_BANKS = {"2018":["but","choice","color","direct","fly","high","important","instead","it","many","quick","slow"],"2019":["bad","British","consider","fun","hope","pleasure","power","they","total","understand","we","win"],"2020":["able","catch","difficult","hold","learn","little","possible","speech","success","tie","true","we"],"2021":["argue","beautiful","care","far","for","good","heat","include","special","succeed","under","work"],"2022":["clear","complete","excite","follow","health","interview","luck","shine","silence","ten","touch","well"],"2023":["actual","advantage","chance","child","difficult","difference","few","hear","many","possible","silence","tell"],"2024":["age","agree","decide","follow","lead","mean","perform","please","solve","talent","they","wide"],"2025":["after","busy","choose","direct","enjoy","expect","notice","offer","outside","rule","run","they"],"2026":["die","be","sudden","discover","little","they","keep","sad","touch","challenge"]};

  function mapPhrase(cat) {
    return byCat(cat).map(function (p) {
      return { en: p.en, zh: p.zh, tag: (p.year || "") + (p.tag ? " · " + p.tag : "") };
    });
  }
  var VERB_PHRASES = mapPhrase("verb-phrase");
  var ADJ_NOUN_PHRASES = mapPhrase("adj-noun-phrase");
  var IDIOMS = mapPhrase("idiom");
  var SLANG = byCat("idiom").filter(function (x) { return /snail|Internet-famous|old-fashioned|hit on/.test(x.en); }).map(function (p) { return { en: p.en, zh: p.zh }; });
  var CHART_VOCAB = mapPhrase("chart").map(function (p) { return { en: p.en, zh: p.zh, tag: p.tag }; });
  var CHART_PHRASES = [
    { en: "According to the chart, …", zh: "根据图表，……" },
    { en: "The number of … increased/decreased.", zh: "……的数量增/减。" },
    { en: "… accounts for … percent of …", zh: "……占……的百分之……" },
    { en: "The majority of …", zh: "大多数……" },
    { en: "Compared with …, … is higher/lower.", zh: "与……相比，……更高/更低。" },
    { en: "As we can see from the graph, …", zh: "从图中可见，……" }
  ];
  var GAP_VOCAB = byCat("polysemy").concat(byCat("tier3").filter(function (x) { return String(x.year).match(/20/); })).map(function (p) {
    return { en: p.en, zh: p.zh, tag: p.note || p.year };
  });
  var PREDICT_VOCAB = byCat("predict").map(function (p) { return { en: p.en, zh: p.zh }; });
  var TIER2_LIST = byCat("tier2");
  var TIER3_LIST = byCat("tier3");
  var POLYSEMY_LIST = byCat("polysemy");

  var FINAL_QUIZ = [
    { stem: "quick → (修饰 ran)", ans: "quickly", opts: ["quickly","quick","quicker","quickest"] },
    { stem: "die → (名词)", ans: "death", opts: ["death","die","dead","dying"] },
    { stem: "they → (形容词性 + 名词)", ans: "their", opts: ["their","them","they","theirs"] },
    { stem: "little → (比较级)", ans: "less", opts: ["less","little","few","fewer"] },
    { stem: "discover → (名词)", ans: "discovery", opts: ["discovery","discover","discovered","discovering"] },
    { stem: "Go bird-watching, ___ you will enjoy it.", ans: "and", opts: ["and","but","or","so"] },
    { stem: "make ___ the colors will stay.", ans: "sure", opts: ["sure","surely","sureness","suring"] },
    { stem: "child → (复数)", ans: "children", opts: ["children","childs","childes","child"] },
    { stem: "good (adj) → (副词)", ans: "well", opts: ["well","good","better","best"] },
    { stem: "bank 在阅读中可指", ans: "河岸", opts: ["河岸","银行","板凳","排名"] }
  ];

  function getPageQuiz(id) {
    if (id === "p01") return [{ stem: "Suddenly 属于什么词性？", ans: "副词", opts: ["副词","形容词","名词","动词"] }];
    return FINAL_QUIZ;
  }

  global.L15Corpus = {
    VERSION: VERSION,
    MASTER: MASTER,
    STATS: STATS,
    CAT_LABEL: CAT_LABEL,
    TOTAL: MASTER.length,
    byCat: byCat,
    byTier: byTier,
    byYear: byYear,
    examOnly: examOnly,
    WORD_FORM_RULES: WORD_FORM_RULES,
    P01_SENTENCE_ADVERBS: P01_SENTENCE_ADVERBS,
    SUFFIX_LY: SUFFIX_LY,
    SUFFIX_NOUN: SUFFIX_NOUN,
    IRREGULAR: IRREGULAR,
    WORD_BANKS: WORD_BANKS,
    VERB_PHRASES: VERB_PHRASES,
    ADJ_NOUN_PHRASES: ADJ_NOUN_PHRASES,
    IDIOMS: IDIOMS,
    SLANG: SLANG,
    CHART_VOCAB: CHART_VOCAB,
    CHART_PHRASES: CHART_PHRASES,
    GAP_VOCAB: GAP_VOCAB,
    PREDICT_VOCAB: PREDICT_VOCAB,
    TIER2_LIST: TIER2_LIST,
    TIER3_LIST: TIER3_LIST,
    POLYSEMY_LIST: POLYSEMY_LIST,
    FINAL_QUIZ: FINAL_QUIZ,
    getPageQuiz: getPageQuiz
  };
})(typeof window !== "undefined" ? window : globalThis);
`;

fs.writeFileSync(path.join(L15, "l15-corpus-pool.js"), js, "utf8");
console.log("TOTAL:", unique.length);
console.log("STATS:", stats);

const taxScript = path.join(path.dirname(fileURLToPath(import.meta.url)), "build-word-form-taxonomy.mjs");
spawnSync(process.execPath, [taxScript], { stdio: "inherit" });
