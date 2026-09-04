/**
 * Level 1 The Alphabet · Unit 8 · Letter Xx
 * Chant 保留教材 MP3（track93 · Disc 2 Track 52）；其余 Azure TTS。
 * 教材 D：词尾 x 音配对描影写 Xx；练习册 B：圈词尾 x 音图；练习册 C：迷宫连线写 Xx。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Xx/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    fox: { id: "fox", en: "fox", zh: "狐狸", body: "fo", coda: "x", img: IMG + "fox.jpg", x: true },
    box: { id: "box", en: "box", zh: "盒子", body: "bo", coda: "x", img: IMG + "box.jpg", x: true },
    six: { id: "six", en: "six", zh: "六", body: "si", coda: "x", img: IMG + "six.jpg", x: true },
    wax: { id: "wax", en: "wax", zh: "蜡", body: "wa", coda: "x", img: IMG + "wax.jpg", x: true },
    watch: { id: "watch", en: "watch", zh: "手表", body: "watch", coda: "", img: IMG + "watch.jpg", x: false },
    kite: { id: "kite", en: "kite", zh: "风筝", body: "kite", coda: "", img: IMG + "kite.jpg", x: false },
    web: { id: "web", en: "web", zh: "蜘蛛网", body: "web", coda: "", img: IMG + "web.jpg", x: false },
    wolf: { id: "wolf", en: "wolf", zh: "狼", body: "wolf", coda: "", img: IMG + "wolf.jpg", x: false },
    tent: { id: "tent", en: "tent", zh: "帐篷", body: "tent", coda: "", img: IMG + "tent.jpg", x: false },
    van: { id: "van", en: "van", zh: "面包车", body: "van", coda: "", img: IMG + "van.jpg", x: false },
    apple: { id: "apple", en: "apple", zh: "苹果", body: "apple", coda: "", img: IMG + "apple.jpg", x: false },
    cat: { id: "cat", en: "cat", zh: "猫", body: "cat", coda: "", img: IMG + "cat.jpg", x: false },
    dog: { id: "dog", en: "dog", zh: "狗", body: "dog", coda: "", img: IMG + "dog.jpg", x: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", body: "egg", coda: "", img: IMG + "egg.jpg", x: false },
    bear: { id: "bear", en: "bear", zh: "熊", body: "bear", coda: "", img: IMG + "bear.jpg", x: false },
    envelope: { id: "envelope", en: "envelope", zh: "信封", body: "envelope", coda: "", img: IMG + "envelope.jpg", x: false },
    "fox-in-box": {
      id: "fox-in-box",
      en: "fox in a box",
      zh: "盒子里的小狐狸",
      body: "fox in a bo",
      coda: "x",
      img: IMG + "fox-in-box.jpg",
      x: true,
      phrase: true
    }
  };

  global.XX_LESSON = {
    unit: "Unit 8",
    pages: "Student's Book p.76–77",
    workbookPages: "Workbook Unit 8 Xx p.38",
    letter: "Xx",
    letterCap: "X",
    letterSmall: "x",
    soundIpa: "/ks/",
    soundHint: "词尾音 /ks/，像 fox、box 末尾的 x",
    soundPosition: "ending",
    mascot: {
      id: "fox-in-box",
      phrase: "fox in a box",
      zh: "盒子里的小狐狸",
      img: IMG + "fox-in-box.jpg"
    },
    chantCharacter: IMG + "raincoat-girl.jpg",
    chantBubbleWord: "box",
    chantBubblePrefix: "Do you see the",
    hero: IMG + "hero-xx.jpg",
    video: "assets/video/letter-x.mp4",
    tracks: {
      chant: AUD + "track93.mp3"
    },
    vocab: [WORDS.fox, WORDS.box, WORDS.six, WORDS.wax],
    matchSilhouette: [
      { id: "fox", silhouette: "fox" },
      { id: "six", silhouette: "six" },
      { id: "box", silhouette: "box" },
      { id: "wax", silhouette: "wax" }
    ],
    track05Items: [
      { id: "watch", writeXx: false },
      { id: "fox", writeXx: true },
      { id: "box", writeXx: true },
      { id: "wax", writeXx: true }
    ],
    chantOrder: ["box", "wax", "fox", "six"],
    connectPath: ["fox", "envelope", "six", "box"],
    workbookCircle: ["fox", "box", "watch", "wax", "kite", "six"],
    workbookCircleAnswers: ["fox", "box", "wax", "six"],
    distractors: [
      WORDS.watch, WORDS.kite, WORDS.web, WORDS.wolf,
      WORDS.tent, WORDS.van, WORDS.apple, WORDS.cat
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["fox", "watch"], answer: "fox" },
      { pics: ["box", "kite"], answer: "box" },
      { pics: ["six", "web"], answer: "six" },
      { pics: ["wax", "wolf"], answer: "wax" }
    ],
    oddOneOutPrint: [
      ["fox", "box", "watch"],
      ["six", "kite", "wax"],
      ["box", "web", "fox"],
      ["wax", "wolf", "six"]
    ],
    soundHunt: [
      "fox", "web", "box", "watch",
      "six", "wolf", "wax", "kite",
      "box", "cat", "fox", "fox-in-box"
    ],
    copyDefaults: ["fox", "box", "six", "wax"],
    matchWords: ["fox", "box", "six", "wax"],
    choosePicture: [
      { word: "fox", pics: ["kite", "fox", "egg"] },
      { word: "box", pics: ["box", "dog", "bear"] },
      { word: "six", pics: ["wolf", "six", "cat"] },
      { word: "wax", pics: ["wax", "web", "apple"] }
    ],
    chooseWord: [
      { pic: "fox", words: ["box", "fox", "web"] },
      { pic: "box", words: ["box", "egg", "bear"] },
      { pic: "six", words: ["wolf", "six", "cat"] },
      { pic: "wax", words: ["wax", "kite", "apple"] }
    ],
    wordMaze: {
      size: 10,
      words: ["fox", "box", "six", "wax"],
      grid: [
        "BCDFHLJMQX",
        "DFHLJMQBXO",
        "FHLJMQBOXF",
        "FOXBCDFHXW",
        "HLJMQBOXER",
        "HLMQBOXSAW",
        "LMQBOXSIXA",
        "MQBOXNYXOF",
        "BOXTBCDHXW",
        "XSIXWAXXXX"
      ]
    },
    games: [
      { id: 1, title: "词尾音小侦探", short: "词尾音", desc: "点听单词，再选出词尾有 x 音" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "找出词尾没有 x 音的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Xx 还是 ✗", short: "Xx / ✗", desc: "听完选 Xx 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填尾字母", short: "填字母", desc: "看图听音，填词尾字母" }
    ]
  };
})(window);
