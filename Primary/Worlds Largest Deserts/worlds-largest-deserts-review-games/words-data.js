/**
 * World's Largest Deserts · 复习游戏词表
 * 兼容原复习游戏 API 形状（WhatAreReptilesWords 别名保留）
 */
(function (global) {
  "use strict";
  var STORAGE_KEY = "worldsLargestDesertsReview.selectedWords";
  var ALL_WORDS = [
    { word: "desert", zh: "沙漠", emoji: "🏜️" },
    { word: "dry", zh: "干燥的", emoji: "🏜️" },
    { word: "rain", zh: "雨", emoji: "🏜️" },
    { word: "hot", zh: "热的", emoji: "🏜️" },
    { word: "cold", zh: "冷的", emoji: "🏜️" },
    { word: "polar", zh: "极地的", emoji: "🏜️" },
    { word: "ice", zh: "冰", emoji: "🏜️" },
    { word: "sand", zh: "沙子", emoji: "🏜️" },
    { word: "dune", zh: "沙丘", emoji: "🏜️" },
    { word: "plant", zh: "植物", emoji: "🏜️" },
    { word: "mountain", zh: "山", emoji: "🏜️" },
    { word: "continent", zh: "大洲", emoji: "🏜️" },
    { word: "antarctic", zh: "南极的；南极洲", emoji: "🏜️" },
    { word: "arctic", zh: "北极的；北极", emoji: "🏜️" },
    { word: "sahara", zh: "撒哈拉沙漠", emoji: "🏜️" },
    { word: "arabian", zh: "阿拉伯的；阿拉伯沙漠", emoji: "🏜️" },
    { word: "gobi", zh: "戈壁", emoji: "🏜️" },
    { word: "kalahari", zh: "卡拉哈里沙漠", emoji: "🏜️" },
    { word: "patagonian", zh: "巴塔哥尼亚的", emoji: "🏜️" },
    { word: "australia", zh: "澳大利亚", emoji: "🏜️" },
    { word: "basin", zh: "盆地", emoji: "🏜️" },
    { word: "africa", zh: "非洲", emoji: "🏜️" },
    { word: "asia", zh: "亚洲", emoji: "🏜️" },
    { word: "earth", zh: "地球", emoji: "🏜️" },
    { word: "harsh", zh: "严酷的", emoji: "🏜️" },
    { word: "vast", zh: "广阔的", emoji: "🏜️" },
    { word: "sparse", zh: "稀疏的", emoji: "🏜️" },
    { word: "shadow", zh: "阴影；雨影", emoji: "🏜️" },
    { word: "interior", zh: "内部", emoji: "🏜️" },
    { word: "largest", zh: "最大的", emoji: "🏜️" },
  ];
  var ALL_KEYS = ALL_WORDS.map(function (w) { return w.word; });
  var WMAP = {};
  ALL_WORDS.forEach(function (w) { WMAP[w.word] = w; });
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
    } catch (e) { return null; }
  }
  function saveKeys(keys) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeKeys(keys)));
  }
  function getSelectedKeys() {
    var stored = getStoredKeys();
    return stored && stored.length ? stored : ALL_KEYS.slice();
  }
  function getSelected() {
    return getSelectedKeys().map(function (k) { return WMAP[k]; }).filter(Boolean);
  }
  function chunkForMemory(size) {
    size = size || 3;
    var list = getSelected();
    var chunks = [];
    for (var i = 0; i < list.length; i += size) chunks.push(list.slice(i, i + size));
    return chunks;
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var api = {
    ALL: ALL_WORDS, ALL_KEYS: ALL_KEYS, WMAP: WMAP, STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "../worlds-largest-deserts-courseware/images/words/",
    getSelected: getSelected, getSelectedKeys: getSelectedKeys,
    saveKeys: saveKeys, chunkForMemory: chunkForMemory, shuffle: shuffle,
    MIN_WORDS_GAME1: 2, MIN_WORDS_GAME2: 2, MIN_WORDS_GAME3: 1,
    MIN_WORDS_GAME4: 4, MIN_WORDS_GAME5: 3, MIN_WORDS_GAME6: 3,
    MIN_WORDS_GAME7: 3, MIN_WORDS_GAME8: 4, MIN_WORDS_GAME9: 4,
  };
  global.WorldsLargestDesertsWords = api;
  // 兼容从爬行动物课复制的游戏脚本
  global.WhatAreReptilesWords = api;
})(typeof window !== "undefined" ? window : this);
