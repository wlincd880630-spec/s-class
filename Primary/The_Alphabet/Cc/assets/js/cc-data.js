/**
 * Level 1 The Alphabet · Unit 1 · Letter Cc
 * Chant 保留教材 MP3（track14）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：小车涂色（标 c 的部位）；教材 E：字母 C 居中连线。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", c: true },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", c: true },
    computer: { id: "computer", en: "computer", zh: "电脑", onset: "c", rest: "omputer", img: IMG + "computer.jpg", c: true },
    car: { id: "car", en: "car", zh: "小汽车", onset: "c", rest: "ar", img: IMG + "car.jpg", c: true },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", c: false },
    ant: { id: "ant", en: "ant", zh: "蚂蚁", onset: "a", rest: "nt", img: IMG + "ant.jpg", c: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", c: false },
    ball: { id: "ball", en: "ball", zh: "球", onset: "b", rest: "all", img: IMG + "ball.jpg", c: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", c: false },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", img: IMG + "bed.jpg", c: false },
    bird: { id: "bird", en: "bird", zh: "鸟", onset: "b", rest: "ird", img: IMG + "bird.jpg", c: false },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", img: IMG + "banana.jpg", c: false },
    "cool-cat": {
      id: "cool-cat",
      en: "cool cat",
      zh: "酷猫",
      onset: "c",
      rest: "ool cat",
      img: IMG + "cool-cat.jpg",
      c: true,
      phrase: true
    }
  };

  global.CC_LESSON = {
    unit: "Unit 1",
    pages: "Student's Book p.8–9",
    workbookPages: "Workbook Unit 1 Cc",
    letter: "Cc",
    letterCap: "C",
    letterSmall: "c",
    soundIpa: "/k/",
    soundHint: "软腭清塞音，像 cool cat 里的 c",
    mascot: {
      id: "cool-cat",
      phrase: "cool cat",
      zh: "酷猫",
      img: IMG + "cool-cat.jpg"
    },
    hero: IMG + "hero-cc.jpg",
    video: "assets/video/letter-c.mp4",
    carColor: IMG + "car-color.jpg",
    connectHub: {
      center: "Cc",
      pics: [
        { id: "cat", pos: "top" },
        { id: "cup", pos: "right" },
        { id: "computer", pos: "bottom" },
        { id: "car", pos: "left" },
        { id: "apple", pos: "top-left" },
        { id: "bear", pos: "top-right" },
        { id: "dog", pos: "bottom-left" },
        { id: "ball", pos: "bottom-right" }
      ]
    },
    tracks: {
      chant: AUD + "track14.mp3"
    },
    vocab: [WORDS.cat, WORDS.cup, WORDS.computer, WORDS.car],
    track05Items: [
      { id: "cat", writeCc: true },
      { id: "apple", writeCc: false },
      { id: "cup", writeCc: true },
      { id: "car", writeCc: true },
      { id: "ant", writeCc: false },
      { id: "computer", writeCc: true }
    ],
    chantOrder: ["car", "cat", "computer", "cup"],
    distractors: [WORDS.apple, WORDS.ant, WORDS.bear, WORDS.ball, WORDS.dog, WORDS.bed],
    words: WORDS,
    workbookCircle: ["cat", "apple", "cup", "computer", "car", "ant"],
    workbookCircleExample: "cat",
    workbookLetters: ["C", "c", "A", "b", "C", "a", "d", "c"],
    oddOneOutPrint: [
      ["cat", "cup", "apple"],
      ["car", "ant", "computer"],
      ["cat", "dog", "cup"],
      ["car", "bear", "computer"]
    ],
    soundHunt: [
      "cat", "apple", "cup", "ant",
      "computer", "car", "bear", "ball",
      "dog", "banana", "bird", "cool-cat"
    ],
    copyDefaults: ["cat", "cup", "computer", "car"],
    matchWords: ["cup", "cat", "car", "computer"],
    choosePicture: [
      { word: "cat", pics: ["apple", "cat", "ant"] },
      { word: "cup", pics: ["cup", "ball", "bear"] },
      { word: "computer", pics: ["computer", "dog", "bed"] },
      { word: "car", pics: ["car", "apple", "bird"] }
    ],
    chooseWord: [
      { pic: "cat", words: ["cup", "cat", "apple"] },
      { pic: "cup", words: ["cup", "ant", "bear"] },
      { pic: "computer", words: ["bed", "computer", "dog"] },
      { pic: "car", words: ["car", "ball", "apple"] }
    ],
    wordMaze: {
      size: 10,
      words: ["cat", "cup", "computer", "car"],
      grid: [
        "BCDFHKJMQC",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "CATBCDFHJK",
        "JKMQUVWYCN",
        "KMQUVWYZCA",
        "MQUVAWYZDT",
        "QUVWNYBCIR",
        "UVWYTBCDHD",
        "CCOMPUTERU"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 c 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 c 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Cc 还是 ✗", short: "Cc / ✗", desc: "听完选 Cc 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
