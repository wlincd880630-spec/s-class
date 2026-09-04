/**
 * Level 1 The Alphabet · Unit 2 · Letter Dd
 * Chant 保留教材 MP3（track18）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：听音圈图 4×4；练习册 C：小狗迷宫连线。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Dd/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", d: true },
    desk: { id: "desk", en: "desk", zh: "书桌", onset: "d", rest: "esk", img: IMG + "desk.jpg", d: true },
    doll: { id: "doll", en: "doll", zh: "玩偶", onset: "d", rest: "oll", img: IMG + "doll.jpg", d: true },
    duck: { id: "duck", en: "duck", zh: "鸭子", onset: "d", rest: "uck", img: IMG + "duck.jpg", d: true },
    computer: { id: "computer", en: "computer", zh: "电脑", onset: "c", rest: "omputer", img: IMG + "computer.jpg", d: false },
    ant: { id: "ant", en: "ant", zh: "蚂蚁", onset: "a", rest: "nt", img: IMG + "ant.jpg", d: false },
    bird: { id: "bird", en: "bird", zh: "鸟", onset: "b", rest: "ird", img: IMG + "bird.jpg", d: false },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", img: IMG + "banana.jpg", d: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", d: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", d: false },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", img: IMG + "bed.jpg", d: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", d: false },
    alligator: { id: "alligator", en: "alligator", zh: "短吻鳄", onset: "a", rest: "lligator", img: IMG + "alligator.jpg", d: false },
    axe: { id: "axe", en: "axe", zh: "斧头", onset: "a", rest: "xe", img: IMG + "axe.jpg", d: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", d: false },
    car: { id: "car", en: "car", zh: "小汽车", onset: "c", rest: "ar", img: IMG + "car.jpg", d: false },
    "dizzy-dog": {
      id: "dizzy-dog",
      en: "dizzy dog",
      zh: "头晕狗",
      onset: "d",
      rest: "izzy dog",
      img: IMG + "dizzy-dog.jpg",
      d: true,
      phrase: true
    }
  };

  global.DD_LESSON = {
    unit: "Unit 2",
    pages: "Student's Book p.12–13",
    workbookPages: "Workbook Unit 2 Dd p.6",
    letter: "Dd",
    letterCap: "D",
    letterSmall: "d",
    soundIpa: "/d/",
    soundHint: "齿龈爆破音，像 dizzy dog 里的 d",
    mascot: {
      id: "dizzy-dog",
      phrase: "dizzy dog",
      zh: "头晕狗",
      img: IMG + "dizzy-dog.jpg"
    },
    hero: IMG + "hero-dd.jpg",
    video: "assets/video/letter-d.mp4",
    // 小狗连到狗屋的迷宫图；不要复用 Bb 的 connect-map.jpg（那是海狸/Bb 路径）
    connectMap: IMG + "dog-connect-map.jpg",
    tracks: {
      chant: AUD + "track18.mp3"
    },
    vocab: [WORDS.dog, WORDS.desk, WORDS.doll, WORDS.duck],
    track05Items: [
      { id: "desk", writeDd: true },
      { id: "apple", writeDd: false },
      { id: "doll", writeDd: true },
      { id: "dog", writeDd: true },
      { id: "ant", writeDd: false },
      { id: "duck", writeDd: true }
    ],
    chantOrder: ["doll", "dog", "desk", "duck"],
    soundHuntGrid: [
      "computer", "ant", "doll", "bird",
      "desk", "banana", "apple", "cup",
      "bed", "dog", "cat", "alligator",
      "axe", "bear", "car", "duck"
    ],
    distractors: [
      WORDS.computer, WORDS.ant, WORDS.bird, WORDS.banana,
      WORDS.apple, WORDS.cup, WORDS.bed, WORDS.cat,
      WORDS.alligator, WORDS.axe, WORDS.bear, WORDS.car
    ],
    words: WORDS,
    workbookCircle: ["dog", "desk", "banana", "doll", "car", "duck"],
    workbookCircleExample: "dog",
    workbookLetters: ["D", "d", "A", "b", "D", "a", "c", "d"],
    oddOneOutPrint: [
      ["dog", "desk", "apple"],
      ["duck", "ant", "doll"],
      ["dog", "cat", "desk"],
      ["duck", "bear", "doll"]
    ],
    soundHunt: [
      "dog", "apple", "desk", "ant",
      "doll", "banana", "axe", "alligator",
      "duck", "cat", "bear", "dizzy-dog"
    ],
    copyDefaults: ["dog", "desk", "doll", "duck"],
    matchWords: ["desk", "dog", "duck", "doll"],
    choosePicture: [
      { word: "dog", pics: ["apple", "dog", "ant"] },
      { word: "desk", pics: ["desk", "cat", "axe"] },
      { word: "doll", pics: ["doll", "bear", "alligator"] },
      { word: "duck", pics: ["duck", "car", "cup"] }
    ],
    chooseWord: [
      { pic: "dog", words: ["desk", "dog", "apple"] },
      { pic: "desk", words: ["desk", "ant", "bear"] },
      { pic: "doll", words: ["bed", "doll", "cat"] },
      { pic: "duck", words: ["duck", "car", "apple"] }
    ],
    wordMaze: {
      size: 10,
      words: ["dog", "desk", "doll", "duck"],
      grid: [
        "BCDFHKJMQD",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "DOGDCDFHJK",
        "JKMQUVWYDN",
        "KMQUVWYZCA",
        "MQUVAWYZDT",
        "QUVWNYZDES",
        "UVWYTBCDHK",
        "DDUCKDOLLU"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 d 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 d 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Dd 还是 ✗", short: "Dd / ✗", desc: "听完选 Dd 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
