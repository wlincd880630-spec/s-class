/**
 * Unit 3 Review · Gg Hh Ii
 * 教材 Student's Book p.30–31 + Workbook p.15
 * Story 音频保留教材 MP3（track44-story）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/GHI/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    gorilla: { id: "gorilla", en: "gorilla", zh: "大猩猩", onset: "g", rest: "orilla", letter: "g", img: IMG + "gorilla.jpg" },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", letter: "g", img: IMG + "goat.jpg" },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", letter: "g", img: IMG + "gift.jpg" },
    girl: { id: "girl", en: "girl", zh: "女孩", onset: "g", rest: "irl", letter: "g", img: IMG + "girl.jpg" },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", letter: "h", img: IMG + "horse.jpg" },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", letter: "h", img: IMG + "hat.jpg" },
    house: { id: "house", en: "house", zh: "房子", onset: "h", rest: "ouse", letter: "h", img: IMG + "house.jpg" },
    "hot-dog": { id: "hot-dog", en: "hot dog", zh: "热狗", onset: "h", rest: "ot dog", letter: "h", img: IMG + "hot-dog.jpg" },
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", letter: "i", img: IMG + "insect.jpg" },
    ink: { id: "ink", en: "ink", zh: "墨水", onset: "i", rest: "nk", letter: "i", img: IMG + "ink.jpg" },
    igloo: { id: "igloo", en: "igloo", zh: "冰屋", onset: "i", rest: "gloo", letter: "i", img: IMG + "igloo.jpg" },
    iguana: { id: "iguana", en: "iguana", zh: "鬣蜥", onset: "i", rest: "guana", letter: "i", img: IMG + "iguana.jpg" },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", letter: "b", img: IMG + "bear.jpg" }
  };

  global.GHI_REVIEW = {
    unit: "Unit 3 Review",
    pages: "Student's Book p.30–31",
    workbookPages: "Workbook p.15",
    letters: ["Gg", "Hh", "Ii"],
    hero: IMG + "hero-ghi.jpg",
    story: IMG + "story-ghi.jpg",
    sightWords: ["want", "this", "my"],
    tracks: {
      story: AUD + "track44-story.mp3"
    },
    words: WORDS,
    sameSoundBoxes: [
      { tone: "blue", pics: ["hat", "ink", "goat", "horse"], answer: ["hat", "horse"] },
      { tone: "orange", pics: ["gift", "hot-dog", "igloo", "insect"], answer: ["igloo", "insect"] },
      { tone: "yellow", pics: ["gorilla", "girl", "house", "iguana"], answer: ["gorilla", "girl"] }
    ],
    listenCircle: [
      { pic: "girl", cap: "G", small: "g", sample: true },
      { pic: "ink", cap: "I", small: "i", sample: false },
      { pic: "horse", cap: "H", small: "h", sample: false }
    ],
    writeItems: [
      { id: "insect", modeled: true, letters: "Ii" },
      { id: "gorilla", modeled: false, letters: "Gg" },
      { id: "hat", modeled: false, letters: "Hh" },
      { id: "igloo", modeled: false, letters: "Ii" }
    ],
    wbBeginningSound: [
      { pic: "gift", answer: "g" },
      { pic: "iguana", answer: "i" },
      { pic: "hat", answer: "h" },
      { pic: "ink", answer: "i" },
      { pic: "horse", answer: "h" },
      { pic: "gorilla", answer: "g" },
      { pic: "hot-dog", answer: "h" },
      { pic: "girl", answer: "g", sample: true },
      { pic: "igloo", answer: "i" }
    ],
    wbTraceMatch: {
      caps: ["G", "H", "I"],
      pics: ["insect", "horse", "goat"],
      lowers: ["i", "g", "h"],
      pairs: { G: "goat", H: "horse", I: "insect" }
    },
    storyPanels: [
      { line: "I want a hot dog.", focus: "hot-dog" },
      { line: "I see an iguana.", focus: "iguana" },
      { line: "This is a bear.", focus: "bear" },
      { line: "It is a gorilla.", focus: "gorilla" },
      { line: "I want my bear!", focus: "bear" },
      { line: "I want a gorilla!", focus: "gorilla" }
    ],
    games: [
      { id: 1, title: "相同开头音", short: "圈一对", desc: "找出同一框里开头音相同的两个图" },
      { id: 2, title: "听音圈字母", short: "听音", desc: "听单词，圈出 G / H / I" },
      { id: 3, title: "开头音选一", short: "g h i", desc: "练习册：听音选 g、h 或 i" },
      { id: 4, title: "描红连线", short: "连线", desc: "大写、图片、小写连线" }
    ]
  };
})(window);
