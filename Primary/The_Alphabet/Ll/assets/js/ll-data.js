/**
 * Level 1 The Alphabet · Unit 4 · Letter Ll
 * Chant 保留教材 MP3（track55）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：楼梯狮子听写 Ll/✗；练习册 B：圈 l 音图；练习册 C：狮子连线点图。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", l: true },
    leaf: { id: "leaf", en: "leaf", zh: "树叶", onset: "l", rest: "eaf", img: IMG + "leaf.jpg", l: true },
    leg: { id: "leg", en: "leg", zh: "腿", onset: "l", rest: "eg", img: IMG + "leg.jpg", l: true },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", img: IMG + "lamp.jpg", l: true },
    king: { id: "king", en: "king", zh: "国王", onset: "k", rest: "ing", img: IMG + "king.jpg", l: false },
    kite: { id: "kite", en: "kite", zh: "风筝", onset: "k", rest: "ite", img: IMG + "kite.jpg", l: false },
    key: { id: "key", en: "key", zh: "钥匙", onset: "k", rest: "ey", img: IMG + "key.jpg", l: false },
    kangaroo: { id: "kangaroo", en: "kangaroo", zh: "袋鼠", onset: "k", rest: "angaroo", img: IMG + "kangaroo.jpg", l: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", l: false },
    jacket: { id: "jacket", en: "jacket", zh: "夹克", onset: "j", rest: "acket", img: IMG + "jacket.jpg", l: false },
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", img: IMG + "jet.jpg", l: false },
    gorilla: { id: "gorilla", en: "gorilla", zh: "大猩猩", onset: "g", rest: "orilla", img: IMG + "gorilla.jpg", l: false },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", img: IMG + "goat.jpg", l: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", l: false },
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", img: IMG + "insect.jpg", l: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", l: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", l: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", l: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", l: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", l: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", l: false },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", img: IMG + "elephant.jpg", l: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", l: false },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", img: IMG + "gift.jpg", l: false },
    "lazy-lion": {
      id: "lazy-lion",
      en: "lazy lion",
      zh: "懒狮子",
      onset: "l",
      rest: "azy lion",
      img: IMG + "lazy-lion.jpg",
      l: true,
      phrase: true
    }
  };

  global.LL_LESSON = {
    unit: "Unit 4",
    pages: "Student's Book p.36–37",
    workbookPages: "Workbook Unit 4 Ll p.18",
    letter: "Ll",
    letterCap: "L",
    letterSmall: "l",
    soundIpa: "/l/",
    soundHint: "舌边音 /l/，像 lazy lion 里的 l",
    mascot: {
      id: "lazy-lion",
      phrase: "lazy lion",
      zh: "懒狮子",
      img: IMG + "lazy-lion.jpg"
    },
    chantCharacter: IMG + "chant-girl.jpg",
    hero: IMG + "hero-ll.jpg",
    video: "assets/video/letter-l.mp4",
    lionStairs: IMG + "lion-stairs.jpg",
    lionDots: IMG + "lion-dots.jpg",
    lionWash: IMG + "lion-wash.jpg",
    tracks: {
      chant: AUD + "track55.mp3"
    },
    vocab: [WORDS.lion, WORDS.leaf, WORDS.leg, WORDS.lamp],
    lionListenItems: [
      { num: 1, id: "lion", writeLl: true },
      { num: 2, id: "lamp", writeLl: true },
      { num: 3, id: "king", writeLl: false },
      { num: 4, id: "leg", writeLl: true },
      { num: 5, id: "kite", writeLl: false }
    ],
    track05Items: [
      { id: "lion", writeLl: true },
      { id: "leaf", writeLl: true },
      { id: "king", writeLl: false },
      { id: "lamp", writeLl: true }
    ],
    chantOrder: ["leaf", "leg", "lamp", "lion"],
    distractors: [
      WORDS.king, WORDS.kite, WORDS.key, WORDS.kangaroo,
      WORDS.hat, WORDS.gorilla, WORDS.goat, WORDS.horse,
      WORDS.insect, WORDS.egg, WORDS.fan, WORDS.fish
    ],
    words: WORDS,
    workbookCircle: ["lamp", "king", "leg", "lion", "kite", "leaf"],
    workbookCircleExample: "lion",
    lionDotNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    oddOneOutPrint: [
      ["lion", "leaf", "king"],
      ["lamp", "egg", "leg"],
      ["leaf", "dog", "lion"],
      ["leg", "bear", "lamp"]
    ],
    soundHunt: [
      "lion", "apple", "leaf", "fan",
      "lamp", "horse", "leg", "goat",
      "leaf", "cat", "bear", "lazy-lion"
    ],
    copyDefaults: ["lion", "leaf", "leg", "lamp"],
    matchWords: ["leaf", "lion", "lamp", "leg"],
    choosePicture: [
      { word: "lion", pics: ["fan", "lion", "egg"] },
      { word: "leaf", pics: ["leaf", "dog", "bear"] },
      { word: "leg", pics: ["leg", "cat", "horse"] },
      { word: "lamp", pics: ["lamp", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "lion", words: ["leaf", "lion", "fan"] },
      { pic: "leaf", words: ["leaf", "egg", "bear"] },
      { pic: "leg", words: ["horse", "leg", "cat"] },
      { pic: "lamp", words: ["lamp", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["lion", "leaf", "leg", "lamp"],
      grid: [
        "BCDFHLJMQB",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "LEAFBCDFHL",
        "HLJMQBVWLN",
        "HLMQBVWYZA",
        "LMQBVWYZLI",
        "MQBVNYZTON",
        "BVWYTBCDHL",
        "LLAMPLIONL"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 l 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 l 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Ll 还是 ✗", short: "Ll / ✗", desc: "听完选 Ll 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
