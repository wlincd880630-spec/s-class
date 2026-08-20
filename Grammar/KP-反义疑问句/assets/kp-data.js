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
    "audio": "Let's play basketball, shall we?",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？",
    "image": "w5-tag-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-tag-hero.jpg",
    "question": "Let's 开头的反义疑问句用什么？",
    "choices": [
      {
        "text": "shall we（固定搭配）",
        "correct": true,
        "fb": "对了！Let's…, shall we?"
      },
      {
        "text": "will you",
        "correct": false,
        "fb": "Let's 不用 will you。"
      },
      {
        "text": "don't we",
        "correct": false,
        "fb": "Let's 是建议，用 shall we。"
      }
    ],
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-tag-hero.jpg",
    "lead": "前面肯定，后面否定；前面否定，后面肯定。",
    "formula": "陈述句，+ 简短问句？",
    "parts": [
      {
        "mark": "Let's",
        "label": "shall we?",
        "example": "Let's play, shall we?"
      },
      {
        "mark": "祈使句",
        "label": "will you?",
        "example": "Sit down, will you?"
      },
      {
        "mark": "一般",
        "label": "前肯后否",
        "example": "He is tall, isn't he?"
      }
    ],
    "samples": [
      {
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们去打篮球吧，好吗？"
      },
      {
        "sentence": "She likes English, doesn't she?",
        "zh": "她喜欢英语，不是吗？"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-tag-lets.jpg",
    "rightImage": "w5-tag-normal.jpg",
    "leftLabel": "Let's…, shall we?",
    "rightLabel": "He is tall, isn't he?",
    "leftSentence": "Let's go swimming, shall we?",
    "leftZh": "我们去游泳吧，好吗？",
    "rightSentence": "She likes music, doesn't she?",
    "rightZh": "她喜欢音乐，不是吗？",
    "morphBase": "Let's",
    "morphPast": "shall we",
    "morphHighlight": "",
    "discovery": "Let's 用 shall we；陈述句反义问：前肯后否，前否后肯，主语用代词。"
  },
  {
    "section": "精讲",
    "title": "例句 · shall we",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-tag-hero.jpg",
    "lead": "Let's 开头，反问一律 shall we。",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们去打篮球吧，好吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · doesn't she",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-tag-hero.jpg",
    "lead": "前肯 likes，后否 doesn't she。",
    "sentence": "She likes English, doesn't she?",
    "zh": "她喜欢英语，不是吗？",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-tag-hero.jpg",
    "lead": "反义疑问句两大类型。",
    "rules": [
      {
        "tab": "Let's",
        "rule": "Let's + 动词原形, shall we?",
        "focusVerb": "shall",
        "examples": [
          {
            "from": "Let's play",
            "to": "shall we?"
          }
        ],
        "sample": "Let's play basketball, shall we?",
        "sampleZh": "我们打篮球吧，好吗？"
      },
      {
        "tab": "陈述句",
        "rule": "前肯后否，前否后肯；动词/be/助动词与前面一致",
        "focusVerb": "isn't",
        "examples": [
          {
            "from": "He is tall",
            "to": "isn't he?"
          },
          {
            "from": "She doesn't like",
            "to": "does she?"
          }
        ],
        "sample": "She likes music, doesn't she?",
        "sampleZh": "她喜欢音乐，不是吗？"
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
    "image": "w5-tag-hero.jpg",
    "buckets": [
      {
        "key": "lets",
        "label": "Let's + shall we"
      },
      {
        "key": "stmt",
        "label": "陈述句反义问"
      }
    ],
    "items": [
      {
        "text": "Let's start, shall we?",
        "bucket": "lets"
      },
      {
        "text": "You are ready, aren't you?",
        "bucket": "stmt"
      },
      {
        "text": "Let's have lunch, shall we?",
        "bucket": "lets"
      },
      {
        "text": "He can't swim, can he?",
        "bucket": "stmt"
      },
      {
        "text": "Let's try again, shall we?",
        "bucket": "lets"
      },
      {
        "text": "They went home, didn't they?",
        "bucket": "stmt"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-tag-hero.jpg",
    "question": "「Let's go to the park, will you?」应改成？",
    "choices": [
      {
        "text": "shall we",
        "correct": true,
        "fb": "Let's 用 shall we，Let us 才常用 will you。"
      },
      {
        "text": "do we",
        "correct": false,
        "fb": "不是 do we。"
      },
      {
        "text": "won't you",
        "correct": false,
        "fb": "Let's 不用 won't you。"
      }
    ],
    "sentence": "Let's go to the park, shall we?",
    "zh": "我们去公园吧，好吗？",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-tag-hero.jpg",
    "lead": "给陈述句补反意疑问。",
    "items": [
      {
        "from": "You are a student.",
        "fromZh": "你是学生。",
        "steps": [
          {
            "label": "补反问",
            "opts": [
              "You are a student, aren't you?",
              "You are a student, are you?",
              "You are a student, don't you?"
            ],
            "ans": 0,
            "hint": "前肯 are → aren't you。",
            "sentence": "You are a student, aren't you?",
            "zh": "你是学生，对吧？"
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
    "image": "w5-tag-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Let's",
      "play",
      "basketball",
      "shall",
      "we"
    ],
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-tag-hero.jpg",
    "audio": "Let's play basketball, shall we?",
    "tokens": [
      "Let's",
      "play",
      "basketball",
      "shall",
      "we"
    ],
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-tag-hero.jpg",
    "q": "Let's go to the park, _____?",
    "opts": [
      "will you",
      "shall we",
      "do we"
    ],
    "ans": 1,
    "hint": "Let's 固定用 shall we。",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-tag-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "Let's go to the park, _____?",
        "opts": [
          "will you",
          "shall we",
          "do we"
        ],
        "ans": 1,
        "hint": "Let's 固定用 shall we。",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们打篮球吧，好吗？"
      },
      {
        "q": "He can swim, _____?",
        "opts": [
          "can he",
          "can't he",
          "doesn't he"
        ],
        "ans": 1,
        "hint": "前肯 can，后否 can't he。",
        "sentence": "He can swim, can't he?",
        "zh": "他会游泳，不是吗？"
      },
      {
        "q": "They don't like coffee, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否 don't，后肯 do they。",
        "sentence": "They don't like coffee, do they?",
        "zh": "他们不喜欢咖啡，是吗？"
      },
      {
        "q": "Open the door, _____?",
        "opts": [
          "shall we",
          "will you",
          "do you"
        ],
        "ans": 1,
        "hint": "祈使句 will you。",
        "sentence": "Open the door, will you?",
        "zh": "打开门，好吗？"
      },
      {
        "q": "There is a book, _____?",
        "opts": [
          "isn't there",
          "isn't it",
          "is there"
        ],
        "ans": 0,
        "hint": "There be 反问用 there。",
        "sentence": "There is a book, isn't there?",
        "zh": "有一本书，对吧？"
      },
      {
        "q": "Let's have a rest, _____?",
        "opts": [
          "will you",
          "shall we",
          "don't we"
        ],
        "ans": 1,
        "hint": "Let's → shall we。",
        "sentence": "Let's have a rest, shall we?",
        "zh": "我们休息一下吧，好吗？"
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
        "q": "Let's go to the park, _____?",
        "opts": [
          "will you",
          "shall we",
          "do we"
        ],
        "ans": 1,
        "hint": "Let's 固定用 shall we。",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们打篮球吧，好吗？"
      },
      {
        "q": "He can swim, _____?",
        "opts": [
          "can he",
          "can't he",
          "doesn't he"
        ],
        "ans": 1,
        "hint": "前肯 can，后否 can't he。",
        "sentence": "He can swim, can't he?",
        "zh": "他会游泳，不是吗？"
      },
      {
        "q": "They don't like coffee, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否 don't，后肯 do they。",
        "sentence": "They don't like coffee, do they?",
        "zh": "他们不喜欢咖啡，是吗？"
      },
      {
        "q": "Open the door, _____?",
        "opts": [
          "shall we",
          "will you",
          "do you"
        ],
        "ans": 1,
        "hint": "祈使句 will you。",
        "sentence": "Open the door, will you?",
        "zh": "打开门，好吗？"
      },
      {
        "q": "There is a book, _____?",
        "opts": [
          "isn't there",
          "isn't it",
          "is there"
        ],
        "ans": 0,
        "hint": "There be 反问用 there。",
        "sentence": "There is a book, isn't there?",
        "zh": "有一本书，对吧？"
      },
      {
        "q": "Let's have a rest, _____?",
        "opts": [
          "will you",
          "shall we",
          "don't we"
        ],
        "ans": 1,
        "hint": "Let's → shall we。",
        "sentence": "Let's have a rest, shall we?",
        "zh": "我们休息一下吧，好吗？"
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
        "q": "Let's go to the park, _____?",
        "opts": [
          "will you",
          "shall we",
          "do we"
        ],
        "ans": 1,
        "hint": "Let's 固定用 shall we。",
        "sentence": "Let's play basketball, shall we?",
        "zh": "我们打篮球吧，好吗？"
      },
      {
        "q": "He can swim, _____?",
        "opts": [
          "can he",
          "can't he",
          "doesn't he"
        ],
        "ans": 1,
        "hint": "前肯 can，后否 can't he。",
        "sentence": "He can swim, can't he?",
        "zh": "他会游泳，不是吗？"
      },
      {
        "q": "They don't like coffee, _____?",
        "opts": [
          "do they",
          "don't they",
          "are they"
        ],
        "ans": 0,
        "hint": "前否 don't，后肯 do they。",
        "sentence": "They don't like coffee, do they?",
        "zh": "他们不喜欢咖啡，是吗？"
      },
      {
        "q": "Open the door, _____?",
        "opts": [
          "shall we",
          "will you",
          "do you"
        ],
        "ans": 1,
        "hint": "祈使句 will you。",
        "sentence": "Open the door, will you?",
        "zh": "打开门，好吗？"
      },
      {
        "q": "There is a book, _____?",
        "opts": [
          "isn't there",
          "isn't it",
          "is there"
        ],
        "ans": 0,
        "hint": "There be 反问用 there。",
        "sentence": "There is a book, isn't there?",
        "zh": "有一本书，对吧？"
      },
      {
        "q": "Let's have a rest, _____?",
        "opts": [
          "will you",
          "shall we",
          "don't we"
        ],
        "ans": 1,
        "hint": "Let's → shall we。",
        "sentence": "Let's have a rest, shall we?",
        "zh": "我们休息一下吧，好吗？"
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
    "image": "w5-tag-hero.jpg",
    "pairs": [
      {
        "en": "shall we?",
        "zh": "好吗？（Let's）"
      },
      {
        "en": "will you?",
        "zh": "好吗？（祈使）"
      },
      {
        "en": "isn't he?",
        "zh": "不是吗？"
      },
      {
        "en": "do they?",
        "zh": "是吗？（前否后肯）"
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
    "image": "w5-tag-hero.jpg",
    "audio": "Let's play basketball, shall we?",
    "opts": [
      "Let's play basketball, shall we?",
      "Let's play basketball, will you?",
      "Let's play basketball, do we?"
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Let's play basketball, shall we?",
    "zh": "我们打篮球吧，好吗？",
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
      "Let's…, shall we?",
      "前肯后否；前否后肯",
      "反义部分主语用代词",
      "反问部分的主语要用代词，不用名词。"
    ],
    "chant": "Let's plus verb — shall we say? Affirmative first, then the other way!",
    "chantSpeak": "Let's plus verb, shall we say? Affirmative first, then the other way!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "反义疑问句 · shall we",
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