/**
 * Unit 4 Review · Jj Kk Ll
 * 参照 GHI 复习结构；词汇来自 J/K/L 字母课。
 * Story 音频保留教材 MP3（track56-story）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/JKL/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", letter: "j", img: IMG + "jet.jpg" },
    jam: { id: "jam", en: "jam", zh: "果酱", onset: "j", rest: "am", letter: "j", img: IMG + "jam.jpg" },
    juice: { id: "juice", en: "juice", zh: "果汁", onset: "j", rest: "uice", letter: "j", img: IMG + "juice.jpg" },
    jacket: { id: "jacket", en: "jacket", zh: "夹克", onset: "j", rest: "acket", letter: "j", img: IMG + "jacket.jpg" },
    kangaroo: { id: "kangaroo", en: "kangaroo", zh: "袋鼠", onset: "k", rest: "angaroo", letter: "k", img: IMG + "kangaroo.jpg" },
    key: { id: "key", en: "key", zh: "钥匙", onset: "k", rest: "ey", letter: "k", img: IMG + "key.jpg" },
    king: { id: "king", en: "king", zh: "国王", onset: "k", rest: "ing", letter: "k", img: IMG + "king.jpg" },
    kite: { id: "kite", en: "kite", zh: "风筝", onset: "k", rest: "ite", letter: "k", img: IMG + "kite.jpg" },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", letter: "l", img: IMG + "lion.jpg" },
    leaf: { id: "leaf", en: "leaf", zh: "树叶", onset: "l", rest: "eaf", letter: "l", img: IMG + "leaf.jpg" },
    leg: { id: "leg", en: "leg", zh: "腿", onset: "l", rest: "eg", letter: "l", img: IMG + "leg.jpg" },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", letter: "l", img: IMG + "lamp.jpg" },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", letter: "h", img: IMG + "horse.jpg" }
  };

  global.JKL_REVIEW = {
    unit: "Unit 4 Review",
    pages: "Jj · Kk · Ll",
    workbookPages: "Workbook · Unit 4 Review",
    letters: ["Jj", "Kk", "Ll"],
    hero: IMG + "hero-jkl.jpg",
    story: IMG + "story-jkl.jpg",
    sightWords: ["this", "is", "a"],
    tracks: {
      story: AUD + "track56-story.mp3"
    },
    words: WORDS,
    sameSoundBoxes: [
      { tone: "blue", pics: ["jet", "key", "jam", "kite"], answer: ["jet", "jam"] },
      { tone: "orange", pics: ["kangaroo", "lamp", "leaf", "leg"], answer: ["leaf", "leg"] },
      { tone: "yellow", pics: ["juice", "jacket", "lion", "king"], answer: ["juice", "jacket"] }
    ],
    listenCircle: [
      { pic: "jet", cap: "J", small: "j", sample: true },
      { pic: "key", cap: "K", small: "k", sample: false },
      { pic: "lion", cap: "L", small: "l", sample: false }
    ],
    writeItems: [
      { id: "kite", modeled: true, letters: "Kk" },
      { id: "jet", modeled: false, letters: "Jj" },
      { id: "leg", modeled: false, letters: "Ll" },
      { id: "king", modeled: false, letters: "Kk" }
    ],
    wbBeginningSound: [
      { pic: "jam", answer: "j" },
      { pic: "lion", answer: "l" },
      { pic: "key", answer: "k" },
      { pic: "leaf", answer: "l" },
      { pic: "jet", answer: "j" },
      { pic: "kangaroo", answer: "k" },
      { pic: "juice", answer: "j" },
      { pic: "lamp", answer: "l", sample: true },
      { pic: "kite", answer: "k" }
    ],
    wbTraceMatch: {
      caps: ["J", "K", "L"],
      pics: ["jet", "kangaroo", "lion"],
      lowers: ["j", "k", "l"],
      pairs: { J: "jet", K: "kangaroo", L: "lion" }
    },
    storyPanels: [
      { line: "This is a jet.", focus: "jet" },
      { line: "This is a kangaroo.", focus: "kangaroo" },
      { line: "This is a lion.", focus: "lion" },
      { line: "I see a kite.", focus: "kite" },
      { line: "I want juice.", focus: "juice" },
      { line: "This is a lamp.", focus: "lamp" }
    ],
    games: [
      { id: 1, title: "相同开头音", short: "圈一对", desc: "找出同一框里开头音相同的两个图" },
      { id: 2, title: "听音圈字母", short: "听音", desc: "听单词，圈出 J / K / L" },
      { id: 3, title: "开头音选一", short: "j k l", desc: "练习册：听音选 j、k 或 l" },
      { id: 4, title: "描红连线", short: "连线", desc: "大写、图片、小写连线" }
    ]
  };
})(window);
