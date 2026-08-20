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
    "audio": "There are a few apples on the table.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。",
    "image": "l15-few-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l15-few-hero.jpg",
    "question": "a few 和 few 意思一样吗？",
    "choices": [
      {
        "text": "a few 一些（肯定）；few 几乎没有（否定）",
        "correct": true,
        "fb": "对了！a 虽小但表「有一些」。"
      },
      {
        "text": "完全一样",
        "correct": false,
        "fb": "有无 a 意思相反！"
      },
      {
        "text": "few 比 a few 更多",
        "correct": false,
        "fb": "few 表否定，几乎沒有。"
      }
    ],
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l15-few-hero.jpg",
    "lead": "有 a 表示「有一些」；没有 a 表示「几乎没有」。",
    "formula": "a few / few + 可数复数　　a little / little + 不可数",
    "parts": [
      {
        "mark": "a few",
        "label": "一些（可数）",
        "example": "a few apples"
      },
      {
        "mark": "few",
        "label": "几乎没有（可数）",
        "example": "few friends"
      },
      {
        "mark": "a little",
        "label": "一点（不可数）",
        "example": "a little water"
      },
      {
        "mark": "little",
        "label": "几乎没有（不可数）",
        "example": "little time"
      }
    ],
    "samples": [
      {
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "sentence": "There is little water left. We need to buy more.",
        "zh": "水快没了，我们得再买。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l15-afew.jpg",
    "rightImage": "l15-few.jpg",
    "leftLabel": "a few 有一些",
    "rightLabel": "few 几乎没有",
    "leftSentence": "I have a few friends here.",
    "leftZh": "我在这里有一些朋友。",
    "rightSentence": "Few students like the test.",
    "rightZh": "几乎没有学生喜欢这次测验。",
    "morphBase": "a few",
    "morphPast": "few",
    "morphHighlight": "",
    "discovery": "a few/a little 肯定；few/little 否定。"
  },
  {
    "section": "精讲",
    "title": "例句 · a few 可数",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l15-few-hero.jpg",
    "lead": "apples 可数复数 → a few。",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · little 不可数否定",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l15-few-hero.jpg",
    "lead": "little water = 几乎没水。",
    "sentence": "There is little water left.",
    "zh": "剩下的水很少了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l15-few-hero.jpg",
    "rules": [
      {
        "tab": "a few",
        "rule": "a few + 可数复数（有一些）",
        "focusVerb": "a few",
        "examples": [
          {
            "from": "apples",
            "to": "a few apples"
          }
        ],
        "sample": "There are a few apples on the table.",
        "sampleZh": "桌上有几个苹果。"
      },
      {
        "tab": "a little",
        "rule": "a little + 不可数（有一点）",
        "focusVerb": "a little",
        "examples": [
          {
            "from": "water",
            "to": "a little water"
          }
        ],
        "sample": "Would you like a little sugar?",
        "sampleZh": "你要加一点糖吗？"
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
    "image": "l15-few-hero.jpg",
    "buckets": [
      {
        "key": "pos",
        "label": "a few / a little（有一些）"
      },
      {
        "key": "neg",
        "label": "few / little（几乎没有）"
      }
    ],
    "items": [
      {
        "text": "a few books",
        "bucket": "pos"
      },
      {
        "text": "few books",
        "bucket": "neg"
      },
      {
        "text": "a little milk",
        "bucket": "pos"
      },
      {
        "text": "little milk",
        "bucket": "neg"
      },
      {
        "text": "a few minutes",
        "bucket": "pos"
      },
      {
        "text": "little time",
        "bucket": "neg"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l15-few-hero.jpg",
    "question": "「I have a little friends.」错在哪？",
    "choices": [
      {
        "text": "friends 可数，要用 a few",
        "correct": true,
        "fb": "a little 只搭配不可数。"
      },
      {
        "text": "要用 little friends",
        "correct": false,
        "fb": "那是「几乎没有朋友」，搭配也对但意思不同；这里语法应用 a few。"
      },
      {
        "text": "friends 要改成 friend",
        "correct": false,
        "fb": "few/a few 后是复数。"
      }
    ],
    "sentence": "I have a few friends.",
    "zh": "我有几个朋友。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l15-few-hero.jpg",
    "lead": "把 a few 句改成不可数的 a little。",
    "items": [
      {
        "from": "I have a few questions.",
        "fromZh": "我有几个问题。",
        "steps": [
          {
            "label": "如果是时间：我还有一点时间",
            "opts": [
              "I have a little time.",
              "I have a few time.",
              "I have little times."
            ],
            "ans": 0,
            "hint": "time 不可数 → a little time。",
            "sentence": "I have a little time.",
            "zh": "我还有一点时间。"
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
    "image": "l15-few-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "have",
      "a",
      "few",
      "questions",
      "for",
      "you"
    ],
    "sentence": "I have a few questions for you.",
    "zh": "我有几个问题要问你。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l15-few-hero.jpg",
    "audio": "I have a few questions for you.",
    "tokens": [
      "I",
      "have",
      "a",
      "few",
      "questions",
      "for",
      "you"
    ],
    "sentence": "I have a few questions for you.",
    "zh": "我有几个问题要问你。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l15-few-hero.jpg",
    "q": "There is _____ water left. We need to buy more.",
    "opts": [
      "a little",
      "little",
      "a few"
    ],
    "ans": 1,
    "hint": "水快没了（否定）→ little water。",
    "sentence": "There are a few apples on the table.",
    "zh": "桌上有几个苹果。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l15-few-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "There is _____ water left. We need to buy more.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 1,
        "hint": "水快没了（否定）→ little water。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "q": "There is _____ milk. We can make breakfast.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 1,
        "hint": "有一点奶，够用 → a little。",
        "sentence": "There is a little milk.",
        "zh": "还有一点牛奶。"
      },
      {
        "q": "He has _____ friends, so he often feels lonely.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 1,
        "hint": "几乎没有朋友 → few。",
        "sentence": "He has few friends, so he often feels lonely.",
        "zh": "他几乎没有朋友，所以常觉得孤独。"
      },
      {
        "q": "Only _____ students passed the test.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "students 可数 → a few。",
        "sentence": "Only a few students passed the test.",
        "zh": "只有几个学生通过了考试。"
      },
      {
        "q": "Hurry up! We have _____ time left.",
        "opts": [
          "little",
          "a few",
          "many"
        ],
        "ans": 0,
        "hint": "时间紧迫 → little time。",
        "sentence": "We have little time left.",
        "zh": "我们剩的时间很少了。"
      },
      {
        "q": "I can speak _____ English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "English 不可数 → a little。",
        "sentence": "I can speak a little English.",
        "zh": "我会说一点英语。"
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
        "q": "There is _____ water left. We need to buy more.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 1,
        "hint": "水快没了（否定）→ little water。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "q": "There is _____ milk. We can make breakfast.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 1,
        "hint": "有一点奶，够用 → a little。",
        "sentence": "There is a little milk.",
        "zh": "还有一点牛奶。"
      },
      {
        "q": "He has _____ friends, so he often feels lonely.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 1,
        "hint": "几乎没有朋友 → few。",
        "sentence": "He has few friends, so he often feels lonely.",
        "zh": "他几乎没有朋友，所以常觉得孤独。"
      },
      {
        "q": "Only _____ students passed the test.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "students 可数 → a few。",
        "sentence": "Only a few students passed the test.",
        "zh": "只有几个学生通过了考试。"
      },
      {
        "q": "Hurry up! We have _____ time left.",
        "opts": [
          "little",
          "a few",
          "many"
        ],
        "ans": 0,
        "hint": "时间紧迫 → little time。",
        "sentence": "We have little time left.",
        "zh": "我们剩的时间很少了。"
      },
      {
        "q": "I can speak _____ English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "English 不可数 → a little。",
        "sentence": "I can speak a little English.",
        "zh": "我会说一点英语。"
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
        "q": "There is _____ water left. We need to buy more.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 1,
        "hint": "水快没了（否定）→ little water。",
        "sentence": "There are a few apples on the table.",
        "zh": "桌上有几个苹果。"
      },
      {
        "q": "There is _____ milk. We can make breakfast.",
        "opts": [
          "little",
          "a little",
          "a few"
        ],
        "ans": 1,
        "hint": "有一点奶，够用 → a little。",
        "sentence": "There is a little milk.",
        "zh": "还有一点牛奶。"
      },
      {
        "q": "He has _____ friends, so he often feels lonely.",
        "opts": [
          "a few",
          "few",
          "a little"
        ],
        "ans": 1,
        "hint": "几乎没有朋友 → few。",
        "sentence": "He has few friends, so he often feels lonely.",
        "zh": "他几乎没有朋友，所以常觉得孤独。"
      },
      {
        "q": "Only _____ students passed the test.",
        "opts": [
          "a little",
          "little",
          "a few"
        ],
        "ans": 2,
        "hint": "students 可数 → a few。",
        "sentence": "Only a few students passed the test.",
        "zh": "只有几个学生通过了考试。"
      },
      {
        "q": "Hurry up! We have _____ time left.",
        "opts": [
          "little",
          "a few",
          "many"
        ],
        "ans": 0,
        "hint": "时间紧迫 → little time。",
        "sentence": "We have little time left.",
        "zh": "我们剩的时间很少了。"
      },
      {
        "q": "I can speak _____ English.",
        "opts": [
          "a few",
          "a little",
          "few"
        ],
        "ans": 1,
        "hint": "English 不可数 → a little。",
        "sentence": "I can speak a little English.",
        "zh": "我会说一点英语。"
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
    "image": "l15-few-hero.jpg",
    "pairs": [
      {
        "en": "a few apples",
        "zh": "几个苹果"
      },
      {
        "en": "few friends",
        "zh": "几乎没有朋友"
      },
      {
        "en": "a little water",
        "zh": "一点水"
      },
      {
        "en": "little time",
        "zh": "几乎没时间"
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
    "image": "l15-few-hero.jpg",
    "audio": "I have a few questions for you.",
    "opts": [
      "I have a few questions for you.",
      "There are a little apples on the table.",
      "There are few apple on the table."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "I have a few questions for you.",
    "zh": "我有几个问题要问你。",
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
      "a few + 可数复数；a little + 不可数",
      "few/little 表否定「几乎没有」",
      "写作：I have a little time, but few ideas.",
      "only a few / only a little 仍表「只有一些」，但带有「不多」的口气。"
    ],
    "chant": "A few count, a little mass! Without a — almost none — alas!",
    "chantSpeak": "A few count, a little mass! Without a, almost none, alas!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "a few / a little / few / little",
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