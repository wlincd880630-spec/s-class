(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 昨天去买可乐",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "Bob went to buy three bottles of cola.",
    "soundHint": "事情发生在什么时候？动词有什么变化？",
    "question": "go 和 buy 变成了什么？",
    "sentence": "Bob went to buy three bottles of cola.",
    "zh": "鲍勃去买三瓶可乐。",
    "image": "kpp-bob-cola.jpg",
    "source": "PSLE Set 01 · 完形"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 为什么不加 -ed？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "kpp-bob-cola.jpg",
    "question": "为什么不说 goed 和 buyed？",
    "choices": [
      {
        "text": "因为拼写错误",
        "correct": false,
        "fb": "不是错误，是不规则动词有特殊过去式。"
      },
      {
        "text": "go 和 buy 是不规则动词，过去式要单独记",
        "correct": true,
        "fb": "对了！went, bought 是不规则变化。"
      },
      {
        "text": "因为 cola 是不可数名词",
        "correct": false,
        "fb": "与 cola 无关，是动词过去式问题。"
      }
    ],
    "sentence": "Bob went to buy three bottles of cola.",
    "zh": "鲍勃去买三瓶可乐。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "kpp-bob-cola.jpg",
    "lead": "不规则动词不能加 -ed，要单独记过去式。",
    "formula": "yesterday / last… → 过去式（go→went）",
    "parts": [
      {
        "mark": "肯定",
        "label": "不规则过去式",
        "example": "went / bought / saw"
      },
      {
        "mark": "否定",
        "label": "didn't + 原形",
        "example": "didn't go"
      },
      {
        "mark": "疑问",
        "label": "Did + 原形",
        "example": "Did you go?"
      }
    ],
    "samples": [
      {
        "sentence": "Bob went to buy three bottles of cola.",
        "zh": "鲍勃去买了三瓶可乐。"
      },
      {
        "sentence": "We saw a film yesterday evening.",
        "zh": "昨天晚上我们看了一部电影。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · 规则 vs 不规则",
    "type": "discover",
    "lead": "played 加 -ed，went 却整词变化。",
    "leftImage": "kpp-played.jpg",
    "rightImage": "kpp-went.jpg",
    "leftLabel": "play → played（规则）",
    "rightLabel": "go → went（不规则）",
    "leftSentence": "We played football yesterday.",
    "leftZh": "我们昨天踢了足球。",
    "rightSentence": "Bob went shopping yesterday.",
    "rightZh": "鲍勃昨天去购物了。",
    "morphBase": "go",
    "morphPast": "went",
    "morphHighlight": "ent",
    "discovery": "规则动词加 -ed；不规则动词过去式要背诵：go→went, buy→bought。"
  },
  {
    "section": "精讲",
    "title": "例句 · went",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kpp-bob-cola.jpg",
    "lead": "go → went，不是 goed。",
    "sentence": "Bob went to buy three bottles of cola.",
    "zh": "鲍勃去买了三瓶可乐。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · saw",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kpp-bob-cola.jpg",
    "lead": "see → saw。",
    "sentence": "We saw a film yesterday evening.",
    "zh": "昨天晚上我们看了一部电影。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "例句 · 昨天做了什么",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "一般过去时表示过去发生的动作，常用 yesterday, last week 等时间词。",
    "sentence": "I went to the zoo with my parents last Sunday.",
    "zh": "上周日我和父母去了动物园。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "例句 · 否定和疑问",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "否定句用 didn't + 动词原形，疑问句用 Did + 主语 + 动词原形。",
    "sentence": "She didn't eat breakfast this morning.",
    "zh": "她今天早上没吃早餐。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
    "section": "精讲",
    "title": "动词卡 · 小升初高频不规则",
    "type": "spelling",
    "image": "kpp-verb-chart.jpg",
    "lead": "分组记忆，每天背一组。",
    "rules": [
      {
        "tab": "出行/买",
        "rule": "go→went · come→came · buy→bought · take→took",
        "focusVerb": "went",
        "examples": [
          {
            "from": "go",
            "to": "went"
          },
          {
            "from": "buy",
            "to": "bought"
          },
          {
            "from": "take",
            "to": "took"
          }
        ],
        "sample": "Bob went to buy three bottles of cola.",
        "sampleZh": "鲍勃去买三瓶可乐。"
      },
      {
        "tab": "看/想/说",
        "rule": "see→saw · think→thought · say→said · tell→told",
        "focusVerb": "thought",
        "examples": [
          {
            "from": "see",
            "to": "saw"
          },
          {
            "from": "think",
            "to": "thought"
          },
          {
            "from": "say",
            "to": "said"
          }
        ],
        "sample": "She thought about the problem carefully.",
        "sampleZh": "她仔细思考了这个问题。"
      },
      {
        "tab": "吃/写/做",
        "rule": "eat→ate · write→wrote · make→made · have→had",
        "focusVerb": "picked",
        "examples": [
          {
            "from": "eat",
            "to": "ate"
          },
          {
            "from": "write",
            "to": "wrote"
          },
          {
            "from": "have",
            "to": "had"
          }
        ],
        "sample": "He picked tomatoes on the farm last weekend.",
        "sampleZh": "上周末他在农场摘西红柿。"
      }
    ]
  },
  {
    "id": "p10",
    "section": "辨析",
    "title": "分类篮 · 规则还是不规则？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "kpp-classify.jpg",
    "lead": "这些过去式是加 -ed 还是不规则？",
    "buckets": [
      {
        "key": "regular",
        "label": "规则 -ed"
      },
      {
        "key": "irregular",
        "label": "不规则"
      }
    ],
    "items": [
      {
        "text": "played",
        "bucket": "regular"
      },
      {
        "text": "went",
        "bucket": "irregular"
      },
      {
        "text": "watched",
        "bucket": "regular"
      },
      {
        "text": "bought",
        "bucket": "irregular"
      },
      {
        "text": "walked",
        "bucket": "regular"
      },
      {
        "text": "thought",
        "bucket": "irregular"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "kpp-bob-cola.jpg",
    "question": "「I didn't went to school yesterday.」错在哪？",
    "choices": [
      {
        "text": "didn't 后面必须用原形 go",
        "correct": true,
        "fb": "Did/didn't 后永远是原形。"
      },
      {
        "text": "yesterday 要改成 tomorrow",
        "correct": false,
        "fb": "yesterday 正是过去标志。"
      },
      {
        "text": "要用 goes",
        "correct": false,
        "fb": "这是过去时。"
      }
    ],
    "sentence": "I didn't go to school yesterday.",
    "zh": "我昨天没去上学。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "kpp-bob-cola.jpg",
    "lead": "不规则动词：否定和疑问都回到原形。",
    "items": [
      {
        "from": "She bought a gift last Sunday.",
        "fromZh": "她上周日买了一份礼物。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "She didn't buy a gift last Sunday.",
              "She didn't bought a gift last Sunday.",
              "She doesn't buy a gift last Sunday."
            ],
            "ans": 0,
            "hint": "didn't + buy（原形）。",
            "sentence": "She didn't buy a gift last Sunday.",
            "zh": "她上周日没买礼物。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Did she buy a gift last Sunday?",
              "Did she bought a gift last Sunday?",
              "Does she buy a gift last Sunday?"
            ],
            "ans": 0,
            "hint": "Did + 原形 buy。",
            "sentence": "Did she buy a gift last Sunday?",
            "zh": "她上周日买礼物了吗？"
          }
        ]
      },
      {
        "from": "I went to school yesterday.",
        "fromZh": "我昨天去了学校。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "I didn't go to school yesterday.",
              "I didn't went to school yesterday.",
              "I not went to school yesterday."
            ],
            "ans": 0,
            "hint": "否定用 didn't + 动词原形",
            "sentence": "I didn't go to school yesterday.",
            "zh": "我昨天没去学校。"
          }
        ]
      },
      {
        "from": "She ate an apple.",
        "fromZh": "她吃了一个苹果。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Did she eat an apple?",
              "Did she ate an apple?",
              "She did eat an apple?"
            ],
            "ans": 0,
            "hint": "疑问句用 Did + 主语 + 原形",
            "sentence": "Did she eat an apple?",
            "zh": "她吃了一个苹果吗？"
          }
        ]
      },
      {
        "from": "We saw a film last night.",
        "fromZh": "我们昨晚看了一部电影。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "We didn't see a film last night.",
              "We didn't saw a film last night.",
              "We not saw a film last night."
            ],
            "ans": 0,
            "hint": "否定用 didn't + 原形",
            "sentence": "We didn't see a film last night.",
            "zh": "我们昨晚没看电影。"
          }
        ]
      },
      {
        "from": "He came to school by bus.",
        "fromZh": "他坐公交车来学校。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Did he come to school by bus?",
              "Did he came to school by bus?",
              "He did come to school by bus?"
            ],
            "ans": 0,
            "hint": "疑问句用 Did + 原形",
            "sentence": "Did he come to school by bus?",
            "zh": "他坐公交车来学校吗？"
          }
        ]
      },
      {
        "from": "They had a picnic.",
        "fromZh": "他们野餐了。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "They didn't have a picnic.",
              "They didn't had a picnic.",
              "They not had a picnic."
            ],
            "ans": 0,
            "hint": "否定用 didn't + 原形",
            "sentence": "They didn't have a picnic.",
            "zh": "他们没有野餐。"
          }
        ]
      },
      {
        "from": "I bought a new umbrella.",
        "fromZh": "我买了一把新伞。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Did you buy a new umbrella?",
              "Did you bought a new umbrella?",
              "You did buy a new umbrella?"
            ],
            "ans": 0,
            "hint": "疑问句用 Did + 原形",
            "sentence": "Did you buy a new umbrella?",
            "zh": "你买了一把新伞吗？"
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
    "image": "kp3d-library.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "went",
      "to",
      "the",
      "library",
      "yesterday"
    ],
    "sentence": "I went to the library yesterday.",
    "zh": "我昨天去了图书馆。",
    "items": [
      {
        "tokens": [
          "I",
          "went",
          "to",
          "the",
          "library",
          "yesterday"
        ],
        "sentence": "I went to the library yesterday.",
        "zh": "我昨天去了图书馆。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "She",
          "bought",
          "a",
          "new",
          "dress",
          "in",
          "the",
          "shop"
        ],
        "sentence": "She bought a new dress in the shop.",
        "zh": "她在商店买了一条新裙子。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "We",
          "saw",
          "a",
          "panda",
          "at",
          "the",
          "zoo"
        ],
        "sentence": "We saw a panda at the zoo.",
        "zh": "我们在动物园看到一只熊猫。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "He",
          "ate",
          "dinner",
          "with",
          "his",
          "family"
        ],
        "sentence": "He ate dinner with his family.",
        "zh": "他和家人一起吃了晚餐。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "They",
          "played",
          "basketball",
          "in",
          "the",
          "playground"
        ],
        "sentence": "They played basketball in the playground.",
        "zh": "他们在操场打篮球。",
        "image": "kp3d-basketball.png"
      },
      {
        "tokens": [
          "The",
          "doctor",
          "came",
          "to",
          "help",
          "the",
          "sick",
          "boy"
        ],
        "sentence": "The doctor came to help the sick boy.",
        "zh": "医生来帮助生病的男孩。",
        "image": "kp3d-doctor.png"
      }
    ],
    "id": "p13"
  },
  {
    "id": "p14",
    "section": "操练",
    "title": "听音排序 · 不规则过去式句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "kpp-see-film.jpg",
    "audio": "We saw a film yesterday evening.",
    "tokens": [
      "We",
      "saw",
      "a",
      "film",
      "yesterday",
      "evening"
    ],
    "sentence": "We saw a film yesterday evening.",
    "zh": "我们昨晚看了一部电影。"
  },
  {
    "id": "p15",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "kpp-pick-tomatoes.jpg",
    "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
    "opts": [
      "pick",
      "picked",
      "picking"
    ],
    "ans": 1,
    "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
    "sentence": "He picked tomatoes on the farm last weekend.",
    "zh": "上周末他在农场摘西红柿。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "kpp-bob-cola.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
        "opts": [
          "pick",
          "picked",
          "picking"
        ],
        "ans": 1,
        "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
        "sentence": "He picked tomatoes on the farm last weekend.",
        "zh": "上周末他在农场摘西红柿。"
      },
      {
        "q": "He _____ home late last night. (get)",
        "opts": [
          "get",
          "got",
          "gotten"
        ],
        "ans": 1,
        "hint": "get → got。",
        "sentence": "He got home late last night.",
        "zh": "他昨晚很晚到家。"
      },
      {
        "q": "I _____ my keys yesterday. (lose)",
        "opts": [
          "lose",
          "lost",
          "losed"
        ],
        "ans": 1,
        "hint": "lose → lost。",
        "sentence": "I lost my keys yesterday.",
        "zh": "我昨天丢了钥匙。"
      },
      {
        "q": "_____ you see the panda?",
        "opts": [
          "Do",
          "Did",
          "Does"
        ],
        "ans": 1,
        "hint": "过去疑问 Did。",
        "sentence": "Did you see the panda?",
        "zh": "你看见熊猫了吗？"
      },
      {
        "q": "They _____ to Chengdu by train. (go)",
        "opts": [
          "goed",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "go → went。",
        "sentence": "They went to Chengdu by train.",
        "zh": "他们坐火车去了成都。"
      },
      {
        "q": "She _____ a letter to her friend. (write)",
        "opts": [
          "write",
          "wrote",
          "written"
        ],
        "ans": 1,
        "hint": "write → wrote。",
        "sentence": "She wrote a letter to her friend.",
        "zh": "她给朋友写了一封信。"
      },
      {
        "q": "Yesterday I _____ to the park.",
        "opts": [
          "go",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "yesterday 表示过去，用过去式",
        "sentence": "Yesterday I went to the park.",
        "zh": "昨天我去了公园。"
      },
      {
        "q": "She _____ a new bike last week.",
        "opts": [
          "buy",
          "bought",
          "buys"
        ],
        "ans": 1,
        "hint": "last week 过去时间，buy 的过去式是 bought",
        "sentence": "She bought a new bike last week.",
        "zh": "她上周买了一辆新自行车。"
      },
      {
        "q": "We _____ a film last night.",
        "opts": [
          "see",
          "saw",
          "seen"
        ],
        "ans": 1,
        "hint": "see 的过去式是 saw",
        "sentence": "We saw a film last night.",
        "zh": "我们昨晚看了一部电影。"
      },
      {
        "q": "He _____ an apple after lunch.",
        "opts": [
          "eat",
          "eats",
          "ate"
        ],
        "ans": 2,
        "hint": "eat 的过去式是 ate",
        "sentence": "He ate an apple after lunch.",
        "zh": "他午饭后吃了一个苹果。"
      },
      {
        "q": "They _____ to school by bus this morning.",
        "opts": [
          "come",
          "came",
          "comes"
        ],
        "ans": 1,
        "hint": "come 的过去式是 came",
        "sentence": "They came to school by bus this morning.",
        "zh": "他们今天早上坐公交车来学校。"
      },
      {
        "q": "I _____ a letter to my friend yesterday.",
        "opts": [
          "write",
          "wrote",
          "writes"
        ],
        "ans": 1,
        "hint": "write 的过去式是 wrote",
        "sentence": "I wrote a letter to my friend yesterday.",
        "zh": "我昨天给朋友写了一封信。"
      },
      {
        "q": "She _____ me a present for my birthday.",
        "opts": [
          "give",
          "gives",
          "gave"
        ],
        "ans": 2,
        "hint": "give 的过去式是 gave",
        "sentence": "She gave me a present for my birthday.",
        "zh": "她送给我一份生日礼物。"
      },
      {
        "q": "We _____ a good time at the party.",
        "opts": [
          "have",
          "has",
          "had"
        ],
        "ans": 2,
        "hint": "have 的过去式是 had",
        "sentence": "We had a good time at the party.",
        "zh": "我们在聚会上玩得很开心。"
      },
      {
        "q": "He _____ his homework before dinner.",
        "opts": [
          "do",
          "did",
          "does"
        ],
        "ans": 1,
        "hint": "do 的过去式是 did",
        "sentence": "He did his homework before dinner.",
        "zh": "他晚饭前做了作业。"
      },
      {
        "q": "I _____ my keys at home.",
        "opts": [
          "forget",
          "forgot",
          "forgets"
        ],
        "ans": 1,
        "hint": "forget 的过去式是 forgot",
        "sentence": "I forgot my keys at home.",
        "zh": "我把钥匙忘在家里了。"
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
        "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
        "opts": [
          "pick",
          "picked",
          "picking"
        ],
        "ans": 1,
        "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
        "sentence": "He picked tomatoes on the farm last weekend.",
        "zh": "上周末他在农场摘西红柿。"
      },
      {
        "q": "He _____ home late last night. (get)",
        "opts": [
          "get",
          "got",
          "gotten"
        ],
        "ans": 1,
        "hint": "get → got。",
        "sentence": "He got home late last night.",
        "zh": "他昨晚很晚到家。"
      },
      {
        "q": "I _____ my keys yesterday. (lose)",
        "opts": [
          "lose",
          "lost",
          "losed"
        ],
        "ans": 1,
        "hint": "lose → lost。",
        "sentence": "I lost my keys yesterday.",
        "zh": "我昨天丢了钥匙。"
      },
      {
        "q": "_____ you see the panda?",
        "opts": [
          "Do",
          "Did",
          "Does"
        ],
        "ans": 1,
        "hint": "过去疑问 Did。",
        "sentence": "Did you see the panda?",
        "zh": "你看见熊猫了吗？"
      },
      {
        "q": "They _____ to Chengdu by train. (go)",
        "opts": [
          "goed",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "go → went。",
        "sentence": "They went to Chengdu by train.",
        "zh": "他们坐火车去了成都。"
      },
      {
        "q": "She _____ a letter to her friend. (write)",
        "opts": [
          "write",
          "wrote",
          "written"
        ],
        "ans": 1,
        "hint": "write → wrote。",
        "sentence": "She wrote a letter to her friend.",
        "zh": "她给朋友写了一封信。"
      },
      {
        "q": "Yesterday I _____ to the park.",
        "opts": [
          "go",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "yesterday 表示过去，用过去式",
        "sentence": "Yesterday I went to the park.",
        "zh": "昨天我去了公园。"
      },
      {
        "q": "She _____ a new bike last week.",
        "opts": [
          "buy",
          "bought",
          "buys"
        ],
        "ans": 1,
        "hint": "last week 过去时间，buy 的过去式是 bought",
        "sentence": "She bought a new bike last week.",
        "zh": "她上周买了一辆新自行车。"
      },
      {
        "q": "We _____ a film last night.",
        "opts": [
          "see",
          "saw",
          "seen"
        ],
        "ans": 1,
        "hint": "see 的过去式是 saw",
        "sentence": "We saw a film last night.",
        "zh": "我们昨晚看了一部电影。"
      },
      {
        "q": "He _____ an apple after lunch.",
        "opts": [
          "eat",
          "eats",
          "ate"
        ],
        "ans": 2,
        "hint": "eat 的过去式是 ate",
        "sentence": "He ate an apple after lunch.",
        "zh": "他午饭后吃了一个苹果。"
      },
      {
        "q": "They _____ to school by bus this morning.",
        "opts": [
          "come",
          "came",
          "comes"
        ],
        "ans": 1,
        "hint": "come 的过去式是 came",
        "sentence": "They came to school by bus this morning.",
        "zh": "他们今天早上坐公交车来学校。"
      },
      {
        "q": "I _____ a letter to my friend yesterday.",
        "opts": [
          "write",
          "wrote",
          "writes"
        ],
        "ans": 1,
        "hint": "write 的过去式是 wrote",
        "sentence": "I wrote a letter to my friend yesterday.",
        "zh": "我昨天给朋友写了一封信。"
      },
      {
        "q": "She _____ me a present for my birthday.",
        "opts": [
          "give",
          "gives",
          "gave"
        ],
        "ans": 2,
        "hint": "give 的过去式是 gave",
        "sentence": "She gave me a present for my birthday.",
        "zh": "她送给我一份生日礼物。"
      },
      {
        "q": "We _____ a good time at the party.",
        "opts": [
          "have",
          "has",
          "had"
        ],
        "ans": 2,
        "hint": "have 的过去式是 had",
        "sentence": "We had a good time at the party.",
        "zh": "我们在聚会上玩得很开心。"
      },
      {
        "q": "He _____ his homework before dinner.",
        "opts": [
          "do",
          "did",
          "does"
        ],
        "ans": 1,
        "hint": "do 的过去式是 did",
        "sentence": "He did his homework before dinner.",
        "zh": "他晚饭前做了作业。"
      },
      {
        "q": "I _____ my keys at home.",
        "opts": [
          "forget",
          "forgot",
          "forgets"
        ],
        "ans": 1,
        "hint": "forget 的过去式是 forgot",
        "sentence": "I forgot my keys at home.",
        "zh": "我把钥匙忘在家里了。"
      },
      {
        "q": "She _____ a beautiful song at the concert.",
        "opts": [
          "sing",
          "sang",
          "sings"
        ],
        "ans": 1,
        "hint": "sing 的过去式是 sang",
        "sentence": "She sang a beautiful song at the concert.",
        "zh": "她在音乐会上唱了一首动听的歌。"
      },
      {
        "q": "They _____ to the library after school.",
        "opts": [
          "go",
          "went",
          "goes"
        ],
        "ans": 1,
        "hint": "after school 过去时间，用 went",
        "sentence": "They went to the library after school.",
        "zh": "他们放学后去了图书馆。"
      },
      {
        "q": "The cat _____ on the chair.",
        "opts": [
          "sleep",
          "slept",
          "sleeps"
        ],
        "ans": 1,
        "hint": "sleep 的过去式是 slept",
        "sentence": "The cat slept on the chair.",
        "zh": "猫在椅子上睡觉了。"
      },
      {
        "q": "We _____ a panda at the zoo.",
        "opts": [
          "see",
          "saw",
          "seen"
        ],
        "ans": 1,
        "hint": "see 的过去式是 saw",
        "sentence": "We saw a panda at the zoo.",
        "zh": "我们在动物园看到一只熊猫。"
      },
      {
        "q": "He _____ a glass of milk.",
        "opts": [
          "drink",
          "drank",
          "drinks"
        ],
        "ans": 1,
        "hint": "drink 的过去式是 drank",
        "sentence": "He drank a glass of milk.",
        "zh": "他喝了一杯牛奶。"
      },
      {
        "q": "I _____ a book about animals.",
        "opts": [
          "read",
          "readed",
          "reads"
        ],
        "ans": 0,
        "hint": "read 的过去式还是 read，但发音不同",
        "sentence": "I read a book about animals.",
        "zh": "我读了一本关于动物的书。"
      },
      {
        "q": "She _____ to the music last night.",
        "opts": [
          "listen",
          "listened",
          "listens"
        ],
        "ans": 1,
        "hint": "listen 是规则动词，加 ed",
        "sentence": "She listened to the music last night.",
        "zh": "她昨晚听了音乐。"
      },
      {
        "q": "They _____ a new house last year.",
        "opts": [
          "build",
          "built",
          "builds"
        ],
        "ans": 1,
        "hint": "build 的过去式是 built",
        "sentence": "They built a new house last year.",
        "zh": "他们去年建了一座新房子。"
      },
      {
        "q": "He _____ his bike to school.",
        "opts": [
          "ride",
          "rode",
          "rides"
        ],
        "ans": 1,
        "hint": "ride 的过去式是 rode",
        "sentence": "He rode his bike to school.",
        "zh": "他骑自行车去学校。"
      },
      {
        "q": "We _____ a lot of fun at the playground.",
        "opts": [
          "have",
          "had",
          "has"
        ],
        "ans": 1,
        "hint": "have 的过去式是 had",
        "sentence": "We had a lot of fun at the playground.",
        "zh": "我们在操场上玩得很开心。"
      },
      {
        "q": "I _____ my friend at the bus stop.",
        "opts": [
          "meet",
          "met",
          "meets"
        ],
        "ans": 1,
        "hint": "meet 的过去式是 met",
        "sentence": "I met my friend at the bus stop.",
        "zh": "我在公交车站遇到了我的朋友。"
      },
      {
        "q": "She _____ a red dress in the shop.",
        "opts": [
          "choose",
          "chose",
          "chooses"
        ],
        "ans": 1,
        "hint": "choose 的过去式是 chose",
        "sentence": "She chose a red dress in the shop.",
        "zh": "她在商店里选了一条红裙子。"
      },
      {
        "q": "The doctor _____ to the hospital early.",
        "opts": [
          "come",
          "came",
          "comes"
        ],
        "ans": 1,
        "hint": "come 的过去式是 came",
        "sentence": "The doctor came to the hospital early.",
        "zh": "医生很早就来到医院。"
      },
      {
        "q": "We _____ hot pot for dinner.",
        "opts": [
          "eat",
          "ate",
          "eats"
        ],
        "ans": 1,
        "hint": "eat 的过去式是 ate",
        "sentence": "We ate hot pot for dinner.",
        "zh": "我们晚餐吃了火锅。"
      },
      {
        "q": "He _____ a picture of the panda.",
        "opts": [
          "take",
          "took",
          "takes"
        ],
        "ans": 1,
        "hint": "take 的过去式是 took",
        "sentence": "He took a picture of the panda.",
        "zh": "他拍了一张熊猫的照片。"
      },
      {
        "q": "I _____ a cold last week.",
        "opts": [
          "catch",
          "caught",
          "catches"
        ],
        "ans": 1,
        "hint": "catch 的过去式是 caught",
        "sentence": "I caught a cold last week.",
        "zh": "我上周感冒了。"
      },
      {
        "q": "She _____ a kite with her brother.",
        "opts": [
          "fly",
          "flew",
          "flies"
        ],
        "ans": 1,
        "hint": "fly 的过去式是 flew",
        "sentence": "She flew a kite with her brother.",
        "zh": "她和哥哥一起放风筝。"
      },
      {
        "q": "They _____ TV after dinner.",
        "opts": [
          "watch",
          "watched",
          "watches"
        ],
        "ans": 1,
        "hint": "watch 是规则动词，加 ed",
        "sentence": "They watched TV after dinner.",
        "zh": "他们晚饭后看了电视。"
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
        "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
        "opts": [
          "pick",
          "picked",
          "picking"
        ],
        "ans": 1,
        "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
        "sentence": "He picked tomatoes on the farm last weekend.",
        "zh": "上周末他在农场摘西红柿。"
      },
      {
        "q": "He _____ home late last night. (get)",
        "opts": [
          "get",
          "got",
          "gotten"
        ],
        "ans": 1,
        "hint": "get → got。",
        "sentence": "He got home late last night.",
        "zh": "他昨晚很晚到家。"
      },
      {
        "q": "I _____ my keys yesterday. (lose)",
        "opts": [
          "lose",
          "lost",
          "losed"
        ],
        "ans": 1,
        "hint": "lose → lost。",
        "sentence": "I lost my keys yesterday.",
        "zh": "我昨天丢了钥匙。"
      },
      {
        "q": "_____ you see the panda?",
        "opts": [
          "Do",
          "Did",
          "Does"
        ],
        "ans": 1,
        "hint": "过去疑问 Did。",
        "sentence": "Did you see the panda?",
        "zh": "你看见熊猫了吗？"
      },
      {
        "q": "They _____ to Chengdu by train. (go)",
        "opts": [
          "goed",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "go → went。",
        "sentence": "They went to Chengdu by train.",
        "zh": "他们坐火车去了成都。"
      },
      {
        "q": "She _____ a letter to her friend. (write)",
        "opts": [
          "write",
          "wrote",
          "written"
        ],
        "ans": 1,
        "hint": "write → wrote。",
        "sentence": "She wrote a letter to her friend.",
        "zh": "她给朋友写了一封信。"
      },
      {
        "q": "Yesterday I _____ to the park.",
        "opts": [
          "go",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "yesterday 表示过去，用过去式",
        "sentence": "Yesterday I went to the park.",
        "zh": "昨天我去了公园。"
      },
      {
        "q": "She _____ a new bike last week.",
        "opts": [
          "buy",
          "bought",
          "buys"
        ],
        "ans": 1,
        "hint": "last week 过去时间，buy 的过去式是 bought",
        "sentence": "She bought a new bike last week.",
        "zh": "她上周买了一辆新自行车。"
      },
      {
        "q": "We _____ a film last night.",
        "opts": [
          "see",
          "saw",
          "seen"
        ],
        "ans": 1,
        "hint": "see 的过去式是 saw",
        "sentence": "We saw a film last night.",
        "zh": "我们昨晚看了一部电影。"
      },
      {
        "q": "He _____ an apple after lunch.",
        "opts": [
          "eat",
          "eats",
          "ate"
        ],
        "ans": 2,
        "hint": "eat 的过去式是 ate",
        "sentence": "He ate an apple after lunch.",
        "zh": "他午饭后吃了一个苹果。"
      },
      {
        "q": "They _____ to school by bus this morning.",
        "opts": [
          "come",
          "came",
          "comes"
        ],
        "ans": 1,
        "hint": "come 的过去式是 came",
        "sentence": "They came to school by bus this morning.",
        "zh": "他们今天早上坐公交车来学校。"
      },
      {
        "q": "I _____ a letter to my friend yesterday.",
        "opts": [
          "write",
          "wrote",
          "writes"
        ],
        "ans": 1,
        "hint": "write 的过去式是 wrote",
        "sentence": "I wrote a letter to my friend yesterday.",
        "zh": "我昨天给朋友写了一封信。"
      },
      {
        "q": "She _____ me a present for my birthday.",
        "opts": [
          "give",
          "gives",
          "gave"
        ],
        "ans": 2,
        "hint": "give 的过去式是 gave",
        "sentence": "She gave me a present for my birthday.",
        "zh": "她送给我一份生日礼物。"
      },
      {
        "q": "We _____ a good time at the party.",
        "opts": [
          "have",
          "has",
          "had"
        ],
        "ans": 2,
        "hint": "have 的过去式是 had",
        "sentence": "We had a good time at the party.",
        "zh": "我们在聚会上玩得很开心。"
      },
      {
        "q": "He _____ his homework before dinner.",
        "opts": [
          "do",
          "did",
          "does"
        ],
        "ans": 1,
        "hint": "do 的过去式是 did",
        "sentence": "He did his homework before dinner.",
        "zh": "他晚饭前做了作业。"
      },
      {
        "q": "I _____ my keys at home.",
        "opts": [
          "forget",
          "forgot",
          "forgets"
        ],
        "ans": 1,
        "hint": "forget 的过去式是 forgot",
        "sentence": "I forgot my keys at home.",
        "zh": "我把钥匙忘在家里了。"
      },
      {
        "q": "She _____ a beautiful song at the concert.",
        "opts": [
          "sing",
          "sang",
          "sings"
        ],
        "ans": 1,
        "hint": "sing 的过去式是 sang",
        "sentence": "She sang a beautiful song at the concert.",
        "zh": "她在音乐会上唱了一首动听的歌。"
      },
      {
        "q": "They _____ to the library after school.",
        "opts": [
          "go",
          "went",
          "goes"
        ],
        "ans": 1,
        "hint": "after school 过去时间，用 went",
        "sentence": "They went to the library after school.",
        "zh": "他们放学后去了图书馆。"
      },
      {
        "q": "The cat _____ on the chair.",
        "opts": [
          "sleep",
          "slept",
          "sleeps"
        ],
        "ans": 1,
        "hint": "sleep 的过去式是 slept",
        "sentence": "The cat slept on the chair.",
        "zh": "猫在椅子上睡觉了。"
      },
      {
        "q": "We _____ a panda at the zoo.",
        "opts": [
          "see",
          "saw",
          "seen"
        ],
        "ans": 1,
        "hint": "see 的过去式是 saw",
        "sentence": "We saw a panda at the zoo.",
        "zh": "我们在动物园看到一只熊猫。"
      },
      {
        "q": "He _____ a glass of milk.",
        "opts": [
          "drink",
          "drank",
          "drinks"
        ],
        "ans": 1,
        "hint": "drink 的过去式是 drank",
        "sentence": "He drank a glass of milk.",
        "zh": "他喝了一杯牛奶。"
      },
      {
        "q": "I _____ a book about animals.",
        "opts": [
          "read",
          "readed",
          "reads"
        ],
        "ans": 0,
        "hint": "read 的过去式还是 read，但发音不同",
        "sentence": "I read a book about animals.",
        "zh": "我读了一本关于动物的书。"
      },
      {
        "q": "She _____ to the music last night.",
        "opts": [
          "listen",
          "listened",
          "listens"
        ],
        "ans": 1,
        "hint": "listen 是规则动词，加 ed",
        "sentence": "She listened to the music last night.",
        "zh": "她昨晚听了音乐。"
      },
      {
        "q": "They _____ a new house last year.",
        "opts": [
          "build",
          "built",
          "builds"
        ],
        "ans": 1,
        "hint": "build 的过去式是 built",
        "sentence": "They built a new house last year.",
        "zh": "他们去年建了一座新房子。"
      },
      {
        "q": "He _____ his bike to school.",
        "opts": [
          "ride",
          "rode",
          "rides"
        ],
        "ans": 1,
        "hint": "ride 的过去式是 rode",
        "sentence": "He rode his bike to school.",
        "zh": "他骑自行车去学校。"
      },
      {
        "q": "We _____ a lot of fun at the playground.",
        "opts": [
          "have",
          "had",
          "has"
        ],
        "ans": 1,
        "hint": "have 的过去式是 had",
        "sentence": "We had a lot of fun at the playground.",
        "zh": "我们在操场上玩得很开心。"
      },
      {
        "q": "I _____ my friend at the bus stop.",
        "opts": [
          "meet",
          "met",
          "meets"
        ],
        "ans": 1,
        "hint": "meet 的过去式是 met",
        "sentence": "I met my friend at the bus stop.",
        "zh": "我在公交车站遇到了我的朋友。"
      },
      {
        "q": "She _____ a red dress in the shop.",
        "opts": [
          "choose",
          "chose",
          "chooses"
        ],
        "ans": 1,
        "hint": "choose 的过去式是 chose",
        "sentence": "She chose a red dress in the shop.",
        "zh": "她在商店里选了一条红裙子。"
      },
      {
        "q": "The doctor _____ to the hospital early.",
        "opts": [
          "come",
          "came",
          "comes"
        ],
        "ans": 1,
        "hint": "come 的过去式是 came",
        "sentence": "The doctor came to the hospital early.",
        "zh": "医生很早就来到医院。"
      },
      {
        "q": "We _____ hot pot for dinner.",
        "opts": [
          "eat",
          "ate",
          "eats"
        ],
        "ans": 1,
        "hint": "eat 的过去式是 ate",
        "sentence": "We ate hot pot for dinner.",
        "zh": "我们晚餐吃了火锅。"
      },
      {
        "q": "He _____ a picture of the panda.",
        "opts": [
          "take",
          "took",
          "takes"
        ],
        "ans": 1,
        "hint": "take 的过去式是 took",
        "sentence": "He took a picture of the panda.",
        "zh": "他拍了一张熊猫的照片。"
      },
      {
        "q": "I _____ a cold last week.",
        "opts": [
          "catch",
          "caught",
          "catches"
        ],
        "ans": 1,
        "hint": "catch 的过去式是 caught",
        "sentence": "I caught a cold last week.",
        "zh": "我上周感冒了。"
      },
      {
        "q": "She _____ a kite with her brother.",
        "opts": [
          "fly",
          "flew",
          "flies"
        ],
        "ans": 1,
        "hint": "fly 的过去式是 flew",
        "sentence": "She flew a kite with her brother.",
        "zh": "她和哥哥一起放风筝。"
      },
      {
        "q": "They _____ TV after dinner.",
        "opts": [
          "watch",
          "watched",
          "watches"
        ],
        "ans": 1,
        "hint": "watch 是规则动词，加 ed",
        "sentence": "They watched TV after dinner.",
        "zh": "他们晚饭后看了电视。"
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
    "image": "kpp-bob-cola.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "go → went",
        "zh": "去"
      },
      {
        "en": "buy → bought",
        "zh": "买"
      },
      {
        "en": "see → saw",
        "zh": "看见"
      },
      {
        "en": "didn't go",
        "zh": "没有去"
      },
      {
        "en": "go to school",
        "zh": "去上学"
      },
      {
        "en": "have breakfast",
        "zh": "吃早餐"
      },
      {
        "en": "see a film",
        "zh": "看电影"
      },
      {
        "en": "eat hot pot",
        "zh": "吃火锅"
      },
      {
        "en": "read a book",
        "zh": "读书"
      },
      {
        "en": "write a letter",
        "zh": "写信"
      },
      {
        "en": "take a photo",
        "zh": "拍照"
      },
      {
        "en": "catch a cold",
        "zh": "感冒"
      },
      {
        "en": "ride a bike",
        "zh": "骑自行车"
      },
      {
        "en": "fly a kite",
        "zh": "放风筝"
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
    "image": "kpp-bob-cola.jpg",
    "audio": "I went to the park yesterday.",
    "opts": [
      "I went to the park yesterday.",
      "I go to the park yesterday.",
      "I went to the park tomorrow."
    ],
    "ans": 0,
    "hint": "注意时间词和动词形式",
    "sentence": "I went to the park yesterday.",
    "zh": "我昨天去了公园。",
    "questions": [
      {
        "audio": "I went to the park yesterday.",
        "opts": [
          "I went to the park yesterday.",
          "I go to the park yesterday.",
          "I went to the park tomorrow."
        ],
        "ans": 0,
        "hint": "注意时间词和动词形式",
        "zh": "我昨天去了公园。",
        "sentence": "I went to the park yesterday."
      },
      {
        "audio": "She ate an apple for lunch.",
        "opts": [
          "She ate an apple for lunch.",
          "She eats an apple for lunch.",
          "She ate an apple for breakfast."
        ],
        "ans": 0,
        "hint": "注意动词和餐名",
        "zh": "她午餐吃了一个苹果。",
        "sentence": "She ate an apple for lunch."
      },
      {
        "audio": "We saw a film last night.",
        "opts": [
          "We saw a film last night.",
          "We see a film last night.",
          "We saw a film last week."
        ],
        "ans": 0,
        "hint": "注意时间短语",
        "zh": "我们昨晚看了一部电影。",
        "sentence": "We saw a film last night."
      },
      {
        "audio": "He came to school by bus.",
        "opts": [
          "He came to school by bus.",
          "He come to school by bus.",
          "He came to school by bike."
        ],
        "ans": 0,
        "hint": "注意交通工具",
        "zh": "他坐公交车来学校。",
        "sentence": "He came to school by bus."
      },
      {
        "audio": "They had a picnic in the park.",
        "opts": [
          "They had a picnic in the park.",
          "They have a picnic in the park.",
          "They had a picnic in the playground."
        ],
        "ans": 0,
        "hint": "注意地点",
        "zh": "他们在公园野餐。",
        "sentence": "They had a picnic in the park."
      },
      {
        "audio": "I bought a new umbrella.",
        "opts": [
          "I bought a new umbrella.",
          "I buy a new umbrella.",
          "I bought an old umbrella."
        ],
        "ans": 0,
        "hint": "注意新旧",
        "zh": "我买了一把新伞。",
        "sentence": "I bought a new umbrella."
      },
      {
        "audio": "She wrote a letter to her friend.",
        "opts": [
          "She wrote a letter to her friend.",
          "She writes a letter to her friend.",
          "She wrote a letter to her teacher."
        ],
        "ans": 0,
        "hint": "注意收信人",
        "zh": "她给朋友写了一封信。",
        "sentence": "She wrote a letter to her friend."
      },
      {
        "audio": "The cat drank milk in the kitchen.",
        "opts": [
          "The cat drank milk in the kitchen.",
          "The cat drinks milk in the kitchen.",
          "The cat drank milk in the bedroom."
        ],
        "ans": 0,
        "hint": "注意地点",
        "zh": "猫在厨房喝了牛奶。",
        "sentence": "The cat drank milk in the kitchen."
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
    "image": "kpp-bob-cola.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I went to the zoo with my parents last Sunday.",
        "zh": "上周日我和父母去了动物园。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "She ate a bowl of noodles for breakfast.",
        "zh": "她早餐吃了一碗面条。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He came to school by bus this morning.",
        "zh": "他今天早上坐公交车来学校。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "We saw a lovely panda in the park.",
        "zh": "我们在公园里看到一只可爱的熊猫。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "They had a picnic in the playground.",
        "zh": "他们在操场上野餐了。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I bought a new umbrella because it rained.",
        "zh": "我买了一把新伞，因为下雨了。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "My mother made a big dinner for us.",
        "zh": "我妈妈为我们做了一顿丰盛的晚餐。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The cat drank milk in the kitchen.",
        "zh": "猫在厨房喝了牛奶。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "We took many photos at the school library.",
        "zh": "我们在学校图书馆拍了很多照片。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He wrote a letter to his friend last night.",
        "zh": "他昨晚给朋友写了一封信。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She gave me a beautiful apple.",
        "zh": "她给了我一个漂亮的苹果。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "They ran to the playground after class.",
        "zh": "下课后他们跑向操场。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I knew the answer to the question.",
        "zh": "我知道这个问题的答案。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The teacher taught us English yesterday.",
        "zh": "老师昨天教我们英语。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We met our friends at the bus stop.",
        "zh": "我们在公交车站遇到了朋友。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He flew a kite in the park.",
        "zh": "他在公园放风筝。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I forgot my homework at home.",
        "zh": "我把作业忘在家里了。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She chose a red dress in the shop.",
        "zh": "她在商店里选了一条红裙子。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "We drank hot tea after the game.",
        "zh": "比赛后我们喝了热茶。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He read an interesting book at the library.",
        "zh": "他在图书馆读了一本有趣的书。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The doctor came to see the sick boy.",
        "zh": "医生来看望生病的男孩。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "They sang songs around the campfire.",
        "zh": "他们围着篝火唱歌。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I slept early last night.",
        "zh": "我昨晚睡得早。",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "She swam in the pool with her sister.",
        "zh": "她和姐姐在游泳池里游泳。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
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
    "image": "kpp-bob-cola.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "She _____ a beautiful song at the concert.",
        "opts": [
          "sing",
          "sang",
          "sings"
        ],
        "ans": 1,
        "hint": "sing 的过去式是 sang",
        "sentence": "She sang a beautiful song at the concert.",
        "zh": "她在音乐会上唱了一首动听的歌。"
      },
      {
        "q": "They _____ to the library after school.",
        "opts": [
          "go",
          "went",
          "goes"
        ],
        "ans": 1,
        "hint": "after school 过去时间，用 went",
        "sentence": "They went to the library after school.",
        "zh": "他们放学后去了图书馆。"
      },
      {
        "q": "The cat _____ on the chair.",
        "opts": [
          "sleep",
          "slept",
          "sleeps"
        ],
        "ans": 1,
        "hint": "sleep 的过去式是 slept",
        "sentence": "The cat slept on the chair.",
        "zh": "猫在椅子上睡觉了。"
      },
      {
        "q": "We _____ a panda at the zoo.",
        "opts": [
          "see",
          "saw",
          "seen"
        ],
        "ans": 1,
        "hint": "see 的过去式是 saw",
        "sentence": "We saw a panda at the zoo.",
        "zh": "我们在动物园看到一只熊猫。"
      },
      {
        "q": "He _____ a glass of milk.",
        "opts": [
          "drink",
          "drank",
          "drinks"
        ],
        "ans": 1,
        "hint": "drink 的过去式是 drank",
        "sentence": "He drank a glass of milk.",
        "zh": "他喝了一杯牛奶。"
      },
      {
        "q": "I _____ a book about animals.",
        "opts": [
          "read",
          "readed",
          "reads"
        ],
        "ans": 0,
        "hint": "read 的过去式还是 read，但发音不同",
        "sentence": "I read a book about animals.",
        "zh": "我读了一本关于动物的书。"
      },
      {
        "q": "She _____ to the music last night.",
        "opts": [
          "listen",
          "listened",
          "listens"
        ],
        "ans": 1,
        "hint": "listen 是规则动词，加 ed",
        "sentence": "She listened to the music last night.",
        "zh": "她昨晚听了音乐。"
      },
      {
        "q": "They _____ a new house last year.",
        "opts": [
          "build",
          "built",
          "builds"
        ],
        "ans": 1,
        "hint": "build 的过去式是 built",
        "sentence": "They built a new house last year.",
        "zh": "他们去年建了一座新房子。"
      },
      {
        "q": "He _____ his bike to school.",
        "opts": [
          "ride",
          "rode",
          "rides"
        ],
        "ans": 1,
        "hint": "ride 的过去式是 rode",
        "sentence": "He rode his bike to school.",
        "zh": "他骑自行车去学校。"
      },
      {
        "q": "We _____ a lot of fun at the playground.",
        "opts": [
          "have",
          "had",
          "has"
        ],
        "ans": 1,
        "hint": "have 的过去式是 had",
        "sentence": "We had a lot of fun at the playground.",
        "zh": "我们在操场上玩得很开心。"
      },
      {
        "q": "I _____ my friend at the bus stop.",
        "opts": [
          "meet",
          "met",
          "meets"
        ],
        "ans": 1,
        "hint": "meet 的过去式是 met",
        "sentence": "I met my friend at the bus stop.",
        "zh": "我在公交车站遇到了我的朋友。"
      },
      {
        "q": "She _____ a red dress in the shop.",
        "opts": [
          "choose",
          "chose",
          "chooses"
        ],
        "ans": 1,
        "hint": "choose 的过去式是 chose",
        "sentence": "She chose a red dress in the shop.",
        "zh": "她在商店里选了一条红裙子。"
      },
      {
        "q": "The doctor _____ to the hospital early.",
        "opts": [
          "come",
          "came",
          "comes"
        ],
        "ans": 1,
        "hint": "come 的过去式是 came",
        "sentence": "The doctor came to the hospital early.",
        "zh": "医生很早就来到医院。"
      },
      {
        "q": "We _____ hot pot for dinner.",
        "opts": [
          "eat",
          "ate",
          "eats"
        ],
        "ans": 1,
        "hint": "eat 的过去式是 ate",
        "sentence": "We ate hot pot for dinner.",
        "zh": "我们晚餐吃了火锅。"
      },
      {
        "q": "He _____ a picture of the panda.",
        "opts": [
          "take",
          "took",
          "takes"
        ],
        "ans": 1,
        "hint": "take 的过去式是 took",
        "sentence": "He took a picture of the panda.",
        "zh": "他拍了一张熊猫的照片。"
      },
      {
        "q": "I _____ a cold last week.",
        "opts": [
          "catch",
          "caught",
          "catches"
        ],
        "ans": 1,
        "hint": "catch 的过去式是 caught",
        "sentence": "I caught a cold last week.",
        "zh": "我上周感冒了。"
      },
      {
        "q": "She _____ a kite with her brother.",
        "opts": [
          "fly",
          "flew",
          "flies"
        ],
        "ans": 1,
        "hint": "fly 的过去式是 flew",
        "sentence": "She flew a kite with her brother.",
        "zh": "她和哥哥一起放风筝。"
      },
      {
        "q": "They _____ TV after dinner.",
        "opts": [
          "watch",
          "watched",
          "watches"
        ],
        "ans": 1,
        "hint": "watch 是规则动词，加 ed",
        "sentence": "They watched TV after dinner.",
        "zh": "他们晚饭后看了电视。"
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
    "image": "kpp-writing.jpg",
    "checklist": [
      "过去时间标志：yesterday, last…, ago → 过去式",
      "不规则动词不能加 -ed：go→went, buy→bought",
      "写作日记：Yesterday I went… I bought… I saw…",
      "疑问：Did you go? — Yes, I went. / No, I didn't.",
      "高频：go-went, see-saw, buy-bought, get-got, take-took, make-made, have-had。"
    ],
    "chant": "Yesterday came — past tense time! Irregular verbs? Learn them by rhyme!",
    "chantSpeak": "Yesterday came, past tense time! Irregular verbs, learn them by rhyme!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "一般过去时 · 不规则动词",
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