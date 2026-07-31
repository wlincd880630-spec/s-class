(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 两座图书馆",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "There are two libraries in our school.",
    "soundHint": "two 后面名词是什么形式？",
    "question": "library 的复数怎么写？",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。",
    "image": "l06-libraries.jpg",
    "source": "PSLE Set 16 · 真题"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 什么时候用复数？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l06-libraries.jpg",
    "question": "「two libraries」为什么用 libraries 而不是 librarys？",
    "choices": [
      {
        "text": "因为 two 后面永远加 s",
        "correct": false,
        "fb": "要看名词结尾字母，辅音+y 要变 y 为 i 再加 es。"
      },
      {
        "text": "library 以辅音+y 结尾，变 y 为 i 加 es",
        "correct": true,
        "fb": "对了！library → libraries。"
      },
      {
        "text": "library 是不可数名词",
        "correct": false,
        "fb": "library 可数，有单复数。"
      }
    ],
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现 · 规则 vs 不规则",
    "type": "discover",
    "lead": "有的名词加 -s，有的要整个变化。",
    "leftImage": "l06-book-books.jpg",
    "rightImage": "l06-child-children.jpg",
    "leftLabel": "book → books（规则）",
    "rightLabel": "child → children（不规则）",
    "leftSentence": "I have two books.",
    "leftZh": "我有两本书。",
    "rightSentence": "Three children are playing.",
    "rightZh": "三个孩子在玩。",
    "morphBase": "child",
    "morphPast": "children",
    "morphHighlight": "ren",
    "discovery": "大多数名词加 -s/-es；少数名词复数形式特殊，要单独记忆。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 规则还是不规则？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l06-classify.jpg",
    "lead": "这些复数形式是规则变化还是不规则变化？",
    "buckets": [
      {
        "key": "regular",
        "label": "规则复数 (+s/es)"
      },
      {
        "key": "irregular",
        "label": "不规则复数"
      }
    ],
    "items": [
      {
        "text": "books",
        "bucket": "regular"
      },
      {
        "text": "children",
        "bucket": "irregular"
      },
      {
        "text": "libraries",
        "bucket": "regular"
      },
      {
        "text": "feet",
        "bucket": "irregular"
      },
      {
        "text": "boxes",
        "bucket": "regular"
      },
      {
        "text": "mice",
        "bucket": "irregular"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "拼写规则卡 · 复数变化",
    "type": "spelling",
    "image": "l06-spell-rules.jpg",
    "lead": "小升初常考三类规则 + 高频不规则。",
    "rules": [
      {
        "tab": "规则 +s/es",
        "rule": "一般加 -s；s/x/ch/sh 加 -es；辅音+y 变 i 加 es",
        "focusVerb": "libraries",
        "examples": [
          {
            "from": "book",
            "to": "books"
          },
          {
            "from": "box",
            "to": "boxes"
          },
          {
            "from": "library",
            "to": "libraries"
          }
        ],
        "sample": "There are two libraries in our school.",
        "sampleZh": "我们学校有两座图书馆。"
      },
      {
        "tab": "不规则",
        "rule": "高频不规则：整词变化，需背诵",
        "focusVerb": "children",
        "examples": [
          {
            "from": "child",
            "to": "children"
          },
          {
            "from": "foot",
            "to": "feet"
          },
          {
            "from": "mouse",
            "to": "mice"
          },
          {
            "from": "tooth",
            "to": "teeth"
          },
          {
            "from": "man",
            "to": "men"
          }
        ],
        "sample": "Three children are playing in the park.",
        "sampleZh": "三个孩子在公园玩。"
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
    "image": "l06-libraries.jpg",
    "q": "There are two _____ in our school. (library)",
    "opts": [
      "library",
      "libraries",
      "librarys"
    ],
    "ans": 1,
    "hint": "two + 复数；辅音+y 变 i 加 es。",
    "sentence": "There are two libraries in our school.",
    "zh": "我们学校有两座图书馆。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 不规则复数句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l06-feet-tired.jpg",
    "audio": "My feet are tired after the long walk.",
    "tokens": [
      "My",
      "feet",
      "are",
      "tired",
      "after",
      "the",
      "long",
      "walk"
    ],
    "sentence": "My feet are tired after the long walk.",
    "zh": "长途步行后我的脚累了。"
  },
  {
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · 复数口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "l06-writing.jpg",
    "checklist": [
      "数词>1 或 some/many/two → 可数名词用复数",
      "规则：books, boxes, libraries（y→ies）",
      "不规则必背：child→children, foot→feet, mouse→mice, man→men",
      "写作：Three children played; their feet were tired."
    ],
    "chant": "More than one? Plural form! child-children, foot-feet — learn the storm!",
    "chantSpeak": "More than one, plural form! child children, foot feet, learn the storm!"
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