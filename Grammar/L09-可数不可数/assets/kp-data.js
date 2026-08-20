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
    "audio": "How much water do you drink every day?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？",
    "image": "l10-count-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l10-count-hero.jpg",
    "question": "water 为什么用 much 而不是 many？",
    "choices": [
      {
        "text": "water 不可数，用 much",
        "correct": true,
        "fb": "对了！不可数名词用 much/a little。"
      },
      {
        "text": "water 是复数",
        "correct": false,
        "fb": "water 不可数，没有复数形式。"
      },
      {
        "text": "much 只能修饰人",
        "correct": false,
        "fb": "much 修饰不可数名词。"
      }
    ],
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l10-count-hero.jpg",
    "lead": "可数名词能数个数；不可数名词要用计量短语。",
    "formula": "many / a few + 复数　　much / a little + 不可数",
    "parts": [
      {
        "mark": "可数",
        "label": "有复数",
        "example": "apples / books"
      },
      {
        "mark": "不可数",
        "label": "无复数",
        "example": "water / homework"
      },
      {
        "mark": "计量",
        "label": "量词 + of",
        "example": "a bottle of water"
      }
    ],
    "samples": [
      {
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "sentence": "I don't have much homework today.",
        "zh": "我今天作业不多。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l10-many.jpg",
    "rightImage": "l10-much.jpg",
    "leftLabel": "many books（可数）",
    "rightLabel": "much water（不可数）",
    "leftSentence": "How many books do you have?",
    "leftZh": "你有多少本书？",
    "rightSentence": "How much water do you need?",
    "rightZh": "你需要多少水？",
    "morphBase": "many",
    "morphPast": "much",
    "morphHighlight": "",
    "discovery": "可数：many/few/a few；不可数：much/little/a little。"
  },
  {
    "section": "精讲",
    "title": "例句 · How much water",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l10-count-hero.jpg",
    "lead": "water 不可数 → How much。",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 两杯茶",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l10-count-hero.jpg",
    "lead": "不可数可用计量：two cups of tea。",
    "sentence": "I would like two cups of tea.",
    "zh": "我想要两杯茶。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l10-count-hero.jpg",
    "rules": [
      {
        "tab": "可数",
        "rule": "many / a few / few + 可数名词复数",
        "focusVerb": "many",
        "examples": [
          {
            "from": "book",
            "to": "many books"
          },
          {
            "from": "few",
            "to": "a few apples"
          }
        ],
        "sample": "How many students are there in your class?",
        "sampleZh": "你们班有多少学生？"
      },
      {
        "tab": "不可数",
        "rule": "much / a little / little + 不可数名词",
        "focusVerb": "much",
        "examples": [
          {
            "from": "water",
            "to": "much water"
          },
          {
            "from": "milk",
            "to": "a little milk"
          }
        ],
        "sample": "How much water do you drink every day?",
        "sampleZh": "你每天喝多少水？"
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
    "image": "l10-count-hero.jpg",
    "buckets": [
      {
        "key": "c",
        "label": "可数名词"
      },
      {
        "key": "u",
        "label": "不可数名词"
      }
    ],
    "items": [
      {
        "text": "apple",
        "bucket": "c"
      },
      {
        "text": "water",
        "bucket": "u"
      },
      {
        "text": "rice",
        "bucket": "u"
      },
      {
        "text": "student",
        "bucket": "c"
      },
      {
        "text": "milk",
        "bucket": "u"
      },
      {
        "text": "homework",
        "bucket": "u"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l10-count-hero.jpg",
    "question": "「I have many homeworks today.」应改成？",
    "choices": [
      {
        "text": "much homework（homework 不可数）",
        "correct": true,
        "fb": "homework 没有复数。"
      },
      {
        "text": "many homework",
        "correct": false,
        "fb": "many 要加可数复数。"
      },
      {
        "text": "a few homeworks",
        "correct": false,
        "fb": "不能加 s。"
      }
    ],
    "sentence": "I have much homework today.",
    "zh": "我今天有很多作业。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l10-count-hero.jpg",
    "lead": "把可数句的 many 改成不可数搭配 much。",
    "items": [
      {
        "from": "I have many apples.",
        "fromZh": "我有许多苹果。",
        "steps": [
          {
            "label": "如果是水，怎么说「许多」？",
            "opts": [
              "I have much water.",
              "I have many water.",
              "I have a few water."
            ],
            "ans": 0,
            "hint": "water 不可数 → much water。",
            "sentence": "I have much water.",
            "zh": "我有很多水。"
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
    "image": "l10-count-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "don't",
      "have",
      "much",
      "homework",
      "today"
    ],
    "sentence": "I don't have much homework today.",
    "zh": "我今天作业不多。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l10-count-hero.jpg",
    "audio": "I don't have much homework today.",
    "tokens": [
      "I",
      "don't",
      "have",
      "much",
      "homework",
      "today"
    ],
    "sentence": "I don't have much homework today.",
    "zh": "我今天作业不多。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l10-count-hero.jpg",
    "q": "There isn't _____ milk in the fridge.",
    "opts": [
      "many",
      "much",
      "few"
    ],
    "ans": 1,
    "hint": "milk 不可数，用 much。",
    "sentence": "How much water do you drink every day?",
    "zh": "你每天喝多少水？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l10-count-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数 → much。",
        "sentence": "There isn't much milk in the fridge.",
        "zh": "冰箱里牛奶不多。"
      },
      {
        "q": "How _____ books do you have?",
        "opts": [
          "much",
          "many",
          "little"
        ],
        "ans": 1,
        "hint": "books 可数 → many。",
        "sentence": "How many books do you have?",
        "zh": "你有多少本书？"
      },
      {
        "q": "I'd like _____ bread, please.",
        "opts": [
          "a",
          "an",
          "some"
        ],
        "ans": 2,
        "hint": "bread 不可数，用 some。",
        "sentence": "I'd like some bread, please.",
        "zh": "请给我一些面包。"
      },
      {
        "q": "There are _____ students in the hall.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "students 可数复数 → many。",
        "sentence": "There are many students in the hall.",
        "zh": "大厅里有许多学生。"
      },
      {
        "q": "Please give me _____ of water.",
        "opts": [
          "a bottle",
          "many",
          "few"
        ],
        "ans": 0,
        "hint": "计量短语 a bottle of water。",
        "sentence": "Please give me a bottle of water.",
        "zh": "请给我一瓶水。"
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
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数 → much。",
        "sentence": "There isn't much milk in the fridge.",
        "zh": "冰箱里牛奶不多。"
      },
      {
        "q": "How _____ books do you have?",
        "opts": [
          "much",
          "many",
          "little"
        ],
        "ans": 1,
        "hint": "books 可数 → many。",
        "sentence": "How many books do you have?",
        "zh": "你有多少本书？"
      },
      {
        "q": "I'd like _____ bread, please.",
        "opts": [
          "a",
          "an",
          "some"
        ],
        "ans": 2,
        "hint": "bread 不可数，用 some。",
        "sentence": "I'd like some bread, please.",
        "zh": "请给我一些面包。"
      },
      {
        "q": "There are _____ students in the hall.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "students 可数复数 → many。",
        "sentence": "There are many students in the hall.",
        "zh": "大厅里有许多学生。"
      },
      {
        "q": "Please give me _____ of water.",
        "opts": [
          "a bottle",
          "many",
          "few"
        ],
        "ans": 0,
        "hint": "计量短语 a bottle of water。",
        "sentence": "Please give me a bottle of water.",
        "zh": "请给我一瓶水。"
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
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数，用 much。",
        "sentence": "How much water do you drink every day?",
        "zh": "你每天喝多少水？"
      },
      {
        "q": "There isn't _____ milk in the fridge.",
        "opts": [
          "many",
          "much",
          "few"
        ],
        "ans": 1,
        "hint": "milk 不可数 → much。",
        "sentence": "There isn't much milk in the fridge.",
        "zh": "冰箱里牛奶不多。"
      },
      {
        "q": "How _____ books do you have?",
        "opts": [
          "much",
          "many",
          "little"
        ],
        "ans": 1,
        "hint": "books 可数 → many。",
        "sentence": "How many books do you have?",
        "zh": "你有多少本书？"
      },
      {
        "q": "I'd like _____ bread, please.",
        "opts": [
          "a",
          "an",
          "some"
        ],
        "ans": 2,
        "hint": "bread 不可数，用 some。",
        "sentence": "I'd like some bread, please.",
        "zh": "请给我一些面包。"
      },
      {
        "q": "There are _____ students in the hall.",
        "opts": [
          "much",
          "a little",
          "many"
        ],
        "ans": 2,
        "hint": "students 可数复数 → many。",
        "sentence": "There are many students in the hall.",
        "zh": "大厅里有许多学生。"
      },
      {
        "q": "Please give me _____ of water.",
        "opts": [
          "a bottle",
          "many",
          "few"
        ],
        "ans": 0,
        "hint": "计量短语 a bottle of water。",
        "sentence": "Please give me a bottle of water.",
        "zh": "请给我一瓶水。"
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
    "image": "l10-count-hero.jpg",
    "pairs": [
      {
        "en": "many books",
        "zh": "许多书（可数）"
      },
      {
        "en": "much water",
        "zh": "许多水（不可数）"
      },
      {
        "en": "a cup of tea",
        "zh": "一杯茶"
      },
      {
        "en": "How much…?",
        "zh": "多少（不可数）"
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
    "image": "l10-count-hero.jpg",
    "audio": "I don't have much homework today.",
    "opts": [
      "I don't have much homework today.",
      "I don't have many homework today.",
      "I don't have much homeworks today."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "I don't have much homework today.",
    "zh": "我今天作业不多。",
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
      "可数：many/few/a few + 复数",
      "不可数：much/little/a little + 原形",
      "计量：a bottle of water, two cups of tea",
      "advice / information / news / homework 都不可数。",
      "计量：a piece of news, two bottles of milk。"
    ],
    "chant": "Many for count, much for mass! Water, rice — uncountable class!",
    "chantSpeak": "Many for count, much for mass! Water, rice, uncountable class!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "可数与不可数名词",
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