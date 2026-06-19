/**
 * 为 L15 语料条目自动生成例句 (exEn) / 译文 (exZh) / 语境 (ctx)
 */
const YEAR_CTX = {
  2018: "2018成都中考 · 阅读/完形",
  2019: "2019成都中考 · 阅读/完形",
  2020: "2020成都中考 · 阅读/完形",
  2021: "2021成都中考 · 阅读/完形",
  2022: "2022成都中考 · 阅读/完形",
  2023: "2023成都中考 · 阅读/完形",
  2024: "2024成都中考 · 阅读/完形",
  2025: "2025成都中考 · 阅读/完形",
  2026: "2026成都中考 · 阅读/完形",
};

function pickYearCtx(year) {
  const y = String(year || "");
  for (const [yr, label] of Object.entries(YEAR_CTX)) {
    if (y.includes(yr)) return label;
  }
  if (/预测|拓展|HET|新课|语法|通用|中考|阅读|图表/.test(y)) return y || "初中拓展";
  if (/技巧|不规则/.test(y)) return "B卷词性转换技巧";
  return y || "初中英语";
}

function cap(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function phraseInSentence(phrase) {
  const p = String(phrase).trim();
  if (!p) return "This phrase appears in exam passages.";
  if (/^[A-Z]/.test(p) && p.endsWith(".")) return p;
  if (p.includes("…") || p.includes("___")) return p.replace(/…/g, "…").replace(/___/g, "______");
  if (/^Go .+, (and|or|but)/i.test(p)) return p.replace(/and you will/i, "and you will") + ".";
  if (/^It is .+ to do/i.test(p)) return p + ".";
  if (/^According to/i.test(p)) return p.replace(/…$/, " most students choose running.") + ".";
  if (/^The number of/i.test(p)) return p.replace(/…/g, " students") + " increased last year.";
  if (/^Compared with/i.test(p)) return p.replace(/…/g, " last year, this year is higher.") + ".";
  if (/^As we can see/i.test(p)) return p.replace(/…/g, " more girls took part in sports.") + ".";
  if (/^not only/i.test(p)) return p + ", but also helps us stay healthy.";
  if (/^either/i.test(p)) return p + " stay at home on rainy days.";
  if (/^neither/i.test(p)) return p + " wanted to give up.";
  if (/^be /i.test(p)) return `Students should ${p} their studies and hobbies.`;
  if (/^make sure/i.test(p)) return "Make sure you finish your homework before you play games.";
  if (/^make /i.test(p)) return `Remember to ${p} when you prepare for the exam.`;
  if (/^take /i.test(p)) return `Remember to ${p} when you visit the museum.`;
  if (/^have /i.test(p)) return `Many teens ${p} during the summer holiday.`;
  if (/^do /i.test(p)) return `Too much screen time can ${p} our eyes.`;
  if (/^provide|^depend|^insist|^keep |^catch |^find |^point |^carry |^hold |^give |^throw |^cut |^use /i.test(p))
    return `In daily life, we often ${p} to solve problems.`;
  if (/^get |^look |^run |^break |^come |^focus |^figure |^work |^pick |^hand |^stay |^pay |^take |^feel |^live |^wind |^dig |^form |^overcome |^bring |^put |^regard |^prevent |^drive |^repair |^search |^travel |^bury |^draw |^spread |^win |^weaken |^follow |^pretend |^afford |^lose |^stick |^never |^set /i.test(p))
    return `The story shows how people ${p} in real situations.`;
  if (p.includes(" + ") || p.includes("…")) return `Complete the sentence: ${p}.`;
  return `Exam context: Students learned to ${p} in the passage.`;
}

function wordFormExamples(it) {
  const b = it.base || it.en.split(" → ")[0]?.trim();
  const f = it.form || it.en.split(" → ")[1]?.trim();
  if (!b || !f) return { exEn: it.note || it.en, exZh: it.zh, ctx: pickYearCtx(it.year) };

  if (f.endsWith("ly")) {
    return {
      exEn: `She answered the question ${f}, and the teacher smiled.`,
      exZh: `她${f}地回答了问题，老师露出了微笑。→ 副词修饰动词 answered`,
      ctx: `B卷12选10 · ${pickYearCtx(it.year)}`,
    };
  }
  if (/^(their|them|our|us|we|they)$/i.test(b) || /^(their|them|ourselves|us|our)$/i.test(f)) {
    return {
      exEn: `This is ${f} classroom. ${cap(b)} study hard every day.`,
      exZh: `这是${f}教室。${b} 每天努力学习。→ 代词 / 物主代词`,
      ctx: `B卷12选10 · ${pickYearCtx(it.year)}`,
    };
  }
  if (f === "less" || f === "more" || f === "better" || f === "worse") {
    return {
      exEn: `Tom has ${f} free time than he had last term.`,
      exZh: `汤姆的空闲时间比上学期${f === "less" ? "更少" : "更多"}了。→ 比较级`,
      ctx: `B卷12选10 · ${pickYearCtx(it.year)}`,
    };
  }
  if (f === "well" && b === "good") {
    return {
      exEn: `She plays the piano very well, though she is only twelve.`,
      exZh: `她钢琴弹得很好，尽管只有十二岁。→ good(adj) → well(adv)`,
      ctx: `B卷12选10 · ${pickYearCtx(it.year)}`,
    };
  }
  if (f === "children" || f === "men" || f === "women" || f === "feet" || f === "teeth" || f === "mice") {
    return {
      exEn: `Two ${f} were waiting outside the library after school.`,
      exZh: `放学后，两个${f === "children" ? "孩子" : f}在图书馆外等候。→ 不规则复数`,
      ctx: `B卷12选10 · ${pickYearCtx(it.year)}`,
    };
  }
  if (/tion$|sion$|ment$|ness$|ity$|ence$|th$|ism$/i.test(f)) {
    return {
      exEn: `The ${f} of this discovery changed our understanding.`,
      exZh: `这一发现的${f}改变了我们的认识。→ 名词形式 ${b} → ${f}`,
      ctx: `B卷12选10 · ${pickYearCtx(it.year)}`,
    };
  }
  if (/^to /i.test(f)) {
    return {
      exEn: `Visitors are asked not ${f} the paintings in the museum.`,
      exZh: `参观者被要求不要${f}博物馆里的画作。→ 不定式`,
      ctx: pickYearCtx(it.year),
    };
  }
  return {
    exEn: `Fill in: The result looks ${b}, but we need the word "${f}" here.`,
    exZh: `填空：看起来是 ${b}，但此处需填 ${f}。→ ${it.zh}`,
    ctx: `B卷12选10 · ${pickYearCtx(it.year)}`,
  };
}

function polysemyExamples(it) {
  const w = it.en.split(",")[0].trim();
  const note = it.note || "";
  if (note && /[a-zA-Z]{4,}/.test(note)) {
    return {
      exEn: note.endsWith(".") ? note : note + ".",
      exZh: it.zh + (it.tag ? `（${it.tag}）` : ""),
      ctx: `${pickYearCtx(it.year)} · 熟词僻义`,
    };
  }
  return {
    exEn: `"${w}" can have more than one meaning in Chengdu exam passages.`,
    exZh: it.zh,
    ctx: `${pickYearCtx(it.year)} · 熟词僻义`,
  };
}

function tierExamples(it) {
  const w = it.en.split("/")[0].trim();
  const yc = pickYearCtx(it.year);
  return {
    exEn: `In the ${it.year || "exam"} passage, "${w}" helps students understand the main idea.`,
    exZh: `在${yc}语篇中，「${w}」(${it.zh}) 是理解主旨的关键词。`,
    ctx: yc,
  };
}

export function enrichItem(it) {
  const out = { ...it };
  let exEn = "";
  let exZh = "";
  let ctx = pickYearCtx(it.year);

  switch (it.cat) {
    case "word-form": {
      const wf = wordFormExamples(it);
      exEn = wf.exEn;
      exZh = wf.exZh;
      ctx = wf.ctx;
      break;
    }
    case "verb-phrase":
      exEn = phraseInSentence(it.en);
      exZh = `含义：${it.zh}。常见于 ${pickYearCtx(it.year).replace(/ · 阅读\/完形$/, "")} 阅读语篇。`;
      ctx = `${pickYearCtx(it.year)} · 动词词组`;
      break;
    case "adj-noun-phrase":
      exEn = `Scientists talked about ${it.en} in the article about modern life.`;
      exZh = `文章讨论了「${it.en}」(${it.zh})，帮助学生把握说明文细节。`;
      ctx = `${pickYearCtx(it.year)} · 主题词组`;
      break;
    case "collocation":
      exEn = phraseInSentence(it.en);
      exZh = `搭配义：${it.zh}。完形/写作中需整组记忆，不可拆分。`;
      ctx = `${pickYearCtx(it.year)} · 固定搭配`;
      break;
    case "idiom":
      if (/^[A-Z].*[.!?]$/.test(it.en)) {
        exEn = it.en;
      } else if (/^[A-Z].*\.$/.test(it.en) === false && it.en.includes(".")) {
        exEn = it.en;
      } else {
        exEn = it.en.endsWith(".") ? it.en : `"${it.en}," said the teacher with a smile.`;
      }
      exZh = `${it.zh} — 谚语/习语需整句背诵。`;
      ctx = `${pickYearCtx(it.year)} · 习语/谚语`;
      break;
    case "polysemy": {
      const p = polysemyExamples(it);
      exEn = p.exEn;
      exZh = p.exZh;
      ctx = p.ctx;
      break;
    }
    case "chart":
      if (/According|Compared|number of|accounts for|majority|As we can see/i.test(it.en)) {
        exEn = phraseInSentence(it.en);
        exZh = `图表写作句型：${it.zh}`;
        ctx = "图表题 · 书面表达";
      } else {
        exEn = `According to the chart, "${it.en}" is a key label students must read.`;
        exZh = `图表中出现「${it.en}」(${it.zh})，读懂图例是得分关键。`;
        ctx = `${pickYearCtx(it.year)} · 图表阅读`;
      }
      break;
    case "tier2":
    case "tier3": {
      const t = tierExamples(it);
      exEn = t.exEn;
      exZh = t.exZh;
      ctx = t.ctx + (it.cat === "tier3" ? " · Tier3" : " · Tier2");
      break;
    }
    case "predict":
      exEn = `In junior high, students should know "${it.en}" before entering senior school.`;
      exZh = `拓展词汇：${it.zh}${it.tag ? `（${it.tag}）` : ""} — 真题未考但应理解。`;
      ctx = it.tag ? `预测补充 · ${it.tag}` : "2027 预测 · 初中拓展";
      break;
    default:
      exEn = it.note || it.en;
      exZh = it.zh;
  }

  if (it.note && it.cat !== "polysemy" && exEn.length < 20 && /[a-zA-Z]/.test(it.note)) {
    exEn = it.note.endsWith(".") ? it.note : it.note + ".";
    exZh = exZh || it.zh;
  }

  out.exEn = exEn;
  out.exZh = exZh;
  out.ctx = ctx;
  return out;
}

export function enrichAll(items) {
  return items.map(enrichItem);
}
