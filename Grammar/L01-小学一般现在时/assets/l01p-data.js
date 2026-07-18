(function (global) {
  "use strict";

  var PAGES = [
    { id:"p01", section:"导入", title:"听一听 · 声音先行", type:"sound-first", badge:"sound", badgeText:"🔊 声音先行",
      audio:"I eat breakfast every morning. I am happy at school.",
      soundHint:"先听，不要看文字。听完再点「显示」。",
      question:"这些句子在说什么？", image:"l01p-scene-eat-breakfast.png",
      sentence:"I eat breakfast every morning.", zh:"我每天早上吃早餐。" },

    { id:"p02", section:"导入", title:"苏格拉底 · 发现时态", type:"socratic", badge:"ask", badgeText:"💭 想一想",
      image:"l01p-playground.png", question:"「I play football every day.」说的是什么时候？",
      choices:[
        { text:"现在正在踢", correct:false, fb:"正在踢要用现在进行时 be + doing。" },
        { text:"每天经常踢", correct:true, fb:"对了！every day = 经常、每天 → 一般现在时！" },
        { text:"昨天踢过", correct:false, fb:"昨天要用过去时。" }
      ], sentence:"I play football every day.", zh:"我每天踢足球。" },

    { id:"p03", section:"动作义 vs 状态义", title:"动作义 · 踢足球", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-he-plays-football.png",
      lead:"看得见身体在动 → 用实义动词（play / run / eat）",
      sentence:"He plays football.", zh:"他踢足球。", verbType:"action" },

    { id:"p04", section:"动作义 vs 状态义", title:"动作义 · 跑步", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-run-park.png", lead:"实义动词描述「做了什么」",
      sentence:"They run in the park.", zh:"他们在公园跑步。", verbType:"action" },

    { id:"p05", section:"动作义 vs 状态义", title:"动作义 · 吃早餐", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-eat-breakfast.png", lead:"eat 是实义动词，表示动作",
      sentence:"I eat breakfast every morning.", zh:"我每天早上吃早餐。", verbType:"action" },

    { id:"p06", section:"动作义 vs 状态义", title:"状态义 · 我很高兴", type:"scene", badge:"state", badgeText:"💙 状态义（be）",
      image:"l01p-be-i-am-happy.png",
      lead:"状态义用 be 动词：am / is / are + 表语（是谁、怎么样、在哪）",
      sentence:"I am happy.", zh:"我很高兴。", verbType:"state" },

    { id:"p07", section:"动作义 vs 状态义", title:"状态义 · 她在教室", type:"scene", badge:"state", badgeText:"💙 状态义（be）",
      image:"l01p-be-she-is-classroom.png", lead:"She → is，be 动词要随主语变化",
      sentence:"She is in the classroom.", zh:"她在教室里。", verbType:"state" },

    { id:"p08", section:"动作义 vs 状态义", title:"状态义 · 他们是学生", type:"scene", badge:"state", badgeText:"💙 状态义（be）",
      image:"l01p-be-they-are-students.png", lead:"They → are，复数主语用 are",
      sentence:"They are students.", zh:"他们是学生。", verbType:"state" },

    { id:"p09", section:"动作义 vs 状态义", title:"苏格拉底 · 分一分", type:"socratic", badge:"ask", badgeText:"💭 分类",
      image:"l01p-action-vs-be.png", question:"「I am happy.」属于哪一类？",
      choices:[
        { text:"动作义（实义动词）", correct:false, fb:"am 是 be 动词，不是实义动词。" },
        { text:"状态义（be 动词）", correct:true, fb:"正确！am / is / are 是状态义句子的核心。" },
        { text:"不是一般现在时", correct:false, fb:"这也是一般现在时哦。" }
      ], sentence:"I am happy.", zh:"我很高兴。", verbType:"state" },

    { id:"p10", section:"be 动词", title:"am / is / are 配对", type:"be-match", badge:"demo", badgeText:"🔗 配对",
      image:"l01p-be-i-am-happy.png",
      lead:"记住：I → am，He/She/It → is，You/We/They → are",
      chart:[
        { subjects:"I", be:"am" },
        { subjects:"He / She / It", be:"is" },
        { subjects:"You / We / They", be:"are" }
      ],
      drill:[
        { subject:"I", ans:"am", sentence:"I am happy.", zh:"我很高兴。" },
        { subject:"She", ans:"is", sentence:"She is in the classroom.", zh:"她在教室里。" },
        { subject:"They", ans:"are", sentence:"They are students.", zh:"他们是学生。" },
        { subject:"He", ans:"is", sentence:"He is from China.", zh:"他来自中国。" },
        { subject:"We", ans:"are", sentence:"We are friends.", zh:"我们是朋友。" }
      ] },

    { id:"p11", section:"be 动词", title:"分类游戏 · 动作 vs be", type:"classify", badge:"ask", badgeText:"🧺 分类",
      image:"l01p-action-vs-be.png", lead:"把句子放进正确的篮子",
      buckets:[
        { key:"action", label:"🏃 动作义（实义动词）" },
        { key:"be", label:"💙 状态义（be 动词）" }
      ],
      items:[
        { text:"He plays football.", bucket:"action", hint:"play 是实义动词。", zh:"他踢足球。" },
        { text:"I am happy.", bucket:"be", hint:"有 am，是 be 动词句。", zh:"我很高兴。" },
        { text:"They run in the park.", bucket:"action", hint:"run 是实义动词。", zh:"他们在公园跑步。" },
        { text:"She is in the classroom.", bucket:"be", hint:"有 is，是 be 动词句。", zh:"她在教室里。" },
        { text:"We eat breakfast.", bucket:"action", hint:"eat 是实义动词。", zh:"我们吃早餐。" },
        { text:"They are students.", bucket:"be", hint:"有 are，是 be 动词句。", zh:"他们是学生。" }
      ] },

    { id:"p12", section:"三单发现", title:"对比发现 · I vs He", type:"discover", badge:"demo", badgeText:"🔍 自我发现",
      lead:"点击左右卡片听句子，再点「我发现了」对比动词变化。",
      leftImage:"l01p-action-football.png", leftLabel:"I play football.",
      rightImage:"l01p-scene-he-plays-football.png", rightLabel:"He plays football.",
      leftSentence:"I play football.", leftZh:"我踢足球。",
      rightSentence:"He plays football.", rightZh:"他踢足球。",
      discovery:"发现了吗？He = 第三人称单数，动词 play 要加 s → plays！" },

    { id:"p13", section:"三单发现", title:"苏格拉底 · play 还是 plays", type:"socratic", badge:"ask", badgeText:"💭 三单",
      image:"l01p-scene-he-plays-football.png", question:"「Tom _____ football.」选哪个？",
      choices:[
        { text:"play", correct:false, fb:"Tom = He，要用第三人称单数。" },
        { text:"plays", correct:true, fb:"太棒了！He/She/It → 动词加 s。" },
        { text:"playing", correct:false, fb:"这里没有 be 动词，不能直接用 -ing。" }
      ], sentence:"Tom plays football.", zh:"汤姆踢足球。" },

    { id:"p14", section:"三单发现", title:"例句 · 上学", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-go-school.png", sentence:"We go to school at eight.", zh:"我们八点上学。" },

    { id:"p15", section:"三单发现", title:"例句 · 洗手 +es", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-washes-hands.png", sentence:"She washes her hands.", zh:"她洗手。（wash → washes）" },

    { id:"p16", section:"拼写规律", title:"拼写实验室 ① 加 s", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      image:"l01p-scene-he-plays-football.png",
      rules:[
        { tab:"规则① +s", rule:"大多数动词直接加 s", examples:[{from:"play",to:"plays"},{from:"read",to:"reads"},{from:"run",to:"runs"}],
          sample:"He plays football.", sampleZh:"他踢足球。" }
      ]},

    { id:"p17", section:"拼写规律", title:"拼写实验室 ② 加 es", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      image:"l01p-scene-washes-hands.png",
      rules:[
        { tab:"规则② +es", rule:"以 s / x / ch / sh 结尾加 es", examples:[{from:"wash",to:"washes"},{from:"watch",to:"watches"},{from:"brush",to:"brushes"}],
          sample:"She washes her hands.", sampleZh:"她洗手。" }
      ]},

    { id:"p18", section:"拼写规律", title:"拼写实验室 ③ 特殊", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      image:"l01p-scene-go-school.png",
      rules:[
        { tab:"规则③ y→ies", rule:"辅音+y 结尾：变 y 为 i 再加 es", examples:[{from:"study",to:"studies"},{from:"fly",to:"flies"}], sample:"She studies English.", sampleZh:"她学英语。" },
        { tab:"特殊", rule:"go → goes, have → has", examples:[{from:"go",to:"goes"},{from:"have",to:"has"}], sample:"He goes to school.", sampleZh:"他去上学。" }
      ]},

    { id:"p19", section:"拼写测试", title:"拼写小测 ①", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-scene-washes-hands.png", q:"She ___ her hands.", opts:["wash","washes","washing"], ans:1,
      hint:"wash 以 sh 结尾，加 es。", sentence:"She washes her hands.", zh:"她洗手。" },

    { id:"p20", section:"拼写测试", title:"拼写小测 ②", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-playground.png", q:"My sister ___ basketball.", opts:["play","plays","playing"], ans:1,
      hint:"My sister = She，动词加 s。", sentence:"My sister plays basketball.", zh:"我姐姐打篮球。" },

    { id:"p21", section:"否定句", title:"动态演示 · don't", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"neg",
      image:"l01p-scene-dont-like-spicy.png", lead:"I/We/They 用 don't + 动词原形",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">I</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">spicy food</span>', speak:"I like spicy food." },
        { html:'<span class="l01p-token l01p-token--subj">I</span><span class="l01p-token l01p-token--aux l01p-token--pop">don\'t</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">spicy food</span>', speak:"I don't like spicy food." }
      ], sentence:"I don't like spicy food.", zh:"我不喜欢辣的食物。" },

    { id:"p22", section:"否定句", title:"例句 · 不喜欢辣", type:"scene", badge:"neg", badgeText:"🚫 否定",
      image:"l01p-scene-dont-like-spicy.png", sentence:"I don't like spicy food.", zh:"我不喜欢辣的食物。", verbType:"neg" },

    { id:"p23", section:"否定句", title:"动态演示 · doesn't", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"neg",
      image:"l01p-scene-doesnt-watch-tv.png", lead:"He/She/It 用 doesn't，动词回到原形！",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">She</span><span class="l01p-token l01p-token--verb">watches</span><span class="l01p-token l01p-token--obj">TV</span>', speak:"She watches TV at night." },
        { html:'<span class="l01p-token l01p-token--subj">She</span><span class="l01p-token l01p-token--aux l01p-token--pop">doesn\'t</span><span class="l01p-token l01p-token--verb">watch</span><span class="l01p-token l01p-token--obj">TV</span>', speak:"She doesn't watch TV at night." }
      ], sentence:"She doesn't watch TV at night.", zh:"她晚上不看电视。" },

    { id:"p24", section:"否定句", title:"例句 · 不看电视", type:"scene", badge:"neg", badgeText:"🚫 否定",
      image:"l01p-scene-doesnt-watch-tv.png", sentence:"She doesn't watch TV at night.", zh:"她晚上不看电视。", verbType:"neg" },

    { id:"p25", section:"疑问句", title:"动态演示 · Do", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"q",
      image:"l01p-scene-do-you-like-english.png", lead:"把 Do 放到句首，就变成一般疑问句。",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">You</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">English</span>', speak:"You like English." },
        { html:'<span class="l01p-token l01p-token--aux l01p-token--fly">Do</span><span class="l01p-token l01p-token--subj">you</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">English</span><span class="l01p-token">?</span>', speak:"Do you like English?" }
      ], sentence:"Do you like English?", zh:"你喜欢英语吗？" },

    { id:"p26", section:"疑问句", title:"例句 · Do you like", type:"scene", badge:"q", badgeText:"❓ 疑问",
      image:"l01p-scene-do-you-like-english.png", sentence:"Do you like English?", zh:"你喜欢英语吗？", verbType:"q" },

    { id:"p27", section:"疑问句", title:"动态演示 · Does", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"q",
      image:"l01p-scene-does-she-read.png", lead:"Does 放句首，动词用原形 read（不是 reads）！",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">She</span><span class="l01p-token l01p-token--verb">reads</span><span class="l01p-token l01p-token--obj">books</span>', speak:"She reads books." },
        { html:'<span class="l01p-token l01p-token--aux l01p-token--fly">Does</span><span class="l01p-token l01p-token--subj">she</span><span class="l01p-token l01p-token--verb">read</span><span class="l01p-token l01p-token--obj">books</span><span class="l01p-token">?</span>', speak:"Does she read books?" }
      ], sentence:"Does she read books?", zh:"她读书吗？" },

    { id:"p28", section:"疑问句", title:"例句 · Does she read", type:"scene", badge:"q", badgeText:"❓ 疑问",
      image:"l01p-scene-does-she-read.png", sentence:"Does she read books?", zh:"她读书吗？", verbType:"q" },

    { id:"p29", section:"综合练习", title:"看图造句 ①", type:"picture-build", badge:"action", badgeText:"🧩 造句",
      image:"l01p-morning-wake.png", instruction:"点击单词，组成正确句子：",
      tokens:["I","wake","up","at","seven","o'clock"], sentence:"I wake up at seven o'clock.", zh:"我七点起床。" },

    { id:"p30", section:"综合练习", title:"听音排序 ①", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-he-plays-football.png",
      audio:"She plays football after school.", tokens:["She","plays","football","after","school"],
      sentence:"She plays football after school.", zh:"她放学后踢足球。" },

    { id:"p31", section:"综合练习", title:"be 动词小测", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-be-they-are-students.png", q:"They ___ students.", opts:["am","is","are"], ans:2,
      hint:"They → are", sentence:"They are students.", zh:"他们是学生。", verbType:"state" },

    { id:"p32", section:"综合练习", title:"看图造句 ② · be", type:"picture-build", badge:"state", badgeText:"🧩 造句",
      image:"l01p-be-we-are-friends.png", instruction:"组成 be 动词句子：",
      tokens:["We","are","friends"], sentence:"We are friends.", zh:"我们是朋友。" },

    { id:"p33", section:"综合练习", title:"听音排序 ②", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-playground.png",
      audio:"Do they play football on weekends?", tokens:["Do","they","play","football","on","weekends"],
      sentence:"Do they play football on weekends?", zh:"他们周末踢足球吗？" },

    { id:"p34", section:"综合练习", title:"三单小测", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-cat-sleep.png", q:"My cat ___ on the bed.", opts:["sleep","sleeps","sleeping"], ans:1,
      hint:"My cat = It，第三人称单数。", sentence:"My cat sleeps on the bed.", zh:"我的猫在床上睡觉。" },

    { id:"p35", section:"综合练习", title:"终极测试", type:"quiz", badge:"ask", badgeText:"🏆 终极",
      image:"l01p-scene-doesnt-watch-tv.png", q:"She ___ watch TV at night.", opts:["don't","doesn't","isn't"], ans:1,
      hint:"She → doesn't + 动词原形", sentence:"She doesn't watch TV at night.", zh:"她晚上不看电视。" },

    { id:"p37", section:"课堂练习", title:"课堂练习中心", type:"practice-hub", badge:"game", badgeText:"🎮 练习",
      image:"l01p-playground.png",
      lead:"选择一种练习模式，巩固一般现在时！",
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
      pool:"vocabDaily", lead:"点击 🔊 听例句；点击蓝色单词可查词典" },

    { id:"p39", section:"词汇拓展", title:"be 动词 · 形容词", type:"vocab-cards", badge:"vocab", badgeText:"📖 词汇",
      pool:"vocabBe", lead:"状态义核心词汇" },

    { id:"p40", section:"词汇拓展", title:"时间频率词组", type:"vocab-cards", badge:"vocab", badgeText:"📖 词汇",
      pool:"vocabTime", lead:"every day / at night / after school …" },

    { id:"p41", section:"拓展例句", title:"例句 · 刷牙", type:"scene", badge:"action", badgeText:"🖼 例句",
      image:"l01p-brush-teeth.png", lead:"三单 +es 例句",
      sentence:"He brushes his teeth every morning.", zh:"他每天早上刷牙。", verbType:"action" },

    { id:"p42", section:"拓展例句", title:"例句 · 在学校学习", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-school-class.png", sentence:"We study English at school.", zh:"我们在学校学英语。" },

    { id:"p43", section:"拓展例句", title:"例句 · 他来自中国", type:"scene", badge:"state", badgeText:"💙 be",
      image:"l01p-be-he-is-from-china.png", sentence:"He is from China.", zh:"他来自中国。", verbType:"state" },

    { id:"p44", section:"拓展例句", title:"例句 · 我们是朋友", type:"scene", badge:"state", badgeText:"💙 be",
      image:"l01p-be-we-are-friends.png", sentence:"We are friends.", zh:"我们是朋友。", verbType:"state" },

    { id:"p45", section:"套题练习", title:"课堂套题 ① · be与动作", type:"multi-quiz", badge:"ask", badgeText:"📝 套题",
      image:"l01p-action-vs-be.png", lead:"共 6 题，做完点交卷",
      questions:[
        { q:"I ___ happy.", opts:["am","is","are"], ans:0 },
        { q:"He ___ football.", opts:["play","plays","playing"], ans:1 },
        { q:"They ___ students.", opts:["am","is","are"], ans:2 },
        { q:"We ___ breakfast.", opts:["eat","eats","eating"], ans:0 },
        { q:"She ___ in the classroom.", opts:["am","is","are"], ans:1 },
        { q:"Tom ___ to school.", opts:["go","goes","going"], ans:1 }
      ]},

    { id:"p46", section:"套题练习", title:"课堂套题 ② · 三单拼写", type:"multi-quiz", badge:"ask", badgeText:"📝 套题",
      image:"l01p-scene-washes-hands.png", lead:"共 6 题",
      questions:[
        { q:"She ___ her hands.", opts:["wash","washes","washing"], ans:1 },
        { q:"He ___ TV at night.", opts:["watch","watches","watching"], ans:1 },
        { q:"My sister ___ basketball.", opts:["play","plays","playing"], ans:1 },
        { q:"The cat ___ on the bed.", opts:["sleep","sleeps","sleeping"], ans:1 },
        { q:"She ___ English.", opts:["study","studies","studying"], ans:1 },
        { q:"We ___ in the park.", opts:["run","runs","running"], ans:0 }
      ]},

    { id:"p47", section:"套题练习", title:"课堂套题 ③ · 综合", type:"multi-quiz", badge:"ask", badgeText:"📝 套题",
      image:"l01p-playground.png", lead:"共 8 题 · 否定/疑问/be/三单",
      questions:[
        { q:"I ___ like spicy food.", opts:["don't","doesn't","isn't"], ans:0 },
        { q:"___ you like English?", opts:["Do","Does","Are"], ans:0 },
        { q:"She ___ watch TV.", opts:["don't","doesn't","isn't"], ans:1 },
        { q:"___ she read books?", opts:["Do","Does","Is"], ans:1 },
        { q:"They ___ friends.", opts:["am","is","are"], ans:2 },
        { q:"He ___ football.", opts:["play","plays","playing"], ans:1 },
        { q:"We ___ dinner together.", opts:["eat","eats","eating"], ans:0 },
        { q:"___ they students?", opts:["Do","Does","Are"], ans:2 }
      ]},

    { id:"p48", section:"限时挑战", title:"限时 · be 动词 45秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"qBe", seconds:45, perQuestion:10, pass:4, lead:"每题约 10 秒，尽量多答对！" },

    { id:"p49", section:"限时挑战", title:"限时 · 三单 45秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"q3s", seconds:45, perQuestion:10, pass:4, lead:"注意动词加 s / es！" },

    { id:"p50", section:"限时挑战", title:"限时 · 综合 60秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"qMix", seconds:60, perQuestion:12, pass:6, lead:"be + 三单 + 否定疑问混合！" },

    { id:"p51", section:"连对闯关", title:"连对 5 题 · be 动词", type:"streak-quiz", badge:"game", badgeText:"🔥 闯关",
      pool:"qBe", target:5, lead:"答错连击清零，连续答对 5 题通关！" },

    { id:"p52", section:"连对闯关", title:"连对 5 题 · 综合", type:"streak-quiz", badge:"game", badgeText:"🔥 闯关",
      pool:"qMix", target:5, lead:"综合巩固，挑战自我！" },

    { id:"p53", section:"配对游戏", title:"英中配对", type:"match-pairs", badge:"game", badgeText:"🔗 配对",
      image:"l01p-action-vs-be.png", pool:"matchPairs" },

    { id:"p54", section:"听音快选", title:"听音快选 ①", type:"listen-pick", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-be-i-am-happy.png", audio:"I am happy.", opts:["I am happy.","I am sad.","He is happy."], ans:0, zh:"我很高兴。", hint:"再听一遍！" },

    { id:"p55", section:"听音快选", title:"听音快选 ②", type:"listen-pick", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-do-you-like-english.png", audio:"Do you like English?", opts:["Do you like English?","Does she like English?","You like English."], ans:0, zh:"你喜欢英语吗？" },

    { id:"p56", section:"课堂游戏", title:"看图造句 ③", type:"picture-build", badge:"action", badgeText:"🧩 造句",
      image:"l01p-brush-teeth.png", instruction:"组成句子：",
      tokens:["He","brushes","his","teeth","every","morning"], sentence:"He brushes his teeth every morning.", zh:"他每天早上刷牙。" },

    { id:"p57", section:"课堂游戏", title:"听音排序 ③", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-does-she-read.png",
      audio:"Does she read books every day?", tokens:["Does","she","read","books","every","day"],
      sentence:"Does she read books every day?", zh:"她每天读书吗？" },

    { id:"p58", section:"终极闯关", title:"限时大闯关 90秒", type:"timed-quiz", badge:"timed", badgeText:"🏆 终极",
      pool:"qMix", seconds:90, perQuestion:12, pass:8, lead:"90 秒综合挑战！答对 8 题以上即通关。" },

    { id:"p59", section:"听音快选", title:"听音快选 ③ · 五题连战", type:"listen-pick", badge:"sound", badgeText:"🎧 听音",
      image:"l01p-scene-he-plays-football.png", pool:"listenPick", rounds:5, lead:"从题库随机抽 5 题，听音选句！" },

    { id:"p60", section:"限时挑战", title:"限时 · 否定句 45秒", type:"timed-quiz", badge:"timed", badgeText:"⏱ 限时",
      pool:"qNeg", seconds:45, perQuestion:10, pass:3, lead:"don't / doesn't 专项训练！" },

    { id:"p61", section:"小结", title:"本讲小结", type:"summary", badge:"image", badgeText:"🎉 完成",
      image:"l01p-action-vs-be.png",
      checklist:[
        "动作义：play / run / eat —— 实义动词，描述「做了什么」",
        "状态义：am / is / are —— be 动词，描述「是谁、怎么样、在哪」",
        "I → am，He/She/It → is，You/We/They → are",
        "I/We/They + 动词原形；He/She/It + 动词加 s",
        "拼写：+s / +es / y→ies / goes·has",
        "否定：don't / doesn't + 动词原形",
        "疑问：Do/Does 放句首 + 动词原形？",
        "课堂练习：限时挑战 · 连对闯关 · 套题 · 配对 · 听音快选（p37 起）",
        "词汇拓展 18 词 + 语料题库 30+ 题，可反复刷题"
      ],
      chant:"一般现在时常出现，\n动作用实义动词干；\n状态用 am is are，\nI am, he is, they are；\nhe she it 动词加 s，\ndon't doesn't 表否定，\nDo Does 放句首问一问！",
      chantSpeak:"I play football. He plays football. I am happy. They are students." }
  ];

  function byId(id) { return PAGES.find(function(p){ return p.id===id; }); }
  function indexOf(id) { return PAGES.findIndex(function(p){ return p.id===id; }); }

  global.L01pData = { pages:PAGES, byId:byId, indexOf:indexOf, total:PAGES.length };
})(typeof window !== "undefined" ? window : null);
