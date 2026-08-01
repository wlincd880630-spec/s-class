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
    "audio": "I enjoy reading books in the library.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。",
    "image": "w3-like-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-like-hero.jpg",
    "question": "enjoy 后面接什么形式？",
    "choices": [
      {
        "text": "动名词 doing",
        "correct": true,
        "fb": "对了！enjoy/like/finish + doing。"
      },
      {
        "text": "to do",
        "correct": false,
        "fb": "enjoy 后不接 to do。"
      },
      {
        "text": "动词原形",
        "correct": false,
        "fb": "需要 -ing 形式。"
      }
    ],
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-like-todo.jpg",
    "rightImage": "w3-like-doing.jpg",
    "leftLabel": "want to do",
    "rightLabel": "enjoy doing",
    "leftSentence": "I want to learn English.",
    "leftZh": "我想学英语。",
    "rightSentence": "I enjoy learning English.",
    "rightZh": "我享受学英语的过程。",
    "morphBase": "read",
    "morphPast": "reading",
    "morphHighlight": "ing",
    "discovery": "enjoy/like/finish/mind + doing（动名词）。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-like-hero.jpg",
    "buckets": [
      {
        "key": "todo",
        "label": "+ to do"
      },
      {
        "key": "doing",
        "label": "+ doing"
      }
    ],
    "items": [
      {
        "text": "want to go",
        "bucket": "todo"
      },
      {
        "text": "enjoy going",
        "bucket": "doing"
      },
      {
        "text": "decide to try",
        "bucket": "todo"
      },
      {
        "text": "finish doing",
        "bucket": "doing"
      },
      {
        "text": "hope to win",
        "bucket": "todo"
      },
      {
        "text": "like swimming",
        "bucket": "doing"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-like-hero.jpg",
    "lead": "常见动词 + doing。",
    "rules": [
      {
        "tab": "like/enjoy",
        "rule": "like/enjoy/love + doing 喜欢做",
        "focusVerb": "reading",
        "examples": [
          {
            "from": "read",
            "to": "enjoy reading"
          }
        ],
        "sample": "I enjoy reading books in the library.",
        "sampleZh": "我喜欢在图书馆看书。"
      },
      {
        "tab": "finish/mind",
        "rule": "finish/mind/practise + doing",
        "focusVerb": "finishing",
        "examples": [
          {
            "from": "finish",
            "to": "finish doing"
          }
        ],
        "sample": "Have you finished doing your homework?",
        "sampleZh": "你做完作业了吗？"
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
    "image": "w3-like-hero.jpg",
    "q": "She enjoys _____ football after school.",
    "opts": [
      "play",
      "playing",
      "to play"
    ],
    "ans": 1,
    "hint": "enjoy + doing。",
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-like-hero.jpg",
    "audio": "Tom likes playing basketball.",
    "tokens": [
      "Tom",
      "likes",
      "playing",
      "basketball"
    ],
    "sentence": "Tom likes playing basketball.",
    "zh": "汤姆喜欢打篮球。"
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
      "enjoy/like/finish + doing",
      "want/decide/hope + to do（对比）",
      "写作：I enjoy reading; I want to read more."
    ],
    "chant": "Enjoy and like — add -ing! Want to do — infinitive ring!",
    "chantSpeak": "Enjoy and like, add ing! Want to do, infinitive ring!"
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