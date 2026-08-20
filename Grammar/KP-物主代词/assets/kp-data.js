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
    "section": "精讲",
    "title": "我的书 vs 我的",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "my 后面必须跟名词，mine 后面不跟名词。",
    "sentence": "This is my book. That book is mine.",
    "zh": "这是我的书。那本书是我的。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "你的钢笔 vs 你的",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "your 后面接名词，yours 单独使用。",
    "sentence": "Your pen is red. Mine is blue.",
    "zh": "你的钢笔是红色的。我的是蓝色的。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "她的猫 vs 她的",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-cat.png",
    "lead": "her 后接名词，hers 单独使用。",
    "sentence": "Her cat is cute. His is lazy.",
    "zh": "她的猫很可爱。他的很懒。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
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
    "id": "p11",
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
    "id": "p12"
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
      },
      {
        "from": "This is mine book.",
        "fromZh": "这是我的书。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "This is my book.",
              "This is mine book.",
              "This is I book."
            ],
            "ans": 0,
            "hint": "后面有名词 book，要用形容词性物主代词 my。",
            "sentence": "This is my book.",
            "zh": "这是我的书。"
          }
        ]
      },
      {
        "from": "That is her pen.",
        "fromZh": "那是她的钢笔。",
        "steps": [
          {
            "label": "改成没有名词的句子",
            "opts": [
              "That pen is hers.",
              "That pen is her.",
              "That is hers pen."
            ],
            "ans": 0,
            "hint": "去掉名词后，用名词性物主代词 hers。",
            "sentence": "That pen is hers.",
            "zh": "那支钢笔是她的。"
          }
        ]
      },
      {
        "from": "This is yours book.",
        "fromZh": "这是你的书。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "This is your book.",
              "This is yours book.",
              "This is you book."
            ],
            "ans": 0,
            "hint": "后面有名词 book，用形容词性 your。",
            "sentence": "This is your book.",
            "zh": "这是你的书。"
          }
        ]
      },
      {
        "from": "The blue bag is my.",
        "fromZh": "这个蓝色的包是我的。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The blue bag is mine.",
              "The blue bag is my.",
              "The blue bag is me."
            ],
            "ans": 0,
            "hint": "后面没有名词，用名词性物主代词 mine。",
            "sentence": "The blue bag is mine.",
            "zh": "这个蓝色的包是我的。"
          }
        ]
      },
      {
        "from": "Our classroom is big. Their is small.",
        "fromZh": "我们的教室大。他们的小。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "Our classroom is big. Theirs is small.",
              "Our classroom is big. Their is small.",
              "Our classroom is big. They is small."
            ],
            "ans": 0,
            "hint": "名词性物主代词是 theirs。",
            "sentence": "Our classroom is big. Theirs is small.",
            "zh": "我们的教室大。他们的小。"
          }
        ]
      },
      {
        "from": "This is his book. That is her.",
        "fromZh": "这是他的书。那是她的。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "This is his book. That is hers.",
              "This is his book. That is her.",
              "This is his book. That is she."
            ],
            "ans": 0,
            "hint": "后面没有名词，用 hers。",
            "sentence": "This is his book. That is hers.",
            "zh": "这是他的书。那是她的。"
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
      "This",
      "book",
      "is",
      "mine"
    ],
    "sentence": "This book is mine.",
    "zh": "这本书是我的。",
    "items": [
      {
        "tokens": [
          "This",
          "book",
          "is",
          "mine"
        ],
        "sentence": "This book is mine.",
        "zh": "这本书是我的。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "Your",
          "pen",
          "is",
          "on",
          "the",
          "desk"
        ],
        "sentence": "Your pen is on the desk.",
        "zh": "你的钢笔在桌子上。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "My",
          "cat",
          "is",
          "black"
        ],
        "sentence": "My cat is black.",
        "zh": "我的猫是黑色的。",
        "image": "kp3d-cat.png"
      },
      {
        "tokens": [
          "Our",
          "classroom",
          "is",
          "big"
        ],
        "sentence": "Our classroom is big.",
        "zh": "我们的教室很大。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "I",
          "like",
          "your",
          "bike"
        ],
        "sentence": "I like your bike.",
        "zh": "我喜欢你的自行车。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "Her",
          "bag",
          "is",
          "red"
        ],
        "sentence": "Her bag is red.",
        "zh": "她的包是红色的。",
        "image": "kp3d-shop.png"
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
    "id": "p16",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "This is _____ book.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 0,
        "hint": "后面有名词 book，用形容词性物主代词。",
        "sentence": "This is my book.",
        "zh": "这是我的书。"
      },
      {
        "q": "That book is _____.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性物主代词。",
        "sentence": "That book is mine.",
        "zh": "那本书是我的。"
      },
      {
        "q": "_____ pen is on the desk.",
        "opts": [
          "Your",
          "Yours",
          "You"
        ],
        "ans": 0,
        "hint": "后面有名词 pen，用形容词性。",
        "sentence": "Your pen is on the desk.",
        "zh": "你的钢笔在桌子上。"
      },
      {
        "q": "The green pencil is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The green pencil is hers.",
        "zh": "这支绿铅笔是她的。"
      },
      {
        "q": "This is not _____ bike. It's his.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 0,
        "hint": "后面有名词 bike，用形容词性。",
        "sentence": "This is not my bike. It's his.",
        "zh": "这不是我的自行车。是他的。"
      },
      {
        "q": "Our classroom is big. _____ is small.",
        "opts": [
          "Their",
          "Theirs",
          "They"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "Our classroom is big. Theirs is small.",
        "zh": "我们的教室大。他们的小。"
      },
      {
        "q": "This is my cat. _____ is white.",
        "opts": [
          "Your",
          "Yours",
          "You"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my cat. Yours is white.",
        "zh": "这是我的猫。你的是白色的。"
      },
      {
        "q": "_____ mother is a teacher.",
        "opts": [
          "His",
          "Hers",
          "He"
        ],
        "ans": 0,
        "hint": "后面有名词 mother，用形容词性。",
        "sentence": "His mother is a teacher.",
        "zh": "他的妈妈是老师。"
      },
      {
        "q": "This umbrella is not _____.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This umbrella is not mine.",
        "zh": "这把伞不是我的。"
      },
      {
        "q": "I like _____ school.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 0,
        "hint": "后面有名词 school，用形容词性。",
        "sentence": "I like our school.",
        "zh": "我喜欢我们的学校。"
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
      },
      {
        "q": "This is _____ book.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 0,
        "hint": "后面有名词 book，用形容词性物主代词。",
        "sentence": "This is my book.",
        "zh": "这是我的书。"
      },
      {
        "q": "That book is _____.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性物主代词。",
        "sentence": "That book is mine.",
        "zh": "那本书是我的。"
      },
      {
        "q": "_____ pen is on the desk.",
        "opts": [
          "Your",
          "Yours",
          "You"
        ],
        "ans": 0,
        "hint": "后面有名词 pen，用形容词性。",
        "sentence": "Your pen is on the desk.",
        "zh": "你的钢笔在桌子上。"
      },
      {
        "q": "The green pencil is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The green pencil is hers.",
        "zh": "这支绿铅笔是她的。"
      },
      {
        "q": "This is not _____ bike. It's his.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 0,
        "hint": "后面有名词 bike，用形容词性。",
        "sentence": "This is not my bike. It's his.",
        "zh": "这不是我的自行车。是他的。"
      },
      {
        "q": "Our classroom is big. _____ is small.",
        "opts": [
          "Their",
          "Theirs",
          "They"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "Our classroom is big. Theirs is small.",
        "zh": "我们的教室大。他们的小。"
      },
      {
        "q": "This is my cat. _____ is white.",
        "opts": [
          "Your",
          "Yours",
          "You"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my cat. Yours is white.",
        "zh": "这是我的猫。你的是白色的。"
      },
      {
        "q": "_____ mother is a teacher.",
        "opts": [
          "His",
          "Hers",
          "He"
        ],
        "ans": 0,
        "hint": "后面有名词 mother，用形容词性。",
        "sentence": "His mother is a teacher.",
        "zh": "他的妈妈是老师。"
      },
      {
        "q": "This umbrella is not _____.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This umbrella is not mine.",
        "zh": "这把伞不是我的。"
      },
      {
        "q": "I like _____ school.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 0,
        "hint": "后面有名词 school，用形容词性。",
        "sentence": "I like our school.",
        "zh": "我喜欢我们的学校。"
      },
      {
        "q": "The red bag is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The red bag is hers.",
        "zh": "这个红包是她的。"
      },
      {
        "q": "Is this _____ pencil? No, it's mine.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 0,
        "hint": "后面有名词 pencil，用形容词性。",
        "sentence": "Is this your pencil? No, it's mine.",
        "zh": "这是你的铅笔吗？不，是我的。"
      },
      {
        "q": "My shoes are new. _____ are old.",
        "opts": [
          "His",
          "Him",
          "He"
        ],
        "ans": 0,
        "hint": "后面没有名词，用名词性 his。",
        "sentence": "My shoes are new. His are old.",
        "zh": "我的鞋子是新的。他的是旧的。"
      },
      {
        "q": "_____ dog is very cute.",
        "opts": [
          "Their",
          "Theirs",
          "They"
        ],
        "ans": 0,
        "hint": "后面有名词 dog，用形容词性。",
        "sentence": "Their dog is very cute.",
        "zh": "他们的狗很可爱。"
      },
      {
        "q": "This is my apple. That is _____.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my apple. That is yours.",
        "zh": "这是我的苹果。那是你的。"
      },
      {
        "q": "We have our books. They have _____.",
        "opts": [
          "their",
          "theirs",
          "they"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "We have our books. They have theirs.",
        "zh": "我们有我们的书。他们有他们的。"
      },
      {
        "q": "_____ name is Lily.",
        "opts": [
          "Her",
          "Hers",
          "She"
        ],
        "ans": 0,
        "hint": "后面有名词 name，用形容词性。",
        "sentence": "Her name is Lily.",
        "zh": "她的名字是莉莉。"
      },
      {
        "q": "This is not my pen. It's _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is not my pen. It's hers.",
        "zh": "这不是我的钢笔。是她的。"
      },
      {
        "q": "_____ classroom is on the third floor.",
        "opts": [
          "Our",
          "Ours",
          "We"
        ],
        "ans": 0,
        "hint": "后面有名词 classroom，用形容词性。",
        "sentence": "Our classroom is on the third floor.",
        "zh": "我们的教室在三楼。"
      },
      {
        "q": "The blue bike is _____.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The blue bike is mine.",
        "zh": "这辆蓝色自行车是我的。"
      },
      {
        "q": "This is _____ umbrella. It's raining.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 0,
        "hint": "后面有名词 umbrella，用形容词性。",
        "sentence": "This is my umbrella. It's raining.",
        "zh": "这是我的伞。下雨了。"
      },
      {
        "q": "Your bag is heavy. _____ is light.",
        "opts": [
          "My",
          "Mine",
          "Me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "Your bag is heavy. Mine is light.",
        "zh": "你的包很重。我的很轻。"
      },
      {
        "q": "Is this _____ ruler? No, it's his.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 0,
        "hint": "后面有名词 ruler，用形容词性。",
        "sentence": "Is this your ruler? No, it's his.",
        "zh": "这是你的尺子吗？不，是他的。"
      },
      {
        "q": "The cat is not _____. It's theirs.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The cat is not ours. It's theirs.",
        "zh": "这只猫不是我们的。是他们的。"
      },
      {
        "q": "_____ school is near the park.",
        "opts": [
          "His",
          "Hers",
          "He"
        ],
        "ans": 0,
        "hint": "后面有名词 school，用形容词性。",
        "sentence": "His school is near the park.",
        "zh": "他的学校在公园附近。"
      },
      {
        "q": "This is my seat. That is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my seat. That is hers.",
        "zh": "这是我的座位。那是她的。"
      },
      {
        "q": "We love _____ parents.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 0,
        "hint": "后面有名词 parents，用形容词性。",
        "sentence": "We love our parents.",
        "zh": "我们爱我们的父母。"
      },
      {
        "q": "The toy is _____.",
        "opts": [
          "their",
          "theirs",
          "they"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The toy is theirs.",
        "zh": "这个玩具是他们的。"
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
      },
      {
        "q": "This is _____ book.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 0,
        "hint": "后面有名词 book，用形容词性物主代词。",
        "sentence": "This is my book.",
        "zh": "这是我的书。"
      },
      {
        "q": "That book is _____.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性物主代词。",
        "sentence": "That book is mine.",
        "zh": "那本书是我的。"
      },
      {
        "q": "_____ pen is on the desk.",
        "opts": [
          "Your",
          "Yours",
          "You"
        ],
        "ans": 0,
        "hint": "后面有名词 pen，用形容词性。",
        "sentence": "Your pen is on the desk.",
        "zh": "你的钢笔在桌子上。"
      },
      {
        "q": "The green pencil is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The green pencil is hers.",
        "zh": "这支绿铅笔是她的。"
      },
      {
        "q": "This is not _____ bike. It's his.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 0,
        "hint": "后面有名词 bike，用形容词性。",
        "sentence": "This is not my bike. It's his.",
        "zh": "这不是我的自行车。是他的。"
      },
      {
        "q": "Our classroom is big. _____ is small.",
        "opts": [
          "Their",
          "Theirs",
          "They"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "Our classroom is big. Theirs is small.",
        "zh": "我们的教室大。他们的小。"
      },
      {
        "q": "This is my cat. _____ is white.",
        "opts": [
          "Your",
          "Yours",
          "You"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my cat. Yours is white.",
        "zh": "这是我的猫。你的是白色的。"
      },
      {
        "q": "_____ mother is a teacher.",
        "opts": [
          "His",
          "Hers",
          "He"
        ],
        "ans": 0,
        "hint": "后面有名词 mother，用形容词性。",
        "sentence": "His mother is a teacher.",
        "zh": "他的妈妈是老师。"
      },
      {
        "q": "This umbrella is not _____.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This umbrella is not mine.",
        "zh": "这把伞不是我的。"
      },
      {
        "q": "I like _____ school.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 0,
        "hint": "后面有名词 school，用形容词性。",
        "sentence": "I like our school.",
        "zh": "我喜欢我们的学校。"
      },
      {
        "q": "The red bag is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The red bag is hers.",
        "zh": "这个红包是她的。"
      },
      {
        "q": "Is this _____ pencil? No, it's mine.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 0,
        "hint": "后面有名词 pencil，用形容词性。",
        "sentence": "Is this your pencil? No, it's mine.",
        "zh": "这是你的铅笔吗？不，是我的。"
      },
      {
        "q": "My shoes are new. _____ are old.",
        "opts": [
          "His",
          "Him",
          "He"
        ],
        "ans": 0,
        "hint": "后面没有名词，用名词性 his。",
        "sentence": "My shoes are new. His are old.",
        "zh": "我的鞋子是新的。他的是旧的。"
      },
      {
        "q": "_____ dog is very cute.",
        "opts": [
          "Their",
          "Theirs",
          "They"
        ],
        "ans": 0,
        "hint": "后面有名词 dog，用形容词性。",
        "sentence": "Their dog is very cute.",
        "zh": "他们的狗很可爱。"
      },
      {
        "q": "This is my apple. That is _____.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my apple. That is yours.",
        "zh": "这是我的苹果。那是你的。"
      },
      {
        "q": "We have our books. They have _____.",
        "opts": [
          "their",
          "theirs",
          "they"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "We have our books. They have theirs.",
        "zh": "我们有我们的书。他们有他们的。"
      },
      {
        "q": "_____ name is Lily.",
        "opts": [
          "Her",
          "Hers",
          "She"
        ],
        "ans": 0,
        "hint": "后面有名词 name，用形容词性。",
        "sentence": "Her name is Lily.",
        "zh": "她的名字是莉莉。"
      },
      {
        "q": "This is not my pen. It's _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is not my pen. It's hers.",
        "zh": "这不是我的钢笔。是她的。"
      },
      {
        "q": "_____ classroom is on the third floor.",
        "opts": [
          "Our",
          "Ours",
          "We"
        ],
        "ans": 0,
        "hint": "后面有名词 classroom，用形容词性。",
        "sentence": "Our classroom is on the third floor.",
        "zh": "我们的教室在三楼。"
      },
      {
        "q": "The blue bike is _____.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The blue bike is mine.",
        "zh": "这辆蓝色自行车是我的。"
      },
      {
        "q": "This is _____ umbrella. It's raining.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 0,
        "hint": "后面有名词 umbrella，用形容词性。",
        "sentence": "This is my umbrella. It's raining.",
        "zh": "这是我的伞。下雨了。"
      },
      {
        "q": "Your bag is heavy. _____ is light.",
        "opts": [
          "My",
          "Mine",
          "Me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "Your bag is heavy. Mine is light.",
        "zh": "你的包很重。我的很轻。"
      },
      {
        "q": "Is this _____ ruler? No, it's his.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 0,
        "hint": "后面有名词 ruler，用形容词性。",
        "sentence": "Is this your ruler? No, it's his.",
        "zh": "这是你的尺子吗？不，是他的。"
      },
      {
        "q": "The cat is not _____. It's theirs.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The cat is not ours. It's theirs.",
        "zh": "这只猫不是我们的。是他们的。"
      },
      {
        "q": "_____ school is near the park.",
        "opts": [
          "His",
          "Hers",
          "He"
        ],
        "ans": 0,
        "hint": "后面有名词 school，用形容词性。",
        "sentence": "His school is near the park.",
        "zh": "他的学校在公园附近。"
      },
      {
        "q": "This is my seat. That is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my seat. That is hers.",
        "zh": "这是我的座位。那是她的。"
      },
      {
        "q": "We love _____ parents.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 0,
        "hint": "后面有名词 parents，用形容词性。",
        "sentence": "We love our parents.",
        "zh": "我们爱我们的父母。"
      },
      {
        "q": "The toy is _____.",
        "opts": [
          "their",
          "theirs",
          "they"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The toy is theirs.",
        "zh": "这个玩具是他们的。"
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
    "image": "w4-poss-hero.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "your pen",
        "zh": "你的钢笔"
      },
      {
        "en": "yours",
        "zh": "你的（东西）"
      },
      {
        "en": "his cat",
        "zh": "他的猫"
      },
      {
        "en": "our school",
        "zh": "我们的学校"
      },
      {
        "en": "my umbrella",
        "zh": "我的伞"
      },
      {
        "en": "your bike",
        "zh": "你的自行车"
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
    "image": "w4-poss-hero.jpg",
    "audio": "This is my book.",
    "opts": [
      "This is my book.",
      "This is mine book.",
      "This is I book."
    ],
    "ans": 0,
    "hint": "注意后面有名词 book，用 my。",
    "sentence": "This is my book.",
    "zh": "这是我的书。",
    "questions": [
      {
        "audio": "This is my book.",
        "opts": [
          "This is my book.",
          "This is mine book.",
          "This is I book."
        ],
        "ans": 0,
        "hint": "注意后面有名词 book，用 my。",
        "zh": "这是我的书。",
        "sentence": "This is my book."
      },
      {
        "audio": "That is yours.",
        "opts": [
          "That is yours.",
          "That is your.",
          "That is you."
        ],
        "ans": 0,
        "hint": "后面没有名词，用 yours。",
        "zh": "那是你的。",
        "sentence": "That is yours."
      },
      {
        "audio": "Her cat is white.",
        "opts": [
          "Her cat is white.",
          "Hers cat is white.",
          "She cat is white."
        ],
        "ans": 0,
        "hint": "后面有名词 cat，用 her。",
        "zh": "她的猫是白色的。",
        "sentence": "Her cat is white."
      },
      {
        "audio": "This isn't mine.",
        "opts": [
          "This isn't mine.",
          "This isn't my.",
          "This isn't me."
        ],
        "ans": 0,
        "hint": "后面没有名词，用 mine。",
        "zh": "这不是我的。",
        "sentence": "This isn't mine."
      },
      {
        "audio": "Our school is big.",
        "opts": [
          "Our school is big.",
          "Ours school is big.",
          "We school is big."
        ],
        "ans": 0,
        "hint": "后面有名词 school，用 our。",
        "zh": "我们的学校很大。",
        "sentence": "Our school is big."
      },
      {
        "audio": "The blue bike is his.",
        "opts": [
          "The blue bike is his.",
          "The blue bike is him.",
          "The blue bike is he."
        ],
        "ans": 0,
        "hint": "名词性物主代词 his 不变。",
        "zh": "这辆蓝色自行车是他的。",
        "sentence": "The blue bike is his."
      },
      {
        "audio": "Yours is on the desk.",
        "opts": [
          "Yours is on the desk.",
          "Your is on the desk.",
          "You is on the desk."
        ],
        "ans": 0,
        "hint": "后面没有名词，用 yours。",
        "zh": "你的在桌子上。",
        "sentence": "Yours is on the desk."
      },
      {
        "audio": "This is her umbrella.",
        "opts": [
          "This is her umbrella.",
          "This is hers umbrella.",
          "This is she umbrella."
        ],
        "ans": 0,
        "hint": "后面有名词 umbrella，用 her。",
        "zh": "这是她的伞。",
        "sentence": "This is her umbrella."
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
    "image": "w4-poss-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "This book is mine.",
        "zh": "这本书是我的。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Yours is on the desk.",
        "zh": "你的在桌子上。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "This pen isn't mine. It's hers.",
        "zh": "这支钢笔不是我的。是她的。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My bag is heavy, but yours is light.",
        "zh": "我的包很重，但你的很轻。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Our classroom is big. Theirs is small.",
        "zh": "我们的教室大。他们的小。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I like my bike. Do you like yours?",
        "zh": "我喜欢我的自行车。你喜欢你的吗？",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "Her cat is white. Mine is black.",
        "zh": "她的猫是白色的。我的是黑色的。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "This is my lunch. Where is yours?",
        "zh": "这是我的午饭。你的在哪里？",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "My name is Tom. What's yours?",
        "zh": "我的名字是汤姆。你的呢？",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "This is your seat. Mine is next to it.",
        "zh": "这是你的座位。我的在它旁边。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Is this his pencil? No, it's hers.",
        "zh": "这是他的铅笔吗？不，是她的。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Our teacher is kind. Theirs is strict.",
        "zh": "我们的老师很和蔼。他们的很严格。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My shoes are new, but his are old.",
        "zh": "我的鞋子是新的，但他的旧了。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "This is our school. That is theirs.",
        "zh": "这是我们的学校。那是他们的。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "My mom is a doctor. His is a nurse.",
        "zh": "我妈妈是医生。他妈妈是护士。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "Your answer is right. Hers is wrong.",
        "zh": "你的答案是对的。她的是错的。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My room is tidy. Yours is messy.",
        "zh": "我的房间整洁。你的乱糟糟。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "I have my umbrella. She has hers.",
        "zh": "我带着我的伞。她带着她的。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "This is my favorite book. That is yours.",
        "zh": "这是我最喜欢的书。那是你的。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Our team won. Theirs lost.",
        "zh": "我们队赢了。他们队输了。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "My grandpa has a dog. Its name is Lucky.",
        "zh": "我爷爷有一只狗。它的名字叫幸运。",
        "tag": "writing_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "This is my piano. That one is hers.",
        "zh": "这是我的钢琴。那架是她的。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "I like my school. Do you like yours?",
        "zh": "我喜欢我的学校。你喜欢你的吗？",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My apple is red. Yours is green.",
        "zh": "我的苹果是红色的。你的是绿色的。",
        "tag": "writing_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
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
    "image": "w4-poss-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The red bag is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The red bag is hers.",
        "zh": "这个红包是她的。"
      },
      {
        "q": "Is this _____ pencil? No, it's mine.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 0,
        "hint": "后面有名词 pencil，用形容词性。",
        "sentence": "Is this your pencil? No, it's mine.",
        "zh": "这是你的铅笔吗？不，是我的。"
      },
      {
        "q": "My shoes are new. _____ are old.",
        "opts": [
          "His",
          "Him",
          "He"
        ],
        "ans": 0,
        "hint": "后面没有名词，用名词性 his。",
        "sentence": "My shoes are new. His are old.",
        "zh": "我的鞋子是新的。他的是旧的。"
      },
      {
        "q": "_____ dog is very cute.",
        "opts": [
          "Their",
          "Theirs",
          "They"
        ],
        "ans": 0,
        "hint": "后面有名词 dog，用形容词性。",
        "sentence": "Their dog is very cute.",
        "zh": "他们的狗很可爱。"
      },
      {
        "q": "This is my apple. That is _____.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my apple. That is yours.",
        "zh": "这是我的苹果。那是你的。"
      },
      {
        "q": "We have our books. They have _____.",
        "opts": [
          "their",
          "theirs",
          "they"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "We have our books. They have theirs.",
        "zh": "我们有我们的书。他们有他们的。"
      },
      {
        "q": "_____ name is Lily.",
        "opts": [
          "Her",
          "Hers",
          "She"
        ],
        "ans": 0,
        "hint": "后面有名词 name，用形容词性。",
        "sentence": "Her name is Lily.",
        "zh": "她的名字是莉莉。"
      },
      {
        "q": "This is not my pen. It's _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is not my pen. It's hers.",
        "zh": "这不是我的钢笔。是她的。"
      },
      {
        "q": "_____ classroom is on the third floor.",
        "opts": [
          "Our",
          "Ours",
          "We"
        ],
        "ans": 0,
        "hint": "后面有名词 classroom，用形容词性。",
        "sentence": "Our classroom is on the third floor.",
        "zh": "我们的教室在三楼。"
      },
      {
        "q": "The blue bike is _____.",
        "opts": [
          "my",
          "mine",
          "I"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The blue bike is mine.",
        "zh": "这辆蓝色自行车是我的。"
      },
      {
        "q": "This is _____ umbrella. It's raining.",
        "opts": [
          "my",
          "mine",
          "me"
        ],
        "ans": 0,
        "hint": "后面有名词 umbrella，用形容词性。",
        "sentence": "This is my umbrella. It's raining.",
        "zh": "这是我的伞。下雨了。"
      },
      {
        "q": "Your bag is heavy. _____ is light.",
        "opts": [
          "My",
          "Mine",
          "Me"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "Your bag is heavy. Mine is light.",
        "zh": "你的包很重。我的很轻。"
      },
      {
        "q": "Is this _____ ruler? No, it's his.",
        "opts": [
          "your",
          "yours",
          "you"
        ],
        "ans": 0,
        "hint": "后面有名词 ruler，用形容词性。",
        "sentence": "Is this your ruler? No, it's his.",
        "zh": "这是你的尺子吗？不，是他的。"
      },
      {
        "q": "The cat is not _____. It's theirs.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The cat is not ours. It's theirs.",
        "zh": "这只猫不是我们的。是他们的。"
      },
      {
        "q": "_____ school is near the park.",
        "opts": [
          "His",
          "Hers",
          "He"
        ],
        "ans": 0,
        "hint": "后面有名词 school，用形容词性。",
        "sentence": "His school is near the park.",
        "zh": "他的学校在公园附近。"
      },
      {
        "q": "This is my seat. That is _____.",
        "opts": [
          "her",
          "hers",
          "she"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "This is my seat. That is hers.",
        "zh": "这是我的座位。那是她的。"
      },
      {
        "q": "We love _____ parents.",
        "opts": [
          "our",
          "ours",
          "we"
        ],
        "ans": 0,
        "hint": "后面有名词 parents，用形容词性。",
        "sentence": "We love our parents.",
        "zh": "我们爱我们的父母。"
      },
      {
        "q": "The toy is _____.",
        "opts": [
          "their",
          "theirs",
          "they"
        ],
        "ans": 1,
        "hint": "后面没有名词，用名词性。",
        "sentence": "The toy is theirs.",
        "zh": "这个玩具是他们的。"
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
      "my + 名词；mine 独立",
      "his 形容词性 = 名词性",
      "写作：Yours is…; This is mine.",
      "his 形物=名物；its 没有 it's 的撇号。"
    ],
    "chant": "My plus noun — that's the rule! Mine stands alone — cool and cool!",
    "chantSpeak": "My plus noun, that is the rule! Mine stands alone, cool and cool!",
    "id": "p24"
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