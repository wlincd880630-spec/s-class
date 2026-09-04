/**
 * Hello, penguins! 复习游戏 · 词表 + 选词设置（localStorage）
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "helloPenguinsReview.selectedWords";

  var HELLO_PENGUINS_ALL_WORDS = [
    { word: "penguin", zh: "企鹅", emoji: "🐧" },
    { word: "on the ice", zh: "在冰上", emoji: "🧊" },
    { word: "on the beach", zh: "在沙滩上", emoji: "🏖️" },
    { word: "in the forest", zh: "在森林里", emoji: "🌲" },
    { word: "huddle", zh: "挤成一团", emoji: "🤗" },
    { word: "shuffle", zh: "小步走", emoji: "🚶" },
    { word: "slide", zh: "滑行", emoji: "🛷" },
    { word: "swim", zh: "游泳", emoji: "🏊" },
    { word: "big", zh: "大的", emoji: "🐘" },
    { word: "small", zh: "小的", emoji: "🐭" },
    { word: "fancy", zh: "花哨的", emoji: "✨" },
    { word: "plain", zh: "朴素的", emoji: "◻️" },
    { word: "cold", zh: "寒冷的", emoji: "❄️" },
    { word: "keep warm", zh: "保暖", emoji: "🧣" },
    { word: "kind", zh: "种类", emoji: "🏷️" },
    { word: "many kinds of", zh: "许多种", emoji: "📚" },
    { word: "make", zh: "建造", emoji: "🛠️" },
    { word: "nest", zh: "巢", emoji: "🪺" },
    { word: "dirt", zh: "泥土", emoji: "🟤" },
    { word: "sand", zh: "沙子", emoji: "🏜️" },
    { word: "waddle", zh: "摇摇摆摆地走", emoji: "🦆" },
    { word: "tree root", zh: "树根", emoji: "🌳" },
    { word: "can", zh: "能", emoji: "✅" },
    { word: "can't", zh: "不能", emoji: "🚫" },
    { word: "use", zh: "使用", emoji: "🔧" },
    { word: "wing", zh: "翅膀", emoji: "🪽" },
    { word: "splash", zh: "溅水", emoji: "💦" },
    { word: "go fishing", zh: "去捕鱼", emoji: "🎣" },
    { word: "go back on land", zh: "回到陆地上", emoji: "🏝️" },
  ];

  var ALL_KEYS = HELLO_PENGUINS_ALL_WORDS.map(function (w) {
    return w.word;
  });

  function mapByWord() {
    var m = {};
    HELLO_PENGUINS_ALL_WORDS.forEach(function (w) {
      m[w.word] = w;
    });
    return m;
  }

  var WMAP = mapByWord();

  function wordImgFile(w) {
    var key = (typeof w === "string") ? w : (w && w.word) || "";
    return String(key).toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
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

  global.HelloPenguinsWords = {
    ALL: HELLO_PENGUINS_ALL_WORDS,
    ALL_KEYS: ALL_KEYS,
    WMAP: WMAP,
    STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Hello%20Penguins/hello-penguins-courseware/images/words/",
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
