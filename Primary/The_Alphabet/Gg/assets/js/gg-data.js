/**
 * Level 1 The Alphabet · Unit 3 · Letter Gg
 * Chant 保留教材 MP3（track35）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：听音圈图 4 行×4 图；练习册 B：圈 g 音图；练习册 C：写 Gg 或打叉。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Gg/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    gorilla: { id: "gorilla", en: "gorilla", zh: "大猩猩", onset: "g", rest: "orilla", img: IMG + "gorilla.jpg", g: true },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", img: IMG + "goat.jpg", g: true },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", img: IMG + "gift.jpg", g: true },
    girl: { id: "girl", en: "girl", zh: "女孩", onset: "g", rest: "irl", img: IMG + "girl.jpg", g: true },
    envelope: { id: "envelope", en: "envelope", zh: "信封", onset: "e", rest: "nvelope", img: IMG + "envelope.jpg", g: false },
    alligator: { id: "alligator", en: "alligator", zh: "短吻鳄", onset: "a", rest: "lligator", img: IMG + "alligator.jpg", g: false },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", img: IMG + "bed.jpg", g: false },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", img: IMG + "elephant.jpg", g: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", g: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", g: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", g: false },
    desk: { id: "desk", en: "desk", zh: "书桌", onset: "d", rest: "esk", img: IMG + "desk.jpg", g: false },
    farm: { id: "farm", en: "farm", zh: "农场", onset: "f", rest: "arm", img: IMG + "farm.jpg", g: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", g: false },
    doll: { id: "doll", en: "doll", zh: "玩偶", onset: "d", rest: "oll", img: IMG + "doll.jpg", g: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", g: false },
    bird: { id: "bird", en: "bird", zh: "鸟", onset: "b", rest: "ird", img: IMG + "bird.jpg", g: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", g: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", g: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", g: false },
    "good-gorilla": {
      id: "good-gorilla",
      en: "good gorilla",
      zh: "乖猩猩",
      onset: "g",
      rest: "ood gorilla",
      img: IMG + "good-gorilla.jpg",
      g: true,
      phrase: true
    }
  };

  global.GG_LESSON = {
    unit: "Unit 3",
    pages: "Student's Book p.24–25",
    workbookPages: "Workbook Unit 3 Gg p.12",
    letter: "Gg",
    letterCap: "G",
    letterSmall: "g",
    soundIpa: "/g/",
    soundHint: "软腭爆破音 /g/，像 good gorilla 里的 g",
    mascot: {
      id: "good-gorilla",
      phrase: "good gorilla",
      zh: "乖猩猩",
      img: IMG + "good-gorilla.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    hero: IMG + "hero-gg.jpg",
    video: "assets/video/letter-g.mp4",
    tracks: {
      chant: AUD + "track35.mp3"
    },
    vocab: [WORDS.gorilla, WORDS.goat, WORDS.gift, WORDS.girl],
    soundHuntRows: [
      { pics: ["envelope", "alligator", "bed", "goat"], answer: "goat" },
      { pics: ["elephant", "gorilla", "fan", "cat"], answer: "gorilla" },
      { pics: ["girl", "bear", "desk", "farm"], answer: "girl" },
      { pics: ["egg", "doll", "gift", "cup"], answer: "gift" }
    ],
    track05Items: [
      { id: "gorilla", writeGg: true },
      { id: "girl", writeGg: true },
      { id: "fan", writeGg: false },
      { id: "goat", writeGg: true }
    ],
    chantOrder: ["gorilla", "girl", "gift", "goat"],
    distractors: [
      WORDS.envelope, WORDS.alligator, WORDS.bed, WORDS.elephant,
      WORDS.fan, WORDS.cat, WORDS.bear, WORDS.desk,
      WORDS.farm, WORDS.egg, WORDS.doll, WORDS.cup, WORDS.bird, WORDS.fish
    ],
    words: WORDS,
    workbookCircle: ["girl", "gift", "goat", "fan", "gorilla", "bird"],
    workbookCircleExample: "girl",
    workbookLetters: ["G", "g", "A", "b", "G", "a", "c", "g"],
    oddOneOutPrint: [
      ["gorilla", "goat", "fan"],
      ["gift", "egg", "girl"],
      ["gorilla", "dog", "goat"],
      ["gift", "bear", "girl"]
    ],
    soundHunt: [
      "gorilla", "apple", "goat", "fan",
      "gift", "bird", "desk", "alligator",
      "girl", "cat", "bear", "good-gorilla"
    ],
    copyDefaults: ["gorilla", "goat", "gift", "girl"],
    matchWords: ["goat", "gorilla", "girl", "gift"],
    choosePicture: [
      { word: "gorilla", pics: ["fan", "gorilla", "egg"] },
      { word: "goat", pics: ["goat", "cup", "bear"] },
      { word: "gift", pics: ["gift", "cat", "desk"] },
      { word: "girl", pics: ["girl", "dog", "fish"] }
    ],
    chooseWord: [
      { pic: "gorilla", words: ["goat", "gorilla", "fan"] },
      { pic: "goat", words: ["goat", "egg", "bear"] },
      { pic: "gift", words: ["desk", "gift", "cat"] },
      { pic: "girl", words: ["girl", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["gorilla", "goat", "gift", "girl"],
      grid: [
        "BCDFHKJMQG",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "GOATBCDFHJ",
        "JKMQUVWYGN",
        "KMQUVWYZCA",
        "MQUVAWYZGI",
        "QUVWNYZRLF",
        "UVWYTBCDHK",
        "GGIRLGOATU"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 g 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 g 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Gg 还是 ✗", short: "Gg / ✗", desc: "听完选 Gg 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
