/** L09 过去进行时讲义 · 动态渲染（数据与 TTS manifest 键一致） */
(function () {
  "use strict";

    var HANDOUT_DATA = {
      title: "Past Continuous vs Simple Past · 过去进行时与一般过去时",
      chant:
        "长背景用 was doing，短动作用 did 记。when 引出关键点，while 描写并行动作。come across 表偶遇，find out 表获知。叙事围绕时间线，时态分工要清晰。",
      frameworkRows: [
        { c1: "While + S + was/were + doing ...", c2: "铺陈过去某一时段的背景，常与后文短动作连用。" },
        { c1: "… when + S + V-ed …", c2: "when 从句常写突变点（一般过去）。" },
        { c1: "S + was/were + doing + when …", c2: "主句背景 + when 引入打断事件。" },
        { c1: "While A was doing, B was / did …", c2: "双线并行（双进行）或背景+结果。" },
        { c1: "came across / found out + …", c2: "察觉、偶遇、获知 → 多用一般过去。" }
      ],
      usageLaw: [
        {
          groupTitle: "模块 ① 进行背景（延续动作）",
          items: [
            {
              sub: "was / were + doing",
              rule: "描写当时正在延续的动作或场景。",
              pairs: [
                { en: "We were driving home when the strong winds started.", zh: "我们正开车回家，这时狂风大作起来。", syn: { main: "We were driving home", sub: "when the strong winds started", bg: "We were driving home", emph: "the strong winds started" } },
                { en: "It was raining hard while we were driving back.", zh: "我们开车返回时，雨下得很大。", syn: { main: "It was raining hard", sub: "while we were driving back", bg: "we were driving back", emph: "—（双进行并行）" } },
                { en: "While I was waiting at the bus stop, the sky grew darker and darker.", zh: "我在公交站等车时，天空越来越暗。", syn: { main: "the sky grew darker and darker", sub: "While I was waiting at the bus stop", bg: "I was waiting at the bus stop", emph: "the sky grew darker and darker" } },
                { en: "She was reading a novel when the lights in the library suddenly flickered.", zh: "她正在读小说，图书馆的灯突然闪了一下。", syn: { main: "She was reading a novel", sub: "when the lights … flickered", bg: "She was reading a novel", emph: "the lights … flickered" } },
                { en: "The wind was getting stronger while we were walking along the river.", zh: "我们沿河散步时，风越来越大。", syn: { main: "The wind was getting stronger", sub: "while we were walking along the river", bg: "we were walking along the river", emph: "—（延续并行）" } },
                { en: "I was watching the road carefully because the rain was beating against the windshield.", zh: "雨打在挡风玻璃上，我小心盯着路。", syn: { main: "I was watching the road carefully", sub: "because the rain was beating …", bg: "I was watching / the rain was beating", emph: "—（因果内双进行）" } }
              ]
            }
          ]
        },
        {
          groupTitle: "模块 ② 一般过去（短动作）",
          items: [
            {
              sub: "点动词过去式打断背景",
              rule: "started / rang / knocked / went off 等短事件。",
              pairs: [
                { en: "While we were playing football, it started to rain heavily.", zh: "我们踢球时，天突然下起大雨。", syn: { main: "it started to rain heavily", sub: "While we were playing football", bg: "we were playing football", emph: "it started to rain heavily" } },
                { en: "I was listening to music when my phone suddenly rang.", zh: "我在听音乐，手机突然响了。", syn: { main: "I was listening to music", sub: "when my phone suddenly rang", bg: "I was listening to music", emph: "my phone … rang" } },
                { en: "He was typing an email when his teacher knocked on the door.", zh: "他正在写邮件时，老师敲了敲门。", syn: { main: "He was typing an email", sub: "when his teacher knocked on the door", bg: "He was typing an email", emph: "his teacher knocked on the door" } },
                { en: "We were cooking dinner when someone knocked at the gate.", zh: "我们做晚饭时，有人在门口敲门。", syn: { main: "We were cooking dinner", sub: "when someone knocked …", bg: "We were cooking dinner", emph: "someone knocked at the gate" } },
                { en: "She was jogging in the park when she heard a long, sharp horn.", zh: "她慢跑时，听到一声长而尖的喇叭。", syn: { main: "She was jogging in the park", sub: "when she heard …", bg: "She was jogging in the park", emph: "she heard a long, sharp horn" } },
                { en: "They were still discussing the plan when the fire alarm went off.", zh: "他们还在讨论计划，火警铃响了。", syn: { main: "They were still discussing the plan", sub: "when the fire alarm went off", bg: "They were still discussing the plan", emph: "the fire alarm went off" } }
              ]
            }
          ]
        },
        {
          groupTitle: "模块 ③ 瞬间动词易错点",
          items: [
            {
              sub: "find out / come across / realize / hear",
              rule: "表察觉、偶遇、听说 → 常用一般过去，避免 was finding 类错配。",
              pairs: [
                { en: "When he found out the truth, he stayed calm.", zh: "得知真相时，他保持冷静。", syn: { main: "he stayed calm", sub: "When he found out the truth", bg: "—", emph: "found out / stayed calm" } },
                { en: "While I was walking in the park, I came across a small bird on the grass.", zh: "散步时，我偶然看见草地上有一只小鸟。", syn: { main: "I came across a small bird", sub: "While I was walking in the park", bg: "I was walking in the park", emph: "I came across a small bird" } },
                { en: "I didn't notice the warning sign until I came across it near the gate.", zh: "直到在门口附近看到警示牌，我才注意到。", syn: { main: "I didn't notice the warning sign", sub: "until I came across it near the gate", bg: "—", emph: "came across it" } },
                { en: "She realized she was on the wrong bus when the conductor called the next stop.", zh: "售票员报站时，她才意识到坐错车。", syn: { main: "She realized she was on the wrong bus", sub: "when the conductor called …", bg: "she was on the wrong bus（宾从）", emph: "realized / called" } },
                { en: "We heard a strange noise while we were visiting the old library.", zh: "参观旧图书馆时，我们听到一个奇怪的声响。", syn: { main: "We heard a strange noise", sub: "while we were visiting the old library", bg: "we were visiting the old library", emph: "We heard a strange noise" } },
                { en: "He found out the meeting was canceled when he checked his email that morning.", zh: "早上查邮件时，他才发现会议取消了。", syn: { main: "He found out the meeting was canceled", sub: "when he checked his email …", bg: "—", emph: "found out / checked" } }
              ]
            }
          ]
        },
        {
          groupTitle: "模块 ④ 双线并行（While A..., B was...）",
          items: [
            {
              sub: "两条延续同时进行",
              rule: "while 连接两个 was/were doing，或后接突变主句。",
              pairs: [
                { en: "While I was doing my homework, my mother was cooking dinner.", zh: "我做作业时，妈妈在做晚饭。", syn: { main: "my mother was cooking dinner", sub: "While I was doing my homework", bg: "I was doing / mother was cooking", emph: "—（双进行）" } },
                { en: "While they were sleeping, the rain began to beat against the windows.", zh: "他们睡着时，雨开始拍打窗户。", syn: { main: "the rain began to beat against the windows", sub: "While they were sleeping", bg: "they were sleeping", emph: "the rain began to beat against the windows" } },
                { en: "While Dad was repairing the bike, I was holding the flashlight for him.", zh: "爸爸修车，我帮他举着手电筒。", syn: { main: "I was holding the flashlight for him", sub: "While Dad was repairing the bike", bg: "Dad was repairing / I was holding", emph: "—（双进行）" } },
                { en: "While the students were writing the test, the teacher was walking around quietly.", zh: "学生考试时，老师在轻轻走动。", syn: { main: "the teacher was walking around quietly", sub: "While the students were writing the test", bg: "students writing / teacher walking", emph: "—（并行）" } },
                { en: "While one team was celebrating on the field, the other team was leaving in silence.", zh: "一队庆祝时，另一队默默离开。", syn: { main: "the other team was leaving in silence", sub: "While one team was celebrating …", bg: "one celebrating / other leaving", emph: "—（对照并行）" } },
                { en: "While the baby was sleeping, Grandma was knitting beside the window.", zh: "宝宝睡时，奶奶在窗边打毛线。", syn: { main: "Grandma was knitting beside the window", sub: "While the baby was sleeping", bg: "baby sleeping / Grandma knitting", emph: "—（温馨并行）" } }
              ]
            }
          ]
        }
      ],
      goldenSentences: [
        { en: "While I was walking in the park last Sunday, I came across a small bird on the grass.", zh: "上周日我在公园散步时，偶然看见草地上有一只小鸟。" },
        { en: "When I saw it was hurt, I decided to take it to a nearby pet clinic.", zh: "当我发现它受伤时，我决定把它送到附近的宠物诊所。" },
        { en: "While we were waiting in line, I found out that the vet could help wild birds, too.", zh: "排队时我才得知，这位兽医也能救助野鸟。" },
        { en: "When we got to the clinic, the assistant was talking to another worried owner.", zh: "我们到达诊所时，助理正在和另一位焦急的主人交谈。" },
        { en: "I was holding the little bird carefully while the vet was examining its wing.", zh: "兽医检查翅膀时，我一直小心地捧着小鸟。" },
        { en: "When the doctor finished the check, I felt relieved and thanked him warmly.", zh: "检查结束时，我松了一口气并向他道谢。" },
        { en: "It was getting dark when we left the clinic with a small box of medicine.", zh: "我们拿着一小盒药离开诊所时，天色渐晚。" },
        { en: "Last Sunday was busy, but I was glad I was able to help a life in need.", zh: "那天很忙，但我很高兴自己帮助了一条小生命。" }
      ]
    };

    function escapeAttr(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    function syntaxHtml(syn) {
      if (!syn) return "";
      return (
        '<div class="syntax-lines">' +
        '<div><span class="sk">主句：</span>' +
        escapeHtml(syn.main) +
        "</div>" +
        '<div><span class="sk">从句：</span>' +
        escapeHtml(syn.sub) +
        "</div>" +
        '<div><span class="sk">背景句：</span>' +
        escapeHtml(syn.bg) +
        "</div>" +
        '<div><span class="sk">动作强调句：</span>' +
        escapeHtml(syn.emph) +
        "</div></div>"
      );
    }

    function appendExamplePair(host, pair) {
      var d = document.createElement("div");
      d.className = "ex-pair tap-card usage-pair";
      d.innerHTML =
        '<div class="en-line">' +
        escapeHtml(pair.en) +
        ' <button type="button" class="tts-chip" data-tts="' +
        escapeAttr(pair.en) +
        '">🔊</button></div><p class="zh-line">' +
        escapeHtml(pair.zh) +
        "</p>" +
        syntaxHtml(pair.syn);
      host.appendChild(d);
    }

    function renderUsageLaw() {
      var root = document.getElementById("usageHost");
      if (!root || !HANDOUT_DATA.usageLaw) return;
      root.innerHTML = "";
      HANDOUT_DATA.usageLaw.forEach(function (grp) {
        var gt = document.createElement("div");
        gt.className = "usage-group-title";
        gt.textContent = grp.groupTitle;
        root.appendChild(gt);
        grp.items.forEach(function (it) {
          var sub = document.createElement("div");
          sub.className = "usage-sub";
          sub.textContent = it.sub;
          root.appendChild(sub);
          var rule = document.createElement("p");
          rule.className = "usage-rule";
          rule.textContent = it.rule;
          root.appendChild(rule);
          var col = document.createElement("div");
          col.className = "handout-ex-two-col";
          (it.pairs || []).forEach(function (p) {
            appendExamplePair(col, p);
          });
          if (col.childNodes.length) root.appendChild(col);
        });
      });
    }

    var tb = document.getElementById("tbl");
    tb.innerHTML =
      "<thead><tr><th>句型骨架</th><th>用法说明（中文）</th></tr></thead><tbody>" +
      HANDOUT_DATA.frameworkRows
        .map(function (r) {
          return "<tr><td>" + escapeHtml(r.c1) + "</td><td>" + escapeHtml(r.c2) + "</td></tr>";
        })
        .join("") +
      "</tbody>";

    renderUsageLaw();

    var host = document.getElementById("sents");
    HANDOUT_DATA.goldenSentences.forEach(function (s) {
      var d = document.createElement("div");
      d.className = "ex-pair tap-card";
      d.innerHTML =
        '<div class="en-line">' +
        escapeHtml(s.en) +
        ' <button type="button" class="tts-chip" data-tts="' +
        escapeAttr(s.en) +
        '">🔊</button></div><p class="zh-line">' +
        escapeHtml(s.zh) +
        "</p>";
      host.appendChild(d);
    });
})();
