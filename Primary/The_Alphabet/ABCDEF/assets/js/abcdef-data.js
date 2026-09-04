/**
 * Review 1 · Aa Bb Cc Dd Ee Ff
 * 教材 Student's Book p.20–23 + Workbook p.10–11
 * Song 音频保留教材 MP3（track29-song）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  function w(id, en, zh, onset, rest, letter) {
    return { id: id, en: en, zh: zh, onset: onset, rest: rest, letter: letter, img: IMG + id + ".jpg" };
  }

  var WORDS = {
    alligator: w("alligator", "alligator", "短吻鳄", "a", "lligator", "a"),
    ant: w("ant", "ant", "蚂蚁", "a", "nt", "a"),
    apple: w("apple", "apple", "苹果", "a", "pple", "a"),
    axe: w("axe", "axe", "斧头", "a", "xe", "a"),
    arm: w("arm", "arm", "手臂", "a", "rm", "a"),
    bear: w("bear", "bear", "熊", "b", "ear", "b"),
    bed: w("bed", "bed", "床", "b", "ed", "b"),
    bird: w("bird", "bird", "鸟", "b", "ird", "b"),
    banana: w("banana", "banana", "香蕉", "b", "anana", "b"),
    car: w("car", "car", "小汽车", "c", "ar", "c"),
    cat: w("cat", "cat", "猫", "c", "at", "c"),
    cup: w("cup", "cup", "杯子", "c", "up", "c"),
    computer: w("computer", "computer", "电脑", "c", "omputer", "c"),
    dog: w("dog", "dog", "狗", "d", "og", "d"),
    desk: w("desk", "desk", "书桌", "d", "esk", "d"),
    doll: w("doll", "doll", "玩偶", "d", "oll", "d"),
    duck: w("duck", "duck", "鸭子", "d", "uck", "d"),
    egg: w("egg", "egg", "鸡蛋", "e", "gg", "e"),
    elbow: w("elbow", "elbow", "手肘", "e", "lbow", "e"),
    envelope: w("envelope", "envelope", "信封", "e", "nvelope", "e"),
    elephant: w("elephant", "elephant", "大象", "e", "lephant", "e"),
    fish: w("fish", "fish", "鱼", "f", "ish", "f"),
    fan: w("fan", "fan", "扇子", "f", "an", "f"),
    farm: w("farm", "farm", "农场", "f", "arm", "f"),
    fork: w("fork", "fork", "叉子", "f", "ork", "f")
  };

  global.ABCDEF_REVIEW = {
    unit: "Review 1",
    pages: "Student's Book p.20–23",
    workbookPages: "Workbook p.10–11",
    letters: ["Aa", "Bb", "Cc", "Dd", "Ee", "Ff"],
    hero: IMG + "hero-abcdef.jpg",
    tracks: {
      song: AUD + "track29-song.mp3"
    },
    words: WORDS,
    listenWriteRows: [
      { pics: ["cat", "egg", "ant"], answer: "ant", letters: "Aa", sample: true },
      { pics: ["bed", "fan", "dog"], answer: "dog", letters: "Bb" },
      { pics: ["elephant", "apple", "fork"], answer: "fork", letters: "Ff" },
      { pics: ["envelope", "bear", "cup"], answer: "envelope", letters: "Ee" },
      { pics: ["desk", "car", "duck"], answer: "desk", letters: "Dd" },
      { pics: ["banana", "farm", "alligator"], answer: "farm", letters: "Ff" }
    ],
    sameSoundFaces: [
      { pic: "car", pair: ["car", "cat"], same: true, sample: true },
      { pic: "egg", pair: ["egg", "elbow"], same: true },
      { pic: "fork", pair: ["fork", "fish"], same: true },
      { pic: "ant", pair: ["ant", "apple"], same: true },
      { pic: "banana", pair: ["banana", "bear"], same: true },
      { pic: "duck", pair: ["duck", "dog"], same: true }
    ],
    matchSay: [
      { cap: "C", pics: ["cat", "computer"], small: "c", sample: true },
      { cap: "F", pics: ["fish", "fan"], small: "f" },
      { cap: "B", pics: ["bird", "bear"], small: "b" },
      { cap: "D", pics: ["doll", "dog"], small: "d" },
      { cap: "A", pics: ["axe", "apple"], small: "a" },
      { cap: "E", pics: ["elbow", "envelope"], small: "e" }
    ],
    boardPath: [
      "dog", "fan", "cat", "cup", "ant", "envelope", "bed", "computer",
      "fork", "apple", "elbow", "bird", "farm", "banana", "doll", "car",
      "desk", "axe", "fish", "egg", "bear", "duck", "elephant", "alligator"
    ],
    wbCircleSound: [
      { pic: "alligator", choices: ["a", "b", "c"], answer: "a" },
      { pic: "car", choices: ["b", "c", "d"], answer: "c" },
      { pic: "egg", choices: ["c", "d", "e"], answer: "e" },
      { pic: "dog", choices: ["d", "e", "f"], answer: "d" },
      { pic: "bear", choices: ["a", "b", "c"], answer: "b" },
      { pic: "farm", choices: ["d", "e", "f"], answer: "f" },
      { pic: "envelope", choices: ["c", "d", "e"], answer: "e" },
      { pic: "desk", choices: ["d", "e", "f"], answer: "d" },
      { pic: "bed", choices: ["a", "b", "c"], answer: "b" }
    ],
    wbMatch: [
      { cap: "A", pic: "arm", small: "a", sampleCap: true },
      { cap: "B", pic: "banana", small: "b" },
      { cap: "C", pic: "cup", small: "c" },
      { cap: "D", pic: "doll", small: "d" },
      { cap: "E", pic: "envelope", small: "e" },
      { cap: "F", pic: "fork", small: "f", sampleSmall: true }
    ],
    wbConnect: [
      { letter: "A", pic: "ant" },
      { letter: "B", pic: "bird" },
      { letter: "C", pic: "cat" },
      { letter: "D", pic: "duck" },
      { letter: "E", pic: "elephant" },
      { letter: "F", pic: "fish" }
    ],
    symbolKey: [
      { sym: "●", letter: "A" }, { sym: "▮", letter: "a" },
      { sym: "■", letter: "B" }, { sym: "▮", letter: "b", wide: true },
      { sym: "♥", letter: "C" }, { sym: "♣", letter: "c" },
      { sym: "▶", letter: "D" }, { sym: "💧", letter: "d" },
      { sym: "★", letter: "E" }, { sym: "↑", letter: "e" },
      { sym: "♦", letter: "F" }, { sym: "⬢", letter: "f" }
    ],
    symbolWrite: [
      { sym: "♥", letter: "C", sample: true },
      { sym: "▶", letter: "D" },
      { sym: "♦", letter: "F" },
      { sym: "▮", letter: "a", wide: true },
      { sym: "💧", letter: "d" },
      { sym: "♣", letter: "c" },
      { sym: "▶", letter: "D" },
      { sym: "■", letter: "B" },
      { sym: "↑", letter: "e" },
      { sym: "⬢", letter: "f" },
      { sym: "★", letter: "E" },
      { sym: "●", letter: "A" }
    ],
    games: [
      { id: 1, title: "听音圈写", short: "圈写", desc: "听单词，圈图并写字母" },
      { id: 2, title: "相同开头音", short: "笑脸", desc: "两个词开头音一样吗？" },
      { id: 3, title: "连线说一说", short: "连线", desc: "大写 · 图 · 小写 三连" },
      { id: 4, title: "字母大富翁", short: "游戏", desc: "转字母，走到对应图" },
      { id: 5, title: "圈开头音", short: "abc", desc: "练习册：点图圈 a–f" },
      { id: 6, title: "符号解码", short: "符号", desc: "看符号写出 Aa–Ff" }
    ]
  };
})(window);
