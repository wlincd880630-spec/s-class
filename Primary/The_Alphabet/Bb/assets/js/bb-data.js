/**
 * Level 1 The Alphabet · Unit 1 · Letter Bb
 * Chant 保留教材 MP3（track10）；其余练习走 Azure 英音慢速 TTS。
 * 练习册干扰图 apple / ant 来自 Workbook Unit 1 Bb。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", b: true },
    bird: { id: "bird", en: "bird", zh: "鸟", onset: "b", rest: "ird", img: IMG + "bird.jpg", b: true },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", img: IMG + "bed.jpg", b: true },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", img: IMG + "banana.jpg", b: true },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", b: false },
    ant: { id: "ant", en: "ant", zh: "蚂蚁", onset: "a", rest: "nt", img: IMG + "ant.jpg", b: false },
    axe: { id: "axe", en: "axe", zh: "斧头", onset: "a", rest: "xe", img: IMG + "axe.jpg", b: false },
    alligator: { id: "alligator", en: "alligator", zh: "短吻鳄", onset: "a", rest: "lligator", img: IMG + "alligator.jpg", b: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", b: false },
    ball: { id: "ball", en: "ball", zh: "球", onset: "b", rest: "all", img: IMG + "ball.jpg", b: true },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", b: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", b: false },
    "big-bear": {
      id: "big-bear",
      en: "big bear",
      zh: "大熊",
      onset: "b",
      rest: "ig bear",
      img: IMG + "big-bear.jpg",
      b: true,
      phrase: true
    }
  };

  global.BB_LESSON = {
    unit: "Unit 1",
    pages: "Student's Book p.6–7",
    workbookPages: "Workbook Unit 1 Bb",
    letter: "Bb",
    letterCap: "B",
    letterSmall: "b",
    soundIpa: "/b/",
    soundHint: "双唇爆破音，像 big bear 里的 b",
    mascot: {
      id: "big-bear",
      phrase: "big bear",
      zh: "大熊",
      img: IMG + "big-bear.jpg"
    },
    hero: IMG + "hero-bb.jpg",
    video: "assets/video/letter-b.mp4",
    connectMap: IMG + "connect-map.jpg",
    connectPath: ["banana", "bird", "bear", "bed"],
    connectMatch: {
      pics: ["banana", "bird", "bear", "bed", "ant", "apple", "axe", "alligator"],
      words: ["bed", "ant", "banana", "alligator", "bird", "apple", "bear", "axe"]
    },
    tracks: {
      chant: AUD + "track10.mp3"
    },
    vocab: [WORDS.bear, WORDS.bird, WORDS.bed, WORDS.banana],
    track05Items: [
      { id: "bird", writeBb: true },
      { id: "apple", writeBb: false },
      { id: "bed", writeBb: true },
      { id: "bear", writeBb: true },
      { id: "ant", writeBb: false },
      { id: "banana", writeBb: true }
    ],
    chantOrder: ["bed", "bear", "banana", "bird"],
    distractors: [WORDS.apple, WORDS.ant, WORDS.axe, WORDS.alligator, WORDS.cup, WORDS.cat],
    words: WORDS,
    workbookCircle: ["bird", "apple", "bed", "banana", "bear", "ant"],
    workbookCircleExample: "bear",
    workbookLetters: ["B", "b", "A", "c", "B", "a", "d", "b"],
    oddOneOutPrint: [
      ["bear", "bird", "apple"],
      ["bed", "ant", "banana"],
      ["bear", "cat", "bird"],
      ["bed", "axe", "banana"]
    ],
    soundHunt: [
      "bear", "apple", "bird", "ant",
      "bed", "banana", "axe", "alligator",
      "ball", "cat", "dog", "big-bear"
    ],
    copyDefaults: ["bear", "bird", "bed", "banana"],
    matchWords: ["bird", "bear", "banana", "bed"],
    choosePicture: [
      { word: "bear", pics: ["apple", "bear", "ant"] },
      { word: "bird", pics: ["bird", "cat", "axe"] },
      { word: "bed", pics: ["bed", "dog", "alligator"] },
      { word: "banana", pics: ["banana", "apple", "cup"] }
    ],
    chooseWord: [
      { pic: "bear", words: ["bird", "bear", "apple"] },
      { pic: "bird", words: ["bed", "bird", "ant"] },
      { pic: "bed", words: ["bed", "cat", "bear"] },
      { pic: "banana", words: ["banana", "axe", "apple"] }
    ],
    wordMaze: {
      size: 10,
      words: ["bear", "bird", "bed", "banana"],
      grid: [
        "BCDFHKJMQB",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "BEARBCDFHJ",
        "JKMQUVWYBN",
        "KMQUVWYZCA",
        "MQUVAWYZDT",
        "QUVWNYZBIR",
        "UVWYTBCDHD",
        "BBANANAQUV"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 b 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 b 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Bb 还是 ✗", short: "Bb / ✗", desc: "听完选 Bb 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
