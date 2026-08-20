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
    "section": "导入",
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
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "kp3-girl-football.jpg",
    "lead": "主语是 he / she / it / 人名 / 单数名词时，实义动词要加 -s 或 -es。",
    "formula": "He / She / It + 动词-s/-es",
    "parts": [
      {
        "mark": "主语",
        "label": "三单",
        "example": "She / Tom / The cat"
      },
      {
        "mark": "动词",
        "label": "+s / +es / y→ies",
        "example": "plays / watches / flies"
      },
      {
        "mark": "否定",
        "label": "doesn't + 原形",
        "example": "doesn't play"
      }
    ],
    "samples": [
      {
        "sentence": "She plays football every Saturday.",
        "zh": "她每周六踢足球。"
      },
      {
        "sentence": "Linda doesn't have any volleyballs.",
        "zh": "琳达没有排球。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
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
    "section": "精讲",
    "title": "例句 · 每周六踢球",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3-girl-football.jpg",
    "lead": "She → plays，不是 play。",
    "sentence": "She plays football every Saturday.",
    "zh": "她每周六踢足球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 猫捉老鼠",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3-girl-football.jpg",
    "lead": "catch → catches（ch 结尾加 es）。",
    "sentence": "My cat catches mice at night.",
    "zh": "我的猫晚上捉老鼠。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
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
    "id": "p08",
    "section": "辨析",
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
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "kp3-girl-football.jpg",
    "question": "「Tom like apples.」应改成？",
    "choices": [
      {
        "text": "Tom likes apples.",
        "correct": true,
        "fb": "Tom = he，动词加 s。"
      },
      {
        "text": "Tom liking apples.",
        "correct": false,
        "fb": "一般现在时不用 -ing（除非有 be）。"
      },
      {
        "text": "Tom is like apples.",
        "correct": false,
        "fb": "like 表喜欢时是实义动词。"
      }
    ],
    "sentence": "Tom likes apples.",
    "zh": "汤姆喜欢苹果。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "kp3-girl-football.jpg",
    "lead": "三单否定用 doesn't + 原形；疑问 Does + 主语 + 原形？",
    "items": [
      {
        "from": "She plays football every Saturday.",
        "fromZh": "她每周六踢足球。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "She doesn't play football every Saturday.",
              "She doesn't plays football every Saturday.",
              "She don't play football every Saturday."
            ],
            "ans": 0,
            "hint": "doesn't 后必须是原形 play。",
            "sentence": "She doesn't play football every Saturday.",
            "zh": "她周六不踢足球。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Does she play football every Saturday?",
              "Do she play football every Saturday?",
              "Does she plays football every Saturday?"
            ],
            "ans": 0,
            "hint": "Does + 主语 + 原形？",
            "sentence": "Does she play football every Saturday?",
            "zh": "她每周六踢足球吗？"
          }
        ]
      }
    ],
    "id": "p10"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3-girl-football.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "My",
      "cat",
      "catches",
      "mice",
      "at",
      "night"
    ],
    "sentence": "My cat catches mice at night.",
    "zh": "我的猫晚上抓老鼠。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
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
    "id": "p13",
    "section": "检测",
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
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "kp3-girl-football.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
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
        "q": "He _____ to school by bus.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "He → goes。",
        "sentence": "He goes to school by bus.",
        "zh": "他乘公交上学。"
      },
      {
        "q": "The train _____ at nine.",
        "opts": [
          "leave",
          "leaves",
          "leaving"
        ],
        "ans": 1,
        "hint": "The train = it → leaves。",
        "sentence": "The train leaves at nine.",
        "zh": "火车九点出发。"
      },
      {
        "q": "_____ Emma play badminton?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "Emma 三单 → Does。",
        "sentence": "Does Emma play badminton?",
        "zh": "艾玛打羽毛球吗？"
      },
      {
        "q": "My brother _____ TV in the evening. （否定）",
        "opts": [
          "don't watch",
          "doesn't watch",
          "doesn't watches"
        ],
        "ans": 1,
        "hint": "doesn't + 原形 watch。",
        "sentence": "My brother doesn't watch TV in the evening.",
        "zh": "我哥哥晚上不看电视。"
      },
      {
        "q": "Mr Wang _____ science.",
        "opts": [
          "teach",
          "teaches",
          "teaching"
        ],
        "ans": 1,
        "hint": "ch 结尾加 es。",
        "sentence": "Mr Wang teaches science.",
        "zh": "王老师教科学。"
      }
    ],
    "id": "p14"
  },
  {
    "section": "检测",
    "title": "限时挑战 60 秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "lead": "对照初中课堂竞赛：60 秒内尽量多答对。",
    "seconds": 60,
    "perQuestion": 12,
    "pass": 4,
    "questions": [
      {
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
        "q": "He _____ to school by bus.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "He → goes。",
        "sentence": "He goes to school by bus.",
        "zh": "他乘公交上学。"
      },
      {
        "q": "The train _____ at nine.",
        "opts": [
          "leave",
          "leaves",
          "leaving"
        ],
        "ans": 1,
        "hint": "The train = it → leaves。",
        "sentence": "The train leaves at nine.",
        "zh": "火车九点出发。"
      },
      {
        "q": "_____ Emma play badminton?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "Emma 三单 → Does。",
        "sentence": "Does Emma play badminton?",
        "zh": "艾玛打羽毛球吗？"
      },
      {
        "q": "My brother _____ TV in the evening. （否定）",
        "opts": [
          "don't watch",
          "doesn't watch",
          "doesn't watches"
        ],
        "ans": 1,
        "hint": "doesn't + 原形 watch。",
        "sentence": "My brother doesn't watch TV in the evening.",
        "zh": "我哥哥晚上不看电视。"
      },
      {
        "q": "Mr Wang _____ science.",
        "opts": [
          "teach",
          "teaches",
          "teaching"
        ],
        "ans": 1,
        "hint": "ch 结尾加 es。",
        "sentence": "Mr Wang teaches science.",
        "zh": "王老师教科学。"
      }
    ],
    "id": "p15"
  },
  {
    "section": "检测",
    "title": "连对闯关",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "lead": "连续答对 5 题通关，答错连击清零。",
    "target": 5,
    "questions": [
      {
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
        "q": "He _____ to school by bus.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "He → goes。",
        "sentence": "He goes to school by bus.",
        "zh": "他乘公交上学。"
      },
      {
        "q": "The train _____ at nine.",
        "opts": [
          "leave",
          "leaves",
          "leaving"
        ],
        "ans": 1,
        "hint": "The train = it → leaves。",
        "sentence": "The train leaves at nine.",
        "zh": "火车九点出发。"
      },
      {
        "q": "_____ Emma play badminton?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "Emma 三单 → Does。",
        "sentence": "Does Emma play badminton?",
        "zh": "艾玛打羽毛球吗？"
      },
      {
        "q": "My brother _____ TV in the evening. （否定）",
        "opts": [
          "don't watch",
          "doesn't watch",
          "doesn't watches"
        ],
        "ans": 1,
        "hint": "doesn't + 原形 watch。",
        "sentence": "My brother doesn't watch TV in the evening.",
        "zh": "我哥哥晚上不看电视。"
      },
      {
        "q": "Mr Wang _____ science.",
        "opts": [
          "teach",
          "teaches",
          "teaching"
        ],
        "ans": 1,
        "hint": "ch 结尾加 es。",
        "sentence": "Mr Wang teaches science.",
        "zh": "王老师教科学。"
      }
    ],
    "id": "p16"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "kp3-girl-football.jpg",
    "pairs": [
      {
        "en": "plays",
        "zh": "（他/她）玩/打"
      },
      {
        "en": "doesn't",
        "zh": "不（三单）"
      },
      {
        "en": "Does he…?",
        "zh": "他……吗？"
      },
      {
        "en": "watches",
        "zh": "看（三单）"
      }
    ],
    "id": "p17"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "kp3-girl-football.jpg",
    "audio": "My cat catches mice at night.",
    "opts": [
      "My cat catches mice at night.",
      "She play football every Saturday.",
      "She playing football every Saturday."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "My cat catches mice at night.",
    "zh": "我的猫晚上抓老鼠。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "kp3-writing.jpg",
    "checklist": [
      "he/she/it/单数名词 → 动词 -s/-es",
      "否定：doesn't + 动词原形（Linda doesn't have…）",
      "疑问：Does he play…? — Yes, he does.",
      "写作常错：Tom like → Tom likes；He don't → He doesn't",
      "has 是 have 的三单，不是 haves。",
      "goes / does / watches 记特殊拼写。"
    ],
    "chant": "He, she, it — add s or es! Doesn't plus base form — remember this!",
    "chantSpeak": "He, she, it, add s or es! Doesn't plus base form, remember this!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "一般现在时 · 第三人称单数",
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