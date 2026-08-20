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
    "audio": "Both my father and my mother are doctors.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。",
    "image": "w5-both-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-both-hero.jpg",
    "question": "Both A and B 后面动词用什么数？",
    "choices": [
      {
        "text": "复数（are）",
        "correct": true,
        "fb": "对了！both 表示两者都，动词用复数。"
      },
      {
        "text": "单数（is）",
        "correct": false,
        "fb": "both 强调两个，谓语用复数。"
      },
      {
        "text": "与 B 一致即可",
        "correct": false,
        "fb": "both…and 固定用复数谓语。"
      }
    ],
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-both-hero.jpg",
    "lead": "谈「两个」时选准连词，并注意动词单复数。",
    "formula": "both A and B（复数）　either A or B（就近）",
    "parts": [
      {
        "mark": "both…and",
        "label": "两者都",
        "example": "Both dad and mum are…"
      },
      {
        "mark": "either…or",
        "label": "要么A要么B",
        "example": "either tea or coffee"
      },
      {
        "mark": "neither…nor",
        "label": "两者都不",
        "example": "neither…nor…"
      }
    ],
    "samples": [
      {
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "sentence": "Either you or he is right.",
        "zh": "要么你对，要么他对。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-both-and.jpg",
    "rightImage": "w5-both-either.jpg",
    "leftLabel": "both…and 两者都",
    "rightLabel": "either…or 要么…要么",
    "leftSentence": "Both Tom and Jim are good at maths.",
    "leftZh": "汤姆和吉姆都擅长数学。",
    "rightSentence": "You can either stay or go.",
    "rightZh": "你可以留下，也可以走。",
    "morphBase": "both…and",
    "morphPast": "either…or",
    "morphHighlight": "",
    "discovery": "both…and 两者都，动词复数；either…or 二选一；neither…nor 两者都不。"
  },
  {
    "section": "精讲",
    "title": "例句 · both…and 复数",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-both-hero.jpg",
    "lead": "两个人作主语 → are。",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · either 就近",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-both-hero.jpg",
    "lead": "靠近动词的是 he → is。",
    "sentence": "Either you or he is right.",
    "zh": "要么你对，要么他对。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-both-hero.jpg",
    "lead": "三组关联连词。",
    "rules": [
      {
        "tab": "both…and",
        "rule": "两者都；谓语动词用复数",
        "focusVerb": "both",
        "examples": [
          {
            "from": "father and mother",
            "to": "Both are doctors"
          }
        ],
        "sample": "Both my father and my mother are doctors.",
        "sampleZh": "我爸爸和妈妈都是医生。"
      },
      {
        "tab": "either…or",
        "rule": "要么…要么（二选一）；就近原则",
        "focusVerb": "either",
        "examples": [
          {
            "from": "stay or go",
            "to": "either…or"
          },
          {
            "from": "neither…nor",
            "to": "两者都不"
          }
        ],
        "sample": "You can either stay or go.",
        "sampleZh": "你可以留下，也可以走。"
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
    "image": "w5-both-hero.jpg",
    "buckets": [
      {
        "key": "both",
        "label": "both…and"
      },
      {
        "key": "either",
        "label": "either…or / neither…nor"
      }
    ],
    "items": [
      {
        "text": "Both A and B are here.",
        "bucket": "both"
      },
      {
        "text": "Either tea or coffee",
        "bucket": "either"
      },
      {
        "text": "Both cats and dogs",
        "bucket": "both"
      },
      {
        "text": "Either you or I am wrong.",
        "bucket": "either"
      },
      {
        "text": "Both hands are clean.",
        "bucket": "both"
      },
      {
        "text": "Neither Tom nor Jim came.",
        "bucket": "either"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-both-hero.jpg",
    "question": "「Both my brother and my sister is good at swimming.」应改成？",
    "choices": [
      {
        "text": "are（both…and 后动词用复数）",
        "correct": true,
        "fb": "两者都 → 复数。"
      },
      {
        "text": "am",
        "correct": false,
        "fb": "主语不是 I。"
      },
      {
        "text": "be",
        "correct": false,
        "fb": "陈述句用 are。"
      }
    ],
    "sentence": "Both my brother and my sister are good at swimming.",
    "zh": "我哥哥和姐姐都擅长游泳。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-both-hero.jpg",
    "lead": "both 句改成 neither 否定。",
    "items": [
      {
        "from": "Both Tom and Jack like football.",
        "fromZh": "汤姆和杰克都喜欢足球。",
        "steps": [
          {
            "label": "改成两者都不喜欢",
            "opts": [
              "Neither Tom nor Jack likes football.",
              "Both Tom and Jack don't likes football.",
              "Neither Tom or Jack like football."
            ],
            "ans": 0,
            "hint": "neither…nor + 就近 likes。",
            "sentence": "Neither Tom nor Jack likes football.",
            "zh": "汤姆和杰克都不喜欢足球。"
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
    "image": "w5-both-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Both",
      "my",
      "father",
      "and",
      "my",
      "mother",
      "are",
      "doctors"
    ],
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-both-hero.jpg",
    "audio": "Both my father and my mother are doctors.",
    "tokens": [
      "Both",
      "my",
      "father",
      "and",
      "my",
      "mother",
      "are",
      "doctors"
    ],
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-both-hero.jpg",
    "q": "Both my brother and my sister _____ good at swimming.",
    "opts": [
      "is",
      "are",
      "am"
    ],
    "ans": 1,
    "hint": "both…and 后动词用复数 are。",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-both-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "Both my brother and my sister _____ good at swimming.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "both…and 后动词用复数 are。",
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "q": "You can take _____ the red bag _____ the blue one. They're both OK.",
        "opts": [
          "either; or",
          "both; or",
          "neither; and"
        ],
        "ans": 0,
        "hint": "二选一 either…or。",
        "sentence": "You can take either the red bag or the blue one.",
        "zh": "红包蓝包都可以选一个。"
      },
      {
        "q": "_____ Lily _____ Lucy has been to Beijing. （两人都不）",
        "opts": [
          "Both; and",
          "Either; or",
          "Neither; nor"
        ],
        "ans": 2,
        "hint": "neither…nor。",
        "sentence": "Neither Lily nor Lucy has been to Beijing.",
        "zh": "莉莉和露西都没去过北京。"
      },
      {
        "q": "Both of the answers _____ correct.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both of + 复数 are。",
        "sentence": "Both of the answers are correct.",
        "zh": "两个答案都对。"
      },
      {
        "q": "Either the students or the teacher _____ going to speak.",
        "opts": [
          "are",
          "is",
          "be"
        ],
        "ans": 1,
        "hint": "就近 teacher → is。",
        "sentence": "Either the students or the teacher is going to speak.",
        "zh": "要么学生说，要么老师说。"
      },
      {
        "q": "She can _____ sing _____ dance. She is talented.",
        "opts": [
          "either; or",
          "both; and",
          "neither; nor"
        ],
        "ans": 1,
        "hint": "两者都会 both…and。",
        "sentence": "She can both sing and dance.",
        "zh": "她既会唱歌又会跳舞。"
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
        "q": "Both my brother and my sister _____ good at swimming.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "both…and 后动词用复数 are。",
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "q": "You can take _____ the red bag _____ the blue one. They're both OK.",
        "opts": [
          "either; or",
          "both; or",
          "neither; and"
        ],
        "ans": 0,
        "hint": "二选一 either…or。",
        "sentence": "You can take either the red bag or the blue one.",
        "zh": "红包蓝包都可以选一个。"
      },
      {
        "q": "_____ Lily _____ Lucy has been to Beijing. （两人都不）",
        "opts": [
          "Both; and",
          "Either; or",
          "Neither; nor"
        ],
        "ans": 2,
        "hint": "neither…nor。",
        "sentence": "Neither Lily nor Lucy has been to Beijing.",
        "zh": "莉莉和露西都没去过北京。"
      },
      {
        "q": "Both of the answers _____ correct.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both of + 复数 are。",
        "sentence": "Both of the answers are correct.",
        "zh": "两个答案都对。"
      },
      {
        "q": "Either the students or the teacher _____ going to speak.",
        "opts": [
          "are",
          "is",
          "be"
        ],
        "ans": 1,
        "hint": "就近 teacher → is。",
        "sentence": "Either the students or the teacher is going to speak.",
        "zh": "要么学生说，要么老师说。"
      },
      {
        "q": "She can _____ sing _____ dance. She is talented.",
        "opts": [
          "either; or",
          "both; and",
          "neither; nor"
        ],
        "ans": 1,
        "hint": "两者都会 both…and。",
        "sentence": "She can both sing and dance.",
        "zh": "她既会唱歌又会跳舞。"
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
        "q": "Both my brother and my sister _____ good at swimming.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "both…and 后动词用复数 are。",
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "q": "You can take _____ the red bag _____ the blue one. They're both OK.",
        "opts": [
          "either; or",
          "both; or",
          "neither; and"
        ],
        "ans": 0,
        "hint": "二选一 either…or。",
        "sentence": "You can take either the red bag or the blue one.",
        "zh": "红包蓝包都可以选一个。"
      },
      {
        "q": "_____ Lily _____ Lucy has been to Beijing. （两人都不）",
        "opts": [
          "Both; and",
          "Either; or",
          "Neither; nor"
        ],
        "ans": 2,
        "hint": "neither…nor。",
        "sentence": "Neither Lily nor Lucy has been to Beijing.",
        "zh": "莉莉和露西都没去过北京。"
      },
      {
        "q": "Both of the answers _____ correct.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both of + 复数 are。",
        "sentence": "Both of the answers are correct.",
        "zh": "两个答案都对。"
      },
      {
        "q": "Either the students or the teacher _____ going to speak.",
        "opts": [
          "are",
          "is",
          "be"
        ],
        "ans": 1,
        "hint": "就近 teacher → is。",
        "sentence": "Either the students or the teacher is going to speak.",
        "zh": "要么学生说，要么老师说。"
      },
      {
        "q": "She can _____ sing _____ dance. She is talented.",
        "opts": [
          "either; or",
          "both; and",
          "neither; nor"
        ],
        "ans": 1,
        "hint": "两者都会 both…and。",
        "sentence": "She can both sing and dance.",
        "zh": "她既会唱歌又会跳舞。"
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
    "image": "w5-both-hero.jpg",
    "pairs": [
      {
        "en": "both…and",
        "zh": "两者都"
      },
      {
        "en": "either…or",
        "zh": "要么……要么"
      },
      {
        "en": "neither…nor",
        "zh": "既不……也不"
      },
      {
        "en": "就近原则",
        "zh": "靠近动词的名词决定单复数"
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
    "image": "w5-both-hero.jpg",
    "audio": "Both my father and my mother are doctors.",
    "opts": [
      "Both my father and my mother are doctors.",
      "Both my father and my mother is doctors.",
      "Both my father or my mother are doctors."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。",
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
      "both…and 两者都，动词复数",
      "either…or 二选一",
      "neither…nor 两者都不",
      "neither…nor 也遵循就近原则。"
    ],
    "chant": "Both and both — plural verb! Either or — choose one, you heard!",
    "chantSpeak": "Both and both, plural verb! Either or, choose one, you heard!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "both…and / either…or",
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