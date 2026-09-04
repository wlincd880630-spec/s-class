/**
 * Review 4 · Ss Tt Uu Vv Ww Xx Yy Zz
 * 教材 Student's Book p.88–90 + Workbook p.43–44
 * Song 保留教材 MP3（track104 · Disc 2 Track 63）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/STUVWXYZ/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    seal: { id: "seal", en: "seal", zh: "海豹", onset: "s", rest: "eal", letter: "s", img: IMG + "seal.jpg" },
    sun: { id: "sun", en: "sun", zh: "太阳", onset: "s", rest: "un", letter: "s", img: IMG + "sun.jpg" },
    soap: { id: "soap", en: "soap", zh: "肥皂", onset: "s", rest: "oap", letter: "s", img: IMG + "soap.jpg" },
    six: { id: "six", en: "six", zh: "六", onset: "s", rest: "ix", letter: "s", img: IMG + "six.jpg" },
    sea: { id: "sea", en: "sea", zh: "大海", onset: "s", rest: "ea", letter: "s", img: IMG + "sea.jpg" },
    turtle: { id: "turtle", en: "turtle", zh: "乌龟", onset: "t", rest: "urtle", letter: "t", img: IMG + "turtle.jpg" },
    tent: { id: "tent", en: "tent", zh: "帐篷", onset: "t", rest: "ent", letter: "t", img: IMG + "tent.jpg" },
    tiger: { id: "tiger", en: "tiger", zh: "老虎", onset: "t", rest: "iger", letter: "t", img: IMG + "tiger.jpg" },
    top: { id: "top", en: "top", zh: "陀螺", onset: "t", rest: "op", letter: "t", img: IMG + "top.jpg" },
    taxi: { id: "taxi", en: "taxi", zh: "出租车", onset: "t", rest: "axi", letter: "t", img: IMG + "taxi.jpg" },
    teen: { id: "teen", en: "teen", zh: "少年", onset: "t", rest: "een", letter: "t", img: IMG + "teen.jpg" },
    umbrella: { id: "umbrella", en: "umbrella", zh: "雨伞", onset: "u", rest: "mbrella", letter: "u", img: IMG + "umbrella.jpg" },
    umpire: { id: "umpire", en: "umpire", zh: "裁判", onset: "u", rest: "mpire", letter: "u", img: IMG + "umpire.jpg" },
    up: { id: "up", en: "up", zh: "向上", onset: "u", rest: "p", letter: "u", img: IMG + "up.jpg" },
    van: { id: "van", en: "van", zh: "面包车", onset: "v", rest: "an", letter: "v", img: IMG + "van.jpg" },
    vet: { id: "vet", en: "vet", zh: "兽医", onset: "v", rest: "et", letter: "v", img: IMG + "vet.jpg" },
    violin: { id: "violin", en: "violin", zh: "小提琴", onset: "v", rest: "iolin", letter: "v", img: IMG + "violin.jpg" },
    vest: { id: "vest", en: "vest", zh: "背心", onset: "v", rest: "est", letter: "v", img: IMG + "vest.jpg" },
    wolf: { id: "wolf", en: "wolf", zh: "狼", onset: "w", rest: "olf", letter: "w", img: IMG + "wolf.jpg" },
    web: { id: "web", en: "web", zh: "蜘蛛网", onset: "w", rest: "eb", letter: "w", img: IMG + "web.jpg" },
    water: { id: "water", en: "water", zh: "水", onset: "w", rest: "ater", letter: "w", img: IMG + "water.jpg" },
    watch: { id: "watch", en: "watch", zh: "手表", onset: "w", rest: "atch", letter: "w", img: IMG + "watch.jpg" },
    fox: { id: "fox", en: "fox", zh: "狐狸", onset: "f", rest: "ox", letter: "x", img: IMG + "fox.jpg" },
    box: { id: "box", en: "box", zh: "盒子", onset: "b", rest: "ox", letter: "x", img: IMG + "box.jpg" },
    wax: { id: "wax", en: "wax", zh: "蜡", onset: "w", rest: "ax", letter: "x", img: IMG + "wax.jpg" },
    yoyo: { id: "yoyo", en: "yo-yo", zh: "溜溜球", onset: "y", rest: "o-yo", letter: "y", img: IMG + "yoyo.jpg" },
    yak: { id: "yak", en: "yak", zh: "牦牛", onset: "y", rest: "ak", letter: "y", img: IMG + "yak.jpg" },
    yogurt: { id: "yogurt", en: "yogurt", zh: "酸奶", onset: "y", rest: "ogurt", letter: "y", img: IMG + "yogurt.jpg" },
    yacht: { id: "yacht", en: "yacht", zh: "游艇", onset: "y", rest: "acht", letter: "y", img: IMG + "yacht.jpg" },
    zebra: { id: "zebra", en: "zebra", zh: "斑马", onset: "z", rest: "ebra", letter: "z", img: IMG + "zebra.jpg" },
    zero: { id: "zero", en: "zero", zh: "零", onset: "z", rest: "ero", letter: "z", img: IMG + "zero.jpg" },
    zip: { id: "zip", en: "zip", zh: "拉链", onset: "z", rest: "ip", letter: "z", img: IMG + "zip.jpg" },
    zoo: { id: "zoo", en: "zoo", zh: "动物园", onset: "z", rest: "oo", letter: "z", img: IMG + "zoo.jpg" },
    octopus: { id: "octopus", en: "octopus", zh: "章鱼", onset: "o", rest: "ctopus", letter: "o", img: IMG + "octopus.jpg" },
    jaguar: { id: "jaguar", en: "jaguar", zh: "美洲豹", onset: "j", rest: "aguar", letter: "j", img: IMG + "jaguar.jpg" },
    lion: { id: "lion", en: "lion", zh: "狮子", onset: "l", rest: "ion", letter: "l", img: IMG + "lion.jpg" },
    kangaroo: { id: "kangaroo", en: "kangaroo", zh: "袋鼠", onset: "k", rest: "angaroo", letter: "k", img: IMG + "kangaroo.jpg" },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", letter: "e", img: IMG + "elephant.jpg" },
    monkey: { id: "monkey", en: "monkey", zh: "猴子", onset: "m", rest: "onkey", letter: "m", img: IMG + "monkey.jpg" },
    giraffe: { id: "giraffe", en: "giraffe", zh: "长颈鹿", onset: "g", rest: "iraffe", letter: "g", img: IMG + "giraffe.jpg" },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", letter: "c", img: IMG + "cat.jpg" },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", letter: "h", img: IMG + "horse.jpg" },
    frog: { id: "frog", en: "frog", zh: "青蛙", onset: "f", rest: "rog", letter: "f", img: IMG + "frog.jpg" },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", letter: "b", img: IMG + "banana.jpg" },
    gate: { id: "gate", en: "gate", zh: "大门", onset: "g", rest: "ate", letter: "g", img: IMG + "gate.jpg" },
    lobster: { id: "lobster", en: "lobster", zh: "龙虾", onset: "l", rest: "obster", letter: "l", img: IMG + "lobster.jpg" },
    gun: { id: "gun", en: "gun", zh: "枪", onset: "g", rest: "un", letter: "g", img: IMG + "gun.jpg" },
    lemon: { id: "lemon", en: "lemon", zh: "柠檬", onset: "l", rest: "emon", letter: "l", img: IMG + "lemon.jpg" },
    noodles: { id: "noodles", en: "noodles", zh: "面条", onset: "n", rest: "oodles", letter: "n", img: IMG + "noodles.jpg" },
    puppies: { id: "puppies", en: "puppies", zh: "小狗", onset: "p", rest: "uppies", letter: "p", img: IMG + "puppies.jpg" },
    boots: { id: "boots", en: "boots", zh: "靴子", onset: "b", rest: "oots", letter: "b", img: IMG + "boots.jpg" },
    tops: { id: "tops", en: "tops", zh: "陀螺们", onset: "t", rest: "ops", letter: "t", img: IMG + "tops.jpg" },
    people: { id: "people", en: "people", zh: "人们", onset: "p", rest: "eople", letter: "p", img: IMG + "people.jpg" },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", letter: "g", img: IMG + "gift.jpg" },
    ferris: { id: "ferris", en: "ferris wheel", zh: "摩天轮", onset: "f", rest: "erris wheel", letter: "f", img: IMG + "ferris.jpg" },
    umbrellas: { id: "umbrellas", en: "umbrellas", zh: "雨伞们", onset: "u", rest: "mbrellas", letter: "u", img: IMG + "umbrellas.jpg" },
    "zoo-sign": { id: "zoo-sign", en: "zoo", zh: "动物园", onset: "z", rest: "oo", letter: "z", img: IMG + "zoo-sign.jpg" },
    fountain: { id: "fountain", en: "water fountain", zh: "喷泉", onset: "w", rest: "ater fountain", letter: "w", img: IMG + "fountain.jpg" },
    goodbye: { id: "goodbye", en: "goodbye", zh: "再见", onset: "g", rest: "oodbye", letter: "g", img: IMG + "goodbye.jpg" },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", letter: "a", img: IMG + "apple.jpg" },
    strawberry: { id: "strawberry", en: "strawberry", zh: "草莓", onset: "s", rest: "trawberry", letter: "s", img: IMG + "strawberry.jpg" },
    octagon: { id: "octagon", en: "octagon", zh: "八边形", onset: "o", rest: "ctagon", letter: "o", img: IMG + "octagon.jpg" },
    zipper: { id: "zipper", en: "zipper", zh: "拉链", onset: "z", rest: "ipper", letter: "z", img: IMG + "zipper.jpg" }
  };

  var LETTER_OPTS = ["s", "t", "u", "v", "w", "x", "y", "z"];

  global.STUVWXYZ_REVIEW = {
    unit: "Review 4",
    pages: "Student's Book p.88–90",
    workbookPages: "Workbook p.43–44",
    letters: ["Ss", "Tt", "Uu", "Vv", "Ww", "Xx", "Yy", "Zz"],
    letterOpts: LETTER_OPTS,
    hero: IMG + "hero-stuvwxyz.jpg",
    song: IMG + "song-zoo.jpg",
    gift: IMG + "gift-scene.jpg",
    goodbye: IMG + "goodbye-scene.jpg",
    tracks: {
      song: AUD + "track104.mp3"
    },
    words: WORDS,
    songLetters: [
      { letter: "S", id: "sun", hint: "太阳上的 S" },
      { letter: "T", id: "turtle", hint: "乌龟壳上的 T" },
      { letter: "U", id: "umbrella", hint: "雨伞 U" },
      { letter: "V", id: "violin", hint: "小提琴 V" },
      { letter: "W", id: "fountain", hint: "喷泉 W" },
      { letter: "X", id: "fox", hint: "狐狸 X" },
      { letter: "Y", id: "yak", hint: "牦牛 Y" },
      { letter: "Z", id: "zebra", hint: "斑马 Z" }
    ],
    findAnimals: ["seal", "tiger", "octopus", "jaguar", "lion", "kangaroo", "elephant", "wolf"],
    triviaQuiz: [
      { id: "puppies", question: "How many puppies?", answer: 7 },
      { id: "boots", question: "How many boots?", answer: 8 },
      { id: "tops", question: "How many tops?", answer: 9 },
      { id: "people", question: "How many people?", answer: 6 }
    ],
    giftCans: [
      { id: "giraffe", letter: "Gg" },
      { id: "monkey", letter: "Mm" },
      { id: "cat", letter: "Cc" },
      { id: "horse", letter: "Hh" },
      { id: "frog", letter: "Ff" },
      { id: "lion", letter: "Ll" }
    ],
    wbColorGrid: [
      { splatter: "S", pics: ["seal", "soap"] },
      { splatter: "Z", pics: ["zebra", "zip"] },
      { splatter: "T", pics: ["tiger", "top"] },
      { splatter: "U", pics: ["umbrella", "umpire"] },
      { splatter: "Y", pics: ["yoyo", "yak"] },
      { splatter: "X", pics: ["fox", "box"] },
      { splatter: "W", pics: ["watch", "wolf"] },
      { splatter: "V", pics: ["vest", "van"] },
      { splatter: "S", pics: ["sea", "six"] },
      { splatter: "T", pics: ["taxi", "teen"] },
      { splatter: "U", pics: ["up", "umbrellas"] },
      { splatter: "T", pics: ["tent", "tops"] }
    ],
    wbTracePairs: [
      { letters: "Ss", pic: "seal", sample: true },
      { letters: "Uu", pic: "umpire" },
      { letters: "Yy", pic: "yoyo" },
      { letters: "Zz", pic: "zebra" }
    ],
    wbWriteGrid: [
      { n: 1, id: "zipper", letters: "Zz" },
      { n: 2, id: "soap", letters: "Ss" },
      { n: 3, id: "strawberry", letters: "Ss" },
      { n: 4, id: "taxi", letters: "Tt" },
      { n: 5, id: "yoyo", letters: "Yy" },
      { n: 6, id: "van", letters: "Vv" },
      { n: 7, id: "umbrella", letters: "Uu" },
      { n: 8, id: "watch", letters: "Ww" },
      { n: 9, id: "fox", letters: "Xx" },
      { n: 10, id: "octopus", letters: null },
      { n: 11, id: "tent", letters: "Tt" },
      { n: 12, id: "turtle", letters: "Tt" },
      { n: 13, id: "yogurt", letters: "Yy" },
      { n: 14, id: "zebra", letters: "Zz" },
      { n: 15, id: "zero", letters: "Zz" },
      { n: 16, id: "zip", letters: "Zz" },
      { n: 17, id: "zoo", letters: "Zz" },
      { n: 18, id: "wolf", letters: "Ww" },
      { n: 19, id: "web", letters: "Ww" },
      { n: 20, id: "water", letters: "Ww" },
      { n: 21, id: "violin", letters: "Vv" },
      { n: 22, id: "vest", letters: "Vv" },
      { n: 23, id: "yak", letters: "Yy" },
      { n: 24, id: "yacht", letters: "Yy" }
    ],
    wbListenNumber: [
      { id: "ferris", order: 3 },
      { id: "umbrellas", order: 1 },
      { id: "zoo-sign", order: 2 },
      { id: "tops", order: 4 }
    ],
    games: [
      { id: 1, title: "动物园找字母", short: "Song", desc: "在动物园图里找 S–Z 字母" },
      { id: 2, title: "找动物", short: "找图", desc: "在动物园里找出 8 种动物" },
      { id: 3, title: "数字小测验", short: "数一数", desc: "数一数小狗、靴子、陀螺、人" },
      { id: 4, title: "开头音涂色", short: "涂色", desc: "练习册：S–Z 开头音涂色" }
    ]
  };
})(window);
