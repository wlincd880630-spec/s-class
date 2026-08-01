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
    "audio": "Please drive carefully on rainy days.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Please drive carefully on rainy days.",
    "zh": "雨天请小心驾驶。",
    "image": "w5-v11-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-v11-hero.jpg",
    "question": "carefully 是从哪个词变来的？",
    "choices": [
      {
        "text": "careful（形容词 + ly → 副词）",
        "correct": true,
        "fb": "对了！careful → carefully。"
      },
      {
        "text": "care（名词直接加 ly）",
        "correct": false,
        "fb": "care 是名词/动词，careful 才是形容词。"
      },
      {
        "text": "careless",
        "correct": false,
        "fb": "careless 是反义词，不是 carefully 的来源。"
      }
    ],
    "sentence": "Please drive carefully on rainy days.",
    "zh": "雨天请小心驾驶。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-v11-adj.jpg",
    "rightImage": "w5-v11-adv.jpg",
    "leftLabel": "careful 形容词",
    "rightLabel": "carefully 副词",
    "leftSentence": "Be careful when you cross the road.",
    "leftZh": "过马路时要小心。",
    "rightSentence": "She listened carefully to the teacher.",
    "rightZh": "她认真听老师讲课。",
    "morphBase": "careful",
    "morphPast": "carefully",
    "morphHighlight": "",
    "discovery": "形容词 + ly → 副词；y 结尾变 i 再加 ly（happy→happily）。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-v11-hero.jpg",
    "buckets": [
      {
        "key": "adj",
        "label": "形容词"
      },
      {
        "key": "adv",
        "label": "副词 -ly"
      }
    ],
    "items": [
      {
        "text": "careful",
        "bucket": "adj"
      },
      {
        "text": "carefully",
        "bucket": "adv"
      },
      {
        "text": "quick",
        "bucket": "adj"
      },
      {
        "text": "quickly",
        "bucket": "adv"
      },
      {
        "text": "happy",
        "bucket": "adj"
      },
      {
        "text": "happily",
        "bucket": "adv"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-v11-hero.jpg",
    "lead": "形容词变副词规则。",
    "rules": [
      {
        "tab": "一般规则",
        "rule": "形容词 + ly → 副词（quick→quickly, careful→carefully）",
        "focusVerb": "ly",
        "examples": [
          {
            "from": "careful",
            "to": "carefully"
          },
          {
            "from": "quick",
            "to": "quickly"
          }
        ],
        "sample": "Please drive carefully on rainy days.",
        "sampleZh": "雨天请小心驾驶。"
      },
      {
        "tab": "y 结尾",
        "rule": "辅音 + y → 变 y 为 i 加 ly（happy→happily, easy→easily）",
        "focusVerb": "ily",
        "examples": [
          {
            "from": "happy",
            "to": "happily"
          }
        ],
        "sample": "She smiled happily at her friends.",
        "sampleZh": "她开心地对朋友们笑。"
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
    "image": "w5-v11-hero.jpg",
    "q": "Please read the instructions _____.",
    "opts": [
      "careful",
      "carefully",
      "careless"
    ],
    "ans": 1,
    "hint": "修饰动词 read，用副词 carefully。",
    "sentence": "Please drive carefully on rainy days.",
    "zh": "雨天请小心驾驶。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-v11-hero.jpg",
    "audio": "Please drive carefully on rainy days.",
    "tokens": [
      "Please",
      "drive",
      "carefully",
      "on",
      "rainy",
      "days"
    ],
    "sentence": "Please drive carefully on rainy days.",
    "zh": "雨天请小心驾驶。"
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
      "形容词 + ly → 副词",
      "修饰动词用副词",
      "happy→happily（y 变 i + ly）"
    ],
    "chant": "Add -ly to the adjective — that's the way! Careful to carefully — every day!",
    "chantSpeak": "Add ly to the adjective, that is the way! Careful to carefully, every day!"
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