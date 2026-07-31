(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 她每周六做什么？",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "She plays football every Saturday.",
    "soundHint": "主语是 she，听听动词有什么特别？",
    "question": "动词 play 为什么变成了 plays？",
    "sentence": "She plays football every Saturday.",
    "zh": "她每周六踢足球。",
    "image": "kp3-girl-football.jpg",
    "source": "PSLE · 三单高频"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 什么时候加 -s？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "kp3-girl-football.jpg",
    "question": "一般现在时中，什么时候动词要加 -s 或 -es？",
    "choices": [
      {
        "text": "主语是 I 或 you",
        "correct": false,
        "fb": "I/you 用动词原形：I play, you play。"
      },
      {
        "text": "主语是 he / she / it 或单数名词",
        "correct": true,
        "fb": "对了！第三人称单数作主语，动词加 -s/-es。"
      },
      {
        "text": "句子中有 every day",
        "correct": false,
        "fb": "every day 是时间状语，不决定要不要加 -s。"
      }
    ],
    "sentence": "She plays football every Saturday.",
    "zh": "她每周六踢足球。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现 · I play vs She plays",
    "type": "discover",
    "lead": "对比 I 和 She 作主语时，动词形式有什么不同？",
    "leftImage": "kp3-i-play.jpg",
    "rightImage": "kp3-she-plays.jpg",
    "leftLabel": "I play",
    "rightLabel": "She plays",
    "leftSentence": "I play football.",
    "leftZh": "我踢足球。",
    "rightSentence": "She plays football.",
    "rightZh": "她踢足球。",
    "morphBase": "play",
    "morphPast": "plays",
    "morphHighlight": "s",
    "discovery": "I/you/we/they + 动词原形；he/she/it/单数名词 + 动词 -s/-es。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 原形还是三单？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "kp3-classify.jpg",
    "lead": "看主语，把动词形式放进正确的篮子。",
    "buckets": [
      {
        "key": "base",
        "label": "动词原形"
      },
      {
        "key": "third",
        "label": "第三人称单数 (-s/-es)"
      }
    ],
    "items": [
      {
        "text": "I watch TV.",
        "bucket": "base"
      },
      {
        "text": "He watches TV.",
        "bucket": "third"
      },
      {
        "text": "They go home.",
        "bucket": "base"
      },
      {
        "text": "She goes home.",
        "bucket": "third"
      },
      {
        "text": "We like apples.",
        "bucket": "base"
      },
      {
        "text": "Tom likes apples.",
        "bucket": "third"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "拼写规则卡 · -s / -es",
    "type": "spelling",
    "image": "kp3-spell-rules.jpg",
    "lead": "三单动词变化有三种常见情况。",
    "rules": [
      {
        "tab": "直接 +s",
        "rule": "大多数动词：直接加 -s",
        "focusVerb": "plays",
        "examples": [
          {
            "from": "play",
            "to": "plays"
          },
          {
            "from": "like",
            "to": "likes"
          },
          {
            "from": "want",
            "to": "wants"
          }
        ],
        "sample": "She plays football every Saturday.",
        "sampleZh": "她每周六踢足球。"
      },
      {
        "tab": "+es",
        "rule": "以 s/x/ch/sh/o 结尾：加 -es",
        "focusVerb": "watches",
        "examples": [
          {
            "from": "watch",
            "to": "watches"
          },
          {
            "from": "go",
            "to": "goes"
          },
          {
            "from": "wash",
            "to": "washes"
          }
        ],
        "sample": "Tom watches TV after dinner.",
        "sampleZh": "汤姆晚饭后看电视。"
      },
      {
        "tab": "y→ies",
        "rule": "辅音+y 结尾：变 y 为 i 加 -es",
        "focusVerb": "studies",
        "examples": [
          {
            "from": "study",
            "to": "studies"
          },
          {
            "from": "fly",
            "to": "flies"
          },
          {
            "from": "try",
            "to": "tries"
          }
        ],
        "sample": "Emma studies English every evening.",
        "sampleZh": "艾玛每天晚上学英语。"
      }
    ]
  },
  {
    "id": "p06",
    "section": "闯关",
    "title": "限时快选 · PSLE 否定句",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "kp3-linda-volley.jpg",
    "q": "Linda _____ have any volleyballs. (否定)",
    "opts": [
      "don't",
      "doesn't",
      "isn't"
    ],
    "ans": 1,
    "hint": "Linda 是第三人称单数，否定用 doesn't + 动词原形。",
    "sentence": "Linda doesn't have any volleyballs.",
    "zh": "琳达没有排球。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 三单句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "kp3-cat-mice.jpg",
    "audio": "My cat catches mice at night.",
    "tokens": [
      "My",
      "cat",
      "catches",
      "mice",
      "at",
      "night"
    ],
    "sentence": "My cat catches mice at night.",
    "zh": "我的猫晚上抓老鼠。"
  },
  {
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · 三单口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "kp3-writing.jpg",
    "checklist": [
      "he/she/it/单数名词 → 动词 -s/-es",
      "否定：doesn't + 动词原形（Linda doesn't have…）",
      "疑问：Does he play…? — Yes, he does.",
      "写作常错：Tom like → Tom likes；He don't → He doesn't"
    ],
    "chant": "He, she, it — add s or es! Doesn't plus base form — remember this!",
    "chantSpeak": "He, she, it, add s or es! Doesn't plus base form, remember this!"
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