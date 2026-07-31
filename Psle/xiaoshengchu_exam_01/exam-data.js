/**
 * 小升初英语入学综合测试 · 题库
 * Unit 1–2 词汇 + cost/pay/spend/take + 时态 + PSLE 完形知识点 + 沙漠通识
 */
window.EXAM_DATA = {
  meta: {
    title: "小升初英语入学综合测试",
    subtitle: "S-Class · 七年级衔接卷",
    fullScore: 100,
    timeMinutes: 90,
    notice: [
      "本卷含听力听写、语法、完形、通识与看图写话等题型，请按要求作答。",
      "听写部分请先看图，再点击喇叭听慢速英音（可重复播放）。",
      "客观题可自动评分；看图造句与写作请对照参考答案自评或交老师批改。",
      "导出 PDF：点击「打印 / 导出 PDF」→ 目标选「另存为 PDF」→ 缩放 100%、边距默认或无。"
    ]
  },

  /* ========== Part 1 看图听写（与 Part2 例句不重复） ========== */
  dictation: [
    { id: 1, word: "classmate", cn: "同班同学", img: "images/dict-classmate.jpg", unit: 1 },
    { id: 2, word: "guitar", cn: "吉他", img: "images/dict-guitar.jpg", unit: 1 },
    { id: 3, word: "parrot", cn: "鹦鹉", img: "images/dict-parrot.jpg", unit: 1 },
    { id: 4, word: "hobby", cn: "爱好", img: "images/dict-hobby.jpg", unit: 1 },
    { id: 5, word: "twin", cn: "双胞胎（之一）", img: "images/dict-twin.jpg", unit: 1 },
    { id: 6, word: "violin", cn: "小提琴", img: "images/dict-violin.jpg", unit: 2 },
    { id: 7, word: "chess", cn: "国际象棋", img: "images/dict-chess.jpg", unit: 2 },
    { id: 8, word: "hat", cn: "帽子", img: "images/dict-hat.jpg", unit: 2 },
    { id: 9, word: "hike", cn: "远足；徒步", img: "images/dict-hike.jpg", unit: 2 },
    { id: 10, word: "tennis", cn: "网球", img: "images/dict-tennis.jpg", unit: 1 }
  ],

  /* ========== Part 2 句子排序（例句不含听写重点词） ========== */
  scramble: [
    { id: 1, words: ["It", "is", "easy", "to", "make", "friends", "in", "a", "new", "class", "."], answer: "It is easy to make friends in a new class.", cn: "在新班级里交朋友很容易。" },
    { id: 2, words: ["I", "want", "to", "get", "to", "know", "this", "new", "school", "better", "."], answer: "I want to get to know this new school better.", cn: "我想更好地了解这所新学校。" },
    { id: 3, words: ["Please", "write", "your", "full", "name", "on", "the", "top", "line", "."], answer: "Please write your full name on the top line.", cn: "请把你的全名写在最上行。" },
    { id: 4, words: ["I", "made", "a", "mistake", "in", "my", "homework", "last", "night", "."], answer: "I made a mistake in my homework last night.", cn: "昨晚我在作业里犯了一个错误。" },
    { id: 5, words: ["China", "is", "a", "large", "country", "with", "a", "long", "history", "."], answer: "China is a large country with a long history.", cn: "中国是一个历史悠久的大国。" },
    { id: 6, words: ["I", "spend", "two", "hours", "on", "my", "homework", "every", "night", "."], answer: "I spend two hours on my homework every night.", cn: "我每晚花两小时做家庭作业。" },
    { id: 7, words: ["I", "read", "English", "stories", "every", "day", "after", "school", "."], answer: "I read English stories every day after school.", cn: "我每天下午放学后读英语故事。" },
    { id: 8, words: ["We", "can", "put", "the", "books", "together", "on", "the", "shelf", "."], answer: "We can put the books together on the shelf.", cn: "我们可以把书一起放在架子上。" },
    { id: 9, words: ["We", "always", "have", "fun", "at", "the", "weekend", "market", "."], answer: "We always have fun at the weekend market.", cn: "我们在周末集市上总是玩得很开心。" },
    { id: 10, words: ["What", "does", "this", "sign", "mean", "?"], answer: "What does this sign mean?", cn: "这个标志是什么意思？" }
  ],

  /* ========== Part 3 cost / pay / spend / take + 价格询问 ========== */
  moneyGrammar: {
    choose: [
      {
        id: 1,
        stem: "The schoolbag ______ 80 yuan.",
        options: ["costs", "pays", "spends", "takes"],
        answer: 0,
        explain: "物作主语用 cost。"
      },
      {
        id: 2,
        stem: "I ______ 50 yuan for this book yesterday.",
        options: ["cost", "paid", "spent", "took"],
        answer: 1,
        explain: "人 + pay + 钱 + for + 物。"
      },
      {
        id: 3,
        stem: "She ______ a lot of money on clothes every year.",
        options: ["costs", "pays", "spends", "takes"],
        answer: 2,
        explain: "spend ... on sth."
      },
      {
        id: 4,
        stem: "He spends two hours ______ English every evening.",
        options: ["read", "to read", "reading", "reads"],
        answer: 2,
        explain: "spend + 时间 + doing sth."
      },
      {
        id: 5,
        stem: "It ______ me fifteen minutes to walk to school.",
        options: ["costs", "pays", "spends", "takes"],
        answer: 3,
        explain: "It takes sb. + 时间 + to do."
      },
      {
        id: 6,
        stem: "—______ is the price of this pen? —Ten yuan.",
        options: ["How many", "How much", "What", "Which"],
        answer: 2,
        explain: "What is the price ...？"
      }
    ],
    rewrite: [
      {
        id: 1,
        prompt: "The bike costs 300 yuan. → I ______ 300 yuan ______ the bike.",
        answer: ["paid", "for"],
        accept: [["paid", "for"], ["pay", "for"]]
      },
      {
        id: 2,
        prompt: "I spent 20 minutes on the exercise. → It ______ me 20 minutes ______ do the exercise.",
        answer: ["took", "to"],
        accept: [["took", "to"], ["takes", "to"]]
      },
      {
        id: 3,
        prompt: "How much is the T-shirt? → How much ______ the T-shirt ______?",
        answer: ["does", "cost"],
        accept: [["does", "cost"]]
      }
    ]
  },

  /* ========== Part 4 时态 ========== */
  tenses: {
    classify: [
      { id: 1, sentence: "She plays the piano every day.", answer: "present_simple", label: "一般现在时" },
      { id: 2, sentence: "They visited the Great Wall last Sunday.", answer: "past_simple", label: "一般过去时" },
      { id: 3, sentence: "Look! The boys are playing ping-pong.", answer: "present_continuous", label: "现在进行时" },
      { id: 4, sentence: "Water boils at 100°C.", answer: "present_simple", label: "一般现在时" },
      { id: 5, sentence: "The mountain cabin is cold in winter.", answer: "present_simple", label: "一般现在时" },
      { id: 6, sentence: "The river was frozen last January.", answer: "past_simple", label: "一般过去时" }
    ],
    convert: [
      {
        id: 1,
        kind: "action",
        kindLabel: "动作句 · 一般现在时",
        from: "Mr. Brown grows fresh vegetables on his farm every spring.",
        underline: "on his farm",
        tasks: [
          {
            type: "negative",
            answer: "Mr. Brown doesn't grow fresh vegetables on his farm every spring.",
            alts: ["Mr. Brown does not grow fresh vegetables on his farm every spring."]
          },
          {
            type: "yesno",
            answer: "Does Mr. Brown grow fresh vegetables on his farm every spring?",
            alts: []
          },
          {
            type: "wh",
            askAbout: "对划线部分提问（地点：on his farm）",
            answer: "Where does Mr. Brown grow fresh vegetables every spring?",
            alts: []
          }
        ]
      },
      {
        id: 2,
        kind: "action",
        kindLabel: "动作句 · 现在进行时",
        from: "The farmers are collecting honey from the beehives near the river.",
        underline: "honey",
        tasks: [
          {
            type: "negative",
            answer: "The farmers aren't collecting honey from the beehives near the river.",
            alts: [
              "The farmers are not collecting honey from the beehives near the river.",
              "They're not collecting honey from the beehives near the river."
            ]
          },
          {
            type: "yesno",
            answer: "Are the farmers collecting honey from the beehives near the river?",
            alts: []
          },
          {
            type: "wh",
            askAbout: "对划线部分提问（宾语：honey）",
            answer: "What are the farmers collecting from the beehives near the river?",
            alts: []
          }
        ]
      },
      {
        id: 3,
        kind: "action",
        kindLabel: "动作句 · 一般过去时",
        from: "Uncle Tom built a small wooden boat for the children last summer.",
        underline: "last summer",
        tasks: [
          {
            type: "negative",
            answer: "Uncle Tom didn't build a small wooden boat for the children last summer.",
            alts: ["Uncle Tom did not build a small wooden boat for the children last summer."]
          },
          {
            type: "yesno",
            answer: "Did Uncle Tom build a small wooden boat for the children last summer?",
            alts: []
          },
          {
            type: "wh",
            askAbout: "对划线部分提问（时间：last summer）",
            answer: "When did Uncle Tom build a small wooden boat for the children?",
            alts: []
          }
        ]
      },
      {
        id: 4,
        kind: "state",
        kindLabel: "状态句 · 一般现在时（be）",
        from: "The mountain cabin is cold in winter.",
        underline: "in winter",
        tasks: [
          {
            type: "negative",
            answer: "The mountain cabin isn't cold in winter.",
            alts: [
              "The mountain cabin is not cold in winter.",
              "The mountain cabin's not cold in winter."
            ]
          },
          {
            type: "yesno",
            answer: "Is the mountain cabin cold in winter?",
            alts: []
          },
          {
            type: "wh",
            askAbout: "对划线部分提问（时间：in winter）",
            answer: "When is the mountain cabin cold?",
            alts: []
          }
        ]
      },
      {
        id: 5,
        kind: "state",
        kindLabel: "状态句 · 一般过去时（be）",
        from: "The river was frozen last January.",
        underline: "last January",
        tasks: [
          {
            type: "negative",
            answer: "The river wasn't frozen last January.",
            alts: ["The river was not frozen last January."]
          },
          {
            type: "yesno",
            answer: "Was the river frozen last January?",
            alts: []
          },
          {
            type: "wh",
            askAbout: "对划线部分提问（时间：last January）",
            answer: "When was the river frozen?",
            alts: []
          }
        ]
      }
    ],
    tenseShift: [
      {
        id: 1,
        prompt: "把一般现在时改为现在进行时：She does her homework. → She ______ her homework now.",
        answer: "is doing",
        alts: ["is doing"]
      },
      {
        id: 2,
        prompt: "把一般现在时改为一般过去时：They play football every Sunday. → They ______ football last Sunday.",
        answer: "played",
        alts: ["played"]
      },
      {
        id: 3,
        prompt: "把现在进行时改为一般过去时：He is writing a letter. → He ______ a letter yesterday.",
        answer: "wrote",
        alts: ["wrote"]
      }
    ],
    /* 状态句 be 动词填空（一般现在 / 一般过去；语境独立：博物馆/桥/影院/机场/海/城堡） */
    stateFill: [
      {
        id: 1,
        prompt: "一般现在时（状态）：The city museum ______ free on Mondays.",
        answer: "is",
        alts: []
      },
      {
        id: 2,
        prompt: "一般过去时（状态）：The old bridge ______ dangerous after the storm.",
        answer: "was",
        alts: []
      },
      {
        id: 3,
        prompt: "状态句否定：The cinema is open tonight. → The cinema ______ open tonight.",
        answer: "isn't",
        alts: ["is not", "isn't"]
      },
      {
        id: 4,
        prompt: "状态句一般疑问：The airport was busy yesterday morning. → ______ the airport busy yesterday morning?",
        answer: "Was",
        alts: ["was", "Was"]
      },
      {
        id: 5,
        prompt: "状态句时态转换：The sea is calm this morning. → The sea ______ calm yesterday morning.",
        answer: "was",
        alts: []
      },
      {
        id: 6,
        prompt: "状态句特殊疑问（对划线部分提问）：The castle is famous for its tower. → ______ is the castle famous for?",
        answer: "What",
        alts: ["what", "What"]
      }
    ],
    irregular: [
      { base: "go", past: "went", cn: "去" },
      { base: "see", past: "saw", cn: "看见" },
      { base: "take", past: "took", cn: "拿；花费" },
      { base: "make", past: "made", cn: "制作" },
      { base: "come", past: "came", cn: "来" },
      { base: "write", past: "wrote", cn: "写" },
      { base: "read", past: "read", cn: "读（过去式发音 /red/）" },
      { base: "buy", past: "bought", cn: "买" },
      { base: "spend", past: "spent", cn: "花费" },
      { base: "have", past: "had", cn: "有；吃" }
    ]
  },

  /* ========== Part 5 完形（原创短文，融入七上 Unit1–2 词汇与花费句型） ========== */
  cloze: {
    title: "A Weekend Hiking Club",
    passage: [
      "Last Saturday, Lucy joined a hiking club near the hills. She wanted to _____1_____ new friends and get to know more about outdoor life. Each trip _____2_____ only twenty yuan, so it was not expensive for her family.",
      "It _____3_____ the members about two hours to walk to the top of the hill. On the way, Lucy _____4_____ a warm hat under a tree and gave it back to a boy. The boy smiled and said, “Thank you! My twin sister made it for me.”",
      "At noon, everyone sat _____5_____ and shared lunch. Lucy's classmate Ben played a short song on his violin. Some children were _____6_____ chess under a big tree. Others were talking _____7_____ about their hobbies.",
      "Lucy _____8_____ three hours on the trip, but she didn't feel tired. “This activity is really _____9_____ from my usual weekends,” she said. “I hope I can come here every month and _____10_____ fun with you all.”"
    ],
    items: [
      { n: 1, options: ["make", "take", "pay", "spend"], answer: 0, point: "make friends = 交朋友" },
      { n: 2, options: ["costs", "pays", "spends", "takes"], answer: 0, point: "物作主语用 cost" },
      { n: 3, options: ["took", "spent", "paid", "cost"], answer: 0, point: "It took sb. + 时间 + to do" },
      { n: 4, options: ["looked for", "looked at", "found", "chose"], answer: 2, point: "捡到/发现用 found；look for 强调寻找过程" },
      { n: 5, options: ["together", "different", "really", "both"], answer: 0, point: "sit together = 坐在一起" },
      { n: 6, options: ["playing", "play", "played", "to play"], answer: 0, point: "were playing：过去进行时" },
      { n: 7, options: ["happily", "happy", "happiness", "happier"], answer: 0, point: "副词 happily 修饰 talking" },
      { n: 8, options: ["spent", "took", "paid", "cost"], answer: 0, point: "sb. spend + 时间 + on sth." },
      { n: 9, options: ["different", "same", "full", "funny"], answer: 0, point: "be different from = 与……不同" },
      { n: 10, options: ["have", "has", "having", "had"], answer: 0, point: "have fun = 玩得开心；与 can 连用用原形" }
    ]
  },

  /* ========== Part 6 沙漠通识 ========== */
  deserts: {
    fill: [
      { id: 1, stem: "Deserts are ______ (干燥的).", answer: "dry", alts: ["arid"], cnHint: "干燥的" },
      { id: 2, stem: "Deserts can be ______ or cold.", answer: "hot", alts: ["warm"], cnHint: "热的" },
      { id: 3, stem: "________ in deserts are sparse.", answer: "Plants", alts: ["Plant", "Vegetation", "Trees"], cnHint: "植物（稀疏）" }
    ],
    mc: [
      {
        id: 1,
        stem: "What is the largest desert on Earth?",
        options: [
          "The Sahara Desert",
          "The Antarctic Ice Sheet",
          "The Arabian Desert",
          "The Gobi Desert"
        ],
        answer: 1,
        explain: "南极冰盖是地球上最大的沙漠（极地沙漠）；撒哈拉是最大的热沙漠。选项极具迷惑性。"
      },
      {
        id: 2,
        stem: "What makes a place a true desert?",
        options: [
          "It is always hot and full of sand.",
          "It gets very little rain (about 25 cm or less a year).",
          "It has no animals at all.",
          "It must be near the equator."
        ],
        answer: 1,
        explain: "沙漠的核心定义是干燥（降水极少），可热可冷。"
      },
      {
        id: 3,
        stem: "Which desert is the largest hot desert?",
        options: [
          "The Arctic",
          "The Gobi",
          "The Sahara",
          "The Antarctic Ice Sheet"
        ],
        answer: 2,
        explain: "撒哈拉是最大热沙漠；南极/北极是极地沙漠。"
      },
      {
        id: 4,
        stem: "The Gobi Desert is mainly in ______.",
        options: [
          "Egypt and Libya",
          "Mongolia and China",
          "Australia",
          "Brazil and Peru"
        ],
        answer: 1,
        explain: "戈壁主要在蒙古与中国。"
      }
    ],
    map: {
      image: "images/world-deserts-map.jpg",
      instruction: "地图上已标出 A–E。选用下方沙漠英文名称，写出每个位置的 Desert（沙漠名）与 Continent（大洲名）。",
      desertBank: ["Sahara", "Arabian", "Gobi", "Kalahari", "Antarctic Ice Sheet"],
      slots: [
        { code: "A", name: "Sahara", nameZh: "撒哈拉", continent: "Africa", continentAlts: ["Africa", "Northern Africa", "North Africa"] },
        { code: "B", name: "Arabian", nameZh: "阿拉伯沙漠", continent: "Asia", continentAlts: ["Asia", "Southwestern Asia", "Southwest Asia", "Western Asia", "West Asia", "Middle East"] },
        { code: "C", name: "Gobi", nameZh: "戈壁", continent: "Asia", continentAlts: ["Asia", "East Asia", "Eastern Asia", "Central Asia"] },
        { code: "D", name: "Kalahari", nameZh: "卡拉哈里", continent: "Africa", continentAlts: ["Africa", "Southern Africa", "South Africa", "Southwestern Africa", "Southwest Africa"] },
        { code: "E", name: "Antarctic Ice Sheet", nameZh: "南极冰盖", continent: "Antarctica", continentAlts: ["Antarctica", "Antarctic", "the Antarctic"] }
      ]
    }
  },

  /* ========== Part 7 看图造句 ========== */
  pictureWriting: [
    { id: 1, img: "images/pic-write-01.jpg", prompt: "看图写 1–2 句：男孩正在______，妈妈______。可用现在进行时。", hints: ["do homework", "bring water"], sample: "The boy is doing his homework. His mother is bringing him a cup of water." },
    { id: 2, img: "images/pic-write-02.jpg", prompt: "看图写 1–2 句：孩子们放学后在______。可用 often / after school。", hints: ["play ping-pong", "after school"], sample: "The children often play ping-pong after school." },
    { id: 3, img: "images/pic-write-03.jpg", prompt: "看图写 1–2 句：女孩在商场______书包，妈妈在旁边。可用 choose / look at。", hints: ["choose", "schoolbag", "shopping centre"], sample: "The girl is choosing a schoolbag in the shopping centre. Her mother is waiting for her." },
    { id: 4, img: "images/pic-write-04.jpg", prompt: "看图写 1–2 句：一家人在吃______。可用 have / hot pot / together。", hints: ["hot pot", "together", "have dinner"], sample: "The family is having hot pot together at home." }
  ],

  /* ========== Part 8 综合加练 ========== */
  extra: {
    reading: {
      title: "A New School Friend",
      passage: "Lily is a new student in Grade 7. On the first day, she wants to make friends. Her classmate Amy shows her around the school. They get to know each other quickly. After school, they play tennis together. Lily says, “I spend a lot of time with Amy every day. School life is full of fun!”",
      questions: [
        {
          id: 1,
          stem: "Lily wants to ______ on the first day.",
          options: ["make friends", "buy a hat", "play chess", "go hiking"],
          answer: 0
        },
        {
          id: 2,
          stem: "Who shows Lily around the school?",
          options: ["Her twin", "Amy", "Her class teacher", "Her husband"],
          answer: 1
        },
        {
          id: 3,
          stem: "They play ______ after school.",
          options: ["violin", "hot pot", "tennis", "guitar"],
          answer: 2
        }
      ]
    },
    wordForm: [
      { id: 1, stem: "The children are singing ______ (happy) at the party.", answer: "happily" },
      { id: 2, stem: "My father ______ (buy) a new fishing rod last week.", answer: "bought" },
      { id: 3, stem: "Look! Tom ______ (choose) a red schoolbag now.", answer: "is choosing" }
    ],
    dialogue: [
      {
        id: 1,
        lines: [
          "A: ______ is this ping-pong bat?",
          "B: It costs 45 yuan.",
          "A: Did you ______ much money for it?",
          "B: No. It was on sale."
        ],
        blanks: ["How much", "pay"]
      }
    ],
    writing: {
      prompt: "写一段 40–60 词的短文：介绍你的一位新同学（classmate）。至少包含：名字、爱好（hobby）、你们一起做的一件事，并用上一般现在时。",
      checklist: ["用一般现在时", "提到 hobby / activity", "至少 4 句", "注意第三人称单数"]
    }
  }
};
