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
    "section": "思考",
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
    "id": "p03",
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
    "id": "p04",
    "section": "游戏",
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
    "id": "p05",
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
    "id": "p06",
    "section": "闯关",
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
    "id": "p07",
    "section": "游戏",
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
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · 口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "writing.jpg",
    "checklist": [
      "at 时刻；on 日期；in 月/年",
      "at school / at home",
      "look at, listen to 固定搭配"
    ],
    "chant": "At the clock, on the day, in the month — that's the way!",
    "chantSpeak": "At the clock, on the day, in the month, that is the way!"
  }
];
  global.KpData = {
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