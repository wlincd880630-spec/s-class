(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 购物中心",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "There are so many people in the shopping centre.",
    "soundHint": "这句话在描述什么？人在哪里？",
    "question": "这是在说「某地有某物/某人」吗？",
    "sentence": "There are so many people in the shopping centre.",
    "zh": "购物中心里有这么多人。",
    "image": "l07-shopping-crowd.jpg",
    "source": "PSLE Set 01 · 完形"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · is 还是 are？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l07-shopping-crowd.jpg",
    "question": "为什么 people 前面用 are 而不是 is？",
    "choices": [
      {
        "text": "因为 people 是复数意义",
        "correct": true,
        "fb": "对了！people 表「人们」，谓语用 are。"
      },
      {
        "text": "因为 shopping centre 是复数",
        "correct": false,
        "fb": "shopping centre 是单数，但 there be 看后面紧跟的名词。"
      },
      {
        "text": "因为 many 后面永远用 are",
        "correct": false,
        "fb": "关键看 many people 是复数。"
      }
    ],
    "sentence": "There are so many people in the shopping centre.",
    "zh": "购物中心里有这么多人。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l07-shopping-crowd.jpg",
    "lead": "There be 用来表示「某地有某物」，不是「某人拥有」。",
    "formula": "There is / are + 名词 + 地点",
    "parts": [
      {
        "mark": "There",
        "label": "引导词",
        "example": "There"
      },
      {
        "mark": "is/are",
        "label": "就近一致",
        "example": "is a book / are two books"
      },
      {
        "mark": "地点",
        "label": "在哪里",
        "example": "on the desk"
      }
    ],
    "samples": [
      {
        "sentence": "There is a new library near our school.",
        "zh": "我们学校附近有一座新图书馆。"
      },
      {
        "sentence": "There are so many people in the shopping centre.",
        "zh": "购物中心里有好多人。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · There is vs There are",
    "type": "discover",
    "lead": "点击卡片听例句，发现 is 和 are 怎么选。",
    "leftImage": "l07-one-book.jpg",
    "rightImage": "l07-two-books.jpg",
    "leftLabel": "There is（单数/不可数）",
    "rightLabel": "There are（复数）",
    "leftSentence": "There is a book on the desk.",
    "leftZh": "桌上有一本书。",
    "rightSentence": "There are two books on the desk.",
    "rightZh": "桌上有两本书。",
    "morphBase": "is",
    "morphPast": "are",
    "morphHighlight": "are",
    "discovery": "There be 看后面名词：单数/不可数用 is；复数用 are。"
  },
  {
    "section": "精讲",
    "title": "例句 · 单数用 is",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l07-shopping-crowd.jpg",
    "lead": "a new library 是单数 → There is。",
    "sentence": "There is a new library near our school.",
    "zh": "我们学校附近有一座新图书馆。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 复数用 are",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l07-shopping-crowd.jpg",
    "lead": "so many people 是复数 → There are。",
    "sentence": "There are so many people in the shopping centre.",
    "zh": "购物中心里有好多人。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡 · There be 句型",
    "type": "spelling",
    "image": "l07-rules.jpg",
    "lead": "描述存在：There + be + 名词 + 地点。",
    "rules": [
      {
        "tab": "肯定句",
        "rule": "There is + 单数/不可数；There are + 复数",
        "focusVerb": "There are",
        "examples": [
          {
            "from": "a cat",
            "to": "There is a cat"
          },
          {
            "from": "three cats",
            "to": "There are three cats"
          }
        ],
        "sample": "There are two books on the desk.",
        "sampleZh": "桌上有两本书。"
      },
      {
        "tab": "否定/疑问",
        "rule": "There isn't / There aren't；Is there…? Are there…?",
        "focusVerb": "There isn't",
        "examples": [
          {
            "from": "肯定",
            "to": "There is some water"
          },
          {
            "from": "否定",
            "to": "There isn't any water"
          }
        ],
        "sample": "There isn't any water in the bottle.",
        "sampleZh": "瓶子里没有水。"
      }
    ]
  },
  {
    "id": "p08",
    "section": "辨析",
    "title": "配对 · is 还是 are？",
    "type": "be-match",
    "badge": "demo",
    "badgeText": "🔗 配对",
    "image": "l07-be-chart.jpg",
    "chart": [
      {
        "subjects": "a book / some milk / a cat",
        "be": "There is"
      },
      {
        "subjects": "two books / many people / three dogs",
        "be": "There are"
      }
    ],
    "beOpts": [
      "There is",
      "There are"
    ],
    "drill": [
      {
        "sentence": "_____ a new library near our school.",
        "answer": "There is",
        "zh": "我们学校附近有一座新图书馆。"
      },
      {
        "sentence": "_____ so many people in the mall.",
        "answer": "There are",
        "zh": "商场里有这么多人。"
      },
      {
        "sentence": "_____ some milk in the fridge.",
        "answer": "There is",
        "zh": "冰箱里有一些牛奶。"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l07-shopping-crowd.jpg",
    "question": "「There have many books on the desk.」错在哪？",
    "choices": [
      {
        "text": "存在句用 There is/are，不用 have",
        "correct": true,
        "fb": "对了！have 表示「某人拥有」，存在用 There be。"
      },
      {
        "text": "desk 要改成 desks",
        "correct": false,
        "fb": "地点名词不一定变复数。"
      },
      {
        "text": "many 要改成 much",
        "correct": false,
        "fb": "books 可数，many 是对的。"
      }
    ],
    "sentence": "There are many books on the desk.",
    "zh": "桌子上有许多书。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l07-shopping-crowd.jpg",
    "lead": "There be：否定加 not，疑问把 is/are 提前。",
    "items": [
      {
        "from": "There is a park near my home.",
        "fromZh": "我家附近有一个公园。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "There isn't a park near my home.",
              "There not is a park near my home.",
              "There doesn't a park near my home."
            ],
            "ans": 0,
            "hint": "is not / isn't。",
            "sentence": "There isn't a park near my home.",
            "zh": "我家附近没有公园。"
          },
          {
            "label": "改成一般疑问句",
            "opts": [
              "Is there a park near your home?",
              "Does there a park near your home?",
              "There is a park near your home?"
            ],
            "ans": 0,
            "hint": "把 is 提前：Is there…?。",
            "sentence": "Is there a park near your home?",
            "zh": "你家附近有公园吗？"
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
    "image": "l07-shopping-crowd.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "There",
      "is",
      "a",
      "new",
      "library",
      "near",
      "our",
      "school"
    ],
    "sentence": "There is a new library near our school.",
    "zh": "我们学校附近有一座新图书馆。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · There be 句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l07-library.jpg",
    "audio": "There is a new library near our school.",
    "tokens": [
      "There",
      "is",
      "a",
      "new",
      "library",
      "near",
      "our",
      "school"
    ],
    "sentence": "There is a new library near our school.",
    "zh": "我们学校附近有一座新图书馆。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l07-shopping-crowd.jpg",
    "q": "There _____ so many people in the shopping centre.",
    "opts": [
      "is",
      "are",
      "be"
    ],
    "ans": 1,
    "hint": "many people 是复数，用 There are。",
    "sentence": "There are so many people in the shopping centre.",
    "zh": "购物中心里有这么多人。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l07-shopping-crowd.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "There _____ so many people in the shopping centre.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "many people 是复数，用 There are。",
        "sentence": "There are so many people in the shopping centre.",
        "zh": "购物中心里有这么多人。"
      },
      {
        "q": "There _____ a cat and two dogs in the garden. （就近）",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 0,
        "hint": "靠近 be 的是 a cat（单数）→ is。",
        "sentence": "There is a cat and two dogs in the garden.",
        "zh": "花园里有一只猫和两只狗。"
      },
      {
        "q": "_____ there any milk in the fridge?",
        "opts": [
          "Is",
          "Are",
          "Do"
        ],
        "ans": 0,
        "hint": "milk 不可数 → Is there。",
        "sentence": "Is there any milk in the fridge?",
        "zh": "冰箱里有牛奶吗？"
      },
      {
        "q": "There _____ any students in the classroom.",
        "opts": [
          "isn't",
          "aren't",
          "don't"
        ],
        "ans": 1,
        "hint": "students 复数 → aren't。",
        "sentence": "There aren't any students in the classroom.",
        "zh": "教室里没有学生。"
      },
      {
        "q": "There is _____ orange on the plate.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "orange 以元音音素开头 → an。",
        "sentence": "There is an orange on the plate.",
        "zh": "盘子上有一个橙子。"
      },
      {
        "q": "_____ a lot of rain in Chengdu in summer.",
        "opts": [
          "It has",
          "There is",
          "There are"
        ],
        "ans": 1,
        "hint": "rain 不可数，存在句 There is。",
        "sentence": "There is a lot of rain in Chengdu in summer.",
        "zh": "成都夏天雨水很多。"
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
        "q": "There _____ so many people in the shopping centre.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "many people 是复数，用 There are。",
        "sentence": "There are so many people in the shopping centre.",
        "zh": "购物中心里有这么多人。"
      },
      {
        "q": "There _____ a cat and two dogs in the garden. （就近）",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 0,
        "hint": "靠近 be 的是 a cat（单数）→ is。",
        "sentence": "There is a cat and two dogs in the garden.",
        "zh": "花园里有一只猫和两只狗。"
      },
      {
        "q": "_____ there any milk in the fridge?",
        "opts": [
          "Is",
          "Are",
          "Do"
        ],
        "ans": 0,
        "hint": "milk 不可数 → Is there。",
        "sentence": "Is there any milk in the fridge?",
        "zh": "冰箱里有牛奶吗？"
      },
      {
        "q": "There _____ any students in the classroom.",
        "opts": [
          "isn't",
          "aren't",
          "don't"
        ],
        "ans": 1,
        "hint": "students 复数 → aren't。",
        "sentence": "There aren't any students in the classroom.",
        "zh": "教室里没有学生。"
      },
      {
        "q": "There is _____ orange on the plate.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "orange 以元音音素开头 → an。",
        "sentence": "There is an orange on the plate.",
        "zh": "盘子上有一个橙子。"
      },
      {
        "q": "_____ a lot of rain in Chengdu in summer.",
        "opts": [
          "It has",
          "There is",
          "There are"
        ],
        "ans": 1,
        "hint": "rain 不可数，存在句 There is。",
        "sentence": "There is a lot of rain in Chengdu in summer.",
        "zh": "成都夏天雨水很多。"
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
        "q": "There _____ so many people in the shopping centre.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "many people 是复数，用 There are。",
        "sentence": "There are so many people in the shopping centre.",
        "zh": "购物中心里有这么多人。"
      },
      {
        "q": "There _____ a cat and two dogs in the garden. （就近）",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 0,
        "hint": "靠近 be 的是 a cat（单数）→ is。",
        "sentence": "There is a cat and two dogs in the garden.",
        "zh": "花园里有一只猫和两只狗。"
      },
      {
        "q": "_____ there any milk in the fridge?",
        "opts": [
          "Is",
          "Are",
          "Do"
        ],
        "ans": 0,
        "hint": "milk 不可数 → Is there。",
        "sentence": "Is there any milk in the fridge?",
        "zh": "冰箱里有牛奶吗？"
      },
      {
        "q": "There _____ any students in the classroom.",
        "opts": [
          "isn't",
          "aren't",
          "don't"
        ],
        "ans": 1,
        "hint": "students 复数 → aren't。",
        "sentence": "There aren't any students in the classroom.",
        "zh": "教室里没有学生。"
      },
      {
        "q": "There is _____ orange on the plate.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "orange 以元音音素开头 → an。",
        "sentence": "There is an orange on the plate.",
        "zh": "盘子上有一个橙子。"
      },
      {
        "q": "_____ a lot of rain in Chengdu in summer.",
        "opts": [
          "It has",
          "There is",
          "There are"
        ],
        "ans": 1,
        "hint": "rain 不可数，存在句 There is。",
        "sentence": "There is a lot of rain in Chengdu in summer.",
        "zh": "成都夏天雨水很多。"
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
    "image": "l07-shopping-crowd.jpg",
    "pairs": [
      {
        "en": "There is",
        "zh": "有（单数/不可数）"
      },
      {
        "en": "There are",
        "zh": "有（复数）"
      },
      {
        "en": "Is there…?",
        "zh": "有没有……？"
      },
      {
        "en": "There aren't any",
        "zh": "没有任何（复数）"
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
    "image": "l07-shopping-crowd.jpg",
    "audio": "There is a new library near our school.",
    "opts": [
      "There is a new library near our school.",
      "There have so many people in the shopping centre.",
      "There is so many people in the shopping centre."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "There is a new library near our school.",
    "zh": "我们学校附近有一座新图书馆。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "l07-writing.jpg",
    "checklist": [
      "描述存在：There is/are + 名词 + 地点状语",
      "单数/不可数 → is；复数 → are",
      "写作：There is a park near my home. There are many trees in it.",
      "否定：There isn't any… / There aren't any…",
      "不要写成 There have。",
      "就近原则：There is a book and two pens."
    ],
    "chant": "There is, there are — place has something! Singular is, plural are — easy!",
    "chantSpeak": "There is, there are, place has something! Singular is, plural are, easy!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "There be 句型",
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