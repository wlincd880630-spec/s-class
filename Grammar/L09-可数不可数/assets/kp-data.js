(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 场景导入",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "How much water do you drink every day?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？",
    "image": "l10-count-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l10-count-hero.jpg",
    "question": "water 为什么用 much 而不是 many？",
    "choices": [
      {
        "text": "water 不可数，用 much",
        "correct": true,
        "fb": "对了！不可数名词用 much/a little。"
      },
      {
        "text": "water 是复数",
        "correct": false,
        "fb": "water 不可数，没有复数形式。"
      },
      {
        "text": "much 只能修饰人",
        "correct": false,
        "fb": "much 修饰不可数名词。"
      }
    ],
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l10-many.jpg",
    "rightImage": "l10-much.jpg",
    "leftLabel": "many books（可数）",
    "rightLabel": "much water（不可数）",
    "leftSentence": "How many books do you have?",
    "leftZh": "你有多少本书？",
    "rightSentence": "How much water do you need?",
    "rightZh": "你需要多少水？",
    "morphBase": "many",
    "morphPast": "much",
    "morphHighlight": "",
    "discovery": "可数：many/few/a few；不可数：much/little/a little。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l10-count-hero.jpg",
    "buckets": [
      {
        "key": "c",
        "label": "可数名词"
      },
      {
        "key": "u",
        "label": "不可数名词"
      }
    ],
    "items": [
      {
        "text": "apple",
        "bucket": "c"
      },
      {
        "text": "water",
        "bucket": "u"
      },
      {
        "text": "rice",
        "bucket": "u"
      },
      {
        "text": "student",
        "bucket": "c"
      },
      {
        "text": "milk",
        "bucket": "u"
      },
      {
        "text": "homework",
        "bucket": "u"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l10-count-hero.jpg",
    "rules": [
      {
        "tab": "可数",
        "rule": "many / a few / few + 可数名词复数",
        "focusVerb": "many",
        "examples": [
          {
            "from": "book",
            "to": "many books"
          },
          {
            "from": "few",
            "to": "a few apples"
          }
        ],
        "sample": "How many students are there in your class?",
        "sampleZh": "你们班有多少学生？"
      },
      {
        "tab": "不可数",
        "rule": "much / a little / little + 不可数名词",
        "focusVerb": "much",
        "examples": [
          {
            "from": "water",
            "to": "much water"
          },
          {
            "from": "milk",
            "to": "a little milk"
          }
        ],
        "sample": "How much water do you drink every day?",
        "sampleZh": "你每天喝多少水？"
      }
    ]
  },
  {
    "id": "p06",
    "section": "闯关",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l10-count-hero.jpg",
    "q": "There isn't _____ milk in the fridge.",
    "opts": [
      "many",
      "much",
      "few"
    ],
    "ans": 1,
    "hint": "milk 不可数，用 much。",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l10-count-hero.jpg",
    "audio": "I don't have much homework today.",
    "tokens": [
      "I",
      "don't",
      "have",
      "much",
      "homework",
      "today"
    ],
    "sentence": "I don't have much homework today.",
    "zh": "我今天作业不多。"
  },
  {
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · 口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "writing.jpg",
    "checklist": [
      "可数：many/few/a few + 复数",
      "不可数：much/little/a little + 原形",
      "计量：a bottle of water, two cups of tea"
    ],
    "chant": "Many for count, much for mass! Water, rice — uncountable class!",
    "chantSpeak": "Many for count, much for mass! Water, rice, uncountable class!"
  }
];
  global.KpData = {
    pages: PAGES,
    total: PAGES.length,
    indexOf: function (id) {
      for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return i;
      return -1;
    },
    byId: function (id) {
      var i = this.indexOf(id);
      return i >= 0 ? PAGES[i] : null;
    },
  };
})(typeof window !== "undefined" ? window : null);