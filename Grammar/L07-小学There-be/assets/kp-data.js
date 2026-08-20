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
    "section": "精讲",
    "title": "There is + 单数",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-piano.png",
    "lead": "当只有一个东西时，我们用 There is。",
    "sentence": "There is a piano in the music room.",
    "zh": "音乐教室里有一架钢琴。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "There are + 复数",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "当有多个东西时，我们用 There are。",
    "sentence": "There are many books in the library.",
    "zh": "图书馆里有很多书。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "就近一致",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-window.png",
    "lead": "当有多个并列名词时，be 动词跟着最近的名词变化。",
    "sentence": "There is a big window and two doors in the room.",
    "zh": "房间里有一扇大窗户和两扇门。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
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
    "id": "p11",
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
    "id": "p12"
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
      },
      {
        "from": "There is a book on the desk.",
        "fromZh": "桌子上有一本书。",
        "steps": [
          {
            "label": "改成复数",
            "opts": [
              "There are books on the desk.",
              "There is books on the desk.",
              "There have books on the desk."
            ],
            "ans": 0,
            "hint": "复数用are",
            "sentence": "There are books on the desk.",
            "zh": "桌子上有一些书。"
          }
        ]
      },
      {
        "from": "There are some apples on the table.",
        "fromZh": "桌子上有一些苹果。",
        "steps": [
          {
            "label": "改成单数",
            "opts": [
              "There is an apple on the table.",
              "There are an apple on the table.",
              "There is apple on the table."
            ],
            "ans": 0,
            "hint": "单数用is，且用an",
            "sentence": "There is an apple on the table.",
            "zh": "桌子上有一个苹果。"
          }
        ]
      },
      {
        "from": "There is a cat under the chair.",
        "fromZh": "椅子下面有一只猫。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "There is not a cat under the chair.",
              "There are not a cat under the chair.",
              "There is no cat under the chair."
            ],
            "ans": 0,
            "hint": "否定句在is后加not",
            "sentence": "There is not a cat under the chair.",
            "zh": "椅子下面没有猫。"
          }
        ]
      },
      {
        "from": "There are many stars in the sky.",
        "fromZh": "天空中有许多星星。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Are there many stars in the sky?",
              "Is there many stars in the sky?",
              "There are many stars in the sky?"
            ],
            "ans": 0,
            "hint": "复数疑问句用Are there",
            "sentence": "Are there many stars in the sky?",
            "zh": "天空中有许多星星吗？"
          }
        ]
      },
      {
        "from": "There is a piano in the music room.",
        "fromZh": "音乐教室里有一架钢琴。",
        "steps": [
          {
            "label": "改成一般疑问句",
            "opts": [
              "Is there a piano in the music room?",
              "Are there a piano in the music room?",
              "There is a piano in the music room?"
            ],
            "ans": 0,
            "hint": "单数疑问句用Is there",
            "sentence": "Is there a piano in the music room?",
            "zh": "音乐教室里有一架钢琴吗？"
          }
        ]
      },
      {
        "from": "There are two umbrellas near the door.",
        "fromZh": "门旁边有两把雨伞。",
        "steps": [
          {
            "label": "改成否定句",
            "opts": [
              "There are not two umbrellas near the door.",
              "There is not two umbrellas near the door.",
              "There are no two umbrellas near the door."
            ],
            "ans": 0,
            "hint": "复数否定用are not",
            "sentence": "There are not two umbrellas near the door.",
            "zh": "门旁边没有两把雨伞。"
          }
        ]
      }
    ],
    "id": "p13"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3d-library.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
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
    "zh": "我们学校附近有一个新图书馆。",
    "items": [
      {
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
        "zh": "我们学校附近有一个新图书馆。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "There",
          "are",
          "many",
          "people",
          "in",
          "the",
          "shopping",
          "centre"
        ],
        "sentence": "There are many people in the shopping centre.",
        "zh": "购物中心里有那么多人。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "There",
          "is",
          "a",
          "panda",
          "eating",
          "bamboo",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "There is a panda eating bamboo in the zoo.",
        "zh": "动物园里有一只熊猫在吃竹子。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "There",
          "are",
          "some",
          "apples",
          "on",
          "the",
          "table"
        ],
        "sentence": "There are some apples on the table.",
        "zh": "桌子上有一些苹果。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "There",
          "is",
          "a",
          "bus",
          "stop",
          "near",
          "my",
          "home"
        ],
        "sentence": "There is a bus stop near my home.",
        "zh": "我家附近有一个公交车站。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "There",
          "are",
          "five",
          "birds",
          "in",
          "the",
          "tree"
        ],
        "sentence": "There are five birds in the tree.",
        "zh": "树上有五只鸟。",
        "image": "kp3d-window.png"
      }
    ],
    "id": "p14"
  },
  {
    "id": "p15",
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
    "id": "p16",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "There _____ a book on the desk.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "单数名词用is",
        "sentence": "There is a book on the desk.",
        "zh": "桌子上有一本书。"
      },
      {
        "q": "There _____ two apples on the table.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "复数名词用are",
        "sentence": "There are two apples on the table.",
        "zh": "桌子上有两个苹果。"
      },
      {
        "q": "There _____ a cat under the chair.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "单数名词用is",
        "sentence": "There is a cat under the chair.",
        "zh": "椅子下面有一只猫。"
      },
      {
        "q": "There _____ many books in the library.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "many books 是复数",
        "sentence": "There are many books in the library.",
        "zh": "图书馆里有很多书。"
      },
      {
        "q": "There _____ a new library near our school.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a new library 单数",
        "sentence": "There is a new library near our school.",
        "zh": "我们学校附近有一个新图书馆。"
      },
      {
        "q": "There _____ a panda in the zoo.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a panda 单数",
        "sentence": "There is a panda in the zoo.",
        "zh": "动物园里有一只熊猫。"
      },
      {
        "q": "There _____ some milk in the glass.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "milk 不可数，用is",
        "sentence": "There is some milk in the glass.",
        "zh": "杯子里有一些牛奶。"
      },
      {
        "q": "There _____ five birds in the tree.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "five birds 复数",
        "sentence": "There are five birds in the tree.",
        "zh": "树上有五只鸟。"
      },
      {
        "q": "There _____ a piano in the music room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a piano 单数",
        "sentence": "There is a piano in the music room.",
        "zh": "音乐教室里有一架钢琴。"
      },
      {
        "q": "There _____ two umbrellas near the door.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "two umbrellas 复数",
        "sentence": "There are two umbrellas near the door.",
        "zh": "门旁边有两把雨伞。"
      }
    ],
    "id": "p17"
  },
  {
    "section": "检测",
    "title": "限时挑战 90 秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "lead": "题库已扩充：90 秒内尽量多答对。",
    "seconds": 90,
    "perQuestion": 12,
    "pass": 8,
    "pool": "questions",
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
      },
      {
        "q": "There _____ a book on the desk.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "单数名词用is",
        "sentence": "There is a book on the desk.",
        "zh": "桌子上有一本书。"
      },
      {
        "q": "There _____ two apples on the table.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "复数名词用are",
        "sentence": "There are two apples on the table.",
        "zh": "桌子上有两个苹果。"
      },
      {
        "q": "There _____ a cat under the chair.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "单数名词用is",
        "sentence": "There is a cat under the chair.",
        "zh": "椅子下面有一只猫。"
      },
      {
        "q": "There _____ many books in the library.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "many books 是复数",
        "sentence": "There are many books in the library.",
        "zh": "图书馆里有很多书。"
      },
      {
        "q": "There _____ a new library near our school.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a new library 单数",
        "sentence": "There is a new library near our school.",
        "zh": "我们学校附近有一个新图书馆。"
      },
      {
        "q": "There _____ a panda in the zoo.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a panda 单数",
        "sentence": "There is a panda in the zoo.",
        "zh": "动物园里有一只熊猫。"
      },
      {
        "q": "There _____ some milk in the glass.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "milk 不可数，用is",
        "sentence": "There is some milk in the glass.",
        "zh": "杯子里有一些牛奶。"
      },
      {
        "q": "There _____ five birds in the tree.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "five birds 复数",
        "sentence": "There are five birds in the tree.",
        "zh": "树上有五只鸟。"
      },
      {
        "q": "There _____ a piano in the music room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a piano 单数",
        "sentence": "There is a piano in the music room.",
        "zh": "音乐教室里有一架钢琴。"
      },
      {
        "q": "There _____ two umbrellas near the door.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "two umbrellas 复数",
        "sentence": "There are two umbrellas near the door.",
        "zh": "门旁边有两把雨伞。"
      },
      {
        "q": "There _____ a doctor in the hospital.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a doctor 单数",
        "sentence": "There is a doctor in the hospital.",
        "zh": "医院里有一位医生。"
      },
      {
        "q": "There _____ many stars in the sky.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many stars 复数",
        "sentence": "There are many stars in the sky.",
        "zh": "天空中有许多星星。"
      },
      {
        "q": "There _____ a playground behind the school.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a playground 单数",
        "sentence": "There is a playground behind the school.",
        "zh": "学校后面有一个操场。"
      },
      {
        "q": "There _____ some children on the playground.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "children 是复数",
        "sentence": "There are some children on the playground.",
        "zh": "操场上有一些孩子。"
      },
      {
        "q": "There _____ a basketball under the desk.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a basketball 单数",
        "sentence": "There is a basketball under the desk.",
        "zh": "书桌下面有一个篮球。"
      },
      {
        "q": "There _____ three windows in the room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "three windows 复数",
        "sentence": "There are three windows in the room.",
        "zh": "房间里有三扇窗户。"
      },
      {
        "q": "There _____ a tall tree in front of the house.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a tall tree 单数",
        "sentence": "There is a tall tree in front of the house.",
        "zh": "房子前面有一棵高树。"
      },
      {
        "q": "There _____ many flowers in the garden.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many flowers 复数",
        "sentence": "There are many flowers in the garden.",
        "zh": "花园里有许多花。"
      },
      {
        "q": "There _____ a new bike in the yard.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a new bike 单数",
        "sentence": "There is a new bike in the yard.",
        "zh": "院子里有一辆新自行车。"
      },
      {
        "q": "There _____ two cats in the basket.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "two cats 复数",
        "sentence": "There are two cats in the basket.",
        "zh": "篮子里有两只猫。"
      },
      {
        "q": "There _____ a hot pot restaurant near the park.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a hot pot restaurant 单数",
        "sentence": "There is a hot pot restaurant near the park.",
        "zh": "公园附近有一家火锅店。"
      },
      {
        "q": "There _____ some pandas in Chengdu.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "some pandas 复数",
        "sentence": "There are some pandas in Chengdu.",
        "zh": "成都有一些熊猫。"
      },
      {
        "q": "_____ there any apples in the bag?",
        "opts": [
          "Is",
          "Are",
          "Am"
        ],
        "ans": 1,
        "hint": "any apples 复数，疑问句用Are",
        "sentence": "Are there any apples in the bag?",
        "zh": "包里有一些苹果吗？"
      },
      {
        "q": "_____ there a book on the shelf?",
        "opts": [
          "Is",
          "Are",
          "Am"
        ],
        "ans": 0,
        "hint": "a book 单数，疑问句用Is",
        "sentence": "Is there a book on the shelf?",
        "zh": "书架上有本书吗？"
      },
      {
        "q": "There _____ not any water in the bottle.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "water 不可数，用is",
        "sentence": "There is not any water in the bottle.",
        "zh": "瓶子里没有水。"
      },
      {
        "q": "There _____ not many students in the classroom.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many students 复数，用are",
        "sentence": "There are not many students in the classroom.",
        "zh": "教室里没有很多学生。"
      },
      {
        "q": "There _____ a big window and two doors in the room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，a big window 单数",
        "sentence": "There is a big window and two doors in the room.",
        "zh": "房间里有一扇大窗户和两扇门。"
      }
    ],
    "id": "p18"
  },
  {
    "section": "检测",
    "title": "连对闯关",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "lead": "连续答对 8 题通关，答错连击清零。题库已加厚。",
    "target": 8,
    "pool": "questions",
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
      },
      {
        "q": "There _____ a book on the desk.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "单数名词用is",
        "sentence": "There is a book on the desk.",
        "zh": "桌子上有一本书。"
      },
      {
        "q": "There _____ two apples on the table.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "复数名词用are",
        "sentence": "There are two apples on the table.",
        "zh": "桌子上有两个苹果。"
      },
      {
        "q": "There _____ a cat under the chair.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "单数名词用is",
        "sentence": "There is a cat under the chair.",
        "zh": "椅子下面有一只猫。"
      },
      {
        "q": "There _____ many books in the library.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "many books 是复数",
        "sentence": "There are many books in the library.",
        "zh": "图书馆里有很多书。"
      },
      {
        "q": "There _____ a new library near our school.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a new library 单数",
        "sentence": "There is a new library near our school.",
        "zh": "我们学校附近有一个新图书馆。"
      },
      {
        "q": "There _____ a panda in the zoo.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a panda 单数",
        "sentence": "There is a panda in the zoo.",
        "zh": "动物园里有一只熊猫。"
      },
      {
        "q": "There _____ some milk in the glass.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "milk 不可数，用is",
        "sentence": "There is some milk in the glass.",
        "zh": "杯子里有一些牛奶。"
      },
      {
        "q": "There _____ five birds in the tree.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "five birds 复数",
        "sentence": "There are five birds in the tree.",
        "zh": "树上有五只鸟。"
      },
      {
        "q": "There _____ a piano in the music room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a piano 单数",
        "sentence": "There is a piano in the music room.",
        "zh": "音乐教室里有一架钢琴。"
      },
      {
        "q": "There _____ two umbrellas near the door.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "two umbrellas 复数",
        "sentence": "There are two umbrellas near the door.",
        "zh": "门旁边有两把雨伞。"
      },
      {
        "q": "There _____ a doctor in the hospital.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a doctor 单数",
        "sentence": "There is a doctor in the hospital.",
        "zh": "医院里有一位医生。"
      },
      {
        "q": "There _____ many stars in the sky.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many stars 复数",
        "sentence": "There are many stars in the sky.",
        "zh": "天空中有许多星星。"
      },
      {
        "q": "There _____ a playground behind the school.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a playground 单数",
        "sentence": "There is a playground behind the school.",
        "zh": "学校后面有一个操场。"
      },
      {
        "q": "There _____ some children on the playground.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "children 是复数",
        "sentence": "There are some children on the playground.",
        "zh": "操场上有一些孩子。"
      },
      {
        "q": "There _____ a basketball under the desk.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a basketball 单数",
        "sentence": "There is a basketball under the desk.",
        "zh": "书桌下面有一个篮球。"
      },
      {
        "q": "There _____ three windows in the room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "three windows 复数",
        "sentence": "There are three windows in the room.",
        "zh": "房间里有三扇窗户。"
      },
      {
        "q": "There _____ a tall tree in front of the house.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a tall tree 单数",
        "sentence": "There is a tall tree in front of the house.",
        "zh": "房子前面有一棵高树。"
      },
      {
        "q": "There _____ many flowers in the garden.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many flowers 复数",
        "sentence": "There are many flowers in the garden.",
        "zh": "花园里有许多花。"
      },
      {
        "q": "There _____ a new bike in the yard.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a new bike 单数",
        "sentence": "There is a new bike in the yard.",
        "zh": "院子里有一辆新自行车。"
      },
      {
        "q": "There _____ two cats in the basket.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "two cats 复数",
        "sentence": "There are two cats in the basket.",
        "zh": "篮子里有两只猫。"
      },
      {
        "q": "There _____ a hot pot restaurant near the park.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a hot pot restaurant 单数",
        "sentence": "There is a hot pot restaurant near the park.",
        "zh": "公园附近有一家火锅店。"
      },
      {
        "q": "There _____ some pandas in Chengdu.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "some pandas 复数",
        "sentence": "There are some pandas in Chengdu.",
        "zh": "成都有一些熊猫。"
      },
      {
        "q": "_____ there any apples in the bag?",
        "opts": [
          "Is",
          "Are",
          "Am"
        ],
        "ans": 1,
        "hint": "any apples 复数，疑问句用Are",
        "sentence": "Are there any apples in the bag?",
        "zh": "包里有一些苹果吗？"
      },
      {
        "q": "_____ there a book on the shelf?",
        "opts": [
          "Is",
          "Are",
          "Am"
        ],
        "ans": 0,
        "hint": "a book 单数，疑问句用Is",
        "sentence": "Is there a book on the shelf?",
        "zh": "书架上有本书吗？"
      },
      {
        "q": "There _____ not any water in the bottle.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "water 不可数，用is",
        "sentence": "There is not any water in the bottle.",
        "zh": "瓶子里没有水。"
      },
      {
        "q": "There _____ not many students in the classroom.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many students 复数，用are",
        "sentence": "There are not many students in the classroom.",
        "zh": "教室里没有很多学生。"
      },
      {
        "q": "There _____ a big window and two doors in the room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，a big window 单数",
        "sentence": "There is a big window and two doors in the room.",
        "zh": "房间里有一扇大窗户和两扇门。"
      }
    ],
    "id": "p19"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "l07-shopping-crowd.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "a new library",
        "zh": "一个新图书馆"
      },
      {
        "en": "many people",
        "zh": "许多人"
      },
      {
        "en": "some milk",
        "zh": "一些牛奶"
      },
      {
        "en": "a hot pot restaurant",
        "zh": "一家火锅店"
      },
      {
        "en": "under the chair",
        "zh": "在椅子下面"
      },
      {
        "en": "in the tree",
        "zh": "在树上"
      },
      {
        "en": "near the park",
        "zh": "在公园附近"
      },
      {
        "en": "on the playground",
        "zh": "在操场上"
      },
      {
        "en": "in front of the house",
        "zh": "在房子前面"
      },
      {
        "en": "behind the school",
        "zh": "在学校后面"
      }
    ],
    "id": "p20"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l07-shopping-crowd.jpg",
    "audio": "There is a cat under the chair.",
    "opts": [
      "There is a cat under the chair.",
      "There are cats under the chair.",
      "There is a cat on the chair."
    ],
    "ans": 0,
    "hint": "注意单数和介词",
    "sentence": "There is a cat under the chair.",
    "zh": "椅子下面有一只猫。",
    "questions": [
      {
        "audio": "There is a cat under the chair.",
        "opts": [
          "There is a cat under the chair.",
          "There are cats under the chair.",
          "There is a cat on the chair."
        ],
        "ans": 0,
        "hint": "注意单数和介词",
        "zh": "椅子下面有一只猫。",
        "sentence": "There is a cat under the chair."
      },
      {
        "audio": "There are two apples on the table.",
        "opts": [
          "There are two apples on the table.",
          "There is an apple on the table.",
          "There are two apples under the table."
        ],
        "ans": 0,
        "hint": "注意数量和位置",
        "zh": "桌子上有两个苹果。",
        "sentence": "There are two apples on the table."
      },
      {
        "audio": "There is a new library near our school.",
        "opts": [
          "There is a new library near our school.",
          "There are new libraries near our school.",
          "There is a new library in our school."
        ],
        "ans": 0,
        "hint": "注意单复数和介词",
        "zh": "我们学校附近有一个新图书馆。",
        "sentence": "There is a new library near our school."
      },
      {
        "audio": "There are many people in the shopping centre.",
        "opts": [
          "There are many people in the shopping centre.",
          "There is a person in the shopping centre.",
          "There are many people near the shopping centre."
        ],
        "ans": 0,
        "hint": "注意地点",
        "zh": "购物中心里有那么多人。",
        "sentence": "There are many people in the shopping centre."
      },
      {
        "audio": "There is a panda in the zoo.",
        "opts": [
          "There is a panda in the zoo.",
          "There are pandas in the zoo.",
          "There is a panda near the zoo."
        ],
        "ans": 0,
        "hint": "注意单数和地点",
        "zh": "动物园里有一只熊猫。",
        "sentence": "There is a panda in the zoo."
      },
      {
        "audio": "There are some books on the shelf.",
        "opts": [
          "There are some books on the shelf.",
          "There is a book on the shelf.",
          "There are some books under the shelf."
        ],
        "ans": 0,
        "hint": "注意复数",
        "zh": "书架上有一些书。",
        "sentence": "There are some books on the shelf."
      },
      {
        "audio": "There is a doctor in the hospital.",
        "opts": [
          "There is a doctor in the hospital.",
          "There are doctors in the hospital.",
          "There is a doctor near the hospital."
        ],
        "ans": 0,
        "hint": "注意单数和地点",
        "zh": "医院里有一位医生。",
        "sentence": "There is a doctor in the hospital."
      },
      {
        "audio": "There are two umbrellas near the door.",
        "opts": [
          "There are two umbrellas near the door.",
          "There is an umbrella near the door.",
          "There are two umbrellas on the door."
        ],
        "ans": 0,
        "hint": "注意数量和介词",
        "zh": "门旁边有两把雨伞。",
        "sentence": "There are two umbrellas near the door."
      }
    ],
    "id": "p21"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "l07-shopping-crowd.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "There is a new library near our school.",
        "zh": "我们学校附近有一个新图书馆。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "There are so many people in the shopping centre.",
        "zh": "购物中心里有那么多人。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "There is a panda eating bamboo in the zoo.",
        "zh": "动物园里有一只熊猫在吃竹子。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "There are some apples on the table.",
        "zh": "桌子上有一些苹果。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "There is a big window in our classroom.",
        "zh": "我们教室里有一扇大窗户。",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "There is a bus stop near my home.",
        "zh": "我家附近有一个公交车站。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "There are many books in the library.",
        "zh": "图书馆里有很多书。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "There is a cat under the chair.",
        "zh": "椅子下面有一只猫。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "There is a piano in the music room.",
        "zh": "音乐教室里有一架钢琴。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "There are five birds in the tree.",
        "zh": "树上有五只鸟。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "There is some milk in the glass.",
        "zh": "杯子里有一些牛奶。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "There are two umbrellas near the door.",
        "zh": "门旁边有两把雨伞。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "There is a doctor in the hospital.",
        "zh": "医院里有一位医生。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "There are many stars in the sky.",
        "zh": "天空中有许多星星。",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "There is a playground behind the school.",
        "zh": "学校后面有一个操场。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "There are some children on the playground.",
        "zh": "操场上有一些孩子。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "There is a basketball under the desk.",
        "zh": "书桌下面有一个篮球。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "There are three windows in the room.",
        "zh": "房间里有三扇窗户。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "There is a tall tree in front of the house.",
        "zh": "房子前面有一棵高树。",
        "tag": "writing_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "There are many flowers in the garden.",
        "zh": "花园里有许多花。",
        "tag": "writing_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "There is a new bike in the yard.",
        "zh": "院子里有一辆新自行车。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "There are two cats in the basket.",
        "zh": "篮子里有两只猫。",
        "tag": "writing_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "There is a hot pot restaurant near the park.",
        "zh": "公园附近有一家火锅店。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "There are some pandas in Chengdu.",
        "zh": "成都有一些熊猫。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      }
    ],
    "id": "p22"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "l07-shopping-crowd.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "There _____ a doctor in the hospital.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a doctor 单数",
        "sentence": "There is a doctor in the hospital.",
        "zh": "医院里有一位医生。"
      },
      {
        "q": "There _____ many stars in the sky.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many stars 复数",
        "sentence": "There are many stars in the sky.",
        "zh": "天空中有许多星星。"
      },
      {
        "q": "There _____ a playground behind the school.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a playground 单数",
        "sentence": "There is a playground behind the school.",
        "zh": "学校后面有一个操场。"
      },
      {
        "q": "There _____ some children on the playground.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "children 是复数",
        "sentence": "There are some children on the playground.",
        "zh": "操场上有一些孩子。"
      },
      {
        "q": "There _____ a basketball under the desk.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a basketball 单数",
        "sentence": "There is a basketball under the desk.",
        "zh": "书桌下面有一个篮球。"
      },
      {
        "q": "There _____ three windows in the room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "three windows 复数",
        "sentence": "There are three windows in the room.",
        "zh": "房间里有三扇窗户。"
      },
      {
        "q": "There _____ a tall tree in front of the house.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a tall tree 单数",
        "sentence": "There is a tall tree in front of the house.",
        "zh": "房子前面有一棵高树。"
      },
      {
        "q": "There _____ many flowers in the garden.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many flowers 复数",
        "sentence": "There are many flowers in the garden.",
        "zh": "花园里有许多花。"
      },
      {
        "q": "There _____ a new bike in the yard.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a new bike 单数",
        "sentence": "There is a new bike in the yard.",
        "zh": "院子里有一辆新自行车。"
      },
      {
        "q": "There _____ two cats in the basket.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "two cats 复数",
        "sentence": "There are two cats in the basket.",
        "zh": "篮子里有两只猫。"
      },
      {
        "q": "There _____ a hot pot restaurant near the park.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "a hot pot restaurant 单数",
        "sentence": "There is a hot pot restaurant near the park.",
        "zh": "公园附近有一家火锅店。"
      },
      {
        "q": "There _____ some pandas in Chengdu.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "some pandas 复数",
        "sentence": "There are some pandas in Chengdu.",
        "zh": "成都有一些熊猫。"
      },
      {
        "q": "_____ there any apples in the bag?",
        "opts": [
          "Is",
          "Are",
          "Am"
        ],
        "ans": 1,
        "hint": "any apples 复数，疑问句用Are",
        "sentence": "Are there any apples in the bag?",
        "zh": "包里有一些苹果吗？"
      },
      {
        "q": "_____ there a book on the shelf?",
        "opts": [
          "Is",
          "Are",
          "Am"
        ],
        "ans": 0,
        "hint": "a book 单数，疑问句用Is",
        "sentence": "Is there a book on the shelf?",
        "zh": "书架上有本书吗？"
      },
      {
        "q": "There _____ not any water in the bottle.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "water 不可数，用is",
        "sentence": "There is not any water in the bottle.",
        "zh": "瓶子里没有水。"
      },
      {
        "q": "There _____ not many students in the classroom.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "many students 复数，用are",
        "sentence": "There are not many students in the classroom.",
        "zh": "教室里没有很多学生。"
      },
      {
        "q": "There _____ a big window and two doors in the room.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，a big window 单数",
        "sentence": "There is a big window and two doors in the room.",
        "zh": "房间里有一扇大窗户和两扇门。"
      }
    ],
    "id": "p23"
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
    "id": "p24"
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