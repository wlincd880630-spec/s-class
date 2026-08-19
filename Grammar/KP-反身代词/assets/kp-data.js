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
    "audio": "The children enjoyed themselves at the party.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。",
    "image": "w5-refl-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-refl-hero.jpg",
    "question": "enjoyed themselves 中 themselves 指谁？",
    "choices": [
      {
        "text": "the children（主语自己）",
        "correct": true,
        "fb": "对了！反身代词指主语本身。"
      },
      {
        "text": "其他孩子",
        "correct": false,
        "fb": "themselves 指主语 the children 自己。"
      },
      {
        "text": "聚会上的大人",
        "correct": false,
        "fb": "反身代词与主语一致。"
      }
    ],
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-refl-hero.jpg",
    "lead": "动作回到主语自己身上时用反身代词。",
    "formula": "I → myself　you → yourself/yourselves　he → himself",
    "parts": [
      {
        "mark": "单数",
        "label": "-self",
        "example": "myself / himself / herself"
      },
      {
        "mark": "复数",
        "label": "-selves",
        "example": "ourselves / themselves"
      }
    ],
    "samples": [
      {
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "sentence": "I can finish it by myself.",
        "zh": "我能自己完成。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-refl-myself.jpg",
    "rightImage": "w5-refl-themselves.jpg",
    "leftLabel": "I → myself",
    "rightLabel": "they → themselves",
    "leftSentence": "I hurt myself when I fell.",
    "leftZh": "我摔倒时伤到了自己。",
    "rightSentence": "They taught themselves to swim.",
    "rightZh": "他们自学游泳。",
    "morphBase": "myself",
    "morphPast": "themselves",
    "morphHighlight": "",
    "discovery": "I→myself, you→yourself, he→himself, she→herself, we→ourselves, they→themselves。"
  },
  {
    "section": "精讲",
    "title": "例句 · enjoyed themselves",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-refl-hero.jpg",
    "lead": "children 复数 → themselves。",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · by myself",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-refl-hero.jpg",
    "lead": "by oneself = 独自。",
    "sentence": "I made the card by myself.",
    "zh": "这张卡片是我自己做的。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-refl-hero.jpg",
    "lead": "反身代词与人称对应。",
    "rules": [
      {
        "tab": "单数",
        "rule": "myself, yourself, himself, herself, itself",
        "focusVerb": "myself",
        "examples": [
          {
            "from": "I",
            "to": "myself"
          },
          {
            "from": "he",
            "to": "himself"
          }
        ],
        "sample": "I hurt myself when I fell.",
        "sampleZh": "我摔倒时伤到了自己。"
      },
      {
        "tab": "复数/常见搭配",
        "rule": "ourselves, yourselves, themselves；enjoy/help/dress + 反身代词",
        "focusVerb": "themselves",
        "examples": [
          {
            "from": "enjoy",
            "to": "enjoy themselves"
          }
        ],
        "sample": "The children enjoyed themselves at the party.",
        "sampleZh": "孩子们在聚会上玩得很开心。"
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
    "image": "w5-refl-hero.jpg",
    "buckets": [
      {
        "key": "sing",
        "label": "单数反身代词"
      },
      {
        "key": "plur",
        "label": "复数反身代词"
      }
    ],
    "items": [
      {
        "text": "myself",
        "bucket": "sing"
      },
      {
        "text": "ourselves",
        "bucket": "plur"
      },
      {
        "text": "yourself",
        "bucket": "sing"
      },
      {
        "text": "themselves",
        "bucket": "plur"
      },
      {
        "text": "himself",
        "bucket": "sing"
      },
      {
        "text": "yourselves",
        "bucket": "plur"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-refl-hero.jpg",
    "question": "「He enjoyed hisself at the picnic.」应改成？",
    "choices": [
      {
        "text": "himself（he → himself）",
        "correct": true,
        "fb": "没有 hisself 这种形式。"
      },
      {
        "text": "him",
        "correct": false,
        "fb": "enjoy 后常用反身。"
      },
      {
        "text": "heself",
        "correct": false,
        "fb": "错误形式。"
      }
    ],
    "sentence": "He enjoyed himself at the picnic.",
    "zh": "他在野餐时玩得很开心。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-refl-hero.jpg",
    "lead": "把 them 改成正确的反身代词。",
    "items": [
      {
        "from": "The students enjoyed them at the picnic.",
        "fromZh": "学生们在野餐时玩得很开心。（错误）",
        "steps": [
          {
            "label": "改正",
            "opts": [
              "The students enjoyed themselves at the picnic.",
              "The students enjoyed themself at the picnic.",
              "The students enjoyed theirselves at the picnic."
            ],
            "ans": 0,
            "hint": "复数 themselves。",
            "sentence": "The students enjoyed themselves at the picnic.",
            "zh": "学生们在野餐时玩得很开心。"
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
    "image": "w5-refl-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "The",
      "children",
      "enjoyed",
      "themselves",
      "at",
      "the",
      "party"
    ],
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-refl-hero.jpg",
    "audio": "The children enjoyed themselves at the party.",
    "tokens": [
      "The",
      "children",
      "enjoyed",
      "themselves",
      "at",
      "the",
      "party"
    ],
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-refl-hero.jpg",
    "q": "The students enjoyed _____ at the school picnic.",
    "opts": [
      "them",
      "their",
      "themselves"
    ],
    "ans": 2,
    "hint": "enjoy 后指主语自己，用反身代词 themselves。",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-refl-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "The students enjoyed _____ at the school picnic.",
        "opts": [
          "them",
          "their",
          "themselves"
        ],
        "ans": 2,
        "hint": "enjoy 后指主语自己，用反身代词 themselves。",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "Help _____, please. The cakes are for you. (you 复数)",
        "opts": [
          "yourself",
          "yourselves",
          "you"
        ],
        "ans": 1,
        "hint": "你们自己 yourselves。",
        "sentence": "Help yourselves, please.",
        "zh": "请你们随便吃。"
      },
      {
        "q": "She looked at _____ in the mirror.",
        "opts": [
          "her",
          "herself",
          "she"
        ],
        "ans": 1,
        "hint": "看自己 herself。",
        "sentence": "She looked at herself in the mirror.",
        "zh": "她看着镜子里的自己。"
      },
      {
        "q": "We should look after _____.",
        "opts": [
          "us",
          "ourselves",
          "ourself"
        ],
        "ans": 1,
        "hint": "我们自己 ourselves。",
        "sentence": "We should look after ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The little boy can dress _____.",
        "opts": [
          "him",
          "himself",
          "he"
        ],
        "ans": 1,
        "hint": "自己穿衣服 himself。",
        "sentence": "The little boy can dress himself.",
        "zh": "小男孩能自己穿衣服。"
      },
      {
        "q": "Don't worry. I can do it _____.",
        "opts": [
          "me",
          "my",
          "myself"
        ],
        "ans": 2,
        "hint": "by 可省略，myself。",
        "sentence": "I can do it myself.",
        "zh": "我能自己做。"
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
        "q": "The students enjoyed _____ at the school picnic.",
        "opts": [
          "them",
          "their",
          "themselves"
        ],
        "ans": 2,
        "hint": "enjoy 后指主语自己，用反身代词 themselves。",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "Help _____, please. The cakes are for you. (you 复数)",
        "opts": [
          "yourself",
          "yourselves",
          "you"
        ],
        "ans": 1,
        "hint": "你们自己 yourselves。",
        "sentence": "Help yourselves, please.",
        "zh": "请你们随便吃。"
      },
      {
        "q": "She looked at _____ in the mirror.",
        "opts": [
          "her",
          "herself",
          "she"
        ],
        "ans": 1,
        "hint": "看自己 herself。",
        "sentence": "She looked at herself in the mirror.",
        "zh": "她看着镜子里的自己。"
      },
      {
        "q": "We should look after _____.",
        "opts": [
          "us",
          "ourselves",
          "ourself"
        ],
        "ans": 1,
        "hint": "我们自己 ourselves。",
        "sentence": "We should look after ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The little boy can dress _____.",
        "opts": [
          "him",
          "himself",
          "he"
        ],
        "ans": 1,
        "hint": "自己穿衣服 himself。",
        "sentence": "The little boy can dress himself.",
        "zh": "小男孩能自己穿衣服。"
      },
      {
        "q": "Don't worry. I can do it _____.",
        "opts": [
          "me",
          "my",
          "myself"
        ],
        "ans": 2,
        "hint": "by 可省略，myself。",
        "sentence": "I can do it myself.",
        "zh": "我能自己做。"
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
        "q": "The students enjoyed _____ at the school picnic.",
        "opts": [
          "them",
          "their",
          "themselves"
        ],
        "ans": 2,
        "hint": "enjoy 后指主语自己，用反身代词 themselves。",
        "sentence": "The children enjoyed themselves at the party.",
        "zh": "孩子们在聚会上玩得很开心。"
      },
      {
        "q": "Help _____, please. The cakes are for you. (you 复数)",
        "opts": [
          "yourself",
          "yourselves",
          "you"
        ],
        "ans": 1,
        "hint": "你们自己 yourselves。",
        "sentence": "Help yourselves, please.",
        "zh": "请你们随便吃。"
      },
      {
        "q": "She looked at _____ in the mirror.",
        "opts": [
          "her",
          "herself",
          "she"
        ],
        "ans": 1,
        "hint": "看自己 herself。",
        "sentence": "She looked at herself in the mirror.",
        "zh": "她看着镜子里的自己。"
      },
      {
        "q": "We should look after _____.",
        "opts": [
          "us",
          "ourselves",
          "ourself"
        ],
        "ans": 1,
        "hint": "我们自己 ourselves。",
        "sentence": "We should look after ourselves.",
        "zh": "我们应该照顾好自己。"
      },
      {
        "q": "The little boy can dress _____.",
        "opts": [
          "him",
          "himself",
          "he"
        ],
        "ans": 1,
        "hint": "自己穿衣服 himself。",
        "sentence": "The little boy can dress himself.",
        "zh": "小男孩能自己穿衣服。"
      },
      {
        "q": "Don't worry. I can do it _____.",
        "opts": [
          "me",
          "my",
          "myself"
        ],
        "ans": 2,
        "hint": "by 可省略，myself。",
        "sentence": "I can do it myself.",
        "zh": "我能自己做。"
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
    "image": "w5-refl-hero.jpg",
    "pairs": [
      {
        "en": "myself",
        "zh": "我自己"
      },
      {
        "en": "yourself",
        "zh": "你自己"
      },
      {
        "en": "themselves",
        "zh": "他们自己"
      },
      {
        "en": "enjoy oneself",
        "zh": "玩得开心"
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
    "image": "w5-refl-hero.jpg",
    "audio": "The children enjoyed themselves at the party.",
    "opts": [
      "The children enjoyed themselves at the party.",
      "The children enjoyed them at the party.",
      "The children enjoyed theirselves at the party."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "The children enjoyed themselves at the party.",
    "zh": "孩子们在聚会上玩得很开心。",
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
      "主语=宾语时用反身代词",
      "myself/yourself/himself/herself",
      "enjoy/help/dress + 反身代词",
      "没有 theirselves / hisself；复数一定是 -selves。"
    ],
    "chant": "Myself for I, yourself for you — reflexive pronouns see you through!",
    "chantSpeak": "Myself for I, yourself for you, reflexive pronouns see you through!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "反身代词 myself / yourself",
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