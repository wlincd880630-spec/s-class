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
    "audio": "He has worked in this company for ten years so far.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "He has worked in this company for ten years so far.",
    "zh": "到目前为止，他在这家公司工作了十年。",
    "image": "w3-pp-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-pp-hero.jpg",
    "question": "so far 说明用什么时态？",
    "choices": [
      {
        "text": "现在完成时 have/has + 过去分词",
        "correct": true,
        "fb": "对了！so far/for/since → 现在完成时。"
      },
      {
        "text": "一般过去时",
        "correct": false,
        "fb": "有 for ten years 持续到现在的意味。"
      },
      {
        "text": "一般现在时",
        "correct": false,
        "fb": "worked 不是原形三单。"
      }
    ],
    "sentence": "He has worked in this company for ten years so far.",
    "zh": "到目前为止，他在这家公司工作了十年。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-pp-past.jpg",
    "rightImage": "w3-pp-perfect.jpg",
    "leftLabel": "过去时 · worked",
    "rightLabel": "现在完成 · has worked",
    "leftSentence": "He worked here in 2015.",
    "leftZh": "他 2015 年在这里工作过。",
    "rightSentence": "He has worked here for ten years.",
    "rightZh": "他在这里工作十年了（至今）。",
    "morphBase": "work",
    "morphPast": "has worked",
    "morphHighlight": "ed",
    "discovery": "过去动作与现在有联系 → have/has + 过去分词。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-pp-hero.jpg",
    "buckets": [
      {
        "key": "past",
        "label": "一般过去时"
      },
      {
        "key": "perf",
        "label": "现在完成时"
      }
    ],
    "items": [
      {
        "text": "I visited Beijing last year.",
        "bucket": "past"
      },
      {
        "text": "I have visited Beijing twice.",
        "bucket": "perf"
      },
      {
        "text": "She finished her homework yesterday.",
        "bucket": "past"
      },
      {
        "text": "She has already finished her homework.",
        "bucket": "perf"
      },
      {
        "text": "They lived here in 2020.",
        "bucket": "past"
      },
      {
        "text": "They have lived here since 2020.",
        "bucket": "perf"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-pp-hero.jpg",
    "lead": "标志词与构成。",
    "rules": [
      {
        "tab": "构成",
        "rule": "have/has + 过去分词（规则 +ed，不规则需背诵）",
        "focusVerb": "has worked",
        "examples": [
          {
            "from": "work",
            "to": "has worked"
          },
          {
            "from": "see",
            "to": "have seen"
          }
        ],
        "sample": "He has worked here for ten years.",
        "sampleZh": "他在这里工作十年了。"
      },
      {
        "tab": "标志词",
        "rule": "already, yet, ever, never, for, since, so far",
        "focusVerb": "so far",
        "examples": [
          {
            "from": "so far",
            "to": "到目前为止"
          },
          {
            "from": "for 3 years",
            "to": "持续三年"
          }
        ],
        "sample": "He has worked in this company for ten years so far.",
        "sampleZh": "到目前为止，他在这家公司工作了十年。"
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
    "image": "w3-pp-hero.jpg",
    "q": "He has worked here _____ ten years so far.",
    "opts": [
      "since",
      "for",
      "in"
    ],
    "ans": 1,
    "hint": "for + 时间段；since + 起点。",
    "sentence": "He has worked in this company for ten years so far.",
    "zh": "到目前为止，他在这家公司工作了十年。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-pp-hero.jpg",
    "audio": "She has already finished her homework.",
    "tokens": [
      "She",
      "has",
      "already",
      "finished",
      "her",
      "homework"
    ],
    "sentence": "She has already finished her homework.",
    "zh": "她已经完成作业了。"
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
      "have/has + 过去分词",
      "for + 时间段；since + 时间点",
      "already 肯定；yet 否定/疑问"
    ],
    "chant": "Have or has plus past participle! For and since — connection!",
    "chantSpeak": "Have or has plus past participle! For and since, connection!"
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