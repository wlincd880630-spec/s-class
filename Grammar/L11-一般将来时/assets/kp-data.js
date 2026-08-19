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
    "audio": "It will be sunny and warm next Monday.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。",
    "image": "l12-future-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l12-future-hero.jpg",
    "question": "next Monday 说明用什么时态？",
    "choices": [
      {
        "text": "一般将来时 will + 原形/be",
        "correct": true,
        "fb": "对了！next… → will。"
      },
      {
        "text": "一般过去时",
        "correct": false,
        "fb": "next Monday 是将来。"
      },
      {
        "text": "现在进行时",
        "correct": false,
        "fb": "没有 now/look 等标志。"
      }
    ],
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l12-future-hero.jpg",
    "lead": "将来要发生的事：will + 动词原形；状态用 will be。",
    "formula": "主语 + will + 动词原形　/　will be + 形容词",
    "parts": [
      {
        "mark": "will",
        "label": "所有人称相同",
        "example": "I/He/They will"
      },
      {
        "mark": "原形",
        "label": "不加 -s",
        "example": "go / have / visit"
      },
      {
        "mark": "标志",
        "label": "tomorrow / next…",
        "example": "next Monday"
      }
    ],
    "samples": [
      {
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "sentence": "We will have a school trip next month.",
        "zh": "下个月我们有学校郊游。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l12-now.jpg",
    "rightImage": "l12-future.jpg",
    "leftLabel": "现在 is",
    "rightLabel": "将来 will be",
    "leftSentence": "It is rainy today.",
    "leftZh": "今天在下雨。",
    "rightSentence": "It will be sunny next Monday.",
    "rightZh": "下周一将会晴朗。",
    "morphBase": "is",
    "morphPast": "will be",
    "morphHighlight": "will",
    "discovery": "将来：will + 动词原形；will be + 形容词/名词。"
  },
  {
    "section": "精讲",
    "title": "例句 · will be",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l12-future-hero.jpg",
    "lead": "天气/状态：will be + 形容词。",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · will + 原形",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l12-future-hero.jpg",
    "lead": "所有人称都用 will，动词不加 s。",
    "sentence": "She will visit Beijing next year.",
    "zh": "她明年将去北京。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l12-future-hero.jpg",
    "rules": [
      {
        "tab": "will + 动词",
        "rule": "will + 动词原形",
        "focusVerb": "will visit",
        "examples": [
          {
            "from": "go",
            "to": "will go"
          },
          {
            "from": "have",
            "to": "will have"
          }
        ],
        "sample": "We will have a school trip next month.",
        "sampleZh": "下个月我们有学校郊游。"
      },
      {
        "tab": "will be",
        "rule": "will be + 形容词/名词",
        "focusVerb": "will be",
        "examples": [
          {
            "from": "sunny",
            "to": "will be sunny"
          }
        ],
        "sample": "It will be sunny and warm next Monday.",
        "sampleZh": "下周一将会晴朗温暖。"
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
    "image": "l12-future-hero.jpg",
    "buckets": [
      {
        "key": "now",
        "label": "现在"
      },
      {
        "key": "fut",
        "label": "将来 will"
      }
    ],
    "items": [
      {
        "text": "I am twelve.",
        "bucket": "now"
      },
      {
        "text": "I will be thirteen next year.",
        "bucket": "fut"
      },
      {
        "text": "She studies hard.",
        "bucket": "now"
      },
      {
        "text": "She will visit Beijing.",
        "bucket": "fut"
      },
      {
        "text": "They play football.",
        "bucket": "now"
      },
      {
        "text": "They will have a test tomorrow.",
        "bucket": "fut"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l12-future-hero.jpg",
    "question": "「She wills go to school tomorrow.」错在哪？",
    "choices": [
      {
        "text": "will 没有第三人称 -s，动词用原形 go",
        "correct": true,
        "fb": "will 对所有人称都一样。"
      },
      {
        "text": "tomorrow 要改成 yesterday",
        "correct": false,
        "fb": "tomorrow 正是将来标志。"
      },
      {
        "text": "要用 going",
        "correct": false,
        "fb": "will 后接原形，不是 -ing。"
      }
    ],
    "sentence": "She will go to school tomorrow.",
    "zh": "她明天将去上学。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l12-future-hero.jpg",
    "lead": "will 否定：will not / won't；疑问：Will + 主语 + 原形？",
    "items": [
      {
        "from": "They will have a test tomorrow.",
        "fromZh": "他们明天将有考试。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "They won't have a test tomorrow.",
              "They don't will have a test tomorrow.",
              "They will not has a test tomorrow."
            ],
            "ans": 0,
            "hint": "won't + 原形。",
            "sentence": "They won't have a test tomorrow.",
            "zh": "他们明天将没有考试。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Will they have a test tomorrow?",
              "Do they will have a test tomorrow?",
              "Will they has a test tomorrow?"
            ],
            "ans": 0,
            "hint": "Will + 主语 + 原形？",
            "sentence": "Will they have a test tomorrow?",
            "zh": "他们明天有考试吗？"
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
    "image": "l12-future-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "We",
      "will",
      "have",
      "a",
      "school",
      "trip",
      "next",
      "month"
    ],
    "sentence": "We will have a school trip next month.",
    "zh": "下个月我们有学校郊游。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l12-future-hero.jpg",
    "audio": "We will have a school trip next month.",
    "tokens": [
      "We",
      "will",
      "have",
      "a",
      "school",
      "trip",
      "next",
      "month"
    ],
    "sentence": "We will have a school trip next month.",
    "zh": "下个月我们有学校郊游。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l12-future-hero.jpg",
    "q": "It _____ sunny and warm next Monday.",
    "opts": [
      "is",
      "will be",
      "was"
    ],
    "ans": 1,
    "hint": "next Monday → will be。",
    "sentence": "It will be sunny and warm next Monday.",
    "zh": "下周一将会晴朗温暖。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l12-future-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "It _____ sunny and warm next Monday.",
        "opts": [
          "is",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next Monday → will be。",
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "q": "I _____ thirteen next year.",
        "opts": [
          "am",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next year → will be。",
        "sentence": "I will be thirteen next year.",
        "zh": "我明年就十三岁了。"
      },
      {
        "q": "_____ you come to my party?",
        "opts": [
          "Do",
          "Will",
          "Are"
        ],
        "ans": 1,
        "hint": "将来邀请用 Will you…?",
        "sentence": "Will you come to my party?",
        "zh": "你会来我的聚会吗？"
      },
      {
        "q": "He _____ football tomorrow. （否定）",
        "opts": [
          "won't play",
          "doesn't play",
          "isn't play"
        ],
        "ans": 0,
        "hint": "将来否定 won't + 原形。",
        "sentence": "He won't play football tomorrow.",
        "zh": "他明天不踢足球。"
      },
      {
        "q": "Look at the clouds. It _____ soon.",
        "opts": [
          "rains",
          "will rain",
          "rained"
        ],
        "ans": 1,
        "hint": "soon 将来标志。",
        "sentence": "It will rain soon.",
        "zh": "很快就要下雨了。"
      },
      {
        "q": "We _____ to the museum next Friday.",
        "opts": [
          "go",
          "goes",
          "will go"
        ],
        "ans": 2,
        "hint": "next Friday → will go。",
        "sentence": "We will go to the museum next Friday.",
        "zh": "下周五我们去博物馆。"
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
        "q": "It _____ sunny and warm next Monday.",
        "opts": [
          "is",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next Monday → will be。",
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "q": "I _____ thirteen next year.",
        "opts": [
          "am",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next year → will be。",
        "sentence": "I will be thirteen next year.",
        "zh": "我明年就十三岁了。"
      },
      {
        "q": "_____ you come to my party?",
        "opts": [
          "Do",
          "Will",
          "Are"
        ],
        "ans": 1,
        "hint": "将来邀请用 Will you…?",
        "sentence": "Will you come to my party?",
        "zh": "你会来我的聚会吗？"
      },
      {
        "q": "He _____ football tomorrow. （否定）",
        "opts": [
          "won't play",
          "doesn't play",
          "isn't play"
        ],
        "ans": 0,
        "hint": "将来否定 won't + 原形。",
        "sentence": "He won't play football tomorrow.",
        "zh": "他明天不踢足球。"
      },
      {
        "q": "Look at the clouds. It _____ soon.",
        "opts": [
          "rains",
          "will rain",
          "rained"
        ],
        "ans": 1,
        "hint": "soon 将来标志。",
        "sentence": "It will rain soon.",
        "zh": "很快就要下雨了。"
      },
      {
        "q": "We _____ to the museum next Friday.",
        "opts": [
          "go",
          "goes",
          "will go"
        ],
        "ans": 2,
        "hint": "next Friday → will go。",
        "sentence": "We will go to the museum next Friday.",
        "zh": "下周五我们去博物馆。"
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
        "q": "It _____ sunny and warm next Monday.",
        "opts": [
          "is",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next Monday → will be。",
        "sentence": "It will be sunny and warm next Monday.",
        "zh": "下周一将会晴朗温暖。"
      },
      {
        "q": "I _____ thirteen next year.",
        "opts": [
          "am",
          "will be",
          "was"
        ],
        "ans": 1,
        "hint": "next year → will be。",
        "sentence": "I will be thirteen next year.",
        "zh": "我明年就十三岁了。"
      },
      {
        "q": "_____ you come to my party?",
        "opts": [
          "Do",
          "Will",
          "Are"
        ],
        "ans": 1,
        "hint": "将来邀请用 Will you…?",
        "sentence": "Will you come to my party?",
        "zh": "你会来我的聚会吗？"
      },
      {
        "q": "He _____ football tomorrow. （否定）",
        "opts": [
          "won't play",
          "doesn't play",
          "isn't play"
        ],
        "ans": 0,
        "hint": "将来否定 won't + 原形。",
        "sentence": "He won't play football tomorrow.",
        "zh": "他明天不踢足球。"
      },
      {
        "q": "Look at the clouds. It _____ soon.",
        "opts": [
          "rains",
          "will rain",
          "rained"
        ],
        "ans": 1,
        "hint": "soon 将来标志。",
        "sentence": "It will rain soon.",
        "zh": "很快就要下雨了。"
      },
      {
        "q": "We _____ to the museum next Friday.",
        "opts": [
          "go",
          "goes",
          "will go"
        ],
        "ans": 2,
        "hint": "next Friday → will go。",
        "sentence": "We will go to the museum next Friday.",
        "zh": "下周五我们去博物馆。"
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
    "image": "l12-future-hero.jpg",
    "pairs": [
      {
        "en": "will go",
        "zh": "将要去"
      },
      {
        "en": "will be sunny",
        "zh": "将会晴朗"
      },
      {
        "en": "won't",
        "zh": "将不"
      },
      {
        "en": "next week",
        "zh": "下周（标志词）"
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
    "image": "l12-future-hero.jpg",
    "audio": "We will have a school trip next month.",
    "opts": [
      "We will have a school trip next month.",
      "It is sunny and warm next Monday.",
      "It was sunny and warm next Monday."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "We will have a school trip next month.",
    "zh": "下个月我们有学校郊游。",
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
      "将来标志：tomorrow, next week/year, soon",
      "will + 动词原形；will be + 形/名",
      "写作：I think it will…",
      "be going to 表示已有打算，初中第 09 讲再展开。",
      "条件句 If it rains, we will stay. 也在初中学习。"
    ],
    "chant": "Next time coming? Will's the sign! Will plus base — future's fine!",
    "chantSpeak": "Next time coming, will is the sign! Will plus base, future is fine!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "一般将来时 will",
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