/**
 * Level 1 The Alphabet · Unit 4 · Letter Jj
 * Chant 保留教材 MP3（track47）；其余练习走 Azure 英音慢速 TTS。
 * 教材 D：云朵连线；练习册 B：j 音配对书写；练习册 C：J 形迷宫连线。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Jj/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    jet: { id: "jet", en: "jet", zh: "喷气飞机", onset: "j", rest: "et", img: IMG + "jet.jpg", j: true },
    jam: { id: "jam", en: "jam", zh: "果酱", onset: "j", rest: "am", img: IMG + "jam.jpg", j: true },
    juice: { id: "juice", en: "juice", zh: "果汁", onset: "j", rest: "uice", img: IMG + "juice.jpg", j: true },
    jacket: { id: "jacket", en: "jacket", zh: "夹克", onset: "j", rest: "acket", img: IMG + "jacket.jpg", j: true },
    gorilla: { id: "gorilla", en: "gorilla", zh: "大猩猩", onset: "g", rest: "orilla", img: IMG + "gorilla.jpg", j: false },
    "hot-dog": { id: "hot-dog", en: "hot dog", zh: "热狗", onset: "h", rest: "ot dog", img: IMG + "hot-dog.jpg", j: false },
    insect: { id: "insect", en: "insect", zh: "昆虫", onset: "i", rest: "nsect", img: IMG + "insect.jpg", j: false },
    goat: { id: "goat", en: "goat", zh: "山羊", onset: "g", rest: "oat", img: IMG + "goat.jpg", j: false },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", img: IMG + "egg.jpg", j: false },
    computer: { id: "computer", en: "computer", zh: "电脑", onset: "c", rest: "omputer", img: IMG + "computer.jpg", j: false },
    doll: { id: "doll", en: "doll", zh: "玩偶", onset: "d", rest: "oll", img: IMG + "doll.jpg", j: false },
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", img: IMG + "dog.jpg", j: false },
    horse: { id: "horse", en: "horse", zh: "马", onset: "h", rest: "orse", img: IMG + "horse.jpg", j: false },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", img: IMG + "elephant.jpg", j: false },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", img: IMG + "fan.jpg", j: false },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", img: IMG + "fish.jpg", j: false },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", img: IMG + "cat.jpg", j: false },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", img: IMG + "bear.jpg", j: false },
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", img: IMG + "apple.jpg", j: false },
    hat: { id: "hat", en: "hat", zh: "帽子", onset: "h", rest: "at", img: IMG + "hat.jpg", j: false },
    gift: { id: "gift", en: "gift", zh: "礼物", onset: "g", rest: "ift", img: IMG + "gift.jpg", j: false },
    house: { id: "house", en: "house", zh: "房子", onset: "h", rest: "ouse", img: IMG + "house.jpg", j: false },
    "jumbo-jet": {
      id: "jumbo-jet",
      en: "jumbo jet",
      zh: "巨型喷气机",
      onset: "j",
      rest: "umbo jet",
      img: IMG + "jumbo-jet.jpg",
      j: true,
      phrase: true
    }
  };

  global.JJ_LESSON = {
    unit: "Unit 4",
    pages: "Student's Book p.32–33",
    workbookPages: "Workbook Unit 4 Jj p.16",
    letter: "Jj",
    letterCap: "J",
    letterSmall: "j",
    soundIpa: "/dʒ/",
    soundHint: "浊辅音 /dʒ/，像 jumbo jet 里的 j",
    mascot: {
      id: "jumbo-jet",
      phrase: "jumbo jet",
      zh: "巨型喷气机",
      img: IMG + "jumbo-jet.jpg"
    },
    chantCharacter: IMG + "sailor-boy.jpg",
    hero: IMG + "hero-jj.jpg",
    video: "assets/video/letter-j.mp4",
    connectMap: IMG + "sky-connect.jpg",
    jMazeMap: IMG + "j-maze.jpg",
    tracks: {
      chant: AUD + "track47.mp3"
    },
    vocab: [WORDS.jet, WORDS.jam, WORDS.juice, WORDS.jacket],
    track05Items: [
      { id: "jet", writeJj: true },
      { id: "jam", writeJj: true },
      { id: "fan", writeJj: false },
      { id: "juice", writeJj: true }
    ],
    chantOrder: ["juice", "jacket", "jam", "jet"],
    distractors: [
      WORDS.gorilla, WORDS["hot-dog"], WORDS.insect, WORDS.goat,
      WORDS.egg, WORDS.computer, WORDS.doll, WORDS.dog,
      WORDS.horse, WORDS.elephant, WORDS.fan, WORDS.fish
    ],
    words: WORDS,
    wbMatchRows: [
      { pics: ["jet", "gorilla"], answer: "jet" },
      { pics: ["jacket", "hot-dog"], answer: "jacket" },
      { pics: ["insect", "juice"], answer: "juice" },
      { pics: ["jam", "goat"], answer: "jam" }
    ],
    workbookCircle: ["gorilla", "jet", "jacket", "insect", "juice", "jam"],
    workbookCircleExample: "jet",
    oddOneOutPrint: [
      ["jet", "jam", "horse"],
      ["juice", "egg", "jacket"],
      ["jet", "dog", "jam"],
      ["jacket", "bear", "juice"]
    ],
    soundHunt: [
      "jet", "apple", "jam", "fan",
      "juice", "horse", "jacket", "goat",
      "jam", "cat", "bear", "jumbo-jet"
    ],
    copyDefaults: ["jet", "jam", "juice", "jacket"],
    matchWords: ["jam", "jet", "juice", "jacket"],
    choosePicture: [
      { word: "jet", pics: ["fan", "jet", "egg"] },
      { word: "jam", pics: ["jam", "dog", "bear"] },
      { word: "juice", pics: ["juice", "cat", "horse"] },
      { word: "jacket", pics: ["jacket", "fish", "apple"] }
    ],
    chooseWord: [
      { pic: "jet", words: ["jam", "jet", "fan"] },
      { pic: "jam", words: ["jam", "egg", "bear"] },
      { pic: "juice", words: ["horse", "juice", "cat"] },
      { pic: "jacket", words: ["jacket", "dog", "fish"] }
    ],
    wordMaze: {
      size: 10,
      words: ["jet", "jam", "juice", "jacket"],
      grid: [
        "BCDFJKJMQJ",
        "DFIJKMQUVE",
        "FIJKMQUVWD",
        "JAMBCDFHIJ",
        "JKMQUVWYJN",
        "KMQUVWYZCA",
        "MQUVAWYZJU",
        "QUVWNYZICE",
        "UVWYTBCDJK",
        "JJACKETJET"
      ]
    },
    games: [
      { id: 1, title: "开头音小侦探", short: "开头音", desc: "点听单词，再选出 j 开头" },
      { id: 2, title: "听音点图", short: "听音", desc: "听单词，点出图" },
      { id: 3, title: "局外人", short: "局外人", desc: "点听单词，找出不是 j 开头的图" },
      { id: 4, title: "翻牌配对", short: "翻牌", desc: "先记位置，再配对" },
      { id: 5, title: "写 Jj 还是 ✗", short: "Jj / ✗", desc: "听完选 Jj 或打叉" },
      { id: 6, title: "Chant 排队", short: "Chant", desc: "按歌曲顺序排队" },
      { id: 7, title: "填首字母", short: "填字母", desc: "看图听音，填开头字母" }
    ]
  };
})(window);
