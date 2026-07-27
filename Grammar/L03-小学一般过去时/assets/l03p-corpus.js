(function (global) {
  "use strict";
  /** DeepSeek 生成 · 小学 5–6 年级 / 小升初一般过去时语料 */
  var VOCAB_REGULAR = [
  {
    "word": "played",
    "base": "play",
    "phonetic": "",
    "zh": "玩；演奏",
    "example": "Tom played football in the park yesterday.",
    "exampleZh": "汤姆昨天在公园踢足球了。",
    "rule": "+ed",
    "image": "l03p-reg-tom-played-football-in-the-park-yesterday.png",
    "imageHint": "男孩在公园踢足球",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "watched",
    "base": "watch",
    "phonetic": "",
    "zh": "看；观看",
    "example": "Emma watched a cartoon at home last night.",
    "exampleZh": "艾玛昨晚在家看了一部动画片。",
    "rule": "+ed",
    "image": "l03p-reg-emma-watched-a-cartoon-at-home-last-night.png",
    "imageHint": "女孩坐在沙发上看电视",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "visited",
    "base": "visit",
    "phonetic": "",
    "zh": "拜访；参观",
    "example": "Chen Tao visited the museum in Chengdu last weekend.",
    "exampleZh": "陈涛上周末参观了成都的博物馆。",
    "rule": "+ed",
    "image": "l03p-reg-chen-tao-visited-the-museum-in-chengdu-last-week.png",
    "imageHint": "男孩在博物馆看恐龙骨架",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "liked",
    "base": "like",
    "phonetic": "",
    "zh": "喜欢",
    "example": "Lily liked the panda very much.",
    "exampleZh": "莉莉非常喜欢那只熊猫。",
    "rule": "+d",
    "image": "l03p-reg-lily-liked-the-panda-very-much.png",
    "imageHint": "女孩抱着熊猫玩偶笑",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "used",
    "base": "use",
    "phonetic": "",
    "zh": "使用",
    "example": "Jack used a map to find the school.",
    "exampleZh": "杰克用一张地图找到了学校。",
    "rule": "+d",
    "image": "l03p-reg-jack-used-a-map-to-find-the-school.png",
    "imageHint": "男孩手里拿着一张地图",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "studied",
    "base": "study",
    "phonetic": "",
    "zh": "学习；研究",
    "example": "Han Lin studied English for two hours.",
    "exampleZh": "韩林学了两个小时英语。",
    "rule": "y→ied",
    "image": "l03p-reg-han-lin-studied-english-for-two-hours.png",
    "imageHint": "女孩在书桌前写作业",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "carried",
    "base": "carry",
    "phonetic": "",
    "zh": "搬；提；背",
    "example": "Miss Li carried a big bag to the classroom.",
    "exampleZh": "李老师提着一个大包走进教室。",
    "rule": "y→ied",
    "image": "l03p-reg-miss-li-carried-a-big-bag-to-the-classroom.png",
    "imageHint": "女老师提着一个大包",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "cried",
    "base": "cry",
    "phonetic": "",
    "zh": "哭；喊",
    "example": "The baby cried because it was hungry.",
    "exampleZh": "婴儿因为饿了而哭。",
    "rule": "y→ied",
    "image": "l03p-reg-the-baby-cried-because-it-was-hungry.png",
    "imageHint": "婴儿张着嘴哭",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "stopped",
    "base": "stop",
    "phonetic": "",
    "zh": "停止；停下",
    "example": "The bus stopped at the school gate.",
    "exampleZh": "公交车停在校门口。",
    "rule": "双写+ed",
    "image": "l03p-reg-the-bus-stopped-at-the-school-gate.png",
    "imageHint": "公交车停在门口",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "planned",
    "base": "plan",
    "phonetic": "",
    "zh": "计划",
    "example": "They planned a trip to Chengdu.",
    "exampleZh": "他们计划了一次去成都的旅行。",
    "rule": "双写+ed",
    "image": "l03p-reg-they-planned-a-trip-to-chengdu.png",
    "imageHint": "几个人围着一张地图",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "helped",
    "base": "help",
    "phonetic": "",
    "zh": "帮助",
    "example": "Teng Fei helped his mother clean the house.",
    "exampleZh": "腾飞帮妈妈打扫了房子。",
    "rule": "+ed",
    "image": "l03p-reg-teng-fei-helped-his-mother-clean-the-house.png",
    "imageHint": "男孩在擦桌子",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "talked",
    "base": "talk",
    "phonetic": "",
    "zh": "说话；谈论",
    "example": "Linda talked about her weekend in class.",
    "exampleZh": "琳达在课堂上谈论了她的周末。",
    "rule": "+ed",
    "image": "l03p-reg-linda-talked-about-her-weekend-in-class.png",
    "imageHint": "女孩在教室里举手发言",
    "source": "DeepSeek · 5–6年级"
  }
];
  var VOCAB_IRREGULAR = [
  {
    "word": "went",
    "base": "go",
    "phonetic": "",
    "zh": "去",
    "example": "Tom went to the zoo with his family.",
    "exampleZh": "汤姆和家人去了动物园。",
    "rule": "",
    "image": "l03p-irr-tom-went-to-the-zoo-with-his-family.png",
    "imageHint": "男孩和家人走向动物园大门",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "had",
    "base": "have",
    "phonetic": "",
    "zh": "有；吃；喝",
    "example": "Emma had a big breakfast this morning.",
    "exampleZh": "艾玛今天早上吃了一顿丰盛的早餐。",
    "rule": "",
    "image": "l03p-irr-emma-had-a-big-breakfast-this-morning.png",
    "imageHint": "女孩面前摆着面包和牛奶",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "did",
    "base": "do",
    "phonetic": "",
    "zh": "做",
    "example": "Jack did his homework after school.",
    "exampleZh": "杰克放学后做了作业。",
    "rule": "",
    "image": "l03p-irr-jack-did-his-homework-after-school.png",
    "imageHint": "男孩在书桌前写作业",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "said",
    "base": "say",
    "phonetic": "",
    "zh": "说",
    "example": "Miss Li said, 'Good morning, class.'",
    "exampleZh": "李老师说：“同学们，早上好。”",
    "rule": "",
    "image": "l03p-irr-miss-li-said-good-morning-class.png",
    "imageHint": "女老师站在讲台前说话",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "saw",
    "base": "see",
    "phonetic": "",
    "zh": "看见",
    "example": "Chen Tao saw a panda in Chengdu.",
    "exampleZh": "陈涛在成都看见了一只熊猫。",
    "rule": "",
    "image": "l03p-irr-chen-tao-saw-a-panda-in-chengdu.png",
    "imageHint": "男孩在竹林里看熊猫",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "came",
    "base": "come",
    "phonetic": "",
    "zh": "来",
    "example": "Mr Wang came to the classroom early.",
    "exampleZh": "王老师很早就来到了教室。",
    "rule": "",
    "image": "l03p-irr-mr-wang-came-to-the-classroom-early.png",
    "imageHint": "男老师走进教室",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "ate",
    "base": "eat",
    "phonetic": "",
    "zh": "吃",
    "example": "Lily ate an apple for a snack.",
    "exampleZh": "莉莉吃了一个苹果当零食。",
    "rule": "",
    "image": "l03p-irr-lily-ate-an-apple-for-a-snack.png",
    "imageHint": "女孩咬了一口苹果",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "drank",
    "base": "drink",
    "phonetic": "",
    "zh": "喝",
    "example": "Teng Fei drank some water after running.",
    "exampleZh": "腾飞跑步后喝了一些水。",
    "rule": "",
    "image": "l03p-irr-teng-fei-drank-some-water-after-running.png",
    "imageHint": "男孩拿着水杯喝水",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "ran",
    "base": "run",
    "phonetic": "",
    "zh": "跑",
    "example": "Han Lin ran to catch the bus.",
    "exampleZh": "韩林跑着去赶公交车。",
    "rule": "",
    "image": "l03p-irr-han-lin-ran-to-catch-the-bus.png",
    "imageHint": "女孩在站台奔跑",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "sang",
    "base": "sing",
    "phonetic": "",
    "zh": "唱歌",
    "example": "Emma sang a beautiful song at the party.",
    "exampleZh": "艾玛在聚会上唱了一首动听的歌。",
    "rule": "",
    "image": "l03p-irr-emma-sang-a-beautiful-song-at-the-party.png",
    "imageHint": "女孩拿着话筒唱歌",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "wrote",
    "base": "write",
    "phonetic": "",
    "zh": "写",
    "example": "Jack wrote a letter to his friend.",
    "exampleZh": "杰克给朋友写了一封信。",
    "rule": "",
    "image": "l03p-irr-jack-wrote-a-letter-to-his-friend.png",
    "imageHint": "男孩在纸上写字",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "took",
    "base": "take",
    "phonetic": "",
    "zh": "拿；带走；花费",
    "example": "Linda took a photo of the panda.",
    "exampleZh": "琳达给熊猫拍了一张照片。",
    "rule": "",
    "image": "l03p-irr-linda-took-a-photo-of-the-panda.png",
    "imageHint": "女孩用相机拍熊猫",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "gave",
    "base": "give",
    "phonetic": "",
    "zh": "给",
    "example": "Mr Wang gave a book to Tom.",
    "exampleZh": "王老师给了汤姆一本书。",
    "rule": "",
    "image": "l03p-irr-mr-wang-gave-a-book-to-tom.png",
    "imageHint": "男老师递给男孩一本书",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "made",
    "base": "make",
    "phonetic": "",
    "zh": "制作；做",
    "example": "Chen Tao made a model plane yesterday.",
    "exampleZh": "陈涛昨天做了一个飞机模型。",
    "rule": "",
    "image": "l03p-irr-chen-tao-made-a-model-plane-yesterday.png",
    "imageHint": "男孩在桌前拼模型",
    "source": "DeepSeek · 5–6年级"
  }
];
  var VOCAB_TIME = [
  {
    "word": "yesterday",
    "base": "",
    "phonetic": "",
    "zh": "昨天",
    "example": "Lily visited her grandma yesterday.",
    "exampleZh": "莉莉昨天去看望了她的奶奶。",
    "rule": "",
    "image": "l03p-time-lily-visited-her-grandma-yesterday.png",
    "imageHint": "日历上昨天被圈出",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "last night",
    "base": "",
    "phonetic": "",
    "zh": "昨晚",
    "example": "Tom watched a film last night.",
    "exampleZh": "汤姆昨晚看了一部电影。",
    "rule": "",
    "image": "l03p-time-tom-watched-a-film-last-night.png",
    "imageHint": "月亮和星星，电视屏幕亮着",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "last week",
    "base": "",
    "phonetic": "",
    "zh": "上周",
    "example": "Emma went to Chengdu last week.",
    "exampleZh": "艾玛上周去了成都。",
    "rule": "",
    "image": "l03p-time-emma-went-to-chengdu-last-week.png",
    "imageHint": "日历上上周被标记",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "last weekend",
    "base": "",
    "phonetic": "",
    "zh": "上周末",
    "example": "Jack played chess last weekend.",
    "exampleZh": "杰克上周末下了国际象棋。",
    "rule": "",
    "image": "l03p-time-jack-played-chess-last-weekend.png",
    "imageHint": "日历上的周六、周日被圈出",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "this morning",
    "base": "",
    "phonetic": "",
    "zh": "今天早上",
    "example": "Miss Li came to school early this morning.",
    "exampleZh": "李老师今天早上很早就到校了。",
    "rule": "",
    "image": "l03p-time-miss-li-came-to-school-early-this-morning.png",
    "imageHint": "太阳刚升起，学校大门",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "just now",
    "base": "",
    "phonetic": "",
    "zh": "刚才",
    "example": "Han Lin finished her homework just now.",
    "exampleZh": "韩林刚才完成了作业。",
    "rule": "",
    "image": "l03p-time-han-lin-finished-her-homework-just-now.png",
    "imageHint": "时钟指向当前时刻",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "the day before yesterday",
    "base": "",
    "phonetic": "",
    "zh": "前天",
    "example": "Teng Fei went to the park the day before yesterday.",
    "exampleZh": "腾飞前天去了公园。",
    "rule": "",
    "image": "l03p-time-teng-fei-went-to-the-park-the-day-before-yesterd.png",
    "imageHint": "日历上前天被圈出",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "last month",
    "base": "",
    "phonetic": "",
    "zh": "上个月",
    "example": "Linda visited the museum last month.",
    "exampleZh": "琳达上个月参观了博物馆。",
    "rule": "",
    "image": "l03p-time-linda-visited-the-museum-last-month.png",
    "imageHint": "日历翻到上个月",
    "source": "DeepSeek · 5–6年级"
  }
];
  var VOCAB_BE = [
  {
    "word": "was",
    "base": "",
    "phonetic": "",
    "zh": "是（用于I/he/she/it）",
    "example": "I was at home yesterday.",
    "exampleZh": "我昨天在家。",
    "rule": "",
    "image": "l03p-be-i-was-at-home-yesterday.png",
    "imageHint": "女孩坐在家里沙发上",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "were",
    "base": "",
    "phonetic": "",
    "zh": "是（用于you/we/they）",
    "example": "They were in the park last Sunday.",
    "exampleZh": "他们上周日在公园里。",
    "rule": "",
    "image": "l03p-be-they-were-in-the-park-last-sunday.png",
    "imageHint": "几个孩子在公园玩耍",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "wasn't",
    "base": "",
    "phonetic": "",
    "zh": "不是（was not）",
    "example": "Tom wasn't at school yesterday.",
    "exampleZh": "汤姆昨天不在学校。",
    "rule": "",
    "image": "l03p-be-tom-wasn-t-at-school-yesterday.png",
    "imageHint": "空空的课桌椅",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "weren't",
    "base": "",
    "phonetic": "",
    "zh": "不是（were not）",
    "example": "We weren't late for class.",
    "exampleZh": "我们上课没有迟到。",
    "rule": "",
    "image": "l03p-be-we-weren-t-late-for-class.png",
    "imageHint": "教室里的钟显示8:00",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "was",
    "base": "",
    "phonetic": "",
    "zh": "是（用于there be句型过去式单数）",
    "example": "There was a cat under the chair.",
    "exampleZh": "椅子下面有一只猫。",
    "rule": "",
    "image": "l03p-be-there-was-a-cat-under-the-chair.png",
    "imageHint": "椅子下面蹲着一只猫",
    "source": "DeepSeek · 5–6年级"
  },
  {
    "word": "were",
    "base": "",
    "phonetic": "",
    "zh": "是（用于there be句型过去式复数）",
    "example": "There were many books on the desk.",
    "exampleZh": "书桌上有许多书。",
    "rule": "",
    "image": "l03p-be-there-were-many-books-on-the-desk.png",
    "imageHint": "书桌上堆满了书",
    "source": "DeepSeek · 5–6年级"
  }
];
  var Q_WAS_WERE = [
  {
    "q": "Lily ___ very happy yesterday.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "Lily昨天很高兴",
    "sentence": "Lily was very happy yesterday.",
    "zh": "莉莉昨天很高兴。",
    "source": "5GA"
  },
  {
    "q": "Tom and Jack ___ at school last Monday.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "Tom和Jack上周一在学校",
    "sentence": "Tom and Jack were at school last Monday.",
    "zh": "汤姆和杰克上周一在学校。",
    "source": "5GA"
  },
  {
    "q": "There ___ a big tree in the park before.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "以前公园里有一棵大树",
    "sentence": "There was a big tree in the park before.",
    "zh": "以前公园里有一棵大树。",
    "source": "小升初"
  },
  {
    "q": "Emma ___ not at home last night.",
    "opts": [
      "was",
      "were",
      "is",
      "am"
    ],
    "ans": 0,
    "hint": "Emma昨晚不在家",
    "sentence": "Emma was not at home last night.",
    "zh": "艾玛昨晚不在家。",
    "source": "5GA"
  },
  {
    "q": "The children ___ in the classroom just now.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "孩子们刚才在教室里",
    "sentence": "The children were in the classroom just now.",
    "zh": "孩子们刚才在教室里。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ late for school this morning.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "陈涛今天早上上学迟到了",
    "sentence": "Chen Tao was late for school this morning.",
    "zh": "陈涛今天早上上学迟到了。",
    "source": "小升初"
  },
  {
    "q": "Miss Li and Mr Wang ___ in the office yesterday.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "李老师和王老师昨天在办公室",
    "sentence": "Miss Li and Mr Wang were in the office yesterday.",
    "zh": "李老师和王老师昨天在办公室。",
    "source": "5GA"
  },
  {
    "q": "Teng Fei ___ busy last weekend.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "腾飞上周末很忙",
    "sentence": "Teng Fei was busy last weekend.",
    "zh": "腾飞上周末很忙。",
    "source": "小升初"
  },
  {
    "q": "Han Lin and Linda ___ in Chengdu last summer.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "韩林和琳达去年夏天在成都",
    "sentence": "Han Lin and Linda were in Chengdu last summer.",
    "zh": "韩林和琳达去年夏天在成都。",
    "source": "5GA"
  },
  {
    "q": "The weather ___ cold last night.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "昨晚天气很冷",
    "sentence": "The weather was cold last night.",
    "zh": "昨晚天气很冷。",
    "source": "小升初"
  }
];
  var Q_REGULAR = [
  {
    "q": "Tom ___ his homework last night.",
    "opts": [
      "finished",
      "finish",
      "finishes",
      "finishing"
    ],
    "ans": 0,
    "hint": "汤姆昨晚完成了作业",
    "sentence": "Tom finished his homework last night.",
    "zh": "汤姆昨晚完成了作业。",
    "source": "5GA"
  },
  {
    "q": "Lily ___ to the park yesterday morning.",
    "opts": [
      "walked",
      "walk",
      "walks",
      "walking"
    ],
    "ans": 0,
    "hint": "莉莉昨天早上步行去公园",
    "sentence": "Lily walked to the park yesterday morning.",
    "zh": "莉莉昨天早上步行去公园。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ a letter to her friend last week.",
    "opts": [
      "wrote",
      "write",
      "writes",
      "writing"
    ],
    "ans": 0,
    "hint": "艾玛上周给朋友写了一封信（注意：write是不规则动词，但这里需要规则？调整）",
    "sentence": "Emma wrote a letter to her friend last week.",
    "zh": "艾玛上周给朋友写了一封信。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ his room on Sunday.",
    "opts": [
      "cleaned",
      "clean",
      "cleans",
      "cleaning"
    ],
    "ans": 0,
    "hint": "杰克周日打扫了他的房间",
    "sentence": "Jack cleaned his room on Sunday.",
    "zh": "杰克周日打扫了他的房间。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ TV last night.",
    "opts": [
      "watched",
      "watch",
      "watches",
      "watching"
    ],
    "ans": 0,
    "hint": "陈涛昨晚看电视了",
    "sentence": "Chen Tao watched TV last night.",
    "zh": "陈涛昨晚看电视了。",
    "source": "5GA"
  },
  {
    "q": "Miss Li ___ a new book yesterday.",
    "opts": [
      "bought",
      "buy",
      "buys",
      "buying"
    ],
    "ans": 0,
    "hint": "李老师昨天买了一本新书（注意：buy是不规则动词）",
    "sentence": "Miss Li bought a new book yesterday.",
    "zh": "李老师昨天买了一本新书。",
    "source": "小升初"
  },
  {
    "q": "Teng Fei ___ to music after school.",
    "opts": [
      "listened",
      "listen",
      "listens",
      "listening"
    ],
    "ans": 0,
    "hint": "腾飞放学后听了音乐",
    "sentence": "Teng Fei listened to music after school.",
    "zh": "腾飞放学后听了音乐。",
    "source": "5GA"
  },
  {
    "q": "Han Lin and Linda ___ games in the garden.",
    "opts": [
      "played",
      "play",
      "plays",
      "playing"
    ],
    "ans": 0,
    "hint": "韩林和琳达在花园里玩游戏",
    "sentence": "Han Lin and Linda played games in the garden.",
    "zh": "韩林和琳达在花园里玩游戏。",
    "source": "5GA"
  },
  {
    "q": "Mr Wang ___ a car last year.",
    "opts": [
      "bought",
      "buy",
      "buys",
      "buying"
    ],
    "ans": 0,
    "hint": "王先生去年买了一辆车",
    "sentence": "Mr Wang bought a car last year.",
    "zh": "王先生去年买了一辆车。",
    "source": "小升初"
  },
  {
    "q": "The students ___ the classroom after class.",
    "opts": [
      "cleaned",
      "clean",
      "cleans",
      "cleaning"
    ],
    "ans": 0,
    "hint": "学生们下课后打扫了教室",
    "sentence": "The students cleaned the classroom after class.",
    "zh": "学生们下课后打扫了教室。",
    "source": "5GA"
  }
];
  var Q_IRREGULAR = [
  {
    "q": "Lily ___ a new dress yesterday.",
    "opts": [
      "bought",
      "buyed",
      "buys",
      "buy"
    ],
    "ans": 0,
    "hint": "莉莉昨天买了一条新裙子",
    "sentence": "Lily bought a new dress yesterday.",
    "zh": "莉莉昨天买了一条新裙子。",
    "source": "5GA"
  },
  {
    "q": "Tom ___ to the zoo last Sunday.",
    "opts": [
      "went",
      "go",
      "goes",
      "going"
    ],
    "ans": 0,
    "hint": "汤姆上周日去了动物园",
    "sentence": "Tom went to the zoo last Sunday.",
    "zh": "汤姆上周日去了动物园。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ a storybook from the library.",
    "opts": [
      "got",
      "get",
      "gets",
      "getting"
    ],
    "ans": 0,
    "hint": "艾玛从图书馆得到了一本故事书",
    "sentence": "Emma got a storybook from the library.",
    "zh": "艾玛从图书馆得到了一本故事书。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ breakfast at 7:00 this morning.",
    "opts": [
      "had",
      "have",
      "has",
      "having"
    ],
    "ans": 0,
    "hint": "杰克今天早上7点吃了早餐",
    "sentence": "Jack had breakfast at 7:00 this morning.",
    "zh": "杰克今天早上7点吃了早餐。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ a kite with his father.",
    "opts": [
      "flew",
      "fly",
      "flies",
      "flying"
    ],
    "ans": 0,
    "hint": "陈涛和他爸爸放风筝了",
    "sentence": "Chen Tao flew a kite with his father.",
    "zh": "陈涛和他爸爸放风筝了。",
    "source": "5GA"
  },
  {
    "q": "Miss Li ___ us English last term.",
    "opts": [
      "taught",
      "teach",
      "teaches",
      "teaching"
    ],
    "ans": 0,
    "hint": "李老师上学期教我们英语",
    "sentence": "Miss Li taught us English last term.",
    "zh": "李老师上学期教我们英语。",
    "source": "小升初"
  },
  {
    "q": "Teng Fei ___ a song at the party.",
    "opts": [
      "sang",
      "sing",
      "sings",
      "singing"
    ],
    "ans": 0,
    "hint": "腾飞在聚会上唱了一首歌",
    "sentence": "Teng Fei sang a song at the party.",
    "zh": "腾飞在聚会上唱了一首歌。",
    "source": "5GA"
  },
  {
    "q": "Han Lin ___ a picture for me.",
    "opts": [
      "drew",
      "draw",
      "draws",
      "drawing"
    ],
    "ans": 0,
    "hint": "韩林给我画了一幅画",
    "sentence": "Han Lin drew a picture for me.",
    "zh": "韩林给我画了一幅画。",
    "source": "小升初"
  },
  {
    "q": "Linda ___ an apple on the way home.",
    "opts": [
      "ate",
      "eat",
      "eats",
      "eating"
    ],
    "ans": 0,
    "hint": "琳达在回家的路上吃了一个苹果",
    "sentence": "Linda ate an apple on the way home.",
    "zh": "琳达在回家的路上吃了一个苹果。",
    "source": "5GA"
  },
  {
    "q": "Mr Wang ___ a letter to his son.",
    "opts": [
      "sent",
      "send",
      "sends",
      "sending"
    ],
    "ans": 0,
    "hint": "王先生给他儿子寄了一封信",
    "sentence": "Mr Wang sent a letter to his son.",
    "zh": "王先生给他儿子寄了一封信。",
    "source": "小升初"
  },
  {
    "q": "Lily and Tom ___ a good time in Chengdu.",
    "opts": [
      "had",
      "have",
      "has",
      "having"
    ],
    "ans": 0,
    "hint": "莉莉和汤姆在成都玩得很开心",
    "sentence": "Lily and Tom had a good time in Chengdu.",
    "zh": "莉莉和汤姆在成都玩得很开心。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ her grandmother last weekend.",
    "opts": [
      "visited",
      "visit",
      "visits",
      "visiting"
    ],
    "ans": 0,
    "hint": "艾玛上周末看望了她的祖母（注意：visit是规则动词）",
    "sentence": "Emma visited her grandmother last weekend.",
    "zh": "艾玛上周末看望了她的祖母。",
    "source": "小升初"
  }
];
  var Q_NEG = [
  {
    "q": "Lily ___ not go to school yesterday.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "莉莉昨天没去上学",
    "sentence": "Lily did not go to school yesterday.",
    "zh": "莉莉昨天没去上学。",
    "source": "5GA"
  },
  {
    "q": "Tom ___ not watch TV last night.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "汤姆昨晚没看电视",
    "sentence": "Tom did not watch TV last night.",
    "zh": "汤姆昨晚没看电视。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ not buy a new pen.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "艾玛没买新钢笔",
    "sentence": "Emma did not buy a new pen.",
    "zh": "艾玛没买新钢笔。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ not finish his homework.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "杰克没完成作业",
    "sentence": "Jack did not finish his homework.",
    "zh": "杰克没完成作业。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ not eat breakfast this morning.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "陈涛今天早上没吃早餐",
    "sentence": "Chen Tao did not eat breakfast this morning.",
    "zh": "陈涛今天早上没吃早餐。",
    "source": "小升初"
  },
  {
    "q": "Miss Li ___ not in the office yesterday.",
    "opts": [
      "was",
      "were",
      "did",
      "is"
    ],
    "ans": 0,
    "hint": "李老师昨天不在办公室",
    "sentence": "Miss Li was not in the office yesterday.",
    "zh": "李老师昨天不在办公室。",
    "source": "5GA"
  },
  {
    "q": "Teng Fei ___ not play football after school.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "腾飞放学后没踢足球",
    "sentence": "Teng Fei did not play football after school.",
    "zh": "腾飞放学后没踢足球。",
    "source": "小升初"
  },
  {
    "q": "Han Lin and Linda ___ not at home last night.",
    "opts": [
      "were",
      "was",
      "did",
      "are"
    ],
    "ans": 0,
    "hint": "韩林和琳达昨晚不在家",
    "sentence": "Han Lin and Linda were not at home last night.",
    "zh": "韩林和琳达昨晚不在家。",
    "source": "5GA"
  }
];
  var Q_DID = [
  {
    "q": "___ Lily go to the park yesterday?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "莉莉昨天去公园了吗？",
    "sentence": "Did Lily go to the park yesterday?",
    "zh": "莉莉昨天去公园了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Tom finish his homework?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "汤姆完成作业了吗？",
    "sentence": "Did Tom finish his homework?",
    "zh": "汤姆完成作业了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Emma buy a new dress?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "艾玛买了一条新裙子吗？",
    "sentence": "Did Emma buy a new dress?",
    "zh": "艾玛买了一条新裙子吗？",
    "source": "小升初"
  },
  {
    "q": "___ Jack watch TV last night?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "杰克昨晚看电视了吗？",
    "sentence": "Did Jack watch TV last night?",
    "zh": "杰克昨晚看电视了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Chen Tao eat an apple?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "陈涛吃了一个苹果吗？",
    "sentence": "Did Chen Tao eat an apple?",
    "zh": "陈涛吃了一个苹果吗？",
    "source": "小升初"
  },
  {
    "q": "___ Miss Li teach you English?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "李老师教你们英语了吗？",
    "sentence": "Did Miss Li teach you English?",
    "zh": "李老师教你们英语了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Teng Fei sing a song?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "腾飞唱歌了吗？",
    "sentence": "Did Teng Fei sing a song?",
    "zh": "腾飞唱歌了吗？",
    "source": "小升初"
  },
  {
    "q": "___ Han Lin and Linda play games?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "韩林和琳达玩游戏了吗？",
    "sentence": "Did Han Lin and Linda play games?",
    "zh": "韩林和琳达玩游戏了吗？",
    "source": "5GA"
  }
];
  var Q_MIX = [
  {
    "q": "Lily and Tom ___ to the zoo last Sunday.",
    "opts": [
      "went",
      "go",
      "goes",
      "going"
    ],
    "ans": 0,
    "hint": "莉莉和汤姆上周日去了动物园",
    "sentence": "Lily and Tom went to the zoo last Sunday.",
    "zh": "莉莉和汤姆上周日去了动物园。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ a new bike yesterday.",
    "opts": [
      "got",
      "get",
      "gets",
      "getting"
    ],
    "ans": 0,
    "hint": "艾玛昨天得到了一辆新自行车",
    "sentence": "Emma got a new bike yesterday.",
    "zh": "艾玛昨天得到了一辆新自行车。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ breakfast at 6:30 this morning.",
    "opts": [
      "had",
      "have",
      "has",
      "having"
    ],
    "ans": 0,
    "hint": "杰克今天早上6:30吃了早餐",
    "sentence": "Jack had breakfast at 6:30 this morning.",
    "zh": "杰克今天早上6:30吃了早餐。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ a kite with his friends.",
    "opts": [
      "flew",
      "fly",
      "flies",
      "flying"
    ],
    "ans": 0,
    "hint": "陈涛和朋友放风筝了",
    "sentence": "Chen Tao flew a kite with his friends.",
    "zh": "陈涛和朋友放风筝了。",
    "source": "小升初"
  },
  {
    "q": "Miss Li ___ us a story last week.",
    "opts": [
      "told",
      "tell",
      "tells",
      "telling"
    ],
    "ans": 0,
    "hint": "李老师上周给我们讲了一个故事",
    "sentence": "Miss Li told us a story last week.",
    "zh": "李老师上周给我们讲了一个故事。",
    "source": "5GA"
  },
  {
    "q": "Teng Fei ___ a song at the concert.",
    "opts": [
      "sang",
      "sing",
      "sings",
      "singing"
    ],
    "ans": 0,
    "hint": "腾飞在音乐会上唱了一首歌",
    "sentence": "Teng Fei sang a song at the concert.",
    "zh": "腾飞在音乐会上唱了一首歌。",
    "source": "小升初"
  },
  {
    "q": "Han Lin ___ a beautiful picture.",
    "opts": [
      "drew",
      "draw",
      "draws",
      "drawing"
    ],
    "ans": 0,
    "hint": "韩林画了一幅美丽的画",
    "sentence": "Han Lin drew a beautiful picture.",
    "zh": "韩林画了一幅美丽的画。",
    "source": "5GA"
  },
  {
    "q": "Linda ___ an orange after lunch.",
    "opts": [
      "ate",
      "eat",
      "eats",
      "eating"
    ],
    "ans": 0,
    "hint": "琳达午饭后吃了一个橙子",
    "sentence": "Linda ate an orange after lunch.",
    "zh": "琳达午饭后吃了一个橙子。",
    "source": "小升初"
  },
  {
    "q": "Mr Wang ___ a letter to his friend.",
    "opts": [
      "sent",
      "send",
      "sends",
      "sending"
    ],
    "ans": 0,
    "hint": "王先生给朋友寄了一封信",
    "sentence": "Mr Wang sent a letter to his friend.",
    "zh": "王先生给朋友寄了一封信。",
    "source": "5GA"
  },
  {
    "q": "Lily ___ not go to the park yesterday.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "莉莉昨天没去公园",
    "sentence": "Lily did not go to the park yesterday.",
    "zh": "莉莉昨天没去公园。",
    "source": "5GA"
  },
  {
    "q": "Tom ___ not watch TV last night.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "汤姆昨晚没看电视",
    "sentence": "Tom did not watch TV last night.",
    "zh": "汤姆昨晚没看电视。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ not buy a new pen.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "艾玛没买新钢笔",
    "sentence": "Emma did not buy a new pen.",
    "zh": "艾玛没买新钢笔。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ not finish his homework.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "杰克没完成作业",
    "sentence": "Jack did not finish his homework.",
    "zh": "杰克没完成作业。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ not eat breakfast.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "陈涛没吃早餐",
    "sentence": "Chen Tao did not eat breakfast.",
    "zh": "陈涛没吃早餐。",
    "source": "小升初"
  },
  {
    "q": "Miss Li ___ not in the office yesterday.",
    "opts": [
      "was",
      "were",
      "did",
      "is"
    ],
    "ans": 0,
    "hint": "李老师昨天不在办公室",
    "sentence": "Miss Li was not in the office yesterday.",
    "zh": "李老师昨天不在办公室。",
    "source": "5GA"
  },
  {
    "q": "Teng Fei ___ not play football.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "腾飞没踢足球",
    "sentence": "Teng Fei did not play football.",
    "zh": "腾飞没踢足球。",
    "source": "小升初"
  },
  {
    "q": "Han Lin and Linda ___ not at home.",
    "opts": [
      "were",
      "was",
      "did",
      "are"
    ],
    "ans": 0,
    "hint": "韩林和琳达不在家",
    "sentence": "Han Lin and Linda were not at home.",
    "zh": "韩林和琳达不在家。",
    "source": "5GA"
  },
  {
    "q": "___ Lily go to the zoo?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "莉莉去动物园了吗？",
    "sentence": "Did Lily go to the zoo?",
    "zh": "莉莉去动物园了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Tom finish his homework?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "汤姆完成作业了吗？",
    "sentence": "Did Tom finish his homework?",
    "zh": "汤姆完成作业了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Emma buy a new dress?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "艾玛买了一条新裙子吗？",
    "sentence": "Did Emma buy a new dress?",
    "zh": "艾玛买了一条新裙子吗？",
    "source": "小升初"
  },
  {
    "q": "Lily ___ very happy yesterday.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "Lily昨天很高兴",
    "sentence": "Lily was very happy yesterday.",
    "zh": "莉莉昨天很高兴。",
    "source": "5GA"
  },
  {
    "q": "Tom and Jack ___ at school last Monday.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "Tom和Jack上周一在学校",
    "sentence": "Tom and Jack were at school last Monday.",
    "zh": "汤姆和杰克上周一在学校。",
    "source": "5GA"
  },
  {
    "q": "There ___ a big tree in the park before.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "以前公园里有一棵大树",
    "sentence": "There was a big tree in the park before.",
    "zh": "以前公园里有一棵大树。",
    "source": "小升初"
  },
  {
    "q": "Emma ___ not at home last night.",
    "opts": [
      "was",
      "were",
      "is",
      "am"
    ],
    "ans": 0,
    "hint": "Emma昨晚不在家",
    "sentence": "Emma was not at home last night.",
    "zh": "艾玛昨晚不在家。",
    "source": "5GA"
  },
  {
    "q": "The children ___ in the classroom just now.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "孩子们刚才在教室里",
    "sentence": "The children were in the classroom just now.",
    "zh": "孩子们刚才在教室里。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ late for school this morning.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "陈涛今天早上上学迟到了",
    "sentence": "Chen Tao was late for school this morning.",
    "zh": "陈涛今天早上上学迟到了。",
    "source": "小升初"
  },
  {
    "q": "Miss Li and Mr Wang ___ in the office yesterday.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "李老师和王老师昨天在办公室",
    "sentence": "Miss Li and Mr Wang were in the office yesterday.",
    "zh": "李老师和王老师昨天在办公室。",
    "source": "5GA"
  },
  {
    "q": "Teng Fei ___ busy last weekend.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "腾飞上周末很忙",
    "sentence": "Teng Fei was busy last weekend.",
    "zh": "腾飞上周末很忙。",
    "source": "小升初"
  },
  {
    "q": "Han Lin and Linda ___ in Chengdu last summer.",
    "opts": [
      "were",
      "was",
      "are",
      "is"
    ],
    "ans": 0,
    "hint": "韩林和琳达去年夏天在成都",
    "sentence": "Han Lin and Linda were in Chengdu last summer.",
    "zh": "韩林和琳达去年夏天在成都。",
    "source": "5GA"
  },
  {
    "q": "The weather ___ cold last night.",
    "opts": [
      "was",
      "were",
      "is",
      "are"
    ],
    "ans": 0,
    "hint": "昨晚天气很冷",
    "sentence": "The weather was cold last night.",
    "zh": "昨晚天气很冷。",
    "source": "小升初"
  },
  {
    "q": "Tom ___ his homework last night.",
    "opts": [
      "finished",
      "finish",
      "finishes",
      "finishing"
    ],
    "ans": 0,
    "hint": "汤姆昨晚完成了作业",
    "sentence": "Tom finished his homework last night.",
    "zh": "汤姆昨晚完成了作业。",
    "source": "5GA"
  },
  {
    "q": "Lily ___ to the park yesterday morning.",
    "opts": [
      "walked",
      "walk",
      "walks",
      "walking"
    ],
    "ans": 0,
    "hint": "莉莉昨天早上步行去公园",
    "sentence": "Lily walked to the park yesterday morning.",
    "zh": "莉莉昨天早上步行去公园。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ a letter to her friend last week.",
    "opts": [
      "wrote",
      "write",
      "writes",
      "writing"
    ],
    "ans": 0,
    "hint": "艾玛上周给朋友写了一封信（注意：write是不规则动词，但这里需要规则？调整）",
    "sentence": "Emma wrote a letter to her friend last week.",
    "zh": "艾玛上周给朋友写了一封信。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ his room on Sunday.",
    "opts": [
      "cleaned",
      "clean",
      "cleans",
      "cleaning"
    ],
    "ans": 0,
    "hint": "杰克周日打扫了他的房间",
    "sentence": "Jack cleaned his room on Sunday.",
    "zh": "杰克周日打扫了他的房间。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ TV last night.",
    "opts": [
      "watched",
      "watch",
      "watches",
      "watching"
    ],
    "ans": 0,
    "hint": "陈涛昨晚看电视了",
    "sentence": "Chen Tao watched TV last night.",
    "zh": "陈涛昨晚看电视了。",
    "source": "5GA"
  },
  {
    "q": "Miss Li ___ a new book yesterday.",
    "opts": [
      "bought",
      "buy",
      "buys",
      "buying"
    ],
    "ans": 0,
    "hint": "李老师昨天买了一本新书（注意：buy是不规则动词）",
    "sentence": "Miss Li bought a new book yesterday.",
    "zh": "李老师昨天买了一本新书。",
    "source": "小升初"
  },
  {
    "q": "Teng Fei ___ to music after school.",
    "opts": [
      "listened",
      "listen",
      "listens",
      "listening"
    ],
    "ans": 0,
    "hint": "腾飞放学后听了音乐",
    "sentence": "Teng Fei listened to music after school.",
    "zh": "腾飞放学后听了音乐。",
    "source": "5GA"
  },
  {
    "q": "Han Lin and Linda ___ games in the garden.",
    "opts": [
      "played",
      "play",
      "plays",
      "playing"
    ],
    "ans": 0,
    "hint": "韩林和琳达在花园里玩游戏",
    "sentence": "Han Lin and Linda played games in the garden.",
    "zh": "韩林和琳达在花园里玩游戏。",
    "source": "5GA"
  },
  {
    "q": "Mr Wang ___ a car last year.",
    "opts": [
      "bought",
      "buy",
      "buys",
      "buying"
    ],
    "ans": 0,
    "hint": "王先生去年买了一辆车",
    "sentence": "Mr Wang bought a car last year.",
    "zh": "王先生去年买了一辆车。",
    "source": "小升初"
  },
  {
    "q": "The students ___ the classroom after class.",
    "opts": [
      "cleaned",
      "clean",
      "cleans",
      "cleaning"
    ],
    "ans": 0,
    "hint": "学生们下课后打扫了教室",
    "sentence": "The students cleaned the classroom after class.",
    "zh": "学生们下课后打扫了教室。",
    "source": "5GA"
  },
  {
    "q": "Lily ___ a new dress yesterday.",
    "opts": [
      "bought",
      "buyed",
      "buys",
      "buy"
    ],
    "ans": 0,
    "hint": "莉莉昨天买了一条新裙子",
    "sentence": "Lily bought a new dress yesterday.",
    "zh": "莉莉昨天买了一条新裙子。",
    "source": "5GA"
  },
  {
    "q": "Tom ___ to the zoo last Sunday.",
    "opts": [
      "went",
      "go",
      "goes",
      "going"
    ],
    "ans": 0,
    "hint": "汤姆上周日去了动物园",
    "sentence": "Tom went to the zoo last Sunday.",
    "zh": "汤姆上周日去了动物园。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ a storybook from the library.",
    "opts": [
      "got",
      "get",
      "gets",
      "getting"
    ],
    "ans": 0,
    "hint": "艾玛从图书馆得到了一本故事书",
    "sentence": "Emma got a storybook from the library.",
    "zh": "艾玛从图书馆得到了一本故事书。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ breakfast at 7:00 this morning.",
    "opts": [
      "had",
      "have",
      "has",
      "having"
    ],
    "ans": 0,
    "hint": "杰克今天早上7点吃了早餐",
    "sentence": "Jack had breakfast at 7:00 this morning.",
    "zh": "杰克今天早上7点吃了早餐。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ a kite with his father.",
    "opts": [
      "flew",
      "fly",
      "flies",
      "flying"
    ],
    "ans": 0,
    "hint": "陈涛和他爸爸放风筝了",
    "sentence": "Chen Tao flew a kite with his father.",
    "zh": "陈涛和他爸爸放风筝了。",
    "source": "5GA"
  },
  {
    "q": "Miss Li ___ us English last term.",
    "opts": [
      "taught",
      "teach",
      "teaches",
      "teaching"
    ],
    "ans": 0,
    "hint": "李老师上学期教我们英语",
    "sentence": "Miss Li taught us English last term.",
    "zh": "李老师上学期教我们英语。",
    "source": "小升初"
  },
  {
    "q": "Teng Fei ___ a song at the party.",
    "opts": [
      "sang",
      "sing",
      "sings",
      "singing"
    ],
    "ans": 0,
    "hint": "腾飞在聚会上唱了一首歌",
    "sentence": "Teng Fei sang a song at the party.",
    "zh": "腾飞在聚会上唱了一首歌。",
    "source": "5GA"
  },
  {
    "q": "Han Lin ___ a picture for me.",
    "opts": [
      "drew",
      "draw",
      "draws",
      "drawing"
    ],
    "ans": 0,
    "hint": "韩林给我画了一幅画",
    "sentence": "Han Lin drew a picture for me.",
    "zh": "韩林给我画了一幅画。",
    "source": "小升初"
  },
  {
    "q": "Linda ___ an apple on the way home.",
    "opts": [
      "ate",
      "eat",
      "eats",
      "eating"
    ],
    "ans": 0,
    "hint": "琳达在回家的路上吃了一个苹果",
    "sentence": "Linda ate an apple on the way home.",
    "zh": "琳达在回家的路上吃了一个苹果。",
    "source": "5GA"
  },
  {
    "q": "Mr Wang ___ a letter to his son.",
    "opts": [
      "sent",
      "send",
      "sends",
      "sending"
    ],
    "ans": 0,
    "hint": "王先生给他儿子寄了一封信",
    "sentence": "Mr Wang sent a letter to his son.",
    "zh": "王先生给他儿子寄了一封信。",
    "source": "小升初"
  },
  {
    "q": "Lily and Tom ___ a good time in Chengdu.",
    "opts": [
      "had",
      "have",
      "has",
      "having"
    ],
    "ans": 0,
    "hint": "莉莉和汤姆在成都玩得很开心",
    "sentence": "Lily and Tom had a good time in Chengdu.",
    "zh": "莉莉和汤姆在成都玩得很开心。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ her grandmother last weekend.",
    "opts": [
      "visited",
      "visit",
      "visits",
      "visiting"
    ],
    "ans": 0,
    "hint": "艾玛上周末看望了她的祖母（注意：visit是规则动词）",
    "sentence": "Emma visited her grandmother last weekend.",
    "zh": "艾玛上周末看望了她的祖母。",
    "source": "小升初"
  },
  {
    "q": "Lily ___ not go to school yesterday.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "莉莉昨天没去上学",
    "sentence": "Lily did not go to school yesterday.",
    "zh": "莉莉昨天没去上学。",
    "source": "5GA"
  },
  {
    "q": "Tom ___ not watch TV last night.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "汤姆昨晚没看电视",
    "sentence": "Tom did not watch TV last night.",
    "zh": "汤姆昨晚没看电视。",
    "source": "5GA"
  },
  {
    "q": "Emma ___ not buy a new pen.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "艾玛没买新钢笔",
    "sentence": "Emma did not buy a new pen.",
    "zh": "艾玛没买新钢笔。",
    "source": "小升初"
  },
  {
    "q": "Jack ___ not finish his homework.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "杰克没完成作业",
    "sentence": "Jack did not finish his homework.",
    "zh": "杰克没完成作业。",
    "source": "5GA"
  },
  {
    "q": "Chen Tao ___ not eat breakfast this morning.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "陈涛今天早上没吃早餐",
    "sentence": "Chen Tao did not eat breakfast this morning.",
    "zh": "陈涛今天早上没吃早餐。",
    "source": "小升初"
  },
  {
    "q": "Miss Li ___ not in the office yesterday.",
    "opts": [
      "was",
      "were",
      "did",
      "is"
    ],
    "ans": 0,
    "hint": "李老师昨天不在办公室",
    "sentence": "Miss Li was not in the office yesterday.",
    "zh": "李老师昨天不在办公室。",
    "source": "5GA"
  },
  {
    "q": "Teng Fei ___ not play football after school.",
    "opts": [
      "did",
      "was",
      "were",
      "does"
    ],
    "ans": 0,
    "hint": "腾飞放学后没踢足球",
    "sentence": "Teng Fei did not play football after school.",
    "zh": "腾飞放学后没踢足球。",
    "source": "小升初"
  },
  {
    "q": "Han Lin and Linda ___ not at home last night.",
    "opts": [
      "were",
      "was",
      "did",
      "are"
    ],
    "ans": 0,
    "hint": "韩林和琳达昨晚不在家",
    "sentence": "Han Lin and Linda were not at home last night.",
    "zh": "韩林和琳达昨晚不在家。",
    "source": "5GA"
  },
  {
    "q": "___ Lily go to the park yesterday?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "莉莉昨天去公园了吗？",
    "sentence": "Did Lily go to the park yesterday?",
    "zh": "莉莉昨天去公园了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Tom finish his homework?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "汤姆完成作业了吗？",
    "sentence": "Did Tom finish his homework?",
    "zh": "汤姆完成作业了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Emma buy a new dress?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "艾玛买了一条新裙子吗？",
    "sentence": "Did Emma buy a new dress?",
    "zh": "艾玛买了一条新裙子吗？",
    "source": "小升初"
  },
  {
    "q": "___ Jack watch TV last night?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "杰克昨晚看电视了吗？",
    "sentence": "Did Jack watch TV last night?",
    "zh": "杰克昨晚看电视了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Chen Tao eat an apple?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "陈涛吃了一个苹果吗？",
    "sentence": "Did Chen Tao eat an apple?",
    "zh": "陈涛吃了一个苹果吗？",
    "source": "小升初"
  },
  {
    "q": "___ Miss Li teach you English?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "李老师教你们英语了吗？",
    "sentence": "Did Miss Li teach you English?",
    "zh": "李老师教你们英语了吗？",
    "source": "5GA"
  },
  {
    "q": "___ Teng Fei sing a song?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "腾飞唱歌了吗？",
    "sentence": "Did Teng Fei sing a song?",
    "zh": "腾飞唱歌了吗？",
    "source": "小升初"
  },
  {
    "q": "___ Han Lin and Linda play games?",
    "opts": [
      "Did",
      "Was",
      "Were",
      "Does"
    ],
    "ans": 0,
    "hint": "韩林和琳达玩游戏了吗？",
    "sentence": "Did Han Lin and Linda play games?",
    "zh": "韩林和琳达玩游戏了吗？",
    "source": "5GA"
  }
];
  var MATCH_PAIRS = [
  {
    "en": "Lily visited the zoo yesterday.",
    "zh": "莉莉昨天参观了动物园。"
  },
  {
    "en": "Tom played football with Jack.",
    "zh": "汤姆和杰克踢了足球。"
  },
  {
    "en": "Emma watched a film at home.",
    "zh": "艾玛在家看了一部电影。"
  },
  {
    "en": "Chen Tao walked to school last Monday.",
    "zh": "陈涛上周一走路上学。"
  },
  {
    "en": "Miss Li taught English in the classroom.",
    "zh": "李老师在教室里教英语。"
  },
  {
    "en": "Mr Wang cooked dinner for his family.",
    "zh": "王老师为家人做了晚餐。"
  },
  {
    "en": "Teng Fei climbed the hill on Saturday.",
    "zh": "腾飞周六爬了山。"
  },
  {
    "en": "Han Lin visited Chengdu with Linda.",
    "zh": "韩林和琳达一起游览了成都。"
  },
  {
    "en": "Linda bought some souvenirs in Chengdu.",
    "zh": "琳达在成都买了一些纪念品。"
  },
  {
    "en": "The children had a picnic in the park.",
    "zh": "孩子们在公园里野餐了。"
  },
  {
    "en": "Jack lost his pencil case at school.",
    "zh": "杰克在学校丢了铅笔盒。"
  },
  {
    "en": "Lily and Emma sang a song together.",
    "zh": "莉莉和艾玛一起唱了一首歌。"
  }
];
  var LISTEN_PICK = [
  {
    "audio": "Lily visited the zoo yesterday.",
    "opts": [
      "Lily visited the zoo yesterday.",
      "Lily visits the zoo yesterday.",
      "Lily is visiting the zoo yesterday."
    ],
    "ans": 0,
    "zh": "莉莉昨天参观了动物园。"
  },
  {
    "audio": "Tom played football with Jack.",
    "opts": [
      "Tom played football with Jack.",
      "Tom plays football with Jack.",
      "Tom is playing football with Jack."
    ],
    "ans": 0,
    "zh": "汤姆和杰克踢了足球。"
  },
  {
    "audio": "Emma watched a film at home.",
    "opts": [
      "Emma watched a film at home.",
      "Emma watches a film at home.",
      "Emma is watching a film at home."
    ],
    "ans": 0,
    "zh": "艾玛在家看了一部电影。"
  },
  {
    "audio": "Chen Tao walked to school last Monday.",
    "opts": [
      "Chen Tao walked to school last Monday.",
      "Chen Tao walks to school last Monday.",
      "Chen Tao is walking to school last Monday."
    ],
    "ans": 0,
    "zh": "陈涛上周一走路上学。"
  },
  {
    "audio": "Miss Li taught English in the classroom.",
    "opts": [
      "Miss Li taught English in the classroom.",
      "Miss Li teaches English in the classroom.",
      "Miss Li is teaching English in the classroom."
    ],
    "ans": 0,
    "zh": "李老师在教室里教英语。"
  },
  {
    "audio": "Mr Wang cooked dinner for his family.",
    "opts": [
      "Mr Wang cooked dinner for his family.",
      "Mr Wang cooks dinner for his family.",
      "Mr Wang is cooking dinner for his family."
    ],
    "ans": 0,
    "zh": "王老师为家人做了晚餐。"
  },
  {
    "audio": "Teng Fei climbed the hill on Saturday.",
    "opts": [
      "Teng Fei climbed the hill on Saturday.",
      "Teng Fei climbs the hill on Saturday.",
      "Teng Fei is climbing the hill on Saturday."
    ],
    "ans": 0,
    "zh": "腾飞周六爬了山。"
  },
  {
    "audio": "Han Lin visited Chengdu with Linda.",
    "opts": [
      "Han Lin visited Chengdu with Linda.",
      "Han Lin visits Chengdu with Linda.",
      "Han Lin is visiting Chengdu with Linda."
    ],
    "ans": 0,
    "zh": "韩林和琳达一起游览了成都。"
  },
  {
    "audio": "Linda bought some souvenirs in Chengdu.",
    "opts": [
      "Linda bought some souvenirs in Chengdu.",
      "Linda buys some souvenirs in Chengdu.",
      "Linda is buying some souvenirs in Chengdu."
    ],
    "ans": 0,
    "zh": "琳达在成都买了一些纪念品。"
  },
  {
    "audio": "The children had a picnic in the park.",
    "opts": [
      "The children had a picnic in the park.",
      "The children have a picnic in the park.",
      "The children are having a picnic in the park."
    ],
    "ans": 0,
    "zh": "孩子们在公园里野餐了。"
  }
];

  global.L03pCorpus = {
    vocabRegular: VOCAB_REGULAR,
    vocabIrregular: VOCAB_IRREGULAR,
    vocabTime: VOCAB_TIME,
    vocabBe: VOCAB_BE,
    vocabDaily: VOCAB_REGULAR.concat(VOCAB_IRREGULAR),
    qWasWere: Q_WAS_WERE,
    qRegular: Q_REGULAR,
    qIrregular: Q_IRREGULAR,
    qNeg: Q_NEG,
    qDid: Q_DID,
    qMix: Q_MIX,
    matchPairs: MATCH_PAIRS,
    listenPick: LISTEN_PICK,
  };
})(typeof window !== "undefined" ? window : null);
