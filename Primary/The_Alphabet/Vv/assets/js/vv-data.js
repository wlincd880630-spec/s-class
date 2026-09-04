/**
 * Level 1 The Alphabet · Unit 7 · Letter Vv
 * Chant 保留教材 MP3（track83 · Disc 2 Track 42）；其余 Azure TTS。
 * 教材 D：听音圈 v 开头图；练习册 B：v 音配对书写；练习册 C：写 Vv 或打叉。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Vv/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    van: { id: "van", en: "van", zh: "面包车", onset: "v", rest: "an", img: IMG + "van.jpg", v: true },
    vet: { id: "vet", en: "vet", zh: "兽医", onset: "v", rest: "et", img: IMG + "vet.jpg", v: true },
    violin: { id: "violin", en: "violin", zh: "小提琴", onset: "v", rest: "iolin", img: IMG + "violin.jpg", v: true },
    vest: { id: "vest", en: "vest", zh: "背心", onset: "v", rest: "est", img: IMG + "vest.jpg", v: true },
    money: { id: "money", en: "money", zh: "钱", onset: "m", rest: "oney", img: IMG + "money.jpg", v: false },
    sun: { id: "sun", en: "sun", zh: "太阳", onset: "s", rest: "un", img: IMG + "sun.jpg", v: false },
    hotdog: { id: "hotdog", en: "hotdog", zh: "热狗", onset: "h", rest: "otdog", img: IMG + "hotdog.jpg", v: false },
    tent: { id: "tent", en: "tent", zh: "帐篷", onset: "t", rest: "ent", img: IMG + "tent.jpg", v: false },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", img: IMG + "bed.jpg", v: false },
    lemon: { id: "lemon", en: "lemon", zh: "柠檬", onset: "l", rest: "emon", img: IMG + "lemon.jpg", v: false },
    envelope: { id: "envelope", en: "envelope", zh: "信封", onset: "e", rest: "nvelope", img: IMG + "envelope.jpg", v: false },
    umpire: { id: "umpire", en: "umpire", zh: "裁判", onset: "u", rest: "mpire", img: IMG + "umpire.jpg", v: false },
    leaf: { id: "leaf", en: "leaf", zh: "树叶", onset: "l", rest: "eaf", img: IMG + "leaf.jpg", v: false },
    girl: { id: "girl", en: "girl", zh: "女孩", onset: "g", rest: "irl", img: IMG + "girl.jpg", v: false },
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", img: IMG + "jet.jpg", v: false },
    seal: { id: "seal", en: "seal", zh: "海豹", onset: "s", rest: "eal", img: IMG + "seal.jpg", v: false },
    up: { id: "up", en: "up", zh: "向上", onset: "u", rest: "p", img: IMG + "up.jpg", v: false },
    pen: { id: "pen", en: "pen", zh: "钢笔", onset: "p", rest: "en", img: IMG + "pen.jpg", v: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", v: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", v: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", v: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", v: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", v: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", v: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", v: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", v: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", v: false },
    "violet-van": {
      id: "violet-van",
      en: "violet van",
      zh: "紫色小货车",
      onset: "v",
      rest: "iolet van",
      img: IMG + "violet-van.jpg",
      v: true,
      phrase: true
    }
  };

  global.VV_LESSON = {
    unit: "Unit 7",
    pages: "Student's Book p.70–71",
    workbookPages: "Workbook Unit 7 Vv p.35",
    letter: "Vv",
    letterCap: "V",
    letterSmall: "v",
    soundIpa: "/v/",
    soundHint: "浊辅音 /v/，像 violet van 里的 v",
    mascot: {
      id: "violet-van",
      phrase: "violet van",
      zh: "紫色小货车",
      img: IMG + "violet-van.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "van",
    chantBubblePrefix: "Is this your",
    hero: IMG + "hero-vv.jpg",
    video: "assets/video/letter-v.mp4",
    tracks: {
      chant: AUD + "track83.mp3"
    },
    vocab: [WORDS.van, WORDS.vet, WORDS.violin, WORDS.vest],
    soundRows: [
      { pics: ["money", "sun", "hotdog", "vest"], answer: "vest" },
      { pics: ["tent", "violin", "bed", "lemon"], answer: "violin" },
      { pics: ["van", "envelope", "umpire", "leaf"], answer: "van" },
      { pics: ["girl", "vet", "jet", "seal"], answer: "vet" }
    ],
    track05Items: [
      { id: "jet", writeVv: false },
      { id: "van", writeVv: true },
      { id: "violin", writeVv: true },
      { id: "vest", writeVv: true }
    ],
    chantOrder: ["van", "vest", "vet", "violin"],
    distractors: [
      WORDS.money, WORDS.sun, WORDS.hotdog, WORDS.tent,
      WORDS.bed, WORDS.lemon, WORDS.envelope, WORDS.umpire,
      WORDS.leaf, WORDS.girl, WORDS.jet, WORDS.seal
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["vet", "up"], answer: "vet" },
      { pics: ["vest", "lemon"], answer: "vest" },
      { pics: ["pen", "van"], answer: "van" },
      { pics: ["bed", "violin"], answer: "violin" }
    ],
    oddOneOutPrint: [
      ["van", "vet", "tent"],
      ["vest", "egg", "violin"],
      ["vet", "dog", "van"],
      ["violin", "bear", "vest"]
    ],
    soundHunt: [
      "van", "apple", "vet", "fan",
      "violin", "horse", "vest", "lion",
      "vet", "cat", "bear", "violet-van"
    ],
    copyDefaults: ["van", "vet", "violin", "vest"],
    matchWords: ["van", "vet", "violin", "vest"],
    choosePicture: [
      { word: "van", pics: ["fan", "van", "egg"] },
      { word: "vet", pics: ["vet", "dog", "bear"] },
      { word: "violin", pics: ["horse", "violin", "cat"] },
      { word: "vest", pics: ["vest", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "van", words: ["vet", "van", "fan"] },
      { pic: "vet", words: ["vet", "egg", "bear"] },
      { pic: "violin", words: ["horse", "violin", "cat"] },
      { pic: "vest", words: ["vest", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["van", "vet", "violin", "vest"],
      grid: [
        "BCDFHLJMQV",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "VANBCDFHVT",
        "HLJMQBVWYE",
        "HLMQBVWYZA",
        "LMQBVWYZVI",
        "MQBVNYZTON",
        "BVWYTBCDHV",
        "VVETVESTVV"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 v 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出不是 v 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Vv 还是 ✗", short: "Vv / ✗", desc: "听完选 Vv 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
