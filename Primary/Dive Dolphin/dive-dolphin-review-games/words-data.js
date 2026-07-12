/**
 * Dive, dolphin! 复习游戏 · 词表 + 选词设置（localStorage）
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "diveDolphinReview.selectedWords";

  var DIVE_DOLPHIN_ALL_WORDS = [
    { word: "dolphin", zh: "海豚", emoji: "🐬" },
    { word: "ocean", zh: "海洋", emoji: "🌊" },
    { word: "river", zh: "河流", emoji: "🏞️" },
    { word: "dive", zh: "潜水", emoji: "🤿" },
    { word: "swim", zh: "游泳", emoji: "🏊" },
    { word: "hunt", zh: "捕猎", emoji: "🎣" },
    { word: "play", zh: "玩耍", emoji: "🎾" },
    { word: "leap", zh: "跃起", emoji: "⬆️" },
    { word: "flipper", zh: "鳍肢", emoji: "🦭" },
    { word: "fin", zh: "背鳍", emoji: "🔺" },
    { word: "tail", zh: "尾巴", emoji: "〰️" },
    { word: "there", zh: "那里", emoji: "📍" },
    { word: "many", zh: "许多", emoji: "🔢" },
    { word: "beak", zh: "喙", emoji: "🦆" },
    { word: "long", zh: "长的", emoji: "📏" },
    { word: "short", zh: "短的", emoji: "📐" },
    { word: "have", zh: "有", emoji: "✅" },
    { word: "these", zh: "这些", emoji: "👆" },
    { word: "stripe", zh: "条纹", emoji: "〰️" },
    { word: "some", zh: "一些", emoji: "🔹" },
    { word: "live", zh: "生活", emoji: "🏠" },
    { word: "this", zh: "这个", emoji: "👉" },
    { word: "spot", zh: "斑点", emoji: "🔵" },
    { word: "others", zh: "其他的", emoji: "👥" },
    { word: "together", zh: "一起", emoji: "🤝" },
    { word: "work", zh: "工作", emoji: "💼" },
    { word: "team", zh: "团队", emoji: "👥" },
    { word: "with", zh: "和/用", emoji: "🤲" },
    { word: "thing", zh: "东西", emoji: "📦" },
    { word: "they", zh: "它们", emoji: "🐬" },
    { word: "water", zh: "水", emoji: "💧" },
    { word: "seaweed", zh: "海草", emoji: "🌿" },
    { word: "like", zh: "喜欢", emoji: "❤️" },
    { word: "blowhole", zh: "呼吸孔", emoji: "💨" },
    { word: "back", zh: "背部", emoji: "🔙" },
    { word: "down", zh: "向下", emoji: "⬇️" },
    { word: "through", zh: "穿过", emoji: "↔️" },
    { word: "air", zh: "空气", emoji: "🌬️" },
    { word: "breathe", zh: "呼吸", emoji: "😮‍💨" },
    { word: "need to", zh: "需要", emoji: "⚠️" },
    { word: "come", zh: "来", emoji: "➡️" },
    { word: "top", zh: "顶部", emoji: "⬆️" },
    { word: "get", zh: "获得", emoji: "🎯" },
  ];

  var ALL_KEYS = DIVE_DOLPHIN_ALL_WORDS.map(function (w) {
    return w.word;
  });

  function mapByWord() {
    var m = {};
    DIVE_DOLPHIN_ALL_WORDS.forEach(function (w) {
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

  global.DiveDolphinWords = {
    ALL: DIVE_DOLPHIN_ALL_WORDS,
    ALL_KEYS: ALL_KEYS,
    WMAP: WMAP,
    STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Dive%20Dolphin/dive-dolphin-courseware/images/words/",
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
