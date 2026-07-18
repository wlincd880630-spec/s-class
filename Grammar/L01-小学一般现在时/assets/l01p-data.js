(function (global) {
  "use strict";

  var PAGES = [
    { id:"p01", section:"导入", title:"听一听 · 声音先行", type:"sound-first", badge:"sound", badgeText:"🔊 声音先行",
      audio:"Every morning, Emma reads English stories in the school library. The school library is very big and quiet.",
      soundHint:"先听，不要看文字。听完再点「显示」。",
      question:"这些句子在说什么？", image:"l01p-scene-lily-library.png",
      sentence:"Every morning, Emma reads English stories in the school library.", zh:"每天早上，艾玛在学校图书馆读英语故事。",
      source:"5GB U3 · 七上 U3" },

    { id:"p02", section:"导入", title:"苏格拉底 · 发现时态", type:"socratic", badge:"ask", badgeText:"💭 想一想",
      image:"l01p-scene-tengfei-basketball.png", question:"「Teng Fei plays basketball after school.」说的是什么时候？",
      choices:[
        { text:"现在正在打篮球", correct:false, fb:"正在打要用现在进行时 be + doing。" },
        { text:"放学后经常打", correct:true, fb:"对了！after school = 经常发生的动作 → 一般现在时！" },
        { text:"昨天打过", correct:false, fb:"昨天要用过去时。" }
      ], sentence:"Teng Fei plays basketball with his classmates after school.", zh:"腾飞放学后和同学打篮球。",
      source:"七上 U1" },

    { id:"p03", section:"动作义 vs 状态义", title:"动作义 · 打篮球", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-tengfei-basketball.png",
      lead:"看得见身体在动 → 用实义动词（play / read / teach）",
      sentence:"Teng Fei plays basketball with his classmates after school.", zh:"腾飞放学后和同学打篮球。", verbType:"action",
      source:"七上 U1" },

    { id:"p04", section:"动作义 vs 状态义", title:"动作义 · 火车出发", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-train-leaves.png", lead:"时刻表上的动作也用一般现在时",
      sentence:"The train leaves the station at nine every morning.", zh:"火车每天早上九点驶离车站。", verbType:"action",
      source:"七上 U1 · 时刻表" },

    { id:"p05", section:"动作义 vs 状态义", title:"动作义 · 不浪费食物", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-waste-food.png", lead:"实义动词描述「做了什么」",
      sentence:"Don't waste food; take only what you can eat.", zh:"不要浪费食物，吃多少拿多少。", verbType:"action",
      source:"5GA U2" },

    { id:"p06", section:"动作义 vs 状态义", title:"状态义 · 图书馆很大", type:"scene", badge:"state", badgeText:"💙 状态义（be）",
      image:"l01p-scene-school-library-big.png",
      lead:"状态义用 be 动词：am / is / are + 表语（是谁、怎么样、在哪）",
      sentence:"The school library is very big and quiet.", zh:"学校图书馆又大又安静。", verbType:"state",
      source:"七上 U3" },

    { id:"p07", section:"动作义 vs 状态义", title:"状态义 · 食堂在运动场对面", type:"scene", badge:"state", badgeText:"💙 状态义（be）",
      image:"l01p-scene-dining-hall.png", lead:"地点关系也用 be 动词",
      sentence:"The dining hall is across from the sports field.", zh:"食堂在运动场对面。", verbType:"state",
      source:"七上 U3" },

    { id:"p08", section:"动作义 vs 状态义", title:"状态义 · 陈涛来自成都", type:"scene", badge:"state", badgeText:"💙 状态义（be）",
      image:"l01p-be-he-is-from-china.png", lead:"人名作主语：Chen Tao → is",
      sentence:"Chen Tao is from Chengdu, Sichuan.", zh:"陈涛来自四川成都。", verbType:"state",
      source:"Starter U1" },

    { id:"p09", section:"动作义 vs 状态义", title:"苏格拉底 · 分一分", type:"socratic", badge:"ask", badgeText:"💭 分类",
      image:"l01p-action-vs-be.png", question:"「The school library is very big.」属于哪一类？",
      choices:[
        { text:"动作义（实义动词）", correct:false, fb:"is 是 be 动词，不是实义动词。" },
        { text:"状态义（be 动词）", correct:true, fb:"正确！The school library = 单数 → is。" },
        { text:"不是一般现在时", correct:false, fb:"这也是一般现在时哦。" }
      ], sentence:"The school library is very big and quiet.", zh:"学校图书馆又大又安静。", verbType:"state",
      source:"七上 U3" },

    { id:"p10", section:"be 动词", title:"am / is / are 配对", type:"be-match", badge:"demo", badgeText:"🔗 配对",
      image:"l01p-scene-school-library-big.png",
      lead:"记住：I → am，He/She/It/人名/单数事物 → is，You/We/They/复数 → are",
      chart:[
        { subjects:"I", be:"am" },
        { subjects:"He / She / It / 人名 / 单数", be:"is" },
        { subjects:"You / We / They / 复数", be:"are" }
      ],
      drill:[
        { subject:"I", ans:"am", sentence:"I am in Grade Six this year.", zh:"我今年上六年级。" },
        { subject:"Emma", ans:"is", sentence:"Emma is from the UK.", zh:"艾玛来自英国。" },
        { subject:"These keys", ans:"are", sentence:"These keys are on the teacher's desk.", zh:"这些钥匙在讲台上。" },
        { subject:"Chen Tao", ans:"is", sentence:"Chen Tao is from Chengdu.", zh:"陈涛来自成都。" },
        { subject:"We", ans:"are", sentence:"We are good friends at school.", zh:"我们在学校是好朋友。" }
      ] },

    { id:"p11", section:"be 动词", title:"分类游戏 · 动作 vs be", type:"classify", badge:"ask", badgeText:"🧺 分类",
      image:"l01p-action-vs-be.png", lead:"把句子放进正确的篮子",
      buckets:[
        { key:"action", label:"🏃 动作义（实义动词）" },
        { key:"be", label:"💙 状态义（be 动词）" }
      ],
      items:[
        { text:"Teng Fei plays basketball after school.", bucket:"action", hint:"play 是实义动词。", zh:"腾飞放学后打篮球。" },
        { text:"The school library is very big.", bucket:"be", hint:"有 is，是 be 动词句。", zh:"学校图书馆很大。" },
        { text:"Mr Wang teaches science every Monday.", bucket:"action", hint:"teach 是实义动词。", zh:"王老师每周一教科学。" },
        { text:"The dining hall is across from the sports field.", bucket:"be", hint:"有 is，描述位置。", zh:"食堂在运动场对面。" },
        { text:"Lily saves pocket money every week.", bucket:"action", hint:"save 是实义动词。", zh:"莉莉每周存零花钱。" },
        { text:"Chengdu is famous for its pandas.", bucket:"be", hint:"有 is，描述特征。", zh:"成都以大熊猫闻名。" }
      ] },

    { id:"p12", section:"三单发现", title:"对比发现 · We vs Teng Fei", type:"discover", badge:"demo", badgeText:"🔍 自我发现",
      lead:"点击左右卡片听句子，再点「我发现了」对比动词变化。",
      leftImage:"l01p-scene-emma-badminton.png", leftLabel:"Emma and I play badminton.",
      rightImage:"l01p-scene-tengfei-basketball.png", rightLabel:"Teng Fei plays basketball.",
      leftSentence:"Emma and I play badminton after school.", leftZh:"艾玛和我放学后打羽毛球。",
      rightSentence:"Teng Fei plays basketball with his classmates.", rightZh:"腾飞和同学打篮球。",
      discovery:"发现了吗？Teng Fei = 第三人称单数，动词 play 要加 s → plays！" },

    { id:"p13", section:"三单发现", title:"苏格拉底 · teach 还是 teaches", type:"socratic", badge:"ask", badgeText:"💭 三单",
      image:"l01p-scene-mr-wang-teaches.png", question:"「Mr Wang _____ science every Monday.」选哪个？",
      choices:[
        { text:"teach", correct:false, fb:"Mr Wang = He，要用第三人称单数。" },
        { text:"teaches", correct:true, fb:"太棒了！人名作主语 → 动词加 es！" },
        { text:"teaching", correct:false, fb:"这里没有 be 动词，不能直接用 -ing。" }
      ], sentence:"Mr Wang teaches science in our classroom every Monday.", zh:"王老师每周一在教室教科学。",
      source:"5GA U4" },

    { id:"p14", section:"三单发现", title:"例句 · 乘公交上学", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-chentao-bus.png", sentence:"Tom goes to school by bus at seven thirty.", zh:"汤姆七点半乘公交上学。",
      source:"5GB U1" },

    { id:"p15", section:"三单发现", title:"例句 · 火车驶离车站", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-train-leaves.png", sentence:"The train leaves the station at nine every morning.", zh:"火车每天早上九点驶离车站。（leave → leaves）",
      source:"七上 U1" },

    { id:"p16", section:"拼写规律", title:"拼写实验室 ① 加 s", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      image:"l01p-scene-tengfei-basketball.png",
      rules:[
        { tab:"规则① +s", rule:"大多数动词直接加 s", examples:[{from:"play",to:"plays"},{from:"read",to:"reads"},{from:"save",to:"saves"}],
          sample:"Teng Fei plays basketball after school.", sampleZh:"腾飞放学后打篮球。" }
      ]},

    { id:"p17", section:"拼写规律", title:"拼写实验室 ② 加 es", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      image:"l01p-scene-washes-hands.png",
      rules:[
        { tab:"规则② +es", rule:"以 s / x / ch / sh 结尾加 es", examples:[{from:"wash",to:"washes"},{from:"watch",to:"watches"},{from:"teach",to:"teaches"}],
          sample:"Chen Tao washes his hands carefully before lunch.", sampleZh:"陈涛午饭前仔细洗手。" }
      ]},

    { id:"p18", section:"拼写规律", title:"拼写实验室 ③ 特殊", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      image:"l01p-scene-chentao-bus.png",
      rules:[
        { tab:"规则③ y→ies", rule:"辅音+y 结尾：变 y 为 i 再加 es", examples:[{from:"study",to:"studies"},{from:"fly",to:"flies"}], sample:"Emma studies English in the library.", sampleZh:"艾玛在图书馆学英语。" },
        { tab:"特殊", rule:"go → goes, have → has", examples:[{from:"go",to:"goes"},{from:"have",to:"has"}], sample:"Tom goes to school by bus.", sampleZh:"汤姆乘公交上学。" }
      ]},

    { id:"p19", section:"拼写测试", title:"拼写小测 ①", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-scene-washes-hands.png", q:"Chen Tao ___ his hands before lunch.", opts:["wash","washes","washing"], ans:1,
      hint:"Chen Tao = He，wash 以 sh 结尾加 es。", sentence:"Chen Tao washes his hands carefully before lunch.", zh:"陈涛午饭前仔细洗手。" },

    { id:"p20", section:"拼写测试", title:"拼写小测 ②", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-scene-train-leaves.png", q:"The train ___ the station at nine.", opts:["leave","leaves","leaving"], ans:1,
      hint:"The train = It，第三人称单数。", sentence:"The train leaves the station at nine every morning.", zh:"火车每天早上九点驶离车站。" },

    { id:"p21", section:"否定句", title:"动态演示 · don't", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"neg",
      image:"l01p-scene-waste-food.png", lead:"I/We/They 用 don't + 动词原形",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">We</span><span class="l01p-token l01p-token--verb">waste</span><span class="l01p-token l01p-token--obj">food</span>', speak:"We waste food in the dining hall." },
        { html:'<span class="l01p-token l01p-token--subj">We</span><span class="l01p-token l01p-token--aux l01p-token--pop">don\'t</span><span class="l01p-token l01p-token--verb">waste</span><span class="l01p-token l01p-token--obj">food</span>', speak:"We don't waste food in the dining hall." }
      ], sentence:"We don't waste food in the dining hall.", zh:"我们在食堂不浪费食物。" },

    { id:"p22", section:"否定句", title:"例句 · 不浪费食物", type:"scene", badge:"neg", badgeText:"🚫 否定",
      image:"l01p-scene-waste-food.png", sentence:"Don't waste food; take only what you can eat.", zh:"不要浪费食物，吃多少拿多少。", verbType:"neg",
      source:"5GA U2" },

    { id:"p23", section:"否定句", title:"动态演示 · doesn't", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"neg",
      image:"l01p-scene-doesnt-watch-tv.png", lead:"人名/He/She/It 用 doesn't，动词回到原形！（照妖镜法则）",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">Linda</span><span class="l01p-token l01p-token--verb">watches</span><span class="l01p-token l01p-token--obj">TV</span>', speak:"Linda watches TV at night." },
        { html:'<span class="l01p-token l01p-token--subj">Linda</span><span class="l01p-token l01p-token--aux l01p-token--pop">doesn\'t</span><span class="l01p-token l01p-token--verb">watch</span><span class="l01p-token l01p-token--obj">TV</span>', speak:"Linda doesn't watch TV at night on school days." }
      ], sentence:"Linda doesn't watch TV at night on school days.", zh:"上学日琳达晚上不看电视。" },

    { id:"p24", section:"否定句", title:"例句 · Linda 不看电视", type:"scene", badge:"neg", badgeText:"🚫 否定",
      image:"l01p-scene-doesnt-watch-tv.png", sentence:"Linda doesn't watch TV at night on school days.", zh:"上学日琳达晚上不看电视。", verbType:"neg",
      source:"七上 U2" },

    { id:"p25", section:"疑问句", title:"动态演示 · Do", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"q",
      image:"l01p-scene-pocket-money.png", lead:"把 Do 放到句首，就变成一般疑问句。",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">You</span><span class="l01p-token l01p-token--verb">save</span><span class="l01p-token l01p-token--obj">pocket money</span>', speak:"You save pocket money every week." },
        { html:'<span class="l01p-token l01p-token--aux l01p-token--fly">Do</span><span class="l01p-token l01p-token--subj">you</span><span class="l01p-token l01p-token--verb">save</span><span class="l01p-token l01p-token--obj">pocket money</span><span class="l01p-token">?</span>', speak:"Do you save pocket money every week?" }
      ], sentence:"Do you save pocket money every week?", zh:"你每周存零花钱吗？" },

    { id:"p26", section:"疑问句", title:"例句 · Do you save", type:"scene", badge:"q", badgeText:"❓ 疑问",
      image:"l01p-scene-pocket-money.png", sentence:"Do you save pocket money every week?", zh:"你每周存零花钱吗？", verbType:"q",
      source:"6GA U1" },

    { id:"p27", section:"疑问句", title:"动态演示 · Does", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"q",
      image:"l01p-scene-emma-badminton.png", lead:"Does 放句首，动词用原形 play（不是 plays）！（火车头魔法）",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">Emma</span><span class="l01p-token l01p-token--verb">plays</span><span class="l01p-token l01p-token--obj">badminton</span>', speak:"Emma plays badminton after school." },
        { html:'<span class="l01p-token l01p-token--aux l01p-token--fly">Does</span><span class="l01p-token l01p-token--subj">Emma</span><span class="l01p-token l01p-token--verb">play</span><span class="l01p-token l01p-token--obj">badminton</span><span class="l01p-token">?</span>', speak:"Does Emma play badminton with Jack after school?" }
      ], sentence:"Does Emma play badminton with Jack after school?", zh:"艾玛放学后和杰克打羽毛球吗？" },

    { id:"p28", section:"疑问句", title:"例句 · Does Emma play", type:"scene", badge:"q", badgeText:"❓ 疑问",
      image:"l01p-scene-emma-badminton.png", sentence:"Does Emma play badminton with Jack after school?", zh:"艾玛放学后和杰克打羽毛球吗？", verbType:"q",
      source:"七上 U1" },

    { id:"p29", section:"综合练习", title:"看图造句 ①", type:"picture-build", badge:"action", badgeText:"🧩 造句",
      image:"l01p-scene-train-leaves.png", instruction:"点击单词，组成正确句子：",
      tokens:["The","train","leaves","the","station","at","nine"], sentence:"The train leaves the station at nine.", zh:"火车九点驶离车站。" },

    { id:"p30", section:"综合练习", title:"听音排序 ①", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-mr-wang-teaches.png",
      audio:"Mr Wang teaches science in our classroom every Monday.", tokens:["Mr","Wang","teaches","science","in","our","classroom","every","Monday"],
      sentence:"Mr Wang teaches science in our classroom every Monday.", zh:"王老师每周一在教室教科学。" },

    { id:"p31", section:"综合练习", title:"be 动词小测", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-scene-dining-hall.png", q:"The dining hall ___ across from the sports field.", opts:["am","is","are"], ans:1,
      hint:"The dining hall = 单数 → is", sentence:"The dining hall is across from the sports field.", zh:"食堂在运动场对面。", verbType:"state" },

    { id:"p32", section:"综合练习", title:"看图造句 ② · be", type:"picture-build", badge:"state", badgeText:"🧩 造句",
      image:"l01p-scene-school-library-big.png", instruction:"组成 be 动词句子：",
      tokens:["The","school","library","is","very","big"], sentence:"The school library is very big.", zh:"学校图书馆很大。" },

    { id:"p33", section:"综合练习", title:"听音排序 ②", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-emma-badminton.png",
      audio:"Does Emma play badminton with Jack after school?", tokens:["Does","Emma","play","badminton","with","Jack","after","school"],
      sentence:"Does Emma play badminton with Jack after school?", zh:"艾玛放学后和杰克打羽毛球吗？" },

    { id:"p34", section:"综合练习", title:"三单小测", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-scene-shopkeeper.png", q:"The shopkeeper ___ me find the right size.", opts:["help","helps","helping"], ans:1,
      hint:"The shopkeeper = 单数，动词加 s。", sentence:"The shopkeeper helps me find the right size.", zh:"店主帮我找到合适尺码。" },

    { id:"p35", section:"综合练习", title:"终极测试", type:"quiz", badge:"ask", badgeText:"🏆 终极",
      image:"l01p-scene-doesnt-watch-tv.png", q:"Linda ___ watch TV at night on school days.", opts:["don't","doesn't","isn't"], ans:1,
      hint:"Linda = She → doesn't + 动词原形", sentence:"Linda doesn't watch TV at night on school days.", zh:"上学日琳达晚上不看电视。" },

    { id:"p37", section:"课堂练习", title:"课堂练习中心", type:"practice-hub", badge:"game", badgeText:"🎮 练习",
      image:"l01p-playground.png",
      lead:"选择一种练习模式，巩固一般现在时！语料对齐 5GA/6GA + 升学真题难度。",
      modes:[
        { icon:"📖", title:"词汇拓展", desc:"p38-40", href:"p38.html" },
        { icon:"🖼", title:"拓展例句", desc:"p41-44", href:"p41.html" },
        { icon:"📝", title:"套题练习", desc:"p45-47", href:"p45.html" },
        { icon:"⏱", title:"限时挑战", desc:"p48-50", href:"p48.html" },
        { icon:"🔥", title:"连对闯关", desc:"p51-52", href:"p51.html" },
        { icon:"🔗", title:"配对游戏", desc:"p53", href:"p53.html" },
        { icon:"🎧", title:"听音快选", desc:"p54-55", href:"p54.html" },
        { icon:"🧩", title:"看图造句", desc:"p56", href:"p56.html" },
        { icon:"🎵", title:"听音排序", desc:"p57", href:"p57.html" },
        { icon:"🏆", title:"终极闯关", desc:"p58-60", href:"p58.html" }
      ]},

    { id:"p38", section:"词汇拓展", title:"日常动词词汇卡", type:"vocab-cards", badge:"vocab", badgeText:"📖 词汇",
      pool:"vocabDaily", lead:"16 个动词 · 人名/地名/物品例句 · 点击蓝色单词可查词典" },

    { id:"p39", section:"词汇拓展", title:"be 动词 · 状态表达", type:"vocab-cards", badge:"vocab", badgeText:"📖 词汇",
      pool:"vocabBe", lead:"图书馆 / 食堂 / 成都 · 状态义核心词汇" },

    { id:"p40", section:"词汇拓展", title:"时间频率词组", type:"vocab-cards", badge:"vocab", badgeText:"📖 词汇",
      pool:"vocabTime", lead:"every morning / after school / three times a week …" },

    { id:"p41", section:"拓展例句", title:"例句 · 回收利用", type:"scene", badge:"action", badgeText:"🖼 例句",
      image:"l01p-scene-recycle-plastic.png", lead:"5GA 环保主题",
      sentence:"Many toys are made of plastic and can be recycled.", zh:"许多玩具由塑料制成，可以回收利用。", verbType:"action",
      source:"5GA U2" },

    { id:"p42", section:"拓展例句", title:"例句 · 店主帮忙", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-shopkeeper.png", sentence:"The shopkeeper helps me find the right size.", zh:"店主帮我找到合适的尺码。",
      source:"6GA U1" },

    { id:"p43", section:"拓展例句", title:"例句 · 成都与大熊猫", type:"scene", badge:"state", badgeText:"💙 be",
      image:"l01p-scene-pandas-chengdu.png", sentence:"Chengdu is famous for its pandas and hot pot.", zh:"成都以大熊猫和火锅闻名。", verbType:"state",
      source:"5GB U4" },

    { id:"p44", section:"拓展例句", title:"例句 · 保护大熊猫", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-pandas-chengdu.png", sentence:"We protect pandas in Chengdu together.", zh:"我们在成都一起保护大熊猫。", verbType:"action",
      source:"5GA U2" },

    { id:"p45", section:"套题练习", title:"课堂套题 ① · be与动作", type:"multi-quiz", badge:"ask", badgeText:"📝 套题",
      image:"l01p-action-vs-be.png", lead:"共 6 题 · 人名/地名/物品主语",
      questions:[
        { q:"The school library ___ very big.", opts:["am","is","are"], ans:1 },
        { q:"Teng Fei ___ basketball after school.", opts:["play","plays","playing"], ans:1 },
        { q:"These keys ___ on the desk.", opts:["am","is","are"], ans:2 },
        { q:"We ___ food in the dining hall.", opts:["don't waste","doesn't waste","isn't waste"], ans:0 },
        { q:"Chen Tao ___ from Chengdu.", opts:["am","is","are"], ans:1 },
        { q:"The train ___ at nine every morning.", opts:["leave","leaves","leaving"], ans:1 }
      ]},

    { id:"p46", section:"套题练习", title:"课堂套题 ② · 三单拼写", type:"multi-quiz", badge:"ask", badgeText:"📝 套题",
      image:"l01p-scene-mr-wang-teaches.png", lead:"共 6 题 · 人名/物品主语",
      questions:[
        { q:"Mr Wang ___ science every Monday.", opts:["teach","teaches","teaching"], ans:1 },
        { q:"Emma ___ stories in the library.", opts:["read","reads","reading"], ans:1 },
        { q:"The shop ___ at eight o'clock.", opts:["open","opens","opening"], ans:1 },
        { q:"Lily ___ pocket money every week.", opts:["save","saves","saving"], ans:1 },
        { q:"Jack ___ to English news on the radio.", opts:["listen","listens","listening"], ans:1 },
        { q:"Emma and I ___ badminton after school.", opts:["play","plays","playing"], ans:0 }
      ]},

    { id:"p47", section:"套题练习", title:"课堂套题 ③ · 综合", type:"multi-quiz", badge:"ask", badgeText:"📝 套题",
      image:"l01p-playground.png", lead:"共 8 题 · 升学真题难度",
      questions:[
        { q:"We ___ waste food in the dining hall.", opts:["don't","doesn't","aren't"], ans:0 },
        { q:"___ Emma play badminton after school?", opts:["Do","Does","Is"], ans:1 },
        { q:"Linda ___ watch TV on school days.", opts:["don't","doesn't","isn't"], ans:1 },
        { q:"___ these keys on the teacher's desk?", opts:["Do","Does","Are"], ans:2 },
        { q:"The dining hall ___ across from the sports field.", opts:["am","is","are"], ans:1 },
        { q:"The shopkeeper ___ me find the right size.", opts:["help","helps","helping"], ans:1 },
        { q:"___ you save pocket money every week?", opts:["Do","Does","Are"], ans:0 },
        { q:"Chengdu ___ famous for its pandas.", opts:["am","is","are"], ans:1 }
      ]},

    { id:"p48", section:"限时挑战", title:"限时 · be 动词 45秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"qBe", seconds:45, perQuestion:10, pass:4, lead:"人名/地名/物品主语 · 每题约 10 秒！" },

    { id:"p49", section:"限时挑战", title:"限时 · 三单 45秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"q3s", seconds:45, perQuestion:10, pass:4, lead:"Teng Fei / The train / Mr Wang … 注意加 s / es！" },

    { id:"p50", section:"限时挑战", title:"限时 · 综合 60秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"qMix", seconds:60, perQuestion:12, pass:6, lead:"be + 三单 + 否定疑问混合 · 50+ 题库随机！" },

    { id:"p51", section:"连对闯关", title:"连对 5 题 · be 动词", type:"streak-quiz", badge:"game", badgeText:"🔥 闯关",
      pool:"qBe", target:5, lead:"答错连击清零，连续答对 5 题通关！" },

    { id:"p52", section:"连对闯关", title:"连对 5 题 · 综合", type:"streak-quiz", badge:"game", badgeText:"🔥 闯关",
      pool:"qMix", target:5, lead:"升学真题难度 · 挑战自我！" },

    { id:"p53", section:"配对游戏", title:"英中配对", type:"match-pairs", badge:"game", badgeText:"🔗 配对",
      image:"l01p-action-vs-be.png", pool:"matchPairs" },

    { id:"p54", section:"听音快选", title:"听音快选 ①", type:"listen-pick", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-school-library-big.png", audio:"The school library is very big and quiet.", opts:["The school library is very big and quiet.","The school library are very big.","The sports field is very big."], ans:0, zh:"学校图书馆又大又安静。" },

    { id:"p55", section:"听音快选", title:"听音快选 ②", type:"listen-pick", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-emma-badminton.png", audio:"Does Emma play badminton with Jack after school?", opts:["Do Emma play badminton?","Does Emma play badminton with Jack after school?","Does Jack play football after school?"], ans:1, zh:"艾玛放学后和杰克打羽毛球吗？" },

    { id:"p56", section:"课堂游戏", title:"看图造句 ③", type:"picture-build", badge:"action", badgeText:"🧩 造句",
      image:"l01p-scene-shopkeeper.png", instruction:"组成句子：",
      tokens:["The","shopkeeper","helps","me","find","the","right","size"], sentence:"The shopkeeper helps me find the right size.", zh:"店主帮我找到合适尺码。" },

    { id:"p57", section:"课堂游戏", title:"听音排序 ③", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-pocket-money.png",
      audio:"Do you save pocket money every week?", tokens:["Do","you","save","pocket","money","every","week"],
      sentence:"Do you save pocket money every week?", zh:"你每周存零花钱吗？" },

    { id:"p58", section:"终极闯关", title:"限时大闯关 90秒", type:"timed-quiz", badge:"timed", badgeText:"🏆 终极",
      pool:"qMix", seconds:90, perQuestion:12, pass:8, lead:"90 秒升学难度综合挑战！答对 8 题以上通关。" },

    { id:"p59", section:"听音快选", title:"听音快选 ③ · 五题连战", type:"listen-pick", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-tengfei-basketball.png", pool:"listenPick", rounds:5, lead:"10 题听力题库随机抽 5 题！" },

    { id:"p60", section:"限时挑战", title:"限时 · 否定句 45秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"qNeg", seconds:45, perQuestion:10, pass:3, lead:"don't / doesn't / aren't 专项！" },

    { id:"p61", section:"小结", title:"本讲小结", type:"summary", badge:"image", badgeText:"🎉 完成",
      image:"l01p-action-vs-be.png",
      checklist:[
        "动作义：play / read / teach / save —— 实义动词，描述「做了什么」",
        "状态义：am / is / are —— be 动词，描述「是谁、怎么样、在哪」",
        "主语不只是人称：人名（Emma/Teng Fei）、地名（Chengdu）、物品（The train/The school library）",
        "I → am；He/She/It/人名/单数 → is；You/We/They/复数 → are",
        "I/We/They + 动词原形；He/She/It/人名/单数 + 动词加 s/es",
        "拼写：+s / +es / y→ies / goes·has",
        "否定：don't / doesn't + 动词原形；be 否定用 isn't/aren't",
        "疑问：Do/Does 放句首 + 动词原形？be 疑问把 am/is/are 提前",
        "课堂练习 50+ 题库 · 对齐 5GA/6GA 例句 + 升学真题难度"
      ],
      chant:"一般现在时常出现，\n动作用实义动词干；\n人名地名和物品，\n单数主语动词加 s；\n状态用 am is are，\ndon't doesn't 表否定，\nDo Does 放句首问一问！",
      chantSpeak:"Teng Fei plays basketball. The school library is very big. Linda doesn't watch TV. Does Emma play badminton?" }
  ];

  function byId(id) { return PAGES.find(function(p){ return p.id===id; }); }
  function indexOf(id) { return PAGES.findIndex(function(p){ return p.id===id; }); }

  global.L01pData = { pages:PAGES, byId:byId, indexOf:indexOf, total:PAGES.length };
})(typeof window !== "undefined" ? window : null);
