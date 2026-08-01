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
    "audio": "He stopped to have a rest.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息了一会儿。",
    "image": "w4-stop-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w4-stop-hero.jpg",
    "question": "stop to have a rest 是什么意思？",
    "choices": [
      {
        "text": "停下来，目的是去休息",
        "correct": true,
        "fb": "对了！stop to do = 停下来去做某事。"
      },
      {
        "text": "停止休息",
        "correct": false,
        "fb": "停止休息是 stop having a rest / stop resting。"
      },
      {
        "text": "试着休息",
        "correct": false,
        "fb": "试着用 try to do。"
      }
    ],
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息了一会儿。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w4-stop-to.jpg",
    "rightImage": "w4-stop-ing.jpg",
    "leftLabel": "stop to do",
    "rightLabel": "stop doing",
    "leftSentence": "He stopped to tie his shoes.",
    "leftZh": "他停下来系鞋带。",
    "rightSentence": "He stopped talking.",
    "rightZh": "他停止了说话。",
    "morphBase": "stop to",
    "morphPast": "stop doing",
    "morphHighlight": "",
    "discovery": "stop to do 停下→去做；stop doing 停止正在做；try to do 努力；try doing 尝试。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w4-stop-hero.jpg",
    "buckets": [
      {
        "key": "to",
        "label": "stop/try + to do"
      },
      {
        "key": "ing",
        "label": "stop/try + doing"
      }
    ],
    "items": [
      {
        "text": "stop to rest",
        "bucket": "to"
      },
      {
        "text": "stop playing",
        "bucket": "ing"
      },
      {
        "text": "try to finish",
        "bucket": "to"
      },
      {
        "text": "try swimming",
        "bucket": "ing"
      },
      {
        "text": "stop to buy water",
        "bucket": "to"
      },
      {
        "text": "stop crying",
        "bucket": "ing"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w4-stop-hero.jpg",
    "lead": "stop 与 try 的两套结构。",
    "rules": [
      {
        "tab": "stop",
        "rule": "stop to do 停下来去做；stop doing 停止正在做",
        "focusVerb": "stop",
        "examples": [
          {
            "from": "stop to rest",
            "to": "停下来休息"
          },
          {
            "from": "stop talking",
            "to": "停止说话"
          }
        ],
        "sample": "He stopped to have a rest.",
        "sampleZh": "他停下来休息了一会儿。"
      },
      {
        "tab": "try",
        "rule": "try to do 努力做；try doing 尝试做",
        "focusVerb": "try",
        "examples": [
          {
            "from": "try to pass",
            "to": "努力通过"
          },
          {
            "from": "try cooking",
            "to": "尝试做饭"
          }
        ],
        "sample": "Try to finish your homework first.",
        "sampleZh": "先努力完成作业。"
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
    "image": "w4-stop-hero.jpg",
    "q": "The teacher told us to stop _____ and listen.",
    "opts": [
      "talk",
      "to talk",
      "talking"
    ],
    "ans": 2,
    "hint": "stop doing = 停止正在做的事。",
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息了一会儿。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w4-stop-hero.jpg",
    "audio": "He stopped to have a rest.",
    "tokens": [
      "He",
      "stopped",
      "to",
      "have",
      "a",
      "rest"
    ],
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息了一会儿。"
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
      "stop to do = 停下来去做",
      "stop doing = 停止正在做",
      "try to do 努力；try doing 尝试"
    ],
    "chant": "Stop to do — pause and go! Stop doing — no more, you know!",
    "chantSpeak": "Stop to do, pause and go! Stop doing, no more, you know!"
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