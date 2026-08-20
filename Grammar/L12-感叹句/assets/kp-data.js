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
    "audio": "What a beautiful day it is!",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！",
    "image": "l13-excl-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l13-excl-hero.jpg",
    "question": "「What a beautiful day」为什么用 a？",
    "choices": [
      {
        "text": "day 是可数单数，What a + adj + 可数单数",
        "correct": true,
        "fb": "对了！What a beautiful day!"
      },
      {
        "text": "感叹句永远不用 a",
        "correct": false,
        "fb": "可数单数要加 a/an。"
      },
      {
        "text": "应该用 How a",
        "correct": false,
        "fb": "How 后直接接形容词/副词，不加 a。"
      }
    ],
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l13-excl-hero.jpg",
    "lead": "What 后面跟名词；How 后面跟形容词或副词。",
    "formula": "What a/an + 形 + 名！　/　How + 形/副 (+ 主谓)！",
    "parts": [
      {
        "mark": "What a",
        "label": "可数单数",
        "example": "What a beautiful day!"
      },
      {
        "mark": "What",
        "label": "不可数/复数",
        "example": "What nice weather!"
      },
      {
        "mark": "How",
        "label": "形/副词",
        "example": "How beautiful!"
      }
    ],
    "samples": [
      {
        "sentence": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！"
      },
      {
        "sentence": "How interesting the story is!",
        "zh": "这个故事多有趣啊！"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l13-what.jpg",
    "rightImage": "l13-how.jpg",
    "leftLabel": "What a day!",
    "rightLabel": "How beautiful!",
    "leftSentence": "What a lovely dog!",
    "leftZh": "多么可爱的狗啊！",
    "rightSentence": "How fast he runs!",
    "rightZh": "他跑得多快啊！",
    "morphBase": "What",
    "morphPast": "How",
    "morphHighlight": "",
    "discovery": "What + (a/an) + 形 + 名；How + 形/副 + 主谓！"
  },
  {
    "section": "精讲",
    "title": "例句 · What an",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l13-excl-hero.jpg",
    "lead": "interesting 以元音音素开头 → What an interesting story。",
    "sentence": "What an interesting story it is!",
    "zh": "多么有趣的故事啊！",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · How",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l13-excl-hero.jpg",
    "lead": "How + 形容词 + 主语 + 谓语。",
    "sentence": "How beautiful the flowers are!",
    "zh": "这些花多么美啊！",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "What a/an + 形容词 + 可数名词单数！",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "当名词是可数名词单数时，用What a/an",
    "sentence": "What a big panda it is!",
    "zh": "多么大的一只熊猫啊！",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "What + 形容词 + 不可数/复数名词！",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "当名词是不可数或复数时，不用a/an",
    "sentence": "What delicious food it is!",
    "zh": "多么美味的食物啊！",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "How + 形容词/副词！",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "当强调形容词或副词时，用How",
    "sentence": "How fast the bus goes!",
    "zh": "公交车跑得真快啊！",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l13-excl-hero.jpg",
    "rules": [
      {
        "tab": "What",
        "rule": "What (+a/an)+形容词+名词!",
        "focusVerb": "What",
        "examples": [
          {
            "from": "day",
            "to": "What a day!"
          },
          {
            "from": "weather",
            "to": "What fine weather!"
          }
        ],
        "sample": "What a beautiful day it is!",
        "sampleZh": "多么美好的一天啊！"
      },
      {
        "tab": "How",
        "rule": "How + 形容词/副词 (+主谓)!",
        "focusVerb": "How",
        "examples": [
          {
            "from": "beautiful",
            "to": "How beautiful!"
          },
          {
            "from": "fast",
            "to": "How fast!"
          }
        ],
        "sample": "How fast he runs!",
        "sampleZh": "他跑得多快啊！"
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
    "image": "l13-excl-hero.jpg",
    "buckets": [
      {
        "key": "what",
        "label": "What 句"
      },
      {
        "key": "how",
        "label": "How 句"
      }
    ],
    "items": [
      {
        "text": "What a nice picture!",
        "bucket": "what"
      },
      {
        "text": "How clever you are!",
        "bucket": "how"
      },
      {
        "text": "What beautiful flowers!",
        "bucket": "what"
      },
      {
        "text": "How carefully she writes!",
        "bucket": "how"
      },
      {
        "text": "What an interesting book!",
        "bucket": "what"
      },
      {
        "text": "How cold it is!",
        "bucket": "how"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l13-excl-hero.jpg",
    "question": "「What beautiful day it is!」少了什么？",
    "choices": [
      {
        "text": "day 是可数单数，要加 a：What a beautiful day",
        "correct": true,
        "fb": "What a/an + 形 + 可数单数。"
      },
      {
        "text": "要用 How beautiful day",
        "correct": false,
        "fb": "How 后面不加名词 day。"
      },
      {
        "text": "it is 要删掉",
        "correct": false,
        "fb": "可以保留主谓。"
      }
    ],
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l13-excl-hero.jpg",
    "lead": "陈述句改感叹句：抽出形容词，选择 What 或 How。",
    "items": [
      {
        "from": "It is a nice park.",
        "fromZh": "这是一个漂亮的公园。",
        "steps": [
          {
            "label": "用 What 改写",
            "opts": [
              "What a nice park it is!",
              "What nice park it is!",
              "How a nice park it is!"
            ],
            "ans": 0,
            "hint": "What a + 形 + 可数单数。",
            "sentence": "What a nice park it is!",
            "zh": "多么漂亮的公园啊！"
          },
          {
            "label": "用 How 改写",
            "opts": [
              "How nice the park is!",
              "How a nice park!",
              "How nice park is!"
            ],
            "ans": 0,
            "hint": "How + 形 + 主谓。",
            "sentence": "How nice the park is!",
            "zh": "这个公园多漂亮啊！"
          }
        ]
      },
      {
        "from": "It is a beautiful day.",
        "fromZh": "这是美好的一天。",
        "steps": [
          {
            "label": "改成感叹句",
            "opts": [
              "What a beautiful day it is!",
              "What beautiful day it is!",
              "How beautiful day it is!"
            ],
            "ans": 0,
            "hint": "day是可数名词单数，用What a",
            "sentence": "What a beautiful day it is!",
            "zh": "多么美好的一天啊！"
          }
        ]
      },
      {
        "from": "The story is interesting.",
        "fromZh": "这个故事有趣。",
        "steps": [
          {
            "label": "改成感叹句",
            "opts": [
              "What interesting story it is!",
              "How interesting the story is!",
              "What a interesting story it is!"
            ],
            "ans": 1,
            "hint": "形容词用How",
            "sentence": "How interesting the story is!",
            "zh": "这个故事真有趣啊！"
          }
        ]
      },
      {
        "from": "The panda is big.",
        "fromZh": "这只熊猫大。",
        "steps": [
          {
            "label": "改成感叹句",
            "opts": [
              "What a big panda it is!",
              "How big panda it is!",
              "What big panda it is!"
            ],
            "ans": 0,
            "hint": "panda是可数名词单数，用What a",
            "sentence": "What a big panda it is!",
            "zh": "多么大的一只熊猫啊！"
          }
        ]
      },
      {
        "from": "The bus goes fast.",
        "fromZh": "公交车跑得快。",
        "steps": [
          {
            "label": "改成感叹句",
            "opts": [
              "What fast the bus goes!",
              "How fast the bus goes!",
              "What a fast bus goes!"
            ],
            "ans": 1,
            "hint": "fast是副词，用How",
            "sentence": "How fast the bus goes!",
            "zh": "公交车跑得真快啊！"
          }
        ]
      },
      {
        "from": "The food is delicious.",
        "fromZh": "食物美味。",
        "steps": [
          {
            "label": "改成感叹句",
            "opts": [
              "What delicious food it is!",
              "What a delicious food it is!",
              "How delicious food it is!"
            ],
            "ans": 0,
            "hint": "food不可数，用What",
            "sentence": "What delicious food it is!",
            "zh": "多么美味的食物啊！"
          }
        ]
      },
      {
        "from": "The cat is lovely.",
        "fromZh": "这只猫可爱。",
        "steps": [
          {
            "label": "改成感叹句",
            "opts": [
              "What lovely cat it is!",
              "How lovely the cat is!",
              "What a lovely cat it is!"
            ],
            "ans": 1,
            "hint": "lovely是形容词，用How",
            "sentence": "How lovely the cat is!",
            "zh": "这只猫真可爱啊！"
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
    "image": "kp3d-window.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "What",
      "a",
      "sunny",
      "day",
      "it",
      "is"
    ],
    "sentence": "What a sunny day it is!",
    "zh": "多么晴朗的一天啊！",
    "items": [
      {
        "tokens": [
          "What",
          "a",
          "sunny",
          "day",
          "it",
          "is"
        ],
        "sentence": "What a sunny day it is!",
        "zh": "多么晴朗的一天啊！",
        "image": "kp3d-window.png"
      },
      {
        "tokens": [
          "How",
          "sweet",
          "the",
          "apple",
          "is"
        ],
        "sentence": "How sweet the apple is!",
        "zh": "这个苹果真甜啊！",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "What",
          "a",
          "heavy",
          "rain",
          "it",
          "is"
        ],
        "sentence": "What a heavy rain it is!",
        "zh": "多么大的雨啊！",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "How",
          "well",
          "she",
          "plays",
          "the",
          "piano"
        ],
        "sentence": "How well she plays the piano!",
        "zh": "她钢琴弹得多好啊！",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "What",
          "a",
          "clever",
          "dog",
          "it",
          "is"
        ],
        "sentence": "What a clever dog it is!",
        "zh": "多么聪明的狗啊！",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "How",
          "exciting",
          "the",
          "basketball",
          "game",
          "is"
        ],
        "sentence": "How exciting the basketball game is!",
        "zh": "篮球比赛真激动人心啊！",
        "image": "kp3d-basketball.png"
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
    "image": "l13-excl-hero.jpg",
    "audio": "What a beautiful day it is!",
    "tokens": [
      "What",
      "a",
      "beautiful",
      "day",
      "it",
      "is"
    ],
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l13-excl-hero.jpg",
    "q": "_____ interesting story it is!",
    "opts": [
      "What",
      "What an",
      "How"
    ],
    "ans": 1,
    "hint": "story 可数单数：What an interesting story!",
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l13-excl-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "_____ interesting story it is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 1,
        "hint": "story 可数单数：What an interesting story!",
        "sentence": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！"
      },
      {
        "q": "_____ tall the boy is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "How + 形容词。",
        "sentence": "How tall the boy is!",
        "zh": "这个男孩多高啊！"
      },
      {
        "q": "_____ good news it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "news 不可数，What 不加 a。",
        "sentence": "What good news it is!",
        "zh": "多好的消息啊！"
      },
      {
        "q": "_____ honest boy he is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 1,
        "hint": "honest 元音音素 → What an。",
        "sentence": "What an honest boy he is!",
        "zh": "他是多么诚实的男孩啊！"
      },
      {
        "q": "_____ fast he runs!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "How + 副词。",
        "sentence": "How fast he runs!",
        "zh": "他跑得多快啊！"
      },
      {
        "q": "_____ delicious cakes they are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "cakes 复数，What + 形 + 复数。",
        "sentence": "What delicious cakes they are!",
        "zh": "多么美味的蛋糕啊！"
      },
      {
        "q": "_____ beautiful day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！"
      },
      {
        "q": "_____ interesting the story is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 2,
        "hint": "interesting是形容词，用How",
        "sentence": "How interesting the story is!",
        "zh": "这个故事真有趣啊！"
      },
      {
        "q": "_____ big panda it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "panda是可数名词单数，用What a",
        "sentence": "What a big panda it is!",
        "zh": "多么大的一只熊猫啊！"
      },
      {
        "q": "_____ fast the bus goes!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "fast是副词，用How",
        "sentence": "How fast the bus goes!",
        "zh": "公交车跑得真快啊！"
      },
      {
        "q": "_____ delicious food it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "food是不可数名词，用What",
        "sentence": "What delicious food it is!",
        "zh": "多么美味的食物啊！"
      },
      {
        "q": "_____ lovely the cat is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "lovely是形容词，用How",
        "sentence": "How lovely the cat is!",
        "zh": "这只猫真可爱啊！"
      },
      {
        "q": "_____ funny joke it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "joke是可数名词单数，用What a",
        "sentence": "What a funny joke it is!",
        "zh": "多么有趣的笑话啊！"
      },
      {
        "q": "_____ hard the boy studies!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "hard是副词，用How",
        "sentence": "How hard the boy studies!",
        "zh": "这个男孩学习真努力啊！"
      },
      {
        "q": "_____ quiet place the library is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "place是可数名词单数，用What a",
        "sentence": "What a quiet place the library is!",
        "zh": "图书馆真是个安静的地方啊！"
      },
      {
        "q": "_____ smart the girl is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "smart是形容词，用How",
        "sentence": "How smart the girl is!",
        "zh": "这个女孩真聪明啊！"
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
        "q": "_____ interesting story it is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 1,
        "hint": "story 可数单数：What an interesting story!",
        "sentence": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！"
      },
      {
        "q": "_____ tall the boy is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "How + 形容词。",
        "sentence": "How tall the boy is!",
        "zh": "这个男孩多高啊！"
      },
      {
        "q": "_____ good news it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "news 不可数，What 不加 a。",
        "sentence": "What good news it is!",
        "zh": "多好的消息啊！"
      },
      {
        "q": "_____ honest boy he is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 1,
        "hint": "honest 元音音素 → What an。",
        "sentence": "What an honest boy he is!",
        "zh": "他是多么诚实的男孩啊！"
      },
      {
        "q": "_____ fast he runs!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "How + 副词。",
        "sentence": "How fast he runs!",
        "zh": "他跑得多快啊！"
      },
      {
        "q": "_____ delicious cakes they are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "cakes 复数，What + 形 + 复数。",
        "sentence": "What delicious cakes they are!",
        "zh": "多么美味的蛋糕啊！"
      },
      {
        "q": "_____ beautiful day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！"
      },
      {
        "q": "_____ interesting the story is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 2,
        "hint": "interesting是形容词，用How",
        "sentence": "How interesting the story is!",
        "zh": "这个故事真有趣啊！"
      },
      {
        "q": "_____ big panda it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "panda是可数名词单数，用What a",
        "sentence": "What a big panda it is!",
        "zh": "多么大的一只熊猫啊！"
      },
      {
        "q": "_____ fast the bus goes!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "fast是副词，用How",
        "sentence": "How fast the bus goes!",
        "zh": "公交车跑得真快啊！"
      },
      {
        "q": "_____ delicious food it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "food是不可数名词，用What",
        "sentence": "What delicious food it is!",
        "zh": "多么美味的食物啊！"
      },
      {
        "q": "_____ lovely the cat is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "lovely是形容词，用How",
        "sentence": "How lovely the cat is!",
        "zh": "这只猫真可爱啊！"
      },
      {
        "q": "_____ funny joke it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "joke是可数名词单数，用What a",
        "sentence": "What a funny joke it is!",
        "zh": "多么有趣的笑话啊！"
      },
      {
        "q": "_____ hard the boy studies!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "hard是副词，用How",
        "sentence": "How hard the boy studies!",
        "zh": "这个男孩学习真努力啊！"
      },
      {
        "q": "_____ quiet place the library is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "place是可数名词单数，用What a",
        "sentence": "What a quiet place the library is!",
        "zh": "图书馆真是个安静的地方啊！"
      },
      {
        "q": "_____ smart the girl is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "smart是形容词，用How",
        "sentence": "How smart the girl is!",
        "zh": "这个女孩真聪明啊！"
      },
      {
        "q": "_____ tall building it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "building是可数名词单数，用What a",
        "sentence": "What a tall building it is!",
        "zh": "多么高的楼啊！"
      },
      {
        "q": "_____ sweet the apple is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "sweet是形容词，用How",
        "sentence": "How sweet the apple is!",
        "zh": "这个苹果真甜啊！"
      },
      {
        "q": "_____ heavy rain it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "rain是不可数名词，用What",
        "sentence": "What heavy rain it is!",
        "zh": "多么大的雨啊！"
      },
      {
        "q": "_____ quickly the time flies!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "quickly是副词，用How",
        "sentence": "How quickly the time flies!",
        "zh": "时间过得真快啊！"
      },
      {
        "q": "_____ nice day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a nice day it is!",
        "zh": "多么好的天气啊！"
      },
      {
        "q": "_____ beautiful the flowers are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "beautiful是形容词，用How",
        "sentence": "How beautiful the flowers are!",
        "zh": "这些花真漂亮啊！"
      },
      {
        "q": "_____ clever dog it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "dog是可数名词单数，用What a",
        "sentence": "What a clever dog it is!",
        "zh": "多么聪明的狗啊！"
      },
      {
        "q": "_____ well she sings!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "well是副词，用How",
        "sentence": "How well she sings!",
        "zh": "她唱得多好啊！"
      },
      {
        "q": "_____ wonderful performance it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "performance是可数名词单数，用What a",
        "sentence": "What a wonderful performance it is!",
        "zh": "多么精彩的表演啊！"
      },
      {
        "q": "_____ exciting the game is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "exciting是形容词，用How",
        "sentence": "How exciting the game is!",
        "zh": "比赛真激动人心啊！"
      },
      {
        "q": "_____ great idea it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "idea是可数名词单数，用What a",
        "sentence": "What a great idea it is!",
        "zh": "多么好的主意啊！"
      },
      {
        "q": "_____ carefully he writes!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "carefully是副词，用How",
        "sentence": "How carefully he writes!",
        "zh": "他写得多认真啊！"
      },
      {
        "q": "_____ bright moon it is tonight!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "moon是可数名词单数，用What a",
        "sentence": "What a bright moon it is tonight!",
        "zh": "今晚的月亮真亮啊！"
      },
      {
        "q": "_____ happy they are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "happy是形容词，用How",
        "sentence": "How happy they are!",
        "zh": "他们多开心啊！"
      },
      {
        "q": "_____ delicious the dinner is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "delicious是形容词，用How",
        "sentence": "How delicious the dinner is!",
        "zh": "晚餐真美味啊！"
      },
      {
        "q": "_____ sunny day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a sunny day it is!",
        "zh": "多么晴朗的一天啊！"
      },
      {
        "q": "_____ hot the soup is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "hot是形容词，用How",
        "sentence": "How hot the soup is!",
        "zh": "汤真烫啊！"
      },
      {
        "q": "_____ cute baby it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "baby是可数名词单数，用What a",
        "sentence": "What a cute baby it is!",
        "zh": "多么可爱的宝宝啊！"
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
        "q": "_____ interesting story it is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 1,
        "hint": "story 可数单数：What an interesting story!",
        "sentence": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！"
      },
      {
        "q": "_____ tall the boy is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "How + 形容词。",
        "sentence": "How tall the boy is!",
        "zh": "这个男孩多高啊！"
      },
      {
        "q": "_____ good news it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "news 不可数，What 不加 a。",
        "sentence": "What good news it is!",
        "zh": "多好的消息啊！"
      },
      {
        "q": "_____ honest boy he is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 1,
        "hint": "honest 元音音素 → What an。",
        "sentence": "What an honest boy he is!",
        "zh": "他是多么诚实的男孩啊！"
      },
      {
        "q": "_____ fast he runs!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "How + 副词。",
        "sentence": "How fast he runs!",
        "zh": "他跑得多快啊！"
      },
      {
        "q": "_____ delicious cakes they are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "cakes 复数，What + 形 + 复数。",
        "sentence": "What delicious cakes they are!",
        "zh": "多么美味的蛋糕啊！"
      },
      {
        "q": "_____ beautiful day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！"
      },
      {
        "q": "_____ interesting the story is!",
        "opts": [
          "What",
          "What an",
          "How"
        ],
        "ans": 2,
        "hint": "interesting是形容词，用How",
        "sentence": "How interesting the story is!",
        "zh": "这个故事真有趣啊！"
      },
      {
        "q": "_____ big panda it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "panda是可数名词单数，用What a",
        "sentence": "What a big panda it is!",
        "zh": "多么大的一只熊猫啊！"
      },
      {
        "q": "_____ fast the bus goes!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "fast是副词，用How",
        "sentence": "How fast the bus goes!",
        "zh": "公交车跑得真快啊！"
      },
      {
        "q": "_____ delicious food it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "food是不可数名词，用What",
        "sentence": "What delicious food it is!",
        "zh": "多么美味的食物啊！"
      },
      {
        "q": "_____ lovely the cat is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "lovely是形容词，用How",
        "sentence": "How lovely the cat is!",
        "zh": "这只猫真可爱啊！"
      },
      {
        "q": "_____ funny joke it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "joke是可数名词单数，用What a",
        "sentence": "What a funny joke it is!",
        "zh": "多么有趣的笑话啊！"
      },
      {
        "q": "_____ hard the boy studies!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "hard是副词，用How",
        "sentence": "How hard the boy studies!",
        "zh": "这个男孩学习真努力啊！"
      },
      {
        "q": "_____ quiet place the library is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "place是可数名词单数，用What a",
        "sentence": "What a quiet place the library is!",
        "zh": "图书馆真是个安静的地方啊！"
      },
      {
        "q": "_____ smart the girl is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "smart是形容词，用How",
        "sentence": "How smart the girl is!",
        "zh": "这个女孩真聪明啊！"
      },
      {
        "q": "_____ tall building it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "building是可数名词单数，用What a",
        "sentence": "What a tall building it is!",
        "zh": "多么高的楼啊！"
      },
      {
        "q": "_____ sweet the apple is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "sweet是形容词，用How",
        "sentence": "How sweet the apple is!",
        "zh": "这个苹果真甜啊！"
      },
      {
        "q": "_____ heavy rain it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "rain是不可数名词，用What",
        "sentence": "What heavy rain it is!",
        "zh": "多么大的雨啊！"
      },
      {
        "q": "_____ quickly the time flies!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "quickly是副词，用How",
        "sentence": "How quickly the time flies!",
        "zh": "时间过得真快啊！"
      },
      {
        "q": "_____ nice day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a nice day it is!",
        "zh": "多么好的天气啊！"
      },
      {
        "q": "_____ beautiful the flowers are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "beautiful是形容词，用How",
        "sentence": "How beautiful the flowers are!",
        "zh": "这些花真漂亮啊！"
      },
      {
        "q": "_____ clever dog it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "dog是可数名词单数，用What a",
        "sentence": "What a clever dog it is!",
        "zh": "多么聪明的狗啊！"
      },
      {
        "q": "_____ well she sings!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "well是副词，用How",
        "sentence": "How well she sings!",
        "zh": "她唱得多好啊！"
      },
      {
        "q": "_____ wonderful performance it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "performance是可数名词单数，用What a",
        "sentence": "What a wonderful performance it is!",
        "zh": "多么精彩的表演啊！"
      },
      {
        "q": "_____ exciting the game is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "exciting是形容词，用How",
        "sentence": "How exciting the game is!",
        "zh": "比赛真激动人心啊！"
      },
      {
        "q": "_____ great idea it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "idea是可数名词单数，用What a",
        "sentence": "What a great idea it is!",
        "zh": "多么好的主意啊！"
      },
      {
        "q": "_____ carefully he writes!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "carefully是副词，用How",
        "sentence": "How carefully he writes!",
        "zh": "他写得多认真啊！"
      },
      {
        "q": "_____ bright moon it is tonight!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "moon是可数名词单数，用What a",
        "sentence": "What a bright moon it is tonight!",
        "zh": "今晚的月亮真亮啊！"
      },
      {
        "q": "_____ happy they are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "happy是形容词，用How",
        "sentence": "How happy they are!",
        "zh": "他们多开心啊！"
      },
      {
        "q": "_____ delicious the dinner is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "delicious是形容词，用How",
        "sentence": "How delicious the dinner is!",
        "zh": "晚餐真美味啊！"
      },
      {
        "q": "_____ sunny day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a sunny day it is!",
        "zh": "多么晴朗的一天啊！"
      },
      {
        "q": "_____ hot the soup is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "hot是形容词，用How",
        "sentence": "How hot the soup is!",
        "zh": "汤真烫啊！"
      },
      {
        "q": "_____ cute baby it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "baby是可数名词单数，用What a",
        "sentence": "What a cute baby it is!",
        "zh": "多么可爱的宝宝啊！"
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
    "image": "l13-excl-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "What a beautiful day!",
        "zh": "多么美好的一天！"
      },
      {
        "en": "What an interesting story!",
        "zh": "多么有趣的故事！"
      },
      {
        "en": "How beautiful!",
        "zh": "多么美！"
      },
      {
        "en": "How fast he runs!",
        "zh": "他跑得多快！"
      },
      {
        "en": "How interesting!",
        "zh": "真有趣！"
      },
      {
        "en": "What a big panda!",
        "zh": "多大的熊猫！"
      },
      {
        "en": "How fast!",
        "zh": "真快！"
      },
      {
        "en": "What delicious food!",
        "zh": "多美味的食物！"
      },
      {
        "en": "How lovely!",
        "zh": "真可爱！"
      },
      {
        "en": "What a funny joke!",
        "zh": "多有趣的笑话！"
      },
      {
        "en": "How hard he studies!",
        "zh": "他学习多努力！"
      },
      {
        "en": "What a quiet place!",
        "zh": "多安静的地方！"
      },
      {
        "en": "How smart!",
        "zh": "真聪明！"
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
    "image": "l13-excl-hero.jpg",
    "audio": "What a beautiful day it is!",
    "opts": [
      "What a beautiful day it is!",
      "How beautiful day it is!",
      "What beautiful day it is!"
    ],
    "ans": 0,
    "hint": "注意听What a",
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！",
    "questions": [
      {
        "audio": "What a beautiful day it is!",
        "opts": [
          "What a beautiful day it is!",
          "How beautiful day it is!",
          "What beautiful day it is!"
        ],
        "ans": 0,
        "hint": "注意听What a",
        "zh": "多么美好的一天啊！",
        "sentence": "What a beautiful day it is!"
      },
      {
        "audio": "How interesting the story is!",
        "opts": [
          "How interesting the story is!",
          "What interesting story it is!",
          "What a interesting story it is!"
        ],
        "ans": 0,
        "hint": "注意听How",
        "zh": "这个故事真有趣啊！",
        "sentence": "How interesting the story is!"
      },
      {
        "audio": "What a big panda it is!",
        "opts": [
          "What big panda it is!",
          "What a big panda it is!",
          "How a big panda it is!"
        ],
        "ans": 1,
        "hint": "注意a",
        "zh": "多么大的一只熊猫啊！",
        "sentence": "What a big panda it is!"
      },
      {
        "audio": "How fast the bus goes!",
        "opts": [
          "What fast the bus goes!",
          "How fast the bus goes!",
          "How a fast bus goes!"
        ],
        "ans": 1,
        "hint": "注意How",
        "zh": "公交车跑得真快啊！",
        "sentence": "How fast the bus goes!"
      },
      {
        "audio": "What delicious food it is!",
        "opts": [
          "What a delicious food it is!",
          "How delicious food it is!",
          "What delicious food it is!"
        ],
        "ans": 2,
        "hint": "food不可数，不用a",
        "zh": "多么美味的食物啊！",
        "sentence": "What delicious food it is!"
      },
      {
        "audio": "How lovely the cat is!",
        "opts": [
          "How lovely the cat is!",
          "What lovely cat it is!",
          "What a lovely cat it is!"
        ],
        "ans": 0,
        "hint": "注意How",
        "zh": "这只猫真可爱啊！",
        "sentence": "How lovely the cat is!"
      },
      {
        "audio": "What a funny joke it is!",
        "opts": [
          "What funny joke it is!",
          "What a funny joke it is!",
          "How funny joke it is!"
        ],
        "ans": 1,
        "hint": "注意a",
        "zh": "多么有趣的笑话啊！",
        "sentence": "What a funny joke it is!"
      },
      {
        "audio": "How hard the boy studies!",
        "opts": [
          "What hard the boy studies!",
          "How hard the boy studies!",
          "How a hard boy studies!"
        ],
        "ans": 1,
        "hint": "注意How",
        "zh": "这个男孩学习真努力啊！",
        "sentence": "How hard the boy studies!"
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
    "image": "l13-excl-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "What a beautiful day it is!",
        "zh": "多么美好的一天啊！",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "How interesting the story is!",
        "zh": "这个故事真有趣啊！",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "What a big panda it is!",
        "zh": "多么大的一只熊猫啊！",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "How fast the bus goes!",
        "zh": "公交车跑得真快啊！",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "What delicious food it is!",
        "zh": "多么美味的食物啊！",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "How lovely the cat is!",
        "zh": "这只猫真可爱啊！",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "What a funny joke it is!",
        "zh": "多么有趣的笑话啊！",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "How hard the boy studies!",
        "zh": "这个男孩学习真努力啊！",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "What a quiet place the library is!",
        "zh": "图书馆真是个安静的地方啊！",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "How smart the girl is!",
        "zh": "这个女孩真聪明啊！",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "What a tall building it is!",
        "zh": "多么高的楼啊！",
        "tag": "exam_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "How sweet the apple is!",
        "zh": "这个苹果真甜啊！",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "What a heavy rain it is!",
        "zh": "多么大的雨啊！",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "How quickly the time flies!",
        "zh": "时间过得真快啊！",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "What a nice day it is!",
        "zh": "多么好的天气啊！",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "How beautiful the flowers are!",
        "zh": "这些花真漂亮啊！",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "What a clever dog it is!",
        "zh": "多么聪明的狗啊！",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "How well she sings!",
        "zh": "她唱得多好啊！",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "What a wonderful performance it is!",
        "zh": "多么精彩的表演啊！",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "How exciting the game is!",
        "zh": "比赛真激动人心啊！",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "What a great idea it is!",
        "zh": "多么好的主意啊！",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "How carefully he writes!",
        "zh": "他写得多认真啊！",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "What a bright moon it is tonight!",
        "zh": "今晚的月亮真亮啊！",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "How happy they are!",
        "zh": "他们多开心啊！",
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
    "image": "l13-excl-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "_____ tall building it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "building是可数名词单数，用What a",
        "sentence": "What a tall building it is!",
        "zh": "多么高的楼啊！"
      },
      {
        "q": "_____ sweet the apple is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "sweet是形容词，用How",
        "sentence": "How sweet the apple is!",
        "zh": "这个苹果真甜啊！"
      },
      {
        "q": "_____ heavy rain it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 0,
        "hint": "rain是不可数名词，用What",
        "sentence": "What heavy rain it is!",
        "zh": "多么大的雨啊！"
      },
      {
        "q": "_____ quickly the time flies!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "quickly是副词，用How",
        "sentence": "How quickly the time flies!",
        "zh": "时间过得真快啊！"
      },
      {
        "q": "_____ nice day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a nice day it is!",
        "zh": "多么好的天气啊！"
      },
      {
        "q": "_____ beautiful the flowers are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "beautiful是形容词，用How",
        "sentence": "How beautiful the flowers are!",
        "zh": "这些花真漂亮啊！"
      },
      {
        "q": "_____ clever dog it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "dog是可数名词单数，用What a",
        "sentence": "What a clever dog it is!",
        "zh": "多么聪明的狗啊！"
      },
      {
        "q": "_____ well she sings!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "well是副词，用How",
        "sentence": "How well she sings!",
        "zh": "她唱得多好啊！"
      },
      {
        "q": "_____ wonderful performance it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "performance是可数名词单数，用What a",
        "sentence": "What a wonderful performance it is!",
        "zh": "多么精彩的表演啊！"
      },
      {
        "q": "_____ exciting the game is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "exciting是形容词，用How",
        "sentence": "How exciting the game is!",
        "zh": "比赛真激动人心啊！"
      },
      {
        "q": "_____ great idea it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "idea是可数名词单数，用What a",
        "sentence": "What a great idea it is!",
        "zh": "多么好的主意啊！"
      },
      {
        "q": "_____ carefully he writes!",
        "opts": [
          "What",
          "How",
          "What a"
        ],
        "ans": 1,
        "hint": "carefully是副词，用How",
        "sentence": "How carefully he writes!",
        "zh": "他写得多认真啊！"
      },
      {
        "q": "_____ bright moon it is tonight!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "moon是可数名词单数，用What a",
        "sentence": "What a bright moon it is tonight!",
        "zh": "今晚的月亮真亮啊！"
      },
      {
        "q": "_____ happy they are!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "happy是形容词，用How",
        "sentence": "How happy they are!",
        "zh": "他们多开心啊！"
      },
      {
        "q": "_____ delicious the dinner is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "delicious是形容词，用How",
        "sentence": "How delicious the dinner is!",
        "zh": "晚餐真美味啊！"
      },
      {
        "q": "_____ sunny day it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "day是可数名词单数，用What a",
        "sentence": "What a sunny day it is!",
        "zh": "多么晴朗的一天啊！"
      },
      {
        "q": "_____ hot the soup is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 2,
        "hint": "hot是形容词，用How",
        "sentence": "How hot the soup is!",
        "zh": "汤真烫啊！"
      },
      {
        "q": "_____ cute baby it is!",
        "opts": [
          "What",
          "What a",
          "How"
        ],
        "ans": 1,
        "hint": "baby是可数名词单数，用What a",
        "sentence": "What a cute baby it is!",
        "zh": "多么可爱的宝宝啊！"
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
      "What a/an + adj + 可数单数!",
      "What + adj + 不可数/复数!",
      "How + adj/adv (+主谓)!",
      "weather / news / advice 不可数，What 后不加 a。"
    ],
    "chant": "What plus noun, How plus word! Exclaim loud — let it be heard!",
    "chantSpeak": "What plus noun, How plus word! Exclaim loud, let it be heard!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "感叹句 What / How",
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