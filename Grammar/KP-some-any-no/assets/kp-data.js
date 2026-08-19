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
    "audio": "Would you like some tea?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？",
    "image": "w3-san-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-san-hero.jpg",
    "question": "邀请句「来点茶吗」为什么用 some 不用 any？",
    "choices": [
      {
        "text": "期待肯定回答的疑问句用 some",
        "correct": true,
        "fb": "对了！Would you like some…?"
      },
      {
        "text": "所有疑问句都用 any",
        "correct": false,
        "fb": "邀请/建议疑问句常用 some。"
      },
      {
        "text": "some 只能用于肯定",
        "correct": false,
        "fb": "Would you like some 是疑问句。"
      }
    ],
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-san-hero.jpg",
    "lead": "some 用于肯定；any 用于否定和疑问。邀请/请求可用 some。",
    "formula": "肯定 some　/　否定·疑问 any　/　no = not any",
    "parts": [
      {
        "mark": "some",
        "label": "一些（肯定）",
        "example": "some tea"
      },
      {
        "mark": "any",
        "label": "一些（否/疑）",
        "example": "any milk"
      },
      {
        "mark": "no",
        "label": "没有",
        "example": "no time"
      }
    ],
    "samples": [
      {
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "sentence": "There isn't any milk in the fridge.",
        "zh": "冰箱里没有牛奶。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-san-some.jpg",
    "rightImage": "w3-san-any.jpg",
    "leftLabel": "some 肯定/邀请",
    "rightLabel": "any 否定/疑问",
    "leftSentence": "I have some apples.",
    "leftZh": "我有一些苹果。",
    "rightSentence": "I don't have any apples.",
    "rightZh": "我没有苹果。",
    "morphBase": "some",
    "morphPast": "any",
    "morphHighlight": "",
    "discovery": "肯定 some；否定/一般疑问 any；no = not any。"
  },
  {
    "section": "精讲",
    "title": "例句 · 邀请用 some",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-san-hero.jpg",
    "lead": "Would you like some…? 期待肯定回答。",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 否定用 any",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-san-hero.jpg",
    "lead": "isn't any = no。",
    "sentence": "There isn't any milk in the fridge.",
    "zh": "冰箱里没有牛奶。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-san-hero.jpg",
    "lead": "some / any / no 用法。",
    "rules": [
      {
        "tab": "some",
        "rule": "肯定句；邀请/建议疑问句 Would you like some…?",
        "focusVerb": "some",
        "examples": [
          {
            "from": "肯定",
            "to": "some tea"
          }
        ],
        "sample": "Would you like some tea?",
        "sampleZh": "你想喝点茶吗？"
      },
      {
        "tab": "any/no",
        "rule": "否定/疑问 any；no = not any",
        "focusVerb": "any",
        "examples": [
          {
            "from": "not",
            "to": "not any"
          },
          {
            "from": "no",
            "to": "no time"
          }
        ],
        "sample": "I don't have any money.",
        "sampleZh": "我没有钱。"
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
    "image": "w3-san-hero.jpg",
    "buckets": [
      {
        "key": "some",
        "label": "some"
      },
      {
        "key": "any",
        "label": "any / no"
      }
    ],
    "items": [
      {
        "text": "I need some help.",
        "bucket": "some"
      },
      {
        "text": "Do you have any questions?",
        "bucket": "any"
      },
      {
        "text": "Would you like some water?",
        "bucket": "some"
      },
      {
        "text": "There isn't any milk.",
        "bucket": "any"
      },
      {
        "text": "She has some friends.",
        "bucket": "some"
      },
      {
        "text": "There is no time left.",
        "bucket": "any"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-san-hero.jpg",
    "question": "「I don't have some money.」应改成？",
    "choices": [
      {
        "text": "any money（否定用 any）",
        "correct": true,
        "fb": "否定句用 any。"
      },
      {
        "text": "no any money",
        "correct": false,
        "fb": "no 不能再加 any。"
      },
      {
        "text": "many money",
        "correct": false,
        "fb": "money 不可数。"
      }
    ],
    "sentence": "I don't have any money.",
    "zh": "我没有任何钱。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-san-hero.jpg",
    "lead": "There is some… 改否定。",
    "items": [
      {
        "from": "There is some juice in the bottle.",
        "fromZh": "瓶子里有一些果汁。",
        "steps": [
          {
            "label": "改成否定（用 any）",
            "opts": [
              "There isn't any juice in the bottle.",
              "There isn't some juice in the bottle.",
              "There is any juice in the bottle."
            ],
            "ans": 0,
            "hint": "isn't any。",
            "sentence": "There isn't any juice in the bottle.",
            "zh": "瓶子里没有果汁。"
          },
          {
            "label": "改成 no 句",
            "opts": [
              "There is no juice in the bottle.",
              "There is not no juice in the bottle.",
              "There are no juice in the bottle."
            ],
            "ans": 0,
            "hint": "no = not any。",
            "sentence": "There is no juice in the bottle.",
            "zh": "瓶子里没有果汁。"
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
    "image": "w3-san-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "There",
      "isn't",
      "any",
      "milk",
      "in",
      "the",
      "fridge"
    ],
    "sentence": "There isn't any milk in the fridge.",
    "zh": "冰箱里没有牛奶了。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-san-hero.jpg",
    "audio": "There isn't any milk in the fridge.",
    "tokens": [
      "There",
      "isn't",
      "any",
      "milk",
      "in",
      "the",
      "fridge"
    ],
    "sentence": "There isn't any milk in the fridge.",
    "zh": "冰箱里没有牛奶了。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-san-hero.jpg",
    "q": "Would you like _____ orange juice?",
    "opts": [
      "some",
      "any",
      "no"
    ],
    "ans": 0,
    "hint": "邀请用 some。",
    "sentence": "Would you like some tea?",
    "zh": "你想喝点茶吗？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-san-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "Would you like _____ orange juice?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "any",
          "some",
          "no a"
        ],
        "ans": 1,
        "hint": "肯定用 some。",
        "sentence": "She has some friends in Chengdu.",
        "zh": "她在成都有一些朋友。"
      },
      {
        "q": "Is there _____ water left?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问用 any。",
        "sentence": "Is there any water left?",
        "zh": "还剩水吗？"
      },
      {
        "q": "There is _____ time to waste.",
        "opts": [
          "any",
          "no",
          "some not"
        ],
        "ans": 1,
        "hint": "no time = not any time。",
        "sentence": "There is no time to waste.",
        "zh": "没有时间可浪费。"
      },
      {
        "q": "Could I have _____ paper, please?",
        "opts": [
          "any",
          "some",
          "no"
        ],
        "ans": 1,
        "hint": "请求可用 some。",
        "sentence": "Could I have some paper, please?",
        "zh": "请给我一些纸好吗？"
      },
      {
        "q": "He didn't buy _____ apples.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定用 any。",
        "sentence": "He didn't buy any apples.",
        "zh": "他没买苹果。"
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
        "q": "Would you like _____ orange juice?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "any",
          "some",
          "no a"
        ],
        "ans": 1,
        "hint": "肯定用 some。",
        "sentence": "She has some friends in Chengdu.",
        "zh": "她在成都有一些朋友。"
      },
      {
        "q": "Is there _____ water left?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问用 any。",
        "sentence": "Is there any water left?",
        "zh": "还剩水吗？"
      },
      {
        "q": "There is _____ time to waste.",
        "opts": [
          "any",
          "no",
          "some not"
        ],
        "ans": 1,
        "hint": "no time = not any time。",
        "sentence": "There is no time to waste.",
        "zh": "没有时间可浪费。"
      },
      {
        "q": "Could I have _____ paper, please?",
        "opts": [
          "any",
          "some",
          "no"
        ],
        "ans": 1,
        "hint": "请求可用 some。",
        "sentence": "Could I have some paper, please?",
        "zh": "请给我一些纸好吗？"
      },
      {
        "q": "He didn't buy _____ apples.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定用 any。",
        "sentence": "He didn't buy any apples.",
        "zh": "他没买苹果。"
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
        "q": "Would you like _____ orange juice?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 0,
        "hint": "邀请用 some。",
        "sentence": "Would you like some tea?",
        "zh": "你想喝点茶吗？"
      },
      {
        "q": "She has _____ friends in Chengdu.",
        "opts": [
          "any",
          "some",
          "no a"
        ],
        "ans": 1,
        "hint": "肯定用 some。",
        "sentence": "She has some friends in Chengdu.",
        "zh": "她在成都有一些朋友。"
      },
      {
        "q": "Is there _____ water left?",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "疑问用 any。",
        "sentence": "Is there any water left?",
        "zh": "还剩水吗？"
      },
      {
        "q": "There is _____ time to waste.",
        "opts": [
          "any",
          "no",
          "some not"
        ],
        "ans": 1,
        "hint": "no time = not any time。",
        "sentence": "There is no time to waste.",
        "zh": "没有时间可浪费。"
      },
      {
        "q": "Could I have _____ paper, please?",
        "opts": [
          "any",
          "some",
          "no"
        ],
        "ans": 1,
        "hint": "请求可用 some。",
        "sentence": "Could I have some paper, please?",
        "zh": "请给我一些纸好吗？"
      },
      {
        "q": "He didn't buy _____ apples.",
        "opts": [
          "some",
          "any",
          "no"
        ],
        "ans": 1,
        "hint": "否定用 any。",
        "sentence": "He didn't buy any apples.",
        "zh": "他没买苹果。"
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
    "image": "w3-san-hero.jpg",
    "pairs": [
      {
        "en": "some tea",
        "zh": "一些茶"
      },
      {
        "en": "any milk",
        "zh": "一些牛奶（否/疑）"
      },
      {
        "en": "no time",
        "zh": "没有时间"
      },
      {
        "en": "Would you like some…?",
        "zh": "想要一些……吗？"
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
    "image": "w3-san-hero.jpg",
    "audio": "There isn't any milk in the fridge.",
    "opts": [
      "There isn't any milk in the fridge.",
      "Would you like any tea? (less natural for offer)",
      "Would you like no tea?"
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "There isn't any milk in the fridge.",
    "zh": "冰箱里没有牛奶了。",
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
      "肯定 some；否定/疑问 any",
      "Would you like some…? 邀请",
      "no = not any：There is no time.",
      "somebody / anybody / nobody 规则类似。"
    ],
    "chant": "Yes — some! No — any! Would you like some — that's savvy!",
    "chantSpeak": "Yes, some! No, any! Would you like some, that is savvy!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "some / any / no",
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