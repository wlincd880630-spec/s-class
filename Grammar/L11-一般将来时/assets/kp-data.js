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
    "audio": "It will be sunny and warm next Monday.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。",
    "image": "l12-future-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l12-future-hero.jpg",
    "question": "next Monday 说明用什么时态？",
    "choices": [
      {
        "text": "一般将来时 will + 原形/be",
        "correct": true,
        "fb": "对了！next… → will。"
      },
      {
        "text": "一般过去时",
        "correct": false,
        "fb": "next Monday 是将来。"
      },
      {
        "text": "现在进行时",
        "correct": false,
        "fb": "没有 now/look 等标志。"
      }
    ],
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l12-future-hero.jpg",
    "lead": "将来要发生的事：will + 动词原形；状态用 will be。",
    "formula": "主语 + will + 动词原形　/　will be + 形容词",
    "parts": [
      {
        "mark": "will",
        "label": "所有人称相同",
        "example": "I/He/They will"
      },
      {
        "mark": "原形",
        "label": "不加 -s",
        "example": "go / have / visit"
      },
      {
        "mark": "标志",
        "label": "tomorrow / next…",
        "example": "next Monday"
      }
    ],
    "samples": [
      {
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "sentence": "We will have a school trip next month.",
        "zh": "下个月我们有学校郊游。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l12-now.jpg",
    "rightImage": "l12-future.jpg",
    "leftLabel": "现在 is",
    "rightLabel": "将来 will be",
    "leftSentence": "It is rainy today.",
    "leftZh": "今天在下雨。",
    "rightSentence": "It will be sunny next Monday.",
    "rightZh": "下周一将会晴朗。",
    "morphBase": "is",
    "morphPast": "will be",
    "morphHighlight": "will",
    "discovery": "将来：will + 动词原形；will be + 形容词/名词。"
  },
  {
    "section": "精讲",
    "title": "例句 · will be",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l12-future-hero.jpg",
    "lead": "天气/状态：will be + 形容词。",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · will + 原形",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l12-future-hero.jpg",
    "lead": "所有人称都用 will，动词不加 s。",
    "sentence": "She will visit Beijing next year.",
    "zh": "她明年将去北京。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "will 的用法",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "will 后接动词原形，表示将来。",
    "sentence": "I will go to school tomorrow.",
    "zh": "我明天将去上学。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "will be 的用法",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-umbrella.png",
    "lead": "will be 后接形容词或名词，表示将来状态。",
    "sentence": "It will be sunny tomorrow.",
    "zh": "明天将是晴天。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "will 的疑问句",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-piano.png",
    "lead": "将 will 提到句首，构成一般疑问句。",
    "sentence": "Will you come to my party?",
    "zh": "你会来我的聚会吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l12-future-hero.jpg",
    "rules": [
      {
        "tab": "will + 动词",
        "rule": "will + 动词原形",
        "focusVerb": "will visit",
        "examples": [
          {
            "from": "go",
            "to": "will go"
          },
          {
            "from": "have",
            "to": "will have"
          }
        ],
        "sample": "We will have a school trip next month.",
        "sampleZh": "下个月我们有学校郊游。"
      },
      {
        "tab": "will be",
        "rule": "will be + 形容词/名词",
        "focusVerb": "will be",
        "examples": [
          {
            "from": "sunny",
            "to": "will be sunny"
          }
        ],
        "sample": "It will be sunny and warm next Monday.",
        "sampleZh": "下周一将会晴朗温暖。"
      }
    ]
  },
  {
    "id": "p11",
    "section": "辨析",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l12-future-hero.jpg",
    "buckets": [
      {
        "key": "now",
        "label": "现在"
      },
      {
        "key": "fut",
        "label": "将来 will"
      }
    ],
    "items": [
      {
        "text": "I am twelve.",
        "bucket": "now"
      },
      {
        "text": "I will be thirteen next year.",
        "bucket": "fut"
      },
      {
        "text": "She studies hard.",
        "bucket": "now"
      },
      {
        "text": "She will visit Beijing.",
        "bucket": "fut"
      },
      {
        "text": "They play football.",
        "bucket": "now"
      },
      {
        "text": "They will have a test tomorrow.",
        "bucket": "fut"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l12-future-hero.jpg",
    "question": "「She wills go to school tomorrow.」错在哪？",
    "choices": [
      {
        "text": "will 没有第三人称 -s，动词用原形 go",
        "correct": true,
        "fb": "will 对所有人称都一样。"
      },
      {
        "text": "tomorrow 要改成 yesterday",
        "correct": false,
        "fb": "tomorrow 正是将来标志。"
      },
      {
        "text": "要用 going",
        "correct": false,
        "fb": "will 后接原形，不是 -ing。"
      }
    ],
    "sentence": "She will go to school tomorrow.",
    "zh": "她明天将去上学。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l12-future-hero.jpg",
    "lead": "will 否定：will not / won't；疑问：Will + 主语 + 原形？",
    "items": [
      {
        "from": "They will have a test tomorrow.",
        "fromZh": "他们明天将有考试。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "They won't have a test tomorrow.",
              "They don't will have a test tomorrow.",
              "They will not has a test tomorrow."
            ],
            "ans": 0,
            "hint": "won't + 原形。",
            "sentence": "They won't have a test tomorrow.",
            "zh": "他们明天将没有考试。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Will they have a test tomorrow?",
              "Do they will have a test tomorrow?",
              "Will they has a test tomorrow?"
            ],
            "ans": 0,
            "hint": "Will + 主语 + 原形？",
            "sentence": "Will they have a test tomorrow?",
            "zh": "他们明天有考试吗？"
          }
        ]
      },
      {
        "from": "I read a book every day.",
        "fromZh": "我每天读书。",
        "steps": [
          {
            "label": "改成明天",
            "opts": [
              "I will read a book tomorrow.",
              "I will reads a book tomorrow.",
              "I reads a book tomorrow."
            ],
            "ans": 0,
            "hint": "一般将来时用 will + 原形",
            "sentence": "I will read a book tomorrow.",
            "zh": "我明天将读书。"
          }
        ]
      },
      {
        "from": "She goes to school by bus.",
        "fromZh": "她乘公交车上学。",
        "steps": [
          {
            "label": "改成明天",
            "opts": [
              "She will go to school by bus tomorrow.",
              "She will goes to school by bus tomorrow.",
              "She goes to school by bus tomorrow."
            ],
            "ans": 0,
            "hint": "will 后接原形，不加 -s",
            "sentence": "She will go to school by bus tomorrow.",
            "zh": "她明天将乘公交车上学。"
          }
        ]
      },
      {
        "from": "We have a test.",
        "fromZh": "我们有测试。",
        "steps": [
          {
            "label": "改成下周五",
            "opts": [
              "We will have a test next Friday.",
              "We will has a test next Friday.",
              "We have a test next Friday."
            ],
            "ans": 0,
            "hint": "will + 原形 have",
            "sentence": "We will have a test next Friday.",
            "zh": "下周五我们将有测试。"
          }
        ]
      },
      {
        "from": "It is sunny today.",
        "fromZh": "今天晴天。",
        "steps": [
          {
            "label": "改成明天",
            "opts": [
              "It will be sunny tomorrow.",
              "It will is sunny tomorrow.",
              "It is sunny tomorrow."
            ],
            "ans": 0,
            "hint": "will be + 形容词",
            "sentence": "It will be sunny tomorrow.",
            "zh": "明天将晴天。"
          }
        ]
      },
      {
        "from": "They play basketball.",
        "fromZh": "他们打篮球。",
        "steps": [
          {
            "label": "改成明天",
            "opts": [
              "They will play basketball tomorrow.",
              "They will plays basketball tomorrow.",
              "They plays basketball tomorrow."
            ],
            "ans": 0,
            "hint": "will 后接原形",
            "sentence": "They will play basketball tomorrow.",
            "zh": "他们明天将打篮球。"
          }
        ]
      },
      {
        "from": "He visits his grandma.",
        "fromZh": "他看望奶奶。",
        "steps": [
          {
            "label": "改成下周末",
            "opts": [
              "He will visit his grandma next weekend.",
              "He will visits his grandma next weekend.",
              "He visits his grandma next weekend."
            ],
            "ans": 0,
            "hint": "will 后接原形",
            "sentence": "He will visit his grandma next weekend.",
            "zh": "下周末他将看望奶奶。"
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
    "image": "kp3d-panda.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "will",
      "go",
      "to",
      "the",
      "zoo",
      "tomorrow"
    ],
    "sentence": "I will go to the zoo tomorrow.",
    "zh": "我明天将去动物园。",
    "items": [
      {
        "tokens": [
          "I",
          "will",
          "go",
          "to",
          "the",
          "zoo",
          "tomorrow"
        ],
        "sentence": "I will go to the zoo tomorrow.",
        "zh": "我明天将去动物园。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "She",
          "will",
          "buy",
          "a",
          "panda",
          "toy",
          "at",
          "the",
          "shop"
        ],
        "sentence": "She will buy a panda toy at the shop.",
        "zh": "她将在商店买一个熊猫玩具。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "We",
          "will",
          "have",
          "hot",
          "pot",
          "in",
          "Chengdu",
          "next",
          "week"
        ],
        "sentence": "We will have hot pot in Chengdu next week.",
        "zh": "下周我们将在成都吃火锅。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "They",
          "will",
          "play",
          "basketball",
          "on",
          "the",
          "playground"
        ],
        "sentence": "They will play basketball on the playground.",
        "zh": "他们将在操场上打篮球。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "He",
          "will",
          "read",
          "a",
          "book",
          "in",
          "the",
          "library"
        ],
        "sentence": "He will read a book in the library.",
        "zh": "他将在图书馆读书。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "It",
          "will",
          "be",
          "rainy",
          "tomorrow,",
          "so",
          "take",
          "an",
          "umbrella"
        ],
        "sentence": "It will be rainy tomorrow, so take an umbrella.",
        "zh": "明天将下雨，所以带伞。",
        "image": "kp3d-umbrella.png"
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
    "image": "l12-future-hero.jpg",
    "audio": "We will have a school trip next month.",
    "tokens": [
      "We",
      "will",
      "have",
      "a",
      "school",
      "trip",
      "next",
      "month"
    ],
    "sentence": "We will have a school trip next month.",
    "zh": "下个月我们有学校郊游。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l12-future-hero.jpg",
    "q": "It _____ sunny and warm next Monday.",
    "opts": [
      "is",
      "will be",
      "was"
    ],
    "ans": 1,
    "hint": "next Monday → will be。",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l12-future-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "It _____ sunny and warm next Monday.",
        "opts": [
          "is",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next Monday → will be。",
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "q": "I _____ thirteen next year.",
        "opts": [
          "am",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next year → will be。",
        "sentence": "I will be thirteen next year.",
        "zh": "我明年就十三岁了。"
      },
      {
        "q": "_____ you come to my party?",
        "opts": [
          "Do",
          "Will",
          "Are"
        ],
        "ans": 1,
        "hint": "将来邀请用 Will you…?",
        "sentence": "Will you come to my party?",
        "zh": "你会来我的聚会吗？"
      },
      {
        "q": "He _____ football tomorrow. （否定）",
        "opts": [
          "won't play",
          "doesn't play",
          "isn't play"
        ],
        "ans": 0,
        "hint": "将来否定 won't + 原形。",
        "sentence": "He won't play football tomorrow.",
        "zh": "他明天不踢足球。"
      },
      {
        "q": "Look at the clouds. It _____ soon.",
        "opts": [
          "rains",
          "will rain",
          "rained"
        ],
        "ans": 1,
        "hint": "soon 将来标志。",
        "sentence": "It will rain soon.",
        "zh": "很快就要下雨了。"
      },
      {
        "q": "We _____ to the museum next Friday.",
        "opts": [
          "go",
          "goes",
          "will go"
        ],
        "ans": 2,
        "hint": "next Friday → will go。",
        "sentence": "We will go to the museum next Friday.",
        "zh": "下周五我们去博物馆。"
      },
      {
        "q": "I _____ a book tomorrow.",
        "opts": [
          "read",
          "reads",
          "reading"
        ],
        "ans": 0,
        "hint": "will 后接动词原形",
        "sentence": "I will read a book tomorrow.",
        "zh": "我明天将读一本书。"
      },
      {
        "q": "She _____ to the park next Sunday.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 0,
        "hint": "will 后接动词原形，不加 -s",
        "sentence": "She will go to the park next Sunday.",
        "zh": "她下周日将去公园。"
      },
      {
        "q": "They _____ a school trip next month.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will have a school trip next month.",
        "zh": "下个月他们将有一次学校旅行。"
      },
      {
        "q": "It _____ sunny tomorrow.",
        "opts": [
          "will be",
          "will is",
          "is will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be sunny tomorrow.",
        "zh": "明天将是晴天。"
      },
      {
        "q": "We _____ basketball after school.",
        "opts": [
          "will play",
          "will plays",
          "will playing"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will play basketball after school.",
        "zh": "放学后我们将打篮球。"
      },
      {
        "q": "He _____ his homework tomorrow evening.",
        "opts": [
          "will do",
          "will does",
          "does will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will do his homework tomorrow evening.",
        "zh": "他明天晚上将做作业。"
      },
      {
        "q": "_____ you come to my party next week?",
        "opts": [
          "Will",
          "Do",
          "Are"
        ],
        "ans": 0,
        "hint": "一般将来时疑问句用 Will 开头",
        "sentence": "Will you come to my party next week?",
        "zh": "下周你会来我的聚会吗？"
      },
      {
        "q": "She _____ a doctor in the future.",
        "opts": [
          "will be",
          "will is",
          "will are"
        ],
        "ans": 0,
        "hint": "will be + 名词",
        "sentence": "She will be a doctor in the future.",
        "zh": "她将来会成为医生。"
      },
      {
        "q": "They _____ a new library next year.",
        "opts": [
          "will build",
          "will builds",
          "build will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will build a new library next year.",
        "zh": "明年他们将建一个新图书馆。"
      },
      {
        "q": "I _____ my grandmother this weekend.",
        "opts": [
          "will visit",
          "will visits",
          "visits will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will visit my grandmother this weekend.",
        "zh": "这个周末我将去看望奶奶。"
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
        "q": "It _____ sunny and warm next Monday.",
        "opts": [
          "is",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next Monday → will be。",
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "q": "I _____ thirteen next year.",
        "opts": [
          "am",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next year → will be。",
        "sentence": "I will be thirteen next year.",
        "zh": "我明年就十三岁了。"
      },
      {
        "q": "_____ you come to my party?",
        "opts": [
          "Do",
          "Will",
          "Are"
        ],
        "ans": 1,
        "hint": "将来邀请用 Will you…?",
        "sentence": "Will you come to my party?",
        "zh": "你会来我的聚会吗？"
      },
      {
        "q": "He _____ football tomorrow. （否定）",
        "opts": [
          "won't play",
          "doesn't play",
          "isn't play"
        ],
        "ans": 0,
        "hint": "将来否定 won't + 原形。",
        "sentence": "He won't play football tomorrow.",
        "zh": "他明天不踢足球。"
      },
      {
        "q": "Look at the clouds. It _____ soon.",
        "opts": [
          "rains",
          "will rain",
          "rained"
        ],
        "ans": 1,
        "hint": "soon 将来标志。",
        "sentence": "It will rain soon.",
        "zh": "很快就要下雨了。"
      },
      {
        "q": "We _____ to the museum next Friday.",
        "opts": [
          "go",
          "goes",
          "will go"
        ],
        "ans": 2,
        "hint": "next Friday → will go。",
        "sentence": "We will go to the museum next Friday.",
        "zh": "下周五我们去博物馆。"
      },
      {
        "q": "I _____ a book tomorrow.",
        "opts": [
          "read",
          "reads",
          "reading"
        ],
        "ans": 0,
        "hint": "will 后接动词原形",
        "sentence": "I will read a book tomorrow.",
        "zh": "我明天将读一本书。"
      },
      {
        "q": "She _____ to the park next Sunday.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 0,
        "hint": "will 后接动词原形，不加 -s",
        "sentence": "She will go to the park next Sunday.",
        "zh": "她下周日将去公园。"
      },
      {
        "q": "They _____ a school trip next month.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will have a school trip next month.",
        "zh": "下个月他们将有一次学校旅行。"
      },
      {
        "q": "It _____ sunny tomorrow.",
        "opts": [
          "will be",
          "will is",
          "is will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be sunny tomorrow.",
        "zh": "明天将是晴天。"
      },
      {
        "q": "We _____ basketball after school.",
        "opts": [
          "will play",
          "will plays",
          "will playing"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will play basketball after school.",
        "zh": "放学后我们将打篮球。"
      },
      {
        "q": "He _____ his homework tomorrow evening.",
        "opts": [
          "will do",
          "will does",
          "does will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will do his homework tomorrow evening.",
        "zh": "他明天晚上将做作业。"
      },
      {
        "q": "_____ you come to my party next week?",
        "opts": [
          "Will",
          "Do",
          "Are"
        ],
        "ans": 0,
        "hint": "一般将来时疑问句用 Will 开头",
        "sentence": "Will you come to my party next week?",
        "zh": "下周你会来我的聚会吗？"
      },
      {
        "q": "She _____ a doctor in the future.",
        "opts": [
          "will be",
          "will is",
          "will are"
        ],
        "ans": 0,
        "hint": "will be + 名词",
        "sentence": "She will be a doctor in the future.",
        "zh": "她将来会成为医生。"
      },
      {
        "q": "They _____ a new library next year.",
        "opts": [
          "will build",
          "will builds",
          "build will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will build a new library next year.",
        "zh": "明年他们将建一个新图书馆。"
      },
      {
        "q": "I _____ my grandmother this weekend.",
        "opts": [
          "will visit",
          "will visits",
          "visits will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will visit my grandmother this weekend.",
        "zh": "这个周末我将去看望奶奶。"
      },
      {
        "q": "It _____ cold next Monday.",
        "opts": [
          "will be",
          "will is",
          "be will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be cold next Monday.",
        "zh": "下周一将会冷。"
      },
      {
        "q": "We _____ a test next Friday.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a test next Friday.",
        "zh": "下周五我们将有测试。"
      },
      {
        "q": "He _____ to school by bus tomorrow.",
        "opts": [
          "will go",
          "will goes",
          "goes will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will go to school by bus tomorrow.",
        "zh": "他明天将乘公交车去学校。"
      },
      {
        "q": "They _____ hot pot in Chengdu next week.",
        "opts": [
          "will eat",
          "will eats",
          "eat will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will eat hot pot in Chengdu next week.",
        "zh": "下周他们将在成都吃火锅。"
      },
      {
        "q": "I _____ a panda at the zoo tomorrow.",
        "opts": [
          "will see",
          "will sees",
          "see will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will see a panda at the zoo tomorrow.",
        "zh": "明天我将在动物园看熊猫。"
      },
      {
        "q": "She _____ an umbrella because it will rain.",
        "opts": [
          "will take",
          "will takes",
          "takes will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "She will take an umbrella because it will rain.",
        "zh": "因为要下雨，她会带伞。"
      },
      {
        "q": "We _____ the classroom after school.",
        "opts": [
          "will clean",
          "will cleans",
          "clean will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will clean the classroom after school.",
        "zh": "放学后我们将打扫教室。"
      },
      {
        "q": "He _____ a book in the library tomorrow.",
        "opts": [
          "will read",
          "will reads",
          "reads will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will read a book in the library tomorrow.",
        "zh": "明天他将在图书馆读书。"
      },
      {
        "q": "They _____ basketball on the playground.",
        "opts": [
          "will play",
          "will plays",
          "play will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will play basketball on the playground.",
        "zh": "他们将在操场上打篮球。"
      },
      {
        "q": "I _____ my homework after dinner.",
        "opts": [
          "will do",
          "will does",
          "do will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will do my homework after dinner.",
        "zh": "晚饭后我将做作业。"
      },
      {
        "q": "She _____ a song at the party.",
        "opts": [
          "will sing",
          "will sings",
          "sing will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "She will sing a song at the party.",
        "zh": "她将在聚会上唱一首歌。"
      },
      {
        "q": "We _____ a picnic next Saturday.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a picnic next Saturday.",
        "zh": "下周六我们将去野餐。"
      },
      {
        "q": "He _____ the piano in the concert.",
        "opts": [
          "will play",
          "will plays",
          "play will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will play the piano in the concert.",
        "zh": "他将在音乐会上弹钢琴。"
      },
      {
        "q": "They _____ a new school next year.",
        "opts": [
          "will build",
          "will builds",
          "build will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will build a new school next year.",
        "zh": "明年他们将建一所新学校。"
      },
      {
        "q": "I _____ to the shop tomorrow.",
        "opts": [
          "will go",
          "will goes",
          "go will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will go to the shop tomorrow.",
        "zh": "明天我将去商店。"
      },
      {
        "q": "It _____ windy next week.",
        "opts": [
          "will be",
          "will is",
          "be will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be windy next week.",
        "zh": "下周将刮风。"
      },
      {
        "q": "We _____ a school trip next month.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a school trip next month.",
        "zh": "下个月我们将有一次学校旅行。"
      },
      {
        "q": "She _____ a doctor when she grows up.",
        "opts": [
          "will be",
          "will is",
          "is will"
        ],
        "ans": 0,
        "hint": "will be + 名词",
        "sentence": "She will be a doctor when she grows up.",
        "zh": "她长大后将成为一名医生。"
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
        "q": "It _____ sunny and warm next Monday.",
        "opts": [
          "is",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next Monday → will be。",
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "q": "I _____ thirteen next year.",
        "opts": [
          "am",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next year → will be。",
        "sentence": "I will be thirteen next year.",
        "zh": "我明年就十三岁了。"
      },
      {
        "q": "_____ you come to my party?",
        "opts": [
          "Do",
          "Will",
          "Are"
        ],
        "ans": 1,
        "hint": "将来邀请用 Will you…?",
        "sentence": "Will you come to my party?",
        "zh": "你会来我的聚会吗？"
      },
      {
        "q": "He _____ football tomorrow. （否定）",
        "opts": [
          "won't play",
          "doesn't play",
          "isn't play"
        ],
        "ans": 0,
        "hint": "将来否定 won't + 原形。",
        "sentence": "He won't play football tomorrow.",
        "zh": "他明天不踢足球。"
      },
      {
        "q": "Look at the clouds. It _____ soon.",
        "opts": [
          "rains",
          "will rain",
          "rained"
        ],
        "ans": 1,
        "hint": "soon 将来标志。",
        "sentence": "It will rain soon.",
        "zh": "很快就要下雨了。"
      },
      {
        "q": "We _____ to the museum next Friday.",
        "opts": [
          "go",
          "goes",
          "will go"
        ],
        "ans": 2,
        "hint": "next Friday → will go。",
        "sentence": "We will go to the museum next Friday.",
        "zh": "下周五我们去博物馆。"
      },
      {
        "q": "I _____ a book tomorrow.",
        "opts": [
          "read",
          "reads",
          "reading"
        ],
        "ans": 0,
        "hint": "will 后接动词原形",
        "sentence": "I will read a book tomorrow.",
        "zh": "我明天将读一本书。"
      },
      {
        "q": "She _____ to the park next Sunday.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 0,
        "hint": "will 后接动词原形，不加 -s",
        "sentence": "She will go to the park next Sunday.",
        "zh": "她下周日将去公园。"
      },
      {
        "q": "They _____ a school trip next month.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will have a school trip next month.",
        "zh": "下个月他们将有一次学校旅行。"
      },
      {
        "q": "It _____ sunny tomorrow.",
        "opts": [
          "will be",
          "will is",
          "is will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be sunny tomorrow.",
        "zh": "明天将是晴天。"
      },
      {
        "q": "We _____ basketball after school.",
        "opts": [
          "will play",
          "will plays",
          "will playing"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will play basketball after school.",
        "zh": "放学后我们将打篮球。"
      },
      {
        "q": "He _____ his homework tomorrow evening.",
        "opts": [
          "will do",
          "will does",
          "does will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will do his homework tomorrow evening.",
        "zh": "他明天晚上将做作业。"
      },
      {
        "q": "_____ you come to my party next week?",
        "opts": [
          "Will",
          "Do",
          "Are"
        ],
        "ans": 0,
        "hint": "一般将来时疑问句用 Will 开头",
        "sentence": "Will you come to my party next week?",
        "zh": "下周你会来我的聚会吗？"
      },
      {
        "q": "She _____ a doctor in the future.",
        "opts": [
          "will be",
          "will is",
          "will are"
        ],
        "ans": 0,
        "hint": "will be + 名词",
        "sentence": "She will be a doctor in the future.",
        "zh": "她将来会成为医生。"
      },
      {
        "q": "They _____ a new library next year.",
        "opts": [
          "will build",
          "will builds",
          "build will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will build a new library next year.",
        "zh": "明年他们将建一个新图书馆。"
      },
      {
        "q": "I _____ my grandmother this weekend.",
        "opts": [
          "will visit",
          "will visits",
          "visits will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will visit my grandmother this weekend.",
        "zh": "这个周末我将去看望奶奶。"
      },
      {
        "q": "It _____ cold next Monday.",
        "opts": [
          "will be",
          "will is",
          "be will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be cold next Monday.",
        "zh": "下周一将会冷。"
      },
      {
        "q": "We _____ a test next Friday.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a test next Friday.",
        "zh": "下周五我们将有测试。"
      },
      {
        "q": "He _____ to school by bus tomorrow.",
        "opts": [
          "will go",
          "will goes",
          "goes will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will go to school by bus tomorrow.",
        "zh": "他明天将乘公交车去学校。"
      },
      {
        "q": "They _____ hot pot in Chengdu next week.",
        "opts": [
          "will eat",
          "will eats",
          "eat will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will eat hot pot in Chengdu next week.",
        "zh": "下周他们将在成都吃火锅。"
      },
      {
        "q": "I _____ a panda at the zoo tomorrow.",
        "opts": [
          "will see",
          "will sees",
          "see will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will see a panda at the zoo tomorrow.",
        "zh": "明天我将在动物园看熊猫。"
      },
      {
        "q": "She _____ an umbrella because it will rain.",
        "opts": [
          "will take",
          "will takes",
          "takes will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "She will take an umbrella because it will rain.",
        "zh": "因为要下雨，她会带伞。"
      },
      {
        "q": "We _____ the classroom after school.",
        "opts": [
          "will clean",
          "will cleans",
          "clean will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will clean the classroom after school.",
        "zh": "放学后我们将打扫教室。"
      },
      {
        "q": "He _____ a book in the library tomorrow.",
        "opts": [
          "will read",
          "will reads",
          "reads will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will read a book in the library tomorrow.",
        "zh": "明天他将在图书馆读书。"
      },
      {
        "q": "They _____ basketball on the playground.",
        "opts": [
          "will play",
          "will plays",
          "play will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will play basketball on the playground.",
        "zh": "他们将在操场上打篮球。"
      },
      {
        "q": "I _____ my homework after dinner.",
        "opts": [
          "will do",
          "will does",
          "do will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will do my homework after dinner.",
        "zh": "晚饭后我将做作业。"
      },
      {
        "q": "She _____ a song at the party.",
        "opts": [
          "will sing",
          "will sings",
          "sing will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "She will sing a song at the party.",
        "zh": "她将在聚会上唱一首歌。"
      },
      {
        "q": "We _____ a picnic next Saturday.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a picnic next Saturday.",
        "zh": "下周六我们将去野餐。"
      },
      {
        "q": "He _____ the piano in the concert.",
        "opts": [
          "will play",
          "will plays",
          "play will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will play the piano in the concert.",
        "zh": "他将在音乐会上弹钢琴。"
      },
      {
        "q": "They _____ a new school next year.",
        "opts": [
          "will build",
          "will builds",
          "build will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will build a new school next year.",
        "zh": "明年他们将建一所新学校。"
      },
      {
        "q": "I _____ to the shop tomorrow.",
        "opts": [
          "will go",
          "will goes",
          "go will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will go to the shop tomorrow.",
        "zh": "明天我将去商店。"
      },
      {
        "q": "It _____ windy next week.",
        "opts": [
          "will be",
          "will is",
          "be will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be windy next week.",
        "zh": "下周将刮风。"
      },
      {
        "q": "We _____ a school trip next month.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a school trip next month.",
        "zh": "下个月我们将有一次学校旅行。"
      },
      {
        "q": "She _____ a doctor when she grows up.",
        "opts": [
          "will be",
          "will is",
          "is will"
        ],
        "ans": 0,
        "hint": "will be + 名词",
        "sentence": "She will be a doctor when she grows up.",
        "zh": "她长大后将成为一名医生。"
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
    "image": "l12-future-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "will go",
        "zh": "将要去"
      },
      {
        "en": "will be sunny",
        "zh": "将会晴朗"
      },
      {
        "en": "won't",
        "zh": "将不"
      },
      {
        "en": "next week",
        "zh": "下周（标志词）"
      },
      {
        "en": "will have",
        "zh": "将有"
      },
      {
        "en": "will be",
        "zh": "将会是"
      },
      {
        "en": "will play",
        "zh": "将玩"
      },
      {
        "en": "will read",
        "zh": "将读"
      },
      {
        "en": "will eat",
        "zh": "将吃"
      },
      {
        "en": "will see",
        "zh": "将看见"
      },
      {
        "en": "will take",
        "zh": "将带"
      },
      {
        "en": "will clean",
        "zh": "将打扫"
      },
      {
        "en": "will visit",
        "zh": "将参观/拜访"
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
    "image": "l12-future-hero.jpg",
    "audio": "I will do my homework after dinner.",
    "opts": [
      "I will do my homework after dinner.",
      "I did my homework after dinner.",
      "I do my homework after dinner."
    ],
    "ans": 0,
    "hint": "听到 will + 原形",
    "sentence": "I will do my homework after dinner.",
    "zh": "晚饭后我将做作业。",
    "questions": [
      {
        "audio": "I will do my homework after dinner.",
        "opts": [
          "I will do my homework after dinner.",
          "I did my homework after dinner.",
          "I do my homework after dinner."
        ],
        "ans": 0,
        "hint": "听到 will + 原形",
        "zh": "晚饭后我将做作业。",
        "sentence": "I will do my homework after dinner."
      },
      {
        "audio": "She will go to the library tomorrow.",
        "opts": [
          "She will go to the library tomorrow.",
          "She will goes to the library tomorrow.",
          "She goes to the library tomorrow."
        ],
        "ans": 0,
        "hint": "will 后接原形 go",
        "zh": "她明天将去图书馆。",
        "sentence": "She will go to the library tomorrow."
      },
      {
        "audio": "We will have a school trip next month.",
        "opts": [
          "We will have a school trip next month.",
          "We will has a school trip next month.",
          "We have a school trip next month."
        ],
        "ans": 0,
        "hint": "will + have",
        "zh": "下个月我们将有一次学校旅行。",
        "sentence": "We will have a school trip next month."
      },
      {
        "audio": "It will be sunny and warm next Monday.",
        "opts": [
          "It will be sunny and warm next Monday.",
          "It will is sunny and warm next Monday.",
          "It is sunny and warm next Monday."
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "zh": "下周一将晴朗又暖和。",
        "sentence": "It will be sunny and warm next Monday."
      },
      {
        "audio": "They will play basketball on the playground.",
        "opts": [
          "They will play basketball on the playground.",
          "They will plays basketball on the playground.",
          "They play basketball on the playground."
        ],
        "ans": 0,
        "hint": "will + 原形 play",
        "zh": "他们将在操场上打篮球。",
        "sentence": "They will play basketball on the playground."
      },
      {
        "audio": "He will buy a panda toy at the shop.",
        "opts": [
          "He will buy a panda toy at the shop.",
          "He will buys a panda toy at the shop.",
          "He buys a panda toy at the shop."
        ],
        "ans": 0,
        "hint": "will + 原形 buy",
        "zh": "他将在商店买一个熊猫玩具。",
        "sentence": "He will buy a panda toy at the shop."
      },
      {
        "audio": "We will eat hot pot in Chengdu next week.",
        "opts": [
          "We will eat hot pot in Chengdu next week.",
          "We will eats hot pot in Chengdu next week.",
          "We eat hot pot in Chengdu next week."
        ],
        "ans": 0,
        "hint": "will + 原形 eat",
        "zh": "下周我们将在成都吃火锅。",
        "sentence": "We will eat hot pot in Chengdu next week."
      },
      {
        "audio": "I will take an umbrella because it will rain.",
        "opts": [
          "I will take an umbrella because it will rain.",
          "I will takes an umbrella because it will rain.",
          "I take an umbrella because it will rain."
        ],
        "ans": 0,
        "hint": "will + 原形 take",
        "zh": "我会带伞，因为要下雨。",
        "sentence": "I will take an umbrella because it will rain."
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
    "image": "l12-future-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗又暖和。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "We will have a school trip next month.",
        "zh": "下个月我们将有一次学校旅行。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "I will do my homework after dinner.",
        "zh": "晚饭后我会做作业。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She will go to the library tomorrow.",
        "zh": "她明天将去图书馆。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "They will play basketball on the playground.",
        "zh": "他们将在操场上打篮球。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He will buy a panda toy at the shop.",
        "zh": "他将在商店买一个熊猫玩具。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "We will eat hot pot in Chengdu next week.",
        "zh": "下周我们将在成都吃火锅。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I will take an umbrella because it will rain.",
        "zh": "我会带伞，因为要下雨了。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "You will pass the exam if you study hard.",
        "zh": "如果你努力学习，你会通过考试。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "She will be a doctor when she grows up.",
        "zh": "她长大后将成为一名医生。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "We will have an English test next Friday.",
        "zh": "下周五我们将有英语测试。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "He will answer the question in class.",
        "zh": "他将在课堂上回答问题。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "They will listen to the teacher carefully.",
        "zh": "他们将认真听老师讲课。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I will finish my homework before dinner.",
        "zh": "我会在晚饭前完成作业。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She will read a book in the library.",
        "zh": "她将在图书馆读书。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "We will learn about pandas next week.",
        "zh": "下周我们将了解熊猫。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I will write a letter to my friend tomorrow.",
        "zh": "明天我将给朋友写信。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "He will draw a picture of the panda.",
        "zh": "他将画一幅熊猫的画。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "They will build a new school next year.",
        "zh": "明年他们将建一所新学校。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "We will visit the museum next Sunday.",
        "zh": "下周日我们将参观博物馆。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She will sing a song at the party.",
        "zh": "她将在聚会上唱一首歌。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "He will play the piano in the concert.",
        "zh": "他将在音乐会上弹钢琴。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "I will help my mom cook dinner.",
        "zh": "我会帮妈妈做晚饭。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We will clean the classroom after school.",
        "zh": "放学后我们将打扫教室。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
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
    "image": "l12-future-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "It _____ cold next Monday.",
        "opts": [
          "will be",
          "will is",
          "be will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be cold next Monday.",
        "zh": "下周一将会冷。"
      },
      {
        "q": "We _____ a test next Friday.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a test next Friday.",
        "zh": "下周五我们将有测试。"
      },
      {
        "q": "He _____ to school by bus tomorrow.",
        "opts": [
          "will go",
          "will goes",
          "goes will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will go to school by bus tomorrow.",
        "zh": "他明天将乘公交车去学校。"
      },
      {
        "q": "They _____ hot pot in Chengdu next week.",
        "opts": [
          "will eat",
          "will eats",
          "eat will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will eat hot pot in Chengdu next week.",
        "zh": "下周他们将在成都吃火锅。"
      },
      {
        "q": "I _____ a panda at the zoo tomorrow.",
        "opts": [
          "will see",
          "will sees",
          "see will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will see a panda at the zoo tomorrow.",
        "zh": "明天我将在动物园看熊猫。"
      },
      {
        "q": "She _____ an umbrella because it will rain.",
        "opts": [
          "will take",
          "will takes",
          "takes will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "She will take an umbrella because it will rain.",
        "zh": "因为要下雨，她会带伞。"
      },
      {
        "q": "We _____ the classroom after school.",
        "opts": [
          "will clean",
          "will cleans",
          "clean will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will clean the classroom after school.",
        "zh": "放学后我们将打扫教室。"
      },
      {
        "q": "He _____ a book in the library tomorrow.",
        "opts": [
          "will read",
          "will reads",
          "reads will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will read a book in the library tomorrow.",
        "zh": "明天他将在图书馆读书。"
      },
      {
        "q": "They _____ basketball on the playground.",
        "opts": [
          "will play",
          "will plays",
          "play will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will play basketball on the playground.",
        "zh": "他们将在操场上打篮球。"
      },
      {
        "q": "I _____ my homework after dinner.",
        "opts": [
          "will do",
          "will does",
          "do will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will do my homework after dinner.",
        "zh": "晚饭后我将做作业。"
      },
      {
        "q": "She _____ a song at the party.",
        "opts": [
          "will sing",
          "will sings",
          "sing will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "She will sing a song at the party.",
        "zh": "她将在聚会上唱一首歌。"
      },
      {
        "q": "We _____ a picnic next Saturday.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a picnic next Saturday.",
        "zh": "下周六我们将去野餐。"
      },
      {
        "q": "He _____ the piano in the concert.",
        "opts": [
          "will play",
          "will plays",
          "play will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "He will play the piano in the concert.",
        "zh": "他将在音乐会上弹钢琴。"
      },
      {
        "q": "They _____ a new school next year.",
        "opts": [
          "will build",
          "will builds",
          "build will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "They will build a new school next year.",
        "zh": "明年他们将建一所新学校。"
      },
      {
        "q": "I _____ to the shop tomorrow.",
        "opts": [
          "will go",
          "will goes",
          "go will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "I will go to the shop tomorrow.",
        "zh": "明天我将去商店。"
      },
      {
        "q": "It _____ windy next week.",
        "opts": [
          "will be",
          "will is",
          "be will"
        ],
        "ans": 0,
        "hint": "will be + 形容词",
        "sentence": "It will be windy next week.",
        "zh": "下周将刮风。"
      },
      {
        "q": "We _____ a school trip next month.",
        "opts": [
          "will have",
          "will has",
          "has will"
        ],
        "ans": 0,
        "hint": "will 后接原形",
        "sentence": "We will have a school trip next month.",
        "zh": "下个月我们将有一次学校旅行。"
      },
      {
        "q": "She _____ a doctor when she grows up.",
        "opts": [
          "will be",
          "will is",
          "is will"
        ],
        "ans": 0,
        "hint": "will be + 名词",
        "sentence": "She will be a doctor when she grows up.",
        "zh": "她长大后将成为一名医生。"
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
      "将来标志：tomorrow, next week/year, soon",
      "will + 动词原形；will be + 形/名",
      "写作：I think it will…",
      "be going to 表示已有打算，初中第 09 讲再展开。",
      "条件句 If it rains, we will stay. 也在初中学习。"
    ],
    "chant": "Next time coming? Will's the sign! Will plus base — future's fine!",
    "chantSpeak": "Next time coming, will is the sign! Will plus base, future is fine!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "一般将来时 will",
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