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
    "section": "导入",
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
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l09-articles-hero.jpg",
    "lead": "a/an 表泛指「一个」；the 表特指「那个已知的」。",
    "formula": "a + 辅音音素　/　an + 元音音素　/　the + 特指",
    "parts": [
      {
        "mark": "a",
        "label": "辅音音素",
        "example": "a cat / a university"
      },
      {
        "mark": "an",
        "label": "元音音素",
        "example": "an apple / an hour"
      },
      {
        "mark": "the",
        "label": "特指或独一无二",
        "example": "the sun / the cat（再次提及）"
      }
    ],
    "samples": [
      {
        "sentence": "I saw a cat. The cat was very cute.",
        "zh": "我看见一只猫。那只猫很可爱。"
      },
      {
        "sentence": "My father is an honest man.",
        "zh": "我爸爸是个诚实的人。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
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
    "section": "精讲",
    "title": "例句 · an honest",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l09-articles-hero.jpg",
    "lead": "honest 的 h 不发音，以元音音素开头 → an。",
    "sentence": "My father is an honest man.",
    "zh": "我爸爸是个诚实的人。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · 再次提及",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l09-articles-hero.jpg",
    "lead": "第一次 a cat，第二次 the cat。",
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫。那只猫很可爱。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "id": "p07",
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
    "id": "p08",
    "section": "辨析",
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
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l09-articles-hero.jpg",
    "question": "「She is a university student.」为什么用 a 不用 an？",
    "choices": [
      {
        "text": "university 以辅音音素 /j/ 开头",
        "correct": true,
        "fb": "对了！看音素不看字母。u 发 /j/ 时用 a。"
      },
      {
        "text": "university 是专有名词",
        "correct": false,
        "fb": "这是普通名词。"
      },
      {
        "text": "student 是单数所以用 a",
        "correct": false,
        "fb": "关键在 university 的发音。"
      }
    ],
    "sentence": "She is a university student.",
    "zh": "她是一名大学生。",
    "id": "p09"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l09-articles-hero.jpg",
    "lead": "第一次出现用 a/an，再次出现改成 the。",
    "items": [
      {
        "from": "I bought pen yesterday.",
        "fromZh": "我昨天买了钢笔。（缺冠词）",
        "steps": [
          {
            "label": "补上第一次提及的冠词",
            "opts": [
              "I bought a pen yesterday.",
              "I bought an pen yesterday.",
              "I bought the pens yesterday."
            ],
            "ans": 0,
            "hint": "pen 辅音开头 → a pen。",
            "sentence": "I bought a pen yesterday.",
            "zh": "我昨天买了一支钢笔。"
          },
          {
            "label": "第二句：这支钢笔很好写",
            "opts": [
              "The pen writes well.",
              "A pen writes well.",
              "An pen writes well."
            ],
            "ans": 0,
            "hint": "再次提及用 the。",
            "sentence": "The pen writes well.",
            "zh": "这支钢笔很好写。"
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
    "image": "l09-articles-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
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
    "zh": "我看见一只猫，那只猫很可爱。",
    "id": "p11"
  },
  {
    "id": "p12",
    "section": "操练",
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
    "id": "p13",
    "section": "检测",
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
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l09-articles-hero.jpg",
    "lead": "对齐初中综合测试：全部做完再交卷。",
    "questions": [
      {
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
        "q": "I have _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音 /j/ 开头 → a。",
        "sentence": "I have a useful book.",
        "zh": "我有一本有用的书。"
      },
      {
        "q": "_____ sun rises in the east.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "独一无二的天体用 the。",
        "sentence": "The sun rises in the east.",
        "zh": "太阳从东方升起。"
      },
      {
        "q": "He plays _____ piano every day.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "乐器前用 the。",
        "sentence": "He plays the piano every day.",
        "zh": "他每天弹钢琴。"
      },
      {
        "q": "It took me _____ hour to finish it.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "hour 的 h 不发音 → an hour。",
        "sentence": "It took me an hour to finish it.",
        "zh": "我花了一小时做完。"
      },
      {
        "q": "There is _____ apple on _____ table.",
        "opts": [
          "a; the",
          "an; the",
          "an; a"
        ],
        "ans": 1,
        "hint": "apple 用 an；双方都知道的桌子用 the。",
        "sentence": "There is an apple on the table.",
        "zh": "桌子上有一个苹果。"
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
        "q": "I have _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音 /j/ 开头 → a。",
        "sentence": "I have a useful book.",
        "zh": "我有一本有用的书。"
      },
      {
        "q": "_____ sun rises in the east.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "独一无二的天体用 the。",
        "sentence": "The sun rises in the east.",
        "zh": "太阳从东方升起。"
      },
      {
        "q": "He plays _____ piano every day.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "乐器前用 the。",
        "sentence": "He plays the piano every day.",
        "zh": "他每天弹钢琴。"
      },
      {
        "q": "It took me _____ hour to finish it.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "hour 的 h 不发音 → an hour。",
        "sentence": "It took me an hour to finish it.",
        "zh": "我花了一小时做完。"
      },
      {
        "q": "There is _____ apple on _____ table.",
        "opts": [
          "a; the",
          "an; the",
          "an; a"
        ],
        "ans": 1,
        "hint": "apple 用 an；双方都知道的桌子用 the。",
        "sentence": "There is an apple on the table.",
        "zh": "桌子上有一个苹果。"
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
        "q": "I have _____ useful book.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 0,
        "hint": "useful 以辅音 /j/ 开头 → a。",
        "sentence": "I have a useful book.",
        "zh": "我有一本有用的书。"
      },
      {
        "q": "_____ sun rises in the east.",
        "opts": [
          "A",
          "An",
          "The"
        ],
        "ans": 2,
        "hint": "独一无二的天体用 the。",
        "sentence": "The sun rises in the east.",
        "zh": "太阳从东方升起。"
      },
      {
        "q": "He plays _____ piano every day.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 2,
        "hint": "乐器前用 the。",
        "sentence": "He plays the piano every day.",
        "zh": "他每天弹钢琴。"
      },
      {
        "q": "It took me _____ hour to finish it.",
        "opts": [
          "a",
          "an",
          "the"
        ],
        "ans": 1,
        "hint": "hour 的 h 不发音 → an hour。",
        "sentence": "It took me an hour to finish it.",
        "zh": "我花了一小时做完。"
      },
      {
        "q": "There is _____ apple on _____ table.",
        "opts": [
          "a; the",
          "an; the",
          "an; a"
        ],
        "ans": 1,
        "hint": "apple 用 an；双方都知道的桌子用 the。",
        "sentence": "There is an apple on the table.",
        "zh": "桌子上有一个苹果。"
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
    "image": "l09-articles-hero.jpg",
    "pairs": [
      {
        "en": "a cat",
        "zh": "一只猫（辅音）"
      },
      {
        "en": "an hour",
        "zh": "一小时（h 不发音）"
      },
      {
        "en": "the sun",
        "zh": "太阳（独一无二）"
      },
      {
        "en": "the piano",
        "zh": "钢琴（乐器）"
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
    "image": "l09-articles-hero.jpg",
    "audio": "I saw a cat. The cat was very cute.",
    "opts": [
      "I saw a cat. The cat was very cute.",
      "I saw an cat. The cat was very cute.",
      "I saw a cat. A cat was very cute."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "I saw a cat. The cat was very cute.",
    "zh": "我看见一只猫，那只猫很可爱。",
    "id": "p18"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "writing.jpg",
    "checklist": [
      "辅音音素 → a；元音音素 → an（hour, honest 用 an）",
      "再次提到 → the",
      "写作：I bought a pen. The pen writes well.",
      "看音素不看字母：hour/honest 用 an；university/useful 用 a。",
      "乐器、世上独一无二：the piano, the moon。"
    ],
    "chant": "First time a or an, next time the! Vowel sound? An — you'll see!",
    "chantSpeak": "First time a or an, next time the! Vowel sound, an, you will see!",
    "id": "p19"
  }
];
  global.KpData = {
    courseTitle: "冠词 a / an / the",
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