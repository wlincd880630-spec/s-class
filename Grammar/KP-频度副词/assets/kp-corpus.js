(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "Tom always gets up early on school days.",
      "zh": "汤姆在上学日总是早起。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "My sister usually does her homework before dinner.",
      "zh": "我妹妹通常在晚饭前做作业。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "I often play basketball with my friends after school.",
      "zh": "放学后我经常和朋友们打篮球。",
      "tag": "daily_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "We always go to the library on Friday afternoons.",
      "zh": "我们周五下午总是去图书馆。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "The bus is usually late in the morning.",
      "zh": "早上的公交车通常晚点。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "She often reads books about pandas.",
      "zh": "她经常读关于熊猫的书。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "My father always drinks tea after dinner.",
      "zh": "我爸爸晚饭后总是喝茶。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "They usually walk to school, but sometimes they take the bus.",
      "zh": "他们通常步行上学，但有时坐公交车。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "He always does his homework in the classroom.",
      "zh": "他总是在教室里做作业。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "She usually goes to bed at nine o'clock.",
      "zh": "她通常九点上床睡觉。",
      "tag": "exam_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "I often see a cat in the park.",
      "zh": "我经常在公园里看到一只猫。",
      "tag": "exam_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "We always have lunch at noon.",
      "zh": "我们总是在中午吃午饭。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The teacher usually gives us homework on Mondays.",
      "zh": "老师通常在星期一给我们布置作业。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "They often visit the panda base on weekends.",
      "zh": "他们周末经常去熊猫基地。",
      "tag": "exam_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "My mother always cooks hot pot on Sundays.",
      "zh": "我妈妈总是在星期天做火锅。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "He usually takes an umbrella when it rains.",
      "zh": "下雨时他通常带伞。",
      "tag": "exam_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "I always brush my teeth before bed.",
      "zh": "我睡觉前总是刷牙。",
      "tag": "writing_use",
      "scene": "moon",
      "image": "kp3d-moon.png"
    },
    {
      "en": "She usually practices the piano in the evening.",
      "zh": "她晚上通常练习钢琴。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "We often play on the playground during recess.",
      "zh": "课间我们经常在操场上玩。",
      "tag": "writing_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "My brother always helps me with my homework.",
      "zh": "我哥哥总是帮我做作业。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The doctor usually comes to check on patients in the morning.",
      "zh": "医生通常在早上来检查病人。",
      "tag": "writing_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "I often buy snacks at the shop after school.",
      "zh": "放学后我经常在商店买零食。",
      "tag": "writing_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "They always water the flowers in the garden.",
      "zh": "他们总是给花园里的花浇水。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "She often reads stories about pandas in her free time.",
      "zh": "她空闲时间经常读关于熊猫的故事。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    }
  ],
  "questions": [
    {
      "q": "I _____ walk to school. I take the bus.",
      "opts": [
        "always",
        "never",
        "usually"
      ],
      "ans": 1,
      "hint": "坐公交说明 never walk。",
      "sentence": "I never walk to school. I take the bus.",
      "zh": "我从不走路上学，我坐公交。"
    },
    {
      "q": "They _____ play football on Sundays. （通常）",
      "opts": [
        "never",
        "usually",
        "seldom"
      ],
      "ans": 1,
      "hint": "usually 通常。",
      "sentence": "They usually play football on Sundays.",
      "zh": "他们通常周日踢球。"
    },
    {
      "q": "_____ do you go swimming? — Once a week.",
      "opts": [
        "How long",
        "How often",
        "How far"
      ],
      "ans": 1,
      "hint": "问频率 How often。",
      "sentence": "How often do you go swimming?",
      "zh": "你多久游一次泳？"
    },
    {
      "q": "We _____ have rice for lunch, but not every day.",
      "opts": [
        "always",
        "sometimes",
        "never"
      ],
      "ans": 1,
      "hint": "不是每天 → sometimes。",
      "sentence": "We sometimes have rice for lunch.",
      "zh": "我们有时午饭吃米饭。"
    },
    {
      "q": "The students are _____ on time.",
      "opts": [
        "often",
        "oftenly",
        "oftens"
      ],
      "ans": 0,
      "hint": "often 无 -ly。",
      "sentence": "The students are often on time.",
      "zh": "学生们经常准时。"
    },
    {
      "q": "Tom _____ gets up early on school days.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示每天如此，用 always",
      "sentence": "Tom always gets up early on school days.",
      "zh": "汤姆在上学日总是早起。"
    },
    {
      "q": "My sister _____ does her homework before dinner.",
      "opts": [
        "always",
        "usually",
        "never"
      ],
      "ans": 1,
      "hint": "表示大多数时候，用 usually",
      "sentence": "My sister usually does her homework before dinner.",
      "zh": "我妹妹通常在晚饭前做作业。"
    },
    {
      "q": "I _____ play basketball with my friends after school.",
      "opts": [
        "often",
        "always",
        "never"
      ],
      "ans": 0,
      "hint": "表示经常，用 often",
      "sentence": "I often play basketball with my friends after school.",
      "zh": "放学后我经常和朋友们打篮球。"
    },
    {
      "q": "We _____ go to the library on Friday afternoons.",
      "opts": [
        "usually",
        "never",
        "often"
      ],
      "ans": 0,
      "hint": "表示通常，用 usually",
      "sentence": "We usually go to the library on Friday afternoons.",
      "zh": "我们通常在周五下午去图书馆。"
    },
    {
      "q": "The bus is _____ late in the morning.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 1,
      "hint": "表示经常，但 not always",
      "sentence": "The bus is usually late in the morning.",
      "zh": "早上的公交车通常晚点。"
    },
    {
      "q": "She _____ reads books about pandas.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 2,
      "hint": "表示经常，用 often",
      "sentence": "She often reads books about pandas.",
      "zh": "她经常读关于熊猫的书。"
    },
    {
      "q": "My father _____ drinks tea after dinner.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示每天，用 always",
      "sentence": "My father always drinks tea after dinner.",
      "zh": "我爸爸晚饭后总是喝茶。"
    },
    {
      "q": "They _____ walk to school, but sometimes they take the bus.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 1,
      "hint": "表示通常，用 usually",
      "sentence": "They usually walk to school, but sometimes they take the bus.",
      "zh": "他们通常步行上学，但有时坐公交车。"
    },
    {
      "q": "He _____ does his homework in the classroom.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示总是，用 always",
      "sentence": "He always does his homework in the classroom.",
      "zh": "他总是在教室里做作业。"
    },
    {
      "q": "She _____ goes to bed at nine o'clock.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 1,
      "hint": "表示通常，用 usually",
      "sentence": "She usually goes to bed at nine o'clock.",
      "zh": "她通常九点上床睡觉。"
    },
    {
      "q": "I _____ see a cat in the park.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 2,
      "hint": "表示经常，用 often",
      "sentence": "I often see a cat in the park.",
      "zh": "我经常在公园里看到一只猫。"
    },
    {
      "q": "We _____ have lunch at noon.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示每天，用 always",
      "sentence": "We always have lunch at noon.",
      "zh": "我们总是在中午吃午饭。"
    },
    {
      "q": "The teacher _____ gives us homework on Mondays.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 1,
      "hint": "表示通常，用 usually",
      "sentence": "The teacher usually gives us homework on Mondays.",
      "zh": "老师通常在星期一给我们布置作业。"
    },
    {
      "q": "They _____ visit the panda base on weekends.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 2,
      "hint": "表示经常，用 often",
      "sentence": "They often visit the panda base on weekends.",
      "zh": "他们周末经常去熊猫基地。"
    },
    {
      "q": "My mother _____ cooks hot pot on Sundays.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示总是，用 always",
      "sentence": "My mother always cooks hot pot on Sundays.",
      "zh": "我妈妈总是在星期天做火锅。"
    },
    {
      "q": "He _____ takes an umbrella when it rains.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 1,
      "hint": "表示通常，用 usually",
      "sentence": "He usually takes an umbrella when it rains.",
      "zh": "下雨时他通常带伞。"
    },
    {
      "q": "I _____ brush my teeth before bed.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示每天，用 always",
      "sentence": "I always brush my teeth before bed.",
      "zh": "我睡觉前总是刷牙。"
    },
    {
      "q": "She _____ practices the piano in the evening.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 1,
      "hint": "表示通常，用 usually",
      "sentence": "She usually practices the piano in the evening.",
      "zh": "她晚上通常练习钢琴。"
    },
    {
      "q": "We _____ play on the playground during recess.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 2,
      "hint": "表示经常，用 often",
      "sentence": "We often play on the playground during recess.",
      "zh": "课间我们经常在操场上玩。"
    },
    {
      "q": "My brother _____ helps me with my homework.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示总是，用 always",
      "sentence": "My brother always helps me with my homework.",
      "zh": "我哥哥总是帮我做作业。"
    },
    {
      "q": "The doctor _____ comes to check on patients in the morning.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 1,
      "hint": "表示通常，用 usually",
      "sentence": "The doctor usually comes to check on patients in the morning.",
      "zh": "医生通常在早上来检查病人。"
    },
    {
      "q": "I _____ buy snacks at the shop after school.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 2,
      "hint": "表示经常，用 often",
      "sentence": "I often buy snacks at the shop after school.",
      "zh": "放学后我经常在商店买零食。"
    },
    {
      "q": "They _____ water the flowers in the garden.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 0,
      "hint": "表示每天，用 always",
      "sentence": "They always water the flowers in the garden.",
      "zh": "他们总是给花园里的花浇水。"
    },
    {
      "q": "She _____ reads stories about pandas in her free time.",
      "opts": [
        "always",
        "usually",
        "often"
      ],
      "ans": 2,
      "hint": "表示经常，用 often",
      "sentence": "She often reads stories about pandas in her free time.",
      "zh": "她空闲时间经常读关于熊猫的故事。"
    }
  ],
  "matchPairs": [
    {
      "en": "always",
      "zh": "总是 100%"
    },
    {
      "en": "usually",
      "zh": "通常"
    },
    {
      "en": "sometimes",
      "zh": "有时"
    },
    {
      "en": "never",
      "zh": "从不"
    },
    {
      "en": "often",
      "zh": "经常"
    },
    {
      "en": "get up",
      "zh": "起床"
    },
    {
      "en": "do homework",
      "zh": "做作业"
    },
    {
      "en": "play basketball",
      "zh": "打篮球"
    },
    {
      "en": "go to the library",
      "zh": "去图书馆"
    },
    {
      "en": "take the bus",
      "zh": "坐公交车"
    }
  ],
  "listenPick": [
    {
      "audio": "Tom always gets up early on school days.",
      "opts": [
        "Tom always gets up early on school days.",
        "Tom usually gets up early on school days.",
        "Tom often gets up early on school days."
      ],
      "ans": 0,
      "hint": "听到 always",
      "zh": "汤姆在上学日总是早起。",
      "sentence": "Tom always gets up early on school days."
    },
    {
      "audio": "My sister usually does her homework before dinner.",
      "opts": [
        "My sister usually does her homework before dinner.",
        "My sister always does her homework before dinner.",
        "My sister often does her homework before dinner."
      ],
      "ans": 0,
      "hint": "听到 usually",
      "zh": "我妹妹通常在晚饭前做作业。",
      "sentence": "My sister usually does her homework before dinner."
    },
    {
      "audio": "I often play basketball with my friends.",
      "opts": [
        "I often play basketball with my friends.",
        "I always play basketball with my friends.",
        "I usually play basketball with my friends."
      ],
      "ans": 0,
      "hint": "听到 often",
      "zh": "我经常和朋友们打篮球。",
      "sentence": "I often play basketball with my friends."
    },
    {
      "audio": "We always go to the library on Fridays.",
      "opts": [
        "We always go to the library on Fridays.",
        "We usually go to the library on Fridays.",
        "We often go to the library on Fridays."
      ],
      "ans": 0,
      "hint": "听到 always",
      "zh": "我们周五总是去图书馆。",
      "sentence": "We always go to the library on Fridays."
    },
    {
      "audio": "The bus is usually late in the morning.",
      "opts": [
        "The bus is usually late in the morning.",
        "The bus is always late in the morning.",
        "The bus is often late in the morning."
      ],
      "ans": 0,
      "hint": "听到 usually",
      "zh": "早上的公交车通常晚点。",
      "sentence": "The bus is usually late in the morning."
    },
    {
      "audio": "She often reads books about pandas.",
      "opts": [
        "She often reads books about pandas.",
        "She always reads books about pandas.",
        "She usually reads books about pandas."
      ],
      "ans": 0,
      "hint": "听到 often",
      "zh": "她经常读关于熊猫的书。",
      "sentence": "She often reads books about pandas."
    },
    {
      "audio": "My father always drinks tea after dinner.",
      "opts": [
        "My father always drinks tea after dinner.",
        "My father usually drinks tea after dinner.",
        "My father often drinks tea after dinner."
      ],
      "ans": 0,
      "hint": "听到 always",
      "zh": "我爸爸晚饭后总是喝茶。",
      "sentence": "My father always drinks tea after dinner."
    },
    {
      "audio": "They usually walk to school.",
      "opts": [
        "They usually walk to school.",
        "They always walk to school.",
        "They often walk to school."
      ],
      "ans": 0,
      "hint": "听到 usually",
      "zh": "他们通常步行上学。",
      "sentence": "They usually walk to school."
    }
  ],
  "builds": [
    {
      "sentence": "I always read books in the library.",
      "zh": "我总是在图书馆看书。",
      "tokens": [
        "I",
        "always",
        "read",
        "books",
        "in",
        "the",
        "library"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "She usually plays the piano after dinner.",
      "zh": "她通常在晚饭后弹钢琴。",
      "tokens": [
        "She",
        "usually",
        "plays",
        "the",
        "piano",
        "after",
        "dinner"
      ],
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "sentence": "We often go to the playground on weekends.",
      "zh": "我们周末经常去操场。",
      "tokens": [
        "We",
        "often",
        "go",
        "to",
        "the",
        "playground",
        "on",
        "weekends"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "sentence": "He always takes an umbrella on rainy days.",
      "zh": "下雨天他总是带伞。",
      "tokens": [
        "He",
        "always",
        "takes",
        "an",
        "umbrella",
        "on",
        "rainy",
        "days"
      ],
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "sentence": "They usually buy fruit at the shop.",
      "zh": "他们通常在商店买水果。",
      "tokens": [
        "They",
        "usually",
        "buy",
        "fruit",
        "at",
        "the",
        "shop"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "sentence": "My mother often cooks hot pot for dinner.",
      "zh": "我妈妈经常做火锅当晚餐。",
      "tokens": [
        "My",
        "mother",
        "often",
        "cooks",
        "hot",
        "pot",
        "for",
        "dinner"
      ],
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);