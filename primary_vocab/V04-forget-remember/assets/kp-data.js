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
    "audio": "Please don't forget to give this book to Mr. Zhang.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "Please don't forget to give this book to Mr. Zhang.",
    "zh": "请不要忘记把这本书交给张老师。",
    "image": "v04-forget-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "v04-forget-hero.jpg",
    "question": "forget to give 表示「忘了给」还是「忘了曾经给过」？",
    "choices": [
      {
        "text": "忘记要去做（事还没做）",
        "correct": true,
        "fb": "对了！to do = 忘记将要做的事。"
      },
      {
        "text": "忘记曾经做过",
        "correct": false,
        "fb": "那是 forget doing。"
      },
      {
        "text": "记得要给",
        "correct": false,
        "fb": "forget 是忘记。"
      }
    ],
    "sentence": "Please don't forget to give this book to Mr. Zhang.",
    "zh": "请不要忘记把这本书交给张老师。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "v04-todo.jpg",
    "rightImage": "v04-doing.jpg",
    "leftLabel": "forget to do",
    "rightLabel": "forget doing",
    "leftSentence": "Don't forget to lock the door.",
    "leftZh": "别忘了锁门。（还没锁）",
    "rightSentence": "I'll never forget meeting her.",
    "rightZh": "我永远不会忘记见过她。（已发生）",
    "morphBase": "to do",
    "morphPast": "doing",
    "morphHighlight": "",
    "discovery": "to do：忘记/记得将要做；doing：忘记/记得曾经做过。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "v04-forget-hero.jpg",
    "buckets": [
      {
        "key": "todo",
        "label": "to do（将要做）"
      },
      {
        "key": "doing",
        "label": "doing（已做过）"
      }
    ],
    "items": [
      {
        "text": "forget to call",
        "bucket": "todo"
      },
      {
        "text": "forget calling",
        "bucket": "doing"
      },
      {
        "text": "remember to buy",
        "bucket": "todo"
      },
      {
        "text": "remember buying",
        "bucket": "doing"
      },
      {
        "text": "forget to bring",
        "bucket": "todo"
      },
      {
        "text": "remember meeting",
        "bucket": "doing"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "v04-forget-hero.jpg",
    "rules": [
      {
        "tab": "to do",
        "rule": "forget/remember + to do：忘记/记得将要做",
        "focusVerb": "to give",
        "examples": [
          {
            "from": "give",
            "to": "forget to give"
          },
          {
            "from": "bring",
            "to": "remember to bring"
          }
        ],
        "sample": "Please don't forget to give this book to Mr. Zhang.",
        "sampleZh": "请不要忘记把这本书交给张老师。"
      },
      {
        "tab": "doing",
        "rule": "forget/remember + doing：忘记/记得曾经做过",
        "focusVerb": "meeting",
        "examples": [
          {
            "from": "meet",
            "to": "forget meeting"
          }
        ],
        "sample": "I remember meeting him at the party.",
        "sampleZh": "我记得在聚会上见过他。"
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
    "image": "v04-forget-hero.jpg",
    "q": "Please don't forget _____ this book to Mr. Zhang.",
    "opts": [
      "give",
      "to give",
      "giving"
    ],
    "ans": 1,
    "hint": "忘记要去做 → forget to do。",
    "sentence": "Please don't forget to give this book to Mr. Zhang.",
    "zh": "请不要忘记把这本书交给张老师。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "v04-forget-hero.jpg",
    "audio": "Remember to hand in your homework.",
    "tokens": [
      "Remember",
      "to",
      "hand",
      "in",
      "your",
      "homework"
    ],
    "sentence": "Remember to hand in your homework.",
    "zh": "记得交作业。"
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
      "forget/remember + to do：将要做",
      "forget/remember + doing：已做过",
      "PSLE：forget to give / remember to bring"
    ],
    "chant": "To do — not yet done! Doing — already one!",
    "chantSpeak": "To do, not yet done! Doing, already one!"
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