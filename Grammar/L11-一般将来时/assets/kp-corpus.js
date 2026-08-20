(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "It will be sunny and warm next Monday.",
      "zh": "下周一将会晴朗又暖和。",
      "tag": "daily_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "We will have a school trip next month.",
      "zh": "下个月我们将有一次学校旅行。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "I will do my homework after dinner.",
      "zh": "晚饭后我会做作业。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "She will go to the library tomorrow.",
      "zh": "她明天将去图书馆。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "They will play basketball on the playground.",
      "zh": "他们将在操场上打篮球。",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "He will buy a panda toy at the shop.",
      "zh": "他将在商店买一个熊猫玩具。",
      "tag": "daily_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "We will eat hot pot in Chengdu next week.",
      "zh": "下周我们将在成都吃火锅。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "I will take an umbrella because it will rain.",
      "zh": "我会带伞，因为要下雨了。",
      "tag": "daily_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "You will pass the exam if you study hard.",
      "zh": "如果你努力学习，你会通过考试。",
      "tag": "exam_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "She will be a doctor when she grows up.",
      "zh": "她长大后将成为一名医生。",
      "tag": "exam_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "We will have an English test next Friday.",
      "zh": "下周五我们将有英语测试。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "He will answer the question in class.",
      "zh": "他将在课堂上回答问题。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "They will listen to the teacher carefully.",
      "zh": "他们将认真听老师讲课。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "I will finish my homework before dinner.",
      "zh": "我会在晚饭前完成作业。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "She will read a book in the library.",
      "zh": "她将在图书馆读书。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "We will learn about pandas next week.",
      "zh": "下周我们将了解熊猫。",
      "tag": "exam_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "I will write a letter to my friend tomorrow.",
      "zh": "明天我将给朋友写信。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "He will draw a picture of the panda.",
      "zh": "他将画一幅熊猫的画。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "They will build a new school next year.",
      "zh": "明年他们将建一所新学校。",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "We will visit the museum next Sunday.",
      "zh": "下周日我们将参观博物馆。",
      "tag": "writing_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "She will sing a song at the party.",
      "zh": "她将在聚会上唱一首歌。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "He will play the piano in the concert.",
      "zh": "他将在音乐会上弹钢琴。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "I will help my mom cook dinner.",
      "zh": "我会帮妈妈做晚饭。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "We will clean the classroom after school.",
      "zh": "放学后我们将打扫教室。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    }
  ],
  "questions": [
    {
      "q": "I _____ thirteen next year.",
      "opts": [
        "am",
        "will be",
        "was"
      ],
      "ans": 1,
      "hint": "next year → will be。",
      "sentence": "I will be thirteen next year.",
      "zh": "我明年就十三岁了。"
    },
    {
      "q": "_____ you come to my party?",
      "opts": [
        "Do",
        "Will",
        "Are"
      ],
      "ans": 1,
      "hint": "将来邀请用 Will you…?",
      "sentence": "Will you come to my party?",
      "zh": "你会来我的聚会吗？"
    },
    {
      "q": "He _____ football tomorrow. （否定）",
      "opts": [
        "won't play",
        "doesn't play",
        "isn't play"
      ],
      "ans": 0,
      "hint": "将来否定 won't + 原形。",
      "sentence": "He won't play football tomorrow.",
      "zh": "他明天不踢足球。"
    },
    {
      "q": "Look at the clouds. It _____ soon.",
      "opts": [
        "rains",
        "will rain",
        "rained"
      ],
      "ans": 1,
      "hint": "soon 将来标志。",
      "sentence": "It will rain soon.",
      "zh": "很快就要下雨了。"
    },
    {
      "q": "We _____ to the museum next Friday.",
      "opts": [
        "go",
        "goes",
        "will go"
      ],
      "ans": 2,
      "hint": "next Friday → will go。",
      "sentence": "We will go to the museum next Friday.",
      "zh": "下周五我们去博物馆。"
    },
    {
      "q": "I _____ a book tomorrow.",
      "opts": [
        "read",
        "reads",
        "reading"
      ],
      "ans": 0,
      "hint": "will 后接动词原形",
      "sentence": "I will read a book tomorrow.",
      "zh": "我明天将读一本书。"
    },
    {
      "q": "She _____ to the park next Sunday.",
      "opts": [
        "go",
        "goes",
        "going"
      ],
      "ans": 0,
      "hint": "will 后接动词原形，不加 -s",
      "sentence": "She will go to the park next Sunday.",
      "zh": "她下周日将去公园。"
    },
    {
      "q": "They _____ a school trip next month.",
      "opts": [
        "have",
        "has",
        "having"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "They will have a school trip next month.",
      "zh": "下个月他们将有一次学校旅行。"
    },
    {
      "q": "It _____ sunny tomorrow.",
      "opts": [
        "will be",
        "will is",
        "is will"
      ],
      "ans": 0,
      "hint": "will be + 形容词",
      "sentence": "It will be sunny tomorrow.",
      "zh": "明天将是晴天。"
    },
    {
      "q": "We _____ basketball after school.",
      "opts": [
        "will play",
        "will plays",
        "will playing"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "We will play basketball after school.",
      "zh": "放学后我们将打篮球。"
    },
    {
      "q": "He _____ his homework tomorrow evening.",
      "opts": [
        "will do",
        "will does",
        "does will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "He will do his homework tomorrow evening.",
      "zh": "他明天晚上将做作业。"
    },
    {
      "q": "_____ you come to my party next week?",
      "opts": [
        "Will",
        "Do",
        "Are"
      ],
      "ans": 0,
      "hint": "一般将来时疑问句用 Will 开头",
      "sentence": "Will you come to my party next week?",
      "zh": "下周你会来我的聚会吗？"
    },
    {
      "q": "She _____ a doctor in the future.",
      "opts": [
        "will be",
        "will is",
        "will are"
      ],
      "ans": 0,
      "hint": "will be + 名词",
      "sentence": "She will be a doctor in the future.",
      "zh": "她将来会成为医生。"
    },
    {
      "q": "They _____ a new library next year.",
      "opts": [
        "will build",
        "will builds",
        "build will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "They will build a new library next year.",
      "zh": "明年他们将建一个新图书馆。"
    },
    {
      "q": "I _____ my grandmother this weekend.",
      "opts": [
        "will visit",
        "will visits",
        "visits will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "I will visit my grandmother this weekend.",
      "zh": "这个周末我将去看望奶奶。"
    },
    {
      "q": "It _____ cold next Monday.",
      "opts": [
        "will be",
        "will is",
        "be will"
      ],
      "ans": 0,
      "hint": "will be + 形容词",
      "sentence": "It will be cold next Monday.",
      "zh": "下周一将会冷。"
    },
    {
      "q": "We _____ a test next Friday.",
      "opts": [
        "will have",
        "will has",
        "has will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "We will have a test next Friday.",
      "zh": "下周五我们将有测试。"
    },
    {
      "q": "He _____ to school by bus tomorrow.",
      "opts": [
        "will go",
        "will goes",
        "goes will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "He will go to school by bus tomorrow.",
      "zh": "他明天将乘公交车去学校。"
    },
    {
      "q": "They _____ hot pot in Chengdu next week.",
      "opts": [
        "will eat",
        "will eats",
        "eat will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "They will eat hot pot in Chengdu next week.",
      "zh": "下周他们将在成都吃火锅。"
    },
    {
      "q": "I _____ a panda at the zoo tomorrow.",
      "opts": [
        "will see",
        "will sees",
        "see will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "I will see a panda at the zoo tomorrow.",
      "zh": "明天我将在动物园看熊猫。"
    },
    {
      "q": "She _____ an umbrella because it will rain.",
      "opts": [
        "will take",
        "will takes",
        "takes will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "She will take an umbrella because it will rain.",
      "zh": "因为要下雨，她会带伞。"
    },
    {
      "q": "We _____ the classroom after school.",
      "opts": [
        "will clean",
        "will cleans",
        "clean will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "We will clean the classroom after school.",
      "zh": "放学后我们将打扫教室。"
    },
    {
      "q": "He _____ a book in the library tomorrow.",
      "opts": [
        "will read",
        "will reads",
        "reads will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "He will read a book in the library tomorrow.",
      "zh": "明天他将在图书馆读书。"
    },
    {
      "q": "They _____ basketball on the playground.",
      "opts": [
        "will play",
        "will plays",
        "play will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "They will play basketball on the playground.",
      "zh": "他们将在操场上打篮球。"
    },
    {
      "q": "I _____ my homework after dinner.",
      "opts": [
        "will do",
        "will does",
        "do will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "I will do my homework after dinner.",
      "zh": "晚饭后我将做作业。"
    },
    {
      "q": "She _____ a song at the party.",
      "opts": [
        "will sing",
        "will sings",
        "sing will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "She will sing a song at the party.",
      "zh": "她将在聚会上唱一首歌。"
    },
    {
      "q": "We _____ a picnic next Saturday.",
      "opts": [
        "will have",
        "will has",
        "has will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "We will have a picnic next Saturday.",
      "zh": "下周六我们将去野餐。"
    },
    {
      "q": "He _____ the piano in the concert.",
      "opts": [
        "will play",
        "will plays",
        "play will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "He will play the piano in the concert.",
      "zh": "他将在音乐会上弹钢琴。"
    },
    {
      "q": "They _____ a new school next year.",
      "opts": [
        "will build",
        "will builds",
        "build will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "They will build a new school next year.",
      "zh": "明年他们将建一所新学校。"
    },
    {
      "q": "I _____ to the shop tomorrow.",
      "opts": [
        "will go",
        "will goes",
        "go will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "I will go to the shop tomorrow.",
      "zh": "明天我将去商店。"
    },
    {
      "q": "It _____ windy next week.",
      "opts": [
        "will be",
        "will is",
        "be will"
      ],
      "ans": 0,
      "hint": "will be + 形容词",
      "sentence": "It will be windy next week.",
      "zh": "下周将刮风。"
    },
    {
      "q": "We _____ a school trip next month.",
      "opts": [
        "will have",
        "will has",
        "has will"
      ],
      "ans": 0,
      "hint": "will 后接原形",
      "sentence": "We will have a school trip next month.",
      "zh": "下个月我们将有一次学校旅行。"
    },
    {
      "q": "She _____ a doctor when she grows up.",
      "opts": [
        "will be",
        "will is",
        "is will"
      ],
      "ans": 0,
      "hint": "will be + 名词",
      "sentence": "She will be a doctor when she grows up.",
      "zh": "她长大后将成为一名医生。"
    }
  ],
  "matchPairs": [
    {
      "en": "will go",
      "zh": "将要去"
    },
    {
      "en": "will be sunny",
      "zh": "将会晴朗"
    },
    {
      "en": "won't",
      "zh": "将不"
    },
    {
      "en": "next week",
      "zh": "下周（标志词）"
    },
    {
      "en": "will have",
      "zh": "将有"
    },
    {
      "en": "will be",
      "zh": "将会是"
    },
    {
      "en": "will play",
      "zh": "将玩"
    },
    {
      "en": "will read",
      "zh": "将读"
    },
    {
      "en": "will eat",
      "zh": "将吃"
    },
    {
      "en": "will see",
      "zh": "将看见"
    },
    {
      "en": "will take",
      "zh": "将带"
    },
    {
      "en": "will clean",
      "zh": "将打扫"
    },
    {
      "en": "will visit",
      "zh": "将参观/拜访"
    }
  ],
  "listenPick": [
    {
      "audio": "I will do my homework after dinner.",
      "opts": [
        "I will do my homework after dinner.",
        "I did my homework after dinner.",
        "I do my homework after dinner."
      ],
      "ans": 0,
      "hint": "听到 will + 原形",
      "zh": "晚饭后我将做作业。",
      "sentence": "I will do my homework after dinner."
    },
    {
      "audio": "She will go to the library tomorrow.",
      "opts": [
        "She will go to the library tomorrow.",
        "She will goes to the library tomorrow.",
        "She goes to the library tomorrow."
      ],
      "ans": 0,
      "hint": "will 后接原形 go",
      "zh": "她明天将去图书馆。",
      "sentence": "She will go to the library tomorrow."
    },
    {
      "audio": "We will have a school trip next month.",
      "opts": [
        "We will have a school trip next month.",
        "We will has a school trip next month.",
        "We have a school trip next month."
      ],
      "ans": 0,
      "hint": "will + have",
      "zh": "下个月我们将有一次学校旅行。",
      "sentence": "We will have a school trip next month."
    },
    {
      "audio": "It will be sunny and warm next Monday.",
      "opts": [
        "It will be sunny and warm next Monday.",
        "It will is sunny and warm next Monday.",
        "It is sunny and warm next Monday."
      ],
      "ans": 0,
      "hint": "will be + 形容词",
      "zh": "下周一将晴朗又暖和。",
      "sentence": "It will be sunny and warm next Monday."
    },
    {
      "audio": "They will play basketball on the playground.",
      "opts": [
        "They will play basketball on the playground.",
        "They will plays basketball on the playground.",
        "They play basketball on the playground."
      ],
      "ans": 0,
      "hint": "will + 原形 play",
      "zh": "他们将在操场上打篮球。",
      "sentence": "They will play basketball on the playground."
    },
    {
      "audio": "He will buy a panda toy at the shop.",
      "opts": [
        "He will buy a panda toy at the shop.",
        "He will buys a panda toy at the shop.",
        "He buys a panda toy at the shop."
      ],
      "ans": 0,
      "hint": "will + 原形 buy",
      "zh": "他将在商店买一个熊猫玩具。",
      "sentence": "He will buy a panda toy at the shop."
    },
    {
      "audio": "We will eat hot pot in Chengdu next week.",
      "opts": [
        "We will eat hot pot in Chengdu next week.",
        "We will eats hot pot in Chengdu next week.",
        "We eat hot pot in Chengdu next week."
      ],
      "ans": 0,
      "hint": "will + 原形 eat",
      "zh": "下周我们将在成都吃火锅。",
      "sentence": "We will eat hot pot in Chengdu next week."
    },
    {
      "audio": "I will take an umbrella because it will rain.",
      "opts": [
        "I will take an umbrella because it will rain.",
        "I will takes an umbrella because it will rain.",
        "I take an umbrella because it will rain."
      ],
      "ans": 0,
      "hint": "will + 原形 take",
      "zh": "我会带伞，因为要下雨。",
      "sentence": "I will take an umbrella because it will rain."
    }
  ],
  "builds": [
    {
      "sentence": "I will go to the zoo tomorrow.",
      "zh": "我明天将去动物园。",
      "tokens": [
        "I",
        "will",
        "go",
        "to",
        "the",
        "zoo",
        "tomorrow"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "She will buy a panda toy at the shop.",
      "zh": "她将在商店买一个熊猫玩具。",
      "tokens": [
        "She",
        "will",
        "buy",
        "a",
        "panda",
        "toy",
        "at",
        "the",
        "shop"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "sentence": "We will have hot pot in Chengdu next week.",
      "zh": "下周我们将在成都吃火锅。",
      "tokens": [
        "We",
        "will",
        "have",
        "hot",
        "pot",
        "in",
        "Chengdu",
        "next",
        "week"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "sentence": "They will play basketball on the playground.",
      "zh": "他们将在操场上打篮球。",
      "tokens": [
        "They",
        "will",
        "play",
        "basketball",
        "on",
        "the",
        "playground"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "sentence": "He will read a book in the library.",
      "zh": "他将在图书馆读书。",
      "tokens": [
        "He",
        "will",
        "read",
        "a",
        "book",
        "in",
        "the",
        "library"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "It will be rainy tomorrow, so take an umbrella.",
      "zh": "明天将下雨，所以带伞。",
      "tokens": [
        "It",
        "will",
        "be",
        "rainy",
        "tomorrow,",
        "so",
        "take",
        "an",
        "umbrella"
      ],
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);