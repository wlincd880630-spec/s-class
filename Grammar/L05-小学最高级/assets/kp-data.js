(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 最美丽的海滩",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "Yalong Bay is one of the most beautiful beaches in China.",
    "soundHint": "先听！他们在说「最……」还是「比……更……」？",
    "question": "这句话在说范围内「最」还是「更」？",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。",
    "image": "l05-yalong-beach.jpg",
    "source": "PSLE Set 01 · 真题"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 最高级标志",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l05-yalong-beach.jpg",
    "question": "「one of the most beautiful beaches」中，为什么 beaches 用复数？",
    "choices": [
      {
        "text": "因为 beach 永远是复数",
        "correct": false,
        "fb": "beach 可数，单数是 beach。"
      },
      {
        "text": "因为是「许多海滩中最美的之一」",
        "correct": true,
        "fb": "对了！one of the most + 复数名词 = ……中最……的之一。"
      },
      {
        "text": "因为 Yalong Bay 有很多湾",
        "correct": false,
        "fb": "关键在 one of the most 结构，不是地名。"
      }
    ],
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现 · 比较级 vs 最高级",
    "type": "discover",
    "lead": "比较两件事和在三者以上选「最」，有什么不同？",
    "leftImage": "l05-taller.jpg",
    "rightImage": "l05-tallest.jpg",
    "leftLabel": "比较级 taller than",
    "rightLabel": "最高级 the tallest",
    "leftSentence": "Tom is taller than Jack.",
    "leftZh": "汤姆比杰克高。",
    "rightSentence": "Tom is the tallest boy in our class.",
    "rightZh": "汤姆是我们班最高的男孩。",
    "morphBase": "tall",
    "morphPast": "the tallest",
    "morphHighlight": "est",
    "discovery": "两者比较用 -er + than；三者及以上用 the + -est，常加 in/of 范围。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 比较级还是最高级？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l05-compare-super.jpg",
    "lead": "句子是比两件东西，还是在范围内选「最」？",
    "buckets": [
      {
        "key": "comp",
        "label": "比较级 + than"
      },
      {
        "key": "super",
        "label": "the + 最高级 / one of the most"
      }
    ],
    "items": [
      {
        "text": "She is taller than me.",
        "bucket": "comp"
      },
      {
        "text": "He is the tallest in the team.",
        "bucket": "super"
      },
      {
        "text": "This bag is cheaper than that one.",
        "bucket": "comp"
      },
      {
        "text": "It is one of the most popular books.",
        "bucket": "super"
      },
      {
        "text": "Summer is hotter than spring.",
        "bucket": "comp"
      },
      {
        "text": "Chengdu is one of the most liveable cities.",
        "bucket": "super"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "拼写规则卡 · -est 变化",
    "type": "spelling",
    "image": "l05-spell-rules.jpg",
    "lead": "最高级拼写与比较级类似，只是用 -est。",
    "rules": [
      {
        "tab": "the +est",
        "rule": "短形容词：the + 原级 + -est",
        "focusVerb": "tallest",
        "examples": [
          {
            "from": "tall",
            "to": "the tallest"
          },
          {
            "from": "old",
            "to": "the oldest"
          },
          {
            "from": "young",
            "to": "the youngest"
          }
        ],
        "sample": "Tom is the tallest boy in our class.",
        "sampleZh": "汤姆是我们班最高的男孩。"
      },
      {
        "tab": "one of the most",
        "rule": "长形容词：one of the most + 形容词 + 复数名词",
        "focusVerb": "beautiful",
        "examples": [
          {
            "from": "beautiful",
            "to": "the most beautiful"
          },
          {
            "from": "famous",
            "to": "the most famous"
          },
          {
            "from": "popular",
            "to": "the most popular"
          }
        ],
        "sample": "Yalong Bay is one of the most beautiful beaches in China.",
        "sampleZh": "亚龙湾是中国最美丽的海滩之一。",
        "sampleImage": "l05-yalong-beach.jpg"
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
    "image": "l05-yalong-beach.jpg",
    "q": "Yalong Bay is one of the most beautiful _____ in China.",
    "opts": [
      "beach",
      "beaches",
      "beachs"
    ],
    "ans": 1,
    "hint": "one of the most + 复数名词。",
    "sentence": "Yalong Bay is one of the most beautiful beaches in China.",
    "zh": "亚龙湾是中国最美丽的海滩之一。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 最高级句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "l05-tallest-class.jpg",
    "audio": "Tom is the tallest boy in our class.",
    "tokens": [
      "Tom",
      "is",
      "the",
      "tallest",
      "boy",
      "in",
      "our",
      "class"
    ],
    "sentence": "Tom is the tallest boy in our class.",
    "zh": "汤姆是我们班最高的男孩。"
  },
  {
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · 最高级口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "l05-writing-frame.jpg",
    "checklist": [
      "范围内「最」：the + 最高级 + in/of + 范围",
      "……中最……之一：one of the most + 形容词 + 复数名词",
      "写作：Chengdu is one of the most liveable cities in China.",
      "比较两者仍用比较级 + than，不要混用"
    ],
    "chant": "In a group, use the -est! One of the most + plural — that's the best!",
    "chantSpeak": "In a group, use the est! One of the most plus plural, that is the best!"
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