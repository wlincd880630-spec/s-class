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
    "audio": "Tom is as tall as his brother.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。",
    "image": "w4-asas-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-asas-hero.jpg",
    "question": "as tall as 表示什么关系？",
    "choices": [
      {
        "text": "同级比较（一样高）",
        "correct": true,
        "fb": "对了！as + 原级 + as。"
      },
      {
        "text": "汤姆更高",
        "correct": false,
        "fb": "更高用 taller than。"
      },
      {
        "text": "汤姆更矮",
        "correct": false,
        "fb": "更矮用 shorter than。"
      }
    ],
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-asas-same.jpg",
    "rightImage": "w4-asas-than.jpg",
    "leftLabel": "as tall as",
    "rightLabel": "taller than",
    "leftSentence": "Tom is as tall as Jim.",
    "leftZh": "汤姆和吉姆一样高。",
    "rightSentence": "Tom is taller than Jim.",
    "rightZh": "汤姆比吉姆高。",
    "morphBase": "as tall as",
    "morphPast": "taller than",
    "morphHighlight": "",
    "discovery": "as…as 同级；than 比较级；not as…as = 不如。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-asas-hero.jpg",
    "buckets": [
      {
        "key": "as",
        "label": "as…as 同级"
      },
      {
        "key": "than",
        "label": "比较级 + than"
      }
    ],
    "items": [
      {
        "text": "as fast as",
        "bucket": "as"
      },
      {
        "text": "faster than",
        "bucket": "than"
      },
      {
        "text": "not as big as",
        "bucket": "as"
      },
      {
        "text": "bigger than",
        "bucket": "than"
      },
      {
        "text": "as carefully as",
        "bucket": "as"
      },
      {
        "text": "more carefully than",
        "bucket": "than"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-asas-hero.jpg",
    "lead": "同级 vs 比较级。",
    "rules": [
      {
        "tab": "as…as",
        "rule": "as + 形容词/副词原级 + as（一样）",
        "focusVerb": "as",
        "examples": [
          {
            "from": "tall",
            "to": "as tall as"
          }
        ],
        "sample": "Tom is as tall as his brother.",
        "sampleZh": "汤姆和他哥哥一样高。"
      },
      {
        "tab": "not as…as",
        "rule": "not as…as = 不如……",
        "focusVerb": "not",
        "examples": [
          {
            "from": "not as fast",
            "to": "不如快"
          }
        ],
        "sample": "She is not as tall as me.",
        "sampleZh": "她不如我高。"
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
    "image": "w4-asas-hero.jpg",
    "q": "My brother is _____ me.",
    "opts": [
      "as tall as",
      "taller as",
      "as taller as"
    ],
    "ans": 0,
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-asas-hero.jpg",
    "audio": "Tom is as tall as his brother.",
    "tokens": [
      "Tom",
      "is",
      "as",
      "tall",
      "as",
      "his",
      "brother"
    ],
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
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
      "as + 原级 + as",
      "not as…as = 不如",
      "比较级用 than，不用 as…as"
    ],
    "chant": "As plus原级 plus as — same degree! Not as…as — less, you see!",
    "chantSpeak": "As plus原级 plus as, same degree! Not as as, less, you see!"
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