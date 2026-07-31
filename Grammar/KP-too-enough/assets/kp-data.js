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
    "section": "思考",
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
    "id": "p03",
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
    "id": "p04",
    "section": "游戏",
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
    "id": "p05",
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
    "id": "p06",
    "section": "闯关",
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
    "id": "p07",
    "section": "游戏",
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
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · 口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "writing.jpg",
    "checklist": [
      "too + adj + to do：太……而不能",
      "adj + enough + to do：足够……可以",
      "enough 放形容词后"
    ],
    "chant": "Too means more than OK! Enough to — you can play!",
    "chantSpeak": "Too means more than OK! Enough to, you can play!"
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