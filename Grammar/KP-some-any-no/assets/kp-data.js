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
    "audio": "Would you like some tea?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？",
    "image": "w3-san-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-san-hero.jpg",
    "question": "邀请句「来点茶吗」为什么用 some 不用 any？",
    "choices": [
      {
        "text": "期待肯定回答的疑问句用 some",
        "correct": true,
        "fb": "对了！Would you like some…?"
      },
      {
        "text": "所有疑问句都用 any",
        "correct": false,
        "fb": "邀请/建议疑问句常用 some。"
      },
      {
        "text": "some 只能用于肯定",
        "correct": false,
        "fb": "Would you like some 是疑问句。"
      }
    ],
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-san-some.jpg",
    "rightImage": "w3-san-any.jpg",
    "leftLabel": "some 肯定/邀请",
    "rightLabel": "any 否定/疑问",
    "leftSentence": "I have some apples.",
    "leftZh": "我有一些苹果。",
    "rightSentence": "I don't have any apples.",
    "rightZh": "我没有苹果。",
    "morphBase": "some",
    "morphPast": "any",
    "morphHighlight": "",
    "discovery": "肯定 some；否定/一般疑问 any；no = not any。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-san-hero.jpg",
    "buckets": [
      {
        "key": "some",
        "label": "some"
      },
      {
        "key": "any",
        "label": "any / no"
      }
    ],
    "items": [
      {
        "text": "I need some help.",
        "bucket": "some"
      },
      {
        "text": "Do you have any questions?",
        "bucket": "any"
      },
      {
        "text": "Would you like some water?",
        "bucket": "some"
      },
      {
        "text": "There isn't any milk.",
        "bucket": "any"
      },
      {
        "text": "She has some friends.",
        "bucket": "some"
      },
      {
        "text": "There is no time left.",
        "bucket": "any"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-san-hero.jpg",
    "lead": "some / any / no 用法。",
    "rules": [
      {
        "tab": "some",
        "rule": "肯定句；邀请/建议疑问句 Would you like some…?",
        "focusVerb": "some",
        "examples": [
          {
            "from": "肯定",
            "to": "some tea"
          }
        ],
        "sample": "Would you like some tea?",
        "sampleZh": "你想喝点茶吗？"
      },
      {
        "tab": "any/no",
        "rule": "否定/疑问 any；no = not any",
        "focusVerb": "any",
        "examples": [
          {
            "from": "not",
            "to": "not any"
          },
          {
            "from": "no",
            "to": "no time"
          }
        ],
        "sample": "I don't have any money.",
        "sampleZh": "我没有钱。"
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
    "image": "w3-san-hero.jpg",
    "q": "Would you like _____ orange juice?",
    "opts": [
      "some",
      "any",
      "no"
    ],
    "ans": 0,
    "hint": "邀请用 some。",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-san-hero.jpg",
    "audio": "There isn't any milk in the fridge.",
    "tokens": [
      "There",
      "isn't",
      "any",
      "milk",
      "in",
      "the",
      "fridge"
    ],
    "sentence": "There isn't any milk in the fridge.",
    "zh": "冰箱里没有牛奶了。"
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
      "肯定 some；否定/疑问 any",
      "Would you like some…? 邀请",
      "no = not any：There is no time."
    ],
    "chant": "Yes — some! No — any! Would you like some — that's savvy!",
    "chantSpeak": "Yes, some! No, any! Would you like some, that is savvy!"
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