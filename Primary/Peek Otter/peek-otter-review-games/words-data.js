/**
 * Peek, Otter! 复习游戏 · 13 词词表 + 选词设置（localStorage）
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "peekOtterReview.selectedWords";

  var PEEK_OTTER_ALL_WORDS = [
    { word: "fish", zh: "鱼", emoji: "🐟" },
    { word: "crab", zh: "螃蟹", emoji: "🦀" },
    { word: "peek", zh: "偷看", emoji: "👀" },
    { word: "swim", zh: "游泳", emoji: "🏊" },
    { word: "flip", zh: "翻转", emoji: "🔄" },
    { word: "find", zh: "找到", emoji: "🔍" },
    { word: "food", zh: "食物", emoji: "🍽️" },
    { word: "teach", zh: "教", emoji: "📖" },
    { word: "call", zh: "呼叫", emoji: "📣" },
    { word: "sleep", zh: "睡觉", emoji: "😴" },
    { word: "busy", zh: "忙碌", emoji: "⏰" },
    { word: "tail", zh: "尾巴", emoji: "〰️" },
    { word: "feet", zh: "脚", emoji: "🦶" },
  ];

  var ALL_KEYS = PEEK_OTTER_ALL_WORDS.map(function (w) {
    return w.word;
  });

  function mapByWord() {
    var m = {};
    PEEK_OTTER_ALL_WORDS.forEach(function (w) {
      m[w.word] = w;
    });
    return m;
  }

  var WMAP = mapByWord();

  function normalizeKeys(keys) {
    if (!keys || !keys.length) return [];
    var out = [];
    keys.forEach(function (k) {
      var key = String(k).toLowerCase().trim();
      if (WMAP[key] && out.indexOf(key) < 0) out.push(key);
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

  global.PeekOtterWords = {
    ALL: PEEK_OTTER_ALL_WORDS,
    ALL_KEYS: ALL_KEYS,
    WMAP: WMAP,
    STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Peek%20Otter/peek-otter-courseware/images/words/",
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
    MIN_WORDS_GAME4: 4,
    MIN_WORDS_GAME5: 3,
    MIN_WORDS_GAME6: 3,
    MIN_WORDS_GAME7: 3,
    MIN_WORDS_GAME8: 4,
    MIN_WORDS_GAME9: 4,
  };
})(typeof window !== "undefined" ? window : this);
