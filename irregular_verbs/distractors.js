/**
 * Verb Atlas · 高迷惑选项与字母池引擎
 *
 * 选择题以「看起来像同一词的错误拼写」为主：
 * hang → hung / hong / hant / hune
 *
 * 需在 verbs-data.js、shared.js 之后加载。
 */
(function (global) {
  "use strict";

  var U = global.IrregularVerbsUtil;
  var DATA = global.IRREGULAR_VERBS_DATA;
  var FIELDS = ["past", "pp"];
  var VOWELS = "aeiou";
  var CONFUSABLE_LETTERS = {
    a: "eou",
    b: "pd",
    c: "ks",
    d: "bt",
    e: "ai",
    f: "vph",
    g: "jq",
    h: "nf",
    i: "eyu",
    j: "gi",
    k: "cg",
    l: "ir",
    m: "nw",
    n: "mh",
    o: "au",
    p: "bf",
    q: "gk",
    r: "ln",
    s: "cz",
    t: "d",
    u: "aoi",
    v: "fw",
    w: "vm",
    x: "ks",
    y: "ie",
    z: "s",
  };
  var VOWEL_SWAPS = {
    a: ["e", "u", "o", "ai"],
    e: ["a", "i", "ea"],
    i: ["e", "a", "u", "ie"],
    o: ["a", "u", "e", "oa"],
    u: ["o", "a", "i", "ou"],
    y: ["i", "ie"],
    ai: ["ei", "ay", "a"],
    ay: ["ey", "ai"],
    ea: ["ee", "ae", "ie"],
    ee: ["ea", "ie"],
    ie: ["ei", "ee"],
    oa: ["o", "ou"],
    oo: ["oa", "ou", "u"],
    ou: ["ow", "oo", "au"],
    ow: ["ew", "aw", "ou"],
    aw: ["ow", "au"],
    ew: ["ow", "ue"],
    ue: ["ew", "u"],
  };
  var ENDING_SWAPS = [
    [/ung$/, ["ong", "ang", "ant", "une", "und", "ank"]],
    [/ang$/, ["ung", "ong", "ant", "ane"]],
    [/ank$/, ["unk", "anked", "unct"]],
    [/unk$/, ["ank", "onk", "unct"]],
    [/ing$/, ["ang", "ung", "ong", "ought"]],
    [/oke$/, ["eak", "ook", "oken", "oked"]],
    [/oken$/, ["oke", "eaken", "okened"]],
    [/ook$/, ["aked", "oken", "uke", "eak"]],
    [/ew$/, ["ow", "own", "ewed"]],
    [/own$/, ["ew", "owen", "ewn"]],
    [/ewn$/, ["own", "ewed"]],
    [/ought$/, ["aught", "oughted", "out"]],
    [/aught$/, ["ought", "aut", "aughted"]],
    [/ame$/, ["ome", "omed", "aim"]],
    [/ome$/, ["ame", "omed"]],
    [/ore$/, ["ear", "orn", "ored"]],
    [/orn$/, ["ore", "earn", "orned"]],
    [/elt$/, ["elted", "old", "ilt"]],
    [/old$/, ["elt", "olded"]],
    [/ept$/, ["eeped", "epted", "apt"]],
    [/ent$/, ["ented", "int", "ant"]],
    [/en$/, ["an", "un", "in", "ed"]],
    [/ed$/, ["id", "t", "en"]],
    [/t$/, ["ed", "te", "d"]],
    [/d$/, ["t", "ed"]],
    [/g$/, ["t", "e", "d", "k"]],
    [/n$/, ["m", "t", "ne"]],
    [/e$/, ["t", "n", "ed"]],
  ];

  if (!U || !DATA || !Array.isArray(DATA.verbs)) {
    throw new Error("IrregularVerbsDistractors requires IrregularVerbsUtil and IRREGULAR_VERBS_DATA");
  }

  var verbs = U.getAllVerbs();
  var allRealForms = buildRealFormMap();

  function normalize(value) {
    return U.normalizeForm(value);
  }

  function resolveVerb(verb) {
    var index;
    var needle;
    if (verb && typeof verb === "object") return verb;
    if (typeof verb !== "string") return null;
    if (U.getVerbById(verb)) return U.getVerbById(verb);
    needle = normalize(verb);
    for (index = 0; index < verbs.length; index += 1) {
      if (normalize(verbs[index].base) === needle) return verbs[index];
    }
    return null;
  }

  function isField(field) {
    return field === "past" || field === "pp";
  }

  function formsFor(verb, field) {
    var values;
    if (!verb || !isField(field)) return [];
    if (verb.id === "can" && field === "pp") return [];
    values = U.splitForms(verb[field]);
    if (verb.id === "be" && field === "past") {
      values.sort(function (left, right) {
        return normalize(left) === "was" ? -1 : normalize(right) === "was" ? 1 : 0;
      });
    }
    return values;
  }

  function preferredForm(forms, opts) {
    var preferred;
    var index;
    var key;
    if (!forms.length) return null;
    opts = opts || {};
    if (typeof opts === "string") opts = { variant: opts };

    preferred = opts.variant || opts.preferred || opts.prefer || opts.answer;
    if (preferred) {
      key = normalize(preferred);
      for (index = 0; index < forms.length; index += 1) {
        if (normalize(forms[index]) === key) return forms[index];
      }
    }
    if (typeof opts.index === "number" && forms[opts.index]) return forms[opts.index];
    if (opts.preferWere && forms.length > 1) {
      for (index = 0; index < forms.length; index += 1) {
        if (normalize(forms[index]) === "were") return forms[index];
      }
    }
    if (opts.subject && /^(you|we|they)$/i.test(String(opts.subject)) && forms.length > 1) {
      for (index = 0; index < forms.length; index += 1) {
        if (normalize(forms[index]) === "were") return forms[index];
      }
    }
    if (opts.random && forms.length > 1) return U.pickRandom(forms, 1)[0];
    return forms[0];
  }

  function canonical(verb, field, opts) {
    var item = resolveVerb(verb);
    if (!item || !isField(field)) return null;
    return preferredForm(formsFor(item, field), opts);
  }

  function buildRealFormMap() {
    var map = {};
    verbs.forEach(function (verb) {
      ["base", "past", "pp"].forEach(function (field) {
        var values = field === "base" ? [verb.base] : formsFor(verb, field);
        values.forEach(function (value) {
          map[normalize(value)] = true;
        });
      });
    });
    return map;
  }

  function acceptedMap(verb, field) {
    var map = {};
    formsFor(verb, field).forEach(function (form) {
      map[normalize(form)] = true;
    });
    return map;
  }

  function commonSuffixLength(left, right) {
    var a = String(left || "").toLowerCase();
    var b = String(right || "").toLowerCase();
    var count = 0;
    while (
      count < a.length &&
      count < b.length &&
      a.charAt(a.length - 1 - count) === b.charAt(b.length - 1 - count)
    ) {
      count += 1;
    }
    return count;
  }

  function commonPrefixLength(left, right) {
    var a = String(left || "").toLowerCase();
    var b = String(right || "").toLowerCase();
    var count = 0;
    while (count < a.length && count < b.length && a.charAt(count) === b.charAt(count)) {
      count += 1;
    }
    return count;
  }

  function editDistance(left, right) {
    var a = String(left || "").toLowerCase();
    var b = String(right || "").toLowerCase();
    var previous = [];
    var current;
    var row;
    var column;
    for (column = 0; column <= b.length; column += 1) previous[column] = column;
    for (row = 1; row <= a.length; row += 1) {
      current = [row];
      for (column = 1; column <= b.length; column += 1) {
        current[column] = Math.min(
          current[column - 1] + 1,
          previous[column] + 1,
          previous[column - 1] + (a.charAt(row - 1) === b.charAt(column - 1) ? 0 : 1)
        );
      }
      previous = current;
    }
    return previous[b.length];
  }

  function looksEnglish(word) {
    var value = String(word || "").toLowerCase();
    if (value.length < 2 || value.length > 12) return false;
    if (!/^[a-z]+$/.test(value)) return false;
    if (!/[aeiouy]/.test(value)) return false;
    if (/[^aeiouy]{3,}/.test(value) && !/^(sch|scr|spl|spr|str|thr|shr)/.test(value)) return false;
    if (/[hqjx]{2}|hg|mg|qg|pf|bv|kd|gk|nk$g/.test(value)) return false;
    return true;
  }

  function regularizedForms(base) {
    var word = String(base || "").toLowerCase().replace(/[^a-z]/g, "");
    var values = [];
    var seen = {};

    function add(value) {
      var key = normalize(value);
      if (!value || seen[key] || allRealForms[key]) return;
      seen[key] = true;
      values.push(value);
    }

    if (!word) return values;
    if (/[^aeiou]y$/.test(word)) add(word.slice(0, -1) + "ied");
    if (/e$/.test(word)) add(word + "d");
    add(word + "ed");
    add(word + "en");
    add(word + "t");
    return values;
  }

  function applyPatternToBase(base, field) {
    var word = String(base || "").toLowerCase();
    var values = [];

    function add(value) {
      if (looksEnglish(value)) values.push(value);
    }

    if (!word) return values;
    if (/ink$/.test(word)) add(word.replace(/ink$/, "ank"));
    if (/ing$/.test(word)) {
      add(word.replace(/ing$/, "ang"));
      add(word.replace(/ing$/, "ung"));
    }
    if (/im$/.test(word)) add(word.replace(/im$/, "am"));
    if (/in$/.test(word)) add(word.replace(/in$/, "an"));
    if (/ake$/.test(word)) add(word.replace(/ake$/, field === "pp" ? "aken" : "oke"));
    if (/eak$/.test(word)) add(word.replace(/eak$/, field === "pp" ? "oken" : "oke"));
    if (/ive$/.test(word)) add(word.replace(/ive$/, field === "pp" ? "iven" : "ave"));
    if (/ow$/.test(word)) add(word.replace(/ow$/, field === "pp" ? "own" : "ew"));
    if (/aw$/.test(word)) add(word.replace(/aw$/, field === "pp" ? "awn" : "ew"));
    if (/ay$/.test(word)) add(word.replace(/ay$/, "aid"));
    if (/ell$/.test(word)) add(word.replace(/ell$/, "old"));
    if (/ee[pd]$/.test(word)) add(word.replace(/ee([pd])$/, "e$1t"));
    if (/i(.)e$/.test(word)) add(word.replace(/i(.)e$/, "o$1e"));
    if (/ea(.)/.test(word)) add(word.replace(/ea(.)/, "o$1e"));
    if (field === "pp") {
      add(word + "en");
      add(word.replace(/e$/, "") + "en");
      add(word + "n");
    }
    regularizedForms(word).forEach(add);
    return values;
  }

  function mutateVowels(word) {
    var value = String(word || "").toLowerCase();
    var values = [];
    var clusters = [];
    var expression = /[aeiouy]{1,2}/g;
    var match;

    while ((match = expression.exec(value))) {
      clusters.push({ start: match.index, text: match[0] });
    }
    clusters.forEach(function (cluster) {
      var swaps = VOWEL_SWAPS[cluster.text] || [];
      swaps.forEach(function (swap) {
        values.push(value.slice(0, cluster.start) + swap + value.slice(cluster.start + cluster.text.length));
      });
    });
    return values;
  }

  function mutateEndings(word) {
    var value = String(word || "").toLowerCase();
    var values = [];
    ENDING_SWAPS.forEach(function (pair) {
      if (pair[0].test(value)) {
        pair[1].forEach(function (ending) {
          values.push(value.replace(pair[0], ending));
        });
      }
    });
    return values;
  }

  function mutateLetters(word) {
    var value = String(word || "").toLowerCase();
    var values = [];
    var index;
    var letter;
    var swaps;
    var swapIndex;
    for (index = 0; index < value.length; index += 1) {
      letter = value.charAt(index);
      swaps = (CONFUSABLE_LETTERS[letter] || "").split("");
      for (swapIndex = 0; swapIndex < swaps.length; swapIndex += 1) {
        values.push(value.slice(0, index) + swaps[swapIndex] + value.slice(index + 1));
      }
      if (index > 0) {
        values.push(
          value.slice(0, index - 1) +
            value.charAt(index) +
            value.charAt(index - 1) +
            value.slice(index + 1)
        );
      }
    }
    if (value.length > 3) values.push(value.slice(0, -1));
    values.push(value + "e");
    values.push(value + "t");
    values.push(value + "n");
    return values;
  }

  function vowelSignature(word) {
    return String(word || "").toLowerCase().replace(/[^aeiouy]/g, "");
  }

  function consonantSkeleton(word) {
    return String(word || "").toLowerCase().replace(/[aeiouy]/g, "");
  }

  function inventedScore(target, candidate, kind) {
    var distance = editDistance(target, candidate);
    var prefix = commonPrefixLength(target, candidate);
    var suffix = commonSuffixLength(target, candidate);
    var lengthDelta = Math.abs(target.length - candidate.length);
    var score = 0;
    if (target.charAt(0) === candidate.charAt(0)) score += 10;
    if (prefix >= 2 && prefix < target.length) score += 6;
    if (consonantSkeleton(target) === consonantSkeleton(candidate)) score += 18;
    if (lengthDelta === 0) score += 10;
    else if (lengthDelta === 1) score += 3;
    if (candidate === target + "e" || candidate === target + "d" || candidate === target + "n") score -= 8;
    if (distance === 1) score += 8;
    else if (distance === 2) score += 12;
    else if (distance === 3) score += 7;
    else score -= distance;
    if (vowelSignature(target) !== vowelSignature(candidate)) score += 8;
    if (kind === "vowel") score += 16;
    if (kind === "ending") score += 15;
    if (kind === "pattern") score += 8;
    if (kind === "letter") score -= 8;
    if (
      target !== candidate &&
      String(target).toLowerCase().split("").sort().join("") ===
        String(candidate).toLowerCase().split("").sort().join("")
    ) {
      score -= 20;
    }
    score += Math.min(suffix, 2);
    if (allRealForms[normalize(candidate)]) score -= 2;
    if (!looksEnglish(candidate)) score -= 30;
    return score;
  }

  function inventLookalikes(target, opts) {
    var word = String(target || "").toLowerCase();
    var blocked = {};
    var seen = {};
    var pool = [];
    opts = opts || {};

    function block(value) {
      var key = normalize(value);
      if (key) blocked[key] = true;
    }

    function add(value, kind) {
      var clean = String(value || "").toLowerCase();
      var key = normalize(clean);
      if (!looksEnglish(clean) || blocked[key] || seen[key]) return;
      seen[key] = true;
      pool.push({ word: clean, kind: kind || "letter" });
    }

    (opts.exclude || []).forEach(block);
    block(word);

    mutateVowels(word).forEach(function (value) { add(value, "vowel"); });
    mutateEndings(word).forEach(function (value) { add(value, "ending"); });
    applyPatternToBase(opts.base || word, opts.field).forEach(function (value) { add(value, "pattern"); });
    regularizedForms(opts.base || word).forEach(function (value) { add(value, "pattern"); });
    mutateLetters(word).forEach(function (value) { add(value, "letter"); });

    pool.sort(function (left, right) {
      return (
        inventedScore(word, right.word, right.kind) - inventedScore(word, left.word, left.kind) ||
        left.word.localeCompare(right.word)
      );
    });
    return pool.map(function (item) { return item.word; });
  }

  function categoryFor(record) {
    if (record.invented) return 0;
    if (record.sameVerbOther) return 1;
    if (record.suffixLength >= 2) return 2;
    if (record.distance <= 2) return 3;
    if (record.lengthDelta <= 1) return 4;
    if (record.regularized) return 5;
    if (record.sameGroup) return 6;
    return 7;
  }

  function compareRecords(left, right) {
    var difference = left.category - right.category;
    if (difference) return difference;
    difference = (right.inventedScore || 0) - (left.inventedScore || 0);
    if (difference) return difference;
    difference = right.suffixLength - left.suffixLength;
    if (difference) return difference;
    difference = left.distance - right.distance;
    if (difference) return difference;
    difference = left.lengthDelta - right.lengthDelta;
    if (difference) return difference;
    difference = right.fieldMatch - left.fieldMatch;
    if (difference) return difference;
    difference = right.sameGroup - left.sameGroup;
    if (difference) return difference;
    return left.word < right.word ? -1 : left.word > right.word ? 1 : 0;
  }

  function rankedRecords(verb, field, opts) {
    var item = resolveVerb(verb);
    var target = canonical(item, field, opts && opts.canonicalOptions);
    var accepted;
    var targetGroup;
    var records = [];
    var otherField;
    var exclude = [];

    if (!item || !target) return records;
    accepted = acceptedMap(item, field);
    targetGroup = U.getVerbGroup(item);
    otherField = field === "past" ? "pp" : "past";
    Object.keys(accepted).forEach(function (key) {
      exclude.push(key);
    });
    if (opts && opts.excludePrompt) exclude.push(item.base);

    function add(word, sourceVerb, sourceField, flags) {
      var clean = String(word || "").trim();
      var key = normalize(clean);
      var record;
      if (!clean || accepted[key]) return;
      flags = flags || {};
      record = {
        word: clean,
        sourceVerb: sourceVerb || null,
        sourceField: sourceField || null,
        invented: !!flags.invented,
        inventedScore: flags.inventedScore || 0,
        sameVerbOther: !!flags.sameVerbOther,
        regularized: !!flags.regularized,
        suffixLength: commonSuffixLength(target, clean),
        distance: editDistance(target, clean),
        lengthDelta: Math.abs(target.length - clean.length),
        fieldMatch: sourceField === field ? 1 : 0,
        sameGroup: sourceVerb && U.getVerbGroup(sourceVerb) === targetGroup ? 1 : 0,
      };
      record.category = categoryFor(record);
      records.push(record);
    }

    inventLookalikes(target, {
      base: item.base,
      field: field,
      exclude: exclude,
    }).forEach(function (form, index) {
      add(form, null, null, {
        invented: true,
        inventedScore: 1000 - index,
      });
    });

    formsFor(item, otherField).forEach(function (form) {
      add(form, item, otherField, { sameVerbOther: true });
    });

    verbs.forEach(function (candidateVerb) {
      if (candidateVerb.id === item.id) return;
      formsFor(candidateVerb, field).forEach(function (form) {
        add(form, candidateVerb, field);
      });
      formsFor(candidateVerb, otherField).forEach(function (form) {
        add(form, candidateVerb, otherField);
      });
    });

    regularizedForms(item.base).forEach(function (form) {
      add(form, null, null, { regularized: true });
    });

    records.sort(compareRecords);
    return records;
  }

  function uniqueWords(records) {
    var seen = {};
    var words = [];
    records.forEach(function (record) {
      var key = normalize(record.word);
      if (seen[key]) return;
      seen[key] = true;
      words.push(record.word);
    });
    return words;
  }

  function rankDistractors(verb, field, opts) {
    return uniqueWords(rankedRecords(verb, field, opts));
  }

  function pickMixedDistractors(verb, field, count, opts) {
    var records = rankedRecords(verb, field, opts);
    var invented = [];
    var sameOther = [];
    var others = [];
    var picked = [];
    var seen = {};

    function take(list) {
      list.forEach(function (record) {
        var key = normalize(record.word);
        if (picked.length >= count || seen[key]) return;
        seen[key] = true;
        picked.push(record.word);
      });
    }

    records.forEach(function (record) {
      if (record.invented) invented.push(record);
      else if (record.sameVerbOther) sameOther.push(record);
      else others.push(record);
    });

    if (opts && opts.preferOtherWords) {
      take(invented);
      take(others);
      take(sameOther);
    } else {
      take(sameOther);
      take(invented);
      take(others);
    }
    return picked.slice(0, count);
  }

  function questionResult(type, verb, field, correct, distractors, optionCount, extra) {
    var options = [correct].concat(distractors);
    var question = {
      type: type,
      verb: verb,
      base: verb.base,
      cn: verb.cn,
      field: field,
      correct: correct,
      distractors: distractors.slice(),
      options: U.shuffle(options),
      optionCount: optionCount,
    };
    Object.keys(extra || {}).forEach(function (key) {
      question[key] = extra[key];
    });
    assertSingleCorrect(question);
    return question;
  }

  function createChoiceQuestion(config) {
    var item;
    var field;
    var count;
    var correct;
    var distractors;
    config = config || {};
    item = resolveVerb(config.verb);
    field = config.field;
    count = Math.max(2, Math.floor(Number(config.optionCount) || 4));
    correct = canonical(item, field, config.canonicalOptions);
    if (!item || !correct) return null;
    distractors = pickMixedDistractors(item, field, count - 1, {
      canonicalOptions: config.canonicalOptions,
      excludePrompt: config.excludePrompt,
      preferOtherWords: !!config.preferOtherWords,
    });
    if (distractors.length !== count - 1) {
      throw new Error("Not enough unique distractors for " + item.id + "." + field);
    }
    return questionResult("choice", item, field, correct, distractors, count);
  }

  function isAAA(verb) {
    var base = normalize(verb.base);
    return (
      formsFor(verb, "past").length === 1 &&
      formsFor(verb, "pp").length === 1 &&
      normalize(formsFor(verb, "past")[0]) === base &&
      normalize(formsFor(verb, "pp")[0]) === base
    );
  }

  function createChineseQuestion(config) {
    var item;
    var field;
    var count;
    var correct;
    var distractors;
    config = config || {};
    item = resolveVerb(config.verb);
    field = config.field;
    count = Math.max(2, Math.floor(Number(config.optionCount) || 4));
    if (!item || !isField(field) || (item.id === "can" && field === "pp")) {
      return null;
    }
    if (isAAA(item) && count < 3) return null;
    correct = canonical(item, field);
    distractors = pickMixedDistractors(item, field, count - 1, {
      inventedCount: Math.max(1, count - 2),
      otherWordCount: 1,
    });
    if (!correct || distractors.length !== count - 1) return null;
    return questionResult("chinese", item, field, correct, distractors, count);
  }

  function createGapQuestion(config) {
    var item;
    var field;
    var correct;
    var distractors;
    config = config || {};
    item = resolveVerb(config.verb);
    field = config.field;
    correct = config.answer || canonical(item, field, config.canonicalOptions);
    if (!item || !correct) return null;
    distractors = pickMixedDistractors(item, field, 4, {
      canonicalOptions: config.canonicalOptions,
      preferOtherWords: true,
    });
    if (distractors.length !== 4) {
      throw new Error("Not enough gap distractors for " + item.id);
    }
    return questionResult("gap", item, field, correct, distractors, 5);
  }

  function uniqueStrings(values) {
    var seen = {};
    return (values || []).filter(function (value) {
      var key = normalize(value);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function createIdentityQuestion(config) {
    var item;
    var field;
    var form;
    var example;
    var baseOptions;
    var meaningOptions;
    var baseFakes;
    config = config || {};
    item = resolveVerb(config.verb);
    field = config.field;
    if (!item || !isField(field) || (item.id === "can" && field === "pp")) return null;
    form = canonical(item, field, config.canonicalOptions);
    example = U.getLeveledExample(item, field, config.levelId);
    if (!form || !example || !example.en) return null;
    baseFakes = inventLookalikes(item.base, {
      base: item.base,
      field: "past",
      exclude: [item.base, form],
    }).slice(0, 2);
    baseOptions = uniqueStrings([item.base].concat(baseFakes).concat(
      verbs
        .filter(function (candidate) { return candidate.id !== item.id; })
        .map(function (candidate) { return candidate.base; })
    )).slice(0, 4);
    if (baseOptions.length < 4) return null;
    meaningOptions = uniqueStrings([item.cn].concat(
      verbs
        .filter(function (candidate) { return candidate.id !== item.id; })
        .map(function (candidate) { return candidate.cn; })
    ));
    meaningOptions = [item.cn].concat(
      U.pickRandom(
        meaningOptions.filter(function (value) { return normalize(value) !== normalize(item.cn); }),
        3
      )
    );
    if (meaningOptions.length < 4) return null;
    return {
      type: "identity",
      verb: item,
      base: item.base,
      cn: item.cn,
      field: field,
      correct: form,
      form: form,
      example: example,
      levelId: config.levelId || U.getSelectedGrade(),
      baseOptions: U.shuffle(baseOptions.slice(0, 4)),
      meaningOptions: U.shuffle(meaningOptions.slice(0, 4)),
    };
  }

  function lettersOf(value) {
    return String(value || "").toLowerCase().match(/[a-z]/g) || [];
  }

  function letterCounts(letters) {
    var counts = {};
    letters.forEach(function (letter) {
      var key = String(letter).toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }

  function canSpell(word, letters) {
    var needed = letterCounts(lettersOf(word));
    var available = letterCounts(Array.isArray(letters) ? letters : lettersOf(letters));
    var key;
    for (key in needed) {
      if (Object.prototype.hasOwnProperty.call(needed, key) && needed[key] > (available[key] || 0)) {
        return false;
      }
    }
    return true;
  }

  function signature(word) {
    return lettersOf(word).sort().join("");
  }

  function letterBlockers(target) {
    var targetLetters = lettersOf(target);
    var targetKey = normalize(target);
    var targetSignature = signature(target);
    var seen = {};
    var blockers = [];

    verbs.forEach(function (verb) {
      FIELDS.forEach(function (field) {
        formsFor(verb, field).forEach(function (form) {
          var key = normalize(form);
          if (
            key === targetKey ||
            lettersOf(form).length !== targetLetters.length ||
            signature(form) === targetSignature ||
            seen[key]
          ) {
            return;
          }
          seen[key] = true;
          blockers.push(form);
        });
      });
    });
    return blockers;
  }

  function keepsPoolSafe(pool, letter, blockers) {
    var proposed = pool.concat([letter]);
    var index;
    for (index = 0; index < blockers.length; index += 1) {
      if (canSpell(blockers[index], proposed)) return false;
    }
    return true;
  }

  function randomAlphabet() {
    return U.shuffle("etaoinshrdlucmfwypvbgkjqxz".split(""));
  }

  function buildLetterPool(verb, field, target, mode) {
    var targetLetters = lettersOf(target);
    var pool;
    var blockers;
    var extras;
    var cursor = 0;
    var stalled = 0;
    var letter;

    if (mode === "sort") return U.shuffle(targetLetters.slice());
    if (mode === "free") return [];

    pool = targetLetters.slice();
    blockers = letterBlockers(target);
    extras = randomAlphabet().concat(
      targetLetters.map(function (item) {
        return (CONFUSABLE_LETTERS[item] || "aeiou").charAt(0);
      })
    );

    while (pool.length < targetLetters.length * 2) {
      letter = extras[cursor % extras.length];
      cursor += 1;
      if (!letter) {
        extras = extras.concat(randomAlphabet());
        continue;
      }
      if (keepsPoolSafe(pool, letter, blockers)) {
        pool.push(letter);
        stalled = 0;
      } else {
        stalled += 1;
        if (stalled > extras.length * 2) {
          pool.push(letter);
          stalled = 0;
        }
      }
    }
    return U.shuffle(pool);
  }

  function createLetterQuestion(config) {
    var item;
    var field;
    var target;
    var mode;
    var question;
    config = config || {};
    item = resolveVerb(config.verb);
    field = config.field;
    mode = config.mode || "double";
    if (!item || !isField(field) || (item.id === "can" && field === "pp")) return null;

    target = canonical(item, field, item.id === "be" && field === "past" ? { variant: "were" } : config.canonicalOptions);
    if (!target) return null;
    question = {
      type: "letters",
      verb: item,
      base: item.base,
      cn: item.cn,
      field: field,
      mode: mode,
      target: target,
      letters: buildLetterPool(item, field, target, mode),
    };
    assertValidLetterQuestion(question);
    return question;
  }

  function validateQuestion(question, verb, field) {
    var item = resolveVerb(verb || (question && question.verb));
    var targetField = field || (question && question.field);
    var errors = [];
    var seen = {};
    var accepted;
    var correctCount = 0;
    var expectedCount;

    if (!question || !item || !isField(targetField)) {
      return { valid: false, errors: ["Question, verb, or field is invalid"], correctCount: 0 };
    }
    accepted = acceptedMap(item, targetField);
    if (!Array.isArray(question.options)) errors.push("options must be an array");
    if (!accepted[normalize(question.correct)]) errors.push("correct is not an accepted form");
    expectedCount = question.optionCount || (question.type === "gap" ? 5 : 4);

    (question.options || []).forEach(function (option) {
      var key = normalize(option);
      if (seen[key]) errors.push("options must be unique");
      seen[key] = true;
      if (accepted[key]) correctCount += 1;
    });
    if ((question.options || []).length !== expectedCount) {
      errors.push("expected " + expectedCount + " options");
    }
    if (correctCount !== 1) errors.push("expected exactly one accepted option");
    if (!seen[normalize(question.correct)]) errors.push("correct is missing from options");
    return { valid: errors.length === 0, errors: errors, correctCount: correctCount };
  }

  function assertSingleCorrect(question, verb, field) {
    var result = validateQuestion(question, verb, field);
    if (!result.valid) {
      throw new Error("Invalid distractor question: " + result.errors.join("; "));
    }
    return true;
  }

  function validateLetterQuestion(question, verb, field) {
    var item = resolveVerb(verb || (question && question.verb));
    var targetField = field || (question && question.field);
    var errors = [];
    var targetLetters;
    var accepted;
    var blockers;
    var mode;

    if (!question || !item || !isField(targetField)) {
      return { valid: false, errors: ["Question, verb, or field is invalid"] };
    }
    targetLetters = lettersOf(question.target);
    accepted = acceptedMap(item, targetField);
    mode = question.mode || "double";
    if (!accepted[normalize(question.target)]) errors.push("target is not an accepted form");
    if (!Array.isArray(question.letters)) errors.push("letters must be an array");
    if (mode === "free") {
      if ((question.letters || []).length !== 0) errors.push("free spelling must not expose letters");
    } else if (mode === "sort") {
      if ((question.letters || []).slice().sort().join("") !== targetLetters.slice().sort().join("")) {
        errors.push("sort pool must be an anagram of the target");
      }
    } else if ((question.letters || []).length !== targetLetters.length * 2) {
      errors.push("letter pool must contain exactly 2N letters");
    }
    (question.letters || []).forEach(function (letter) {
      if (!/^[a-z]$/i.test(String(letter))) errors.push("letter pool contains a non-letter token");
    });
    if (mode !== "free" && !canSpell(question.target, question.letters || [])) {
      errors.push("letter pool cannot spell target");
    }
    if (mode === "double") {
      blockers = letterBlockers(question.target);
      blockers.forEach(function (candidate) {
        if (canSpell(candidate, question.letters || [])) {
          errors.push("letter pool can also spell " + candidate);
        }
      });
    }
    return { valid: errors.length === 0, errors: errors };
  }

  function assertValidLetterQuestion(question, verb, field) {
    var result = validateLetterQuestion(question, verb, field);
    if (!result.valid) {
      throw new Error("Invalid letter question: " + result.errors.join("; "));
    }
    return true;
  }

  global.IrregularVerbsDistractors = {
    canonical: canonical,
    inventLookalikes: inventLookalikes,
    rankDistractors: rankDistractors,
    createChoiceQuestion: createChoiceQuestion,
    createChineseQuestion: createChineseQuestion,
    createGapQuestion: createGapQuestion,
    createIdentityQuestion: createIdentityQuestion,
    createLetterQuestion: createLetterQuestion,
    canSpell: canSpell,
    validateQuestion: validateQuestion,
    assertSingleCorrect: assertSingleCorrect,
    validateLetterQuestion: validateLetterQuestion,
    assertValidLetterQuestion: assertValidLetterQuestion,
  };
})(typeof window !== "undefined" ? window : this);
