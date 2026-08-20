(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "I have already eaten my breakfast.",
      "zh": "我已经吃过早饭了。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "She has not finished her homework yet.",
      "zh": "她还没完成作业。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "We have lived in Chengdu since 2015.",
      "zh": "我们从2015年起就住在成都。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "He has just bought a new football.",
      "zh": "他刚买了一个新足球。",
      "tag": "daily_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "They have visited the panda base twice.",
      "zh": "他们参观过熊猫基地两次。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "I have never seen such a big hotpot.",
      "zh": "我从未见过这么大的火锅。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "My mother has cooked dinner for us.",
      "zh": "我妈妈已经为我们做了晚饭。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The bus has already left.",
      "zh": "公交车已经开走了。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "She has learned English for three years.",
      "zh": "她学英语已经三年了。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Have you ever been to Beijing?",
      "zh": "你去过北京吗？",
      "tag": "exam_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "He has not come back yet.",
      "zh": "他还没回来。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "We have known each other since primary school.",
      "zh": "我们从小学就认识。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "They have already cleaned the library.",
      "zh": "他们已经打扫了图书馆。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "I have read this book before.",
      "zh": "我以前读过这本书。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "She has written three letters so far.",
      "zh": "到目前为止她写了三封信。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Have you finished your homework yet?",
      "zh": "你完成作业了吗？",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "I have just finished my piano lesson.",
      "zh": "我刚上完钢琴课。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "They have played basketball for an hour.",
      "zh": "他们打篮球已经一个小时了。",
      "tag": "writing_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "She has gone to the shop to buy some milk.",
      "zh": "她去商店买牛奶了。",
      "tag": "writing_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "We have seen the new movie already.",
      "zh": "我们已经看过那部新电影了。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "He has never ridden a horse.",
      "zh": "他从未骑过马。",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "My father has worked in this hospital since 2010.",
      "zh": "我父亲从2010年起就在这家医院工作。",
      "tag": "writing_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "The cat has caught a mouse.",
      "zh": "猫已经抓到了一只老鼠。",
      "tag": "writing_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "I have lost my umbrella somewhere.",
      "zh": "我把伞丢在某个地方了。",
      "tag": "writing_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    }
  ],
  "questions": [
    {
      "q": "He has worked here _____ ten years.",
      "opts": [
        "since",
        "for",
        "in"
      ],
      "ans": 1,
      "hint": "for + 时间段。",
      "sentence": "He has worked here for ten years.",
      "zh": "他在这里工作十年了。"
    },
    {
      "q": "She has lived here _____ 2018.",
      "opts": [
        "for",
        "since",
        "at"
      ],
      "ans": 1,
      "hint": "since + 时间点。",
      "sentence": "She has lived here since 2018.",
      "zh": "她从 2018 年起住在这里。"
    },
    {
      "q": "_____ you ever been to Beijing?",
      "opts": [
        "Do",
        "Did",
        "Have"
      ],
      "ans": 2,
      "hint": "经历：Have you ever…?",
      "sentence": "Have you ever been to Beijing?",
      "zh": "你去过北京吗？"
    },
    {
      "q": "I _____ my homework yet.",
      "opts": [
        "haven't finished",
        "didn't finish",
        "don't finish"
      ],
      "ans": 0,
      "hint": "yet 常与完成时否定连用。",
      "sentence": "I haven't finished my homework yet.",
      "zh": "我还没做完作业。"
    },
    {
      "q": "Tom isn't here. He _____ to the library.",
      "opts": [
        "has gone",
        "has been",
        "went"
      ],
      "ans": 0,
      "hint": "has gone to = 去了还没回来。",
      "sentence": "He has gone to the library.",
      "zh": "他去图书馆了。"
    },
    {
      "q": "I _____ my homework already.",
      "opts": [
        "have finished",
        "has finished",
        "finish"
      ],
      "ans": 0,
      "hint": "主语 I 用 have",
      "sentence": "I have finished my homework already.",
      "zh": "我已经完成作业了。"
    },
    {
      "q": "She _____ to the shop.",
      "opts": [
        "has gone",
        "have gone",
        "go"
      ],
      "ans": 0,
      "hint": "主语 she 用 has",
      "sentence": "She has gone to the shop.",
      "zh": "她去商店了。"
    },
    {
      "q": "We _____ in Chengdu since 2010.",
      "opts": [
        "have lived",
        "has lived",
        "live"
      ],
      "ans": 0,
      "hint": "主语 we 用 have",
      "sentence": "We have lived in Chengdu since 2010.",
      "zh": "我们从2010年起就住在成都。"
    },
    {
      "q": "He _____ not finished his homework yet.",
      "opts": [
        "has",
        "have",
        "is"
      ],
      "ans": 0,
      "hint": "主语 he 用 has",
      "sentence": "He has not finished his homework yet.",
      "zh": "他还没完成作业。"
    },
    {
      "q": "They _____ already eaten lunch.",
      "opts": [
        "have",
        "has",
        "are"
      ],
      "ans": 0,
      "hint": "主语 they 用 have",
      "sentence": "They have already eaten lunch.",
      "zh": "他们已经吃过午饭了。"
    },
    {
      "q": "_____ you ever seen a panda?",
      "opts": [
        "Have",
        "Has",
        "Do"
      ],
      "ans": 0,
      "hint": "主语 you 用 have",
      "sentence": "Have you ever seen a panda?",
      "zh": "你见过熊猫吗？"
    },
    {
      "q": "My mother _____ cooked dinner.",
      "opts": [
        "has",
        "have",
        "is"
      ],
      "ans": 0,
      "hint": "my mother 是第三人称单数",
      "sentence": "My mother has cooked dinner.",
      "zh": "我妈妈已经做了晚饭。"
    },
    {
      "q": "The bus _____ already left.",
      "opts": [
        "has",
        "have",
        "is"
      ],
      "ans": 0,
      "hint": "the bus 是单数",
      "sentence": "The bus has already left.",
      "zh": "公交车已经开走了。"
    },
    {
      "q": "I have lived here _____ 2015.",
      "opts": [
        "since",
        "for",
        "at"
      ],
      "ans": 0,
      "hint": "since 接时间点",
      "sentence": "I have lived here since 2015.",
      "zh": "我从2015年起就住在这里。"
    },
    {
      "q": "She has studied English _____ three years.",
      "opts": [
        "for",
        "since",
        "in"
      ],
      "ans": 0,
      "hint": "for 接时间段",
      "sentence": "She has studied English for three years.",
      "zh": "她学英语已经三年了。"
    },
    {
      "q": "He hasn't finished his homework _____.",
      "opts": [
        "yet",
        "already",
        "just"
      ],
      "ans": 0,
      "hint": "否定句用 yet",
      "sentence": "He hasn't finished his homework yet.",
      "zh": "他还没完成作业。"
    },
    {
      "q": "I have _____ seen such a big hotpot.",
      "opts": [
        "never",
        "ever",
        "yet"
      ],
      "ans": 0,
      "hint": "never 表示从未",
      "sentence": "I have never seen such a big hotpot.",
      "zh": "我从未见过这么大的火锅。"
    },
    {
      "q": "Have you _____ been to the Great Wall?",
      "opts": [
        "ever",
        "never",
        "yet"
      ],
      "ans": 0,
      "hint": "疑问句用 ever",
      "sentence": "Have you ever been to the Great Wall?",
      "zh": "你去过长城吗？"
    },
    {
      "q": "They have visited the panda base _____ so far.",
      "opts": [
        "twice",
        "two times ago",
        "yesterday"
      ],
      "ans": 0,
      "hint": "so far 常与现在完成时连用",
      "sentence": "They have visited the panda base twice so far.",
      "zh": "到目前为止他们参观过熊猫基地两次。"
    },
    {
      "q": "I _____ my keys. I can't find them.",
      "opts": [
        "have lost",
        "has lost",
        "lost"
      ],
      "ans": 0,
      "hint": "强调对现在的影响",
      "sentence": "I have lost my keys. I can't find them.",
      "zh": "我把钥匙丢了，找不到了。"
    },
    {
      "q": "She _____ in the library for two hours.",
      "opts": [
        "has studied",
        "have studied",
        "studies"
      ],
      "ans": 0,
      "hint": "主语 she 用 has",
      "sentence": "She has studied in the library for two hours.",
      "zh": "她在图书馆学习两个小时了。"
    },
    {
      "q": "We _____ already eaten dinner.",
      "opts": [
        "have",
        "has",
        "are"
      ],
      "ans": 0,
      "hint": "主语 we 用 have",
      "sentence": "We have already eaten dinner.",
      "zh": "我们已经吃过晚饭了。"
    },
    {
      "q": "The cat _____ caught a mouse.",
      "opts": [
        "has",
        "have",
        "is"
      ],
      "ans": 0,
      "hint": "the cat 是单数",
      "sentence": "The cat has caught a mouse.",
      "zh": "猫抓到了一只老鼠。"
    },
    {
      "q": "I have _____ my umbrella. It's raining.",
      "opts": [
        "lost",
        "lose",
        "losing"
      ],
      "ans": 0,
      "hint": "过去分词 lost",
      "sentence": "I have lost my umbrella. It's raining.",
      "zh": "我把伞丢了，天在下雨。"
    },
    {
      "q": "She has _____ her piano lesson.",
      "opts": [
        "finished",
        "finish",
        "finishes"
      ],
      "ans": 0,
      "hint": "过去分词 finished",
      "sentence": "She has finished her piano lesson.",
      "zh": "她上完钢琴课了。"
    },
    {
      "q": "They have played basketball _____ an hour.",
      "opts": [
        "for",
        "since",
        "in"
      ],
      "ans": 0,
      "hint": "for 接时间段",
      "sentence": "They have played basketball for an hour.",
      "zh": "他们打篮球一个小时了。"
    },
    {
      "q": "My father has worked in this hospital _____ 2010.",
      "opts": [
        "since",
        "for",
        "at"
      ],
      "ans": 0,
      "hint": "since 接时间点",
      "sentence": "My father has worked in this hospital since 2010.",
      "zh": "我父亲从2010年起就在这家医院工作。"
    },
    {
      "q": "I have never _____ a horse.",
      "opts": [
        "ridden",
        "rode",
        "ride"
      ],
      "ans": 0,
      "hint": "过去分词 ridden",
      "sentence": "I have never ridden a horse.",
      "zh": "我从未骑过马。"
    },
    {
      "q": "Have you _____ your homework yet?",
      "opts": [
        "finished",
        "finish",
        "finishes"
      ],
      "ans": 0,
      "hint": "过去分词 finished",
      "sentence": "Have you finished your homework yet?",
      "zh": "你完成作业了吗？"
    },
    {
      "q": "She has _____ to the shop.",
      "opts": [
        "gone",
        "went",
        "goes"
      ],
      "ans": 0,
      "hint": "过去分词 gone",
      "sentence": "She has gone to the shop.",
      "zh": "她去商店了。"
    },
    {
      "q": "We have known each other _____ primary school.",
      "opts": [
        "since",
        "for",
        "from"
      ],
      "ans": 0,
      "hint": "since 接起点",
      "sentence": "We have known each other since primary school.",
      "zh": "我们从小学就认识。"
    },
    {
      "q": "I have read this book _____.",
      "opts": [
        "before",
        "yesterday",
        "last week"
      ],
      "ans": 0,
      "hint": "before 常用于现在完成时",
      "sentence": "I have read this book before.",
      "zh": "我以前读过这本书。"
    }
  ],
  "matchPairs": [
    {
      "en": "have finished",
      "zh": "已经完成"
    },
    {
      "en": "for ten years",
      "zh": "长达十年"
    },
    {
      "en": "since 2018",
      "zh": "自从 2018"
    },
    {
      "en": "yet",
      "zh": "还（否定/疑问）"
    },
    {
      "en": "has gone",
      "zh": "已经去了"
    },
    {
      "en": "have lived",
      "zh": "已经居住"
    },
    {
      "en": "has eaten",
      "zh": "已经吃了"
    },
    {
      "en": "have seen",
      "zh": "已经看见"
    },
    {
      "en": "since 2015",
      "zh": "自从2015年"
    },
    {
      "en": "for three years",
      "zh": "三年了"
    },
    {
      "en": "already",
      "zh": "已经"
    },
    {
      "en": "so far",
      "zh": "到目前为止"
    }
  ],
  "listenPick": [
    {
      "audio": "I have already eaten my breakfast.",
      "opts": [
        "I have already eaten my breakfast.",
        "I have already eat my breakfast.",
        "I has already eaten my breakfast."
      ],
      "ans": 0,
      "hint": "注意 have 和 eaten",
      "zh": "我已经吃过早饭了。",
      "sentence": "I have already eaten my breakfast."
    },
    {
      "audio": "She has not finished her homework yet.",
      "opts": [
        "She has not finished her homework yet.",
        "She have not finished her homework yet.",
        "She has not finish her homework yet."
      ],
      "ans": 0,
      "hint": "主语 she 用 has，yet 用于否定",
      "zh": "她还没完成作业。",
      "sentence": "She has not finished her homework yet."
    },
    {
      "audio": "Have you ever seen a panda?",
      "opts": [
        "Have you ever seen a panda?",
        "Has you ever seen a panda?",
        "Have you ever saw a panda?"
      ],
      "ans": 0,
      "hint": "疑问句用 have，seen 是过去分词",
      "zh": "你见过熊猫吗？",
      "sentence": "Have you ever seen a panda?"
    },
    {
      "audio": "He has worked here for ten years.",
      "opts": [
        "He has worked here for ten years.",
        "He have worked here for ten years.",
        "He has worked here since ten years."
      ],
      "ans": 0,
      "hint": "主语 he 用 has，for 接时间段",
      "zh": "他在这里工作十年了。",
      "sentence": "He has worked here for ten years."
    },
    {
      "audio": "They have already cleaned the library.",
      "opts": [
        "They have already cleaned the library.",
        "They has already cleaned the library.",
        "They have already clean the library."
      ],
      "ans": 0,
      "hint": "主语 they 用 have，cleaned 是过去分词",
      "zh": "他们已经打扫了图书馆。",
      "sentence": "They have already cleaned the library."
    },
    {
      "audio": "I have never seen such a big hotpot.",
      "opts": [
        "I have never seen such a big hotpot.",
        "I have never saw such a big hotpot.",
        "I has never seen such a big hotpot."
      ],
      "ans": 0,
      "hint": "never 用现在完成时，seen 是过去分词",
      "zh": "我从未见过这么大的火锅。",
      "sentence": "I have never seen such a big hotpot."
    },
    {
      "audio": "She has gone to the shop.",
      "opts": [
        "She has gone to the shop.",
        "She have gone to the shop.",
        "She has went to the shop."
      ],
      "ans": 0,
      "hint": "主语 she 用 has，gone 是过去分词",
      "zh": "她去商店了。",
      "sentence": "She has gone to the shop."
    },
    {
      "audio": "We have known each other since primary school.",
      "opts": [
        "We have known each other since primary school.",
        "We has known each other since primary school.",
        "We have know each other since primary school."
      ],
      "ans": 0,
      "hint": "主语 we 用 have，known 是过去分词",
      "zh": "我们从小学就认识。",
      "sentence": "We have known each other since primary school."
    }
  ],
  "builds": [
    {
      "sentence": "She has finished her homework.",
      "zh": "她已经完成了作业。",
      "tokens": [
        "She",
        "has",
        "finished",
        "her",
        "homework"
      ],
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "sentence": "They have played basketball for an hour.",
      "zh": "他们打篮球一个小时了。",
      "tokens": [
        "They",
        "have",
        "played",
        "basketball",
        "for",
        "an",
        "hour"
      ],
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "sentence": "I have lost my umbrella.",
      "zh": "我把伞丢了。",
      "tokens": [
        "I",
        "have",
        "lost",
        "my",
        "umbrella"
      ],
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "sentence": "We have visited the panda base twice.",
      "zh": "我们参观过熊猫基地两次。",
      "tokens": [
        "We",
        "have",
        "visited",
        "the",
        "panda",
        "base",
        "twice"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "He has just bought a new football.",
      "zh": "他刚买了一个新足球。",
      "tokens": [
        "He",
        "has",
        "just",
        "bought",
        "a",
        "new",
        "football"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "sentence": "My mother has cooked dinner.",
      "zh": "我妈妈已经做了晚饭。",
      "tokens": [
        "My",
        "mother",
        "has",
        "cooked",
        "dinner"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);