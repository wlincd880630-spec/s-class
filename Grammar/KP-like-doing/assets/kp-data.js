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
    "audio": "I enjoy reading books in the library.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。",
    "image": "w3-like-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-like-hero.jpg",
    "question": "enjoy 后面接什么形式？",
    "choices": [
      {
        "text": "动名词 doing",
        "correct": true,
        "fb": "对了！enjoy/like/finish + doing。"
      },
      {
        "text": "to do",
        "correct": false,
        "fb": "enjoy 后不接 to do。"
      },
      {
        "text": "动词原形",
        "correct": false,
        "fb": "需要 -ing 形式。"
      }
    ],
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-like-hero.jpg",
    "lead": "有些动词后面接 doing（动名词）作宾语。",
    "formula": "enjoy / finish / practise + doing",
    "parts": [
      {
        "mark": "doing",
        "label": "动名词宾语",
        "example": "enjoy reading"
      },
      {
        "mark": "to do",
        "label": "另一些动词",
        "example": "want to read"
      }
    ],
    "samples": [
      {
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆读书。"
      },
      {
        "sentence": "Tom likes playing basketball.",
        "zh": "汤姆喜欢打篮球。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-like-todo.jpg",
    "rightImage": "w3-like-doing.jpg",
    "leftLabel": "want to do",
    "rightLabel": "enjoy doing",
    "leftSentence": "I want to learn English.",
    "leftZh": "我想学英语。",
    "rightSentence": "I enjoy learning English.",
    "rightZh": "我享受学英语的过程。",
    "morphBase": "read",
    "morphPast": "reading",
    "morphHighlight": "ing",
    "discovery": "enjoy/like/finish/mind + doing（动名词）。"
  },
  {
    "section": "精讲",
    "title": "例句 · enjoy doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-like-hero.jpg",
    "lead": "enjoy 后面不能加 to do。",
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆读书。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · finish doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-like-hero.jpg",
    "lead": "finish 后接 doing。",
    "sentence": "She finished doing her homework at nine.",
    "zh": "她九点做完了作业。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "like + doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-basketball.png",
    "lead": "like 后面也可以接 doing，表示喜欢做某事。",
    "sentence": "Tom likes playing basketball.",
    "zh": "汤姆喜欢打篮球。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "finish / practise + doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-piano.png",
    "lead": "finish 和 practise 后面也接 doing。",
    "sentence": "She practices playing the piano every day.",
    "zh": "她每天练习弹钢琴。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-like-hero.jpg",
    "lead": "常见动词 + doing。",
    "rules": [
      {
        "tab": "like/enjoy",
        "rule": "like/enjoy/love + doing 喜欢做",
        "focusVerb": "reading",
        "examples": [
          {
            "from": "read",
            "to": "enjoy reading"
          }
        ],
        "sample": "I enjoy reading books in the library.",
        "sampleZh": "我喜欢在图书馆看书。"
      },
      {
        "tab": "finish/mind",
        "rule": "finish/mind/practise + doing",
        "focusVerb": "finishing",
        "examples": [
          {
            "from": "finish",
            "to": "finish doing"
          }
        ],
        "sample": "Have you finished doing your homework?",
        "sampleZh": "你做完作业了吗？"
      }
    ]
  },
  {
    "id": "p10",
    "section": "辨析",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-like-hero.jpg",
    "buckets": [
      {
        "key": "todo",
        "label": "+ to do"
      },
      {
        "key": "doing",
        "label": "+ doing"
      }
    ],
    "items": [
      {
        "text": "want to go",
        "bucket": "todo"
      },
      {
        "text": "enjoy going",
        "bucket": "doing"
      },
      {
        "text": "decide to try",
        "bucket": "todo"
      },
      {
        "text": "finish doing",
        "bucket": "doing"
      },
      {
        "text": "hope to win",
        "bucket": "todo"
      },
      {
        "text": "like swimming",
        "bucket": "doing"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-like-hero.jpg",
    "question": "「She enjoys to play football.」应改成？",
    "choices": [
      {
        "text": "enjoys playing",
        "correct": true,
        "fb": "enjoy + doing。"
      },
      {
        "text": "enjoy play",
        "correct": false,
        "fb": "缺 -ing，且三单 enjoys。"
      },
      {
        "text": "enjoys play",
        "correct": false,
        "fb": "要 playing。"
      }
    ],
    "sentence": "She enjoys playing football.",
    "zh": "她喜欢踢足球。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-like-hero.jpg",
    "lead": "把 to do 改成 enjoy 句型。",
    "items": [
      {
        "from": "I want to read this book.",
        "fromZh": "我想读这本书。",
        "steps": [
          {
            "label": "如果是 enjoy，怎么说？",
            "opts": [
              "I enjoy reading this book.",
              "I enjoy to read this book.",
              "I enjoy read this book."
            ],
            "ans": 0,
            "hint": "enjoy + reading。",
            "sentence": "I enjoy reading this book.",
            "zh": "我喜欢读这本书。"
          }
        ]
      },
      {
        "from": "She enjoys to play football.",
        "fromZh": "她喜欢踢足球。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "She enjoys playing football.",
              "She enjoys to playing football.",
              "She enjoys play football."
            ],
            "ans": 0,
            "hint": "enjoy 后接 doing，不接 to do",
            "sentence": "She enjoys playing football.",
            "zh": "她喜欢踢足球。"
          }
        ]
      },
      {
        "from": "He likes to reading books.",
        "fromZh": "他喜欢读书。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "He likes reading books.",
              "He likes to reading books.",
              "He likes read books."
            ],
            "ans": 0,
            "hint": "like 后接 doing，不接 to doing",
            "sentence": "He likes reading books.",
            "zh": "他喜欢读书。"
          }
        ]
      },
      {
        "from": "We finish to clean the classroom.",
        "fromZh": "我们打扫完教室。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "We finish cleaning the classroom.",
              "We finish to cleaning the classroom.",
              "We finish clean the classroom."
            ],
            "ans": 0,
            "hint": "finish 后接 doing",
            "sentence": "We finish cleaning the classroom.",
            "zh": "我们打扫完教室。"
          }
        ]
      },
      {
        "from": "She practices to play the piano.",
        "fromZh": "她练习弹钢琴。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "She practices playing the piano.",
              "She practices to playing the piano.",
              "She practices play the piano."
            ],
            "ans": 0,
            "hint": "practise 后接 doing",
            "sentence": "She practices playing the piano.",
            "zh": "她练习弹钢琴。"
          }
        ]
      },
      {
        "from": "I enjoy to eat hot pot.",
        "fromZh": "我喜欢吃火锅。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "I enjoy eating hot pot.",
              "I enjoy to eating hot pot.",
              "I enjoy eat hot pot."
            ],
            "ans": 0,
            "hint": "enjoy 后接 doing",
            "sentence": "I enjoy eating hot pot.",
            "zh": "我喜欢吃火锅。"
          }
        ]
      },
      {
        "from": "They like to watch TV.",
        "fromZh": "他们喜欢看电视。",
        "steps": [
          {
            "label": "改成正确句子",
            "opts": [
              "They like watching TV.",
              "They like to watching TV.",
              "They like watch TV."
            ],
            "ans": 0,
            "hint": "like 后接 doing",
            "sentence": "They like watching TV.",
            "zh": "他们喜欢看电视。"
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
    "image": "kp3d-library.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "I",
      "enjoy",
      "reading",
      "books",
      "in",
      "the",
      "library"
    ],
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。",
    "items": [
      {
        "tokens": [
          "I",
          "enjoy",
          "reading",
          "books",
          "in",
          "the",
          "library"
        ],
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "Tom",
          "likes",
          "playing",
          "basketball"
        ],
        "sentence": "Tom likes playing basketball.",
        "zh": "汤姆喜欢打篮球。",
        "image": "kp3d-basketball.png"
      },
      {
        "tokens": [
          "She",
          "practices",
          "playing",
          "the",
          "piano",
          "every",
          "day"
        ],
        "sentence": "She practices playing the piano every day.",
        "zh": "她每天练习弹钢琴。",
        "image": "kp3d-piano.png"
      },
      {
        "tokens": [
          "We",
          "finish",
          "cleaning",
          "the",
          "classroom",
          "at",
          "four"
        ],
        "sentence": "We finish cleaning the classroom at four.",
        "zh": "我们四点打扫完教室。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "He",
          "enjoys",
          "riding",
          "a",
          "bike",
          "to",
          "school"
        ],
        "sentence": "He enjoys riding a bike to school.",
        "zh": "他喜欢骑自行车上学。",
        "image": "kp3d-bus.png"
      },
      {
        "tokens": [
          "They",
          "like",
          "eating",
          "hot",
          "pot",
          "in",
          "Chengdu"
        ],
        "sentence": "They like eating hot pot in Chengdu.",
        "zh": "他们喜欢在成都吃火锅。",
        "image": "kp3d-dinner.png"
      }
    ],
    "id": "p13"
  },
  {
    "id": "p14",
    "section": "操练",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-like-hero.jpg",
    "audio": "Tom likes playing basketball.",
    "tokens": [
      "Tom",
      "likes",
      "playing",
      "basketball"
    ],
    "sentence": "Tom likes playing basketball.",
    "zh": "汤姆喜欢打篮球。"
  },
  {
    "id": "p15",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-like-hero.jpg",
    "q": "She enjoys _____ football after school.",
    "opts": [
      "play",
      "playing",
      "to play"
    ],
    "ans": 1,
    "hint": "enjoy + doing。",
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-like-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "She enjoys _____ football after school.",
        "opts": [
          "play",
          "playing",
          "to play"
        ],
        "ans": 1,
        "hint": "enjoy + doing。",
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。"
      },
      {
        "q": "He finished _____ the room.",
        "opts": [
          "clean",
          "cleaning",
          "to clean"
        ],
        "ans": 1,
        "hint": "finish + doing。",
        "sentence": "He finished cleaning the room.",
        "zh": "他打扫完房间了。"
      },
      {
        "q": "They practise _____ the piano every day.",
        "opts": [
          "play",
          "playing",
          "to play"
        ],
        "ans": 1,
        "hint": "practise + doing。",
        "sentence": "They practise playing the piano every day.",
        "zh": "他们每天练习弹钢琴。"
      },
      {
        "q": "I hope _____ you soon.",
        "opts": [
          "seeing",
          "see",
          "to see"
        ],
        "ans": 2,
        "hint": "hope + to do。",
        "sentence": "I hope to see you soon.",
        "zh": "我希望很快见到你。"
      },
      {
        "q": "Would you mind _____ the window?",
        "opts": [
          "open",
          "opening",
          "to open"
        ],
        "ans": 1,
        "hint": "mind + doing。",
        "sentence": "Would you mind opening the window?",
        "zh": "你介意开窗吗？"
      },
      {
        "q": "She likes _____ but today she would like _____ TV.",
        "opts": [
          "reading; to watch",
          "to read; watching",
          "read; watch"
        ],
        "ans": 0,
        "hint": "like doing 爱好；would like to do 想要。",
        "sentence": "She likes reading but today she would like to watch TV.",
        "zh": "她喜欢阅读，但今天想看电视。"
      },
      {
        "q": "I enjoy _____ books in the library.",
        "opts": [
          "read",
          "reading",
          "to read"
        ],
        "ans": 1,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。"
      },
      {
        "q": "Tom likes _____ basketball.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "Tom likes playing basketball.",
        "zh": "汤姆喜欢打篮球。"
      },
      {
        "q": "We finish _____ the classroom at four.",
        "opts": [
          "clean",
          "cleaning",
          "cleans"
        ],
        "ans": 1,
        "hint": "finish 后接 doing",
        "sentence": "We finish cleaning the classroom at four.",
        "zh": "我们四点打扫完教室。"
      },
      {
        "q": "She practices _____ the piano every day.",
        "opts": [
          "play",
          "playing",
          "plays"
        ],
        "ans": 1,
        "hint": "practise 后接 doing",
        "sentence": "She practices playing the piano every day.",
        "zh": "她每天练习弹钢琴。"
      },
      {
        "q": "My dad enjoys _____ dinner on weekends.",
        "opts": [
          "cooking",
          "cook",
          "cooks"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "My dad enjoys cooking dinner on weekends.",
        "zh": "我爸爸周末喜欢做饭。"
      },
      {
        "q": "I like _____ hot pot in Chengdu.",
        "opts": [
          "eating",
          "eat",
          "ate"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "I like eating hot pot in Chengdu.",
        "zh": "我喜欢在成都吃火锅。"
      },
      {
        "q": "He finishes _____ his homework before dinner.",
        "opts": [
          "do",
          "doing",
          "does"
        ],
        "ans": 1,
        "hint": "finish 后接 doing",
        "sentence": "He finishes doing his homework before dinner.",
        "zh": "他在晚饭前做完作业。"
      },
      {
        "q": "The students enjoy _____ games on the playground.",
        "opts": [
          "playing",
          "play",
          "played"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "The students enjoy playing games on the playground.",
        "zh": "学生们喜欢在操场上玩游戏。"
      },
      {
        "q": "She enjoys _____ pictures of pandas.",
        "opts": [
          "drawing",
          "draw",
          "draws"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "She enjoys drawing pictures of pandas.",
        "zh": "她喜欢画熊猫。"
      },
      {
        "q": "They finish _____ TV at nine.",
        "opts": [
          "watching",
          "watch",
          "watches"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "They finish watching TV at nine.",
        "zh": "他们九点看完电视。"
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
        "q": "She enjoys _____ football after school.",
        "opts": [
          "play",
          "playing",
          "to play"
        ],
        "ans": 1,
        "hint": "enjoy + doing。",
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。"
      },
      {
        "q": "He finished _____ the room.",
        "opts": [
          "clean",
          "cleaning",
          "to clean"
        ],
        "ans": 1,
        "hint": "finish + doing。",
        "sentence": "He finished cleaning the room.",
        "zh": "他打扫完房间了。"
      },
      {
        "q": "They practise _____ the piano every day.",
        "opts": [
          "play",
          "playing",
          "to play"
        ],
        "ans": 1,
        "hint": "practise + doing。",
        "sentence": "They practise playing the piano every day.",
        "zh": "他们每天练习弹钢琴。"
      },
      {
        "q": "I hope _____ you soon.",
        "opts": [
          "seeing",
          "see",
          "to see"
        ],
        "ans": 2,
        "hint": "hope + to do。",
        "sentence": "I hope to see you soon.",
        "zh": "我希望很快见到你。"
      },
      {
        "q": "Would you mind _____ the window?",
        "opts": [
          "open",
          "opening",
          "to open"
        ],
        "ans": 1,
        "hint": "mind + doing。",
        "sentence": "Would you mind opening the window?",
        "zh": "你介意开窗吗？"
      },
      {
        "q": "She likes _____ but today she would like _____ TV.",
        "opts": [
          "reading; to watch",
          "to read; watching",
          "read; watch"
        ],
        "ans": 0,
        "hint": "like doing 爱好；would like to do 想要。",
        "sentence": "She likes reading but today she would like to watch TV.",
        "zh": "她喜欢阅读，但今天想看电视。"
      },
      {
        "q": "I enjoy _____ books in the library.",
        "opts": [
          "read",
          "reading",
          "to read"
        ],
        "ans": 1,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。"
      },
      {
        "q": "Tom likes _____ basketball.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "Tom likes playing basketball.",
        "zh": "汤姆喜欢打篮球。"
      },
      {
        "q": "We finish _____ the classroom at four.",
        "opts": [
          "clean",
          "cleaning",
          "cleans"
        ],
        "ans": 1,
        "hint": "finish 后接 doing",
        "sentence": "We finish cleaning the classroom at four.",
        "zh": "我们四点打扫完教室。"
      },
      {
        "q": "She practices _____ the piano every day.",
        "opts": [
          "play",
          "playing",
          "plays"
        ],
        "ans": 1,
        "hint": "practise 后接 doing",
        "sentence": "She practices playing the piano every day.",
        "zh": "她每天练习弹钢琴。"
      },
      {
        "q": "My dad enjoys _____ dinner on weekends.",
        "opts": [
          "cooking",
          "cook",
          "cooks"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "My dad enjoys cooking dinner on weekends.",
        "zh": "我爸爸周末喜欢做饭。"
      },
      {
        "q": "I like _____ hot pot in Chengdu.",
        "opts": [
          "eating",
          "eat",
          "ate"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "I like eating hot pot in Chengdu.",
        "zh": "我喜欢在成都吃火锅。"
      },
      {
        "q": "He finishes _____ his homework before dinner.",
        "opts": [
          "do",
          "doing",
          "does"
        ],
        "ans": 1,
        "hint": "finish 后接 doing",
        "sentence": "He finishes doing his homework before dinner.",
        "zh": "他在晚饭前做完作业。"
      },
      {
        "q": "The students enjoy _____ games on the playground.",
        "opts": [
          "playing",
          "play",
          "played"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "The students enjoy playing games on the playground.",
        "zh": "学生们喜欢在操场上玩游戏。"
      },
      {
        "q": "She enjoys _____ pictures of pandas.",
        "opts": [
          "drawing",
          "draw",
          "draws"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "She enjoys drawing pictures of pandas.",
        "zh": "她喜欢画熊猫。"
      },
      {
        "q": "They finish _____ TV at nine.",
        "opts": [
          "watching",
          "watch",
          "watches"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "They finish watching TV at nine.",
        "zh": "他们九点看完电视。"
      },
      {
        "q": "He likes _____ in summer.",
        "opts": [
          "swimming",
          "swim",
          "swims"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "He likes swimming in summer.",
        "zh": "他喜欢在夏天游泳。"
      },
      {
        "q": "I enjoy _____ to music on the bus.",
        "opts": [
          "listening",
          "listen",
          "listens"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy listening to music on the bus.",
        "zh": "我喜欢在公交车上听音乐。"
      },
      {
        "q": "She practices _____ in the classroom.",
        "opts": [
          "singing",
          "sing",
          "sings"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "She practices singing in the classroom.",
        "zh": "她在教室里练习唱歌。"
      },
      {
        "q": "We enjoy _____ in the park.",
        "opts": [
          "walking",
          "walk",
          "walks"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "We enjoy walking in the park.",
        "zh": "我们喜欢在公园散步。"
      },
      {
        "q": "He finishes _____ a book every week.",
        "opts": [
          "reading",
          "read",
          "reads"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "He finishes reading a book every week.",
        "zh": "他每周读完一本书。"
      },
      {
        "q": "They like _____ football after school.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "They like playing football after school.",
        "zh": "他们放学后喜欢踢足球。"
      },
      {
        "q": "I enjoy _____ my mother cook.",
        "opts": [
          "helping",
          "help",
          "helps"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy helping my mother cook.",
        "zh": "我喜欢帮妈妈做饭。"
      },
      {
        "q": "She likes _____ stamps.",
        "opts": [
          "collecting",
          "collect",
          "collects"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "She likes collecting stamps.",
        "zh": "她喜欢集邮。"
      },
      {
        "q": "We finish _____ trees in spring.",
        "opts": [
          "planting",
          "plant",
          "plants"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "We finish planting trees in spring.",
        "zh": "我们在春天种完树。"
      },
      {
        "q": "He enjoys _____ a bike to school.",
        "opts": [
          "riding",
          "ride",
          "rides"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "He enjoys riding a bike to school.",
        "zh": "他喜欢骑自行车上学。"
      },
      {
        "q": "They practice _____ English every morning.",
        "opts": [
          "speaking",
          "speak",
          "speaks"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "They practice speaking English every morning.",
        "zh": "他们每天早上练习说英语。"
      },
      {
        "q": "I like _____ pandas at the zoo.",
        "opts": [
          "watching",
          "watch",
          "watches"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "I like watching pandas at the zoo.",
        "zh": "我喜欢在动物园看熊猫。"
      },
      {
        "q": "She enjoys _____ with her friends.",
        "opts": [
          "shopping",
          "shop",
          "shops"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "She enjoys shopping with her friends.",
        "zh": "她喜欢和朋友一起购物。"
      },
      {
        "q": "We finish _____ a kite on Sunday.",
        "opts": [
          "making",
          "make",
          "makes"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "We finish making a kite on Sunday.",
        "zh": "我们星期天做完了一个风筝。"
      },
      {
        "q": "He enjoys _____ the piano.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "He enjoys playing the piano.",
        "zh": "他喜欢弹钢琴。"
      },
      {
        "q": "She likes _____ to school by bus.",
        "opts": [
          "going",
          "go",
          "goes"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "She likes going to school by bus.",
        "zh": "她喜欢坐公交车上学。"
      },
      {
        "q": "They finish _____ the dishes after dinner.",
        "opts": [
          "washing",
          "wash",
          "washes"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "They finish washing the dishes after dinner.",
        "zh": "他们晚饭后洗完碗。"
      },
      {
        "q": "I practice _____ English every day.",
        "opts": [
          "reading",
          "read",
          "reads"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "I practice reading English every day.",
        "zh": "我每天练习读英语。"
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
        "q": "She enjoys _____ football after school.",
        "opts": [
          "play",
          "playing",
          "to play"
        ],
        "ans": 1,
        "hint": "enjoy + doing。",
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。"
      },
      {
        "q": "He finished _____ the room.",
        "opts": [
          "clean",
          "cleaning",
          "to clean"
        ],
        "ans": 1,
        "hint": "finish + doing。",
        "sentence": "He finished cleaning the room.",
        "zh": "他打扫完房间了。"
      },
      {
        "q": "They practise _____ the piano every day.",
        "opts": [
          "play",
          "playing",
          "to play"
        ],
        "ans": 1,
        "hint": "practise + doing。",
        "sentence": "They practise playing the piano every day.",
        "zh": "他们每天练习弹钢琴。"
      },
      {
        "q": "I hope _____ you soon.",
        "opts": [
          "seeing",
          "see",
          "to see"
        ],
        "ans": 2,
        "hint": "hope + to do。",
        "sentence": "I hope to see you soon.",
        "zh": "我希望很快见到你。"
      },
      {
        "q": "Would you mind _____ the window?",
        "opts": [
          "open",
          "opening",
          "to open"
        ],
        "ans": 1,
        "hint": "mind + doing。",
        "sentence": "Would you mind opening the window?",
        "zh": "你介意开窗吗？"
      },
      {
        "q": "She likes _____ but today she would like _____ TV.",
        "opts": [
          "reading; to watch",
          "to read; watching",
          "read; watch"
        ],
        "ans": 0,
        "hint": "like doing 爱好；would like to do 想要。",
        "sentence": "She likes reading but today she would like to watch TV.",
        "zh": "她喜欢阅读，但今天想看电视。"
      },
      {
        "q": "I enjoy _____ books in the library.",
        "opts": [
          "read",
          "reading",
          "to read"
        ],
        "ans": 1,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。"
      },
      {
        "q": "Tom likes _____ basketball.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "Tom likes playing basketball.",
        "zh": "汤姆喜欢打篮球。"
      },
      {
        "q": "We finish _____ the classroom at four.",
        "opts": [
          "clean",
          "cleaning",
          "cleans"
        ],
        "ans": 1,
        "hint": "finish 后接 doing",
        "sentence": "We finish cleaning the classroom at four.",
        "zh": "我们四点打扫完教室。"
      },
      {
        "q": "She practices _____ the piano every day.",
        "opts": [
          "play",
          "playing",
          "plays"
        ],
        "ans": 1,
        "hint": "practise 后接 doing",
        "sentence": "She practices playing the piano every day.",
        "zh": "她每天练习弹钢琴。"
      },
      {
        "q": "My dad enjoys _____ dinner on weekends.",
        "opts": [
          "cooking",
          "cook",
          "cooks"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "My dad enjoys cooking dinner on weekends.",
        "zh": "我爸爸周末喜欢做饭。"
      },
      {
        "q": "I like _____ hot pot in Chengdu.",
        "opts": [
          "eating",
          "eat",
          "ate"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "I like eating hot pot in Chengdu.",
        "zh": "我喜欢在成都吃火锅。"
      },
      {
        "q": "He finishes _____ his homework before dinner.",
        "opts": [
          "do",
          "doing",
          "does"
        ],
        "ans": 1,
        "hint": "finish 后接 doing",
        "sentence": "He finishes doing his homework before dinner.",
        "zh": "他在晚饭前做完作业。"
      },
      {
        "q": "The students enjoy _____ games on the playground.",
        "opts": [
          "playing",
          "play",
          "played"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "The students enjoy playing games on the playground.",
        "zh": "学生们喜欢在操场上玩游戏。"
      },
      {
        "q": "She enjoys _____ pictures of pandas.",
        "opts": [
          "drawing",
          "draw",
          "draws"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "She enjoys drawing pictures of pandas.",
        "zh": "她喜欢画熊猫。"
      },
      {
        "q": "They finish _____ TV at nine.",
        "opts": [
          "watching",
          "watch",
          "watches"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "They finish watching TV at nine.",
        "zh": "他们九点看完电视。"
      },
      {
        "q": "He likes _____ in summer.",
        "opts": [
          "swimming",
          "swim",
          "swims"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "He likes swimming in summer.",
        "zh": "他喜欢在夏天游泳。"
      },
      {
        "q": "I enjoy _____ to music on the bus.",
        "opts": [
          "listening",
          "listen",
          "listens"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy listening to music on the bus.",
        "zh": "我喜欢在公交车上听音乐。"
      },
      {
        "q": "She practices _____ in the classroom.",
        "opts": [
          "singing",
          "sing",
          "sings"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "She practices singing in the classroom.",
        "zh": "她在教室里练习唱歌。"
      },
      {
        "q": "We enjoy _____ in the park.",
        "opts": [
          "walking",
          "walk",
          "walks"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "We enjoy walking in the park.",
        "zh": "我们喜欢在公园散步。"
      },
      {
        "q": "He finishes _____ a book every week.",
        "opts": [
          "reading",
          "read",
          "reads"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "He finishes reading a book every week.",
        "zh": "他每周读完一本书。"
      },
      {
        "q": "They like _____ football after school.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "They like playing football after school.",
        "zh": "他们放学后喜欢踢足球。"
      },
      {
        "q": "I enjoy _____ my mother cook.",
        "opts": [
          "helping",
          "help",
          "helps"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy helping my mother cook.",
        "zh": "我喜欢帮妈妈做饭。"
      },
      {
        "q": "She likes _____ stamps.",
        "opts": [
          "collecting",
          "collect",
          "collects"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "She likes collecting stamps.",
        "zh": "她喜欢集邮。"
      },
      {
        "q": "We finish _____ trees in spring.",
        "opts": [
          "planting",
          "plant",
          "plants"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "We finish planting trees in spring.",
        "zh": "我们在春天种完树。"
      },
      {
        "q": "He enjoys _____ a bike to school.",
        "opts": [
          "riding",
          "ride",
          "rides"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "He enjoys riding a bike to school.",
        "zh": "他喜欢骑自行车上学。"
      },
      {
        "q": "They practice _____ English every morning.",
        "opts": [
          "speaking",
          "speak",
          "speaks"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "They practice speaking English every morning.",
        "zh": "他们每天早上练习说英语。"
      },
      {
        "q": "I like _____ pandas at the zoo.",
        "opts": [
          "watching",
          "watch",
          "watches"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "I like watching pandas at the zoo.",
        "zh": "我喜欢在动物园看熊猫。"
      },
      {
        "q": "She enjoys _____ with her friends.",
        "opts": [
          "shopping",
          "shop",
          "shops"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "She enjoys shopping with her friends.",
        "zh": "她喜欢和朋友一起购物。"
      },
      {
        "q": "We finish _____ a kite on Sunday.",
        "opts": [
          "making",
          "make",
          "makes"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "We finish making a kite on Sunday.",
        "zh": "我们星期天做完了一个风筝。"
      },
      {
        "q": "He enjoys _____ the piano.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "He enjoys playing the piano.",
        "zh": "他喜欢弹钢琴。"
      },
      {
        "q": "She likes _____ to school by bus.",
        "opts": [
          "going",
          "go",
          "goes"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "She likes going to school by bus.",
        "zh": "她喜欢坐公交车上学。"
      },
      {
        "q": "They finish _____ the dishes after dinner.",
        "opts": [
          "washing",
          "wash",
          "washes"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "They finish washing the dishes after dinner.",
        "zh": "他们晚饭后洗完碗。"
      },
      {
        "q": "I practice _____ English every day.",
        "opts": [
          "reading",
          "read",
          "reads"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "I practice reading English every day.",
        "zh": "我每天练习读英语。"
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
    "image": "w3-like-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "enjoy reading",
        "zh": "喜欢阅读"
      },
      {
        "en": "finish doing",
        "zh": "做完"
      },
      {
        "en": "practise playing",
        "zh": "练习弹/打"
      },
      {
        "en": "want to do",
        "zh": "想要做（对比）"
      },
      {
        "en": "like playing basketball",
        "zh": "喜欢打篮球"
      },
      {
        "en": "finish cleaning",
        "zh": "打扫完"
      },
      {
        "en": "practise singing",
        "zh": "练习唱歌"
      },
      {
        "en": "enjoy drawing",
        "zh": "喜欢画画"
      },
      {
        "en": "like swimming",
        "zh": "喜欢游泳"
      },
      {
        "en": "finish homework",
        "zh": "完成作业"
      },
      {
        "en": "practice speaking English",
        "zh": "练习说英语"
      },
      {
        "en": "enjoy walking",
        "zh": "喜欢散步"
      },
      {
        "en": "like watching pandas",
        "zh": "喜欢看熊猫"
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
    "image": "w3-like-hero.jpg",
    "audio": "I enjoy reading books in the library.",
    "opts": [
      "I enjoy reading books in the library.",
      "I enjoy to read books in the library.",
      "I enjoy read books in the library."
    ],
    "ans": 0,
    "hint": "enjoy 后接 doing",
    "sentence": "I enjoy reading books in the library.",
    "zh": "我喜欢在图书馆看书。",
    "questions": [
      {
        "audio": "I enjoy reading books in the library.",
        "opts": [
          "I enjoy reading books in the library.",
          "I enjoy to read books in the library.",
          "I enjoy read books in the library."
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "zh": "我喜欢在图书馆看书。",
        "sentence": "I enjoy reading books in the library."
      },
      {
        "audio": "Tom likes playing basketball.",
        "opts": [
          "Tom likes playing basketball.",
          "Tom likes play basketball.",
          "Tom likes to playing basketball."
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "zh": "汤姆喜欢打篮球。",
        "sentence": "Tom likes playing basketball."
      },
      {
        "audio": "She practices playing the piano.",
        "opts": [
          "She practices playing the piano.",
          "She practices to play the piano.",
          "She practices play the piano."
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "zh": "她练习弹钢琴。",
        "sentence": "She practices playing the piano."
      },
      {
        "audio": "We finish cleaning the classroom.",
        "opts": [
          "We finish cleaning the classroom.",
          "We finish to clean the classroom.",
          "We finish clean the classroom."
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "zh": "我们打扫完教室。",
        "sentence": "We finish cleaning the classroom."
      },
      {
        "audio": "He enjoys drawing pandas.",
        "opts": [
          "He enjoys drawing pandas.",
          "He enjoys to draw pandas.",
          "He enjoys draw pandas."
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "zh": "他喜欢画熊猫。",
        "sentence": "He enjoys drawing pandas."
      },
      {
        "audio": "She likes swimming in summer.",
        "opts": [
          "She likes swimming in summer.",
          "She likes swim in summer.",
          "She likes to swimming in summer."
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "zh": "她喜欢在夏天游泳。",
        "sentence": "She likes swimming in summer."
      },
      {
        "audio": "They finish watching TV at nine.",
        "opts": [
          "They finish watching TV at nine.",
          "They finish to watch TV at nine.",
          "They finish watch TV at nine."
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "zh": "他们九点看完电视。",
        "sentence": "They finish watching TV at nine."
      },
      {
        "audio": "I enjoy eating hot pot.",
        "opts": [
          "I enjoy eating hot pot.",
          "I enjoy to eat hot pot.",
          "I enjoy eat hot pot."
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "zh": "我喜欢吃火锅。",
        "sentence": "I enjoy eating hot pot."
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
    "image": "w3-like-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "I enjoy reading books in the library.",
        "zh": "我喜欢在图书馆看书。",
        "tag": "daily_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "Tom likes playing basketball.",
        "zh": "汤姆喜欢打篮球。",
        "tag": "daily_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "We finish cleaning the classroom at four.",
        "zh": "我们四点打扫完教室。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "She practices playing the piano every day.",
        "zh": "她每天练习弹钢琴。",
        "tag": "daily_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "My dad enjoys cooking dinner on weekends.",
        "zh": "我爸爸周末喜欢做饭。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "I like eating hot pot in Chengdu.",
        "zh": "我喜欢在成都吃火锅。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He finishes doing his homework before dinner.",
        "zh": "他在晚饭前做完作业。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The students enjoy playing games on the playground.",
        "zh": "学生们喜欢在操场上玩游戏。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "She enjoys drawing pictures of pandas.",
        "zh": "她喜欢画熊猫。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "They finish watching TV at nine.",
        "zh": "他们九点看完电视。",
        "tag": "exam_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "He likes swimming in summer.",
        "zh": "他喜欢在夏天游泳。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "I enjoy listening to music on the bus.",
        "zh": "我喜欢在公交车上听音乐。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She practices singing in the classroom.",
        "zh": "她在教室里练习唱歌。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We enjoy walking in the park.",
        "zh": "我们喜欢在公园散步。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He finishes reading a book every week.",
        "zh": "他每周读完一本书。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "They like playing football after school.",
        "zh": "他们放学后喜欢踢足球。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "I enjoy helping my mother cook.",
        "zh": "我喜欢帮妈妈做饭。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "She likes collecting stamps.",
        "zh": "她喜欢集邮。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "We finish planting trees in spring.",
        "zh": "我们在春天种完树。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "He enjoys riding a bike to school.",
        "zh": "他喜欢骑自行车上学。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "They practice speaking English every morning.",
        "zh": "他们每天早上练习说英语。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I like watching pandas at the zoo.",
        "zh": "我喜欢在动物园看熊猫。",
        "tag": "writing_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "She enjoys shopping with her friends.",
        "zh": "她喜欢和朋友一起购物。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "We finish making a kite on Sunday.",
        "zh": "我们星期天做完了一个风筝。",
        "tag": "writing_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
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
    "image": "w3-like-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "He likes _____ in summer.",
        "opts": [
          "swimming",
          "swim",
          "swims"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "He likes swimming in summer.",
        "zh": "他喜欢在夏天游泳。"
      },
      {
        "q": "I enjoy _____ to music on the bus.",
        "opts": [
          "listening",
          "listen",
          "listens"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy listening to music on the bus.",
        "zh": "我喜欢在公交车上听音乐。"
      },
      {
        "q": "She practices _____ in the classroom.",
        "opts": [
          "singing",
          "sing",
          "sings"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "She practices singing in the classroom.",
        "zh": "她在教室里练习唱歌。"
      },
      {
        "q": "We enjoy _____ in the park.",
        "opts": [
          "walking",
          "walk",
          "walks"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "We enjoy walking in the park.",
        "zh": "我们喜欢在公园散步。"
      },
      {
        "q": "He finishes _____ a book every week.",
        "opts": [
          "reading",
          "read",
          "reads"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "He finishes reading a book every week.",
        "zh": "他每周读完一本书。"
      },
      {
        "q": "They like _____ football after school.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "They like playing football after school.",
        "zh": "他们放学后喜欢踢足球。"
      },
      {
        "q": "I enjoy _____ my mother cook.",
        "opts": [
          "helping",
          "help",
          "helps"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "I enjoy helping my mother cook.",
        "zh": "我喜欢帮妈妈做饭。"
      },
      {
        "q": "She likes _____ stamps.",
        "opts": [
          "collecting",
          "collect",
          "collects"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "She likes collecting stamps.",
        "zh": "她喜欢集邮。"
      },
      {
        "q": "We finish _____ trees in spring.",
        "opts": [
          "planting",
          "plant",
          "plants"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "We finish planting trees in spring.",
        "zh": "我们在春天种完树。"
      },
      {
        "q": "He enjoys _____ a bike to school.",
        "opts": [
          "riding",
          "ride",
          "rides"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "He enjoys riding a bike to school.",
        "zh": "他喜欢骑自行车上学。"
      },
      {
        "q": "They practice _____ English every morning.",
        "opts": [
          "speaking",
          "speak",
          "speaks"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "They practice speaking English every morning.",
        "zh": "他们每天早上练习说英语。"
      },
      {
        "q": "I like _____ pandas at the zoo.",
        "opts": [
          "watching",
          "watch",
          "watches"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "I like watching pandas at the zoo.",
        "zh": "我喜欢在动物园看熊猫。"
      },
      {
        "q": "She enjoys _____ with her friends.",
        "opts": [
          "shopping",
          "shop",
          "shops"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "She enjoys shopping with her friends.",
        "zh": "她喜欢和朋友一起购物。"
      },
      {
        "q": "We finish _____ a kite on Sunday.",
        "opts": [
          "making",
          "make",
          "makes"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "We finish making a kite on Sunday.",
        "zh": "我们星期天做完了一个风筝。"
      },
      {
        "q": "He enjoys _____ the piano.",
        "opts": [
          "playing",
          "play",
          "plays"
        ],
        "ans": 0,
        "hint": "enjoy 后接 doing",
        "sentence": "He enjoys playing the piano.",
        "zh": "他喜欢弹钢琴。"
      },
      {
        "q": "She likes _____ to school by bus.",
        "opts": [
          "going",
          "go",
          "goes"
        ],
        "ans": 0,
        "hint": "like 后接 doing",
        "sentence": "She likes going to school by bus.",
        "zh": "她喜欢坐公交车上学。"
      },
      {
        "q": "They finish _____ the dishes after dinner.",
        "opts": [
          "washing",
          "wash",
          "washes"
        ],
        "ans": 0,
        "hint": "finish 后接 doing",
        "sentence": "They finish washing the dishes after dinner.",
        "zh": "他们晚饭后洗完碗。"
      },
      {
        "q": "I practice _____ English every day.",
        "opts": [
          "reading",
          "read",
          "reads"
        ],
        "ans": 0,
        "hint": "practise 后接 doing",
        "sentence": "I practice reading English every day.",
        "zh": "我每天练习读英语。"
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
    "image": "writing.jpg",
    "checklist": [
      "enjoy/like/finish + doing",
      "want/decide/hope + to do（对比）",
      "写作：I enjoy reading; I want to read more.",
      "mind / keep / practise / finish / enjoy 后接 doing。"
    ],
    "chant": "Enjoy and like — add -ing! Want to do — infinitive ring!",
    "chantSpeak": "Enjoy and like, add ing! Want to do, infinitive ring!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "like / enjoy / finish + doing",
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