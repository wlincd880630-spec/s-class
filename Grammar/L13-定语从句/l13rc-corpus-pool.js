/**
 * 定语从句 · 语料与分层题库 v1.0
 * 对齐人教九年级 + 中考：who/whom/which/that · 介词+which · when/where · whose · 限制/非限制
 */
(function (global) {
  "use strict";

  var VERSION = "1.0";

  var P13RC = {
    version: VERSION,
    mergeSteps: [
      "找共同名词（先行词）",
      "主句写到先行词为止",
      "写从句，删去与先行词重复的人/物",
      "用关系词替换，关系词紧挨先行词"
    ],
    whoWhomTable: [
      ["指人 · 作主语", "who", "The girl who won the prize is my cousin."],
      ["指人 · 作宾语", "whom（口语可用 who）", "The teacher whom we respect teaches history."],
      ["指人 · 口语/中考", "who 作宾语也常见", "The man who I met yesterday is kind."]
    ],
    whichThatTable: [
      ["指物 · 作主语", "which / that", "The book which lies on the desk is mine."],
      ["指物 · 作宾语", "which / that 可省略", "The film (that) we watched was moving."],
      ["指物 · 只用 which", "介词后", "This is the house in which he lived."]
    ],
    whenWhereTable: [
      ["时间先行词", "when = 介词+which", "I still remember the day when we first met."],
      ["地点先行词", "where = 介词+which", "This is the school where I studied for three years."],
      ["宾语≠状语", "用 which 不用 when", "The summer which we spent in Yunnan was wonderful."]
    ],
    whoseTable: [
      ["指人或物的「……的」", "whose + 名词", "The boy whose father is a doctor studies hard."],
      ["指物（书面）", "whose / of which", "The house whose roof is red was built in 1990."],
      ["= 名词所有格", "先行词与 whose 后名词相关", "I know a girl whose dream is to be a pilot."]
    ],
    commaRules: [
      "限制性：无逗号，缺了从句意思不完整 → The students who are late must stand outside.",
      "非限制性：逗号隔开，补充说明 → My father, who is a teacher, loves reading.",
      "非限制性不用 that；口语中考以限制性为主。"
    ],
    corpus: [
      ["校园", "The student who studies hardest will get the scholarship.", "学习最刻苦的学生将获得奖学金。"],
      ["校园", "Our classroom is the place where we spend most of our day.", "我们的教室是我们度过一天大部分时间的地方。"],
      ["人物", "Anyone who breaks the school rules will be punished.", "任何违反校规的人都将受到处罚。"],
      ["人物", "The volunteers whom the community praised helped the elderly.", "受到社区表扬的志愿者帮助了老人。"],
      ["科技", "The phone which was released last month has a better camera.", "上个月发布的手机有更好的相机。"],
      ["文化", "Du Fu is a poet whose poems are still widely read today.", "杜甫是一位诗歌至今仍被广泛阅读的诗人。"],
      ["环境", "The city where I was born has become much greener.", "我出生的城市已经变得更绿了。"],
      ["中考", "The moment when the results came out, everyone cheered.", "成绩公布的那一刻，大家都欢呼起来。"],
      ["中考", "This is the reason why he was late for class.", "这就是他上课迟到的原因。"],
      ["写作", "Hangzhou is a city that/which attracts millions of tourists.", "杭州是一座吸引数百万游客的城市。"]
    ],
    whoExamples: [
      { zh: "获奖的女孩是我表妹。", en: "The girl who won the first prize is my cousin.", tier: "A" },
      { zh: "正在门口等的人是我爸爸。", en: "The man who is waiting at the gate is my father.", tier: "A" },
      { zh: "教我们英语的老师很有耐心。", en: "The teacher who teaches us English is very patient.", tier: "A" },
      { zh: "昨天采访的那位科学家很有名。", en: "The scientist whom the reporter interviewed yesterday is famous.", tier: "B" },
      { zh: "你昨天遇到的那个人很友善。", en: "The person whom you met yesterday is very kind.", tier: "B" },
      { zh: "所有想参加社团的同学请报名。", en: "Students who want to join the club should sign up.", tier: "A" },
      { zh: "那位父亲是一位医生的男孩学习很努力。", en: "The boy whose father is a doctor studies very hard.", tier: "C" }
    ],
    whichExamples: [
      { zh: "桌上的那本书是我的。", en: "The book which lies on the desk is mine.", tier: "A" },
      { zh: "我们昨天看的那部电影很感人。", en: "The film that we watched yesterday was moving.", tier: "A" },
      { zh: "这是他曾住过的房子。", en: "This is the house in which he once lived.", tier: "B" },
      { zh: "云南的那个夏天令人难忘。", en: "The summer which we spent in Yunnan was unforgettable.", tier: "B" },
      { zh: "吸引数百万游客的城市是杭州。", en: "Hangzhou is a city that attracts millions of tourists.", tier: "A" },
      { zh: "屋顶是红色的那栋房子建于 1990 年。", en: "The house whose roof is red was built in 1990.", tier: "C" }
    ],
    prepExamples: [
      { zh: "我永远记得我们初次相遇的那一天。", en: "I still remember the day when we first met.", tier: "A" },
      { zh: "这是我曾就读三年的学校。", en: "This is the school where I studied for three years.", tier: "A" },
      { zh: "这就是他迟到的原因。", en: "This is the reason why he was late.", tier: "B" },
      { zh: "我们住过的房间面朝大海。", en: "The room in which we stayed faced the sea.", tier: "B" },
      { zh: "成绩公布时大家都欢呼。", en: "The moment when the results came out, everyone cheered.", tier: "B" }
    ],
    mergeDrills: [
      {
        a: "I have a friend. She can speak three languages.",
        b: "I have a friend who can speak three languages.",
        hint: "先行词 friend 在从句中作主语 → who"
      },
      {
        a: "The book is interesting. You lent me the book.",
        b: "The book that you lent me is interesting.",
        hint: "book 作 lend 的宾语 → that/which，口语可省略"
      },
      {
        a: "We visited a town. The town lies by a river.",
        b: "We visited a town that/which lies by a river.",
        hint: "town 在从句中作主语"
      },
      {
        a: "I'll never forget the day. We graduated on that day.",
        b: "I'll never forget the day when we graduated.",
        hint: "day 在从句中作时间状语 → when"
      }
    ],
    quizWhoA: [
      { stem: "选择正确合并句：The boy is my brother. The boy is playing basketball.", opts: ["The boy whom is playing basketball is my brother.", "The boy who is playing basketball is my brother.", "The boy which is playing basketball is my brother."], ans: 1, fb: "人 + 作主语 → who。" },
      { stem: "填空：Students ______ want to join the art club should hand in forms.", opts: ["who", "which", "where"], ans: 0, fb: "students 指人，在从句中作主语。" },
      { stem: "The teacher ______ we met at the conference is from Canada.", opts: ["who", "whom", "where"], ans: 1, fb: "teacher 作 met 的宾语，正式用 whom。" },
      { stem: "Anyone ______ breaks the law should be punished.", opts: ["who", "which", "whose"], ans: 0, fb: "anyone 指人，作主语。" },
      { stem: "I still remember the teacher ______ always encouraged me.", opts: ["who", "whom", "which"], ans: 0, fb: "teacher 在从句中作主语 encouraged。" },
      { stem: "合并：The volunteers helped the elderly. The community praised the volunteers.", opts: ["The volunteers who the community praised helped the elderly.", "The volunteers whom the community praised helped the elderly.", "The volunteers which the community praised helped the elderly."], ans: 1, fb: "volunteers 作 praised 的宾语。" }
    ],
    quizWhichA: [
      { stem: "The phone ______ was released last month is popular.", opts: ["who", "which", "when"], ans: 1, fb: "phone 指物，作主语。" },
      { stem: "The film ______ we watched yesterday was moving.", opts: ["who", "which", "where"], ans: 1, fb: "film 作 watched 的宾语，that/which 可省略。" },
      { stem: "This is the house ______ he lived ten years ago.", opts: ["where", "who", "whose"], ans: 0, fb: "house 表地点，从句缺地点状语 → where。" },
      { stem: "Hangzhou is a city ______ attracts many tourists.", opts: ["that", "when", "whom"], ans: 0, fb: "city 指物，作主语，that/which。" },
      { stem: "The summer ______ we spent in Yunnan was wonderful.", opts: ["when", "which", "where"], ans: 1, fb: "summer 作 spent 的宾语，不是时间状语。" },
      { stem: "The boy ______ father is a pilot dreams of flying.", opts: ["whose", "who", "whom"], ans: 0, fb: "whose + father 表所属。" }
    ],
    quizPrepB: [
      { stem: "I remember the day ______ we first met.", opts: ["when", "which", "whose"], ans: 0, fb: "day 作时间状语。" },
      { stem: "This is the school ______ I studied for three years.", opts: ["where", "who", "whom"], ans: 0, fb: "school 表地点。" },
      { stem: "The room ______ we stayed faced the sea.", opts: ["in which", "who", "when"], ans: 0, fb: "stay in the room → 介词 + which。" },
      { stem: "The reason ______ he was late was the traffic.", opts: ["why", "which", "where"], ans: 0, fb: "reason 常用 why。" },
      { stem: "Tsinghua is the university ______ many students want to enter.", opts: ["which", "when", "why"], ans: 0, fb: "university 作 enter 的宾语。" },
      { stem: "The moment ______ the bell rang, we stood up.", opts: ["when", "whose", "whom"], ans: 0, fb: "moment 表时间点。" }
    ],
    quizWhoseC: [
      { stem: "Du Fu is a poet ______ poems are still read today.", opts: ["whose", "who", "which"], ans: 0, fb: "poems 与 poet 所有关系。" },
      { stem: "The house ______ roof is red was built in 1990.", opts: ["whose", "which", "when"], ans: 0, fb: "whose roof = 它的屋顶。" },
      { stem: "限制性从句：无逗号，缺了意思不完整。选正确句：", opts: ["My father, who is a teacher, loves reading.", "The students who are late must wait outside.", "The book, that is on the desk, is mine."], ans: 1, fb: "B 为限制性；A 为非限制性；that 不用于非限制性。" },
      { stem: "______ 不能用于非限制性定语从句。", opts: ["who", "which", "that"], ans: 2, fb: "非限制性不用 that。" },
      { stem: "合并：I know a girl. The girl's dream is to be a pilot.", opts: ["I know a girl who dream is to be a pilot.", "I know a girl whose dream is to be a pilot.", "I know a girl whom dream is to be a pilot."], ans: 1, fb: "whose dream。" }
    ],
    tierPractice: {
      A: [
        { stem: "The girl ______ won the speech contest is from Class 3.", opts: ["who", "which", "where"], ans: 0, fb: "人 + 主语。" },
        { stem: "The book ______ you recommended is sold out.", opts: ["that", "when", "whose"], ans: 0, fb: "物 + 宾语。" },
        { stem: "This is the park ______ we often jog.", opts: ["where", "who", "whose"], ans: 0, fb: "地点状语。" }
      ],
      B: [
        { stem: "The scientist ______ the students interviewed won an award.", opts: ["whom", "when", "where"], ans: 0, fb: "作宾语。" },
        { stem: "The weekend ______ I devoted to math practice paid off.", opts: ["which", "when", "where"], ans: 0, fb: "weekend 作 devote 的宾语，不用 when。" },
        { stem: "The day ______ we graduated will stay in my memory.", opts: ["when", "which", "whose"], ans: 0, fb: "时间状语。" }
      ],
      C: [
        { stem: "The boy ______ mother is a nurse helps classmates.", opts: ["whose", "who", "whom"], ans: 0, fb: "whose mother。" },
        { stem: "My uncle, ______ lives in Beijing, visits us every year.", opts: ["who", "that", "which"], ans: 0, fb: "非限制性，逗号 + who。" },
        { stem: "The house ______ windows face south is warmer.", opts: ["whose", "when", "whom"], ans: 0, fb: "whose windows。" }
      ],
      D: [
        { stem: "选最佳合并：Two sentences → The hotel is expensive. We stayed at the hotel.", opts: ["The hotel where we stayed is expensive.", "The hotel when we stayed is expensive.", "The hotel who we stayed is expensive."], ans: 0, fb: "stay at the hotel → where / at which。" },
        { stem: "______ 可省略：The song (______) he sang moved us.", opts: ["that/which", "when", "whose"], ans: 0, fb: "作宾语的关系代词可省略。" },
        { stem: "The reason ______ she refused was unclear.", opts: ["why", "which", "where"], ans: 0, fb: "reason why。" }
      ],
      E: [
        { stem: "中考：The volunteers ______ helped after the earthquake were praised.", opts: ["who", "which", "where"], ans: 0, fb: "volunteers 作主语。" },
        { stem: "中考：Chengdu is a city ______ pandas are well protected.", opts: ["where", "who", "whom"], ans: 0, fb: "city 表地点。" },
        { stem: "中考：The boy ______ parents both teach English speaks well.", opts: ["whose", "who", "which"], ans: 0, fb: "whose parents。" }
      ],
      F: [
        { stem: "辨析：The summer ______ we spent in Hainan was hot.", opts: ["which", "when", "where"], ans: 0, fb: "spent the summer 宾语。" },
        { stem: "辨析：The summer ______ we often go swimming is July.", opts: ["when", "which", "whose"], ans: 0, fb: "July 作时间，when/in which。" },
        { stem: "写作：合并为一句：I admire the writer. The writer's novels inspire teenagers.", opts: ["I admire the writer who novels inspire teenagers.", "I admire the writer whose novels inspire teenagers.", "I admire the writer whom novels inspire teenagers."], ans: 1, fb: "whose novels。" }
      ]
    },
    comprehensiveQuiz: [],
    /** 综合测验 · 语篇理解（先行词 + 定语从句修饰） */
    readingPassages: [
      {
        key: "read1",
        title: "语篇 ① · 校园志愿者周",
        source: "校园通讯改编（练习用）",
        html:
          "<p>Our school organized a volunteer week last month. " +
          "<mark class=\"rc-clause\">Students <strong>who</strong> signed up early</mark> helped clean the playground and " +
          "<mark class=\"rc-clause\">the small garden <strong>which</strong> faces the teaching building</mark>. " +
          "<mark class=\"rc-clause\">The teacher <strong>whom</strong> we all respect</mark> gave a short talk at the end. " +
          "She praised <mark class=\"rc-clause\">the boy <strong>whose</strong> idea started the project</mark>. " +
          "I still remember <mark class=\"rc-clause\">the afternoon <strong>when</strong> we planted trees together</mark>—it was a day full of sunshine and laughter.</p>",
        zh:
          "上月我校开展志愿者周。早早报名的同学打扫操场，还整理了面朝教学楼的小花园。我们都尊敬的老师做了简短总结，并表扬了提出点子、牵头组织的男生。我永远记得一起植树的那个下午——阳光和笑声洒满校园。"
      },
      {
        key: "read2",
        title: "语篇 ② · 杭州之行",
        source: "旅行随笔改编（练习用）",
        html:
          "<p>Last summer my family visited Hangzhou. " +
          "Hangzhou is <mark class=\"rc-clause\">a city <strong>that</strong> attracts millions of tourists every year</mark>. " +
          "We walked around West Lake, <mark class=\"rc-clause\">a place <strong>where</strong> many artists have painted beautiful scenes</mark>. " +
          "I will never forget <mark class=\"rc-clause\">the evening <strong>when</strong> lights shone on the water like gold</mark>. " +
          "We stayed in <mark class=\"rc-clause\">a hotel <strong>which</strong> our friends had recommended</mark>, and we slept in " +
          "<mark class=\"rc-clause\">a room <strong>in which</strong> we could see the hills</mark>.</p>",
        zh:
          "去年夏天我们一家去了杭州。杭州是一座每年吸引数百万游客的城市。我们在西湖边漫步——那曾是许多画家写生取景的地方。我永远忘不了灯火映在水面像金子一样的夜晚。我们住进朋友推荐的酒店，房间面朝青山，开窗即可远眺。"
      },
      {
        key: "read3",
        title: "语篇 ③ · 英语角谈杜甫",
        source: "课堂纪实改编（练习用）",
        html:
          "<p>At our English corner, a guest speaker talked about Du Fu, " +
          "<mark class=\"rc-clause\">a poet <strong>whose</strong> poems are still widely read today</mark>. " +
          "She showed us <mark class=\"rc-clause\">a book <strong>which</strong> introduced his life in simple English</mark>. " +
          "Du Fu lived in <mark class=\"rc-clause\">a period <strong>when</strong> war made many people leave their homes</mark>. " +
          "Later we visited <mark class=\"rc-clause\">the museum <strong>where</strong> we saw his calligraphy</mark> on a school trip to Sichuan. " +
          "My classmate Lin, <mark class=\"rc-clause\"><strong>whose</strong> grandfather loves ancient poetry</mark>, asked the best question.</p>",
        zh:
          "英语角上，嘉宾讲到杜甫——一位诗歌至今仍被广泛阅读的诗人。她展示了一本用简明英语介绍其生平的书。杜甫生活的年代战乱频仍，许多人被迫离乡。后来我们去四川研学，参观了陈列其书法的博物馆。我同学小林——他祖父酷爱古诗——提了全场最好的问题。"
      }
    ],
    quizRead1: [
      {
        stem: "「Students who signed up early」中，先行词（被定语从句修饰的名词）是哪一个？",
        opts: ["Students", "volunteer week", "the playground"],
        ans: 0,
        fb: "定语从句 who signed up early 紧跟在 Students 后，说明是「哪些学生」。"
      },
      {
        stem: "定语从句 who signed up early 在句中补充说明了什么？",
        opts: ["哪些学生来帮忙", "学生住在哪", "志愿者周何时结束"],
        ans: 0,
        fb: "从句限定先行词：不是全体学生，而是「报名早」的那部分。"
      },
      {
        stem: "「the teacher whom we all respect」里，whom 在从句中作什么成分？",
        opts: ["respect 的宾语", "主语", "地点状语"],
        ans: 0,
        fb: "we respect the teacher → whom 作宾语，指「我们都尊敬的那位老师」。"
      },
      {
        stem: "若删去 the afternoon when we planted trees together，主句还完整吗？意思有何变化？",
        opts: ["仍可说「我记得那个下午」，但失去「一起植树」的具体信息", "句子变成语法错误", "主句必须保留 when 才能成立"],
        ans: 0,
        fb: "when 引导的从句修饰 afternoon，补充「那是怎样的下午」。"
      }
    ],
    quizRead2: [
      {
        stem: "「a city that attracts millions of tourists」中，that 指代的是？",
        opts: ["a city / Hangzhou", "millions of tourists", "Last summer"],
        ans: 0,
        fb: "that 引导的从句修饰 city，that 在从句中作主语（= the city attracts…）。"
      },
      {
        stem: "「a place where many artists have painted…」中，where 相当于什么？",
        opts: ["in the place（地点状语）", "the place 作宾语", "时间状语"],
        ans: 0,
        fb: "artists painted beautiful scenes in the place → where = 介词 + 先行词。"
      },
      {
        stem: "「the evening when lights shone…」里的 when 修饰的先行词类型是？",
        opts: ["时间名词 evening", "地点 West Lake", "物 hotel"],
        ans: 0,
        fb: "when 引导时间定语从句，修饰 evening。"
      },
      {
        stem: "「a room in which we could see the hills」中，in which 为何不能换成 where？",
        opts: ["从句缺的是「在房间里」的地点状语，which 前需介词 in", "room 不能作先行词", "必须用 who"],
        ans: 0,
        fb: "see the hills in the room；介词 in 保留在 which 前。where 多表「地点名词」本身。"
      }
    ],
    quizRead3: [
      {
        stem: "「a poet whose poems are still widely read」中，whose 表示什么关系？",
        opts: ["poet 与 poems 的所属关系（诗人的诗）", "poet 与 museum 的地点关系", "poems 与时间 when 的关系"],
        ans: 0,
        fb: "whose poems = the poet's poems，修饰 poet。"
      },
      {
        stem: "「a book which introduced his life」若去掉从句，主句剩余信息是？",
        opts: ["She showed us a book.（不知是怎样的书）", "She showed us Du Fu.", "句子不成立"],
        ans: 0,
        fb: "which 从句说明书的性质，是限制性修饰。"
      },
      {
        stem: "「the museum where we saw his calligraphy」中，where 修饰的先行词是？",
        opts: ["museum", "calligraphy", "Sichuan"],
        ans: 0,
        fb: "we saw calligraphy in the museum → where 修饰表地点的 museum。"
      },
      {
        stem: "「My classmate Lin, whose grandfather loves ancient poetry, asked…」逗号表明此从句属于？",
        opts: ["非限制性定语从句（补充说明 Lin）", "限制性定语从句（不可缺少）", "宾语从句"],
        ans: 0,
        fb: "已有专有名词 Lin，从句用逗号隔开，作附加说明。"
      }
    ]
  };

  ["quizWhoA", "quizWhichA", "quizPrepB", "quizWhoseC"].forEach(function (k) {
    P13RC.comprehensiveQuiz = P13RC.comprehensiveQuiz.concat(
      P13RC[k].map(function (q, i) {
        return Object.assign({}, q, { tag: k, id: k + "-" + i });
      })
    );
  });
  Object.keys(P13RC.tierPractice).forEach(function (tier) {
    P13RC.tierPractice[tier].forEach(function (q, i) {
      P13RC.comprehensiveQuiz.push(Object.assign({}, q, { tag: "tier-" + tier, id: "tier-" + tier + "-" + i }));
    });
  });

  global.P13RC = P13RC;
  global.L13RC_CORPUS_VERSION = VERSION;
})(typeof window !== "undefined" ? window : global);
