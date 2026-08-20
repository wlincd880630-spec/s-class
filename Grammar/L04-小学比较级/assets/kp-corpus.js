(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "The elephant is bigger than the mouse.",
      "zh": "大象比老鼠大。",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "My bag is heavier than yours.",
      "zh": "我的书包比你的重。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Spring is warmer than winter in Chengdu.",
      "zh": "成都的春天比冬天暖和。",
      "tag": "daily_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "The panda is cuter than the tiger.",
      "zh": "熊猫比老虎可爱。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "This apple is sweeter than that one.",
      "zh": "这个苹果比那个甜。",
      "tag": "daily_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "The bus is faster than the bike.",
      "zh": "公交车比自行车快。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "My little brother is shorter than me.",
      "zh": "我弟弟比我矮。",
      "tag": "daily_use",
      "scene": "taller",
      "image": "kp3d-taller.png"
    },
    {
      "en": "The soup is hotter than the rice.",
      "zh": "汤比饭烫。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "This book is more interesting than that one.",
      "zh": "这本书比那本有趣。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The math test is harder than the English test.",
      "zh": "数学考试比英语考试难。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "My ruler is longer than yours.",
      "zh": "我的尺子比你的长。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The blue pen is cheaper than the red one.",
      "zh": "蓝色钢笔比红色的便宜。",
      "tag": "exam_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "The park is more beautiful than the street.",
      "zh": "公园比街道漂亮。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "The cat is lazier than the dog.",
      "zh": "猫比狗懒。",
      "tag": "exam_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "The moon is smaller than the sun.",
      "zh": "月亮比太阳小。",
      "tag": "exam_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "The new playground is bigger than the old one.",
      "zh": "新操场比旧操场大。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "My mother is younger than my father.",
      "zh": "我妈妈比爸爸年轻。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The story is more exciting than the movie.",
      "zh": "故事比电影更刺激。",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The piano is more expensive than the guitar.",
      "zh": "钢琴比吉他贵。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "The weather today is better than yesterday.",
      "zh": "今天天气比昨天好。",
      "tag": "writing_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "The hot pot is spicier than the noodles.",
      "zh": "火锅比面条辣。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "My room is cleaner than my sister's.",
      "zh": "我的房间比姐姐的干净。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "The doctor is busier than the nurse.",
      "zh": "医生比护士忙。",
      "tag": "writing_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "The basketball is bigger than the football.",
      "zh": "篮球比足球大。",
      "tag": "writing_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    }
  ],
  "questions": [
    {
      "q": "Tom is _____ Jack.",
      "opts": [
        "taller",
        "taller than",
        "more taller"
      ],
      "ans": 1,
      "hint": "比较级后面要跟 than。",
      "sentence": "Tom is taller than Jack.",
      "zh": "汤姆比杰克高。"
    },
    {
      "q": "This bag is _____ than that one.",
      "opts": [
        "heavy",
        "heavier",
        "heaviest"
      ],
      "ans": 1,
      "hint": "两者比较用比较级 heavier。",
      "sentence": "This bag is heavier than that one.",
      "zh": "这个包比那个重。"
    },
    {
      "q": "Summer in Chengdu is _____ than spring.",
      "opts": [
        "hotter",
        "more hot",
        "hottest"
      ],
      "ans": 0,
      "hint": "hot → hotter。",
      "sentence": "Summer in Chengdu is hotter than spring.",
      "zh": "成都的夏天比春天热。"
    },
    {
      "q": "Emma reads _____ than Tom.",
      "opts": [
        "careful",
        "more carefully",
        "most careful"
      ],
      "ans": 1,
      "hint": "副词比较常用 more + 副词。",
      "sentence": "Emma reads more carefully than Tom.",
      "zh": "艾玛读书比汤姆更仔细。"
    },
    {
      "q": "Which is _____, a cat or a dinosaur?",
      "opts": [
        "big",
        "bigger",
        "biggest"
      ],
      "ans": 1,
      "hint": "两者之间选哪一个更……用比较级。",
      "sentence": "Which is bigger, a cat or a dinosaur?",
      "zh": "猫和恐龙哪个更大？"
    },
    {
      "q": "The elephant is _____ than the mouse.",
      "opts": [
        "bigger",
        "big",
        "biggest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "The elephant is bigger than the mouse.",
      "zh": "大象比老鼠大。"
    },
    {
      "q": "Tom is _____ than Jack.",
      "opts": [
        "taller",
        "tall",
        "tallest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "Tom is taller than Jack.",
      "zh": "汤姆比杰克高。"
    },
    {
      "q": "This book is _____ than that one.",
      "opts": [
        "more interesting",
        "interesting",
        "most interesting"
      ],
      "ans": 0,
      "hint": "多音节用more",
      "sentence": "This book is more interesting than that one.",
      "zh": "这本书比那本有趣。"
    },
    {
      "q": "My bag is _____ than yours.",
      "opts": [
        "heavier",
        "heavy",
        "heaviest"
      ],
      "ans": 0,
      "hint": "辅音+y变i加er",
      "sentence": "My bag is heavier than yours.",
      "zh": "我的书包比你的重。"
    },
    {
      "q": "The panda is _____ than the tiger.",
      "opts": [
        "cuter",
        "cute",
        "cutest"
      ],
      "ans": 0,
      "hint": "以e结尾加r",
      "sentence": "The panda is cuter than the tiger.",
      "zh": "熊猫比老虎可爱。"
    },
    {
      "q": "Spring is _____ than winter in Chengdu.",
      "opts": [
        "warmer",
        "warm",
        "warmest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "Spring is warmer than winter in Chengdu.",
      "zh": "成都的春天比冬天暖和。"
    },
    {
      "q": "The bus is _____ than the bike.",
      "opts": [
        "faster",
        "fast",
        "fastest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "The bus is faster than the bike.",
      "zh": "公交车比自行车快。"
    },
    {
      "q": "My little brother is _____ than me.",
      "opts": [
        "shorter",
        "short",
        "shortest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "My little brother is shorter than me.",
      "zh": "我弟弟比我矮。"
    },
    {
      "q": "The soup is _____ than the rice.",
      "opts": [
        "hotter",
        "hot",
        "hottest"
      ],
      "ans": 0,
      "hint": "重读闭音节双写t加er",
      "sentence": "The soup is hotter than the rice.",
      "zh": "汤比饭烫。"
    },
    {
      "q": "The math test is _____ than the English test.",
      "opts": [
        "harder",
        "hard",
        "hardest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "The math test is harder than the English test.",
      "zh": "数学考试比英语考试难。"
    },
    {
      "q": "My ruler is _____ than yours.",
      "opts": [
        "longer",
        "long",
        "longest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "My ruler is longer than yours.",
      "zh": "我的尺子比你的长。"
    },
    {
      "q": "The blue pen is _____ than the red one.",
      "opts": [
        "cheaper",
        "cheap",
        "cheapest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "The blue pen is cheaper than the red one.",
      "zh": "蓝色钢笔比红色的便宜。"
    },
    {
      "q": "The park is _____ than the street.",
      "opts": [
        "more beautiful",
        "beautiful",
        "most beautiful"
      ],
      "ans": 0,
      "hint": "多音节用more",
      "sentence": "The park is more beautiful than the street.",
      "zh": "公园比街道漂亮。"
    },
    {
      "q": "The cat is _____ than the dog.",
      "opts": [
        "lazier",
        "lazy",
        "laziest"
      ],
      "ans": 0,
      "hint": "辅音+y变i加er",
      "sentence": "The cat is lazier than the dog.",
      "zh": "猫比狗懒。"
    },
    {
      "q": "The moon is _____ than the sun.",
      "opts": [
        "smaller",
        "small",
        "smallest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "The moon is smaller than the sun.",
      "zh": "月亮比太阳小。"
    },
    {
      "q": "The new playground is _____ than the old one.",
      "opts": [
        "bigger",
        "big",
        "biggest"
      ],
      "ans": 0,
      "hint": "重读闭音节双写g加er",
      "sentence": "The new playground is bigger than the old one.",
      "zh": "新操场比旧操场大。"
    },
    {
      "q": "My mother is _____ than my father.",
      "opts": [
        "younger",
        "young",
        "youngest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "My mother is younger than my father.",
      "zh": "我妈妈比爸爸年轻。"
    },
    {
      "q": "The story is _____ than the movie.",
      "opts": [
        "more exciting",
        "exciting",
        "most exciting"
      ],
      "ans": 0,
      "hint": "多音节用more",
      "sentence": "The story is more exciting than the movie.",
      "zh": "故事比电影更刺激。"
    },
    {
      "q": "The piano is _____ than the guitar.",
      "opts": [
        "more expensive",
        "expensive",
        "most expensive"
      ],
      "ans": 0,
      "hint": "多音节用more",
      "sentence": "The piano is more expensive than the guitar.",
      "zh": "钢琴比吉他贵。"
    },
    {
      "q": "The weather today is _____ than yesterday.",
      "opts": [
        "better",
        "good",
        "best"
      ],
      "ans": 0,
      "hint": "good的比较级是better",
      "sentence": "The weather today is better than yesterday.",
      "zh": "今天天气比昨天好。"
    },
    {
      "q": "The hot pot is _____ than the noodles.",
      "opts": [
        "spicier",
        "spicy",
        "spiciest"
      ],
      "ans": 0,
      "hint": "辅音+y变i加er",
      "sentence": "The hot pot is spicier than the noodles.",
      "zh": "火锅比面条辣。"
    },
    {
      "q": "My room is _____ than my sister's.",
      "opts": [
        "cleaner",
        "clean",
        "cleanest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "My room is cleaner than my sister's.",
      "zh": "我的房间比姐姐的干净。"
    },
    {
      "q": "The doctor is _____ than the nurse.",
      "opts": [
        "busier",
        "busy",
        "busiest"
      ],
      "ans": 0,
      "hint": "辅音+y变i加er",
      "sentence": "The doctor is busier than the nurse.",
      "zh": "医生比护士忙。"
    },
    {
      "q": "The basketball is _____ than the football.",
      "opts": [
        "bigger",
        "big",
        "biggest"
      ],
      "ans": 0,
      "hint": "重读闭音节双写g加er",
      "sentence": "The basketball is bigger than the football.",
      "zh": "篮球比足球大。"
    },
    {
      "q": "This apple is _____ than that one.",
      "opts": [
        "sweeter",
        "sweet",
        "sweetest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "This apple is sweeter than that one.",
      "zh": "这个苹果比那个甜。"
    },
    {
      "q": "The dinosaur is _____ than the rabbit.",
      "opts": [
        "bigger",
        "big",
        "biggest"
      ],
      "ans": 0,
      "hint": "重读闭音节双写g加er",
      "sentence": "The dinosaur is bigger than the rabbit.",
      "zh": "恐龙比兔子大。"
    },
    {
      "q": "My schoolbag is _____ than yours.",
      "opts": [
        "newer",
        "new",
        "newest"
      ],
      "ans": 0,
      "hint": "比较级用-er",
      "sentence": "My schoolbag is newer than yours.",
      "zh": "我的书包比你的新。"
    },
    {
      "q": "The cat is _____ than the mouse.",
      "opts": [
        "fatter",
        "fat",
        "fattest"
      ],
      "ans": 0,
      "hint": "重读闭音节双写t加er",
      "sentence": "The cat is fatter than the mouse.",
      "zh": "猫比老鼠胖。"
    }
  ],
  "matchPairs": [
    {
      "en": "bigger than",
      "zh": "比……更大"
    },
    {
      "en": "taller than",
      "zh": "比……更高"
    },
    {
      "en": "heavier than",
      "zh": "比……更重"
    },
    {
      "en": "cheaper than",
      "zh": "比……更便宜"
    },
    {
      "en": "smaller than",
      "zh": "比……小"
    },
    {
      "en": "shorter than",
      "zh": "比……矮"
    },
    {
      "en": "faster than",
      "zh": "比……快"
    },
    {
      "en": "slower than",
      "zh": "比……慢"
    },
    {
      "en": "lighter than",
      "zh": "比……轻"
    },
    {
      "en": "more interesting than",
      "zh": "比……有趣"
    },
    {
      "en": "more beautiful than",
      "zh": "比……漂亮"
    }
  ],
  "listenPick": [
    {
      "audio": "The elephant is bigger than the mouse.",
      "opts": [
        "The elephant is bigger than the mouse.",
        "The elephant is big than the mouse.",
        "The elephant is biggest than the mouse."
      ],
      "ans": 0,
      "hint": "注意bigger的发音",
      "zh": "大象比老鼠大。",
      "sentence": "The elephant is bigger than the mouse."
    },
    {
      "audio": "Tom is taller than Jack.",
      "opts": [
        "Tom is taller than Jack.",
        "Tom is tall than Jack.",
        "Tom is tallest than Jack."
      ],
      "ans": 0,
      "hint": "注意taller的发音",
      "zh": "汤姆比杰克高。",
      "sentence": "Tom is taller than Jack."
    },
    {
      "audio": "This book is more interesting than that one.",
      "opts": [
        "This book is more interesting than that one.",
        "This book is more interesting that that one.",
        "This book is interesting than that one."
      ],
      "ans": 0,
      "hint": "注意more interesting",
      "zh": "这本书比那本有趣。",
      "sentence": "This book is more interesting than that one."
    },
    {
      "audio": "My bag is heavier than yours.",
      "opts": [
        "My bag is heavier than yours.",
        "My bag is heavy than yours.",
        "My bag is heavier that yours."
      ],
      "ans": 0,
      "hint": "注意heavier的发音",
      "zh": "我的书包比你的重。",
      "sentence": "My bag is heavier than yours."
    },
    {
      "audio": "The panda is cuter than the tiger.",
      "opts": [
        "The panda is cuter than the tiger.",
        "The panda is cute than the tiger.",
        "The panda is cutest than the tiger."
      ],
      "ans": 0,
      "hint": "注意cuter的发音",
      "zh": "熊猫比老虎可爱。",
      "sentence": "The panda is cuter than the tiger."
    },
    {
      "audio": "Spring is warmer than winter in Chengdu.",
      "opts": [
        "Spring is warmer than winter in Chengdu.",
        "Spring is warm than winter in Chengdu.",
        "Spring is warmest than winter in Chengdu."
      ],
      "ans": 0,
      "hint": "注意warmer的发音",
      "zh": "成都的春天比冬天暖和。",
      "sentence": "Spring is warmer than winter in Chengdu."
    },
    {
      "audio": "The bus is faster than the bike.",
      "opts": [
        "The bus is faster than the bike.",
        "The bus is fast than the bike.",
        "The bus is fastest than the bike."
      ],
      "ans": 0,
      "hint": "注意faster的发音",
      "zh": "公交车比自行车快。",
      "sentence": "The bus is faster than the bike."
    },
    {
      "audio": "The hot pot is spicier than the noodles.",
      "opts": [
        "The hot pot is spicier than the noodles.",
        "The hot pot is spicy than the noodles.",
        "The hot pot is spiciest than the noodles."
      ],
      "ans": 0,
      "hint": "注意spicier的发音",
      "zh": "火锅比面条辣。",
      "sentence": "The hot pot is spicier than the noodles."
    }
  ],
  "builds": [
    {
      "sentence": "The panda is cuter than the tiger.",
      "zh": "熊猫比老虎可爱。",
      "tokens": [
        "The",
        "panda",
        "is",
        "cuter",
        "than",
        "the",
        "tiger"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "My bag is heavier than yours.",
      "zh": "我的书包比你的重。",
      "tokens": [
        "My",
        "bag",
        "is",
        "heavier",
        "than",
        "yours"
      ],
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "sentence": "The bus is faster than the bike.",
      "zh": "公交车比自行车快。",
      "tokens": [
        "The",
        "bus",
        "is",
        "faster",
        "than",
        "the",
        "bike"
      ],
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "sentence": "This apple is sweeter than that one.",
      "zh": "这个苹果比那个甜。",
      "tokens": [
        "This",
        "apple",
        "is",
        "sweeter",
        "than",
        "that",
        "one"
      ],
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "sentence": "The piano is more expensive than the guitar.",
      "zh": "钢琴比吉他贵。",
      "tokens": [
        "The",
        "piano",
        "is",
        "more",
        "expensive",
        "than",
        "the",
        "guitar"
      ],
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "sentence": "The weather today is better than yesterday.",
      "zh": "今天天气比昨天好。",
      "tokens": [
        "The",
        "weather",
        "today",
        "is",
        "better",
        "than",
        "yesterday"
      ],
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);