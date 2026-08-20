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
    "audio": "Tom always gets up early on school days.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。",
    "image": "w4-freq-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-freq-hero.jpg",
    "question": "always 在句中通常放在哪里？",
    "choices": [
      {
        "text": "be 动词后，实义动词前",
        "correct": true,
        "fb": "对了！He is always…; He always gets…"
      },
      {
        "text": "句末",
        "correct": false,
        "fb": "频度副词一般放句中。"
      },
      {
        "text": "句首必须加逗号",
        "correct": false,
        "fb": "有时可句首，但小升初常考句中位置。"
      }
    ],
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-freq-hero.jpg",
    "lead": "频度副词表示动作发生的频率，常与一般现在时连用。",
    "formula": "always > usually > often > sometimes > never",
    "parts": [
      {
        "mark": "be 后",
        "label": "is always",
        "example": "He is always late."
      },
      {
        "mark": "实义前",
        "label": "always gets",
        "example": "Tom always gets up early."
      }
    ],
    "samples": [
      {
        "sentence": "Tom always gets up early on school days.",
        "zh": "汤姆上学日总是早起。"
      },
      {
        "sentence": "My sister usually does her homework before dinner.",
        "zh": "我姐姐通常晚饭前做作业。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-freq-high.jpg",
    "rightImage": "w4-freq-low.jpg",
    "leftLabel": "always 总是",
    "rightLabel": "never 从不",
    "leftSentence": "She always helps her mother.",
    "leftZh": "她总是帮妈妈。",
    "rightSentence": "He never eats junk food.",
    "rightZh": "他从不吃垃圾食品。",
    "morphBase": "always",
    "morphPast": "never",
    "morphHighlight": "",
    "discovery": "频率：always > usually > often > sometimes > seldom > never。"
  },
  {
    "section": "精讲",
    "title": "例句 · always + 实义",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-freq-hero.jpg",
    "lead": "always 放在 gets 前面。",
    "sentence": "Tom always gets up early on school days.",
    "zh": "汤姆上学日总是早起。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · be + always",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-freq-hero.jpg",
    "lead": "be 动词后面再加频度副词。",
    "sentence": "She is always friendly to us.",
    "zh": "她对我们总是很友好。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-freq-hero.jpg",
    "lead": "频度副词位置与排序。",
    "rules": [
      {
        "tab": "位置",
        "rule": "be 后；助动词后；实义动词前",
        "focusVerb": "always",
        "examples": [
          {
            "from": "is always",
            "to": "He is always happy."
          },
          {
            "from": "always gets",
            "to": "He always gets up early."
          }
        ],
        "sample": "Tom always gets up early on school days.",
        "sampleZh": "上学日汤姆总是早起。"
      },
      {
        "tab": "排序",
        "rule": "always > usually > often > sometimes > never",
        "focusVerb": "usually",
        "examples": [
          {
            "from": "always",
            "to": "100%"
          },
          {
            "from": "never",
            "to": "0%"
          }
        ],
        "sample": "I usually walk to school, but sometimes I take the bus.",
        "sampleZh": "我通常走路上学，但有时坐公交。"
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
    "image": "w4-freq-hero.jpg",
    "buckets": [
      {
        "key": "high",
        "label": "高频率"
      },
      {
        "key": "low",
        "label": "低频率"
      }
    ],
    "items": [
      {
        "text": "always",
        "bucket": "high"
      },
      {
        "text": "never",
        "bucket": "low"
      },
      {
        "text": "usually",
        "bucket": "high"
      },
      {
        "text": "seldom",
        "bucket": "low"
      },
      {
        "text": "often",
        "bucket": "high"
      },
      {
        "text": "sometimes",
        "bucket": "low"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-freq-hero.jpg",
    "question": "「He gets always up early.」应改成？",
    "choices": [
      {
        "text": "always gets up（实义动词前）",
        "correct": true,
        "fb": "频度副词在实义动词前。"
      },
      {
        "text": "gets up always early",
        "correct": false,
        "fb": "位置不对。"
      },
      {
        "text": "is always gets up",
        "correct": false,
        "fb": "不能同时用 is 和 gets。"
      }
    ],
    "sentence": "He always gets up early.",
    "zh": "他总是早起。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-freq-hero.jpg",
    "lead": "把频度副词放到正确位置。",
    "items": [
      {
        "from": "He is late. (always)",
        "fromZh": "他迟到。（总是）",
        "steps": [
          {
            "label": "插入 always",
            "opts": [
              "He is always late.",
              "He always is late.",
              "He is late always."
            ],
            "ans": 0,
            "hint": "be 后 always。",
            "sentence": "He is always late.",
            "zh": "他总是迟到。"
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
    "image": "w4-freq-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Tom",
      "always",
      "gets",
      "up",
      "early",
      "on",
      "school",
      "days"
    ],
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-freq-hero.jpg",
    "audio": "Tom always gets up early on school days.",
    "tokens": [
      "Tom",
      "always",
      "gets",
      "up",
      "early",
      "on",
      "school",
      "days"
    ],
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-freq-hero.jpg",
    "q": "My sister _____ does her homework before dinner.",
    "opts": [
      "never",
      "usually",
      "seldom"
    ],
    "ans": 1,
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-freq-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "My sister _____ does her homework before dinner.",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "sentence": "Tom always gets up early on school days.",
        "zh": "上学日汤姆总是早起。"
      },
      {
        "q": "I _____ walk to school. I take the bus.",
        "opts": [
          "always",
          "never",
          "usually"
        ],
        "ans": 1,
        "hint": "坐公交说明 never walk。",
        "sentence": "I never walk to school. I take the bus.",
        "zh": "我从不走路上学，我坐公交。"
      },
      {
        "q": "They _____ play football on Sundays. （通常）",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "hint": "usually 通常。",
        "sentence": "They usually play football on Sundays.",
        "zh": "他们通常周日踢球。"
      },
      {
        "q": "_____ do you go swimming? — Once a week.",
        "opts": [
          "How long",
          "How often",
          "How far"
        ],
        "ans": 1,
        "hint": "问频率 How often。",
        "sentence": "How often do you go swimming?",
        "zh": "你多久游一次泳？"
      },
      {
        "q": "We _____ have rice for lunch, but not every day.",
        "opts": [
          "always",
          "sometimes",
          "never"
        ],
        "ans": 1,
        "hint": "不是每天 → sometimes。",
        "sentence": "We sometimes have rice for lunch.",
        "zh": "我们有时午饭吃米饭。"
      },
      {
        "q": "The students are _____ on time.",
        "opts": [
          "often",
          "oftenly",
          "oftens"
        ],
        "ans": 0,
        "hint": "often 无 -ly。",
        "sentence": "The students are often on time.",
        "zh": "学生们经常准时。"
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
        "q": "My sister _____ does her homework before dinner.",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "sentence": "Tom always gets up early on school days.",
        "zh": "上学日汤姆总是早起。"
      },
      {
        "q": "I _____ walk to school. I take the bus.",
        "opts": [
          "always",
          "never",
          "usually"
        ],
        "ans": 1,
        "hint": "坐公交说明 never walk。",
        "sentence": "I never walk to school. I take the bus.",
        "zh": "我从不走路上学，我坐公交。"
      },
      {
        "q": "They _____ play football on Sundays. （通常）",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "hint": "usually 通常。",
        "sentence": "They usually play football on Sundays.",
        "zh": "他们通常周日踢球。"
      },
      {
        "q": "_____ do you go swimming? — Once a week.",
        "opts": [
          "How long",
          "How often",
          "How far"
        ],
        "ans": 1,
        "hint": "问频率 How often。",
        "sentence": "How often do you go swimming?",
        "zh": "你多久游一次泳？"
      },
      {
        "q": "We _____ have rice for lunch, but not every day.",
        "opts": [
          "always",
          "sometimes",
          "never"
        ],
        "ans": 1,
        "hint": "不是每天 → sometimes。",
        "sentence": "We sometimes have rice for lunch.",
        "zh": "我们有时午饭吃米饭。"
      },
      {
        "q": "The students are _____ on time.",
        "opts": [
          "often",
          "oftenly",
          "oftens"
        ],
        "ans": 0,
        "hint": "often 无 -ly。",
        "sentence": "The students are often on time.",
        "zh": "学生们经常准时。"
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
        "q": "My sister _____ does her homework before dinner.",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "sentence": "Tom always gets up early on school days.",
        "zh": "上学日汤姆总是早起。"
      },
      {
        "q": "I _____ walk to school. I take the bus.",
        "opts": [
          "always",
          "never",
          "usually"
        ],
        "ans": 1,
        "hint": "坐公交说明 never walk。",
        "sentence": "I never walk to school. I take the bus.",
        "zh": "我从不走路上学，我坐公交。"
      },
      {
        "q": "They _____ play football on Sundays. （通常）",
        "opts": [
          "never",
          "usually",
          "seldom"
        ],
        "ans": 1,
        "hint": "usually 通常。",
        "sentence": "They usually play football on Sundays.",
        "zh": "他们通常周日踢球。"
      },
      {
        "q": "_____ do you go swimming? — Once a week.",
        "opts": [
          "How long",
          "How often",
          "How far"
        ],
        "ans": 1,
        "hint": "问频率 How often。",
        "sentence": "How often do you go swimming?",
        "zh": "你多久游一次泳？"
      },
      {
        "q": "We _____ have rice for lunch, but not every day.",
        "opts": [
          "always",
          "sometimes",
          "never"
        ],
        "ans": 1,
        "hint": "不是每天 → sometimes。",
        "sentence": "We sometimes have rice for lunch.",
        "zh": "我们有时午饭吃米饭。"
      },
      {
        "q": "The students are _____ on time.",
        "opts": [
          "often",
          "oftenly",
          "oftens"
        ],
        "ans": 0,
        "hint": "often 无 -ly。",
        "sentence": "The students are often on time.",
        "zh": "学生们经常准时。"
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
    "image": "w4-freq-hero.jpg",
    "pairs": [
      {
        "en": "always",
        "zh": "总是 100%"
      },
      {
        "en": "usually",
        "zh": "通常"
      },
      {
        "en": "sometimes",
        "zh": "有时"
      },
      {
        "en": "never",
        "zh": "从不"
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
    "image": "w4-freq-hero.jpg",
    "audio": "Tom always gets up early on school days.",
    "opts": [
      "Tom always gets up early on school days.",
      "Tom gets always up early on school days.",
      "Tom is always get up early."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Tom always gets up early on school days.",
    "zh": "上学日汤姆总是早起。",
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
      "be 后/实义动词前",
      "always > usually > often > sometimes > never",
      "写作：I usually…, but sometimes…",
      "sometimes 也可放句首：Sometimes I read in bed."
    ],
    "chant": "Always, usually, often — high to low! After be, before verb — now you know!",
    "chantSpeak": "Always, usually, often, high to low! After be, before verb, now you know!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "频度副词 always / usually / often",
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