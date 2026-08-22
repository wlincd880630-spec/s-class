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
    "audio": "The children enjoyed themselves at the party.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。",
    "image": "w5-refl-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-refl-hero.jpg",
    "question": "enjoyed themselves 中 themselves 指谁？",
    "choices": [
      {
        "text": "the children（主语自己）",
        "correct": true,
        "fb": "对了！反身代词指主语本身。"
      },
      {
        "text": "其他孩子",
        "correct": false,
        "fb": "themselves 指主语 the children 自己。"
      },
      {
        "text": "聚会上的大人",
        "correct": false,
        "fb": "反身代词与主语一致。"
      }
    ],
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-refl-hero.jpg",
    "lead": "动作回到主语自己身上时用反身代词。",
    "formula": "I → myself　you → yourself/yourselves　he → himself",
    "parts": [
      {
        "mark": "单数",
        "label": "-self",
        "example": "myself / himself / herself"
      },
      {
        "mark": "复数",
        "label": "-selves",
        "example": "ourselves / themselves"
      }
    ],
    "samples": [
      {
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "sentence": "I can finish it by myself.",
        "zh": "我能自己完成。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-refl-myself.jpg",
    "rightImage": "w5-refl-themselves.jpg",
    "leftLabel": "I → myself",
    "rightLabel": "they → themselves",
    "leftSentence": "I hurt myself when I fell.",
    "leftZh": "我摔倒时伤到了自己。",
    "rightSentence": "They taught themselves to swim.",
    "rightZh": "他们自学游泳。",
    "morphBase": "myself",
    "morphPast": "themselves",
    "morphHighlight": "",
    "discovery": "I→myself, you→yourself, he→himself, she→herself, we→ourselves, they→themselves。"
  },
  {
    "section": "精讲",
    "title": "例句 · enjoyed themselves",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-refl-hero.jpg",
    "lead": "children 复数 → themselves。",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · by myself",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-refl-hero.jpg",
    "lead": "by oneself = 独自。",
    "sentence": "I made the card by myself.",
    "zh": "这张卡片是我自己做的。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "I 和 You：myself 和 yourself",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "I 用 myself，you 用 yourself（单数）或 yourselves（复数）。",
    "sentence": "I made myself a cup of tea. You should try it yourself.",
    "zh": "我给自己泡了杯茶。你应该自己试试。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "He 和 She：himself 和 herself",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-playground.png",
    "lead": "He 用 himself，She 用 herself，注意不要写成 hisself 或 herselves。",
    "sentence": "He taught himself to swim, and she taught herself to dance.",
    "zh": "他自学游泳，她自学跳舞。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "复数形式：ourselves, yourselves, themselves",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "We 用 ourselves，you 复数用 yourselves，they 用 themselves。",
    "sentence": "We enjoyed ourselves at the panda base, and they enjoyed themselves at the park.",
    "zh": "我们在熊猫基地玩得很开心，他们在公园玩得很开心。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-refl-hero.jpg",
    "lead": "反身代词与人称对应。",
    "rules": [
      {
        "tab": "单数",
        "rule": "myself, yourself, himself, herself, itself",
        "focusVerb": "myself",
        "examples": [
          {
            "from": "I",
            "to": "myself"
          },
          {
            "from": "he",
            "to": "himself"
          }
        ],
        "sample": "I hurt myself when I fell.",
        "sampleZh": "我摔倒时伤到了自己。"
      },
      {
        "tab": "复数/常见搭配",
        "rule": "ourselves, yourselves, themselves；enjoy/help/dress + 反身代词",
        "focusVerb": "themselves",
        "examples": [
          {
            "from": "enjoy",
            "to": "enjoy themselves"
          }
        ],
        "sample": "The children enjoyed themselves at the party.",
        "sampleZh": "孩子们在聚会上玩得很开心。"
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
    "image": "w5-refl-hero.jpg",
    "buckets": [
      {
        "key": "sing",
        "label": "单数反身代词"
      },
      {
        "key": "plur",
        "label": "复数反身代词"
      }
    ],
    "items": [
      {
        "text": "myself",
        "bucket": "sing"
      },
      {
        "text": "ourselves",
        "bucket": "plur"
      },
      {
        "text": "yourself",
        "bucket": "sing"
      },
      {
        "text": "themselves",
        "bucket": "plur"
      },
      {
        "text": "himself",
        "bucket": "sing"
      },
      {
        "text": "yourselves",
        "bucket": "plur"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-refl-hero.jpg",
    "question": "「He enjoyed hisself at the picnic.」应改成？",
    "choices": [
      {
        "text": "himself（he → himself）",
        "correct": true,
        "fb": "没有 hisself 这种形式。"
      },
      {
        "text": "him",
        "correct": false,
        "fb": "enjoy 后常用反身。"
      },
      {
        "text": "heself",
        "correct": false,
        "fb": "错误形式。"
      }
    ],
    "sentence": "He enjoyed himself at the picnic.",
    "zh": "他在野餐时玩得很开心。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-refl-hero.jpg",
    "lead": "把 them 改成正确的反身代词。",
    "items": [
      {
        "from": "The students enjoyed them at the picnic.",
        "fromZh": "学生们在野餐时玩得很开心。（错误）",
        "steps": [
          {
            "label": "改正",
            "opts": [
              "The students enjoyed themselves at the picnic.",
              "The students enjoyed themself at the picnic.",
              "The students enjoyed theirselves at the picnic."
            ],
            "ans": 0,
            "hint": "复数 themselves。",
            "sentence": "The students enjoyed themselves at the picnic.",
            "zh": "学生们在野餐时玩得很开心。"
          }
        ]
      },
      {
        "from": "He enjoyed hisself at the picnic.",
        "fromZh": "他在野餐时玩得很开心。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "He enjoyed himself at the picnic.",
              "He enjoyed hisself at the picnic.",
              "He enjoyed him at the picnic."
            ],
            "ans": 0,
            "hint": "hisself 是错误形式，正确是 himself",
            "sentence": "He enjoyed himself at the picnic.",
            "zh": "他在野餐时玩得很开心。"
          }
        ]
      },
      {
        "from": "I can finish it by meself.",
        "fromZh": "我可以自己完成它。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "I can finish it by myself.",
              "I can finish it by meself.",
              "I can finish it by my."
            ],
            "ans": 0,
            "hint": "meself 是错误形式，正确是 myself",
            "sentence": "I can finish it by myself.",
            "zh": "我可以自己完成它。"
          }
        ]
      },
      {
        "from": "She made the cake herselves.",
        "fromZh": "她自己做蛋糕。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "She made the cake herself.",
              "She made the cake herselves.",
              "She made the cake theirself."
            ],
            "ans": 0,
            "hint": "单数用 herself，不是 herselves",
            "sentence": "She made the cake herself.",
            "zh": "她自己做蛋糕。"
          }
        ]
      },
      {
        "from": "We enjoyed ourself at the party.",
        "fromZh": "我们在聚会上玩得很开心。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "We enjoyed ourselves at the party.",
              "We enjoyed ourself at the party.",
              "We enjoyed ourselfs at the party."
            ],
            "ans": 0,
            "hint": "We 是复数，用 ourselves",
            "sentence": "We enjoyed ourselves at the party.",
            "zh": "我们在聚会上玩得很开心。"
          }
        ]
      },
      {
        "from": "They taught theirselves to swim.",
        "fromZh": "他们自学游泳。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "They taught themselves to swim.",
              "They taught theirselves to swim.",
              "They taught theyselves to swim."
            ],
            "ans": 0,
            "hint": "theirselves 是错误形式，正确是 themselves",
            "sentence": "They taught themselves to swim.",
            "zh": "他们自学游泳。"
          }
        ]
      },
      {
        "from": "You should believe in yourselves.",
        "fromZh": "你应该相信自己。",
        "steps": [
          {
            "label": "改成正确形式（对一个人说）",
            "opts": [
              "You should believe in yourself.",
              "You should believe in yourselves.",
              "You should believe in yours."
            ],
            "ans": 0,
            "hint": "对一个人说用 yourself，不是 yourselves",
            "sentence": "You should believe in yourself.",
            "zh": "你应该相信自己。"
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
    "image": "kp3d-dinner.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "made",
      "myself",
      "a",
      "sandwich"
    ],
    "sentence": "I made myself a sandwich.",
    "zh": "我给自己做了个三明治。",
    "items": [
      {
        "tokens": [
          "I",
          "made",
          "myself",
          "a",
          "sandwich"
        ],
        "sentence": "I made myself a sandwich.",
        "zh": "我给自己做了个三明治。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "He",
          "taught",
          "himself",
          "to",
          "play",
          "the",
          "piano"
        ],
        "sentence": "He taught himself to play the piano.",
        "zh": "他自学弹钢琴。",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "She",
          "bought",
          "herself",
          "a",
          "new",
          "umbrella"
        ],
        "sentence": "She bought herself a new umbrella.",
        "zh": "她给自己买了一把新伞。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "They",
          "enjoyed",
          "themselves",
          "at",
          "the",
          "panda",
          "base"
        ],
        "sentence": "They enjoyed themselves at the panda base.",
        "zh": "他们在熊猫基地玩得很开心。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "We",
          "should",
          "take",
          "care",
          "of",
          "ourselves"
        ],
        "sentence": "We should take care of ourselves.",
        "zh": "我们应该照顾好自己。",
        "image": "kp3d-doctor.png"
      },
      {
        "tokens": [
          "You",
          "can",
          "finish",
          "the",
          "book",
          "by",
          "yourself"
        ],
        "sentence": "You can finish the book by yourself.",
        "zh": "你可以自己读完这本书。",
        "image": "kp3d-library.png"
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
    "image": "w5-refl-hero.jpg",
    "audio": "The children enjoyed themselves at the party.",
    "tokens": [
      "The",
      "children",
      "enjoyed",
      "themselves",
      "at",
      "the",
      "party"
    ],
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-refl-hero.jpg",
    "q": "The students enjoyed _____ at the school picnic.",
    "opts": [
      "them",
      "their",
      "themselves"
    ],
    "ans": 2,
    "hint": "enjoy 后指主语自己，用反身代词 themselves。",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-refl-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "The students enjoyed _____ at the school picnic.",
        "opts": [
          "them",
          "their",
          "themselves"
        ],
        "ans": 2,
        "hint": "enjoy 后指主语自己，用反身代词 themselves。",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "Help _____, please. The cakes are for you. (you 复数)",
        "opts": [
          "yourself",
          "yourselves",
          "you"
        ],
        "ans": 1,
        "hint": "你们自己 yourselves。",
        "sentence": "Help yourselves, please.",
        "zh": "请你们随便吃。"
      },
      {
        "q": "She looked at _____ in the mirror.",
        "opts": [
          "her",
          "herself",
          "she"
        ],
        "ans": 1,
        "hint": "看自己 herself。",
        "sentence": "She looked at herself in the mirror.",
        "zh": "她看着镜子里的自己。"
      },
      {
        "q": "We should look after _____.",
        "opts": [
          "us",
          "ourselves",
          "ourself"
        ],
        "ans": 1,
        "hint": "我们自己 ourselves。",
        "sentence": "We should look after ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The little boy can dress _____.",
        "opts": [
          "him",
          "himself",
          "he"
        ],
        "ans": 1,
        "hint": "自己穿衣服 himself。",
        "sentence": "The little boy can dress himself.",
        "zh": "小男孩能自己穿衣服。"
      },
      {
        "q": "Don't worry. I can do it _____.",
        "opts": [
          "me",
          "my",
          "myself"
        ],
        "ans": 2,
        "hint": "by 可省略，myself。",
        "sentence": "I can do it myself.",
        "zh": "我能自己做。"
      },
      {
        "q": "I can do it _____.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I can do it myself.",
        "zh": "我可以自己做这件事。"
      },
      {
        "q": "He enjoyed _____ at the picnic.",
        "opts": [
          "hisself",
          "himself",
          "him"
        ],
        "ans": 1,
        "hint": "himself 是正确形式",
        "sentence": "He enjoyed himself at the picnic.",
        "zh": "他在野餐时玩得很开心。"
      },
      {
        "q": "We should take care of _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We should take care of ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The cat washed _____.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The cat washed itself.",
        "zh": "猫把自己洗干净了。"
      },
      {
        "q": "You and I can finish the work _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You and I = We，用 ourselves",
        "sentence": "You and I can finish the work ourselves.",
        "zh": "你和我可以自己完成工作。"
      },
      {
        "q": "They made the cards _____.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 They，用 themselves",
        "sentence": "They made the cards themselves.",
        "zh": "他们自己做了卡片。"
      },
      {
        "q": "Tom, you should do your homework _____.",
        "opts": [
          "yourself",
          "myself",
          "himself"
        ],
        "ans": 0,
        "hint": "称呼 Tom，用 yourself",
        "sentence": "Tom, you should do your homework yourself.",
        "zh": "汤姆，你应该自己做作业。"
      },
      {
        "q": "The students taught _____ English.",
        "opts": [
          "themselves",
          "ourselves",
          "yourselves"
        ],
        "ans": 0,
        "hint": "主语是 The students，用 themselves",
        "sentence": "The students taught themselves English.",
        "zh": "学生们自学英语。"
      },
      {
        "q": "I hurt _____ when I fell down.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I hurt myself when I fell down.",
        "zh": "我摔倒时弄伤了自己。"
      },
      {
        "q": "She told _____ to be brave.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She told herself to be brave.",
        "zh": "她告诉自己要勇敢。"
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
        "q": "The students enjoyed _____ at the school picnic.",
        "opts": [
          "them",
          "their",
          "themselves"
        ],
        "ans": 2,
        "hint": "enjoy 后指主语自己，用反身代词 themselves。",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "Help _____, please. The cakes are for you. (you 复数)",
        "opts": [
          "yourself",
          "yourselves",
          "you"
        ],
        "ans": 1,
        "hint": "你们自己 yourselves。",
        "sentence": "Help yourselves, please.",
        "zh": "请你们随便吃。"
      },
      {
        "q": "She looked at _____ in the mirror.",
        "opts": [
          "her",
          "herself",
          "she"
        ],
        "ans": 1,
        "hint": "看自己 herself。",
        "sentence": "She looked at herself in the mirror.",
        "zh": "她看着镜子里的自己。"
      },
      {
        "q": "We should look after _____.",
        "opts": [
          "us",
          "ourselves",
          "ourself"
        ],
        "ans": 1,
        "hint": "我们自己 ourselves。",
        "sentence": "We should look after ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The little boy can dress _____.",
        "opts": [
          "him",
          "himself",
          "he"
        ],
        "ans": 1,
        "hint": "自己穿衣服 himself。",
        "sentence": "The little boy can dress himself.",
        "zh": "小男孩能自己穿衣服。"
      },
      {
        "q": "Don't worry. I can do it _____.",
        "opts": [
          "me",
          "my",
          "myself"
        ],
        "ans": 2,
        "hint": "by 可省略，myself。",
        "sentence": "I can do it myself.",
        "zh": "我能自己做。"
      },
      {
        "q": "I can do it _____.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I can do it myself.",
        "zh": "我可以自己做这件事。"
      },
      {
        "q": "He enjoyed _____ at the picnic.",
        "opts": [
          "hisself",
          "himself",
          "him"
        ],
        "ans": 1,
        "hint": "himself 是正确形式",
        "sentence": "He enjoyed himself at the picnic.",
        "zh": "他在野餐时玩得很开心。"
      },
      {
        "q": "We should take care of _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We should take care of ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The cat washed _____.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The cat washed itself.",
        "zh": "猫把自己洗干净了。"
      },
      {
        "q": "You and I can finish the work _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You and I = We，用 ourselves",
        "sentence": "You and I can finish the work ourselves.",
        "zh": "你和我可以自己完成工作。"
      },
      {
        "q": "They made the cards _____.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 They，用 themselves",
        "sentence": "They made the cards themselves.",
        "zh": "他们自己做了卡片。"
      },
      {
        "q": "Tom, you should do your homework _____.",
        "opts": [
          "yourself",
          "myself",
          "himself"
        ],
        "ans": 0,
        "hint": "称呼 Tom，用 yourself",
        "sentence": "Tom, you should do your homework yourself.",
        "zh": "汤姆，你应该自己做作业。"
      },
      {
        "q": "The students taught _____ English.",
        "opts": [
          "themselves",
          "ourselves",
          "yourselves"
        ],
        "ans": 0,
        "hint": "主语是 The students，用 themselves",
        "sentence": "The students taught themselves English.",
        "zh": "学生们自学英语。"
      },
      {
        "q": "I hurt _____ when I fell down.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I hurt myself when I fell down.",
        "zh": "我摔倒时弄伤了自己。"
      },
      {
        "q": "She told _____ to be brave.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She told herself to be brave.",
        "zh": "她告诉自己要勇敢。"
      },
      {
        "q": "We enjoyed _____ at the panda base.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We enjoyed ourselves at the panda base.",
        "zh": "我们在熊猫基地玩得很开心。"
      },
      {
        "q": "He bought _____ a new bike.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He bought himself a new bike.",
        "zh": "他给自己买了一辆新自行车。"
      },
      {
        "q": "You two should help _____ to some fruit.",
        "opts": [
          "yourselves",
          "ourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You two = you 复数，用 yourselves",
        "sentence": "You two should help yourselves to some fruit.",
        "zh": "你们俩请随便吃点水果。"
      },
      {
        "q": "The bird cleaned _____ feathers.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The bird cleaned itself feathers.",
        "zh": "鸟整理自己的羽毛。"
      },
      {
        "q": "I can't believe _____ did that.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I can't believe myself did that.",
        "zh": "我简直不敢相信自己做了那事。"
      },
      {
        "q": "She cooked dinner for _____.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She cooked dinner for herself.",
        "zh": "她为自己做晚饭。"
      },
      {
        "q": "We should be proud of _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We should be proud of ourselves.",
        "zh": "我们应该为自己感到骄傲。"
      },
      {
        "q": "He taught _____ to play basketball.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He taught himself to play basketball.",
        "zh": "他自学打篮球。"
      },
      {
        "q": "The children enjoyed _____ at the party.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 The children，用 themselves",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "You should believe in _____.",
        "opts": [
          "yourself",
          "myself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 You，用 yourself",
        "sentence": "You should believe in yourself.",
        "zh": "你应该相信自己。"
      },
      {
        "q": "I made _____ a cup of tea.",
        "opts": [
          "myself",
          "yourself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I made myself a cup of tea.",
        "zh": "我给自己泡了杯茶。"
      },
      {
        "q": "They built the tree house _____.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 They，用 themselves",
        "sentence": "They built the tree house themselves.",
        "zh": "他们自己建了树屋。"
      },
      {
        "q": "She practiced the piano by _____.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She practiced the piano by herself.",
        "zh": "她独自练钢琴。"
      },
      {
        "q": "We dressed _____ quickly.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We dressed ourselves quickly.",
        "zh": "我们很快穿好衣服。"
      },
      {
        "q": "He found _____ lost in the forest.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He found himself lost in the forest.",
        "zh": "他发现自己迷路了。"
      },
      {
        "q": "You and your sister can do it _____.",
        "opts": [
          "yourselves",
          "ourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You and your sister = you 复数，用 yourselves",
        "sentence": "You and your sister can do it yourselves.",
        "zh": "你和妹妹可以自己做这件事。"
      },
      {
        "q": "The dog saw _____ in the water.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The dog saw itself in the water.",
        "zh": "狗在水里看到了自己。"
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
        "q": "The students enjoyed _____ at the school picnic.",
        "opts": [
          "them",
          "their",
          "themselves"
        ],
        "ans": 2,
        "hint": "enjoy 后指主语自己，用反身代词 themselves。",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "Help _____, please. The cakes are for you. (you 复数)",
        "opts": [
          "yourself",
          "yourselves",
          "you"
        ],
        "ans": 1,
        "hint": "你们自己 yourselves。",
        "sentence": "Help yourselves, please.",
        "zh": "请你们随便吃。"
      },
      {
        "q": "She looked at _____ in the mirror.",
        "opts": [
          "her",
          "herself",
          "she"
        ],
        "ans": 1,
        "hint": "看自己 herself。",
        "sentence": "She looked at herself in the mirror.",
        "zh": "她看着镜子里的自己。"
      },
      {
        "q": "We should look after _____.",
        "opts": [
          "us",
          "ourselves",
          "ourself"
        ],
        "ans": 1,
        "hint": "我们自己 ourselves。",
        "sentence": "We should look after ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The little boy can dress _____.",
        "opts": [
          "him",
          "himself",
          "he"
        ],
        "ans": 1,
        "hint": "自己穿衣服 himself。",
        "sentence": "The little boy can dress himself.",
        "zh": "小男孩能自己穿衣服。"
      },
      {
        "q": "Don't worry. I can do it _____.",
        "opts": [
          "me",
          "my",
          "myself"
        ],
        "ans": 2,
        "hint": "by 可省略，myself。",
        "sentence": "I can do it myself.",
        "zh": "我能自己做。"
      },
      {
        "q": "I can do it _____.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I can do it myself.",
        "zh": "我可以自己做这件事。"
      },
      {
        "q": "He enjoyed _____ at the picnic.",
        "opts": [
          "hisself",
          "himself",
          "him"
        ],
        "ans": 1,
        "hint": "himself 是正确形式",
        "sentence": "He enjoyed himself at the picnic.",
        "zh": "他在野餐时玩得很开心。"
      },
      {
        "q": "We should take care of _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We should take care of ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The cat washed _____.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The cat washed itself.",
        "zh": "猫把自己洗干净了。"
      },
      {
        "q": "You and I can finish the work _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You and I = We，用 ourselves",
        "sentence": "You and I can finish the work ourselves.",
        "zh": "你和我可以自己完成工作。"
      },
      {
        "q": "They made the cards _____.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 They，用 themselves",
        "sentence": "They made the cards themselves.",
        "zh": "他们自己做了卡片。"
      },
      {
        "q": "Tom, you should do your homework _____.",
        "opts": [
          "yourself",
          "myself",
          "himself"
        ],
        "ans": 0,
        "hint": "称呼 Tom，用 yourself",
        "sentence": "Tom, you should do your homework yourself.",
        "zh": "汤姆，你应该自己做作业。"
      },
      {
        "q": "The students taught _____ English.",
        "opts": [
          "themselves",
          "ourselves",
          "yourselves"
        ],
        "ans": 0,
        "hint": "主语是 The students，用 themselves",
        "sentence": "The students taught themselves English.",
        "zh": "学生们自学英语。"
      },
      {
        "q": "I hurt _____ when I fell down.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I hurt myself when I fell down.",
        "zh": "我摔倒时弄伤了自己。"
      },
      {
        "q": "She told _____ to be brave.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She told herself to be brave.",
        "zh": "她告诉自己要勇敢。"
      },
      {
        "q": "We enjoyed _____ at the panda base.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We enjoyed ourselves at the panda base.",
        "zh": "我们在熊猫基地玩得很开心。"
      },
      {
        "q": "He bought _____ a new bike.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He bought himself a new bike.",
        "zh": "他给自己买了一辆新自行车。"
      },
      {
        "q": "You two should help _____ to some fruit.",
        "opts": [
          "yourselves",
          "ourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You two = you 复数，用 yourselves",
        "sentence": "You two should help yourselves to some fruit.",
        "zh": "你们俩请随便吃点水果。"
      },
      {
        "q": "The bird cleaned _____ feathers.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The bird cleaned itself feathers.",
        "zh": "鸟整理自己的羽毛。"
      },
      {
        "q": "I can't believe _____ did that.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I can't believe myself did that.",
        "zh": "我简直不敢相信自己做了那事。"
      },
      {
        "q": "She cooked dinner for _____.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She cooked dinner for herself.",
        "zh": "她为自己做晚饭。"
      },
      {
        "q": "We should be proud of _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We should be proud of ourselves.",
        "zh": "我们应该为自己感到骄傲。"
      },
      {
        "q": "He taught _____ to play basketball.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He taught himself to play basketball.",
        "zh": "他自学打篮球。"
      },
      {
        "q": "The children enjoyed _____ at the party.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 The children，用 themselves",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "You should believe in _____.",
        "opts": [
          "yourself",
          "myself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 You，用 yourself",
        "sentence": "You should believe in yourself.",
        "zh": "你应该相信自己。"
      },
      {
        "q": "I made _____ a cup of tea.",
        "opts": [
          "myself",
          "yourself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I made myself a cup of tea.",
        "zh": "我给自己泡了杯茶。"
      },
      {
        "q": "They built the tree house _____.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 They，用 themselves",
        "sentence": "They built the tree house themselves.",
        "zh": "他们自己建了树屋。"
      },
      {
        "q": "She practiced the piano by _____.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She practiced the piano by herself.",
        "zh": "她独自练钢琴。"
      },
      {
        "q": "We dressed _____ quickly.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We dressed ourselves quickly.",
        "zh": "我们很快穿好衣服。"
      },
      {
        "q": "He found _____ lost in the forest.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He found himself lost in the forest.",
        "zh": "他发现自己迷路了。"
      },
      {
        "q": "You and your sister can do it _____.",
        "opts": [
          "yourselves",
          "ourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You and your sister = you 复数，用 yourselves",
        "sentence": "You and your sister can do it yourselves.",
        "zh": "你和妹妹可以自己做这件事。"
      },
      {
        "q": "The dog saw _____ in the water.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The dog saw itself in the water.",
        "zh": "狗在水里看到了自己。"
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
    "image": "w5-refl-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "myself",
        "zh": "我自己"
      },
      {
        "en": "yourself",
        "zh": "你自己"
      },
      {
        "en": "themselves",
        "zh": "他们自己"
      },
      {
        "en": "enjoy oneself",
        "zh": "玩得开心"
      },
      {
        "en": "by myself",
        "zh": "独自，靠自己"
      },
      {
        "en": "teach oneself",
        "zh": "自学"
      },
      {
        "en": "look at oneself",
        "zh": "看自己"
      },
      {
        "en": "take care of oneself",
        "zh": "照顾自己"
      },
      {
        "en": "help oneself to",
        "zh": "随便吃/用"
      },
      {
        "en": "be proud of oneself",
        "zh": "为自己骄傲"
      },
      {
        "en": "hurt oneself",
        "zh": "弄伤自己"
      },
      {
        "en": "dress oneself",
        "zh": "自己穿衣服"
      },
      {
        "en": "believe in oneself",
        "zh": "相信自己"
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
    "image": "w5-refl-hero.jpg",
    "audio": "I can finish it by myself.",
    "opts": [
      "I can finish it by myself.",
      "I can finish it by yourself.",
      "I can finish it by himself."
    ],
    "ans": 0,
    "hint": "听清楚 myself",
    "sentence": "I can finish it by myself.",
    "zh": "我可以自己完成它。",
    "questions": [
      {
        "audio": "I can finish it by myself.",
        "opts": [
          "I can finish it by myself.",
          "I can finish it by yourself.",
          "I can finish it by himself."
        ],
        "ans": 0,
        "hint": "听清楚 myself",
        "zh": "我可以自己完成它。",
        "sentence": "I can finish it by myself."
      },
      {
        "audio": "She looked at herself in the mirror.",
        "opts": [
          "She looked at herself in the mirror.",
          "She looked at himself in the mirror.",
          "She looked at yourself in the mirror."
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "zh": "她看着镜子里的自己。",
        "sentence": "She looked at herself in the mirror."
      },
      {
        "audio": "He enjoyed himself at the party.",
        "opts": [
          "He enjoyed himself at the party.",
          "He enjoyed hisself at the party.",
          "He enjoyed herself at the party."
        ],
        "ans": 0,
        "hint": "himself 是正确形式",
        "zh": "他在聚会上玩得很开心。",
        "sentence": "He enjoyed himself at the party."
      },
      {
        "audio": "We should take care of ourselves.",
        "opts": [
          "We should take care of ourselves.",
          "We should take care of yourselves.",
          "We should take care of themselves."
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "zh": "我们应该照顾好自己。",
        "sentence": "We should take care of ourselves."
      },
      {
        "audio": "The cat cleaned itself.",
        "opts": [
          "The cat cleaned itself.",
          "The cat cleaned himself.",
          "The cat cleaned herself."
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "zh": "猫把自己舔干净了。",
        "sentence": "The cat cleaned itself."
      },
      {
        "audio": "You should believe in yourself.",
        "opts": [
          "You should believe in yourself.",
          "You should believe in myself.",
          "You should believe in himself."
        ],
        "ans": 0,
        "hint": "主语是 You，用 yourself",
        "zh": "你应该相信自己。",
        "sentence": "You should believe in yourself."
      },
      {
        "audio": "They made the cards themselves.",
        "opts": [
          "They made the cards themselves.",
          "They made the cards theirselves.",
          "They made the cards ourselves."
        ],
        "ans": 0,
        "hint": "themselves 是正确形式",
        "zh": "他们自己做了卡片。",
        "sentence": "They made the cards themselves."
      },
      {
        "audio": "She cooked dinner for herself.",
        "opts": [
          "She cooked dinner for herself.",
          "She cooked dinner for himself.",
          "She cooked dinner for yourself."
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "zh": "她为自己做晚饭。",
        "sentence": "She cooked dinner for herself."
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
    "image": "w5-refl-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I can finish it by myself.",
        "zh": "我可以自己完成它。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "You should believe in yourself.",
        "zh": "你应该相信自己。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "She made the cake herself.",
        "zh": "她自己做蛋糕。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He taught himself to swim.",
        "zh": "他自学游泳。",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "We enjoyed ourselves at the party.",
        "zh": "我们在聚会上玩得很开心。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "They built the house themselves.",
        "zh": "他们自己建了房子。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "I hurt myself when I fell.",
        "zh": "我摔倒时弄伤了自己。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "You two should help yourselves to some food.",
        "zh": "你们俩请随便吃点东西。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She looked at herself in the mirror.",
        "zh": "她看着镜子里的自己。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "The cat cleaned itself.",
        "zh": "猫把自己舔干净了。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "I taught myself English.",
        "zh": "我自学英语。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He introduced himself to the class.",
        "zh": "他向全班介绍自己。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We can do it ourselves.",
        "zh": "我们可以自己做这件事。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "They enjoyed themselves at the zoo.",
        "zh": "他们在动物园玩得很开心。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "You should take care of yourself.",
        "zh": "你应该照顾好自己。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "She bought herself a new dress.",
        "zh": "她给自己买了一条新裙子。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "I made myself a sandwich.",
        "zh": "我给自己做了个三明治。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He cooked dinner for himself.",
        "zh": "他为自己做了晚饭。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "They taught themselves to play the piano.",
        "zh": "他们自学弹钢琴。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "We should be proud of ourselves.",
        "zh": "我们应该为自己感到骄傲。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She dressed herself quickly.",
        "zh": "她很快穿好衣服。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "I found myself lost in the city.",
        "zh": "我发现自己迷路了。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He blamed himself for the mistake.",
        "zh": "他为错误责怪自己。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "They made themselves comfortable.",
        "zh": "他们让自己舒服自在。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
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
    "image": "w5-refl-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "We enjoyed _____ at the panda base.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We enjoyed ourselves at the panda base.",
        "zh": "我们在熊猫基地玩得很开心。"
      },
      {
        "q": "He bought _____ a new bike.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He bought himself a new bike.",
        "zh": "他给自己买了一辆新自行车。"
      },
      {
        "q": "You two should help _____ to some fruit.",
        "opts": [
          "yourselves",
          "ourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You two = you 复数，用 yourselves",
        "sentence": "You two should help yourselves to some fruit.",
        "zh": "你们俩请随便吃点水果。"
      },
      {
        "q": "The bird cleaned _____ feathers.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The bird cleaned itself feathers.",
        "zh": "鸟整理自己的羽毛。"
      },
      {
        "q": "I can't believe _____ did that.",
        "opts": [
          "myself",
          "yourself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I can't believe myself did that.",
        "zh": "我简直不敢相信自己做了那事。"
      },
      {
        "q": "She cooked dinner for _____.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She cooked dinner for herself.",
        "zh": "她为自己做晚饭。"
      },
      {
        "q": "We should be proud of _____.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We should be proud of ourselves.",
        "zh": "我们应该为自己感到骄傲。"
      },
      {
        "q": "He taught _____ to play basketball.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He taught himself to play basketball.",
        "zh": "他自学打篮球。"
      },
      {
        "q": "The children enjoyed _____ at the party.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 The children，用 themselves",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "You should believe in _____.",
        "opts": [
          "yourself",
          "myself",
          "himself"
        ],
        "ans": 0,
        "hint": "主语是 You，用 yourself",
        "sentence": "You should believe in yourself.",
        "zh": "你应该相信自己。"
      },
      {
        "q": "I made _____ a cup of tea.",
        "opts": [
          "myself",
          "yourself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 I，用 myself",
        "sentence": "I made myself a cup of tea.",
        "zh": "我给自己泡了杯茶。"
      },
      {
        "q": "They built the tree house _____.",
        "opts": [
          "themselves",
          "theirselves",
          "ourselves"
        ],
        "ans": 0,
        "hint": "主语是 They，用 themselves",
        "sentence": "They built the tree house themselves.",
        "zh": "他们自己建了树屋。"
      },
      {
        "q": "She practiced the piano by _____.",
        "opts": [
          "herself",
          "himself",
          "itself"
        ],
        "ans": 0,
        "hint": "主语是 She，用 herself",
        "sentence": "She practiced the piano by herself.",
        "zh": "她独自练钢琴。"
      },
      {
        "q": "We dressed _____ quickly.",
        "opts": [
          "ourselves",
          "yourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "主语是 We，用 ourselves",
        "sentence": "We dressed ourselves quickly.",
        "zh": "我们很快穿好衣服。"
      },
      {
        "q": "He found _____ lost in the forest.",
        "opts": [
          "himself",
          "hisself",
          "herself"
        ],
        "ans": 0,
        "hint": "主语是 He，用 himself",
        "sentence": "He found himself lost in the forest.",
        "zh": "他发现自己迷路了。"
      },
      {
        "q": "You and your sister can do it _____.",
        "opts": [
          "yourselves",
          "ourselves",
          "themselves"
        ],
        "ans": 0,
        "hint": "You and your sister = you 复数，用 yourselves",
        "sentence": "You and your sister can do it yourselves.",
        "zh": "你和妹妹可以自己做这件事。"
      },
      {
        "q": "The dog saw _____ in the water.",
        "opts": [
          "itself",
          "himself",
          "herself"
        ],
        "ans": 0,
        "hint": "动物用 itself",
        "sentence": "The dog saw itself in the water.",
        "zh": "狗在水里看到了自己。"
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
      "主语=宾语时用反身代词",
      "myself/yourself/himself/herself",
      "enjoy/help/dress + 反身代词",
      "没有 theirselves / hisself；复数一定是 -selves。"
    ],
    "chant": "Myself for I, yourself for you — reflexive pronouns see you through!",
    "chantSpeak": "Myself for I, yourself for you, reflexive pronouns see you through!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "反身代词 myself / yourself",
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