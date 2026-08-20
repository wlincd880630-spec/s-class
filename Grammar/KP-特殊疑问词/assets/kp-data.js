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
    "audio": "—How often do you go to the library? —Twice a week.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "—How often do you go to the library? —Twice a week.",
    "zh": "—你多久去一次图书馆？—一周两次。",
    "image": "w4-qw-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-qw-hero.jpg",
    "question": "Twice a week 回答的是哪个疑问词？",
    "choices": [
      {
        "text": "How often（多久一次）",
        "correct": true,
        "fb": "对了！频率 → How often。"
      },
      {
        "text": "How long（多长时间）",
        "correct": false,
        "fb": "How long 答 for two hours 等。"
      },
      {
        "text": "How many（多少数量）",
        "correct": false,
        "fb": "How many 答具体数字+可数名词。"
      }
    ],
    "sentence": "—How often do you go to the library? —Twice a week.",
    "zh": "—你多久去一次图书馆？—一周两次。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-qw-hero.jpg",
    "lead": "疑问词决定答什么；How 系列最容易混。",
    "formula": "How often → 频率　　How long → 时长　　How many/much → 数量",
    "parts": [
      {
        "mark": "How often",
        "label": "多久一次",
        "example": "Twice a week."
      },
      {
        "mark": "How long",
        "label": "多长时间",
        "example": "For two hours."
      },
      {
        "mark": "How many",
        "label": "多少（可数）",
        "example": "Three books."
      }
    ],
    "samples": [
      {
        "sentence": "How often do you go to the library? — Twice a week.",
        "zh": "你多久去一次图书馆？——一周两次。"
      },
      {
        "sentence": "How long does it take? — About twenty minutes.",
        "zh": "要花多久？——大约二十分钟。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-qw-often.jpg",
    "rightImage": "w4-qw-long.jpg",
    "leftLabel": "How often · 频率",
    "rightLabel": "How long · 时长",
    "leftSentence": "How often do you exercise? —Every day.",
    "leftZh": "你多久锻炼一次？—每天。",
    "rightSentence": "How long did you watch TV? —Two hours.",
    "rightZh": "你看了多久电视？—两小时。",
    "morphBase": "often",
    "morphPast": "long",
    "morphHighlight": "",
    "discovery": "How often → 频率；How long → 时长；How many/much → 数量。"
  },
  {
    "section": "精讲",
    "title": "例句 · How often",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-qw-hero.jpg",
    "lead": "答句是频率：once / twice / every day。",
    "sentence": "How often do you go to the library?",
    "zh": "你多久去一次图书馆？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · How far",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-qw-hero.jpg",
    "lead": "How far 问距离。",
    "sentence": "How far is it from your home to school?",
    "zh": "从你家到学校有多远？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-qw-hero.jpg",
    "lead": "疑问词与答句配对。",
    "rules": [
      {
        "tab": "How",
        "rule": "How often 频率；How long 时长；How many 可数；How much 不可数",
        "focusVerb": "often",
        "examples": [
          {
            "from": "often",
            "to": "twice a week"
          },
          {
            "from": "long",
            "to": "two hours"
          }
        ],
        "sample": "How often do you go to the library? Twice a week.",
        "sampleZh": "你多久去一次图书馆？一周两次。"
      },
      {
        "tab": "What/Where",
        "rule": "What 什么；Where 哪里；When 何时；Why 为什么",
        "focusVerb": "What",
        "examples": [
          {
            "from": "What",
            "to": "什么"
          },
          {
            "from": "Where",
            "to": "哪里"
          }
        ],
        "sample": "Where do you live? I live in Chengdu.",
        "sampleZh": "你住哪里？我住在成都。"
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
    "image": "w4-qw-hero.jpg",
    "buckets": [
      {
        "key": "freq",
        "label": "How often"
      },
      {
        "key": "dur",
        "label": "How long"
      },
      {
        "key": "num",
        "label": "How many/much"
      }
    ],
    "items": [
      {
        "text": "Twice a week",
        "bucket": "freq"
      },
      {
        "text": "For three years",
        "bucket": "dur"
      },
      {
        "text": "Five books",
        "bucket": "num"
      },
      {
        "text": "Every day",
        "bucket": "freq"
      },
      {
        "text": "About two hours",
        "bucket": "dur"
      },
      {
        "text": "A lot of water",
        "bucket": "num"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-qw-hero.jpg",
    "question": "答句是 Twice a week. 问句用哪个？",
    "choices": [
      {
        "text": "How often",
        "correct": true,
        "fb": "频率用 How often。"
      },
      {
        "text": "How long",
        "correct": false,
        "fb": "How long 答 for two hours。"
      },
      {
        "text": "How many",
        "correct": false,
        "fb": "How many 答数字+可数名词。"
      }
    ],
    "sentence": "How often do you go to the library? — Twice a week.",
    "zh": "你多久去一次图书馆？——一周两次。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-qw-hero.jpg",
    "lead": "根据答句写出问句。",
    "items": [
      {
        "from": "I have three pencils.",
        "fromZh": "我有三支铅笔。",
        "steps": [
          {
            "label": "对 three 提问",
            "opts": [
              "How many pencils do you have?",
              "How much pencils do you have?",
              "How long pencils do you have?"
            ],
            "ans": 0,
            "hint": "可数用 How many。",
            "sentence": "How many pencils do you have?",
            "zh": "你有多少支铅笔？"
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
    "image": "w4-qw-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "How",
      "often",
      "do",
      "you",
      "go",
      "to",
      "the",
      "library"
    ],
    "sentence": "How often do you go to the library?",
    "zh": "你多久去一次图书馆？",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-qw-hero.jpg",
    "audio": "How often do you go to the library?",
    "tokens": [
      "How",
      "often",
      "do",
      "you",
      "go",
      "to",
      "the",
      "library"
    ],
    "sentence": "How often do you go to the library?",
    "zh": "你多久去一次图书馆？"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-qw-hero.jpg",
    "q": "—_____ do you go to the library? —Twice a week.",
    "opts": [
      "How long",
      "How often",
      "How many"
    ],
    "ans": 1,
    "sentence": "—How often do you go to the library? —Twice a week.",
    "zh": "—你多久去一次图书馆？—一周两次。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-qw-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "—_____ do you go to the library? —Twice a week.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 1,
        "sentence": "—How often do you go to the library? —Twice a week.",
        "zh": "—你多久去一次图书馆？—一周两次。"
      },
      {
        "q": "—_____ is your father? —He is a doctor.",
        "opts": [
          "What",
          "Who",
          "How"
        ],
        "ans": 0,
        "hint": "问职业 What is…?",
        "sentence": "What is your father?",
        "zh": "你父亲做什么工作？"
      },
      {
        "q": "—_____ do you live? —In Chengdu.",
        "opts": [
          "What",
          "Where",
          "When"
        ],
        "ans": 1,
        "hint": "地点 Where。",
        "sentence": "Where do you live?",
        "zh": "你住在哪里？"
      },
      {
        "q": "—_____ is it from here? —Two kilometres.",
        "opts": [
          "How long",
          "How far",
          "How often"
        ],
        "ans": 1,
        "hint": "距离 How far。",
        "sentence": "How far is it from here?",
        "zh": "离这里有多远？"
      },
      {
        "q": "—_____ water do you drink? —Two glasses.",
        "opts": [
          "How many",
          "How much",
          "How long"
        ],
        "ans": 1,
        "hint": "water 不可数 How much。",
        "sentence": "How much water do you drink?",
        "zh": "你喝多少水？"
      },
      {
        "q": "—_____ will the meeting last? —Two hours.",
        "opts": [
          "How often",
          "How long",
          "How far"
        ],
        "ans": 1,
        "hint": "持续多久 How long。",
        "sentence": "How long will the meeting last?",
        "zh": "会议将持续多久？"
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
        "q": "—_____ do you go to the library? —Twice a week.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 1,
        "sentence": "—How often do you go to the library? —Twice a week.",
        "zh": "—你多久去一次图书馆？—一周两次。"
      },
      {
        "q": "—_____ is your father? —He is a doctor.",
        "opts": [
          "What",
          "Who",
          "How"
        ],
        "ans": 0,
        "hint": "问职业 What is…?",
        "sentence": "What is your father?",
        "zh": "你父亲做什么工作？"
      },
      {
        "q": "—_____ do you live? —In Chengdu.",
        "opts": [
          "What",
          "Where",
          "When"
        ],
        "ans": 1,
        "hint": "地点 Where。",
        "sentence": "Where do you live?",
        "zh": "你住在哪里？"
      },
      {
        "q": "—_____ is it from here? —Two kilometres.",
        "opts": [
          "How long",
          "How far",
          "How often"
        ],
        "ans": 1,
        "hint": "距离 How far。",
        "sentence": "How far is it from here?",
        "zh": "离这里有多远？"
      },
      {
        "q": "—_____ water do you drink? —Two glasses.",
        "opts": [
          "How many",
          "How much",
          "How long"
        ],
        "ans": 1,
        "hint": "water 不可数 How much。",
        "sentence": "How much water do you drink?",
        "zh": "你喝多少水？"
      },
      {
        "q": "—_____ will the meeting last? —Two hours.",
        "opts": [
          "How often",
          "How long",
          "How far"
        ],
        "ans": 1,
        "hint": "持续多久 How long。",
        "sentence": "How long will the meeting last?",
        "zh": "会议将持续多久？"
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
        "q": "—_____ do you go to the library? —Twice a week.",
        "opts": [
          "How long",
          "How often",
          "How many"
        ],
        "ans": 1,
        "sentence": "—How often do you go to the library? —Twice a week.",
        "zh": "—你多久去一次图书馆？—一周两次。"
      },
      {
        "q": "—_____ is your father? —He is a doctor.",
        "opts": [
          "What",
          "Who",
          "How"
        ],
        "ans": 0,
        "hint": "问职业 What is…?",
        "sentence": "What is your father?",
        "zh": "你父亲做什么工作？"
      },
      {
        "q": "—_____ do you live? —In Chengdu.",
        "opts": [
          "What",
          "Where",
          "When"
        ],
        "ans": 1,
        "hint": "地点 Where。",
        "sentence": "Where do you live?",
        "zh": "你住在哪里？"
      },
      {
        "q": "—_____ is it from here? —Two kilometres.",
        "opts": [
          "How long",
          "How far",
          "How often"
        ],
        "ans": 1,
        "hint": "距离 How far。",
        "sentence": "How far is it from here?",
        "zh": "离这里有多远？"
      },
      {
        "q": "—_____ water do you drink? —Two glasses.",
        "opts": [
          "How many",
          "How much",
          "How long"
        ],
        "ans": 1,
        "hint": "water 不可数 How much。",
        "sentence": "How much water do you drink?",
        "zh": "你喝多少水？"
      },
      {
        "q": "—_____ will the meeting last? —Two hours.",
        "opts": [
          "How often",
          "How long",
          "How far"
        ],
        "ans": 1,
        "hint": "持续多久 How long。",
        "sentence": "How long will the meeting last?",
        "zh": "会议将持续多久？"
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
    "image": "w4-qw-hero.jpg",
    "pairs": [
      {
        "en": "How often",
        "zh": "多久一次"
      },
      {
        "en": "How long",
        "zh": "多长时间"
      },
      {
        "en": "How far",
        "zh": "多远"
      },
      {
        "en": "How many",
        "zh": "多少（可数）"
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
    "image": "w4-qw-hero.jpg",
    "audio": "How often do you go to the library?",
    "opts": [
      "How often do you go to the library?",
      "How long do you go to the library?",
      "How many do you go to the library?"
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "How often do you go to the library?",
    "zh": "你多久去一次图书馆？",
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
      "How often → 频率（twice a week）",
      "How long → 时长（two hours）",
      "How many + 可数；How much + 不可数",
      "What + 名词：What colour / What time / What class。"
    ],
    "chant": "How often asks how many times! How long asks how many hours or lines!",
    "chantSpeak": "How often asks how many times! How long asks how many hours or lines!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "特殊疑问词 How / What / Where",
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