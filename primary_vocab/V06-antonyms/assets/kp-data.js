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
    "audio": "Eric is taller than Jim, but he is shorter than Mike.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Eric is taller than Jim, but he is shorter than Mike.",
    "zh": "埃里克比吉姆高，但比迈克矮。",
    "image": "w3-ant-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-ant-hero.jpg",
    "question": "taller 的反义形容词是？",
    "choices": [
      {
        "text": "shorter",
        "correct": true,
        "fb": "对了！tall ↔ short。"
      },
      {
        "text": "smaller",
        "correct": false,
        "fb": "small 反义是 big/large。"
      },
      {
        "text": "thinner",
        "correct": false,
        "fb": "thin 反义是 fat/thick。"
      }
    ],
    "sentence": "Eric is taller than Jim, but he is shorter than Mike.",
    "zh": "埃里克比吉姆高，但比迈克矮。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-ant-tall.jpg",
    "rightImage": "w3-ant-short.jpg",
    "leftLabel": "tall",
    "rightLabel": "short",
    "leftSentence": "The giraffe is tall.",
    "leftZh": "长颈鹿很高。",
    "rightSentence": "The rabbit is short.",
    "rightZh": "兔子很矮。",
    "morphBase": "tall",
    "morphPast": "short",
    "morphHighlight": "",
    "discovery": "句意转折 but 常提示写反义词。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-ant-hero.jpg",
    "buckets": [
      {
        "key": "pair",
        "label": "反义配对"
      }
    ],
    "items": [
      {
        "text": "hot ↔ cold",
        "bucket": "pair"
      },
      {
        "text": "happy ↔ sad",
        "bucket": "pair"
      },
      {
        "text": "big ↔ small",
        "bucket": "pair"
      },
      {
        "text": "open ↔ close",
        "bucket": "pair"
      },
      {
        "text": "easy ↔ difficult",
        "bucket": "pair"
      },
      {
        "text": "light ↔ heavy",
        "bucket": "pair"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-ant-hero.jpg",
    "lead": "小升初高频反义对。",
    "rules": [
      {
        "tab": "形/副",
        "rule": "tall/short, hot/cold, easy/hard, fast/slow",
        "focusVerb": "shorter",
        "examples": [
          {
            "from": "tall",
            "to": "short"
          },
          {
            "from": "hot",
            "to": "cold"
          }
        ],
        "sample": "Eric is taller than Jim, but shorter than Mike.",
        "sampleZh": "埃里克比吉姆高，但比迈克矮。"
      },
      {
        "tab": "动词",
        "rule": "open/close, start/finish, come/go",
        "focusVerb": "close",
        "examples": [
          {
            "from": "open",
            "to": "close"
          }
        ],
        "sample": "Please close the door — it is open.",
        "sampleZh": "请关门——门开着。"
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
    "image": "w3-ant-hero.jpg",
    "q": "The weather is hot in summer but _____ in winter.",
    "opts": [
      "warm",
      "cold",
      "cool"
    ],
    "ans": 1,
    "hint": "hot 的反义 cold。",
    "sentence": "Eric is taller than Jim, but he is shorter than Mike.",
    "zh": "埃里克比吉姆高，但比迈克矮。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-ant-hero.jpg",
    "audio": "Eric is taller than Jim, but shorter than Mike.",
    "tokens": [
      "Eric",
      "is",
      "taller",
      "than",
      "Jim",
      "but",
      "shorter",
      "than",
      "Mike"
    ],
    "sentence": "Eric is taller than Jim, but shorter than Mike.",
    "zh": "埃里克比吉姆高，但比迈克矮。"
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
      "but 常提示反义",
      "tall↔short, hot↔cold, happy↔sad",
      "写作：The problem is difficult but important."
    ],
    "chant": "Opposites help you choose! Hot to cold — use your voice!",
    "chantSpeak": "Opposites help you choose! Hot to cold, use your voice!"
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