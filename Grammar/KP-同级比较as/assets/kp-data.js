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
    "audio": "Tom is as tall as his brother.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。",
    "image": "w4-asas-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-asas-hero.jpg",
    "question": "as tall as 表示什么关系？",
    "choices": [
      {
        "text": "同级比较（一样高）",
        "correct": true,
        "fb": "对了！as + 原级 + as。"
      },
      {
        "text": "汤姆更高",
        "correct": false,
        "fb": "更高用 taller than。"
      },
      {
        "text": "汤姆更矮",
        "correct": false,
        "fb": "更矮用 shorter than。"
      }
    ],
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-asas-hero.jpg",
    "lead": "两者程度相同：as + 原级 + as。",
    "formula": "A is as + 原级 + as B",
    "parts": [
      {
        "mark": "as",
        "label": "第一个 as",
        "example": "as"
      },
      {
        "mark": "原级",
        "label": "不用 -er",
        "example": "tall"
      },
      {
        "mark": "as",
        "label": "第二个 as",
        "example": "as his brother"
      }
    ],
    "samples": [
      {
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "sentence": "This book is not as interesting as that one.",
        "zh": "这本书不如那本有趣。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-asas-same.jpg",
    "rightImage": "w4-asas-than.jpg",
    "leftLabel": "as tall as",
    "rightLabel": "taller than",
    "leftSentence": "Tom is as tall as Jim.",
    "leftZh": "汤姆和吉姆一样高。",
    "rightSentence": "Tom is taller than Jim.",
    "rightZh": "汤姆比吉姆高。",
    "morphBase": "as tall as",
    "morphPast": "taller than",
    "morphHighlight": "",
    "discovery": "as…as 同级；than 比较级；not as…as = 不如。"
  },
  {
    "section": "精讲",
    "title": "例句 · 一样高",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-asas-hero.jpg",
    "lead": "tall 保持原级，不加 -er。",
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 不如",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-asas-hero.jpg",
    "lead": "not as…as = 不如。",
    "sentence": "This story is not as long as that one.",
    "zh": "这个故事不如那个长。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-asas-hero.jpg",
    "lead": "同级 vs 比较级。",
    "rules": [
      {
        "tab": "as…as",
        "rule": "as + 形容词/副词原级 + as（一样）",
        "focusVerb": "as",
        "examples": [
          {
            "from": "tall",
            "to": "as tall as"
          }
        ],
        "sample": "Tom is as tall as his brother.",
        "sampleZh": "汤姆和他哥哥一样高。"
      },
      {
        "tab": "not as…as",
        "rule": "not as…as = 不如……",
        "focusVerb": "not",
        "examples": [
          {
            "from": "not as fast",
            "to": "不如快"
          }
        ],
        "sample": "She is not as tall as me.",
        "sampleZh": "她不如我高。"
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
    "image": "w4-asas-hero.jpg",
    "buckets": [
      {
        "key": "as",
        "label": "as…as 同级"
      },
      {
        "key": "than",
        "label": "比较级 + than"
      }
    ],
    "items": [
      {
        "text": "as fast as",
        "bucket": "as"
      },
      {
        "text": "faster than",
        "bucket": "than"
      },
      {
        "text": "not as big as",
        "bucket": "as"
      },
      {
        "text": "bigger than",
        "bucket": "than"
      },
      {
        "text": "as carefully as",
        "bucket": "as"
      },
      {
        "text": "more carefully than",
        "bucket": "than"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-asas-hero.jpg",
    "question": "「He is as taller as me.」应改成？",
    "choices": [
      {
        "text": "as tall as（中间用原级）",
        "correct": true,
        "fb": "as…as 夹原级。"
      },
      {
        "text": "taller as",
        "correct": false,
        "fb": "比较级配 than，不配 as。"
      },
      {
        "text": "as more tall as",
        "correct": false,
        "fb": "更错。"
      }
    ],
    "sentence": "He is as tall as me.",
    "zh": "他和我一样高。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-asas-hero.jpg",
    "lead": "比较级句改成 not as…as。",
    "items": [
      {
        "from": "Jack is taller than Tom.",
        "fromZh": "杰克比汤姆高。",
        "steps": [
          {
            "label": "改成：汤姆不如杰克高",
            "opts": [
              "Tom is not as tall as Jack.",
              "Tom is not as taller as Jack.",
              "Tom is not taller as Jack."
            ],
            "ans": 0,
            "hint": "not as + 原级 + as。",
            "sentence": "Tom is not as tall as Jack.",
            "zh": "汤姆不如杰克高。"
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
    "image": "w4-asas-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Tom",
      "is",
      "as",
      "tall",
      "as",
      "his",
      "brother"
    ],
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-asas-hero.jpg",
    "audio": "Tom is as tall as his brother.",
    "tokens": [
      "Tom",
      "is",
      "as",
      "tall",
      "as",
      "his",
      "brother"
    ],
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-asas-hero.jpg",
    "q": "My brother is _____ me.",
    "opts": [
      "as tall as",
      "taller as",
      "as taller as"
    ],
    "ans": 0,
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-asas-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "My brother is _____ me.",
        "opts": [
          "as tall as",
          "taller as",
          "as taller as"
        ],
        "ans": 0,
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "q": "She runs _____ fast _____ Lily.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as fast as。",
        "sentence": "She runs as fast as Lily.",
        "zh": "她跑得和莉莉一样快。"
      },
      {
        "q": "This bag is not _____ expensive _____ that one.",
        "opts": [
          "as; as",
          "so; so",
          "more; as"
        ],
        "ans": 0,
        "hint": "not as…as。",
        "sentence": "This bag is not as expensive as that one.",
        "zh": "这个包不如那个贵。"
      },
      {
        "q": "Math is _____ interesting as PE. （否定）",
        "opts": [
          "as",
          "not as",
          "more as"
        ],
        "ans": 1,
        "hint": "not as interesting as。",
        "sentence": "Math is not as interesting as PE.",
        "zh": "数学不如体育有趣。"
      },
      {
        "q": "He has _____ many books _____ I do.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as many + 复数 + as。",
        "sentence": "He has as many books as I do.",
        "zh": "他的书和我的一样多。"
      },
      {
        "q": "Please come _____ possible.",
        "opts": [
          "as soon as",
          "as soon than",
          "so soon as"
        ],
        "ans": 0,
        "hint": "as soon as possible。",
        "sentence": "Please come as soon as possible.",
        "zh": "请尽快来。"
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
        "q": "My brother is _____ me.",
        "opts": [
          "as tall as",
          "taller as",
          "as taller as"
        ],
        "ans": 0,
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "q": "She runs _____ fast _____ Lily.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as fast as。",
        "sentence": "She runs as fast as Lily.",
        "zh": "她跑得和莉莉一样快。"
      },
      {
        "q": "This bag is not _____ expensive _____ that one.",
        "opts": [
          "as; as",
          "so; so",
          "more; as"
        ],
        "ans": 0,
        "hint": "not as…as。",
        "sentence": "This bag is not as expensive as that one.",
        "zh": "这个包不如那个贵。"
      },
      {
        "q": "Math is _____ interesting as PE. （否定）",
        "opts": [
          "as",
          "not as",
          "more as"
        ],
        "ans": 1,
        "hint": "not as interesting as。",
        "sentence": "Math is not as interesting as PE.",
        "zh": "数学不如体育有趣。"
      },
      {
        "q": "He has _____ many books _____ I do.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as many + 复数 + as。",
        "sentence": "He has as many books as I do.",
        "zh": "他的书和我的一样多。"
      },
      {
        "q": "Please come _____ possible.",
        "opts": [
          "as soon as",
          "as soon than",
          "so soon as"
        ],
        "ans": 0,
        "hint": "as soon as possible。",
        "sentence": "Please come as soon as possible.",
        "zh": "请尽快来。"
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
        "q": "My brother is _____ me.",
        "opts": [
          "as tall as",
          "taller as",
          "as taller as"
        ],
        "ans": 0,
        "sentence": "Tom is as tall as his brother.",
        "zh": "汤姆和他哥哥一样高。"
      },
      {
        "q": "She runs _____ fast _____ Lily.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as fast as。",
        "sentence": "She runs as fast as Lily.",
        "zh": "她跑得和莉莉一样快。"
      },
      {
        "q": "This bag is not _____ expensive _____ that one.",
        "opts": [
          "as; as",
          "so; so",
          "more; as"
        ],
        "ans": 0,
        "hint": "not as…as。",
        "sentence": "This bag is not as expensive as that one.",
        "zh": "这个包不如那个贵。"
      },
      {
        "q": "Math is _____ interesting as PE. （否定）",
        "opts": [
          "as",
          "not as",
          "more as"
        ],
        "ans": 1,
        "hint": "not as interesting as。",
        "sentence": "Math is not as interesting as PE.",
        "zh": "数学不如体育有趣。"
      },
      {
        "q": "He has _____ many books _____ I do.",
        "opts": [
          "as; as",
          "so; than",
          "as; than"
        ],
        "ans": 0,
        "hint": "as many + 复数 + as。",
        "sentence": "He has as many books as I do.",
        "zh": "他的书和我的一样多。"
      },
      {
        "q": "Please come _____ possible.",
        "opts": [
          "as soon as",
          "as soon than",
          "so soon as"
        ],
        "ans": 0,
        "hint": "as soon as possible。",
        "sentence": "Please come as soon as possible.",
        "zh": "请尽快来。"
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
    "image": "w4-asas-hero.jpg",
    "pairs": [
      {
        "en": "as tall as",
        "zh": "和……一样高"
      },
      {
        "en": "not as…as",
        "zh": "不如"
      },
      {
        "en": "as soon as possible",
        "zh": "尽快"
      },
      {
        "en": "as many as",
        "zh": "和……一样多"
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
    "image": "w4-asas-hero.jpg",
    "audio": "Tom is as tall as his brother.",
    "opts": [
      "Tom is as tall as his brother.",
      "Tom is as taller as his brother.",
      "Tom is taller as his brother."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Tom is as tall as his brother.",
    "zh": "汤姆和他哥哥一样高。",
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
      "as + 原级 + as",
      "not as…as = 不如",
      "比较级用 than，不用 as…as",
      "as…as 中间是原级；than 前面才是比较级。"
    ],
    "chant": "As plus原级 plus as — same degree! Not as…as — less, you see!",
    "chantSpeak": "As plus原级 plus as, same degree! Not as as, less, you see!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "同级比较 as…as",
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