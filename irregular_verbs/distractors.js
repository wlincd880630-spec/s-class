/**
 * Verb Atlas · shared high-confusion choices and letter-pool engine.
 *
 * Load after verbs-data.js and shared.js.
 */
(function (global) {
  "use strict";

  var U = global.IrregularVerbsUtil;
  var DATA = global.IRREGULAR_VERBS_DATA;
  var FIELDS = ["past", "pp"];
  var CONFUSABLE_LETTERS = {
    a: "eou",
    b: "pd",
    c: "ks",
    d: "bt",
    e: "ai",
    f: "vph",
    g: "jq",
    h: "nf",
    i: "ey",
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
    u: "ao",
    v: "fw",
    w: "vm",
    x: "ks",
    y: "ie",
    z: "s",
  };

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
    return values;
  }

  function categoryFor(record) {
    if (record.sameVerbOther) return 0;
    if (record.suffixLength >= 2) return 1;
    if (record.distance <= 2) return 2;
    if (record.lengthDelta <= 1) return 3;
    if (record.regularized) return 4;
    if (record.sameGroup) return 5;
    return 6;
  }

  function compareRecords(left, right) {
    var difference = left.category - right.category;
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

  function rankedRecords(verb, field) {
    var item = resolveVerb(verb);
    var target = canonical(item, field);
    var accepted;
    var targetGroup;
    var records = [];
    var otherField;

    if (!item || !target) return records;
    accepted = acceptedMap(item, field);
    targetGroup = U.getVerbGroup(item);
    otherField = field === "past" ? "pp" : "past";

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

  function rankDistractors(verb, field) {
    var seen = {};
    var ranked = [];
    rankedRecords(verb, field).forEach(function (record) {
      var key = normalize(record.word);
      if (seen[key]) return;
      seen[key] = true;
      ranked.push(record.word);
    });
    return ranked;
  }

  function questionResult(type, verb, field, correct, distractors, optionCount) {
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
    distractors = rankDistractors(item, field).slice(0, count - 1);
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
    var correct;
    var distractors;
    config = config || {};
    item = resolveVerb(config.verb);
    field = config.field;
    if (!item || !isField(field) || (item.id === "can" && field === "pp") || isAAA(item)) {
      return null;
    }
    correct = canonical(item, field);
    distractors = rankDistractors(item, field).slice(0, 1);
    if (!correct || !distractors.length) return null;
    return questionResult("chinese", item, field, correct, distractors, 2);
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

    // Exact anagrams (for example felt/left) are intrinsically indistinguishable
    // in a letter pool; every other same-length real form remains blocked.
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

  function preferredExtraLetters(verb, field, target) {
    var preferred = [];
    rankDistractors(verb, field).slice(0, 12).forEach(function (word) {
      preferred = preferred.concat(lettersOf(word));
    });
    lettersOf(target).forEach(function (letter) {
      preferred = preferred.concat(lettersOf(CONFUSABLE_LETTERS[letter] || ""));
    });
    return preferred.concat(lettersOf(target)).concat(lettersOf("etaoinshrdlucmfwypvbgkjqxz"));
  }

  function buildLetterPool(verb, field, target) {
    var targetLetters = lettersOf(target);
    var pool = targetLetters.slice();
    var blockers = letterBlockers(target);
    var preferred = preferredExtraLetters(verb, field, target);
    var cursor = 0;
    var stalled = 0;
    var letter;

    while (pool.length < targetLetters.length * 2) {
      letter = preferred[cursor % preferred.length];
      cursor += 1;
      if (keepsPoolSafe(pool, letter, blockers)) {
        pool.push(letter);
        stalled = 0;
      } else {
        stalled += 1;
      }
      if (stalled > preferred.length * 3) {
        throw new Error("Unable to build a safe letter pool for " + verb.id + "." + field);
      }
    }
    return U.shuffle(pool);
  }

  function createLetterQuestion(config) {
    var item;
    var field;
    var target;
    var question;
    config = config || {};
    item = resolveVerb(config.verb);
    field = config.field;
    if (!item || !isField(field) || (item.id === "can" && field === "pp")) return null;

    target = canonical(item, field, item.id === "be" && field === "past" ? { variant: "were" } : null);
    if (!target) return null;
    question = {
      type: "letters",
      verb: item,
      base: item.base,
      cn: item.cn,
      field: field,
      target: target,
      letters: buildLetterPool(item, field, target),
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
    expectedCount = question.optionCount || (question.type === "chinese" ? 2 : 4);

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

    if (!question || !item || !isField(targetField)) {
      return { valid: false, errors: ["Question, verb, or field is invalid"] };
    }
    targetLetters = lettersOf(question.target);
    accepted = acceptedMap(item, targetField);
    if (!accepted[normalize(question.target)]) errors.push("target is not an accepted form");
    if (!Array.isArray(question.letters)) errors.push("letters must be an array");
    if ((question.letters || []).length !== targetLetters.length * 2) {
      errors.push("letter pool must contain exactly 2N letters");
    }
    (question.letters || []).forEach(function (letter) {
      if (!/^[a-z]$/i.test(String(letter))) errors.push("letter pool contains a non-letter token");
    });
    if (!canSpell(question.target, question.letters || [])) errors.push("letter pool cannot spell target");
    blockers = letterBlockers(question.target);
    blockers.forEach(function (candidate) {
      if (canSpell(candidate, question.letters || [])) {
        errors.push("letter pool can also spell " + candidate);
      }
    });
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
    rankDistractors: rankDistractors,
    createChoiceQuestion: createChoiceQuestion,
    createChineseQuestion: createChineseQuestion,
    createLetterQuestion: createLetterQuestion,
    canSpell: canSpell,
    validateQuestion: validateQuestion,
    assertSingleCorrect: assertSingleCorrect,
    validateLetterQuestion: validateLetterQuestion,
    assertValidLetterQuestion: assertValidLetterQuestion,
  };
})(typeof window !== "undefined" ? window : this);
