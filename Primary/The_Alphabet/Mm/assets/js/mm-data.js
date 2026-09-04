/**
 * Level 1 The Alphabet · Unit 5 · Letter Mm
 * Chant 保留教材 MP3（track59）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：听写 Mm/✗ 再连线；练习册 B：圈 m 音图；练习册 C：钞票涂 M/m。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Mm/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    monkey: { id: "monkey", en: "monkey", zh: "猴子", onset: "m", rest: "onkey", img: IMG + "monkey.jpg", m: true },
    mouse: { id: "mouse", en: "mouse", zh: "老鼠", onset: "m", rest: "ouse", img: IMG + "mouse.jpg", m: true },
    milk: { id: "milk", en: "milk", zh: "牛奶", onset: "m", rest: "ilk", img: IMG + "milk.jpg", m: true },
    money: { id: "money", en: "money", zh: "钱", onset: "m", rest: "oney", img: IMG + "money.jpg", m: true },
    kangaroo: { id: "kangaroo", en: "kangaroo", zh: "袋鼠", onset: "k", rest: "angaroo", img: IMG + "kangaroo.jpg", m: false },
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", img: IMG + "insect.jpg", m: false },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", img: IMG + "lamp.jpg", m: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", m: false },
    jam: { id: "jam", en: "jam", zh: "果酱", onset: "j", rest: "am", img: IMG + "jam.jpg", m: false },
    nose: { id: "nose", en: "nose", zh: "鼻子", onset: "n", rest: "ose", img: IMG + "nose.jpg", m: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", m: false },
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", img: IMG + "jet.jpg", m: false },
    king: { id: "king", en: "king", zh: "国王", onset: "k", rest: "ing", img: IMG + "king.jpg", m: false },
    kite: { id: "kite", en: "kite", zh: "风筝", onset: "k", rest: "ite", img: IMG + "kite.jpg", m: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", m: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", m: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", m: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", m: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", m: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", m: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", m: false },
    "merry-monkey": {
      id: "merry-monkey",
      en: "merry monkey",
      zh: "快乐猴子",
      onset: "m",
      rest: "erry monkey",
      img: IMG + "merry-monkey.jpg",
      m: true,
      phrase: true
    }
  };

  global.MM_LESSON = {
    unit: "Unit 5",
    pages: "Student's Book p.44–45",
    workbookPages: "Workbook Unit 5 Mm p.22",
    letter: "Mm",
    letterCap: "M",
    letterSmall: "m",
    soundIpa: "/m/",
    soundHint: "鼻音 /m/，像 merry monkey 里的 m",
    mascot: {
      id: "merry-monkey",
      phrase: "merry monkey",
      zh: "快乐猴子",
      img: IMG + "merry-monkey.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "mouse",
    hero: IMG + "hero-mm.jpg",
    video: "assets/video/letter-m.mp4",
    monkeyMatch: IMG + "monkey-match.jpg",
    moneyColor: IMG + "money-color.jpg",
    tracks: {
      chant: AUD + "track59.mp3"
    },
    vocab: [WORDS.monkey, WORDS.milk, WORDS.money, WORDS.mouse],
    monkeyListenItems: [
      { num: 1, id: "kangaroo", writeMm: false },
      { num: 2, id: "mouse", writeMm: true },
      { num: 3, id: "milk", writeMm: true },
      { num: 4, id: "insect", writeMm: false },
      { num: 5, id: "monkey", writeMm: true },
      { num: 6, id: "money", writeMm: true }
    ],
    track05Items: [
      { id: "monkey", writeMm: true },
      { id: "mouse", writeMm: true },
      { id: "lamp", writeMm: false },
      { id: "milk", writeMm: true }
    ],
    chantOrder: ["mouse", "money", "milk", "monkey"],
    distractors: [
      WORDS.lamp, WORDS.jam, WORDS.kangaroo, WORDS.insect,
      WORDS.lion, WORDS.hat, WORDS.jet, WORDS.king,
      WORDS.egg, WORDS.fan, WORDS.fish, WORDS.cat
    ],
    words: WORDS,
    workbookCircle: ["monkey", "money", "lamp", "mouse", "jam", "milk"],
    workbookCircleExample: "monkey",
    moneyColorLetters: ["M", "M", "M", "N", "m", "m", "o", "n", "h", "N"],
    oddOneOutPrint: [
      ["monkey", "mouse", "lamp"],
      ["money", "egg", "milk"],
      ["mouse", "dog", "monkey"],
      ["milk", "bear", "money"]
    ],
    soundHunt: [
      "monkey", "apple", "mouse", "fan",
      "milk", "horse", "money", "lion",
      "mouse", "cat", "bear", "merry-monkey"
    ],
    copyDefaults: ["monkey", "mouse", "milk", "money"],
    matchWords: ["mouse", "monkey", "money", "milk"],
    choosePicture: [
      { word: "monkey", pics: ["fan", "monkey", "egg"] },
      { word: "mouse", pics: ["mouse", "dog", "bear"] },
      { word: "milk", pics: ["milk", "cat", "horse"] },
      { word: "money", pics: ["money", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "monkey", words: ["mouse", "monkey", "fan"] },
      { pic: "mouse", words: ["mouse", "egg", "bear"] },
      { pic: "milk", words: ["horse", "milk", "cat"] },
      { pic: "money", words: ["money", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["monkey", "mouse", "milk", "money"],
      grid: [
        "BCDFHLJMQM",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "MOUSEBCDFH",
        "HLJMQBVWYM",
        "HLMQBVWYZA",
        "LMQBVWYZMI",
        "MQBVNYZTON",
        "BVWYTBCDHM",
        "MMILKMONKY"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 m 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 m 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Mm 还是 ✗", short: "Mm / ✗", desc: "听完选 Mm 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
