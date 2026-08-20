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
    "audio": "Tom always gets up early on school days.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。",
    "image": "w4-freq-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-freq-hero.jpg",
    "question": "always 在句中通常放在哪里？",
    "choices": [
      {
        "text": "be 动词后，实义动词前",
        "correct": true,
        "fb": "对了！He is always…; He always gets…"
      },
      {
        "text": "句末",
        "correct": false,
        "fb": "频度副词一般放句中。"
      },
      {
        "text": "句首必须加逗号",
        "correct": false,
        "fb": "有时可句首，但小升初常考句中位置。"
      }
    ],
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-freq-hero.jpg",
    "lead": "频度副词表示动作发生的频率，常与一般现在时连用。",
    "formula": "always > usually > often > sometimes > never",
    "parts": [
      {
        "mark": "be 后",
        "label": "is always",
        "example": "He is always late."
      },
      {
        "mark": "实义前",
        "label": "always gets",
        "example": "Tom always gets up early."
      }
    ],
    "samples": [
      {
        "sentence": "Tom always gets up early on school days.",
        "zh": "汤姆上学日总是早起。"
      },
      {
        "sentence": "My sister usually does her homework before dinner.",
        "zh": "我姐姐通常晚饭前做作业。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-freq-high.jpg",
    "rightImage": "w4-freq-low.jpg",
    "leftLabel": "always 总是",
    "rightLabel": "never 从不",
    "leftSentence": "She always helps her mother.",
    "leftZh": "她总是帮妈妈。",
    "rightSentence": "He never eats junk food.",
    "rightZh": "他从不吃垃圾食品。",
    "morphBase": "always",
    "morphPast": "never",
    "morphHighlight": "",
    "discovery": "频率：always > usually > often > sometimes > seldom > never。"
  },
  {
    "section": "精讲",
    "title": "例句 · always + 实义",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-freq-hero.jpg",
    "lead": "always 放在 gets 前面。",
    "sentence": "Tom always gets up early on school days.",
    "zh": "汤姆上学日总是早起。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · be + always",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-freq-hero.jpg",
    "lead": "be 动词后面再加频度副词。",
    "sentence": "She is always friendly to us.",
    "zh": "她对我们总是很友好。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "频度副词的位置",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "频度副词通常放在实义动词前，be 动词后。",
    "sentence": "Tom always gets up early. / She is always happy.",
    "zh": "汤姆总是早起。 / 她总是很开心。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "频度副词的程度",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-moon.png",
    "lead": "always 表示 100%，usually 表示 80%，often 表示 60%。",
    "sentence": "I always brush my teeth. / I usually do my homework. / I often read books.",
    "zh": "我总是刷牙。 / 我通常做作业。 / 我经常读书。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "否定句中的频度副词",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "否定句中，频度副词放在 don't 后面。",
    "sentence": "I don't always eat fast food.",
    "zh": "我不总是吃快餐。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-freq-hero.jpg",
    "lead": "频度副词位置与排序。",
    "rules": [
      {
        "tab": "位置",
        "rule": "be 后；助动词后；实义动词前",
        "focusVerb": "always",
        "examples": [
          {
            "from": "is always",
            "to": "He is always happy."
          },
          {
            "from": "always gets",
            "to": "He always gets up early."
          }
        ],
        "sample": "Tom always gets up early on school days.",
        "sampleZh": "上学日汤姆总是早起。"
      },
      {
        "tab": "排序",
        "rule": "always > usually > often > sometimes > never",
        "focusVerb": "usually",
        "examples": [
          {
            "from": "always",
            "to": "100%"
          },
          {
            "from": "never",
            "to": "0%"
          }
        ],
        "sample": "I usually walk to school, but sometimes I take the bus.",
        "sampleZh": "我通常走路上学，但有时坐公交。"
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
    "image": "w4-freq-hero.jpg",
    "buckets": [
      {
        "key": "high",
        "label": "高频率"
      },
      {
        "key": "low",
        "label": "低频率"
      }
    ],
    "items": [
      {
        "text": "always",
        "bucket": "high"
      },
      {
        "text": "never",
        "bucket": "low"
      },
      {
        "text": "usually",
        "bucket": "high"
      },
      {
        "text": "seldom",
        "bucket": "low"
      },
      {
        "text": "often",
        "bucket": "high"
      },
      {
        "text": "sometimes",
        "bucket": "low"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-freq-hero.jpg",
    "question": "「He gets always up early.」应改成？",
    "choices": [
      {
        "text": "always gets up（实义动词前）",
        "correct": true,
        "fb": "频度副词在实义动词前。"
      },
      {
        "text": "gets up always early",
        "correct": false,
        "fb": "位置不对。"
      },
      {
        "text": "is always gets up",
        "correct": false,
        "fb": "不能同时用 is 和 gets。"
      }
    ],
    "sentence": "He always gets up early.",
    "zh": "他总是早起。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-freq-hero.jpg",
    "lead": "把频度副词放到正确位置。",
    "items": [
      {
        "from": "He is late. (always)",
        "fromZh": "他迟到。（总是）",
        "steps": [
          {
            "label": "插入 always",
            "opts": [
              "He is always late.",
              "He always is late.",
              "He is late always."
            ],
            "ans": 0,
            "hint": "be 后 always。",
            "sentence": "He is always late.",
            "zh": "他总是迟到。"
          }
        ]
      },
      {
        "from": "He gets always up early.",
        "fromZh": "他总是早起。",
        "steps": [
          {
            "label": "改成正确语序",
            "opts": [
              "He always gets up early.",
              "He gets up always early.",
              "He gets up early always."
            ],
            "ans": 0,
            "hint": "频度副词放在实义动词前",
            "sentence": "He always gets up early.",
            "zh": "他总是早起。"
          }
        ]
      },
      {
        "from": "She is usually happy.",
        "fromZh": "她通常很开心。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "She is not usually happy.",
              "She usually is not happy.",
              "She doesn't be usually happy."
            ],
            "ans": 0,
            "hint": "be 动词后加 not",
            "sentence": "She is not usually happy.",
            "zh": "她通常不开心。"
          }
        ]
      },
      {
        "from": "I often play basketball.",
        "fromZh": "我经常打篮球。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Do you often play basketball?",
              "Do you play often basketball?",
              "Are you often play basketball?"
            ],
            "ans": 0,
            "hint": "用 do 引导，频度副词放动词前",
            "sentence": "Do you often play basketball?",
            "zh": "你经常打篮球吗？"
          }
        ]
      },
      {
        "from": "They always eat lunch at noon.",
        "fromZh": "他们总是在中午吃午饭。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "They don't always eat lunch at noon.",
              "They always don't eat lunch at noon.",
              "They don't eat always lunch at noon."
            ],
            "ans": 0,
            "hint": "don't 加在 always 前",
            "sentence": "They don't always eat lunch at noon.",
            "zh": "他们不总是在中午吃午饭。"
          }
        ]
      },
      {
        "from": "He is always late.",
        "fromZh": "他总是迟到。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Is he always late?",
              "Does he always late?",
              "Is he late always?"
            ],
            "ans": 0,
            "hint": "be 动词提前",
            "sentence": "Is he always late?",
            "zh": "他总是迟到吗？"
          }
        ]
      },
      {
        "from": "She usually walks to school.",
        "fromZh": "她通常步行上学。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "She doesn't usually walk to school.",
              "She usually doesn't walk to school.",
              "She doesn't walk usually to school."
            ],
            "ans": 0,
            "hint": "don't 加在 usually 前",
            "sentence": "She doesn't usually walk to school.",
            "zh": "她通常不步行上学。"
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
    "image": "kp3d-library.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "always",
      "read",
      "books",
      "in",
      "the",
      "library"
    ],
    "sentence": "I always read books in the library.",
    "zh": "我总是在图书馆看书。",
    "items": [
      {
        "tokens": [
          "I",
          "always",
          "read",
          "books",
          "in",
          "the",
          "library"
        ],
        "sentence": "I always read books in the library.",
        "zh": "我总是在图书馆看书。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "She",
          "usually",
          "plays",
          "the",
          "piano",
          "after",
          "dinner"
        ],
        "sentence": "She usually plays the piano after dinner.",
        "zh": "她通常在晚饭后弹钢琴。",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "We",
          "often",
          "go",
          "to",
          "the",
          "playground",
          "on",
          "weekends"
        ],
        "sentence": "We often go to the playground on weekends.",
        "zh": "我们周末经常去操场。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "He",
          "always",
          "takes",
          "an",
          "umbrella",
          "on",
          "rainy",
          "days"
        ],
        "sentence": "He always takes an umbrella on rainy days.",
        "zh": "下雨天他总是带伞。",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "They",
          "usually",
          "buy",
          "fruit",
          "at",
          "the",
          "shop"
        ],
        "sentence": "They usually buy fruit at the shop.",
        "zh": "他们通常在商店买水果。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "My",
          "mother",
          "often",
          "cooks",
          "hot",
          "pot",
          "for",
          "dinner"
        ],
        "sentence": "My mother often cooks hot pot for dinner.",
        "zh": "我妈妈经常做火锅当晚餐。",
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
    "image": "w4-freq-hero.jpg",
    "audio": "Tom always gets up early on school days.",
    "tokens": [
      "Tom",
      "always",
      "gets",
      "up",
      "early",
      "on",
      "school",
      "days"
    ],
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-freq-hero.jpg",
    "q": "My sister _____ does her homework before dinner.",
    "opts": [
      "never",
      "usually",
      "seldom"
    ],
    "ans": 1,
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-freq-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "My sister _____ does her homework before dinner.",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "sentence": "Tom always gets up early on school days.",
        "zh": "上学日汤姆总是早起。"
      },
      {
        "q": "I _____ walk to school. I take the bus.",
        "opts": [
          "always",
          "never",
          "usually"
        ],
        "ans": 1,
        "hint": "坐公交说明 never walk。",
        "sentence": "I never walk to school. I take the bus.",
        "zh": "我从不走路上学，我坐公交。"
      },
      {
        "q": "They _____ play football on Sundays. （通常）",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "hint": "usually 通常。",
        "sentence": "They usually play football on Sundays.",
        "zh": "他们通常周日踢球。"
      },
      {
        "q": "_____ do you go swimming? — Once a week.",
        "opts": [
          "How long",
          "How often",
          "How far"
        ],
        "ans": 1,
        "hint": "问频率 How often。",
        "sentence": "How often do you go swimming?",
        "zh": "你多久游一次泳？"
      },
      {
        "q": "We _____ have rice for lunch, but not every day.",
        "opts": [
          "always",
          "sometimes",
          "never"
        ],
        "ans": 1,
        "hint": "不是每天 → sometimes。",
        "sentence": "We sometimes have rice for lunch.",
        "zh": "我们有时午饭吃米饭。"
      },
      {
        "q": "The students are _____ on time.",
        "opts": [
          "often",
          "oftenly",
          "oftens"
        ],
        "ans": 0,
        "hint": "often 无 -ly。",
        "sentence": "The students are often on time.",
        "zh": "学生们经常准时。"
      },
      {
        "q": "Tom _____ gets up early on school days.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天如此，用 always",
        "sentence": "Tom always gets up early on school days.",
        "zh": "汤姆在上学日总是早起。"
      },
      {
        "q": "I _____ play basketball with my friends after school.",
        "opts": [
          "often",
          "always",
          "never"
        ],
        "ans": 0,
        "hint": "表示经常，用 often",
        "sentence": "I often play basketball with my friends after school.",
        "zh": "放学后我经常和朋友们打篮球。"
      },
      {
        "q": "We _____ go to the library on Friday afternoons.",
        "opts": [
          "usually",
          "never",
          "often"
        ],
        "ans": 0,
        "hint": "表示通常，用 usually",
        "sentence": "We usually go to the library on Friday afternoons.",
        "zh": "我们通常在周五下午去图书馆。"
      },
      {
        "q": "The bus is _____ late in the morning.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示经常，但 not always",
        "sentence": "The bus is usually late in the morning.",
        "zh": "早上的公交车通常晚点。"
      },
      {
        "q": "She _____ reads books about pandas.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "She often reads books about pandas.",
        "zh": "她经常读关于熊猫的书。"
      },
      {
        "q": "My father _____ drinks tea after dinner.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "My father always drinks tea after dinner.",
        "zh": "我爸爸晚饭后总是喝茶。"
      },
      {
        "q": "They _____ walk to school, but sometimes they take the bus.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "They usually walk to school, but sometimes they take the bus.",
        "zh": "他们通常步行上学，但有时坐公交车。"
      },
      {
        "q": "He _____ does his homework in the classroom.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "He always does his homework in the classroom.",
        "zh": "他总是在教室里做作业。"
      },
      {
        "q": "She _____ goes to bed at nine o'clock.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "She usually goes to bed at nine o'clock.",
        "zh": "她通常九点上床睡觉。"
      },
      {
        "q": "I _____ see a cat in the park.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "I often see a cat in the park.",
        "zh": "我经常在公园里看到一只猫。"
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
        "q": "My sister _____ does her homework before dinner.",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "sentence": "Tom always gets up early on school days.",
        "zh": "上学日汤姆总是早起。"
      },
      {
        "q": "I _____ walk to school. I take the bus.",
        "opts": [
          "always",
          "never",
          "usually"
        ],
        "ans": 1,
        "hint": "坐公交说明 never walk。",
        "sentence": "I never walk to school. I take the bus.",
        "zh": "我从不走路上学，我坐公交。"
      },
      {
        "q": "They _____ play football on Sundays. （通常）",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "hint": "usually 通常。",
        "sentence": "They usually play football on Sundays.",
        "zh": "他们通常周日踢球。"
      },
      {
        "q": "_____ do you go swimming? — Once a week.",
        "opts": [
          "How long",
          "How often",
          "How far"
        ],
        "ans": 1,
        "hint": "问频率 How often。",
        "sentence": "How often do you go swimming?",
        "zh": "你多久游一次泳？"
      },
      {
        "q": "We _____ have rice for lunch, but not every day.",
        "opts": [
          "always",
          "sometimes",
          "never"
        ],
        "ans": 1,
        "hint": "不是每天 → sometimes。",
        "sentence": "We sometimes have rice for lunch.",
        "zh": "我们有时午饭吃米饭。"
      },
      {
        "q": "The students are _____ on time.",
        "opts": [
          "often",
          "oftenly",
          "oftens"
        ],
        "ans": 0,
        "hint": "often 无 -ly。",
        "sentence": "The students are often on time.",
        "zh": "学生们经常准时。"
      },
      {
        "q": "Tom _____ gets up early on school days.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天如此，用 always",
        "sentence": "Tom always gets up early on school days.",
        "zh": "汤姆在上学日总是早起。"
      },
      {
        "q": "I _____ play basketball with my friends after school.",
        "opts": [
          "often",
          "always",
          "never"
        ],
        "ans": 0,
        "hint": "表示经常，用 often",
        "sentence": "I often play basketball with my friends after school.",
        "zh": "放学后我经常和朋友们打篮球。"
      },
      {
        "q": "We _____ go to the library on Friday afternoons.",
        "opts": [
          "usually",
          "never",
          "often"
        ],
        "ans": 0,
        "hint": "表示通常，用 usually",
        "sentence": "We usually go to the library on Friday afternoons.",
        "zh": "我们通常在周五下午去图书馆。"
      },
      {
        "q": "The bus is _____ late in the morning.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示经常，但 not always",
        "sentence": "The bus is usually late in the morning.",
        "zh": "早上的公交车通常晚点。"
      },
      {
        "q": "She _____ reads books about pandas.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "She often reads books about pandas.",
        "zh": "她经常读关于熊猫的书。"
      },
      {
        "q": "My father _____ drinks tea after dinner.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "My father always drinks tea after dinner.",
        "zh": "我爸爸晚饭后总是喝茶。"
      },
      {
        "q": "They _____ walk to school, but sometimes they take the bus.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "They usually walk to school, but sometimes they take the bus.",
        "zh": "他们通常步行上学，但有时坐公交车。"
      },
      {
        "q": "He _____ does his homework in the classroom.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "He always does his homework in the classroom.",
        "zh": "他总是在教室里做作业。"
      },
      {
        "q": "She _____ goes to bed at nine o'clock.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "She usually goes to bed at nine o'clock.",
        "zh": "她通常九点上床睡觉。"
      },
      {
        "q": "I _____ see a cat in the park.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "I often see a cat in the park.",
        "zh": "我经常在公园里看到一只猫。"
      },
      {
        "q": "We _____ have lunch at noon.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "We always have lunch at noon.",
        "zh": "我们总是在中午吃午饭。"
      },
      {
        "q": "The teacher _____ gives us homework on Mondays.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "The teacher usually gives us homework on Mondays.",
        "zh": "老师通常在星期一给我们布置作业。"
      },
      {
        "q": "They _____ visit the panda base on weekends.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "They often visit the panda base on weekends.",
        "zh": "他们周末经常去熊猫基地。"
      },
      {
        "q": "My mother _____ cooks hot pot on Sundays.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "My mother always cooks hot pot on Sundays.",
        "zh": "我妈妈总是在星期天做火锅。"
      },
      {
        "q": "He _____ takes an umbrella when it rains.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "He usually takes an umbrella when it rains.",
        "zh": "下雨时他通常带伞。"
      },
      {
        "q": "I _____ brush my teeth before bed.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "I always brush my teeth before bed.",
        "zh": "我睡觉前总是刷牙。"
      },
      {
        "q": "She _____ practices the piano in the evening.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "She usually practices the piano in the evening.",
        "zh": "她晚上通常练习钢琴。"
      },
      {
        "q": "We _____ play on the playground during recess.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "We often play on the playground during recess.",
        "zh": "课间我们经常在操场上玩。"
      },
      {
        "q": "My brother _____ helps me with my homework.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "My brother always helps me with my homework.",
        "zh": "我哥哥总是帮我做作业。"
      },
      {
        "q": "The doctor _____ comes to check on patients in the morning.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "The doctor usually comes to check on patients in the morning.",
        "zh": "医生通常在早上来检查病人。"
      },
      {
        "q": "I _____ buy snacks at the shop after school.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "I often buy snacks at the shop after school.",
        "zh": "放学后我经常在商店买零食。"
      },
      {
        "q": "They _____ water the flowers in the garden.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "They always water the flowers in the garden.",
        "zh": "他们总是给花园里的花浇水。"
      },
      {
        "q": "She _____ reads stories about pandas in her free time.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "She often reads stories about pandas in her free time.",
        "zh": "她空闲时间经常读关于熊猫的故事。"
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
        "q": "My sister _____ does her homework before dinner.",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "sentence": "Tom always gets up early on school days.",
        "zh": "上学日汤姆总是早起。"
      },
      {
        "q": "I _____ walk to school. I take the bus.",
        "opts": [
          "always",
          "never",
          "usually"
        ],
        "ans": 1,
        "hint": "坐公交说明 never walk。",
        "sentence": "I never walk to school. I take the bus.",
        "zh": "我从不走路上学，我坐公交。"
      },
      {
        "q": "They _____ play football on Sundays. （通常）",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "hint": "usually 通常。",
        "sentence": "They usually play football on Sundays.",
        "zh": "他们通常周日踢球。"
      },
      {
        "q": "_____ do you go swimming? — Once a week.",
        "opts": [
          "How long",
          "How often",
          "How far"
        ],
        "ans": 1,
        "hint": "问频率 How often。",
        "sentence": "How often do you go swimming?",
        "zh": "你多久游一次泳？"
      },
      {
        "q": "We _____ have rice for lunch, but not every day.",
        "opts": [
          "always",
          "sometimes",
          "never"
        ],
        "ans": 1,
        "hint": "不是每天 → sometimes。",
        "sentence": "We sometimes have rice for lunch.",
        "zh": "我们有时午饭吃米饭。"
      },
      {
        "q": "The students are _____ on time.",
        "opts": [
          "often",
          "oftenly",
          "oftens"
        ],
        "ans": 0,
        "hint": "often 无 -ly。",
        "sentence": "The students are often on time.",
        "zh": "学生们经常准时。"
      },
      {
        "q": "Tom _____ gets up early on school days.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天如此，用 always",
        "sentence": "Tom always gets up early on school days.",
        "zh": "汤姆在上学日总是早起。"
      },
      {
        "q": "I _____ play basketball with my friends after school.",
        "opts": [
          "often",
          "always",
          "never"
        ],
        "ans": 0,
        "hint": "表示经常，用 often",
        "sentence": "I often play basketball with my friends after school.",
        "zh": "放学后我经常和朋友们打篮球。"
      },
      {
        "q": "We _____ go to the library on Friday afternoons.",
        "opts": [
          "usually",
          "never",
          "often"
        ],
        "ans": 0,
        "hint": "表示通常，用 usually",
        "sentence": "We usually go to the library on Friday afternoons.",
        "zh": "我们通常在周五下午去图书馆。"
      },
      {
        "q": "The bus is _____ late in the morning.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示经常，但 not always",
        "sentence": "The bus is usually late in the morning.",
        "zh": "早上的公交车通常晚点。"
      },
      {
        "q": "She _____ reads books about pandas.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "She often reads books about pandas.",
        "zh": "她经常读关于熊猫的书。"
      },
      {
        "q": "My father _____ drinks tea after dinner.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "My father always drinks tea after dinner.",
        "zh": "我爸爸晚饭后总是喝茶。"
      },
      {
        "q": "They _____ walk to school, but sometimes they take the bus.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "They usually walk to school, but sometimes they take the bus.",
        "zh": "他们通常步行上学，但有时坐公交车。"
      },
      {
        "q": "He _____ does his homework in the classroom.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "He always does his homework in the classroom.",
        "zh": "他总是在教室里做作业。"
      },
      {
        "q": "She _____ goes to bed at nine o'clock.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "She usually goes to bed at nine o'clock.",
        "zh": "她通常九点上床睡觉。"
      },
      {
        "q": "I _____ see a cat in the park.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "I often see a cat in the park.",
        "zh": "我经常在公园里看到一只猫。"
      },
      {
        "q": "We _____ have lunch at noon.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "We always have lunch at noon.",
        "zh": "我们总是在中午吃午饭。"
      },
      {
        "q": "The teacher _____ gives us homework on Mondays.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "The teacher usually gives us homework on Mondays.",
        "zh": "老师通常在星期一给我们布置作业。"
      },
      {
        "q": "They _____ visit the panda base on weekends.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "They often visit the panda base on weekends.",
        "zh": "他们周末经常去熊猫基地。"
      },
      {
        "q": "My mother _____ cooks hot pot on Sundays.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "My mother always cooks hot pot on Sundays.",
        "zh": "我妈妈总是在星期天做火锅。"
      },
      {
        "q": "He _____ takes an umbrella when it rains.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "He usually takes an umbrella when it rains.",
        "zh": "下雨时他通常带伞。"
      },
      {
        "q": "I _____ brush my teeth before bed.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "I always brush my teeth before bed.",
        "zh": "我睡觉前总是刷牙。"
      },
      {
        "q": "She _____ practices the piano in the evening.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "She usually practices the piano in the evening.",
        "zh": "她晚上通常练习钢琴。"
      },
      {
        "q": "We _____ play on the playground during recess.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "We often play on the playground during recess.",
        "zh": "课间我们经常在操场上玩。"
      },
      {
        "q": "My brother _____ helps me with my homework.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "My brother always helps me with my homework.",
        "zh": "我哥哥总是帮我做作业。"
      },
      {
        "q": "The doctor _____ comes to check on patients in the morning.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "The doctor usually comes to check on patients in the morning.",
        "zh": "医生通常在早上来检查病人。"
      },
      {
        "q": "I _____ buy snacks at the shop after school.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "I often buy snacks at the shop after school.",
        "zh": "放学后我经常在商店买零食。"
      },
      {
        "q": "They _____ water the flowers in the garden.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "They always water the flowers in the garden.",
        "zh": "他们总是给花园里的花浇水。"
      },
      {
        "q": "She _____ reads stories about pandas in her free time.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "She often reads stories about pandas in her free time.",
        "zh": "她空闲时间经常读关于熊猫的故事。"
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
    "image": "w4-freq-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "always",
        "zh": "总是 100%"
      },
      {
        "en": "usually",
        "zh": "通常"
      },
      {
        "en": "sometimes",
        "zh": "有时"
      },
      {
        "en": "never",
        "zh": "从不"
      },
      {
        "en": "often",
        "zh": "经常"
      },
      {
        "en": "get up",
        "zh": "起床"
      },
      {
        "en": "do homework",
        "zh": "做作业"
      },
      {
        "en": "play basketball",
        "zh": "打篮球"
      },
      {
        "en": "go to the library",
        "zh": "去图书馆"
      },
      {
        "en": "take the bus",
        "zh": "坐公交车"
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
    "image": "w4-freq-hero.jpg",
    "audio": "Tom always gets up early on school days.",
    "opts": [
      "Tom always gets up early on school days.",
      "Tom usually gets up early on school days.",
      "Tom often gets up early on school days."
    ],
    "ans": 0,
    "hint": "听到 always",
    "sentence": "Tom always gets up early on school days.",
    "zh": "汤姆在上学日总是早起。",
    "questions": [
      {
        "audio": "Tom always gets up early on school days.",
        "opts": [
          "Tom always gets up early on school days.",
          "Tom usually gets up early on school days.",
          "Tom often gets up early on school days."
        ],
        "ans": 0,
        "hint": "听到 always",
        "zh": "汤姆在上学日总是早起。",
        "sentence": "Tom always gets up early on school days."
      },
      {
        "audio": "My sister usually does her homework before dinner.",
        "opts": [
          "My sister usually does her homework before dinner.",
          "My sister always does her homework before dinner.",
          "My sister often does her homework before dinner."
        ],
        "ans": 0,
        "hint": "听到 usually",
        "zh": "我妹妹通常在晚饭前做作业。",
        "sentence": "My sister usually does her homework before dinner."
      },
      {
        "audio": "I often play basketball with my friends.",
        "opts": [
          "I often play basketball with my friends.",
          "I always play basketball with my friends.",
          "I usually play basketball with my friends."
        ],
        "ans": 0,
        "hint": "听到 often",
        "zh": "我经常和朋友们打篮球。",
        "sentence": "I often play basketball with my friends."
      },
      {
        "audio": "We always go to the library on Fridays.",
        "opts": [
          "We always go to the library on Fridays.",
          "We usually go to the library on Fridays.",
          "We often go to the library on Fridays."
        ],
        "ans": 0,
        "hint": "听到 always",
        "zh": "我们周五总是去图书馆。",
        "sentence": "We always go to the library on Fridays."
      },
      {
        "audio": "The bus is usually late in the morning.",
        "opts": [
          "The bus is usually late in the morning.",
          "The bus is always late in the morning.",
          "The bus is often late in the morning."
        ],
        "ans": 0,
        "hint": "听到 usually",
        "zh": "早上的公交车通常晚点。",
        "sentence": "The bus is usually late in the morning."
      },
      {
        "audio": "She often reads books about pandas.",
        "opts": [
          "She often reads books about pandas.",
          "She always reads books about pandas.",
          "She usually reads books about pandas."
        ],
        "ans": 0,
        "hint": "听到 often",
        "zh": "她经常读关于熊猫的书。",
        "sentence": "She often reads books about pandas."
      },
      {
        "audio": "My father always drinks tea after dinner.",
        "opts": [
          "My father always drinks tea after dinner.",
          "My father usually drinks tea after dinner.",
          "My father often drinks tea after dinner."
        ],
        "ans": 0,
        "hint": "听到 always",
        "zh": "我爸爸晚饭后总是喝茶。",
        "sentence": "My father always drinks tea after dinner."
      },
      {
        "audio": "They usually walk to school.",
        "opts": [
          "They usually walk to school.",
          "They always walk to school.",
          "They often walk to school."
        ],
        "ans": 0,
        "hint": "听到 usually",
        "zh": "他们通常步行上学。",
        "sentence": "They usually walk to school."
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
    "image": "w4-freq-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Tom always gets up early on school days.",
        "zh": "汤姆在上学日总是早起。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My sister usually does her homework before dinner.",
        "zh": "我妹妹通常在晚饭前做作业。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I often play basketball with my friends after school.",
        "zh": "放学后我经常和朋友们打篮球。",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "We always go to the library on Friday afternoons.",
        "zh": "我们周五下午总是去图书馆。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The bus is usually late in the morning.",
        "zh": "早上的公交车通常晚点。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She often reads books about pandas.",
        "zh": "她经常读关于熊猫的书。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "My father always drinks tea after dinner.",
        "zh": "我爸爸晚饭后总是喝茶。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "They usually walk to school, but sometimes they take the bus.",
        "zh": "他们通常步行上学，但有时坐公交车。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He always does his homework in the classroom.",
        "zh": "他总是在教室里做作业。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She usually goes to bed at nine o'clock.",
        "zh": "她通常九点上床睡觉。",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "I often see a cat in the park.",
        "zh": "我经常在公园里看到一只猫。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "We always have lunch at noon.",
        "zh": "我们总是在中午吃午饭。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The teacher usually gives us homework on Mondays.",
        "zh": "老师通常在星期一给我们布置作业。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "They often visit the panda base on weekends.",
        "zh": "他们周末经常去熊猫基地。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "My mother always cooks hot pot on Sundays.",
        "zh": "我妈妈总是在星期天做火锅。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He usually takes an umbrella when it rains.",
        "zh": "下雨时他通常带伞。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "I always brush my teeth before bed.",
        "zh": "我睡觉前总是刷牙。",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "She usually practices the piano in the evening.",
        "zh": "她晚上通常练习钢琴。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "We often play on the playground during recess.",
        "zh": "课间我们经常在操场上玩。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My brother always helps me with my homework.",
        "zh": "我哥哥总是帮我做作业。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The doctor usually comes to check on patients in the morning.",
        "zh": "医生通常在早上来检查病人。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "I often buy snacks at the shop after school.",
        "zh": "放学后我经常在商店买零食。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "They always water the flowers in the garden.",
        "zh": "他们总是给花园里的花浇水。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "She often reads stories about pandas in her free time.",
        "zh": "她空闲时间经常读关于熊猫的故事。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
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
    "image": "w4-freq-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "We _____ have lunch at noon.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "We always have lunch at noon.",
        "zh": "我们总是在中午吃午饭。"
      },
      {
        "q": "The teacher _____ gives us homework on Mondays.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "The teacher usually gives us homework on Mondays.",
        "zh": "老师通常在星期一给我们布置作业。"
      },
      {
        "q": "They _____ visit the panda base on weekends.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "They often visit the panda base on weekends.",
        "zh": "他们周末经常去熊猫基地。"
      },
      {
        "q": "My mother _____ cooks hot pot on Sundays.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "My mother always cooks hot pot on Sundays.",
        "zh": "我妈妈总是在星期天做火锅。"
      },
      {
        "q": "He _____ takes an umbrella when it rains.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "He usually takes an umbrella when it rains.",
        "zh": "下雨时他通常带伞。"
      },
      {
        "q": "I _____ brush my teeth before bed.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "I always brush my teeth before bed.",
        "zh": "我睡觉前总是刷牙。"
      },
      {
        "q": "She _____ practices the piano in the evening.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "She usually practices the piano in the evening.",
        "zh": "她晚上通常练习钢琴。"
      },
      {
        "q": "We _____ play on the playground during recess.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "We often play on the playground during recess.",
        "zh": "课间我们经常在操场上玩。"
      },
      {
        "q": "My brother _____ helps me with my homework.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示总是，用 always",
        "sentence": "My brother always helps me with my homework.",
        "zh": "我哥哥总是帮我做作业。"
      },
      {
        "q": "The doctor _____ comes to check on patients in the morning.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 1,
        "hint": "表示通常，用 usually",
        "sentence": "The doctor usually comes to check on patients in the morning.",
        "zh": "医生通常在早上来检查病人。"
      },
      {
        "q": "I _____ buy snacks at the shop after school.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "I often buy snacks at the shop after school.",
        "zh": "放学后我经常在商店买零食。"
      },
      {
        "q": "They _____ water the flowers in the garden.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 0,
        "hint": "表示每天，用 always",
        "sentence": "They always water the flowers in the garden.",
        "zh": "他们总是给花园里的花浇水。"
      },
      {
        "q": "She _____ reads stories about pandas in her free time.",
        "opts": [
          "always",
          "usually",
          "often"
        ],
        "ans": 2,
        "hint": "表示经常，用 often",
        "sentence": "She often reads stories about pandas in her free time.",
        "zh": "她空闲时间经常读关于熊猫的故事。"
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
      "be 后/实义动词前",
      "always > usually > often > sometimes > never",
      "写作：I usually…, but sometimes…",
      "sometimes 也可放句首：Sometimes I read in bed."
    ],
    "chant": "Always, usually, often — high to low! After be, before verb — now you know!",
    "chantSpeak": "Always, usually, often, high to low! After be, before verb, now you know!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "频度副词 always / usually / often",
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