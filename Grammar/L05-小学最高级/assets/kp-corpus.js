(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "Tom is the tallest boy in our class.",
      "zh": "汤姆是我们班最高的男孩。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Yalong Bay is one of the most beautiful beaches in China.",
      "zh": "亚龙湾是中国最美丽的海滩之一。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "This is the biggest panda in the zoo.",
      "zh": "这是动物园里最大的熊猫。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "My mother is the best cook in our family.",
      "zh": "我妈妈是我们家最棒的厨师。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The library is the quietest place in our school.",
      "zh": "图书馆是我们学校最安静的地方。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Winter is the coldest season in Chengdu.",
      "zh": "冬天是成都最冷的季节。",
      "tag": "daily_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "This is the cheapest toy in the shop.",
      "zh": "这是商店里最便宜的玩具。",
      "tag": "daily_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "I think math is the most difficult subject.",
      "zh": "我认为数学是最难的科目。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The Great Wall is one of the greatest wonders in the world.",
      "zh": "长城是世界上最伟大的奇迹之一。",
      "tag": "exam_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "She is the most careful student in our class.",
      "zh": "她是我们班最细心的学生。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "This is the most interesting book in the library.",
      "zh": "这是图书馆里最有趣的书。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The panda is the most popular animal in the zoo.",
      "zh": "熊猫是动物园里最受欢迎的动物。",
      "tag": "exam_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "He is the fastest runner on the playground.",
      "zh": "他是操场上跑得最快的人。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "The red apple is the sweetest of all.",
      "zh": "红苹果是所有苹果中最甜的。",
      "tag": "exam_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "This is the most beautiful picture in the museum.",
      "zh": "这是博物馆里最漂亮的画。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "My brother is the youngest in our family.",
      "zh": "我弟弟是我们家最小的。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The bus is the most convenient way to go to school.",
      "zh": "坐公交是上学最方便的方式。",
      "tag": "writing_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "Chengdu is one of the most liveable cities in China.",
      "zh": "成都是中国最宜居的城市之一。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "The panda is the most famous animal in Sichuan.",
      "zh": "熊猫是四川最著名的动物。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "This is the most delicious hotpot I have ever eaten.",
      "zh": "这是我吃过的最好吃的火锅。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The classroom is the brightest room in our school.",
      "zh": "教室是我们学校最明亮的房间。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "My father is the strongest person in my family.",
      "zh": "我爸爸是我们家最强壮的人。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The piano is the most beautiful instrument in the music room.",
      "zh": "钢琴是音乐教室里最漂亮的乐器。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "The cat is the cutest animal in my house.",
      "zh": "猫是我家最可爱的动物。",
      "tag": "writing_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    }
  ],
  "questions": [
    {
      "q": "This is _____ book in the library.",
      "opts": [
        "the most interesting",
        "more interesting",
        "interesting"
      ],
      "ans": 0,
      "hint": "范围内最……用 the most + 长形容词。",
      "sentence": "This is the most interesting book in the library.",
      "zh": "这是图书馆里最有趣的书。"
    },
    {
      "q": "Winter is _____ season of the year.",
      "opts": [
        "colder",
        "the coldest",
        "coldest"
      ],
      "ans": 1,
      "hint": "of the year 是范围，用 the coldest。",
      "sentence": "Winter is the coldest season of the year.",
      "zh": "冬天是一年中最冷的季节。"
    },
    {
      "q": "She is one of _____ students in Grade Six.",
      "opts": [
        "the best",
        "better",
        "good"
      ],
      "ans": 0,
      "hint": "one of the + 最高级 + 复数。",
      "sentence": "She is one of the best students in Grade Six.",
      "zh": "她是六年级最优秀的学生之一。"
    },
    {
      "q": "Mount Qomolangma is _____ mountain in the world.",
      "opts": [
        "higher",
        "the highest",
        "more high"
      ],
      "ans": 1,
      "hint": "the highest + in the world。",
      "sentence": "Mount Qomolangma is the highest mountain in the world.",
      "zh": "珠穆朗玛峰是世界上最高的山。"
    },
    {
      "q": "Which is _____, spring, summer or winter?",
      "opts": [
        "hot",
        "hotter",
        "the hottest"
      ],
      "ans": 2,
      "hint": "三者选最……用最高级。",
      "sentence": "Which is the hottest, spring, summer or winter?",
      "zh": "春夏冬哪个最热？"
    },
    {
      "q": "This is the _____ book in the library.",
      "opts": [
        "interesting",
        "more interesting",
        "most interesting"
      ],
      "ans": 2,
      "hint": "最高级要用 most + 形容词",
      "sentence": "This is the most interesting book in the library.",
      "zh": "这是图书馆里最有趣的书。"
    },
    {
      "q": "Tom is _____ tallest boy in our class.",
      "opts": [
        "a",
        "an",
        "the"
      ],
      "ans": 2,
      "hint": "最高级前要加 the",
      "sentence": "Tom is the tallest boy in our class.",
      "zh": "汤姆是我们班最高的男孩。"
    },
    {
      "q": "Winter is the _____ season in Chengdu.",
      "opts": [
        "cold",
        "colder",
        "coldest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "Winter is the coldest season in Chengdu.",
      "zh": "冬天是成都最冷的季节。"
    },
    {
      "q": "The panda is the _____ animal in the zoo.",
      "opts": [
        "popular",
        "more popular",
        "most popular"
      ],
      "ans": 2,
      "hint": "多音节形容词用 most",
      "sentence": "The panda is the most popular animal in the zoo.",
      "zh": "熊猫是动物园里最受欢迎的动物。"
    },
    {
      "q": "My mother is the _____ cook in our family.",
      "opts": [
        "good",
        "better",
        "best"
      ],
      "ans": 2,
      "hint": "good 的最高级是 best",
      "sentence": "My mother is the best cook in our family.",
      "zh": "我妈妈是我们家最棒的厨师。"
    },
    {
      "q": "This is the _____ apple of all.",
      "opts": [
        "sweet",
        "sweeter",
        "sweetest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "This is the sweetest apple of all.",
      "zh": "这是所有苹果中最甜的。"
    },
    {
      "q": "The library is the _____ place in our school.",
      "opts": [
        "quiet",
        "quieter",
        "quietest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "The library is the quietest place in our school.",
      "zh": "图书馆是我们学校最安静的地方。"
    },
    {
      "q": "He is the _____ runner on the playground.",
      "opts": [
        "fast",
        "faster",
        "fastest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "He is the fastest runner on the playground.",
      "zh": "他是操场上跑得最快的人。"
    },
    {
      "q": "This is _____ most beautiful picture in the museum.",
      "opts": [
        "a",
        "an",
        "the"
      ],
      "ans": 2,
      "hint": "最高级前用 the",
      "sentence": "This is the most beautiful picture in the museum.",
      "zh": "这是博物馆里最漂亮的画。"
    },
    {
      "q": "My brother is the _____ in our family.",
      "opts": [
        "young",
        "younger",
        "youngest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "My brother is the youngest in our family.",
      "zh": "我弟弟是我们家最小的。"
    },
    {
      "q": "The bus is the _____ way to go to school.",
      "opts": [
        "convenient",
        "more convenient",
        "most convenient"
      ],
      "ans": 2,
      "hint": "多音节用 most",
      "sentence": "The bus is the most convenient way to go to school.",
      "zh": "坐公交是上学最方便的方式。"
    },
    {
      "q": "Chengdu is one of the most _____ cities in China.",
      "opts": [
        "liveable",
        "more liveable",
        "liveable"
      ],
      "ans": 0,
      "hint": "one of + 最高级 + 复数名词，这里用原形",
      "sentence": "Chengdu is one of the most liveable cities in China.",
      "zh": "成都是中国最宜居的城市之一。"
    },
    {
      "q": "The cat is the _____ animal in my house.",
      "opts": [
        "cute",
        "cuter",
        "cutest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "The cat is the cutest animal in my house.",
      "zh": "猫是我家最可爱的动物。"
    },
    {
      "q": "The piano is the _____ instrument in the music room.",
      "opts": [
        "beautiful",
        "more beautiful",
        "most beautiful"
      ],
      "ans": 2,
      "hint": "多音节用 most",
      "sentence": "The piano is the most beautiful instrument in the music room.",
      "zh": "钢琴是音乐教室里最漂亮的乐器。"
    },
    {
      "q": "My father is the _____ person in my family.",
      "opts": [
        "strong",
        "stronger",
        "strongest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "My father is the strongest person in my family.",
      "zh": "我爸爸是我们家最强壮的人。"
    },
    {
      "q": "The classroom is the _____ room in our school.",
      "opts": [
        "bright",
        "brighter",
        "brightest"
      ],
      "ans": 2,
      "hint": "最高级用 -est",
      "sentence": "The classroom is the brightest room in our school.",
      "zh": "教室是我们学校最明亮的房间。"
    },
    {
      "q": "This is the _____ hotpot I have ever eaten.",
      "opts": [
        "delicious",
        "more delicious",
        "most delicious"
      ],
      "ans": 2,
      "hint": "多音节用 most",
      "sentence": "This is the most delicious hotpot I have ever eaten.",
      "zh": "这是我吃过的最好吃的火锅。"
    },
    {
      "q": "The panda is the _____ famous animal in Sichuan.",
      "opts": [
        "most",
        "more",
        "much"
      ],
      "ans": 0,
      "hint": "famous 的最高级用 most",
      "sentence": "The panda is the most famous animal in Sichuan.",
      "zh": "熊猫是四川最著名的动物。"
    },
    {
      "q": "She is the _____ student in our class.",
      "opts": [
        "careful",
        "more careful",
        "most careful"
      ],
      "ans": 2,
      "hint": "多音节用 most",
      "sentence": "She is the most careful student in our class.",
      "zh": "她是我们班最细心的学生。"
    },
    {
      "q": "The Great Wall is one of the greatest _____ in the world.",
      "opts": [
        "wonder",
        "wonders",
        "wondering"
      ],
      "ans": 1,
      "hint": "one of + 最高级 + 复数名词",
      "sentence": "The Great Wall is one of the greatest wonders in the world.",
      "zh": "长城是世界上最伟大的奇迹之一。"
    },
    {
      "q": "My mother is the best cook _____ our family.",
      "opts": [
        "in",
        "on",
        "at"
      ],
      "ans": 0,
      "hint": "范围用 in",
      "sentence": "My mother is the best cook in our family.",
      "zh": "我妈妈是我们家最棒的厨师。"
    },
    {
      "q": "This is the cheapest toy _____ the shop.",
      "opts": [
        "in",
        "of",
        "on"
      ],
      "ans": 0,
      "hint": "范围用 in",
      "sentence": "This is the cheapest toy in the shop.",
      "zh": "这是商店里最便宜的玩具。"
    },
    {
      "q": "The red apple is the sweetest _____ all.",
      "opts": [
        "in",
        "of",
        "at"
      ],
      "ans": 1,
      "hint": "范围用 of",
      "sentence": "The red apple is the sweetest of all.",
      "zh": "红苹果是所有苹果中最甜的。"
    },
    {
      "q": "Winter is the coldest season _____ the year.",
      "opts": [
        "in",
        "of",
        "on"
      ],
      "ans": 1,
      "hint": "范围用 of",
      "sentence": "Winter is the coldest season of the year.",
      "zh": "冬天是一年中最冷的季节。"
    },
    {
      "q": "This is the most interesting book _____ the library.",
      "opts": [
        "in",
        "of",
        "at"
      ],
      "ans": 0,
      "hint": "范围用 in",
      "sentence": "This is the most interesting book in the library.",
      "zh": "这是图书馆里最有趣的书。"
    },
    {
      "q": "Tom is the tallest boy _____ our class.",
      "opts": [
        "in",
        "of",
        "on"
      ],
      "ans": 0,
      "hint": "范围用 in",
      "sentence": "Tom is the tallest boy in our class.",
      "zh": "汤姆是我们班最高的男孩。"
    },
    {
      "q": "She is the most careful student _____ our class.",
      "opts": [
        "in",
        "of",
        "at"
      ],
      "ans": 0,
      "hint": "范围用 in",
      "sentence": "She is the most careful student in our class.",
      "zh": "她是我们班最细心的学生。"
    },
    {
      "q": "The panda is the most popular animal _____ the zoo.",
      "opts": [
        "in",
        "of",
        "on"
      ],
      "ans": 0,
      "hint": "范围用 in",
      "sentence": "The panda is the most popular animal in the zoo.",
      "zh": "熊猫是动物园里最受欢迎的动物。"
    }
  ],
  "matchPairs": [
    {
      "en": "the tallest",
      "zh": "最高的"
    },
    {
      "en": "the most beautiful",
      "zh": "最美的"
    },
    {
      "en": "one of the most",
      "zh": "最……之一"
    },
    {
      "en": "in our class",
      "zh": "在我们班（范围）"
    },
    {
      "en": "the tallest boy",
      "zh": "最高的男孩"
    },
    {
      "en": "the most beautiful beach",
      "zh": "最美丽的海滩"
    },
    {
      "en": "the biggest panda",
      "zh": "最大的熊猫"
    },
    {
      "en": "the best cook",
      "zh": "最棒的厨师"
    },
    {
      "en": "the quietest place",
      "zh": "最安静的地方"
    },
    {
      "en": "the coldest season",
      "zh": "最冷的季节"
    },
    {
      "en": "the cheapest toy",
      "zh": "最便宜的玩具"
    },
    {
      "en": "the most difficult subject",
      "zh": "最难的科目"
    },
    {
      "en": "the fastest runner",
      "zh": "跑得最快的人"
    },
    {
      "en": "the most popular animal",
      "zh": "最受欢迎的动物"
    }
  ],
  "listenPick": [
    {
      "audio": "Tom is the tallest boy in our class.",
      "opts": [
        "Tom is the tallest boy in our class.",
        "Tom is the taller boy in our class.",
        "Tom is a tall boy in our class."
      ],
      "ans": 0,
      "hint": "注意最高级 the tallest",
      "zh": "汤姆是我们班最高的男孩。",
      "sentence": "Tom is the tallest boy in our class."
    },
    {
      "audio": "This is the most interesting book in the library.",
      "opts": [
        "This is the most interesting book in the library.",
        "This is the more interesting book in the library.",
        "This is the most interesting book in the classroom."
      ],
      "ans": 0,
      "hint": "注意 most interesting",
      "zh": "这是图书馆里最有趣的书。",
      "sentence": "This is the most interesting book in the library."
    },
    {
      "audio": "The panda is the most popular animal in the zoo.",
      "opts": [
        "The panda is the most popular animal in the zoo.",
        "The panda is the more popular animal in the zoo.",
        "The panda is the most popular animal in the park."
      ],
      "ans": 0,
      "hint": "注意 most popular",
      "zh": "熊猫是动物园里最受欢迎的动物。",
      "sentence": "The panda is the most popular animal in the zoo."
    },
    {
      "audio": "My mother is the best cook in our family.",
      "opts": [
        "My mother is the best cook in our family.",
        "My mother is the better cook in our family.",
        "My mother is a good cook in our family."
      ],
      "ans": 0,
      "hint": "注意 best",
      "zh": "我妈妈是我们家最棒的厨师。",
      "sentence": "My mother is the best cook in our family."
    },
    {
      "audio": "Winter is the coldest season in Chengdu.",
      "opts": [
        "Winter is the coldest season in Chengdu.",
        "Winter is the colder season in Chengdu.",
        "Winter is the coldest season in Beijing."
      ],
      "ans": 0,
      "hint": "注意 coldest",
      "zh": "冬天是成都最冷的季节。",
      "sentence": "Winter is the coldest season in Chengdu."
    },
    {
      "audio": "He is the fastest runner on the playground.",
      "opts": [
        "He is the fastest runner on the playground.",
        "He is the faster runner on the playground.",
        "He is the fastest runner in the classroom."
      ],
      "ans": 0,
      "hint": "注意 fastest",
      "zh": "他是操场上跑得最快的人。",
      "sentence": "He is the fastest runner on the playground."
    },
    {
      "audio": "This is the most delicious hotpot I have ever eaten.",
      "opts": [
        "This is the most delicious hotpot I have ever eaten.",
        "This is the more delicious hotpot I have ever eaten.",
        "This is the most delicious hotpot I have ever cooked."
      ],
      "ans": 0,
      "hint": "注意 most delicious",
      "zh": "这是我吃过的最好吃的火锅。",
      "sentence": "This is the most delicious hotpot I have ever eaten."
    },
    {
      "audio": "The library is the quietest place in our school.",
      "opts": [
        "The library is the quietest place in our school.",
        "The library is the quieter place in our school.",
        "The library is the quietest place in our classroom."
      ],
      "ans": 0,
      "hint": "注意 quietest",
      "zh": "图书馆是我们学校最安静的地方。",
      "sentence": "The library is the quietest place in our school."
    }
  ],
  "builds": [
    {
      "sentence": "This is the biggest panda in the zoo.",
      "zh": "这是动物园里最大的熊猫。",
      "tokens": [
        "This",
        "is",
        "the",
        "biggest",
        "panda",
        "in",
        "the",
        "zoo"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "My mother is the best cook in our family.",
      "zh": "我妈妈是我们家最棒的厨师。",
      "tokens": [
        "My",
        "mother",
        "is",
        "the",
        "best",
        "cook",
        "in",
        "our",
        "family"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "sentence": "The library is the quietest place in our school.",
      "zh": "图书馆是我们学校最安静的地方。",
      "tokens": [
        "The",
        "library",
        "is",
        "the",
        "quietest",
        "place",
        "in",
        "our",
        "school"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "Winter is the coldest season in Chengdu.",
      "zh": "冬天是成都最冷的季节。",
      "tokens": [
        "Winter",
        "is",
        "the",
        "coldest",
        "season",
        "in",
        "Chengdu"
      ],
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "sentence": "This is the cheapest toy in the shop.",
      "zh": "这是商店里最便宜的玩具。",
      "tokens": [
        "This",
        "is",
        "the",
        "cheapest",
        "toy",
        "in",
        "the",
        "shop"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "sentence": "He is the fastest runner on the playground.",
      "zh": "他是操场上跑得最快的人。",
      "tokens": [
        "He",
        "is",
        "the",
        "fastest",
        "runner",
        "on",
        "the",
        "playground"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);