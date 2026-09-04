/**
 * Unit 7 Review · Ss Tt Uu Vv
 * 教材 Student's Book p.72–73 + Workbook p.36
 * Story 保留教材 MP3（track86-story · Disc 2 Track 45）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var SS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ss/assets/img/";
  var TT = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Tt/assets/img/";
  var UU = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Uu/assets/img/";
  var VV = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Vv/assets/img/";
  var AUD = "assets/audio/";
  var LETTER_OPTS = ["s", "t", "u", "v"];

  var WORDS = {
    seal: { id: "seal", en: "seal", zh: "海豹", onset: "s", rest: "eal", letter: "s", img: SS + "seal.jpg" },
    sun: { id: "sun", en: "sun", zh: "太阳", onset: "s", rest: "un", letter: "s", img: SS + "sun.jpg" },
    soap: { id: "soap", en: "soap", zh: "肥皂", onset: "s", rest: "oap", letter: "s", img: SS + "soap.jpg" },
    turtle: { id: "turtle", en: "turtle", zh: "乌龟", onset: "t", rest: "urtle", letter: "t", img: TT + "turtle.jpg" },
    tiger: { id: "tiger", en: "tiger", zh: "老虎", onset: "t", rest: "iger", letter: "t", img: TT + "tiger.jpg" },
    tent: { id: "tent", en: "tent", zh: "帐篷", onset: "t", rest: "ent", letter: "t", img: TT + "tent.jpg" },
    teacher: { id: "teacher", en: "teacher", zh: "老师", onset: "t", rest: "eacher", letter: "t", img: IMG + "teacher.jpg" },
    umbrella: { id: "umbrella", en: "umbrella", zh: "雨伞", onset: "u", rest: "mbrella", letter: "u", img: UU + "umbrella.jpg" },
    up: { id: "up", en: "up", zh: "向上", onset: "u", rest: "p", letter: "u", img: UU + "up.jpg" },
    uncle: { id: "uncle", en: "uncle", zh: "叔叔", onset: "u", rest: "ncle", letter: "u", img: UU + "uncle.jpg" },
    van: { id: "van", en: "van", zh: "面包车", onset: "v", rest: "an", letter: "v", img: VV + "van.jpg" },
    vet: { id: "vet", en: "vet", zh: "兽医", onset: "v", rest: "et", letter: "v", img: VV + "vet.jpg" },
    violin: { id: "violin", en: "violin", zh: "小提琴", onset: "v", rest: "iolin", letter: "v", img: VV + "violin.jpg" },
    vest: { id: "vest", en: "vest", zh: "背心", onset: "v", rest: "est", letter: "v", img: VV + "vest.jpg" },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", letter: "c", img: IMG + "cat.jpg" }
  };

  global.STUV_REVIEW = {
    unit: "Unit 7 Review",
    pages: "Student's Book p.72–73",
    workbookPages: "Workbook p.36",
    letters: ["Ss", "Tt", "Uu", "Vv"],
    letterOpts: LETTER_OPTS,
    hero: IMG + "hero-stuv.jpg",
    story: IMG + "story-stuv.jpg",
    sightWords: ["hi", "he", "do", "you", "don't"],
    tracks: {
      story: AUD + "track86-story.mp3"
    },
    words: WORDS,
    sameSoundBoxes: [
      { tone: "blue", pics: ["turtle", "teacher", "vet"], answer: ["turtle", "teacher"] },
      { tone: "orange", pics: ["tiger", "soap", "seal"], answer: ["soap", "seal"] },
      { tone: "purple", pics: ["uncle", "van", "violin"], answer: ["van", "violin"] },
      { tone: "green", pics: ["umbrella", "up", "sun"], answer: ["umbrella", "up"] }
    ],
    listenCircle: [
      { pic: "violin", cap: "V", small: "v", caps: ["S", "V", "U"], lows: ["u", "s", "v"], sample: false },
      { pic: "seal", cap: "S", small: "s", caps: ["S", "T", "V"], lows: ["t", "s", "v"], sample: false },
      { pic: "umbrella", cap: "U", small: "u", caps: ["T", "S", "U"], lows: ["u", "s", "t"], sample: false },
      { pic: "tiger", cap: "T", small: "t", caps: ["U", "T", "V"], lows: ["v", "t", "u"], sample: false }
    ],
    writeItems: [
      { id: "up", letters: "Uu", modeled: false },
      { id: "van", letters: "Vv", modeled: false },
      { id: "turtle", letters: "Tt", modeled: false },
      { id: "sun", letters: "Ss", modeled: true }
    ],
    storyPanels: [
      { line: "The sun is up!", focus: "sun" },
      { line: "Hi! This is my uncle. He is a vet.", focus: "uncle" },
      { line: "Do you have a cat? — No, I don't. — What is that?", focus: "cat" },
      { line: "It is a small tiger!", focus: "tiger" }
    ],
    wbBeginningSound: [
      { id: "sun", answer: "s", letters: "Ss", path: "wave", sample: true },
      { id: "up", answer: "u", letters: "Uu", path: "scallop" },
      { id: "tent", answer: "t", letters: "Tt", path: "loop" },
      { id: "violin", answer: "v", letters: "Vv", path: "zigzag" }
    ],
    wbDrawShapes: [
      { id: "umbrella", shape: "heart", letters: "Uu", sample: false },
      { id: "vest", shape: "triangle", letters: "Vv", sample: false },
      { id: "soap", shape: "circle", letters: "Ss", sample: true },
      { id: "tiger", shape: "square", letters: "Tt", sample: false },
      { id: "turtle", shape: "square", letters: "Tt", sample: false },
      { id: "van", shape: "triangle", letters: "Vv", sample: false }
    ],
    shapeLegend: [
      { letters: "Ss", shape: "circle", label: "circle" },
      { letters: "Tt", shape: "square", label: "square" },
      { letters: "Uu", shape: "heart", label: "heart" },
      { letters: "Vv", shape: "triangle", label: "triangle" }
    ],
    games: [
      { id: 1, title: "相同开头音", short: "圈一对", desc: "找出同一框里开头音相同的两个图" },
      { id: 2, title: "听音圈字母", short: "听音", desc: "听单词，圈出 Ss Tt Uu Vv" },
      { id: 3, title: "练习册圈音", short: "WB A", desc: "sun · up · tent · violin 圈 s/t/u/v" },
      { id: 4, title: "图形写字母", short: "WB B", desc: "圆/方/心/三角对应 Ss Tt Uu Vv" }
    ]
  };
})(window);
