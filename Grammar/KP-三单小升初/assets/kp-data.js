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
    "section": "精讲",
    "title": "go 和 do 的特殊变化",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "go 和 do 在第三人称单数时加 es，变成 goes 和 does。",
    "sentence": "He goes to school by bus.",
    "zh": "他坐公交车去上学。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "否定句用 doesn't",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-playground.png",
    "lead": "否定句用 doesn't 加动词原形，动词不再加 s。",
    "sentence": "Linda doesn't have any volleyballs.",
    "zh": "琳达没有任何排球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
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
    "id": "p10",
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
    "id": "p11"
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
      },
      {
        "from": "Tom like apples.",
        "fromZh": "汤姆喜欢苹果。",
        "steps": [
          {
            "label": "改成正确的三单形式",
            "opts": [
              "Tom likes apples.",
              "Tom like apples.",
              "Tom liking apples."
            ],
            "ans": 0,
            "hint": "Tom 是三单，动词加 s",
            "sentence": "Tom likes apples.",
            "zh": "汤姆喜欢苹果。"
          }
        ]
      },
      {
        "from": "She play football every Saturday.",
        "fromZh": "她每周六踢足球。",
        "steps": [
          {
            "label": "改成正确的三单形式",
            "opts": [
              "She plays football every Saturday.",
              "She play football every Saturday.",
              "She playing football every Saturday."
            ],
            "ans": 0,
            "hint": "She 是三单，play 加 s",
            "sentence": "She plays football every Saturday.",
            "zh": "她每周六踢足球。"
          }
        ]
      },
      {
        "from": "He go to school by bus.",
        "fromZh": "他坐公交车去上学。",
        "steps": [
          {
            "label": "改成正确的三单形式",
            "opts": [
              "He goes to school by bus.",
              "He go to school by bus.",
              "He going to school by bus."
            ],
            "ans": 0,
            "hint": "go 加 es",
            "sentence": "He goes to school by bus.",
            "zh": "他坐公交车去上学。"
          }
        ]
      },
      {
        "from": "Linda doesn't has any volleyballs.",
        "fromZh": "琳达没有任何排球。",
        "steps": [
          {
            "label": "改成正确的否定句",
            "opts": [
              "Linda doesn't have any volleyballs.",
              "Linda doesn't has any volleyballs.",
              "Linda don't have any volleyballs."
            ],
            "ans": 0,
            "hint": "doesn't 后接原形",
            "sentence": "Linda doesn't have any volleyballs.",
            "zh": "琳达没有任何排球。"
          }
        ]
      },
      {
        "from": "He doesn't likes the rain.",
        "fromZh": "他不喜欢下雨。",
        "steps": [
          {
            "label": "改成正确的否定句",
            "opts": [
              "He doesn't like the rain.",
              "He doesn't likes the rain.",
              "He don't like the rain."
            ],
            "ans": 0,
            "hint": "doesn't 后接原形",
            "sentence": "He doesn't like the rain.",
            "zh": "他不喜欢下雨。"
          }
        ]
      },
      {
        "from": "She study English every day.",
        "fromZh": "她每天学英语。",
        "steps": [
          {
            "label": "改成正确的三单形式",
            "opts": [
              "She studies English every day.",
              "She study English every day.",
              "She studys English every day."
            ],
            "ans": 0,
            "hint": "辅音+y 变 ies",
            "sentence": "She studies English every day.",
            "zh": "她每天学英语。"
          }
        ]
      }
    ],
    "id": "p12"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3d-playground.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "She",
      "plays",
      "football",
      "every",
      "Saturday"
    ],
    "sentence": "She plays football every Saturday.",
    "zh": "她每周六踢足球。",
    "items": [
      {
        "tokens": [
          "She",
          "plays",
          "football",
          "every",
          "Saturday"
        ],
        "sentence": "She plays football every Saturday.",
        "zh": "她每周六踢足球。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "He",
          "goes",
          "to",
          "school",
          "by",
          "bus"
        ],
        "sentence": "He goes to school by bus.",
        "zh": "他坐公交车去上学。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "Tom",
          "likes",
          "apples"
        ],
        "sentence": "Tom likes apples.",
        "zh": "汤姆喜欢苹果。",
        "image": "kp3d-apple.png"
      },
      {
        "tokens": [
          "Linda",
          "doesn't",
          "have",
          "any",
          "volleyballs"
        ],
        "sentence": "Linda doesn't have any volleyballs.",
        "zh": "琳达没有任何排球。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "She",
          "reads",
          "books",
          "in",
          "the",
          "library"
        ],
        "sentence": "She reads books in the library.",
        "zh": "她在图书馆看书。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "He",
          "plays",
          "the",
          "piano",
          "very",
          "well"
        ],
        "sentence": "He plays the piano very well.",
        "zh": "他钢琴弹得很好。",
        "image": "kp3d-piano.png"
      }
    ],
    "id": "p13"
  },
  {
    "id": "p14",
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
    "id": "p15",
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
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
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
      },
      {
        "q": "Tom _____ apples.",
        "opts": [
          "like",
          "likes",
          "liking"
        ],
        "ans": 1,
        "hint": "Tom 是第三人称单数，动词要加 s",
        "sentence": "Tom likes apples.",
        "zh": "汤姆喜欢苹果。"
      },
      {
        "q": "She _____ football every Saturday.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "She 是三单，play 加 s",
        "sentence": "She plays football every Saturday.",
        "zh": "她每周六踢足球。"
      },
      {
        "q": "The cat _____ on the sofa.",
        "opts": [
          "sleep",
          "sleeps",
          "sleeping"
        ],
        "ans": 1,
        "hint": "The cat 是三单",
        "sentence": "The cat sleeps on the sofa.",
        "zh": "猫在沙发上睡觉。"
      },
      {
        "q": "My father _____ dinner in the evening.",
        "opts": [
          "cook",
          "cooks",
          "cooking"
        ],
        "ans": 1,
        "hint": "father 是三单",
        "sentence": "My father cooks dinner in the evening.",
        "zh": "我爸爸晚上做晚饭。"
      },
      {
        "q": "Linda _____ any volleyballs.",
        "opts": [
          "don't have",
          "doesn't have",
          "doesn't has"
        ],
        "ans": 1,
        "hint": "否定用 doesn't + 原形",
        "sentence": "Linda doesn't have any volleyballs.",
        "zh": "琳达没有任何排球。"
      },
      {
        "q": "He _____ like the rain.",
        "opts": [
          "don't",
          "doesn't",
          "isn't"
        ],
        "ans": 1,
        "hint": "三单否定用 doesn't",
        "sentence": "He doesn't like the rain.",
        "zh": "他不喜欢下雨。"
      },
      {
        "q": "She _____ TV on weekdays.",
        "opts": [
          "doesn't watch",
          "don't watch",
          "doesn't watches"
        ],
        "ans": 0,
        "hint": "doesn't 后接原形",
        "sentence": "She doesn't watch TV on weekdays.",
        "zh": "她工作日不看电视。"
      },
      {
        "q": "The doctor _____ on Sunday.",
        "opts": [
          "doesn't work",
          "don't work",
          "doesn't works"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "The doctor doesn't work on Sunday.",
        "zh": "医生星期天不上班。"
      },
      {
        "q": "It _____ a tail.",
        "opts": [
          "doesn't have",
          "don't have",
          "doesn't has"
        ],
        "ans": 0,
        "hint": "doesn't + 原形 have",
        "sentence": "It doesn't have a tail.",
        "zh": "它没有尾巴。"
      },
      {
        "q": "He _____ hot pot.",
        "opts": [
          "doesn't eat",
          "don't eat",
          "doesn't eats"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "He doesn't eat hot pot.",
        "zh": "他不吃火锅。"
      }
    ],
    "id": "p16"
  },
  {
    "section": "检测",
    "title": "限时挑战 90 秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "lead": "题库已扩充：90 秒内尽量多答对。",
    "seconds": 90,
    "perQuestion": 12,
    "pass": 8,
    "pool": "questions",
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
      },
      {
        "q": "Tom _____ apples.",
        "opts": [
          "like",
          "likes",
          "liking"
        ],
        "ans": 1,
        "hint": "Tom 是第三人称单数，动词要加 s",
        "sentence": "Tom likes apples.",
        "zh": "汤姆喜欢苹果。"
      },
      {
        "q": "She _____ football every Saturday.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "She 是三单，play 加 s",
        "sentence": "She plays football every Saturday.",
        "zh": "她每周六踢足球。"
      },
      {
        "q": "The cat _____ on the sofa.",
        "opts": [
          "sleep",
          "sleeps",
          "sleeping"
        ],
        "ans": 1,
        "hint": "The cat 是三单",
        "sentence": "The cat sleeps on the sofa.",
        "zh": "猫在沙发上睡觉。"
      },
      {
        "q": "My father _____ dinner in the evening.",
        "opts": [
          "cook",
          "cooks",
          "cooking"
        ],
        "ans": 1,
        "hint": "father 是三单",
        "sentence": "My father cooks dinner in the evening.",
        "zh": "我爸爸晚上做晚饭。"
      },
      {
        "q": "Linda _____ any volleyballs.",
        "opts": [
          "don't have",
          "doesn't have",
          "doesn't has"
        ],
        "ans": 1,
        "hint": "否定用 doesn't + 原形",
        "sentence": "Linda doesn't have any volleyballs.",
        "zh": "琳达没有任何排球。"
      },
      {
        "q": "He _____ like the rain.",
        "opts": [
          "don't",
          "doesn't",
          "isn't"
        ],
        "ans": 1,
        "hint": "三单否定用 doesn't",
        "sentence": "He doesn't like the rain.",
        "zh": "他不喜欢下雨。"
      },
      {
        "q": "She _____ TV on weekdays.",
        "opts": [
          "doesn't watch",
          "don't watch",
          "doesn't watches"
        ],
        "ans": 0,
        "hint": "doesn't 后接原形",
        "sentence": "She doesn't watch TV on weekdays.",
        "zh": "她工作日不看电视。"
      },
      {
        "q": "The doctor _____ on Sunday.",
        "opts": [
          "doesn't work",
          "don't work",
          "doesn't works"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "The doctor doesn't work on Sunday.",
        "zh": "医生星期天不上班。"
      },
      {
        "q": "It _____ a tail.",
        "opts": [
          "doesn't have",
          "don't have",
          "doesn't has"
        ],
        "ans": 0,
        "hint": "doesn't + 原形 have",
        "sentence": "It doesn't have a tail.",
        "zh": "它没有尾巴。"
      },
      {
        "q": "He _____ hot pot.",
        "opts": [
          "doesn't eat",
          "don't eat",
          "doesn't eats"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "He doesn't eat hot pot.",
        "zh": "他不吃火锅。"
      },
      {
        "q": "She _____ the piano.",
        "opts": [
          "doesn't play",
          "don't play",
          "doesn't plays"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "She doesn't play the piano.",
        "zh": "她不弹钢琴。"
      },
      {
        "q": "The bus _____ here.",
        "opts": [
          "doesn't stop",
          "don't stop",
          "doesn't stops"
        ],
        "ans": 0,
        "hint": "bus 是三单",
        "sentence": "The bus doesn't stop here.",
        "zh": "公交车不停在这里。"
      },
      {
        "q": "He _____ cartoons every morning.",
        "opts": [
          "watch",
          "watches",
          "watching"
        ],
        "ans": 1,
        "hint": "watch 加 es",
        "sentence": "He watches cartoons every morning.",
        "zh": "他每天早上看动画片。"
      },
      {
        "q": "She _____ English in the evening.",
        "opts": [
          "study",
          "studies",
          "studys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "She studies English in the evening.",
        "zh": "她晚上学英语。"
      },
      {
        "q": "It _____ high in the sky.",
        "opts": [
          "fly",
          "flies",
          "flys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "It flies high in the sky.",
        "zh": "它在天上飞得很高。"
      },
      {
        "q": "He _____ a big bag to school.",
        "opts": [
          "carry",
          "carries",
          "carrys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "He carries a big bag to school.",
        "zh": "他背着大书包去学校。"
      },
      {
        "q": "She _____ her hands before dinner.",
        "opts": [
          "wash",
          "washes",
          "washs"
        ],
        "ans": 1,
        "hint": "sh 结尾加 es",
        "sentence": "She washes her hands before dinner.",
        "zh": "她晚饭前洗手。"
      },
      {
        "q": "The panda _____ the tree slowly.",
        "opts": [
          "climb",
          "climbs",
          "climbing"
        ],
        "ans": 1,
        "hint": "panda 是三单",
        "sentence": "The panda climbs the tree slowly.",
        "zh": "熊猫慢慢地爬树。"
      },
      {
        "q": "He _____ the piano very well.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "He 是三单",
        "sentence": "He plays the piano very well.",
        "zh": "他钢琴弹得很好。"
      },
      {
        "q": "She _____ to the shop on foot.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "go 加 es",
        "sentence": "She goes to the shop on foot.",
        "zh": "她走路去商店。"
      },
      {
        "q": "_____ she like apples?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "三单疑问用 Does",
        "sentence": "Does she like apples?",
        "zh": "她喜欢苹果吗？"
      },
      {
        "q": "_____ he play basketball?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "三单疑问用 Does",
        "sentence": "Does he play basketball?",
        "zh": "他打篮球吗？"
      },
      {
        "q": "The moon _____ at night.",
        "opts": [
          "shine",
          "shines",
          "shining"
        ],
        "ans": 1,
        "hint": "moon 是三单",
        "sentence": "The moon shines at night.",
        "zh": "月亮在晚上发光。"
      },
      {
        "q": "She _____ books in the library.",
        "opts": [
          "read",
          "reads",
          "reading"
        ],
        "ans": 1,
        "hint": "read 加 s",
        "sentence": "She reads books in the library.",
        "zh": "她在图书馆看书。"
      },
      {
        "q": "He _____ basketball after class.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "He 是三单",
        "sentence": "He plays basketball after class.",
        "zh": "他课后打篮球。"
      },
      {
        "q": "It _____ bamboo every day.",
        "opts": [
          "eat",
          "eats",
          "eating"
        ],
        "ans": 1,
        "hint": "It 是三单",
        "sentence": "It eats bamboo every day.",
        "zh": "它每天吃竹子。"
      },
      {
        "q": "My sister _____ to music in the morning.",
        "opts": [
          "listen",
          "listens",
          "listening"
        ],
        "ans": 1,
        "hint": "sister 是三单",
        "sentence": "My sister listens to music in the morning.",
        "zh": "我妹妹早上听音乐。"
      }
    ],
    "id": "p17"
  },
  {
    "section": "检测",
    "title": "连对闯关",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "lead": "连续答对 8 题通关，答错连击清零。题库已加厚。",
    "target": 8,
    "pool": "questions",
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
      },
      {
        "q": "Tom _____ apples.",
        "opts": [
          "like",
          "likes",
          "liking"
        ],
        "ans": 1,
        "hint": "Tom 是第三人称单数，动词要加 s",
        "sentence": "Tom likes apples.",
        "zh": "汤姆喜欢苹果。"
      },
      {
        "q": "She _____ football every Saturday.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "She 是三单，play 加 s",
        "sentence": "She plays football every Saturday.",
        "zh": "她每周六踢足球。"
      },
      {
        "q": "The cat _____ on the sofa.",
        "opts": [
          "sleep",
          "sleeps",
          "sleeping"
        ],
        "ans": 1,
        "hint": "The cat 是三单",
        "sentence": "The cat sleeps on the sofa.",
        "zh": "猫在沙发上睡觉。"
      },
      {
        "q": "My father _____ dinner in the evening.",
        "opts": [
          "cook",
          "cooks",
          "cooking"
        ],
        "ans": 1,
        "hint": "father 是三单",
        "sentence": "My father cooks dinner in the evening.",
        "zh": "我爸爸晚上做晚饭。"
      },
      {
        "q": "Linda _____ any volleyballs.",
        "opts": [
          "don't have",
          "doesn't have",
          "doesn't has"
        ],
        "ans": 1,
        "hint": "否定用 doesn't + 原形",
        "sentence": "Linda doesn't have any volleyballs.",
        "zh": "琳达没有任何排球。"
      },
      {
        "q": "He _____ like the rain.",
        "opts": [
          "don't",
          "doesn't",
          "isn't"
        ],
        "ans": 1,
        "hint": "三单否定用 doesn't",
        "sentence": "He doesn't like the rain.",
        "zh": "他不喜欢下雨。"
      },
      {
        "q": "She _____ TV on weekdays.",
        "opts": [
          "doesn't watch",
          "don't watch",
          "doesn't watches"
        ],
        "ans": 0,
        "hint": "doesn't 后接原形",
        "sentence": "She doesn't watch TV on weekdays.",
        "zh": "她工作日不看电视。"
      },
      {
        "q": "The doctor _____ on Sunday.",
        "opts": [
          "doesn't work",
          "don't work",
          "doesn't works"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "The doctor doesn't work on Sunday.",
        "zh": "医生星期天不上班。"
      },
      {
        "q": "It _____ a tail.",
        "opts": [
          "doesn't have",
          "don't have",
          "doesn't has"
        ],
        "ans": 0,
        "hint": "doesn't + 原形 have",
        "sentence": "It doesn't have a tail.",
        "zh": "它没有尾巴。"
      },
      {
        "q": "He _____ hot pot.",
        "opts": [
          "doesn't eat",
          "don't eat",
          "doesn't eats"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "He doesn't eat hot pot.",
        "zh": "他不吃火锅。"
      },
      {
        "q": "She _____ the piano.",
        "opts": [
          "doesn't play",
          "don't play",
          "doesn't plays"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "She doesn't play the piano.",
        "zh": "她不弹钢琴。"
      },
      {
        "q": "The bus _____ here.",
        "opts": [
          "doesn't stop",
          "don't stop",
          "doesn't stops"
        ],
        "ans": 0,
        "hint": "bus 是三单",
        "sentence": "The bus doesn't stop here.",
        "zh": "公交车不停在这里。"
      },
      {
        "q": "He _____ cartoons every morning.",
        "opts": [
          "watch",
          "watches",
          "watching"
        ],
        "ans": 1,
        "hint": "watch 加 es",
        "sentence": "He watches cartoons every morning.",
        "zh": "他每天早上看动画片。"
      },
      {
        "q": "She _____ English in the evening.",
        "opts": [
          "study",
          "studies",
          "studys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "She studies English in the evening.",
        "zh": "她晚上学英语。"
      },
      {
        "q": "It _____ high in the sky.",
        "opts": [
          "fly",
          "flies",
          "flys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "It flies high in the sky.",
        "zh": "它在天上飞得很高。"
      },
      {
        "q": "He _____ a big bag to school.",
        "opts": [
          "carry",
          "carries",
          "carrys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "He carries a big bag to school.",
        "zh": "他背着大书包去学校。"
      },
      {
        "q": "She _____ her hands before dinner.",
        "opts": [
          "wash",
          "washes",
          "washs"
        ],
        "ans": 1,
        "hint": "sh 结尾加 es",
        "sentence": "She washes her hands before dinner.",
        "zh": "她晚饭前洗手。"
      },
      {
        "q": "The panda _____ the tree slowly.",
        "opts": [
          "climb",
          "climbs",
          "climbing"
        ],
        "ans": 1,
        "hint": "panda 是三单",
        "sentence": "The panda climbs the tree slowly.",
        "zh": "熊猫慢慢地爬树。"
      },
      {
        "q": "He _____ the piano very well.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "He 是三单",
        "sentence": "He plays the piano very well.",
        "zh": "他钢琴弹得很好。"
      },
      {
        "q": "She _____ to the shop on foot.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "go 加 es",
        "sentence": "She goes to the shop on foot.",
        "zh": "她走路去商店。"
      },
      {
        "q": "_____ she like apples?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "三单疑问用 Does",
        "sentence": "Does she like apples?",
        "zh": "她喜欢苹果吗？"
      },
      {
        "q": "_____ he play basketball?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "三单疑问用 Does",
        "sentence": "Does he play basketball?",
        "zh": "他打篮球吗？"
      },
      {
        "q": "The moon _____ at night.",
        "opts": [
          "shine",
          "shines",
          "shining"
        ],
        "ans": 1,
        "hint": "moon 是三单",
        "sentence": "The moon shines at night.",
        "zh": "月亮在晚上发光。"
      },
      {
        "q": "She _____ books in the library.",
        "opts": [
          "read",
          "reads",
          "reading"
        ],
        "ans": 1,
        "hint": "read 加 s",
        "sentence": "She reads books in the library.",
        "zh": "她在图书馆看书。"
      },
      {
        "q": "He _____ basketball after class.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "He 是三单",
        "sentence": "He plays basketball after class.",
        "zh": "他课后打篮球。"
      },
      {
        "q": "It _____ bamboo every day.",
        "opts": [
          "eat",
          "eats",
          "eating"
        ],
        "ans": 1,
        "hint": "It 是三单",
        "sentence": "It eats bamboo every day.",
        "zh": "它每天吃竹子。"
      },
      {
        "q": "My sister _____ to music in the morning.",
        "opts": [
          "listen",
          "listens",
          "listening"
        ],
        "ans": 1,
        "hint": "sister 是三单",
        "sentence": "My sister listens to music in the morning.",
        "zh": "我妹妹早上听音乐。"
      }
    ],
    "id": "p18"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "kp3-girl-football.jpg",
    "pool": "matchPairs",
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
      },
      {
        "en": "He likes",
        "zh": "他喜欢"
      },
      {
        "en": "She goes",
        "zh": "她去"
      },
      {
        "en": "It eats",
        "zh": "它吃"
      },
      {
        "en": "Tom plays",
        "zh": "汤姆玩"
      },
      {
        "en": "The cat sleeps",
        "zh": "猫睡觉"
      },
      {
        "en": "doesn't have",
        "zh": "没有"
      },
      {
        "en": "doesn't like",
        "zh": "不喜欢"
      },
      {
        "en": "doesn't watch",
        "zh": "不看"
      },
      {
        "en": "studies English",
        "zh": "学英语"
      },
      {
        "en": "washes hands",
        "zh": "洗手"
      }
    ],
    "id": "p19"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "kp3-girl-football.jpg",
    "audio": "She plays football every Saturday.",
    "opts": [
      "She plays football every Saturday.",
      "She play football every Saturday.",
      "She playing football every Saturday."
    ],
    "ans": 0,
    "hint": "注意 play 加 s",
    "sentence": "She plays football every Saturday.",
    "zh": "她每周六踢足球。",
    "questions": [
      {
        "audio": "She plays football every Saturday.",
        "opts": [
          "She plays football every Saturday.",
          "She play football every Saturday.",
          "She playing football every Saturday."
        ],
        "ans": 0,
        "hint": "注意 play 加 s",
        "zh": "她每周六踢足球。",
        "sentence": "She plays football every Saturday."
      },
      {
        "audio": "He goes to school by bus.",
        "opts": [
          "He goes to school by bus.",
          "He go to school by bus.",
          "He going to school by bus."
        ],
        "ans": 0,
        "hint": "go 加 es",
        "zh": "他坐公交车去上学。",
        "sentence": "He goes to school by bus."
      },
      {
        "audio": "Tom likes apples.",
        "opts": [
          "Tom likes apples.",
          "Tom like apples.",
          "Tom liking apples."
        ],
        "ans": 0,
        "hint": "Tom 是三单",
        "zh": "汤姆喜欢苹果。",
        "sentence": "Tom likes apples."
      },
      {
        "audio": "Linda doesn't have any volleyballs.",
        "opts": [
          "Linda doesn't have any volleyballs.",
          "Linda doesn't has any volleyballs.",
          "Linda don't have any volleyballs."
        ],
        "ans": 0,
        "hint": "doesn't 后接原形",
        "zh": "琳达没有任何排球。",
        "sentence": "Linda doesn't have any volleyballs."
      },
      {
        "audio": "The cat sleeps on the sofa.",
        "opts": [
          "The cat sleeps on the sofa.",
          "The cat sleep on the sofa.",
          "The cat sleeping on the sofa."
        ],
        "ans": 0,
        "hint": "cat 是三单",
        "zh": "猫在沙发上睡觉。",
        "sentence": "The cat sleeps on the sofa."
      },
      {
        "audio": "She reads books in the library.",
        "opts": [
          "She reads books in the library.",
          "She read books in the library.",
          "She reading books in the library."
        ],
        "ans": 0,
        "hint": "read 加 s",
        "zh": "她在图书馆看书。",
        "sentence": "She reads books in the library."
      },
      {
        "audio": "He doesn't like the rain.",
        "opts": [
          "He doesn't like the rain.",
          "He doesn't likes the rain.",
          "He don't like the rain."
        ],
        "ans": 0,
        "hint": "doesn't 后接原形",
        "zh": "他不喜欢下雨。",
        "sentence": "He doesn't like the rain."
      },
      {
        "audio": "She studies English in the evening.",
        "opts": [
          "She studies English in the evening.",
          "She study English in the evening.",
          "She studys English in the evening."
        ],
        "ans": 0,
        "hint": "辅音+y 变 ies",
        "zh": "她晚上学英语。",
        "sentence": "She studies English in the evening."
      }
    ],
    "id": "p20"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "kp3-girl-football.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "She plays football every Saturday.",
        "zh": "她每周六踢足球。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He goes to school by bus.",
        "zh": "他坐公交车去上学。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "It eats bamboo every day.",
        "zh": "它每天吃竹子。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Tom likes apples.",
        "zh": "汤姆喜欢苹果。",
        "tag": "daily_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "My father cooks dinner in the evening.",
        "zh": "我爸爸晚上做晚饭。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The cat sleeps on the sofa.",
        "zh": "猫在沙发上睡觉。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "She reads books in the library.",
        "zh": "她在图书馆看书。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He plays basketball after class.",
        "zh": "他课后打篮球。",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "Linda doesn't have any volleyballs.",
        "zh": "琳达没有任何排球。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He doesn't like the rain.",
        "zh": "他不喜欢下雨。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "She doesn't watch TV on weekdays.",
        "zh": "她工作日不看电视。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The doctor doesn't work on Sunday.",
        "zh": "医生星期天不上班。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "It doesn't have a tail.",
        "zh": "它没有尾巴。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "He doesn't eat hot pot.",
        "zh": "他不吃火锅。",
        "tag": "exam_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She doesn't play the piano.",
        "zh": "她不弹钢琴。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The bus doesn't stop here.",
        "zh": "公交车不停在这里。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "He watches cartoons every morning.",
        "zh": "他每天早上看动画片。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She studies English in the evening.",
        "zh": "她晚上学英语。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "It flies high in the sky.",
        "zh": "它在天上飞得很高。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "He carries a big bag to school.",
        "zh": "他背着大书包去学校。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She washes her hands before dinner.",
        "zh": "她晚饭前洗手。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The panda climbs the tree slowly.",
        "zh": "熊猫慢慢地爬树。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "He plays the piano very well.",
        "zh": "他钢琴弹得很好。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "She goes to the shop on foot.",
        "zh": "她走路去商店。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      }
    ],
    "id": "p21"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "kp3-girl-football.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "She _____ the piano.",
        "opts": [
          "doesn't play",
          "don't play",
          "doesn't plays"
        ],
        "ans": 0,
        "hint": "doesn't + 原形",
        "sentence": "She doesn't play the piano.",
        "zh": "她不弹钢琴。"
      },
      {
        "q": "The bus _____ here.",
        "opts": [
          "doesn't stop",
          "don't stop",
          "doesn't stops"
        ],
        "ans": 0,
        "hint": "bus 是三单",
        "sentence": "The bus doesn't stop here.",
        "zh": "公交车不停在这里。"
      },
      {
        "q": "He _____ cartoons every morning.",
        "opts": [
          "watch",
          "watches",
          "watching"
        ],
        "ans": 1,
        "hint": "watch 加 es",
        "sentence": "He watches cartoons every morning.",
        "zh": "他每天早上看动画片。"
      },
      {
        "q": "She _____ English in the evening.",
        "opts": [
          "study",
          "studies",
          "studys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "She studies English in the evening.",
        "zh": "她晚上学英语。"
      },
      {
        "q": "It _____ high in the sky.",
        "opts": [
          "fly",
          "flies",
          "flys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "It flies high in the sky.",
        "zh": "它在天上飞得很高。"
      },
      {
        "q": "He _____ a big bag to school.",
        "opts": [
          "carry",
          "carries",
          "carrys"
        ],
        "ans": 1,
        "hint": "辅音+y 变 ies",
        "sentence": "He carries a big bag to school.",
        "zh": "他背着大书包去学校。"
      },
      {
        "q": "She _____ her hands before dinner.",
        "opts": [
          "wash",
          "washes",
          "washs"
        ],
        "ans": 1,
        "hint": "sh 结尾加 es",
        "sentence": "She washes her hands before dinner.",
        "zh": "她晚饭前洗手。"
      },
      {
        "q": "The panda _____ the tree slowly.",
        "opts": [
          "climb",
          "climbs",
          "climbing"
        ],
        "ans": 1,
        "hint": "panda 是三单",
        "sentence": "The panda climbs the tree slowly.",
        "zh": "熊猫慢慢地爬树。"
      },
      {
        "q": "He _____ the piano very well.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "He 是三单",
        "sentence": "He plays the piano very well.",
        "zh": "他钢琴弹得很好。"
      },
      {
        "q": "She _____ to the shop on foot.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "go 加 es",
        "sentence": "She goes to the shop on foot.",
        "zh": "她走路去商店。"
      },
      {
        "q": "_____ she like apples?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "三单疑问用 Does",
        "sentence": "Does she like apples?",
        "zh": "她喜欢苹果吗？"
      },
      {
        "q": "_____ he play basketball?",
        "opts": [
          "Do",
          "Does",
          "Is"
        ],
        "ans": 1,
        "hint": "三单疑问用 Does",
        "sentence": "Does he play basketball?",
        "zh": "他打篮球吗？"
      },
      {
        "q": "The moon _____ at night.",
        "opts": [
          "shine",
          "shines",
          "shining"
        ],
        "ans": 1,
        "hint": "moon 是三单",
        "sentence": "The moon shines at night.",
        "zh": "月亮在晚上发光。"
      },
      {
        "q": "She _____ books in the library.",
        "opts": [
          "read",
          "reads",
          "reading"
        ],
        "ans": 1,
        "hint": "read 加 s",
        "sentence": "She reads books in the library.",
        "zh": "她在图书馆看书。"
      },
      {
        "q": "He _____ basketball after class.",
        "opts": [
          "play",
          "plays",
          "playing"
        ],
        "ans": 1,
        "hint": "He 是三单",
        "sentence": "He plays basketball after class.",
        "zh": "他课后打篮球。"
      },
      {
        "q": "It _____ bamboo every day.",
        "opts": [
          "eat",
          "eats",
          "eating"
        ],
        "ans": 1,
        "hint": "It 是三单",
        "sentence": "It eats bamboo every day.",
        "zh": "它每天吃竹子。"
      },
      {
        "q": "My sister _____ to music in the morning.",
        "opts": [
          "listen",
          "listens",
          "listening"
        ],
        "ans": 1,
        "hint": "sister 是三单",
        "sentence": "My sister listens to music in the morning.",
        "zh": "我妹妹早上听音乐。"
      }
    ],
    "id": "p22"
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
    "id": "p23"
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