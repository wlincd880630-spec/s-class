import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const JSON_PATH = path.join(ROOT, "Grammar/L15/data/word-form-taxonomy-2018-2026.json");
const OUT = path.join(ROOT, "Grammar/scripts/word-form-blank-prompts-manual.mjs");

const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

/** 仅处理第 1–4 问：去掉词库词名与语义泄答，保留结构引导 */
function sanitizeEarlyQuestion(q, step) {
  let s = q;

  // ── 形容词派生 Q3 统一（用户示例）──
  s = s.replace(
    /确定是形容词后，需从词库找与「[^」]+」相关的词，并派生出能修饰 ([^的]+) 的形式/g,
    "确定是形容词后，需从词库找能修饰 $1 的词，并派生出相应的形式"
  );

  // ── Q4：去掉「词库 xxx 表示…」式泄答 ──
  s = s.replace(/词库 \w+ 表示[^；]+；要表达「[^」]+」，常加[^；]+；/g, "派生时应考虑哪类后缀与拼写规则；");
  s = s.replace(/词库 \w+ 表示[^；]+；/g, "");
  s = s.replace(/词库 \w+ 是原级；要表达「[^」]+」，/g, "词库中若为原级，要表达比较意义时，");
  s = s.replace(/词库 \w+ 是原级；要表达比较意义，/g, "词库中若为原级，要表达比较意义时，");

  // ── 词库 + 任意词名 → 泛化（第 1–4 问统一）──
  s = s.replace(/词库 [a-zA-Z]+/g, "词库中该词");
  s = s.replace(/词库中符合条件的词/g, "词库中该词");

  // ── 动词/名词等具体词名在句中单独出现（变形说明行）──
  s = s.replace(/\b(color|choice|fly|high|slow|but|direct|instead|important|power|hope|pleasure|total|understand|tie|true|hold|speech|possible|able|learn|success|far|include|special|succeed|work|beautiful|heat|argue|good|silence|clear|luck|touch|health|complete|ten|follow|well|shine|child|actual|hear|many|tell|difference|chance|advantage|difficult|wide|lead|talent|please|agree|perform|mean|age|busy|rule|offer|run|expect|outside|after|choose|die|discover|sad|keep|challenge|British|bad|fun|win|under|run|expect) → \w+/gi, "词库词 → 目标形式");
  s = s.replace(/\b(color|choice|fly|high|slow|but|direct|instead|important|power|hope|pleasure|total|understand|tie|true|hold|speech|possible|able|learn|success|far|include|special|succeed|work|beautiful|heat|argue|good|silence|clear|luck|touch|health|complete|ten|follow|well|shine|child|actual|hear|many|tell|difference|chance|advantage|difficult|wide|lead|talent|please|agree|perform|mean|age|busy|rule|offer|run|expect|outside|after|choose|die|discover|sad|keep|challenge|British|bad|fun|win|under) (变|加|的)/gi, "词库中该词 $2");

  // ── 具体语义提示 ──
  s = s.replace(/第二个空可能是「选到 \/ 买到」等动作，总之是动词/g, "第二个空应是与 went 并列的谓语动词");
  s = s.replace(/词库里哪个词表示「放（风筝）」/g, "词库中哪个动词可接 the kite 作宾语");
  s = s.replace(/确定用 -ing 形式后，词库中哪个符合词性与结构的词可接 the kite 作宾语/g, "确定用 -ing 形式后，词库中哪个动词可接 the kite 作宾语");
  s = s.replace(/要说明风筝「具有什么外观特征」/g, "要修饰 kites，应填什么词性");
  s = s.replace(/语义上「有权势的」人物常引人发笑/g, "与 important 并列修饰 people，应填什么词性");
  s = s.replace(/别人可能感到「绝望、无望」——/g, "feel 后需形容词表感受——");
  s = s.replace(/反讽地说经历「不太愉快」——/g, "Not very 后需形容词——");
  s = s.replace(/修饰形容词 wrong 应用副词「完全地、彻底地」——/g, "修饰形容词 wrong 应用副词——");
  s = s.replace(/表「有一种可能性」——/g, "a 后接可数名词，表可能性——");
  s = s.replace(/指「儿童的故事」——/g, "stories 前需所有格——");
  s = s.replace(/与「会尖叫」相对，植物并非总是「沉默的」——/g, "与后文 shout 相对，植物并非总是——");
  s = s.replace(/修饰整句\/谓语，表「实际上」——/g, "修饰整句/谓语，应填副词——");
  s = s.replace(/for people 后接不定式表「（人）去听」——/g, "for people 后接不定式——");
  s = s.replace(/machine 后接不定式表目的「来区分」——/g, "machine 后接不定式表目的——");
  s = s.replace(/修饰动词 shout，表「不同地」——/g, "修饰动词 shout，应填副词——");
  s = s.replace(/修饰 writers 表「有才华的」——/g, "修饰 writers，应填形容词——");
  s = s.replace(/please 是动词，此处要名词「乐趣、愉悦」——/g, "动词需转为名词——");
  s = s.replace(/与前文赞成更新相对，表「不同意」——/g, "与前文观点相对，动词需——");
  s = s.replace(/it 作形式主语，___ 处需名词「意义、含义」——/g, "it 作形式主语，___ 处需名词——");
  s = s.replace(/描述村庄「繁忙的」——/g, "描述 place，应填形容词——");
  s = s.replace(/表「原则、规矩」——/g, "the 后接名词——");
  s = s.replace(/词库中符合条件的词表「经营」，/g, "词库中动词作谓语，");
  s = s.replace(/叙述过去「从未料到」——/g, "叙述过去——");
  s = s.replace(/working 后接副词，表「在外地」——/g, "working 后接副词——");
  s = s.replace(/表时间「在了解到变化之后」——/g, "表时间关系——");
  s = s.replace(/秦始皇希望兵马俑在他「去世」后守护——/g, "after his 后接名词——");
  s = s.replace(/指兵马俑「被发现」这件事——/g, "their 后接名词——");
  s = s.replace(/词库中符合条件的词的比较级表「更短的时间」——/g, "比较级表达时间更少——");
  s = s.replace(/指兵马俑「它们的」真色——/g, "true colors 前需物主代词——");
  s = s.replace(/需副词表「令人遗憾地\/可惜地」——/g, "需副词评注该事实——");
  s = s.replace(/instead 在此处是副词，能否表达「反而支撑我们」/g, "该副词能否修饰 support 并表转折");
  s = s.replace(/important 是形容词，此处需要其名词形式/g, "形容词需派生为何种名词形式");
  s = s.replace(/important 变名词常加 -ance——词形是什么？/g, "形容词变名词常加哪类后缀——词形是什么？");
  s = s.replace(/语义上缺「方向」；/g, "right 已作定语，空格需名词；");
  s = s.replace(/direct 如何名词化为「方向」/g, "形容词如何名词化");
  s = s.replace(/support us 后需要副词，表「相反地、却」/g, "support us 后需要副词，表转折/相反");
  s = s.replace(/词库中符合条件的词 是否就是此固定结构的连接词/g, "词库中连词能否填入此固定结构");
  s = s.replace(/词库中符合条件的词 本身是形容词还是副词/g, "该词在词库中是什么词性");
  s = s.replace(/与 waited for quite some time 呼应，应表「缓慢地」落下/g, "与 waited for quite some time 呼应，应表何种方式落下");
  s = s.replace(/应填「更高」还是「更低」/g, "结合语境判断比较级方向");
  s = s.replace(/start \+ doing 结构下，fly 应如何变形/g, "start + doing 结构下，动词应如何变形");
  s = s.replace(/词库中符合条件的词 加否定前缀 dis-/g, "加否定前缀 dis-");
  s = s.replace(/词库中符合条件的词 的过去分词是/g, "过去分词形式是");
  s = s.replace(/词库中符合条件的词 的过去式是/g, "过去式形式是");
  s = s.replace(/词库中符合条件的词 的反身形式/g, "反身代词形式");
  s = s.replace(/词库中符合条件的词 的宾格/g, "宾格形式");
  s = s.replace(/词库中符合条件的词 的形容词性物主代词/g, "形容词性物主代词形式");
  s = s.replace(/词库中符合条件的词 的比较级是/g, "比较级形式是");
  s = s.replace(/词库中符合条件的词 变复数是/g, "复数形式是");
  s = s.replace(/词库中符合条件的词 的最高级是/g, "最高级形式是");
  s = s.replace(/词库中符合条件的词 已是名词/g, "词库中该词已是名词");
  s = s.replace(/词库中符合条件的词 已是形容词/g, "词库中该词已是形容词");
  s = s.replace(/词库中符合条件的词 可作副词「在外」/g, "词库中该词可作副词");
  s = s.replace(/词库中符合条件的词 作介词/g, "词库中该词作介词");
  s = s.replace(/词库中符合条件的词 表示「在……指导下」/g, "词库中该词作介词");
  s = s.replace(/词库中符合条件的词 作「选择」/g, "谓语动词形式");
  s = s.replace(/词库中符合条件的词 表示「发光、出彩」/g, "动词表达何种意义");
  s = s.replace(/词库中符合条件的词 作动词「完成」/g, "谓语动词");
  s = s.replace(/词库中符合条件的词 作动词「关注」/g, "名词化");
  s = s.replace(/词库中符合条件的词 在此作「获胜」/g, "与 doing 并列");
  s = s.replace(/词库中符合条件的词 需变名词「发现」/g, "动词变名词");
  s = s.replace(/词库中符合条件的词 需变名词/g, "动词/形容词变名词");
  s = s.replace(/词库中符合条件的词 是形容词，此处需什么词性/g, "词库中该词是形容词，此处需什么词性");
  s = s.replace(/词库中符合条件的词 是名词，/g, "词库中该词是名词，");
  s = s.replace(/词库中符合条件的词 是形容词，/g, "词库中该词是形容词，");
  s = s.replace(/词库中符合条件的词 是动词，/g, "词库中该词是动词，");
  s = s.replace(/词库中符合条件的词 如何派生/g, "如何派生");
  s = s.replace(/词库中符合条件的词 如何变/g, "如何变形");
  s = s.replace(/词库中符合条件的词 如何/g, "如何");
  s = s.replace(/词库中符合条件的词 要变为/g, "要变为");
  s = s.replace(/词库中符合条件的词 要变/g, "要变");
  s = s.replace(/词库中符合条件的词 变/g, "变");
  s = s.replace(/词库中符合条件的词 前加 to/g, "前加 to");
  s = s.replace(/词库中符合条件的词 前需加 to/g, "前需加 to");
  s = s.replace(/词库中符合条件的词 的过去式\/过去分词形式是/g, "过去式/过去分词形式是");
  s = s.replace(/要修饰 kites，应填什么词性，应填什么词性？/g, "要修饰 kites，应填什么词性？");
  s = s.replace(/毕业后再去巴黎，应是「进一步深造」——/g, "for ___ study 需何种等级——");
  s = s.replace(/列举 included works，常用 including 引导——/g, "逗号后列举作品——");
  s = s.replace(/要表达「特别的、专门的」焦点——/g, "修饰 focus——");
  s = s.replace(/修饰 translated 表「成功地」——/g, "修饰 translated——");
  s = s.replace(/debates 表「争论」，需「激烈的」——/g, "修饰 debates——");
  s = s.replace(/词库中该词 在此作「获胜」，/g, "词库中该词与 doing 并列，");
  s = s.replace(/词库中该词 表示「拴住、束缚」/g, "");
  s = s.replace(/词库中该词 表示「在……指导下」/g, "词库中该词作介词");
  s = s.replace(/词库中该词 表示「发光、出彩」/g, "");
  s = s.replace(/词库中该词 作动词「关注」，此处需名词复数「关注者」/g, "词库中该词需名词复数");
  s = s.replace(/词库中该词 作动词「完成」/g, "词库中该词作谓语");
  s = s.replace(/词库中该词 作「选择」/g, "词库中该词作谓语");
  s = s.replace(/词库中该词 表「经营」/g, "词库中该词作谓语");
  s = s.replace(/词库中该词 表「保持、留存」/g, "词库中该词作谓语");
  s = s.replace(/词库中该词 需变名词「发现」/g, "词库中该词需变名词");
  s = s.replace(/词库中该词 的比较级表「更短的时间」/g, "词库中该词的比较级");
  s = s.replace(/词库中该词 可作副词「在外」/g, "词库中该词可作副词");
  s = s.replace(/词库中该词 作「时代」可数/g, "词库中该词作可数名词");
  s = s.replace(/enough 后动词需什么形式？词库中符合条件的词 表示「拴住、束缚」/g, "enough 后动词需什么形式");
  s = s.replace(/要表达「几乎没有勇气」——词库 little/g, "修饰 courage——词库");
  s = s.replace(/听闻真相后男子「惊得说不出话」——词库 speech/g, "was 后需形容词——词库");
  s = s.replace(/possible 语义需取反「不可能的」/g, "语义需取反时");
  s = s.replace(/able 是形容词，此处需名词「能力」，且可能涉及复数/g, "形容词需派生为名词（注意数）");
  s = s.replace(/can never 后动词用原形；词库 success 是名词，需找同源动词/g, "can never 后动词用原形；名词需找同源动词");
  s = s.replace(/can never 后动词用原形；词库中该词是名词，需找同源动词/g, "can never 后动词用原形；名词需找同源动词");
  s = s.replace(/前句观众欢呼，轮到 Niu 时突然安静——需「沉默的」；/g, "became 后表状态变化——");
  s = s.replace(/修饰动词 heard，表「清晰地」——/g, "修饰动词 heard——");
  s = s.replace(/句首评注整件事，表「不幸地」——/g, "句首评注——");
  s = s.replace(/词库 luck 是名词，需变副词且语义取反「不幸」/g, "名词需变副词且语义取反");
  s = s.replace(/词库中符合条件的词 需变副词且语义取反「不幸」/g, "名词需变副词且语义取反");
  s = s.replace(/传统观点指「健全的双腿」——/g, "修饰 legs——");
  s = s.replace(/序数词修饰 anniversary，表「第十个」——/g, "修饰 anniversary 需序数词——");
  s = s.replace(/数量后接名词，指社交平台上的「粉丝」——/g, "数量后接名词复数——");
  s = s.replace(/修饰动词 understand，表「更好地」——/g, "修饰动词 understand——");
  s = s.replace(/修饰过去分词 regarded，表「被广泛地」——/g, "修饰过去分词 regarded——");
  s = s.replace(/修饰 benefited，表「直接地」——/g, "修饰 benefited——");
  s = s.replace(/difficult to follow 结构——词库 follow 前加 to/g, "difficult 后需不定式——");
  s = s.replace(/difficult to follow 结构——词库中符合条件的词 前加 to/g, "difficult 后需不定式——");
  s = s.replace(/表「下一个难题、挑战」——/g, "the next 与 thing 之间——");
  s = s.replace(/词库 sudden 是形容词/g, "词库中该词是形容词");
  s = s.replace(/sadly 是否传达/g, "该副词能否传达");
  s = s.replace(/词库中符合条件的词表「保持、留存」/g, "动词表保持、留存");
  s = s.replace(/词库中符合条件的词 表「保持、留存」/g, "动词表保持、留存");

  s = s.replace(/词库中该词 本身是/g, "该词在词库中本身是");
  s = s.replace(/词库中该词 是/g, "该词在词库中词性是");
  s = s.replace(/词库中该词 变/g, "词库中该词变");
  s = s.replace(/词库中该词 的/g, "词库中该词的");
  s = s.replace(/词库中该词 需/g, "词库中该词需");
  s = s.replace(/词库中该词 如何/g, "词库中该词如何");
  s = s.replace(/词库中该词 作/g, "词库中该词作");
  s = s.replace(/词库中该词 前/g, "词库中该词前");
  s = s.replace(/词库中该词 与/g, "词库中该词与");
  s = s.replace(/词库中该词 已/g, "词库中该词已");
  s = s.replace(/词库中该词 可/g, "词库中该词可");
  s = s.replace(/词库中该词 表/g, "词库中该词表");
  s = s.replace(/词库中该词 此/g, "词库中该词此");
  s = s.replace(/词库中该词 是否/g, "词库中该词是否");
  s = s.replace(/\bit \/ its \/ itself\b/g, "it / its / 反身代词形式");
  s = s.replace(/the ___ of these things 是否为「……的重要性」/g, "the ___ of these things 这一结构是否完整");
  s = s.replace(/语义上「被糟糕地对待」/g, "");
  s = s.replace(/\bwinning at last\b/g, "___ at last");
  s = s.replace(/\bhope \+ -less\b/g, "否定后缀 -less");
  s = s.replace(/\bpleasant 表示[^？]+/g, "派生形容词能否与 terrible experience 形成反讽");
  s = s.replace(/\bgone totally wrong\b/g, "go + 副词 + 形容词结构");
  s = s.replace(/\btrue 是形容词/g, "词库中该词是形容词");
  s = s.replace(/\benough to hold them\b/g, "enough to do 结构是否通顺");
  s = s.replace(/要表达「几乎没有勇气」——/g, "修饰 courage——");
  s = s.replace(/听闻真相后男子「惊得说不出话」——/g, "was 后需形容词表状态——");
  s = s.replace(/im- \+ possible 拼写是/g, "否定前缀与词根拼写是");
  s = s.replace(/\bable → ability，复数形式是/g, "名词化后复数形式是");
  s = s.replace(/\blearn → learning 是否符合「学习过程」之义/g, "动名词形式是否符合句意");
  s = s.replace(/\bsuccess → succeed，填入/g, "名词转动词后，填入");
  s = s.replace(/powerful 与 important 并列/g, "派生形容词与 important 并列");
  s = s.replace(/heat → heated（-ed）是否表「激烈的」/g, "派生形容词能否修饰 debates");
  s = s.replace(/silence → silent 如何派生形容词/g, "名词如何派生形容词");
  s = s.replace(/health → healthy（-y）是否表「健康的」/g, "名词派生 -y 形容词是否通顺");
  s = s.replace(/direct 如何名词化/g, "形容词如何名词化");
  s = s.replace(/词库中该词 变名词常加 -ance/g, "形容词变名词常加哪类后缀");
  s = s.replace(/词库中该词 变副词规则是什么/g, "形容词变副词规则是什么");
  s = s.replace(/词库中该词 变比较级需双写 n 再加 -ier/g, "原级变比较级规则是什么");
  s = s.replace(/词库中该词 在此作「获胜」，与 doing 并列/g, "词库中该词与 doing 并列");
  s = s.replace(/词库哪个词/g, "词库中哪个符合词性与结构的词");
  s = s.replace(/该词在词库中词性是否就是此固定结构的连接词/g, "词库中连词能否填入此固定结构");
  s = s.replace(/形容词 词库中该词变国名名词/g, "形容词变国名名词");
  s = s.replace(/词库中该词变名词常加 -ance/g, "形容词变名词常加哪类后缀");
  s = s.replace(/词库中该词 要/g, "词库中该词要");
  s = s.replace(/——+/g, "——");
  s = s.replace(/；；+/g, "；");
  s = s.trim();

  return s;
}

const MANUAL = {};

for (const [year, yd] of Object.entries(data.byYear)) {
  for (const b of yd.blanks) {
    const key = `${year}:${b.n}`;
    MANUAL[key] = b.prompts.map((p, i) => {
      if (i < 4 && typeof p === "string") return sanitizeEarlyQuestion(p, i);
      return p;
    });
  }
}

function serializeEntry(key, arr) {
  const lines = arr.map((item) => {
    if (typeof item === "string") return `    ${JSON.stringify(item)},`;
    return `    {\n      text:\n        ${JSON.stringify(item.text)},\n    },`;
  });
  return `  ${JSON.stringify(key)}: [\n${lines.join("\n")}\n  ],`;
}

const header = `/**
 * 2018–2026 每空精修引导问（五步思维链：读句→词性→考查点→分项确认→综合+[[点击显示]]）
 * 第 1–4 问：只讲结构/词性/变形方向，不泄露词库词与词义；第 5 问点击显示答案线索
 */

/** @type {Record<string, (string|{text:string,reveals?:object[]})[]>} */
export const MANUAL = {
`;
const footer = `};

export default MANUAL;
`;

fs.writeFileSync(
  OUT,
  header + Object.entries(MANUAL).map(([k, v]) => serializeEntry(k, v)).join("\n") + "\n" + footer,
  "utf8"
);
console.log("rebuilt", Object.keys(MANUAL).length, "from taxonomy + sanitize v2");
