(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "I know that pandas eat bamboo.",
      "zh": "我知道熊猫吃竹子。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "I think that our team will win the game.",
      "zh": "我认为我们队会赢下比赛。",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "She says that the library opens at nine.",
      "zh": "她说图书馆九点开门。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Do you know what time the bus leaves?",
      "zh": "你知道公交车几点出发吗？",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "I know where the cat is hiding.",
      "zh": "我知道猫藏在哪里。",
      "tag": "daily_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "He thinks that the moon is beautiful tonight.",
      "zh": "他觉得今晚的月亮很美。",
      "tag": "daily_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "I know that the doctor is very kind.",
      "zh": "我知道那位医生很和蔼。",
      "tag": "daily_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "We think that the apple is sweet.",
      "zh": "我们觉得这个苹果很甜。",
      "tag": "daily_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "I know that he plays the piano well.",
      "zh": "我知道他钢琴弹得好。",
      "tag": "exam_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "Can you tell me what she wants?",
      "zh": "你能告诉我她想要什么吗？",
      "tag": "exam_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "I don't know if it will rain tomorrow.",
      "zh": "我不知道明天会不会下雨。",
      "tag": "exam_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "She knows that the window is open.",
      "zh": "她知道窗户开着。",
      "tag": "exam_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "I think that the tall boy is my friend.",
      "zh": "我认为那个高个男孩是我朋友。",
      "tag": "exam_use",
      "scene": "taller",
      "image": "kp3d-taller.png"
    },
    {
      "en": "Do you know where the classroom is?",
      "zh": "你知道教室在哪里吗？",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "He says that dinner is ready.",
      "zh": "他说晚饭准备好了。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "I know that the basketball is under the desk.",
      "zh": "我知道篮球在桌子下面。",
      "tag": "exam_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "I think that we should go to the park.",
      "zh": "我认为我们应该去公园。",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "She says that she likes hotpot.",
      "zh": "她说她喜欢火锅。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "I know that Chengdu is a big city.",
      "zh": "我知道成都是一个大城市。",
      "tag": "writing_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "He thinks that the book is interesting.",
      "zh": "他觉得这本书很有趣。",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "I don't know what he is doing now.",
      "zh": "我不知道他现在在做什么。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "We know that the panda is very cute.",
      "zh": "我们知道熊猫很可爱。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "She thinks that the piano lesson is fun.",
      "zh": "她觉得钢琴课很有趣。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "I know that the shop sells apples.",
      "zh": "我知道那家店卖苹果。",
      "tag": "writing_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    }
  ],
  "questions": [
    {
      "q": "He said _____ he was tired.",
      "opts": [
        "what",
        "that",
        "if"
      ],
      "ans": 1,
      "hint": "陈述用 that（可省略）。",
      "sentence": "He said that he was tired.",
      "zh": "他说他累了。"
    },
    {
      "q": "I wonder _____ it will rain tomorrow.",
      "opts": [
        "that",
        "what",
        "if"
      ],
      "ans": 2,
      "hint": "是否 → if/whether。",
      "sentence": "I wonder if it will rain tomorrow.",
      "zh": "我想知道明天会不会下雨。"
    },
    {
      "q": "Do you know _____?",
      "opts": [
        "where is the library",
        "where the library is",
        "where the library"
      ],
      "ans": 1,
      "hint": "陈述语序：where the library is。",
      "sentence": "Do you know where the library is?",
      "zh": "你知道图书馆在哪吗？"
    },
    {
      "q": "She asked me _____ I liked Chengdu.",
      "opts": [
        "that",
        "if",
        "what"
      ],
      "ans": 1,
      "hint": "一般疑问变从句用 if。",
      "sentence": "She asked me if I liked Chengdu.",
      "zh": "她问我喜不喜欢成都。"
    },
    {
      "q": "I believe _____ he _____ right.",
      "opts": [
        "that; is",
        "what; is",
        "that; are"
      ],
      "ans": 0,
      "hint": "that + he is。",
      "sentence": "I believe that he is right.",
      "zh": "我相信他是对的。"
    },
    {
      "q": "I know _____ he lives in Chengdu.",
      "opts": [
        "that",
        "what",
        "if"
      ],
      "ans": 0,
      "hint": "陈述一个事实，用 that",
      "sentence": "I know that he lives in Chengdu.",
      "zh": "我知道他住在成都。"
    },
    {
      "q": "Do you know _____ the bus comes?",
      "opts": [
        "what",
        "when",
        "if"
      ],
      "ans": 1,
      "hint": "询问时间，用 when",
      "sentence": "Do you know when the bus comes?",
      "zh": "你知道公交车什么时候来吗？"
    },
    {
      "q": "I don't know _____ she likes apples.",
      "opts": [
        "that",
        "if",
        "what"
      ],
      "ans": 1,
      "hint": "不确定是否，用 if",
      "sentence": "I don't know if she likes apples.",
      "zh": "我不知道她是否喜欢苹果。"
    },
    {
      "q": "She thinks _____ the cat is sleeping.",
      "opts": [
        "what",
        "if",
        "that"
      ],
      "ans": 2,
      "hint": "陈述想法，用 that",
      "sentence": "She thinks that the cat is sleeping.",
      "zh": "她认为猫在睡觉。"
    },
    {
      "q": "Can you tell me _____ the library is?",
      "opts": [
        "where",
        "that",
        "if"
      ],
      "ans": 0,
      "hint": "询问地点，用 where",
      "sentence": "Can you tell me where the library is?",
      "zh": "你能告诉我图书馆在哪里吗？"
    },
    {
      "q": "I know _____ the moon is round.",
      "opts": [
        "what",
        "that",
        "if"
      ],
      "ans": 1,
      "hint": "陈述事实，用 that",
      "sentence": "I know that the moon is round.",
      "zh": "我知道月亮是圆的。"
    },
    {
      "q": "He says _____ he will come to school.",
      "opts": [
        "if",
        "what",
        "that"
      ],
      "ans": 2,
      "hint": "转述内容，用 that",
      "sentence": "He says that he will come to school.",
      "zh": "他说他会来学校。"
    },
    {
      "q": "I wonder _____ the doctor is free.",
      "opts": [
        "that",
        "if",
        "what"
      ],
      "ans": 1,
      "hint": "不确定是否，用 if",
      "sentence": "I wonder if the doctor is free.",
      "zh": "我想知道医生是否有空。"
    },
    {
      "q": "Do you know _____ the window is broken?",
      "opts": [
        "what",
        "that",
        "if"
      ],
      "ans": 2,
      "hint": "询问是否，用 if",
      "sentence": "Do you know if the window is broken?",
      "zh": "你知道窗户是否破了吗？"
    },
    {
      "q": "I think _____ the basketball is new.",
      "opts": [
        "that",
        "what",
        "if"
      ],
      "ans": 0,
      "hint": "陈述想法，用 that",
      "sentence": "I think that the basketball is new.",
      "zh": "我认为这个篮球是新的。"
    },
    {
      "q": "She doesn't know _____ he likes hotpot.",
      "opts": [
        "that",
        "where",
        "if"
      ],
      "ans": 2,
      "hint": "不确定是否，用 if",
      "sentence": "She doesn't know if he likes hotpot.",
      "zh": "她不知道他是否喜欢火锅。"
    },
    {
      "q": "We know _____ the panda is in the zoo.",
      "opts": [
        "what",
        "that",
        "if"
      ],
      "ans": 1,
      "hint": "陈述事实，用 that",
      "sentence": "We know that the panda is in the zoo.",
      "zh": "我们知道熊猫在动物园里。"
    },
    {
      "q": "Can you tell me _____ the piano is?",
      "opts": [
        "where",
        "that",
        "if"
      ],
      "ans": 0,
      "hint": "询问地点，用 where",
      "sentence": "Can you tell me where the piano is?",
      "zh": "你能告诉我钢琴在哪里吗？"
    },
    {
      "q": "I know _____ the shop is open.",
      "opts": [
        "what",
        "if",
        "that"
      ],
      "ans": 2,
      "hint": "陈述事实，用 that",
      "sentence": "I know that the shop is open.",
      "zh": "我知道那家店开着。"
    },
    {
      "q": "Do you know _____ he is taller than me?",
      "opts": [
        "what",
        "if",
        "that"
      ],
      "ans": 1,
      "hint": "询问是否，用 if",
      "sentence": "Do you know if he is taller than me?",
      "zh": "你知道他是否比我高吗？"
    },
    {
      "q": "She thinks _____ the dinner is delicious.",
      "opts": [
        "that",
        "what",
        "if"
      ],
      "ans": 0,
      "hint": "陈述想法，用 that",
      "sentence": "She thinks that the dinner is delicious.",
      "zh": "她觉得晚餐很好吃。"
    },
    {
      "q": "I don't know _____ he is in the classroom.",
      "opts": [
        "that",
        "if",
        "what"
      ],
      "ans": 1,
      "hint": "不确定是否，用 if",
      "sentence": "I don't know if he is in the classroom.",
      "zh": "我不知道他是否在教室里。"
    },
    {
      "q": "We think _____ the playground is big.",
      "opts": [
        "what",
        "that",
        "if"
      ],
      "ans": 1,
      "hint": "陈述想法，用 that",
      "sentence": "We think that the playground is big.",
      "zh": "我们认为操场很大。"
    },
    {
      "q": "Can you tell me _____ the bus goes?",
      "opts": [
        "where",
        "that",
        "if"
      ],
      "ans": 0,
      "hint": "询问地点，用 where",
      "sentence": "Can you tell me where the bus goes?",
      "zh": "你能告诉我公交车去哪里吗？"
    },
    {
      "q": "I know _____ the apple is on the table.",
      "opts": [
        "that",
        "what",
        "if"
      ],
      "ans": 0,
      "hint": "陈述事实，用 that",
      "sentence": "I know that the apple is on the table.",
      "zh": "我知道苹果在桌子上。"
    },
    {
      "q": "He doesn't know _____ she plays the piano.",
      "opts": [
        "that",
        "if",
        "what"
      ],
      "ans": 1,
      "hint": "不确定是否，用 if",
      "sentence": "He doesn't know if she plays the piano.",
      "zh": "他不知道她是否弹钢琴。"
    },
    {
      "q": "I think _____ the umbrella is in the bag.",
      "opts": [
        "what",
        "if",
        "that"
      ],
      "ans": 2,
      "hint": "陈述想法，用 that",
      "sentence": "I think that the umbrella is in the bag.",
      "zh": "我认为雨伞在包里。"
    },
    {
      "q": "Do you know _____ the cat is?",
      "opts": [
        "where",
        "that",
        "if"
      ],
      "ans": 0,
      "hint": "询问地点，用 where",
      "sentence": "Do you know where the cat is?",
      "zh": "你知道猫在哪里吗？"
    },
    {
      "q": "She says _____ she will go to the shop.",
      "opts": [
        "that",
        "what",
        "if"
      ],
      "ans": 0,
      "hint": "转述内容，用 that",
      "sentence": "She says that she will go to the shop.",
      "zh": "她说她要去商店。"
    },
    {
      "q": "I don't know _____ the doctor comes today.",
      "opts": [
        "that",
        "if",
        "what"
      ],
      "ans": 1,
      "hint": "不确定是否，用 if",
      "sentence": "I don't know if the doctor comes today.",
      "zh": "我不知道医生今天是否来。"
    },
    {
      "q": "We know _____ the moon is far away.",
      "opts": [
        "what",
        "if",
        "that"
      ],
      "ans": 2,
      "hint": "陈述事实，用 that",
      "sentence": "We know that the moon is far away.",
      "zh": "我们知道月亮很远。"
    },
    {
      "q": "Can you tell me _____ the basketball is?",
      "opts": [
        "where",
        "that",
        "if"
      ],
      "ans": 0,
      "hint": "询问地点，用 where",
      "sentence": "Can you tell me where the basketball is?",
      "zh": "你能告诉我篮球在哪里吗？"
    },
    {
      "q": "He thinks _____ the window is clean.",
      "opts": [
        "that",
        "what",
        "if"
      ],
      "ans": 0,
      "hint": "陈述想法，用 that",
      "sentence": "He thinks that the window is clean.",
      "zh": "他认为窗户很干净。"
    }
  ],
  "matchPairs": [
    {
      "en": "I know that…",
      "zh": "我知道……"
    },
    {
      "en": "I wonder if…",
      "zh": "我想知道是否……"
    },
    {
      "en": "where he lives",
      "zh": "他住在哪里（陈述语序）"
    },
    {
      "en": "what we can do",
      "zh": "我们能做什么"
    },
    {
      "en": "I know that",
      "zh": "我知道"
    },
    {
      "en": "I think that",
      "zh": "我认为"
    },
    {
      "en": "She says that",
      "zh": "她说"
    },
    {
      "en": "Do you know if",
      "zh": "你是否知道"
    },
    {
      "en": "I don't know what",
      "zh": "我不知道什么"
    },
    {
      "en": "He thinks that",
      "zh": "他认为"
    },
    {
      "en": "Can you tell me where",
      "zh": "你能告诉我哪里"
    },
    {
      "en": "We know that",
      "zh": "我们知道"
    },
    {
      "en": "I wonder if",
      "zh": "我想知道是否"
    },
    {
      "en": "She doesn't know if",
      "zh": "她不知道是否"
    }
  ],
  "listenPick": [
    {
      "audio": "I know that the cat is sleeping.",
      "opts": [
        "I know that the cat is sleeping.",
        "I know what the cat is sleeping.",
        "I know if the cat is sleeping."
      ],
      "ans": 0,
      "hint": "听清 that 引导的从句",
      "zh": "我知道猫在睡觉。",
      "sentence": "I know that the cat is sleeping."
    },
    {
      "audio": "Do you know where the bus goes?",
      "opts": [
        "Do you know where the bus goes?",
        "Do you know what the bus goes?",
        "Do you know if the bus goes?"
      ],
      "ans": 0,
      "hint": "注意 where 引导地点",
      "zh": "你知道公交车去哪里吗？",
      "sentence": "Do you know where the bus goes?"
    },
    {
      "audio": "She thinks that the moon is bright.",
      "opts": [
        "She thinks that the moon is bright.",
        "She thinks if the moon is bright.",
        "She thinks what the moon is bright."
      ],
      "ans": 0,
      "hint": "听清 that 和 moon",
      "zh": "她觉得月亮很亮。",
      "sentence": "She thinks that the moon is bright."
    },
    {
      "audio": "I don't know if he likes hotpot.",
      "opts": [
        "I don't know if he likes hotpot.",
        "I don't know that he likes hotpot.",
        "I don't know what he likes hotpot."
      ],
      "ans": 0,
      "hint": "注意 if 表示是否",
      "zh": "我不知道他是否喜欢火锅。",
      "sentence": "I don't know if he likes hotpot."
    },
    {
      "audio": "We know that the panda is cute.",
      "opts": [
        "We know that the panda is cute.",
        "We know if the panda is cute.",
        "We know what the panda is cute."
      ],
      "ans": 0,
      "hint": "听清 that 和 panda",
      "zh": "我们知道熊猫很可爱。",
      "sentence": "We know that the panda is cute."
    },
    {
      "audio": "Can you tell me where the classroom is?",
      "opts": [
        "Can you tell me where the classroom is?",
        "Can you tell me that the classroom is?",
        "Can you tell me if the classroom is?"
      ],
      "ans": 0,
      "hint": "注意 where 引导地点",
      "zh": "你能告诉我教室在哪里吗？",
      "sentence": "Can you tell me where the classroom is?"
    },
    {
      "audio": "He says that dinner is ready.",
      "opts": [
        "He says that dinner is ready.",
        "He says if dinner is ready.",
        "He says what dinner is ready."
      ],
      "ans": 0,
      "hint": "听清 that 和 dinner",
      "zh": "他说晚饭准备好了。",
      "sentence": "He says that dinner is ready."
    },
    {
      "audio": "I think that the window is open.",
      "opts": [
        "I think that the window is open.",
        "I think if the window is open.",
        "I think what the window is open."
      ],
      "ans": 0,
      "hint": "注意 that 引导陈述",
      "zh": "我认为窗户开着。",
      "sentence": "I think that the window is open."
    }
  ],
  "builds": [
    {
      "sentence": "I know that the panda eats bamboo.",
      "zh": "我知道熊猫吃竹子。",
      "tokens": [
        "I",
        "know",
        "that",
        "the",
        "panda",
        "eats",
        "bamboo"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "Do you know where the library is?",
      "zh": "你知道图书馆在哪里吗？",
      "tokens": [
        "Do",
        "you",
        "know",
        "where",
        "the",
        "library",
        "is"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "She thinks that the apple is sweet.",
      "zh": "她觉得苹果很甜。",
      "tokens": [
        "She",
        "thinks",
        "that",
        "the",
        "apple",
        "is",
        "sweet"
      ],
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "sentence": "He says that the bus is coming.",
      "zh": "他说公交车来了。",
      "tokens": [
        "He",
        "says",
        "that",
        "the",
        "bus",
        "is",
        "coming"
      ],
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "sentence": "I don't know if the doctor is here.",
      "zh": "我不知道医生是否在这里。",
      "tokens": [
        "I",
        "don't",
        "know",
        "if",
        "the",
        "doctor",
        "is",
        "here"
      ],
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "sentence": "We think that the playground is big.",
      "zh": "我们认为操场很大。",
      "tokens": [
        "We",
        "think",
        "that",
        "the",
        "playground",
        "is",
        "big"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);