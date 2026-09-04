/**
 * Level 1 The Alphabet · Unit 8 · Letter Zz
 * Chant 保留教材 MP3（track101 · Disc 2 Track 60）；其余 Azure TTS。
 * 教材 D：听写后配对（6 项）；练习册 B：z 音配对书写；练习册 C：写 Zz 或打叉。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Zz/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    zebra: { id: "zebra", en: "zebra", zh: "斑马", onset: "z", rest: "ebra", img: IMG + "zebra.jpg", z: true },
    zero: { id: "zero", en: "zero", zh: "零", onset: "z", rest: "ero", img: IMG + "zero.jpg", z: true },
    zip: { id: "zip", en: "zip", zh: "拉链", onset: "z", rest: "ip", img: IMG + "zip.jpg", z: true },
    zoo: { id: "zoo", en: "zoo", zh: "动物园", onset: "z", rest: "oo", img: IMG + "zoo.jpg", z: true },
    sick: { id: "sick", en: "sick", zh: "生病", onset: "s", rest: "ick", img: IMG + "sick.jpg", z: false },
    six: { id: "six", en: "six", zh: "六", onset: "s", rest: "ix", img: IMG + "six.jpg", z: false },
    sixteen: { id: "sixteen", en: "sixteen", zh: "十六", onset: "s", rest: "ixteen", img: IMG + "sixteen.jpg", z: false },
    pizza: { id: "pizza", en: "pizza", zh: "披萨", onset: "p", rest: "izza", img: IMG + "pizza.jpg", z: false },
    book: { id: "book", en: "book", zh: "书", onset: "b", rest: "ook", img: IMG + "book.jpg", z: false },
    zipper: { id: "zipper", en: "zipper", zh: "拉链", onset: "z", rest: "ipper", img: IMG + "zipper.jpg", z: true },
    wet: { id: "wet", en: "wet", zh: "湿的", onset: "w", rest: "et", img: IMG + "wet.jpg", z: false },
    sun: { id: "sun", en: "sun", zh: "太阳", onset: "s", rest: "un", img: IMG + "sun.jpg", z: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", z: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", z: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", z: false },
    van: { id: "van", en: "van", zh: "面包车", onset: "v", rest: "an", img: IMG + "van.jpg", z: false },
    "zany-zebra": {
      id: "zany-zebra",
      en: "zany zebra",
      zh: "滑稽斑马",
      onset: "z",
      rest: "any zebra",
      img: IMG + "zany-zebra.jpg",
      z: true,
      phrase: true
    }
  };

  global.ZZ_LESSON = {
    unit: "Unit 8",
    pages: "Student's Book p.80–81",
    workbookPages: "Workbook Unit 8 Zz p.41",
    letter: "Zz",
    letterCap: "Z",
    letterSmall: "z",
    soundIpa: "/z/",
    soundHint: "浊辅音 /z/，像 zany zebra 里的 z",
    mascot: {
      id: "zany-zebra",
      phrase: "zany zebra",
      zh: "滑稽斑马",
      img: IMG + "zany-zebra.jpg"
    },
    chantCharacter: IMG + "raincoat-girl.jpg",
    chantBubbleWord: "zip",
    chantBubblePrefix: "I don't have a",
    hero: IMG + "hero-zz.jpg",
    video: "assets/video/letter-z.mp4",
    tracks: {
      chant: AUD + "track101.mp3"
    },
    vocab: [WORDS.zebra, WORDS.zero, WORDS.zip, WORDS.zoo],
    listenWriteMatch: [
      { id: "sick", writeZz: false },
      { id: "zebra", writeZz: true },
      { id: "six", writeZz: false },
      { id: "sixteen", writeZz: false },
      { id: "zoo", writeZz: true },
      { id: "zip", writeZz: true }
    ],
    track05Items: [
      { id: "zebra", writeZz: true },
      { id: "zipper", writeZz: true },
      { id: "book", writeZz: false },
      { id: "zip", writeZz: true }
    ],
    chantOrder: ["zip", "zebra", "zero", "zoo"],
    distractors: [
      WORDS.sick, WORDS.six, WORDS.sixteen, WORDS.pizza,
      WORDS.book, WORDS.wet, WORDS.sun, WORDS.van
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["pizza", "zero"], answer: "zero" },
      { pics: ["sick", "zip"], answer: "zip" },
      { pics: ["sixteen", "zoo"], answer: "zoo" },
      { pics: ["zebra", "pizza"], answer: "zebra" }
    ],
    oddOneOutPrint: [
      ["zebra", "zero", "six"],
      ["zip", "sick", "zoo"],
      ["zero", "pizza", "zip"],
      ["zoo", "book", "zebra"]
    ],
    soundHunt: [
      "zebra", "apple", "zero", "six",
      "zip", "sick", "zoo", "pizza",
      "zipper", "cat", "bear", "zany-zebra"
    ],
    copyDefaults: ["zebra", "zero", "zip", "zoo"],
    matchWords: ["zebra", "zero", "zip", "zoo"],
    choosePicture: [
      { word: "zebra", pics: ["six", "zebra", "egg"] },
      { word: "zero", pics: ["zero", "pizza", "bear"] },
      { word: "zip", pics: ["sick", "zip", "cat"] },
      { word: "zoo", pics: ["zoo", "book", "van"] }
    ],
    chooseWord: [
      { pic: "zebra", words: ["zero", "zebra", "six"] },
      { pic: "zero", words: ["zero", "pizza", "fox"] },
      { pic: "zip", words: ["sick", "zip", "box"] },
      { pic: "zoo", words: ["zoo", "book", "wet"] }
    ],
    wordMaze: {
      size: 10,
      words: ["zebra", "zero", "zip", "zoo"],
      grid: [
        "BCDFHLMQSZ",
        "DFHLMQSZEB",
        "FHLMQSZEBR",
        "ZEROBCDHZO",
        "HLMQSZEBRA",
        "HLMQSZOOAW",
        "LMQSZIPERO",
        "MQSZOOZIPZ",
        "SZOOBCDFHZW",
        "ZZEBRAZERO"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 z 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出不是 z 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Zz 还是 ✗", short: "Zz / ✗", desc: "听完选 Zz 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
