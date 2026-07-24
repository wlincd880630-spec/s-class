/**
 * Verb Atlas · 数据、选词与学习进度共享工具
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "iv-selected-verbs-v1";
  var MASTERY_KEY = "iv-mastery-v2";
  var LEARNING_PROGRESS_KEY = "iv-progress-learn-v2";
  var REQUIRED_EXAMPLES = ["present", "past", "perfect"];
  var GROUPS = [
    { id: "all", label: "全部轨道", shortLabel: "全部" },
    { id: "abc", label: "三态全变化", shortLabel: "ABC" },
    { id: "abb", label: "过去式＝分词", shortLabel: "ABB" },
    { id: "aba", label: "原形＝分词", shortLabel: "ABA" },
    { id: "aaa", label: "三态同形", shortLabel: "AAA" },
    { id: "special", label: "特殊动词", shortLabel: "特殊" },
  ];

  var validationCache = null;
  var validationSource = null;

  function nowIso() {
    return new Date().toISOString();
  }

  function readStorage(key) {
    try {
      if (!global.localStorage) return null;
      return global.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      if (!global.localStorage) return false;
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function parseStorage(key, fallback) {
    var raw = readStorage(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function isText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function validateExample(example, path, errors) {
    if (!example || typeof example !== "object") {
      errors.push(path + " 缺少例句");
      return;
    }
    ["en", "cn", "tense", "level"].forEach(function (key) {
      if (!isText(example[key])) errors.push(path + "." + key + " 无效");
    });
  }

  function validateVerb(verb, index, errors, warnings) {
    var path = "verbs[" + index + "]";
    if (!verb || typeof verb !== "object") {
      errors.push(path + " 不是有效对象");
      return false;
    }
    ["id", "base", "past", "pp", "cn", "ipa"].forEach(function (key) {
      if (!isText(verb[key])) errors.push(path + "." + key + " 缺失");
    });
    if (!verb.images || typeof verb.images !== "object") {
      errors.push(path + ".images 缺失");
    } else {
      ["verb", "present", "past", "perfect"].forEach(function (key) {
        if (!isText(verb.images[key])) warnings.push(path + ".images." + key + " 缺失");
      });
    }
    if (!verb.examples || typeof verb.examples !== "object") {
      errors.push(path + ".examples 缺失");
    } else {
      REQUIRED_EXAMPLES.forEach(function (key) {
        validateExample(verb.examples[key], path + ".examples." + key, errors);
      });
    }
    return isText(verb.id) && isText(verb.base) && isText(verb.past) && isText(verb.pp);
  }

  function validateData(data) {
    if (data === validationSource && validationCache) return validationCache;

    var errors = [];
    var warnings = [];
    var verbs = [];
    var seen = {};
    if (!data || typeof data !== "object") {
      errors.push("未找到动词数据");
    } else if (!Array.isArray(data.verbs)) {
      errors.push("verbs 必须是数组");
    } else {
      data.verbs.forEach(function (verb, index) {
        var structurallyValid = validateVerb(verb, index, errors, warnings);
        if (!structurallyValid) return;
        if (seen[verb.id]) {
          errors.push("动词 id 重复：" + verb.id);
          return;
        }
        seen[verb.id] = true;
        verbs.push(verb);
      });
    }

    validationSource = data;
    validationCache = {
      valid: errors.length === 0,
      errors: errors,
      warnings: warnings,
      verbs: verbs,
      total: verbs.length,
      version: data && data.version,
    };
    return validationCache;
  }

  function getDataStatus() {
    return validateData(global.IRREGULAR_VERBS_DATA);
  }

  function getAllVerbs() {
    return getDataStatus().verbs.slice();
  }

  function getVerbMap() {
    var map = {};
    getAllVerbs().forEach(function (verb) {
      map[verb.id] = verb;
    });
    return map;
  }

  function uniqueValidIds(ids) {
    if (!Array.isArray(ids)) return [];
    var map = getVerbMap();
    var seen = {};
    return ids.filter(function (id) {
      if (!isText(id) || !map[id] || seen[id]) return false;
      seen[id] = true;
      return true;
    });
  }

  function getSelectedIds() {
    var raw = readStorage(STORAGE_KEY);
    if (raw === null) {
      return getAllVerbs().map(function (verb) {
        return verb.id;
      });
    }
    try {
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return uniqueValidIds(parsed);
    } catch (e) {
    }
    return getAllVerbs().map(function (verb) {
      return verb.id;
    });
  }

  function setSelectedIds(ids) {
    var validIds = uniqueValidIds(ids);
    return {
      saved: writeStorage(STORAGE_KEY, validIds),
      ids: validIds,
      count: validIds.length,
    };
  }

  function getSelectedVerbs() {
    var map = getVerbMap();
    return getSelectedIds()
      .map(function (id) {
        return map[id];
      })
      .filter(Boolean);
  }

  function getVerbById(id) {
    return getVerbMap()[id] || null;
  }

  function normalizeText(value) {
    return String(value === undefined || value === null ? "" : value)
      .normalize("NFKC")
      .trim()
      .toLocaleLowerCase("en");
  }

  function normalizeForm(value) {
    return normalizeText(value)
      .replace(/[’]/g, "'")
      .replace(/\s*\/\s*/g, " / ")
      .replace(/\s+/g, " ");
  }

  function normalizeForSearch(value) {
    return normalizeText(value)
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getVerbGroup(verb) {
    if (!verb || verb.special || verb.id === "can" || normalizeForm(verb.pp) === "—") {
      return "special";
    }
    var base = normalizeForm(verb.base);
    var past = normalizeForm(verb.past);
    var pp = normalizeForm(verb.pp);
    if (base === past && past === pp) return "aaa";
    if (past === pp) return "abb";
    if (base === pp) return "aba";
    return "abc";
  }

  function getGroupMeta(groupId) {
    return (
      GROUPS.find(function (group) {
        return group.id === groupId;
      }) || GROUPS[0]
    );
  }

  function searchVerbs(query, groupId, source) {
    var needle = normalizeForSearch(query);
    var group = groupId || "all";
    var verbs = Array.isArray(source) ? source : getAllVerbs();
    return verbs.filter(function (verb) {
      if (group !== "all" && getVerbGroup(verb) !== group) return false;
      if (!needle) return true;
      var haystack = normalizeForSearch(
        [verb.base, verb.past, verb.pp, verb.cn, verb.ipa].join(" ")
      );
      return haystack.indexOf(needle) !== -1;
    });
  }

  function shuffle(arr) {
    var a = Array.isArray(arr) ? arr.slice() : [];
    for (var i = a.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

  function pickRandom(arr, count) {
    var limit = Math.max(0, Number(count) || 0);
    return shuffle(arr).slice(0, Math.min(limit, Array.isArray(arr) ? arr.length : 0));
  }

  function mediaUrl(path) {
    if (!isText(path)) return "";
    if (/^https?:\/\//i.test(path)) return path;
    var data = global.IRREGULAR_VERBS_DATA;
    var base = data && isText(data.mediaBase) ? data.mediaBase : "";
    return base + String(path).replace(/^\//, "");
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function splitForms(forms) {
    var values = Array.isArray(forms) ? forms : [forms];
    var seen = {};
    var parts = [];
    values.forEach(function (value) {
      String(value === undefined || value === null ? "" : value)
        .split(/\s*\/\s*/)
        .forEach(function (part) {
          var clean = part.trim();
          var key = normalizeForm(clean);
          if (!clean || key === "—" || seen[key]) return;
          seen[key] = true;
          parts.push(clean);
        });
    });
    return parts.sort(function (a, b) {
      return b.length - a.length;
    });
  }

  function highlightVerb(sentence, forms) {
    var result = escapeHtml(sentence);
    var patterns = splitForms(forms).map(function (form) {
      return escapeRegExp(escapeHtml(form)).replace(/\s+/g, "\\s+");
    });
    if (!patterns.length) return result;
    var expression = new RegExp(
      "(^|[^A-Za-z])(" + patterns.join("|") + ")(?=$|[^A-Za-z])",
      "gi"
    );
    result = result.replace(expression, '$1<mark class="verb-highlight">$2</mark>');
    return result;
  }

  function presentThirdPerson(base) {
    var word = normalizeText(base);
    if (!word || /\s|\//.test(word)) return "";
    if (/[^aeiou]y$/.test(word)) return word.slice(0, -1) + "ies";
    if (/(s|x|z|ch|sh|o)$/.test(word)) return word + "es";
    return word + "s";
  }

  function getHighlightForms(verb, tenseKey) {
    if (!verb) return [];
    if (verb.id === "can") {
      if (tenseKey === "present") return ["can"];
      if (tenseKey === "past") return ["could"];
      return ["could have done", "could"];
    }
    if (tenseKey === "past") return splitForms(verb.past);
    if (tenseKey === "perfect") {
      return splitForms(verb.pp).reduce(function (forms, part) {
        return forms.concat(["have " + part, "has " + part, part]);
      }, []);
    }
    if (verb.id === "be") return ["am", "is", "are", "be"];
    if (verb.id === "have") return ["have", "has"];
    if (verb.id === "do") return ["do", "does"];
    return [verb.base, presentThirdPerson(verb.base)];
  }

  function getMasteryStore() {
    var store = parseStorage(MASTERY_KEY, null);
    if (!store || typeof store !== "object" || !store.verbs) {
      return { version: 2, verbs: {}, updatedAt: null };
    }
    return store;
  }

  function getMastery(id) {
    var entry = getMasteryStore().verbs[id];
    return entry && typeof entry === "object"
      ? entry
      : { visits: 0, maxStep: 0, completed: false, lastSeen: null };
  }

  function recordMastery(id, update) {
    if (!getVerbById(id)) return null;
    update = update || {};
    var store = getMasteryStore();
    var current = store.verbs[id] || {
      visits: 0,
      maxStep: 0,
      completed: false,
      lastSeen: null,
    };
    if (update.visited) current.visits = Math.max(0, Number(current.visits) || 0) + 1;
    if (Number.isFinite(Number(update.step))) {
      current.maxStep = Math.max(Number(current.maxStep) || 0, Math.min(4, Number(update.step)));
    }
    if (update.completed) {
      current.completed = true;
      current.maxStep = 4;
    }
    current.lastSeen = nowIso();
    store.verbs[id] = current;
    store.updatedAt = current.lastSeen;
    writeStorage(MASTERY_KEY, store);
    return current;
  }

  function getMasterySummary(ids) {
    var scopedIds = uniqueValidIds(Array.isArray(ids) ? ids : getSelectedIds());
    var store = getMasteryStore();
    var started = 0;
    var mastered = 0;
    scopedIds.forEach(function (id) {
      var entry = store.verbs[id];
      if (entry && (entry.visits || entry.maxStep)) started += 1;
      if (entry && entry.completed) mastered += 1;
    });
    return {
      total: scopedIds.length,
      started: started,
      mastered: mastered,
      remaining: Math.max(0, scopedIds.length - mastered),
      percent: scopedIds.length ? Math.round((mastered / scopedIds.length) * 100) : 0,
    };
  }

  function getLearningProgress() {
    var progress = parseStorage(LEARNING_PROGRESS_KEY, null);
    if (!progress || typeof progress !== "object") return null;
    if (progress.verbId && !getVerbById(progress.verbId)) return null;
    return progress;
  }

  function saveLearningProgress(progress) {
    progress = progress || {};
    var selectedIds = getSelectedIds();
    var verbId = selectedIds.indexOf(progress.verbId) !== -1
      ? progress.verbId
      : selectedIds[Math.max(0, Math.min(selectedIds.length - 1, Number(progress.index) || 0))] || null;
    var value = {
      version: 2,
      verbId: verbId,
      index: Math.max(0, Number(progress.index) || 0),
      step: Math.max(0, Math.min(3, Number(progress.step) || 0)),
      completedIds: uniqueValidIds(progress.completedIds || []),
      updatedAt: nowIso(),
    };
    writeStorage(LEARNING_PROGRESS_KEY, value);
    return value;
  }

  function clearLearningProgress() {
    try {
      if (!global.localStorage) return false;
      global.localStorage.removeItem(LEARNING_PROGRESS_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function saveProgress(key, data) {
    return writeStorage("iv-progress-" + key, data);
  }

  function loadProgress(key) {
    return parseStorage("iv-progress-" + key, null);
  }

  global.IrregularVerbsUtil = {
    STORAGE_KEY: STORAGE_KEY,
    MASTERY_KEY: MASTERY_KEY,
    LEARNING_PROGRESS_KEY: LEARNING_PROGRESS_KEY,
    GROUPS: GROUPS.slice(),
    validateData: validateData,
    getDataStatus: getDataStatus,
    getAllVerbs: getAllVerbs,
    getSelectedIds: getSelectedIds,
    setSelectedIds: setSelectedIds,
    getSelectedVerbs: getSelectedVerbs,
    getVerbById: getVerbById,
    getVerbGroup: getVerbGroup,
    getGroupMeta: getGroupMeta,
    searchVerbs: searchVerbs,
    shuffle: shuffle,
    pickRandom: pickRandom,
    mediaUrl: mediaUrl,
    normalizeText: normalizeText,
    normalizeForm: normalizeForm,
    normalizeForSearch: normalizeForSearch,
    escapeHtml: escapeHtml,
    splitForms: splitForms,
    highlightVerb: highlightVerb,
    getHighlightForms: getHighlightForms,
    getMastery: getMastery,
    recordMastery: recordMastery,
    getMasterySummary: getMasterySummary,
    getLearningProgress: getLearningProgress,
    saveLearningProgress: saveLearningProgress,
    clearLearningProgress: clearLearningProgress,
    saveProgress: saveProgress,
    loadProgress: loadProgress,
  };
})(typeof window !== "undefined" ? window : this);
