/**
 * Level 1 The Alphabet · Unit 7 · Letter Tt
 * Chant 保留教材 MP3（track77 · Disc 2 Track 35）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Tt/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    turtle: { id: "turtle", en: "turtle", zh: "乌龟", onset: "t", rest: "urtle", img: IMG + "turtle.jpg", t: true },
    tent: { id: "tent", en: "tent", zh: "帐篷", onset: "t", rest: "ent", img: IMG + "tent.jpg", t: true },
    tiger: { id: "tiger", en: "tiger", zh: "老虎", onset: "t", rest: "iger", img: IMG + "tiger.jpg", t: true },
    teacher: { id: "teacher", en: "teacher", zh: "老师", onset: "t", rest: "eacher", img: IMG + "teacher.jpg", t: true },
    table: { id: "table", en: "table", zh: "桌子", onset: "t", rest: "able", img: IMG + "table.jpg", t: true },
    boots: { id: "boots", en: "boots", zh: "靴子", onset: "b", rest: "oots", img: IMG + "boots.jpg", t: false },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", img: IMG + "gift.jpg", t: false },
    socks: { id: "socks", en: "socks", zh: "袜子", onset: "s", rest: "ocks", img: IMG + "socks.jpg", t: false },
    ox: { id: "ox", en: "ox", zh: "牛", onset: "o", rest: "x", img: IMG + "ox.jpg", t: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", t: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", t: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", t: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", t: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", t: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", t: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", t: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", t: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", t: false },
    "tall-turtle": {
      id: "tall-turtle",
      en: "tall turtle",
      zh: "高个子乌龟",
      onset: "t",
      rest: "all turtle",
      img: IMG + "tall-turtle.jpg",
      t: true,
      phrase: true
    }
  };

  global.TT_LESSON = {
    unit: "Unit 7",
    pages: "Student's Book p.66–67",
    workbookPages: "Workbook Unit 7 Tt p.33",
    letter: "Tt",
    letterCap: "T",
    letterSmall: "t",
    soundIpa: "/t/",
    soundHint: "爆破音 /t/，像 tall turtle 里的 t",
    mascot: { id: "tall-turtle", phrase: "tall turtle", zh: "高个子乌龟", img: IMG + "tall-turtle.jpg" },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "turtle",
    chantBubblePrefix: "That is my",
    hero: IMG + "hero-tt.jpg",
    video: "assets/video/letter-t.mp4",
    turtleColor: IMG + "turtle-color.jpg",
    tracks: { chant: AUD + "track77.mp3" },
    vocab: [WORDS.turtle, WORDS.tent, WORDS.tiger, WORDS.teacher],
    traceColorRows: [
      { id: "tiger", splatter: 1 },
      { id: "boots", splatter: 2 },
      { id: "table", splatter: 3 },
      { id: "turtle", splatter: 4 },
      { id: "gift", splatter: 5 },
      { id: "tent", splatter: 6 }
    ],
    traceColorAnswer: ["tiger", "table", "turtle", "tent"],
    soundRows: [
      { pics: ["turtle", "socks", "tent", "ox"], answer: "turtle" },
      { pics: ["tiger", "gift", "teacher", "boots"], answer: "tiger" },
      { pics: ["tent", "horse", "table", "fish"], answer: "tent" },
      { pics: ["teacher", "cat", "tiger", "bear"], answer: "teacher" }
    ],
    wbMatchItems: [
      { id: "tent", num: 1 },
      { id: "teacher", num: 2 },
      { id: "ox", num: 3 },
      { id: "tiger", num: 4 },
      { id: "socks", num: 5 },
      { id: "turtle", num: 6 }
    ],
    track05Items: [
      { id: "turtle", writeTt: true },
      { id: "tent", writeTt: true },
      { id: "socks", writeTt: false },
      { id: "tiger", writeTt: true }
    ],
    chantOrder: ["turtle", "tent", "teacher", "tiger"],
    distractors: [
      WORDS.boots, WORDS.gift, WORDS.socks, WORDS.ox,
      WORDS.horse, WORDS.fish, WORDS.cat, WORDS.bear,
      WORDS.dog, WORDS.egg, WORDS.fan, WORDS.apple
    ],
    words: WORDS,
    workbookCircle: ["tent", "teacher", "ox", "tiger", "socks", "turtle"],
    workbookCircleExample: "tiger",
    workbookLetters: ["T", "t", "A", "b", "T", "a", "d", "t"],
    turtleColorLetters: "TtSsNnIiUuVvMm",
    oddOneOutPrint: [
      ["turtle", "tent", "socks"],
      ["tiger", "egg", "teacher"],
      ["tent", "dog", "turtle"],
      ["teacher", "bear", "tiger"]
    ],
    soundHunt: [
      "turtle", "apple", "tent", "fan",
      "tiger", "horse", "teacher", "lion",
      "tent", "cat", "bear", "tall-turtle"
    ],
    copyDefaults: ["turtle", "tent", "tiger", "teacher"],
    matchWords: ["tent", "tiger", "turtle", "teacher"],
    choosePicture: [
      { word: "turtle", pics: ["fan", "turtle", "egg"] },
      { word: "tent", pics: ["tent", "dog", "bear"] },
      { word: "tiger", pics: ["horse", "tiger", "cat"] },
      { word: "teacher", pics: ["teacher", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "turtle", words: ["tent", "turtle", "fan"] },
      { pic: "tent", words: ["tent", "egg", "bear"] },
      { pic: "tiger", words: ["horse", "tiger", "cat"] },
      { pic: "teacher", words: ["teacher", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["turtle", "tent", "tiger", "teacher"],
      grid: [
        "BCDFHLJMQT",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "TENTBCDFHT",
        "HLJMQBVWYT",
        "HLMQBVWYZA",
        "LMQBVWYZTI",
        "MQBVNYZTON",
        "BVWYTBCDHT",
        "TTIGERTEAC"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 t 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出不是 t 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Tt 还是 ✗", short: "Tt / ✗", desc: "听完选 Tt 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
