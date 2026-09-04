/**
 * Level 1 The Alphabet · Unit 1 · Letter Aa
 * Chant 保留教材 MP3（track06）；其余练习走 Azure 英音慢速 TTS。
 * 练习册干扰图 banana / computer 来自 Workbook Unit 1，配图为本课重绘。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Aa/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", a: true },
    axe: { id: "axe", en: "axe", zh: "斧头", onset: "a", rest: "xe", img: IMG + "axe.jpg", a: true },
    ant: { id: "ant", en: "ant", zh: "蚂蚁", onset: "a", rest: "nt", img: IMG + "ant.jpg", a: true },
    alligator: { id: "alligator", en: "alligator", zh: "短吻鳄", onset: "a", rest: "lligator", img: IMG + "alligator.jpg", a: true },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", img: IMG + "banana.jpg", a: false },
    computer: { id: "computer", en: "computer", zh: "电脑", onset: "c", rest: "omputer", img: IMG + "computer.jpg", a: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", a: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", a: false },
    ball: { id: "ball", en: "ball", zh: "球", onset: "b", rest: "all", img: IMG + "ball.jpg", a: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", a: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", a: false },
    "angry-apple": {
      id: "angry-apple",
      en: "angry apple",
      zh: "生气的苹果",
      onset: "a",
      rest: "ngry apple",
      img: IMG + "angry-apple.jpg",
      a: true,
      phrase: true
    }
  };

  global.AA_LESSON = {
    unit: "Unit 1",
    pages: "Student's Book p.4–5",
    workbookPages: "Workbook Unit 1 Aa",
    letter: "Aa",
    letterCap: "A",
    letterSmall: "a",
    soundIpa: "/æ/",
    soundHint: "短元音，像 angry apple 里的 a",
    mascot: {
      id: "angry-apple",
      phrase: "angry apple",
      zh: "生气的苹果",
      img: IMG + "angry-apple.jpg"
    },
    hero: IMG + "hero-aa.jpg",
    video: "assets/video/letter-a.mp4",
    tracks: {
      chant: AUD + "track06.mp3"
    },
    vocab: [WORDS.apple, WORDS.axe, WORDS.ant, WORDS.alligator],
    track05Items: [
      { id: "ant", writeAa: true },
      { id: "bear", writeAa: false },
      { id: "apple", writeAa: true },
      { id: "alligator", writeAa: true },
      { id: "cup", writeAa: false },
      { id: "axe", writeAa: true }
    ],
    chantOrder: ["ant", "apple", "alligator", "axe"],
    distractors: [WORDS.bear, WORDS.cup, WORDS.ball, WORDS.cat, WORDS.dog],
    words: WORDS,
    workbookCircle: ["apple", "banana", "alligator", "computer", "axe", "ant"],
    workbookCircleExample: "apple",
    workbookLetters: ["a", "A", "c", "B", "a", "C", "b", "A"],
    oddOneOutPrint: [
      ["apple", "axe", "bear"],
      ["ant", "cup", "alligator"],
      ["apple", "dog", "ant"],
      ["axe", "ball", "alligator"]
    ],
    soundHunt: [
      "apple", "banana", "alligator", "computer",
      "axe", "ant", "bear", "cup",
      "ball", "cat", "dog", "angry-apple"
    ],
    copyDefaults: ["apple", "axe", "ant", "alligator"],
    matchWords: ["ant", "apple", "alligator", "axe"],
    choosePicture: [
      { word: "apple", pics: ["banana", "apple", "cup"] },
      { word: "axe", pics: ["axe", "ball", "bear"] },
      { word: "ant", pics: ["cat", "dog", "ant"] },
      { word: "alligator", pics: ["computer", "banana", "alligator"] }
    ],
    chooseWord: [
      { pic: "apple", words: ["ant", "apple", "banana"] },
      { pic: "axe", words: ["cup", "apple", "axe"] },
      { pic: "ant", words: ["ant", "cat", "axe"] },
      { pic: "alligator", words: ["apple", "alligator", "computer"] }
    ],
    wordMaze: {
      size: 10,
      words: ["apple", "axe", "ant", "alligator"],
      grid: [
        "BCDFHKJMQA",
        "DFHJKMQUVL",
        "FHJKMQUVWL",
        "AXEBCDFHJI",
        "JKMQUVWYBG",
        "KMQUVWYZCA",
        "MQUVAWYZDT",
        "QUVWNYZBFO",
        "UVWYTBCDHR",
        "BAPPLEQUVY"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 a 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 a 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Aa 还是 ✗", short: "Aa / ✗", desc: "听完选 Aa 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
