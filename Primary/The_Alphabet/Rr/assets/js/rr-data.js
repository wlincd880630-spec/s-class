/**
 * Level 1 The Alphabet · Unit 6 · Letter Rr
 * Chant 保留教材 MP3（track71）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：Connect 迷宫连线；练习册 B：写 Rr 再配对；练习册 C：机器人形状写字。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    rabbit: { id: "rabbit", en: "rabbit", zh: "兔子", onset: "r", rest: "abbit", img: IMG + "rabbit.jpg", r: true },
    rose: { id: "rose", en: "rose", zh: "玫瑰", onset: "r", rest: "ose", img: IMG + "rose.jpg", r: true },
    rice: { id: "rice", en: "rice", zh: "米饭", onset: "r", rest: "ice", img: IMG + "rice.jpg", r: true },
    robot: { id: "robot", en: "robot", zh: "机器人", onset: "r", rest: "obot", img: IMG + "robot.jpg", r: true },
    rug: { id: "rug", en: "rug", zh: "地毯", onset: "r", rest: "ug", img: IMG + "rug.jpg", r: true },
    pen: { id: "pen", en: "pen", zh: "钢笔", onset: "p", rest: "en", img: IMG + "pen.jpg", r: false },
    net: { id: "net", en: "net", zh: "网", onset: "n", rest: "et", img: IMG + "net.jpg", r: false },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", img: IMG + "lamp.jpg", r: false },
    checklist: { id: "checklist", en: "checklist", zh: "清单", onset: "ch", rest: "ecklist", img: IMG + "checklist.jpg", r: false },
    peach: { id: "peach", en: "peach", zh: "桃子", onset: "p", rest: "each", img: IMG + "peach.jpg", r: false },
    queen: { id: "queen", en: "queen", zh: "女王", onset: "qu", rest: "een", img: IMG + "queen.jpg", r: false },
    milk: { id: "milk", en: "milk", zh: "牛奶", onset: "m", rest: "ilk", img: IMG + "milk.jpg", r: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", r: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", r: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", r: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", r: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", r: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", r: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", r: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", r: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", r: false },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", img: IMG + "lion.jpg", r: false },
    "racing-rabbit": {
      id: "racing-rabbit",
      en: "racing rabbit",
      zh: "赛跑兔子",
      onset: "r",
      rest: "acing rabbit",
      img: IMG + "racing-rabbit.jpg",
      r: true,
      phrase: true
    }
  };

  global.RR_LESSON = {
    unit: "Unit 6",
    pages: "Student's Book p.56–57",
    workbookPages: "Workbook Unit 6 Rr p.28",
    letter: "Rr",
    letterCap: "R",
    letterSmall: "r",
    soundIpa: "/r/",
    soundHint: "卷舌音 /r/，像 racing rabbit 里的 r",
    mascot: {
      id: "racing-rabbit",
      phrase: "racing rabbit",
      zh: "赛跑兔子",
      img: IMG + "racing-rabbit.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    chantBubbleWord: "rice",
    chantBubblePrefix: "That is your",
    hero: IMG + "hero-rr.jpg",
    video: "assets/video/letter-r.mp4",
    rabbitConnect: IMG + "rabbit-connect.jpg",
    robotShapes: IMG + "robot-shapes.jpg",
    tracks: {
      chant: AUD + "track71.mp3"
    },
    vocab: [WORDS.rabbit, WORDS.rose, WORDS.rice, WORDS.robot],
    connectPath: ["rabbit", "rice", "robot", "rose", "rug"],
    track05Items: [
      { id: "rabbit", writeRr: true },
      { id: "rose", writeRr: true },
      { id: "lamp", writeRr: false },
      { id: "robot", writeRr: true }
    ],
    chantOrder: ["rice", "rose", "rabbit", "robot"],
    distractors: [
      WORDS.pen, WORDS.net, WORDS.lamp, WORDS.checklist,
      WORDS.peach, WORDS.queen, WORDS.milk, WORDS.fish,
      WORDS.hat, WORDS.egg, WORDS.fan, WORDS.cat
    ],
    words: WORDS,
    wbMatchItems: [
      { id: "rose", num: 1 },
      { id: "rice", num: 2 },
      { id: "lamp", num: 3 },
      { id: "robot", num: 4 },
      { id: "rabbit", num: 5 },
      { id: "checklist", num: 6 }
    ],
    workbookCircle: ["rose", "rice", "lamp", "robot", "rabbit", "checklist"],
    workbookCircleExample: "rabbit",
    oddOneOutPrint: [
      ["rabbit", "rose", "lamp"],
      ["rice", "egg", "robot"],
      ["rose", "dog", "rabbit"],
      ["robot", "bear", "rice"]
    ],
    soundHunt: [
      "rabbit", "apple", "rose", "fan",
      "rice", "horse", "robot", "lion",
      "rose", "cat", "bear", "racing-rabbit"
    ],
    copyDefaults: ["rabbit", "rose", "rice", "robot"],
    matchWords: ["rose", "rice", "rabbit", "robot"],
    choosePicture: [
      { word: "rabbit", pics: ["fan", "rabbit", "egg"] },
      { word: "rose", pics: ["rose", "dog", "bear"] },
      { word: "rice", pics: ["rice", "cat", "horse"] },
      { word: "robot", pics: ["robot", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "rabbit", words: ["rose", "rabbit", "fan"] },
      { pic: "rose", words: ["rose", "egg", "bear"] },
      { pic: "rice", words: ["horse", "rice", "cat"] },
      { pic: "robot", words: ["robot", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["rabbit", "rose", "rice", "robot"],
      grid: [
        "BCDFHLJMQR",
        "DFHLJMQBVE",
        "FHLJMQBVWD",
        "ROSEBCDFHR",
        "HLJMQBVWYR",
        "HLMQBVWYZA",
        "LMQBVWYZRI",
        "MQBVNYZTON",
        "BVWYTBCDHR",
        "RRICEROBOT"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 r 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 r 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Rr 还是 ✗", short: "Rr / ✗", desc: "听完选 Rr 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
