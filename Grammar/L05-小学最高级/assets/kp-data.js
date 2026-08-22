(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 最美丽的海滩",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "Yalong Bay is one of the most beautiful beaches in China.",
    "soundHint": "先听！他们在说「最……」还是「比……更……」？",
    "question": "这句话在说范围内「最」还是「更」？",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。",
    "image": "l05-yalong-beach.jpg",
    "source": "PSLE Set 01 · 真题"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 最高级标志",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l05-yalong-beach.jpg",
    "question": "「one of the most beautiful beaches」中，为什么 beaches 用复数？",
    "choices": [
      {
        "text": "因为 beach 永远是复数",
        "correct": false,
        "fb": "beach 可数，单数是 beach。"
      },
      {
        "text": "因为是「许多海滩中最美的之一」",
        "correct": true,
        "fb": "对了！one of the most + 复数名词 = ……中最……的之一。"
      },
      {
        "text": "因为 Yalong Bay 有很多湾",
        "correct": false,
        "fb": "关键在 one of the most 结构，不是地名。"
      }
    ],
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l05-yalong-beach.jpg",
    "lead": "三者以上、有范围时，用最高级。",
    "formula": "the + 最高级 + in / of + 范围",
    "parts": [
      {
        "mark": "the",
        "label": "定冠词",
        "example": "the"
      },
      {
        "mark": "-est",
        "label": "最高级",
        "example": "tallest"
      },
      {
        "mark": "in/of",
        "label": "范围",
        "example": "in our class"
      }
    ],
    "samples": [
      {
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美海滩之一。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · 比较级 vs 最高级",
    "type": "discover",
    "lead": "比较两件事和在三者以上选「最」，有什么不同？",
    "leftImage": "l05-taller.jpg",
    "rightImage": "l05-tallest.jpg",
    "leftLabel": "比较级 taller than",
    "rightLabel": "最高级 the tallest",
    "leftSentence": "Tom is taller than Jack.",
    "leftZh": "汤姆比杰克高。",
    "rightSentence": "Tom is the tallest boy in our class.",
    "rightZh": "汤姆是我们班最高的男孩。",
    "morphBase": "tall",
    "morphPast": "the tallest",
    "morphHighlight": "est",
    "discovery": "两者比较用 -er + than；三者及以上用 the + -est，常加 in/of 范围。"
  },
  {
    "section": "精讲",
    "title": "例句 · 班上最高",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l05-yalong-beach.jpg",
    "lead": "in our class 给出比较范围。",
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 最美之一",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l05-yalong-beach.jpg",
    "lead": "one of the most + 形容词 + 复数名词。",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美海滩之一。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "范围 · in / of",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "用 in 或 of 表示比较的范围。",
    "sentence": "This is the biggest panda in the zoo.",
    "zh": "这是动物园里最大的熊猫。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "id": "p08",
    "section": "精讲",
    "title": "拼写规则卡 · -est 变化",
    "type": "spelling",
    "image": "l05-spell-rules.jpg",
    "lead": "最高级拼写与比较级类似，只是用 -est。",
    "rules": [
      {
        "tab": "the +est",
        "rule": "短形容词：the + 原级 + -est",
        "focusVerb": "tallest",
        "examples": [
          {
            "from": "tall",
            "to": "the tallest"
          },
          {
            "from": "old",
            "to": "the oldest"
          },
          {
            "from": "young",
            "to": "the youngest"
          }
        ],
        "sample": "Tom is the tallest boy in our class.",
        "sampleZh": "汤姆是我们班最高的男孩。"
      },
      {
        "tab": "one of the most",
        "rule": "长形容词：one of the most + 形容词 + 复数名词",
        "focusVerb": "beautiful",
        "examples": [
          {
            "from": "beautiful",
            "to": "the most beautiful"
          },
          {
            "from": "famous",
            "to": "the most famous"
          },
          {
            "from": "popular",
            "to": "the most popular"
          }
        ],
        "sample": "Yalong Bay is one of the most beautiful beaches in China.",
        "sampleZh": "亚龙湾是中国最美丽的海滩之一。",
        "sampleImage": "l05-yalong-beach.jpg"
      }
    ]
  },
  {
    "id": "p09",
    "section": "辨析",
    "title": "分类篮 · 比较级还是最高级？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l05-compare-super.jpg",
    "lead": "句子是比两件东西，还是在范围内选「最」？",
    "buckets": [
      {
        "key": "comp",
        "label": "比较级 + than"
      },
      {
        "key": "super",
        "label": "the + 最高级 / one of the most"
      }
    ],
    "items": [
      {
        "text": "She is taller than me.",
        "bucket": "comp"
      },
      {
        "text": "He is the tallest in the team.",
        "bucket": "super"
      },
      {
        "text": "This bag is cheaper than that one.",
        "bucket": "comp"
      },
      {
        "text": "It is one of the most popular books.",
        "bucket": "super"
      },
      {
        "text": "Summer is hotter than spring.",
        "bucket": "comp"
      },
      {
        "text": "Chengdu is one of the most liveable cities.",
        "bucket": "super"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l05-yalong-beach.jpg",
    "question": "「Chengdu is one of the most liveable city in China.」错在哪？",
    "choices": [
      {
        "text": "one of 后面的名词要用复数 cities",
        "correct": true,
        "fb": "对了！one of the most + 形容词 + 复数名词。"
      },
      {
        "text": "liveable 要改成 more liveable",
        "correct": false,
        "fb": "这里已经是最高级 most liveable。"
      },
      {
        "text": "不能用 the",
        "correct": false,
        "fb": "最高级前面通常要 the。"
      }
    ],
    "sentence": "Chengdu is one of the most liveable cities in China.",
    "zh": "成都是中国最宜居的城市之一。",
    "id": "p10"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l05-yalong-beach.jpg",
    "lead": "把比较级句改成最高级：加上 the，并给出范围。",
    "items": [
      {
        "from": "Tom is taller than Jack.",
        "fromZh": "汤姆比杰克高。",
        "steps": [
          {
            "label": "班上最高怎么说？",
            "opts": [
              "Tom is the tallest boy in our class.",
              "Tom is tallest boy in our class.",
              "Tom is the taller boy in our class."
            ],
            "ans": 0,
            "hint": "最高级：the tallest + in 范围。",
            "sentence": "Tom is the tallest boy in our class.",
            "zh": "汤姆是我们班最高的男孩。"
          }
        ]
      },
      {
        "from": "Chengdu is one of the most liveable city in China.",
        "fromZh": "成都是中国最宜居的城市之一。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "Chengdu is one of the most liveable cities in China.",
              "Chengdu is one of the most liveable city in China.",
              "Chengdu is the most liveable city in China."
            ],
            "ans": 0,
            "hint": "one of + 最高级 + 复数名词",
            "sentence": "Chengdu is one of the most liveable cities in China.",
            "zh": "成都是中国最宜居的城市之一。"
          }
        ]
      },
      {
        "from": "Tom is tallest boy in our class.",
        "fromZh": "汤姆是我们班最高的男孩。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "Tom is the tallest boy in our class.",
              "Tom is a tallest boy in our class.",
              "Tom is tallest boy in our class."
            ],
            "ans": 0,
            "hint": "最高级前要加 the",
            "sentence": "Tom is the tallest boy in our class.",
            "zh": "汤姆是我们班最高的男孩。"
          }
        ]
      },
      {
        "from": "This is the most interesting book in library.",
        "fromZh": "这是图书馆里最有趣的书。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "This is the most interesting book in the library.",
              "This is the most interesting book in library.",
              "This is most interesting book in the library."
            ],
            "ans": 0,
            "hint": "名词前需要冠词 the",
            "sentence": "This is the most interesting book in the library.",
            "zh": "这是图书馆里最有趣的书。"
          }
        ]
      },
      {
        "from": "She is the most careful student in our class.",
        "fromZh": "她是我们班最细心的学生。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "She is not the most careful student in our class.",
              "She is not most careful student in our class.",
              "She is the most careless student in our class."
            ],
            "ans": 0,
            "hint": "否定句在 be 动词后加 not",
            "sentence": "She is not the most careful student in our class.",
            "zh": "她不是我们班最细心的学生。"
          }
        ]
      },
      {
        "from": "The panda is the most popular animal in the zoo.",
        "fromZh": "熊猫是动物园里最受欢迎的动物。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Is the panda the most popular animal in the zoo?",
              "The panda is the most popular animal in the zoo?",
              "Is the panda most popular animal in the zoo?"
            ],
            "ans": 0,
            "hint": "一般疑问句把 be 动词提前",
            "sentence": "Is the panda the most popular animal in the zoo?",
            "zh": "熊猫是动物园里最受欢迎的动物吗？"
          }
        ]
      },
      {
        "from": "Winter is the coldest season of the year.",
        "fromZh": "冬天是一年中最冷的季节。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "Winter is not the coldest season of the year.",
              "Winter is not coldest season of the year.",
              "Winter is the not coldest season of the year."
            ],
            "ans": 0,
            "hint": "否定句在 be 动词后加 not",
            "sentence": "Winter is not the coldest season of the year.",
            "zh": "冬天不是一年中最冷的季节。"
          }
        ]
      }
    ],
    "id": "p11"
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
      "This",
      "is",
      "the",
      "biggest",
      "panda",
      "in",
      "the",
      "zoo"
    ],
    "sentence": "This is the biggest panda in the zoo.",
    "zh": "这是动物园里最大的熊猫。",
    "items": [
      {
        "tokens": [
          "This",
          "is",
          "the",
          "biggest",
          "panda",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "This is the biggest panda in the zoo.",
        "zh": "这是动物园里最大的熊猫。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "My",
          "mother",
          "is",
          "the",
          "best",
          "cook",
          "in",
          "our",
          "family"
        ],
        "sentence": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "The",
          "library",
          "is",
          "the",
          "quietest",
          "place",
          "in",
          "our",
          "school"
        ],
        "sentence": "The library is the quietest place in our school.",
        "zh": "图书馆是我们学校最安静的地方。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "Winter",
          "is",
          "the",
          "coldest",
          "season",
          "in",
          "Chengdu"
        ],
        "sentence": "Winter is the coldest season in Chengdu.",
        "zh": "冬天是成都最冷的季节。",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "This",
          "is",
          "the",
          "cheapest",
          "toy",
          "in",
          "the",
          "shop"
        ],
        "sentence": "This is the cheapest toy in the shop.",
        "zh": "这是商店里最便宜的玩具。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "He",
          "is",
          "the",
          "fastest",
          "runner",
          "on",
          "the",
          "playground"
        ],
        "sentence": "He is the fastest runner on the playground.",
        "zh": "他是操场上跑得最快的人。",
        "image": "kp3d-playground.png"
      }
    ],
    "id": "p12"
  },
  {
    "id": "p13",
    "section": "操练",
    "title": "听音排序 · 最高级句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l05-tallest-class.jpg",
    "audio": "Tom is the tallest boy in our class.",
    "tokens": [
      "Tom",
      "is",
      "the",
      "tallest",
      "boy",
      "in",
      "our",
      "class"
    ],
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。"
  },
  {
    "id": "p14",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l05-yalong-beach.jpg",
    "q": "Yalong Bay is one of the most beautiful _____ in China.",
    "opts": [
      "beach",
      "beaches",
      "beachs"
    ],
    "ans": 1,
    "hint": "one of the most + 复数名词。",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l05-yalong-beach.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "Yalong Bay is one of the most beautiful _____ in China.",
        "opts": [
          "beach",
          "beaches",
          "beachs"
        ],
        "ans": 1,
        "hint": "one of the most + 复数名词。",
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美丽的海滩之一。"
      },
      {
        "q": "This is _____ book in the library.",
        "opts": [
          "the most interesting",
          "more interesting",
          "interesting"
        ],
        "ans": 0,
        "hint": "范围内最……用 the most + 长形容词。",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Winter is _____ season of the year.",
        "opts": [
          "colder",
          "the coldest",
          "coldest"
        ],
        "ans": 1,
        "hint": "of the year 是范围，用 the coldest。",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "She is one of _____ students in Grade Six.",
        "opts": [
          "the best",
          "better",
          "good"
        ],
        "ans": 0,
        "hint": "one of the + 最高级 + 复数。",
        "sentence": "She is one of the best students in Grade Six.",
        "zh": "她是六年级最优秀的学生之一。"
      },
      {
        "q": "Mount Qomolangma is _____ mountain in the world.",
        "opts": [
          "higher",
          "the highest",
          "more high"
        ],
        "ans": 1,
        "hint": "the highest + in the world。",
        "sentence": "Mount Qomolangma is the highest mountain in the world.",
        "zh": "珠穆朗玛峰是世界上最高的山。"
      },
      {
        "q": "Which is _____, spring, summer or winter?",
        "opts": [
          "hot",
          "hotter",
          "the hottest"
        ],
        "ans": 2,
        "hint": "三者选最……用最高级。",
        "sentence": "Which is the hottest, spring, summer or winter?",
        "zh": "春夏冬哪个最热？"
      },
      {
        "q": "This is the _____ book in the library.",
        "opts": [
          "interesting",
          "more interesting",
          "most interesting"
        ],
        "ans": 2,
        "hint": "最高级要用 most + 形容词",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Tom is _____ tallest boy in our class.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前要加 the",
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "q": "Winter is the _____ season in Chengdu.",
        "opts": [
          "cold",
          "colder",
          "coldest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "Winter is the coldest season in Chengdu.",
        "zh": "冬天是成都最冷的季节。"
      },
      {
        "q": "The panda is the _____ animal in the zoo.",
        "opts": [
          "popular",
          "more popular",
          "most popular"
        ],
        "ans": 2,
        "hint": "多音节形容词用 most",
        "sentence": "The panda is the most popular animal in the zoo.",
        "zh": "熊猫是动物园里最受欢迎的动物。"
      },
      {
        "q": "My mother is the _____ cook in our family.",
        "opts": [
          "good",
          "better",
          "best"
        ],
        "ans": 2,
        "hint": "good 的最高级是 best",
        "sentence": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。"
      },
      {
        "q": "This is the _____ apple of all.",
        "opts": [
          "sweet",
          "sweeter",
          "sweetest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "This is the sweetest apple of all.",
        "zh": "这是所有苹果中最甜的。"
      },
      {
        "q": "The library is the _____ place in our school.",
        "opts": [
          "quiet",
          "quieter",
          "quietest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The library is the quietest place in our school.",
        "zh": "图书馆是我们学校最安静的地方。"
      },
      {
        "q": "He is the _____ runner on the playground.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "He is the fastest runner on the playground.",
        "zh": "他是操场上跑得最快的人。"
      },
      {
        "q": "This is _____ most beautiful picture in the museum.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前用 the",
        "sentence": "This is the most beautiful picture in the museum.",
        "zh": "这是博物馆里最漂亮的画。"
      },
      {
        "q": "My brother is the _____ in our family.",
        "opts": [
          "young",
          "younger",
          "youngest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "My brother is the youngest in our family.",
        "zh": "我弟弟是我们家最小的。"
      }
    ],
    "id": "p15"
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
        "q": "Yalong Bay is one of the most beautiful _____ in China.",
        "opts": [
          "beach",
          "beaches",
          "beachs"
        ],
        "ans": 1,
        "hint": "one of the most + 复数名词。",
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美丽的海滩之一。"
      },
      {
        "q": "This is _____ book in the library.",
        "opts": [
          "the most interesting",
          "more interesting",
          "interesting"
        ],
        "ans": 0,
        "hint": "范围内最……用 the most + 长形容词。",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Winter is _____ season of the year.",
        "opts": [
          "colder",
          "the coldest",
          "coldest"
        ],
        "ans": 1,
        "hint": "of the year 是范围，用 the coldest。",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "She is one of _____ students in Grade Six.",
        "opts": [
          "the best",
          "better",
          "good"
        ],
        "ans": 0,
        "hint": "one of the + 最高级 + 复数。",
        "sentence": "She is one of the best students in Grade Six.",
        "zh": "她是六年级最优秀的学生之一。"
      },
      {
        "q": "Mount Qomolangma is _____ mountain in the world.",
        "opts": [
          "higher",
          "the highest",
          "more high"
        ],
        "ans": 1,
        "hint": "the highest + in the world。",
        "sentence": "Mount Qomolangma is the highest mountain in the world.",
        "zh": "珠穆朗玛峰是世界上最高的山。"
      },
      {
        "q": "Which is _____, spring, summer or winter?",
        "opts": [
          "hot",
          "hotter",
          "the hottest"
        ],
        "ans": 2,
        "hint": "三者选最……用最高级。",
        "sentence": "Which is the hottest, spring, summer or winter?",
        "zh": "春夏冬哪个最热？"
      },
      {
        "q": "This is the _____ book in the library.",
        "opts": [
          "interesting",
          "more interesting",
          "most interesting"
        ],
        "ans": 2,
        "hint": "最高级要用 most + 形容词",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Tom is _____ tallest boy in our class.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前要加 the",
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "q": "Winter is the _____ season in Chengdu.",
        "opts": [
          "cold",
          "colder",
          "coldest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "Winter is the coldest season in Chengdu.",
        "zh": "冬天是成都最冷的季节。"
      },
      {
        "q": "The panda is the _____ animal in the zoo.",
        "opts": [
          "popular",
          "more popular",
          "most popular"
        ],
        "ans": 2,
        "hint": "多音节形容词用 most",
        "sentence": "The panda is the most popular animal in the zoo.",
        "zh": "熊猫是动物园里最受欢迎的动物。"
      },
      {
        "q": "My mother is the _____ cook in our family.",
        "opts": [
          "good",
          "better",
          "best"
        ],
        "ans": 2,
        "hint": "good 的最高级是 best",
        "sentence": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。"
      },
      {
        "q": "This is the _____ apple of all.",
        "opts": [
          "sweet",
          "sweeter",
          "sweetest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "This is the sweetest apple of all.",
        "zh": "这是所有苹果中最甜的。"
      },
      {
        "q": "The library is the _____ place in our school.",
        "opts": [
          "quiet",
          "quieter",
          "quietest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The library is the quietest place in our school.",
        "zh": "图书馆是我们学校最安静的地方。"
      },
      {
        "q": "He is the _____ runner on the playground.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "He is the fastest runner on the playground.",
        "zh": "他是操场上跑得最快的人。"
      },
      {
        "q": "This is _____ most beautiful picture in the museum.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前用 the",
        "sentence": "This is the most beautiful picture in the museum.",
        "zh": "这是博物馆里最漂亮的画。"
      },
      {
        "q": "My brother is the _____ in our family.",
        "opts": [
          "young",
          "younger",
          "youngest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "My brother is the youngest in our family.",
        "zh": "我弟弟是我们家最小的。"
      },
      {
        "q": "The bus is the _____ way to go to school.",
        "opts": [
          "convenient",
          "more convenient",
          "most convenient"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "The bus is the most convenient way to go to school.",
        "zh": "坐公交是上学最方便的方式。"
      },
      {
        "q": "Chengdu is one of the most _____ cities in China.",
        "opts": [
          "liveable",
          "more liveable",
          "liveable"
        ],
        "ans": 0,
        "hint": "one of + 最高级 + 复数名词，这里用原形",
        "sentence": "Chengdu is one of the most liveable cities in China.",
        "zh": "成都是中国最宜居的城市之一。"
      },
      {
        "q": "The cat is the _____ animal in my house.",
        "opts": [
          "cute",
          "cuter",
          "cutest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The cat is the cutest animal in my house.",
        "zh": "猫是我家最可爱的动物。"
      },
      {
        "q": "The piano is the _____ instrument in the music room.",
        "opts": [
          "beautiful",
          "more beautiful",
          "most beautiful"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "The piano is the most beautiful instrument in the music room.",
        "zh": "钢琴是音乐教室里最漂亮的乐器。"
      },
      {
        "q": "My father is the _____ person in my family.",
        "opts": [
          "strong",
          "stronger",
          "strongest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "My father is the strongest person in my family.",
        "zh": "我爸爸是我们家最强壮的人。"
      },
      {
        "q": "The classroom is the _____ room in our school.",
        "opts": [
          "bright",
          "brighter",
          "brightest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The classroom is the brightest room in our school.",
        "zh": "教室是我们学校最明亮的房间。"
      },
      {
        "q": "This is the _____ hotpot I have ever eaten.",
        "opts": [
          "delicious",
          "more delicious",
          "most delicious"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "This is the most delicious hotpot I have ever eaten.",
        "zh": "这是我吃过的最好吃的火锅。"
      },
      {
        "q": "The panda is the _____ famous animal in Sichuan.",
        "opts": [
          "most",
          "more",
          "much"
        ],
        "ans": 0,
        "hint": "famous 的最高级用 most",
        "sentence": "The panda is the most famous animal in Sichuan.",
        "zh": "熊猫是四川最著名的动物。"
      },
      {
        "q": "She is the _____ student in our class.",
        "opts": [
          "careful",
          "more careful",
          "most careful"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "She is the most careful student in our class.",
        "zh": "她是我们班最细心的学生。"
      },
      {
        "q": "The Great Wall is one of the greatest _____ in the world.",
        "opts": [
          "wonder",
          "wonders",
          "wondering"
        ],
        "ans": 1,
        "hint": "one of + 最高级 + 复数名词",
        "sentence": "The Great Wall is one of the greatest wonders in the world.",
        "zh": "长城是世界上最伟大的奇迹之一。"
      },
      {
        "q": "My mother is the best cook _____ our family.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。"
      },
      {
        "q": "This is the cheapest toy _____ the shop.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "This is the cheapest toy in the shop.",
        "zh": "这是商店里最便宜的玩具。"
      },
      {
        "q": "The red apple is the sweetest _____ all.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 1,
        "hint": "范围用 of",
        "sentence": "The red apple is the sweetest of all.",
        "zh": "红苹果是所有苹果中最甜的。"
      },
      {
        "q": "Winter is the coldest season _____ the year.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 1,
        "hint": "范围用 of",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "This is the most interesting book _____ the library.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Tom is the tallest boy _____ our class.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "q": "She is the most careful student _____ our class.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "She is the most careful student in our class.",
        "zh": "她是我们班最细心的学生。"
      },
      {
        "q": "The panda is the most popular animal _____ the zoo.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "The panda is the most popular animal in the zoo.",
        "zh": "熊猫是动物园里最受欢迎的动物。"
      }
    ],
    "id": "p16"
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
        "q": "Yalong Bay is one of the most beautiful _____ in China.",
        "opts": [
          "beach",
          "beaches",
          "beachs"
        ],
        "ans": 1,
        "hint": "one of the most + 复数名词。",
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美丽的海滩之一。"
      },
      {
        "q": "This is _____ book in the library.",
        "opts": [
          "the most interesting",
          "more interesting",
          "interesting"
        ],
        "ans": 0,
        "hint": "范围内最……用 the most + 长形容词。",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Winter is _____ season of the year.",
        "opts": [
          "colder",
          "the coldest",
          "coldest"
        ],
        "ans": 1,
        "hint": "of the year 是范围，用 the coldest。",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "She is one of _____ students in Grade Six.",
        "opts": [
          "the best",
          "better",
          "good"
        ],
        "ans": 0,
        "hint": "one of the + 最高级 + 复数。",
        "sentence": "She is one of the best students in Grade Six.",
        "zh": "她是六年级最优秀的学生之一。"
      },
      {
        "q": "Mount Qomolangma is _____ mountain in the world.",
        "opts": [
          "higher",
          "the highest",
          "more high"
        ],
        "ans": 1,
        "hint": "the highest + in the world。",
        "sentence": "Mount Qomolangma is the highest mountain in the world.",
        "zh": "珠穆朗玛峰是世界上最高的山。"
      },
      {
        "q": "Which is _____, spring, summer or winter?",
        "opts": [
          "hot",
          "hotter",
          "the hottest"
        ],
        "ans": 2,
        "hint": "三者选最……用最高级。",
        "sentence": "Which is the hottest, spring, summer or winter?",
        "zh": "春夏冬哪个最热？"
      },
      {
        "q": "This is the _____ book in the library.",
        "opts": [
          "interesting",
          "more interesting",
          "most interesting"
        ],
        "ans": 2,
        "hint": "最高级要用 most + 形容词",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Tom is _____ tallest boy in our class.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前要加 the",
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "q": "Winter is the _____ season in Chengdu.",
        "opts": [
          "cold",
          "colder",
          "coldest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "Winter is the coldest season in Chengdu.",
        "zh": "冬天是成都最冷的季节。"
      },
      {
        "q": "The panda is the _____ animal in the zoo.",
        "opts": [
          "popular",
          "more popular",
          "most popular"
        ],
        "ans": 2,
        "hint": "多音节形容词用 most",
        "sentence": "The panda is the most popular animal in the zoo.",
        "zh": "熊猫是动物园里最受欢迎的动物。"
      },
      {
        "q": "My mother is the _____ cook in our family.",
        "opts": [
          "good",
          "better",
          "best"
        ],
        "ans": 2,
        "hint": "good 的最高级是 best",
        "sentence": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。"
      },
      {
        "q": "This is the _____ apple of all.",
        "opts": [
          "sweet",
          "sweeter",
          "sweetest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "This is the sweetest apple of all.",
        "zh": "这是所有苹果中最甜的。"
      },
      {
        "q": "The library is the _____ place in our school.",
        "opts": [
          "quiet",
          "quieter",
          "quietest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The library is the quietest place in our school.",
        "zh": "图书馆是我们学校最安静的地方。"
      },
      {
        "q": "He is the _____ runner on the playground.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "He is the fastest runner on the playground.",
        "zh": "他是操场上跑得最快的人。"
      },
      {
        "q": "This is _____ most beautiful picture in the museum.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前用 the",
        "sentence": "This is the most beautiful picture in the museum.",
        "zh": "这是博物馆里最漂亮的画。"
      },
      {
        "q": "My brother is the _____ in our family.",
        "opts": [
          "young",
          "younger",
          "youngest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "My brother is the youngest in our family.",
        "zh": "我弟弟是我们家最小的。"
      },
      {
        "q": "The bus is the _____ way to go to school.",
        "opts": [
          "convenient",
          "more convenient",
          "most convenient"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "The bus is the most convenient way to go to school.",
        "zh": "坐公交是上学最方便的方式。"
      },
      {
        "q": "Chengdu is one of the most _____ cities in China.",
        "opts": [
          "liveable",
          "more liveable",
          "liveable"
        ],
        "ans": 0,
        "hint": "one of + 最高级 + 复数名词，这里用原形",
        "sentence": "Chengdu is one of the most liveable cities in China.",
        "zh": "成都是中国最宜居的城市之一。"
      },
      {
        "q": "The cat is the _____ animal in my house.",
        "opts": [
          "cute",
          "cuter",
          "cutest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The cat is the cutest animal in my house.",
        "zh": "猫是我家最可爱的动物。"
      },
      {
        "q": "The piano is the _____ instrument in the music room.",
        "opts": [
          "beautiful",
          "more beautiful",
          "most beautiful"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "The piano is the most beautiful instrument in the music room.",
        "zh": "钢琴是音乐教室里最漂亮的乐器。"
      },
      {
        "q": "My father is the _____ person in my family.",
        "opts": [
          "strong",
          "stronger",
          "strongest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "My father is the strongest person in my family.",
        "zh": "我爸爸是我们家最强壮的人。"
      },
      {
        "q": "The classroom is the _____ room in our school.",
        "opts": [
          "bright",
          "brighter",
          "brightest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The classroom is the brightest room in our school.",
        "zh": "教室是我们学校最明亮的房间。"
      },
      {
        "q": "This is the _____ hotpot I have ever eaten.",
        "opts": [
          "delicious",
          "more delicious",
          "most delicious"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "This is the most delicious hotpot I have ever eaten.",
        "zh": "这是我吃过的最好吃的火锅。"
      },
      {
        "q": "The panda is the _____ famous animal in Sichuan.",
        "opts": [
          "most",
          "more",
          "much"
        ],
        "ans": 0,
        "hint": "famous 的最高级用 most",
        "sentence": "The panda is the most famous animal in Sichuan.",
        "zh": "熊猫是四川最著名的动物。"
      },
      {
        "q": "She is the _____ student in our class.",
        "opts": [
          "careful",
          "more careful",
          "most careful"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "She is the most careful student in our class.",
        "zh": "她是我们班最细心的学生。"
      },
      {
        "q": "The Great Wall is one of the greatest _____ in the world.",
        "opts": [
          "wonder",
          "wonders",
          "wondering"
        ],
        "ans": 1,
        "hint": "one of + 最高级 + 复数名词",
        "sentence": "The Great Wall is one of the greatest wonders in the world.",
        "zh": "长城是世界上最伟大的奇迹之一。"
      },
      {
        "q": "My mother is the best cook _____ our family.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。"
      },
      {
        "q": "This is the cheapest toy _____ the shop.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "This is the cheapest toy in the shop.",
        "zh": "这是商店里最便宜的玩具。"
      },
      {
        "q": "The red apple is the sweetest _____ all.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 1,
        "hint": "范围用 of",
        "sentence": "The red apple is the sweetest of all.",
        "zh": "红苹果是所有苹果中最甜的。"
      },
      {
        "q": "Winter is the coldest season _____ the year.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 1,
        "hint": "范围用 of",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "This is the most interesting book _____ the library.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Tom is the tallest boy _____ our class.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "q": "She is the most careful student _____ our class.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "She is the most careful student in our class.",
        "zh": "她是我们班最细心的学生。"
      },
      {
        "q": "The panda is the most popular animal _____ the zoo.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "The panda is the most popular animal in the zoo.",
        "zh": "熊猫是动物园里最受欢迎的动物。"
      }
    ],
    "id": "p17"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "l05-yalong-beach.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "the tallest",
        "zh": "最高的"
      },
      {
        "en": "the most beautiful",
        "zh": "最美的"
      },
      {
        "en": "one of the most",
        "zh": "最……之一"
      },
      {
        "en": "in our class",
        "zh": "在我们班（范围）"
      },
      {
        "en": "the tallest boy",
        "zh": "最高的男孩"
      },
      {
        "en": "the most beautiful beach",
        "zh": "最美丽的海滩"
      },
      {
        "en": "the biggest panda",
        "zh": "最大的熊猫"
      },
      {
        "en": "the best cook",
        "zh": "最棒的厨师"
      },
      {
        "en": "the quietest place",
        "zh": "最安静的地方"
      },
      {
        "en": "the coldest season",
        "zh": "最冷的季节"
      },
      {
        "en": "the cheapest toy",
        "zh": "最便宜的玩具"
      },
      {
        "en": "the most difficult subject",
        "zh": "最难的科目"
      },
      {
        "en": "the fastest runner",
        "zh": "跑得最快的人"
      },
      {
        "en": "the most popular animal",
        "zh": "最受欢迎的动物"
      }
    ],
    "id": "p18"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l05-yalong-beach.jpg",
    "audio": "Tom is the tallest boy in our class.",
    "opts": [
      "Tom is the tallest boy in our class.",
      "Tom is the taller boy in our class.",
      "Tom is a tall boy in our class."
    ],
    "ans": 0,
    "hint": "注意最高级 the tallest",
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。",
    "questions": [
      {
        "audio": "Tom is the tallest boy in our class.",
        "opts": [
          "Tom is the tallest boy in our class.",
          "Tom is the taller boy in our class.",
          "Tom is a tall boy in our class."
        ],
        "ans": 0,
        "hint": "注意最高级 the tallest",
        "zh": "汤姆是我们班最高的男孩。",
        "sentence": "Tom is the tallest boy in our class."
      },
      {
        "audio": "This is the most interesting book in the library.",
        "opts": [
          "This is the most interesting book in the library.",
          "This is the more interesting book in the library.",
          "This is the most interesting book in the classroom."
        ],
        "ans": 0,
        "hint": "注意 most interesting",
        "zh": "这是图书馆里最有趣的书。",
        "sentence": "This is the most interesting book in the library."
      },
      {
        "audio": "The panda is the most popular animal in the zoo.",
        "opts": [
          "The panda is the most popular animal in the zoo.",
          "The panda is the more popular animal in the zoo.",
          "The panda is the most popular animal in the park."
        ],
        "ans": 0,
        "hint": "注意 most popular",
        "zh": "熊猫是动物园里最受欢迎的动物。",
        "sentence": "The panda is the most popular animal in the zoo."
      },
      {
        "audio": "My mother is the best cook in our family.",
        "opts": [
          "My mother is the best cook in our family.",
          "My mother is the better cook in our family.",
          "My mother is a good cook in our family."
        ],
        "ans": 0,
        "hint": "注意 best",
        "zh": "我妈妈是我们家最棒的厨师。",
        "sentence": "My mother is the best cook in our family."
      },
      {
        "audio": "Winter is the coldest season in Chengdu.",
        "opts": [
          "Winter is the coldest season in Chengdu.",
          "Winter is the colder season in Chengdu.",
          "Winter is the coldest season in Beijing."
        ],
        "ans": 0,
        "hint": "注意 coldest",
        "zh": "冬天是成都最冷的季节。",
        "sentence": "Winter is the coldest season in Chengdu."
      },
      {
        "audio": "He is the fastest runner on the playground.",
        "opts": [
          "He is the fastest runner on the playground.",
          "He is the faster runner on the playground.",
          "He is the fastest runner in the classroom."
        ],
        "ans": 0,
        "hint": "注意 fastest",
        "zh": "他是操场上跑得最快的人。",
        "sentence": "He is the fastest runner on the playground."
      },
      {
        "audio": "This is the most delicious hotpot I have ever eaten.",
        "opts": [
          "This is the most delicious hotpot I have ever eaten.",
          "This is the more delicious hotpot I have ever eaten.",
          "This is the most delicious hotpot I have ever cooked."
        ],
        "ans": 0,
        "hint": "注意 most delicious",
        "zh": "这是我吃过的最好吃的火锅。",
        "sentence": "This is the most delicious hotpot I have ever eaten."
      },
      {
        "audio": "The library is the quietest place in our school.",
        "opts": [
          "The library is the quietest place in our school.",
          "The library is the quieter place in our school.",
          "The library is the quietest place in our classroom."
        ],
        "ans": 0,
        "hint": "注意 quietest",
        "zh": "图书馆是我们学校最安静的地方。",
        "sentence": "The library is the quietest place in our school."
      }
    ],
    "id": "p19"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "l05-yalong-beach.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美丽的海滩之一。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "This is the biggest panda in the zoo.",
        "zh": "这是动物园里最大的熊猫。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The library is the quietest place in our school.",
        "zh": "图书馆是我们学校最安静的地方。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Winter is the coldest season in Chengdu.",
        "zh": "冬天是成都最冷的季节。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "This is the cheapest toy in the shop.",
        "zh": "这是商店里最便宜的玩具。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "I think math is the most difficult subject.",
        "zh": "我认为数学是最难的科目。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The Great Wall is one of the greatest wonders in the world.",
        "zh": "长城是世界上最伟大的奇迹之一。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "She is the most careful student in our class.",
        "zh": "她是我们班最细心的学生。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The panda is the most popular animal in the zoo.",
        "zh": "熊猫是动物园里最受欢迎的动物。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "He is the fastest runner on the playground.",
        "zh": "他是操场上跑得最快的人。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The red apple is the sweetest of all.",
        "zh": "红苹果是所有苹果中最甜的。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "This is the most beautiful picture in the museum.",
        "zh": "这是博物馆里最漂亮的画。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "My brother is the youngest in our family.",
        "zh": "我弟弟是我们家最小的。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The bus is the most convenient way to go to school.",
        "zh": "坐公交是上学最方便的方式。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Chengdu is one of the most liveable cities in China.",
        "zh": "成都是中国最宜居的城市之一。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The panda is the most famous animal in Sichuan.",
        "zh": "熊猫是四川最著名的动物。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "This is the most delicious hotpot I have ever eaten.",
        "zh": "这是我吃过的最好吃的火锅。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The classroom is the brightest room in our school.",
        "zh": "教室是我们学校最明亮的房间。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My father is the strongest person in my family.",
        "zh": "我爸爸是我们家最强壮的人。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The piano is the most beautiful instrument in the music room.",
        "zh": "钢琴是音乐教室里最漂亮的乐器。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The cat is the cutest animal in my house.",
        "zh": "猫是我家最可爱的动物。",
        "tag": "writing_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      }
    ],
    "id": "p20"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "l05-yalong-beach.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The bus is the _____ way to go to school.",
        "opts": [
          "convenient",
          "more convenient",
          "most convenient"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "The bus is the most convenient way to go to school.",
        "zh": "坐公交是上学最方便的方式。"
      },
      {
        "q": "Chengdu is one of the most _____ cities in China.",
        "opts": [
          "liveable",
          "more liveable",
          "liveable"
        ],
        "ans": 0,
        "hint": "one of + 最高级 + 复数名词，这里用原形",
        "sentence": "Chengdu is one of the most liveable cities in China.",
        "zh": "成都是中国最宜居的城市之一。"
      },
      {
        "q": "The cat is the _____ animal in my house.",
        "opts": [
          "cute",
          "cuter",
          "cutest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The cat is the cutest animal in my house.",
        "zh": "猫是我家最可爱的动物。"
      },
      {
        "q": "The piano is the _____ instrument in the music room.",
        "opts": [
          "beautiful",
          "more beautiful",
          "most beautiful"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "The piano is the most beautiful instrument in the music room.",
        "zh": "钢琴是音乐教室里最漂亮的乐器。"
      },
      {
        "q": "My father is the _____ person in my family.",
        "opts": [
          "strong",
          "stronger",
          "strongest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "My father is the strongest person in my family.",
        "zh": "我爸爸是我们家最强壮的人。"
      },
      {
        "q": "The classroom is the _____ room in our school.",
        "opts": [
          "bright",
          "brighter",
          "brightest"
        ],
        "ans": 2,
        "hint": "最高级用 -est",
        "sentence": "The classroom is the brightest room in our school.",
        "zh": "教室是我们学校最明亮的房间。"
      },
      {
        "q": "This is the _____ hotpot I have ever eaten.",
        "opts": [
          "delicious",
          "more delicious",
          "most delicious"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "This is the most delicious hotpot I have ever eaten.",
        "zh": "这是我吃过的最好吃的火锅。"
      },
      {
        "q": "The panda is the _____ famous animal in Sichuan.",
        "opts": [
          "most",
          "more",
          "much"
        ],
        "ans": 0,
        "hint": "famous 的最高级用 most",
        "sentence": "The panda is the most famous animal in Sichuan.",
        "zh": "熊猫是四川最著名的动物。"
      },
      {
        "q": "She is the _____ student in our class.",
        "opts": [
          "careful",
          "more careful",
          "most careful"
        ],
        "ans": 2,
        "hint": "多音节用 most",
        "sentence": "She is the most careful student in our class.",
        "zh": "她是我们班最细心的学生。"
      },
      {
        "q": "The Great Wall is one of the greatest _____ in the world.",
        "opts": [
          "wonder",
          "wonders",
          "wondering"
        ],
        "ans": 1,
        "hint": "one of + 最高级 + 复数名词",
        "sentence": "The Great Wall is one of the greatest wonders in the world.",
        "zh": "长城是世界上最伟大的奇迹之一。"
      },
      {
        "q": "My mother is the best cook _____ our family.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "My mother is the best cook in our family.",
        "zh": "我妈妈是我们家最棒的厨师。"
      },
      {
        "q": "This is the cheapest toy _____ the shop.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "This is the cheapest toy in the shop.",
        "zh": "这是商店里最便宜的玩具。"
      },
      {
        "q": "The red apple is the sweetest _____ all.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 1,
        "hint": "范围用 of",
        "sentence": "The red apple is the sweetest of all.",
        "zh": "红苹果是所有苹果中最甜的。"
      },
      {
        "q": "Winter is the coldest season _____ the year.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 1,
        "hint": "范围用 of",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "This is the most interesting book _____ the library.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Tom is the tallest boy _____ our class.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "q": "She is the most careful student _____ our class.",
        "opts": [
          "in",
          "of",
          "at"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "She is the most careful student in our class.",
        "zh": "她是我们班最细心的学生。"
      },
      {
        "q": "The panda is the most popular animal _____ the zoo.",
        "opts": [
          "in",
          "of",
          "on"
        ],
        "ans": 0,
        "hint": "范围用 in",
        "sentence": "The panda is the most popular animal in the zoo.",
        "zh": "熊猫是动物园里最受欢迎的动物。"
      }
    ],
    "id": "p21"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "l05-writing-frame.jpg",
    "checklist": [
      "范围内「最」：the + 最高级 + in/of + 范围",
      "……中最……之一：one of the most + 形容词 + 复数名词",
      "写作：Chengdu is one of the most liveable cities in China.",
      "比较两者仍用比较级 + than，不要混用",
      "one of the most 后面必须是复数名词。",
      "两者比较仍用比较级 + than，不要混用最高级。"
    ],
    "chant": "In a group, use the -est! One of the most + plural — that's the best!",
    "chantSpeak": "In a group, use the est! One of the most plus plural, that is the best!",
    "id": "p22"
  }
];
  global.KpData = {
    courseTitle: "最高级 · the + -est",
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