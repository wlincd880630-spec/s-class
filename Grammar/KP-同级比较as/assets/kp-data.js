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
    "audio": "Tom is as tall as his brother.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。",
    "image": "w4-asas-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-asas-hero.jpg",
    "question": "as tall as 表示什么关系？",
    "choices": [
      {
        "text": "同级比较（一样高）",
        "correct": true,
        "fb": "对了！as + 原级 + as。"
      },
      {
        "text": "汤姆更高",
        "correct": false,
        "fb": "更高用 taller than。"
      },
      {
        "text": "汤姆更矮",
        "correct": false,
        "fb": "更矮用 shorter than。"
      }
    ],
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-asas-hero.jpg",
    "lead": "两者程度相同：as + 原级 + as。",
    "formula": "A is as + 原级 + as B",
    "parts": [
      {
        "mark": "as",
        "label": "第一个 as",
        "example": "as"
      },
      {
        "mark": "原级",
        "label": "不用 -er",
        "example": "tall"
      },
      {
        "mark": "as",
        "label": "第二个 as",
        "example": "as his brother"
      }
    ],
    "samples": [
      {
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "sentence": "This book is not as interesting as that one.",
        "zh": "这本书不如那本有趣。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-asas-same.jpg",
    "rightImage": "w4-asas-than.jpg",
    "leftLabel": "as tall as",
    "rightLabel": "taller than",
    "leftSentence": "Tom is as tall as Jim.",
    "leftZh": "汤姆和吉姆一样高。",
    "rightSentence": "Tom is taller than Jim.",
    "rightZh": "汤姆比吉姆高。",
    "morphBase": "as tall as",
    "morphPast": "taller than",
    "morphHighlight": "",
    "discovery": "as…as 同级；than 比较级；not as…as = 不如。"
  },
  {
    "section": "精讲",
    "title": "例句 · 一样高",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-asas-hero.jpg",
    "lead": "tall 保持原级，不加 -er。",
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 不如",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-asas-hero.jpg",
    "lead": "not as…as = 不如。",
    "sentence": "This story is not as long as that one.",
    "zh": "这个故事不如那个长。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "同级比较 as...as 的否定句",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "表示不如，用 not as + 原级 + as。",
    "sentence": "This book is not as interesting as that one.",
    "zh": "这本书不如那本有趣。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "同级比较 as...as 的写作运用",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "写比喻或比较时，用 as...as 让句子更生动。",
    "sentence": "Her smile is as warm as the sun.",
    "zh": "她的微笑像太阳一样温暖。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-asas-hero.jpg",
    "lead": "同级 vs 比较级。",
    "rules": [
      {
        "tab": "as…as",
        "rule": "as + 形容词/副词原级 + as（一样）",
        "focusVerb": "as",
        "examples": [
          {
            "from": "tall",
            "to": "as tall as"
          }
        ],
        "sample": "Tom is as tall as his brother.",
        "sampleZh": "汤姆和他哥哥一样高。"
      },
      {
        "tab": "not as…as",
        "rule": "not as…as = 不如……",
        "focusVerb": "not",
        "examples": [
          {
            "from": "not as fast",
            "to": "不如快"
          }
        ],
        "sample": "She is not as tall as me.",
        "sampleZh": "她不如我高。"
      }
    ]
  },
  {
    "id": "p10",
    "section": "辨析",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-asas-hero.jpg",
    "buckets": [
      {
        "key": "as",
        "label": "as…as 同级"
      },
      {
        "key": "than",
        "label": "比较级 + than"
      }
    ],
    "items": [
      {
        "text": "as fast as",
        "bucket": "as"
      },
      {
        "text": "faster than",
        "bucket": "than"
      },
      {
        "text": "not as big as",
        "bucket": "as"
      },
      {
        "text": "bigger than",
        "bucket": "than"
      },
      {
        "text": "as carefully as",
        "bucket": "as"
      },
      {
        "text": "more carefully than",
        "bucket": "than"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-asas-hero.jpg",
    "question": "「He is as taller as me.」应改成？",
    "choices": [
      {
        "text": "as tall as（中间用原级）",
        "correct": true,
        "fb": "as…as 夹原级。"
      },
      {
        "text": "taller as",
        "correct": false,
        "fb": "比较级配 than，不配 as。"
      },
      {
        "text": "as more tall as",
        "correct": false,
        "fb": "更错。"
      }
    ],
    "sentence": "He is as tall as me.",
    "zh": "他和我一样高。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-asas-hero.jpg",
    "lead": "比较级句改成 not as…as。",
    "items": [
      {
        "from": "Jack is taller than Tom.",
        "fromZh": "杰克比汤姆高。",
        "steps": [
          {
            "label": "改成：汤姆不如杰克高",
            "opts": [
              "Tom is not as tall as Jack.",
              "Tom is not as taller as Jack.",
              "Tom is not taller as Jack."
            ],
            "ans": 0,
            "hint": "not as + 原级 + as。",
            "sentence": "Tom is not as tall as Jack.",
            "zh": "汤姆不如杰克高。"
          }
        ]
      },
      {
        "from": "He is as taller as me.",
        "fromZh": "他和我一样高。",
        "steps": [
          {
            "label": "改成正确的同级比较",
            "opts": [
              "He is as tall as me.",
              "He is as taller as I.",
              "He is so tall as me."
            ],
            "ans": 0,
            "hint": "as 后用原级，不加 er",
            "sentence": "He is as tall as me.",
            "zh": "他和我一样高。"
          }
        ]
      },
      {
        "from": "This book is as more interesting as that one.",
        "fromZh": "这本书和那本一样有趣。",
        "steps": [
          {
            "label": "改成正确的同级比较",
            "opts": [
              "This book is as interesting as that one.",
              "This book is as more interesting as that one.",
              "This book is as interesting than that one."
            ],
            "ans": 0,
            "hint": "as...as 中间用原级，不加 more",
            "sentence": "This book is as interesting as that one.",
            "zh": "这本书和那本一样有趣。"
          }
        ]
      },
      {
        "from": "She runs as faster as her brother.",
        "fromZh": "她跑得和她哥哥一样快。",
        "steps": [
          {
            "label": "改成正确的同级比较",
            "opts": [
              "She runs as fast as her brother.",
              "She runs as faster as her brother.",
              "She runs as fast than her brother."
            ],
            "ans": 0,
            "hint": "as 后用副词原级",
            "sentence": "She runs as fast as her brother.",
            "zh": "她跑得和她哥哥一样快。"
          }
        ]
      },
      {
        "from": "The panda is as fat than the bear.",
        "fromZh": "熊猫和熊一样胖。",
        "steps": [
          {
            "label": "改成正确的同级比较",
            "opts": [
              "The panda is as fat as the bear.",
              "The panda is as fat than the bear.",
              "The panda is fatter as the bear."
            ],
            "ans": 0,
            "hint": "同级比较用 as...as，不用 than",
            "sentence": "The panda is as fat as the bear.",
            "zh": "熊猫和熊一样胖。"
          }
        ]
      },
      {
        "from": "My bag is not so heavy as yours.",
        "fromZh": "我的书包不如你的重。",
        "steps": [
          {
            "label": "改成更常见的否定同级比较",
            "opts": [
              "My bag is not as heavy as yours.",
              "My bag is not so heavy than yours.",
              "My bag is as heavy as yours."
            ],
            "ans": 0,
            "hint": "否定常用 not as...as",
            "sentence": "My bag is not as heavy as yours.",
            "zh": "我的书包不如你的重。"
          }
        ]
      },
      {
        "from": "He is as tall like his father.",
        "fromZh": "他和他爸爸一样高。",
        "steps": [
          {
            "label": "改成正确的同级比较",
            "opts": [
              "He is as tall as his father.",
              "He is as tall like his father.",
              "He is so tall as his father."
            ],
            "ans": 0,
            "hint": "as...as 固定搭配，不用 like",
            "sentence": "He is as tall as his father.",
            "zh": "他和他爸爸一样高。"
          }
        ]
      }
    ],
    "id": "p12"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3d-panda.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "The",
      "panda",
      "is",
      "as",
      "cute",
      "as",
      "the",
      "bear"
    ],
    "sentence": "The panda is as cute as the bear.",
    "zh": "熊猫和熊一样可爱。",
    "items": [
      {
        "tokens": [
          "The",
          "panda",
          "is",
          "as",
          "cute",
          "as",
          "the",
          "bear"
        ],
        "sentence": "The panda is as cute as the bear.",
        "zh": "熊猫和熊一样可爱。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "My",
          "bag",
          "is",
          "as",
          "heavy",
          "as",
          "yours"
        ],
        "sentence": "My bag is as heavy as yours.",
        "zh": "我的书包和你的一样重。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "This",
          "apple",
          "is",
          "as",
          "sweet",
          "as",
          "that",
          "one"
        ],
        "sentence": "This apple is as sweet as that one.",
        "zh": "这个苹果和那个一样甜。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "The",
          "bus",
          "is",
          "as",
          "crowded",
          "as",
          "the",
          "subway"
        ],
        "sentence": "The bus is as crowded as the subway.",
        "zh": "公交车和地铁一样拥挤。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "She",
          "sings",
          "as",
          "well",
          "as",
          "her",
          "sister"
        ],
        "sentence": "She sings as well as her sister.",
        "zh": "她唱歌和她姐姐一样好。",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "The",
          "red",
          "dress",
          "is",
          "as",
          "pretty",
          "as",
          "the",
          "blue",
          "one"
        ],
        "sentence": "The red dress is as pretty as the blue one.",
        "zh": "红裙子和蓝裙子一样漂亮。",
        "image": "kp3d-shop.png"
      }
    ],
    "id": "p13"
  },
  {
    "id": "p14",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-asas-hero.jpg",
    "audio": "Tom is as tall as his brother.",
    "tokens": [
      "Tom",
      "is",
      "as",
      "tall",
      "as",
      "his",
      "brother"
    ],
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "id": "p15",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-asas-hero.jpg",
    "q": "My brother is _____ me.",
    "opts": [
      "as tall as",
      "taller as",
      "as taller as"
    ],
    "ans": 0,
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-asas-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "My brother is _____ me.",
        "opts": [
          "as tall as",
          "taller as",
          "as taller as"
        ],
        "ans": 0,
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "q": "She runs _____ fast _____ Lily.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as fast as。",
        "sentence": "She runs as fast as Lily.",
        "zh": "她跑得和莉莉一样快。"
      },
      {
        "q": "This bag is not _____ expensive _____ that one.",
        "opts": [
          "as; as",
          "so; so",
          "more; as"
        ],
        "ans": 0,
        "hint": "not as…as。",
        "sentence": "This bag is not as expensive as that one.",
        "zh": "这个包不如那个贵。"
      },
      {
        "q": "Math is _____ interesting as PE. （否定）",
        "opts": [
          "as",
          "not as",
          "more as"
        ],
        "ans": 1,
        "hint": "not as interesting as。",
        "sentence": "Math is not as interesting as PE.",
        "zh": "数学不如体育有趣。"
      },
      {
        "q": "He has _____ many books _____ I do.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as many + 复数 + as。",
        "sentence": "He has as many books as I do.",
        "zh": "他的书和我的一样多。"
      },
      {
        "q": "Please come _____ possible.",
        "opts": [
          "as soon as",
          "as soon than",
          "so soon as"
        ],
        "ans": 0,
        "hint": "as soon as possible。",
        "sentence": "Please come as soon as possible.",
        "zh": "请尽快来。"
      },
      {
        "q": "This apple is _____ sweet as that one.",
        "opts": [
          "as",
          "so",
          "more"
        ],
        "ans": 0,
        "hint": "as...as 中间用原级",
        "sentence": "This apple is as sweet as that one.",
        "zh": "这个苹果和那个一样甜。"
      },
      {
        "q": "My dog is as _____ as your cat.",
        "opts": [
          "cute",
          "cuter",
          "cutes"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "My dog is as cute as your cat.",
        "zh": "我的狗和你的猫一样可爱。"
      },
      {
        "q": "The bus is not _____ fast as the bike.",
        "opts": [
          "as",
          "so",
          "very"
        ],
        "ans": 0,
        "hint": "否定也用 as...as",
        "sentence": "The bus is not as fast as the bike.",
        "zh": "公交车不如自行车快。"
      },
      {
        "q": "She is as _____ as her mother.",
        "opts": [
          "tall",
          "taller",
          "tallest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "She is as tall as her mother.",
        "zh": "她和她妈妈一样高。"
      },
      {
        "q": "This book is as _____ as that one.",
        "opts": [
          "interesting",
          "more interesting",
          "most interesting"
        ],
        "ans": 0,
        "hint": "长词也用原级",
        "sentence": "This book is as interesting as that one.",
        "zh": "这本书和那本一样有趣。"
      },
      {
        "q": "The panda is as _____ as the bear.",
        "opts": [
          "fat",
          "fatter",
          "fattest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The panda is as fat as the bear.",
        "zh": "熊猫和熊一样胖。"
      },
      {
        "q": "My room is as _____ as yours.",
        "opts": [
          "clean",
          "cleaner",
          "cleaning"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "My room is as clean as yours.",
        "zh": "我的房间和你的一样干净。"
      },
      {
        "q": "He runs as _____ as his friend.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 0,
        "hint": "副词也用原级",
        "sentence": "He runs as fast as his friend.",
        "zh": "他跑得和他朋友一样快。"
      },
      {
        "q": "The soup is as _____ as the tea.",
        "opts": [
          "hot",
          "hotter",
          "hottest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The soup is as hot as the tea.",
        "zh": "汤和茶一样烫。"
      },
      {
        "q": "This ruler is as _____ as that pencil.",
        "opts": [
          "long",
          "longer",
          "longest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "This ruler is as long as that pencil.",
        "zh": "这把尺子和那支铅笔一样长。"
      }
    ],
    "id": "p16"
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
        "q": "My brother is _____ me.",
        "opts": [
          "as tall as",
          "taller as",
          "as taller as"
        ],
        "ans": 0,
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "q": "She runs _____ fast _____ Lily.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as fast as。",
        "sentence": "She runs as fast as Lily.",
        "zh": "她跑得和莉莉一样快。"
      },
      {
        "q": "This bag is not _____ expensive _____ that one.",
        "opts": [
          "as; as",
          "so; so",
          "more; as"
        ],
        "ans": 0,
        "hint": "not as…as。",
        "sentence": "This bag is not as expensive as that one.",
        "zh": "这个包不如那个贵。"
      },
      {
        "q": "Math is _____ interesting as PE. （否定）",
        "opts": [
          "as",
          "not as",
          "more as"
        ],
        "ans": 1,
        "hint": "not as interesting as。",
        "sentence": "Math is not as interesting as PE.",
        "zh": "数学不如体育有趣。"
      },
      {
        "q": "He has _____ many books _____ I do.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as many + 复数 + as。",
        "sentence": "He has as many books as I do.",
        "zh": "他的书和我的一样多。"
      },
      {
        "q": "Please come _____ possible.",
        "opts": [
          "as soon as",
          "as soon than",
          "so soon as"
        ],
        "ans": 0,
        "hint": "as soon as possible。",
        "sentence": "Please come as soon as possible.",
        "zh": "请尽快来。"
      },
      {
        "q": "This apple is _____ sweet as that one.",
        "opts": [
          "as",
          "so",
          "more"
        ],
        "ans": 0,
        "hint": "as...as 中间用原级",
        "sentence": "This apple is as sweet as that one.",
        "zh": "这个苹果和那个一样甜。"
      },
      {
        "q": "My dog is as _____ as your cat.",
        "opts": [
          "cute",
          "cuter",
          "cutes"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "My dog is as cute as your cat.",
        "zh": "我的狗和你的猫一样可爱。"
      },
      {
        "q": "The bus is not _____ fast as the bike.",
        "opts": [
          "as",
          "so",
          "very"
        ],
        "ans": 0,
        "hint": "否定也用 as...as",
        "sentence": "The bus is not as fast as the bike.",
        "zh": "公交车不如自行车快。"
      },
      {
        "q": "She is as _____ as her mother.",
        "opts": [
          "tall",
          "taller",
          "tallest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "She is as tall as her mother.",
        "zh": "她和她妈妈一样高。"
      },
      {
        "q": "This book is as _____ as that one.",
        "opts": [
          "interesting",
          "more interesting",
          "most interesting"
        ],
        "ans": 0,
        "hint": "长词也用原级",
        "sentence": "This book is as interesting as that one.",
        "zh": "这本书和那本一样有趣。"
      },
      {
        "q": "The panda is as _____ as the bear.",
        "opts": [
          "fat",
          "fatter",
          "fattest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The panda is as fat as the bear.",
        "zh": "熊猫和熊一样胖。"
      },
      {
        "q": "My room is as _____ as yours.",
        "opts": [
          "clean",
          "cleaner",
          "cleaning"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "My room is as clean as yours.",
        "zh": "我的房间和你的一样干净。"
      },
      {
        "q": "He runs as _____ as his friend.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 0,
        "hint": "副词也用原级",
        "sentence": "He runs as fast as his friend.",
        "zh": "他跑得和他朋友一样快。"
      },
      {
        "q": "The soup is as _____ as the tea.",
        "opts": [
          "hot",
          "hotter",
          "hottest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The soup is as hot as the tea.",
        "zh": "汤和茶一样烫。"
      },
      {
        "q": "This ruler is as _____ as that pencil.",
        "opts": [
          "long",
          "longer",
          "longest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "This ruler is as long as that pencil.",
        "zh": "这把尺子和那支铅笔一样长。"
      },
      {
        "q": "The cat is as _____ as the dog.",
        "opts": [
          "lazy",
          "lazier",
          "laziest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The cat is as lazy as the dog.",
        "zh": "猫和狗一样懒。"
      },
      {
        "q": "My bike is as _____ as his car.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "My bike is as fast as his car.",
        "zh": "我的自行车和他的汽车一样快。"
      },
      {
        "q": "Her hair is as _____ as mine.",
        "opts": [
          "black",
          "blacker",
          "blackest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "Her hair is as black as mine.",
        "zh": "她的头发和我的一样黑。"
      },
      {
        "q": "The movie is as _____ as the cartoon.",
        "opts": [
          "funny",
          "funnier",
          "funniest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The movie is as funny as the cartoon.",
        "zh": "这部电影和卡通片一样有趣。"
      },
      {
        "q": "This problem is as _____ as that one.",
        "opts": [
          "easy",
          "easier",
          "easiest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "This problem is as easy as that one.",
        "zh": "这道题和那道一样简单。"
      },
      {
        "q": "The red dress is as _____ as the blue one.",
        "opts": [
          "pretty",
          "prettier",
          "prettiest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The red dress is as pretty as the blue one.",
        "zh": "红裙子和蓝裙子一样漂亮。"
      },
      {
        "q": "My grandpa is as _____ as a horse.",
        "opts": [
          "strong",
          "stronger",
          "strongest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "My grandpa is as strong as a horse.",
        "zh": "我爷爷壮得像匹马。"
      },
      {
        "q": "She sings as _____ as her sister.",
        "opts": [
          "well",
          "good",
          "better"
        ],
        "ans": 0,
        "hint": "副词 well 的原级",
        "sentence": "She sings as well as her sister.",
        "zh": "她唱歌和她姐姐一样好。"
      },
      {
        "q": "This room is as _____ as that one.",
        "opts": [
          "clean",
          "cleaner",
          "cleaning"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "This room is as clean as that one.",
        "zh": "这个房间和那个一样干净。"
      },
      {
        "q": "The bus is as _____ as the subway.",
        "opts": [
          "crowded",
          "more crowded",
          "most crowded"
        ],
        "ans": 0,
        "hint": "长词也用原级",
        "sentence": "The bus is as crowded as the subway.",
        "zh": "公交车和地铁一样拥挤。"
      },
      {
        "q": "The moon is as _____ as a lamp.",
        "opts": [
          "bright",
          "brighter",
          "brightest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The moon is as bright as a lamp.",
        "zh": "月亮像灯一样亮。"
      },
      {
        "q": "Her smile is as _____ as the sun.",
        "opts": [
          "warm",
          "warmer",
          "warmest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "Her smile is as warm as the sun.",
        "zh": "她的微笑像太阳一样温暖。"
      },
      {
        "q": "The river is as _____ as a mirror.",
        "opts": [
          "clear",
          "clearer",
          "clearest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The river is as clear as a mirror.",
        "zh": "河水像镜子一样清澈。"
      },
      {
        "q": "He is as _____ as a lion.",
        "opts": [
          "brave",
          "braver",
          "bravest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "He is as brave as a lion.",
        "zh": "他像狮子一样勇敢。"
      },
      {
        "q": "The tree is as _____ as a building.",
        "opts": [
          "tall",
          "taller",
          "tallest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The tree is as tall as a building.",
        "zh": "这棵树像楼一样高。"
      },
      {
        "q": "I am as _____ as a bird.",
        "opts": [
          "happy",
          "happier",
          "happiest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "I am as happy as a bird.",
        "zh": "我快乐得像只小鸟。"
      },
      {
        "q": "This apple is not as _____ as that one.",
        "opts": [
          "sweet",
          "sweeter",
          "sweetest"
        ],
        "ans": 0,
        "hint": "否定也用 as...as",
        "sentence": "This apple is not as sweet as that one.",
        "zh": "这个苹果不如那个甜。"
      },
      {
        "q": "The dog is as _____ as the cat.",
        "opts": [
          "fat",
          "fatter",
          "fattest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The dog is as fat as the cat.",
        "zh": "狗和猫一样胖。"
      }
    ],
    "id": "p17"
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
        "q": "My brother is _____ me.",
        "opts": [
          "as tall as",
          "taller as",
          "as taller as"
        ],
        "ans": 0,
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "q": "She runs _____ fast _____ Lily.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as fast as。",
        "sentence": "She runs as fast as Lily.",
        "zh": "她跑得和莉莉一样快。"
      },
      {
        "q": "This bag is not _____ expensive _____ that one.",
        "opts": [
          "as; as",
          "so; so",
          "more; as"
        ],
        "ans": 0,
        "hint": "not as…as。",
        "sentence": "This bag is not as expensive as that one.",
        "zh": "这个包不如那个贵。"
      },
      {
        "q": "Math is _____ interesting as PE. （否定）",
        "opts": [
          "as",
          "not as",
          "more as"
        ],
        "ans": 1,
        "hint": "not as interesting as。",
        "sentence": "Math is not as interesting as PE.",
        "zh": "数学不如体育有趣。"
      },
      {
        "q": "He has _____ many books _____ I do.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as many + 复数 + as。",
        "sentence": "He has as many books as I do.",
        "zh": "他的书和我的一样多。"
      },
      {
        "q": "Please come _____ possible.",
        "opts": [
          "as soon as",
          "as soon than",
          "so soon as"
        ],
        "ans": 0,
        "hint": "as soon as possible。",
        "sentence": "Please come as soon as possible.",
        "zh": "请尽快来。"
      },
      {
        "q": "This apple is _____ sweet as that one.",
        "opts": [
          "as",
          "so",
          "more"
        ],
        "ans": 0,
        "hint": "as...as 中间用原级",
        "sentence": "This apple is as sweet as that one.",
        "zh": "这个苹果和那个一样甜。"
      },
      {
        "q": "My dog is as _____ as your cat.",
        "opts": [
          "cute",
          "cuter",
          "cutes"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "My dog is as cute as your cat.",
        "zh": "我的狗和你的猫一样可爱。"
      },
      {
        "q": "The bus is not _____ fast as the bike.",
        "opts": [
          "as",
          "so",
          "very"
        ],
        "ans": 0,
        "hint": "否定也用 as...as",
        "sentence": "The bus is not as fast as the bike.",
        "zh": "公交车不如自行车快。"
      },
      {
        "q": "She is as _____ as her mother.",
        "opts": [
          "tall",
          "taller",
          "tallest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "She is as tall as her mother.",
        "zh": "她和她妈妈一样高。"
      },
      {
        "q": "This book is as _____ as that one.",
        "opts": [
          "interesting",
          "more interesting",
          "most interesting"
        ],
        "ans": 0,
        "hint": "长词也用原级",
        "sentence": "This book is as interesting as that one.",
        "zh": "这本书和那本一样有趣。"
      },
      {
        "q": "The panda is as _____ as the bear.",
        "opts": [
          "fat",
          "fatter",
          "fattest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The panda is as fat as the bear.",
        "zh": "熊猫和熊一样胖。"
      },
      {
        "q": "My room is as _____ as yours.",
        "opts": [
          "clean",
          "cleaner",
          "cleaning"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "My room is as clean as yours.",
        "zh": "我的房间和你的一样干净。"
      },
      {
        "q": "He runs as _____ as his friend.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 0,
        "hint": "副词也用原级",
        "sentence": "He runs as fast as his friend.",
        "zh": "他跑得和他朋友一样快。"
      },
      {
        "q": "The soup is as _____ as the tea.",
        "opts": [
          "hot",
          "hotter",
          "hottest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The soup is as hot as the tea.",
        "zh": "汤和茶一样烫。"
      },
      {
        "q": "This ruler is as _____ as that pencil.",
        "opts": [
          "long",
          "longer",
          "longest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "This ruler is as long as that pencil.",
        "zh": "这把尺子和那支铅笔一样长。"
      },
      {
        "q": "The cat is as _____ as the dog.",
        "opts": [
          "lazy",
          "lazier",
          "laziest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The cat is as lazy as the dog.",
        "zh": "猫和狗一样懒。"
      },
      {
        "q": "My bike is as _____ as his car.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "My bike is as fast as his car.",
        "zh": "我的自行车和他的汽车一样快。"
      },
      {
        "q": "Her hair is as _____ as mine.",
        "opts": [
          "black",
          "blacker",
          "blackest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "Her hair is as black as mine.",
        "zh": "她的头发和我的一样黑。"
      },
      {
        "q": "The movie is as _____ as the cartoon.",
        "opts": [
          "funny",
          "funnier",
          "funniest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The movie is as funny as the cartoon.",
        "zh": "这部电影和卡通片一样有趣。"
      },
      {
        "q": "This problem is as _____ as that one.",
        "opts": [
          "easy",
          "easier",
          "easiest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "This problem is as easy as that one.",
        "zh": "这道题和那道一样简单。"
      },
      {
        "q": "The red dress is as _____ as the blue one.",
        "opts": [
          "pretty",
          "prettier",
          "prettiest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The red dress is as pretty as the blue one.",
        "zh": "红裙子和蓝裙子一样漂亮。"
      },
      {
        "q": "My grandpa is as _____ as a horse.",
        "opts": [
          "strong",
          "stronger",
          "strongest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "My grandpa is as strong as a horse.",
        "zh": "我爷爷壮得像匹马。"
      },
      {
        "q": "She sings as _____ as her sister.",
        "opts": [
          "well",
          "good",
          "better"
        ],
        "ans": 0,
        "hint": "副词 well 的原级",
        "sentence": "She sings as well as her sister.",
        "zh": "她唱歌和她姐姐一样好。"
      },
      {
        "q": "This room is as _____ as that one.",
        "opts": [
          "clean",
          "cleaner",
          "cleaning"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "This room is as clean as that one.",
        "zh": "这个房间和那个一样干净。"
      },
      {
        "q": "The bus is as _____ as the subway.",
        "opts": [
          "crowded",
          "more crowded",
          "most crowded"
        ],
        "ans": 0,
        "hint": "长词也用原级",
        "sentence": "The bus is as crowded as the subway.",
        "zh": "公交车和地铁一样拥挤。"
      },
      {
        "q": "The moon is as _____ as a lamp.",
        "opts": [
          "bright",
          "brighter",
          "brightest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The moon is as bright as a lamp.",
        "zh": "月亮像灯一样亮。"
      },
      {
        "q": "Her smile is as _____ as the sun.",
        "opts": [
          "warm",
          "warmer",
          "warmest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "Her smile is as warm as the sun.",
        "zh": "她的微笑像太阳一样温暖。"
      },
      {
        "q": "The river is as _____ as a mirror.",
        "opts": [
          "clear",
          "clearer",
          "clearest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The river is as clear as a mirror.",
        "zh": "河水像镜子一样清澈。"
      },
      {
        "q": "He is as _____ as a lion.",
        "opts": [
          "brave",
          "braver",
          "bravest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "He is as brave as a lion.",
        "zh": "他像狮子一样勇敢。"
      },
      {
        "q": "The tree is as _____ as a building.",
        "opts": [
          "tall",
          "taller",
          "tallest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The tree is as tall as a building.",
        "zh": "这棵树像楼一样高。"
      },
      {
        "q": "I am as _____ as a bird.",
        "opts": [
          "happy",
          "happier",
          "happiest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "I am as happy as a bird.",
        "zh": "我快乐得像只小鸟。"
      },
      {
        "q": "This apple is not as _____ as that one.",
        "opts": [
          "sweet",
          "sweeter",
          "sweetest"
        ],
        "ans": 0,
        "hint": "否定也用 as...as",
        "sentence": "This apple is not as sweet as that one.",
        "zh": "这个苹果不如那个甜。"
      },
      {
        "q": "The dog is as _____ as the cat.",
        "opts": [
          "fat",
          "fatter",
          "fattest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The dog is as fat as the cat.",
        "zh": "狗和猫一样胖。"
      }
    ],
    "id": "p18"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "w4-asas-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "as tall as",
        "zh": "和……一样高"
      },
      {
        "en": "not as…as",
        "zh": "不如"
      },
      {
        "en": "as soon as possible",
        "zh": "尽快"
      },
      {
        "en": "as many as",
        "zh": "和……一样多"
      },
      {
        "en": "as fast as",
        "zh": "和……一样快"
      },
      {
        "en": "as cute as",
        "zh": "和……一样可爱"
      },
      {
        "en": "as heavy as",
        "zh": "和……一样重"
      },
      {
        "en": "as long as",
        "zh": "和……一样长"
      },
      {
        "en": "as hot as",
        "zh": "和……一样烫"
      },
      {
        "en": "as sweet as",
        "zh": "和……一样甜"
      },
      {
        "en": "as clean as",
        "zh": "和……一样干净"
      },
      {
        "en": "as funny as",
        "zh": "和……一样有趣"
      },
      {
        "en": "as bright as",
        "zh": "和……一样亮"
      }
    ],
    "id": "p19"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "w4-asas-hero.jpg",
    "audio": "The panda is as cute as the bear.",
    "opts": [
      "The panda is as cute as the bear.",
      "The panda is cuter than the bear.",
      "The panda is as cute than the bear."
    ],
    "ans": 0,
    "hint": "as...as 中间原级",
    "sentence": "The panda is as cute as the bear.",
    "zh": "熊猫和熊一样可爱。",
    "questions": [
      {
        "audio": "The panda is as cute as the bear.",
        "opts": [
          "The panda is as cute as the bear.",
          "The panda is cuter than the bear.",
          "The panda is as cute than the bear."
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "zh": "熊猫和熊一样可爱。",
        "sentence": "The panda is as cute as the bear."
      },
      {
        "audio": "My bike is as fast as his car.",
        "opts": [
          "My bike is as fast as his car.",
          "My bike is faster as his car.",
          "My bike is as fast than his car."
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "zh": "我的自行车和他的汽车一样快。",
        "sentence": "My bike is as fast as his car."
      },
      {
        "audio": "This book is not as interesting as that one.",
        "opts": [
          "This book is not as interesting as that one.",
          "This book is not as interesting than that one.",
          "This book is as interesting as that one."
        ],
        "ans": 0,
        "hint": "否定也用 as...as",
        "zh": "这本书不如那本有趣。",
        "sentence": "This book is not as interesting as that one."
      },
      {
        "audio": "She is as tall as her mother.",
        "opts": [
          "She is as tall as her mother.",
          "She is as taller as her mother.",
          "She is as tall than her mother."
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "zh": "她和她妈妈一样高。",
        "sentence": "She is as tall as her mother."
      },
      {
        "audio": "The soup is as hot as the tea.",
        "opts": [
          "The soup is as hot as the tea.",
          "The soup is hotter as the tea.",
          "The soup is as hot than the tea."
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "zh": "汤和茶一样烫。",
        "sentence": "The soup is as hot as the tea."
      },
      {
        "audio": "He runs as fast as a rabbit.",
        "opts": [
          "He runs as fast as a rabbit.",
          "He runs faster as a rabbit.",
          "He runs as fast than a rabbit."
        ],
        "ans": 0,
        "hint": "as 后用副词原级",
        "zh": "他跑得和兔子一样快。",
        "sentence": "He runs as fast as a rabbit."
      },
      {
        "audio": "The moon is as bright as a lamp.",
        "opts": [
          "The moon is as bright as a lamp.",
          "The moon is brighter as a lamp.",
          "The moon is as bright than a lamp."
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "zh": "月亮像灯一样亮。",
        "sentence": "The moon is as bright as a lamp."
      },
      {
        "audio": "My room is as clean as yours.",
        "opts": [
          "My room is as clean as yours.",
          "My room is cleaner as yours.",
          "My room is as clean than yours."
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "zh": "我的房间和你的一样干净。",
        "sentence": "My room is as clean as yours."
      }
    ],
    "id": "p20"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "w4-asas-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "This book is not as interesting as that one.",
        "zh": "这本书不如那本有趣。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "My bag is as heavy as yours.",
        "zh": "我的书包和你的一样重。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The panda is as cute as the bear.",
        "zh": "熊猫和熊一样可爱。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "This ruler is as long as that pencil.",
        "zh": "这把尺子和那支铅笔一样长。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My bike is as fast as his car.",
        "zh": "我的自行车和他的汽车一样快。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The soup is as hot as the tea.",
        "zh": "汤和茶一样烫。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Her hair is as black as mine.",
        "zh": "她的头发和我的一样黑。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "This apple is as sweet as that one.",
        "zh": "这个苹果和那个一样甜。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The bus is as crowded as the subway.",
        "zh": "公交车和地铁一样拥挤。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She sings as well as her sister.",
        "zh": "她唱歌和她姐姐一样好。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "He runs as fast as a rabbit.",
        "zh": "他跑得和兔子一样快。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "This room is as clean as that one.",
        "zh": "这个房间和那个一样干净。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The movie is as funny as the cartoon.",
        "zh": "这部电影和卡通片一样有趣。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "My grandpa is as strong as a horse.",
        "zh": "我爷爷壮得像匹马。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The red dress is as pretty as the blue one.",
        "zh": "红裙子和蓝裙子一样漂亮。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "This problem is as easy as that one.",
        "zh": "这道题和那道一样简单。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The cat is as lazy as the dog.",
        "zh": "猫和狗一样懒。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "I am as happy as a bird.",
        "zh": "我快乐得像只小鸟。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The moon is as bright as a lamp.",
        "zh": "月亮像灯一样亮。",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "Her smile is as warm as the sun.",
        "zh": "她的微笑像太阳一样温暖。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The river is as clear as a mirror.",
        "zh": "河水像镜子一样清澈。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He is as brave as a lion.",
        "zh": "他像狮子一样勇敢。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The tree is as tall as a building.",
        "zh": "这棵树像楼一样高。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      }
    ],
    "id": "p21"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "w4-asas-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The cat is as _____ as the dog.",
        "opts": [
          "lazy",
          "lazier",
          "laziest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The cat is as lazy as the dog.",
        "zh": "猫和狗一样懒。"
      },
      {
        "q": "My bike is as _____ as his car.",
        "opts": [
          "fast",
          "faster",
          "fastest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "My bike is as fast as his car.",
        "zh": "我的自行车和他的汽车一样快。"
      },
      {
        "q": "Her hair is as _____ as mine.",
        "opts": [
          "black",
          "blacker",
          "blackest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "Her hair is as black as mine.",
        "zh": "她的头发和我的一样黑。"
      },
      {
        "q": "The movie is as _____ as the cartoon.",
        "opts": [
          "funny",
          "funnier",
          "funniest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The movie is as funny as the cartoon.",
        "zh": "这部电影和卡通片一样有趣。"
      },
      {
        "q": "This problem is as _____ as that one.",
        "opts": [
          "easy",
          "easier",
          "easiest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "This problem is as easy as that one.",
        "zh": "这道题和那道一样简单。"
      },
      {
        "q": "The red dress is as _____ as the blue one.",
        "opts": [
          "pretty",
          "prettier",
          "prettiest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "The red dress is as pretty as the blue one.",
        "zh": "红裙子和蓝裙子一样漂亮。"
      },
      {
        "q": "My grandpa is as _____ as a horse.",
        "opts": [
          "strong",
          "stronger",
          "strongest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "My grandpa is as strong as a horse.",
        "zh": "我爷爷壮得像匹马。"
      },
      {
        "q": "She sings as _____ as her sister.",
        "opts": [
          "well",
          "good",
          "better"
        ],
        "ans": 0,
        "hint": "副词 well 的原级",
        "sentence": "She sings as well as her sister.",
        "zh": "她唱歌和她姐姐一样好。"
      },
      {
        "q": "This room is as _____ as that one.",
        "opts": [
          "clean",
          "cleaner",
          "cleaning"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "This room is as clean as that one.",
        "zh": "这个房间和那个一样干净。"
      },
      {
        "q": "The bus is as _____ as the subway.",
        "opts": [
          "crowded",
          "more crowded",
          "most crowded"
        ],
        "ans": 0,
        "hint": "长词也用原级",
        "sentence": "The bus is as crowded as the subway.",
        "zh": "公交车和地铁一样拥挤。"
      },
      {
        "q": "The moon is as _____ as a lamp.",
        "opts": [
          "bright",
          "brighter",
          "brightest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The moon is as bright as a lamp.",
        "zh": "月亮像灯一样亮。"
      },
      {
        "q": "Her smile is as _____ as the sun.",
        "opts": [
          "warm",
          "warmer",
          "warmest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "Her smile is as warm as the sun.",
        "zh": "她的微笑像太阳一样温暖。"
      },
      {
        "q": "The river is as _____ as a mirror.",
        "opts": [
          "clear",
          "clearer",
          "clearest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The river is as clear as a mirror.",
        "zh": "河水像镜子一样清澈。"
      },
      {
        "q": "He is as _____ as a lion.",
        "opts": [
          "brave",
          "braver",
          "bravest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "He is as brave as a lion.",
        "zh": "他像狮子一样勇敢。"
      },
      {
        "q": "The tree is as _____ as a building.",
        "opts": [
          "tall",
          "taller",
          "tallest"
        ],
        "ans": 0,
        "hint": "as 后用原级",
        "sentence": "The tree is as tall as a building.",
        "zh": "这棵树像楼一样高。"
      },
      {
        "q": "I am as _____ as a bird.",
        "opts": [
          "happy",
          "happier",
          "happiest"
        ],
        "ans": 0,
        "hint": "as...as 中间原级",
        "sentence": "I am as happy as a bird.",
        "zh": "我快乐得像只小鸟。"
      },
      {
        "q": "This apple is not as _____ as that one.",
        "opts": [
          "sweet",
          "sweeter",
          "sweetest"
        ],
        "ans": 0,
        "hint": "否定也用 as...as",
        "sentence": "This apple is not as sweet as that one.",
        "zh": "这个苹果不如那个甜。"
      },
      {
        "q": "The dog is as _____ as the cat.",
        "opts": [
          "fat",
          "fatter",
          "fattest"
        ],
        "ans": 0,
        "hint": "as 后不加 er",
        "sentence": "The dog is as fat as the cat.",
        "zh": "狗和猫一样胖。"
      }
    ],
    "id": "p22"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "writing.jpg",
    "checklist": [
      "as + 原级 + as",
      "not as…as = 不如",
      "比较级用 than，不用 as…as",
      "as…as 中间是原级；than 前面才是比较级。"
    ],
    "chant": "As plus原级 plus as — same degree! Not as…as — less, you see!",
    "chantSpeak": "As plus原级 plus as, same degree! Not as as, less, you see!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "同级比较 as…as",
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