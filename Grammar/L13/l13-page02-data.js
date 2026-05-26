/**
 * Page 02 · 30 例句 + 40 高频不规则动词（4 组配对 / 快闪）
 */
window.L13_PAGE02_DATA = {
  affirmative: [
    { base: "go", past: "went", pp: "gone", tag: "公交", zh: "我到站时，公交车已经开走了。", en: "When I got to the stop, the bus had already gone.", tip: "写作/口语：描述「到某时为止已经离开」" },
    { base: "see", past: "saw", pp: "seen", tag: "初体验", zh: "搬去青岛前，她从没见过大海。", en: "She had never seen the ocean before she moved to Qingdao.", tip: "see → saw → seen" },
    { base: "write", past: "wrote", pp: "written", tag: "邮件", zh: "会议开始前，他已经写好了邮件。", en: "He had written the email before the meeting started.", tip: "书面表达常用" },
    { base: "take", past: "took", pp: "taken", tag: "博物馆", zh: "闭馆前，我们已经拍了很多照片。", en: "We had taken many photos before the museum closed.", tip: "take → took → taken" },
    { base: "give", past: "gave", pp: "given", tag: "建议", zh: "做决定前，妈妈已经给过我建议。", en: "Mum had given me advice before I made the decision.", tip: "give → gave → given" },
    { base: "eat", past: "ate", pp: "eaten", tag: "上学", zh: "出门上学前，我已经吃过早饭。", en: "I had eaten breakfast before I left for school.", tip: "口语叙述日常顺序" },
    { base: "drink", past: "drank", pp: "drunk", tag: "不适", zh: "他可乐喝太多，所以觉得恶心。", en: "He had drunk too much cola, so he felt sick.", tip: "drink → drank → drunk" },
    { base: "break", past: "broke", pp: "broken", tag: "眼镜", zh: "她眼镜摔坏了，看不清黑板。", en: "She had broken her glasses, so she couldn't read the board.", tip: "break → broke → broken" },
    { base: "choose", past: "chose", pp: "chosen", tag: "搭档", zh: "老师公布规则前，我们已选好搭档。", en: "We had chosen our partners before the teacher announced the rule.", tip: "choose → chose → chosen" },
    { base: "forget", past: "forgot", pp: "forgotten", tag: "密码", zh: "我忘了密码，所以登不进账号。", en: "I had forgotten my password, so I couldn't log in.", tip: "forget → forgot → forgotten" },
    { base: "know", past: "knew", pp: "known", tag: "同学", zh: "成为同班同学前，他们认识好几年了。", en: "They had known each other for years before they became classmates.", tip: "表持续认识" },
    { base: "ride", past: "rode", pp: "ridden", tag: "骑车", zh: "下雨前，汤姆已骑车到了公园。", en: "Tom had ridden his bike to the park before it started to rain.", tip: "ride → rode → ridden" },
    { base: "speak", past: "spoke", pp: "spoken", tag: "决赛", zh: "决赛前，她和教练谈过。", en: "She had spoken to the coach before the final match.", tip: "speak → spoke → spoken" },
    { base: "wear", past: "wore", pp: "worn", tag: "校服", zh: "他穿了一天校服，想回家换。", en: "He had worn his uniform all day, so he wanted to change.", tip: "wear → wore → worn" },
    { base: "begin", past: "began", pp: "begun", tag: "电影", zh: "我们找到座位时，电影已经开始了。", en: "The film had already begun when we found our seats.", tip: "begin → began → begun" },
    { base: "come", past: "came", pp: "come", tag: "来访", zh: "我们搬家前，表兄来拜访过。", en: "My cousin had come to visit before we moved house.", tip: "come → came → come" },
    { base: "do", past: "did", pp: "done", tag: "复习", zh: "考试开始前，我已经复习完了。", en: "I had done my revision before the test began.", tip: "do → did → done" },
    { base: "have", past: "had", pp: "had", tag: "午饭", zh: "下午上课前，她吃过午饭了。", en: "She had had lunch before the afternoon class.", tip: "have → had → had" },
    { base: "make", past: "made", pp: "made", tag: "计划", zh: "做项目前，他们先定了计划。", en: "They had made a plan before they started the project.", tip: "make → made → made" },
    { base: "find", past: "found", pp: "found", tag: "答案", zh: "铃响前，他已经找到答案。", en: "He had found the answer before the bell rang.", tip: "find → found → found" },
    { base: "tell", past: "told", pp: "told", tag: "故事", zh: "我读书前，她讲过这个故事。", en: "She had told me the story before I read the book.", tip: "tell → told → told" },
    { base: "think", past: "thought", pp: "thought", tag: "决定", zh: "同意前，我仔细想过了。", en: "I had thought about it carefully before I agreed.", tip: "think → thought → thought" },
    { base: "get", past: "got", pp: "got", tag: "回家", zh: "暴风雨来前，我们已经到家。", en: "We had got home before the storm arrived.", tip: "get → got → got" },
    { base: "leave", past: "left", pp: "left", tag: "火车", zh: "我们到站台时，火车已经开了。", en: "The train had left before we reached the platform.", tip: "leave → left → left" },
    { base: "lose", past: "lost", pp: "lost", tag: "车票", zh: "上车前，他把票弄丢了。", en: "He had lost his ticket before he got on the bus.", tip: "lose → lost → lost" },
    { base: "read", past: "read", pp: "read", tag: "规则", zh: "加入社团前，她读过规则。", en: "She had read the rules before she joined the club.", tip: "read 三形同拼" },
    { base: "run", past: "ran", pp: "run", tag: "晨跑", zh: "早饭前，他跑了五公里。", en: "He had run five kilometres before breakfast.", tip: "run → ran → run" },
    { base: "sing", past: "sang", pp: "sung", tag: "演唱会", zh: "演唱会结束前，他们唱过那首歌。", en: "They had sung that song before the concert ended.", tip: "sing → sang → sung" },
    { base: "swim", past: "swam", pp: "swum", tag: "泳池", zh: "泳池冬季关闭前，她游过泳。", en: "She had swum in the pool before it closed for winter.", tip: "swim → swam → swum" },
    { base: "teach", past: "taught", pp: "taught", tag: "测验", zh: "小测前，老师已教过这条规则。", en: "The teacher had taught us the rule before the quiz.", tip: "teach → taught → taught" }
  ],
  irregularFlash: [
    { base: "go", past: "went", pp: "gone" }, { base: "see", past: "saw", pp: "seen" },
    { base: "write", past: "wrote", pp: "written" }, { base: "take", past: "took", pp: "taken" },
    { base: "give", past: "gave", pp: "given" }, { base: "eat", past: "ate", pp: "eaten" },
    { base: "drink", past: "drank", pp: "drunk" }, { base: "break", past: "broke", pp: "broken" },
    { base: "choose", past: "chose", pp: "chosen" }, { base: "forget", past: "forgot", pp: "forgotten" },
    { base: "know", past: "knew", pp: "known" }, { base: "ride", past: "rode", pp: "ridden" },
    { base: "speak", past: "spoke", pp: "spoken" }, { base: "wear", past: "wore", pp: "worn" },
    { base: "begin", past: "began", pp: "begun" }, { base: "come", past: "came", pp: "come" },
    { base: "do", past: "did", pp: "done" }, { base: "have", past: "had", pp: "had" },
    { base: "make", past: "made", pp: "made" }, { base: "find", past: "found", pp: "found" },
    { base: "tell", past: "told", pp: "told" }, { base: "think", past: "thought", pp: "thought" },
    { base: "get", past: "got", pp: "got" }, { base: "leave", past: "left", pp: "left" },
    { base: "lose", past: "lost", pp: "lost" }, { base: "read", past: "read", pp: "read" },
    { base: "run", past: "ran", pp: "run" }, { base: "sing", past: "sang", pp: "sung" },
    { base: "swim", past: "swam", pp: "swum" }, { base: "teach", past: "taught", pp: "taught" },
    { base: "throw", past: "threw", pp: "thrown" }, { base: "wake", past: "woke", pp: "woken" },
    { base: "win", past: "won", pp: "won" }, { base: "blow", past: "blew", pp: "blown" },
    { base: "draw", past: "drew", pp: "drawn" }, { base: "fall", past: "fell", pp: "fallen" },
    { base: "fly", past: "flew", pp: "flown" }, { base: "grow", past: "grew", pp: "grown" },
    { base: "hide", past: "hid", pp: "hidden" }, { base: "keep", past: "kept", pp: "kept" }
  ],
  matchGroups: [
    {
      label: "第 1 组",
      words: [
        { id: "g1a", base: "go", past: "went", pp: "gone" }, { id: "g1b", base: "see", past: "saw", pp: "seen" },
        { id: "g1c", base: "write", past: "wrote", pp: "written" }, { id: "g1d", base: "take", past: "took", pp: "taken" },
        { id: "g1e", base: "give", past: "gave", pp: "given" }, { id: "g1f", base: "eat", past: "ate", pp: "eaten" },
        { id: "g1g", base: "drink", past: "drank", pp: "drunk" }, { id: "g1h", base: "break", past: "broke", pp: "broken" },
        { id: "g1i", base: "choose", past: "chose", pp: "chosen" }, { id: "g1j", base: "forget", past: "forgot", pp: "forgotten" }
      ]
    },
    {
      label: "第 2 组",
      words: [
        { id: "g2a", base: "know", past: "knew", pp: "known" }, { id: "g2b", base: "ride", past: "rode", pp: "ridden" },
        { id: "g2c", base: "speak", past: "spoke", pp: "spoken" }, { id: "g2d", base: "wear", past: "wore", pp: "worn" },
        { id: "g2e", base: "begin", past: "began", pp: "begun" }, { id: "g2f", base: "come", past: "came", pp: "come" },
        { id: "g2g", base: "do", past: "did", pp: "done" }, { id: "g2h", base: "have", past: "had", pp: "had" },
        { id: "g2i", base: "make", past: "made", pp: "made" }, { id: "g2j", base: "find", past: "found", pp: "found" }
      ]
    },
    {
      label: "第 3 组",
      words: [
        { id: "g3a", base: "tell", past: "told", pp: "told" }, { id: "g3b", base: "think", past: "thought", pp: "thought" },
        { id: "g3c", base: "get", past: "got", pp: "got" }, { id: "g3d", base: "leave", past: "left", pp: "left" },
        { id: "g3e", base: "lose", past: "lost", pp: "lost" }, { id: "g3f", base: "read", past: "read", pp: "read" },
        { id: "g3g", base: "run", past: "ran", pp: "run" }, { id: "g3h", base: "sing", past: "sang", pp: "sung" },
        { id: "g3i", base: "swim", past: "swam", pp: "swum" }, { id: "g3j", base: "teach", past: "taught", pp: "taught" }
      ]
    },
    {
      label: "第 4 组",
      words: [
        { id: "g4a", base: "throw", past: "threw", pp: "thrown" }, { id: "g4b", base: "wake", past: "woke", pp: "woken" },
        { id: "g4c", base: "win", past: "won", pp: "won" }, { id: "g4d", base: "blow", past: "blew", pp: "blown" },
        { id: "g4e", base: "draw", past: "drew", pp: "drawn" }, { id: "g4f", base: "fall", past: "fell", pp: "fallen" },
        { id: "g4g", base: "fly", past: "flew", pp: "flown" }, { id: "g4h", base: "grow", past: "grew", pp: "grown" },
        { id: "g4i", base: "hide", past: "hid", pp: "hidden" }, { id: "g4j", base: "keep", past: "kept", pp: "kept" }
      ]
    }
  ]
};
