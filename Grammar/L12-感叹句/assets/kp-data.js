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
    "audio": "What a beautiful day it is!",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！",
    "image": "l13-excl-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l13-excl-hero.jpg",
    "question": "「What a beautiful day」为什么用 a？",
    "choices": [
      {
        "text": "day 是可数单数，What a + adj + 可数单数",
        "correct": true,
        "fb": "对了！What a beautiful day!"
      },
      {
        "text": "感叹句永远不用 a",
        "correct": false,
        "fb": "可数单数要加 a/an。"
      },
      {
        "text": "应该用 How a",
        "correct": false,
        "fb": "How 后直接接形容词/副词，不加 a。"
      }
    ],
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l13-what.jpg",
    "rightImage": "l13-how.jpg",
    "leftLabel": "What a day!",
    "rightLabel": "How beautiful!",
    "leftSentence": "What a lovely dog!",
    "leftZh": "多么可爱的狗啊！",
    "rightSentence": "How fast he runs!",
    "rightZh": "他跑得多快啊！",
    "morphBase": "What",
    "morphPast": "How",
    "morphHighlight": "",
    "discovery": "What + (a/an) + 形 + 名；How + 形/副 + 主谓！"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l13-excl-hero.jpg",
    "buckets": [
      {
        "key": "what",
        "label": "What 句"
      },
      {
        "key": "how",
        "label": "How 句"
      }
    ],
    "items": [
      {
        "text": "What a nice picture!",
        "bucket": "what"
      },
      {
        "text": "How clever you are!",
        "bucket": "how"
      },
      {
        "text": "What beautiful flowers!",
        "bucket": "what"
      },
      {
        "text": "How carefully she writes!",
        "bucket": "how"
      },
      {
        "text": "What an interesting book!",
        "bucket": "what"
      },
      {
        "text": "How cold it is!",
        "bucket": "how"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l13-excl-hero.jpg",
    "rules": [
      {
        "tab": "What",
        "rule": "What (+a/an)+形容词+名词!",
        "focusVerb": "What",
        "examples": [
          {
            "from": "day",
            "to": "What a day!"
          },
          {
            "from": "weather",
            "to": "What fine weather!"
          }
        ],
        "sample": "What a beautiful day it is!",
        "sampleZh": "多么美好的一天啊！"
      },
      {
        "tab": "How",
        "rule": "How + 形容词/副词 (+主谓)!",
        "focusVerb": "How",
        "examples": [
          {
            "from": "beautiful",
            "to": "How beautiful!"
          },
          {
            "from": "fast",
            "to": "How fast!"
          }
        ],
        "sample": "How fast he runs!",
        "sampleZh": "他跑得多快啊！"
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
    "image": "l13-excl-hero.jpg",
    "q": "_____ interesting story it is!",
    "opts": [
      "What",
      "What an",
      "How"
    ],
    "ans": 1,
    "hint": "story 可数单数：What an interesting story!",
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l13-excl-hero.jpg",
    "audio": "What a beautiful day it is!",
    "tokens": [
      "What",
      "a",
      "beautiful",
      "day",
      "it",
      "is"
    ],
    "sentence": "What a beautiful day it is!",
    "zh": "多么美好的一天啊！"
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
      "What a/an + adj + 可数单数!",
      "What + adj + 不可数/复数!",
      "How + adj/adv (+主谓)!"
    ],
    "chant": "What plus noun, How plus word! Exclaim loud — let it be heard!",
    "chantSpeak": "What plus noun, How plus word! Exclaim loud, let it be heard!"
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