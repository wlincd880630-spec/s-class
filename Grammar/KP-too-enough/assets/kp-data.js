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
    "audio": "He is too young to go to school alone.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "He is too young to go to school alone.",
    "zh": "他太小了，不能独自上学。",
    "image": "l14-too-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l14-too-hero.jpg",
    "question": "too young to go 表示「能去」还是「不能去」？",
    "choices": [
      {
        "text": "太年轻而不能独自去（否定结果）",
        "correct": true,
        "fb": "对了！too…to = 太……而不能。"
      },
      {
        "text": "非常年轻所以能去",
        "correct": false,
        "fb": "too…to 表否定结果。"
      },
      {
        "text": "和 very young 完全一样",
        "correct": false,
        "fb": "too 带有「过分」含义。"
      }
    ],
    "sentence": "He is too young to go to school alone.",
    "zh": "他太小了，不能独自上学。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l14-too-hero.jpg",
    "lead": "too…to 表示「太……而不能」；enough to 表示「足够……可以」。",
    "formula": "too + 形 + to do　　adj + enough + to do",
    "parts": [
      {
        "mark": "too",
        "label": "太……（否定结果）",
        "example": "too young to go"
      },
      {
        "mark": "enough",
        "label": "足够（肯定结果）",
        "example": "old enough to go"
      }
    ],
    "samples": [
      {
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "sentence": "She is old enough to look after herself.",
        "zh": "她已经够大，可以照顾自己了。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l14-too.jpg",
    "rightImage": "l14-enough.jpg",
    "leftLabel": "too…to 不能",
    "rightLabel": "enough to 能",
    "leftSentence": "He is too young to go alone.",
    "leftZh": "他太小不能独自去。",
    "rightSentence": "He is old enough to ride a bike.",
    "rightZh": "他够大可以骑自行车了。",
    "morphBase": "too young",
    "morphPast": "old enough",
    "morphHighlight": "",
    "discovery": "too + adj + to do；adj + enough + to do。"
  },
  {
    "section": "精讲",
    "title": "例句 · too…to",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l14-too-hero.jpg",
    "lead": "too 在形容词前，to 后接原形。",
    "sentence": "The box is too heavy to carry.",
    "zh": "这个箱子太重了，搬不动。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · enough to",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l14-too-hero.jpg",
    "lead": "enough 放在形容词后面。",
    "sentence": "She is old enough to look after herself.",
    "zh": "她已经够大，可以照顾自己了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l14-too-hero.jpg",
    "rules": [
      {
        "tab": "too…to",
        "rule": "too + 形容词 + to do（太……而不能）",
        "focusVerb": "too",
        "examples": [
          {
            "from": "young",
            "to": "too young to go"
          }
        ],
        "sample": "He is too young to go to school alone.",
        "sampleZh": "他太小了，不能独自上学。"
      },
      {
        "tab": "enough to",
        "rule": "形容词 + enough + to do（足够……可以）",
        "focusVerb": "enough",
        "examples": [
          {
            "from": "old",
            "to": "old enough to ride"
          }
        ],
        "sample": "He is old enough to ride a bike.",
        "sampleZh": "他够大可以骑自行车了。"
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
    "image": "l14-too-hero.jpg",
    "buckets": [
      {
        "key": "too",
        "label": "too…to"
      },
      {
        "key": "enuf",
        "label": "enough to"
      }
    ],
    "items": [
      {
        "text": "too tired to walk",
        "bucket": "too"
      },
      {
        "text": "strong enough to carry",
        "bucket": "enuf"
      },
      {
        "text": "too noisy to study",
        "bucket": "too"
      },
      {
        "text": "old enough to help",
        "bucket": "enuf"
      },
      {
        "text": "too hot to play",
        "bucket": "too"
      },
      {
        "text": "tall enough to reach",
        "bucket": "enuf"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l14-too-hero.jpg",
    "question": "「He is enough old to go.」错在哪？",
    "choices": [
      {
        "text": "enough 应放在形容词后：old enough",
        "correct": true,
        "fb": "adj + enough，不是 enough + adj。"
      },
      {
        "text": "要用 too old",
        "correct": false,
        "fb": "enough 是「足够」，不是 too。"
      },
      {
        "text": "go 要改成 going",
        "correct": false,
        "fb": "to 后用原形。"
      }
    ],
    "sentence": "He is old enough to go.",
    "zh": "他够大了，可以去。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l14-too-hero.jpg",
    "lead": "too…to 常可与 not + adj + enough 转换。",
    "items": [
      {
        "from": "The boy is too short to reach the book.",
        "fromZh": "男孩太矮，够不着那本书。",
        "steps": [
          {
            "label": "改用 not + enough",
            "opts": [
              "The boy is not tall enough to reach the book.",
              "The boy is not too tall to reach the book.",
              "The boy is tall not enough to reach the book."
            ],
            "ans": 0,
            "hint": "too short = not tall enough。",
            "sentence": "The boy is not tall enough to reach the book.",
            "zh": "男孩不够高，够不着书。"
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
    "image": "l14-too-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "She",
      "is",
      "old",
      "enough",
      "to",
      "look",
      "after",
      "herself"
    ],
    "sentence": "She is old enough to look after herself.",
    "zh": "她够大可以照顾自己了。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l14-too-hero.jpg",
    "audio": "She is old enough to look after herself.",
    "tokens": [
      "She",
      "is",
      "old",
      "enough",
      "to",
      "look",
      "after",
      "herself"
    ],
    "sentence": "She is old enough to look after herself.",
    "zh": "她够大可以照顾自己了。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l14-too-hero.jpg",
    "q": "The box is _____ heavy _____ carry.",
    "opts": [
      "too; to",
      "enough; to",
      "to; too"
    ],
    "ans": 0,
    "hint": "too heavy to carry = 太重搬不动。",
    "sentence": "He is too young to go to school alone.",
    "zh": "他太小了，不能独自上学。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l14-too-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "The box is _____ heavy _____ carry.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "too heavy to carry = 太重搬不动。",
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "q": "The tea is _____ hot _____ drink.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "太烫而不能喝。",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "This room is big _____ for us to live in.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "形容词后 enough。",
        "sentence": "This room is big enough for us to live in.",
        "zh": "这房间够大，我们住得下。"
      },
      {
        "q": "She is _____ weak _____ carry the bag.",
        "opts": [
          "too; to",
          "so; that",
          "enough; to"
        ],
        "ans": 0,
        "hint": "太弱而不能搬。",
        "sentence": "She is too weak to carry the bag.",
        "zh": "她太弱，搬不动袋子。"
      },
      {
        "q": "He ran fast _____ to catch the bus.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "副词后 enough：fast enough。",
        "sentence": "He ran fast enough to catch the bus.",
        "zh": "他跑得够快，赶上了车。"
      },
      {
        "q": "The problem is _____ difficult for me to work out.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 0,
        "hint": "too + 形 + for sb + to do。",
        "sentence": "The problem is too difficult for me to work out.",
        "zh": "这题对我来说太难，做不出来。"
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
        "q": "The box is _____ heavy _____ carry.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "too heavy to carry = 太重搬不动。",
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "q": "The tea is _____ hot _____ drink.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "太烫而不能喝。",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "This room is big _____ for us to live in.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "形容词后 enough。",
        "sentence": "This room is big enough for us to live in.",
        "zh": "这房间够大，我们住得下。"
      },
      {
        "q": "She is _____ weak _____ carry the bag.",
        "opts": [
          "too; to",
          "so; that",
          "enough; to"
        ],
        "ans": 0,
        "hint": "太弱而不能搬。",
        "sentence": "She is too weak to carry the bag.",
        "zh": "她太弱，搬不动袋子。"
      },
      {
        "q": "He ran fast _____ to catch the bus.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "副词后 enough：fast enough。",
        "sentence": "He ran fast enough to catch the bus.",
        "zh": "他跑得够快，赶上了车。"
      },
      {
        "q": "The problem is _____ difficult for me to work out.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 0,
        "hint": "too + 形 + for sb + to do。",
        "sentence": "The problem is too difficult for me to work out.",
        "zh": "这题对我来说太难，做不出来。"
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
        "q": "The box is _____ heavy _____ carry.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "too heavy to carry = 太重搬不动。",
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "q": "The tea is _____ hot _____ drink.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "太烫而不能喝。",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "This room is big _____ for us to live in.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "形容词后 enough。",
        "sentence": "This room is big enough for us to live in.",
        "zh": "这房间够大，我们住得下。"
      },
      {
        "q": "She is _____ weak _____ carry the bag.",
        "opts": [
          "too; to",
          "so; that",
          "enough; to"
        ],
        "ans": 0,
        "hint": "太弱而不能搬。",
        "sentence": "She is too weak to carry the bag.",
        "zh": "她太弱，搬不动袋子。"
      },
      {
        "q": "He ran fast _____ to catch the bus.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "副词后 enough：fast enough。",
        "sentence": "He ran fast enough to catch the bus.",
        "zh": "他跑得够快，赶上了车。"
      },
      {
        "q": "The problem is _____ difficult for me to work out.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 0,
        "hint": "too + 形 + for sb + to do。",
        "sentence": "The problem is too difficult for me to work out.",
        "zh": "这题对我来说太难，做不出来。"
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
    "image": "l14-too-hero.jpg",
    "pairs": [
      {
        "en": "too young to",
        "zh": "太小而不能"
      },
      {
        "en": "old enough to",
        "zh": "足够大可以"
      },
      {
        "en": "too heavy to carry",
        "zh": "太重搬不动"
      },
      {
        "en": "fast enough",
        "zh": "足够快"
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
    "image": "l14-too-hero.jpg",
    "audio": "She is old enough to look after herself.",
    "opts": [
      "She is old enough to look after herself.",
      "He is too young that go to school alone.",
      "He is enough young to go to school alone."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "She is old enough to look after herself.",
    "zh": "她够大可以照顾自己了。",
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
      "too + adj + to do：太……而不能",
      "adj + enough + to do：足够……可以",
      "enough 放形容词后",
      "enough 修饰名词时放名词前：enough time；修饰形/副放后面。"
    ],
    "chant": "Too means more than OK! Enough to — you can play!",
    "chantSpeak": "Too means more than OK! Enough to, you can play!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "too…to / enough to",
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