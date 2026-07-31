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
    "audio": "I want a cola, too.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "I want a cola, too.",
    "zh": "我也要可乐。",
    "image": "v03-too-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "v03-too-hero.jpg",
    "question": "为什么 too 放在句末？",
    "choices": [
      {
        "text": "肯定句「也」常用 too 放句末；also 放句中",
        "correct": true,
        "fb": "对了！I want one, too."
      },
      {
        "text": "too 只能放句首",
        "correct": false,
        "fb": "too 常放句末。"
      },
      {
        "text": "否定句也用 too",
        "correct": false,
        "fb": "否定句末用 either。"
      }
    ],
    "sentence": "I want a cola, too.",
    "zh": "我也要可乐。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "v03-too.jpg",
    "rightImage": "v03-either.jpg",
    "leftLabel": "肯定 + too",
    "rightLabel": "否定 + either",
    "leftSentence": "I like tea. I like coffee, too.",
    "leftZh": "我喜欢茶，也喜欢咖啡。",
    "rightSentence": "I don't like tea. I don't like coffee, either.",
    "rightZh": "我不喜欢茶，也不喜欢咖啡。",
    "morphBase": "too",
    "morphPast": "either",
    "morphHighlight": "",
    "discovery": "肯定：also（句中）/ too（句末）；否定：either（句末）。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "v03-too-hero.jpg",
    "buckets": [
      {
        "key": "pos",
        "label": "肯定 also/too"
      },
      {
        "key": "neg",
        "label": "否定 either"
      }
    ],
    "items": [
      {
        "text": "Me, too.",
        "bucket": "pos"
      },
      {
        "text": "I don't agree, either.",
        "bucket": "neg"
      },
      {
        "text": "She also plays tennis.",
        "bucket": "pos"
      },
      {
        "text": "He can't swim, either.",
        "bucket": "neg"
      },
      {
        "text": "I want one, too.",
        "bucket": "pos"
      },
      {
        "text": "Not me, either.",
        "bucket": "neg"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "v03-too-hero.jpg",
    "rules": [
      {
        "tab": "too/also",
        "rule": "肯定句「也」：also 在 be/情态后；too 在句末",
        "focusVerb": "too",
        "examples": [
          {
            "from": "also",
            "to": "I also want one."
          },
          {
            "from": "too",
            "to": "I want one, too."
          }
        ],
        "sample": "I want a cola, too.",
        "sampleZh": "我也要可乐。"
      },
      {
        "tab": "either",
        "rule": "否定句「也（不）」：either 在句末",
        "focusVerb": "either",
        "examples": [
          {
            "from": "not",
            "to": "I don't want one, either."
          }
        ],
        "sample": "I don't like spicy food, either.",
        "sampleZh": "我也不喜欢辣食。"
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
    "image": "v03-too-hero.jpg",
    "q": "I want a cola, _____.",
    "opts": [
      "too",
      "either",
      "also"
    ],
    "ans": 0,
    "hint": "肯定句末「也」用 too。",
    "sentence": "I want a cola, too.",
    "zh": "我也要可乐。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "v03-too-hero.jpg",
    "audio": "I want a cola, too.",
    "tokens": [
      "I",
      "want",
      "a",
      "cola",
      "too"
    ],
    "sentence": "I want a cola, too.",
    "zh": "我也要可乐。"
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
      "肯定：also（句中）/ too（句末）",
      "否定：either（句末）",
      "neither：两者都不 Neither of us…"
    ],
    "chant": "Yes: also, too! No: either — that's true!",
    "chantSpeak": "Yes, also, too! No, either, that is true!"
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