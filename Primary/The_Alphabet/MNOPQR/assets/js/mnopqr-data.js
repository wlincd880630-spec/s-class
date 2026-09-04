/**
 * Review 3 · Mm Nn Oo Pp Qq Rr
 * 教材 Student's Book p.60–63 + Workbook p.30–31
 * Song 保留教材 MP3（track75 · Disc 2 Track 27）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";
  var LETTER_OPTS = ["m", "n", "o", "p", "q", "r"];

  var WORDS = {
    monkey: { id: "monkey", en: "monkey", zh: "猴子", onset: "m", rest: "onkey", letter: "m", img: IMG + "monkey.jpg" },
    mouse: { id: "mouse", en: "mouse", zh: "老鼠", onset: "m", rest: "ouse", letter: "m", img: IMG + "mouse.jpg" },
    milk: { id: "milk", en: "milk", zh: "牛奶", onset: "m", rest: "ilk", letter: "m", img: IMG + "milk.jpg" },
    money: { id: "money", en: "money", zh: "钱", onset: "m", rest: "oney", letter: "m", img: IMG + "money.jpg" },
    nut: { id: "nut", en: "nut", zh: "坚果", onset: "n", rest: "ut", letter: "n", img: IMG + "nut.jpg" },
    net: { id: "net", en: "net", zh: "网", onset: "n", rest: "et", letter: "n", img: IMG + "net.jpg" },
    nest: { id: "nest", en: "nest", zh: "鸟巢", onset: "n", rest: "est", letter: "n", img: IMG + "nest.jpg" },
    nose: { id: "nose", en: "nose", zh: "鼻子", onset: "n", rest: "ose", letter: "n", img: IMG + "nose.jpg" },
    octopus: { id: "octopus", en: "octopus", zh: "章鱼", onset: "o", rest: "ctopus", letter: "o", img: IMG + "octopus.jpg" },
    olive: { id: "olive", en: "olive", zh: "橄榄", onset: "o", rest: "live", letter: "o", img: IMG + "olive.jpg" },
    ox: { id: "ox", en: "ox", zh: "牛", onset: "o", rest: "x", letter: "o", img: IMG + "ox.jpg" },
    ostrich: { id: "ostrich", en: "ostrich", zh: "鸵鸟", onset: "o", rest: "strich", letter: "o", img: IMG + "ostrich.jpg" },
    panda: { id: "panda", en: "panda", zh: "熊猫", onset: "p", rest: "anda", letter: "p", img: IMG + "panda.jpg" },
    peach: { id: "peach", en: "peach", zh: "桃子", onset: "p", rest: "each", letter: "p", img: IMG + "peach.jpg" },
    pen: { id: "pen", en: "pen", zh: "钢笔", onset: "p", rest: "en", letter: "p", img: IMG + "pen.jpg" },
    pineapple: { id: "pineapple", en: "pineapple", zh: "菠萝", onset: "p", rest: "ineapple", letter: "p", img: IMG + "pineapple.jpg" },
    queen: { id: "queen", en: "queen", zh: "女王", onset: "q", rest: "ueen", letter: "q", img: IMG + "queen.jpg" },
    question: { id: "question", en: "question", zh: "问题", onset: "q", rest: "uestion", letter: "q", img: IMG + "question.jpg" },
    robot: { id: "robot", en: "robot", zh: "机器人", onset: "r", rest: "obot", letter: "r", img: IMG + "robot.jpg" },
    rabbit: { id: "rabbit", en: "rabbit", zh: "兔子", onset: "r", rest: "abbit", letter: "r", img: IMG + "rabbit.jpg" },
    rose: { id: "rose", en: "rose", zh: "玫瑰", onset: "r", rest: "ose", letter: "r", img: IMG + "rose.jpg" },
    rice: { id: "rice", en: "rice", zh: "米饭", onset: "r", rest: "ice", letter: "r", img: IMG + "rice.jpg" },
    car: { id: "car", en: "car", zh: "汽车", onset: "c", rest: "ar", letter: "r", img: IMG + "car.jpg" },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", letter: "h", img: IMG + "horse.jpg" },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", letter: "l", img: IMG + "lion.jpg" },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", letter: "g", img: IMG + "gift.jpg" }
  };

  global.MNOPQR_REVIEW = {
    unit: "Review 3",
    pages: "Student's Book p.60–63",
    workbookPages: "Workbook p.30–31",
    letters: ["Mm", "Nn", "Oo", "Pp", "Qq", "Rr"],
    letterOpts: LETTER_OPTS,
    hero: IMG + "hero-mnopqr.jpg",
    song: IMG + "song-mnopqr.jpg",
    gameBoard: IMG + "game-board-mnopqr.jpg",
    tracks: {
      song: AUD + "track75.mp3"
    },
    words: WORDS,
    listenCircleWrite: [
      { pics: ["monkey", "nest", "peach"], answers: ["m", "n", "p"], sample: true },
      { pics: ["queen", "rabbit", "milk"], answers: ["q", "r", "m"] },
      { pics: ["ox", "nut", "panda"], answers: ["o", "n", "p"] },
      { pics: ["robot", "olive", "mouse"], answers: ["r", "o", "m"] },
      { pics: ["rose", "net", "octopus"], answers: ["r", "n", "o"] },
      { pics: ["question", "ostrich", "pineapple"], answers: ["q", "o", "p"] }
    ],
    sameSoundPairs: [
      { a: "monkey", b: "mouse", same: true, sample: true },
      { a: "nest", b: "net", same: true },
      { a: "ox", b: "olive", same: true },
      { a: "peach", b: "pen", same: true },
      { a: "queen", b: "question", same: true },
      { a: "rabbit", b: "rice", same: true }
    ],
    matchSay: {
      caps: ["M", "N", "O", "P", "Q", "R"],
      lowers: ["m", "n", "o", "p", "q", "r"],
      pics: ["monkey", "nest", "ox", "panda", "queen", "rabbit", "milk", "nut", "ostrich", "peach", "question", "robot"],
      pairs: { M: "monkey", N: "nest", O: "ox", P: "panda", Q: "queen", R: "rabbit" }
    },
    wbBeginningSound: [
      { id: "monkey", answer: "m" },
      { id: "nest", answer: "n" },
      { id: "octopus", answer: "o" },
      { id: "panda", answer: "p" },
      { id: "queen", answer: "q" },
      { id: "rabbit", answer: "r" },
      { id: "peach", answer: "p" },
      { id: "money", answer: "m" },
      { id: "rose", answer: "r", sample: true }
    ],
    wbTripleMatch: [
      { cap: "M", pic: "monkey", small: "m", sample: true },
      { cap: "N", pic: "nest", small: "n" },
      { cap: "O", pic: "ox", small: "o" },
      { cap: "P", pic: "peach", small: "p" },
      { cap: "Q", pic: "queen", small: "q" },
      { cap: "R", pic: "rabbit", small: "r" }
    ],
    wbLetterWord: [
      { letter: "M", word: "money", pic: "money", sample: true },
      { letter: "N", word: "nest", pic: "nest" },
      { letter: "O", word: "ox", pic: "ox" },
      { letter: "P", word: "peach", pic: "peach" },
      { letter: "Q", word: "question", pic: "question" },
      { letter: "R", word: "rose", pic: "rose" }
    ],
    wbSubstitution: [
      { sym: "★", letter: "m" },
      { sym: "●", letter: "n" },
      { sym: "▲", letter: "o" },
      { sym: "■", letter: "p" },
      { sym: "♦", letter: "q" },
      { sym: "♥", letter: "r" }
    ],
    games: [
      { id: 1, title: "听音圈写", short: "B", desc: "听单词，圈字母并书写" },
      { id: 2, title: "相同开头音", short: "C", desc: "两个词开头音相同吗？" },
      { id: 3, title: "字母连线", short: "D", desc: "大写、图片、小写连线" },
      { id: 4, title: "练习册圈音", short: "WB A", desc: "9 张图圈 m–r 开头音" }
    ]
  };
})(window);
