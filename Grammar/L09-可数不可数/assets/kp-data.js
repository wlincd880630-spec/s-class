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
    "audio": "How much water do you drink every day?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？",
    "image": "l10-count-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l10-count-hero.jpg",
    "question": "water 为什么用 much 而不是 many？",
    "choices": [
      {
        "text": "water 不可数，用 much",
        "correct": true,
        "fb": "对了！不可数名词用 much/a little。"
      },
      {
        "text": "water 是复数",
        "correct": false,
        "fb": "water 不可数，没有复数形式。"
      },
      {
        "text": "much 只能修饰人",
        "correct": false,
        "fb": "much 修饰不可数名词。"
      }
    ],
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l10-count-hero.jpg",
    "lead": "可数名词能数个数；不可数名词要用计量短语。",
    "formula": "many / a few + 复数　　much / a little + 不可数",
    "parts": [
      {
        "mark": "可数",
        "label": "有复数",
        "example": "apples / books"
      },
      {
        "mark": "不可数",
        "label": "无复数",
        "example": "water / homework"
      },
      {
        "mark": "计量",
        "label": "量词 + of",
        "example": "a bottle of water"
      }
    ],
    "samples": [
      {
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "sentence": "I don't have much homework today.",
        "zh": "我今天作业不多。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l10-many.jpg",
    "rightImage": "l10-much.jpg",
    "leftLabel": "many books（可数）",
    "rightLabel": "much water（不可数）",
    "leftSentence": "How many books do you have?",
    "leftZh": "你有多少本书？",
    "rightSentence": "How much water do you need?",
    "rightZh": "你需要多少水？",
    "morphBase": "many",
    "morphPast": "much",
    "morphHighlight": "",
    "discovery": "可数：many/few/a few；不可数：much/little/a little。"
  },
  {
    "section": "精讲",
    "title": "例句 · How much water",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l10-count-hero.jpg",
    "lead": "water 不可数 → How much。",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 两杯茶",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l10-count-hero.jpg",
    "lead": "不可数可用计量：two cups of tea。",
    "sentence": "I would like two cups of tea.",
    "zh": "我想要两杯茶。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "可数名词用 many / a few",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "可数名词有复数形式，比如 books, apples。",
    "sentence": "There are many books in the library.",
    "zh": "图书馆里有很多书。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "不可数名词用 much / a little",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "不可数名词没有复数，比如 water, milk。",
    "sentence": "There is a little water in the bottle.",
    "zh": "瓶子里有一点水。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "量词 + of 来计量",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "我们可以用 a cup of, a piece of 来计量不可数名词。",
    "sentence": "I drink a cup of milk every day.",
    "zh": "我每天喝一杯牛奶。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l10-count-hero.jpg",
    "rules": [
      {
        "tab": "可数",
        "rule": "many / a few / few + 可数名词复数",
        "focusVerb": "many",
        "examples": [
          {
            "from": "book",
            "to": "many books"
          },
          {
            "from": "few",
            "to": "a few apples"
          }
        ],
        "sample": "How many students are there in your class?",
        "sampleZh": "你们班有多少学生？"
      },
      {
        "tab": "不可数",
        "rule": "much / a little / little + 不可数名词",
        "focusVerb": "much",
        "examples": [
          {
            "from": "water",
            "to": "much water"
          },
          {
            "from": "milk",
            "to": "a little milk"
          }
        ],
        "sample": "How much water do you drink every day?",
        "sampleZh": "你每天喝多少水？"
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
    "image": "l10-count-hero.jpg",
    "buckets": [
      {
        "key": "c",
        "label": "可数名词"
      },
      {
        "key": "u",
        "label": "不可数名词"
      }
    ],
    "items": [
      {
        "text": "apple",
        "bucket": "c"
      },
      {
        "text": "water",
        "bucket": "u"
      },
      {
        "text": "rice",
        "bucket": "u"
      },
      {
        "text": "student",
        "bucket": "c"
      },
      {
        "text": "milk",
        "bucket": "u"
      },
      {
        "text": "homework",
        "bucket": "u"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l10-count-hero.jpg",
    "question": "「I have many homeworks today.」应改成？",
    "choices": [
      {
        "text": "much homework（homework 不可数）",
        "correct": true,
        "fb": "homework 没有复数。"
      },
      {
        "text": "many homework",
        "correct": false,
        "fb": "many 要加可数复数。"
      },
      {
        "text": "a few homeworks",
        "correct": false,
        "fb": "不能加 s。"
      }
    ],
    "sentence": "I have much homework today.",
    "zh": "我今天有很多作业。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l10-count-hero.jpg",
    "lead": "把可数句的 many 改成不可数搭配 much。",
    "items": [
      {
        "from": "I have many apples.",
        "fromZh": "我有许多苹果。",
        "steps": [
          {
            "label": "如果是水，怎么说「许多」？",
            "opts": [
              "I have much water.",
              "I have many water.",
              "I have a few water."
            ],
            "ans": 0,
            "hint": "water 不可数 → much water。",
            "sentence": "I have much water.",
            "zh": "我有很多水。"
          }
        ]
      },
      {
        "from": "I have many homeworks today.",
        "fromZh": "我今天有很多作业。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "I have much homework today.",
              "I have many homework today.",
              "I have a few homeworks today."
            ],
            "ans": 0,
            "hint": "homework 不可数，没有复数形式。",
            "sentence": "I have much homework today.",
            "zh": "我今天有很多作业。"
          }
        ]
      },
      {
        "from": "There are much water in the glass.",
        "fromZh": "杯子里有很多水。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "There is much water in the glass.",
              "There are many water in the glass.",
              "There is a few water in the glass."
            ],
            "ans": 0,
            "hint": "water 不可数，be 动词用 is。",
            "sentence": "There is much water in the glass.",
            "zh": "杯子里有很多水。"
          }
        ]
      },
      {
        "from": "She has a few milk.",
        "fromZh": "她有一点牛奶。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "She has a little milk.",
              "She has a few milks.",
              "She has much milks."
            ],
            "ans": 0,
            "hint": "milk 不可数，用 a little。",
            "sentence": "She has a little milk.",
            "zh": "她有一点牛奶。"
          }
        ]
      },
      {
        "from": "How much apples do you have?",
        "fromZh": "你有多少个苹果？",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "How many apples do you have?",
              "How much apple do you have?",
              "How many apple do you have?"
            ],
            "ans": 0,
            "hint": "apples 可数复数，用 many。",
            "sentence": "How many apples do you have?",
            "zh": "你有多少个苹果？"
          }
        ]
      },
      {
        "from": "I don't have many time.",
        "fromZh": "我没有很多时间。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "I don't have much time.",
              "I don't have many times.",
              "I don't have a few time."
            ],
            "ans": 0,
            "hint": "time 不可数，用 much。",
            "sentence": "I don't have much time.",
            "zh": "我没有很多时间。"
          }
        ]
      },
      {
        "from": "We need a little eggs.",
        "fromZh": "我们需要几个鸡蛋。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "We need a few eggs.",
              "We need a little egg.",
              "We need many egg."
            ],
            "ans": 0,
            "hint": "eggs 可数复数，用 a few。",
            "sentence": "We need a few eggs.",
            "zh": "我们需要几个鸡蛋。"
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
      "How",
      "many",
      "apples",
      "do",
      "you",
      "have"
    ],
    "sentence": "How many apples do you have?",
    "zh": "你有多少个苹果？",
    "items": [
      {
        "tokens": [
          "How",
          "many",
          "apples",
          "do",
          "you",
          "have"
        ],
        "sentence": "How many apples do you have?",
        "zh": "你有多少个苹果？",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "There",
          "is",
          "a",
          "little",
          "water",
          "in",
          "the",
          "bottle"
        ],
        "sentence": "There is a little water in the bottle.",
        "zh": "瓶子里有一点水。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "I",
          "have",
          "a",
          "few",
          "friends",
          "in",
          "Chengdu"
        ],
        "sentence": "I have a few friends in Chengdu.",
        "zh": "我在成都有几个朋友。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "She",
          "doesn't",
          "have",
          "much",
          "homework",
          "today"
        ],
        "sentence": "She doesn't have much homework today.",
        "zh": "她今天作业不多。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "We",
          "need",
          "many",
          "eggs",
          "for",
          "the",
          "cake"
        ],
        "sentence": "We need many eggs for the cake.",
        "zh": "我们需要很多鸡蛋来做蛋糕。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "There",
          "are",
          "many",
          "pandas",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "There are many pandas in the zoo.",
        "zh": "动物园里有很多熊猫。",
        "image": "kp3d-panda.png"
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
    "image": "l10-count-hero.jpg",
    "audio": "I don't have much homework today.",
    "tokens": [
      "I",
      "don't",
      "have",
      "much",
      "homework",
      "today"
    ],
    "sentence": "I don't have much homework today.",
    "zh": "我今天作业不多。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l10-count-hero.jpg",
    "q": "There isn't _____ milk in the fridge.",
    "opts": [
      "many",
      "much",
      "few"
    ],
    "ans": 1,
    "hint": "milk 不可数，用 much。",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l10-count-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "q": "How _____ books do you have?",
        "opts": [
          "much",
          "many",
          "little"
        ],
        "ans": 1,
        "hint": "books 可数 → many。",
        "sentence": "How many books do you have?",
        "zh": "你有多少本书？"
      },
      {
        "q": "I'd like _____ bread, please.",
        "opts": [
          "a",
          "an",
          "some"
        ],
        "ans": 2,
        "hint": "bread 不可数，用 some。",
        "sentence": "I'd like some bread, please.",
        "zh": "请给我一些面包。"
      },
      {
        "q": "There are _____ students in the hall.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "students 可数复数 → many。",
        "sentence": "There are many students in the hall.",
        "zh": "大厅里有许多学生。"
      },
      {
        "q": "Please give me _____ of water.",
        "opts": [
          "a bottle",
          "many",
          "few"
        ],
        "ans": 0,
        "hint": "计量短语 a bottle of water。",
        "sentence": "Please give me a bottle of water.",
        "zh": "请给我一瓶水。"
      },
      {
        "q": "How _____ apples do you have?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "apples 是可数名词复数，用 many。",
        "sentence": "How many apples do you have?",
        "zh": "你有多少个苹果？"
      },
      {
        "q": "There isn't _____ milk in the glass.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "milk 是不可数名词，用 much。",
        "sentence": "There isn't much milk in the glass.",
        "zh": "杯子里没有多少牛奶。"
      },
      {
        "q": "I have _____ homework today.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "homework 不可数，用 much。",
        "sentence": "I have much homework today.",
        "zh": "我今天有很多作业。"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "much",
          "a little",
          "a few"
        ],
        "ans": 2,
        "hint": "friends 可数，用 a few。",
        "sentence": "She has a few friends in Chengdu.",
        "zh": "她在成都有几个朋友。"
      },
      {
        "q": "We need _____ eggs for the cake.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "eggs 可数复数，用 many。",
        "sentence": "We need many eggs for the cake.",
        "zh": "我们需要很多鸡蛋来做蛋糕。"
      },
      {
        "q": "There is _____ water in the bottle.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "water 不可数，用 a little。",
        "sentence": "There is a little water in the bottle.",
        "zh": "瓶子里有一点水。"
      },
      {
        "q": "How _____ money do you have?",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "money 不可数，用 much。",
        "sentence": "How much money do you have?",
        "zh": "你有多少钱？"
      },
      {
        "q": "There are _____ pandas in the zoo.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "pandas 可数，用 many。",
        "sentence": "There are many pandas in the zoo.",
        "zh": "动物园里有很多熊猫。"
      },
      {
        "q": "I have _____ time to play.",
        "opts": [
          "many",
          "a few",
          "much"
        ],
        "ans": 2,
        "hint": "time 不可数，用 much。",
        "sentence": "I have much time to play.",
        "zh": "我有很多时间玩。"
      },
      {
        "q": "She drinks _____ coffee every morning.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "coffee 不可数，用 a little。",
        "sentence": "She drinks a little coffee every morning.",
        "zh": "她每天早上喝一点咖啡。"
      },
      {
        "q": "There are _____ books on the shelf.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "books 可数，用 many。",
        "sentence": "There are many books on the shelf.",
        "zh": "书架上有许多书。"
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
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "q": "How _____ books do you have?",
        "opts": [
          "much",
          "many",
          "little"
        ],
        "ans": 1,
        "hint": "books 可数 → many。",
        "sentence": "How many books do you have?",
        "zh": "你有多少本书？"
      },
      {
        "q": "I'd like _____ bread, please.",
        "opts": [
          "a",
          "an",
          "some"
        ],
        "ans": 2,
        "hint": "bread 不可数，用 some。",
        "sentence": "I'd like some bread, please.",
        "zh": "请给我一些面包。"
      },
      {
        "q": "There are _____ students in the hall.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "students 可数复数 → many。",
        "sentence": "There are many students in the hall.",
        "zh": "大厅里有许多学生。"
      },
      {
        "q": "Please give me _____ of water.",
        "opts": [
          "a bottle",
          "many",
          "few"
        ],
        "ans": 0,
        "hint": "计量短语 a bottle of water。",
        "sentence": "Please give me a bottle of water.",
        "zh": "请给我一瓶水。"
      },
      {
        "q": "How _____ apples do you have?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "apples 是可数名词复数，用 many。",
        "sentence": "How many apples do you have?",
        "zh": "你有多少个苹果？"
      },
      {
        "q": "There isn't _____ milk in the glass.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "milk 是不可数名词，用 much。",
        "sentence": "There isn't much milk in the glass.",
        "zh": "杯子里没有多少牛奶。"
      },
      {
        "q": "I have _____ homework today.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "homework 不可数，用 much。",
        "sentence": "I have much homework today.",
        "zh": "我今天有很多作业。"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "much",
          "a little",
          "a few"
        ],
        "ans": 2,
        "hint": "friends 可数，用 a few。",
        "sentence": "She has a few friends in Chengdu.",
        "zh": "她在成都有几个朋友。"
      },
      {
        "q": "We need _____ eggs for the cake.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "eggs 可数复数，用 many。",
        "sentence": "We need many eggs for the cake.",
        "zh": "我们需要很多鸡蛋来做蛋糕。"
      },
      {
        "q": "There is _____ water in the bottle.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "water 不可数，用 a little。",
        "sentence": "There is a little water in the bottle.",
        "zh": "瓶子里有一点水。"
      },
      {
        "q": "How _____ money do you have?",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "money 不可数，用 much。",
        "sentence": "How much money do you have?",
        "zh": "你有多少钱？"
      },
      {
        "q": "There are _____ pandas in the zoo.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "pandas 可数，用 many。",
        "sentence": "There are many pandas in the zoo.",
        "zh": "动物园里有很多熊猫。"
      },
      {
        "q": "I have _____ time to play.",
        "opts": [
          "many",
          "a few",
          "much"
        ],
        "ans": 2,
        "hint": "time 不可数，用 much。",
        "sentence": "I have much time to play.",
        "zh": "我有很多时间玩。"
      },
      {
        "q": "She drinks _____ coffee every morning.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "coffee 不可数，用 a little。",
        "sentence": "She drinks a little coffee every morning.",
        "zh": "她每天早上喝一点咖啡。"
      },
      {
        "q": "There are _____ books on the shelf.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "books 可数，用 many。",
        "sentence": "There are many books on the shelf.",
        "zh": "书架上有许多书。"
      },
      {
        "q": "I don't have _____ homework today.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "homework 不可数，用 much。",
        "sentence": "I don't have much homework today.",
        "zh": "我今天作业不多。"
      },
      {
        "q": "He has _____ money in his wallet.",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "money 不可数，用 a little。",
        "sentence": "He has a little money in his wallet.",
        "zh": "他钱包里有一点钱。"
      },
      {
        "q": "We saw _____ stars in the sky.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "stars 可数，用 many。",
        "sentence": "We saw many stars in the sky.",
        "zh": "我们看到了很多星星。"
      },
      {
        "q": "Can I have _____ juice, please?",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "juice 不可数，用 a little。",
        "sentence": "Can I have a little juice, please?",
        "zh": "请给我一点果汁好吗？"
      },
      {
        "q": "There is _____ bread on the table.",
        "opts": [
          "much",
          "many",
          "a few"
        ],
        "ans": 0,
        "hint": "bread 不可数，用 much。",
        "sentence": "There is much bread on the table.",
        "zh": "桌子上有很多面包。"
      },
      {
        "q": "How _____ carrots do you need?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "carrots 可数，用 many。",
        "sentence": "How many carrots do you need?",
        "zh": "你需要多少胡萝卜？"
      },
      {
        "q": "She has _____ rice in her bowl.",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "rice 不可数，用 a little。",
        "sentence": "She has a little rice in her bowl.",
        "zh": "她碗里有一点米饭。"
      },
      {
        "q": "There aren't _____ tomatoes in the fridge.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "tomatoes 可数，用 many。",
        "sentence": "There aren't many tomatoes in the fridge.",
        "zh": "冰箱里没有很多西红柿。"
      },
      {
        "q": "I have _____ questions to ask.",
        "opts": [
          "a little",
          "much",
          "a few"
        ],
        "ans": 2,
        "hint": "questions 可数，用 a few。",
        "sentence": "I have a few questions to ask.",
        "zh": "我有几个问题要问。"
      },
      {
        "q": "He drinks _____ water every day.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "water 不可数，用 much。",
        "sentence": "He drinks much water every day.",
        "zh": "他每天喝很多水。"
      },
      {
        "q": "There are _____ chairs in the room.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "chairs 可数，用 many。",
        "sentence": "There are many chairs in the room.",
        "zh": "房间里有很多椅子。"
      },
      {
        "q": "I have _____ sugar in my tea.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "sugar 不可数，用 a little。",
        "sentence": "I have a little sugar in my tea.",
        "zh": "我的茶里有一点糖。"
      },
      {
        "q": "How _____ oranges are there on the table?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "oranges 可数，用 many。",
        "sentence": "How many oranges are there on the table?",
        "zh": "桌子上有多少个橙子？"
      },
      {
        "q": "We don't have _____ milk at home.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "We don't have much milk at home.",
        "zh": "我们家里没有很多牛奶。"
      },
      {
        "q": "She has _____ pencils in her pencil case.",
        "opts": [
          "a little",
          "much",
          "a few"
        ],
        "ans": 2,
        "hint": "pencils 可数，用 a few。",
        "sentence": "She has a few pencils in her pencil case.",
        "zh": "她的铅笔盒里有几支铅笔。"
      },
      {
        "q": "There is _____ cheese on the pizza.",
        "opts": [
          "many",
          "a few",
          "a little"
        ],
        "ans": 2,
        "hint": "cheese 不可数，用 a little。",
        "sentence": "There is a little cheese on the pizza.",
        "zh": "披萨上有一点奶酪。"
      },
      {
        "q": "I need _____ butter for the bread.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "butter 不可数，用 a little。",
        "sentence": "I need a little butter for the bread.",
        "zh": "我需要一点黄油来配面包。"
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
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "q": "How _____ books do you have?",
        "opts": [
          "much",
          "many",
          "little"
        ],
        "ans": 1,
        "hint": "books 可数 → many。",
        "sentence": "How many books do you have?",
        "zh": "你有多少本书？"
      },
      {
        "q": "I'd like _____ bread, please.",
        "opts": [
          "a",
          "an",
          "some"
        ],
        "ans": 2,
        "hint": "bread 不可数，用 some。",
        "sentence": "I'd like some bread, please.",
        "zh": "请给我一些面包。"
      },
      {
        "q": "There are _____ students in the hall.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "students 可数复数 → many。",
        "sentence": "There are many students in the hall.",
        "zh": "大厅里有许多学生。"
      },
      {
        "q": "Please give me _____ of water.",
        "opts": [
          "a bottle",
          "many",
          "few"
        ],
        "ans": 0,
        "hint": "计量短语 a bottle of water。",
        "sentence": "Please give me a bottle of water.",
        "zh": "请给我一瓶水。"
      },
      {
        "q": "How _____ apples do you have?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "apples 是可数名词复数，用 many。",
        "sentence": "How many apples do you have?",
        "zh": "你有多少个苹果？"
      },
      {
        "q": "There isn't _____ milk in the glass.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "milk 是不可数名词，用 much。",
        "sentence": "There isn't much milk in the glass.",
        "zh": "杯子里没有多少牛奶。"
      },
      {
        "q": "I have _____ homework today.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "homework 不可数，用 much。",
        "sentence": "I have much homework today.",
        "zh": "我今天有很多作业。"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "much",
          "a little",
          "a few"
        ],
        "ans": 2,
        "hint": "friends 可数，用 a few。",
        "sentence": "She has a few friends in Chengdu.",
        "zh": "她在成都有几个朋友。"
      },
      {
        "q": "We need _____ eggs for the cake.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "eggs 可数复数，用 many。",
        "sentence": "We need many eggs for the cake.",
        "zh": "我们需要很多鸡蛋来做蛋糕。"
      },
      {
        "q": "There is _____ water in the bottle.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "water 不可数，用 a little。",
        "sentence": "There is a little water in the bottle.",
        "zh": "瓶子里有一点水。"
      },
      {
        "q": "How _____ money do you have?",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "money 不可数，用 much。",
        "sentence": "How much money do you have?",
        "zh": "你有多少钱？"
      },
      {
        "q": "There are _____ pandas in the zoo.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "pandas 可数，用 many。",
        "sentence": "There are many pandas in the zoo.",
        "zh": "动物园里有很多熊猫。"
      },
      {
        "q": "I have _____ time to play.",
        "opts": [
          "many",
          "a few",
          "much"
        ],
        "ans": 2,
        "hint": "time 不可数，用 much。",
        "sentence": "I have much time to play.",
        "zh": "我有很多时间玩。"
      },
      {
        "q": "She drinks _____ coffee every morning.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "coffee 不可数，用 a little。",
        "sentence": "She drinks a little coffee every morning.",
        "zh": "她每天早上喝一点咖啡。"
      },
      {
        "q": "There are _____ books on the shelf.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "books 可数，用 many。",
        "sentence": "There are many books on the shelf.",
        "zh": "书架上有许多书。"
      },
      {
        "q": "I don't have _____ homework today.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "homework 不可数，用 much。",
        "sentence": "I don't have much homework today.",
        "zh": "我今天作业不多。"
      },
      {
        "q": "He has _____ money in his wallet.",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "money 不可数，用 a little。",
        "sentence": "He has a little money in his wallet.",
        "zh": "他钱包里有一点钱。"
      },
      {
        "q": "We saw _____ stars in the sky.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "stars 可数，用 many。",
        "sentence": "We saw many stars in the sky.",
        "zh": "我们看到了很多星星。"
      },
      {
        "q": "Can I have _____ juice, please?",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "juice 不可数，用 a little。",
        "sentence": "Can I have a little juice, please?",
        "zh": "请给我一点果汁好吗？"
      },
      {
        "q": "There is _____ bread on the table.",
        "opts": [
          "much",
          "many",
          "a few"
        ],
        "ans": 0,
        "hint": "bread 不可数，用 much。",
        "sentence": "There is much bread on the table.",
        "zh": "桌子上有很多面包。"
      },
      {
        "q": "How _____ carrots do you need?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "carrots 可数，用 many。",
        "sentence": "How many carrots do you need?",
        "zh": "你需要多少胡萝卜？"
      },
      {
        "q": "She has _____ rice in her bowl.",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "rice 不可数，用 a little。",
        "sentence": "She has a little rice in her bowl.",
        "zh": "她碗里有一点米饭。"
      },
      {
        "q": "There aren't _____ tomatoes in the fridge.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "tomatoes 可数，用 many。",
        "sentence": "There aren't many tomatoes in the fridge.",
        "zh": "冰箱里没有很多西红柿。"
      },
      {
        "q": "I have _____ questions to ask.",
        "opts": [
          "a little",
          "much",
          "a few"
        ],
        "ans": 2,
        "hint": "questions 可数，用 a few。",
        "sentence": "I have a few questions to ask.",
        "zh": "我有几个问题要问。"
      },
      {
        "q": "He drinks _____ water every day.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "water 不可数，用 much。",
        "sentence": "He drinks much water every day.",
        "zh": "他每天喝很多水。"
      },
      {
        "q": "There are _____ chairs in the room.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "chairs 可数，用 many。",
        "sentence": "There are many chairs in the room.",
        "zh": "房间里有很多椅子。"
      },
      {
        "q": "I have _____ sugar in my tea.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "sugar 不可数，用 a little。",
        "sentence": "I have a little sugar in my tea.",
        "zh": "我的茶里有一点糖。"
      },
      {
        "q": "How _____ oranges are there on the table?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "oranges 可数，用 many。",
        "sentence": "How many oranges are there on the table?",
        "zh": "桌子上有多少个橙子？"
      },
      {
        "q": "We don't have _____ milk at home.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "We don't have much milk at home.",
        "zh": "我们家里没有很多牛奶。"
      },
      {
        "q": "She has _____ pencils in her pencil case.",
        "opts": [
          "a little",
          "much",
          "a few"
        ],
        "ans": 2,
        "hint": "pencils 可数，用 a few。",
        "sentence": "She has a few pencils in her pencil case.",
        "zh": "她的铅笔盒里有几支铅笔。"
      },
      {
        "q": "There is _____ cheese on the pizza.",
        "opts": [
          "many",
          "a few",
          "a little"
        ],
        "ans": 2,
        "hint": "cheese 不可数，用 a little。",
        "sentence": "There is a little cheese on the pizza.",
        "zh": "披萨上有一点奶酪。"
      },
      {
        "q": "I need _____ butter for the bread.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "butter 不可数，用 a little。",
        "sentence": "I need a little butter for the bread.",
        "zh": "我需要一点黄油来配面包。"
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
    "image": "l10-count-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "many books",
        "zh": "许多书（可数）"
      },
      {
        "en": "much water",
        "zh": "许多水（不可数）"
      },
      {
        "en": "a cup of tea",
        "zh": "一杯茶"
      },
      {
        "en": "How much…?",
        "zh": "多少（不可数）"
      },
      {
        "en": "a few friends",
        "zh": "几个朋友"
      },
      {
        "en": "a little milk",
        "zh": "一点牛奶"
      },
      {
        "en": "much homework",
        "zh": "很多作业"
      },
      {
        "en": "many pandas",
        "zh": "很多熊猫"
      },
      {
        "en": "a little time",
        "zh": "一点时间"
      },
      {
        "en": "a few eggs",
        "zh": "几个鸡蛋"
      },
      {
        "en": "much money",
        "zh": "很多钱"
      },
      {
        "en": "many stars",
        "zh": "很多星星"
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
    "image": "l10-count-hero.jpg",
    "audio": "I have a few friends.",
    "opts": [
      "I have a few friends.",
      "I have a little friends.",
      "I have much friends."
    ],
    "ans": 0,
    "hint": "friends 可数，用 a few。",
    "sentence": "I have a few friends.",
    "zh": "我有几个朋友。",
    "questions": [
      {
        "audio": "I have a few friends.",
        "opts": [
          "I have a few friends.",
          "I have a little friends.",
          "I have much friends."
        ],
        "ans": 0,
        "hint": "friends 可数，用 a few。",
        "zh": "我有几个朋友。",
        "sentence": "I have a few friends."
      },
      {
        "audio": "She drinks much water.",
        "opts": [
          "She drinks much water.",
          "She drinks many water.",
          "She drinks a few water."
        ],
        "ans": 0,
        "hint": "water 不可数，用 much。",
        "zh": "她喝很多水。",
        "sentence": "She drinks much water."
      },
      {
        "audio": "There is a little milk in the cup.",
        "opts": [
          "There is a little milk in the cup.",
          "There is a few milk in the cup.",
          "There are a little milk in the cup."
        ],
        "ans": 0,
        "hint": "milk 不可数，用 a little。",
        "zh": "杯子里有一点牛奶。",
        "sentence": "There is a little milk in the cup."
      },
      {
        "audio": "How many books do you have?",
        "opts": [
          "How many books do you have?",
          "How much books do you have?",
          "How many book do you have?"
        ],
        "ans": 0,
        "hint": "books 可数复数，用 many。",
        "zh": "你有多少本书？",
        "sentence": "How many books do you have?"
      },
      {
        "audio": "I don't have much homework.",
        "opts": [
          "I don't have much homework.",
          "I don't have many homework.",
          "I don't have many homeworks."
        ],
        "ans": 0,
        "hint": "homework 不可数，用 much。",
        "zh": "我作业不多。",
        "sentence": "I don't have much homework."
      },
      {
        "audio": "There are many pandas in the zoo.",
        "opts": [
          "There are many pandas in the zoo.",
          "There are much pandas in the zoo.",
          "There is many pandas in the zoo."
        ],
        "ans": 0,
        "hint": "pandas 可数复数，用 many。",
        "zh": "动物园里有很多熊猫。",
        "sentence": "There are many pandas in the zoo."
      },
      {
        "audio": "She has a little money.",
        "opts": [
          "She has a little money.",
          "She has a few money.",
          "She has many money."
        ],
        "ans": 0,
        "hint": "money 不可数，用 a little。",
        "zh": "她有一点钱。",
        "sentence": "She has a little money."
      },
      {
        "audio": "We need a few eggs.",
        "opts": [
          "We need a few eggs.",
          "We need a little eggs.",
          "We need much eggs."
        ],
        "ans": 0,
        "hint": "eggs 可数复数，用 a few。",
        "zh": "我们需要几个鸡蛋。",
        "sentence": "We need a few eggs."
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
    "image": "l10-count-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "How much water do you drink every day?",
        "zh": "你每天喝多少水？",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I don't have much homework today.",
        "zh": "我今天作业不多。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "There are many books in the library.",
        "zh": "图书馆里有很多书。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "I have a few friends in my class.",
        "zh": "我在班上有几个朋友。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She drinks a little milk every morning.",
        "zh": "她每天早上喝一点牛奶。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We need many eggs for the cake.",
        "zh": "我们需要很多鸡蛋来做蛋糕。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "He has a little money in his pocket.",
        "zh": "他口袋里有一点钱。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "How many pandas are there in the zoo?",
        "zh": "动物园里有多少只熊猫？",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I have much time to play after school.",
        "zh": "放学后我有很多时间玩。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "There are a few apples on the table.",
        "zh": "桌子上有几个苹果。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "She doesn't have much rice for lunch.",
        "zh": "她午餐没有很多米饭。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We saw many stars in the sky last night.",
        "zh": "昨晚我们看到了很多星星。",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "Can I have a little juice, please?",
        "zh": "请给我一点果汁好吗？",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "There is much bread on the plate.",
        "zh": "盘子里有很多面包。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He has a few toys in his room.",
        "zh": "他房间里有几个玩具。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "How much cheese do you want?",
        "zh": "你想要多少奶酪？",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "I bought many vegetables at the market.",
        "zh": "我在市场买了很多蔬菜。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "There is a little water in the bottle.",
        "zh": "瓶子里有一点水。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We have a few minutes before class.",
        "zh": "上课前我们还有几分钟。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The teacher gave us much advice.",
        "zh": "老师给了我们很多建议。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She has a few good friends.",
        "zh": "她有几个好朋友。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I need much flour to make bread.",
        "zh": "我需要很多面粉来做面包。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "There are many trees in the park.",
        "zh": "公园里有很多树。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He drinks much coffee every day.",
        "zh": "他每天喝很多咖啡。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
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
    "image": "l10-count-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "I don't have _____ homework today.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "homework 不可数，用 much。",
        "sentence": "I don't have much homework today.",
        "zh": "我今天作业不多。"
      },
      {
        "q": "He has _____ money in his wallet.",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "money 不可数，用 a little。",
        "sentence": "He has a little money in his wallet.",
        "zh": "他钱包里有一点钱。"
      },
      {
        "q": "We saw _____ stars in the sky.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "stars 可数，用 many。",
        "sentence": "We saw many stars in the sky.",
        "zh": "我们看到了很多星星。"
      },
      {
        "q": "Can I have _____ juice, please?",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "juice 不可数，用 a little。",
        "sentence": "Can I have a little juice, please?",
        "zh": "请给我一点果汁好吗？"
      },
      {
        "q": "There is _____ bread on the table.",
        "opts": [
          "much",
          "many",
          "a few"
        ],
        "ans": 0,
        "hint": "bread 不可数，用 much。",
        "sentence": "There is much bread on the table.",
        "zh": "桌子上有很多面包。"
      },
      {
        "q": "How _____ carrots do you need?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "carrots 可数，用 many。",
        "sentence": "How many carrots do you need?",
        "zh": "你需要多少胡萝卜？"
      },
      {
        "q": "She has _____ rice in her bowl.",
        "opts": [
          "a few",
          "many",
          "a little"
        ],
        "ans": 2,
        "hint": "rice 不可数，用 a little。",
        "sentence": "She has a little rice in her bowl.",
        "zh": "她碗里有一点米饭。"
      },
      {
        "q": "There aren't _____ tomatoes in the fridge.",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "tomatoes 可数，用 many。",
        "sentence": "There aren't many tomatoes in the fridge.",
        "zh": "冰箱里没有很多西红柿。"
      },
      {
        "q": "I have _____ questions to ask.",
        "opts": [
          "a little",
          "much",
          "a few"
        ],
        "ans": 2,
        "hint": "questions 可数，用 a few。",
        "sentence": "I have a few questions to ask.",
        "zh": "我有几个问题要问。"
      },
      {
        "q": "He drinks _____ water every day.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "water 不可数，用 much。",
        "sentence": "He drinks much water every day.",
        "zh": "他每天喝很多水。"
      },
      {
        "q": "There are _____ chairs in the room.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "chairs 可数，用 many。",
        "sentence": "There are many chairs in the room.",
        "zh": "房间里有很多椅子。"
      },
      {
        "q": "I have _____ sugar in my tea.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "sugar 不可数，用 a little。",
        "sentence": "I have a little sugar in my tea.",
        "zh": "我的茶里有一点糖。"
      },
      {
        "q": "How _____ oranges are there on the table?",
        "opts": [
          "much",
          "many",
          "a little"
        ],
        "ans": 1,
        "hint": "oranges 可数，用 many。",
        "sentence": "How many oranges are there on the table?",
        "zh": "桌子上有多少个橙子？"
      },
      {
        "q": "We don't have _____ milk at home.",
        "opts": [
          "many",
          "much",
          "a few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "We don't have much milk at home.",
        "zh": "我们家里没有很多牛奶。"
      },
      {
        "q": "She has _____ pencils in her pencil case.",
        "opts": [
          "a little",
          "much",
          "a few"
        ],
        "ans": 2,
        "hint": "pencils 可数，用 a few。",
        "sentence": "She has a few pencils in her pencil case.",
        "zh": "她的铅笔盒里有几支铅笔。"
      },
      {
        "q": "There is _____ cheese on the pizza.",
        "opts": [
          "many",
          "a few",
          "a little"
        ],
        "ans": 2,
        "hint": "cheese 不可数，用 a little。",
        "sentence": "There is a little cheese on the pizza.",
        "zh": "披萨上有一点奶酪。"
      },
      {
        "q": "I need _____ butter for the bread.",
        "opts": [
          "a few",
          "a little",
          "many"
        ],
        "ans": 1,
        "hint": "butter 不可数，用 a little。",
        "sentence": "I need a little butter for the bread.",
        "zh": "我需要一点黄油来配面包。"
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
      "可数：many/few/a few + 复数",
      "不可数：much/little/a little + 原形",
      "计量：a bottle of water, two cups of tea",
      "advice / information / news / homework 都不可数。",
      "计量：a piece of news, two bottles of milk。"
    ],
    "chant": "Many for count, much for mass! Water, rice — uncountable class!",
    "chantSpeak": "Many for count, much for mass! Water, rice, uncountable class!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "可数与不可数名词",
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