(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "Look! Tom is playing football in the park.",
      "zh": "看！汤姆正在公园里踢足球。",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "I am reading a book in the library.",
      "zh": "我正在图书馆里看书。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Listen! The birds are singing in the tree.",
      "zh": "听！鸟儿正在树上唱歌。",
      "tag": "daily_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "We are eating hot pot in Chengdu now.",
      "zh": "我们现在正在成都吃火锅。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "My mother is cooking dinner in the kitchen.",
      "zh": "我妈妈正在厨房做晚饭。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The panda is eating bamboo at the zoo.",
      "zh": "熊猫正在动物园吃竹子。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "She is buying an umbrella in the shop.",
      "zh": "她正在商店买雨伞。",
      "tag": "daily_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "He is waiting for the bus at the stop.",
      "zh": "他正在公交站等公交车。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "They are playing basketball on the playground.",
      "zh": "他们正在操场上打篮球。",
      "tag": "exam_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "The teacher is writing on the blackboard.",
      "zh": "老师正在黑板上写字。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The cat is sleeping on the sofa.",
      "zh": "猫正在沙发上睡觉。",
      "tag": "exam_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "It is raining outside now.",
      "zh": "现在外面正在下雨。",
      "tag": "exam_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "The baby is crying because he is hungry.",
      "zh": "婴儿在哭，因为他饿了。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "I am doing my homework at home.",
      "zh": "我正在家里做作业。",
      "tag": "exam_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "Look! The boys are swimming in the pool.",
      "zh": "看！男孩们正在游泳池里游泳。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "She is playing the piano in the music room.",
      "zh": "她正在音乐室弹钢琴。",
      "tag": "exam_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "We are having an English class now.",
      "zh": "我们现在正在上英语课。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The doctor is checking the patient.",
      "zh": "医生正在检查病人。",
      "tag": "writing_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "He is running to school because he is late.",
      "zh": "他正跑向学校，因为他迟到了。",
      "tag": "writing_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "The moon is shining brightly tonight.",
      "zh": "今晚月亮正明亮地照耀着。",
      "tag": "writing_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "They are planting trees in the garden.",
      "zh": "他们正在花园里种树。",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "I am listening to music on my phone.",
      "zh": "我正在用手机听音乐。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "The students are reading English aloud.",
      "zh": "学生们正在大声读英语。",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "We are visiting the panda base in Chengdu.",
      "zh": "我们正在参观成都熊猫基地。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    }
  ],
  "questions": [
    {
      "q": "Listen! Someone _____ at the door.",
      "opts": [
        "knocks",
        "is knocking",
        "knocked"
      ],
      "ans": 1,
      "hint": "Listen! → 进行时。",
      "sentence": "Listen! Someone is knocking at the door.",
      "zh": "听！有人在敲门。"
    },
    {
      "q": "They _____ TV now.",
      "opts": [
        "watch",
        "are watching",
        "watched"
      ],
      "ans": 1,
      "hint": "now → are watching。",
      "sentence": "They are watching TV now.",
      "zh": "他们现在正在看电视。"
    },
    {
      "q": "I _____ a letter at the moment.",
      "opts": [
        "write",
        "am writing",
        "writes"
      ],
      "ans": 1,
      "hint": "at the moment → am writing。",
      "sentence": "I am writing a letter at the moment.",
      "zh": "我此刻正在写信。"
    },
    {
      "q": "_____ you doing your homework?",
      "opts": [
        "Do",
        "Are",
        "Is"
      ],
      "ans": 1,
      "hint": "进行时疑问 Are you + V-ing。",
      "sentence": "Are you doing your homework?",
      "zh": "你在做作业吗？"
    },
    {
      "q": "He _____ football every day, but he _____ it now.",
      "opts": [
        "plays; isn't playing",
        "is playing; doesn't play",
        "play; isn't play"
      ],
      "ans": 0,
      "hint": "习惯一般现在时，此刻进行时否定。",
      "sentence": "He plays football every day, but he isn't playing it now.",
      "zh": "他每天踢球，但现在没在踢。"
    },
    {
      "q": "Look! The children _____ in the playground.",
      "opts": [
        "play",
        "are playing",
        "is playing"
      ],
      "ans": 1,
      "hint": "看到Look，用现在进行时，主语是复数。",
      "sentence": "Look! The children are playing in the playground.",
      "zh": "看！孩子们正在操场上玩。"
    },
    {
      "q": "I _____ a book in the library now.",
      "opts": [
        "am reading",
        "read",
        "is reading"
      ],
      "ans": 0,
      "hint": "主语I用am，现在进行时。",
      "sentence": "I am reading a book in the library now.",
      "zh": "我现在正在图书馆看书。"
    },
    {
      "q": "She _____ an umbrella because it is raining.",
      "opts": [
        "buy",
        "buys",
        "is buying"
      ],
      "ans": 2,
      "hint": "因为下雨，她正在买伞，用is buying。",
      "sentence": "She is buying an umbrella because it is raining.",
      "zh": "因为下雨，她正在买雨伞。"
    },
    {
      "q": "Listen! The birds _____ in the tree.",
      "opts": [
        "sing",
        "are singing",
        "is singing"
      ],
      "ans": 1,
      "hint": "听到动作正在进行，主语复数。",
      "sentence": "Listen! The birds are singing in the tree.",
      "zh": "听！鸟儿正在树上唱歌。"
    },
    {
      "q": "My father _____ his car now.",
      "opts": [
        "washes",
        "is washing",
        "wash"
      ],
      "ans": 1,
      "hint": "now表示现在进行，主语第三人称单数。",
      "sentence": "My father is washing his car now.",
      "zh": "我爸爸正在洗车。"
    },
    {
      "q": "We _____ hot pot in a restaurant at the moment.",
      "opts": [
        "are having",
        "have",
        "is having"
      ],
      "ans": 0,
      "hint": "at the moment用现在进行，主语we。",
      "sentence": "We are having hot pot in a restaurant at the moment.",
      "zh": "我们此刻正在餐馆吃火锅。"
    },
    {
      "q": "The panda _____ bamboo in the zoo.",
      "opts": [
        "eats",
        "is eating",
        "eat"
      ],
      "ans": 1,
      "hint": "熊猫正在吃竹子，用is eating。",
      "sentence": "The panda is eating bamboo in the zoo.",
      "zh": "熊猫正在动物园吃竹子。"
    },
    {
      "q": "They _____ basketball on the playground now.",
      "opts": [
        "play",
        "are playing",
        "is playing"
      ],
      "ans": 1,
      "hint": "主语they复数，用are+现在分词。",
      "sentence": "They are playing basketball on the playground now.",
      "zh": "他们现在正在操场上打篮球。"
    },
    {
      "q": "He _____ for the bus at the stop.",
      "opts": [
        "waits",
        "is waiting",
        "wait"
      ],
      "ans": 1,
      "hint": "他正在等车，用is waiting。",
      "sentence": "He is waiting for the bus at the stop.",
      "zh": "他正在公交站等公交车。"
    },
    {
      "q": "Look! The cat _____ on the sofa.",
      "opts": [
        "sleeps",
        "is sleeping",
        "sleep"
      ],
      "ans": 1,
      "hint": "Look提示正在进行，猫是单数。",
      "sentence": "Look! The cat is sleeping on the sofa.",
      "zh": "看！猫正在沙发上睡觉。"
    },
    {
      "q": "The students _____ an English class now.",
      "opts": [
        "have",
        "are having",
        "is having"
      ],
      "ans": 1,
      "hint": "now用现在进行，主语复数。",
      "sentence": "The students are having an English class now.",
      "zh": "学生们正在上英语课。"
    },
    {
      "q": "I _____ my homework at home.",
      "opts": [
        "am doing",
        "do",
        "is doing"
      ],
      "ans": 0,
      "hint": "主语I用am doing。",
      "sentence": "I am doing my homework at home.",
      "zh": "我正在家里做作业。"
    },
    {
      "q": "It _____ outside, so take an umbrella.",
      "opts": [
        "rains",
        "is raining",
        "rain"
      ],
      "ans": 1,
      "hint": "正在下雨，用is raining。",
      "sentence": "It is raining outside, so take an umbrella.",
      "zh": "外面正在下雨，带把伞。"
    },
    {
      "q": "The doctor _____ the patient now.",
      "opts": [
        "checks",
        "is checking",
        "check"
      ],
      "ans": 1,
      "hint": "医生正在检查病人。",
      "sentence": "The doctor is checking the patient now.",
      "zh": "医生正在检查病人。"
    },
    {
      "q": "She _____ the piano in the music room.",
      "opts": [
        "plays",
        "is playing",
        "play"
      ],
      "ans": 1,
      "hint": "她正在弹钢琴，用is playing。",
      "sentence": "She is playing the piano in the music room.",
      "zh": "她正在音乐室弹钢琴。"
    },
    {
      "q": "We _____ to the panda base in Chengdu.",
      "opts": [
        "go",
        "are going",
        "is going"
      ],
      "ans": 1,
      "hint": "表示正在前往，用are going。",
      "sentence": "We are going to the panda base in Chengdu.",
      "zh": "我们正前往成都熊猫基地。"
    },
    {
      "q": "The moon _____ brightly in the sky.",
      "opts": [
        "shines",
        "is shining",
        "shine"
      ],
      "ans": 1,
      "hint": "月亮正在照耀，用is shining。",
      "sentence": "The moon is shining brightly in the sky.",
      "zh": "月亮在天空中明亮地照耀。"
    },
    {
      "q": "Look! The boys _____ in the pool.",
      "opts": [
        "swim",
        "are swimming",
        "is swimming"
      ],
      "ans": 1,
      "hint": "男孩们正在游泳，复数。",
      "sentence": "Look! The boys are swimming in the pool.",
      "zh": "看！男孩们正在游泳池里游泳。"
    },
    {
      "q": "My mother _____ dinner in the kitchen.",
      "opts": [
        "cooks",
        "is cooking",
        "cook"
      ],
      "ans": 1,
      "hint": "妈妈正在做饭，用is cooking。",
      "sentence": "My mother is cooking dinner in the kitchen.",
      "zh": "我妈妈正在厨房做晚饭。"
    },
    {
      "q": "The teacher _____ on the blackboard.",
      "opts": [
        "writes",
        "is writing",
        "write"
      ],
      "ans": 1,
      "hint": "老师正在写，用is writing。",
      "sentence": "The teacher is writing on the blackboard.",
      "zh": "老师正在黑板上写字。"
    },
    {
      "q": "They _____ trees in the garden now.",
      "opts": [
        "plant",
        "are planting",
        "is planting"
      ],
      "ans": 1,
      "hint": "他们正在种树，复数。",
      "sentence": "They are planting trees in the garden now.",
      "zh": "他们现在正在花园里种树。"
    },
    {
      "q": "I _____ to music on my phone.",
      "opts": [
        "listen",
        "am listening",
        "is listening"
      ],
      "ans": 1,
      "hint": "我正在听音乐。",
      "sentence": "I am listening to music on my phone.",
      "zh": "我正在用手机听音乐。"
    },
    {
      "q": "He _____ to school because he is late.",
      "opts": [
        "runs",
        "is running",
        "run"
      ],
      "ans": 1,
      "hint": "他正在跑，用is running。",
      "sentence": "He is running to school because he is late.",
      "zh": "他正跑向学校，因为他迟到了。"
    },
    {
      "q": "The baby _____ because he is hungry.",
      "opts": [
        "cries",
        "is crying",
        "cry"
      ],
      "ans": 1,
      "hint": "婴儿正在哭，用is crying。",
      "sentence": "The baby is crying because he is hungry.",
      "zh": "婴儿在哭，因为他饿了。"
    },
    {
      "q": "We _____ an English class now.",
      "opts": [
        "have",
        "are having",
        "is having"
      ],
      "ans": 1,
      "hint": "我们正在上课，用are having。",
      "sentence": "We are having an English class now.",
      "zh": "我们现在正在上英语课。"
    },
    {
      "q": "The students _____ English aloud.",
      "opts": [
        "read",
        "are reading",
        "is reading"
      ],
      "ans": 1,
      "hint": "学生们正在朗读，复数。",
      "sentence": "The students are reading English aloud.",
      "zh": "学生们正在大声读英语。"
    },
    {
      "q": "She _____ a book in the library.",
      "opts": [
        "reads",
        "is reading",
        "read"
      ],
      "ans": 1,
      "hint": "她正在看书，用is reading。",
      "sentence": "She is reading a book in the library.",
      "zh": "她正在图书馆看书。"
    },
    {
      "q": "Look! Tom _____ football in the park.",
      "opts": [
        "plays",
        "is playing",
        "play"
      ],
      "ans": 1,
      "hint": "Tom是单数，用is playing。",
      "sentence": "Look! Tom is playing football in the park.",
      "zh": "看！汤姆正在公园里踢足球。"
    }
  ],
  "matchPairs": [
    {
      "en": "am reading",
      "zh": "我正在读"
    },
    {
      "en": "is playing",
      "zh": "正在玩/打"
    },
    {
      "en": "Look!",
      "zh": "看！（标志）"
    },
    {
      "en": "at the moment",
      "zh": "此刻"
    },
    {
      "en": "are eating",
      "zh": "正在吃"
    },
    {
      "en": "is sleeping",
      "zh": "正在睡觉"
    },
    {
      "en": "are running",
      "zh": "正在跑"
    },
    {
      "en": "is writing",
      "zh": "正在写"
    },
    {
      "en": "are singing",
      "zh": "正在唱歌"
    },
    {
      "en": "is buying",
      "zh": "正在买"
    },
    {
      "en": "are having",
      "zh": "正在吃/正在上"
    },
    {
      "en": "is shining",
      "zh": "正在照耀"
    }
  ],
  "listenPick": [
    {
      "audio": "The children are playing in the playground.",
      "opts": [
        "The children are playing in the playground.",
        "The children play in the playground.",
        "The children is playing in the playground."
      ],
      "ans": 0,
      "hint": "注意are和playing。",
      "zh": "孩子们正在操场上玩。",
      "sentence": "The children are playing in the playground."
    },
    {
      "audio": "I am reading a book in the library.",
      "opts": [
        "I am reading a book in the library.",
        "I am read a book in the library.",
        "I is reading a book in the library."
      ],
      "ans": 0,
      "hint": "主语I用am，read变reading。",
      "zh": "我正在图书馆看书。",
      "sentence": "I am reading a book in the library."
    },
    {
      "audio": "She is buying an umbrella in the shop.",
      "opts": [
        "She is buying an umbrella in the shop.",
        "She is buy an umbrella in the shop.",
        "She are buying an umbrella in the shop."
      ],
      "ans": 0,
      "hint": "主语she用is，buy变buying。",
      "zh": "她正在商店买雨伞。",
      "sentence": "She is buying an umbrella in the shop."
    },
    {
      "audio": "The panda is eating bamboo in the zoo.",
      "opts": [
        "The panda is eating bamboo in the zoo.",
        "The panda is eat bamboo in the zoo.",
        "The panda are eating bamboo in the zoo."
      ],
      "ans": 0,
      "hint": "panda单数用is，eat变eating。",
      "zh": "熊猫正在动物园吃竹子。",
      "sentence": "The panda is eating bamboo in the zoo."
    },
    {
      "audio": "We are having hot pot in Chengdu now.",
      "opts": [
        "We are having hot pot in Chengdu now.",
        "We is having hot pot in Chengdu now.",
        "We are have hot pot in Chengdu now."
      ],
      "ans": 0,
      "hint": "主语we用are，have变having。",
      "zh": "我们现在正在成都吃火锅。",
      "sentence": "We are having hot pot in Chengdu now."
    },
    {
      "audio": "He is waiting for the bus at the stop.",
      "opts": [
        "He is waiting for the bus at the stop.",
        "He is wait for the bus at the stop.",
        "He are waiting for the bus at the stop."
      ],
      "ans": 0,
      "hint": "主语he用is，wait变waiting。",
      "zh": "他正在公交站等公交车。",
      "sentence": "He is waiting for the bus at the stop."
    },
    {
      "audio": "They are playing basketball on the playground.",
      "opts": [
        "They are playing basketball on the playground.",
        "They is playing basketball on the playground.",
        "They are play basketball on the playground."
      ],
      "ans": 0,
      "hint": "主语they用are，play变playing。",
      "zh": "他们正在操场上打篮球。",
      "sentence": "They are playing basketball on the playground."
    },
    {
      "audio": "The moon is shining brightly tonight.",
      "opts": [
        "The moon is shining brightly tonight.",
        "The moon is shine brightly tonight.",
        "The moon are shining brightly tonight."
      ],
      "ans": 0,
      "hint": "moon单数用is，shine变shining。",
      "zh": "今晚月亮正明亮地照耀。",
      "sentence": "The moon is shining brightly tonight."
    }
  ],
  "builds": [
    {
      "sentence": "The panda is eating bamboo in the zoo.",
      "zh": "熊猫正在动物园吃竹子。",
      "tokens": [
        "The",
        "panda",
        "is",
        "eating",
        "bamboo",
        "in",
        "the",
        "zoo"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "We are having dinner at home now.",
      "zh": "我们现在正在家里吃晚饭。",
      "tokens": [
        "We",
        "are",
        "having",
        "dinner",
        "at",
        "home",
        "now"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "sentence": "She is buying an umbrella in the shop.",
      "zh": "她正在商店买雨伞。",
      "tokens": [
        "She",
        "is",
        "buying",
        "an",
        "umbrella",
        "in",
        "the",
        "shop"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "sentence": "He is waiting for the bus at the stop.",
      "zh": "他正在公交站等公交车。",
      "tokens": [
        "He",
        "is",
        "waiting",
        "for",
        "the",
        "bus",
        "at",
        "the",
        "stop"
      ],
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "sentence": "The doctor is checking the patient now.",
      "zh": "医生正在检查病人。",
      "tokens": [
        "The",
        "doctor",
        "is",
        "checking",
        "the",
        "patient",
        "now"
      ],
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "sentence": "They are playing basketball on the playground.",
      "zh": "他们正在操场上打篮球。",
      "tokens": [
        "They",
        "are",
        "playing",
        "basketball",
        "on",
        "the",
        "playground"
      ],
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);