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
    "section": "精讲",
    "title": "at 点钟、夜晚、中午",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "在具体时刻、夜晚、中午前用 at",
    "sentence": "I get up at 7 o'clock.",
    "zh": "我七点起床。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "in 月、年、季节、上午",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-cat.png",
    "lead": "在月份、年份、季节、上午/下午/晚上前用 in",
    "sentence": "My birthday is in July.",
    "zh": "我的生日在七月。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
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
    "id": "p10",
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
    "id": "p11"
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
      },
      {
        "from": "I get up in 7 o'clock.",
        "fromZh": "我七点起床。",
        "steps": [
          {
            "label": "改成正确的介词",
            "opts": [
              "I get up at 7 o'clock.",
              "I get up on 7 o'clock.",
              "I get up in 7 o'clock."
            ],
            "ans": 0,
            "hint": "点钟前用at",
            "sentence": "I get up at 7 o'clock.",
            "zh": "我七点起床。"
          }
        ]
      },
      {
        "from": "We have English class in Monday morning.",
        "fromZh": "我们星期一早上有英语课。",
        "steps": [
          {
            "label": "改成正确的介词",
            "opts": [
              "We have English class on Monday morning.",
              "We have English class at Monday morning.",
              "We have English class in Monday morning."
            ],
            "ans": 0,
            "hint": "具体某一天的早上用on",
            "sentence": "We have English class on Monday morning.",
            "zh": "我们星期一早上有英语课。"
          }
        ]
      },
      {
        "from": "My birthday is on July.",
        "fromZh": "我的生日在七月。",
        "steps": [
          {
            "label": "改成正确的介词",
            "opts": [
              "My birthday is in July.",
              "My birthday is at July.",
              "My birthday is on July."
            ],
            "ans": 0,
            "hint": "月份前用in",
            "sentence": "My birthday is in July.",
            "zh": "我的生日在七月。"
          }
        ]
      },
      {
        "from": "She was born in 2012 year.",
        "fromZh": "她出生于2012年。",
        "steps": [
          {
            "label": "改成正确的表达",
            "opts": [
              "She was born in 2012.",
              "She was born on 2012.",
              "She was born at 2012."
            ],
            "ans": 0,
            "hint": "年份前用in，不加year",
            "sentence": "She was born in 2012.",
            "zh": "她出生于2012年。"
          }
        ]
      },
      {
        "from": "The meeting is in noon.",
        "fromZh": "会议在中午举行。",
        "steps": [
          {
            "label": "改成正确的介词",
            "opts": [
              "The meeting is at noon.",
              "The meeting is on noon.",
              "The meeting is in noon."
            ],
            "ans": 0,
            "hint": "中午用at noon",
            "sentence": "The meeting is at noon.",
            "zh": "会议在中午举行。"
          }
        ]
      },
      {
        "from": "We have a test at Friday.",
        "fromZh": "我们星期五有考试。",
        "steps": [
          {
            "label": "改成正确的介词",
            "opts": [
              "We have a test on Friday.",
              "We have a test in Friday.",
              "We have a test at Friday."
            ],
            "ans": 0,
            "hint": "星期前用on",
            "sentence": "We have a test on Friday.",
            "zh": "我们星期五有考试。"
          }
        ]
      }
    ],
    "id": "p12"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3d-dinner.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "get",
      "up",
      "at",
      "7",
      "o'clock"
    ],
    "sentence": "I get up at 7 o'clock.",
    "zh": "我七点起床。",
    "items": [
      {
        "tokens": [
          "I",
          "get",
          "up",
          "at",
          "7",
          "o'clock"
        ],
        "sentence": "I get up at 7 o'clock.",
        "zh": "我七点起床。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "We",
          "have",
          "a",
          "test",
          "on",
          "Friday"
        ],
        "sentence": "We have a test on Friday.",
        "zh": "我们星期五有考试。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "My",
          "birthday",
          "is",
          "in",
          "July"
        ],
        "sentence": "My birthday is in July.",
        "zh": "我的生日在七月。",
        "image": "kp3d-cat.png"
      },
      {
        "tokens": [
          "It",
          "often",
          "rains",
          "in",
          "summer"
        ],
        "sentence": "It often rains in summer.",
        "zh": "夏天经常下雨。",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "The",
          "bus",
          "leaves",
          "at",
          "8:15"
        ],
        "sentence": "The bus leaves at 8:15.",
        "zh": "公交车8点15分发车。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "We",
          "play",
          "basketball",
          "on",
          "the",
          "playground",
          "in",
          "the",
          "morning"
        ],
        "sentence": "We play basketball on the playground in the morning.",
        "zh": "我们早上在操场上打篮球。",
        "image": "kp3d-playground.png"
      }
    ],
    "id": "p13"
  },
  {
    "id": "p14",
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
    "id": "p15",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "I get up _____ 7 o'clock.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "点钟前用at",
        "sentence": "I get up at 7 o'clock.",
        "zh": "我七点起床。"
      },
      {
        "q": "We have English class _____ Monday morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天的早上用on",
        "sentence": "We have English class on Monday morning.",
        "zh": "我们星期一早上有英语课。"
      },
      {
        "q": "My birthday is _____ July.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "月份前用in",
        "sentence": "My birthday is in July.",
        "zh": "我的生日在七月。"
      },
      {
        "q": "The bus leaves _____ 8:15.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "具体时刻用at",
        "sentence": "The bus leaves at 8:15.",
        "zh": "公交车8点15分发车。"
      },
      {
        "q": "We have a test _____ Friday.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "星期前用on",
        "sentence": "We have a test on Friday.",
        "zh": "我们星期五有考试。"
      },
      {
        "q": "It often rains _____ summer.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "季节前用in",
        "sentence": "It often rains in summer.",
        "zh": "夏天经常下雨。"
      },
      {
        "q": "The shop opens _____ 9 o'clock.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "点钟用at",
        "sentence": "The shop opens at 9 o'clock.",
        "zh": "商店9点开门。"
      },
      {
        "q": "He was born _____ spring.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "季节前用in",
        "sentence": "He was born in spring.",
        "zh": "他出生在春天。"
      },
      {
        "q": "We go to school _____ Monday morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天早上用on",
        "sentence": "We go to school on Monday morning.",
        "zh": "我们星期一早上去上学。"
      },
      {
        "q": "I do my homework _____ night.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "夜晚用at night",
        "sentence": "I do my homework at night.",
        "zh": "我晚上做作业。"
      }
    ],
    "id": "p16"
  },
  {
    "section": "检测",
    "title": "限时挑战 90 秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "lead": "题库已扩充：90 秒内尽量多答对。",
    "seconds": 90,
    "perQuestion": 12,
    "pass": 8,
    "pool": "questions",
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
      },
      {
        "q": "I get up _____ 7 o'clock.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "点钟前用at",
        "sentence": "I get up at 7 o'clock.",
        "zh": "我七点起床。"
      },
      {
        "q": "We have English class _____ Monday morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天的早上用on",
        "sentence": "We have English class on Monday morning.",
        "zh": "我们星期一早上有英语课。"
      },
      {
        "q": "My birthday is _____ July.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "月份前用in",
        "sentence": "My birthday is in July.",
        "zh": "我的生日在七月。"
      },
      {
        "q": "The bus leaves _____ 8:15.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "具体时刻用at",
        "sentence": "The bus leaves at 8:15.",
        "zh": "公交车8点15分发车。"
      },
      {
        "q": "We have a test _____ Friday.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "星期前用on",
        "sentence": "We have a test on Friday.",
        "zh": "我们星期五有考试。"
      },
      {
        "q": "It often rains _____ summer.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "季节前用in",
        "sentence": "It often rains in summer.",
        "zh": "夏天经常下雨。"
      },
      {
        "q": "The shop opens _____ 9 o'clock.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "点钟用at",
        "sentence": "The shop opens at 9 o'clock.",
        "zh": "商店9点开门。"
      },
      {
        "q": "He was born _____ spring.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "季节前用in",
        "sentence": "He was born in spring.",
        "zh": "他出生在春天。"
      },
      {
        "q": "We go to school _____ Monday morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天早上用on",
        "sentence": "We go to school on Monday morning.",
        "zh": "我们星期一早上去上学。"
      },
      {
        "q": "I do my homework _____ night.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "夜晚用at night",
        "sentence": "I do my homework at night.",
        "zh": "我晚上做作业。"
      },
      {
        "q": "She was born _____ 2012.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "年份前用in",
        "sentence": "She was born in 2012.",
        "zh": "她出生于2012年。"
      },
      {
        "q": "We have a picnic _____ Sunday afternoon.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天下午用on",
        "sentence": "We have a picnic on Sunday afternoon.",
        "zh": "我们星期天下午去野餐。"
      },
      {
        "q": "The panda eats bamboo _____ the morning.",
        "opts": [
          "on",
          "at",
          "in"
        ],
        "ans": 2,
        "hint": "上午用in the morning",
        "sentence": "The panda eats bamboo in the morning.",
        "zh": "熊猫早上吃竹子。"
      },
      {
        "q": "I have a piano lesson _____ Saturday afternoon.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 0,
        "hint": "具体某一天下午用on",
        "sentence": "I have a piano lesson on Saturday afternoon.",
        "zh": "我星期六下午有钢琴课。"
      },
      {
        "q": "The meeting is _____ noon.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "中午用at noon",
        "sentence": "The meeting is at noon.",
        "zh": "会议在中午举行。"
      },
      {
        "q": "We have a basketball game _____ the afternoon.",
        "opts": [
          "on",
          "at",
          "in"
        ],
        "ans": 2,
        "hint": "下午用in the afternoon",
        "sentence": "We have a basketball game in the afternoon.",
        "zh": "我们下午有一场篮球赛。"
      },
      {
        "q": "Don't read _____ the sun.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "在阳光下用in the sun",
        "sentence": "Don't read in the sun.",
        "zh": "不要在太阳底下读书。"
      },
      {
        "q": "I like to read books _____ the library in the evening.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "在图书馆里用in",
        "sentence": "I like to read books in the library in the evening.",
        "zh": "我喜欢晚上在图书馆看书。"
      },
      {
        "q": "The cat sleeps _____ the sofa in the afternoon.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在沙发上用on",
        "sentence": "The cat sleeps on the sofa in the afternoon.",
        "zh": "猫下午在沙发上睡觉。"
      },
      {
        "q": "We eat hotpot _____ winter.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "季节前用in",
        "sentence": "We eat hotpot in winter.",
        "zh": "我们冬天吃火锅。"
      },
      {
        "q": "The moon is bright _____ night.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "夜晚用at night",
        "sentence": "The moon is bright at night.",
        "zh": "月亮在夜晚很亮。"
      },
      {
        "q": "I take a bus _____ 7:30 in the morning.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "具体时刻用at",
        "sentence": "I take a bus at 7:30 in the morning.",
        "zh": "我早上7点30分乘公交车。"
      },
      {
        "q": "The apples are _____ the table.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在桌子上用on",
        "sentence": "The apples are on the table.",
        "zh": "苹果在桌子上。"
      },
      {
        "q": "We play basketball _____ the playground in the morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在操场上用on the playground",
        "sentence": "We play basketball on the playground in the morning.",
        "zh": "我们早上在操场上打篮球。"
      },
      {
        "q": "My father comes home _____ 6 o'clock.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "点钟用at",
        "sentence": "My father comes home at 6 o'clock.",
        "zh": "我爸爸六点回家。"
      },
      {
        "q": "We have a party _____ New Year's Day.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 0,
        "hint": "具体节日用on",
        "sentence": "We have a party on New Year's Day.",
        "zh": "我们在元旦开派对。"
      },
      {
        "q": "I was born _____ the morning of May 1st.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天的早上用on",
        "sentence": "I was born on the morning of May 1st.",
        "zh": "我出生于五月一日早上。"
      },
      {
        "q": "The movie starts _____ 7:30.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 2,
        "hint": "具体时刻用at",
        "sentence": "The movie starts at 7:30.",
        "zh": "电影7点30分开始。"
      }
    ],
    "id": "p17"
  },
  {
    "section": "检测",
    "title": "连对闯关",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "lead": "连续答对 8 题通关，答错连击清零。题库已加厚。",
    "target": 8,
    "pool": "questions",
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
      },
      {
        "q": "I get up _____ 7 o'clock.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "点钟前用at",
        "sentence": "I get up at 7 o'clock.",
        "zh": "我七点起床。"
      },
      {
        "q": "We have English class _____ Monday morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天的早上用on",
        "sentence": "We have English class on Monday morning.",
        "zh": "我们星期一早上有英语课。"
      },
      {
        "q": "My birthday is _____ July.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "月份前用in",
        "sentence": "My birthday is in July.",
        "zh": "我的生日在七月。"
      },
      {
        "q": "The bus leaves _____ 8:15.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "具体时刻用at",
        "sentence": "The bus leaves at 8:15.",
        "zh": "公交车8点15分发车。"
      },
      {
        "q": "We have a test _____ Friday.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "星期前用on",
        "sentence": "We have a test on Friday.",
        "zh": "我们星期五有考试。"
      },
      {
        "q": "It often rains _____ summer.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "季节前用in",
        "sentence": "It often rains in summer.",
        "zh": "夏天经常下雨。"
      },
      {
        "q": "The shop opens _____ 9 o'clock.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "点钟用at",
        "sentence": "The shop opens at 9 o'clock.",
        "zh": "商店9点开门。"
      },
      {
        "q": "He was born _____ spring.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "季节前用in",
        "sentence": "He was born in spring.",
        "zh": "他出生在春天。"
      },
      {
        "q": "We go to school _____ Monday morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天早上用on",
        "sentence": "We go to school on Monday morning.",
        "zh": "我们星期一早上去上学。"
      },
      {
        "q": "I do my homework _____ night.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "夜晚用at night",
        "sentence": "I do my homework at night.",
        "zh": "我晚上做作业。"
      },
      {
        "q": "She was born _____ 2012.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "年份前用in",
        "sentence": "She was born in 2012.",
        "zh": "她出生于2012年。"
      },
      {
        "q": "We have a picnic _____ Sunday afternoon.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天下午用on",
        "sentence": "We have a picnic on Sunday afternoon.",
        "zh": "我们星期天下午去野餐。"
      },
      {
        "q": "The panda eats bamboo _____ the morning.",
        "opts": [
          "on",
          "at",
          "in"
        ],
        "ans": 2,
        "hint": "上午用in the morning",
        "sentence": "The panda eats bamboo in the morning.",
        "zh": "熊猫早上吃竹子。"
      },
      {
        "q": "I have a piano lesson _____ Saturday afternoon.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 0,
        "hint": "具体某一天下午用on",
        "sentence": "I have a piano lesson on Saturday afternoon.",
        "zh": "我星期六下午有钢琴课。"
      },
      {
        "q": "The meeting is _____ noon.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "中午用at noon",
        "sentence": "The meeting is at noon.",
        "zh": "会议在中午举行。"
      },
      {
        "q": "We have a basketball game _____ the afternoon.",
        "opts": [
          "on",
          "at",
          "in"
        ],
        "ans": 2,
        "hint": "下午用in the afternoon",
        "sentence": "We have a basketball game in the afternoon.",
        "zh": "我们下午有一场篮球赛。"
      },
      {
        "q": "Don't read _____ the sun.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "在阳光下用in the sun",
        "sentence": "Don't read in the sun.",
        "zh": "不要在太阳底下读书。"
      },
      {
        "q": "I like to read books _____ the library in the evening.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "在图书馆里用in",
        "sentence": "I like to read books in the library in the evening.",
        "zh": "我喜欢晚上在图书馆看书。"
      },
      {
        "q": "The cat sleeps _____ the sofa in the afternoon.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在沙发上用on",
        "sentence": "The cat sleeps on the sofa in the afternoon.",
        "zh": "猫下午在沙发上睡觉。"
      },
      {
        "q": "We eat hotpot _____ winter.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "季节前用in",
        "sentence": "We eat hotpot in winter.",
        "zh": "我们冬天吃火锅。"
      },
      {
        "q": "The moon is bright _____ night.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "夜晚用at night",
        "sentence": "The moon is bright at night.",
        "zh": "月亮在夜晚很亮。"
      },
      {
        "q": "I take a bus _____ 7:30 in the morning.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "具体时刻用at",
        "sentence": "I take a bus at 7:30 in the morning.",
        "zh": "我早上7点30分乘公交车。"
      },
      {
        "q": "The apples are _____ the table.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在桌子上用on",
        "sentence": "The apples are on the table.",
        "zh": "苹果在桌子上。"
      },
      {
        "q": "We play basketball _____ the playground in the morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在操场上用on the playground",
        "sentence": "We play basketball on the playground in the morning.",
        "zh": "我们早上在操场上打篮球。"
      },
      {
        "q": "My father comes home _____ 6 o'clock.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "点钟用at",
        "sentence": "My father comes home at 6 o'clock.",
        "zh": "我爸爸六点回家。"
      },
      {
        "q": "We have a party _____ New Year's Day.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 0,
        "hint": "具体节日用on",
        "sentence": "We have a party on New Year's Day.",
        "zh": "我们在元旦开派对。"
      },
      {
        "q": "I was born _____ the morning of May 1st.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天的早上用on",
        "sentence": "I was born on the morning of May 1st.",
        "zh": "我出生于五月一日早上。"
      },
      {
        "q": "The movie starts _____ 7:30.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 2,
        "hint": "具体时刻用at",
        "sentence": "The movie starts at 7:30.",
        "zh": "电影7点30分开始。"
      }
    ],
    "id": "p18"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "w4-prep-hero.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "at 7 o'clock",
        "zh": "在七点"
      },
      {
        "en": "in the morning",
        "zh": "在早上"
      },
      {
        "en": "at night",
        "zh": "在夜晚"
      },
      {
        "en": "on Sunday afternoon",
        "zh": "在星期天下午"
      },
      {
        "en": "in winter",
        "zh": "在冬天"
      },
      {
        "en": "at noon",
        "zh": "在中午"
      },
      {
        "en": "on Friday",
        "zh": "在星期五"
      },
      {
        "en": "in 2012",
        "zh": "在2012年"
      }
    ],
    "id": "p19"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "w4-prep-hero.jpg",
    "audio": "I get up at 7 o'clock.",
    "opts": [
      "I get up at 7 o'clock.",
      "I get up in 7 o'clock.",
      "I get up on 7 o'clock."
    ],
    "ans": 0,
    "hint": "注意介词",
    "sentence": "I get up at 7 o'clock.",
    "zh": "我七点起床。",
    "questions": [
      {
        "audio": "I get up at 7 o'clock.",
        "opts": [
          "I get up at 7 o'clock.",
          "I get up in 7 o'clock.",
          "I get up on 7 o'clock."
        ],
        "ans": 0,
        "hint": "注意介词",
        "zh": "我七点起床。",
        "sentence": "I get up at 7 o'clock."
      },
      {
        "audio": "We have English class on Monday morning.",
        "opts": [
          "We have English class on Monday morning.",
          "We have English class in Monday morning.",
          "We have English class at Monday morning."
        ],
        "ans": 0,
        "hint": "具体某一天早上用on",
        "zh": "我们星期一早上有英语课。",
        "sentence": "We have English class on Monday morning."
      },
      {
        "audio": "My birthday is in July.",
        "opts": [
          "My birthday is in July.",
          "My birthday is on July.",
          "My birthday is at July."
        ],
        "ans": 0,
        "hint": "月份前用in",
        "zh": "我的生日在七月。",
        "sentence": "My birthday is in July."
      },
      {
        "audio": "The bus leaves at 8:15.",
        "opts": [
          "The bus leaves at 8:15.",
          "The bus leaves on 8:15.",
          "The bus leaves in 8:15."
        ],
        "ans": 0,
        "hint": "具体时刻用at",
        "zh": "公交车8点15分发车。",
        "sentence": "The bus leaves at 8:15."
      },
      {
        "audio": "We have a test on Friday.",
        "opts": [
          "We have a test on Friday.",
          "We have a test in Friday.",
          "We have a test at Friday."
        ],
        "ans": 0,
        "hint": "星期前用on",
        "zh": "我们星期五有考试。",
        "sentence": "We have a test on Friday."
      },
      {
        "audio": "It often rains in summer.",
        "opts": [
          "It often rains in summer.",
          "It often rains on summer.",
          "It often rains at summer."
        ],
        "ans": 0,
        "hint": "季节前用in",
        "zh": "夏天经常下雨。",
        "sentence": "It often rains in summer."
      },
      {
        "audio": "I do my homework at night.",
        "opts": [
          "I do my homework at night.",
          "I do my homework in night.",
          "I do my homework on night."
        ],
        "ans": 0,
        "hint": "夜晚用at night",
        "zh": "我晚上做作业。",
        "sentence": "I do my homework at night."
      },
      {
        "audio": "We have a picnic on Sunday afternoon.",
        "opts": [
          "We have a picnic on Sunday afternoon.",
          "We have a picnic in Sunday afternoon.",
          "We have a picnic at Sunday afternoon."
        ],
        "ans": 0,
        "hint": "具体某一天下午用on",
        "zh": "我们星期天下午去野餐。",
        "sentence": "We have a picnic on Sunday afternoon."
      }
    ],
    "id": "p20"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "w4-prep-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "We have English class on Monday morning.",
        "zh": "我们星期一早上有英语课。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Don't read in the sun. It's bad for your eyes.",
        "zh": "不要在太阳底下读书，对眼睛不好。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "I get up at 7 o'clock every day.",
        "zh": "我每天七点起床。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "My birthday is in July.",
        "zh": "我的生日在七月。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "We have a picnic on Sunday afternoon.",
        "zh": "我们星期天下午去野餐。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The panda eats bamboo in the morning.",
        "zh": "熊猫早上吃竹子。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I do my homework at night.",
        "zh": "我晚上做作业。",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "She was born in 2012.",
        "zh": "她出生于2012年。",
        "tag": "daily_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "The bus leaves at 8:15.",
        "zh": "公交车8点15分发车。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "We have a test on Friday.",
        "zh": "我们星期五有考试。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "It often rains in summer.",
        "zh": "夏天经常下雨。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The shop opens at 9 o'clock.",
        "zh": "商店9点开门。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "He was born in spring.",
        "zh": "他出生在春天。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "We go to school on Monday morning.",
        "zh": "我们星期一早上去上学。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "I have a piano lesson on Saturday afternoon.",
        "zh": "我星期六下午有钢琴课。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The meeting is at noon.",
        "zh": "会议在中午举行。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "We have a basketball game in the afternoon.",
        "zh": "我们下午有一场篮球赛。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "I like to read books in the library in the evening.",
        "zh": "我喜欢晚上在图书馆看书。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The cat sleeps on the sofa in the afternoon.",
        "zh": "猫下午在沙发上睡觉。",
        "tag": "writing_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "We eat hotpot in winter.",
        "zh": "我们冬天吃火锅。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The moon is bright at night.",
        "zh": "月亮在夜晚很亮。",
        "tag": "writing_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "I take a bus at 7:30 in the morning.",
        "zh": "我早上7点30分乘公交车。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The apples are on the table.",
        "zh": "苹果在桌子上。",
        "tag": "writing_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "We play basketball on the playground in the morning.",
        "zh": "我们早上在操场上打篮球。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      }
    ],
    "id": "p21"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "w4-prep-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "She was born _____ 2012.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "年份前用in",
        "sentence": "She was born in 2012.",
        "zh": "她出生于2012年。"
      },
      {
        "q": "We have a picnic _____ Sunday afternoon.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天下午用on",
        "sentence": "We have a picnic on Sunday afternoon.",
        "zh": "我们星期天下午去野餐。"
      },
      {
        "q": "The panda eats bamboo _____ the morning.",
        "opts": [
          "on",
          "at",
          "in"
        ],
        "ans": 2,
        "hint": "上午用in the morning",
        "sentence": "The panda eats bamboo in the morning.",
        "zh": "熊猫早上吃竹子。"
      },
      {
        "q": "I have a piano lesson _____ Saturday afternoon.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 0,
        "hint": "具体某一天下午用on",
        "sentence": "I have a piano lesson on Saturday afternoon.",
        "zh": "我星期六下午有钢琴课。"
      },
      {
        "q": "The meeting is _____ noon.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "中午用at noon",
        "sentence": "The meeting is at noon.",
        "zh": "会议在中午举行。"
      },
      {
        "q": "We have a basketball game _____ the afternoon.",
        "opts": [
          "on",
          "at",
          "in"
        ],
        "ans": 2,
        "hint": "下午用in the afternoon",
        "sentence": "We have a basketball game in the afternoon.",
        "zh": "我们下午有一场篮球赛。"
      },
      {
        "q": "Don't read _____ the sun.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "在阳光下用in the sun",
        "sentence": "Don't read in the sun.",
        "zh": "不要在太阳底下读书。"
      },
      {
        "q": "I like to read books _____ the library in the evening.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 1,
        "hint": "在图书馆里用in",
        "sentence": "I like to read books in the library in the evening.",
        "zh": "我喜欢晚上在图书馆看书。"
      },
      {
        "q": "The cat sleeps _____ the sofa in the afternoon.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在沙发上用on",
        "sentence": "The cat sleeps on the sofa in the afternoon.",
        "zh": "猫下午在沙发上睡觉。"
      },
      {
        "q": "We eat hotpot _____ winter.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 0,
        "hint": "季节前用in",
        "sentence": "We eat hotpot in winter.",
        "zh": "我们冬天吃火锅。"
      },
      {
        "q": "The moon is bright _____ night.",
        "opts": [
          "at",
          "in",
          "on"
        ],
        "ans": 0,
        "hint": "夜晚用at night",
        "sentence": "The moon is bright at night.",
        "zh": "月亮在夜晚很亮。"
      },
      {
        "q": "I take a bus _____ 7:30 in the morning.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "具体时刻用at",
        "sentence": "I take a bus at 7:30 in the morning.",
        "zh": "我早上7点30分乘公交车。"
      },
      {
        "q": "The apples are _____ the table.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在桌子上用on",
        "sentence": "The apples are on the table.",
        "zh": "苹果在桌子上。"
      },
      {
        "q": "We play basketball _____ the playground in the morning.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "在操场上用on the playground",
        "sentence": "We play basketball on the playground in the morning.",
        "zh": "我们早上在操场上打篮球。"
      },
      {
        "q": "My father comes home _____ 6 o'clock.",
        "opts": [
          "at",
          "on",
          "in"
        ],
        "ans": 0,
        "hint": "点钟用at",
        "sentence": "My father comes home at 6 o'clock.",
        "zh": "我爸爸六点回家。"
      },
      {
        "q": "We have a party _____ New Year's Day.",
        "opts": [
          "on",
          "in",
          "at"
        ],
        "ans": 0,
        "hint": "具体节日用on",
        "sentence": "We have a party on New Year's Day.",
        "zh": "我们在元旦开派对。"
      },
      {
        "q": "I was born _____ the morning of May 1st.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 1,
        "hint": "具体某一天的早上用on",
        "sentence": "I was born on the morning of May 1st.",
        "zh": "我出生于五月一日早上。"
      },
      {
        "q": "The movie starts _____ 7:30.",
        "opts": [
          "in",
          "on",
          "at"
        ],
        "ans": 2,
        "hint": "具体时刻用at",
        "sentence": "The movie starts at 7:30.",
        "zh": "电影7点30分开始。"
      }
    ],
    "id": "p22"
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
    "id": "p23"
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