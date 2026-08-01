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
    "audio": "This girl is my aunt's daughter — she is my cousin.",
    "soundHint": "先听，不要看文字。",
    "question": "这句话在考什么？",
    "sentence": "This girl is my aunt's daughter — she is my cousin.",
    "zh": "这个女孩是我姑姑的女儿——她是我的表姐/表妹。",
    "image": "w3-fam-hero.jpg",
    "source": "PSLE · 真题变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · 考点在哪？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "w3-fam-hero.jpg",
    "question": "aunt's daughter 英语怎么说？",
    "choices": [
      {
        "text": "cousin（堂/表兄弟姐妹）",
        "correct": true,
        "fb": "对了！aunt's daughter = cousin。"
      },
      {
        "text": "sister",
        "correct": false,
        "fb": "sister 是亲姐妹。"
      },
      {
        "text": "niece",
        "correct": false,
        "fb": "niece 是侄女/外甥女（晚辈）。"
      }
    ],
    "sentence": "This girl is my aunt's daughter — she is my cousin.",
    "zh": "这个女孩是我姑姑的女儿——她是我的表姐/表妹。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "规则发现",
    "type": "discover",
    "leftImage": "w3-fam-aunt.jpg",
    "rightImage": "w3-fam-cousin.jpg",
    "leftLabel": "aunt's daughter",
    "rightLabel": "cousin",
    "leftSentence": "My aunt has a daughter.",
    "leftZh": "我姑姑有一个女儿。",
    "rightSentence": "She is my cousin.",
    "rightZh": "她是我的表姐/表妹。",
    "morphBase": "aunt",
    "morphPast": "cousin",
    "morphHighlight": "",
    "discovery": "uncle/aunt 的子女 → cousin；brother/sister 的子女 → nephew/niece。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "w3-fam-hero.jpg",
    "buckets": [
      {
        "key": "close",
        "label": "父母兄弟姐妹"
      },
      {
        "key": "extend",
        "label": "叔舅姑姨/堂表亲"
      }
    ],
    "items": [
      {
        "text": "mother / father",
        "bucket": "close"
      },
      {
        "text": "cousin",
        "bucket": "extend"
      },
      {
        "text": "brother / sister",
        "bucket": "close"
      },
      {
        "text": "uncle / aunt",
        "bucket": "extend"
      },
      {
        "text": "son / daughter",
        "bucket": "close"
      },
      {
        "text": "nephew / niece",
        "bucket": "extend"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "规则卡",
    "type": "spelling",
    "image": "w3-fam-hero.jpg",
    "lead": "核心家庭词汇。",
    "rules": [
      {
        "tab": "直系亲属",
        "rule": "parents, brother, sister, son, daughter",
        "focusVerb": "parents",
        "examples": [
          {
            "from": "父母",
            "to": "parents"
          }
        ],
        "sample": "I live with my parents.",
        "sampleZh": "我和父母住在一起。"
      },
      {
        "tab": "旁系",
        "rule": "uncle, aunt, cousin, nephew, niece",
        "focusVerb": "cousin",
        "examples": [
          {
            "from": "姑的女儿",
            "to": "cousin"
          }
        ],
        "sample": "This girl is my aunt's daughter — my cousin.",
        "sampleZh": "她是我姑姑的女儿——我的表姐/表妹。"
      }
    ]
  },
  {
    "id": "p06",
    "section": "闯关",
    "title": "限时快选 · PSLE 真题",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "w3-fam-hero.jpg",
    "q": "My aunt's daughter is my _____.",
    "opts": [
      "sister",
      "cousin",
      "niece"
    ],
    "ans": 1,
    "hint": "姑/姨的女儿 = cousin。",
    "sentence": "This girl is my aunt's daughter — she is my cousin.",
    "zh": "这个女孩是我姑姑的女儿——她是我的表姐/表妹。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 造句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "w3-fam-hero.jpg",
    "audio": "She is my cousin.",
    "tokens": [
      "She",
      "is",
      "my",
      "cousin"
    ],
    "sentence": "She is my cousin.",
    "zh": "她是我的表姐/表妹。"
  },
  {
    "id": "p08",
    "section": "总结",
    "title": "写作句框 · 口诀",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "writing.jpg",
    "checklist": [
      "aunt's/uncle's child → cousin",
      "brother's/sister's child → nephew/niece",
      "写作：I visited my grandparents and cousins."
    ],
    "chant": "Aunt's child — cousin! Brother's son — nephew — remember!",
    "chantSpeak": "Aunt's child, cousin! Brother's son, nephew, remember!"
  }
];
  global.KpData = {
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