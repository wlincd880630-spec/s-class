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
    "section": "精讲",
    "title": "规则复数 · 一般加s",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-apple.png",
    "lead": "大多数名词直接加s。",
    "sentence": "The apples are red.",
    "zh": "苹果是红色的。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "规则复数 · s/x/ch/sh加es",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "以s、x、ch、sh结尾的名词加es。",
    "sentence": "The buses are here.",
    "zh": "公交车在这里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "规则复数 · 辅音+y变ies",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "辅音字母+y结尾，变y为i再加es。",
    "sentence": "The babies are happy.",
    "zh": "宝宝们很开心。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
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
    "id": "p11",
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
    "id": "p12"
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
      },
      {
        "from": "There are many librarys in the city.",
        "fromZh": "城市里有很多图书馆。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "There are many libraries in the city.",
              "There are many libraryes in the city.",
              "There are many library in the city."
            ],
            "ans": 0,
            "hint": "辅音+y变ies",
            "sentence": "There are many libraries in the city.",
            "zh": "城市里有很多图书馆。"
          }
        ]
      },
      {
        "from": "The baby is sleeping.",
        "fromZh": "宝宝在睡觉。",
        "steps": [
          {
            "label": "改成复数",
            "opts": [
              "The babies are sleeping.",
              "The babys are sleeping.",
              "The babyes are sleeping."
            ],
            "ans": 0,
            "hint": "辅音+y变ies",
            "sentence": "The babies are sleeping.",
            "zh": "宝宝们在睡觉。"
          }
        ]
      },
      {
        "from": "I see a bus at the stop.",
        "fromZh": "我在车站看到一辆公交车。",
        "steps": [
          {
            "label": "改成复数",
            "opts": [
              "I see three buses at the stop.",
              "I see three busses at the stop.",
              "I see three bus at the stop."
            ],
            "ans": 0,
            "hint": "s结尾加es",
            "sentence": "I see three buses at the stop.",
            "zh": "我在车站看到三辆公交车。"
          }
        ]
      },
      {
        "from": "The box is full of books.",
        "fromZh": "盒子装满了书。",
        "steps": [
          {
            "label": "改成复数",
            "opts": [
              "The boxes are full of books.",
              "The boxs are full of books.",
              "The boxies are full of books."
            ],
            "ans": 0,
            "hint": "x结尾加es",
            "sentence": "The boxes are full of books.",
            "zh": "盒子里装满了书。"
          }
        ]
      },
      {
        "from": "The cherry is sweet.",
        "fromZh": "樱桃很甜。",
        "steps": [
          {
            "label": "改成复数",
            "opts": [
              "The cherries are sweet.",
              "The cherrys are sweet.",
              "The cherryes are sweet."
            ],
            "ans": 0,
            "hint": "辅音+y变ies",
            "sentence": "The cherries are sweet.",
            "zh": "樱桃很甜。"
          }
        ]
      },
      {
        "from": "The watch is on the desk.",
        "fromZh": "手表在桌子上。",
        "steps": [
          {
            "label": "改成复数",
            "opts": [
              "The watches are on the desk.",
              "The watchs are on the desk.",
              "The watchies are on the desk."
            ],
            "ans": 0,
            "hint": "ch结尾加es",
            "sentence": "The watches are on the desk.",
            "zh": "手表在桌子上。"
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
      "are",
      "two",
      "libraries",
      "in",
      "our",
      "school"
    ],
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。",
    "items": [
      {
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
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "The",
          "babies",
          "are",
          "sleeping"
        ],
        "sentence": "The babies are sleeping.",
        "zh": "宝宝们在睡觉。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "I",
          "see",
          "three",
          "buses",
          "at",
          "the",
          "stop"
        ],
        "sentence": "I see three buses at the stop.",
        "zh": "我在车站看到三辆公交车。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "The",
          "boxes",
          "are",
          "full",
          "of",
          "books"
        ],
        "sentence": "The boxes are full of books.",
        "zh": "盒子里装满了书。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "The",
          "cherries",
          "are",
          "sweet"
        ],
        "sentence": "The cherries are sweet.",
        "zh": "樱桃很甜。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "The",
          "pianos",
          "sound",
          "beautiful"
        ],
        "sentence": "The pianos sound beautiful.",
        "zh": "钢琴的声音很好听。",
        "image": "kp3d-piano.png"
      }
    ],
    "id": "p14"
  },
  {
    "id": "p15",
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
    "id": "p16",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "There are two _____ in our school.",
        "opts": [
          "librarys",
          "libraries",
          "libraryes"
        ],
        "ans": 1,
        "hint": "辅音+y变ies",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "The _____ are sleeping.",
        "opts": [
          "babys",
          "babies",
          "babyes"
        ],
        "ans": 1,
        "hint": "辅音+y变ies",
        "sentence": "The babies are sleeping.",
        "zh": "宝宝们在睡觉。"
      },
      {
        "q": "I see three _____ at the stop.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "I see three buses at the stop.",
        "zh": "我在车站看到三辆公交车。"
      },
      {
        "q": "We eat _____ after lunch.",
        "opts": [
          "apples",
          "applees",
          "appls"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "We eat apples after lunch.",
        "zh": "我们午饭后吃苹果。"
      },
      {
        "q": "The _____ eat bamboo in Chengdu.",
        "opts": [
          "pandas",
          "pandass",
          "pandies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The pandas eat bamboo in Chengdu.",
        "zh": "熊猫在成都吃竹子。"
      },
      {
        "q": "My _____ like to play in the playground.",
        "opts": [
          "sisters",
          "sisteres",
          "sisties"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "My sisters like to play in the playground.",
        "zh": "我的姐妹们喜欢在操场玩。"
      },
      {
        "q": "There are many _____ in the classroom.",
        "opts": [
          "boxs",
          "boxes",
          "boxies"
        ],
        "ans": 1,
        "hint": "x结尾加es",
        "sentence": "There are many boxes in the classroom.",
        "zh": "教室里有很多盒子。"
      },
      {
        "q": "The _____ have umbrellas for the rain.",
        "opts": [
          "boys",
          "boies",
          "boyes"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The boys have umbrellas for the rain.",
        "zh": "男孩们有雨伞来挡雨。"
      },
      {
        "q": "The _____ check our homework.",
        "opts": [
          "teachers",
          "teacheres",
          "teachies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The teachers check our homework.",
        "zh": "老师们检查我们的作业。"
      },
      {
        "q": "The _____ are on the table.",
        "opts": [
          "dishes",
          "dishs",
          "dishies"
        ],
        "ans": 0,
        "hint": "sh结尾加es",
        "sentence": "The dishes are on the table.",
        "zh": "盘子放在桌子上。"
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
      },
      {
        "q": "There are two _____ in our school.",
        "opts": [
          "librarys",
          "libraries",
          "libraryes"
        ],
        "ans": 1,
        "hint": "辅音+y变ies",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "The _____ are sleeping.",
        "opts": [
          "babys",
          "babies",
          "babyes"
        ],
        "ans": 1,
        "hint": "辅音+y变ies",
        "sentence": "The babies are sleeping.",
        "zh": "宝宝们在睡觉。"
      },
      {
        "q": "I see three _____ at the stop.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "I see three buses at the stop.",
        "zh": "我在车站看到三辆公交车。"
      },
      {
        "q": "We eat _____ after lunch.",
        "opts": [
          "apples",
          "applees",
          "appls"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "We eat apples after lunch.",
        "zh": "我们午饭后吃苹果。"
      },
      {
        "q": "The _____ eat bamboo in Chengdu.",
        "opts": [
          "pandas",
          "pandass",
          "pandies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The pandas eat bamboo in Chengdu.",
        "zh": "熊猫在成都吃竹子。"
      },
      {
        "q": "My _____ like to play in the playground.",
        "opts": [
          "sisters",
          "sisteres",
          "sisties"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "My sisters like to play in the playground.",
        "zh": "我的姐妹们喜欢在操场玩。"
      },
      {
        "q": "There are many _____ in the classroom.",
        "opts": [
          "boxs",
          "boxes",
          "boxies"
        ],
        "ans": 1,
        "hint": "x结尾加es",
        "sentence": "There are many boxes in the classroom.",
        "zh": "教室里有很多盒子。"
      },
      {
        "q": "The _____ have umbrellas for the rain.",
        "opts": [
          "boys",
          "boies",
          "boyes"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The boys have umbrellas for the rain.",
        "zh": "男孩们有雨伞来挡雨。"
      },
      {
        "q": "The _____ check our homework.",
        "opts": [
          "teachers",
          "teacheres",
          "teachies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The teachers check our homework.",
        "zh": "老师们检查我们的作业。"
      },
      {
        "q": "The _____ are on the table.",
        "opts": [
          "dishes",
          "dishs",
          "dishies"
        ],
        "ans": 0,
        "hint": "sh结尾加es",
        "sentence": "The dishes are on the table.",
        "zh": "盘子放在桌子上。"
      },
      {
        "q": "The _____ live in the forest.",
        "opts": [
          "foxes",
          "foxs",
          "foxies"
        ],
        "ans": 0,
        "hint": "x结尾加es",
        "sentence": "The foxes live in the forest.",
        "zh": "狐狸住在森林里。"
      },
      {
        "q": "The _____ run every hour.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "The buses run every hour.",
        "zh": "公交车每小时一班。"
      },
      {
        "q": "The _____ are on the desk.",
        "opts": [
          "watches",
          "watchs",
          "watchies"
        ],
        "ans": 0,
        "hint": "ch结尾加es",
        "sentence": "The watches are on the desk.",
        "zh": "手表在桌子上。"
      },
      {
        "q": "The _____ are sweet.",
        "opts": [
          "cherries",
          "cherrys",
          "cherryes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The cherries are sweet.",
        "zh": "樱桃很甜。"
      },
      {
        "q": "The _____ work in the hospital.",
        "opts": [
          "doctors",
          "doctores",
          "docties"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The doctors work in the hospital.",
        "zh": "医生们在医院工作。"
      },
      {
        "q": "The _____ are open.",
        "opts": [
          "windows",
          "windowes",
          "windies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The windows are open.",
        "zh": "窗户开着。"
      },
      {
        "q": "We write _____ in English class.",
        "opts": [
          "stories",
          "storys",
          "storyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "We write stories in English class.",
        "zh": "我们在英语课上写故事。"
      },
      {
        "q": "The _____ have many parks.",
        "opts": [
          "cities",
          "citys",
          "cityes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The cities have many parks.",
        "zh": "城市里有很多公园。"
      },
      {
        "q": "The _____ run in the yard.",
        "opts": [
          "puppies",
          "puppys",
          "puppyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The puppies run in the yard.",
        "zh": "小狗们在院子里跑。"
      },
      {
        "q": "The _____ are full of books.",
        "opts": [
          "boxes",
          "boxs",
          "boxies"
        ],
        "ans": 0,
        "hint": "x结尾加es",
        "sentence": "The boxes are full of books.",
        "zh": "盒子里装满了书。"
      },
      {
        "q": "The _____ talk about the weather.",
        "opts": [
          "ladies",
          "ladys",
          "ladyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The ladies talk about the weather.",
        "zh": "女士们谈论天气。"
      },
      {
        "q": "The _____ take us to school.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "The buses take us to school.",
        "zh": "公交车送我们去学校。"
      },
      {
        "q": "The _____ sound beautiful.",
        "opts": [
          "pianos",
          "pianoes",
          "pianies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The pianos sound beautiful.",
        "zh": "钢琴的声音很好听。"
      },
      {
        "q": "The _____ grow in spring.",
        "opts": [
          "flowers",
          "floweres",
          "flowies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The flowers grow in spring.",
        "zh": "花在春天生长。"
      },
      {
        "q": "I have two _____ in my bag.",
        "opts": [
          "pencils",
          "penciles",
          "pencils"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "I have two pencils in my bag.",
        "zh": "我书包里有两支铅笔。"
      },
      {
        "q": "The _____ are playing basketball.",
        "opts": [
          "children",
          "childs",
          "childrens"
        ],
        "ans": 0,
        "hint": "不规则复数，但这里用children",
        "sentence": "The children are playing basketball.",
        "zh": "孩子们在打篮球。"
      },
      {
        "q": "The _____ are in the library.",
        "opts": [
          "books",
          "bookes",
          "bookies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The books are in the library.",
        "zh": "书在图书馆里。"
      },
      {
        "q": "The _____ are on the wall.",
        "opts": [
          "maps",
          "mapes",
          "mapies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The maps are on the wall.",
        "zh": "地图在墙上。"
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
      },
      {
        "q": "There are two _____ in our school.",
        "opts": [
          "librarys",
          "libraries",
          "libraryes"
        ],
        "ans": 1,
        "hint": "辅音+y变ies",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "The _____ are sleeping.",
        "opts": [
          "babys",
          "babies",
          "babyes"
        ],
        "ans": 1,
        "hint": "辅音+y变ies",
        "sentence": "The babies are sleeping.",
        "zh": "宝宝们在睡觉。"
      },
      {
        "q": "I see three _____ at the stop.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "I see three buses at the stop.",
        "zh": "我在车站看到三辆公交车。"
      },
      {
        "q": "We eat _____ after lunch.",
        "opts": [
          "apples",
          "applees",
          "appls"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "We eat apples after lunch.",
        "zh": "我们午饭后吃苹果。"
      },
      {
        "q": "The _____ eat bamboo in Chengdu.",
        "opts": [
          "pandas",
          "pandass",
          "pandies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The pandas eat bamboo in Chengdu.",
        "zh": "熊猫在成都吃竹子。"
      },
      {
        "q": "My _____ like to play in the playground.",
        "opts": [
          "sisters",
          "sisteres",
          "sisties"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "My sisters like to play in the playground.",
        "zh": "我的姐妹们喜欢在操场玩。"
      },
      {
        "q": "There are many _____ in the classroom.",
        "opts": [
          "boxs",
          "boxes",
          "boxies"
        ],
        "ans": 1,
        "hint": "x结尾加es",
        "sentence": "There are many boxes in the classroom.",
        "zh": "教室里有很多盒子。"
      },
      {
        "q": "The _____ have umbrellas for the rain.",
        "opts": [
          "boys",
          "boies",
          "boyes"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The boys have umbrellas for the rain.",
        "zh": "男孩们有雨伞来挡雨。"
      },
      {
        "q": "The _____ check our homework.",
        "opts": [
          "teachers",
          "teacheres",
          "teachies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The teachers check our homework.",
        "zh": "老师们检查我们的作业。"
      },
      {
        "q": "The _____ are on the table.",
        "opts": [
          "dishes",
          "dishs",
          "dishies"
        ],
        "ans": 0,
        "hint": "sh结尾加es",
        "sentence": "The dishes are on the table.",
        "zh": "盘子放在桌子上。"
      },
      {
        "q": "The _____ live in the forest.",
        "opts": [
          "foxes",
          "foxs",
          "foxies"
        ],
        "ans": 0,
        "hint": "x结尾加es",
        "sentence": "The foxes live in the forest.",
        "zh": "狐狸住在森林里。"
      },
      {
        "q": "The _____ run every hour.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "The buses run every hour.",
        "zh": "公交车每小时一班。"
      },
      {
        "q": "The _____ are on the desk.",
        "opts": [
          "watches",
          "watchs",
          "watchies"
        ],
        "ans": 0,
        "hint": "ch结尾加es",
        "sentence": "The watches are on the desk.",
        "zh": "手表在桌子上。"
      },
      {
        "q": "The _____ are sweet.",
        "opts": [
          "cherries",
          "cherrys",
          "cherryes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The cherries are sweet.",
        "zh": "樱桃很甜。"
      },
      {
        "q": "The _____ work in the hospital.",
        "opts": [
          "doctors",
          "doctores",
          "docties"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The doctors work in the hospital.",
        "zh": "医生们在医院工作。"
      },
      {
        "q": "The _____ are open.",
        "opts": [
          "windows",
          "windowes",
          "windies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The windows are open.",
        "zh": "窗户开着。"
      },
      {
        "q": "We write _____ in English class.",
        "opts": [
          "stories",
          "storys",
          "storyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "We write stories in English class.",
        "zh": "我们在英语课上写故事。"
      },
      {
        "q": "The _____ have many parks.",
        "opts": [
          "cities",
          "citys",
          "cityes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The cities have many parks.",
        "zh": "城市里有很多公园。"
      },
      {
        "q": "The _____ run in the yard.",
        "opts": [
          "puppies",
          "puppys",
          "puppyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The puppies run in the yard.",
        "zh": "小狗们在院子里跑。"
      },
      {
        "q": "The _____ are full of books.",
        "opts": [
          "boxes",
          "boxs",
          "boxies"
        ],
        "ans": 0,
        "hint": "x结尾加es",
        "sentence": "The boxes are full of books.",
        "zh": "盒子里装满了书。"
      },
      {
        "q": "The _____ talk about the weather.",
        "opts": [
          "ladies",
          "ladys",
          "ladyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The ladies talk about the weather.",
        "zh": "女士们谈论天气。"
      },
      {
        "q": "The _____ take us to school.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "The buses take us to school.",
        "zh": "公交车送我们去学校。"
      },
      {
        "q": "The _____ sound beautiful.",
        "opts": [
          "pianos",
          "pianoes",
          "pianies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The pianos sound beautiful.",
        "zh": "钢琴的声音很好听。"
      },
      {
        "q": "The _____ grow in spring.",
        "opts": [
          "flowers",
          "floweres",
          "flowies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The flowers grow in spring.",
        "zh": "花在春天生长。"
      },
      {
        "q": "I have two _____ in my bag.",
        "opts": [
          "pencils",
          "penciles",
          "pencils"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "I have two pencils in my bag.",
        "zh": "我书包里有两支铅笔。"
      },
      {
        "q": "The _____ are playing basketball.",
        "opts": [
          "children",
          "childs",
          "childrens"
        ],
        "ans": 0,
        "hint": "不规则复数，但这里用children",
        "sentence": "The children are playing basketball.",
        "zh": "孩子们在打篮球。"
      },
      {
        "q": "The _____ are in the library.",
        "opts": [
          "books",
          "bookes",
          "bookies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The books are in the library.",
        "zh": "书在图书馆里。"
      },
      {
        "q": "The _____ are on the wall.",
        "opts": [
          "maps",
          "mapes",
          "mapies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The maps are on the wall.",
        "zh": "地图在墙上。"
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
    "image": "w5-plr-hero.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "two libraries",
        "zh": "两个图书馆"
      },
      {
        "en": "three buses",
        "zh": "三辆公交车"
      },
      {
        "en": "five boxes",
        "zh": "五个盒子"
      },
      {
        "en": "the babies",
        "zh": "宝宝们"
      },
      {
        "en": "the dishes",
        "zh": "盘子们"
      },
      {
        "en": "the watches",
        "zh": "手表们"
      },
      {
        "en": "the cherries",
        "zh": "樱桃们"
      },
      {
        "en": "the stories",
        "zh": "故事们"
      },
      {
        "en": "the cities",
        "zh": "城市们"
      },
      {
        "en": "the pianos",
        "zh": "钢琴们"
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
    "image": "w5-plr-hero.jpg",
    "audio": "There are two libraries in our school.",
    "opts": [
      "There are two libraries in our school.",
      "There are two librarys in our school.",
      "There are two libraryes in our school."
    ],
    "ans": 0,
    "hint": "听清楚libraries",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两个图书馆。",
    "questions": [
      {
        "audio": "There are two libraries in our school.",
        "opts": [
          "There are two libraries in our school.",
          "There are two librarys in our school.",
          "There are two libraryes in our school."
        ],
        "ans": 0,
        "hint": "听清楚libraries",
        "zh": "我们学校有两个图书馆。",
        "sentence": "There are two libraries in our school."
      },
      {
        "audio": "The babies are sleeping.",
        "opts": [
          "The babies are sleeping.",
          "The babys are sleeping.",
          "The babyes are sleeping."
        ],
        "ans": 0,
        "hint": "听清楚babies",
        "zh": "宝宝们在睡觉。",
        "sentence": "The babies are sleeping."
      },
      {
        "audio": "I see three buses at the stop.",
        "opts": [
          "I see three buses at the stop.",
          "I see three buss at the stop.",
          "I see three bus at the stop."
        ],
        "ans": 0,
        "hint": "听清楚buses",
        "zh": "我在车站看到三辆公交车。",
        "sentence": "I see three buses at the stop."
      },
      {
        "audio": "The boxes are full of books.",
        "opts": [
          "The boxes are full of books.",
          "The boxs are full of books.",
          "The boxies are full of books."
        ],
        "ans": 0,
        "hint": "听清楚boxes",
        "zh": "盒子里装满了书。",
        "sentence": "The boxes are full of books."
      },
      {
        "audio": "The cherries are sweet.",
        "opts": [
          "The cherries are sweet.",
          "The cherrys are sweet.",
          "The cherryes are sweet."
        ],
        "ans": 0,
        "hint": "听清楚cherries",
        "zh": "樱桃很甜。",
        "sentence": "The cherries are sweet."
      },
      {
        "audio": "The dishes are on the table.",
        "opts": [
          "The dishes are on the table.",
          "The dishs are on the table.",
          "The dishies are on the table."
        ],
        "ans": 0,
        "hint": "听清楚dishes",
        "zh": "盘子放在桌子上。",
        "sentence": "The dishes are on the table."
      },
      {
        "audio": "The watches are on the desk.",
        "opts": [
          "The watches are on the desk.",
          "The watchs are on the desk.",
          "The watchies are on the desk."
        ],
        "ans": 0,
        "hint": "听清楚watches",
        "zh": "手表在桌子上。",
        "sentence": "The watches are on the desk."
      },
      {
        "audio": "The pianos sound beautiful.",
        "opts": [
          "The pianos sound beautiful.",
          "The pianoes sound beautiful.",
          "The pianies sound beautiful."
        ],
        "ans": 0,
        "hint": "听清楚pianos",
        "zh": "钢琴的声音很好听。",
        "sentence": "The pianos sound beautiful."
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
    "image": "w5-plr-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The babies are sleeping.",
        "zh": "宝宝们在睡觉。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I see three buses at the stop.",
        "zh": "我在车站看到三辆公交车。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "We eat apples after lunch.",
        "zh": "我们午饭后吃苹果。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The pandas eat bamboo in Chengdu.",
        "zh": "熊猫在成都吃竹子。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "My sisters like to play in the playground.",
        "zh": "我的姐妹们喜欢在操场玩。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "There are many boxes in the classroom.",
        "zh": "教室里有很多盒子。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The boys have umbrellas for the rain.",
        "zh": "男孩们有雨伞来挡雨。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The teachers check our homework.",
        "zh": "老师们检查我们的作业。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The dishes are on the table.",
        "zh": "盘子放在桌子上。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The foxes live in the forest.",
        "zh": "狐狸住在森林里。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The buses run every hour.",
        "zh": "公交车每小时一班。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The watches are on the desk.",
        "zh": "手表在桌子上。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The cherries are sweet.",
        "zh": "樱桃很甜。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The doctors work in the hospital.",
        "zh": "医生们在医院工作。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The windows are open.",
        "zh": "窗户开着。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "We write stories in English class.",
        "zh": "我们在英语课上写故事。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The cities have many parks.",
        "zh": "城市里有很多公园。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The puppies run in the yard.",
        "zh": "小狗们在院子里跑。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The boxes are full of books.",
        "zh": "盒子里装满了书。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The ladies talk about the weather.",
        "zh": "女士们谈论天气。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The buses take us to school.",
        "zh": "公交车送我们去学校。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The pianos sound beautiful.",
        "zh": "钢琴的声音很好听。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The flowers grow in spring.",
        "zh": "花在春天生长。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
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
    "image": "w5-plr-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The _____ live in the forest.",
        "opts": [
          "foxes",
          "foxs",
          "foxies"
        ],
        "ans": 0,
        "hint": "x结尾加es",
        "sentence": "The foxes live in the forest.",
        "zh": "狐狸住在森林里。"
      },
      {
        "q": "The _____ run every hour.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "The buses run every hour.",
        "zh": "公交车每小时一班。"
      },
      {
        "q": "The _____ are on the desk.",
        "opts": [
          "watches",
          "watchs",
          "watchies"
        ],
        "ans": 0,
        "hint": "ch结尾加es",
        "sentence": "The watches are on the desk.",
        "zh": "手表在桌子上。"
      },
      {
        "q": "The _____ are sweet.",
        "opts": [
          "cherries",
          "cherrys",
          "cherryes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The cherries are sweet.",
        "zh": "樱桃很甜。"
      },
      {
        "q": "The _____ work in the hospital.",
        "opts": [
          "doctors",
          "doctores",
          "docties"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The doctors work in the hospital.",
        "zh": "医生们在医院工作。"
      },
      {
        "q": "The _____ are open.",
        "opts": [
          "windows",
          "windowes",
          "windies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The windows are open.",
        "zh": "窗户开着。"
      },
      {
        "q": "We write _____ in English class.",
        "opts": [
          "stories",
          "storys",
          "storyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "We write stories in English class.",
        "zh": "我们在英语课上写故事。"
      },
      {
        "q": "The _____ have many parks.",
        "opts": [
          "cities",
          "citys",
          "cityes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The cities have many parks.",
        "zh": "城市里有很多公园。"
      },
      {
        "q": "The _____ run in the yard.",
        "opts": [
          "puppies",
          "puppys",
          "puppyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The puppies run in the yard.",
        "zh": "小狗们在院子里跑。"
      },
      {
        "q": "The _____ are full of books.",
        "opts": [
          "boxes",
          "boxs",
          "boxies"
        ],
        "ans": 0,
        "hint": "x结尾加es",
        "sentence": "The boxes are full of books.",
        "zh": "盒子里装满了书。"
      },
      {
        "q": "The _____ talk about the weather.",
        "opts": [
          "ladies",
          "ladys",
          "ladyes"
        ],
        "ans": 0,
        "hint": "辅音+y变ies",
        "sentence": "The ladies talk about the weather.",
        "zh": "女士们谈论天气。"
      },
      {
        "q": "The _____ take us to school.",
        "opts": [
          "buses",
          "buss",
          "buses"
        ],
        "ans": 0,
        "hint": "s结尾加es",
        "sentence": "The buses take us to school.",
        "zh": "公交车送我们去学校。"
      },
      {
        "q": "The _____ sound beautiful.",
        "opts": [
          "pianos",
          "pianoes",
          "pianies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The pianos sound beautiful.",
        "zh": "钢琴的声音很好听。"
      },
      {
        "q": "The _____ grow in spring.",
        "opts": [
          "flowers",
          "floweres",
          "flowies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The flowers grow in spring.",
        "zh": "花在春天生长。"
      },
      {
        "q": "I have two _____ in my bag.",
        "opts": [
          "pencils",
          "penciles",
          "pencils"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "I have two pencils in my bag.",
        "zh": "我书包里有两支铅笔。"
      },
      {
        "q": "The _____ are playing basketball.",
        "opts": [
          "children",
          "childs",
          "childrens"
        ],
        "ans": 0,
        "hint": "不规则复数，但这里用children",
        "sentence": "The children are playing basketball.",
        "zh": "孩子们在打篮球。"
      },
      {
        "q": "The _____ are in the library.",
        "opts": [
          "books",
          "bookes",
          "bookies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The books are in the library.",
        "zh": "书在图书馆里。"
      },
      {
        "q": "The _____ are on the wall.",
        "opts": [
          "maps",
          "mapes",
          "mapies"
        ],
        "ans": 0,
        "hint": "一般加s",
        "sentence": "The maps are on the wall.",
        "zh": "地图在墙上。"
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
    "image": "writing.jpg",
    "checklist": [
      "一般名词加 -s",
      "s/x/ch/sh 加 -es",
      "辅音+y 变 ies；元音+y 加 -s",
      "photo/piano/radio 只加 s；tomato/potato/hero 加 es。"
    ],
    "chant": "Add -s for most, that's the rule! -es for s, x, ch, sh — stay in school!",
    "chantSpeak": "Add s for most, that is the rule! es for s, x, ch, sh, stay in school!",
    "id": "p24"
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