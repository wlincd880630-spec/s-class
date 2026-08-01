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
    "audio": "It was so hot that we stayed inside.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。",
    "image": "w5-sosuch-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-sosuch-hero.jpg",
    "question": "so hot that 中 so 后面接什么？",
    "choices": [
      {
        "text": "形容词/副词（hot）",
        "correct": true,
        "fb": "对了！so + adj/adv + that。"
      },
      {
        "text": "名词（day）",
        "correct": false,
        "fb": "名词前用 such，如 such a hot day。"
      },
      {
        "text": "动词",
        "correct": false,
        "fb": "so 后接形容词或副词。"
      }
    ],
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-sosuch-so.jpg",
    "rightImage": "w5-sosuch-such.jpg",
    "leftLabel": "so hot that",
    "rightLabel": "such a hot day that",
    "leftSentence": "He ran so fast that I couldn't catch him.",
    "leftZh": "他跑得太快，我追不上。",
    "rightSentence": "It was such a hot day that we stayed inside.",
    "rightZh": "天太热了，我们待在室内。",
    "morphBase": "so hot",
    "morphPast": "such a hot day",
    "morphHighlight": "",
    "discovery": "so + 形容词/副词 + that；such + (a/an) + 形容词 + 名词 + that。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-sosuch-hero.jpg",
    "buckets": [
      {
        "key": "so",
        "label": "so + adj/adv"
      },
      {
        "key": "such",
        "label": "such + 名词"
      }
    ],
    "items": [
      {
        "text": "so hot that",
        "bucket": "so"
      },
      {
        "text": "such a nice day that",
        "bucket": "such"
      },
      {
        "text": "so quickly that",
        "bucket": "so"
      },
      {
        "text": "such good news that",
        "bucket": "such"
      },
      {
        "text": "so tired that",
        "bucket": "so"
      },
      {
        "text": "such an interesting book that",
        "bucket": "such"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-sosuch-hero.jpg",
    "lead": "so 与 such 的分工。",
    "rules": [
      {
        "tab": "so…that",
        "rule": "so + 形容词/副词 + that + 结果",
        "focusVerb": "so",
        "examples": [
          {
            "from": "hot",
            "to": "so hot that"
          },
          {
            "from": "fast",
            "to": "so fast that"
          }
        ],
        "sample": "It was so hot that we stayed inside.",
        "sampleZh": "天太热了，我们待在室内。"
      },
      {
        "tab": "such…that",
        "rule": "such + (a/an) + 形容词 + 名词 + that",
        "focusVerb": "such",
        "examples": [
          {
            "from": "hot day",
            "to": "such a hot day that"
          }
        ],
        "sample": "It was such a hot day that we stayed inside.",
        "sampleZh": "天太热了，我们待在室内。"
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
    "image": "w5-sosuch-hero.jpg",
    "q": "The box was _____ heavy _____ I couldn't carry it.",
    "opts": [
      "such; that",
      "so; that",
      "so; as"
    ],
    "ans": 1,
    "hint": "heavy 是形容词，用 so…that。",
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-sosuch-hero.jpg",
    "audio": "It was so hot that we stayed inside.",
    "tokens": [
      "It",
      "was",
      "so",
      "hot",
      "that",
      "we",
      "stayed",
      "inside"
    ],
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。"
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
      "so + 形容词/副词 + that",
      "such + (a/an) + adj + 名词 + that",
      "that 后接结果从句"
    ],
    "chant": "So plus adj or adverb — that's the way! Such plus noun — remember today!",
    "chantSpeak": "So plus adj or adverb, that is the way! Such plus noun, remember today!"
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