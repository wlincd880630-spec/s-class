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
    "audio": "This book is mine. Yours is on the desk.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "This book is mine. Yours is on the desk.",
    "zh": "这本书是我的。你的在桌上。",
    "image": "w4-poss-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-poss-hero.jpg",
    "question": "mine 后面还需要加名词吗？",
    "choices": [
      {
        "text": "不需要，mine = my + 名词",
        "correct": true,
        "fb": "对了！mine/yours/hers 独立使用。"
      },
      {
        "text": "需要，mine book",
        "correct": false,
        "fb": "mine 已是名词性物主代词。"
      },
      {
        "text": "mine 只能作主语",
        "correct": false,
        "fb": "可作主语、表语、宾语。"
      }
    ],
    "sentence": "This book is mine. Yours is on the desk.",
    "zh": "这本书是我的。你的在桌上。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-poss-adj.jpg",
    "rightImage": "w4-poss-pron.jpg",
    "leftLabel": "my book",
    "rightLabel": "The book is mine.",
    "leftSentence": "This is my pen.",
    "leftZh": "这是我的钢笔。",
    "rightSentence": "This pen is mine.",
    "rightZh": "这支钢笔是我的。",
    "morphBase": "my",
    "morphPast": "mine",
    "morphHighlight": "",
    "discovery": "形容词性：my/your/his/her/our/their + 名词；名词性：mine/yours/his/hers/ours/theirs。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-poss-hero.jpg",
    "buckets": [
      {
        "key": "adj",
        "label": "形容词性 + 名词"
      },
      {
        "key": "pron",
        "label": "名词性（独立）"
      }
    ],
    "items": [
      {
        "text": "my bag",
        "bucket": "adj"
      },
      {
        "text": "The bag is mine.",
        "bucket": "pron"
      },
      {
        "text": "her books",
        "bucket": "adj"
      },
      {
        "text": "These are hers.",
        "bucket": "pron"
      },
      {
        "text": "their classroom",
        "bucket": "adj"
      },
      {
        "text": "This classroom is theirs.",
        "bucket": "pron"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-poss-hero.jpg",
    "lead": "两套物主代词。",
    "rules": [
      {
        "tab": "形容词性",
        "rule": "my/your/his/her/its/our/their + 名词",
        "focusVerb": "my",
        "examples": [
          {
            "from": "my",
            "to": "my book"
          }
        ],
        "sample": "This is my book.",
        "sampleZh": "这是我的书。"
      },
      {
        "tab": "名词性",
        "rule": "mine/yours/his/hers/ours/theirs（后不接名词）",
        "focusVerb": "mine",
        "examples": [
          {
            "from": "mine",
            "to": "The book is mine."
          }
        ],
        "sample": "This book is mine. Yours is on the desk.",
        "sampleZh": "这本书是我的。你的在桌上。"
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
    "image": "w4-poss-hero.jpg",
    "q": "This pen isn't _____. It's _____.",
    "opts": [
      "my; her",
      "mine; hers",
      "mine; her"
    ],
    "ans": 1,
    "hint": "be 动词后用名词性物主代词。",
    "sentence": "This book is mine. Yours is on the desk.",
    "zh": "这本书是我的。你的在桌上。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-poss-hero.jpg",
    "audio": "This book is mine.",
    "tokens": [
      "This",
      "book",
      "is",
      "mine"
    ],
    "sentence": "This book is mine.",
    "zh": "这本书是我的。"
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
      "my + 名词；mine 独立",
      "his 形容词性 = 名词性",
      "写作：Yours is…; This is mine."
    ],
    "chant": "My plus noun — that's the rule! Mine stands alone — cool and cool!",
    "chantSpeak": "My plus noun, that is the rule! Mine stands alone, cool and cool!"
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