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
    "audio": "The boy who lives next door is my friend.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。",
    "image": "w5-rel-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-rel-hero.jpg",
    "question": "who lives next door 修饰的是谁？",
    "choices": [
      {
        "text": "the boy（指人，用 who）",
        "correct": true,
        "fb": "对了！who 引导定语从句修饰人。"
      },
      {
        "text": "next door（指地点）",
        "correct": false,
        "fb": "next door 是地点状语，不是先行词。"
      },
      {
        "text": "friend（用 which）",
        "correct": false,
        "fb": "先行词是 boy，指人用 who。"
      }
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-rel-hero.jpg",
    "lead": "定语从句用来修饰前面的名词（先行词）。",
    "formula": "名词 + who/which/that + 从句",
    "parts": [
      {
        "mark": "who",
        "label": "指人",
        "example": "the boy who…"
      },
      {
        "mark": "which",
        "label": "指物",
        "example": "the book which…"
      },
      {
        "mark": "that",
        "label": "人/物常可",
        "example": "the girl that…"
      }
    ],
    "samples": [
      {
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的男孩是我的朋友。"
      },
      {
        "sentence": "I like the book that you gave me.",
        "zh": "我喜欢你给我的那本书。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-rel-who.jpg",
    "rightImage": "w5-rel-which.jpg",
    "leftLabel": "who 指人",
    "rightLabel": "which/that 指物",
    "leftSentence": "The girl who sings well is my sister.",
    "leftZh": "唱歌好的那个女孩是我姐姐。",
    "rightSentence": "The book which is on the desk is mine.",
    "rightZh": "桌上那本书是我的。",
    "morphBase": "who",
    "morphPast": "which",
    "morphHighlight": "",
    "discovery": "who 指人；which/that 指物；定语从句紧跟先行词，说明是哪一个。"
  },
  {
    "section": "精讲",
    "title": "例句 · who 指人",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-rel-hero.jpg",
    "lead": "the boy 是人 → who。",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的男孩是我的朋友。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · which 指物",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-rel-hero.jpg",
    "lead": "the story 是物 → which/that。",
    "sentence": "This is the story which we read yesterday.",
    "zh": "这就是我们昨天读的故事。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-rel-hero.jpg",
    "lead": "关系代词 who / which / that。",
    "rules": [
      {
        "tab": "who",
        "rule": "先行词是人 → who + 从句",
        "focusVerb": "who",
        "examples": [
          {
            "from": "the boy",
            "to": "who lives next door"
          }
        ],
        "sample": "The boy who lives next door is my friend.",
        "sampleZh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "tab": "which/that",
        "rule": "先行词是物 → which 或 that + 从句",
        "focusVerb": "which",
        "examples": [
          {
            "from": "the book",
            "to": "which is on the desk"
          }
        ],
        "sample": "The book which is on the desk is mine.",
        "sampleZh": "桌上那本书是我的。"
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
    "image": "w5-rel-hero.jpg",
    "buckets": [
      {
        "key": "who",
        "label": "who 指人"
      },
      {
        "key": "which",
        "label": "which/that 指物"
      }
    ],
    "items": [
      {
        "text": "The man who teaches us",
        "bucket": "who"
      },
      {
        "text": "The dog which is cute",
        "bucket": "which"
      },
      {
        "text": "The student who runs fast",
        "bucket": "who"
      },
      {
        "text": "The film that we watched",
        "bucket": "which"
      },
      {
        "text": "The teacher who is kind",
        "bucket": "who"
      },
      {
        "text": "The bag that is red",
        "bucket": "which"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-rel-hero.jpg",
    "question": "「The girl which won the race is from our class.」应改成？",
    "choices": [
      {
        "text": "who（人不用 which）",
        "correct": true,
        "fb": "指人用 who/that，不用 which。"
      },
      {
        "text": "where",
        "correct": false,
        "fb": "where 指地点。"
      },
      {
        "text": "what",
        "correct": false,
        "fb": "定语从句不用 what 引导。"
      }
    ],
    "sentence": "The girl who won the race is from our class.",
    "zh": "赢得比赛的女孩是我们班的。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-rel-hero.jpg",
    "lead": "把两句合成定语从句。",
    "items": [
      {
        "from": "I have a friend. He can swim well.",
        "fromZh": "我有一个朋友。他游泳很好。",
        "steps": [
          {
            "label": "合成一句",
            "opts": [
              "I have a friend who can swim well.",
              "I have a friend which can swim well.",
              "I have a friend he can swim well."
            ],
            "ans": 0,
            "hint": "friend 是人 → who。",
            "sentence": "I have a friend who can swim well.",
            "zh": "我有一个游泳很好的朋友。"
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
    "image": "w5-rel-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "The",
      "boy",
      "who",
      "lives",
      "next",
      "door",
      "is",
      "my",
      "friend"
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-rel-hero.jpg",
    "audio": "The boy who lives next door is my friend.",
    "tokens": [
      "The",
      "boy",
      "who",
      "lives",
      "next",
      "door",
      "is",
      "my",
      "friend"
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-rel-hero.jpg",
    "q": "The girl _____ won the race is from our class.",
    "opts": [
      "which",
      "who",
      "what"
    ],
    "ans": 1,
    "hint": "先行词 the girl 指人，用 who。",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-rel-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "The girl _____ won the race is from our class.",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "先行词 the girl 指人，用 who。",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "q": "The book _____ is on the desk is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "book 指物 which/that。",
        "sentence": "The book which is on the desk is mine.",
        "zh": "桌上那本书是我的。"
      },
      {
        "q": "Do you know the man _____ is talking to Miss Li?",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "man 指人 who。",
        "sentence": "Do you know the man who is talking to Miss Li?",
        "zh": "你认识正在和李老师说话的那个人吗？"
      },
      {
        "q": "This is the school _____ I study.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 2,
        "hint": "school 地点，从句缺地点状语 → where。",
        "sentence": "This is the school where I study.",
        "zh": "这是我上学的学校。"
      },
      {
        "q": "I lost the pen _____ I bought yesterday.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "pen 指物 that/which。",
        "sentence": "I lost the pen that I bought yesterday.",
        "zh": "我把昨天买的笔弄丢了。"
      },
      {
        "q": "The students _____ are from Chengdu can speak Sichuan dialect.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "students 指人 who。",
        "sentence": "The students who are from Chengdu can speak Sichuan dialect.",
        "zh": "来自成都的学生会说四川话。"
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
        "q": "The girl _____ won the race is from our class.",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "先行词 the girl 指人，用 who。",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "q": "The book _____ is on the desk is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "book 指物 which/that。",
        "sentence": "The book which is on the desk is mine.",
        "zh": "桌上那本书是我的。"
      },
      {
        "q": "Do you know the man _____ is talking to Miss Li?",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "man 指人 who。",
        "sentence": "Do you know the man who is talking to Miss Li?",
        "zh": "你认识正在和李老师说话的那个人吗？"
      },
      {
        "q": "This is the school _____ I study.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 2,
        "hint": "school 地点，从句缺地点状语 → where。",
        "sentence": "This is the school where I study.",
        "zh": "这是我上学的学校。"
      },
      {
        "q": "I lost the pen _____ I bought yesterday.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "pen 指物 that/which。",
        "sentence": "I lost the pen that I bought yesterday.",
        "zh": "我把昨天买的笔弄丢了。"
      },
      {
        "q": "The students _____ are from Chengdu can speak Sichuan dialect.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "students 指人 who。",
        "sentence": "The students who are from Chengdu can speak Sichuan dialect.",
        "zh": "来自成都的学生会说四川话。"
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
        "q": "The girl _____ won the race is from our class.",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "先行词 the girl 指人，用 who。",
        "sentence": "The boy who lives next door is my friend.",
        "zh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "q": "The book _____ is on the desk is mine.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 1,
        "hint": "book 指物 which/that。",
        "sentence": "The book which is on the desk is mine.",
        "zh": "桌上那本书是我的。"
      },
      {
        "q": "Do you know the man _____ is talking to Miss Li?",
        "opts": [
          "which",
          "who",
          "what"
        ],
        "ans": 1,
        "hint": "man 指人 who。",
        "sentence": "Do you know the man who is talking to Miss Li?",
        "zh": "你认识正在和李老师说话的那个人吗？"
      },
      {
        "q": "This is the school _____ I study.",
        "opts": [
          "who",
          "which",
          "where"
        ],
        "ans": 2,
        "hint": "school 地点，从句缺地点状语 → where。",
        "sentence": "This is the school where I study.",
        "zh": "这是我上学的学校。"
      },
      {
        "q": "I lost the pen _____ I bought yesterday.",
        "opts": [
          "who",
          "that",
          "where"
        ],
        "ans": 1,
        "hint": "pen 指物 that/which。",
        "sentence": "I lost the pen that I bought yesterday.",
        "zh": "我把昨天买的笔弄丢了。"
      },
      {
        "q": "The students _____ are from Chengdu can speak Sichuan dialect.",
        "opts": [
          "which",
          "who",
          "where"
        ],
        "ans": 1,
        "hint": "students 指人 who。",
        "sentence": "The students who are from Chengdu can speak Sichuan dialect.",
        "zh": "来自成都的学生会说四川话。"
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
    "image": "w5-rel-hero.jpg",
    "pairs": [
      {
        "en": "who",
        "zh": "指人"
      },
      {
        "en": "which",
        "zh": "指物"
      },
      {
        "en": "that",
        "zh": "人/物"
      },
      {
        "en": "where",
        "zh": "指地点"
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
    "image": "w5-rel-hero.jpg",
    "audio": "The boy who lives next door is my friend.",
    "opts": [
      "The boy who lives next door is my friend.",
      "The boy which lives next door is my friend.",
      "The boy lives next door who is my friend."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。",
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
      "who 修饰人",
      "which/that 修饰物",
      "定语从句紧跟先行词",
      "关系词要紧跟先行词，不要把从句放太远。"
    ],
    "chant": "Who for people, which for things — that's the link that grammar brings!",
    "chantSpeak": "Who for people, which for things, that is the link that grammar brings!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "定语从句 · who / which / that",
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