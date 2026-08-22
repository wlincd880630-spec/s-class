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
    "section": "精讲",
    "title": "儿童的变化",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-playground.png",
    "lead": "child 的复数不是加 s，而是整个词变化成 children。",
    "sentence": "The children are playing in the park.",
    "zh": "孩子们在公园里玩。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "脚和牙",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-doctor.png",
    "lead": "foot 变成 feet，tooth 变成 teeth，中间的 oo 变成 ee。",
    "sentence": "My feet are cold and my teeth hurt.",
    "zh": "我的脚冷，牙也疼。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "动物朋友",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "有些动物名词单复数一样，比如 sheep 和 fish。",
    "sentence": "There are many sheep and fish on the farm.",
    "zh": "农场里有很多绵羊和鱼。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
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
    "id": "p11",
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
    "id": "p12"
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
      },
      {
        "from": "There are many childs in the playground.",
        "fromZh": "操场上有许多孩子。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "There are many children in the playground.",
              "There are many child in the playground.",
              "There are many childes in the playground."
            ],
            "ans": 0,
            "hint": "child 的复数是不规则变化，不是加 s",
            "sentence": "There are many children in the playground.",
            "zh": "操场上有许多孩子。"
          }
        ]
      },
      {
        "from": "Two mans are fixing the bus.",
        "fromZh": "两个男人在修公交车。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "Two men are fixing the bus.",
              "Two man are fixing the bus.",
              "Two mans are fixing the bus."
            ],
            "ans": 0,
            "hint": "man 的复数是 men",
            "sentence": "Two men are fixing the bus.",
            "zh": "两个男人在修公交车。"
          }
        ]
      },
      {
        "from": "The womans are cooking dinner.",
        "fromZh": "女人们在做饭。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The women are cooking dinner.",
              "The woman are cooking dinner.",
              "The womans are cooking dinner."
            ],
            "ans": 0,
            "hint": "woman 的复数是 women",
            "sentence": "The women are cooking dinner.",
            "zh": "女人们在做饭。"
          }
        ]
      },
      {
        "from": "I brush my toothes every morning.",
        "fromZh": "我每天早上刷牙。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "I brush my teeth every morning.",
              "I brush my tooth every morning.",
              "I brush my tooths every morning."
            ],
            "ans": 0,
            "hint": "tooth 的复数是 teeth",
            "sentence": "I brush my teeth every morning.",
            "zh": "我每天早上刷牙。"
          }
        ]
      },
      {
        "from": "The mouses are running in the grass.",
        "fromZh": "老鼠们在草地上跑。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The mice are running in the grass.",
              "The mouse are running in the grass.",
              "The mouses are running in the grass."
            ],
            "ans": 0,
            "hint": "mouse 的复数是 mice",
            "sentence": "The mice are running in the grass.",
            "zh": "老鼠们在草地上跑。"
          }
        ]
      },
      {
        "from": "We saw five gooses by the lake.",
        "fromZh": "我们在湖边看到五只鹅。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "We saw five geese by the lake.",
              "We saw five goose by the lake.",
              "We saw five gooses by the lake."
            ],
            "ans": 0,
            "hint": "goose 的复数是 geese",
            "sentence": "We saw five geese by the lake.",
            "zh": "我们在湖边看到五只鹅。"
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
    "image": "kp3d-playground.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "There",
      "are",
      "many",
      "children",
      "in",
      "the",
      "playground"
    ],
    "sentence": "There are many children in the playground.",
    "zh": "操场上有许多孩子。",
    "items": [
      {
        "tokens": [
          "There",
          "are",
          "many",
          "children",
          "in",
          "the",
          "playground"
        ],
        "sentence": "There are many children in the playground.",
        "zh": "操场上有许多孩子。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "Two",
          "men",
          "are",
          "fixing",
          "the",
          "bus"
        ],
        "sentence": "Two men are fixing the bus.",
        "zh": "两个男人在修公交车。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "The",
          "women",
          "are",
          "cooking",
          "dinner"
        ],
        "sentence": "The women are cooking dinner.",
        "zh": "女人们在做饭。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "I",
          "brush",
          "my",
          "teeth",
          "every",
          "morning"
        ],
        "sentence": "I brush my teeth every morning.",
        "zh": "我每天早上刷牙。",
        "image": "kp3d-doctor.png"
      },
      {
        "tokens": [
          "The",
          "mice",
          "are",
          "hiding",
          "in",
          "the",
          "box"
        ],
        "sentence": "The mice are hiding in the box.",
        "zh": "老鼠们躲在盒子里。",
        "image": "kp3d-cat.png"
      },
      {
        "tokens": [
          "We",
          "saw",
          "five",
          "geese",
          "by",
          "the",
          "lake"
        ],
        "sentence": "We saw five geese by the lake.",
        "zh": "我们在湖边看到五只鹅。",
        "image": "kp3d-playground.png"
      }
    ],
    "id": "p14"
  },
  {
    "id": "p15",
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
    "id": "p16",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "There are many _____ in the playground.",
        "opts": [
          "childs",
          "children",
          "child"
        ],
        "ans": 1,
        "hint": "child 的复数是不规则变化",
        "sentence": "There are many children in the playground.",
        "zh": "操场上有许多孩子。"
      },
      {
        "q": "Two _____ are fixing the bus.",
        "opts": [
          "mans",
          "men",
          "man"
        ],
        "ans": 1,
        "hint": "man 的复数是 men",
        "sentence": "Two men are fixing the bus.",
        "zh": "两个男人在修公交车。"
      },
      {
        "q": "The _____ are cooking dinner.",
        "opts": [
          "womans",
          "women",
          "woman"
        ],
        "ans": 1,
        "hint": "woman 的复数是 women",
        "sentence": "The women are cooking dinner.",
        "zh": "女人们在做饭。"
      },
      {
        "q": "I brush my _____ every morning.",
        "opts": [
          "tooths",
          "teeth",
          "tooth"
        ],
        "ans": 1,
        "hint": "tooth 的复数是 teeth",
        "sentence": "I brush my teeth every morning.",
        "zh": "我每天早上刷牙。"
      },
      {
        "q": "The _____ are running in the grass.",
        "opts": [
          "mouses",
          "mice",
          "mouse"
        ],
        "ans": 1,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice are running in the grass.",
        "zh": "老鼠们在草地上跑。"
      },
      {
        "q": "There are three _____ in the tank.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "There are three fish in the tank.",
        "zh": "鱼缸里有三条鱼。"
      },
      {
        "q": "We saw five _____ by the lake.",
        "opts": [
          "gooses",
          "geese",
          "goose"
        ],
        "ans": 1,
        "hint": "goose 的复数是 geese",
        "sentence": "We saw five geese by the lake.",
        "zh": "我们在湖边看到五只鹅。"
      },
      {
        "q": "My _____ are cold in winter.",
        "opts": [
          "foots",
          "feet",
          "foot"
        ],
        "ans": 1,
        "hint": "foot 的复数是 feet",
        "sentence": "My feet are cold in winter.",
        "zh": "我的脚在冬天很冷。"
      },
      {
        "q": "There are many _____ on the farm.",
        "opts": [
          "sheeps",
          "sheep",
          "sheepes"
        ],
        "ans": 1,
        "hint": "sheep 单复数同形",
        "sentence": "There are many sheep on the farm.",
        "zh": "农场里有很多绵羊。"
      },
      {
        "q": "The _____ are reading in the library.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are reading in the library.",
        "zh": "孩子们在图书馆里读书。"
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
      },
      {
        "q": "There are many _____ in the playground.",
        "opts": [
          "childs",
          "children",
          "child"
        ],
        "ans": 1,
        "hint": "child 的复数是不规则变化",
        "sentence": "There are many children in the playground.",
        "zh": "操场上有许多孩子。"
      },
      {
        "q": "Two _____ are fixing the bus.",
        "opts": [
          "mans",
          "men",
          "man"
        ],
        "ans": 1,
        "hint": "man 的复数是 men",
        "sentence": "Two men are fixing the bus.",
        "zh": "两个男人在修公交车。"
      },
      {
        "q": "The _____ are cooking dinner.",
        "opts": [
          "womans",
          "women",
          "woman"
        ],
        "ans": 1,
        "hint": "woman 的复数是 women",
        "sentence": "The women are cooking dinner.",
        "zh": "女人们在做饭。"
      },
      {
        "q": "I brush my _____ every morning.",
        "opts": [
          "tooths",
          "teeth",
          "tooth"
        ],
        "ans": 1,
        "hint": "tooth 的复数是 teeth",
        "sentence": "I brush my teeth every morning.",
        "zh": "我每天早上刷牙。"
      },
      {
        "q": "The _____ are running in the grass.",
        "opts": [
          "mouses",
          "mice",
          "mouse"
        ],
        "ans": 1,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice are running in the grass.",
        "zh": "老鼠们在草地上跑。"
      },
      {
        "q": "There are three _____ in the tank.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "There are three fish in the tank.",
        "zh": "鱼缸里有三条鱼。"
      },
      {
        "q": "We saw five _____ by the lake.",
        "opts": [
          "gooses",
          "geese",
          "goose"
        ],
        "ans": 1,
        "hint": "goose 的复数是 geese",
        "sentence": "We saw five geese by the lake.",
        "zh": "我们在湖边看到五只鹅。"
      },
      {
        "q": "My _____ are cold in winter.",
        "opts": [
          "foots",
          "feet",
          "foot"
        ],
        "ans": 1,
        "hint": "foot 的复数是 feet",
        "sentence": "My feet are cold in winter.",
        "zh": "我的脚在冬天很冷。"
      },
      {
        "q": "There are many _____ on the farm.",
        "opts": [
          "sheeps",
          "sheep",
          "sheepes"
        ],
        "ans": 1,
        "hint": "sheep 单复数同形",
        "sentence": "There are many sheep on the farm.",
        "zh": "农场里有很多绵羊。"
      },
      {
        "q": "The _____ are reading in the library.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are reading in the library.",
        "zh": "孩子们在图书馆里读书。"
      },
      {
        "q": "Two _____ are playing basketball.",
        "opts": [
          "men",
          "mans",
          "man"
        ],
        "ans": 0,
        "hint": "man 的复数是 men",
        "sentence": "Two men are playing basketball.",
        "zh": "两个男人在打篮球。"
      },
      {
        "q": "The _____ are singing in the classroom.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are singing in the classroom.",
        "zh": "孩子们在教室里唱歌。"
      },
      {
        "q": "My _____ are white and clean.",
        "opts": [
          "teeth",
          "tooths",
          "tooth"
        ],
        "ans": 0,
        "hint": "tooth 的复数是 teeth",
        "sentence": "My teeth are white and clean.",
        "zh": "我的牙齿又白又干净。"
      },
      {
        "q": "The _____ ate the cheese.",
        "opts": [
          "mice",
          "mouses",
          "mouse"
        ],
        "ans": 0,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice ate the cheese.",
        "zh": "老鼠们吃了奶酪。"
      },
      {
        "q": "There are many _____ in the river.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "There are many fish in the river.",
        "zh": "河里有好多鱼。"
      },
      {
        "q": "The _____ are flying south.",
        "opts": [
          "geese",
          "gooses",
          "goose"
        ],
        "ans": 0,
        "hint": "goose 的复数是 geese",
        "sentence": "The geese are flying south.",
        "zh": "鹅群正飞往南方。"
      },
      {
        "q": "My _____ are bigger than yours.",
        "opts": [
          "feet",
          "foots",
          "foot"
        ],
        "ans": 0,
        "hint": "foot 的复数是 feet",
        "sentence": "My feet are bigger than yours.",
        "zh": "我的脚比你的大。"
      },
      {
        "q": "The _____ are hiding in the box.",
        "opts": [
          "mice",
          "mouses",
          "mouse"
        ],
        "ans": 0,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice are hiding in the box.",
        "zh": "老鼠们躲在盒子里。"
      },
      {
        "q": "There are two _____ in our family.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "There are two children in our family.",
        "zh": "我们家有两个孩子。"
      },
      {
        "q": "The _____ are planting trees.",
        "opts": [
          "women",
          "womans",
          "woman"
        ],
        "ans": 0,
        "hint": "woman 的复数是 women",
        "sentence": "The women are planting trees.",
        "zh": "女人们在种树。"
      },
      {
        "q": "I see many _____ on the hill.",
        "opts": [
          "sheep",
          "sheeps",
          "sheepes"
        ],
        "ans": 0,
        "hint": "sheep 单复数同形",
        "sentence": "I see many sheep on the hill.",
        "zh": "我看到山上有许多绵羊。"
      },
      {
        "q": "The _____ are swimming in the pond.",
        "opts": [
          "geese",
          "gooses",
          "goose"
        ],
        "ans": 0,
        "hint": "goose 的复数是 geese",
        "sentence": "The geese are swimming in the pond.",
        "zh": "鹅们在池塘里游泳。"
      },
      {
        "q": "My mom bought two _____ of milk.",
        "opts": [
          "boxes",
          "boxs",
          "box"
        ],
        "ans": 0,
        "hint": "box 的复数是 boxes",
        "sentence": "My mom bought two boxes of milk.",
        "zh": "我妈妈买了两盒牛奶。"
      },
      {
        "q": "There are two _____ in our school.",
        "opts": [
          "libraries",
          "librarys",
          "library"
        ],
        "ans": 0,
        "hint": "library 的复数是 libraries",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "The _____ are cooking in the kitchen.",
        "opts": [
          "women",
          "womans",
          "woman"
        ],
        "ans": 0,
        "hint": "woman 的复数是 women",
        "sentence": "The women are cooking in the kitchen.",
        "zh": "女人们在厨房做饭。"
      },
      {
        "q": "My _____ hurt when I eat ice cream.",
        "opts": [
          "teeth",
          "tooths",
          "tooth"
        ],
        "ans": 0,
        "hint": "tooth 的复数是 teeth",
        "sentence": "My teeth hurt when I eat ice cream.",
        "zh": "我吃冰淇淋时牙疼。"
      },
      {
        "q": "The _____ are running in the park.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are running in the park.",
        "zh": "孩子们在公园里跑。"
      },
      {
        "q": "We have two _____ in our class.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "We have two fish in our class.",
        "zh": "我们班有两条鱼。"
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
      },
      {
        "q": "There are many _____ in the playground.",
        "opts": [
          "childs",
          "children",
          "child"
        ],
        "ans": 1,
        "hint": "child 的复数是不规则变化",
        "sentence": "There are many children in the playground.",
        "zh": "操场上有许多孩子。"
      },
      {
        "q": "Two _____ are fixing the bus.",
        "opts": [
          "mans",
          "men",
          "man"
        ],
        "ans": 1,
        "hint": "man 的复数是 men",
        "sentence": "Two men are fixing the bus.",
        "zh": "两个男人在修公交车。"
      },
      {
        "q": "The _____ are cooking dinner.",
        "opts": [
          "womans",
          "women",
          "woman"
        ],
        "ans": 1,
        "hint": "woman 的复数是 women",
        "sentence": "The women are cooking dinner.",
        "zh": "女人们在做饭。"
      },
      {
        "q": "I brush my _____ every morning.",
        "opts": [
          "tooths",
          "teeth",
          "tooth"
        ],
        "ans": 1,
        "hint": "tooth 的复数是 teeth",
        "sentence": "I brush my teeth every morning.",
        "zh": "我每天早上刷牙。"
      },
      {
        "q": "The _____ are running in the grass.",
        "opts": [
          "mouses",
          "mice",
          "mouse"
        ],
        "ans": 1,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice are running in the grass.",
        "zh": "老鼠们在草地上跑。"
      },
      {
        "q": "There are three _____ in the tank.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "There are three fish in the tank.",
        "zh": "鱼缸里有三条鱼。"
      },
      {
        "q": "We saw five _____ by the lake.",
        "opts": [
          "gooses",
          "geese",
          "goose"
        ],
        "ans": 1,
        "hint": "goose 的复数是 geese",
        "sentence": "We saw five geese by the lake.",
        "zh": "我们在湖边看到五只鹅。"
      },
      {
        "q": "My _____ are cold in winter.",
        "opts": [
          "foots",
          "feet",
          "foot"
        ],
        "ans": 1,
        "hint": "foot 的复数是 feet",
        "sentence": "My feet are cold in winter.",
        "zh": "我的脚在冬天很冷。"
      },
      {
        "q": "There are many _____ on the farm.",
        "opts": [
          "sheeps",
          "sheep",
          "sheepes"
        ],
        "ans": 1,
        "hint": "sheep 单复数同形",
        "sentence": "There are many sheep on the farm.",
        "zh": "农场里有很多绵羊。"
      },
      {
        "q": "The _____ are reading in the library.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are reading in the library.",
        "zh": "孩子们在图书馆里读书。"
      },
      {
        "q": "Two _____ are playing basketball.",
        "opts": [
          "men",
          "mans",
          "man"
        ],
        "ans": 0,
        "hint": "man 的复数是 men",
        "sentence": "Two men are playing basketball.",
        "zh": "两个男人在打篮球。"
      },
      {
        "q": "The _____ are singing in the classroom.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are singing in the classroom.",
        "zh": "孩子们在教室里唱歌。"
      },
      {
        "q": "My _____ are white and clean.",
        "opts": [
          "teeth",
          "tooths",
          "tooth"
        ],
        "ans": 0,
        "hint": "tooth 的复数是 teeth",
        "sentence": "My teeth are white and clean.",
        "zh": "我的牙齿又白又干净。"
      },
      {
        "q": "The _____ ate the cheese.",
        "opts": [
          "mice",
          "mouses",
          "mouse"
        ],
        "ans": 0,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice ate the cheese.",
        "zh": "老鼠们吃了奶酪。"
      },
      {
        "q": "There are many _____ in the river.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "There are many fish in the river.",
        "zh": "河里有好多鱼。"
      },
      {
        "q": "The _____ are flying south.",
        "opts": [
          "geese",
          "gooses",
          "goose"
        ],
        "ans": 0,
        "hint": "goose 的复数是 geese",
        "sentence": "The geese are flying south.",
        "zh": "鹅群正飞往南方。"
      },
      {
        "q": "My _____ are bigger than yours.",
        "opts": [
          "feet",
          "foots",
          "foot"
        ],
        "ans": 0,
        "hint": "foot 的复数是 feet",
        "sentence": "My feet are bigger than yours.",
        "zh": "我的脚比你的大。"
      },
      {
        "q": "The _____ are hiding in the box.",
        "opts": [
          "mice",
          "mouses",
          "mouse"
        ],
        "ans": 0,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice are hiding in the box.",
        "zh": "老鼠们躲在盒子里。"
      },
      {
        "q": "There are two _____ in our family.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "There are two children in our family.",
        "zh": "我们家有两个孩子。"
      },
      {
        "q": "The _____ are planting trees.",
        "opts": [
          "women",
          "womans",
          "woman"
        ],
        "ans": 0,
        "hint": "woman 的复数是 women",
        "sentence": "The women are planting trees.",
        "zh": "女人们在种树。"
      },
      {
        "q": "I see many _____ on the hill.",
        "opts": [
          "sheep",
          "sheeps",
          "sheepes"
        ],
        "ans": 0,
        "hint": "sheep 单复数同形",
        "sentence": "I see many sheep on the hill.",
        "zh": "我看到山上有许多绵羊。"
      },
      {
        "q": "The _____ are swimming in the pond.",
        "opts": [
          "geese",
          "gooses",
          "goose"
        ],
        "ans": 0,
        "hint": "goose 的复数是 geese",
        "sentence": "The geese are swimming in the pond.",
        "zh": "鹅们在池塘里游泳。"
      },
      {
        "q": "My mom bought two _____ of milk.",
        "opts": [
          "boxes",
          "boxs",
          "box"
        ],
        "ans": 0,
        "hint": "box 的复数是 boxes",
        "sentence": "My mom bought two boxes of milk.",
        "zh": "我妈妈买了两盒牛奶。"
      },
      {
        "q": "There are two _____ in our school.",
        "opts": [
          "libraries",
          "librarys",
          "library"
        ],
        "ans": 0,
        "hint": "library 的复数是 libraries",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "The _____ are cooking in the kitchen.",
        "opts": [
          "women",
          "womans",
          "woman"
        ],
        "ans": 0,
        "hint": "woman 的复数是 women",
        "sentence": "The women are cooking in the kitchen.",
        "zh": "女人们在厨房做饭。"
      },
      {
        "q": "My _____ hurt when I eat ice cream.",
        "opts": [
          "teeth",
          "tooths",
          "tooth"
        ],
        "ans": 0,
        "hint": "tooth 的复数是 teeth",
        "sentence": "My teeth hurt when I eat ice cream.",
        "zh": "我吃冰淇淋时牙疼。"
      },
      {
        "q": "The _____ are running in the park.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are running in the park.",
        "zh": "孩子们在公园里跑。"
      },
      {
        "q": "We have two _____ in our class.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "We have two fish in our class.",
        "zh": "我们班有两条鱼。"
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
    "image": "l06-libraries.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "one child",
        "zh": "一个孩子"
      },
      {
        "en": "two children",
        "zh": "两个孩子"
      },
      {
        "en": "one man",
        "zh": "一个男人"
      },
      {
        "en": "two men",
        "zh": "两个男人"
      },
      {
        "en": "one woman",
        "zh": "一个女人"
      },
      {
        "en": "two women",
        "zh": "两个女人"
      },
      {
        "en": "one tooth",
        "zh": "一颗牙"
      },
      {
        "en": "many teeth",
        "zh": "许多牙"
      },
      {
        "en": "one mouse",
        "zh": "一只老鼠"
      },
      {
        "en": "many mice",
        "zh": "许多老鼠"
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
    "image": "l06-libraries.jpg",
    "audio": "There are many children in the playground.",
    "opts": [
      "There are many children in the playground.",
      "There are many childs in the playground.",
      "There are many child in the playground."
    ],
    "ans": 0,
    "hint": "注意 child 的复数",
    "sentence": "There are many children in the playground.",
    "zh": "操场上有许多孩子。",
    "questions": [
      {
        "audio": "There are many children in the playground.",
        "opts": [
          "There are many children in the playground.",
          "There are many childs in the playground.",
          "There are many child in the playground."
        ],
        "ans": 0,
        "hint": "注意 child 的复数",
        "zh": "操场上有许多孩子。",
        "sentence": "There are many children in the playground."
      },
      {
        "audio": "Two men are fixing the bus.",
        "opts": [
          "Two men are fixing the bus.",
          "Two mans are fixing the bus.",
          "Two man are fixing the bus."
        ],
        "ans": 0,
        "hint": "注意 man 的复数",
        "zh": "两个男人在修公交车。",
        "sentence": "Two men are fixing the bus."
      },
      {
        "audio": "The women are cooking dinner.",
        "opts": [
          "The women are cooking dinner.",
          "The womans are cooking dinner.",
          "The woman are cooking dinner."
        ],
        "ans": 0,
        "hint": "注意 woman 的复数",
        "zh": "女人们在做饭。",
        "sentence": "The women are cooking dinner."
      },
      {
        "audio": "I brush my teeth every morning.",
        "opts": [
          "I brush my teeth every morning.",
          "I brush my toothes every morning.",
          "I brush my tooth every morning."
        ],
        "ans": 0,
        "hint": "注意 tooth 的复数",
        "zh": "我每天早上刷牙。",
        "sentence": "I brush my teeth every morning."
      },
      {
        "audio": "The mice are running in the grass.",
        "opts": [
          "The mice are running in the grass.",
          "The mouses are running in the grass.",
          "The mouse are running in the grass."
        ],
        "ans": 0,
        "hint": "注意 mouse 的复数",
        "zh": "老鼠们在草地上跑。",
        "sentence": "The mice are running in the grass."
      },
      {
        "audio": "We saw five geese by the lake.",
        "opts": [
          "We saw five geese by the lake.",
          "We saw five gooses by the lake.",
          "We saw five goose by the lake."
        ],
        "ans": 0,
        "hint": "注意 goose 的复数",
        "zh": "我们在湖边看到五只鹅。",
        "sentence": "We saw five geese by the lake."
      },
      {
        "audio": "There are many sheep on the farm.",
        "opts": [
          "There are many sheep on the farm.",
          "There are many sheeps on the farm.",
          "There are many sheepes on the farm."
        ],
        "ans": 0,
        "hint": "sheep 单复数同形",
        "zh": "农场里有很多绵羊。",
        "sentence": "There are many sheep on the farm."
      },
      {
        "audio": "There are three fish in the tank.",
        "opts": [
          "There are three fish in the tank.",
          "There are three fishes in the tank.",
          "There are three fishs in the tank."
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "zh": "鱼缸里有三条鱼。",
        "sentence": "There are three fish in the tank."
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
    "image": "l06-libraries.jpg",
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
        "en": "Three children played in the park.",
        "zh": "三个孩子在公园里玩。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My mom bought two boxes of milk at the shop.",
        "zh": "我妈妈在商店买了两盒牛奶。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "We saw five geese by the lake.",
        "zh": "我们在湖边看到五只鹅。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The mice ran under the bed.",
        "zh": "老鼠们跑到床底下去了。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "There are many sheep on the farm.",
        "zh": "农场里有很多绵羊。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Two men are fixing the bus.",
        "zh": "两个男人正在修公交车。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The women are cooking dinner in the kitchen.",
        "zh": "女人们正在厨房做晚饭。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "My teeth hurt when I eat ice cream.",
        "zh": "我吃冰淇淋时牙疼。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The children are reading in the library.",
        "zh": "孩子们在图书馆里读书。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "There are three fish in the tank.",
        "zh": "鱼缸里有三条鱼。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "The geese are flying south for winter.",
        "zh": "鹅群正飞往南方过冬。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "My feet are cold in winter.",
        "zh": "我的脚在冬天很冷。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The mice ate the cheese in the kitchen.",
        "zh": "老鼠们吃了厨房里的奶酪。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We have two children in our family.",
        "zh": "我们家有两个孩子。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The men are playing basketball on the playground.",
        "zh": "男人们在操场上打篮球。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "I see many sheep on the hill.",
        "zh": "我看到山上有许多绵羊。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The women are planting trees in the park.",
        "zh": "女人们正在公园里种树。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My teeth are white and clean.",
        "zh": "我的牙齿又白又干净。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The children are singing in the classroom.",
        "zh": "孩子们在教室里唱歌。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "There are many fish in the river.",
        "zh": "河里有好多鱼。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The geese are swimming in the pond.",
        "zh": "鹅们在池塘里游泳。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My feet are bigger than yours.",
        "zh": "我的脚比你的大。",
        "tag": "writing_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "The mice are hiding in the box.",
        "zh": "老鼠们躲在盒子里。",
        "tag": "writing_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
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
    "image": "l06-libraries.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "Two _____ are playing basketball.",
        "opts": [
          "men",
          "mans",
          "man"
        ],
        "ans": 0,
        "hint": "man 的复数是 men",
        "sentence": "Two men are playing basketball.",
        "zh": "两个男人在打篮球。"
      },
      {
        "q": "The _____ are singing in the classroom.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are singing in the classroom.",
        "zh": "孩子们在教室里唱歌。"
      },
      {
        "q": "My _____ are white and clean.",
        "opts": [
          "teeth",
          "tooths",
          "tooth"
        ],
        "ans": 0,
        "hint": "tooth 的复数是 teeth",
        "sentence": "My teeth are white and clean.",
        "zh": "我的牙齿又白又干净。"
      },
      {
        "q": "The _____ ate the cheese.",
        "opts": [
          "mice",
          "mouses",
          "mouse"
        ],
        "ans": 0,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice ate the cheese.",
        "zh": "老鼠们吃了奶酪。"
      },
      {
        "q": "There are many _____ in the river.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "There are many fish in the river.",
        "zh": "河里有好多鱼。"
      },
      {
        "q": "The _____ are flying south.",
        "opts": [
          "geese",
          "gooses",
          "goose"
        ],
        "ans": 0,
        "hint": "goose 的复数是 geese",
        "sentence": "The geese are flying south.",
        "zh": "鹅群正飞往南方。"
      },
      {
        "q": "My _____ are bigger than yours.",
        "opts": [
          "feet",
          "foots",
          "foot"
        ],
        "ans": 0,
        "hint": "foot 的复数是 feet",
        "sentence": "My feet are bigger than yours.",
        "zh": "我的脚比你的大。"
      },
      {
        "q": "The _____ are hiding in the box.",
        "opts": [
          "mice",
          "mouses",
          "mouse"
        ],
        "ans": 0,
        "hint": "mouse 的复数是 mice",
        "sentence": "The mice are hiding in the box.",
        "zh": "老鼠们躲在盒子里。"
      },
      {
        "q": "There are two _____ in our family.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "There are two children in our family.",
        "zh": "我们家有两个孩子。"
      },
      {
        "q": "The _____ are planting trees.",
        "opts": [
          "women",
          "womans",
          "woman"
        ],
        "ans": 0,
        "hint": "woman 的复数是 women",
        "sentence": "The women are planting trees.",
        "zh": "女人们在种树。"
      },
      {
        "q": "I see many _____ on the hill.",
        "opts": [
          "sheep",
          "sheeps",
          "sheepes"
        ],
        "ans": 0,
        "hint": "sheep 单复数同形",
        "sentence": "I see many sheep on the hill.",
        "zh": "我看到山上有许多绵羊。"
      },
      {
        "q": "The _____ are swimming in the pond.",
        "opts": [
          "geese",
          "gooses",
          "goose"
        ],
        "ans": 0,
        "hint": "goose 的复数是 geese",
        "sentence": "The geese are swimming in the pond.",
        "zh": "鹅们在池塘里游泳。"
      },
      {
        "q": "My mom bought two _____ of milk.",
        "opts": [
          "boxes",
          "boxs",
          "box"
        ],
        "ans": 0,
        "hint": "box 的复数是 boxes",
        "sentence": "My mom bought two boxes of milk.",
        "zh": "我妈妈买了两盒牛奶。"
      },
      {
        "q": "There are two _____ in our school.",
        "opts": [
          "libraries",
          "librarys",
          "library"
        ],
        "ans": 0,
        "hint": "library 的复数是 libraries",
        "sentence": "There are two libraries in our school.",
        "zh": "我们学校有两个图书馆。"
      },
      {
        "q": "The _____ are cooking in the kitchen.",
        "opts": [
          "women",
          "womans",
          "woman"
        ],
        "ans": 0,
        "hint": "woman 的复数是 women",
        "sentence": "The women are cooking in the kitchen.",
        "zh": "女人们在厨房做饭。"
      },
      {
        "q": "My _____ hurt when I eat ice cream.",
        "opts": [
          "teeth",
          "tooths",
          "tooth"
        ],
        "ans": 0,
        "hint": "tooth 的复数是 teeth",
        "sentence": "My teeth hurt when I eat ice cream.",
        "zh": "我吃冰淇淋时牙疼。"
      },
      {
        "q": "The _____ are running in the park.",
        "opts": [
          "children",
          "childs",
          "child"
        ],
        "ans": 0,
        "hint": "child 的复数是 children",
        "sentence": "The children are running in the park.",
        "zh": "孩子们在公园里跑。"
      },
      {
        "q": "We have two _____ in our class.",
        "opts": [
          "fish",
          "fishes",
          "fishs"
        ],
        "ans": 0,
        "hint": "fish 单复数同形",
        "sentence": "We have two fish in our class.",
        "zh": "我们班有两条鱼。"
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
    "id": "p24"
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