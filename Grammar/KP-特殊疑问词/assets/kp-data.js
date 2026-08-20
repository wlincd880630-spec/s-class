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
    "audio": "—How often do you go to the library? —Twice a week.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "—How often do you go to the library? —Twice a week.",
    "zh": "—你多久去一次图书馆？—一周两次。",
    "image": "w4-qw-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-qw-hero.jpg",
    "question": "Twice a week 回答的是哪个疑问词？",
    "choices": [
      {
        "text": "How often（多久一次）",
        "correct": true,
        "fb": "对了！频率 → How often。"
      },
      {
        "text": "How long（多长时间）",
        "correct": false,
        "fb": "How long 答 for two hours 等。"
      },
      {
        "text": "How many（多少数量）",
        "correct": false,
        "fb": "How many 答具体数字+可数名词。"
      }
    ],
    "sentence": "—How often do you go to the library? —Twice a week.",
    "zh": "—你多久去一次图书馆？—一周两次。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-qw-hero.jpg",
    "lead": "疑问词决定答什么；How 系列最容易混。",
    "formula": "How often → 频率　　How long → 时长　　How many/much → 数量",
    "parts": [
      {
        "mark": "How often",
        "label": "多久一次",
        "example": "Twice a week."
      },
      {
        "mark": "How long",
        "label": "多长时间",
        "example": "For two hours."
      },
      {
        "mark": "How many",
        "label": "多少（可数）",
        "example": "Three books."
      }
    ],
    "samples": [
      {
        "sentence": "How often do you go to the library? — Twice a week.",
        "zh": "你多久去一次图书馆？——一周两次。"
      },
      {
        "sentence": "How long does it take? — About twenty minutes.",
        "zh": "要花多久？——大约二十分钟。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-qw-often.jpg",
    "rightImage": "w4-qw-long.jpg",
    "leftLabel": "How often · 频率",
    "rightLabel": "How long · 时长",
    "leftSentence": "How often do you exercise? —Every day.",
    "leftZh": "你多久锻炼一次？—每天。",
    "rightSentence": "How long did you watch TV? —Two hours.",
    "rightZh": "你看了多久电视？—两小时。",
    "morphBase": "often",
    "morphPast": "long",
    "morphHighlight": "",
    "discovery": "How often → 频率；How long → 时长；How many/much → 数量。"
  },
  {
    "section": "精讲",
    "title": "例句 · How often",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-qw-hero.jpg",
    "lead": "答句是频率：once / twice / every day。",
    "sentence": "How often do you go to the library?",
    "zh": "你多久去一次图书馆？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · How far",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-qw-hero.jpg",
    "lead": "How far 问距离。",
    "sentence": "How far is it from your home to school?",
    "zh": "从你家到学校有多远？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "问频率用 How often",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "想了解一件事多久发生一次，就用 How often 提问。",
    "sentence": "How often do you go to the library? — Twice a week.",
    "zh": "你多久去一次图书馆？——一周两次。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "问时长用 How long",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "想了解一件事持续多长时间，就用 How long 提问。",
    "sentence": "How long does it take to get to school? — About twenty minutes.",
    "zh": "到学校要多长时间？——大约二十分钟。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "问可数数量用 How many",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "想了解可数物品的数量，就用 How many 加上名词复数提问。",
    "sentence": "How many pandas are there in the zoo? — There are three.",
    "zh": "动物园里有多少只熊猫？——有三只。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-qw-hero.jpg",
    "lead": "疑问词与答句配对。",
    "rules": [
      {
        "tab": "How",
        "rule": "How often 频率；How long 时长；How many 可数；How much 不可数",
        "focusVerb": "often",
        "examples": [
          {
            "from": "often",
            "to": "twice a week"
          },
          {
            "from": "long",
            "to": "two hours"
          }
        ],
        "sample": "How often do you go to the library? Twice a week.",
        "sampleZh": "你多久去一次图书馆？一周两次。"
      },
      {
        "tab": "What/Where",
        "rule": "What 什么；Where 哪里；When 何时；Why 为什么",
        "focusVerb": "What",
        "examples": [
          {
            "from": "What",
            "to": "什么"
          },
          {
            "from": "Where",
            "to": "哪里"
          }
        ],
        "sample": "Where do you live? I live in Chengdu.",
        "sampleZh": "你住哪里？我住在成都。"
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
    "image": "w4-qw-hero.jpg",
    "buckets": [
      {
        "key": "freq",
        "label": "How often"
      },
      {
        "key": "dur",
        "label": "How long"
      },
      {
        "key": "num",
        "label": "How many/much"
      }
    ],
    "items": [
      {
        "text": "Twice a week",
        "bucket": "freq"
      },
      {
        "text": "For three years",
        "bucket": "dur"
      },
      {
        "text": "Five books",
        "bucket": "num"
      },
      {
        "text": "Every day",
        "bucket": "freq"
      },
      {
        "text": "About two hours",
        "bucket": "dur"
      },
      {
        "text": "A lot of water",
        "bucket": "num"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-qw-hero.jpg",
    "question": "答句是 Twice a week. 问句用哪个？",
    "choices": [
      {
        "text": "How often",
        "correct": true,
        "fb": "频率用 How often。"
      },
      {
        "text": "How long",
        "correct": false,
        "fb": "How long 答 for two hours。"
      },
      {
        "text": "How many",
        "correct": false,
        "fb": "How many 答数字+可数名词。"
      }
    ],
    "sentence": "How often do you go to the library? — Twice a week.",
    "zh": "你多久去一次图书馆？——一周两次。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-qw-hero.jpg",
    "lead": "根据答句写出问句。",
    "items": [
      {
        "from": "I have three pencils.",
        "fromZh": "我有三支铅笔。",
        "steps": [
          {
            "label": "对 three 提问",
            "opts": [
              "How many pencils do you have?",
              "How much pencils do you have?",
              "How long pencils do you have?"
            ],
            "ans": 0,
            "hint": "可数用 How many。",
            "sentence": "How many pencils do you have?",
            "zh": "你有多少支铅笔？"
          }
        ]
      },
      {
        "from": "I go to the library twice a week.",
        "fromZh": "我一周去两次图书馆。",
        "steps": [
          {
            "label": "改成特殊疑问句（问频率）",
            "opts": [
              "How often do you go to the library?",
              "How long do you go to the library?",
              "How many do you go to the library?"
            ],
            "ans": 0,
            "hint": "twice a week 是频率，用 How often",
            "sentence": "How often do you go to the library?",
            "zh": "你多久去一次图书馆？"
          }
        ]
      },
      {
        "from": "The movie lasts two hours.",
        "fromZh": "电影持续两小时。",
        "steps": [
          {
            "label": "改成特殊疑问句（问时长）",
            "opts": [
              "How long does the movie last?",
              "How often does the movie last?",
              "How many does the movie last?"
            ],
            "ans": 0,
            "hint": "two hours 是时长，用 How long",
            "sentence": "How long does the movie last?",
            "zh": "电影持续多长时间？"
          }
        ]
      },
      {
        "from": "There are five pandas in the zoo.",
        "fromZh": "动物园里有五只熊猫。",
        "steps": [
          {
            "label": "改成特殊疑问句（问数量）",
            "opts": [
              "How many pandas are there in the zoo?",
              "How long pandas are there in the zoo?",
              "How often pandas are there in the zoo?"
            ],
            "ans": 0,
            "hint": "five pandas 是可数数量，用 How many",
            "sentence": "How many pandas are there in the zoo?",
            "zh": "动物园里有多少只熊猫？"
          }
        ]
      },
      {
        "from": "I play basketball every Sunday.",
        "fromZh": "我每周日打篮球。",
        "steps": [
          {
            "label": "改成特殊疑问句（问频率）",
            "opts": [
              "How often do you play basketball?",
              "How long do you play basketball?",
              "How many do you play basketball?"
            ],
            "ans": 0,
            "hint": "every Sunday 是频率，用 How often",
            "sentence": "How often do you play basketball?",
            "zh": "你多久打一次篮球？"
          }
        ]
      },
      {
        "from": "The bus ride takes twenty minutes.",
        "fromZh": "坐公交车要二十分钟。",
        "steps": [
          {
            "label": "改成特殊疑问句（问时长）",
            "opts": [
              "How long does the bus ride take?",
              "How often does the bus ride take?",
              "How many does the bus ride take?"
            ],
            "ans": 0,
            "hint": "twenty minutes 是时长，用 How long",
            "sentence": "How long does the bus ride take?",
            "zh": "坐公交车要多久？"
          }
        ]
      },
      {
        "from": "I have three apples.",
        "fromZh": "我有三个苹果。",
        "steps": [
          {
            "label": "改成特殊疑问句（问数量）",
            "opts": [
              "How many apples do you have?",
              "How long apples do you have?",
              "How often apples do you have?"
            ],
            "ans": 0,
            "hint": "three apples 是可数数量，用 How many",
            "sentence": "How many apples do you have?",
            "zh": "你有多少个苹果？"
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
    "image": "kp3d-shop.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "How",
      "often",
      "do",
      "you",
      "go",
      "to",
      "the",
      "shop"
    ],
    "sentence": "How often do you go to the shop?",
    "zh": "你多久去一次商店？",
    "items": [
      {
        "tokens": [
          "How",
          "often",
          "do",
          "you",
          "go",
          "to",
          "the",
          "shop"
        ],
        "sentence": "How often do you go to the shop?",
        "zh": "你多久去一次商店？",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "How",
          "long",
          "does",
          "it",
          "take",
          "to",
          "get",
          "to",
          "the",
          "playground"
        ],
        "sentence": "How long does it take to get to the playground?",
        "zh": "到操场要多长时间？",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "How",
          "many",
          "pandas",
          "are",
          "there",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "How many pandas are there in the zoo?",
        "zh": "动物园里有多少只熊猫？",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "How",
          "often",
          "do",
          "you",
          "eat",
          "hotpot"
        ],
        "sentence": "How often do you eat hotpot?",
        "zh": "你多久吃一次火锅？",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "How",
          "long",
          "is",
          "the",
          "bus",
          "ride",
          "to",
          "school"
        ],
        "sentence": "How long is the bus ride to school?",
        "zh": "坐公交车到学校要多久？",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "How",
          "many",
          "windows",
          "are",
          "there",
          "in",
          "your",
          "classroom"
        ],
        "sentence": "How many windows are there in your classroom?",
        "zh": "你们教室有多少扇窗户？",
        "image": "kp3d-window.png"
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
    "image": "w4-qw-hero.jpg",
    "audio": "How often do you go to the library?",
    "tokens": [
      "How",
      "often",
      "do",
      "you",
      "go",
      "to",
      "the",
      "library"
    ],
    "sentence": "How often do you go to the library?",
    "zh": "你多久去一次图书馆？"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-qw-hero.jpg",
    "q": "—_____ do you go to the library? —Twice a week.",
    "opts": [
      "How long",
      "How often",
      "How many"
    ],
    "ans": 1,
    "sentence": "—How often do you go to the library? —Twice a week.",
    "zh": "—你多久去一次图书馆？—一周两次。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-qw-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "—_____ do you go to the library? —Twice a week.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 1,
        "sentence": "—How often do you go to the library? —Twice a week.",
        "zh": "—你多久去一次图书馆？—一周两次。"
      },
      {
        "q": "—_____ is your father? —He is a doctor.",
        "opts": [
          "What",
          "Who",
          "How"
        ],
        "ans": 0,
        "hint": "问职业 What is…?",
        "sentence": "What is your father?",
        "zh": "你父亲做什么工作？"
      },
      {
        "q": "—_____ do you live? —In Chengdu.",
        "opts": [
          "What",
          "Where",
          "When"
        ],
        "ans": 1,
        "hint": "地点 Where。",
        "sentence": "Where do you live?",
        "zh": "你住在哪里？"
      },
      {
        "q": "—_____ is it from here? —Two kilometres.",
        "opts": [
          "How long",
          "How far",
          "How often"
        ],
        "ans": 1,
        "hint": "距离 How far。",
        "sentence": "How far is it from here?",
        "zh": "离这里有多远？"
      },
      {
        "q": "—_____ water do you drink? —Two glasses.",
        "opts": [
          "How many",
          "How much",
          "How long"
        ],
        "ans": 1,
        "hint": "water 不可数 How much。",
        "sentence": "How much water do you drink?",
        "zh": "你喝多少水？"
      },
      {
        "q": "—_____ will the meeting last? —Two hours.",
        "opts": [
          "How often",
          "How long",
          "How far"
        ],
        "ans": 1,
        "hint": "持续多久 How long。",
        "sentence": "How long will the meeting last?",
        "zh": "会议将持续多久？"
      },
      {
        "q": "_____ do you go to the library? — Twice a week.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "答句是频率，问频率用 How often",
        "sentence": "How often do you go to the library?",
        "zh": "你多久去一次图书馆？"
      },
      {
        "q": "_____ does it take to finish your homework? — About thirty minutes.",
        "opts": [
          "How long",
          "How often",
          "How much"
        ],
        "ans": 0,
        "hint": "答句是时长，问时长用 How long",
        "sentence": "How long does it take to finish your homework?",
        "zh": "完成作业要花多长时间？"
      },
      {
        "q": "_____ apples are there on the table? — There are five.",
        "opts": [
          "How many",
          "How often",
          "How long"
        ],
        "ans": 0,
        "hint": "apples 是可数名词复数，用 How many",
        "sentence": "How many apples are there on the table?",
        "zh": "桌子上有多少个苹果？"
      },
      {
        "q": "_____ do you play basketball? — Every Sunday.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every Sunday 是频率，用 How often",
        "sentence": "How often do you play basketball?",
        "zh": "你多久打一次篮球？"
      },
      {
        "q": "_____ is the bus ride? — About fifteen minutes.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "fifteen minutes 是时长",
        "sentence": "How long is the bus ride?",
        "zh": "坐公交车要多久？"
      },
      {
        "q": "_____ pandas are in the zoo? — There are three pandas.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "pandas 可数，用 How many",
        "sentence": "How many pandas are in the zoo?",
        "zh": "动物园里有多少只熊猫？"
      },
      {
        "q": "_____ do you see the doctor? — Once a year.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Once a year 是频率",
        "sentence": "How often do you see the doctor?",
        "zh": "你多久看一次医生？"
      },
      {
        "q": "_____ does the movie last? — Two hours.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "Two hours 是时长",
        "sentence": "How long does the movie last?",
        "zh": "电影持续多长时间？"
      },
      {
        "q": "_____ windows are there in your classroom? — There are six.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "windows 可数，用 How many",
        "sentence": "How many windows are there in your classroom?",
        "zh": "你们教室有多少扇窗户？"
      },
      {
        "q": "_____ do you eat hotpot? — About twice a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "twice a month 是频率",
        "sentence": "How often do you eat hotpot?",
        "zh": "你多久吃一次火锅？"
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
        "q": "—_____ do you go to the library? —Twice a week.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 1,
        "sentence": "—How often do you go to the library? —Twice a week.",
        "zh": "—你多久去一次图书馆？—一周两次。"
      },
      {
        "q": "—_____ is your father? —He is a doctor.",
        "opts": [
          "What",
          "Who",
          "How"
        ],
        "ans": 0,
        "hint": "问职业 What is…?",
        "sentence": "What is your father?",
        "zh": "你父亲做什么工作？"
      },
      {
        "q": "—_____ do you live? —In Chengdu.",
        "opts": [
          "What",
          "Where",
          "When"
        ],
        "ans": 1,
        "hint": "地点 Where。",
        "sentence": "Where do you live?",
        "zh": "你住在哪里？"
      },
      {
        "q": "—_____ is it from here? —Two kilometres.",
        "opts": [
          "How long",
          "How far",
          "How often"
        ],
        "ans": 1,
        "hint": "距离 How far。",
        "sentence": "How far is it from here?",
        "zh": "离这里有多远？"
      },
      {
        "q": "—_____ water do you drink? —Two glasses.",
        "opts": [
          "How many",
          "How much",
          "How long"
        ],
        "ans": 1,
        "hint": "water 不可数 How much。",
        "sentence": "How much water do you drink?",
        "zh": "你喝多少水？"
      },
      {
        "q": "—_____ will the meeting last? —Two hours.",
        "opts": [
          "How often",
          "How long",
          "How far"
        ],
        "ans": 1,
        "hint": "持续多久 How long。",
        "sentence": "How long will the meeting last?",
        "zh": "会议将持续多久？"
      },
      {
        "q": "_____ do you go to the library? — Twice a week.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "答句是频率，问频率用 How often",
        "sentence": "How often do you go to the library?",
        "zh": "你多久去一次图书馆？"
      },
      {
        "q": "_____ does it take to finish your homework? — About thirty minutes.",
        "opts": [
          "How long",
          "How often",
          "How much"
        ],
        "ans": 0,
        "hint": "答句是时长，问时长用 How long",
        "sentence": "How long does it take to finish your homework?",
        "zh": "完成作业要花多长时间？"
      },
      {
        "q": "_____ apples are there on the table? — There are five.",
        "opts": [
          "How many",
          "How often",
          "How long"
        ],
        "ans": 0,
        "hint": "apples 是可数名词复数，用 How many",
        "sentence": "How many apples are there on the table?",
        "zh": "桌子上有多少个苹果？"
      },
      {
        "q": "_____ do you play basketball? — Every Sunday.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every Sunday 是频率，用 How often",
        "sentence": "How often do you play basketball?",
        "zh": "你多久打一次篮球？"
      },
      {
        "q": "_____ is the bus ride? — About fifteen minutes.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "fifteen minutes 是时长",
        "sentence": "How long is the bus ride?",
        "zh": "坐公交车要多久？"
      },
      {
        "q": "_____ pandas are in the zoo? — There are three pandas.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "pandas 可数，用 How many",
        "sentence": "How many pandas are in the zoo?",
        "zh": "动物园里有多少只熊猫？"
      },
      {
        "q": "_____ do you see the doctor? — Once a year.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Once a year 是频率",
        "sentence": "How often do you see the doctor?",
        "zh": "你多久看一次医生？"
      },
      {
        "q": "_____ does the movie last? — Two hours.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "Two hours 是时长",
        "sentence": "How long does the movie last?",
        "zh": "电影持续多长时间？"
      },
      {
        "q": "_____ windows are there in your classroom? — There are six.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "windows 可数，用 How many",
        "sentence": "How many windows are there in your classroom?",
        "zh": "你们教室有多少扇窗户？"
      },
      {
        "q": "_____ do you eat hotpot? — About twice a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "twice a month 是频率",
        "sentence": "How often do you eat hotpot?",
        "zh": "你多久吃一次火锅？"
      },
      {
        "q": "_____ does it take to get to school? — Ten minutes by bus.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "Ten minutes 是时长",
        "sentence": "How long does it take to get to school?",
        "zh": "到学校要花多长时间？"
      },
      {
        "q": "_____ books do you read a month? — I read four books.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "books 可数，用 How many",
        "sentence": "How many books do you read a month?",
        "zh": "你一个月读多少本书？"
      },
      {
        "q": "_____ do you practice the piano? — Every evening.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every evening 是频率",
        "sentence": "How often do you practice the piano?",
        "zh": "你多久练一次钢琴？"
      },
      {
        "q": "_____ is the summer holiday? — About two months.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "two months 是时长",
        "sentence": "How long is the summer holiday?",
        "zh": "暑假有多长？"
      },
      {
        "q": "_____ eggs do we need? — We need three eggs.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "eggs 可数，用 How many",
        "sentence": "How many eggs do we need?",
        "zh": "我们需要多少个鸡蛋？"
      },
      {
        "q": "_____ do you go to the playground? — Three times a week.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Three times a week 是频率",
        "sentence": "How often do you go to the playground?",
        "zh": "你多久去一次操场？"
      },
      {
        "q": "_____ does the train to Chongqing take? — About one hour.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "one hour 是时长",
        "sentence": "How long does the train to Chongqing take?",
        "zh": "去重庆的火车要多久？"
      },
      {
        "q": "_____ cats does your neighbor have? — She has two cats.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "cats 可数，用 How many",
        "sentence": "How many cats does your neighbor have?",
        "zh": "你邻居养了多少只猫？"
      },
      {
        "q": "_____ do you clean your room? — Every weekend.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every weekend 是频率",
        "sentence": "How often do you clean your room?",
        "zh": "你多久打扫一次房间？"
      },
      {
        "q": "_____ is the movie? — It's ninety minutes long.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "ninety minutes 是时长",
        "sentence": "How long is the movie?",
        "zh": "这部电影多长？"
      },
      {
        "q": "_____ friends do you have in your class? — I have ten friends.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "friends 可数，用 How many",
        "sentence": "How many friends do you have in your class?",
        "zh": "你班上有多少朋友？"
      },
      {
        "q": "_____ do you visit your grandparents? — Once a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Once a month 是频率",
        "sentence": "How often do you visit your grandparents?",
        "zh": "你多久去看一次祖父母？"
      },
      {
        "q": "_____ does it take to cook dinner? — About forty minutes.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "forty minutes 是时长",
        "sentence": "How long does it take to cook dinner?",
        "zh": "做晚饭要花多长时间？"
      },
      {
        "q": "_____ tomatoes are in the basket? — There are eight tomatoes.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "tomatoes 可数，用 How many",
        "sentence": "How many tomatoes are in the basket?",
        "zh": "篮子里有多少个西红柿？"
      },
      {
        "q": "_____ do you water the plants? — Every morning.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every morning 是频率",
        "sentence": "How often do you water the plants?",
        "zh": "你多久给植物浇一次水？"
      },
      {
        "q": "_____ is the school trip? — It's a three-day trip.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "three-day 是时长",
        "sentence": "How long is the school trip?",
        "zh": "学校旅行有多长？"
      },
      {
        "q": "_____ students are in the classroom? — There are twenty students.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "students 可数，用 How many",
        "sentence": "How many students are in the classroom?",
        "zh": "教室里有多少学生？"
      },
      {
        "q": "_____ do you go to the shop? — Twice a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Twice a month 是频率",
        "sentence": "How often do you go to the shop?",
        "zh": "你多久去一次商店？"
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
        "q": "—_____ do you go to the library? —Twice a week.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 1,
        "sentence": "—How often do you go to the library? —Twice a week.",
        "zh": "—你多久去一次图书馆？—一周两次。"
      },
      {
        "q": "—_____ is your father? —He is a doctor.",
        "opts": [
          "What",
          "Who",
          "How"
        ],
        "ans": 0,
        "hint": "问职业 What is…?",
        "sentence": "What is your father?",
        "zh": "你父亲做什么工作？"
      },
      {
        "q": "—_____ do you live? —In Chengdu.",
        "opts": [
          "What",
          "Where",
          "When"
        ],
        "ans": 1,
        "hint": "地点 Where。",
        "sentence": "Where do you live?",
        "zh": "你住在哪里？"
      },
      {
        "q": "—_____ is it from here? —Two kilometres.",
        "opts": [
          "How long",
          "How far",
          "How often"
        ],
        "ans": 1,
        "hint": "距离 How far。",
        "sentence": "How far is it from here?",
        "zh": "离这里有多远？"
      },
      {
        "q": "—_____ water do you drink? —Two glasses.",
        "opts": [
          "How many",
          "How much",
          "How long"
        ],
        "ans": 1,
        "hint": "water 不可数 How much。",
        "sentence": "How much water do you drink?",
        "zh": "你喝多少水？"
      },
      {
        "q": "—_____ will the meeting last? —Two hours.",
        "opts": [
          "How often",
          "How long",
          "How far"
        ],
        "ans": 1,
        "hint": "持续多久 How long。",
        "sentence": "How long will the meeting last?",
        "zh": "会议将持续多久？"
      },
      {
        "q": "_____ do you go to the library? — Twice a week.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "答句是频率，问频率用 How often",
        "sentence": "How often do you go to the library?",
        "zh": "你多久去一次图书馆？"
      },
      {
        "q": "_____ does it take to finish your homework? — About thirty minutes.",
        "opts": [
          "How long",
          "How often",
          "How much"
        ],
        "ans": 0,
        "hint": "答句是时长，问时长用 How long",
        "sentence": "How long does it take to finish your homework?",
        "zh": "完成作业要花多长时间？"
      },
      {
        "q": "_____ apples are there on the table? — There are five.",
        "opts": [
          "How many",
          "How often",
          "How long"
        ],
        "ans": 0,
        "hint": "apples 是可数名词复数，用 How many",
        "sentence": "How many apples are there on the table?",
        "zh": "桌子上有多少个苹果？"
      },
      {
        "q": "_____ do you play basketball? — Every Sunday.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every Sunday 是频率，用 How often",
        "sentence": "How often do you play basketball?",
        "zh": "你多久打一次篮球？"
      },
      {
        "q": "_____ is the bus ride? — About fifteen minutes.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "fifteen minutes 是时长",
        "sentence": "How long is the bus ride?",
        "zh": "坐公交车要多久？"
      },
      {
        "q": "_____ pandas are in the zoo? — There are three pandas.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "pandas 可数，用 How many",
        "sentence": "How many pandas are in the zoo?",
        "zh": "动物园里有多少只熊猫？"
      },
      {
        "q": "_____ do you see the doctor? — Once a year.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Once a year 是频率",
        "sentence": "How often do you see the doctor?",
        "zh": "你多久看一次医生？"
      },
      {
        "q": "_____ does the movie last? — Two hours.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "Two hours 是时长",
        "sentence": "How long does the movie last?",
        "zh": "电影持续多长时间？"
      },
      {
        "q": "_____ windows are there in your classroom? — There are six.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "windows 可数，用 How many",
        "sentence": "How many windows are there in your classroom?",
        "zh": "你们教室有多少扇窗户？"
      },
      {
        "q": "_____ do you eat hotpot? — About twice a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "twice a month 是频率",
        "sentence": "How often do you eat hotpot?",
        "zh": "你多久吃一次火锅？"
      },
      {
        "q": "_____ does it take to get to school? — Ten minutes by bus.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "Ten minutes 是时长",
        "sentence": "How long does it take to get to school?",
        "zh": "到学校要花多长时间？"
      },
      {
        "q": "_____ books do you read a month? — I read four books.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "books 可数，用 How many",
        "sentence": "How many books do you read a month?",
        "zh": "你一个月读多少本书？"
      },
      {
        "q": "_____ do you practice the piano? — Every evening.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every evening 是频率",
        "sentence": "How often do you practice the piano?",
        "zh": "你多久练一次钢琴？"
      },
      {
        "q": "_____ is the summer holiday? — About two months.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "two months 是时长",
        "sentence": "How long is the summer holiday?",
        "zh": "暑假有多长？"
      },
      {
        "q": "_____ eggs do we need? — We need three eggs.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "eggs 可数，用 How many",
        "sentence": "How many eggs do we need?",
        "zh": "我们需要多少个鸡蛋？"
      },
      {
        "q": "_____ do you go to the playground? — Three times a week.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Three times a week 是频率",
        "sentence": "How often do you go to the playground?",
        "zh": "你多久去一次操场？"
      },
      {
        "q": "_____ does the train to Chongqing take? — About one hour.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "one hour 是时长",
        "sentence": "How long does the train to Chongqing take?",
        "zh": "去重庆的火车要多久？"
      },
      {
        "q": "_____ cats does your neighbor have? — She has two cats.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "cats 可数，用 How many",
        "sentence": "How many cats does your neighbor have?",
        "zh": "你邻居养了多少只猫？"
      },
      {
        "q": "_____ do you clean your room? — Every weekend.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every weekend 是频率",
        "sentence": "How often do you clean your room?",
        "zh": "你多久打扫一次房间？"
      },
      {
        "q": "_____ is the movie? — It's ninety minutes long.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "ninety minutes 是时长",
        "sentence": "How long is the movie?",
        "zh": "这部电影多长？"
      },
      {
        "q": "_____ friends do you have in your class? — I have ten friends.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "friends 可数，用 How many",
        "sentence": "How many friends do you have in your class?",
        "zh": "你班上有多少朋友？"
      },
      {
        "q": "_____ do you visit your grandparents? — Once a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Once a month 是频率",
        "sentence": "How often do you visit your grandparents?",
        "zh": "你多久去看一次祖父母？"
      },
      {
        "q": "_____ does it take to cook dinner? — About forty minutes.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "forty minutes 是时长",
        "sentence": "How long does it take to cook dinner?",
        "zh": "做晚饭要花多长时间？"
      },
      {
        "q": "_____ tomatoes are in the basket? — There are eight tomatoes.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "tomatoes 可数，用 How many",
        "sentence": "How many tomatoes are in the basket?",
        "zh": "篮子里有多少个西红柿？"
      },
      {
        "q": "_____ do you water the plants? — Every morning.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every morning 是频率",
        "sentence": "How often do you water the plants?",
        "zh": "你多久给植物浇一次水？"
      },
      {
        "q": "_____ is the school trip? — It's a three-day trip.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "three-day 是时长",
        "sentence": "How long is the school trip?",
        "zh": "学校旅行有多长？"
      },
      {
        "q": "_____ students are in the classroom? — There are twenty students.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "students 可数，用 How many",
        "sentence": "How many students are in the classroom?",
        "zh": "教室里有多少学生？"
      },
      {
        "q": "_____ do you go to the shop? — Twice a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Twice a month 是频率",
        "sentence": "How often do you go to the shop?",
        "zh": "你多久去一次商店？"
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
    "image": "w4-qw-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "How often",
        "zh": "多久一次"
      },
      {
        "en": "How long",
        "zh": "多长时间"
      },
      {
        "en": "How far",
        "zh": "多远"
      },
      {
        "en": "How many",
        "zh": "多少（可数）"
      },
      {
        "en": "twice a week",
        "zh": "一周两次"
      },
      {
        "en": "once a month",
        "zh": "一个月一次"
      },
      {
        "en": "every day",
        "zh": "每天"
      },
      {
        "en": "about twenty minutes",
        "zh": "大约二十分钟"
      },
      {
        "en": "three times a year",
        "zh": "一年三次"
      },
      {
        "en": "how many books",
        "zh": "多少本书"
      },
      {
        "en": "how long is the movie",
        "zh": "电影多长"
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
    "image": "w4-qw-hero.jpg",
    "audio": "How often do you go to the library?",
    "opts": [
      "How often do you go to the library?",
      "How long do you go to the library?",
      "How many do you go to the library?"
    ],
    "ans": 0,
    "hint": "听到 twice a week 提示问频率",
    "sentence": "How often do you go to the library?",
    "zh": "你多久去一次图书馆？",
    "questions": [
      {
        "audio": "How often do you go to the library?",
        "opts": [
          "How often do you go to the library?",
          "How long do you go to the library?",
          "How many do you go to the library?"
        ],
        "ans": 0,
        "hint": "听到 twice a week 提示问频率",
        "zh": "你多久去一次图书馆？",
        "sentence": "How often do you go to the library?"
      },
      {
        "audio": "How long does it take to finish homework?",
        "opts": [
          "How long does it take to finish homework?",
          "How often does it take to finish homework?",
          "How many does it take to finish homework?"
        ],
        "ans": 0,
        "hint": "听到 about thirty minutes 提示问时长",
        "zh": "完成作业要花多长时间？",
        "sentence": "How long does it take to finish homework?"
      },
      {
        "audio": "How many apples do you want?",
        "opts": [
          "How many apples do you want?",
          "How long apples do you want?",
          "How often apples do you want?"
        ],
        "ans": 0,
        "hint": "听到 five apples 提示问数量",
        "zh": "你想要多少个苹果？",
        "sentence": "How many apples do you want?"
      },
      {
        "audio": "How often do you play basketball?",
        "opts": [
          "How often do you play basketball?",
          "How long do you play basketball?",
          "How many do you play basketball?"
        ],
        "ans": 0,
        "hint": "听到 every Sunday 提示问频率",
        "zh": "你多久打一次篮球？",
        "sentence": "How often do you play basketball?"
      },
      {
        "audio": "How long is the movie?",
        "opts": [
          "How long is the movie?",
          "How often is the movie?",
          "How many is the movie?"
        ],
        "ans": 0,
        "hint": "听到 two hours 提示问时长",
        "zh": "电影多长？",
        "sentence": "How long is the movie?"
      },
      {
        "audio": "How many pandas are in the zoo?",
        "opts": [
          "How many pandas are in the zoo?",
          "How long pandas are in the zoo?",
          "How often pandas are in the zoo?"
        ],
        "ans": 0,
        "hint": "听到 three pandas 提示问数量",
        "zh": "动物园里有多少只熊猫？",
        "sentence": "How many pandas are in the zoo?"
      },
      {
        "audio": "How often do you see the doctor?",
        "opts": [
          "How often do you see the doctor?",
          "How long do you see the doctor?",
          "How many do you see the doctor?"
        ],
        "ans": 0,
        "hint": "听到 once a year 提示问频率",
        "zh": "你多久看一次医生？",
        "sentence": "How often do you see the doctor?"
      },
      {
        "audio": "How long does the train take?",
        "opts": [
          "How long does the train take?",
          "How often does the train take?",
          "How many does the train take?"
        ],
        "ans": 0,
        "hint": "听到 about one hour 提示问时长",
        "zh": "火车要多久？",
        "sentence": "How long does the train take?"
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
    "image": "w4-qw-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "How often do you go to the library?",
        "zh": "你多久去一次图书馆？",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "How long does it take to get to school?",
        "zh": "到学校要多长时间？",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "How many books do you read every month?",
        "zh": "你每个月读多少本书？",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "How often does your family eat hotpot?",
        "zh": "你们家多久吃一次火锅？",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "How long is the movie?",
        "zh": "这部电影多长时间？",
        "tag": "daily_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "How many pandas are there in the zoo?",
        "zh": "动物园里有多少只熊猫？",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "How often do you play basketball?",
        "zh": "你多久打一次篮球？",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "How long do you stay at the playground?",
        "zh": "你在操场上待多长时间？",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "How many apples do you want?",
        "zh": "你想要多少个苹果？",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "How often do you see the doctor?",
        "zh": "你多久看一次医生？",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "How long is the bus ride?",
        "zh": "坐公交车要多久？",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "How many windows are there in your classroom?",
        "zh": "你们教室有多少扇窗户？",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "How often does it rain in Chengdu?",
        "zh": "成都多久下一次雨？",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "How long do you practice the piano?",
        "zh": "你练钢琴多长时间？",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "How many cats does your aunt have?",
        "zh": "你阿姨养了多少只猫？",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "How often do you clean the classroom?",
        "zh": "你们多久打扫一次教室？",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "How long does the homework take?",
        "zh": "做作业要花多长时间？",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "How many friends do you have at school?",
        "zh": "你在学校有多少朋友？",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "How often do you visit the museum?",
        "zh": "你多久去一次博物馆？",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "How long is the summer holiday?",
        "zh": "暑假有多长？",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "How many eggs do we need for the cake?",
        "zh": "做蛋糕我们需要多少个鸡蛋？",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "How often do you water the plants?",
        "zh": "你多久给植物浇一次水？",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "How long does the train to Beijing take?",
        "zh": "去北京的火车要多久？",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "How many stars can you see tonight?",
        "zh": "今晚你能看到多少颗星星？",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
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
    "image": "w4-qw-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "_____ does it take to get to school? — Ten minutes by bus.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "Ten minutes 是时长",
        "sentence": "How long does it take to get to school?",
        "zh": "到学校要花多长时间？"
      },
      {
        "q": "_____ books do you read a month? — I read four books.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "books 可数，用 How many",
        "sentence": "How many books do you read a month?",
        "zh": "你一个月读多少本书？"
      },
      {
        "q": "_____ do you practice the piano? — Every evening.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every evening 是频率",
        "sentence": "How often do you practice the piano?",
        "zh": "你多久练一次钢琴？"
      },
      {
        "q": "_____ is the summer holiday? — About two months.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "two months 是时长",
        "sentence": "How long is the summer holiday?",
        "zh": "暑假有多长？"
      },
      {
        "q": "_____ eggs do we need? — We need three eggs.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "eggs 可数，用 How many",
        "sentence": "How many eggs do we need?",
        "zh": "我们需要多少个鸡蛋？"
      },
      {
        "q": "_____ do you go to the playground? — Three times a week.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Three times a week 是频率",
        "sentence": "How often do you go to the playground?",
        "zh": "你多久去一次操场？"
      },
      {
        "q": "_____ does the train to Chongqing take? — About one hour.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "one hour 是时长",
        "sentence": "How long does the train to Chongqing take?",
        "zh": "去重庆的火车要多久？"
      },
      {
        "q": "_____ cats does your neighbor have? — She has two cats.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "cats 可数，用 How many",
        "sentence": "How many cats does your neighbor have?",
        "zh": "你邻居养了多少只猫？"
      },
      {
        "q": "_____ do you clean your room? — Every weekend.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every weekend 是频率",
        "sentence": "How often do you clean your room?",
        "zh": "你多久打扫一次房间？"
      },
      {
        "q": "_____ is the movie? — It's ninety minutes long.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "ninety minutes 是时长",
        "sentence": "How long is the movie?",
        "zh": "这部电影多长？"
      },
      {
        "q": "_____ friends do you have in your class? — I have ten friends.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "friends 可数，用 How many",
        "sentence": "How many friends do you have in your class?",
        "zh": "你班上有多少朋友？"
      },
      {
        "q": "_____ do you visit your grandparents? — Once a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Once a month 是频率",
        "sentence": "How often do you visit your grandparents?",
        "zh": "你多久去看一次祖父母？"
      },
      {
        "q": "_____ does it take to cook dinner? — About forty minutes.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "forty minutes 是时长",
        "sentence": "How long does it take to cook dinner?",
        "zh": "做晚饭要花多长时间？"
      },
      {
        "q": "_____ tomatoes are in the basket? — There are eight tomatoes.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "tomatoes 可数，用 How many",
        "sentence": "How many tomatoes are in the basket?",
        "zh": "篮子里有多少个西红柿？"
      },
      {
        "q": "_____ do you water the plants? — Every morning.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Every morning 是频率",
        "sentence": "How often do you water the plants?",
        "zh": "你多久给植物浇一次水？"
      },
      {
        "q": "_____ is the school trip? — It's a three-day trip.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 0,
        "hint": "three-day 是时长",
        "sentence": "How long is the school trip?",
        "zh": "学校旅行有多长？"
      },
      {
        "q": "_____ students are in the classroom? — There are twenty students.",
        "opts": [
          "How many",
          "How long",
          "How often"
        ],
        "ans": 0,
        "hint": "students 可数，用 How many",
        "sentence": "How many students are in the classroom?",
        "zh": "教室里有多少学生？"
      },
      {
        "q": "_____ do you go to the shop? — Twice a month.",
        "opts": [
          "How often",
          "How long",
          "How many"
        ],
        "ans": 0,
        "hint": "Twice a month 是频率",
        "sentence": "How often do you go to the shop?",
        "zh": "你多久去一次商店？"
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
      "How often → 频率（twice a week）",
      "How long → 时长（two hours）",
      "How many + 可数；How much + 不可数",
      "What + 名词：What colour / What time / What class。"
    ],
    "chant": "How often asks how many times! How long asks how many hours or lines!",
    "chantSpeak": "How often asks how many times! How long asks how many hours or lines!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "特殊疑问词 How / What / Where",
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