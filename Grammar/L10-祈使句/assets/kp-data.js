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
    "audio": "Don't run in the hallway.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "Don't run in the hallway.",
    "zh": "不要在走廊里跑。",
    "image": "l11-imper-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l11-imper-hero.jpg",
    "question": "为什么句首没有主语 you？",
    "choices": [
      {
        "text": "祈使句省略主语 you，动词原形开头",
        "correct": true,
        "fb": "对了！(Please) + 动词原形。"
      },
      {
        "text": "因为是过去时",
        "correct": false,
        "fb": "没有过去时间标志。"
      },
      {
        "text": "Don't 后面用 to run",
        "correct": false,
        "fb": "Don't + 动词原形。"
      }
    ],
    "sentence": "Don't run in the hallway.",
    "zh": "不要在走廊里跑。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l11-imper-hero.jpg",
    "lead": "祈使句用来发出指令、请求或建议，常常省略主语 you。",
    "formula": "(Please) + 动词原形 …　/　Don't + 动词原形 …",
    "parts": [
      {
        "mark": "肯定",
        "label": "原形开头",
        "example": "Sit down. / Please be quiet."
      },
      {
        "mark": "否定",
        "label": "Don't + 原形",
        "example": "Don't run."
      }
    ],
    "samples": [
      {
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。"
      },
      {
        "sentence": "Please be quiet in the library.",
        "zh": "请在图书馆保持安静。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l11-do.jpg",
    "rightImage": "l11-dont.jpg",
    "leftLabel": "肯定祈使",
    "rightLabel": "否定祈使 Don't",
    "leftSentence": "Open the window.",
    "leftZh": "打开窗户。",
    "rightSentence": "Don't open the window.",
    "rightZh": "不要打开窗户。",
    "morphBase": "Open",
    "morphPast": "Don't open",
    "morphHighlight": "",
    "discovery": "肯定：动词原形；否定：Don't + 原形。"
  },
  {
    "section": "精讲",
    "title": "例句 · 否定指令",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l11-imper-hero.jpg",
    "lead": "Don't + 原形，不是 Doesn't。",
    "sentence": "Don't run in the hallway.",
    "zh": "不要在走廊里跑。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · Please be",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l11-imper-hero.jpg",
    "lead": "be 也是动词原形：Please be quiet。",
    "sentence": "Please be quiet in the library.",
    "zh": "请在图书馆保持安静。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "教室规则",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "祈使句用来发出命令或请求，肯定用动词原形开头，否定用Don't。",
    "sentence": "Don't run in the hallway. Please be quiet in the library.",
    "zh": "不要在走廊里跑。请在图书馆保持安静。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "日常生活",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "用Please表示礼貌的请求。",
    "sentence": "Please wash your hands before dinner. Please close the door.",
    "zh": "晚饭前请洗手。请关门。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "户外活动",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-playground.png",
    "lead": "否定祈使句用Don't提醒不要做某事。",
    "sentence": "Don't play basketball in the hallway. Don't walk on the grass.",
    "zh": "不要在走廊里打篮球。不要踩草地。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l11-imper-hero.jpg",
    "rules": [
      {
        "tab": "肯定",
        "rule": "(Please) + 动词原形",
        "focusVerb": "Open",
        "examples": [
          {
            "from": "open",
            "to": "Open the door."
          },
          {
            "from": "be",
            "to": "Be careful!"
          }
        ],
        "sample": "Please hand in your homework.",
        "sampleZh": "请交作业。"
      },
      {
        "tab": "否定",
        "rule": "Don't + 动词原形",
        "focusVerb": "Don't",
        "examples": [
          {
            "from": "run",
            "to": "Don't run."
          },
          {
            "from": "forget",
            "to": "Don't forget."
          }
        ],
        "sample": "Don't run in the hallway.",
        "sampleZh": "不要在走廊里跑。"
      }
    ]
  },
  {
    "id": "p11",
    "section": "辨析",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l11-imper-hero.jpg",
    "buckets": [
      {
        "key": "yes",
        "label": "肯定祈使"
      },
      {
        "key": "no",
        "label": "否定祈使 Don't"
      }
    ],
    "items": [
      {
        "text": "Sit down, please.",
        "bucket": "yes"
      },
      {
        "text": "Don't talk in class.",
        "bucket": "no"
      },
      {
        "text": "Be quiet.",
        "bucket": "yes"
      },
      {
        "text": "Don't be late.",
        "bucket": "no"
      },
      {
        "text": "Listen carefully.",
        "bucket": "yes"
      },
      {
        "text": "Don't forget your book.",
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
    "image": "l11-imper-hero.jpg",
    "question": "「Doesn't forget to bring your PE kit.」应改成？",
    "choices": [
      {
        "text": "Don't forget…（祈使句否定用 Don't）",
        "correct": true,
        "fb": "祈使句没有主语，不能用 Doesn't。"
      },
      {
        "text": "Not forget…",
        "correct": false,
        "fb": "要用 Don't。"
      },
      {
        "text": "Didn't forget…",
        "correct": false,
        "fb": "这不是过去时叙述。"
      }
    ],
    "sentence": "Don't forget to bring your PE kit.",
    "zh": "别忘了带体育课用品。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l11-imper-hero.jpg",
    "lead": "把肯定祈使句改成 Don't 否定。",
    "items": [
      {
        "from": "Open the window.",
        "fromZh": "打开窗户。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "Don't open the window.",
              "Doesn't open the window.",
              "Not open the window."
            ],
            "ans": 0,
            "hint": "Don't + 原形。",
            "sentence": "Don't open the window.",
            "zh": "不要开窗。"
          }
        ]
      },
      {
        "from": "Doesn't forget to bring your PE kit.",
        "fromZh": "别忘了带你的体育用品。",
        "steps": [
          {
            "label": "改成正确的祈使句",
            "opts": [
              "Don't forget to bring your PE kit.",
              "Doesn't forget to bring your PE kit.",
              "Not forget to bring your PE kit."
            ],
            "ans": 0,
            "hint": "否定祈使句用Don't + 动词原形。",
            "sentence": "Don't forget to bring your PE kit.",
            "zh": "别忘了带你的体育用品。"
          }
        ]
      },
      {
        "from": "You don't run in the hallway.",
        "fromZh": "你不要在走廊里跑。",
        "steps": [
          {
            "label": "改成祈使句",
            "opts": [
              "Don't run in the hallway.",
              "You don't run in the hallway.",
              "Don't runs in the hallway."
            ],
            "ans": 0,
            "hint": "去掉主语you，用Don't + 动词原形。",
            "sentence": "Don't run in the hallway.",
            "zh": "不要在走廊里跑。"
          }
        ]
      },
      {
        "from": "Please you be quiet.",
        "fromZh": "请你安静。",
        "steps": [
          {
            "label": "改成正确的祈使句",
            "opts": [
              "Please be quiet.",
              "Please you be quiet.",
              "Please are quiet."
            ],
            "ans": 0,
            "hint": "祈使句不用主语you。",
            "sentence": "Please be quiet.",
            "zh": "请安静。"
          }
        ]
      },
      {
        "from": "Don't to open the window.",
        "fromZh": "不要打开窗户。",
        "steps": [
          {
            "label": "改成正确的祈使句",
            "opts": [
              "Don't open the window.",
              "Don't to open the window.",
              "Don't opening the window."
            ],
            "ans": 0,
            "hint": "Don't 后接动词原形。",
            "sentence": "Don't open the window.",
            "zh": "不要打开窗户。"
          }
        ]
      },
      {
        "from": "Please to take the bus.",
        "fromZh": "请坐公交车。",
        "steps": [
          {
            "label": "改成正确的祈使句",
            "opts": [
              "Please take the bus.",
              "Please to take the bus.",
              "Please takes the bus."
            ],
            "ans": 0,
            "hint": "Please 后接动词原形。",
            "sentence": "Please take the bus.",
            "zh": "请坐公交车。"
          }
        ]
      },
      {
        "from": "Don't eats in the classroom.",
        "fromZh": "不要在教室里吃东西。",
        "steps": [
          {
            "label": "改成正确的祈使句",
            "opts": [
              "Don't eat in the classroom.",
              "Don't eats in the classroom.",
              "Don't eating in the classroom."
            ],
            "ans": 0,
            "hint": "Don't 后接动词原形。",
            "sentence": "Don't eat in the classroom.",
            "zh": "不要在教室里吃东西。"
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
    "image": "kp3d-window.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "Please",
      "open",
      "the",
      "window"
    ],
    "sentence": "Please open the window.",
    "zh": "请打开窗户。",
    "items": [
      {
        "tokens": [
          "Please",
          "open",
          "the",
          "window"
        ],
        "sentence": "Please open the window.",
        "zh": "请打开窗户。",
        "image": "kp3d-window.png"
      },
      {
        "tokens": [
          "Don't",
          "run",
          "in",
          "the",
          "hallway"
        ],
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "Please",
          "be",
          "quiet",
          "in",
          "the",
          "library"
        ],
        "sentence": "Please be quiet in the library.",
        "zh": "请在图书馆保持安静。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "Don't",
          "eat",
          "in",
          "the",
          "classroom"
        ],
        "sentence": "Don't eat in the classroom.",
        "zh": "不要在教室里吃东西。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "Please",
          "take",
          "the",
          "bus",
          "to",
          "school"
        ],
        "sentence": "Please take the bus to school.",
        "zh": "请坐公交车去学校。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "Don't",
          "forget",
          "your",
          "umbrella"
        ],
        "sentence": "Don't forget your umbrella.",
        "zh": "别忘了你的雨伞。",
        "image": "kp3d-umbrella.png"
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
    "image": "l11-imper-hero.jpg",
    "audio": "Please be quiet in the library.",
    "tokens": [
      "Please",
      "be",
      "quiet",
      "in",
      "the",
      "library"
    ],
    "sentence": "Please be quiet in the library.",
    "zh": "请在图书馆保持安静。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l11-imper-hero.jpg",
    "q": "_____ forget to bring your PE kit.",
    "opts": [
      "Not",
      "Don't",
      "Doesn't"
    ],
    "ans": 1,
    "hint": "否定祈使用 Don't + 原形。",
    "sentence": "Don't run in the hallway.",
    "zh": "不要在走廊里跑。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l11-imper-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "_____ forget to bring your PE kit.",
        "opts": [
          "Not",
          "Don't",
          "Doesn't"
        ],
        "ans": 1,
        "hint": "否定祈使用 Don't + 原形。",
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。"
      },
      {
        "q": "_____ your homework before dinner.",
        "opts": [
          "Does",
          "Do",
          "Doing"
        ],
        "ans": 1,
        "hint": "祈使句用原形 Do。",
        "sentence": "Do your homework before dinner.",
        "zh": "晚饭前做作业。"
      },
      {
        "q": "Please _____ late for class.",
        "opts": [
          "not be",
          "don't be",
          "doesn't be"
        ],
        "ans": 1,
        "hint": "Please don't be late. 或 Don't be late.",
        "sentence": "Please don't be late for class.",
        "zh": "请不要上课迟到。"
      },
      {
        "q": "_____ careful when you cross the street.",
        "opts": [
          "Be",
          "Is",
          "Are"
        ],
        "ans": 0,
        "hint": "祈使句用 Be。",
        "sentence": "Be careful when you cross the street.",
        "zh": "过马路时要小心。"
      },
      {
        "q": "_____ talk loudly in the museum.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "Don't + 原形。",
        "sentence": "Don't talk loudly in the museum.",
        "zh": "不要在博物馆大声说话。"
      },
      {
        "q": "Let’s _____ a rest.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 0,
        "hint": "Let's + 原形。",
        "sentence": "Let's have a rest.",
        "zh": "我们休息一下吧。"
      },
      {
        "q": "_____ open the window, please.",
        "opts": [
          "Please",
          "Does",
          "Doing"
        ],
        "ans": 0,
        "hint": "祈使句用动词原形，开头用Please或Don't。",
        "sentence": "Please open the window, please.",
        "zh": "请打开窗户。"
      },
      {
        "q": "_____ run in the hallway.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't + 动词原形。",
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。"
      },
      {
        "q": "Please _____ quiet in the library.",
        "opts": [
          "be",
          "is",
          "are"
        ],
        "ans": 0,
        "hint": "be quiet 是固定搭配。",
        "sentence": "Please be quiet in the library.",
        "zh": "请在图书馆保持安静。"
      },
      {
        "q": "_____ eat in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't eat in the classroom.",
        "zh": "不要在教室里吃东西。"
      },
      {
        "q": "Please _____ the door.",
        "opts": [
          "close",
          "closes",
          "closing"
        ],
        "ans": 0,
        "hint": "祈使句用动词原形。",
        "sentence": "Please close the door.",
        "zh": "请关门。"
      },
      {
        "q": "_____ shout in the library.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't shout in the library.",
        "zh": "不要在图书馆大喊。"
      },
      {
        "q": "Please _____ your hands before dinner.",
        "opts": [
          "wash",
          "washes",
          "washing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please wash your hands before dinner.",
        "zh": "晚饭前请洗手。"
      },
      {
        "q": "_____ forget your umbrella.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't forget your umbrella.",
        "zh": "别忘了你的雨伞。"
      },
      {
        "q": "Please _____ the bus to school.",
        "opts": [
          "take",
          "takes",
          "taking"
        ],
        "ans": 0,
        "hint": "take the bus 是固定搭配。",
        "sentence": "Please take the bus to school.",
        "zh": "请坐公交车去学校。"
      },
      {
        "q": "_____ play basketball in the hallway.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't play basketball in the hallway.",
        "zh": "不要在走廊里打篮球。"
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
        "q": "_____ forget to bring your PE kit.",
        "opts": [
          "Not",
          "Don't",
          "Doesn't"
        ],
        "ans": 1,
        "hint": "否定祈使用 Don't + 原形。",
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。"
      },
      {
        "q": "_____ your homework before dinner.",
        "opts": [
          "Does",
          "Do",
          "Doing"
        ],
        "ans": 1,
        "hint": "祈使句用原形 Do。",
        "sentence": "Do your homework before dinner.",
        "zh": "晚饭前做作业。"
      },
      {
        "q": "Please _____ late for class.",
        "opts": [
          "not be",
          "don't be",
          "doesn't be"
        ],
        "ans": 1,
        "hint": "Please don't be late. 或 Don't be late.",
        "sentence": "Please don't be late for class.",
        "zh": "请不要上课迟到。"
      },
      {
        "q": "_____ careful when you cross the street.",
        "opts": [
          "Be",
          "Is",
          "Are"
        ],
        "ans": 0,
        "hint": "祈使句用 Be。",
        "sentence": "Be careful when you cross the street.",
        "zh": "过马路时要小心。"
      },
      {
        "q": "_____ talk loudly in the museum.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "Don't + 原形。",
        "sentence": "Don't talk loudly in the museum.",
        "zh": "不要在博物馆大声说话。"
      },
      {
        "q": "Let’s _____ a rest.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 0,
        "hint": "Let's + 原形。",
        "sentence": "Let's have a rest.",
        "zh": "我们休息一下吧。"
      },
      {
        "q": "_____ open the window, please.",
        "opts": [
          "Please",
          "Does",
          "Doing"
        ],
        "ans": 0,
        "hint": "祈使句用动词原形，开头用Please或Don't。",
        "sentence": "Please open the window, please.",
        "zh": "请打开窗户。"
      },
      {
        "q": "_____ run in the hallway.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't + 动词原形。",
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。"
      },
      {
        "q": "Please _____ quiet in the library.",
        "opts": [
          "be",
          "is",
          "are"
        ],
        "ans": 0,
        "hint": "be quiet 是固定搭配。",
        "sentence": "Please be quiet in the library.",
        "zh": "请在图书馆保持安静。"
      },
      {
        "q": "_____ eat in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't eat in the classroom.",
        "zh": "不要在教室里吃东西。"
      },
      {
        "q": "Please _____ the door.",
        "opts": [
          "close",
          "closes",
          "closing"
        ],
        "ans": 0,
        "hint": "祈使句用动词原形。",
        "sentence": "Please close the door.",
        "zh": "请关门。"
      },
      {
        "q": "_____ shout in the library.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't shout in the library.",
        "zh": "不要在图书馆大喊。"
      },
      {
        "q": "Please _____ your hands before dinner.",
        "opts": [
          "wash",
          "washes",
          "washing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please wash your hands before dinner.",
        "zh": "晚饭前请洗手。"
      },
      {
        "q": "_____ forget your umbrella.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't forget your umbrella.",
        "zh": "别忘了你的雨伞。"
      },
      {
        "q": "Please _____ the bus to school.",
        "opts": [
          "take",
          "takes",
          "taking"
        ],
        "ans": 0,
        "hint": "take the bus 是固定搭配。",
        "sentence": "Please take the bus to school.",
        "zh": "请坐公交车去学校。"
      },
      {
        "q": "_____ play basketball in the hallway.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't play basketball in the hallway.",
        "zh": "不要在走廊里打篮球。"
      },
      {
        "q": "Please _____ the book to me.",
        "opts": [
          "give",
          "gives",
          "giving"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please give the book to me.",
        "zh": "请把书给我。"
      },
      {
        "q": "_____ open the window in winter.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't open the window in winter.",
        "zh": "冬天不要开窗。"
      },
      {
        "q": "Please _____ to the teacher.",
        "opts": [
          "listen",
          "listens",
          "listening"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please listen to the teacher.",
        "zh": "请听老师讲。"
      },
      {
        "q": "_____ touch the panda.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't touch the panda.",
        "zh": "不要摸熊猫。"
      },
      {
        "q": "Please _____ your vegetables.",
        "opts": [
          "eat",
          "eats",
          "eating"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please eat your vegetables.",
        "zh": "请吃你的蔬菜。"
      },
      {
        "q": "_____ be late for school.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't be late for school.",
        "zh": "上学不要迟到。"
      },
      {
        "q": "Please _____ the piano after homework.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please play the piano after homework.",
        "zh": "做完作业后请弹钢琴。"
      },
      {
        "q": "_____ throw the ball in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't throw the ball in the classroom.",
        "zh": "不要在教室里扔球。"
      },
      {
        "q": "Please _____ your water bottle.",
        "opts": [
          "bring",
          "brings",
          "bringing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please bring your water bottle.",
        "zh": "请带上你的水壶。"
      },
      {
        "q": "_____ buy snacks in the shop.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't buy snacks in the shop.",
        "zh": "不要在商店里买零食。"
      },
      {
        "q": "Please _____ your mom cook.",
        "opts": [
          "help",
          "helps",
          "helping"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please help your mom cook.",
        "zh": "请帮你妈妈做饭。"
      },
      {
        "q": "_____ read in the dark.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't read in the dark.",
        "zh": "不要在黑暗里看书。"
      },
      {
        "q": "Please _____ a coat in cold weather.",
        "opts": [
          "wear",
          "wears",
          "wearing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please wear a coat in cold weather.",
        "zh": "天冷时请穿上外套。"
      },
      {
        "q": "_____ talk in the movie.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't talk in the movie.",
        "zh": "看电影时不要说话。"
      },
      {
        "q": "Please _____ your homework before dinner.",
        "opts": [
          "finish",
          "finishes",
          "finishing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please finish your homework before dinner.",
        "zh": "晚饭前请完成作业。"
      },
      {
        "q": "_____ walk on the grass.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't walk on the grass.",
        "zh": "不要在草地上走。"
      },
      {
        "q": "Please _____ the cat gently.",
        "opts": [
          "touch",
          "touches",
          "touching"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please touch the cat gently.",
        "zh": "请轻轻地摸猫。"
      },
      {
        "q": "_____ play with the ball in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't play with the ball in the classroom.",
        "zh": "不要在教室里玩球。"
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
        "q": "_____ forget to bring your PE kit.",
        "opts": [
          "Not",
          "Don't",
          "Doesn't"
        ],
        "ans": 1,
        "hint": "否定祈使用 Don't + 原形。",
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。"
      },
      {
        "q": "_____ your homework before dinner.",
        "opts": [
          "Does",
          "Do",
          "Doing"
        ],
        "ans": 1,
        "hint": "祈使句用原形 Do。",
        "sentence": "Do your homework before dinner.",
        "zh": "晚饭前做作业。"
      },
      {
        "q": "Please _____ late for class.",
        "opts": [
          "not be",
          "don't be",
          "doesn't be"
        ],
        "ans": 1,
        "hint": "Please don't be late. 或 Don't be late.",
        "sentence": "Please don't be late for class.",
        "zh": "请不要上课迟到。"
      },
      {
        "q": "_____ careful when you cross the street.",
        "opts": [
          "Be",
          "Is",
          "Are"
        ],
        "ans": 0,
        "hint": "祈使句用 Be。",
        "sentence": "Be careful when you cross the street.",
        "zh": "过马路时要小心。"
      },
      {
        "q": "_____ talk loudly in the museum.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "Don't + 原形。",
        "sentence": "Don't talk loudly in the museum.",
        "zh": "不要在博物馆大声说话。"
      },
      {
        "q": "Let’s _____ a rest.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 0,
        "hint": "Let's + 原形。",
        "sentence": "Let's have a rest.",
        "zh": "我们休息一下吧。"
      },
      {
        "q": "_____ open the window, please.",
        "opts": [
          "Please",
          "Does",
          "Doing"
        ],
        "ans": 0,
        "hint": "祈使句用动词原形，开头用Please或Don't。",
        "sentence": "Please open the window, please.",
        "zh": "请打开窗户。"
      },
      {
        "q": "_____ run in the hallway.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't + 动词原形。",
        "sentence": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。"
      },
      {
        "q": "Please _____ quiet in the library.",
        "opts": [
          "be",
          "is",
          "are"
        ],
        "ans": 0,
        "hint": "be quiet 是固定搭配。",
        "sentence": "Please be quiet in the library.",
        "zh": "请在图书馆保持安静。"
      },
      {
        "q": "_____ eat in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't eat in the classroom.",
        "zh": "不要在教室里吃东西。"
      },
      {
        "q": "Please _____ the door.",
        "opts": [
          "close",
          "closes",
          "closing"
        ],
        "ans": 0,
        "hint": "祈使句用动词原形。",
        "sentence": "Please close the door.",
        "zh": "请关门。"
      },
      {
        "q": "_____ shout in the library.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't shout in the library.",
        "zh": "不要在图书馆大喊。"
      },
      {
        "q": "Please _____ your hands before dinner.",
        "opts": [
          "wash",
          "washes",
          "washing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please wash your hands before dinner.",
        "zh": "晚饭前请洗手。"
      },
      {
        "q": "_____ forget your umbrella.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't forget your umbrella.",
        "zh": "别忘了你的雨伞。"
      },
      {
        "q": "Please _____ the bus to school.",
        "opts": [
          "take",
          "takes",
          "taking"
        ],
        "ans": 0,
        "hint": "take the bus 是固定搭配。",
        "sentence": "Please take the bus to school.",
        "zh": "请坐公交车去学校。"
      },
      {
        "q": "_____ play basketball in the hallway.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't play basketball in the hallway.",
        "zh": "不要在走廊里打篮球。"
      },
      {
        "q": "Please _____ the book to me.",
        "opts": [
          "give",
          "gives",
          "giving"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please give the book to me.",
        "zh": "请把书给我。"
      },
      {
        "q": "_____ open the window in winter.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't open the window in winter.",
        "zh": "冬天不要开窗。"
      },
      {
        "q": "Please _____ to the teacher.",
        "opts": [
          "listen",
          "listens",
          "listening"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please listen to the teacher.",
        "zh": "请听老师讲。"
      },
      {
        "q": "_____ touch the panda.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't touch the panda.",
        "zh": "不要摸熊猫。"
      },
      {
        "q": "Please _____ your vegetables.",
        "opts": [
          "eat",
          "eats",
          "eating"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please eat your vegetables.",
        "zh": "请吃你的蔬菜。"
      },
      {
        "q": "_____ be late for school.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't be late for school.",
        "zh": "上学不要迟到。"
      },
      {
        "q": "Please _____ the piano after homework.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please play the piano after homework.",
        "zh": "做完作业后请弹钢琴。"
      },
      {
        "q": "_____ throw the ball in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't throw the ball in the classroom.",
        "zh": "不要在教室里扔球。"
      },
      {
        "q": "Please _____ your water bottle.",
        "opts": [
          "bring",
          "brings",
          "bringing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please bring your water bottle.",
        "zh": "请带上你的水壶。"
      },
      {
        "q": "_____ buy snacks in the shop.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't buy snacks in the shop.",
        "zh": "不要在商店里买零食。"
      },
      {
        "q": "Please _____ your mom cook.",
        "opts": [
          "help",
          "helps",
          "helping"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please help your mom cook.",
        "zh": "请帮你妈妈做饭。"
      },
      {
        "q": "_____ read in the dark.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't read in the dark.",
        "zh": "不要在黑暗里看书。"
      },
      {
        "q": "Please _____ a coat in cold weather.",
        "opts": [
          "wear",
          "wears",
          "wearing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please wear a coat in cold weather.",
        "zh": "天冷时请穿上外套。"
      },
      {
        "q": "_____ talk in the movie.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't talk in the movie.",
        "zh": "看电影时不要说话。"
      },
      {
        "q": "Please _____ your homework before dinner.",
        "opts": [
          "finish",
          "finishes",
          "finishing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please finish your homework before dinner.",
        "zh": "晚饭前请完成作业。"
      },
      {
        "q": "_____ walk on the grass.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't walk on the grass.",
        "zh": "不要在草地上走。"
      },
      {
        "q": "Please _____ the cat gently.",
        "opts": [
          "touch",
          "touches",
          "touching"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please touch the cat gently.",
        "zh": "请轻轻地摸猫。"
      },
      {
        "q": "_____ play with the ball in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't play with the ball in the classroom.",
        "zh": "不要在教室里玩球。"
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
    "image": "l11-imper-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "Sit down.",
        "zh": "坐下。"
      },
      {
        "en": "Don't run.",
        "zh": "不要跑。"
      },
      {
        "en": "Please be quiet.",
        "zh": "请安静。"
      },
      {
        "en": "Let's go.",
        "zh": "我们走吧。"
      },
      {
        "en": "open the window",
        "zh": "打开窗户"
      },
      {
        "en": "close the door",
        "zh": "关门"
      },
      {
        "en": "be quiet",
        "zh": "安静"
      },
      {
        "en": "don't run",
        "zh": "不要跑"
      },
      {
        "en": "don't shout",
        "zh": "不要大喊"
      },
      {
        "en": "wash hands",
        "zh": "洗手"
      },
      {
        "en": "take the bus",
        "zh": "坐公交车"
      },
      {
        "en": "play basketball",
        "zh": "打篮球"
      },
      {
        "en": "listen to the teacher",
        "zh": "听老师讲"
      },
      {
        "en": "bring your water bottle",
        "zh": "带上你的水壶"
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
    "image": "l11-imper-hero.jpg",
    "audio": "Please open the window.",
    "opts": [
      "Please open the window.",
      "Please close the window.",
      "Please open the door."
    ],
    "ans": 0,
    "hint": "注意动词是open。",
    "sentence": "Please open the window.",
    "zh": "请打开窗户。",
    "questions": [
      {
        "audio": "Please open the window.",
        "opts": [
          "Please open the window.",
          "Please close the window.",
          "Please open the door."
        ],
        "ans": 0,
        "hint": "注意动词是open。",
        "zh": "请打开窗户。",
        "sentence": "Please open the window."
      },
      {
        "audio": "Don't run in the hallway.",
        "opts": [
          "Don't run in the hallway.",
          "Don't walk in the hallway.",
          "Don't run in the classroom."
        ],
        "ans": 0,
        "hint": "注意地点是hallway。",
        "zh": "不要在走廊里跑。",
        "sentence": "Don't run in the hallway."
      },
      {
        "audio": "Please be quiet in the library.",
        "opts": [
          "Please be quiet in the library.",
          "Please be loud in the library.",
          "Please be quiet in the classroom."
        ],
        "ans": 0,
        "hint": "注意地点是library。",
        "zh": "请在图书馆保持安静。",
        "sentence": "Please be quiet in the library."
      },
      {
        "audio": "Don't eat in the classroom.",
        "opts": [
          "Don't eat in the classroom.",
          "Don't drink in the classroom.",
          "Don't eat in the library."
        ],
        "ans": 0,
        "hint": "注意动作是eat。",
        "zh": "不要在教室里吃东西。",
        "sentence": "Don't eat in the classroom."
      },
      {
        "audio": "Please close the door.",
        "opts": [
          "Please close the door.",
          "Please open the door.",
          "Please close the window."
        ],
        "ans": 0,
        "hint": "注意动词是close。",
        "zh": "请关门。",
        "sentence": "Please close the door."
      },
      {
        "audio": "Don't forget your umbrella.",
        "opts": [
          "Don't forget your umbrella.",
          "Don't forget your book.",
          "Don't forget your lunch."
        ],
        "ans": 0,
        "hint": "注意物品是umbrella。",
        "zh": "别忘了你的雨伞。",
        "sentence": "Don't forget your umbrella."
      },
      {
        "audio": "Please take the bus to school.",
        "opts": [
          "Please take the bus to school.",
          "Please take the train to school.",
          "Please take the bus home."
        ],
        "ans": 0,
        "hint": "注意交通方式是bus。",
        "zh": "请坐公交车去学校。",
        "sentence": "Please take the bus to school."
      },
      {
        "audio": "Don't play basketball in the hallway.",
        "opts": [
          "Don't play basketball in the hallway.",
          "Don't play football in the hallway.",
          "Don't play basketball in the classroom."
        ],
        "ans": 0,
        "hint": "注意运动是basketball。",
        "zh": "不要在走廊里打篮球。",
        "sentence": "Don't play basketball in the hallway."
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
    "image": "l11-imper-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Please open the window.",
        "zh": "请打开窗户。",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "Don't run in the hallway.",
        "zh": "不要在走廊里跑。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Please be quiet in the library.",
        "zh": "请在图书馆里保持安静。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Don't eat in the classroom.",
        "zh": "不要在教室里吃东西。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Please close the door.",
        "zh": "请关门。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Don't shout in the library.",
        "zh": "不要在图书馆里大喊。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Please wash your hands before dinner.",
        "zh": "晚饭前请洗手。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Don't forget your umbrella.",
        "zh": "别忘了你的雨伞。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "Please take the bus to school.",
        "zh": "请坐公交车去学校。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Don't play basketball in the hallway.",
        "zh": "不要在走廊里打篮球。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "Please give the book to me.",
        "zh": "请把书给我。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Don't open the window in winter.",
        "zh": "冬天不要开窗。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "Please listen to the teacher.",
        "zh": "请听老师讲。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Don't touch the panda.",
        "zh": "不要摸熊猫。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Please eat your vegetables.",
        "zh": "请吃你的蔬菜。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Don't be late for school.",
        "zh": "上学不要迟到。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Please play the piano after homework.",
        "zh": "做完作业后请弹钢琴。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "Don't throw the ball in the classroom.",
        "zh": "不要在教室里扔球。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "Please bring your water bottle.",
        "zh": "请带上你的水壶。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "Don't buy snacks in the shop.",
        "zh": "不要在商店里买零食。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "Please help your mom cook.",
        "zh": "请帮你妈妈做饭。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Don't read in the dark.",
        "zh": "不要在黑暗里看书。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Please wear a coat in cold weather.",
        "zh": "天冷时请穿上外套。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "Don't talk in the movie.",
        "zh": "看电影时不要说话。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
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
    "image": "l11-imper-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "Please _____ the book to me.",
        "opts": [
          "give",
          "gives",
          "giving"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please give the book to me.",
        "zh": "请把书给我。"
      },
      {
        "q": "_____ open the window in winter.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't open the window in winter.",
        "zh": "冬天不要开窗。"
      },
      {
        "q": "Please _____ to the teacher.",
        "opts": [
          "listen",
          "listens",
          "listening"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please listen to the teacher.",
        "zh": "请听老师讲。"
      },
      {
        "q": "_____ touch the panda.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't touch the panda.",
        "zh": "不要摸熊猫。"
      },
      {
        "q": "Please _____ your vegetables.",
        "opts": [
          "eat",
          "eats",
          "eating"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please eat your vegetables.",
        "zh": "请吃你的蔬菜。"
      },
      {
        "q": "_____ be late for school.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't be late for school.",
        "zh": "上学不要迟到。"
      },
      {
        "q": "Please _____ the piano after homework.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please play the piano after homework.",
        "zh": "做完作业后请弹钢琴。"
      },
      {
        "q": "_____ throw the ball in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't throw the ball in the classroom.",
        "zh": "不要在教室里扔球。"
      },
      {
        "q": "Please _____ your water bottle.",
        "opts": [
          "bring",
          "brings",
          "bringing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please bring your water bottle.",
        "zh": "请带上你的水壶。"
      },
      {
        "q": "_____ buy snacks in the shop.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't buy snacks in the shop.",
        "zh": "不要在商店里买零食。"
      },
      {
        "q": "Please _____ your mom cook.",
        "opts": [
          "help",
          "helps",
          "helping"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please help your mom cook.",
        "zh": "请帮你妈妈做饭。"
      },
      {
        "q": "_____ read in the dark.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't read in the dark.",
        "zh": "不要在黑暗里看书。"
      },
      {
        "q": "Please _____ a coat in cold weather.",
        "opts": [
          "wear",
          "wears",
          "wearing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please wear a coat in cold weather.",
        "zh": "天冷时请穿上外套。"
      },
      {
        "q": "_____ talk in the movie.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't talk in the movie.",
        "zh": "看电影时不要说话。"
      },
      {
        "q": "Please _____ your homework before dinner.",
        "opts": [
          "finish",
          "finishes",
          "finishing"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please finish your homework before dinner.",
        "zh": "晚饭前请完成作业。"
      },
      {
        "q": "_____ walk on the grass.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't walk on the grass.",
        "zh": "不要在草地上走。"
      },
      {
        "q": "Please _____ the cat gently.",
        "opts": [
          "touch",
          "touches",
          "touching"
        ],
        "ans": 0,
        "hint": "祈使句用原形。",
        "sentence": "Please touch the cat gently.",
        "zh": "请轻轻地摸猫。"
      },
      {
        "q": "_____ play with the ball in the classroom.",
        "opts": [
          "Don't",
          "Doesn't",
          "Not"
        ],
        "ans": 0,
        "hint": "否定祈使句用Don't。",
        "sentence": "Don't play with the ball in the classroom.",
        "zh": "不要在教室里玩球。"
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
      "肯定：(Please) + 动词原形",
      "否定：Don't + 原形",
      "写作：Follow these rules. Don't…",
      "Let's + 原形：Let's play basketball.",
      "Be 型祈使句：Be quiet. / Don't be late."
    ],
    "chant": "Bossy verbs start the line! Don't plus base — you'll be fine!",
    "chantSpeak": "Bossy verbs start the line! Don't plus base, you will be fine!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "祈使句",
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