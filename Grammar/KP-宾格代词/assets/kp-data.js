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
    "id": "p07",
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
    "id": "p08",
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
    "id": "p09"
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
    "image": "w3-obj-hero.jpg",
    "instruction": "对照初中造句操练：点选乱序单词组成正确句子。",
    "tokens": [
      "Please",
      "tell",
      "her",
      "the",
      "good",
      "news"
    ],
    "sentence": "Please tell her the good news.",
    "zh": "请告诉她这个好消息。",
    "id": "p11"
  },
  {
    "id": "p12",
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
    "id": "p13",
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
    "lead": "对齐初中综合测试：全部做完再交卷。",
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
    "image": "w3-obj-hero.jpg",
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
    "image": "w3-obj-hero.jpg",
    "audio": "Please tell her the good news.",
    "opts": [
      "Please tell her the good news.",
      "Please tell she the good news.",
      "Please tell hers the good news."
    ],
    "ans": 0,
    "hint": "先听完整句，再选文字。",
    "sentence": "Please tell her the good news.",
    "zh": "请告诉她这个好消息。",
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
      "主语 → 主格 I/he/she/we/they",
      "动词/介词后 → 宾格 me/him/her/us/them",
      "between you and me（不是 I）",
      "it's 是 it is；its 是物主。宾格是 it（不变）。"
    ],
    "chant": "Subject — I and he! Object — me and him — you'll see!",
    "chantSpeak": "Subject, I and he! Object, me and him, you will see!",
    "id": "p19"
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