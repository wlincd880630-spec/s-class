/**
 * L03 一般过去时讲义 · 动态渲染与 TTS 绑定
 */
(function () {
    "use strict";

    var HANDOUT_DATA = {
      title: "一般过去时",
      chant:
        "过去事情讲从前，标志词汇记心间。Be 动词分 was / were，实义动词要变脸。规则加 ed 有四法，不规则词要归类。若是 Did 来带队，动词乖乖回原形！",
      irregularVerbs: [
        { family: "ought / aught 家族", words: "buy -> bought | catch -> caught | teach -> taught | bring -> brought | think -> thought" },
        { family: "元音替换家族", words: "choose -> chose | grow -> grew | wake -> woke | understand -> understood | know -> knew" },
        { family: "完全变异家族", words: "go -> went | see -> saw | make -> made | take -> took | leave -> left" },
        { family: "AAA 型同形词", words: "read /ri:d/ -> read /red/ | put -> put | cost -> cost | let -> let" }
      ],
      goldenSentences: [
        { en: "I experienced the charm of traditional Chinese culture.", zh: "我体验了中国传统文化的魅力。（文化主题写作）" },
        { en: "He understood the true meaning of teamwork after the game.", zh: "赛后他懂得了团队合作的真谛。（成长主题写作）" },
        { en: "We achieved our goals through hard work and patience.", zh: "我们通过努力和耐心实现了目标。（励志主题写作）" },
        { en: "I realized the importance of protecting the environment.", zh: "我意识到了保护环境的重要性。（环保主题写作）" },
        { en: "Did you catch the early bus to the panda research base?", zh: "你赶上早班车去熊猫基地了吗？" }
      ],
      usageLaw: [
        {
          groupTitle: "一、Be 动词（过去的状态）",
          items: [
            {
              sub: "am / is → was",
              rule: "I / he / she / it 以及单数名词作主语时用 was。",
              pairs: [
                { en: "He was very tired after the long train journey yesterday.", zh: "长途火车旅行之后，他昨天非常疲惫。" },
                { en: "It was rainy and cold when we arrived in Chengdu last Friday.", zh: "上周五我们到达成都时又冷又在下雨。" }
              ]
            },
            {
              sub: "are → were",
              rule: "we / you / they 以及复数名词作主语时用 were。",
              pairs: [
                { en: "We were excited about the school trip to the science museum.", zh: "我们对去科技博物馆的学校郊游非常兴奋。" },
                { en: "They were not at home last night because they visited their grandparents.", zh: "他们昨晚不在家，因为去看望爷爷奶奶了。" }
              ]
            }
          ]
        },
        {
          groupTitle: "二、常见规则动词（过去式 · 四法）",
          items: [
            {
              sub: "直接加 -ed",
              rule: "大多数动词：原形 + ed；词尾读 /t/、/d/ 或 /ɪd/。",
              pairs: [
                { en: "My cousin cleaned the classroom after school yesterday afternoon.", zh: "昨天下午放学后，我表弟打扫了教室。" },
                { en: "We watched an English movie about space travel last weekend.", zh: "上周末我们看了一部关于太空旅行的英语电影。" }
              ]
            },
            {
              sub: "去 e 再加 -d",
              rule: "以不发音的 e 结尾：去 e 后加 d。",
              pairs: [
                { en: "She experienced the beauty of traditional Chinese culture in Xi'an.", zh: "她在西安体验了中国传统文化之美。" },
                { en: "He lived in a small town near the mountains for five years.", zh: "他在山区附近的一座小镇生活了五年。" }
              ]
            },
            {
              sub: "辅音 + y → 变 y 为 i 再加 -ed",
              rule: "例：study → studied，carry → carried。",
              pairs: [
                { en: "Tom studied harder than before and passed the exam easily.", zh: "汤姆比以前更用功，轻松通过了考试。" },
                { en: "They carried the heavy books to the reading room together.", zh: "他们一起把那些很重的书搬到了阅览室。" }
              ]
            },
            {
              sub: "重读闭音节：辅元辅，双写尾字母 + ed",
              rule: "例：stop → stopped，plan → planned。",
              pairs: [
                { en: "The bus stopped suddenly because a cat ran across the street.", zh: "公交车突然停下，因为一只猫跑过了马路。" },
                { en: "She planned a surprise birthday party for her best friend.", zh: "她为最好的朋友策划了一场惊喜生日派对。" }
              ]
            }
          ]
        },
        {
          groupTitle: "三、不规则动词（按家族 · 完整句）",
          items: [
            {
              sub: "ought / aught 家族",
              rule: "buy → bought，catch → caught，teach → taught… 成串记忆。",
              pairs: [
                { en: "My mother bought some fresh fruit at the market this morning.", zh: "今天早上妈妈在市场买了一些新鲜水果。" },
                { en: "Our English teacher taught us how to write a good diary last term.", zh: "上学期英语老师教我们怎样写好日记。" }
              ]
            },
            {
              sub: "元音替换家族",
              rule: "grow → grew，choose → chose，know → knew… 中间元音变化。",
              pairs: [
                { en: "He knew the answer, but he still listened to others carefully.", zh: "他知道答案，但仍然认真听别人发言。" },
                { en: "She drank a cup of hot milk before she went to bed last night.", zh: "她昨晚睡前喝了一杯热牛奶。" }
              ]
            },
            {
              sub: "完全变异家族",
              rule: "go → went，see → saw，make → made… 过去式与原形完全不同。",
              pairs: [
                { en: "They went to the nature park and saw many lovely animals.", zh: "他们去了自然公园，看到了许多可爱的动物。" },
                { en: "Grandma made a delicious cake for my birthday party.", zh: "奶奶为我的生日聚会做了一个美味的蛋糕。" }
              ]
            },
            {
              sub: "AAA 伪装者（形同或形近、读音常变）",
              rule: "read /riːd/ → read /red/，put → put，cost → cost…",
              pairs: [
                { en: "He read the detective story twice and wrote a short review.", zh: "他把那篇侦探小说读了两遍，还写了一篇短评。" },
                { en: "I put my umbrella by the door when I came in from the rain.", zh: "我从雨里进来时，把雨伞放在了门边。" }
              ]
            }
          ]
        },
        {
          groupTitle: "四、Did · 否定与一般疑问 · 特殊疑问",
          items: [
            {
              sub: "否定：didn't + 动词原形",
              rule: "过去否定靠 didn't，后面主要动词必须用原形。",
              pairs: [
                { en: "I didn't finish my science project until Sunday evening.", zh: "直到周日晚上我才完成科学小课题。" },
                { en: "She didn't forget to bring the map when we climbed the hill.", zh: "我们爬山时她没有忘记带地图。" }
              ]
            },
            {
              sub: "一般疑问：Did + 主语 + 动词原形?",
              rule: "Did 已表示过去，主要动词不再加 -ed。",
              pairs: [
                { en: "Did you understand the main idea of the passage in class?", zh: "你在课堂上理解这段文章的大意了吗？" },
                { en: "Did they arrive at the train station before eight o'clock?", zh: "他们八点前到达火车站了吗？" }
              ]
            },
            {
              sub: "特殊疑问：Wh- + did + 主语 + 动词原形?",
              rule: "疑问词问信息，did 占位过去，后面仍是原形。",
              pairs: [
                { en: "What did she buy for her father's birthday at the shopping mall?", zh: "她在商场给爸爸生日买了什么？" },
                { en: "Where did he meet his old friends from primary school?", zh: "他在哪里见到了小学时的老朋友？" }
              ]
            }
          ]
        }
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

    function hlPastHtml(s) {
      return String(s).replace(/\b(experienced|understood|achieved|realized|catch|Did)\b/gi, function (m) {
        return '<span class="vb">' + m + "</span>";
      });
    }

    function appendExamplePair(host, en, zh) {
      var d = document.createElement("div");
      d.className = "ex-pair tap-card usage-pair";
      d.innerHTML =
        '<div class="en-line">' +
        escapeHtml(en) +
        ' <button type="button" class="tts-chip" data-tts="' +
        escapeAttr(en) +
        '">🔊</button></div><p class="zh-line">' +
        escapeHtml(zh) +
        "</p>";
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
          (it.pairs || []).forEach(function (p) {
            appendExamplePair(root, p.en, p.zh);
          });
        });
      });
    }

    function speakBrowser(text) {
      if (!window.LessonSpeak || !window.LessonSpeak.playEnglish) {
        return Promise.reject(new Error("朗读模块未加载"));
      }
      return window.LessonSpeak.playEnglish(String(text || ""));
    }

    var ttsLock = false;

    renderUsageLaw();

    var tb = document.getElementById("tbl");
    tb.innerHTML =
      "<tr><th>家族</th><th>速记词串</th></tr>" +
      HANDOUT_DATA.irregularVerbs
        .map(function (r) {
          return "<tr><td>" + escapeHtml(r.family) + "</td><td>" + escapeHtml(r.words) + "</td></tr>";
        })
        .join("");

    var host = document.getElementById("sents");
    HANDOUT_DATA.goldenSentences.forEach(function (s) {
      var d = document.createElement("div");
      d.className = "ex-pair tap-card";
      d.innerHTML =
        '<div class="en-line">' +
        hlPastHtml(s.en) +
        ' <button type="button" class="tts-chip" data-tts="' +
        escapeAttr(s.en) +
        '">🔊</button></div><p class="zh-line">' +
        escapeHtml(s.zh) +
        "</p>";
      host.appendChild(d);
    });

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented) return;
      var chip = e.target.closest(".tts-chip[data-tts]");
      if (!chip) return;
      if (window.LessonLocalAudio) return;
      e.preventDefault();
      if (ttsLock) return;
      var txt = chip.getAttribute("data-tts") || "";
      ttsLock = true;
      speakBrowser(txt).then(
        () => {
          ttsLock = false;
        },
        function (err) {
          ttsLock = false;
          alert(err && err.message ? err.message : "朗读失败。");
        }
      );
    });

  })();
