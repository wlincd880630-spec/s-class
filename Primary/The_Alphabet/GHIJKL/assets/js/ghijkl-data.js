/**
 * Review 2 · Gg Hh Ii Jj Kk Ll
 * 教材 Student's Book p.40–43 + Workbook p.19–21
 * Song 保留教材 MP3（track58）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/GHIJKL/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    gorilla: { id: "gorilla", en: "gorilla", zh: "大猩猩", onset: "g", rest: "orilla", letter: "g", img: IMG + "gorilla.jpg" },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", letter: "g", img: IMG + "goat.jpg" },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", letter: "g", img: IMG + "gift.jpg" },
    girl: { id: "girl", en: "girl", zh: "女孩", onset: "g", rest: "irl", letter: "g", img: IMG + "girl.jpg" },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", letter: "h", img: IMG + "horse.jpg" },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", letter: "h", img: IMG + "hat.jpg" },
    house: { id: "house", en: "house", zh: "房子", onset: "h", rest: "ouse", letter: "h", img: IMG + "house.jpg" },
    "hot-dog": { id: "hot-dog", en: "hot dog", zh: "热狗", onset: "h", rest: "ot dog", letter: "h", img: IMG + "hot-dog.jpg" },
    hit: { id: "hit", en: "hit", zh: "击打", onset: "h", rest: "it", letter: "h", img: IMG + "hit.jpg" },
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", letter: "i", img: IMG + "insect.jpg" },
    ink: { id: "ink", en: "ink", zh: "墨水", onset: "i", rest: "nk", letter: "i", img: IMG + "ink.jpg" },
    igloo: { id: "igloo", en: "igloo", zh: "冰屋", onset: "i", rest: "gloo", letter: "i", img: IMG + "igloo.jpg" },
    iguana: { id: "iguana", en: "iguana", zh: "鬣蜥", onset: "i", rest: "guana", letter: "i", img: IMG + "iguana.jpg" },
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", letter: "j", img: IMG + "jet.jpg" },
    jam: { id: "jam", en: "jam", zh: "果酱", onset: "j", rest: "am", letter: "j", img: IMG + "jam.jpg" },
    juice: { id: "juice", en: "juice", zh: "果汁", onset: "j", rest: "uice", letter: "j", img: IMG + "juice.jpg" },
    jacket: { id: "jacket", en: "jacket", zh: "夹克", onset: "j", rest: "acket", letter: "j", img: IMG + "jacket.jpg" },
    kangaroo: { id: "kangaroo", en: "kangaroo", zh: "袋鼠", onset: "k", rest: "angaroo", letter: "k", img: IMG + "kangaroo.jpg" },
    key: { id: "key", en: "key", zh: "钥匙", onset: "k", rest: "ey", letter: "k", img: IMG + "key.jpg" },
    king: { id: "king", en: "king", zh: "国王", onset: "k", rest: "ing", letter: "k", img: IMG + "king.jpg" },
    kite: { id: "kite", en: "kite", zh: "风筝", onset: "k", rest: "ite", letter: "k", img: IMG + "kite.jpg" },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", letter: "l", img: IMG + "lion.jpg" },
    leaf: { id: "leaf", en: "leaf", zh: "树叶", onset: "l", rest: "eaf", letter: "l", img: IMG + "leaf.jpg" },
    leg: { id: "leg", en: "leg", zh: "腿", onset: "l", rest: "eg", letter: "l", img: IMG + "leg.jpg" },
    lamp: { id: "lamp", en: "lamp", zh: "台灯", onset: "l", rest: "amp", letter: "l", img: IMG + "lamp.jpg" },
    log: { id: "log", en: "log", zh: "原木", onset: "l", rest: "og", letter: "l", img: IMG + "log.jpg" },
    cow: { id: "cow", en: "cow", zh: "奶牛", onset: "c", rest: "ow", letter: "e", img: IMG + "cow.jpg" },
    nest: { id: "nest", en: "nest", zh: "鸟巢", onset: "n", rest: "est", letter: "b", img: IMG + "nest.jpg" },
    maple: { id: "maple", en: "maple", zh: "枫叶", onset: "m", rest: "aple", letter: "a", img: IMG + "maple.jpg" }
  };

  var LETTER_OPTS = ["g", "h", "i", "j", "k", "l"];

  global.GHIJKL_REVIEW = {
    unit: "Review 2",
    pages: "Student's Book p.40–43",
    workbookPages: "Workbook p.19–21",
    letters: ["Gg", "Hh", "Ii", "Jj", "Kk", "Ll"],
    letterOpts: LETTER_OPTS,
    hero: IMG + "hero-ghijkl.jpg",
    song: IMG + "song-party.jpg",
    tracks: {
      song: AUD + "track58.mp3"
    },
    words: WORDS,
    listenCircleC: [
      { id: "cow", answer: null },
      { id: "nest", answer: null },
      { id: "jet", answer: "j" },
      { id: "gift", answer: "g" },
      { id: "maple", answer: null },
      { id: "hit", answer: "h" },
      { id: "insect", answer: "i" },
      { id: "kite", answer: "k" },
      { id: "lamp", answer: "l" },
      { id: "log", answer: "l" },
      { id: "leg", answer: "l" },
      { id: "king", answer: "k" },
      { id: "gorilla", answer: "g", sample: true }
    ],
    listenCircleD: [
      { id: "cow", letters: "Ee" },
      { id: "nest", letters: "Bb" },
      { id: "jet", letters: "Jj" },
      { id: "gift", letters: "Gg" },
      { id: "maple", letters: "Aa" },
      { id: "hit", letters: "Hh" },
      { id: "insect", letters: "Ii" },
      { id: "kite", letters: "Kk" },
      { id: "lamp", letters: "Ll" },
      { id: "log", letters: "Ll" },
      { id: "leg", letters: "Ll" },
      { id: "king", letters: "Kk" }
    ],
    wbTraceCaps: [
      { cap: "G", small: "g", sample: true },
      { cap: "H", small: "h", sample: false },
      { cap: "I", small: "i", sample: false },
      { cap: "J", small: "j", sample: false },
      { cap: "K", small: "k", sample: false }
    ],
    wbBeginningSound: [
      { id: "cow", answer: null },
      { id: "nest", answer: null },
      { id: "jet", answer: "j" },
      { id: "gift", answer: "g" },
      { id: "maple", answer: null },
      { id: "hit", answer: "h" },
      { id: "insect", answer: "i" },
      { id: "kite", answer: "k" },
      { id: "lamp", answer: "l" },
      { id: "log", answer: "l" },
      { id: "leg", answer: "l" },
      { id: "king", answer: "k" },
      { id: "gorilla", answer: "g", sample: true }
    ],
    wbTraceLl: {
      caps: ["L", "L", "L", "L"],
      pics: ["leg", "leaf", "lamp", "lion"],
      lowers: ["l", "l", "l", "l"]
    },
    games: [
      { id: 1, title: "听音圈字母", short: "g–l", desc: "听单词，圈 g h i j k l" },
      { id: 2, title: "听音写字母对", short: "听写", desc: "听单词，选 Ee–Ll 字母对" },
      { id: 3, title: "练习册圈音", short: "WB B", desc: "13 张图圈开头字母" },
      { id: 4, title: "描红连线", short: "WB C", desc: "描 L/l 并连线四图" }
    ]
  };
})(window);
