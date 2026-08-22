(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "There is a new library near our school.",
      "zh": "我们学校附近有一个新图书馆。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "There are so many people in the shopping centre.",
      "zh": "购物中心里有那么多人。",
      "tag": "daily_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "There is a panda eating bamboo in the zoo.",
      "zh": "动物园里有一只熊猫在吃竹子。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "There are some apples on the table.",
      "zh": "桌子上有一些苹果。",
      "tag": "daily_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "There is a big window in our classroom.",
      "zh": "我们教室里有一扇大窗户。",
      "tag": "daily_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "There is a bus stop near my home.",
      "zh": "我家附近有一个公交车站。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "There are many books in the library.",
      "zh": "图书馆里有很多书。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "There is a cat under the chair.",
      "zh": "椅子下面有一只猫。",
      "tag": "daily_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "There is a piano in the music room.",
      "zh": "音乐教室里有一架钢琴。",
      "tag": "exam_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "There are five birds in the tree.",
      "zh": "树上有五只鸟。",
      "tag": "exam_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "There is some milk in the glass.",
      "zh": "杯子里有一些牛奶。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "There are two umbrellas near the door.",
      "zh": "门旁边有两把雨伞。",
      "tag": "exam_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "There is a doctor in the hospital.",
      "zh": "医院里有一位医生。",
      "tag": "exam_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "There are many stars in the sky.",
      "zh": "天空中有许多星星。",
      "tag": "exam_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "There is a playground behind the school.",
      "zh": "学校后面有一个操场。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "There are some children on the playground.",
      "zh": "操场上有一些孩子。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "There is a basketball under the desk.",
      "zh": "书桌下面有一个篮球。",
      "tag": "writing_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "There are three windows in the room.",
      "zh": "房间里有三扇窗户。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "There is a tall tree in front of the house.",
      "zh": "房子前面有一棵高树。",
      "tag": "writing_use",
      "scene": "taller",
      "image": "kp3d-taller.png"
    },
    {
      "en": "There are many flowers in the garden.",
      "zh": "花园里有许多花。",
      "tag": "writing_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "There is a new bike in the yard.",
      "zh": "院子里有一辆新自行车。",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "There are two cats in the basket.",
      "zh": "篮子里有两只猫。",
      "tag": "writing_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "There is a hot pot restaurant near the park.",
      "zh": "公园附近有一家火锅店。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "There are some pandas in Chengdu.",
      "zh": "成都有一些熊猫。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    }
  ],
  "questions": [
    {
      "q": "There _____ a cat and two dogs in the garden. （就近）",
      "opts": [
        "is",
        "are",
        "be"
      ],
      "ans": 0,
      "hint": "靠近 be 的是 a cat（单数）→ is。",
      "sentence": "There is a cat and two dogs in the garden.",
      "zh": "花园里有一只猫和两只狗。"
    },
    {
      "q": "_____ there any milk in the fridge?",
      "opts": [
        "Is",
        "Are",
        "Do"
      ],
      "ans": 0,
      "hint": "milk 不可数 → Is there。",
      "sentence": "Is there any milk in the fridge?",
      "zh": "冰箱里有牛奶吗？"
    },
    {
      "q": "There _____ any students in the classroom.",
      "opts": [
        "isn't",
        "aren't",
        "don't"
      ],
      "ans": 1,
      "hint": "students 复数 → aren't。",
      "sentence": "There aren't any students in the classroom.",
      "zh": "教室里没有学生。"
    },
    {
      "q": "There is _____ orange on the plate.",
      "opts": [
        "a",
        "an",
        "the"
      ],
      "ans": 1,
      "hint": "orange 以元音音素开头 → an。",
      "sentence": "There is an orange on the plate.",
      "zh": "盘子上有一个橙子。"
    },
    {
      "q": "_____ a lot of rain in Chengdu in summer.",
      "opts": [
        "It has",
        "There is",
        "There are"
      ],
      "ans": 1,
      "hint": "rain 不可数，存在句 There is。",
      "sentence": "There is a lot of rain in Chengdu in summer.",
      "zh": "成都夏天雨水很多。"
    },
    {
      "q": "There _____ a book on the desk.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "单数名词用is",
      "sentence": "There is a book on the desk.",
      "zh": "桌子上有一本书。"
    },
    {
      "q": "There _____ two apples on the table.",
      "opts": [
        "is",
        "are",
        "be"
      ],
      "ans": 1,
      "hint": "复数名词用are",
      "sentence": "There are two apples on the table.",
      "zh": "桌子上有两个苹果。"
    },
    {
      "q": "There _____ a cat under the chair.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "单数名词用is",
      "sentence": "There is a cat under the chair.",
      "zh": "椅子下面有一只猫。"
    },
    {
      "q": "There _____ many books in the library.",
      "opts": [
        "is",
        "are",
        "be"
      ],
      "ans": 1,
      "hint": "many books 是复数",
      "sentence": "There are many books in the library.",
      "zh": "图书馆里有很多书。"
    },
    {
      "q": "There _____ a new library near our school.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a new library 单数",
      "sentence": "There is a new library near our school.",
      "zh": "我们学校附近有一个新图书馆。"
    },
    {
      "q": "There _____ so many people in the shopping centre.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "people 是复数",
      "sentence": "There are so many people in the shopping centre.",
      "zh": "购物中心里有那么多人。"
    },
    {
      "q": "There _____ a panda in the zoo.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a panda 单数",
      "sentence": "There is a panda in the zoo.",
      "zh": "动物园里有一只熊猫。"
    },
    {
      "q": "There _____ some milk in the glass.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "milk 不可数，用is",
      "sentence": "There is some milk in the glass.",
      "zh": "杯子里有一些牛奶。"
    },
    {
      "q": "There _____ five birds in the tree.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "five birds 复数",
      "sentence": "There are five birds in the tree.",
      "zh": "树上有五只鸟。"
    },
    {
      "q": "There _____ a piano in the music room.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a piano 单数",
      "sentence": "There is a piano in the music room.",
      "zh": "音乐教室里有一架钢琴。"
    },
    {
      "q": "There _____ two umbrellas near the door.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "two umbrellas 复数",
      "sentence": "There are two umbrellas near the door.",
      "zh": "门旁边有两把雨伞。"
    },
    {
      "q": "There _____ a doctor in the hospital.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a doctor 单数",
      "sentence": "There is a doctor in the hospital.",
      "zh": "医院里有一位医生。"
    },
    {
      "q": "There _____ many stars in the sky.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "many stars 复数",
      "sentence": "There are many stars in the sky.",
      "zh": "天空中有许多星星。"
    },
    {
      "q": "There _____ a playground behind the school.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a playground 单数",
      "sentence": "There is a playground behind the school.",
      "zh": "学校后面有一个操场。"
    },
    {
      "q": "There _____ some children on the playground.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "children 是复数",
      "sentence": "There are some children on the playground.",
      "zh": "操场上有一些孩子。"
    },
    {
      "q": "There _____ a basketball under the desk.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a basketball 单数",
      "sentence": "There is a basketball under the desk.",
      "zh": "书桌下面有一个篮球。"
    },
    {
      "q": "There _____ three windows in the room.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "three windows 复数",
      "sentence": "There are three windows in the room.",
      "zh": "房间里有三扇窗户。"
    },
    {
      "q": "There _____ a tall tree in front of the house.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a tall tree 单数",
      "sentence": "There is a tall tree in front of the house.",
      "zh": "房子前面有一棵高树。"
    },
    {
      "q": "There _____ many flowers in the garden.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "many flowers 复数",
      "sentence": "There are many flowers in the garden.",
      "zh": "花园里有许多花。"
    },
    {
      "q": "There _____ a new bike in the yard.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a new bike 单数",
      "sentence": "There is a new bike in the yard.",
      "zh": "院子里有一辆新自行车。"
    },
    {
      "q": "There _____ two cats in the basket.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "two cats 复数",
      "sentence": "There are two cats in the basket.",
      "zh": "篮子里有两只猫。"
    },
    {
      "q": "There _____ a hot pot restaurant near the park.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "a hot pot restaurant 单数",
      "sentence": "There is a hot pot restaurant near the park.",
      "zh": "公园附近有一家火锅店。"
    },
    {
      "q": "There _____ some pandas in Chengdu.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "some pandas 复数",
      "sentence": "There are some pandas in Chengdu.",
      "zh": "成都有一些熊猫。"
    },
    {
      "q": "_____ there any apples in the bag?",
      "opts": [
        "Is",
        "Are",
        "Am"
      ],
      "ans": 1,
      "hint": "any apples 复数，疑问句用Are",
      "sentence": "Are there any apples in the bag?",
      "zh": "包里有一些苹果吗？"
    },
    {
      "q": "_____ there a book on the shelf?",
      "opts": [
        "Is",
        "Are",
        "Am"
      ],
      "ans": 0,
      "hint": "a book 单数，疑问句用Is",
      "sentence": "Is there a book on the shelf?",
      "zh": "书架上有本书吗？"
    },
    {
      "q": "There _____ not any water in the bottle.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "water 不可数，用is",
      "sentence": "There is not any water in the bottle.",
      "zh": "瓶子里没有水。"
    },
    {
      "q": "There _____ not many students in the classroom.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 1,
      "hint": "many students 复数，用are",
      "sentence": "There are not many students in the classroom.",
      "zh": "教室里没有很多学生。"
    },
    {
      "q": "There _____ a big window and two doors in the room.",
      "opts": [
        "is",
        "are",
        "am"
      ],
      "ans": 0,
      "hint": "就近原则，a big window 单数",
      "sentence": "There is a big window and two doors in the room.",
      "zh": "房间里有一扇大窗户和两扇门。"
    }
  ],
  "matchPairs": [
    {
      "en": "There is",
      "zh": "有（单数/不可数）"
    },
    {
      "en": "There are",
      "zh": "有（复数）"
    },
    {
      "en": "Is there…?",
      "zh": "有没有……？"
    },
    {
      "en": "There aren't any",
      "zh": "没有任何（复数）"
    },
    {
      "en": "a new library",
      "zh": "一个新图书馆"
    },
    {
      "en": "many people",
      "zh": "许多人"
    },
    {
      "en": "some milk",
      "zh": "一些牛奶"
    },
    {
      "en": "a hot pot restaurant",
      "zh": "一家火锅店"
    },
    {
      "en": "under the chair",
      "zh": "在椅子下面"
    },
    {
      "en": "in the tree",
      "zh": "在树上"
    },
    {
      "en": "near the park",
      "zh": "在公园附近"
    },
    {
      "en": "on the playground",
      "zh": "在操场上"
    },
    {
      "en": "in front of the house",
      "zh": "在房子前面"
    },
    {
      "en": "behind the school",
      "zh": "在学校后面"
    }
  ],
  "listenPick": [
    {
      "audio": "There is a cat under the chair.",
      "opts": [
        "There is a cat under the chair.",
        "There are cats under the chair.",
        "There is a cat on the chair."
      ],
      "ans": 0,
      "hint": "注意单数和介词",
      "zh": "椅子下面有一只猫。",
      "sentence": "There is a cat under the chair."
    },
    {
      "audio": "There are two apples on the table.",
      "opts": [
        "There are two apples on the table.",
        "There is an apple on the table.",
        "There are two apples under the table."
      ],
      "ans": 0,
      "hint": "注意数量和位置",
      "zh": "桌子上有两个苹果。",
      "sentence": "There are two apples on the table."
    },
    {
      "audio": "There is a new library near our school.",
      "opts": [
        "There is a new library near our school.",
        "There are new libraries near our school.",
        "There is a new library in our school."
      ],
      "ans": 0,
      "hint": "注意单复数和介词",
      "zh": "我们学校附近有一个新图书馆。",
      "sentence": "There is a new library near our school."
    },
    {
      "audio": "There are many people in the shopping centre.",
      "opts": [
        "There are many people in the shopping centre.",
        "There is a person in the shopping centre.",
        "There are many people near the shopping centre."
      ],
      "ans": 0,
      "hint": "注意地点",
      "zh": "购物中心里有那么多人。",
      "sentence": "There are many people in the shopping centre."
    },
    {
      "audio": "There is a panda in the zoo.",
      "opts": [
        "There is a panda in the zoo.",
        "There are pandas in the zoo.",
        "There is a panda near the zoo."
      ],
      "ans": 0,
      "hint": "注意单数和地点",
      "zh": "动物园里有一只熊猫。",
      "sentence": "There is a panda in the zoo."
    },
    {
      "audio": "There are some books on the shelf.",
      "opts": [
        "There are some books on the shelf.",
        "There is a book on the shelf.",
        "There are some books under the shelf."
      ],
      "ans": 0,
      "hint": "注意复数",
      "zh": "书架上有一些书。",
      "sentence": "There are some books on the shelf."
    },
    {
      "audio": "There is a doctor in the hospital.",
      "opts": [
        "There is a doctor in the hospital.",
        "There are doctors in the hospital.",
        "There is a doctor near the hospital."
      ],
      "ans": 0,
      "hint": "注意单数和地点",
      "zh": "医院里有一位医生。",
      "sentence": "There is a doctor in the hospital."
    },
    {
      "audio": "There are two umbrellas near the door.",
      "opts": [
        "There are two umbrellas near the door.",
        "There is an umbrella near the door.",
        "There are two umbrellas on the door."
      ],
      "ans": 0,
      "hint": "注意数量和介词",
      "zh": "门旁边有两把雨伞。",
      "sentence": "There are two umbrellas near the door."
    }
  ],
  "builds": [
    {
      "sentence": "There is a new library near our school.",
      "zh": "我们学校附近有一个新图书馆。",
      "tokens": [
        "There",
        "is",
        "a",
        "new",
        "library",
        "near",
        "our",
        "school"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "There are many people in the shopping centre.",
      "zh": "购物中心里有那么多人。",
      "tokens": [
        "There",
        "are",
        "many",
        "people",
        "in",
        "the",
        "shopping",
        "centre"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "sentence": "There is a panda eating bamboo in the zoo.",
      "zh": "动物园里有一只熊猫在吃竹子。",
      "tokens": [
        "There",
        "is",
        "a",
        "panda",
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
      "sentence": "There are some apples on the table.",
      "zh": "桌子上有一些苹果。",
      "tokens": [
        "There",
        "are",
        "some",
        "apples",
        "on",
        "the",
        "table"
      ],
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "sentence": "There is a bus stop near my home.",
      "zh": "我家附近有一个公交车站。",
      "tokens": [
        "There",
        "is",
        "a",
        "bus",
        "stop",
        "near",
        "my",
        "home"
      ],
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "sentence": "There are five birds in the tree.",
      "zh": "树上有五只鸟。",
      "tokens": [
        "There",
        "are",
        "five",
        "birds",
        "in",
        "the",
        "tree"
      ],
      "scene": "window",
      "image": "kp3d-window.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);