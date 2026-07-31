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
    "audio": "It will be sunny and warm next Monday.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。",
    "image": "l12-future-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l12-future-hero.jpg",
    "question": "next Monday 说明用什么时态？",
    "choices": [
      {
        "text": "一般将来时 will + 原形/be",
        "correct": true,
        "fb": "对了！next… → will。"
      },
      {
        "text": "一般过去时",
        "correct": false,
        "fb": "next Monday 是将来。"
      },
      {
        "text": "现在进行时",
        "correct": false,
        "fb": "没有 now/look 等标志。"
      }
    ],
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l12-now.jpg",
    "rightImage": "l12-future.jpg",
    "leftLabel": "现在 is",
    "rightLabel": "将来 will be",
    "leftSentence": "It is rainy today.",
    "leftZh": "今天在下雨。",
    "rightSentence": "It will be sunny next Monday.",
    "rightZh": "下周一将会晴朗。",
    "morphBase": "is",
    "morphPast": "will be",
    "morphHighlight": "will",
    "discovery": "将来：will + 动词原形；will be + 形容词/名词。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l12-future-hero.jpg",
    "buckets": [
      {
        "key": "now",
        "label": "现在"
      },
      {
        "key": "fut",
        "label": "将来 will"
      }
    ],
    "items": [
      {
        "text": "I am twelve.",
        "bucket": "now"
      },
      {
        "text": "I will be thirteen next year.",
        "bucket": "fut"
      },
      {
        "text": "She studies hard.",
        "bucket": "now"
      },
      {
        "text": "She will visit Beijing.",
        "bucket": "fut"
      },
      {
        "text": "They play football.",
        "bucket": "now"
      },
      {
        "text": "They will have a test tomorrow.",
        "bucket": "fut"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l12-future-hero.jpg",
    "rules": [
      {
        "tab": "will + 动词",
        "rule": "will + 动词原形",
        "focusVerb": "will visit",
        "examples": [
          {
            "from": "go",
            "to": "will go"
          },
          {
            "from": "have",
            "to": "will have"
          }
        ],
        "sample": "We will have a school trip next month.",
        "sampleZh": "下个月我们有学校郊游。"
      },
      {
        "tab": "will be",
        "rule": "will be + 形容词/名词",
        "focusVerb": "will be",
        "examples": [
          {
            "from": "sunny",
            "to": "will be sunny"
          }
        ],
        "sample": "It will be sunny and warm next Monday.",
        "sampleZh": "下周一将会晴朗温暖。"
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
    "image": "l12-future-hero.jpg",
    "q": "It _____ sunny and warm next Monday.",
    "opts": [
      "is",
      "will be",
      "was"
    ],
    "ans": 1,
    "hint": "next Monday → will be。",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l12-future-hero.jpg",
    "audio": "We will have a school trip next month.",
    "tokens": [
      "We",
      "will",
      "have",
      "a",
      "school",
      "trip",
      "next",
      "month"
    ],
    "sentence": "We will have a school trip next month.",
    "zh": "下个月我们有学校郊游。"
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
      "将来标志：tomorrow, next week/year, soon",
      "will + 动词原形；will be + 形/名",
      "写作：I think it will…"
    ],
    "chant": "Next time coming? Will's the sign! Will plus base — future's fine!",
    "chantSpeak": "Next time coming, will is the sign! Will plus base, future is fine!"
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