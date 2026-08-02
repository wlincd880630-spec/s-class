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
    "audio": "It is sunny and warm in summer.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "It is sunny and warm in summer.",
    "zh": "夏天阳光充足，天气温暖。",
    "image": "w5-v13-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-v13-hero.jpg",
    "question": "sunny 和 winter 分别描述什么？",
    "choices": [
      {
        "text": "天气（晴） / 季节（冬）",
        "correct": true,
        "fb": "对了！sunny 是天气，winter 是季节。"
      },
      {
        "text": "都是季节",
        "correct": false,
        "fb": "sunny 描述天气，不是季节。"
      },
      {
        "text": "都是温度",
        "correct": false,
        "fb": "sunny 是天气；winter 是季节。"
      }
    ],
    "sentence": "It is sunny and warm in summer.",
    "zh": "夏天阳光充足，天气温暖。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-v13-sunny.jpg",
    "rightImage": "w5-v13-winter.jpg",
    "leftLabel": "sunny 晴天",
    "rightLabel": "winter 冬天",
    "leftSentence": "It is sunny today. Let's go out.",
    "leftZh": "今天晴天，我们出去吧。",
    "rightSentence": "It is cold in winter.",
    "rightZh": "冬天很冷。",
    "morphBase": "sunny",
    "morphPast": "winter",
    "morphHighlight": "",
    "discovery": "天气：sunny, rainy, cloudy, windy, snowy；季节：spring, summer, autumn/fall, winter。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-v13-hero.jpg",
    "buckets": [
      {
        "key": "weather",
        "label": "天气"
      },
      {
        "key": "season",
        "label": "季节"
      }
    ],
    "items": [
      {
        "text": "sunny",
        "bucket": "weather"
      },
      {
        "text": "winter",
        "bucket": "season"
      },
      {
        "text": "rainy",
        "bucket": "weather"
      },
      {
        "text": "summer",
        "bucket": "season"
      },
      {
        "text": "cloudy",
        "bucket": "weather"
      },
      {
        "text": "spring",
        "bucket": "season"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-v13-hero.jpg",
    "lead": "天气词与四季。",
    "rules": [
      {
        "tab": "天气",
        "rule": "sunny 晴, rainy 雨, cloudy 云, windy 风, snowy 雪",
        "focusVerb": "sunny",
        "examples": [
          {
            "from": "sunny",
            "to": "晴天"
          },
          {
            "from": "rainy",
            "to": "雨天"
          }
        ],
        "sample": "It is sunny and warm in summer.",
        "sampleZh": "夏天阳光充足，天气温暖。"
      },
      {
        "tab": "季节",
        "rule": "spring 春, summer 夏, autumn/fall 秋, winter 冬",
        "focusVerb": "winter",
        "examples": [
          {
            "from": "winter",
            "to": "冬天"
          },
          {
            "from": "summer",
            "to": "夏天"
          }
        ],
        "sample": "It is cold in winter.",
        "sampleZh": "冬天很冷。"
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
    "image": "w5-v13-hero.jpg",
    "q": "It is _____ today. Remember to bring an umbrella.",
    "opts": [
      "sunny",
      "rainy",
      "windy"
    ],
    "ans": 1,
    "hint": "带伞说明在下雨，rainy。",
    "sentence": "It is sunny and warm in summer.",
    "zh": "夏天阳光充足，天气温暖。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-v13-hero.jpg",
    "audio": "It is sunny and warm in summer.",
    "tokens": [
      "It",
      "is",
      "sunny",
      "and",
      "warm",
      "in",
      "summer"
    ],
    "sentence": "It is sunny and warm in summer.",
    "zh": "夏天阳光充足，天气温暖。"
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
      "sunny/rainy/cloudy/windy 天气词",
      "spring/summer/autumn/winter 四季",
      "写作：It is… in summer/winter"
    ],
    "chant": "Sunny, rainy, cloudy too — weather words for you! Spring, summer, autumn, winter — four seasons, remember!",
    "chantSpeak": "Sunny, rainy, cloudy too, weather words for you! Spring, summer, autumn, winter, four seasons, remember!"
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