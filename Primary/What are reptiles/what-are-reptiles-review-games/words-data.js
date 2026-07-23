/**
 * What are reptiles? 复习游戏 · 词表
 */
(function (global) {
  "use strict";
  var STORAGE_KEY = "whatAreReptilesReview.selectedWords";
  var ALL_WORDS = [
    { word: "reptile", zh: "爬行动物", emoji: "🦎" },
    { word: "scale", zh: "鳞片", emoji: "🔶" },
    { word: "skin", zh: "皮肤", emoji: "🧴" },
    { word: "vertebrate", zh: "脊椎动物", emoji: "🦴" },
    { word: "backbone", zh: "脊椎；脊柱", emoji: "🦴" },
    { word: "cold-blooded", zh: "冷血的；变温的", emoji: "🌡️" },
    { word: "species", zh: "物种", emoji: "🐾" },
    { word: "snake", zh: "蛇", emoji: "🐍" },
    { word: "lizard", zh: "蜥蜴", emoji: "🦎" },
    { word: "tortoise", zh: "陆龟", emoji: "🐢" },
    { word: "turtle", zh: "海龟", emoji: "🐢" },
    { word: "crocodile", zh: "鳄鱼", emoji: "🐊" },
    { word: "alligator", zh: "短吻鳄", emoji: "🐊" },
    { word: "chameleon", zh: "变色龙", emoji: "🦎" },
    { word: "tuatara", zh: "喙头蜥", emoji: "🦎" },
    { word: "fossil", zh: "化石", emoji: "🦕" },
    { word: "dinosaur", zh: "恐龙", emoji: "🦕" },
    { word: "egg", zh: "蛋", emoji: "🥚" },
    { word: "lung", zh: "肺", emoji: "🫁" },
    { word: "limb", zh: "肢体；四肢", emoji: "🦵" },
    { word: "exoskeleton", zh: "外骨骼", emoji: "🛡️" },
    { word: "shell", zh: "壳", emoji: "🐚" },
    { word: "carnivore", zh: "食肉动物", emoji: "🥩" },
    { word: "herbivore", zh: "食草动物", emoji: "🌿" },
    { word: "predator", zh: "捕食者", emoji: "🦁" },
    { word: "prey", zh: "猎物", emoji: "🐭" },
    { word: "hunt", zh: "捕猎", emoji: "🎯" },
    { word: "breathe", zh: "呼吸", emoji: "💨" },
    { word: "water", zh: "水", emoji: "💧" },
    { word: "land", zh: "陆地", emoji: "🏔️" },
    { word: "continent", zh: "大陆", emoji: "🌍" },
    { word: "antarctica", zh: "南极洲", emoji: "🧊" },
    { word: "rare", zh: "稀有的", emoji: "💎" },
    { word: "shy", zh: "害羞的", emoji: "🙈" },
    { word: "tail", zh: "尾巴", emoji: "〰️" },
    { word: "meat", zh: "肉", emoji: "🍖" },
    { word: "plant", zh: "植物", emoji: "🌱" },
    { word: "evolve", zh: "进化", emoji: "🧬" },
    { word: "discover", zh: "发现", emoji: "🔍" },
    { word: "heathland", zh: "荒地", emoji: "🌾" },
    { word: "moor", zh: "沼泽地", emoji: "🌿" },
    { word: "adder", zh: "蝰蛇", emoji: "🐍" },
    { word: "iguana", zh: "鬣蜥", emoji: "🦎" },
    { word: "skink", zh: "石龙子", emoji: "🦎" },
    { word: "amphibian", zh: "两栖动物", emoji: "🐸" },
    { word: "mammal", zh: "哺乳动物", emoji: "🐿️" },
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
  global.WhatAreReptilesWords = {
    ALL: ALL_WORDS, ALL_KEYS: ALL_KEYS, WMAP: WMAP, STORAGE_KEY: STORAGE_KEY,
    IMG_BASE: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/What%20are%20reptiles/what-are-reptiles-courseware/images/words/",
    getSelected: getSelected, getSelectedKeys: getSelectedKeys,
    saveKeys: saveKeys, chunkForMemory: chunkForMemory, shuffle: shuffle,
    MIN_WORDS_GAME1: 2, MIN_WORDS_GAME2: 2, MIN_WORDS_GAME3: 1,
    MIN_WORDS_GAME4: 4, MIN_WORDS_GAME5: 3, MIN_WORDS_GAME6: 3,
    MIN_WORDS_GAME7: 3, MIN_WORDS_GAME8: 4, MIN_WORDS_GAME9: 4,
  };
})(typeof window !== "undefined" ? window : this);
