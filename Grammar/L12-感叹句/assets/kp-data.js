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
    "id": "p07",
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
    "id": "p08",
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
    "id": "p09"
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
    "image": "l13-excl-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "What",
      "a",
      "beautiful",
      "day",
      "it",
      "is"
    ],
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！",
    "id": "p11"
  },
  {
    "id": "p12",
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
    "id": "p13",
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
    "lead": "对齐初中综合测试：全部做完再交卷。",
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
    "image": "l13-excl-hero.jpg",
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
    "image": "l13-excl-hero.jpg",
    "audio": "What a beautiful day it is!",
    "opts": [
      "What a beautiful day it is!",
      "How a beautiful day it is!",
      "What beautiful day it is!"
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！",
    "id": "p18"
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
    "id": "p19"
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