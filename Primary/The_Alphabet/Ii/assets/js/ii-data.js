/**
 * Level 1 The Alphabet · Unit 3 · Letter Ii
 * Chant 保留教材 MP3（track43）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：描红涂色 6 图（/ɪ/ 开头）；练习册 B：圈 i 音图；练习册 C：冰屋涂 I/i。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ii/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", img: IMG + "insect.jpg", i: true },
    ink: { id: "ink", en: "ink", zh: "墨水", onset: "i", rest: "nk", img: IMG + "ink.jpg", i: true },
    igloo: { id: "igloo", en: "igloo", zh: "冰屋", onset: "i", rest: "gloo", img: IMG + "igloo.jpg", i: true },
    iguana: { id: "iguana", en: "iguana", zh: "鬣蜥", onset: "i", rest: "guana", img: IMG + "iguana.jpg", i: true },
    house: { id: "house", en: "house", zh: "房子", onset: "h", rest: "ouse", img: IMG + "house.jpg", i: false },
    car: { id: "car", en: "car", zh: "汽车", onset: "c", rest: "ar", img: IMG + "car.jpg", i: false },
    computer: { id: "computer", en: "computer", zh: "电脑", onset: "c", rest: "omputer", img: IMG + "computer.jpg", i: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", i: false },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", img: IMG + "elephant.jpg", i: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", i: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", i: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", i: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", i: false },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", img: IMG + "goat.jpg", i: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", i: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", i: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", i: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", i: false },
    gorilla: { id: "gorilla", en: "gorilla", zh: "大猩猩", onset: "g", rest: "orilla", img: IMG + "gorilla.jpg", i: false },
    "interesting-insect": {
      id: "interesting-insect",
      en: "interesting insect",
      zh: "有趣昆虫",
      onset: "i",
      rest: "nteresting insect",
      img: IMG + "interesting-insect.jpg",
      i: true,
      phrase: true
    }
  };

  global.II_LESSON = {
    unit: "Unit 3",
    pages: "Student's Book p.28–29",
    workbookPages: "Workbook Unit 3 Ii p.14",
    letter: "Ii",
    letterCap: "I",
    letterSmall: "i",
    soundIpa: "/ɪ/",
    soundHint: "短元音 /ɪ/，像 interesting insect 里的 i",
    mascot: {
      id: "interesting-insect",
      phrase: "interesting insect",
      zh: "有趣昆虫",
      img: IMG + "interesting-insect.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    hero: IMG + "hero-ii.jpg",
    video: "assets/video/letter-i.mp4",
    iglooColor: IMG + "igloo-color.jpg",
    tracks: {
      chant: AUD + "track43.mp3"
    },
    vocab: [WORDS.insect, WORDS.ink, WORDS.igloo, WORDS.iguana],
    traceColorRows: [
      { id: "ink", splatter: "red" },
      { id: "house", splatter: "green" },
      { id: "igloo", splatter: "orange" },
      { id: "iguana", splatter: "teal" },
      { id: "car", splatter: "blue" },
      { id: "insect", splatter: "yellow" }
    ],
    track05Items: [
      { id: "insect", writeIi: true },
      { id: "ink", writeIi: true },
      { id: "horse", writeIi: false },
      { id: "igloo", writeIi: true }
    ],
    chantOrder: ["igloo", "insect", "iguana", "ink"],
    distractors: [
      WORDS.house, WORDS.car, WORDS.computer, WORDS.horse,
      WORDS.elephant, WORDS.egg, WORDS.dog, WORDS.fan, WORDS.fish, WORDS.goat, WORDS.apple, WORDS.hat
    ],
    words: WORDS,
    workbookCircle: ["computer", "insect", "ink", "iguana", "horse", "igloo"],
    workbookCircleExample: "insect",
    iglooColorLetters: ["I", "i", "E", "e", "H", "h", "A", "a", "F", "f", "d", "h", "g", "c", "i", "I"],
    oddOneOutPrint: [
      ["insect", "ink", "horse"],
      ["igloo", "egg", "iguana"],
      ["insect", "dog", "ink"],
      ["igloo", "bear", "iguana"]
    ],
    soundHunt: [
      "insect", "apple", "ink", "fan",
      "igloo", "horse", "iguana", "house",
      "ink", "cat", "bear", "interesting-insect"
    ],
    copyDefaults: ["insect", "ink", "igloo", "iguana"],
    matchWords: ["ink", "insect", "igloo", "iguana"],
    choosePicture: [
      { word: "insect", pics: ["fan", "insect", "egg"] },
      { word: "ink", pics: ["ink", "dog", "bear"] },
      { word: "igloo", pics: ["igloo", "cat", "horse"] },
      { word: "iguana", pics: ["iguana", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "insect", words: ["ink", "insect", "fan"] },
      { pic: "ink", words: ["ink", "egg", "bear"] },
      { pic: "igloo", words: ["horse", "igloo", "cat"] },
      { pic: "iguana", words: ["iguana", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["insect", "ink", "igloo", "iguana"],
      grid: [
        "BCDFIKJMQI",
        "DFIJKMQUVE",
        "FIJKMQUVWD",
        "INKBCDFHIJ",
        "JKMQUVWYIN",
        "KMQUVWYZCA",
        "MQUVAWYZIG",
        "QUVWNYZLLO",
        "UVWYTBCDIK",
        "IIGLOOINKU"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 i 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 i 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Ii 还是 ✗", short: "Ii / ✗", desc: "听完选 Ii 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
