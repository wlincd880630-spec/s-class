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
    "audio": "We read books in the library after class.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "We read books in the library after class.",
    "zh": "下课后我们在图书馆看书。",
    "image": "w5-v12-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-v12-hero.jpg",
    "question": "library 和 playground 分别是什么地方？",
    "choices": [
      {
        "text": "图书馆 / 操场",
        "correct": true,
        "fb": "对了！library 借书阅读，playground 运动玩耍。"
      },
      {
        "text": "食堂 / 实验室",
        "correct": false,
        "fb": "食堂是 canteen，实验室是 lab。"
      },
      {
        "text": "办公室 / 教室",
        "correct": false,
        "fb": "办公室是 office，教室是 classroom。"
      }
    ],
    "sentence": "We read books in the library after class.",
    "zh": "下课后我们在图书馆看书。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-v12-library.jpg",
    "rightImage": "w5-v12-playground.jpg",
    "leftLabel": "library 图书馆",
    "rightLabel": "playground 操场",
    "leftSentence": "There are many books in the library.",
    "leftZh": "图书馆里有很多书。",
    "rightSentence": "The students are playing on the playground.",
    "rightZh": "学生们在操场上玩。",
    "morphBase": "library",
    "morphPast": "playground",
    "morphHighlight": "",
    "discovery": "library 图书馆；playground 操场；canteen 食堂；lab 实验室；office 办公室。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-v12-hero.jpg",
    "buckets": [
      {
        "key": "study",
        "label": "学习场所"
      },
      {
        "key": "activity",
        "label": "活动/生活场所"
      }
    ],
    "items": [
      {
        "text": "library",
        "bucket": "study"
      },
      {
        "text": "playground",
        "bucket": "activity"
      },
      {
        "text": "classroom",
        "bucket": "study"
      },
      {
        "text": "canteen",
        "bucket": "activity"
      },
      {
        "text": "lab",
        "bucket": "study"
      },
      {
        "text": "office",
        "bucket": "activity"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-v12-hero.jpg",
    "lead": "校园常用场所词汇。",
    "rules": [
      {
        "tab": "学习场所",
        "rule": "library 图书馆；classroom 教室；lab 实验室",
        "focusVerb": "library",
        "examples": [
          {
            "from": "library",
            "to": "借书/阅读"
          },
          {
            "from": "lab",
            "to": "做实验"
          }
        ],
        "sample": "We read books in the library after class.",
        "sampleZh": "下课后我们在图书馆看书。"
      },
      {
        "tab": "活动场所",
        "rule": "playground 操场；canteen 食堂；office 办公室",
        "focusVerb": "playground",
        "examples": [
          {
            "from": "playground",
            "to": "运动/玩耍"
          },
          {
            "from": "canteen",
            "to": "吃饭"
          }
        ],
        "sample": "The students are playing on the playground.",
        "sampleZh": "学生们在操场上玩。"
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
    "image": "w5-v12-hero.jpg",
    "q": "We have lunch in the school _____.",
    "opts": [
      "library",
      "canteen",
      "lab"
    ],
    "ans": 1,
    "hint": "吃午饭在食堂 canteen。",
    "sentence": "We read books in the library after class.",
    "zh": "下课后我们在图书馆看书。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-v12-hero.jpg",
    "audio": "We read books in the library after class.",
    "tokens": [
      "We",
      "read",
      "books",
      "in",
      "the",
      "library",
      "after",
      "class"
    ],
    "sentence": "We read books in the library after class.",
    "zh": "下课后我们在图书馆看书。"
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
      "library 图书馆；playground 操场",
      "canteen 食堂；lab 实验室",
      "in the library / on the playground"
    ],
    "chant": "Library for books, playground for play — school places every day!",
    "chantSpeak": "Library for books, playground for play, school places every day!"
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