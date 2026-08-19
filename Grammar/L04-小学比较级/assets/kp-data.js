(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 谁更大？",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "The dinosaur is bigger than the rabbit.",
    "soundHint": "先听，不要看文字。他们在比较什么？",
    "question": "这句话在比较两件东西吗？",
    "sentence": "The dinosaur is bigger than the rabbit.",
    "zh": "恐龙比兔子大。",
    "image": "l04-dino-rabbit.jpg",
    "source": "PSLE Set 02 · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 比较级在哪里？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l04-dino-rabbit.jpg",
    "question": "「The dinosaur is bigger than the rabbit.」哪一部分表示「比……更……」？",
    "choices": [
      {
        "text": "dinosaur",
        "correct": false,
        "fb": "dinosaur 只是名词，不是比较结构。"
      },
      {
        "text": "bigger than",
        "correct": true,
        "fb": "对了！形容词比较级 + than = 比……更……"
      },
      {
        "text": "the rabbit",
        "correct": false,
        "fb": "the rabbit 是被比较的对象，在 than 后面。"
      }
    ],
    "sentence": "The dinosaur is bigger than the rabbit.",
    "zh": "恐龙比兔子大。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l04-dino-rabbit.jpg",
    "lead": "比较两个人或物时，用「比较级 + than」。",
    "formula": "A is + 比较级 + than + B",
    "parts": [
      {
        "mark": "A",
        "label": "比较对象 1",
        "example": "The dinosaur"
      },
      {
        "mark": "-er",
        "label": "形容词比较级",
        "example": "bigger"
      },
      {
        "mark": "than",
        "label": "比较词",
        "example": "than"
      },
      {
        "mark": "B",
        "label": "比较对象 2",
        "example": "the rabbit"
      }
    ],
    "samples": [
      {
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · 短词怎么变？",
    "type": "discover",
    "lead": "点击左右卡片听例句，再点按钮看变化规律。",
    "leftImage": "l04-tall-boy.jpg",
    "rightImage": "l04-taller-boy.jpg",
    "leftLabel": "tall（原级）",
    "rightLabel": "taller（比较级）",
    "leftSentence": "Tom is tall.",
    "leftZh": "汤姆很高。",
    "rightSentence": "Tom is taller than Jack.",
    "rightZh": "汤姆比杰克高。",
    "morphBase": "tall",
    "morphPast": "taller",
    "morphHighlight": "er",
    "morphSpeak": "Tom is tall. Tom is taller than Jack.",
    "discovery": "单音节形容词一般直接加 -er，再加 than：tall → taller than。"
  },
  {
    "section": "精讲",
    "title": "例句 · 谁更年轻",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l04-dino-rabbit.jpg",
    "lead": "young → younger，直接加 -er。",
    "sentence": "My father is younger than my mother.",
    "zh": "我爸爸比我妈妈年轻。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 谁更重",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l04-dino-rabbit.jpg",
    "lead": "heavy → heavier：辅音 + y 变 i 再加 -er。",
    "sentence": "Chen Jie is heavier than Amy.",
    "zh": "陈洁比艾米重。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "拼写规则卡 · -er 变化",
    "type": "spelling",
    "image": "l04-spell-rules.jpg",
    "lead": "小升初常考三种拼写变化，点击标签切换。",
    "rules": [
      {
        "tab": "直接 +er",
        "rule": "大多数短形容词：直接加 -er",
        "focusVerb": "taller",
        "examples": [
          {
            "from": "tall",
            "to": "taller"
          },
          {
            "from": "old",
            "to": "older"
          },
          {
            "from": "young",
            "to": "younger"
          }
        ],
        "sample": "My father is younger than my mother.",
        "sampleZh": "我爸爸比我妈妈年轻。",
        "sampleImage": "l04-father-mother.jpg"
      },
      {
        "tab": "y→ier",
        "rule": "以辅音+y 结尾：变 y 为 i 再加 -er",
        "focusVerb": "heavier",
        "examples": [
          {
            "from": "heavy",
            "to": "heavier"
          },
          {
            "from": "happy",
            "to": "happier"
          },
          {
            "from": "easy",
            "to": "easier"
          }
        ],
        "sample": "Chen Jie is heavier than Amy.",
        "sampleZh": "陈洁比艾米重。",
        "sampleImage": "l04-chen-amy.jpg"
      },
      {
        "tab": "双写+er",
        "rule": "短元音+单辅音结尾：双写辅音再加 -er",
        "focusVerb": "bigger",
        "examples": [
          {
            "from": "big",
            "to": "bigger"
          },
          {
            "from": "hot",
            "to": "hotter"
          },
          {
            "from": "thin",
            "to": "thinner"
          }
        ],
        "sample": "The dinosaur is bigger than the rabbit.",
        "sampleZh": "恐龙比兔子大。",
        "sampleImage": "l04-dino-rabbit.jpg"
      }
    ]
  },
  {
    "id": "p08",
    "section": "辨析",
    "title": "分类篮 · 原级还是比较级？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l04-compare-chart.jpg",
    "lead": "把句子放进正确的篮子：只有原级，还是有 than 的比较级？",
    "buckets": [
      {
        "key": "base",
        "label": "原级（无 than）"
      },
      {
        "key": "comp",
        "label": "比较级 + than"
      }
    ],
    "items": [
      {
        "text": "She is happy.",
        "bucket": "base",
        "hint": "没有 than，也不是比较级。"
      },
      {
        "text": "He is taller than me.",
        "bucket": "comp"
      },
      {
        "text": "The cat is small.",
        "bucket": "base"
      },
      {
        "text": "This book is cheaper than that one.",
        "bucket": "comp"
      },
      {
        "text": "Lily runs faster than Emma.",
        "bucket": "comp"
      },
      {
        "text": "It is windy today.",
        "bucket": "base"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l04-dino-rabbit.jpg",
    "question": "「This book is more cheaper than that one.」错在哪里？",
    "choices": [
      {
        "text": "cheap 是短词，应说 cheaper，不能再加 more",
        "correct": true,
        "fb": "对了！短形容词用 -er，不要 more cheaper。"
      },
      {
        "text": "than 应该改成 as",
        "correct": false,
        "fb": "比较两者仍用 than。"
      },
      {
        "text": "book 要改成 books",
        "correct": false,
        "fb": "主语单复数不是这句的错点。"
      }
    ],
    "sentence": "This book is cheaper than that one.",
    "zh": "这本书比那本便宜。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l04-dino-rabbit.jpg",
    "lead": "把原级句改成比较句：加上比较级和 than。",
    "items": [
      {
        "from": "Tom is tall.",
        "fromZh": "汤姆很高。",
        "steps": [
          {
            "label": "改成：汤姆比杰克高",
            "opts": [
              "Tom is taller than Jack.",
              "Tom is tall than Jack.",
              "Tom is more tall than Jack."
            ],
            "ans": 0,
            "hint": "tall → taller + than。",
            "sentence": "Tom is taller than Jack.",
            "zh": "汤姆比杰克高。"
          }
        ]
      },
      {
        "from": "The box is big.",
        "fromZh": "这个盒子很大。",
        "steps": [
          {
            "label": "改成：这个盒子比袋子大（注意双写）",
            "opts": [
              "The box is bigger than the bag.",
              "The box is biger than the bag.",
              "The box is more big than the bag."
            ],
            "ans": 0,
            "hint": "big → bigger。",
            "sentence": "The box is bigger than the bag.",
            "zh": "这个盒子比袋子大。"
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
    "image": "l04-dino-rabbit.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Tom",
      "runs",
      "faster",
      "than",
      "Jack",
      "in",
      "PE",
      "class"
    ],
    "sentence": "Tom runs faster than Jack in PE class.",
    "zh": "体育课上汤姆比杰克跑得快。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造比较句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l04-pe-run.jpg",
    "audio": "Tom runs faster than Jack in PE class.",
    "tokens": [
      "Tom",
      "runs",
      "faster",
      "than",
      "Jack",
      "in",
      "PE",
      "class"
    ],
    "sentence": "Tom runs faster than Jack in PE class.",
    "zh": "体育课上汤姆比杰克跑得快。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l04-dino-rabbit.jpg",
    "q": "The dinosaur is _____ the rabbit.",
    "opts": [
      "bigger",
      "bigger than",
      "big"
    ],
    "ans": 1,
    "hint": "比较两件事要用「比较级 + than」。",
    "sentence": "The dinosaur is bigger than the rabbit.",
    "zh": "恐龙比兔子大。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l04-dino-rabbit.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "The dinosaur is _____ the rabbit.",
        "opts": [
          "bigger",
          "bigger than",
          "big"
        ],
        "ans": 1,
        "hint": "比较两件事要用「比较级 + than」。",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "Tom is _____ Jack.",
        "opts": [
          "taller",
          "taller than",
          "more taller"
        ],
        "ans": 1,
        "hint": "比较级后面要跟 than。",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This bag is _____ than that one.",
        "opts": [
          "heavy",
          "heavier",
          "heaviest"
        ],
        "ans": 1,
        "hint": "两者比较用比较级 heavier。",
        "sentence": "This bag is heavier than that one.",
        "zh": "这个包比那个重。"
      },
      {
        "q": "Summer in Chengdu is _____ than spring.",
        "opts": [
          "hotter",
          "more hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "hot → hotter。",
        "sentence": "Summer in Chengdu is hotter than spring.",
        "zh": "成都的夏天比春天热。"
      },
      {
        "q": "Emma reads _____ than Tom.",
        "opts": [
          "careful",
          "more carefully",
          "most careful"
        ],
        "ans": 1,
        "hint": "副词比较常用 more + 副词。",
        "sentence": "Emma reads more carefully than Tom.",
        "zh": "艾玛读书比汤姆更仔细。"
      },
      {
        "q": "Which is _____, a cat or a dinosaur?",
        "opts": [
          "big",
          "bigger",
          "biggest"
        ],
        "ans": 1,
        "hint": "两者之间选哪一个更……用比较级。",
        "sentence": "Which is bigger, a cat or a dinosaur?",
        "zh": "猫和恐龙哪个更大？"
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
        "q": "The dinosaur is _____ the rabbit.",
        "opts": [
          "bigger",
          "bigger than",
          "big"
        ],
        "ans": 1,
        "hint": "比较两件事要用「比较级 + than」。",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "Tom is _____ Jack.",
        "opts": [
          "taller",
          "taller than",
          "more taller"
        ],
        "ans": 1,
        "hint": "比较级后面要跟 than。",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This bag is _____ than that one.",
        "opts": [
          "heavy",
          "heavier",
          "heaviest"
        ],
        "ans": 1,
        "hint": "两者比较用比较级 heavier。",
        "sentence": "This bag is heavier than that one.",
        "zh": "这个包比那个重。"
      },
      {
        "q": "Summer in Chengdu is _____ than spring.",
        "opts": [
          "hotter",
          "more hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "hot → hotter。",
        "sentence": "Summer in Chengdu is hotter than spring.",
        "zh": "成都的夏天比春天热。"
      },
      {
        "q": "Emma reads _____ than Tom.",
        "opts": [
          "careful",
          "more carefully",
          "most careful"
        ],
        "ans": 1,
        "hint": "副词比较常用 more + 副词。",
        "sentence": "Emma reads more carefully than Tom.",
        "zh": "艾玛读书比汤姆更仔细。"
      },
      {
        "q": "Which is _____, a cat or a dinosaur?",
        "opts": [
          "big",
          "bigger",
          "biggest"
        ],
        "ans": 1,
        "hint": "两者之间选哪一个更……用比较级。",
        "sentence": "Which is bigger, a cat or a dinosaur?",
        "zh": "猫和恐龙哪个更大？"
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
        "q": "The dinosaur is _____ the rabbit.",
        "opts": [
          "bigger",
          "bigger than",
          "big"
        ],
        "ans": 1,
        "hint": "比较两件事要用「比较级 + than」。",
        "sentence": "The dinosaur is bigger than the rabbit.",
        "zh": "恐龙比兔子大。"
      },
      {
        "q": "Tom is _____ Jack.",
        "opts": [
          "taller",
          "taller than",
          "more taller"
        ],
        "ans": 1,
        "hint": "比较级后面要跟 than。",
        "sentence": "Tom is taller than Jack.",
        "zh": "汤姆比杰克高。"
      },
      {
        "q": "This bag is _____ than that one.",
        "opts": [
          "heavy",
          "heavier",
          "heaviest"
        ],
        "ans": 1,
        "hint": "两者比较用比较级 heavier。",
        "sentence": "This bag is heavier than that one.",
        "zh": "这个包比那个重。"
      },
      {
        "q": "Summer in Chengdu is _____ than spring.",
        "opts": [
          "hotter",
          "more hot",
          "hottest"
        ],
        "ans": 0,
        "hint": "hot → hotter。",
        "sentence": "Summer in Chengdu is hotter than spring.",
        "zh": "成都的夏天比春天热。"
      },
      {
        "q": "Emma reads _____ than Tom.",
        "opts": [
          "careful",
          "more carefully",
          "most careful"
        ],
        "ans": 1,
        "hint": "副词比较常用 more + 副词。",
        "sentence": "Emma reads more carefully than Tom.",
        "zh": "艾玛读书比汤姆更仔细。"
      },
      {
        "q": "Which is _____, a cat or a dinosaur?",
        "opts": [
          "big",
          "bigger",
          "biggest"
        ],
        "ans": 1,
        "hint": "两者之间选哪一个更……用比较级。",
        "sentence": "Which is bigger, a cat or a dinosaur?",
        "zh": "猫和恐龙哪个更大？"
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
    "image": "l04-dino-rabbit.jpg",
    "pairs": [
      {
        "en": "bigger than",
        "zh": "比……更大"
      },
      {
        "en": "taller than",
        "zh": "比……更高"
      },
      {
        "en": "heavier than",
        "zh": "比……更重"
      },
      {
        "en": "cheaper than",
        "zh": "比……更便宜"
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
    "image": "l04-dino-rabbit.jpg",
    "audio": "Tom runs faster than Jack in PE class.",
    "opts": [
      "Tom runs faster than Jack in PE class.",
      "The dinosaur is big the rabbit.",
      "The dinosaur was bigger yesterday."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Tom runs faster than Jack in PE class.",
    "zh": "体育课上汤姆比杰克跑得快。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "l04-writing-frame.jpg",
    "checklist": [
      "比较两件事：形容词比较级 + than + 比较对象",
      "写作模板：A is + 比较级 + than + B.",
      "口语常用：Who is taller? — Tom is taller than Jack.",
      "注意拼写：heavy→heavier, big→bigger, happy→happier",
      "易错：不要 more cheaper；短词只用 -er。",
      "两者比较用比较级，三者以上才用最高级。"
    ],
    "chant": "Two things? Add -er, then than! A is taller than B — you can!",
    "chantSpeak": "Two things? Add er, then than! A is taller than B, you can!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "比较级 + than",
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