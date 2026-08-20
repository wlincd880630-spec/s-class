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
    "audio": "There are two libraries in our school.",
    "soundHint": "libraries 是怎么变复数的？",
    "question": "这句话在数什么？",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。",
    "image": "w5-plr-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-plr-hero.jpg",
    "question": "library 变 libraries，用了哪条规则？",
    "choices": [
      {
        "text": "辅音字母 + y 结尾，变 y 为 i 再加 -es",
        "correct": true,
        "fb": "对了！library → libraries。"
      },
      {
        "text": "直接加 -s",
        "correct": false,
        "fb": "辅音 + y 结尾不能直接加 -s。"
      },
      {
        "text": "变 y 为 ies 但不加 -es",
        "correct": false,
        "fb": "变 y 为 i 后还要加 -es。"
      }
    ],
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-plr-hero.jpg",
    "lead": "大多数可数名词变复数有规律。",
    "formula": "+s　/　s·x·ch·sh +es　/　辅音+y → ies",
    "parts": [
      {
        "mark": "+s",
        "label": "一般",
        "example": "books / days"
      },
      {
        "mark": "+es",
        "label": "s/x/ch/sh",
        "example": "boxes / watches"
      },
      {
        "mark": "ies",
        "label": "辅音+y",
        "example": "libraries / babies"
      }
    ],
    "samples": [
      {
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两座图书馆。"
      },
      {
        "sentence": "The babies are sleeping.",
        "zh": "婴儿们在睡觉。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-plr-s.jpg",
    "rightImage": "w5-plr-es.jpg",
    "leftLabel": "一般加 -s · books",
    "rightLabel": "-es · boxes/babies",
    "leftSentence": "I have three books in my bag.",
    "leftZh": "我包里有三本书。",
    "rightSentence": "There are two babies in the room.",
    "rightZh": "房间里有两个婴儿。",
    "morphBase": "library",
    "morphPast": "libraries",
    "morphHighlight": "ies",
    "discovery": "一般加 -s；以 s/x/ch/sh 加 -es；辅音+y 变 ies；元音+y 直接加 -s。"
  },
  {
    "section": "精讲",
    "title": "例句 · libraries",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-plr-hero.jpg",
    "lead": "library：辅音 r + y → libraries。",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · boxes",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-plr-hero.jpg",
    "lead": "x 结尾加 es。",
    "sentence": "Put the books into the boxes.",
    "zh": "把书放进箱子里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-plr-hero.jpg",
    "lead": "规则复数三条主线。",
    "rules": [
      {
        "tab": "-s / -es",
        "rule": "一般加 -s；以 s/x/ch/sh 结尾加 -es",
        "focusVerb": "-s",
        "examples": [
          {
            "from": "book",
            "to": "books"
          },
          {
            "from": "box",
            "to": "boxes"
          }
        ],
        "sample": "There are two libraries in our school.",
        "sampleZh": "我们学校有两个图书馆。"
      },
      {
        "tab": "y→ies",
        "rule": "辅音 + y → 变 y 为 i 加 -es；元音 + y 直接加 -s",
        "focusVerb": "ies",
        "examples": [
          {
            "from": "library",
            "to": "libraries"
          },
          {
            "from": "baby",
            "to": "babies"
          }
        ],
        "sample": "The babies are sleeping in the room.",
        "sampleZh": "婴儿们在房间里睡觉。"
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
    "image": "w5-plr-hero.jpg",
    "buckets": [
      {
        "key": "s",
        "label": "加 -s"
      },
      {
        "key": "es",
        "label": "加 -es / y→ies"
      }
    ],
    "items": [
      {
        "text": "books",
        "bucket": "s"
      },
      {
        "text": "boxes",
        "bucket": "es"
      },
      {
        "text": "libraries",
        "bucket": "es"
      },
      {
        "text": "boys",
        "bucket": "s"
      },
      {
        "text": "babies",
        "bucket": "es"
      },
      {
        "text": "desks",
        "bucket": "s"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-plr-hero.jpg",
    "question": "「There are many librarys in the city.」应改成？",
    "choices": [
      {
        "text": "libraries（y→ies）",
        "correct": true,
        "fb": "辅音+y 变 ies。"
      },
      {
        "text": "libraryes",
        "correct": false,
        "fb": "不是加 es 那么简单。"
      },
      {
        "text": "library",
        "correct": false,
        "fb": "many 要复数。"
      }
    ],
    "sentence": "There are many libraries in the city.",
    "zh": "这座城市有许多图书馆。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-plr-hero.jpg",
    "lead": "单数变复数。",
    "items": [
      {
        "from": "I have one toy.",
        "fromZh": "我有一个玩具。",
        "steps": [
          {
            "label": "两个玩具（元音+y 只加 s）",
            "opts": [
              "I have two toys.",
              "I have two toies.",
              "I have two toyes."
            ],
            "ans": 0,
            "hint": "toy：元音+y 加 s。",
            "sentence": "I have two toys.",
            "zh": "我有两个玩具。"
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
    "image": "w5-plr-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "There",
      "are",
      "two",
      "libraries",
      "in",
      "our",
      "school"
    ],
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-plr-hero.jpg",
    "audio": "There are two libraries in our school.",
    "tokens": [
      "There",
      "are",
      "two",
      "libraries",
      "in",
      "our",
      "school"
    ],
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-plr-hero.jpg",
    "q": "There are many _____ in the city.",
    "opts": [
      "library",
      "librarys",
      "libraries"
    ],
    "ans": 2,
    "hint": "辅音 + y 结尾变 ies。",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-plr-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "There are many _____ in the city.",
        "opts": [
          "library",
          "librarys",
          "libraries"
        ],
        "ans": 2,
        "hint": "辅音 + y 结尾变 ies。",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "She has three _____. (watch)",
        "opts": [
          "watchs",
          "watches",
          "watch"
        ],
        "ans": 1,
        "hint": "ch + es。",
        "sentence": "She has three watches.",
        "zh": "她有三块手表。"
      },
      {
        "q": "There are two _____ on the table. (tomato)",
        "opts": [
          "tomatos",
          "tomatoes",
          "tomato"
        ],
        "ans": 1,
        "hint": "tomato + es。",
        "sentence": "There are two tomatoes on the table.",
        "zh": "桌上有两个番茄。"
      },
      {
        "q": "The _____ are crying. (baby)",
        "opts": [
          "babys",
          "babies",
          "babyes"
        ],
        "ans": 1,
        "hint": "baby → babies。",
        "sentence": "The babies are crying.",
        "zh": "婴儿们在哭。"
      },
      {
        "q": "I need two _____. (knife)",
        "opts": [
          "knifes",
          "knives",
          "knive"
        ],
        "ans": 1,
        "hint": "f/fe → ves。",
        "sentence": "I need two knives.",
        "zh": "我需要两把刀。"
      },
      {
        "q": "He bought some _____. (photo)",
        "opts": [
          "photoes",
          "photos",
          "photo"
        ],
        "ans": 1,
        "hint": "photo 只加 s。",
        "sentence": "He bought some photos.",
        "zh": "他买了一些照片。"
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
        "q": "There are many _____ in the city.",
        "opts": [
          "library",
          "librarys",
          "libraries"
        ],
        "ans": 2,
        "hint": "辅音 + y 结尾变 ies。",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "She has three _____. (watch)",
        "opts": [
          "watchs",
          "watches",
          "watch"
        ],
        "ans": 1,
        "hint": "ch + es。",
        "sentence": "She has three watches.",
        "zh": "她有三块手表。"
      },
      {
        "q": "There are two _____ on the table. (tomato)",
        "opts": [
          "tomatos",
          "tomatoes",
          "tomato"
        ],
        "ans": 1,
        "hint": "tomato + es。",
        "sentence": "There are two tomatoes on the table.",
        "zh": "桌上有两个番茄。"
      },
      {
        "q": "The _____ are crying. (baby)",
        "opts": [
          "babys",
          "babies",
          "babyes"
        ],
        "ans": 1,
        "hint": "baby → babies。",
        "sentence": "The babies are crying.",
        "zh": "婴儿们在哭。"
      },
      {
        "q": "I need two _____. (knife)",
        "opts": [
          "knifes",
          "knives",
          "knive"
        ],
        "ans": 1,
        "hint": "f/fe → ves。",
        "sentence": "I need two knives.",
        "zh": "我需要两把刀。"
      },
      {
        "q": "He bought some _____. (photo)",
        "opts": [
          "photoes",
          "photos",
          "photo"
        ],
        "ans": 1,
        "hint": "photo 只加 s。",
        "sentence": "He bought some photos.",
        "zh": "他买了一些照片。"
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
        "q": "There are many _____ in the city.",
        "opts": [
          "library",
          "librarys",
          "libraries"
        ],
        "ans": 2,
        "hint": "辅音 + y 结尾变 ies。",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "She has three _____. (watch)",
        "opts": [
          "watchs",
          "watches",
          "watch"
        ],
        "ans": 1,
        "hint": "ch + es。",
        "sentence": "She has three watches.",
        "zh": "她有三块手表。"
      },
      {
        "q": "There are two _____ on the table. (tomato)",
        "opts": [
          "tomatos",
          "tomatoes",
          "tomato"
        ],
        "ans": 1,
        "hint": "tomato + es。",
        "sentence": "There are two tomatoes on the table.",
        "zh": "桌上有两个番茄。"
      },
      {
        "q": "The _____ are crying. (baby)",
        "opts": [
          "babys",
          "babies",
          "babyes"
        ],
        "ans": 1,
        "hint": "baby → babies。",
        "sentence": "The babies are crying.",
        "zh": "婴儿们在哭。"
      },
      {
        "q": "I need two _____. (knife)",
        "opts": [
          "knifes",
          "knives",
          "knive"
        ],
        "ans": 1,
        "hint": "f/fe → ves。",
        "sentence": "I need two knives.",
        "zh": "我需要两把刀。"
      },
      {
        "q": "He bought some _____. (photo)",
        "opts": [
          "photoes",
          "photos",
          "photo"
        ],
        "ans": 1,
        "hint": "photo 只加 s。",
        "sentence": "He bought some photos.",
        "zh": "他买了一些照片。"
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
    "image": "w5-plr-hero.jpg",
    "pairs": [
      {
        "en": "books",
        "zh": "书（+s）"
      },
      {
        "en": "boxes",
        "zh": "箱子（+es）"
      },
      {
        "en": "libraries",
        "zh": "图书馆（ies）"
      },
      {
        "en": "knives",
        "zh": "刀（ves）"
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
    "image": "w5-plr-hero.jpg",
    "audio": "There are two libraries in our school.",
    "opts": [
      "There are two libraries in our school.",
      "There are two librarys in our school.",
      "There are two library in our school."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。",
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
      "一般名词加 -s",
      "s/x/ch/sh 加 -es",
      "辅音+y 变 ies；元音+y 加 -s",
      "photo/piano/radio 只加 s；tomato/potato/hero 加 es。"
    ],
    "chant": "Add -s for most, that's the rule! -es for s, x, ch, sh — stay in school!",
    "chantSpeak": "Add s for most, that is the rule! es for s, x, ch, sh, stay in school!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "名词规则复数",
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