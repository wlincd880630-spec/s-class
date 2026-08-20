(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "I have some apples in my bag.",
      "zh": "我包里有一些苹果。",
      "tag": "daily_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "There is some water on the floor.",
      "zh": "地板上有一些水。",
      "tag": "daily_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "We need some paper for the art class.",
      "zh": "我们需要一些纸来上美术课。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Would you like some juice?",
      "zh": "你想喝点果汁吗？",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "There aren't any students in the library.",
      "zh": "图书馆里没有学生。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Do you have any questions?",
      "zh": "你有什么问题吗？",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "I don't have any money with me.",
      "zh": "我身上没带钱。",
      "tag": "daily_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "There is no milk in the fridge.",
      "zh": "冰箱里没有牛奶。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "She has some friends in Chengdu.",
      "zh": "她在成都有一些朋友。",
      "tag": "exam_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "Is there any tea in the cup?",
      "zh": "杯子里有茶吗？",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "There aren't any buses on Sunday.",
      "zh": "星期天没有公交车。",
      "tag": "exam_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "He doesn't have any brothers.",
      "zh": "他没有兄弟。",
      "tag": "exam_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "No, I don't have any pets.",
      "zh": "不，我没有宠物。",
      "tag": "exam_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "There is no time to play.",
      "zh": "没有时间玩了。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "Do you see any birds in the tree?",
      "zh": "你看到树上有鸟吗？",
      "tag": "exam_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "I have no idea.",
      "zh": "我不知道。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Some students like basketball, others like football.",
      "zh": "一些学生喜欢篮球，其他人喜欢足球。",
      "tag": "writing_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "There isn't any bread for breakfast.",
      "zh": "早餐没有面包了。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "Would you like some hot pot? It's delicious.",
      "zh": "你想吃火锅吗？很好吃。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "No problem is too hard if you try.",
      "zh": "如果你努力，没有问题是太难的。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Any student can join the club.",
      "zh": "任何学生都可以加入俱乐部。",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "There are no pandas in the zoo now.",
      "zh": "现在动物园里没有熊猫。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "I need some help with my homework.",
      "zh": "我需要一些帮助来完成作业。",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "She doesn't have any time for piano practice.",
      "zh": "她没有时间练钢琴。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    }
  ],
  "questions": [
    {
      "q": "She has _____ friends in Chengdu.",
      "opts": [
        "any",
        "some",
        "no a"
      ],
      "ans": 1,
      "hint": "肯定用 some。",
      "sentence": "She has some friends in Chengdu.",
      "zh": "她在成都有一些朋友。"
    },
    {
      "q": "Is there _____ water left?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "疑问用 any。",
      "sentence": "Is there any water left?",
      "zh": "还剩水吗？"
    },
    {
      "q": "There is _____ time to waste.",
      "opts": [
        "any",
        "no",
        "some not"
      ],
      "ans": 1,
      "hint": "no time = not any time。",
      "sentence": "There is no time to waste.",
      "zh": "没有时间可浪费。"
    },
    {
      "q": "Could I have _____ paper, please?",
      "opts": [
        "any",
        "some",
        "no"
      ],
      "ans": 1,
      "hint": "请求可用 some。",
      "sentence": "Could I have some paper, please?",
      "zh": "请给我一些纸好吗？"
    },
    {
      "q": "He didn't buy _____ apples.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定用 any。",
      "sentence": "He didn't buy any apples.",
      "zh": "他没买苹果。"
    },
    {
      "q": "I have _____ apples in my bag.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "I have some apples in my bag.",
      "zh": "我包里有一些苹果。"
    },
    {
      "q": "There isn't _____ milk in the fridge.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "There isn't any milk in the fridge.",
      "zh": "冰箱里没有牛奶。"
    },
    {
      "q": "Do you have _____ questions?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "疑问句用 any。",
      "sentence": "Do you have any questions?",
      "zh": "你有什么问题吗？"
    },
    {
      "q": "There is _____ water in the cup.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There is some water in the cup.",
      "zh": "杯子里有一些水。"
    },
    {
      "q": "I don't have _____ money.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "I don't have any money.",
      "zh": "我没有钱。"
    },
    {
      "q": "There are _____ students in the classroom.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There are some students in the classroom.",
      "zh": "教室里有一些学生。"
    },
    {
      "q": "Would you like _____ tea?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "邀请或建议用 some。",
      "sentence": "Would you like some tea?",
      "zh": "你想喝点茶吗？"
    },
    {
      "q": "There isn't _____ bread on the table.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "There isn't any bread on the table.",
      "zh": "桌子上没有面包。"
    },
    {
      "q": "Is there _____ juice in the fridge?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "疑问句用 any。",
      "sentence": "Is there any juice in the fridge?",
      "zh": "冰箱里有果汁吗？"
    },
    {
      "q": "There are _____ pandas in the zoo.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There are some pandas in the zoo.",
      "zh": "动物园里有一些熊猫。"
    },
    {
      "q": "He doesn't have _____ brothers.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "He doesn't have any brothers.",
      "zh": "他没有兄弟。"
    },
    {
      "q": "There is _____ milk in the fridge.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There is some milk in the fridge.",
      "zh": "冰箱里有一些牛奶。"
    },
    {
      "q": "Do you see _____ birds in the tree?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "疑问句用 any。",
      "sentence": "Do you see any birds in the tree?",
      "zh": "你看到树上有鸟吗？"
    },
    {
      "q": "There are _____ apples on the table.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There are some apples on the table.",
      "zh": "桌子上有一些苹果。"
    },
    {
      "q": "I have _____ questions to ask.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "I have some questions to ask.",
      "zh": "我有一些问题要问。"
    },
    {
      "q": "There isn't _____ water in the bottle.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "There isn't any water in the bottle.",
      "zh": "瓶子里没有水。"
    },
    {
      "q": "Can you give me _____ help?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "请求帮助用 some。",
      "sentence": "Can you give me some help?",
      "zh": "你能给我一些帮助吗？"
    },
    {
      "q": "There are _____ students in the library.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There are some students in the library.",
      "zh": "图书馆里有一些学生。"
    },
    {
      "q": "We don't have _____ time.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "We don't have any time.",
      "zh": "我们没有时间。"
    },
    {
      "q": "There is _____ food in the fridge.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There is some food in the fridge.",
      "zh": "冰箱里有一些食物。"
    },
    {
      "q": "Are there _____ books on the shelf?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "疑问句用 any。",
      "sentence": "Are there any books on the shelf?",
      "zh": "书架上有书吗？"
    },
    {
      "q": "I don't have _____ money for the bus.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "I don't have any money for the bus.",
      "zh": "我没有钱坐公交车。"
    },
    {
      "q": "There is _____ tea in the cup.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There is some tea in the cup.",
      "zh": "杯子里有一些茶。"
    },
    {
      "q": "Would you like _____ hot pot?",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "邀请用 some。",
      "sentence": "Would you like some hot pot?",
      "zh": "你想吃火锅吗？"
    },
    {
      "q": "There aren't _____ buses today.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 1,
      "hint": "否定句用 any。",
      "sentence": "There aren't any buses today.",
      "zh": "今天没有公交车。"
    },
    {
      "q": "I have _____ friends in my class.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "I have some friends in my class.",
      "zh": "我在班上有一些朋友。"
    },
    {
      "q": "There is _____ milk for breakfast.",
      "opts": [
        "some",
        "any",
        "no"
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "sentence": "There is some milk for breakfast.",
      "zh": "早餐有一些牛奶。"
    }
  ],
  "matchPairs": [
    {
      "en": "some tea",
      "zh": "一些茶"
    },
    {
      "en": "any milk",
      "zh": "一些牛奶（否/疑）"
    },
    {
      "en": "no time",
      "zh": "没有时间"
    },
    {
      "en": "Would you like some…?",
      "zh": "想要一些……吗？"
    },
    {
      "en": "some apples",
      "zh": "一些苹果"
    },
    {
      "en": "some friends",
      "zh": "一些朋友"
    },
    {
      "en": "any questions",
      "zh": "一些问题（疑问）"
    },
    {
      "en": "no money",
      "zh": "没有钱"
    },
    {
      "en": "any bread",
      "zh": "一些面包（否定）"
    },
    {
      "en": "no problem",
      "zh": "没问题"
    },
    {
      "en": "some help",
      "zh": "一些帮助"
    }
  ],
  "listenPick": [
    {
      "audio": "I have some apples.",
      "opts": [
        "I have some apples.",
        "I have any apples.",
        "I have no apples."
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "zh": "我有一些苹果。",
      "sentence": "I have some apples."
    },
    {
      "audio": "There isn't any milk.",
      "opts": [
        "There isn't any milk.",
        "There isn't some milk.",
        "There isn't no milk."
      ],
      "ans": 0,
      "hint": "否定句用 any。",
      "zh": "没有牛奶。",
      "sentence": "There isn't any milk."
    },
    {
      "audio": "Do you have any questions?",
      "opts": [
        "Do you have any questions?",
        "Do you have some questions?",
        "Do you have no questions?"
      ],
      "ans": 0,
      "hint": "疑问句用 any。",
      "zh": "你有什么问题吗？",
      "sentence": "Do you have any questions?"
    },
    {
      "audio": "Would you like some tea?",
      "opts": [
        "Would you like some tea?",
        "Would you like any tea?",
        "Would you like no tea?"
      ],
      "ans": 0,
      "hint": "邀请用 some。",
      "zh": "你想喝点茶吗？",
      "sentence": "Would you like some tea?"
    },
    {
      "audio": "There is no milk.",
      "opts": [
        "There is no milk.",
        "There is any milk.",
        "There is some milk."
      ],
      "ans": 0,
      "hint": "no 表示没有。",
      "zh": "没有牛奶。",
      "sentence": "There is no milk."
    },
    {
      "audio": "I don't have any money.",
      "opts": [
        "I don't have any money.",
        "I don't have some money.",
        "I don't have no money."
      ],
      "ans": 0,
      "hint": "否定句用 any。",
      "zh": "我没有钱。",
      "sentence": "I don't have any money."
    },
    {
      "audio": "There are some pandas.",
      "opts": [
        "There are some pandas.",
        "There are any pandas.",
        "There are no pandas."
      ],
      "ans": 0,
      "hint": "肯定句用 some。",
      "zh": "有一些熊猫。",
      "sentence": "There are some pandas."
    },
    {
      "audio": "Is there any juice?",
      "opts": [
        "Is there any juice?",
        "Is there some juice?",
        "Is there no juice?"
      ],
      "ans": 0,
      "hint": "疑问句用 any。",
      "zh": "有果汁吗？",
      "sentence": "Is there any juice?"
    }
  ],
  "builds": [
    {
      "sentence": "I have some apples in my bag.",
      "zh": "我包里有一些苹果。",
      "tokens": [
        "I",
        "have",
        "some",
        "apples",
        "in",
        "my",
        "bag"
      ],
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "sentence": "There isn't any milk in the fridge.",
      "zh": "冰箱里没有牛奶。",
      "tokens": [
        "There",
        "isn't",
        "any",
        "milk",
        "in",
        "the",
        "fridge"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "sentence": "Do you have any questions?",
      "zh": "你有什么问题吗？",
      "tokens": [
        "Do",
        "you",
        "have",
        "any",
        "questions"
      ],
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "sentence": "There are some pandas in the zoo.",
      "zh": "动物园里有一些熊猫。",
      "tokens": [
        "There",
        "are",
        "some",
        "pandas",
        "in",
        "the",
        "zoo"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "I don't have any money.",
      "zh": "我没有钱。",
      "tokens": [
        "I",
        "don't",
        "have",
        "any",
        "money"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "sentence": "Would you like some tea?",
      "zh": "你想喝点茶吗？",
      "tokens": [
        "Would",
        "you",
        "like",
        "some",
        "tea"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);