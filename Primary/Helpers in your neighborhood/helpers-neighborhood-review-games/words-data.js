/**
 * Helpers in Your Neighborhood 复习游戏 · 16 词词表 + 选词设置（localStorage）
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "helpersNeighborhoodReview.selectedWords";

  var HELPERS_ALL_WORDS = [
    { word: "different", zh: "不同的", emoji: "🌍" },
    { word: "neighborhood", zh: "社区", emoji: "🏘️" },
    { word: "people", zh: "人们", emoji: "👥" },
    { word: "mail carrier", zh: "邮递员", emoji: "📮" },
    { word: "post office", zh: "邮局", emoji: "🏤" },
    { word: "library", zh: "图书馆", emoji: "📚" },
    { word: "librarian", zh: "图书管理员", emoji: "📖" },
    { word: "police officer", zh: "警察", emoji: "👮" },
    { word: "police station", zh: "警察局", emoji: "🚔" },
    { word: "firefighter", zh: "消防员", emoji: "🚒" },
    { word: "fire station", zh: "消防站", emoji: "🚒" },
    { word: "restaurant", zh: "餐馆", emoji: "🍽️" },
    { word: "favorite", zh: "最喜欢的", emoji: "⭐" },
    { word: "waiter", zh: "服务员", emoji: "🧑‍🍳" },
    { word: "hospital", zh: "医院", emoji: "🏥" },
    { word: "nurse", zh: "护士", emoji: "👩‍⚕️" },
  ];

  var ALL_KEYS = HELPERS_ALL_WORDS.map(function (w) {
    return w.word;
  });

  function mapByWord() {
    var m = {};
    HELPERS_ALL_WORDS.forEach(function (w) {
      m[w.word] = w;
    });
    return m;
  }

  var WMAP = mapByWord();

  function wordImgFile(w) {
    return String(w.word).replace(/ /g, "-");
  }

  function normalizeKeys(keys) {
    if (!keys || !keys.length) return [];
    var out = [];
    keys.forEach(function (k) {
      var key = String(k).toLowerCase().trim();
      var found = WMAP[key];
      if (!found) {
        HELPERS_ALL_WORDS.forEach(function (w) {
          if (w.word.toLowerCase() === key) found = w;
        });
      }
      if (found && out.indexOf(found.word) < 0) out.push(found.word);
    });
    return out;
  }

  function getStoredKeys() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return normalizeKeys(JSON.parse(raw));
    } catch (e) {
      return null;
    }
  }

  function saveKeys(keys) {
    var normalized = normalizeKeys(keys);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function getDefaultKeys() {
    return ALL_KEYS.slice();
  }

  function getSelectedKeys() {
    var stored = getStoredKeys();
    if (stored && stored.length) return stored;
    return getDefaultKeys();
  }

  function getSelected() {
    return getSelectedKeys()
      .map(function (k) {
        return WMAP[k];
      })
      .filter(Boolean);
  }

  function chunkForMemory(size) {
    size = size || 3;
    var list = getSelected();
    var chunks = [];
    for (var i = 0; i < list.length; i += size) {
      chunks.push(list.slice(i, i + size));
    }
    if (chunks.length > 1 && chunks[0].length > 0) {
      var first = chunks[0];
      for (var c = 1; c < chunks.length; c++) {
        var chunk = chunks[c];
        var used = {};
        chunk.forEach(function (w) {
          used[w.word] = true;
        });
        var fi = 0;
        var guard = 0;
        while (chunk.length < size && guard < size * first.length * 2) {
          guard++;
          var candidate = first[fi % first.length];
          fi++;
          if (!used[candidate.word]) {
            chunk.push(candidate);
            used[candidate.word] = true;
          } else if (first.length === 1) {
            chunk.push(candidate);
          }
        }
      }
    }
    return chunks;
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

  global.HelpersNeighborhoodWords = {
    ALL: HELPERS_ALL_WORDS,
    ALL_KEYS: ALL_KEYS,
    WMAP: WMAP,
    STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Helpers%20in%20your%20neighborhood/helpers-neighborhood-courseware/images/words/",
    wordImgFile: wordImgFile,
    getSelected: getSelected,
    getSelectedKeys: getSelectedKeys,
    getDefaultKeys: getDefaultKeys,
    saveKeys: saveKeys,
    normalizeKeys: normalizeKeys,
    chunkForMemory: chunkForMemory,
    shuffle: shuffle,
    MIN_WORDS_GAME1: 2,
    MIN_WORDS_GAME2: 2,
    MIN_WORDS_GAME3: 1,
  };
})(typeof window !== "undefined" ? window : this);
