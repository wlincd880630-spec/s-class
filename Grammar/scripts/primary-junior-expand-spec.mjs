/** 小学 KP/L04–L12 课：按初中教学路径拓展的语料规格 */
function Q(q, opts, ans, hint, sentence, zh) {
  return { q, opts, ans, hint, sentence, zh };
}
function P(en, zh) {
  return { en, zh };
}
function S(mark, label, example) {
  return { mark, label, example };
}
function step(label, opts, ans, hint, sentence, zh) {
  return { label, opts, ans, hint, sentence, zh };
}

export const SPECS = {
  "L04-小学比较级": {
    pNum: "P14",
    title: "比较级 + than",
    badge: "小学 · 对齐初中 08",
    juniorHref: "../L07/index.html",
    juniorLabel: "初中 · 比较级与最高级",
    juniorNote: "小学先掌握短形容词 -er + than；初中再学 more、最高级、不规则比较与程度副词。",
    intro: "19 页互动课件，教学路径对齐初中：声音导入 → 构成公式 → 拼写规则 → 易错辨析 → 句型转换 → 综合测试。",
    features: ["📐 构成公式", "✏️ -er 拼写", "🔄 句型转换", "📝 综合测试", "⏱ 限时挑战", "🎧 听音"],
    formula: {
      lead: "比较两个人或物时，用「比较级 + than」。",
      formula: "A is + 比较级 + than + B",
      parts: [
        S("A", "比较对象 1", "The dinosaur"),
        S("-er", "形容词比较级", "bigger"),
        S("than", "比较词", "than"),
        S("B", "比较对象 2", "the rabbit"),
      ],
      samples: [
        { sentence: "The dinosaur is bigger than the rabbit.", zh: "恐龙比兔子大。" },
        { sentence: "Tom is taller than Jack.", zh: "汤姆比杰克高。" },
      ],
    },
    scenes: [
      { title: "例句 · 谁更年轻", lead: "young → younger，直接加 -er。", sentence: "My father is younger than my mother.", zh: "我爸爸比我妈妈年轻。" },
      { title: "例句 · 谁更重", lead: "heavy → heavier：辅音 + y 变 i 再加 -er。", sentence: "Chen Jie is heavier than Amy.", zh: "陈洁比艾米重。" },
    ],
    trap: {
      question: "「This book is more cheaper than that one.」错在哪里？",
      choices: [
        { text: "cheap 是短词，应说 cheaper，不能再加 more", correct: true, fb: "对了！短形容词用 -er，不要 more cheaper。" },
        { text: "than 应该改成 as", correct: false, fb: "比较两者仍用 than。" },
        { text: "book 要改成 books", correct: false, fb: "主语单复数不是这句的错点。" },
      ],
      sentence: "This book is cheaper than that one.",
      zh: "这本书比那本便宜。",
    },
    transform: {
      lead: "把原级句改成比较句：加上比较级和 than。",
      items: [
        {
          from: "Tom is tall.",
          fromZh: "汤姆很高。",
          steps: [step("改成：汤姆比杰克高", ["Tom is taller than Jack.", "Tom is tall than Jack.", "Tom is more tall than Jack."], 0, "tall → taller + than。", "Tom is taller than Jack.", "汤姆比杰克高。")],
        },
        {
          from: "The box is big.",
          fromZh: "这个盒子很大。",
          steps: [step("改成：这个盒子比袋子大（注意双写）", ["The box is bigger than the bag.", "The box is biger than the bag.", "The box is more big than the bag."], 0, "big → bigger。", "The box is bigger than the bag.", "这个盒子比袋子大。")],
        },
      ],
    },
    extraQs: [
      Q("Tom is _____ Jack.", ["taller", "taller than", "more taller"], 1, "比较级后面要跟 than。", "Tom is taller than Jack.", "汤姆比杰克高。"),
      Q("This bag is _____ than that one.", ["heavy", "heavier", "heaviest"], 1, "两者比较用比较级 heavier。", "This bag is heavier than that one.", "这个包比那个重。"),
      Q("Summer in Chengdu is _____ than spring.", ["hotter", "more hot", "hottest"], 0, "hot → hotter。", "Summer in Chengdu is hotter than spring.", "成都的夏天比春天热。"),
      Q("Emma reads _____ than Tom.", ["careful", "more carefully", "most careful"], 1, "副词比较常用 more + 副词。", "Emma reads more carefully than Tom.", "艾玛读书比汤姆更仔细。"),
      Q("Which is _____, a cat or a dinosaur?", ["big", "bigger", "biggest"], 1, "两者之间选哪一个更……用比较级。", "Which is bigger, a cat or a dinosaur?", "猫和恐龙哪个更大？"),
    ],
    pairs: [
      P("bigger than", "比……更大"),
      P("taller than", "比……更高"),
      P("heavier than", "比……更重"),
      P("cheaper than", "比……更便宜"),
    ],
    distractors: ["The dinosaur is big the rabbit.", "The dinosaur was bigger yesterday."],
    extraChecklist: ["易错：不要 more cheaper；短词只用 -er。", "两者比较用比较级，三者以上才用最高级。"],
  },

  "L05-小学最高级": {
    pNum: "P15",
    title: "最高级 · the + -est",
    badge: "小学 · 对齐初中 08",
    juniorHref: "../L07/index.html",
    juniorLabel: "初中 · 比较级与最高级",
    juniorNote: "小学先掌握 the + 最高级 与 one of the most；初中再学不规则与程度副词。",
    intro: "19 页互动课件：导入 → 公式 → 比较级对比 → 拼写 → 转换 → 综测，对齐初中比较等级教学。",
    features: ["📐 the + 最高级", "🏖 one of the most", "🔄 句型转换", "📝 综合测试"],
    formula: {
      lead: "三者以上、有范围时，用最高级。",
      formula: "the + 最高级 + in / of + 范围",
      parts: [
        S("the", "定冠词", "the"),
        S("-est", "最高级", "tallest"),
        S("in/of", "范围", "in our class"),
      ],
      samples: [
        { sentence: "Tom is the tallest boy in our class.", zh: "汤姆是我们班最高的男孩。" },
        { sentence: "Yalong Bay is one of the most beautiful beaches in China.", zh: "亚龙湾是中国最美海滩之一。" },
      ],
    },
    scenes: [
      { title: "例句 · 班上最高", lead: "in our class 给出比较范围。", sentence: "Tom is the tallest boy in our class.", zh: "汤姆是我们班最高的男孩。" },
      { title: "例句 · 最美之一", lead: "one of the most + 形容词 + 复数名词。", sentence: "Yalong Bay is one of the most beautiful beaches in China.", zh: "亚龙湾是中国最美海滩之一。" },
    ],
    trap: {
      question: "「Chengdu is one of the most liveable city in China.」错在哪？",
      choices: [
        { text: "one of 后面的名词要用复数 cities", correct: true, fb: "对了！one of the most + 形容词 + 复数名词。" },
        { text: "liveable 要改成 more liveable", correct: false, fb: "这里已经是最高级 most liveable。" },
        { text: "不能用 the", correct: false, fb: "最高级前面通常要 the。" },
      ],
      sentence: "Chengdu is one of the most liveable cities in China.",
      zh: "成都是中国最宜居的城市之一。",
    },
    transform: {
      lead: "把比较级句改成最高级：加上 the，并给出范围。",
      items: [
        {
          from: "Tom is taller than Jack.",
          fromZh: "汤姆比杰克高。",
          steps: [step("班上最高怎么说？", ["Tom is the tallest boy in our class.", "Tom is tallest boy in our class.", "Tom is the taller boy in our class."], 0, "最高级：the tallest + in 范围。", "Tom is the tallest boy in our class.", "汤姆是我们班最高的男孩。")],
        },
      ],
    },
    extraQs: [
      Q("This is _____ book in the library.", ["the most interesting", "more interesting", "interesting"], 0, "范围内最……用 the most + 长形容词。", "This is the most interesting book in the library.", "这是图书馆里最有趣的书。"),
      Q("Winter is _____ season of the year.", ["colder", "the coldest", "coldest"], 1, "of the year 是范围，用 the coldest。", "Winter is the coldest season of the year.", "冬天是一年中最冷的季节。"),
      Q("She is one of _____ students in Grade Six.", ["the best", "better", "good"], 0, "one of the + 最高级 + 复数。", "She is one of the best students in Grade Six.", "她是六年级最优秀的学生之一。"),
      Q("Mount Qomolangma is _____ mountain in the world.", ["higher", "the highest", "more high"], 1, "the highest + in the world。", "Mount Qomolangma is the highest mountain in the world.", "珠穆朗玛峰是世界上最高的山。"),
      Q("Which is _____, spring, summer or winter?", ["hot", "hotter", "the hottest"], 2, "三者选最……用最高级。", "Which is the hottest, spring, summer or winter?", "春夏冬哪个最热？"),
    ],
    pairs: [
      P("the tallest", "最高的"),
      P("the most beautiful", "最美的"),
      P("one of the most", "最……之一"),
      P("in our class", "在我们班（范围）"),
    ],
    distractors: ["Tom is taller boy in our class.", "Tom is the taller than Jack."],
    extraChecklist: ["one of the most 后面必须是复数名词。", "两者比较仍用比较级 + than，不要混用最高级。"],
  },

  "L06-小学名词复数": {
    pNum: "P07",
    title: "名词不规则复数",
    badge: "小学 · 对齐初中 06",
    juniorHref: "../L05/index.html",
    juniorLabel: "初中 · 名词所有格与 There be",
    juniorNote: "小学记牢 children / feet / mice；规则复数见专项课。初中在名词模块中综合运用。",
    intro: "19 页：导入 → 公式 → 规则/不规则对比 → 转换 → 综测。",
    features: ["👶 children", "👣 feet", "🐭 mice", "📝 综合测试"],
    formula: {
      lead: "可数名词表示两个及以上时要用复数。不规则复数必须单独记。",
      formula: "1 child → 2 children　（不是 childs）",
      parts: [
        S("规则", "+s / +es / y→ies", "books / boxes / libraries"),
        S("不规则", "改变元音或词形", "man→men, foot→feet"),
      ],
      samples: [
        { sentence: "There are two libraries in our school.", zh: "我们学校有两座图书馆。" },
        { sentence: "Three children played in the park.", zh: "三个孩子在公园里玩。" },
      ],
    },
    scenes: [
      { title: "例句 · 图书馆", lead: "library → libraries（辅音 + y 变 ies）。", sentence: "There are two libraries in our school.", zh: "我们学校有两座图书馆。" },
      { title: "例句 · 脚很累", lead: "foot → feet，不是 foots。", sentence: "My feet are tired after the long walk.", zh: "走了很长的路，我的脚很累。" },
    ],
    trap: {
      question: "「There are many childs in the playground.」应改成？",
      choices: [
        { text: "children", correct: true, fb: "child 的复数是 children。" },
        { text: "childes", correct: false, fb: "没有 childes 这种形式。" },
        { text: "child", correct: false, fb: "many 后面要用复数。" },
      ],
      sentence: "There are many children in the playground.",
      zh: "操场上有许多孩子。",
    },
    transform: {
      lead: "把单数名词改成复数，注意不规则变化。",
      items: [
        {
          from: "I have one mouse.",
          fromZh: "我有一只老鼠。",
          steps: [step("改成两只老鼠", ["I have two mice.", "I have two mouses.", "I have two mouse."], 0, "mouse → mice。", "I have two mice.", "我有两只老鼠。")],
        },
        {
          from: "This man is a teacher.",
          fromZh: "这个男人是老师。",
          steps: [step("改成这些男人是老师", ["These men are teachers.", "These mans are teachers.", "These man are teachers."], 0, "man → men。", "These men are teachers.", "这些男人是老师。")],
        },
      ],
    },
    extraQs: [
      Q("Two _____ are under the desk. (foot)", ["foot", "foots", "feet"], 2, "foot → feet。", "Two feet are under the desk.", "两只脚在桌子下面。"),
      Q("The _____ are playing football. (child)", ["child", "children", "childs"], 1, "child → children。", "The children are playing football.", "孩子们在踢足球。"),
      Q("I saw three _____ in the kitchen. (mouse)", ["mouse", "mouses", "mice"], 2, "mouse → mice。", "I saw three mice in the kitchen.", "我在厨房看到三只老鼠。"),
      Q("Those _____ are doctors. (woman)", ["woman", "womans", "women"], 2, "woman → women。", "Those women are doctors.", "那些女士是医生。"),
      Q("There are many _____ on the farm. (sheep)", ["sheep", "sheeps", "sheepes"], 0, "sheep 单复数同形。", "There are many sheep on the farm.", "农场里有许多羊。"),
    ],
    pairs: [
      P("children", "孩子们"),
      P("feet", "脚（复数）"),
      P("mice", "老鼠（复数）"),
      P("libraries", "图书馆（复数）"),
    ],
    distractors: ["My foots are tired after the walk.", "My foot are tired after the long walk."],
    extraChecklist: ["不规则必背：child→children, foot→feet, mouse→mice, man→men, sheep→sheep。"],
  },

  "L07-小学There-be": {
    pNum: "P10",
    title: "There be 句型",
    badge: "小学 · 对齐初中 06",
    juniorHref: "../L05/index.html",
    juniorLabel: "初中 · 名词所有格 · There be",
    juniorNote: "小学先掌握 There is/are 与就近原则；初中再结合方位介词与名词所有格。",
    intro: "19 页：存在句公式、is/are 配对、否定疑问转换、综合测试。",
    features: ["📍 There is/are", "🔢 就近原则", "🔄 否定与疑问", "📝 综合测试"],
    formula: {
      lead: "There be 用来表示「某地有某物」，不是「某人拥有」。",
      formula: "There is / are + 名词 + 地点",
      parts: [
        S("There", "引导词", "There"),
        S("is/are", "就近一致", "is a book / are two books"),
        S("地点", "在哪里", "on the desk"),
      ],
      samples: [
        { sentence: "There is a new library near our school.", zh: "我们学校附近有一座新图书馆。" },
        { sentence: "There are so many people in the shopping centre.", zh: "购物中心里有好多人。" },
      ],
    },
    scenes: [
      { title: "例句 · 单数用 is", lead: "a new library 是单数 → There is。", sentence: "There is a new library near our school.", zh: "我们学校附近有一座新图书馆。" },
      { title: "例句 · 复数用 are", lead: "so many people 是复数 → There are。", sentence: "There are so many people in the shopping centre.", zh: "购物中心里有好多人。" },
    ],
    trap: {
      question: "「There have many books on the desk.」错在哪？",
      choices: [
        { text: "存在句用 There is/are，不用 have", correct: true, fb: "对了！have 表示「某人拥有」，存在用 There be。" },
        { text: "desk 要改成 desks", correct: false, fb: "地点名词不一定变复数。" },
        { text: "many 要改成 much", correct: false, fb: "books 可数，many 是对的。" },
      ],
      sentence: "There are many books on the desk.",
      zh: "桌子上有许多书。",
    },
    transform: {
      lead: "There be：否定加 not，疑问把 is/are 提前。",
      items: [
        {
          from: "There is a park near my home.",
          fromZh: "我家附近有一个公园。",
          steps: [
            step("改成否定句", ["There isn't a park near my home.", "There not is a park near my home.", "There doesn't a park near my home."], 0, "is not / isn't。", "There isn't a park near my home.", "我家附近没有公园。"),
            step("改成一般疑问句", ["Is there a park near your home?", "Does there a park near your home?", "There is a park near your home?"], 0, "把 is 提前：Is there…?。", "Is there a park near your home?", "你家附近有公园吗？"),
          ],
        },
      ],
    },
    extraQs: [
      Q("There _____ a cat and two dogs in the garden. （就近）", ["is", "are", "be"], 0, "靠近 be 的是 a cat（单数）→ is。", "There is a cat and two dogs in the garden.", "花园里有一只猫和两只狗。"),
      Q("_____ there any milk in the fridge?", ["Is", "Are", "Do"], 0, "milk 不可数 → Is there。", "Is there any milk in the fridge?", "冰箱里有牛奶吗？"),
      Q("There _____ any students in the classroom.", ["isn't", "aren't", "don't"], 1, "students 复数 → aren't。", "There aren't any students in the classroom.", "教室里没有学生。"),
      Q("There is _____ orange on the plate.", ["a", "an", "the"], 1, "orange 以元音音素开头 → an。", "There is an orange on the plate.", "盘子上有一个橙子。"),
      Q("_____ a lot of rain in Chengdu in summer.", ["It has", "There is", "There are"], 1, "rain 不可数，存在句 There is。", "There is a lot of rain in Chengdu in summer.", "成都夏天雨水很多。"),
    ],
    pairs: [
      P("There is", "有（单数/不可数）"),
      P("There are", "有（复数）"),
      P("Is there…?", "有没有……？"),
      P("There aren't any", "没有任何（复数）"),
    ],
    distractors: ["There have so many people in the shopping centre.", "There is so many people in the shopping centre."],
    extraChecklist: ["不要写成 There have。", "就近原则：There is a book and two pens."],
  },

  "L08-小学冠词": {
    pNum: "P09",
    title: "冠词 a / an / the",
    badge: "小学 · 中考高频",
    juniorHref: "../L01/index.html",
    juniorLabel: "初中 · 一般现在时（含 play the）",
    juniorNote: "小学先分清泛指 a/an 与特指 the；中考每年必考，初中语篇中继续运用。",
    intro: "19 页：音素决定 a/an、再次提及用 the、乐器与独一无二，路径对齐初中精讲+综测。",
    features: ["🔤 a / an", "🎯 the 特指", "🎹 play the piano", "📝 综合测试"],
    formula: {
      lead: "a/an 表泛指「一个」；the 表特指「那个已知的」。",
      formula: "a + 辅音音素　/　an + 元音音素　/　the + 特指",
      parts: [
        S("a", "辅音音素", "a cat / a university"),
        S("an", "元音音素", "an apple / an hour"),
        S("the", "特指或独一无二", "the sun / the cat（再次提及）"),
      ],
      samples: [
        { sentence: "I saw a cat. The cat was very cute.", zh: "我看见一只猫。那只猫很可爱。" },
        { sentence: "My father is an honest man.", zh: "我爸爸是个诚实的人。" },
      ],
    },
    scenes: [
      { title: "例句 · an honest", lead: "honest 的 h 不发音，以元音音素开头 → an。", sentence: "My father is an honest man.", zh: "我爸爸是个诚实的人。" },
      { title: "例句 · 再次提及", lead: "第一次 a cat，第二次 the cat。", sentence: "I saw a cat. The cat was very cute.", zh: "我看见一只猫。那只猫很可爱。" },
    ],
    trap: {
      question: "「She is a university student.」为什么用 a 不用 an？",
      choices: [
        { text: "university 以辅音音素 /j/ 开头", correct: true, fb: "对了！看音素不看字母。u 发 /j/ 时用 a。" },
        { text: "university 是专有名词", correct: false, fb: "这是普通名词。" },
        { text: "student 是单数所以用 a", correct: false, fb: "关键在 university 的发音。" },
      ],
      sentence: "She is a university student.",
      zh: "她是一名大学生。",
    },
    transform: {
      lead: "第一次出现用 a/an，再次出现改成 the。",
      items: [
        {
          from: "I bought pen yesterday.",
          fromZh: "我昨天买了钢笔。（缺冠词）",
          steps: [
            step("补上第一次提及的冠词", ["I bought a pen yesterday.", "I bought an pen yesterday.", "I bought the pens yesterday."], 0, "pen 辅音开头 → a pen。", "I bought a pen yesterday.", "我昨天买了一支钢笔。"),
            step("第二句：这支钢笔很好写", ["The pen writes well.", "A pen writes well.", "An pen writes well."], 0, "再次提及用 the。", "The pen writes well.", "这支钢笔很好写。"),
          ],
        },
      ],
    },
    extraQs: [
      Q("I have _____ useful book.", ["a", "an", "the"], 0, "useful 以辅音 /j/ 开头 → a。", "I have a useful book.", "我有一本有用的书。"),
      Q("_____ sun rises in the east.", ["A", "An", "The"], 2, "独一无二的天体用 the。", "The sun rises in the east.", "太阳从东方升起。"),
      Q("He plays _____ piano every day.", ["a", "an", "the"], 2, "乐器前用 the。", "He plays the piano every day.", "他每天弹钢琴。"),
      Q("It took me _____ hour to finish it.", ["a", "an", "the"], 1, "hour 的 h 不发音 → an hour。", "It took me an hour to finish it.", "我花了一小时做完。"),
      Q("There is _____ apple on _____ table.", ["a; the", "an; the", "an; a"], 1, "apple 用 an；双方都知道的桌子用 the。", "There is an apple on the table.", "桌子上有一个苹果。"),
    ],
    pairs: [
      P("a cat", "一只猫（辅音）"),
      P("an hour", "一小时（h 不发音）"),
      P("the sun", "太阳（独一无二）"),
      P("the piano", "钢琴（乐器）"),
    ],
    distractors: ["I saw an cat. The cat was very cute.", "I saw a cat. A cat was very cute."],
    extraChecklist: ["看音素不看字母：hour/honest 用 an；university/useful 用 a。", "乐器、世上独一无二：the piano, the moon。"],
  },

  "L09-可数不可数": {
    pNum: "P08",
    title: "可数与不可数名词",
    badge: "小学 · 对齐初中名词模块",
    juniorHref: "../L05/index.html",
    juniorLabel: "初中 · 名词模块",
    juniorNote: "小学分清 many/much、a few/a little；初中在短文填空中继续考。",
    intro: "19 页：可数/不可数公式、计量短语、限定词搭配、综测。",
    features: ["🔢 many / few", "💧 much / little", "🥤 a bottle of", "📝 综合测试"],
    formula: {
      lead: "可数名词能数个数；不可数名词要用计量短语。",
      formula: "many / a few + 复数　　much / a little + 不可数",
      parts: [
        S("可数", "有复数", "apples / books"),
        S("不可数", "无复数", "water / homework"),
        S("计量", "量词 + of", "a bottle of water"),
      ],
      samples: [
        { sentence: "How much water do you drink every day?", zh: "你每天喝多少水？" },
        { sentence: "I don't have much homework today.", zh: "我今天作业不多。" },
      ],
    },
    scenes: [
      { title: "例句 · How much water", lead: "water 不可数 → How much。", sentence: "How much water do you drink every day?", zh: "你每天喝多少水？" },
      { title: "例句 · 两杯茶", lead: "不可数可用计量：two cups of tea。", sentence: "I would like two cups of tea.", zh: "我想要两杯茶。" },
    ],
    trap: {
      question: "「I have many homeworks today.」应改成？",
      choices: [
        { text: "much homework（homework 不可数）", correct: true, fb: "homework 没有复数。" },
        { text: "many homework", correct: false, fb: "many 要加可数复数。" },
        { text: "a few homeworks", correct: false, fb: "不能加 s。" },
      ],
      sentence: "I have much homework today.",
      zh: "我今天有很多作业。",
    },
    transform: {
      lead: "把可数句的 many 改成不可数搭配 much。",
      items: [
        {
          from: "I have many apples.",
          fromZh: "我有许多苹果。",
          steps: [step("如果是水，怎么说「许多」？", ["I have much water.", "I have many water.", "I have a few water."], 0, "water 不可数 → much water。", "I have much water.", "我有很多水。")],
        },
      ],
    },
    extraQs: [
      Q("There isn't _____ milk in the fridge.", ["many", "much", "few"], 1, "milk 不可数 → much。", "There isn't much milk in the fridge.", "冰箱里牛奶不多。"),
      Q("How _____ books do you have?", ["much", "many", "little"], 1, "books 可数 → many。", "How many books do you have?", "你有多少本书？"),
      Q("I'd like _____ bread, please.", ["a", "an", "some"], 2, "bread 不可数，用 some。", "I'd like some bread, please.", "请给我一些面包。"),
      Q("There are _____ students in the hall.", ["much", "a little", "many"], 2, "students 可数复数 → many。", "There are many students in the hall.", "大厅里有许多学生。"),
      Q("Please give me _____ of water.", ["a bottle", "many", "few"], 0, "计量短语 a bottle of water。", "Please give me a bottle of water.", "请给我一瓶水。"),
    ],
    pairs: [
      P("many books", "许多书（可数）"),
      P("much water", "许多水（不可数）"),
      P("a cup of tea", "一杯茶"),
      P("How much…?", "多少（不可数）"),
    ],
    distractors: ["I don't have many homework today.", "I don't have much homeworks today."],
    extraChecklist: ["advice / information / news / homework 都不可数。", "计量：a piece of news, two bottles of milk。"],
  },

  "L10-祈使句": {
    pNum: "P18",
    title: "祈使句",
    badge: "小学 · 课堂指令",
    juniorHref: "../L11/index.html",
    juniorLabel: "初中 · 状语从句 / 写作指令",
    juniorNote: "小学掌握动词原形开头与 Don't；初中写作图表题常用祈使句给建议。",
    intro: "19 页：祈使句公式、Please 礼貌、Don't 否定、Please be 句、综测。",
    features: ["👉 动词原形", "🚫 Don't", "🙏 Please", "📝 综合测试"],
    formula: {
      lead: "祈使句用来发出指令、请求或建议，常常省略主语 you。",
      formula: "(Please) + 动词原形 …　/　Don't + 动词原形 …",
      parts: [
        S("肯定", "原形开头", "Sit down. / Please be quiet."),
        S("否定", "Don't + 原形", "Don't run."),
      ],
      samples: [
        { sentence: "Don't run in the hallway.", zh: "不要在走廊里跑。" },
        { sentence: "Please be quiet in the library.", zh: "请在图书馆保持安静。" },
      ],
    },
    scenes: [
      { title: "例句 · 否定指令", lead: "Don't + 原形，不是 Doesn't。", sentence: "Don't run in the hallway.", zh: "不要在走廊里跑。" },
      { title: "例句 · Please be", lead: "be 也是动词原形：Please be quiet。", sentence: "Please be quiet in the library.", zh: "请在图书馆保持安静。" },
    ],
    trap: {
      question: "「Doesn't forget to bring your PE kit.」应改成？",
      choices: [
        { text: "Don't forget…（祈使句否定用 Don't）", correct: true, fb: "祈使句没有主语，不能用 Doesn't。" },
        { text: "Not forget…", correct: false, fb: "要用 Don't。" },
        { text: "Didn't forget…", correct: false, fb: "这不是过去时叙述。" },
      ],
      sentence: "Don't forget to bring your PE kit.",
      zh: "别忘了带体育课用品。",
    },
    transform: {
      lead: "把肯定祈使句改成 Don't 否定。",
      items: [
        {
          from: "Open the window.",
          fromZh: "打开窗户。",
          steps: [step("改成否定", ["Don't open the window.", "Doesn't open the window.", "Not open the window."], 0, "Don't + 原形。", "Don't open the window.", "不要开窗。")],
        },
      ],
    },
    extraQs: [
      Q("_____ your homework before dinner.", ["Does", "Do", "Doing"], 1, "祈使句用原形 Do。", "Do your homework before dinner.", "晚饭前做作业。"),
      Q("Please _____ late for class.", ["not be", "don't be", "doesn't be"], 1, "Please don't be late. 或 Don't be late.", "Please don't be late for class.", "请不要上课迟到。"),
      Q("_____ careful when you cross the street.", ["Be", "Is", "Are"], 0, "祈使句用 Be。", "Be careful when you cross the street.", "过马路时要小心。"),
      Q("_____ talk loudly in the museum.", ["Don't", "Doesn't", "Not"], 0, "Don't + 原形。", "Don't talk loudly in the museum.", "不要在博物馆大声说话。"),
      Q("Let’s _____ a rest.", ["have", "has", "having"], 0, "Let's + 原形。", "Let's have a rest.", "我们休息一下吧。"),
    ],
    pairs: [
      P("Sit down.", "坐下。"),
      P("Don't run.", "不要跑。"),
      P("Please be quiet.", "请安静。"),
      P("Let's go.", "我们走吧。"),
    ],
    distractors: ["Doesn't run in the hallway.", "Not run in the hallway."],
    extraChecklist: ["Let's + 原形：Let's play basketball.", "Be 型祈使句：Be quiet. / Don't be late."],
  },

  "L11-一般将来时": {
    pNum: "P04",
    title: "一般将来时 will",
    badge: "小学 · 对齐初中 09",
    juniorHref: "../L08/index.html",
    juniorLabel: "初中 · 将来时与条件句",
    juniorNote: "小学先掌握 will + 原形与标志词；初中再学 be going to 与条件句。",
    intro: "19 页：will 公式、will be、标志词、否定 won't、疑问 Will you、综测。",
    features: ["⏭ will + 原形", "🌤 will be", "📅 next / tomorrow", "📝 综合测试"],
    formula: {
      lead: "将来要发生的事：will + 动词原形；状态用 will be。",
      formula: "主语 + will + 动词原形　/　will be + 形容词",
      parts: [
        S("will", "所有人称相同", "I/He/They will"),
        S("原形", "不加 -s", "go / have / visit"),
        S("标志", "tomorrow / next…", "next Monday"),
      ],
      samples: [
        { sentence: "It will be sunny and warm next Monday.", zh: "下周一将会晴朗温暖。" },
        { sentence: "We will have a school trip next month.", zh: "下个月我们有学校郊游。" },
      ],
    },
    scenes: [
      { title: "例句 · will be", lead: "天气/状态：will be + 形容词。", sentence: "It will be sunny and warm next Monday.", zh: "下周一将会晴朗温暖。" },
      { title: "例句 · will + 原形", lead: "所有人称都用 will，动词不加 s。", sentence: "She will visit Beijing next year.", zh: "她明年将去北京。" },
    ],
    trap: {
      question: "「She wills go to school tomorrow.」错在哪？",
      choices: [
        { text: "will 没有第三人称 -s，动词用原形 go", correct: true, fb: "will 对所有人称都一样。" },
        { text: "tomorrow 要改成 yesterday", correct: false, fb: "tomorrow 正是将来标志。" },
        { text: "要用 going", correct: false, fb: "will 后接原形，不是 -ing。" },
      ],
      sentence: "She will go to school tomorrow.",
      zh: "她明天将去上学。",
    },
    transform: {
      lead: "will 否定：will not / won't；疑问：Will + 主语 + 原形？",
      items: [
        {
          from: "They will have a test tomorrow.",
          fromZh: "他们明天将有考试。",
          steps: [
            step("改成否定", ["They won't have a test tomorrow.", "They don't will have a test tomorrow.", "They will not has a test tomorrow."], 0, "won't + 原形。", "They won't have a test tomorrow.", "他们明天将没有考试。"),
            step("改成一般疑问", ["Will they have a test tomorrow?", "Do they will have a test tomorrow?", "Will they has a test tomorrow?"], 0, "Will + 主语 + 原形？", "Will they have a test tomorrow?", "他们明天有考试吗？"),
          ],
        },
      ],
    },
    extraQs: [
      Q("I _____ thirteen next year.", ["am", "will be", "was"], 1, "next year → will be。", "I will be thirteen next year.", "我明年就十三岁了。"),
      Q("_____ you come to my party?", ["Do", "Will", "Are"], 1, "将来邀请用 Will you…?", "Will you come to my party?", "你会来我的聚会吗？"),
      Q("He _____ football tomorrow. （否定）", ["won't play", "doesn't play", "isn't play"], 0, "将来否定 won't + 原形。", "He won't play football tomorrow.", "他明天不踢足球。"),
      Q("Look at the clouds. It _____ soon.", ["rains", "will rain", "rained"], 1, "soon 将来标志。", "It will rain soon.", "很快就要下雨了。"),
      Q("We _____ to the museum next Friday.", ["go", "goes", "will go"], 2, "next Friday → will go。", "We will go to the museum next Friday.", "下周五我们去博物馆。"),
    ],
    pairs: [
      P("will go", "将要去"),
      P("will be sunny", "将会晴朗"),
      P("won't", "将不"),
      P("next week", "下周（标志词）"),
    ],
    distractors: ["It is sunny and warm next Monday.", "It was sunny and warm next Monday."],
    extraChecklist: ["be going to 表示已有打算，初中第 09 讲再展开。", "条件句 If it rains, we will stay. 也在初中学习。"],
  },

  "L12-感叹句": {
    pNum: "P19",
    title: "感叹句 What / How",
    badge: "小学 · 写作常用",
    juniorHref: "../L07/index.html",
    juniorLabel: "初中 · 形容词与写作",
    juniorNote: "小学分清 What a/an 与 How；初中写作开头/结尾常用感叹。",
    intro: "19 页：What / How 公式、可数不可数、转换、综测。",
    features: ["❗ What a/an", "✨ How + 形", "🔄 句型转换", "📝 综合测试"],
    formula: {
      lead: "What 后面跟名词；How 后面跟形容词或副词。",
      formula: "What a/an + 形 + 名！　/　How + 形/副 (+ 主谓)！",
      parts: [
        S("What a", "可数单数", "What a beautiful day!"),
        S("What", "不可数/复数", "What nice weather!"),
        S("How", "形/副词", "How beautiful!"),
      ],
      samples: [
        { sentence: "What a beautiful day it is!", zh: "多么美好的一天啊！" },
        { sentence: "How interesting the story is!", zh: "这个故事多有趣啊！" },
      ],
    },
    scenes: [
      { title: "例句 · What an", lead: "interesting 以元音音素开头 → What an interesting story。", sentence: "What an interesting story it is!", zh: "多么有趣的故事啊！" },
      { title: "例句 · How", lead: "How + 形容词 + 主语 + 谓语。", sentence: "How beautiful the flowers are!", zh: "这些花多么美啊！" },
    ],
    trap: {
      question: "「What beautiful day it is!」少了什么？",
      choices: [
        { text: "day 是可数单数，要加 a：What a beautiful day", correct: true, fb: "What a/an + 形 + 可数单数。" },
        { text: "要用 How beautiful day", correct: false, fb: "How 后面不加名词 day。" },
        { text: "it is 要删掉", correct: false, fb: "可以保留主谓。" },
      ],
      sentence: "What a beautiful day it is!",
      zh: "多么美好的一天啊！",
    },
    transform: {
      lead: "陈述句改感叹句：抽出形容词，选择 What 或 How。",
      items: [
        {
          from: "It is a nice park.",
          fromZh: "这是一个漂亮的公园。",
          steps: [
            step("用 What 改写", ["What a nice park it is!", "What nice park it is!", "How a nice park it is!"], 0, "What a + 形 + 可数单数。", "What a nice park it is!", "多么漂亮的公园啊！"),
            step("用 How 改写", ["How nice the park is!", "How a nice park!", "How nice park is!"], 0, "How + 形 + 主谓。", "How nice the park is!", "这个公园多漂亮啊！"),
          ],
        },
      ],
    },
    extraQs: [
      Q("_____ tall the boy is!", ["What", "What a", "How"], 2, "How + 形容词。", "How tall the boy is!", "这个男孩多高啊！"),
      Q("_____ good news it is!", ["What", "What a", "How"], 0, "news 不可数，What 不加 a。", "What good news it is!", "多好的消息啊！"),
      Q("_____ honest boy he is!", ["What", "What an", "How"], 1, "honest 元音音素 → What an。", "What an honest boy he is!", "他是多么诚实的男孩啊！"),
      Q("_____ fast he runs!", ["What", "What a", "How"], 2, "How + 副词。", "How fast he runs!", "他跑得多快啊！"),
      Q("_____ delicious cakes they are!", ["What", "What a", "How"], 0, "cakes 复数，What + 形 + 复数。", "What delicious cakes they are!", "多么美味的蛋糕啊！"),
    ],
    pairs: [
      P("What a beautiful day!", "多么美好的一天！"),
      P("What an interesting story!", "多么有趣的故事！"),
      P("How beautiful!", "多么美！"),
      P("How fast he runs!", "他跑得多快！"),
    ],
    distractors: ["How a beautiful day it is!", "What beautiful day it is!"],
    extraChecklist: ["weather / news / advice 不可数，What 后不加 a。"],
  },

  "KP-三单小升初": {
    pNum: "P01b",
    title: "一般现在时 · 第三人称单数",
    badge: "小学专项 · 对齐初中 03",
    juniorHref: "../L01/index.html",
    juniorLabel: "初中 · 一般现在时",
    juniorNote: "衔接小学 P01 一般现在时主课；初中第 03 讲系统讲三单与否定疑问。",
    intro: "19 页专项：三单加 -s/-es、doesn't 否定、Does 疑问，路径对齐初中 L01。",
    features: ["👤 he/she/it", "✏️ -s/-es", "🚫 doesn't", "❓ Does"],
    formula: {
      lead: "主语是 he / she / it / 人名 / 单数名词时，实义动词要加 -s 或 -es。",
      formula: "He / She / It + 动词-s/-es",
      parts: [
        S("主语", "三单", "She / Tom / The cat"),
        S("动词", "+s / +es / y→ies", "plays / watches / flies"),
        S("否定", "doesn't + 原形", "doesn't play"),
      ],
      samples: [
        { sentence: "She plays football every Saturday.", zh: "她每周六踢足球。" },
        { sentence: "Linda doesn't have any volleyballs.", zh: "琳达没有排球。" },
      ],
    },
    scenes: [
      { title: "例句 · 每周六踢球", lead: "She → plays，不是 play。", sentence: "She plays football every Saturday.", zh: "她每周六踢足球。" },
      { title: "例句 · 猫捉老鼠", lead: "catch → catches（ch 结尾加 es）。", sentence: "My cat catches mice at night.", zh: "我的猫晚上捉老鼠。" },
    ],
    trap: {
      question: "「Tom like apples.」应改成？",
      choices: [
        { text: "Tom likes apples.", correct: true, fb: "Tom = he，动词加 s。" },
        { text: "Tom liking apples.", correct: false, fb: "一般现在时不用 -ing（除非有 be）。" },
        { text: "Tom is like apples.", correct: false, fb: "like 表喜欢时是实义动词。" },
      ],
      sentence: "Tom likes apples.",
      zh: "汤姆喜欢苹果。",
    },
    transform: {
      lead: "三单否定用 doesn't + 原形；疑问 Does + 主语 + 原形？",
      items: [
        {
          from: "She plays football every Saturday.",
          fromZh: "她每周六踢足球。",
          steps: [
            step("改成否定", ["She doesn't play football every Saturday.", "She doesn't plays football every Saturday.", "She don't play football every Saturday."], 0, "doesn't 后必须是原形 play。", "She doesn't play football every Saturday.", "她周六不踢足球。"),
            step("改成一般疑问", ["Does she play football every Saturday?", "Do she play football every Saturday?", "Does she plays football every Saturday?"], 0, "Does + 主语 + 原形？", "Does she play football every Saturday?", "她每周六踢足球吗？"),
          ],
        },
      ],
    },
    extraQs: [
      Q("He _____ to school by bus.", ["go", "goes", "going"], 1, "He → goes。", "He goes to school by bus.", "他乘公交上学。"),
      Q("The train _____ at nine.", ["leave", "leaves", "leaving"], 1, "The train = it → leaves。", "The train leaves at nine.", "火车九点出发。"),
      Q("_____ Emma play badminton?", ["Do", "Does", "Is"], 1, "Emma 三单 → Does。", "Does Emma play badminton?", "艾玛打羽毛球吗？"),
      Q("My brother _____ TV in the evening. （否定）", ["don't watch", "doesn't watch", "doesn't watches"], 1, "doesn't + 原形 watch。", "My brother doesn't watch TV in the evening.", "我哥哥晚上不看电视。"),
      Q("Mr Wang _____ science.", ["teach", "teaches", "teaching"], 1, "ch 结尾加 es。", "Mr Wang teaches science.", "王老师教科学。"),
    ],
    pairs: [
      P("plays", "（他/她）玩/打"),
      P("doesn't", "不（三单）"),
      P("Does he…?", "他……吗？"),
      P("watches", "看（三单）"),
    ],
    distractors: ["She play football every Saturday.", "She playing football every Saturday."],
    extraChecklist: ["has 是 have 的三单，不是 haves。", "goes / does / watches 记特殊拼写。"],
  },

  "KP-不规则过去式": {
    pNum: "P03b",
    title: "一般过去时 · 不规则动词",
    badge: "小学专项 · 对齐初中 05",
    juniorHref: "../L03/index.html",
    juniorLabel: "初中 · 一般过去时",
    juniorNote: "衔接小学 P03 一般过去时主课；初中第 05 讲系统记不规则动词。",
    intro: "19 页专项：went/bought/saw 分组、didn't + 原形、Did 疑问。",
    features: ["⚡ went/saw", "🛒 bought", "🚫 didn't + 原形", "❓ Did"],
    formula: {
      lead: "不规则动词不能加 -ed，要单独记过去式。",
      formula: "yesterday / last… → 过去式（go→went）",
      parts: [
        S("肯定", "不规则过去式", "went / bought / saw"),
        S("否定", "didn't + 原形", "didn't go"),
        S("疑问", "Did + 原形", "Did you go?"),
      ],
      samples: [
        { sentence: "Bob went to buy three bottles of cola.", zh: "鲍勃去买了三瓶可乐。" },
        { sentence: "We saw a film yesterday evening.", zh: "昨天晚上我们看了一部电影。" },
      ],
    },
    scenes: [
      { title: "例句 · went", lead: "go → went，不是 goed。", sentence: "Bob went to buy three bottles of cola.", zh: "鲍勃去买了三瓶可乐。" },
      { title: "例句 · saw", lead: "see → saw。", sentence: "We saw a film yesterday evening.", zh: "昨天晚上我们看了一部电影。" },
    ],
    trap: {
      question: "「I didn't went to school yesterday.」错在哪？",
      choices: [
        { text: "didn't 后面必须用原形 go", correct: true, fb: "Did/didn't 后永远是原形。" },
        { text: "yesterday 要改成 tomorrow", correct: false, fb: "yesterday 正是过去标志。" },
        { text: "要用 goes", correct: false, fb: "这是过去时。" },
      ],
      sentence: "I didn't go to school yesterday.",
      zh: "我昨天没去上学。",
    },
    transform: {
      lead: "不规则动词：否定和疑问都回到原形。",
      items: [
        {
          from: "She bought a gift last Sunday.",
          fromZh: "她上周日买了一份礼物。",
          steps: [
            step("改成否定", ["She didn't buy a gift last Sunday.", "She didn't bought a gift last Sunday.", "She doesn't buy a gift last Sunday."], 0, "didn't + buy（原形）。", "She didn't buy a gift last Sunday.", "她上周日没买礼物。"),
            step("改成一般疑问", ["Did she buy a gift last Sunday?", "Did she bought a gift last Sunday?", "Does she buy a gift last Sunday?"], 0, "Did + 原形 buy。", "Did she buy a gift last Sunday?", "她上周日买礼物了吗？"),
          ],
        },
      ],
    },
    extraQs: [
      Q("He _____ home late last night. (get)", ["get", "got", "gotten"], 1, "get → got。", "He got home late last night.", "他昨晚很晚到家。"),
      Q("I _____ my keys yesterday. (lose)", ["lose", "lost", "losed"], 1, "lose → lost。", "I lost my keys yesterday.", "我昨天丢了钥匙。"),
      Q("_____ you see the panda?", ["Do", "Did", "Does"], 1, "过去疑问 Did。", "Did you see the panda?", "你看见熊猫了吗？"),
      Q("They _____ to Chengdu by train. (go)", ["goed", "went", "gone"], 1, "go → went。", "They went to Chengdu by train.", "他们坐火车去了成都。"),
      Q("She _____ a letter to her friend. (write)", ["write", "wrote", "written"], 1, "write → wrote。", "She wrote a letter to her friend.", "她给朋友写了一封信。"),
    ],
    pairs: [
      P("go → went", "去"),
      P("buy → bought", "买"),
      P("see → saw", "看见"),
      P("didn't go", "没有去"),
    ],
    distractors: ["We seed a film yesterday evening.", "We saw a film every evening."],
    extraChecklist: ["高频：go-went, see-saw, buy-bought, get-got, take-took, make-made, have-had。"],
  },

  "KP-情态动词": {
    pNum: "P17",
    title: "情态动词 can / should / must",
    badge: "小学 · 对齐初中 07",
    juniorHref: "../L06/index.html",
    juniorLabel: "初中 · 情态动词",
    juniorNote: "小学先掌握三词 + 原形；初中再学 have to、mustn't 与 don't have to。",
    intro: "19 页：情态公式、能力/建议/必须、否定疑问转换、综测。",
    features: ["💪 can", "💡 should", "⚠️ must", "🔄 否定疑问"],
    formula: {
      lead: "情态动词后面永远接动词原形，没有 to，也没有 -s。",
      formula: "can / should / must + 动词原形",
      parts: [
        S("can", "能力/许可", "can swim"),
        S("should", "建议", "should wear"),
        S("must", "必须", "must be quiet"),
      ],
      samples: [
        { sentence: "You should wear a coat. It is cold today.", zh: "你应该穿外套，今天很冷。" },
        { sentence: "We must be quiet in the library.", zh: "图书馆里我们必须安静。" },
      ],
    },
    scenes: [
      { title: "例句 · can 能力", lead: "I can swim. 表示能力。", sentence: "I can swim across the pool.", zh: "我能游过泳池。" },
      { title: "例句 · must 必须", lead: "must 语气强，表示必须。", sentence: "We must be quiet in the library.", zh: "图书馆里我们必须安静。" },
    ],
    trap: {
      question: "「She cans play the piano.」错在哪？",
      choices: [
        { text: "can 没有第三人称 -s，后接原形 play", correct: true, fb: "情态动词没有 -s。" },
        { text: "piano 前要加 a", correct: false, fb: "乐器前用 the，但不是这句的主要错误。" },
        { text: "要用 playing", correct: false, fb: "情态后是原形。" },
      ],
      sentence: "She can play the piano.",
      zh: "她会弹钢琴。",
    },
    transform: {
      lead: "情态否定：can't / shouldn't / mustn't；疑问：情态动词提前。",
      items: [
        {
          from: "You can swim here.",
          fromZh: "你可以在这里游泳。",
          steps: [
            step("改成否定（禁止/不能）", ["You can't swim here.", "You don't can swim here.", "You can't swimming here."], 0, "can't + 原形。", "You can't swim here.", "你不能在这里游泳。"),
            step("改成一般疑问", ["Can you swim here?", "Do you can swim here?", "Can you swimming here?"], 0, "Can + 主语 + 原形？", "Can you swim here?", "你可以在这里游泳吗？"),
          ],
        },
      ],
    },
    extraQs: [
      Q("You _____ take an umbrella. It's raining.", ["should", "shoulds", "should to"], 0, "should + 原形。", "You should take an umbrella.", "你应该带伞。"),
      Q("_____ I use your pen?", ["Must", "Can", "Should to"], 1, "请求许可用 Can I…?", "Can I use your pen?", "我可以用你的笔吗？"),
      Q("Students _____ wear school uniforms.", ["must", "must to", "musts"], 0, "校规必须 must。", "Students must wear school uniforms.", "学生必须穿校服。"),
      Q("He _____ speak English, but he can speak Chinese.", ["can", "can't", "must"], 1, "转折：不会英语。", "He can't speak English, but he can speak Chinese.", "他不会说英语，但会说中文。"),
      Q("You _____ eat in the lab. It's dangerous.", ["should", "mustn't", "can"], 1, "禁止用 mustn't。", "You mustn't eat in the lab.", "实验室里不准吃东西。"),
    ],
    pairs: [
      P("can swim", "会游泳"),
      P("should wear", "应该穿"),
      P("must be quiet", "必须安静"),
      P("Can you…?", "你能……吗？"),
    ],
    distractors: ["You should to wear a coat.", "You shoulds wear a coat."],
    extraChecklist: ["初中还将学习 have to（客观需要）与 mustn't ≠ don't have to。"],
  },

  "KP-too-enough": {
    pNum: "P20",
    title: "too…to / enough to",
    badge: "小学 · 完成句子高频",
    juniorHref: "../L07/index.html",
    juniorLabel: "初中 · 比较级与程度",
    juniorNote: "小学掌握 too…to 与 adj + enough to；初中完成句子常考。",
    intro: "19 页：两个句型公式、位置对比、同义转换、综测。",
    features: ["🚫 too…to", "✅ enough to", "🔄 同义转换", "📝 综合测试"],
    formula: {
      lead: "too…to 表示「太……而不能」；enough to 表示「足够……可以」。",
      formula: "too + 形 + to do　　adj + enough + to do",
      parts: [
        S("too", "太……（否定结果）", "too young to go"),
        S("enough", "足够（肯定结果）", "old enough to go"),
      ],
      samples: [
        { sentence: "He is too young to go to school alone.", zh: "他太小了，不能独自上学。" },
        { sentence: "She is old enough to look after herself.", zh: "她已经够大，可以照顾自己了。" },
      ],
    },
    scenes: [
      { title: "例句 · too…to", lead: "too 在形容词前，to 后接原形。", sentence: "The box is too heavy to carry.", zh: "这个箱子太重了，搬不动。" },
      { title: "例句 · enough to", lead: "enough 放在形容词后面。", sentence: "She is old enough to look after herself.", zh: "她已经够大，可以照顾自己了。" },
    ],
    trap: {
      question: "「He is enough old to go.」错在哪？",
      choices: [
        { text: "enough 应放在形容词后：old enough", correct: true, fb: "adj + enough，不是 enough + adj。" },
        { text: "要用 too old", correct: false, fb: "enough 是「足够」，不是 too。" },
        { text: "go 要改成 going", correct: false, fb: "to 后用原形。" },
      ],
      sentence: "He is old enough to go.",
      zh: "他够大了，可以去。",
    },
    transform: {
      lead: "too…to 常可与 not + adj + enough 转换。",
      items: [
        {
          from: "The boy is too short to reach the book.",
          fromZh: "男孩太矮，够不着那本书。",
          steps: [step("改用 not + enough", ["The boy is not tall enough to reach the book.", "The boy is not too tall to reach the book.", "The boy is tall not enough to reach the book."], 0, "too short = not tall enough。", "The boy is not tall enough to reach the book.", "男孩不够高，够不着书。")],
        },
      ],
    },
    extraQs: [
      Q("The tea is _____ hot _____ drink.", ["too; to", "enough; to", "to; too"], 0, "太烫而不能喝。", "The tea is too hot to drink.", "茶太烫了，不能喝。"),
      Q("This room is big _____ for us to live in.", ["too", "enough", "so"], 1, "形容词后 enough。", "This room is big enough for us to live in.", "这房间够大，我们住得下。"),
      Q("She is _____ weak _____ carry the bag.", ["too; to", "so; that", "enough; to"], 0, "太弱而不能搬。", "She is too weak to carry the bag.", "她太弱，搬不动袋子。"),
      Q("He ran fast _____ to catch the bus.", ["too", "enough", "so"], 1, "副词后 enough：fast enough。", "He ran fast enough to catch the bus.", "他跑得够快，赶上了车。"),
      Q("The problem is _____ difficult for me to work out.", ["too", "enough", "so"], 0, "too + 形 + for sb + to do。", "The problem is too difficult for me to work out.", "这题对我来说太难，做不出来。"),
    ],
    pairs: [
      P("too young to", "太小而不能"),
      P("old enough to", "足够大可以"),
      P("too heavy to carry", "太重搬不动"),
      P("fast enough", "足够快"),
    ],
    distractors: ["He is too young that go to school alone.", "He is enough young to go to school alone."],
    extraChecklist: ["enough 修饰名词时放名词前：enough time；修饰形/副放后面。"],
  },

  "KP-few-little": {
    pNum: "P22",
    title: "a few / a little / few / little",
    badge: "小学 · 可数不可数搭配",
    juniorHref: "../L09-可数不可数/index.html",
    juniorLabel: "小学 · 可数与不可数",
    juniorNote: "与 P08 可数不可数配套；有无 a 意思相反。",
    intro: "19 页：四个词公式、肯定/否定意味、搭配、综测。",
    features: ["🍏 a few", "💧 a little", "🚫 few/little", "📝 综合测试"],
    formula: {
      lead: "有 a 表示「有一些」；没有 a 表示「几乎没有」。",
      formula: "a few / few + 可数复数　　a little / little + 不可数",
      parts: [
        S("a few", "一些（可数）", "a few apples"),
        S("few", "几乎没有（可数）", "few friends"),
        S("a little", "一点（不可数）", "a little water"),
        S("little", "几乎没有（不可数）", "little time"),
      ],
      samples: [
        { sentence: "There are a few apples on the table.", zh: "桌上有几个苹果。" },
        { sentence: "There is little water left. We need to buy more.", zh: "水快没了，我们得再买。" },
      ],
    },
    scenes: [
      { title: "例句 · a few 可数", lead: "apples 可数复数 → a few。", sentence: "There are a few apples on the table.", zh: "桌上有几个苹果。" },
      { title: "例句 · little 不可数否定", lead: "little water = 几乎没水。", sentence: "There is little water left.", zh: "剩下的水很少了。" },
    ],
    trap: {
      question: "「I have a little friends.」错在哪？",
      choices: [
        { text: "friends 可数，要用 a few", correct: true, fb: "a little 只搭配不可数。" },
        { text: "要用 little friends", correct: false, fb: "那是「几乎没有朋友」，搭配也对但意思不同；这里语法应用 a few。" },
        { text: "friends 要改成 friend", correct: false, fb: "few/a few 后是复数。" },
      ],
      sentence: "I have a few friends.",
      zh: "我有几个朋友。",
    },
    transform: {
      lead: "把 a few 句改成不可数的 a little。",
      items: [
        {
          from: "I have a few questions.",
          fromZh: "我有几个问题。",
          steps: [step("如果是时间：我还有一点时间", ["I have a little time.", "I have a few time.", "I have little times."], 0, "time 不可数 → a little time。", "I have a little time.", "我还有一点时间。")],
        },
      ],
    },
    extraQs: [
      Q("There is _____ milk. We can make breakfast.", ["little", "a little", "a few"], 1, "有一点奶，够用 → a little。", "There is a little milk.", "还有一点牛奶。"),
      Q("He has _____ friends, so he often feels lonely.", ["a few", "few", "a little"], 1, "几乎没有朋友 → few。", "He has few friends, so he often feels lonely.", "他几乎没有朋友，所以常觉得孤独。"),
      Q("Only _____ students passed the test.", ["a little", "little", "a few"], 2, "students 可数 → a few。", "Only a few students passed the test.", "只有几个学生通过了考试。"),
      Q("Hurry up! We have _____ time left.", ["little", "a few", "many"], 0, "时间紧迫 → little time。", "We have little time left.", "我们剩的时间很少了。"),
      Q("I can speak _____ English.", ["a few", "a little", "few"], 1, "English 不可数 → a little。", "I can speak a little English.", "我会说一点英语。"),
    ],
    pairs: [
      P("a few apples", "几个苹果"),
      P("few friends", "几乎没有朋友"),
      P("a little water", "一点水"),
      P("little time", "几乎没时间"),
    ],
    distractors: ["There are a little apples on the table.", "There are few apple on the table."],
    extraChecklist: ["only a few / only a little 仍表「只有一些」，但带有「不多」的口气。"],
  },

  "KP-现在进行时小升初": {
    pNum: "P02b",
    title: "现在进行时 · 小升初专项",
    badge: "小学专项 · 对齐初中 04",
    juniorHref: "../L02/index.html",
    juniorLabel: "初中 · 现在进行时",
    juniorNote: "衔接小学 P02 现在进行时主课；对比一般现在时。",
    intro: "19 页专项：am/is/are + V-ing、now/look 标志、否定疑问、与习惯对比。",
    features: ["🔄 be + V-ing", "👀 Look!", "🚫 isn't", "📝 综合测试"],
    formula: {
      lead: "此刻正在发生：be + 动词-ing。",
      formula: "am / is / are + V-ing",
      parts: [
        S("I", "am", "I am reading"),
        S("he/she/it", "is", "She is drawing"),
        S("you/we/they", "are", "They are playing"),
      ],
      samples: [
        { sentence: "Look! Tom is playing football in the park.", zh: "看！汤姆正在公园踢足球。" },
        { sentence: "I am reading a book in the library.", zh: "我正在图书馆看书。" },
      ],
    },
    scenes: [
      { title: "例句 · Look 标志", lead: "看见 Look! / now，优先想进行时。", sentence: "Look! Tom is playing football in the park.", zh: "看！汤姆正在公园踢足球。" },
      { title: "例句 · 习惯对比", lead: "every day 用一般现在时，不是进行时。", sentence: "Tom plays football every Saturday.", zh: "汤姆每周六踢足球。" },
    ],
    trap: {
      question: "「Look! The children play in the playground.」应改成？",
      choices: [
        { text: "are playing（Look 提示正在发生）", correct: true, fb: "Look! → 现在进行时。" },
        { text: "played", correct: false, fb: "不是过去。" },
        { text: "plays", correct: false, fb: "children 是复数，且有 Look。" },
      ],
      sentence: "Look! The children are playing in the playground.",
      zh: "看！孩子们正在操场上玩。",
    },
    transform: {
      lead: "进行时否定：isn't/aren't + V-ing；疑问：Is/Are + 主语 + V-ing？",
      items: [
        {
          from: "She is drawing a picture.",
          fromZh: "她正在画画。",
          steps: [
            step("改成否定", ["She isn't drawing a picture.", "She doesn't drawing a picture.", "She isn't draw a picture."], 0, "isn't + V-ing。", "She isn't drawing a picture.", "她没在画画。"),
            step("改成一般疑问", ["Is she drawing a picture?", "Does she drawing a picture?", "Is she draw a picture?"], 0, "Is + 主语 + V-ing？", "Is she drawing a picture?", "她正在画画吗？"),
          ],
        },
      ],
    },
    extraQs: [
      Q("Listen! Someone _____ at the door.", ["knocks", "is knocking", "knocked"], 1, "Listen! → 进行时。", "Listen! Someone is knocking at the door.", "听！有人在敲门。"),
      Q("They _____ TV now.", ["watch", "are watching", "watched"], 1, "now → are watching。", "They are watching TV now.", "他们现在正在看电视。"),
      Q("I _____ a letter at the moment.", ["write", "am writing", "writes"], 1, "at the moment → am writing。", "I am writing a letter at the moment.", "我此刻正在写信。"),
      Q("_____ you doing your homework?", ["Do", "Are", "Is"], 1, "进行时疑问 Are you + V-ing。", "Are you doing your homework?", "你在做作业吗？"),
      Q("He _____ football every day, but he _____ it now.", ["plays; isn't playing", "is playing; doesn't play", "play; isn't play"], 0, "习惯一般现在时，此刻进行时否定。", "He plays football every day, but he isn't playing it now.", "他每天踢球，但现在没在踢。"),
    ],
    pairs: [
      P("am reading", "我正在读"),
      P("is playing", "正在玩/打"),
      P("Look!", "看！（标志）"),
      P("at the moment", "此刻"),
    ],
    distractors: ["Look! Tom plays football in the park.", "Look! Tom playing football in the park."],
    extraChecklist: ["like / want / know 等状态动词一般不用进行时。"],
  },

  "KP-现在完成时": {
    pNum: "P05",
    title: "现在完成时 · 入门",
    badge: "小学入门 · 对齐初中 11",
    juniorHref: "../L10/index.html",
    juniorLabel: "初中 · 现在完成时",
    juniorNote: "小学先认识 have/has + 过去分词与 for/since；初中第 11 讲系统对比一般过去时。",
    intro: "19 页入门：构成、already/yet、for/since、与过去时对比、综测。",
    features: ["✅ have/has + PP", "⏱ for / since", "📌 already / yet", "📝 综合测试"],
    formula: {
      lead: "过去发生、与现在有关：have/has + 过去分词。",
      formula: "have / has + 过去分词",
      parts: [
        S("have", "I/you/we/they", "have finished"),
        S("has", "he/she/it", "has worked"),
        S("标志", "already / yet / for / since / so far", "for ten years"),
      ],
      samples: [
        { sentence: "He has worked in this company for ten years so far.", zh: "到目前为止，他在这家公司工作了十年。" },
        { sentence: "She has already finished her homework.", zh: "她已经做完作业了。" },
      ],
    },
    scenes: [
      { title: "例句 · for + 时间段", lead: "for ten years 用完成时。", sentence: "He has worked here for ten years.", zh: "他在这里工作十年了。" },
      { title: "例句 · already", lead: "already 用于肯定句。", sentence: "She has already finished her homework.", zh: "她已经做完作业了。" },
    ],
    trap: {
      question: "「I have seen him yesterday.」错在哪？",
      choices: [
        { text: "yesterday 是过去具体时间，应改用一般过去时 saw", correct: true, fb: "有明确过去时间点用一般过去时。" },
        { text: "have 要改成 has", correct: false, fb: "I 用 have 是对的。" },
        { text: "seen 要改成 saw 但保留 have", correct: false, fb: "不能 have saw。" },
      ],
      sentence: "I saw him yesterday.",
      zh: "我昨天看见他了。",
    },
    transform: {
      lead: "完成时否定：haven't/hasn't + PP；疑问：Have/Has + 主语 + PP？",
      items: [
        {
          from: "They have visited the museum.",
          fromZh: "他们参观过博物馆。",
          steps: [
            step("改成否定（还没有，用 yet）", ["They haven't visited the museum yet.", "They didn't visited the museum yet.", "They haven't visit the museum yet."], 0, "haven't + 过去分词，yet 放句末。", "They haven't visited the museum yet.", "他们还没参观博物馆。"),
            step("改成一般疑问", ["Have they visited the museum?", "Did they visited the museum?", "Have they visit the museum?"], 0, "Have + 主语 + PP？", "Have they visited the museum?", "他们参观过博物馆吗？"),
          ],
        },
      ],
    },
    extraQs: [
      Q("He has worked here _____ ten years.", ["since", "for", "in"], 1, "for + 时间段。", "He has worked here for ten years.", "他在这里工作十年了。"),
      Q("She has lived here _____ 2018.", ["for", "since", "at"], 1, "since + 时间点。", "She has lived here since 2018.", "她从 2018 年起住在这里。"),
      Q("_____ you ever been to Beijing?", ["Do", "Did", "Have"], 2, "经历：Have you ever…?", "Have you ever been to Beijing?", "你去过北京吗？"),
      Q("I _____ my homework yet.", ["haven't finished", "didn't finish", "don't finish"], 0, "yet 常与完成时否定连用。", "I haven't finished my homework yet.", "我还没做完作业。"),
      Q("Tom isn't here. He _____ to the library.", ["has gone", "has been", "went"], 0, "has gone to = 去了还没回来。", "He has gone to the library.", "他去图书馆了。"),
    ],
    pairs: [
      P("have finished", "已经完成"),
      P("for ten years", "长达十年"),
      P("since 2018", "自从 2018"),
      P("yet", "还（否定/疑问）"),
    ],
    distractors: ["He worked in this company for ten years so far.", "He has work in this company for ten years."],
    extraChecklist: ["has gone to（去了未回）vs has been to（去过已回）。"],
  },

  "KP-被动语态": {
    pNum: "P30",
    title: "被动语态 · 入门",
    badge: "小学入门 · 对齐初中 16",
    juniorHref: "../L14/index.html",
    juniorLabel: "初中 · 被动语态",
    juniorNote: "小学先认识 be + 过去分词；初中第 16 讲学转换、by、情态被动。",
    intro: "19 页入门：承受者作主语、is/are/was + PP、主被动转换、综测。",
    features: ["🔁 be + PP", "👤 by 执行者", "🔄 主动变被动", "📝 综合测试"],
    formula: {
      lead: "主语是动作的承受者时用被动。",
      formula: "be + 过去分词　(+ by + 执行者)",
      parts: [
        S("现在", "am/is/are + PP", "is spoken"),
        S("过去", "was/were + PP", "was cleaned"),
        S("by", "可省略", "by people"),
      ],
      samples: [
        { sentence: "English is spoken in many countries.", zh: "许多国家都说英语。" },
        { sentence: "The classroom is cleaned every afternoon.", zh: "教室每天下午被打扫。" },
      ],
    },
    scenes: [
      { title: "例句 · 英语被说", lead: "English 是承受者 → is spoken。", sentence: "English is spoken in many countries.", zh: "许多国家都说英语。" },
      { title: "例句 · 教室被打扫", lead: "每天发生的被动：is cleaned。", sentence: "The classroom is cleaned every afternoon.", zh: "教室每天下午被打扫。" },
    ],
    trap: {
      question: "「The window is broke by the boy.」应改成？",
      choices: [
        { text: "is broken（过去分词）", correct: true, fb: "break → broken。" },
        { text: "is breaking", correct: false, fb: "进行时不是被动入门公式。" },
        { text: "broke", correct: false, fb: "缺少 be。" },
      ],
      sentence: "The window is broken by the boy.",
      zh: "窗户被那个男孩打破了。",
    },
    transform: {
      lead: "主动变被动：宾语变主语，动词变 be + PP。",
      items: [
        {
          from: "People speak English in many countries.",
          fromZh: "许多人在很多国家说英语。",
          steps: [step("改成被动", ["English is spoken in many countries.", "English is speak in many countries.", "English spoken in many countries."], 0, "speak → is spoken。", "English is spoken in many countries.", "许多国家都说英语。")],
        },
      ],
    },
    extraQs: [
      Q("The book _____ by Mo Yan.", ["wrote", "was written", "is writing"], 1, "过去被动 was written。", "The book was written by Mo Yan.", "这本书是莫言写的。"),
      Q("These photos _____ in Chengdu.", ["are taken", "taken", "took"], 0, "现在被动 are taken。", "These photos are taken in Chengdu.", "这些照片是在成都拍的。"),
      Q("The flowers _____ every morning.", ["water", "are watered", "watering"], 1, "flowers 承受者 → are watered。", "The flowers are watered every morning.", "花每天早上被浇水。"),
      Q("The letter _____ yesterday.", ["is sent", "was sent", "sent"], 1, "yesterday → 过去被动 was sent。", "The letter was sent yesterday.", "信昨天被寄出。"),
      Q("Rice _____ in the south of China.", ["grows", "is grown", "grew"], 1, "水稻被种植 → is grown。", "Rice is grown in the south of China.", "中国南方种植水稻。"),
    ],
    pairs: [
      P("is spoken", "被说"),
      P("was written", "被写"),
      P("are cleaned", "被打扫"),
      P("by", "被……（执行者）"),
    ],
    distractors: ["English spoken in many countries.", "English is speak in many countries."],
    extraChecklist: ["情态被动：must be finished，初中再学。"],
  },

  "KP-宾语从句": {
    pNum: "P28",
    title: "宾语从句 · 陈述语序",
    badge: "小学入门 · 对齐初中 13",
    juniorHref: "../L12/index.html",
    juniorLabel: "初中 · 宾语从句",
    juniorNote: "小学先掌握陈述语序；初中第 13 讲学 that/wh-/if 与时态。",
    intro: "19 页入门：主句 + 连接词 + 陈述语序，易错疑问语序，综测。",
    features: ["🗣 陈述语序", "🔗 that / what / if", "❌ 疑问语序", "📝 综合测试"],
    formula: {
      lead: "宾语从句用陈述语序：连接词 + 主语 + 谓语。",
      formula: "I know + that / what / if + 主语 + 谓语",
      parts: [
        S("主句", "think/know/say", "I know"),
        S("连接词", "that/what/if", "where"),
        S("从句", "陈述语序", "he lives"),
      ],
      samples: [
        { sentence: "I know where he lives.", zh: "我知道他住在哪里。" },
        { sentence: "What do you think we can do?", zh: "你觉得我们能做什么？" },
      ],
    },
    scenes: [
      { title: "例句 · where 陈述语序", lead: "where he lives，不是 where does he live。", sentence: "I know where he lives.", zh: "我知道他住在哪里。" },
      { title: "例句 · think 后的从句", lead: "What do you think + 陈述语序。", sentence: "What do you think we can do to solve the problem?", zh: "你觉得我们能做什么来解决问题？" },
    ],
    trap: {
      question: "「I don't know where does he live.」应改成？",
      choices: [
        { text: "where he lives（去掉 does，陈述语序）", correct: true, fb: "从句不能再用疑问语序。" },
        { text: "where he live", correct: false, fb: "he 三单，lives。" },
        { text: "where is he live", correct: false, fb: "更乱了。" },
      ],
      sentence: "I don't know where he lives.",
      zh: "我不知道他住在哪里。",
    },
    transform: {
      lead: "把问句变成宾语从句：疑问词留下，后面改陈述语序。",
      items: [
        {
          from: "Where does he live?",
          fromZh: "他住在哪里？",
          steps: [step("接在 I ask 后面", ["I ask where he lives.", "I ask where does he live.", "I ask where he live."], 0, "where + he lives。", "I ask where he lives.", "我问他住在哪里。")],
        },
      ],
    },
    extraQs: [
      Q("He said _____ he was tired.", ["what", "that", "if"], 1, "陈述用 that（可省略）。", "He said that he was tired.", "他说他累了。"),
      Q("I wonder _____ it will rain tomorrow.", ["that", "what", "if"], 2, "是否 → if/whether。", "I wonder if it will rain tomorrow.", "我想知道明天会不会下雨。"),
      Q("Do you know _____?", ["where is the library", "where the library is", "where the library"], 1, "陈述语序：where the library is。", "Do you know where the library is?", "你知道图书馆在哪吗？"),
      Q("She asked me _____ I liked Chengdu.", ["that", "if", "what"], 1, "一般疑问变从句用 if。", "She asked me if I liked Chengdu.", "她问我喜不喜欢成都。"),
      Q("I believe _____ he _____ right.", ["that; is", "what; is", "that; are"], 0, "that + he is。", "I believe that he is right.", "我相信他是对的。"),
    ],
    pairs: [
      P("I know that…", "我知道……"),
      P("I wonder if…", "我想知道是否……"),
      P("where he lives", "他住在哪里（陈述语序）"),
      P("what we can do", "我们能做什么"),
    ],
    distractors: ["I know where does he live.", "I know where is he live."],
    extraChecklist: ["主句过去时，从句常要时态后退，初中再展开。"],
  },

  "KP-like-doing": {
    pNum: "P24",
    title: "like / enjoy / finish + doing",
    badge: "小学 · 对齐初中 01 非谓语",
    juniorHref: "../L00-主谓宾与非谓语/index.html",
    juniorLabel: "初中 · 主谓宾与非谓语",
    juniorNote: "小学先记 enjoy/finish + doing；初中第 01 讲系统学三种非谓语。",
    intro: "19 页：doing 作宾语、like doing vs like to do、对比 want to do。",
    features: ["📚 enjoy doing", "✅ finish doing", "❤️ like doing", "📝 综合测试"],
    formula: {
      lead: "有些动词后面接 doing（动名词）作宾语。",
      formula: "enjoy / finish / practise + doing",
      parts: [
        S("doing", "动名词宾语", "enjoy reading"),
        S("to do", "另一些动词", "want to read"),
      ],
      samples: [
        { sentence: "I enjoy reading books in the library.", zh: "我喜欢在图书馆读书。" },
        { sentence: "Tom likes playing basketball.", zh: "汤姆喜欢打篮球。" },
      ],
    },
    scenes: [
      { title: "例句 · enjoy doing", lead: "enjoy 后面不能加 to do。", sentence: "I enjoy reading books in the library.", zh: "我喜欢在图书馆读书。" },
      { title: "例句 · finish doing", lead: "finish 后接 doing。", sentence: "She finished doing her homework at nine.", zh: "她九点做完了作业。" },
    ],
    trap: {
      question: "「She enjoys to play football.」应改成？",
      choices: [
        { text: "enjoys playing", correct: true, fb: "enjoy + doing。" },
        { text: "enjoy play", correct: false, fb: "缺 -ing，且三单 enjoys。" },
        { text: "enjoys play", correct: false, fb: "要 playing。" },
      ],
      sentence: "She enjoys playing football.",
      zh: "她喜欢踢足球。",
    },
    transform: {
      lead: "把 to do 改成 enjoy 句型。",
      items: [
        {
          from: "I want to read this book.",
          fromZh: "我想读这本书。",
          steps: [step("如果是 enjoy，怎么说？", ["I enjoy reading this book.", "I enjoy to read this book.", "I enjoy read this book."], 0, "enjoy + reading。", "I enjoy reading this book.", "我喜欢读这本书。")],
        },
      ],
    },
    extraQs: [
      Q("He finished _____ the room.", ["clean", "cleaning", "to clean"], 1, "finish + doing。", "He finished cleaning the room.", "他打扫完房间了。"),
      Q("They practise _____ the piano every day.", ["play", "playing", "to play"], 1, "practise + doing。", "They practise playing the piano every day.", "他们每天练习弹钢琴。"),
      Q("I hope _____ you soon.", ["seeing", "see", "to see"], 2, "hope + to do。", "I hope to see you soon.", "我希望很快见到你。"),
      Q("Would you mind _____ the window?", ["open", "opening", "to open"], 1, "mind + doing。", "Would you mind opening the window?", "你介意开窗吗？"),
      Q("She likes _____ but today she would like _____ TV.", ["reading; to watch", "to read; watching", "read; watch"], 0, "like doing 爱好；would like to do 想要。", "She likes reading but today she would like to watch TV.", "她喜欢阅读，但今天想看电视。"),
    ],
    pairs: [
      P("enjoy reading", "喜欢阅读"),
      P("finish doing", "做完"),
      P("practise playing", "练习弹/打"),
      P("want to do", "想要做（对比）"),
    ],
    distractors: ["I enjoy to reading books in the library.", "I enjoy read books in the library."],
    extraChecklist: ["mind / keep / practise / finish / enjoy 后接 doing。"],
  },

  "KP-宾格代词": {
    pNum: "P11",
    title: "宾格代词 me / him / them",
    badge: "小学 · 对齐初中 06",
    juniorHref: "../L05/index.html",
    juniorLabel: "初中 · 五种代词",
    juniorNote: "小学先分主格/宾格；初中第 06 讲五种代词一起学。",
    intro: "19 页：主格 vs 宾格、动词/介词后用宾格、give/tell + 宾格。",
    features: ["👤 主格", "🎯 宾格", "🎁 give sb sth", "📝 综合测试"],
    formula: {
      lead: "作主语用主格；作宾语（动词或介词后）用宾格。",
      formula: "I → me　he → him　she → her　we → us　they → them",
      parts: [
        S("主格", "主语", "I / he / she / we / they"),
        S("宾格", "动词/介词后", "me / him / her / us / them"),
      ],
      samples: [
        { sentence: "Please tell her the good news.", zh: "请告诉她这个好消息。" },
        { sentence: "Miss Li gave us an interesting lesson.", zh: "李老师给我们上了一堂有趣的课。" },
      ],
    },
    scenes: [
      { title: "例句 · tell her", lead: "tell 后面的人用宾格 her。", sentence: "Please tell her the good news.", zh: "请告诉她这个好消息。" },
      { title: "例句 · gave us", lead: "give + 宾格 + 物。", sentence: "Miss Li gave us an interesting lesson.", zh: "李老师给我们上了一堂有趣的课。" },
    ],
    trap: {
      question: "「Between you and I, this is a secret.」应改成？",
      choices: [
        { text: "Between you and me（介词后用宾格）", correct: true, fb: "between 是介词。" },
        { text: "Between you and my", correct: false, fb: "my 是物主代词。" },
        { text: "Between you and mine", correct: false, fb: "mine 是名词性物主。" },
      ],
      sentence: "Between you and me, this is a secret.",
      zh: "就我们俩之间说，这是个秘密。",
    },
    transform: {
      lead: "把主语 I 改成宾语位置的 me。",
      items: [
        {
          from: "I am a student.",
          fromZh: "我是学生。",
          steps: [step("老师帮助我：How to say 'help + 我'?", ["The teacher helps me.", "The teacher helps I.", "The teacher helps my."], 0, "helps 后用 me。", "The teacher helps me.", "老师帮助我。")],
        },
      ],
    },
    extraQs: [
      Q("Please give _____ a cup of tea. (she)", ["she", "her", "hers"], 1, "give + 宾格 her。", "Please give her a cup of tea.", "请给她一杯茶。"),
      Q("We saw _____ in the park. (they)", ["they", "them", "their"], 1, "saw 后宾格 them。", "We saw them in the park.", "我们在公园看见他们。"),
      Q("He sits between Tom and _____. (I)", ["I", "me", "my"], 1, "between ... and me。", "He sits between Tom and me.", "他坐在汤姆和我中间。"),
      Q("_____ like English. Don't ask _____ to drop it. (we)", ["We; we", "Us; us", "We; us"], 2, "主语 we，宾语 us。", "We like English. Don't ask us to drop it.", "我们喜欢英语。别让我们放弃。"),
      Q("The teacher asked _____ to be quiet. (he)", ["he", "him", "his"], 1, "asked + 宾格 him。", "The teacher asked him to be quiet.", "老师让他安静。"),
    ],
    pairs: [
      P("help me", "帮助我"),
      P("tell her", "告诉她"),
      P("give us", "给我们"),
      P("between you and me", "你我之间"),
    ],
    distractors: ["Please tell she the good news.", "Please tell hers the good news."],
    extraChecklist: ["it's 是 it is；its 是物主。宾格是 it（不变）。"],
  },

  "KP-some-any-no": {
    pNum: "P23",
    title: "some / any / no",
    badge: "小学 · 限定词",
    juniorHref: "../L09-可数不可数/index.html",
    juniorLabel: "小学 · 可数与不可数",
    juniorNote: "肯定 some、否定/疑问 any；邀请句 Would you like some…?",
    intro: "19 页：some/any 分工、no = not any、邀请特例、综测。",
    features: ["✅ some", "❓ any", "🚫 no", "🍵 Would you like some"],
    formula: {
      lead: "some 用于肯定；any 用于否定和疑问。邀请/请求可用 some。",
      formula: "肯定 some　/　否定·疑问 any　/　no = not any",
      parts: [
        S("some", "一些（肯定）", "some tea"),
        S("any", "一些（否/疑）", "any milk"),
        S("no", "没有", "no time"),
      ],
      samples: [
        { sentence: "Would you like some tea?", zh: "你想喝点茶吗？" },
        { sentence: "There isn't any milk in the fridge.", zh: "冰箱里没有牛奶。" },
      ],
    },
    scenes: [
      { title: "例句 · 邀请用 some", lead: "Would you like some…? 期待肯定回答。", sentence: "Would you like some tea?", zh: "你想喝点茶吗？" },
      { title: "例句 · 否定用 any", lead: "isn't any = no。", sentence: "There isn't any milk in the fridge.", zh: "冰箱里没有牛奶。" },
    ],
    trap: {
      question: "「I don't have some money.」应改成？",
      choices: [
        { text: "any money（否定用 any）", correct: true, fb: "否定句用 any。" },
        { text: "no any money", correct: false, fb: "no 不能再加 any。" },
        { text: "many money", correct: false, fb: "money 不可数。" },
      ],
      sentence: "I don't have any money.",
      zh: "我没有任何钱。",
    },
    transform: {
      lead: "There is some… 改否定。",
      items: [
        {
          from: "There is some juice in the bottle.",
          fromZh: "瓶子里有一些果汁。",
          steps: [
            step("改成否定（用 any）", ["There isn't any juice in the bottle.", "There isn't some juice in the bottle.", "There is any juice in the bottle."], 0, "isn't any。", "There isn't any juice in the bottle.", "瓶子里没有果汁。"),
            step("改成 no 句", ["There is no juice in the bottle.", "There is not no juice in the bottle.", "There are no juice in the bottle."], 0, "no = not any。", "There is no juice in the bottle.", "瓶子里没有果汁。"),
          ],
        },
      ],
    },
    extraQs: [
      Q("She has _____ friends in Chengdu.", ["any", "some", "no a"], 1, "肯定用 some。", "She has some friends in Chengdu.", "她在成都有一些朋友。"),
      Q("Is there _____ water left?", ["some", "any", "no"], 1, "疑问用 any。", "Is there any water left?", "还剩水吗？"),
      Q("There is _____ time to waste.", ["any", "no", "some not"], 1, "no time = not any time。", "There is no time to waste.", "没有时间可浪费。"),
      Q("Could I have _____ paper, please?", ["any", "some", "no"], 1, "请求可用 some。", "Could I have some paper, please?", "请给我一些纸好吗？"),
      Q("He didn't buy _____ apples.", ["some", "any", "no"], 1, "否定用 any。", "He didn't buy any apples.", "他没买苹果。"),
    ],
    pairs: [
      P("some tea", "一些茶"),
      P("any milk", "一些牛奶（否/疑）"),
      P("no time", "没有时间"),
      P("Would you like some…?", "想要一些……吗？"),
    ],
    distractors: ["Would you like any tea? (less natural for offer)", "Would you like no tea?"],
    extraChecklist: ["somebody / anybody / nobody 规则类似。"],
  },

  "KP-介词小升初": {
    pNum: "P31",
    title: "介词 in / on / at",
    badge: "小学 · 对齐初中 06",
    juniorHref: "../L05/index.html",
    juniorLabel: "初中 · 方位介词",
    juniorNote: "小学先掌握时间介词与 look at / listen to；初中结合方位与所有格。",
    intro: "19 页：时间介词公式、地点介词、固定搭配、综测。",
    features: ["📅 at/on/in", "📍 地点介词", "👀 look at", "📝 综合测试"],
    formula: {
      lead: "时间：at 时刻，on 日期/星期，in 月/年/上午等较长时段。",
      formula: "at 7:00　on Monday　in July / in the morning",
      parts: [
        S("at", "点钟、夜晚、中午", "at six / at night"),
        S("on", "日、星期、具体某一天的早", "on Monday morning"),
        S("in", "月、年、季节、上午", "in 2026 / in the morning"),
      ],
      samples: [
        { sentence: "We have English class on Monday morning.", zh: "我们星期一上午有英语课。" },
        { sentence: "Don't read in the sun. It's bad for your eyes.", zh: "不要在阳光下看书，对眼睛不好。" },
      ],
    },
    scenes: [
      { title: "例句 · on Monday morning", lead: "具体到星期几的上午用 on。", sentence: "We have English class on Monday morning.", zh: "我们星期一上午有英语课。" },
      { title: "例句 · in the sun", lead: "固定搭配 in the sun。", sentence: "Don't read in the sun.", zh: "不要在阳光下看书。" },
    ],
    trap: {
      question: "「I get up in 7 o'clock.」应改成？",
      choices: [
        { text: "at 7 o'clock（时刻用 at）", correct: true, fb: "钟点用 at。" },
        { text: "on 7 o'clock", correct: false, fb: "on 用于日期。" },
        { text: "at the 7 o'clock", correct: false, fb: "at 后直接加时间。" },
      ],
      sentence: "I get up at 7 o'clock.",
      zh: "我七点起床。",
    },
    transform: {
      lead: "给句子选对时间介词。",
      items: [
        {
          from: "She was born _____ 2012.",
          fromZh: "她出生于 2012 年。",
          steps: [step("填介词", ["She was born in 2012.", "She was born on 2012.", "She was born at 2012."], 0, "年份用 in。", "She was born in 2012.", "她出生于 2012 年。")],
        },
      ],
    },
    extraQs: [
      Q("The party starts _____ Friday evening.", ["in", "on", "at"], 1, "Friday evening 用 on。", "The party starts on Friday evening.", "聚会周五晚上开始。"),
      Q("Birds sing _____ the morning.", ["at", "on", "in"], 2, "in the morning。", "Birds sing in the morning.", "鸟儿在早晨歌唱。"),
      Q("Please look _____ the blackboard.", ["to", "at", "for"], 1, "look at。", "Please look at the blackboard.", "请看黑板。"),
      Q("Listen _____ the teacher carefully.", ["at", "to", "for"], 1, "listen to。", "Listen to the teacher carefully.", "认真听老师讲。"),
      Q("He is waiting _____ the bus stop.", ["for", "at", "on"], 1, "at the bus stop。wait for 是等某人/车。", "He is waiting at the bus stop.", "他在公交站等着。"),
    ],
    pairs: [
      P("at six", "在六点"),
      P("on Monday", "在星期一"),
      P("in July", "在七月"),
      P("look at", "看"),
    ],
    distractors: ["We have English class in Monday morning.", "We have English class at Monday morning."],
    extraChecklist: ["at home / at school / in the sun / on the wall 要整块记。"],
  },

  "KP-特殊疑问词": {
    pNum: "P32",
    title: "特殊疑问词 How / What / Where",
    badge: "小学 · 问答配对",
    juniorHref: "../L01/index.html",
    juniorLabel: "初中 · 疑问句",
    juniorNote: "How often/long/many/much 要和答句配对。",
    intro: "19 页：疑问词公式、How 系列辨析、答句配对、综测。",
    features: ["❓ How often", "⏱ How long", "🔢 How many/much", "📝 综合测试"],
    formula: {
      lead: "疑问词决定答什么；How 系列最容易混。",
      formula: "How often → 频率　　How long → 时长　　How many/much → 数量",
      parts: [
        S("How often", "多久一次", "Twice a week."),
        S("How long", "多长时间", "For two hours."),
        S("How many", "多少（可数）", "Three books."),
      ],
      samples: [
        { sentence: "How often do you go to the library? — Twice a week.", zh: "你多久去一次图书馆？——一周两次。" },
        { sentence: "How long does it take? — About twenty minutes.", zh: "要花多久？——大约二十分钟。" },
      ],
    },
    scenes: [
      { title: "例句 · How often", lead: "答句是频率：once / twice / every day。", sentence: "How often do you go to the library?", zh: "你多久去一次图书馆？" },
      { title: "例句 · How far", lead: "How far 问距离。", sentence: "How far is it from your home to school?", zh: "从你家到学校有多远？" },
    ],
    trap: {
      question: "答句是 Twice a week. 问句用哪个？",
      choices: [
        { text: "How often", correct: true, fb: "频率用 How often。" },
        { text: "How long", correct: false, fb: "How long 答 for two hours。" },
        { text: "How many", correct: false, fb: "How many 答数字+可数名词。" },
      ],
      sentence: "How often do you go to the library? — Twice a week.",
      zh: "你多久去一次图书馆？——一周两次。",
    },
    transform: {
      lead: "根据答句写出问句。",
      items: [
        {
          from: "I have three pencils.",
          fromZh: "我有三支铅笔。",
          steps: [step("对 three 提问", ["How many pencils do you have?", "How much pencils do you have?", "How long pencils do you have?"], 0, "可数用 How many。", "How many pencils do you have?", "你有多少支铅笔？")],
        },
      ],
    },
    extraQs: [
      Q("—_____ is your father? —He is a doctor.", ["What", "Who", "How"], 0, "问职业 What is…?", "What is your father?", "你父亲做什么工作？"),
      Q("—_____ do you live? —In Chengdu.", ["What", "Where", "When"], 1, "地点 Where。", "Where do you live?", "你住在哪里？"),
      Q("—_____ is it from here? —Two kilometres.", ["How long", "How far", "How often"], 1, "距离 How far。", "How far is it from here?", "离这里有多远？"),
      Q("—_____ water do you drink? —Two glasses.", ["How many", "How much", "How long"], 1, "water 不可数 How much。", "How much water do you drink?", "你喝多少水？"),
      Q("—_____ will the meeting last? —Two hours.", ["How often", "How long", "How far"], 1, "持续多久 How long。", "How long will the meeting last?", "会议将持续多久？"),
    ],
    pairs: [
      P("How often", "多久一次"),
      P("How long", "多长时间"),
      P("How far", "多远"),
      P("How many", "多少（可数）"),
    ],
    distractors: ["How long do you go to the library?", "How many do you go to the library?"],
    extraChecklist: ["What + 名词：What colour / What time / What class。"],
  },

  "KP-连词": {
    pNum: "P27",
    title: "连词 because / so / but",
    badge: "小学 · 对齐初中 12",
    juniorHref: "../L11/index.html",
    juniorLabel: "初中 · 状语从句",
    juniorNote: "小学先会连接因果转折；初中第 12 讲系统学状语从句。",
    intro: "19 页：because 原因、so 结果、but 转折，不能 because 与 so 连用。",
    features: ["∵ because", "∴ so", "↔ but", "📝 综合测试"],
    formula: {
      lead: "because 接原因，so 接结果，but 接转折；because 和 so 不能同时用。",
      formula: "… because …　　…, so …　　…, but …",
      parts: [
        S("because", "因为", "because it was raining"),
        S("so", "所以", "so I stayed at home"),
        S("but", "但是", "but I finished it"),
      ],
      samples: [
        { sentence: "I stayed at home because it was raining.", zh: "因为下雨，我待在家里。" },
        { sentence: "It was raining, so I stayed at home.", zh: "下雨了，所以我待在家里。" },
      ],
    },
    scenes: [
      { title: "例句 · because", lead: "because 后面是原因从句。", sentence: "I stayed at home because it was raining.", zh: "因为下雨，我待在家里。" },
      { title: "例句 · but", lead: "but 连接相反信息。", sentence: "He is short, but he runs fast.", zh: "他个子矮，但跑得快。" },
    ],
    trap: {
      question: "「Because it was late, so we took a taxi.」错在哪？",
      choices: [
        { text: "because 和 so 不能一起用，删掉一个", correct: true, fb: "中文「因为……所以」英语只留一个。" },
        { text: "taxi 前要加 the", correct: false, fb: "不是主要错误。" },
        { text: "late 要改成 later", correct: false, fb: "late 正确。" },
      ],
      sentence: "Because it was late, we took a taxi.",
      zh: "因为晚了，我们打了车。",
    },
    transform: {
      lead: "because 句改写成 so 句。",
      items: [
        {
          from: "I stayed at home because it was raining.",
          fromZh: "因为下雨我待在家里。",
          steps: [step("改用 so", ["It was raining, so I stayed at home.", "Because it was raining, so I stayed at home.", "It was raining because I stayed at home."], 0, "前因 so 后果。", "It was raining, so I stayed at home.", "下雨了，所以我待在家里。")],
        },
      ],
    },
    extraQs: [
      Q("The boy has few friends _____ he is shy.", ["so", "because", "but"], 1, "shy 是原因。", "The boy has few friends because he is shy.", "男孩朋友少，因为他害羞。"),
      Q("I like tea, _____ I don't like coffee.", ["because", "so", "but"], 2, "转折 but。", "I like tea, but I don't like coffee.", "我喜欢茶，但不喜欢咖啡。"),
      Q("She worked hard, _____ she passed the test.", ["because", "so", "but"], 1, "结果 so。", "She worked hard, so she passed the test.", "她很努力，所以通过了考试。"),
      Q("_____ he was ill, he still came to school.", ["Because", "Although", "So"], 1, "虽然……仍然：Although（与 but 不连用）。", "Although he was ill, he still came to school.", "虽然他病了，仍来上学。"),
      Q("Turn off the light _____ you leave.", ["so", "before", "because"], 1, "时间 before。", "Turn off the light before you leave.", "走之前关灯。"),
    ],
    pairs: [
      P("because", "因为"),
      P("so", "所以"),
      P("but", "但是"),
      P("although", "虽然"),
    ],
    distractors: ["I stayed at home so it was raining.", "Because it was raining, so I stayed at home."],
    extraChecklist: ["although 不与 but 连用，和 because/so 是同一类易错。"],
  },

  "KP-物主代词": {
    pNum: "P12",
    title: "物主代词 my / mine",
    badge: "小学 · 对齐初中 06",
    juniorHref: "../L05/index.html",
    juniorLabel: "初中 · 五种代词",
    juniorNote: "形容词性 + 名词；名词性独立使用。",
    intro: "19 页：my book vs mine、his 特殊、ours/yours/theirs、综测。",
    features: ["📘 my + 名", "🎁 mine 独立", "🔄 句型转换", "📝 综合测试"],
    formula: {
      lead: "形容词性物主代词后面必须有名词；名词性物主代词单独用。",
      formula: "my book = mine　　your pen = yours",
      parts: [
        S("形物", "my/your/his/her/our/their", "my book"),
        S("名物", "mine/yours/his/hers/ours/theirs", "mine"),
      ],
      samples: [
        { sentence: "This book is mine. Yours is on the desk.", zh: "这本书是我的。你的在桌子上。" },
        { sentence: "This pen isn't mine. It's hers.", zh: "这支笔不是我的。是她的。" },
      ],
    },
    scenes: [
      { title: "例句 · mine / yours", lead: "后面没有名词时用 mine/yours。", sentence: "This book is mine. Yours is on the desk.", zh: "这本书是我的。你的在桌子上。" },
      { title: "例句 · his 两种同形", lead: "his 既是形容词性也是名词性。", sentence: "This is his bag. That bag is also his.", zh: "这是他的包。那个包也是他的。" },
    ],
    trap: {
      question: "「This is mine book.」应改成？",
      choices: [
        { text: "This is my book. 或 This book is mine.", correct: true, fb: "mine 后面不能再加名词。" },
        { text: "This is I book.", correct: false, fb: "要用 my。" },
        { text: "This is me book.", correct: false, fb: "me 是宾格。" },
      ],
      sentence: "This is my book.",
      zh: "这是我的书。",
    },
    transform: {
      lead: "my + 名词 改成 名词性物主。",
      items: [
        {
          from: "This is her bike.",
          fromZh: "这是她的自行车。",
          steps: [step("改成：这辆自行车是她的", ["This bike is hers.", "This bike is her.", "This bike is she's."], 0, "hers 独立使用。", "This bike is hers.", "这辆自行车是她的。")],
        },
      ],
    },
    extraQs: [
      Q("_____ classroom is big. _____ is bigger.", ["Our; Their", "Ours; Theirs", "Our; Theirs"], 2, "前有名词用 Our，后独立用 Theirs。", "Our classroom is big. Theirs is bigger.", "我们的教室大。他们的更大。"),
      Q("Is this pencil _____?", ["you", "your", "yours"], 2, "后面无名词用 yours。", "Is this pencil yours?", "这支铅笔是你的吗？"),
      Q("The cat washed _____ face.", ["it", "it's", "its"], 2, "its 物主，it's = it is。", "The cat washed its face.", "猫洗了它的脸。"),
      Q("These seats are _____.", ["our", "ours", "us"], 1, "独立用 ours。", "These seats are ours.", "这些座位是我们的。"),
      Q("_____ name is Emma. What's _____?", ["Her; yours", "Hers; your", "She; yours"], 0, "Her name；yours 独立。", "Her name is Emma. What's yours?", "她叫艾玛。你呢？"),
    ],
    pairs: [
      P("my book", "我的书"),
      P("mine", "我的（独立）"),
      P("hers", "她的（独立）"),
      P("theirs", "他们的（独立）"),
    ],
    distractors: ["This book is my. Yours is on the desk.", "This book is mine book."],
    extraChecklist: ["his 形物=名物；its 没有 it's 的撇号。"],
  },

  "KP-同级比较as": {
    pNum: "P16",
    title: "同级比较 as…as",
    badge: "小学 · 对齐初中 08",
    juniorHref: "../L07/index.html",
    juniorLabel: "初中 · 比较级与最高级",
    juniorNote: "as + 原级 + as；不要写成 as taller as。",
    intro: "19 页：原级比较公式、not as…as、与 than 区分、综测。",
    features: ["⚖️ as…as", "🚫 not as…as", "🆚 than", "📝 综合测试"],
    formula: {
      lead: "两者程度相同：as + 原级 + as。",
      formula: "A is as + 原级 + as B",
      parts: [
        S("as", "第一个 as", "as"),
        S("原级", "不用 -er", "tall"),
        S("as", "第二个 as", "as his brother"),
      ],
      samples: [
        { sentence: "Tom is as tall as his brother.", zh: "汤姆和他哥哥一样高。" },
        { sentence: "This book is not as interesting as that one.", zh: "这本书不如那本有趣。" },
      ],
    },
    scenes: [
      { title: "例句 · 一样高", lead: "tall 保持原级，不加 -er。", sentence: "Tom is as tall as his brother.", zh: "汤姆和他哥哥一样高。" },
      { title: "例句 · 不如", lead: "not as…as = 不如。", sentence: "This story is not as long as that one.", zh: "这个故事不如那个长。" },
    ],
    trap: {
      question: "「He is as taller as me.」应改成？",
      choices: [
        { text: "as tall as（中间用原级）", correct: true, fb: "as…as 夹原级。" },
        { text: "taller as", correct: false, fb: "比较级配 than，不配 as。" },
        { text: "as more tall as", correct: false, fb: "更错。" },
      ],
      sentence: "He is as tall as me.",
      zh: "他和我一样高。",
    },
    transform: {
      lead: "比较级句改成 not as…as。",
      items: [
        {
          from: "Jack is taller than Tom.",
          fromZh: "杰克比汤姆高。",
          steps: [step("改成：汤姆不如杰克高", ["Tom is not as tall as Jack.", "Tom is not as taller as Jack.", "Tom is not taller as Jack."], 0, "not as + 原级 + as。", "Tom is not as tall as Jack.", "汤姆不如杰克高。")],
        },
      ],
    },
    extraQs: [
      Q("She runs _____ fast _____ Lily.", ["as; as", "so; than", "as; than"], 0, "as fast as。", "She runs as fast as Lily.", "她跑得和莉莉一样快。"),
      Q("This bag is not _____ expensive _____ that one.", ["as; as", "so; so", "more; as"], 0, "not as…as。", "This bag is not as expensive as that one.", "这个包不如那个贵。"),
      Q("Math is _____ interesting as PE. （否定）", ["as", "not as", "more as"], 1, "not as interesting as。", "Math is not as interesting as PE.", "数学不如体育有趣。"),
      Q("He has _____ many books _____ I do.", ["as; as", "so; than", "as; than"], 0, "as many + 复数 + as。", "He has as many books as I do.", "他的书和我的一样多。"),
      Q("Please come _____ possible.", ["as soon as", "as soon than", "so soon as"], 0, "as soon as possible。", "Please come as soon as possible.", "请尽快来。"),
    ],
    pairs: [
      P("as tall as", "和……一样高"),
      P("not as…as", "不如"),
      P("as soon as possible", "尽快"),
      P("as many as", "和……一样多"),
    ],
    distractors: ["Tom is as taller as his brother.", "Tom is taller as his brother."],
    extraChecklist: ["as…as 中间是原级；than 前面才是比较级。"],
  },

  "KP-频度副词": {
    pNum: "P33",
    title: "频度副词 always / usually / often",
    badge: "小学 · 对齐初中 03",
    juniorHref: "../L01/index.html",
    juniorLabel: "初中 · 一般现在时",
    juniorNote: "位置：be 后、实义动词前；常与一般现在时连用。",
    intro: "19 页：频率排序、位置规则、与 How often 问答、综测。",
    features: ["📊 频率排序", "📍 位置", "❓ How often", "📝 综合测试"],
    formula: {
      lead: "频度副词表示动作发生的频率，常与一般现在时连用。",
      formula: "always > usually > often > sometimes > never",
      parts: [
        S("be 后", "is always", "He is always late."),
        S("实义前", "always gets", "Tom always gets up early."),
      ],
      samples: [
        { sentence: "Tom always gets up early on school days.", zh: "汤姆上学日总是早起。" },
        { sentence: "My sister usually does her homework before dinner.", zh: "我姐姐通常晚饭前做作业。" },
      ],
    },
    scenes: [
      { title: "例句 · always + 实义", lead: "always 放在 gets 前面。", sentence: "Tom always gets up early on school days.", zh: "汤姆上学日总是早起。" },
      { title: "例句 · be + always", lead: "be 动词后面再加频度副词。", sentence: "She is always friendly to us.", zh: "她对我们总是很友好。" },
    ],
    trap: {
      question: "「He gets always up early.」应改成？",
      choices: [
        { text: "always gets up（实义动词前）", correct: true, fb: "频度副词在实义动词前。" },
        { text: "gets up always early", correct: false, fb: "位置不对。" },
        { text: "is always gets up", correct: false, fb: "不能同时用 is 和 gets。" },
      ],
      sentence: "He always gets up early.",
      zh: "他总是早起。",
    },
    transform: {
      lead: "把频度副词放到正确位置。",
      items: [
        {
          from: "He is late. (always)",
          fromZh: "他迟到。（总是）",
          steps: [step("插入 always", ["He is always late.", "He always is late.", "He is late always."], 0, "be 后 always。", "He is always late.", "他总是迟到。")],
        },
      ],
    },
    extraQs: [
      Q("I _____ walk to school. I take the bus.", ["always", "never", "usually"], 1, "坐公交说明 never walk。", "I never walk to school. I take the bus.", "我从不走路上学，我坐公交。"),
      Q("They _____ play football on Sundays. （通常）", ["never", "usually", "seldom"], 1, "usually 通常。", "They usually play football on Sundays.", "他们通常周日踢球。"),
      Q("_____ do you go swimming? — Once a week.", ["How long", "How often", "How far"], 1, "问频率 How often。", "How often do you go swimming?", "你多久游一次泳？"),
      Q("We _____ have rice for lunch, but not every day.", ["always", "sometimes", "never"], 1, "不是每天 → sometimes。", "We sometimes have rice for lunch.", "我们有时午饭吃米饭。"),
      Q("The students are _____ on time.", ["often", "oftenly", "oftens"], 0, "often 无 -ly。", "The students are often on time.", "学生们经常准时。"),
    ],
    pairs: [
      P("always", "总是 100%"),
      P("usually", "通常"),
      P("sometimes", "有时"),
      P("never", "从不"),
    ],
    distractors: ["Tom gets always up early on school days.", "Tom is always get up early."],
    extraChecklist: ["sometimes 也可放句首：Sometimes I read in bed."],
  },

  "KP-stop-try-doing": {
    pNum: "P25",
    title: "stop / try + to do / doing",
    badge: "小学 · 非谓语辨析",
    juniorHref: "../L00-主谓宾与非谓语/index.html",
    juniorLabel: "初中 · 主谓宾与非谓语",
    juniorNote: "stop to do ≠ stop doing，意思完全相反。",
    intro: "19 页：两组公式、情景辨析、分类、综测。",
    features: ["🛑 stop doing", "☕ stop to do", "🧪 try", "📝 综合测试"],
    formula: {
      lead: "to do 和 doing 意思不同，必须靠情景判断。",
      formula: "stop to do = 停下来去做　　stop doing = 停止正在做",
      parts: [
        S("stop to do", "停下来去做另一件事", "stopped to have a rest"),
        S("stop doing", "停止正在做的事", "stop talking"),
        S("try to do", "努力去做", "try to finish"),
        S("try doing", "试着做做看", "try restarting"),
      ],
      samples: [
        { sentence: "He stopped to have a rest.", zh: "他停下来休息。" },
        { sentence: "The teacher told us to stop talking.", zh: "老师让我们停止讲话。" },
      ],
    },
    scenes: [
      { title: "例句 · stop to do", lead: "停下正在走的路，去休息。", sentence: "He stopped to have a rest.", zh: "他停下来休息。" },
      { title: "例句 · stop doing", lead: "停止 talking 这件事。", sentence: "Stop talking and listen to me.", zh: "别说话，听我说。" },
    ],
    trap: {
      question: "走在路上累了，要「停下来休息」用哪个？",
      choices: [
        { text: "stop to have a rest", correct: true, fb: "停下来去做 rest。" },
        { text: "stop having a rest", correct: false, fb: "那是停止休息=继续赶路。" },
        { text: "stop have a rest", correct: false, fb: "缺 to 或 -ing。" },
      ],
      sentence: "He stopped to have a rest.",
      zh: "他停下来休息。",
    },
    transform: {
      lead: "根据中文选择 to do 或 doing。",
      items: [
        {
          from: "Please stop. Then read the text.",
          fromZh: "请停下来，然后读课文。",
          steps: [step("合成一句", ["Please stop to read the text.", "Please stop reading the text.", "Please stop read the text."], 0, "停下来去做 read。", "Please stop to read the text.", "请停下来去读课文。")],
        },
      ],
    },
    extraQs: [
      Q("The teacher told us to stop _____ and listen.", ["talk", "to talk", "talking"], 2, "停止讲话 stop talking。", "The teacher told us to stop talking and listen.", "老师让我们停止讲话并听讲。"),
      Q("I'm tired. Let's stop _____ a rest.", ["having", "to have", "have"], 1, "停下来去休息。", "Let's stop to have a rest.", "我们停下来休息吧。"),
      Q("If the computer doesn't work, try _____ it.", ["restart", "restarting", "restarted"], 1, "试一试重启 try doing。", "Try restarting it.", "试着重启它。"),
      Q("He tried _____ the heavy box, but failed.", ["to lift", "lifting", "lift"], 0, "努力去举起 try to do。", "He tried to lift the heavy box, but failed.", "他努力去搬那个重箱子，但失败了。"),
      Q("She stopped _____ when the teacher came in.", ["to write", "writing", "write"], 1, "停止正在写。", "She stopped writing when the teacher came in.", "老师进来时她停止了写字。"),
    ],
    pairs: [
      P("stop to do", "停下来去做"),
      P("stop doing", "停止正在做"),
      P("try to do", "努力去做"),
      P("try doing", "试着做做看"),
    ],
    distractors: ["He stopped having a rest. (means he no longer rested)", "He stopped have a rest."],
    extraChecklist: ["remember to do 记得要做；remember doing 记得做过。初中可拓展。"],
  },

  "KP-规则复数": {
    pNum: "P06",
    title: "名词规则复数",
    badge: "小学 · 对齐初中名词",
    juniorHref: "../L06-小学名词复数/index.html",
    juniorLabel: "小学 · 不规则复数",
    juniorNote: "与不规则复数课配套：先规则，再不规则。",
    intro: "19 页：-s/-es、y→ies、元音+y 加 s，和 libraries 真题。",
    features: ["➕ -s", "📦 -es", "🔄 y→ies", "📝 综合测试"],
    formula: {
      lead: "大多数可数名词变复数有规律。",
      formula: "+s　/　s·x·ch·sh +es　/　辅音+y → ies",
      parts: [
        S("+s", "一般", "books / days"),
        S("+es", "s/x/ch/sh", "boxes / watches"),
        S("ies", "辅音+y", "libraries / babies"),
      ],
      samples: [
        { sentence: "There are two libraries in our school.", zh: "我们学校有两座图书馆。" },
        { sentence: "The babies are sleeping.", zh: "婴儿们在睡觉。" },
      ],
    },
    scenes: [
      { title: "例句 · libraries", lead: "library：辅音 r + y → libraries。", sentence: "There are two libraries in our school.", zh: "我们学校有两座图书馆。" },
      { title: "例句 · boxes", lead: "x 结尾加 es。", sentence: "Put the books into the boxes.", zh: "把书放进箱子里。" },
    ],
    trap: {
      question: "「There are many librarys in the city.」应改成？",
      choices: [
        { text: "libraries（y→ies）", correct: true, fb: "辅音+y 变 ies。" },
        { text: "libraryes", correct: false, fb: "不是加 es 那么简单。" },
        { text: "library", correct: false, fb: "many 要复数。" },
      ],
      sentence: "There are many libraries in the city.",
      zh: "这座城市有许多图书馆。",
    },
    transform: {
      lead: "单数变复数。",
      items: [
        {
          from: "I have one toy.",
          fromZh: "我有一个玩具。",
          steps: [step("两个玩具（元音+y 只加 s）", ["I have two toys.", "I have two toies.", "I have two toyes."], 0, "toy：元音+y 加 s。", "I have two toys.", "我有两个玩具。")],
        },
      ],
    },
    extraQs: [
      Q("She has three _____. (watch)", ["watchs", "watches", "watch"], 1, "ch + es。", "She has three watches.", "她有三块手表。"),
      Q("There are two _____ on the table. (tomato)", ["tomatos", "tomatoes", "tomato"], 1, "tomato + es。", "There are two tomatoes on the table.", "桌上有两个番茄。"),
      Q("The _____ are crying. (baby)", ["babys", "babies", "babyes"], 1, "baby → babies。", "The babies are crying.", "婴儿们在哭。"),
      Q("I need two _____. (knife)", ["knifes", "knives", "knive"], 1, "f/fe → ves。", "I need two knives.", "我需要两把刀。"),
      Q("He bought some _____. (photo)", ["photoes", "photos", "photo"], 1, "photo 只加 s。", "He bought some photos.", "他买了一些照片。"),
    ],
    pairs: [
      P("books", "书（+s）"),
      P("boxes", "箱子（+es）"),
      P("libraries", "图书馆（ies）"),
      P("knives", "刀（ves）"),
    ],
    distractors: ["There are two librarys in our school.", "There are two library in our school."],
    extraChecklist: ["photo/piano/radio 只加 s；tomato/potato/hero 加 es。"],
  },

  "KP-反义疑问句": {
    pNum: "P21",
    title: "反义疑问句 · shall we",
    badge: "小学 · 交际高频",
    juniorHref: "../L06/index.html",
    juniorLabel: "初中 · 情态与交际",
    juniorNote: "Let's…, shall we? 小升初/中考口语常考。",
    intro: "19 页：前肯后否、Let's shall we、祈使句 will you、综测。",
    features: ["↔️ 前肯后否", "🏀 Let's…, shall we?", "🙏 will you", "📝 综合测试"],
    formula: {
      lead: "前面肯定，后面否定；前面否定，后面肯定。",
      formula: "陈述句，+ 简短问句？",
      parts: [
        S("Let's", "shall we?", "Let's play, shall we?"),
        S("祈使句", "will you?", "Sit down, will you?"),
        S("一般", "前肯后否", "He is tall, isn't he?"),
      ],
      samples: [
        { sentence: "Let's play basketball, shall we?", zh: "我们去打篮球吧，好吗？" },
        { sentence: "She likes English, doesn't she?", zh: "她喜欢英语，不是吗？" },
      ],
    },
    scenes: [
      { title: "例句 · shall we", lead: "Let's 开头，反问一律 shall we。", sentence: "Let's play basketball, shall we?", zh: "我们去打篮球吧，好吗？" },
      { title: "例句 · doesn't she", lead: "前肯 likes，后否 doesn't she。", sentence: "She likes English, doesn't she?", zh: "她喜欢英语，不是吗？" },
    ],
    trap: {
      question: "「Let's go to the park, will you?」应改成？",
      choices: [
        { text: "shall we", correct: true, fb: "Let's 用 shall we，Let us 才常用 will you。" },
        { text: "do we", correct: false, fb: "不是 do we。" },
        { text: "won't you", correct: false, fb: "Let's 不用 won't you。" },
      ],
      sentence: "Let's go to the park, shall we?",
      zh: "我们去公园吧，好吗？",
    },
    transform: {
      lead: "给陈述句补反意疑问。",
      items: [
        {
          from: "You are a student.",
          fromZh: "你是学生。",
          steps: [step("补反问", ["You are a student, aren't you?", "You are a student, are you?", "You are a student, don't you?"], 0, "前肯 are → aren't you。", "You are a student, aren't you?", "你是学生，对吧？")],
        },
      ],
    },
    extraQs: [
      Q("He can swim, _____?", ["can he", "can't he", "doesn't he"], 1, "前肯 can，后否 can't he。", "He can swim, can't he?", "他会游泳，不是吗？"),
      Q("They don't like coffee, _____?", ["do they", "don't they", "are they"], 0, "前否 don't，后肯 do they。", "They don't like coffee, do they?", "他们不喜欢咖啡，是吗？"),
      Q("Open the door, _____?", ["shall we", "will you", "do you"], 1, "祈使句 will you。", "Open the door, will you?", "打开门，好吗？"),
      Q("There is a book, _____?", ["isn't there", "isn't it", "is there"], 0, "There be 反问用 there。", "There is a book, isn't there?", "有一本书，对吧？"),
      Q("Let's have a rest, _____?", ["will you", "shall we", "don't we"], 1, "Let's → shall we。", "Let's have a rest, shall we?", "我们休息一下吧，好吗？"),
    ],
    pairs: [
      P("shall we?", "好吗？（Let's）"),
      P("will you?", "好吗？（祈使）"),
      P("isn't he?", "不是吗？"),
      P("do they?", "是吗？（前否后肯）"),
    ],
    distractors: ["Let's play basketball, will you?", "Let's play basketball, do we?"],
    extraChecklist: ["反问部分的主语要用代词，不用名词。"],
  },

  "KP-定语从句": {
    pNum: "P29",
    title: "定语从句 · who / which / that",
    badge: "小学入门 · 对齐初中 14",
    juniorHref: "../L13-定语从句/index.html",
    juniorLabel: "初中 · 定语从句",
    juniorNote: "小学先分清 who 指人、which/that 指物；初中第 14 讲学介词+which。",
    intro: "19 页入门：修饰名词、关系代词、指人指物、综测。",
    features: ["👤 who", "📦 which/that", "🔗 紧跟先行词", "📝 综合测试"],
    formula: {
      lead: "定语从句用来修饰前面的名词（先行词）。",
      formula: "名词 + who/which/that + 从句",
      parts: [
        S("who", "指人", "the boy who…"),
        S("which", "指物", "the book which…"),
        S("that", "人/物常可", "the girl that…"),
      ],
      samples: [
        { sentence: "The boy who lives next door is my friend.", zh: "住在隔壁的男孩是我的朋友。" },
        { sentence: "I like the book that you gave me.", zh: "我喜欢你给我的那本书。" },
      ],
    },
    scenes: [
      { title: "例句 · who 指人", lead: "the boy 是人 → who。", sentence: "The boy who lives next door is my friend.", zh: "住在隔壁的男孩是我的朋友。" },
      { title: "例句 · which 指物", lead: "the story 是物 → which/that。", sentence: "This is the story which we read yesterday.", zh: "这就是我们昨天读的故事。" },
    ],
    trap: {
      question: "「The girl which won the race is from our class.」应改成？",
      choices: [
        { text: "who（人不用 which）", correct: true, fb: "指人用 who/that，不用 which。" },
        { text: "where", correct: false, fb: "where 指地点。" },
        { text: "what", correct: false, fb: "定语从句不用 what 引导。" },
      ],
      sentence: "The girl who won the race is from our class.",
      zh: "赢得比赛的女孩是我们班的。",
    },
    transform: {
      lead: "把两句合成定语从句。",
      items: [
        {
          from: "I have a friend. He can swim well.",
          fromZh: "我有一个朋友。他游泳很好。",
          steps: [step("合成一句", ["I have a friend who can swim well.", "I have a friend which can swim well.", "I have a friend he can swim well."], 0, "friend 是人 → who。", "I have a friend who can swim well.", "我有一个游泳很好的朋友。")],
        },
      ],
    },
    extraQs: [
      Q("The book _____ is on the desk is mine.", ["who", "which", "where"], 1, "book 指物 which/that。", "The book which is on the desk is mine.", "桌上那本书是我的。"),
      Q("Do you know the man _____ is talking to Miss Li?", ["which", "who", "what"], 1, "man 指人 who。", "Do you know the man who is talking to Miss Li?", "你认识正在和李老师说话的那个人吗？"),
      Q("This is the school _____ I study.", ["who", "which", "where"], 2, "school 地点，从句缺地点状语 → where。", "This is the school where I study.", "这是我上学的学校。"),
      Q("I lost the pen _____ I bought yesterday.", ["who", "that", "where"], 1, "pen 指物 that/which。", "I lost the pen that I bought yesterday.", "我把昨天买的笔弄丢了。"),
      Q("The students _____ are from Chengdu can speak Sichuan dialect.", ["which", "who", "where"], 1, "students 指人 who。", "The students who are from Chengdu can speak Sichuan dialect.", "来自成都的学生会说四川话。"),
    ],
    pairs: [
      P("who", "指人"),
      P("which", "指物"),
      P("that", "人/物"),
      P("where", "指地点"),
    ],
    distractors: ["The boy which lives next door is my friend.", "The boy lives next door who is my friend."],
    extraChecklist: ["关系词要紧跟先行词，不要把从句放太远。"],
  },

  "KP-both-either": {
    pNum: "P34",
    title: "both…and / either…or",
    badge: "小学 · 并列连词",
    juniorHref: "../L11/index.html",
    juniorLabel: "初中 · 连词逻辑",
    juniorNote: "both 动词用复数；either…or 就近原则。",
    intro: "19 页：两者都、二选一、两者都不 neither、就近、综测。",
    features: ["👫 both…and", "🔀 either…or", "🚫 neither…nor", "📝 综合测试"],
    formula: {
      lead: "谈「两个」时选准连词，并注意动词单复数。",
      formula: "both A and B（复数）　either A or B（就近）",
      parts: [
        S("both…and", "两者都", "Both dad and mum are…"),
        S("either…or", "要么A要么B", "either tea or coffee"),
        S("neither…nor", "两者都不", "neither…nor…"),
      ],
      samples: [
        { sentence: "Both my father and my mother are doctors.", zh: "我爸爸和妈妈都是医生。" },
        { sentence: "Either you or he is right.", zh: "要么你对，要么他对。" },
      ],
    },
    scenes: [
      { title: "例句 · both…and 复数", lead: "两个人作主语 → are。", sentence: "Both my father and my mother are doctors.", zh: "我爸爸和妈妈都是医生。" },
      { title: "例句 · either 就近", lead: "靠近动词的是 he → is。", sentence: "Either you or he is right.", zh: "要么你对，要么他对。" },
    ],
    trap: {
      question: "「Both my brother and my sister is good at swimming.」应改成？",
      choices: [
        { text: "are（both…and 后动词用复数）", correct: true, fb: "两者都 → 复数。" },
        { text: "am", correct: false, fb: "主语不是 I。" },
        { text: "be", correct: false, fb: "陈述句用 are。" },
      ],
      sentence: "Both my brother and my sister are good at swimming.",
      zh: "我哥哥和姐姐都擅长游泳。",
    },
    transform: {
      lead: "both 句改成 neither 否定。",
      items: [
        {
          from: "Both Tom and Jack like football.",
          fromZh: "汤姆和杰克都喜欢足球。",
          steps: [step("改成两者都不喜欢", ["Neither Tom nor Jack likes football.", "Both Tom and Jack don't likes football.", "Neither Tom or Jack like football."], 0, "neither…nor + 就近 likes。", "Neither Tom nor Jack likes football.", "汤姆和杰克都不喜欢足球。")],
        },
      ],
    },
    extraQs: [
      Q("You can take _____ the red bag _____ the blue one. They're both OK.", ["either; or", "both; or", "neither; and"], 0, "二选一 either…or。", "You can take either the red bag or the blue one.", "红包蓝包都可以选一个。"),
      Q("_____ Lily _____ Lucy has been to Beijing. （两人都不）", ["Both; and", "Either; or", "Neither; nor"], 2, "neither…nor。", "Neither Lily nor Lucy has been to Beijing.", "莉莉和露西都没去过北京。"),
      Q("Both of the answers _____ correct.", ["is", "are", "be"], 1, "both of + 复数 are。", "Both of the answers are correct.", "两个答案都对。"),
      Q("Either the students or the teacher _____ going to speak.", ["are", "is", "be"], 1, "就近 teacher → is。", "Either the students or the teacher is going to speak.", "要么学生说，要么老师说。"),
      Q("She can _____ sing _____ dance. She is talented.", ["either; or", "both; and", "neither; nor"], 1, "两者都会 both…and。", "She can both sing and dance.", "她既会唱歌又会跳舞。"),
    ],
    pairs: [
      P("both…and", "两者都"),
      P("either…or", "要么……要么"),
      P("neither…nor", "既不……也不"),
      P("就近原则", "靠近动词的名词决定单复数"),
    ],
    distractors: ["Both my father and my mother is doctors.", "Both my father or my mother are doctors."],
    extraChecklist: ["neither…nor 也遵循就近原则。"],
  },

  "KP-反身代词": {
    pNum: "P13",
    title: "反身代词 myself / yourself",
    badge: "小学 · 对齐初中 06",
    juniorHref: "../L05/index.html",
    juniorLabel: "初中 · 五种代词",
    juniorNote: "主语和宾语是同一人时用反身代词。",
    intro: "19 页：myself 系列、enjoy oneself、by myself、综测。",
    features: ["🪞 myself", "🎉 enjoy oneself", "🚶 by myself", "📝 综合测试"],
    formula: {
      lead: "动作回到主语自己身上时用反身代词。",
      formula: "I → myself　you → yourself/yourselves　he → himself",
      parts: [
        S("单数", "-self", "myself / himself / herself"),
        S("复数", "-selves", "ourselves / themselves"),
      ],
      samples: [
        { sentence: "The children enjoyed themselves at the party.", zh: "孩子们在聚会上玩得很开心。" },
        { sentence: "I can finish it by myself.", zh: "我能自己完成。" },
      ],
    },
    scenes: [
      { title: "例句 · enjoyed themselves", lead: "children 复数 → themselves。", sentence: "The children enjoyed themselves at the party.", zh: "孩子们在聚会上玩得很开心。" },
      { title: "例句 · by myself", lead: "by oneself = 独自。", sentence: "I made the card by myself.", zh: "这张卡片是我自己做的。" },
    ],
    trap: {
      question: "「He enjoyed hisself at the picnic.」应改成？",
      choices: [
        { text: "himself（he → himself）", correct: true, fb: "没有 hisself 这种形式。" },
        { text: "him", correct: false, fb: "enjoy 后常用反身。" },
        { text: "heself", correct: false, fb: "错误形式。" },
      ],
      sentence: "He enjoyed himself at the picnic.",
      zh: "他在野餐时玩得很开心。",
    },
    transform: {
      lead: "把 them 改成正确的反身代词。",
      items: [
        {
          from: "The students enjoyed them at the picnic.",
          fromZh: "学生们在野餐时玩得很开心。（错误）",
          steps: [step("改正", ["The students enjoyed themselves at the picnic.", "The students enjoyed themself at the picnic.", "The students enjoyed theirselves at the picnic."], 0, "复数 themselves。", "The students enjoyed themselves at the picnic.", "学生们在野餐时玩得很开心。")],
        },
      ],
    },
    extraQs: [
      Q("Help _____, please. The cakes are for you. (you 复数)", ["yourself", "yourselves", "you"], 1, "你们自己 yourselves。", "Help yourselves, please.", "请你们随便吃。"),
      Q("She looked at _____ in the mirror.", ["her", "herself", "she"], 1, "看自己 herself。", "She looked at herself in the mirror.", "她看着镜子里的自己。"),
      Q("We should look after _____.", ["us", "ourselves", "ourself"], 1, "我们自己 ourselves。", "We should look after ourselves.", "我们应该照顾好自己。"),
      Q("The little boy can dress _____.", ["him", "himself", "he"], 1, "自己穿衣服 himself。", "The little boy can dress himself.", "小男孩能自己穿衣服。"),
      Q("Don't worry. I can do it _____.", ["me", "my", "myself"], 2, "by 可省略，myself。", "I can do it myself.", "我能自己做。"),
    ],
    pairs: [
      P("myself", "我自己"),
      P("yourself", "你自己"),
      P("themselves", "他们自己"),
      P("enjoy oneself", "玩得开心"),
    ],
    distractors: ["The children enjoyed them at the party.", "The children enjoyed theirselves at the party."],
    extraChecklist: ["没有 theirselves / hisself；复数一定是 -selves。"],
  },

  "KP-so-such": {
    pNum: "P35",
    title: "so…that / such…that",
    badge: "小学 · 对齐初中 12",
    juniorHref: "../L11/index.html",
    juniorLabel: "初中 · 结果状语从句",
    juniorNote: "so 后接形/副；such 后接名词短语。",
    intro: "19 页：so/such 公式、such a/an、与 too…to 转换、综测。",
    features: ["🌡 so + 形", "📦 such + 名", "➡️ that 结果", "📝 综合测试"],
    formula: {
      lead: "so…that 与 such…that 都表示「如此……以至于」。",
      formula: "so + 形/副 + that　　such + (a/an) + 形 + 名 + that",
      parts: [
        S("so", "形容词/副词", "so hot that…"),
        S("such", "名词短语", "such a hot day that…"),
      ],
      samples: [
        { sentence: "It was so hot that we stayed inside.", zh: "天太热了，以至于我们待在室内。" },
        { sentence: "It was such a hot day that we stayed inside.", zh: "那是如此炎热的一天，我们待在室内。" },
      ],
    },
    scenes: [
      { title: "例句 · so + 形", lead: "so 直接加 hot。", sentence: "It was so hot that we stayed inside.", zh: "天太热了，以至于我们待在室内。" },
      { title: "例句 · such a + 名", lead: "such a heavy box。", sentence: "It was such a heavy box that I couldn't carry it.", zh: "箱子那么重，我搬不动。" },
    ],
    trap: {
      question: "「He is so a clever boy that everyone likes him.」应改成？",
      choices: [
        { text: "such a clever boy 或 so clever a boy", correct: true, fb: "名词前用 such a；so 要放在形容词前：so clever a boy。" },
        { text: "so clever boy", correct: false, fb: "缺冠词。" },
        { text: "such clever boy", correct: false, fb: "可数单数要 a。" },
      ],
      sentence: "He is such a clever boy that everyone likes him.",
      zh: "他是如此聪明的男孩，大家都喜欢他。",
    },
    transform: {
      lead: "so 句改 such 句。",
      items: [
        {
          from: "The film was so interesting that I saw it twice.",
          fromZh: "电影太有趣了，我看了两遍。",
          steps: [step("改用 such", ["It was such an interesting film that I saw it twice.", "It was so an interesting film that I saw it twice.", "It was such interesting film that I saw it twice."], 0, "such an interesting film。", "It was such an interesting film that I saw it twice.", "那是一部如此有趣的电影，我看了两遍。")],
        },
      ],
    },
    extraQs: [
      Q("The box was _____ heavy _____ I couldn't carry it.", ["such; that", "so; that", "so; as"], 1, "so + 形 + that。", "The box was so heavy that I couldn't carry it.", "箱子太重，我搬不动。"),
      Q("It was _____ weather that we stayed home.", ["so bad", "such bad", "so a bad"], 1, "weather 不可数，such bad weather。", "It was such bad weather that we stayed home.", "天气那么糟，我们待在家里。"),
      Q("She spoke _____ quietly _____ we couldn't hear her.", ["such; that", "so; that", "too; that"], 1, "so + 副词。", "She spoke so quietly that we couldn't hear her.", "她说得那么轻，我们听不见。"),
      Q("He is _____ honest boy that we all trust him.", ["so", "such", "such an"], 2, "honest 元音音素 such an。", "He is such an honest boy that we all trust him.", "他是如此诚实的男孩，我们都信任他。"),
      Q("The problem is so easy that I can work it out. = The problem is _____ easy _____ work out.", ["too; to", "enough; to", "so; to"], 1, "easy enough to。也可 too difficult 相反转换。", "The problem is easy enough to work out.", "这题足够简单，我能做出来。"),
    ],
    pairs: [
      P("so hot that", "如此热以至于"),
      P("such a heavy box", "如此重的箱子"),
      P("such bad weather", "如此糟糕的天气"),
      P("so quietly that", "如此轻声以至于"),
    ],
    distractors: ["It was such hot that we stayed inside.", "It was so a hot day that we stayed inside."],
    extraChecklist: ["so many / so much 是固定搭配，即使后面有名词也不改 such。"],
  },

  "KP-want-need": {
    pNum: "P26",
    title: "want to / need doing",
    badge: "小学 · 非谓语入门",
    juniorHref: "../L00-主谓宾与非谓语/index.html",
    juniorLabel: "初中 · 主谓宾与非谓语",
    juniorNote: "want to do；need to do；need doing 表被动意味。",
    intro: "19 页：want/would like to do、need 两种结构、综测。",
    features: ["🎯 want to", "🛠 need to", "🧺 need doing", "📝 综合测试"],
    formula: {
      lead: "want / would like 后接 to do；need 可接 to do 或 doing。",
      formula: "want to do　　need to do　　need doing = need to be done",
      parts: [
        S("want", "想要", "want to join"),
        S("need to", "需要去做", "need to wash"),
        S("need doing", "某物需要被……", "needs washing"),
      ],
      samples: [
        { sentence: "I want to join the art club.", zh: "我想加入美术社。" },
        { sentence: "My hair is dirty. It needs washing.", zh: "我头发脏了，需要洗。" },
      ],
    },
    scenes: [
      { title: "例句 · want to do", lead: "人作主语：want to + 原形。", sentence: "I want to join the art club.", zh: "我想加入美术社。" },
      { title: "例句 · need doing", lead: "物作主语：needs washing = needs to be washed。", sentence: "The car needs washing.", zh: "这辆车需要洗。" },
    ],
    trap: {
      question: "「I want joining the club.」应改成？",
      choices: [
        { text: "want to join", correct: true, fb: "want + to do。" },
        { text: "want join", correct: false, fb: "缺 to。" },
        { text: "want joined", correct: false, fb: "不是过去分词。" },
      ],
      sentence: "I want to join the art club.",
      zh: "我想加入美术社。",
    },
    transform: {
      lead: "need to be done 改成 need doing。",
      items: [
        {
          from: "The room needs to be cleaned.",
          fromZh: "房间需要被打扫。",
          steps: [step("改成 need doing", ["The room needs cleaning.", "The room needs clean.", "The room needs to cleaning."], 0, "need + doing 表被动。", "The room needs cleaning.", "房间需要打扫。")],
        },
      ],
    },
    extraQs: [
      Q("She would like _____ a rest.", ["having", "to have", "have"], 1, "would like to do。", "She would like to have a rest.", "她想休息一下。"),
      Q("You need _____ more water.", ["drink", "to drink", "drinking"], 1, "人作主语 need to do。", "You need to drink more water.", "你需要多喝水。"),
      Q("Your shoes need _____.", ["polish", "to polish", "polishing"], 2, "物作主语 need doing。", "Your shoes need polishing.", "你的鞋需要擦。"),
      Q("He doesn't want _____ outside. It's cold.", ["to go", "going", "go"], 0, "want to go。", "He doesn't want to go outside.", "他不想出去。"),
      Q("The flowers need _____ every day.", ["to water", "watering", "watered"], 1, "花需要被浇 → watering。", "The flowers need watering every day.", "花需要每天浇。"),
    ],
    pairs: [
      P("want to join", "想加入"),
      P("would like to", "想要"),
      P("need to do", "需要去做"),
      P("need doing", "需要被……"),
    ],
    distractors: ["I want joining the art club.", "I want join the art club."],
    extraChecklist: ["would like = want，但更礼貌，后接 to do 不接 doing。"],
  },
};
