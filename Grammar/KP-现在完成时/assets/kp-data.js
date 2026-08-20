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
    "section": "导入",
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
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-pp-hero.jpg",
    "lead": "过去发生、与现在有关：have/has + 过去分词。",
    "formula": "have / has + 过去分词",
    "parts": [
      {
        "mark": "have",
        "label": "I/you/we/they",
        "example": "have finished"
      },
      {
        "mark": "has",
        "label": "he/she/it",
        "example": "has worked"
      },
      {
        "mark": "标志",
        "label": "already / yet / for / since / so far",
        "example": "for ten years"
      }
    ],
    "samples": [
      {
        "sentence": "He has worked in this company for ten years so far.",
        "zh": "到目前为止，他在这家公司工作了十年。"
      },
      {
        "sentence": "She has already finished her homework.",
        "zh": "她已经做完作业了。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
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
    "section": "精讲",
    "title": "例句 · for + 时间段",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pp-hero.jpg",
    "lead": "for ten years 用完成时。",
    "sentence": "He has worked here for ten years.",
    "zh": "他在这里工作十年了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · already",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pp-hero.jpg",
    "lead": "already 用于肯定句。",
    "sentence": "She has already finished her homework.",
    "zh": "她已经做完作业了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
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
    "id": "p08",
    "section": "辨析",
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
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-pp-hero.jpg",
    "question": "「I have seen him yesterday.」错在哪？",
    "choices": [
      {
        "text": "yesterday 是过去具体时间，应改用一般过去时 saw",
        "correct": true,
        "fb": "有明确过去时间点用一般过去时。"
      },
      {
        "text": "have 要改成 has",
        "correct": false,
        "fb": "I 用 have 是对的。"
      },
      {
        "text": "seen 要改成 saw 但保留 have",
        "correct": false,
        "fb": "不能 have saw。"
      }
    ],
    "sentence": "I saw him yesterday.",
    "zh": "我昨天看见他了。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-pp-hero.jpg",
    "lead": "完成时否定：haven't/hasn't + PP；疑问：Have/Has + 主语 + PP？",
    "items": [
      {
        "from": "They have visited the museum.",
        "fromZh": "他们参观过博物馆。",
        "steps": [
          {
            "label": "改成否定（还没有，用 yet）",
            "opts": [
              "They haven't visited the museum yet.",
              "They didn't visited the museum yet.",
              "They haven't visit the museum yet."
            ],
            "ans": 0,
            "hint": "haven't + 过去分词，yet 放句末。",
            "sentence": "They haven't visited the museum yet.",
            "zh": "他们还没参观博物馆。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Have they visited the museum?",
              "Did they visited the museum?",
              "Have they visit the museum?"
            ],
            "ans": 0,
            "hint": "Have + 主语 + PP？",
            "sentence": "Have they visited the museum?",
            "zh": "他们参观过博物馆吗？"
          }
        ]
      }
    ],
    "id": "p10"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "w3-pp-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "She",
      "has",
      "already",
      "finished",
      "her",
      "homework"
    ],
    "sentence": "She has already finished her homework.",
    "zh": "她已经完成作业了。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
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
    "id": "p13",
    "section": "检测",
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
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-pp-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
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
        "q": "He has worked here _____ ten years.",
        "opts": [
          "since",
          "for",
          "in"
        ],
        "ans": 1,
        "hint": "for + 时间段。",
        "sentence": "He has worked here for ten years.",
        "zh": "他在这里工作十年了。"
      },
      {
        "q": "She has lived here _____ 2018.",
        "opts": [
          "for",
          "since",
          "at"
        ],
        "ans": 1,
        "hint": "since + 时间点。",
        "sentence": "She has lived here since 2018.",
        "zh": "她从 2018 年起住在这里。"
      },
      {
        "q": "_____ you ever been to Beijing?",
        "opts": [
          "Do",
          "Did",
          "Have"
        ],
        "ans": 2,
        "hint": "经历：Have you ever…?",
        "sentence": "Have you ever been to Beijing?",
        "zh": "你去过北京吗？"
      },
      {
        "q": "I _____ my homework yet.",
        "opts": [
          "haven't finished",
          "didn't finish",
          "don't finish"
        ],
        "ans": 0,
        "hint": "yet 常与完成时否定连用。",
        "sentence": "I haven't finished my homework yet.",
        "zh": "我还没做完作业。"
      },
      {
        "q": "Tom isn't here. He _____ to the library.",
        "opts": [
          "has gone",
          "has been",
          "went"
        ],
        "ans": 0,
        "hint": "has gone to = 去了还没回来。",
        "sentence": "He has gone to the library.",
        "zh": "他去图书馆了。"
      }
    ],
    "id": "p14"
  },
  {
    "section": "检测",
    "title": "限时挑战 60 秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "lead": "对照初中课堂竞赛：60 秒内尽量多答对。",
    "seconds": 60,
    "perQuestion": 12,
    "pass": 4,
    "questions": [
      {
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
        "q": "He has worked here _____ ten years.",
        "opts": [
          "since",
          "for",
          "in"
        ],
        "ans": 1,
        "hint": "for + 时间段。",
        "sentence": "He has worked here for ten years.",
        "zh": "他在这里工作十年了。"
      },
      {
        "q": "She has lived here _____ 2018.",
        "opts": [
          "for",
          "since",
          "at"
        ],
        "ans": 1,
        "hint": "since + 时间点。",
        "sentence": "She has lived here since 2018.",
        "zh": "她从 2018 年起住在这里。"
      },
      {
        "q": "_____ you ever been to Beijing?",
        "opts": [
          "Do",
          "Did",
          "Have"
        ],
        "ans": 2,
        "hint": "经历：Have you ever…?",
        "sentence": "Have you ever been to Beijing?",
        "zh": "你去过北京吗？"
      },
      {
        "q": "I _____ my homework yet.",
        "opts": [
          "haven't finished",
          "didn't finish",
          "don't finish"
        ],
        "ans": 0,
        "hint": "yet 常与完成时否定连用。",
        "sentence": "I haven't finished my homework yet.",
        "zh": "我还没做完作业。"
      },
      {
        "q": "Tom isn't here. He _____ to the library.",
        "opts": [
          "has gone",
          "has been",
          "went"
        ],
        "ans": 0,
        "hint": "has gone to = 去了还没回来。",
        "sentence": "He has gone to the library.",
        "zh": "他去图书馆了。"
      }
    ],
    "id": "p15"
  },
  {
    "section": "检测",
    "title": "连对闯关",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "lead": "连续答对 5 题通关，答错连击清零。",
    "target": 5,
    "questions": [
      {
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
        "q": "He has worked here _____ ten years.",
        "opts": [
          "since",
          "for",
          "in"
        ],
        "ans": 1,
        "hint": "for + 时间段。",
        "sentence": "He has worked here for ten years.",
        "zh": "他在这里工作十年了。"
      },
      {
        "q": "She has lived here _____ 2018.",
        "opts": [
          "for",
          "since",
          "at"
        ],
        "ans": 1,
        "hint": "since + 时间点。",
        "sentence": "She has lived here since 2018.",
        "zh": "她从 2018 年起住在这里。"
      },
      {
        "q": "_____ you ever been to Beijing?",
        "opts": [
          "Do",
          "Did",
          "Have"
        ],
        "ans": 2,
        "hint": "经历：Have you ever…?",
        "sentence": "Have you ever been to Beijing?",
        "zh": "你去过北京吗？"
      },
      {
        "q": "I _____ my homework yet.",
        "opts": [
          "haven't finished",
          "didn't finish",
          "don't finish"
        ],
        "ans": 0,
        "hint": "yet 常与完成时否定连用。",
        "sentence": "I haven't finished my homework yet.",
        "zh": "我还没做完作业。"
      },
      {
        "q": "Tom isn't here. He _____ to the library.",
        "opts": [
          "has gone",
          "has been",
          "went"
        ],
        "ans": 0,
        "hint": "has gone to = 去了还没回来。",
        "sentence": "He has gone to the library.",
        "zh": "他去图书馆了。"
      }
    ],
    "id": "p16"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "w3-pp-hero.jpg",
    "pairs": [
      {
        "en": "have finished",
        "zh": "已经完成"
      },
      {
        "en": "for ten years",
        "zh": "长达十年"
      },
      {
        "en": "since 2018",
        "zh": "自从 2018"
      },
      {
        "en": "yet",
        "zh": "还（否定/疑问）"
      }
    ],
    "id": "p17"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "w3-pp-hero.jpg",
    "audio": "She has already finished her homework.",
    "opts": [
      "She has already finished her homework.",
      "He worked in this company for ten years so far.",
      "He has work in this company for ten years."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "She has already finished her homework.",
    "zh": "她已经完成作业了。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "writing.jpg",
    "checklist": [
      "have/has + 过去分词",
      "for + 时间段；since + 时间点",
      "already 肯定；yet 否定/疑问",
      "has gone to（去了未回）vs has been to（去过已回）。"
    ],
    "chant": "Have or has plus past participle! For and since — connection!",
    "chantSpeak": "Have or has plus past participle! For and since, connection!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "现在完成时 · 入门",
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