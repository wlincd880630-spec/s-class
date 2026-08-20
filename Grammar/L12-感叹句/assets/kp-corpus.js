(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "What a beautiful day it is!",
      "zh": "多么美好的一天啊！",
      "tag": "daily_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "How interesting the story is!",
      "zh": "这个故事真有趣啊！",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "What a big panda it is!",
      "zh": "多么大的一只熊猫啊！",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "How fast the bus goes!",
      "zh": "公交车跑得真快啊！",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "What delicious food it is!",
      "zh": "多么美味的食物啊！",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "How lovely the cat is!",
      "zh": "这只猫真可爱啊！",
      "tag": "daily_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "What a funny joke it is!",
      "zh": "多么有趣的笑话啊！",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "How hard the boy studies!",
      "zh": "这个男孩学习真努力啊！",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "What a quiet place the library is!",
      "zh": "图书馆真是个安静的地方啊！",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "How smart the girl is!",
      "zh": "这个女孩真聪明啊！",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "What a tall building it is!",
      "zh": "多么高的楼啊！",
      "tag": "exam_use",
      "scene": "taller",
      "image": "kp3d-taller.png"
    },
    {
      "en": "How sweet the apple is!",
      "zh": "这个苹果真甜啊！",
      "tag": "exam_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "What a heavy rain it is!",
      "zh": "多么大的雨啊！",
      "tag": "exam_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "How quickly the time flies!",
      "zh": "时间过得真快啊！",
      "tag": "exam_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "What a nice day it is!",
      "zh": "多么好的天气啊！",
      "tag": "daily_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "How beautiful the flowers are!",
      "zh": "这些花真漂亮啊！",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "What a clever dog it is!",
      "zh": "多么聪明的狗啊！",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "How well she sings!",
      "zh": "她唱得多好啊！",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "What a wonderful performance it is!",
      "zh": "多么精彩的表演啊！",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "How exciting the game is!",
      "zh": "比赛真激动人心啊！",
      "tag": "writing_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "What a great idea it is!",
      "zh": "多么好的主意啊！",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "How carefully he writes!",
      "zh": "他写得多认真啊！",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "What a bright moon it is tonight!",
      "zh": "今晚的月亮真亮啊！",
      "tag": "writing_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "How happy they are!",
      "zh": "他们多开心啊！",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    }
  ],
  "questions": [
    {
      "q": "_____ tall the boy is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "How + 形容词。",
      "sentence": "How tall the boy is!",
      "zh": "这个男孩多高啊！"
    },
    {
      "q": "_____ good news it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 0,
      "hint": "news 不可数，What 不加 a。",
      "sentence": "What good news it is!",
      "zh": "多好的消息啊！"
    },
    {
      "q": "_____ honest boy he is!",
      "opts": [
        "What",
        "What an",
        "How"
      ],
      "ans": 1,
      "hint": "honest 元音音素 → What an。",
      "sentence": "What an honest boy he is!",
      "zh": "他是多么诚实的男孩啊！"
    },
    {
      "q": "_____ fast he runs!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "How + 副词。",
      "sentence": "How fast he runs!",
      "zh": "他跑得多快啊！"
    },
    {
      "q": "_____ delicious cakes they are!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 0,
      "hint": "cakes 复数，What + 形 + 复数。",
      "sentence": "What delicious cakes they are!",
      "zh": "多么美味的蛋糕啊！"
    },
    {
      "q": "_____ beautiful day it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "day是可数名词单数，用What a",
      "sentence": "What a beautiful day it is!",
      "zh": "多么美好的一天啊！"
    },
    {
      "q": "_____ interesting the story is!",
      "opts": [
        "What",
        "What an",
        "How"
      ],
      "ans": 2,
      "hint": "interesting是形容词，用How",
      "sentence": "How interesting the story is!",
      "zh": "这个故事真有趣啊！"
    },
    {
      "q": "_____ big panda it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "panda是可数名词单数，用What a",
      "sentence": "What a big panda it is!",
      "zh": "多么大的一只熊猫啊！"
    },
    {
      "q": "_____ fast the bus goes!",
      "opts": [
        "What",
        "How",
        "What a"
      ],
      "ans": 1,
      "hint": "fast是副词，用How",
      "sentence": "How fast the bus goes!",
      "zh": "公交车跑得真快啊！"
    },
    {
      "q": "_____ delicious food it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 0,
      "hint": "food是不可数名词，用What",
      "sentence": "What delicious food it is!",
      "zh": "多么美味的食物啊！"
    },
    {
      "q": "_____ lovely the cat is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "lovely是形容词，用How",
      "sentence": "How lovely the cat is!",
      "zh": "这只猫真可爱啊！"
    },
    {
      "q": "_____ funny joke it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "joke是可数名词单数，用What a",
      "sentence": "What a funny joke it is!",
      "zh": "多么有趣的笑话啊！"
    },
    {
      "q": "_____ hard the boy studies!",
      "opts": [
        "What",
        "How",
        "What a"
      ],
      "ans": 1,
      "hint": "hard是副词，用How",
      "sentence": "How hard the boy studies!",
      "zh": "这个男孩学习真努力啊！"
    },
    {
      "q": "_____ quiet place the library is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "place是可数名词单数，用What a",
      "sentence": "What a quiet place the library is!",
      "zh": "图书馆真是个安静的地方啊！"
    },
    {
      "q": "_____ smart the girl is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "smart是形容词，用How",
      "sentence": "How smart the girl is!",
      "zh": "这个女孩真聪明啊！"
    },
    {
      "q": "_____ tall building it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "building是可数名词单数，用What a",
      "sentence": "What a tall building it is!",
      "zh": "多么高的楼啊！"
    },
    {
      "q": "_____ sweet the apple is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "sweet是形容词，用How",
      "sentence": "How sweet the apple is!",
      "zh": "这个苹果真甜啊！"
    },
    {
      "q": "_____ heavy rain it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 0,
      "hint": "rain是不可数名词，用What",
      "sentence": "What heavy rain it is!",
      "zh": "多么大的雨啊！"
    },
    {
      "q": "_____ quickly the time flies!",
      "opts": [
        "What",
        "How",
        "What a"
      ],
      "ans": 1,
      "hint": "quickly是副词，用How",
      "sentence": "How quickly the time flies!",
      "zh": "时间过得真快啊！"
    },
    {
      "q": "_____ nice day it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "day是可数名词单数，用What a",
      "sentence": "What a nice day it is!",
      "zh": "多么好的天气啊！"
    },
    {
      "q": "_____ beautiful the flowers are!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "beautiful是形容词，用How",
      "sentence": "How beautiful the flowers are!",
      "zh": "这些花真漂亮啊！"
    },
    {
      "q": "_____ clever dog it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "dog是可数名词单数，用What a",
      "sentence": "What a clever dog it is!",
      "zh": "多么聪明的狗啊！"
    },
    {
      "q": "_____ well she sings!",
      "opts": [
        "What",
        "How",
        "What a"
      ],
      "ans": 1,
      "hint": "well是副词，用How",
      "sentence": "How well she sings!",
      "zh": "她唱得多好啊！"
    },
    {
      "q": "_____ wonderful performance it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "performance是可数名词单数，用What a",
      "sentence": "What a wonderful performance it is!",
      "zh": "多么精彩的表演啊！"
    },
    {
      "q": "_____ exciting the game is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "exciting是形容词，用How",
      "sentence": "How exciting the game is!",
      "zh": "比赛真激动人心啊！"
    },
    {
      "q": "_____ great idea it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "idea是可数名词单数，用What a",
      "sentence": "What a great idea it is!",
      "zh": "多么好的主意啊！"
    },
    {
      "q": "_____ carefully he writes!",
      "opts": [
        "What",
        "How",
        "What a"
      ],
      "ans": 1,
      "hint": "carefully是副词，用How",
      "sentence": "How carefully he writes!",
      "zh": "他写得多认真啊！"
    },
    {
      "q": "_____ bright moon it is tonight!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "moon是可数名词单数，用What a",
      "sentence": "What a bright moon it is tonight!",
      "zh": "今晚的月亮真亮啊！"
    },
    {
      "q": "_____ happy they are!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "happy是形容词，用How",
      "sentence": "How happy they are!",
      "zh": "他们多开心啊！"
    },
    {
      "q": "_____ delicious the dinner is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "delicious是形容词，用How",
      "sentence": "How delicious the dinner is!",
      "zh": "晚餐真美味啊！"
    },
    {
      "q": "_____ sunny day it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "day是可数名词单数，用What a",
      "sentence": "What a sunny day it is!",
      "zh": "多么晴朗的一天啊！"
    },
    {
      "q": "_____ hot the soup is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 2,
      "hint": "hot是形容词，用How",
      "sentence": "How hot the soup is!",
      "zh": "汤真烫啊！"
    },
    {
      "q": "_____ cute baby it is!",
      "opts": [
        "What",
        "What a",
        "How"
      ],
      "ans": 1,
      "hint": "baby是可数名词单数，用What a",
      "sentence": "What a cute baby it is!",
      "zh": "多么可爱的宝宝啊！"
    }
  ],
  "matchPairs": [
    {
      "en": "What a beautiful day!",
      "zh": "多么美好的一天！"
    },
    {
      "en": "What an interesting story!",
      "zh": "多么有趣的故事！"
    },
    {
      "en": "How beautiful!",
      "zh": "多么美！"
    },
    {
      "en": "How fast he runs!",
      "zh": "他跑得多快！"
    },
    {
      "en": "How interesting!",
      "zh": "真有趣！"
    },
    {
      "en": "What a big panda!",
      "zh": "多大的熊猫！"
    },
    {
      "en": "How fast!",
      "zh": "真快！"
    },
    {
      "en": "What delicious food!",
      "zh": "多美味的食物！"
    },
    {
      "en": "How lovely!",
      "zh": "真可爱！"
    },
    {
      "en": "What a funny joke!",
      "zh": "多有趣的笑话！"
    },
    {
      "en": "How hard he studies!",
      "zh": "他学习多努力！"
    },
    {
      "en": "What a quiet place!",
      "zh": "多安静的地方！"
    },
    {
      "en": "How smart!",
      "zh": "真聪明！"
    }
  ],
  "listenPick": [
    {
      "audio": "What a beautiful day it is!",
      "opts": [
        "What a beautiful day it is!",
        "How beautiful day it is!",
        "What beautiful day it is!"
      ],
      "ans": 0,
      "hint": "注意听What a",
      "zh": "多么美好的一天啊！",
      "sentence": "What a beautiful day it is!"
    },
    {
      "audio": "How interesting the story is!",
      "opts": [
        "How interesting the story is!",
        "What interesting story it is!",
        "What a interesting story it is!"
      ],
      "ans": 0,
      "hint": "注意听How",
      "zh": "这个故事真有趣啊！",
      "sentence": "How interesting the story is!"
    },
    {
      "audio": "What a big panda it is!",
      "opts": [
        "What big panda it is!",
        "What a big panda it is!",
        "How a big panda it is!"
      ],
      "ans": 1,
      "hint": "注意a",
      "zh": "多么大的一只熊猫啊！",
      "sentence": "What a big panda it is!"
    },
    {
      "audio": "How fast the bus goes!",
      "opts": [
        "What fast the bus goes!",
        "How fast the bus goes!",
        "How a fast bus goes!"
      ],
      "ans": 1,
      "hint": "注意How",
      "zh": "公交车跑得真快啊！",
      "sentence": "How fast the bus goes!"
    },
    {
      "audio": "What delicious food it is!",
      "opts": [
        "What a delicious food it is!",
        "How delicious food it is!",
        "What delicious food it is!"
      ],
      "ans": 2,
      "hint": "food不可数，不用a",
      "zh": "多么美味的食物啊！",
      "sentence": "What delicious food it is!"
    },
    {
      "audio": "How lovely the cat is!",
      "opts": [
        "How lovely the cat is!",
        "What lovely cat it is!",
        "What a lovely cat it is!"
      ],
      "ans": 0,
      "hint": "注意How",
      "zh": "这只猫真可爱啊！",
      "sentence": "How lovely the cat is!"
    },
    {
      "audio": "What a funny joke it is!",
      "opts": [
        "What funny joke it is!",
        "What a funny joke it is!",
        "How funny joke it is!"
      ],
      "ans": 1,
      "hint": "注意a",
      "zh": "多么有趣的笑话啊！",
      "sentence": "What a funny joke it is!"
    },
    {
      "audio": "How hard the boy studies!",
      "opts": [
        "What hard the boy studies!",
        "How hard the boy studies!",
        "How a hard boy studies!"
      ],
      "ans": 1,
      "hint": "注意How",
      "zh": "这个男孩学习真努力啊！",
      "sentence": "How hard the boy studies!"
    }
  ],
  "builds": [
    {
      "sentence": "What a sunny day it is!",
      "zh": "多么晴朗的一天啊！",
      "tokens": [
        "What",
        "a",
        "sunny",
        "day",
        "it",
        "is"
      ],
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "sentence": "How sweet the apple is!",
      "zh": "这个苹果真甜啊！",
      "tokens": [
        "How",
        "sweet",
        "the",
        "apple",
        "is"
      ],
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "sentence": "What a heavy rain it is!",
      "zh": "多么大的雨啊！",
      "tokens": [
        "What",
        "a",
        "heavy",
        "rain",
        "it",
        "is"
      ],
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "sentence": "How well she plays the piano!",
      "zh": "她钢琴弹得多好啊！",
      "tokens": [
        "How",
        "well",
        "she",
        "plays",
        "the",
        "piano"
      ],
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "sentence": "What a clever dog it is!",
      "zh": "多么聪明的狗啊！",
      "tokens": [
        "What",
        "a",
        "clever",
        "dog",
        "it",
        "is"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "sentence": "How exciting the basketball game is!",
      "zh": "篮球比赛真激动人心啊！",
      "tokens": [
        "How",
        "exciting",
        "the",
        "basketball",
        "game",
        "is"
      ],
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);