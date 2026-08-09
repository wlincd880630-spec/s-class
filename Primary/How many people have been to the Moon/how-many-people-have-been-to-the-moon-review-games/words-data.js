/**
 * How many people have been to the Moon? · 复习游戏词表
 */
(function (global) {
  "use strict";
  var STORAGE_KEY = "moonPeopleReview.selectedWords";
  var ALL_WORDS = [
    { word: "moon", zh: "月亮", emoji: "🌕" },
    { word: "people", zh: "人们", emoji: "🌕" },
    { word: "walk", zh: "走", emoji: "🌕" },
    { word: "astronaut", zh: "宇航员", emoji: "🌕" },
    { word: "apollo", zh: "阿波罗", emoji: "🌕" },
    { word: "land", zh: "着陆", emoji: "🌕" },
    { word: "earth", zh: "地球", emoji: "🌕" },
    { word: "space", zh: "太空", emoji: "🌕" },
    { word: "rocket", zh: "火箭", emoji: "🌕" },
    { word: "step", zh: "脚步；步", emoji: "🌕" },
    { word: "first", zh: "第一", emoji: "🌕" },
    { word: "second", zh: "第二", emoji: "🌕" },
    { word: "orbit", zh: "绕轨；轨道", emoji: "🌕" },
    { word: "fly", zh: "飞行", emoji: "🌕" },
    { word: "nasa", zh: "美国宇航局", emoji: "🌕" },
    { word: "surface", zh: "表面", emoji: "🌕" },
    { word: "flag", zh: "旗帜", emoji: "🌕" },
    { word: "footprint", zh: "脚印", emoji: "🌕" },
    { word: "crew", zh: "船员；机组", emoji: "🌕" },
    { word: "mission", zh: "任务；飞行任务", emoji: "🌕" },
    { word: "return", zh: "返回", emoji: "🌕" },
    { word: "cold", zh: "冷的", emoji: "🌕" },
    { word: "dark", zh: "黑暗的", emoji: "🌕" },
    { word: "far", zh: "远的", emoji: "🌕" },
    { word: "ship", zh: "飞船", emoji: "🌕" },
    { word: "leap", zh: "飞跃", emoji: "🌕" },
    { word: "giant", zh: "巨大的", emoji: "🌕" },
    { word: "neil-armstrong", zh: "尼尔·阿姆斯特朗", emoji: "🌕" },
    { word: "buzz-aldrin", zh: "巴兹·奥尔德林", emoji: "🌕" },
    { word: "michael-collins", zh: "迈克尔·柯林斯", emoji: "🌕" },
    { word: "lunar", zh: "月球的", emoji: "🌕" },
    { word: "twelve", zh: "十二", emoji: "🌕" },
    { word: "twenty-four", zh: "二十四", emoji: "🌕" },
    { word: "again", zh: "再次", emoji: "🌕" },
    { word: "travel", zh: "旅行", emoji: "🌕" },
    { word: "sky", zh: "天空", emoji: "🌕" },
  ];
  var ALL_KEYS = ALL_WORDS.map(function (w) { return w.word; });
  var WMAP = {};
  ALL_WORDS.forEach(function (w) { WMAP[w.word] = w; });
  function normalizeKeys(keys) {
    if (!keys || !keys.length) return [];
    var out = [];
    keys.forEach(function (k) {
      var key = String(k).toLowerCase().trim().replace(/ /g, "-");
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
    IMG_BASE: "../how-many-people-have-been-to-the-moon-courseware/images/words/",
    getSelected: getSelected, getSelectedKeys: getSelectedKeys,
    saveKeys: saveKeys, chunkForMemory: chunkForMemory, shuffle: shuffle,
    MIN_WORDS_GAME1: 2, MIN_WORDS_GAME2: 2, MIN_WORDS_GAME3: 1,
    MIN_WORDS_GAME4: 4, MIN_WORDS_GAME5: 3, MIN_WORDS_GAME6: 3,
    MIN_WORDS_GAME7: 3, MIN_WORDS_GAME8: 4, MIN_WORDS_GAME9: 4,
  };
  global.MoonPeopleWords = api;
  global.WhatAreReptilesWords = api;
  global.WorldsLargestDesertsWords = api;
})(typeof window !== "undefined" ? window : this);
