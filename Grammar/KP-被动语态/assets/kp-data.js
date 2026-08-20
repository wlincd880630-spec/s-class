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
    "audio": "English is spoken in many countries.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。",
    "image": "w3-pass-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-pass-hero.jpg",
    "question": "谁才是句子的主角——英语还是被说？",
    "choices": [
      {
        "text": "英语是主语，强调「被说」→ 被动语态",
        "correct": true,
        "fb": "对了！主语是动作的承受者。"
      },
      {
        "text": "主动语态",
        "correct": false,
        "fb": "主动句常说 People speak English。"
      },
      {
        "text": "过去时",
        "correct": false,
        "fb": "is spoken 是现在时被动。"
      }
    ],
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-pass-hero.jpg",
    "lead": "主语是动作的承受者时用被动。",
    "formula": "be + 过去分词　(+ by + 执行者)",
    "parts": [
      {
        "mark": "现在",
        "label": "am/is/are + PP",
        "example": "is spoken"
      },
      {
        "mark": "过去",
        "label": "was/were + PP",
        "example": "was cleaned"
      },
      {
        "mark": "by",
        "label": "可省略",
        "example": "by people"
      }
    ],
    "samples": [
      {
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家都说英语。"
      },
      {
        "sentence": "The classroom is cleaned every afternoon.",
        "zh": "教室每天下午被打扫。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-pass-act.jpg",
    "rightImage": "w3-pass-pass.jpg",
    "leftLabel": "主动",
    "rightLabel": "被动",
    "leftSentence": "People speak English.",
    "leftZh": "人们说英语。",
    "rightSentence": "English is spoken by many people.",
    "rightZh": "英语被很多人说。",
    "morphBase": "speak",
    "morphPast": "is spoken",
    "morphHighlight": "en",
    "discovery": "主语是承受者 → be + 过去分词 (+ by …)。"
  },
  {
    "section": "精讲",
    "title": "例句 · 英语被说",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pass-hero.jpg",
    "lead": "English 是承受者 → is spoken。",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家都说英语。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 教室被打扫",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pass-hero.jpg",
    "lead": "每天发生的被动：is cleaned。",
    "sentence": "The classroom is cleaned every afternoon.",
    "zh": "教室每天下午被打扫。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "熊猫和火锅",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "被动语态也可以表达‘被喜欢’、‘被享受’。",
    "sentence": "The panda is loved by people all over the world.",
    "zh": "熊猫被全世界的人们喜爱。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "昨天的窗户",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-window.png",
    "lead": "过去的事情用 was/were + 过去分词。",
    "sentence": "The window was broken by the wind yesterday.",
    "zh": "窗户昨天被风吹破了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-pass-hero.jpg",
    "lead": "被动语态构成。",
    "rules": [
      {
        "tab": "现在",
        "rule": "am/is/are + 过去分词",
        "focusVerb": "is spoken",
        "examples": [
          {
            "from": "speak",
            "to": "is spoken"
          },
          {
            "from": "make",
            "to": "is made"
          }
        ],
        "sample": "English is spoken in many countries.",
        "sampleZh": "许多国家说英语。"
      },
      {
        "tab": "过去",
        "rule": "was/were + 过去分词",
        "focusVerb": "was built",
        "examples": [
          {
            "from": "build",
            "to": "was built"
          }
        ],
        "sample": "The bridge was built in 2010.",
        "sampleZh": "这座桥建于 2010 年。"
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
    "image": "w3-pass-hero.jpg",
    "buckets": [
      {
        "key": "act",
        "label": "主动语态"
      },
      {
        "key": "pas",
        "label": "被动语态"
      }
    ],
    "items": [
      {
        "text": "Tom cleans the classroom.",
        "bucket": "act"
      },
      {
        "text": "The classroom is cleaned every day.",
        "bucket": "pas"
      },
      {
        "text": "They built the bridge in 2010.",
        "bucket": "act"
      },
      {
        "text": "The bridge was built in 2010.",
        "bucket": "pas"
      },
      {
        "text": "Miss Li teaches us English.",
        "bucket": "act"
      },
      {
        "text": "We are taught English by Miss Li.",
        "bucket": "pas"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-pass-hero.jpg",
    "question": "「The window is broke by the boy.」应改成？",
    "choices": [
      {
        "text": "is broken（过去分词）",
        "correct": true,
        "fb": "break → broken。"
      },
      {
        "text": "is breaking",
        "correct": false,
        "fb": "进行时不是被动入门公式。"
      },
      {
        "text": "broke",
        "correct": false,
        "fb": "缺少 be。"
      }
    ],
    "sentence": "The window is broken by the boy.",
    "zh": "窗户被那个男孩打破了。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-pass-hero.jpg",
    "lead": "主动变被动：宾语变主语，动词变 be + PP。",
    "items": [
      {
        "from": "People speak English in many countries.",
        "fromZh": "许多人在很多国家说英语。",
        "steps": [
          {
            "label": "改成被动",
            "opts": [
              "English is spoken in many countries.",
              "English is speak in many countries.",
              "English spoken in many countries."
            ],
            "ans": 0,
            "hint": "speak → is spoken。",
            "sentence": "English is spoken in many countries.",
            "zh": "许多国家都说英语。"
          }
        ]
      },
      {
        "from": "The window is broke by the boy.",
        "fromZh": "窗户被男孩打破了。",
        "steps": [
          {
            "label": "改成正确的被动语态",
            "opts": [
              "The window is broken by the boy.",
              "The window is broke by the boy.",
              "The window was broke by the boy."
            ],
            "ans": 0,
            "hint": "过去分词是 broken，不是 broke",
            "sentence": "The window is broken by the boy.",
            "zh": "窗户被男孩打破了。"
          }
        ]
      },
      {
        "from": "The students clean the classroom.",
        "fromZh": "学生们打扫教室。",
        "steps": [
          {
            "label": "改成被动语态",
            "opts": [
              "The classroom is cleaned by the students.",
              "The classroom cleans the students.",
              "The students are cleaned by the classroom."
            ],
            "ans": 0,
            "hint": "宾语 classroom 变主语，动词变 be + 过去分词",
            "sentence": "The classroom is cleaned by the students.",
            "zh": "教室被学生们打扫。"
          }
        ]
      },
      {
        "from": "My mother cooks the dinner.",
        "fromZh": "我妈妈做晚餐。",
        "steps": [
          {
            "label": "改成被动语态",
            "opts": [
              "The dinner is cooked by my mother.",
              "The dinner cooks my mother.",
              "My mother is cooked by the dinner."
            ],
            "ans": 0,
            "hint": "宾语 dinner 变主语，用 is cooked",
            "sentence": "The dinner is cooked by my mother.",
            "zh": "晚餐由我妈妈做。"
          }
        ]
      },
      {
        "from": "The boy broke the window yesterday.",
        "fromZh": "男孩昨天打破了窗户。",
        "steps": [
          {
            "label": "改成被动语态",
            "opts": [
              "The window was broken by the boy yesterday.",
              "The window is broken by the boy yesterday.",
              "The boy was broken by the window yesterday."
            ],
            "ans": 0,
            "hint": "yesterday 用过去时 was/were，break 的过去分词是 broken",
            "sentence": "The window was broken by the boy yesterday.",
            "zh": "窗户昨天被男孩打破了。"
          }
        ]
      },
      {
        "from": "The teacher tells the story.",
        "fromZh": "老师讲故事。",
        "steps": [
          {
            "label": "改成被动语态",
            "opts": [
              "The story is told by the teacher.",
              "The story tells the teacher.",
              "The teacher is told by the story."
            ],
            "ans": 0,
            "hint": "宾语 story 变主语，用 is told",
            "sentence": "The story is told by the teacher.",
            "zh": "故事由老师讲。"
          }
        ]
      },
      {
        "from": "The cat ate the fish.",
        "fromZh": "猫吃了鱼。",
        "steps": [
          {
            "label": "改成被动语态",
            "opts": [
              "The fish was eaten by the cat.",
              "The fish is eaten by the cat.",
              "The cat was eaten by the fish."
            ],
            "ans": 0,
            "hint": "过去时用 was，eat 的过去分词是 eaten",
            "sentence": "The fish was eaten by the cat.",
            "zh": "鱼被猫吃了。"
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
    "image": "kp3d-classroom.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "The",
      "classroom",
      "is",
      "cleaned",
      "every",
      "day"
    ],
    "sentence": "The classroom is cleaned every day.",
    "zh": "教室每天都被打扫。",
    "items": [
      {
        "tokens": [
          "The",
          "classroom",
          "is",
          "cleaned",
          "every",
          "day"
        ],
        "sentence": "The classroom is cleaned every day.",
        "zh": "教室每天都被打扫。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "The",
          "panda",
          "is",
          "loved",
          "by",
          "people"
        ],
        "sentence": "The panda is loved by people.",
        "zh": "熊猫被人们喜爱。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "The",
          "window",
          "was",
          "broken",
          "yesterday"
        ],
        "sentence": "The window was broken yesterday.",
        "zh": "窗户昨天被打破了。",
        "image": "kp3d-window.png"
      },
      {
        "tokens": [
          "The",
          "dinner",
          "is",
          "cooked",
          "by",
          "my",
          "mother"
        ],
        "sentence": "The dinner is cooked by my mother.",
        "zh": "晚餐是我妈妈做的。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "The",
          "bus",
          "is",
          "stopped",
          "at",
          "the",
          "station"
        ],
        "sentence": "The bus is stopped at the station.",
        "zh": "公交车停在车站。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "The",
          "apple",
          "is",
          "eaten",
          "by",
          "the",
          "boy"
        ],
        "sentence": "The apple is eaten by the boy.",
        "zh": "苹果被男孩吃了。",
        "image": "kp3d-apple.png"
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
    "image": "w3-pass-hero.jpg",
    "audio": "English is spoken in many countries.",
    "tokens": [
      "English",
      "is",
      "spoken",
      "in",
      "many",
      "countries"
    ],
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "id": "p15",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-pass-hero.jpg",
    "q": "The classroom _____ every afternoon.",
    "opts": [
      "cleans",
      "is cleaned",
      "cleaned"
    ],
    "ans": 1,
    "hint": "教室是「被打扫」→ 被动。",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-pass-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "The classroom _____ every afternoon.",
        "opts": [
          "cleans",
          "is cleaned",
          "cleaned"
        ],
        "ans": 1,
        "hint": "教室是「被打扫」→ 被动。",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The book _____ by Mo Yan.",
        "opts": [
          "wrote",
          "was written",
          "is writing"
        ],
        "ans": 1,
        "hint": "过去被动 was written。",
        "sentence": "The book was written by Mo Yan.",
        "zh": "这本书是莫言写的。"
      },
      {
        "q": "These photos _____ in Chengdu.",
        "opts": [
          "are taken",
          "taken",
          "took"
        ],
        "ans": 0,
        "hint": "现在被动 are taken。",
        "sentence": "These photos are taken in Chengdu.",
        "zh": "这些照片是在成都拍的。"
      },
      {
        "q": "The flowers _____ every morning.",
        "opts": [
          "water",
          "are watered",
          "watering"
        ],
        "ans": 1,
        "hint": "flowers 承受者 → are watered。",
        "sentence": "The flowers are watered every morning.",
        "zh": "花每天早上被浇水。"
      },
      {
        "q": "The letter _____ yesterday.",
        "opts": [
          "is sent",
          "was sent",
          "sent"
        ],
        "ans": 1,
        "hint": "yesterday → 过去被动 was sent。",
        "sentence": "The letter was sent yesterday.",
        "zh": "信昨天被寄出。"
      },
      {
        "q": "Rice _____ in the south of China.",
        "opts": [
          "grows",
          "is grown",
          "grew"
        ],
        "ans": 1,
        "hint": "水稻被种植 → is grown。",
        "sentence": "Rice is grown in the south of China.",
        "zh": "中国南方种植水稻。"
      },
      {
        "q": "The classroom _____ cleaned every day.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "classroom 是单数，用 is",
        "sentence": "The classroom is cleaned every day.",
        "zh": "教室每天都被打扫。"
      },
      {
        "q": "English _____ spoken in many countries.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 0,
        "hint": "English 是单数，用 is",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The windows _____ cleaned by the students yesterday.",
        "opts": [
          "were",
          "was",
          "are"
        ],
        "ans": 0,
        "hint": "windows 是复数，且是昨天，用 were",
        "sentence": "The windows were cleaned by the students yesterday.",
        "zh": "窗户昨天被学生们打扫了。"
      },
      {
        "q": "The panda _____ loved by people all over the world.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "panda 是单数，用 is",
        "sentence": "The panda is loved by people all over the world.",
        "zh": "熊猫被全世界的人们喜爱。"
      },
      {
        "q": "The dinner _____ cooked by my mother every evening.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every evening 表示现在习惯，dinner 单数用 is",
        "sentence": "The dinner is cooked by my mother every evening.",
        "zh": "晚餐是我妈妈每天晚上做的。"
      },
      {
        "q": "The bus _____ stopped at the red light now.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "now 表示现在，bus 单数用 is",
        "sentence": "The bus is stopped at the red light now.",
        "zh": "公交车现在在红灯前停下了。"
      },
      {
        "q": "The apple _____ eaten by the little boy.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "apple 单数用 is",
        "sentence": "The apple is eaten by the little boy.",
        "zh": "苹果被小男孩吃了。"
      },
      {
        "q": "The library _____ opened at nine o'clock.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "图书馆开门是事实，用 is",
        "sentence": "The library is opened at nine o'clock.",
        "zh": "图书馆九点开门。"
      },
      {
        "q": "The window _____ broken by the boy yesterday.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "yesterday 用过去时，window 单数用 was",
        "sentence": "The window was broken by the boy yesterday.",
        "zh": "窗户昨天被男孩打破了。"
      },
      {
        "q": "The basketball game _____ watched by many students last week.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "last week 用过去时，game 单数用 was",
        "sentence": "The basketball game was watched by many students last week.",
        "zh": "篮球比赛上周被很多学生观看了。"
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
        "q": "The classroom _____ every afternoon.",
        "opts": [
          "cleans",
          "is cleaned",
          "cleaned"
        ],
        "ans": 1,
        "hint": "教室是「被打扫」→ 被动。",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The book _____ by Mo Yan.",
        "opts": [
          "wrote",
          "was written",
          "is writing"
        ],
        "ans": 1,
        "hint": "过去被动 was written。",
        "sentence": "The book was written by Mo Yan.",
        "zh": "这本书是莫言写的。"
      },
      {
        "q": "These photos _____ in Chengdu.",
        "opts": [
          "are taken",
          "taken",
          "took"
        ],
        "ans": 0,
        "hint": "现在被动 are taken。",
        "sentence": "These photos are taken in Chengdu.",
        "zh": "这些照片是在成都拍的。"
      },
      {
        "q": "The flowers _____ every morning.",
        "opts": [
          "water",
          "are watered",
          "watering"
        ],
        "ans": 1,
        "hint": "flowers 承受者 → are watered。",
        "sentence": "The flowers are watered every morning.",
        "zh": "花每天早上被浇水。"
      },
      {
        "q": "The letter _____ yesterday.",
        "opts": [
          "is sent",
          "was sent",
          "sent"
        ],
        "ans": 1,
        "hint": "yesterday → 过去被动 was sent。",
        "sentence": "The letter was sent yesterday.",
        "zh": "信昨天被寄出。"
      },
      {
        "q": "Rice _____ in the south of China.",
        "opts": [
          "grows",
          "is grown",
          "grew"
        ],
        "ans": 1,
        "hint": "水稻被种植 → is grown。",
        "sentence": "Rice is grown in the south of China.",
        "zh": "中国南方种植水稻。"
      },
      {
        "q": "The classroom _____ cleaned every day.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "classroom 是单数，用 is",
        "sentence": "The classroom is cleaned every day.",
        "zh": "教室每天都被打扫。"
      },
      {
        "q": "English _____ spoken in many countries.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 0,
        "hint": "English 是单数，用 is",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The windows _____ cleaned by the students yesterday.",
        "opts": [
          "were",
          "was",
          "are"
        ],
        "ans": 0,
        "hint": "windows 是复数，且是昨天，用 were",
        "sentence": "The windows were cleaned by the students yesterday.",
        "zh": "窗户昨天被学生们打扫了。"
      },
      {
        "q": "The panda _____ loved by people all over the world.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "panda 是单数，用 is",
        "sentence": "The panda is loved by people all over the world.",
        "zh": "熊猫被全世界的人们喜爱。"
      },
      {
        "q": "The dinner _____ cooked by my mother every evening.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every evening 表示现在习惯，dinner 单数用 is",
        "sentence": "The dinner is cooked by my mother every evening.",
        "zh": "晚餐是我妈妈每天晚上做的。"
      },
      {
        "q": "The bus _____ stopped at the red light now.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "now 表示现在，bus 单数用 is",
        "sentence": "The bus is stopped at the red light now.",
        "zh": "公交车现在在红灯前停下了。"
      },
      {
        "q": "The apple _____ eaten by the little boy.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "apple 单数用 is",
        "sentence": "The apple is eaten by the little boy.",
        "zh": "苹果被小男孩吃了。"
      },
      {
        "q": "The library _____ opened at nine o'clock.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "图书馆开门是事实，用 is",
        "sentence": "The library is opened at nine o'clock.",
        "zh": "图书馆九点开门。"
      },
      {
        "q": "The window _____ broken by the boy yesterday.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "yesterday 用过去时，window 单数用 was",
        "sentence": "The window was broken by the boy yesterday.",
        "zh": "窗户昨天被男孩打破了。"
      },
      {
        "q": "The basketball game _____ watched by many students last week.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "last week 用过去时，game 单数用 was",
        "sentence": "The basketball game was watched by many students last week.",
        "zh": "篮球比赛上周被很多学生观看了。"
      },
      {
        "q": "The doctor _____ called in the middle of the night.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生的事，doctor 单数用 was",
        "sentence": "The doctor was called in the middle of the night.",
        "zh": "医生在半夜被叫来了。"
      },
      {
        "q": "The piano _____ played by Lily at the party.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，piano 单数用 was",
        "sentence": "The piano was played by Lily at the party.",
        "zh": "钢琴在聚会上由莉莉演奏。"
      },
      {
        "q": "The cat _____ found under the chair.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，cat 单数用 was",
        "sentence": "The cat was found under the chair.",
        "zh": "猫在椅子下面被找到了。"
      },
      {
        "q": "The moon _____ seen from the window last night.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "last night 用过去时，moon 单数用 was",
        "sentence": "The moon was seen from the window last night.",
        "zh": "昨晚从窗户看到了月亮。"
      },
      {
        "q": "The playground _____ cleaned by the students after school.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，playground 单数用 was",
        "sentence": "The playground was cleaned by the students after school.",
        "zh": "放学后操场被学生们打扫了。"
      },
      {
        "q": "The shop _____ closed at six yesterday.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "yesterday 用过去时，shop 单数用 was",
        "sentence": "The shop was closed at six yesterday.",
        "zh": "商店昨天六点关门了。"
      },
      {
        "q": "The taller boy _____ chosen to carry the flag.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "现在发生，boy 单数用 is",
        "sentence": "The taller boy is chosen to carry the flag.",
        "zh": "那个更高的男孩被选中举旗。"
      },
      {
        "q": "The story _____ told by the teacher every Monday.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every Monday 用现在时，story 单数用 is",
        "sentence": "The story is told by the teacher every Monday.",
        "zh": "老师每个星期一都讲这个故事。"
      },
      {
        "q": "The homework _____ finished by the students before dinner.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "现在习惯，homework 不可数用 is",
        "sentence": "The homework is finished by the students before dinner.",
        "zh": "作业在晚饭前被学生们完成。"
      },
      {
        "q": "The books _____ returned to the library every Friday.",
        "opts": [
          "are",
          "is",
          "was"
        ],
        "ans": 0,
        "hint": "books 复数用 are",
        "sentence": "The books are returned to the library every Friday.",
        "zh": "书每星期五被还回图书馆。"
      },
      {
        "q": "The new words _____ written on the blackboard.",
        "opts": [
          "are",
          "is",
          "was"
        ],
        "ans": 0,
        "hint": "words 复数用 are",
        "sentence": "The new words are written on the blackboard.",
        "zh": "新单词被写在黑板上。"
      },
      {
        "q": "The hot pot _____ enjoyed by many people in Chengdu.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "hot pot 单数用 is",
        "sentence": "The hot pot is enjoyed by many people in Chengdu.",
        "zh": "火锅被成都的很多人喜爱。"
      },
      {
        "q": "The bus ticket _____ bought at the station.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "ticket 单数用 is",
        "sentence": "The bus ticket is bought at the station.",
        "zh": "公交车票在车站被购买。"
      },
      {
        "q": "The picture _____ drawn by the little girl on the wall.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "picture 单数用 is",
        "sentence": "The picture is drawn by the little girl on the wall.",
        "zh": "这幅画被小女孩画在墙上。"
      },
      {
        "q": "The umbrella _____ put near the door by my father.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "umbrella 单数用 is",
        "sentence": "The umbrella is put near the door by my father.",
        "zh": "雨伞被我爸爸放在门边。"
      },
      {
        "q": "The dinner _____ eaten by the family at seven.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，dinner 单数用 was",
        "sentence": "The dinner was eaten by the family at seven.",
        "zh": "晚餐七点被家人吃了。"
      },
      {
        "q": "The bus _____ stopped by the driver at the station.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，bus 单数用 was",
        "sentence": "The bus was stopped by the driver at the station.",
        "zh": "公交车被司机停在车站。"
      },
      {
        "q": "The cat _____ fed by the girl every morning.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every morning 用现在时，cat 单数用 is",
        "sentence": "The cat is fed by the girl every morning.",
        "zh": "猫每天早晨被女孩喂食。"
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
        "q": "The classroom _____ every afternoon.",
        "opts": [
          "cleans",
          "is cleaned",
          "cleaned"
        ],
        "ans": 1,
        "hint": "教室是「被打扫」→ 被动。",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The book _____ by Mo Yan.",
        "opts": [
          "wrote",
          "was written",
          "is writing"
        ],
        "ans": 1,
        "hint": "过去被动 was written。",
        "sentence": "The book was written by Mo Yan.",
        "zh": "这本书是莫言写的。"
      },
      {
        "q": "These photos _____ in Chengdu.",
        "opts": [
          "are taken",
          "taken",
          "took"
        ],
        "ans": 0,
        "hint": "现在被动 are taken。",
        "sentence": "These photos are taken in Chengdu.",
        "zh": "这些照片是在成都拍的。"
      },
      {
        "q": "The flowers _____ every morning.",
        "opts": [
          "water",
          "are watered",
          "watering"
        ],
        "ans": 1,
        "hint": "flowers 承受者 → are watered。",
        "sentence": "The flowers are watered every morning.",
        "zh": "花每天早上被浇水。"
      },
      {
        "q": "The letter _____ yesterday.",
        "opts": [
          "is sent",
          "was sent",
          "sent"
        ],
        "ans": 1,
        "hint": "yesterday → 过去被动 was sent。",
        "sentence": "The letter was sent yesterday.",
        "zh": "信昨天被寄出。"
      },
      {
        "q": "Rice _____ in the south of China.",
        "opts": [
          "grows",
          "is grown",
          "grew"
        ],
        "ans": 1,
        "hint": "水稻被种植 → is grown。",
        "sentence": "Rice is grown in the south of China.",
        "zh": "中国南方种植水稻。"
      },
      {
        "q": "The classroom _____ cleaned every day.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "classroom 是单数，用 is",
        "sentence": "The classroom is cleaned every day.",
        "zh": "教室每天都被打扫。"
      },
      {
        "q": "English _____ spoken in many countries.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 0,
        "hint": "English 是单数，用 is",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The windows _____ cleaned by the students yesterday.",
        "opts": [
          "were",
          "was",
          "are"
        ],
        "ans": 0,
        "hint": "windows 是复数，且是昨天，用 were",
        "sentence": "The windows were cleaned by the students yesterday.",
        "zh": "窗户昨天被学生们打扫了。"
      },
      {
        "q": "The panda _____ loved by people all over the world.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "panda 是单数，用 is",
        "sentence": "The panda is loved by people all over the world.",
        "zh": "熊猫被全世界的人们喜爱。"
      },
      {
        "q": "The dinner _____ cooked by my mother every evening.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every evening 表示现在习惯，dinner 单数用 is",
        "sentence": "The dinner is cooked by my mother every evening.",
        "zh": "晚餐是我妈妈每天晚上做的。"
      },
      {
        "q": "The bus _____ stopped at the red light now.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "now 表示现在，bus 单数用 is",
        "sentence": "The bus is stopped at the red light now.",
        "zh": "公交车现在在红灯前停下了。"
      },
      {
        "q": "The apple _____ eaten by the little boy.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "apple 单数用 is",
        "sentence": "The apple is eaten by the little boy.",
        "zh": "苹果被小男孩吃了。"
      },
      {
        "q": "The library _____ opened at nine o'clock.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "图书馆开门是事实，用 is",
        "sentence": "The library is opened at nine o'clock.",
        "zh": "图书馆九点开门。"
      },
      {
        "q": "The window _____ broken by the boy yesterday.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "yesterday 用过去时，window 单数用 was",
        "sentence": "The window was broken by the boy yesterday.",
        "zh": "窗户昨天被男孩打破了。"
      },
      {
        "q": "The basketball game _____ watched by many students last week.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "last week 用过去时，game 单数用 was",
        "sentence": "The basketball game was watched by many students last week.",
        "zh": "篮球比赛上周被很多学生观看了。"
      },
      {
        "q": "The doctor _____ called in the middle of the night.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生的事，doctor 单数用 was",
        "sentence": "The doctor was called in the middle of the night.",
        "zh": "医生在半夜被叫来了。"
      },
      {
        "q": "The piano _____ played by Lily at the party.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，piano 单数用 was",
        "sentence": "The piano was played by Lily at the party.",
        "zh": "钢琴在聚会上由莉莉演奏。"
      },
      {
        "q": "The cat _____ found under the chair.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，cat 单数用 was",
        "sentence": "The cat was found under the chair.",
        "zh": "猫在椅子下面被找到了。"
      },
      {
        "q": "The moon _____ seen from the window last night.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "last night 用过去时，moon 单数用 was",
        "sentence": "The moon was seen from the window last night.",
        "zh": "昨晚从窗户看到了月亮。"
      },
      {
        "q": "The playground _____ cleaned by the students after school.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，playground 单数用 was",
        "sentence": "The playground was cleaned by the students after school.",
        "zh": "放学后操场被学生们打扫了。"
      },
      {
        "q": "The shop _____ closed at six yesterday.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "yesterday 用过去时，shop 单数用 was",
        "sentence": "The shop was closed at six yesterday.",
        "zh": "商店昨天六点关门了。"
      },
      {
        "q": "The taller boy _____ chosen to carry the flag.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "现在发生，boy 单数用 is",
        "sentence": "The taller boy is chosen to carry the flag.",
        "zh": "那个更高的男孩被选中举旗。"
      },
      {
        "q": "The story _____ told by the teacher every Monday.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every Monday 用现在时，story 单数用 is",
        "sentence": "The story is told by the teacher every Monday.",
        "zh": "老师每个星期一都讲这个故事。"
      },
      {
        "q": "The homework _____ finished by the students before dinner.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "现在习惯，homework 不可数用 is",
        "sentence": "The homework is finished by the students before dinner.",
        "zh": "作业在晚饭前被学生们完成。"
      },
      {
        "q": "The books _____ returned to the library every Friday.",
        "opts": [
          "are",
          "is",
          "was"
        ],
        "ans": 0,
        "hint": "books 复数用 are",
        "sentence": "The books are returned to the library every Friday.",
        "zh": "书每星期五被还回图书馆。"
      },
      {
        "q": "The new words _____ written on the blackboard.",
        "opts": [
          "are",
          "is",
          "was"
        ],
        "ans": 0,
        "hint": "words 复数用 are",
        "sentence": "The new words are written on the blackboard.",
        "zh": "新单词被写在黑板上。"
      },
      {
        "q": "The hot pot _____ enjoyed by many people in Chengdu.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "hot pot 单数用 is",
        "sentence": "The hot pot is enjoyed by many people in Chengdu.",
        "zh": "火锅被成都的很多人喜爱。"
      },
      {
        "q": "The bus ticket _____ bought at the station.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "ticket 单数用 is",
        "sentence": "The bus ticket is bought at the station.",
        "zh": "公交车票在车站被购买。"
      },
      {
        "q": "The picture _____ drawn by the little girl on the wall.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "picture 单数用 is",
        "sentence": "The picture is drawn by the little girl on the wall.",
        "zh": "这幅画被小女孩画在墙上。"
      },
      {
        "q": "The umbrella _____ put near the door by my father.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "umbrella 单数用 is",
        "sentence": "The umbrella is put near the door by my father.",
        "zh": "雨伞被我爸爸放在门边。"
      },
      {
        "q": "The dinner _____ eaten by the family at seven.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，dinner 单数用 was",
        "sentence": "The dinner was eaten by the family at seven.",
        "zh": "晚餐七点被家人吃了。"
      },
      {
        "q": "The bus _____ stopped by the driver at the station.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，bus 单数用 was",
        "sentence": "The bus was stopped by the driver at the station.",
        "zh": "公交车被司机停在车站。"
      },
      {
        "q": "The cat _____ fed by the girl every morning.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every morning 用现在时，cat 单数用 is",
        "sentence": "The cat is fed by the girl every morning.",
        "zh": "猫每天早晨被女孩喂食。"
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
    "image": "w3-pass-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "is spoken",
        "zh": "被说"
      },
      {
        "en": "was written",
        "zh": "被写"
      },
      {
        "en": "are cleaned",
        "zh": "被打扫"
      },
      {
        "en": "by",
        "zh": "被……（执行者）"
      },
      {
        "en": "is cleaned",
        "zh": "被打扫"
      },
      {
        "en": "was broken",
        "zh": "被打破"
      },
      {
        "en": "is loved",
        "zh": "被喜爱"
      },
      {
        "en": "is cooked",
        "zh": "被做"
      },
      {
        "en": "was watched",
        "zh": "被观看"
      },
      {
        "en": "is opened",
        "zh": "被打开"
      },
      {
        "en": "was found",
        "zh": "被找到"
      },
      {
        "en": "is drawn",
        "zh": "被画"
      },
      {
        "en": "was closed",
        "zh": "被关闭"
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
    "image": "w3-pass-hero.jpg",
    "audio": "The classroom is cleaned every afternoon.",
    "opts": [
      "The classroom is cleaned every afternoon.",
      "The classroom cleans every afternoon.",
      "The classroom is cleaning every afternoon."
    ],
    "ans": 0,
    "hint": "被动语态 is cleaned",
    "sentence": "The classroom is cleaned every afternoon.",
    "zh": "教室每天下午被打扫。",
    "questions": [
      {
        "audio": "The classroom is cleaned every afternoon.",
        "opts": [
          "The classroom is cleaned every afternoon.",
          "The classroom cleans every afternoon.",
          "The classroom is cleaning every afternoon."
        ],
        "ans": 0,
        "hint": "被动语态 is cleaned",
        "zh": "教室每天下午被打扫。",
        "sentence": "The classroom is cleaned every afternoon."
      },
      {
        "audio": "The window was broken by the boy.",
        "opts": [
          "The window was broken by the boy.",
          "The window is broken by the boy.",
          "The window was broke by the boy."
        ],
        "ans": 0,
        "hint": "过去时 was + broken",
        "zh": "窗户被男孩打破了。",
        "sentence": "The window was broken by the boy."
      },
      {
        "audio": "The panda is loved by many people.",
        "opts": [
          "The panda is loved by many people.",
          "The panda loves many people.",
          "The panda is love by many people."
        ],
        "ans": 0,
        "hint": "被动语态 is loved",
        "zh": "熊猫被很多人喜爱。",
        "sentence": "The panda is loved by many people."
      },
      {
        "audio": "The dinner was cooked by my mother.",
        "opts": [
          "The dinner was cooked by my mother.",
          "The dinner cooked my mother.",
          "The dinner was cook by my mother."
        ],
        "ans": 0,
        "hint": "过去时 was + cooked",
        "zh": "晚餐是我妈妈做的。",
        "sentence": "The dinner was cooked by my mother."
      },
      {
        "audio": "The bus is stopped at the red light.",
        "opts": [
          "The bus is stopped at the red light.",
          "The bus stops at the red light.",
          "The bus is stop at the red light."
        ],
        "ans": 0,
        "hint": "被动语态 is stopped",
        "zh": "公交车在红灯前停下。",
        "sentence": "The bus is stopped at the red light."
      },
      {
        "audio": "The apple is eaten by the little girl.",
        "opts": [
          "The apple is eaten by the little girl.",
          "The apple eats the little girl.",
          "The apple is ate by the little girl."
        ],
        "ans": 0,
        "hint": "被动语态 is eaten",
        "zh": "苹果被小女孩吃了。",
        "sentence": "The apple is eaten by the little girl."
      },
      {
        "audio": "The library was opened at nine.",
        "opts": [
          "The library was opened at nine.",
          "The library opened at nine.",
          "The library was open at nine."
        ],
        "ans": 0,
        "hint": "过去时 was + opened",
        "zh": "图书馆九点被打开。",
        "sentence": "The library was opened at nine."
      },
      {
        "audio": "The cat was found under the chair.",
        "opts": [
          "The cat was found under the chair.",
          "The cat found under the chair.",
          "The cat was find under the chair."
        ],
        "ans": 0,
        "hint": "过去时 was + found",
        "zh": "猫在椅子下被找到。",
        "sentence": "The cat was found under the chair."
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
    "image": "w3-pass-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "English is spoken in many countries.",
        "zh": "许多国家都说英语。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The classroom is cleaned every afternoon.",
        "zh": "教室每天下午都被打扫。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The panda is loved by people all over the world.",
        "zh": "熊猫被全世界的人们喜爱。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The bus is stopped at the red light.",
        "zh": "公交车在红灯前停了下来。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The dinner is cooked by my mother every evening.",
        "zh": "晚餐是我妈妈每天晚上做的。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The umbrella is put near the door.",
        "zh": "雨伞被放在门边。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The apple is eaten by the little boy.",
        "zh": "苹果被小男孩吃了。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The library is opened at nine o'clock.",
        "zh": "图书馆九点开门。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The window was broken by the strong wind yesterday.",
        "zh": "窗户昨天被大风打破了。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "The basketball game was watched by many students.",
        "zh": "篮球比赛被很多学生观看了。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "The doctor was called in the middle of the night.",
        "zh": "医生在半夜被叫来了。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The piano was played by Lily at the party.",
        "zh": "钢琴在聚会上由莉莉演奏。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The cat was found under the chair.",
        "zh": "猫在椅子下面被找到了。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "The moon was seen from the window last night.",
        "zh": "昨晚从窗户看到了月亮。",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "The playground was cleaned by the students after school.",
        "zh": "放学后操场被学生们打扫了。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The shop was closed at six yesterday.",
        "zh": "商店昨天六点关门了。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "The taller boy is chosen to carry the flag.",
        "zh": "那个更高的男孩被选中举旗。",
        "tag": "writing_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "The story is told by the teacher every Monday.",
        "zh": "老师每个星期一都讲这个故事。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The homework is finished by the students before dinner.",
        "zh": "作业在晚饭前被学生们完成。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The books are returned to the library every Friday.",
        "zh": "书每星期五被还回图书馆。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The new words are written on the blackboard.",
        "zh": "新单词被写在黑板上。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The hot pot is enjoyed by many people in Chengdu.",
        "zh": "火锅被成都的很多人喜爱。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The bus ticket is bought at the station.",
        "zh": "公交车票在车站被购买。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The picture is drawn by the little girl on the wall.",
        "zh": "这幅画被小女孩画在墙上。",
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
    "image": "w3-pass-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The doctor _____ called in the middle of the night.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生的事，doctor 单数用 was",
        "sentence": "The doctor was called in the middle of the night.",
        "zh": "医生在半夜被叫来了。"
      },
      {
        "q": "The piano _____ played by Lily at the party.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，piano 单数用 was",
        "sentence": "The piano was played by Lily at the party.",
        "zh": "钢琴在聚会上由莉莉演奏。"
      },
      {
        "q": "The cat _____ found under the chair.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，cat 单数用 was",
        "sentence": "The cat was found under the chair.",
        "zh": "猫在椅子下面被找到了。"
      },
      {
        "q": "The moon _____ seen from the window last night.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "last night 用过去时，moon 单数用 was",
        "sentence": "The moon was seen from the window last night.",
        "zh": "昨晚从窗户看到了月亮。"
      },
      {
        "q": "The playground _____ cleaned by the students after school.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，playground 单数用 was",
        "sentence": "The playground was cleaned by the students after school.",
        "zh": "放学后操场被学生们打扫了。"
      },
      {
        "q": "The shop _____ closed at six yesterday.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "yesterday 用过去时，shop 单数用 was",
        "sentence": "The shop was closed at six yesterday.",
        "zh": "商店昨天六点关门了。"
      },
      {
        "q": "The taller boy _____ chosen to carry the flag.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "现在发生，boy 单数用 is",
        "sentence": "The taller boy is chosen to carry the flag.",
        "zh": "那个更高的男孩被选中举旗。"
      },
      {
        "q": "The story _____ told by the teacher every Monday.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every Monday 用现在时，story 单数用 is",
        "sentence": "The story is told by the teacher every Monday.",
        "zh": "老师每个星期一都讲这个故事。"
      },
      {
        "q": "The homework _____ finished by the students before dinner.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "现在习惯，homework 不可数用 is",
        "sentence": "The homework is finished by the students before dinner.",
        "zh": "作业在晚饭前被学生们完成。"
      },
      {
        "q": "The books _____ returned to the library every Friday.",
        "opts": [
          "are",
          "is",
          "was"
        ],
        "ans": 0,
        "hint": "books 复数用 are",
        "sentence": "The books are returned to the library every Friday.",
        "zh": "书每星期五被还回图书馆。"
      },
      {
        "q": "The new words _____ written on the blackboard.",
        "opts": [
          "are",
          "is",
          "was"
        ],
        "ans": 0,
        "hint": "words 复数用 are",
        "sentence": "The new words are written on the blackboard.",
        "zh": "新单词被写在黑板上。"
      },
      {
        "q": "The hot pot _____ enjoyed by many people in Chengdu.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "hot pot 单数用 is",
        "sentence": "The hot pot is enjoyed by many people in Chengdu.",
        "zh": "火锅被成都的很多人喜爱。"
      },
      {
        "q": "The bus ticket _____ bought at the station.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "ticket 单数用 is",
        "sentence": "The bus ticket is bought at the station.",
        "zh": "公交车票在车站被购买。"
      },
      {
        "q": "The picture _____ drawn by the little girl on the wall.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "picture 单数用 is",
        "sentence": "The picture is drawn by the little girl on the wall.",
        "zh": "这幅画被小女孩画在墙上。"
      },
      {
        "q": "The umbrella _____ put near the door by my father.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "umbrella 单数用 is",
        "sentence": "The umbrella is put near the door by my father.",
        "zh": "雨伞被我爸爸放在门边。"
      },
      {
        "q": "The dinner _____ eaten by the family at seven.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，dinner 单数用 was",
        "sentence": "The dinner was eaten by the family at seven.",
        "zh": "晚餐七点被家人吃了。"
      },
      {
        "q": "The bus _____ stopped by the driver at the station.",
        "opts": [
          "was",
          "were",
          "is"
        ],
        "ans": 0,
        "hint": "过去发生，bus 单数用 was",
        "sentence": "The bus was stopped by the driver at the station.",
        "zh": "公交车被司机停在车站。"
      },
      {
        "q": "The cat _____ fed by the girl every morning.",
        "opts": [
          "is",
          "are",
          "was"
        ],
        "ans": 0,
        "hint": "every morning 用现在时，cat 单数用 is",
        "sentence": "The cat is fed by the girl every morning.",
        "zh": "猫每天早晨被女孩喂食。"
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
      "主语是承受者 → be + 过去分词",
      "by + 执行者（可省略）",
      "写作：The book was written by…",
      "情态被动：must be finished，初中再学。"
    ],
    "chant": "Be plus past participle — passive voice! The subject receives — that's the choice!",
    "chantSpeak": "Be plus past participle, passive voice! The subject receives, that is the choice!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "被动语态 · 入门",
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