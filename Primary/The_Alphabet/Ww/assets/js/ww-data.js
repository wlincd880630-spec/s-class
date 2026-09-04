/**
 * Level 1 The Alphabet · Unit 8 · Letter Ww
 * Chant 保留教材 MP3（track90 · Disc 2 Track 49）；其余 Azure TTS。
 * 教材 D：6 个手表听音写 Ww 或打叉；练习册 B：w 音配对书写；练习册 C：写 Ww 或打叉。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ww/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    wolf: { id: "wolf", en: "wolf", zh: "狼", onset: "w", rest: "olf", img: IMG + "wolf.jpg", w: true },
    web: { id: "web", en: "web", zh: "蜘蛛网", onset: "w", rest: "eb", img: IMG + "web.jpg", w: true },
    water: { id: "water", en: "water", zh: "水", onset: "w", rest: "ater", img: IMG + "water.jpg", w: true },
    watch: { id: "watch", en: "watch", zh: "手表", onset: "w", rest: "atch", img: IMG + "watch.jpg", w: true },
    tent: { id: "tent", en: "tent", zh: "帐篷", onset: "t", rest: "ent", img: IMG + "tent.jpg", w: false },
    van: { id: "van", en: "van", zh: "面包车", onset: "v", rest: "an", img: IMG + "van.jpg", w: false },
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", img: IMG + "jet.jpg", w: false },
    lemon: { id: "lemon", en: "lemon", zh: "柠檬", onset: "l", rest: "emon", img: IMG + "lemon.jpg", w: false },
    up: { id: "up", en: "up", zh: "向上", onset: "u", rest: "p", img: IMG + "up.jpg", w: false },
    pen: { id: "pen", en: "pen", zh: "钢笔", onset: "p", rest: "en", img: IMG + "pen.jpg", w: false },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", img: IMG + "bed.jpg", w: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", w: false },
    sun: { id: "sun", en: "sun", zh: "太阳", onset: "s", rest: "un", img: IMG + "sun.jpg", w: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", w: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", w: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", w: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", w: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", w: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", w: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", w: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", w: false },
    "wise-wolf": {
      id: "wise-wolf",
      en: "wise wolf",
      zh: "聪明的狼",
      onset: "w",
      rest: "ise wolf",
      img: IMG + "wise-wolf.jpg",
      w: true,
      phrase: true
    }
  };

  global.WW_LESSON = {
    unit: "Unit 8",
    pages: "Student's Book p.74–75",
    workbookPages: "Workbook Unit 8 Ww p.37",
    letter: "Ww",
    letterCap: "W",
    letterSmall: "w",
    soundIpa: "/w/",
    soundHint: "半元音 /w/，像 wise wolf 里的 w",
    mascot: {
      id: "wise-wolf",
      phrase: "wise wolf",
      zh: "聪明的狼",
      img: IMG + "wise-wolf.jpg"
    },
    chantCharacter: IMG + "raincoat-girl.jpg",
    chantBubbleWord: "web",
    chantBubblePrefix: "Do you see a",
    hero: IMG + "hero-ww.jpg",
    video: "assets/video/letter-w.mp4",
    tracks: {
      chant: AUD + "track90.mp3"
    },
    vocab: [WORDS.wolf, WORDS.web, WORDS.water, WORDS.watch],
    watchWriteItems: [
      { id: "wolf", writeWw: true },
      { id: "web", writeWw: true },
      { id: "tent", writeWw: false },
      { id: "water", writeWw: true },
      { id: "watch", writeWw: true },
      { id: "van", writeWw: false }
    ],
    track05Items: [
      { id: "jet", writeWw: false },
      { id: "wolf", writeWw: true },
      { id: "web", writeWw: true },
      { id: "watch", writeWw: true }
    ],
    chantOrder: ["web", "watch", "water", "wolf"],
    distractors: [
      WORDS.tent, WORDS.van, WORDS.jet, WORDS.lemon,
      WORDS.up, WORDS.pen, WORDS.bed, WORDS.apple,
      WORDS.sun, WORDS.horse, WORDS.fish, WORDS.cat
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["wolf", "up"], answer: "wolf" },
      { pics: ["web", "lemon"], answer: "web" },
      { pics: ["pen", "watch"], answer: "watch" },
      { pics: ["bed", "water"], answer: "water" }
    ],
    oddOneOutPrint: [
      ["wolf", "web", "tent"],
      ["watch", "egg", "water"],
      ["web", "dog", "wolf"],
      ["water", "bear", "watch"]
    ],
    soundHunt: [
      "wolf", "apple", "web", "fan",
      "water", "horse", "watch", "lion",
      "web", "cat", "bear", "wise-wolf"
    ],
    copyDefaults: ["wolf", "web", "water", "watch"],
    matchWords: ["wolf", "web", "water", "watch"],
    choosePicture: [
      { word: "wolf", pics: ["fan", "wolf", "egg"] },
      { word: "web", pics: ["web", "dog", "bear"] },
      { word: "water", pics: ["horse", "water", "cat"] },
      { word: "watch", pics: ["watch", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "wolf", words: ["web", "wolf", "fan"] },
      { pic: "web", words: ["web", "egg", "bear"] },
      { pic: "water", words: ["horse", "water", "cat"] },
      { pic: "watch", words: ["watch", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["wolf", "web", "water", "watch"],
      grid: [
        "BCDFHLJMQW",
        "DFHLJMQBWE",
        "FHLJMQBWED",
        "WEBBCDFHWT",
        "HLJMQBWYER",
        "HLMQBWYZAW",
        "LMQBWYZWOL",
        "MQBWNYZTOF",
        "BWYTBCDHWA",
        "WWEBWATCHW"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 w 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出不是 w 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Ww 还是 ✗", short: "Ww / ✗", desc: "听完选 Ww 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
