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
    "section": "精讲",
    "title": "情态动词 can",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-basketball.png",
    "lead": "can 表示能力或许可，后接动词原形。",
    "sentence": "I can play basketball.",
    "zh": "我会打篮球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "情态动词 should",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-umbrella.png",
    "lead": "should 表示建议，后接动词原形。",
    "sentence": "You should take an umbrella.",
    "zh": "你应该带伞。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
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
    "id": "p10",
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
    "id": "p11"
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
      },
      {
        "from": "She can play the piano.",
        "fromZh": "她会弹钢琴。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "She cannot play the piano.",
              "She can not to play the piano.",
              "She cans not play the piano."
            ],
            "ans": 0,
            "hint": "情态动词后加not",
            "sentence": "She cannot play the piano.",
            "zh": "她不会弹钢琴。"
          }
        ]
      },
      {
        "from": "You should wear a coat.",
        "fromZh": "你应该穿外套。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Should you wear a coat?",
              "Do you should wear a coat?",
              "Are you should wear a coat?"
            ],
            "ans": 0,
            "hint": "把should提到句首",
            "sentence": "Should you wear a coat?",
            "zh": "你应该穿外套吗？"
          }
        ]
      },
      {
        "from": "We must be quiet.",
        "fromZh": "我们必须安静。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "We must not be quiet.",
              "We don't must be quiet.",
              "We mustn't to be quiet."
            ],
            "ans": 0,
            "hint": "must后加not",
            "sentence": "We must not be quiet.",
            "zh": "我们不必安静。"
          }
        ]
      },
      {
        "from": "He can swim.",
        "fromZh": "他会游泳。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Can he swim?",
              "Does he can swim?",
              "Is he can swim?"
            ],
            "ans": 0,
            "hint": "把can提到句首",
            "sentence": "Can he swim?",
            "zh": "他会游泳吗？"
          }
        ]
      },
      {
        "from": "You should eat more vegetables.",
        "fromZh": "你应该多吃蔬菜。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "You should not eat more vegetables.",
              "You don't should eat more vegetables.",
              "You shouldn't to eat more vegetables."
            ],
            "ans": 0,
            "hint": "should后加not",
            "sentence": "You should not eat more vegetables.",
            "zh": "你不应该多吃蔬菜。"
          }
        ]
      },
      {
        "from": "She must finish her homework.",
        "fromZh": "她必须完成作业。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Must she finish her homework?",
              "Does she must finish her homework?",
              "Is she must finish her homework?"
            ],
            "ans": 0,
            "hint": "把must提到句首",
            "sentence": "Must she finish her homework?",
            "zh": "她必须完成作业吗？"
          }
        ]
      }
    ],
    "id": "p12"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3d-umbrella.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "You",
      "should",
      "take",
      "an",
      "umbrella"
    ],
    "sentence": "You should take an umbrella.",
    "zh": "你应该带伞。",
    "items": [
      {
        "tokens": [
          "You",
          "should",
          "take",
          "an",
          "umbrella"
        ],
        "sentence": "You should take an umbrella.",
        "zh": "你应该带伞。",
        "image": "kp3d-umbrella.png"
      },
      {
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
        "zh": "我们在图书馆必须安静。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "He",
          "can",
          "play",
          "basketball",
          "well"
        ],
        "sentence": "He can play basketball well.",
        "zh": "他篮球打得好。",
        "image": "kp3d-basketball.png"
      },
      {
        "tokens": [
          "She",
          "should",
          "eat",
          "more",
          "vegetables"
        ],
        "sentence": "She should eat more vegetables.",
        "zh": "她应该多吃蔬菜。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "Pandas",
          "can",
          "climb",
          "trees"
        ],
        "sentence": "Pandas can climb trees.",
        "zh": "熊猫会爬树。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "You",
          "must",
          "not",
          "be",
          "late",
          "for",
          "school"
        ],
        "sentence": "You must not be late for school.",
        "zh": "你上学不能迟到。",
        "image": "kp3d-bus.png"
      }
    ],
    "id": "p13"
  },
  {
    "id": "p14",
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
    "id": "p15",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "She _____ play the piano.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "情态动词后接动词原形",
        "sentence": "She can play the piano.",
        "zh": "她会弹钢琴。"
      },
      {
        "q": "You _____ wear a coat. It is cold.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should wear a coat. It is cold.",
        "zh": "你应该穿外套，天冷。"
      },
      {
        "q": "We _____ be quiet in the library.",
        "opts": [
          "must",
          "must to",
          "musts"
        ],
        "ans": 0,
        "hint": "must后接动词原形",
        "sentence": "We must be quiet in the library.",
        "zh": "我们在图书馆必须安静。"
      },
      {
        "q": "_____ I use your ruler?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can表示请求许可",
        "sentence": "Can I use your ruler?",
        "zh": "我能用你的尺子吗？"
      },
      {
        "q": "He _____ run fast.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can后接动词原形",
        "sentence": "He can run fast.",
        "zh": "他能跑得快。"
      },
      {
        "q": "You _____ eat more vegetables.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should eat more vegetables.",
        "zh": "你应该多吃蔬菜。"
      },
      {
        "q": "We _____ not play in the street.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "We must not play in the street.",
        "zh": "我们不许在街上玩。"
      },
      {
        "q": "_____ you help me?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力或请求",
        "sentence": "Can you help me?",
        "zh": "你能帮我吗？"
      },
      {
        "q": "She _____ finish her homework first.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "She should finish her homework first.",
        "zh": "她应该先完成作业。"
      },
      {
        "q": "They _____ play basketball after school.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示允许",
        "sentence": "They can play basketball after school.",
        "zh": "他们放学后可以打篮球。"
      }
    ],
    "id": "p16"
  },
  {
    "section": "检测",
    "title": "限时挑战 90 秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "lead": "题库已扩充：90 秒内尽量多答对。",
    "seconds": 90,
    "perQuestion": 12,
    "pass": 8,
    "pool": "questions",
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
      },
      {
        "q": "She _____ play the piano.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "情态动词后接动词原形",
        "sentence": "She can play the piano.",
        "zh": "她会弹钢琴。"
      },
      {
        "q": "You _____ wear a coat. It is cold.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should wear a coat. It is cold.",
        "zh": "你应该穿外套，天冷。"
      },
      {
        "q": "We _____ be quiet in the library.",
        "opts": [
          "must",
          "must to",
          "musts"
        ],
        "ans": 0,
        "hint": "must后接动词原形",
        "sentence": "We must be quiet in the library.",
        "zh": "我们在图书馆必须安静。"
      },
      {
        "q": "_____ I use your ruler?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can表示请求许可",
        "sentence": "Can I use your ruler?",
        "zh": "我能用你的尺子吗？"
      },
      {
        "q": "He _____ run fast.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can后接动词原形",
        "sentence": "He can run fast.",
        "zh": "他能跑得快。"
      },
      {
        "q": "You _____ eat more vegetables.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should eat more vegetables.",
        "zh": "你应该多吃蔬菜。"
      },
      {
        "q": "We _____ not play in the street.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "We must not play in the street.",
        "zh": "我们不许在街上玩。"
      },
      {
        "q": "_____ you help me?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力或请求",
        "sentence": "Can you help me?",
        "zh": "你能帮我吗？"
      },
      {
        "q": "She _____ finish her homework first.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "She should finish her homework first.",
        "zh": "她应该先完成作业。"
      },
      {
        "q": "They _____ play basketball after school.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示允许",
        "sentence": "They can play basketball after school.",
        "zh": "他们放学后可以打篮球。"
      },
      {
        "q": "You _____ not be late for class.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "You must not be late for class.",
        "zh": "你上课不能迟到。"
      },
      {
        "q": "_____ we go to the park?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can提出建议",
        "sentence": "Can we go to the park?",
        "zh": "我们能去公园吗？"
      },
      {
        "q": "He _____ speak English well.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can后接动词原形",
        "sentence": "He can speak English well.",
        "zh": "他英语说得好。"
      },
      {
        "q": "You _____ drink more water.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should drink more water.",
        "zh": "你应该多喝水。"
      },
      {
        "q": "We _____ wear helmets when riding bikes.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "We must wear helmets when riding bikes.",
        "zh": "我们骑自行车时必须戴头盔。"
      },
      {
        "q": "_____ you swim?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Can you swim?",
        "zh": "你会游泳吗？"
      },
      {
        "q": "She _____ practice the piano every day.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "She should practice the piano every day.",
        "zh": "她应该每天练习钢琴。"
      },
      {
        "q": "Students _____ listen to the teacher.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "Students must listen to the teacher.",
        "zh": "学生必须听老师的话。"
      },
      {
        "q": "I _____ see the panda at the zoo.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "I can see the panda at the zoo.",
        "zh": "我在动物园能看到熊猫。"
      },
      {
        "q": "You _____ take an umbrella. It might rain.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should表示建议",
        "sentence": "You should take an umbrella. It might rain.",
        "zh": "你应该带伞，可能要下雨。"
      },
      {
        "q": "We _____ not waste food.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "We must not waste food.",
        "zh": "我们不许浪费食物。"
      },
      {
        "q": "_____ I open the window?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can请求许可",
        "sentence": "Can I open the window?",
        "zh": "我能打开窗户吗？"
      },
      {
        "q": "He _____ do his homework before TV.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "He should do his homework before TV.",
        "zh": "他应该在看电视前做作业。"
      },
      {
        "q": "You _____ cross the road when the light is red.",
        "opts": [
          "must not",
          "musts not",
          "must to not"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "You must not cross the road when the light is red.",
        "zh": "红灯时你不能过马路。"
      },
      {
        "q": "_____ you play the guitar?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Can you play the guitar?",
        "zh": "你会弹吉他吗？"
      },
      {
        "q": "We _____ clean our classroom every day.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should表示建议",
        "sentence": "We should clean our classroom every day.",
        "zh": "我们应该每天打扫教室。"
      },
      {
        "q": "The students _____ be quiet in the library.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "The students must be quiet in the library.",
        "zh": "学生们在图书馆必须安静。"
      },
      {
        "q": "Pandas _____ climb trees.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Pandas can climb trees.",
        "zh": "熊猫会爬树。"
      }
    ],
    "id": "p17"
  },
  {
    "section": "检测",
    "title": "连对闯关",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "lead": "连续答对 8 题通关，答错连击清零。题库已加厚。",
    "target": 8,
    "pool": "questions",
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
      },
      {
        "q": "She _____ play the piano.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "情态动词后接动词原形",
        "sentence": "She can play the piano.",
        "zh": "她会弹钢琴。"
      },
      {
        "q": "You _____ wear a coat. It is cold.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should wear a coat. It is cold.",
        "zh": "你应该穿外套，天冷。"
      },
      {
        "q": "We _____ be quiet in the library.",
        "opts": [
          "must",
          "must to",
          "musts"
        ],
        "ans": 0,
        "hint": "must后接动词原形",
        "sentence": "We must be quiet in the library.",
        "zh": "我们在图书馆必须安静。"
      },
      {
        "q": "_____ I use your ruler?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can表示请求许可",
        "sentence": "Can I use your ruler?",
        "zh": "我能用你的尺子吗？"
      },
      {
        "q": "He _____ run fast.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can后接动词原形",
        "sentence": "He can run fast.",
        "zh": "他能跑得快。"
      },
      {
        "q": "You _____ eat more vegetables.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should eat more vegetables.",
        "zh": "你应该多吃蔬菜。"
      },
      {
        "q": "We _____ not play in the street.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "We must not play in the street.",
        "zh": "我们不许在街上玩。"
      },
      {
        "q": "_____ you help me?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力或请求",
        "sentence": "Can you help me?",
        "zh": "你能帮我吗？"
      },
      {
        "q": "She _____ finish her homework first.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "She should finish her homework first.",
        "zh": "她应该先完成作业。"
      },
      {
        "q": "They _____ play basketball after school.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示允许",
        "sentence": "They can play basketball after school.",
        "zh": "他们放学后可以打篮球。"
      },
      {
        "q": "You _____ not be late for class.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "You must not be late for class.",
        "zh": "你上课不能迟到。"
      },
      {
        "q": "_____ we go to the park?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can提出建议",
        "sentence": "Can we go to the park?",
        "zh": "我们能去公园吗？"
      },
      {
        "q": "He _____ speak English well.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can后接动词原形",
        "sentence": "He can speak English well.",
        "zh": "他英语说得好。"
      },
      {
        "q": "You _____ drink more water.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should drink more water.",
        "zh": "你应该多喝水。"
      },
      {
        "q": "We _____ wear helmets when riding bikes.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "We must wear helmets when riding bikes.",
        "zh": "我们骑自行车时必须戴头盔。"
      },
      {
        "q": "_____ you swim?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Can you swim?",
        "zh": "你会游泳吗？"
      },
      {
        "q": "She _____ practice the piano every day.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "She should practice the piano every day.",
        "zh": "她应该每天练习钢琴。"
      },
      {
        "q": "Students _____ listen to the teacher.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "Students must listen to the teacher.",
        "zh": "学生必须听老师的话。"
      },
      {
        "q": "I _____ see the panda at the zoo.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "I can see the panda at the zoo.",
        "zh": "我在动物园能看到熊猫。"
      },
      {
        "q": "You _____ take an umbrella. It might rain.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should表示建议",
        "sentence": "You should take an umbrella. It might rain.",
        "zh": "你应该带伞，可能要下雨。"
      },
      {
        "q": "We _____ not waste food.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "We must not waste food.",
        "zh": "我们不许浪费食物。"
      },
      {
        "q": "_____ I open the window?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can请求许可",
        "sentence": "Can I open the window?",
        "zh": "我能打开窗户吗？"
      },
      {
        "q": "He _____ do his homework before TV.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "He should do his homework before TV.",
        "zh": "他应该在看电视前做作业。"
      },
      {
        "q": "You _____ cross the road when the light is red.",
        "opts": [
          "must not",
          "musts not",
          "must to not"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "You must not cross the road when the light is red.",
        "zh": "红灯时你不能过马路。"
      },
      {
        "q": "_____ you play the guitar?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Can you play the guitar?",
        "zh": "你会弹吉他吗？"
      },
      {
        "q": "We _____ clean our classroom every day.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should表示建议",
        "sentence": "We should clean our classroom every day.",
        "zh": "我们应该每天打扫教室。"
      },
      {
        "q": "The students _____ be quiet in the library.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "The students must be quiet in the library.",
        "zh": "学生们在图书馆必须安静。"
      },
      {
        "q": "Pandas _____ climb trees.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Pandas can climb trees.",
        "zh": "熊猫会爬树。"
      }
    ],
    "id": "p18"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "l08-modals-hero.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "can play basketball",
        "zh": "会打篮球"
      },
      {
        "en": "should wear a coat",
        "zh": "应该穿外套"
      },
      {
        "en": "should drink water",
        "zh": "应该喝水"
      },
      {
        "en": "must not run",
        "zh": "不许跑"
      },
      {
        "en": "can help",
        "zh": "能帮忙"
      },
      {
        "en": "should read",
        "zh": "应该阅读"
      },
      {
        "en": "must listen",
        "zh": "必须听"
      },
      {
        "en": "can climb",
        "zh": "会爬"
      }
    ],
    "id": "p19"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l08-modals-hero.jpg",
    "audio": "You should wear a coat.",
    "opts": [
      "You should wear a coat.",
      "You must wear a coat.",
      "You can wear a coat."
    ],
    "ans": 0,
    "hint": "注意should",
    "sentence": "You should wear a coat.",
    "zh": "你应该穿外套。",
    "questions": [
      {
        "audio": "You should wear a coat.",
        "opts": [
          "You should wear a coat.",
          "You must wear a coat.",
          "You can wear a coat."
        ],
        "ans": 0,
        "hint": "注意should",
        "zh": "你应该穿外套。",
        "sentence": "You should wear a coat."
      },
      {
        "audio": "We must be quiet in the library.",
        "opts": [
          "We must be quiet in the library.",
          "We can be quiet in the library.",
          "We should be quiet in the library."
        ],
        "ans": 0,
        "hint": "注意must",
        "zh": "我们在图书馆必须安静。",
        "sentence": "We must be quiet in the library."
      },
      {
        "audio": "Can you play the piano?",
        "opts": [
          "Can you play the piano?",
          "Should you play the piano?",
          "Must you play the piano?"
        ],
        "ans": 0,
        "hint": "注意can",
        "zh": "你会弹钢琴吗？",
        "sentence": "Can you play the piano?"
      },
      {
        "audio": "You should drink more water.",
        "opts": [
          "You should drink more water.",
          "You must drink more water.",
          "You can drink more water."
        ],
        "ans": 0,
        "hint": "注意should",
        "zh": "你应该多喝水。",
        "sentence": "You should drink more water."
      },
      {
        "audio": "We must not run in the hallway.",
        "opts": [
          "We must not run in the hallway.",
          "We can not run in the hallway.",
          "We should not run in the hallway."
        ],
        "ans": 0,
        "hint": "注意must not",
        "zh": "我们不许在走廊里跑。",
        "sentence": "We must not run in the hallway."
      },
      {
        "audio": "He can swim very fast.",
        "opts": [
          "He can swim very fast.",
          "He should swim very fast.",
          "He must swim very fast."
        ],
        "ans": 0,
        "hint": "注意can",
        "zh": "他游泳很快。",
        "sentence": "He can swim very fast."
      },
      {
        "audio": "She should finish her homework first.",
        "opts": [
          "She should finish her homework first.",
          "She must finish her homework first.",
          "She can finish her homework first."
        ],
        "ans": 0,
        "hint": "注意should",
        "zh": "她应该先完成作业。",
        "sentence": "She should finish her homework first."
      },
      {
        "audio": "You must wear a helmet.",
        "opts": [
          "You must wear a helmet.",
          "You should wear a helmet.",
          "You can wear a helmet."
        ],
        "ans": 0,
        "hint": "注意must",
        "zh": "你必须戴头盔。",
        "sentence": "You must wear a helmet."
      }
    ],
    "id": "p20"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "l08-modals-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I can swim in the pool.",
        "zh": "我会在游泳池里游泳。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "Can I use your pen?",
        "zh": "我能用你的钢笔吗？",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She can play the piano very well.",
        "zh": "她钢琴弹得很好。",
        "tag": "daily_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "We must wear school uniforms on Monday.",
        "zh": "星期一我们必须穿校服。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "You should eat more vegetables.",
        "zh": "你应该多吃蔬菜。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He can ride a bike to school.",
        "zh": "他会骑自行车上学。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Should I take an umbrella?",
        "zh": "我应该带伞吗？",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "We must not run in the hallway.",
        "zh": "我们不许在走廊里跑。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Can you help me with my homework?",
        "zh": "你能帮我做作业吗？",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "You should brush your teeth twice a day.",
        "zh": "你应该每天刷两次牙。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She must finish her homework before dinner.",
        "zh": "她必须在晚饭前完成作业。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "They can play basketball after school.",
        "zh": "他们放学后可以打篮球。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "We must listen to the teacher in class.",
        "zh": "上课时我们必须听老师讲。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Can I go to the restroom?",
        "zh": "我可以去洗手间吗？",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "You should drink more water.",
        "zh": "你应该多喝水。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He can speak English and Chinese.",
        "zh": "他会说英语和中文。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We must save water.",
        "zh": "我们必须节约用水。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "You should read books every day.",
        "zh": "你应该每天读书。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Pandas can climb trees.",
        "zh": "熊猫会爬树。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "We must protect the environment.",
        "zh": "我们必须保护环境。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "You should not eat too much candy.",
        "zh": "你不应该吃太多糖。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Can you see the panda in the zoo?",
        "zh": "你能看到动物园里的熊猫吗？",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Students must not be late for school.",
        "zh": "学生上学不能迟到。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "We should help our parents at home.",
        "zh": "我们应该在家帮助父母。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      }
    ],
    "id": "p21"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "l08-modals-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "You _____ not be late for class.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "You must not be late for class.",
        "zh": "你上课不能迟到。"
      },
      {
        "q": "_____ we go to the park?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can提出建议",
        "sentence": "Can we go to the park?",
        "zh": "我们能去公园吗？"
      },
      {
        "q": "He _____ speak English well.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can后接动词原形",
        "sentence": "He can speak English well.",
        "zh": "他英语说得好。"
      },
      {
        "q": "You _____ drink more water.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "You should drink more water.",
        "zh": "你应该多喝水。"
      },
      {
        "q": "We _____ wear helmets when riding bikes.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "We must wear helmets when riding bikes.",
        "zh": "我们骑自行车时必须戴头盔。"
      },
      {
        "q": "_____ you swim?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Can you swim?",
        "zh": "你会游泳吗？"
      },
      {
        "q": "She _____ practice the piano every day.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "She should practice the piano every day.",
        "zh": "她应该每天练习钢琴。"
      },
      {
        "q": "Students _____ listen to the teacher.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "Students must listen to the teacher.",
        "zh": "学生必须听老师的话。"
      },
      {
        "q": "I _____ see the panda at the zoo.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "I can see the panda at the zoo.",
        "zh": "我在动物园能看到熊猫。"
      },
      {
        "q": "You _____ take an umbrella. It might rain.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should表示建议",
        "sentence": "You should take an umbrella. It might rain.",
        "zh": "你应该带伞，可能要下雨。"
      },
      {
        "q": "We _____ not waste food.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "We must not waste food.",
        "zh": "我们不许浪费食物。"
      },
      {
        "q": "_____ I open the window?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "用can请求许可",
        "sentence": "Can I open the window?",
        "zh": "我能打开窗户吗？"
      },
      {
        "q": "He _____ do his homework before TV.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should后接动词原形",
        "sentence": "He should do his homework before TV.",
        "zh": "他应该在看电视前做作业。"
      },
      {
        "q": "You _____ cross the road when the light is red.",
        "opts": [
          "must not",
          "musts not",
          "must to not"
        ],
        "ans": 0,
        "hint": "must not表示禁止",
        "sentence": "You must not cross the road when the light is red.",
        "zh": "红灯时你不能过马路。"
      },
      {
        "q": "_____ you play the guitar?",
        "opts": [
          "Can",
          "Shoulds",
          "Musts"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Can you play the guitar?",
        "zh": "你会弹吉他吗？"
      },
      {
        "q": "We _____ clean our classroom every day.",
        "opts": [
          "should",
          "shoulds",
          "should to"
        ],
        "ans": 0,
        "hint": "should表示建议",
        "sentence": "We should clean our classroom every day.",
        "zh": "我们应该每天打扫教室。"
      },
      {
        "q": "The students _____ be quiet in the library.",
        "opts": [
          "must",
          "musts",
          "must to"
        ],
        "ans": 0,
        "hint": "must表示必须",
        "sentence": "The students must be quiet in the library.",
        "zh": "学生们在图书馆必须安静。"
      },
      {
        "q": "Pandas _____ climb trees.",
        "opts": [
          "can",
          "cans",
          "can to"
        ],
        "ans": 0,
        "hint": "can表示能力",
        "sentence": "Pandas can climb trees.",
        "zh": "熊猫会爬树。"
      }
    ],
    "id": "p22"
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
    "id": "p23"
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