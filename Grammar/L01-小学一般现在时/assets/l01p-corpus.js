(function (global) {
  "use strict";

  /** 词汇拓展库 */
  var VOCAB_DAILY = [
    { word: "play", zh: "玩；踢（球）", example: "I play football.", exampleZh: "我踢足球。", image: "l01p-scene-he-plays-football.png" },
    { word: "run", zh: "跑", example: "They run in the park.", exampleZh: "他们在公园跑步。", image: "l01p-scene-run-park.png" },
    { word: "eat", zh: "吃", example: "I eat breakfast every morning.", exampleZh: "我每天早上吃早餐。", image: "l01p-scene-eat-breakfast.png" },
    { word: "go", zh: "去", example: "We go to school at eight.", exampleZh: "我们八点上学。", image: "l01p-scene-go-school.png" },
    { word: "read", zh: "阅读", example: "She reads books every day.", exampleZh: "她每天读书。", image: "l01p-scene-does-she-read.png" },
    { word: "wash", zh: "洗", example: "She washes her hands.", exampleZh: "她洗手。", image: "l01p-scene-washes-hands.png" },
    { word: "watch", zh: "观看", example: "He watches TV at night.", exampleZh: "他晚上看电视。", image: "l01p-scene-doesnt-watch-tv.png" },
    { word: "like", zh: "喜欢", example: "Do you like English?", exampleZh: "你喜欢英语吗？", image: "l01p-scene-do-you-like-english.png" },
    { word: "wake", zh: "醒来", example: "I wake up at seven o'clock.", exampleZh: "我七点起床。", image: "l01p-morning-wake.png" },
    { word: "study", zh: "学习", example: "We study English at school.", exampleZh: "我们在学校学英语。", image: "l01p-school-class.png" },
    { word: "brush", zh: "刷（牙）", example: "He brushes his teeth every morning.", exampleZh: "他每天早上刷牙。", image: "l01p-brush-teeth.png" },
    { word: "sleep", zh: "睡觉", example: "My cat sleeps on the bed.", exampleZh: "我的猫在床上睡觉。", image: "l01p-cat-sleep.png" },
    { word: "drink", zh: "喝", example: "I drink milk every morning.", exampleZh: "我每天早上喝牛奶。", image: "l01p-scene-eat-breakfast.png" },
    { word: "walk", zh: "走路", example: "We walk to school.", exampleZh: "我们走路去学校。", image: "l01p-scene-go-school.png" },
    { word: "sing", zh: "唱歌", example: "She sings in the classroom.", exampleZh: "她在教室里唱歌。", image: "l01p-school-class.png" },
    { word: "write", zh: "写", example: "He writes in his notebook.", exampleZh: "他在笔记本上写字。", image: "l01p-school-class.png" },
    { word: "listen", zh: "听", example: "We listen to the teacher.", exampleZh: "我们听老师讲课。", image: "l01p-school-class.png" }
  ];

  var VOCAB_BE = [
    { word: "am / is / are", zh: "是（be 动词）", example: "I am happy. She is tall. They are students.", exampleZh: "我很高兴。她很高。他们是学生。", image: "l01p-action-vs-be.png" },
    { word: "happy", zh: "高兴的", example: "I am happy.", exampleZh: "我很高兴。", image: "l01p-be-i-am-happy.png" },
    { word: "student", zh: "学生", example: "They are students.", exampleZh: "他们是学生。", image: "l01p-be-they-are-students.png" },
    { word: "friend", zh: "朋友", example: "We are friends.", exampleZh: "我们是朋友。", image: "l01p-be-we-are-friends.png" },
    { word: "from", zh: "来自", example: "He is from China.", exampleZh: "他来自中国。", image: "l01p-be-he-is-from-china.png" },
    { word: "in", zh: "在……里", example: "She is in the classroom.", exampleZh: "她在教室里。", image: "l01p-be-she-is-classroom.png" }
  ];

  var VOCAB_TIME = [
    { word: "every day", zh: "每天", example: "I play football every day.", exampleZh: "我每天踢足球。", image: "l01p-playground.png" },
    { word: "every morning", zh: "每天早上", example: "I eat breakfast every morning.", exampleZh: "我每天早上吃早餐。", image: "l01p-scene-eat-breakfast.png" },
    { word: "at night", zh: "在晚上", example: "She doesn't watch TV at night.", exampleZh: "她晚上不看电视。", image: "l01p-scene-doesnt-watch-tv.png" },
    { word: "after school", zh: "放学后", example: "She plays football after school.", exampleZh: "她放学后踢足球。", image: "l01p-scene-he-plays-football.png" },
    { word: "on weekends", zh: "在周末", example: "Do they play football on weekends?", exampleZh: "他们周末踢足球吗？", image: "l01p-playground.png" },
    { word: "at eight", zh: "在八点", example: "We go to school at eight.", exampleZh: "我们八点上学。", image: "l01p-scene-go-school.png" },
    { word: "together", zh: "一起", example: "We eat dinner together.", exampleZh: "我们一起吃晚饭。", image: "l01p-family-dinner.png" },
    { word: "every night", zh: "每天晚上", example: "He watches TV every night.", exampleZh: "他每天晚上看电视。", image: "l01p-scene-doesnt-watch-tv.png" }
  ];

  /** 练习题池 */
  var Q_BE = [
    { q: "I ___ happy.", opts: ["am", "is", "are"], ans: 0, hint: "I → am", sentence: "I am happy.", zh: "我很高兴。" },
    { q: "She ___ in the classroom.", opts: ["am", "is", "are"], ans: 1, hint: "She → is", sentence: "She is in the classroom.", zh: "她在教室里。" },
    { q: "They ___ students.", opts: ["am", "is", "are"], ans: 2, hint: "They → are", sentence: "They are students.", zh: "他们是学生。" },
    { q: "He ___ from China.", opts: ["am", "is", "are"], ans: 1, hint: "He → is", sentence: "He is from China.", zh: "他来自中国。" },
    { q: "We ___ friends.", opts: ["am", "is", "are"], ans: 2, hint: "We → are", sentence: "We are friends.", zh: "我们是朋友。" },
    { q: "It ___ a cat.", opts: ["am", "is", "are"], ans: 1, hint: "It → is", sentence: "It is a cat.", zh: "它是一只猫。" },
    { q: "You ___ my friend.", opts: ["am", "is", "are"], ans: 2, hint: "You → are", sentence: "You are my friend.", zh: "你是我的朋友。" },
    { q: "Tom ___ tall.", opts: ["am", "is", "are"], ans: 1, hint: "Tom = He → is", sentence: "Tom is tall.", zh: "汤姆很高。" },
    { q: "I ___ in the classroom.", opts: ["am", "is", "are"], ans: 0, hint: "I → am", sentence: "I am in the classroom.", zh: "我在教室里。" }
  ];

  var Q_3S = [
    { q: "He ___ football.", opts: ["play", "plays", "playing"], ans: 1, hint: "He → plays", sentence: "He plays football.", zh: "他踢足球。" },
    { q: "She ___ her hands.", opts: ["wash", "washes", "washing"], ans: 1, hint: "wash + es", sentence: "She washes her hands.", zh: "她洗手。" },
    { q: "Tom ___ to school.", opts: ["go", "goes", "going"], ans: 1, hint: "go → goes", sentence: "Tom goes to school.", zh: "汤姆去上学。" },
    { q: "My cat ___ on the bed.", opts: ["sleep", "sleeps", "sleeping"], ans: 1, hint: "It → sleeps", sentence: "My cat sleeps on the bed.", zh: "我的猫在床上睡觉。" },
    { q: "She ___ English.", opts: ["study", "studies", "studying"], ans: 1, hint: "y → ies", sentence: "She studies English.", zh: "她学英语。" },
    { q: "He ___ TV at night.", opts: ["watch", "watches", "watching"], ans: 1, hint: "watch + es", sentence: "He watches TV at night.", zh: "他晚上看电视。" },
    { q: "My sister ___ basketball.", opts: ["play", "plays", "playing"], ans: 1, hint: "She → plays", sentence: "My sister plays basketball.", zh: "我姐姐打篮球。" },
    { q: "We ___ in the park.", opts: ["run", "runs", "running"], ans: 0, hint: "We → 原形", sentence: "They run in the park.", zh: "他们在公园跑步。" },
    { q: "She ___ books every day.", opts: ["read", "reads", "reading"], ans: 1, hint: "She → reads", sentence: "She reads books every day.", zh: "她每天读书。" },
    { q: "I ___ breakfast every morning.", opts: ["eat", "eats", "eating"], ans: 0, hint: "I → eat", sentence: "I eat breakfast every morning.", zh: "我每天早上吃早餐。" }
  ];

  var Q_NEG = [
    { q: "I ___ like spicy food.", opts: ["don't", "doesn't", "isn't"], ans: 0, hint: "I → don't", sentence: "I don't like spicy food.", zh: "我不喜欢辣的食物。" },
    { q: "She ___ watch TV.", opts: ["don't", "doesn't", "isn't"], ans: 1, hint: "She → doesn't", sentence: "She doesn't watch TV at night.", zh: "她晚上不看电视。" },
    { q: "They ___ play games.", opts: ["don't", "doesn't", "aren't"], ans: 0, hint: "They → don't", sentence: "They don't play games.", zh: "他们不玩游戏。" },
    { q: "He ___ eat meat.", opts: ["don't", "doesn't", "isn't"], ans: 1, hint: "He → doesn't", sentence: "He doesn't eat meat.", zh: "他不吃肉。" },
    { q: "I ___ play games.", opts: ["don't", "doesn't", "am not"], ans: 0, hint: "I → don't", sentence: "I don't play games.", zh: "我不玩游戏。" },
    { q: "She ___ like spicy food.", opts: ["don't", "doesn't", "isn't"], ans: 1, hint: "She → doesn't", sentence: "She doesn't like spicy food.", zh: "她不喜欢辣的食物。" },
    { q: "We ___ students.", opts: ["don't", "doesn't", "aren't"], ans: 2, hint: "be 否定用 aren't", sentence: "We aren't students.", zh: "我们不是学生。" }
  ];

  var Q_MIX = Q_BE.concat(Q_3S, Q_NEG, [
    { q: "___ you like English?", opts: ["Do", "Does", "Are"], ans: 0, hint: "You → Do", sentence: "Do you like English?", zh: "你喜欢英语吗？" },
    { q: "___ she read books?", opts: ["Do", "Does", "Is"], ans: 1, hint: "She → Does", sentence: "Does she read books?", zh: "她读书吗？" },
    { q: "We ___ dinner together.", opts: ["eat", "eats", "eating"], ans: 0, hint: "We → 原形", sentence: "We eat dinner together.", zh: "我们一起吃晚饭。" },
    { q: "___ they students?", opts: ["Do", "Does", "Are"], ans: 2, hint: "be 动词疑问句", sentence: "Are they students?", zh: "他们是学生吗？" },
    { q: "I ___ football every day.", opts: ["play", "plays", "playing"], ans: 0, hint: "I → play", sentence: "I play football every day.", zh: "我每天踢足球。" },
    { q: "___ he play football?", opts: ["Do", "Does", "Is"], ans: 1, hint: "He → Does", sentence: "Does he play football?", zh: "他踢足球吗？" },
    { q: "She ___ happy.", opts: ["am", "is", "are"], ans: 1, hint: "She → is", sentence: "She is happy.", zh: "她很高兴。" },
    { q: "They ___ to school.", opts: ["go", "goes", "going"], ans: 0, hint: "They → go", sentence: "We go to school.", zh: "我们去上学。" }
  ]);

  var MATCH_PAIRS = [
    { en: "He plays football.", zh: "他踢足球。" },
    { en: "I am happy.", zh: "我很高兴。" },
    { en: "They run in the park.", zh: "他们在公园跑步。" },
    { en: "She is in the classroom.", zh: "她在教室里。" },
    { en: "We eat breakfast.", zh: "我们吃早餐。" },
    { en: "They are students.", zh: "他们是学生。" },
    { en: "She washes her hands.", zh: "她洗手。" },
    { en: "Tom goes to school.", zh: "汤姆去上学。" },
    { en: "Do you like English?", zh: "你喜欢英语吗？" },
    { en: "She doesn't watch TV.", zh: "她不看电视。" },
    { en: "We go to school at eight.", zh: "我们八点上学。" },
    { en: "My cat sleeps on the bed.", zh: "我的猫在床上睡觉。" }
  ];

  var LISTEN_PICK = [
    { audio: "I am happy.", opts: ["I am happy.", "I am sad.", "He is happy."], ans: 0, zh: "我很高兴。" },
    { audio: "He plays football.", opts: ["He plays football.", "She plays football.", "They play football."], ans: 0, zh: "他踢足球。" },
    { audio: "Do you like English?", opts: ["Do you like English?", "Does she like English?", "You like English."], ans: 0, zh: "你喜欢英语吗？" },
    { audio: "She doesn't watch TV.", opts: ["She watches TV.", "She doesn't watch TV.", "She doesn't read books."], ans: 1, zh: "她不看电视。" },
    { audio: "They are students.", opts: ["They are teachers.", "They are students.", "We are students."], ans: 1, zh: "他们是学生。" },
    { audio: "She washes her hands.", opts: ["She washes her hands.", "He washes his hands.", "She washes her face."], ans: 0, zh: "她洗手。" },
    { audio: "Tom goes to school.", opts: ["Tom go to school.", "Tom goes to school.", "Tom goes to the park."], ans: 1, zh: "汤姆去上学。" },
    { audio: "We eat dinner together.", opts: ["We eat breakfast.", "We eat dinner together.", "They eat dinner together."], ans: 1, zh: "我们一起吃晚饭。" },
    { audio: "Does he play football?", opts: ["Do he play football?", "Does he play football?", "Does she play football?"], ans: 1, zh: "他踢足球吗？" },
    { audio: "I don't like spicy food.", opts: ["I like spicy food.", "I don't like spicy food.", "She doesn't like spicy food."], ans: 1, zh: "我不喜欢辣的食物。" }
  ];

  global.L01pCorpus = {
    vocabDaily: VOCAB_DAILY,
    vocabBe: VOCAB_BE,
    vocabTime: VOCAB_TIME,
    qBe: Q_BE,
    q3s: Q_3S,
    qNeg: Q_NEG,
    qMix: Q_MIX,
    matchPairs: MATCH_PAIRS,
    listenPick: LISTEN_PICK,
    shuffle: function (arr, n) {
      var a = arr.slice().sort(function () { return Math.random() - 0.5; });
      return n ? a.slice(0, n) : a;
    }
  };
})(typeof window !== "undefined" ? window : null);
