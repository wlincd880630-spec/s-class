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
      { id: 4, sentence: "Water boils at 100°C.", answer: "present_simple", label: "一般现在时" }
    ],
    convert: [
      {
        id: 1,
        from: "She likes English.",
        tasks: [
          { type: "negative", answer: "She doesn't like English.", alts: ["She does not like English."] },
          { type: "yesno", answer: "Does she like English?", alts: [] },
          { type: "wh", answer: "What does she like?", alts: ["What subject does she like?"] }
        ]
      },
      {
        id: 2,
        from: "They are reading books now.",
        tasks: [
          { type: "negative", answer: "They aren't reading books now.", alts: ["They are not reading books now.", "They're not reading books now."] },
          { type: "yesno", answer: "Are they reading books now?", alts: [] },
          { type: "wh", answer: "What are they doing now?", alts: ["What are they reading now?"] }
        ]
      },
      {
        id: 3,
        from: "He went to school by bike yesterday.",
        tasks: [
          { type: "negative", answer: "He didn't go to school by bike yesterday.", alts: ["He did not go to school by bike yesterday."] },
          { type: "yesno", answer: "Did he go to school by bike yesterday?", alts: [] },
          { type: "wh", answer: "How did he go to school yesterday?", alts: ["Where did he go yesterday?"] }
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
    ],
    usageTips: [
      { tense: "一般现在时", use: "习惯、事实、经常发生的动作；标志词：every day / always / usually" },
      { tense: "一般过去时", use: "过去某个时间发生的动作或状态；标志词：yesterday / last week / ago" },
      { tense: "现在进行时", use: "此刻或当前阶段正在进行的动作；标志词：now / look / listen / at the moment" }
    ]
  },

  /* ========== Part 5 完形（语言知识点对齐 set_01） ========== */
  cloze: {
    title: "Shopping Day（语言知识点：shop for / it takes / size / thirsty / on sale / look at / happily / choose / tired / write）",
    passage: [
      "It's the day before school starts. Mum takes her three little boys, Jim, Bob and Tom, shopping _____1_____ clothes and school things. There are so many people in the shopping centre. “Stay with me,” Mum says. But it doesn't _____2_____ a long time for her kids to go here and there.",
      "Jim would like a new shirt, but he doesn't know his _____3_____, so he asks for help. While his mother is trying to ask for a small shirt, Bob goes away. He is _____4_____ and runs to buy three bottles of cola, because they are _____5_____ sale. While Bob is _____6_____ a pair of shoes, Mum can't find Tom. He sees his classmate Jack _____7_____ so he goes to talk with him. While Tom is _____8_____ a schoolbag from different colours, Mum can't find Jim and Bob, either. They drink too much cola and go to the bathroom.",
      "It's seven when they get home. Mum is really _____9_____. She gets a pen and then _____10_____ one rule on the list of “Family Rules” — Shop with one boy each time."
    ],
    items: [
      { n: 1, options: ["for", "and", "so", "or"], answer: 0, point: "shop for = 为买……而购物" },
      { n: 2, options: ["cost", "take", "pay", "spend"], answer: 1, point: "It takes ... to do；否定 doesn't take" },
      { n: 3, options: ["size", "colour", "favorite", "price"], answer: 0, point: "不知道衣服尺码 size" },
      { n: 4, options: ["hungry", "thirsty", "angry", "sad"], answer: 1, point: "买可乐 → 口渴 thirsty" },
      { n: 5, options: ["for", "in", "on", "at"], answer: 2, point: "on sale = 打折" },
      { n: 6, options: ["looking at", "looking for", "looking after", "looking into"], answer: 0, point: "look at = 看眼前的东西" },
      { n: 7, options: ["sadly", "quickly", "happily", "easily"], answer: 2, point: "happy → happily（副词）" },
      { n: 8, options: ["taking", "choosing", "showing", "finding"], answer: 1, point: "choose A from B = 挑选" },
      { n: 9, options: ["silly", "lonely", "tired", "afraid"], answer: 3, point: "走散后妈妈担心 afraid（后怕）" },
      { n: 10, options: ["collects", "gets", "says", "writes"], answer: 3, point: "拿笔写下 write" }
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
      instruction: "根据世界地图，将下列沙漠名称填入对应编号位置（部分地图已标注，请核对并补全答案）。",
      slots: [
        { code: "A", name: "Sahara", nameZh: "撒哈拉", region: "Northern Africa" },
        { code: "B", name: "Arabian", nameZh: "阿拉伯沙漠", region: "Southwestern Asia" },
        { code: "C", name: "Gobi", nameZh: "戈壁", region: "Mongolia & China" },
        { code: "D", name: "Kalahari", nameZh: "卡拉哈里", region: "Southwestern Africa" },
        { code: "E", name: "Antarctic Ice Sheet", nameZh: "南极冰盖", region: "Antarctica" }
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
      { id: 2, stem: "There are many ______ (different) between the two pictures.", answer: "differences" },
      { id: 3, stem: "My father ______ (buy) a new fishing rod last week.", answer: "bought" },
      { id: 4, stem: "Look! Tom ______ (choose) a red schoolbag now.", answer: "is choosing" }
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
        blanks: ["How much", "pay"],
        optionsBank: ["How much", "How many", "pay", "spend", "cost", "What"]
      }
    ],
    writing: {
      prompt: "写一段 40–60 词的短文：介绍你的一位新同学（classmate）。至少包含：名字、爱好（hobby）、你们一起做的一件事，并用上一般现在时。",
      checklist: ["用一般现在时", "提到 hobby / activity", "至少 4 句", "注意第三人称单数"]
    }
  }
};
