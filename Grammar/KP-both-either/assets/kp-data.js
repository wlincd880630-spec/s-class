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
    "audio": "Both my father and my mother are doctors.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。",
    "image": "w5-both-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-both-hero.jpg",
    "question": "Both A and B 后面动词用什么数？",
    "choices": [
      {
        "text": "复数（are）",
        "correct": true,
        "fb": "对了！both 表示两者都，动词用复数。"
      },
      {
        "text": "单数（is）",
        "correct": false,
        "fb": "both 强调两个，谓语用复数。"
      },
      {
        "text": "与 B 一致即可",
        "correct": false,
        "fb": "both…and 固定用复数谓语。"
      }
    ],
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-both-and.jpg",
    "rightImage": "w5-both-either.jpg",
    "leftLabel": "both…and 两者都",
    "rightLabel": "either…or 要么…要么",
    "leftSentence": "Both Tom and Jim are good at maths.",
    "leftZh": "汤姆和吉姆都擅长数学。",
    "rightSentence": "You can either stay or go.",
    "rightZh": "你可以留下，也可以走。",
    "morphBase": "both…and",
    "morphPast": "either…or",
    "morphHighlight": "",
    "discovery": "both…and 两者都，动词复数；either…or 二选一；neither…nor 两者都不。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-both-hero.jpg",
    "buckets": [
      {
        "key": "both",
        "label": "both…and"
      },
      {
        "key": "either",
        "label": "either…or / neither…nor"
      }
    ],
    "items": [
      {
        "text": "Both A and B are here.",
        "bucket": "both"
      },
      {
        "text": "Either tea or coffee",
        "bucket": "either"
      },
      {
        "text": "Both cats and dogs",
        "bucket": "both"
      },
      {
        "text": "Either you or I am wrong.",
        "bucket": "either"
      },
      {
        "text": "Both hands are clean.",
        "bucket": "both"
      },
      {
        "text": "Neither Tom nor Jim came.",
        "bucket": "either"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-both-hero.jpg",
    "lead": "三组关联连词。",
    "rules": [
      {
        "tab": "both…and",
        "rule": "两者都；谓语动词用复数",
        "focusVerb": "both",
        "examples": [
          {
            "from": "father and mother",
            "to": "Both are doctors"
          }
        ],
        "sample": "Both my father and my mother are doctors.",
        "sampleZh": "我爸爸和妈妈都是医生。"
      },
      {
        "tab": "either…or",
        "rule": "要么…要么（二选一）；就近原则",
        "focusVerb": "either",
        "examples": [
          {
            "from": "stay or go",
            "to": "either…or"
          },
          {
            "from": "neither…nor",
            "to": "两者都不"
          }
        ],
        "sample": "You can either stay or go.",
        "sampleZh": "你可以留下，也可以走。"
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
    "image": "w5-both-hero.jpg",
    "q": "Both my brother and my sister _____ good at swimming.",
    "opts": [
      "is",
      "are",
      "am"
    ],
    "ans": 1,
    "hint": "both…and 后动词用复数 are。",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-both-hero.jpg",
    "audio": "Both my father and my mother are doctors.",
    "tokens": [
      "Both",
      "my",
      "father",
      "and",
      "my",
      "mother",
      "are",
      "doctors"
    ],
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
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
      "both…and 两者都，动词复数",
      "either…or 二选一",
      "neither…nor 两者都不"
    ],
    "chant": "Both and both — plural verb! Either or — choose one, you heard!",
    "chantSpeak": "Both and both, plural verb! Either or, choose one, you heard!"
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