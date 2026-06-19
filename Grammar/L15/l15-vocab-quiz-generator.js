/**
 * L15 · 词汇测验生成器（5 种题型 × 全库语料）
 * cloze | meaning | expression | transform | discriminate
 */
(function (global) {
  "use strict";

  var MODES = [
    { id: "cloze", label: "语境填空", icon: "①", desc: "例句挖空，结合语境选词" },
    { id: "meaning", label: "语境释义", icon: "②", desc: "读例句，选中文含义" },
    { id: "expression", label: "表达匹配", icon: "③", desc: "看语境与中文，选英文表达" },
    { id: "transform", label: "词性转化", icon: "④", desc: "括号原形 → 正确变形" },
    { id: "discriminate", label: "辨义判断", icon: "⑤", desc: "熟词僻义 / 语境精确理解" },
  ];

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function uniq(arr) {
    var seen = new Set();
    return arr.filter(function (x) {
      var k = String(x).toLowerCase();
      if (!x || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  function cleanZh(zh) {
    var z = String(zh || "");
    if (z.indexOf("常义") >= 0 && z.indexOf("僻义") >= 0) {
      var m = z.match(/僻义[：:]([^；;]+)/);
      if (m) return m[1].trim();
    }
    return z.split("；")[0].split("·")[0].split("—")[0].trim();
  }

  function primaryEn(item) {
    var e = String(item.en || "");
    if (e.indexOf(" → ") >= 0) return e.split(" → ")[1].trim();
    return e.split("/")[0].trim();
  }

  function baseWord(item) {
    return item.base || String(item.en || "").split(" → ")[0].trim();
  }

  function formWord(item) {
    return item.form || primaryEn(item);
  }

  function escapeReg(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlight(text, word) {
    if (!text || !word) return esc(text);
    var re = new RegExp("(" + escapeReg(word) + ")", "i");
    return esc(text).replace(re, "<mark class='vq-mark'>$1</mark>");
  }

  function blankInExample(item, word) {
    var ex = item.exEn || item.en;
    if (!word) return esc(ex);
    var re = new RegExp(escapeReg(word), "i");
    if (re.test(ex)) return esc(ex).replace(re, "<span class='vq-blank'>______</span>");
    re = new RegExp("\\b" + escapeReg(word) + "\\b", "i");
    if (re.test(ex)) return esc(ex).replace(re, "<span class='vq-blank'>______</span>");
    return esc(ex) + " <span class='vq-blank'>（______）</span>";
  }

  function poolExcept(pool, item) {
    return pool.filter(function (x) {
      return x.id !== item.id;
    });
  }

  function pickField(pool, item, field, n, sameCat) {
    var src = poolExcept(pool, item);
    if (sameCat) {
      var same = src.filter(function (x) {
        return x.cat === item.cat;
      });
      if (same.length >= n) src = same;
    }
    return shuffle(src)
      .slice(0, n * 3)
      .map(function (x) {
        if (field === "form") return formWord(x);
        if (field === "zh") return cleanZh(x.zh);
        return primaryEn(x);
      })
      .filter(function (v) {
        return v && String(v).length > 0;
      });
  }

  function fourOpts(correct, distractors) {
    return shuffle(uniq([correct].concat(distractors))).slice(0, 4);
  }

  function ctxBlock(item) {
    return (
      '<div class="vq-ctx">' +
      esc(item.ctx || item.year || "初中英语") +
      "</div>"
    );
  }

  function exZhHint(item) {
    if (!item.exZh) return "";
    return '<p class="vq-hint-zh">' + esc(item.exZh) + "</p>";
  }

  function genCloze(item, pool) {
    var w = formWord(item);
    if (item.cat !== "word-form") w = primaryEn(item);
    var stemEn = blankInExample(item, w);
    var dist = pickField(pool, item, item.cat === "word-form" ? "form" : "en", 3, true);
    return {
      mode: "cloze",
      modeLabel: "语境填空",
      itemId: item.id,
      cat: item.cat,
      stem: "根据例句与语境，选择最恰当的词填入空格。",
      stemHtml:
        ctxBlock(item) +
        '<p class="vq-ex" lang="en">' +
        stemEn +
        "</p>" +
        exZhHint(item),
      opts: fourOpts(w, dist),
      ans: w,
      fb: item.en + " — " + item.zh,
      tts: item.exEn || item.en,
    };
  }

  function genMeaning(item, pool) {
    var w = item.cat === "word-form" ? formWord(item) : primaryEn(item);
    var ans = cleanZh(item.zh);
    var dist = pickField(pool, item, "zh", 3, false);
    return {
      mode: "meaning",
      modeLabel: "语境释义",
      itemId: item.id,
      cat: item.cat,
      stem: "阅读例句中划线部分，选出符合语境的中文含义。",
      stemHtml:
        ctxBlock(item) +
        '<p class="vq-ex" lang="en">' +
        highlight(item.exEn || item.en, w) +
        "</p>",
      opts: fourOpts(ans, dist),
      ans: ans,
      fb: w + " → " + ans,
      tts: item.exEn || item.en,
    };
  }

  function genExpression(item, pool) {
    var ans = primaryEn(item);
    if (item.cat === "word-form") ans = item.en;
    var dist = pickField(pool, item, "en", 3, true);
    return {
      mode: "expression",
      modeLabel: "表达匹配",
      itemId: item.id,
      cat: item.cat,
      stem: "根据中文含义与语境提示，选择正确的英文表达。",
      stemHtml:
        ctxBlock(item) +
        '<p class="vq-prompt"><strong>中文：</strong>' +
        esc(cleanZh(item.zh)) +
        "</p>" +
        (item.exEn
          ? '<p class="vq-ex-mini" lang="en">例句参考：' +
            esc(item.exEn).slice(0, 120) +
            (item.exEn.length > 120 ? "…" : "") +
            "</p>"
          : ""),
      opts: fourOpts(ans, dist),
      ans: ans,
      fb: ans + " — " + item.zh,
      tts: ans,
    };
  }

  function genTransform(item, pool) {
    if (item.cat !== "word-form") {
      var q = genCloze(item, pool);
      q.mode = "transform";
      q.modeLabel = "词性转化";
      q.stem = "例句中需填入正确形式（非词性转化题则选语境最佳词）。";
      return q;
    }
    var b = baseWord(item);
    var f = formWord(item);
    var ex = item.exEn || "";
    var stemEn;
    if (ex && new RegExp(escapeReg(f), "i").test(ex)) {
      stemEn = esc(ex).replace(new RegExp(escapeReg(f), "i"), "(<em>" + esc(b) + "</em>) <span class='vq-blank'>______</span>");
    } else {
      stemEn = "The sentence needs the correct form of <em>" + esc(b) + "</em>: <span class='vq-blank'>______</span>.";
    }
    var dist = pickField(pool, item, "form", 3, true).concat([b, primaryEn(item)]);
    return {
      mode: "transform",
      modeLabel: "词性转化",
      itemId: item.id,
      cat: item.cat,
      stem: "词性转换：根据例句语境，选择括号单词的正确变形。",
      stemHtml: ctxBlock(item) + '<p class="vq-ex" lang="en">' + stemEn + "</p>" + exZhHint(item),
      opts: fourOpts(f, dist),
      ans: f,
      fb: b + " → " + f + "（" + item.zh + "）",
      tts: f,
    };
  }

  function genDiscriminate(item, pool) {
    var w = primaryEn(item).split(",")[0].trim();
    var ans;
    var opts;

    if (item.cat === "polysemy" || /僻/.test(item.zh + item.tag)) {
      var parts = String(item.zh).split(/[；;]/);
      var common = (parts[0].match(/常义[：:](.+)/) || [])[1] || parts[0];
      var rare = (parts[0].match(/僻义[：:](.+)/) || parts[1] || "").toString().replace(/僻义[：:]/, "") || cleanZh(item.zh);
      if (item.tag && item.tag.indexOf("→") >= 0) {
        var tp = item.tag.split("→");
        common = tp[0].replace(/常/g, "").trim();
        rare = tp[1].replace(/僻/g, "").trim();
      }
      ans = rare.trim() || cleanZh(item.zh);
      opts = fourOpts(ans, [common.trim(), cleanZh(item.zh), w].concat(pickField(pool, item, "zh", 2, false)));
    } else {
      ans = cleanZh(item.zh);
      opts = fourOpts(ans, pickField(pool, item, "zh", 3, item.cat === item.cat));
    }

    return {
      mode: "discriminate",
      modeLabel: "辨义判断",
      itemId: item.id,
      cat: item.cat,
      stem: "结合真题语境，判断划线词/表达在此处的准确理解。",
      stemHtml:
        ctxBlock(item) +
        '<p class="vq-ex" lang="en">' +
        highlight(item.exEn || item.en, w) +
        "</p>" +
        exZhHint(item),
      opts: opts,
      ans: ans,
      fb: w + " 在此语境中：" + ans,
      tts: item.exEn || item.en,
    };
  }

  var GENERATORS = {
    cloze: genCloze,
    meaning: genMeaning,
    expression: genExpression,
    transform: genTransform,
    discriminate: genDiscriminate,
  };

  function generateForItem(item, mode, pool) {
    var fn = GENERATORS[mode];
    if (!fn) return null;
    try {
      return fn(item, pool);
    } catch (e) {
      return null;
    }
  }

  function buildQuizSet(pool, mode, filter) {
    pool = pool || (global.L15Corpus && global.L15Corpus.MASTER) || [];
    var list = pool.slice();
    if (filter && filter.cat) {
      list = list.filter(function (x) {
        return x.cat === filter.cat;
      });
    }
    if (filter && filter.year) {
      list = list.filter(function (x) {
        return String(x.year).indexOf(filter.year) >= 0;
      });
    }
    var out = [];
    list.forEach(function (item) {
      var q = generateForItem(item, mode, pool);
      if (q) out.push(q);
    });
    return out;
  }

  function buildAllModes(pool, filter) {
    var all = {};
    MODES.forEach(function (m) {
      all[m.id] = buildQuizSet(pool, m.id, filter);
    });
    return all;
  }

  global.L15VocabQuizGen = {
    MODES: MODES,
    generateForItem: generateForItem,
    buildQuizSet: buildQuizSet,
    buildAllModes: buildAllModes,
  };
})(typeof window !== "undefined" ? window : globalThis);
