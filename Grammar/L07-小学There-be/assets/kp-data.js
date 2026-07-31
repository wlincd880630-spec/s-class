(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 购物中心",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "There are so many people in the shopping centre.",
    "soundHint": "这句话在描述什么？人在哪里？",
    "question": "这是在说「某地有某物/某人」吗？",
    "sentence": "There are so many people in the shopping centre.",
    "zh": "购物中心里有这么多人。",
    "image": "l07-shopping-crowd.jpg",
    "source": "PSLE Set 01 · 完形"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · is 还是 are？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l07-shopping-crowd.jpg",
    "question": "为什么 people 前面用 are 而不是 is？",
    "choices": [
      {
        "text": "因为 people 是复数意义",
        "correct": true,
        "fb": "对了！people 表「人们」，谓语用 are。"
      },
      {
        "text": "因为 shopping centre 是复数",
        "correct": false,
        "fb": "shopping centre 是单数，但 there be 看后面紧跟的名词。"
      },
      {
        "text": "因为 many 后面永远用 are",
        "correct": false,
        "fb": "关键看 many people 是复数。"
      }
    ],
    "sentence": "There are so many people in the shopping centre.",
    "zh": "购物中心里有这么多人。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现 · There is vs There are",
    "type": "discover",
    "lead": "点击卡片听例句，发现 is 和 are 怎么选。",
    "leftImage": "l07-one-book.jpg",
    "rightImage": "l07-two-books.jpg",
    "leftLabel": "There is（单数/不可数）",
    "rightLabel": "There are（复数）",
    "leftSentence": "There is a book on the desk.",
    "leftZh": "桌上有一本书。",
    "rightSentence": "There are two books on the desk.",
    "rightZh": "桌上有两本书。",
    "morphBase": "is",
    "morphPast": "are",
    "morphHighlight": "are",
    "discovery": "There be 看后面名词：单数/不可数用 is；复数用 are。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "配对 · is 还是 are？",
    "type": "be-match",
    "badge": "demo",
    "badgeText": "🔗 配对",
    "image": "l07-be-chart.jpg",
    "chart": [
      {
        "subjects": "a book / some milk / a cat",
        "be": "There is"
      },
      {
        "subjects": "two books / many people / three dogs",
        "be": "There are"
      }
    ],
    "beOpts": [
      "There is",
      "There are"
    ],
    "drill": [
      {
        "sentence": "_____ a new library near our school.",
        "answer": "There is",
        "zh": "我们学校附近有一座新图书馆。"
      },
      {
        "sentence": "_____ so many people in the mall.",
        "answer": "There are",
        "zh": "商场里有这么多人。"
      },
      {
        "sentence": "_____ some milk in the fridge.",
        "answer": "There is",
        "zh": "冰箱里有一些牛奶。"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡 · There be 句型",
    "type": "spelling",
    "image": "l07-rules.jpg",
    "lead": "描述存在：There + be + 名词 + 地点。",
    "rules": [
      {
        "tab": "肯定句",
        "rule": "There is + 单数/不可数；There are + 复数",
        "focusVerb": "There are",
        "examples": [
          {
            "from": "a cat",
            "to": "There is a cat"
          },
          {
            "from": "three cats",
            "to": "There are three cats"
          }
        ],
        "sample": "There are two books on the desk.",
        "sampleZh": "桌上有两本书。"
      },
      {
        "tab": "否定/疑问",
        "rule": "There isn't / There aren't；Is there…? Are there…?",
        "focusVerb": "There isn't",
        "examples": [
          {
            "from": "肯定",
            "to": "There is some water"
          },
          {
            "from": "否定",
            "to": "There isn't any water"
          }
        ],
        "sample": "There isn't any water in the bottle.",
        "sampleZh": "瓶子里没有水。"
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
    "image": "l07-shopping-crowd.jpg",
    "q": "There _____ so many people in the shopping centre.",
    "opts": [
      "is",
      "are",
      "be"
    ],
    "ans": 1,
    "hint": "many people 是复数，用 There are。",
    "sentence": "There are so many people in the shopping centre.",
    "zh": "购物中心里有这么多人。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · There be 句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l07-library.jpg",
    "audio": "There is a new library near our school.",
    "tokens": [
      "There",
      "is",
      "a",
      "new",
      "library",
      "near",
      "our",
      "school"
    ],
    "sentence": "There is a new library near our school.",
    "zh": "我们学校附近有一座新图书馆。"
  },
  {
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · There be 口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "l07-writing.jpg",
    "checklist": [
      "描述存在：There is/are + 名词 + 地点状语",
      "单数/不可数 → is；复数 → are",
      "写作：There is a park near my home. There are many trees in it.",
      "否定：There isn't any… / There aren't any…"
    ],
    "chant": "There is, there are — place has something! Singular is, plural are — easy!",
    "chantSpeak": "There is, there are, place has something! Singular is, plural are, easy!"
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