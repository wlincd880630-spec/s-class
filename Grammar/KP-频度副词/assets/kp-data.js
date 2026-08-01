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
    "audio": "Tom always gets up early on school days.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。",
    "image": "w4-freq-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-freq-hero.jpg",
    "question": "always 在句中通常放在哪里？",
    "choices": [
      {
        "text": "be 动词后，实义动词前",
        "correct": true,
        "fb": "对了！He is always…; He always gets…"
      },
      {
        "text": "句末",
        "correct": false,
        "fb": "频度副词一般放句中。"
      },
      {
        "text": "句首必须加逗号",
        "correct": false,
        "fb": "有时可句首，但小升初常考句中位置。"
      }
    ],
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-freq-high.jpg",
    "rightImage": "w4-freq-low.jpg",
    "leftLabel": "always 总是",
    "rightLabel": "never 从不",
    "leftSentence": "She always helps her mother.",
    "leftZh": "她总是帮妈妈。",
    "rightSentence": "He never eats junk food.",
    "rightZh": "他从不吃垃圾食品。",
    "morphBase": "always",
    "morphPast": "never",
    "morphHighlight": "",
    "discovery": "频率：always > usually > often > sometimes > seldom > never。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-freq-hero.jpg",
    "buckets": [
      {
        "key": "high",
        "label": "高频率"
      },
      {
        "key": "low",
        "label": "低频率"
      }
    ],
    "items": [
      {
        "text": "always",
        "bucket": "high"
      },
      {
        "text": "never",
        "bucket": "low"
      },
      {
        "text": "usually",
        "bucket": "high"
      },
      {
        "text": "seldom",
        "bucket": "low"
      },
      {
        "text": "often",
        "bucket": "high"
      },
      {
        "text": "sometimes",
        "bucket": "low"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-freq-hero.jpg",
    "lead": "频度副词位置与排序。",
    "rules": [
      {
        "tab": "位置",
        "rule": "be 后；助动词后；实义动词前",
        "focusVerb": "always",
        "examples": [
          {
            "from": "is always",
            "to": "He is always happy."
          },
          {
            "from": "always gets",
            "to": "He always gets up early."
          }
        ],
        "sample": "Tom always gets up early on school days.",
        "sampleZh": "上学日汤姆总是早起。"
      },
      {
        "tab": "排序",
        "rule": "always > usually > often > sometimes > never",
        "focusVerb": "usually",
        "examples": [
          {
            "from": "always",
            "to": "100%"
          },
          {
            "from": "never",
            "to": "0%"
          }
        ],
        "sample": "I usually walk to school, but sometimes I take the bus.",
        "sampleZh": "我通常走路上学，但有时坐公交。"
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
    "image": "w4-freq-hero.jpg",
    "q": "My sister _____ does her homework before dinner.",
    "opts": [
      "never",
      "usually",
      "seldom"
    ],
    "ans": 1,
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-freq-hero.jpg",
    "audio": "Tom always gets up early on school days.",
    "tokens": [
      "Tom",
      "always",
      "gets",
      "up",
      "early",
      "on",
      "school",
      "days"
    ],
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
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
      "be 后/实义动词前",
      "always > usually > often > sometimes > never",
      "写作：I usually…, but sometimes…"
    ],
    "chant": "Always, usually, often — high to low! After be, before verb — now you know!",
    "chantSpeak": "Always, usually, often, high to low! After be, before verb, now you know!"
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