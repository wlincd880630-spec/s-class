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
    "section": "导入",
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
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-pc-hero.jpg",
    "lead": "此刻正在发生：be + 动词-ing。",
    "formula": "am / is / are + V-ing",
    "parts": [
      {
        "mark": "I",
        "label": "am",
        "example": "I am reading"
      },
      {
        "mark": "he/she/it",
        "label": "is",
        "example": "She is drawing"
      },
      {
        "mark": "you/we/they",
        "label": "are",
        "example": "They are playing"
      }
    ],
    "samples": [
      {
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园踢足球。"
      },
      {
        "sentence": "I am reading a book in the library.",
        "zh": "我正在图书馆看书。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
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
    "section": "精讲",
    "title": "例句 · Look 标志",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pc-hero.jpg",
    "lead": "看见 Look! / now，优先想进行时。",
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 习惯对比",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pc-hero.jpg",
    "lead": "every day 用一般现在时，不是进行时。",
    "sentence": "Tom plays football every Saturday.",
    "zh": "汤姆每周六踢足球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "现在进行时 · 图书馆",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "主语I用am，he/she/it用is，we/they用are，再加动词ing。",
    "sentence": "I am reading a book in the library.",
    "zh": "我正在图书馆看书。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "现在进行时 · 成都火锅",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "表示此刻正在进行的动作，用be+动词ing，注意be随主语变化。",
    "sentence": "We are eating hot pot in Chengdu now.",
    "zh": "我们现在正在成都吃火锅。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
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
    "id": "p10",
    "section": "辨析",
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
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-pc-hero.jpg",
    "question": "「Look! The children play in the playground.」应改成？",
    "choices": [
      {
        "text": "are playing（Look 提示正在发生）",
        "correct": true,
        "fb": "Look! → 现在进行时。"
      },
      {
        "text": "played",
        "correct": false,
        "fb": "不是过去。"
      },
      {
        "text": "plays",
        "correct": false,
        "fb": "children 是复数，且有 Look。"
      }
    ],
    "sentence": "Look! The children are playing in the playground.",
    "zh": "看！孩子们正在操场上玩。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-pc-hero.jpg",
    "lead": "进行时否定：isn't/aren't + V-ing；疑问：Is/Are + 主语 + V-ing？",
    "items": [
      {
        "from": "She is drawing a picture.",
        "fromZh": "她正在画画。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "She isn't drawing a picture.",
              "She doesn't drawing a picture.",
              "She isn't draw a picture."
            ],
            "ans": 0,
            "hint": "isn't + V-ing。",
            "sentence": "She isn't drawing a picture.",
            "zh": "她没在画画。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Is she drawing a picture?",
              "Does she drawing a picture?",
              "Is she draw a picture?"
            ],
            "ans": 0,
            "hint": "Is + 主语 + V-ing？",
            "sentence": "Is she drawing a picture?",
            "zh": "她正在画画吗？"
          }
        ]
      },
      {
        "from": "Look! The children play in the playground.",
        "fromZh": "看！孩子们在操场上玩。",
        "steps": [
          {
            "label": "改成现在进行时",
            "opts": [
              "Look! The children are playing in the playground.",
              "Look! The children is playing in the playground.",
              "Look! The children are play in the playground."
            ],
            "ans": 0,
            "hint": "主语复数，用are+playing。",
            "sentence": "Look! The children are playing in the playground.",
            "zh": "看！孩子们正在操场上玩。"
          }
        ]
      },
      {
        "from": "She reads a book in the library.",
        "fromZh": "她在图书馆看书。",
        "steps": [
          {
            "label": "改成现在进行时",
            "opts": [
              "She is reading a book in the library.",
              "She are reading a book in the library.",
              "She is reads a book in the library."
            ],
            "ans": 0,
            "hint": "主语she用is，read变reading。",
            "sentence": "She is reading a book in the library.",
            "zh": "她正在图书馆看书。"
          }
        ]
      },
      {
        "from": "They play basketball on the playground.",
        "fromZh": "他们在操场上打篮球。",
        "steps": [
          {
            "label": "改成现在进行时",
            "opts": [
              "They are playing basketball on the playground.",
              "They is playing basketball on the playground.",
              "They are play basketball on the playground."
            ],
            "ans": 0,
            "hint": "主语they用are，play变playing。",
            "sentence": "They are playing basketball on the playground.",
            "zh": "他们正在操场上打篮球。"
          }
        ]
      },
      {
        "from": "I do my homework.",
        "fromZh": "我做作业。",
        "steps": [
          {
            "label": "改成现在进行时",
            "opts": [
              "I am doing my homework.",
              "I is doing my homework.",
              "I am do my homework."
            ],
            "ans": 0,
            "hint": "主语I用am，do变doing。",
            "sentence": "I am doing my homework.",
            "zh": "我正在做作业。"
          }
        ]
      },
      {
        "from": "The cat sleeps on the sofa.",
        "fromZh": "猫在沙发上睡觉。",
        "steps": [
          {
            "label": "改成现在进行时",
            "opts": [
              "The cat is sleeping on the sofa.",
              "The cat are sleeping on the sofa.",
              "The cat is sleeps on the sofa."
            ],
            "ans": 0,
            "hint": "cat是单数，用is，sleep变sleeping。",
            "sentence": "The cat is sleeping on the sofa.",
            "zh": "猫正在沙发上睡觉。"
          }
        ]
      },
      {
        "from": "We eat hot pot in Chengdu.",
        "fromZh": "我们在成都吃火锅。",
        "steps": [
          {
            "label": "改成现在进行时",
            "opts": [
              "We are eating hot pot in Chengdu.",
              "We is eating hot pot in Chengdu.",
              "We are eat hot pot in Chengdu."
            ],
            "ans": 0,
            "hint": "主语we用are，eat变eating。",
            "sentence": "We are eating hot pot in Chengdu.",
            "zh": "我们正在成都吃火锅。"
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
    "image": "kp3d-panda.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "The",
      "panda",
      "is",
      "eating",
      "bamboo",
      "in",
      "the",
      "zoo"
    ],
    "sentence": "The panda is eating bamboo in the zoo.",
    "zh": "熊猫正在动物园吃竹子。",
    "items": [
      {
        "tokens": [
          "The",
          "panda",
          "is",
          "eating",
          "bamboo",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "The panda is eating bamboo in the zoo.",
        "zh": "熊猫正在动物园吃竹子。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "We",
          "are",
          "having",
          "dinner",
          "at",
          "home",
          "now"
        ],
        "sentence": "We are having dinner at home now.",
        "zh": "我们现在正在家里吃晚饭。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "She",
          "is",
          "buying",
          "an",
          "umbrella",
          "in",
          "the",
          "shop"
        ],
        "sentence": "She is buying an umbrella in the shop.",
        "zh": "她正在商店买雨伞。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "He",
          "is",
          "waiting",
          "for",
          "the",
          "bus",
          "at",
          "the",
          "stop"
        ],
        "sentence": "He is waiting for the bus at the stop.",
        "zh": "他正在公交站等公交车。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "The",
          "doctor",
          "is",
          "checking",
          "the",
          "patient",
          "now"
        ],
        "sentence": "The doctor is checking the patient now.",
        "zh": "医生正在检查病人。",
        "image": "kp3d-doctor.png"
      },
      {
        "tokens": [
          "They",
          "are",
          "playing",
          "basketball",
          "on",
          "the",
          "playground"
        ],
        "sentence": "They are playing basketball on the playground.",
        "zh": "他们正在操场上打篮球。",
        "image": "kp3d-basketball.png"
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
    "id": "p15",
    "section": "检测",
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
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-pc-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
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
        "q": "Listen! Someone _____ at the door.",
        "opts": [
          "knocks",
          "is knocking",
          "knocked"
        ],
        "ans": 1,
        "hint": "Listen! → 进行时。",
        "sentence": "Listen! Someone is knocking at the door.",
        "zh": "听！有人在敲门。"
      },
      {
        "q": "They _____ TV now.",
        "opts": [
          "watch",
          "are watching",
          "watched"
        ],
        "ans": 1,
        "hint": "now → are watching。",
        "sentence": "They are watching TV now.",
        "zh": "他们现在正在看电视。"
      },
      {
        "q": "I _____ a letter at the moment.",
        "opts": [
          "write",
          "am writing",
          "writes"
        ],
        "ans": 1,
        "hint": "at the moment → am writing。",
        "sentence": "I am writing a letter at the moment.",
        "zh": "我此刻正在写信。"
      },
      {
        "q": "_____ you doing your homework?",
        "opts": [
          "Do",
          "Are",
          "Is"
        ],
        "ans": 1,
        "hint": "进行时疑问 Are you + V-ing。",
        "sentence": "Are you doing your homework?",
        "zh": "你在做作业吗？"
      },
      {
        "q": "He _____ football every day, but he _____ it now.",
        "opts": [
          "plays; isn't playing",
          "is playing; doesn't play",
          "play; isn't play"
        ],
        "ans": 0,
        "hint": "习惯一般现在时，此刻进行时否定。",
        "sentence": "He plays football every day, but he isn't playing it now.",
        "zh": "他每天踢球，但现在没在踢。"
      },
      {
        "q": "I _____ a book in the library now.",
        "opts": [
          "am reading",
          "read",
          "is reading"
        ],
        "ans": 0,
        "hint": "主语I用am，现在进行时。",
        "sentence": "I am reading a book in the library now.",
        "zh": "我现在正在图书馆看书。"
      },
      {
        "q": "She _____ an umbrella because it is raining.",
        "opts": [
          "buy",
          "buys",
          "is buying"
        ],
        "ans": 2,
        "hint": "因为下雨，她正在买伞，用is buying。",
        "sentence": "She is buying an umbrella because it is raining.",
        "zh": "因为下雨，她正在买雨伞。"
      },
      {
        "q": "Listen! The birds _____ in the tree.",
        "opts": [
          "sing",
          "are singing",
          "is singing"
        ],
        "ans": 1,
        "hint": "听到动作正在进行，主语复数。",
        "sentence": "Listen! The birds are singing in the tree.",
        "zh": "听！鸟儿正在树上唱歌。"
      },
      {
        "q": "My father _____ his car now.",
        "opts": [
          "washes",
          "is washing",
          "wash"
        ],
        "ans": 1,
        "hint": "now表示现在进行，主语第三人称单数。",
        "sentence": "My father is washing his car now.",
        "zh": "我爸爸正在洗车。"
      },
      {
        "q": "We _____ hot pot in a restaurant at the moment.",
        "opts": [
          "are having",
          "have",
          "is having"
        ],
        "ans": 0,
        "hint": "at the moment用现在进行，主语we。",
        "sentence": "We are having hot pot in a restaurant at the moment.",
        "zh": "我们此刻正在餐馆吃火锅。"
      },
      {
        "q": "The panda _____ bamboo in the zoo.",
        "opts": [
          "eats",
          "is eating",
          "eat"
        ],
        "ans": 1,
        "hint": "熊猫正在吃竹子，用is eating。",
        "sentence": "The panda is eating bamboo in the zoo.",
        "zh": "熊猫正在动物园吃竹子。"
      },
      {
        "q": "They _____ basketball on the playground now.",
        "opts": [
          "play",
          "are playing",
          "is playing"
        ],
        "ans": 1,
        "hint": "主语they复数，用are+现在分词。",
        "sentence": "They are playing basketball on the playground now.",
        "zh": "他们现在正在操场上打篮球。"
      },
      {
        "q": "He _____ for the bus at the stop.",
        "opts": [
          "waits",
          "is waiting",
          "wait"
        ],
        "ans": 1,
        "hint": "他正在等车，用is waiting。",
        "sentence": "He is waiting for the bus at the stop.",
        "zh": "他正在公交站等公交车。"
      },
      {
        "q": "Look! The cat _____ on the sofa.",
        "opts": [
          "sleeps",
          "is sleeping",
          "sleep"
        ],
        "ans": 1,
        "hint": "Look提示正在进行，猫是单数。",
        "sentence": "Look! The cat is sleeping on the sofa.",
        "zh": "看！猫正在沙发上睡觉。"
      },
      {
        "q": "The students _____ an English class now.",
        "opts": [
          "have",
          "are having",
          "is having"
        ],
        "ans": 1,
        "hint": "now用现在进行，主语复数。",
        "sentence": "The students are having an English class now.",
        "zh": "学生们正在上英语课。"
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
        "q": "Listen! Someone _____ at the door.",
        "opts": [
          "knocks",
          "is knocking",
          "knocked"
        ],
        "ans": 1,
        "hint": "Listen! → 进行时。",
        "sentence": "Listen! Someone is knocking at the door.",
        "zh": "听！有人在敲门。"
      },
      {
        "q": "They _____ TV now.",
        "opts": [
          "watch",
          "are watching",
          "watched"
        ],
        "ans": 1,
        "hint": "now → are watching。",
        "sentence": "They are watching TV now.",
        "zh": "他们现在正在看电视。"
      },
      {
        "q": "I _____ a letter at the moment.",
        "opts": [
          "write",
          "am writing",
          "writes"
        ],
        "ans": 1,
        "hint": "at the moment → am writing。",
        "sentence": "I am writing a letter at the moment.",
        "zh": "我此刻正在写信。"
      },
      {
        "q": "_____ you doing your homework?",
        "opts": [
          "Do",
          "Are",
          "Is"
        ],
        "ans": 1,
        "hint": "进行时疑问 Are you + V-ing。",
        "sentence": "Are you doing your homework?",
        "zh": "你在做作业吗？"
      },
      {
        "q": "He _____ football every day, but he _____ it now.",
        "opts": [
          "plays; isn't playing",
          "is playing; doesn't play",
          "play; isn't play"
        ],
        "ans": 0,
        "hint": "习惯一般现在时，此刻进行时否定。",
        "sentence": "He plays football every day, but he isn't playing it now.",
        "zh": "他每天踢球，但现在没在踢。"
      },
      {
        "q": "I _____ a book in the library now.",
        "opts": [
          "am reading",
          "read",
          "is reading"
        ],
        "ans": 0,
        "hint": "主语I用am，现在进行时。",
        "sentence": "I am reading a book in the library now.",
        "zh": "我现在正在图书馆看书。"
      },
      {
        "q": "She _____ an umbrella because it is raining.",
        "opts": [
          "buy",
          "buys",
          "is buying"
        ],
        "ans": 2,
        "hint": "因为下雨，她正在买伞，用is buying。",
        "sentence": "She is buying an umbrella because it is raining.",
        "zh": "因为下雨，她正在买雨伞。"
      },
      {
        "q": "Listen! The birds _____ in the tree.",
        "opts": [
          "sing",
          "are singing",
          "is singing"
        ],
        "ans": 1,
        "hint": "听到动作正在进行，主语复数。",
        "sentence": "Listen! The birds are singing in the tree.",
        "zh": "听！鸟儿正在树上唱歌。"
      },
      {
        "q": "My father _____ his car now.",
        "opts": [
          "washes",
          "is washing",
          "wash"
        ],
        "ans": 1,
        "hint": "now表示现在进行，主语第三人称单数。",
        "sentence": "My father is washing his car now.",
        "zh": "我爸爸正在洗车。"
      },
      {
        "q": "We _____ hot pot in a restaurant at the moment.",
        "opts": [
          "are having",
          "have",
          "is having"
        ],
        "ans": 0,
        "hint": "at the moment用现在进行，主语we。",
        "sentence": "We are having hot pot in a restaurant at the moment.",
        "zh": "我们此刻正在餐馆吃火锅。"
      },
      {
        "q": "The panda _____ bamboo in the zoo.",
        "opts": [
          "eats",
          "is eating",
          "eat"
        ],
        "ans": 1,
        "hint": "熊猫正在吃竹子，用is eating。",
        "sentence": "The panda is eating bamboo in the zoo.",
        "zh": "熊猫正在动物园吃竹子。"
      },
      {
        "q": "They _____ basketball on the playground now.",
        "opts": [
          "play",
          "are playing",
          "is playing"
        ],
        "ans": 1,
        "hint": "主语they复数，用are+现在分词。",
        "sentence": "They are playing basketball on the playground now.",
        "zh": "他们现在正在操场上打篮球。"
      },
      {
        "q": "He _____ for the bus at the stop.",
        "opts": [
          "waits",
          "is waiting",
          "wait"
        ],
        "ans": 1,
        "hint": "他正在等车，用is waiting。",
        "sentence": "He is waiting for the bus at the stop.",
        "zh": "他正在公交站等公交车。"
      },
      {
        "q": "Look! The cat _____ on the sofa.",
        "opts": [
          "sleeps",
          "is sleeping",
          "sleep"
        ],
        "ans": 1,
        "hint": "Look提示正在进行，猫是单数。",
        "sentence": "Look! The cat is sleeping on the sofa.",
        "zh": "看！猫正在沙发上睡觉。"
      },
      {
        "q": "The students _____ an English class now.",
        "opts": [
          "have",
          "are having",
          "is having"
        ],
        "ans": 1,
        "hint": "now用现在进行，主语复数。",
        "sentence": "The students are having an English class now.",
        "zh": "学生们正在上英语课。"
      },
      {
        "q": "I _____ my homework at home.",
        "opts": [
          "am doing",
          "do",
          "is doing"
        ],
        "ans": 0,
        "hint": "主语I用am doing。",
        "sentence": "I am doing my homework at home.",
        "zh": "我正在家里做作业。"
      },
      {
        "q": "It _____ outside, so take an umbrella.",
        "opts": [
          "rains",
          "is raining",
          "rain"
        ],
        "ans": 1,
        "hint": "正在下雨，用is raining。",
        "sentence": "It is raining outside, so take an umbrella.",
        "zh": "外面正在下雨，带把伞。"
      },
      {
        "q": "The doctor _____ the patient now.",
        "opts": [
          "checks",
          "is checking",
          "check"
        ],
        "ans": 1,
        "hint": "医生正在检查病人。",
        "sentence": "The doctor is checking the patient now.",
        "zh": "医生正在检查病人。"
      },
      {
        "q": "She _____ the piano in the music room.",
        "opts": [
          "plays",
          "is playing",
          "play"
        ],
        "ans": 1,
        "hint": "她正在弹钢琴，用is playing。",
        "sentence": "She is playing the piano in the music room.",
        "zh": "她正在音乐室弹钢琴。"
      },
      {
        "q": "We _____ to the panda base in Chengdu.",
        "opts": [
          "go",
          "are going",
          "is going"
        ],
        "ans": 1,
        "hint": "表示正在前往，用are going。",
        "sentence": "We are going to the panda base in Chengdu.",
        "zh": "我们正前往成都熊猫基地。"
      },
      {
        "q": "The moon _____ brightly in the sky.",
        "opts": [
          "shines",
          "is shining",
          "shine"
        ],
        "ans": 1,
        "hint": "月亮正在照耀，用is shining。",
        "sentence": "The moon is shining brightly in the sky.",
        "zh": "月亮在天空中明亮地照耀。"
      },
      {
        "q": "Look! The boys _____ in the pool.",
        "opts": [
          "swim",
          "are swimming",
          "is swimming"
        ],
        "ans": 1,
        "hint": "男孩们正在游泳，复数。",
        "sentence": "Look! The boys are swimming in the pool.",
        "zh": "看！男孩们正在游泳池里游泳。"
      },
      {
        "q": "My mother _____ dinner in the kitchen.",
        "opts": [
          "cooks",
          "is cooking",
          "cook"
        ],
        "ans": 1,
        "hint": "妈妈正在做饭，用is cooking。",
        "sentence": "My mother is cooking dinner in the kitchen.",
        "zh": "我妈妈正在厨房做晚饭。"
      },
      {
        "q": "The teacher _____ on the blackboard.",
        "opts": [
          "writes",
          "is writing",
          "write"
        ],
        "ans": 1,
        "hint": "老师正在写，用is writing。",
        "sentence": "The teacher is writing on the blackboard.",
        "zh": "老师正在黑板上写字。"
      },
      {
        "q": "They _____ trees in the garden now.",
        "opts": [
          "plant",
          "are planting",
          "is planting"
        ],
        "ans": 1,
        "hint": "他们正在种树，复数。",
        "sentence": "They are planting trees in the garden now.",
        "zh": "他们现在正在花园里种树。"
      },
      {
        "q": "I _____ to music on my phone.",
        "opts": [
          "listen",
          "am listening",
          "is listening"
        ],
        "ans": 1,
        "hint": "我正在听音乐。",
        "sentence": "I am listening to music on my phone.",
        "zh": "我正在用手机听音乐。"
      },
      {
        "q": "He _____ to school because he is late.",
        "opts": [
          "runs",
          "is running",
          "run"
        ],
        "ans": 1,
        "hint": "他正在跑，用is running。",
        "sentence": "He is running to school because he is late.",
        "zh": "他正跑向学校，因为他迟到了。"
      },
      {
        "q": "The baby _____ because he is hungry.",
        "opts": [
          "cries",
          "is crying",
          "cry"
        ],
        "ans": 1,
        "hint": "婴儿正在哭，用is crying。",
        "sentence": "The baby is crying because he is hungry.",
        "zh": "婴儿在哭，因为他饿了。"
      },
      {
        "q": "We _____ an English class now.",
        "opts": [
          "have",
          "are having",
          "is having"
        ],
        "ans": 1,
        "hint": "我们正在上课，用are having。",
        "sentence": "We are having an English class now.",
        "zh": "我们现在正在上英语课。"
      },
      {
        "q": "The students _____ English aloud.",
        "opts": [
          "read",
          "are reading",
          "is reading"
        ],
        "ans": 1,
        "hint": "学生们正在朗读，复数。",
        "sentence": "The students are reading English aloud.",
        "zh": "学生们正在大声读英语。"
      },
      {
        "q": "She _____ a book in the library.",
        "opts": [
          "reads",
          "is reading",
          "read"
        ],
        "ans": 1,
        "hint": "她正在看书，用is reading。",
        "sentence": "She is reading a book in the library.",
        "zh": "她正在图书馆看书。"
      },
      {
        "q": "Look! Tom _____ football in the park.",
        "opts": [
          "plays",
          "is playing",
          "play"
        ],
        "ans": 1,
        "hint": "Tom是单数，用is playing。",
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园里踢足球。"
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
        "q": "Listen! Someone _____ at the door.",
        "opts": [
          "knocks",
          "is knocking",
          "knocked"
        ],
        "ans": 1,
        "hint": "Listen! → 进行时。",
        "sentence": "Listen! Someone is knocking at the door.",
        "zh": "听！有人在敲门。"
      },
      {
        "q": "They _____ TV now.",
        "opts": [
          "watch",
          "are watching",
          "watched"
        ],
        "ans": 1,
        "hint": "now → are watching。",
        "sentence": "They are watching TV now.",
        "zh": "他们现在正在看电视。"
      },
      {
        "q": "I _____ a letter at the moment.",
        "opts": [
          "write",
          "am writing",
          "writes"
        ],
        "ans": 1,
        "hint": "at the moment → am writing。",
        "sentence": "I am writing a letter at the moment.",
        "zh": "我此刻正在写信。"
      },
      {
        "q": "_____ you doing your homework?",
        "opts": [
          "Do",
          "Are",
          "Is"
        ],
        "ans": 1,
        "hint": "进行时疑问 Are you + V-ing。",
        "sentence": "Are you doing your homework?",
        "zh": "你在做作业吗？"
      },
      {
        "q": "He _____ football every day, but he _____ it now.",
        "opts": [
          "plays; isn't playing",
          "is playing; doesn't play",
          "play; isn't play"
        ],
        "ans": 0,
        "hint": "习惯一般现在时，此刻进行时否定。",
        "sentence": "He plays football every day, but he isn't playing it now.",
        "zh": "他每天踢球，但现在没在踢。"
      },
      {
        "q": "I _____ a book in the library now.",
        "opts": [
          "am reading",
          "read",
          "is reading"
        ],
        "ans": 0,
        "hint": "主语I用am，现在进行时。",
        "sentence": "I am reading a book in the library now.",
        "zh": "我现在正在图书馆看书。"
      },
      {
        "q": "She _____ an umbrella because it is raining.",
        "opts": [
          "buy",
          "buys",
          "is buying"
        ],
        "ans": 2,
        "hint": "因为下雨，她正在买伞，用is buying。",
        "sentence": "She is buying an umbrella because it is raining.",
        "zh": "因为下雨，她正在买雨伞。"
      },
      {
        "q": "Listen! The birds _____ in the tree.",
        "opts": [
          "sing",
          "are singing",
          "is singing"
        ],
        "ans": 1,
        "hint": "听到动作正在进行，主语复数。",
        "sentence": "Listen! The birds are singing in the tree.",
        "zh": "听！鸟儿正在树上唱歌。"
      },
      {
        "q": "My father _____ his car now.",
        "opts": [
          "washes",
          "is washing",
          "wash"
        ],
        "ans": 1,
        "hint": "now表示现在进行，主语第三人称单数。",
        "sentence": "My father is washing his car now.",
        "zh": "我爸爸正在洗车。"
      },
      {
        "q": "We _____ hot pot in a restaurant at the moment.",
        "opts": [
          "are having",
          "have",
          "is having"
        ],
        "ans": 0,
        "hint": "at the moment用现在进行，主语we。",
        "sentence": "We are having hot pot in a restaurant at the moment.",
        "zh": "我们此刻正在餐馆吃火锅。"
      },
      {
        "q": "The panda _____ bamboo in the zoo.",
        "opts": [
          "eats",
          "is eating",
          "eat"
        ],
        "ans": 1,
        "hint": "熊猫正在吃竹子，用is eating。",
        "sentence": "The panda is eating bamboo in the zoo.",
        "zh": "熊猫正在动物园吃竹子。"
      },
      {
        "q": "They _____ basketball on the playground now.",
        "opts": [
          "play",
          "are playing",
          "is playing"
        ],
        "ans": 1,
        "hint": "主语they复数，用are+现在分词。",
        "sentence": "They are playing basketball on the playground now.",
        "zh": "他们现在正在操场上打篮球。"
      },
      {
        "q": "He _____ for the bus at the stop.",
        "opts": [
          "waits",
          "is waiting",
          "wait"
        ],
        "ans": 1,
        "hint": "他正在等车，用is waiting。",
        "sentence": "He is waiting for the bus at the stop.",
        "zh": "他正在公交站等公交车。"
      },
      {
        "q": "Look! The cat _____ on the sofa.",
        "opts": [
          "sleeps",
          "is sleeping",
          "sleep"
        ],
        "ans": 1,
        "hint": "Look提示正在进行，猫是单数。",
        "sentence": "Look! The cat is sleeping on the sofa.",
        "zh": "看！猫正在沙发上睡觉。"
      },
      {
        "q": "The students _____ an English class now.",
        "opts": [
          "have",
          "are having",
          "is having"
        ],
        "ans": 1,
        "hint": "now用现在进行，主语复数。",
        "sentence": "The students are having an English class now.",
        "zh": "学生们正在上英语课。"
      },
      {
        "q": "I _____ my homework at home.",
        "opts": [
          "am doing",
          "do",
          "is doing"
        ],
        "ans": 0,
        "hint": "主语I用am doing。",
        "sentence": "I am doing my homework at home.",
        "zh": "我正在家里做作业。"
      },
      {
        "q": "It _____ outside, so take an umbrella.",
        "opts": [
          "rains",
          "is raining",
          "rain"
        ],
        "ans": 1,
        "hint": "正在下雨，用is raining。",
        "sentence": "It is raining outside, so take an umbrella.",
        "zh": "外面正在下雨，带把伞。"
      },
      {
        "q": "The doctor _____ the patient now.",
        "opts": [
          "checks",
          "is checking",
          "check"
        ],
        "ans": 1,
        "hint": "医生正在检查病人。",
        "sentence": "The doctor is checking the patient now.",
        "zh": "医生正在检查病人。"
      },
      {
        "q": "She _____ the piano in the music room.",
        "opts": [
          "plays",
          "is playing",
          "play"
        ],
        "ans": 1,
        "hint": "她正在弹钢琴，用is playing。",
        "sentence": "She is playing the piano in the music room.",
        "zh": "她正在音乐室弹钢琴。"
      },
      {
        "q": "We _____ to the panda base in Chengdu.",
        "opts": [
          "go",
          "are going",
          "is going"
        ],
        "ans": 1,
        "hint": "表示正在前往，用are going。",
        "sentence": "We are going to the panda base in Chengdu.",
        "zh": "我们正前往成都熊猫基地。"
      },
      {
        "q": "The moon _____ brightly in the sky.",
        "opts": [
          "shines",
          "is shining",
          "shine"
        ],
        "ans": 1,
        "hint": "月亮正在照耀，用is shining。",
        "sentence": "The moon is shining brightly in the sky.",
        "zh": "月亮在天空中明亮地照耀。"
      },
      {
        "q": "Look! The boys _____ in the pool.",
        "opts": [
          "swim",
          "are swimming",
          "is swimming"
        ],
        "ans": 1,
        "hint": "男孩们正在游泳，复数。",
        "sentence": "Look! The boys are swimming in the pool.",
        "zh": "看！男孩们正在游泳池里游泳。"
      },
      {
        "q": "My mother _____ dinner in the kitchen.",
        "opts": [
          "cooks",
          "is cooking",
          "cook"
        ],
        "ans": 1,
        "hint": "妈妈正在做饭，用is cooking。",
        "sentence": "My mother is cooking dinner in the kitchen.",
        "zh": "我妈妈正在厨房做晚饭。"
      },
      {
        "q": "The teacher _____ on the blackboard.",
        "opts": [
          "writes",
          "is writing",
          "write"
        ],
        "ans": 1,
        "hint": "老师正在写，用is writing。",
        "sentence": "The teacher is writing on the blackboard.",
        "zh": "老师正在黑板上写字。"
      },
      {
        "q": "They _____ trees in the garden now.",
        "opts": [
          "plant",
          "are planting",
          "is planting"
        ],
        "ans": 1,
        "hint": "他们正在种树，复数。",
        "sentence": "They are planting trees in the garden now.",
        "zh": "他们现在正在花园里种树。"
      },
      {
        "q": "I _____ to music on my phone.",
        "opts": [
          "listen",
          "am listening",
          "is listening"
        ],
        "ans": 1,
        "hint": "我正在听音乐。",
        "sentence": "I am listening to music on my phone.",
        "zh": "我正在用手机听音乐。"
      },
      {
        "q": "He _____ to school because he is late.",
        "opts": [
          "runs",
          "is running",
          "run"
        ],
        "ans": 1,
        "hint": "他正在跑，用is running。",
        "sentence": "He is running to school because he is late.",
        "zh": "他正跑向学校，因为他迟到了。"
      },
      {
        "q": "The baby _____ because he is hungry.",
        "opts": [
          "cries",
          "is crying",
          "cry"
        ],
        "ans": 1,
        "hint": "婴儿正在哭，用is crying。",
        "sentence": "The baby is crying because he is hungry.",
        "zh": "婴儿在哭，因为他饿了。"
      },
      {
        "q": "We _____ an English class now.",
        "opts": [
          "have",
          "are having",
          "is having"
        ],
        "ans": 1,
        "hint": "我们正在上课，用are having。",
        "sentence": "We are having an English class now.",
        "zh": "我们现在正在上英语课。"
      },
      {
        "q": "The students _____ English aloud.",
        "opts": [
          "read",
          "are reading",
          "is reading"
        ],
        "ans": 1,
        "hint": "学生们正在朗读，复数。",
        "sentence": "The students are reading English aloud.",
        "zh": "学生们正在大声读英语。"
      },
      {
        "q": "She _____ a book in the library.",
        "opts": [
          "reads",
          "is reading",
          "read"
        ],
        "ans": 1,
        "hint": "她正在看书，用is reading。",
        "sentence": "She is reading a book in the library.",
        "zh": "她正在图书馆看书。"
      },
      {
        "q": "Look! Tom _____ football in the park.",
        "opts": [
          "plays",
          "is playing",
          "play"
        ],
        "ans": 1,
        "hint": "Tom是单数，用is playing。",
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园里踢足球。"
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
    "image": "w3-pc-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "am reading",
        "zh": "我正在读"
      },
      {
        "en": "is playing",
        "zh": "正在玩/打"
      },
      {
        "en": "Look!",
        "zh": "看！（标志）"
      },
      {
        "en": "at the moment",
        "zh": "此刻"
      },
      {
        "en": "are eating",
        "zh": "正在吃"
      },
      {
        "en": "is sleeping",
        "zh": "正在睡觉"
      },
      {
        "en": "are running",
        "zh": "正在跑"
      },
      {
        "en": "is writing",
        "zh": "正在写"
      },
      {
        "en": "are singing",
        "zh": "正在唱歌"
      },
      {
        "en": "is buying",
        "zh": "正在买"
      },
      {
        "en": "are having",
        "zh": "正在吃/正在上"
      },
      {
        "en": "is shining",
        "zh": "正在照耀"
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
    "image": "w3-pc-hero.jpg",
    "audio": "The children are playing in the playground.",
    "opts": [
      "The children are playing in the playground.",
      "The children play in the playground.",
      "The children is playing in the playground."
    ],
    "ans": 0,
    "hint": "注意are和playing。",
    "sentence": "The children are playing in the playground.",
    "zh": "孩子们正在操场上玩。",
    "questions": [
      {
        "audio": "The children are playing in the playground.",
        "opts": [
          "The children are playing in the playground.",
          "The children play in the playground.",
          "The children is playing in the playground."
        ],
        "ans": 0,
        "hint": "注意are和playing。",
        "zh": "孩子们正在操场上玩。",
        "sentence": "The children are playing in the playground."
      },
      {
        "audio": "I am reading a book in the library.",
        "opts": [
          "I am reading a book in the library.",
          "I am read a book in the library.",
          "I is reading a book in the library."
        ],
        "ans": 0,
        "hint": "主语I用am，read变reading。",
        "zh": "我正在图书馆看书。",
        "sentence": "I am reading a book in the library."
      },
      {
        "audio": "She is buying an umbrella in the shop.",
        "opts": [
          "She is buying an umbrella in the shop.",
          "She is buy an umbrella in the shop.",
          "She are buying an umbrella in the shop."
        ],
        "ans": 0,
        "hint": "主语she用is，buy变buying。",
        "zh": "她正在商店买雨伞。",
        "sentence": "She is buying an umbrella in the shop."
      },
      {
        "audio": "The panda is eating bamboo in the zoo.",
        "opts": [
          "The panda is eating bamboo in the zoo.",
          "The panda is eat bamboo in the zoo.",
          "The panda are eating bamboo in the zoo."
        ],
        "ans": 0,
        "hint": "panda单数用is，eat变eating。",
        "zh": "熊猫正在动物园吃竹子。",
        "sentence": "The panda is eating bamboo in the zoo."
      },
      {
        "audio": "We are having hot pot in Chengdu now.",
        "opts": [
          "We are having hot pot in Chengdu now.",
          "We is having hot pot in Chengdu now.",
          "We are have hot pot in Chengdu now."
        ],
        "ans": 0,
        "hint": "主语we用are，have变having。",
        "zh": "我们现在正在成都吃火锅。",
        "sentence": "We are having hot pot in Chengdu now."
      },
      {
        "audio": "He is waiting for the bus at the stop.",
        "opts": [
          "He is waiting for the bus at the stop.",
          "He is wait for the bus at the stop.",
          "He are waiting for the bus at the stop."
        ],
        "ans": 0,
        "hint": "主语he用is，wait变waiting。",
        "zh": "他正在公交站等公交车。",
        "sentence": "He is waiting for the bus at the stop."
      },
      {
        "audio": "They are playing basketball on the playground.",
        "opts": [
          "They are playing basketball on the playground.",
          "They is playing basketball on the playground.",
          "They are play basketball on the playground."
        ],
        "ans": 0,
        "hint": "主语they用are，play变playing。",
        "zh": "他们正在操场上打篮球。",
        "sentence": "They are playing basketball on the playground."
      },
      {
        "audio": "The moon is shining brightly tonight.",
        "opts": [
          "The moon is shining brightly tonight.",
          "The moon is shine brightly tonight.",
          "The moon are shining brightly tonight."
        ],
        "ans": 0,
        "hint": "moon单数用is，shine变shining。",
        "zh": "今晚月亮正明亮地照耀。",
        "sentence": "The moon is shining brightly tonight."
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
    "image": "w3-pc-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园里踢足球。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I am reading a book in the library.",
        "zh": "我正在图书馆里看书。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Listen! The birds are singing in the tree.",
        "zh": "听！鸟儿正在树上唱歌。",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "We are eating hot pot in Chengdu now.",
        "zh": "我们现在正在成都吃火锅。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "My mother is cooking dinner in the kitchen.",
        "zh": "我妈妈正在厨房做晚饭。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The panda is eating bamboo at the zoo.",
        "zh": "熊猫正在动物园吃竹子。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "She is buying an umbrella in the shop.",
        "zh": "她正在商店买雨伞。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "He is waiting for the bus at the stop.",
        "zh": "他正在公交站等公交车。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "They are playing basketball on the playground.",
        "zh": "他们正在操场上打篮球。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "The teacher is writing on the blackboard.",
        "zh": "老师正在黑板上写字。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The cat is sleeping on the sofa.",
        "zh": "猫正在沙发上睡觉。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "It is raining outside now.",
        "zh": "现在外面正在下雨。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The baby is crying because he is hungry.",
        "zh": "婴儿在哭，因为他饿了。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I am doing my homework at home.",
        "zh": "我正在家里做作业。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "Look! The boys are swimming in the pool.",
        "zh": "看！男孩们正在游泳池里游泳。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "She is playing the piano in the music room.",
        "zh": "她正在音乐室弹钢琴。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "We are having an English class now.",
        "zh": "我们现在正在上英语课。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The doctor is checking the patient.",
        "zh": "医生正在检查病人。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "He is running to school because he is late.",
        "zh": "他正跑向学校，因为他迟到了。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The moon is shining brightly tonight.",
        "zh": "今晚月亮正明亮地照耀着。",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "They are planting trees in the garden.",
        "zh": "他们正在花园里种树。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I am listening to music on my phone.",
        "zh": "我正在用手机听音乐。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The students are reading English aloud.",
        "zh": "学生们正在大声读英语。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "We are visiting the panda base in Chengdu.",
        "zh": "我们正在参观成都熊猫基地。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
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
    "image": "w3-pc-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "I _____ my homework at home.",
        "opts": [
          "am doing",
          "do",
          "is doing"
        ],
        "ans": 0,
        "hint": "主语I用am doing。",
        "sentence": "I am doing my homework at home.",
        "zh": "我正在家里做作业。"
      },
      {
        "q": "It _____ outside, so take an umbrella.",
        "opts": [
          "rains",
          "is raining",
          "rain"
        ],
        "ans": 1,
        "hint": "正在下雨，用is raining。",
        "sentence": "It is raining outside, so take an umbrella.",
        "zh": "外面正在下雨，带把伞。"
      },
      {
        "q": "The doctor _____ the patient now.",
        "opts": [
          "checks",
          "is checking",
          "check"
        ],
        "ans": 1,
        "hint": "医生正在检查病人。",
        "sentence": "The doctor is checking the patient now.",
        "zh": "医生正在检查病人。"
      },
      {
        "q": "She _____ the piano in the music room.",
        "opts": [
          "plays",
          "is playing",
          "play"
        ],
        "ans": 1,
        "hint": "她正在弹钢琴，用is playing。",
        "sentence": "She is playing the piano in the music room.",
        "zh": "她正在音乐室弹钢琴。"
      },
      {
        "q": "We _____ to the panda base in Chengdu.",
        "opts": [
          "go",
          "are going",
          "is going"
        ],
        "ans": 1,
        "hint": "表示正在前往，用are going。",
        "sentence": "We are going to the panda base in Chengdu.",
        "zh": "我们正前往成都熊猫基地。"
      },
      {
        "q": "The moon _____ brightly in the sky.",
        "opts": [
          "shines",
          "is shining",
          "shine"
        ],
        "ans": 1,
        "hint": "月亮正在照耀，用is shining。",
        "sentence": "The moon is shining brightly in the sky.",
        "zh": "月亮在天空中明亮地照耀。"
      },
      {
        "q": "Look! The boys _____ in the pool.",
        "opts": [
          "swim",
          "are swimming",
          "is swimming"
        ],
        "ans": 1,
        "hint": "男孩们正在游泳，复数。",
        "sentence": "Look! The boys are swimming in the pool.",
        "zh": "看！男孩们正在游泳池里游泳。"
      },
      {
        "q": "My mother _____ dinner in the kitchen.",
        "opts": [
          "cooks",
          "is cooking",
          "cook"
        ],
        "ans": 1,
        "hint": "妈妈正在做饭，用is cooking。",
        "sentence": "My mother is cooking dinner in the kitchen.",
        "zh": "我妈妈正在厨房做晚饭。"
      },
      {
        "q": "The teacher _____ on the blackboard.",
        "opts": [
          "writes",
          "is writing",
          "write"
        ],
        "ans": 1,
        "hint": "老师正在写，用is writing。",
        "sentence": "The teacher is writing on the blackboard.",
        "zh": "老师正在黑板上写字。"
      },
      {
        "q": "They _____ trees in the garden now.",
        "opts": [
          "plant",
          "are planting",
          "is planting"
        ],
        "ans": 1,
        "hint": "他们正在种树，复数。",
        "sentence": "They are planting trees in the garden now.",
        "zh": "他们现在正在花园里种树。"
      },
      {
        "q": "I _____ to music on my phone.",
        "opts": [
          "listen",
          "am listening",
          "is listening"
        ],
        "ans": 1,
        "hint": "我正在听音乐。",
        "sentence": "I am listening to music on my phone.",
        "zh": "我正在用手机听音乐。"
      },
      {
        "q": "He _____ to school because he is late.",
        "opts": [
          "runs",
          "is running",
          "run"
        ],
        "ans": 1,
        "hint": "他正在跑，用is running。",
        "sentence": "He is running to school because he is late.",
        "zh": "他正跑向学校，因为他迟到了。"
      },
      {
        "q": "The baby _____ because he is hungry.",
        "opts": [
          "cries",
          "is crying",
          "cry"
        ],
        "ans": 1,
        "hint": "婴儿正在哭，用is crying。",
        "sentence": "The baby is crying because he is hungry.",
        "zh": "婴儿在哭，因为他饿了。"
      },
      {
        "q": "We _____ an English class now.",
        "opts": [
          "have",
          "are having",
          "is having"
        ],
        "ans": 1,
        "hint": "我们正在上课，用are having。",
        "sentence": "We are having an English class now.",
        "zh": "我们现在正在上英语课。"
      },
      {
        "q": "The students _____ English aloud.",
        "opts": [
          "read",
          "are reading",
          "is reading"
        ],
        "ans": 1,
        "hint": "学生们正在朗读，复数。",
        "sentence": "The students are reading English aloud.",
        "zh": "学生们正在大声读英语。"
      },
      {
        "q": "She _____ a book in the library.",
        "opts": [
          "reads",
          "is reading",
          "read"
        ],
        "ans": 1,
        "hint": "她正在看书，用is reading。",
        "sentence": "She is reading a book in the library.",
        "zh": "她正在图书馆看书。"
      },
      {
        "q": "Look! Tom _____ football in the park.",
        "opts": [
          "plays",
          "is playing",
          "play"
        ],
        "ans": 1,
        "hint": "Tom是单数，用is playing。",
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园里踢足球。"
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
      "now/look/listen → am/is/are + V-ing",
      "习惯性动作用一般现在时",
      "写作：Look! Lily is drawing a picture.",
      "like / want / know 等状态动词一般不用进行时。"
    ],
    "chant": "Look and now? Add -ing! Am, is, are — that's the thing!",
    "chantSpeak": "Look and now, add ing! Am, is, are, that is the thing!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "现在进行时 · 小升初专项",
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