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
    "audio": "You should wear a coat. It is cold today.",
    "soundHint": "should 后面动词是什么形式？",
    "question": "这是在给建议吗？",
    "sentence": "You should wear a coat. It is cold today.",
    "zh": "你应该穿外套，今天很冷。",
    "image": "l08-modals-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 情态动词后接什么？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l08-modals-hero.jpg",
    "question": "「You should wear a coat.」中 wear 为什么用原形？",
    "choices": [
      {
        "text": "因为 should 是情态动词，后接动词原形",
        "correct": true,
        "fb": "对了！can/should/must + 动词原形。"
      },
      {
        "text": "因为 coat 是单数",
        "correct": false,
        "fb": "与 coat 无关，关键在 should。"
      },
      {
        "text": "因为是一般过去时",
        "correct": false,
        "fb": "这里没有过去时间标志。"
      }
    ],
    "sentence": "You should wear a coat. It is cold today.",
    "zh": "你应该穿外套，今天很冷。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l08-modals-hero.jpg",
    "lead": "情态动词后面永远接动词原形，没有 to，也没有 -s。",
    "formula": "can / should / must + 动词原形",
    "parts": [
      {
        "mark": "can",
        "label": "能力/许可",
        "example": "can swim"
      },
      {
        "mark": "should",
        "label": "建议",
        "example": "should wear"
      },
      {
        "mark": "must",
        "label": "必须",
        "example": "must be quiet"
      }
    ],
    "samples": [
      {
        "sentence": "You should wear a coat. It is cold today.",
        "zh": "你应该穿外套，今天很冷。"
      },
      {
        "sentence": "We must be quiet in the library.",
        "zh": "图书馆里我们必须安静。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "lead": "can 表能力，should 表建议，有什么不同？",
    "leftImage": "l08-can.jpg",
    "rightImage": "l08-should.jpg",
    "leftLabel": "can 能力/许可",
    "rightLabel": "should 建议",
    "leftSentence": "I can swim.",
    "leftZh": "我会游泳。",
    "rightSentence": "You should drink more water.",
    "rightZh": "你应该多喝水。",
    "morphBase": "can",
    "morphPast": "should",
    "morphHighlight": "ould",
    "discovery": "情态动词 + 动词原形，不加 to，不加 -s。"
  },
  {
    "section": "精讲",
    "title": "例句 · can 能力",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l08-modals-hero.jpg",
    "lead": "I can swim. 表示能力。",
    "sentence": "I can swim across the pool.",
    "zh": "我能游过泳池。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · must 必须",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l08-modals-hero.jpg",
    "lead": "must 语气强，表示必须。",
    "sentence": "We must be quiet in the library.",
    "zh": "图书馆里我们必须安静。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l08-modals-hero.jpg",
    "lead": "小升初常考三种情态动词。",
    "rules": [
      {
        "tab": "can",
        "rule": "can + 原形：能力或请求许可",
        "focusVerb": "can",
        "examples": [
          {
            "from": "swim",
            "to": "can swim"
          },
          {
            "from": "help",
            "to": "Can you help me?"
          }
        ],
        "sample": "I can swim across the pool.",
        "sampleZh": "我能游过泳池。"
      },
      {
        "tab": "should",
        "rule": "should + 原形：建议「应该」",
        "focusVerb": "should",
        "examples": [
          {
            "from": "wear",
            "to": "should wear"
          },
          {
            "from": "study",
            "to": "should study"
          }
        ],
        "sample": "You should wear a coat. It is cold today.",
        "sampleZh": "你应该穿外套，今天很冷。"
      },
      {
        "tab": "must",
        "rule": "must + 原形：必须（语气强）",
        "focusVerb": "must",
        "examples": [
          {
            "from": "be quiet",
            "to": "must be quiet"
          }
        ],
        "sample": "We must be quiet in the library.",
        "sampleZh": "我们在图书馆必须保持安静。"
      }
    ]
  },
  {
    "id": "p08",
    "section": "辨析",
    "title": "分类篮 · 哪个是情态句？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l08-modals-hero.jpg",
    "lead": "哪些句子含 can/should/must？",
    "buckets": [
      {
        "key": "modal",
        "label": "情态动词句"
      },
      {
        "key": "other",
        "label": "非情态句"
      }
    ],
    "items": [
      {
        "text": "She can play the piano.",
        "bucket": "modal"
      },
      {
        "text": "He goes to school.",
        "bucket": "other"
      },
      {
        "text": "We must be quiet in the library.",
        "bucket": "modal"
      },
      {
        "text": "They watched TV.",
        "bucket": "other"
      },
      {
        "text": "You should finish your homework.",
        "bucket": "modal"
      },
      {
        "text": "It rained yesterday.",
        "bucket": "other"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l08-modals-hero.jpg",
    "question": "「She cans play the piano.」错在哪？",
    "choices": [
      {
        "text": "can 没有第三人称 -s，后接原形 play",
        "correct": true,
        "fb": "情态动词没有 -s。"
      },
      {
        "text": "piano 前要加 a",
        "correct": false,
        "fb": "乐器前用 the，但不是这句的主要错误。"
      },
      {
        "text": "要用 playing",
        "correct": false,
        "fb": "情态后是原形。"
      }
    ],
    "sentence": "She can play the piano.",
    "zh": "她会弹钢琴。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l08-modals-hero.jpg",
    "lead": "情态否定：can't / shouldn't / mustn't；疑问：情态动词提前。",
    "items": [
      {
        "from": "You can swim here.",
        "fromZh": "你可以在这里游泳。",
        "steps": [
          {
            "label": "改成否定（禁止/不能）",
            "opts": [
              "You can't swim here.",
              "You don't can swim here.",
              "You can't swimming here."
            ],
            "ans": 0,
            "hint": "can't + 原形。",
            "sentence": "You can't swim here.",
            "zh": "你不能在这里游泳。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Can you swim here?",
              "Do you can swim here?",
              "Can you swimming here?"
            ],
            "ans": 0,
            "hint": "Can + 主语 + 原形？",
            "sentence": "Can you swim here?",
            "zh": "你可以在这里游泳吗？"
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
    "image": "l08-modals-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "We",
      "must",
      "be",
      "quiet",
      "in",
      "the",
      "library"
    ],
    "sentence": "We must be quiet in the library.",
    "zh": "我们在图书馆必须保持安静。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l08-modals-hero.jpg",
    "audio": "We must be quiet in the library.",
    "tokens": [
      "We",
      "must",
      "be",
      "quiet",
      "in",
      "the",
      "library"
    ],
    "sentence": "We must be quiet in the library.",
    "zh": "我们在图书馆必须保持安静。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l08-modals-hero.jpg",
    "q": "It is raining. You _____ take an umbrella.",
    "opts": [
      "should",
      "shoulds",
      "should to"
    ],
    "ans": 0,
    "hint": "给建议用 should + 动词原形。",
    "sentence": "You should wear a coat. It is cold today.",
    "zh": "你应该穿外套，今天很冷。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l08-modals-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "It is raining. You _____ take an umbrella.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "给建议用 should + 动词原形。",
        "sentence": "You should wear a coat. It is cold today.",
        "zh": "你应该穿外套，今天很冷。"
      },
      {
        "q": "You _____ take an umbrella. It's raining.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should + 原形。",
        "sentence": "You should take an umbrella.",
        "zh": "你应该带伞。"
      },
      {
        "q": "_____ I use your pen?",
        "opts": [
          "Must",
          "Can",
          "Should to"
        ],
        "ans": 1,
        "hint": "请求许可用 Can I…?",
        "sentence": "Can I use your pen?",
        "zh": "我可以用你的笔吗？"
      },
      {
        "q": "Students _____ wear school uniforms.",
        "opts": [
          "must",
          "must to",
          "musts"
        ],
        "ans": 0,
        "hint": "校规必须 must。",
        "sentence": "Students must wear school uniforms.",
        "zh": "学生必须穿校服。"
      },
      {
        "q": "He _____ speak English, but he can speak Chinese.",
        "opts": [
          "can",
          "can't",
          "must"
        ],
        "ans": 1,
        "hint": "转折：不会英语。",
        "sentence": "He can't speak English, but he can speak Chinese.",
        "zh": "他不会说英语，但会说中文。"
      },
      {
        "q": "You _____ eat in the lab. It's dangerous.",
        "opts": [
          "should",
          "mustn't",
          "can"
        ],
        "ans": 1,
        "hint": "禁止用 mustn't。",
        "sentence": "You mustn't eat in the lab.",
        "zh": "实验室里不准吃东西。"
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
        "q": "It is raining. You _____ take an umbrella.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "给建议用 should + 动词原形。",
        "sentence": "You should wear a coat. It is cold today.",
        "zh": "你应该穿外套，今天很冷。"
      },
      {
        "q": "You _____ take an umbrella. It's raining.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should + 原形。",
        "sentence": "You should take an umbrella.",
        "zh": "你应该带伞。"
      },
      {
        "q": "_____ I use your pen?",
        "opts": [
          "Must",
          "Can",
          "Should to"
        ],
        "ans": 1,
        "hint": "请求许可用 Can I…?",
        "sentence": "Can I use your pen?",
        "zh": "我可以用你的笔吗？"
      },
      {
        "q": "Students _____ wear school uniforms.",
        "opts": [
          "must",
          "must to",
          "musts"
        ],
        "ans": 0,
        "hint": "校规必须 must。",
        "sentence": "Students must wear school uniforms.",
        "zh": "学生必须穿校服。"
      },
      {
        "q": "He _____ speak English, but he can speak Chinese.",
        "opts": [
          "can",
          "can't",
          "must"
        ],
        "ans": 1,
        "hint": "转折：不会英语。",
        "sentence": "He can't speak English, but he can speak Chinese.",
        "zh": "他不会说英语，但会说中文。"
      },
      {
        "q": "You _____ eat in the lab. It's dangerous.",
        "opts": [
          "should",
          "mustn't",
          "can"
        ],
        "ans": 1,
        "hint": "禁止用 mustn't。",
        "sentence": "You mustn't eat in the lab.",
        "zh": "实验室里不准吃东西。"
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
        "q": "It is raining. You _____ take an umbrella.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "给建议用 should + 动词原形。",
        "sentence": "You should wear a coat. It is cold today.",
        "zh": "你应该穿外套，今天很冷。"
      },
      {
        "q": "You _____ take an umbrella. It's raining.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should + 原形。",
        "sentence": "You should take an umbrella.",
        "zh": "你应该带伞。"
      },
      {
        "q": "_____ I use your pen?",
        "opts": [
          "Must",
          "Can",
          "Should to"
        ],
        "ans": 1,
        "hint": "请求许可用 Can I…?",
        "sentence": "Can I use your pen?",
        "zh": "我可以用你的笔吗？"
      },
      {
        "q": "Students _____ wear school uniforms.",
        "opts": [
          "must",
          "must to",
          "musts"
        ],
        "ans": 0,
        "hint": "校规必须 must。",
        "sentence": "Students must wear school uniforms.",
        "zh": "学生必须穿校服。"
      },
      {
        "q": "He _____ speak English, but he can speak Chinese.",
        "opts": [
          "can",
          "can't",
          "must"
        ],
        "ans": 1,
        "hint": "转折：不会英语。",
        "sentence": "He can't speak English, but he can speak Chinese.",
        "zh": "他不会说英语，但会说中文。"
      },
      {
        "q": "You _____ eat in the lab. It's dangerous.",
        "opts": [
          "should",
          "mustn't",
          "can"
        ],
        "ans": 1,
        "hint": "禁止用 mustn't。",
        "sentence": "You mustn't eat in the lab.",
        "zh": "实验室里不准吃东西。"
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
    "image": "l08-modals-hero.jpg",
    "pairs": [
      {
        "en": "can swim",
        "zh": "会游泳"
      },
      {
        "en": "should wear",
        "zh": "应该穿"
      },
      {
        "en": "must be quiet",
        "zh": "必须安静"
      },
      {
        "en": "Can you…?",
        "zh": "你能……吗？"
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
    "image": "l08-modals-hero.jpg",
    "audio": "We must be quiet in the library.",
    "opts": [
      "We must be quiet in the library.",
      "You should to wear a coat.",
      "You shoulds wear a coat."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "We must be quiet in the library.",
    "zh": "我们在图书馆必须保持安静。",
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
      "情态动词 + 动词原形（不加 to）",
      "can：能力/许可 Can you…?",
      "should：建议 You should…",
      "must：必须 We must…",
      "初中还将学习 have to（客观需要）与 mustn't ≠ don't have to。"
    ],
    "chant": "Can, should, must — base form next! No to, no s — that's the text!",
    "chantSpeak": "Can, should, must, base form next! No to, no s, that is the text!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "情态动词 can / should / must",
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