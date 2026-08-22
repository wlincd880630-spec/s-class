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
    "audio": "I want to join the art club.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。",
    "image": "w5-wn-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-wn-hero.jpg",
    "question": "The window needs repairing 是什么意思？",
    "choices": [
      {
        "text": "窗户需要被修理（need doing = 被动）",
        "correct": true,
        "fb": "对了！need doing = need to be done。"
      },
      {
        "text": "窗户需要修理别人",
        "correct": false,
        "fb": "need doing 主语是承受动作的对象。"
      },
      {
        "text": "窗户正在修理",
        "correct": false,
        "fb": "need doing 表需要被…，不是进行时。"
      }
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-wn-hero.jpg",
    "lead": "want / would like 后接 to do；need 可接 to do 或 doing。",
    "formula": "want to do　　need to do　　need doing = need to be done",
    "parts": [
      {
        "mark": "want",
        "label": "想要",
        "example": "want to join"
      },
      {
        "mark": "need to",
        "label": "需要去做",
        "example": "need to wash"
      },
      {
        "mark": "need doing",
        "label": "某物需要被……",
        "example": "needs washing"
      }
    ],
    "samples": [
      {
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社。"
      },
      {
        "sentence": "My hair is dirty. It needs washing.",
        "zh": "我头发脏了，需要洗。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-wn-want.jpg",
    "rightImage": "w5-wn-need.jpg",
    "leftLabel": "want to do",
    "rightLabel": "need doing",
    "leftSentence": "I want to join the art club.",
    "leftZh": "我想加入美术社团。",
    "rightSentence": "The window needs repairing.",
    "rightZh": "窗户需要修理。",
    "morphBase": "want to",
    "morphPast": "need doing",
    "morphHighlight": "",
    "discovery": "want to do 想要做；need to do 需要做；need doing = need to be done 需要被…。"
  },
  {
    "section": "精讲",
    "title": "例句 · want to do",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-wn-hero.jpg",
    "lead": "人作主语：want to + 原形。",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · need doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-wn-hero.jpg",
    "lead": "物作主语：needs washing = needs to be washed。",
    "sentence": "The car needs washing.",
    "zh": "这辆车需要洗。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "want to 表达愿望",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-piano.png",
    "lead": "want to后接动词原形，表示想要做某事。",
    "sentence": "I want to learn piano.",
    "zh": "我想学钢琴。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "need to 表达需求",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "need to后接动词原形，表示需要去做某事。",
    "sentence": "We need to clean the classroom.",
    "zh": "我们需要打扫教室。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "need doing 被动含义",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-window.png",
    "lead": "need doing表示某物需要被做，相当于need to be done。",
    "sentence": "The window needs cleaning.",
    "zh": "窗户需要清洁。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-wn-hero.jpg",
    "lead": "want 与 need 的两套结构。",
    "rules": [
      {
        "tab": "want to",
        "rule": "want to + 动词原形（想要做）",
        "focusVerb": "want",
        "examples": [
          {
            "from": "join",
            "to": "want to join"
          }
        ],
        "sample": "I want to join the art club.",
        "sampleZh": "我想加入美术社团。"
      },
      {
        "tab": "need",
        "rule": "need to do 需要做；need doing = need to be done 需要被…",
        "focusVerb": "need",
        "examples": [
          {
            "from": "repair",
            "to": "needs repairing"
          },
          {
            "from": "wash",
            "to": "needs washing"
          }
        ],
        "sample": "The window needs repairing.",
        "sampleZh": "窗户需要修理。"
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
    "image": "w5-wn-hero.jpg",
    "buckets": [
      {
        "key": "want",
        "label": "want to do"
      },
      {
        "key": "need",
        "label": "need to / need doing"
      }
    ],
    "items": [
      {
        "text": "want to join",
        "bucket": "want"
      },
      {
        "text": "need to study",
        "bucket": "need"
      },
      {
        "text": "want to be a doctor",
        "bucket": "want"
      },
      {
        "text": "need repairing",
        "bucket": "need"
      },
      {
        "text": "want to learn English",
        "bucket": "want"
      },
      {
        "text": "need washing",
        "bucket": "need"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-wn-hero.jpg",
    "question": "「I want joining the club.」应改成？",
    "choices": [
      {
        "text": "want to join",
        "correct": true,
        "fb": "want + to do。"
      },
      {
        "text": "want join",
        "correct": false,
        "fb": "缺 to。"
      },
      {
        "text": "want joined",
        "correct": false,
        "fb": "不是过去分词。"
      }
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-wn-hero.jpg",
    "lead": "need to be done 改成 need doing。",
    "items": [
      {
        "from": "The room needs to be cleaned.",
        "fromZh": "房间需要被打扫。",
        "steps": [
          {
            "label": "改成 need doing",
            "opts": [
              "The room needs cleaning.",
              "The room needs clean.",
              "The room needs to cleaning."
            ],
            "ans": 0,
            "hint": "need + doing 表被动。",
            "sentence": "The room needs cleaning.",
            "zh": "房间需要打扫。"
          }
        ]
      },
      {
        "from": "I want joining the club.",
        "fromZh": "我想加入俱乐部。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "I want to join the club.",
              "I want join the club.",
              "I want joining club."
            ],
            "ans": 0,
            "hint": "want后接to do。",
            "sentence": "I want to join the club.",
            "zh": "我想加入俱乐部。"
          }
        ]
      },
      {
        "from": "She needs to doing her homework.",
        "fromZh": "她需要做作业。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "She needs to do her homework.",
              "She needs doing her homework.",
              "She need to do her homework."
            ],
            "ans": 0,
            "hint": "need to do。",
            "sentence": "She needs to do her homework.",
            "zh": "她需要做作业。"
          }
        ]
      },
      {
        "from": "The car needs to wash.",
        "fromZh": "汽车需要清洗。",
        "steps": [
          {
            "label": "改成被动含义",
            "opts": [
              "The car needs washing.",
              "The car needs to washing.",
              "The car need washing."
            ],
            "ans": 0,
            "hint": "need doing表示被动。",
            "sentence": "The car needs washing.",
            "zh": "汽车需要清洗。"
          }
        ]
      },
      {
        "from": "He want to play piano.",
        "fromZh": "他想弹钢琴。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "He wants to play piano.",
              "He want to playing piano.",
              "He wants playing piano."
            ],
            "ans": 0,
            "hint": "第三人称单数用wants。",
            "sentence": "He wants to play piano.",
            "zh": "他想弹钢琴。"
          }
        ]
      },
      {
        "from": "We need to cleaning the room.",
        "fromZh": "我们需要打扫房间。",
        "steps": [
          {
            "label": "改成正确形式",
            "opts": [
              "We need to clean the room.",
              "We need cleaning the room.",
              "We need to cleaning room."
            ],
            "ans": 0,
            "hint": "need to do。",
            "sentence": "We need to clean the room.",
            "zh": "我们需要打扫房间。"
          }
        ]
      },
      {
        "from": "The flowers need to water.",
        "fromZh": "花需要浇水。",
        "steps": [
          {
            "label": "改成被动含义",
            "opts": [
              "The flowers need watering.",
              "The flowers need to watering.",
              "The flowers need water."
            ],
            "ans": 0,
            "hint": "need doing表示被动。",
            "sentence": "The flowers need watering.",
            "zh": "花需要浇水。"
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
    "image": "kp3d-playground.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "want",
      "to",
      "go",
      "to",
      "the",
      "park"
    ],
    "sentence": "I want to go to the park.",
    "zh": "我想去公园。",
    "items": [
      {
        "tokens": [
          "I",
          "want",
          "to",
          "go",
          "to",
          "the",
          "park"
        ],
        "sentence": "I want to go to the park.",
        "zh": "我想去公园。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "She",
          "needs",
          "to",
          "buy",
          "some",
          "bread"
        ],
        "sentence": "She needs to buy some bread.",
        "zh": "她需要买一些面包。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "The",
          "bike",
          "needs",
          "repairing"
        ],
        "sentence": "The bike needs repairing.",
        "zh": "自行车需要修理。",
        "image": "kp3d-basketball.png"
      },
      {
        "tokens": [
          "We",
          "want",
          "to",
          "see",
          "pandas"
        ],
        "sentence": "We want to see pandas.",
        "zh": "我们想看熊猫。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "He",
          "needs",
          "to",
          "take",
          "an",
          "umbrella"
        ],
        "sentence": "He needs to take an umbrella.",
        "zh": "他需要带伞。",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "They",
          "want",
          "to",
          "play",
          "the",
          "piano"
        ],
        "sentence": "They want to play the piano.",
        "zh": "他们想弹钢琴。",
        "image": "kp3d-piano.png"
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
    "image": "w5-wn-hero.jpg",
    "audio": "I want to join the art club.",
    "tokens": [
      "I",
      "want",
      "to",
      "join",
      "the",
      "art",
      "club"
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-wn-hero.jpg",
    "q": "My hair is dirty. It needs _____.",
    "opts": [
      "wash",
      "washing",
      "to wash"
    ],
    "ans": 1,
    "hint": "need doing = 需要被洗，hair needs washing。",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-wn-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "My hair is dirty. It needs _____.",
        "opts": [
          "wash",
          "washing",
          "to wash"
        ],
        "ans": 1,
        "hint": "need doing = 需要被洗，hair needs washing。",
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社团。"
      },
      {
        "q": "She would like _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "would like to do。",
        "sentence": "She would like to have a rest.",
        "zh": "她想休息一下。"
      },
      {
        "q": "You need _____ more water.",
        "opts": [
          "drink",
          "to drink",
          "drinking"
        ],
        "ans": 1,
        "hint": "人作主语 need to do。",
        "sentence": "You need to drink more water.",
        "zh": "你需要多喝水。"
      },
      {
        "q": "Your shoes need _____.",
        "opts": [
          "polish",
          "to polish",
          "polishing"
        ],
        "ans": 2,
        "hint": "物作主语 need doing。",
        "sentence": "Your shoes need polishing.",
        "zh": "你的鞋需要擦。"
      },
      {
        "q": "He doesn't want _____ outside. It's cold.",
        "opts": [
          "to go",
          "going",
          "go"
        ],
        "ans": 0,
        "hint": "want to go。",
        "sentence": "He doesn't want to go outside.",
        "zh": "他不想出去。"
      },
      {
        "q": "The flowers need _____ every day.",
        "opts": [
          "to water",
          "watering",
          "watered"
        ],
        "ans": 1,
        "hint": "花需要被浇 → watering。",
        "sentence": "The flowers need watering every day.",
        "zh": "花需要每天浇。"
      },
      {
        "q": "I _____ to play football.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 0,
        "hint": "主语I后用want原形。",
        "sentence": "I want to play football.",
        "zh": "我想踢足球。"
      },
      {
        "q": "She _____ to eat an apple.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语She是第三人称单数，用wants。",
        "sentence": "She wants to eat an apple.",
        "zh": "她想吃一个苹果。"
      },
      {
        "q": "We _____ to go to the zoo.",
        "opts": [
          "need",
          "needs",
          "needing"
        ],
        "ans": 0,
        "hint": "主语We用need原形。",
        "sentence": "We need to go to the zoo.",
        "zh": "我们需要去动物园。"
      },
      {
        "q": "The cat _____ to drink milk.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语The cat是第三人称单数。",
        "sentence": "The cat wants to drink milk.",
        "zh": "猫想喝牛奶。"
      },
      {
        "q": "My bike is broken. It needs _____.",
        "opts": [
          "fix",
          "fixing",
          "to fixing"
        ],
        "ans": 1,
        "hint": "need doing表示被动。",
        "sentence": "My bike is broken. It needs fixing.",
        "zh": "我的自行车坏了，需要修理。"
      },
      {
        "q": "_____ you want to go with me?",
        "opts": [
          "Do",
          "Does",
          "Are"
        ],
        "ans": 0,
        "hint": "主语you，用助动词Do。",
        "sentence": "Do you want to go with me?",
        "zh": "你想和我一起去吗？"
      },
      {
        "q": "He _____ to buy a gift for his mother.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语He是第三人称单数。",
        "sentence": "He wants to buy a gift for his mother.",
        "zh": "他想给妈妈买礼物。"
      },
      {
        "q": "The vegetables need _____.",
        "opts": [
          "wash",
          "washing",
          "to washing"
        ],
        "ans": 1,
        "hint": "need doing表示被动。",
        "sentence": "The vegetables need washing.",
        "zh": "蔬菜需要清洗。"
      },
      {
        "q": "I need _____ my room.",
        "opts": [
          "clean",
          "to clean",
          "cleaning"
        ],
        "ans": 1,
        "hint": "need to do表示主动。",
        "sentence": "I need to clean my room.",
        "zh": "我需要打扫房间。"
      },
      {
        "q": "They want _____ basketball.",
        "opts": [
          "play",
          "to play",
          "playing"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "They want to play basketball.",
        "zh": "他们想打篮球。"
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
        "q": "My hair is dirty. It needs _____.",
        "opts": [
          "wash",
          "washing",
          "to wash"
        ],
        "ans": 1,
        "hint": "need doing = 需要被洗，hair needs washing。",
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社团。"
      },
      {
        "q": "She would like _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "would like to do。",
        "sentence": "She would like to have a rest.",
        "zh": "她想休息一下。"
      },
      {
        "q": "You need _____ more water.",
        "opts": [
          "drink",
          "to drink",
          "drinking"
        ],
        "ans": 1,
        "hint": "人作主语 need to do。",
        "sentence": "You need to drink more water.",
        "zh": "你需要多喝水。"
      },
      {
        "q": "Your shoes need _____.",
        "opts": [
          "polish",
          "to polish",
          "polishing"
        ],
        "ans": 2,
        "hint": "物作主语 need doing。",
        "sentence": "Your shoes need polishing.",
        "zh": "你的鞋需要擦。"
      },
      {
        "q": "He doesn't want _____ outside. It's cold.",
        "opts": [
          "to go",
          "going",
          "go"
        ],
        "ans": 0,
        "hint": "want to go。",
        "sentence": "He doesn't want to go outside.",
        "zh": "他不想出去。"
      },
      {
        "q": "The flowers need _____ every day.",
        "opts": [
          "to water",
          "watering",
          "watered"
        ],
        "ans": 1,
        "hint": "花需要被浇 → watering。",
        "sentence": "The flowers need watering every day.",
        "zh": "花需要每天浇。"
      },
      {
        "q": "I _____ to play football.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 0,
        "hint": "主语I后用want原形。",
        "sentence": "I want to play football.",
        "zh": "我想踢足球。"
      },
      {
        "q": "She _____ to eat an apple.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语She是第三人称单数，用wants。",
        "sentence": "She wants to eat an apple.",
        "zh": "她想吃一个苹果。"
      },
      {
        "q": "We _____ to go to the zoo.",
        "opts": [
          "need",
          "needs",
          "needing"
        ],
        "ans": 0,
        "hint": "主语We用need原形。",
        "sentence": "We need to go to the zoo.",
        "zh": "我们需要去动物园。"
      },
      {
        "q": "The cat _____ to drink milk.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语The cat是第三人称单数。",
        "sentence": "The cat wants to drink milk.",
        "zh": "猫想喝牛奶。"
      },
      {
        "q": "My bike is broken. It needs _____.",
        "opts": [
          "fix",
          "fixing",
          "to fixing"
        ],
        "ans": 1,
        "hint": "need doing表示被动。",
        "sentence": "My bike is broken. It needs fixing.",
        "zh": "我的自行车坏了，需要修理。"
      },
      {
        "q": "_____ you want to go with me?",
        "opts": [
          "Do",
          "Does",
          "Are"
        ],
        "ans": 0,
        "hint": "主语you，用助动词Do。",
        "sentence": "Do you want to go with me?",
        "zh": "你想和我一起去吗？"
      },
      {
        "q": "He _____ to buy a gift for his mother.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语He是第三人称单数。",
        "sentence": "He wants to buy a gift for his mother.",
        "zh": "他想给妈妈买礼物。"
      },
      {
        "q": "The vegetables need _____.",
        "opts": [
          "wash",
          "washing",
          "to washing"
        ],
        "ans": 1,
        "hint": "need doing表示被动。",
        "sentence": "The vegetables need washing.",
        "zh": "蔬菜需要清洗。"
      },
      {
        "q": "I need _____ my room.",
        "opts": [
          "clean",
          "to clean",
          "cleaning"
        ],
        "ans": 1,
        "hint": "need to do表示主动。",
        "sentence": "I need to clean my room.",
        "zh": "我需要打扫房间。"
      },
      {
        "q": "They want _____ basketball.",
        "opts": [
          "play",
          "to play",
          "playing"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "They want to play basketball.",
        "zh": "他们想打篮球。"
      },
      {
        "q": "The floor needs _____.",
        "opts": [
          "sweep",
          "sweeping",
          "to sweeping"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The floor needs sweeping.",
        "zh": "地板需要清扫。"
      },
      {
        "q": "She _____ to visit the panda base.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语She。",
        "sentence": "She wants to visit the panda base.",
        "zh": "她想参观熊猫基地。"
      },
      {
        "q": "We need _____ a bus to school.",
        "opts": [
          "take",
          "to take",
          "taking"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to take a bus to school.",
        "zh": "我们需要乘公交车上学。"
      },
      {
        "q": "The dog wants _____ a walk.",
        "opts": [
          "go",
          "to go",
          "going"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "The dog wants to go for a walk.",
        "zh": "狗想去散步。"
      },
      {
        "q": "I want _____ a doctor.",
        "opts": [
          "be",
          "to be",
          "being"
        ],
        "ans": 1,
        "hint": "want to be。",
        "sentence": "I want to be a doctor.",
        "zh": "我想成为一名医生。"
      },
      {
        "q": "The plants need _____.",
        "opts": [
          "water",
          "watering",
          "to watering"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The plants need watering.",
        "zh": "植物需要浇水。"
      },
      {
        "q": "Does he want _____ to the park?",
        "opts": [
          "go",
          "to go",
          "going"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "Does he want to go to the park?",
        "zh": "他想去公园吗？"
      },
      {
        "q": "We need _____ our homework before dinner.",
        "opts": [
          "finish",
          "to finish",
          "finishing"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to finish our homework before dinner.",
        "zh": "我们需要在晚饭前完成作业。"
      },
      {
        "q": "The window needs _____.",
        "opts": [
          "clean",
          "cleaning",
          "to cleaning"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The window needs cleaning.",
        "zh": "窗户需要清洁。"
      },
      {
        "q": "I want _____ a book from the library.",
        "opts": [
          "borrow",
          "to borrow",
          "borrowing"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "I want to borrow a book from the library.",
        "zh": "我想从图书馆借一本书。"
      },
      {
        "q": "She needs _____ her umbrella.",
        "opts": [
          "take",
          "to take",
          "taking"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "She needs to take her umbrella.",
        "zh": "她需要带伞。"
      },
      {
        "q": "The car needs _____.",
        "opts": [
          "wash",
          "washing",
          "to washing"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The car needs washing.",
        "zh": "汽车需要清洗。"
      },
      {
        "q": "They want _____ a picnic.",
        "opts": [
          "have",
          "to have",
          "having"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "They want to have a picnic.",
        "zh": "他们想去野餐。"
      },
      {
        "q": "I need _____ my shoes.",
        "opts": [
          "clean",
          "to clean",
          "cleaning"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "I need to clean my shoes.",
        "zh": "我需要擦鞋。"
      },
      {
        "q": "The room needs _____.",
        "opts": [
          "paint",
          "painting",
          "to painting"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The room needs painting.",
        "zh": "房间需要粉刷。"
      },
      {
        "q": "She wants _____ a singer.",
        "opts": [
          "be",
          "to be",
          "being"
        ],
        "ans": 1,
        "hint": "want to be。",
        "sentence": "She wants to be a singer.",
        "zh": "她想成为一名歌手。"
      },
      {
        "q": "We need _____ more vegetables.",
        "opts": [
          "eat",
          "to eat",
          "eating"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to eat more vegetables.",
        "zh": "我们需要多吃蔬菜。"
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
        "q": "My hair is dirty. It needs _____.",
        "opts": [
          "wash",
          "washing",
          "to wash"
        ],
        "ans": 1,
        "hint": "need doing = 需要被洗，hair needs washing。",
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社团。"
      },
      {
        "q": "She would like _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "would like to do。",
        "sentence": "She would like to have a rest.",
        "zh": "她想休息一下。"
      },
      {
        "q": "You need _____ more water.",
        "opts": [
          "drink",
          "to drink",
          "drinking"
        ],
        "ans": 1,
        "hint": "人作主语 need to do。",
        "sentence": "You need to drink more water.",
        "zh": "你需要多喝水。"
      },
      {
        "q": "Your shoes need _____.",
        "opts": [
          "polish",
          "to polish",
          "polishing"
        ],
        "ans": 2,
        "hint": "物作主语 need doing。",
        "sentence": "Your shoes need polishing.",
        "zh": "你的鞋需要擦。"
      },
      {
        "q": "He doesn't want _____ outside. It's cold.",
        "opts": [
          "to go",
          "going",
          "go"
        ],
        "ans": 0,
        "hint": "want to go。",
        "sentence": "He doesn't want to go outside.",
        "zh": "他不想出去。"
      },
      {
        "q": "The flowers need _____ every day.",
        "opts": [
          "to water",
          "watering",
          "watered"
        ],
        "ans": 1,
        "hint": "花需要被浇 → watering。",
        "sentence": "The flowers need watering every day.",
        "zh": "花需要每天浇。"
      },
      {
        "q": "I _____ to play football.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 0,
        "hint": "主语I后用want原形。",
        "sentence": "I want to play football.",
        "zh": "我想踢足球。"
      },
      {
        "q": "She _____ to eat an apple.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语She是第三人称单数，用wants。",
        "sentence": "She wants to eat an apple.",
        "zh": "她想吃一个苹果。"
      },
      {
        "q": "We _____ to go to the zoo.",
        "opts": [
          "need",
          "needs",
          "needing"
        ],
        "ans": 0,
        "hint": "主语We用need原形。",
        "sentence": "We need to go to the zoo.",
        "zh": "我们需要去动物园。"
      },
      {
        "q": "The cat _____ to drink milk.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语The cat是第三人称单数。",
        "sentence": "The cat wants to drink milk.",
        "zh": "猫想喝牛奶。"
      },
      {
        "q": "My bike is broken. It needs _____.",
        "opts": [
          "fix",
          "fixing",
          "to fixing"
        ],
        "ans": 1,
        "hint": "need doing表示被动。",
        "sentence": "My bike is broken. It needs fixing.",
        "zh": "我的自行车坏了，需要修理。"
      },
      {
        "q": "_____ you want to go with me?",
        "opts": [
          "Do",
          "Does",
          "Are"
        ],
        "ans": 0,
        "hint": "主语you，用助动词Do。",
        "sentence": "Do you want to go with me?",
        "zh": "你想和我一起去吗？"
      },
      {
        "q": "He _____ to buy a gift for his mother.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语He是第三人称单数。",
        "sentence": "He wants to buy a gift for his mother.",
        "zh": "他想给妈妈买礼物。"
      },
      {
        "q": "The vegetables need _____.",
        "opts": [
          "wash",
          "washing",
          "to washing"
        ],
        "ans": 1,
        "hint": "need doing表示被动。",
        "sentence": "The vegetables need washing.",
        "zh": "蔬菜需要清洗。"
      },
      {
        "q": "I need _____ my room.",
        "opts": [
          "clean",
          "to clean",
          "cleaning"
        ],
        "ans": 1,
        "hint": "need to do表示主动。",
        "sentence": "I need to clean my room.",
        "zh": "我需要打扫房间。"
      },
      {
        "q": "They want _____ basketball.",
        "opts": [
          "play",
          "to play",
          "playing"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "They want to play basketball.",
        "zh": "他们想打篮球。"
      },
      {
        "q": "The floor needs _____.",
        "opts": [
          "sweep",
          "sweeping",
          "to sweeping"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The floor needs sweeping.",
        "zh": "地板需要清扫。"
      },
      {
        "q": "She _____ to visit the panda base.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语She。",
        "sentence": "She wants to visit the panda base.",
        "zh": "她想参观熊猫基地。"
      },
      {
        "q": "We need _____ a bus to school.",
        "opts": [
          "take",
          "to take",
          "taking"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to take a bus to school.",
        "zh": "我们需要乘公交车上学。"
      },
      {
        "q": "The dog wants _____ a walk.",
        "opts": [
          "go",
          "to go",
          "going"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "The dog wants to go for a walk.",
        "zh": "狗想去散步。"
      },
      {
        "q": "I want _____ a doctor.",
        "opts": [
          "be",
          "to be",
          "being"
        ],
        "ans": 1,
        "hint": "want to be。",
        "sentence": "I want to be a doctor.",
        "zh": "我想成为一名医生。"
      },
      {
        "q": "The plants need _____.",
        "opts": [
          "water",
          "watering",
          "to watering"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The plants need watering.",
        "zh": "植物需要浇水。"
      },
      {
        "q": "Does he want _____ to the park?",
        "opts": [
          "go",
          "to go",
          "going"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "Does he want to go to the park?",
        "zh": "他想去公园吗？"
      },
      {
        "q": "We need _____ our homework before dinner.",
        "opts": [
          "finish",
          "to finish",
          "finishing"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to finish our homework before dinner.",
        "zh": "我们需要在晚饭前完成作业。"
      },
      {
        "q": "The window needs _____.",
        "opts": [
          "clean",
          "cleaning",
          "to cleaning"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The window needs cleaning.",
        "zh": "窗户需要清洁。"
      },
      {
        "q": "I want _____ a book from the library.",
        "opts": [
          "borrow",
          "to borrow",
          "borrowing"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "I want to borrow a book from the library.",
        "zh": "我想从图书馆借一本书。"
      },
      {
        "q": "She needs _____ her umbrella.",
        "opts": [
          "take",
          "to take",
          "taking"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "She needs to take her umbrella.",
        "zh": "她需要带伞。"
      },
      {
        "q": "The car needs _____.",
        "opts": [
          "wash",
          "washing",
          "to washing"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The car needs washing.",
        "zh": "汽车需要清洗。"
      },
      {
        "q": "They want _____ a picnic.",
        "opts": [
          "have",
          "to have",
          "having"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "They want to have a picnic.",
        "zh": "他们想去野餐。"
      },
      {
        "q": "I need _____ my shoes.",
        "opts": [
          "clean",
          "to clean",
          "cleaning"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "I need to clean my shoes.",
        "zh": "我需要擦鞋。"
      },
      {
        "q": "The room needs _____.",
        "opts": [
          "paint",
          "painting",
          "to painting"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The room needs painting.",
        "zh": "房间需要粉刷。"
      },
      {
        "q": "She wants _____ a singer.",
        "opts": [
          "be",
          "to be",
          "being"
        ],
        "ans": 1,
        "hint": "want to be。",
        "sentence": "She wants to be a singer.",
        "zh": "她想成为一名歌手。"
      },
      {
        "q": "We need _____ more vegetables.",
        "opts": [
          "eat",
          "to eat",
          "eating"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to eat more vegetables.",
        "zh": "我们需要多吃蔬菜。"
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
    "image": "w5-wn-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "want to join",
        "zh": "想加入"
      },
      {
        "en": "would like to",
        "zh": "想要"
      },
      {
        "en": "need to do",
        "zh": "需要去做"
      },
      {
        "en": "need doing",
        "zh": "需要被……"
      },
      {
        "en": "want to eat",
        "zh": "想吃"
      },
      {
        "en": "need to go",
        "zh": "需要去"
      },
      {
        "en": "needs washing",
        "zh": "需要洗"
      },
      {
        "en": "wants to play",
        "zh": "想玩"
      },
      {
        "en": "need to study",
        "zh": "需要学习"
      },
      {
        "en": "needs cleaning",
        "zh": "需要清洁"
      },
      {
        "en": "want to buy",
        "zh": "想买"
      },
      {
        "en": "need to take",
        "zh": "需要带"
      },
      {
        "en": "needs fixing",
        "zh": "需要修理"
      },
      {
        "en": "want to help",
        "zh": "想帮忙"
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
    "image": "w5-wn-hero.jpg",
    "audio": "I want to drink some water.",
    "opts": [
      "I want to drink some water.",
      "I want drinking some water.",
      "I wants to drink some water."
    ],
    "ans": 0,
    "hint": "want to do。",
    "sentence": "I want to drink some water.",
    "zh": "我想喝点水。",
    "questions": [
      {
        "audio": "I want to drink some water.",
        "opts": [
          "I want to drink some water.",
          "I want drinking some water.",
          "I wants to drink some water."
        ],
        "ans": 0,
        "hint": "want to do。",
        "zh": "我想喝点水。",
        "sentence": "I want to drink some water."
      },
      {
        "audio": "She needs to go to school.",
        "opts": [
          "She needs to go to school.",
          "She need to go to school.",
          "She needs going to school."
        ],
        "ans": 0,
        "hint": "第三人称单数needs。",
        "zh": "她需要去上学。",
        "sentence": "She needs to go to school."
      },
      {
        "audio": "The shirt needs ironing.",
        "opts": [
          "The shirt needs ironing.",
          "The shirt needs to iron.",
          "The shirt need ironing."
        ],
        "ans": 0,
        "hint": "need doing。",
        "zh": "衬衫需要熨烫。",
        "sentence": "The shirt needs ironing."
      },
      {
        "audio": "We want to visit the museum.",
        "opts": [
          "We want to visit the museum.",
          "We want visiting the museum.",
          "We wants to visit the museum."
        ],
        "ans": 0,
        "hint": "want to do。",
        "zh": "我们想参观博物馆。",
        "sentence": "We want to visit the museum."
      },
      {
        "audio": "He needs to do his homework.",
        "opts": [
          "He needs to do his homework.",
          "He need to do his homework.",
          "He needs doing his homework."
        ],
        "ans": 0,
        "hint": "need to do。",
        "zh": "他需要做作业。",
        "sentence": "He needs to do his homework."
      },
      {
        "audio": "The dog wants to go out.",
        "opts": [
          "The dog wants to go out.",
          "The dog want to go out.",
          "The dog wants going out."
        ],
        "ans": 0,
        "hint": "want to do。",
        "zh": "狗想出去。",
        "sentence": "The dog wants to go out."
      },
      {
        "audio": "I need to wash my hands.",
        "opts": [
          "I need to wash my hands.",
          "I need washing my hands.",
          "I needs to wash my hands."
        ],
        "ans": 0,
        "hint": "need to do。",
        "zh": "我需要洗手。",
        "sentence": "I need to wash my hands."
      },
      {
        "audio": "The apple needs cutting.",
        "opts": [
          "The apple needs cutting.",
          "The apple needs to cut.",
          "The apple need cutting."
        ],
        "ans": 0,
        "hint": "need doing。",
        "zh": "苹果需要切。",
        "sentence": "The apple needs cutting."
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
    "image": "w5-wn-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I want to join the art club.",
        "zh": "我想加入美术俱乐部。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She wants to buy a new dress.",
        "zh": "她想买一条新裙子。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "We need to clean the classroom.",
        "zh": "我们需要打扫教室。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The flowers need watering.",
        "zh": "这些花需要浇水。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He wants to play basketball after school.",
        "zh": "他放学后想打篮球。",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "I need to finish my homework first.",
        "zh": "我需要先完成作业。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "My shoes are dirty. They need cleaning.",
        "zh": "我的鞋脏了，需要清洗。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Do you want to eat hotpot tonight?",
        "zh": "你今晚想吃火锅吗？",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The baby wants to sleep.",
        "zh": "宝宝想睡觉。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We need to buy some fruit.",
        "zh": "我们需要买些水果。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "The car needs washing.",
        "zh": "这辆车需要清洗。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She wants to learn piano.",
        "zh": "她想学钢琴。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "I need to go to the doctor.",
        "zh": "我需要去看医生。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The room needs painting.",
        "zh": "这个房间需要粉刷。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "He wants to visit the panda base.",
        "zh": "他想参观熊猫基地。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "We need to take an umbrella.",
        "zh": "我们需要带伞。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "I want to write a story.",
        "zh": "我想写一个故事。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The grass needs cutting.",
        "zh": "草需要修剪了。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "She wants to be a doctor.",
        "zh": "她想成为一名医生。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "We need to protect the environment.",
        "zh": "我们需要保护环境。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The book needs returning to the library.",
        "zh": "这本书需要归还给图书馆。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He wants to improve his English.",
        "zh": "他想提高英语。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The dishes need washing after dinner.",
        "zh": "晚饭后碗碟需要清洗。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I want to help my mom cook.",
        "zh": "我想帮妈妈做饭。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
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
    "image": "w5-wn-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The floor needs _____.",
        "opts": [
          "sweep",
          "sweeping",
          "to sweeping"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The floor needs sweeping.",
        "zh": "地板需要清扫。"
      },
      {
        "q": "She _____ to visit the panda base.",
        "opts": [
          "want",
          "wants",
          "wanting"
        ],
        "ans": 1,
        "hint": "主语She。",
        "sentence": "She wants to visit the panda base.",
        "zh": "她想参观熊猫基地。"
      },
      {
        "q": "We need _____ a bus to school.",
        "opts": [
          "take",
          "to take",
          "taking"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to take a bus to school.",
        "zh": "我们需要乘公交车上学。"
      },
      {
        "q": "The dog wants _____ a walk.",
        "opts": [
          "go",
          "to go",
          "going"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "The dog wants to go for a walk.",
        "zh": "狗想去散步。"
      },
      {
        "q": "I want _____ a doctor.",
        "opts": [
          "be",
          "to be",
          "being"
        ],
        "ans": 1,
        "hint": "want to be。",
        "sentence": "I want to be a doctor.",
        "zh": "我想成为一名医生。"
      },
      {
        "q": "The plants need _____.",
        "opts": [
          "water",
          "watering",
          "to watering"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The plants need watering.",
        "zh": "植物需要浇水。"
      },
      {
        "q": "Does he want _____ to the park?",
        "opts": [
          "go",
          "to go",
          "going"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "Does he want to go to the park?",
        "zh": "他想去公园吗？"
      },
      {
        "q": "We need _____ our homework before dinner.",
        "opts": [
          "finish",
          "to finish",
          "finishing"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to finish our homework before dinner.",
        "zh": "我们需要在晚饭前完成作业。"
      },
      {
        "q": "The window needs _____.",
        "opts": [
          "clean",
          "cleaning",
          "to cleaning"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The window needs cleaning.",
        "zh": "窗户需要清洁。"
      },
      {
        "q": "I want _____ a book from the library.",
        "opts": [
          "borrow",
          "to borrow",
          "borrowing"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "I want to borrow a book from the library.",
        "zh": "我想从图书馆借一本书。"
      },
      {
        "q": "She needs _____ her umbrella.",
        "opts": [
          "take",
          "to take",
          "taking"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "She needs to take her umbrella.",
        "zh": "她需要带伞。"
      },
      {
        "q": "The car needs _____.",
        "opts": [
          "wash",
          "washing",
          "to washing"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The car needs washing.",
        "zh": "汽车需要清洗。"
      },
      {
        "q": "They want _____ a picnic.",
        "opts": [
          "have",
          "to have",
          "having"
        ],
        "ans": 1,
        "hint": "want to do。",
        "sentence": "They want to have a picnic.",
        "zh": "他们想去野餐。"
      },
      {
        "q": "I need _____ my shoes.",
        "opts": [
          "clean",
          "to clean",
          "cleaning"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "I need to clean my shoes.",
        "zh": "我需要擦鞋。"
      },
      {
        "q": "The room needs _____.",
        "opts": [
          "paint",
          "painting",
          "to painting"
        ],
        "ans": 1,
        "hint": "need doing。",
        "sentence": "The room needs painting.",
        "zh": "房间需要粉刷。"
      },
      {
        "q": "She wants _____ a singer.",
        "opts": [
          "be",
          "to be",
          "being"
        ],
        "ans": 1,
        "hint": "want to be。",
        "sentence": "She wants to be a singer.",
        "zh": "她想成为一名歌手。"
      },
      {
        "q": "We need _____ more vegetables.",
        "opts": [
          "eat",
          "to eat",
          "eating"
        ],
        "ans": 1,
        "hint": "need to do。",
        "sentence": "We need to eat more vegetables.",
        "zh": "我们需要多吃蔬菜。"
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
      "want to do 想要做",
      "need to do 需要做",
      "need doing = need to be done",
      "would like = want，但更礼貌，后接 to do 不接 doing。"
    ],
    "chant": "Want to do — that's your goal! Need doing — passive role!",
    "chantSpeak": "Want to do, that is your goal! Need doing, passive role!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "want to / need doing",
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