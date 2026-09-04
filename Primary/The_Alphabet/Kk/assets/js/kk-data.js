/**
 * Level 1 The Alphabet · Unit 4 · Letter Kk
 * Chant 保留教材 MP3（track51）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：风筝听写 Kk/✗；练习册 B：圈 k 音图；练习册 C：风筝涂 K/k。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Kk/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    kangaroo: { id: "kangaroo", en: "kangaroo", zh: "袋鼠", onset: "k", rest: "angaroo", img: IMG + "kangaroo.jpg", k: true },
    key: { id: "key", en: "key", zh: "钥匙", onset: "k", rest: "ey", img: IMG + "key.jpg", k: true },
    king: { id: "king", en: "king", zh: "国王", onset: "k", rest: "ing", img: IMG + "king.jpg", k: true },
    kite: { id: "kite", en: "kite", zh: "风筝", onset: "k", rest: "ite", img: IMG + "kite.jpg", k: true },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", k: false },
    jacket: { id: "jacket", en: "jacket", zh: "夹克", onset: "j", rest: "acket", img: IMG + "jacket.jpg", k: false },
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", img: IMG + "jet.jpg", k: false },
    jam: { id: "jam", en: "jam", zh: "果酱", onset: "j", rest: "am", img: IMG + "jam.jpg", k: false },
    gorilla: { id: "gorilla", en: "gorilla", zh: "大猩猩", onset: "g", rest: "orilla", img: IMG + "gorilla.jpg", k: false },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", img: IMG + "goat.jpg", k: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", k: false },
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", img: IMG + "insect.jpg", k: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", k: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", k: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", k: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", k: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", k: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", k: false },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", img: IMG + "elephant.jpg", k: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", k: false },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", img: IMG + "gift.jpg", k: false },
    "kicking-kangaroo": {
      id: "kicking-kangaroo",
      en: "kicking kangaroo",
      zh: "功夫袋鼠",
      onset: "k",
      rest: "icking kangaroo",
      img: IMG + "kicking-kangaroo.jpg",
      k: true,
      phrase: true
    }
  };

  global.KK_LESSON = {
    unit: "Unit 4",
    pages: "Student's Book p.34–35",
    workbookPages: "Workbook Unit 4 Kk p.17",
    letter: "Kk",
    letterCap: "K",
    letterSmall: "k",
    soundIpa: "/k/",
    soundHint: "软腭爆破音 /k/，像 kicking kangaroo 里的 k",
    mascot: {
      id: "kicking-kangaroo",
      phrase: "kicking kangaroo",
      zh: "功夫袋鼠",
      img: IMG + "kicking-kangaroo.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    hero: IMG + "hero-kk.jpg",
    video: "assets/video/letter-k.mp4",
    kiteSky: IMG + "kite-sky.jpg",
    kiteColor: IMG + "kite-color.jpg",
    tracks: {
      chant: AUD + "track51.mp3"
    },
    vocab: [WORDS.kangaroo, WORDS.key, WORDS.king, WORDS.kite],
    kiteListenItems: [
      { num: 1, id: "kangaroo", writeKk: true },
      { num: 2, id: "hat", writeKk: false },
      { num: 3, id: "key", writeKk: true },
      { num: 4, id: "king", writeKk: true },
      { num: 5, id: "kite", writeKk: true },
      { num: 6, id: "jacket", writeKk: false },
      { num: 7, id: "jam", writeKk: false },
      { num: 8, id: "jet", writeKk: false }
    ],
    track05Items: [
      { id: "kangaroo", writeKk: true },
      { id: "key", writeKk: true },
      { id: "hat", writeKk: false },
      { id: "kite", writeKk: true }
    ],
    chantOrder: ["key", "kite", "king", "kangaroo"],
    distractors: [
      WORDS.hat, WORDS.jacket, WORDS.jet, WORDS.jam,
      WORDS.gorilla, WORDS.goat, WORDS.horse, WORDS.insect,
      WORDS.egg, WORDS.fan, WORDS.fish, WORDS.cat
    ],
    words: WORDS,
    workbookCircle: ["kite", "hat", "king", "kangaroo", "jacket", "key"],
    workbookCircleExample: "kite",
    kiteColorLetters: ["E", "F", "j", "J", "h", "L", "G", "k", "K", "k", "K", "k", "h", "K"],
    oddOneOutPrint: [
      ["kangaroo", "key", "hat"],
      ["kite", "egg", "king"],
      ["key", "dog", "kangaroo"],
      ["king", "bear", "kite"]
    ],
    soundHunt: [
      "kangaroo", "apple", "key", "fan",
      "kite", "horse", "king", "goat",
      "key", "cat", "bear", "kicking-kangaroo"
    ],
    copyDefaults: ["kangaroo", "key", "king", "kite"],
    matchWords: ["key", "kangaroo", "kite", "king"],
    choosePicture: [
      { word: "kangaroo", pics: ["fan", "kangaroo", "egg"] },
      { word: "key", pics: ["key", "dog", "bear"] },
      { word: "king", pics: ["king", "cat", "horse"] },
      { word: "kite", pics: ["kite", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "kangaroo", words: ["key", "kangaroo", "fan"] },
      { pic: "key", words: ["key", "egg", "bear"] },
      { pic: "king", words: ["horse", "king", "cat"] },
      { pic: "kite", words: ["kite", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["kangaroo", "key", "king", "kite"],
      grid: [
        "BCDFHKJMQK",
        "DFHJKMQUVE",
        "FHJKMQUVWD",
        "KEYBCDFHJK",
        "JKMQUVWYKN",
        "KMQUVWYZCA",
        "MQUVAWYZKI",
        "QUVWNYZTNG",
        "UVWYTBCDHK",
        "KKITEKANGA"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 k 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 k 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Kk 还是 ✗", short: "Kk / ✗", desc: "听完选 Kk 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
