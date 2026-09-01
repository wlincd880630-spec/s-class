/**
 * 预生成 PET 18 单元讲义：初一–高三例句、词性家族、中文用法、语法 18 题。
 * 运行：node scripts/build-pet-handouts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "PET/studio/data/handouts");
const LEVELS = ["j1", "j2", "j3", "s1", "s2", "s3"];
const UNITS = [
  { id: 1, lessons: ["01", "02"] },
  { id: 2, lessons: ["03", "04"] },
  { id: 3, lessons: ["05", "06"] },
  { id: 4, lessons: ["07", "08"] },
  { id: 5, lessons: ["09", "10"] },
  { id: 6, lessons: ["11", "12"] },
  { id: 7, lessons: ["13", "14"] },
  { id: 8, lessons: ["15", "16"] },
  { id: 9, lessons: ["17", "18"] },
  { id: 10, lessons: ["19", "20"] },
  { id: 11, lessons: ["21", "22"] },
  { id: 12, lessons: ["23", "24"] },
  { id: 13, lessons: ["25", "26"] },
  { id: 14, lessons: ["27", "28"] },
  { id: 15, lessons: ["29", "30"] },
  { id: 16, lessons: ["31", "32"] },
  { id: 17, lessons: ["33", "34"] },
  { id: 18, lessons: ["35", "36"] }
];

const IRR = {
  be: ["be", "is", "was", "being", "been"],
  have: ["have", "has", "had", "having", "had"],
  do: ["do", "does", "did", "doing", "done"],
  go: ["go", "goes", "went", "going", "gone"],
  get: ["get", "gets", "got", "getting", "got"],
  make: ["make", "makes", "made", "making", "made"],
  take: ["take", "takes", "took", "taking", "taken"],
  come: ["come", "comes", "came", "coming", "come"],
  see: ["see", "sees", "saw", "seeing", "seen"],
  know: ["know", "knows", "knew", "knowing", "known"],
  think: ["think", "thinks", "thought", "thinking", "thought"],
  give: ["give", "gives", "gave", "giving", "given"],
  find: ["find", "finds", "found", "finding", "found"],
  tell: ["tell", "tells", "told", "telling", "told"],
  become: ["become", "becomes", "became", "becoming", "become"],
  leave: ["leave", "leaves", "left", "leaving", "left"],
  feel: ["feel", "feels", "felt", "feeling", "felt"],
  keep: ["keep", "keeps", "kept", "keeping", "kept"],
  hold: ["hold", "holds", "held", "holding", "held"],
  bring: ["bring", "brings", "brought", "bringing", "brought"],
  write: ["write", "writes", "wrote", "writing", "written"],
  sit: ["sit", "sits", "sat", "sitting", "sat"],
  stand: ["stand", "stands", "stood", "standing", "stood"],
  run: ["run", "runs", "ran", "running", "run"],
  pay: ["pay", "pays", "paid", "paying", "paid"],
  buy: ["buy", "buys", "bought", "buying", "bought"],
  catch: ["catch", "catches", "caught", "catching", "caught"],
  build: ["build", "builds", "built", "building", "built"],
  fall: ["fall", "falls", "fell", "falling", "fallen"],
  break: ["break", "breaks", "broke", "breaking", "broken"],
  choose: ["choose", "chooses", "chose", "choosing", "chosen"],
  speak: ["speak", "speaks", "spoke", "speaking", "spoken"],
  grow: ["grow", "grows", "grew", "growing", "grown"],
  show: ["show", "shows", "showed", "showing", "shown"],
  begin: ["begin", "begins", "began", "beginning", "begun"],
  win: ["win", "wins", "won", "winning", "won"],
  lose: ["lose", "loses", "lost", "losing", "lost"],
  set: ["set", "sets", "set", "setting", "set"],
  put: ["put", "puts", "put", "putting", "put"],
  cut: ["cut", "cuts", "cut", "cutting", "cut"],
  let: ["let", "lets", "let", "letting", "let"],
  lead: ["lead", "leads", "led", "leading", "led"],
  spend: ["spend", "spends", "spent", "spending", "spent"],
  meet: ["meet", "meets", "met", "meeting", "met"]
};

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const VERB_HEADS = /^(look|head|rule|show|count|give|take|make|get|get|go|come|put|set|turn|pick|carry|find|keep|hold|bring|run|pay|buy|catch|break|grow|speak|think|know|see|leave|feel|meet|win|lose|let|lead|spend|select|express|work|check|fill|cut|call|hang|grow|pass|pull|push|sort|write|read|sit|stand|build|fall|begin|start|stop|try|help|need|want|use|play|watch|listen|talk|walk|wait|move|open|close|send|save|share|join|leave|return|arrive|enter|leave)$/i;

function inferPos(it, kind) {
  if (kind === "phrase") {
    const w = String(it.word || it.phrase || "");
    const head = w.split(/\s+/)[0];
    if (/phrasal\s*verb/i.test(it.usage || "") || VERB_HEADS.test(head)) return "phr.v.";
    return "phr.";
  }
  const u = String(it.usage || "");
  if (/phrasal\s*verb/i.test(u)) return "phr.v.";
  if (/countable noun/i.test(u)) return "n. [C]";
  if (/uncountable noun/i.test(u)) return "n. [U]";
  if (/\bnoun\b/i.test(u)) return "n.";
  if (/\badjective\b/i.test(u)) return "adj.";
  if (/\badverb\b/i.test(u)) return "adv.";
  if (/\bverb\b/i.test(u)) return "v.";
  if (/\bpreposition\b/i.test(u)) return "prep.";
  if (/\bconjunction\b/i.test(u)) return "conj.";
  return kind === "phrase" ? "phr." : "n.";
}

function posZh(pos) {
  if (/phr\.v/.test(pos)) return "短语动词";
  if (/n\.pl/.test(pos)) return "名词复数";
  if (/^phr/.test(pos)) return "词组";
  if (/^n/.test(pos)) return "名词";
  if (/^v/.test(pos)) return "动词";
  if (/^adj/.test(pos)) return "形容词";
  if (/^adv/.test(pos)) return "副词";
  if (/^prep/.test(pos)) return "介词";
  if (/^conj/.test(pos)) return "连词";
  if (/particle/.test(pos)) return "小品词";
  return "其他";
}

function collocations(usage, word) {
  const raw = String(usage || "");
  const out = [];
  raw.replace(/'([^']+)'\s*\(([^)]+)\)/g, (_, _short, long) => {
    const phrase = String(long).split(/ in | or |,/)[0].trim();
    if (phrase && /[A-Za-z]/.test(phrase) && phrase.length < 48) out.push(phrase);
    return _;
  });
  raw.replace(/'([^']+)'/g, (_, x) => {
    const s = String(x || "").trim();
    if (s && s.length < 40 && out.indexOf(s) < 0) out.push(s);
    return _;
  });
  const uniq = [...new Set(out)];
  const filtered = uniq.filter((x) => !uniq.some((y) => y !== x && y.toLowerCase().includes(x.toLowerCase()) && y.length > x.length));
  if (word) {
    filtered.sort((a, b) => {
      const aw = new RegExp("\\b" + escapeRe(word) + "\\b", "i").test(a) ? 1 : 0;
      const bw = new RegExp("\\b" + escapeRe(word) + "\\b", "i").test(b) ? 1 : 0;
      return bw - aw || b.length - a.length;
    });
  }
  return filtered;
}

function usageZh(usage, pos) {
  const raw = String(usage || "").trim();
  const quoted = collocations(raw);
  const countable = /countable noun/i.test(raw);
  const uncount = /uncountable noun/i.test(raw);
  let head = posZh(pos) + "。";
  if (countable) head = "可数名词。";
  if (uncount) head = "不可数名词。";
  if (/phrasal\s*verb/i.test(raw)) head = "短语动词。";
  const combo = quoted.length ? "常见搭配：" + quoted.slice(0, 6).join("、") + "。" : "";
  const bits = [];
  if (/passive/i.test(raw)) bits.push("可用于被动语态");
  if (/gerund|-ing form/i.test(raw)) bits.push("后面可接名词或动名词");
  if (/british english/i.test(raw)) bits.push("注意英式搭配");
  if (/american english/i.test(raw)) bits.push("注意美式搭配");
  if (/formal writing/i.test(raw)) bits.push("多用于正式书面语");
  if (/informal speech/i.test(raw)) bits.push("多用于口语");
  if (/direct object/i.test(raw)) bits.push("后面常接宾语");
  if (/no plural|usually singular/i.test(raw)) bits.push("一般不用复数");
  if (/describes/i.test(raw)) bits.push("用来描述事物的特征或状态");
  const rest = bits.length ? bits.join("；") + "。" : "";
  return (head + combo + rest).replace(/。。/g, "。").trim() || "课堂与书面语中均可使用，注意搭配和语境。";
}

function irregular(base) {
  return IRR[String(base || "").toLowerCase()] || null;
}

function third(w) {
  const irr = irregular(w);
  if (irr) return irr[1];
  if (/(s|x|z|ch|sh)$/i.test(w)) return w + "es";
  if (/[^aeiou]y$/i.test(w)) return w.slice(0, -1) + "ies";
  return w + "s";
}

function past(w) {
  const irr = irregular(w);
  if (irr) return irr[2];
  if (/e$/i.test(w)) return w + "d";
  if (/[^aeiou]y$/i.test(w)) return w.slice(0, -1) + "ied";
  if (/([^aeiou])([aeiou])([^aeiouwxy])$/i.test(w)) return w + w.slice(-1) + "ed";
  return w + "ed";
}

function ing(w) {
  const irr = irregular(w);
  if (irr) return irr[3];
  if (/ie$/i.test(w)) return w.slice(0, -2) + "ying";
  if (/e$/i.test(w) && !/ee$/i.test(w)) return w.slice(0, -1) + "ing";
  if (/([^aeiou])([aeiou])([^aeiouwxy])$/i.test(w)) return w + w.slice(-1) + "ing";
  return w + "ing";
}

function plural(w) {
  if (/man$/i.test(w) && !/human$/i.test(w) && w.toLowerCase() !== "german") {
    return w.slice(0, -3) + "men";
  }
  if (/(s|x|z|ch|sh)$/i.test(w)) return w + "es";
  if (/[^aeiou]y$/i.test(w)) return w.slice(0, -1) + "ies";
  if (/f$/i.test(w) && !/(ff|ief)$/i.test(w)) return w.replace(/f$/i, "ves");
  if (/fe$/i.test(w)) return w.replace(/fe$/i, "ves");
  return w + "s";
}

function advFromAdj(w) {
  if (w.endsWith("ly")) return "";
  if (w.endsWith("y")) return w.slice(0, -1) + "ily";
  if (w.endsWith("le")) return w.slice(0, -1) + "y";
  if (w.endsWith("ic")) return w + "ally";
  if (w.endsWith("ed") || w.endsWith("ing")) return "";
  return w + "ly";
}

function nounFromVerb(w) {
  if (/(ct|ss)$/i.test(w)) return w + "ion";
  if (/(ate)$/i.test(w)) return w.slice(0, -2) + "ion";
  if (/(pose|scribe|duce)$/i.test(w)) return w.slice(0, -1) + "tion";
  if (/(ise|ize)$/i.test(w)) return w.slice(0, -1) + "ation";
  return "";
}

function uniqFamily(list) {
  const seen = new Set();
  return list.filter((x) => {
    const k = String(x.word || "").toLowerCase();
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function familyOf(it, kind, pos) {
  const w = String(it.word || it.phrase || "").trim();
  const meaning = String(it.correct_answer || it.definition_cn || it.meaning || "").trim();
  const out = [{ word: w, pos, posZh: posZh(pos), meaning: meaning || w }];
  if (kind === "phrase") {
    if (/phr\.v/.test(pos)) {
      const parts = w.split(/\s+/);
      if (parts[0] && parts[0] !== w) {
        out.push({ word: parts[0], pos: "v.", posZh: "动词", meaning: "短语动词的核心动词" });
      }
      const rest = parts.slice(1).join(" ");
      if (rest) {
        out.push({
          word: rest,
          pos: "particle",
          posZh: "小品词/搭配",
          meaning: "与动词构成固定词组"
        });
      }
    }
    return uniqFamily(out);
  }
  if (/^n/.test(pos) && !/ /.test(w)) {
    const pl = plural(w);
    if (pl !== w) out.push({ word: pl, pos: "n.pl.", posZh: "名词复数", meaning: meaning + "（复数）" });
  } else if (/^v/.test(pos)) {
    const base = w.split(/\s+/)[0];
    out.push({ word: third(base), pos: "v.", posZh: "动词", meaning: meaning + "（第三人称单数）" });
    out.push({ word: past(base), pos: "v.", posZh: "动词", meaning: meaning + "（过去式）" });
    out.push({ word: ing(base), pos: "v. / n.", posZh: "现在分词/动名词", meaning: meaning + "（-ing）" });
    const n = nounFromVerb(base);
    if (n) out.push({ word: n, pos: "n.", posZh: "名词", meaning: meaning + "（名词）" });
  } else if (/^adj/.test(pos)) {
    const adv = advFromAdj(w);
    if (adv) out.push({ word: adv, pos: "adv.", posZh: "副词", meaning: meaning + "地" });
    if (/ed$/i.test(w) && w.length > 4) {
      out.push({
        word: w.slice(0, -2),
        pos: "v.",
        posZh: "动词",
        meaning: "与「" + meaning + "」相关的动词"
      });
    }
    if (/^un/i.test(w) && w.length > 5) {
      out.push({
        word: w.slice(2),
        pos: "adj.",
        posZh: "形容词",
        meaning: "去掉否定前缀后的相关形容词"
      });
    }
  } else if (/^adv/.test(pos)) {
    const adj = w.endsWith("ly") ? w.slice(0, -2) : "";
    if (adj && adj.length > 2) {
      out.push({ word: adj, pos: "adj.", posZh: "形容词", meaning: meaning.replace(/地$/, "") });
    }
  }
  return uniqFamily(out).slice(0, 6);
}

function examKind(src) {
  const s = String(src || "").toLowerCase();
  if (s.includes("gaokao") || s.includes("高考")) return "gk";
  if (s.includes("zhongkao") || s.includes("中考")) return "zk";
  if (s.includes("article") || s.includes("文章")) return "article";
  return s;
}

function pickExisting(it, gaokaoMap) {
  const list = it.examples || [];
  let zk = null;
  let gk = null;
  list.forEach((ex) => {
    if (!ex || !ex.sentence) return;
    const k = examKind(ex.source);
    if (k === "zk" && !zk) zk = ex;
    if (k === "gk" && !gk) gk = ex;
  });
  const key = String(it.word || it.phrase || "").toLowerCase();
  if (!gk && gaokaoMap[key]) gk = gaokaoMap[key];
  const fill = (it.quiz_fill || []).find((r) => r && (r.is_correct || r.isCorrect) && r.sentence);
  return { zk, gk, fill };
}

function cap(s) {
  s = String(s || "");
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function art(w) {
  return /^[aeiou]/i.test(w) ? "an" : "a";
}

function escapeRe(s) {
  return String(s || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function makeExamples(it, kind, pos, gaokaoMap) {
  const w = String(it.word || it.phrase || "").trim();
  const cn = String(it.correct_answer || it.definition_cn || it.meaning || "").trim() || w;
  const { zk, gk, fill } = pickExisting(it, gaokaoMap);
  const combos = collocations(it.usage, w);
  const isPhrase = kind === "phrase" || /^phr/.test(pos);
  const isPhrV = /phr\.v/.test(pos);
  const isVerb = /^v/.test(pos);
  const isAdj = /^adj/.test(pos);
  const isAdv = /^adv/.test(pos);
  const base = w.split(/\s+/)[0];
  const p3 = isVerb ? third(base) : w;
  const pst = isVerb ? past(base) : w;
  const bank = [];

  if (fill && fill.sentence) {
    const filled = String(fill.sentence).replace(/_{2,}/g, w);
    if (!/_{2,}/.test(filled)) {
      bank.push({
        level: "j1",
        sentence: cap(filled),
        trans: `（初一）${cn}`
      });
    }
  }

  if (isPhrase && isPhrV) {
    const refl = /(themselves|yourself|myself|ourselves|himself|herself)$/i.test(w);
    const s1 = refl ? `They ${w} in class.` : `I ${w} the next holiday.`;
    const t1 = refl ? `他们在课堂上${cn}。` : `我${cn}下一个假期。`;
    const s2 = refl ? `They ${w} after school.` : `We ${w} the park after school.`;
    const t2 = `放学后我们${cn}。`;
    const s3 = zk ? zk.sentence : (refl ? `If you ${w}, things will get better.` : `If you ${w} the plan, things will get better.`);
    const t3 = zk ? zk.trans : `如果你${cn}，情况会好转。`;
    const s4 = refl
      ? `Students who ${w} usually make faster progress.`
      : `Students who ${w} the next step usually make faster progress.`;
    const s5 = refl
      ? `Although the task was hard, they still managed to ${w}.`
      : `Although the task was hard, they still managed to ${w} the work.`;
    const s6 = gk
      ? gk.sentence
      : (refl
        ? `Those who ${w} can turn pressure into growth.`
        : `Those who ${w} a long-term goal can turn pressure into growth.`);
    bank.push(
      { level: "j1", sentence: s1, trans: t1 },
      { level: "j2", sentence: s2, trans: t2 },
      { level: "j3", sentence: s3, trans: t3 },
      { level: "s1", sentence: s4, trans: `会${cn}的学生进步通常更快。` },
      { level: "s2", sentence: s5, trans: `尽管任务很难，他们还是设法${cn}。` },
      { level: "s3", sentence: s6, trans: gk ? gk.trans : `能${cn}的人，才能把压力变成成长。` }
    );
  } else if (isPhrase) {
    let j1s = `Please remember the phrase "${w}".`;
    let j1t = `请记住词组「${w}」（${cn}）。`;
    let j2s = `You can use "${w}" in a short sentence.`;
    let j2t = `你可以在短句里使用「${w}」。`;
    let s1s = `A clear example of "${w}" can make 「${cn}」 easier to remember.`;
    let s1t = `一个清楚的「${w}」例子能让「${cn}」更好记。`;
    let s2s = `If you leave "${w}" out, the meaning of 「${cn}」 becomes weaker.`;
    let s2t = `如果漏掉「${w}」，「${cn}」的意思就会变弱。`;
    if (/ with$/i.test(w)) {
      j1s = `The room is ${w} people.`;
      j1t = `房间里${cn}人。`;
      j2s = `The museum is ${w} new exhibits.`;
      j2t = `博物馆里${cn}新展品。`;
      s1s = `A busy weekend is often ${w} family activities.`;
      s1t = `忙碌的周末常常${cn}家庭活动。`;
      s2s = `The more a day is ${w} tasks, the more you need to plan.`;
      s2t = `一天越是${cn}任务，就越需要计划。`;
    } else if (/^(in|on|at|for|to)\b/i.test(w)) {
      j1s = `Something is still ${w}.`;
      j1t = `有些事情仍然${cn}。`;
      j2s = `Our plan is ${w} this week.`;
      j2t = `我们这周的计划还${cn}。`;
      s1s = `Whether we will go is still ${w} this month.`;
      s1t = `这个月我们去不去仍然${cn}。`;
      s2s = `Plans that stay ${w} too long often miss the best chance.`;
      s2t = `计划${cn}太久，往往会错过最好的时机。`;
    } else if (/than/i.test(w)) {
      j1s = `The trip was ${w} wonderful.`;
      j1t = `这次旅行${cn}精彩。`;
      j2s = `His idea was ${w} a surprise.`;
      j2t = `他的想法${cn}一个惊喜。`;
      s1s = `The result was ${w} a turning point for the team.`;
      s1t = `这个结果对全队而言${cn}转折点。`;
      s2s = `For some students, this chance is ${w} a new life.`;
      s2t = `对有些学生来说，这次机会${cn}新的人生。`;
    } else if (/^(not|no|nothing)\b/i.test(w)) {
      j1s = `There is ${w}.`;
      j1t = `这里${cn}。`;
      j2s = `In that class there is ${w}.`;
      j2t = `那堂课上${cn}。`;
    }
    bank.push(
      { level: "j1", sentence: j1s, trans: j1t },
      { level: "j2", sentence: j2s, trans: j2t },
      { level: "j3", sentence: zk ? zk.sentence : `A good sentence should use "${w}" naturally.`, trans: zk ? zk.trans : `好句子会自然用到「${w}」。` },
      { level: "s1", sentence: s1s, trans: s1t },
      { level: "s2", sentence: s2s, trans: s2t },
      { level: "s3", sentence: gk ? gk.sentence : `A precise use of "${w}" often makes an argument more convincing.`, trans: gk ? gk.trans : `准确使用「${w}」往往让论述更有说服力。` }
    );
  } else if (isVerb) {
    bank.push(
      { level: "j1", sentence: `Please ${w} a better option.`, trans: `请${cn}一个更好的选项。` },
      { level: "j2", sentence: `She ${p3} a better seat after school.`, trans: `她放学后${cn}了更好的座位。` },
      { level: "j3", sentence: zk ? zk.sentence : `If you ${w} carefully, you will get a better result.`, trans: zk ? zk.trans : `如果你认真${cn}，就会有更好的结果。` },
      { level: "s1", sentence: `He ${pst} the best option after thinking for a long time.`, trans: `他想了很久才${cn}了最好的选项。` },
      { level: "s2", sentence: `What matters is that you ${w} carefully, not quickly.`, trans: `重要的是你要仔细${cn}，而不是图快。` },
      { level: "s3", sentence: gk ? gk.sentence : `Those who ${w} wisely are more likely to handle pressure well.`, trans: gk ? gk.trans : `能明智地${cn}的人，往往更能应对压力。` }
    );
  } else if (isAdj) {
    const withCombo = combos.some((c) => /^with$/i.test(c) || /with /i.test(c));
    bank.push(
      { level: "j1", sentence: `This place looks ${w}.`, trans: `这个地方看起来很${cn}。` },
      { level: "j2", sentence: withCombo ? `The park is ${w} with families.` : `The story sounds ${w} to me.`, trans: withCombo ? `公园里${cn}家庭。` : `这个故事在我听来很${cn}。` },
      { level: "j3", sentence: zk ? zk.sentence : `Many students feel ${w} before a big exam.`, trans: zk ? zk.trans : `大考前很多学生会感到${cn}。` },
      { level: "s1", sentence: `Because the situation was ${w}, they changed their plan.`, trans: `因为当时的情况很${cn}，他们改了计划。` },
      { level: "s2", sentence: `The more ${w} it seemed at first, the more carefully they looked at it.`, trans: `起初看起来越${cn}，他们就越认真对待。` },
      { level: "s3", sentence: gk ? gk.sentence : `Few people expected such a ${w} result at the end of the year.`, trans: gk ? gk.trans : `年底很少有人预料到如此${cn}的结果。` }
    );
  } else if (isAdv) {
    bank.push(
      { level: "j1", sentence: `Please speak ${w}.`, trans: `请${cn}说话。` },
      { level: "j2", sentence: `He finished his homework ${w}.`, trans: `他${cn}完成了作业。` },
      { level: "j3", sentence: zk ? zk.sentence : `You should listen ${w} in class.`, trans: zk ? zk.trans : `课堂上你应该${cn}听讲。` },
      { level: "s1", sentence: `She explained the idea ${w} so that everyone could follow.`, trans: `她${cn}解释了这个想法，好让每个人都能跟上。` },
      { level: "s2", sentence: `If you plan ${w}, the same work takes less time.`, trans: `如果你${cn}规划，同样的工作会花更少时间。` },
      { level: "s3", sentence: gk ? gk.sentence : `Those who think ${w} before they speak are less likely to hurt others.`, trans: gk ? gk.trans : `说话前${cn}思考的人，更不容易伤害别人。` }
    );
  } else {
    const hasWord = combos.some((c) => new RegExp("\\b" + escapeRe(w) + "\\b", "i").test(c));
    const prep = combos.find((c) => /^(on|at|in|for|with)\b/i.test(c));
    let j1s = `I like this ${w}.`;
    let j1t = `我喜欢这个${cn}。`;
    if (hasWord) {
      j1s = `I enjoy ${combos[0]}.`;
      j1t = `我喜欢${cn}。`;
    } else if (prep && /^(on|at|in)$/i.test(prep)) {
      j1s = `We play football ${prep} the ${w}.`;
      j1t = `我们在${cn}踢足球。`;
    } else if (combos.some((c) => /^(go on|have|plan)$/i.test(c))) {
      const v = combos.find((c) => /^(go on|have|plan)$/i.test(c));
      j1s = `Let's ${v} ${art(w)} ${w}.`;
      j1t = `我们一起${cn}吧。`;
    }
    bank.push(
      { level: "j1", sentence: j1s, trans: j1t },
      { level: "j2", sentence: `We talked about the ${w} in class today.`, trans: `今天我们在课上谈到了${cn}。` },
      { level: "j3", sentence: zk ? zk.sentence : `A good ${w} can make the day more interesting.`, trans: zk ? zk.trans : `一个好的${cn}能让这一天更有趣。` },
      { level: "s1", sentence: `The ${w} they chose shows what they value most.`, trans: `他们选择的${cn}说明他们最看重什么。` },
      { level: "s2", sentence: `If we prepare the ${w} carefully, the whole day will go more smoothly.`, trans: `如果我们认真准备好${cn}，一整天都会更顺利。` },
      { level: "s3", sentence: gk ? gk.sentence : `A well-planned ${w} is often more helpful than a long speech.`, trans: gk ? gk.trans : `安排得当的${cn}，往往比长篇演讲更有帮助。` }
    );
  }

  const by = {};
  bank.forEach((ex) => {
    if (by[ex.level]) return;
    by[ex.level] = {
      level: ex.level,
      sentence: String(ex.sentence || "").trim(),
      trans: String(ex.trans || "").trim()
    };
  });
  if (zk) by.j3 = { level: "j3", sentence: zk.sentence, trans: zk.trans || by.j3?.trans || "" };
  if (gk) by.s3 = { level: "s3", sentence: gk.sentence, trans: gk.trans || by.s3?.trans || "" };
  return LEVELS.map((lv) => by[lv]).filter((x) => x && x.sentence);
}

function grammarTitle(g) {
  const exp = stripHtml(g.explanation || "");
  const first = (exp.split(/[。！？\n]/)[0] || "").trim();
  if (first.length >= 8 && first.length <= 56) return first;
  return g.title || "语法点";
}

function extractForms(g) {
  const html = String(g.explanation || "");
  const forms = [];
  const re = /<li>\s*<b>([^<]+)<\/b>\s*([^<]*)/gi;
  let m;
  while ((m = re.exec(html))) {
    forms.push((m[1] + " " + m[2]).replace(/\s+/g, " ").trim());
  }
  if (forms.length) return forms.slice(0, 5);
  const text = stripHtml(html);
  text.split(/\n/).forEach((line) => {
    if (/结构|否定|疑问|公式|用法/.test(line) && line.length < 80) forms.push(line.trim());
  });
  return forms.slice(0, 5);
}

function grammarKeywords(g) {
  const t = g.title || "";
  const found = [];
  t.replace(/'([^']+)'/g, (_, x) => {
    String(x)
      .split(/\.{2,}|\s+\/\s+| or /)
      .forEach((p) => {
        const s = p.replace(/^\s+|\s+$/g, "").replace(/^\.+|\.+$/g, "");
        if (s && s.length < 24) found.push(s);
      });
    return _;
  });
  if (!found.length) {
    const m = stripHtml(g.explanation || "").match(/[A-Za-z']{2,12}/);
    if (m) found.push(m[0]);
  }
  return [...new Set(found)];
}

function existingExercises(g) {
  const rows = [];
  function push(row, typeGuess, src) {
    if (!row || !(row.question || row.q)) return;
    rows.push({
      type: row.type || typeGuess || ((row.options || []).length ? "choice" : "fill"),
      q: row.question || row.q,
      options: row.options || [],
      answer: row.correct || row.answer || "",
      explain: stripHtml(row.explanation || row.hint || ""),
      src
    });
  }
  (g.guide_questions || []).forEach((r) => push(r, "choice", "guide"));
  (g.quiz_questions || []).forEach((r) => push(r, r.type || "choice", "quiz"));
  return rows;
}

function blankOnce(sent, kws) {
  const s = String(sent || "");
  for (let i = 0; i < kws.length; i++) {
    const kw = kws[i];
    if (!kw) continue;
    const re = new RegExp("\\b" + escapeRe(kw) + "\\b", "i");
    if (re.test(s)) return { text: s.replace(re, "______"), ans: s.match(re)[0] };
  }
  return {
    text: s.replace(/\b(can|could|should|must|where|when|that|which|so|is|are|was|were|have|has|been)\b/i, "______"),
    ans: (s.match(/\b(can|could|should|must|where|when|that|which|so|is|are|was|were|have|has|been)\b/i) || ["（原词）"])[0]
  };
}

function messUp(en, kws, title) {
  const t = String(title || "").toLowerCase();
  let s = String(en || "");
  if (/\bcan\b|modal/.test(t)) {
    const n = s.replace(/\bcan (\w+)\b/i, "can $1s");
    if (n !== s) return n;
    return s.replace(/\bcan\b/i, "cans");
  }
  if (/where/.test(t)) return s.replace(/\bwhere\b/i, "which") || s;
  if (/when/.test(t)) return s.replace(/\bwhen\b/i, "where") || s;
  if (/passive|被动/.test(t)) {
    const n = s.replace(/\b(is|are|was|were|been|be)\b/i, "");
    return n.replace(/\s{2,}/g, " ").trim();
  }
  if (/so/.test(t)) return s.replace(/\bso\b/i, "").replace(/\s{2,}/g, " ").trim();
  if (/present simple|一般现在/.test(t)) {
    const n = s.replace(/\b(\w+)s\b/, "$1ing");
    if (n !== s) return n;
  }
  if (kws[0]) {
    const re = new RegExp("\\b" + escapeRe(kws[0]) + "\\b", "i");
    if (re.test(s)) return s.replace(re, kws[0] + "s");
  }
  return s.replace(/\b(the|a|an)\b/i, "") || (s + " s");
}

function negateGuess(en, kws) {
  const s = String(en || "");
  if (/\bcan\b/i.test(s)) return s.replace(/\bcan\b/i, "cannot");
  if (/\b(is|are|was|were)\b/.test(s)) return s.replace(/\b(is|are|was|were)\b/, "$1 not");
  if (/\b(have|has)\b/.test(s)) return s.replace(/\b(have|has)\b/, "$1 not");
  return "Add not / never without breaking the structure: " + s;
}

function questionGuess(en, kws) {
  const s = String(en || "").replace(/\.$/, "");
  const m = s.match(/^(.*?)\b(can|could|should|must|will|would)\b\s+(\w+)/i);
  if (m) {
    return cap(m[2]) + " " + (m[1] || "").trim() + " " + m[3] + s.slice((m[0] || "").length) + "?";
  }
  if (/^(I|You|We|They)\b/.test(s)) return "Do " + s.charAt(0).toLowerCase() + s.slice(1) + "?";
  if (/^(He|She|It)\b/.test(s)) return "Does " + s.charAt(0).toLowerCase() + s.slice(1) + "?";
  return "Turn into a yes/no question: " + s + "?";
}

function shuffleSeed(arr, seed) {
  const a = arr.slice();
  let h = 2166136261;
  String(seed || "").split("").forEach((ch) => {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  });
  for (let i = a.length - 1; i > 0; i--) {
    h = Math.imul(h, 1664525) + 1013904223;
    const j = Math.abs(h) % (i + 1);
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function extraGrammarQs(g) {
  const extras = [];
  const title = grammarTitle(g);
  const kws = grammarKeywords(g);
  const tip = stripHtml(g.zhongkao_tips || g.tips || "");
  const examples = g.examples || [];
  const forms = extractForms(g);
  const src = g.source_sentence || "";
  const srcCn = g.source_sentence_cn || "";

  function add(type, q, options, answer, explain) {
    if (!q || extras.some((x) => x.q === q)) return;
    extras.push({
      type,
      q,
      options: options && options.length ? shuffleSeed(options, q) : [],
      answer: answer || "",
      explain: explain || "",
      src: "extra"
    });
  }

  if (src) {
    const b = blankOnce(src, kws);
    add("fill", `根据中文补全（${srcCn || title}）：${b.text}`, [], b.ans, "对照课文原句，把语法关键词填回。");
    add("rewrite", `把课文原句改成否定句：${src}`, [], negateGuess(src, kws), "先保住原结构，再加否定。");
    add("rewrite", `把课文原句改成一般疑问句：${src}`, [], questionGuess(src, kws), "把情态动词/助动词提前。");
    add("truefalse", `判断：课文原句「${src}」可以用来练习「${title}」。`, ["正确", "错误"], "正确", "讲义中的原句就是该语法点的语境例句。");
  }

  examples.forEach((ex) => {
    const en = ex.en || ex.sentence || "";
    const cn = ex.cn || ex.trans || "";
    if (!en) return;
    const b = blankOnce(en, kws);
    add("fill", `翻译填空：${cn || title} → ${b.text}`, [], b.ans, "先看中文意思，再填回语法关键词。");
    add("truefalse", `判断正误：${en} 是「${title}」的正确用法。`, ["正确", "错误"], "正确", "对照结构公式检查动词形式和语序。");
    add("error", `改错：${messUp(en, kws, g.title)}`, [], en, "对照正确例句改正。");
    const wrong1 = messUp(en, kws, g.title);
    const wrong2 = en.replace(/\b(is|are|was|were|can|do|does)\b/i, "be");
    const wrong3 = en.replace(/\.$/, "") + " yesterday.";
    add(
      "choice",
      `选出与「${cn || title}」相符且语法正确的句子。`,
      [en, wrong1, wrong2, wrong3].filter((x, i, arr) => x && arr.indexOf(x) === i).slice(0, 4),
      en,
      "排除结构被破坏的干扰项。"
    );
    add("rewrite", `把句子改成否定句：${en}`, [], negateGuess(en, kws), "否定时不要丢掉原语法结构。");
  });

  forms.forEach((f, i) => {
    add("fill", `写出「${title}」的第 ${i + 1} 条结构要点：______`, [], f, "公式要短，并且能套进新句子。");
  });

  if (tip) {
    add("truefalse", `判断：复习「${title}」时，中考提示里的易错点需要结合句子成分来看，不能死记半句话。`, ["正确", "错误"], "正确", tip.slice(0, 80));
    add(
      "choice",
      `关于「${title}」的中考提醒，下列哪一项最合适？`,
      [
        "先看先行词/动词形式，再决定用哪一个词",
        "只要认识单词就能得分",
        "中英文语序完全一样",
        "可以忽略第三人称和时态"
      ],
      "先看先行词/动词形式，再决定用哪一个词",
      tip.slice(0, 80)
    );
    if (/\bcan\b/i.test(String(g.title || ""))) {
      add("error", `根据中考提示改错（结合「${title}」）：He cans swim very well.`, [], "He can swim very well.", "情态动词没有第三人称单数变化。");
    }
  }

  add(
    "choice",
    `使用「${title}」时，下列哪一步最关键？`,
    ["先确认结构公式再填词", "只看中文意思直接翻译", "把课文原句整句背完就算会", "题目越长越不用分析成分"],
    "先确认结构公式再填词",
    "公式决定形式，例句提供语境。"
  );

  return extras;
}

function assignLevels(list) {
  const rank = { truefalse: 0, fill: 1, choice: 2, rewrite: 3, error: 4 };
  const sorted = list.slice().sort((a, b) => {
    const sa = a.src === "guide" ? -2 : a.src === "quiz" ? -1 : 0;
    const sb = b.src === "guide" ? -2 : b.src === "quiz" ? -1 : 0;
    return sa - sb || (rank[a.type] || 9) - (rank[b.type] || 9);
  });
  return sorted.map((ex, i) => {
    const { src, ...rest } = ex;
    return Object.assign({}, rest, { level: LEVELS[i % LEVELS.length] });
  });
}

function packGrammar(g) {
  const title = grammarTitle(g);
  const usage = stripHtml(g.explanation || "") || title;
  const notes = [];
  const tip = stripHtml(g.zhongkao_tips || "");
  if (tip) notes.push(tip);
  const forms = extractForms(g);
  const kws = grammarKeywords(g);
  const examples = [];
  if (g.source_sentence) {
    examples.push({ level: "j3", en: g.source_sentence, cn: g.source_sentence_cn || "" });
  }
  (g.examples || []).forEach((ex, i) => {
    const en = ex.en || ex.sentence || "";
    if (!en) return;
    examples.push({
      level: i === 0 ? "j1" : "j2",
      en,
      cn: ex.cn || ex.trans || ""
    });
  });
  const seed = examples[0] || {
    en: `This sentence practises ${g.title || title}.`,
    cn: `这个句子用来练习「${title}」。`
  };
  const upgrades = {
    s1: (en, cn) => ({
      level: "s1",
      en: /[.?!]$/.test(en) ? en.replace(/[.?!]$/, " in real communication.") : en,
      cn: cn + "（高一：注意在真实交际中的用法。）"
    }),
    s2: (en, cn) => ({
      level: "s2",
      en: "Although the structure looks simple, " + en.charAt(0).toLowerCase() + en.slice(1),
      cn: "尽管结构看起来简单，" + cn
    }),
    s3: (en, cn) => ({
      level: "s3",
      en: "It is often argued that " + en.charAt(0).toLowerCase() + en.slice(1),
      cn: "人们常认为" + cn
    })
  };
  ["s1", "s2", "s3"].forEach((lv) => {
    if (!examples.some((x) => x.level === lv)) {
      examples.push(upgrades[lv](seed.en, seed.cn || ""));
    }
  });
  LEVELS.forEach((lv) => {
    if (!examples.some((x) => x.level === lv)) {
      examples.push({
        level: lv,
        en: seed.en,
        cn: seed.cn || `「${title}」例句`
      });
    }
  });
  const exampleOut = LEVELS.map((lv) => examples.find((x) => x.level === lv)).filter(Boolean);

  let exercises = existingExercises(g);
  extraGrammarQs(g).forEach((ex) => {
    if (exercises.some((x) => x.q === ex.q)) return;
    exercises.push(ex);
  });
  let n = 0;
  while (exercises.length < 18) {
    const ex = (g.examples || [])[n % Math.max(1, (g.examples || []).length)] || { en: seed.en, cn: seed.cn };
    const en = ex.en || ex.sentence || seed.en;
    const cn = ex.cn || ex.trans || seed.cn;
    const b = blankOnce(en, kws);
    exercises.push({
      type: n % 2 === 0 ? "fill" : "truefalse",
      q: n % 2 === 0
        ? `再练一次填空（${cn}）：${b.text}`
        : `判断：句子「${en}」符合「${title}」的结构要求。`,
      options: n % 2 === 0 ? [] : ["正确", "错误"],
      answer: n % 2 === 0 ? b.ans : "正确",
      explain: "反复套公式，直到能在新句子里用出来。",
      src: "pad"
    });
    n++;
    if (n > 12) break;
  }
  exercises = assignLevels(exercises).slice(0, Math.max(18, exercises.length));

  return {
    key: g.title || title,
    title,
    titleEn: g.title || "",
    usage,
    forms,
    notes,
    examples: exampleOut,
    exercises
  };
}

function itemKey(it) {
  return String(it.word || it.phrase || "").trim();
}

function buildItem(it, kind, gaokaoMap) {
  const pos = inferPos(it, kind);
  return {
    usageZh: usageZh(it.usage, pos),
    family: familyOf(it, kind, pos),
    examples: makeExamples(it, kind, pos, gaokaoMap)
  };
}

function loadGaokao() {
  const p = path.join(ROOT, "PET/studio/data/gaokao-phrases.json");
  const bank = readJson(p);
  const map = {};
  Object.keys(bank).forEach((lesson) => {
    const pack = bank[lesson] || {};
    Object.keys(pack).forEach((word) => {
      const row = pack[word];
      if (row && row.sentence) {
        map[String(word).toLowerCase()] = row;
      }
    });
  });
  return map;
}

function buildUnit(unit, gaokaoMap) {
  const vocab = {};
  const colloc = {};
  const grammar = [];
  unit.lessons.forEach((lesson) => {
    const data = readJson(path.join(ROOT, "PET", lesson, "course_data.json"));
    (data.vocabulary || []).forEach((it) => {
      const k = itemKey(it);
      if (k) vocab[k] = buildItem(it, "vocab", gaokaoMap);
    });
    (data.collocations || []).forEach((it) => {
      const k = itemKey(it);
      if (k) colloc[k] = buildItem(it, "phrase", gaokaoMap);
    });
    (data.grammar || []).forEach((g) => {
      grammar.push(packGrammar(g));
    });
  });
  return { unit: unit.id, levels: LEVELS, vocab, colloc, grammar };
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const gaokaoMap = loadGaokao();
  const index = {
    levels: [
      { id: "j1", label: "初一" },
      { id: "j2", label: "初二" },
      { id: "j3", label: "初三" },
      { id: "s1", label: "高一" },
      { id: "s2", label: "高二" },
      { id: "s3", label: "高三" }
    ],
    units: []
  };
  UNITS.forEach((u) => {
    const pack = buildUnit(u, gaokaoMap);
    const file = `u${String(u.id).padStart(2, "0")}.json`;
    fs.writeFileSync(path.join(OUT, file), JSON.stringify(pack));
    const gMin = Math.min(...pack.grammar.map((g) => g.exercises.length));
    const types = new Set();
    pack.grammar.forEach((g) => g.exercises.forEach((e) => types.add(e.type)));
    index.units.push({
      id: u.id,
      file,
      vocab: Object.keys(pack.vocab).length,
      colloc: Object.keys(pack.colloc).length,
      grammar: pack.grammar.length,
      minExercises: gMin
    });
    console.log(
      `Unit ${u.id}: vocab ${Object.keys(pack.vocab).length} colloc ${Object.keys(pack.colloc).length} grammar ${pack.grammar.length} minQs ${gMin} types ${[...types].join(",")}`
    );
  });
  fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(index, null, 2));
  console.log("wrote", OUT);
}

main();
