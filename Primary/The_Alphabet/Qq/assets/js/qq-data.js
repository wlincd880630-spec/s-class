/**
 * Level 1 The Alphabet · Unit 6 · Letter Qq
 * Chant 保留教材 MP3（track68）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：Match and write；练习册 B：圈 q 音图；练习册 C：被子涂 Q/q。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Qq/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    queen: { id: "queen", en: "queen", zh: "女王", onset: "qu", rest: "een", img: IMG + "queen.jpg", q: true },
    quiz: { id: "quiz", en: "quiz", zh: "测验", onset: "qu", rest: "iz", img: IMG + "quiz.jpg", q: true },
    quilt: { id: "quilt", en: "quilt", zh: "被子", onset: "qu", rest: "ilt", img: IMG + "quilt.jpg", q: true },
    question: { id: "question", en: "question", zh: "问题", onset: "qu", rest: "estion", img: IMG + "question.jpg", q: true },
    king: { id: "king", en: "king", zh: "国王", onset: "k", rest: "ing", img: IMG + "king.jpg", q: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", q: false },
    peach: { id: "peach", en: "peach", zh: "桃子", onset: "p", rest: "each", img: IMG + "peach.jpg", q: false },
    pen: { id: "pen", en: "pen", zh: "钢笔", onset: "p", rest: "en", img: IMG + "pen.jpg", q: false },
    rabbit: { id: "rabbit", en: "rabbit", zh: "兔子", onset: "r", rest: "abbit", img: IMG + "rabbit.jpg", q: false },
    rose: { id: "rose", en: "rose", zh: "玫瑰", onset: "r", rest: "ose", img: IMG + "rose.jpg", q: false },
    milk: { id: "milk", en: "milk", zh: "牛奶", onset: "m", rest: "ilk", img: IMG + "milk.jpg", q: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", q: false },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", img: IMG + "lamp.jpg", q: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", q: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", q: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", q: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", q: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", q: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", q: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", q: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", q: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", q: false },
    "quiet-queen": {
      id: "quiet-queen",
      en: "quiet queen",
      zh: "安静女王",
      onset: "qu",
      rest: "iet queen",
      img: IMG + "quiet-queen.jpg",
      q: true,
      phrase: true
    }
  };

  global.QQ_LESSON = {
    unit: "Unit 6",
    pages: "Student's Book p.54–55",
    workbookPages: "Workbook Unit 6 Qq p.27",
    letter: "Qq",
    letterCap: "Q",
    letterSmall: "q",
    soundIpa: "/kw/",
    soundHint: "qu 发 /kw/，像 quiet queen 里的 qu",
    mascot: {
      id: "quiet-queen",
      phrase: "quiet queen",
      zh: "安静女王",
      img: IMG + "quiet-queen.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "quilt",
    chantBubblePrefix: "Is this a",
    hero: IMG + "hero-qq.jpg",
    video: "assets/video/letter-q.mp4",
    matchWrite: IMG + "match-write-qq.jpg",
    quiltColor: IMG + "quilt-color.jpg",
    tracks: {
      chant: AUD + "track68.mp3"
    },
    vocab: [WORDS.queen, WORDS.quiz, WORDS.quilt, WORDS.question],
    matchWriteTop: ["quilt", "quiz", "queen", "question"],
    matchWriteBoxes: [
      { num: 1, id: "quilt" },
      { num: 2, id: "question" },
      { num: 3, id: "queen" },
      { num: 4, id: "quiz" }
    ],
    track05Items: [
      { id: "queen", writeQq: true },
      { id: "quilt", writeQq: true },
      { id: "king", writeQq: false },
      { id: "quiz", writeQq: true }
    ],
    chantOrder: ["quilt", "question", "quiz", "queen"],
    distractors: [
      WORDS.king, WORDS.cup, WORDS.peach, WORDS.pen,
      WORDS.rabbit, WORDS.rose, WORDS.milk, WORDS.fish,
      WORDS.lamp, WORDS.hat, WORDS.egg, WORDS.fan
    ],
    words: WORDS,
    workbookCircle: ["king", "queen", "quilt", "cup", "quiz", "question"],
    workbookCircleExample: "queen",
    oddOneOutPrint: [
      ["queen", "quilt", "king"],
      ["quiz", "egg", "question"],
      ["quilt", "dog", "queen"],
      ["question", "bear", "quiz"]
    ],
    soundHunt: [
      "queen", "apple", "quilt", "fan",
      "quiz", "horse", "question", "lion",
      "quilt", "cat", "bear", "quiet-queen"
    ],
    copyDefaults: ["queen", "quiz", "quilt", "question"],
    matchWords: ["quiz", "queen", "quilt", "question"],
    choosePicture: [
      { word: "queen", pics: ["fan", "queen", "egg"] },
      { word: "quiz", pics: ["quiz", "dog", "bear"] },
      { word: "quilt", pics: ["quilt", "cat", "horse"] },
      { word: "question", pics: ["question", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "queen", words: ["quiz", "queen", "fan"] },
      { pic: "quiz", words: ["quiz", "egg", "bear"] },
      { pic: "quilt", words: ["horse", "quilt", "cat"] },
      { pic: "question", words: ["question", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["queen", "quiz", "quilt", "question"],
      grid: [
        "BCDFHLJMQQ",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "QUILBCDFHQ",
        "HLJMQBVWYQ",
        "HLMQBVWYZA",
        "LMQBVWYZQI",
        "MQBVNYZTON",
        "BVWYTBCDHQ",
        "QQUEENQUIZ"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 qu 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 q 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Qq 还是 ✗", short: "Qq / ✗", desc: "听完选 Qq 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
