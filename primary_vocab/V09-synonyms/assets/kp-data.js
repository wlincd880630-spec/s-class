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
    "audio": "The box is large. We need a big bag for it.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "The box is large. We need a big bag for it.",
    "zh": "箱子很大，我们需要一个大袋子。",
    "image": "w4-syn-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-syn-hero.jpg",
    "question": "large 和 big 是什么关系？",
    "choices": [
      {
        "text": "同义词，意思相近",
        "correct": true,
        "fb": "对了！large ≈ big。"
      },
      {
        "text": "反义词",
        "correct": false,
        "fb": "反义是 small/little。"
      },
      {
        "text": "large 只能修饰人",
        "correct": false,
        "fb": "large 可修饰物。"
      }
    ],
    "sentence": "The box is large. We need a big bag for it.",
    "zh": "箱子很大，我们需要一个大袋子。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-syn-large.jpg",
    "rightImage": "w4-syn-big.jpg",
    "leftLabel": "large",
    "rightLabel": "big",
    "leftSentence": "We have a large classroom.",
    "leftZh": "我们有一间大教室。",
    "rightSentence": "We have a big classroom.",
    "rightZh": "我们有一间大教室。",
    "morphBase": "large",
    "morphPast": "big",
    "morphHighlight": "",
    "discovery": "画线词找同义：large/big, begin/start, glad/happy, ill/sick。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-syn-hero.jpg",
    "buckets": [
      {
        "key": "pair",
        "label": "同义配对"
      }
    ],
    "items": [
      {
        "text": "large ↔ big",
        "bucket": "pair"
      },
      {
        "text": "begin ↔ start",
        "bucket": "pair"
      },
      {
        "text": "glad ↔ happy",
        "bucket": "pair"
      },
      {
        "text": "ill ↔ sick",
        "bucket": "pair"
      },
      {
        "text": "close ↔ shut",
        "bucket": "pair"
      },
      {
        "text": "quick ↔ fast",
        "bucket": "pair"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-syn-hero.jpg",
    "lead": "小升初高频同义对。",
    "rules": [
      {
        "tab": "形/副",
        "rule": "large/big, glad/happy, quick/fast, easy/simple",
        "focusVerb": "big",
        "examples": [
          {
            "from": "large",
            "to": "big"
          }
        ],
        "sample": "The box is large. We need a big bag.",
        "sampleZh": "箱子很大，我们需要一个大袋子。"
      },
      {
        "tab": "动词",
        "rule": "begin/start, close/shut, like/enjoy",
        "focusVerb": "start",
        "examples": [
          {
            "from": "begin",
            "to": "start"
          }
        ],
        "sample": "Let's begin the class. = Let's start the class.",
        "sampleZh": "我们开始上课吧。"
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
    "image": "w4-syn-hero.jpg",
    "q": "Which word is similar to \"glad\"?",
    "opts": [
      "sad",
      "happy",
      "angry"
    ],
    "ans": 1,
    "sentence": "The box is large. We need a big bag for it.",
    "zh": "箱子很大，我们需要一个大袋子。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-syn-hero.jpg",
    "audio": "Let's begin the lesson now.",
    "tokens": [
      "Let's",
      "begin",
      "the",
      "lesson",
      "now"
    ],
    "sentence": "Let's begin the lesson now.",
    "zh": "我们现在开始上课吧。"
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
      "画线词找同义替换",
      "large/big, begin/start, glad/happy",
      "写作换词避免重复"
    ],
    "chant": "Same meaning, different word — synonym heard!",
    "chantSpeak": "Same meaning, different word, synonym heard!"
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