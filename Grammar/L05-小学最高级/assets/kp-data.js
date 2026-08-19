(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 最美丽的海滩",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "Yalong Bay is one of the most beautiful beaches in China.",
    "soundHint": "先听！他们在说「最……」还是「比……更……」？",
    "question": "这句话在说范围内「最」还是「更」？",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。",
    "image": "l05-yalong-beach.jpg",
    "source": "PSLE Set 01 · 真题"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 最高级标志",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l05-yalong-beach.jpg",
    "question": "「one of the most beautiful beaches」中，为什么 beaches 用复数？",
    "choices": [
      {
        "text": "因为 beach 永远是复数",
        "correct": false,
        "fb": "beach 可数，单数是 beach。"
      },
      {
        "text": "因为是「许多海滩中最美的之一」",
        "correct": true,
        "fb": "对了！one of the most + 复数名词 = ……中最……的之一。"
      },
      {
        "text": "因为 Yalong Bay 有很多湾",
        "correct": false,
        "fb": "关键在 one of the most 结构，不是地名。"
      }
    ],
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l05-yalong-beach.jpg",
    "lead": "三者以上、有范围时，用最高级。",
    "formula": "the + 最高级 + in / of + 范围",
    "parts": [
      {
        "mark": "the",
        "label": "定冠词",
        "example": "the"
      },
      {
        "mark": "-est",
        "label": "最高级",
        "example": "tallest"
      },
      {
        "mark": "in/of",
        "label": "范围",
        "example": "in our class"
      }
    ],
    "samples": [
      {
        "sentence": "Tom is the tallest boy in our class.",
        "zh": "汤姆是我们班最高的男孩。"
      },
      {
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美海滩之一。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · 比较级 vs 最高级",
    "type": "discover",
    "lead": "比较两件事和在三者以上选「最」，有什么不同？",
    "leftImage": "l05-taller.jpg",
    "rightImage": "l05-tallest.jpg",
    "leftLabel": "比较级 taller than",
    "rightLabel": "最高级 the tallest",
    "leftSentence": "Tom is taller than Jack.",
    "leftZh": "汤姆比杰克高。",
    "rightSentence": "Tom is the tallest boy in our class.",
    "rightZh": "汤姆是我们班最高的男孩。",
    "morphBase": "tall",
    "morphPast": "the tallest",
    "morphHighlight": "est",
    "discovery": "两者比较用 -er + than；三者及以上用 the + -est，常加 in/of 范围。"
  },
  {
    "section": "精讲",
    "title": "例句 · 班上最高",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l05-yalong-beach.jpg",
    "lead": "in our class 给出比较范围。",
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 最美之一",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l05-yalong-beach.jpg",
    "lead": "one of the most + 形容词 + 复数名词。",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美海滩之一。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "拼写规则卡 · -est 变化",
    "type": "spelling",
    "image": "l05-spell-rules.jpg",
    "lead": "最高级拼写与比较级类似，只是用 -est。",
    "rules": [
      {
        "tab": "the +est",
        "rule": "短形容词：the + 原级 + -est",
        "focusVerb": "tallest",
        "examples": [
          {
            "from": "tall",
            "to": "the tallest"
          },
          {
            "from": "old",
            "to": "the oldest"
          },
          {
            "from": "young",
            "to": "the youngest"
          }
        ],
        "sample": "Tom is the tallest boy in our class.",
        "sampleZh": "汤姆是我们班最高的男孩。"
      },
      {
        "tab": "one of the most",
        "rule": "长形容词：one of the most + 形容词 + 复数名词",
        "focusVerb": "beautiful",
        "examples": [
          {
            "from": "beautiful",
            "to": "the most beautiful"
          },
          {
            "from": "famous",
            "to": "the most famous"
          },
          {
            "from": "popular",
            "to": "the most popular"
          }
        ],
        "sample": "Yalong Bay is one of the most beautiful beaches in China.",
        "sampleZh": "亚龙湾是中国最美丽的海滩之一。",
        "sampleImage": "l05-yalong-beach.jpg"
      }
    ]
  },
  {
    "id": "p08",
    "section": "辨析",
    "title": "分类篮 · 比较级还是最高级？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l05-compare-super.jpg",
    "lead": "句子是比两件东西，还是在范围内选「最」？",
    "buckets": [
      {
        "key": "comp",
        "label": "比较级 + than"
      },
      {
        "key": "super",
        "label": "the + 最高级 / one of the most"
      }
    ],
    "items": [
      {
        "text": "She is taller than me.",
        "bucket": "comp"
      },
      {
        "text": "He is the tallest in the team.",
        "bucket": "super"
      },
      {
        "text": "This bag is cheaper than that one.",
        "bucket": "comp"
      },
      {
        "text": "It is one of the most popular books.",
        "bucket": "super"
      },
      {
        "text": "Summer is hotter than spring.",
        "bucket": "comp"
      },
      {
        "text": "Chengdu is one of the most liveable cities.",
        "bucket": "super"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l05-yalong-beach.jpg",
    "question": "「Chengdu is one of the most liveable city in China.」错在哪？",
    "choices": [
      {
        "text": "one of 后面的名词要用复数 cities",
        "correct": true,
        "fb": "对了！one of the most + 形容词 + 复数名词。"
      },
      {
        "text": "liveable 要改成 more liveable",
        "correct": false,
        "fb": "这里已经是最高级 most liveable。"
      },
      {
        "text": "不能用 the",
        "correct": false,
        "fb": "最高级前面通常要 the。"
      }
    ],
    "sentence": "Chengdu is one of the most liveable cities in China.",
    "zh": "成都是中国最宜居的城市之一。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l05-yalong-beach.jpg",
    "lead": "把比较级句改成最高级：加上 the，并给出范围。",
    "items": [
      {
        "from": "Tom is taller than Jack.",
        "fromZh": "汤姆比杰克高。",
        "steps": [
          {
            "label": "班上最高怎么说？",
            "opts": [
              "Tom is the tallest boy in our class.",
              "Tom is tallest boy in our class.",
              "Tom is the taller boy in our class."
            ],
            "ans": 0,
            "hint": "最高级：the tallest + in 范围。",
            "sentence": "Tom is the tallest boy in our class.",
            "zh": "汤姆是我们班最高的男孩。"
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
    "image": "l05-yalong-beach.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Tom",
      "is",
      "the",
      "tallest",
      "boy",
      "in",
      "our",
      "class"
    ],
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 最高级句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l05-tallest-class.jpg",
    "audio": "Tom is the tallest boy in our class.",
    "tokens": [
      "Tom",
      "is",
      "the",
      "tallest",
      "boy",
      "in",
      "our",
      "class"
    ],
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l05-yalong-beach.jpg",
    "q": "Yalong Bay is one of the most beautiful _____ in China.",
    "opts": [
      "beach",
      "beaches",
      "beachs"
    ],
    "ans": 1,
    "hint": "one of the most + 复数名词。",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l05-yalong-beach.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "Yalong Bay is one of the most beautiful _____ in China.",
        "opts": [
          "beach",
          "beaches",
          "beachs"
        ],
        "ans": 1,
        "hint": "one of the most + 复数名词。",
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美丽的海滩之一。"
      },
      {
        "q": "This is _____ book in the library.",
        "opts": [
          "the most interesting",
          "more interesting",
          "interesting"
        ],
        "ans": 0,
        "hint": "范围内最……用 the most + 长形容词。",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Winter is _____ season of the year.",
        "opts": [
          "colder",
          "the coldest",
          "coldest"
        ],
        "ans": 1,
        "hint": "of the year 是范围，用 the coldest。",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "She is one of _____ students in Grade Six.",
        "opts": [
          "the best",
          "better",
          "good"
        ],
        "ans": 0,
        "hint": "one of the + 最高级 + 复数。",
        "sentence": "She is one of the best students in Grade Six.",
        "zh": "她是六年级最优秀的学生之一。"
      },
      {
        "q": "Mount Qomolangma is _____ mountain in the world.",
        "opts": [
          "higher",
          "the highest",
          "more high"
        ],
        "ans": 1,
        "hint": "the highest + in the world。",
        "sentence": "Mount Qomolangma is the highest mountain in the world.",
        "zh": "珠穆朗玛峰是世界上最高的山。"
      },
      {
        "q": "Which is _____, spring, summer or winter?",
        "opts": [
          "hot",
          "hotter",
          "the hottest"
        ],
        "ans": 2,
        "hint": "三者选最……用最高级。",
        "sentence": "Which is the hottest, spring, summer or winter?",
        "zh": "春夏冬哪个最热？"
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
        "q": "Yalong Bay is one of the most beautiful _____ in China.",
        "opts": [
          "beach",
          "beaches",
          "beachs"
        ],
        "ans": 1,
        "hint": "one of the most + 复数名词。",
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美丽的海滩之一。"
      },
      {
        "q": "This is _____ book in the library.",
        "opts": [
          "the most interesting",
          "more interesting",
          "interesting"
        ],
        "ans": 0,
        "hint": "范围内最……用 the most + 长形容词。",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Winter is _____ season of the year.",
        "opts": [
          "colder",
          "the coldest",
          "coldest"
        ],
        "ans": 1,
        "hint": "of the year 是范围，用 the coldest。",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "She is one of _____ students in Grade Six.",
        "opts": [
          "the best",
          "better",
          "good"
        ],
        "ans": 0,
        "hint": "one of the + 最高级 + 复数。",
        "sentence": "She is one of the best students in Grade Six.",
        "zh": "她是六年级最优秀的学生之一。"
      },
      {
        "q": "Mount Qomolangma is _____ mountain in the world.",
        "opts": [
          "higher",
          "the highest",
          "more high"
        ],
        "ans": 1,
        "hint": "the highest + in the world。",
        "sentence": "Mount Qomolangma is the highest mountain in the world.",
        "zh": "珠穆朗玛峰是世界上最高的山。"
      },
      {
        "q": "Which is _____, spring, summer or winter?",
        "opts": [
          "hot",
          "hotter",
          "the hottest"
        ],
        "ans": 2,
        "hint": "三者选最……用最高级。",
        "sentence": "Which is the hottest, spring, summer or winter?",
        "zh": "春夏冬哪个最热？"
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
        "q": "Yalong Bay is one of the most beautiful _____ in China.",
        "opts": [
          "beach",
          "beaches",
          "beachs"
        ],
        "ans": 1,
        "hint": "one of the most + 复数名词。",
        "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
        "zh": "亚龙湾是中国最美丽的海滩之一。"
      },
      {
        "q": "This is _____ book in the library.",
        "opts": [
          "the most interesting",
          "more interesting",
          "interesting"
        ],
        "ans": 0,
        "hint": "范围内最……用 the most + 长形容词。",
        "sentence": "This is the most interesting book in the library.",
        "zh": "这是图书馆里最有趣的书。"
      },
      {
        "q": "Winter is _____ season of the year.",
        "opts": [
          "colder",
          "the coldest",
          "coldest"
        ],
        "ans": 1,
        "hint": "of the year 是范围，用 the coldest。",
        "sentence": "Winter is the coldest season of the year.",
        "zh": "冬天是一年中最冷的季节。"
      },
      {
        "q": "She is one of _____ students in Grade Six.",
        "opts": [
          "the best",
          "better",
          "good"
        ],
        "ans": 0,
        "hint": "one of the + 最高级 + 复数。",
        "sentence": "She is one of the best students in Grade Six.",
        "zh": "她是六年级最优秀的学生之一。"
      },
      {
        "q": "Mount Qomolangma is _____ mountain in the world.",
        "opts": [
          "higher",
          "the highest",
          "more high"
        ],
        "ans": 1,
        "hint": "the highest + in the world。",
        "sentence": "Mount Qomolangma is the highest mountain in the world.",
        "zh": "珠穆朗玛峰是世界上最高的山。"
      },
      {
        "q": "Which is _____, spring, summer or winter?",
        "opts": [
          "hot",
          "hotter",
          "the hottest"
        ],
        "ans": 2,
        "hint": "三者选最……用最高级。",
        "sentence": "Which is the hottest, spring, summer or winter?",
        "zh": "春夏冬哪个最热？"
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
    "image": "l05-yalong-beach.jpg",
    "pairs": [
      {
        "en": "the tallest",
        "zh": "最高的"
      },
      {
        "en": "the most beautiful",
        "zh": "最美的"
      },
      {
        "en": "one of the most",
        "zh": "最……之一"
      },
      {
        "en": "in our class",
        "zh": "在我们班（范围）"
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
    "image": "l05-yalong-beach.jpg",
    "audio": "Tom is the tallest boy in our class.",
    "opts": [
      "Tom is the tallest boy in our class.",
      "Tom is taller boy in our class.",
      "Tom is the taller than Jack."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "l05-writing-frame.jpg",
    "checklist": [
      "范围内「最」：the + 最高级 + in/of + 范围",
      "……中最……之一：one of the most + 形容词 + 复数名词",
      "写作：Chengdu is one of the most liveable cities in China.",
      "比较两者仍用比较级 + than，不要混用",
      "one of the most 后面必须是复数名词。",
      "两者比较仍用比较级 + than，不要混用最高级。"
    ],
    "chant": "In a group, use the -est! One of the most + plural — that's the best!",
    "chantSpeak": "In a group, use the est! One of the most plus plural, that is the best!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "最高级 · the + -est",
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