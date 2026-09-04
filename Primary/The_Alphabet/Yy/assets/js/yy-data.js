/**
 * Level 1 The Alphabet · Unit 8 · Letter Yy
 * Chant 保留教材 MP3（track97 · Disc 2 Track 56）；其余 Azure TTS。
 * 教材 D：听写后配对（6 项）；练习册 B：y 音配对书写；练习册 C：写 Yy 或打叉。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    yoyo: { id: "yoyo", en: "yo-yo", zh: "溜溜球", onset: "y", rest: "o-yo", img: IMG + "yoyo.jpg", y: true },
    yak: { id: "yak", en: "yak", zh: "牦牛", onset: "y", rest: "ak", img: IMG + "yak.jpg", y: true },
    yogurt: { id: "yogurt", en: "yogurt", zh: "酸奶", onset: "y", rest: "ogurt", img: IMG + "yogurt.jpg", y: true },
    yacht: { id: "yacht", en: "yacht", zh: "游艇", onset: "y", rest: "acht", img: IMG + "yacht.jpg", y: true },
    wet: { id: "wet", en: "wet", zh: "湿的", onset: "w", rest: "et", img: IMG + "wet.jpg", y: false },
    kite: { id: "kite", en: "kite", zh: "风筝", onset: "k", rest: "ite", img: IMG + "kite.jpg", y: false },
    box: { id: "box", en: "box", zh: "盒子", onset: "b", rest: "ox", img: IMG + "box.jpg", y: false },
    jacket: { id: "jacket", en: "jacket", zh: "夹克", onset: "j", rest: "acket", img: IMG + "jacket.jpg", y: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", y: false },
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", img: IMG + "jet.jpg", y: false },
    wolf: { id: "wolf", en: "wolf", zh: "狼", onset: "w", rest: "olf", img: IMG + "wolf.jpg", y: false },
    web: { id: "web", en: "web", zh: "蜘蛛网", onset: "w", rest: "eb", img: IMG + "web.jpg", y: false },
    fox: { id: "fox", en: "fox", zh: "狐狸", onset: "f", rest: "ox", img: IMG + "fox.jpg", y: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", y: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", y: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", y: false },
    "yellow-yoyo": {
      id: "yellow-yoyo",
      en: "yellow yo-yo",
      zh: "黄色溜溜球",
      onset: "y",
      rest: "ellow yo-yo",
      img: IMG + "yellow-yoyo.jpg",
      y: true,
      phrase: true
    }
  };

  global.YY_LESSON = {
    unit: "Unit 8",
    pages: "Student's Book p.78–79",
    workbookPages: "Workbook Unit 8 Yy p.39",
    letter: "Yy",
    letterCap: "Y",
    letterSmall: "y",
    soundIpa: "/j/",
    soundHint: "半元音 /j/，像 yellow yo-yo 里的 y",
    mascot: {
      id: "yellow-yoyo",
      phrase: "yellow yo-yo",
      zh: "黄色溜溜球",
      img: IMG + "yellow-yoyo.jpg"
    },
    chantCharacter: IMG + "raincoat-girl.jpg",
    chantBubbleWord: "yoyo",
    chantBubblePrefix: "I don't have a",
    hero: IMG + "hero-yy.jpg",
    video: "assets/video/letter-y.mp4",
    tracks: {
      chant: AUD + "track97.mp3"
    },
    vocab: [WORDS.yoyo, WORDS.yak, WORDS.yogurt, WORDS.yacht],
    listenWriteMatch: [
      { id: "yak", writeYy: true },
      { id: "wet", writeYy: false },
      { id: "yoyo", writeYy: true },
      { id: "kite", writeYy: false },
      { id: "yacht", writeYy: true },
      { id: "yogurt", writeYy: true }
    ],
    track05Items: [
      { id: "yacht", writeYy: true },
      { id: "yak", writeYy: true },
      { id: "yogurt", writeYy: true },
      { id: "wolf", writeYy: false }
    ],
    chantOrder: ["yoyo", "yak", "yogurt", "yacht"],
    distractors: [
      WORDS.wet, WORDS.kite, WORDS.box, WORDS.jacket,
      WORDS.hat, WORDS.jet, WORDS.wolf, WORDS.web
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["box", "yogurt"], answer: "yogurt" },
      { pics: ["yak", "jacket"], answer: "yak" },
      { pics: ["hat", "yoyo"], answer: "yoyo" },
      { pics: ["yacht", "jet"], answer: "yacht" }
    ],
    oddOneOutPrint: [
      ["yoyo", "yak", "kite"],
      ["yogurt", "wet", "yacht"],
      ["yak", "wolf", "yoyo"],
      ["yacht", "box", "yogurt"]
    ],
    soundHunt: [
      "yoyo", "apple", "yak", "kite",
      "yogurt", "wet", "yacht", "wolf",
      "yak", "cat", "bear", "yellow-yoyo"
    ],
    copyDefaults: ["yoyo", "yak", "yogurt", "yacht"],
    matchWords: ["yoyo", "yak", "yogurt", "yacht"],
    choosePicture: [
      { word: "yoyo", pics: ["kite", "yoyo", "egg"] },
      { word: "yak", pics: ["yak", "wolf", "bear"] },
      { word: "yogurt", pics: ["wet", "yogurt", "cat"] },
      { word: "yacht", pics: ["yacht", "jet", "box"] }
    ],
    chooseWord: [
      { pic: "yoyo", words: ["yak", "yoyo", "kite"] },
      { pic: "yak", words: ["yak", "wolf", "bear"] },
      { pic: "yogurt", words: ["wet", "yogurt", "fox"] },
      { pic: "yacht", words: ["yacht", "jet", "box"] }
    ],
    wordMaze: {
      size: 10,
      words: ["yoyo", "yak", "yogurt", "yacht"],
      grid: [
        "BCDFHLJMQY",
        "DFHLJMQBYO",
        "FHLJMQBYOG",
        "YAKBCDFHYT",
        "HLJMQBYOER",
        "HLMQBYOGAW",
        "LMQBYOGURO",
        "MQBYNYTCHT",
        "BYOTBCDHYW",
        "YYOYOYOGUR"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 y 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出不是 y 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Yy 还是 ✗", short: "Yy / ✗", desc: "听完选 Yy 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
