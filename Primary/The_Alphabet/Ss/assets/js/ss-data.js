/**
 * Level 1 The Alphabet · Unit 7 · Letter Ss
 * Chant 保留教材 MP3（track74 · Disc 2 Track 32）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ss/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    seal: { id: "seal", en: "seal", zh: "海豹", onset: "s", rest: "eal", img: IMG + "seal.jpg", s: true },
    sun: { id: "sun", en: "sun", zh: "太阳", onset: "s", rest: "un", img: IMG + "sun.jpg", s: true },
    soap: { id: "soap", en: "soap", zh: "肥皂", onset: "s", rest: "oap", img: IMG + "soap.jpg", s: true },
    socks: { id: "socks", en: "socks", zh: "袜子", onset: "s", rest: "ocks", img: IMG + "socks.jpg", s: true },
    kangaroo: { id: "kangaroo", en: "kangaroo", zh: "袋鼠", onset: "k", rest: "angaroo", img: IMG + "kangaroo.jpg", s: false },
    olive: { id: "olive", en: "olive", zh: "橄榄", onset: "o", rest: "live", img: IMG + "olive.jpg", s: false },
    soap: { id: "soap", en: "soap", zh: "菠萝", onset: "p", rest: "ineapple", img: IMG + "soap.jpg", s: false },
    iguana: { id: "iguana", en: "iguana", zh: "鬣蜥", onset: "i", rest: "guana", img: IMG + "iguana.jpg", s: false },
    rose: { id: "rose", en: "rose", zh: "玫瑰", onset: "r", rest: "ose", img: IMG + "rose.jpg", s: false },
    rice: { id: "rice", en: "rice", zh: "米饭", onset: "r", rest: "ice", img: IMG + "rice.jpg", s: false },
    paper: { id: "paper", en: "paper", zh: "纸", onset: "p", rest: "aper", img: IMG + "paper.jpg", s: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", s: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", s: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", s: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", s: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", s: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", s: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", s: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", s: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", s: false },
    "super-seal": {
      id: "super-seal",
      en: "super seal",
      zh: "超级海豹",
      onset: "s",
      rest: "uper seal",
      img: IMG + "super-seal.jpg",
      s: true,
      phrase: true
    }
  };

  global.SS_LESSON = {
    unit: "Unit 7",
    pages: "Student's Book p.64–65",
    workbookPages: "Workbook Unit 7 Ss p.32",
    letter: "Ss",
    letterCap: "S",
    letterSmall: "s",
    soundIpa: "/s/",
    soundHint: "摩擦音 /s/，像 super seal 里的 s",
    mascot: { id: "super-seal", phrase: "super seal", zh: "超级海豹", img: IMG + "super-seal.jpg" },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "soap",
    chantBubblePrefix: "I see the",
    hero: IMG + "hero-ss.jpg",
    video: "assets/video/letter-s.mp4",
    tracks: { chant: AUD + "track74.mp3" },
    vocab: [WORDS.seal, WORDS.sun, WORDS.soap, WORDS.socks],
    soundRows: [
      { pics: ["soap", "kangaroo", "sun", "olive"], answer: "soap" },
      { pics: ["seal", "soap", "socks", "iguana"], answer: "seal" },
      { pics: ["sun", "rose", "soap", "rice"], answer: "sun" },
      { pics: ["socks", "horse", "seal", "fish"], answer: "socks" }
    ],
    matchEight: ["soap", "seal", "kangaroo", "sun", "olive", "socks", "soap", "iguana"],
    matchEightAnswer: ["soap", "seal", "sun", "socks"],
    track05Items: [
      { id: "seal", writeSs: true },
      { id: "sun", writeSs: true },
      { id: "rose", writeSs: false },
      { id: "soap", writeSs: true }
    ],
    chantOrder: ["soap", "sun", "socks", "seal"],
    distractors: [
      WORDS.kangaroo, WORDS.olive, WORDS.soap, WORDS.iguana,
      WORDS.rose, WORDS.rice, WORDS.paper, WORDS.horse,
      WORDS.fish, WORDS.cat, WORDS.bear, WORDS.dog
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["socks", "rose"], answer: "socks" },
      { pics: ["sun", "rice"], answer: "sun" },
      { pics: ["soap", "paper"], answer: "soap" },
      { pics: ["seal", "rose"], answer: "seal" }
    ],
    workbookCircle: ["rose", "sun", "soap", "socks", "seal", "paper"],
    workbookCircleExample: "sun",
    workbookWriteX: ["rice", "sun", "socks", "soap"],
    oddOneOutPrint: [
      ["seal", "sun", "horse"],
      ["soap", "egg", "socks"],
      ["sun", "dog", "seal"],
      ["socks", "bear", "soap"]
    ],
    soundHunt: [
      "seal", "apple", "sun", "fan",
      "soap", "horse", "socks", "lion",
      "sun", "cat", "bear", "super-seal"
    ],
    copyDefaults: ["seal", "sun", "soap", "socks"],
    matchWords: ["sun", "soap", "seal", "socks"],
    choosePicture: [
      { word: "seal", pics: ["fan", "seal", "egg"] },
      { word: "sun", pics: ["sun", "dog", "bear"] },
      { word: "soap", pics: ["horse", "soap", "cat"] },
      { word: "socks", pics: ["socks", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "seal", words: ["sun", "seal", "fan"] },
      { pic: "sun", words: ["sun", "egg", "bear"] },
      { pic: "soap", words: ["horse", "soap", "cat"] },
      { pic: "socks", words: ["socks", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["seal", "sun", "soap", "socks"],
      grid: [
        "BCDFHLJMQS",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "SEALBCDFHS",
        "HLJMQBVWYS",
        "HLMQBVWYZA",
        "LMQBVWYZSO",
        "MQBVNYZTON",
        "BVWYTBCDHS",
        "SSOAPSOCKS"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 s 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出不是 s 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Ss 还是 ✗", short: "Ss / ✗", desc: "听完选 Ss 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
