(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 昨天去买可乐",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "Bob went to buy three bottles of cola.",
    "soundHint": "事情发生在什么时候？动词有什么变化？",
    "question": "go 和 buy 变成了什么？",
    "sentence": "Bob went to buy three bottles of cola.",
    "zh": "鲍勃去买三瓶可乐。",
    "image": "kpp-bob-cola.jpg",
    "source": "PSLE Set 01 · 完形"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 为什么不加 -ed？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "kpp-bob-cola.jpg",
    "question": "为什么不说 goed 和 buyed？",
    "choices": [
      {
        "text": "因为拼写错误",
        "correct": false,
        "fb": "不是错误，是不规则动词有特殊过去式。"
      },
      {
        "text": "go 和 buy 是不规则动词，过去式要单独记",
        "correct": true,
        "fb": "对了！went, bought 是不规则变化。"
      },
      {
        "text": "因为 cola 是不可数名词",
        "correct": false,
        "fb": "与 cola 无关，是动词过去式问题。"
      }
    ],
    "sentence": "Bob went to buy three bottles of cola.",
    "zh": "鲍勃去买三瓶可乐。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "kpp-bob-cola.jpg",
    "lead": "不规则动词不能加 -ed，要单独记过去式。",
    "formula": "yesterday / last… → 过去式（go→went）",
    "parts": [
      {
        "mark": "肯定",
        "label": "不规则过去式",
        "example": "went / bought / saw"
      },
      {
        "mark": "否定",
        "label": "didn't + 原形",
        "example": "didn't go"
      },
      {
        "mark": "疑问",
        "label": "Did + 原形",
        "example": "Did you go?"
      }
    ],
    "samples": [
      {
        "sentence": "Bob went to buy three bottles of cola.",
        "zh": "鲍勃去买了三瓶可乐。"
      },
      {
        "sentence": "We saw a film yesterday evening.",
        "zh": "昨天晚上我们看了一部电影。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现 · 规则 vs 不规则",
    "type": "discover",
    "lead": "played 加 -ed，went 却整词变化。",
    "leftImage": "kpp-played.jpg",
    "rightImage": "kpp-went.jpg",
    "leftLabel": "play → played（规则）",
    "rightLabel": "go → went（不规则）",
    "leftSentence": "We played football yesterday.",
    "leftZh": "我们昨天踢了足球。",
    "rightSentence": "Bob went shopping yesterday.",
    "rightZh": "鲍勃昨天去购物了。",
    "morphBase": "go",
    "morphPast": "went",
    "morphHighlight": "ent",
    "discovery": "规则动词加 -ed；不规则动词过去式要背诵：go→went, buy→bought。"
  },
  {
    "section": "精讲",
    "title": "例句 · went",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kpp-bob-cola.jpg",
    "lead": "go → went，不是 goed。",
    "sentence": "Bob went to buy three bottles of cola.",
    "zh": "鲍勃去买了三瓶可乐。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · saw",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kpp-bob-cola.jpg",
    "lead": "see → saw。",
    "sentence": "We saw a film yesterday evening.",
    "zh": "昨天晚上我们看了一部电影。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
    "section": "精讲",
    "title": "动词卡 · 小升初高频不规则",
    "type": "spelling",
    "image": "kpp-verb-chart.jpg",
    "lead": "分组记忆，每天背一组。",
    "rules": [
      {
        "tab": "出行/买",
        "rule": "go→went · come→came · buy→bought · take→took",
        "focusVerb": "went",
        "examples": [
          {
            "from": "go",
            "to": "went"
          },
          {
            "from": "buy",
            "to": "bought"
          },
          {
            "from": "take",
            "to": "took"
          }
        ],
        "sample": "Bob went to buy three bottles of cola.",
        "sampleZh": "鲍勃去买三瓶可乐。"
      },
      {
        "tab": "看/想/说",
        "rule": "see→saw · think→thought · say→said · tell→told",
        "focusVerb": "thought",
        "examples": [
          {
            "from": "see",
            "to": "saw"
          },
          {
            "from": "think",
            "to": "thought"
          },
          {
            "from": "say",
            "to": "said"
          }
        ],
        "sample": "She thought about the problem carefully.",
        "sampleZh": "她仔细思考了这个问题。"
      },
      {
        "tab": "吃/写/做",
        "rule": "eat→ate · write→wrote · make→made · have→had",
        "focusVerb": "picked",
        "examples": [
          {
            "from": "eat",
            "to": "ate"
          },
          {
            "from": "write",
            "to": "wrote"
          },
          {
            "from": "have",
            "to": "had"
          }
        ],
        "sample": "He picked tomatoes on the farm last weekend.",
        "sampleZh": "上周末他在农场摘西红柿。"
      }
    ]
  },
  {
    "id": "p08",
    "section": "辨析",
    "title": "分类篮 · 规则还是不规则？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "kpp-classify.jpg",
    "lead": "这些过去式是加 -ed 还是不规则？",
    "buckets": [
      {
        "key": "regular",
        "label": "规则 -ed"
      },
      {
        "key": "irregular",
        "label": "不规则"
      }
    ],
    "items": [
      {
        "text": "played",
        "bucket": "regular"
      },
      {
        "text": "went",
        "bucket": "irregular"
      },
      {
        "text": "watched",
        "bucket": "regular"
      },
      {
        "text": "bought",
        "bucket": "irregular"
      },
      {
        "text": "walked",
        "bucket": "regular"
      },
      {
        "text": "thought",
        "bucket": "irregular"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "kpp-bob-cola.jpg",
    "question": "「I didn't went to school yesterday.」错在哪？",
    "choices": [
      {
        "text": "didn't 后面必须用原形 go",
        "correct": true,
        "fb": "Did/didn't 后永远是原形。"
      },
      {
        "text": "yesterday 要改成 tomorrow",
        "correct": false,
        "fb": "yesterday 正是过去标志。"
      },
      {
        "text": "要用 goes",
        "correct": false,
        "fb": "这是过去时。"
      }
    ],
    "sentence": "I didn't go to school yesterday.",
    "zh": "我昨天没去上学。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "kpp-bob-cola.jpg",
    "lead": "不规则动词：否定和疑问都回到原形。",
    "items": [
      {
        "from": "She bought a gift last Sunday.",
        "fromZh": "她上周日买了一份礼物。",
        "steps": [
          {
            "label": "改成否定",
            "opts": [
              "She didn't buy a gift last Sunday.",
              "She didn't bought a gift last Sunday.",
              "She doesn't buy a gift last Sunday."
            ],
            "ans": 0,
            "hint": "didn't + buy（原形）。",
            "sentence": "She didn't buy a gift last Sunday.",
            "zh": "她上周日没买礼物。"
          },
          {
            "label": "改成一般疑问",
            "opts": [
              "Did she buy a gift last Sunday?",
              "Did she bought a gift last Sunday?",
              "Does she buy a gift last Sunday?"
            ],
            "ans": 0,
            "hint": "Did + 原形 buy。",
            "sentence": "Did she buy a gift last Sunday?",
            "zh": "她上周日买礼物了吗？"
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
    "image": "kpp-bob-cola.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "We",
      "saw",
      "a",
      "film",
      "yesterday",
      "evening"
    ],
    "sentence": "We saw a film yesterday evening.",
    "zh": "我们昨晚看了一部电影。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
    "title": "听音排序 · 不规则过去式句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "kpp-see-film.jpg",
    "audio": "We saw a film yesterday evening.",
    "tokens": [
      "We",
      "saw",
      "a",
      "film",
      "yesterday",
      "evening"
    ],
    "sentence": "We saw a film yesterday evening.",
    "zh": "我们昨晚看了一部电影。"
  },
  {
    "id": "p13",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "kpp-pick-tomatoes.jpg",
    "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
    "opts": [
      "pick",
      "picked",
      "picking"
    ],
    "ans": 1,
    "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
    "sentence": "He picked tomatoes on the farm last weekend.",
    "zh": "上周末他在农场摘西红柿。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "kpp-bob-cola.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
        "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
        "opts": [
          "pick",
          "picked",
          "picking"
        ],
        "ans": 1,
        "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
        "sentence": "He picked tomatoes on the farm last weekend.",
        "zh": "上周末他在农场摘西红柿。"
      },
      {
        "q": "He _____ home late last night. (get)",
        "opts": [
          "get",
          "got",
          "gotten"
        ],
        "ans": 1,
        "hint": "get → got。",
        "sentence": "He got home late last night.",
        "zh": "他昨晚很晚到家。"
      },
      {
        "q": "I _____ my keys yesterday. (lose)",
        "opts": [
          "lose",
          "lost",
          "losed"
        ],
        "ans": 1,
        "hint": "lose → lost。",
        "sentence": "I lost my keys yesterday.",
        "zh": "我昨天丢了钥匙。"
      },
      {
        "q": "_____ you see the panda?",
        "opts": [
          "Do",
          "Did",
          "Does"
        ],
        "ans": 1,
        "hint": "过去疑问 Did。",
        "sentence": "Did you see the panda?",
        "zh": "你看见熊猫了吗？"
      },
      {
        "q": "They _____ to Chengdu by train. (go)",
        "opts": [
          "goed",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "go → went。",
        "sentence": "They went to Chengdu by train.",
        "zh": "他们坐火车去了成都。"
      },
      {
        "q": "She _____ a letter to her friend. (write)",
        "opts": [
          "write",
          "wrote",
          "written"
        ],
        "ans": 1,
        "hint": "write → wrote。",
        "sentence": "She wrote a letter to her friend.",
        "zh": "她给朋友写了一封信。"
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
        "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
        "opts": [
          "pick",
          "picked",
          "picking"
        ],
        "ans": 1,
        "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
        "sentence": "He picked tomatoes on the farm last weekend.",
        "zh": "上周末他在农场摘西红柿。"
      },
      {
        "q": "He _____ home late last night. (get)",
        "opts": [
          "get",
          "got",
          "gotten"
        ],
        "ans": 1,
        "hint": "get → got。",
        "sentence": "He got home late last night.",
        "zh": "他昨晚很晚到家。"
      },
      {
        "q": "I _____ my keys yesterday. (lose)",
        "opts": [
          "lose",
          "lost",
          "losed"
        ],
        "ans": 1,
        "hint": "lose → lost。",
        "sentence": "I lost my keys yesterday.",
        "zh": "我昨天丢了钥匙。"
      },
      {
        "q": "_____ you see the panda?",
        "opts": [
          "Do",
          "Did",
          "Does"
        ],
        "ans": 1,
        "hint": "过去疑问 Did。",
        "sentence": "Did you see the panda?",
        "zh": "你看见熊猫了吗？"
      },
      {
        "q": "They _____ to Chengdu by train. (go)",
        "opts": [
          "goed",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "go → went。",
        "sentence": "They went to Chengdu by train.",
        "zh": "他们坐火车去了成都。"
      },
      {
        "q": "She _____ a letter to her friend. (write)",
        "opts": [
          "write",
          "wrote",
          "written"
        ],
        "ans": 1,
        "hint": "write → wrote。",
        "sentence": "She wrote a letter to her friend.",
        "zh": "她给朋友写了一封信。"
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
        "q": "—What did you do last weekend? —I _____ tomatoes on the farm.",
        "opts": [
          "pick",
          "picked",
          "picking"
        ],
        "ans": 1,
        "hint": "last weekend → 一般过去时，pick 的过去式是 picked。",
        "sentence": "He picked tomatoes on the farm last weekend.",
        "zh": "上周末他在农场摘西红柿。"
      },
      {
        "q": "He _____ home late last night. (get)",
        "opts": [
          "get",
          "got",
          "gotten"
        ],
        "ans": 1,
        "hint": "get → got。",
        "sentence": "He got home late last night.",
        "zh": "他昨晚很晚到家。"
      },
      {
        "q": "I _____ my keys yesterday. (lose)",
        "opts": [
          "lose",
          "lost",
          "losed"
        ],
        "ans": 1,
        "hint": "lose → lost。",
        "sentence": "I lost my keys yesterday.",
        "zh": "我昨天丢了钥匙。"
      },
      {
        "q": "_____ you see the panda?",
        "opts": [
          "Do",
          "Did",
          "Does"
        ],
        "ans": 1,
        "hint": "过去疑问 Did。",
        "sentence": "Did you see the panda?",
        "zh": "你看见熊猫了吗？"
      },
      {
        "q": "They _____ to Chengdu by train. (go)",
        "opts": [
          "goed",
          "went",
          "gone"
        ],
        "ans": 1,
        "hint": "go → went。",
        "sentence": "They went to Chengdu by train.",
        "zh": "他们坐火车去了成都。"
      },
      {
        "q": "She _____ a letter to her friend. (write)",
        "opts": [
          "write",
          "wrote",
          "written"
        ],
        "ans": 1,
        "hint": "write → wrote。",
        "sentence": "She wrote a letter to her friend.",
        "zh": "她给朋友写了一封信。"
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
    "image": "kpp-bob-cola.jpg",
    "pairs": [
      {
        "en": "go → went",
        "zh": "去"
      },
      {
        "en": "buy → bought",
        "zh": "买"
      },
      {
        "en": "see → saw",
        "zh": "看见"
      },
      {
        "en": "didn't go",
        "zh": "没有去"
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
    "image": "kpp-bob-cola.jpg",
    "audio": "We saw a film yesterday evening.",
    "opts": [
      "We saw a film yesterday evening.",
      "We seed a film yesterday evening.",
      "We saw a film every evening."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "We saw a film yesterday evening.",
    "zh": "我们昨晚看了一部电影。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "kpp-writing.jpg",
    "checklist": [
      "过去时间标志：yesterday, last…, ago → 过去式",
      "不规则动词不能加 -ed：go→went, buy→bought",
      "写作日记：Yesterday I went… I bought… I saw…",
      "疑问：Did you go? — Yes, I went. / No, I didn't.",
      "高频：go-went, see-saw, buy-bought, get-got, take-took, make-made, have-had。"
    ],
    "chant": "Yesterday came — past tense time! Irregular verbs? Learn them by rhyme!",
    "chantSpeak": "Yesterday came, past tense time! Irregular verbs, learn them by rhyme!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "一般过去时 · 不规则动词",
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