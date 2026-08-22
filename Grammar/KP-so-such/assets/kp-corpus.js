(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "The box was so heavy that I could not lift it.",
      "zh": "这个箱子太重了，我搬不动。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "It was such a heavy box that I could not lift it.",
      "zh": "这是一个这么重的箱子，我搬不动。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The movie was so boring that I fell asleep.",
      "zh": "电影太无聊了，我都睡着了。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "It was such a boring movie that I fell asleep.",
      "zh": "这是一部这么无聊的电影，我都睡着了。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The soup was so salty that we could not drink it.",
      "zh": "汤太咸了，我们喝不下去。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "It was such a salty soup that we could not drink it.",
      "zh": "这是一碗这么咸的汤，我们喝不下去。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The panda is so cute that everyone loves it.",
      "zh": "这只熊猫太可爱了，每个人都很喜欢。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "It is such a cute panda that everyone loves it.",
      "zh": "这是一只这么可爱的熊猫，每个人都很喜欢。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "He ran so fast that he won the race.",
      "zh": "他跑得那么快，赢得了比赛。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "It was such a fast run that he won the race.",
      "zh": "这是一次这么快的奔跑，他赢得了比赛。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "The book was so interesting that I read it twice.",
      "zh": "这本书太有趣了，我读了两遍。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "It was such an interesting book that I read it twice.",
      "zh": "这是一本这么有趣的书，我读了两遍。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The weather was so nice that we went to the park.",
      "zh": "天气太好了，我们去了公园。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "It was such nice weather that we went to the park.",
      "zh": "这是这么好的天气，我们去了公园。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "The bus was so crowded that we had to stand.",
      "zh": "公交车太挤了，我们只好站着。",
      "tag": "exam_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "It was such a crowded bus that we had to stand.",
      "zh": "这是一辆这么挤的公交车，我们只好站着。",
      "tag": "exam_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "The question was so difficult that nobody could answer it.",
      "zh": "问题太难了，没人能回答。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "It was such a difficult question that nobody could answer it.",
      "zh": "这是一个这么难的问题，没人能回答。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The music was so loud that I could not hear my friend.",
      "zh": "音乐太吵了，我听不见朋友说话。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "It was such loud music that I could not hear my friend.",
      "zh": "这是这么吵的音乐，我听不见朋友说话。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "The apple was so sweet that I ate it all.",
      "zh": "苹果太甜了，我全吃完了。",
      "tag": "writing_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "It was such a sweet apple that I ate it all.",
      "zh": "这是一个这么甜的苹果，我全吃完了。",
      "tag": "writing_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "The rain was so heavy that we took an umbrella.",
      "zh": "雨太大了，我们带了伞。",
      "tag": "writing_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "It was such heavy rain that we took an umbrella.",
      "zh": "这是这么大的雨，我们带了伞。",
      "tag": "writing_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    }
  ],
  "questions": [
    {
      "q": "The box was _____ heavy _____ I couldn't carry it.",
      "opts": [
        "such; that",
        "so; that",
        "so; as"
      ],
      "ans": 1,
      "hint": "so + 形 + that。",
      "sentence": "The box was so heavy that I couldn't carry it.",
      "zh": "箱子太重，我搬不动。"
    },
    {
      "q": "It was _____ weather that we stayed home.",
      "opts": [
        "so bad",
        "such bad",
        "so a bad"
      ],
      "ans": 1,
      "hint": "weather 不可数，such bad weather。",
      "sentence": "It was such bad weather that we stayed home.",
      "zh": "天气那么糟，我们待在家里。"
    },
    {
      "q": "She spoke _____ quietly _____ we couldn't hear her.",
      "opts": [
        "such; that",
        "so; that",
        "too; that"
      ],
      "ans": 1,
      "hint": "so + 副词。",
      "sentence": "She spoke so quietly that we couldn't hear her.",
      "zh": "她说得那么轻，我们听不见。"
    },
    {
      "q": "He is _____ honest boy that we all trust him.",
      "opts": [
        "so",
        "such",
        "such an"
      ],
      "ans": 2,
      "hint": "honest 元音音素 such an。",
      "sentence": "He is such an honest boy that we all trust him.",
      "zh": "他是如此诚实的男孩，我们都信任他。"
    },
    {
      "q": "The problem is so easy that I can work it out. = The problem is _____ easy _____ work out.",
      "opts": [
        "too; to",
        "enough; to",
        "so; to"
      ],
      "ans": 1,
      "hint": "easy enough to。也可 too difficult 相反转换。",
      "sentence": "The problem is easy enough to work out.",
      "zh": "这题足够简单，我能做出来。"
    },
    {
      "q": "The coffee was _____ hot that I burned my tongue.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词 + that",
      "sentence": "The coffee was so hot that I burned my tongue.",
      "zh": "咖啡太烫了，我烫到了舌头。"
    },
    {
      "q": "It was _____ a hot day that we stayed inside.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 1,
      "hint": "such + a + 形容词 + 名词",
      "sentence": "It was such a hot day that we stayed inside.",
      "zh": "这是这么热的一天，我们待在了室内。"
    },
    {
      "q": "The boy is _____ clever that everyone likes him.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The boy is so clever that everyone likes him.",
      "zh": "这个男孩太聪明了，每个人都喜欢他。"
    },
    {
      "q": "He is _____ a clever boy that everyone likes him.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 1,
      "hint": "such + a + 形容词 + 名词",
      "sentence": "He is such a clever boy that everyone likes him.",
      "zh": "他是一个这么聪明的男孩，每个人都喜欢他。"
    },
    {
      "q": "The story was _____ interesting that I told it to my friends.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The story was so interesting that I told it to my friends.",
      "zh": "这个故事太有趣了，我讲给了朋友们听。"
    },
    {
      "q": "It was _____ an interesting story that I told it to my friends.",
      "opts": [
        "so",
        "such",
        "quite"
      ],
      "ans": 1,
      "hint": "such + a/an + 形容词 + 名词",
      "sentence": "It was such an interesting story that I told it to my friends.",
      "zh": "这是一个这么有趣的故事，我讲给了朋友们听。"
    },
    {
      "q": "The car is _____ expensive that we can't buy it.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The car is so expensive that we can't buy it.",
      "zh": "这车太贵了，我们买不起。"
    },
    {
      "q": "It is _____ an expensive car that we can't buy it.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 1,
      "hint": "such + a/an + 形容词 + 名词",
      "sentence": "It is such an expensive car that we can't buy it.",
      "zh": "这是一辆这么贵的车，我们买不起。"
    },
    {
      "q": "The dog was _____ friendly that children all liked it.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The dog was so friendly that children all liked it.",
      "zh": "这只狗太友好了，孩子们都喜欢它。"
    },
    {
      "q": "It was _____ a friendly dog that children all liked it.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 1,
      "hint": "such + a + 形容词 + 名词",
      "sentence": "It was such a friendly dog that children all liked it.",
      "zh": "这是一只这么友好的狗，孩子们都喜欢它。"
    },
    {
      "q": "The test was _____ easy that everyone passed.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The test was so easy that everyone passed.",
      "zh": "考试太简单了，每个人都通过了。"
    },
    {
      "q": "It was _____ an easy test that everyone passed.",
      "opts": [
        "so",
        "such",
        "quite"
      ],
      "ans": 1,
      "hint": "such + a/an + 形容词 + 名词",
      "sentence": "It was such an easy test that everyone passed.",
      "zh": "这是一个这么简单的考试，每个人都通过了。"
    },
    {
      "q": "The food was _____ delicious that we ate everything.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The food was so delicious that we ate everything.",
      "zh": "食物太好吃了，我们全吃光了。"
    },
    {
      "q": "It was _____ delicious food that we ate everything.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 1,
      "hint": "such + 形容词 + 不可数名词",
      "sentence": "It was such delicious food that we ate everything.",
      "zh": "这是这么好吃的食物，我们全吃光了。"
    },
    {
      "q": "The room was _____ dirty that we cleaned it.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The room was so dirty that we cleaned it.",
      "zh": "房间太脏了，我们打扫了它。"
    },
    {
      "q": "It was _____ a dirty room that we cleaned it.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 1,
      "hint": "such + a + 形容词 + 名词",
      "sentence": "It was such a dirty room that we cleaned it.",
      "zh": "这是一个这么脏的房间，我们打扫了它。"
    },
    {
      "q": "The wind was _____ strong that the tree fell.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The wind was so strong that the tree fell.",
      "zh": "风太大了，树倒了。"
    },
    {
      "q": "It was _____ strong wind that the tree fell.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 1,
      "hint": "such + 形容词 + 不可数名词",
      "sentence": "It was such strong wind that the tree fell.",
      "zh": "这是这么大的风，树倒了。"
    },
    {
      "q": "The movie was _____ scary that I closed my eyes.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The movie was so scary that I closed my eyes.",
      "zh": "电影太吓人了，我闭上了眼睛。"
    },
    {
      "q": "It was _____ a scary movie that I closed my eyes.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 1,
      "hint": "such + a + 形容词 + 名词",
      "sentence": "It was such a scary movie that I closed my eyes.",
      "zh": "这是一部这么吓人的电影，我闭上了眼睛。"
    },
    {
      "q": "The teacher spoke _____ fast that I could not follow.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 副词",
      "sentence": "The teacher spoke so fast that I could not follow.",
      "zh": "老师说得太快了，我跟不上。"
    },
    {
      "q": "The boy ran _____ quickly that he won the prize.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 0,
      "hint": "so + 副词",
      "sentence": "The boy ran so quickly that he won the prize.",
      "zh": "男孩跑得太快了，赢得了奖品。"
    },
    {
      "q": "The book was _____ exciting that I could not put it down.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The book was so exciting that I could not put it down.",
      "zh": "这本书太激动人心了，我放不下。"
    },
    {
      "q": "It was _____ an exciting book that I could not put it down.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 1,
      "hint": "such + a/an + 形容词 + 名词",
      "sentence": "It was such an exciting book that I could not put it down.",
      "zh": "这是一本这么激动人心的书，我放不下。"
    },
    {
      "q": "The soup was _____ hot that I waited for it to cool.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The soup was so hot that I waited for it to cool.",
      "zh": "汤太烫了，我等它凉。"
    },
    {
      "q": "It was _____ hot soup that I waited for it to cool.",
      "opts": [
        "so",
        "such",
        "too"
      ],
      "ans": 1,
      "hint": "such + 形容词 + 不可数名词",
      "sentence": "It was such hot soup that I waited for it to cool.",
      "zh": "这是这么烫的汤，我等它凉。"
    },
    {
      "q": "The music was _____ beautiful that I listened again.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "sentence": "The music was so beautiful that I listened again.",
      "zh": "音乐太美了，我又听了一遍。"
    },
    {
      "q": "It was _____ beautiful music that I listened again.",
      "opts": [
        "so",
        "such",
        "very"
      ],
      "ans": 1,
      "hint": "such + 形容词 + 不可数名词",
      "sentence": "It was such beautiful music that I listened again.",
      "zh": "这是这么美的音乐，我又听了一遍。"
    }
  ],
  "matchPairs": [
    {
      "en": "so hot that",
      "zh": "如此热以至于"
    },
    {
      "en": "such a heavy box",
      "zh": "如此重的箱子"
    },
    {
      "en": "such bad weather",
      "zh": "如此糟糕的天气"
    },
    {
      "en": "so quietly that",
      "zh": "如此轻声以至于"
    },
    {
      "en": "such a hot day",
      "zh": "这么热的一天"
    },
    {
      "en": "so fast that",
      "zh": "太快以至于"
    },
    {
      "en": "such a fast runner",
      "zh": "这么快的跑步者"
    },
    {
      "en": "so interesting that",
      "zh": "太有趣以至于"
    },
    {
      "en": "such an interesting book",
      "zh": "这么有趣的一本书"
    },
    {
      "en": "so heavy that",
      "zh": "太重以至于"
    },
    {
      "en": "so crowded that",
      "zh": "太挤以至于"
    },
    {
      "en": "such a crowded bus",
      "zh": "这么挤的一辆公交车"
    }
  ],
  "listenPick": [
    {
      "audio": "The box was so heavy that I could not lift it.",
      "opts": [
        "The box was so heavy that I could not lift it.",
        "The box was such heavy that I could not lift it.",
        "The box was so heavy box that I could not lift it."
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "zh": "这个箱子太重了，我搬不动。",
      "sentence": "The box was so heavy that I could not lift it."
    },
    {
      "audio": "It was such a hot day that we stayed inside.",
      "opts": [
        "It was such a hot day that we stayed inside.",
        "It was so a hot day that we stayed inside.",
        "It was such hot day that we stayed inside."
      ],
      "ans": 0,
      "hint": "such + a + 形容词 + 名词",
      "zh": "这是这么热的一天，我们待在了室内。",
      "sentence": "It was such a hot day that we stayed inside."
    },
    {
      "audio": "The boy is so clever that everyone likes him.",
      "opts": [
        "The boy is so clever that everyone likes him.",
        "The boy is such clever that everyone likes him.",
        "The boy is so clever boy that everyone likes him."
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "zh": "这个男孩太聪明了，每个人都喜欢他。",
      "sentence": "The boy is so clever that everyone likes him."
    },
    {
      "audio": "He is such a clever boy that everyone likes him.",
      "opts": [
        "He is such a clever boy that everyone likes him.",
        "He is so a clever boy that everyone likes him.",
        "He is such clever boy that everyone likes him."
      ],
      "ans": 0,
      "hint": "such + a + 形容词 + 名词",
      "zh": "他是一个这么聪明的男孩，每个人都喜欢他。",
      "sentence": "He is such a clever boy that everyone likes him."
    },
    {
      "audio": "The story was so interesting that I told it to my friends.",
      "opts": [
        "The story was so interesting that I told it to my friends.",
        "The story was such interesting that I told it to my friends.",
        "The story was so interesting story that I told it to my friends."
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "zh": "这个故事太有趣了，我讲给了朋友们听。",
      "sentence": "The story was so interesting that I told it to my friends."
    },
    {
      "audio": "It was such an interesting story that I told it to my friends.",
      "opts": [
        "It was such an interesting story that I told it to my friends.",
        "It was so an interesting story that I told it to my friends.",
        "It was such interesting story that I told it to my friends."
      ],
      "ans": 0,
      "hint": "such + a/an + 形容词 + 名词",
      "zh": "这是一个这么有趣的故事，我讲给了朋友们听。",
      "sentence": "It was such an interesting story that I told it to my friends."
    },
    {
      "audio": "The food was so delicious that we ate everything.",
      "opts": [
        "The food was so delicious that we ate everything.",
        "The food was such delicious that we ate everything.",
        "The food was so delicious food that we ate everything."
      ],
      "ans": 0,
      "hint": "so + 形容词",
      "zh": "食物太好吃了，我们全吃光了。",
      "sentence": "The food was so delicious that we ate everything."
    },
    {
      "audio": "It was such delicious food that we ate everything.",
      "opts": [
        "It was such delicious food that we ate everything.",
        "It was so delicious food that we ate everything.",
        "It was such a delicious food that we ate everything."
      ],
      "ans": 0,
      "hint": "such + 形容词 + 不可数名词",
      "zh": "这是这么好吃的食物，我们全吃光了。",
      "sentence": "It was such delicious food that we ate everything."
    }
  ],
  "builds": [
    {
      "sentence": "The panda was so cute that everyone took photos.",
      "zh": "这只熊猫太可爱了，每个人都拍照。",
      "tokens": [
        "The",
        "panda",
        "was",
        "so",
        "cute",
        "that",
        "everyone",
        "took",
        "photos"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "It was such a cute panda that everyone took photos.",
      "zh": "这是一只这么可爱的熊猫，每个人都拍照。",
      "tokens": [
        "It",
        "was",
        "such",
        "a",
        "cute",
        "panda",
        "that",
        "everyone",
        "took",
        "photos"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "The library was so quiet that I could study well.",
      "zh": "图书馆太安静了，我能好好学习。",
      "tokens": [
        "The",
        "library",
        "was",
        "so",
        "quiet",
        "that",
        "I",
        "could",
        "study",
        "well"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "It was such a quiet library that I could study well.",
      "zh": "这是一个这么安静的图书馆，我能好好学习。",
      "tokens": [
        "It",
        "was",
        "such",
        "a",
        "quiet",
        "library",
        "that",
        "I",
        "could",
        "study",
        "well"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "The basketball game was so exciting that we cheered loudly.",
      "zh": "篮球比赛太激动人心了，我们大声欢呼。",
      "tokens": [
        "The",
        "basketball",
        "game",
        "was",
        "so",
        "exciting",
        "that",
        "we",
        "cheered",
        "loudly"
      ],
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "sentence": "It was such an exciting basketball game that we cheered loudly.",
      "zh": "这是一场这么激动人心的篮球比赛，我们大声欢呼。",
      "tokens": [
        "It",
        "was",
        "such",
        "an",
        "exciting",
        "basketball",
        "game",
        "that",
        "we",
        "cheered",
        "loudly"
      ],
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);