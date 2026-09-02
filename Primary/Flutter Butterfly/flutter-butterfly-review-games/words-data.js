/**
 * Flutter, butterfly! 复习游戏 · 词表 + 选词设置（localStorage）
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "flutterButterflyReview.selectedWords";

  var FLUTTER_BUTTERFLY_ALL_WORDS = [
    { word: "flutter", zh: "振翅飞舞", emoji: "🦋" },
    { word: "butterfly", zh: "蝴蝶", emoji: "🦋" },
    { word: "animals", zh: "动物", emoji: "🐾" },
    { word: "lay an egg", zh: "产卵", emoji: "🥚" },
    { word: "hatch", zh: "孵化", emoji: "🐣" },
    { word: "crawl", zh: "爬行", emoji: "🐛" },
    { word: "grow", zh: "生长", emoji: "📈" },
    { word: "change", zh: "变化", emoji: "🔄" },
    { word: "caterpillar", zh: "毛毛虫", emoji: "🐛" },
    { word: "pupa", zh: "蛹", emoji: "🟤" },
    { word: "land", zh: "降落", emoji: "🛬" },
    { word: "plant", zh: "植物", emoji: "🌿" },
    { word: "yellow", zh: "黄色", emoji: "💛" },
    { word: "pass", zh: "过去", emoji: "⏳" },
    { word: "turn brown", zh: "变成棕色", emoji: "🟤" },
    { word: "inside", zh: "在里面", emoji: "📦" },
    { word: "come out", zh: "出来", emoji: "🚪" },
    { word: "young", zh: "幼小的", emoji: "👶" },
    { word: "look for", zh: "寻找", emoji: "🔍" },
    { word: "leave", zh: "叶子", emoji: "🍃" },
    { word: "bigger", zh: "更大", emoji: "📏" },
    { word: "green", zh: "绿色", emoji: "💚" },
    { word: "keep eating", zh: "继续吃", emoji: "🍽️" },
    { word: "more", zh: "更多", emoji: "➕" },
    { word: "after", zh: "之后", emoji: "⏭️" },
    { word: "week", zh: "周", emoji: "📅" },
    { word: "hard", zh: "坚硬的", emoji: "🪨" },
    { word: "covering", zh: "外壳", emoji: "🛡️" },
  ];

  var ALL_KEYS = FLUTTER_BUTTERFLY_ALL_WORDS.map(function (w) {
    return w.word;
  });

  function mapByWord() {
    var m = {};
    FLUTTER_BUTTERFLY_ALL_WORDS.forEach(function (w) {
      m[w.word] = w;
    });
    return m;
  }

  var WMAP = mapByWord();

  function wordImgFile(w) {
    var key = (typeof w === "string") ? w : (w && w.word) || "";
    return String(key).toLowerCase().replace(/\s+/g, "-");
  }

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

  global.FlutterButterflyWords = {
    ALL: FLUTTER_BUTTERFLY_ALL_WORDS,
    ALL_KEYS: ALL_KEYS,
    WMAP: WMAP,
    STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "../flutter-butterfly-courseware/images/words/",
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
    MIN_WORDS_GAME4: 4,
    MIN_WORDS_GAME5: 3,
    MIN_WORDS_GAME6: 3,
    MIN_WORDS_GAME7: 3,
    MIN_WORDS_GAME8: 4,
    MIN_WORDS_GAME9: 4,
  };
})(typeof window !== "undefined" ? window : this);
