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
    "audio": "This book is mine. Yours is on the desk.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "This book is mine. Yours is on the desk.",
    "zh": "这本书是我的。你的在桌上。",
    "image": "w4-poss-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-poss-hero.jpg",
    "question": "mine 后面还需要加名词吗？",
    "choices": [
      {
        "text": "不需要，mine = my + 名词",
        "correct": true,
        "fb": "对了！mine/yours/hers 独立使用。"
      },
      {
        "text": "需要，mine book",
        "correct": false,
        "fb": "mine 已是名词性物主代词。"
      },
      {
        "text": "mine 只能作主语",
        "correct": false,
        "fb": "可作主语、表语、宾语。"
      }
    ],
    "sentence": "This book is mine. Yours is on the desk.",
    "zh": "这本书是我的。你的在桌上。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-poss-hero.jpg",
    "lead": "形容词性物主代词后面必须有名词；名词性物主代词单独用。",
    "formula": "my book = mine　　your pen = yours",
    "parts": [
      {
        "mark": "形物",
        "label": "my/your/his/her/our/their",
        "example": "my book"
      },
      {
        "mark": "名物",
        "label": "mine/yours/his/hers/ours/theirs",
        "example": "mine"
      }
    ],
    "samples": [
      {
        "sentence": "This book is mine. Yours is on the desk.",
        "zh": "这本书是我的。你的在桌子上。"
      },
      {
        "sentence": "This pen isn't mine. It's hers.",
        "zh": "这支笔不是我的。是她的。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-poss-adj.jpg",
    "rightImage": "w4-poss-pron.jpg",
    "leftLabel": "my book",
    "rightLabel": "The book is mine.",
    "leftSentence": "This is my pen.",
    "leftZh": "这是我的钢笔。",
    "rightSentence": "This pen is mine.",
    "rightZh": "这支钢笔是我的。",
    "morphBase": "my",
    "morphPast": "mine",
    "morphHighlight": "",
    "discovery": "形容词性：my/your/his/her/our/their + 名词；名词性：mine/yours/his/hers/ours/theirs。"
  },
  {
    "section": "精讲",
    "title": "例句 · mine / yours",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-poss-hero.jpg",
    "lead": "后面没有名词时用 mine/yours。",
    "sentence": "This book is mine. Yours is on the desk.",
    "zh": "这本书是我的。你的在桌子上。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · his 两种同形",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-poss-hero.jpg",
    "lead": "his 既是形容词性也是名词性。",
    "sentence": "This is his bag. That bag is also his.",
    "zh": "这是他的包。那个包也是他的。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-poss-hero.jpg",
    "lead": "两套物主代词。",
    "rules": [
      {
        "tab": "形容词性",
        "rule": "my/your/his/her/its/our/their + 名词",
        "focusVerb": "my",
        "examples": [
          {
            "from": "my",
            "to": "my book"
          }
        ],
        "sample": "This is my book.",
        "sampleZh": "这是我的书。"
      },
      {
        "tab": "名词性",
        "rule": "mine/yours/his/hers/ours/theirs（后不接名词）",
        "focusVerb": "mine",
        "examples": [
          {
            "from": "mine",
            "to": "The book is mine."
          }
        ],
        "sample": "This book is mine. Yours is on the desk.",
        "sampleZh": "这本书是我的。你的在桌上。"
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
    "image": "w4-poss-hero.jpg",
    "buckets": [
      {
        "key": "adj",
        "label": "形容词性 + 名词"
      },
      {
        "key": "pron",
        "label": "名词性（独立）"
      }
    ],
    "items": [
      {
        "text": "my bag",
        "bucket": "adj"
      },
      {
        "text": "The bag is mine.",
        "bucket": "pron"
      },
      {
        "text": "her books",
        "bucket": "adj"
      },
      {
        "text": "These are hers.",
        "bucket": "pron"
      },
      {
        "text": "their classroom",
        "bucket": "adj"
      },
      {
        "text": "This classroom is theirs.",
        "bucket": "pron"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-poss-hero.jpg",
    "question": "「This is mine book.」应改成？",
    "choices": [
      {
        "text": "This is my book. 或 This book is mine.",
        "correct": true,
        "fb": "mine 后面不能再加名词。"
      },
      {
        "text": "This is I book.",
        "correct": false,
        "fb": "要用 my。"
      },
      {
        "text": "This is me book.",
        "correct": false,
        "fb": "me 是宾格。"
      }
    ],
    "sentence": "This is my book.",
    "zh": "这是我的书。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-poss-hero.jpg",
    "lead": "my + 名词 改成 名词性物主。",
    "items": [
      {
        "from": "This is her bike.",
        "fromZh": "这是她的自行车。",
        "steps": [
          {
            "label": "改成：这辆自行车是她的",
            "opts": [
              "This bike is hers.",
              "This bike is her.",
              "This bike is she's."
            ],
            "ans": 0,
            "hint": "hers 独立使用。",
            "sentence": "This bike is hers.",
            "zh": "这辆自行车是她的。"
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
    "image": "w4-poss-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "This",
      "book",
      "is",
      "mine"
    ],
    "sentence": "This book is mine.",
    "zh": "这本书是我的。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-poss-hero.jpg",
    "audio": "This book is mine.",
    "tokens": [
      "This",
      "book",
      "is",
      "mine"
    ],
    "sentence": "This book is mine.",
    "zh": "这本书是我的。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-poss-hero.jpg",
    "q": "This pen isn't _____. It's _____.",
    "opts": [
      "my; her",
      "mine; hers",
      "mine; her"
    ],
    "ans": 1,
    "hint": "be 动词后用名词性物主代词。",
    "sentence": "This book is mine. Yours is on the desk.",
    "zh": "这本书是我的。你的在桌上。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-poss-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "This pen isn't _____. It's _____.",
        "opts": [
          "my; her",
          "mine; hers",
          "mine; her"
        ],
        "ans": 1,
        "hint": "be 动词后用名词性物主代词。",
        "sentence": "This book is mine. Yours is on the desk.",
        "zh": "这本书是我的。你的在桌上。"
      },
      {
        "q": "_____ classroom is big. _____ is bigger.",
        "opts": [
          "Our; Their",
          "Ours; Theirs",
          "Our; Theirs"
        ],
        "ans": 2,
        "hint": "前有名词用 Our，后独立用 Theirs。",
        "sentence": "Our classroom is big. Theirs is bigger.",
        "zh": "我们的教室大。他们的更大。"
      },
      {
        "q": "Is this pencil _____?",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 2,
        "hint": "后面无名词用 yours。",
        "sentence": "Is this pencil yours?",
        "zh": "这支铅笔是你的吗？"
      },
      {
        "q": "The cat washed _____ face.",
        "opts": [
          "it",
          "it's",
          "its"
        ],
        "ans": 2,
        "hint": "its 物主，it's = it is。",
        "sentence": "The cat washed its face.",
        "zh": "猫洗了它的脸。"
      },
      {
        "q": "These seats are _____.",
        "opts": [
          "our",
          "ours",
          "us"
        ],
        "ans": 1,
        "hint": "独立用 ours。",
        "sentence": "These seats are ours.",
        "zh": "这些座位是我们的。"
      },
      {
        "q": "_____ name is Emma. What's _____?",
        "opts": [
          "Her; yours",
          "Hers; your",
          "She; yours"
        ],
        "ans": 0,
        "hint": "Her name；yours 独立。",
        "sentence": "Her name is Emma. What's yours?",
        "zh": "她叫艾玛。你呢？"
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
        "q": "This pen isn't _____. It's _____.",
        "opts": [
          "my; her",
          "mine; hers",
          "mine; her"
        ],
        "ans": 1,
        "hint": "be 动词后用名词性物主代词。",
        "sentence": "This book is mine. Yours is on the desk.",
        "zh": "这本书是我的。你的在桌上。"
      },
      {
        "q": "_____ classroom is big. _____ is bigger.",
        "opts": [
          "Our; Their",
          "Ours; Theirs",
          "Our; Theirs"
        ],
        "ans": 2,
        "hint": "前有名词用 Our，后独立用 Theirs。",
        "sentence": "Our classroom is big. Theirs is bigger.",
        "zh": "我们的教室大。他们的更大。"
      },
      {
        "q": "Is this pencil _____?",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 2,
        "hint": "后面无名词用 yours。",
        "sentence": "Is this pencil yours?",
        "zh": "这支铅笔是你的吗？"
      },
      {
        "q": "The cat washed _____ face.",
        "opts": [
          "it",
          "it's",
          "its"
        ],
        "ans": 2,
        "hint": "its 物主，it's = it is。",
        "sentence": "The cat washed its face.",
        "zh": "猫洗了它的脸。"
      },
      {
        "q": "These seats are _____.",
        "opts": [
          "our",
          "ours",
          "us"
        ],
        "ans": 1,
        "hint": "独立用 ours。",
        "sentence": "These seats are ours.",
        "zh": "这些座位是我们的。"
      },
      {
        "q": "_____ name is Emma. What's _____?",
        "opts": [
          "Her; yours",
          "Hers; your",
          "She; yours"
        ],
        "ans": 0,
        "hint": "Her name；yours 独立。",
        "sentence": "Her name is Emma. What's yours?",
        "zh": "她叫艾玛。你呢？"
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
        "q": "This pen isn't _____. It's _____.",
        "opts": [
          "my; her",
          "mine; hers",
          "mine; her"
        ],
        "ans": 1,
        "hint": "be 动词后用名词性物主代词。",
        "sentence": "This book is mine. Yours is on the desk.",
        "zh": "这本书是我的。你的在桌上。"
      },
      {
        "q": "_____ classroom is big. _____ is bigger.",
        "opts": [
          "Our; Their",
          "Ours; Theirs",
          "Our; Theirs"
        ],
        "ans": 2,
        "hint": "前有名词用 Our，后独立用 Theirs。",
        "sentence": "Our classroom is big. Theirs is bigger.",
        "zh": "我们的教室大。他们的更大。"
      },
      {
        "q": "Is this pencil _____?",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 2,
        "hint": "后面无名词用 yours。",
        "sentence": "Is this pencil yours?",
        "zh": "这支铅笔是你的吗？"
      },
      {
        "q": "The cat washed _____ face.",
        "opts": [
          "it",
          "it's",
          "its"
        ],
        "ans": 2,
        "hint": "its 物主，it's = it is。",
        "sentence": "The cat washed its face.",
        "zh": "猫洗了它的脸。"
      },
      {
        "q": "These seats are _____.",
        "opts": [
          "our",
          "ours",
          "us"
        ],
        "ans": 1,
        "hint": "独立用 ours。",
        "sentence": "These seats are ours.",
        "zh": "这些座位是我们的。"
      },
      {
        "q": "_____ name is Emma. What's _____?",
        "opts": [
          "Her; yours",
          "Hers; your",
          "She; yours"
        ],
        "ans": 0,
        "hint": "Her name；yours 独立。",
        "sentence": "Her name is Emma. What's yours?",
        "zh": "她叫艾玛。你呢？"
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
    "image": "w4-poss-hero.jpg",
    "pairs": [
      {
        "en": "my book",
        "zh": "我的书"
      },
      {
        "en": "mine",
        "zh": "我的（独立）"
      },
      {
        "en": "hers",
        "zh": "她的（独立）"
      },
      {
        "en": "theirs",
        "zh": "他们的（独立）"
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
    "image": "w4-poss-hero.jpg",
    "audio": "This book is mine.",
    "opts": [
      "This book is mine.",
      "This book is my. Yours is on the desk.",
      "This book is mine book."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "This book is mine.",
    "zh": "这本书是我的。",
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
      "my + 名词；mine 独立",
      "his 形容词性 = 名词性",
      "写作：Yours is…; This is mine.",
      "his 形物=名物；its 没有 it's 的撇号。"
    ],
    "chant": "My plus noun — that's the rule! Mine stands alone — cool and cool!",
    "chantSpeak": "My plus noun, that is the rule! Mine stands alone, cool and cool!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "物主代词 my / mine",
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