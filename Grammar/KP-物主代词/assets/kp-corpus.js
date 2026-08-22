(function (global) {
  "use strict";
  global.KpCorpus = {
  "examples": [
    {
      "en": "This book is mine.",
      "zh": "这本书是我的。",
      "tag": "daily_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Yours is on the desk.",
      "zh": "你的在桌子上。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "This pen isn't mine. It's hers.",
      "zh": "这支钢笔不是我的。是她的。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "My bag is heavy, but yours is light.",
      "zh": "我的包很重，但你的很轻。",
      "tag": "daily_use",
      "scene": "bus",
      "image": "kp3d-bus.png"
    },
    {
      "en": "Our classroom is big. Theirs is small.",
      "zh": "我们的教室大。他们的小。",
      "tag": "daily_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "I like my bike. Do you like yours?",
      "zh": "我喜欢我的自行车。你喜欢你的吗？",
      "tag": "daily_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "Her cat is white. Mine is black.",
      "zh": "她的猫是白色的。我的是黑色的。",
      "tag": "daily_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "This is my lunch. Where is yours?",
      "zh": "这是我的午饭。你的在哪里？",
      "tag": "daily_use",
      "scene": "dinner",
      "image": "kp3d-dinner.png"
    },
    {
      "en": "My name is Tom. What's yours?",
      "zh": "我的名字是汤姆。你的呢？",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "This is your seat. Mine is next to it.",
      "zh": "这是你的座位。我的在它旁边。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Is this his pencil? No, it's hers.",
      "zh": "这是他的铅笔吗？不，是她的。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "Our teacher is kind. Theirs is strict.",
      "zh": "我们的老师很和蔼。他们的很严格。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "My shoes are new, but his are old.",
      "zh": "我的鞋子是新的，但他的旧了。",
      "tag": "exam_use",
      "scene": "shop",
      "image": "kp3d-shop.png"
    },
    {
      "en": "This is our school. That is theirs.",
      "zh": "这是我们的学校。那是他们的。",
      "tag": "exam_use",
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "en": "My mom is a doctor. His is a nurse.",
      "zh": "我妈妈是医生。他妈妈是护士。",
      "tag": "exam_use",
      "scene": "doctor",
      "image": "kp3d-doctor.png"
    },
    {
      "en": "Your answer is right. Hers is wrong.",
      "zh": "你的答案是对的。她的是错的。",
      "tag": "exam_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "My room is tidy. Yours is messy.",
      "zh": "我的房间整洁。你的乱糟糟。",
      "tag": "writing_use",
      "scene": "window",
      "image": "kp3d-window.png"
    },
    {
      "en": "I have my umbrella. She has hers.",
      "zh": "我带着我的伞。她带着她的。",
      "tag": "writing_use",
      "scene": "umbrella",
      "image": "kp3d-umbrella.png"
    },
    {
      "en": "This is my favorite book. That is yours.",
      "zh": "这是我最喜欢的书。那是你的。",
      "tag": "writing_use",
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "en": "Our team won. Theirs lost.",
      "zh": "我们队赢了。他们队输了。",
      "tag": "writing_use",
      "scene": "basketball",
      "image": "kp3d-basketball.png"
    },
    {
      "en": "My grandpa has a dog. Its name is Lucky.",
      "zh": "我爷爷有一只狗。它的名字叫幸运。",
      "tag": "writing_use",
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "en": "This is my piano. That one is hers.",
      "zh": "这是我的钢琴。那架是她的。",
      "tag": "writing_use",
      "scene": "piano",
      "image": "kp3d-piano.png"
    },
    {
      "en": "I like my school. Do you like yours?",
      "zh": "我喜欢我的学校。你喜欢你的吗？",
      "tag": "writing_use",
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "en": "My apple is red. Yours is green.",
      "zh": "我的苹果是红色的。你的是绿色的。",
      "tag": "writing_use",
      "scene": "apple",
      "image": "kp3d-apple.png"
    }
  ],
  "questions": [
    {
      "q": "_____ classroom is big. _____ is bigger.",
      "opts": [
        "Our; Their",
        "Ours; Theirs",
        "Our; Theirs"
      ],
      "ans": 2,
      "hint": "前有名词用 Our，后独立用 Theirs。",
      "sentence": "Our classroom is big. Theirs is bigger.",
      "zh": "我们的教室大。他们的更大。"
    },
    {
      "q": "Is this pencil _____?",
      "opts": [
        "you",
        "your",
        "yours"
      ],
      "ans": 2,
      "hint": "后面无名词用 yours。",
      "sentence": "Is this pencil yours?",
      "zh": "这支铅笔是你的吗？"
    },
    {
      "q": "The cat washed _____ face.",
      "opts": [
        "it",
        "it's",
        "its"
      ],
      "ans": 2,
      "hint": "its 物主，it's = it is。",
      "sentence": "The cat washed its face.",
      "zh": "猫洗了它的脸。"
    },
    {
      "q": "These seats are _____.",
      "opts": [
        "our",
        "ours",
        "us"
      ],
      "ans": 1,
      "hint": "独立用 ours。",
      "sentence": "These seats are ours.",
      "zh": "这些座位是我们的。"
    },
    {
      "q": "_____ name is Emma. What's _____?",
      "opts": [
        "Her; yours",
        "Hers; your",
        "She; yours"
      ],
      "ans": 0,
      "hint": "Her name；yours 独立。",
      "sentence": "Her name is Emma. What's yours?",
      "zh": "她叫艾玛。你呢？"
    },
    {
      "q": "This is _____ book.",
      "opts": [
        "my",
        "mine",
        "I"
      ],
      "ans": 0,
      "hint": "后面有名词 book，用形容词性物主代词。",
      "sentence": "This is my book.",
      "zh": "这是我的书。"
    },
    {
      "q": "That book is _____.",
      "opts": [
        "my",
        "mine",
        "me"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性物主代词。",
      "sentence": "That book is mine.",
      "zh": "那本书是我的。"
    },
    {
      "q": "_____ pen is on the desk.",
      "opts": [
        "Your",
        "Yours",
        "You"
      ],
      "ans": 0,
      "hint": "后面有名词 pen，用形容词性。",
      "sentence": "Your pen is on the desk.",
      "zh": "你的钢笔在桌子上。"
    },
    {
      "q": "The green pencil is _____.",
      "opts": [
        "her",
        "hers",
        "she"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "The green pencil is hers.",
      "zh": "这支绿铅笔是她的。"
    },
    {
      "q": "This is not _____ bike. It's his.",
      "opts": [
        "my",
        "mine",
        "I"
      ],
      "ans": 0,
      "hint": "后面有名词 bike，用形容词性。",
      "sentence": "This is not my bike. It's his.",
      "zh": "这不是我的自行车。是他的。"
    },
    {
      "q": "Our classroom is big. _____ is small.",
      "opts": [
        "Their",
        "Theirs",
        "They"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "Our classroom is big. Theirs is small.",
      "zh": "我们的教室大。他们的小。"
    },
    {
      "q": "This is my cat. _____ is white.",
      "opts": [
        "Your",
        "Yours",
        "You"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "This is my cat. Yours is white.",
      "zh": "这是我的猫。你的是白色的。"
    },
    {
      "q": "_____ mother is a teacher.",
      "opts": [
        "His",
        "Hers",
        "He"
      ],
      "ans": 0,
      "hint": "后面有名词 mother，用形容词性。",
      "sentence": "His mother is a teacher.",
      "zh": "他的妈妈是老师。"
    },
    {
      "q": "This umbrella is not _____.",
      "opts": [
        "my",
        "mine",
        "me"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "This umbrella is not mine.",
      "zh": "这把伞不是我的。"
    },
    {
      "q": "I like _____ school.",
      "opts": [
        "our",
        "ours",
        "we"
      ],
      "ans": 0,
      "hint": "后面有名词 school，用形容词性。",
      "sentence": "I like our school.",
      "zh": "我喜欢我们的学校。"
    },
    {
      "q": "The red bag is _____.",
      "opts": [
        "her",
        "hers",
        "she"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "The red bag is hers.",
      "zh": "这个红包是她的。"
    },
    {
      "q": "Is this _____ pencil? No, it's mine.",
      "opts": [
        "your",
        "yours",
        "you"
      ],
      "ans": 0,
      "hint": "后面有名词 pencil，用形容词性。",
      "sentence": "Is this your pencil? No, it's mine.",
      "zh": "这是你的铅笔吗？不，是我的。"
    },
    {
      "q": "My shoes are new. _____ are old.",
      "opts": [
        "His",
        "Him",
        "He"
      ],
      "ans": 0,
      "hint": "后面没有名词，用名词性 his。",
      "sentence": "My shoes are new. His are old.",
      "zh": "我的鞋子是新的。他的是旧的。"
    },
    {
      "q": "_____ dog is very cute.",
      "opts": [
        "Their",
        "Theirs",
        "They"
      ],
      "ans": 0,
      "hint": "后面有名词 dog，用形容词性。",
      "sentence": "Their dog is very cute.",
      "zh": "他们的狗很可爱。"
    },
    {
      "q": "This is my apple. That is _____.",
      "opts": [
        "your",
        "yours",
        "you"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "This is my apple. That is yours.",
      "zh": "这是我的苹果。那是你的。"
    },
    {
      "q": "We have our books. They have _____.",
      "opts": [
        "their",
        "theirs",
        "they"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "We have our books. They have theirs.",
      "zh": "我们有我们的书。他们有他们的。"
    },
    {
      "q": "_____ name is Lily.",
      "opts": [
        "Her",
        "Hers",
        "She"
      ],
      "ans": 0,
      "hint": "后面有名词 name，用形容词性。",
      "sentence": "Her name is Lily.",
      "zh": "她的名字是莉莉。"
    },
    {
      "q": "This is not my pen. It's _____.",
      "opts": [
        "her",
        "hers",
        "she"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "This is not my pen. It's hers.",
      "zh": "这不是我的钢笔。是她的。"
    },
    {
      "q": "_____ classroom is on the third floor.",
      "opts": [
        "Our",
        "Ours",
        "We"
      ],
      "ans": 0,
      "hint": "后面有名词 classroom，用形容词性。",
      "sentence": "Our classroom is on the third floor.",
      "zh": "我们的教室在三楼。"
    },
    {
      "q": "The blue bike is _____.",
      "opts": [
        "my",
        "mine",
        "I"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "The blue bike is mine.",
      "zh": "这辆蓝色自行车是我的。"
    },
    {
      "q": "This is _____ umbrella. It's raining.",
      "opts": [
        "my",
        "mine",
        "me"
      ],
      "ans": 0,
      "hint": "后面有名词 umbrella，用形容词性。",
      "sentence": "This is my umbrella. It's raining.",
      "zh": "这是我的伞。下雨了。"
    },
    {
      "q": "Your bag is heavy. _____ is light.",
      "opts": [
        "My",
        "Mine",
        "Me"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "Your bag is heavy. Mine is light.",
      "zh": "你的包很重。我的很轻。"
    },
    {
      "q": "Is this _____ ruler? No, it's his.",
      "opts": [
        "your",
        "yours",
        "you"
      ],
      "ans": 0,
      "hint": "后面有名词 ruler，用形容词性。",
      "sentence": "Is this your ruler? No, it's his.",
      "zh": "这是你的尺子吗？不，是他的。"
    },
    {
      "q": "The cat is not _____. It's theirs.",
      "opts": [
        "our",
        "ours",
        "we"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "The cat is not ours. It's theirs.",
      "zh": "这只猫不是我们的。是他们的。"
    },
    {
      "q": "_____ school is near the park.",
      "opts": [
        "His",
        "Hers",
        "He"
      ],
      "ans": 0,
      "hint": "后面有名词 school，用形容词性。",
      "sentence": "His school is near the park.",
      "zh": "他的学校在公园附近。"
    },
    {
      "q": "This is my seat. That is _____.",
      "opts": [
        "her",
        "hers",
        "she"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "This is my seat. That is hers.",
      "zh": "这是我的座位。那是她的。"
    },
    {
      "q": "We love _____ parents.",
      "opts": [
        "our",
        "ours",
        "we"
      ],
      "ans": 0,
      "hint": "后面有名词 parents，用形容词性。",
      "sentence": "We love our parents.",
      "zh": "我们爱我们的父母。"
    },
    {
      "q": "The toy is _____.",
      "opts": [
        "their",
        "theirs",
        "they"
      ],
      "ans": 1,
      "hint": "后面没有名词，用名词性。",
      "sentence": "The toy is theirs.",
      "zh": "这个玩具是他们的。"
    }
  ],
  "matchPairs": [
    {
      "en": "my book",
      "zh": "我的书"
    },
    {
      "en": "mine",
      "zh": "我的（独立）"
    },
    {
      "en": "hers",
      "zh": "她的（独立）"
    },
    {
      "en": "theirs",
      "zh": "他们的（独立）"
    },
    {
      "en": "your pen",
      "zh": "你的钢笔"
    },
    {
      "en": "yours",
      "zh": "你的（东西）"
    },
    {
      "en": "his cat",
      "zh": "他的猫"
    },
    {
      "en": "our school",
      "zh": "我们的学校"
    },
    {
      "en": "my umbrella",
      "zh": "我的伞"
    },
    {
      "en": "your bike",
      "zh": "你的自行车"
    }
  ],
  "listenPick": [
    {
      "audio": "This is my book.",
      "opts": [
        "This is my book.",
        "This is mine book.",
        "This is I book."
      ],
      "ans": 0,
      "hint": "注意后面有名词 book，用 my。",
      "zh": "这是我的书。",
      "sentence": "This is my book."
    },
    {
      "audio": "That is yours.",
      "opts": [
        "That is yours.",
        "That is your.",
        "That is you."
      ],
      "ans": 0,
      "hint": "后面没有名词，用 yours。",
      "zh": "那是你的。",
      "sentence": "That is yours."
    },
    {
      "audio": "Her cat is white.",
      "opts": [
        "Her cat is white.",
        "Hers cat is white.",
        "She cat is white."
      ],
      "ans": 0,
      "hint": "后面有名词 cat，用 her。",
      "zh": "她的猫是白色的。",
      "sentence": "Her cat is white."
    },
    {
      "audio": "This isn't mine.",
      "opts": [
        "This isn't mine.",
        "This isn't my.",
        "This isn't me."
      ],
      "ans": 0,
      "hint": "后面没有名词，用 mine。",
      "zh": "这不是我的。",
      "sentence": "This isn't mine."
    },
    {
      "audio": "Our school is big.",
      "opts": [
        "Our school is big.",
        "Ours school is big.",
        "We school is big."
      ],
      "ans": 0,
      "hint": "后面有名词 school，用 our。",
      "zh": "我们的学校很大。",
      "sentence": "Our school is big."
    },
    {
      "audio": "The blue bike is his.",
      "opts": [
        "The blue bike is his.",
        "The blue bike is him.",
        "The blue bike is he."
      ],
      "ans": 0,
      "hint": "名词性物主代词 his 不变。",
      "zh": "这辆蓝色自行车是他的。",
      "sentence": "The blue bike is his."
    },
    {
      "audio": "Yours is on the desk.",
      "opts": [
        "Yours is on the desk.",
        "Your is on the desk.",
        "You is on the desk."
      ],
      "ans": 0,
      "hint": "后面没有名词，用 yours。",
      "zh": "你的在桌子上。",
      "sentence": "Yours is on the desk."
    },
    {
      "audio": "This is her umbrella.",
      "opts": [
        "This is her umbrella.",
        "This is hers umbrella.",
        "This is she umbrella."
      ],
      "ans": 0,
      "hint": "后面有名词 umbrella，用 her。",
      "zh": "这是她的伞。",
      "sentence": "This is her umbrella."
    }
  ],
  "builds": [
    {
      "sentence": "This book is mine.",
      "zh": "这本书是我的。",
      "tokens": [
        "This",
        "book",
        "is",
        "mine"
      ],
      "scene": "library",
      "image": "kp3d-library.png"
    },
    {
      "sentence": "Your pen is on the desk.",
      "zh": "你的钢笔在桌子上。",
      "tokens": [
        "Your",
        "pen",
        "is",
        "on",
        "the",
        "desk"
      ],
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "sentence": "My cat is black.",
      "zh": "我的猫是黑色的。",
      "tokens": [
        "My",
        "cat",
        "is",
        "black"
      ],
      "scene": "cat",
      "image": "kp3d-cat.png"
    },
    {
      "sentence": "Our classroom is big.",
      "zh": "我们的教室很大。",
      "tokens": [
        "Our",
        "classroom",
        "is",
        "big"
      ],
      "scene": "classroom",
      "image": "kp3d-classroom.png"
    },
    {
      "sentence": "I like your bike.",
      "zh": "我喜欢你的自行车。",
      "tokens": [
        "I",
        "like",
        "your",
        "bike"
      ],
      "scene": "playground",
      "image": "kp3d-playground.png"
    },
    {
      "sentence": "Her bag is red.",
      "zh": "她的包是红色的。",
      "tokens": [
        "Her",
        "bag",
        "is",
        "red"
      ],
      "scene": "shop",
      "image": "kp3d-shop.png"
    }
  ]
};
})(typeof window !== "undefined" ? window : null);