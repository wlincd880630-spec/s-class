/**
 * DeepSeek：复习加题 + 中考/高考例句 + 讲义例句 / 语法课件生成
 */
(function (global) {
  "use strict";

  var KEY = global.PET_DEEPSEEK_KEY || "sk-daa16008e81843deba6fefe9dce51465";
  var MODEL = "deepseek-v4-flash";
  var HANDOUT_CACHE_VER = 5;
  var BATCH = 6;

  function chat(prompt, maxTokens) {
    return fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + KEY
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.45,
        max_tokens: maxTokens || 4096
      })
    }).then(function (r) {
      if (!r.ok) throw new Error("DeepSeek API " + r.status);
      return r.json();
    }).then(function (data) {
      return (
        (data.choices &&
          data.choices[0] &&
          data.choices[0].message &&
          data.choices[0].message.content) ||
        ""
      );
    });
  }

  function chatRetry(prompt, maxTokens, tries) {
    tries = tries == null ? 2 : tries;
    return chat(prompt, maxTokens).catch(function (err) {
      if (tries <= 1) throw err;
      return new Promise(function (resolve) { setTimeout(resolve, 800); }).then(function () {
        return chatRetry(prompt, maxTokens, tries - 1);
      });
    });
  }

  function stripFence(text) {
    return String(text || "")
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
  }

  function extractBalanced(text, openCh, closeCh, from) {
    var start = text.indexOf(openCh, from || 0);
    if (start < 0) return "";
    var depth = 0;
    var inStr = false;
    var esc = false;
    for (var i = start; i < text.length; i++) {
      var ch = text.charAt(i);
      if (inStr) {
        if (esc) esc = false;
        else if (ch === "\\") esc = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') {
        inStr = true;
        continue;
      }
      if (ch === openCh) depth++;
      else if (ch === closeCh) {
        depth--;
        if (depth === 0) return text.slice(start, i + 1);
      }
    }
    return text.slice(start);
  }

  function repairJson(blob) {
    try {
      return JSON.parse(blob);
    } catch (e1) {}
    blob = String(blob || "").replace(/,\s*([}\]])/g, "$1");
    try {
      return JSON.parse(blob);
    } catch (e2) {}
    var inStr = false;
    var esc = false;
    var stack = [];
    for (var i = 0; i < blob.length; i++) {
      var ch = blob.charAt(i);
      if (inStr) {
        if (esc) esc = false;
        else if (ch === "\\") esc = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') {
        inStr = true;
        continue;
      }
      if (ch === "{") stack.push("}");
      else if (ch === "[") stack.push("]");
      else if ((ch === "}" || ch === "]") && stack.length) stack.pop();
    }
    var extra = "";
    if (inStr) extra += '"';
    blob = blob.replace(/,\s*$/, "");
    while (stack.length) extra += stack.pop();
    return JSON.parse(blob + extra);
  }

  function parseJson(text) {
    var raw = stripFence(text);
    var iObj = raw.indexOf("{");
    var iArr = raw.indexOf("[");
    var blob = "";
    if (iArr >= 0 && (iObj < 0 || iArr < iObj)) blob = extractBalanced(raw, "[", "]");
    else blob = extractBalanced(raw, "{", "}") || extractBalanced(raw, "[", "]");
    if (!blob) throw new Error("DeepSeek 未返回 JSON");
    return repairJson(blob);
  }

  function asArray(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    if (data && Array.isArray(data.points)) return data.points;
    if (data && Array.isArray(data.examples)) return data.examples;
    if (data && Array.isArray(data.exercises)) return data.exercises;
    return [];
  }

  function callDeepSeek(prompt) {
    return chatRetry(prompt, 4096).then(function (text) {
      var arr = asArray(parseJson(text));
      if (!arr.length) throw new Error("DeepSeek 未返回题目数组");
      return arr.map(function (x) {
        var opts = x.options || [];
        var ans = x.answer;
        if (typeof ans === "string" && /^[A-D]$/i.test(ans.trim()) && opts.length) {
          ans = opts[ans.trim().toUpperCase().charCodeAt(0) - 65] || ans;
        }
        return { q: x.q, options: opts, answer: ans, explain: x.explain || "" };
      });
    });
  }

  function extraQuestions(kind, items, count) {
    count = count || 6;
    var list = (items || [])
      .slice(0, 24)
      .map(function (x) {
        return (x.word || x.phrase || x.title) + " = " + (x.meaning || "");
      })
      .join("\n");
    var prompt =
      "你是 PET / 初中英语老师。根据下列单词/词组/语法点，生成 " +
      count +
      " 道中文界面的复习题。\n类型：" +
      kind +
      "\n词表：\n" +
      list +
      "\n\n只返回 JSON 数组，每项：" +
      '{"q":"题干","options":["A","B","C","D"],"answer":"正确选项原文","explain":"一句中文解析"}' +
      "\noptions 必须包含正确答案。不要 markdown。";
    return callDeepSeek(prompt);
  }

  function examSentences(items, exam) {
    var label = exam === "gaokao" ? "中国高考英语（书面表达 / 阅读理解）" : "中国中考英语";
    var list = (items || [])
      .map(function (x) {
        return (x.word || x.phrase || "") + " = " + (x.meaning || "");
      })
      .filter(Boolean)
      .join("\n");
    var prompt =
      "你是高中英语教师。为下列英语词组各写 1 句" +
      label +
      "风格的独立例句（不要课文原句）。\n要求：\n" +
      "1. 句子必须包含该词组，允许合理变形（如 look forward to → looking forward to）。\n" +
      "2. 高考句可稍长、稍正式；中考句简洁地道。\n" +
      "3. 不要抄阅读课文。\n词组：\n" +
      list +
      "\n\n只返回 JSON 数组，每项：" +
      '{"phrase":"词组原文","sentence":"英文例句","trans":"中文翻译"}' +
      "\n不要 markdown。";
    return chatRetry(prompt, 4096).then(function (text) {
      return asArray(parseJson(text)).map(function (x) {
        return {
          phrase: x.phrase || x.word || "",
          sentence: x.sentence || x.en || "",
          trans: x.trans || x.cn || ""
        };
      });
    });
  }

  function chunk(arr, n) {
    var out = [];
    for (var i = 0; i < (arr || []).length; i += n) out.push(arr.slice(i, i + n));
    return out;
  }

  function cacheKey(unitId) {
    return "pet-handout-v" + HANDOUT_CACHE_VER + "-u" + unitId;
  }

  function readCache(unitId) {
    try {
      var data = JSON.parse(localStorage.getItem(cacheKey(unitId)) || "null");
      if (data && data.v === HANDOUT_CACHE_VER) return data;
    } catch (e) {}
    return null;
  }

  function writeCache(unitId, data) {
    try {
      localStorage.setItem(cacheKey(unitId), JSON.stringify(data));
    } catch (e) {}
  }

  function itemBrief(it) {
    return {
      word: it.word || it.phrase || "",
      phonetic: it.phonetic || "",
      cn: it.meaning || "",
      en: it.definitionEn || "",
      usage: String(it.usage || "").slice(0, 160)
    };
  }

  function normalizeExamples(row) {
    var list = (row && row.examples) || [];
    var levels = ["zk", "g10", "g11"];
    var byLevel = {};
    list.forEach(function (ex) {
      if (!ex || !ex.sentence) return;
      var lv = String(ex.level || "").toLowerCase();
      if (lv === "zhongkao" || lv === "junior" || lv === "zk") lv = "zk";
      else if (lv === "g10" || lv === "grade10" || lv === "senior1" || lv === "高一") lv = "g10";
      else if (lv === "g11" || lv === "grade11" || lv === "senior2" || lv === "高二") lv = "g11";
      else if (!byLevel.zk) lv = "zk";
      else if (!byLevel.g10) lv = "g10";
      else lv = "g11";
      byLevel[lv] = {
        level: lv,
        sentence: String(ex.sentence || "").trim(),
        trans: String(ex.trans || ex.translation || "").trim()
      };
    });
    return levels.map(function (lv) {
      return byLevel[lv] || null;
    }).filter(Boolean);
  }

  function localExamples(it) {
    var kept = (it.examples || []).filter(function (e) {
      if (!e || !(e.sentence || e.en)) return false;
      return !/^article$/i.test(String(e.source || ""));
    });
    var levels = ["zk", "g10", "g11"];
    return kept.slice(0, 3).map(function (e, i) {
      return {
        level: levels[i],
        sentence: e.sentence || e.en || "",
        trans: e.trans || e.translation || e.cn || ""
      };
    });
  }

  function lookup(map, word) {
    if (!map || !word) return null;
    return map[word] || map[String(word).toLowerCase()] || null;
  }

  function storeRow(map, word, row) {
    if (!word) return;
    map[word] = row;
    map[String(word).toLowerCase()] = row;
  }

  function enrichExampleBatch(items, kind) {
    var payload = items.map(itemBrief);
    var prompt =
      "你是初高中英语教材编者。为下列" +
      (kind === "phrase" ? "英语词组" : "英语单词") +
      "各写 3 条高质量例句。\n" +
      "直接输出 JSON，不要解释。\n" +
      "硬性要求：\n" +
      "1) 不要改写课文/文章原句，不要出现明显的课文翻译腔。\n" +
      "2) 恰好 3 句：zk=初中中考难度（短、高频搭配、生活场景）；g10=高一难度（稍长，含从句或固定搭配）；g11=高二难度（更地道，有对比/强调/习语等记忆点）。\n" +
      "3) 每句必须自然使用目标词/词组，有真实使用价值和记忆价值。\n" +
      "4) 给出准确中文翻译。保留原词拼写。\n" +
      "词表：\n" +
      JSON.stringify(payload) +
      "\n只返回 JSON 数组，不要 markdown：\n" +
      '[{"word":"原词","examples":[{"level":"zk","sentence":"...","trans":"..."},{"level":"g10","sentence":"...","trans":"..."},{"level":"g11","sentence":"...","trans":"..."}]}]';
    return chatRetry(prompt, 4096).then(function (text) {
      var data = parseJson(text);
      var rows = Array.isArray(data)
        ? data
        : (data && (data.items || data.words)) || (data && data.word ? [data] : []);
      return rows.map(function (row) {
        return {
          word: row.word || row.phrase || "",
          examples: normalizeExamples(row)
        };
      });
    });
  }

  function fallbackGrammar(list) {
    return (list || []).map(function (g) {
      var exercises = (g.quiz || []).map(function (q) {
        return {
          level: "zk",
          type: q.type || (q.options && q.options.length ? "choice" : "fill"),
          q: q.question || q.q || "",
          options: q.options || [],
          answer: q.correct || q.answer || "",
          explain: q.explanation || q.explain || ""
        };
      });
      var examples = (g.examples || []).map(function (e, i) {
        return {
          level: i % 2 ? "gk" : "zk",
          en: e.en || e.sentence || "",
          cn: e.cn || e.trans || ""
        };
      });
      return {
        title: g.title || g.word || "语法点",
        titleEn: "",
        usage: String(g.explanation || "")
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim(),
        forms: [],
        notes: g.tips
          ? [String(g.tips).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()]
          : [],
        examples: examples,
        exercises: exercises
      };
    });
  }

  function mapOutlinePoints(points) {
    return (points || []).map(function (p) {
      return {
        title: p.title || "语法点",
        titleEn: p.titleEn || p.title_en || "",
        usage: p.usage || "",
        forms: p.forms || [],
        notes: p.notes || [],
        examples: p.examples || [],
        exercises: []
      };
    });
  }

  function generateGrammarOutline(bag, count, avoidTitles) {
    var unit = bag.unit || {};
    var words = (bag.vocab || []).slice(0, 16).map(function (x) { return x.word; }).join(", ");
    var phrases = (bag.colloc || []).slice(0, 10).map(function (x) { return x.word; }).join(", ");
    var old = (bag.grammar || []).map(function (g) { return g.title || g.word; }).join("；");
    var avoid = (avoidTitles || []).filter(Boolean).join("；");
    var prompt =
      "你是中考/高考英语语法主编。请为 PET 英语 Unit " +
      unit.id +
      "「" +
      (unit.title || "") +
      " / " +
      (unit.subtitle || "") +
      "」编写 " +
      count +
      " 个独立语法点。\n" +
      "立刻输出 JSON，不要长篇推理。\n" +
      "硬性要求：\n" +
      "1) 不要呈现、引用、改写课文原句；不要出现 source sentence。\n" +
      "2) 必须重写并扩充，不要只重复原课语法标题。可选：时态、情态、被动、定语从句、状语从句、比较、不定式/动名词、条件句、名词性从句、介词/冠词。\n" +
      "3) 每个点 usage 180-260字，含结构、肯定/否定/疑问、易混对比。\n" +
      (avoid ? "4) 不要重复这些标题：" + avoid + "\n" : "") +
      "本单元词： " + words + "\n" +
      "本单元词组： " + phrases + "\n" +
      "原语法标题参考： " + old + "\n" +
      "只返回 JSON 对象：\n" +
      '{"points":[{"title":"中文标题","titleEn":"English title","usage":"详细用法","forms":["公式1","公式2","公式3"],"notes":["易错1","易错2","易错3"],"examples":[{"level":"zk","en":"...","cn":"..."},{"level":"zk","en":"...","cn":"..."},{"level":"gk","en":"...","cn":"..."},{"level":"gk","en":"...","cn":"..."}]}]}';
    return chatRetry(prompt, 8192).then(function (text) {
      var points = mapOutlinePoints(asArray(parseJson(text)));
      if (!points.length) throw new Error("语法讲义为空");
      return points.slice(0, count);
    });
  }

  function generateGrammarExercises(pointsSlice) {
    var brief = pointsSlice.map(function (p) {
      return { title: p.title, titleEn: p.titleEn, usage: String(p.usage || "").slice(0, 140) };
    });
    var prompt =
      "你是中考/高考命题人。为下列语法点各出 8 道练习题，务必丰富、可独立作答（不要依赖某篇课文）。\n" +
      "立刻输出 JSON，不要长篇推理。\n" +
      "每个语法点 8 题：前 4 题 level=zk 中考难度，后 4 题 level=gk 高考难度。\n" +
      "题型 mix：choice / fill / truefalse。choice 给 4 个 options，answer 写选项原文；fill 的 q 用 ____ 表示空；truefalse 的 answer 为 True 或 False。每题带一句中文 explain。\n" +
      "语法点：\n" +
      JSON.stringify(brief) +
      "\n只返回 JSON：\n" +
      '{"items":[{"title":"与上面完全一致的标题","exercises":[{"level":"zk","type":"choice","q":"...","options":["A","B","C","D"],"answer":"...","explain":"..."}]}]}';
    return chatRetry(prompt, 8192).then(function (text) {
      return asArray(parseJson(text));
    });
  }

  function mergeExercises(points, packs) {
    var byTitle = {};
    (packs || []).forEach(function (pack) {
      var t = pack.title || pack.titleEn || "";
      byTitle[t] = pack.exercises || pack.questions || [];
    });
    points.forEach(function (p) {
      var ex = byTitle[p.title] || byTitle[p.titleEn] || [];
      if (ex.length) p.exercises = ex;
    });
    return points;
  }

  function generateGrammar(bag, onProgress, ticker) {
    var points = [];
    onProgress(ticker.msg("正在编写语法讲义（1/2）…"));
    return generateGrammarOutline(bag, 4, [])
      .catch(function () { return []; })
      .then(function (a) {
        ticker.step();
        points = a || [];
        onProgress(ticker.msg("正在编写语法讲义（2/2）…"));
        return generateGrammarOutline(
          bag,
          3,
          points.map(function (p) { return p.title; })
        ).catch(function () { return []; });
      })
      .then(function (b) {
        ticker.step();
        points = points.concat(b || []);
        if (!points.length) return fallbackGrammar(bag.grammar);
        var slices = chunk(points, 2);
        return slices.reduce(function (p, sl, idx) {
          return p.then(function () {
            onProgress(ticker.msg("正在生成语法练习 " + (idx + 1) + "/" + slices.length + "…"));
            return generateGrammarExercises(sl)
              .then(function (pack) {
                mergeExercises(sl, pack);
                ticker.step();
              })
              .catch(function () { ticker.step(); });
          });
        }, Promise.resolve()).then(function () { return points; });
      });
  }

  function applyEnrichment(bag, data) {
    data = data || {};
    function mergeList(list, map) {
      (list || []).forEach(function (it) {
        var row = lookup(map, it.word);
        var generated = row && row.examples ? row.examples : [];
        it.handoutExamples = generated.length ? generated : localExamples(it);
      });
    }
    mergeList(bag.vocab, data.vocab || {});
    mergeList(bag.colloc, data.colloc || {});
    bag.handoutGrammar =
      data.grammar && data.grammar.length ? data.grammar : fallbackGrammar(bag.grammar);
    bag.handoutFromCache = !!data.fromCache;
    return bag;
  }

  function makeTicker(total) {
    var n = 0;
    return {
      total: total,
      step: function () {
        n++;
      },
      msg: function (text) {
        return text + "  (" + Math.min(n + 1, total) + "/" + total + ")";
      }
    };
  }

  function generateHandout(bag, onProgress) {
    onProgress = onProgress || function () {};
    var vocabChunks = chunk(bag.vocab, BATCH);
    var collocChunks = chunk(bag.colloc, BATCH);
    var total = vocabChunks.length + collocChunks.length + 6;
    var ticker = makeTicker(total);
    var vocabMap = {};
    var collocMap = {};

    function runChunks(chunks, kind, map, label) {
      return chunks.reduce(function (p, items, idx) {
        return p.then(function () {
          onProgress(
            ticker.msg("正在生成" + label + "例句 " + (idx + 1) + "/" + chunks.length + "…")
          );
          return enrichExampleBatch(items, kind)
            .then(function (arr) {
              (arr || []).forEach(function (row) {
                if (row && row.word) storeRow(map, row.word, row);
              });
              ticker.step();
            })
            .catch(function () {
              ticker.step();
            });
        });
      }, Promise.resolve());
    }

    return runChunks(vocabChunks, "vocab", vocabMap, "词汇")
      .then(function () {
        return runChunks(collocChunks, "phrase", collocMap, "词组");
      })
      .then(function () {
        return generateGrammar(bag, onProgress, ticker);
      })
      .then(function (grammar) {
        return {
          v: HANDOUT_CACHE_VER,
          vocab: vocabMap,
          colloc: collocMap,
          grammar: grammar
        };
      });
  }

  function padUnit(id) {
    var n = Number(id) || 0;
    return n < 10 ? "0" + n : String(n);
  }

  function shuffle(arr) {
    var a = (arr || []).slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function sampleByLevel(list, n, diversifyType) {
    if (!n || n <= 0) return list || [];
    var by = {};
    (list || []).forEach(function (row) {
      var lv = String(row.level || "");
      if (!by[lv]) by[lv] = [];
      by[lv].push(row);
    });
    var out = [];
    Object.keys(by).forEach(function (lv) {
      var pool = by[lv];
      if (pool.length <= n) {
        out = out.concat(pool);
        return;
      }
      var picked = [];
      var used = {};
      if (diversifyType) {
        ["choice", "fill", "truefalse", "rewrite", "error"].forEach(function (t) {
          if (picked.length >= n) return;
          var hit = shuffle(pool.filter(function (x) {
            return x.type === t && !used[x.q];
          }))[0];
          if (hit) {
            used[hit.q] = true;
            picked.push(hit);
          }
        });
      }
      shuffle(pool).forEach(function (x) {
        if (picked.length >= n) return;
        if (used[x.q]) return;
        used[x.q] = true;
        picked.push(x);
      });
      out = out.concat(picked);
    });
    return out;
  }

  function filterByLevels(list, levels) {
    if (levels == null) return list || [];
    if (!levels.length) return [];
    return (list || []).filter(function (row) {
      return levels.indexOf(String(row.level || "")) !== -1;
    });
  }

  function applyStaticHandout(bag, data, filters) {
    data = data || {};
    filters = filters || {};
    var exLv = filters.exampleLevels;
    var grLv = filters.grammarLevels;
    function mergeList(items, map) {
      (items || []).forEach(function (it) {
        var row = lookup(map, it.word) || lookup(map, it.phrase);
        if (!row) {
          it.handoutExamples = localExamples(it);
          return;
        }
        it.usageZh = row.usageZh || "";
        it.family = row.family || [];
        it.handoutExamples = sampleByLevel(filterByLevels(row.examples, exLv), filters.examplePerLevel);
      });
    }
    mergeList(bag.vocab, data.vocab || {});
    mergeList(bag.colloc, data.colloc || {});
    bag.handoutGrammar = (data.grammar || []).map(function (g) {
      return {
        title: g.title,
        titleEn: g.titleEn || "",
        usage: g.usage || "",
        forms: g.forms || [],
        notes: g.notes || [],
        examples: sampleByLevel(filterByLevels(g.examples, exLv), filters.examplePerLevel),
        exercises: sampleByLevel(filterByLevels(g.exercises, grLv), filters.exercisePerLevel, true)
      };
    });
    if (!bag.handoutGrammar.length) {
      bag.handoutGrammar = fallbackGrammar(bag.grammar);
    }
    bag.handoutFromCache = true;
    return bag;
  }

  function enrichHandout(bag, opts) {
    opts = opts || {};
    var onProgress = opts.onProgress || function () {};
    onProgress("正在载入已预生成的讲义…");
    return fetch("data/handouts/u" + padUnit(bag.unit.id) + ".json")
      .then(function (r) {
        if (!r.ok) throw new Error("讲义数据 " + r.status);
        return r.json();
      })
      .then(function (data) {
        applyStaticHandout(bag, data, opts.filters);
        onProgress("已载入预生成讲义，可按所选级别导出。");
        return bag;
      })
      .catch(function (err) {
        applyEnrichment(bag, { vocab: {}, colloc: {}, grammar: [] });
        bag.handoutWarning = (err && err.message) || "未找到预生成讲义";
        return bag;
      });
  }

  global.PETStudio.aiExtra = extraQuestions;
  global.PETStudio.aiExamSentences = examSentences;
  global.PETStudio.enrichHandout = enrichHandout;
  global.PETStudio.applyHandoutFallback = function (bag) {
    return applyEnrichment(bag, { vocab: {}, colloc: {}, grammar: [] });
  };
  global.PETStudio.HANDOUT_CACHE_VER = HANDOUT_CACHE_VER;
})(window);
