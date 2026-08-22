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
    "audio": "It was so hot that we stayed inside.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。",
    "image": "w5-sosuch-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-sosuch-hero.jpg",
    "question": "so hot that 中 so 后面接什么？",
    "choices": [
      {
        "text": "形容词/副词（hot）",
        "correct": true,
        "fb": "对了！so + adj/adv + that。"
      },
      {
        "text": "名词（day）",
        "correct": false,
        "fb": "名词前用 such，如 such a hot day。"
      },
      {
        "text": "动词",
        "correct": false,
        "fb": "so 后接形容词或副词。"
      }
    ],
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-sosuch-hero.jpg",
    "lead": "so…that 与 such…that 都表示「如此……以至于」。",
    "formula": "so + 形/副 + that　　such + (a/an) + 形 + 名 + that",
    "parts": [
      {
        "mark": "so",
        "label": "形容词/副词",
        "example": "so hot that…"
      },
      {
        "mark": "such",
        "label": "名词短语",
        "example": "such a hot day that…"
      }
    ],
    "samples": [
      {
        "sentence": "It was so hot that we stayed inside.",
        "zh": "天太热了，以至于我们待在室内。"
      },
      {
        "sentence": "It was such a hot day that we stayed inside.",
        "zh": "那是如此炎热的一天，我们待在室内。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-sosuch-so.jpg",
    "rightImage": "w5-sosuch-such.jpg",
    "leftLabel": "so hot that",
    "rightLabel": "such a hot day that",
    "leftSentence": "He ran so fast that I couldn't catch him.",
    "leftZh": "他跑得太快，我追不上。",
    "rightSentence": "It was such a hot day that we stayed inside.",
    "rightZh": "天太热了，我们待在室内。",
    "morphBase": "so hot",
    "morphPast": "such a hot day",
    "morphHighlight": "",
    "discovery": "so + 形容词/副词 + that；such + (a/an) + 形容词 + 名词 + that。"
  },
  {
    "section": "精讲",
    "title": "例句 · so + 形",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-sosuch-hero.jpg",
    "lead": "so 直接加 hot。",
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，以至于我们待在室内。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · such a + 名",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-sosuch-hero.jpg",
    "lead": "such a heavy box。",
    "sentence": "It was such a heavy box that I couldn't carry it.",
    "zh": "箱子那么重，我搬不动。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "用 so…that 描述结果",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "so 后面接形容词或副词，表示“太……以至于……”。",
    "sentence": "The panda was so cute that everyone loved it.",
    "zh": "这只熊猫太可爱了，每个人都喜欢它。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "用 such…that 描述结果",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "such 后面接名词短语（a/an + 形容词 + 名词），表示“这么……的……以至于……”。",
    "sentence": "It was such a cute panda that everyone loved it.",
    "zh": "这是一只这么可爱的熊猫，每个人都喜欢它。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "区分 so 和 such",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-piano.png",
    "lead": "so 修饰形容词/副词，such 修饰名词短语。",
    "sentence": "The music was so loud that I could not hear. It was such loud music that I could not hear.",
    "zh": "音乐太吵了，我听不见。这是这么吵的音乐，我听不见。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-sosuch-hero.jpg",
    "lead": "so 与 such 的分工。",
    "rules": [
      {
        "tab": "so…that",
        "rule": "so + 形容词/副词 + that + 结果",
        "focusVerb": "so",
        "examples": [
          {
            "from": "hot",
            "to": "so hot that"
          },
          {
            "from": "fast",
            "to": "so fast that"
          }
        ],
        "sample": "It was so hot that we stayed inside.",
        "sampleZh": "天太热了，我们待在室内。"
      },
      {
        "tab": "such…that",
        "rule": "such + (a/an) + 形容词 + 名词 + that",
        "focusVerb": "such",
        "examples": [
          {
            "from": "hot day",
            "to": "such a hot day that"
          }
        ],
        "sample": "It was such a hot day that we stayed inside.",
        "sampleZh": "天太热了，我们待在室内。"
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
    "image": "w5-sosuch-hero.jpg",
    "buckets": [
      {
        "key": "so",
        "label": "so + adj/adv"
      },
      {
        "key": "such",
        "label": "such + 名词"
      }
    ],
    "items": [
      {
        "text": "so hot that",
        "bucket": "so"
      },
      {
        "text": "such a nice day that",
        "bucket": "such"
      },
      {
        "text": "so quickly that",
        "bucket": "so"
      },
      {
        "text": "such good news that",
        "bucket": "such"
      },
      {
        "text": "so tired that",
        "bucket": "so"
      },
      {
        "text": "such an interesting book that",
        "bucket": "such"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-sosuch-hero.jpg",
    "question": "「He is so a clever boy that everyone likes him.」应改成？",
    "choices": [
      {
        "text": "such a clever boy 或 so clever a boy",
        "correct": true,
        "fb": "名词前用 such a；so 要放在形容词前：so clever a boy。"
      },
      {
        "text": "so clever boy",
        "correct": false,
        "fb": "缺冠词。"
      },
      {
        "text": "such clever boy",
        "correct": false,
        "fb": "可数单数要 a。"
      }
    ],
    "sentence": "He is such a clever boy that everyone likes him.",
    "zh": "他是如此聪明的男孩，大家都喜欢他。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-sosuch-hero.jpg",
    "lead": "so 句改 such 句。",
    "items": [
      {
        "from": "The film was so interesting that I saw it twice.",
        "fromZh": "电影太有趣了，我看了两遍。",
        "steps": [
          {
            "label": "改用 such",
            "opts": [
              "It was such an interesting film that I saw it twice.",
              "It was so an interesting film that I saw it twice.",
              "It was such interesting film that I saw it twice."
            ],
            "ans": 0,
            "hint": "such an interesting film。",
            "sentence": "It was such an interesting film that I saw it twice.",
            "zh": "那是一部如此有趣的电影，我看了两遍。"
          }
        ]
      },
      {
        "from": "He is so a clever boy that everyone likes him.",
        "fromZh": "他是一个这么聪明的男孩，每个人都喜欢他。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "He is such a clever boy that everyone likes him.",
              "He is so clever boy that everyone likes him.",
              "He is such clever boy that everyone likes him."
            ],
            "ans": 0,
            "hint": "such + a + 形容词 + 名词，不能用 so a",
            "sentence": "He is such a clever boy that everyone likes him.",
            "zh": "他是一个这么聪明的男孩，每个人都喜欢他。"
          }
        ]
      },
      {
        "from": "It was so a hot day that we stayed inside.",
        "fromZh": "这是这么热的一天，我们待在了室内。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "It was such a hot day that we stayed inside.",
              "It was so hot day that we stayed inside.",
              "It was such hot day that we stayed inside."
            ],
            "ans": 0,
            "hint": "such + a + 形容词 + 名词",
            "sentence": "It was such a hot day that we stayed inside.",
            "zh": "这是这么热的一天，我们待在了室内。"
          }
        ]
      },
      {
        "from": "The story was so interesting that I told it to my friends.",
        "fromZh": "这个故事太有趣了，我讲给了朋友们听。",
        "steps": [
          {
            "label": "改成 such 句型",
            "opts": [
              "It was such an interesting story that I told it to my friends.",
              "It was so interesting story that I told it to my friends.",
              "It was such interesting story that I told it to my friends."
            ],
            "ans": 0,
            "hint": "such + a/an + 形容词 + 名词",
            "sentence": "It was such an interesting story that I told it to my friends.",
            "zh": "这是一个这么有趣的故事，我讲给了朋友们听。"
          }
        ]
      },
      {
        "from": "The car is so expensive that we can't buy it.",
        "fromZh": "这车太贵了，我们买不起。",
        "steps": [
          {
            "label": "改成 such 句型",
            "opts": [
              "It is such an expensive car that we can't buy it.",
              "It is so expensive car that we can't buy it.",
              "It is such expensive car that we can't buy it."
            ],
            "ans": 0,
            "hint": "such + a/an + 形容词 + 单数名词",
            "sentence": "It is such an expensive car that we can't buy it.",
            "zh": "这是一辆这么贵的车，我们买不起。"
          }
        ]
      },
      {
        "from": "The food was so delicious that we ate everything.",
        "fromZh": "食物太好吃了，我们全吃光了。",
        "steps": [
          {
            "label": "改成 such 句型",
            "opts": [
              "It was such delicious food that we ate everything.",
              "It was so delicious food that we ate everything.",
              "It was such a delicious food that we ate everything."
            ],
            "ans": 0,
            "hint": "food 不可数，直接用 such + 形容词 + 名词",
            "sentence": "It was such delicious food that we ate everything.",
            "zh": "这是这么好吃的食物，我们全吃光了。"
          }
        ]
      },
      {
        "from": "The wind was so strong that the tree fell.",
        "fromZh": "风太大了，树倒了。",
        "steps": [
          {
            "label": "改成 such 句型",
            "opts": [
              "It was such strong wind that the tree fell.",
              "It was so strong wind that the tree fell.",
              "It was such a strong wind that the tree fell."
            ],
            "ans": 0,
            "hint": "wind 不可数，不用 a",
            "sentence": "It was such strong wind that the tree fell.",
            "zh": "这是这么大的风，树倒了。"
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
    "image": "kp3d-panda.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "The",
      "panda",
      "was",
      "so",
      "cute",
      "that",
      "everyone",
      "took",
      "photos"
    ],
    "sentence": "The panda was so cute that everyone took photos.",
    "zh": "这只熊猫太可爱了，每个人都拍照。",
    "items": [
      {
        "tokens": [
          "The",
          "panda",
          "was",
          "so",
          "cute",
          "that",
          "everyone",
          "took",
          "photos"
        ],
        "sentence": "The panda was so cute that everyone took photos.",
        "zh": "这只熊猫太可爱了，每个人都拍照。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "It",
          "was",
          "such",
          "a",
          "cute",
          "panda",
          "that",
          "everyone",
          "took",
          "photos"
        ],
        "sentence": "It was such a cute panda that everyone took photos.",
        "zh": "这是一只这么可爱的熊猫，每个人都拍照。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "The",
          "library",
          "was",
          "so",
          "quiet",
          "that",
          "I",
          "could",
          "study",
          "well"
        ],
        "sentence": "The library was so quiet that I could study well.",
        "zh": "图书馆太安静了，我能好好学习。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "It",
          "was",
          "such",
          "a",
          "quiet",
          "library",
          "that",
          "I",
          "could",
          "study",
          "well"
        ],
        "sentence": "It was such a quiet library that I could study well.",
        "zh": "这是一个这么安静的图书馆，我能好好学习。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "The",
          "basketball",
          "game",
          "was",
          "so",
          "exciting",
          "that",
          "we",
          "cheered",
          "loudly"
        ],
        "sentence": "The basketball game was so exciting that we cheered loudly.",
        "zh": "篮球比赛太激动人心了，我们大声欢呼。",
        "image": "kp3d-basketball.png"
      },
      {
        "tokens": [
          "It",
          "was",
          "such",
          "an",
          "exciting",
          "basketball",
          "game",
          "that",
          "we",
          "cheered",
          "loudly"
        ],
        "sentence": "It was such an exciting basketball game that we cheered loudly.",
        "zh": "这是一场这么激动人心的篮球比赛，我们大声欢呼。",
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
    "image": "w5-sosuch-hero.jpg",
    "audio": "It was so hot that we stayed inside.",
    "tokens": [
      "It",
      "was",
      "so",
      "hot",
      "that",
      "we",
      "stayed",
      "inside"
    ],
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-sosuch-hero.jpg",
    "q": "The box was _____ heavy _____ I couldn't carry it.",
    "opts": [
      "such; that",
      "so; that",
      "so; as"
    ],
    "ans": 1,
    "hint": "heavy 是形容词，用 so…that。",
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-sosuch-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "The box was _____ heavy _____ I couldn't carry it.",
        "opts": [
          "such; that",
          "so; that",
          "so; as"
        ],
        "ans": 1,
        "hint": "heavy 是形容词，用 so…that。",
        "sentence": "It was so hot that we stayed inside.",
        "zh": "天太热了，我们待在室内。"
      },
      {
        "q": "It was _____ weather that we stayed home.",
        "opts": [
          "so bad",
          "such bad",
          "so a bad"
        ],
        "ans": 1,
        "hint": "weather 不可数，such bad weather。",
        "sentence": "It was such bad weather that we stayed home.",
        "zh": "天气那么糟，我们待在家里。"
      },
      {
        "q": "She spoke _____ quietly _____ we couldn't hear her.",
        "opts": [
          "such; that",
          "so; that",
          "too; that"
        ],
        "ans": 1,
        "hint": "so + 副词。",
        "sentence": "She spoke so quietly that we couldn't hear her.",
        "zh": "她说得那么轻，我们听不见。"
      },
      {
        "q": "He is _____ honest boy that we all trust him.",
        "opts": [
          "so",
          "such",
          "such an"
        ],
        "ans": 2,
        "hint": "honest 元音音素 such an。",
        "sentence": "He is such an honest boy that we all trust him.",
        "zh": "他是如此诚实的男孩，我们都信任他。"
      },
      {
        "q": "The problem is so easy that I can work it out. = The problem is _____ easy _____ work out.",
        "opts": [
          "too; to",
          "enough; to",
          "so; to"
        ],
        "ans": 1,
        "hint": "easy enough to。也可 too difficult 相反转换。",
        "sentence": "The problem is easy enough to work out.",
        "zh": "这题足够简单，我能做出来。"
      },
      {
        "q": "The coffee was _____ hot that I burned my tongue.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词 + that",
        "sentence": "The coffee was so hot that I burned my tongue.",
        "zh": "咖啡太烫了，我烫到了舌头。"
      },
      {
        "q": "It was _____ a hot day that we stayed inside.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a hot day that we stayed inside.",
        "zh": "这是这么热的一天，我们待在了室内。"
      },
      {
        "q": "The boy is _____ clever that everyone likes him.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The boy is so clever that everyone likes him.",
        "zh": "这个男孩太聪明了，每个人都喜欢他。"
      },
      {
        "q": "He is _____ a clever boy that everyone likes him.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "He is such a clever boy that everyone likes him.",
        "zh": "他是一个这么聪明的男孩，每个人都喜欢他。"
      },
      {
        "q": "The story was _____ interesting that I told it to my friends.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The story was so interesting that I told it to my friends.",
        "zh": "这个故事太有趣了，我讲给了朋友们听。"
      },
      {
        "q": "It was _____ an interesting story that I told it to my friends.",
        "opts": [
          "so",
          "such",
          "quite"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an interesting story that I told it to my friends.",
        "zh": "这是一个这么有趣的故事，我讲给了朋友们听。"
      },
      {
        "q": "The car is _____ expensive that we can't buy it.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The car is so expensive that we can't buy it.",
        "zh": "这车太贵了，我们买不起。"
      },
      {
        "q": "It is _____ an expensive car that we can't buy it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It is such an expensive car that we can't buy it.",
        "zh": "这是一辆这么贵的车，我们买不起。"
      },
      {
        "q": "The dog was _____ friendly that children all liked it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The dog was so friendly that children all liked it.",
        "zh": "这只狗太友好了，孩子们都喜欢它。"
      },
      {
        "q": "It was _____ a friendly dog that children all liked it.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a friendly dog that children all liked it.",
        "zh": "这是一只这么友好的狗，孩子们都喜欢它。"
      },
      {
        "q": "The test was _____ easy that everyone passed.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The test was so easy that everyone passed.",
        "zh": "考试太简单了，每个人都通过了。"
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
        "q": "The box was _____ heavy _____ I couldn't carry it.",
        "opts": [
          "such; that",
          "so; that",
          "so; as"
        ],
        "ans": 1,
        "hint": "heavy 是形容词，用 so…that。",
        "sentence": "It was so hot that we stayed inside.",
        "zh": "天太热了，我们待在室内。"
      },
      {
        "q": "It was _____ weather that we stayed home.",
        "opts": [
          "so bad",
          "such bad",
          "so a bad"
        ],
        "ans": 1,
        "hint": "weather 不可数，such bad weather。",
        "sentence": "It was such bad weather that we stayed home.",
        "zh": "天气那么糟，我们待在家里。"
      },
      {
        "q": "She spoke _____ quietly _____ we couldn't hear her.",
        "opts": [
          "such; that",
          "so; that",
          "too; that"
        ],
        "ans": 1,
        "hint": "so + 副词。",
        "sentence": "She spoke so quietly that we couldn't hear her.",
        "zh": "她说得那么轻，我们听不见。"
      },
      {
        "q": "He is _____ honest boy that we all trust him.",
        "opts": [
          "so",
          "such",
          "such an"
        ],
        "ans": 2,
        "hint": "honest 元音音素 such an。",
        "sentence": "He is such an honest boy that we all trust him.",
        "zh": "他是如此诚实的男孩，我们都信任他。"
      },
      {
        "q": "The problem is so easy that I can work it out. = The problem is _____ easy _____ work out.",
        "opts": [
          "too; to",
          "enough; to",
          "so; to"
        ],
        "ans": 1,
        "hint": "easy enough to。也可 too difficult 相反转换。",
        "sentence": "The problem is easy enough to work out.",
        "zh": "这题足够简单，我能做出来。"
      },
      {
        "q": "The coffee was _____ hot that I burned my tongue.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词 + that",
        "sentence": "The coffee was so hot that I burned my tongue.",
        "zh": "咖啡太烫了，我烫到了舌头。"
      },
      {
        "q": "It was _____ a hot day that we stayed inside.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a hot day that we stayed inside.",
        "zh": "这是这么热的一天，我们待在了室内。"
      },
      {
        "q": "The boy is _____ clever that everyone likes him.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The boy is so clever that everyone likes him.",
        "zh": "这个男孩太聪明了，每个人都喜欢他。"
      },
      {
        "q": "He is _____ a clever boy that everyone likes him.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "He is such a clever boy that everyone likes him.",
        "zh": "他是一个这么聪明的男孩，每个人都喜欢他。"
      },
      {
        "q": "The story was _____ interesting that I told it to my friends.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The story was so interesting that I told it to my friends.",
        "zh": "这个故事太有趣了，我讲给了朋友们听。"
      },
      {
        "q": "It was _____ an interesting story that I told it to my friends.",
        "opts": [
          "so",
          "such",
          "quite"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an interesting story that I told it to my friends.",
        "zh": "这是一个这么有趣的故事，我讲给了朋友们听。"
      },
      {
        "q": "The car is _____ expensive that we can't buy it.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The car is so expensive that we can't buy it.",
        "zh": "这车太贵了，我们买不起。"
      },
      {
        "q": "It is _____ an expensive car that we can't buy it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It is such an expensive car that we can't buy it.",
        "zh": "这是一辆这么贵的车，我们买不起。"
      },
      {
        "q": "The dog was _____ friendly that children all liked it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The dog was so friendly that children all liked it.",
        "zh": "这只狗太友好了，孩子们都喜欢它。"
      },
      {
        "q": "It was _____ a friendly dog that children all liked it.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a friendly dog that children all liked it.",
        "zh": "这是一只这么友好的狗，孩子们都喜欢它。"
      },
      {
        "q": "The test was _____ easy that everyone passed.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The test was so easy that everyone passed.",
        "zh": "考试太简单了，每个人都通过了。"
      },
      {
        "q": "It was _____ an easy test that everyone passed.",
        "opts": [
          "so",
          "such",
          "quite"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an easy test that everyone passed.",
        "zh": "这是一个这么简单的考试，每个人都通过了。"
      },
      {
        "q": "The food was _____ delicious that we ate everything.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The food was so delicious that we ate everything.",
        "zh": "食物太好吃了，我们全吃光了。"
      },
      {
        "q": "It was _____ delicious food that we ate everything.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such delicious food that we ate everything.",
        "zh": "这是这么好吃的食物，我们全吃光了。"
      },
      {
        "q": "The room was _____ dirty that we cleaned it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The room was so dirty that we cleaned it.",
        "zh": "房间太脏了，我们打扫了它。"
      },
      {
        "q": "It was _____ a dirty room that we cleaned it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a dirty room that we cleaned it.",
        "zh": "这是一个这么脏的房间，我们打扫了它。"
      },
      {
        "q": "The wind was _____ strong that the tree fell.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The wind was so strong that the tree fell.",
        "zh": "风太大了，树倒了。"
      },
      {
        "q": "It was _____ strong wind that the tree fell.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such strong wind that the tree fell.",
        "zh": "这是这么大的风，树倒了。"
      },
      {
        "q": "The movie was _____ scary that I closed my eyes.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The movie was so scary that I closed my eyes.",
        "zh": "电影太吓人了，我闭上了眼睛。"
      },
      {
        "q": "It was _____ a scary movie that I closed my eyes.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a scary movie that I closed my eyes.",
        "zh": "这是一部这么吓人的电影，我闭上了眼睛。"
      },
      {
        "q": "The teacher spoke _____ fast that I could not follow.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 副词",
        "sentence": "The teacher spoke so fast that I could not follow.",
        "zh": "老师说得太快了，我跟不上。"
      },
      {
        "q": "The boy ran _____ quickly that he won the prize.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 0,
        "hint": "so + 副词",
        "sentence": "The boy ran so quickly that he won the prize.",
        "zh": "男孩跑得太快了，赢得了奖品。"
      },
      {
        "q": "The book was _____ exciting that I could not put it down.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The book was so exciting that I could not put it down.",
        "zh": "这本书太激动人心了，我放不下。"
      },
      {
        "q": "It was _____ an exciting book that I could not put it down.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an exciting book that I could not put it down.",
        "zh": "这是一本这么激动人心的书，我放不下。"
      },
      {
        "q": "The soup was _____ hot that I waited for it to cool.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The soup was so hot that I waited for it to cool.",
        "zh": "汤太烫了，我等它凉。"
      },
      {
        "q": "It was _____ hot soup that I waited for it to cool.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such hot soup that I waited for it to cool.",
        "zh": "这是这么烫的汤，我等它凉。"
      },
      {
        "q": "The music was _____ beautiful that I listened again.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The music was so beautiful that I listened again.",
        "zh": "音乐太美了，我又听了一遍。"
      },
      {
        "q": "It was _____ beautiful music that I listened again.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such beautiful music that I listened again.",
        "zh": "这是这么美的音乐，我又听了一遍。"
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
        "q": "The box was _____ heavy _____ I couldn't carry it.",
        "opts": [
          "such; that",
          "so; that",
          "so; as"
        ],
        "ans": 1,
        "hint": "heavy 是形容词，用 so…that。",
        "sentence": "It was so hot that we stayed inside.",
        "zh": "天太热了，我们待在室内。"
      },
      {
        "q": "It was _____ weather that we stayed home.",
        "opts": [
          "so bad",
          "such bad",
          "so a bad"
        ],
        "ans": 1,
        "hint": "weather 不可数，such bad weather。",
        "sentence": "It was such bad weather that we stayed home.",
        "zh": "天气那么糟，我们待在家里。"
      },
      {
        "q": "She spoke _____ quietly _____ we couldn't hear her.",
        "opts": [
          "such; that",
          "so; that",
          "too; that"
        ],
        "ans": 1,
        "hint": "so + 副词。",
        "sentence": "She spoke so quietly that we couldn't hear her.",
        "zh": "她说得那么轻，我们听不见。"
      },
      {
        "q": "He is _____ honest boy that we all trust him.",
        "opts": [
          "so",
          "such",
          "such an"
        ],
        "ans": 2,
        "hint": "honest 元音音素 such an。",
        "sentence": "He is such an honest boy that we all trust him.",
        "zh": "他是如此诚实的男孩，我们都信任他。"
      },
      {
        "q": "The problem is so easy that I can work it out. = The problem is _____ easy _____ work out.",
        "opts": [
          "too; to",
          "enough; to",
          "so; to"
        ],
        "ans": 1,
        "hint": "easy enough to。也可 too difficult 相反转换。",
        "sentence": "The problem is easy enough to work out.",
        "zh": "这题足够简单，我能做出来。"
      },
      {
        "q": "The coffee was _____ hot that I burned my tongue.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词 + that",
        "sentence": "The coffee was so hot that I burned my tongue.",
        "zh": "咖啡太烫了，我烫到了舌头。"
      },
      {
        "q": "It was _____ a hot day that we stayed inside.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a hot day that we stayed inside.",
        "zh": "这是这么热的一天，我们待在了室内。"
      },
      {
        "q": "The boy is _____ clever that everyone likes him.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The boy is so clever that everyone likes him.",
        "zh": "这个男孩太聪明了，每个人都喜欢他。"
      },
      {
        "q": "He is _____ a clever boy that everyone likes him.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "He is such a clever boy that everyone likes him.",
        "zh": "他是一个这么聪明的男孩，每个人都喜欢他。"
      },
      {
        "q": "The story was _____ interesting that I told it to my friends.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The story was so interesting that I told it to my friends.",
        "zh": "这个故事太有趣了，我讲给了朋友们听。"
      },
      {
        "q": "It was _____ an interesting story that I told it to my friends.",
        "opts": [
          "so",
          "such",
          "quite"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an interesting story that I told it to my friends.",
        "zh": "这是一个这么有趣的故事，我讲给了朋友们听。"
      },
      {
        "q": "The car is _____ expensive that we can't buy it.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The car is so expensive that we can't buy it.",
        "zh": "这车太贵了，我们买不起。"
      },
      {
        "q": "It is _____ an expensive car that we can't buy it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It is such an expensive car that we can't buy it.",
        "zh": "这是一辆这么贵的车，我们买不起。"
      },
      {
        "q": "The dog was _____ friendly that children all liked it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The dog was so friendly that children all liked it.",
        "zh": "这只狗太友好了，孩子们都喜欢它。"
      },
      {
        "q": "It was _____ a friendly dog that children all liked it.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a friendly dog that children all liked it.",
        "zh": "这是一只这么友好的狗，孩子们都喜欢它。"
      },
      {
        "q": "The test was _____ easy that everyone passed.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The test was so easy that everyone passed.",
        "zh": "考试太简单了，每个人都通过了。"
      },
      {
        "q": "It was _____ an easy test that everyone passed.",
        "opts": [
          "so",
          "such",
          "quite"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an easy test that everyone passed.",
        "zh": "这是一个这么简单的考试，每个人都通过了。"
      },
      {
        "q": "The food was _____ delicious that we ate everything.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The food was so delicious that we ate everything.",
        "zh": "食物太好吃了，我们全吃光了。"
      },
      {
        "q": "It was _____ delicious food that we ate everything.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such delicious food that we ate everything.",
        "zh": "这是这么好吃的食物，我们全吃光了。"
      },
      {
        "q": "The room was _____ dirty that we cleaned it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The room was so dirty that we cleaned it.",
        "zh": "房间太脏了，我们打扫了它。"
      },
      {
        "q": "It was _____ a dirty room that we cleaned it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a dirty room that we cleaned it.",
        "zh": "这是一个这么脏的房间，我们打扫了它。"
      },
      {
        "q": "The wind was _____ strong that the tree fell.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The wind was so strong that the tree fell.",
        "zh": "风太大了，树倒了。"
      },
      {
        "q": "It was _____ strong wind that the tree fell.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such strong wind that the tree fell.",
        "zh": "这是这么大的风，树倒了。"
      },
      {
        "q": "The movie was _____ scary that I closed my eyes.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The movie was so scary that I closed my eyes.",
        "zh": "电影太吓人了，我闭上了眼睛。"
      },
      {
        "q": "It was _____ a scary movie that I closed my eyes.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a scary movie that I closed my eyes.",
        "zh": "这是一部这么吓人的电影，我闭上了眼睛。"
      },
      {
        "q": "The teacher spoke _____ fast that I could not follow.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 副词",
        "sentence": "The teacher spoke so fast that I could not follow.",
        "zh": "老师说得太快了，我跟不上。"
      },
      {
        "q": "The boy ran _____ quickly that he won the prize.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 0,
        "hint": "so + 副词",
        "sentence": "The boy ran so quickly that he won the prize.",
        "zh": "男孩跑得太快了，赢得了奖品。"
      },
      {
        "q": "The book was _____ exciting that I could not put it down.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The book was so exciting that I could not put it down.",
        "zh": "这本书太激动人心了，我放不下。"
      },
      {
        "q": "It was _____ an exciting book that I could not put it down.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an exciting book that I could not put it down.",
        "zh": "这是一本这么激动人心的书，我放不下。"
      },
      {
        "q": "The soup was _____ hot that I waited for it to cool.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The soup was so hot that I waited for it to cool.",
        "zh": "汤太烫了，我等它凉。"
      },
      {
        "q": "It was _____ hot soup that I waited for it to cool.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such hot soup that I waited for it to cool.",
        "zh": "这是这么烫的汤，我等它凉。"
      },
      {
        "q": "The music was _____ beautiful that I listened again.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The music was so beautiful that I listened again.",
        "zh": "音乐太美了，我又听了一遍。"
      },
      {
        "q": "It was _____ beautiful music that I listened again.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such beautiful music that I listened again.",
        "zh": "这是这么美的音乐，我又听了一遍。"
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
    "image": "w5-sosuch-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "so hot that",
        "zh": "如此热以至于"
      },
      {
        "en": "such a heavy box",
        "zh": "如此重的箱子"
      },
      {
        "en": "such bad weather",
        "zh": "如此糟糕的天气"
      },
      {
        "en": "so quietly that",
        "zh": "如此轻声以至于"
      },
      {
        "en": "such a hot day",
        "zh": "这么热的一天"
      },
      {
        "en": "so fast that",
        "zh": "太快以至于"
      },
      {
        "en": "such a fast runner",
        "zh": "这么快的跑步者"
      },
      {
        "en": "so interesting that",
        "zh": "太有趣以至于"
      },
      {
        "en": "such an interesting book",
        "zh": "这么有趣的一本书"
      },
      {
        "en": "so heavy that",
        "zh": "太重以至于"
      },
      {
        "en": "so crowded that",
        "zh": "太挤以至于"
      },
      {
        "en": "such a crowded bus",
        "zh": "这么挤的一辆公交车"
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
    "image": "w5-sosuch-hero.jpg",
    "audio": "The box was so heavy that I could not lift it.",
    "opts": [
      "The box was so heavy that I could not lift it.",
      "The box was such heavy that I could not lift it.",
      "The box was so heavy box that I could not lift it."
    ],
    "ans": 0,
    "hint": "so + 形容词",
    "sentence": "The box was so heavy that I could not lift it.",
    "zh": "这个箱子太重了，我搬不动。",
    "questions": [
      {
        "audio": "The box was so heavy that I could not lift it.",
        "opts": [
          "The box was so heavy that I could not lift it.",
          "The box was such heavy that I could not lift it.",
          "The box was so heavy box that I could not lift it."
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "zh": "这个箱子太重了，我搬不动。",
        "sentence": "The box was so heavy that I could not lift it."
      },
      {
        "audio": "It was such a hot day that we stayed inside.",
        "opts": [
          "It was such a hot day that we stayed inside.",
          "It was so a hot day that we stayed inside.",
          "It was such hot day that we stayed inside."
        ],
        "ans": 0,
        "hint": "such + a + 形容词 + 名词",
        "zh": "这是这么热的一天，我们待在了室内。",
        "sentence": "It was such a hot day that we stayed inside."
      },
      {
        "audio": "The boy is so clever that everyone likes him.",
        "opts": [
          "The boy is so clever that everyone likes him.",
          "The boy is such clever that everyone likes him.",
          "The boy is so clever boy that everyone likes him."
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "zh": "这个男孩太聪明了，每个人都喜欢他。",
        "sentence": "The boy is so clever that everyone likes him."
      },
      {
        "audio": "He is such a clever boy that everyone likes him.",
        "opts": [
          "He is such a clever boy that everyone likes him.",
          "He is so a clever boy that everyone likes him.",
          "He is such clever boy that everyone likes him."
        ],
        "ans": 0,
        "hint": "such + a + 形容词 + 名词",
        "zh": "他是一个这么聪明的男孩，每个人都喜欢他。",
        "sentence": "He is such a clever boy that everyone likes him."
      },
      {
        "audio": "The story was so interesting that I told it to my friends.",
        "opts": [
          "The story was so interesting that I told it to my friends.",
          "The story was such interesting that I told it to my friends.",
          "The story was so interesting story that I told it to my friends."
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "zh": "这个故事太有趣了，我讲给了朋友们听。",
        "sentence": "The story was so interesting that I told it to my friends."
      },
      {
        "audio": "It was such an interesting story that I told it to my friends.",
        "opts": [
          "It was such an interesting story that I told it to my friends.",
          "It was so an interesting story that I told it to my friends.",
          "It was such interesting story that I told it to my friends."
        ],
        "ans": 0,
        "hint": "such + a/an + 形容词 + 名词",
        "zh": "这是一个这么有趣的故事，我讲给了朋友们听。",
        "sentence": "It was such an interesting story that I told it to my friends."
      },
      {
        "audio": "The food was so delicious that we ate everything.",
        "opts": [
          "The food was so delicious that we ate everything.",
          "The food was such delicious that we ate everything.",
          "The food was so delicious food that we ate everything."
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "zh": "食物太好吃了，我们全吃光了。",
        "sentence": "The food was so delicious that we ate everything."
      },
      {
        "audio": "It was such delicious food that we ate everything.",
        "opts": [
          "It was such delicious food that we ate everything.",
          "It was so delicious food that we ate everything.",
          "It was such a delicious food that we ate everything."
        ],
        "ans": 0,
        "hint": "such + 形容词 + 不可数名词",
        "zh": "这是这么好吃的食物，我们全吃光了。",
        "sentence": "It was such delicious food that we ate everything."
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
    "image": "w5-sosuch-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "The box was so heavy that I could not lift it.",
        "zh": "这个箱子太重了，我搬不动。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "It was such a heavy box that I could not lift it.",
        "zh": "这是一个这么重的箱子，我搬不动。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The movie was so boring that I fell asleep.",
        "zh": "电影太无聊了，我都睡着了。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "It was such a boring movie that I fell asleep.",
        "zh": "这是一部这么无聊的电影，我都睡着了。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The soup was so salty that we could not drink it.",
        "zh": "汤太咸了，我们喝不下去。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "It was such a salty soup that we could not drink it.",
        "zh": "这是一碗这么咸的汤，我们喝不下去。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The panda is so cute that everyone loves it.",
        "zh": "这只熊猫太可爱了，每个人都很喜欢。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "It is such a cute panda that everyone loves it.",
        "zh": "这是一只这么可爱的熊猫，每个人都很喜欢。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "He ran so fast that he won the race.",
        "zh": "他跑得那么快，赢得了比赛。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "It was such a fast run that he won the race.",
        "zh": "这是一次这么快的奔跑，他赢得了比赛。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The book was so interesting that I read it twice.",
        "zh": "这本书太有趣了，我读了两遍。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "It was such an interesting book that I read it twice.",
        "zh": "这是一本这么有趣的书，我读了两遍。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The weather was so nice that we went to the park.",
        "zh": "天气太好了，我们去了公园。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "It was such nice weather that we went to the park.",
        "zh": "这是这么好的天气，我们去了公园。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The bus was so crowded that we had to stand.",
        "zh": "公交车太挤了，我们只好站着。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "It was such a crowded bus that we had to stand.",
        "zh": "这是一辆这么挤的公交车，我们只好站着。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The question was so difficult that nobody could answer it.",
        "zh": "问题太难了，没人能回答。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "It was such a difficult question that nobody could answer it.",
        "zh": "这是一个这么难的问题，没人能回答。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The music was so loud that I could not hear my friend.",
        "zh": "音乐太吵了，我听不见朋友说话。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "It was such loud music that I could not hear my friend.",
        "zh": "这是这么吵的音乐，我听不见朋友说话。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The apple was so sweet that I ate it all.",
        "zh": "苹果太甜了，我全吃完了。",
        "tag": "writing_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "It was such a sweet apple that I ate it all.",
        "zh": "这是一个这么甜的苹果，我全吃完了。",
        "tag": "writing_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "The rain was so heavy that we took an umbrella.",
        "zh": "雨太大了，我们带了伞。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "It was such heavy rain that we took an umbrella.",
        "zh": "这是这么大的雨，我们带了伞。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
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
    "image": "w5-sosuch-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "It was _____ an easy test that everyone passed.",
        "opts": [
          "so",
          "such",
          "quite"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an easy test that everyone passed.",
        "zh": "这是一个这么简单的考试，每个人都通过了。"
      },
      {
        "q": "The food was _____ delicious that we ate everything.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The food was so delicious that we ate everything.",
        "zh": "食物太好吃了，我们全吃光了。"
      },
      {
        "q": "It was _____ delicious food that we ate everything.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such delicious food that we ate everything.",
        "zh": "这是这么好吃的食物，我们全吃光了。"
      },
      {
        "q": "The room was _____ dirty that we cleaned it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The room was so dirty that we cleaned it.",
        "zh": "房间太脏了，我们打扫了它。"
      },
      {
        "q": "It was _____ a dirty room that we cleaned it.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a dirty room that we cleaned it.",
        "zh": "这是一个这么脏的房间，我们打扫了它。"
      },
      {
        "q": "The wind was _____ strong that the tree fell.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The wind was so strong that the tree fell.",
        "zh": "风太大了，树倒了。"
      },
      {
        "q": "It was _____ strong wind that the tree fell.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such strong wind that the tree fell.",
        "zh": "这是这么大的风，树倒了。"
      },
      {
        "q": "The movie was _____ scary that I closed my eyes.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The movie was so scary that I closed my eyes.",
        "zh": "电影太吓人了，我闭上了眼睛。"
      },
      {
        "q": "It was _____ a scary movie that I closed my eyes.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a + 形容词 + 名词",
        "sentence": "It was such a scary movie that I closed my eyes.",
        "zh": "这是一部这么吓人的电影，我闭上了眼睛。"
      },
      {
        "q": "The teacher spoke _____ fast that I could not follow.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 副词",
        "sentence": "The teacher spoke so fast that I could not follow.",
        "zh": "老师说得太快了，我跟不上。"
      },
      {
        "q": "The boy ran _____ quickly that he won the prize.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 0,
        "hint": "so + 副词",
        "sentence": "The boy ran so quickly that he won the prize.",
        "zh": "男孩跑得太快了，赢得了奖品。"
      },
      {
        "q": "The book was _____ exciting that I could not put it down.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The book was so exciting that I could not put it down.",
        "zh": "这本书太激动人心了，我放不下。"
      },
      {
        "q": "It was _____ an exciting book that I could not put it down.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + a/an + 形容词 + 名词",
        "sentence": "It was such an exciting book that I could not put it down.",
        "zh": "这是一本这么激动人心的书，我放不下。"
      },
      {
        "q": "The soup was _____ hot that I waited for it to cool.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The soup was so hot that I waited for it to cool.",
        "zh": "汤太烫了，我等它凉。"
      },
      {
        "q": "It was _____ hot soup that I waited for it to cool.",
        "opts": [
          "so",
          "such",
          "too"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such hot soup that I waited for it to cool.",
        "zh": "这是这么烫的汤，我等它凉。"
      },
      {
        "q": "The music was _____ beautiful that I listened again.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 0,
        "hint": "so + 形容词",
        "sentence": "The music was so beautiful that I listened again.",
        "zh": "音乐太美了，我又听了一遍。"
      },
      {
        "q": "It was _____ beautiful music that I listened again.",
        "opts": [
          "so",
          "such",
          "very"
        ],
        "ans": 1,
        "hint": "such + 形容词 + 不可数名词",
        "sentence": "It was such beautiful music that I listened again.",
        "zh": "这是这么美的音乐，我又听了一遍。"
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
      "so + 形容词/副词 + that",
      "such + (a/an) + adj + 名词 + that",
      "that 后接结果从句",
      "so many / so much 是固定搭配，即使后面有名词也不改 such。"
    ],
    "chant": "So plus adj or adverb — that's the way! Such plus noun — remember today!",
    "chantSpeak": "So plus adj or adverb, that is the way! Such plus noun, remember today!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "so…that / such…that",
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