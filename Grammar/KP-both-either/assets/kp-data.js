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
    "audio": "Both my father and my mother are doctors.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。",
    "image": "w5-both-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w5-both-hero.jpg",
    "question": "Both A and B 后面动词用什么数？",
    "choices": [
      {
        "text": "复数（are）",
        "correct": true,
        "fb": "对了！both 表示两者都，动词用复数。"
      },
      {
        "text": "单数（is）",
        "correct": false,
        "fb": "both 强调两个，谓语用复数。"
      },
      {
        "text": "与 B 一致即可",
        "correct": false,
        "fb": "both…and 固定用复数谓语。"
      }
    ],
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w5-both-hero.jpg",
    "lead": "谈「两个」时选准连词，并注意动词单复数。",
    "formula": "both A and B（复数）　either A or B（就近）",
    "parts": [
      {
        "mark": "both…and",
        "label": "两者都",
        "example": "Both dad and mum are…"
      },
      {
        "mark": "either…or",
        "label": "要么A要么B",
        "example": "either tea or coffee"
      },
      {
        "mark": "neither…nor",
        "label": "两者都不",
        "example": "neither…nor…"
      }
    ],
    "samples": [
      {
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "sentence": "Either you or he is right.",
        "zh": "要么你对，要么他对。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w5-both-and.jpg",
    "rightImage": "w5-both-either.jpg",
    "leftLabel": "both…and 两者都",
    "rightLabel": "either…or 要么…要么",
    "leftSentence": "Both Tom and Jim are good at maths.",
    "leftZh": "汤姆和吉姆都擅长数学。",
    "rightSentence": "You can either stay or go.",
    "rightZh": "你可以留下，也可以走。",
    "morphBase": "both…and",
    "morphPast": "either…or",
    "morphHighlight": "",
    "discovery": "both…and 两者都，动词复数；either…or 二选一；neither…nor 两者都不。"
  },
  {
    "section": "精讲",
    "title": "例句 · both…and 复数",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-both-hero.jpg",
    "lead": "两个人作主语 → are。",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · either 就近",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w5-both-hero.jpg",
    "lead": "靠近动词的是 he → is。",
    "sentence": "Either you or he is right.",
    "zh": "要么你对，要么他对。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "Both...and 的用法",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "both...and 连接两个主语时，谓语动词用复数。",
    "sentence": "Both the teacher and the students are in the classroom.",
    "zh": "老师和学生们都在教室里。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "Either...or 的用法",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-shop.png",
    "lead": "either...or 连接两个主语时，谓语动词和最近的主语保持一致。",
    "sentence": "Either the blue or the red one is fine.",
    "zh": "要么蓝色的，要么红色的，都可以。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "both...and 与 either...or 的区别",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-panda.png",
    "lead": "both...and 表示两者都，either...or 表示二选一。",
    "sentence": "Both the panda and the monkey are cute, but either the panda or the monkey can be my pet.",
    "zh": "熊猫和猴子都很可爱，但要么熊猫，要么猴子可以当我的宠物。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w5-both-hero.jpg",
    "lead": "三组关联连词。",
    "rules": [
      {
        "tab": "both…and",
        "rule": "两者都；谓语动词用复数",
        "focusVerb": "both",
        "examples": [
          {
            "from": "father and mother",
            "to": "Both are doctors"
          }
        ],
        "sample": "Both my father and my mother are doctors.",
        "sampleZh": "我爸爸和妈妈都是医生。"
      },
      {
        "tab": "either…or",
        "rule": "要么…要么（二选一）；就近原则",
        "focusVerb": "either",
        "examples": [
          {
            "from": "stay or go",
            "to": "either…or"
          },
          {
            "from": "neither…nor",
            "to": "两者都不"
          }
        ],
        "sample": "You can either stay or go.",
        "sampleZh": "你可以留下，也可以走。"
      }
    ]
  },
  {
    "id": "p11",
    "section": "辨析",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w5-both-hero.jpg",
    "buckets": [
      {
        "key": "both",
        "label": "both…and"
      },
      {
        "key": "either",
        "label": "either…or / neither…nor"
      }
    ],
    "items": [
      {
        "text": "Both A and B are here.",
        "bucket": "both"
      },
      {
        "text": "Either tea or coffee",
        "bucket": "either"
      },
      {
        "text": "Both cats and dogs",
        "bucket": "both"
      },
      {
        "text": "Either you or I am wrong.",
        "bucket": "either"
      },
      {
        "text": "Both hands are clean.",
        "bucket": "both"
      },
      {
        "text": "Neither Tom nor Jim came.",
        "bucket": "either"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w5-both-hero.jpg",
    "question": "「Both my brother and my sister is good at swimming.」应改成？",
    "choices": [
      {
        "text": "are（both…and 后动词用复数）",
        "correct": true,
        "fb": "两者都 → 复数。"
      },
      {
        "text": "am",
        "correct": false,
        "fb": "主语不是 I。"
      },
      {
        "text": "be",
        "correct": false,
        "fb": "陈述句用 are。"
      }
    ],
    "sentence": "Both my brother and my sister are good at swimming.",
    "zh": "我哥哥和姐姐都擅长游泳。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w5-both-hero.jpg",
    "lead": "both 句改成 neither 否定。",
    "items": [
      {
        "from": "Both Tom and Jack like football.",
        "fromZh": "汤姆和杰克都喜欢足球。",
        "steps": [
          {
            "label": "改成两者都不喜欢",
            "opts": [
              "Neither Tom nor Jack likes football.",
              "Both Tom and Jack don't likes football.",
              "Neither Tom or Jack like football."
            ],
            "ans": 0,
            "hint": "neither…nor + 就近 likes。",
            "sentence": "Neither Tom nor Jack likes football.",
            "zh": "汤姆和杰克都不喜欢足球。"
          }
        ]
      },
      {
        "from": "Both my brother and my sister is good at swimming.",
        "fromZh": "我哥哥和我姐姐都擅长游泳。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "Both my brother and my sister are good at swimming.",
              "Both my brother and my sister is good at swimming.",
              "Both my brother and my sister be good at swimming."
            ],
            "ans": 0,
            "hint": "both...and 后用复数 are。",
            "sentence": "Both my brother and my sister are good at swimming.",
            "zh": "我哥哥和我姐姐都擅长游泳。"
          }
        ]
      },
      {
        "from": "Either you or he are right.",
        "fromZh": "要么你对，要么他对。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "Either you or he is right.",
              "Either you or he are right.",
              "Either you or he am right."
            ],
            "ans": 0,
            "hint": "就近原则，he 用 is。",
            "sentence": "Either you or he is right.",
            "zh": "要么你对，要么他对。"
          }
        ]
      },
      {
        "from": "Both Tom and Jerry likes cheese.",
        "fromZh": "汤姆和杰瑞都喜欢奶酪。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "Both Tom and Jerry like cheese.",
              "Both Tom and Jerry likes cheese.",
              "Both Tom and Jerry liking cheese."
            ],
            "ans": 0,
            "hint": "both...and 后动词用原形。",
            "sentence": "Both Tom and Jerry like cheese.",
            "zh": "汤姆和杰瑞都喜欢奶酪。"
          }
        ]
      },
      {
        "from": "Either my mom or my dad cook dinner.",
        "fromZh": "要么我妈妈，要么我爸爸做晚饭。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "Either my mom or my dad cooks dinner.",
              "Either my mom or my dad cook dinner.",
              "Either my mom or my dad cooking dinner."
            ],
            "ans": 0,
            "hint": "就近原则，my dad 单数用 cooks。",
            "sentence": "Either my mom or my dad cooks dinner.",
            "zh": "要么我妈妈，要么我爸爸做晚饭。"
          }
        ]
      },
      {
        "from": "Both the library and the playground is open.",
        "fromZh": "图书馆和操场都开放。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "Both the library and the playground are open.",
              "Both the library and the playground is open.",
              "Both the library and the playground be open."
            ],
            "ans": 0,
            "hint": "both...and 后用 are。",
            "sentence": "Both the library and the playground are open.",
            "zh": "图书馆和操场都开放。"
          }
        ]
      },
      {
        "from": "Either the bus or the taxi go to the zoo.",
        "fromZh": "要么公交车，要么出租车能到动物园。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "Either the bus or the taxi goes to the zoo.",
              "Either the bus or the taxi go to the zoo.",
              "Either the bus or the taxi going to the zoo."
            ],
            "ans": 0,
            "hint": "就近原则，taxi 单数用 goes。",
            "sentence": "Either the bus or the taxi goes to the zoo.",
            "zh": "要么公交车，要么出租车能到动物园。"
          }
        ]
      }
    ],
    "id": "p13"
  },
  {
    "section": "操练",
    "title": "看图造句",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "kp3d-panda.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "Both",
      "the",
      "panda",
      "and",
      "the",
      "tiger",
      "are",
      "in",
      "the",
      "zoo"
    ],
    "sentence": "Both the panda and the tiger are in the zoo.",
    "zh": "熊猫和老虎都在动物园里。",
    "items": [
      {
        "tokens": [
          "Both",
          "the",
          "panda",
          "and",
          "the",
          "tiger",
          "are",
          "in",
          "the",
          "zoo"
        ],
        "sentence": "Both the panda and the tiger are in the zoo.",
        "zh": "熊猫和老虎都在动物园里。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "Either",
          "you",
          "or",
          "your",
          "friend",
          "has",
          "my",
          "umbrella"
        ],
        "sentence": "Either you or your friend has my umbrella.",
        "zh": "要么你，要么你的朋友拿了我的伞。",
        "image": "kp3d-umbrella.png"
      },
      {
        "tokens": [
          "Both",
          "the",
          "window",
          "and",
          "the",
          "door",
          "are",
          "open"
        ],
        "sentence": "Both the window and the door are open.",
        "zh": "窗户和门都开着。",
        "image": "kp3d-window.png"
      },
      {
        "tokens": [
          "Either",
          "the",
          "doctor",
          "or",
          "the",
          "nurse",
          "will",
          "help",
          "you"
        ],
        "sentence": "Either the doctor or the nurse will help you.",
        "zh": "要么医生，要么护士会帮助你。",
        "image": "kp3d-doctor.png"
      },
      {
        "tokens": [
          "Both",
          "the",
          "piano",
          "and",
          "the",
          "guitar",
          "are",
          "expensive"
        ],
        "sentence": "Both the piano and the guitar are expensive.",
        "zh": "钢琴和吉他都很贵。",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "Either",
          "the",
          "tall",
          "boy",
          "or",
          "the",
          "short",
          "girl",
          "is",
          "the",
          "winner"
        ],
        "sentence": "Either the tall boy or the short girl is the winner.",
        "zh": "要么高个男孩，要么矮个女孩是赢家。",
        "image": "kp3d-taller.png"
      }
    ],
    "id": "p14"
  },
  {
    "id": "p15",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w5-both-hero.jpg",
    "audio": "Both my father and my mother are doctors.",
    "tokens": [
      "Both",
      "my",
      "father",
      "and",
      "my",
      "mother",
      "are",
      "doctors"
    ],
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w5-both-hero.jpg",
    "q": "Both my brother and my sister _____ good at swimming.",
    "opts": [
      "is",
      "are",
      "am"
    ],
    "ans": 1,
    "hint": "both…and 后动词用复数 are。",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和妈妈都是医生。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w5-both-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "Both my brother and my sister _____ good at swimming.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "both…and 后动词用复数 are。",
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "q": "You can take _____ the red bag _____ the blue one. They're both OK.",
        "opts": [
          "either; or",
          "both; or",
          "neither; and"
        ],
        "ans": 0,
        "hint": "二选一 either…or。",
        "sentence": "You can take either the red bag or the blue one.",
        "zh": "红包蓝包都可以选一个。"
      },
      {
        "q": "_____ Lily _____ Lucy has been to Beijing. （两人都不）",
        "opts": [
          "Both; and",
          "Either; or",
          "Neither; nor"
        ],
        "ans": 2,
        "hint": "neither…nor。",
        "sentence": "Neither Lily nor Lucy has been to Beijing.",
        "zh": "莉莉和露西都没去过北京。"
      },
      {
        "q": "Both of the answers _____ correct.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both of + 复数 are。",
        "sentence": "Both of the answers are correct.",
        "zh": "两个答案都对。"
      },
      {
        "q": "Either the students or the teacher _____ going to speak.",
        "opts": [
          "are",
          "is",
          "be"
        ],
        "ans": 1,
        "hint": "就近 teacher → is。",
        "sentence": "Either the students or the teacher is going to speak.",
        "zh": "要么学生说，要么老师说。"
      },
      {
        "q": "She can _____ sing _____ dance. She is talented.",
        "opts": [
          "either; or",
          "both; and",
          "neither; nor"
        ],
        "ans": 1,
        "hint": "两者都会 both…and。",
        "sentence": "She can both sing and dance.",
        "zh": "她既会唱歌又会跳舞。"
      },
      {
        "q": "Either you or he _____ right.",
        "opts": [
          "are",
          "is",
          "am"
        ],
        "ans": 1,
        "hint": "either...or 就近原则，看最近的主语 he。",
        "sentence": "Either you or he is right.",
        "zh": "要么你对，要么他对。"
      },
      {
        "q": "Both Tom and Jerry _____ cheese.",
        "opts": [
          "like",
          "likes",
          "liking"
        ],
        "ans": 0,
        "hint": "both...and 复数，动词用原形。",
        "sentence": "Both Tom and Jerry like cheese.",
        "zh": "汤姆和杰瑞都喜欢奶酪。"
      },
      {
        "q": "Either my mom or my dad _____ dinner.",
        "opts": [
          "cook",
          "cooks",
          "cooking"
        ],
        "ans": 1,
        "hint": "就近原则，my dad 是单数。",
        "sentence": "Either my mom or my dad cooks dinner.",
        "zh": "要么我妈妈，要么我爸爸做晚饭。"
      },
      {
        "q": "Both the library and the playground _____ open.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the library and the playground are open.",
        "zh": "图书馆和操场都开放。"
      },
      {
        "q": "Either the bus or the taxi _____ to the zoo.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "就近原则，taxi 是单数。",
        "sentence": "Either the bus or the taxi goes to the zoo.",
        "zh": "要么公交车，要么出租车能到动物园。"
      },
      {
        "q": "Both the panda and the monkey _____ cute.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the panda and the monkey are cute.",
        "zh": "熊猫和猴子都很可爱。"
      },
      {
        "q": "Either you or your sister _____ the room.",
        "opts": [
          "clean",
          "cleans",
          "cleaning"
        ],
        "ans": 1,
        "hint": "就近原则，your sister 是单数。",
        "sentence": "Either you or your sister cleans the room.",
        "zh": "要么你，要么你妹妹打扫房间。"
      },
      {
        "q": "Both apples and bananas _____ good for us.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both apples and bananas are good for us.",
        "zh": "苹果和香蕉对我们都有好处。"
      },
      {
        "q": "Either the pen or the pencil _____ mine.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，pencil 是单数。",
        "sentence": "Either the pen or the pencil is mine.",
        "zh": "要么这支钢笔，要么这支铅笔是我的。"
      },
      {
        "q": "Both the teacher and the students _____ in the classroom.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the teacher and the students are in the classroom.",
        "zh": "老师和学生们都在教室里。"
      }
    ],
    "id": "p17"
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
        "q": "Both my brother and my sister _____ good at swimming.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "both…and 后动词用复数 are。",
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "q": "You can take _____ the red bag _____ the blue one. They're both OK.",
        "opts": [
          "either; or",
          "both; or",
          "neither; and"
        ],
        "ans": 0,
        "hint": "二选一 either…or。",
        "sentence": "You can take either the red bag or the blue one.",
        "zh": "红包蓝包都可以选一个。"
      },
      {
        "q": "_____ Lily _____ Lucy has been to Beijing. （两人都不）",
        "opts": [
          "Both; and",
          "Either; or",
          "Neither; nor"
        ],
        "ans": 2,
        "hint": "neither…nor。",
        "sentence": "Neither Lily nor Lucy has been to Beijing.",
        "zh": "莉莉和露西都没去过北京。"
      },
      {
        "q": "Both of the answers _____ correct.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both of + 复数 are。",
        "sentence": "Both of the answers are correct.",
        "zh": "两个答案都对。"
      },
      {
        "q": "Either the students or the teacher _____ going to speak.",
        "opts": [
          "are",
          "is",
          "be"
        ],
        "ans": 1,
        "hint": "就近 teacher → is。",
        "sentence": "Either the students or the teacher is going to speak.",
        "zh": "要么学生说，要么老师说。"
      },
      {
        "q": "She can _____ sing _____ dance. She is talented.",
        "opts": [
          "either; or",
          "both; and",
          "neither; nor"
        ],
        "ans": 1,
        "hint": "两者都会 both…and。",
        "sentence": "She can both sing and dance.",
        "zh": "她既会唱歌又会跳舞。"
      },
      {
        "q": "Either you or he _____ right.",
        "opts": [
          "are",
          "is",
          "am"
        ],
        "ans": 1,
        "hint": "either...or 就近原则，看最近的主语 he。",
        "sentence": "Either you or he is right.",
        "zh": "要么你对，要么他对。"
      },
      {
        "q": "Both Tom and Jerry _____ cheese.",
        "opts": [
          "like",
          "likes",
          "liking"
        ],
        "ans": 0,
        "hint": "both...and 复数，动词用原形。",
        "sentence": "Both Tom and Jerry like cheese.",
        "zh": "汤姆和杰瑞都喜欢奶酪。"
      },
      {
        "q": "Either my mom or my dad _____ dinner.",
        "opts": [
          "cook",
          "cooks",
          "cooking"
        ],
        "ans": 1,
        "hint": "就近原则，my dad 是单数。",
        "sentence": "Either my mom or my dad cooks dinner.",
        "zh": "要么我妈妈，要么我爸爸做晚饭。"
      },
      {
        "q": "Both the library and the playground _____ open.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the library and the playground are open.",
        "zh": "图书馆和操场都开放。"
      },
      {
        "q": "Either the bus or the taxi _____ to the zoo.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "就近原则，taxi 是单数。",
        "sentence": "Either the bus or the taxi goes to the zoo.",
        "zh": "要么公交车，要么出租车能到动物园。"
      },
      {
        "q": "Both the panda and the monkey _____ cute.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the panda and the monkey are cute.",
        "zh": "熊猫和猴子都很可爱。"
      },
      {
        "q": "Either you or your sister _____ the room.",
        "opts": [
          "clean",
          "cleans",
          "cleaning"
        ],
        "ans": 1,
        "hint": "就近原则，your sister 是单数。",
        "sentence": "Either you or your sister cleans the room.",
        "zh": "要么你，要么你妹妹打扫房间。"
      },
      {
        "q": "Both apples and bananas _____ good for us.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both apples and bananas are good for us.",
        "zh": "苹果和香蕉对我们都有好处。"
      },
      {
        "q": "Either the pen or the pencil _____ mine.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，pencil 是单数。",
        "sentence": "Either the pen or the pencil is mine.",
        "zh": "要么这支钢笔，要么这支铅笔是我的。"
      },
      {
        "q": "Both the teacher and the students _____ in the classroom.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the teacher and the students are in the classroom.",
        "zh": "老师和学生们都在教室里。"
      },
      {
        "q": "Either the blue or the red one _____ fine.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the red one 是单数。",
        "sentence": "Either the blue or the red one is fine.",
        "zh": "要么蓝色的，要么红色的，都可以。"
      },
      {
        "q": "Both my brother and my sister _____ at swimming.",
        "opts": [
          "is good",
          "are good",
          "be good"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both my brother and my sister are good at swimming.",
        "zh": "我哥哥和我姐姐都擅长游泳。"
      },
      {
        "q": "Either the cat or the dog _____ the fish.",
        "opts": [
          "has eaten",
          "have eaten",
          "eat"
        ],
        "ans": 0,
        "hint": "就近原则，the dog 是单数，用 has。",
        "sentence": "Either the cat or the dog has eaten the fish.",
        "zh": "要么猫，要么狗吃了鱼。"
      },
      {
        "q": "Both the moon and the stars _____ bright tonight.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the moon and the stars are bright tonight.",
        "zh": "今晚月亮和星星都很亮。"
      },
      {
        "q": "Either you or your friend _____ my umbrella.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 1,
        "hint": "就近原则，your friend 是单数。",
        "sentence": "Either you or your friend has my umbrella.",
        "zh": "要么你，要么你的朋友拿了我的伞。"
      },
      {
        "q": "Both the window and the door _____ open.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the window and the door are open.",
        "zh": "窗户和门都开着。"
      },
      {
        "q": "Either the doctor or the nurse _____ help you.",
        "opts": [
          "will",
          "are",
          "is"
        ],
        "ans": 0,
        "hint": "either...or 连接名词，这里用情态动词 will。",
        "sentence": "Either the doctor or the nurse will help you.",
        "zh": "要么医生，要么护士会帮助你。"
      },
      {
        "q": "Both the piano and the guitar _____ expensive.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the piano and the guitar are expensive.",
        "zh": "钢琴和吉他都很贵。"
      },
      {
        "q": "Either the tall boy or the short girl _____ the winner.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the short girl 是单数。",
        "sentence": "Either the tall boy or the short girl is the winner.",
        "zh": "要么高个男孩，要么矮个女孩是赢家。"
      },
      {
        "q": "Both playing basketball and playing football _____ fun.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 连接两个动名词，谓语用复数。",
        "sentence": "Both playing basketball and playing football are fun.",
        "zh": "打篮球和踢足球都好玩。"
      },
      {
        "q": "Either the hot pot or the noodles _____ my favorite.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "就近原则，the noodles 是复数。",
        "sentence": "Either the hot pot or the noodles are my favorite.",
        "zh": "要么火锅，要么面条是我的最爱。"
      },
      {
        "q": "Both the umbrella and the raincoat _____ useful.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the umbrella and the raincoat are useful.",
        "zh": "雨伞和雨衣都有用。"
      },
      {
        "q": "Either the playground or the park _____ a good place.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the park 是单数。",
        "sentence": "Either the playground or the park is a good place.",
        "zh": "要么操场，要么公园是个好地方。"
      },
      {
        "q": "Both my parents _____ at home.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "parents 是复数。",
        "sentence": "Both my parents are at home.",
        "zh": "我父母都在家。"
      },
      {
        "q": "Either the milk or the eggs _____ in the fridge.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "就近原则，the eggs 是复数。",
        "sentence": "Either the milk or the eggs are in the fridge.",
        "zh": "要么牛奶，要么鸡蛋在冰箱里。"
      },
      {
        "q": "Both the dog and the cat _____ sleeping.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the dog and the cat are sleeping.",
        "zh": "狗和猫都在睡觉。"
      },
      {
        "q": "Either the bus or the bikes _____ the way.",
        "opts": [
          "blocks",
          "block",
          "blocking"
        ],
        "ans": 1,
        "hint": "就近原则，the bikes 是复数。",
        "sentence": "Either the bus or the bikes block the way.",
        "zh": "要么公交车，要么自行车挡住了路。"
      }
    ],
    "id": "p18"
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
        "q": "Both my brother and my sister _____ good at swimming.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "both…and 后动词用复数 are。",
        "sentence": "Both my father and my mother are doctors.",
        "zh": "我爸爸和妈妈都是医生。"
      },
      {
        "q": "You can take _____ the red bag _____ the blue one. They're both OK.",
        "opts": [
          "either; or",
          "both; or",
          "neither; and"
        ],
        "ans": 0,
        "hint": "二选一 either…or。",
        "sentence": "You can take either the red bag or the blue one.",
        "zh": "红包蓝包都可以选一个。"
      },
      {
        "q": "_____ Lily _____ Lucy has been to Beijing. （两人都不）",
        "opts": [
          "Both; and",
          "Either; or",
          "Neither; nor"
        ],
        "ans": 2,
        "hint": "neither…nor。",
        "sentence": "Neither Lily nor Lucy has been to Beijing.",
        "zh": "莉莉和露西都没去过北京。"
      },
      {
        "q": "Both of the answers _____ correct.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both of + 复数 are。",
        "sentence": "Both of the answers are correct.",
        "zh": "两个答案都对。"
      },
      {
        "q": "Either the students or the teacher _____ going to speak.",
        "opts": [
          "are",
          "is",
          "be"
        ],
        "ans": 1,
        "hint": "就近 teacher → is。",
        "sentence": "Either the students or the teacher is going to speak.",
        "zh": "要么学生说，要么老师说。"
      },
      {
        "q": "She can _____ sing _____ dance. She is talented.",
        "opts": [
          "either; or",
          "both; and",
          "neither; nor"
        ],
        "ans": 1,
        "hint": "两者都会 both…and。",
        "sentence": "She can both sing and dance.",
        "zh": "她既会唱歌又会跳舞。"
      },
      {
        "q": "Either you or he _____ right.",
        "opts": [
          "are",
          "is",
          "am"
        ],
        "ans": 1,
        "hint": "either...or 就近原则，看最近的主语 he。",
        "sentence": "Either you or he is right.",
        "zh": "要么你对，要么他对。"
      },
      {
        "q": "Both Tom and Jerry _____ cheese.",
        "opts": [
          "like",
          "likes",
          "liking"
        ],
        "ans": 0,
        "hint": "both...and 复数，动词用原形。",
        "sentence": "Both Tom and Jerry like cheese.",
        "zh": "汤姆和杰瑞都喜欢奶酪。"
      },
      {
        "q": "Either my mom or my dad _____ dinner.",
        "opts": [
          "cook",
          "cooks",
          "cooking"
        ],
        "ans": 1,
        "hint": "就近原则，my dad 是单数。",
        "sentence": "Either my mom or my dad cooks dinner.",
        "zh": "要么我妈妈，要么我爸爸做晚饭。"
      },
      {
        "q": "Both the library and the playground _____ open.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the library and the playground are open.",
        "zh": "图书馆和操场都开放。"
      },
      {
        "q": "Either the bus or the taxi _____ to the zoo.",
        "opts": [
          "go",
          "goes",
          "going"
        ],
        "ans": 1,
        "hint": "就近原则，taxi 是单数。",
        "sentence": "Either the bus or the taxi goes to the zoo.",
        "zh": "要么公交车，要么出租车能到动物园。"
      },
      {
        "q": "Both the panda and the monkey _____ cute.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the panda and the monkey are cute.",
        "zh": "熊猫和猴子都很可爱。"
      },
      {
        "q": "Either you or your sister _____ the room.",
        "opts": [
          "clean",
          "cleans",
          "cleaning"
        ],
        "ans": 1,
        "hint": "就近原则，your sister 是单数。",
        "sentence": "Either you or your sister cleans the room.",
        "zh": "要么你，要么你妹妹打扫房间。"
      },
      {
        "q": "Both apples and bananas _____ good for us.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both apples and bananas are good for us.",
        "zh": "苹果和香蕉对我们都有好处。"
      },
      {
        "q": "Either the pen or the pencil _____ mine.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，pencil 是单数。",
        "sentence": "Either the pen or the pencil is mine.",
        "zh": "要么这支钢笔，要么这支铅笔是我的。"
      },
      {
        "q": "Both the teacher and the students _____ in the classroom.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the teacher and the students are in the classroom.",
        "zh": "老师和学生们都在教室里。"
      },
      {
        "q": "Either the blue or the red one _____ fine.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the red one 是单数。",
        "sentence": "Either the blue or the red one is fine.",
        "zh": "要么蓝色的，要么红色的，都可以。"
      },
      {
        "q": "Both my brother and my sister _____ at swimming.",
        "opts": [
          "is good",
          "are good",
          "be good"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both my brother and my sister are good at swimming.",
        "zh": "我哥哥和我姐姐都擅长游泳。"
      },
      {
        "q": "Either the cat or the dog _____ the fish.",
        "opts": [
          "has eaten",
          "have eaten",
          "eat"
        ],
        "ans": 0,
        "hint": "就近原则，the dog 是单数，用 has。",
        "sentence": "Either the cat or the dog has eaten the fish.",
        "zh": "要么猫，要么狗吃了鱼。"
      },
      {
        "q": "Both the moon and the stars _____ bright tonight.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the moon and the stars are bright tonight.",
        "zh": "今晚月亮和星星都很亮。"
      },
      {
        "q": "Either you or your friend _____ my umbrella.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 1,
        "hint": "就近原则，your friend 是单数。",
        "sentence": "Either you or your friend has my umbrella.",
        "zh": "要么你，要么你的朋友拿了我的伞。"
      },
      {
        "q": "Both the window and the door _____ open.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the window and the door are open.",
        "zh": "窗户和门都开着。"
      },
      {
        "q": "Either the doctor or the nurse _____ help you.",
        "opts": [
          "will",
          "are",
          "is"
        ],
        "ans": 0,
        "hint": "either...or 连接名词，这里用情态动词 will。",
        "sentence": "Either the doctor or the nurse will help you.",
        "zh": "要么医生，要么护士会帮助你。"
      },
      {
        "q": "Both the piano and the guitar _____ expensive.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the piano and the guitar are expensive.",
        "zh": "钢琴和吉他都很贵。"
      },
      {
        "q": "Either the tall boy or the short girl _____ the winner.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the short girl 是单数。",
        "sentence": "Either the tall boy or the short girl is the winner.",
        "zh": "要么高个男孩，要么矮个女孩是赢家。"
      },
      {
        "q": "Both playing basketball and playing football _____ fun.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 连接两个动名词，谓语用复数。",
        "sentence": "Both playing basketball and playing football are fun.",
        "zh": "打篮球和踢足球都好玩。"
      },
      {
        "q": "Either the hot pot or the noodles _____ my favorite.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "就近原则，the noodles 是复数。",
        "sentence": "Either the hot pot or the noodles are my favorite.",
        "zh": "要么火锅，要么面条是我的最爱。"
      },
      {
        "q": "Both the umbrella and the raincoat _____ useful.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the umbrella and the raincoat are useful.",
        "zh": "雨伞和雨衣都有用。"
      },
      {
        "q": "Either the playground or the park _____ a good place.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the park 是单数。",
        "sentence": "Either the playground or the park is a good place.",
        "zh": "要么操场，要么公园是个好地方。"
      },
      {
        "q": "Both my parents _____ at home.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "parents 是复数。",
        "sentence": "Both my parents are at home.",
        "zh": "我父母都在家。"
      },
      {
        "q": "Either the milk or the eggs _____ in the fridge.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "就近原则，the eggs 是复数。",
        "sentence": "Either the milk or the eggs are in the fridge.",
        "zh": "要么牛奶，要么鸡蛋在冰箱里。"
      },
      {
        "q": "Both the dog and the cat _____ sleeping.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the dog and the cat are sleeping.",
        "zh": "狗和猫都在睡觉。"
      },
      {
        "q": "Either the bus or the bikes _____ the way.",
        "opts": [
          "blocks",
          "block",
          "blocking"
        ],
        "ans": 1,
        "hint": "就近原则，the bikes 是复数。",
        "sentence": "Either the bus or the bikes block the way.",
        "zh": "要么公交车，要么自行车挡住了路。"
      }
    ],
    "id": "p19"
  },
  {
    "section": "游戏",
    "title": "英中配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "image": "w5-both-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "both…and",
        "zh": "两者都"
      },
      {
        "en": "either…or",
        "zh": "要么……要么"
      },
      {
        "en": "neither…nor",
        "zh": "既不……也不"
      },
      {
        "en": "就近原则",
        "zh": "靠近动词的名词决定单复数"
      },
      {
        "en": "both...and",
        "zh": "两者都"
      },
      {
        "en": "either...or",
        "zh": "要么……要么……"
      },
      {
        "en": "both you and me",
        "zh": "你和我都"
      },
      {
        "en": "either tea or coffee",
        "zh": "要么茶，要么咖啡"
      },
      {
        "en": "both the panda and the tiger",
        "zh": "熊猫和老虎都"
      },
      {
        "en": "either the red or the blue",
        "zh": "要么红色，要么蓝色"
      },
      {
        "en": "both morning and evening",
        "zh": "早上和晚上都"
      },
      {
        "en": "either at home or at school",
        "zh": "要么在家，要么在学校"
      },
      {
        "en": "both playing and studying",
        "zh": "玩和学习都"
      },
      {
        "en": "either the bus or the metro",
        "zh": "要么公交，要么地铁"
      }
    ],
    "id": "p20"
  },
  {
    "section": "听音",
    "title": "听音快选",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "w5-both-hero.jpg",
    "audio": "Both my father and my mother are doctors.",
    "opts": [
      "Both my father and my mother are doctors.",
      "Both my father or my mother are doctors.",
      "Either my father or my mother are doctors."
    ],
    "ans": 0,
    "hint": "注意 both...and 表示两者都。",
    "sentence": "Both my father and my mother are doctors.",
    "zh": "我爸爸和我妈妈都是医生。",
    "questions": [
      {
        "audio": "Both my father and my mother are doctors.",
        "opts": [
          "Both my father and my mother are doctors.",
          "Both my father or my mother are doctors.",
          "Either my father or my mother are doctors."
        ],
        "ans": 0,
        "hint": "注意 both...and 表示两者都。",
        "zh": "我爸爸和我妈妈都是医生。",
        "sentence": "Both my father and my mother are doctors."
      },
      {
        "audio": "Either you or he is right.",
        "opts": [
          "Either you or he is right.",
          "Either you or he are right.",
          "Both you and he is right."
        ],
        "ans": 0,
        "hint": "either...or 就近原则，用 is。",
        "zh": "要么你对，要么他对。",
        "sentence": "Either you or he is right."
      },
      {
        "audio": "Both Tom and Jerry like cheese.",
        "opts": [
          "Both Tom and Jerry like cheese.",
          "Both Tom and Jerry likes cheese.",
          "Either Tom or Jerry like cheese."
        ],
        "ans": 0,
        "hint": "both...and 后动词原形。",
        "zh": "汤姆和杰瑞都喜欢奶酪。",
        "sentence": "Both Tom and Jerry like cheese."
      },
      {
        "audio": "Either my mom or my dad cooks dinner.",
        "opts": [
          "Either my mom or my dad cooks dinner.",
          "Either my mom or my dad cook dinner.",
          "Both my mom and my dad cooks dinner."
        ],
        "ans": 0,
        "hint": "就近原则，dad 单数用 cooks。",
        "zh": "要么我妈妈，要么我爸爸做晚饭。",
        "sentence": "Either my mom or my dad cooks dinner."
      },
      {
        "audio": "Both the library and the playground are open.",
        "opts": [
          "Both the library and the playground are open.",
          "Both the library and the playground is open.",
          "Either the library or the playground are open."
        ],
        "ans": 0,
        "hint": "both...and 后用 are。",
        "zh": "图书馆和操场都开放。",
        "sentence": "Both the library and the playground are open."
      },
      {
        "audio": "Either the bus or the taxi goes to the zoo.",
        "opts": [
          "Either the bus or the taxi goes to the zoo.",
          "Either the bus or the taxi go to the zoo.",
          "Both the bus and the taxi goes to the zoo."
        ],
        "ans": 0,
        "hint": "就近原则，taxi 单数用 goes。",
        "zh": "要么公交车，要么出租车能到动物园。",
        "sentence": "Either the bus or the taxi goes to the zoo."
      },
      {
        "audio": "Both the panda and the monkey are cute.",
        "opts": [
          "Both the panda and the monkey are cute.",
          "Both the panda and the monkey is cute.",
          "Either the panda or the monkey are cute."
        ],
        "ans": 0,
        "hint": "both...and 复数。",
        "zh": "熊猫和猴子都很可爱。",
        "sentence": "Both the panda and the monkey are cute."
      },
      {
        "audio": "Either you or your sister cleans the room.",
        "opts": [
          "Either you or your sister cleans the room.",
          "Either you or your sister clean the room.",
          "Both you and your sister cleans the room."
        ],
        "ans": 0,
        "hint": "就近原则，sister 单数用 cleans。",
        "zh": "要么你，要么你妹妹打扫房间。",
        "sentence": "Either you or your sister cleans the room."
      }
    ],
    "id": "p21"
  },
  {
    "section": "语料库",
    "title": "语料库 · 例句精读",
    "type": "corpus",
    "badge": "demo",
    "badgeText": "📚 语料",
    "image": "w5-both-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Both my father and my mother are doctors.",
        "zh": "我爸爸和我妈妈都是医生。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Both Tom and Jerry like cheese.",
        "zh": "汤姆和杰瑞都喜欢奶酪。",
        "tag": "daily_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "Both the library and the playground are open.",
        "zh": "图书馆和操场都开放。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Either you or he is right.",
        "zh": "要么你对，要么他对。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Either my mom or my dad cooks dinner.",
        "zh": "要么我妈妈，要么我爸爸做晚饭。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Either the bus or the taxi goes to the zoo.",
        "zh": "要么公交车，要么出租车能到动物园。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Both the panda and the monkey are cute.",
        "zh": "熊猫和猴子都很可爱。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Either you or your sister cleans the room.",
        "zh": "要么你，要么你妹妹打扫房间。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Both apples and bananas are good for us.",
        "zh": "苹果和香蕉对我们都有好处。",
        "tag": "exam_use",
        "scene": "apple",
        "image": "kp3d-apple.png"
      },
      {
        "en": "Either the pen or the pencil is mine.",
        "zh": "要么这支钢笔，要么这支铅笔是我的。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "Both the teacher and the students are in the classroom.",
        "zh": "老师和学生们都在教室里。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Either the blue or the red one is fine.",
        "zh": "要么蓝色的，要么红色的，都可以。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "Both my brother and my sister are good at swimming.",
        "zh": "我哥哥和我姐姐都擅长游泳。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "Either the cat or the dog has eaten the fish.",
        "zh": "要么猫，要么狗吃了鱼。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "Both the moon and the stars are bright tonight.",
        "zh": "今晚月亮和星星都很亮。",
        "tag": "exam_use",
        "scene": "moon",
        "image": "kp3d-moon.png"
      },
      {
        "en": "Either you or your friend has my umbrella.",
        "zh": "要么你，要么你的朋友拿了我的伞。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "Both the window and the door are open.",
        "zh": "窗户和门都开着。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "Either the doctor or the nurse will help you.",
        "zh": "要么医生，要么护士会帮助你。",
        "tag": "writing_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "Both the piano and the guitar are expensive.",
        "zh": "钢琴和吉他都很贵。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "Either the tall boy or the short girl is the winner.",
        "zh": "要么高个男孩，要么矮个女孩是赢家。",
        "tag": "writing_use",
        "scene": "taller",
        "image": "kp3d-taller.png"
      },
      {
        "en": "Both playing basketball and playing football are fun.",
        "zh": "打篮球和踢足球都好玩。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "Either the hot pot or the noodles is my favorite.",
        "zh": "要么火锅，要么面条是我的最爱。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "Both the umbrella and the raincoat are useful.",
        "zh": "雨伞和雨衣都有用。",
        "tag": "writing_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "Either the playground or the park is a good place.",
        "zh": "要么操场，要么公园是个好地方。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      }
    ],
    "id": "p22"
  },
  {
    "section": "加练",
    "title": "加练卷 · 再练二十题",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 加练",
    "image": "w5-both-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "Either the blue or the red one _____ fine.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the red one 是单数。",
        "sentence": "Either the blue or the red one is fine.",
        "zh": "要么蓝色的，要么红色的，都可以。"
      },
      {
        "q": "Both my brother and my sister _____ at swimming.",
        "opts": [
          "is good",
          "are good",
          "be good"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both my brother and my sister are good at swimming.",
        "zh": "我哥哥和我姐姐都擅长游泳。"
      },
      {
        "q": "Either the cat or the dog _____ the fish.",
        "opts": [
          "has eaten",
          "have eaten",
          "eat"
        ],
        "ans": 0,
        "hint": "就近原则，the dog 是单数，用 has。",
        "sentence": "Either the cat or the dog has eaten the fish.",
        "zh": "要么猫，要么狗吃了鱼。"
      },
      {
        "q": "Both the moon and the stars _____ bright tonight.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the moon and the stars are bright tonight.",
        "zh": "今晚月亮和星星都很亮。"
      },
      {
        "q": "Either you or your friend _____ my umbrella.",
        "opts": [
          "have",
          "has",
          "having"
        ],
        "ans": 1,
        "hint": "就近原则，your friend 是单数。",
        "sentence": "Either you or your friend has my umbrella.",
        "zh": "要么你，要么你的朋友拿了我的伞。"
      },
      {
        "q": "Both the window and the door _____ open.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the window and the door are open.",
        "zh": "窗户和门都开着。"
      },
      {
        "q": "Either the doctor or the nurse _____ help you.",
        "opts": [
          "will",
          "are",
          "is"
        ],
        "ans": 0,
        "hint": "either...or 连接名词，这里用情态动词 will。",
        "sentence": "Either the doctor or the nurse will help you.",
        "zh": "要么医生，要么护士会帮助你。"
      },
      {
        "q": "Both the piano and the guitar _____ expensive.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the piano and the guitar are expensive.",
        "zh": "钢琴和吉他都很贵。"
      },
      {
        "q": "Either the tall boy or the short girl _____ the winner.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the short girl 是单数。",
        "sentence": "Either the tall boy or the short girl is the winner.",
        "zh": "要么高个男孩，要么矮个女孩是赢家。"
      },
      {
        "q": "Both playing basketball and playing football _____ fun.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 连接两个动名词，谓语用复数。",
        "sentence": "Both playing basketball and playing football are fun.",
        "zh": "打篮球和踢足球都好玩。"
      },
      {
        "q": "Either the hot pot or the noodles _____ my favorite.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "就近原则，the noodles 是复数。",
        "sentence": "Either the hot pot or the noodles are my favorite.",
        "zh": "要么火锅，要么面条是我的最爱。"
      },
      {
        "q": "Both the umbrella and the raincoat _____ useful.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the umbrella and the raincoat are useful.",
        "zh": "雨伞和雨衣都有用。"
      },
      {
        "q": "Either the playground or the park _____ a good place.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 0,
        "hint": "就近原则，the park 是单数。",
        "sentence": "Either the playground or the park is a good place.",
        "zh": "要么操场，要么公园是个好地方。"
      },
      {
        "q": "Both my parents _____ at home.",
        "opts": [
          "is",
          "are",
          "am"
        ],
        "ans": 1,
        "hint": "parents 是复数。",
        "sentence": "Both my parents are at home.",
        "zh": "我父母都在家。"
      },
      {
        "q": "Either the milk or the eggs _____ in the fridge.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "就近原则，the eggs 是复数。",
        "sentence": "Either the milk or the eggs are in the fridge.",
        "zh": "要么牛奶，要么鸡蛋在冰箱里。"
      },
      {
        "q": "Both the dog and the cat _____ sleeping.",
        "opts": [
          "is",
          "are",
          "be"
        ],
        "ans": 1,
        "hint": "both...and 复数。",
        "sentence": "Both the dog and the cat are sleeping.",
        "zh": "狗和猫都在睡觉。"
      },
      {
        "q": "Either the bus or the bikes _____ the way.",
        "opts": [
          "blocks",
          "block",
          "blocking"
        ],
        "ans": 1,
        "hint": "就近原则，the bikes 是复数。",
        "sentence": "Either the bus or the bikes block the way.",
        "zh": "要么公交车，要么自行车挡住了路。"
      }
    ],
    "id": "p23"
  },
  {
    "section": "小结",
    "title": "本讲小结",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "writing.jpg",
    "checklist": [
      "both…and 两者都，动词复数",
      "either…or 二选一",
      "neither…nor 两者都不",
      "neither…nor 也遵循就近原则。"
    ],
    "chant": "Both and both — plural verb! Either or — choose one, you heard!",
    "chantSpeak": "Both and both, plural verb! Either or, choose one, you heard!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "both…and / either…or",
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