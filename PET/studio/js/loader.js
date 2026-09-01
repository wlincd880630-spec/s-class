/**
 * 加载单元 vocabulary / collocations / grammar / 文章句子
 */
(function (global) {
  "use strict";

  function fetchJson(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + " " + r.status);
      return r.json();
    });
  }

  function fetchText(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + " " + r.status);
      return r.text();
    });
  }

  function parsePassages(html) {
    var m = html.match(/lessonData:\s*(\[[\s\S]*?\])\s*,\s*currentPassageIdx/);
    if (!m) return [];
    try {
      return JSON.parse(m[1]);
    } catch (e) {
      return [];
    }
  }

  function normalizeItem(item, lesson, kind) {
    var word = item.word || item.phrase || item.title || "";
    return {
      kind: kind,
      lesson: lesson,
      word: word,
      phrase: item.phrase || "",
      title: item.title || "",
      phonetic: item.phonetic || "",
      meaning: item.correct_answer || item.definition_cn || "",
      definitionEn: item.definition_en || "",
      usage: item.usage || "",
      examples: item.examples || [],
      options: item.options || [],
      quizFill: item.quiz_fill || [],
      imageFile: item.image_file || "",
      imageUrl: item.image_file ? PETStudio.lessonImageUrl(lesson, item.image_file) : "",
      explanation: item.explanation || "",
      sourceSentence: item.source_sentence || "",
      sourceSentenceCn: item.source_sentence_cn || "",
      guide: item.guide_questions || [],
      quiz: item.quiz_questions || [],
      tips: item.zhongkao_tips || ""
    };
  }

  function loadLesson(lesson) {
    return fetchJson("../" + lesson + "/course_data.json").then(function (data) {
      var vocab = (data.vocabulary || []).map(function (x) { return normalizeItem(x, lesson, "vocab"); });
      var colloc = (data.collocations || []).map(function (x) { return normalizeItem(x, lesson, "phrase"); });
      var grammar = (data.grammar || []).map(function (x) { return normalizeItem(x, lesson, "grammar"); });
      return { lesson: lesson, vocab: vocab, colloc: colloc, grammar: grammar };
    });
  }

  function loadUnit(unitId) {
    var unit = PETStudio.getUnit(unitId);
    var jobs = unit.lessons.map(loadLesson);
    var passUrl = "../Unit" + unit.id + "_passage/Unit" + unit.id + "_passage.html";
    return Promise.all(jobs.concat([fetchText(passUrl).catch(function () { return ""; })])).then(function (parts) {
      var lessons = parts.slice(0, unit.lessons.length);
      var html = parts[parts.length - 1] || "";
      var passages = typeof html === "string" ? parsePassages(html) : [];
      var bag = { unit: unit, vocab: [], colloc: [], grammar: [], passages: passages, lessons: lessons };
      lessons.forEach(function (L) {
        bag.vocab = bag.vocab.concat(L.vocab);
        bag.colloc = bag.colloc.concat(L.colloc);
        bag.grammar = bag.grammar.concat(L.grammar);
      });
      return bag;
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickN(arr, n) {
    return shuffle(arr).slice(0, Math.min(n, arr.length));
  }

  function distractors(pool, correct, n) {
    var out = [];
    shuffle(pool).forEach(function (x) {
      if (x !== correct && out.indexOf(x) === -1) out.push(x);
    });
    return out.slice(0, n);
  }

  global.PETStudio.loadUnit = loadUnit;
  global.PETStudio.shuffle = shuffle;
  global.PETStudio.pickN = pickN;
  global.PETStudio.distractors = distractors;
})(window);
