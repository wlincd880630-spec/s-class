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
    "audio": "What do you think we can do to solve the problem?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你认为我们能做什么来解决这个问题？",
    "image": "w3-oc-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-oc-hero.jpg",
    "question": "宾语从句中语序应该怎样？",
    "choices": [
      {
        "text": "陈述语序：主语 + 谓语",
        "correct": true,
        "fb": "对了！we can do，不是 can we do。"
      },
      {
        "text": "疑问语序：助动词在主语前",
        "correct": false,
        "fb": "从句不用疑问倒装。"
      },
      {
        "text": "省略主语",
        "correct": false,
        "fb": "从句需要完整主语。"
      }
    ],
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你认为我们能做什么来解决这个问题？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-oc-hero.jpg",
    "lead": "宾语从句用陈述语序：连接词 + 主语 + 谓语。",
    "formula": "I know + that / what / if + 主语 + 谓语",
    "parts": [
      {
        "mark": "主句",
        "label": "think/know/say",
        "example": "I know"
      },
      {
        "mark": "连接词",
        "label": "that/what/if",
        "example": "where"
      },
      {
        "mark": "从句",
        "label": "陈述语序",
        "example": "he lives"
      }
    ],
    "samples": [
      {
        "sentence": "I know where he lives.",
        "zh": "我知道他住在哪里。"
      },
      {
        "sentence": "What do you think we can do?",
        "zh": "你觉得我们能做什么？"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-oc-wrong.jpg",
    "rightImage": "w3-oc-right.jpg",
    "leftLabel": "❌ can we do",
    "rightLabel": "✓ we can do",
    "leftSentence": "What do you think can we do?",
    "leftZh": "（错误语序）",
    "rightSentence": "What do you think we can do?",
    "rightZh": "你认为我们能做什么？",
    "morphBase": "can we",
    "morphPast": "we can",
    "morphHighlight": "",
    "discovery": "宾语从句用陈述语序，即使前面有特殊疑问词。"
  },
  {
    "section": "精讲",
    "title": "例句 · where 陈述语序",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-oc-hero.jpg",
    "lead": "where he lives，不是 where does he live。",
    "sentence": "I know where he lives.",
    "zh": "我知道他住在哪里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · think 后的从句",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-oc-hero.jpg",
    "lead": "What do you think + 陈述语序。",
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你觉得我们能做什么来解决问题？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-oc-hero.jpg",
    "lead": "宾语从句语序规则。",
    "rules": [
      {
        "tab": "语序",
        "rule": "连接词 + 主语 + 谓语（陈述语序）",
        "focusVerb": "we can",
        "examples": [
          {
            "from": "can we",
            "to": "we can"
          },
          {
            "from": "does he",
            "to": "he does"
          }
        ],
        "sample": "What do you think we can do to solve the problem?",
        "sampleZh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "tab": "时态",
        "rule": "主句现在时，从句时态根据实际情况",
        "focusVerb": "think",
        "examples": [
          {
            "from": "I think",
            "to": "he is right"
          }
        ],
        "sample": "I believe that English is useful.",
        "sampleZh": "我相信英语很有用。"
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
    "image": "w3-oc-hero.jpg",
    "buckets": [
      {
        "key": "ok",
        "label": "陈述语序 ✓"
      },
      {
        "key": "no",
        "label": "疑问语序 ✗"
      }
    ],
    "items": [
      {
        "text": "I know where he lives.",
        "bucket": "ok"
      },
      {
        "text": "I know where does he live.",
        "bucket": "no",
        "hint": "应为 he lives。"
      },
      {
        "text": "Tell me what you want.",
        "bucket": "ok"
      },
      {
        "text": "Tell me what do you want.",
        "bucket": "no"
      },
      {
        "text": "What do you think we should do?",
        "bucket": "ok"
      },
      {
        "text": "What do you think should we do?",
        "bucket": "no"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-oc-hero.jpg",
    "question": "「I don't know where does he live.」应改成？",
    "choices": [
      {
        "text": "where he lives（去掉 does，陈述语序）",
        "correct": true,
        "fb": "从句不能再用疑问语序。"
      },
      {
        "text": "where he live",
        "correct": false,
        "fb": "he 三单，lives。"
      },
      {
        "text": "where is he live",
        "correct": false,
        "fb": "更乱了。"
      }
    ],
    "sentence": "I don't know where he lives.",
    "zh": "我不知道他住在哪里。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-oc-hero.jpg",
    "lead": "把问句变成宾语从句：疑问词留下，后面改陈述语序。",
    "items": [
      {
        "from": "Where does he live?",
        "fromZh": "他住在哪里？",
        "steps": [
          {
            "label": "接在 I ask 后面",
            "opts": [
              "I ask where he lives.",
              "I ask where does he live.",
              "I ask where he live."
            ],
            "ans": 0,
            "hint": "where + he lives。",
            "sentence": "I ask where he lives.",
            "zh": "我问他住在哪里。"
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
    "image": "w3-oc-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "know",
      "where",
      "he",
      "lives"
    ],
    "sentence": "I know where he lives.",
    "zh": "我知道他住在哪里。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-oc-hero.jpg",
    "audio": "I know where he lives.",
    "tokens": [
      "I",
      "know",
      "where",
      "he",
      "lives"
    ],
    "sentence": "I know where he lives.",
    "zh": "我知道他住在哪里。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-oc-hero.jpg",
    "q": "What do you think _____ to solve the problem?",
    "opts": [
      "you can do",
      "can you do",
      "do you can"
    ],
    "ans": 0,
    "hint": "宾语从句用陈述语序 we can do。",
    "sentence": "What do you think we can do to solve the problem?",
    "zh": "你认为我们能做什么来解决这个问题？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-oc-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "What do you think _____ to solve the problem?",
        "opts": [
          "you can do",
          "can you do",
          "do you can"
        ],
        "ans": 0,
        "hint": "宾语从句用陈述语序 we can do。",
        "sentence": "What do you think we can do to solve the problem?",
        "zh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "q": "He said _____ he was tired.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述用 that（可省略）。",
        "sentence": "He said that he was tired.",
        "zh": "他说他累了。"
      },
      {
        "q": "I wonder _____ it will rain tomorrow.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 2,
        "hint": "是否 → if/whether。",
        "sentence": "I wonder if it will rain tomorrow.",
        "zh": "我想知道明天会不会下雨。"
      },
      {
        "q": "Do you know _____?",
        "opts": [
          "where is the library",
          "where the library is",
          "where the library"
        ],
        "ans": 1,
        "hint": "陈述语序：where the library is。",
        "sentence": "Do you know where the library is?",
        "zh": "你知道图书馆在哪吗？"
      },
      {
        "q": "She asked me _____ I liked Chengdu.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "一般疑问变从句用 if。",
        "sentence": "She asked me if I liked Chengdu.",
        "zh": "她问我喜不喜欢成都。"
      },
      {
        "q": "I believe _____ he _____ right.",
        "opts": [
          "that; is",
          "what; is",
          "that; are"
        ],
        "ans": 0,
        "hint": "that + he is。",
        "sentence": "I believe that he is right.",
        "zh": "我相信他是对的。"
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
        "q": "What do you think _____ to solve the problem?",
        "opts": [
          "you can do",
          "can you do",
          "do you can"
        ],
        "ans": 0,
        "hint": "宾语从句用陈述语序 we can do。",
        "sentence": "What do you think we can do to solve the problem?",
        "zh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "q": "He said _____ he was tired.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述用 that（可省略）。",
        "sentence": "He said that he was tired.",
        "zh": "他说他累了。"
      },
      {
        "q": "I wonder _____ it will rain tomorrow.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 2,
        "hint": "是否 → if/whether。",
        "sentence": "I wonder if it will rain tomorrow.",
        "zh": "我想知道明天会不会下雨。"
      },
      {
        "q": "Do you know _____?",
        "opts": [
          "where is the library",
          "where the library is",
          "where the library"
        ],
        "ans": 1,
        "hint": "陈述语序：where the library is。",
        "sentence": "Do you know where the library is?",
        "zh": "你知道图书馆在哪吗？"
      },
      {
        "q": "She asked me _____ I liked Chengdu.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "一般疑问变从句用 if。",
        "sentence": "She asked me if I liked Chengdu.",
        "zh": "她问我喜不喜欢成都。"
      },
      {
        "q": "I believe _____ he _____ right.",
        "opts": [
          "that; is",
          "what; is",
          "that; are"
        ],
        "ans": 0,
        "hint": "that + he is。",
        "sentence": "I believe that he is right.",
        "zh": "我相信他是对的。"
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
        "q": "What do you think _____ to solve the problem?",
        "opts": [
          "you can do",
          "can you do",
          "do you can"
        ],
        "ans": 0,
        "hint": "宾语从句用陈述语序 we can do。",
        "sentence": "What do you think we can do to solve the problem?",
        "zh": "你认为我们能做什么来解决这个问题？"
      },
      {
        "q": "He said _____ he was tired.",
        "opts": [
          "what",
          "that",
          "if"
        ],
        "ans": 1,
        "hint": "陈述用 that（可省略）。",
        "sentence": "He said that he was tired.",
        "zh": "他说他累了。"
      },
      {
        "q": "I wonder _____ it will rain tomorrow.",
        "opts": [
          "that",
          "what",
          "if"
        ],
        "ans": 2,
        "hint": "是否 → if/whether。",
        "sentence": "I wonder if it will rain tomorrow.",
        "zh": "我想知道明天会不会下雨。"
      },
      {
        "q": "Do you know _____?",
        "opts": [
          "where is the library",
          "where the library is",
          "where the library"
        ],
        "ans": 1,
        "hint": "陈述语序：where the library is。",
        "sentence": "Do you know where the library is?",
        "zh": "你知道图书馆在哪吗？"
      },
      {
        "q": "She asked me _____ I liked Chengdu.",
        "opts": [
          "that",
          "if",
          "what"
        ],
        "ans": 1,
        "hint": "一般疑问变从句用 if。",
        "sentence": "She asked me if I liked Chengdu.",
        "zh": "她问我喜不喜欢成都。"
      },
      {
        "q": "I believe _____ he _____ right.",
        "opts": [
          "that; is",
          "what; is",
          "that; are"
        ],
        "ans": 0,
        "hint": "that + he is。",
        "sentence": "I believe that he is right.",
        "zh": "我相信他是对的。"
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
    "image": "w3-oc-hero.jpg",
    "pairs": [
      {
        "en": "I know that…",
        "zh": "我知道……"
      },
      {
        "en": "I wonder if…",
        "zh": "我想知道是否……"
      },
      {
        "en": "where he lives",
        "zh": "他住在哪里（陈述语序）"
      },
      {
        "en": "what we can do",
        "zh": "我们能做什么"
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
    "image": "w3-oc-hero.jpg",
    "audio": "I know where he lives.",
    "opts": [
      "I know where he lives.",
      "I know where does he live.",
      "I know where is he live."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "I know where he lives.",
    "zh": "我知道他住在哪里。",
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
      "宾语从句：陈述语序",
      "What do you think + 主语 + 谓语",
      "易错：× can we do → ✓ we can do",
      "主句过去时，从句常要时态后退，初中再展开。"
    ],
    "chant": "Clause order — subject first! No do-does flip — avoid the worst!",
    "chantSpeak": "Clause order, subject first! No do does flip, avoid the worst!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "宾语从句 · 陈述语序",
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