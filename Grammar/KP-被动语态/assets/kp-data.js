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
    "audio": "English is spoken in many countries.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。",
    "image": "w3-pass-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-pass-hero.jpg",
    "question": "谁才是句子的主角——英语还是被说？",
    "choices": [
      {
        "text": "英语是主语，强调「被说」→ 被动语态",
        "correct": true,
        "fb": "对了！主语是动作的承受者。"
      },
      {
        "text": "主动语态",
        "correct": false,
        "fb": "主动句常说 People speak English。"
      },
      {
        "text": "过去时",
        "correct": false,
        "fb": "is spoken 是现在时被动。"
      }
    ],
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-pass-act.jpg",
    "rightImage": "w3-pass-pass.jpg",
    "leftLabel": "主动",
    "rightLabel": "被动",
    "leftSentence": "People speak English.",
    "leftZh": "人们说英语。",
    "rightSentence": "English is spoken by many people.",
    "rightZh": "英语被很多人说。",
    "morphBase": "speak",
    "morphPast": "is spoken",
    "morphHighlight": "en",
    "discovery": "主语是承受者 → be + 过去分词 (+ by …)。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-pass-hero.jpg",
    "buckets": [
      {
        "key": "act",
        "label": "主动语态"
      },
      {
        "key": "pas",
        "label": "被动语态"
      }
    ],
    "items": [
      {
        "text": "Tom cleans the classroom.",
        "bucket": "act"
      },
      {
        "text": "The classroom is cleaned every day.",
        "bucket": "pas"
      },
      {
        "text": "They built the bridge in 2010.",
        "bucket": "act"
      },
      {
        "text": "The bridge was built in 2010.",
        "bucket": "pas"
      },
      {
        "text": "Miss Li teaches us English.",
        "bucket": "act"
      },
      {
        "text": "We are taught English by Miss Li.",
        "bucket": "pas"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-pass-hero.jpg",
    "lead": "被动语态构成。",
    "rules": [
      {
        "tab": "现在",
        "rule": "am/is/are + 过去分词",
        "focusVerb": "is spoken",
        "examples": [
          {
            "from": "speak",
            "to": "is spoken"
          },
          {
            "from": "make",
            "to": "is made"
          }
        ],
        "sample": "English is spoken in many countries.",
        "sampleZh": "许多国家说英语。"
      },
      {
        "tab": "过去",
        "rule": "was/were + 过去分词",
        "focusVerb": "was built",
        "examples": [
          {
            "from": "build",
            "to": "was built"
          }
        ],
        "sample": "The bridge was built in 2010.",
        "sampleZh": "这座桥建于 2010 年。"
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
    "image": "w3-pass-hero.jpg",
    "q": "The classroom _____ every afternoon.",
    "opts": [
      "cleans",
      "is cleaned",
      "cleaned"
    ],
    "ans": 1,
    "hint": "教室是「被打扫」→ 被动。",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-pass-hero.jpg",
    "audio": "English is spoken in many countries.",
    "tokens": [
      "English",
      "is",
      "spoken",
      "in",
      "many",
      "countries"
    ],
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
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
      "主语是承受者 → be + 过去分词",
      "by + 执行者（可省略）",
      "写作：The book was written by…"
    ],
    "chant": "Be plus past participle — passive voice! The subject receives — that's the choice!",
    "chantSpeak": "Be plus past participle, passive voice! The subject receives, that is the choice!"
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