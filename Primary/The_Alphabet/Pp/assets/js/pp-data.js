/**
 * Level 1 The Alphabet · Unit 6 · Letter Pp
 * Chant 保留教材 MP3（track65）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：听音圈 p 开头图；练习册 B：p 音配对书写；练习册 C：写 Pp 或打叉。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    peach: { id: "peach", en: "peach", zh: "桃子", onset: "p", rest: "each", img: IMG + "peach.jpg", p: true },
    pen: { id: "pen", en: "pen", zh: "钢笔", onset: "p", rest: "en", img: IMG + "pen.jpg", p: true },
    panda: { id: "panda", en: "panda", zh: "熊猫", onset: "p", rest: "anda", img: IMG + "panda.jpg", p: true },
    pineapple: { id: "pineapple", en: "pineapple", zh: "菠萝", onset: "p", rest: "ineapple", img: IMG + "pineapple.jpg", p: true },
    walnut: { id: "walnut", en: "walnut", zh: "核桃", onset: "w", rest: "alnut", img: IMG + "walnut.jpg", p: false },
    milk: { id: "milk", en: "milk", zh: "牛奶", onset: "m", rest: "ilk", img: IMG + "milk.jpg", p: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", p: false },
    king: { id: "king", en: "king", zh: "国王", onset: "k", rest: "ing", img: IMG + "king.jpg", p: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", p: false },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", img: IMG + "gift.jpg", p: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", p: false },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", img: IMG + "lamp.jpg", p: false },
    octopus: { id: "octopus", en: "octopus", zh: "章鱼", onset: "o", rest: "ctopus", img: IMG + "octopus.jpg", p: false },
    computer: { id: "computer", en: "computer", zh: "电脑", onset: "c", rest: "omputer", img: IMG + "computer.jpg", p: false },
    jacket: { id: "jacket", en: "jacket", zh: "夹克", onset: "j", rest: "acket", img: IMG + "jacket.jpg", p: false },
    ink: { id: "ink", en: "ink", zh: "墨水", onset: "i", rest: "nk", img: IMG + "ink.jpg", p: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", p: false },
    olive: { id: "olive", en: "olive", zh: "橄榄", onset: "o", rest: "live", img: IMG + "olive.jpg", p: false },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", img: IMG + "banana.jpg", p: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", p: false },
    bird: { id: "bird", en: "bird", zh: "小鸟", onset: "b", rest: "ird", img: IMG + "bird.jpg", p: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", p: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", p: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", p: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", p: false },
    "pink-peach": {
      id: "pink-peach",
      en: "pink peach",
      zh: "粉红桃子",
      onset: "p",
      rest: "ink peach",
      img: IMG + "pink-peach.jpg",
      p: true,
      phrase: true
    }
  };

  global.PP_LESSON = {
    unit: "Unit 6",
    pages: "Student's Book p.52–53",
    workbookPages: "Workbook Unit 6 Pp p.26",
    letter: "Pp",
    letterCap: "P",
    letterSmall: "p",
    soundIpa: "/p/",
    soundHint: "爆破音 /p/，像 pink peach 里的 p",
    mascot: {
      id: "pink-peach",
      phrase: "pink peach",
      zh: "粉红桃子",
      img: IMG + "pink-peach.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "panda",
    chantBubblePrefix: "Is that your",
    hero: IMG + "hero-pp.jpg",
    video: "assets/video/letter-p.mp4",
    tracks: {
      chant: AUD + "track65.mp3"
    },
    vocab: [WORDS.peach, WORDS.pen, WORDS.panda, WORDS.pineapple],
    pSoundRows: [
      { pics: ["walnut", "pen", "milk", "horse"], answer: "pen" },
      { pics: ["panda", "king", "fish", "gift"], answer: "panda" },
      { pics: ["dog", "lamp", "octopus", "peach"], answer: "peach" },
      { pics: ["computer", "pineapple", "jacket", "ink"], answer: "pineapple" }
    ],
    track05Items: [
      { id: "panda", writePp: true },
      { id: "pineapple", writePp: true },
      { id: "bird", writePp: false },
      { id: "pen", writePp: true }
    ],
    chantOrder: ["panda", "pineapple", "peach", "pen"],
    distractors: [
      WORDS.walnut, WORDS.milk, WORDS.horse, WORDS.king,
      WORDS.fish, WORDS.gift, WORDS.dog, WORDS.lamp,
      WORDS.octopus, WORDS.computer, WORDS.jacket, WORDS.ink
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["pineapple", "apple"], answer: "pineapple" },
      { pics: ["pen", "olive"], answer: "pen" },
      { pics: ["banana", "peach"], answer: "peach" },
      { pics: ["bear", "panda"], answer: "panda" }
    ],
    workbookCircle: ["panda", "pineapple", "bird", "pen"],
    workbookCircleExample: "panda",
    oddOneOutPrint: [
      ["peach", "pen", "lamp"],
      ["panda", "egg", "pineapple"],
      ["pen", "dog", "peach"],
      ["pineapple", "bear", "panda"]
    ],
    soundHunt: [
      "peach", "apple", "pen", "fan",
      "panda", "horse", "pineapple", "lion",
      "pen", "cat", "bear", "pink-peach"
    ],
    copyDefaults: ["peach", "pen", "panda", "pineapple"],
    matchWords: ["pen", "panda", "peach", "pineapple"],
    choosePicture: [
      { word: "peach", pics: ["fan", "peach", "egg"] },
      { word: "pen", pics: ["pen", "dog", "bear"] },
      { word: "panda", pics: ["panda", "cat", "horse"] },
      { word: "pineapple", pics: ["pineapple", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "peach", words: ["pen", "peach", "fan"] },
      { pic: "pen", words: ["pen", "egg", "bear"] },
      { pic: "panda", words: ["horse", "panda", "cat"] },
      { pic: "pineapple", words: ["pineapple", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["peach", "pen", "panda", "pineapple"],
      grid: [
        "BCDFHLJMQP",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "PANDABCDFH",
        "HLJMQBVWYP",
        "HLMQBVWYZA",
        "LMQBVWYZPI",
        "MQBVNYZTON",
        "BVWYTBCDHP",
        "PPENPEACHP"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 p 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 p 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Pp 还是 ✗", short: "Pp / ✗", desc: "听完选 Pp 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
