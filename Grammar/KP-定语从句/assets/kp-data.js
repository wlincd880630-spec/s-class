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
    "audio": "The boy who lives next door is my friend.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。",
    "image": "w5-rel-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-rel-hero.jpg",
    "question": "who lives next door 修饰的是谁？",
    "choices": [
      {
        "text": "the boy（指人，用 who）",
        "correct": true,
        "fb": "对了！who 引导定语从句修饰人。"
      },
      {
        "text": "next door（指地点）",
        "correct": false,
        "fb": "next door 是地点状语，不是先行词。"
      },
      {
        "text": "friend（用 which）",
        "correct": false,
        "fb": "先行词是 boy，指人用 who。"
      }
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-rel-hero.jpg",
    "lead": "定语从句用来修饰前面的名词（先行词）。",
    "formula": "名词 + who/which/that + 从句",
    "parts": [
      {
        "mark": "who",
        "label": "指人",
        "example": "the boy who…"
      },
      {
        "mark": "which",
        "label": "指物",
        "example": "the book which…"
      },
      {
        "mark": "that",
        "label": "人/物常可",
        "example": "the girl that…"
      }
    ],
    "samples": [
      {
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的男孩是我的朋友。"
      },
      {
        "sentence": "I like the book that you gave me.",
        "zh": "我喜欢你给我的那本书。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-rel-who.jpg",
    "rightImage": "w5-rel-which.jpg",
    "leftLabel": "who 指人",
    "rightLabel": "which/that 指物",
    "leftSentence": "The girl who sings well is my sister.",
    "leftZh": "唱歌好的那个女孩是我姐姐。",
    "rightSentence": "The book which is on the desk is mine.",
    "rightZh": "桌上那本书是我的。",
    "morphBase": "who",
    "morphPast": "which",
    "morphHighlight": "",
    "discovery": "who 指人；which/that 指物；定语从句紧跟先行词，说明是哪一个。"
  },
  {
    "section": "精讲",
    "title": "例句 · who 指人",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-rel-hero.jpg",
    "lead": "the boy 是人 → who。",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的男孩是我的朋友。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · which 指物",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-rel-hero.jpg",
    "lead": "the story 是物 → which/that。",
    "sentence": "This is the story which we read yesterday.",
    "zh": "这就是我们昨天读的故事。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "哪本书？",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "用that或which来指代东西。",
    "sentence": "I like the book that you gave me.",
    "zh": "我喜欢你给我的那本书。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "熊猫吃什么？",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "动物也可以用which或that。",
    "sentence": "The panda which eats bamboo is in the zoo.",
    "zh": "吃竹子的熊猫在动物园里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-rel-hero.jpg",
    "lead": "关系代词 who / which / that。",
    "rules": [
      {
        "tab": "who",
        "rule": "先行词是人 → who + 从句",
        "focusVerb": "who",
        "examples": [
          {
            "from": "the boy",
            "to": "who lives next door"
          }
        ],
        "sample": "The boy who lives next door is my friend.",
        "sampleZh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "tab": "which/that",
        "rule": "先行词是物 → which 或 that + 从句",
        "focusVerb": "which",
        "examples": [
          {
            "from": "the book",
            "to": "which is on the desk"
          }
        ],
        "sample": "The book which is on the desk is mine.",
        "sampleZh": "桌上那本书是我的。"
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
    "image": "w5-rel-hero.jpg",
    "buckets": [
      {
        "key": "who",
        "label": "who 指人"
      },
      {
        "key": "which",
        "label": "which/that 指物"
      }
    ],
    "items": [
      {
        "text": "The man who teaches us",
        "bucket": "who"
      },
      {
        "text": "The dog which is cute",
        "bucket": "which"
      },
      {
        "text": "The student who runs fast",
        "bucket": "who"
      },
      {
        "text": "The film that we watched",
        "bucket": "which"
      },
      {
        "text": "The teacher who is kind",
        "bucket": "who"
      },
      {
        "text": "The bag that is red",
        "bucket": "which"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-rel-hero.jpg",
    "question": "「The girl which won the race is from our class.」应改成？",
    "choices": [
      {
        "text": "who（人不用 which）",
        "correct": true,
        "fb": "指人用 who/that，不用 which。"
      },
      {
        "text": "where",
        "correct": false,
        "fb": "where 指地点。"
      },
      {
        "text": "what",
        "correct": false,
        "fb": "定语从句不用 what 引导。"
      }
    ],
    "sentence": "The girl who won the race is from our class.",
    "zh": "赢得比赛的女孩是我们班的。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-rel-hero.jpg",
    "lead": "把两句合成定语从句。",
    "items": [
      {
        "from": "I have a friend. He can swim well.",
        "fromZh": "我有一个朋友。他游泳很好。",
        "steps": [
          {
            "label": "合成一句",
            "opts": [
              "I have a friend who can swim well.",
              "I have a friend which can swim well.",
              "I have a friend he can swim well."
            ],
            "ans": 0,
            "hint": "friend 是人 → who。",
            "sentence": "I have a friend who can swim well.",
            "zh": "我有一个游泳很好的朋友。"
          }
        ]
      },
      {
        "from": "The girl which won the race is from our class.",
        "fromZh": "赢得赛跑的女孩来自我们班。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The girl who won the race is from our class.",
              "The girl which won the race is from our class.",
              "The girl that won the race is from our class."
            ],
            "ans": 0,
            "hint": "指人用who，不用which",
            "sentence": "The girl who won the race is from our class.",
            "zh": "赢得赛跑的女孩来自我们班。"
          }
        ]
      },
      {
        "from": "The book which is on the table is mine.",
        "fromZh": "桌子上的那本书是我的。",
        "steps": [
          {
            "label": "改成用that的句子",
            "opts": [
              "The book that is on the table is mine.",
              "The book who is on the table is mine.",
              "The book where is on the table is mine."
            ],
            "ans": 0,
            "hint": "that可以指物",
            "sentence": "The book that is on the table is mine.",
            "zh": "桌子上的那本书是我的。"
          }
        ]
      },
      {
        "from": "The man who is my teacher is tall.",
        "fromZh": "那个是我老师的男人很高。",
        "steps": [
          {
            "label": "改成用that的句子",
            "opts": [
              "The man that is my teacher is tall.",
              "The man which is my teacher is tall.",
              "The man where is my teacher is tall."
            ],
            "ans": 0,
            "hint": "that可以指人",
            "sentence": "The man that is my teacher is tall.",
            "zh": "那个是我老师的男人很高。"
          }
        ]
      },
      {
        "from": "The dog which is black is mine.",
        "fromZh": "黑色的狗是我的。",
        "steps": [
          {
            "label": "改成用that的句子",
            "opts": [
              "The dog that is black is mine.",
              "The dog who is black is mine.",
              "The dog where is black is mine."
            ],
            "ans": 0,
            "hint": "that可以指动物",
            "sentence": "The dog that is black is mine.",
            "zh": "黑色的狗是我的。"
          }
        ]
      },
      {
        "from": "The woman who is my aunt lives in Chengdu.",
        "fromZh": "我姑姑住在成都。",
        "steps": [
          {
            "label": "改成用that的句子",
            "opts": [
              "The woman that is my aunt lives in Chengdu.",
              "The woman which is my aunt lives in Chengdu.",
              "The woman where is my aunt lives in Chengdu."
            ],
            "ans": 0,
            "hint": "that可以指人",
            "sentence": "The woman that is my aunt lives in Chengdu.",
            "zh": "我姑姑住在成都。"
          }
        ]
      },
      {
        "from": "The panda which eats bamboo is cute.",
        "fromZh": "吃竹子的熊猫很可爱。",
        "steps": [
          {
            "label": "改成用that的句子",
            "opts": [
              "The panda that eats bamboo is cute.",
              "The panda who eats bamboo is cute.",
              "The panda where eats bamboo is cute."
            ],
            "ans": 0,
            "hint": "that可以指动物",
            "sentence": "The panda that eats bamboo is cute.",
            "zh": "吃竹子的熊猫很可爱。"
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
      "boy",
      "who",
      "lives",
      "next",
      "door",
      "is",
      "my",
      "friend"
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在我隔壁的男孩是我的朋友。",
    "items": [
      {
        "tokens": [
          "The",
          "boy",
          "who",
          "lives",
          "next",
          "door",
          "is",
          "my",
          "friend"
        ],
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在我隔壁的男孩是我的朋友。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "I",
          "like",
          "the",
          "book",
          "that",
          "you",
          "gave",
          "me"
        ],
        "sentence": "I like the book that you gave me.",
        "zh": "我喜欢你给我的那本书。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "The",
          "panda",
          "which",
          "eats",
          "bamboo",
          "is",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "The panda which eats bamboo is in the zoo.",
        "zh": "吃竹子的熊猫在动物园里。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "The",
          "bus",
          "which",
          "goes",
          "to",
          "school",
          "is",
          "always",
          "crowded"
        ],
        "sentence": "The bus which goes to school is always crowded.",
        "zh": "去学校的公交车总是很挤。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "The",
          "apple",
          "that",
          "is",
          "on",
          "the",
          "table",
          "is",
          "for",
          "you"
        ],
        "sentence": "The apple that is on the table is for you.",
        "zh": "桌子上的那个苹果是给你的。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "The",
          "girl",
          "who",
          "won",
          "the",
          "race",
          "is",
          "from",
          "our",
          "class"
        ],
        "sentence": "The girl who won the race is from our class.",
        "zh": "赢得赛跑的女孩来自我们班。",
        "image": "kp3d-playground.png"
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
    "image": "w5-rel-hero.jpg",
    "audio": "The boy who lives next door is my friend.",
    "tokens": [
      "The",
      "boy",
      "who",
      "lives",
      "next",
      "door",
      "is",
      "my",
      "friend"
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "id": "p15",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-rel-hero.jpg",
    "q": "The girl _____ won the race is from our class.",
    "opts": [
      "which",
      "who",
      "what"
    ],
    "ans": 1,
    "hint": "先行词 the girl 指人，用 who。",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-rel-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "The girl _____ won the race is from our class.",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "先行词 the girl 指人，用 who。",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "q": "The book _____ is on the desk is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "book 指物 which/that。",
        "sentence": "The book which is on the desk is mine.",
        "zh": "桌上那本书是我的。"
      },
      {
        "q": "Do you know the man _____ is talking to Miss Li?",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "man 指人 who。",
        "sentence": "Do you know the man who is talking to Miss Li?",
        "zh": "你认识正在和李老师说话的那个人吗？"
      },
      {
        "q": "This is the school _____ I study.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 2,
        "hint": "school 地点，从句缺地点状语 → where。",
        "sentence": "This is the school where I study.",
        "zh": "这是我上学的学校。"
      },
      {
        "q": "I lost the pen _____ I bought yesterday.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "pen 指物 that/which。",
        "sentence": "I lost the pen that I bought yesterday.",
        "zh": "我把昨天买的笔弄丢了。"
      },
      {
        "q": "The students _____ are from Chengdu can speak Sichuan dialect.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "students 指人 who。",
        "sentence": "The students who are from Chengdu can speak Sichuan dialect.",
        "zh": "来自成都的学生会说四川话。"
      },
      {
        "q": "The boy _____ lives next door is my friend.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 0,
        "hint": "指人用who",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在我隔壁的男孩是我的朋友。"
      },
      {
        "q": "I like the book _____ you gave me.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 0,
        "hint": "指物用which或that",
        "sentence": "I like the book which you gave me.",
        "zh": "我喜欢你给我的那本书。"
      },
      {
        "q": "The teacher _____ teaches us English is very kind.",
        "opts": [
          "which",
          "who",
          "whom"
        ],
        "ans": 1,
        "hint": "老师是人，用who",
        "sentence": "The teacher who teaches us English is very kind.",
        "zh": "教我们英语的老师非常和蔼。"
      },
      {
        "q": "The panda _____ eats bamboo is in the zoo.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "熊猫是动物，用which",
        "sentence": "The panda which eats bamboo is in the zoo.",
        "zh": "吃竹子的熊猫在动物园里。"
      },
      {
        "q": "The bus _____ goes to school is always crowded.",
        "opts": [
          "who",
          "which",
          "whose"
        ],
        "ans": 1,
        "hint": "公交车是物",
        "sentence": "The bus which goes to school is always crowded.",
        "zh": "去学校的公交车总是很挤。"
      },
      {
        "q": "The apple _____ is on the table is for you.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "苹果是物，可用that",
        "sentence": "The apple that is on the table is for you.",
        "zh": "桌子上的那个苹果是给你的。"
      },
      {
        "q": "The dog _____ is barking is very noisy.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "狗是动物",
        "sentence": "The dog which is barking is very noisy.",
        "zh": "正在叫的那只狗很吵。"
      },
      {
        "q": "The movie _____ we watched last night was funny.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "电影是物",
        "sentence": "The movie that we watched last night was funny.",
        "zh": "我们昨晚看的电影很有趣。"
      },
      {
        "q": "The woman _____ is talking to my mom is my aunt.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "女人是人",
        "sentence": "The woman who is talking to my mom is my aunt.",
        "zh": "正在和我妈妈说话的那个女人是我姑姑。"
      },
      {
        "q": "The pen _____ you borrowed is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "钢笔是物",
        "sentence": "The pen which you borrowed is mine.",
        "zh": "你借的那支笔是我的。"
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
        "q": "The girl _____ won the race is from our class.",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "先行词 the girl 指人，用 who。",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "q": "The book _____ is on the desk is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "book 指物 which/that。",
        "sentence": "The book which is on the desk is mine.",
        "zh": "桌上那本书是我的。"
      },
      {
        "q": "Do you know the man _____ is talking to Miss Li?",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "man 指人 who。",
        "sentence": "Do you know the man who is talking to Miss Li?",
        "zh": "你认识正在和李老师说话的那个人吗？"
      },
      {
        "q": "This is the school _____ I study.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 2,
        "hint": "school 地点，从句缺地点状语 → where。",
        "sentence": "This is the school where I study.",
        "zh": "这是我上学的学校。"
      },
      {
        "q": "I lost the pen _____ I bought yesterday.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "pen 指物 that/which。",
        "sentence": "I lost the pen that I bought yesterday.",
        "zh": "我把昨天买的笔弄丢了。"
      },
      {
        "q": "The students _____ are from Chengdu can speak Sichuan dialect.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "students 指人 who。",
        "sentence": "The students who are from Chengdu can speak Sichuan dialect.",
        "zh": "来自成都的学生会说四川话。"
      },
      {
        "q": "The boy _____ lives next door is my friend.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 0,
        "hint": "指人用who",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在我隔壁的男孩是我的朋友。"
      },
      {
        "q": "I like the book _____ you gave me.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 0,
        "hint": "指物用which或that",
        "sentence": "I like the book which you gave me.",
        "zh": "我喜欢你给我的那本书。"
      },
      {
        "q": "The teacher _____ teaches us English is very kind.",
        "opts": [
          "which",
          "who",
          "whom"
        ],
        "ans": 1,
        "hint": "老师是人，用who",
        "sentence": "The teacher who teaches us English is very kind.",
        "zh": "教我们英语的老师非常和蔼。"
      },
      {
        "q": "The panda _____ eats bamboo is in the zoo.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "熊猫是动物，用which",
        "sentence": "The panda which eats bamboo is in the zoo.",
        "zh": "吃竹子的熊猫在动物园里。"
      },
      {
        "q": "The bus _____ goes to school is always crowded.",
        "opts": [
          "who",
          "which",
          "whose"
        ],
        "ans": 1,
        "hint": "公交车是物",
        "sentence": "The bus which goes to school is always crowded.",
        "zh": "去学校的公交车总是很挤。"
      },
      {
        "q": "The apple _____ is on the table is for you.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "苹果是物，可用that",
        "sentence": "The apple that is on the table is for you.",
        "zh": "桌子上的那个苹果是给你的。"
      },
      {
        "q": "The dog _____ is barking is very noisy.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "狗是动物",
        "sentence": "The dog which is barking is very noisy.",
        "zh": "正在叫的那只狗很吵。"
      },
      {
        "q": "The movie _____ we watched last night was funny.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "电影是物",
        "sentence": "The movie that we watched last night was funny.",
        "zh": "我们昨晚看的电影很有趣。"
      },
      {
        "q": "The woman _____ is talking to my mom is my aunt.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "女人是人",
        "sentence": "The woman who is talking to my mom is my aunt.",
        "zh": "正在和我妈妈说话的那个女人是我姑姑。"
      },
      {
        "q": "The pen _____ you borrowed is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "钢笔是物",
        "sentence": "The pen which you borrowed is mine.",
        "zh": "你借的那支笔是我的。"
      },
      {
        "q": "The house _____ has a red roof is new.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "房子是物",
        "sentence": "The house that has a red roof is new.",
        "zh": "有红色屋顶的那座房子是新的。"
      },
      {
        "q": "The boy _____ is playing basketball is my brother.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "男孩是人",
        "sentence": "The boy who is playing basketball is my brother.",
        "zh": "正在打篮球的男孩是我哥哥。"
      },
      {
        "q": "The book _____ is on the shelf is about animals.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "书是物",
        "sentence": "The book that is on the shelf is about animals.",
        "zh": "书架上的那本书是关于动物的。"
      },
      {
        "q": "The doctor _____ works in the hospital is very busy.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "医生是人",
        "sentence": "The doctor who works in the hospital is very busy.",
        "zh": "在医院工作的医生非常忙。"
      },
      {
        "q": "The umbrella _____ is broken belongs to Lily.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "伞是物",
        "sentence": "The umbrella that is broken belongs to Lily.",
        "zh": "那把坏了的伞是莉莉的。"
      },
      {
        "q": "The cat _____ is sleeping on the sofa is lazy.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "猫是动物",
        "sentence": "The cat which is sleeping on the sofa is lazy.",
        "zh": "在沙发上睡觉的猫很懒。"
      },
      {
        "q": "The song _____ she sings is very beautiful.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "歌曲是物",
        "sentence": "The song that she sings is very beautiful.",
        "zh": "她唱的那首歌非常动听。"
      },
      {
        "q": "The man _____ is wearing a hat is my uncle.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "男人是人",
        "sentence": "The man who is wearing a hat is my uncle.",
        "zh": "戴帽子的那个男人是我叔叔。"
      },
      {
        "q": "The moon _____ is bright tonight is round.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "月亮是物",
        "sentence": "The moon which is bright tonight is round.",
        "zh": "今晚明亮的月亮是圆的。"
      },
      {
        "q": "The cake _____ I made is for your birthday.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "蛋糕是物",
        "sentence": "The cake that I made is for your birthday.",
        "zh": "我做的蛋糕是为你的生日准备的。"
      },
      {
        "q": "The bus _____ arrives at 7:00 is never late.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "公交车是物",
        "sentence": "The bus which arrives at 7:00 is never late.",
        "zh": "七点到达的公交车从不晚点。"
      },
      {
        "q": "The student _____ studies hard will get good grades.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "学生是人",
        "sentence": "The student who studies hard will get good grades.",
        "zh": "努力学习的学生会取得好成绩。"
      },
      {
        "q": "This is the school _____ I studied before.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "学校是物",
        "sentence": "This is the school which I studied before.",
        "zh": "这是我以前学习的学校。"
      },
      {
        "q": "The children _____ are playing in the park are happy.",
        "opts": [
          "who",
          "which",
          "whose"
        ],
        "ans": 0,
        "hint": "孩子们是人",
        "sentence": "The children who are playing in the park are happy.",
        "zh": "在公园里玩的孩子们很开心。"
      },
      {
        "q": "The hamburger _____ I ate was delicious.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "汉堡是物",
        "sentence": "The hamburger which I ate was delicious.",
        "zh": "我吃的汉堡很好吃。"
      },
      {
        "q": "The girl _____ is reading a book is my sister.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "女孩是人",
        "sentence": "The girl who is reading a book is my sister.",
        "zh": "正在读书的女孩是我妹妹。"
      },
      {
        "q": "The picture _____ is on the wall is very nice.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "图画是物",
        "sentence": "The picture that is on the wall is very nice.",
        "zh": "墙上的那幅画很好看。"
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
        "q": "The girl _____ won the race is from our class.",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "先行词 the girl 指人，用 who。",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "q": "The book _____ is on the desk is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "book 指物 which/that。",
        "sentence": "The book which is on the desk is mine.",
        "zh": "桌上那本书是我的。"
      },
      {
        "q": "Do you know the man _____ is talking to Miss Li?",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "man 指人 who。",
        "sentence": "Do you know the man who is talking to Miss Li?",
        "zh": "你认识正在和李老师说话的那个人吗？"
      },
      {
        "q": "This is the school _____ I study.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 2,
        "hint": "school 地点，从句缺地点状语 → where。",
        "sentence": "This is the school where I study.",
        "zh": "这是我上学的学校。"
      },
      {
        "q": "I lost the pen _____ I bought yesterday.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "pen 指物 that/which。",
        "sentence": "I lost the pen that I bought yesterday.",
        "zh": "我把昨天买的笔弄丢了。"
      },
      {
        "q": "The students _____ are from Chengdu can speak Sichuan dialect.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "students 指人 who。",
        "sentence": "The students who are from Chengdu can speak Sichuan dialect.",
        "zh": "来自成都的学生会说四川话。"
      },
      {
        "q": "The boy _____ lives next door is my friend.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 0,
        "hint": "指人用who",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在我隔壁的男孩是我的朋友。"
      },
      {
        "q": "I like the book _____ you gave me.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 0,
        "hint": "指物用which或that",
        "sentence": "I like the book which you gave me.",
        "zh": "我喜欢你给我的那本书。"
      },
      {
        "q": "The teacher _____ teaches us English is very kind.",
        "opts": [
          "which",
          "who",
          "whom"
        ],
        "ans": 1,
        "hint": "老师是人，用who",
        "sentence": "The teacher who teaches us English is very kind.",
        "zh": "教我们英语的老师非常和蔼。"
      },
      {
        "q": "The panda _____ eats bamboo is in the zoo.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "熊猫是动物，用which",
        "sentence": "The panda which eats bamboo is in the zoo.",
        "zh": "吃竹子的熊猫在动物园里。"
      },
      {
        "q": "The bus _____ goes to school is always crowded.",
        "opts": [
          "who",
          "which",
          "whose"
        ],
        "ans": 1,
        "hint": "公交车是物",
        "sentence": "The bus which goes to school is always crowded.",
        "zh": "去学校的公交车总是很挤。"
      },
      {
        "q": "The apple _____ is on the table is for you.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "苹果是物，可用that",
        "sentence": "The apple that is on the table is for you.",
        "zh": "桌子上的那个苹果是给你的。"
      },
      {
        "q": "The dog _____ is barking is very noisy.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "狗是动物",
        "sentence": "The dog which is barking is very noisy.",
        "zh": "正在叫的那只狗很吵。"
      },
      {
        "q": "The movie _____ we watched last night was funny.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "电影是物",
        "sentence": "The movie that we watched last night was funny.",
        "zh": "我们昨晚看的电影很有趣。"
      },
      {
        "q": "The woman _____ is talking to my mom is my aunt.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "女人是人",
        "sentence": "The woman who is talking to my mom is my aunt.",
        "zh": "正在和我妈妈说话的那个女人是我姑姑。"
      },
      {
        "q": "The pen _____ you borrowed is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "钢笔是物",
        "sentence": "The pen which you borrowed is mine.",
        "zh": "你借的那支笔是我的。"
      },
      {
        "q": "The house _____ has a red roof is new.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "房子是物",
        "sentence": "The house that has a red roof is new.",
        "zh": "有红色屋顶的那座房子是新的。"
      },
      {
        "q": "The boy _____ is playing basketball is my brother.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "男孩是人",
        "sentence": "The boy who is playing basketball is my brother.",
        "zh": "正在打篮球的男孩是我哥哥。"
      },
      {
        "q": "The book _____ is on the shelf is about animals.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "书是物",
        "sentence": "The book that is on the shelf is about animals.",
        "zh": "书架上的那本书是关于动物的。"
      },
      {
        "q": "The doctor _____ works in the hospital is very busy.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "医生是人",
        "sentence": "The doctor who works in the hospital is very busy.",
        "zh": "在医院工作的医生非常忙。"
      },
      {
        "q": "The umbrella _____ is broken belongs to Lily.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "伞是物",
        "sentence": "The umbrella that is broken belongs to Lily.",
        "zh": "那把坏了的伞是莉莉的。"
      },
      {
        "q": "The cat _____ is sleeping on the sofa is lazy.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "猫是动物",
        "sentence": "The cat which is sleeping on the sofa is lazy.",
        "zh": "在沙发上睡觉的猫很懒。"
      },
      {
        "q": "The song _____ she sings is very beautiful.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "歌曲是物",
        "sentence": "The song that she sings is very beautiful.",
        "zh": "她唱的那首歌非常动听。"
      },
      {
        "q": "The man _____ is wearing a hat is my uncle.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "男人是人",
        "sentence": "The man who is wearing a hat is my uncle.",
        "zh": "戴帽子的那个男人是我叔叔。"
      },
      {
        "q": "The moon _____ is bright tonight is round.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "月亮是物",
        "sentence": "The moon which is bright tonight is round.",
        "zh": "今晚明亮的月亮是圆的。"
      },
      {
        "q": "The cake _____ I made is for your birthday.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "蛋糕是物",
        "sentence": "The cake that I made is for your birthday.",
        "zh": "我做的蛋糕是为你的生日准备的。"
      },
      {
        "q": "The bus _____ arrives at 7:00 is never late.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "公交车是物",
        "sentence": "The bus which arrives at 7:00 is never late.",
        "zh": "七点到达的公交车从不晚点。"
      },
      {
        "q": "The student _____ studies hard will get good grades.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "学生是人",
        "sentence": "The student who studies hard will get good grades.",
        "zh": "努力学习的学生会取得好成绩。"
      },
      {
        "q": "This is the school _____ I studied before.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "学校是物",
        "sentence": "This is the school which I studied before.",
        "zh": "这是我以前学习的学校。"
      },
      {
        "q": "The children _____ are playing in the park are happy.",
        "opts": [
          "who",
          "which",
          "whose"
        ],
        "ans": 0,
        "hint": "孩子们是人",
        "sentence": "The children who are playing in the park are happy.",
        "zh": "在公园里玩的孩子们很开心。"
      },
      {
        "q": "The hamburger _____ I ate was delicious.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "汉堡是物",
        "sentence": "The hamburger which I ate was delicious.",
        "zh": "我吃的汉堡很好吃。"
      },
      {
        "q": "The girl _____ is reading a book is my sister.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "女孩是人",
        "sentence": "The girl who is reading a book is my sister.",
        "zh": "正在读书的女孩是我妹妹。"
      },
      {
        "q": "The picture _____ is on the wall is very nice.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "图画是物",
        "sentence": "The picture that is on the wall is very nice.",
        "zh": "墙上的那幅画很好看。"
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
    "image": "w5-rel-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "who",
        "zh": "指人"
      },
      {
        "en": "which",
        "zh": "指物"
      },
      {
        "en": "that",
        "zh": "人/物"
      },
      {
        "en": "where",
        "zh": "指地点"
      },
      {
        "en": "the boy who lives next door",
        "zh": "住隔壁的男孩"
      },
      {
        "en": "the book that you gave me",
        "zh": "你给我的书"
      },
      {
        "en": "the teacher who teaches English",
        "zh": "教英语的老师"
      },
      {
        "en": "the panda which eats bamboo",
        "zh": "吃竹子的熊猫"
      },
      {
        "en": "the bus which goes to school",
        "zh": "去学校的公交车"
      },
      {
        "en": "the apple that is on the table",
        "zh": "桌子上的苹果"
      },
      {
        "en": "the girl who won the race",
        "zh": "赢得赛跑的女孩"
      },
      {
        "en": "the dog which is barking",
        "zh": "正在叫的狗"
      },
      {
        "en": "the movie that we watched",
        "zh": "我们看的电影"
      },
      {
        "en": "the woman who is talking",
        "zh": "正在说话的女人"
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
    "image": "w5-rel-hero.jpg",
    "audio": "The boy who lives next door is my friend.",
    "opts": [
      "The boy who lives next door is my friend.",
      "The boy which lives next door is my friend.",
      "The boy where lives next door is my friend."
    ],
    "ans": 0,
    "hint": "指人用who",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在我隔壁的男孩是我的朋友。",
    "questions": [
      {
        "audio": "The boy who lives next door is my friend.",
        "opts": [
          "The boy who lives next door is my friend.",
          "The boy which lives next door is my friend.",
          "The boy where lives next door is my friend."
        ],
        "ans": 0,
        "hint": "指人用who",
        "zh": "住在我隔壁的男孩是我的朋友。",
        "sentence": "The boy who lives next door is my friend."
      },
      {
        "audio": "I like the book that you gave me.",
        "opts": [
          "I like the book that you gave me.",
          "I like the book who you gave me.",
          "I like the book where you gave me."
        ],
        "ans": 0,
        "hint": "指物用that",
        "zh": "我喜欢你给我的那本书。",
        "sentence": "I like the book that you gave me."
      },
      {
        "audio": "The teacher who teaches us English is very kind.",
        "opts": [
          "The teacher who teaches us English is very kind.",
          "The teacher which teaches us English is very kind.",
          "The teacher where teaches us English is very kind."
        ],
        "ans": 0,
        "hint": "老师是人",
        "zh": "教我们英语的老师非常和蔼。",
        "sentence": "The teacher who teaches us English is very kind."
      },
      {
        "audio": "The panda which eats bamboo is in the zoo.",
        "opts": [
          "The panda which eats bamboo is in the zoo.",
          "The panda who eats bamboo is in the zoo.",
          "The panda where eats bamboo is in the zoo."
        ],
        "ans": 0,
        "hint": "熊猫是动物",
        "zh": "吃竹子的熊猫在动物园里。",
        "sentence": "The panda which eats bamboo is in the zoo."
      },
      {
        "audio": "The bus which goes to school is always crowded.",
        "opts": [
          "The bus which goes to school is always crowded.",
          "The bus who goes to school is always crowded.",
          "The bus where goes to school is always crowded."
        ],
        "ans": 0,
        "hint": "公交车是物",
        "zh": "去学校的公交车总是很挤。",
        "sentence": "The bus which goes to school is always crowded."
      },
      {
        "audio": "The apple that is on the table is for you.",
        "opts": [
          "The apple that is on the table is for you.",
          "The apple who is on the table is for you.",
          "The apple where is on the table is for you."
        ],
        "ans": 0,
        "hint": "苹果是物",
        "zh": "桌子上的那个苹果是给你的。",
        "sentence": "The apple that is on the table is for you."
      },
      {
        "audio": "The girl who won the race is from our class.",
        "opts": [
          "The girl who won the race is from our class.",
          "The girl which won the race is from our class.",
          "The girl where won the race is from our class."
        ],
        "ans": 0,
        "hint": "女孩是人",
        "zh": "赢得赛跑的女孩来自我们班。",
        "sentence": "The girl who won the race is from our class."
      },
      {
        "audio": "The dog which is barking is very noisy.",
        "opts": [
          "The dog which is barking is very noisy.",
          "The dog who is barking is very noisy.",
          "The dog where is barking is very noisy."
        ],
        "ans": 0,
        "hint": "狗是动物",
        "zh": "正在叫的那只狗很吵。",
        "sentence": "The dog which is barking is very noisy."
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
    "image": "w5-rel-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "The boy who lives next door is my friend.",
        "zh": "住在我隔壁的男孩是我的朋友。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I like the book that you gave me.",
        "zh": "我喜欢你给我的那本书。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The teacher who teaches us English is very kind.",
        "zh": "教我们英语的老师非常和蔼。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The panda that eats bamboo is in the zoo.",
        "zh": "吃竹子的熊猫在动物园里。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The bus which goes to school is always crowded.",
        "zh": "去学校的公交车总是很挤。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The apple that is on the table is for you.",
        "zh": "桌子上的那个苹果是给你的。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The girl who won the race is from our class.",
        "zh": "赢得赛跑的女孩来自我们班。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The dog which is barking is very noisy.",
        "zh": "正在叫的那只狗很吵。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "The movie that we watched last night was funny.",
        "zh": "我们昨晚看的电影很有趣。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The woman who is talking to my mom is my aunt.",
        "zh": "正在和我妈妈说话的那个女人是我姑姑。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The pen which you borrowed is mine.",
        "zh": "你借的那支笔是我的。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The house that has a red roof is new.",
        "zh": "有红色屋顶的那座房子是新的。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "The boy who is playing basketball is my brother.",
        "zh": "正在打篮球的男孩是我哥哥。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "The book that is on the shelf is about animals.",
        "zh": "书架上的那本书是关于动物的。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The girl which won the race is from our class. (错误示例)",
        "zh": "赢得赛跑的女孩来自我们班。（错误示例）",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The doctor who works in the hospital is very busy.",
        "zh": "在医院工作的医生非常忙。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The umbrella that is broken belongs to Lily.",
        "zh": "那把坏了的伞是莉莉的。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The cat which is sleeping on the sofa is lazy.",
        "zh": "在沙发上睡觉的猫很懒。",
        "tag": "writing_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "The song that she sings is very beautiful.",
        "zh": "她唱的那首歌非常动听。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The man who is wearing a hat is my uncle.",
        "zh": "戴帽子的那个男人是我叔叔。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "The moon which is bright tonight is round.",
        "zh": "今晚明亮的月亮是圆的。",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "The cake that I made is for your birthday.",
        "zh": "我做的蛋糕是为你的生日准备的。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The bus that arrives at 7:00 is never late.",
        "zh": "七点到达的公交车从不晚点。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The student who studies hard will get good grades.",
        "zh": "努力学习的学生会取得好成绩。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
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
    "image": "w5-rel-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The house _____ has a red roof is new.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "房子是物",
        "sentence": "The house that has a red roof is new.",
        "zh": "有红色屋顶的那座房子是新的。"
      },
      {
        "q": "The boy _____ is playing basketball is my brother.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "男孩是人",
        "sentence": "The boy who is playing basketball is my brother.",
        "zh": "正在打篮球的男孩是我哥哥。"
      },
      {
        "q": "The book _____ is on the shelf is about animals.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "书是物",
        "sentence": "The book that is on the shelf is about animals.",
        "zh": "书架上的那本书是关于动物的。"
      },
      {
        "q": "The doctor _____ works in the hospital is very busy.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "医生是人",
        "sentence": "The doctor who works in the hospital is very busy.",
        "zh": "在医院工作的医生非常忙。"
      },
      {
        "q": "The umbrella _____ is broken belongs to Lily.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "伞是物",
        "sentence": "The umbrella that is broken belongs to Lily.",
        "zh": "那把坏了的伞是莉莉的。"
      },
      {
        "q": "The cat _____ is sleeping on the sofa is lazy.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "猫是动物",
        "sentence": "The cat which is sleeping on the sofa is lazy.",
        "zh": "在沙发上睡觉的猫很懒。"
      },
      {
        "q": "The song _____ she sings is very beautiful.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "歌曲是物",
        "sentence": "The song that she sings is very beautiful.",
        "zh": "她唱的那首歌非常动听。"
      },
      {
        "q": "The man _____ is wearing a hat is my uncle.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "男人是人",
        "sentence": "The man who is wearing a hat is my uncle.",
        "zh": "戴帽子的那个男人是我叔叔。"
      },
      {
        "q": "The moon _____ is bright tonight is round.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "月亮是物",
        "sentence": "The moon which is bright tonight is round.",
        "zh": "今晚明亮的月亮是圆的。"
      },
      {
        "q": "The cake _____ I made is for your birthday.",
        "opts": [
          "that",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "蛋糕是物",
        "sentence": "The cake that I made is for your birthday.",
        "zh": "我做的蛋糕是为你的生日准备的。"
      },
      {
        "q": "The bus _____ arrives at 7:00 is never late.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "公交车是物",
        "sentence": "The bus which arrives at 7:00 is never late.",
        "zh": "七点到达的公交车从不晚点。"
      },
      {
        "q": "The student _____ studies hard will get good grades.",
        "opts": [
          "which",
          "who",
          "whose"
        ],
        "ans": 1,
        "hint": "学生是人",
        "sentence": "The student who studies hard will get good grades.",
        "zh": "努力学习的学生会取得好成绩。"
      },
      {
        "q": "This is the school _____ I studied before.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 0,
        "hint": "学校是物",
        "sentence": "This is the school which I studied before.",
        "zh": "这是我以前学习的学校。"
      },
      {
        "q": "The children _____ are playing in the park are happy.",
        "opts": [
          "who",
          "which",
          "whose"
        ],
        "ans": 0,
        "hint": "孩子们是人",
        "sentence": "The children who are playing in the park are happy.",
        "zh": "在公园里玩的孩子们很开心。"
      },
      {
        "q": "The hamburger _____ I ate was delicious.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "汉堡是物",
        "sentence": "The hamburger which I ate was delicious.",
        "zh": "我吃的汉堡很好吃。"
      },
      {
        "q": "The girl _____ is reading a book is my sister.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "女孩是人",
        "sentence": "The girl who is reading a book is my sister.",
        "zh": "正在读书的女孩是我妹妹。"
      },
      {
        "q": "The picture _____ is on the wall is very nice.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "图画是物",
        "sentence": "The picture that is on the wall is very nice.",
        "zh": "墙上的那幅画很好看。"
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
      "who 修饰人",
      "which/that 修饰物",
      "定语从句紧跟先行词",
      "关系词要紧跟先行词，不要把从句放太远。"
    ],
    "chant": "Who for people, which for things — that's the link that grammar brings!",
    "chantSpeak": "Who for people, which for things, that is the link that grammar brings!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "定语从句 · who / which / that",
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