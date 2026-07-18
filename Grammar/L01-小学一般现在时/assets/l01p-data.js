(function (global) {
  "use strict";

  var PAGES = [
    { id:"p01", section:"导入", title:"听一听 · 声音先行", type:"sound-first", badge:"sound", badgeText:"🔊 声音先行",
      audio:"I eat breakfast every morning. I go to school at eight o'clock.", soundHint:"先听，不要看文字。听完再点「显示」。",
      question:"这些句子在说什么？", image:"l01p-morning-wake.png",
      sentence:"I eat breakfast every morning.", zh:"我每天早上吃早餐。" },

    { id:"p02", section:"导入", title:"苏格拉底 · 发现时态", type:"socratic", badge:"ask", badgeText:"💭 想一想",
      image:"l01p-playground.png", question:"「I play football every day.」说的是什么时候？",
      choices:[
        { text:"现在正在踢", correct:false, fb:"正在踢要用现在进行时 be + doing。" },
        { text:"每天经常踢", correct:true, fb:"对了！every day = 经常、每天 → 一般现在时！" },
        { text:"昨天踢过", correct:false, fb:"昨天要用过去时。" }
      ], sentence:"I play football every day.", zh:"我每天踢足球。" },

    { id:"p03", section:"动作 vs 状态", title:"动作义 · 看图", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-he-plays-football.png", lead:"看得见身体在动 → 动作义动词",
      sentence:"He plays football.", zh:"他踢足球。", verbType:"action" },

    { id:"p04", section:"动作 vs 状态", title:"动作义 · 跑步", type:"scene", badge:"action", badgeText:"🏃 动作义",
      image:"l01p-scene-run-park.png", sentence:"They run in the park.", zh:"他们在公园跑步。", verbType:"action" },

    { id:"p05", section:"动作 vs 状态", title:"状态义 · 喜欢", type:"scene", badge:"state", badgeText:"💙 状态义",
      image:"l01p-state-reading.png", lead:"心里的感受，不一定在动 → 状态义动词",
      sentence:"She likes reading.", zh:"她喜欢阅读。", verbType:"state" },

    { id:"p06", section:"动作 vs 状态", title:"状态义 · 睡觉", type:"scene", badge:"state", badgeText:"💙 状态义",
      image:"l01p-cat-sleep.png", sentence:"The cat sleeps on the sofa.", zh:"猫在沙发上睡觉。", verbType:"state" },

    { id:"p07", section:"动作 vs 状态", title:"苏格拉底 · 分一分", type:"socratic", badge:"ask", badgeText:"💭 分类",
      image:"l01p-action-vs-state.png", question:"「like 喜欢」是动作义还是状态义？",
      choices:[
        { text:"动作义", correct:false, fb:"like 是心里的感受，是状态义。" },
        { text:"状态义", correct:true, fb:"正确！like / know / want 常是状态义。" },
        { text:"不是动词", correct:false, fb:"like 是动词哦。" }
      ], sentence:"She likes music.", zh:"她喜欢音乐。", verbType:"state" },

    { id:"p08", section:"三单发现", title:"对比发现 · I vs He", type:"discover", badge:"demo", badgeText:"🔍 自我发现",
      lead:"点击左右卡片听句子，再点「我发现了」对比动词变化。",
      leftImage:"l01p-action-football.png", leftLabel:"I play football.",
      rightImage:"l01p-scene-he-plays-football.png", rightLabel:"He plays football.",
      leftSentence:"I play football.", leftZh:"我踢足球。",
      rightSentence:"He plays football.", rightZh:"他踢足球。",
      discovery:"发现了吗？He = 第三人称单数，动词 play 要加 s → plays！" },

    { id:"p09", section:"三单发现", title:"苏格拉底 · play 还是 plays", type:"socratic", badge:"ask", badgeText:"💭 三单",
      image:"l01p-scene-he-plays-football.png", question:"「Tom _____ football.」选哪个？",
      choices:[
        { text:"play", correct:false, fb:"Tom = He，要用第三人称单数。" },
        { text:"plays", correct:true, fb:"太棒了！He/She/It → 动词加 s。" },
        { text:"playing", correct:false, fb:"这里没有 be 动词，不能直接用 -ing。" }
      ], sentence:"Tom plays football.", zh:"汤姆踢足球。" },

    { id:"p10", section:"三单发现", title:"例句 · 上学", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-go-school.png", sentence:"We go to school at eight.", zh:"我们八点上学。" },

    { id:"p11", section:"三单发现", title:"例句 · 洗手 +es", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-washes-hands.png", sentence:"She washes her hands.", zh:"她洗手。（wash → washes）" },

    { id:"p12", section:"拼写规律", title:"拼写实验室 ① 加 s", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      rules:[
        { tab:"规则① +s", rule:"大多数动词直接加 s", examples:[{from:"play",to:"plays"},{from:"read",to:"reads"},{from:"run",to:"runs"}],
          sample:"He plays football.", sampleZh:"他踢足球。" }
      ]},

    { id:"p13", section:"拼写规律", title:"拼写实验室 ② 加 es", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      rules:[
        { tab:"规则② +es", rule:"以 s / x / ch / sh 结尾加 es", examples:[{from:"wash",to:"washes"},{from:"watch",to:"watches"},{from:"brush",to:"brushes"}],
          sample:"She washes her hands.", sampleZh:"她洗手。" }
      ]},

    { id:"p14", section:"拼写规律", title:"拼写实验室 ③ 特殊", type:"spelling", badge:"demo", badgeText:"✏️ 规律",
      rules:[
        { tab:"规则③ y→ies", rule:"辅音+y 结尾：变 y 为 i 再加 es", examples:[{from:"study",to:"studies"},{from:"fly",to:"flies"}], sample:"She studies English.", sampleZh:"她学英语。" },
        { tab:"特殊", rule:"go → goes, have → has", examples:[{from:"go",to:"goes"},{from:"have",to:"has"}], sample:"He goes to school.", sampleZh:"他去上学。" }
      ]},

    { id:"p15", section:"拼写测试", title:"拼写小测 ①", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-scene-washes-hands.png", q:"She ___ her hands.", opts:["wash","washes","washing"], ans:1,
      hint:"wash 以 sh 结尾，加 es。", sentence:"She washes her hands.", zh:"她洗手。" },

    { id:"p16", section:"拼写测试", title:"拼写小测 ②", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-scene-he-plays-football.png", q:"My sister ___ basketball.", opts:["play","plays","playing"], ans:1,
      hint:"My sister = She，动词加 s。", sentence:"My sister plays basketball.", zh:"我姐姐打篮球。" },

    { id:"p17", section:"否定句", title:"动态演示 · don't", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"neg",
      image:"l01p-scene-dont-like-spicy.png", lead:"看动词怎样变成否定句（I/We/They 用 don't）",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">I</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">spicy food</span>', speak:"I like spicy food." },
        { html:'<span class="l01p-token l01p-token--subj">I</span><span class="l01p-token l01p-token--aux l01p-token--pop">don\'t</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">spicy food</span>', speak:"I don't like spicy food." }
      ], sentence:"I don't like spicy food.", zh:"我不喜欢辣的食物。" },

    { id:"p18", section:"否定句", title:"例句 · 不喜欢辣", type:"scene", badge:"neg", badgeText:"🚫 否定",
      image:"l01p-scene-dont-like-spicy.png", sentence:"I don't like spicy food.", zh:"我不喜欢辣的食物。", verbType:"neg" },

    { id:"p19", section:"否定句", title:"动态演示 · doesn't", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"neg",
      image:"l01p-scene-doesnt-watch-tv.png", lead:"He/She/It 用 doesn't，动词回到原形！",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">She</span><span class="l01p-token l01p-token--verb">watches</span><span class="l01p-token l01p-token--obj">TV</span>', speak:"She watches TV." },
        { html:'<span class="l01p-token l01p-token--subj">She</span><span class="l01p-token l01p-token--aux l01p-token--pop">doesn\'t</span><span class="l01p-token l01p-token--verb">watch</span><span class="l01p-token l01p-token--obj">TV</span>', speak:"She doesn't watch TV at night." }
      ], sentence:"She doesn't watch TV at night.", zh:"她晚上不看电视。" },

    { id:"p20", section:"否定句", title:"例句 · 不看电视", type:"scene", badge:"neg", badgeText:"🚫 否定",
      image:"l01p-scene-doesnt-watch-tv.png", sentence:"She doesn't watch TV at night.", zh:"她晚上不看电视。", verbType:"neg" },

    { id:"p21", section:"疑问句", title:"动态演示 · Do", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"q",
      image:"l01p-scene-do-you-like-english.png", lead:"把 Do 放到句首，就变成一般疑问句。",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">You</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">English</span>', speak:"You like English." },
        { html:'<span class="l01p-token l01p-token--aux l01p-token--fly">Do</span><span class="l01p-token l01p-token--subj">you</span><span class="l01p-token l01p-token--verb">like</span><span class="l01p-token l01p-token--obj">English</span><span class="l01p-token">?</span>', speak:"Do you like English?" }
      ], sentence:"Do you like English?", zh:"你喜欢英语吗？" },

    { id:"p22", section:"疑问句", title:"例句 · Do you like", type:"scene", badge:"q", badgeText:"❓ 疑问",
      image:"l01p-scene-do-you-like-english.png", sentence:"Do you like English?", zh:"你喜欢英语吗？", verbType:"q" },

    { id:"p23", section:"疑问句", title:"动态演示 · Does", type:"dynamic", badge:"demo", badgeText:"🎬 动态", kind:"q",
      image:"l01p-scene-does-she-read.png", lead:"Does 放句首，动词用原形 read（不是 reads）！",
      steps:[
        { html:'<span class="l01p-token l01p-token--subj">She</span><span class="l01p-token l01p-token--verb">reads</span><span class="l01p-token l01p-token--obj">books</span>', speak:"She reads books." },
        { html:'<span class="l01p-token l01p-token--aux l01p-token--fly">Does</span><span class="l01p-token l01p-token--subj">she</span><span class="l01p-token l01p-token--verb">read</span><span class="l01p-token l01p-token--obj">books</span><span class="l01p-token">?</span>', speak:"Does she read books?" }
      ], sentence:"Does she read books?", zh:"她读书吗？" },

    { id:"p24", section:"疑问句", title:"例句 · Does she read", type:"scene", badge:"q", badgeText:"❓ 疑问",
      image:"l01p-scene-does-she-read.png", sentence:"Does she read books?", zh:"她读书吗？", verbType:"q" },

    { id:"p25", section:"练习", title:"例句 · 吃早餐", type:"scene", badge:"image", badgeText:"🖼 例句",
      image:"l01p-scene-eat-breakfast.png", sentence:"I eat breakfast every morning.", zh:"我每天早上吃早餐。" },

    { id:"p26", section:"练习", title:"看图造句 ①", type:"picture-build", badge:"action", badgeText:"🧩 造句",
      image:"l01p-morning-wake.png", instruction:"点击单词，组成正确句子：",
      tokens:["I","wake","up","at","seven","o'clock"], sentence:"I wake up at seven o'clock.", zh:"我七点起床。" },

    { id:"p27", section:"练习", title:"听音排序 ①", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      audio:"She plays football after school.", tokens:["She","plays","football","after","school"],
      sentence:"She plays football after school.", zh:"她放学后踢足球。" },

    { id:"p28", section:"练习", title:"综合小测", type:"quiz", badge:"ask", badgeText:"📝 测试",
      image:"l01p-cat-sleep.png", q:"My cat ___ on the bed.", opts:["sleep","sleeps","sleeping"], ans:1,
      hint:"My cat = It，第三人称单数。", sentence:"My cat sleeps on the bed.", zh:"我的猫在床上睡觉。" },

    { id:"p29", section:"练习", title:"看图造句 ②", type:"picture-build", badge:"action", badgeText:"🧩 造句",
      image:"l01p-family-dinner.png", instruction:"组成句子：",
      tokens:["We","eat","dinner","together"], sentence:"We eat dinner together.", zh:"我们一起吃晚饭。" },

    { id:"p30", section:"练习", title:"听音排序 ②", type:"listen-order", badge:"sound", badgeText:"🎧 听音",
      audio:"Do they play football on weekends?", tokens:["Do","they","play","football","on","weekends"],
      sentence:"Do they play football on weekends?", zh:"他们周末踢足球吗？" },

    { id:"p31", section:"练习", title:"终极测试", type:"quiz", badge:"ask", badgeText:"🏆 终极",
      image:"l01p-scene-doesnt-watch-tv.png", q:"She ___ not watch TV.", opts:["do","does","is"], ans:1,
      hint:"She → doesn't", sentence:"She doesn't watch TV at night.", zh:"她晚上不看电视。" },

    { id:"p32", section:"小结", title:"本讲小结", type:"summary", badge:"image", badgeText:"🎉 完成",
      image:"l01p-playground.png",
      checklist:[
        "动作义：play / run / eat —— 看得见在动",
        "状态义：like / know / want —— 感受与状态",
        "I/We/They + 动词原形；He/She/It + 动词加 s",
        "拼写：+s / +es / y→ies / goes·has",
        "否定：don't / doesn't + 动词原形",
        "疑问：Do/Does 放句首 + 动词原形？"
      ],
      chant:"一般现在时常出现，\n动作状态要分辨；\nI we they 动词不变，\nhe she it 动词加 s；\ndon't doesn't 表否定，\nDo Does 放句首问一问！"
    }
  ];

  function byId(id) { return PAGES.find(function(p){ return p.id===id; }); }
  function indexOf(id) { return PAGES.findIndex(function(p){ return p.id===id; }); }

  global.L01pData = { pages:PAGES, byId:byId, indexOf:indexOf, total:PAGES.length };
})(typeof window !== "undefined" ? window : null);
