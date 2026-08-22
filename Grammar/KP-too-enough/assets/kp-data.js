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
    "audio": "He is too young to go to school alone.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么语法或搭配？",
    "sentence": "He is too young to go to school alone.",
    "zh": "他太小了，不能独自上学。",
    "image": "l14-too-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l14-too-hero.jpg",
    "question": "too young to go 表示「能去」还是「不能去」？",
    "choices": [
      {
        "text": "太年轻而不能独自去（否定结果）",
        "correct": true,
        "fb": "对了！too…to = 太……而不能。"
      },
      {
        "text": "非常年轻所以能去",
        "correct": false,
        "fb": "too…to 表否定结果。"
      },
      {
        "text": "和 very young 完全一样",
        "correct": false,
        "fb": "too 带有「过分」含义。"
      }
    ],
    "sentence": "He is too young to go to school alone.",
    "zh": "他太小了，不能独自上学。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "l14-too-hero.jpg",
    "lead": "too…to 表示「太……而不能」；enough to 表示「足够……可以」。",
    "formula": "too + 形 + to do　　adj + enough + to do",
    "parts": [
      {
        "mark": "too",
        "label": "太……（否定结果）",
        "example": "too young to go"
      },
      {
        "mark": "enough",
        "label": "足够（肯定结果）",
        "example": "old enough to go"
      }
    ],
    "samples": [
      {
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "sentence": "She is old enough to look after herself.",
        "zh": "她已经够大，可以照顾自己了。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "l14-too.jpg",
    "rightImage": "l14-enough.jpg",
    "leftLabel": "too…to 不能",
    "rightLabel": "enough to 能",
    "leftSentence": "He is too young to go alone.",
    "leftZh": "他太小不能独自去。",
    "rightSentence": "He is old enough to ride a bike.",
    "rightZh": "他够大可以骑自行车了。",
    "morphBase": "too young",
    "morphPast": "old enough",
    "morphHighlight": "",
    "discovery": "too + adj + to do；adj + enough + to do。"
  },
  {
    "section": "精讲",
    "title": "例句 · too…to",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l14-too-hero.jpg",
    "lead": "too 在形容词前，to 后接原形。",
    "sentence": "The box is too heavy to carry.",
    "zh": "这个箱子太重了，搬不动。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · enough to",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "l14-too-hero.jpg",
    "lead": "enough 放在形容词后面。",
    "sentence": "She is old enough to look after herself.",
    "zh": "她已经够大，可以照顾自己了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "too…to：太……而不能",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "当表示“太……以至于不能做某事”时，用 too + 形容词 + to do。",
    "sentence": "He is too tired to finish his homework.",
    "zh": "他太累了，没法完成作业。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "enough to：足够……可以做",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-library.png",
    "lead": "当表示“足够……以至于能做某事”时，用 形容词 + enough + to do。注意 enough 在形容词后面。",
    "sentence": "She is careful enough to check every detail.",
    "zh": "她够细心，能检查每个细节。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "易错点：enough 的位置",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "enough 必须放在形容词后面，不能说 enough old，要说 old enough。",
    "sentence": "He is old enough to go to school.",
    "zh": "他够大了，能上学了。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "l14-too-hero.jpg",
    "rules": [
      {
        "tab": "too…to",
        "rule": "too + 形容词 + to do（太……而不能）",
        "focusVerb": "too",
        "examples": [
          {
            "from": "young",
            "to": "too young to go"
          }
        ],
        "sample": "He is too young to go to school alone.",
        "sampleZh": "他太小了，不能独自上学。"
      },
      {
        "tab": "enough to",
        "rule": "形容词 + enough + to do（足够……可以）",
        "focusVerb": "enough",
        "examples": [
          {
            "from": "old",
            "to": "old enough to ride"
          }
        ],
        "sample": "He is old enough to ride a bike.",
        "sampleZh": "他够大可以骑自行车了。"
      }
    ]
  },
  {
    "id": "p11",
    "section": "辨析",
    "title": "分类篮 · 对错分辨",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "l14-too-hero.jpg",
    "buckets": [
      {
        "key": "too",
        "label": "too…to"
      },
      {
        "key": "enuf",
        "label": "enough to"
      }
    ],
    "items": [
      {
        "text": "too tired to walk",
        "bucket": "too"
      },
      {
        "text": "strong enough to carry",
        "bucket": "enuf"
      },
      {
        "text": "too noisy to study",
        "bucket": "too"
      },
      {
        "text": "old enough to help",
        "bucket": "enuf"
      },
      {
        "text": "too hot to play",
        "bucket": "too"
      },
      {
        "text": "tall enough to reach",
        "bucket": "enuf"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "l14-too-hero.jpg",
    "question": "「He is enough old to go.」错在哪？",
    "choices": [
      {
        "text": "enough 应放在形容词后：old enough",
        "correct": true,
        "fb": "adj + enough，不是 enough + adj。"
      },
      {
        "text": "要用 too old",
        "correct": false,
        "fb": "enough 是「足够」，不是 too。"
      },
      {
        "text": "go 要改成 going",
        "correct": false,
        "fb": "to 后用原形。"
      }
    ],
    "sentence": "He is old enough to go.",
    "zh": "他够大了，可以去。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "l14-too-hero.jpg",
    "lead": "too…to 常可与 not + adj + enough 转换。",
    "items": [
      {
        "from": "The boy is too short to reach the book.",
        "fromZh": "男孩太矮，够不着那本书。",
        "steps": [
          {
            "label": "改用 not + enough",
            "opts": [
              "The boy is not tall enough to reach the book.",
              "The boy is not too tall to reach the book.",
              "The boy is tall not enough to reach the book."
            ],
            "ans": 0,
            "hint": "too short = not tall enough。",
            "sentence": "The boy is not tall enough to reach the book.",
            "zh": "男孩不够高，够不着书。"
          }
        ]
      },
      {
        "from": "He is enough old to go.",
        "fromZh": "他够大了，可以去。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "He is old enough to go.",
              "He is enough old to go.",
              "He is too old to go."
            ],
            "ans": 0,
            "hint": "enough 要放在形容词后面",
            "sentence": "He is old enough to go.",
            "zh": "他够大了，可以去。"
          }
        ]
      },
      {
        "from": "The coffee is too hot for me to drink.",
        "fromZh": "咖啡太烫，我不能喝。",
        "steps": [
          {
            "label": "改成用 enough 的句子",
            "opts": [
              "The coffee is cool enough for me to drink.",
              "The coffee is hot enough for me to drink.",
              "The coffee is too cool for me to drink."
            ],
            "ans": 0,
            "hint": "too hot 的反义是 cool enough",
            "sentence": "The coffee is cool enough for me to drink.",
            "zh": "咖啡够凉，我能喝。"
          }
        ]
      },
      {
        "from": "She is too short to reach the top shelf.",
        "fromZh": "她太矮了，够不到最上面的架子。",
        "steps": [
          {
            "label": "改成用 enough 的句子",
            "opts": [
              "She is tall enough to reach the top shelf.",
              "She is short enough to reach the top shelf.",
              "She is too tall to reach the top shelf."
            ],
            "ans": 0,
            "hint": "too short 的反义是 tall enough",
            "sentence": "She is tall enough to reach the top shelf.",
            "zh": "她够高，能够到最上面的架子。"
          }
        ]
      },
      {
        "from": "The problem is too difficult for me to solve.",
        "fromZh": "这个问题太难，我解决不了。",
        "steps": [
          {
            "label": "改成用 enough 的句子",
            "opts": [
              "The problem is easy enough for me to solve.",
              "The problem is difficult enough for me to solve.",
              "The problem is too easy for me to solve."
            ],
            "ans": 0,
            "hint": "too difficult 的反义是 easy enough",
            "sentence": "The problem is easy enough for me to solve.",
            "zh": "这个问题够简单，我能解决。"
          }
        ]
      },
      {
        "from": "He is strong enough to lift the box.",
        "fromZh": "他够强壮，能抬起箱子。",
        "steps": [
          {
            "label": "改成用 too 的句子",
            "opts": [
              "He is too weak to lift the box.",
              "He is too strong to lift the box.",
              "He is weak enough to lift the box."
            ],
            "ans": 0,
            "hint": "strong enough 的反义是 too weak",
            "sentence": "He is too weak to lift the box.",
            "zh": "他太弱了，抬不起箱子。"
          }
        ]
      },
      {
        "from": "The room is big enough for us to play.",
        "fromZh": "房间够大，我们能玩。",
        "steps": [
          {
            "label": "改成用 too 的句子",
            "opts": [
              "The room is too small for us to play.",
              "The room is too big for us to play.",
              "The room is small enough for us to play."
            ],
            "ans": 0,
            "hint": "big enough 的反义是 too small",
            "sentence": "The room is too small for us to play.",
            "zh": "房间太小了，我们不能玩。"
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
      "The",
      "panda",
      "is",
      "too",
      "cute",
      "to",
      "ignore"
    ],
    "sentence": "The panda is too cute to ignore.",
    "zh": "熊猫太可爱了，让人无法忽视。",
    "items": [
      {
        "tokens": [
          "The",
          "panda",
          "is",
          "too",
          "cute",
          "to",
          "ignore"
        ],
        "sentence": "The panda is too cute to ignore.",
        "zh": "熊猫太可爱了，让人无法忽视。",
        "image": "kp3d-panda.png"
      },
      {
        "tokens": [
          "She",
          "is",
          "tall",
          "enough",
          "to",
          "reach",
          "the",
          "top",
          "shelf"
        ],
        "sentence": "She is tall enough to reach the top shelf.",
        "zh": "她够高，能够到最上面的架子。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "The",
          "bus",
          "is",
          "too",
          "crowded",
          "to",
          "sit",
          "down"
        ],
        "sentence": "The bus is too crowded to sit down.",
        "zh": "公交车太挤了，没法坐下。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "The",
          "soup",
          "is",
          "cool",
          "enough",
          "to",
          "eat",
          "now"
        ],
        "sentence": "The soup is cool enough to eat now.",
        "zh": "汤够凉了，现在可以吃了。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "He",
          "is",
          "strong",
          "enough",
          "to",
          "carry",
          "the",
          "heavy",
          "box"
        ],
        "sentence": "He is strong enough to carry the heavy box.",
        "zh": "他够强壮，能搬动重箱子。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "The",
          "music",
          "is",
          "too",
          "loud",
          "to",
          "hear",
          "the",
          "teacher"
        ],
        "sentence": "The music is too loud to hear the teacher.",
        "zh": "音乐声太大，听不见老师说话。",
        "image": "kp3d-piano.png"
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
    "image": "l14-too-hero.jpg",
    "audio": "She is old enough to look after herself.",
    "tokens": [
      "She",
      "is",
      "old",
      "enough",
      "to",
      "look",
      "after",
      "herself"
    ],
    "sentence": "She is old enough to look after herself.",
    "zh": "她够大可以照顾自己了。"
  },
  {
    "id": "p16",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "l14-too-hero.jpg",
    "q": "The box is _____ heavy _____ carry.",
    "opts": [
      "too; to",
      "enough; to",
      "to; too"
    ],
    "ans": 0,
    "hint": "too heavy to carry = 太重搬不动。",
    "sentence": "He is too young to go to school alone.",
    "zh": "他太小了，不能独自上学。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "l14-too-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "The box is _____ heavy _____ carry.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "too heavy to carry = 太重搬不动。",
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "q": "The tea is _____ hot _____ drink.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "太烫而不能喝。",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "This room is big _____ for us to live in.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "形容词后 enough。",
        "sentence": "This room is big enough for us to live in.",
        "zh": "这房间够大，我们住得下。"
      },
      {
        "q": "She is _____ weak _____ carry the bag.",
        "opts": [
          "too; to",
          "so; that",
          "enough; to"
        ],
        "ans": 0,
        "hint": "太弱而不能搬。",
        "sentence": "She is too weak to carry the bag.",
        "zh": "她太弱，搬不动袋子。"
      },
      {
        "q": "He ran fast _____ to catch the bus.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "副词后 enough：fast enough。",
        "sentence": "He ran fast enough to catch the bus.",
        "zh": "他跑得够快，赶上了车。"
      },
      {
        "q": "The problem is _____ difficult for me to work out.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 0,
        "hint": "too + 形 + for sb + to do。",
        "sentence": "The problem is too difficult for me to work out.",
        "zh": "这题对我来说太难，做不出来。"
      },
      {
        "q": "The tea is _____ to drink. It's too hot.",
        "opts": [
          "too hot",
          "hot too",
          "enough hot"
        ],
        "ans": 0,
        "hint": "too + 形容词，表示太……而不能",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "She is _____ to go to school. She is only five.",
        "opts": [
          "too young",
          "young enough",
          "enough young"
        ],
        "ans": 0,
        "hint": "too young = 太小，否定结果",
        "sentence": "She is too young to go to school.",
        "zh": "她太小了，不能上学。"
      },
      {
        "q": "He is _____ to carry the heavy box. He is strong.",
        "opts": [
          "too strong",
          "strong enough",
          "enough strong"
        ],
        "ans": 1,
        "hint": "形容词 + enough，表示足够",
        "sentence": "He is strong enough to carry the heavy box.",
        "zh": "他够强壮，能搬动重箱子。"
      },
      {
        "q": "The movie is _____ to watch again. It's very funny.",
        "opts": [
          "funny enough",
          "enough funny",
          "too funny"
        ],
        "ans": 0,
        "hint": "enough 放在形容词后面",
        "sentence": "The movie is funny enough to watch again.",
        "zh": "这部电影够有趣，值得再看一遍。"
      },
      {
        "q": "The soup is _____ to eat. It's too salty.",
        "opts": [
          "too salty",
          "salty enough",
          "enough salty"
        ],
        "ans": 0,
        "hint": "too salty = 太咸，不能吃",
        "sentence": "The soup is too salty to eat.",
        "zh": "汤太咸了，不能喝。"
      },
      {
        "q": "He is _____ to drive a car. He is only 16.",
        "opts": [
          "too young",
          "young enough",
          "enough young"
        ],
        "ans": 0,
        "hint": "年龄不够，用 too young",
        "sentence": "He is too young to drive a car.",
        "zh": "他太小了，不能开车。"
      },
      {
        "q": "The classroom is _____ for all the students. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The classroom is big enough for all the students.",
        "zh": "教室够大，能容纳所有学生。"
      },
      {
        "q": "The box is _____ for me to lift. It's too heavy.",
        "opts": [
          "too heavy",
          "heavy enough",
          "enough heavy"
        ],
        "ans": 0,
        "hint": "too heavy = 太重，不能搬",
        "sentence": "The box is too heavy for me to lift.",
        "zh": "这个箱子太重了，我搬不动。"
      },
      {
        "q": "She is _____ to take care of herself. She is 18 now.",
        "opts": [
          "old enough",
          "too old",
          "enough old"
        ],
        "ans": 0,
        "hint": "old enough = 够大",
        "sentence": "She is old enough to take care of herself.",
        "zh": "她够大了，能照顾自己。"
      },
      {
        "q": "The music is _____ to hear clearly. Please turn it down.",
        "opts": [
          "too loud",
          "loud enough",
          "enough loud"
        ],
        "ans": 0,
        "hint": "too loud = 太吵，听不清",
        "sentence": "The music is too loud to hear clearly.",
        "zh": "音乐声太大，听不清楚。"
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
        "q": "The box is _____ heavy _____ carry.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "too heavy to carry = 太重搬不动。",
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "q": "The tea is _____ hot _____ drink.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "太烫而不能喝。",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "This room is big _____ for us to live in.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "形容词后 enough。",
        "sentence": "This room is big enough for us to live in.",
        "zh": "这房间够大，我们住得下。"
      },
      {
        "q": "She is _____ weak _____ carry the bag.",
        "opts": [
          "too; to",
          "so; that",
          "enough; to"
        ],
        "ans": 0,
        "hint": "太弱而不能搬。",
        "sentence": "She is too weak to carry the bag.",
        "zh": "她太弱，搬不动袋子。"
      },
      {
        "q": "He ran fast _____ to catch the bus.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "副词后 enough：fast enough。",
        "sentence": "He ran fast enough to catch the bus.",
        "zh": "他跑得够快，赶上了车。"
      },
      {
        "q": "The problem is _____ difficult for me to work out.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 0,
        "hint": "too + 形 + for sb + to do。",
        "sentence": "The problem is too difficult for me to work out.",
        "zh": "这题对我来说太难，做不出来。"
      },
      {
        "q": "The tea is _____ to drink. It's too hot.",
        "opts": [
          "too hot",
          "hot too",
          "enough hot"
        ],
        "ans": 0,
        "hint": "too + 形容词，表示太……而不能",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "She is _____ to go to school. She is only five.",
        "opts": [
          "too young",
          "young enough",
          "enough young"
        ],
        "ans": 0,
        "hint": "too young = 太小，否定结果",
        "sentence": "She is too young to go to school.",
        "zh": "她太小了，不能上学。"
      },
      {
        "q": "He is _____ to carry the heavy box. He is strong.",
        "opts": [
          "too strong",
          "strong enough",
          "enough strong"
        ],
        "ans": 1,
        "hint": "形容词 + enough，表示足够",
        "sentence": "He is strong enough to carry the heavy box.",
        "zh": "他够强壮，能搬动重箱子。"
      },
      {
        "q": "The movie is _____ to watch again. It's very funny.",
        "opts": [
          "funny enough",
          "enough funny",
          "too funny"
        ],
        "ans": 0,
        "hint": "enough 放在形容词后面",
        "sentence": "The movie is funny enough to watch again.",
        "zh": "这部电影够有趣，值得再看一遍。"
      },
      {
        "q": "The soup is _____ to eat. It's too salty.",
        "opts": [
          "too salty",
          "salty enough",
          "enough salty"
        ],
        "ans": 0,
        "hint": "too salty = 太咸，不能吃",
        "sentence": "The soup is too salty to eat.",
        "zh": "汤太咸了，不能喝。"
      },
      {
        "q": "He is _____ to drive a car. He is only 16.",
        "opts": [
          "too young",
          "young enough",
          "enough young"
        ],
        "ans": 0,
        "hint": "年龄不够，用 too young",
        "sentence": "He is too young to drive a car.",
        "zh": "他太小了，不能开车。"
      },
      {
        "q": "The classroom is _____ for all the students. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The classroom is big enough for all the students.",
        "zh": "教室够大，能容纳所有学生。"
      },
      {
        "q": "The box is _____ for me to lift. It's too heavy.",
        "opts": [
          "too heavy",
          "heavy enough",
          "enough heavy"
        ],
        "ans": 0,
        "hint": "too heavy = 太重，不能搬",
        "sentence": "The box is too heavy for me to lift.",
        "zh": "这个箱子太重了，我搬不动。"
      },
      {
        "q": "She is _____ to take care of herself. She is 18 now.",
        "opts": [
          "old enough",
          "too old",
          "enough old"
        ],
        "ans": 0,
        "hint": "old enough = 够大",
        "sentence": "She is old enough to take care of herself.",
        "zh": "她够大了，能照顾自己。"
      },
      {
        "q": "The music is _____ to hear clearly. Please turn it down.",
        "opts": [
          "too loud",
          "loud enough",
          "enough loud"
        ],
        "ans": 0,
        "hint": "too loud = 太吵，听不清",
        "sentence": "The music is too loud to hear clearly.",
        "zh": "音乐声太大，听不清楚。"
      },
      {
        "q": "The book is _____ for a child. It has many hard words.",
        "opts": [
          "too difficult",
          "difficult enough",
          "enough difficult"
        ],
        "ans": 0,
        "hint": "too difficult = 太难，不适合",
        "sentence": "The book is too difficult for a child.",
        "zh": "这本书对孩子来说太难了。"
      },
      {
        "q": "He is _____ to win the race. He runs fast.",
        "opts": [
          "fast enough",
          "too fast",
          "enough fast"
        ],
        "ans": 0,
        "hint": "fast enough = 够快",
        "sentence": "He is fast enough to win the race.",
        "zh": "他够快，能赢得比赛。"
      },
      {
        "q": "The water is _____ to swim. It's too cold.",
        "opts": [
          "too cold",
          "cold enough",
          "enough cold"
        ],
        "ans": 0,
        "hint": "too cold = 太冷，不能游泳",
        "sentence": "The water is too cold to swim.",
        "zh": "水太冷了，不能游泳。"
      },
      {
        "q": "The chair is _____ for me to sit on. It's broken.",
        "opts": [
          "too weak",
          "weak enough",
          "enough weak"
        ],
        "ans": 0,
        "hint": "too weak = 太不结实",
        "sentence": "The chair is too weak for me to sit on.",
        "zh": "椅子太不结实了，我坐不了。"
      },
      {
        "q": "The bag is _____ to hold all the books. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The bag is big enough to hold all the books.",
        "zh": "这个包够大，能装下所有的书。"
      },
      {
        "q": "The story is _____ to make us laugh. It's funny.",
        "opts": [
          "funny enough",
          "too funny",
          "enough funny"
        ],
        "ans": 0,
        "hint": "funny enough = 够有趣",
        "sentence": "The story is funny enough to make us laugh.",
        "zh": "这个故事够有趣，能让我们笑。"
      },
      {
        "q": "The room is _____ to hold a party. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The room is big enough to hold a party.",
        "zh": "这个房间够大，能开派对。"
      },
      {
        "q": "The tea is _____ to drink. It's cool now.",
        "opts": [
          "cool enough",
          "too cool",
          "enough cool"
        ],
        "ans": 0,
        "hint": "cool enough = 够凉",
        "sentence": "The tea is cool enough to drink.",
        "zh": "茶够凉了，可以喝了。"
      },
      {
        "q": "He is _____ to solve the problem. He is smart.",
        "opts": [
          "smart enough",
          "too smart",
          "enough smart"
        ],
        "ans": 0,
        "hint": "smart enough = 够聪明",
        "sentence": "He is smart enough to solve the problem.",
        "zh": "他够聪明，能解决这个问题。"
      },
      {
        "q": "The road is _____ to drive fast. It's too narrow.",
        "opts": [
          "too narrow",
          "narrow enough",
          "enough narrow"
        ],
        "ans": 0,
        "hint": "too narrow = 太窄",
        "sentence": "The road is too narrow to drive fast.",
        "zh": "路太窄了，不能开快车。"
      },
      {
        "q": "The girl is _____ to reach the top shelf. She is tall.",
        "opts": [
          "tall enough",
          "too tall",
          "enough tall"
        ],
        "ans": 0,
        "hint": "tall enough = 够高",
        "sentence": "The girl is tall enough to reach the top shelf.",
        "zh": "这个女孩够高，能够到最上面的架子。"
      },
      {
        "q": "The apple is _____ to eat. It's too sour.",
        "opts": [
          "too sour",
          "sour enough",
          "enough sour"
        ],
        "ans": 0,
        "hint": "too sour = 太酸",
        "sentence": "The apple is too sour to eat.",
        "zh": "苹果太酸了，不能吃。"
      },
      {
        "q": "The boy is _____ to join the army. He is 18.",
        "opts": [
          "old enough",
          "too old",
          "enough old"
        ],
        "ans": 0,
        "hint": "old enough = 够年龄",
        "sentence": "The boy is old enough to join the army.",
        "zh": "这个男孩够年龄，能参军了。"
      },
      {
        "q": "The shirt is _____ to wear. It's too tight.",
        "opts": [
          "too tight",
          "tight enough",
          "enough tight"
        ],
        "ans": 0,
        "hint": "too tight = 太紧",
        "sentence": "The shirt is too tight to wear.",
        "zh": "这件衬衫太紧了，穿不了。"
      },
      {
        "q": "The park is _____ to play in. It's clean.",
        "opts": [
          "clean enough",
          "too clean",
          "enough clean"
        ],
        "ans": 0,
        "hint": "clean enough = 够干净",
        "sentence": "The park is clean enough to play in.",
        "zh": "公园够干净，可以玩。"
      },
      {
        "q": "The homework is _____ to finish in an hour. It's easy.",
        "opts": [
          "easy enough",
          "too easy",
          "enough easy"
        ],
        "ans": 0,
        "hint": "easy enough = 够简单",
        "sentence": "The homework is easy enough to finish in an hour.",
        "zh": "作业够简单，一小时内能完成。"
      },
      {
        "q": "The bus is _____ to take us home. It's late.",
        "opts": [
          "too late",
          "late enough",
          "enough late"
        ],
        "ans": 0,
        "hint": "too late = 太晚",
        "sentence": "The bus is too late to take us home.",
        "zh": "公交车太晚了，不能送我们回家。"
      },
      {
        "q": "The panda is _____ to see in the zoo. It's rare.",
        "opts": [
          "rare enough",
          "too rare",
          "enough rare"
        ],
        "ans": 0,
        "hint": "rare enough = 够稀有",
        "sentence": "The panda is rare enough to see in the zoo.",
        "zh": "熊猫够稀有，值得在动物园看。"
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
        "q": "The box is _____ heavy _____ carry.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "too heavy to carry = 太重搬不动。",
        "sentence": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自上学。"
      },
      {
        "q": "The tea is _____ hot _____ drink.",
        "opts": [
          "too; to",
          "enough; to",
          "to; too"
        ],
        "ans": 0,
        "hint": "太烫而不能喝。",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "This room is big _____ for us to live in.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "形容词后 enough。",
        "sentence": "This room is big enough for us to live in.",
        "zh": "这房间够大，我们住得下。"
      },
      {
        "q": "She is _____ weak _____ carry the bag.",
        "opts": [
          "too; to",
          "so; that",
          "enough; to"
        ],
        "ans": 0,
        "hint": "太弱而不能搬。",
        "sentence": "She is too weak to carry the bag.",
        "zh": "她太弱，搬不动袋子。"
      },
      {
        "q": "He ran fast _____ to catch the bus.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 1,
        "hint": "副词后 enough：fast enough。",
        "sentence": "He ran fast enough to catch the bus.",
        "zh": "他跑得够快，赶上了车。"
      },
      {
        "q": "The problem is _____ difficult for me to work out.",
        "opts": [
          "too",
          "enough",
          "so"
        ],
        "ans": 0,
        "hint": "too + 形 + for sb + to do。",
        "sentence": "The problem is too difficult for me to work out.",
        "zh": "这题对我来说太难，做不出来。"
      },
      {
        "q": "The tea is _____ to drink. It's too hot.",
        "opts": [
          "too hot",
          "hot too",
          "enough hot"
        ],
        "ans": 0,
        "hint": "too + 形容词，表示太……而不能",
        "sentence": "The tea is too hot to drink.",
        "zh": "茶太烫了，不能喝。"
      },
      {
        "q": "She is _____ to go to school. She is only five.",
        "opts": [
          "too young",
          "young enough",
          "enough young"
        ],
        "ans": 0,
        "hint": "too young = 太小，否定结果",
        "sentence": "She is too young to go to school.",
        "zh": "她太小了，不能上学。"
      },
      {
        "q": "He is _____ to carry the heavy box. He is strong.",
        "opts": [
          "too strong",
          "strong enough",
          "enough strong"
        ],
        "ans": 1,
        "hint": "形容词 + enough，表示足够",
        "sentence": "He is strong enough to carry the heavy box.",
        "zh": "他够强壮，能搬动重箱子。"
      },
      {
        "q": "The movie is _____ to watch again. It's very funny.",
        "opts": [
          "funny enough",
          "enough funny",
          "too funny"
        ],
        "ans": 0,
        "hint": "enough 放在形容词后面",
        "sentence": "The movie is funny enough to watch again.",
        "zh": "这部电影够有趣，值得再看一遍。"
      },
      {
        "q": "The soup is _____ to eat. It's too salty.",
        "opts": [
          "too salty",
          "salty enough",
          "enough salty"
        ],
        "ans": 0,
        "hint": "too salty = 太咸，不能吃",
        "sentence": "The soup is too salty to eat.",
        "zh": "汤太咸了，不能喝。"
      },
      {
        "q": "He is _____ to drive a car. He is only 16.",
        "opts": [
          "too young",
          "young enough",
          "enough young"
        ],
        "ans": 0,
        "hint": "年龄不够，用 too young",
        "sentence": "He is too young to drive a car.",
        "zh": "他太小了，不能开车。"
      },
      {
        "q": "The classroom is _____ for all the students. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The classroom is big enough for all the students.",
        "zh": "教室够大，能容纳所有学生。"
      },
      {
        "q": "The box is _____ for me to lift. It's too heavy.",
        "opts": [
          "too heavy",
          "heavy enough",
          "enough heavy"
        ],
        "ans": 0,
        "hint": "too heavy = 太重，不能搬",
        "sentence": "The box is too heavy for me to lift.",
        "zh": "这个箱子太重了，我搬不动。"
      },
      {
        "q": "She is _____ to take care of herself. She is 18 now.",
        "opts": [
          "old enough",
          "too old",
          "enough old"
        ],
        "ans": 0,
        "hint": "old enough = 够大",
        "sentence": "She is old enough to take care of herself.",
        "zh": "她够大了，能照顾自己。"
      },
      {
        "q": "The music is _____ to hear clearly. Please turn it down.",
        "opts": [
          "too loud",
          "loud enough",
          "enough loud"
        ],
        "ans": 0,
        "hint": "too loud = 太吵，听不清",
        "sentence": "The music is too loud to hear clearly.",
        "zh": "音乐声太大，听不清楚。"
      },
      {
        "q": "The book is _____ for a child. It has many hard words.",
        "opts": [
          "too difficult",
          "difficult enough",
          "enough difficult"
        ],
        "ans": 0,
        "hint": "too difficult = 太难，不适合",
        "sentence": "The book is too difficult for a child.",
        "zh": "这本书对孩子来说太难了。"
      },
      {
        "q": "He is _____ to win the race. He runs fast.",
        "opts": [
          "fast enough",
          "too fast",
          "enough fast"
        ],
        "ans": 0,
        "hint": "fast enough = 够快",
        "sentence": "He is fast enough to win the race.",
        "zh": "他够快，能赢得比赛。"
      },
      {
        "q": "The water is _____ to swim. It's too cold.",
        "opts": [
          "too cold",
          "cold enough",
          "enough cold"
        ],
        "ans": 0,
        "hint": "too cold = 太冷，不能游泳",
        "sentence": "The water is too cold to swim.",
        "zh": "水太冷了，不能游泳。"
      },
      {
        "q": "The chair is _____ for me to sit on. It's broken.",
        "opts": [
          "too weak",
          "weak enough",
          "enough weak"
        ],
        "ans": 0,
        "hint": "too weak = 太不结实",
        "sentence": "The chair is too weak for me to sit on.",
        "zh": "椅子太不结实了，我坐不了。"
      },
      {
        "q": "The bag is _____ to hold all the books. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The bag is big enough to hold all the books.",
        "zh": "这个包够大，能装下所有的书。"
      },
      {
        "q": "The story is _____ to make us laugh. It's funny.",
        "opts": [
          "funny enough",
          "too funny",
          "enough funny"
        ],
        "ans": 0,
        "hint": "funny enough = 够有趣",
        "sentence": "The story is funny enough to make us laugh.",
        "zh": "这个故事够有趣，能让我们笑。"
      },
      {
        "q": "The room is _____ to hold a party. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The room is big enough to hold a party.",
        "zh": "这个房间够大，能开派对。"
      },
      {
        "q": "The tea is _____ to drink. It's cool now.",
        "opts": [
          "cool enough",
          "too cool",
          "enough cool"
        ],
        "ans": 0,
        "hint": "cool enough = 够凉",
        "sentence": "The tea is cool enough to drink.",
        "zh": "茶够凉了，可以喝了。"
      },
      {
        "q": "He is _____ to solve the problem. He is smart.",
        "opts": [
          "smart enough",
          "too smart",
          "enough smart"
        ],
        "ans": 0,
        "hint": "smart enough = 够聪明",
        "sentence": "He is smart enough to solve the problem.",
        "zh": "他够聪明，能解决这个问题。"
      },
      {
        "q": "The road is _____ to drive fast. It's too narrow.",
        "opts": [
          "too narrow",
          "narrow enough",
          "enough narrow"
        ],
        "ans": 0,
        "hint": "too narrow = 太窄",
        "sentence": "The road is too narrow to drive fast.",
        "zh": "路太窄了，不能开快车。"
      },
      {
        "q": "The girl is _____ to reach the top shelf. She is tall.",
        "opts": [
          "tall enough",
          "too tall",
          "enough tall"
        ],
        "ans": 0,
        "hint": "tall enough = 够高",
        "sentence": "The girl is tall enough to reach the top shelf.",
        "zh": "这个女孩够高，能够到最上面的架子。"
      },
      {
        "q": "The apple is _____ to eat. It's too sour.",
        "opts": [
          "too sour",
          "sour enough",
          "enough sour"
        ],
        "ans": 0,
        "hint": "too sour = 太酸",
        "sentence": "The apple is too sour to eat.",
        "zh": "苹果太酸了，不能吃。"
      },
      {
        "q": "The boy is _____ to join the army. He is 18.",
        "opts": [
          "old enough",
          "too old",
          "enough old"
        ],
        "ans": 0,
        "hint": "old enough = 够年龄",
        "sentence": "The boy is old enough to join the army.",
        "zh": "这个男孩够年龄，能参军了。"
      },
      {
        "q": "The shirt is _____ to wear. It's too tight.",
        "opts": [
          "too tight",
          "tight enough",
          "enough tight"
        ],
        "ans": 0,
        "hint": "too tight = 太紧",
        "sentence": "The shirt is too tight to wear.",
        "zh": "这件衬衫太紧了，穿不了。"
      },
      {
        "q": "The park is _____ to play in. It's clean.",
        "opts": [
          "clean enough",
          "too clean",
          "enough clean"
        ],
        "ans": 0,
        "hint": "clean enough = 够干净",
        "sentence": "The park is clean enough to play in.",
        "zh": "公园够干净，可以玩。"
      },
      {
        "q": "The homework is _____ to finish in an hour. It's easy.",
        "opts": [
          "easy enough",
          "too easy",
          "enough easy"
        ],
        "ans": 0,
        "hint": "easy enough = 够简单",
        "sentence": "The homework is easy enough to finish in an hour.",
        "zh": "作业够简单，一小时内能完成。"
      },
      {
        "q": "The bus is _____ to take us home. It's late.",
        "opts": [
          "too late",
          "late enough",
          "enough late"
        ],
        "ans": 0,
        "hint": "too late = 太晚",
        "sentence": "The bus is too late to take us home.",
        "zh": "公交车太晚了，不能送我们回家。"
      },
      {
        "q": "The panda is _____ to see in the zoo. It's rare.",
        "opts": [
          "rare enough",
          "too rare",
          "enough rare"
        ],
        "ans": 0,
        "hint": "rare enough = 够稀有",
        "sentence": "The panda is rare enough to see in the zoo.",
        "zh": "熊猫够稀有，值得在动物园看。"
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
    "image": "l14-too-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "too young to",
        "zh": "太小而不能"
      },
      {
        "en": "old enough to",
        "zh": "足够大可以"
      },
      {
        "en": "too heavy to carry",
        "zh": "太重搬不动"
      },
      {
        "en": "fast enough",
        "zh": "足够快"
      },
      {
        "en": "too young to drive",
        "zh": "太小不能开车"
      },
      {
        "en": "too hot to drink",
        "zh": "太烫不能喝"
      },
      {
        "en": "too dark to read",
        "zh": "太暗不能看书"
      },
      {
        "en": "too loud to hear",
        "zh": "太吵听不清"
      },
      {
        "en": "old enough to vote",
        "zh": "够大可以投票"
      },
      {
        "en": "tall enough to reach",
        "zh": "够高够得着"
      },
      {
        "en": "smart enough to solve",
        "zh": "够聪明能解决"
      },
      {
        "en": "strong enough to lift",
        "zh": "够强壮能抬起"
      },
      {
        "en": "fast enough to catch",
        "zh": "够快能抓住"
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
    "image": "l14-too-hero.jpg",
    "audio": "The water is too hot to drink.",
    "opts": [
      "The water is too hot to drink.",
      "The water is hot enough to drink.",
      "The water is too cold to drink."
    ],
    "ans": 0,
    "hint": "注意 too hot 表示太烫",
    "sentence": "The water is too hot to drink.",
    "zh": "水太烫了，不能喝。",
    "questions": [
      {
        "audio": "The water is too hot to drink.",
        "opts": [
          "The water is too hot to drink.",
          "The water is hot enough to drink.",
          "The water is too cold to drink."
        ],
        "ans": 0,
        "hint": "注意 too hot 表示太烫",
        "zh": "水太烫了，不能喝。",
        "sentence": "The water is too hot to drink."
      },
      {
        "audio": "She is old enough to go to school.",
        "opts": [
          "She is old enough to go to school.",
          "She is too young to go to school.",
          "She is too old to go to school."
        ],
        "ans": 0,
        "hint": "old enough 表示够大",
        "zh": "她够大了，能上学了。",
        "sentence": "She is old enough to go to school."
      },
      {
        "audio": "The box is too heavy for me to carry.",
        "opts": [
          "The box is too heavy for me to carry.",
          "The box is heavy enough for me to carry.",
          "The box is too light for me to carry."
        ],
        "ans": 0,
        "hint": "too heavy 太重搬不动",
        "zh": "箱子太重，我搬不动。",
        "sentence": "The box is too heavy for me to carry."
      },
      {
        "audio": "He is strong enough to lift the table.",
        "opts": [
          "He is strong enough to lift the table.",
          "He is too weak to lift the table.",
          "He is too strong to lift the table."
        ],
        "ans": 0,
        "hint": "strong enough 表示够强壮",
        "zh": "他够强壮，能抬起桌子。",
        "sentence": "He is strong enough to lift the table."
      },
      {
        "audio": "The movie is funny enough to watch again.",
        "opts": [
          "The movie is funny enough to watch again.",
          "The movie is too boring to watch again.",
          "The movie is too funny to watch again."
        ],
        "ans": 0,
        "hint": "funny enough 表示够有趣",
        "zh": "这部电影够有趣，值得再看一遍。",
        "sentence": "The movie is funny enough to watch again."
      },
      {
        "audio": "The tea is too sweet to drink.",
        "opts": [
          "The tea is too sweet to drink.",
          "The tea is sweet enough to drink.",
          "The tea is too bitter to drink."
        ],
        "ans": 0,
        "hint": "too sweet 太甜",
        "zh": "茶太甜了，不能喝。",
        "sentence": "The tea is too sweet to drink."
      },
      {
        "audio": "She is smart enough to solve the problem.",
        "opts": [
          "She is smart enough to solve the problem.",
          "She is too stupid to solve the problem.",
          "She is too smart to solve the problem."
        ],
        "ans": 0,
        "hint": "smart enough 表示够聪明",
        "zh": "她够聪明，能解决这个问题。",
        "sentence": "She is smart enough to solve the problem."
      },
      {
        "audio": "The road is too narrow for the bus to pass.",
        "opts": [
          "The road is too narrow for the bus to pass.",
          "The road is wide enough for the bus to pass.",
          "The road is too wide for the bus to pass."
        ],
        "ans": 0,
        "hint": "too narrow 太窄",
        "zh": "路太窄，公交车过不去。",
        "sentence": "The road is too narrow for the bus to pass."
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
    "image": "l14-too-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "He is too young to go to school alone.",
        "zh": "他太小了，不能独自去上学。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She is old enough to look after herself.",
        "zh": "她够大了，可以照顾自己。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The box is too heavy for me to carry.",
        "zh": "这个箱子太重了，我搬不动。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "He is strong enough to lift the heavy table.",
        "zh": "他够强壮，能抬起那张重桌子。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The water is too hot to drink.",
        "zh": "水太烫了，不能喝。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I am tall enough to reach the top shelf.",
        "zh": "我够高，能够到最上面的架子。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He is too short to ride the roller coaster.",
        "zh": "他太矮了，不能坐过山车。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The soup is cool enough to eat now.",
        "zh": "汤够凉了，现在可以吃了。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The bag is too small to hold all my books.",
        "zh": "这个包太小了，装不下我所有的书。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She is clever enough to solve the puzzle.",
        "zh": "她够聪明，能解开这个谜题。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He is too tired to finish his homework.",
        "zh": "他太累了，没法完成作业。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The movie is interesting enough to watch twice.",
        "zh": "这部电影够有趣，值得看两遍。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The ice is too thin to skate on.",
        "zh": "冰太薄了，不能在上面滑冰。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He is brave enough to face the big dog.",
        "zh": "他够勇敢，敢面对那只大狗。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The shirt is too small for me to wear.",
        "zh": "这件衬衫太小了，我穿不了。",
        "tag": "exam_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "She is patient enough to teach the little kids.",
        "zh": "她够耐心，能教小孩子们。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The story is too long to read in one day.",
        "zh": "这个故事太长了，一天读不完。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He is rich enough to buy a big house.",
        "zh": "他够有钱，能买大房子。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "The music is too loud to hear the teacher.",
        "zh": "音乐声太大，听不见老师说话。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The question is easy enough for everyone to answer.",
        "zh": "这个问题够简单，每个人都能回答。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The room is too dark to read without a lamp.",
        "zh": "房间太暗，没有灯没法看书。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "She is careful enough to check every detail.",
        "zh": "她够细心，能检查每个细节。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The panda is too cute to ignore.",
        "zh": "熊猫太可爱了，让人无法忽视。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "The bus is crowded enough to make people uncomfortable.",
        "zh": "公交车够拥挤，让人不舒服。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
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
    "image": "l14-too-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "The book is _____ for a child. It has many hard words.",
        "opts": [
          "too difficult",
          "difficult enough",
          "enough difficult"
        ],
        "ans": 0,
        "hint": "too difficult = 太难，不适合",
        "sentence": "The book is too difficult for a child.",
        "zh": "这本书对孩子来说太难了。"
      },
      {
        "q": "He is _____ to win the race. He runs fast.",
        "opts": [
          "fast enough",
          "too fast",
          "enough fast"
        ],
        "ans": 0,
        "hint": "fast enough = 够快",
        "sentence": "He is fast enough to win the race.",
        "zh": "他够快，能赢得比赛。"
      },
      {
        "q": "The water is _____ to swim. It's too cold.",
        "opts": [
          "too cold",
          "cold enough",
          "enough cold"
        ],
        "ans": 0,
        "hint": "too cold = 太冷，不能游泳",
        "sentence": "The water is too cold to swim.",
        "zh": "水太冷了，不能游泳。"
      },
      {
        "q": "The chair is _____ for me to sit on. It's broken.",
        "opts": [
          "too weak",
          "weak enough",
          "enough weak"
        ],
        "ans": 0,
        "hint": "too weak = 太不结实",
        "sentence": "The chair is too weak for me to sit on.",
        "zh": "椅子太不结实了，我坐不了。"
      },
      {
        "q": "The bag is _____ to hold all the books. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The bag is big enough to hold all the books.",
        "zh": "这个包够大，能装下所有的书。"
      },
      {
        "q": "The story is _____ to make us laugh. It's funny.",
        "opts": [
          "funny enough",
          "too funny",
          "enough funny"
        ],
        "ans": 0,
        "hint": "funny enough = 够有趣",
        "sentence": "The story is funny enough to make us laugh.",
        "zh": "这个故事够有趣，能让我们笑。"
      },
      {
        "q": "The room is _____ to hold a party. It's big.",
        "opts": [
          "big enough",
          "too big",
          "enough big"
        ],
        "ans": 0,
        "hint": "big enough = 够大",
        "sentence": "The room is big enough to hold a party.",
        "zh": "这个房间够大，能开派对。"
      },
      {
        "q": "The tea is _____ to drink. It's cool now.",
        "opts": [
          "cool enough",
          "too cool",
          "enough cool"
        ],
        "ans": 0,
        "hint": "cool enough = 够凉",
        "sentence": "The tea is cool enough to drink.",
        "zh": "茶够凉了，可以喝了。"
      },
      {
        "q": "He is _____ to solve the problem. He is smart.",
        "opts": [
          "smart enough",
          "too smart",
          "enough smart"
        ],
        "ans": 0,
        "hint": "smart enough = 够聪明",
        "sentence": "He is smart enough to solve the problem.",
        "zh": "他够聪明，能解决这个问题。"
      },
      {
        "q": "The road is _____ to drive fast. It's too narrow.",
        "opts": [
          "too narrow",
          "narrow enough",
          "enough narrow"
        ],
        "ans": 0,
        "hint": "too narrow = 太窄",
        "sentence": "The road is too narrow to drive fast.",
        "zh": "路太窄了，不能开快车。"
      },
      {
        "q": "The girl is _____ to reach the top shelf. She is tall.",
        "opts": [
          "tall enough",
          "too tall",
          "enough tall"
        ],
        "ans": 0,
        "hint": "tall enough = 够高",
        "sentence": "The girl is tall enough to reach the top shelf.",
        "zh": "这个女孩够高，能够到最上面的架子。"
      },
      {
        "q": "The apple is _____ to eat. It's too sour.",
        "opts": [
          "too sour",
          "sour enough",
          "enough sour"
        ],
        "ans": 0,
        "hint": "too sour = 太酸",
        "sentence": "The apple is too sour to eat.",
        "zh": "苹果太酸了，不能吃。"
      },
      {
        "q": "The boy is _____ to join the army. He is 18.",
        "opts": [
          "old enough",
          "too old",
          "enough old"
        ],
        "ans": 0,
        "hint": "old enough = 够年龄",
        "sentence": "The boy is old enough to join the army.",
        "zh": "这个男孩够年龄，能参军了。"
      },
      {
        "q": "The shirt is _____ to wear. It's too tight.",
        "opts": [
          "too tight",
          "tight enough",
          "enough tight"
        ],
        "ans": 0,
        "hint": "too tight = 太紧",
        "sentence": "The shirt is too tight to wear.",
        "zh": "这件衬衫太紧了，穿不了。"
      },
      {
        "q": "The park is _____ to play in. It's clean.",
        "opts": [
          "clean enough",
          "too clean",
          "enough clean"
        ],
        "ans": 0,
        "hint": "clean enough = 够干净",
        "sentence": "The park is clean enough to play in.",
        "zh": "公园够干净，可以玩。"
      },
      {
        "q": "The homework is _____ to finish in an hour. It's easy.",
        "opts": [
          "easy enough",
          "too easy",
          "enough easy"
        ],
        "ans": 0,
        "hint": "easy enough = 够简单",
        "sentence": "The homework is easy enough to finish in an hour.",
        "zh": "作业够简单，一小时内能完成。"
      },
      {
        "q": "The bus is _____ to take us home. It's late.",
        "opts": [
          "too late",
          "late enough",
          "enough late"
        ],
        "ans": 0,
        "hint": "too late = 太晚",
        "sentence": "The bus is too late to take us home.",
        "zh": "公交车太晚了，不能送我们回家。"
      },
      {
        "q": "The panda is _____ to see in the zoo. It's rare.",
        "opts": [
          "rare enough",
          "too rare",
          "enough rare"
        ],
        "ans": 0,
        "hint": "rare enough = 够稀有",
        "sentence": "The panda is rare enough to see in the zoo.",
        "zh": "熊猫够稀有，值得在动物园看。"
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
      "too + adj + to do：太……而不能",
      "adj + enough + to do：足够……可以",
      "enough 放形容词后",
      "enough 修饰名词时放名词前：enough time；修饰形/副放后面。"
    ],
    "chant": "Too means more than OK! Enough to — you can play!",
    "chantSpeak": "Too means more than OK! Enough to, you can play!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "too…to / enough to",
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