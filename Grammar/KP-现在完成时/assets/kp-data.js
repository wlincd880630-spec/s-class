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
    "section": "精讲",
    "title": "现在完成时 · 基本构成",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "用 have/has + 过去分词表示已经发生的动作。",
    "sentence": "She has finished her homework.",
    "zh": "她已经完成了作业。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "标志词 already / yet",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "already 用于肯定句，yet 用于否定和疑问句。",
    "sentence": "I have already eaten. / I haven't eaten yet.",
    "zh": "我已经吃了。/ 我还没吃。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "for 和 since 的用法",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "for 接时间段，since 接时间点。",
    "sentence": "He has worked here for ten years. / since 2015.",
    "zh": "他在这里工作十年了。/ 从2015年起。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
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
    "id": "p11",
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
    "id": "p12"
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
      },
      {
        "from": "I saw him yesterday.",
        "fromZh": "我昨天看见他了。",
        "steps": [
          {
            "label": "改成现在完成时（但注意不能用 yesterday）",
            "opts": [
              "I have seen him.",
              "I have seen him yesterday.",
              "I has seen him."
            ],
            "ans": 0,
            "hint": "yesterday 是过去时间，不能与现在完成时连用",
            "sentence": "I have seen him.",
            "zh": "我已经见过他了。"
          }
        ]
      },
      {
        "from": "She finishes her homework.",
        "fromZh": "她完成作业。",
        "steps": [
          {
            "label": "改成现在完成时（已经完成）",
            "opts": [
              "She has finished her homework.",
              "She have finished her homework.",
              "She finished her homework."
            ],
            "ans": 0,
            "hint": "主语 she 用 has，动词用过去分词",
            "sentence": "She has finished her homework.",
            "zh": "她已经完成了作业。"
          }
        ]
      },
      {
        "from": "They live in Chengdu.",
        "fromZh": "他们住在成都。",
        "steps": [
          {
            "label": "改成现在完成时（从2015年起）",
            "opts": [
              "They have lived in Chengdu since 2015.",
              "They has lived in Chengdu since 2015.",
              "They lived in Chengdu since 2015."
            ],
            "ans": 0,
            "hint": "主语 they 用 have，since 接时间点",
            "sentence": "They have lived in Chengdu since 2015.",
            "zh": "他们从2015年起就住在成都。"
          }
        ]
      },
      {
        "from": "He buys a new football.",
        "fromZh": "他买一个新足球。",
        "steps": [
          {
            "label": "改成现在完成时（刚刚）",
            "opts": [
              "He has just bought a new football.",
              "He have just bought a new football.",
              "He has just buy a new football."
            ],
            "ans": 0,
            "hint": "主语 he 用 has，buy 的过去分词是 bought",
            "sentence": "He has just bought a new football.",
            "zh": "他刚买了一个新足球。"
          }
        ]
      },
      {
        "from": "We visit the panda base.",
        "fromZh": "我们参观熊猫基地。",
        "steps": [
          {
            "label": "改成现在完成时（已经去过两次）",
            "opts": [
              "We have visited the panda base twice.",
              "We has visited the panda base twice.",
              "We have visit the panda base twice."
            ],
            "ans": 0,
            "hint": "主语 we 用 have，visit 的过去分词是 visited",
            "sentence": "We have visited the panda base twice.",
            "zh": "我们已经参观过熊猫基地两次。"
          }
        ]
      },
      {
        "from": "I eat my breakfast.",
        "fromZh": "我吃早饭。",
        "steps": [
          {
            "label": "改成现在完成时（已经吃了）",
            "opts": [
              "I have already eaten my breakfast.",
              "I has already eaten my breakfast.",
              "I have already eat my breakfast."
            ],
            "ans": 0,
            "hint": "主语 I 用 have，eat 的过去分词是 eaten",
            "sentence": "I have already eaten my breakfast.",
            "zh": "我已经吃过早饭了。"
          }
        ]
      }
    ],
    "id": "p13"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3d-classroom.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "She",
      "has",
      "finished",
      "her",
      "homework"
    ],
    "sentence": "She has finished her homework.",
    "zh": "她已经完成了作业。",
    "items": [
      {
        "tokens": [
          "She",
          "has",
          "finished",
          "her",
          "homework"
        ],
        "sentence": "She has finished her homework.",
        "zh": "她已经完成了作业。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "They",
          "have",
          "played",
          "basketball",
          "for",
          "an",
          "hour"
        ],
        "sentence": "They have played basketball for an hour.",
        "zh": "他们打篮球一个小时了。",
        "image": "kp3d-basketball.png"
      },
      {
        "tokens": [
          "I",
          "have",
          "lost",
          "my",
          "umbrella"
        ],
        "sentence": "I have lost my umbrella.",
        "zh": "我把伞丢了。",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "We",
          "have",
          "visited",
          "the",
          "panda",
          "base",
          "twice"
        ],
        "sentence": "We have visited the panda base twice.",
        "zh": "我们参观过熊猫基地两次。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "He",
          "has",
          "just",
          "bought",
          "a",
          "new",
          "football"
        ],
        "sentence": "He has just bought a new football.",
        "zh": "他刚买了一个新足球。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "My",
          "mother",
          "has",
          "cooked",
          "dinner"
        ],
        "sentence": "My mother has cooked dinner.",
        "zh": "我妈妈已经做了晚饭。",
        "image": "kp3d-dinner.png"
      }
    ],
    "id": "p14"
  },
  {
    "id": "p15",
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
    "id": "p16",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "I _____ my homework already.",
        "opts": [
          "have finished",
          "has finished",
          "finish"
        ],
        "ans": 0,
        "hint": "主语 I 用 have",
        "sentence": "I have finished my homework already.",
        "zh": "我已经完成作业了。"
      },
      {
        "q": "She _____ to the shop.",
        "opts": [
          "has gone",
          "have gone",
          "go"
        ],
        "ans": 0,
        "hint": "主语 she 用 has",
        "sentence": "She has gone to the shop.",
        "zh": "她去商店了。"
      },
      {
        "q": "We _____ in Chengdu since 2010.",
        "opts": [
          "have lived",
          "has lived",
          "live"
        ],
        "ans": 0,
        "hint": "主语 we 用 have",
        "sentence": "We have lived in Chengdu since 2010.",
        "zh": "我们从2010年起就住在成都。"
      },
      {
        "q": "He _____ not finished his homework yet.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "主语 he 用 has",
        "sentence": "He has not finished his homework yet.",
        "zh": "他还没完成作业。"
      },
      {
        "q": "They _____ already eaten lunch.",
        "opts": [
          "have",
          "has",
          "are"
        ],
        "ans": 0,
        "hint": "主语 they 用 have",
        "sentence": "They have already eaten lunch.",
        "zh": "他们已经吃过午饭了。"
      },
      {
        "q": "_____ you ever seen a panda?",
        "opts": [
          "Have",
          "Has",
          "Do"
        ],
        "ans": 0,
        "hint": "主语 you 用 have",
        "sentence": "Have you ever seen a panda?",
        "zh": "你见过熊猫吗？"
      },
      {
        "q": "My mother _____ cooked dinner.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "my mother 是第三人称单数",
        "sentence": "My mother has cooked dinner.",
        "zh": "我妈妈已经做了晚饭。"
      },
      {
        "q": "The bus _____ already left.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "the bus 是单数",
        "sentence": "The bus has already left.",
        "zh": "公交车已经开走了。"
      },
      {
        "q": "I have lived here _____ 2015.",
        "opts": [
          "since",
          "for",
          "at"
        ],
        "ans": 0,
        "hint": "since 接时间点",
        "sentence": "I have lived here since 2015.",
        "zh": "我从2015年起就住在这里。"
      },
      {
        "q": "She has studied English _____ three years.",
        "opts": [
          "for",
          "since",
          "in"
        ],
        "ans": 0,
        "hint": "for 接时间段",
        "sentence": "She has studied English for three years.",
        "zh": "她学英语已经三年了。"
      }
    ],
    "id": "p17"
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
      },
      {
        "q": "I _____ my homework already.",
        "opts": [
          "have finished",
          "has finished",
          "finish"
        ],
        "ans": 0,
        "hint": "主语 I 用 have",
        "sentence": "I have finished my homework already.",
        "zh": "我已经完成作业了。"
      },
      {
        "q": "She _____ to the shop.",
        "opts": [
          "has gone",
          "have gone",
          "go"
        ],
        "ans": 0,
        "hint": "主语 she 用 has",
        "sentence": "She has gone to the shop.",
        "zh": "她去商店了。"
      },
      {
        "q": "We _____ in Chengdu since 2010.",
        "opts": [
          "have lived",
          "has lived",
          "live"
        ],
        "ans": 0,
        "hint": "主语 we 用 have",
        "sentence": "We have lived in Chengdu since 2010.",
        "zh": "我们从2010年起就住在成都。"
      },
      {
        "q": "He _____ not finished his homework yet.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "主语 he 用 has",
        "sentence": "He has not finished his homework yet.",
        "zh": "他还没完成作业。"
      },
      {
        "q": "They _____ already eaten lunch.",
        "opts": [
          "have",
          "has",
          "are"
        ],
        "ans": 0,
        "hint": "主语 they 用 have",
        "sentence": "They have already eaten lunch.",
        "zh": "他们已经吃过午饭了。"
      },
      {
        "q": "_____ you ever seen a panda?",
        "opts": [
          "Have",
          "Has",
          "Do"
        ],
        "ans": 0,
        "hint": "主语 you 用 have",
        "sentence": "Have you ever seen a panda?",
        "zh": "你见过熊猫吗？"
      },
      {
        "q": "My mother _____ cooked dinner.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "my mother 是第三人称单数",
        "sentence": "My mother has cooked dinner.",
        "zh": "我妈妈已经做了晚饭。"
      },
      {
        "q": "The bus _____ already left.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "the bus 是单数",
        "sentence": "The bus has already left.",
        "zh": "公交车已经开走了。"
      },
      {
        "q": "I have lived here _____ 2015.",
        "opts": [
          "since",
          "for",
          "at"
        ],
        "ans": 0,
        "hint": "since 接时间点",
        "sentence": "I have lived here since 2015.",
        "zh": "我从2015年起就住在这里。"
      },
      {
        "q": "She has studied English _____ three years.",
        "opts": [
          "for",
          "since",
          "in"
        ],
        "ans": 0,
        "hint": "for 接时间段",
        "sentence": "She has studied English for three years.",
        "zh": "她学英语已经三年了。"
      },
      {
        "q": "He hasn't finished his homework _____.",
        "opts": [
          "yet",
          "already",
          "just"
        ],
        "ans": 0,
        "hint": "否定句用 yet",
        "sentence": "He hasn't finished his homework yet.",
        "zh": "他还没完成作业。"
      },
      {
        "q": "I have _____ seen such a big hotpot.",
        "opts": [
          "never",
          "ever",
          "yet"
        ],
        "ans": 0,
        "hint": "never 表示从未",
        "sentence": "I have never seen such a big hotpot.",
        "zh": "我从未见过这么大的火锅。"
      },
      {
        "q": "Have you _____ been to the Great Wall?",
        "opts": [
          "ever",
          "never",
          "yet"
        ],
        "ans": 0,
        "hint": "疑问句用 ever",
        "sentence": "Have you ever been to the Great Wall?",
        "zh": "你去过长城吗？"
      },
      {
        "q": "They have visited the panda base _____ so far.",
        "opts": [
          "twice",
          "two times ago",
          "yesterday"
        ],
        "ans": 0,
        "hint": "so far 常与现在完成时连用",
        "sentence": "They have visited the panda base twice so far.",
        "zh": "到目前为止他们参观过熊猫基地两次。"
      },
      {
        "q": "I _____ my keys. I can't find them.",
        "opts": [
          "have lost",
          "has lost",
          "lost"
        ],
        "ans": 0,
        "hint": "强调对现在的影响",
        "sentence": "I have lost my keys. I can't find them.",
        "zh": "我把钥匙丢了，找不到了。"
      },
      {
        "q": "She _____ in the library for two hours.",
        "opts": [
          "has studied",
          "have studied",
          "studies"
        ],
        "ans": 0,
        "hint": "主语 she 用 has",
        "sentence": "She has studied in the library for two hours.",
        "zh": "她在图书馆学习两个小时了。"
      },
      {
        "q": "We _____ already eaten dinner.",
        "opts": [
          "have",
          "has",
          "are"
        ],
        "ans": 0,
        "hint": "主语 we 用 have",
        "sentence": "We have already eaten dinner.",
        "zh": "我们已经吃过晚饭了。"
      },
      {
        "q": "The cat _____ caught a mouse.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "the cat 是单数",
        "sentence": "The cat has caught a mouse.",
        "zh": "猫抓到了一只老鼠。"
      },
      {
        "q": "I have _____ my umbrella. It's raining.",
        "opts": [
          "lost",
          "lose",
          "losing"
        ],
        "ans": 0,
        "hint": "过去分词 lost",
        "sentence": "I have lost my umbrella. It's raining.",
        "zh": "我把伞丢了，天在下雨。"
      },
      {
        "q": "She has _____ her piano lesson.",
        "opts": [
          "finished",
          "finish",
          "finishes"
        ],
        "ans": 0,
        "hint": "过去分词 finished",
        "sentence": "She has finished her piano lesson.",
        "zh": "她上完钢琴课了。"
      },
      {
        "q": "They have played basketball _____ an hour.",
        "opts": [
          "for",
          "since",
          "in"
        ],
        "ans": 0,
        "hint": "for 接时间段",
        "sentence": "They have played basketball for an hour.",
        "zh": "他们打篮球一个小时了。"
      },
      {
        "q": "My father has worked in this hospital _____ 2010.",
        "opts": [
          "since",
          "for",
          "at"
        ],
        "ans": 0,
        "hint": "since 接时间点",
        "sentence": "My father has worked in this hospital since 2010.",
        "zh": "我父亲从2010年起就在这家医院工作。"
      },
      {
        "q": "I have never _____ a horse.",
        "opts": [
          "ridden",
          "rode",
          "ride"
        ],
        "ans": 0,
        "hint": "过去分词 ridden",
        "sentence": "I have never ridden a horse.",
        "zh": "我从未骑过马。"
      },
      {
        "q": "Have you _____ your homework yet?",
        "opts": [
          "finished",
          "finish",
          "finishes"
        ],
        "ans": 0,
        "hint": "过去分词 finished",
        "sentence": "Have you finished your homework yet?",
        "zh": "你完成作业了吗？"
      },
      {
        "q": "She has _____ to the shop.",
        "opts": [
          "gone",
          "went",
          "goes"
        ],
        "ans": 0,
        "hint": "过去分词 gone",
        "sentence": "She has gone to the shop.",
        "zh": "她去商店了。"
      },
      {
        "q": "We have known each other _____ primary school.",
        "opts": [
          "since",
          "for",
          "from"
        ],
        "ans": 0,
        "hint": "since 接起点",
        "sentence": "We have known each other since primary school.",
        "zh": "我们从小学就认识。"
      },
      {
        "q": "I have read this book _____.",
        "opts": [
          "before",
          "yesterday",
          "last week"
        ],
        "ans": 0,
        "hint": "before 常用于现在完成时",
        "sentence": "I have read this book before.",
        "zh": "我以前读过这本书。"
      }
    ],
    "id": "p18"
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
      },
      {
        "q": "I _____ my homework already.",
        "opts": [
          "have finished",
          "has finished",
          "finish"
        ],
        "ans": 0,
        "hint": "主语 I 用 have",
        "sentence": "I have finished my homework already.",
        "zh": "我已经完成作业了。"
      },
      {
        "q": "She _____ to the shop.",
        "opts": [
          "has gone",
          "have gone",
          "go"
        ],
        "ans": 0,
        "hint": "主语 she 用 has",
        "sentence": "She has gone to the shop.",
        "zh": "她去商店了。"
      },
      {
        "q": "We _____ in Chengdu since 2010.",
        "opts": [
          "have lived",
          "has lived",
          "live"
        ],
        "ans": 0,
        "hint": "主语 we 用 have",
        "sentence": "We have lived in Chengdu since 2010.",
        "zh": "我们从2010年起就住在成都。"
      },
      {
        "q": "He _____ not finished his homework yet.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "主语 he 用 has",
        "sentence": "He has not finished his homework yet.",
        "zh": "他还没完成作业。"
      },
      {
        "q": "They _____ already eaten lunch.",
        "opts": [
          "have",
          "has",
          "are"
        ],
        "ans": 0,
        "hint": "主语 they 用 have",
        "sentence": "They have already eaten lunch.",
        "zh": "他们已经吃过午饭了。"
      },
      {
        "q": "_____ you ever seen a panda?",
        "opts": [
          "Have",
          "Has",
          "Do"
        ],
        "ans": 0,
        "hint": "主语 you 用 have",
        "sentence": "Have you ever seen a panda?",
        "zh": "你见过熊猫吗？"
      },
      {
        "q": "My mother _____ cooked dinner.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "my mother 是第三人称单数",
        "sentence": "My mother has cooked dinner.",
        "zh": "我妈妈已经做了晚饭。"
      },
      {
        "q": "The bus _____ already left.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "the bus 是单数",
        "sentence": "The bus has already left.",
        "zh": "公交车已经开走了。"
      },
      {
        "q": "I have lived here _____ 2015.",
        "opts": [
          "since",
          "for",
          "at"
        ],
        "ans": 0,
        "hint": "since 接时间点",
        "sentence": "I have lived here since 2015.",
        "zh": "我从2015年起就住在这里。"
      },
      {
        "q": "She has studied English _____ three years.",
        "opts": [
          "for",
          "since",
          "in"
        ],
        "ans": 0,
        "hint": "for 接时间段",
        "sentence": "She has studied English for three years.",
        "zh": "她学英语已经三年了。"
      },
      {
        "q": "He hasn't finished his homework _____.",
        "opts": [
          "yet",
          "already",
          "just"
        ],
        "ans": 0,
        "hint": "否定句用 yet",
        "sentence": "He hasn't finished his homework yet.",
        "zh": "他还没完成作业。"
      },
      {
        "q": "I have _____ seen such a big hotpot.",
        "opts": [
          "never",
          "ever",
          "yet"
        ],
        "ans": 0,
        "hint": "never 表示从未",
        "sentence": "I have never seen such a big hotpot.",
        "zh": "我从未见过这么大的火锅。"
      },
      {
        "q": "Have you _____ been to the Great Wall?",
        "opts": [
          "ever",
          "never",
          "yet"
        ],
        "ans": 0,
        "hint": "疑问句用 ever",
        "sentence": "Have you ever been to the Great Wall?",
        "zh": "你去过长城吗？"
      },
      {
        "q": "They have visited the panda base _____ so far.",
        "opts": [
          "twice",
          "two times ago",
          "yesterday"
        ],
        "ans": 0,
        "hint": "so far 常与现在完成时连用",
        "sentence": "They have visited the panda base twice so far.",
        "zh": "到目前为止他们参观过熊猫基地两次。"
      },
      {
        "q": "I _____ my keys. I can't find them.",
        "opts": [
          "have lost",
          "has lost",
          "lost"
        ],
        "ans": 0,
        "hint": "强调对现在的影响",
        "sentence": "I have lost my keys. I can't find them.",
        "zh": "我把钥匙丢了，找不到了。"
      },
      {
        "q": "She _____ in the library for two hours.",
        "opts": [
          "has studied",
          "have studied",
          "studies"
        ],
        "ans": 0,
        "hint": "主语 she 用 has",
        "sentence": "She has studied in the library for two hours.",
        "zh": "她在图书馆学习两个小时了。"
      },
      {
        "q": "We _____ already eaten dinner.",
        "opts": [
          "have",
          "has",
          "are"
        ],
        "ans": 0,
        "hint": "主语 we 用 have",
        "sentence": "We have already eaten dinner.",
        "zh": "我们已经吃过晚饭了。"
      },
      {
        "q": "The cat _____ caught a mouse.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "the cat 是单数",
        "sentence": "The cat has caught a mouse.",
        "zh": "猫抓到了一只老鼠。"
      },
      {
        "q": "I have _____ my umbrella. It's raining.",
        "opts": [
          "lost",
          "lose",
          "losing"
        ],
        "ans": 0,
        "hint": "过去分词 lost",
        "sentence": "I have lost my umbrella. It's raining.",
        "zh": "我把伞丢了，天在下雨。"
      },
      {
        "q": "She has _____ her piano lesson.",
        "opts": [
          "finished",
          "finish",
          "finishes"
        ],
        "ans": 0,
        "hint": "过去分词 finished",
        "sentence": "She has finished her piano lesson.",
        "zh": "她上完钢琴课了。"
      },
      {
        "q": "They have played basketball _____ an hour.",
        "opts": [
          "for",
          "since",
          "in"
        ],
        "ans": 0,
        "hint": "for 接时间段",
        "sentence": "They have played basketball for an hour.",
        "zh": "他们打篮球一个小时了。"
      },
      {
        "q": "My father has worked in this hospital _____ 2010.",
        "opts": [
          "since",
          "for",
          "at"
        ],
        "ans": 0,
        "hint": "since 接时间点",
        "sentence": "My father has worked in this hospital since 2010.",
        "zh": "我父亲从2010年起就在这家医院工作。"
      },
      {
        "q": "I have never _____ a horse.",
        "opts": [
          "ridden",
          "rode",
          "ride"
        ],
        "ans": 0,
        "hint": "过去分词 ridden",
        "sentence": "I have never ridden a horse.",
        "zh": "我从未骑过马。"
      },
      {
        "q": "Have you _____ your homework yet?",
        "opts": [
          "finished",
          "finish",
          "finishes"
        ],
        "ans": 0,
        "hint": "过去分词 finished",
        "sentence": "Have you finished your homework yet?",
        "zh": "你完成作业了吗？"
      },
      {
        "q": "She has _____ to the shop.",
        "opts": [
          "gone",
          "went",
          "goes"
        ],
        "ans": 0,
        "hint": "过去分词 gone",
        "sentence": "She has gone to the shop.",
        "zh": "她去商店了。"
      },
      {
        "q": "We have known each other _____ primary school.",
        "opts": [
          "since",
          "for",
          "from"
        ],
        "ans": 0,
        "hint": "since 接起点",
        "sentence": "We have known each other since primary school.",
        "zh": "我们从小学就认识。"
      },
      {
        "q": "I have read this book _____.",
        "opts": [
          "before",
          "yesterday",
          "last week"
        ],
        "ans": 0,
        "hint": "before 常用于现在完成时",
        "sentence": "I have read this book before.",
        "zh": "我以前读过这本书。"
      }
    ],
    "id": "p19"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "w3-pp-hero.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "has gone",
        "zh": "已经去了"
      },
      {
        "en": "have lived",
        "zh": "已经居住"
      },
      {
        "en": "has eaten",
        "zh": "已经吃了"
      },
      {
        "en": "have seen",
        "zh": "已经看见"
      },
      {
        "en": "since 2015",
        "zh": "自从2015年"
      },
      {
        "en": "for three years",
        "zh": "三年了"
      },
      {
        "en": "already",
        "zh": "已经"
      },
      {
        "en": "so far",
        "zh": "到目前为止"
      }
    ],
    "id": "p20"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "w3-pp-hero.jpg",
    "audio": "I have already eaten my breakfast.",
    "opts": [
      "I have already eaten my breakfast.",
      "I have already eat my breakfast.",
      "I has already eaten my breakfast."
    ],
    "ans": 0,
    "hint": "注意 have 和 eaten",
    "sentence": "I have already eaten my breakfast.",
    "zh": "我已经吃过早饭了。",
    "questions": [
      {
        "audio": "I have already eaten my breakfast.",
        "opts": [
          "I have already eaten my breakfast.",
          "I have already eat my breakfast.",
          "I has already eaten my breakfast."
        ],
        "ans": 0,
        "hint": "注意 have 和 eaten",
        "zh": "我已经吃过早饭了。",
        "sentence": "I have already eaten my breakfast."
      },
      {
        "audio": "She has not finished her homework yet.",
        "opts": [
          "She has not finished her homework yet.",
          "She have not finished her homework yet.",
          "She has not finish her homework yet."
        ],
        "ans": 0,
        "hint": "主语 she 用 has，yet 用于否定",
        "zh": "她还没完成作业。",
        "sentence": "She has not finished her homework yet."
      },
      {
        "audio": "Have you ever seen a panda?",
        "opts": [
          "Have you ever seen a panda?",
          "Has you ever seen a panda?",
          "Have you ever saw a panda?"
        ],
        "ans": 0,
        "hint": "疑问句用 have，seen 是过去分词",
        "zh": "你见过熊猫吗？",
        "sentence": "Have you ever seen a panda?"
      },
      {
        "audio": "He has worked here for ten years.",
        "opts": [
          "He has worked here for ten years.",
          "He have worked here for ten years.",
          "He has worked here since ten years."
        ],
        "ans": 0,
        "hint": "主语 he 用 has，for 接时间段",
        "zh": "他在这里工作十年了。",
        "sentence": "He has worked here for ten years."
      },
      {
        "audio": "They have already cleaned the library.",
        "opts": [
          "They have already cleaned the library.",
          "They has already cleaned the library.",
          "They have already clean the library."
        ],
        "ans": 0,
        "hint": "主语 they 用 have，cleaned 是过去分词",
        "zh": "他们已经打扫了图书馆。",
        "sentence": "They have already cleaned the library."
      },
      {
        "audio": "I have never seen such a big hotpot.",
        "opts": [
          "I have never seen such a big hotpot.",
          "I have never saw such a big hotpot.",
          "I has never seen such a big hotpot."
        ],
        "ans": 0,
        "hint": "never 用现在完成时，seen 是过去分词",
        "zh": "我从未见过这么大的火锅。",
        "sentence": "I have never seen such a big hotpot."
      },
      {
        "audio": "She has gone to the shop.",
        "opts": [
          "She has gone to the shop.",
          "She have gone to the shop.",
          "She has went to the shop."
        ],
        "ans": 0,
        "hint": "主语 she 用 has，gone 是过去分词",
        "zh": "她去商店了。",
        "sentence": "She has gone to the shop."
      },
      {
        "audio": "We have known each other since primary school.",
        "opts": [
          "We have known each other since primary school.",
          "We has known each other since primary school.",
          "We have know each other since primary school."
        ],
        "ans": 0,
        "hint": "主语 we 用 have，known 是过去分词",
        "zh": "我们从小学就认识。",
        "sentence": "We have known each other since primary school."
      }
    ],
    "id": "p21"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "w3-pp-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I have already eaten my breakfast.",
        "zh": "我已经吃过早饭了。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She has not finished her homework yet.",
        "zh": "她还没完成作业。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We have lived in Chengdu since 2015.",
        "zh": "我们从2015年起就住在成都。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He has just bought a new football.",
        "zh": "他刚买了一个新足球。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "They have visited the panda base twice.",
        "zh": "他们参观过熊猫基地两次。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I have never seen such a big hotpot.",
        "zh": "我从未见过这么大的火锅。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "My mother has cooked dinner for us.",
        "zh": "我妈妈已经为我们做了晚饭。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The bus has already left.",
        "zh": "公交车已经开走了。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She has learned English for three years.",
        "zh": "她学英语已经三年了。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Have you ever been to Beijing?",
        "zh": "你去过北京吗？",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He has not come back yet.",
        "zh": "他还没回来。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We have known each other since primary school.",
        "zh": "我们从小学就认识。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "They have already cleaned the library.",
        "zh": "他们已经打扫了图书馆。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "I have read this book before.",
        "zh": "我以前读过这本书。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "She has written three letters so far.",
        "zh": "到目前为止她写了三封信。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Have you finished your homework yet?",
        "zh": "你完成作业了吗？",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I have just finished my piano lesson.",
        "zh": "我刚上完钢琴课。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "They have played basketball for an hour.",
        "zh": "他们打篮球已经一个小时了。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "She has gone to the shop to buy some milk.",
        "zh": "她去商店买牛奶了。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "We have seen the new movie already.",
        "zh": "我们已经看过那部新电影了。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "He has never ridden a horse.",
        "zh": "他从未骑过马。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My father has worked in this hospital since 2010.",
        "zh": "我父亲从2010年起就在这家医院工作。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The cat has caught a mouse.",
        "zh": "猫已经抓到了一只老鼠。",
        "tag": "writing_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "I have lost my umbrella somewhere.",
        "zh": "我把伞丢在某个地方了。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      }
    ],
    "id": "p22"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "w3-pp-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "He hasn't finished his homework _____.",
        "opts": [
          "yet",
          "already",
          "just"
        ],
        "ans": 0,
        "hint": "否定句用 yet",
        "sentence": "He hasn't finished his homework yet.",
        "zh": "他还没完成作业。"
      },
      {
        "q": "I have _____ seen such a big hotpot.",
        "opts": [
          "never",
          "ever",
          "yet"
        ],
        "ans": 0,
        "hint": "never 表示从未",
        "sentence": "I have never seen such a big hotpot.",
        "zh": "我从未见过这么大的火锅。"
      },
      {
        "q": "Have you _____ been to the Great Wall?",
        "opts": [
          "ever",
          "never",
          "yet"
        ],
        "ans": 0,
        "hint": "疑问句用 ever",
        "sentence": "Have you ever been to the Great Wall?",
        "zh": "你去过长城吗？"
      },
      {
        "q": "They have visited the panda base _____ so far.",
        "opts": [
          "twice",
          "two times ago",
          "yesterday"
        ],
        "ans": 0,
        "hint": "so far 常与现在完成时连用",
        "sentence": "They have visited the panda base twice so far.",
        "zh": "到目前为止他们参观过熊猫基地两次。"
      },
      {
        "q": "I _____ my keys. I can't find them.",
        "opts": [
          "have lost",
          "has lost",
          "lost"
        ],
        "ans": 0,
        "hint": "强调对现在的影响",
        "sentence": "I have lost my keys. I can't find them.",
        "zh": "我把钥匙丢了，找不到了。"
      },
      {
        "q": "She _____ in the library for two hours.",
        "opts": [
          "has studied",
          "have studied",
          "studies"
        ],
        "ans": 0,
        "hint": "主语 she 用 has",
        "sentence": "She has studied in the library for two hours.",
        "zh": "她在图书馆学习两个小时了。"
      },
      {
        "q": "We _____ already eaten dinner.",
        "opts": [
          "have",
          "has",
          "are"
        ],
        "ans": 0,
        "hint": "主语 we 用 have",
        "sentence": "We have already eaten dinner.",
        "zh": "我们已经吃过晚饭了。"
      },
      {
        "q": "The cat _____ caught a mouse.",
        "opts": [
          "has",
          "have",
          "is"
        ],
        "ans": 0,
        "hint": "the cat 是单数",
        "sentence": "The cat has caught a mouse.",
        "zh": "猫抓到了一只老鼠。"
      },
      {
        "q": "I have _____ my umbrella. It's raining.",
        "opts": [
          "lost",
          "lose",
          "losing"
        ],
        "ans": 0,
        "hint": "过去分词 lost",
        "sentence": "I have lost my umbrella. It's raining.",
        "zh": "我把伞丢了，天在下雨。"
      },
      {
        "q": "She has _____ her piano lesson.",
        "opts": [
          "finished",
          "finish",
          "finishes"
        ],
        "ans": 0,
        "hint": "过去分词 finished",
        "sentence": "She has finished her piano lesson.",
        "zh": "她上完钢琴课了。"
      },
      {
        "q": "They have played basketball _____ an hour.",
        "opts": [
          "for",
          "since",
          "in"
        ],
        "ans": 0,
        "hint": "for 接时间段",
        "sentence": "They have played basketball for an hour.",
        "zh": "他们打篮球一个小时了。"
      },
      {
        "q": "My father has worked in this hospital _____ 2010.",
        "opts": [
          "since",
          "for",
          "at"
        ],
        "ans": 0,
        "hint": "since 接时间点",
        "sentence": "My father has worked in this hospital since 2010.",
        "zh": "我父亲从2010年起就在这家医院工作。"
      },
      {
        "q": "I have never _____ a horse.",
        "opts": [
          "ridden",
          "rode",
          "ride"
        ],
        "ans": 0,
        "hint": "过去分词 ridden",
        "sentence": "I have never ridden a horse.",
        "zh": "我从未骑过马。"
      },
      {
        "q": "Have you _____ your homework yet?",
        "opts": [
          "finished",
          "finish",
          "finishes"
        ],
        "ans": 0,
        "hint": "过去分词 finished",
        "sentence": "Have you finished your homework yet?",
        "zh": "你完成作业了吗？"
      },
      {
        "q": "She has _____ to the shop.",
        "opts": [
          "gone",
          "went",
          "goes"
        ],
        "ans": 0,
        "hint": "过去分词 gone",
        "sentence": "She has gone to the shop.",
        "zh": "她去商店了。"
      },
      {
        "q": "We have known each other _____ primary school.",
        "opts": [
          "since",
          "for",
          "from"
        ],
        "ans": 0,
        "hint": "since 接起点",
        "sentence": "We have known each other since primary school.",
        "zh": "我们从小学就认识。"
      },
      {
        "q": "I have read this book _____.",
        "opts": [
          "before",
          "yesterday",
          "last week"
        ],
        "ans": 0,
        "hint": "before 常用于现在完成时",
        "sentence": "I have read this book before.",
        "zh": "我以前读过这本书。"
      }
    ],
    "id": "p23"
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
    "id": "p24"
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