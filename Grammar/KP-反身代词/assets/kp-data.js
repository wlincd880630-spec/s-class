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
    "audio": "The children enjoyed themselves at the party.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。",
    "image": "w5-refl-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-refl-hero.jpg",
    "question": "enjoyed themselves 中 themselves 指谁？",
    "choices": [
      {
        "text": "the children（主语自己）",
        "correct": true,
        "fb": "对了！反身代词指主语本身。"
      },
      {
        "text": "其他孩子",
        "correct": false,
        "fb": "themselves 指主语 the children 自己。"
      },
      {
        "text": "聚会上的大人",
        "correct": false,
        "fb": "反身代词与主语一致。"
      }
    ],
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-refl-myself.jpg",
    "rightImage": "w5-refl-themselves.jpg",
    "leftLabel": "I → myself",
    "rightLabel": "they → themselves",
    "leftSentence": "I hurt myself when I fell.",
    "leftZh": "我摔倒时伤到了自己。",
    "rightSentence": "They taught themselves to swim.",
    "rightZh": "他们自学游泳。",
    "morphBase": "myself",
    "morphPast": "themselves",
    "morphHighlight": "",
    "discovery": "I→myself, you→yourself, he→himself, she→herself, we→ourselves, they→themselves。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-refl-hero.jpg",
    "buckets": [
      {
        "key": "sing",
        "label": "单数反身代词"
      },
      {
        "key": "plur",
        "label": "复数反身代词"
      }
    ],
    "items": [
      {
        "text": "myself",
        "bucket": "sing"
      },
      {
        "text": "ourselves",
        "bucket": "plur"
      },
      {
        "text": "yourself",
        "bucket": "sing"
      },
      {
        "text": "themselves",
        "bucket": "plur"
      },
      {
        "text": "himself",
        "bucket": "sing"
      },
      {
        "text": "yourselves",
        "bucket": "plur"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-refl-hero.jpg",
    "lead": "反身代词与人称对应。",
    "rules": [
      {
        "tab": "单数",
        "rule": "myself, yourself, himself, herself, itself",
        "focusVerb": "myself",
        "examples": [
          {
            "from": "I",
            "to": "myself"
          },
          {
            "from": "he",
            "to": "himself"
          }
        ],
        "sample": "I hurt myself when I fell.",
        "sampleZh": "我摔倒时伤到了自己。"
      },
      {
        "tab": "复数/常见搭配",
        "rule": "ourselves, yourselves, themselves；enjoy/help/dress + 反身代词",
        "focusVerb": "themselves",
        "examples": [
          {
            "from": "enjoy",
            "to": "enjoy themselves"
          }
        ],
        "sample": "The children enjoyed themselves at the party.",
        "sampleZh": "孩子们在聚会上玩得很开心。"
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
    "image": "w5-refl-hero.jpg",
    "q": "The students enjoyed _____ at the school picnic.",
    "opts": [
      "them",
      "their",
      "themselves"
    ],
    "ans": 2,
    "hint": "enjoy 后指主语自己，用反身代词 themselves。",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-refl-hero.jpg",
    "audio": "The children enjoyed themselves at the party.",
    "tokens": [
      "The",
      "children",
      "enjoyed",
      "themselves",
      "at",
      "the",
      "party"
    ],
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
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
      "主语=宾语时用反身代词",
      "myself/yourself/himself/herself",
      "enjoy/help/dress + 反身代词"
    ],
    "chant": "Myself for I, yourself for you — reflexive pronouns see you through!",
    "chantSpeak": "Myself for I, yourself for you, reflexive pronouns see you through!"
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