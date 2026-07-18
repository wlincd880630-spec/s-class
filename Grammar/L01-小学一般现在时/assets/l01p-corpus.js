(function (global) {
  "use strict";

  /** 人物 / 地名 / 物品主语（参照 5GA–6GA + 初中 L01 + 升学真题难度） */
  var NAMES = ["Lily", "Tom", "Emma", "Jack", "Chen Tao", "Miss Li", "Mr Wang", "Teng Fei", "Han Lin", "Linda", "Alba", "Ben"];
  var PLACES = ["Chengdu", "the school library", "the sports field", "the dining hall", "the science room", "the playground"];
  var THINGS = ["The school library", "The train", "My cat", "Plastic waste", "The shopkeeper", "The science book", "The cap", "These keys"];

  /** 词汇拓展 · 日常动词（外研 5–6 年级 + 升学常见） */
  var VOCAB_DAILY = [
    { word: "recycle", zh: "回收利用", example: "Many toys are made of plastic and can be recycled.", exampleZh: "许多玩具由塑料制成，可以回收利用。", image: "l01p-scene-recycle-plastic.png", source: "5GA U2" },
    { word: "waste", zh: "浪费；废弃物", example: "Don't waste food; take only what you can eat.", exampleZh: "不要浪费食物，吃多少拿多少。", image: "l01p-scene-waste-food.png", source: "5GA U2" },
    { word: "save", zh: "储蓄；节省", example: "Lily saves half of her pocket money every week.", exampleZh: "莉莉每周把一半零花钱存起来。", image: "l01p-scene-pocket-money.png", source: "6GA U1" },
    { word: "help", zh: "帮助", example: "The shopkeeper helps me find the right size.", exampleZh: "店主帮我找到合适的尺码。", image: "l01p-scene-shopkeeper.png", source: "6GA U1" },
    { word: "read", zh: "阅读", example: "Emma reads English stories in the school library every afternoon.", exampleZh: "艾玛每天下午在学校图书馆读英语故事。", image: "l01p-scene-lily-library.png", source: "5GB U3" },
    { word: "play", zh: "玩；打（球）", example: "Teng Fei plays basketball with his classmates after school.", exampleZh: "腾飞放学后和同学打篮球。", image: "l01p-scene-tengfei-basketball.png", source: "七上 U1" },
    { word: "teach", zh: "教", example: "Mr Wang teaches science in our classroom every Monday.", exampleZh: "王老师每周一在教室教科学。", image: "l01p-scene-mr-wang-teaches.png", source: "5GA U4" },
    { word: "wash", zh: "洗", example: "Chen Tao washes his hands carefully before lunch.", exampleZh: "陈涛午饭前仔细洗手。", image: "l01p-scene-washes-hands.png", source: "5GA U1" },
    { word: "watch", zh: "观看", example: "Linda doesn't watch TV at night on school days.", exampleZh: "上学日琳达晚上不看电视。", image: "l01p-scene-doesnt-watch-tv.png", source: "七上 U2" },
    { word: "go", zh: "去", example: "Tom goes to school by bus at seven thirty.", exampleZh: "汤姆七点半乘公交上学。", image: "l01p-scene-chentao-bus.png", source: "5GB U1" },
    { word: "study", zh: "学习", example: "We study English and science at school every day.", exampleZh: "我们每天在学校学英语和科学。", image: "l01p-school-class.png", source: "5GA U4" },
    { word: "listen", zh: "听", example: "Jack often listens to English news on the radio.", exampleZh: "杰克经常听电台英语新闻。", image: "l01p-scene-jack-listens.png", source: "七上 U1" },
    { word: "open", zh: "打开；营业", example: "The shop opens at eight o'clock every morning.", exampleZh: "这家商店每天早上八点开门。", image: "l01p-scene-shopkeeper.png", source: "6GA U1" },
    { word: "protect", zh: "保护", example: "We protect pandas in Chengdu together.", exampleZh: "我们在成都一起保护大熊猫。", image: "l01p-scene-pandas-chengdu.png", source: "5GA U2" },
    { word: "exercise", zh: "锻炼", example: "Han Lin exercises in the sports field every morning.", exampleZh: "韩琳每天早上在运动场锻炼。", image: "l01p-scene-run-park.png", source: "6GA U5" },
    { word: "check", zh: "检查", example: "Miss Li checks our homework after class.", exampleZh: "李老师课后检查我们的作业。", image: "l01p-scene-miss-li-checks.png", source: "升学真题" }
  ];

  var VOCAB_BE = [
    { word: "am / is / are", zh: "是（be 动词）", example: "I am happy. The school library is very big. They are students.", exampleZh: "我很高兴。学校图书馆很大。他们是学生。", image: "l01p-action-vs-be.png", source: "七上 U1" },
    { word: "library", zh: "图书馆", example: "The school library is very big and quiet.", exampleZh: "学校图书馆又大又安静。", image: "l01p-scene-school-library-big.png", source: "七上 U3" },
    { word: "across from", zh: "在……对面", example: "The dining hall is across from the sports field.", exampleZh: "食堂在运动场对面。", image: "l01p-scene-dining-hall.png", source: "七上 U3" },
    { word: "from", zh: "来自", example: "Chen Tao is from Chengdu, Sichuan.", exampleZh: "陈涛来自四川成都。", image: "l01p-be-he-is-from-china.png", source: "Starter U1" },
    { word: "ready", zh: "准备好的", example: "The passengers aren't ready to start their trip.", exampleZh: "乘客们还没准备好出发。", image: "l01p-scene-train-leaves.png", source: "七上 U2" },
    { word: "important", zh: "重要的", example: "Health is very important for every student.", exampleZh: "健康对每个同学都很重要。", image: "l01p-scene-health-matters.png", source: "6GA U5" },
    { word: "famous", zh: "著名的", example: "Chengdu is famous for its pandas and hot pot.", exampleZh: "成都以大熊猫和火锅闻名。", image: "l01p-scene-pandas-chengdu.png", source: "5GB U4" },
    { word: "different", zh: "不同的", example: "Life in the city is different from life in the village.", exampleZh: "城市生活和乡村生活不同。", image: "l01p-scene-then-now.png", source: "5GB U6" }
  ];

  var VOCAB_TIME = [
    { word: "every morning", zh: "每天早上", example: "The train leaves the station at nine every morning.", exampleZh: "火车每天早上九点驶离车站。", image: "l01p-scene-train-leaves.png", source: "七上 U1" },
    { word: "after school", zh: "放学后", example: "Emma and Jack play badminton after school.", exampleZh: "艾玛和杰克放学后打羽毛球。", image: "l01p-scene-emma-badminton.png", source: "七上 U1" },
    { word: "on school days", zh: "在上学日", example: "Linda doesn't watch TV at night on school days.", exampleZh: "上学日琳达晚上不看电视。", image: "l01p-scene-doesnt-watch-tv.png", source: "5GB U1" },
    { word: "every weekend", zh: "每个周末", example: "Tom visits his grandparents in Chengdu every weekend.", exampleZh: "汤姆每个周末去成都看望祖父母。", image: "l01p-scene-chengdu-visit.png", source: "5GB U1" },
    { word: "three times a week", zh: "每周三次", example: "Han Lin plays table tennis three times a week.", exampleZh: "韩琳每周打三次乒乓球。", image: "l01p-playground.png", source: "七上 U1" },
    { word: "at eight o'clock", zh: "在八点", example: "The shop opens at eight o'clock every morning.", exampleZh: "商店每天早上八点开门。", image: "l01p-scene-shopkeeper.png", source: "6GA U1" },
    { word: "these days", zh: "这些天", example: "Many students ride bikes to school these days.", exampleZh: "这些天许多学生骑自行车上学。", image: "l01p-scene-go-school.png", source: "升学真题" }
  ];

  /** be 动词题库 */
  var Q_BE = [
    { q: "The school library ___ very big and quiet.", opts: ["am", "is", "are"], ans: 1, hint: "The school library = 单数 → is", sentence: "The school library is very big and quiet.", zh: "学校图书馆又大又安静。", source: "七上 U3" },
    { q: "Chen Tao ___ from Chengdu.", opts: ["am", "is", "are"], ans: 1, hint: "Chen Tao = He → is", sentence: "Chen Tao is from Chengdu.", zh: "陈涛来自成都。", source: "Starter U1" },
    { q: "Emma and I ___ good friends.", opts: ["am", "is", "are"], ans: 2, hint: "Emma and I = We → are", sentence: "Emma and I are good friends.", zh: "艾玛和我是好朋友。", source: "七上 U1" },
    { q: "The dining hall ___ across from the sports field.", opts: ["am", "is", "are"], ans: 1, hint: "The dining hall = 单数 → is", sentence: "The dining hall is across from the sports field.", zh: "食堂在运动场对面。", source: "七上 U3" },
    { q: "These keys ___ on the teacher's desk.", opts: ["am", "is", "are"], ans: 2, hint: "These keys = 复数 → are", sentence: "These keys are on the teacher's desk.", zh: "这些钥匙在讲台上。", source: "七上 U2" },
    { q: "My favourite subject ___ science.", opts: ["am", "is", "are"], ans: 1, hint: "My favourite subject = 单数 → is", sentence: "My favourite subject is science.", zh: "我最喜欢的科目是科学。", source: "5GA U4" },
    { q: "The passengers ___ ready to start their trip.", opts: ["am", "is", "aren't"], ans: 2, hint: "The passengers = 复数", sentence: "The passengers aren't ready to start their trip.", zh: "乘客们还没准备好出发。", source: "七上 U2" },
    { q: "Chengdu ___ famous for its pandas.", opts: ["am", "is", "are"], ans: 1, hint: "Chengdu = 地名单数 → is", sentence: "Chengdu is famous for its pandas.", zh: "成都以大熊猫闻名。", source: "5GB U4" },
    { q: "I ___ in Grade Six this year.", opts: ["am", "is", "are"], ans: 0, hint: "I → am", sentence: "I am in Grade Six this year.", zh: "我今年上六年级。", source: "6GA" },
    { q: "Health ___ very important for students.", opts: ["am", "is", "are"], ans: 1, hint: "Health = 不可数单数 → is", sentence: "Health is very important for students.", zh: "健康对学生很重要。", source: "6GA U5" }
  ];

  /** 三单题库（人名 / 地名 / 物品主语） */
  var Q_3S = [
    { q: "Teng Fei ___ basketball with his classmates after school.", opts: ["play", "plays", "playing"], ans: 1, hint: "Teng Fei = He → plays", sentence: "Teng Fei plays basketball with his classmates after school.", zh: "腾飞放学后和同学打篮球。", source: "七上 U1" },
    { q: "Emma ___ English stories in the library every afternoon.", opts: ["read", "reads", "reading"], ans: 1, hint: "Emma = She → reads", sentence: "Emma reads English stories in the library every afternoon.", zh: "艾玛每天下午在图书馆读英语故事。", source: "5GB U3" },
    { q: "Mr Wang ___ science in our classroom every Monday.", opts: ["teach", "teaches", "teaching"], ans: 1, hint: "Mr Wang = He → teaches", sentence: "Mr Wang teaches science in our classroom every Monday.", zh: "王老师每周一教科学。", source: "5GA U4" },
    { q: "The train ___ the station at nine every morning.", opts: ["leave", "leaves", "leaving"], ans: 1, hint: "The train = It → leaves", sentence: "The train leaves the station at nine every morning.", zh: "火车每天早上九点驶离车站。", source: "七上 U1" },
    { q: "Lily ___ half of her pocket money every week.", opts: ["save", "saves", "saving"], ans: 1, hint: "Lily = She → saves", sentence: "Lily saves half of her pocket money every week.", zh: "莉莉每周存一半零花钱。", source: "6GA U1" },
    { q: "The shopkeeper ___ me find the right size.", opts: ["help", "helps", "helping"], ans: 1, hint: "The shopkeeper = He/She → helps", sentence: "The shopkeeper helps me find the right size.", zh: "店主帮我找到合适尺码。", source: "6GA U1" },
    { q: "My cat ___ on the soft bed at night.", opts: ["sleep", "sleeps", "sleeping"], ans: 1, hint: "My cat = It → sleeps", sentence: "My cat sleeps on the soft bed at night.", zh: "我的猫晚上睡在软床上。", source: "5GA U1" },
    { q: "Chen Tao ___ his hands carefully before lunch.", opts: ["wash", "washes", "washing"], ans: 1, hint: "wash + es", sentence: "Chen Tao washes his hands carefully before lunch.", zh: "陈涛午饭前仔细洗手。", source: "5GA U1" },
    { q: "Jack ___ to English news on the radio.", opts: ["listen", "listens", "listening"], ans: 1, hint: "Jack → listens", sentence: "Jack often listens to English news on the radio.", zh: "杰克经常听电台英语新闻。", source: "七上 U1" },
    { q: "The shop ___ at eight o'clock every morning.", opts: ["open", "opens", "opening"], ans: 1, hint: "The shop = It → opens", sentence: "The shop opens at eight o'clock every morning.", zh: "商店每天早上八点开门。", source: "6GA U1" },
    { q: "Miss Li ___ our homework after class.", opts: ["check", "checks", "checking"], ans: 1, hint: "Miss Li → checks", sentence: "Miss Li checks our homework after class.", zh: "李老师课后检查作业。", source: "升学真题" },
    { q: "Plastic waste ___ our beautiful city.", opts: ["pollute", "pollutes", "polluting"], ans: 1, hint: "Plastic waste = 单数 → pollutes", sentence: "Plastic waste pollutes our beautiful city.", zh: "塑料废弃物污染我们美丽的城市。", source: "5GA U2" }
  ];

  /** 否定句题库 */
  var Q_NEG = [
    { q: "Linda ___ watch TV at night on school days.", opts: ["don't", "doesn't", "isn't"], ans: 1, hint: "Linda = She → doesn't", sentence: "Linda doesn't watch TV at night on school days.", zh: "上学日琳达晚上不看电视。", source: "七上 U2" },
    { q: "We ___ waste food in the dining hall.", opts: ["don't", "doesn't", "aren't"], ans: 0, hint: "We → don't", sentence: "We don't waste food in the dining hall.", zh: "我们在食堂不浪费食物。", source: "5GA U2" },
    { q: "Tom ___ eat too much candy before bedtime.", opts: ["don't", "doesn't", "isn't"], ans: 1, hint: "Tom → doesn't", sentence: "Tom doesn't eat too much candy before bedtime.", zh: "汤姆睡前不吃太多糖果。", source: "5GA U1" },
    { q: "The passengers ___ ready to start their trip.", opts: ["don't", "doesn't", "aren't"], ans: 2, hint: "be 否定用 aren't", sentence: "The passengers aren't ready to start their trip.", zh: "乘客们还没准备好出发。", source: "七上 U2" },
    { q: "I ___ like staying up late on school nights.", opts: ["don't", "doesn't", "am not"], ans: 0, hint: "I → don't", sentence: "I don't like staying up late on school nights.", zh: "上学日晚上我不喜欢熬夜。", source: "6GA U5" },
    { q: "Emma ___ play computer games on weekdays.", opts: ["don't", "doesn't", "isn't"], ans: 1, hint: "Emma → doesn't", sentence: "Emma doesn't play computer games on weekdays.", zh: "艾玛工作日不玩电脑游戏。", source: "升学真题" },
    { q: "These bottles ___ made of glass.", opts: ["don't", "doesn't", "aren't"], ans: 2, hint: "These bottles = 复数 be 否定", sentence: "These bottles aren't made of glass.", zh: "这些瓶子不是玻璃做的。", source: "5GA U2" },
    { q: "Mr Wang ___ teach maths on Fridays.", opts: ["don't", "doesn't", "isn't"], ans: 1, hint: "Mr Wang → doesn't", sentence: "Mr Wang doesn't teach maths on Fridays.", zh: "王老师周五不教数学。", source: "5GA U4" }
  ];

  var Q_MIX = Q_BE.concat(Q_3S, Q_NEG, [
    { q: "___ Emma play badminton with Jack after school?", opts: ["Do", "Does", "Is"], ans: 1, hint: "Emma = She → Does", sentence: "Does Emma play badminton with Jack after school?", zh: "艾玛放学后和杰克打羽毛球吗？", source: "七上 U1" },
    { q: "___ the school library open on weekends?", opts: ["Do", "Does", "Is"], ans: 1, hint: "The school library → Does ... open", sentence: "Does the school library open on weekends?", zh: "学校图书馆周末开放吗？", source: "升学真题" },
    { q: "We ___ English and science at school.", opts: ["study", "studies", "studying"], ans: 0, hint: "We → 原形", sentence: "We study English and science at school.", zh: "我们在学校学英语和科学。", source: "5GA U4" },
    { q: "___ these keys on the teacher's desk?", opts: ["Do", "Does", "Are"], ans: 2, hint: "These keys → Are", sentence: "Are these keys on the teacher's desk?", zh: "这些钥匙在讲台上吗？", source: "七上 U2" },
    { q: "___ you save pocket money every week?", opts: ["Do", "Does", "Are"], ans: 0, hint: "You → Do", sentence: "Do you save pocket money every week?", zh: "你每周存零花钱吗？", source: "6GA U1" },
    { q: "The cap ___ under Tom's chair.", opts: ["am", "is", "are"], ans: 1, hint: "The cap = 单数 → is", sentence: "The cap is under Tom's chair.", zh: "帽子在汤姆椅子下面。", source: "七上 U2" },
    { q: "Han Lin ___ table tennis three times a week.", opts: ["play", "plays", "playing"], ans: 1, hint: "Han Lin → plays", sentence: "Han Lin plays table tennis three times a week.", zh: "韩琳每周打三次乒乓球。", source: "七上 U1" },
    { q: "___ they students at this school?", opts: ["Do", "Does", "Are"], ans: 2, hint: "be 动词疑问句", sentence: "Are they students at this school?", zh: "他们是这所学校的学生吗？", source: "Starter U1" }
  ]);

  var MATCH_PAIRS = [
    { en: "Teng Fei plays basketball after school.", zh: "腾飞放学后打篮球。" },
    { en: "The school library is very big.", zh: "学校图书馆很大。" },
    { en: "Chen Tao washes his hands before lunch.", zh: "陈涛午饭前洗手。" },
    { en: "The train leaves at nine every morning.", zh: "火车每天早上九点出发。" },
    { en: "Lily saves half of her pocket money.", zh: "莉莉存一半零花钱。" },
    { en: "The dining hall is across from the sports field.", zh: "食堂在运动场对面。" },
    { en: "Mr Wang teaches science every Monday.", zh: "王老师每周一教科学。" },
    { en: "Don't waste food in the dining hall.", zh: "不要在食堂浪费食物。" },
    { en: "Does Emma play badminton after school?", zh: "艾玛放学后打羽毛球吗？" },
    { en: "Chengdu is famous for its pandas.", zh: "成都以大熊猫闻名。" },
    { en: "The shopkeeper helps me find the right size.", zh: "店主帮我找合适尺码。" },
    { en: "Linda doesn't watch TV on school days.", zh: "琳达上学日不看电视。" }
  ];

  var LISTEN_PICK = [
    { audio: "The school library is very big and quiet.", opts: ["The school library is very big and quiet.", "The school library are very big.", "The sports field is very big and quiet."], ans: 0, zh: "学校图书馆又大又安静。" },
    { audio: "Teng Fei plays basketball with his classmates.", opts: ["Teng Fei plays basketball with his classmates.", "Teng Fei play basketball with his classmates.", "Emma plays basketball with her classmates."], ans: 0, zh: "腾飞和同学打篮球。" },
    { audio: "Does Emma play badminton with Jack after school?", opts: ["Do Emma play badminton with Jack?", "Does Emma play badminton with Jack after school?", "Does Jack play football after school?"], ans: 1, zh: "艾玛放学后和杰克打羽毛球吗？" },
    { audio: "The train leaves the station at nine every morning.", opts: ["The train leave the station at nine.", "The train leaves the station at nine every morning.", "The bus leaves the station at nine."], ans: 1, zh: "火车每天早上九点驶离车站。" },
    { audio: "Linda doesn't watch TV at night on school days.", opts: ["Linda don't watch TV at night.", "Linda doesn't watch TV at night on school days.", "Linda watches TV every night."], ans: 1, zh: "上学日琳达晚上不看电视。" },
    { audio: "The shopkeeper helps me find the right size.", opts: ["The shopkeeper help me find the right size.", "The shopkeeper helps me find the right size.", "The shopkeeper helps me find the wrong size."], ans: 1, zh: "店主帮我找到合适尺码。" },
    { audio: "Chen Tao is from Chengdu, Sichuan.", opts: ["Chen Tao are from Chengdu.", "Chen Tao is from Beijing.", "Chen Tao is from Chengdu, Sichuan."], ans: 2, zh: "陈涛来自四川成都。" },
    { audio: "Don't waste food; take only what you can eat.", opts: ["Don't waste food; take only what you can eat.", "Don't waste water in the library.", "Doesn't waste food in the dining hall."], ans: 0, zh: "不要浪费食物。" },
    { audio: "Mr Wang teaches science in our classroom.", opts: ["Mr Wang teach science in our classroom.", "Mr Wang teaches science in our classroom.", "Miss Li teaches science in our classroom."], ans: 1, zh: "王老师在我们教室教科学。" },
    { audio: "Are these keys on the teacher's desk?", opts: ["Is these keys on the teacher's desk?", "Are these keys on the teacher's desk?", "Are this key on the teacher's desk?"], ans: 1, zh: "这些钥匙在讲台上吗？" }
  ];

  global.L01pCorpus = {
    names: NAMES,
    places: PLACES,
    things: THINGS,
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
