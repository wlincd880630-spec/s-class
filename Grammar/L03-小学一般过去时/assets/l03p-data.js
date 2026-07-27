(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 昨天的故事",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "Lily was at school yesterday. Han Lin visited the museum with his family last Sunday.",
    "soundHint": "先听，不要看文字。听完再点「显示」。这些事发生在什么时候？",
    "question": "这些句子说的是现在，还是过去？",
    "image": "l03p-scene-lily-was-at-school-yesterday.jpg",
    "sentence": "Lily was at school yesterday.",
    "zh": "莉莉昨天在学校。",
    "source": "DeepSeek · 导入"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 昨天还是每天？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l03p-past-vs-present.jpg",
    "question": "「Lily was at school yesterday.」说的是什么时候？",
    "choices": [
      {
        "text": "现在正在发生",
        "correct": false,
        "fb": "正在发生要用现在进行时。"
      },
      {
        "text": "过去某一时间发生的事",
        "correct": true,
        "fb": "对了！yesterday / last… / ago → 一般过去时！"
      },
      {
        "text": "每天经常发生",
        "correct": false,
        "fb": "每天经常发生才用一般现在时。"
      }
    ],
    "sentence": "Lily was at school yesterday.",
    "zh": "莉莉昨天在学校。",
    "source": "5GA"
  },
  {
    "id": "p03",
    "section": "时间标志",
    "title": "时间小侦探 · 过去标志词",
    "type": "scene",
    "badge": "demo",
    "badgeText": "🕒 时间",
    "image": "l03p-scene-lily-was-at-school-yesterday.jpg",
    "lead": "看见 yesterday / last week / … ago，优先想一般过去时！",
    "sentence": "Lily was at school yesterday.",
    "zh": "莉莉昨天在学校。",
    "source": "5GA"
  },
  {
    "id": "p04",
    "section": "时间标志",
    "title": "分类游戏 · 过去 vs 现在",
    "type": "classify",
    "badge": "ask",
    "badgeText": "🧺 分类",
    "image": "l03p-past-vs-present.jpg",
    "lead": "把句子放进正确的篮子",
    "buckets": [
      {
        "key": "past",
        "label": "⏪ 一般过去时"
      },
      {
        "key": "present",
        "label": "🔁 一般现在时"
      }
    ],
    "items": [
      {
        "text": "Lily visited the zoo yesterday.",
        "bucket": "past",
        "hint": "yesterday",
        "zh": "莉莉昨天参观了动物园。"
      },
      {
        "text": "Tom plays football every day.",
        "bucket": "present",
        "hint": "every day",
        "zh": "汤姆每天踢足球。"
      },
      {
        "text": "Emma watched a film at home.",
        "bucket": "past",
        "hint": "watched",
        "zh": "艾玛在家看了一部电影。"
      },
      {
        "text": "Jack goes to school by bus.",
        "bucket": "present",
        "hint": "goes",
        "zh": "杰克乘公交车上学。"
      },
      {
        "text": "Chen Tao walked to school last Monday.",
        "bucket": "past",
        "hint": "last Monday",
        "zh": "陈涛上周一走路上学。"
      },
      {
        "text": "Miss Li teaches English every morning.",
        "bucket": "present",
        "hint": "every morning",
        "zh": "李老师每天早上教英语。"
      },
      {
        "text": "Mr Wang cooked dinner for his family.",
        "bucket": "past",
        "hint": "cooked",
        "zh": "王老师为家人做了晚餐。"
      },
      {
        "text": "Teng Fei climbs the hill every weekend.",
        "bucket": "present",
        "hint": "every weekend",
        "zh": "腾飞每个周末爬山。"
      }
    ]
  },
  {
    "id": "p05",
    "section": "was / were",
    "title": "was · 单数过去",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 was",
    "image": "l03p-scene-lily-was-at-school-yesterday.jpg",
    "lead": "I / He / She / It / 人名 / 单数 → was",
    "sentence": "Lily was at school yesterday.",
    "zh": "莉莉昨天在学校。",
    "verbType": "state",
    "source": "5GA"
  },
  {
    "id": "p06",
    "section": "was / were",
    "title": "were · 复数过去",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 were",
    "image": "l03p-scene-tom-and-emma-were-in-the-park-last-weekend.jpg",
    "lead": "You / We / They / 复数 → were",
    "sentence": "Tom and Emma were in the park last weekend.",
    "zh": "汤姆和艾玛上周末在公园里。",
    "verbType": "state",
    "source": "5GA"
  },
  {
    "id": "p07",
    "section": "was / were",
    "title": "例句 · was 再练",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 was",
    "image": "l03p-scene-jack-was-happy-because-he-got-a-gift.jpg",
    "lead": "人名 / 单数事物用 was",
    "sentence": "Jack was happy because he got a gift.",
    "zh": "杰克很开心因为他收到了礼物。",
    "verbType": "state",
    "source": "5GA"
  },
  {
    "id": "p08",
    "section": "was / were",
    "title": "例句 · were 再练",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 were",
    "image": "l03p-scene-chen-tao-and-teng-fei-were-classmates-three-year.jpg",
    "lead": "两个人或复数用 were",
    "sentence": "Chen Tao and Teng Fei were classmates three years ago.",
    "zh": "陈涛和腾飞三年前是同班同学。",
    "verbType": "state",
    "source": "6GA"
  },
  {
    "id": "p09",
    "section": "was / were",
    "title": "was / were 配对",
    "type": "be-match",
    "badge": "demo",
    "badgeText": "🔗 配对",
    "image": "l03p-was-were-chart.jpg",
    "lead": "记住：I/He/She/It → was；You/We/They → were",
    "chart": [
      {
        "subjects": "I / He / She / It / 人名 / 单数",
        "be": "was"
      },
      {
        "subjects": "You / We / They / 复数",
        "be": "were"
      },
      {
        "subjects": "否定",
        "be": "wasn't / weren't"
      }
    ],
    "beOpts": [
      "was",
      "were",
      "is"
    ],
    "drill": [
      {
        "subject": "Lily",
        "ans": "was",
        "sentence": "Lily was very happy yesterday.",
        "zh": "莉莉昨天很高兴。"
      },
      {
        "subject": "Tom",
        "ans": "were",
        "sentence": "Tom and Jack were at school last Monday.",
        "zh": "汤姆和杰克上周一在学校。"
      },
      {
        "subject": "There",
        "ans": "was",
        "sentence": "There was a big tree in the park before.",
        "zh": "以前公园里有一棵大树。"
      },
      {
        "subject": "Emma",
        "ans": "was",
        "sentence": "Emma was not at home last night.",
        "zh": "艾玛昨晚不在家。"
      },
      {
        "subject": "The",
        "ans": "were",
        "sentence": "The children were in the classroom just now.",
        "zh": "孩子们刚才在教室里。"
      }
    ]
  },
  {
    "id": "p10",
    "section": "was / were",
    "title": "苏格拉底 · was 还是 were",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 was/were",
    "image": "l03p-scene-tom-and-emma-were-in-the-park-last-weekend.jpg",
    "question": "「Tom and Emma _____ in the park last weekend.」选哪个？",
    "choices": [
      {
        "text": "was",
        "correct": false,
        "fb": "主语若是复数或 You/We/They，要用 were。"
      },
      {
        "text": "were",
        "correct": true,
        "fb": "太棒了！复数 / You/We/They → were。"
      },
      {
        "text": "is",
        "correct": false,
        "fb": "is 是现在时，过去要用 was/were。"
      }
    ],
    "sentence": "Tom and Emma were in the park last weekend.",
    "zh": "汤姆和艾玛上周末在公园里。"
  },
  {
    "id": "p11",
    "section": "规则动词",
    "title": "对比发现 · play → played",
    "type": "discover",
    "badge": "demo",
    "badgeText": "🔍 自我发现",
    "lead": "点击左右卡片听句子，再点「我发现了」对比动词变化。",
    "leftImage": "l03p-past-vs-present.jpg",
    "leftLabel": "I play football every day.",
    "rightImage": "l03p-scene-han-lin-visited-the-museum-with-his-family-last-.jpg",
    "rightLabel": "Han Lin visited the museum with his family last Sunday.",
    "leftSentence": "I play football every day.",
    "leftZh": "我每天踢足球。",
    "rightSentence": "Han Lin visited the museum with his family last Sunday.",
    "rightZh": "韩林上周日和家人参观了博物馆。",
    "discovery": "发现了吗？过去发生的动作，规则动词要加 -ed：play → played！"
  },
  {
    "id": "p12",
    "section": "规则动词",
    "title": "规则动词例句 ①",
    "type": "scene",
    "badge": "action",
    "badgeText": "🏃 +ed",
    "image": "l03p-scene-han-lin-visited-the-museum-with-his-family-last-.jpg",
    "lead": "规则变化：原形 + ed",
    "sentence": "Han Lin visited the museum with his family last Sunday.",
    "zh": "韩林上周日和家人参观了博物馆。",
    "verbType": "action",
    "source": "5GA"
  },
  {
    "id": "p13",
    "section": "规则动词",
    "title": "规则动词例句 ②",
    "type": "scene",
    "badge": "action",
    "badgeText": "🏃 +ed",
    "image": "l03p-scene-linda-played-the-piano-at-the-school-concert-yes.jpg",
    "lead": "注意时间标志词",
    "sentence": "Linda played the piano at the school concert yesterday.",
    "zh": "琳达昨天在学校音乐会上弹了钢琴。",
    "verbType": "action",
    "source": "6GA"
  },
  {
    "id": "p14",
    "section": "规则动词",
    "title": "拼写实验室 · -ed 规律",
    "type": "spelling",
    "badge": "demo",
    "badgeText": "✏️ 规律",
    "image": "l03p-scene-han-lin-visited-the-museum-with-his-family-last-.jpg",
    "rules": [
      {
        "tab": "规则① +ed",
        "rule": "大多数规则动词直接加 ed",
        "examples": [
          {
            "from": "play",
            "to": "played"
          },
          {
            "from": "watch",
            "to": "watched"
          },
          {
            "from": "clean",
            "to": "cleaned"
          },
          {
            "from": "want",
            "to": "wanted"
          }
        ],
        "sample": "Han Lin visited the museum with his family last Sunday.",
        "sampleZh": "韩林上周日和家人参观了博物馆。"
      },
      {
        "tab": "规则② +d",
        "rule": "以不发音 e 结尾，只加 d",
        "examples": [
          {
            "from": "live",
            "to": "lived"
          },
          {
            "from": "like",
            "to": "liked"
          },
          {
            "from": "hope",
            "to": "hoped"
          }
        ],
        "sample": "Linda played the piano at the school concert yesterday.",
        "sampleZh": "琳达昨天在学校音乐会上弹了钢琴。"
      },
      {
        "tab": "规则③ y→ied",
        "rule": "辅音 + y 结尾：变 y 为 i 再加 ed",
        "examples": [
          {
            "from": "study",
            "to": "studied"
          },
          {
            "from": "carry",
            "to": "carried"
          },
          {
            "from": "try",
            "to": "tried"
          }
        ]
      },
      {
        "tab": "规则④ 双写",
        "rule": "短元音 + 单辅音结尾，双写辅音再加 ed",
        "examples": [
          {
            "from": "stop",
            "to": "stopped"
          },
          {
            "from": "plan",
            "to": "planned"
          },
          {
            "from": "shop",
            "to": "shopped"
          }
        ]
      }
    ]
  },
  {
    "id": "p15",
    "section": "规则动词",
    "title": "规则动词小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-han-lin-visited-the-museum-with-his-family-last-.jpg",
    "q": "Tom ___ his homework last night.",
    "opts": [
      "finished",
      "finish",
      "finishes",
      "finishing"
    ],
    "ans": 0,
    "hint": "汤姆昨晚完成了作业",
    "sentence": "Tom finished his homework last night.",
    "zh": "汤姆昨晚完成了作业。",
    "source": "5GA"
  },
  {
    "id": "p16",
    "section": "规则动词",
    "title": "规则动词小测 ②",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-linda-played-the-piano-at-the-school-concert-yes.jpg",
    "q": "Lily ___ to the park yesterday morning.",
    "opts": [
      "walked",
      "walk",
      "walks",
      "walking"
    ],
    "ans": 0,
    "hint": "莉莉昨天早上步行去公园",
    "sentence": "Lily walked to the park yesterday morning.",
    "zh": "莉莉昨天早上步行去公园。",
    "source": "5GA"
  },
  {
    "id": "p17",
    "section": "不规则动词",
    "title": "不规则 · went",
    "type": "scene",
    "badge": "action",
    "badgeText": "⚡ 不规则",
    "image": "l03p-scene-teng-fei-and-chen-tao-went-to-the-zoo-in-chengdu.jpg",
    "lead": "不规则动词要整词记忆：go → went",
    "sentence": "Teng Fei and Chen Tao went to the zoo in Chengdu last month.",
    "zh": "腾飞和陈涛上个月去了成都的动物园。",
    "verbType": "action",
    "source": "5GA"
  },
  {
    "id": "p18",
    "section": "不规则动词",
    "title": "不规则 · 再练",
    "type": "scene",
    "badge": "action",
    "badgeText": "⚡ 不规则",
    "image": "l03p-scene-lily-saw-a-giant-panda-at-the-chengdu-research-b.jpg",
    "lead": "看图说过去：发生了什么？",
    "sentence": "Lily saw a giant panda at the Chengdu Research Base last year.",
    "zh": "莉莉去年在成都研究基地看到了一只大熊猫。",
    "verbType": "action",
    "source": "6GA"
  },
  {
    "id": "p19",
    "section": "不规则动词",
    "title": "不规则动词词汇卡",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabIrregular",
    "lead": "小升初高频不规则：go/see/have/eat/take/write/come/make/buy/think…",
    "image": "l03p-scene-teng-fei-and-chen-tao-went-to-the-zoo-in-chengdu.jpg"
  },
  {
    "id": "p20",
    "section": "不规则动词",
    "title": "不规则小测 ①",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-teng-fei-and-chen-tao-went-to-the-zoo-in-chengdu.jpg",
    "q": "Lily ___ a new dress yesterday.",
    "opts": [
      "bought",
      "buyed",
      "buys",
      "buy"
    ],
    "ans": 0,
    "hint": "莉莉昨天买了一条新裙子",
    "sentence": "Lily bought a new dress yesterday.",
    "zh": "莉莉昨天买了一条新裙子。",
    "source": "5GA"
  },
  {
    "id": "p21",
    "section": "不规则动词",
    "title": "不规则小测 ②",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-lily-saw-a-giant-panda-at-the-chengdu-research-b.jpg",
    "q": "Tom ___ to the zoo last Sunday.",
    "opts": [
      "went",
      "go",
      "goes",
      "going"
    ],
    "ans": 0,
    "hint": "汤姆上周日去了动物园",
    "sentence": "Tom went to the zoo last Sunday.",
    "zh": "汤姆上周日去了动物园。",
    "source": "5GA"
  },
  {
    "id": "p22",
    "section": "不规则动词",
    "title": "配对 · 原形 ↔ 过去式句子",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "pool": "matchPairs",
    "image": "l03p-playground.jpg",
    "pairs": [
      {
        "en": "Lily visited the zoo yesterday.",
        "zh": "莉莉昨天参观了动物园。"
      },
      {
        "en": "Tom played football with Jack.",
        "zh": "汤姆和杰克踢了足球。"
      },
      {
        "en": "Emma watched a film at home.",
        "zh": "艾玛在家看了一部电影。"
      },
      {
        "en": "Chen Tao walked to school last Monday.",
        "zh": "陈涛上周一走路上学。"
      },
      {
        "en": "Miss Li taught English in the classroom.",
        "zh": "李老师在教室里教英语。"
      },
      {
        "en": "Mr Wang cooked dinner for his family.",
        "zh": "王老师为家人做了晚餐。"
      },
      {
        "en": "Teng Fei climbed the hill on Saturday.",
        "zh": "腾飞周六爬了山。"
      },
      {
        "en": "Han Lin visited Chengdu with Linda.",
        "zh": "韩林和琳达一起游览了成都。"
      },
      {
        "en": "Linda bought some souvenirs in Chengdu.",
        "zh": "琳达在成都买了一些纪念品。"
      },
      {
        "en": "The children had a picnic in the park.",
        "zh": "孩子们在公园里野餐了。"
      },
      {
        "en": "Jack lost his pencil case at school.",
        "zh": "杰克在学校丢了铅笔盒。"
      },
      {
        "en": "Lily and Emma sang a song together.",
        "zh": "莉莉和艾玛一起唱了一首歌。"
      }
    ]
  },
  {
    "id": "p23",
    "section": "否定句",
    "title": "动态演示 · didn't",
    "type": "dynamic",
    "badge": "demo",
    "badgeText": "🎬 动态",
    "image": "l03p-scene-jack-didn-t-finish-his-homework-yesterday-evenin.jpg",
    "lead": "否定：did not / didn't + 动词原形（不是过去式！）",
    "steps": [
      {
        "html": "<span class=\"l03p-token l03p-token--subj\">Lily</span><span class=\"l03p-token l03p-token--verb\">played</span><span class=\"l03p-token l03p-token--obj\">football</span>",
        "speak": "Han Lin visited the museum with his family last Sunday."
      },
      {
        "html": "<span class=\"l03p-token l03p-token--subj\">Lily</span><span class=\"l03p-token l03p-token--aux\">didn't</span><span class=\"l03p-token l03p-token--verb\">play</span><span class=\"l03p-token l03p-token--obj\">football</span>",
        "speak": "Jack didn't finish his homework yesterday evening."
      }
    ],
    "sentence": "Jack didn't finish his homework yesterday evening.",
    "zh": "杰克昨天晚上没有完成作业。"
  },
  {
    "id": "p24",
    "section": "否定句",
    "title": "例句 · didn't",
    "type": "scene",
    "badge": "neg",
    "badgeText": "🚫 否定",
    "image": "l03p-scene-jack-didn-t-finish-his-homework-yesterday-evenin.jpg",
    "lead": "didn't 后面用原形",
    "sentence": "Jack didn't finish his homework yesterday evening.",
    "zh": "杰克昨天晚上没有完成作业。",
    "verbType": "action",
    "source": "5GA"
  },
  {
    "id": "p25",
    "section": "否定句",
    "title": "例句 · wasn't / didn't",
    "type": "scene",
    "badge": "neg",
    "badgeText": "🚫 否定",
    "image": "l03p-scene-chen-tao-didn-t-go-to-the-park-last-sunday-becau.jpg",
    "lead": "be 用 wasn't/weren't；实义动词用 didn't",
    "sentence": "Chen Tao didn't go to the park last Sunday because it rained.",
    "zh": "陈涛上周日没去公园因为下雨了。",
    "verbType": "action",
    "source": "5GA"
  },
  {
    "id": "p26",
    "section": "否定句",
    "title": "否定小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-jack-didn-t-finish-his-homework-yesterday-evenin.jpg",
    "q": "Lily ___ not go to school yesterday.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "莉莉昨天没去上学",
    "sentence": "Lily did not go to school yesterday.",
    "zh": "莉莉昨天没去上学。",
    "source": "5GA"
  },
  {
    "id": "p27",
    "section": "疑问句",
    "title": "动态演示 · Did",
    "type": "dynamic",
    "badge": "demo",
    "badgeText": "🎬 动态",
    "image": "l03p-scene-did-tom-visit-the-chengdu-panda-base-last-year.jpg",
    "lead": "疑问：Did + 主语 + 动词原形？",
    "steps": [
      {
        "html": "<span class=\"l03p-token l03p-token--subj\">Tom</span><span class=\"l03p-token l03p-token--verb\">went</span><span class=\"l03p-token l03p-token--obj\">to the park</span>",
        "speak": "Teng Fei and Chen Tao went to the zoo in Chengdu last month."
      },
      {
        "html": "<span class=\"l03p-token l03p-token--aux l03p-token--fly\">Did</span><span class=\"l03p-token l03p-token--subj\">Tom</span><span class=\"l03p-token l03p-token--verb\">go</span><span class=\"l03p-token l03p-token--obj\">to the park</span><span class=\"l03p-token\">?</span>",
        "speak": "Did Tom visit the Chengdu Panda Base last year?"
      }
    ],
    "sentence": "Did Tom visit the Chengdu Panda Base last year?",
    "zh": "汤姆去年参观成都熊猫基地了吗？"
  },
  {
    "id": "p28",
    "section": "疑问句",
    "title": "例句 · Did ①",
    "type": "scene",
    "badge": "q",
    "badgeText": "❓ 疑问",
    "image": "l03p-scene-did-tom-visit-the-chengdu-panda-base-last-year.jpg",
    "lead": "Did 后动词用原形",
    "sentence": "Did Tom visit the Chengdu Panda Base last year?",
    "zh": "汤姆去年参观成都熊猫基地了吗？",
    "verbType": "q",
    "source": "5GA"
  },
  {
    "id": "p29",
    "section": "疑问句",
    "title": "例句 · Did ②",
    "type": "scene",
    "badge": "q",
    "badgeText": "❓ 疑问",
    "image": "l03p-scene-did-you-go-to-the-school-library-yesterday.jpg",
    "lead": "回答：Yes, … did. / No, … didn't.",
    "sentence": "Did you go to the school library yesterday?",
    "zh": "你昨天去学校图书馆了吗？",
    "verbType": "q",
    "source": "5GA"
  },
  {
    "id": "p30",
    "section": "疑问句",
    "title": "疑问小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-did-tom-visit-the-chengdu-panda-base-last-year.jpg",
    "q": "___ Lily go to the park yesterday?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "莉莉昨天去公园了吗？",
    "sentence": "Did Lily go to the park yesterday?",
    "zh": "莉莉昨天去公园了吗？",
    "source": "5GA"
  },
  {
    "id": "p31",
    "section": "综合练习",
    "title": "看图造句 ①",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "l03p-scene-han-lin-visited-the-museum-with-his-family-last-.jpg",
    "instruction": "单词已打乱。点选填入空格，组成正确过去时句子：",
    "tokens": [
      "Han",
      "Lin",
      "visited",
      "the",
      "museum",
      "with",
      "his",
      "family",
      "last",
      "Sunday"
    ],
    "sentence": "Han Lin visited the museum with his family last Sunday.",
    "zh": "韩林上周日和家人参观了博物馆。"
  },
  {
    "id": "p32",
    "section": "综合练习",
    "title": "听音排序 ①",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l03p-scene-teng-fei-and-chen-tao-went-to-the-zoo-in-chengdu.jpg",
    "audio": "Teng Fei and Chen Tao went to the zoo in Chengdu last month.",
    "tokens": [
      "Teng",
      "Fei",
      "and",
      "Chen",
      "Tao",
      "went",
      "to",
      "the",
      "zoo",
      "in",
      "Chengdu",
      "last",
      "month"
    ],
    "sentence": "Teng Fei and Chen Tao went to the zoo in Chengdu last month.",
    "zh": "腾飞和陈涛上个月去了成都的动物园。"
  },
  {
    "id": "p33",
    "section": "综合练习",
    "title": "was/were 小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-lily-was-at-school-yesterday.jpg",
    "q": "There ___ a big tree in the park before.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "以前公园里有一棵大树",
    "sentence": "There was a big tree in the park before.",
    "zh": "以前公园里有一棵大树。",
    "source": "小升初"
  },
  {
    "id": "p34",
    "section": "综合练习",
    "title": "看图造句 ②",
    "type": "picture-build",
    "badge": "state",
    "badgeText": "🧩 造句",
    "image": "l03p-scene-lily-was-at-school-yesterday.jpg",
    "instruction": "组成 was/were 句子：",
    "tokens": [
      "Lily",
      "was",
      "at",
      "school",
      "yesterday"
    ],
    "sentence": "Lily was at school yesterday.",
    "zh": "莉莉昨天在学校。"
  },
  {
    "id": "p35",
    "section": "综合练习",
    "title": "听音排序 ②",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l03p-scene-did-tom-visit-the-chengdu-panda-base-last-year.jpg",
    "audio": "Did Tom visit the Chengdu Panda Base last year?",
    "tokens": [
      "Did",
      "Tom",
      "visit",
      "the",
      "Chengdu",
      "Panda",
      "Base",
      "last",
      "year"
    ],
    "sentence": "Did Tom visit the Chengdu Panda Base last year?",
    "zh": "汤姆去年参观成都熊猫基地了吗？"
  },
  {
    "id": "p36",
    "section": "综合练习",
    "title": "终极小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "🏆 终极",
    "image": "l03p-scene-jack-didn-t-finish-his-homework-yesterday-evenin.jpg",
    "q": "Lily and Tom ___ to the zoo last Sunday.",
    "opts": [
      "went",
      "go",
      "goes",
      "going"
    ],
    "ans": 0,
    "hint": "莉莉和汤姆上周日去了动物园",
    "sentence": "Lily and Tom went to the zoo last Sunday.",
    "zh": "莉莉和汤姆上周日去了动物园。",
    "source": "5GA"
  },
  {
    "id": "p37",
    "section": "课堂练习",
    "title": "课堂练习中心",
    "type": "practice-hub",
    "badge": "game",
    "badgeText": "🎮 练习",
    "image": "l03p-playground.jpg",
    "lead": "选择一种练习模式，巩固一般过去时！语料由 DeepSeek 生成，对齐 5–6 年级 + 小升初。",
    "modes": [
      {
        "icon": "📖",
        "title": "词汇拓展",
        "desc": "p38-40",
        "href": "p38.html"
      },
      {
        "icon": "🖼",
        "title": "拓展例句",
        "desc": "p41-44",
        "href": "p41.html"
      },
      {
        "icon": "📝",
        "title": "套题练习",
        "desc": "p45-47",
        "href": "p45.html"
      },
      {
        "icon": "⏱",
        "title": "限时挑战",
        "desc": "p48-50",
        "href": "p48.html"
      },
      {
        "icon": "🔥",
        "title": "连对闯关",
        "desc": "p51-52",
        "href": "p51.html"
      },
      {
        "icon": "🔗",
        "title": "配对游戏",
        "desc": "p53",
        "href": "p53.html"
      },
      {
        "icon": "🎧",
        "title": "听音快选",
        "desc": "p54-55",
        "href": "p54.html"
      },
      {
        "icon": "🧩",
        "title": "看图造句",
        "desc": "p56",
        "href": "p56.html"
      },
      {
        "icon": "🎵",
        "title": "听音排序",
        "desc": "p57",
        "href": "p57.html"
      },
      {
        "icon": "🏆",
        "title": "终极闯关",
        "desc": "p58-60",
        "href": "p58.html"
      }
    ]
  },
  {
    "id": "p38",
    "section": "词汇拓展",
    "title": "规则动词词汇卡",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabRegular",
    "lead": "规则过去式 · 可点词查 DeepSeek 词典",
    "image": "l03p-scene-han-lin-visited-the-museum-with-his-family-last-.jpg"
  },
  {
    "id": "p39",
    "section": "词汇拓展",
    "title": "不规则动词词汇卡",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabIrregular",
    "lead": "小升初高频不规则动词",
    "image": "l03p-scene-teng-fei-and-chen-tao-went-to-the-zoo-in-chengdu.jpg"
  },
  {
    "id": "p40",
    "section": "词汇拓展",
    "title": "时间标志词",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabTime",
    "lead": "yesterday / last week / … ago",
    "image": "l03p-scene-lily-was-at-school-yesterday.jpg"
  },
  {
    "id": "p41",
    "section": "拓展例句",
    "title": "拓展例句 · was",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 be过去",
    "image": "l03p-scene-jack-was-happy-because-he-got-a-gift.jpg",
    "lead": "DeepSeek 语料 · 5GA",
    "sentence": "Jack was happy because he got a gift.",
    "zh": "杰克很开心因为他收到了礼物。",
    "verbType": "was",
    "source": "5GA"
  },
  {
    "id": "p42",
    "section": "拓展例句",
    "title": "拓展例句 · were",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 be过去",
    "image": "l03p-scene-chen-tao-and-teng-fei-were-classmates-three-year.jpg",
    "lead": "DeepSeek 语料 · 6GA",
    "sentence": "Chen Tao and Teng Fei were classmates three years ago.",
    "zh": "陈涛和腾飞三年前是同班同学。",
    "verbType": "were",
    "source": "6GA"
  },
  {
    "id": "p43",
    "section": "拓展例句",
    "title": "拓展例句 · was",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 be过去",
    "image": "l03p-scene-miss-li-was-our-english-teacher-last-year.jpg",
    "lead": "DeepSeek 语料 · 5GA",
    "sentence": "Miss Li was our English teacher last year.",
    "zh": "李老师去年是我们的英语老师。",
    "verbType": "was",
    "source": "5GA"
  },
  {
    "id": "p44",
    "section": "拓展例句",
    "title": "拓展例句 · were",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 be过去",
    "image": "l03p-scene-the-children-were-in-chengdu-last-summer.jpg",
    "lead": "DeepSeek 语料 · 6GA",
    "sentence": "The children were in Chengdu last summer.",
    "zh": "孩子们去年夏天在成都。",
    "verbType": "were",
    "source": "6GA"
  },
  {
    "id": "p45",
    "section": "套题练习",
    "title": "课堂套题 ① · was/were",
    "type": "multi-quiz",
    "badge": "ask",
    "badgeText": "📝 套题",
    "image": "l03p-was-were-chart.jpg",
    "lead": "共 6 题 · was / were",
    "questions": [
      {
        "q": "Lily ___ very happy yesterday.",
        "opts": [
          "was",
          "were",
          "is",
          "are"
        ],
        "ans": 0
      },
      {
        "q": "Tom and Jack ___ at school last Monday.",
        "opts": [
          "were",
          "was",
          "are",
          "is"
        ],
        "ans": 0
      },
      {
        "q": "There ___ a big tree in the park before.",
        "opts": [
          "was",
          "were",
          "is",
          "are"
        ],
        "ans": 0
      },
      {
        "q": "Emma ___ not at home last night.",
        "opts": [
          "was",
          "were",
          "is",
          "am"
        ],
        "ans": 0
      },
      {
        "q": "The children ___ in the classroom just now.",
        "opts": [
          "were",
          "was",
          "are",
          "is"
        ],
        "ans": 0
      },
      {
        "q": "Chen Tao ___ late for school this morning.",
        "opts": [
          "was",
          "were",
          "is",
          "are"
        ],
        "ans": 0
      }
    ]
  },
  {
    "id": "p46",
    "section": "套题练习",
    "title": "课堂套题 ② · 规则与不规则",
    "type": "multi-quiz",
    "badge": "ask",
    "badgeText": "📝 套题",
    "image": "l03p-scene-teng-fei-and-chen-tao-went-to-the-zoo-in-chengdu.jpg",
    "lead": "共 6 题",
    "questions": [
      {
        "q": "Tom ___ his homework last night.",
        "opts": [
          "finished",
          "finish",
          "finishes",
          "finishing"
        ],
        "ans": 0
      },
      {
        "q": "Lily ___ to the park yesterday morning.",
        "opts": [
          "walked",
          "walk",
          "walks",
          "walking"
        ],
        "ans": 0
      },
      {
        "q": "Emma ___ a letter to her friend last week.",
        "opts": [
          "wrote",
          "write",
          "writes",
          "writing"
        ],
        "ans": 0
      },
      {
        "q": "Lily ___ a new dress yesterday.",
        "opts": [
          "bought",
          "buyed",
          "buys",
          "buy"
        ],
        "ans": 0
      },
      {
        "q": "Tom ___ to the zoo last Sunday.",
        "opts": [
          "went",
          "go",
          "goes",
          "going"
        ],
        "ans": 0
      },
      {
        "q": "Emma ___ a storybook from the library.",
        "opts": [
          "got",
          "get",
          "gets",
          "getting"
        ],
        "ans": 0
      }
    ]
  },
  {
    "id": "p47",
    "section": "套题练习",
    "title": "课堂套题 ③ · 综合",
    "type": "multi-quiz",
    "badge": "ask",
    "badgeText": "📝 套题",
    "image": "l03p-playground.jpg",
    "lead": "共 8 题 · 小升初难度",
    "questions": [
      {
        "q": "Lily and Tom ___ to the zoo last Sunday.",
        "opts": [
          "went",
          "go",
          "goes",
          "going"
        ],
        "ans": 0
      },
      {
        "q": "Emma ___ a new bike yesterday.",
        "opts": [
          "got",
          "get",
          "gets",
          "getting"
        ],
        "ans": 0
      },
      {
        "q": "Jack ___ breakfast at 6:30 this morning.",
        "opts": [
          "had",
          "have",
          "has",
          "having"
        ],
        "ans": 0
      },
      {
        "q": "Chen Tao ___ a kite with his friends.",
        "opts": [
          "flew",
          "fly",
          "flies",
          "flying"
        ],
        "ans": 0
      },
      {
        "q": "Miss Li ___ us a story last week.",
        "opts": [
          "told",
          "tell",
          "tells",
          "telling"
        ],
        "ans": 0
      },
      {
        "q": "Teng Fei ___ a song at the concert.",
        "opts": [
          "sang",
          "sing",
          "sings",
          "singing"
        ],
        "ans": 0
      },
      {
        "q": "Han Lin ___ a beautiful picture.",
        "opts": [
          "drew",
          "draw",
          "draws",
          "drawing"
        ],
        "ans": 0
      },
      {
        "q": "Linda ___ an orange after lunch.",
        "opts": [
          "ate",
          "eat",
          "eats",
          "eating"
        ],
        "ans": 0
      }
    ]
  },
  {
    "id": "p48",
    "section": "限时挑战",
    "title": "限时 · was/were 45秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "pool": "qWasWere",
    "seconds": 45,
    "perQuestion": 10,
    "pass": 4,
    "lead": "每题约 10 秒！"
  },
  {
    "id": "p49",
    "section": "限时挑战",
    "title": "限时 · 规则动词 60秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "pool": "qRegular",
    "seconds": 60,
    "perQuestion": 10,
    "pass": 5
  },
  {
    "id": "p50",
    "section": "限时挑战",
    "title": "限时 · 综合 60秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "pool": "qMix",
    "seconds": 60,
    "perQuestion": 10,
    "pass": 5
  },
  {
    "id": "p51",
    "section": "连对闯关",
    "title": "连对闯关 · 不规则",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "pool": "qIrregular",
    "target": 5,
    "lead": "连续答对 5 题通关！"
  },
  {
    "id": "p52",
    "section": "连对闯关",
    "title": "连对闯关 · didn't / Did",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "pool": "qDid",
    "target": 5
  },
  {
    "id": "p53",
    "section": "配对游戏",
    "title": "中英配对",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "pool": "matchPairs",
    "image": "l03p-playground.jpg",
    "pairs": [
      {
        "en": "Lily visited the zoo yesterday.",
        "zh": "莉莉昨天参观了动物园。"
      },
      {
        "en": "Tom played football with Jack.",
        "zh": "汤姆和杰克踢了足球。"
      },
      {
        "en": "Emma watched a film at home.",
        "zh": "艾玛在家看了一部电影。"
      },
      {
        "en": "Chen Tao walked to school last Monday.",
        "zh": "陈涛上周一走路上学。"
      },
      {
        "en": "Miss Li taught English in the classroom.",
        "zh": "李老师在教室里教英语。"
      },
      {
        "en": "Mr Wang cooked dinner for his family.",
        "zh": "王老师为家人做了晚餐。"
      },
      {
        "en": "Teng Fei climbed the hill on Saturday.",
        "zh": "腾飞周六爬了山。"
      },
      {
        "en": "Han Lin visited Chengdu with Linda.",
        "zh": "韩林和琳达一起游览了成都。"
      },
      {
        "en": "Linda bought some souvenirs in Chengdu.",
        "zh": "琳达在成都买了一些纪念品。"
      },
      {
        "en": "The children had a picnic in the park.",
        "zh": "孩子们在公园里野餐了。"
      },
      {
        "en": "Jack lost his pencil case at school.",
        "zh": "杰克在学校丢了铅笔盒。"
      },
      {
        "en": "Lily and Emma sang a song together.",
        "zh": "莉莉和艾玛一起唱了一首歌。"
      }
    ]
  },
  {
    "id": "p54",
    "section": "听音快选",
    "title": "听音快选 ①",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "pool": "listenPick",
    "startIndex": 0,
    "image": "l03p-scene-lily-was-at-school-yesterday.jpg"
  },
  {
    "id": "p55",
    "section": "听音快选",
    "title": "听音快选 ②",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "pool": "listenPick",
    "startIndex": 3,
    "image": "l03p-scene-teng-fei-and-chen-tao-went-to-the-zoo-in-chengdu.jpg"
  },
  {
    "id": "p56",
    "section": "课堂游戏",
    "title": "看图造句 ③",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "l03p-scene-emma-had-a-picnic-with-her-friends-in-the-park-l.jpg",
    "instruction": "单词已打乱。点选填入，组成正确句子：",
    "tokens": [
      "Emma",
      "had",
      "a",
      "picnic",
      "with",
      "her",
      "friends",
      "in",
      "the",
      "park",
      "last",
      "weekend"
    ],
    "sentence": "Emma had a picnic with her friends in the park last weekend.",
    "zh": "艾玛上周末和朋友们在公园野餐。"
  },
  {
    "id": "p57",
    "section": "课堂游戏",
    "title": "听音排序 ③",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l03p-scene-jack-didn-t-finish-his-homework-yesterday-evenin.jpg",
    "audio": "Jack didn't finish his homework yesterday evening.",
    "tokens": [
      "Jack",
      "didn't",
      "finish",
      "his",
      "homework",
      "yesterday",
      "evening"
    ],
    "sentence": "Jack didn't finish his homework yesterday evening.",
    "zh": "杰克昨天晚上没有完成作业。"
  },
  {
    "id": "p58",
    "section": "终极闯关",
    "title": "听音快选 ③ · 五题连战",
    "type": "listen-pick",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "pool": "listenPick",
    "rounds": 5,
    "image": "l03p-playground.jpg"
  },
  {
    "id": "p59",
    "section": "终极闯关",
    "title": "限时综合 · 90秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "pool": "qMix",
    "seconds": 90,
    "perQuestion": 10,
    "pass": 7
  },
  {
    "id": "p60",
    "section": "终极闯关",
    "title": "连对 · 综合 8 连击",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "pool": "qMix",
    "target": 8
  },
  {
    "id": "p61",
    "section": "小结",
    "title": "本讲小结 · 一般过去时",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "l03p-past-vs-present.jpg",
    "checklist": [
      "时间标志：yesterday / last… / … ago → 一般过去时",
      "be：I/He/She/It → was；You/We/They → were",
      "规则动词：+ed / +d / y→ied / 双写+ed",
      "不规则：go→went, see→saw, have→had…（整词记）",
      "否定：didn't + 原形；wasn't / weren't",
      "疑问：Did + 主语 + 原形？"
    ],
    "chant": "Yesterday I played.\\nLast week we went.\\nI didn't cry —\\nDid you smile then?",
    "chantSpeak": "Yesterday I played. Last week we went. I didn't cry. Did you smile then?"
  }
];
  global.L03pData = {
    pages: PAGES,
    total: PAGES.length,
    byId: function (id) {
      for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return PAGES[i];
      return null;
    },
    indexOf: function (id) {
      for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return i;
      return -1;
    },
  };
})(typeof window !== "undefined" ? window : null);
