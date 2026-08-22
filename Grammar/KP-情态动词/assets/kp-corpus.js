(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "I can swim in the pool.",
      "zh": "我会在游泳池里游泳。",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "Can I use your pen?",
      "zh": "我能用你的钢笔吗？",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "She can play the piano very well.",
      "zh": "她钢琴弹得很好。",
      "tag": "daily_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "We must wear school uniforms on Monday.",
      "zh": "星期一我们必须穿校服。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "You should eat more vegetables.",
      "zh": "你应该多吃蔬菜。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "He can ride a bike to school.",
      "zh": "他会骑自行车上学。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "Should I take an umbrella?",
      "zh": "我应该带伞吗？",
      "tag": "daily_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "We must not run in the hallway.",
      "zh": "我们不许在走廊里跑。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Can you help me with my homework?",
      "zh": "你能帮我做作业吗？",
      "tag": "exam_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "You should brush your teeth twice a day.",
      "zh": "你应该每天刷两次牙。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "She must finish her homework before dinner.",
      "zh": "她必须在晚饭前完成作业。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "They can play basketball after school.",
      "zh": "他们放学后可以打篮球。",
      "tag": "exam_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "We must listen to the teacher in class.",
      "zh": "上课时我们必须听老师讲。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Can I go to the restroom?",
      "zh": "我可以去洗手间吗？",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "You should drink more water.",
      "zh": "你应该多喝水。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "He can speak English and Chinese.",
      "zh": "他会说英语和中文。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "We must save water.",
      "zh": "我们必须节约用水。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "You should read books every day.",
      "zh": "你应该每天读书。",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Pandas can climb trees.",
      "zh": "熊猫会爬树。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "We must protect the environment.",
      "zh": "我们必须保护环境。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "You should not eat too much candy.",
      "zh": "你不应该吃太多糖。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "Can you see the panda in the zoo?",
      "zh": "你能看到动物园里的熊猫吗？",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "Students must not be late for school.",
      "zh": "学生上学不能迟到。",
      "tag": "writing_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "We should help our parents at home.",
      "zh": "我们应该在家帮助父母。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    }
  ],
  "questions": [
    {
      "q": "You _____ take an umbrella. It's raining.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should + 原形。",
      "sentence": "You should take an umbrella.",
      "zh": "你应该带伞。"
    },
    {
      "q": "_____ I use your pen?",
      "opts": [
        "Must",
        "Can",
        "Should to"
      ],
      "ans": 1,
      "hint": "请求许可用 Can I…?",
      "sentence": "Can I use your pen?",
      "zh": "我可以用你的笔吗？"
    },
    {
      "q": "Students _____ wear school uniforms.",
      "opts": [
        "must",
        "must to",
        "musts"
      ],
      "ans": 0,
      "hint": "校规必须 must。",
      "sentence": "Students must wear school uniforms.",
      "zh": "学生必须穿校服。"
    },
    {
      "q": "He _____ speak English, but he can speak Chinese.",
      "opts": [
        "can",
        "can't",
        "must"
      ],
      "ans": 1,
      "hint": "转折：不会英语。",
      "sentence": "He can't speak English, but he can speak Chinese.",
      "zh": "他不会说英语，但会说中文。"
    },
    {
      "q": "You _____ eat in the lab. It's dangerous.",
      "opts": [
        "should",
        "mustn't",
        "can"
      ],
      "ans": 1,
      "hint": "禁止用 mustn't。",
      "sentence": "You mustn't eat in the lab.",
      "zh": "实验室里不准吃东西。"
    },
    {
      "q": "She _____ play the piano.",
      "opts": [
        "can",
        "cans",
        "can to"
      ],
      "ans": 0,
      "hint": "情态动词后接动词原形",
      "sentence": "She can play the piano.",
      "zh": "她会弹钢琴。"
    },
    {
      "q": "You _____ wear a coat. It is cold.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should后接动词原形",
      "sentence": "You should wear a coat. It is cold.",
      "zh": "你应该穿外套，天冷。"
    },
    {
      "q": "We _____ be quiet in the library.",
      "opts": [
        "must",
        "must to",
        "musts"
      ],
      "ans": 0,
      "hint": "must后接动词原形",
      "sentence": "We must be quiet in the library.",
      "zh": "我们在图书馆必须安静。"
    },
    {
      "q": "_____ I use your ruler?",
      "opts": [
        "Can",
        "Shoulds",
        "Musts"
      ],
      "ans": 0,
      "hint": "用can表示请求许可",
      "sentence": "Can I use your ruler?",
      "zh": "我能用你的尺子吗？"
    },
    {
      "q": "He _____ run fast.",
      "opts": [
        "can",
        "cans",
        "can to"
      ],
      "ans": 0,
      "hint": "can后接动词原形",
      "sentence": "He can run fast.",
      "zh": "他能跑得快。"
    },
    {
      "q": "You _____ eat more vegetables.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should后接动词原形",
      "sentence": "You should eat more vegetables.",
      "zh": "你应该多吃蔬菜。"
    },
    {
      "q": "We _____ not play in the street.",
      "opts": [
        "must",
        "musts",
        "must to"
      ],
      "ans": 0,
      "hint": "must not表示禁止",
      "sentence": "We must not play in the street.",
      "zh": "我们不许在街上玩。"
    },
    {
      "q": "_____ you help me?",
      "opts": [
        "Can",
        "Shoulds",
        "Musts"
      ],
      "ans": 0,
      "hint": "can表示能力或请求",
      "sentence": "Can you help me?",
      "zh": "你能帮我吗？"
    },
    {
      "q": "She _____ finish her homework first.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should后接动词原形",
      "sentence": "She should finish her homework first.",
      "zh": "她应该先完成作业。"
    },
    {
      "q": "They _____ play basketball after school.",
      "opts": [
        "can",
        "cans",
        "can to"
      ],
      "ans": 0,
      "hint": "can表示允许",
      "sentence": "They can play basketball after school.",
      "zh": "他们放学后可以打篮球。"
    },
    {
      "q": "You _____ not be late for class.",
      "opts": [
        "must",
        "musts",
        "must to"
      ],
      "ans": 0,
      "hint": "must not表示禁止",
      "sentence": "You must not be late for class.",
      "zh": "你上课不能迟到。"
    },
    {
      "q": "_____ we go to the park?",
      "opts": [
        "Can",
        "Shoulds",
        "Musts"
      ],
      "ans": 0,
      "hint": "用can提出建议",
      "sentence": "Can we go to the park?",
      "zh": "我们能去公园吗？"
    },
    {
      "q": "He _____ speak English well.",
      "opts": [
        "can",
        "cans",
        "can to"
      ],
      "ans": 0,
      "hint": "can后接动词原形",
      "sentence": "He can speak English well.",
      "zh": "他英语说得好。"
    },
    {
      "q": "You _____ drink more water.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should后接动词原形",
      "sentence": "You should drink more water.",
      "zh": "你应该多喝水。"
    },
    {
      "q": "We _____ wear helmets when riding bikes.",
      "opts": [
        "must",
        "musts",
        "must to"
      ],
      "ans": 0,
      "hint": "must表示必须",
      "sentence": "We must wear helmets when riding bikes.",
      "zh": "我们骑自行车时必须戴头盔。"
    },
    {
      "q": "_____ you swim?",
      "opts": [
        "Can",
        "Shoulds",
        "Musts"
      ],
      "ans": 0,
      "hint": "can表示能力",
      "sentence": "Can you swim?",
      "zh": "你会游泳吗？"
    },
    {
      "q": "She _____ practice the piano every day.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should后接动词原形",
      "sentence": "She should practice the piano every day.",
      "zh": "她应该每天练习钢琴。"
    },
    {
      "q": "Students _____ listen to the teacher.",
      "opts": [
        "must",
        "musts",
        "must to"
      ],
      "ans": 0,
      "hint": "must表示必须",
      "sentence": "Students must listen to the teacher.",
      "zh": "学生必须听老师的话。"
    },
    {
      "q": "I _____ see the panda at the zoo.",
      "opts": [
        "can",
        "cans",
        "can to"
      ],
      "ans": 0,
      "hint": "can表示能力",
      "sentence": "I can see the panda at the zoo.",
      "zh": "我在动物园能看到熊猫。"
    },
    {
      "q": "You _____ take an umbrella. It might rain.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should表示建议",
      "sentence": "You should take an umbrella. It might rain.",
      "zh": "你应该带伞，可能要下雨。"
    },
    {
      "q": "We _____ not waste food.",
      "opts": [
        "must",
        "musts",
        "must to"
      ],
      "ans": 0,
      "hint": "must not表示禁止",
      "sentence": "We must not waste food.",
      "zh": "我们不许浪费食物。"
    },
    {
      "q": "_____ I open the window?",
      "opts": [
        "Can",
        "Shoulds",
        "Musts"
      ],
      "ans": 0,
      "hint": "用can请求许可",
      "sentence": "Can I open the window?",
      "zh": "我能打开窗户吗？"
    },
    {
      "q": "He _____ do his homework before TV.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should后接动词原形",
      "sentence": "He should do his homework before TV.",
      "zh": "他应该在看电视前做作业。"
    },
    {
      "q": "You _____ cross the road when the light is red.",
      "opts": [
        "must not",
        "musts not",
        "must to not"
      ],
      "ans": 0,
      "hint": "must not表示禁止",
      "sentence": "You must not cross the road when the light is red.",
      "zh": "红灯时你不能过马路。"
    },
    {
      "q": "_____ you play the guitar?",
      "opts": [
        "Can",
        "Shoulds",
        "Musts"
      ],
      "ans": 0,
      "hint": "can表示能力",
      "sentence": "Can you play the guitar?",
      "zh": "你会弹吉他吗？"
    },
    {
      "q": "We _____ clean our classroom every day.",
      "opts": [
        "should",
        "shoulds",
        "should to"
      ],
      "ans": 0,
      "hint": "should表示建议",
      "sentence": "We should clean our classroom every day.",
      "zh": "我们应该每天打扫教室。"
    },
    {
      "q": "The students _____ be quiet in the library.",
      "opts": [
        "must",
        "musts",
        "must to"
      ],
      "ans": 0,
      "hint": "must表示必须",
      "sentence": "The students must be quiet in the library.",
      "zh": "学生们在图书馆必须安静。"
    },
    {
      "q": "Pandas _____ climb trees.",
      "opts": [
        "can",
        "cans",
        "can to"
      ],
      "ans": 0,
      "hint": "can表示能力",
      "sentence": "Pandas can climb trees.",
      "zh": "熊猫会爬树。"
    }
  ],
  "matchPairs": [
    {
      "en": "can swim",
      "zh": "会游泳"
    },
    {
      "en": "should wear",
      "zh": "应该穿"
    },
    {
      "en": "must be quiet",
      "zh": "必须安静"
    },
    {
      "en": "Can you…?",
      "zh": "你能……吗？"
    },
    {
      "en": "can play basketball",
      "zh": "会打篮球"
    },
    {
      "en": "should wear a coat",
      "zh": "应该穿外套"
    },
    {
      "en": "should drink water",
      "zh": "应该喝水"
    },
    {
      "en": "must not run",
      "zh": "不许跑"
    },
    {
      "en": "can help",
      "zh": "能帮忙"
    },
    {
      "en": "should read",
      "zh": "应该阅读"
    },
    {
      "en": "must listen",
      "zh": "必须听"
    },
    {
      "en": "can climb",
      "zh": "会爬"
    }
  ],
  "listenPick": [
    {
      "audio": "You should wear a coat.",
      "opts": [
        "You should wear a coat.",
        "You must wear a coat.",
        "You can wear a coat."
      ],
      "ans": 0,
      "hint": "注意should",
      "zh": "你应该穿外套。",
      "sentence": "You should wear a coat."
    },
    {
      "audio": "We must be quiet in the library.",
      "opts": [
        "We must be quiet in the library.",
        "We can be quiet in the library.",
        "We should be quiet in the library."
      ],
      "ans": 0,
      "hint": "注意must",
      "zh": "我们在图书馆必须安静。",
      "sentence": "We must be quiet in the library."
    },
    {
      "audio": "Can you play the piano?",
      "opts": [
        "Can you play the piano?",
        "Should you play the piano?",
        "Must you play the piano?"
      ],
      "ans": 0,
      "hint": "注意can",
      "zh": "你会弹钢琴吗？",
      "sentence": "Can you play the piano?"
    },
    {
      "audio": "You should drink more water.",
      "opts": [
        "You should drink more water.",
        "You must drink more water.",
        "You can drink more water."
      ],
      "ans": 0,
      "hint": "注意should",
      "zh": "你应该多喝水。",
      "sentence": "You should drink more water."
    },
    {
      "audio": "We must not run in the hallway.",
      "opts": [
        "We must not run in the hallway.",
        "We can not run in the hallway.",
        "We should not run in the hallway."
      ],
      "ans": 0,
      "hint": "注意must not",
      "zh": "我们不许在走廊里跑。",
      "sentence": "We must not run in the hallway."
    },
    {
      "audio": "He can swim very fast.",
      "opts": [
        "He can swim very fast.",
        "He should swim very fast.",
        "He must swim very fast."
      ],
      "ans": 0,
      "hint": "注意can",
      "zh": "他游泳很快。",
      "sentence": "He can swim very fast."
    },
    {
      "audio": "She should finish her homework first.",
      "opts": [
        "She should finish her homework first.",
        "She must finish her homework first.",
        "She can finish her homework first."
      ],
      "ans": 0,
      "hint": "注意should",
      "zh": "她应该先完成作业。",
      "sentence": "She should finish her homework first."
    },
    {
      "audio": "You must wear a helmet.",
      "opts": [
        "You must wear a helmet.",
        "You should wear a helmet.",
        "You can wear a helmet."
      ],
      "ans": 0,
      "hint": "注意must",
      "zh": "你必须戴头盔。",
      "sentence": "You must wear a helmet."
    }
  ],
  "builds": [
    {
      "sentence": "You should take an umbrella.",
      "zh": "你应该带伞。",
      "tokens": [
        "You",
        "should",
        "take",
        "an",
        "umbrella"
      ],
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "sentence": "We must be quiet in the library.",
      "zh": "我们在图书馆必须安静。",
      "tokens": [
        "We",
        "must",
        "be",
        "quiet",
        "in",
        "the",
        "library"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "He can play basketball well.",
      "zh": "他篮球打得好。",
      "tokens": [
        "He",
        "can",
        "play",
        "basketball",
        "well"
      ],
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "sentence": "She should eat more vegetables.",
      "zh": "她应该多吃蔬菜。",
      "tokens": [
        "She",
        "should",
        "eat",
        "more",
        "vegetables"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "sentence": "Pandas can climb trees.",
      "zh": "熊猫会爬树。",
      "tokens": [
        "Pandas",
        "can",
        "climb",
        "trees"
      ],
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "sentence": "You must not be late for school.",
      "zh": "你上学不能迟到。",
      "tokens": [
        "You",
        "must",
        "not",
        "be",
        "late",
        "for",
        "school"
      ],
      "scene": "bus",
      "image": "kp3d-bus.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);