(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 谁更大？",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "The dinosaur is bigger than the rabbit.",
    "soundHint": "先听，不要看文字。他们在比较什么？",
    "question": "这句话在比较两件东西吗？",
    "sentence": "The dinosaur is bigger than the rabbit.",
    "zh": "恐龙比兔子大。",
    "image": "l04-dino-rabbit.jpg",
    "source": "PSLE Set 02 · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 比较级在哪里？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l04-dino-rabbit.jpg",
    "question": "「The dinosaur is bigger than the rabbit.」哪一部分表示「比……更……」？",
    "choices": [
      {
        "text": "dinosaur",
        "correct": false,
        "fb": "dinosaur 只是名词，不是比较结构。"
      },
      {
        "text": "bigger than",
        "correct": true,
        "fb": "对了！形容词比较级 + than = 比……更……"
      },
      {
        "text": "the rabbit",
        "correct": false,
        "fb": "the rabbit 是被比较的对象，在 than 后面。"
      }
    ],
    "sentence": "The dinosaur is bigger than the rabbit.",
    "zh": "恐龙比兔子大。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l04-dino-rabbit.jpg",
    "lead": "比较两个人或物时，用「比较级 + than」。",
    "formula": "A is + 比较级 + than + B",
    "parts": [
      {
        "mark": "A",
        "label": "比较对象 1",
        "example": "The dinosaur"
      },
      {
        "mark": "-er",
        "label": "形容词比较级",
        "example": "bigger"
      },
      {
        "mark": "than",
        "label": "比较词",
        "example": "than"
      },
      {
        "mark": "B",
        "label": "比较对象 2",
        "example": "the rabbit"
      }
    ],
    "samples": [
      {
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · 短词怎么变？",
    "type": "discover",
    "lead": "点击左右卡片听例句，再点按钮看变化规律。",
    "leftImage": "l04-tall-boy.jpg",
    "rightImage": "l04-taller-boy.jpg",
    "leftLabel": "tall（原级）",
    "rightLabel": "taller（比较级）",
    "leftSentence": "Tom is tall.",
    "leftZh": "汤姆很高。",
    "rightSentence": "Tom is taller than Jack.",
    "rightZh": "汤姆比杰克高。",
    "morphBase": "tall",
    "morphPast": "taller",
    "morphHighlight": "er",
    "morphSpeak": "Tom is tall. Tom is taller than Jack.",
    "discovery": "单音节形容词一般直接加 -er，再加 than：tall → taller than。"
  },
  {
    "section": "精讲",
    "title": "例句 · 谁更年轻",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l04-dino-rabbit.jpg",
    "lead": "young → younger，直接加 -er。",
    "sentence": "My father is younger than my mother.",
    "zh": "我爸爸比我妈妈年轻。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 谁更重",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l04-dino-rabbit.jpg",
    "lead": "heavy → heavier：辅音 + y 变 i 再加 -er。",
    "sentence": "Chen Jie is heavier than Amy.",
    "zh": "陈洁比艾米重。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "比较级 + than 基础",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-taller.png",
    "lead": "A is + 比较级 + than + B 表示 A比B更……",
    "sentence": "Tom is taller than Jack.",
    "zh": "汤姆比杰克高。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "多音节形容词的比较级",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "多音节形容词在前面加more构成比较级",
    "sentence": "This book is more interesting than that one.",
    "zh": "这本书比那本有趣。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "不规则变化",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-umbrella.png",
    "lead": "有些形容词的比较级不规则，如good→better",
    "sentence": "The weather today is better than yesterday.",
    "zh": "今天天气比昨天好。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "拼写规则卡 · -er 变化",
    "type": "spelling",
    "image": "l04-spell-rules.jpg",
    "lead": "小升初常考三种拼写变化，点击标签切换。",
    "rules": [
      {
        "tab": "直接 +er",
        "rule": "大多数短形容词：直接加 -er",
        "focusVerb": "taller",
        "examples": [
          {
            "from": "tall",
            "to": "taller"
          },
          {
            "from": "old",
            "to": "older"
          },
          {
            "from": "young",
            "to": "younger"
          }
        ],
        "sample": "My father is younger than my mother.",
        "sampleZh": "我爸爸比我妈妈年轻。",
        "sampleImage": "l04-father-mother.jpg"
      },
      {
        "tab": "y→ier",
        "rule": "以辅音+y 结尾：变 y 为 i 再加 -er",
        "focusVerb": "heavier",
        "examples": [
          {
            "from": "heavy",
            "to": "heavier"
          },
          {
            "from": "happy",
            "to": "happier"
          },
          {
            "from": "easy",
            "to": "easier"
          }
        ],
        "sample": "Chen Jie is heavier than Amy.",
        "sampleZh": "陈洁比艾米重。",
        "sampleImage": "l04-chen-amy.jpg"
      },
      {
        "tab": "双写+er",
        "rule": "短元音+单辅音结尾：双写辅音再加 -er",
        "focusVerb": "bigger",
        "examples": [
          {
            "from": "big",
            "to": "bigger"
          },
          {
            "from": "hot",
            "to": "hotter"
          },
          {
            "from": "thin",
            "to": "thinner"
          }
        ],
        "sample": "The dinosaur is bigger than the rabbit.",
        "sampleZh": "恐龙比兔子大。",
        "sampleImage": "l04-dino-rabbit.jpg"
      }
    ]
  },
  {
    "id": "p11",
    "section": "辨析",
    "title": "分类篮 · 原级还是比较级？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l04-compare-chart.jpg",
    "lead": "把句子放进正确的篮子：只有原级，还是有 than 的比较级？",
    "buckets": [
      {
        "key": "base",
        "label": "原级（无 than）"
      },
      {
        "key": "comp",
        "label": "比较级 + than"
      }
    ],
    "items": [
      {
        "text": "She is happy.",
        "bucket": "base",
        "hint": "没有 than，也不是比较级。"
      },
      {
        "text": "He is taller than me.",
        "bucket": "comp"
      },
      {
        "text": "The cat is small.",
        "bucket": "base"
      },
      {
        "text": "This book is cheaper than that one.",
        "bucket": "comp"
      },
      {
        "text": "Lily runs faster than Emma.",
        "bucket": "comp"
      },
      {
        "text": "It is windy today.",
        "bucket": "base"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l04-dino-rabbit.jpg",
    "question": "「This book is more cheaper than that one.」错在哪里？",
    "choices": [
      {
        "text": "cheap 是短词，应说 cheaper，不能再加 more",
        "correct": true,
        "fb": "对了！短形容词用 -er，不要 more cheaper。"
      },
      {
        "text": "than 应该改成 as",
        "correct": false,
        "fb": "比较两者仍用 than。"
      },
      {
        "text": "book 要改成 books",
        "correct": false,
        "fb": "主语单复数不是这句的错点。"
      }
    ],
    "sentence": "This book is cheaper than that one.",
    "zh": "这本书比那本便宜。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l04-dino-rabbit.jpg",
    "lead": "把原级句改成比较句：加上比较级和 than。",
    "items": [
      {
        "from": "Tom is tall.",
        "fromZh": "汤姆很高。",
        "steps": [
          {
            "label": "改成：汤姆比杰克高",
            "opts": [
              "Tom is taller than Jack.",
              "Tom is tall than Jack.",
              "Tom is more tall than Jack."
            ],
            "ans": 0,
            "hint": "tall → taller + than。",
            "sentence": "Tom is taller than Jack.",
            "zh": "汤姆比杰克高。"
          }
        ]
      },
      {
        "from": "The box is big.",
        "fromZh": "这个盒子很大。",
        "steps": [
          {
            "label": "改成：这个盒子比袋子大（注意双写）",
            "opts": [
              "The box is bigger than the bag.",
              "The box is biger than the bag.",
              "The box is more big than the bag."
            ],
            "ans": 0,
            "hint": "big → bigger。",
            "sentence": "The box is bigger than the bag.",
            "zh": "这个盒子比袋子大。"
          }
        ]
      },
      {
        "from": "This book is more cheaper than that one.",
        "fromZh": "这本书比那本更便宜。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "This book is cheaper than that one.",
              "This book is more cheap than that one.",
              "This book is cheapest than that one."
            ],
            "ans": 0,
            "hint": "cheaper本身已是比较级，不能再加more",
            "sentence": "This book is cheaper than that one.",
            "zh": "这本书比那本便宜。"
          }
        ]
      },
      {
        "from": "The elephant is big than the mouse.",
        "fromZh": "大象比老鼠大。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The elephant is bigger than the mouse.",
              "The elephant is more big than the mouse.",
              "The elephant is biggest than the mouse."
            ],
            "ans": 0,
            "hint": "big的比较级是bigger",
            "sentence": "The elephant is bigger than the mouse.",
            "zh": "大象比老鼠大。"
          }
        ]
      },
      {
        "from": "Tom is tall than Jack.",
        "fromZh": "汤姆比杰克高。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "Tom is taller than Jack.",
              "Tom is more tall than Jack.",
              "Tom is tallest than Jack."
            ],
            "ans": 0,
            "hint": "tall的比较级是taller",
            "sentence": "Tom is taller than Jack.",
            "zh": "汤姆比杰克高。"
          }
        ]
      },
      {
        "from": "This story is more interesting that that one.",
        "fromZh": "这个故事比那个有趣。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "This story is more interesting than that one.",
              "This story is more interesting that that one.",
              "This story is interesting than that one."
            ],
            "ans": 0,
            "hint": "比较要用than",
            "sentence": "This story is more interesting than that one.",
            "zh": "这个故事比那个有趣。"
          }
        ]
      },
      {
        "from": "My bag is heavier that yours.",
        "fromZh": "我的书包比你的重。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "My bag is heavier than yours.",
              "My bag is heavier that yours.",
              "My bag is more heavy than yours."
            ],
            "ans": 0,
            "hint": "比较要用than",
            "sentence": "My bag is heavier than yours.",
            "zh": "我的书包比你的重。"
          }
        ]
      },
      {
        "from": "The weather today is gooder than yesterday.",
        "fromZh": "今天天气比昨天好。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The weather today is better than yesterday.",
              "The weather today is gooder than yesterday.",
              "The weather today is more good than yesterday."
            ],
            "ans": 0,
            "hint": "good的比较级是better",
            "sentence": "The weather today is better than yesterday.",
            "zh": "今天天气比昨天好。"
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
      "The",
      "panda",
      "is",
      "cuter",
      "than",
      "the",
      "tiger"
    ],
    "sentence": "The panda is cuter than the tiger.",
    "zh": "熊猫比老虎可爱。",
    "items": [
      {
        "tokens": [
          "The",
          "panda",
          "is",
          "cuter",
          "than",
          "the",
          "tiger"
        ],
        "sentence": "The panda is cuter than the tiger.",
        "zh": "熊猫比老虎可爱。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "My",
          "bag",
          "is",
          "heavier",
          "than",
          "yours"
        ],
        "sentence": "My bag is heavier than yours.",
        "zh": "我的书包比你的重。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "The",
          "bus",
          "is",
          "faster",
          "than",
          "the",
          "bike"
        ],
        "sentence": "The bus is faster than the bike.",
        "zh": "公交车比自行车快。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "This",
          "apple",
          "is",
          "sweeter",
          "than",
          "that",
          "one"
        ],
        "sentence": "This apple is sweeter than that one.",
        "zh": "这个苹果比那个甜。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "The",
          "piano",
          "is",
          "more",
          "expensive",
          "than",
          "the",
          "guitar"
        ],
        "sentence": "The piano is more expensive than the guitar.",
        "zh": "钢琴比吉他贵。",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "The",
          "weather",
          "today",
          "is",
          "better",
          "than",
          "yesterday"
        ],
        "sentence": "The weather today is better than yesterday.",
        "zh": "今天天气比昨天好。",
        "image": "kp3d-umbrella.png"
      }
    ],
    "id": "p14"
  },
  {
    "id": "p15",
    "section": "操练",
    "title": "听音排序 · 造比较句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l04-pe-run.jpg",
    "audio": "Tom runs faster than Jack in PE class.",
    "tokens": [
      "Tom",
      "runs",
      "faster",
      "than",
      "Jack",
      "in",
      "PE",
      "class"
    ],
    "sentence": "Tom runs faster than Jack in PE class.",
    "zh": "体育课上汤姆比杰克跑得快。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l04-dino-rabbit.jpg",
    "q": "The dinosaur is _____ the rabbit.",
    "opts": [
      "bigger",
      "bigger than",
      "big"
    ],
    "ans": 1,
    "hint": "比较两件事要用「比较级 + than」。",
    "sentence": "The dinosaur is bigger than the rabbit.",
    "zh": "恐龙比兔子大。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l04-dino-rabbit.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "The dinosaur is _____ the rabbit.",
        "opts": [
          "bigger",
          "bigger than",
          "big"
        ],
        "ans": 1,
        "hint": "比较两件事要用「比较级 + than」。",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "Tom is _____ Jack.",
        "opts": [
          "taller",
          "taller than",
          "more taller"
        ],
        "ans": 1,
        "hint": "比较级后面要跟 than。",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This bag is _____ than that one.",
        "opts": [
          "heavy",
          "heavier",
          "heaviest"
        ],
        "ans": 1,
        "hint": "两者比较用比较级 heavier。",
        "sentence": "This bag is heavier than that one.",
        "zh": "这个包比那个重。"
      },
      {
        "q": "Summer in Chengdu is _____ than spring.",
        "opts": [
          "hotter",
          "more hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "hot → hotter。",
        "sentence": "Summer in Chengdu is hotter than spring.",
        "zh": "成都的夏天比春天热。"
      },
      {
        "q": "Emma reads _____ than Tom.",
        "opts": [
          "careful",
          "more carefully",
          "most careful"
        ],
        "ans": 1,
        "hint": "副词比较常用 more + 副词。",
        "sentence": "Emma reads more carefully than Tom.",
        "zh": "艾玛读书比汤姆更仔细。"
      },
      {
        "q": "Which is _____, a cat or a dinosaur?",
        "opts": [
          "big",
          "bigger",
          "biggest"
        ],
        "ans": 1,
        "hint": "两者之间选哪一个更……用比较级。",
        "sentence": "Which is bigger, a cat or a dinosaur?",
        "zh": "猫和恐龙哪个更大？"
      },
      {
        "q": "The elephant is _____ than the mouse.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The elephant is bigger than the mouse.",
        "zh": "大象比老鼠大。"
      },
      {
        "q": "Tom is _____ than Jack.",
        "opts": [
          "taller",
          "tall",
          "tallest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This book is _____ than that one.",
        "opts": [
          "more interesting",
          "interesting",
          "most interesting"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "This book is more interesting than that one.",
        "zh": "这本书比那本有趣。"
      },
      {
        "q": "My bag is _____ than yours.",
        "opts": [
          "heavier",
          "heavy",
          "heaviest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "My bag is heavier than yours.",
        "zh": "我的书包比你的重。"
      },
      {
        "q": "The panda is _____ than the tiger.",
        "opts": [
          "cuter",
          "cute",
          "cutest"
        ],
        "ans": 0,
        "hint": "以e结尾加r",
        "sentence": "The panda is cuter than the tiger.",
        "zh": "熊猫比老虎可爱。"
      },
      {
        "q": "Spring is _____ than winter in Chengdu.",
        "opts": [
          "warmer",
          "warm",
          "warmest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "Spring is warmer than winter in Chengdu.",
        "zh": "成都的春天比冬天暖和。"
      },
      {
        "q": "The bus is _____ than the bike.",
        "opts": [
          "faster",
          "fast",
          "fastest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The bus is faster than the bike.",
        "zh": "公交车比自行车快。"
      },
      {
        "q": "My little brother is _____ than me.",
        "opts": [
          "shorter",
          "short",
          "shortest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My little brother is shorter than me.",
        "zh": "我弟弟比我矮。"
      },
      {
        "q": "The soup is _____ than the rice.",
        "opts": [
          "hotter",
          "hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写t加er",
        "sentence": "The soup is hotter than the rice.",
        "zh": "汤比饭烫。"
      },
      {
        "q": "The math test is _____ than the English test.",
        "opts": [
          "harder",
          "hard",
          "hardest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The math test is harder than the English test.",
        "zh": "数学考试比英语考试难。"
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
        "q": "The dinosaur is _____ the rabbit.",
        "opts": [
          "bigger",
          "bigger than",
          "big"
        ],
        "ans": 1,
        "hint": "比较两件事要用「比较级 + than」。",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "Tom is _____ Jack.",
        "opts": [
          "taller",
          "taller than",
          "more taller"
        ],
        "ans": 1,
        "hint": "比较级后面要跟 than。",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This bag is _____ than that one.",
        "opts": [
          "heavy",
          "heavier",
          "heaviest"
        ],
        "ans": 1,
        "hint": "两者比较用比较级 heavier。",
        "sentence": "This bag is heavier than that one.",
        "zh": "这个包比那个重。"
      },
      {
        "q": "Summer in Chengdu is _____ than spring.",
        "opts": [
          "hotter",
          "more hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "hot → hotter。",
        "sentence": "Summer in Chengdu is hotter than spring.",
        "zh": "成都的夏天比春天热。"
      },
      {
        "q": "Emma reads _____ than Tom.",
        "opts": [
          "careful",
          "more carefully",
          "most careful"
        ],
        "ans": 1,
        "hint": "副词比较常用 more + 副词。",
        "sentence": "Emma reads more carefully than Tom.",
        "zh": "艾玛读书比汤姆更仔细。"
      },
      {
        "q": "Which is _____, a cat or a dinosaur?",
        "opts": [
          "big",
          "bigger",
          "biggest"
        ],
        "ans": 1,
        "hint": "两者之间选哪一个更……用比较级。",
        "sentence": "Which is bigger, a cat or a dinosaur?",
        "zh": "猫和恐龙哪个更大？"
      },
      {
        "q": "The elephant is _____ than the mouse.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The elephant is bigger than the mouse.",
        "zh": "大象比老鼠大。"
      },
      {
        "q": "Tom is _____ than Jack.",
        "opts": [
          "taller",
          "tall",
          "tallest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This book is _____ than that one.",
        "opts": [
          "more interesting",
          "interesting",
          "most interesting"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "This book is more interesting than that one.",
        "zh": "这本书比那本有趣。"
      },
      {
        "q": "My bag is _____ than yours.",
        "opts": [
          "heavier",
          "heavy",
          "heaviest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "My bag is heavier than yours.",
        "zh": "我的书包比你的重。"
      },
      {
        "q": "The panda is _____ than the tiger.",
        "opts": [
          "cuter",
          "cute",
          "cutest"
        ],
        "ans": 0,
        "hint": "以e结尾加r",
        "sentence": "The panda is cuter than the tiger.",
        "zh": "熊猫比老虎可爱。"
      },
      {
        "q": "Spring is _____ than winter in Chengdu.",
        "opts": [
          "warmer",
          "warm",
          "warmest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "Spring is warmer than winter in Chengdu.",
        "zh": "成都的春天比冬天暖和。"
      },
      {
        "q": "The bus is _____ than the bike.",
        "opts": [
          "faster",
          "fast",
          "fastest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The bus is faster than the bike.",
        "zh": "公交车比自行车快。"
      },
      {
        "q": "My little brother is _____ than me.",
        "opts": [
          "shorter",
          "short",
          "shortest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My little brother is shorter than me.",
        "zh": "我弟弟比我矮。"
      },
      {
        "q": "The soup is _____ than the rice.",
        "opts": [
          "hotter",
          "hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写t加er",
        "sentence": "The soup is hotter than the rice.",
        "zh": "汤比饭烫。"
      },
      {
        "q": "The math test is _____ than the English test.",
        "opts": [
          "harder",
          "hard",
          "hardest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The math test is harder than the English test.",
        "zh": "数学考试比英语考试难。"
      },
      {
        "q": "My ruler is _____ than yours.",
        "opts": [
          "longer",
          "long",
          "longest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My ruler is longer than yours.",
        "zh": "我的尺子比你的长。"
      },
      {
        "q": "The blue pen is _____ than the red one.",
        "opts": [
          "cheaper",
          "cheap",
          "cheapest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The blue pen is cheaper than the red one.",
        "zh": "蓝色钢笔比红色的便宜。"
      },
      {
        "q": "The park is _____ than the street.",
        "opts": [
          "more beautiful",
          "beautiful",
          "most beautiful"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The park is more beautiful than the street.",
        "zh": "公园比街道漂亮。"
      },
      {
        "q": "The cat is _____ than the dog.",
        "opts": [
          "lazier",
          "lazy",
          "laziest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The cat is lazier than the dog.",
        "zh": "猫比狗懒。"
      },
      {
        "q": "The moon is _____ than the sun.",
        "opts": [
          "smaller",
          "small",
          "smallest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The moon is smaller than the sun.",
        "zh": "月亮比太阳小。"
      },
      {
        "q": "The new playground is _____ than the old one.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The new playground is bigger than the old one.",
        "zh": "新操场比旧操场大。"
      },
      {
        "q": "My mother is _____ than my father.",
        "opts": [
          "younger",
          "young",
          "youngest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My mother is younger than my father.",
        "zh": "我妈妈比爸爸年轻。"
      },
      {
        "q": "The story is _____ than the movie.",
        "opts": [
          "more exciting",
          "exciting",
          "most exciting"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The story is more exciting than the movie.",
        "zh": "故事比电影更刺激。"
      },
      {
        "q": "The piano is _____ than the guitar.",
        "opts": [
          "more expensive",
          "expensive",
          "most expensive"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The piano is more expensive than the guitar.",
        "zh": "钢琴比吉他贵。"
      },
      {
        "q": "The weather today is _____ than yesterday.",
        "opts": [
          "better",
          "good",
          "best"
        ],
        "ans": 0,
        "hint": "good的比较级是better",
        "sentence": "The weather today is better than yesterday.",
        "zh": "今天天气比昨天好。"
      },
      {
        "q": "The hot pot is _____ than the noodles.",
        "opts": [
          "spicier",
          "spicy",
          "spiciest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The hot pot is spicier than the noodles.",
        "zh": "火锅比面条辣。"
      },
      {
        "q": "My room is _____ than my sister's.",
        "opts": [
          "cleaner",
          "clean",
          "cleanest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My room is cleaner than my sister's.",
        "zh": "我的房间比姐姐的干净。"
      },
      {
        "q": "The doctor is _____ than the nurse.",
        "opts": [
          "busier",
          "busy",
          "busiest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The doctor is busier than the nurse.",
        "zh": "医生比护士忙。"
      },
      {
        "q": "The basketball is _____ than the football.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The basketball is bigger than the football.",
        "zh": "篮球比足球大。"
      },
      {
        "q": "This apple is _____ than that one.",
        "opts": [
          "sweeter",
          "sweet",
          "sweetest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "This apple is sweeter than that one.",
        "zh": "这个苹果比那个甜。"
      },
      {
        "q": "The dinosaur is _____ than the rabbit.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "My schoolbag is _____ than yours.",
        "opts": [
          "newer",
          "new",
          "newest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My schoolbag is newer than yours.",
        "zh": "我的书包比你的新。"
      },
      {
        "q": "The cat is _____ than the mouse.",
        "opts": [
          "fatter",
          "fat",
          "fattest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写t加er",
        "sentence": "The cat is fatter than the mouse.",
        "zh": "猫比老鼠胖。"
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
        "q": "The dinosaur is _____ the rabbit.",
        "opts": [
          "bigger",
          "bigger than",
          "big"
        ],
        "ans": 1,
        "hint": "比较两件事要用「比较级 + than」。",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "Tom is _____ Jack.",
        "opts": [
          "taller",
          "taller than",
          "more taller"
        ],
        "ans": 1,
        "hint": "比较级后面要跟 than。",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This bag is _____ than that one.",
        "opts": [
          "heavy",
          "heavier",
          "heaviest"
        ],
        "ans": 1,
        "hint": "两者比较用比较级 heavier。",
        "sentence": "This bag is heavier than that one.",
        "zh": "这个包比那个重。"
      },
      {
        "q": "Summer in Chengdu is _____ than spring.",
        "opts": [
          "hotter",
          "more hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "hot → hotter。",
        "sentence": "Summer in Chengdu is hotter than spring.",
        "zh": "成都的夏天比春天热。"
      },
      {
        "q": "Emma reads _____ than Tom.",
        "opts": [
          "careful",
          "more carefully",
          "most careful"
        ],
        "ans": 1,
        "hint": "副词比较常用 more + 副词。",
        "sentence": "Emma reads more carefully than Tom.",
        "zh": "艾玛读书比汤姆更仔细。"
      },
      {
        "q": "Which is _____, a cat or a dinosaur?",
        "opts": [
          "big",
          "bigger",
          "biggest"
        ],
        "ans": 1,
        "hint": "两者之间选哪一个更……用比较级。",
        "sentence": "Which is bigger, a cat or a dinosaur?",
        "zh": "猫和恐龙哪个更大？"
      },
      {
        "q": "The elephant is _____ than the mouse.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The elephant is bigger than the mouse.",
        "zh": "大象比老鼠大。"
      },
      {
        "q": "Tom is _____ than Jack.",
        "opts": [
          "taller",
          "tall",
          "tallest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This book is _____ than that one.",
        "opts": [
          "more interesting",
          "interesting",
          "most interesting"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "This book is more interesting than that one.",
        "zh": "这本书比那本有趣。"
      },
      {
        "q": "My bag is _____ than yours.",
        "opts": [
          "heavier",
          "heavy",
          "heaviest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "My bag is heavier than yours.",
        "zh": "我的书包比你的重。"
      },
      {
        "q": "The panda is _____ than the tiger.",
        "opts": [
          "cuter",
          "cute",
          "cutest"
        ],
        "ans": 0,
        "hint": "以e结尾加r",
        "sentence": "The panda is cuter than the tiger.",
        "zh": "熊猫比老虎可爱。"
      },
      {
        "q": "Spring is _____ than winter in Chengdu.",
        "opts": [
          "warmer",
          "warm",
          "warmest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "Spring is warmer than winter in Chengdu.",
        "zh": "成都的春天比冬天暖和。"
      },
      {
        "q": "The bus is _____ than the bike.",
        "opts": [
          "faster",
          "fast",
          "fastest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The bus is faster than the bike.",
        "zh": "公交车比自行车快。"
      },
      {
        "q": "My little brother is _____ than me.",
        "opts": [
          "shorter",
          "short",
          "shortest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My little brother is shorter than me.",
        "zh": "我弟弟比我矮。"
      },
      {
        "q": "The soup is _____ than the rice.",
        "opts": [
          "hotter",
          "hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写t加er",
        "sentence": "The soup is hotter than the rice.",
        "zh": "汤比饭烫。"
      },
      {
        "q": "The math test is _____ than the English test.",
        "opts": [
          "harder",
          "hard",
          "hardest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The math test is harder than the English test.",
        "zh": "数学考试比英语考试难。"
      },
      {
        "q": "My ruler is _____ than yours.",
        "opts": [
          "longer",
          "long",
          "longest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My ruler is longer than yours.",
        "zh": "我的尺子比你的长。"
      },
      {
        "q": "The blue pen is _____ than the red one.",
        "opts": [
          "cheaper",
          "cheap",
          "cheapest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The blue pen is cheaper than the red one.",
        "zh": "蓝色钢笔比红色的便宜。"
      },
      {
        "q": "The park is _____ than the street.",
        "opts": [
          "more beautiful",
          "beautiful",
          "most beautiful"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The park is more beautiful than the street.",
        "zh": "公园比街道漂亮。"
      },
      {
        "q": "The cat is _____ than the dog.",
        "opts": [
          "lazier",
          "lazy",
          "laziest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The cat is lazier than the dog.",
        "zh": "猫比狗懒。"
      },
      {
        "q": "The moon is _____ than the sun.",
        "opts": [
          "smaller",
          "small",
          "smallest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The moon is smaller than the sun.",
        "zh": "月亮比太阳小。"
      },
      {
        "q": "The new playground is _____ than the old one.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The new playground is bigger than the old one.",
        "zh": "新操场比旧操场大。"
      },
      {
        "q": "My mother is _____ than my father.",
        "opts": [
          "younger",
          "young",
          "youngest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My mother is younger than my father.",
        "zh": "我妈妈比爸爸年轻。"
      },
      {
        "q": "The story is _____ than the movie.",
        "opts": [
          "more exciting",
          "exciting",
          "most exciting"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The story is more exciting than the movie.",
        "zh": "故事比电影更刺激。"
      },
      {
        "q": "The piano is _____ than the guitar.",
        "opts": [
          "more expensive",
          "expensive",
          "most expensive"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The piano is more expensive than the guitar.",
        "zh": "钢琴比吉他贵。"
      },
      {
        "q": "The weather today is _____ than yesterday.",
        "opts": [
          "better",
          "good",
          "best"
        ],
        "ans": 0,
        "hint": "good的比较级是better",
        "sentence": "The weather today is better than yesterday.",
        "zh": "今天天气比昨天好。"
      },
      {
        "q": "The hot pot is _____ than the noodles.",
        "opts": [
          "spicier",
          "spicy",
          "spiciest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The hot pot is spicier than the noodles.",
        "zh": "火锅比面条辣。"
      },
      {
        "q": "My room is _____ than my sister's.",
        "opts": [
          "cleaner",
          "clean",
          "cleanest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My room is cleaner than my sister's.",
        "zh": "我的房间比姐姐的干净。"
      },
      {
        "q": "The doctor is _____ than the nurse.",
        "opts": [
          "busier",
          "busy",
          "busiest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The doctor is busier than the nurse.",
        "zh": "医生比护士忙。"
      },
      {
        "q": "The basketball is _____ than the football.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The basketball is bigger than the football.",
        "zh": "篮球比足球大。"
      },
      {
        "q": "This apple is _____ than that one.",
        "opts": [
          "sweeter",
          "sweet",
          "sweetest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "This apple is sweeter than that one.",
        "zh": "这个苹果比那个甜。"
      },
      {
        "q": "The dinosaur is _____ than the rabbit.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "My schoolbag is _____ than yours.",
        "opts": [
          "newer",
          "new",
          "newest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My schoolbag is newer than yours.",
        "zh": "我的书包比你的新。"
      },
      {
        "q": "The cat is _____ than the mouse.",
        "opts": [
          "fatter",
          "fat",
          "fattest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写t加er",
        "sentence": "The cat is fatter than the mouse.",
        "zh": "猫比老鼠胖。"
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
    "image": "l04-dino-rabbit.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "bigger than",
        "zh": "比……更大"
      },
      {
        "en": "taller than",
        "zh": "比……更高"
      },
      {
        "en": "heavier than",
        "zh": "比……更重"
      },
      {
        "en": "cheaper than",
        "zh": "比……更便宜"
      },
      {
        "en": "smaller than",
        "zh": "比……小"
      },
      {
        "en": "shorter than",
        "zh": "比……矮"
      },
      {
        "en": "faster than",
        "zh": "比……快"
      },
      {
        "en": "slower than",
        "zh": "比……慢"
      },
      {
        "en": "lighter than",
        "zh": "比……轻"
      },
      {
        "en": "more interesting than",
        "zh": "比……有趣"
      },
      {
        "en": "more beautiful than",
        "zh": "比……漂亮"
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
    "image": "l04-dino-rabbit.jpg",
    "audio": "The elephant is bigger than the mouse.",
    "opts": [
      "The elephant is bigger than the mouse.",
      "The elephant is big than the mouse.",
      "The elephant is biggest than the mouse."
    ],
    "ans": 0,
    "hint": "注意bigger的发音",
    "sentence": "The elephant is bigger than the mouse.",
    "zh": "大象比老鼠大。",
    "questions": [
      {
        "audio": "The elephant is bigger than the mouse.",
        "opts": [
          "The elephant is bigger than the mouse.",
          "The elephant is big than the mouse.",
          "The elephant is biggest than the mouse."
        ],
        "ans": 0,
        "hint": "注意bigger的发音",
        "zh": "大象比老鼠大。",
        "sentence": "The elephant is bigger than the mouse."
      },
      {
        "audio": "Tom is taller than Jack.",
        "opts": [
          "Tom is taller than Jack.",
          "Tom is tall than Jack.",
          "Tom is tallest than Jack."
        ],
        "ans": 0,
        "hint": "注意taller的发音",
        "zh": "汤姆比杰克高。",
        "sentence": "Tom is taller than Jack."
      },
      {
        "audio": "This book is more interesting than that one.",
        "opts": [
          "This book is more interesting than that one.",
          "This book is more interesting that that one.",
          "This book is interesting than that one."
        ],
        "ans": 0,
        "hint": "注意more interesting",
        "zh": "这本书比那本有趣。",
        "sentence": "This book is more interesting than that one."
      },
      {
        "audio": "My bag is heavier than yours.",
        "opts": [
          "My bag is heavier than yours.",
          "My bag is heavy than yours.",
          "My bag is heavier that yours."
        ],
        "ans": 0,
        "hint": "注意heavier的发音",
        "zh": "我的书包比你的重。",
        "sentence": "My bag is heavier than yours."
      },
      {
        "audio": "The panda is cuter than the tiger.",
        "opts": [
          "The panda is cuter than the tiger.",
          "The panda is cute than the tiger.",
          "The panda is cutest than the tiger."
        ],
        "ans": 0,
        "hint": "注意cuter的发音",
        "zh": "熊猫比老虎可爱。",
        "sentence": "The panda is cuter than the tiger."
      },
      {
        "audio": "Spring is warmer than winter in Chengdu.",
        "opts": [
          "Spring is warmer than winter in Chengdu.",
          "Spring is warm than winter in Chengdu.",
          "Spring is warmest than winter in Chengdu."
        ],
        "ans": 0,
        "hint": "注意warmer的发音",
        "zh": "成都的春天比冬天暖和。",
        "sentence": "Spring is warmer than winter in Chengdu."
      },
      {
        "audio": "The bus is faster than the bike.",
        "opts": [
          "The bus is faster than the bike.",
          "The bus is fast than the bike.",
          "The bus is fastest than the bike."
        ],
        "ans": 0,
        "hint": "注意faster的发音",
        "zh": "公交车比自行车快。",
        "sentence": "The bus is faster than the bike."
      },
      {
        "audio": "The hot pot is spicier than the noodles.",
        "opts": [
          "The hot pot is spicier than the noodles.",
          "The hot pot is spicy than the noodles.",
          "The hot pot is spiciest than the noodles."
        ],
        "ans": 0,
        "hint": "注意spicier的发音",
        "zh": "火锅比面条辣。",
        "sentence": "The hot pot is spicier than the noodles."
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
    "image": "l04-dino-rabbit.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "The elephant is bigger than the mouse.",
        "zh": "大象比老鼠大。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My bag is heavier than yours.",
        "zh": "我的书包比你的重。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Spring is warmer than winter in Chengdu.",
        "zh": "成都的春天比冬天暖和。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The panda is cuter than the tiger.",
        "zh": "熊猫比老虎可爱。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "This apple is sweeter than that one.",
        "zh": "这个苹果比那个甜。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The bus is faster than the bike.",
        "zh": "公交车比自行车快。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "My little brother is shorter than me.",
        "zh": "我弟弟比我矮。",
        "tag": "daily_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "The soup is hotter than the rice.",
        "zh": "汤比饭烫。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "This book is more interesting than that one.",
        "zh": "这本书比那本有趣。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The math test is harder than the English test.",
        "zh": "数学考试比英语考试难。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My ruler is longer than yours.",
        "zh": "我的尺子比你的长。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The blue pen is cheaper than the red one.",
        "zh": "蓝色钢笔比红色的便宜。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "The park is more beautiful than the street.",
        "zh": "公园比街道漂亮。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The cat is lazier than the dog.",
        "zh": "猫比狗懒。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "The moon is smaller than the sun.",
        "zh": "月亮比太阳小。",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "The new playground is bigger than the old one.",
        "zh": "新操场比旧操场大。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My mother is younger than my father.",
        "zh": "我妈妈比爸爸年轻。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The story is more exciting than the movie.",
        "zh": "故事比电影更刺激。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The piano is more expensive than the guitar.",
        "zh": "钢琴比吉他贵。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The weather today is better than yesterday.",
        "zh": "今天天气比昨天好。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The hot pot is spicier than the noodles.",
        "zh": "火锅比面条辣。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "My room is cleaner than my sister's.",
        "zh": "我的房间比姐姐的干净。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "The doctor is busier than the nurse.",
        "zh": "医生比护士忙。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The basketball is bigger than the football.",
        "zh": "篮球比足球大。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
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
    "image": "l04-dino-rabbit.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "My ruler is _____ than yours.",
        "opts": [
          "longer",
          "long",
          "longest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My ruler is longer than yours.",
        "zh": "我的尺子比你的长。"
      },
      {
        "q": "The blue pen is _____ than the red one.",
        "opts": [
          "cheaper",
          "cheap",
          "cheapest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The blue pen is cheaper than the red one.",
        "zh": "蓝色钢笔比红色的便宜。"
      },
      {
        "q": "The park is _____ than the street.",
        "opts": [
          "more beautiful",
          "beautiful",
          "most beautiful"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The park is more beautiful than the street.",
        "zh": "公园比街道漂亮。"
      },
      {
        "q": "The cat is _____ than the dog.",
        "opts": [
          "lazier",
          "lazy",
          "laziest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The cat is lazier than the dog.",
        "zh": "猫比狗懒。"
      },
      {
        "q": "The moon is _____ than the sun.",
        "opts": [
          "smaller",
          "small",
          "smallest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "The moon is smaller than the sun.",
        "zh": "月亮比太阳小。"
      },
      {
        "q": "The new playground is _____ than the old one.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The new playground is bigger than the old one.",
        "zh": "新操场比旧操场大。"
      },
      {
        "q": "My mother is _____ than my father.",
        "opts": [
          "younger",
          "young",
          "youngest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My mother is younger than my father.",
        "zh": "我妈妈比爸爸年轻。"
      },
      {
        "q": "The story is _____ than the movie.",
        "opts": [
          "more exciting",
          "exciting",
          "most exciting"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The story is more exciting than the movie.",
        "zh": "故事比电影更刺激。"
      },
      {
        "q": "The piano is _____ than the guitar.",
        "opts": [
          "more expensive",
          "expensive",
          "most expensive"
        ],
        "ans": 0,
        "hint": "多音节用more",
        "sentence": "The piano is more expensive than the guitar.",
        "zh": "钢琴比吉他贵。"
      },
      {
        "q": "The weather today is _____ than yesterday.",
        "opts": [
          "better",
          "good",
          "best"
        ],
        "ans": 0,
        "hint": "good的比较级是better",
        "sentence": "The weather today is better than yesterday.",
        "zh": "今天天气比昨天好。"
      },
      {
        "q": "The hot pot is _____ than the noodles.",
        "opts": [
          "spicier",
          "spicy",
          "spiciest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The hot pot is spicier than the noodles.",
        "zh": "火锅比面条辣。"
      },
      {
        "q": "My room is _____ than my sister's.",
        "opts": [
          "cleaner",
          "clean",
          "cleanest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My room is cleaner than my sister's.",
        "zh": "我的房间比姐姐的干净。"
      },
      {
        "q": "The doctor is _____ than the nurse.",
        "opts": [
          "busier",
          "busy",
          "busiest"
        ],
        "ans": 0,
        "hint": "辅音+y变i加er",
        "sentence": "The doctor is busier than the nurse.",
        "zh": "医生比护士忙。"
      },
      {
        "q": "The basketball is _____ than the football.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The basketball is bigger than the football.",
        "zh": "篮球比足球大。"
      },
      {
        "q": "This apple is _____ than that one.",
        "opts": [
          "sweeter",
          "sweet",
          "sweetest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "This apple is sweeter than that one.",
        "zh": "这个苹果比那个甜。"
      },
      {
        "q": "The dinosaur is _____ than the rabbit.",
        "opts": [
          "bigger",
          "big",
          "biggest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写g加er",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "My schoolbag is _____ than yours.",
        "opts": [
          "newer",
          "new",
          "newest"
        ],
        "ans": 0,
        "hint": "比较级用-er",
        "sentence": "My schoolbag is newer than yours.",
        "zh": "我的书包比你的新。"
      },
      {
        "q": "The cat is _____ than the mouse.",
        "opts": [
          "fatter",
          "fat",
          "fattest"
        ],
        "ans": 0,
        "hint": "重读闭音节双写t加er",
        "sentence": "The cat is fatter than the mouse.",
        "zh": "猫比老鼠胖。"
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
    "image": "l04-writing-frame.jpg",
    "checklist": [
      "比较两件事：形容词比较级 + than + 比较对象",
      "写作模板：A is + 比较级 + than + B.",
      "口语常用：Who is taller? — Tom is taller than Jack.",
      "注意拼写：heavy→heavier, big→bigger, happy→happier",
      "易错：不要 more cheaper；短词只用 -er。",
      "两者比较用比较级，三者以上才用最高级。"
    ],
    "chant": "Two things? Add -er, then than! A is taller than B — you can!",
    "chantSpeak": "Two things? Add er, then than! A is taller than B, you can!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "比较级 + than",
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