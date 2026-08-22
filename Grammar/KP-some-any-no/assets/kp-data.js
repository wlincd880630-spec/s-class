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
    "audio": "Would you like some tea?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？",
    "image": "w3-san-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-san-hero.jpg",
    "question": "邀请句「来点茶吗」为什么用 some 不用 any？",
    "choices": [
      {
        "text": "期待肯定回答的疑问句用 some",
        "correct": true,
        "fb": "对了！Would you like some…?"
      },
      {
        "text": "所有疑问句都用 any",
        "correct": false,
        "fb": "邀请/建议疑问句常用 some。"
      },
      {
        "text": "some 只能用于肯定",
        "correct": false,
        "fb": "Would you like some 是疑问句。"
      }
    ],
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-san-hero.jpg",
    "lead": "some 用于肯定；any 用于否定和疑问。邀请/请求可用 some。",
    "formula": "肯定 some　/　否定·疑问 any　/　no = not any",
    "parts": [
      {
        "mark": "some",
        "label": "一些（肯定）",
        "example": "some tea"
      },
      {
        "mark": "any",
        "label": "一些（否/疑）",
        "example": "any milk"
      },
      {
        "mark": "no",
        "label": "没有",
        "example": "no time"
      }
    ],
    "samples": [
      {
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "sentence": "There isn't any milk in the fridge.",
        "zh": "冰箱里没有牛奶。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-san-some.jpg",
    "rightImage": "w3-san-any.jpg",
    "leftLabel": "some 肯定/邀请",
    "rightLabel": "any 否定/疑问",
    "leftSentence": "I have some apples.",
    "leftZh": "我有一些苹果。",
    "rightSentence": "I don't have any apples.",
    "rightZh": "我没有苹果。",
    "morphBase": "some",
    "morphPast": "any",
    "morphHighlight": "",
    "discovery": "肯定 some；否定/一般疑问 any；no = not any。"
  },
  {
    "section": "精讲",
    "title": "例句 · 邀请用 some",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-san-hero.jpg",
    "lead": "Would you like some…? 期待肯定回答。",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 否定用 any",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-san-hero.jpg",
    "lead": "isn't any = no。",
    "sentence": "There isn't any milk in the fridge.",
    "zh": "冰箱里没有牛奶。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "肯定句用 some",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-apple.png",
    "lead": "在肯定句中，我们通常用 some 来表示“一些”。",
    "sentence": "I have some apples in my bag.",
    "zh": "我包里有一些苹果。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "no 表示没有",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "no 可以代替 not any，表示“没有”。",
    "sentence": "There is no milk in the fridge.",
    "zh": "冰箱里没有牛奶。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-san-hero.jpg",
    "lead": "some / any / no 用法。",
    "rules": [
      {
        "tab": "some",
        "rule": "肯定句；邀请/建议疑问句 Would you like some…?",
        "focusVerb": "some",
        "examples": [
          {
            "from": "肯定",
            "to": "some tea"
          }
        ],
        "sample": "Would you like some tea?",
        "sampleZh": "你想喝点茶吗？"
      },
      {
        "tab": "any/no",
        "rule": "否定/疑问 any；no = not any",
        "focusVerb": "any",
        "examples": [
          {
            "from": "not",
            "to": "not any"
          },
          {
            "from": "no",
            "to": "no time"
          }
        ],
        "sample": "I don't have any money.",
        "sampleZh": "我没有钱。"
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
    "image": "w3-san-hero.jpg",
    "buckets": [
      {
        "key": "some",
        "label": "some"
      },
      {
        "key": "any",
        "label": "any / no"
      }
    ],
    "items": [
      {
        "text": "I need some help.",
        "bucket": "some"
      },
      {
        "text": "Do you have any questions?",
        "bucket": "any"
      },
      {
        "text": "Would you like some water?",
        "bucket": "some"
      },
      {
        "text": "There isn't any milk.",
        "bucket": "any"
      },
      {
        "text": "She has some friends.",
        "bucket": "some"
      },
      {
        "text": "There is no time left.",
        "bucket": "any"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-san-hero.jpg",
    "question": "「I don't have some money.」应改成？",
    "choices": [
      {
        "text": "any money（否定用 any）",
        "correct": true,
        "fb": "否定句用 any。"
      },
      {
        "text": "no any money",
        "correct": false,
        "fb": "no 不能再加 any。"
      },
      {
        "text": "many money",
        "correct": false,
        "fb": "money 不可数。"
      }
    ],
    "sentence": "I don't have any money.",
    "zh": "我没有任何钱。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-san-hero.jpg",
    "lead": "There is some… 改否定。",
    "items": [
      {
        "from": "There is some juice in the bottle.",
        "fromZh": "瓶子里有一些果汁。",
        "steps": [
          {
            "label": "改成否定（用 any）",
            "opts": [
              "There isn't any juice in the bottle.",
              "There isn't some juice in the bottle.",
              "There is any juice in the bottle."
            ],
            "ans": 0,
            "hint": "isn't any。",
            "sentence": "There isn't any juice in the bottle.",
            "zh": "瓶子里没有果汁。"
          },
          {
            "label": "改成 no 句",
            "opts": [
              "There is no juice in the bottle.",
              "There is not no juice in the bottle.",
              "There are no juice in the bottle."
            ],
            "ans": 0,
            "hint": "no = not any。",
            "sentence": "There is no juice in the bottle.",
            "zh": "瓶子里没有果汁。"
          }
        ]
      },
      {
        "from": "I don't have some money.",
        "fromZh": "我没有钱。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "I don't have any money.",
              "I don't have some money.",
              "I have no money."
            ],
            "ans": 0,
            "hint": "否定句用 any。",
            "sentence": "I don't have any money.",
            "zh": "我没有钱。"
          }
        ]
      },
      {
        "from": "There isn't some milk.",
        "fromZh": "没有牛奶。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "There isn't any milk.",
              "There isn't some milk.",
              "There isn't no milk."
            ],
            "ans": 0,
            "hint": "否定句用 any。",
            "sentence": "There isn't any milk.",
            "zh": "没有牛奶。"
          }
        ]
      },
      {
        "from": "Do you have some questions?",
        "fromZh": "你有问题吗？",
        "steps": [
          {
            "label": "改成疑问句",
            "opts": [
              "Do you have any questions?",
              "Do you have some questions?",
              "Do you have no questions?"
            ],
            "ans": 0,
            "hint": "疑问句用 any。",
            "sentence": "Do you have any questions?",
            "zh": "你有问题吗？"
          }
        ]
      },
      {
        "from": "There are some students.",
        "fromZh": "有一些学生。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "There aren't any students.",
              "There aren't some students.",
              "There are no any students."
            ],
            "ans": 0,
            "hint": "否定句用 any。",
            "sentence": "There aren't any students.",
            "zh": "没有学生。"
          }
        ]
      },
      {
        "from": "I have some apples.",
        "fromZh": "我有一些苹果。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Do you have any apples?",
              "Do you have some apples?",
              "Do you have no apples?"
            ],
            "ans": 0,
            "hint": "疑问句用 any。",
            "sentence": "Do you have any apples?",
            "zh": "你有苹果吗？"
          }
        ]
      },
      {
        "from": "There is no water.",
        "fromZh": "没有水。",
        "steps": [
          {
            "label": "改成 not any 形式",
            "opts": [
              "There isn't any water.",
              "There isn't no water.",
              "There is no any water."
            ],
            "ans": 0,
            "hint": "no = not any。",
            "sentence": "There isn't any water.",
            "zh": "没有水。"
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
    "image": "kp3d-apple.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "have",
      "some",
      "apples",
      "in",
      "my",
      "bag"
    ],
    "sentence": "I have some apples in my bag.",
    "zh": "我包里有一些苹果。",
    "items": [
      {
        "tokens": [
          "I",
          "have",
          "some",
          "apples",
          "in",
          "my",
          "bag"
        ],
        "sentence": "I have some apples in my bag.",
        "zh": "我包里有一些苹果。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "There",
          "isn't",
          "any",
          "milk",
          "in",
          "the",
          "fridge"
        ],
        "sentence": "There isn't any milk in the fridge.",
        "zh": "冰箱里没有牛奶。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "Do",
          "you",
          "have",
          "any",
          "questions"
        ],
        "sentence": "Do you have any questions?",
        "zh": "你有什么问题吗？",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "There",
          "are",
          "some",
          "pandas",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "There are some pandas in the zoo.",
        "zh": "动物园里有一些熊猫。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "I",
          "don't",
          "have",
          "any",
          "money"
        ],
        "sentence": "I don't have any money.",
        "zh": "我没有钱。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "Would",
          "you",
          "like",
          "some",
          "tea"
        ],
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？",
        "image": "kp3d-dinner.png"
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
    "image": "w3-san-hero.jpg",
    "audio": "There isn't any milk in the fridge.",
    "tokens": [
      "There",
      "isn't",
      "any",
      "milk",
      "in",
      "the",
      "fridge"
    ],
    "sentence": "There isn't any milk in the fridge.",
    "zh": "冰箱里没有牛奶了。"
  },
  {
    "id": "p15",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-san-hero.jpg",
    "q": "Would you like _____ orange juice?",
    "opts": [
      "some",
      "any",
      "no"
    ],
    "ans": 0,
    "hint": "邀请用 some。",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-san-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "Would you like _____ orange juice?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "any",
          "some",
          "no a"
        ],
        "ans": 1,
        "hint": "肯定用 some。",
        "sentence": "She has some friends in Chengdu.",
        "zh": "她在成都有一些朋友。"
      },
      {
        "q": "Is there _____ water left?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问用 any。",
        "sentence": "Is there any water left?",
        "zh": "还剩水吗？"
      },
      {
        "q": "There is _____ time to waste.",
        "opts": [
          "any",
          "no",
          "some not"
        ],
        "ans": 1,
        "hint": "no time = not any time。",
        "sentence": "There is no time to waste.",
        "zh": "没有时间可浪费。"
      },
      {
        "q": "Could I have _____ paper, please?",
        "opts": [
          "any",
          "some",
          "no"
        ],
        "ans": 1,
        "hint": "请求可用 some。",
        "sentence": "Could I have some paper, please?",
        "zh": "请给我一些纸好吗？"
      },
      {
        "q": "He didn't buy _____ apples.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定用 any。",
        "sentence": "He didn't buy any apples.",
        "zh": "他没买苹果。"
      },
      {
        "q": "I have _____ apples in my bag.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some apples in my bag.",
        "zh": "我包里有一些苹果。"
      },
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any milk in the fridge.",
        "zh": "冰箱里没有牛奶。"
      },
      {
        "q": "Do you have _____ questions?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Do you have any questions?",
        "zh": "你有什么问题吗？"
      },
      {
        "q": "There is _____ water in the cup.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some water in the cup.",
        "zh": "杯子里有一些水。"
      },
      {
        "q": "I don't have _____ money.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "I don't have any money.",
        "zh": "我没有钱。"
      },
      {
        "q": "There are _____ students in the classroom.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some students in the classroom.",
        "zh": "教室里有一些学生。"
      },
      {
        "q": "Would you like _____ tea?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请或建议用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "There isn't _____ bread on the table.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any bread on the table.",
        "zh": "桌子上没有面包。"
      },
      {
        "q": "Is there _____ juice in the fridge?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Is there any juice in the fridge?",
        "zh": "冰箱里有果汁吗？"
      },
      {
        "q": "There are _____ pandas in the zoo.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some pandas in the zoo.",
        "zh": "动物园里有一些熊猫。"
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
        "q": "Would you like _____ orange juice?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "any",
          "some",
          "no a"
        ],
        "ans": 1,
        "hint": "肯定用 some。",
        "sentence": "She has some friends in Chengdu.",
        "zh": "她在成都有一些朋友。"
      },
      {
        "q": "Is there _____ water left?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问用 any。",
        "sentence": "Is there any water left?",
        "zh": "还剩水吗？"
      },
      {
        "q": "There is _____ time to waste.",
        "opts": [
          "any",
          "no",
          "some not"
        ],
        "ans": 1,
        "hint": "no time = not any time。",
        "sentence": "There is no time to waste.",
        "zh": "没有时间可浪费。"
      },
      {
        "q": "Could I have _____ paper, please?",
        "opts": [
          "any",
          "some",
          "no"
        ],
        "ans": 1,
        "hint": "请求可用 some。",
        "sentence": "Could I have some paper, please?",
        "zh": "请给我一些纸好吗？"
      },
      {
        "q": "He didn't buy _____ apples.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定用 any。",
        "sentence": "He didn't buy any apples.",
        "zh": "他没买苹果。"
      },
      {
        "q": "I have _____ apples in my bag.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some apples in my bag.",
        "zh": "我包里有一些苹果。"
      },
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any milk in the fridge.",
        "zh": "冰箱里没有牛奶。"
      },
      {
        "q": "Do you have _____ questions?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Do you have any questions?",
        "zh": "你有什么问题吗？"
      },
      {
        "q": "There is _____ water in the cup.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some water in the cup.",
        "zh": "杯子里有一些水。"
      },
      {
        "q": "I don't have _____ money.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "I don't have any money.",
        "zh": "我没有钱。"
      },
      {
        "q": "There are _____ students in the classroom.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some students in the classroom.",
        "zh": "教室里有一些学生。"
      },
      {
        "q": "Would you like _____ tea?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请或建议用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "There isn't _____ bread on the table.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any bread on the table.",
        "zh": "桌子上没有面包。"
      },
      {
        "q": "Is there _____ juice in the fridge?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Is there any juice in the fridge?",
        "zh": "冰箱里有果汁吗？"
      },
      {
        "q": "There are _____ pandas in the zoo.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some pandas in the zoo.",
        "zh": "动物园里有一些熊猫。"
      },
      {
        "q": "He doesn't have _____ brothers.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "He doesn't have any brothers.",
        "zh": "他没有兄弟。"
      },
      {
        "q": "There is _____ milk in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some milk in the fridge.",
        "zh": "冰箱里有一些牛奶。"
      },
      {
        "q": "Do you see _____ birds in the tree?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Do you see any birds in the tree?",
        "zh": "你看到树上有鸟吗？"
      },
      {
        "q": "There are _____ apples on the table.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some apples on the table.",
        "zh": "桌子上有一些苹果。"
      },
      {
        "q": "I have _____ questions to ask.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some questions to ask.",
        "zh": "我有一些问题要问。"
      },
      {
        "q": "There isn't _____ water in the bottle.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any water in the bottle.",
        "zh": "瓶子里没有水。"
      },
      {
        "q": "Can you give me _____ help?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "请求帮助用 some。",
        "sentence": "Can you give me some help?",
        "zh": "你能给我一些帮助吗？"
      },
      {
        "q": "There are _____ students in the library.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some students in the library.",
        "zh": "图书馆里有一些学生。"
      },
      {
        "q": "We don't have _____ time.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "We don't have any time.",
        "zh": "我们没有时间。"
      },
      {
        "q": "There is _____ food in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some food in the fridge.",
        "zh": "冰箱里有一些食物。"
      },
      {
        "q": "Are there _____ books on the shelf?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Are there any books on the shelf?",
        "zh": "书架上有书吗？"
      },
      {
        "q": "I don't have _____ money for the bus.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "I don't have any money for the bus.",
        "zh": "我没有钱坐公交车。"
      },
      {
        "q": "There is _____ tea in the cup.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some tea in the cup.",
        "zh": "杯子里有一些茶。"
      },
      {
        "q": "Would you like _____ hot pot?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some hot pot?",
        "zh": "你想吃火锅吗？"
      },
      {
        "q": "There aren't _____ buses today.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There aren't any buses today.",
        "zh": "今天没有公交车。"
      },
      {
        "q": "I have _____ friends in my class.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some friends in my class.",
        "zh": "我在班上有一些朋友。"
      },
      {
        "q": "There is _____ milk for breakfast.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some milk for breakfast.",
        "zh": "早餐有一些牛奶。"
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
        "q": "Would you like _____ orange juice?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "any",
          "some",
          "no a"
        ],
        "ans": 1,
        "hint": "肯定用 some。",
        "sentence": "She has some friends in Chengdu.",
        "zh": "她在成都有一些朋友。"
      },
      {
        "q": "Is there _____ water left?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问用 any。",
        "sentence": "Is there any water left?",
        "zh": "还剩水吗？"
      },
      {
        "q": "There is _____ time to waste.",
        "opts": [
          "any",
          "no",
          "some not"
        ],
        "ans": 1,
        "hint": "no time = not any time。",
        "sentence": "There is no time to waste.",
        "zh": "没有时间可浪费。"
      },
      {
        "q": "Could I have _____ paper, please?",
        "opts": [
          "any",
          "some",
          "no"
        ],
        "ans": 1,
        "hint": "请求可用 some。",
        "sentence": "Could I have some paper, please?",
        "zh": "请给我一些纸好吗？"
      },
      {
        "q": "He didn't buy _____ apples.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定用 any。",
        "sentence": "He didn't buy any apples.",
        "zh": "他没买苹果。"
      },
      {
        "q": "I have _____ apples in my bag.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some apples in my bag.",
        "zh": "我包里有一些苹果。"
      },
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any milk in the fridge.",
        "zh": "冰箱里没有牛奶。"
      },
      {
        "q": "Do you have _____ questions?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Do you have any questions?",
        "zh": "你有什么问题吗？"
      },
      {
        "q": "There is _____ water in the cup.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some water in the cup.",
        "zh": "杯子里有一些水。"
      },
      {
        "q": "I don't have _____ money.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "I don't have any money.",
        "zh": "我没有钱。"
      },
      {
        "q": "There are _____ students in the classroom.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some students in the classroom.",
        "zh": "教室里有一些学生。"
      },
      {
        "q": "Would you like _____ tea?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请或建议用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "There isn't _____ bread on the table.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any bread on the table.",
        "zh": "桌子上没有面包。"
      },
      {
        "q": "Is there _____ juice in the fridge?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Is there any juice in the fridge?",
        "zh": "冰箱里有果汁吗？"
      },
      {
        "q": "There are _____ pandas in the zoo.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some pandas in the zoo.",
        "zh": "动物园里有一些熊猫。"
      },
      {
        "q": "He doesn't have _____ brothers.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "He doesn't have any brothers.",
        "zh": "他没有兄弟。"
      },
      {
        "q": "There is _____ milk in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some milk in the fridge.",
        "zh": "冰箱里有一些牛奶。"
      },
      {
        "q": "Do you see _____ birds in the tree?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Do you see any birds in the tree?",
        "zh": "你看到树上有鸟吗？"
      },
      {
        "q": "There are _____ apples on the table.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some apples on the table.",
        "zh": "桌子上有一些苹果。"
      },
      {
        "q": "I have _____ questions to ask.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some questions to ask.",
        "zh": "我有一些问题要问。"
      },
      {
        "q": "There isn't _____ water in the bottle.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any water in the bottle.",
        "zh": "瓶子里没有水。"
      },
      {
        "q": "Can you give me _____ help?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "请求帮助用 some。",
        "sentence": "Can you give me some help?",
        "zh": "你能给我一些帮助吗？"
      },
      {
        "q": "There are _____ students in the library.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some students in the library.",
        "zh": "图书馆里有一些学生。"
      },
      {
        "q": "We don't have _____ time.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "We don't have any time.",
        "zh": "我们没有时间。"
      },
      {
        "q": "There is _____ food in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some food in the fridge.",
        "zh": "冰箱里有一些食物。"
      },
      {
        "q": "Are there _____ books on the shelf?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Are there any books on the shelf?",
        "zh": "书架上有书吗？"
      },
      {
        "q": "I don't have _____ money for the bus.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "I don't have any money for the bus.",
        "zh": "我没有钱坐公交车。"
      },
      {
        "q": "There is _____ tea in the cup.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some tea in the cup.",
        "zh": "杯子里有一些茶。"
      },
      {
        "q": "Would you like _____ hot pot?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some hot pot?",
        "zh": "你想吃火锅吗？"
      },
      {
        "q": "There aren't _____ buses today.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There aren't any buses today.",
        "zh": "今天没有公交车。"
      },
      {
        "q": "I have _____ friends in my class.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some friends in my class.",
        "zh": "我在班上有一些朋友。"
      },
      {
        "q": "There is _____ milk for breakfast.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some milk for breakfast.",
        "zh": "早餐有一些牛奶。"
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
    "image": "w3-san-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "some tea",
        "zh": "一些茶"
      },
      {
        "en": "any milk",
        "zh": "一些牛奶（否/疑）"
      },
      {
        "en": "no time",
        "zh": "没有时间"
      },
      {
        "en": "Would you like some…?",
        "zh": "想要一些……吗？"
      },
      {
        "en": "some apples",
        "zh": "一些苹果"
      },
      {
        "en": "some friends",
        "zh": "一些朋友"
      },
      {
        "en": "any questions",
        "zh": "一些问题（疑问）"
      },
      {
        "en": "no money",
        "zh": "没有钱"
      },
      {
        "en": "any bread",
        "zh": "一些面包（否定）"
      },
      {
        "en": "no problem",
        "zh": "没问题"
      },
      {
        "en": "some help",
        "zh": "一些帮助"
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
    "image": "w3-san-hero.jpg",
    "audio": "I have some apples.",
    "opts": [
      "I have some apples.",
      "I have any apples.",
      "I have no apples."
    ],
    "ans": 0,
    "hint": "肯定句用 some。",
    "sentence": "I have some apples.",
    "zh": "我有一些苹果。",
    "questions": [
      {
        "audio": "I have some apples.",
        "opts": [
          "I have some apples.",
          "I have any apples.",
          "I have no apples."
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "zh": "我有一些苹果。",
        "sentence": "I have some apples."
      },
      {
        "audio": "There isn't any milk.",
        "opts": [
          "There isn't any milk.",
          "There isn't some milk.",
          "There isn't no milk."
        ],
        "ans": 0,
        "hint": "否定句用 any。",
        "zh": "没有牛奶。",
        "sentence": "There isn't any milk."
      },
      {
        "audio": "Do you have any questions?",
        "opts": [
          "Do you have any questions?",
          "Do you have some questions?",
          "Do you have no questions?"
        ],
        "ans": 0,
        "hint": "疑问句用 any。",
        "zh": "你有什么问题吗？",
        "sentence": "Do you have any questions?"
      },
      {
        "audio": "Would you like some tea?",
        "opts": [
          "Would you like some tea?",
          "Would you like any tea?",
          "Would you like no tea?"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "zh": "你想喝点茶吗？",
        "sentence": "Would you like some tea?"
      },
      {
        "audio": "There is no milk.",
        "opts": [
          "There is no milk.",
          "There is any milk.",
          "There is some milk."
        ],
        "ans": 0,
        "hint": "no 表示没有。",
        "zh": "没有牛奶。",
        "sentence": "There is no milk."
      },
      {
        "audio": "I don't have any money.",
        "opts": [
          "I don't have any money.",
          "I don't have some money.",
          "I don't have no money."
        ],
        "ans": 0,
        "hint": "否定句用 any。",
        "zh": "我没有钱。",
        "sentence": "I don't have any money."
      },
      {
        "audio": "There are some pandas.",
        "opts": [
          "There are some pandas.",
          "There are any pandas.",
          "There are no pandas."
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "zh": "有一些熊猫。",
        "sentence": "There are some pandas."
      },
      {
        "audio": "Is there any juice?",
        "opts": [
          "Is there any juice?",
          "Is there some juice?",
          "Is there no juice?"
        ],
        "ans": 0,
        "hint": "疑问句用 any。",
        "zh": "有果汁吗？",
        "sentence": "Is there any juice?"
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
    "image": "w3-san-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I have some apples in my bag.",
        "zh": "我包里有一些苹果。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "There is some water on the floor.",
        "zh": "地板上有一些水。",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "We need some paper for the art class.",
        "zh": "我们需要一些纸来上美术课。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Would you like some juice?",
        "zh": "你想喝点果汁吗？",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "There aren't any students in the library.",
        "zh": "图书馆里没有学生。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Do you have any questions?",
        "zh": "你有什么问题吗？",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I don't have any money with me.",
        "zh": "我身上没带钱。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "There is no milk in the fridge.",
        "zh": "冰箱里没有牛奶。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She has some friends in Chengdu.",
        "zh": "她在成都有一些朋友。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Is there any tea in the cup?",
        "zh": "杯子里有茶吗？",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "There aren't any buses on Sunday.",
        "zh": "星期天没有公交车。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He doesn't have any brothers.",
        "zh": "他没有兄弟。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "No, I don't have any pets.",
        "zh": "不，我没有宠物。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "There is no time to play.",
        "zh": "没有时间玩了。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "Do you see any birds in the tree?",
        "zh": "你看到树上有鸟吗？",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "I have no idea.",
        "zh": "我不知道。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Some students like basketball, others like football.",
        "zh": "一些学生喜欢篮球，其他人喜欢足球。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "There isn't any bread for breakfast.",
        "zh": "早餐没有面包了。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Would you like some hot pot? It's delicious.",
        "zh": "你想吃火锅吗？很好吃。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "No problem is too hard if you try.",
        "zh": "如果你努力，没有问题是太难的。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Any student can join the club.",
        "zh": "任何学生都可以加入俱乐部。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "There are no pandas in the zoo now.",
        "zh": "现在动物园里没有熊猫。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I need some help with my homework.",
        "zh": "我需要一些帮助来完成作业。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "She doesn't have any time for piano practice.",
        "zh": "她没有时间练钢琴。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
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
    "image": "w3-san-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "He doesn't have _____ brothers.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "He doesn't have any brothers.",
        "zh": "他没有兄弟。"
      },
      {
        "q": "There is _____ milk in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some milk in the fridge.",
        "zh": "冰箱里有一些牛奶。"
      },
      {
        "q": "Do you see _____ birds in the tree?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Do you see any birds in the tree?",
        "zh": "你看到树上有鸟吗？"
      },
      {
        "q": "There are _____ apples on the table.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some apples on the table.",
        "zh": "桌子上有一些苹果。"
      },
      {
        "q": "I have _____ questions to ask.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some questions to ask.",
        "zh": "我有一些问题要问。"
      },
      {
        "q": "There isn't _____ water in the bottle.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There isn't any water in the bottle.",
        "zh": "瓶子里没有水。"
      },
      {
        "q": "Can you give me _____ help?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "请求帮助用 some。",
        "sentence": "Can you give me some help?",
        "zh": "你能给我一些帮助吗？"
      },
      {
        "q": "There are _____ students in the library.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There are some students in the library.",
        "zh": "图书馆里有一些学生。"
      },
      {
        "q": "We don't have _____ time.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "We don't have any time.",
        "zh": "我们没有时间。"
      },
      {
        "q": "There is _____ food in the fridge.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some food in the fridge.",
        "zh": "冰箱里有一些食物。"
      },
      {
        "q": "Are there _____ books on the shelf?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问句用 any。",
        "sentence": "Are there any books on the shelf?",
        "zh": "书架上有书吗？"
      },
      {
        "q": "I don't have _____ money for the bus.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "I don't have any money for the bus.",
        "zh": "我没有钱坐公交车。"
      },
      {
        "q": "There is _____ tea in the cup.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some tea in the cup.",
        "zh": "杯子里有一些茶。"
      },
      {
        "q": "Would you like _____ hot pot?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some hot pot?",
        "zh": "你想吃火锅吗？"
      },
      {
        "q": "There aren't _____ buses today.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定句用 any。",
        "sentence": "There aren't any buses today.",
        "zh": "今天没有公交车。"
      },
      {
        "q": "I have _____ friends in my class.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "I have some friends in my class.",
        "zh": "我在班上有一些朋友。"
      },
      {
        "q": "There is _____ milk for breakfast.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "肯定句用 some。",
        "sentence": "There is some milk for breakfast.",
        "zh": "早餐有一些牛奶。"
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
      "肯定 some；否定/疑问 any",
      "Would you like some…? 邀请",
      "no = not any：There is no time.",
      "somebody / anybody / nobody 规则类似。"
    ],
    "chant": "Yes — some! No — any! Would you like some — that's savvy!",
    "chantSpeak": "Yes, some! No, any! Would you like some, that is savvy!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "some / any / no",
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