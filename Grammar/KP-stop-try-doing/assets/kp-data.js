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
    "id": "p07",
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
    "id": "p08",
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
    "id": "p09"
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
    "image": "w4-stop-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "He",
      "stopped",
      "to",
      "have",
      "a",
      "rest"
    ],
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息了一会儿。",
    "id": "p11"
  },
  {
    "id": "p12",
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
    "id": "p13",
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
    "lead": "对齐初中综合测试：全部做完再交卷。",
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
        "q": "The teacher told us to stop _____ and listen.",
        "opts": [
          "talk",
          "to talk",
          "talking"
        ],
        "ans": 2,
        "hint": "停止讲话 stop talking。",
        "sentence": "The teacher told us to stop talking and listen.",
        "zh": "老师让我们停止讲话并听讲。"
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
        "q": "The teacher told us to stop _____ and listen.",
        "opts": [
          "talk",
          "to talk",
          "talking"
        ],
        "ans": 2,
        "hint": "停止讲话 stop talking。",
        "sentence": "The teacher told us to stop talking and listen.",
        "zh": "老师让我们停止讲话并听讲。"
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
        "q": "The teacher told us to stop _____ and listen.",
        "opts": [
          "talk",
          "to talk",
          "talking"
        ],
        "ans": 2,
        "hint": "停止讲话 stop talking。",
        "sentence": "The teacher told us to stop talking and listen.",
        "zh": "老师让我们停止讲话并听讲。"
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
    "image": "w4-stop-hero.jpg",
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
    "image": "w4-stop-hero.jpg",
    "audio": "He stopped to have a rest.",
    "opts": [
      "He stopped to have a rest.",
      "He stopped having a rest. (means he no longer rested)",
      "He stopped have a rest."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "He stopped to have a rest.",
    "zh": "他停下来休息了一会儿。",
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
      "stop to do = 停下来去做",
      "stop doing = 停止正在做",
      "try to do 努力；try doing 尝试",
      "remember to do 记得要做；remember doing 记得做过。初中可拓展。"
    ],
    "chant": "Stop to do — pause and go! Stop doing — no more, you know!",
    "chantSpeak": "Stop to do, pause and go! Stop doing, no more, you know!",
    "id": "p19"
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