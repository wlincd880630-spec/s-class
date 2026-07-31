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
    "audio": "Don't run in the hallway.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "Don't run in the hallway.",
    "zh": "不要在走廊里跑。",
    "image": "l11-imper-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l11-imper-hero.jpg",
    "question": "为什么句首没有主语 you？",
    "choices": [
      {
        "text": "祈使句省略主语 you，动词原形开头",
        "correct": true,
        "fb": "对了！(Please) + 动词原形。"
      },
      {
        "text": "因为是过去时",
        "correct": false,
        "fb": "没有过去时间标志。"
      },
      {
        "text": "Don't 后面用 to run",
        "correct": false,
        "fb": "Don't + 动词原形。"
      }
    ],
    "sentence": "Don't run in the hallway.",
    "zh": "不要在走廊里跑。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l11-do.jpg",
    "rightImage": "l11-dont.jpg",
    "leftLabel": "肯定祈使",
    "rightLabel": "否定祈使 Don't",
    "leftSentence": "Open the window.",
    "leftZh": "打开窗户。",
    "rightSentence": "Don't open the window.",
    "rightZh": "不要打开窗户。",
    "morphBase": "Open",
    "morphPast": "Don't open",
    "morphHighlight": "",
    "discovery": "肯定：动词原形；否定：Don't + 原形。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l11-imper-hero.jpg",
    "buckets": [
      {
        "key": "yes",
        "label": "肯定祈使"
      },
      {
        "key": "no",
        "label": "否定祈使 Don't"
      }
    ],
    "items": [
      {
        "text": "Sit down, please.",
        "bucket": "yes"
      },
      {
        "text": "Don't talk in class.",
        "bucket": "no"
      },
      {
        "text": "Be quiet.",
        "bucket": "yes"
      },
      {
        "text": "Don't be late.",
        "bucket": "no"
      },
      {
        "text": "Listen carefully.",
        "bucket": "yes"
      },
      {
        "text": "Don't forget your book.",
        "bucket": "no"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l11-imper-hero.jpg",
    "rules": [
      {
        "tab": "肯定",
        "rule": "(Please) + 动词原形",
        "focusVerb": "Open",
        "examples": [
          {
            "from": "open",
            "to": "Open the door."
          },
          {
            "from": "be",
            "to": "Be careful!"
          }
        ],
        "sample": "Please hand in your homework.",
        "sampleZh": "请交作业。"
      },
      {
        "tab": "否定",
        "rule": "Don't + 动词原形",
        "focusVerb": "Don't",
        "examples": [
          {
            "from": "run",
            "to": "Don't run."
          },
          {
            "from": "forget",
            "to": "Don't forget."
          }
        ],
        "sample": "Don't run in the hallway.",
        "sampleZh": "不要在走廊里跑。"
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
    "image": "l11-imper-hero.jpg",
    "q": "_____ forget to bring your PE kit.",
    "opts": [
      "Not",
      "Don't",
      "Doesn't"
    ],
    "ans": 1,
    "hint": "否定祈使用 Don't + 原形。",
    "sentence": "Don't run in the hallway.",
    "zh": "不要在走廊里跑。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l11-imper-hero.jpg",
    "audio": "Please be quiet in the library.",
    "tokens": [
      "Please",
      "be",
      "quiet",
      "in",
      "the",
      "library"
    ],
    "sentence": "Please be quiet in the library.",
    "zh": "请在图书馆保持安静。"
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
      "肯定：(Please) + 动词原形",
      "否定：Don't + 原形",
      "写作：Follow these rules. Don't…"
    ],
    "chant": "Bossy verbs start the line! Don't plus base — you'll be fine!",
    "chantSpeak": "Bossy verbs start the line! Don't plus base, you will be fine!"
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