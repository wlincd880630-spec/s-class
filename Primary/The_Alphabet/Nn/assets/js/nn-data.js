/**
 * Level 1 The Alphabet · Unit 5 · Letter Nn
 * Chant 保留教材 MP3（track63）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：Match and write；练习册 B：n 音配对书写；练习册 C：鸟巢迷宫连线。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    nut: { id: "nut", en: "nut", zh: "坚果", onset: "n", rest: "ut", img: IMG + "nut.jpg", n: true },
    net: { id: "net", en: "net", zh: "网", onset: "n", rest: "et", img: IMG + "net.jpg", n: true },
    nest: { id: "nest", en: "nest", zh: "鸟巢", onset: "n", rest: "est", img: IMG + "nest.jpg", n: true },
    nose: { id: "nose", en: "nose", zh: "鼻子", onset: "n", rest: "ose", img: IMG + "nose.jpg", n: true },
    milk: { id: "milk", en: "milk", zh: "牛奶", onset: "m", rest: "ilk", img: IMG + "milk.jpg", n: false },
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", img: IMG + "insect.jpg", n: false },
    mouse: { id: "mouse", en: "mouse", zh: "老鼠", onset: "m", rest: "ouse", img: IMG + "mouse.jpg", n: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", n: false },
    monkey: { id: "monkey", en: "monkey", zh: "猴子", onset: "m", rest: "onkey", img: IMG + "monkey.jpg", n: false },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", img: IMG + "lamp.jpg", n: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", n: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", n: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", n: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", n: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", n: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", n: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", n: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", n: false },
    bird: { id: "bird", en: "bird", zh: "小鸟", onset: "b", rest: "ird", img: IMG + "bird.jpg", n: false },
    "noisy-nut": {
      id: "noisy-nut",
      en: "noisy nut",
      zh: "吵闹坚果",
      onset: "n",
      rest: "oisy nut",
      img: IMG + "noisy-nut.jpg",
      n: true,
      phrase: true
    }
  };

  global.NN_LESSON = {
    unit: "Unit 5",
    pages: "Student's Book p.46–47",
    workbookPages: "Workbook Unit 5 Nn p.23",
    letter: "Nn",
    letterCap: "N",
    letterSmall: "n",
    soundIpa: "/n/",
    soundHint: "鼻音 /n/，像 noisy nut 里的 n",
    mascot: {
      id: "noisy-nut",
      phrase: "noisy nut",
      zh: "吵闹坚果",
      img: IMG + "noisy-nut.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "nest",
    chantBubblePrefix: "That is a",
    hero: IMG + "hero-nn.jpg",
    video: "assets/video/letter-n.mp4",
    matchWrite: IMG + "match-write.jpg",
    nestMaze: IMG + "nest-maze.jpg",
    tracks: {
      chant: AUD + "track63.mp3"
    },
    vocab: [WORDS.nut, WORDS.net, WORDS.nest, WORDS.nose],
    matchWriteTop: ["net", "nut", "nest", "nose"],
    matchWriteBoxes: [
      { num: 1, id: "nose" },
      { num: 2, id: "nest" },
      { num: 3, id: "nut" },
      { num: 4, id: "net" }
    ],
    track05Items: [
      { id: "nut", writeNn: true },
      { id: "nest", writeNn: true },
      { id: "milk", writeNn: false },
      { id: "net", writeNn: true }
    ],
    chantOrder: ["nest", "nose", "nut", "net"],
    distractors: [
      WORDS.milk, WORDS.insect, WORDS.mouse, WORDS.fish,
      WORDS.monkey, WORDS.lamp, WORDS.lion, WORDS.hat,
      WORDS.egg, WORDS.fan, WORDS.cat, WORDS.bear
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["nut", "milk"], answer: "nut" },
      { pics: ["insect", "nest"], answer: "nest" },
      { pics: ["mouse", "nose"], answer: "nose" },
      { pics: ["net", "fish"], answer: "net" }
    ],
    workbookCircle: ["nut", "milk", "nest", "insect", "nose", "mouse"],
    workbookCircleExample: "nut",
    oddOneOutPrint: [
      ["nut", "nest", "milk"],
      ["net", "egg", "nose"],
      ["nest", "dog", "nut"],
      ["nose", "bear", "net"]
    ],
    soundHunt: [
      "nut", "apple", "nest", "fan",
      "net", "horse", "nose", "lion",
      "nest", "cat", "bear", "noisy-nut"
    ],
    copyDefaults: ["nut", "net", "nest", "nose"],
    matchWords: ["net", "nut", "nest", "nose"],
    choosePicture: [
      { word: "nut", pics: ["fan", "nut", "egg"] },
      { word: "net", pics: ["net", "dog", "bear"] },
      { word: "nest", pics: ["nest", "cat", "horse"] },
      { word: "nose", pics: ["nose", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "nut", words: ["net", "nut", "fan"] },
      { pic: "net", words: ["net", "egg", "bear"] },
      { pic: "nest", words: ["horse", "nest", "cat"] },
      { pic: "nose", words: ["nose", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["nut", "net", "nest", "nose"],
      grid: [
        "BCDFHLJMQN",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "NESTBCDFHN",
        "HLJMQBVWYN",
        "HLMQBVWYZA",
        "LMQBVWYZNI",
        "MQBVNYZTON",
        "BVWYTBCDHN",
        "NNUTNETNOS"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 n 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 n 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Nn 还是 ✗", short: "Nn / ✗", desc: "听完选 Nn 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
