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
    "audio": "I feel excited about the school trip.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I feel excited about the school trip.",
    "zh": "我对学校旅行感到兴奋。",
    "image": "w4-feel-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-feel-hero.jpg",
    "question": "feel 后面接什么词性？",
    "choices": [
      {
        "text": "形容词（excited, happy, worried）",
        "correct": true,
        "fb": "对了！feel + adj."
      },
      {
        "text": "动词原形",
        "correct": false,
        "fb": "feel 后不接动词原形。"
      },
      {
        "text": "名词",
        "correct": false,
        "fb": "feel 后一般接形容词描述感受。"
      }
    ],
    "sentence": "I feel excited about the school trip.",
    "zh": "我对学校旅行感到兴奋。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-feel-excited.jpg",
    "rightImage": "w4-feel-worried.jpg",
    "leftLabel": "excited 兴奋",
    "rightLabel": "worried 担心",
    "leftSentence": "She feels excited before the show.",
    "leftZh": "演出前她很兴奋。",
    "rightSentence": "He feels worried about the test.",
    "rightZh": "他对考试感到担心。",
    "morphBase": "excited",
    "morphPast": "worried",
    "morphHighlight": "",
    "discovery": "feel/look/seem + 形容词；-ed 形容人的感受。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-feel-hero.jpg",
    "buckets": [
      {
        "key": "pos",
        "label": "积极情绪"
      },
      {
        "key": "neg",
        "label": "消极情绪"
      }
    ],
    "items": [
      {
        "text": "excited",
        "bucket": "pos"
      },
      {
        "text": "worried",
        "bucket": "neg"
      },
      {
        "text": "proud",
        "bucket": "pos"
      },
      {
        "text": "nervous",
        "bucket": "neg"
      },
      {
        "text": "happy",
        "bucket": "pos"
      },
      {
        "text": "sad",
        "bucket": "neg"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-feel-hero.jpg",
    "lead": "描述情绪的常用词。",
    "rules": [
      {
        "tab": "feel + adj",
        "rule": "feel excited/worried/happy/sad/nervous/proud",
        "focusVerb": "feel",
        "examples": [
          {
            "from": "excited",
            "to": "兴奋的"
          },
          {
            "from": "worried",
            "to": "担心的"
          }
        ],
        "sample": "I feel excited about the school trip.",
        "sampleZh": "我对学校旅行感到兴奋。"
      },
      {
        "tab": "写作",
        "rule": "I feel… because…; I was… when…",
        "focusVerb": "because",
        "examples": [
          {
            "from": "excited",
            "to": "because we won"
          }
        ],
        "sample": "I felt proud because I won the race.",
        "sampleZh": "我感到很自豪，因为我赢了比赛。"
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
    "image": "w4-feel-hero.jpg",
    "q": "Tom feels _____ because he lost his wallet.",
    "opts": [
      "excited",
      "worried",
      "proud"
    ],
    "ans": 1,
    "sentence": "I feel excited about the school trip.",
    "zh": "我对学校旅行感到兴奋。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-feel-hero.jpg",
    "audio": "I feel excited about the school trip.",
    "tokens": [
      "I",
      "feel",
      "excited",
      "about",
      "the",
      "school",
      "trip"
    ],
    "sentence": "I feel excited about the school trip.",
    "zh": "我对学校旅行感到兴奋。"
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
      "feel + 形容词",
      "excited/worried/nervous/proud",
      "写作：I feel… because…"
    ],
    "chant": "Feel plus adjective — that's the way! Excited, worried — what do you say?",
    "chantSpeak": "Feel plus adjective, that is the way! Excited, worried, what do you say?"
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