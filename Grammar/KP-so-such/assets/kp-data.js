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
    "id": "p07",
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
    "id": "p08",
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
    "id": "p09"
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
    "image": "w5-sosuch-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
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
    "zh": "天太热了，我们待在室内。",
    "id": "p11"
  },
  {
    "id": "p12",
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
    "id": "p13",
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
    "lead": "对齐初中综合测试：全部做完再交卷。",
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
        "q": "The box was _____ heavy _____ I couldn't carry it.",
        "opts": [
          "such; that",
          "so; that",
          "so; as"
        ],
        "ans": 1,
        "hint": "so + 形 + that。",
        "sentence": "The box was so heavy that I couldn't carry it.",
        "zh": "箱子太重，我搬不动。"
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
        "q": "The box was _____ heavy _____ I couldn't carry it.",
        "opts": [
          "such; that",
          "so; that",
          "so; as"
        ],
        "ans": 1,
        "hint": "so + 形 + that。",
        "sentence": "The box was so heavy that I couldn't carry it.",
        "zh": "箱子太重，我搬不动。"
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
        "q": "The box was _____ heavy _____ I couldn't carry it.",
        "opts": [
          "such; that",
          "so; that",
          "so; as"
        ],
        "ans": 1,
        "hint": "so + 形 + that。",
        "sentence": "The box was so heavy that I couldn't carry it.",
        "zh": "箱子太重，我搬不动。"
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
    "image": "w5-sosuch-hero.jpg",
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
    "image": "w5-sosuch-hero.jpg",
    "audio": "It was so hot that we stayed inside.",
    "opts": [
      "It was so hot that we stayed inside.",
      "It was such hot that we stayed inside.",
      "It was so a hot day that we stayed inside."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "It was so hot that we stayed inside.",
    "zh": "天太热了，我们待在室内。",
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
      "so + 形容词/副词 + that",
      "such + (a/an) + adj + 名词 + that",
      "that 后接结果从句",
      "so many / so much 是固定搭配，即使后面有名词也不改 such。"
    ],
    "chant": "So plus adj or adverb — that's the way! Such plus noun — remember today!",
    "chantSpeak": "So plus adj or adverb, that is the way! Such plus noun, remember today!",
    "id": "p19"
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