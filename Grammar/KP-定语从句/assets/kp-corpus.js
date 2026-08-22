(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "The boy who lives next door is my friend.",
      "zh": "住在我隔壁的男孩是我的朋友。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "I like the book that you gave me.",
      "zh": "我喜欢你给我的那本书。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The teacher who teaches us English is very kind.",
      "zh": "教我们英语的老师非常和蔼。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The panda that eats bamboo is in the zoo.",
      "zh": "吃竹子的熊猫在动物园里。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "The bus which goes to school is always crowded.",
      "zh": "去学校的公交车总是很挤。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "The apple that is on the table is for you.",
      "zh": "桌子上的那个苹果是给你的。",
      "tag": "daily_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "The girl who won the race is from our class.",
      "zh": "赢得赛跑的女孩来自我们班。",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "The dog which is barking is very noisy.",
      "zh": "正在叫的那只狗很吵。",
      "tag": "daily_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "The movie that we watched last night was funny.",
      "zh": "我们昨晚看的电影很有趣。",
      "tag": "exam_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "The woman who is talking to my mom is my aunt.",
      "zh": "正在和我妈妈说话的那个女人是我姑姑。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The pen which you borrowed is mine.",
      "zh": "你借的那支笔是我的。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The house that has a red roof is new.",
      "zh": "有红色屋顶的那座房子是新的。",
      "tag": "exam_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "The boy who is playing basketball is my brother.",
      "zh": "正在打篮球的男孩是我哥哥。",
      "tag": "exam_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "The book that is on the shelf is about animals.",
      "zh": "书架上的那本书是关于动物的。",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The girl which won the race is from our class. (错误示例)",
      "zh": "赢得赛跑的女孩来自我们班。（错误示例）",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "The doctor who works in the hospital is very busy.",
      "zh": "在医院工作的医生非常忙。",
      "tag": "exam_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "The umbrella that is broken belongs to Lily.",
      "zh": "那把坏了的伞是莉莉的。",
      "tag": "writing_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "The cat which is sleeping on the sofa is lazy.",
      "zh": "在沙发上睡觉的猫很懒。",
      "tag": "writing_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "The song that she sings is very beautiful.",
      "zh": "她唱的那首歌非常动听。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "The man who is wearing a hat is my uncle.",
      "zh": "戴帽子的那个男人是我叔叔。",
      "tag": "writing_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "The moon which is bright tonight is round.",
      "zh": "今晚明亮的月亮是圆的。",
      "tag": "writing_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "The cake that I made is for your birthday.",
      "zh": "我做的蛋糕是为你的生日准备的。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The bus that arrives at 7:00 is never late.",
      "zh": "七点到达的公交车从不晚点。",
      "tag": "writing_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "The student who studies hard will get good grades.",
      "zh": "努力学习的学生会取得好成绩。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    }
  ],
  "questions": [
    {
      "q": "The book _____ is on the desk is mine.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 1,
      "hint": "book 指物 which/that。",
      "sentence": "The book which is on the desk is mine.",
      "zh": "桌上那本书是我的。"
    },
    {
      "q": "Do you know the man _____ is talking to Miss Li?",
      "opts": [
        "which",
        "who",
        "what"
      ],
      "ans": 1,
      "hint": "man 指人 who。",
      "sentence": "Do you know the man who is talking to Miss Li?",
      "zh": "你认识正在和李老师说话的那个人吗？"
    },
    {
      "q": "This is the school _____ I study.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 2,
      "hint": "school 地点，从句缺地点状语 → where。",
      "sentence": "This is the school where I study.",
      "zh": "这是我上学的学校。"
    },
    {
      "q": "I lost the pen _____ I bought yesterday.",
      "opts": [
        "who",
        "that",
        "where"
      ],
      "ans": 1,
      "hint": "pen 指物 that/which。",
      "sentence": "I lost the pen that I bought yesterday.",
      "zh": "我把昨天买的笔弄丢了。"
    },
    {
      "q": "The students _____ are from Chengdu can speak Sichuan dialect.",
      "opts": [
        "which",
        "who",
        "where"
      ],
      "ans": 1,
      "hint": "students 指人 who。",
      "sentence": "The students who are from Chengdu can speak Sichuan dialect.",
      "zh": "来自成都的学生会说四川话。"
    },
    {
      "q": "The boy _____ lives next door is my friend.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 0,
      "hint": "指人用who",
      "sentence": "The boy who lives next door is my friend.",
      "zh": "住在我隔壁的男孩是我的朋友。"
    },
    {
      "q": "I like the book _____ you gave me.",
      "opts": [
        "which",
        "who",
        "whose"
      ],
      "ans": 0,
      "hint": "指物用which或that",
      "sentence": "I like the book which you gave me.",
      "zh": "我喜欢你给我的那本书。"
    },
    {
      "q": "The teacher _____ teaches us English is very kind.",
      "opts": [
        "which",
        "who",
        "whom"
      ],
      "ans": 1,
      "hint": "老师是人，用who",
      "sentence": "The teacher who teaches us English is very kind.",
      "zh": "教我们英语的老师非常和蔼。"
    },
    {
      "q": "The panda _____ eats bamboo is in the zoo.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 1,
      "hint": "熊猫是动物，用which",
      "sentence": "The panda which eats bamboo is in the zoo.",
      "zh": "吃竹子的熊猫在动物园里。"
    },
    {
      "q": "The bus _____ goes to school is always crowded.",
      "opts": [
        "who",
        "which",
        "whose"
      ],
      "ans": 1,
      "hint": "公交车是物",
      "sentence": "The bus which goes to school is always crowded.",
      "zh": "去学校的公交车总是很挤。"
    },
    {
      "q": "The apple _____ is on the table is for you.",
      "opts": [
        "that",
        "who",
        "where"
      ],
      "ans": 0,
      "hint": "苹果是物，可用that",
      "sentence": "The apple that is on the table is for you.",
      "zh": "桌子上的那个苹果是给你的。"
    },
    {
      "q": "The girl _____ won the race is from our class.",
      "opts": [
        "which",
        "who",
        "whose"
      ],
      "ans": 1,
      "hint": "女孩是人",
      "sentence": "The girl who won the race is from our class.",
      "zh": "赢得赛跑的女孩来自我们班。"
    },
    {
      "q": "The dog _____ is barking is very noisy.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 1,
      "hint": "狗是动物",
      "sentence": "The dog which is barking is very noisy.",
      "zh": "正在叫的那只狗很吵。"
    },
    {
      "q": "The movie _____ we watched last night was funny.",
      "opts": [
        "who",
        "that",
        "where"
      ],
      "ans": 1,
      "hint": "电影是物",
      "sentence": "The movie that we watched last night was funny.",
      "zh": "我们昨晚看的电影很有趣。"
    },
    {
      "q": "The woman _____ is talking to my mom is my aunt.",
      "opts": [
        "which",
        "who",
        "whose"
      ],
      "ans": 1,
      "hint": "女人是人",
      "sentence": "The woman who is talking to my mom is my aunt.",
      "zh": "正在和我妈妈说话的那个女人是我姑姑。"
    },
    {
      "q": "The pen _____ you borrowed is mine.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 1,
      "hint": "钢笔是物",
      "sentence": "The pen which you borrowed is mine.",
      "zh": "你借的那支笔是我的。"
    },
    {
      "q": "The house _____ has a red roof is new.",
      "opts": [
        "that",
        "who",
        "where"
      ],
      "ans": 0,
      "hint": "房子是物",
      "sentence": "The house that has a red roof is new.",
      "zh": "有红色屋顶的那座房子是新的。"
    },
    {
      "q": "The boy _____ is playing basketball is my brother.",
      "opts": [
        "which",
        "who",
        "where"
      ],
      "ans": 1,
      "hint": "男孩是人",
      "sentence": "The boy who is playing basketball is my brother.",
      "zh": "正在打篮球的男孩是我哥哥。"
    },
    {
      "q": "The book _____ is on the shelf is about animals.",
      "opts": [
        "who",
        "that",
        "where"
      ],
      "ans": 1,
      "hint": "书是物",
      "sentence": "The book that is on the shelf is about animals.",
      "zh": "书架上的那本书是关于动物的。"
    },
    {
      "q": "The doctor _____ works in the hospital is very busy.",
      "opts": [
        "which",
        "who",
        "whose"
      ],
      "ans": 1,
      "hint": "医生是人",
      "sentence": "The doctor who works in the hospital is very busy.",
      "zh": "在医院工作的医生非常忙。"
    },
    {
      "q": "The umbrella _____ is broken belongs to Lily.",
      "opts": [
        "who",
        "that",
        "where"
      ],
      "ans": 1,
      "hint": "伞是物",
      "sentence": "The umbrella that is broken belongs to Lily.",
      "zh": "那把坏了的伞是莉莉的。"
    },
    {
      "q": "The cat _____ is sleeping on the sofa is lazy.",
      "opts": [
        "which",
        "who",
        "where"
      ],
      "ans": 0,
      "hint": "猫是动物",
      "sentence": "The cat which is sleeping on the sofa is lazy.",
      "zh": "在沙发上睡觉的猫很懒。"
    },
    {
      "q": "The song _____ she sings is very beautiful.",
      "opts": [
        "who",
        "that",
        "where"
      ],
      "ans": 1,
      "hint": "歌曲是物",
      "sentence": "The song that she sings is very beautiful.",
      "zh": "她唱的那首歌非常动听。"
    },
    {
      "q": "The man _____ is wearing a hat is my uncle.",
      "opts": [
        "which",
        "who",
        "whose"
      ],
      "ans": 1,
      "hint": "男人是人",
      "sentence": "The man who is wearing a hat is my uncle.",
      "zh": "戴帽子的那个男人是我叔叔。"
    },
    {
      "q": "The moon _____ is bright tonight is round.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 1,
      "hint": "月亮是物",
      "sentence": "The moon which is bright tonight is round.",
      "zh": "今晚明亮的月亮是圆的。"
    },
    {
      "q": "The cake _____ I made is for your birthday.",
      "opts": [
        "that",
        "who",
        "where"
      ],
      "ans": 0,
      "hint": "蛋糕是物",
      "sentence": "The cake that I made is for your birthday.",
      "zh": "我做的蛋糕是为你的生日准备的。"
    },
    {
      "q": "The bus _____ arrives at 7:00 is never late.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 1,
      "hint": "公交车是物",
      "sentence": "The bus which arrives at 7:00 is never late.",
      "zh": "七点到达的公交车从不晚点。"
    },
    {
      "q": "The student _____ studies hard will get good grades.",
      "opts": [
        "which",
        "who",
        "whose"
      ],
      "ans": 1,
      "hint": "学生是人",
      "sentence": "The student who studies hard will get good grades.",
      "zh": "努力学习的学生会取得好成绩。"
    },
    {
      "q": "This is the school _____ I studied before.",
      "opts": [
        "which",
        "who",
        "where"
      ],
      "ans": 0,
      "hint": "学校是物",
      "sentence": "This is the school which I studied before.",
      "zh": "这是我以前学习的学校。"
    },
    {
      "q": "The children _____ are playing in the park are happy.",
      "opts": [
        "who",
        "which",
        "whose"
      ],
      "ans": 0,
      "hint": "孩子们是人",
      "sentence": "The children who are playing in the park are happy.",
      "zh": "在公园里玩的孩子们很开心。"
    },
    {
      "q": "The hamburger _____ I ate was delicious.",
      "opts": [
        "who",
        "which",
        "where"
      ],
      "ans": 1,
      "hint": "汉堡是物",
      "sentence": "The hamburger which I ate was delicious.",
      "zh": "我吃的汉堡很好吃。"
    },
    {
      "q": "The girl _____ is reading a book is my sister.",
      "opts": [
        "which",
        "who",
        "where"
      ],
      "ans": 1,
      "hint": "女孩是人",
      "sentence": "The girl who is reading a book is my sister.",
      "zh": "正在读书的女孩是我妹妹。"
    },
    {
      "q": "The picture _____ is on the wall is very nice.",
      "opts": [
        "who",
        "that",
        "where"
      ],
      "ans": 1,
      "hint": "图画是物",
      "sentence": "The picture that is on the wall is very nice.",
      "zh": "墙上的那幅画很好看。"
    }
  ],
  "matchPairs": [
    {
      "en": "who",
      "zh": "指人"
    },
    {
      "en": "which",
      "zh": "指物"
    },
    {
      "en": "that",
      "zh": "人/物"
    },
    {
      "en": "where",
      "zh": "指地点"
    },
    {
      "en": "the boy who lives next door",
      "zh": "住隔壁的男孩"
    },
    {
      "en": "the book that you gave me",
      "zh": "你给我的书"
    },
    {
      "en": "the teacher who teaches English",
      "zh": "教英语的老师"
    },
    {
      "en": "the panda which eats bamboo",
      "zh": "吃竹子的熊猫"
    },
    {
      "en": "the bus which goes to school",
      "zh": "去学校的公交车"
    },
    {
      "en": "the apple that is on the table",
      "zh": "桌子上的苹果"
    },
    {
      "en": "the girl who won the race",
      "zh": "赢得赛跑的女孩"
    },
    {
      "en": "the dog which is barking",
      "zh": "正在叫的狗"
    },
    {
      "en": "the movie that we watched",
      "zh": "我们看的电影"
    },
    {
      "en": "the woman who is talking",
      "zh": "正在说话的女人"
    }
  ],
  "listenPick": [
    {
      "audio": "The boy who lives next door is my friend.",
      "opts": [
        "The boy who lives next door is my friend.",
        "The boy which lives next door is my friend.",
        "The boy where lives next door is my friend."
      ],
      "ans": 0,
      "hint": "指人用who",
      "zh": "住在我隔壁的男孩是我的朋友。",
      "sentence": "The boy who lives next door is my friend."
    },
    {
      "audio": "I like the book that you gave me.",
      "opts": [
        "I like the book that you gave me.",
        "I like the book who you gave me.",
        "I like the book where you gave me."
      ],
      "ans": 0,
      "hint": "指物用that",
      "zh": "我喜欢你给我的那本书。",
      "sentence": "I like the book that you gave me."
    },
    {
      "audio": "The teacher who teaches us English is very kind.",
      "opts": [
        "The teacher who teaches us English is very kind.",
        "The teacher which teaches us English is very kind.",
        "The teacher where teaches us English is very kind."
      ],
      "ans": 0,
      "hint": "老师是人",
      "zh": "教我们英语的老师非常和蔼。",
      "sentence": "The teacher who teaches us English is very kind."
    },
    {
      "audio": "The panda which eats bamboo is in the zoo.",
      "opts": [
        "The panda which eats bamboo is in the zoo.",
        "The panda who eats bamboo is in the zoo.",
        "The panda where eats bamboo is in the zoo."
      ],
      "ans": 0,
      "hint": "熊猫是动物",
      "zh": "吃竹子的熊猫在动物园里。",
      "sentence": "The panda which eats bamboo is in the zoo."
    },
    {
      "audio": "The bus which goes to school is always crowded.",
      "opts": [
        "The bus which goes to school is always crowded.",
        "The bus who goes to school is always crowded.",
        "The bus where goes to school is always crowded."
      ],
      "ans": 0,
      "hint": "公交车是物",
      "zh": "去学校的公交车总是很挤。",
      "sentence": "The bus which goes to school is always crowded."
    },
    {
      "audio": "The apple that is on the table is for you.",
      "opts": [
        "The apple that is on the table is for you.",
        "The apple who is on the table is for you.",
        "The apple where is on the table is for you."
      ],
      "ans": 0,
      "hint": "苹果是物",
      "zh": "桌子上的那个苹果是给你的。",
      "sentence": "The apple that is on the table is for you."
    },
    {
      "audio": "The girl who won the race is from our class.",
      "opts": [
        "The girl who won the race is from our class.",
        "The girl which won the race is from our class.",
        "The girl where won the race is from our class."
      ],
      "ans": 0,
      "hint": "女孩是人",
      "zh": "赢得赛跑的女孩来自我们班。",
      "sentence": "The girl who won the race is from our class."
    },
    {
      "audio": "The dog which is barking is very noisy.",
      "opts": [
        "The dog which is barking is very noisy.",
        "The dog who is barking is very noisy.",
        "The dog where is barking is very noisy."
      ],
      "ans": 0,
      "hint": "狗是动物",
      "zh": "正在叫的那只狗很吵。",
      "sentence": "The dog which is barking is very noisy."
    }
  ],
  "builds": [
    {
      "sentence": "The boy who lives next door is my friend.",
      "zh": "住在我隔壁的男孩是我的朋友。",
      "tokens": [
        "The",
        "boy",
        "who",
        "lives",
        "next",
        "door",
        "is",
        "my",
        "friend"
      ],
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "sentence": "I like the book that you gave me.",
      "zh": "我喜欢你给我的那本书。",
      "tokens": [
        "I",
        "like",
        "the",
        "book",
        "that",
        "you",
        "gave",
        "me"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "The panda which eats bamboo is in the zoo.",
      "zh": "吃竹子的熊猫在动物园里。",
      "tokens": [
        "The",
        "panda",
        "which",
        "eats",
        "bamboo",
        "is",
        "in",
        "the",
        "zoo"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "The bus which goes to school is always crowded.",
      "zh": "去学校的公交车总是很挤。",
      "tokens": [
        "The",
        "bus",
        "which",
        "goes",
        "to",
        "school",
        "is",
        "always",
        "crowded"
      ],
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "sentence": "The apple that is on the table is for you.",
      "zh": "桌子上的那个苹果是给你的。",
      "tokens": [
        "The",
        "apple",
        "that",
        "is",
        "on",
        "the",
        "table",
        "is",
        "for",
        "you"
      ],
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "sentence": "The girl who won the race is from our class.",
      "zh": "赢得赛跑的女孩来自我们班。",
      "tokens": [
        "The",
        "girl",
        "who",
        "won",
        "the",
        "race",
        "is",
        "from",
        "our",
        "class"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);