#!/usr/bin/env node
/**
 * 从 Psle/set_*_typeflow.html 提取考点候选（Wave 1–4 规则）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const OUT = path.join(ROOT, "Psle/knowledge-registry/extracts");

const TAG_RULES = [
  // Wave 1
  { re: /比较级|comparative|than/i, id: "G-comparative-than", type: "grammar", title: "比较级 + than" },
  { re: /最高级|superlative|one of the most/i, id: "G-superlative-one-of-most", type: "grammar", title: "最高级 · one of the most" },
  { re: /第三人称单数|三单|doesn't|does not|第三人称/i, id: "G-present-simple-3rd", type: "grammar", title: "一般现在时 · 第三人称单数" },
  { re: /there\s+is|there\s+are|There be/i, id: "G-there-be", type: "grammar", title: "There be 句型" },
  { re: /不规则.*复数|irregular.*plural|children|feet|teeth|mice/i, id: "G-noun-plural-irregular", type: "grammar", title: "名词不规则复数" },
  { re: /不规则动词|irregular verb|went|bought|thought/i, id: "G-past-irregular-verbs", type: "grammar", title: "一般过去时 · 不规则动词" },
  { re: /look forward to/i, id: "V-look-forward-to", type: "vocab", title: "look forward to doing" },
  { re: /on sale|go shopping|shopping centre/i, id: "V-on-sale-shopping", type: "vocab", title: "on sale · go shopping" },
  // Wave 2
  { re: /情态动词|modal|can\b|could\b|should\b|must\b|may\b/i, id: "G-modals-can-should", type: "grammar", title: "情态动词 can/should/must" },
  { re: /冠词|不定冠词|定冠词|\ba an\b|a\/an\/the/i, id: "G-articles-a-an-the", type: "grammar", title: "冠词 a/an/the" },
  { re: /可数名词|不可数|uncountable|much\b.*many|many\b.*much|a lot of/i, id: "G-countable-uncountable", type: "grammar", title: "可数与不可数名词" },
  { re: /祈使句|imperative|Don't\b|Do not\b|Please\b/i, id: "G-imperative", type: "grammar", title: "祈使句" },
  { re: /一般将来|will be|will\s+\w+|next Monday|next week/i, id: "G-future-will", type: "grammar", title: "一般将来时 will" },
  { re: /感叹句|What a\b|How\s+\w+!/i, id: "G-exclamatory", type: "grammar", title: "感叹句 What/How" },
  { re: /too\s+\w+\s+to|enough to/i, id: "G-too-enough", type: "grammar", title: "too…to / enough to" },
  { re: /a few\b|a little\b|\bfew\b|\blittle\b/i, id: "G-few-little", type: "grammar", title: "a few / a little / few / little" },
  { re: /too\b.*句末|either\b|also\b|neither\b/i, id: "V-too-either-also", type: "vocab", title: "too / either / also / neither" },
  { re: /forget to|forget doing|remember to|remember doing/i, id: "V-forget-remember-doing", type: "vocab", title: "forget/remember + to do/doing" },
  // Wave 3
  { re: /现在进行时|is\s+\w+ing|are\s+\w+ing|am\s+\w+ing|at the moment|Look!.*ing/i, id: "G-present-continuous-psle", type: "grammar", title: "现在进行时 · 小升初补页" },
  { re: /现在完成|have\s+\w+ed|has\s+\w+ed|have\s+been|has\s+been|so far|already|yet\b/i, id: "G-present-perfect", type: "grammar", title: "现在完成时 · 入门" },
  { re: /被动|was\s+\w+ed|were\s+\w+ed|is\s+made|are\s+made|be\s+\w+ed/i, id: "G-passive-voice", type: "grammar", title: "被动语态 · 入门" },
  { re: /宾语从句|think\s+that|said\s+that|know\s+that|wonder\s+if|do you think/i, id: "G-object-clause", type: "grammar", title: "宾语从句 · 陈述语序" },
  { re: /like\s+\w+ing|enjoy\s+\w+ing|finish\s+\w+ing|动名词/i, id: "G-like-doing", type: "grammar", title: "like / enjoy / finish + doing" },
  { re: /宾格|give\s+(me|him|her|us|them)|tell\s+(me|him|her|us|them)|help\s+(me|him|her|us|them)/i, id: "G-pronouns-object", type: "grammar", title: "宾格代词 me / him / them" },
  { re: /\bsome\b.*\bany\b|\bany\b.*\bsome\b|some\s+or\s+any|no\s+\w+\s+left/i, id: "G-some-any-no", type: "grammar", title: "some / any / no" },
  { re: /cousin|nephew|niece|aunt'?s|uncle'?s|grandfather|grandmother|家庭成员/i, id: "V-family-words", type: "vocab", title: "家庭成员词汇" },
  { re: /反义词|opposite|short.*long|hot.*cold|happy.*sad/i, id: "V-antonyms", type: "vocab", title: "反义词填空" },
  { re: /make\s+\w+\s+\w+|let\s+\w+\s+\w+|help\s+\w+\s+(do|to)/i, id: "V-make-let-help", type: "vocab", title: "make / let / help sb do" },
  // Wave 4
  { re: /介词|preposition|in the morning|on Monday|at home|in the sun|look at|listen to/i, id: "G-prepositions", type: "grammar", title: "介词 in / on / at" },
  { re: /how often|how long|how many|how much|how old|疑问词|特殊疑问/i, id: "G-question-words", type: "grammar", title: "特殊疑问词 How/What/Where" },
  { re: /because\b|,\s*so\b|连词.*because|both.*and|either.*or/i, id: "G-conjunctions", type: "grammar", title: "连词 because / so / but" },
  { re: /所有格|possessive|\bmine\b|\byours\b|\bhers\b|\bours\b|\btheirs\b/i, id: "G-possessive", type: "grammar", title: "物主代词 my/mine · your/yours" },
  { re: /as\s+\w+\s+as|同级比较|not as\b/i, id: "G-as-as", type: "grammar", title: "同级比较 as…as" },
  { re: /always\b|usually\b|often\b|sometimes\b|never\b|频度副词/i, id: "G-adverbs-frequency", type: "grammar", title: "频度副词 always/usually/often" },
  { re: /stop to|stop doing|try to|try doing/i, id: "G-stop-try-doing", type: "grammar", title: "stop / try + to do / doing" },
  { re: /ask for|look after|look for|take care of|固定搭配|短语动词/i, id: "V-ask-phrases", type: "vocab", title: "ask for / look after / look for" },
  { re: /同义词|synonym|意思相同|意思相近/i, id: "V-synonyms", type: "vocab", title: "同义词替换 · 意思相同" },
  { re: /feel\s+\w+|excited|worried|nervous|proud|情绪|感受/i, id: "V-feelings", type: "vocab", title: "情绪形容词 · feel/excited/worried" },
];

function stripHtml(s) {
  return String(s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function classifyItem(item, setNum) {
  const stem = stripHtml(item.stem);
  const exp = (item.teaching?.explanation_md || "") + (item.teaching?.knowledge_expansion_md || "");
  const blob = stem + " " + exp + " " + JSON.stringify(item.options || {});
  const hits = [];
  const seen = new Set();
  for (const rule of TAG_RULES) {
    if (rule.re.test(blob) && !seen.has(rule.id)) {
      seen.add(rule.id);
      hits.push(rule);
    }
  }
  return hits.map((h) => ({
    kp_id: h.id,
    type: h.type,
    title: h.title,
    set: setNum,
    num: item.number,
    stem: stem.slice(0, 200),
    answer: item.teaching?.correct_answer || item.correct_answer || "",
  }));
}

function loadSet(n) {
  const name = n < 10 ? `set_0${n}_typeflow.html` : `set_${n}_typeflow.html`;
  const file = path.join(ROOT, "Psle", name);
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/id="exam-embed">([\s\S]*?)<\/script>/);
  if (!m) return [];
  const data = JSON.parse(m[1]);
  const rows = [];
  for (const sec of data.sections || []) {
    for (const item of sec.items || []) {
      rows.push(...classifyItem(item, n));
    }
  }
  return rows;
}

function main() {
  const sets = process.argv.slice(2).map(Number).filter(Boolean);
  const range = sets.length ? sets : [8, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  const all = [];
  for (const n of range) all.push(...loadSet(n));
  fs.mkdirSync(OUT, { recursive: true });
  const outFile = path.join(
    OUT,
    `set-${String(range[0]).padStart(2, "0")}-${String(range[range.length - 1]).padStart(2, "0")}.json`
  );
  fs.writeFileSync(outFile, JSON.stringify(all, null, 2));
  console.log("Wrote", all.length, "refs to", outFile);
}

main();
