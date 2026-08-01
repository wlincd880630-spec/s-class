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
    "audio": "I want to join the art club.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。",
    "image": "w5-wn-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-wn-hero.jpg",
    "question": "The window needs repairing 是什么意思？",
    "choices": [
      {
        "text": "窗户需要被修理（need doing = 被动）",
        "correct": true,
        "fb": "对了！need doing = need to be done。"
      },
      {
        "text": "窗户需要修理别人",
        "correct": false,
        "fb": "need doing 主语是承受动作的对象。"
      },
      {
        "text": "窗户正在修理",
        "correct": false,
        "fb": "need doing 表需要被…，不是进行时。"
      }
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-wn-want.jpg",
    "rightImage": "w5-wn-need.jpg",
    "leftLabel": "want to do",
    "rightLabel": "need doing",
    "leftSentence": "I want to join the art club.",
    "leftZh": "我想加入美术社团。",
    "rightSentence": "The window needs repairing.",
    "rightZh": "窗户需要修理。",
    "morphBase": "want to",
    "morphPast": "need doing",
    "morphHighlight": "",
    "discovery": "want to do 想要做；need to do 需要做；need doing = need to be done 需要被…。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-wn-hero.jpg",
    "buckets": [
      {
        "key": "want",
        "label": "want to do"
      },
      {
        "key": "need",
        "label": "need to / need doing"
      }
    ],
    "items": [
      {
        "text": "want to join",
        "bucket": "want"
      },
      {
        "text": "need to study",
        "bucket": "need"
      },
      {
        "text": "want to be a doctor",
        "bucket": "want"
      },
      {
        "text": "need repairing",
        "bucket": "need"
      },
      {
        "text": "want to learn English",
        "bucket": "want"
      },
      {
        "text": "need washing",
        "bucket": "need"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-wn-hero.jpg",
    "lead": "want 与 need 的两套结构。",
    "rules": [
      {
        "tab": "want to",
        "rule": "want to + 动词原形（想要做）",
        "focusVerb": "want",
        "examples": [
          {
            "from": "join",
            "to": "want to join"
          }
        ],
        "sample": "I want to join the art club.",
        "sampleZh": "我想加入美术社团。"
      },
      {
        "tab": "need",
        "rule": "need to do 需要做；need doing = need to be done 需要被…",
        "focusVerb": "need",
        "examples": [
          {
            "from": "repair",
            "to": "needs repairing"
          },
          {
            "from": "wash",
            "to": "needs washing"
          }
        ],
        "sample": "The window needs repairing.",
        "sampleZh": "窗户需要修理。"
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
    "image": "w5-wn-hero.jpg",
    "q": "My hair is dirty. It needs _____.",
    "opts": [
      "wash",
      "washing",
      "to wash"
    ],
    "ans": 1,
    "hint": "need doing = 需要被洗，hair needs washing。",
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-wn-hero.jpg",
    "audio": "I want to join the art club.",
    "tokens": [
      "I",
      "want",
      "to",
      "join",
      "the",
      "art",
      "club"
    ],
    "sentence": "I want to join the art club.",
    "zh": "我想加入美术社团。"
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
      "want to do 想要做",
      "need to do 需要做",
      "need doing = need to be done"
    ],
    "chant": "Want to do — that's your goal! Need doing — passive role!",
    "chantSpeak": "Want to do, that is your goal! Need doing, passive role!"
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