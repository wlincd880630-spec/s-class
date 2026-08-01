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
    "audio": "Look! Tom is playing football in the park.",
    "soundHint": "Listen! Is the action happening now or every day?",
    "question": "动作是此刻正在发生吗？",
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。",
    "image": "w3-pc-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-pc-hero.jpg",
    "question": "为什么用 is playing 而不是 plays？",
    "choices": [
      {
        "text": "此刻正在发生，用现在进行时",
        "correct": true,
        "fb": "对了！look/now → am/is/are + V-ing。"
      },
      {
        "text": "每天发生，用一般现在时",
        "correct": false,
        "fb": "每天发生才用 plays。"
      },
      {
        "text": "过去发生",
        "correct": false,
        "fb": "没有过去时间标志。"
      }
    ],
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "lead": "对比：习惯性动作 vs 此刻正在进行的动作。",
    "leftImage": "w3-pc-habit.jpg",
    "rightImage": "w3-pc-now.jpg",
    "leftLabel": "every day · plays",
    "rightLabel": "Look! · is playing",
    "leftSentence": "Tom plays football every Saturday.",
    "leftZh": "汤姆每周六踢足球。",
    "rightSentence": "Look! Tom is playing football now.",
    "rightZh": "看！汤姆正在踢足球。",
    "morphBase": "plays",
    "morphPast": "is playing",
    "morphHighlight": "ing",
    "discovery": "标志词 now, look, listen → am/is/are + V-ing。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-pc-hero.jpg",
    "buckets": [
      {
        "key": "simp",
        "label": "一般现在时"
      },
      {
        "key": "prog",
        "label": "现在进行时"
      }
    ],
    "items": [
      {
        "text": "She reads books every evening.",
        "bucket": "simp"
      },
      {
        "text": "She is reading a book now.",
        "bucket": "prog"
      },
      {
        "text": "They go to school by bus.",
        "bucket": "simp"
      },
      {
        "text": "Look! They are running.",
        "bucket": "prog"
      },
      {
        "text": "He watches TV after dinner.",
        "bucket": "simp"
      },
      {
        "text": "He is watching TV at the moment.",
        "bucket": "prog"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-pc-hero.jpg",
    "lead": "现在进行时构成与标志词。",
    "rules": [
      {
        "tab": "构成",
        "rule": "am / is / are + V-ing",
        "focusVerb": "playing",
        "examples": [
          {
            "from": "play",
            "to": "is playing"
          },
          {
            "from": "run",
            "to": "are running"
          }
        ],
        "sample": "Look! Tom is playing football in the park.",
        "sampleZh": "看！汤姆正在公园踢足球。"
      },
      {
        "tab": "标志词",
        "rule": "now, look, listen, at the moment",
        "focusVerb": "now",
        "examples": [
          {
            "from": "Look!",
            "to": "进行时"
          },
          {
            "from": "every day",
            "to": "一般现在时"
          }
        ],
        "sample": "Emma is doing her homework now.",
        "sampleZh": "艾玛现在正在做作业。"
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
    "image": "w3-pc-hero.jpg",
    "q": "Look! The children _____ in the playground.",
    "opts": [
      "play",
      "are playing",
      "played"
    ],
    "ans": 1,
    "hint": "Look! → 现在进行时。",
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-pc-hero.jpg",
    "audio": "Look! Tom is playing football in the park.",
    "tokens": [
      "Look",
      "Tom",
      "is",
      "playing",
      "football",
      "in",
      "the",
      "park"
    ],
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。"
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
      "now/look/listen → am/is/are + V-ing",
      "习惯性动作用一般现在时",
      "写作：Look! Lily is drawing a picture."
    ],
    "chant": "Look and now? Add -ing! Am, is, are — that's the thing!",
    "chantSpeak": "Look and now, add ing! Am, is, are, that is the thing!"
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