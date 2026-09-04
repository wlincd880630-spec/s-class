/**
 * Level 1 The Alphabet · Unit 2 · Letter Ff
 * Chant 保留教材 MP3（track26）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：看图连线写字；练习册 B：写 Ff 再连线；练习册 C：鱼身涂 F/f。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ff/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", f: true },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", f: true },
    farm: { id: "farm", en: "farm", zh: "农场", onset: "f", rest: "arm", img: IMG + "farm.jpg", f: true },
    fork: { id: "fork", en: "fork", zh: "叉子", onset: "f", rest: "ork", img: IMG + "fork.jpg", f: true },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", f: false },
    envelope: { id: "envelope", en: "envelope", zh: "信封", onset: "e", rest: "nvelope", img: IMG + "envelope.jpg", f: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", f: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", f: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", f: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", f: false },
    desk: { id: "desk", en: "desk", zh: "书桌", onset: "d", rest: "esk", img: IMG + "desk.jpg", f: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", f: false },
    "funny-fish": {
      id: "funny-fish",
      en: "funny fish",
      zh: "滑稽鱼",
      onset: "f",
      rest: "unny fish",
      img: IMG + "funny-fish.jpg",
      f: true,
      phrase: true
    }
  };

  global.FF_LESSON = {
    unit: "Unit 2",
    pages: "Student's Book p.16–17",
    workbookPages: "Workbook Unit 2 Ff p.8",
    letter: "Ff",
    letterCap: "F",
    letterSmall: "f",
    soundIpa: "/f/",
    soundHint: "唇齿摩擦音 /f/，像 funny fish 里的 f",
    mascot: {
      id: "funny-fish",
      phrase: "funny fish",
      zh: "滑稽鱼",
      img: IMG + "funny-fish.jpg"
    },
    hero: IMG + "hero-ff.jpg",
    video: "assets/video/letter-f.mp4",
    fishColor: IMG + "fish-color.jpg",
    tracks: {
      chant: AUD + "track26.mp3"
    },
    vocab: [WORDS.fish, WORDS.fan, WORDS.farm, WORDS.fork],
    matchWrite: {
      pics: ["fan", "fish", "fork", "farm"],
      boxes: [
        { id: "fork", label: "fork" },
        { id: "farm", label: "farm" },
        { id: "Ff", label: "Ff", kind: "letter" },
        { id: "fish", label: "fish" }
      ],
      answers: { fan: "Ff", fish: "fish", fork: "fork", farm: "farm" }
    },
    workbookHub: ["fork", "dog", "fish", "farm", "envelope", "fan"],
    workbookHubF: ["fork", "fish", "farm", "fan"],
    track05Items: [
      { id: "fork", writeFf: true },
      { id: "dog", writeFf: false },
      { id: "fish", writeFf: true },
      { id: "farm", writeFf: true }
    ],
    chantOrder: ["farm", "fan", "fork", "fish"],
    distractors: [WORDS.dog, WORDS.envelope, WORDS.apple, WORDS.egg, WORDS.bear, WORDS.cat],
    words: WORDS,
    workbookCircle: ["fish", "fan", "dog", "farm", "fork", "envelope"],
    workbookCircleExample: "fish",
    workbookLetters: ["F", "f", "A", "b", "F", "a", "d", "f"],
    fishColorLetters: ["F", "f", "A", "a", "B", "b", "C", "c", "D", "d", "F", "f", "f", "F", "a", "b"],
    oddOneOutPrint: [
      ["fish", "fan", "apple"],
      ["farm", "egg", "fork"],
      ["fish", "dog", "fan"],
      ["fork", "bear", "farm"]
    ],
    soundHunt: [
      "fish", "apple", "fan", "egg",
      "farm", "bear", "desk", "dog",
      "fork", "cat", "envelope", "funny-fish"
    ],
    copyDefaults: ["fish", "fan", "farm", "fork"],
    matchWords: ["fan", "fish", "fork", "farm"],
    choosePicture: [
      { word: "fish", pics: ["apple", "fish", "egg"] },
      { word: "fan", pics: ["fan", "cup", "bear"] },
      { word: "farm", pics: ["farm", "cat", "desk"] },
      { word: "fork", pics: ["fork", "dog", "envelope"] }
    ],
    chooseWord: [
      { pic: "fish", words: ["fan", "fish", "apple"] },
      { pic: "fan", words: ["fan", "egg", "bear"] },
      { pic: "farm", words: ["desk", "farm", "cat"] },
      { pic: "fork", words: ["fork", "dog", "egg"] }
    ],
    wordMaze: {
      size: 10,
      words: ["fish", "fan", "farm", "fork"],
      grid: [
        "BCDFHKJMQF",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "FISHBCDFHJ",
        "JKMQUVWYFN",
        "KMQUVWYZCA",
        "MQUVAWYZFR",
        "QUVWNYZFAR",
        "UVWYTBCDHK",
        "FFORKFANMU"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 f 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 f 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Ff 还是 ✗", short: "Ff / ✗", desc: "听完选 Ff 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
