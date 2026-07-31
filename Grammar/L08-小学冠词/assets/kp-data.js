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
    "audio": "I saw a cat. The cat was very cute.",
    "soundHint": "先听，不要看文字。",
    "question": "第一次提到用 a，第二次呢？",
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。",
    "image": "l09-articles-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l09-articles-hero.jpg",
    "question": "为什么第一个空是 a，第二个是 the？",
    "choices": [
      {
        "text": "第一次泛指用 a，第二次特指用 the",
        "correct": true,
        "fb": "对了！a/an 首次提及，the 再次提及。"
      },
      {
        "text": "cat 永远用 the",
        "correct": false,
        "fb": "第一次提到一般用 a cat。"
      },
      {
        "text": "两个空都用 an",
        "correct": false,
        "fb": "cat 以辅音音素开头，用 a。"
      }
    ],
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l09-a.jpg",
    "rightImage": "l09-the.jpg",
    "leftLabel": "a 泛指",
    "rightLabel": "the 特指",
    "leftSentence": "I have a book.",
    "leftZh": "我有一本书。（任意一本）",
    "rightSentence": "The book is on the desk.",
    "rightZh": "那本书在桌上。（双方都知道）",
    "morphBase": "a",
    "morphPast": "the",
    "morphHighlight": "",
    "discovery": "a/an 表「一个」泛指；the 表双方都知道的那個。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l09-articles-hero.jpg",
    "buckets": [
      {
        "key": "a",
        "label": "a / an"
      },
      {
        "key": "the",
        "label": "the 特指"
      }
    ],
    "items": [
      {
        "text": "I ate an apple.",
        "bucket": "a"
      },
      {
        "text": "The apple was sweet.",
        "bucket": "the"
      },
      {
        "text": "She is a teacher.",
        "bucket": "a"
      },
      {
        "text": "Open the door, please.",
        "bucket": "the"
      },
      {
        "text": "He has an umbrella.",
        "bucket": "a"
      },
      {
        "text": "The sun is bright.",
        "bucket": "the"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l09-articles-hero.jpg",
    "rules": [
      {
        "tab": "a/an",
        "rule": "辅音音素开头用 a；元音音素开头用 an",
        "focusVerb": "an",
        "examples": [
          {
            "from": "book",
            "to": "a book"
          },
          {
            "from": "apple",
            "to": "an apple"
          },
          {
            "from": "hour",
            "to": "an hour"
          }
        ],
        "sample": "It is an hour's walk to the park.",
        "sampleZh": "走到公园要一小时。"
      },
      {
        "tab": "the",
        "rule": "再次提及、独一无二、双方都知道 → the",
        "focusVerb": "the",
        "examples": [
          {
            "from": "第二次",
            "to": "the cat"
          },
          {
            "from": "the sun",
            "to": "独一无二"
          }
        ],
        "sample": "I saw a cat. The cat was very cute.",
        "sampleZh": "我看见一只猫，那只猫很可爱。"
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
    "image": "l09-articles-hero.jpg",
    "q": "My father is _____ honest man.",
    "opts": [
      "a",
      "an",
      "the"
    ],
    "ans": 1,
    "hint": "honest 发音以元音 /ɒ/ 开头，用 an。",
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l09-articles-hero.jpg",
    "audio": "I saw a cat. The cat was very cute.",
    "tokens": [
      "I",
      "saw",
      "a",
      "cat",
      "The",
      "cat",
      "was",
      "very",
      "cute"
    ],
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。"
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
      "辅音音素 → a；元音音素 → an（hour, honest 用 an）",
      "再次提到 → the",
      "写作：I bought a pen. The pen writes well."
    ],
    "chant": "First time a or an, next time the! Vowel sound? An — you'll see!",
    "chantSpeak": "First time a or an, next time the! Vowel sound, an, you will see!"
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