(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 两座图书馆",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "There are two libraries in our school.",
    "soundHint": "two 后面名词是什么形式？",
    "question": "library 的复数怎么写？",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。",
    "image": "l06-libraries.jpg",
    "source": "PSLE Set 16 · 真题"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 什么时候用复数？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l06-libraries.jpg",
    "question": "「two libraries」为什么用 libraries 而不是 librarys？",
    "choices": [
      {
        "text": "因为 two 后面永远加 s",
        "correct": false,
        "fb": "要看名词结尾字母，辅音+y 要变 y 为 i 再加 es。"
      },
      {
        "text": "library 以辅音+y 结尾，变 y 为 i 加 es",
        "correct": true,
        "fb": "对了！library → libraries。"
      },
      {
        "text": "library 是不可数名词",
        "correct": false,
        "fb": "library 可数，有单复数。"
      }
    ],
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l06-libraries.jpg",
    "lead": "可数名词表示两个及以上时要用复数。不规则复数必须单独记。",
    "formula": "1 child → 2 children　（不是 childs）",
    "parts": [
      {
        "mark": "规则",
        "label": "+s / +es / y→ies",
        "example": "books / boxes / libraries"
      },
      {
        "mark": "不规则",
        "label": "改变元音或词形",
        "example": "man→men, foot→feet"
      }
    ],
    "samples": [
      {
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两座图书馆。"
      },
      {
        "sentence": "Three children played in the park.",
        "zh": "三个孩子在公园里玩。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · 规则 vs 不规则",
    "type": "discover",
    "lead": "有的名词加 -s，有的要整个变化。",
    "leftImage": "l06-book-books.jpg",
    "rightImage": "l06-child-children.jpg",
    "leftLabel": "book → books（规则）",
    "rightLabel": "child → children（不规则）",
    "leftSentence": "I have two books.",
    "leftZh": "我有两本书。",
    "rightSentence": "Three children are playing.",
    "rightZh": "三个孩子在玩。",
    "morphBase": "child",
    "morphPast": "children",
    "morphHighlight": "ren",
    "discovery": "大多数名词加 -s/-es；少数名词复数形式特殊，要单独记忆。"
  },
  {
    "section": "精讲",
    "title": "例句 · 图书馆",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l06-libraries.jpg",
    "lead": "library → libraries（辅音 + y 变 ies）。",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 脚很累",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l06-libraries.jpg",
    "lead": "foot → feet，不是 foots。",
    "sentence": "My feet are tired after the long walk.",
    "zh": "走了很长的路，我的脚很累。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "拼写规则卡 · 复数变化",
    "type": "spelling",
    "image": "l06-spell-rules.jpg",
    "lead": "小升初常考三类规则 + 高频不规则。",
    "rules": [
      {
        "tab": "规则 +s/es",
        "rule": "一般加 -s；s/x/ch/sh 加 -es；辅音+y 变 i 加 es",
        "focusVerb": "libraries",
        "examples": [
          {
            "from": "book",
            "to": "books"
          },
          {
            "from": "box",
            "to": "boxes"
          },
          {
            "from": "library",
            "to": "libraries"
          }
        ],
        "sample": "There are two libraries in our school.",
        "sampleZh": "我们学校有两座图书馆。"
      },
      {
        "tab": "不规则",
        "rule": "高频不规则：整词变化，需背诵",
        "focusVerb": "children",
        "examples": [
          {
            "from": "child",
            "to": "children"
          },
          {
            "from": "foot",
            "to": "feet"
          },
          {
            "from": "mouse",
            "to": "mice"
          },
          {
            "from": "tooth",
            "to": "teeth"
          },
          {
            "from": "man",
            "to": "men"
          }
        ],
        "sample": "Three children are playing in the park.",
        "sampleZh": "三个孩子在公园玩。"
      }
    ]
  },
  {
    "id": "p08",
    "section": "辨析",
    "title": "分类篮 · 规则还是不规则？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l06-classify.jpg",
    "lead": "这些复数形式是规则变化还是不规则变化？",
    "buckets": [
      {
        "key": "regular",
        "label": "规则复数 (+s/es)"
      },
      {
        "key": "irregular",
        "label": "不规则复数"
      }
    ],
    "items": [
      {
        "text": "books",
        "bucket": "regular"
      },
      {
        "text": "children",
        "bucket": "irregular"
      },
      {
        "text": "libraries",
        "bucket": "regular"
      },
      {
        "text": "feet",
        "bucket": "irregular"
      },
      {
        "text": "boxes",
        "bucket": "regular"
      },
      {
        "text": "mice",
        "bucket": "irregular"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l06-libraries.jpg",
    "question": "「There are many childs in the playground.」应改成？",
    "choices": [
      {
        "text": "children",
        "correct": true,
        "fb": "child 的复数是 children。"
      },
      {
        "text": "childes",
        "correct": false,
        "fb": "没有 childes 这种形式。"
      },
      {
        "text": "child",
        "correct": false,
        "fb": "many 后面要用复数。"
      }
    ],
    "sentence": "There are many children in the playground.",
    "zh": "操场上有许多孩子。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l06-libraries.jpg",
    "lead": "把单数名词改成复数，注意不规则变化。",
    "items": [
      {
        "from": "I have one mouse.",
        "fromZh": "我有一只老鼠。",
        "steps": [
          {
            "label": "改成两只老鼠",
            "opts": [
              "I have two mice.",
              "I have two mouses.",
              "I have two mouse."
            ],
            "ans": 0,
            "hint": "mouse → mice。",
            "sentence": "I have two mice.",
            "zh": "我有两只老鼠。"
          }
        ]
      },
      {
        "from": "This man is a teacher.",
        "fromZh": "这个男人是老师。",
        "steps": [
          {
            "label": "改成这些男人是老师",
            "opts": [
              "These men are teachers.",
              "These mans are teachers.",
              "These man are teachers."
            ],
            "ans": 0,
            "hint": "man → men。",
            "sentence": "These men are teachers.",
            "zh": "这些男人是老师。"
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
    "image": "l06-libraries.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "My",
      "feet",
      "are",
      "tired",
      "after",
      "the",
      "long",
      "walk"
    ],
    "sentence": "My feet are tired after the long walk.",
    "zh": "长途步行后我的脚累了。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 不规则复数句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l06-feet-tired.jpg",
    "audio": "My feet are tired after the long walk.",
    "tokens": [
      "My",
      "feet",
      "are",
      "tired",
      "after",
      "the",
      "long",
      "walk"
    ],
    "sentence": "My feet are tired after the long walk.",
    "zh": "长途步行后我的脚累了。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l06-libraries.jpg",
    "q": "There are two _____ in our school. (library)",
    "opts": [
      "library",
      "libraries",
      "librarys"
    ],
    "ans": 1,
    "hint": "two + 复数；辅音+y 变 i 加 es。",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l06-libraries.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "There are two _____ in our school. (library)",
        "opts": [
          "library",
          "libraries",
          "librarys"
        ],
        "ans": 1,
        "hint": "two + 复数；辅音+y 变 i 加 es。",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两座图书馆。"
      },
      {
        "q": "Two _____ are under the desk. (foot)",
        "opts": [
          "foot",
          "foots",
          "feet"
        ],
        "ans": 2,
        "hint": "foot → feet。",
        "sentence": "Two feet are under the desk.",
        "zh": "两只脚在桌子下面。"
      },
      {
        "q": "The _____ are playing football. (child)",
        "opts": [
          "child",
          "children",
          "childs"
        ],
        "ans": 1,
        "hint": "child → children。",
        "sentence": "The children are playing football.",
        "zh": "孩子们在踢足球。"
      },
      {
        "q": "I saw three _____ in the kitchen. (mouse)",
        "opts": [
          "mouse",
          "mouses",
          "mice"
        ],
        "ans": 2,
        "hint": "mouse → mice。",
        "sentence": "I saw three mice in the kitchen.",
        "zh": "我在厨房看到三只老鼠。"
      },
      {
        "q": "Those _____ are doctors. (woman)",
        "opts": [
          "woman",
          "womans",
          "women"
        ],
        "ans": 2,
        "hint": "woman → women。",
        "sentence": "Those women are doctors.",
        "zh": "那些女士是医生。"
      },
      {
        "q": "There are many _____ on the farm. (sheep)",
        "opts": [
          "sheep",
          "sheeps",
          "sheepes"
        ],
        "ans": 0,
        "hint": "sheep 单复数同形。",
        "sentence": "There are many sheep on the farm.",
        "zh": "农场里有许多羊。"
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
        "q": "There are two _____ in our school. (library)",
        "opts": [
          "library",
          "libraries",
          "librarys"
        ],
        "ans": 1,
        "hint": "two + 复数；辅音+y 变 i 加 es。",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两座图书馆。"
      },
      {
        "q": "Two _____ are under the desk. (foot)",
        "opts": [
          "foot",
          "foots",
          "feet"
        ],
        "ans": 2,
        "hint": "foot → feet。",
        "sentence": "Two feet are under the desk.",
        "zh": "两只脚在桌子下面。"
      },
      {
        "q": "The _____ are playing football. (child)",
        "opts": [
          "child",
          "children",
          "childs"
        ],
        "ans": 1,
        "hint": "child → children。",
        "sentence": "The children are playing football.",
        "zh": "孩子们在踢足球。"
      },
      {
        "q": "I saw three _____ in the kitchen. (mouse)",
        "opts": [
          "mouse",
          "mouses",
          "mice"
        ],
        "ans": 2,
        "hint": "mouse → mice。",
        "sentence": "I saw three mice in the kitchen.",
        "zh": "我在厨房看到三只老鼠。"
      },
      {
        "q": "Those _____ are doctors. (woman)",
        "opts": [
          "woman",
          "womans",
          "women"
        ],
        "ans": 2,
        "hint": "woman → women。",
        "sentence": "Those women are doctors.",
        "zh": "那些女士是医生。"
      },
      {
        "q": "There are many _____ on the farm. (sheep)",
        "opts": [
          "sheep",
          "sheeps",
          "sheepes"
        ],
        "ans": 0,
        "hint": "sheep 单复数同形。",
        "sentence": "There are many sheep on the farm.",
        "zh": "农场里有许多羊。"
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
        "q": "There are two _____ in our school. (library)",
        "opts": [
          "library",
          "libraries",
          "librarys"
        ],
        "ans": 1,
        "hint": "two + 复数；辅音+y 变 i 加 es。",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两座图书馆。"
      },
      {
        "q": "Two _____ are under the desk. (foot)",
        "opts": [
          "foot",
          "foots",
          "feet"
        ],
        "ans": 2,
        "hint": "foot → feet。",
        "sentence": "Two feet are under the desk.",
        "zh": "两只脚在桌子下面。"
      },
      {
        "q": "The _____ are playing football. (child)",
        "opts": [
          "child",
          "children",
          "childs"
        ],
        "ans": 1,
        "hint": "child → children。",
        "sentence": "The children are playing football.",
        "zh": "孩子们在踢足球。"
      },
      {
        "q": "I saw three _____ in the kitchen. (mouse)",
        "opts": [
          "mouse",
          "mouses",
          "mice"
        ],
        "ans": 2,
        "hint": "mouse → mice。",
        "sentence": "I saw three mice in the kitchen.",
        "zh": "我在厨房看到三只老鼠。"
      },
      {
        "q": "Those _____ are doctors. (woman)",
        "opts": [
          "woman",
          "womans",
          "women"
        ],
        "ans": 2,
        "hint": "woman → women。",
        "sentence": "Those women are doctors.",
        "zh": "那些女士是医生。"
      },
      {
        "q": "There are many _____ on the farm. (sheep)",
        "opts": [
          "sheep",
          "sheeps",
          "sheepes"
        ],
        "ans": 0,
        "hint": "sheep 单复数同形。",
        "sentence": "There are many sheep on the farm.",
        "zh": "农场里有许多羊。"
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
    "image": "l06-libraries.jpg",
    "pairs": [
      {
        "en": "children",
        "zh": "孩子们"
      },
      {
        "en": "feet",
        "zh": "脚（复数）"
      },
      {
        "en": "mice",
        "zh": "老鼠（复数）"
      },
      {
        "en": "libraries",
        "zh": "图书馆（复数）"
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
    "image": "l06-libraries.jpg",
    "audio": "My feet are tired after the long walk.",
    "opts": [
      "My feet are tired after the long walk.",
      "My foots are tired after the walk.",
      "My foot are tired after the long walk."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "My feet are tired after the long walk.",
    "zh": "长途步行后我的脚累了。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "l06-writing.jpg",
    "checklist": [
      "数词>1 或 some/many/two → 可数名词用复数",
      "规则：books, boxes, libraries（y→ies）",
      "不规则必背：child→children, foot→feet, mouse→mice, man→men",
      "写作：Three children played; their feet were tired.",
      "不规则必背：child→children, foot→feet, mouse→mice, man→men, sheep→sheep。"
    ],
    "chant": "More than one? Plural form! child-children, foot-feet — learn the storm!",
    "chantSpeak": "More than one, plural form! child children, foot feet, learn the storm!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "名词不规则复数",
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