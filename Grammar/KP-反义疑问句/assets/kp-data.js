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
    "audio": "Let's play basketball, shall we?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？",
    "image": "w5-tag-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-tag-hero.jpg",
    "question": "Let's 开头的反义疑问句用什么？",
    "choices": [
      {
        "text": "shall we（固定搭配）",
        "correct": true,
        "fb": "对了！Let's…, shall we?"
      },
      {
        "text": "will you",
        "correct": false,
        "fb": "Let's 不用 will you。"
      },
      {
        "text": "don't we",
        "correct": false,
        "fb": "Let's 是建议，用 shall we。"
      }
    ],
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-tag-hero.jpg",
    "lead": "前面肯定，后面否定；前面否定，后面肯定。",
    "formula": "陈述句，+ 简短问句？",
    "parts": [
      {
        "mark": "Let's",
        "label": "shall we?",
        "example": "Let's play, shall we?"
      },
      {
        "mark": "祈使句",
        "label": "will you?",
        "example": "Sit down, will you?"
      },
      {
        "mark": "一般",
        "label": "前肯后否",
        "example": "He is tall, isn't he?"
      }
    ],
    "samples": [
      {
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们去打篮球吧，好吗？"
      },
      {
        "sentence": "She likes English, doesn't she?",
        "zh": "她喜欢英语，不是吗？"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-tag-lets.jpg",
    "rightImage": "w5-tag-normal.jpg",
    "leftLabel": "Let's…, shall we?",
    "rightLabel": "He is tall, isn't he?",
    "leftSentence": "Let's go swimming, shall we?",
    "leftZh": "我们去游泳吧，好吗？",
    "rightSentence": "She likes music, doesn't she?",
    "rightZh": "她喜欢音乐，不是吗？",
    "morphBase": "Let's",
    "morphPast": "shall we",
    "morphHighlight": "",
    "discovery": "Let's 用 shall we；陈述句反义问：前肯后否，前否后肯，主语用代词。"
  },
  {
    "section": "精讲",
    "title": "例句 · shall we",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-tag-hero.jpg",
    "lead": "Let's 开头，反问一律 shall we。",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们去打篮球吧，好吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · doesn't she",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-tag-hero.jpg",
    "lead": "前肯 likes，后否 doesn't she。",
    "sentence": "She likes English, doesn't she?",
    "zh": "她喜欢英语，不是吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "前否后肯",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-cat.png",
    "lead": "陈述句是否定的，简短问句用肯定",
    "sentence": "She doesn't like cats, does she?",
    "zh": "她不喜欢猫，是吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "id": "p08",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-tag-hero.jpg",
    "lead": "反义疑问句两大类型。",
    "rules": [
      {
        "tab": "Let's",
        "rule": "Let's + 动词原形, shall we?",
        "focusVerb": "shall",
        "examples": [
          {
            "from": "Let's play",
            "to": "shall we?"
          }
        ],
        "sample": "Let's play basketball, shall we?",
        "sampleZh": "我们打篮球吧，好吗？"
      },
      {
        "tab": "陈述句",
        "rule": "前肯后否，前否后肯；动词/be/助动词与前面一致",
        "focusVerb": "isn't",
        "examples": [
          {
            "from": "He is tall",
            "to": "isn't he?"
          },
          {
            "from": "She doesn't like",
            "to": "does she?"
          }
        ],
        "sample": "She likes music, doesn't she?",
        "sampleZh": "她喜欢音乐，不是吗？"
      }
    ]
  },
  {
    "id": "p09",
    "section": "辨析",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-tag-hero.jpg",
    "buckets": [
      {
        "key": "lets",
        "label": "Let's + shall we"
      },
      {
        "key": "stmt",
        "label": "陈述句反义问"
      }
    ],
    "items": [
      {
        "text": "Let's start, shall we?",
        "bucket": "lets"
      },
      {
        "text": "You are ready, aren't you?",
        "bucket": "stmt"
      },
      {
        "text": "Let's have lunch, shall we?",
        "bucket": "lets"
      },
      {
        "text": "He can't swim, can he?",
        "bucket": "stmt"
      },
      {
        "text": "Let's try again, shall we?",
        "bucket": "lets"
      },
      {
        "text": "They went home, didn't they?",
        "bucket": "stmt"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-tag-hero.jpg",
    "question": "「Let's go to the park, will you?」应改成？",
    "choices": [
      {
        "text": "shall we",
        "correct": true,
        "fb": "Let's 用 shall we，Let us 才常用 will you。"
      },
      {
        "text": "do we",
        "correct": false,
        "fb": "不是 do we。"
      },
      {
        "text": "won't you",
        "correct": false,
        "fb": "Let's 不用 won't you。"
      }
    ],
    "sentence": "Let's go to the park, shall we?",
    "zh": "我们去公园吧，好吗？",
    "id": "p10"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-tag-hero.jpg",
    "lead": "给陈述句补反意疑问。",
    "items": [
      {
        "from": "You are a student.",
        "fromZh": "你是学生。",
        "steps": [
          {
            "label": "补反问",
            "opts": [
              "You are a student, aren't you?",
              "You are a student, are you?",
              "You are a student, don't you?"
            ],
            "ans": 0,
            "hint": "前肯 are → aren't you。",
            "sentence": "You are a student, aren't you?",
            "zh": "你是学生，对吧？"
          }
        ]
      },
      {
        "from": "Let's go to the park, will you?",
        "fromZh": "我们去公园，好吗？",
        "steps": [
          {
            "label": "改成正确的反义疑问句",
            "opts": [
              "Let's go to the park, shall we?",
              "Let's go to the park, do we?",
              "Let's go to the park, aren't we?"
            ],
            "ans": 0,
            "hint": "Let's 开头用 shall we",
            "sentence": "Let's go to the park, shall we?",
            "zh": "我们去公园，好吗？"
          }
        ]
      },
      {
        "from": "She likes English, does she?",
        "fromZh": "她喜欢英语，不是吗？",
        "steps": [
          {
            "label": "改成正确的反义疑问句",
            "opts": [
              "She likes English, doesn't she?",
              "She likes English, isn't she?",
              "She likes English, does she?"
            ],
            "ans": 0,
            "hint": "前肯后否",
            "sentence": "She likes English, doesn't she?",
            "zh": "她喜欢英语，不是吗？"
          }
        ]
      },
      {
        "from": "He is a doctor, is he?",
        "fromZh": "他是医生，不是吗？",
        "steps": [
          {
            "label": "改成正确的反义疑问句",
            "opts": [
              "He is a doctor, isn't he?",
              "He is a doctor, doesn't he?",
              "He is a doctor, is he?"
            ],
            "ans": 0,
            "hint": "前肯后否",
            "sentence": "He is a doctor, isn't he?",
            "zh": "他是医生，不是吗？"
          }
        ]
      },
      {
        "from": "They are playing, are they?",
        "fromZh": "他们在玩，不是吗？",
        "steps": [
          {
            "label": "改成正确的反义疑问句",
            "opts": [
              "They are playing, aren't they?",
              "They are playing, are they?",
              "They are playing, don't they?"
            ],
            "ans": 0,
            "hint": "前肯后否",
            "sentence": "They are playing, aren't they?",
            "zh": "他们在玩，不是吗？"
          }
        ]
      },
      {
        "from": "You have an umbrella, have you?",
        "fromZh": "你有一把伞，不是吗？",
        "steps": [
          {
            "label": "改成正确的反义疑问句",
            "opts": [
              "You have an umbrella, don't you?",
              "You have an umbrella, haven't you?",
              "You have an umbrella, do you?"
            ],
            "ans": 0,
            "hint": "have 表示拥有时用 don't",
            "sentence": "You have an umbrella, don't you?",
            "zh": "你有一把伞，不是吗？"
          }
        ]
      },
      {
        "from": "Let's eat hotpot, don't we?",
        "fromZh": "我们吃火锅，好吗？",
        "steps": [
          {
            "label": "改成正确的反义疑问句",
            "opts": [
              "Let's eat hotpot, shall we?",
              "Let's eat hotpot, will you?",
              "Let's eat hotpot, do we?"
            ],
            "ans": 0,
            "hint": "Let's 用 shall we",
            "sentence": "Let's eat hotpot, shall we?",
            "zh": "我们吃火锅，好吗？"
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
    "image": "kp3d-playground.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "Let's",
      "go",
      "to",
      "the",
      "park,",
      "shall",
      "we"
    ],
    "sentence": "Let's go to the park, shall we?",
    "zh": "我们去公园，好吗？",
    "items": [
      {
        "tokens": [
          "Let's",
          "go",
          "to",
          "the",
          "park,",
          "shall",
          "we"
        ],
        "sentence": "Let's go to the park, shall we?",
        "zh": "我们去公园，好吗？",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "She",
          "is",
          "a",
          "teacher,",
          "isn't",
          "she"
        ],
        "sentence": "She is a teacher, isn't she?",
        "zh": "她是老师，不是吗？",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "They",
          "are",
          "eating",
          "dinner,",
          "aren't",
          "they"
        ],
        "sentence": "They are eating dinner, aren't they?",
        "zh": "他们在吃晚饭，不是吗？",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "You",
          "can",
          "play",
          "the",
          "piano,",
          "can't",
          "you"
        ],
        "sentence": "You can play the piano, can't you?",
        "zh": "你会弹钢琴，不是吗？",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "The",
          "panda",
          "is",
          "in",
          "the",
          "zoo,",
          "isn't",
          "it"
        ],
        "sentence": "The panda is in the zoo, isn't it?",
        "zh": "熊猫在动物园里，不是吗？",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "Let's",
          "buy",
          "some",
          "apples,",
          "shall",
          "we"
        ],
        "sentence": "Let's buy some apples, shall we?",
        "zh": "我们买些苹果，好吗？",
        "image": "kp3d-shop.png"
      }
    ],
    "id": "p12"
  },
  {
    "id": "p13",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-tag-hero.jpg",
    "audio": "Let's play basketball, shall we?",
    "tokens": [
      "Let's",
      "play",
      "basketball",
      "shall",
      "we"
    ],
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？"
  },
  {
    "id": "p14",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-tag-hero.jpg",
    "q": "Let's go to the park, _____?",
    "opts": [
      "will you",
      "shall we",
      "do we"
    ],
    "ans": 1,
    "hint": "Let's 固定用 shall we。",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-tag-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "Let's go to the park, _____?",
        "opts": [
          "will you",
          "shall we",
          "do we"
        ],
        "ans": 1,
        "hint": "Let's 固定用 shall we。",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们打篮球吧，好吗？"
      },
      {
        "q": "He can swim, _____?",
        "opts": [
          "can he",
          "can't he",
          "doesn't he"
        ],
        "ans": 1,
        "hint": "前肯 can，后否 can't he。",
        "sentence": "He can swim, can't he?",
        "zh": "他会游泳，不是吗？"
      },
      {
        "q": "They don't like coffee, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否 don't，后肯 do they。",
        "sentence": "They don't like coffee, do they?",
        "zh": "他们不喜欢咖啡，是吗？"
      },
      {
        "q": "Open the door, _____?",
        "opts": [
          "shall we",
          "will you",
          "do you"
        ],
        "ans": 1,
        "hint": "祈使句 will you。",
        "sentence": "Open the door, will you?",
        "zh": "打开门，好吗？"
      },
      {
        "q": "There is a book, _____?",
        "opts": [
          "isn't there",
          "isn't it",
          "is there"
        ],
        "ans": 0,
        "hint": "There be 反问用 there。",
        "sentence": "There is a book, isn't there?",
        "zh": "有一本书，对吧？"
      },
      {
        "q": "Let's have a rest, _____?",
        "opts": [
          "will you",
          "shall we",
          "don't we"
        ],
        "ans": 1,
        "hint": "Let's → shall we。",
        "sentence": "Let's have a rest, shall we?",
        "zh": "我们休息一下吧，好吗？"
      },
      {
        "q": "Let's play basketball, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 的反义疑问句固定用 shall we",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们去打篮球，好吗？"
      },
      {
        "q": "She likes English, _____?",
        "opts": [
          "doesn't she",
          "does she",
          "isn't she"
        ],
        "ans": 0,
        "hint": "前肯后否，likes 用 doesn't",
        "sentence": "She likes English, doesn't she?",
        "zh": "她喜欢英语，不是吗？"
      },
      {
        "q": "He is a doctor, _____?",
        "opts": [
          "isn't he",
          "is he",
          "doesn't he"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "He is a doctor, isn't he?",
        "zh": "他是医生，不是吗？"
      },
      {
        "q": "They are playing on the playground, _____?",
        "opts": [
          "aren't they",
          "are they",
          "don't they"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "They are playing on the playground, aren't they?",
        "zh": "他们在操场上玩，不是吗？"
      },
      {
        "q": "You have an umbrella, _____?",
        "opts": [
          "don't you",
          "do you",
          "haven't you"
        ],
        "ans": 0,
        "hint": "have 表示拥有时，反义疑问句用 don't",
        "sentence": "You have an umbrella, don't you?",
        "zh": "你有一把伞，不是吗？"
      },
      {
        "q": "The cat is sleeping, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The cat is sleeping, isn't it?",
        "zh": "猫在睡觉，不是吗？"
      },
      {
        "q": "We can see the moon, _____?",
        "opts": [
          "can't we",
          "can we",
          "don't we"
        ],
        "ans": 0,
        "hint": "can 的反义疑问句用 can't",
        "sentence": "We can see the moon, can't we?",
        "zh": "我们能看到月亮，不是吗？"
      },
      {
        "q": "The apple is red, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The apple is red, isn't it?",
        "zh": "苹果是红色的，不是吗？"
      },
      {
        "q": "Tom is taller than Mike, _____?",
        "opts": [
          "isn't he",
          "is he",
          "doesn't he"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "Tom is taller than Mike, isn't he?",
        "zh": "汤姆比迈克高，不是吗？"
      },
      {
        "q": "Let's take the bus, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's take the bus, shall we?",
        "zh": "我们坐公交车，好吗？"
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
        "q": "Let's go to the park, _____?",
        "opts": [
          "will you",
          "shall we",
          "do we"
        ],
        "ans": 1,
        "hint": "Let's 固定用 shall we。",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们打篮球吧，好吗？"
      },
      {
        "q": "He can swim, _____?",
        "opts": [
          "can he",
          "can't he",
          "doesn't he"
        ],
        "ans": 1,
        "hint": "前肯 can，后否 can't he。",
        "sentence": "He can swim, can't he?",
        "zh": "他会游泳，不是吗？"
      },
      {
        "q": "They don't like coffee, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否 don't，后肯 do they。",
        "sentence": "They don't like coffee, do they?",
        "zh": "他们不喜欢咖啡，是吗？"
      },
      {
        "q": "Open the door, _____?",
        "opts": [
          "shall we",
          "will you",
          "do you"
        ],
        "ans": 1,
        "hint": "祈使句 will you。",
        "sentence": "Open the door, will you?",
        "zh": "打开门，好吗？"
      },
      {
        "q": "There is a book, _____?",
        "opts": [
          "isn't there",
          "isn't it",
          "is there"
        ],
        "ans": 0,
        "hint": "There be 反问用 there。",
        "sentence": "There is a book, isn't there?",
        "zh": "有一本书，对吧？"
      },
      {
        "q": "Let's have a rest, _____?",
        "opts": [
          "will you",
          "shall we",
          "don't we"
        ],
        "ans": 1,
        "hint": "Let's → shall we。",
        "sentence": "Let's have a rest, shall we?",
        "zh": "我们休息一下吧，好吗？"
      },
      {
        "q": "Let's play basketball, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 的反义疑问句固定用 shall we",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们去打篮球，好吗？"
      },
      {
        "q": "She likes English, _____?",
        "opts": [
          "doesn't she",
          "does she",
          "isn't she"
        ],
        "ans": 0,
        "hint": "前肯后否，likes 用 doesn't",
        "sentence": "She likes English, doesn't she?",
        "zh": "她喜欢英语，不是吗？"
      },
      {
        "q": "He is a doctor, _____?",
        "opts": [
          "isn't he",
          "is he",
          "doesn't he"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "He is a doctor, isn't he?",
        "zh": "他是医生，不是吗？"
      },
      {
        "q": "They are playing on the playground, _____?",
        "opts": [
          "aren't they",
          "are they",
          "don't they"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "They are playing on the playground, aren't they?",
        "zh": "他们在操场上玩，不是吗？"
      },
      {
        "q": "You have an umbrella, _____?",
        "opts": [
          "don't you",
          "do you",
          "haven't you"
        ],
        "ans": 0,
        "hint": "have 表示拥有时，反义疑问句用 don't",
        "sentence": "You have an umbrella, don't you?",
        "zh": "你有一把伞，不是吗？"
      },
      {
        "q": "The cat is sleeping, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The cat is sleeping, isn't it?",
        "zh": "猫在睡觉，不是吗？"
      },
      {
        "q": "We can see the moon, _____?",
        "opts": [
          "can't we",
          "can we",
          "don't we"
        ],
        "ans": 0,
        "hint": "can 的反义疑问句用 can't",
        "sentence": "We can see the moon, can't we?",
        "zh": "我们能看到月亮，不是吗？"
      },
      {
        "q": "The apple is red, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The apple is red, isn't it?",
        "zh": "苹果是红色的，不是吗？"
      },
      {
        "q": "Tom is taller than Mike, _____?",
        "opts": [
          "isn't he",
          "is he",
          "doesn't he"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "Tom is taller than Mike, isn't he?",
        "zh": "汤姆比迈克高，不是吗？"
      },
      {
        "q": "Let's take the bus, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's take the bus, shall we?",
        "zh": "我们坐公交车，好吗？"
      },
      {
        "q": "Let's eat hotpot, _____?",
        "opts": [
          "shall we",
          "will you",
          "don't we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's eat hotpot, shall we?",
        "zh": "我们吃火锅，好吗？"
      },
      {
        "q": "She doesn't like cats, _____?",
        "opts": [
          "does she",
          "doesn't she",
          "is she"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "She doesn't like cats, does she?",
        "zh": "她不喜欢猫，是吗？"
      },
      {
        "q": "He isn't a teacher, _____?",
        "opts": [
          "is he",
          "isn't he",
          "does he"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "He isn't a teacher, is he?",
        "zh": "他不是老师，是吗？"
      },
      {
        "q": "They don't play basketball, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "They don't play basketball, do they?",
        "zh": "他们不打篮球，是吗？"
      },
      {
        "q": "You aren't a student, _____?",
        "opts": [
          "are you",
          "aren't you",
          "do you"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "You aren't a student, are you?",
        "zh": "你不是学生，是吗？"
      },
      {
        "q": "Let's clean the classroom, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's clean the classroom, shall we?",
        "zh": "我们打扫教室，好吗？"
      },
      {
        "q": "Let's open the window, _____?",
        "opts": [
          "shall we",
          "will you",
          "don't we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's open the window, shall we?",
        "zh": "我们打开窗户，好吗？"
      },
      {
        "q": "Let's play the piano, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's play the piano, shall we?",
        "zh": "我们弹钢琴，好吗？"
      },
      {
        "q": "She is a doctor, _____?",
        "opts": [
          "isn't she",
          "is she",
          "doesn't she"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "She is a doctor, isn't she?",
        "zh": "她是医生，不是吗？"
      },
      {
        "q": "He has a cat, _____?",
        "opts": [
          "doesn't he",
          "does he",
          "hasn't he"
        ],
        "ans": 0,
        "hint": "has 表示拥有时，反义疑问句用 doesn't",
        "sentence": "He has a cat, doesn't he?",
        "zh": "他有一只猫，不是吗？"
      },
      {
        "q": "They are in the library, _____?",
        "opts": [
          "aren't they",
          "are they",
          "don't they"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "They are in the library, aren't they?",
        "zh": "他们在图书馆，不是吗？"
      },
      {
        "q": "We are good friends, _____?",
        "opts": [
          "aren't we",
          "are we",
          "don't we"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "We are good friends, aren't we?",
        "zh": "我们是好朋友，不是吗？"
      },
      {
        "q": "The bus is coming, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The bus is coming, isn't it?",
        "zh": "公交车来了，不是吗？"
      },
      {
        "q": "The panda is cute, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The panda is cute, isn't it?",
        "zh": "熊猫很可爱，不是吗？"
      },
      {
        "q": "Let's go shopping, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's go shopping, shall we?",
        "zh": "我们去购物，好吗？"
      },
      {
        "q": "She can swim, _____?",
        "opts": [
          "can't she",
          "can she",
          "doesn't she"
        ],
        "ans": 0,
        "hint": "can 的反义疑问句用 can't",
        "sentence": "She can swim, can't she?",
        "zh": "她会游泳，不是吗？"
      },
      {
        "q": "You like pandas, _____?",
        "opts": [
          "don't you",
          "do you",
          "aren't you"
        ],
        "ans": 0,
        "hint": "like 是实义动词，用 don't",
        "sentence": "You like pandas, don't you?",
        "zh": "你喜欢熊猫，不是吗？"
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
        "q": "Let's go to the park, _____?",
        "opts": [
          "will you",
          "shall we",
          "do we"
        ],
        "ans": 1,
        "hint": "Let's 固定用 shall we。",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们打篮球吧，好吗？"
      },
      {
        "q": "He can swim, _____?",
        "opts": [
          "can he",
          "can't he",
          "doesn't he"
        ],
        "ans": 1,
        "hint": "前肯 can，后否 can't he。",
        "sentence": "He can swim, can't he?",
        "zh": "他会游泳，不是吗？"
      },
      {
        "q": "They don't like coffee, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否 don't，后肯 do they。",
        "sentence": "They don't like coffee, do they?",
        "zh": "他们不喜欢咖啡，是吗？"
      },
      {
        "q": "Open the door, _____?",
        "opts": [
          "shall we",
          "will you",
          "do you"
        ],
        "ans": 1,
        "hint": "祈使句 will you。",
        "sentence": "Open the door, will you?",
        "zh": "打开门，好吗？"
      },
      {
        "q": "There is a book, _____?",
        "opts": [
          "isn't there",
          "isn't it",
          "is there"
        ],
        "ans": 0,
        "hint": "There be 反问用 there。",
        "sentence": "There is a book, isn't there?",
        "zh": "有一本书，对吧？"
      },
      {
        "q": "Let's have a rest, _____?",
        "opts": [
          "will you",
          "shall we",
          "don't we"
        ],
        "ans": 1,
        "hint": "Let's → shall we。",
        "sentence": "Let's have a rest, shall we?",
        "zh": "我们休息一下吧，好吗？"
      },
      {
        "q": "Let's play basketball, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 的反义疑问句固定用 shall we",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们去打篮球，好吗？"
      },
      {
        "q": "She likes English, _____?",
        "opts": [
          "doesn't she",
          "does she",
          "isn't she"
        ],
        "ans": 0,
        "hint": "前肯后否，likes 用 doesn't",
        "sentence": "She likes English, doesn't she?",
        "zh": "她喜欢英语，不是吗？"
      },
      {
        "q": "He is a doctor, _____?",
        "opts": [
          "isn't he",
          "is he",
          "doesn't he"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "He is a doctor, isn't he?",
        "zh": "他是医生，不是吗？"
      },
      {
        "q": "They are playing on the playground, _____?",
        "opts": [
          "aren't they",
          "are they",
          "don't they"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "They are playing on the playground, aren't they?",
        "zh": "他们在操场上玩，不是吗？"
      },
      {
        "q": "You have an umbrella, _____?",
        "opts": [
          "don't you",
          "do you",
          "haven't you"
        ],
        "ans": 0,
        "hint": "have 表示拥有时，反义疑问句用 don't",
        "sentence": "You have an umbrella, don't you?",
        "zh": "你有一把伞，不是吗？"
      },
      {
        "q": "The cat is sleeping, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The cat is sleeping, isn't it?",
        "zh": "猫在睡觉，不是吗？"
      },
      {
        "q": "We can see the moon, _____?",
        "opts": [
          "can't we",
          "can we",
          "don't we"
        ],
        "ans": 0,
        "hint": "can 的反义疑问句用 can't",
        "sentence": "We can see the moon, can't we?",
        "zh": "我们能看到月亮，不是吗？"
      },
      {
        "q": "The apple is red, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The apple is red, isn't it?",
        "zh": "苹果是红色的，不是吗？"
      },
      {
        "q": "Tom is taller than Mike, _____?",
        "opts": [
          "isn't he",
          "is he",
          "doesn't he"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "Tom is taller than Mike, isn't he?",
        "zh": "汤姆比迈克高，不是吗？"
      },
      {
        "q": "Let's take the bus, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's take the bus, shall we?",
        "zh": "我们坐公交车，好吗？"
      },
      {
        "q": "Let's eat hotpot, _____?",
        "opts": [
          "shall we",
          "will you",
          "don't we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's eat hotpot, shall we?",
        "zh": "我们吃火锅，好吗？"
      },
      {
        "q": "She doesn't like cats, _____?",
        "opts": [
          "does she",
          "doesn't she",
          "is she"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "She doesn't like cats, does she?",
        "zh": "她不喜欢猫，是吗？"
      },
      {
        "q": "He isn't a teacher, _____?",
        "opts": [
          "is he",
          "isn't he",
          "does he"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "He isn't a teacher, is he?",
        "zh": "他不是老师，是吗？"
      },
      {
        "q": "They don't play basketball, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "They don't play basketball, do they?",
        "zh": "他们不打篮球，是吗？"
      },
      {
        "q": "You aren't a student, _____?",
        "opts": [
          "are you",
          "aren't you",
          "do you"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "You aren't a student, are you?",
        "zh": "你不是学生，是吗？"
      },
      {
        "q": "Let's clean the classroom, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's clean the classroom, shall we?",
        "zh": "我们打扫教室，好吗？"
      },
      {
        "q": "Let's open the window, _____?",
        "opts": [
          "shall we",
          "will you",
          "don't we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's open the window, shall we?",
        "zh": "我们打开窗户，好吗？"
      },
      {
        "q": "Let's play the piano, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's play the piano, shall we?",
        "zh": "我们弹钢琴，好吗？"
      },
      {
        "q": "She is a doctor, _____?",
        "opts": [
          "isn't she",
          "is she",
          "doesn't she"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "She is a doctor, isn't she?",
        "zh": "她是医生，不是吗？"
      },
      {
        "q": "He has a cat, _____?",
        "opts": [
          "doesn't he",
          "does he",
          "hasn't he"
        ],
        "ans": 0,
        "hint": "has 表示拥有时，反义疑问句用 doesn't",
        "sentence": "He has a cat, doesn't he?",
        "zh": "他有一只猫，不是吗？"
      },
      {
        "q": "They are in the library, _____?",
        "opts": [
          "aren't they",
          "are they",
          "don't they"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "They are in the library, aren't they?",
        "zh": "他们在图书馆，不是吗？"
      },
      {
        "q": "We are good friends, _____?",
        "opts": [
          "aren't we",
          "are we",
          "don't we"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "We are good friends, aren't we?",
        "zh": "我们是好朋友，不是吗？"
      },
      {
        "q": "The bus is coming, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The bus is coming, isn't it?",
        "zh": "公交车来了，不是吗？"
      },
      {
        "q": "The panda is cute, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The panda is cute, isn't it?",
        "zh": "熊猫很可爱，不是吗？"
      },
      {
        "q": "Let's go shopping, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's go shopping, shall we?",
        "zh": "我们去购物，好吗？"
      },
      {
        "q": "She can swim, _____?",
        "opts": [
          "can't she",
          "can she",
          "doesn't she"
        ],
        "ans": 0,
        "hint": "can 的反义疑问句用 can't",
        "sentence": "She can swim, can't she?",
        "zh": "她会游泳，不是吗？"
      },
      {
        "q": "You like pandas, _____?",
        "opts": [
          "don't you",
          "do you",
          "aren't you"
        ],
        "ans": 0,
        "hint": "like 是实义动词，用 don't",
        "sentence": "You like pandas, don't you?",
        "zh": "你喜欢熊猫，不是吗？"
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
    "image": "w5-tag-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "shall we?",
        "zh": "好吗？（Let's）"
      },
      {
        "en": "will you?",
        "zh": "好吗？（祈使）"
      },
      {
        "en": "isn't he?",
        "zh": "不是吗？"
      },
      {
        "en": "do they?",
        "zh": "是吗？（前否后肯）"
      },
      {
        "en": "Let's play basketball",
        "zh": "我们去打篮球"
      },
      {
        "en": "Shall we?",
        "zh": "好吗？"
      },
      {
        "en": "She likes English",
        "zh": "她喜欢英语"
      },
      {
        "en": "Doesn't she?",
        "zh": "不是吗？"
      },
      {
        "en": "He is a doctor",
        "zh": "他是医生"
      },
      {
        "en": "Isn't he?",
        "zh": "不是吗？"
      },
      {
        "en": "You have an umbrella",
        "zh": "你有一把伞"
      },
      {
        "en": "Don't you?",
        "zh": "不是吗？"
      },
      {
        "en": "Let's go to the library",
        "zh": "我们去图书馆"
      },
      {
        "en": "Will you?",
        "zh": "好吗？（用于祈使句）"
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
    "image": "w5-tag-hero.jpg",
    "audio": "Let's play basketball, shall we?",
    "opts": [
      "Let's play basketball, shall we?",
      "Let's play basketball, will you?",
      "Let's play basketball, don't we?"
    ],
    "ans": 0,
    "hint": "Let's 用 shall we",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们去打篮球，好吗？",
    "questions": [
      {
        "audio": "Let's play basketball, shall we?",
        "opts": [
          "Let's play basketball, shall we?",
          "Let's play basketball, will you?",
          "Let's play basketball, don't we?"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "zh": "我们去打篮球，好吗？",
        "sentence": "Let's play basketball, shall we?"
      },
      {
        "audio": "She likes English, doesn't she?",
        "opts": [
          "She likes English, doesn't she?",
          "She likes English, does she?",
          "She likes English, isn't she?"
        ],
        "ans": 0,
        "hint": "前肯后否",
        "zh": "她喜欢英语，不是吗？",
        "sentence": "She likes English, doesn't she?"
      },
      {
        "audio": "He is a doctor, isn't he?",
        "opts": [
          "He is a doctor, isn't he?",
          "He is a doctor, is he?",
          "He is a doctor, doesn't he?"
        ],
        "ans": 0,
        "hint": "is 用 isn't",
        "zh": "他是医生，不是吗？",
        "sentence": "He is a doctor, isn't he?"
      },
      {
        "audio": "You have an umbrella, don't you?",
        "opts": [
          "You have an umbrella, don't you?",
          "You have an umbrella, have you?",
          "You have an umbrella, do you?"
        ],
        "ans": 0,
        "hint": "have 用 don't",
        "zh": "你有一把伞，不是吗？",
        "sentence": "You have an umbrella, don't you?"
      },
      {
        "audio": "Let's go to the library, shall we?",
        "opts": [
          "Let's go to the library, shall we?",
          "Let's go to the library, will you?",
          "Let's go to the library, don't we?"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "zh": "我们去图书馆，好吗？",
        "sentence": "Let's go to the library, shall we?"
      },
      {
        "audio": "They are playing on the playground, aren't they?",
        "opts": [
          "They are playing on the playground, aren't they?",
          "They are playing on the playground, are they?",
          "They are playing on the playground, don't they?"
        ],
        "ans": 0,
        "hint": "are 用 aren't",
        "zh": "他们在操场上玩，不是吗？",
        "sentence": "They are playing on the playground, aren't they?"
      },
      {
        "audio": "The cat is sleeping, isn't it?",
        "opts": [
          "The cat is sleeping, isn't it?",
          "The cat is sleeping, is it?",
          "The cat is sleeping, doesn't it?"
        ],
        "ans": 0,
        "hint": "is 用 isn't",
        "zh": "猫在睡觉，不是吗？",
        "sentence": "The cat is sleeping, isn't it?"
      },
      {
        "audio": "We can see the moon, can't we?",
        "opts": [
          "We can see the moon, can't we?",
          "We can see the moon, can we?",
          "We can see the moon, don't we?"
        ],
        "ans": 0,
        "hint": "can 用 can't",
        "zh": "我们能看到月亮，不是吗？",
        "sentence": "We can see the moon, can't we?"
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
    "image": "w5-tag-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Let's play basketball, shall we?",
        "zh": "我们去打篮球，好吗？",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "Let's go to the library, shall we?",
        "zh": "我们去图书馆，好吗？",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Let's eat hotpot, shall we?",
        "zh": "我们吃火锅，好吗？",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Let's watch the panda, shall we?",
        "zh": "我们去看熊猫，好吗？",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Let's take the bus, shall we?",
        "zh": "我们坐公交车，好吗？",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Let's clean the classroom, shall we?",
        "zh": "我们打扫教室，好吗？",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Let's open the window, shall we?",
        "zh": "我们打开窗户，好吗？",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "Let's play the piano, shall we?",
        "zh": "我们弹钢琴，好吗？",
        "tag": "daily_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "She likes English, doesn't she?",
        "zh": "她喜欢英语，不是吗？",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "He is a doctor, isn't he?",
        "zh": "他是医生，不是吗？",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "They are playing on the playground, aren't they?",
        "zh": "他们在操场上玩，不是吗？",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "You have an umbrella, don't you?",
        "zh": "你有一把伞，不是吗？",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The cat is sleeping, isn't it?",
        "zh": "猫在睡觉，不是吗？",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "We can see the moon, can't we?",
        "zh": "我们能看到月亮，不是吗？",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "The apple is red, isn't it?",
        "zh": "苹果是红色的，不是吗？",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "Tom is taller than Mike, isn't he?",
        "zh": "汤姆比迈克高，不是吗？",
        "tag": "exam_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "Let's go shopping, shall we?",
        "zh": "我们去购物，好吗？",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "Let's have dinner together, shall we?",
        "zh": "我们一起吃晚饭，好吗？",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Let's visit the museum, shall we?",
        "zh": "我们参观博物馆，好吗？",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Let's draw a picture, shall we?",
        "zh": "我们画一幅画，好吗？",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Let's read a book, shall we?",
        "zh": "我们读一本书，好吗？",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Let's ride a bike, shall we?",
        "zh": "我们骑自行车，好吗？",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "Let's buy some fruit, shall we?",
        "zh": "我们买些水果，好吗？",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "Let's practice English, shall we?",
        "zh": "我们练习英语，好吗？",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
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
    "image": "w5-tag-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "Let's eat hotpot, _____?",
        "opts": [
          "shall we",
          "will you",
          "don't we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's eat hotpot, shall we?",
        "zh": "我们吃火锅，好吗？"
      },
      {
        "q": "She doesn't like cats, _____?",
        "opts": [
          "does she",
          "doesn't she",
          "is she"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "She doesn't like cats, does she?",
        "zh": "她不喜欢猫，是吗？"
      },
      {
        "q": "He isn't a teacher, _____?",
        "opts": [
          "is he",
          "isn't he",
          "does he"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "He isn't a teacher, is he?",
        "zh": "他不是老师，是吗？"
      },
      {
        "q": "They don't play basketball, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "They don't play basketball, do they?",
        "zh": "他们不打篮球，是吗？"
      },
      {
        "q": "You aren't a student, _____?",
        "opts": [
          "are you",
          "aren't you",
          "do you"
        ],
        "ans": 0,
        "hint": "前否后肯",
        "sentence": "You aren't a student, are you?",
        "zh": "你不是学生，是吗？"
      },
      {
        "q": "Let's clean the classroom, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's clean the classroom, shall we?",
        "zh": "我们打扫教室，好吗？"
      },
      {
        "q": "Let's open the window, _____?",
        "opts": [
          "shall we",
          "will you",
          "don't we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's open the window, shall we?",
        "zh": "我们打开窗户，好吗？"
      },
      {
        "q": "Let's play the piano, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's play the piano, shall we?",
        "zh": "我们弹钢琴，好吗？"
      },
      {
        "q": "She is a doctor, _____?",
        "opts": [
          "isn't she",
          "is she",
          "doesn't she"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "She is a doctor, isn't she?",
        "zh": "她是医生，不是吗？"
      },
      {
        "q": "He has a cat, _____?",
        "opts": [
          "doesn't he",
          "does he",
          "hasn't he"
        ],
        "ans": 0,
        "hint": "has 表示拥有时，反义疑问句用 doesn't",
        "sentence": "He has a cat, doesn't he?",
        "zh": "他有一只猫，不是吗？"
      },
      {
        "q": "They are in the library, _____?",
        "opts": [
          "aren't they",
          "are they",
          "don't they"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "They are in the library, aren't they?",
        "zh": "他们在图书馆，不是吗？"
      },
      {
        "q": "We are good friends, _____?",
        "opts": [
          "aren't we",
          "are we",
          "don't we"
        ],
        "ans": 0,
        "hint": "are 的反义疑问句用 aren't",
        "sentence": "We are good friends, aren't we?",
        "zh": "我们是好朋友，不是吗？"
      },
      {
        "q": "The bus is coming, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The bus is coming, isn't it?",
        "zh": "公交车来了，不是吗？"
      },
      {
        "q": "The panda is cute, _____?",
        "opts": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "ans": 0,
        "hint": "is 的反义疑问句用 isn't",
        "sentence": "The panda is cute, isn't it?",
        "zh": "熊猫很可爱，不是吗？"
      },
      {
        "q": "Let's go shopping, _____?",
        "opts": [
          "shall we",
          "will you",
          "do we"
        ],
        "ans": 0,
        "hint": "Let's 用 shall we",
        "sentence": "Let's go shopping, shall we?",
        "zh": "我们去购物，好吗？"
      },
      {
        "q": "She can swim, _____?",
        "opts": [
          "can't she",
          "can she",
          "doesn't she"
        ],
        "ans": 0,
        "hint": "can 的反义疑问句用 can't",
        "sentence": "She can swim, can't she?",
        "zh": "她会游泳，不是吗？"
      },
      {
        "q": "You like pandas, _____?",
        "opts": [
          "don't you",
          "do you",
          "aren't you"
        ],
        "ans": 0,
        "hint": "like 是实义动词，用 don't",
        "sentence": "You like pandas, don't you?",
        "zh": "你喜欢熊猫，不是吗？"
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
    "image": "writing.jpg",
    "checklist": [
      "Let's…, shall we?",
      "前肯后否；前否后肯",
      "反义部分主语用代词",
      "反问部分的主语要用代词，不用名词。"
    ],
    "chant": "Let's plus verb — shall we say? Affirmative first, then the other way!",
    "chantSpeak": "Let's plus verb, shall we say? Affirmative first, then the other way!",
    "id": "p22"
  }
];
  global.KpData = {
    courseTitle: "反义疑问句 · shall we",
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