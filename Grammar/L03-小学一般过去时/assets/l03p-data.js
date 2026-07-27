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
    "audio": "Lily was proud after she won the sports day race yesterday. Lily played football with her friends in the park yesterday.",
    "soundHint": "先听，不要看文字。听完再点「显示」。这些事发生在什么时候？",
    "question": "这些句子说的是现在，还是过去？",
    "image": "l03p-scene-lily-was-proud-after-she-won-the-sports-day-race.jpg",
    "sentence": "Lily was proud after she won the sports day race yesterday.",
    "zh": "莉莉昨天运动会赛跑获胜后很自豪。",
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
    "question": "「Lily was proud after she won the sports day race yesterday.」说的是什么时候？",
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
    "sentence": "Lily was proud after she won the sports day race yesterday.",
    "zh": "莉莉昨天运动会赛跑获胜后很自豪。",
    "source": "DeepSeek·生动场景"
  },
  {
    "id": "p03",
    "section": "时间标志",
    "title": "时间小侦探 · 过去标志词",
    "type": "scene",
    "badge": "demo",
    "badgeText": "🕒 时间",
    "image": "l03p-scene-yesterday-miss-li-bought-a-new-chess-set-for-her.jpg",
    "lead": "看见 yesterday / last week / … ago，优先想一般过去时！",
    "sentence": "Yesterday, Miss Li bought a new chess set for her grandpa after work.",
    "zh": "昨天李老师下班后给爷爷买了一套新象棋。",
    "source": "原创"
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
    "image": "l03p-scene-lily-was-proud-after-she-won-the-sports-day-race.jpg",
    "lead": "I / He / She / It / 人名 / 单数 → was",
    "sentence": "Lily was proud after she won the sports day race yesterday.",
    "zh": "莉莉昨天运动会赛跑获胜后很自豪。",
    "verbType": "state",
    "source": "DeepSeek·生动场景"
  },
  {
    "id": "p06",
    "section": "was / were",
    "title": "were · 复数过去",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 were",
    "image": "l03p-scene-tom-and-emma-were-hungry-after-the-long-hike-las.jpg",
    "lead": "You / We / They / 复数 → were",
    "sentence": "Tom and Emma were hungry after the long hike last Sunday.",
    "zh": "汤姆和艾玛上周日长途徒步后很饿。",
    "verbType": "state",
    "source": "DeepSeek·生动场景"
  },
  {
    "id": "p07",
    "section": "was / were",
    "title": "例句 · was 再练",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 was",
    "image": "l03p-scene-the-classroom-was-quiet-during-the-reading-conte.jpg",
    "lead": "人名 / 单数事物用 was",
    "sentence": "The classroom was quiet during the reading contest last Friday.",
    "zh": "上周五阅读比赛时教室里很安静。",
    "verbType": "state",
    "source": "DeepSeek·生动场景"
  },
  {
    "id": "p08",
    "section": "was / were",
    "title": "例句 · were 再练",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 were",
    "image": "l03p-scene-miss-li-and-the-students-were-excited-before-the.jpg",
    "lead": "两个人或复数用 were",
    "sentence": "Miss Li and the students were excited before the class play began.",
    "zh": "开演前李老师和同学们都很兴奋。",
    "verbType": "state",
    "source": "DeepSeek·生动场景"
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
    "image": "l03p-scene-tom-and-emma-were-hungry-after-the-long-hike-las.jpg",
    "question": "「Tom and Emma _____ hungry after the long hike last Sunday.」选哪个？",
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
    "sentence": "Tom and Emma were hungry after the long hike last Sunday.",
    "zh": "汤姆和艾玛上周日长途徒步后很饿。"
  },
  {
    "id": "p11",
    "section": "规则动词",
    "title": "对比发现 · play → played",
    "type": "discover",
    "badge": "demo",
    "badgeText": "🔍 自我发现",
    "lead": "点击左右卡片听句子，再点「我发现了」对比动词变化。",
    "leftImage": "l03p-playground.jpg",
    "leftLabel": "I play football every day.",
    "rightImage": "l03p-scene-lily-played-football-with-her-friends-in-the-par.jpg",
    "rightLabel": "Lily played football with her friends in the park yesterday.",
    "leftSentence": "I play football every day.",
    "leftZh": "我每天踢足球。",
    "rightSentence": "Lily played football with her friends in the park yesterday.",
    "rightZh": "莉莉昨天和朋友们在公园踢足球。",
    "morphBase": "play",
    "morphPast": "played",
    "morphHighlight": "ed",
    "morphSpeak": "I play football every day. Lily played football with her friends in the park yesterday.",
    "discovery": "发现了吗？过去发生的动作，规则动词要加 -ed：play → played！"
  },
  {
    "id": "p12",
    "section": "规则动词",
    "title": "规则动词例句 ①",
    "type": "scene",
    "badge": "action",
    "badgeText": "🏃 +ed",
    "image": "l03p-scene-lily-played-football-with-her-friends-in-the-par.jpg",
    "lead": "规则变化：原形 + ed",
    "sentence": "Lily played football with her friends in the park yesterday.",
    "zh": "莉莉昨天和朋友们在公园踢足球。",
    "verbType": "action",
    "source": "教材对比句 · play→played"
  },
  {
    "id": "p13",
    "section": "规则动词",
    "title": "规则动词例句 ②",
    "type": "scene",
    "badge": "action",
    "badgeText": "🏃 +ed",
    "image": "l03p-scene-lily-sprinted-in-the-school-sports-day-race-with.jpg",
    "lead": "注意时间标志词",
    "sentence": "Lily sprinted in the school sports day race with her hair flying.",
    "zh": "莉莉在校运动会赛跑中冲刺，头发飞扬",
    "verbType": "action",
    "source": "教材场景"
  },
  {
    "id": "p14",
    "section": "规则动词",
    "title": "拼写实验室 · -ed 规律",
    "type": "spelling",
    "badge": "demo",
    "badgeText": "✏️ 规律",
    "image": "l03p-scene-lily-played-football-with-her-friends-in-the-par.jpg",
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
        "sample": "Lily played football with her friends in the park yesterday.",
        "sampleZh": "莉莉昨天和朋友们在公园踢足球。"
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
        "sample": "Lily sprinted in the school sports day race with her hair flying.",
        "sampleZh": "莉莉在校运动会赛跑中冲刺，头发飞扬"
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
    "image": "l03p-scene-lily-played-football-with-her-friends-in-the-par.jpg",
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
    "image": "l03p-scene-lily-sprinted-in-the-school-sports-day-race-with.jpg",
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
    "image": "l03p-scene-lily-went-to-the-school-library-after-class-and-.jpg",
    "lead": "不规则动词要整词记忆：go → went",
    "sentence": "Lily went to the school library after class and found a funny storybook.",
    "zh": "莉莉下课后去了学校图书馆，找到了一本有趣的故事书。",
    "verbType": "action",
    "source": "教材对比句 · go→went"
  },
  {
    "id": "p18",
    "section": "不规则动词",
    "title": "不规则 · 再练",
    "type": "scene",
    "badge": "action",
    "badgeText": "⚡ 不规则",
    "image": "l03p-scene-tom-stood-under-a-yellow-umbrella-in-the-heavy-r.jpg",
    "lead": "看图说过去：发生了什么？",
    "sentence": "Tom stood under a yellow umbrella in the heavy rain.",
    "zh": "汤姆在大雨中站在一把黄色雨伞下",
    "verbType": "action",
    "source": "教材场景 · 改标不规则"
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
    "image": "l03p-scene-lily-went-to-the-school-library-after-class-and-.jpg"
  },
  {
    "id": "p20",
    "section": "不规则动词",
    "title": "不规则小测 ①",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-lily-went-to-the-school-library-after-class-and-.jpg",
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
    "image": "l03p-scene-tom-stood-under-a-yellow-umbrella-in-the-heavy-r.jpg",
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
        "en": "Lily slipped on the wet floor and dropped her ice cream.",
        "zh": "莉莉在湿滑的地板上滑倒，弄掉了她的冰淇淋。"
      },
      {
        "en": "Tom climbed the tall tree to rescue the frightened kitten.",
        "zh": "汤姆爬上高大的树去救那只受惊的小猫。"
      },
      {
        "en": "Emma danced in the rain with her red umbrella spinning.",
        "zh": "艾玛在雨中跳舞，她的红伞旋转着。"
      },
      {
        "en": "Jack packed his heavy backpack and left for the airport.",
        "zh": "杰克收拾好沉重的背包，出发去了机场。"
      },
      {
        "en": "Chen Tao smiled proudly after winning the chess match.",
        "zh": "陈涛在赢得象棋比赛后骄傲地笑了。"
      },
      {
        "en": "Miss Li carried a stack of books into the sunny classroom.",
        "zh": "李老师抱着一摞书走进了阳光明媚的教室。"
      },
      {
        "en": "Mr Wang fixed the broken bicycle chain with a rusty wrench.",
        "zh": "王先生用一把生锈的扳手修好了断掉的自行车链条。"
      },
      {
        "en": "Teng Fei cried bitterly when his goldfish floated belly-up.",
        "zh": "腾飞在他的金鱼翻肚漂浮时伤心地大哭。"
      },
      {
        "en": "Han Lin baked a chocolate cake and burnt the frosting.",
        "zh": "韩琳烤了一个巧克力蛋糕，但把糖霜烤焦了。"
      },
      {
        "en": "Linda wrapped the gift box with shiny silver paper and a bow.",
        "zh": "琳达用闪亮的银纸和蝴蝶结把礼物盒包了起来。"
      },
      {
        "en": "The children laughed loudly as the clown juggled oranges.",
        "zh": "小丑抛接橙子时，孩子们大声笑了起来。"
      },
      {
        "en": "The old man waved his hat and smiled at the passing train.",
        "zh": "老人挥动帽子，对着经过的火车微笑。"
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
    "image": "l03p-scene-teng-fei-did-not-climb-the-tall-tree-because-he-.jpg",
    "lead": "否定：did not / didn't + 动词原形（不是过去式！）",
    "steps": [
      {
        "html": "<span class=\"l03p-token l03p-token--subj\">Lily</span><span class=\"l03p-token l03p-token--verb\">played</span><span class=\"l03p-token l03p-token--obj\">football</span>",
        "speak": "Lily played football with her friends in the park yesterday."
      },
      {
        "html": "<span class=\"l03p-token l03p-token--subj\">Lily</span><span class=\"l03p-token l03p-token--aux\">didn't</span><span class=\"l03p-token l03p-token--verb\">play</span><span class=\"l03p-token l03p-token--obj\">football</span>",
        "speak": "Teng Fei did not climb the tall tree because he felt scared."
      }
    ],
    "sentence": "Teng Fei did not climb the tall tree because he felt scared.",
    "zh": "腾飞没有爬那棵高树，因为他感到害怕"
  },
  {
    "id": "p24",
    "section": "否定句",
    "title": "例句 · didn't",
    "type": "scene",
    "badge": "neg",
    "badgeText": "🚫 否定",
    "image": "l03p-scene-teng-fei-did-not-climb-the-tall-tree-because-he-.jpg",
    "lead": "didn't 后面用原形",
    "sentence": "Teng Fei did not climb the tall tree because he felt scared.",
    "zh": "腾飞没有爬那棵高树，因为他感到害怕",
    "verbType": "action",
    "source": "教材场景"
  },
  {
    "id": "p25",
    "section": "否定句",
    "title": "例句 · wasn't / didn't",
    "type": "scene",
    "badge": "neg",
    "badgeText": "🚫 否定",
    "image": "l03p-scene-han-lin-did-not-find-his-yellow-umbrella-after-t.jpg",
    "lead": "be 用 wasn't/weren't；实义动词用 didn't",
    "sentence": "Han Lin did not find his yellow umbrella after the rain stopped.",
    "zh": "雨停后，韩林没有找到他的黄色雨伞",
    "verbType": "action",
    "source": "教材场景"
  },
  {
    "id": "p26",
    "section": "否定句",
    "title": "否定小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-teng-fei-did-not-climb-the-tall-tree-because-he-.jpg",
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
    "image": "l03p-scene-did-linda-wash-the-paintbrushes-in-the-art-room-.jpg",
    "lead": "疑问：Did + 主语 + 动词原形？",
    "steps": [
      {
        "html": "<span class=\"l03p-token l03p-token--subj\">Tom</span><span class=\"l03p-token l03p-token--verb\">went</span><span class=\"l03p-token l03p-token--obj\">to the park</span>",
        "speak": "Lily went to the school library after class and found a funny storybook."
      },
      {
        "html": "<span class=\"l03p-token l03p-token--aux l03p-token--fly\">Did</span><span class=\"l03p-token l03p-token--subj\">Tom</span><span class=\"l03p-token l03p-token--verb\">go</span><span class=\"l03p-token l03p-token--obj\">to the park</span><span class=\"l03p-token\">?</span>",
        "speak": "Did Linda wash the paintbrushes in the art room after painting."
      }
    ],
    "sentence": "Did Linda wash the paintbrushes in the art room after painting.",
    "zh": "琳达画画后在画室里洗了画笔吗"
  },
  {
    "id": "p28",
    "section": "疑问句",
    "title": "例句 · Did ①",
    "type": "scene",
    "badge": "q",
    "badgeText": "❓ 疑问",
    "image": "l03p-scene-did-linda-wash-the-paintbrushes-in-the-art-room-.jpg",
    "lead": "Did 后动词用原形",
    "sentence": "Did Linda wash the paintbrushes in the art room after painting.",
    "zh": "琳达画画后在画室里洗了画笔吗",
    "verbType": "q",
    "source": "教材场景"
  },
  {
    "id": "p29",
    "section": "疑问句",
    "title": "例句 · Did ②",
    "type": "scene",
    "badge": "q",
    "badgeText": "❓ 疑问",
    "image": "l03p-scene-did-chen-tao-score-a-goal-during-the-match-no-he.jpg",
    "lead": "回答：Yes, … did. / No, … didn't.",
    "sentence": "Did Chen Tao score a goal during the match? No, he missed by a few inches.",
    "zh": "陈涛在比赛中进球了吗？没有，他差了几英寸没进。",
    "verbType": "q",
    "source": "课堂互动"
  },
  {
    "id": "p30",
    "section": "疑问句",
    "title": "疑问小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-did-linda-wash-the-paintbrushes-in-the-art-room-.jpg",
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
    "image": "l03p-scene-lily-played-football-with-her-friends-in-the-par.jpg",
    "instruction": "单词已打乱。点选填入空格，组成正确过去时句子：",
    "tokens": [
      "Lily",
      "played",
      "football",
      "with",
      "her",
      "friends",
      "in",
      "the",
      "park",
      "yesterday"
    ],
    "sentence": "Lily played football with her friends in the park yesterday.",
    "zh": "莉莉昨天和朋友们在公园踢足球。"
  },
  {
    "id": "p32",
    "section": "综合练习",
    "title": "听音排序 ①",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l03p-scene-lily-went-to-the-school-library-after-class-and-.jpg",
    "audio": "Lily went to the school library after class and found a funny storybook.",
    "tokens": [
      "Lily",
      "went",
      "to",
      "the",
      "school",
      "library",
      "after",
      "class",
      "and",
      "found",
      "a",
      "funny",
      "storybook"
    ],
    "sentence": "Lily went to the school library after class and found a funny storybook.",
    "zh": "莉莉下课后去了学校图书馆，找到了一本有趣的故事书。"
  },
  {
    "id": "p33",
    "section": "综合练习",
    "title": "was/were 小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l03p-scene-lily-was-proud-after-she-won-the-sports-day-race.jpg",
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
    "image": "l03p-scene-lily-was-proud-after-she-won-the-sports-day-race.jpg",
    "instruction": "组成 was/were 句子：",
    "tokens": [
      "Lily",
      "was",
      "proud",
      "after",
      "she",
      "won",
      "the",
      "sports",
      "day",
      "race",
      "yesterday"
    ],
    "sentence": "Lily was proud after she won the sports day race yesterday.",
    "zh": "莉莉昨天运动会赛跑获胜后很自豪。"
  },
  {
    "id": "p35",
    "section": "综合练习",
    "title": "听音排序 ②",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l03p-scene-did-linda-wash-the-paintbrushes-in-the-art-room-.jpg",
    "audio": "Did Linda wash the paintbrushes in the art room after painting.",
    "tokens": [
      "Did",
      "Linda",
      "wash",
      "the",
      "paintbrushes",
      "in",
      "the",
      "art",
      "room",
      "after",
      "painting"
    ],
    "sentence": "Did Linda wash the paintbrushes in the art room after painting.",
    "zh": "琳达画画后在画室里洗了画笔吗"
  },
  {
    "id": "p36",
    "section": "综合练习",
    "title": "终极小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "🏆 终极",
    "image": "l03p-scene-teng-fei-did-not-climb-the-tall-tree-because-he-.jpg",
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
    "image": "l03p-scene-lily-played-football-with-her-friends-in-the-par.jpg"
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
    "image": "l03p-scene-lily-went-to-the-school-library-after-class-and-.jpg"
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
    "image": "l03p-scene-yesterday-miss-li-bought-a-new-chess-set-for-her.jpg"
  },
  {
    "id": "p41",
    "section": "拓展例句",
    "title": "拓展例句 · regular",
    "type": "scene",
    "badge": "action",
    "badgeText": "🖼 例句",
    "image": "l03p-scene-lily-sprinted-in-the-school-sports-day-race-with.jpg",
    "lead": "DeepSeek 语料 · 教材场景",
    "sentence": "Lily sprinted in the school sports day race with her hair flying.",
    "zh": "莉莉在校运动会赛跑中冲刺，头发飞扬",
    "verbType": "regular",
    "source": "教材场景"
  },
  {
    "id": "p42",
    "section": "拓展例句",
    "title": "拓展例句 · irregular",
    "type": "scene",
    "badge": "action",
    "badgeText": "🖼 例句",
    "image": "l03p-scene-tom-stood-under-a-yellow-umbrella-in-the-heavy-r.jpg",
    "lead": "DeepSeek 语料 · 教材场景 · 改标不规则",
    "sentence": "Tom stood under a yellow umbrella in the heavy rain.",
    "zh": "汤姆在大雨中站在一把黄色雨伞下",
    "verbType": "irregular",
    "source": "教材场景 · 改标不规则"
  },
  {
    "id": "p43",
    "section": "拓展例句",
    "title": "拓展例句 · irregular",
    "type": "scene",
    "badge": "action",
    "badgeText": "🖼 例句",
    "image": "l03p-scene-emma-blew-out-candles-on-her-birthday-cake-with-.jpg",
    "lead": "DeepSeek 语料 · 教材场景 · 改标不规则",
    "sentence": "Emma blew out candles on her birthday cake with a big smile.",
    "zh": "艾玛带着灿烂的笑容吹灭生日蛋糕上的蜡烛",
    "verbType": "irregular",
    "source": "教材场景 · 改标不规则"
  },
  {
    "id": "p44",
    "section": "拓展例句",
    "title": "拓展例句 · regular",
    "type": "scene",
    "badge": "action",
    "badgeText": "🖼 例句",
    "image": "l03p-scene-jack-and-chen-tao-watched-steam-rise-from-a-hotp.jpg",
    "lead": "DeepSeek 语料 · 教材场景",
    "sentence": "Jack and Chen Tao watched steam rise from a hotpot in winter.",
    "zh": "杰克和陈涛在冬天看着火锅升起的蒸汽",
    "verbType": "regular",
    "source": "教材场景"
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
    "image": "l03p-scene-lily-went-to-the-school-library-after-class-and-.jpg",
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
        "en": "Lily slipped on the wet floor and dropped her ice cream.",
        "zh": "莉莉在湿滑的地板上滑倒，弄掉了她的冰淇淋。"
      },
      {
        "en": "Tom climbed the tall tree to rescue the frightened kitten.",
        "zh": "汤姆爬上高大的树去救那只受惊的小猫。"
      },
      {
        "en": "Emma danced in the rain with her red umbrella spinning.",
        "zh": "艾玛在雨中跳舞，她的红伞旋转着。"
      },
      {
        "en": "Jack packed his heavy backpack and left for the airport.",
        "zh": "杰克收拾好沉重的背包，出发去了机场。"
      },
      {
        "en": "Chen Tao smiled proudly after winning the chess match.",
        "zh": "陈涛在赢得象棋比赛后骄傲地笑了。"
      },
      {
        "en": "Miss Li carried a stack of books into the sunny classroom.",
        "zh": "李老师抱着一摞书走进了阳光明媚的教室。"
      },
      {
        "en": "Mr Wang fixed the broken bicycle chain with a rusty wrench.",
        "zh": "王先生用一把生锈的扳手修好了断掉的自行车链条。"
      },
      {
        "en": "Teng Fei cried bitterly when his goldfish floated belly-up.",
        "zh": "腾飞在他的金鱼翻肚漂浮时伤心地大哭。"
      },
      {
        "en": "Han Lin baked a chocolate cake and burnt the frosting.",
        "zh": "韩琳烤了一个巧克力蛋糕，但把糖霜烤焦了。"
      },
      {
        "en": "Linda wrapped the gift box with shiny silver paper and a bow.",
        "zh": "琳达用闪亮的银纸和蝴蝶结把礼物盒包了起来。"
      },
      {
        "en": "The children laughed loudly as the clown juggled oranges.",
        "zh": "小丑抛接橙子时，孩子们大声笑了起来。"
      },
      {
        "en": "The old man waved his hat and smiled at the passing train.",
        "zh": "老人挥动帽子，对着经过的火车微笑。"
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
    "image": "l03p-scene-lily-was-proud-after-she-won-the-sports-day-race.jpg"
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
    "image": "l03p-scene-lily-went-to-the-school-library-after-class-and-.jpg"
  },
  {
    "id": "p56",
    "section": "课堂游戏",
    "title": "看图造句 ③",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "l03p-scene-miss-li-and-mr-wang-taught-students-in-the-libra.jpg",
    "instruction": "单词已打乱。点选填入，组成正确句子：",
    "tokens": [
      "Miss",
      "Li",
      "and",
      "Mr",
      "Wang",
      "taught",
      "students",
      "in",
      "the",
      "library",
      "corner"
    ],
    "sentence": "Miss Li and Mr Wang taught students in the library corner.",
    "zh": "李老师和王老师在图书馆角落教学生"
  },
  {
    "id": "p57",
    "section": "课堂游戏",
    "title": "听音排序 ③",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l03p-scene-teng-fei-did-not-climb-the-tall-tree-because-he-.jpg",
    "audio": "Teng Fei did not climb the tall tree because he felt scared.",
    "tokens": [
      "Teng",
      "Fei",
      "did",
      "not",
      "climb",
      "the",
      "tall",
      "tree",
      "because",
      "he",
      "felt",
      "scared"
    ],
    "sentence": "Teng Fei did not climb the tall tree because he felt scared.",
    "zh": "腾飞没有爬那棵高树，因为他感到害怕"
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
