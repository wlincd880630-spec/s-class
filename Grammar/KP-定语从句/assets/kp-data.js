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
    "audio": "The boy who lives next door is my friend.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。",
    "image": "w5-rel-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-rel-hero.jpg",
    "question": "who lives next door 修饰的是谁？",
    "choices": [
      {
        "text": "the boy（指人，用 who）",
        "correct": true,
        "fb": "对了！who 引导定语从句修饰人。"
      },
      {
        "text": "next door（指地点）",
        "correct": false,
        "fb": "next door 是地点状语，不是先行词。"
      },
      {
        "text": "friend（用 which）",
        "correct": false,
        "fb": "先行词是 boy，指人用 who。"
      }
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-rel-who.jpg",
    "rightImage": "w5-rel-which.jpg",
    "leftLabel": "who 指人",
    "rightLabel": "which/that 指物",
    "leftSentence": "The girl who sings well is my sister.",
    "leftZh": "唱歌好的那个女孩是我姐姐。",
    "rightSentence": "The book which is on the desk is mine.",
    "rightZh": "桌上那本书是我的。",
    "morphBase": "who",
    "morphPast": "which",
    "morphHighlight": "",
    "discovery": "who 指人；which/that 指物；定语从句紧跟先行词，说明是哪一个。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-rel-hero.jpg",
    "buckets": [
      {
        "key": "who",
        "label": "who 指人"
      },
      {
        "key": "which",
        "label": "which/that 指物"
      }
    ],
    "items": [
      {
        "text": "The man who teaches us",
        "bucket": "who"
      },
      {
        "text": "The dog which is cute",
        "bucket": "which"
      },
      {
        "text": "The student who runs fast",
        "bucket": "who"
      },
      {
        "text": "The film that we watched",
        "bucket": "which"
      },
      {
        "text": "The teacher who is kind",
        "bucket": "who"
      },
      {
        "text": "The bag that is red",
        "bucket": "which"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-rel-hero.jpg",
    "lead": "关系代词 who / which / that。",
    "rules": [
      {
        "tab": "who",
        "rule": "先行词是人 → who + 从句",
        "focusVerb": "who",
        "examples": [
          {
            "from": "the boy",
            "to": "who lives next door"
          }
        ],
        "sample": "The boy who lives next door is my friend.",
        "sampleZh": "住在隔壁的那个男孩是我的朋友。"
      },
      {
        "tab": "which/that",
        "rule": "先行词是物 → which 或 that + 从句",
        "focusVerb": "which",
        "examples": [
          {
            "from": "the book",
            "to": "which is on the desk"
          }
        ],
        "sample": "The book which is on the desk is mine.",
        "sampleZh": "桌上那本书是我的。"
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
    "image": "w5-rel-hero.jpg",
    "q": "The girl _____ won the race is from our class.",
    "opts": [
      "which",
      "who",
      "what"
    ],
    "ans": 1,
    "hint": "先行词 the girl 指人，用 who。",
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-rel-hero.jpg",
    "audio": "The boy who lives next door is my friend.",
    "tokens": [
      "The",
      "boy",
      "who",
      "lives",
      "next",
      "door",
      "is",
      "my",
      "friend"
    ],
    "sentence": "The boy who lives next door is my friend.",
    "zh": "住在隔壁的那个男孩是我的朋友。"
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
      "who 修饰人",
      "which/that 修饰物",
      "定语从句紧跟先行词"
    ],
    "chant": "Who for people, which for things — that's the link that grammar brings!",
    "chantSpeak": "Who for people, which for things, that is the link that grammar brings!"
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