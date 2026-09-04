/**
 * Level 1 The Alphabet · Unit 7 · Letter Uu
 * Chant 保留教材 MP3（track80 · Disc 2 Track 39）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Uu/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    umbrella: { id: "umbrella", en: "umbrella", zh: "雨伞", onset: "u", rest: "mbrella", img: IMG + "umbrella.jpg", u: true },
    up: { id: "up", en: "up", zh: "向上", onset: "u", rest: "p", img: IMG + "up.jpg", u: true },
    uncle: { id: "uncle", en: "uncle", zh: "叔叔", onset: "u", rest: "ncle", img: IMG + "uncle.jpg", u: true },
    umpire: { id: "umpire", en: "umpire", zh: "裁判", onset: "u", rest: "mpire", img: IMG + "umpire.jpg", u: true },
    under: { id: "under", en: "under", zh: "在……下面", onset: "u", rest: "nder", img: IMG + "under.jpg", u: true },
    tent: { id: "tent", en: "tent", zh: "帐篷", onset: "t", rest: "ent", img: IMG + "tent.jpg", u: false },
    soap: { id: "soap", en: "soap", zh: "肥皂", onset: "s", rest: "oap", img: IMG + "soap.jpg", u: false },
    teacher: { id: "teacher", en: "teacher", zh: "老师", onset: "t", rest: "eacher", img: IMG + "teacher.jpg", u: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", u: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", u: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", u: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", u: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", u: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", u: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", u: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", u: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", u: false },
    "unhappy-umbrella": {
      id: "unhappy-umbrella",
      en: "unhappy umbrella",
      zh: "不开心的雨伞",
      onset: "u",
      rest: "nhappy umbrella",
      img: IMG + "unhappy-umbrella.jpg",
      u: true,
      phrase: true
    }
  };

  global.UU_LESSON = {
    unit: "Unit 7",
    pages: "Student's Book p.68–69",
    workbookPages: "Workbook Unit 7 Uu p.34",
    letter: "Uu",
    letterCap: "U",
    letterSmall: "u",
    soundIpa: "/ʌ/",
    soundHint: "短元音 /ʌ/，像 unhappy umbrella 里的 u",
    mascot: { id: "unhappy-umbrella", phrase: "unhappy umbrella", zh: "不开心的雨伞", img: IMG + "unhappy-umbrella.jpg" },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "umpire",
    chantBubblePrefix: "This is an",
    hero: IMG + "hero-uu.jpg",
    video: "assets/video/letter-u.mp4",
    umbrellaMaze: IMG + "umbrella-maze.jpg",
    tracks: { chant: AUD + "track80.mp3" },
    vocab: [WORDS.umbrella, WORDS.up, WORDS.uncle, WORDS.umpire],
    listenMatch: [
      { id: "uncle", num: 1 },
      { id: "under", num: 2 },
      { id: "umbrella", num: 3 },
      { id: "teacher", num: 4 },
      { id: "umpire", num: 5 },
      { id: "up", num: 6 }
    ],
    connectPath: ["under", "uncle", "umbrella", "up", "umpire"],
    soundRows: [
      { pics: ["umbrella", "tent", "up", "soap"], answer: "umbrella" },
      { pics: ["uncle", "horse", "umpire", "fish"], answer: "uncle" },
      { pics: ["up", "cat", "under", "bear"], answer: "up" },
      { pics: ["umpire", "dog", "umbrella", "egg"], answer: "umpire" }
    ],
    track05Items: [
      { id: "umbrella", writeUu: true },
      { id: "up", writeUu: true },
      { id: "tent", writeUu: false },
      { id: "umpire", writeUu: true }
    ],
    chantOrder: ["umpire", "uncle", "umbrella", "up"],
    distractors: [
      WORDS.tent, WORDS.soap, WORDS.teacher, WORDS.horse,
      WORDS.fish, WORDS.cat, WORDS.bear, WORDS.dog,
      WORDS.egg, WORDS.fan, WORDS.apple, WORDS.lion
    ],
    words: WORDS,
    workbookCircle: ["up", "tent", "umbrella", "soap", "umpire", "uncle"],
    workbookCircleExample: "umbrella",
    workbookLetters: ["U", "u", "A", "b", "U", "a", "d", "u"],
    oddOneOutPrint: [
      ["umbrella", "up", "tent"],
      ["uncle", "egg", "umpire"],
      ["up", "dog", "umbrella"],
      ["umpire", "bear", "uncle"]
    ],
    soundHunt: [
      "umbrella", "apple", "up", "fan",
      "uncle", "horse", "umpire", "lion",
      "up", "cat", "bear", "unhappy-umbrella"
    ],
    copyDefaults: ["umbrella", "up", "uncle", "umpire"],
    matchWords: ["umbrella", "up", "uncle", "umpire"],
    choosePicture: [
      { word: "umbrella", pics: ["fan", "umbrella", "egg"] },
      { word: "up", pics: ["up", "dog", "bear"] },
      { word: "uncle", pics: ["horse", "uncle", "cat"] },
      { word: "umpire", pics: ["umpire", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "umbrella", words: ["up", "umbrella", "fan"] },
      { pic: "up", words: ["up", "egg", "bear"] },
      { pic: "uncle", words: ["horse", "uncle", "cat"] },
      { pic: "umpire", words: ["umpire", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["umbrella", "up", "uncle", "umpire"],
      grid: [
        "BCDFHLJMQS",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "UPBCDFHUUM",
        "HLJMQBVWYU",
        "HLMQBVWYZA",
        "LMQBVWYZUN",
        "MQBVNYZTON",
        "BVWYTBCDHU",
        "UUNCLEUMPI"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 u 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出不是 u 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Uu 还是 ✗", short: "Uu / ✗", desc: "听完选 Uu 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
