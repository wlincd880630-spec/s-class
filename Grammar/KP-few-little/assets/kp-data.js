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
    "audio": "There are a few apples on the table.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。",
    "image": "l15-few-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l15-few-hero.jpg",
    "question": "a few 和 few 意思一样吗？",
    "choices": [
      {
        "text": "a few 一些（肯定）；few 几乎没有（否定）",
        "correct": true,
        "fb": "对了！a 虽小但表「有一些」。"
      },
      {
        "text": "完全一样",
        "correct": false,
        "fb": "有无 a 意思相反！"
      },
      {
        "text": "few 比 a few 更多",
        "correct": false,
        "fb": "few 表否定，几乎沒有。"
      }
    ],
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l15-few-hero.jpg",
    "lead": "有 a 表示「有一些」；没有 a 表示「几乎没有」。",
    "formula": "a few / few + 可数复数　　a little / little + 不可数",
    "parts": [
      {
        "mark": "a few",
        "label": "一些（可数）",
        "example": "a few apples"
      },
      {
        "mark": "few",
        "label": "几乎没有（可数）",
        "example": "few friends"
      },
      {
        "mark": "a little",
        "label": "一点（不可数）",
        "example": "a little water"
      },
      {
        "mark": "little",
        "label": "几乎没有（不可数）",
        "example": "little time"
      }
    ],
    "samples": [
      {
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "sentence": "There is little water left. We need to buy more.",
        "zh": "水快没了，我们得再买。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l15-afew.jpg",
    "rightImage": "l15-few.jpg",
    "leftLabel": "a few 有一些",
    "rightLabel": "few 几乎没有",
    "leftSentence": "I have a few friends here.",
    "leftZh": "我在这里有一些朋友。",
    "rightSentence": "Few students like the test.",
    "rightZh": "几乎没有学生喜欢这次测验。",
    "morphBase": "a few",
    "morphPast": "few",
    "morphHighlight": "",
    "discovery": "a few/a little 肯定；few/little 否定。"
  },
  {
    "section": "精讲",
    "title": "例句 · a few 可数",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l15-few-hero.jpg",
    "lead": "apples 可数复数 → a few。",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · little 不可数否定",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l15-few-hero.jpg",
    "lead": "little water = 几乎没水。",
    "sentence": "There is little water left.",
    "zh": "剩下的水很少了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "可数名词用 a few / few",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-apple.png",
    "lead": "记住：可数名词复数前用 a few 表示“几个”，用 few 表示“几乎没有”。",
    "sentence": "There are a few apples on the table, but few oranges.",
    "zh": "桌子上有几个苹果，但几乎没有橘子。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "不可数名词用 a little / little",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "记住：不可数名词前用 a little 表示“一点”，用 little 表示“几乎没有”。",
    "sentence": "There is a little water in the cup, but little juice.",
    "zh": "杯子里有一点水，但几乎没有果汁。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "区别 a few/a little 与 few/little",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-playground.png",
    "lead": "带 a 表示“有一些”，不带 a 表示“几乎没有”，注意名词的可数性。",
    "sentence": "I have a few friends and a little time, so I am happy.",
    "zh": "我有几个朋友和一点时间，所以我很开心。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l15-few-hero.jpg",
    "rules": [
      {
        "tab": "a few",
        "rule": "a few + 可数复数（有一些）",
        "focusVerb": "a few",
        "examples": [
          {
            "from": "apples",
            "to": "a few apples"
          }
        ],
        "sample": "There are a few apples on the table.",
        "sampleZh": "桌上有几个苹果。"
      },
      {
        "tab": "a little",
        "rule": "a little + 不可数（有一点）",
        "focusVerb": "a little",
        "examples": [
          {
            "from": "water",
            "to": "a little water"
          }
        ],
        "sample": "Would you like a little sugar?",
        "sampleZh": "你要加一点糖吗？"
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
    "image": "l15-few-hero.jpg",
    "buckets": [
      {
        "key": "pos",
        "label": "a few / a little（有一些）"
      },
      {
        "key": "neg",
        "label": "few / little（几乎没有）"
      }
    ],
    "items": [
      {
        "text": "a few books",
        "bucket": "pos"
      },
      {
        "text": "few books",
        "bucket": "neg"
      },
      {
        "text": "a little milk",
        "bucket": "pos"
      },
      {
        "text": "little milk",
        "bucket": "neg"
      },
      {
        "text": "a few minutes",
        "bucket": "pos"
      },
      {
        "text": "little time",
        "bucket": "neg"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l15-few-hero.jpg",
    "question": "「I have a little friends.」错在哪？",
    "choices": [
      {
        "text": "friends 可数，要用 a few",
        "correct": true,
        "fb": "a little 只搭配不可数。"
      },
      {
        "text": "要用 little friends",
        "correct": false,
        "fb": "那是「几乎没有朋友」，搭配也对但意思不同；这里语法应用 a few。"
      },
      {
        "text": "friends 要改成 friend",
        "correct": false,
        "fb": "few/a few 后是复数。"
      }
    ],
    "sentence": "I have a few friends.",
    "zh": "我有几个朋友。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l15-few-hero.jpg",
    "lead": "把 a few 句改成不可数的 a little。",
    "items": [
      {
        "from": "I have a few questions.",
        "fromZh": "我有几个问题。",
        "steps": [
          {
            "label": "如果是时间：我还有一点时间",
            "opts": [
              "I have a little time.",
              "I have a few time.",
              "I have little times."
            ],
            "ans": 0,
            "hint": "time 不可数 → a little time。",
            "sentence": "I have a little time.",
            "zh": "我还有一点时间。"
          }
        ]
      },
      {
        "from": "I have a little friends.",
        "fromZh": "我有一些朋友。",
        "steps": [
          {
            "label": "改成正确句（可数名词）",
            "opts": [
              "I have a few friends.",
              "I have little friends.",
              "I have a little friend."
            ],
            "ans": 0,
            "hint": "friends 是可数名词复数，要用 a few。",
            "sentence": "I have a few friends.",
            "zh": "我有几个朋友。"
          }
        ]
      },
      {
        "from": "There is a few water.",
        "fromZh": "有一点水。",
        "steps": [
          {
            "label": "改成正确句（不可数名词）",
            "opts": [
              "There is a little water.",
              "There is few water.",
              "There are a few water."
            ],
            "ans": 0,
            "hint": "water 不可数，要用 a little。",
            "sentence": "There is a little water.",
            "zh": "有一点水。"
          }
        ]
      },
      {
        "from": "She has few milk.",
        "fromZh": "她几乎没有牛奶。",
        "steps": [
          {
            "label": "改成正确句（不可数名词）",
            "opts": [
              "She has little milk.",
              "She has a few milk.",
              "She has few milks."
            ],
            "ans": 0,
            "hint": "milk 不可数，用 little 表示几乎没有。",
            "sentence": "She has little milk.",
            "zh": "她几乎没有牛奶。"
          }
        ]
      },
      {
        "from": "There are little apples.",
        "fromZh": "几乎没有苹果。",
        "steps": [
          {
            "label": "改成正确句（可数名词）",
            "opts": [
              "There are few apples.",
              "There is little apples.",
              "There are a little apples."
            ],
            "ans": 0,
            "hint": "apples 可数复数，用 few 表示几乎没有。",
            "sentence": "There are few apples.",
            "zh": "几乎没有苹果。"
          }
        ]
      },
      {
        "from": "I have a little time.",
        "fromZh": "我有一点时间。",
        "steps": [
          {
            "label": "改成否定意思（几乎没有）",
            "opts": [
              "I have little time.",
              "I have a few time.",
              "I have few time."
            ],
            "ans": 0,
            "hint": "去掉 a，用 little 表示几乎没有。",
            "sentence": "I have little time.",
            "zh": "我几乎没有时间。"
          }
        ]
      },
      {
        "from": "There are a few books.",
        "fromZh": "有几本书。",
        "steps": [
          {
            "label": "改成否定意思（几乎没有）",
            "opts": [
              "There are few books.",
              "There are a little books.",
              "There is few books."
            ],
            "ans": 0,
            "hint": "去掉 a，用 few 表示几乎没有。",
            "sentence": "There are few books.",
            "zh": "几乎没有书。"
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
    "image": "kp3d-apple.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "There",
      "are",
      "a",
      "few",
      "apples",
      "on",
      "the",
      "table"
    ],
    "sentence": "There are a few apples on the table.",
    "zh": "桌子上有几个苹果。",
    "items": [
      {
        "tokens": [
          "There",
          "are",
          "a",
          "few",
          "apples",
          "on",
          "the",
          "table"
        ],
        "sentence": "There are a few apples on the table.",
        "zh": "桌子上有几个苹果。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "I",
          "have",
          "a",
          "little",
          "milk",
          "every",
          "morning"
        ],
        "sentence": "I have a little milk every morning.",
        "zh": "我每天早上喝一点牛奶。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "There",
          "are",
          "few",
          "students",
          "in",
          "the",
          "library"
        ],
        "sentence": "There are few students in the library.",
        "zh": "图书馆里几乎没有学生。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "She",
          "has",
          "little",
          "time",
          "to",
          "watch",
          "TV"
        ],
        "sentence": "She has little time to watch TV.",
        "zh": "她几乎没有时间看电视。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "We",
          "have",
          "a",
          "few",
          "pandas",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "We have a few pandas in the zoo.",
        "zh": "动物园里有几只熊猫。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "There",
          "is",
          "little",
          "water",
          "in",
          "the",
          "bottle"
        ],
        "sentence": "There is little water in the bottle.",
        "zh": "瓶子里几乎没有水。",
        "image": "kp3d-shop.png"
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
    "image": "l15-few-hero.jpg",
    "audio": "I have a few questions for you.",
    "tokens": [
      "I",
      "have",
      "a",
      "few",
      "questions",
      "for",
      "you"
    ],
    "sentence": "I have a few questions for you.",
    "zh": "我有几个问题要问你。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l15-few-hero.jpg",
    "q": "There is _____ water left. We need to buy more.",
    "opts": [
      "a little",
      "little",
      "a few"
    ],
    "ans": 1,
    "hint": "水快没了（否定）→ little water。",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l15-few-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "There is _____ water left. We need to buy more.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 1,
        "hint": "水快没了（否定）→ little water。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "q": "There is _____ milk. We can make breakfast.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 1,
        "hint": "有一点奶，够用 → a little。",
        "sentence": "There is a little milk.",
        "zh": "还有一点牛奶。"
      },
      {
        "q": "He has _____ friends, so he often feels lonely.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 1,
        "hint": "几乎没有朋友 → few。",
        "sentence": "He has few friends, so he often feels lonely.",
        "zh": "他几乎没有朋友，所以常觉得孤独。"
      },
      {
        "q": "Only _____ students passed the test.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "students 可数 → a few。",
        "sentence": "Only a few students passed the test.",
        "zh": "只有几个学生通过了考试。"
      },
      {
        "q": "Hurry up! We have _____ time left.",
        "opts": [
          "little",
          "a few",
          "many"
        ],
        "ans": 0,
        "hint": "时间紧迫 → little time。",
        "sentence": "We have little time left.",
        "zh": "我们剩的时间很少了。"
      },
      {
        "q": "I can speak _____ English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "English 不可数 → a little。",
        "sentence": "I can speak a little English.",
        "zh": "我会说一点英语。"
      },
      {
        "q": "There are _____ apples on the table.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "apples 是可数名词复数，用 a few 表示一些。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌子上有几个苹果。"
      },
      {
        "q": "There is _____ water in the bottle. Please drink more.",
        "opts": [
          "few",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "water 是不可数名词，little 表示几乎没有，含否定。",
        "sentence": "There is little water in the bottle. Please drink more.",
        "zh": "瓶子里几乎没有水了，请多喝点。"
      },
      {
        "q": "I have _____ friends in Chengdu. They are nice.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "friends 是可数名词复数，a few 表示几个。",
        "sentence": "I have a few friends in Chengdu. They are nice.",
        "zh": "我在成都有几个朋友，他们很好。"
      },
      {
        "q": "She has _____ time to watch TV, so she is busy.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "time 不可数，little 表示几乎没有。",
        "sentence": "She has little time to watch TV, so she is busy.",
        "zh": "她几乎没有时间看电视，所以她很忙。"
      },
      {
        "q": "There are _____ students in the library. It's quiet.",
        "opts": [
          "few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "students 可数复数，few 表示几乎没有。",
        "sentence": "There are few students in the library. It's quiet.",
        "zh": "图书馆里几乎没有学生，很安静。"
      },
      {
        "q": "He drinks _____ milk every morning.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，a little 表示一点。",
        "sentence": "He drinks a little milk every morning.",
        "zh": "他每天早上喝一点牛奶。"
      },
      {
        "q": "We have _____ pandas in the zoo. Let's go see them.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "pandas 可数复数，a few 表示几只。",
        "sentence": "We have a few pandas in the zoo. Let's go see them.",
        "zh": "动物园里有几只熊猫，我们去看看吧。"
      },
      {
        "q": "There is _____ rain in winter here. Bring an umbrella.",
        "opts": [
          "little",
          "few",
          "a few"
        ],
        "ans": 0,
        "hint": "rain 不可数，little 表示几乎没有。",
        "sentence": "There is little rain in winter here. Bring an umbrella.",
        "zh": "这里冬天几乎不下雨，带把伞吧。"
      },
      {
        "q": "Can I have _____ juice, please?",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "juice 不可数，a little 表示一点。",
        "sentence": "Can I have a little juice, please?",
        "zh": "请问我能喝一点果汁吗？"
      },
      {
        "q": "There are _____ buses after nine. We should hurry.",
        "opts": [
          "a little",
          "few",
          "little"
        ],
        "ans": 1,
        "hint": "buses 可数复数，few 表示几乎没有。",
        "sentence": "There are few buses after nine. We should hurry.",
        "zh": "九点之后几乎没有公交车了，我们得快点。"
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
        "q": "There is _____ water left. We need to buy more.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 1,
        "hint": "水快没了（否定）→ little water。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "q": "There is _____ milk. We can make breakfast.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 1,
        "hint": "有一点奶，够用 → a little。",
        "sentence": "There is a little milk.",
        "zh": "还有一点牛奶。"
      },
      {
        "q": "He has _____ friends, so he often feels lonely.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 1,
        "hint": "几乎没有朋友 → few。",
        "sentence": "He has few friends, so he often feels lonely.",
        "zh": "他几乎没有朋友，所以常觉得孤独。"
      },
      {
        "q": "Only _____ students passed the test.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "students 可数 → a few。",
        "sentence": "Only a few students passed the test.",
        "zh": "只有几个学生通过了考试。"
      },
      {
        "q": "Hurry up! We have _____ time left.",
        "opts": [
          "little",
          "a few",
          "many"
        ],
        "ans": 0,
        "hint": "时间紧迫 → little time。",
        "sentence": "We have little time left.",
        "zh": "我们剩的时间很少了。"
      },
      {
        "q": "I can speak _____ English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "English 不可数 → a little。",
        "sentence": "I can speak a little English.",
        "zh": "我会说一点英语。"
      },
      {
        "q": "There are _____ apples on the table.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "apples 是可数名词复数，用 a few 表示一些。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌子上有几个苹果。"
      },
      {
        "q": "There is _____ water in the bottle. Please drink more.",
        "opts": [
          "few",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "water 是不可数名词，little 表示几乎没有，含否定。",
        "sentence": "There is little water in the bottle. Please drink more.",
        "zh": "瓶子里几乎没有水了，请多喝点。"
      },
      {
        "q": "I have _____ friends in Chengdu. They are nice.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "friends 是可数名词复数，a few 表示几个。",
        "sentence": "I have a few friends in Chengdu. They are nice.",
        "zh": "我在成都有几个朋友，他们很好。"
      },
      {
        "q": "She has _____ time to watch TV, so she is busy.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "time 不可数，little 表示几乎没有。",
        "sentence": "She has little time to watch TV, so she is busy.",
        "zh": "她几乎没有时间看电视，所以她很忙。"
      },
      {
        "q": "There are _____ students in the library. It's quiet.",
        "opts": [
          "few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "students 可数复数，few 表示几乎没有。",
        "sentence": "There are few students in the library. It's quiet.",
        "zh": "图书馆里几乎没有学生，很安静。"
      },
      {
        "q": "He drinks _____ milk every morning.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，a little 表示一点。",
        "sentence": "He drinks a little milk every morning.",
        "zh": "他每天早上喝一点牛奶。"
      },
      {
        "q": "We have _____ pandas in the zoo. Let's go see them.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "pandas 可数复数，a few 表示几只。",
        "sentence": "We have a few pandas in the zoo. Let's go see them.",
        "zh": "动物园里有几只熊猫，我们去看看吧。"
      },
      {
        "q": "There is _____ rain in winter here. Bring an umbrella.",
        "opts": [
          "little",
          "few",
          "a few"
        ],
        "ans": 0,
        "hint": "rain 不可数，little 表示几乎没有。",
        "sentence": "There is little rain in winter here. Bring an umbrella.",
        "zh": "这里冬天几乎不下雨，带把伞吧。"
      },
      {
        "q": "Can I have _____ juice, please?",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "juice 不可数，a little 表示一点。",
        "sentence": "Can I have a little juice, please?",
        "zh": "请问我能喝一点果汁吗？"
      },
      {
        "q": "There are _____ buses after nine. We should hurry.",
        "opts": [
          "a little",
          "few",
          "little"
        ],
        "ans": 1,
        "hint": "buses 可数复数，few 表示几乎没有。",
        "sentence": "There are few buses after nine. We should hurry.",
        "zh": "九点之后几乎没有公交车了，我们得快点。"
      },
      {
        "q": "I have _____ money. I can't buy the toy.",
        "opts": [
          "a few",
          "a little",
          "little"
        ],
        "ans": 2,
        "hint": "money 不可数，little 表示几乎没有。",
        "sentence": "I have little money. I can't buy the toy.",
        "zh": "我几乎没有钱，买不了那个玩具。"
      },
      {
        "q": "There are _____ flowers in the garden.",
        "opts": [
          "little",
          "a few",
          "a little"
        ],
        "ans": 1,
        "hint": "flowers 可数复数，a few 表示几朵。",
        "sentence": "There are a few flowers in the garden.",
        "zh": "花园里有几朵花。"
      },
      {
        "q": "The cat has _____ fish for lunch.",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "fish 作食物时不可数，a little 表示一点。",
        "sentence": "The cat has a little fish for lunch.",
        "zh": "猫午餐吃了一点鱼。"
      },
      {
        "q": "_____ people know the answer. It's hard.",
        "opts": [
          "A little",
          "Few",
          "A few"
        ],
        "ans": 1,
        "hint": "people 可数复数，few 表示几乎没有。",
        "sentence": "Few people know the answer. It's hard.",
        "zh": "几乎没有人知道答案，很难。"
      },
      {
        "q": "There is _____ sugar in the coffee. It's sweet.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 2,
        "hint": "sugar 不可数，a little 表示一点。",
        "sentence": "There is a little sugar in the coffee. It's sweet.",
        "zh": "咖啡里有一点糖，很甜。"
      },
      {
        "q": "We have _____ classes on Friday afternoon.",
        "opts": [
          "a little",
          "few",
          "little"
        ],
        "ans": 1,
        "hint": "classes 可数复数，few 表示几乎没有。",
        "sentence": "We have few classes on Friday afternoon.",
        "zh": "我们周五下午几乎没有课。"
      },
      {
        "q": "I need _____ minutes to finish my homework.",
        "opts": [
          "a few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "minutes 可数复数，a few 表示几分钟。",
        "sentence": "I need a few minutes to finish my homework.",
        "zh": "我需要几分钟来完成作业。"
      },
      {
        "q": "There is _____ noise in the reading room.",
        "opts": [
          "a few",
          "few",
          "little"
        ],
        "ans": 2,
        "hint": "noise 不可数，little 表示几乎没有。",
        "sentence": "There is little noise in the reading room.",
        "zh": "阅览室里几乎没有噪音。"
      },
      {
        "q": "She has _____ trouble with her English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "trouble 不可数，a little 表示一点。",
        "sentence": "She has a little trouble with her English.",
        "zh": "她的英语有一点困难。"
      },
      {
        "q": "_____ children like to eat hot pot in summer.",
        "opts": [
          "A little",
          "A few",
          "Few"
        ],
        "ans": 2,
        "hint": "children 可数复数，few 表示几乎没有。",
        "sentence": "Few children like to eat hot pot in summer.",
        "zh": "很少有孩子喜欢在夏天吃火锅。"
      },
      {
        "q": "I have _____ questions about the homework.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "questions 可数复数，a few 表示几个。",
        "sentence": "I have a few questions about the homework.",
        "zh": "关于作业我有几个问题。"
      },
      {
        "q": "There is _____ space in my schoolbag. It's full.",
        "opts": [
          "a few",
          "little",
          "a little"
        ],
        "ans": 1,
        "hint": "space 不可数，little 表示几乎没有。",
        "sentence": "There is little space in my schoolbag. It's full.",
        "zh": "我的书包里几乎没有空间了，它满了。"
      },
      {
        "q": "The doctor has _____ time before the next patient.",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "time 不可数，a little 表示一点。",
        "sentence": "The doctor has a little time before the next patient.",
        "zh": "医生在下一个病人来之前有一点时间。"
      },
      {
        "q": "We saw _____ stars in the sky last night.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 2,
        "hint": "stars 可数复数，a few 表示几颗。",
        "sentence": "We saw a few stars in the sky last night.",
        "zh": "昨晚我们看到了几颗星星。"
      },
      {
        "q": "There are _____ eggs in the fridge. Let's buy some.",
        "opts": [
          "few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "eggs 可数复数，few 表示几乎没有。",
        "sentence": "There are few eggs in the fridge. Let's buy some.",
        "zh": "冰箱里几乎没有鸡蛋了，我们买一些吧。"
      },
      {
        "q": "I have _____ homework today. I can play.",
        "opts": [
          "few",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "homework 不可数，little 表示几乎没有。",
        "sentence": "I have little homework today. I can play.",
        "zh": "我今天几乎没有作业，可以玩。"
      },
      {
        "q": "There is _____ bread on the plate. Eat it.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "bread 不可数，a little 表示一点。",
        "sentence": "There is a little bread on the plate. Eat it.",
        "zh": "盘子里有一点面包，吃吧。"
      },
      {
        "q": "_____ birds are singing in the tree.",
        "opts": [
          "A little",
          "Little",
          "A few"
        ],
        "ans": 2,
        "hint": "birds 可数复数，a few 表示几只。",
        "sentence": "A few birds are singing in the tree.",
        "zh": "几只鸟在树上唱歌。"
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
        "q": "There is _____ water left. We need to buy more.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 1,
        "hint": "水快没了（否定）→ little water。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "q": "There is _____ milk. We can make breakfast.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 1,
        "hint": "有一点奶，够用 → a little。",
        "sentence": "There is a little milk.",
        "zh": "还有一点牛奶。"
      },
      {
        "q": "He has _____ friends, so he often feels lonely.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 1,
        "hint": "几乎没有朋友 → few。",
        "sentence": "He has few friends, so he often feels lonely.",
        "zh": "他几乎没有朋友，所以常觉得孤独。"
      },
      {
        "q": "Only _____ students passed the test.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "students 可数 → a few。",
        "sentence": "Only a few students passed the test.",
        "zh": "只有几个学生通过了考试。"
      },
      {
        "q": "Hurry up! We have _____ time left.",
        "opts": [
          "little",
          "a few",
          "many"
        ],
        "ans": 0,
        "hint": "时间紧迫 → little time。",
        "sentence": "We have little time left.",
        "zh": "我们剩的时间很少了。"
      },
      {
        "q": "I can speak _____ English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "English 不可数 → a little。",
        "sentence": "I can speak a little English.",
        "zh": "我会说一点英语。"
      },
      {
        "q": "There are _____ apples on the table.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "apples 是可数名词复数，用 a few 表示一些。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌子上有几个苹果。"
      },
      {
        "q": "There is _____ water in the bottle. Please drink more.",
        "opts": [
          "few",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "water 是不可数名词，little 表示几乎没有，含否定。",
        "sentence": "There is little water in the bottle. Please drink more.",
        "zh": "瓶子里几乎没有水了，请多喝点。"
      },
      {
        "q": "I have _____ friends in Chengdu. They are nice.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "friends 是可数名词复数，a few 表示几个。",
        "sentence": "I have a few friends in Chengdu. They are nice.",
        "zh": "我在成都有几个朋友，他们很好。"
      },
      {
        "q": "She has _____ time to watch TV, so she is busy.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "time 不可数，little 表示几乎没有。",
        "sentence": "She has little time to watch TV, so she is busy.",
        "zh": "她几乎没有时间看电视，所以她很忙。"
      },
      {
        "q": "There are _____ students in the library. It's quiet.",
        "opts": [
          "few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "students 可数复数，few 表示几乎没有。",
        "sentence": "There are few students in the library. It's quiet.",
        "zh": "图书馆里几乎没有学生，很安静。"
      },
      {
        "q": "He drinks _____ milk every morning.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，a little 表示一点。",
        "sentence": "He drinks a little milk every morning.",
        "zh": "他每天早上喝一点牛奶。"
      },
      {
        "q": "We have _____ pandas in the zoo. Let's go see them.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "pandas 可数复数，a few 表示几只。",
        "sentence": "We have a few pandas in the zoo. Let's go see them.",
        "zh": "动物园里有几只熊猫，我们去看看吧。"
      },
      {
        "q": "There is _____ rain in winter here. Bring an umbrella.",
        "opts": [
          "little",
          "few",
          "a few"
        ],
        "ans": 0,
        "hint": "rain 不可数，little 表示几乎没有。",
        "sentence": "There is little rain in winter here. Bring an umbrella.",
        "zh": "这里冬天几乎不下雨，带把伞吧。"
      },
      {
        "q": "Can I have _____ juice, please?",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "juice 不可数，a little 表示一点。",
        "sentence": "Can I have a little juice, please?",
        "zh": "请问我能喝一点果汁吗？"
      },
      {
        "q": "There are _____ buses after nine. We should hurry.",
        "opts": [
          "a little",
          "few",
          "little"
        ],
        "ans": 1,
        "hint": "buses 可数复数，few 表示几乎没有。",
        "sentence": "There are few buses after nine. We should hurry.",
        "zh": "九点之后几乎没有公交车了，我们得快点。"
      },
      {
        "q": "I have _____ money. I can't buy the toy.",
        "opts": [
          "a few",
          "a little",
          "little"
        ],
        "ans": 2,
        "hint": "money 不可数，little 表示几乎没有。",
        "sentence": "I have little money. I can't buy the toy.",
        "zh": "我几乎没有钱，买不了那个玩具。"
      },
      {
        "q": "There are _____ flowers in the garden.",
        "opts": [
          "little",
          "a few",
          "a little"
        ],
        "ans": 1,
        "hint": "flowers 可数复数，a few 表示几朵。",
        "sentence": "There are a few flowers in the garden.",
        "zh": "花园里有几朵花。"
      },
      {
        "q": "The cat has _____ fish for lunch.",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "fish 作食物时不可数，a little 表示一点。",
        "sentence": "The cat has a little fish for lunch.",
        "zh": "猫午餐吃了一点鱼。"
      },
      {
        "q": "_____ people know the answer. It's hard.",
        "opts": [
          "A little",
          "Few",
          "A few"
        ],
        "ans": 1,
        "hint": "people 可数复数，few 表示几乎没有。",
        "sentence": "Few people know the answer. It's hard.",
        "zh": "几乎没有人知道答案，很难。"
      },
      {
        "q": "There is _____ sugar in the coffee. It's sweet.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 2,
        "hint": "sugar 不可数，a little 表示一点。",
        "sentence": "There is a little sugar in the coffee. It's sweet.",
        "zh": "咖啡里有一点糖，很甜。"
      },
      {
        "q": "We have _____ classes on Friday afternoon.",
        "opts": [
          "a little",
          "few",
          "little"
        ],
        "ans": 1,
        "hint": "classes 可数复数，few 表示几乎没有。",
        "sentence": "We have few classes on Friday afternoon.",
        "zh": "我们周五下午几乎没有课。"
      },
      {
        "q": "I need _____ minutes to finish my homework.",
        "opts": [
          "a few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "minutes 可数复数，a few 表示几分钟。",
        "sentence": "I need a few minutes to finish my homework.",
        "zh": "我需要几分钟来完成作业。"
      },
      {
        "q": "There is _____ noise in the reading room.",
        "opts": [
          "a few",
          "few",
          "little"
        ],
        "ans": 2,
        "hint": "noise 不可数，little 表示几乎没有。",
        "sentence": "There is little noise in the reading room.",
        "zh": "阅览室里几乎没有噪音。"
      },
      {
        "q": "She has _____ trouble with her English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "trouble 不可数，a little 表示一点。",
        "sentence": "She has a little trouble with her English.",
        "zh": "她的英语有一点困难。"
      },
      {
        "q": "_____ children like to eat hot pot in summer.",
        "opts": [
          "A little",
          "A few",
          "Few"
        ],
        "ans": 2,
        "hint": "children 可数复数，few 表示几乎没有。",
        "sentence": "Few children like to eat hot pot in summer.",
        "zh": "很少有孩子喜欢在夏天吃火锅。"
      },
      {
        "q": "I have _____ questions about the homework.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "questions 可数复数，a few 表示几个。",
        "sentence": "I have a few questions about the homework.",
        "zh": "关于作业我有几个问题。"
      },
      {
        "q": "There is _____ space in my schoolbag. It's full.",
        "opts": [
          "a few",
          "little",
          "a little"
        ],
        "ans": 1,
        "hint": "space 不可数，little 表示几乎没有。",
        "sentence": "There is little space in my schoolbag. It's full.",
        "zh": "我的书包里几乎没有空间了，它满了。"
      },
      {
        "q": "The doctor has _____ time before the next patient.",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "time 不可数，a little 表示一点。",
        "sentence": "The doctor has a little time before the next patient.",
        "zh": "医生在下一个病人来之前有一点时间。"
      },
      {
        "q": "We saw _____ stars in the sky last night.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 2,
        "hint": "stars 可数复数，a few 表示几颗。",
        "sentence": "We saw a few stars in the sky last night.",
        "zh": "昨晚我们看到了几颗星星。"
      },
      {
        "q": "There are _____ eggs in the fridge. Let's buy some.",
        "opts": [
          "few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "eggs 可数复数，few 表示几乎没有。",
        "sentence": "There are few eggs in the fridge. Let's buy some.",
        "zh": "冰箱里几乎没有鸡蛋了，我们买一些吧。"
      },
      {
        "q": "I have _____ homework today. I can play.",
        "opts": [
          "few",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "homework 不可数，little 表示几乎没有。",
        "sentence": "I have little homework today. I can play.",
        "zh": "我今天几乎没有作业，可以玩。"
      },
      {
        "q": "There is _____ bread on the plate. Eat it.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "bread 不可数，a little 表示一点。",
        "sentence": "There is a little bread on the plate. Eat it.",
        "zh": "盘子里有一点面包，吃吧。"
      },
      {
        "q": "_____ birds are singing in the tree.",
        "opts": [
          "A little",
          "Little",
          "A few"
        ],
        "ans": 2,
        "hint": "birds 可数复数，a few 表示几只。",
        "sentence": "A few birds are singing in the tree.",
        "zh": "几只鸟在树上唱歌。"
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
    "image": "l15-few-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "a few apples",
        "zh": "几个苹果"
      },
      {
        "en": "few friends",
        "zh": "几乎没有朋友"
      },
      {
        "en": "a little water",
        "zh": "一点水"
      },
      {
        "en": "little time",
        "zh": "几乎没时间"
      },
      {
        "en": "few students",
        "zh": "几乎没有学生"
      },
      {
        "en": "a few pandas",
        "zh": "几只熊猫"
      },
      {
        "en": "a little milk",
        "zh": "一点牛奶"
      },
      {
        "en": "few buses",
        "zh": "几乎没有公交车"
      },
      {
        "en": "little money",
        "zh": "几乎没有钱"
      },
      {
        "en": "a few questions",
        "zh": "几个问题"
      },
      {
        "en": "little noise",
        "zh": "几乎没有噪音"
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
    "image": "l15-few-hero.jpg",
    "audio": "There are a few apples on the table.",
    "opts": [
      "There are a few apples on the table.",
      "There is a little apples on the table.",
      "There are few apples on the table."
    ],
    "ans": 0,
    "hint": "apples 可数，a few 正确。",
    "sentence": "There are a few apples on the table.",
    "zh": "桌子上有几个苹果。",
    "questions": [
      {
        "audio": "There are a few apples on the table.",
        "opts": [
          "There are a few apples on the table.",
          "There is a little apples on the table.",
          "There are few apples on the table."
        ],
        "ans": 0,
        "hint": "apples 可数，a few 正确。",
        "zh": "桌子上有几个苹果。",
        "sentence": "There are a few apples on the table."
      },
      {
        "audio": "I have little money.",
        "opts": [
          "I have little money.",
          "I have a few money.",
          "I have a little money."
        ],
        "ans": 0,
        "hint": "money 不可数，little 表示几乎没有。",
        "zh": "我几乎没有钱。",
        "sentence": "I have little money."
      },
      {
        "audio": "She drinks a little milk.",
        "opts": [
          "She drinks a little milk.",
          "She drinks a few milk.",
          "She drinks little milk."
        ],
        "ans": 0,
        "hint": "milk 不可数，a little 表示一点。",
        "zh": "她喝一点牛奶。",
        "sentence": "She drinks a little milk."
      },
      {
        "audio": "There are few buses after nine.",
        "opts": [
          "There are few buses after nine.",
          "There are a little buses after nine.",
          "There is few buses after nine."
        ],
        "ans": 0,
        "hint": "buses 可数复数，few 表示几乎没有。",
        "zh": "九点后几乎没有公交车。",
        "sentence": "There are few buses after nine."
      },
      {
        "audio": "We have a few pandas in the zoo.",
        "opts": [
          "We have a few pandas in the zoo.",
          "We have a little pandas in the zoo.",
          "We have few pandas in the zoo."
        ],
        "ans": 0,
        "hint": "pandas 可数复数，a few 表示几只。",
        "zh": "动物园里有几只熊猫。",
        "sentence": "We have a few pandas in the zoo."
      },
      {
        "audio": "There is little water left.",
        "opts": [
          "There is little water left.",
          "There is a few water left.",
          "There are little water left."
        ],
        "ans": 0,
        "hint": "water 不可数，little 表示几乎没有。",
        "zh": "几乎没水了。",
        "sentence": "There is little water left."
      },
      {
        "audio": "I have a few good friends.",
        "opts": [
          "I have a few good friends.",
          "I have a little good friends.",
          "I have few good friends."
        ],
        "ans": 0,
        "hint": "friends 可数复数，a few 表示几个。",
        "zh": "我有几个好朋友。",
        "sentence": "I have a few good friends."
      },
      {
        "audio": "She has little time to play.",
        "opts": [
          "She has little time to play.",
          "She has a few time to play.",
          "She has a little time to play."
        ],
        "ans": 0,
        "hint": "time 不可数，little 表示几乎没有。",
        "zh": "她几乎没有时间玩。",
        "sentence": "She has little time to play."
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
    "image": "l15-few-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "There are a few apples on the table.",
        "zh": "桌子上有几个苹果。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "There is little water left. We need to buy more.",
        "zh": "几乎没水了，我们需要再买一些。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "I have a few good friends in my class.",
        "zh": "我在班上有几个好朋友。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She has little time to play games today.",
        "zh": "她今天几乎没有时间玩游戏。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "There are few students in the library now.",
        "zh": "现在图书馆里几乎没有学生。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He drinks a little milk every morning.",
        "zh": "他每天早上喝一点牛奶。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We have a few pandas in Chengdu Zoo.",
        "zh": "成都动物园里有几只熊猫。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "There is little rain in winter here.",
        "zh": "这里冬天几乎不下雨。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "Can I have a little juice, please?",
        "zh": "请问我能喝一点果汁吗？",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "There are few buses after nine o'clock.",
        "zh": "九点之后几乎没有公交车了。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "I have little money, so I can't buy the toy.",
        "zh": "我几乎没有钱，所以买不了那个玩具。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "There are a few flowers in the garden.",
        "zh": "花园里有几朵花。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The cat has a little fish for lunch.",
        "zh": "猫午餐吃了一点鱼。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "Few people know the answer to this question.",
        "zh": "几乎没有人知道这个问题的答案。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "There is a little sugar in the coffee.",
        "zh": "咖啡里有一点糖。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We have few classes on Friday afternoon.",
        "zh": "我们周五下午几乎没有课。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I need a few minutes to finish my homework.",
        "zh": "我需要几分钟来完成作业。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "There is little noise in the reading room.",
        "zh": "阅览室里几乎没有噪音。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "She has a little trouble with her English.",
        "zh": "她的英语有一点困难。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Few children like to eat hot pot in summer.",
        "zh": "很少有孩子喜欢在夏天吃火锅。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I have a few questions about the homework.",
        "zh": "关于作业我有几个问题。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "There is little space in my schoolbag.",
        "zh": "我的书包里几乎没有空间了。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The doctor has a little time before the next patient.",
        "zh": "医生在下一个病人来之前有一点时间。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "We saw a few stars in the sky last night.",
        "zh": "昨晚我们看到了几颗星星。",
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
    "image": "l15-few-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "I have _____ money. I can't buy the toy.",
        "opts": [
          "a few",
          "a little",
          "little"
        ],
        "ans": 2,
        "hint": "money 不可数，little 表示几乎没有。",
        "sentence": "I have little money. I can't buy the toy.",
        "zh": "我几乎没有钱，买不了那个玩具。"
      },
      {
        "q": "There are _____ flowers in the garden.",
        "opts": [
          "little",
          "a few",
          "a little"
        ],
        "ans": 1,
        "hint": "flowers 可数复数，a few 表示几朵。",
        "sentence": "There are a few flowers in the garden.",
        "zh": "花园里有几朵花。"
      },
      {
        "q": "The cat has _____ fish for lunch.",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "fish 作食物时不可数，a little 表示一点。",
        "sentence": "The cat has a little fish for lunch.",
        "zh": "猫午餐吃了一点鱼。"
      },
      {
        "q": "_____ people know the answer. It's hard.",
        "opts": [
          "A little",
          "Few",
          "A few"
        ],
        "ans": 1,
        "hint": "people 可数复数，few 表示几乎没有。",
        "sentence": "Few people know the answer. It's hard.",
        "zh": "几乎没有人知道答案，很难。"
      },
      {
        "q": "There is _____ sugar in the coffee. It's sweet.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 2,
        "hint": "sugar 不可数，a little 表示一点。",
        "sentence": "There is a little sugar in the coffee. It's sweet.",
        "zh": "咖啡里有一点糖，很甜。"
      },
      {
        "q": "We have _____ classes on Friday afternoon.",
        "opts": [
          "a little",
          "few",
          "little"
        ],
        "ans": 1,
        "hint": "classes 可数复数，few 表示几乎没有。",
        "sentence": "We have few classes on Friday afternoon.",
        "zh": "我们周五下午几乎没有课。"
      },
      {
        "q": "I need _____ minutes to finish my homework.",
        "opts": [
          "a few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "minutes 可数复数，a few 表示几分钟。",
        "sentence": "I need a few minutes to finish my homework.",
        "zh": "我需要几分钟来完成作业。"
      },
      {
        "q": "There is _____ noise in the reading room.",
        "opts": [
          "a few",
          "few",
          "little"
        ],
        "ans": 2,
        "hint": "noise 不可数，little 表示几乎没有。",
        "sentence": "There is little noise in the reading room.",
        "zh": "阅览室里几乎没有噪音。"
      },
      {
        "q": "She has _____ trouble with her English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "trouble 不可数，a little 表示一点。",
        "sentence": "She has a little trouble with her English.",
        "zh": "她的英语有一点困难。"
      },
      {
        "q": "_____ children like to eat hot pot in summer.",
        "opts": [
          "A little",
          "A few",
          "Few"
        ],
        "ans": 2,
        "hint": "children 可数复数，few 表示几乎没有。",
        "sentence": "Few children like to eat hot pot in summer.",
        "zh": "很少有孩子喜欢在夏天吃火锅。"
      },
      {
        "q": "I have _____ questions about the homework.",
        "opts": [
          "a little",
          "a few",
          "little"
        ],
        "ans": 1,
        "hint": "questions 可数复数，a few 表示几个。",
        "sentence": "I have a few questions about the homework.",
        "zh": "关于作业我有几个问题。"
      },
      {
        "q": "There is _____ space in my schoolbag. It's full.",
        "opts": [
          "a few",
          "little",
          "a little"
        ],
        "ans": 1,
        "hint": "space 不可数，little 表示几乎没有。",
        "sentence": "There is little space in my schoolbag. It's full.",
        "zh": "我的书包里几乎没有空间了，它满了。"
      },
      {
        "q": "The doctor has _____ time before the next patient.",
        "opts": [
          "a little",
          "a few",
          "few"
        ],
        "ans": 0,
        "hint": "time 不可数，a little 表示一点。",
        "sentence": "The doctor has a little time before the next patient.",
        "zh": "医生在下一个病人来之前有一点时间。"
      },
      {
        "q": "We saw _____ stars in the sky last night.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 2,
        "hint": "stars 可数复数，a few 表示几颗。",
        "sentence": "We saw a few stars in the sky last night.",
        "zh": "昨晚我们看到了几颗星星。"
      },
      {
        "q": "There are _____ eggs in the fridge. Let's buy some.",
        "opts": [
          "few",
          "a little",
          "little"
        ],
        "ans": 0,
        "hint": "eggs 可数复数，few 表示几乎没有。",
        "sentence": "There are few eggs in the fridge. Let's buy some.",
        "zh": "冰箱里几乎没有鸡蛋了，我们买一些吧。"
      },
      {
        "q": "I have _____ homework today. I can play.",
        "opts": [
          "few",
          "a few",
          "little"
        ],
        "ans": 2,
        "hint": "homework 不可数，little 表示几乎没有。",
        "sentence": "I have little homework today. I can play.",
        "zh": "我今天几乎没有作业，可以玩。"
      },
      {
        "q": "There is _____ bread on the plate. Eat it.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "bread 不可数，a little 表示一点。",
        "sentence": "There is a little bread on the plate. Eat it.",
        "zh": "盘子里有一点面包，吃吧。"
      },
      {
        "q": "_____ birds are singing in the tree.",
        "opts": [
          "A little",
          "Little",
          "A few"
        ],
        "ans": 2,
        "hint": "birds 可数复数，a few 表示几只。",
        "sentence": "A few birds are singing in the tree.",
        "zh": "几只鸟在树上唱歌。"
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
      "a few + 可数复数；a little + 不可数",
      "few/little 表否定「几乎没有」",
      "写作：I have a little time, but few ideas.",
      "only a few / only a little 仍表「只有一些」，但带有「不多」的口气。"
    ],
    "chant": "A few count, a little mass! Without a — almost none — alas!",
    "chantSpeak": "A few count, a little mass! Without a, almost none, alas!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "a few / a little / few / little",
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