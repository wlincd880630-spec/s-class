/**
 * L15 · B 卷词形填空 · 苏格拉底式引导提问（按变形类型）
 */
(function (global) {
  "use strict";

  var CAT_HINTS = {
    "adv-ly": [
      "空格修饰的是动词、形容词，还是评注整句？→ 多半要副词。",
      "词库里的形容词能否加 -ly？注意 y→i+ly、句首大写+逗号。",
    ],
    "adv-derive": [
      "需要副词，但可能不止加 -ly（如 un- + -ly）。",
      "先看句子缺「方式 / 程度」还是「评注」。",
    ],
    "adv-fixed": ["此处副词可能保持原形，不必变形。", "检查是否为固定搭配或从句中的连接副词。"],
    "adv-comp": ["是否在与另一事物比较？→ 比较级。", "well / many / little 等有不规则比较级。"],
    "noun-derive": [
      "此处需要名词（主语 / 宾语 / 介词后）吗？",
      "从词库原形出发：加 -tion / -sion / -ment / -ness / -ity / -th / -y 中的哪一种？",
    ],
    "noun-plural": ["可数名词是否应变复数？注意 -y→-ies、不规则复数。", "看前面数词或谓语动词单复数。"],
    "noun-poss": ["是否表示「……的」所有关系？", "不规则复数 + 's 所有格。"],
    "noun-proper": ["专有名词 / 国名 / 地名：首字母大写。", "形容词变国名类题目注意拼写。"],
    "noun-gerund": ["动名词可作主语 / 宾语：动词 + -ing。", "前面常是 enjoy / finish / practice 等。"],
    "noun-fixed": ["名词可能保持原形。", "看词性位置是否已能容纳名词原形。"],
    "verb-past": ["时态是过去时吗？动词需过去式 / 过去分词。", "不规则动词需单独记忆。"],
    "verb-passive": ["主语承受动作？→ 被动语态 be + 过去分词。", "注意时态与主语一致。"],
    "verb-perfect": ["是否用完成时 have / has + 过去分词？", "看时间状语与上下文。"],
    "verb-ing": ["后接 -ing：start / enjoy / including / 介词后等。", "判断是动名词还是现在分词。"],
    "verb-inf": ["是否 need / want / enough / make it + adj + to do 结构？", "不定式 to do / not to do。"],
    "verb-base": ["情态动词 / 使役 / 祈使后接动词原形。", "will / can / let / make 等后看原形。"],
    "verb-prefix": ["是否需加否定前缀 dis- / un- 等？", "填后意思是否与上下文逻辑一致？"],
    "pron-reflex": ["动作回到主语自身？→ 反身代词。", "they→themselves；we→ourselves；it→itself。"],
    "pron-poss-adj": ["后接名词？→ 形容词性物主代词 their / its。", "不能填 they / them。"],
    "pron-obj": ["作动词 / 介词宾语？→ 宾格 them / us。", "区别于主格与物主代词。"],
    "adj-derive": [
      "修饰名词或作表语？→ 形容词。", "名词 + -ful/-less/-y/-ed/-ous 或动词 + -ed/-ing。",
    ],
    "adj-comp": ["than / more / 比较语境？→ 比较级。", "双音节以上常 more + 原级或词尾 -er。"],
    "adj-super": ["三者以上比较 / the + 最高级？", "good→best 等不规则需牢记。"],
    "adj-prefix": ["意思是否取反？→ im- / un- / in- 等。", "注意 im- 在 p/b/m 前。"],
    "adj-fixed": ["形容词可能保持原形。", "little / special / busy 等原级形容词。"],
    "conj-fixed": ["固定结构 not A but B 等？", "连接词可能不变形。"],
    "prep-fixed": ["介词后接名词 / 动名词；介词本身不变。", "under / after / for 等原位。"],
    "num-ordinal": ["表示第几？→ 序数词。", "five→fifth；ten→tenth。"],
  };

  function buildPrompts(blank, catLabel) {
    var n = blank.n;
    var base = blank.base;
    var hints = CAT_HINTS[blank.cat] || [
      "先判断词性，再对照词库 12 词。",
      "变形后是否符合句意与语法？",
    ];
    var qs = [
      "【第一步 · 判词性】第 " + n + " 空在句中做什么成分？需要哪种词性？",
      "【第二步 · 看搭配】空格前后有哪些关键提示词（介词、连词、比较级标志等）？",
    ];
    hints.forEach(function (h) {
      qs.push("【思考】" + h);
    });
    qs.push("【词库】12 词中的「" + base + "」应填原形还是变形？");
    if (blank.rule) qs.push("【规则】" + (catLabel || "") + "：" + blank.rule);
    qs.push("【自检】代入后朗读全句——意思和语法都通顺吗？");
    return qs;
  }

  global.L15WordFormGuidance = { buildPrompts: buildPrompts, CAT_HINTS: CAT_HINTS };
})(typeof window !== "undefined" ? window : globalThis);
