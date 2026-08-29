/**
 * Oxford Phonics World 式 26 字母页
 * 每字母：口诀图 + 4 个首音词 + 歌谣顺序 + 听辨打叉
 */
(function (global) {
  "use strict";

  function L(cfg) {
    cfg.chant = cfg.chant || cfg.words.slice();
    cfg.mark = cfg.mark || [];
    return cfg;
  }

  var letters = [
    L({
      id: "a",
      letters: "Aa",
      sound: "/æ/",
      mnemonic: "angry apple",
      mnemonicZh: "生气的苹果",
      img: "apple",
      tip: "嘴巴横开。教师示范 /æ/。",
      words: ["apple", "ax", "ant", "alligator"],
      chant: ["ant", "apple", "alligator", "ax"]
    }),
    L({
      id: "b",
      letters: "Bb",
      sound: "/b/",
      mnemonic: "bouncing ball",
      mnemonicZh: "弹跳的球",
      img: "ball",
      tip: "双唇炸开。教师示范 /b/。",
      words: ["ball", "book", "boy", "bed"]
    }),
    L({
      id: "c",
      letters: "Cc",
      sound: "/k/",
      mnemonic: "curly cat",
      mnemonicZh: "卷尾巴的猫",
      img: "cat",
      tip: "c 在 a/o/u 前发 /k/。教师示范。",
      words: ["cat", "cup", "car", "cake"]
    }),
    L({
      id: "d",
      letters: "Dd",
      sound: "/d/",
      mnemonic: "digging dog",
      mnemonicZh: "会挖洞的狗",
      img: "dog",
      tip: "舌尖轻点。教师示范 /d/。",
      words: ["dog", "duck", "door", "desk"]
    }),
    L({
      id: "e",
      letters: "Ee",
      sound: "/e/",
      mnemonic: "energetic egg",
      mnemonicZh: "活力鸡蛋",
      img: "egg",
      tip: "嘴巴半开。教师示范 /e/。",
      words: ["egg", "elephant", "red", "bed"]
    }),
    L({
      id: "f",
      letters: "Ff",
      sound: "/f/",
      mnemonic: "funny fish",
      mnemonicZh: "好笑的鱼",
      img: "fish",
      tip: "咬唇出气。教师示范 /f/。",
      words: ["fish", "fan", "frog", "fork"]
    }),
    L({
      id: "g",
      letters: "Gg",
      sound: "/g/",
      mnemonic: "giggling girl",
      mnemonicZh: "爱笑的女孩",
      img: "girl",
      tip: "本课只教硬音 /g/。教师示范。",
      words: ["girl", "goat", "grapes", "guitar"]
    }),
    L({
      id: "h",
      letters: "Hh",
      sound: "/h/",
      mnemonic: "happy hat",
      mnemonicZh: "开心的帽子",
      img: "hat",
      tip: "呵一口气。教师示范 /h/。",
      words: ["hat", "hand", "house", "horse"]
    }),
    L({
      id: "i",
      letters: "Ii",
      sound: "/ɪ/",
      mnemonic: "itchy insect",
      mnemonicZh: "痒痒的昆虫",
      img: "insect",
      tip: "短促扁唇。教师示范 /ɪ/。",
      words: ["insect", "igloo", "ink", "pig"]
    }),
    L({
      id: "j",
      letters: "Jj",
      sound: "/dʒ/",
      mnemonic: "jumping jam",
      mnemonicZh: "会跳的果酱",
      img: "jam",
      tip: "破擦音，短促。教师示范 /dʒ/。",
      words: ["jam", "juice", "jet", "jump"]
    }),
    L({
      id: "k",
      letters: "Kk",
      sound: "/k/",
      mnemonic: "kicking kite",
      mnemonicZh: "会踢的风筝",
      img: "kite",
      tip: "和硬 c 同音。教师示范 /k/。",
      words: ["kite", "key", "king", "kangaroo"]
    }),
    L({
      id: "l",
      letters: "Ll",
      sound: "/l/",
      mnemonic: "laughing lion",
      mnemonicZh: "爱笑的狮子",
      img: "lion",
      tip: "舌尖抵龈，可拉长。教师示范。",
      words: ["lion", "leaf", "lamp", "lemon"]
    }),
    L({
      id: "m",
      letters: "Mm",
      sound: "/m/",
      mnemonic: "munching monkey",
      mnemonicZh: "吃香蕉的猴子",
      img: "monkey",
      tip: "闭唇可拉长。教师示范 /m/。",
      words: ["monkey", "milk", "moon", "man"]
    }),
    L({
      id: "n",
      letters: "Nn",
      sound: "/n/",
      mnemonic: "nodding nest",
      mnemonicZh: "点头的鸟巢",
      img: "nest",
      tip: "舌尖抵龈，鼻子出气。教师示范。",
      words: ["nest", "nose", "nine", "net"]
    }),
    L({
      id: "o",
      letters: "Oo",
      sound: "/ɒ/",
      mnemonic: "odd octopus",
      mnemonicZh: "奇怪的章鱼",
      img: "octopus",
      tip: "圆唇短音。教师示范 /ɒ/。",
      words: ["orange", "octopus", "ox", "hot"]
    }),
    L({
      id: "p",
      letters: "Pp",
      sound: "/p/",
      mnemonic: "pink pig",
      mnemonicZh: "粉色小猪",
      img: "pig",
      tip: "双唇炸开，不振动。教师示范。",
      words: ["pig", "pen", "pan", "pink"]
    }),
    L({
      id: "q",
      letters: "Qq",
      sound: "/kw/",
      mnemonic: "quiet queen",
      mnemonicZh: "安静的女王",
      img: "queen",
      tip: "q 总是带 u，合读 /kw/。教师示范。",
      words: ["queen", "quilt", "question", "quiet"]
    }),
    L({
      id: "r",
      letters: "Rr",
      sound: "/r/",
      mnemonic: "running rabbit",
      mnemonicZh: "奔跑的兔子",
      img: "rabbit",
      tip: "舌尖卷起不碰牙。教师示范。",
      words: ["rabbit", "rain", "red", "run"]
    }),
    L({
      id: "s",
      letters: "Ss",
      sound: "/s/",
      mnemonic: "singing sun",
      mnemonicZh: "会唱歌的太阳",
      img: "sun",
      tip: "牙齿轻靠，像小蛇。教师示范。",
      words: ["sun", "sock", "sofa", "sandwich"]
    }),
    L({
      id: "t",
      letters: "Tt",
      sound: "/t/",
      mnemonic: "ticking tap",
      mnemonicZh: "滴答的水龙头",
      img: "tap",
      tip: "舌尖点上牙龈，截断。教师示范。",
      words: ["tap", "ten", "tiger", "table"]
    }),
    L({
      id: "u",
      letters: "Uu",
      sound: "/ʌ/",
      mnemonic: "up umbrella",
      mnemonicZh: "向上的伞",
      img: "umbrella",
      tip: "扁唇放松。教师示范 /ʌ/。",
      words: ["umbrella", "up", "under", "bus"]
    }),
    L({
      id: "v",
      letters: "Vv",
      sound: "/v/",
      mnemonic: "vanishing van",
      mnemonicZh: "开走的货车",
      img: "van",
      tip: "咬唇要振动。教师示范 /v/。",
      words: ["van", "vase", "violin", "vest"]
    }),
    L({
      id: "w",
      letters: "Ww",
      sound: "/w/",
      mnemonic: "wiggly whale",
      mnemonicZh: "摇摆的鲸鱼",
      img: "whale",
      tip: "圆唇滑向后面的音。教师示范。",
      words: ["whale", "window", "web", "water"]
    }),
    L({
      id: "x",
      letters: "Xx",
      sound: "/ks/",
      mnemonic: "box of fox",
      mnemonicZh: "盒子和狐狸",
      img: "box",
      tip: "多在词尾，两个音 /ks/。教师示范。",
      words: ["box", "fox", "six", "ax"]
    }),
    L({
      id: "y",
      letters: "Yy",
      sound: "/j/",
      mnemonic: "yellow yo-yo",
      mnemonicZh: "黄色悠悠球",
      img: "yoyo",
      tip: "词首 /j/。教师示范。",
      words: ["yoyo", "yellow", "yes", "yogurt"]
    }),
    L({
      id: "z",
      letters: "Zz",
      sound: "/z/",
      mnemonic: "zipping zebra",
      mnemonicZh: "拉拉链的斑马",
      img: "zebra",
      tip: "带声的 s。教师示范 /z/。",
      words: ["zebra", "zoo", "zip", "zero"]
    })
  ];

  var map = {};
  letters.forEach(function (item) {
    map[item.id] = item;
  });

  letters.forEach(function (item) {
    var hits = item.words.map(function (w) {
      return { word: w, hit: true };
    });
    var foil = item.id === "a" ? "sun" : "apple";
    var foil2 = item.id === "s" ? "cat" : "sun";
    item.mark = [hits[0], { word: foil, hit: false }, hits[1], { word: foil2, hit: false }, hits[2], hits[3]];
  });

  function listFor(ids) {
    return (ids || []).map(function (id) {
      return map[id];
    }).filter(Boolean);
  }

  function allWordIds(ids) {
    var out = [];
    listFor(ids).forEach(function (p) {
      (p.words || []).forEach(function (w) {
        if (out.indexOf(w) === -1) out.push(w);
      });
    });
    return out;
  }

  global.PHONICS_LETTERS = letters;
  global.PHONICS_LETTER_MAP = map;
  global.phonicsLetters = listFor;
  global.phonicsLetterVocabIds = allWordIds;
})(typeof window !== "undefined" ? window : this);
