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
    "audio": "You should wear a coat. It is cold today.",
    "soundHint": "should 后面动词是什么形式？",
    "question": "这是在给建议吗？",
    "sentence": "You should wear a coat. It is cold today.",
    "zh": "你应该穿外套，今天很冷。",
    "image": "l08-modals-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 情态动词后接什么？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l08-modals-hero.jpg",
    "question": "「You should wear a coat.」中 wear 为什么用原形？",
    "choices": [
      {
        "text": "因为 should 是情态动词，后接动词原形",
        "correct": true,
        "fb": "对了！can/should/must + 动词原形。"
      },
      {
        "text": "因为 coat 是单数",
        "correct": false,
        "fb": "与 coat 无关，关键在 should。"
      },
      {
        "text": "因为是一般过去时",
        "correct": false,
        "fb": "这里没有过去时间标志。"
      }
    ],
    "sentence": "You should wear a coat. It is cold today.",
    "zh": "你应该穿外套，今天很冷。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "lead": "can 表能力，should 表建议，有什么不同？",
    "leftImage": "l08-can.jpg",
    "rightImage": "l08-should.jpg",
    "leftLabel": "can 能力/许可",
    "rightLabel": "should 建议",
    "leftSentence": "I can swim.",
    "leftZh": "我会游泳。",
    "rightSentence": "You should drink more water.",
    "rightZh": "你应该多喝水。",
    "morphBase": "can",
    "morphPast": "should",
    "morphHighlight": "ould",
    "discovery": "情态动词 + 动词原形，不加 to，不加 -s。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 哪个是情态句？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l08-modals-hero.jpg",
    "lead": "哪些句子含 can/should/must？",
    "buckets": [
      {
        "key": "modal",
        "label": "情态动词句"
      },
      {
        "key": "other",
        "label": "非情态句"
      }
    ],
    "items": [
      {
        "text": "She can play the piano.",
        "bucket": "modal"
      },
      {
        "text": "He goes to school.",
        "bucket": "other"
      },
      {
        "text": "We must be quiet in the library.",
        "bucket": "modal"
      },
      {
        "text": "They watched TV.",
        "bucket": "other"
      },
      {
        "text": "You should finish your homework.",
        "bucket": "modal"
      },
      {
        "text": "It rained yesterday.",
        "bucket": "other"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l08-modals-hero.jpg",
    "lead": "小升初常考三种情态动词。",
    "rules": [
      {
        "tab": "can",
        "rule": "can + 原形：能力或请求许可",
        "focusVerb": "can",
        "examples": [
          {
            "from": "swim",
            "to": "can swim"
          },
          {
            "from": "help",
            "to": "Can you help me?"
          }
        ],
        "sample": "I can swim across the pool.",
        "sampleZh": "我能游过泳池。"
      },
      {
        "tab": "should",
        "rule": "should + 原形：建议「应该」",
        "focusVerb": "should",
        "examples": [
          {
            "from": "wear",
            "to": "should wear"
          },
          {
            "from": "study",
            "to": "should study"
          }
        ],
        "sample": "You should wear a coat. It is cold today.",
        "sampleZh": "你应该穿外套，今天很冷。"
      },
      {
        "tab": "must",
        "rule": "must + 原形：必须（语气强）",
        "focusVerb": "must",
        "examples": [
          {
            "from": "be quiet",
            "to": "must be quiet"
          }
        ],
        "sample": "We must be quiet in the library.",
        "sampleZh": "我们在图书馆必须保持安静。"
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
    "image": "l08-modals-hero.jpg",
    "q": "It is raining. You _____ take an umbrella.",
    "opts": [
      "should",
      "shoulds",
      "should to"
    ],
    "ans": 0,
    "hint": "给建议用 should + 动词原形。",
    "sentence": "You should wear a coat. It is cold today.",
    "zh": "你应该穿外套，今天很冷。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l08-modals-hero.jpg",
    "audio": "We must be quiet in the library.",
    "tokens": [
      "We",
      "must",
      "be",
      "quiet",
      "in",
      "the",
      "library"
    ],
    "sentence": "We must be quiet in the library.",
    "zh": "我们在图书馆必须保持安静。"
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
      "情态动词 + 动词原形（不加 to）",
      "can：能力/许可 Can you…?",
      "should：建议 You should…",
      "must：必须 We must…"
    ],
    "chant": "Can, should, must — base form next! No to, no s — that's the text!",
    "chantSpeak": "Can, should, must, base form next! No to, no s, that is the text!"
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