/**
 * Level 1 The Alphabet · Unit 1 · Letter Aa
 * 词表与音频来自 Student's Book p.4–5（Disc 1 Track 03–06）。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", a: true },
    axe: { id: "axe", en: "axe", zh: "斧头", onset: "a", rest: "xe", img: IMG + "axe.jpg", a: true },
    ant: { id: "ant", en: "ant", zh: "蚂蚁", onset: "a", rest: "nt", img: IMG + "ant.jpg", a: true },
    alligator: { id: "alligator", en: "alligator", zh: "短吻鳄", onset: "a", rest: "lligator", img: IMG + "alligator.jpg", a: true },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", a: false },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", img: IMG + "cup.jpg", a: false },
    ball: { id: "ball", en: "ball", zh: "球", onset: "b", rest: "all", img: IMG + "ball.jpg", a: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", a: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", a: false }
  };

  global.AA_LESSON = {
    unit: "Unit 1",
    pages: "Student's Book p.4–5",
    letter: "Aa",
    soundIpa: "/æ/",
    soundHint: "短元音，像 angry apple 里的 a",
    mascot: {
      id: "angry-apple",
      phrase: "angry apple",
      zh: "生气的苹果",
      img: IMG + "angry-apple.jpg"
    },
    hero: IMG + "hero-aa.jpg",
    video: "assets/video/letter-a.mp4",
    tracks: {
      t03: AUD + "track03.mp3",
      t04: AUD + "track04.mp3",
      t05: AUD + "track05.mp3",
      t06: AUD + "track06.mp3"
    },
    /** 教材 B：Listen, point, and repeat 顺序 */
    vocab: [WORDS.apple, WORDS.axe, WORDS.ant, WORDS.alligator],
    /** Track 04 各词起止（秒） */
    track04Clips: {
      apple: [6.0, 14.0],
      axe: [14.0, 27.0],
      ant: [27.0, 36.0],
      alligator: [36.0, 49.2]
    },
    /** 教材 D：Listen. Then write Aa or cross it out. */
    track05Items: [
      { id: "ant", start: 8.0, end: 13.8, writeAa: true },
      { id: "bear", start: 14.0, end: 19.5, writeAa: false },
      { id: "apple", start: 19.8, end: 26.5, writeAa: true },
      { id: "alligator", start: 26.8, end: 34.3, writeAa: true },
      { id: "cup", start: 34.5, end: 41.5, writeAa: false },
      { id: "axe", start: 41.8, end: 50.0, writeAa: true }
    ],
    /** 教材 E chant 顺序 */
    chantOrder: ["ant", "apple", "alligator", "axe"],
    distractors: [WORDS.bear, WORDS.cup, WORDS.ball, WORDS.cat, WORDS.dog],
    words: WORDS,
    games: [
      { id: 1, title: "开头音小侦探", desc: "点听单词，再选出 a 开头" },
      { id: 2, title: "听音点图", desc: "听单词，点出图" },
      { id: 3, title: "局外人", desc: "找出不是 a 开头的图" },
      { id: 4, title: "翻牌配对", desc: "先记位置，再配对" },
      { id: 5, title: "写 Aa 还是 ✗", desc: "听完选 Aa 或打叉" },
      { id: 6, title: "Chant 排队", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
