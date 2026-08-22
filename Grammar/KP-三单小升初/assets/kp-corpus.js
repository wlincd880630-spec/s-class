(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "She plays football every Saturday.",
      "zh": "她每周六踢足球。",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "He goes to school by bus.",
      "zh": "他坐公交车去上学。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "It eats bamboo every day.",
      "zh": "它每天吃竹子。",
      "tag": "daily_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "Tom likes apples.",
      "zh": "汤姆喜欢苹果。",
      "tag": "daily_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "en": "My father cooks dinner in the evening.",
      "zh": "我爸爸晚上做晚饭。",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The cat sleeps on the sofa.",
      "zh": "猫在沙发上睡觉。",
      "tag": "daily_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "She reads books in the library.",
      "zh": "她在图书馆看书。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "He plays basketball after class.",
      "zh": "他课后打篮球。",
      "tag": "daily_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "Linda doesn't have any volleyballs.",
      "zh": "琳达没有任何排球。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "He doesn't like the rain.",
      "zh": "他不喜欢下雨。",
      "tag": "exam_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "She doesn't watch TV on weekdays.",
      "zh": "她工作日不看电视。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "The doctor doesn't work on Sunday.",
      "zh": "医生星期天不上班。",
      "tag": "exam_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "It doesn't have a tail.",
      "zh": "它没有尾巴。",
      "tag": "exam_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "He doesn't eat hot pot.",
      "zh": "他不吃火锅。",
      "tag": "exam_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "She doesn't play the piano.",
      "zh": "她不弹钢琴。",
      "tag": "exam_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "The bus doesn't stop here.",
      "zh": "公交车不停在这里。",
      "tag": "exam_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "He watches cartoons every morning.",
      "zh": "他每天早上看动画片。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "She studies English in the evening.",
      "zh": "她晚上学英语。",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "It flies high in the sky.",
      "zh": "它在天上飞得很高。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "He carries a big bag to school.",
      "zh": "他背着大书包去学校。",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "She washes her hands before dinner.",
      "zh": "她晚饭前洗手。",
      "tag": "writing_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "The panda climbs the tree slowly.",
      "zh": "熊猫慢慢地爬树。",
      "tag": "writing_use",
      "scene": "panda",
      "image": "kp3d-panda.png"
    },
    {
      "en": "He plays the piano very well.",
      "zh": "他钢琴弹得很好。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "She goes to the shop on foot.",
      "zh": "她走路去商店。",
      "tag": "writing_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    }
  ],
  "questions": [
    {
      "q": "He _____ to school by bus.",
      "opts": [
        "go",
        "goes",
        "going"
      ],
      "ans": 1,
      "hint": "He → goes。",
      "sentence": "He goes to school by bus.",
      "zh": "他乘公交上学。"
    },
    {
      "q": "The train _____ at nine.",
      "opts": [
        "leave",
        "leaves",
        "leaving"
      ],
      "ans": 1,
      "hint": "The train = it → leaves。",
      "sentence": "The train leaves at nine.",
      "zh": "火车九点出发。"
    },
    {
      "q": "_____ Emma play badminton?",
      "opts": [
        "Do",
        "Does",
        "Is"
      ],
      "ans": 1,
      "hint": "Emma 三单 → Does。",
      "sentence": "Does Emma play badminton?",
      "zh": "艾玛打羽毛球吗？"
    },
    {
      "q": "My brother _____ TV in the evening. （否定）",
      "opts": [
        "don't watch",
        "doesn't watch",
        "doesn't watches"
      ],
      "ans": 1,
      "hint": "doesn't + 原形 watch。",
      "sentence": "My brother doesn't watch TV in the evening.",
      "zh": "我哥哥晚上不看电视。"
    },
    {
      "q": "Mr Wang _____ science.",
      "opts": [
        "teach",
        "teaches",
        "teaching"
      ],
      "ans": 1,
      "hint": "ch 结尾加 es。",
      "sentence": "Mr Wang teaches science.",
      "zh": "王老师教科学。"
    },
    {
      "q": "Tom _____ apples.",
      "opts": [
        "like",
        "likes",
        "liking"
      ],
      "ans": 1,
      "hint": "Tom 是第三人称单数，动词要加 s",
      "sentence": "Tom likes apples.",
      "zh": "汤姆喜欢苹果。"
    },
    {
      "q": "She _____ football every Saturday.",
      "opts": [
        "play",
        "plays",
        "playing"
      ],
      "ans": 1,
      "hint": "She 是三单，play 加 s",
      "sentence": "She plays football every Saturday.",
      "zh": "她每周六踢足球。"
    },
    {
      "q": "The cat _____ on the sofa.",
      "opts": [
        "sleep",
        "sleeps",
        "sleeping"
      ],
      "ans": 1,
      "hint": "The cat 是三单",
      "sentence": "The cat sleeps on the sofa.",
      "zh": "猫在沙发上睡觉。"
    },
    {
      "q": "My father _____ dinner in the evening.",
      "opts": [
        "cook",
        "cooks",
        "cooking"
      ],
      "ans": 1,
      "hint": "father 是三单",
      "sentence": "My father cooks dinner in the evening.",
      "zh": "我爸爸晚上做晚饭。"
    },
    {
      "q": "Linda _____ any volleyballs.",
      "opts": [
        "don't have",
        "doesn't have",
        "doesn't has"
      ],
      "ans": 1,
      "hint": "否定用 doesn't + 原形",
      "sentence": "Linda doesn't have any volleyballs.",
      "zh": "琳达没有任何排球。"
    },
    {
      "q": "He _____ like the rain.",
      "opts": [
        "don't",
        "doesn't",
        "isn't"
      ],
      "ans": 1,
      "hint": "三单否定用 doesn't",
      "sentence": "He doesn't like the rain.",
      "zh": "他不喜欢下雨。"
    },
    {
      "q": "She _____ TV on weekdays.",
      "opts": [
        "doesn't watch",
        "don't watch",
        "doesn't watches"
      ],
      "ans": 0,
      "hint": "doesn't 后接原形",
      "sentence": "She doesn't watch TV on weekdays.",
      "zh": "她工作日不看电视。"
    },
    {
      "q": "The doctor _____ on Sunday.",
      "opts": [
        "doesn't work",
        "don't work",
        "doesn't works"
      ],
      "ans": 0,
      "hint": "doesn't + 原形",
      "sentence": "The doctor doesn't work on Sunday.",
      "zh": "医生星期天不上班。"
    },
    {
      "q": "It _____ a tail.",
      "opts": [
        "doesn't have",
        "don't have",
        "doesn't has"
      ],
      "ans": 0,
      "hint": "doesn't + 原形 have",
      "sentence": "It doesn't have a tail.",
      "zh": "它没有尾巴。"
    },
    {
      "q": "He _____ hot pot.",
      "opts": [
        "doesn't eat",
        "don't eat",
        "doesn't eats"
      ],
      "ans": 0,
      "hint": "doesn't + 原形",
      "sentence": "He doesn't eat hot pot.",
      "zh": "他不吃火锅。"
    },
    {
      "q": "She _____ the piano.",
      "opts": [
        "doesn't play",
        "don't play",
        "doesn't plays"
      ],
      "ans": 0,
      "hint": "doesn't + 原形",
      "sentence": "She doesn't play the piano.",
      "zh": "她不弹钢琴。"
    },
    {
      "q": "The bus _____ here.",
      "opts": [
        "doesn't stop",
        "don't stop",
        "doesn't stops"
      ],
      "ans": 0,
      "hint": "bus 是三单",
      "sentence": "The bus doesn't stop here.",
      "zh": "公交车不停在这里。"
    },
    {
      "q": "He _____ cartoons every morning.",
      "opts": [
        "watch",
        "watches",
        "watching"
      ],
      "ans": 1,
      "hint": "watch 加 es",
      "sentence": "He watches cartoons every morning.",
      "zh": "他每天早上看动画片。"
    },
    {
      "q": "She _____ English in the evening.",
      "opts": [
        "study",
        "studies",
        "studys"
      ],
      "ans": 1,
      "hint": "辅音+y 变 ies",
      "sentence": "She studies English in the evening.",
      "zh": "她晚上学英语。"
    },
    {
      "q": "It _____ high in the sky.",
      "opts": [
        "fly",
        "flies",
        "flys"
      ],
      "ans": 1,
      "hint": "辅音+y 变 ies",
      "sentence": "It flies high in the sky.",
      "zh": "它在天上飞得很高。"
    },
    {
      "q": "He _____ a big bag to school.",
      "opts": [
        "carry",
        "carries",
        "carrys"
      ],
      "ans": 1,
      "hint": "辅音+y 变 ies",
      "sentence": "He carries a big bag to school.",
      "zh": "他背着大书包去学校。"
    },
    {
      "q": "She _____ her hands before dinner.",
      "opts": [
        "wash",
        "washes",
        "washs"
      ],
      "ans": 1,
      "hint": "sh 结尾加 es",
      "sentence": "She washes her hands before dinner.",
      "zh": "她晚饭前洗手。"
    },
    {
      "q": "The panda _____ the tree slowly.",
      "opts": [
        "climb",
        "climbs",
        "climbing"
      ],
      "ans": 1,
      "hint": "panda 是三单",
      "sentence": "The panda climbs the tree slowly.",
      "zh": "熊猫慢慢地爬树。"
    },
    {
      "q": "He _____ the piano very well.",
      "opts": [
        "play",
        "plays",
        "playing"
      ],
      "ans": 1,
      "hint": "He 是三单",
      "sentence": "He plays the piano very well.",
      "zh": "他钢琴弹得很好。"
    },
    {
      "q": "She _____ to the shop on foot.",
      "opts": [
        "go",
        "goes",
        "going"
      ],
      "ans": 1,
      "hint": "go 加 es",
      "sentence": "She goes to the shop on foot.",
      "zh": "她走路去商店。"
    },
    {
      "q": "_____ she like apples?",
      "opts": [
        "Do",
        "Does",
        "Is"
      ],
      "ans": 1,
      "hint": "三单疑问用 Does",
      "sentence": "Does she like apples?",
      "zh": "她喜欢苹果吗？"
    },
    {
      "q": "_____ he play basketball?",
      "opts": [
        "Do",
        "Does",
        "Is"
      ],
      "ans": 1,
      "hint": "三单疑问用 Does",
      "sentence": "Does he play basketball?",
      "zh": "他打篮球吗？"
    },
    {
      "q": "The moon _____ at night.",
      "opts": [
        "shine",
        "shines",
        "shining"
      ],
      "ans": 1,
      "hint": "moon 是三单",
      "sentence": "The moon shines at night.",
      "zh": "月亮在晚上发光。"
    },
    {
      "q": "She _____ books in the library.",
      "opts": [
        "read",
        "reads",
        "reading"
      ],
      "ans": 1,
      "hint": "read 加 s",
      "sentence": "She reads books in the library.",
      "zh": "她在图书馆看书。"
    },
    {
      "q": "He _____ basketball after class.",
      "opts": [
        "play",
        "plays",
        "playing"
      ],
      "ans": 1,
      "hint": "He 是三单",
      "sentence": "He plays basketball after class.",
      "zh": "他课后打篮球。"
    },
    {
      "q": "It _____ bamboo every day.",
      "opts": [
        "eat",
        "eats",
        "eating"
      ],
      "ans": 1,
      "hint": "It 是三单",
      "sentence": "It eats bamboo every day.",
      "zh": "它每天吃竹子。"
    },
    {
      "q": "My sister _____ to music in the morning.",
      "opts": [
        "listen",
        "listens",
        "listening"
      ],
      "ans": 1,
      "hint": "sister 是三单",
      "sentence": "My sister listens to music in the morning.",
      "zh": "我妹妹早上听音乐。"
    }
  ],
  "matchPairs": [
    {
      "en": "plays",
      "zh": "（他/她）玩/打"
    },
    {
      "en": "doesn't",
      "zh": "不（三单）"
    },
    {
      "en": "Does he…?",
      "zh": "他……吗？"
    },
    {
      "en": "watches",
      "zh": "看（三单）"
    },
    {
      "en": "He likes",
      "zh": "他喜欢"
    },
    {
      "en": "She goes",
      "zh": "她去"
    },
    {
      "en": "It eats",
      "zh": "它吃"
    },
    {
      "en": "Tom plays",
      "zh": "汤姆玩"
    },
    {
      "en": "The cat sleeps",
      "zh": "猫睡觉"
    },
    {
      "en": "doesn't have",
      "zh": "没有"
    },
    {
      "en": "doesn't like",
      "zh": "不喜欢"
    },
    {
      "en": "doesn't watch",
      "zh": "不看"
    },
    {
      "en": "studies English",
      "zh": "学英语"
    },
    {
      "en": "washes hands",
      "zh": "洗手"
    }
  ],
  "listenPick": [
    {
      "audio": "She plays football every Saturday.",
      "opts": [
        "She plays football every Saturday.",
        "She play football every Saturday.",
        "She playing football every Saturday."
      ],
      "ans": 0,
      "hint": "注意 play 加 s",
      "zh": "她每周六踢足球。",
      "sentence": "She plays football every Saturday."
    },
    {
      "audio": "He goes to school by bus.",
      "opts": [
        "He goes to school by bus.",
        "He go to school by bus.",
        "He going to school by bus."
      ],
      "ans": 0,
      "hint": "go 加 es",
      "zh": "他坐公交车去上学。",
      "sentence": "He goes to school by bus."
    },
    {
      "audio": "Tom likes apples.",
      "opts": [
        "Tom likes apples.",
        "Tom like apples.",
        "Tom liking apples."
      ],
      "ans": 0,
      "hint": "Tom 是三单",
      "zh": "汤姆喜欢苹果。",
      "sentence": "Tom likes apples."
    },
    {
      "audio": "Linda doesn't have any volleyballs.",
      "opts": [
        "Linda doesn't have any volleyballs.",
        "Linda doesn't has any volleyballs.",
        "Linda don't have any volleyballs."
      ],
      "ans": 0,
      "hint": "doesn't 后接原形",
      "zh": "琳达没有任何排球。",
      "sentence": "Linda doesn't have any volleyballs."
    },
    {
      "audio": "The cat sleeps on the sofa.",
      "opts": [
        "The cat sleeps on the sofa.",
        "The cat sleep on the sofa.",
        "The cat sleeping on the sofa."
      ],
      "ans": 0,
      "hint": "cat 是三单",
      "zh": "猫在沙发上睡觉。",
      "sentence": "The cat sleeps on the sofa."
    },
    {
      "audio": "She reads books in the library.",
      "opts": [
        "She reads books in the library.",
        "She read books in the library.",
        "She reading books in the library."
      ],
      "ans": 0,
      "hint": "read 加 s",
      "zh": "她在图书馆看书。",
      "sentence": "She reads books in the library."
    },
    {
      "audio": "He doesn't like the rain.",
      "opts": [
        "He doesn't like the rain.",
        "He doesn't likes the rain.",
        "He don't like the rain."
      ],
      "ans": 0,
      "hint": "doesn't 后接原形",
      "zh": "他不喜欢下雨。",
      "sentence": "He doesn't like the rain."
    },
    {
      "audio": "She studies English in the evening.",
      "opts": [
        "She studies English in the evening.",
        "She study English in the evening.",
        "She studys English in the evening."
      ],
      "ans": 0,
      "hint": "辅音+y 变 ies",
      "zh": "她晚上学英语。",
      "sentence": "She studies English in the evening."
    }
  ],
  "builds": [
    {
      "sentence": "She plays football every Saturday.",
      "zh": "她每周六踢足球。",
      "tokens": [
        "She",
        "plays",
        "football",
        "every",
        "Saturday"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "sentence": "He goes to school by bus.",
      "zh": "他坐公交车去上学。",
      "tokens": [
        "He",
        "goes",
        "to",
        "school",
        "by",
        "bus"
      ],
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "sentence": "Tom likes apples.",
      "zh": "汤姆喜欢苹果。",
      "tokens": [
        "Tom",
        "likes",
        "apples"
      ],
      "scene": "apple",
      "image": "kp3d-apple.png"
    },
    {
      "sentence": "Linda doesn't have any volleyballs.",
      "zh": "琳达没有任何排球。",
      "tokens": [
        "Linda",
        "doesn't",
        "have",
        "any",
        "volleyballs"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "sentence": "She reads books in the library.",
      "zh": "她在图书馆看书。",
      "tokens": [
        "She",
        "reads",
        "books",
        "in",
        "the",
        "library"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "He plays the piano very well.",
      "zh": "他钢琴弹得很好。",
      "tokens": [
        "He",
        "plays",
        "the",
        "piano",
        "very",
        "well"
      ],
      "scene": "piano",
      "image": "kp3d-piano.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);