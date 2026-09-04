/**
 * Unit 8 Review · Ww Xx Yy Zz
 * 教材 Student's Book p.84–86 + Workbook p.42
 * Story 音频保留教材 MP3（track102-story）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    wolf: { id: "wolf", en: "wolf", zh: "狼", onset: "w", rest: "olf", letter: "w", img: IMG + "wolf.jpg" },
    web: { id: "web", en: "web", zh: "蜘蛛网", onset: "w", rest: "eb", letter: "w", img: IMG + "web.jpg" },
    water: { id: "water", en: "water", zh: "水", onset: "w", rest: "ater", letter: "w", img: IMG + "water.jpg" },
    watch: { id: "watch", en: "watch", zh: "手表", onset: "w", rest: "atch", letter: "w", img: IMG + "watch.jpg" },
    wagon: { id: "wagon", en: "wagon", zh: "马车", onset: "w", rest: "agon", letter: "w", img: IMG + "wagon.jpg" },
    fox: { id: "fox", en: "fox", zh: "狐狸", onset: "f", rest: "ox", letter: "x", img: IMG + "fox.jpg" },
    box: { id: "box", en: "box", zh: "盒子", onset: "b", rest: "ox", letter: "x", img: IMG + "box.jpg" },
    six: { id: "six", en: "six", zh: "六", onset: "s", rest: "ix", letter: "x", img: IMG + "six.jpg" },
    wax: { id: "wax", en: "wax", zh: "蜡", onset: "w", rest: "ax", letter: "x", img: IMG + "wax.jpg" },
    yoyo: { id: "yoyo", en: "yo-yo", zh: "溜溜球", onset: "y", rest: "o-yo", letter: "y", img: IMG + "yoyo.jpg" },
    yak: { id: "yak", en: "yak", zh: "牦牛", onset: "y", rest: "ak", letter: "y", img: IMG + "yak.jpg" },
    yogurt: { id: "yogurt", en: "yogurt", zh: "酸奶", onset: "y", rest: "ogurt", letter: "y", img: IMG + "yogurt.jpg" },
    yacht: { id: "yacht", en: "yacht", zh: "游艇", onset: "y", rest: "acht", letter: "y", img: IMG + "yacht.jpg" },
    zebra: { id: "zebra", en: "zebra", zh: "斑马", onset: "z", rest: "ebra", letter: "z", img: IMG + "zebra.jpg" },
    zero: { id: "zero", en: "zero", zh: "零", onset: "z", rest: "ero", letter: "z", img: IMG + "zero.jpg" },
    zip: { id: "zip", en: "zip", zh: "拉链", onset: "z", rest: "ip", letter: "z", img: IMG + "zip.jpg" },
    zoo: { id: "zoo", en: "zoo", zh: "动物园", onset: "z", rest: "oo", letter: "z", img: IMG + "zoo.jpg" },
    wet: { id: "wet", en: "wet", zh: "湿的", onset: "w", rest: "et", letter: "w", img: IMG + "wet.jpg" },
    van: { id: "van", en: "van", zh: "面包车", onset: "v", rest: "an", letter: "v", img: IMG + "van.jpg" },
    sun: { id: "sun", en: "sun", zh: "太阳", onset: "s", rest: "un", letter: "s", img: IMG + "sun.jpg" },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", letter: "a", img: IMG + "apple.jpg" },
    boat: { id: "boat", en: "boat", zh: "小船", onset: "b", rest: "oat", letter: "b", img: IMG + "boat.jpg" },
    bottle: { id: "bottle", en: "bottle", zh: "瓶子", onset: "b", rest: "ottle", letter: "b", img: IMG + "bottle.jpg" }
  };

  global.WXYZ_REVIEW = {
    unit: "Unit 8 Review",
    pages: "Student's Book p.84–86",
    workbookPages: "Workbook p.42",
    letters: ["Ww", "Xx", "Yy", "Zz"],
    hero: IMG + "hero-wxyz.jpg",
    story: IMG + "story-wxyz.jpg",
    sightWords: ["It", "is", "a"],
    tracks: {
      story: AUD + "track102-story.mp3"
    },
    words: WORDS,
    sameSoundBoxes: [
      { tone: "green", pics: ["watch", "fox", "box", "van"], answer: ["fox", "box"] },
      { tone: "blue", pics: ["yacht", "yak", "yogurt", "yoyo"], answer: ["yacht", "yak", "yogurt", "yoyo"] },
      { tone: "orange", pics: ["zoo", "wet", "zebra", "sun"], answer: ["zoo", "zebra"] }
    ],
    listenCircle: [
      { pic: "watch", cap: "W", small: "w", sample: true }
    ],
    writeItems: [
      { id: "wagon", modeled: false, letters: "Ww" },
      { id: "six", modeled: false, letters: "Xx" },
      { id: "yoyo", modeled: false, letters: "Yy" },
      { id: "zero", modeled: true, letters: "Zz" }
    ],
    wbBeginningSound: [
      { pic: "watch", answer: "w" },
      { pic: "fox", answer: "x" },
      { pic: "yacht", answer: "y" },
      { pic: "zebra", answer: "z" },
      { pic: "yoyo", answer: "y" },
      { pic: "wolf", answer: "w" },
      { pic: "box", answer: "x" },
      { pic: "yak", answer: "y" },
      { pic: "sun", answer: "s", sample: true }
    ],
    wbTraceMatch: {
      caps: ["W", "X", "Y", "Z"],
      pics: ["wolf", "fox", "yogurt", "zebra"],
      lowers: ["w", "x", "y", "z"],
      pairs: { W: "wolf", X: "fox", Y: "yogurt", Z: "zebra" }
    },
    wbLetterPick: [
      { pic: "apple", letters: "Aa", sample: true },
      { pic: "sun", letters: "Ss" },
      { pic: "box", letters: "Xx" },
      { pic: "zebra", letters: "Zz" }
    ],
    storyPanels: [
      { line: "It is a boat.", focus: "boat" },
      { line: "It is a bottle.", focus: "bottle" },
      { line: "I see a zebra.", focus: "zebra" },
      { line: "I see a yo-yo.", focus: "yoyo" }
    ],
    games: [
      { id: 1, title: "相同开头音", short: "圈一对", desc: "找出同一框里 w / x / y / z 音相同的图" },
      { id: 2, title: "听音圈字母", short: "听音", desc: "听单词，圈出 W / X / Y / Z" },
      { id: 3, title: "开头音打勾", short: "w x y z", desc: "练习册：听音选 w、x、y 或 z" },
      { id: 4, title: "描红连线", short: "连线", desc: "Ww Xx Yy Zz 大写、图片、小写连线" }
    ]
  };
})(window);
