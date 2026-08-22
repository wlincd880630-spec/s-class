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
    "audio": "Miss Li gave us a interesting lesson.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "Miss Li gave us a interesting lesson.",
    "zh": "李老师给我们上了一节有趣的课。",
    "image": "w3-obj-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-obj-hero.jpg",
    "question": "give 后面「我们」用 we 还是 us？",
    "choices": [
      {
        "text": "us（宾格）",
        "correct": true,
        "fb": "对了！动词后/介词后用宾格。"
      },
      {
        "text": "we（主格）",
        "correct": false,
        "fb": "主格作主语：We study hard。"
      },
      {
        "text": "our（形容词性物主）",
        "correct": false,
        "fb": "our 后接名词 our book。"
      }
    ],
    "sentence": "Miss Li gave us a interesting lesson.",
    "zh": "李老师给我们上了一节有趣的课。"
  },
  {
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w3-obj-hero.jpg",
    "lead": "作主语用主格；作宾语（动词或介词后）用宾格。",
    "formula": "I → me　he → him　she → her　we → us　they → them",
    "parts": [
      {
        "mark": "主格",
        "label": "主语",
        "example": "I / he / she / we / they"
      },
      {
        "mark": "宾格",
        "label": "动词/介词后",
        "example": "me / him / her / us / them"
      }
    ],
    "samples": [
      {
        "sentence": "Please tell her the good news.",
        "zh": "请告诉她这个好消息。"
      },
      {
        "sentence": "Miss Li gave us an interesting lesson.",
        "zh": "李老师给我们上了一堂有趣的课。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-obj-subj.jpg",
    "rightImage": "w3-obj-obj.jpg",
    "leftLabel": "主格 I/he/she",
    "rightLabel": "宾格 me/him/her",
    "leftSentence": "He and I are classmates.",
    "leftZh": "他和我是同学。",
    "rightSentence": "Miss Li helped him and me.",
    "rightZh": "李老师帮助了他和我。",
    "morphBase": "I",
    "morphPast": "me",
    "morphHighlight": "",
    "discovery": "主语用主格；动词/介词后用宾格。"
  },
  {
    "section": "精讲",
    "title": "例句 · tell her",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-obj-hero.jpg",
    "lead": "tell 后面的人用宾格 her。",
    "sentence": "Please tell her the good news.",
    "zh": "请告诉她这个好消息。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · gave us",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w3-obj-hero.jpg",
    "lead": "give + 宾格 + 物。",
    "sentence": "Miss Li gave us an interesting lesson.",
    "zh": "李老师给我们上了一堂有趣的课。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "介词后接宾格",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-classroom.png",
    "lead": "宾格代词也用在介词后面。",
    "sentence": "The teacher is talking to him about the test.",
    "zh": "老师正在和他谈论考试的事。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "常见错误",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "介词后不能用主格，要用宾格。",
    "sentence": "Between you and me, this is a secret.",
    "zh": "在你我之间，这是个秘密。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "id": "p09",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-obj-hero.jpg",
    "lead": "主格宾格对照表。",
    "rules": [
      {
        "tab": "对照",
        "rule": "I→me, he→him, she→her, we→us, they→them",
        "focusVerb": "us",
        "examples": [
          {
            "from": "I",
            "to": "me"
          },
          {
            "from": "they",
            "to": "them"
          }
        ],
        "sample": "Miss Li gave us an interesting lesson.",
        "sampleZh": "李老师给我们上了一节有趣的课。"
      },
      {
        "tab": "介词后",
        "rule": "介词后必须用宾格：for me, with him, between you and me",
        "focusVerb": "me",
        "examples": [
          {
            "from": "for I",
            "to": "for me"
          }
        ],
        "sample": "This book is for you and me.",
        "sampleZh": "这本书给你我的。"
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
    "image": "w3-obj-hero.jpg",
    "buckets": [
      {
        "key": "sub",
        "label": "主格"
      },
      {
        "key": "obj",
        "label": "宾格"
      }
    ],
    "items": [
      {
        "text": "She loves him.",
        "bucket": "obj"
      },
      {
        "text": "He is tall.",
        "bucket": "sub"
      },
      {
        "text": "between you and me",
        "bucket": "obj"
      },
      {
        "text": "They are students.",
        "bucket": "sub"
      },
      {
        "text": "Tell her the truth.",
        "bucket": "obj"
      },
      {
        "text": "We like English.",
        "bucket": "sub"
      }
    ]
  },
  {
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w3-obj-hero.jpg",
    "question": "「Between you and I, this is a secret.」应改成？",
    "choices": [
      {
        "text": "Between you and me（介词后用宾格）",
        "correct": true,
        "fb": "between 是介词。"
      },
      {
        "text": "Between you and my",
        "correct": false,
        "fb": "my 是物主代词。"
      },
      {
        "text": "Between you and mine",
        "correct": false,
        "fb": "mine 是名词性物主。"
      }
    ],
    "sentence": "Between you and me, this is a secret.",
    "zh": "就我们俩之间说，这是个秘密。",
    "id": "p11"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w3-obj-hero.jpg",
    "lead": "把主语 I 改成宾语位置的 me。",
    "items": [
      {
        "from": "I am a student.",
        "fromZh": "我是学生。",
        "steps": [
          {
            "label": "老师帮助我：How to say 'help + 我'?",
            "opts": [
              "The teacher helps me.",
              "The teacher helps I.",
              "The teacher helps my."
            ],
            "ans": 0,
            "hint": "helps 后用 me。",
            "sentence": "The teacher helps me.",
            "zh": "老师帮助我。"
          }
        ]
      },
      {
        "from": "Between you and I, this is a secret.",
        "fromZh": "在你我之间，这是个秘密。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "Between you and me, this is a secret.",
              "Between I and you, this is a secret.",
              "Between you and my, this is a secret."
            ],
            "ans": 0,
            "hint": "介词后要用宾格，I 改为 me",
            "sentence": "Between you and me, this is a secret.",
            "zh": "在你我之间，这是个秘密。"
          }
        ]
      },
      {
        "from": "She gave I a book.",
        "fromZh": "她给了我一本书。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "She gave me a book.",
              "She gave I a book.",
              "She gave my a book."
            ],
            "ans": 0,
            "hint": "gave 后跟宾格 me",
            "sentence": "She gave me a book.",
            "zh": "她给了我一本书。"
          }
        ]
      },
      {
        "from": "The teacher asked he a question.",
        "fromZh": "老师问了他一个问题。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The teacher asked him a question.",
              "The teacher asked he a question.",
              "The teacher asked his a question."
            ],
            "ans": 0,
            "hint": "asked 后跟宾格 him",
            "sentence": "The teacher asked him a question.",
            "zh": "老师问了他一个问题。"
          }
        ]
      },
      {
        "from": "We are waiting for she at the bus stop.",
        "fromZh": "我们在公交站等她。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "We are waiting for her at the bus stop.",
              "We are waiting for she at the bus stop.",
              "We are waiting for hers at the bus stop."
            ],
            "ans": 0,
            "hint": "介词 for 后跟宾格 her",
            "sentence": "We are waiting for her at the bus stop.",
            "zh": "我们在公交站等她。"
          }
        ]
      },
      {
        "from": "The coach is training they for the match.",
        "fromZh": "教练正在训练他们备战比赛。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "The coach is training them for the match.",
              "The coach is training they for the match.",
              "The coach is training their for the match."
            ],
            "ans": 0,
            "hint": "training 后跟宾格 them",
            "sentence": "The coach is training them for the match.",
            "zh": "教练正在训练他们备战比赛。"
          }
        ]
      },
      {
        "from": "Please tell we the answer.",
        "fromZh": "请告诉我们答案。",
        "steps": [
          {
            "label": "改成正确的句子",
            "opts": [
              "Please tell us the answer.",
              "Please tell we the answer.",
              "Please tell our the answer."
            ],
            "ans": 0,
            "hint": "tell 后跟宾格 us",
            "sentence": "Please tell us the answer.",
            "zh": "请告诉我们答案。"
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
    "image": "kp3d-classroom.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "Please",
      "give",
      "me",
      "the",
      "book"
    ],
    "sentence": "Please give me the book.",
    "zh": "请给我这本书。",
    "items": [
      {
        "tokens": [
          "Please",
          "give",
          "me",
          "the",
          "book"
        ],
        "sentence": "Please give me the book.",
        "zh": "请给我这本书。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "The",
          "teacher",
          "is",
          "talking",
          "to",
          "him",
          "about",
          "the",
          "lesson"
        ],
        "sentence": "The teacher is talking to him about the lesson.",
        "zh": "老师正在和他谈论这节课。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "My",
          "mother",
          "loves",
          "me",
          "very",
          "much"
        ],
        "sentence": "My mother loves me very much.",
        "zh": "我妈妈非常爱我。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "The",
          "students",
          "are",
          "waiting",
          "for",
          "us",
          "at",
          "the",
          "school",
          "gate"
        ],
        "sentence": "The students are waiting for us at the school gate.",
        "zh": "学生们在学校门口等我们。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "I",
          "saw",
          "them",
          "in",
          "the",
          "library",
          "yesterday"
        ],
        "sentence": "I saw them in the library yesterday.",
        "zh": "我昨天在图书馆看到他们了。",
        "image": "kp3d-library.png"
      },
      {
        "tokens": [
          "She",
          "invited",
          "us",
          "to",
          "her",
          "birthday",
          "party"
        ],
        "sentence": "She invited us to her birthday party.",
        "zh": "她邀请我们参加她的生日聚会。",
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
    "image": "w3-obj-hero.jpg",
    "audio": "Please tell her the good news.",
    "tokens": [
      "Please",
      "tell",
      "her",
      "the",
      "good",
      "news"
    ],
    "sentence": "Please tell her the good news.",
    "zh": "请告诉她这个好消息。"
  },
  {
    "id": "p15",
    "section": "检测",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-obj-hero.jpg",
    "q": "Miss Li gave _____ an interesting lesson.",
    "opts": [
      "we",
      "us",
      "our"
    ],
    "ans": 1,
    "hint": "gave 后接宾格 us。",
    "sentence": "Miss Li gave us a interesting lesson.",
    "zh": "李老师给我们上了一节有趣的课。"
  },
  {
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w3-obj-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
        "q": "Miss Li gave _____ an interesting lesson.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "gave 后接宾格 us。",
        "sentence": "Miss Li gave us a interesting lesson.",
        "zh": "李老师给我们上了一节有趣的课。"
      },
      {
        "q": "Please give _____ a cup of tea. (she)",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "give + 宾格 her。",
        "sentence": "Please give her a cup of tea.",
        "zh": "请给她一杯茶。"
      },
      {
        "q": "We saw _____ in the park. (they)",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "saw 后宾格 them。",
        "sentence": "We saw them in the park.",
        "zh": "我们在公园看见他们。"
      },
      {
        "q": "He sits between Tom and _____. (I)",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "between ... and me。",
        "sentence": "He sits between Tom and me.",
        "zh": "他坐在汤姆和我中间。"
      },
      {
        "q": "_____ like English. Don't ask _____ to drop it. (we)",
        "opts": [
          "We; we",
          "Us; us",
          "We; us"
        ],
        "ans": 2,
        "hint": "主语 we，宾语 us。",
        "sentence": "We like English. Don't ask us to drop it.",
        "zh": "我们喜欢英语。别让我们放弃。"
      },
      {
        "q": "The teacher asked _____ to be quiet. (he)",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "asked + 宾格 him。",
        "sentence": "The teacher asked him to be quiet.",
        "zh": "老师让他安静。"
      },
      {
        "q": "Please give _____ the book.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "give 后跟宾格",
        "sentence": "Please give me the book.",
        "zh": "请给我这本书。"
      },
      {
        "q": "The teacher is talking to _____ about the lesson.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "The teacher is talking to him about the lesson.",
        "zh": "老师正在和他谈论这节课。"
      },
      {
        "q": "My mother loves _____ very much.",
        "opts": [
          "I",
          "me",
          "mine"
        ],
        "ans": 1,
        "hint": "love 后跟宾格",
        "sentence": "My mother loves me very much.",
        "zh": "我妈妈非常爱我。"
      },
      {
        "q": "Can you help _____ with my homework?",
        "opts": [
          "me",
          "I",
          "my"
        ],
        "ans": 0,
        "hint": "help 后跟宾格",
        "sentence": "Can you help me with my homework?",
        "zh": "你能帮我做作业吗？"
      },
      {
        "q": "The students are waiting for _____ at the school gate.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 for 后跟宾格",
        "sentence": "The students are waiting for us at the school gate.",
        "zh": "学生们在学校门口等我们。"
      },
      {
        "q": "I saw _____ in the library yesterday.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "saw 后跟宾格",
        "sentence": "I saw them in the library yesterday.",
        "zh": "我昨天在图书馆看到他们了。"
      },
      {
        "q": "Please tell _____ the good news.",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "tell 后跟宾格",
        "sentence": "Please tell her the good news.",
        "zh": "请告诉她这个好消息。"
      },
      {
        "q": "The doctor gave _____ some medicine.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "gave 后跟宾格",
        "sentence": "The doctor gave me some medicine.",
        "zh": "医生给了我一些药。"
      },
      {
        "q": "My friend invited _____ to his birthday party.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "invited 后跟宾格",
        "sentence": "My friend invited me to his birthday party.",
        "zh": "我朋友邀请我参加他的生日聚会。"
      },
      {
        "q": "The coach is training _____ for the match.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "training 后跟宾格",
        "sentence": "The coach is training them for the match.",
        "zh": "教练正在训练他们备战比赛。"
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
        "q": "Miss Li gave _____ an interesting lesson.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "gave 后接宾格 us。",
        "sentence": "Miss Li gave us a interesting lesson.",
        "zh": "李老师给我们上了一节有趣的课。"
      },
      {
        "q": "Please give _____ a cup of tea. (she)",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "give + 宾格 her。",
        "sentence": "Please give her a cup of tea.",
        "zh": "请给她一杯茶。"
      },
      {
        "q": "We saw _____ in the park. (they)",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "saw 后宾格 them。",
        "sentence": "We saw them in the park.",
        "zh": "我们在公园看见他们。"
      },
      {
        "q": "He sits between Tom and _____. (I)",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "between ... and me。",
        "sentence": "He sits between Tom and me.",
        "zh": "他坐在汤姆和我中间。"
      },
      {
        "q": "_____ like English. Don't ask _____ to drop it. (we)",
        "opts": [
          "We; we",
          "Us; us",
          "We; us"
        ],
        "ans": 2,
        "hint": "主语 we，宾语 us。",
        "sentence": "We like English. Don't ask us to drop it.",
        "zh": "我们喜欢英语。别让我们放弃。"
      },
      {
        "q": "The teacher asked _____ to be quiet. (he)",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "asked + 宾格 him。",
        "sentence": "The teacher asked him to be quiet.",
        "zh": "老师让他安静。"
      },
      {
        "q": "Please give _____ the book.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "give 后跟宾格",
        "sentence": "Please give me the book.",
        "zh": "请给我这本书。"
      },
      {
        "q": "The teacher is talking to _____ about the lesson.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "The teacher is talking to him about the lesson.",
        "zh": "老师正在和他谈论这节课。"
      },
      {
        "q": "My mother loves _____ very much.",
        "opts": [
          "I",
          "me",
          "mine"
        ],
        "ans": 1,
        "hint": "love 后跟宾格",
        "sentence": "My mother loves me very much.",
        "zh": "我妈妈非常爱我。"
      },
      {
        "q": "Can you help _____ with my homework?",
        "opts": [
          "me",
          "I",
          "my"
        ],
        "ans": 0,
        "hint": "help 后跟宾格",
        "sentence": "Can you help me with my homework?",
        "zh": "你能帮我做作业吗？"
      },
      {
        "q": "The students are waiting for _____ at the school gate.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 for 后跟宾格",
        "sentence": "The students are waiting for us at the school gate.",
        "zh": "学生们在学校门口等我们。"
      },
      {
        "q": "I saw _____ in the library yesterday.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "saw 后跟宾格",
        "sentence": "I saw them in the library yesterday.",
        "zh": "我昨天在图书馆看到他们了。"
      },
      {
        "q": "Please tell _____ the good news.",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "tell 后跟宾格",
        "sentence": "Please tell her the good news.",
        "zh": "请告诉她这个好消息。"
      },
      {
        "q": "The doctor gave _____ some medicine.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "gave 后跟宾格",
        "sentence": "The doctor gave me some medicine.",
        "zh": "医生给了我一些药。"
      },
      {
        "q": "My friend invited _____ to his birthday party.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "invited 后跟宾格",
        "sentence": "My friend invited me to his birthday party.",
        "zh": "我朋友邀请我参加他的生日聚会。"
      },
      {
        "q": "The coach is training _____ for the match.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "training 后跟宾格",
        "sentence": "The coach is training them for the match.",
        "zh": "教练正在训练他们备战比赛。"
      },
      {
        "q": "She is reading a story to _____ now.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "She is reading a story to us now.",
        "zh": "她正在给我们读故事。"
      },
      {
        "q": "The little girl is looking at _____ and smiling.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 at 后跟宾格",
        "sentence": "The little girl is looking at me and smiling.",
        "zh": "那个小女孩正看着我微笑。"
      },
      {
        "q": "My grandfather tells _____ stories every night.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "tells 后跟宾格",
        "sentence": "My grandfather tells me stories every night.",
        "zh": "我爷爷每天晚上给我讲故事。"
      },
      {
        "q": "The teacher asked _____ to answer the question.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "asked 后跟宾格",
        "sentence": "The teacher asked him to answer the question.",
        "zh": "老师让他回答问题。"
      },
      {
        "q": "We should listen to _____ carefully.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "We should listen to them carefully.",
        "zh": "我们应该仔细听他们说。"
      },
      {
        "q": "The old man is talking to _____ about his cat.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "The old man is talking to me about his cat.",
        "zh": "那个老人正在和我谈论他的猫。"
      },
      {
        "q": "Can you give _____ a hand? He is moving the box.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "give 后跟宾格",
        "sentence": "Can you give him a hand? He is moving the box.",
        "zh": "你能帮他一把吗？他正在搬箱子。"
      },
      {
        "q": "The librarian told _____ to be quiet in the library.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "told 后跟宾格",
        "sentence": "The librarian told us to be quiet in the library.",
        "zh": "图书管理员告诉我们在图书馆要保持安静。"
      },
      {
        "q": "My sister is teaching _____ to play the piano.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "teaching 后跟宾格",
        "sentence": "My sister is teaching me to play the piano.",
        "zh": "我姐姐正在教我弹钢琴。"
      },
      {
        "q": "The football coach is training _____ every day.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "training 后跟宾格",
        "sentence": "The football coach is training them every day.",
        "zh": "足球教练每天训练他们。"
      },
      {
        "q": "I will send _____ a message when I arrive.",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 0,
        "hint": "send 后跟宾格 you",
        "sentence": "I will send you a message when I arrive.",
        "zh": "我到达后会给你发信息。"
      },
      {
        "q": "She invited _____ to her birthday party.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "invited 后跟宾格",
        "sentence": "She invited us to her birthday party.",
        "zh": "她邀请我们参加她的生日聚会。"
      },
      {
        "q": "The teacher praised _____ for his hard work.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "praised 后跟宾格",
        "sentence": "The teacher praised him for his hard work.",
        "zh": "老师表扬了他努力学习。"
      },
      {
        "q": "My father often reads stories to _____ at bedtime.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "My father often reads stories to me at bedtime.",
        "zh": "我爸爸经常在睡前给我读故事。"
      },
      {
        "q": "The students are helping _____ carry her bags.",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "helping 后跟宾格",
        "sentence": "The students are helping her carry her bags.",
        "zh": "学生们正在帮她拿包。"
      },
      {
        "q": "The coach asked _____ to practice basketball after school.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "asked 后跟宾格",
        "sentence": "The coach asked us to practice basketball after school.",
        "zh": "教练让我们放学后练习篮球。"
      },
      {
        "q": "I hope to see _____ at the library tomorrow.",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 0,
        "hint": "see 后跟宾格 you",
        "sentence": "I hope to see you at the library tomorrow.",
        "zh": "我希望明天在图书馆见到你。"
      },
      {
        "q": "The little boy is waving at _____ from the window.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 at 后跟宾格",
        "sentence": "The little boy is waving at us from the window.",
        "zh": "小男孩从窗户向我们挥手。"
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
        "q": "Miss Li gave _____ an interesting lesson.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "gave 后接宾格 us。",
        "sentence": "Miss Li gave us a interesting lesson.",
        "zh": "李老师给我们上了一节有趣的课。"
      },
      {
        "q": "Please give _____ a cup of tea. (she)",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "give + 宾格 her。",
        "sentence": "Please give her a cup of tea.",
        "zh": "请给她一杯茶。"
      },
      {
        "q": "We saw _____ in the park. (they)",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "saw 后宾格 them。",
        "sentence": "We saw them in the park.",
        "zh": "我们在公园看见他们。"
      },
      {
        "q": "He sits between Tom and _____. (I)",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "between ... and me。",
        "sentence": "He sits between Tom and me.",
        "zh": "他坐在汤姆和我中间。"
      },
      {
        "q": "_____ like English. Don't ask _____ to drop it. (we)",
        "opts": [
          "We; we",
          "Us; us",
          "We; us"
        ],
        "ans": 2,
        "hint": "主语 we，宾语 us。",
        "sentence": "We like English. Don't ask us to drop it.",
        "zh": "我们喜欢英语。别让我们放弃。"
      },
      {
        "q": "The teacher asked _____ to be quiet. (he)",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "asked + 宾格 him。",
        "sentence": "The teacher asked him to be quiet.",
        "zh": "老师让他安静。"
      },
      {
        "q": "Please give _____ the book.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "give 后跟宾格",
        "sentence": "Please give me the book.",
        "zh": "请给我这本书。"
      },
      {
        "q": "The teacher is talking to _____ about the lesson.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "The teacher is talking to him about the lesson.",
        "zh": "老师正在和他谈论这节课。"
      },
      {
        "q": "My mother loves _____ very much.",
        "opts": [
          "I",
          "me",
          "mine"
        ],
        "ans": 1,
        "hint": "love 后跟宾格",
        "sentence": "My mother loves me very much.",
        "zh": "我妈妈非常爱我。"
      },
      {
        "q": "Can you help _____ with my homework?",
        "opts": [
          "me",
          "I",
          "my"
        ],
        "ans": 0,
        "hint": "help 后跟宾格",
        "sentence": "Can you help me with my homework?",
        "zh": "你能帮我做作业吗？"
      },
      {
        "q": "The students are waiting for _____ at the school gate.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 for 后跟宾格",
        "sentence": "The students are waiting for us at the school gate.",
        "zh": "学生们在学校门口等我们。"
      },
      {
        "q": "I saw _____ in the library yesterday.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "saw 后跟宾格",
        "sentence": "I saw them in the library yesterday.",
        "zh": "我昨天在图书馆看到他们了。"
      },
      {
        "q": "Please tell _____ the good news.",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "tell 后跟宾格",
        "sentence": "Please tell her the good news.",
        "zh": "请告诉她这个好消息。"
      },
      {
        "q": "The doctor gave _____ some medicine.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "gave 后跟宾格",
        "sentence": "The doctor gave me some medicine.",
        "zh": "医生给了我一些药。"
      },
      {
        "q": "My friend invited _____ to his birthday party.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "invited 后跟宾格",
        "sentence": "My friend invited me to his birthday party.",
        "zh": "我朋友邀请我参加他的生日聚会。"
      },
      {
        "q": "The coach is training _____ for the match.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "training 后跟宾格",
        "sentence": "The coach is training them for the match.",
        "zh": "教练正在训练他们备战比赛。"
      },
      {
        "q": "She is reading a story to _____ now.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "She is reading a story to us now.",
        "zh": "她正在给我们读故事。"
      },
      {
        "q": "The little girl is looking at _____ and smiling.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 at 后跟宾格",
        "sentence": "The little girl is looking at me and smiling.",
        "zh": "那个小女孩正看着我微笑。"
      },
      {
        "q": "My grandfather tells _____ stories every night.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "tells 后跟宾格",
        "sentence": "My grandfather tells me stories every night.",
        "zh": "我爷爷每天晚上给我讲故事。"
      },
      {
        "q": "The teacher asked _____ to answer the question.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "asked 后跟宾格",
        "sentence": "The teacher asked him to answer the question.",
        "zh": "老师让他回答问题。"
      },
      {
        "q": "We should listen to _____ carefully.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "We should listen to them carefully.",
        "zh": "我们应该仔细听他们说。"
      },
      {
        "q": "The old man is talking to _____ about his cat.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "The old man is talking to me about his cat.",
        "zh": "那个老人正在和我谈论他的猫。"
      },
      {
        "q": "Can you give _____ a hand? He is moving the box.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "give 后跟宾格",
        "sentence": "Can you give him a hand? He is moving the box.",
        "zh": "你能帮他一把吗？他正在搬箱子。"
      },
      {
        "q": "The librarian told _____ to be quiet in the library.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "told 后跟宾格",
        "sentence": "The librarian told us to be quiet in the library.",
        "zh": "图书管理员告诉我们在图书馆要保持安静。"
      },
      {
        "q": "My sister is teaching _____ to play the piano.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "teaching 后跟宾格",
        "sentence": "My sister is teaching me to play the piano.",
        "zh": "我姐姐正在教我弹钢琴。"
      },
      {
        "q": "The football coach is training _____ every day.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "training 后跟宾格",
        "sentence": "The football coach is training them every day.",
        "zh": "足球教练每天训练他们。"
      },
      {
        "q": "I will send _____ a message when I arrive.",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 0,
        "hint": "send 后跟宾格 you",
        "sentence": "I will send you a message when I arrive.",
        "zh": "我到达后会给你发信息。"
      },
      {
        "q": "She invited _____ to her birthday party.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "invited 后跟宾格",
        "sentence": "She invited us to her birthday party.",
        "zh": "她邀请我们参加她的生日聚会。"
      },
      {
        "q": "The teacher praised _____ for his hard work.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "praised 后跟宾格",
        "sentence": "The teacher praised him for his hard work.",
        "zh": "老师表扬了他努力学习。"
      },
      {
        "q": "My father often reads stories to _____ at bedtime.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "My father often reads stories to me at bedtime.",
        "zh": "我爸爸经常在睡前给我读故事。"
      },
      {
        "q": "The students are helping _____ carry her bags.",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "helping 后跟宾格",
        "sentence": "The students are helping her carry her bags.",
        "zh": "学生们正在帮她拿包。"
      },
      {
        "q": "The coach asked _____ to practice basketball after school.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "asked 后跟宾格",
        "sentence": "The coach asked us to practice basketball after school.",
        "zh": "教练让我们放学后练习篮球。"
      },
      {
        "q": "I hope to see _____ at the library tomorrow.",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 0,
        "hint": "see 后跟宾格 you",
        "sentence": "I hope to see you at the library tomorrow.",
        "zh": "我希望明天在图书馆见到你。"
      },
      {
        "q": "The little boy is waving at _____ from the window.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 at 后跟宾格",
        "sentence": "The little boy is waving at us from the window.",
        "zh": "小男孩从窗户向我们挥手。"
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
    "image": "w3-obj-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "help me",
        "zh": "帮助我"
      },
      {
        "en": "tell her",
        "zh": "告诉她"
      },
      {
        "en": "give us",
        "zh": "给我们"
      },
      {
        "en": "between you and me",
        "zh": "你我之间"
      },
      {
        "en": "tell him",
        "zh": "告诉他"
      },
      {
        "en": "give her",
        "zh": "给她"
      },
      {
        "en": "wait for us",
        "zh": "等我们"
      },
      {
        "en": "listen to them",
        "zh": "听他们说"
      },
      {
        "en": "look at me",
        "zh": "看着我"
      },
      {
        "en": "teach him",
        "zh": "教他"
      },
      {
        "en": "call her",
        "zh": "给她打电话"
      },
      {
        "en": "invite us",
        "zh": "邀请我们"
      },
      {
        "en": "see them",
        "zh": "看见他们"
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
    "image": "w3-obj-hero.jpg",
    "audio": "Please tell her the good news.",
    "opts": [
      "Please tell her the good news.",
      "Please tell him the good news.",
      "Please tell me the good news."
    ],
    "ans": 0,
    "hint": "听清楚是 her",
    "sentence": "Please tell her the good news.",
    "zh": "请告诉她这个好消息。",
    "questions": [
      {
        "audio": "Please tell her the good news.",
        "opts": [
          "Please tell her the good news.",
          "Please tell him the good news.",
          "Please tell me the good news."
        ],
        "ans": 0,
        "hint": "听清楚是 her",
        "zh": "请告诉她这个好消息。",
        "sentence": "Please tell her the good news."
      },
      {
        "audio": "The teacher gave us an interesting lesson.",
        "opts": [
          "The teacher gave us an interesting lesson.",
          "The teacher gave them an interesting lesson.",
          "The teacher gave me an interesting lesson."
        ],
        "ans": 0,
        "hint": "听清楚是 us",
        "zh": "老师给我们上了一堂有趣的课。",
        "sentence": "The teacher gave us an interesting lesson."
      },
      {
        "audio": "My mom always helps me with my homework.",
        "opts": [
          "My mom always helps me with my homework.",
          "My mom always helps him with my homework.",
          "My mom always helps her with my homework."
        ],
        "ans": 0,
        "hint": "听清楚是 me",
        "zh": "我妈妈总是帮我做作业。",
        "sentence": "My mom always helps me with my homework."
      },
      {
        "audio": "I saw them at the playground after school.",
        "opts": [
          "I saw them at the playground after school.",
          "I saw him at the playground after school.",
          "I saw her at the playground after school."
        ],
        "ans": 0,
        "hint": "听清楚是 them",
        "zh": "放学后我在操场上看到了他们。",
        "sentence": "I saw them at the playground after school."
      },
      {
        "audio": "Can you call her later?",
        "opts": [
          "Can you call her later?",
          "Can you call him later?",
          "Can you call me later?"
        ],
        "ans": 0,
        "hint": "听清楚是 her",
        "zh": "你能晚点给她打电话吗？",
        "sentence": "Can you call her later?"
      },
      {
        "audio": "The doctor gave me some medicine.",
        "opts": [
          "The doctor gave me some medicine.",
          "The doctor gave her some medicine.",
          "The doctor gave him some medicine."
        ],
        "ans": 0,
        "hint": "听清楚是 me",
        "zh": "医生给了我一些药。",
        "sentence": "The doctor gave me some medicine."
      },
      {
        "audio": "My grandfather tells me stories every night.",
        "opts": [
          "My grandfather tells me stories every night.",
          "My grandfather tells her stories every night.",
          "My grandfather tells him stories every night."
        ],
        "ans": 0,
        "hint": "听清楚是 me",
        "zh": "我爷爷每天晚上给我讲故事。",
        "sentence": "My grandfather tells me stories every night."
      },
      {
        "audio": "She invited us to her birthday party.",
        "opts": [
          "She invited us to her birthday party.",
          "She invited me to her birthday party.",
          "She invited them to her birthday party."
        ],
        "ans": 0,
        "hint": "听清楚是 us",
        "zh": "她邀请我们参加她的生日聚会。",
        "sentence": "She invited us to her birthday party."
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
    "image": "w3-obj-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "Please tell her the good news.",
        "zh": "请告诉她这个好消息。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Miss Li gave us an interesting lesson.",
        "zh": "李老师给我们上了一堂有趣的课。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My mom always helps me with my homework.",
        "zh": "我妈妈总是帮我做作业。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The teacher is talking to him about the test.",
        "zh": "老师正在和他谈论考试的事。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We saw them at the playground after school.",
        "zh": "放学后我们在操场上看到了他们。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "Can you call her later? She is busy now.",
        "zh": "你能晚点给她打电话吗？她现在很忙。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The little girl is looking at us and smiling.",
        "zh": "那个小女孩正看着我们微笑。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "My grandfather tells me stories every night.",
        "zh": "我爷爷每天晚上给我讲故事。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The panda is eating bamboo. Please don't feed it.",
        "zh": "熊猫正在吃竹子。请不要喂它。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "I bought a nice gift for her in the shop.",
        "zh": "我在商店给她买了一个漂亮的礼物。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "They are waiting for us at the bus stop.",
        "zh": "他们正在公交站等我们。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "The doctor gave me some medicine for the cold.",
        "zh": "医生给了我一些感冒药。",
        "tag": "daily_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "Please remind me to bring the umbrella tomorrow.",
        "zh": "请提醒我明天带伞。",
        "tag": "exam_use",
        "scene": "umbrella",
        "image": "kp3d-umbrella.png"
      },
      {
        "en": "The teacher asked him to answer the question.",
        "zh": "老师让他回答问题。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My parents will take us to see the pandas.",
        "zh": "我父母会带我们去看熊猫。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "She often helps her classmates with their English.",
        "zh": "她经常帮助同学学英语。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "We should listen to them carefully.",
        "zh": "我们应该仔细听他们说。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "The old man is talking to me about his cat.",
        "zh": "那个老人正在和我谈论他的猫。",
        "tag": "exam_use",
        "scene": "cat",
        "image": "kp3d-cat.png"
      },
      {
        "en": "Can you give him a hand? He is moving the box.",
        "zh": "你能帮他一把吗？他正在搬箱子。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The librarian told us to be quiet in the library.",
        "zh": "图书管理员告诉我们在图书馆要保持安静。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "My sister is teaching me to play the piano.",
        "zh": "我姐姐正在教我弹钢琴。",
        "tag": "exam_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "The football coach is training them every day.",
        "zh": "足球教练每天训练他们。",
        "tag": "exam_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "I will send you a message when I arrive.",
        "zh": "我到达后会给你发信息。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She invited us to her birthday party.",
        "zh": "她邀请我们参加她的生日聚会。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The teacher praised him for his hard work.",
        "zh": "老师表扬了他努力学习。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "My father often reads stories to me at bedtime.",
        "zh": "我爸爸经常在睡前给我读故事。",
        "tag": "writing_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "The students are helping the old lady carry her bags.",
        "zh": "学生们正在帮那位老太太拿包。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "The coach asked us to practice basketball after school.",
        "zh": "教练让我们放学后练习篮球。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "I hope to see you at the library tomorrow.",
        "zh": "我希望明天在图书馆见到你。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The little boy is waving at us from the window.",
        "zh": "小男孩从窗户向我们挥手。",
        "tag": "writing_use",
        "scene": "window",
        "image": "kp3d-window.png"
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
    "image": "w3-obj-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "She is reading a story to _____ now.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "She is reading a story to us now.",
        "zh": "她正在给我们读故事。"
      },
      {
        "q": "The little girl is looking at _____ and smiling.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 at 后跟宾格",
        "sentence": "The little girl is looking at me and smiling.",
        "zh": "那个小女孩正看着我微笑。"
      },
      {
        "q": "My grandfather tells _____ stories every night.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "tells 后跟宾格",
        "sentence": "My grandfather tells me stories every night.",
        "zh": "我爷爷每天晚上给我讲故事。"
      },
      {
        "q": "The teacher asked _____ to answer the question.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "asked 后跟宾格",
        "sentence": "The teacher asked him to answer the question.",
        "zh": "老师让他回答问题。"
      },
      {
        "q": "We should listen to _____ carefully.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "We should listen to them carefully.",
        "zh": "我们应该仔细听他们说。"
      },
      {
        "q": "The old man is talking to _____ about his cat.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "The old man is talking to me about his cat.",
        "zh": "那个老人正在和我谈论他的猫。"
      },
      {
        "q": "Can you give _____ a hand? He is moving the box.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "give 后跟宾格",
        "sentence": "Can you give him a hand? He is moving the box.",
        "zh": "你能帮他一把吗？他正在搬箱子。"
      },
      {
        "q": "The librarian told _____ to be quiet in the library.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "told 后跟宾格",
        "sentence": "The librarian told us to be quiet in the library.",
        "zh": "图书管理员告诉我们在图书馆要保持安静。"
      },
      {
        "q": "My sister is teaching _____ to play the piano.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "teaching 后跟宾格",
        "sentence": "My sister is teaching me to play the piano.",
        "zh": "我姐姐正在教我弹钢琴。"
      },
      {
        "q": "The football coach is training _____ every day.",
        "opts": [
          "they",
          "them",
          "their"
        ],
        "ans": 1,
        "hint": "training 后跟宾格",
        "sentence": "The football coach is training them every day.",
        "zh": "足球教练每天训练他们。"
      },
      {
        "q": "I will send _____ a message when I arrive.",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 0,
        "hint": "send 后跟宾格 you",
        "sentence": "I will send you a message when I arrive.",
        "zh": "我到达后会给你发信息。"
      },
      {
        "q": "She invited _____ to her birthday party.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "invited 后跟宾格",
        "sentence": "She invited us to her birthday party.",
        "zh": "她邀请我们参加她的生日聚会。"
      },
      {
        "q": "The teacher praised _____ for his hard work.",
        "opts": [
          "he",
          "him",
          "his"
        ],
        "ans": 1,
        "hint": "praised 后跟宾格",
        "sentence": "The teacher praised him for his hard work.",
        "zh": "老师表扬了他努力学习。"
      },
      {
        "q": "My father often reads stories to _____ at bedtime.",
        "opts": [
          "I",
          "me",
          "my"
        ],
        "ans": 1,
        "hint": "介词 to 后跟宾格",
        "sentence": "My father often reads stories to me at bedtime.",
        "zh": "我爸爸经常在睡前给我读故事。"
      },
      {
        "q": "The students are helping _____ carry her bags.",
        "opts": [
          "she",
          "her",
          "hers"
        ],
        "ans": 1,
        "hint": "helping 后跟宾格",
        "sentence": "The students are helping her carry her bags.",
        "zh": "学生们正在帮她拿包。"
      },
      {
        "q": "The coach asked _____ to practice basketball after school.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "asked 后跟宾格",
        "sentence": "The coach asked us to practice basketball after school.",
        "zh": "教练让我们放学后练习篮球。"
      },
      {
        "q": "I hope to see _____ at the library tomorrow.",
        "opts": [
          "you",
          "your",
          "yours"
        ],
        "ans": 0,
        "hint": "see 后跟宾格 you",
        "sentence": "I hope to see you at the library tomorrow.",
        "zh": "我希望明天在图书馆见到你。"
      },
      {
        "q": "The little boy is waving at _____ from the window.",
        "opts": [
          "we",
          "us",
          "our"
        ],
        "ans": 1,
        "hint": "介词 at 后跟宾格",
        "sentence": "The little boy is waving at us from the window.",
        "zh": "小男孩从窗户向我们挥手。"
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
      "主语 → 主格 I/he/she/we/they",
      "动词/介词后 → 宾格 me/him/her/us/them",
      "between you and me（不是 I）",
      "it's 是 it is；its 是物主。宾格是 it（不变）。"
    ],
    "chant": "Subject — I and he! Object — me and him — you'll see!",
    "chantSpeak": "Subject, I and he! Object, me and him, you will see!",
    "id": "p23"
  }
];
  global.KpData = {
    courseTitle: "宾格代词 me / him / them",
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