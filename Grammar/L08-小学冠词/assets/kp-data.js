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
    "audio": "I saw a cat. The cat was very cute.",
    "soundHint": "先听，不要看文字。",
    "question": "第一次提到用 a，第二次呢？",
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。",
    "image": "l09-articles-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l09-articles-hero.jpg",
    "question": "为什么第一个空是 a，第二个是 the？",
    "choices": [
      {
        "text": "第一次泛指用 a，第二次特指用 the",
        "correct": true,
        "fb": "对了！a/an 首次提及，the 再次提及。"
      },
      {
        "text": "cat 永远用 the",
        "correct": false,
        "fb": "第一次提到一般用 a cat。"
      },
      {
        "text": "两个空都用 an",
        "correct": false,
        "fb": "cat 以辅音音素开头，用 a。"
      }
    ],
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l09-articles-hero.jpg",
    "lead": "a/an 表泛指「一个」；the 表特指「那个已知的」。",
    "formula": "a + 辅音音素　/　an + 元音音素　/　the + 特指",
    "parts": [
      {
        "mark": "a",
        "label": "辅音音素",
        "example": "a cat / a university"
      },
      {
        "mark": "an",
        "label": "元音音素",
        "example": "an apple / an hour"
      },
      {
        "mark": "the",
        "label": "特指或独一无二",
        "example": "the sun / the cat（再次提及）"
      }
    ],
    "samples": [
      {
        "sentence": "I saw a cat. The cat was very cute.",
        "zh": "我看见一只猫。那只猫很可爱。"
      },
      {
        "sentence": "My father is an honest man.",
        "zh": "我爸爸是个诚实的人。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l09-a.jpg",
    "rightImage": "l09-the.jpg",
    "leftLabel": "a 泛指",
    "rightLabel": "the 特指",
    "leftSentence": "I have a book.",
    "leftZh": "我有一本书。（任意一本）",
    "rightSentence": "The book is on the desk.",
    "rightZh": "那本书在桌上。（双方都知道）",
    "morphBase": "a",
    "morphPast": "the",
    "morphHighlight": "",
    "discovery": "a/an 表「一个」泛指；the 表双方都知道的那個。"
  },
  {
    "section": "精讲",
    "title": "例句 · an honest",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l09-articles-hero.jpg",
    "lead": "honest 的 h 不发音，以元音音素开头 → an。",
    "sentence": "My father is an honest man.",
    "zh": "我爸爸是个诚实的人。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 再次提及",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l09-articles-hero.jpg",
    "lead": "第一次 a cat，第二次 the cat。",
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫。那只猫很可爱。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "a 和 an 的选择",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-cat.png",
    "lead": "a 用于辅音音素前，an 用于元音音素前。",
    "sentence": "I have a cat. She has an apple.",
    "zh": "我有一只猫。她有一个苹果。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "the 的特指",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-moon.png",
    "lead": "the 用于特指或独一无二的事物。",
    "sentence": "The sun is bright. The cat I saw is black.",
    "zh": "太阳很亮。我看见的那只猫是黑色的。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "易错点：a university",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "虽然 university 以元音字母开头，但发音以辅音音素 /ju:/ 开头，所以用 a。",
    "sentence": "She is a university student.",
    "zh": "她是一名大学生。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l09-articles-hero.jpg",
    "rules": [
      {
        "tab": "a/an",
        "rule": "辅音音素开头用 a；元音音素开头用 an",
        "focusVerb": "an",
        "examples": [
          {
            "from": "book",
            "to": "a book"
          },
          {
            "from": "apple",
            "to": "an apple"
          },
          {
            "from": "hour",
            "to": "an hour"
          }
        ],
        "sample": "It is an hour's walk to the park.",
        "sampleZh": "走到公园要一小时。"
      },
      {
        "tab": "the",
        "rule": "再次提及、独一无二、双方都知道 → the",
        "focusVerb": "the",
        "examples": [
          {
            "from": "第二次",
            "to": "the cat"
          },
          {
            "from": "the sun",
            "to": "独一无二"
          }
        ],
        "sample": "I saw a cat. The cat was very cute.",
        "sampleZh": "我看见一只猫，那只猫很可爱。"
      }
    ]
  },
  {
    "id": "p11",
    "section": "辨析",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l09-articles-hero.jpg",
    "buckets": [
      {
        "key": "a",
        "label": "a / an"
      },
      {
        "key": "the",
        "label": "the 特指"
      }
    ],
    "items": [
      {
        "text": "I ate an apple.",
        "bucket": "a"
      },
      {
        "text": "The apple was sweet.",
        "bucket": "the"
      },
      {
        "text": "She is a teacher.",
        "bucket": "a"
      },
      {
        "text": "Open the door, please.",
        "bucket": "the"
      },
      {
        "text": "He has an umbrella.",
        "bucket": "a"
      },
      {
        "text": "The sun is bright.",
        "bucket": "the"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l09-articles-hero.jpg",
    "question": "「She is a university student.」为什么用 a 不用 an？",
    "choices": [
      {
        "text": "university 以辅音音素 /j/ 开头",
        "correct": true,
        "fb": "对了！看音素不看字母。u 发 /j/ 时用 a。"
      },
      {
        "text": "university 是专有名词",
        "correct": false,
        "fb": "这是普通名词。"
      },
      {
        "text": "student 是单数所以用 a",
        "correct": false,
        "fb": "关键在 university 的发音。"
      }
    ],
    "sentence": "She is a university student.",
    "zh": "她是一名大学生。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l09-articles-hero.jpg",
    "lead": "第一次出现用 a/an，再次出现改成 the。",
    "items": [
      {
        "from": "I bought pen yesterday.",
        "fromZh": "我昨天买了钢笔。（缺冠词）",
        "steps": [
          {
            "label": "补上第一次提及的冠词",
            "opts": [
              "I bought a pen yesterday.",
              "I bought an pen yesterday.",
              "I bought the pens yesterday."
            ],
            "ans": 0,
            "hint": "pen 辅音开头 → a pen。",
            "sentence": "I bought a pen yesterday.",
            "zh": "我昨天买了一支钢笔。"
          },
          {
            "label": "第二句：这支钢笔很好写",
            "opts": [
              "The pen writes well.",
              "A pen writes well.",
              "An pen writes well."
            ],
            "ans": 0,
            "hint": "再次提及用 the。",
            "sentence": "The pen writes well.",
            "zh": "这支钢笔很好写。"
          }
        ]
      },
      {
        "from": "I saw a cat. The cat was cute.",
        "fromZh": "我看见一只猫。那只猫很可爱。",
        "steps": [
          {
            "label": "改成单数可数名词的正确形式",
            "opts": [
              "I saw a cat. The cat was cute.",
              "I saw an cat. The cat was cute.",
              "I saw the cat. A cat was cute."
            ],
            "ans": 0,
            "hint": "第一次用 a，第二次用 the",
            "sentence": "I saw a cat. The cat was cute.",
            "zh": "我看见一只猫。那只猫很可爱。"
          }
        ]
      },
      {
        "from": "She is a university student.",
        "fromZh": "她是一名大学生。",
        "steps": [
          {
            "label": "判断冠词是否正确",
            "opts": [
              "She is a university student.",
              "She is an university student.",
              "She is the university student."
            ],
            "ans": 0,
            "hint": "university 以辅音音素 /ju:/ 开头",
            "sentence": "She is a university student.",
            "zh": "她是一名大学生。"
          }
        ]
      },
      {
        "from": "He is an honest man.",
        "fromZh": "他是一个诚实的人。",
        "steps": [
          {
            "label": "判断冠词是否正确",
            "opts": [
              "He is an honest man.",
              "He is a honest man.",
              "He is the honest man."
            ],
            "ans": 0,
            "hint": "honest 的 h 不发音，以元音音素开头",
            "sentence": "He is an honest man.",
            "zh": "他是一个诚实的人。"
          }
        ]
      },
      {
        "from": "I have an apple.",
        "fromZh": "我有一个苹果。",
        "steps": [
          {
            "label": "改成复数形式",
            "opts": [
              "I have apples.",
              "I have an apples.",
              "I have the apples."
            ],
            "ans": 0,
            "hint": "复数不需要冠词",
            "sentence": "I have apples.",
            "zh": "我有一些苹果。"
          }
        ]
      },
      {
        "from": "The sun is bright.",
        "fromZh": "太阳很亮。",
        "steps": [
          {
            "label": "判断冠词是否正确",
            "opts": [
              "The sun is bright.",
              "A sun is bright.",
              "An sun is bright."
            ],
            "ans": 0,
            "hint": "太阳独一无二用 the",
            "sentence": "The sun is bright.",
            "zh": "太阳很亮。"
          }
        ]
      },
      {
        "from": "She is a European girl.",
        "fromZh": "她是一个欧洲女孩。",
        "steps": [
          {
            "label": "判断冠词是否正确",
            "opts": [
              "She is a European girl.",
              "She is an European girl.",
              "She is the European girl."
            ],
            "ans": 0,
            "hint": "European 以辅音音素 /j/ 开头",
            "sentence": "She is a European girl.",
            "zh": "她是一个欧洲女孩。"
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
    "image": "kp3d-apple.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "have",
      "an",
      "apple"
    ],
    "sentence": "I have an apple.",
    "zh": "我有一个苹果。",
    "items": [
      {
        "tokens": [
          "I",
          "have",
          "an",
          "apple"
        ],
        "sentence": "I have an apple.",
        "zh": "我有一个苹果。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "She",
          "is",
          "a",
          "teacher"
        ],
        "sentence": "She is a teacher.",
        "zh": "她是一名老师。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "The",
          "sun",
          "is",
          "hot"
        ],
        "sentence": "The sun is hot.",
        "zh": "太阳很热。",
        "image": "kp3d-window.png"
      },
      {
        "tokens": [
          "He",
          "is",
          "an",
          "honest",
          "boy"
        ],
        "sentence": "He is an honest boy.",
        "zh": "他是一个诚实的男孩。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "I",
          "saw",
          "a",
          "panda",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "I saw a panda in the zoo.",
        "zh": "我在动物园看到一只熊猫。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "The",
          "bus",
          "is",
          "coming"
        ],
        "sentence": "The bus is coming.",
        "zh": "公交车来了。",
        "image": "kp3d-bus.png"
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
    "image": "l09-articles-hero.jpg",
    "audio": "I saw a cat. The cat was very cute.",
    "tokens": [
      "I",
      "saw",
      "a",
      "cat",
      "The",
      "cat",
      "was",
      "very",
      "cute"
    ],
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l09-articles-hero.jpg",
    "q": "My father is _____ honest man.",
    "opts": [
      "a",
      "an",
      "the"
    ],
    "ans": 1,
    "hint": "honest 发音以元音 /ɒ/ 开头，用 an。",
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l09-articles-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "My father is _____ honest man.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 发音以元音 /ɒ/ 开头，用 an。",
        "sentence": "I saw a cat. The cat was very cute.",
        "zh": "我看见一只猫，那只猫很可爱。"
      },
      {
        "q": "I have _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音 /j/ 开头 → a。",
        "sentence": "I have a useful book.",
        "zh": "我有一本有用的书。"
      },
      {
        "q": "_____ sun rises in the east.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "独一无二的天体用 the。",
        "sentence": "The sun rises in the east.",
        "zh": "太阳从东方升起。"
      },
      {
        "q": "He plays _____ piano every day.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "乐器前用 the。",
        "sentence": "He plays the piano every day.",
        "zh": "他每天弹钢琴。"
      },
      {
        "q": "It took me _____ hour to finish it.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "hour 的 h 不发音 → an hour。",
        "sentence": "It took me an hour to finish it.",
        "zh": "我花了一小时做完。"
      },
      {
        "q": "There is _____ apple on _____ table.",
        "opts": [
          "a; the",
          "an; the",
          "an; a"
        ],
        "ans": 1,
        "hint": "apple 用 an；双方都知道的桌子用 the。",
        "sentence": "There is an apple on the table.",
        "zh": "桌子上有一个苹果。"
      },
      {
        "q": "I have _____ apple.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "apple 以元音音素开头",
        "sentence": "I have an apple.",
        "zh": "我有一个苹果。"
      },
      {
        "q": "She is _____ teacher.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "teacher 以辅音音素开头",
        "sentence": "She is a teacher.",
        "zh": "她是一名老师。"
      },
      {
        "q": "_____ sun is very hot.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "太阳是独一无二的，用 the",
        "sentence": "The sun is very hot.",
        "zh": "太阳很热。"
      },
      {
        "q": "He is _____ honest boy.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 的 h 不发音，以元音音素开头",
        "sentence": "He is an honest boy.",
        "zh": "他是一个诚实的男孩。"
      },
      {
        "q": "I saw _____ elephant in the zoo.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "elephant 以元音音素开头",
        "sentence": "I saw an elephant in the zoo.",
        "zh": "我在动物园看到一头大象。"
      },
      {
        "q": "She is _____ university student.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "university 以辅音音素 /ju:/ 开头",
        "sentence": "She is a university student.",
        "zh": "她是一名大学生。"
      },
      {
        "q": "This is _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音音素 /ju:/ 开头",
        "sentence": "This is a useful book.",
        "zh": "这是一本有用的书。"
      },
      {
        "q": "I have _____ umbrella.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "umbrella 以元音音素开头",
        "sentence": "I have an umbrella.",
        "zh": "我有一把伞。"
      },
      {
        "q": "He is _____ one-year-old boy.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "one 的发音以辅音音素 /w/ 开头",
        "sentence": "He is a one-year-old boy.",
        "zh": "他是一个一岁的男孩。"
      },
      {
        "q": "The panda is _____ animal.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "animal 以元音音素开头",
        "sentence": "The panda is an animal.",
        "zh": "熊猫是一种动物。"
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
        "q": "My father is _____ honest man.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 发音以元音 /ɒ/ 开头，用 an。",
        "sentence": "I saw a cat. The cat was very cute.",
        "zh": "我看见一只猫，那只猫很可爱。"
      },
      {
        "q": "I have _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音 /j/ 开头 → a。",
        "sentence": "I have a useful book.",
        "zh": "我有一本有用的书。"
      },
      {
        "q": "_____ sun rises in the east.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "独一无二的天体用 the。",
        "sentence": "The sun rises in the east.",
        "zh": "太阳从东方升起。"
      },
      {
        "q": "He plays _____ piano every day.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "乐器前用 the。",
        "sentence": "He plays the piano every day.",
        "zh": "他每天弹钢琴。"
      },
      {
        "q": "It took me _____ hour to finish it.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "hour 的 h 不发音 → an hour。",
        "sentence": "It took me an hour to finish it.",
        "zh": "我花了一小时做完。"
      },
      {
        "q": "There is _____ apple on _____ table.",
        "opts": [
          "a; the",
          "an; the",
          "an; a"
        ],
        "ans": 1,
        "hint": "apple 用 an；双方都知道的桌子用 the。",
        "sentence": "There is an apple on the table.",
        "zh": "桌子上有一个苹果。"
      },
      {
        "q": "I have _____ apple.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "apple 以元音音素开头",
        "sentence": "I have an apple.",
        "zh": "我有一个苹果。"
      },
      {
        "q": "She is _____ teacher.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "teacher 以辅音音素开头",
        "sentence": "She is a teacher.",
        "zh": "她是一名老师。"
      },
      {
        "q": "_____ sun is very hot.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "太阳是独一无二的，用 the",
        "sentence": "The sun is very hot.",
        "zh": "太阳很热。"
      },
      {
        "q": "He is _____ honest boy.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 的 h 不发音，以元音音素开头",
        "sentence": "He is an honest boy.",
        "zh": "他是一个诚实的男孩。"
      },
      {
        "q": "I saw _____ elephant in the zoo.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "elephant 以元音音素开头",
        "sentence": "I saw an elephant in the zoo.",
        "zh": "我在动物园看到一头大象。"
      },
      {
        "q": "She is _____ university student.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "university 以辅音音素 /ju:/ 开头",
        "sentence": "She is a university student.",
        "zh": "她是一名大学生。"
      },
      {
        "q": "This is _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音音素 /ju:/ 开头",
        "sentence": "This is a useful book.",
        "zh": "这是一本有用的书。"
      },
      {
        "q": "I have _____ umbrella.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "umbrella 以元音音素开头",
        "sentence": "I have an umbrella.",
        "zh": "我有一把伞。"
      },
      {
        "q": "He is _____ one-year-old boy.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "one 的发音以辅音音素 /w/ 开头",
        "sentence": "He is a one-year-old boy.",
        "zh": "他是一个一岁的男孩。"
      },
      {
        "q": "The panda is _____ animal.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "animal 以元音音素开头",
        "sentence": "The panda is an animal.",
        "zh": "熊猫是一种动物。"
      },
      {
        "q": "I like _____ moon.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "月亮是独一无二的",
        "sentence": "I like the moon.",
        "zh": "我喜欢月亮。"
      },
      {
        "q": "She is _____ European girl.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "European 以辅音音素 /j/ 开头",
        "sentence": "She is a European girl.",
        "zh": "她是一个欧洲女孩。"
      },
      {
        "q": "We had _____ dinner at home.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "dinner 以辅音音素开头",
        "sentence": "We had a dinner at home.",
        "zh": "我们在家吃了一顿晚饭。"
      },
      {
        "q": "I want to buy _____ piano.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "piano 以辅音音素开头",
        "sentence": "I want to buy a piano.",
        "zh": "我想买一架钢琴。"
      },
      {
        "q": "_____ bus is coming.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "特指那辆公交车",
        "sentence": "The bus is coming.",
        "zh": "公交车来了。"
      },
      {
        "q": "I saw _____ cat. _____ cat was black.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 0,
        "hint": "第一次提到用 a，再次提到用 the",
        "sentence": "I saw a cat. The cat was black.",
        "zh": "我看见一只猫。那只猫是黑色的。"
      },
      {
        "q": "He has _____ apple and _____ banana.",
        "opts": [
          "a; a",
          "an; a",
          "an; an"
        ],
        "ans": 1,
        "hint": "apple 用 an，banana 用 a",
        "sentence": "He has an apple and a banana.",
        "zh": "他有一个苹果和一根香蕉。"
      },
      {
        "q": "There is _____ book on the desk. _____ book is new.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 0,
        "hint": "第一次提到用 a，再次提到用 the",
        "sentence": "There is a book on the desk. The book is new.",
        "zh": "桌子上有一本书。这本书是新的。"
      },
      {
        "q": "She is _____ English teacher.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "English 以元音音素开头",
        "sentence": "She is an English teacher.",
        "zh": "她是一名英语老师。"
      },
      {
        "q": "I like _____ basketball.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "basketball 以辅音音素开头",
        "sentence": "I like a basketball.",
        "zh": "我喜欢一个篮球。"
      },
      {
        "q": "The doctor gave me _____ advice.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "advice 不可数，但这里特指医生给的忠告",
        "sentence": "The doctor gave me the advice.",
        "zh": "医生给了我忠告。"
      },
      {
        "q": "I have _____ idea.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "idea 以元音音素开头",
        "sentence": "I have an idea.",
        "zh": "我有一个主意。"
      },
      {
        "q": "She is _____ tallest girl in our class.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前用 the",
        "sentence": "She is the tallest girl in our class.",
        "zh": "她是我们班最高的女孩。"
      },
      {
        "q": "I saw _____ elephant. _____ elephant was big.",
        "opts": [
          "a; The",
          "an; The",
          "the; An"
        ],
        "ans": 1,
        "hint": "第一次提到用 an，再次提到用 the",
        "sentence": "I saw an elephant. The elephant was big.",
        "zh": "我看见一头大象。那头大象很大。"
      },
      {
        "q": "He is _____ honest man.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 以元音音素开头",
        "sentence": "He is an honest man.",
        "zh": "他是一个诚实的人。"
      },
      {
        "q": "This is _____ one-way street.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "one 以辅音音素 /w/ 开头",
        "sentence": "This is a one-way street.",
        "zh": "这是一条单行道。"
      },
      {
        "q": "I have _____ apple. _____ apple is red.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 1,
        "hint": "第一次提到用 an，再次提到用 the",
        "sentence": "I have an apple. The apple is red.",
        "zh": "我有一个苹果。这个苹果是红色的。"
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
        "q": "My father is _____ honest man.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 发音以元音 /ɒ/ 开头，用 an。",
        "sentence": "I saw a cat. The cat was very cute.",
        "zh": "我看见一只猫，那只猫很可爱。"
      },
      {
        "q": "I have _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音 /j/ 开头 → a。",
        "sentence": "I have a useful book.",
        "zh": "我有一本有用的书。"
      },
      {
        "q": "_____ sun rises in the east.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "独一无二的天体用 the。",
        "sentence": "The sun rises in the east.",
        "zh": "太阳从东方升起。"
      },
      {
        "q": "He plays _____ piano every day.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "乐器前用 the。",
        "sentence": "He plays the piano every day.",
        "zh": "他每天弹钢琴。"
      },
      {
        "q": "It took me _____ hour to finish it.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "hour 的 h 不发音 → an hour。",
        "sentence": "It took me an hour to finish it.",
        "zh": "我花了一小时做完。"
      },
      {
        "q": "There is _____ apple on _____ table.",
        "opts": [
          "a; the",
          "an; the",
          "an; a"
        ],
        "ans": 1,
        "hint": "apple 用 an；双方都知道的桌子用 the。",
        "sentence": "There is an apple on the table.",
        "zh": "桌子上有一个苹果。"
      },
      {
        "q": "I have _____ apple.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "apple 以元音音素开头",
        "sentence": "I have an apple.",
        "zh": "我有一个苹果。"
      },
      {
        "q": "She is _____ teacher.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "teacher 以辅音音素开头",
        "sentence": "She is a teacher.",
        "zh": "她是一名老师。"
      },
      {
        "q": "_____ sun is very hot.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "太阳是独一无二的，用 the",
        "sentence": "The sun is very hot.",
        "zh": "太阳很热。"
      },
      {
        "q": "He is _____ honest boy.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 的 h 不发音，以元音音素开头",
        "sentence": "He is an honest boy.",
        "zh": "他是一个诚实的男孩。"
      },
      {
        "q": "I saw _____ elephant in the zoo.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "elephant 以元音音素开头",
        "sentence": "I saw an elephant in the zoo.",
        "zh": "我在动物园看到一头大象。"
      },
      {
        "q": "She is _____ university student.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "university 以辅音音素 /ju:/ 开头",
        "sentence": "She is a university student.",
        "zh": "她是一名大学生。"
      },
      {
        "q": "This is _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音音素 /ju:/ 开头",
        "sentence": "This is a useful book.",
        "zh": "这是一本有用的书。"
      },
      {
        "q": "I have _____ umbrella.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "umbrella 以元音音素开头",
        "sentence": "I have an umbrella.",
        "zh": "我有一把伞。"
      },
      {
        "q": "He is _____ one-year-old boy.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "one 的发音以辅音音素 /w/ 开头",
        "sentence": "He is a one-year-old boy.",
        "zh": "他是一个一岁的男孩。"
      },
      {
        "q": "The panda is _____ animal.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "animal 以元音音素开头",
        "sentence": "The panda is an animal.",
        "zh": "熊猫是一种动物。"
      },
      {
        "q": "I like _____ moon.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "月亮是独一无二的",
        "sentence": "I like the moon.",
        "zh": "我喜欢月亮。"
      },
      {
        "q": "She is _____ European girl.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "European 以辅音音素 /j/ 开头",
        "sentence": "She is a European girl.",
        "zh": "她是一个欧洲女孩。"
      },
      {
        "q": "We had _____ dinner at home.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "dinner 以辅音音素开头",
        "sentence": "We had a dinner at home.",
        "zh": "我们在家吃了一顿晚饭。"
      },
      {
        "q": "I want to buy _____ piano.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "piano 以辅音音素开头",
        "sentence": "I want to buy a piano.",
        "zh": "我想买一架钢琴。"
      },
      {
        "q": "_____ bus is coming.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "特指那辆公交车",
        "sentence": "The bus is coming.",
        "zh": "公交车来了。"
      },
      {
        "q": "I saw _____ cat. _____ cat was black.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 0,
        "hint": "第一次提到用 a，再次提到用 the",
        "sentence": "I saw a cat. The cat was black.",
        "zh": "我看见一只猫。那只猫是黑色的。"
      },
      {
        "q": "He has _____ apple and _____ banana.",
        "opts": [
          "a; a",
          "an; a",
          "an; an"
        ],
        "ans": 1,
        "hint": "apple 用 an，banana 用 a",
        "sentence": "He has an apple and a banana.",
        "zh": "他有一个苹果和一根香蕉。"
      },
      {
        "q": "There is _____ book on the desk. _____ book is new.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 0,
        "hint": "第一次提到用 a，再次提到用 the",
        "sentence": "There is a book on the desk. The book is new.",
        "zh": "桌子上有一本书。这本书是新的。"
      },
      {
        "q": "She is _____ English teacher.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "English 以元音音素开头",
        "sentence": "She is an English teacher.",
        "zh": "她是一名英语老师。"
      },
      {
        "q": "I like _____ basketball.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "basketball 以辅音音素开头",
        "sentence": "I like a basketball.",
        "zh": "我喜欢一个篮球。"
      },
      {
        "q": "The doctor gave me _____ advice.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "advice 不可数，但这里特指医生给的忠告",
        "sentence": "The doctor gave me the advice.",
        "zh": "医生给了我忠告。"
      },
      {
        "q": "I have _____ idea.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "idea 以元音音素开头",
        "sentence": "I have an idea.",
        "zh": "我有一个主意。"
      },
      {
        "q": "She is _____ tallest girl in our class.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前用 the",
        "sentence": "She is the tallest girl in our class.",
        "zh": "她是我们班最高的女孩。"
      },
      {
        "q": "I saw _____ elephant. _____ elephant was big.",
        "opts": [
          "a; The",
          "an; The",
          "the; An"
        ],
        "ans": 1,
        "hint": "第一次提到用 an，再次提到用 the",
        "sentence": "I saw an elephant. The elephant was big.",
        "zh": "我看见一头大象。那头大象很大。"
      },
      {
        "q": "He is _____ honest man.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 以元音音素开头",
        "sentence": "He is an honest man.",
        "zh": "他是一个诚实的人。"
      },
      {
        "q": "This is _____ one-way street.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "one 以辅音音素 /w/ 开头",
        "sentence": "This is a one-way street.",
        "zh": "这是一条单行道。"
      },
      {
        "q": "I have _____ apple. _____ apple is red.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 1,
        "hint": "第一次提到用 an，再次提到用 the",
        "sentence": "I have an apple. The apple is red.",
        "zh": "我有一个苹果。这个苹果是红色的。"
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
    "image": "l09-articles-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "a cat",
        "zh": "一只猫（辅音）"
      },
      {
        "en": "an hour",
        "zh": "一小时（h 不发音）"
      },
      {
        "en": "the sun",
        "zh": "太阳（独一无二）"
      },
      {
        "en": "the piano",
        "zh": "钢琴（乐器）"
      },
      {
        "en": "an apple",
        "zh": "一个苹果"
      },
      {
        "en": "the moon",
        "zh": "月亮"
      },
      {
        "en": "a university",
        "zh": "一所大学"
      },
      {
        "en": "an honest man",
        "zh": "一个诚实的人"
      },
      {
        "en": "an umbrella",
        "zh": "一把伞"
      },
      {
        "en": "a one-way street",
        "zh": "一条单行道"
      },
      {
        "en": "the bus",
        "zh": "那辆公交车"
      },
      {
        "en": "a panda",
        "zh": "一只熊猫"
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
    "image": "l09-articles-hero.jpg",
    "audio": "I have an apple.",
    "opts": [
      "I have an apple.",
      "I have a apple.",
      "I have the apple."
    ],
    "ans": 0,
    "hint": "apple 用 an",
    "sentence": "I have an apple.",
    "zh": "我有一个苹果。",
    "questions": [
      {
        "audio": "I have an apple.",
        "opts": [
          "I have an apple.",
          "I have a apple.",
          "I have the apple."
        ],
        "ans": 0,
        "hint": "apple 用 an",
        "zh": "我有一个苹果。",
        "sentence": "I have an apple."
      },
      {
        "audio": "She is a university student.",
        "opts": [
          "She is a university student.",
          "She is an university student.",
          "She is the university student."
        ],
        "ans": 0,
        "hint": "university 用 a",
        "zh": "她是一名大学生。",
        "sentence": "She is a university student."
      },
      {
        "audio": "The moon is bright.",
        "opts": [
          "The moon is bright.",
          "A moon is bright.",
          "An moon is bright."
        ],
        "ans": 0,
        "hint": "月亮用 the",
        "zh": "月亮很亮。",
        "sentence": "The moon is bright."
      },
      {
        "audio": "He is an honest man.",
        "opts": [
          "He is an honest man.",
          "He is a honest man.",
          "He is the honest man."
        ],
        "ans": 0,
        "hint": "honest 用 an",
        "zh": "他是一个诚实的人。",
        "sentence": "He is an honest man."
      },
      {
        "audio": "I saw a cat. The cat was cute.",
        "opts": [
          "I saw a cat. The cat was cute.",
          "I saw an cat. The cat was cute.",
          "I saw the cat. A cat was cute."
        ],
        "ans": 0,
        "hint": "第一次用 a，第二次用 the",
        "zh": "我看见一只猫。那只猫很可爱。",
        "sentence": "I saw a cat. The cat was cute."
      },
      {
        "audio": "She has an umbrella.",
        "opts": [
          "She has an umbrella.",
          "She has a umbrella.",
          "She has the umbrella."
        ],
        "ans": 0,
        "hint": "umbrella 用 an",
        "zh": "她有一把伞。",
        "sentence": "She has an umbrella."
      },
      {
        "audio": "The bus is coming.",
        "opts": [
          "The bus is coming.",
          "A bus is coming.",
          "An bus is coming."
        ],
        "ans": 0,
        "hint": "特指那辆公交车",
        "zh": "公交车来了。",
        "sentence": "The bus is coming."
      },
      {
        "audio": "I like the panda.",
        "opts": [
          "I like the panda.",
          "I like a panda.",
          "I like an panda."
        ],
        "ans": 0,
        "hint": "特指那只熊猫",
        "zh": "我喜欢那只熊猫。",
        "sentence": "I like the panda."
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
    "image": "l09-articles-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I saw a cat. The cat was very cute.",
        "zh": "我看见一只猫。那只猫很可爱。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "My father is an honest man.",
        "zh": "我爸爸是一个诚实的人。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She is a university student.",
        "zh": "她是一名大学生。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "There is an apple on the table.",
        "zh": "桌子上有一个苹果。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The moon is bright tonight.",
        "zh": "今晚月亮很亮。",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "I have a basketball. The basketball is new.",
        "zh": "我有一个篮球。这个篮球是新的。",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "He is an English teacher.",
        "zh": "他是一名英语老师。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We saw an elephant in the zoo.",
        "zh": "我们在动物园看到一头大象。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The sun rises in the east.",
        "zh": "太阳从东方升起。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "She has an umbrella because it is rainy.",
        "zh": "她带了一把伞，因为下雨了。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The doctor is very kind.",
        "zh": "那位医生很和蔼。",
        "tag": "daily_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "This is a useful book.",
        "zh": "这是一本有用的书。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "I want to buy a piano for my sister.",
        "zh": "我想给我妹妹买一架钢琴。",
        "tag": "daily_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The bus is coming.",
        "zh": "公交车来了。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "We had a dinner at home.",
        "zh": "我们在家吃了一顿晚饭。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The panda is eating bamboo.",
        "zh": "那只熊猫正在吃竹子。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "He is a one-year-old boy.",
        "zh": "他是一个一岁的男孩。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I have an idea.",
        "zh": "我有一个主意。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The Great Wall is famous.",
        "zh": "长城很出名。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "She is an honest girl.",
        "zh": "她是一个诚实的女孩。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "He bought a new car. The car is red.",
        "zh": "他买了一辆新车。这辆车是红色的。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "I see a bird in the tree.",
        "zh": "我看见树上有一只鸟。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The earth is round.",
        "zh": "地球是圆的。",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "She is a European girl.",
        "zh": "她是一个欧洲女孩。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
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
    "image": "l09-articles-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "I like _____ moon.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "月亮是独一无二的",
        "sentence": "I like the moon.",
        "zh": "我喜欢月亮。"
      },
      {
        "q": "She is _____ European girl.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "European 以辅音音素 /j/ 开头",
        "sentence": "She is a European girl.",
        "zh": "她是一个欧洲女孩。"
      },
      {
        "q": "We had _____ dinner at home.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "dinner 以辅音音素开头",
        "sentence": "We had a dinner at home.",
        "zh": "我们在家吃了一顿晚饭。"
      },
      {
        "q": "I want to buy _____ piano.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "piano 以辅音音素开头",
        "sentence": "I want to buy a piano.",
        "zh": "我想买一架钢琴。"
      },
      {
        "q": "_____ bus is coming.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "特指那辆公交车",
        "sentence": "The bus is coming.",
        "zh": "公交车来了。"
      },
      {
        "q": "I saw _____ cat. _____ cat was black.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 0,
        "hint": "第一次提到用 a，再次提到用 the",
        "sentence": "I saw a cat. The cat was black.",
        "zh": "我看见一只猫。那只猫是黑色的。"
      },
      {
        "q": "He has _____ apple and _____ banana.",
        "opts": [
          "a; a",
          "an; a",
          "an; an"
        ],
        "ans": 1,
        "hint": "apple 用 an，banana 用 a",
        "sentence": "He has an apple and a banana.",
        "zh": "他有一个苹果和一根香蕉。"
      },
      {
        "q": "There is _____ book on the desk. _____ book is new.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 0,
        "hint": "第一次提到用 a，再次提到用 the",
        "sentence": "There is a book on the desk. The book is new.",
        "zh": "桌子上有一本书。这本书是新的。"
      },
      {
        "q": "She is _____ English teacher.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "English 以元音音素开头",
        "sentence": "She is an English teacher.",
        "zh": "她是一名英语老师。"
      },
      {
        "q": "I like _____ basketball.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "basketball 以辅音音素开头",
        "sentence": "I like a basketball.",
        "zh": "我喜欢一个篮球。"
      },
      {
        "q": "The doctor gave me _____ advice.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "advice 不可数，但这里特指医生给的忠告",
        "sentence": "The doctor gave me the advice.",
        "zh": "医生给了我忠告。"
      },
      {
        "q": "I have _____ idea.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "idea 以元音音素开头",
        "sentence": "I have an idea.",
        "zh": "我有一个主意。"
      },
      {
        "q": "She is _____ tallest girl in our class.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "最高级前用 the",
        "sentence": "She is the tallest girl in our class.",
        "zh": "她是我们班最高的女孩。"
      },
      {
        "q": "I saw _____ elephant. _____ elephant was big.",
        "opts": [
          "a; The",
          "an; The",
          "the; An"
        ],
        "ans": 1,
        "hint": "第一次提到用 an，再次提到用 the",
        "sentence": "I saw an elephant. The elephant was big.",
        "zh": "我看见一头大象。那头大象很大。"
      },
      {
        "q": "He is _____ honest man.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "honest 以元音音素开头",
        "sentence": "He is an honest man.",
        "zh": "他是一个诚实的人。"
      },
      {
        "q": "This is _____ one-way street.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "one 以辅音音素 /w/ 开头",
        "sentence": "This is a one-way street.",
        "zh": "这是一条单行道。"
      },
      {
        "q": "I have _____ apple. _____ apple is red.",
        "opts": [
          "a; The",
          "an; The",
          "the; A"
        ],
        "ans": 1,
        "hint": "第一次提到用 an，再次提到用 the",
        "sentence": "I have an apple. The apple is red.",
        "zh": "我有一个苹果。这个苹果是红色的。"
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
      "辅音音素 → a；元音音素 → an（hour, honest 用 an）",
      "再次提到 → the",
      "写作：I bought a pen. The pen writes well.",
      "看音素不看字母：hour/honest 用 an；university/useful 用 a。",
      "乐器、世上独一无二：the piano, the moon。"
    ],
    "chant": "First time a or an, next time the! Vowel sound? An — you'll see!",
    "chantSpeak": "First time a or an, next time the! Vowel sound, an, you will see!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "冠词 a / an / the",
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