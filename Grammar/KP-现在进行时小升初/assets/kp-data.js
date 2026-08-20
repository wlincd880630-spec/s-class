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
    "audio": "Look! Tom is playing football in the park.",
    "soundHint": "Listen! Is the action happening now or every day?",
    "question": "动作是此刻正在发生吗？",
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。",
    "image": "w3-pc-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-pc-hero.jpg",
    "question": "为什么用 is playing 而不是 plays？",
    "choices": [
      {
        "text": "此刻正在发生，用现在进行时",
        "correct": true,
        "fb": "对了！look/now → am/is/are + V-ing。"
      },
      {
        "text": "每天发生，用一般现在时",
        "correct": false,
        "fb": "每天发生才用 plays。"
      },
      {
        "text": "过去发生",
        "correct": false,
        "fb": "没有过去时间标志。"
      }
    ],
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-pc-hero.jpg",
    "lead": "此刻正在发生：be + 动词-ing。",
    "formula": "am / is / are + V-ing",
    "parts": [
      {
        "mark": "I",
        "label": "am",
        "example": "I am reading"
      },
      {
        "mark": "he/she/it",
        "label": "is",
        "example": "She is drawing"
      },
      {
        "mark": "you/we/they",
        "label": "are",
        "example": "They are playing"
      }
    ],
    "samples": [
      {
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园踢足球。"
      },
      {
        "sentence": "I am reading a book in the library.",
        "zh": "我正在图书馆看书。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "lead": "对比：习惯性动作 vs 此刻正在进行的动作。",
    "leftImage": "w3-pc-habit.jpg",
    "rightImage": "w3-pc-now.jpg",
    "leftLabel": "every day · plays",
    "rightLabel": "Look! · is playing",
    "leftSentence": "Tom plays football every Saturday.",
    "leftZh": "汤姆每周六踢足球。",
    "rightSentence": "Look! Tom is playing football now.",
    "rightZh": "看！汤姆正在踢足球。",
    "morphBase": "plays",
    "morphPast": "is playing",
    "morphHighlight": "ing",
    "discovery": "标志词 now, look, listen → am/is/are + V-ing。"
  },
  {
    "section": "精讲",
    "title": "例句 · Look 标志",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pc-hero.jpg",
    "lead": "看见 Look! / now，优先想进行时。",
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 习惯对比",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pc-hero.jpg",
    "lead": "every day 用一般现在时，不是进行时。",
    "sentence": "Tom plays football every Saturday.",
    "zh": "汤姆每周六踢足球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-pc-hero.jpg",
    "lead": "现在进行时构成与标志词。",
    "rules": [
      {
        "tab": "构成",
        "rule": "am / is / are + V-ing",
        "focusVerb": "playing",
        "examples": [
          {
            "from": "play",
            "to": "is playing"
          },
          {
            "from": "run",
            "to": "are running"
          }
        ],
        "sample": "Look! Tom is playing football in the park.",
        "sampleZh": "看！汤姆正在公园踢足球。"
      },
      {
        "tab": "标志词",
        "rule": "now, look, listen, at the moment",
        "focusVerb": "now",
        "examples": [
          {
            "from": "Look!",
            "to": "进行时"
          },
          {
            "from": "every day",
            "to": "一般现在时"
          }
        ],
        "sample": "Emma is doing her homework now.",
        "sampleZh": "艾玛现在正在做作业。"
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
    "image": "w3-pc-hero.jpg",
    "buckets": [
      {
        "key": "simp",
        "label": "一般现在时"
      },
      {
        "key": "prog",
        "label": "现在进行时"
      }
    ],
    "items": [
      {
        "text": "She reads books every evening.",
        "bucket": "simp"
      },
      {
        "text": "She is reading a book now.",
        "bucket": "prog"
      },
      {
        "text": "They go to school by bus.",
        "bucket": "simp"
      },
      {
        "text": "Look! They are running.",
        "bucket": "prog"
      },
      {
        "text": "He watches TV after dinner.",
        "bucket": "simp"
      },
      {
        "text": "He is watching TV at the moment.",
        "bucket": "prog"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-pc-hero.jpg",
    "question": "「Look! The children play in the playground.」应改成？",
    "choices": [
      {
        "text": "are playing（Look 提示正在发生）",
        "correct": true,
        "fb": "Look! → 现在进行时。"
      },
      {
        "text": "played",
        "correct": false,
        "fb": "不是过去。"
      },
      {
        "text": "plays",
        "correct": false,
        "fb": "children 是复数，且有 Look。"
      }
    ],
    "sentence": "Look! The children are playing in the playground.",
    "zh": "看！孩子们正在操场上玩。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-pc-hero.jpg",
    "lead": "进行时否定：isn't/aren't + V-ing；疑问：Is/Are + 主语 + V-ing？",
    "items": [
      {
        "from": "She is drawing a picture.",
        "fromZh": "她正在画画。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "She isn't drawing a picture.",
              "She doesn't drawing a picture.",
              "She isn't draw a picture."
            ],
            "ans": 0,
            "hint": "isn't + V-ing。",
            "sentence": "She isn't drawing a picture.",
            "zh": "她没在画画。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Is she drawing a picture?",
              "Does she drawing a picture?",
              "Is she draw a picture?"
            ],
            "ans": 0,
            "hint": "Is + 主语 + V-ing？",
            "sentence": "Is she drawing a picture?",
            "zh": "她正在画画吗？"
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
    "image": "w3-pc-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Look",
      "Tom",
      "is",
      "playing",
      "football",
      "in",
      "the",
      "park"
    ],
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-pc-hero.jpg",
    "audio": "Look! Tom is playing football in the park.",
    "tokens": [
      "Look",
      "Tom",
      "is",
      "playing",
      "football",
      "in",
      "the",
      "park"
    ],
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-pc-hero.jpg",
    "q": "Look! The children _____ in the playground.",
    "opts": [
      "play",
      "are playing",
      "played"
    ],
    "ans": 1,
    "hint": "Look! → 现在进行时。",
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-pc-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "Look! The children _____ in the playground.",
        "opts": [
          "play",
          "are playing",
          "played"
        ],
        "ans": 1,
        "hint": "Look! → 现在进行时。",
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园踢足球。"
      },
      {
        "q": "Listen! Someone _____ at the door.",
        "opts": [
          "knocks",
          "is knocking",
          "knocked"
        ],
        "ans": 1,
        "hint": "Listen! → 进行时。",
        "sentence": "Listen! Someone is knocking at the door.",
        "zh": "听！有人在敲门。"
      },
      {
        "q": "They _____ TV now.",
        "opts": [
          "watch",
          "are watching",
          "watched"
        ],
        "ans": 1,
        "hint": "now → are watching。",
        "sentence": "They are watching TV now.",
        "zh": "他们现在正在看电视。"
      },
      {
        "q": "I _____ a letter at the moment.",
        "opts": [
          "write",
          "am writing",
          "writes"
        ],
        "ans": 1,
        "hint": "at the moment → am writing。",
        "sentence": "I am writing a letter at the moment.",
        "zh": "我此刻正在写信。"
      },
      {
        "q": "_____ you doing your homework?",
        "opts": [
          "Do",
          "Are",
          "Is"
        ],
        "ans": 1,
        "hint": "进行时疑问 Are you + V-ing。",
        "sentence": "Are you doing your homework?",
        "zh": "你在做作业吗？"
      },
      {
        "q": "He _____ football every day, but he _____ it now.",
        "opts": [
          "plays; isn't playing",
          "is playing; doesn't play",
          "play; isn't play"
        ],
        "ans": 0,
        "hint": "习惯一般现在时，此刻进行时否定。",
        "sentence": "He plays football every day, but he isn't playing it now.",
        "zh": "他每天踢球，但现在没在踢。"
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
        "q": "Look! The children _____ in the playground.",
        "opts": [
          "play",
          "are playing",
          "played"
        ],
        "ans": 1,
        "hint": "Look! → 现在进行时。",
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园踢足球。"
      },
      {
        "q": "Listen! Someone _____ at the door.",
        "opts": [
          "knocks",
          "is knocking",
          "knocked"
        ],
        "ans": 1,
        "hint": "Listen! → 进行时。",
        "sentence": "Listen! Someone is knocking at the door.",
        "zh": "听！有人在敲门。"
      },
      {
        "q": "They _____ TV now.",
        "opts": [
          "watch",
          "are watching",
          "watched"
        ],
        "ans": 1,
        "hint": "now → are watching。",
        "sentence": "They are watching TV now.",
        "zh": "他们现在正在看电视。"
      },
      {
        "q": "I _____ a letter at the moment.",
        "opts": [
          "write",
          "am writing",
          "writes"
        ],
        "ans": 1,
        "hint": "at the moment → am writing。",
        "sentence": "I am writing a letter at the moment.",
        "zh": "我此刻正在写信。"
      },
      {
        "q": "_____ you doing your homework?",
        "opts": [
          "Do",
          "Are",
          "Is"
        ],
        "ans": 1,
        "hint": "进行时疑问 Are you + V-ing。",
        "sentence": "Are you doing your homework?",
        "zh": "你在做作业吗？"
      },
      {
        "q": "He _____ football every day, but he _____ it now.",
        "opts": [
          "plays; isn't playing",
          "is playing; doesn't play",
          "play; isn't play"
        ],
        "ans": 0,
        "hint": "习惯一般现在时，此刻进行时否定。",
        "sentence": "He plays football every day, but he isn't playing it now.",
        "zh": "他每天踢球，但现在没在踢。"
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
        "q": "Look! The children _____ in the playground.",
        "opts": [
          "play",
          "are playing",
          "played"
        ],
        "ans": 1,
        "hint": "Look! → 现在进行时。",
        "sentence": "Look! Tom is playing football in the park.",
        "zh": "看！汤姆正在公园踢足球。"
      },
      {
        "q": "Listen! Someone _____ at the door.",
        "opts": [
          "knocks",
          "is knocking",
          "knocked"
        ],
        "ans": 1,
        "hint": "Listen! → 进行时。",
        "sentence": "Listen! Someone is knocking at the door.",
        "zh": "听！有人在敲门。"
      },
      {
        "q": "They _____ TV now.",
        "opts": [
          "watch",
          "are watching",
          "watched"
        ],
        "ans": 1,
        "hint": "now → are watching。",
        "sentence": "They are watching TV now.",
        "zh": "他们现在正在看电视。"
      },
      {
        "q": "I _____ a letter at the moment.",
        "opts": [
          "write",
          "am writing",
          "writes"
        ],
        "ans": 1,
        "hint": "at the moment → am writing。",
        "sentence": "I am writing a letter at the moment.",
        "zh": "我此刻正在写信。"
      },
      {
        "q": "_____ you doing your homework?",
        "opts": [
          "Do",
          "Are",
          "Is"
        ],
        "ans": 1,
        "hint": "进行时疑问 Are you + V-ing。",
        "sentence": "Are you doing your homework?",
        "zh": "你在做作业吗？"
      },
      {
        "q": "He _____ football every day, but he _____ it now.",
        "opts": [
          "plays; isn't playing",
          "is playing; doesn't play",
          "play; isn't play"
        ],
        "ans": 0,
        "hint": "习惯一般现在时，此刻进行时否定。",
        "sentence": "He plays football every day, but he isn't playing it now.",
        "zh": "他每天踢球，但现在没在踢。"
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
    "image": "w3-pc-hero.jpg",
    "pairs": [
      {
        "en": "am reading",
        "zh": "我正在读"
      },
      {
        "en": "is playing",
        "zh": "正在玩/打"
      },
      {
        "en": "Look!",
        "zh": "看！（标志）"
      },
      {
        "en": "at the moment",
        "zh": "此刻"
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
    "image": "w3-pc-hero.jpg",
    "audio": "Look! Tom is playing football in the park.",
    "opts": [
      "Look! Tom is playing football in the park.",
      "Look! Tom plays football in the park.",
      "Look! Tom playing football in the park."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Look! Tom is playing football in the park.",
    "zh": "看！汤姆正在公园踢足球。",
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
      "now/look/listen → am/is/are + V-ing",
      "习惯性动作用一般现在时",
      "写作：Look! Lily is drawing a picture.",
      "like / want / know 等状态动词一般不用进行时。"
    ],
    "chant": "Look and now? Add -ing! Am, is, are — that's the thing!",
    "chantSpeak": "Look and now, add ing! Am, is, are, that is the thing!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "现在进行时 · 小升初专项",
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