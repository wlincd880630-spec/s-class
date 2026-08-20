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
    "audio": "I want to join the art club.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。",
    "image": "w5-wn-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-wn-hero.jpg",
    "question": "The window needs repairing 是什么意思？",
    "choices": [
      {
        "text": "窗户需要被修理（need doing = 被动）",
        "correct": true,
        "fb": "对了！need doing = need to be done。"
      },
      {
        "text": "窗户需要修理别人",
        "correct": false,
        "fb": "need doing 主语是承受动作的对象。"
      },
      {
        "text": "窗户正在修理",
        "correct": false,
        "fb": "need doing 表需要被…，不是进行时。"
      }
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-wn-hero.jpg",
    "lead": "want / would like 后接 to do；need 可接 to do 或 doing。",
    "formula": "want to do　　need to do　　need doing = need to be done",
    "parts": [
      {
        "mark": "want",
        "label": "想要",
        "example": "want to join"
      },
      {
        "mark": "need to",
        "label": "需要去做",
        "example": "need to wash"
      },
      {
        "mark": "need doing",
        "label": "某物需要被……",
        "example": "needs washing"
      }
    ],
    "samples": [
      {
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社。"
      },
      {
        "sentence": "My hair is dirty. It needs washing.",
        "zh": "我头发脏了，需要洗。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-wn-want.jpg",
    "rightImage": "w5-wn-need.jpg",
    "leftLabel": "want to do",
    "rightLabel": "need doing",
    "leftSentence": "I want to join the art club.",
    "leftZh": "我想加入美术社团。",
    "rightSentence": "The window needs repairing.",
    "rightZh": "窗户需要修理。",
    "morphBase": "want to",
    "morphPast": "need doing",
    "morphHighlight": "",
    "discovery": "want to do 想要做；need to do 需要做；need doing = need to be done 需要被…。"
  },
  {
    "section": "精讲",
    "title": "例句 · want to do",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-wn-hero.jpg",
    "lead": "人作主语：want to + 原形。",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · need doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-wn-hero.jpg",
    "lead": "物作主语：needs washing = needs to be washed。",
    "sentence": "The car needs washing.",
    "zh": "这辆车需要洗。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-wn-hero.jpg",
    "lead": "want 与 need 的两套结构。",
    "rules": [
      {
        "tab": "want to",
        "rule": "want to + 动词原形（想要做）",
        "focusVerb": "want",
        "examples": [
          {
            "from": "join",
            "to": "want to join"
          }
        ],
        "sample": "I want to join the art club.",
        "sampleZh": "我想加入美术社团。"
      },
      {
        "tab": "need",
        "rule": "need to do 需要做；need doing = need to be done 需要被…",
        "focusVerb": "need",
        "examples": [
          {
            "from": "repair",
            "to": "needs repairing"
          },
          {
            "from": "wash",
            "to": "needs washing"
          }
        ],
        "sample": "The window needs repairing.",
        "sampleZh": "窗户需要修理。"
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
    "image": "w5-wn-hero.jpg",
    "buckets": [
      {
        "key": "want",
        "label": "want to do"
      },
      {
        "key": "need",
        "label": "need to / need doing"
      }
    ],
    "items": [
      {
        "text": "want to join",
        "bucket": "want"
      },
      {
        "text": "need to study",
        "bucket": "need"
      },
      {
        "text": "want to be a doctor",
        "bucket": "want"
      },
      {
        "text": "need repairing",
        "bucket": "need"
      },
      {
        "text": "want to learn English",
        "bucket": "want"
      },
      {
        "text": "need washing",
        "bucket": "need"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-wn-hero.jpg",
    "question": "「I want joining the club.」应改成？",
    "choices": [
      {
        "text": "want to join",
        "correct": true,
        "fb": "want + to do。"
      },
      {
        "text": "want join",
        "correct": false,
        "fb": "缺 to。"
      },
      {
        "text": "want joined",
        "correct": false,
        "fb": "不是过去分词。"
      }
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-wn-hero.jpg",
    "lead": "need to be done 改成 need doing。",
    "items": [
      {
        "from": "The room needs to be cleaned.",
        "fromZh": "房间需要被打扫。",
        "steps": [
          {
            "label": "改成 need doing",
            "opts": [
              "The room needs cleaning.",
              "The room needs clean.",
              "The room needs to cleaning."
            ],
            "ans": 0,
            "hint": "need + doing 表被动。",
            "sentence": "The room needs cleaning.",
            "zh": "房间需要打扫。"
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
    "image": "w5-wn-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "want",
      "to",
      "join",
      "the",
      "art",
      "club"
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-wn-hero.jpg",
    "audio": "I want to join the art club.",
    "tokens": [
      "I",
      "want",
      "to",
      "join",
      "the",
      "art",
      "club"
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-wn-hero.jpg",
    "q": "My hair is dirty. It needs _____.",
    "opts": [
      "wash",
      "washing",
      "to wash"
    ],
    "ans": 1,
    "hint": "need doing = 需要被洗，hair needs washing。",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-wn-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "My hair is dirty. It needs _____.",
        "opts": [
          "wash",
          "washing",
          "to wash"
        ],
        "ans": 1,
        "hint": "need doing = 需要被洗，hair needs washing。",
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社团。"
      },
      {
        "q": "She would like _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "would like to do。",
        "sentence": "She would like to have a rest.",
        "zh": "她想休息一下。"
      },
      {
        "q": "You need _____ more water.",
        "opts": [
          "drink",
          "to drink",
          "drinking"
        ],
        "ans": 1,
        "hint": "人作主语 need to do。",
        "sentence": "You need to drink more water.",
        "zh": "你需要多喝水。"
      },
      {
        "q": "Your shoes need _____.",
        "opts": [
          "polish",
          "to polish",
          "polishing"
        ],
        "ans": 2,
        "hint": "物作主语 need doing。",
        "sentence": "Your shoes need polishing.",
        "zh": "你的鞋需要擦。"
      },
      {
        "q": "He doesn't want _____ outside. It's cold.",
        "opts": [
          "to go",
          "going",
          "go"
        ],
        "ans": 0,
        "hint": "want to go。",
        "sentence": "He doesn't want to go outside.",
        "zh": "他不想出去。"
      },
      {
        "q": "The flowers need _____ every day.",
        "opts": [
          "to water",
          "watering",
          "watered"
        ],
        "ans": 1,
        "hint": "花需要被浇 → watering。",
        "sentence": "The flowers need watering every day.",
        "zh": "花需要每天浇。"
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
        "q": "My hair is dirty. It needs _____.",
        "opts": [
          "wash",
          "washing",
          "to wash"
        ],
        "ans": 1,
        "hint": "need doing = 需要被洗，hair needs washing。",
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社团。"
      },
      {
        "q": "She would like _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "would like to do。",
        "sentence": "She would like to have a rest.",
        "zh": "她想休息一下。"
      },
      {
        "q": "You need _____ more water.",
        "opts": [
          "drink",
          "to drink",
          "drinking"
        ],
        "ans": 1,
        "hint": "人作主语 need to do。",
        "sentence": "You need to drink more water.",
        "zh": "你需要多喝水。"
      },
      {
        "q": "Your shoes need _____.",
        "opts": [
          "polish",
          "to polish",
          "polishing"
        ],
        "ans": 2,
        "hint": "物作主语 need doing。",
        "sentence": "Your shoes need polishing.",
        "zh": "你的鞋需要擦。"
      },
      {
        "q": "He doesn't want _____ outside. It's cold.",
        "opts": [
          "to go",
          "going",
          "go"
        ],
        "ans": 0,
        "hint": "want to go。",
        "sentence": "He doesn't want to go outside.",
        "zh": "他不想出去。"
      },
      {
        "q": "The flowers need _____ every day.",
        "opts": [
          "to water",
          "watering",
          "watered"
        ],
        "ans": 1,
        "hint": "花需要被浇 → watering。",
        "sentence": "The flowers need watering every day.",
        "zh": "花需要每天浇。"
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
        "q": "My hair is dirty. It needs _____.",
        "opts": [
          "wash",
          "washing",
          "to wash"
        ],
        "ans": 1,
        "hint": "need doing = 需要被洗，hair needs washing。",
        "sentence": "I want to join the art club.",
        "zh": "我想加入美术社团。"
      },
      {
        "q": "She would like _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "would like to do。",
        "sentence": "She would like to have a rest.",
        "zh": "她想休息一下。"
      },
      {
        "q": "You need _____ more water.",
        "opts": [
          "drink",
          "to drink",
          "drinking"
        ],
        "ans": 1,
        "hint": "人作主语 need to do。",
        "sentence": "You need to drink more water.",
        "zh": "你需要多喝水。"
      },
      {
        "q": "Your shoes need _____.",
        "opts": [
          "polish",
          "to polish",
          "polishing"
        ],
        "ans": 2,
        "hint": "物作主语 need doing。",
        "sentence": "Your shoes need polishing.",
        "zh": "你的鞋需要擦。"
      },
      {
        "q": "He doesn't want _____ outside. It's cold.",
        "opts": [
          "to go",
          "going",
          "go"
        ],
        "ans": 0,
        "hint": "want to go。",
        "sentence": "He doesn't want to go outside.",
        "zh": "他不想出去。"
      },
      {
        "q": "The flowers need _____ every day.",
        "opts": [
          "to water",
          "watering",
          "watered"
        ],
        "ans": 1,
        "hint": "花需要被浇 → watering。",
        "sentence": "The flowers need watering every day.",
        "zh": "花需要每天浇。"
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
    "image": "w5-wn-hero.jpg",
    "pairs": [
      {
        "en": "want to join",
        "zh": "想加入"
      },
      {
        "en": "would like to",
        "zh": "想要"
      },
      {
        "en": "need to do",
        "zh": "需要去做"
      },
      {
        "en": "need doing",
        "zh": "需要被……"
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
    "image": "w5-wn-hero.jpg",
    "audio": "I want to join the art club.",
    "opts": [
      "I want to join the art club.",
      "I want joining the art club.",
      "I want join the art club."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。",
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
      "want to do 想要做",
      "need to do 需要做",
      "need doing = need to be done",
      "would like = want，但更礼貌，后接 to do 不接 doing。"
    ],
    "chant": "Want to do — that's your goal! Need doing — passive role!",
    "chantSpeak": "Want to do, that is your goal! Need doing, passive role!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "want to / need doing",
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