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
    "audio": "There are a few apples on the table.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。",
    "image": "l15-few-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l15-few-hero.jpg",
    "question": "a few 和 few 意思一样吗？",
    "choices": [
      {
        "text": "a few 一些（肯定）；few 几乎没有（否定）",
        "correct": true,
        "fb": "对了！a 虽小但表「有一些」。"
      },
      {
        "text": "完全一样",
        "correct": false,
        "fb": "有无 a 意思相反！"
      },
      {
        "text": "few 比 a few 更多",
        "correct": false,
        "fb": "few 表否定，几乎沒有。"
      }
    ],
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l15-afew.jpg",
    "rightImage": "l15-few.jpg",
    "leftLabel": "a few 有一些",
    "rightLabel": "few 几乎没有",
    "leftSentence": "I have a few friends here.",
    "leftZh": "我在这里有一些朋友。",
    "rightSentence": "Few students like the test.",
    "rightZh": "几乎没有学生喜欢这次测验。",
    "morphBase": "a few",
    "morphPast": "few",
    "morphHighlight": "",
    "discovery": "a few/a little 肯定；few/little 否定。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l15-few-hero.jpg",
    "buckets": [
      {
        "key": "pos",
        "label": "a few / a little（有一些）"
      },
      {
        "key": "neg",
        "label": "few / little（几乎没有）"
      }
    ],
    "items": [
      {
        "text": "a few books",
        "bucket": "pos"
      },
      {
        "text": "few books",
        "bucket": "neg"
      },
      {
        "text": "a little milk",
        "bucket": "pos"
      },
      {
        "text": "little milk",
        "bucket": "neg"
      },
      {
        "text": "a few minutes",
        "bucket": "pos"
      },
      {
        "text": "little time",
        "bucket": "neg"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l15-few-hero.jpg",
    "rules": [
      {
        "tab": "a few",
        "rule": "a few + 可数复数（有一些）",
        "focusVerb": "a few",
        "examples": [
          {
            "from": "apples",
            "to": "a few apples"
          }
        ],
        "sample": "There are a few apples on the table.",
        "sampleZh": "桌上有几个苹果。"
      },
      {
        "tab": "a little",
        "rule": "a little + 不可数（有一点）",
        "focusVerb": "a little",
        "examples": [
          {
            "from": "water",
            "to": "a little water"
          }
        ],
        "sample": "Would you like a little sugar?",
        "sampleZh": "你要加一点糖吗？"
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
    "image": "l15-few-hero.jpg",
    "q": "There is _____ water left. We need to buy more.",
    "opts": [
      "a little",
      "little",
      "a few"
    ],
    "ans": 1,
    "hint": "水快没了（否定）→ little water。",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l15-few-hero.jpg",
    "audio": "I have a few questions for you.",
    "tokens": [
      "I",
      "have",
      "a",
      "few",
      "questions",
      "for",
      "you"
    ],
    "sentence": "I have a few questions for you.",
    "zh": "我有几个问题要问你。"
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
      "a few + 可数复数；a little + 不可数",
      "few/little 表否定「几乎没有」",
      "写作：I have a little time, but few ideas."
    ],
    "chant": "A few count, a little mass! Without a — almost none — alas!",
    "chantSpeak": "A few count, a little mass! Without a, almost none, alas!"
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