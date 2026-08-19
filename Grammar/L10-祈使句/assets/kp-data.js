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
    "id": "p07",
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
    "id": "p08",
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
    "id": "p09"
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
      }
    ],
    "id": "p10"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "l11-imper-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
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
    "id": "p11"
  },
  {
    "id": "p12",
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
    "id": "p13",
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
    "lead": "对齐初中综合测试：全部做完再交卷。",
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
      }
    ],
    "id": "p14"
  },
  {
    "section": "检测",
    "title": "限时挑战 60 秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "lead": "对照初中课堂竞赛：60 秒内尽量多答对。",
    "seconds": 60,
    "perQuestion": 12,
    "pass": 4,
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
      }
    ],
    "id": "p15"
  },
  {
    "section": "检测",
    "title": "连对闯关",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "lead": "连续答对 5 题通关，答错连击清零。",
    "target": 5,
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
      }
    ],
    "id": "p16"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "l11-imper-hero.jpg",
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
      }
    ],
    "id": "p17"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l11-imper-hero.jpg",
    "audio": "Please be quiet in the library.",
    "opts": [
      "Please be quiet in the library.",
      "Doesn't run in the hallway.",
      "Not run in the hallway."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Please be quiet in the library.",
    "zh": "请在图书馆保持安静。",
    "id": "p18"
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
    "id": "p19"
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