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
    "audio": "I stayed at home because it was raining.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。",
    "image": "w4-conj-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-conj-hero.jpg",
    "question": "because 连接的是原因还是结果？",
    "choices": [
      {
        "text": "原因（为什么）",
        "correct": true,
        "fb": "对了！because + 原因从句。"
      },
      {
        "text": "结果（所以）",
        "correct": false,
        "fb": "结果用 so。"
      },
      {
        "text": "转折（但是）",
        "correct": false,
        "fb": "转折用 but。"
      }
    ],
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-conj-hero.jpg",
    "lead": "because 接原因，so 接结果，but 接转折；because 和 so 不能同时用。",
    "formula": "… because …　　…, so …　　…, but …",
    "parts": [
      {
        "mark": "because",
        "label": "因为",
        "example": "because it was raining"
      },
      {
        "mark": "so",
        "label": "所以",
        "example": "so I stayed at home"
      },
      {
        "mark": "but",
        "label": "但是",
        "example": "but I finished it"
      }
    ],
    "samples": [
      {
        "sentence": "I stayed at home because it was raining.",
        "zh": "因为下雨，我待在家里。"
      },
      {
        "sentence": "It was raining, so I stayed at home.",
        "zh": "下雨了，所以我待在家里。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-conj-because.jpg",
    "rightImage": "w4-conj-so.jpg",
    "leftLabel": "because 因为",
    "rightLabel": "so 所以",
    "leftSentence": "He was tired because he worked late.",
    "leftZh": "他累了，因为工作到很晚。",
    "rightSentence": "It was raining, so I took an umbrella.",
    "rightZh": "在下雨，所以我带了伞。",
    "morphBase": "because",
    "morphPast": "so",
    "morphHighlight": "",
    "discovery": "because 原因在前或后；so 前因后果；but 转折。"
  },
  {
    "section": "精讲",
    "title": "例句 · because",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-conj-hero.jpg",
    "lead": "because 后面是原因从句。",
    "sentence": "I stayed at home because it was raining.",
    "zh": "因为下雨，我待在家里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · but",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-conj-hero.jpg",
    "lead": "but 连接相反信息。",
    "sentence": "He is short, but he runs fast.",
    "zh": "他个子矮，但跑得快。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "because 表示原因",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "because 用来解释为什么，回答 why 的问题。",
    "sentence": "I like pandas because they are cute.",
    "zh": "我喜欢熊猫，因为它们很可爱。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "so 表示结果",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-umbrella.png",
    "lead": "so 用来表示因为前面的事情而导致的后果。",
    "sentence": "It was raining, so I took an umbrella.",
    "zh": "下雨了，所以我带了一把伞。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "but 表示转折",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-playground.png",
    "lead": "but 用来表示前后意思相反或出乎意料。",
    "sentence": "I wanted to play outside, but it was raining.",
    "zh": "我想出去玩，但是下雨了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-conj-hero.jpg",
    "lead": "三种常用连词。",
    "rules": [
      {
        "tab": "because",
        "rule": "because + 原因（回答 Why）",
        "focusVerb": "because",
        "examples": [
          {
            "from": "Why?",
            "to": "because…"
          }
        ],
        "sample": "I stayed at home because it was raining.",
        "sampleZh": "我待在家里，因为在下雨。"
      },
      {
        "tab": "so/but",
        "rule": "so 结果；but 转折",
        "focusVerb": "so",
        "examples": [
          {
            "from": "rain",
            "to": "so I took an umbrella"
          },
          {
            "from": "young",
            "to": "but wise"
          }
        ],
        "sample": "It was raining, so I took an umbrella.",
        "sampleZh": "在下雨，所以我带了伞。"
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
    "image": "w4-conj-hero.jpg",
    "buckets": [
      {
        "key": "cause",
        "label": "because 原因"
      },
      {
        "key": "result",
        "label": "so 结果"
      },
      {
        "key": "turn",
        "label": "but 转折"
      }
    ],
    "items": [
      {
        "text": "I like tea because it is warm.",
        "bucket": "cause"
      },
      {
        "text": "I was hungry, so I ate.",
        "bucket": "result"
      },
      {
        "text": "She is young but wise.",
        "bucket": "turn"
      },
      {
        "text": "He failed because he didn't study.",
        "bucket": "cause"
      },
      {
        "text": "It was late, so we went home.",
        "bucket": "result"
      },
      {
        "text": "The box is heavy but useful.",
        "bucket": "turn"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-conj-hero.jpg",
    "question": "「Because it was late, so we took a taxi.」错在哪？",
    "choices": [
      {
        "text": "because 和 so 不能一起用，删掉一个",
        "correct": true,
        "fb": "中文「因为……所以」英语只留一个。"
      },
      {
        "text": "taxi 前要加 the",
        "correct": false,
        "fb": "不是主要错误。"
      },
      {
        "text": "late 要改成 later",
        "correct": false,
        "fb": "late 正确。"
      }
    ],
    "sentence": "Because it was late, we took a taxi.",
    "zh": "因为晚了，我们打了车。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-conj-hero.jpg",
    "lead": "because 句改写成 so 句。",
    "items": [
      {
        "from": "I stayed at home because it was raining.",
        "fromZh": "因为下雨我待在家里。",
        "steps": [
          {
            "label": "改用 so",
            "opts": [
              "It was raining, so I stayed at home.",
              "Because it was raining, so I stayed at home.",
              "It was raining because I stayed at home."
            ],
            "ans": 0,
            "hint": "前因 so 后果。",
            "sentence": "It was raining, so I stayed at home.",
            "zh": "下雨了，所以我待在家里。"
          }
        ]
      },
      {
        "from": "Because it was late, so we took a taxi.",
        "fromZh": "因为很晚了，所以我们坐了出租车。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "Because it was late, we took a taxi.",
              "Because it was late, so we took a taxi.",
              "It was late, because we took a taxi."
            ],
            "ans": 0,
            "hint": "because 和 so 不能同时用",
            "sentence": "Because it was late, we took a taxi.",
            "zh": "因为很晚了，所以我们坐了出租车。"
          }
        ]
      },
      {
        "from": "I like apples, but I eat one every day.",
        "fromZh": "我喜欢苹果，但我每天吃一个。",
        "steps": [
          {
            "label": "改成逻辑正确的句子",
            "opts": [
              "I like apples, so I eat one every day.",
              "I like apples, but I eat one every day.",
              "I like apples, because I eat one every day."
            ],
            "ans": 0,
            "hint": "喜欢和吃是因果关系",
            "sentence": "I like apples, so I eat one every day.",
            "zh": "我喜欢苹果，所以我每天吃一个。"
          }
        ]
      },
      {
        "from": "He is sick, but he goes to school.",
        "fromZh": "他生病了，但他去上学。",
        "steps": [
          {
            "label": "改成原因结果句",
            "opts": [
              "He is sick, so he goes to school.",
              "He is sick, but he goes to school.",
              "He is sick, because he goes to school."
            ],
            "ans": 0,
            "hint": "生病是原因，去上学是结果",
            "sentence": "He is sick, so he goes to school.",
            "zh": "他生病了，所以去上学。"
          }
        ]
      },
      {
        "from": "I stayed home because it rained, so I watched TV.",
        "fromZh": "我因为下雨待在家，所以看电视。",
        "steps": [
          {
            "label": "改成更简洁的句子",
            "opts": [
              "It rained, so I stayed home and watched TV.",
              "Because it rained, so I stayed home and watched TV.",
              "I stayed home, but it rained, so I watched TV."
            ],
            "ans": 0,
            "hint": "避免重复使用连词",
            "sentence": "It rained, so I stayed home and watched TV.",
            "zh": "下雨了，所以我待在家看电视。"
          }
        ]
      },
      {
        "from": "She is young, but she can cook.",
        "fromZh": "她年轻，但她会做饭。",
        "steps": [
          {
            "label": "改成原因结果句",
            "opts": [
              "She is young, so she can cook.",
              "She is young, but she can cook.",
              "She is young, because she can cook."
            ],
            "ans": 0,
            "hint": "年轻是原因，会做饭是结果",
            "sentence": "She is young, so she can cook.",
            "zh": "她年轻，所以会做饭。"
          }
        ]
      },
      {
        "from": "I like the cat, but it is cute.",
        "fromZh": "我喜欢猫，但它很可爱。",
        "steps": [
          {
            "label": "改成原因结果句",
            "opts": [
              "I like the cat because it is cute.",
              "I like the cat, but it is cute.",
              "I like the cat, so it is cute."
            ],
            "ans": 0,
            "hint": "可爱是原因",
            "sentence": "I like the cat because it is cute.",
            "zh": "我喜欢猫，因为它很可爱。"
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
      "I",
      "like",
      "pandas",
      "because",
      "they",
      "are",
      "cute"
    ],
    "sentence": "I like pandas because they are cute.",
    "zh": "我喜欢熊猫，因为它们很可爱。",
    "items": [
      {
        "tokens": [
          "I",
          "like",
          "pandas",
          "because",
          "they",
          "are",
          "cute"
        ],
        "sentence": "I like pandas because they are cute.",
        "zh": "我喜欢熊猫，因为它们很可爱。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "It",
          "was",
          "raining,",
          "so",
          "I",
          "took",
          "an",
          "umbrella"
        ],
        "sentence": "It was raining, so I took an umbrella.",
        "zh": "下雨了，所以我带了一把伞。",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "I",
          "wanted",
          "to",
          "play",
          "basketball,",
          "but",
          "it",
          "was",
          "too",
          "hot"
        ],
        "sentence": "I wanted to play basketball, but it was too hot.",
        "zh": "我想打篮球，但是太热了。",
        "image": "kp3d-basketball.png"
      },
      {
        "tokens": [
          "I",
          "was",
          "hungry,",
          "so",
          "I",
          "bought",
          "a",
          "sandwich",
          "at",
          "the",
          "shop"
        ],
        "sentence": "I was hungry, so I bought a sandwich at the shop.",
        "zh": "我饿了，所以在商店买了一个三明治。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "I",
          "like",
          "the",
          "piano",
          "because",
          "it",
          "sounds",
          "beautiful"
        ],
        "sentence": "I like the piano because it sounds beautiful.",
        "zh": "我喜欢钢琴，因为它听起来很美。",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "The",
          "cat",
          "is",
          "small,",
          "but",
          "it",
          "is",
          "very",
          "brave"
        ],
        "sentence": "The cat is small, but it is very brave.",
        "zh": "猫很小，但它很勇敢。",
        "image": "kp3d-cat.png"
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
    "image": "w4-conj-hero.jpg",
    "audio": "I stayed at home because it was raining.",
    "tokens": [
      "I",
      "stayed",
      "at",
      "home",
      "because",
      "it",
      "was",
      "raining"
    ],
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-conj-hero.jpg",
    "q": "The boy has few friends because he is _____.",
    "opts": [
      "friendly",
      "shy",
      "kind"
    ],
    "ans": 1,
    "hint": "few friends 的原因 → because 后接原因。",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为在下雨。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-conj-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "The boy has few friends because he is _____.",
        "opts": [
          "friendly",
          "shy",
          "kind"
        ],
        "ans": 1,
        "hint": "few friends 的原因 → because 后接原因。",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为在下雨。"
      },
      {
        "q": "The boy has few friends _____ he is shy.",
        "opts": [
          "so",
          "because",
          "but"
        ],
        "ans": 1,
        "hint": "shy 是原因。",
        "sentence": "The boy has few friends because he is shy.",
        "zh": "男孩朋友少，因为他害羞。"
      },
      {
        "q": "I like tea, _____ I don't like coffee.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "转折 but。",
        "sentence": "I like tea, but I don't like coffee.",
        "zh": "我喜欢茶，但不喜欢咖啡。"
      },
      {
        "q": "She worked hard, _____ she passed the test.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "结果 so。",
        "sentence": "She worked hard, so she passed the test.",
        "zh": "她很努力，所以通过了考试。"
      },
      {
        "q": "_____ he was ill, he still came to school.",
        "opts": [
          "Because",
          "Although",
          "So"
        ],
        "ans": 1,
        "hint": "虽然……仍然：Although（与 but 不连用）。",
        "sentence": "Although he was ill, he still came to school.",
        "zh": "虽然他病了，仍来上学。"
      },
      {
        "q": "Turn off the light _____ you leave.",
        "opts": [
          "so",
          "before",
          "because"
        ],
        "ans": 1,
        "hint": "时间 before。",
        "sentence": "Turn off the light before you leave.",
        "zh": "走之前关灯。"
      },
      {
        "q": "I stayed at home _____ it was raining.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为下雨了。"
      },
      {
        "q": "It was raining, _____ I stayed at home.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "It was raining, so I stayed at home.",
        "zh": "下雨了，所以我待在家里。"
      },
      {
        "q": "I like pandas _____ they are cute.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "说明原因",
        "sentence": "I like pandas because they are cute.",
        "zh": "我喜欢熊猫，因为它们很可爱。"
      },
      {
        "q": "The panda is cute, _____ everyone loves it.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The panda is cute, so everyone loves it.",
        "zh": "熊猫很可爱，所以大家都喜欢它。"
      },
      {
        "q": "I want to go out, _____ it is raining.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I want to go out, but it is raining.",
        "zh": "我想出去，但是下雨了。"
      },
      {
        "q": "I was hungry, _____ I ate an apple.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I was hungry, so I ate an apple.",
        "zh": "我饿了，所以我吃了一个苹果。"
      },
      {
        "q": "I ate the apple _____ I was hungry.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I ate the apple because I was hungry.",
        "zh": "我吃了苹果，因为我饿了。"
      },
      {
        "q": "She is short, _____ she can play basketball well.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "She is short, but she can play basketball well.",
        "zh": "她个子矮，但她篮球打得很好。"
      },
      {
        "q": "He studied hard, _____ he passed the exam.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "He studied hard, so he passed the exam.",
        "zh": "他努力学习，所以他通过了考试。"
      },
      {
        "q": "I didn't go to school _____ I was sick.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I didn't go to school because I was sick.",
        "zh": "我没去上学，因为我生病了。"
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
        "q": "The boy has few friends because he is _____.",
        "opts": [
          "friendly",
          "shy",
          "kind"
        ],
        "ans": 1,
        "hint": "few friends 的原因 → because 后接原因。",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为在下雨。"
      },
      {
        "q": "The boy has few friends _____ he is shy.",
        "opts": [
          "so",
          "because",
          "but"
        ],
        "ans": 1,
        "hint": "shy 是原因。",
        "sentence": "The boy has few friends because he is shy.",
        "zh": "男孩朋友少，因为他害羞。"
      },
      {
        "q": "I like tea, _____ I don't like coffee.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "转折 but。",
        "sentence": "I like tea, but I don't like coffee.",
        "zh": "我喜欢茶，但不喜欢咖啡。"
      },
      {
        "q": "She worked hard, _____ she passed the test.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "结果 so。",
        "sentence": "She worked hard, so she passed the test.",
        "zh": "她很努力，所以通过了考试。"
      },
      {
        "q": "_____ he was ill, he still came to school.",
        "opts": [
          "Because",
          "Although",
          "So"
        ],
        "ans": 1,
        "hint": "虽然……仍然：Although（与 but 不连用）。",
        "sentence": "Although he was ill, he still came to school.",
        "zh": "虽然他病了，仍来上学。"
      },
      {
        "q": "Turn off the light _____ you leave.",
        "opts": [
          "so",
          "before",
          "because"
        ],
        "ans": 1,
        "hint": "时间 before。",
        "sentence": "Turn off the light before you leave.",
        "zh": "走之前关灯。"
      },
      {
        "q": "I stayed at home _____ it was raining.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为下雨了。"
      },
      {
        "q": "It was raining, _____ I stayed at home.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "It was raining, so I stayed at home.",
        "zh": "下雨了，所以我待在家里。"
      },
      {
        "q": "I like pandas _____ they are cute.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "说明原因",
        "sentence": "I like pandas because they are cute.",
        "zh": "我喜欢熊猫，因为它们很可爱。"
      },
      {
        "q": "The panda is cute, _____ everyone loves it.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The panda is cute, so everyone loves it.",
        "zh": "熊猫很可爱，所以大家都喜欢它。"
      },
      {
        "q": "I want to go out, _____ it is raining.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I want to go out, but it is raining.",
        "zh": "我想出去，但是下雨了。"
      },
      {
        "q": "I was hungry, _____ I ate an apple.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I was hungry, so I ate an apple.",
        "zh": "我饿了，所以我吃了一个苹果。"
      },
      {
        "q": "I ate the apple _____ I was hungry.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I ate the apple because I was hungry.",
        "zh": "我吃了苹果，因为我饿了。"
      },
      {
        "q": "She is short, _____ she can play basketball well.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "She is short, but she can play basketball well.",
        "zh": "她个子矮，但她篮球打得很好。"
      },
      {
        "q": "He studied hard, _____ he passed the exam.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "He studied hard, so he passed the exam.",
        "zh": "他努力学习，所以他通过了考试。"
      },
      {
        "q": "I didn't go to school _____ I was sick.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I didn't go to school because I was sick.",
        "zh": "我没去上学，因为我生病了。"
      },
      {
        "q": "The bus was late, _____ I was late for school.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The bus was late, so I was late for school.",
        "zh": "公交车迟到了，所以我上学迟到了。"
      },
      {
        "q": "I like English, _____ I don't like math.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I like English, but I don't like math.",
        "zh": "我喜欢英语，但我不喜欢数学。"
      },
      {
        "q": "She is my friend, _____ she is not in my class.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "She is my friend, but she is not in my class.",
        "zh": "她是我的朋友，但她不在我班上。"
      },
      {
        "q": "The cat is sleeping _____ it is tired.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "The cat is sleeping because it is tired.",
        "zh": "猫在睡觉，因为它累了。"
      },
      {
        "q": "I forgot my umbrella, _____ I got wet.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I forgot my umbrella, so I got wet.",
        "zh": "我忘了带伞，所以我淋湿了。"
      },
      {
        "q": "He is tall, _____ he can't reach the apple.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "He is tall, but he can't reach the apple.",
        "zh": "他很高，但他够不到苹果。"
      },
      {
        "q": "I practice the piano every day _____ I want to be a pianist.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I practice the piano every day because I want to be a pianist.",
        "zh": "我每天练习钢琴，因为我想成为钢琴家。"
      },
      {
        "q": "I love music, _____ I join the piano club.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I love music, so I join the piano club.",
        "zh": "我热爱音乐，所以我加入了钢琴俱乐部。"
      },
      {
        "q": "I wanted to read, _____ the library was closed.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I wanted to read, but the library was closed.",
        "zh": "我想读书，但图书馆关门了。"
      },
      {
        "q": "The library is quiet, _____ I like to study there.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The library is quiet, so I like to study there.",
        "zh": "图书馆很安静，所以我喜欢在那里学习。"
      },
      {
        "q": "We went to the playground _____ the weather was nice.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "We went to the playground because the weather was nice.",
        "zh": "我们去操场，因为天气很好。"
      },
      {
        "q": "It was sunny, _____ we played on the playground.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "It was sunny, so we played on the playground.",
        "zh": "天气晴朗，所以我们在操场上玩。"
      },
      {
        "q": "I like hotpot, _____ my friend doesn't.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I like hotpot, but my friend doesn't.",
        "zh": "我喜欢火锅，但我朋友不喜欢。"
      },
      {
        "q": "We had dinner at home _____ it was cold outside.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "We had dinner at home because it was cold outside.",
        "zh": "我们在家吃晚饭，因为外面很冷。"
      },
      {
        "q": "I was tired, _____ I went to bed early.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I was tired, so I went to bed early.",
        "zh": "我累了，所以我早早上床睡觉。"
      },
      {
        "q": "I like the moon _____ it is beautiful.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I like the moon because it is beautiful.",
        "zh": "我喜欢月亮，因为它很美。"
      },
      {
        "q": "The moon is bright, _____ we can see the way.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The moon is bright, so we can see the way.",
        "zh": "月亮很亮，所以我们可以看清路。"
      },
      {
        "q": "I have a cat, _____ I don't have a dog.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I have a cat, but I don't have a dog.",
        "zh": "我有一只猫，但我没有狗。"
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
        "q": "The boy has few friends because he is _____.",
        "opts": [
          "friendly",
          "shy",
          "kind"
        ],
        "ans": 1,
        "hint": "few friends 的原因 → because 后接原因。",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为在下雨。"
      },
      {
        "q": "The boy has few friends _____ he is shy.",
        "opts": [
          "so",
          "because",
          "but"
        ],
        "ans": 1,
        "hint": "shy 是原因。",
        "sentence": "The boy has few friends because he is shy.",
        "zh": "男孩朋友少，因为他害羞。"
      },
      {
        "q": "I like tea, _____ I don't like coffee.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "转折 but。",
        "sentence": "I like tea, but I don't like coffee.",
        "zh": "我喜欢茶，但不喜欢咖啡。"
      },
      {
        "q": "She worked hard, _____ she passed the test.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "结果 so。",
        "sentence": "She worked hard, so she passed the test.",
        "zh": "她很努力，所以通过了考试。"
      },
      {
        "q": "_____ he was ill, he still came to school.",
        "opts": [
          "Because",
          "Although",
          "So"
        ],
        "ans": 1,
        "hint": "虽然……仍然：Although（与 but 不连用）。",
        "sentence": "Although he was ill, he still came to school.",
        "zh": "虽然他病了，仍来上学。"
      },
      {
        "q": "Turn off the light _____ you leave.",
        "opts": [
          "so",
          "before",
          "because"
        ],
        "ans": 1,
        "hint": "时间 before。",
        "sentence": "Turn off the light before you leave.",
        "zh": "走之前关灯。"
      },
      {
        "q": "I stayed at home _____ it was raining.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为下雨了。"
      },
      {
        "q": "It was raining, _____ I stayed at home.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "It was raining, so I stayed at home.",
        "zh": "下雨了，所以我待在家里。"
      },
      {
        "q": "I like pandas _____ they are cute.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "说明原因",
        "sentence": "I like pandas because they are cute.",
        "zh": "我喜欢熊猫，因为它们很可爱。"
      },
      {
        "q": "The panda is cute, _____ everyone loves it.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The panda is cute, so everyone loves it.",
        "zh": "熊猫很可爱，所以大家都喜欢它。"
      },
      {
        "q": "I want to go out, _____ it is raining.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I want to go out, but it is raining.",
        "zh": "我想出去，但是下雨了。"
      },
      {
        "q": "I was hungry, _____ I ate an apple.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I was hungry, so I ate an apple.",
        "zh": "我饿了，所以我吃了一个苹果。"
      },
      {
        "q": "I ate the apple _____ I was hungry.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I ate the apple because I was hungry.",
        "zh": "我吃了苹果，因为我饿了。"
      },
      {
        "q": "She is short, _____ she can play basketball well.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "She is short, but she can play basketball well.",
        "zh": "她个子矮，但她篮球打得很好。"
      },
      {
        "q": "He studied hard, _____ he passed the exam.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "He studied hard, so he passed the exam.",
        "zh": "他努力学习，所以他通过了考试。"
      },
      {
        "q": "I didn't go to school _____ I was sick.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I didn't go to school because I was sick.",
        "zh": "我没去上学，因为我生病了。"
      },
      {
        "q": "The bus was late, _____ I was late for school.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The bus was late, so I was late for school.",
        "zh": "公交车迟到了，所以我上学迟到了。"
      },
      {
        "q": "I like English, _____ I don't like math.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I like English, but I don't like math.",
        "zh": "我喜欢英语，但我不喜欢数学。"
      },
      {
        "q": "She is my friend, _____ she is not in my class.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "She is my friend, but she is not in my class.",
        "zh": "她是我的朋友，但她不在我班上。"
      },
      {
        "q": "The cat is sleeping _____ it is tired.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "The cat is sleeping because it is tired.",
        "zh": "猫在睡觉，因为它累了。"
      },
      {
        "q": "I forgot my umbrella, _____ I got wet.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I forgot my umbrella, so I got wet.",
        "zh": "我忘了带伞，所以我淋湿了。"
      },
      {
        "q": "He is tall, _____ he can't reach the apple.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "He is tall, but he can't reach the apple.",
        "zh": "他很高，但他够不到苹果。"
      },
      {
        "q": "I practice the piano every day _____ I want to be a pianist.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I practice the piano every day because I want to be a pianist.",
        "zh": "我每天练习钢琴，因为我想成为钢琴家。"
      },
      {
        "q": "I love music, _____ I join the piano club.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I love music, so I join the piano club.",
        "zh": "我热爱音乐，所以我加入了钢琴俱乐部。"
      },
      {
        "q": "I wanted to read, _____ the library was closed.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I wanted to read, but the library was closed.",
        "zh": "我想读书，但图书馆关门了。"
      },
      {
        "q": "The library is quiet, _____ I like to study there.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The library is quiet, so I like to study there.",
        "zh": "图书馆很安静，所以我喜欢在那里学习。"
      },
      {
        "q": "We went to the playground _____ the weather was nice.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "We went to the playground because the weather was nice.",
        "zh": "我们去操场，因为天气很好。"
      },
      {
        "q": "It was sunny, _____ we played on the playground.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "It was sunny, so we played on the playground.",
        "zh": "天气晴朗，所以我们在操场上玩。"
      },
      {
        "q": "I like hotpot, _____ my friend doesn't.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I like hotpot, but my friend doesn't.",
        "zh": "我喜欢火锅，但我朋友不喜欢。"
      },
      {
        "q": "We had dinner at home _____ it was cold outside.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "We had dinner at home because it was cold outside.",
        "zh": "我们在家吃晚饭，因为外面很冷。"
      },
      {
        "q": "I was tired, _____ I went to bed early.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I was tired, so I went to bed early.",
        "zh": "我累了，所以我早早上床睡觉。"
      },
      {
        "q": "I like the moon _____ it is beautiful.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I like the moon because it is beautiful.",
        "zh": "我喜欢月亮，因为它很美。"
      },
      {
        "q": "The moon is bright, _____ we can see the way.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The moon is bright, so we can see the way.",
        "zh": "月亮很亮，所以我们可以看清路。"
      },
      {
        "q": "I have a cat, _____ I don't have a dog.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I have a cat, but I don't have a dog.",
        "zh": "我有一只猫，但我没有狗。"
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
    "image": "w4-conj-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "because",
        "zh": "因为"
      },
      {
        "en": "so",
        "zh": "所以"
      },
      {
        "en": "but",
        "zh": "但是"
      },
      {
        "en": "although",
        "zh": "虽然"
      },
      {
        "en": "because it was raining",
        "zh": "因为下雨了"
      },
      {
        "en": "so I stayed at home",
        "zh": "所以我待在家里"
      },
      {
        "en": "but it is raining",
        "zh": "但是下雨了"
      },
      {
        "en": "because they are cute",
        "zh": "因为它们很可爱"
      },
      {
        "en": "so everyone loves it",
        "zh": "所以大家都喜欢它"
      },
      {
        "en": "but I don't like math",
        "zh": "但我不喜欢数学"
      },
      {
        "en": "so I was late for school",
        "zh": "所以我上学迟到了"
      },
      {
        "en": "because I was sick",
        "zh": "因为我生病了"
      },
      {
        "en": "but the library was closed",
        "zh": "但图书馆关门了"
      },
      {
        "en": "so we played on the playground",
        "zh": "所以我们在操场上玩"
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
    "image": "w4-conj-hero.jpg",
    "audio": "I stayed at home because it was raining.",
    "opts": [
      "I stayed at home because it was raining.",
      "I stayed at home, so it was raining.",
      "I stayed at home, but it was raining."
    ],
    "ans": 0,
    "hint": "注意连词",
    "sentence": "I stayed at home because it was raining.",
    "zh": "我待在家里，因为下雨了。",
    "questions": [
      {
        "audio": "I stayed at home because it was raining.",
        "opts": [
          "I stayed at home because it was raining.",
          "I stayed at home, so it was raining.",
          "I stayed at home, but it was raining."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "我待在家里，因为下雨了。",
        "sentence": "I stayed at home because it was raining."
      },
      {
        "audio": "It was raining, so I stayed at home.",
        "opts": [
          "It was raining, so I stayed at home.",
          "It was raining, because I stayed at home.",
          "It was raining, but I stayed at home."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "下雨了，所以我待在家里。",
        "sentence": "It was raining, so I stayed at home."
      },
      {
        "audio": "I like pandas because they are cute.",
        "opts": [
          "I like pandas because they are cute.",
          "I like pandas, so they are cute.",
          "I like pandas, but they are cute."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "我喜欢熊猫，因为它们很可爱。",
        "sentence": "I like pandas because they are cute."
      },
      {
        "audio": "The panda is cute, so everyone loves it.",
        "opts": [
          "The panda is cute, so everyone loves it.",
          "The panda is cute, because everyone loves it.",
          "The panda is cute, but everyone loves it."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "熊猫很可爱，所以大家都喜欢它。",
        "sentence": "The panda is cute, so everyone loves it."
      },
      {
        "audio": "I want to go out, but it is raining.",
        "opts": [
          "I want to go out, but it is raining.",
          "I want to go out, so it is raining.",
          "I want to go out, because it is raining."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "我想出去，但是下雨了。",
        "sentence": "I want to go out, but it is raining."
      },
      {
        "audio": "I was hungry, so I ate an apple.",
        "opts": [
          "I was hungry, so I ate an apple.",
          "I was hungry, but I ate an apple.",
          "I was hungry, because I ate an apple."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "我饿了，所以我吃了一个苹果。",
        "sentence": "I was hungry, so I ate an apple."
      },
      {
        "audio": "She is short, but she can play basketball well.",
        "opts": [
          "She is short, but she can play basketball well.",
          "She is short, so she can play basketball well.",
          "She is short, because she can play basketball well."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "她个子矮，但她篮球打得很好。",
        "sentence": "She is short, but she can play basketball well."
      },
      {
        "audio": "He studied hard, so he passed the exam.",
        "opts": [
          "He studied hard, so he passed the exam.",
          "He studied hard, but he passed the exam.",
          "He studied hard, because he passed the exam."
        ],
        "ans": 0,
        "hint": "注意连词",
        "zh": "他努力学习，所以他通过了考试。",
        "sentence": "He studied hard, so he passed the exam."
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
    "image": "w4-conj-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I stayed at home because it was raining.",
        "zh": "我待在家里，因为下雨了。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "It was raining, so I stayed at home.",
        "zh": "下雨了，所以我待在家里。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "I like pandas because they are cute.",
        "zh": "我喜欢熊猫，因为它们很可爱。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The panda is cute, so everyone loves it.",
        "zh": "熊猫很可爱，所以大家都喜欢它。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I want to go out, but it is raining.",
        "zh": "我想出去，但是下雨了。",
        "tag": "daily_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "I was hungry, so I ate an apple.",
        "zh": "我饿了，所以我吃了一个苹果。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "I ate the apple because I was hungry.",
        "zh": "我吃了苹果，因为我饿了。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "She is short, but she can play basketball well.",
        "zh": "她个子矮，但她篮球打得很好。",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "He studied hard, so he passed the exam.",
        "zh": "他努力学习，所以他通过了考试。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I didn't go to school because I was sick.",
        "zh": "我没去上学，因为我生病了。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The bus was late, so I was late for school.",
        "zh": "公交车迟到了，所以我上学迟到了。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "I like English, but I don't like math.",
        "zh": "我喜欢英语，但我不喜欢数学。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She is my friend, but she is not in my class.",
        "zh": "她是我的朋友，但她不在我班上。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The cat is sleeping because it is tired.",
        "zh": "猫在睡觉，因为它累了。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "I forgot my umbrella, so I got wet.",
        "zh": "我忘了带伞，所以我淋湿了。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "He is tall, but he can't reach the apple.",
        "zh": "他很高，但他够不到苹果。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "I practice the piano every day because I want to be a pianist.",
        "zh": "我每天练习钢琴，因为我想成为钢琴家。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "I love music, so I join the piano club.",
        "zh": "我热爱音乐，所以我加入了钢琴俱乐部。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "I wanted to read, but the library was closed.",
        "zh": "我想读书，但图书馆关门了。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The library is quiet, so I like to study there.",
        "zh": "图书馆很安静，所以我喜欢在那里学习。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "We went to the playground because the weather was nice.",
        "zh": "我们去操场，因为天气很好。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "It was sunny, so we played on the playground.",
        "zh": "天气晴朗，所以我们在操场上玩。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I like hotpot, but my friend doesn't.",
        "zh": "我喜欢火锅，但我朋友不喜欢。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We had dinner at home because it was cold outside.",
        "zh": "我们在家吃晚饭，因为外面很冷。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
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
    "image": "w4-conj-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The bus was late, _____ I was late for school.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The bus was late, so I was late for school.",
        "zh": "公交车迟到了，所以我上学迟到了。"
      },
      {
        "q": "I like English, _____ I don't like math.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I like English, but I don't like math.",
        "zh": "我喜欢英语，但我不喜欢数学。"
      },
      {
        "q": "She is my friend, _____ she is not in my class.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "She is my friend, but she is not in my class.",
        "zh": "她是我的朋友，但她不在我班上。"
      },
      {
        "q": "The cat is sleeping _____ it is tired.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "The cat is sleeping because it is tired.",
        "zh": "猫在睡觉，因为它累了。"
      },
      {
        "q": "I forgot my umbrella, _____ I got wet.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I forgot my umbrella, so I got wet.",
        "zh": "我忘了带伞，所以我淋湿了。"
      },
      {
        "q": "He is tall, _____ he can't reach the apple.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "He is tall, but he can't reach the apple.",
        "zh": "他很高，但他够不到苹果。"
      },
      {
        "q": "I practice the piano every day _____ I want to be a pianist.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I practice the piano every day because I want to be a pianist.",
        "zh": "我每天练习钢琴，因为我想成为钢琴家。"
      },
      {
        "q": "I love music, _____ I join the piano club.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I love music, so I join the piano club.",
        "zh": "我热爱音乐，所以我加入了钢琴俱乐部。"
      },
      {
        "q": "I wanted to read, _____ the library was closed.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I wanted to read, but the library was closed.",
        "zh": "我想读书，但图书馆关门了。"
      },
      {
        "q": "The library is quiet, _____ I like to study there.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The library is quiet, so I like to study there.",
        "zh": "图书馆很安静，所以我喜欢在那里学习。"
      },
      {
        "q": "We went to the playground _____ the weather was nice.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "We went to the playground because the weather was nice.",
        "zh": "我们去操场，因为天气很好。"
      },
      {
        "q": "It was sunny, _____ we played on the playground.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "It was sunny, so we played on the playground.",
        "zh": "天气晴朗，所以我们在操场上玩。"
      },
      {
        "q": "I like hotpot, _____ my friend doesn't.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I like hotpot, but my friend doesn't.",
        "zh": "我喜欢火锅，但我朋友不喜欢。"
      },
      {
        "q": "We had dinner at home _____ it was cold outside.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "We had dinner at home because it was cold outside.",
        "zh": "我们在家吃晚饭，因为外面很冷。"
      },
      {
        "q": "I was tired, _____ I went to bed early.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "I was tired, so I went to bed early.",
        "zh": "我累了，所以我早早上床睡觉。"
      },
      {
        "q": "I like the moon _____ it is beautiful.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 0,
        "hint": "表示原因",
        "sentence": "I like the moon because it is beautiful.",
        "zh": "我喜欢月亮，因为它很美。"
      },
      {
        "q": "The moon is bright, _____ we can see the way.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 1,
        "hint": "表示结果",
        "sentence": "The moon is bright, so we can see the way.",
        "zh": "月亮很亮，所以我们可以看清路。"
      },
      {
        "q": "I have a cat, _____ I don't have a dog.",
        "opts": [
          "because",
          "so",
          "but"
        ],
        "ans": 2,
        "hint": "表示转折",
        "sentence": "I have a cat, but I don't have a dog.",
        "zh": "我有一只猫，但我没有狗。"
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
      "because + 原因",
      "so + 结果（前因后果）",
      "but + 转折；写作连接两句",
      "although 不与 but 连用，和 because/so 是同一类易错。"
    ],
    "chant": "Because tells you why! So shows result — try, try, try!",
    "chantSpeak": "Because tells you why! So shows result, try, try, try!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "连词 because / so / but",
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