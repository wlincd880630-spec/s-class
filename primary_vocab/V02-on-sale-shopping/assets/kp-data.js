(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 促销的可乐",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "Tom bought three bottles of cola because they were on sale.",
    "soundHint": "Tom 为什么买三瓶？听听关键词。",
    "question": "on sale 是什么意思？",
    "sentence": "Tom bought three bottles of cola because they were on sale.",
    "zh": "汤姆买了三瓶可乐，因为它们在促销。",
    "image": "v02-on-sale.jpg",
    "source": "PSLE Set 01 · 完形变式"
  },
  {
    "id": "p02",
    "section": "思考",
    "title": "苏格拉底 · on sale 是什么？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "v02-on-sale.jpg",
    "question": "「on sale」最接近下面哪个意思？",
    "choices": [
      {
        "text": "正在出售（随便卖）",
        "correct": false,
        "fb": "for sale 才是「待售」；on sale 常指「促销/打折」。"
      },
      {
        "text": "促销、特价",
        "correct": true,
        "fb": "对了！on sale = 打折促销，价格更便宜。"
      },
      {
        "text": "卖完了",
        "correct": false,
        "fb": "卖完了是 sold out。"
      }
    ],
    "sentence": "The cola bottles are on sale today.",
    "zh": "可乐今天促销。"
  },
  {
    "id": "p03",
    "section": "发现",
    "title": "对比 · on sale vs go shopping",
    "type": "discover",
    "lead": "两个购物高频表达，意思不同哦。",
    "leftImage": "v02-sale-tag.jpg",
    "rightImage": "v02-go-shopping.jpg",
    "leftLabel": "on sale（促销）",
    "rightLabel": "go shopping（去购物）",
    "leftSentence": "These shoes are on sale.",
    "leftZh": "这双鞋在促销。",
    "rightSentence": "We went shopping last Saturday.",
    "rightZh": "我们上周六去购物了。",
    "morphBase": "on sale",
    "morphPast": "go shopping",
    "morphHighlight": "shopping",
    "discovery": "on sale 描述商品打折；go shopping 表示「去购物」这个活动。"
  },
  {
    "id": "p04",
    "section": "游戏",
    "title": "分类篮 · 哪个搭配？",
    "type": "classify",
    "badge": "demo",
    "badgeText": "🧺 分类",
    "image": "v02-classify.jpg",
    "lead": "句子是在说「促销」还是「去购物」？",
    "buckets": [
      {
        "key": "sale",
        "label": "on sale 促销"
      },
      {
        "key": "shop",
        "label": "go shopping 购物"
      }
    ],
    "items": [
      {
        "text": "The shirts are on sale.",
        "bucket": "sale"
      },
      {
        "text": "Mum went shopping with the kids.",
        "bucket": "shop"
      },
      {
        "text": "Half price — it's on sale!",
        "bucket": "sale"
      },
      {
        "text": "Let's go shopping this afternoon.",
        "bucket": "shop"
      },
      {
        "text": "They were on sale, so Bob bought three.",
        "bucket": "sale"
      },
      {
        "text": "We go shopping at the mall.",
        "bucket": "shop"
      }
    ]
  },
  {
    "id": "p05",
    "section": "精讲",
    "title": "搭配卡 · 购物句型",
    "type": "spelling",
    "image": "v02-phrases.jpg",
    "lead": "日常口语和写作都能用。",
    "rules": [
      {
        "tab": "on sale",
        "rule": "主语 + be + on sale · 表示打折促销",
        "focusVerb": "on sale",
        "examples": [
          {
            "from": "The book is",
            "to": "on sale"
          },
          {
            "from": "They were",
            "to": "on sale yesterday"
          }
        ],
        "sample": "These shoes are on sale — they're half price!",
        "sampleZh": "这双鞋在促销——半价！"
      },
      {
        "tab": "go shopping",
        "rule": "go shopping · went shopping · go shopping for + 物品",
        "focusVerb": "go shopping",
        "examples": [
          {
            "from": "go",
            "to": "go shopping"
          },
          {
            "from": "过去",
            "to": "went shopping"
          },
          {
            "from": "买衣服",
            "to": "go shopping for clothes"
          }
        ],
        "sample": "Mum takes the boys shopping for school things.",
        "sampleZh": "妈妈带男孩们买开学用品。",
        "sampleImage": "v02-mum-shopping.jpg"
      }
    ]
  },
  {
    "id": "p06",
    "section": "闯关",
    "title": "限时快选 · PSLE 语境",
    "type": "quiz",
    "badge": "q",
    "badgeText": "⏱ 快选",
    "image": "v02-on-sale.jpg",
    "q": "Bob bought cola because the bottles were _____.",
    "opts": [
      "for sale",
      "on sale",
      "in sale"
    ],
    "ans": 1,
    "hint": "促销打折用 on sale。",
    "sentence": "Tom bought three bottles of cola because they were on sale.",
    "zh": "汤姆买了三瓶可乐，因为它们在促销。"
  },
  {
    "id": "p07",
    "section": "游戏",
    "title": "听音排序 · 购物句",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🔀 排序",
    "image": "v02-mum-shopping.jpg",
    "audio": "Mum takes the boys shopping for school things.",
    "tokens": [
      "Mum",
      "takes",
      "the",
      "boys",
      "shopping",
      "for",
      "school",
      "things"
    ],
    "sentence": "Mum takes the boys shopping for school things.",
    "zh": "妈妈带男孩们买开学用品。"
  },
  {
    "id": "p08",
    "section": "总结",
    "title": "写作模板 · 购物小对话",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📝 写作",
    "image": "v02-dialogue.jpg",
    "checklist": [
      "促销：The … are on sale. / They were on sale, so I bought…",
      "购物：go shopping / went shopping / go shopping for clothes",
      "地点：shopping centre / mall / shop",
      "对话：—Shall we go shopping? —Great! I hope the shirts are on sale."
    ],
    "chant": "On sale means a lower price! Go shopping — that's nice!",
    "chantSpeak": "On sale means a lower price! Go shopping, that is nice!"
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