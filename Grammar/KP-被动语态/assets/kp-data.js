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
    "audio": "English is spoken in many countries.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。",
    "image": "w3-pass-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-pass-hero.jpg",
    "question": "谁才是句子的主角——英语还是被说？",
    "choices": [
      {
        "text": "英语是主语，强调「被说」→ 被动语态",
        "correct": true,
        "fb": "对了！主语是动作的承受者。"
      },
      {
        "text": "主动语态",
        "correct": false,
        "fb": "主动句常说 People speak English。"
      },
      {
        "text": "过去时",
        "correct": false,
        "fb": "is spoken 是现在时被动。"
      }
    ],
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-pass-hero.jpg",
    "lead": "主语是动作的承受者时用被动。",
    "formula": "be + 过去分词　(+ by + 执行者)",
    "parts": [
      {
        "mark": "现在",
        "label": "am/is/are + PP",
        "example": "is spoken"
      },
      {
        "mark": "过去",
        "label": "was/were + PP",
        "example": "was cleaned"
      },
      {
        "mark": "by",
        "label": "可省略",
        "example": "by people"
      }
    ],
    "samples": [
      {
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家都说英语。"
      },
      {
        "sentence": "The classroom is cleaned every afternoon.",
        "zh": "教室每天下午被打扫。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-pass-act.jpg",
    "rightImage": "w3-pass-pass.jpg",
    "leftLabel": "主动",
    "rightLabel": "被动",
    "leftSentence": "People speak English.",
    "leftZh": "人们说英语。",
    "rightSentence": "English is spoken by many people.",
    "rightZh": "英语被很多人说。",
    "morphBase": "speak",
    "morphPast": "is spoken",
    "morphHighlight": "en",
    "discovery": "主语是承受者 → be + 过去分词 (+ by …)。"
  },
  {
    "section": "精讲",
    "title": "例句 · 英语被说",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pass-hero.jpg",
    "lead": "English 是承受者 → is spoken。",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家都说英语。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 教室被打扫",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-pass-hero.jpg",
    "lead": "每天发生的被动：is cleaned。",
    "sentence": "The classroom is cleaned every afternoon.",
    "zh": "教室每天下午被打扫。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-pass-hero.jpg",
    "lead": "被动语态构成。",
    "rules": [
      {
        "tab": "现在",
        "rule": "am/is/are + 过去分词",
        "focusVerb": "is spoken",
        "examples": [
          {
            "from": "speak",
            "to": "is spoken"
          },
          {
            "from": "make",
            "to": "is made"
          }
        ],
        "sample": "English is spoken in many countries.",
        "sampleZh": "许多国家说英语。"
      },
      {
        "tab": "过去",
        "rule": "was/were + 过去分词",
        "focusVerb": "was built",
        "examples": [
          {
            "from": "build",
            "to": "was built"
          }
        ],
        "sample": "The bridge was built in 2010.",
        "sampleZh": "这座桥建于 2010 年。"
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
    "image": "w3-pass-hero.jpg",
    "buckets": [
      {
        "key": "act",
        "label": "主动语态"
      },
      {
        "key": "pas",
        "label": "被动语态"
      }
    ],
    "items": [
      {
        "text": "Tom cleans the classroom.",
        "bucket": "act"
      },
      {
        "text": "The classroom is cleaned every day.",
        "bucket": "pas"
      },
      {
        "text": "They built the bridge in 2010.",
        "bucket": "act"
      },
      {
        "text": "The bridge was built in 2010.",
        "bucket": "pas"
      },
      {
        "text": "Miss Li teaches us English.",
        "bucket": "act"
      },
      {
        "text": "We are taught English by Miss Li.",
        "bucket": "pas"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-pass-hero.jpg",
    "question": "「The window is broke by the boy.」应改成？",
    "choices": [
      {
        "text": "is broken（过去分词）",
        "correct": true,
        "fb": "break → broken。"
      },
      {
        "text": "is breaking",
        "correct": false,
        "fb": "进行时不是被动入门公式。"
      },
      {
        "text": "broke",
        "correct": false,
        "fb": "缺少 be。"
      }
    ],
    "sentence": "The window is broken by the boy.",
    "zh": "窗户被那个男孩打破了。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-pass-hero.jpg",
    "lead": "主动变被动：宾语变主语，动词变 be + PP。",
    "items": [
      {
        "from": "People speak English in many countries.",
        "fromZh": "许多人在很多国家说英语。",
        "steps": [
          {
            "label": "改成被动",
            "opts": [
              "English is spoken in many countries.",
              "English is speak in many countries.",
              "English spoken in many countries."
            ],
            "ans": 0,
            "hint": "speak → is spoken。",
            "sentence": "English is spoken in many countries.",
            "zh": "许多国家都说英语。"
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
    "image": "w3-pass-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "English",
      "is",
      "spoken",
      "in",
      "many",
      "countries"
    ],
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-pass-hero.jpg",
    "audio": "English is spoken in many countries.",
    "tokens": [
      "English",
      "is",
      "spoken",
      "in",
      "many",
      "countries"
    ],
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-pass-hero.jpg",
    "q": "The classroom _____ every afternoon.",
    "opts": [
      "cleans",
      "is cleaned",
      "cleaned"
    ],
    "ans": 1,
    "hint": "教室是「被打扫」→ 被动。",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-pass-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "The classroom _____ every afternoon.",
        "opts": [
          "cleans",
          "is cleaned",
          "cleaned"
        ],
        "ans": 1,
        "hint": "教室是「被打扫」→ 被动。",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The book _____ by Mo Yan.",
        "opts": [
          "wrote",
          "was written",
          "is writing"
        ],
        "ans": 1,
        "hint": "过去被动 was written。",
        "sentence": "The book was written by Mo Yan.",
        "zh": "这本书是莫言写的。"
      },
      {
        "q": "These photos _____ in Chengdu.",
        "opts": [
          "are taken",
          "taken",
          "took"
        ],
        "ans": 0,
        "hint": "现在被动 are taken。",
        "sentence": "These photos are taken in Chengdu.",
        "zh": "这些照片是在成都拍的。"
      },
      {
        "q": "The flowers _____ every morning.",
        "opts": [
          "water",
          "are watered",
          "watering"
        ],
        "ans": 1,
        "hint": "flowers 承受者 → are watered。",
        "sentence": "The flowers are watered every morning.",
        "zh": "花每天早上被浇水。"
      },
      {
        "q": "The letter _____ yesterday.",
        "opts": [
          "is sent",
          "was sent",
          "sent"
        ],
        "ans": 1,
        "hint": "yesterday → 过去被动 was sent。",
        "sentence": "The letter was sent yesterday.",
        "zh": "信昨天被寄出。"
      },
      {
        "q": "Rice _____ in the south of China.",
        "opts": [
          "grows",
          "is grown",
          "grew"
        ],
        "ans": 1,
        "hint": "水稻被种植 → is grown。",
        "sentence": "Rice is grown in the south of China.",
        "zh": "中国南方种植水稻。"
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
        "q": "The classroom _____ every afternoon.",
        "opts": [
          "cleans",
          "is cleaned",
          "cleaned"
        ],
        "ans": 1,
        "hint": "教室是「被打扫」→ 被动。",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The book _____ by Mo Yan.",
        "opts": [
          "wrote",
          "was written",
          "is writing"
        ],
        "ans": 1,
        "hint": "过去被动 was written。",
        "sentence": "The book was written by Mo Yan.",
        "zh": "这本书是莫言写的。"
      },
      {
        "q": "These photos _____ in Chengdu.",
        "opts": [
          "are taken",
          "taken",
          "took"
        ],
        "ans": 0,
        "hint": "现在被动 are taken。",
        "sentence": "These photos are taken in Chengdu.",
        "zh": "这些照片是在成都拍的。"
      },
      {
        "q": "The flowers _____ every morning.",
        "opts": [
          "water",
          "are watered",
          "watering"
        ],
        "ans": 1,
        "hint": "flowers 承受者 → are watered。",
        "sentence": "The flowers are watered every morning.",
        "zh": "花每天早上被浇水。"
      },
      {
        "q": "The letter _____ yesterday.",
        "opts": [
          "is sent",
          "was sent",
          "sent"
        ],
        "ans": 1,
        "hint": "yesterday → 过去被动 was sent。",
        "sentence": "The letter was sent yesterday.",
        "zh": "信昨天被寄出。"
      },
      {
        "q": "Rice _____ in the south of China.",
        "opts": [
          "grows",
          "is grown",
          "grew"
        ],
        "ans": 1,
        "hint": "水稻被种植 → is grown。",
        "sentence": "Rice is grown in the south of China.",
        "zh": "中国南方种植水稻。"
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
        "q": "The classroom _____ every afternoon.",
        "opts": [
          "cleans",
          "is cleaned",
          "cleaned"
        ],
        "ans": 1,
        "hint": "教室是「被打扫」→ 被动。",
        "sentence": "English is spoken in many countries.",
        "zh": "许多国家说英语。"
      },
      {
        "q": "The book _____ by Mo Yan.",
        "opts": [
          "wrote",
          "was written",
          "is writing"
        ],
        "ans": 1,
        "hint": "过去被动 was written。",
        "sentence": "The book was written by Mo Yan.",
        "zh": "这本书是莫言写的。"
      },
      {
        "q": "These photos _____ in Chengdu.",
        "opts": [
          "are taken",
          "taken",
          "took"
        ],
        "ans": 0,
        "hint": "现在被动 are taken。",
        "sentence": "These photos are taken in Chengdu.",
        "zh": "这些照片是在成都拍的。"
      },
      {
        "q": "The flowers _____ every morning.",
        "opts": [
          "water",
          "are watered",
          "watering"
        ],
        "ans": 1,
        "hint": "flowers 承受者 → are watered。",
        "sentence": "The flowers are watered every morning.",
        "zh": "花每天早上被浇水。"
      },
      {
        "q": "The letter _____ yesterday.",
        "opts": [
          "is sent",
          "was sent",
          "sent"
        ],
        "ans": 1,
        "hint": "yesterday → 过去被动 was sent。",
        "sentence": "The letter was sent yesterday.",
        "zh": "信昨天被寄出。"
      },
      {
        "q": "Rice _____ in the south of China.",
        "opts": [
          "grows",
          "is grown",
          "grew"
        ],
        "ans": 1,
        "hint": "水稻被种植 → is grown。",
        "sentence": "Rice is grown in the south of China.",
        "zh": "中国南方种植水稻。"
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
    "image": "w3-pass-hero.jpg",
    "pairs": [
      {
        "en": "is spoken",
        "zh": "被说"
      },
      {
        "en": "was written",
        "zh": "被写"
      },
      {
        "en": "are cleaned",
        "zh": "被打扫"
      },
      {
        "en": "by",
        "zh": "被……（执行者）"
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
    "image": "w3-pass-hero.jpg",
    "audio": "English is spoken in many countries.",
    "opts": [
      "English is spoken in many countries.",
      "English spoken in many countries.",
      "English is speak in many countries."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "English is spoken in many countries.",
    "zh": "许多国家说英语。",
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
      "主语是承受者 → be + 过去分词",
      "by + 执行者（可省略）",
      "写作：The book was written by…",
      "情态被动：must be finished，初中再学。"
    ],
    "chant": "Be plus past participle — passive voice! The subject receives — that's the choice!",
    "chantSpeak": "Be plus past participle, passive voice! The subject receives, that is the choice!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "被动语态 · 入门",
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