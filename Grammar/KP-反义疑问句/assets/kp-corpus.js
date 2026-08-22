(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "Let's play basketball, shall we?",
      "zh": "我们去打篮球，好吗？",
      "tag": "daily_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "Let's go to the library, shall we?",
      "zh": "我们去图书馆，好吗？",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Let's eat hotpot, shall we?",
      "zh": "我们吃火锅，好吗？",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "Let's watch the panda, shall we?",
      "zh": "我们去看熊猫，好吗？",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "Let's take the bus, shall we?",
      "zh": "我们坐公交车，好吗？",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "Let's clean the classroom, shall we?",
      "zh": "我们打扫教室，好吗？",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Let's open the window, shall we?",
      "zh": "我们打开窗户，好吗？",
      "tag": "daily_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "Let's play the piano, shall we?",
      "zh": "我们弹钢琴，好吗？",
      "tag": "daily_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "She likes English, doesn't she?",
      "zh": "她喜欢英语，不是吗？",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "He is a doctor, isn't he?",
      "zh": "他是医生，不是吗？",
      "tag": "exam_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "They are playing on the playground, aren't they?",
      "zh": "他们在操场上玩，不是吗？",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "You have an umbrella, don't you?",
      "zh": "你有一把伞，不是吗？",
      "tag": "exam_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "The cat is sleeping, isn't it?",
      "zh": "猫在睡觉，不是吗？",
      "tag": "exam_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "We can see the moon, can't we?",
      "zh": "我们能看到月亮，不是吗？",
      "tag": "exam_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "The apple is red, isn't it?",
      "zh": "苹果是红色的，不是吗？",
      "tag": "exam_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "Tom is taller than Mike, isn't he?",
      "zh": "汤姆比迈克高，不是吗？",
      "tag": "exam_use",
      "scene": "taller",
      "image": "kp3d-taller.png"
    },
    {
      "en": "Let's go shopping, shall we?",
      "zh": "我们去购物，好吗？",
      "tag": "writing_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "Let's have dinner together, shall we?",
      "zh": "我们一起吃晚饭，好吗？",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "Let's visit the museum, shall we?",
      "zh": "我们参观博物馆，好吗？",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Let's draw a picture, shall we?",
      "zh": "我们画一幅画，好吗？",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Let's read a book, shall we?",
      "zh": "我们读一本书，好吗？",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Let's ride a bike, shall we?",
      "zh": "我们骑自行车，好吗？",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "Let's buy some fruit, shall we?",
      "zh": "我们买些水果，好吗？",
      "tag": "writing_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "Let's practice English, shall we?",
      "zh": "我们练习英语，好吗？",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    }
  ],
  "questions": [
    {
      "q": "He can swim, _____?",
      "opts": [
        "can he",
        "can't he",
        "doesn't he"
      ],
      "ans": 1,
      "hint": "前肯 can，后否 can't he。",
      "sentence": "He can swim, can't he?",
      "zh": "他会游泳，不是吗？"
    },
    {
      "q": "They don't like coffee, _____?",
      "opts": [
        "do they",
        "don't they",
        "are they"
      ],
      "ans": 0,
      "hint": "前否 don't，后肯 do they。",
      "sentence": "They don't like coffee, do they?",
      "zh": "他们不喜欢咖啡，是吗？"
    },
    {
      "q": "Open the door, _____?",
      "opts": [
        "shall we",
        "will you",
        "do you"
      ],
      "ans": 1,
      "hint": "祈使句 will you。",
      "sentence": "Open the door, will you?",
      "zh": "打开门，好吗？"
    },
    {
      "q": "There is a book, _____?",
      "opts": [
        "isn't there",
        "isn't it",
        "is there"
      ],
      "ans": 0,
      "hint": "There be 反问用 there。",
      "sentence": "There is a book, isn't there?",
      "zh": "有一本书，对吧？"
    },
    {
      "q": "Let's have a rest, _____?",
      "opts": [
        "will you",
        "shall we",
        "don't we"
      ],
      "ans": 1,
      "hint": "Let's → shall we。",
      "sentence": "Let's have a rest, shall we?",
      "zh": "我们休息一下吧，好吗？"
    },
    {
      "q": "Let's go to the park, _____?",
      "opts": [
        "shall we",
        "will you",
        "don't we"
      ],
      "ans": 0,
      "hint": "Let's 开头用 shall we",
      "sentence": "Let's go to the park, shall we?",
      "zh": "我们去公园，好吗？"
    },
    {
      "q": "Let's play basketball, _____?",
      "opts": [
        "shall we",
        "will you",
        "do we"
      ],
      "ans": 0,
      "hint": "Let's 的反义疑问句固定用 shall we",
      "sentence": "Let's play basketball, shall we?",
      "zh": "我们去打篮球，好吗？"
    },
    {
      "q": "She likes English, _____?",
      "opts": [
        "doesn't she",
        "does she",
        "isn't she"
      ],
      "ans": 0,
      "hint": "前肯后否，likes 用 doesn't",
      "sentence": "She likes English, doesn't she?",
      "zh": "她喜欢英语，不是吗？"
    },
    {
      "q": "He is a doctor, _____?",
      "opts": [
        "isn't he",
        "is he",
        "doesn't he"
      ],
      "ans": 0,
      "hint": "is 的反义疑问句用 isn't",
      "sentence": "He is a doctor, isn't he?",
      "zh": "他是医生，不是吗？"
    },
    {
      "q": "They are playing on the playground, _____?",
      "opts": [
        "aren't they",
        "are they",
        "don't they"
      ],
      "ans": 0,
      "hint": "are 的反义疑问句用 aren't",
      "sentence": "They are playing on the playground, aren't they?",
      "zh": "他们在操场上玩，不是吗？"
    },
    {
      "q": "You have an umbrella, _____?",
      "opts": [
        "don't you",
        "do you",
        "haven't you"
      ],
      "ans": 0,
      "hint": "have 表示拥有时，反义疑问句用 don't",
      "sentence": "You have an umbrella, don't you?",
      "zh": "你有一把伞，不是吗？"
    },
    {
      "q": "The cat is sleeping, _____?",
      "opts": [
        "isn't it",
        "is it",
        "doesn't it"
      ],
      "ans": 0,
      "hint": "is 的反义疑问句用 isn't",
      "sentence": "The cat is sleeping, isn't it?",
      "zh": "猫在睡觉，不是吗？"
    },
    {
      "q": "We can see the moon, _____?",
      "opts": [
        "can't we",
        "can we",
        "don't we"
      ],
      "ans": 0,
      "hint": "can 的反义疑问句用 can't",
      "sentence": "We can see the moon, can't we?",
      "zh": "我们能看到月亮，不是吗？"
    },
    {
      "q": "The apple is red, _____?",
      "opts": [
        "isn't it",
        "is it",
        "doesn't it"
      ],
      "ans": 0,
      "hint": "is 的反义疑问句用 isn't",
      "sentence": "The apple is red, isn't it?",
      "zh": "苹果是红色的，不是吗？"
    },
    {
      "q": "Tom is taller than Mike, _____?",
      "opts": [
        "isn't he",
        "is he",
        "doesn't he"
      ],
      "ans": 0,
      "hint": "is 的反义疑问句用 isn't",
      "sentence": "Tom is taller than Mike, isn't he?",
      "zh": "汤姆比迈克高，不是吗？"
    },
    {
      "q": "Let's take the bus, _____?",
      "opts": [
        "shall we",
        "will you",
        "do we"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "sentence": "Let's take the bus, shall we?",
      "zh": "我们坐公交车，好吗？"
    },
    {
      "q": "Let's eat hotpot, _____?",
      "opts": [
        "shall we",
        "will you",
        "don't we"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "sentence": "Let's eat hotpot, shall we?",
      "zh": "我们吃火锅，好吗？"
    },
    {
      "q": "She doesn't like cats, _____?",
      "opts": [
        "does she",
        "doesn't she",
        "is she"
      ],
      "ans": 0,
      "hint": "前否后肯",
      "sentence": "She doesn't like cats, does she?",
      "zh": "她不喜欢猫，是吗？"
    },
    {
      "q": "He isn't a teacher, _____?",
      "opts": [
        "is he",
        "isn't he",
        "does he"
      ],
      "ans": 0,
      "hint": "前否后肯",
      "sentence": "He isn't a teacher, is he?",
      "zh": "他不是老师，是吗？"
    },
    {
      "q": "They don't play basketball, _____?",
      "opts": [
        "do they",
        "don't they",
        "are they"
      ],
      "ans": 0,
      "hint": "前否后肯",
      "sentence": "They don't play basketball, do they?",
      "zh": "他们不打篮球，是吗？"
    },
    {
      "q": "You aren't a student, _____?",
      "opts": [
        "are you",
        "aren't you",
        "do you"
      ],
      "ans": 0,
      "hint": "前否后肯",
      "sentence": "You aren't a student, are you?",
      "zh": "你不是学生，是吗？"
    },
    {
      "q": "Let's clean the classroom, _____?",
      "opts": [
        "shall we",
        "will you",
        "do we"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "sentence": "Let's clean the classroom, shall we?",
      "zh": "我们打扫教室，好吗？"
    },
    {
      "q": "Let's open the window, _____?",
      "opts": [
        "shall we",
        "will you",
        "don't we"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "sentence": "Let's open the window, shall we?",
      "zh": "我们打开窗户，好吗？"
    },
    {
      "q": "Let's play the piano, _____?",
      "opts": [
        "shall we",
        "will you",
        "do we"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "sentence": "Let's play the piano, shall we?",
      "zh": "我们弹钢琴，好吗？"
    },
    {
      "q": "She is a doctor, _____?",
      "opts": [
        "isn't she",
        "is she",
        "doesn't she"
      ],
      "ans": 0,
      "hint": "is 的反义疑问句用 isn't",
      "sentence": "She is a doctor, isn't she?",
      "zh": "她是医生，不是吗？"
    },
    {
      "q": "He has a cat, _____?",
      "opts": [
        "doesn't he",
        "does he",
        "hasn't he"
      ],
      "ans": 0,
      "hint": "has 表示拥有时，反义疑问句用 doesn't",
      "sentence": "He has a cat, doesn't he?",
      "zh": "他有一只猫，不是吗？"
    },
    {
      "q": "They are in the library, _____?",
      "opts": [
        "aren't they",
        "are they",
        "don't they"
      ],
      "ans": 0,
      "hint": "are 的反义疑问句用 aren't",
      "sentence": "They are in the library, aren't they?",
      "zh": "他们在图书馆，不是吗？"
    },
    {
      "q": "We are good friends, _____?",
      "opts": [
        "aren't we",
        "are we",
        "don't we"
      ],
      "ans": 0,
      "hint": "are 的反义疑问句用 aren't",
      "sentence": "We are good friends, aren't we?",
      "zh": "我们是好朋友，不是吗？"
    },
    {
      "q": "The bus is coming, _____?",
      "opts": [
        "isn't it",
        "is it",
        "doesn't it"
      ],
      "ans": 0,
      "hint": "is 的反义疑问句用 isn't",
      "sentence": "The bus is coming, isn't it?",
      "zh": "公交车来了，不是吗？"
    },
    {
      "q": "The panda is cute, _____?",
      "opts": [
        "isn't it",
        "is it",
        "doesn't it"
      ],
      "ans": 0,
      "hint": "is 的反义疑问句用 isn't",
      "sentence": "The panda is cute, isn't it?",
      "zh": "熊猫很可爱，不是吗？"
    },
    {
      "q": "Let's go shopping, _____?",
      "opts": [
        "shall we",
        "will you",
        "do we"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "sentence": "Let's go shopping, shall we?",
      "zh": "我们去购物，好吗？"
    },
    {
      "q": "She can swim, _____?",
      "opts": [
        "can't she",
        "can she",
        "doesn't she"
      ],
      "ans": 0,
      "hint": "can 的反义疑问句用 can't",
      "sentence": "She can swim, can't she?",
      "zh": "她会游泳，不是吗？"
    },
    {
      "q": "You like pandas, _____?",
      "opts": [
        "don't you",
        "do you",
        "aren't you"
      ],
      "ans": 0,
      "hint": "like 是实义动词，用 don't",
      "sentence": "You like pandas, don't you?",
      "zh": "你喜欢熊猫，不是吗？"
    }
  ],
  "matchPairs": [
    {
      "en": "shall we?",
      "zh": "好吗？（Let's）"
    },
    {
      "en": "will you?",
      "zh": "好吗？（祈使）"
    },
    {
      "en": "isn't he?",
      "zh": "不是吗？"
    },
    {
      "en": "do they?",
      "zh": "是吗？（前否后肯）"
    },
    {
      "en": "Let's play basketball",
      "zh": "我们去打篮球"
    },
    {
      "en": "Shall we?",
      "zh": "好吗？"
    },
    {
      "en": "She likes English",
      "zh": "她喜欢英语"
    },
    {
      "en": "Doesn't she?",
      "zh": "不是吗？"
    },
    {
      "en": "He is a doctor",
      "zh": "他是医生"
    },
    {
      "en": "Isn't he?",
      "zh": "不是吗？"
    },
    {
      "en": "You have an umbrella",
      "zh": "你有一把伞"
    },
    {
      "en": "Don't you?",
      "zh": "不是吗？"
    },
    {
      "en": "Let's go to the library",
      "zh": "我们去图书馆"
    },
    {
      "en": "Will you?",
      "zh": "好吗？（用于祈使句）"
    }
  ],
  "listenPick": [
    {
      "audio": "Let's play basketball, shall we?",
      "opts": [
        "Let's play basketball, shall we?",
        "Let's play basketball, will you?",
        "Let's play basketball, don't we?"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "zh": "我们去打篮球，好吗？",
      "sentence": "Let's play basketball, shall we?"
    },
    {
      "audio": "She likes English, doesn't she?",
      "opts": [
        "She likes English, doesn't she?",
        "She likes English, does she?",
        "She likes English, isn't she?"
      ],
      "ans": 0,
      "hint": "前肯后否",
      "zh": "她喜欢英语，不是吗？",
      "sentence": "She likes English, doesn't she?"
    },
    {
      "audio": "He is a doctor, isn't he?",
      "opts": [
        "He is a doctor, isn't he?",
        "He is a doctor, is he?",
        "He is a doctor, doesn't he?"
      ],
      "ans": 0,
      "hint": "is 用 isn't",
      "zh": "他是医生，不是吗？",
      "sentence": "He is a doctor, isn't he?"
    },
    {
      "audio": "You have an umbrella, don't you?",
      "opts": [
        "You have an umbrella, don't you?",
        "You have an umbrella, have you?",
        "You have an umbrella, do you?"
      ],
      "ans": 0,
      "hint": "have 用 don't",
      "zh": "你有一把伞，不是吗？",
      "sentence": "You have an umbrella, don't you?"
    },
    {
      "audio": "Let's go to the library, shall we?",
      "opts": [
        "Let's go to the library, shall we?",
        "Let's go to the library, will you?",
        "Let's go to the library, don't we?"
      ],
      "ans": 0,
      "hint": "Let's 用 shall we",
      "zh": "我们去图书馆，好吗？",
      "sentence": "Let's go to the library, shall we?"
    },
    {
      "audio": "They are playing on the playground, aren't they?",
      "opts": [
        "They are playing on the playground, aren't they?",
        "They are playing on the playground, are they?",
        "They are playing on the playground, don't they?"
      ],
      "ans": 0,
      "hint": "are 用 aren't",
      "zh": "他们在操场上玩，不是吗？",
      "sentence": "They are playing on the playground, aren't they?"
    },
    {
      "audio": "The cat is sleeping, isn't it?",
      "opts": [
        "The cat is sleeping, isn't it?",
        "The cat is sleeping, is it?",
        "The cat is sleeping, doesn't it?"
      ],
      "ans": 0,
      "hint": "is 用 isn't",
      "zh": "猫在睡觉，不是吗？",
      "sentence": "The cat is sleeping, isn't it?"
    },
    {
      "audio": "We can see the moon, can't we?",
      "opts": [
        "We can see the moon, can't we?",
        "We can see the moon, can we?",
        "We can see the moon, don't we?"
      ],
      "ans": 0,
      "hint": "can 用 can't",
      "zh": "我们能看到月亮，不是吗？",
      "sentence": "We can see the moon, can't we?"
    }
  ],
  "builds": [
    {
      "sentence": "Let's go to the park, shall we?",
      "zh": "我们去公园，好吗？",
      "tokens": [
        "Let's",
        "go",
        "to",
        "the",
        "park,",
        "shall",
        "we"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "sentence": "She is a teacher, isn't she?",
      "zh": "她是老师，不是吗？",
      "tokens": [
        "She",
        "is",
        "a",
        "teacher,",
        "isn't",
        "she"
      ],
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "sentence": "They are eating dinner, aren't they?",
      "zh": "他们在吃晚饭，不是吗？",
      "tokens": [
        "They",
        "are",
        "eating",
        "dinner,",
        "aren't",
        "they"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "sentence": "You can play the piano, can't you?",
      "zh": "你会弹钢琴，不是吗？",
      "tokens": [
        "You",
        "can",
        "play",
        "the",
        "piano,",
        "can't",
        "you"
      ],
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "sentence": "The panda is in the zoo, isn't it?",
      "zh": "熊猫在动物园里，不是吗？",
      "tokens": [
        "The",
        "panda",
        "is",
        "in",
        "the",
        "zoo,",
        "isn't",
        "it"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "Let's buy some apples, shall we?",
      "zh": "我们买些苹果，好吗？",
      "tokens": [
        "Let's",
        "buy",
        "some",
        "apples,",
        "shall",
        "we"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);