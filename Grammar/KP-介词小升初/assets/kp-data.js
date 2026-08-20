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
    "audio": "We have English class on Monday morning.",
    "soundHint": "Monday morning 前面用哪个介词？",
    "question": "这是在说时间还是地点？",
    "sentence": "We have English class on Monday morning.",
    "zh": "我们周一上午有英语课。",
    "image": "w4-prep-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-prep-hero.jpg",
    "question": "「on Monday morning」为什么用 on？",
    "choices": [
      {
        "text": "具体某天/某天的上午用 on",
        "correct": true,
        "fb": "对了！on Monday, on Monday morning。"
      },
      {
        "text": "所有时间都用 in",
        "correct": false,
        "fb": "in 用于月/年/季节/一天中的时段（in the morning）。"
      },
      {
        "text": "时刻用 on",
        "correct": false,
        "fb": "具体时刻用 at，如 at 8 o'clock。"
      }
    ],
    "sentence": "We have English class on Monday morning.",
    "zh": "我们周一上午有英语课。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-prep-hero.jpg",
    "lead": "时间：at 时刻，on 日期/星期，in 月/年/上午等较长时段。",
    "formula": "at 7:00　on Monday　in July / in the morning",
    "parts": [
      {
        "mark": "at",
        "label": "点钟、夜晚、中午",
        "example": "at six / at night"
      },
      {
        "mark": "on",
        "label": "日、星期、具体某一天的早",
        "example": "on Monday morning"
      },
      {
        "mark": "in",
        "label": "月、年、季节、上午",
        "example": "in 2026 / in the morning"
      }
    ],
    "samples": [
      {
        "sentence": "We have English class on Monday morning.",
        "zh": "我们星期一上午有英语课。"
      },
      {
        "sentence": "Don't read in the sun. It's bad for your eyes.",
        "zh": "不要在阳光下看书，对眼睛不好。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-prep-time.jpg",
    "rightImage": "w4-prep-place.jpg",
    "leftLabel": "时间 · on Monday",
    "rightLabel": "地点 · at school",
    "leftSentence": "We have a test on Friday.",
    "leftZh": "我们周五有测验。",
    "rightSentence": "Tom is at school now.",
    "rightZh": "汤姆现在在学校。",
    "morphBase": "Monday",
    "morphPast": "on Monday",
    "morphHighlight": "on",
    "discovery": "时间：at 时刻，on 日期，in 月/年/季节；地点：at 小地点，in 大地点/里面，on 表面。"
  },
  {
    "section": "精讲",
    "title": "例句 · on Monday morning",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-prep-hero.jpg",
    "lead": "具体到星期几的上午用 on。",
    "sentence": "We have English class on Monday morning.",
    "zh": "我们星期一上午有英语课。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · in the sun",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-prep-hero.jpg",
    "lead": "固定搭配 in the sun。",
    "sentence": "Don't read in the sun.",
    "zh": "不要在阳光下看书。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-prep-hero.jpg",
    "lead": "小升初高频介词。",
    "rules": [
      {
        "tab": "时间",
        "rule": "at 时刻；on 日期/星期；in 月/年/季节",
        "focusVerb": "on",
        "examples": [
          {
            "from": "Monday",
            "to": "on Monday"
          },
          {
            "from": "July",
            "to": "in July"
          }
        ],
        "sample": "We have English class on Monday morning.",
        "sampleZh": "我们周一上午有英语课。"
      },
      {
        "tab": "地点",
        "rule": "at 小地点/活动；in 里面/大地点；on 表面",
        "focusVerb": "at",
        "examples": [
          {
            "from": "school",
            "to": "at school"
          },
          {
            "from": "desk",
            "to": "on the desk"
          }
        ],
        "sample": "Tom is at school. His book is on the desk.",
        "sampleZh": "汤姆在学校，书在桌上。"
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
    "image": "w4-prep-hero.jpg",
    "buckets": [
      {
        "key": "time",
        "label": "时间介词"
      },
      {
        "key": "place",
        "label": "地点介词"
      }
    ],
    "items": [
      {
        "text": "at 8 o'clock",
        "bucket": "time"
      },
      {
        "text": "at home",
        "bucket": "place"
      },
      {
        "text": "on Sunday",
        "bucket": "time"
      },
      {
        "text": "in the classroom",
        "bucket": "place"
      },
      {
        "text": "in July",
        "bucket": "time"
      },
      {
        "text": "on the desk",
        "bucket": "place"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-prep-hero.jpg",
    "question": "「I get up in 7 o'clock.」应改成？",
    "choices": [
      {
        "text": "at 7 o'clock（时刻用 at）",
        "correct": true,
        "fb": "钟点用 at。"
      },
      {
        "text": "on 7 o'clock",
        "correct": false,
        "fb": "on 用于日期。"
      },
      {
        "text": "at the 7 o'clock",
        "correct": false,
        "fb": "at 后直接加时间。"
      }
    ],
    "sentence": "I get up at 7 o'clock.",
    "zh": "我七点起床。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-prep-hero.jpg",
    "lead": "给句子选对时间介词。",
    "items": [
      {
        "from": "She was born _____ 2012.",
        "fromZh": "她出生于 2012 年。",
        "steps": [
          {
            "label": "填介词",
            "opts": [
              "She was born in 2012.",
              "She was born on 2012.",
              "She was born at 2012."
            ],
            "ans": 0,
            "hint": "年份用 in。",
            "sentence": "She was born in 2012.",
            "zh": "她出生于 2012 年。"
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
    "image": "w4-prep-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "We",
      "have",
      "English",
      "class",
      "on",
      "Monday",
      "morning"
    ],
    "sentence": "We have English class on Monday morning.",
    "zh": "我们周一上午有英语课。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-prep-hero.jpg",
    "audio": "We have English class on Monday morning.",
    "tokens": [
      "We",
      "have",
      "English",
      "class",
      "on",
      "Monday",
      "morning"
    ],
    "sentence": "We have English class on Monday morning.",
    "zh": "我们周一上午有英语课。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w4-prep-hero.jpg",
    "q": "Don't read _____ the sun. It's bad for your eyes.",
    "opts": [
      "in",
      "on",
      "at"
    ],
    "ans": 0,
    "hint": "in the sun 在阳光下（固定搭配）。",
    "sentence": "We have English class on Monday morning.",
    "zh": "我们周一上午有英语课。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-prep-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "Don't read _____ the sun. It's bad for your eyes.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "in the sun 在阳光下（固定搭配）。",
        "sentence": "We have English class on Monday morning.",
        "zh": "我们周一上午有英语课。"
      },
      {
        "q": "The party starts _____ Friday evening.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "Friday evening 用 on。",
        "sentence": "The party starts on Friday evening.",
        "zh": "聚会周五晚上开始。"
      },
      {
        "q": "Birds sing _____ the morning.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 2,
        "hint": "in the morning。",
        "sentence": "Birds sing in the morning.",
        "zh": "鸟儿在早晨歌唱。"
      },
      {
        "q": "Please look _____ the blackboard.",
        "opts": [
          "to",
          "at",
          "for"
        ],
        "ans": 1,
        "hint": "look at。",
        "sentence": "Please look at the blackboard.",
        "zh": "请看黑板。"
      },
      {
        "q": "Listen _____ the teacher carefully.",
        "opts": [
          "at",
          "to",
          "for"
        ],
        "ans": 1,
        "hint": "listen to。",
        "sentence": "Listen to the teacher carefully.",
        "zh": "认真听老师讲。"
      },
      {
        "q": "He is waiting _____ the bus stop.",
        "opts": [
          "for",
          "at",
          "on"
        ],
        "ans": 1,
        "hint": "at the bus stop。wait for 是等某人/车。",
        "sentence": "He is waiting at the bus stop.",
        "zh": "他在公交站等着。"
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
        "q": "Don't read _____ the sun. It's bad for your eyes.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "in the sun 在阳光下（固定搭配）。",
        "sentence": "We have English class on Monday morning.",
        "zh": "我们周一上午有英语课。"
      },
      {
        "q": "The party starts _____ Friday evening.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "Friday evening 用 on。",
        "sentence": "The party starts on Friday evening.",
        "zh": "聚会周五晚上开始。"
      },
      {
        "q": "Birds sing _____ the morning.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 2,
        "hint": "in the morning。",
        "sentence": "Birds sing in the morning.",
        "zh": "鸟儿在早晨歌唱。"
      },
      {
        "q": "Please look _____ the blackboard.",
        "opts": [
          "to",
          "at",
          "for"
        ],
        "ans": 1,
        "hint": "look at。",
        "sentence": "Please look at the blackboard.",
        "zh": "请看黑板。"
      },
      {
        "q": "Listen _____ the teacher carefully.",
        "opts": [
          "at",
          "to",
          "for"
        ],
        "ans": 1,
        "hint": "listen to。",
        "sentence": "Listen to the teacher carefully.",
        "zh": "认真听老师讲。"
      },
      {
        "q": "He is waiting _____ the bus stop.",
        "opts": [
          "for",
          "at",
          "on"
        ],
        "ans": 1,
        "hint": "at the bus stop。wait for 是等某人/车。",
        "sentence": "He is waiting at the bus stop.",
        "zh": "他在公交站等着。"
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
        "q": "Don't read _____ the sun. It's bad for your eyes.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "in the sun 在阳光下（固定搭配）。",
        "sentence": "We have English class on Monday morning.",
        "zh": "我们周一上午有英语课。"
      },
      {
        "q": "The party starts _____ Friday evening.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "Friday evening 用 on。",
        "sentence": "The party starts on Friday evening.",
        "zh": "聚会周五晚上开始。"
      },
      {
        "q": "Birds sing _____ the morning.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 2,
        "hint": "in the morning。",
        "sentence": "Birds sing in the morning.",
        "zh": "鸟儿在早晨歌唱。"
      },
      {
        "q": "Please look _____ the blackboard.",
        "opts": [
          "to",
          "at",
          "for"
        ],
        "ans": 1,
        "hint": "look at。",
        "sentence": "Please look at the blackboard.",
        "zh": "请看黑板。"
      },
      {
        "q": "Listen _____ the teacher carefully.",
        "opts": [
          "at",
          "to",
          "for"
        ],
        "ans": 1,
        "hint": "listen to。",
        "sentence": "Listen to the teacher carefully.",
        "zh": "认真听老师讲。"
      },
      {
        "q": "He is waiting _____ the bus stop.",
        "opts": [
          "for",
          "at",
          "on"
        ],
        "ans": 1,
        "hint": "at the bus stop。wait for 是等某人/车。",
        "sentence": "He is waiting at the bus stop.",
        "zh": "他在公交站等着。"
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
    "image": "w4-prep-hero.jpg",
    "pairs": [
      {
        "en": "at six",
        "zh": "在六点"
      },
      {
        "en": "on Monday",
        "zh": "在星期一"
      },
      {
        "en": "in July",
        "zh": "在七月"
      },
      {
        "en": "look at",
        "zh": "看"
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
    "image": "w4-prep-hero.jpg",
    "audio": "We have English class on Monday morning.",
    "opts": [
      "We have English class on Monday morning.",
      "We have English class in Monday morning.",
      "We have English class at Monday morning."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "We have English class on Monday morning.",
    "zh": "我们周一上午有英语课。",
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
      "at 时刻；on 日期；in 月/年",
      "at school / at home",
      "look at, listen to 固定搭配",
      "at home / at school / in the sun / on the wall 要整块记。"
    ],
    "chant": "At the clock, on the day, in the month — that's the way!",
    "chantSpeak": "At the clock, on the day, in the month, that is the way!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "介词 in / on / at",
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