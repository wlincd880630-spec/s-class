/**
 * Level 1 The Alphabet · Unit 3 · Letter Hh
 * Chant 保留教材 MP3（track39）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：听写 Hh 再连线 6 图；练习册 B：写 Hh 再连线；练习册 C：房子涂 H/h。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Hh/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", h: true },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", h: true },
    house: { id: "house", en: "house", zh: "房子", onset: "h", rest: "ouse", img: IMG + "house.jpg", h: true },
    "hot-dog": { id: "hot-dog", en: "hot dog", zh: "热狗", onset: "h", rest: "ot dog", img: IMG + "hot-dog.jpg", h: true },
    hand: { id: "hand", en: "hand", zh: "手", onset: "h", rest: "and", img: IMG + "hand.jpg", h: true },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", img: IMG + "goat.jpg", h: false },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", img: IMG + "elephant.jpg", h: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", h: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", h: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", h: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", h: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", h: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", h: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", h: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", h: false },
    desk: { id: "desk", en: "desk", zh: "书桌", onset: "d", rest: "esk", img: IMG + "desk.jpg", h: false },
    bird: { id: "bird", en: "bird", zh: "鸟", onset: "b", rest: "ird", img: IMG + "bird.jpg", h: false },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", img: IMG + "gift.jpg", h: false },
    "happy-horse": {
      id: "happy-horse",
      en: "happy horse",
      zh: "开心马",
      onset: "h",
      rest: "appy horse",
      img: IMG + "happy-horse.jpg",
      h: true,
      phrase: true
    }
  };

  global.HH_LESSON = {
    unit: "Unit 3",
    pages: "Student's Book p.26–27",
    workbookPages: "Workbook Unit 3 Hh p.13",
    letter: "Hh",
    letterCap: "H",
    letterSmall: "h",
    soundIpa: "/h/",
    soundHint: "声门摩擦音 /h/，像 happy horse 里的 h",
    mascot: {
      id: "happy-horse",
      phrase: "happy horse",
      zh: "开心马",
      img: IMG + "happy-horse.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    hero: IMG + "hero-hh.jpg",
    video: "assets/video/letter-h.mp4",
    houseColor: IMG + "house-color.jpg",
    tracks: {
      chant: AUD + "track39.mp3"
    },
    vocab: [WORDS.horse, WORDS.hat, WORDS.house, WORDS["hot-dog"]],
    matchWriteListen: {
      pics: ["hot-dog", "hat", "hand", "horse", "goat", "house"],
      left: [
        { n: 1, sample: true, ghost: "Hh", answer: "hat" },
        { n: 3, answer: "hand" },
        { n: 5, answer: "goat", distractor: true }
      ],
      right: [
        { n: 2, answer: "hot-dog" },
        { n: 4, answer: "horse" },
        { n: 6, answer: "house" }
      ]
    },
    workbookHub: ["hot-dog", "hat", "horse", "elephant", "egg", "house"],
    workbookHubH: ["hot-dog", "hat", "horse", "house"],
    track05Items: [
      { id: "horse", writeHh: true },
      { id: "hat", writeHh: true },
      { id: "fan", writeHh: false },
      { id: "house", writeHh: true }
    ],
    chantOrder: ["hat", "house", "hot-dog", "horse"],
    distractors: [
      WORDS.elephant, WORDS.egg, WORDS.goat, WORDS.dog,
      WORDS.fan, WORDS.fish, WORDS.cat, WORDS.bear, WORDS.apple, WORDS.gorilla, WORDS.gift
    ],
    words: WORDS,
    workbookCircle: ["hat", "horse", "house", "elephant", "hot-dog", "egg"],
    workbookCircleExample: "hat",
    workbookLetters: ["H", "h", "A", "b", "H", "a", "c", "h", "H", "h", "e", "H"],
    houseColorLetters: ["H", "h", "A", "a", "B", "b", "C", "c", "D", "d", "H", "h", "h", "H", "a", "b"],
    oddOneOutPrint: [
      ["horse", "hat", "fan"],
      ["house", "egg", "hot-dog"],
      ["horse", "dog", "hat"],
      ["hand", "bear", "house"]
    ],
    soundHunt: [
      "horse", "apple", "hat", "fan",
      "house", "elephant", "hand", "goat",
      "hot-dog", "cat", "bear", "happy-horse"
    ],
    copyDefaults: ["horse", "hat", "house", "hot-dog"],
    matchWords: ["hat", "horse", "house", "hot-dog"],
    choosePicture: [
      { word: "horse", pics: ["fan", "horse", "egg"] },
      { word: "hat", pics: ["hat", "egg", "bear"] },
      { word: "house", pics: ["house", "cat", "dog"] },
      { word: "hot-dog", pics: ["hot-dog", "dog", "fish"] }
    ],
    chooseWord: [
      { pic: "horse", words: ["hat", "horse", "fan"] },
      { pic: "hat", words: ["hat", "egg", "bear"] },
      { pic: "house", words: ["desk", "house", "cat"] },
      { pic: "hot-dog", words: ["hot-dog", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["horse", "hat", "house", "hot-dog"],
      grid: [
        "BCDFHKJMQH",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "HATBCDFHJK",
        "JKMQUVWYHN",
        "KMQUVWYZCA",
        "MQUVAWYZHO",
        "QUVWNYZUSE",
        "UVWYTBCDHK",
        "HHORSEHATU"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 h 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 h 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Hh 还是 ✗", short: "Hh / ✗", desc: "听完选 Hh 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
