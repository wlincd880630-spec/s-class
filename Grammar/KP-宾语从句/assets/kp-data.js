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
    "audio": "What do you think we can do to solve the problem?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你认为我们能做什么来解决这个问题？",
    "image": "w3-oc-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-oc-hero.jpg",
    "question": "宾语从句中语序应该怎样？",
    "choices": [
      {
        "text": "陈述语序：主语 + 谓语",
        "correct": true,
        "fb": "对了！we can do，不是 can we do。"
      },
      {
        "text": "疑问语序：助动词在主语前",
        "correct": false,
        "fb": "从句不用疑问倒装。"
      },
      {
        "text": "省略主语",
        "correct": false,
        "fb": "从句需要完整主语。"
      }
    ],
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你认为我们能做什么来解决这个问题？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-oc-hero.jpg",
    "lead": "宾语从句用陈述语序：连接词 + 主语 + 谓语。",
    "formula": "I know + that / what / if + 主语 + 谓语",
    "parts": [
      {
        "mark": "主句",
        "label": "think/know/say",
        "example": "I know"
      },
      {
        "mark": "连接词",
        "label": "that/what/if",
        "example": "where"
      },
      {
        "mark": "从句",
        "label": "陈述语序",
        "example": "he lives"
      }
    ],
    "samples": [
      {
        "sentence": "I know where he lives.",
        "zh": "我知道他住在哪里。"
      },
      {
        "sentence": "What do you think we can do?",
        "zh": "你觉得我们能做什么？"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-oc-wrong.jpg",
    "rightImage": "w3-oc-right.jpg",
    "leftLabel": "❌ can we do",
    "rightLabel": "✓ we can do",
    "leftSentence": "What do you think can we do?",
    "leftZh": "（错误语序）",
    "rightSentence": "What do you think we can do?",
    "rightZh": "你认为我们能做什么？",
    "morphBase": "can we",
    "morphPast": "we can",
    "morphHighlight": "",
    "discovery": "宾语从句用陈述语序，即使前面有特殊疑问词。"
  },
  {
    "section": "精讲",
    "title": "例句 · where 陈述语序",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-oc-hero.jpg",
    "lead": "where he lives，不是 where does he live。",
    "sentence": "I know where he lives.",
    "zh": "我知道他住在哪里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · think 后的从句",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-oc-hero.jpg",
    "lead": "What do you think + 陈述语序。",
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你觉得我们能做什么来解决问题？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "宾语从句 · 陈述语序",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "从句要用主语在前、谓语在后的顺序，不加助动词。",
    "sentence": "I know that he lives in Chengdu.",
    "zh": "我知道他住在成都。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "宾语从句 · 连接词",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "that 陈述事实，if 表示是否，what/where 引导疑问。",
    "sentence": "Do you know if the bus comes?",
    "zh": "你知道公交车是否来吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "宾语从句 · 主句否定",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-shop.png",
    "lead": "否定主句动词，如 don't think / don't know。",
    "sentence": "I don't know what she wants.",
    "zh": "我不知道她想要什么。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-oc-hero.jpg",
    "lead": "宾语从句语序规则。",
    "rules": [
      {
        "tab": "语序",
        "rule": "连接词 + 主语 + 谓语（陈述语序）",
        "focusVerb": "we can",
        "examples": [
          {
            "from": "can we",
            "to": "we can"
          },
          {
            "from": "does he",
            "to": "he does"
          }
        ],
        "sample": "What do you think we can do to solve the problem?",
        "sampleZh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "tab": "时态",
        "rule": "主句现在时，从句时态根据实际情况",
        "focusVerb": "think",
        "examples": [
          {
            "from": "I think",
            "to": "he is right"
          }
        ],
        "sample": "I believe that English is useful.",
        "sampleZh": "我相信英语很有用。"
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
    "image": "w3-oc-hero.jpg",
    "buckets": [
      {
        "key": "ok",
        "label": "陈述语序 ✓"
      },
      {
        "key": "no",
        "label": "疑问语序 ✗"
      }
    ],
    "items": [
      {
        "text": "I know where he lives.",
        "bucket": "ok"
      },
      {
        "text": "I know where does he live.",
        "bucket": "no",
        "hint": "应为 he lives。"
      },
      {
        "text": "Tell me what you want.",
        "bucket": "ok"
      },
      {
        "text": "Tell me what do you want.",
        "bucket": "no"
      },
      {
        "text": "What do you think we should do?",
        "bucket": "ok"
      },
      {
        "text": "What do you think should we do?",
        "bucket": "no"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-oc-hero.jpg",
    "question": "「I don't know where does he live.」应改成？",
    "choices": [
      {
        "text": "where he lives（去掉 does，陈述语序）",
        "correct": true,
        "fb": "从句不能再用疑问语序。"
      },
      {
        "text": "where he live",
        "correct": false,
        "fb": "he 三单，lives。"
      },
      {
        "text": "where is he live",
        "correct": false,
        "fb": "更乱了。"
      }
    ],
    "sentence": "I don't know where he lives.",
    "zh": "我不知道他住在哪里。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-oc-hero.jpg",
    "lead": "把问句变成宾语从句：疑问词留下，后面改陈述语序。",
    "items": [
      {
        "from": "Where does he live?",
        "fromZh": "他住在哪里？",
        "steps": [
          {
            "label": "接在 I ask 后面",
            "opts": [
              "I ask where he lives.",
              "I ask where does he live.",
              "I ask where he live."
            ],
            "ans": 0,
            "hint": "where + he lives。",
            "sentence": "I ask where he lives.",
            "zh": "我问他住在哪里。"
          }
        ]
      },
      {
        "from": "I don't know where does he live.",
        "fromZh": "我不知道他住在哪里。",
        "steps": [
          {
            "label": "改成正确的陈述语序",
            "opts": [
              "I don't know where he lives.",
              "I don't know where does he lives.",
              "I don't know where he live."
            ],
            "ans": 0,
            "hint": "从句用陈述语序，不加助动词",
            "sentence": "I don't know where he lives.",
            "zh": "我不知道他住在哪里。"
          }
        ]
      },
      {
        "from": "Do you know what does she want?",
        "fromZh": "你知道她想要什么吗？",
        "steps": [
          {
            "label": "改成正确的从句语序",
            "opts": [
              "Do you know what she wants?",
              "Do you know what does she wants?",
              "Do you know what she want?"
            ],
            "ans": 0,
            "hint": "从句主语在前，谓语在后",
            "sentence": "Do you know what she wants?",
            "zh": "你知道她想要什么吗？"
          }
        ]
      },
      {
        "from": "He thinks that the cat is cute.",
        "fromZh": "他认为猫很可爱。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "He doesn't think that the cat is cute.",
              "He thinks that the cat isn't cute.",
              "He doesn't thinks that the cat is cute."
            ],
            "ans": 0,
            "hint": "否定主句动词 think",
            "sentence": "He doesn't think that the cat is cute.",
            "zh": "他不认为猫很可爱。"
          }
        ]
      },
      {
        "from": "I know if the bus comes.",
        "fromZh": "我知道公交车是否来。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Do I know if the bus comes?",
              "I do know if the bus comes?",
              "Do I know if the bus come?"
            ],
            "ans": 0,
            "hint": "句首加 Do",
            "sentence": "Do I know if the bus comes?",
            "zh": "我知道公交车是否来吗？"
          }
        ]
      },
      {
        "from": "She says that the moon is bright.",
        "fromZh": "她说月亮很亮。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Does she say that the moon is bright?",
              "She says that the moon is bright?",
              "Does she says that the moon is bright?"
            ],
            "ans": 0,
            "hint": "句首加 Does，动词还原",
            "sentence": "Does she say that the moon is bright?",
            "zh": "她说月亮很亮吗？"
          }
        ]
      },
      {
        "from": "We think that the panda is black and white.",
        "fromZh": "我们认为熊猫是黑白色的。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "We don't think that the panda is black and white.",
              "We think that the panda isn't black and white.",
              "We don't thinks that the panda is black and white."
            ],
            "ans": 0,
            "hint": "否定主句动词 think",
            "sentence": "We don't think that the panda is black and white.",
            "zh": "我们不认为熊猫是黑白色的。"
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
      "I",
      "know",
      "that",
      "the",
      "panda",
      "eats",
      "bamboo"
    ],
    "sentence": "I know that the panda eats bamboo.",
    "zh": "我知道熊猫吃竹子。",
    "items": [
      {
        "tokens": [
          "I",
          "know",
          "that",
          "the",
          "panda",
          "eats",
          "bamboo"
        ],
        "sentence": "I know that the panda eats bamboo.",
        "zh": "我知道熊猫吃竹子。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "Do",
          "you",
          "know",
          "where",
          "the",
          "library",
          "is"
        ],
        "sentence": "Do you know where the library is?",
        "zh": "你知道图书馆在哪里吗？",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "She",
          "thinks",
          "that",
          "the",
          "apple",
          "is",
          "sweet"
        ],
        "sentence": "She thinks that the apple is sweet.",
        "zh": "她觉得苹果很甜。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "He",
          "says",
          "that",
          "the",
          "bus",
          "is",
          "coming"
        ],
        "sentence": "He says that the bus is coming.",
        "zh": "他说公交车来了。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "I",
          "don't",
          "know",
          "if",
          "the",
          "doctor",
          "is",
          "here"
        ],
        "sentence": "I don't know if the doctor is here.",
        "zh": "我不知道医生是否在这里。",
        "image": "kp3d-doctor.png"
      },
      {
        "tokens": [
          "We",
          "think",
          "that",
          "the",
          "playground",
          "is",
          "big"
        ],
        "sentence": "We think that the playground is big.",
        "zh": "我们认为操场很大。",
        "image": "kp3d-playground.png"
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
    "image": "w3-oc-hero.jpg",
    "audio": "I know where he lives.",
    "tokens": [
      "I",
      "know",
      "where",
      "he",
      "lives"
    ],
    "sentence": "I know where he lives.",
    "zh": "我知道他住在哪里。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-oc-hero.jpg",
    "q": "What do you think _____ to solve the problem?",
    "opts": [
      "you can do",
      "can you do",
      "do you can"
    ],
    "ans": 0,
    "hint": "宾语从句用陈述语序 we can do。",
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你认为我们能做什么来解决这个问题？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-oc-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "What do you think _____ to solve the problem?",
        "opts": [
          "you can do",
          "can you do",
          "do you can"
        ],
        "ans": 0,
        "hint": "宾语从句用陈述语序 we can do。",
        "sentence": "What do you think we can do to solve the problem?",
        "zh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "q": "He said _____ he was tired.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述用 that（可省略）。",
        "sentence": "He said that he was tired.",
        "zh": "他说他累了。"
      },
      {
        "q": "I wonder _____ it will rain tomorrow.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 2,
        "hint": "是否 → if/whether。",
        "sentence": "I wonder if it will rain tomorrow.",
        "zh": "我想知道明天会不会下雨。"
      },
      {
        "q": "Do you know _____?",
        "opts": [
          "where is the library",
          "where the library is",
          "where the library"
        ],
        "ans": 1,
        "hint": "陈述语序：where the library is。",
        "sentence": "Do you know where the library is?",
        "zh": "你知道图书馆在哪吗？"
      },
      {
        "q": "She asked me _____ I liked Chengdu.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "一般疑问变从句用 if。",
        "sentence": "She asked me if I liked Chengdu.",
        "zh": "她问我喜不喜欢成都。"
      },
      {
        "q": "I believe _____ he _____ right.",
        "opts": [
          "that; is",
          "what; is",
          "that; are"
        ],
        "ans": 0,
        "hint": "that + he is。",
        "sentence": "I believe that he is right.",
        "zh": "我相信他是对的。"
      },
      {
        "q": "I know _____ he lives in Chengdu.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述一个事实，用 that",
        "sentence": "I know that he lives in Chengdu.",
        "zh": "我知道他住在成都。"
      },
      {
        "q": "Do you know _____ the bus comes?",
        "opts": [
          "what",
          "when",
          "if"
        ],
        "ans": 1,
        "hint": "询问时间，用 when",
        "sentence": "Do you know when the bus comes?",
        "zh": "你知道公交车什么时候来吗？"
      },
      {
        "q": "I don't know _____ she likes apples.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if she likes apples.",
        "zh": "我不知道她是否喜欢苹果。"
      },
      {
        "q": "She thinks _____ the cat is sleeping.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述想法，用 that",
        "sentence": "She thinks that the cat is sleeping.",
        "zh": "她认为猫在睡觉。"
      },
      {
        "q": "Can you tell me _____ the library is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the library is?",
        "zh": "你能告诉我图书馆在哪里吗？"
      },
      {
        "q": "I know _____ the moon is round.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the moon is round.",
        "zh": "我知道月亮是圆的。"
      },
      {
        "q": "He says _____ he will come to school.",
        "opts": [
          "if",
          "what",
          "that"
        ],
        "ans": 2,
        "hint": "转述内容，用 that",
        "sentence": "He says that he will come to school.",
        "zh": "他说他会来学校。"
      },
      {
        "q": "I wonder _____ the doctor is free.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I wonder if the doctor is free.",
        "zh": "我想知道医生是否有空。"
      },
      {
        "q": "Do you know _____ the window is broken?",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 2,
        "hint": "询问是否，用 if",
        "sentence": "Do you know if the window is broken?",
        "zh": "你知道窗户是否破了吗？"
      },
      {
        "q": "I think _____ the basketball is new.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "I think that the basketball is new.",
        "zh": "我认为这个篮球是新的。"
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
        "q": "What do you think _____ to solve the problem?",
        "opts": [
          "you can do",
          "can you do",
          "do you can"
        ],
        "ans": 0,
        "hint": "宾语从句用陈述语序 we can do。",
        "sentence": "What do you think we can do to solve the problem?",
        "zh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "q": "He said _____ he was tired.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述用 that（可省略）。",
        "sentence": "He said that he was tired.",
        "zh": "他说他累了。"
      },
      {
        "q": "I wonder _____ it will rain tomorrow.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 2,
        "hint": "是否 → if/whether。",
        "sentence": "I wonder if it will rain tomorrow.",
        "zh": "我想知道明天会不会下雨。"
      },
      {
        "q": "Do you know _____?",
        "opts": [
          "where is the library",
          "where the library is",
          "where the library"
        ],
        "ans": 1,
        "hint": "陈述语序：where the library is。",
        "sentence": "Do you know where the library is?",
        "zh": "你知道图书馆在哪吗？"
      },
      {
        "q": "She asked me _____ I liked Chengdu.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "一般疑问变从句用 if。",
        "sentence": "She asked me if I liked Chengdu.",
        "zh": "她问我喜不喜欢成都。"
      },
      {
        "q": "I believe _____ he _____ right.",
        "opts": [
          "that; is",
          "what; is",
          "that; are"
        ],
        "ans": 0,
        "hint": "that + he is。",
        "sentence": "I believe that he is right.",
        "zh": "我相信他是对的。"
      },
      {
        "q": "I know _____ he lives in Chengdu.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述一个事实，用 that",
        "sentence": "I know that he lives in Chengdu.",
        "zh": "我知道他住在成都。"
      },
      {
        "q": "Do you know _____ the bus comes?",
        "opts": [
          "what",
          "when",
          "if"
        ],
        "ans": 1,
        "hint": "询问时间，用 when",
        "sentence": "Do you know when the bus comes?",
        "zh": "你知道公交车什么时候来吗？"
      },
      {
        "q": "I don't know _____ she likes apples.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if she likes apples.",
        "zh": "我不知道她是否喜欢苹果。"
      },
      {
        "q": "She thinks _____ the cat is sleeping.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述想法，用 that",
        "sentence": "She thinks that the cat is sleeping.",
        "zh": "她认为猫在睡觉。"
      },
      {
        "q": "Can you tell me _____ the library is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the library is?",
        "zh": "你能告诉我图书馆在哪里吗？"
      },
      {
        "q": "I know _____ the moon is round.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the moon is round.",
        "zh": "我知道月亮是圆的。"
      },
      {
        "q": "He says _____ he will come to school.",
        "opts": [
          "if",
          "what",
          "that"
        ],
        "ans": 2,
        "hint": "转述内容，用 that",
        "sentence": "He says that he will come to school.",
        "zh": "他说他会来学校。"
      },
      {
        "q": "I wonder _____ the doctor is free.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I wonder if the doctor is free.",
        "zh": "我想知道医生是否有空。"
      },
      {
        "q": "Do you know _____ the window is broken?",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 2,
        "hint": "询问是否，用 if",
        "sentence": "Do you know if the window is broken?",
        "zh": "你知道窗户是否破了吗？"
      },
      {
        "q": "I think _____ the basketball is new.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "I think that the basketball is new.",
        "zh": "我认为这个篮球是新的。"
      },
      {
        "q": "She doesn't know _____ he likes hotpot.",
        "opts": [
          "that",
          "where",
          "if"
        ],
        "ans": 2,
        "hint": "不确定是否，用 if",
        "sentence": "She doesn't know if he likes hotpot.",
        "zh": "她不知道他是否喜欢火锅。"
      },
      {
        "q": "We know _____ the panda is in the zoo.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述事实，用 that",
        "sentence": "We know that the panda is in the zoo.",
        "zh": "我们知道熊猫在动物园里。"
      },
      {
        "q": "Can you tell me _____ the piano is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the piano is?",
        "zh": "你能告诉我钢琴在哪里吗？"
      },
      {
        "q": "I know _____ the shop is open.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the shop is open.",
        "zh": "我知道那家店开着。"
      },
      {
        "q": "Do you know _____ he is taller than me?",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 1,
        "hint": "询问是否，用 if",
        "sentence": "Do you know if he is taller than me?",
        "zh": "你知道他是否比我高吗？"
      },
      {
        "q": "She thinks _____ the dinner is delicious.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "She thinks that the dinner is delicious.",
        "zh": "她觉得晚餐很好吃。"
      },
      {
        "q": "I don't know _____ he is in the classroom.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if he is in the classroom.",
        "zh": "我不知道他是否在教室里。"
      },
      {
        "q": "We think _____ the playground is big.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述想法，用 that",
        "sentence": "We think that the playground is big.",
        "zh": "我们认为操场很大。"
      },
      {
        "q": "Can you tell me _____ the bus goes?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the bus goes?",
        "zh": "你能告诉我公交车去哪里吗？"
      },
      {
        "q": "I know _____ the apple is on the table.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the apple is on the table.",
        "zh": "我知道苹果在桌子上。"
      },
      {
        "q": "He doesn't know _____ she plays the piano.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "He doesn't know if she plays the piano.",
        "zh": "他不知道她是否弹钢琴。"
      },
      {
        "q": "I think _____ the umbrella is in the bag.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述想法，用 that",
        "sentence": "I think that the umbrella is in the bag.",
        "zh": "我认为雨伞在包里。"
      },
      {
        "q": "Do you know _____ the cat is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Do you know where the cat is?",
        "zh": "你知道猫在哪里吗？"
      },
      {
        "q": "She says _____ she will go to the shop.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "转述内容，用 that",
        "sentence": "She says that she will go to the shop.",
        "zh": "她说她要去商店。"
      },
      {
        "q": "I don't know _____ the doctor comes today.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if the doctor comes today.",
        "zh": "我不知道医生今天是否来。"
      },
      {
        "q": "We know _____ the moon is far away.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述事实，用 that",
        "sentence": "We know that the moon is far away.",
        "zh": "我们知道月亮很远。"
      },
      {
        "q": "Can you tell me _____ the basketball is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the basketball is?",
        "zh": "你能告诉我篮球在哪里吗？"
      },
      {
        "q": "He thinks _____ the window is clean.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "He thinks that the window is clean.",
        "zh": "他认为窗户很干净。"
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
        "q": "What do you think _____ to solve the problem?",
        "opts": [
          "you can do",
          "can you do",
          "do you can"
        ],
        "ans": 0,
        "hint": "宾语从句用陈述语序 we can do。",
        "sentence": "What do you think we can do to solve the problem?",
        "zh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "q": "He said _____ he was tired.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述用 that（可省略）。",
        "sentence": "He said that he was tired.",
        "zh": "他说他累了。"
      },
      {
        "q": "I wonder _____ it will rain tomorrow.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 2,
        "hint": "是否 → if/whether。",
        "sentence": "I wonder if it will rain tomorrow.",
        "zh": "我想知道明天会不会下雨。"
      },
      {
        "q": "Do you know _____?",
        "opts": [
          "where is the library",
          "where the library is",
          "where the library"
        ],
        "ans": 1,
        "hint": "陈述语序：where the library is。",
        "sentence": "Do you know where the library is?",
        "zh": "你知道图书馆在哪吗？"
      },
      {
        "q": "She asked me _____ I liked Chengdu.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "一般疑问变从句用 if。",
        "sentence": "She asked me if I liked Chengdu.",
        "zh": "她问我喜不喜欢成都。"
      },
      {
        "q": "I believe _____ he _____ right.",
        "opts": [
          "that; is",
          "what; is",
          "that; are"
        ],
        "ans": 0,
        "hint": "that + he is。",
        "sentence": "I believe that he is right.",
        "zh": "我相信他是对的。"
      },
      {
        "q": "I know _____ he lives in Chengdu.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述一个事实，用 that",
        "sentence": "I know that he lives in Chengdu.",
        "zh": "我知道他住在成都。"
      },
      {
        "q": "Do you know _____ the bus comes?",
        "opts": [
          "what",
          "when",
          "if"
        ],
        "ans": 1,
        "hint": "询问时间，用 when",
        "sentence": "Do you know when the bus comes?",
        "zh": "你知道公交车什么时候来吗？"
      },
      {
        "q": "I don't know _____ she likes apples.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if she likes apples.",
        "zh": "我不知道她是否喜欢苹果。"
      },
      {
        "q": "She thinks _____ the cat is sleeping.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述想法，用 that",
        "sentence": "She thinks that the cat is sleeping.",
        "zh": "她认为猫在睡觉。"
      },
      {
        "q": "Can you tell me _____ the library is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the library is?",
        "zh": "你能告诉我图书馆在哪里吗？"
      },
      {
        "q": "I know _____ the moon is round.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the moon is round.",
        "zh": "我知道月亮是圆的。"
      },
      {
        "q": "He says _____ he will come to school.",
        "opts": [
          "if",
          "what",
          "that"
        ],
        "ans": 2,
        "hint": "转述内容，用 that",
        "sentence": "He says that he will come to school.",
        "zh": "他说他会来学校。"
      },
      {
        "q": "I wonder _____ the doctor is free.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I wonder if the doctor is free.",
        "zh": "我想知道医生是否有空。"
      },
      {
        "q": "Do you know _____ the window is broken?",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 2,
        "hint": "询问是否，用 if",
        "sentence": "Do you know if the window is broken?",
        "zh": "你知道窗户是否破了吗？"
      },
      {
        "q": "I think _____ the basketball is new.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "I think that the basketball is new.",
        "zh": "我认为这个篮球是新的。"
      },
      {
        "q": "She doesn't know _____ he likes hotpot.",
        "opts": [
          "that",
          "where",
          "if"
        ],
        "ans": 2,
        "hint": "不确定是否，用 if",
        "sentence": "She doesn't know if he likes hotpot.",
        "zh": "她不知道他是否喜欢火锅。"
      },
      {
        "q": "We know _____ the panda is in the zoo.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述事实，用 that",
        "sentence": "We know that the panda is in the zoo.",
        "zh": "我们知道熊猫在动物园里。"
      },
      {
        "q": "Can you tell me _____ the piano is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the piano is?",
        "zh": "你能告诉我钢琴在哪里吗？"
      },
      {
        "q": "I know _____ the shop is open.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the shop is open.",
        "zh": "我知道那家店开着。"
      },
      {
        "q": "Do you know _____ he is taller than me?",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 1,
        "hint": "询问是否，用 if",
        "sentence": "Do you know if he is taller than me?",
        "zh": "你知道他是否比我高吗？"
      },
      {
        "q": "She thinks _____ the dinner is delicious.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "She thinks that the dinner is delicious.",
        "zh": "她觉得晚餐很好吃。"
      },
      {
        "q": "I don't know _____ he is in the classroom.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if he is in the classroom.",
        "zh": "我不知道他是否在教室里。"
      },
      {
        "q": "We think _____ the playground is big.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述想法，用 that",
        "sentence": "We think that the playground is big.",
        "zh": "我们认为操场很大。"
      },
      {
        "q": "Can you tell me _____ the bus goes?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the bus goes?",
        "zh": "你能告诉我公交车去哪里吗？"
      },
      {
        "q": "I know _____ the apple is on the table.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the apple is on the table.",
        "zh": "我知道苹果在桌子上。"
      },
      {
        "q": "He doesn't know _____ she plays the piano.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "He doesn't know if she plays the piano.",
        "zh": "他不知道她是否弹钢琴。"
      },
      {
        "q": "I think _____ the umbrella is in the bag.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述想法，用 that",
        "sentence": "I think that the umbrella is in the bag.",
        "zh": "我认为雨伞在包里。"
      },
      {
        "q": "Do you know _____ the cat is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Do you know where the cat is?",
        "zh": "你知道猫在哪里吗？"
      },
      {
        "q": "She says _____ she will go to the shop.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "转述内容，用 that",
        "sentence": "She says that she will go to the shop.",
        "zh": "她说她要去商店。"
      },
      {
        "q": "I don't know _____ the doctor comes today.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if the doctor comes today.",
        "zh": "我不知道医生今天是否来。"
      },
      {
        "q": "We know _____ the moon is far away.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述事实，用 that",
        "sentence": "We know that the moon is far away.",
        "zh": "我们知道月亮很远。"
      },
      {
        "q": "Can you tell me _____ the basketball is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the basketball is?",
        "zh": "你能告诉我篮球在哪里吗？"
      },
      {
        "q": "He thinks _____ the window is clean.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "He thinks that the window is clean.",
        "zh": "他认为窗户很干净。"
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
    "image": "w3-oc-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "I know that…",
        "zh": "我知道……"
      },
      {
        "en": "I wonder if…",
        "zh": "我想知道是否……"
      },
      {
        "en": "where he lives",
        "zh": "他住在哪里（陈述语序）"
      },
      {
        "en": "what we can do",
        "zh": "我们能做什么"
      },
      {
        "en": "I know that",
        "zh": "我知道"
      },
      {
        "en": "I think that",
        "zh": "我认为"
      },
      {
        "en": "She says that",
        "zh": "她说"
      },
      {
        "en": "Do you know if",
        "zh": "你是否知道"
      },
      {
        "en": "I don't know what",
        "zh": "我不知道什么"
      },
      {
        "en": "He thinks that",
        "zh": "他认为"
      },
      {
        "en": "Can you tell me where",
        "zh": "你能告诉我哪里"
      },
      {
        "en": "We know that",
        "zh": "我们知道"
      },
      {
        "en": "I wonder if",
        "zh": "我想知道是否"
      },
      {
        "en": "She doesn't know if",
        "zh": "她不知道是否"
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
    "image": "w3-oc-hero.jpg",
    "audio": "I know that the cat is sleeping.",
    "opts": [
      "I know that the cat is sleeping.",
      "I know what the cat is sleeping.",
      "I know if the cat is sleeping."
    ],
    "ans": 0,
    "hint": "听清 that 引导的从句",
    "sentence": "I know that the cat is sleeping.",
    "zh": "我知道猫在睡觉。",
    "questions": [
      {
        "audio": "I know that the cat is sleeping.",
        "opts": [
          "I know that the cat is sleeping.",
          "I know what the cat is sleeping.",
          "I know if the cat is sleeping."
        ],
        "ans": 0,
        "hint": "听清 that 引导的从句",
        "zh": "我知道猫在睡觉。",
        "sentence": "I know that the cat is sleeping."
      },
      {
        "audio": "Do you know where the bus goes?",
        "opts": [
          "Do you know where the bus goes?",
          "Do you know what the bus goes?",
          "Do you know if the bus goes?"
        ],
        "ans": 0,
        "hint": "注意 where 引导地点",
        "zh": "你知道公交车去哪里吗？",
        "sentence": "Do you know where the bus goes?"
      },
      {
        "audio": "She thinks that the moon is bright.",
        "opts": [
          "She thinks that the moon is bright.",
          "She thinks if the moon is bright.",
          "She thinks what the moon is bright."
        ],
        "ans": 0,
        "hint": "听清 that 和 moon",
        "zh": "她觉得月亮很亮。",
        "sentence": "She thinks that the moon is bright."
      },
      {
        "audio": "I don't know if he likes hotpot.",
        "opts": [
          "I don't know if he likes hotpot.",
          "I don't know that he likes hotpot.",
          "I don't know what he likes hotpot."
        ],
        "ans": 0,
        "hint": "注意 if 表示是否",
        "zh": "我不知道他是否喜欢火锅。",
        "sentence": "I don't know if he likes hotpot."
      },
      {
        "audio": "We know that the panda is cute.",
        "opts": [
          "We know that the panda is cute.",
          "We know if the panda is cute.",
          "We know what the panda is cute."
        ],
        "ans": 0,
        "hint": "听清 that 和 panda",
        "zh": "我们知道熊猫很可爱。",
        "sentence": "We know that the panda is cute."
      },
      {
        "audio": "Can you tell me where the classroom is?",
        "opts": [
          "Can you tell me where the classroom is?",
          "Can you tell me that the classroom is?",
          "Can you tell me if the classroom is?"
        ],
        "ans": 0,
        "hint": "注意 where 引导地点",
        "zh": "你能告诉我教室在哪里吗？",
        "sentence": "Can you tell me where the classroom is?"
      },
      {
        "audio": "He says that dinner is ready.",
        "opts": [
          "He says that dinner is ready.",
          "He says if dinner is ready.",
          "He says what dinner is ready."
        ],
        "ans": 0,
        "hint": "听清 that 和 dinner",
        "zh": "他说晚饭准备好了。",
        "sentence": "He says that dinner is ready."
      },
      {
        "audio": "I think that the window is open.",
        "opts": [
          "I think that the window is open.",
          "I think if the window is open.",
          "I think what the window is open."
        ],
        "ans": 0,
        "hint": "注意 that 引导陈述",
        "zh": "我认为窗户开着。",
        "sentence": "I think that the window is open."
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
    "image": "w3-oc-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I know that pandas eat bamboo.",
        "zh": "我知道熊猫吃竹子。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I think that our team will win the game.",
        "zh": "我认为我们队会赢下比赛。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "She says that the library opens at nine.",
        "zh": "她说图书馆九点开门。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Do you know what time the bus leaves?",
        "zh": "你知道公交车几点出发吗？",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "I know where the cat is hiding.",
        "zh": "我知道猫藏在哪里。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "He thinks that the moon is beautiful tonight.",
        "zh": "他觉得今晚的月亮很美。",
        "tag": "daily_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "I know that the doctor is very kind.",
        "zh": "我知道那位医生很和蔼。",
        "tag": "daily_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "We think that the apple is sweet.",
        "zh": "我们觉得这个苹果很甜。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "I know that he plays the piano well.",
        "zh": "我知道他钢琴弹得好。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "Can you tell me what she wants?",
        "zh": "你能告诉我她想要什么吗？",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "I don't know if it will rain tomorrow.",
        "zh": "我不知道明天会不会下雨。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "She knows that the window is open.",
        "zh": "她知道窗户开着。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "I think that the tall boy is my friend.",
        "zh": "我认为那个高个男孩是我朋友。",
        "tag": "exam_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "Do you know where the classroom is?",
        "zh": "你知道教室在哪里吗？",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "He says that dinner is ready.",
        "zh": "他说晚饭准备好了。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I know that the basketball is under the desk.",
        "zh": "我知道篮球在桌子下面。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "I think that we should go to the park.",
        "zh": "我认为我们应该去公园。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "She says that she likes hotpot.",
        "zh": "她说她喜欢火锅。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I know that Chengdu is a big city.",
        "zh": "我知道成都是一个大城市。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He thinks that the book is interesting.",
        "zh": "他觉得这本书很有趣。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "I don't know what he is doing now.",
        "zh": "我不知道他现在在做什么。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We know that the panda is very cute.",
        "zh": "我们知道熊猫很可爱。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "She thinks that the piano lesson is fun.",
        "zh": "她觉得钢琴课很有趣。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "I know that the shop sells apples.",
        "zh": "我知道那家店卖苹果。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
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
    "image": "w3-oc-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "She doesn't know _____ he likes hotpot.",
        "opts": [
          "that",
          "where",
          "if"
        ],
        "ans": 2,
        "hint": "不确定是否，用 if",
        "sentence": "She doesn't know if he likes hotpot.",
        "zh": "她不知道他是否喜欢火锅。"
      },
      {
        "q": "We know _____ the panda is in the zoo.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述事实，用 that",
        "sentence": "We know that the panda is in the zoo.",
        "zh": "我们知道熊猫在动物园里。"
      },
      {
        "q": "Can you tell me _____ the piano is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the piano is?",
        "zh": "你能告诉我钢琴在哪里吗？"
      },
      {
        "q": "I know _____ the shop is open.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the shop is open.",
        "zh": "我知道那家店开着。"
      },
      {
        "q": "Do you know _____ he is taller than me?",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 1,
        "hint": "询问是否，用 if",
        "sentence": "Do you know if he is taller than me?",
        "zh": "你知道他是否比我高吗？"
      },
      {
        "q": "She thinks _____ the dinner is delicious.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "She thinks that the dinner is delicious.",
        "zh": "她觉得晚餐很好吃。"
      },
      {
        "q": "I don't know _____ he is in the classroom.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if he is in the classroom.",
        "zh": "我不知道他是否在教室里。"
      },
      {
        "q": "We think _____ the playground is big.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述想法，用 that",
        "sentence": "We think that the playground is big.",
        "zh": "我们认为操场很大。"
      },
      {
        "q": "Can you tell me _____ the bus goes?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the bus goes?",
        "zh": "你能告诉我公交车去哪里吗？"
      },
      {
        "q": "I know _____ the apple is on the table.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述事实，用 that",
        "sentence": "I know that the apple is on the table.",
        "zh": "我知道苹果在桌子上。"
      },
      {
        "q": "He doesn't know _____ she plays the piano.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "He doesn't know if she plays the piano.",
        "zh": "他不知道她是否弹钢琴。"
      },
      {
        "q": "I think _____ the umbrella is in the bag.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述想法，用 that",
        "sentence": "I think that the umbrella is in the bag.",
        "zh": "我认为雨伞在包里。"
      },
      {
        "q": "Do you know _____ the cat is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Do you know where the cat is?",
        "zh": "你知道猫在哪里吗？"
      },
      {
        "q": "She says _____ she will go to the shop.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "转述内容，用 that",
        "sentence": "She says that she will go to the shop.",
        "zh": "她说她要去商店。"
      },
      {
        "q": "I don't know _____ the doctor comes today.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "不确定是否，用 if",
        "sentence": "I don't know if the doctor comes today.",
        "zh": "我不知道医生今天是否来。"
      },
      {
        "q": "We know _____ the moon is far away.",
        "opts": [
          "what",
          "if",
          "that"
        ],
        "ans": 2,
        "hint": "陈述事实，用 that",
        "sentence": "We know that the moon is far away.",
        "zh": "我们知道月亮很远。"
      },
      {
        "q": "Can you tell me _____ the basketball is?",
        "opts": [
          "where",
          "that",
          "if"
        ],
        "ans": 0,
        "hint": "询问地点，用 where",
        "sentence": "Can you tell me where the basketball is?",
        "zh": "你能告诉我篮球在哪里吗？"
      },
      {
        "q": "He thinks _____ the window is clean.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 0,
        "hint": "陈述想法，用 that",
        "sentence": "He thinks that the window is clean.",
        "zh": "他认为窗户很干净。"
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
      "宾语从句：陈述语序",
      "What do you think + 主语 + 谓语",
      "易错：× can we do → ✓ we can do",
      "主句过去时，从句常要时态后退，初中再展开。"
    ],
    "chant": "Clause order — subject first! No do-does flip — avoid the worst!",
    "chantSpeak": "Clause order, subject first! No do does flip, avoid the worst!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "宾语从句 · 陈述语序",
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