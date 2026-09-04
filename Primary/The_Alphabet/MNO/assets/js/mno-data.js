/**
 * Unit 5 Review · Mm Nn Oo
 * 教材 Student's Book p.50–51 + Workbook p.25
 * Story 音频保留教材 MP3（track64-story）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/MNO/assets/img/";
  var AUD = "assets/audio/";
  var LETTER_OPTS = ["m", "n", "o"];

  var WORDS = {
    monkey: { id: "monkey", en: "monkey", zh: "猴子", onset: "m", rest: "onkey", letter: "m", img: IMG + "monkey.jpg" },
    mouse: { id: "mouse", en: "mouse", zh: "老鼠", onset: "m", rest: "ouse", letter: "m", img: IMG + "mouse.jpg" },
    milk: { id: "milk", en: "milk", zh: "牛奶", onset: "m", rest: "ilk", letter: "m", img: IMG + "milk.jpg" },
    money: { id: "money", en: "money", zh: "钱", onset: "m", rest: "oney", letter: "m", img: IMG + "money.jpg" },
    nut: { id: "nut", en: "nut", zh: "坚果", onset: "n", rest: "ut", letter: "n", img: IMG + "nut.jpg" },
    net: { id: "net", en: "net", zh: "网", onset: "n", rest: "et", letter: "n", img: IMG + "net.jpg" },
    nest: { id: "nest", en: "nest", zh: "鸟巢", onset: "n", rest: "est", letter: "n", img: IMG + "nest.jpg" },
    nose: { id: "nose", en: "nose", zh: "鼻子", onset: "n", rest: "ose", letter: "n", img: IMG + "nose.jpg" },
    octopus: { id: "octopus", en: "octopus", zh: "章鱼", onset: "o", rest: "ctopus", letter: "o", img: IMG + "octopus.jpg" },
    olive: { id: "olive", en: "olive", zh: "橄榄", onset: "o", rest: "live", letter: "o", img: IMG + "olive.jpg" },
    ox: { id: "ox", en: "ox", zh: "牛", onset: "o", rest: "x", letter: "o", img: IMG + "ox.jpg" },
    ostrich: { id: "ostrich", en: "ostrich", zh: "鸵鸟", onset: "o", rest: "strich", letter: "o", img: IMG + "ostrich.jpg" }
  };

  global.MNO_REVIEW = {
    unit: "Unit 5 Review",
    pages: "Student's Book p.50–51",
    workbookPages: "Workbook p.25",
    letters: ["Mm", "Nn", "Oo"],
    letterOpts: LETTER_OPTS,
    hero: IMG + "hero-mno.jpg",
    story: IMG + "story-mno.jpg",
    sightWords: ["no", "yes", "your"],
    tracks: {
      story: AUD + "track64-story.mp3"
    },
    words: WORDS,
    sameSoundBoxes: [
      { tone: "blue", pics: ["olive", "nose", "octopus", "milk"], answer: ["olive", "octopus"] },
      { tone: "orange", pics: ["mouse", "money", "nest", "ostrich"], answer: ["mouse", "money"] },
      { tone: "yellow", pics: ["ox", "nut", "monkey", "net"], answer: ["nut", "net"] }
    ],
    listenCircle: [
      { pic: "nest", cap: "N", small: "n", sample: true },
      { pic: "monkey", cap: "M", small: "m", sample: false },
      { pic: "octopus", cap: "O", small: "o", sample: false }
    ],
    writeItems: [
      { id: "nose", modeled: true, letters: "Nn" },
      { id: "net", modeled: false, letters: "Nn" },
      { id: "mouse", modeled: false, letters: "Mm" },
      { id: "ostrich", modeled: false, letters: "Oo" }
    ],
    wbBeginningSound: [
      { pic: "octopus", answer: "o" },
      { pic: "mouse", answer: "m" },
      { pic: "nose", answer: "n" },
      { pic: "nest", answer: "n" },
      { pic: "olive", answer: "o" },
      { pic: "money", answer: "m" },
      { pic: "ox", answer: "o" },
      { pic: "net", answer: "n" },
      { pic: "monkey", answer: "m", sample: true }
    ],
    wbTraceMatch: {
      caps: ["M", "N", "O"],
      lowers: ["o", "m", "n"],
      pics: ["nut", "octopus", "milk"],
      pairs: { M: "milk", N: "nut", O: "octopus" },
      sampleCap: "M"
    },
    storyPanels: [
      { line: "This is my nut.", focus: "nut" },
      { line: "That is my nut!", focus: "nut" },
      { line: "No, it is my nut.", focus: "nut" },
      { line: "It is a monkey!", focus: "monkey" },
      { line: "Yes, it is your nut.", focus: "nut" },
      { line: "Is that your olive?", focus: "olive" },
      { line: "No, it is your olive!", focus: "olive" }
    ],
    games: [
      { id: 1, title: "相同开头音", short: "圈一对", desc: "找出同一框里开头音相同的两个图" },
      { id: 2, title: "听音圈字母", short: "听音", desc: "听单词，圈出 M / N / O" },
      { id: 3, title: "开头音选一", short: "m n o", desc: "练习册：听音选 m、n 或 o" },
      { id: 4, title: "描红连线", short: "连线", desc: "大写、小写、图片连线" }
    ]
  };
})(window);
