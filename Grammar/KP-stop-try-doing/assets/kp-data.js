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
    "section": "导入",
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
    "section": "构成",
    "title": "构成公式",
    "type": "formula",
    "badge": "demo",
    "badgeText": "📐 公式",
    "image": "w4-stop-hero.jpg",
    "lead": "to do 和 doing 意思不同，必须靠情景判断。",
    "formula": "stop to do = 停下来去做　　stop doing = 停止正在做",
    "parts": [
      {
        "mark": "stop to do",
        "label": "停下来去做另一件事",
        "example": "stopped to have a rest"
      },
      {
        "mark": "stop doing",
        "label": "停止正在做的事",
        "example": "stop talking"
      },
      {
        "mark": "try to do",
        "label": "努力去做",
        "example": "try to finish"
      },
      {
        "mark": "try doing",
        "label": "试着做做看",
        "example": "try restarting"
      }
    ],
    "samples": [
      {
        "sentence": "He stopped to have a rest.",
        "zh": "他停下来休息。"
      },
      {
        "sentence": "The teacher told us to stop talking.",
        "zh": "老师让我们停止讲话。"
      }
    ],
    "id": "p03"
  },
  {
    "id": "p04",
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
    "section": "精讲",
    "title": "例句 · stop to do",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-stop-hero.jpg",
    "lead": "停下正在走的路，去休息。",
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p05"
  },
  {
    "section": "精讲",
    "title": "例句 · stop doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "w4-stop-hero.jpg",
    "lead": "停止 talking 这件事。",
    "sentence": "Stop talking and listen to me.",
    "zh": "别说话，听我说。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p06"
  },
  {
    "section": "精讲",
    "title": "stop to do vs stop doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-playground.png",
    "lead": "stop to do 是“停下来去做另一件事”，stop doing 是“停止正在做的事”。",
    "sentence": "He stopped to have a rest. / He stopped talking.",
    "zh": "他停下来休息。 / 他停止了讲话。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p07"
  },
  {
    "section": "精讲",
    "title": "try to do vs try doing",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-dinner.png",
    "lead": "try to do 是“努力去做”，try doing 是“试着做做看”。",
    "sentence": "I tried to open the window. / Try eating some hotpot.",
    "zh": "我努力去开窗户。 / 试着吃吃火锅。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p08"
  },
  {
    "section": "精讲",
    "title": "易错点：走在路上累了",
    "type": "scene",
    "badge": "image",
    "badgeText": "🖼 例句",
    "image": "kp3d-bus.png",
    "lead": "累了要“停下来休息”，是停下来去做休息这件事，所以用 stop to rest。",
    "sentence": "I was tired, so I stopped to have a rest.",
    "zh": "我累了，所以停下来休息。",
    "source": "课堂精讲 · 对齐初中",
    "id": "p09"
  },
  {
    "id": "p10",
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
    "id": "p11",
    "section": "辨析",
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
    "section": "辨析",
    "title": "易错点 · 苏格拉底",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 易错",
    "image": "w4-stop-hero.jpg",
    "question": "走在路上累了，要「停下来休息」用哪个？",
    "choices": [
      {
        "text": "stop to have a rest",
        "correct": true,
        "fb": "停下来去做 rest。"
      },
      {
        "text": "stop having a rest",
        "correct": false,
        "fb": "那是停止休息=继续赶路。"
      },
      {
        "text": "stop have a rest",
        "correct": false,
        "fb": "缺 to 或 -ing。"
      }
    ],
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息。",
    "id": "p12"
  },
  {
    "section": "转换",
    "title": "句型转换",
    "type": "transform",
    "badge": "demo",
    "badgeText": "🔄 转换",
    "image": "w4-stop-hero.jpg",
    "lead": "根据中文选择 to do 或 doing。",
    "items": [
      {
        "from": "Please stop. Then read the text.",
        "fromZh": "请停下来，然后读课文。",
        "steps": [
          {
            "label": "合成一句",
            "opts": [
              "Please stop to read the text.",
              "Please stop reading the text.",
              "Please stop read the text."
            ],
            "ans": 0,
            "hint": "停下来去做 read。",
            "sentence": "Please stop to read the text.",
            "zh": "请停下来去读课文。"
          }
        ]
      },
      {
        "from": "He stopped to have a rest.",
        "fromZh": "他停下来休息。",
        "steps": [
          {
            "label": "改成“停止正在做的事”",
            "opts": [
              "He stopped having a rest.",
              "He stopped to having a rest.",
              "He stops to have a rest."
            ],
            "ans": 0,
            "hint": "停止正在做的事用doing",
            "sentence": "He stopped having a rest.",
            "zh": "他停止了休息。"
          }
        ]
      },
      {
        "from": "The teacher told us to stop talking.",
        "fromZh": "老师叫我们停止讲话。",
        "steps": [
          {
            "label": "改成“停下来去做另一件事”",
            "opts": [
              "The teacher told us to stop to talk.",
              "The teacher told us to stop talking.",
              "The teacher told us stop to talk."
            ],
            "ans": 0,
            "hint": "停下来去做另一件事用to do",
            "sentence": "The teacher told us to stop to talk.",
            "zh": "老师叫我们停下来去讲话。"
          }
        ]
      },
      {
        "from": "I tried to open the window.",
        "fromZh": "我努力去开窗户。",
        "steps": [
          {
            "label": "改成“试着做做看”",
            "opts": [
              "I tried opening the window.",
              "I tried to opening the window.",
              "I try opening the window."
            ],
            "ans": 0,
            "hint": "试着做做看用doing",
            "sentence": "I tried opening the window.",
            "zh": "我试着开了一下窗户。"
          }
        ]
      },
      {
        "from": "She tried to catch the bus.",
        "fromZh": "她努力去赶公交车。",
        "steps": [
          {
            "label": "改成“试着做做看”",
            "opts": [
              "She tried catching the bus.",
              "She tried to catching the bus.",
              "She tries catching the bus."
            ],
            "ans": 0,
            "hint": "试着做做看用doing",
            "sentence": "She tried catching the bus.",
            "zh": "她试着去赶公交车。"
          }
        ]
      },
      {
        "from": "He stopped to look at the panda.",
        "fromZh": "他停下来看熊猫。",
        "steps": [
          {
            "label": "改成“停止正在做的事”",
            "opts": [
              "He stopped looking at the panda.",
              "He stopped to looking at the panda.",
              "He stops looking at the panda."
            ],
            "ans": 0,
            "hint": "停止正在做的事用doing",
            "sentence": "He stopped looking at the panda.",
            "zh": "他停止了看熊猫。"
          }
        ]
      },
      {
        "from": "Try to speak English every day.",
        "fromZh": "试着每天说英语。",
        "steps": [
          {
            "label": "改成“试着做做看”",
            "opts": [
              "Try speaking English every day.",
              "Try to speaking English every day.",
              "Tries speaking English every day."
            ],
            "ans": 0,
            "hint": "试着做做看用doing",
            "sentence": "Try speaking English every day.",
            "zh": "试着每天说英语看看。"
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
    "image": "kp3d-playground.png",
    "instruction": "连续多句：点选乱序单词组成正确句子。",
    "tokens": [
      "He",
      "stopped",
      "to",
      "have",
      "a",
      "rest"
    ],
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息。",
    "items": [
      {
        "tokens": [
          "He",
          "stopped",
          "to",
          "have",
          "a",
          "rest"
        ],
        "sentence": "He stopped to have a rest.",
        "zh": "他停下来休息。",
        "image": "kp3d-playground.png"
      },
      {
        "tokens": [
          "Please",
          "stop",
          "talking",
          "in",
          "class"
        ],
        "sentence": "Please stop talking in class.",
        "zh": "请不要在课堂上讲话。",
        "image": "kp3d-classroom.png"
      },
      {
        "tokens": [
          "I",
          "tried",
          "to",
          "open",
          "the",
          "window"
        ],
        "sentence": "I tried to open the window.",
        "zh": "我努力去开窗户。",
        "image": "kp3d-window.png"
      },
      {
        "tokens": [
          "Try",
          "eating",
          "some",
          "Chengdu",
          "hotpot"
        ],
        "sentence": "Try eating some Chengdu hotpot.",
        "zh": "试着吃吃成都火锅。",
        "image": "kp3d-dinner.png"
      },
      {
        "tokens": [
          "She",
          "stopped",
          "to",
          "buy",
          "an",
          "umbrella"
        ],
        "sentence": "She stopped to buy an umbrella.",
        "zh": "她停下来买伞。",
        "image": "kp3d-shop.png"
      },
      {
        "tokens": [
          "He",
          "tried",
          "to",
          "catch",
          "the",
          "bus"
        ],
        "sentence": "He tried to catch the bus.",
        "zh": "他努力去赶公交车。",
        "image": "kp3d-bus.png"
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
    "id": "p16",
    "section": "检测",
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
    "section": "检测",
    "title": "综合测试",
    "type": "multi-quiz",
    "badge": "q",
    "badgeText": "📝 综测",
    "image": "w4-stop-hero.jpg",
    "lead": "对齐初中综合测试：本卷 16 题，全部做完再交卷。",
    "questions": [
      {
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
        "q": "I'm tired. Let's stop _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "停下来去休息。",
        "sentence": "Let's stop to have a rest.",
        "zh": "我们停下来休息吧。"
      },
      {
        "q": "If the computer doesn't work, try _____ it.",
        "opts": [
          "restart",
          "restarting",
          "restarted"
        ],
        "ans": 1,
        "hint": "试一试重启 try doing。",
        "sentence": "Try restarting it.",
        "zh": "试着重启它。"
      },
      {
        "q": "He tried _____ the heavy box, but failed.",
        "opts": [
          "to lift",
          "lifting",
          "lift"
        ],
        "ans": 0,
        "hint": "努力去举起 try to do。",
        "sentence": "He tried to lift the heavy box, but failed.",
        "zh": "他努力去搬那个重箱子，但失败了。"
      },
      {
        "q": "She stopped _____ when the teacher came in.",
        "opts": [
          "to write",
          "writing",
          "write"
        ],
        "ans": 1,
        "hint": "停止正在写。",
        "sentence": "She stopped writing when the teacher came in.",
        "zh": "老师进来时她停止了写字。"
      },
      {
        "q": "He was tired, so he _____ to have a rest.",
        "opts": [
          "stopped",
          "stop",
          "stopping"
        ],
        "ans": 0,
        "hint": "累了，停下来去做另一件事",
        "sentence": "He was tired, so he stopped to have a rest.",
        "zh": "他累了，所以停下来休息。"
      },
      {
        "q": "The students _____ talking when the teacher came in.",
        "opts": [
          "stopped",
          "stop",
          "stopping"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The students stopped talking when the teacher came in.",
        "zh": "老师进来时，学生们停止了讲话。"
      },
      {
        "q": "Mom _____ to buy some fruit on the way home.",
        "opts": [
          "stopped",
          "stop",
          "stops"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "Mom stopped to buy some fruit on the way home.",
        "zh": "妈妈在回家路上停下来买水果。"
      },
      {
        "q": "Please _____ making so much noise.",
        "opts": [
          "stop",
          "stopped",
          "stopping"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Please stop making so much noise.",
        "zh": "请停止制造这么多噪音。"
      },
      {
        "q": "I _____ to open the door, but it was locked.",
        "opts": [
          "tried",
          "try",
          "trying"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "I tried to open the door, but it was locked.",
        "zh": "我努力去开门，但门锁着。"
      },
      {
        "q": "Why not _____ eating some Sichuan food?",
        "opts": [
          "try",
          "tried",
          "trying"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Why not try eating some Sichuan food?",
        "zh": "为什么不试着吃吃四川菜呢？"
      },
      {
        "q": "The bus stopped _____ passengers.",
        "opts": [
          "to pick up",
          "picking up",
          "pick up"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "The bus stopped to pick up passengers.",
        "zh": "公交车停下来接乘客。"
      },
      {
        "q": "He stopped _____ TV and went to bed.",
        "opts": [
          "watching",
          "to watch",
          "watch"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "He stopped watching TV and went to bed.",
        "zh": "他停止看电视去睡觉了。"
      },
      {
        "q": "She tried _____ the heavy box.",
        "opts": [
          "to lift",
          "lifting",
          "lift"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "She tried to lift the heavy box.",
        "zh": "她努力去搬那个重箱子。"
      },
      {
        "q": "Try _____ the window; it's hot here.",
        "opts": [
          "opening",
          "to open",
          "open"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try opening the window; it's hot here.",
        "zh": "试着开开窗户，这里很热。"
      },
      {
        "q": "The doctor said, 'You must stop _____.'",
        "opts": [
          "smoking",
          "to smoke",
          "smoke"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The doctor said, 'You must stop smoking.'",
        "zh": "医生说：“你必须戒烟。”"
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
        "q": "I'm tired. Let's stop _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "停下来去休息。",
        "sentence": "Let's stop to have a rest.",
        "zh": "我们停下来休息吧。"
      },
      {
        "q": "If the computer doesn't work, try _____ it.",
        "opts": [
          "restart",
          "restarting",
          "restarted"
        ],
        "ans": 1,
        "hint": "试一试重启 try doing。",
        "sentence": "Try restarting it.",
        "zh": "试着重启它。"
      },
      {
        "q": "He tried _____ the heavy box, but failed.",
        "opts": [
          "to lift",
          "lifting",
          "lift"
        ],
        "ans": 0,
        "hint": "努力去举起 try to do。",
        "sentence": "He tried to lift the heavy box, but failed.",
        "zh": "他努力去搬那个重箱子，但失败了。"
      },
      {
        "q": "She stopped _____ when the teacher came in.",
        "opts": [
          "to write",
          "writing",
          "write"
        ],
        "ans": 1,
        "hint": "停止正在写。",
        "sentence": "She stopped writing when the teacher came in.",
        "zh": "老师进来时她停止了写字。"
      },
      {
        "q": "He was tired, so he _____ to have a rest.",
        "opts": [
          "stopped",
          "stop",
          "stopping"
        ],
        "ans": 0,
        "hint": "累了，停下来去做另一件事",
        "sentence": "He was tired, so he stopped to have a rest.",
        "zh": "他累了，所以停下来休息。"
      },
      {
        "q": "The students _____ talking when the teacher came in.",
        "opts": [
          "stopped",
          "stop",
          "stopping"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The students stopped talking when the teacher came in.",
        "zh": "老师进来时，学生们停止了讲话。"
      },
      {
        "q": "Mom _____ to buy some fruit on the way home.",
        "opts": [
          "stopped",
          "stop",
          "stops"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "Mom stopped to buy some fruit on the way home.",
        "zh": "妈妈在回家路上停下来买水果。"
      },
      {
        "q": "Please _____ making so much noise.",
        "opts": [
          "stop",
          "stopped",
          "stopping"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Please stop making so much noise.",
        "zh": "请停止制造这么多噪音。"
      },
      {
        "q": "I _____ to open the door, but it was locked.",
        "opts": [
          "tried",
          "try",
          "trying"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "I tried to open the door, but it was locked.",
        "zh": "我努力去开门，但门锁着。"
      },
      {
        "q": "Why not _____ eating some Sichuan food?",
        "opts": [
          "try",
          "tried",
          "trying"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Why not try eating some Sichuan food?",
        "zh": "为什么不试着吃吃四川菜呢？"
      },
      {
        "q": "The bus stopped _____ passengers.",
        "opts": [
          "to pick up",
          "picking up",
          "pick up"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "The bus stopped to pick up passengers.",
        "zh": "公交车停下来接乘客。"
      },
      {
        "q": "He stopped _____ TV and went to bed.",
        "opts": [
          "watching",
          "to watch",
          "watch"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "He stopped watching TV and went to bed.",
        "zh": "他停止看电视去睡觉了。"
      },
      {
        "q": "She tried _____ the heavy box.",
        "opts": [
          "to lift",
          "lifting",
          "lift"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "She tried to lift the heavy box.",
        "zh": "她努力去搬那个重箱子。"
      },
      {
        "q": "Try _____ the window; it's hot here.",
        "opts": [
          "opening",
          "to open",
          "open"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try opening the window; it's hot here.",
        "zh": "试着开开窗户，这里很热。"
      },
      {
        "q": "The doctor said, 'You must stop _____.'",
        "opts": [
          "smoking",
          "to smoke",
          "smoke"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The doctor said, 'You must stop smoking.'",
        "zh": "医生说：“你必须戒烟。”"
      },
      {
        "q": "We stopped _____ at the panda house.",
        "opts": [
          "to look",
          "looking",
          "look"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "We stopped to look at the panda house.",
        "zh": "我们停下来看熊猫馆。"
      },
      {
        "q": "He tried _____ the ball, but it was too high.",
        "opts": [
          "to catch",
          "catching",
          "catch"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "He tried to catch the ball, but it was too high.",
        "zh": "他努力去接球，但球太高了。"
      },
      {
        "q": "Stop _____ in the library, please.",
        "opts": [
          "talking",
          "to talk",
          "talk"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Stop talking in the library, please.",
        "zh": "请不要在图书馆里讲话。"
      },
      {
        "q": "I stopped _____ a rest under the tree.",
        "opts": [
          "to have",
          "having",
          "have"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "I stopped to have a rest under the tree.",
        "zh": "我在树下停下来休息。"
      },
      {
        "q": "Try _____ this problem in a different way.",
        "opts": [
          "to solve",
          "solving",
          "solve"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "Try to solve this problem in a different way.",
        "zh": "试着用不同的方法解决这个问题。"
      },
      {
        "q": "The children stopped _____ when they saw the teacher.",
        "opts": [
          "playing",
          "to play",
          "play"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The children stopped playing when they saw the teacher.",
        "zh": "孩子们看到老师时停止了玩耍。"
      },
      {
        "q": "She stopped _____ a drink at the shop.",
        "opts": [
          "to buy",
          "buying",
          "buy"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "She stopped to buy a drink at the shop.",
        "zh": "她在商店停下来买饮料。"
      },
      {
        "q": "He tried _____ the bus, but it was too late.",
        "opts": [
          "to catch",
          "catching",
          "catch"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "He tried to catch the bus, but it was too late.",
        "zh": "他努力去赶公交车，但太晚了。"
      },
      {
        "q": "Try _____ some milk; it's good for you.",
        "opts": [
          "drinking",
          "to drink",
          "drink"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try drinking some milk; it's good for you.",
        "zh": "试着喝点牛奶，对你有好处。"
      },
      {
        "q": "Please stop _____ at me like that.",
        "opts": [
          "shouting",
          "to shout",
          "shout"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Please stop shouting at me like that.",
        "zh": "请不要那样对我喊叫。"
      },
      {
        "q": "The man stopped _____ the street when the light was red.",
        "opts": [
          "crossing",
          "to cross",
          "cross"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The man stopped crossing the street when the light was red.",
        "zh": "红灯时那人停止了过马路。"
      },
      {
        "q": "I tried _____ the piano, but it was too difficult.",
        "opts": [
          "to play",
          "playing",
          "play"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "I tried to play the piano, but it was too difficult.",
        "zh": "我努力去弹钢琴，但太难了。"
      },
      {
        "q": "Try _____ the umbrella; it's raining.",
        "opts": [
          "using",
          "to use",
          "use"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try using the umbrella; it's raining.",
        "zh": "试着用一下伞，下雨了。"
      },
      {
        "q": "He stopped _____ the beautiful sunset.",
        "opts": [
          "to watch",
          "watching",
          "watch"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "He stopped to watch the beautiful sunset.",
        "zh": "他停下来看美丽的日落。"
      },
      {
        "q": "Stop _____ about the test; you'll be fine.",
        "opts": [
          "worrying",
          "to worry",
          "worry"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Stop worrying about the test; you'll be fine.",
        "zh": "别再为考试担心了，你会没事的。"
      },
      {
        "q": "She tried _____ the window, but it was stuck.",
        "opts": [
          "to open",
          "opening",
          "open"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "She tried to open the window, but it was stuck.",
        "zh": "她努力去开窗户，但卡住了。"
      },
      {
        "q": "Try _____ the new words with a friend.",
        "opts": [
          "practicing",
          "to practice",
          "practice"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try practicing the new words with a friend.",
        "zh": "试着和朋友一起练习新单词。"
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
        "q": "I'm tired. Let's stop _____ a rest.",
        "opts": [
          "having",
          "to have",
          "have"
        ],
        "ans": 1,
        "hint": "停下来去休息。",
        "sentence": "Let's stop to have a rest.",
        "zh": "我们停下来休息吧。"
      },
      {
        "q": "If the computer doesn't work, try _____ it.",
        "opts": [
          "restart",
          "restarting",
          "restarted"
        ],
        "ans": 1,
        "hint": "试一试重启 try doing。",
        "sentence": "Try restarting it.",
        "zh": "试着重启它。"
      },
      {
        "q": "He tried _____ the heavy box, but failed.",
        "opts": [
          "to lift",
          "lifting",
          "lift"
        ],
        "ans": 0,
        "hint": "努力去举起 try to do。",
        "sentence": "He tried to lift the heavy box, but failed.",
        "zh": "他努力去搬那个重箱子，但失败了。"
      },
      {
        "q": "She stopped _____ when the teacher came in.",
        "opts": [
          "to write",
          "writing",
          "write"
        ],
        "ans": 1,
        "hint": "停止正在写。",
        "sentence": "She stopped writing when the teacher came in.",
        "zh": "老师进来时她停止了写字。"
      },
      {
        "q": "He was tired, so he _____ to have a rest.",
        "opts": [
          "stopped",
          "stop",
          "stopping"
        ],
        "ans": 0,
        "hint": "累了，停下来去做另一件事",
        "sentence": "He was tired, so he stopped to have a rest.",
        "zh": "他累了，所以停下来休息。"
      },
      {
        "q": "The students _____ talking when the teacher came in.",
        "opts": [
          "stopped",
          "stop",
          "stopping"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The students stopped talking when the teacher came in.",
        "zh": "老师进来时，学生们停止了讲话。"
      },
      {
        "q": "Mom _____ to buy some fruit on the way home.",
        "opts": [
          "stopped",
          "stop",
          "stops"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "Mom stopped to buy some fruit on the way home.",
        "zh": "妈妈在回家路上停下来买水果。"
      },
      {
        "q": "Please _____ making so much noise.",
        "opts": [
          "stop",
          "stopped",
          "stopping"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Please stop making so much noise.",
        "zh": "请停止制造这么多噪音。"
      },
      {
        "q": "I _____ to open the door, but it was locked.",
        "opts": [
          "tried",
          "try",
          "trying"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "I tried to open the door, but it was locked.",
        "zh": "我努力去开门，但门锁着。"
      },
      {
        "q": "Why not _____ eating some Sichuan food?",
        "opts": [
          "try",
          "tried",
          "trying"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Why not try eating some Sichuan food?",
        "zh": "为什么不试着吃吃四川菜呢？"
      },
      {
        "q": "The bus stopped _____ passengers.",
        "opts": [
          "to pick up",
          "picking up",
          "pick up"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "The bus stopped to pick up passengers.",
        "zh": "公交车停下来接乘客。"
      },
      {
        "q": "He stopped _____ TV and went to bed.",
        "opts": [
          "watching",
          "to watch",
          "watch"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "He stopped watching TV and went to bed.",
        "zh": "他停止看电视去睡觉了。"
      },
      {
        "q": "She tried _____ the heavy box.",
        "opts": [
          "to lift",
          "lifting",
          "lift"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "She tried to lift the heavy box.",
        "zh": "她努力去搬那个重箱子。"
      },
      {
        "q": "Try _____ the window; it's hot here.",
        "opts": [
          "opening",
          "to open",
          "open"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try opening the window; it's hot here.",
        "zh": "试着开开窗户，这里很热。"
      },
      {
        "q": "The doctor said, 'You must stop _____.'",
        "opts": [
          "smoking",
          "to smoke",
          "smoke"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The doctor said, 'You must stop smoking.'",
        "zh": "医生说：“你必须戒烟。”"
      },
      {
        "q": "We stopped _____ at the panda house.",
        "opts": [
          "to look",
          "looking",
          "look"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "We stopped to look at the panda house.",
        "zh": "我们停下来看熊猫馆。"
      },
      {
        "q": "He tried _____ the ball, but it was too high.",
        "opts": [
          "to catch",
          "catching",
          "catch"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "He tried to catch the ball, but it was too high.",
        "zh": "他努力去接球，但球太高了。"
      },
      {
        "q": "Stop _____ in the library, please.",
        "opts": [
          "talking",
          "to talk",
          "talk"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Stop talking in the library, please.",
        "zh": "请不要在图书馆里讲话。"
      },
      {
        "q": "I stopped _____ a rest under the tree.",
        "opts": [
          "to have",
          "having",
          "have"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "I stopped to have a rest under the tree.",
        "zh": "我在树下停下来休息。"
      },
      {
        "q": "Try _____ this problem in a different way.",
        "opts": [
          "to solve",
          "solving",
          "solve"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "Try to solve this problem in a different way.",
        "zh": "试着用不同的方法解决这个问题。"
      },
      {
        "q": "The children stopped _____ when they saw the teacher.",
        "opts": [
          "playing",
          "to play",
          "play"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The children stopped playing when they saw the teacher.",
        "zh": "孩子们看到老师时停止了玩耍。"
      },
      {
        "q": "She stopped _____ a drink at the shop.",
        "opts": [
          "to buy",
          "buying",
          "buy"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "She stopped to buy a drink at the shop.",
        "zh": "她在商店停下来买饮料。"
      },
      {
        "q": "He tried _____ the bus, but it was too late.",
        "opts": [
          "to catch",
          "catching",
          "catch"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "He tried to catch the bus, but it was too late.",
        "zh": "他努力去赶公交车，但太晚了。"
      },
      {
        "q": "Try _____ some milk; it's good for you.",
        "opts": [
          "drinking",
          "to drink",
          "drink"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try drinking some milk; it's good for you.",
        "zh": "试着喝点牛奶，对你有好处。"
      },
      {
        "q": "Please stop _____ at me like that.",
        "opts": [
          "shouting",
          "to shout",
          "shout"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Please stop shouting at me like that.",
        "zh": "请不要那样对我喊叫。"
      },
      {
        "q": "The man stopped _____ the street when the light was red.",
        "opts": [
          "crossing",
          "to cross",
          "cross"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The man stopped crossing the street when the light was red.",
        "zh": "红灯时那人停止了过马路。"
      },
      {
        "q": "I tried _____ the piano, but it was too difficult.",
        "opts": [
          "to play",
          "playing",
          "play"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "I tried to play the piano, but it was too difficult.",
        "zh": "我努力去弹钢琴，但太难了。"
      },
      {
        "q": "Try _____ the umbrella; it's raining.",
        "opts": [
          "using",
          "to use",
          "use"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try using the umbrella; it's raining.",
        "zh": "试着用一下伞，下雨了。"
      },
      {
        "q": "He stopped _____ the beautiful sunset.",
        "opts": [
          "to watch",
          "watching",
          "watch"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "He stopped to watch the beautiful sunset.",
        "zh": "他停下来看美丽的日落。"
      },
      {
        "q": "Stop _____ about the test; you'll be fine.",
        "opts": [
          "worrying",
          "to worry",
          "worry"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Stop worrying about the test; you'll be fine.",
        "zh": "别再为考试担心了，你会没事的。"
      },
      {
        "q": "She tried _____ the window, but it was stuck.",
        "opts": [
          "to open",
          "opening",
          "open"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "She tried to open the window, but it was stuck.",
        "zh": "她努力去开窗户，但卡住了。"
      },
      {
        "q": "Try _____ the new words with a friend.",
        "opts": [
          "practicing",
          "to practice",
          "practice"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try practicing the new words with a friend.",
        "zh": "试着和朋友一起练习新单词。"
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
    "image": "w4-stop-hero.jpg",
    "pool": "matchPairs",
    "pairs": [
      {
        "en": "stop to do",
        "zh": "停下来去做"
      },
      {
        "en": "stop doing",
        "zh": "停止正在做"
      },
      {
        "en": "try to do",
        "zh": "努力去做"
      },
      {
        "en": "try doing",
        "zh": "试着做做看"
      },
      {
        "en": "stop to rest",
        "zh": "停下来休息"
      },
      {
        "en": "stop talking",
        "zh": "停止讲话"
      },
      {
        "en": "try to run fast",
        "zh": "努力跑快"
      },
      {
        "en": "try eating hotpot",
        "zh": "试着吃火锅"
      },
      {
        "en": "stop to buy fruit",
        "zh": "停下来买水果"
      },
      {
        "en": "stop playing",
        "zh": "停止玩耍"
      },
      {
        "en": "try to help",
        "zh": "努力帮忙"
      },
      {
        "en": "try opening the door",
        "zh": "试着开门"
      },
      {
        "en": "stop to watch TV",
        "zh": "停下来看电视"
      },
      {
        "en": "try to learn English",
        "zh": "努力学英语"
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
    "image": "w4-stop-hero.jpg",
    "audio": "He stopped to have a rest.",
    "opts": [
      "He stopped to have a rest.",
      "He stopped having a rest.",
      "He stops to have a rest."
    ],
    "ans": 0,
    "hint": "停下来去做另一件事",
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息。",
    "questions": [
      {
        "audio": "He stopped to have a rest.",
        "opts": [
          "He stopped to have a rest.",
          "He stopped having a rest.",
          "He stops to have a rest."
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "zh": "他停下来休息。",
        "sentence": "He stopped to have a rest."
      },
      {
        "audio": "The teacher told us to stop talking.",
        "opts": [
          "The teacher told us to stop talking.",
          "The teacher told us to stop to talk.",
          "The teacher told us stop talking."
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "zh": "老师叫我们停止讲话。",
        "sentence": "The teacher told us to stop talking."
      },
      {
        "audio": "I tried to open the window.",
        "opts": [
          "I tried to open the window.",
          "I tried opening the window.",
          "I try to open the window."
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "zh": "我努力去开窗户。",
        "sentence": "I tried to open the window."
      },
      {
        "audio": "Try eating some hotpot in Chengdu.",
        "opts": [
          "Try eating some hotpot in Chengdu.",
          "Try to eat some hotpot in Chengdu.",
          "Tries eating some hotpot in Chengdu."
        ],
        "ans": 0,
        "hint": "试着做做看",
        "zh": "试着在成都吃火锅。",
        "sentence": "Try eating some hotpot in Chengdu."
      },
      {
        "audio": "She stopped to buy an umbrella.",
        "opts": [
          "She stopped to buy an umbrella.",
          "She stopped buying an umbrella.",
          "She stops to buy an umbrella."
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "zh": "她停下来买伞。",
        "sentence": "She stopped to buy an umbrella."
      },
      {
        "audio": "He tried to catch the bus.",
        "opts": [
          "He tried to catch the bus.",
          "He tried catching the bus.",
          "He tries to catch the bus."
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "zh": "他努力去赶公交车。",
        "sentence": "He tried to catch the bus."
      },
      {
        "audio": "Stop playing in the library.",
        "opts": [
          "Stop playing in the library.",
          "Stop to play in the library.",
          "Stops playing in the library."
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "zh": "不要在图书馆里玩耍。",
        "sentence": "Stop playing in the library."
      },
      {
        "audio": "Try to speak English every day.",
        "opts": [
          "Try to speak English every day.",
          "Try speaking English every day.",
          "Tries to speak English every day."
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "zh": "试着每天说英语。",
        "sentence": "Try to speak English every day."
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
    "image": "w4-stop-hero.jpg",
    "lead": "日常 / 考点 / 写作分类例句，点喇叭跟读，点蓝色单词可查词典。",
    "examples": [
      {
        "en": "He stopped to have a rest.",
        "zh": "他停下来休息一下。",
        "tag": "daily_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "The teacher told us to stop talking.",
        "zh": "老师叫我们停止讲话。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "Mom stopped to buy some apples.",
        "zh": "妈妈停下来买一些苹果。",
        "tag": "daily_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "Please stop running in the hall.",
        "zh": "请不要在走廊里跑。",
        "tag": "daily_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I tried to open the window.",
        "zh": "我努力去打开窗户。",
        "tag": "daily_use",
        "scene": "window",
        "image": "kp3d-window.png"
      },
      {
        "en": "Try eating some hotpot in Chengdu.",
        "zh": "在成都试着吃吃火锅吧。",
        "tag": "daily_use",
        "scene": "dinner",
        "image": "kp3d-dinner.png"
      },
      {
        "en": "He stopped to look at the panda.",
        "zh": "他停下来看熊猫。",
        "tag": "daily_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "She tried to catch the bus.",
        "zh": "她努力去赶公交车。",
        "tag": "daily_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Stop playing games and do your homework.",
        "zh": "停止玩游戏，去做作业。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "They tried to finish the work on time.",
        "zh": "他们努力按时完成工作。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "The doctor told him to stop smoking.",
        "zh": "医生叫他戒烟。",
        "tag": "exam_use",
        "scene": "doctor",
        "image": "kp3d-doctor.png"
      },
      {
        "en": "I stopped to ask the way.",
        "zh": "我停下来问路。",
        "tag": "exam_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "Try to remember the new words.",
        "zh": "努力记住新单词。",
        "tag": "exam_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "He tried to climb the tree.",
        "zh": "他努力爬树。",
        "tag": "exam_use",
        "scene": "playground",
        "image": "kp3d-playground.png"
      },
      {
        "en": "Stop making noise in the library.",
        "zh": "不要在图书馆里吵闹。",
        "tag": "exam_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "She stopped to take a photo of the panda.",
        "zh": "她停下来给熊猫拍照。",
        "tag": "exam_use",
        "scene": "panda",
        "image": "kp3d-panda.png"
      },
      {
        "en": "Try to speak English every day.",
        "zh": "试着每天说英语。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "He stopped to listen to the music.",
        "zh": "他停下来听音乐。",
        "tag": "writing_use",
        "scene": "piano",
        "image": "kp3d-piano.png"
      },
      {
        "en": "Stop worrying about the test.",
        "zh": "不要再为考试担心了。",
        "tag": "writing_use",
        "scene": "classroom",
        "image": "kp3d-classroom.png"
      },
      {
        "en": "I tried to help the old man.",
        "zh": "我努力帮助那位老人。",
        "tag": "writing_use",
        "scene": "bus",
        "image": "kp3d-bus.png"
      },
      {
        "en": "She stopped to buy an umbrella.",
        "zh": "她停下来买一把伞。",
        "tag": "writing_use",
        "scene": "shop",
        "image": "kp3d-shop.png"
      },
      {
        "en": "Try to be quiet in the library.",
        "zh": "试着在图书馆里保持安静。",
        "tag": "writing_use",
        "scene": "library",
        "image": "kp3d-library.png"
      },
      {
        "en": "He stopped to watch the basketball game.",
        "zh": "他停下来看篮球比赛。",
        "tag": "writing_use",
        "scene": "basketball",
        "image": "kp3d-basketball.png"
      },
      {
        "en": "Try doing some exercise every morning.",
        "zh": "试着每天早上做点锻炼。",
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
    "image": "w4-stop-hero.jpg",
    "lead": "换一批题目再练，做熟为止。",
    "questions": [
      {
        "q": "We stopped _____ at the panda house.",
        "opts": [
          "to look",
          "looking",
          "look"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "We stopped to look at the panda house.",
        "zh": "我们停下来看熊猫馆。"
      },
      {
        "q": "He tried _____ the ball, but it was too high.",
        "opts": [
          "to catch",
          "catching",
          "catch"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "He tried to catch the ball, but it was too high.",
        "zh": "他努力去接球，但球太高了。"
      },
      {
        "q": "Stop _____ in the library, please.",
        "opts": [
          "talking",
          "to talk",
          "talk"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Stop talking in the library, please.",
        "zh": "请不要在图书馆里讲话。"
      },
      {
        "q": "I stopped _____ a rest under the tree.",
        "opts": [
          "to have",
          "having",
          "have"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "I stopped to have a rest under the tree.",
        "zh": "我在树下停下来休息。"
      },
      {
        "q": "Try _____ this problem in a different way.",
        "opts": [
          "to solve",
          "solving",
          "solve"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "Try to solve this problem in a different way.",
        "zh": "试着用不同的方法解决这个问题。"
      },
      {
        "q": "The children stopped _____ when they saw the teacher.",
        "opts": [
          "playing",
          "to play",
          "play"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The children stopped playing when they saw the teacher.",
        "zh": "孩子们看到老师时停止了玩耍。"
      },
      {
        "q": "She stopped _____ a drink at the shop.",
        "opts": [
          "to buy",
          "buying",
          "buy"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "She stopped to buy a drink at the shop.",
        "zh": "她在商店停下来买饮料。"
      },
      {
        "q": "He tried _____ the bus, but it was too late.",
        "opts": [
          "to catch",
          "catching",
          "catch"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "He tried to catch the bus, but it was too late.",
        "zh": "他努力去赶公交车，但太晚了。"
      },
      {
        "q": "Try _____ some milk; it's good for you.",
        "opts": [
          "drinking",
          "to drink",
          "drink"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try drinking some milk; it's good for you.",
        "zh": "试着喝点牛奶，对你有好处。"
      },
      {
        "q": "Please stop _____ at me like that.",
        "opts": [
          "shouting",
          "to shout",
          "shout"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Please stop shouting at me like that.",
        "zh": "请不要那样对我喊叫。"
      },
      {
        "q": "The man stopped _____ the street when the light was red.",
        "opts": [
          "crossing",
          "to cross",
          "cross"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "The man stopped crossing the street when the light was red.",
        "zh": "红灯时那人停止了过马路。"
      },
      {
        "q": "I tried _____ the piano, but it was too difficult.",
        "opts": [
          "to play",
          "playing",
          "play"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "I tried to play the piano, but it was too difficult.",
        "zh": "我努力去弹钢琴，但太难了。"
      },
      {
        "q": "Try _____ the umbrella; it's raining.",
        "opts": [
          "using",
          "to use",
          "use"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try using the umbrella; it's raining.",
        "zh": "试着用一下伞，下雨了。"
      },
      {
        "q": "He stopped _____ the beautiful sunset.",
        "opts": [
          "to watch",
          "watching",
          "watch"
        ],
        "ans": 0,
        "hint": "停下来去做另一件事",
        "sentence": "He stopped to watch the beautiful sunset.",
        "zh": "他停下来看美丽的日落。"
      },
      {
        "q": "Stop _____ about the test; you'll be fine.",
        "opts": [
          "worrying",
          "to worry",
          "worry"
        ],
        "ans": 0,
        "hint": "停止正在做的事",
        "sentence": "Stop worrying about the test; you'll be fine.",
        "zh": "别再为考试担心了，你会没事的。"
      },
      {
        "q": "She tried _____ the window, but it was stuck.",
        "opts": [
          "to open",
          "opening",
          "open"
        ],
        "ans": 0,
        "hint": "努力去做某事",
        "sentence": "She tried to open the window, but it was stuck.",
        "zh": "她努力去开窗户，但卡住了。"
      },
      {
        "q": "Try _____ the new words with a friend.",
        "opts": [
          "practicing",
          "to practice",
          "practice"
        ],
        "ans": 0,
        "hint": "试着做做看",
        "sentence": "Try practicing the new words with a friend.",
        "zh": "试着和朋友一起练习新单词。"
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
      "stop to do = 停下来去做",
      "stop doing = 停止正在做",
      "try to do 努力；try doing 尝试",
      "remember to do 记得要做；remember doing 记得做过。初中可拓展。"
    ],
    "chant": "Stop to do — pause and go! Stop doing — no more, you know!",
    "chantSpeak": "Stop to do, pause and go! Stop doing, no more, you know!",
    "id": "p24"
  }
];
  global.KpData = {
    courseTitle: "stop / try + to do / doing",
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