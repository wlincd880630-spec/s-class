/**
 * Unit 1 Review · Aa Bb Cc
 * 教材 Student's Book p.10–11 + Workbook p.5
 * Story 音频保留教材 MP3（track14-story）；其余 Azure TTS。
 */
(function (global) {
  "use strict";

  var IMG = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/ABC/assets/img/";
  var AUD = "assets/audio/";

  var WORDS = {
    apple: { id: "apple", en: "apple", zh: "苹果", onset: "a", rest: "pple", letter: "a", img: IMG + "apple.jpg" },
    axe: { id: "axe", en: "axe", zh: "斧头", onset: "a", rest: "xe", letter: "a", img: IMG + "axe.jpg" },
    ant: { id: "ant", en: "ant", zh: "蚂蚁", onset: "a", rest: "nt", letter: "a", img: IMG + "ant.jpg" },
    alligator: { id: "alligator", en: "alligator", zh: "短吻鳄", onset: "a", rest: "lligator", letter: "a", img: IMG + "alligator.jpg" },
    bear: { id: "bear", en: "bear", zh: "熊", onset: "b", rest: "ear", letter: "b", img: IMG + "bear.jpg" },
    bird: { id: "bird", en: "bird", zh: "鸟", onset: "b", rest: "ird", letter: "b", img: IMG + "bird.jpg" },
    bed: { id: "bed", en: "bed", zh: "床", onset: "b", rest: "ed", letter: "b", img: IMG + "bed.jpg" },
    banana: { id: "banana", en: "banana", zh: "香蕉", onset: "b", rest: "anana", letter: "b", img: IMG + "banana.jpg" },
    cat: { id: "cat", en: "cat", zh: "猫", onset: "c", rest: "at", letter: "c", img: IMG + "cat.jpg" },
    cup: { id: "cup", en: "cup", zh: "杯子", onset: "c", rest: "up", letter: "c", img: IMG + "cup.jpg" },
    computer: { id: "computer", en: "computer", zh: "电脑", onset: "c", rest: "omputer", letter: "c", img: IMG + "computer.jpg" },
    car: { id: "car", en: "car", zh: "小汽车", onset: "c", rest: "ar", letter: "c", img: IMG + "car.jpg" }
  };

  global.ABC_REVIEW = {
    unit: "Unit 1 Review",
    pages: "Student's Book p.10–11",
    workbookPages: "Workbook p.5",
    letters: ["Aa", "Bb", "Cc"],
    hero: IMG + "hero-abc.jpg",
    story: IMG + "story-comic.jpg",
    sightWords: ["an", "a", "it", "is"],
    tracks: {
      story: AUD + "track14-story.mp3"
    },
    words: WORDS,
    sameSoundBoxes: [
      { tone: "blue", pics: ["car", "axe", "bear", "banana"], answer: ["bear", "banana"] },
      { tone: "orange", pics: ["apple", "cup", "cat", "bed"], answer: ["cat", "cup"] },
      { tone: "yellow", pics: ["alligator", "computer", "ant", "bird"], answer: ["alligator", "ant"] }
    ],
    listenCircle: [
      { pic: "bird", cap: "B", small: "b", sample: true },
      { pic: "car", cap: "C", small: "c", sample: false },
      { pic: "apple", cap: "A", small: "a", sample: false }
    ],
    writeItems: [
      { id: "cat", modeled: true, letters: "Cc" },
      { id: "bed", modeled: false, letters: "Bb" },
      { id: "ant", modeled: false, letters: "Aa" },
      { id: "cup", modeled: false, letters: "Cc" }
    ],
    wbSoundGrid: [
      "banana", "cat", "alligator",
      "computer", "apple", "bird",
      "bear", "axe", "car"
    ],
    wbSoundSample: { id: "banana", letter: "b" },
    wbTraceMatch: [
      { cap: "A", pic: "ant", small: "a", sample: true },
      { cap: "B", pic: "bed", small: "b", sample: false },
      { cap: "C", pic: "cup", small: "c", sample: false }
    ],
    storyPanels: [
      { line: "An alligator!", focus: "alligator" },
      { line: "A bear!", focus: "bear" },
      { line: "A banana!", focus: "banana" },
      { line: "It is a cat!", focus: "cat" }
    ],
    games: [
      { id: 1, title: "相同开头音", short: "圈一对", desc: "找出同一框里开头音相同的两个图" },
      { id: 2, title: "听音圈字母", short: "听音", desc: "听单词，圈出正确的大小写字母" },
      { id: 3, title: "开头音 abc", short: "abc", desc: "练习册：点图圈 a / b / c" },
      { id: 4, title: "描红连线", short: "连线", desc: "大写字母 · 图 · 小写字母 三连" }
    ]
  };
})(window);
