/**
 * Oxford Phonics World 式字母页
 * 每课 3 个字母；每个字母：记忆口诀 + 4 个首音词 + 听辨题 + 歌谣顺序。
 * 第一课仍是 SAT（系统拼读），Aa 的四个词直接取自 OPW1 Unit 1 p.4–5。
 */
(function (global) {
  "use strict";

  function pack(cfg) {
    return cfg;
  }

  var packs = {
    L01: {
      unit: "Unit 1",
      letters: "Ss Aa Tt",
      blurb: "参照 Oxford Phonics World 1：每个字母先听读口诀，再指读 4 个词，描红，听辨打叉，最后歌谣。三个字母学完再拼 at / sat。",
      packs: [
        pack({
          id: "s",
          letters: "Ss",
          sound: "/s/",
          mnemonic: "singing sun",
          mnemonicZh: "会唱歌的太阳",
          img: "sun",
          tip: "牙齿轻轻靠拢，像小蛇 sss，不要加「呃」。",
          words: ["sun", "sock", "sofa", "sandwich"],
          chant: ["sun", "sock", "sofa", "sandwich"],
          mark: [
            { word: "sun", hit: true },
            { word: "apple", hit: false },
            { word: "sock", hit: true },
            { word: "tap", hit: false },
            { word: "sofa", hit: true },
            { word: "sandwich", hit: true }
          ]
        }),
        pack({
          id: "a",
          letters: "Aa",
          sound: "/æ/",
          mnemonic: "angry apple",
          mnemonicZh: "生气的苹果",
          img: "apple",
          tip: "嘴巴横开、扁平。口诀 angry apple，和教材 Unit 1 同一页。",
          words: ["apple", "ax", "ant", "alligator"],
          chant: ["ant", "apple", "alligator", "ax"],
          mark: [
            { word: "apple", hit: true },
            { word: "sun", hit: false },
            { word: "ant", hit: true },
            { word: "tap", hit: false },
            { word: "ax", hit: true },
            { word: "alligator", hit: true }
          ]
        }),
        pack({
          id: "t",
          letters: "Tt",
          sound: "/t/",
          mnemonic: "ticking tap",
          mnemonicZh: "滴答的水龙头",
          img: "tap",
          tip: "舌尖点上牙龈，气流突然放出。截断，不要读成「特」。",
          words: ["tap", "ten", "tiger", "table"],
          chant: ["tap", "ten", "tiger", "table"],
          mark: [
            { word: "tap", hit: true },
            { word: "sun", hit: false },
            { word: "ten", hit: true },
            { word: "apple", hit: false },
            { word: "tiger", hit: true },
            { word: "table", hit: true }
          ]
        })
      ],
      story: {
        title: "The Ant and the Apple",
        titleZh: "蚂蚁和苹果",
        pages: [
          { img: "sun", en: "Sun.", zh: "太阳。", speak: "Sun." },
          { img: "insect", en: "Ant.", zh: "蚂蚁。", speak: "Ant." },
          { img: "apple", en: "Angry apple.", zh: "生气的苹果。", speak: "Angry apple." },
          { img: "apple", en: "An alligator.", zh: "一条鳄鱼。", speak: "An alligator." },
          { img: "tap", en: "Tap, tap, tap.", zh: "水龙头滴答滴答。", speak: "Tap, tap, tap." },
          { img: "sun", en: "I sat.", zh: "我坐下了。", speak: "I sat." }
        ]
      }
    }
  };

  function forLesson(id) {
    return packs[id] || null;
  }

  function allWordIds(id) {
    var u = packs[id];
    if (!u) return [];
    var out = [];
    u.packs.forEach(function (p) {
      (p.words || []).forEach(function (w) {
        if (out.indexOf(w) === -1) out.push(w);
      });
    });
    return out;
  }

  global.PHONICS_LETTER_PACKS = packs;
  global.phonicsLetterUnit = forLesson;
  global.phonicsLetterVocabIds = allWordIds;
})(typeof window !== "undefined" ? window : this);
