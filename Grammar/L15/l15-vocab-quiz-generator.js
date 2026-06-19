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

  function normKey(s) {
    return String(s || "")
      .trim()
      .toLowerCase();
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

  function cleanZh(zh) {
    var z = String(zh || "")
      .replace(/^(含义|搭配义|拓展词汇)[：:]\s*/, "")
      .trim();
    if (z.indexOf("常义") >= 0 && z.indexOf("僻义") >= 0) {
      var m = z.match(/僻义[：:]([^；;]+)/);
      if (m) return m[1].trim();
    }
    return z.split("；")[0].split("·")[0].split("—")[0].trim();
  }

  function polysemyRareZh(item) {
    var zh = String(item.zh || "");
    if (item.tag && item.tag.indexOf("→") >= 0) {
      return item.tag.split("→")[1].replace(/^僻/, "").trim();
    }
    var m = zh.match(/僻义[：:]([^；;]+)/);
    if (m) return m[1].trim();
    return cleanZh(zh);
  }

  function polysemyCommonZh(item) {
    var zh = String(item.zh || "");
    if (item.tag && item.tag.indexOf("→") >= 0) {
      return item.tag.split("→")[0].replace(/^常/, "").trim();
    }
    var m = zh.match(/常义[：:]([^；;]+)/);
    if (m) return m[1].trim();
    return cleanZh(zh);
  }

  /** 语境释义 · 标准中文答案 */
  function meaningZh(item) {
    if (item.cat === "polysemy") return polysemyRareZh(item);
    if (item.cat === "word-form") return wordFormMeaningZh(item);
    return cleanZh(item.zh);
  }

  function wordFormMeaningZh(item) {
    var ex = String(item.exZh || "");
    var before = ex.split("→")[0] || "";
    var need = before.match(/需填[「"']?(\S+?)[」"']?[。.]?/);
    if (need) return "应填 " + need[1] + "（词性转换）";

    var tail = (ex.match(/→\s*(.+)$/) || [])[1];
    if (tail) {
      tail = tail.trim();
      if (/转化为/.test(tail)) {
        var tgt = tail.match(/转化为\s*(\S+)/);
        if (tgt) return "正确形式：" + tgt[1];
      }
      var cn = tail.replace(/\s+[a-zA-Z][\w\s'-]*$/, "").trim();
      if (cn && cn.indexOf("转化为") < 0) return cn;
    }

    var zm = String(item.zh || "").match(/转化为\s*(\S+)/);
    if (zm) return "正确形式：" + zm[1];
    return formWord(item) + "（词性转换）";
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

  /** 表达匹配 · 标准英文答案 */
  function expressionEn(item) {
    if (item.cat === "word-form") return formWord(item);
    var e = String(item.en || "").trim();
    if (e.indexOf(" → ") >= 0) return e.split(" → ")[1].trim();
    return e.split("/")[0].trim();
  }

  function clozeWord(item) {
    if (item.cat === "word-form") return formWord(item);
    return expressionEn(item);
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

  function mapField(item, field) {
    if (field === "form") return formWord(item);
    if (field === "zh") return meaningZh(item);
    return expressionEn(item);
  }

  function pickField(pool, item, field, n, sameCat, exclude) {
    var exKey = normKey(exclude);
    var src = poolExcept(pool, item);
    if (sameCat) {
      var same = src.filter(function (x) {
        return x.cat === item.cat;
      });
      if (same.length >= Math.max(n, 3)) src = same;
    }

    var out = [];
    var tries = shuffle(src.concat(sameCat ? poolExcept(pool, item) : []));
    tries.forEach(function (x) {
      if (out.length >= n * 5) return;
      var v = mapField(x, field);
      if (!v) return;
      var k = normKey(v);
      if (k === exKey) return;
      if (out.some(function (o) {
        return normKey(o) === k;
      })) {
        return;
      }
      out.push(v);
    });
    return out;
  }

  /** 保证正确答案必在选项中，且最多 4 项（含 1 正确 + 3 干扰） */
  function fourOpts(correct, distractors) {
    correct = String(correct || "").trim();
    if (!correct) return [];

    var seen = new Set();
    var out = [];

    function tryAdd(v) {
      v = String(v || "").trim();
      var k = normKey(v);
      if (!v || seen.has(k)) return;
      seen.add(k);
      out.push(v);
    }

    tryAdd(correct);
    shuffle(distractors || []).forEach(function (d) {
      if (out.length < 4) tryAdd(d);
    });

    if (!out.some(function (o) {
      return normKey(o) === normKey(correct);
    })) {
      out.unshift(correct);
    }

    if (out.length <= 4) return shuffle(out);

    var keep = out.filter(function (o) {
      return normKey(o) === normKey(correct);
    })[0];
    var others = shuffle(
      out.filter(function (o) {
        return normKey(o) !== normKey(correct);
      })
    ).slice(0, 3);
    return shuffle([keep].concat(others));
  }

  function finalizeOpts(correct, distractors, pool, item, field, sameCat) {
    var opts = fourOpts(correct, distractors);
    var guard = 0;
    while (opts.length < 4 && guard < 3) {
      guard++;
      var more = pickField(pool, item, field, 8, guard > 1 ? false : sameCat, correct);
      opts = fourOpts(correct, (distractors || []).concat(more).concat(opts));
    }
    return opts;
  }

  function validateQuestion(q) {
    if (!q || !q.ans) return false;
    if (!Array.isArray(q.opts) || q.opts.length < 2) return false;
    return q.opts.some(function (o) {
      return normKey(o) === normKey(q.ans);
    });
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
    var w = clozeWord(item);
    var dist = pickField(pool, item, item.cat === "word-form" ? "form" : "en", 6, true, w);
    return {
      mode: "cloze",
      modeLabel: "语境填空",
      itemId: item.id,
      cat: item.cat,
      stem: "根据例句与语境，选择最恰当的词填入空格。",
      stemHtml:
        ctxBlock(item) +
        '<p class="vq-ex" lang="en">' +
        blankInExample(item, w) +
        "</p>" +
        exZhHint(item),
      opts: finalizeOpts(w, dist, pool, item, item.cat === "word-form" ? "form" : "en", true),
      ans: w,
      fb: expressionEn(item) + " — " + meaningZh(item),
      tts: item.exEn || item.en,
    };
  }

  function genMeaning(item, pool) {
    var w = item.cat === "word-form" ? formWord(item) : expressionEn(item);
    var ans = meaningZh(item);
    var dist = pickField(pool, item, "zh", 6, item.cat !== "polysemy", ans);
    if (item.cat === "polysemy") {
      dist = uniqPush(dist, [polysemyCommonZh(item), cleanZh(item.zh)]);
    }
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
        "</p>" +
        exZhHint(item),
      opts: finalizeOpts(ans, dist, pool, item, "zh", item.cat !== "polysemy"),
      ans: ans,
      fb: w + " → " + ans,
      tts: item.exEn || item.en,
    };
  }

  function uniqPush(arr, extra) {
    var out = arr.slice();
    extra.forEach(function (v) {
      if (!v) return;
      if (!out.some(function (o) {
        return normKey(o) === normKey(v);
      })) {
        out.push(v);
      }
    });
    return out;
  }

  function genExpression(item, pool) {
    var ans = expressionEn(item);
    var dist = pickField(pool, item, "en", 6, true, ans);
    return {
      mode: "expression",
      modeLabel: "表达匹配",
      itemId: item.id,
      cat: item.cat,
      stem: "根据中文含义与语境提示，选择正确的英文表达。",
      stemHtml:
        ctxBlock(item) +
        '<p class="vq-prompt"><strong>中文：</strong>' +
        esc(meaningZh(item)) +
        "</p>" +
        (item.exEn
          ? '<p class="vq-ex-mini" lang="en">例句参考：' +
            esc(item.exEn).slice(0, 120) +
            (item.exEn.length > 120 ? "…" : "") +
            "</p>"
          : ""),
      opts: finalizeOpts(ans, dist, pool, item, "en", true),
      ans: ans,
      fb: ans + " — " + meaningZh(item),
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
      stemEn = esc(ex).replace(
        new RegExp(escapeReg(f), "i"),
        "(<em>" + esc(b) + "</em>) <span class='vq-blank'>______</span>"
      );
    } else {
      stemEn =
        "The sentence needs the correct form of <em>" +
        esc(b) +
        "</em>: <span class='vq-blank'>______</span>.";
    }
    var dist = uniqPush(pickField(pool, item, "form", 6, true, f), [b, primaryEn(item), baseWord(item)]);
    return {
      mode: "transform",
      modeLabel: "词性转化",
      itemId: item.id,
      cat: item.cat,
      stem: "词性转换：根据例句语境，选择括号单词的正确变形。",
      stemHtml: ctxBlock(item) + '<p class="vq-ex" lang="en">' + stemEn + "</p>" + exZhHint(item),
      opts: finalizeOpts(f, dist, pool, item, "form", true),
      ans: f,
      fb: b + " → " + f + "（" + meaningZh(item) + "）",
      tts: f,
    };
  }

  function genDiscriminate(item, pool) {
    var w = expressionEn(item).split(",")[0].trim();
    var ans;
    var dist;

    if (item.cat === "polysemy" || /僻/.test(String(item.zh) + item.tag)) {
      ans = polysemyRareZh(item);
      dist = uniqPush(pickField(pool, item, "zh", 4, false, ans), [
        polysemyCommonZh(item),
        cleanZh(item.zh),
        w,
      ]);
    } else {
      ans = meaningZh(item);
      dist = pickField(pool, item, "zh", 6, true, ans);
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
      opts: finalizeOpts(ans, dist, pool, item, "zh", item.cat !== "polysemy"),
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
      var q = fn(item, pool);
      if (!validateQuestion(q)) return null;
      return q;
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
    validateQuestion: validateQuestion,
    meaningZh: meaningZh,
    expressionEn: expressionEn,
  };
})(typeof window !== "undefined" ? window : globalThis);
