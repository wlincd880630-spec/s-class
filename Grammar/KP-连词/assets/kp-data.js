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
    "audio": "I stayed at home because it was raining.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。",
    "image": "w4-conj-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-conj-hero.jpg",
    "question": "because 连接的是原因还是结果？",
    "choices": [
      {
        "text": "原因（为什么）",
        "correct": true,
        "fb": "对了！because + 原因从句。"
      },
      {
        "text": "结果（所以）",
        "correct": false,
        "fb": "结果用 so。"
      },
      {
        "text": "转折（但是）",
        "correct": false,
        "fb": "转折用 but。"
      }
    ],
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-conj-because.jpg",
    "rightImage": "w4-conj-so.jpg",
    "leftLabel": "because 因为",
    "rightLabel": "so 所以",
    "leftSentence": "He was tired because he worked late.",
    "leftZh": "他累了，因为工作到很晚。",
    "rightSentence": "It was raining, so I took an umbrella.",
    "rightZh": "在下雨，所以我带了伞。",
    "morphBase": "because",
    "morphPast": "so",
    "morphHighlight": "",
    "discovery": "because 原因在前或后；so 前因后果；but 转折。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-conj-hero.jpg",
    "buckets": [
      {
        "key": "cause",
        "label": "because 原因"
      },
      {
        "key": "result",
        "label": "so 结果"
      },
      {
        "key": "turn",
        "label": "but 转折"
      }
    ],
    "items": [
      {
        "text": "I like tea because it is warm.",
        "bucket": "cause"
      },
      {
        "text": "I was hungry, so I ate.",
        "bucket": "result"
      },
      {
        "text": "She is young but wise.",
        "bucket": "turn"
      },
      {
        "text": "He failed because he didn't study.",
        "bucket": "cause"
      },
      {
        "text": "It was late, so we went home.",
        "bucket": "result"
      },
      {
        "text": "The box is heavy but useful.",
        "bucket": "turn"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-conj-hero.jpg",
    "lead": "三种常用连词。",
    "rules": [
      {
        "tab": "because",
        "rule": "because + 原因（回答 Why）",
        "focusVerb": "because",
        "examples": [
          {
            "from": "Why?",
            "to": "because…"
          }
        ],
        "sample": "I stayed at home because it was raining.",
        "sampleZh": "我待在家里，因为在下雨。"
      },
      {
        "tab": "so/but",
        "rule": "so 结果；but 转折",
        "focusVerb": "so",
        "examples": [
          {
            "from": "rain",
            "to": "so I took an umbrella"
          },
          {
            "from": "young",
            "to": "but wise"
          }
        ],
        "sample": "It was raining, so I took an umbrella.",
        "sampleZh": "在下雨，所以我带了伞。"
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
    "image": "w4-conj-hero.jpg",
    "q": "The boy has few friends because he is _____.",
    "opts": [
      "friendly",
      "shy",
      "kind"
    ],
    "ans": 1,
    "hint": "few friends 的原因 → because 后接原因。",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-conj-hero.jpg",
    "audio": "I stayed at home because it was raining.",
    "tokens": [
      "I",
      "stayed",
      "at",
      "home",
      "because",
      "it",
      "was",
      "raining"
    ],
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
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
      "because + 原因",
      "so + 结果（前因后果）",
      "but + 转折；写作连接两句"
    ],
    "chant": "Because tells you why! So shows result — try, try, try!",
    "chantSpeak": "Because tells you why! So shows result, try, try, try!"
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