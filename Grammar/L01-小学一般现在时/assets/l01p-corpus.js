/**
 * L01P 小学一般现在时 · 语料库（3–5 年级）
 */
(function (global) {
  "use strict";

  var SUBJECTS = [
    { en: "I", zh: "我", emoji: "🙋", group: "plural" },
    { en: "You", zh: "你 / 你们", emoji: "👋", group: "plural" },
    { en: "We", zh: "我们", emoji: "👫", group: "plural" },
    { en: "They", zh: "他们 / 她们", emoji: "👨‍👩‍👧‍👦", group: "plural" },
    { en: "He", zh: "他", emoji: "👦", group: "singular" },
    { en: "She", zh: "她", emoji: "👧", group: "singular" },
    { en: "It", zh: "它", emoji: "🐱", group: "singular" },
  ];

  var VERBS = [
    { base: "play", s: "plays", zh: "玩", emoji: "⚽" },
    { base: "run", s: "runs", zh: "跑", emoji: "🏃" },
    { base: "read", s: "reads", zh: "读", emoji: "📖" },
    { base: "write", s: "writes", zh: "写", emoji: "✏️" },
    { base: "eat", s: "eats", zh: "吃", emoji: "🍎" },
    { base: "drink", s: "drinks", zh: "喝", emoji: "🥛" },
    { base: "like", s: "likes", zh: "喜欢", emoji: "❤️" },
    { base: "love", s: "loves", zh: "喜爱", emoji: "💛" },
    { base: "have", s: "has", zh: "有", emoji: "🎒" },
    { base: "go", s: "goes", zh: "去", emoji: "🚶" },
    { base: "get", s: "gets", zh: "得到 / 起床", emoji: "⏰" },
    { base: "brush", s: "brushes", zh: "刷（牙）", emoji: "🪥" },
    { base: "wash", s: "washes", zh: "洗", emoji: "🧼" },
    { base: "watch", s: "watches", zh: "看", emoji: "📺" },
    { base: "listen", s: "listens", zh: "听", emoji: "🎧" },
    { base: "sing", s: "sings", zh: "唱", emoji: "🎤" },
    { base: "dance", s: "dances", zh: "跳舞", emoji: "💃" },
    { base: "swim", s: "swims", zh: "游泳", emoji: "🏊" },
    { base: "draw", s: "draws", zh: "画画", emoji: "🎨" },
    { base: "cook", s: "cooks", zh: "做饭", emoji: "🍳" },
    { base: "help", s: "helps", zh: "帮助", emoji: "🤝" },
    { base: "study", s: "studies", zh: "学习", emoji: "📚" },
    { base: "walk", s: "walks", zh: "走路", emoji: "🚶‍♀️" },
    { base: "ride", s: "rides", zh: "骑", emoji: "🚲" },
    { base: "fly", s: "flies", zh: "飞", emoji: "🪁" },
    { base: "sleep", s: "sleeps", zh: "睡觉", emoji: "😴" },
    { base: "wake", s: "wakes", zh: "醒来", emoji: "🌅" },
    { base: "clean", s: "cleans", zh: "打扫", emoji: "🧹" },
    { base: "open", s: "opens", zh: "打开", emoji: "🚪" },
    { base: "close", s: "closes", zh: "关上", emoji: "📕" },
  ];

  var TIME_WORDS = [
    { en: "every day", zh: "每天" },
    { en: "every morning", zh: "每天早上" },
    { en: "every evening", zh: "每天晚上" },
    { en: "on Monday", zh: "在星期一" },
    { en: "on weekends", zh: "在周末" },
    { en: "after school", zh: "放学后" },
    { en: "before bed", zh: "睡觉前" },
    { en: "at seven o'clock", zh: "在七点" },
    { en: "in the morning", zh: "在早上" },
    { en: "at night", zh: "在晚上" },
    { en: "often", zh: "经常" },
    { en: "sometimes", zh: "有时" },
    { en: "usually", zh: "通常" },
    { en: "always", zh: "总是" },
    { en: "never", zh: "从不" },
  ];

  var TOPICS = {
    morning: {
      title: "早晨时光",
      emoji: "🌅",
      sentences: [
        "I wake up at seven o'clock.",
        "I brush my teeth every morning.",
        "She eats breakfast at home.",
        "We go to school at eight.",
        "He washes his face.",
        "They drink milk.",
        "My mum cooks breakfast.",
        "The sun rises in the morning.",
      ],
    },
    school: {
      title: "校园生活",
      emoji: "🏫",
      sentences: [
        "I have English class on Monday.",
        "We study maths every day.",
        "She reads books in the library.",
        "They play football after school.",
        "He writes in his notebook.",
        "Our teacher helps us.",
        "I like my school.",
        "We listen to the teacher.",
      ],
    },
    hobbies: {
      title: "兴趣爱好",
      emoji: "🎨",
      sentences: [
        "I like drawing pictures.",
        "She loves dancing.",
        "We play basketball on weekends.",
        "He watches cartoons on TV.",
        "They sing songs together.",
        "I read story books.",
        "My cat sleeps on the sofa.",
        "Birds fly in the sky.",
      ],
    },
    family: {
      title: "家庭生活",
      emoji: "👨‍👩‍👧",
      sentences: [
        "My dad drives a car.",
        "My mum cooks dinner.",
        "We eat together at home.",
        "She helps her little brother.",
        "He cleans his room.",
        "They walk in the park.",
        "Grandpa reads the newspaper.",
        "I love my family.",
      ],
    },
    food: {
      title: "饮食健康",
      emoji: "🍎",
      sentences: [
        "I eat an apple every day.",
        "She likes rice and vegetables.",
        "We drink water after sport.",
        "He doesn't like spicy food.",
        "They eat lunch at school.",
        "Fish swims in the water.",
        "I have milk for breakfast.",
        "My sister loves strawberries.",
      ],
    },
    animals: {
      title: "动物世界",
      emoji: "🐾",
      sentences: [
        "The dog runs fast.",
        "The cat sleeps on the bed.",
        "Birds sing in the tree.",
        "Fish swim in the river.",
        "The rabbit eats carrots.",
        "Horses run in the field.",
        "A bee flies to the flower.",
        "Ducks swim on the lake.",
      ],
    },
  };

  var SPELLING_RULES = [
    {
      rule: "一般情况：直接加 s",
      examples: ["play → plays", "read → reads", "run → runs"],
      samples: ["He plays football.", "She reads a book."],
    },
    {
      rule: "以 s / x / ch / sh 结尾：加 es",
      examples: ["wash → washes", "watch → watches", "brush → brushes"],
      samples: ["She washes her hands.", "He watches TV."],
    },
    {
      rule: "以辅音字母 + y 结尾：变 y 为 i 再加 es",
      examples: ["study → studies", "fly → flies"],
      samples: ["She studies English.", "The bird flies away."],
    },
    {
      rule: "特殊变化：go → goes, do → does, have → has",
      examples: ["go → goes", "have → has"],
      samples: ["He goes to school.", "She has a cat."],
    },
  ];

  var NEGATIVE_EXAMPLES = [
    { pos: "I like apples.", neg: "I don't like apples.", zh: "我不喜欢苹果。" },
    { pos: "We play football.", neg: "We don't play football.", zh: "我们不踢足球。" },
    { pos: "They read books.", neg: "They don't read books.", zh: "他们不读书。" },
    { pos: "He likes milk.", neg: "He doesn't like milk.", zh: "他不喜欢牛奶。" },
    { pos: "She runs fast.", neg: "She doesn't run fast.", zh: "她跑得不快。" },
    { pos: "It rains today.", neg: "It doesn't rain today.", zh: "今天不下雨。" },
    { pos: "Tom has a dog.", neg: "Tom doesn't have a dog.", zh: "汤姆没有狗。" },
    { pos: "My mum cooks dinner.", neg: "My mum doesn't cook dinner.", zh: "妈妈不做晚饭。" },
  ];

  var QUESTION_EXAMPLES = [
    { q: "Do you like English?", a: "Yes, I do. / No, I don't.", zh: "你喜欢英语吗？" },
    { q: "Do they play football?", a: "Yes, they do. / No, they don't.", zh: "他们踢足球吗？" },
    { q: "Does she read books?", a: "Yes, she does. / No, she doesn't.", zh: "她读书吗？" },
    { q: "Does he go to school?", a: "Yes, he does. / No, he doesn't.", zh: "他去上学吗？" },
    { q: "Does it rain?", a: "Yes, it does. / No, it doesn't.", zh: "下雨吗？" },
    { q: "Do we have class today?", a: "Yes, we do. / No, we don't.", zh: "我们今天上课吗？" },
  ];

  var QUIZ_ITEMS = [
    { q: "She ___ to school every day.", opts: ["go", "goes", "going"], ans: 1, hint: "She 是第三人称单数，动词加 s" },
    { q: "They ___ football after school.", opts: ["plays", "play", "playing"], ans: 1, hint: "They 用动词原形" },
    { q: "He ___ TV in the evening.", opts: ["watch", "watches", "watchs"], ans: 1, hint: "watch 以 ch 结尾，加 es" },
    { q: "I ___ apples.", opts: ["likes", "like", "liking"], ans: 1, hint: "I 后面用动词原形" },
    { q: "My cat ___ on the sofa.", opts: ["sleep", "sleeps", "sleeping"], ans: 1, hint: "My cat = it，用第三人称单数" },
    { q: "We ___ English on Monday.", opts: ["study", "studies", "studys"], ans: 0, hint: "We 用动词原形" },
    { q: "She ___ not like spicy food.", opts: ["do", "does", "is"], ans: 1, hint: "She 用 doesn't" },
    { q: "___ you like music?", opts: ["Do", "Does", "Are"], ans: 0, hint: "you 前面用 Do" },
  ];

  global.L01pCorpus = {
    SUBJECTS: SUBJECTS,
    VERBS: VERBS,
    TIME_WORDS: TIME_WORDS,
    TOPICS: TOPICS,
    SPELLING_RULES: SPELLING_RULES,
    NEGATIVE_EXAMPLES: NEGATIVE_EXAMPLES,
    QUESTION_EXAMPLES: QUESTION_EXAMPLES,
    QUIZ_ITEMS: QUIZ_ITEMS,
  };
})(typeof window !== "undefined" ? window : null);
