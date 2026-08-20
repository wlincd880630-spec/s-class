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
    "audio": "I stayed at home because it was raining.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。",
    "image": "w4-conj-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-conj-hero.jpg",
    "question": "because 连接的是原因还是结果？",
    "choices": [
      {
        "text": "原因（为什么）",
        "correct": true,
        "fb": "对了！because + 原因从句。"
      },
      {
        "text": "结果（所以）",
        "correct": false,
        "fb": "结果用 so。"
      },
      {
        "text": "转折（但是）",
        "correct": false,
        "fb": "转折用 but。"
      }
    ],
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-conj-hero.jpg",
    "lead": "because 接原因，so 接结果，but 接转折；because 和 so 不能同时用。",
    "formula": "… because …　　…, so …　　…, but …",
    "parts": [
      {
        "mark": "because",
        "label": "因为",
        "example": "because it was raining"
      },
      {
        "mark": "so",
        "label": "所以",
        "example": "so I stayed at home"
      },
      {
        "mark": "but",
        "label": "但是",
        "example": "but I finished it"
      }
    ],
    "samples": [
      {
        "sentence": "I stayed at home because it was raining.",
        "zh": "因为下雨，我待在家里。"
      },
      {
        "sentence": "It was raining, so I stayed at home.",
        "zh": "下雨了，所以我待在家里。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-conj-because.jpg",
    "rightImage": "w4-conj-so.jpg",
    "leftLabel": "because 因为",
    "rightLabel": "so 所以",
    "leftSentence": "He was tired because he worked late.",
    "leftZh": "他累了，因为工作到很晚。",
    "rightSentence": "It was raining, so I took an umbrella.",
    "rightZh": "在下雨，所以我带了伞。",
    "morphBase": "because",
    "morphPast": "so",
    "morphHighlight": "",
    "discovery": "because 原因在前或后；so 前因后果；but 转折。"
  },
  {
    "section": "精讲",
    "title": "例句 · because",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-conj-hero.jpg",
    "lead": "because 后面是原因从句。",
    "sentence": "I stayed at home because it was raining.",
    "zh": "因为下雨，我待在家里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · but",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-conj-hero.jpg",
    "lead": "but 连接相反信息。",
    "sentence": "He is short, but he runs fast.",
    "zh": "他个子矮，但跑得快。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-conj-hero.jpg",
    "lead": "三种常用连词。",
    "rules": [
      {
        "tab": "because",
        "rule": "because + 原因（回答 Why）",
        "focusVerb": "because",
        "examples": [
          {
            "from": "Why?",
            "to": "because…"
          }
        ],
        "sample": "I stayed at home because it was raining.",
        "sampleZh": "我待在家里，因为在下雨。"
      },
      {
        "tab": "so/but",
        "rule": "so 结果；but 转折",
        "focusVerb": "so",
        "examples": [
          {
            "from": "rain",
            "to": "so I took an umbrella"
          },
          {
            "from": "young",
            "to": "but wise"
          }
        ],
        "sample": "It was raining, so I took an umbrella.",
        "sampleZh": "在下雨，所以我带了伞。"
      }
    ]
  },
  {
    "id": "p08",
    "section": "辨析",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-conj-hero.jpg",
    "buckets": [
      {
        "key": "cause",
        "label": "because 原因"
      },
      {
        "key": "result",
        "label": "so 结果"
      },
      {
        "key": "turn",
        "label": "but 转折"
      }
    ],
    "items": [
      {
        "text": "I like tea because it is warm.",
        "bucket": "cause"
      },
      {
        "text": "I was hungry, so I ate.",
        "bucket": "result"
      },
      {
        "text": "She is young but wise.",
        "bucket": "turn"
      },
      {
        "text": "He failed because he didn't study.",
        "bucket": "cause"
      },
      {
        "text": "It was late, so we went home.",
        "bucket": "result"
      },
      {
        "text": "The box is heavy but useful.",
        "bucket": "turn"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-conj-hero.jpg",
    "question": "「Because it was late, so we took a taxi.」错在哪？",
    "choices": [
      {
        "text": "because 和 so 不能一起用，删掉一个",
        "correct": true,
        "fb": "中文「因为……所以」英语只留一个。"
      },
      {
        "text": "taxi 前要加 the",
        "correct": false,
        "fb": "不是主要错误。"
      },
      {
        "text": "late 要改成 later",
        "correct": false,
        "fb": "late 正确。"
      }
    ],
    "sentence": "Because it was late, we took a taxi.",
    "zh": "因为晚了，我们打了车。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-conj-hero.jpg",
    "lead": "because 句改写成 so 句。",
    "items": [
      {
        "from": "I stayed at home because it was raining.",
        "fromZh": "因为下雨我待在家里。",
        "steps": [
          {
            "label": "改用 so",
            "opts": [
              "It was raining, so I stayed at home.",
              "Because it was raining, so I stayed at home.",
              "It was raining because I stayed at home."
            ],
            "ans": 0,
            "hint": "前因 so 后果。",
            "sentence": "It was raining, so I stayed at home.",
            "zh": "下雨了，所以我待在家里。"
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
    "image": "w4-conj-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "stayed",
      "at",
      "home",
      "because",
      "it",
      "was",
      "raining"
    ],
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-conj-hero.jpg",
    "audio": "I stayed at home because it was raining.",
    "tokens": [
      "I",
      "stayed",
      "at",
      "home",
      "because",
      "it",
      "was",
      "raining"
    ],
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-conj-hero.jpg",
    "q": "The boy has few friends because he is _____.",
    "opts": [
      "friendly",
      "shy",
      "kind"
    ],
    "ans": 1,
    "hint": "few friends 的原因 → because 后接原因。",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-conj-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "The boy has few friends because he is _____.",
        "opts": [
          "friendly",
          "shy",
          "kind"
        ],
        "ans": 1,
        "hint": "few friends 的原因 → because 后接原因。",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为在下雨。"
      },
      {
        "q": "The boy has few friends _____ he is shy.",
        "opts": [
          "so",
          "because",
          "but"
        ],
        "ans": 1,
        "hint": "shy 是原因。",
        "sentence": "The boy has few friends because he is shy.",
        "zh": "男孩朋友少，因为他害羞。"
      },
      {
        "q": "I like tea, _____ I don't like coffee.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "转折 but。",
        "sentence": "I like tea, but I don't like coffee.",
        "zh": "我喜欢茶，但不喜欢咖啡。"
      },
      {
        "q": "She worked hard, _____ she passed the test.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "结果 so。",
        "sentence": "She worked hard, so she passed the test.",
        "zh": "她很努力，所以通过了考试。"
      },
      {
        "q": "_____ he was ill, he still came to school.",
        "opts": [
          "Because",
          "Although",
          "So"
        ],
        "ans": 1,
        "hint": "虽然……仍然：Although（与 but 不连用）。",
        "sentence": "Although he was ill, he still came to school.",
        "zh": "虽然他病了，仍来上学。"
      },
      {
        "q": "Turn off the light _____ you leave.",
        "opts": [
          "so",
          "before",
          "because"
        ],
        "ans": 1,
        "hint": "时间 before。",
        "sentence": "Turn off the light before you leave.",
        "zh": "走之前关灯。"
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
        "q": "The boy has few friends because he is _____.",
        "opts": [
          "friendly",
          "shy",
          "kind"
        ],
        "ans": 1,
        "hint": "few friends 的原因 → because 后接原因。",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为在下雨。"
      },
      {
        "q": "The boy has few friends _____ he is shy.",
        "opts": [
          "so",
          "because",
          "but"
        ],
        "ans": 1,
        "hint": "shy 是原因。",
        "sentence": "The boy has few friends because he is shy.",
        "zh": "男孩朋友少，因为他害羞。"
      },
      {
        "q": "I like tea, _____ I don't like coffee.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "转折 but。",
        "sentence": "I like tea, but I don't like coffee.",
        "zh": "我喜欢茶，但不喜欢咖啡。"
      },
      {
        "q": "She worked hard, _____ she passed the test.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "结果 so。",
        "sentence": "She worked hard, so she passed the test.",
        "zh": "她很努力，所以通过了考试。"
      },
      {
        "q": "_____ he was ill, he still came to school.",
        "opts": [
          "Because",
          "Although",
          "So"
        ],
        "ans": 1,
        "hint": "虽然……仍然：Although（与 but 不连用）。",
        "sentence": "Although he was ill, he still came to school.",
        "zh": "虽然他病了，仍来上学。"
      },
      {
        "q": "Turn off the light _____ you leave.",
        "opts": [
          "so",
          "before",
          "because"
        ],
        "ans": 1,
        "hint": "时间 before。",
        "sentence": "Turn off the light before you leave.",
        "zh": "走之前关灯。"
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
        "q": "The boy has few friends because he is _____.",
        "opts": [
          "friendly",
          "shy",
          "kind"
        ],
        "ans": 1,
        "hint": "few friends 的原因 → because 后接原因。",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为在下雨。"
      },
      {
        "q": "The boy has few friends _____ he is shy.",
        "opts": [
          "so",
          "because",
          "but"
        ],
        "ans": 1,
        "hint": "shy 是原因。",
        "sentence": "The boy has few friends because he is shy.",
        "zh": "男孩朋友少，因为他害羞。"
      },
      {
        "q": "I like tea, _____ I don't like coffee.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "转折 but。",
        "sentence": "I like tea, but I don't like coffee.",
        "zh": "我喜欢茶，但不喜欢咖啡。"
      },
      {
        "q": "She worked hard, _____ she passed the test.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "结果 so。",
        "sentence": "She worked hard, so she passed the test.",
        "zh": "她很努力，所以通过了考试。"
      },
      {
        "q": "_____ he was ill, he still came to school.",
        "opts": [
          "Because",
          "Although",
          "So"
        ],
        "ans": 1,
        "hint": "虽然……仍然：Although（与 but 不连用）。",
        "sentence": "Although he was ill, he still came to school.",
        "zh": "虽然他病了，仍来上学。"
      },
      {
        "q": "Turn off the light _____ you leave.",
        "opts": [
          "so",
          "before",
          "because"
        ],
        "ans": 1,
        "hint": "时间 before。",
        "sentence": "Turn off the light before you leave.",
        "zh": "走之前关灯。"
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
    "image": "w4-conj-hero.jpg",
    "pairs": [
      {
        "en": "because",
        "zh": "因为"
      },
      {
        "en": "so",
        "zh": "所以"
      },
      {
        "en": "but",
        "zh": "但是"
      },
      {
        "en": "although",
        "zh": "虽然"
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
    "image": "w4-conj-hero.jpg",
    "audio": "I stayed at home because it was raining.",
    "opts": [
      "I stayed at home because it was raining.",
      "I stayed at home so it was raining.",
      "Because it was raining, so I stayed at home."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。",
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
      "because + 原因",
      "so + 结果（前因后果）",
      "but + 转折；写作连接两句",
      "although 不与 but 连用，和 because/so 是同一类易错。"
    ],
    "chant": "Because tells you why! So shows result — try, try, try!",
    "chantSpeak": "Because tells you why! So shows result, try, try, try!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "连词 because / so / but",
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