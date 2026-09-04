/**
 * Unit 2 Review · Dd Ee Ff
 * 教材 Student's Book p.18–19 + Workbook p.9
 * Story 音频保留教材 MP3（track28-story）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    dog: { id: "dog", en: "dog", zh: "狗", onset: "d", rest: "og", letter: "d", img: IMG + "dog.jpg" },
    desk: { id: "desk", en: "desk", zh: "书桌", onset: "d", rest: "esk", letter: "d", img: IMG + "desk.jpg" },
    doll: { id: "doll", en: "doll", zh: "玩偶", onset: "d", rest: "oll", letter: "d", img: IMG + "doll.jpg" },
    duck: { id: "duck", en: "duck", zh: "鸭子", onset: "d", rest: "uck", letter: "d", img: IMG + "duck.jpg" },
    egg: { id: "egg", en: "egg", zh: "鸡蛋", onset: "e", rest: "gg", letter: "e", img: IMG + "egg.jpg" },
    elbow: { id: "elbow", en: "elbow", zh: "手肘", onset: "e", rest: "lbow", letter: "e", img: IMG + "elbow.jpg" },
    envelope: { id: "envelope", en: "envelope", zh: "信封", onset: "e", rest: "nvelope", letter: "e", img: IMG + "envelope.jpg" },
    elephant: { id: "elephant", en: "elephant", zh: "大象", onset: "e", rest: "lephant", letter: "e", img: IMG + "elephant.jpg" },
    fish: { id: "fish", en: "fish", zh: "鱼", onset: "f", rest: "ish", letter: "f", img: IMG + "fish.jpg" },
    fan: { id: "fan", en: "fan", zh: "扇子", onset: "f", rest: "an", letter: "f", img: IMG + "fan.jpg" },
    farm: { id: "farm", en: "farm", zh: "农场", onset: "f", rest: "arm", letter: "f", img: IMG + "farm.jpg" },
    fork: { id: "fork", en: "fork", zh: "叉子", onset: "f", rest: "ork", letter: "f", img: IMG + "fork.jpg" }
  };

  global.DEF_REVIEW = {
    unit: "Unit 2 Review",
    pages: "Student's Book p.18–19",
    workbookPages: "Workbook p.9",
    letters: ["Dd", "Ee", "Ff"],
    hero: IMG + "hero-def.jpg",
    story: IMG + "story-comic.jpg",
    sightWords: ["I", "see", "have"],
    tracks: {
      story: AUD + "track28-story.mp3"
    },
    words: WORDS,
    sameSoundBoxes: [
      { tone: "blue", pics: ["farm", "egg", "desk", "dog"], answer: ["desk", "dog"] },
      { tone: "orange", pics: ["fork", "duck", "elephant", "fan"], answer: ["fork", "fan"] },
      { tone: "yellow", pics: ["doll", "envelope", "fish", "elbow"], answer: ["envelope", "elbow"] }
    ],
    listenCircle: [
      { pic: "farm", cap: "F", small: "f", sample: false },
      { pic: "duck", cap: "D", small: "d", sample: false },
      { pic: "elephant", cap: "E", small: "e", sample: true }
    ],
    writeItems: [
      { id: "elbow", modeled: true, letters: "Ee" },
      { id: "dog", modeled: false, letters: "Dd" },
      { id: "farm", modeled: false, letters: "Ff" },
      { id: "egg", modeled: false, letters: "Ee" }
    ],
    wbSoundCheck: [
      { letter: "Dd", pics: ["egg", "duck"], answers: [false, true], sample: [false, true] },
      { letter: "Ee", pics: ["elephant", "fork"], answers: [true, false] },
      { letter: "Ff", pics: ["farm", "doll"], answers: [true, false] },
      { letter: "Ee", pics: ["dog", "elbow"], answers: [false, true] },
      { letter: "Ff", pics: ["duck", "fish"], answers: [false, true] },
      { letter: "Dd", pics: ["desk", "fan"], answers: [true, false] },
      { letter: "Ff", pics: ["fork", "elephant"], answers: [true, false] },
      { letter: "Dd", pics: ["fish", "doll"], answers: [false, true] },
      { letter: "Ee", pics: ["farm", "envelope"], answers: [false, true] }
    ],
    wbShapeWrite: [
      { pic: "fork", shape: "triangle", letters: "Ff", modeled: true },
      { pic: "elbow", shape: "square", letters: "Ee" },
      { pic: "duck", shape: "circle", letters: "Dd" },
      { pic: "egg", shape: "square", letters: "Ee" },
      { pic: "dog", shape: "circle", letters: "Dd" },
      { pic: "fan", shape: "triangle", letters: "Ff" }
    ],
    shapeLegend: { Dd: "circle", Ee: "square", Ff: "triangle" },
    storyPanels: [
      { line: "I see an egg.", focus: "egg" },
      { line: "I have a fan.", focus: "fan" },
      { line: "It is a desk.", focus: "desk" },
      { line: "It is an elephant!", focus: "elephant" }
    ],
    games: [
      { id: 1, title: "相同开头音", short: "圈一对", desc: "找出同一框里开头音相同的两个图" },
      { id: 2, title: "听音圈字母", short: "听音", desc: "听单词，圈出正确的大小写字母" },
      { id: 3, title: "开头音打勾", short: "打勾", desc: "练习册：听音判断 d / e / f 开头" },
      { id: 4, title: "图形描红", short: "图形", desc: "圆 Dd · 方 Ee · 三角 Ff 描红写字" }
    ]
  };
})(window);
