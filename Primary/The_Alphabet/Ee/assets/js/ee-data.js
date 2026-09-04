/**
 * Level 1 The Alphabet · Unit 2 · Letter Ee
 * Chant 保留教材 MP3（track22）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：蛋盒听音写 Ee 或打叉；练习册 B：e 音连线；练习册 C：四图写 Ee 或打叉。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ee/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", e: true },
    envelope: { id: "envelope", en: "envelope", zh: "信封", onset: "e", rest: "nvelope", img: IMG + "envelope.jpg", e: true },
    elbow: { id: "elbow", en: "elbow", zh: "手肘", onset: "e", rest: "lbow", img: IMG + "elbow.jpg", e: true },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", img: IMG + "elephant.jpg", e: true },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", e: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", e: false },
    desk: { id: "desk", en: "desk", zh: "书桌", onset: "d", rest: "esk", img: IMG + "desk.jpg", e: false },
    alligator: { id: "alligator", en: "alligator", zh: "短吻鳄", onset: "a", rest: "lligator", img: IMG + "alligator.jpg", e: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", e: false },
    ant: { id: "ant", en: "ant", zh: "蚂蚁", onset: "a", rest: "nt", img: IMG + "ant.jpg", e: false },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", img: IMG + "bed.jpg", e: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", e: false },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", img: IMG + "banana.jpg", e: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", e: false },
    "energetic-egg": {
      id: "energetic-egg",
      en: "energetic egg",
      zh: "活力蛋",
      onset: "e",
      rest: "nergetic egg",
      img: IMG + "energetic-egg.jpg",
      e: true,
      phrase: true
    }
  };

  global.EE_LESSON = {
    unit: "Unit 2",
    pages: "Student's Book p.14–15",
    workbookPages: "Workbook Unit 2 Ee p.7",
    letter: "Ee",
    letterCap: "E",
    letterSmall: "e",
    soundIpa: "/e/",
    soundHint: "短元音 /e/，像 energetic egg 里的 e",
    mascot: {
      id: "energetic-egg",
      phrase: "energetic egg",
      zh: "活力蛋",
      img: IMG + "energetic-egg.jpg"
    },
    hero: IMG + "hero-ee.jpg",
    video: "assets/video/letter-e.mp4",
    eggCarton: IMG + "egg-carton.jpg",
    tracks: {
      chant: AUD + "track22.mp3"
    },
    vocab: [WORDS.egg, WORDS.elbow, WORDS.envelope, WORDS.elephant],
    eggCartonItems: [
      { id: "elbow", writeEe: true },
      { id: "egg", writeEe: true },
      { id: "apple", writeEe: false },
      { id: "envelope", writeEe: true },
      { id: "ant", writeEe: false },
      { id: "elephant", writeEe: true },
      { id: "dog", writeEe: false },
      { id: "bed", writeEe: false }
    ],
    track05Items: [
      { id: "envelope", writeEe: true },
      { id: "dog", writeEe: false },
      { id: "elbow", writeEe: true },
      { id: "egg", writeEe: true }
    ],
    workbookMatch: [
      { ee: "egg", other: "apple" },
      { ee: "elbow", other: "bear" },
      { ee: "envelope", other: "desk" },
      { ee: "elephant", other: "alligator" }
    ],
    chantOrder: ["egg", "envelope", "elbow", "elephant"],
    distractors: [WORDS.apple, WORDS.bear, WORDS.desk, WORDS.alligator, WORDS.dog, WORDS.ant],
    words: WORDS,
    workbookCircle: ["egg", "elbow", "apple", "envelope", "elephant", "bear"],
    workbookCircleExample: "egg",
    workbookLetters: ["E", "e", "A", "b", "E", "a", "d", "e"],
    oddOneOutPrint: [
      ["egg", "envelope", "apple"],
      ["elbow", "ant", "elephant"],
      ["egg", "dog", "envelope"],
      ["elbow", "bear", "elephant"]
    ],
    soundHunt: [
      "egg", "apple", "elbow", "ant",
      "envelope", "banana", "desk", "alligator",
      "elephant", "cat", "bear", "energetic-egg"
    ],
    copyDefaults: ["egg", "elbow", "envelope", "elephant"],
    matchWords: ["envelope", "egg", "elephant", "elbow"],
    choosePicture: [
      { word: "egg", pics: ["apple", "egg", "ant"] },
      { word: "envelope", pics: ["envelope", "cup", "bear"] },
      { word: "elbow", pics: ["elbow", "cat", "desk"] },
      { word: "elephant", pics: ["elephant", "dog", "banana"] }
    ],
    chooseWord: [
      { pic: "egg", words: ["envelope", "egg", "apple"] },
      { pic: "envelope", words: ["envelope", "ant", "bear"] },
      { pic: "elbow", words: ["bed", "elbow", "cat"] },
      { pic: "elephant", words: ["elephant", "desk", "apple"] }
    ],
    wordMaze: {
      size: 10,
      words: ["egg", "elbow", "envelope", "elephant"],
      grid: [
        "BCDFHKJMQE",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "EGGBCDFHJK",
        "JKMQUVWYEN",
        "KMQUVWYZCA",
        "MQUVAWYZEL",
        "QUVWNYZBOW",
        "UVWYTBCDHE",
        "EENVELOPEU"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 e 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 e 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Ee 还是 ✗", short: "Ee / ✗", desc: "听完选 Ee 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
