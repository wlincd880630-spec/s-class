/* L05 Pronouns · DeepSeek corpus + curated forms + per-sentence art */
(function(g){
'use strict';
g.L05PronounsData={
  "meta": {
    "title": "五种代词全掌握",
    "subtitle": "主格 · 宾格 · 形物 · 名物 · 反身",
    "source": "DeepSeek corpus + curated usages",
    "hero": "pronouns-hero.jpg",
    "teachImg": "pronouns-teach.jpg",
    "raceImg": "pronouns-race.jpg"
  },
  "levels": {
    "g7": {
      "id": "g7",
      "label": "初一",
      "hint": "认形 + 基本位置"
    },
    "g8": {
      "id": "g8",
      "label": "初二",
      "hint": "常用搭配 + 易混点"
    },
    "g9": {
      "id": "g9",
      "label": "初三",
      "hint": "辨析 + 中考易错"
    }
  },
  "types": [
    {
      "id": "subject",
      "nameZh": "主格",
      "nameEn": "Subject Pronouns",
      "short": "作主语",
      "color": "#0ea5e9",
      "image": "pronouns-subject.jpg",
      "forms": [
        {
          "form": "I",
          "zh": "我"
        },
        {
          "form": "you",
          "zh": "你/你们"
        },
        {
          "form": "he",
          "zh": "他"
        },
        {
          "form": "she",
          "zh": "她"
        },
        {
          "form": "it",
          "zh": "它"
        },
        {
          "form": "we",
          "zh": "我们"
        },
        {
          "form": "they",
          "zh": "他们/她们/它们"
        }
      ],
      "usages": [
        {
          "title": "作主语",
          "desc": "放在动词前，说明「谁做这件事」。",
          "en": "I love English.",
          "zh": "我喜欢英语。",
          "image": "ex/use-subject-0.jpg"
        },
        {
          "title": "Be 动词后表语（指人）",
          "desc": "口语中介绍身份时常用主格。",
          "en": "It is I. / It's me.（口语更常用 me）",
          "zh": "是我。",
          "image": "ex/use-subject-1.jpg"
        },
        {
          "title": "并列主语",
          "desc": "两人并列作主语都用主格：He and I。",
          "en": "He and I are in Class 3.",
          "zh": "他和我在三班。",
          "image": "ex/use-subject-2.jpg"
        }
      ]
    },
    {
      "id": "object",
      "nameZh": "宾格",
      "nameEn": "Object Pronouns",
      "short": "作宾语",
      "color": "#14b8a6",
      "image": "pronouns-object.jpg",
      "forms": [
        {
          "form": "me",
          "zh": "我"
        },
        {
          "form": "you",
          "zh": "你/你们"
        },
        {
          "form": "him",
          "zh": "他"
        },
        {
          "form": "her",
          "zh": "她"
        },
        {
          "form": "it",
          "zh": "它"
        },
        {
          "form": "us",
          "zh": "我们"
        },
        {
          "form": "them",
          "zh": "他们/她们/它们"
        }
      ],
      "usages": [
        {
          "title": "动词后作宾语",
          "desc": "动作的承受者用宾格。",
          "en": "Miss Li helped me.",
          "zh": "李老师帮助了我。",
          "image": "ex/use-object-0.jpg"
        },
        {
          "title": "介词后作宾语",
          "desc": "for / to / with / between 后用宾格。",
          "en": "This gift is for her.",
          "zh": "这份礼物是给她的。",
          "image": "ex/use-object-1.jpg"
        },
        {
          "title": "双宾语",
          "desc": "give / tell / show / send 后的人用宾格。",
          "en": "Please tell us the truth.",
          "zh": "请告诉我们真相。",
          "image": "ex/use-object-2.jpg"
        }
      ]
    },
    {
      "id": "possAdj",
      "nameZh": "形容词性物主代词",
      "nameEn": "Possessive Adjectives",
      "short": "后接名词",
      "color": "#f59e0b",
      "image": "pronouns-poss-adj.jpg",
      "forms": [
        {
          "form": "my",
          "zh": "我的"
        },
        {
          "form": "your",
          "zh": "你的/你们的"
        },
        {
          "form": "his",
          "zh": "他的"
        },
        {
          "form": "her",
          "zh": "她的"
        },
        {
          "form": "its",
          "zh": "它的"
        },
        {
          "form": "our",
          "zh": "我们的"
        },
        {
          "form": "their",
          "zh": "他们的"
        }
      ],
      "usages": [
        {
          "title": "修饰名词",
          "desc": "后面必须再接名词，不能单独用。",
          "en": "This is my book.",
          "zh": "这是我的书。",
          "image": "ex/use-possAdj-0.jpg"
        },
        {
          "title": "与名词所有格分工",
          "desc": "人名用 's：Tom's bag；代词用 my/his。",
          "en": "Her desk is near the window.",
          "zh": "她的课桌靠近窗户。",
          "image": "ex/use-possAdj-1.jpg"
        },
        {
          "title": "易混 its / it's",
          "desc": "its=它的；it's=it is。",
          "en": "The dog wagged its tail.",
          "zh": "狗摇了摇它的尾巴。",
          "image": "ex/use-possAdj-2.jpg"
        }
      ]
    },
    {
      "id": "possPron",
      "nameZh": "名词性物主代词",
      "nameEn": "Possessive Pronouns",
      "short": "单独使用",
      "color": "#ef4444",
      "image": "pronouns-poss-pron.jpg",
      "forms": [
        {
          "form": "mine",
          "zh": "我的"
        },
        {
          "form": "yours",
          "zh": "你的/你们的"
        },
        {
          "form": "his",
          "zh": "他的"
        },
        {
          "form": "hers",
          "zh": "她的"
        },
        {
          "form": "its（罕用）",
          "zh": "它的"
        },
        {
          "form": "ours",
          "zh": "我们的"
        },
        {
          "form": "theirs",
          "zh": "他们的"
        }
      ],
      "usages": [
        {
          "title": "单独使用",
          "desc": "后面不再接名词，相当于 my + 名词。",
          "en": "This pen is mine.",
          "zh": "这支笔是我的。",
          "image": "ex/use-possPron-0.jpg"
        },
        {
          "title": "回答 Whose",
          "desc": "Whose bag is this? — It's hers.",
          "en": "Whose bag is this? It's hers.",
          "zh": "这是谁的包？是她的。",
          "image": "ex/use-possPron-1.jpg"
        },
        {
          "title": "对比形物 vs 名物",
          "desc": "空格后有名词→my；无名词→mine。",
          "en": "Your book is new. Mine is old.",
          "zh": "你的书是新的。我的是旧的。",
          "image": "ex/use-possPron-2.jpg"
        }
      ]
    },
    {
      "id": "reflexive",
      "nameZh": "反身代词",
      "nameEn": "Reflexive Pronouns",
      "short": "指回主语",
      "color": "#0f766e",
      "image": "pronouns-reflexive.jpg",
      "forms": [
        {
          "form": "myself",
          "zh": "我自己"
        },
        {
          "form": "yourself",
          "zh": "你自己"
        },
        {
          "form": "himself",
          "zh": "他自己"
        },
        {
          "form": "herself",
          "zh": "她自己"
        },
        {
          "form": "itself",
          "zh": "它自己"
        },
        {
          "form": "ourselves",
          "zh": "我们自己"
        },
        {
          "form": "yourselves",
          "zh": "你们自己"
        },
        {
          "form": "themselves",
          "zh": "他们自己"
        }
      ],
      "usages": [
        {
          "title": "动作回到主语自身",
          "desc": "主语既是发出者又是承受者。",
          "en": "He hurt himself.",
          "zh": "他伤到了自己。",
          "image": "ex/use-reflexive-0.jpg"
        },
        {
          "title": "强调亲自做",
          "desc": "常译作「亲自 / 自己」。",
          "en": "I made the cake myself.",
          "zh": "我亲自做了蛋糕。",
          "image": "ex/use-reflexive-1.jpg"
        },
        {
          "title": "固定搭配",
          "desc": "enjoy oneself / help yourself / by oneself。",
          "en": "Help yourselves to some fruit.",
          "zh": "请随便吃些水果。",
          "image": "ex/use-reflexive-2.jpg"
        },
        {
          "title": "单复数一致",
          "desc": "you→yourself/yourselves；they→themselves（不是 theirselves）。",
          "en": "They enjoyed themselves at the party.",
          "zh": "他们在聚会上玩得很开心。",
          "image": "ex/use-reflexive-3.jpg"
        }
      ]
    }
  ],
  "examples": {
    "subject": {
      "g7": [
        {
          "en": "I am a student.",
          "zh": "我是一名学生。",
          "tip": "主语用主格",
          "focus": "I",
          "image": "ex/ex-subject-g7-0.jpg"
        },
        {
          "en": "You are my friend.",
          "zh": "你是我的朋友。",
          "tip": "主语用主格",
          "focus": "You",
          "image": "ex/ex-subject-g7-1.jpg"
        },
        {
          "en": "She likes apples.",
          "zh": "她喜欢苹果。",
          "tip": "主语用主格",
          "focus": "She",
          "image": "ex/ex-subject-g7-2.jpg"
        },
        {
          "en": "We have a new teacher.",
          "zh": "我们有一位新老师。",
          "tip": "主语用主格",
          "focus": "We",
          "image": "ex/ex-subject-g7-3.jpg"
        }
      ],
      "g8": [
        {
          "en": "He plays basketball after school.",
          "zh": "他放学后打篮球。",
          "tip": "主语用主格",
          "focus": "He",
          "image": "ex/ex-subject-g8-0.jpg"
        },
        {
          "en": "They are going to the park.",
          "zh": "他们要去公园。",
          "tip": "主语用主格",
          "focus": "They",
          "image": "ex/ex-subject-g8-1.jpg"
        },
        {
          "en": "It is a sunny day.",
          "zh": "今天是晴天。",
          "tip": "主语用主格",
          "focus": "It",
          "image": "ex/ex-subject-g8-2.jpg"
        },
        {
          "en": "You and I are good friends.",
          "zh": "你我是好朋友。",
          "tip": "并列主语用主格",
          "focus": "I",
          "image": "ex/ex-subject-g8-3.jpg"
        }
      ],
      "g9": [
        {
          "en": "She and I often study together.",
          "zh": "她和我经常一起学习。",
          "tip": "并列主语用主格，避免用me",
          "focus": "I",
          "image": "ex/ex-subject-g9-0.jpg"
        },
        {
          "en": "We all like our English teacher.",
          "zh": "我们都喜欢我们的英语老师。",
          "tip": "主语用主格",
          "focus": "We",
          "image": "ex/ex-subject-g9-1.jpg"
        },
        {
          "en": "They are the winners of the game.",
          "zh": "他们是比赛的获胜者。",
          "tip": "主语用主格",
          "focus": "They",
          "image": "ex/ex-subject-g9-2.jpg"
        },
        {
          "en": "He doesn't know the answer.",
          "zh": "他不知道答案。",
          "tip": "主语用主格",
          "focus": "He",
          "image": "ex/ex-subject-g9-3.jpg"
        }
      ]
    },
    "object": {
      "g7": [
        {
          "en": "Please help me.",
          "zh": "请帮助我。",
          "tip": "动词后用宾格",
          "focus": "me",
          "image": "ex/ex-object-g7-0.jpg"
        },
        {
          "en": "I like you.",
          "zh": "我喜欢你。",
          "tip": "动词后用宾格",
          "focus": "you",
          "image": "ex/ex-object-g7-1.jpg"
        },
        {
          "en": "She sees him every day.",
          "zh": "她每天看见他。",
          "tip": "动词后用宾格",
          "focus": "him",
          "image": "ex/ex-object-g7-2.jpg"
        },
        {
          "en": "We love them.",
          "zh": "我们爱他们。",
          "tip": "动词后用宾格",
          "focus": "them",
          "image": "ex/ex-object-g7-3.jpg"
        }
      ],
      "g8": [
        {
          "en": "Can you help us with our homework?",
          "zh": "你能帮助我们做作业吗？",
          "tip": "介词后用宾格",
          "focus": "us",
          "image": "ex/ex-object-g8-0.jpg"
        },
        {
          "en": "I will call her later.",
          "zh": "我稍后给她打电话。",
          "tip": "动词后用宾格",
          "focus": "her",
          "image": "ex/ex-object-g8-1.jpg"
        },
        {
          "en": "Please give it to me.",
          "zh": "请把它给我。",
          "tip": "介词后用宾格",
          "focus": "me",
          "image": "ex/ex-object-g8-2.jpg"
        },
        {
          "en": "They invited us to the party.",
          "zh": "他们邀请我们参加聚会。",
          "tip": "动词后用宾格",
          "focus": "us",
          "image": "ex/ex-object-g8-3.jpg"
        }
      ],
      "g9": [
        {
          "en": "Between you and me, he is wrong.",
          "zh": "在你我之间，他错了。",
          "tip": "介词后用宾格，不用I",
          "focus": "me",
          "image": "ex/ex-object-g9-0.jpg"
        },
        {
          "en": "She taught us English last year.",
          "zh": "她去年教我们英语。",
          "tip": "动词后用宾格",
          "focus": "us",
          "image": "ex/ex-object-g9-1.jpg"
        },
        {
          "en": "I saw him at the library.",
          "zh": "我在图书馆看见了他。",
          "tip": "动词后用宾格",
          "focus": "him",
          "image": "ex/ex-object-g9-2.jpg"
        },
        {
          "en": "Please tell them the good news.",
          "zh": "请告诉他们这个好消息。",
          "tip": "动词后用宾格",
          "focus": "them",
          "image": "ex/ex-object-g9-3.jpg"
        }
      ]
    },
    "possAdj": {
      "g7": [
        {
          "en": "This is my book.",
          "zh": "这是我的书。",
          "tip": "形容词性物主代词后接名词",
          "focus": "my",
          "image": "ex/ex-possAdj-g7-0.jpg"
        },
        {
          "en": "Your bag is nice.",
          "zh": "你的包很漂亮。",
          "tip": "形容词性物主代词后接名词",
          "focus": "your",
          "image": "ex/ex-possAdj-g7-1.jpg"
        },
        {
          "en": "Her name is Lily.",
          "zh": "她的名字是莉莉。",
          "tip": "形容词性物主代词后接名词",
          "focus": "her",
          "image": "ex/ex-possAdj-g7-2.jpg"
        },
        {
          "en": "Our school is big.",
          "zh": "我们的学校很大。",
          "tip": "形容词性物主代词后接名词",
          "focus": "our",
          "image": "ex/ex-possAdj-g7-3.jpg"
        }
      ],
      "g8": [
        {
          "en": "His father is a doctor.",
          "zh": "他的爸爸是医生。",
          "tip": "形容词性物主代词后接名词",
          "focus": "his",
          "image": "ex/ex-possAdj-g8-0.jpg"
        },
        {
          "en": "Its tail is long.",
          "zh": "它的尾巴很长。",
          "tip": "形容词性物主代词后接名词",
          "focus": "its",
          "image": "ex/ex-possAdj-g8-1.jpg"
        },
        {
          "en": "Their house is near the park.",
          "zh": "他们的房子在公园附近。",
          "tip": "形容词性物主代词后接名词",
          "focus": "their",
          "image": "ex/ex-possAdj-g8-2.jpg"
        },
        {
          "en": "My mother cooks dinner.",
          "zh": "我妈妈做晚饭。",
          "tip": "形容词性物主代词后接名词",
          "focus": "my",
          "image": "ex/ex-possAdj-g8-3.jpg"
        }
      ],
      "g9": [
        {
          "en": "Your idea sounds great.",
          "zh": "你的主意听起来很棒。",
          "tip": "形容词性物主代词后接名词",
          "focus": "your",
          "image": "ex/ex-possAdj-g9-0.jpg"
        },
        {
          "en": "Her brother is in my class.",
          "zh": "她的哥哥在我的班级。",
          "tip": "形容词性物主代词后接名词",
          "focus": "her",
          "image": "ex/ex-possAdj-g9-1.jpg"
        },
        {
          "en": "Our teacher is very kind.",
          "zh": "我们的老师非常和蔼。",
          "tip": "形容词性物主代词后接名词",
          "focus": "our",
          "image": "ex/ex-possAdj-g9-2.jpg"
        },
        {
          "en": "Their parents are busy.",
          "zh": "他们的父母很忙。",
          "tip": "形容词性物主代词后接名词",
          "focus": "their",
          "image": "ex/ex-possAdj-g9-3.jpg"
        }
      ]
    },
    "possPron": {
      "g7": [
        {
          "en": "The book is mine.",
          "zh": "这本书是我的。",
          "tip": "名词性物主代词独立使用",
          "focus": "mine",
          "image": "ex/ex-possPron-g7-0.jpg"
        },
        {
          "en": "Is this yours?",
          "zh": "这是你的吗？",
          "tip": "名词性物主代词独立使用",
          "focus": "yours",
          "image": "ex/ex-possPron-g7-1.jpg"
        },
        {
          "en": "The pen is hers.",
          "zh": "这支笔是她的。",
          "tip": "名词性物主代词独立使用",
          "focus": "hers",
          "image": "ex/ex-possPron-g7-2.jpg"
        },
        {
          "en": "The classroom is ours.",
          "zh": "这间教室是我们的。",
          "tip": "名词性物主代词独立使用",
          "focus": "ours",
          "image": "ex/ex-possPron-g7-3.jpg"
        }
      ],
      "g8": [
        {
          "en": "This seat is his.",
          "zh": "这个座位是他的。",
          "tip": "名词性物主代词独立使用",
          "focus": "his",
          "image": "ex/ex-possPron-g8-0.jpg"
        },
        {
          "en": "The cat is theirs.",
          "zh": "这只猫是他们的。",
          "tip": "名词性物主代词独立使用",
          "focus": "theirs",
          "image": "ex/ex-possPron-g8-1.jpg"
        },
        {
          "en": "My bag is red, and yours is blue.",
          "zh": "我的包是红色的，你的是蓝色的。",
          "tip": "避免重复名词",
          "focus": "yours",
          "image": "ex/ex-possPron-g8-2.jpg"
        },
        {
          "en": "Our school is bigger than theirs.",
          "zh": "我们的学校比他们的大。",
          "tip": "名词性物主代词独立使用",
          "focus": "theirs",
          "image": "ex/ex-possPron-g8-3.jpg"
        }
      ],
      "g9": [
        {
          "en": "This is not my umbrella; it's hers.",
          "zh": "这不是我的伞，是她的。",
          "tip": "区分my和mine",
          "focus": "hers",
          "image": "ex/ex-possPron-g9-0.jpg"
        },
        {
          "en": "Your phone is new, but mine is old.",
          "zh": "你的手机是新的，但我的旧了。",
          "tip": "名词性物主代词独立使用",
          "focus": "mine",
          "image": "ex/ex-possPron-g9-1.jpg"
        },
        {
          "en": "Their house is bigger than ours.",
          "zh": "他们的房子比我们的大。",
          "tip": "名词性物主代词独立使用",
          "focus": "ours",
          "image": "ex/ex-possPron-g9-2.jpg"
        },
        {
          "en": "The choice is yours.",
          "zh": "选择权是你的。",
          "tip": "名词性物主代词独立使用",
          "focus": "yours",
          "image": "ex/ex-possPron-g9-3.jpg"
        }
      ]
    },
    "reflexive": {
      "g7": [
        {
          "en": "I can do it myself.",
          "zh": "我自己能做。",
          "tip": "反身代词强调自己",
          "focus": "myself",
          "image": "ex/ex-reflexive-g7-0.jpg"
        },
        {
          "en": "She made the cake herself.",
          "zh": "她自己做蛋糕。",
          "tip": "反身代词强调自己",
          "focus": "herself",
          "image": "ex/ex-reflexive-g7-1.jpg"
        },
        {
          "en": "He hurt himself.",
          "zh": "他伤了自己。",
          "tip": "反身代词作宾语",
          "focus": "himself",
          "image": "ex/ex-reflexive-g7-2.jpg"
        },
        {
          "en": "We enjoyed ourselves at the party.",
          "zh": "我们在聚会上玩得很开心。",
          "tip": "反身代词与enjoy搭配",
          "focus": "ourselves",
          "image": "ex/ex-reflexive-g7-3.jpg"
        }
      ],
      "g8": [
        {
          "en": "You should believe in yourself.",
          "zh": "你应该相信自己。",
          "tip": "反身代词作介词宾语",
          "focus": "yourself",
          "image": "ex/ex-reflexive-g8-0.jpg"
        },
        {
          "en": "They built the house themselves.",
          "zh": "他们自己建了房子。",
          "tip": "反身代词强调主语",
          "focus": "themselves",
          "image": "ex/ex-reflexive-g8-1.jpg"
        },
        {
          "en": "I taught myself English.",
          "zh": "我自学英语。",
          "tip": "反身代词作动词宾语",
          "focus": "myself",
          "image": "ex/ex-reflexive-g8-2.jpg"
        },
        {
          "en": "She looked at herself in the mirror.",
          "zh": "她看着镜子里的自己。",
          "tip": "反身代词作介词宾语",
          "focus": "herself",
          "image": "ex/ex-reflexive-g8-3.jpg"
        }
      ],
      "g9": [
        {
          "en": "He introduced himself to the class.",
          "zh": "他向全班介绍了自己。",
          "tip": "反身代词作动词宾语",
          "focus": "himself",
          "image": "ex/ex-reflexive-g9-0.jpg"
        },
        {
          "en": "We should help ourselves first.",
          "zh": "我们应该先帮助自己。",
          "tip": "反身代词作动词宾语",
          "focus": "ourselves",
          "image": "ex/ex-reflexive-g9-1.jpg"
        },
        {
          "en": "She is proud of herself.",
          "zh": "她为自己感到骄傲。",
          "tip": "反身代词作介词宾语",
          "focus": "herself",
          "image": "ex/ex-reflexive-g9-2.jpg"
        },
        {
          "en": "They enjoyed themselves at the beach.",
          "zh": "他们在海滩玩得很开心。",
          "tip": "反身代词与enjoy搭配",
          "focus": "themselves",
          "image": "ex/ex-reflexive-g9-3.jpg"
        }
      ]
    }
  },
  "quiz": {
    "g7": [
      {
        "q": "____ is my best friend.",
        "options": [
          "She",
          "Her",
          "Hers",
          "Herself"
        ],
        "answer": 0,
        "explain": "主语位置用主格She",
        "type": "subject"
      },
      {
        "q": "Please give ____ the book.",
        "options": [
          "I",
          "me",
          "my",
          "mine"
        ],
        "answer": 1,
        "explain": "动词后接宾格me",
        "type": "object"
      },
      {
        "q": "This is ____ pen.",
        "options": [
          "I",
          "me",
          "my",
          "mine"
        ],
        "answer": 2,
        "explain": "名词前用形容词性物主代词my",
        "type": "possAdj"
      },
      {
        "q": "The blue bag is ____.",
        "options": [
          "her",
          "hers",
          "she",
          "herself"
        ],
        "answer": 1,
        "explain": "表语后无名词，用名词性物主代词hers",
        "type": "possPron"
      },
      {
        "q": "He taught ____ English.",
        "options": [
          "him",
          "his",
          "himself",
          "he"
        ],
        "answer": 2,
        "explain": "主语和宾语相同，用反身代词himself",
        "type": "reflexive"
      },
      {
        "q": "____ are good students.",
        "options": [
          "They",
          "Them",
          "Their",
          "Theirs"
        ],
        "answer": 0,
        "explain": "主语用主格They",
        "type": "subject"
      },
      {
        "q": "I like ____ very much.",
        "options": [
          "she",
          "her",
          "hers",
          "herself"
        ],
        "answer": 1,
        "explain": "动词后接宾格her",
        "type": "object"
      },
      {
        "q": "____ father is a doctor.",
        "options": [
          "We",
          "Us",
          "Our",
          "Ours"
        ],
        "answer": 2,
        "explain": "名词前用形容词性物主代词Our",
        "type": "possAdj"
      }
    ],
    "g8": [
      {
        "q": "____ is going to visit us tomorrow.",
        "options": [
          "He",
          "Him",
          "His",
          "Himself"
        ],
        "answer": 0,
        "explain": "主语用主格He",
        "type": "subject"
      },
      {
        "q": "Can you help ____ with my homework?",
        "options": [
          "I",
          "me",
          "my",
          "mine"
        ],
        "answer": 1,
        "explain": "动词help后接宾格me",
        "type": "object"
      },
      {
        "q": "This is ____ new bike.",
        "options": [
          "you",
          "your",
          "yours",
          "yourself"
        ],
        "answer": 1,
        "explain": "名词前用形容词性物主代词your",
        "type": "possAdj"
      },
      {
        "q": "The red shoes are ____.",
        "options": [
          "my",
          "mine",
          "me",
          "myself"
        ],
        "answer": 1,
        "explain": "表语后无名词，用名词性物主代词mine",
        "type": "possPron"
      },
      {
        "q": "She made ____ a cup of tea.",
        "options": [
          "her",
          "hers",
          "herself",
          "she"
        ],
        "answer": 2,
        "explain": "动作回到主语，用反身代词herself",
        "type": "reflexive"
      },
      {
        "q": "____ are my classmates.",
        "options": [
          "They",
          "Them",
          "Their",
          "Theirs"
        ],
        "answer": 0,
        "explain": "主语用主格They",
        "type": "subject"
      },
      {
        "q": "We often see ____ at the library.",
        "options": [
          "he",
          "him",
          "his",
          "himself"
        ],
        "answer": 1,
        "explain": "动词后接宾格him",
        "type": "object"
      },
      {
        "q": "____ mother is a teacher.",
        "options": [
          "She",
          "Her",
          "Hers",
          "Herself"
        ],
        "answer": 1,
        "explain": "名词前用形容词性物主代词Her",
        "type": "possAdj"
      }
    ],
    "g9": [
      {
        "q": "____ are responsible for our actions.",
        "options": [
          "We",
          "Us",
          "Our",
          "Ours"
        ],
        "answer": 0,
        "explain": "主语用主格We",
        "type": "subject"
      },
      {
        "q": "The teacher gave ____ a lot of homework.",
        "options": [
          "we",
          "us",
          "our",
          "ours"
        ],
        "answer": 1,
        "explain": "动词后接宾格us",
        "type": "object"
      },
      {
        "q": "____ school is very beautiful.",
        "options": [
          "They",
          "Them",
          "Their",
          "Theirs"
        ],
        "answer": 2,
        "explain": "名词前用形容词性物主代词Their",
        "type": "possAdj"
      },
      {
        "q": "This dictionary is ____.",
        "options": [
          "her",
          "hers",
          "she",
          "herself"
        ],
        "answer": 1,
        "explain": "表语后无名词，用名词性物主代词hers",
        "type": "possPron"
      },
      {
        "q": "You should believe in ____.",
        "options": [
          "you",
          "your",
          "yours",
          "yourself"
        ],
        "answer": 3,
        "explain": "介词后接反身代词yourself",
        "type": "reflexive"
      },
      {
        "q": "____ is important to study hard.",
        "options": [
          "It",
          "Its",
          "It's",
          "Itself"
        ],
        "answer": 0,
        "explain": "形式主语用It",
        "type": "subject"
      },
      {
        "q": "I will call ____ later.",
        "options": [
          "they",
          "them",
          "their",
          "theirs"
        ],
        "answer": 1,
        "explain": "动词后接宾格them",
        "type": "object"
      },
      {
        "q": "____ books are on the desk.",
        "options": [
          "We",
          "Us",
          "Our",
          "Ours"
        ],
        "answer": 2,
        "explain": "名词前用形容词性物主代词Our",
        "type": "possAdj"
      }
    ]
  },
  "imitate": {
    "g7": [
      {
        "en": "This is my book.",
        "zh": "这是我的书。",
        "focus": "possessive adjective 'my'",
        "type": "listen-and-repeat",
        "image": "ex/im-g7-0.jpg"
      },
      {
        "en": "They are our friends.",
        "zh": "他们是我们的朋友。",
        "focus": "possessive adjective 'our'",
        "type": "listen-and-repeat",
        "image": "ex/im-g7-1.jpg"
      },
      {
        "en": "The cat is hers.",
        "zh": "这只猫是她的。",
        "focus": "possessive pronoun 'hers'",
        "type": "listen-and-repeat",
        "image": "ex/im-g7-2.jpg"
      },
      {
        "en": "I like him.",
        "zh": "我喜欢他。",
        "focus": "object pronoun 'him'",
        "type": "listen-and-repeat",
        "image": "ex/im-g7-3.jpg"
      },
      {
        "en": "We saw them yesterday.",
        "zh": "我们昨天看到他们了。",
        "focus": "object pronoun 'them'",
        "type": "listen-and-repeat",
        "image": "ex/im-g7-4.jpg"
      },
      {
        "en": "She is a teacher.",
        "zh": "她是一位老师。",
        "focus": "subject pronoun 'she'",
        "type": "listen-and-repeat",
        "image": "ex/im-g7-5.jpg"
      }
    ],
    "g8": [
      {
        "en": "Whose pen is this? It's mine.",
        "zh": "这是谁的钢笔？是我的。",
        "focus": "possessive pronoun 'mine'",
        "type": "listen-and-repeat",
        "image": "ex/im-g8-0.jpg"
      },
      {
        "en": "He gave her a gift.",
        "zh": "他给了她一份礼物。",
        "focus": "object pronoun 'her'",
        "type": "listen-and-repeat",
        "image": "ex/im-g8-1.jpg"
      },
      {
        "en": "We are going to the park.",
        "zh": "我们正要去公园。",
        "focus": "subject pronoun 'we'",
        "type": "listen-and-repeat",
        "image": "ex/im-g8-2.jpg"
      },
      {
        "en": "These are their bags.",
        "zh": "这些是他们的包。",
        "focus": "possessive adjective 'their'",
        "type": "listen-and-repeat",
        "image": "ex/im-g8-3.jpg"
      },
      {
        "en": "The dog wagged its tail.",
        "zh": "狗摇了摇它的尾巴。",
        "focus": "possessive adjective 'its'",
        "type": "listen-and-repeat",
        "image": "ex/im-g8-4.jpg"
      },
      {
        "en": "Can you help us?",
        "zh": "你能帮助我们吗？",
        "focus": "object pronoun 'us'",
        "type": "listen-and-repeat",
        "image": "ex/im-g8-5.jpg"
      }
    ],
    "g9": [
      {
        "en": "The book on the desk is yours.",
        "zh": "桌子上的书是你的。",
        "focus": "possessive pronoun 'yours'",
        "type": "listen-and-repeat",
        "image": "ex/im-g9-0.jpg"
      },
      {
        "en": "They themselves built the house.",
        "zh": "他们自己建造了这所房子。",
        "focus": "reflexive pronoun 'themselves'",
        "type": "listen-and-repeat",
        "image": "ex/im-g9-1.jpg"
      },
      {
        "en": "She made a cake for herself.",
        "zh": "她为自己做了一个蛋糕。",
        "focus": "reflexive pronoun 'herself'",
        "type": "listen-and-repeat",
        "image": "ex/im-g9-2.jpg"
      },
      {
        "en": "We should be proud of ourselves.",
        "zh": "我们应该为自己感到骄傲。",
        "focus": "reflexive pronoun 'ourselves'",
        "type": "listen-and-repeat",
        "image": "ex/im-g9-3.jpg"
      },
      {
        "en": "He introduced me to his parents.",
        "zh": "他把我介绍给他的父母。",
        "focus": "object pronoun 'me'",
        "type": "listen-and-repeat",
        "image": "ex/im-g9-4.jpg"
      },
      {
        "en": "That is her idea, not his.",
        "zh": "那是她的主意，不是他的。",
        "focus": "possessive pronoun 'his'",
        "type": "listen-and-repeat",
        "image": "ex/im-g9-5.jpg"
      }
    ]
  },
  "comprehensive": {
    "g7": [
      {
        "q": "Choose the correct pronoun: ___ am a student.",
        "options": [
          "I",
          "Me",
          "My",
          "Mine"
        ],
        "answer": "I",
        "explain": "Subject pronoun needed for the subject of the sentence.",
        "type": "subject pronoun"
      },
      {
        "q": "This is ___ book. (belongs to you)",
        "options": [
          "you",
          "your",
          "yours",
          "yourself"
        ],
        "answer": "your",
        "explain": "Possessive adjective before a noun.",
        "type": "possessive adjective"
      },
      {
        "q": "The gift is for ___. (him)",
        "options": [
          "he",
          "his",
          "him",
          "himself"
        ],
        "answer": "him",
        "explain": "Object pronoun after preposition 'for'.",
        "type": "object pronoun"
      },
      {
        "q": "That bike is ___. (belongs to her)",
        "options": [
          "her",
          "hers",
          "she",
          "herself"
        ],
        "answer": "hers",
        "explain": "Possessive pronoun standing alone.",
        "type": "possessive pronoun"
      },
      {
        "q": "We enjoyed ___ at the party.",
        "options": [
          "us",
          "our",
          "ourselves",
          "ours"
        ],
        "answer": "ourselves",
        "explain": "Reflexive pronoun for 'we'.",
        "type": "reflexive pronoun"
      },
      {
        "q": "___ are good friends. (we)",
        "options": [
          "Us",
          "Our",
          "We",
          "Ours"
        ],
        "answer": "We",
        "explain": "Subject pronoun.",
        "type": "subject pronoun"
      },
      {
        "q": "Please give ___ the book. (I)",
        "options": [
          "I",
          "me",
          "my",
          "mine"
        ],
        "answer": "me",
        "explain": "Object pronoun after verb 'give'.",
        "type": "object pronoun"
      },
      {
        "q": "The cat washed ___ face.",
        "options": [
          "it",
          "its",
          "itself",
          "it's"
        ],
        "answer": "its",
        "explain": "Possessive adjective for 'it'.",
        "type": "possessive adjective"
      },
      {
        "q": "The house is ___. (belongs to them)",
        "options": [
          "their",
          "theirs",
          "they",
          "them"
        ],
        "answer": "theirs",
        "explain": "Possessive pronoun.",
        "type": "possessive pronoun"
      },
      {
        "q": "He hurt ___ while playing.",
        "options": [
          "him",
          "his",
          "himself",
          "he"
        ],
        "answer": "himself",
        "explain": "Reflexive pronoun for 'he'.",
        "type": "reflexive pronoun"
      }
    ],
    "g8": [
      {
        "q": "___ are going to the movies. (we)",
        "options": [
          "Us",
          "Our",
          "We",
          "Ours"
        ],
        "answer": "We",
        "explain": "Subject pronoun.",
        "type": "subject pronoun"
      },
      {
        "q": "I met ___ at the station. (she)",
        "options": [
          "she",
          "her",
          "hers",
          "herself"
        ],
        "answer": "her",
        "explain": "Object pronoun after verb 'met'.",
        "type": "object pronoun"
      },
      {
        "q": "This is ___ umbrella. (belongs to him)",
        "options": [
          "he",
          "him",
          "his",
          "himself"
        ],
        "answer": "his",
        "explain": "Possessive adjective before noun.",
        "type": "possessive adjective"
      },
      {
        "q": "The idea is ___. (belongs to us)",
        "options": [
          "our",
          "ours",
          "us",
          "ourselves"
        ],
        "answer": "ours",
        "explain": "Possessive pronoun.",
        "type": "possessive pronoun"
      },
      {
        "q": "She taught ___ to play the piano.",
        "options": [
          "her",
          "hers",
          "herself",
          "she"
        ],
        "answer": "herself",
        "explain": "Reflexive pronoun.",
        "type": "reflexive pronoun"
      },
      {
        "q": "___ is my best friend. (he)",
        "options": [
          "Him",
          "His",
          "He",
          "Himself"
        ],
        "answer": "He",
        "explain": "Subject pronoun.",
        "type": "subject pronoun"
      },
      {
        "q": "They invited ___ to the party. (we)",
        "options": [
          "we",
          "our",
          "us",
          "ours"
        ],
        "answer": "us",
        "explain": "Object pronoun after verb 'invited'.",
        "type": "object pronoun"
      },
      {
        "q": "The dog wagged ___ tail.",
        "options": [
          "it",
          "its",
          "itself",
          "it's"
        ],
        "answer": "its",
        "explain": "Possessive adjective.",
        "type": "possessive adjective"
      },
      {
        "q": "These books are ___. (belongs to you)",
        "options": [
          "your",
          "yours",
          "you",
          "yourself"
        ],
        "answer": "yours",
        "explain": "Possessive pronoun.",
        "type": "possessive pronoun"
      },
      {
        "q": "We should take care of ___.",
        "options": [
          "us",
          "our",
          "ourselves",
          "ours"
        ],
        "answer": "ourselves",
        "explain": "Reflexive pronoun.",
        "type": "reflexive pronoun"
      }
    ],
    "g9": [
      {
        "q": "___ is a doctor. (she)",
        "options": [
          "Her",
          "She",
          "Hers",
          "Herself"
        ],
        "answer": "She",
        "explain": "Subject pronoun.",
        "type": "subject pronoun"
      },
      {
        "q": "I saw ___ at the mall. (they)",
        "options": [
          "they",
          "them",
          "their",
          "theirs"
        ],
        "answer": "them",
        "explain": "Object pronoun.",
        "type": "object pronoun"
      },
      {
        "q": "This is ___ car. (belongs to you)",
        "options": [
          "you",
          "your",
          "yours",
          "yourself"
        ],
        "answer": "your",
        "explain": "Possessive adjective.",
        "type": "possessive adjective"
      },
      {
        "q": "The decision is ___. (belongs to them)",
        "options": [
          "their",
          "theirs",
          "they",
          "them"
        ],
        "answer": "theirs",
        "explain": "Possessive pronoun.",
        "type": "possessive pronoun"
      },
      {
        "q": "He blamed ___ for the mistake.",
        "options": [
          "him",
          "his",
          "himself",
          "he"
        ],
        "answer": "himself",
        "explain": "Reflexive pronoun.",
        "type": "reflexive pronoun"
      },
      {
        "q": "___ are the winners. (we)",
        "options": [
          "Us",
          "Our",
          "We",
          "Ours"
        ],
        "answer": "We",
        "explain": "Subject pronoun.",
        "type": "subject pronoun"
      },
      {
        "q": "Please call ___ later. (I)",
        "options": [
          "I",
          "me",
          "my",
          "mine"
        ],
        "answer": "me",
        "explain": "Object pronoun.",
        "type": "object pronoun"
      },
      {
        "q": "The cat licked ___ paws.",
        "options": [
          "it",
          "its",
          "itself",
          "it's"
        ],
        "answer": "its",
        "explain": "Possessive adjective.",
        "type": "possessive adjective"
      },
      {
        "q": "The money is ___. (belongs to him)",
        "options": [
          "he",
          "him",
          "his",
          "himself"
        ],
        "answer": "his",
        "explain": "Possessive pronoun.",
        "type": "possessive pronoun"
      },
      {
        "q": "She prepared ___ for the exam.",
        "options": [
          "her",
          "hers",
          "herself",
          "she"
        ],
        "answer": "herself",
        "explain": "Reflexive pronoun.",
        "type": "reflexive pronoun"
      }
    ]
  },
  "table": {
    "headers": [
      "人称",
      "主格",
      "宾格",
      "形物",
      "名物",
      "反身"
    ],
    "rows": [
      [
        "第一人称单数",
        "I",
        "me",
        "my",
        "mine",
        "myself"
      ],
      [
        "第二人称单数",
        "you",
        "you",
        "your",
        "yours",
        "yourself"
      ],
      [
        "第三人称单数(男)",
        "he",
        "him",
        "his",
        "his",
        "himself"
      ],
      [
        "第三人称单数(女)",
        "she",
        "her",
        "her",
        "hers",
        "herself"
      ],
      [
        "第三人称单数(物)",
        "it",
        "it",
        "its",
        "its",
        "itself"
      ],
      [
        "第一人称复数",
        "we",
        "us",
        "our",
        "ours",
        "ourselves"
      ],
      [
        "第二人称复数",
        "you",
        "you",
        "your",
        "yours",
        "yourselves"
      ],
      [
        "第三人称复数",
        "they",
        "them",
        "their",
        "theirs",
        "themselves"
      ]
    ],
    "memory": "主语用主格，宾位用宾格；有名用形物，无名用名物；动作回自身，反身来帮忙。"
  }
};
})(typeof window!=='undefined'?window:this);
