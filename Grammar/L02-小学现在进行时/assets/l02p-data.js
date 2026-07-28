(function (global) {
  "use strict";
  var PAGES = [
  {
    "id": "p01",
    "section": "导入",
    "title": "听一听 · 正在发生的事",
    "type": "sound-first",
    "badge": "sound",
    "badgeText": "🔊 声音先行",
    "audio": "I am reading a book in the library. She is drawing a picture on the blackboard.",
    "soundHint": "先听，不要看文字。听完再点「显示」。这些事发生在什么时候？",
    "question": "这些句子说的是「此刻正在做」，还是「每天的习惯」？",
    "image": "l02p-scene-i-am-reading-a-book-in-the-library.jpg",
    "sentence": "I am reading a book in the library.",
    "zh": "我正在图书馆里看书。",
    "source": "DeepSeek · 导入"
  },
  {
    "id": "p02",
    "section": "导入",
    "title": "苏格拉底 · 此刻还是每天？",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 想一想",
    "image": "l02p-continuous-vs-simple.jpg",
    "question": "「I am reading a book in the library.」说的是什么时候？",
    "choices": [
      {
        "text": "现在正在发生",
        "correct": true,
        "fb": "对了！now / look / listen → 现在进行时！"
      },
      {
        "text": "过去某一时间发生的事",
        "correct": false,
        "fb": "过去发生的事要用一般过去时。"
      },
      {
        "text": "每天经常发生",
        "correct": false,
        "fb": "每天经常发生才用一般现在时。"
      }
    ],
    "sentence": "I am reading a book in the library.",
    "zh": "我正在图书馆里看书。",
    "source": "5GA"
  },
  {
    "id": "p03",
    "section": "时间标志",
    "title": "时间小侦探 · now 标志词",
    "type": "scene",
    "badge": "demo",
    "badgeText": "🕒 时间",
    "image": "l02p-scene-teng-fei-is-eating-a-snack-now.jpg",
    "lead": "看见 now / look / listen / at the moment / right now，优先想现在进行时！",
    "sentence": "Teng Fei is eating a snack now.",
    "zh": "腾飞现在正在吃零食。",
    "source": "5GA"
  },
  {
    "id": "p04",
    "section": "时间标志",
    "title": "分类游戏 · 进行时 vs 一般现在时",
    "type": "classify",
    "badge": "ask",
    "badgeText": "🧺 分类",
    "image": "l02p-continuous-vs-simple.jpg",
    "lead": "把句子放进正确的篮子",
    "buckets": [
      {
        "key": "continuous",
        "label": "🔄 现在进行时"
      },
      {
        "key": "simple",
        "label": "🔁 一般现在时"
      }
    ],
    "items": [
      {
        "text": "I am reading a book",
        "bucket": "continuous",
        "hint": "",
        "zh": ""
      },
      {
        "text": "She is singing a song",
        "bucket": "continuous",
        "hint": "",
        "zh": ""
      },
      {
        "text": "They are playing football",
        "bucket": "continuous",
        "hint": "",
        "zh": ""
      },
      {
        "text": "He is eating an apple",
        "bucket": "continuous",
        "hint": "",
        "zh": ""
      },
      {
        "text": "I read a book every day",
        "bucket": "simple",
        "hint": "",
        "zh": ""
      },
      {
        "text": "She sings songs",
        "bucket": "simple",
        "hint": "",
        "zh": ""
      },
      {
        "text": "They play football on weekends",
        "bucket": "simple",
        "hint": "",
        "zh": ""
      },
      {
        "text": "He eats an apple every morning",
        "bucket": "simple",
        "hint": "",
        "zh": ""
      }
    ]
  },
  {
    "id": "p05",
    "section": "am / is / are",
    "title": "am · 第一人称",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 am",
    "image": "l02p-scene-i-am-reading-a-book-in-the-library.jpg",
    "lead": "I → am + V-ing",
    "sentence": "I am reading a book in the library.",
    "zh": "我正在图书馆里看书。",
    "verbType": "state",
    "source": "5GA"
  },
  {
    "id": "p06",
    "section": "am / is / are",
    "title": "is · 第三人称单数",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 is",
    "image": "l02p-scene-she-is-drawing-a-picture-on-the-blackboard.jpg",
    "lead": "He / She / It / 人名 / 单数 → is",
    "sentence": "She is drawing a picture on the blackboard.",
    "zh": "她正在黑板上画画。",
    "verbType": "state",
    "source": "5GA"
  },
  {
    "id": "p07",
    "section": "am / is / are",
    "title": "例句 · is 再练",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 is",
    "image": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "lead": "单数主语用 is + V-ing",
    "sentence": "He is playing football on the playground.",
    "zh": "他正在操场上踢足球。",
    "verbType": "state",
    "source": "5GA"
  },
  {
    "id": "p08",
    "section": "am / is / are",
    "title": "are · 复数",
    "type": "scene",
    "badge": "state",
    "badgeText": "💙 are",
    "image": "l02p-scene-we-are-having-lunch-in-the-canteen.jpg",
    "lead": "You / We / They / 复数 → are",
    "sentence": "We are having lunch in the canteen.",
    "zh": "我们正在食堂吃午饭。",
    "verbType": "state",
    "source": "5GA"
  },
  {
    "id": "p09",
    "section": "am / is / are",
    "title": "am / is / are 配对",
    "type": "be-match",
    "badge": "demo",
    "badgeText": "🔗 配对",
    "image": "l02p-am-is-are-chart.jpg",
    "lead": "看主语选 be：I → am；单数（He/She/人名/My mother）→ is；复数（We/They/My parents）→ are",
    "chart": [
      {
        "subjects": "I",
        "be": "am"
      },
      {
        "subjects": "He / She / It / 人名 / My mother（单数）",
        "be": "is"
      },
      {
        "subjects": "You / We / They / My parents / Tom and Lily（复数）",
        "be": "are"
      },
      {
        "subjects": "否定",
        "be": "isn't / aren't / am not"
      }
    ],
    "beOpts": [
      "am",
      "is",
      "are"
    ],
    "drill": [
      {
        "subject": "I",
        "ans": "am",
        "sentence": "I am reading a storybook in the library now.",
        "zh": "我现在正在图书馆里读故事书。"
      },
      {
        "subject": "My mother",
        "ans": "is",
        "sentence": "My mother is cooking dinner in the kitchen now.",
        "zh": "我的妈妈现在正在厨房做晚饭。"
      },
      {
        "subject": "My parents",
        "ans": "are",
        "sentence": "My parents are watching TV in the living room.",
        "zh": "我的父母正在客厅看电视。"
      },
      {
        "subject": "Tom",
        "ans": "is",
        "sentence": "Tom is swimming in the pool right now.",
        "zh": "汤姆现在正在游泳池里游泳。"
      },
      {
        "subject": "The boys",
        "ans": "are",
        "sentence": "The boys are playing football on the playground.",
        "zh": "男孩们正在操场上踢足球。"
      },
      {
        "subject": "Tom and Lily",
        "ans": "are",
        "sentence": "Tom and Lily are dancing in the music room.",
        "zh": "汤姆和莉莉正在音乐室里跳舞。"
      },
      {
        "subject": "We",
        "ans": "are",
        "sentence": "We are having an English class now.",
        "zh": "我们现在正在上英语课。"
      }
    ]
  },
  {
    "id": "p10",
    "section": "am / is / are",
    "title": "苏格拉底 · am / is / are",
    "type": "socratic",
    "badge": "ask",
    "badgeText": "💭 am/is/are",
    "image": "l02p-scene-we-are-having-lunch-in-the-canteen.jpg",
    "question": "「We _____ having lunch in the canteen.」选哪个？",
    "choices": [
      {
        "text": "am",
        "correct": false,
        "fb": "am 只用于 I。"
      },
      {
        "text": "is",
        "correct": false,
        "fb": "is 用于单数主语，They 要用 are。"
      },
      {
        "text": "are",
        "correct": true,
        "fb": "太棒了！They / You / We → are。"
      }
    ],
    "sentence": "We are having lunch in the canteen.",
    "zh": "我们正在食堂吃午饭。"
  },
  {
    "id": "p11",
    "section": "V-ing 形式",
    "title": "对比发现 · play → playing",
    "type": "discover",
    "badge": "demo",
    "badgeText": "🔍 自我发现",
    "lead": "点击左右卡片听句子，再点「我发现了」对比动词变化。",
    "leftImage": "l02p-playground.jpg",
    "leftLabel": "I play football every day.",
    "rightImage": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "rightLabel": "He is playing football on the playground.",
    "leftSentence": "I play football every day.",
    "leftZh": "我每天踢足球。",
    "rightSentence": "He is playing football on the playground.",
    "rightZh": "他正在操场上踢足球。",
    "morphBase": "play",
    "morphPast": "playing",
    "morphHighlight": "ing",
    "morphSpeak": "I play football every day. He is playing football on the playground.",
    "discovery": "发现了吗？此刻正在发生的动作，要用 be + V-ing：play → playing！"
  },
  {
    "id": "p12",
    "section": "V-ing 形式",
    "title": "进行时例句 ①",
    "type": "scene",
    "badge": "action",
    "badgeText": "🏃 V-ing",
    "image": "l02p-scene-chen-tao-is-running-in-the-park.jpg",
    "lead": "动词加 -ing，前面加 am/is/are",
    "sentence": "Chen Tao is running in the park.",
    "zh": "陈涛正在公园跑步。",
    "verbType": "action",
    "source": "5GA"
  },
  {
    "id": "p13",
    "section": "V-ing 形式",
    "title": "进行时例句 ②",
    "type": "scene",
    "badge": "action",
    "badgeText": "🏃 V-ing",
    "image": "l02p-scene-miss-li-is-swimming-in-the-pool.jpg",
    "lead": "注意 now / look 等时间标志词",
    "sentence": "Miss Li is swimming in the pool.",
    "zh": "李老师正在游泳池游泳。",
    "verbType": "action",
    "source": "5GA"
  },
  {
    "id": "p14",
    "section": "V-ing 形式",
    "title": "拼写实验室 · -ing 规律",
    "type": "spelling",
    "badge": "demo",
    "badgeText": "✏️ 规律",
    "image": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "lead": "点开每条规律，看动词变化，再读匹配的例句。",
    "rules": [
      {
        "tab": "规则① +ing",
        "rule": "大多数动词直接加 ing",
        "examples": [
          {
            "from": "play",
            "to": "playing"
          },
          {
            "from": "read",
            "to": "reading"
          },
          {
            "from": "sing",
            "to": "singing"
          },
          {
            "from": "draw",
            "to": "drawing"
          }
        ],
        "sample": "He is playing football on the playground.",
        "sampleZh": "他正在操场上踢足球。",
        "sampleImage": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
        "focusVerb": "playing"
      },
      {
        "tab": "规则② 去e+ing",
        "rule": "以不发音 e 结尾，去 e 加 ing",
        "examples": [
          {
            "from": "write",
            "to": "writing"
          },
          {
            "from": "dance",
            "to": "dancing"
          },
          {
            "from": "make",
            "to": "making"
          }
        ],
        "sample": "Lily is writing a letter to her grandma.",
        "sampleZh": "莉莉正在给奶奶写信。",
        "sampleImage": "l02p-scene-lily-is-writing-a-letter-to-her-grandma.jpg",
        "focusVerb": "writing"
      },
      {
        "tab": "规则③ 双写+ing",
        "rule": "短元音 + 单辅音结尾，双写辅音再加 ing",
        "examples": [
          {
            "from": "run",
            "to": "running"
          },
          {
            "from": "sit",
            "to": "sitting"
          },
          {
            "from": "swim",
            "to": "swimming"
          }
        ],
        "sample": "Chen Tao is running in the park.",
        "sampleZh": "陈涛正在公园跑步。",
        "sampleImage": "l02p-scene-chen-tao-is-running-in-the-park.jpg",
        "focusVerb": "running"
      },
      {
        "tab": "规则④ ie→y+ing",
        "rule": "以 ie 结尾，变 ie 为 y 再加 ing",
        "examples": [
          {
            "from": "lie",
            "to": "lying"
          },
          {
            "from": "tie",
            "to": "tying"
          }
        ],
        "sample": "The cat is lying on the sofa.",
        "sampleZh": "猫正躺在沙发上。",
        "sampleImage": "l02p-scene-the-cat-is-lying-on-the-sofa.jpg",
        "focusVerb": "lying"
      }
    ]
  },
  {
    "id": "p15",
    "section": "V-ing 形式",
    "title": "拼写小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l02p-scene-chen-tao-is-running-in-the-park.jpg",
    "q": "Look! The bird is ___ (fly) in the sky.",
    "opts": [
      "fly",
      "flying",
      "flies"
    ],
    "ans": 1,
    "hint": "看！那只鸟正在天空中飞。",
    "sentence": "Look! The bird is flying in the sky.",
    "zh": "看！那只鸟正在天空中飞。",
    "source": "5GA"
  },
  {
    "id": "p16",
    "section": "V-ing 形式",
    "title": "拼写小测 ②",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l02p-scene-miss-li-is-swimming-in-the-pool.jpg",
    "q": "He is ___ (run) in the park now.",
    "opts": [
      "run",
      "running",
      "runs"
    ],
    "ans": 1,
    "hint": "他现在正在公园里跑步。",
    "sentence": "He is running in the park now.",
    "zh": "他现在正在公园里跑步。",
    "source": "5GA"
  },
  {
    "id": "p17",
    "section": "状态动词",
    "title": "状态动词 · know",
    "type": "scene",
    "badge": "state",
    "badgeText": "🧠 状态",
    "image": "l02p-scene-i-know-the-answer.jpg",
    "lead": "like / know / want 等状态动词一般不用进行时",
    "sentence": "I know the answer.",
    "zh": "我知道答案。",
    "verbType": "stative",
    "source": "5GA"
  },
  {
    "id": "p18",
    "section": "状态动词",
    "title": "状态动词 · likes",
    "type": "scene",
    "badge": "state",
    "badgeText": "🧠 状态",
    "image": "l02p-scene-she-likes-ice-cream.jpg",
    "lead": "说喜欢、知道、想要，用一般现在时即可",
    "sentence": "She likes ice cream.",
    "zh": "她喜欢冰淇淋。",
    "verbType": "stative",
    "source": "5GA"
  },
  {
    "id": "p19",
    "section": "V-ing 形式",
    "title": "V-ing 词汇卡",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabIng",
    "lead": "点开单词卡片：看例句配图，再做句子排序和看图造句。"
  },
  {
    "id": "p20",
    "section": "状态动词",
    "title": "be + V-ing 小测 ①",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l02p-scene-i-am-reading-a-book-in-the-library.jpg",
    "q": "My mother ___ (cook) dinner in the kitchen now.",
    "opts": [
      "cooks",
      "is cooking",
      "cooked"
    ],
    "ans": 1,
    "hint": "妈妈正在厨房做晚饭。",
    "sentence": "My mother is cooking dinner in the kitchen now.",
    "zh": "我的妈妈现在正在厨房做晚饭。",
    "source": "5GA"
  },
  {
    "id": "p21",
    "section": "状态动词",
    "title": "be + V-ing 小测 ②",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l02p-scene-she-is-drawing-a-picture-on-the-blackboard.jpg",
    "q": "Look! The boys ___ (play) football on the playground.",
    "opts": [
      "play",
      "are playing",
      "played"
    ],
    "ans": 1,
    "hint": "看！男孩们正在操场上踢足球。",
    "sentence": "Look! The boys are playing football on the playground.",
    "zh": "看！男孩们正在操场上踢足球。",
    "source": "5GA"
  },
  {
    "id": "p22",
    "section": "V-ing 形式",
    "title": "配对 · 英文 ↔ 中文",
    "type": "match-pairs",
    "badge": "game",
    "badgeText": "🔗 配对",
    "pool": "matchPairs",
    "image": "l02p-playground.jpg",
    "pairs": [
      {
        "id": 1,
        "english": "I am reading a book",
        "chinese": "我正在读一本书"
      },
      {
        "id": 2,
        "english": "She is singing a song",
        "chinese": "她正在唱一首歌"
      },
      {
        "id": 3,
        "english": "They are playing football",
        "chinese": "他们正在踢足球"
      },
      {
        "id": 4,
        "english": "He is eating an apple",
        "chinese": "他正在吃一个苹果"
      },
      {
        "id": 5,
        "english": "We are watching TV",
        "chinese": "我们正在看电视"
      },
      {
        "id": 6,
        "english": "The cat is sleeping",
        "chinese": "猫正在睡觉"
      },
      {
        "id": 7,
        "english": "I am writing a letter",
        "chinese": "我正在写一封信"
      },
      {
        "id": 8,
        "english": "You are running fast",
        "chinese": "你正在跑得快"
      },
      {
        "id": 9,
        "english": "The dog is barking",
        "chinese": "狗正在叫"
      },
      {
        "id": 10,
        "english": "She is dancing now",
        "chinese": "她正在跳舞"
      },
      {
        "id": 11,
        "english": "He is swimming in the pool",
        "chinese": "他正在游泳池里游泳"
      },
      {
        "id": 12,
        "english": "They are laughing loudly",
        "chinese": "他们正在大声笑"
      }
    ]
  },
  {
    "id": "p23",
    "section": "否定句",
    "title": "动态演示 · isn't / aren't",
    "type": "dynamic",
    "badge": "demo",
    "badgeText": "🎬 动态",
    "image": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "lead": "否定：be + not + V-ing → isn't / aren't / am not",
    "steps": [
      {
        "html": "<span class=\"l02p-token l02p-token--subj\">He</span><span class=\"l02p-token l02p-token--be\">is</span><span class=\"l02p-token l02p-token--verb\">playing</span><span class=\"l02p-token l02p-token--obj\">football</span>",
        "speak": "He is playing football on the playground."
      },
      {
        "html": "<span class=\"l02p-token l02p-token--subj\">He</span><span class=\"l02p-token l02p-token--aux\">isn't</span><span class=\"l02p-token l02p-token--verb\">playing</span><span class=\"l02p-token l02p-token--obj\">football</span>",
        "speak": "He isn't playing football on the playground."
      }
    ],
    "sentence": "He isn't playing football on the playground.",
    "zh": "他没有在操场上踢足球。"
  },
  {
    "id": "p24",
    "section": "否定句",
    "title": "例句 · isn't",
    "type": "scene",
    "badge": "neg",
    "badgeText": "🚫 否定",
    "image": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "lead": "isn't / aren't + V-ing（动词仍用 -ing 形式）",
    "sentence": "He isn't playing football on the playground.",
    "zh": "他没有在操场上踢足球。",
    "verbType": "action",
    "source": "教材对比句 · isn't"
  },
  {
    "id": "p25",
    "section": "否定句",
    "title": "例句 · aren't 再练",
    "type": "scene",
    "badge": "neg",
    "badgeText": "🚫 否定",
    "image": "l02p-scene-lily-is-not-sleeping-in-class.jpg",
    "lead": "I → am not；is → isn't；are → aren't",
    "sentence": "Lily isn't sleeping in class.",
    "zh": "莉莉没有在课堂上睡觉。",
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
    "image": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "q": "He ___ (not watch) TV now. He is reading a book.",
    "opts": [
      "doesn't watch",
      "isn't watching",
      "didn't watch"
    ],
    "ans": 1,
    "hint": "他现在没在看电视。他正在看书。",
    "sentence": "He isn't watching TV now. He is reading a book.",
    "zh": "他现在没在看电视。他正在看书。",
    "source": "5GA"
  },
  {
    "id": "p27",
    "section": "疑问句",
    "title": "动态演示 · Am / Is / Are",
    "type": "dynamic",
    "badge": "demo",
    "badgeText": "🎬 动态",
    "image": "l02p-scene-i-am-reading-a-book-in-the-library.jpg",
    "lead": "疑问：Am / Is / Are + 主语 + V-ing？",
    "steps": [
      {
        "html": "<span class=\"l02p-token l02p-token--subj\">Chen Tao</span><span class=\"l02p-token l02p-token--be\">is</span><span class=\"l02p-token l02p-token--verb\">reading</span><span class=\"l02p-token l02p-token--obj\">a book</span>",
        "speak": "Chen Tao is reading a book."
      },
      {
        "html": "<span class=\"l02p-token l02p-token--aux l02p-token--fly\">Is</span><span class=\"l02p-token l02p-token--subj\">Chen Tao</span><span class=\"l02p-token l02p-token--verb\">reading</span><span class=\"l02p-token l02p-token--obj\">a book</span><span class=\"l02p-token\">?</span>",
        "speak": "Is Chen Tao reading a book?"
      }
    ],
    "sentence": "Is Chen Tao reading a book?",
    "zh": "陈涛正在看书吗？"
  },
  {
    "id": "p28",
    "section": "疑问句",
    "title": "例句 · Is ①",
    "type": "scene",
    "badge": "q",
    "badgeText": "❓ 疑问",
    "image": "l02p-scene-is-chen-tao-reading-a-book.jpg",
    "lead": "Is / Are / Am 提到句首",
    "sentence": "Is Chen Tao reading a book?",
    "zh": "陈涛正在看书吗？",
    "verbType": "q",
    "source": "5GA"
  },
  {
    "id": "p29",
    "section": "疑问句",
    "title": "例句 · Are ②",
    "type": "scene",
    "badge": "q",
    "badgeText": "❓ 疑问",
    "image": "l02p-scene-are-you-drawing-a-picture.jpg",
    "lead": "回答：Yes, … is/are. / No, … isn't/aren't.",
    "sentence": "Are you drawing a picture?",
    "zh": "你正在画画吗？",
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
    "image": "l02p-scene-is-chen-tao-reading-a-book.jpg",
    "q": "___ you ___ (read) a book now?",
    "opts": [
      "Do; read",
      "Are; reading",
      "Did; read"
    ],
    "ans": 1,
    "hint": "你现在正在看书吗？",
    "sentence": "Are you reading a book now?",
    "zh": "你现在正在看书吗？",
    "source": "5GA"
  },
  {
    "id": "p31",
    "section": "综合练习",
    "title": "看图造句 ①",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "l02p-scene-chen-tao-is-running-in-the-park.jpg",
    "instruction": "单词已打乱。点选填入空格，组成正确进行时句子：",
    "tokens": [
      "Chen",
      "Tao",
      "is",
      "running",
      "in",
      "the",
      "park"
    ],
    "sentence": "Chen Tao is running in the park.",
    "zh": "陈涛正在公园跑步。"
  },
  {
    "id": "p32",
    "section": "综合练习",
    "title": "听音排序 ①",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l02p-scene-she-is-drawing-a-picture-on-the-blackboard.jpg",
    "audio": "She is drawing a picture on the blackboard.",
    "tokens": [
      "She",
      "is",
      "drawing",
      "a",
      "picture",
      "on",
      "the",
      "blackboard"
    ],
    "sentence": "She is drawing a picture on the blackboard.",
    "zh": "她正在黑板上画画。"
  },
  {
    "id": "p33",
    "section": "综合练习",
    "title": "am/is/are 小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "📝 测试",
    "image": "l02p-scene-i-am-reading-a-book-in-the-library.jpg",
    "q": "Listen! Someone ___ (sing) in the next room.",
    "opts": [
      "sings",
      "is singing",
      "sang"
    ],
    "ans": 1,
    "hint": "听！有人在隔壁房间唱歌。",
    "sentence": "Listen! Someone is singing in the next room.",
    "zh": "听！有人在隔壁房间唱歌。",
    "source": "5GA"
  },
  {
    "id": "p34",
    "section": "综合练习",
    "title": "看图造句 ②",
    "type": "picture-build",
    "badge": "state",
    "badgeText": "🧩 造句",
    "image": "l02p-scene-we-are-having-lunch-in-the-canteen.jpg",
    "instruction": "组成 am/is/are + V-ing 句子：",
    "tokens": [
      "We",
      "are",
      "having",
      "lunch",
      "in",
      "the",
      "canteen"
    ],
    "sentence": "We are having lunch in the canteen.",
    "zh": "我们正在食堂吃午饭。"
  },
  {
    "id": "p35",
    "section": "综合练习",
    "title": "听音排序 ②",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l02p-scene-is-chen-tao-reading-a-book.jpg",
    "audio": "Is Chen Tao reading a book?",
    "tokens": [
      "Is",
      "Chen",
      "Tao",
      "reading",
      "a",
      "book"
    ],
    "sentence": "Is Chen Tao reading a book?",
    "zh": "陈涛正在看书吗？"
  },
  {
    "id": "p36",
    "section": "综合练习",
    "title": "终极小测",
    "type": "quiz",
    "badge": "ask",
    "badgeText": "🏆 终极",
    "image": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "q": "Listen! The girls ___ (sing) in the music room.",
    "opts": [
      "sing",
      "are singing",
      "sang"
    ],
    "ans": 1,
    "hint": "听！女孩们正在音乐教室里唱歌。",
    "sentence": "Listen! The girls are singing in the music room.",
    "zh": "听！女孩们正在音乐教室里唱歌。",
    "source": "5GA"
  },
  {
    "id": "p37",
    "section": "课堂练习",
    "title": "课堂练习中心",
    "type": "practice-hub",
    "badge": "game",
    "badgeText": "🎮 练习",
    "image": "l02p-playground.jpg",
    "lead": "选择一种练习模式，巩固现在进行时！语料由 DeepSeek 生成，对齐 5–6 年级 + 小升初。",
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
    "title": "V-ing 词汇卡",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabIng",
    "lead": "点开单词卡片：看例句配图，再做句子排序和看图造句。"
  },
  {
    "id": "p39",
    "section": "词汇拓展",
    "title": "now 标志词",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabMarkers",
    "lead": "点开卡片学习 now / look / listen / at the moment，并可做排序练习。"
  },
  {
    "id": "p40",
    "section": "词汇拓展",
    "title": "状态动词",
    "type": "vocab-cards",
    "badge": "vocab",
    "badgeText": "📖 词汇",
    "pool": "vocabStative",
    "lead": "点开卡片：哪些动词一般不用进行时？"
  },
  {
    "id": "p41",
    "section": "拓展例句",
    "title": "拓展例句 · playing",
    "type": "scene",
    "badge": "state",
    "badgeText": "🏃 V-ing",
    "image": "l02p-scene-he-is-playing-football-on-the-playground.jpg",
    "lead": "be + V-ing · 注意时间标志词 · 5GA",
    "sentence": "He is playing football on the playground.",
    "zh": "他正在操场上踢足球。",
    "verbType": "am-is-are",
    "source": "5GA"
  },
  {
    "id": "p42",
    "section": "拓展例句",
    "title": "拓展例句 · dancing",
    "type": "scene",
    "badge": "state",
    "badgeText": "🏃 V-ing",
    "image": "l02p-scene-they-are-dancing-in-the-music-room.jpg",
    "lead": "be + V-ing · 注意时间标志词 · 5GA",
    "sentence": "They are dancing in the music room.",
    "zh": "他们正在音乐室里跳舞。",
    "verbType": "am-is-are",
    "source": "5GA"
  },
  {
    "id": "p43",
    "section": "拓展例句",
    "title": "拓展例句 · writing",
    "type": "scene",
    "badge": "state",
    "badgeText": "🏃 V-ing",
    "image": "l02p-scene-lily-is-writing-a-letter-to-her-grandma.jpg",
    "lead": "be + V-ing · 注意时间标志词 · 5GA",
    "sentence": "Lily is writing a letter to her grandma.",
    "zh": "莉莉正在给奶奶写信。",
    "verbType": "am-is-are",
    "source": "5GA"
  },
  {
    "id": "p44",
    "section": "拓展例句",
    "title": "拓展例句 · watching",
    "type": "scene",
    "badge": "state",
    "badgeText": "🏃 V-ing",
    "image": "l02p-scene-tom-is-watching-tv-in-the-living-room.jpg",
    "lead": "be + V-ing · 注意时间标志词 · 5GA",
    "sentence": "Tom is watching TV in the living room.",
    "zh": "汤姆正在客厅看电视。",
    "verbType": "am-is-are",
    "source": "5GA"
  },
  {
    "id": "p45",
    "section": "套题练习",
    "title": "课堂套题 ① · am/is/are",
    "type": "multi-quiz",
    "badge": "ask",
    "badgeText": "📝 套题",
    "image": "l02p-am-is-are-chart.jpg",
    "lead": "共 6 题 · am / is / are + V-ing",
    "questions": [
      {
        "q": "My mother ___ (cook) dinner in the kitchen now.",
        "opts": [
          "cooks",
          "is cooking",
          "cooked"
        ],
        "ans": 1
      },
      {
        "q": "Look! The boys ___ (play) football on the playground.",
        "opts": [
          "play",
          "are playing",
          "played"
        ],
        "ans": 1
      },
      {
        "q": "Listen! Someone ___ (sing) in the next room.",
        "opts": [
          "sings",
          "is singing",
          "sang"
        ],
        "ans": 1
      },
      {
        "q": "It's 8 o'clock. The students ___ (have) an English class.",
        "opts": [
          "have",
          "are having",
          "had"
        ],
        "ans": 1
      },
      {
        "q": "Where is Tom? He ___ (swim) in the pool.",
        "opts": [
          "swims",
          "is swimming",
          "swam"
        ],
        "ans": 1
      },
      {
        "q": "Be quiet! The baby ___ (sleep).",
        "opts": [
          "sleeps",
          "is sleeping",
          "slept"
        ],
        "ans": 1
      }
    ]
  },
  {
    "id": "p46",
    "section": "套题练习",
    "title": "课堂套题 ② · 拼写与否定",
    "type": "multi-quiz",
    "badge": "ask",
    "badgeText": "📝 套题",
    "image": "l02p-scene-chen-tao-is-running-in-the-park.jpg",
    "lead": "共 6 题",
    "questions": [
      {
        "q": "Look! The bird is ___ (fly) in the sky.",
        "opts": [
          "fly",
          "flying",
          "flies"
        ],
        "ans": 1
      },
      {
        "q": "He is ___ (run) in the park now.",
        "opts": [
          "run",
          "running",
          "runs"
        ],
        "ans": 1
      },
      {
        "q": "She is ___ (write) a letter to her friend.",
        "opts": [
          "write",
          "writing",
          "writes"
        ],
        "ans": 1
      },
      {
        "q": "He ___ (not watch) TV now. He is reading a book.",
        "opts": [
          "doesn't watch",
          "isn't watching",
          "didn't watch"
        ],
        "ans": 1
      },
      {
        "q": "We ___ (not play) games at the moment.",
        "opts": [
          "don't play",
          "aren't playing",
          "didn't play"
        ],
        "ans": 1
      },
      {
        "q": "The girl ___ (not sing) in the room now.",
        "opts": [
          "doesn't sing",
          "isn't singing",
          "didn't sing"
        ],
        "ans": 1
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
    "image": "l02p-playground.jpg",
    "lead": "共 8 题 · 小升初难度",
    "questions": [
      {
        "q": "Listen! The girls ___ (sing) in the music room.",
        "opts": [
          "sing",
          "are singing",
          "sang"
        ],
        "ans": 1
      },
      {
        "q": "What ___ you ___ (do) now?",
        "opts": [
          "do; do",
          "are; doing",
          "did; do"
        ],
        "ans": 1
      },
      {
        "q": "My father ___ (not work) today. He is at home.",
        "opts": [
          "doesn't work",
          "isn't working",
          "didn't work"
        ],
        "ans": 1
      },
      {
        "q": "Look! The children ___ (climb) the hill.",
        "opts": [
          "climb",
          "are climbing",
          "climbed"
        ],
        "ans": 1
      },
      {
        "q": "___ Tom and Jerry ___ (watch) TV now?",
        "opts": [
          "Do; watch",
          "Are; watching",
          "Did; watch"
        ],
        "ans": 1
      },
      {
        "q": "She ___ (write) an email to her cousin at the moment.",
        "opts": [
          "writes",
          "is writing",
          "wrote"
        ],
        "ans": 1
      },
      {
        "q": "We ___ (not have) lunch now. We are having breakfast.",
        "opts": [
          "don't have",
          "aren't having",
          "didn't have"
        ],
        "ans": 1
      },
      {
        "q": "___ the teacher ___ (talk) to the students?",
        "opts": [
          "Does; talk",
          "Is; talking",
          "Did; talk"
        ],
        "ans": 1
      }
    ]
  },
  {
    "id": "p48",
    "section": "限时挑战",
    "title": "限时 · am/is/are 45秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "pool": "qBeIng",
    "seconds": 45,
    "perQuestion": 10,
    "pass": 4,
    "lead": "每题约 10 秒！"
  },
  {
    "id": "p49",
    "section": "限时挑战",
    "title": "限时 · 拼写 60秒",
    "type": "timed-quiz",
    "badge": "timed",
    "badgeText": "⏱ 限时",
    "pool": "qSpelling",
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
    "title": "连对闯关 · 拼写",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "pool": "qSpelling",
    "target": 5,
    "lead": "连续答对 5 题通关！"
  },
  {
    "id": "p52",
    "section": "连对闯关",
    "title": "连对闯关 · 疑问句",
    "type": "streak-quiz",
    "badge": "game",
    "badgeText": "🔥 连对",
    "pool": "qQuestion",
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
    "image": "l02p-playground.jpg",
    "pairs": [
      {
        "id": 1,
        "english": "I am reading a book",
        "chinese": "我正在读一本书"
      },
      {
        "id": 2,
        "english": "She is singing a song",
        "chinese": "她正在唱一首歌"
      },
      {
        "id": 3,
        "english": "They are playing football",
        "chinese": "他们正在踢足球"
      },
      {
        "id": 4,
        "english": "He is eating an apple",
        "chinese": "他正在吃一个苹果"
      },
      {
        "id": 5,
        "english": "We are watching TV",
        "chinese": "我们正在看电视"
      },
      {
        "id": 6,
        "english": "The cat is sleeping",
        "chinese": "猫正在睡觉"
      },
      {
        "id": 7,
        "english": "I am writing a letter",
        "chinese": "我正在写一封信"
      },
      {
        "id": 8,
        "english": "You are running fast",
        "chinese": "你正在跑得快"
      },
      {
        "id": 9,
        "english": "The dog is barking",
        "chinese": "狗正在叫"
      },
      {
        "id": 10,
        "english": "She is dancing now",
        "chinese": "她正在跳舞"
      },
      {
        "id": 11,
        "english": "He is swimming in the pool",
        "chinese": "他正在游泳池里游泳"
      },
      {
        "id": 12,
        "english": "They are laughing loudly",
        "chinese": "他们正在大声笑"
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
    "image": "l02p-scene-i-am-reading-a-book-in-the-library.jpg"
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
    "image": "l02p-scene-she-is-drawing-a-picture-on-the-blackboard.jpg"
  },
  {
    "id": "p56",
    "section": "课堂游戏",
    "title": "看图造句 ③",
    "type": "picture-build",
    "badge": "action",
    "badgeText": "🧩 造句",
    "image": "l02p-scene-han-lin-is-making-a-model-plane.jpg",
    "instruction": "单词已打乱。点选填入，组成正确句子：",
    "tokens": [
      "Han",
      "Lin",
      "is",
      "making",
      "a",
      "model",
      "plane"
    ],
    "sentence": "Han Lin is making a model plane.",
    "zh": "韩林正在制作一架模型飞机。"
  },
  {
    "id": "p57",
    "section": "课堂游戏",
    "title": "听音排序 ③",
    "type": "listen-order",
    "badge": "sound",
    "badgeText": "🎧 听音",
    "image": "l02p-scene-lily-is-not-sleeping-in-class.jpg",
    "audio": "Lily isn't sleeping in class.",
    "tokens": [
      "Lily",
      "isn't",
      "sleeping",
      "in",
      "class"
    ],
    "sentence": "Lily isn't sleeping in class.",
    "zh": "莉莉没有在课堂上睡觉。"
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
    "image": "l02p-playground.jpg"
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
    "title": "本讲小结 · 现在进行时",
    "type": "summary",
    "badge": "demo",
    "badgeText": "📌 小结",
    "image": "l02p-continuous-vs-simple.jpg",
    "checklist": [
      "时间标志：now / look / listen / at the moment / right now → 现在进行时",
      "结构：I am / He-She-It is / You-We-They are + V-ing",
      "拼写：+ing / 去e+ing / 双写+ing / ie→y+ing",
      "状态动词：like, know, want… 一般不用进行时",
      "否定：isn't / aren't / am not + V-ing",
      "疑问：Am / Is / Are + 主语 + V-ing？"
    ],
    "chant": "Look! I am playing.\\nNow they are singing.\\nShe isn't sleeping —\\nAre you listening?",
    "chantSpeak": "Look! I am playing. Now they are singing. She isn't sleeping. Are you listening?"
  }
];
  global.L02pData = {
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
