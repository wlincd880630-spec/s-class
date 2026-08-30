/* L05 Pronouns · classroom app */
(function (global) {
  "use strict";

  var DATA = global.L05PronounsData;
  var IMG = "assets/img/";
  var STORAGE_LEVEL = "l05-pronouns-level";
  var state = {
    level: localStorage.getItem(STORAGE_LEVEL) || "g7",
    view: "home",
    typeId: "subject",
    formIdx: 0,
    quizIdx: 0,
    quizScore: 0,
    quizAnswered: false,
    quizRound: null,
    quizRoundLevel: "",
    raceMode: false,
    raceLeft: 0,
    raceTimer: null,
    imitateIdx: 0,
    compIdx: 0,
    compScore: 0,
    compAnswered: false,
  };

  var DEEPSEEK_KEY =
    (global.__DEEPSEEK_API_KEY__ ||
      global.__DEEPSEEK_API_KEY ||
      "sk-daa16008e81843deba6fefe9dce51465").trim();
  var DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function levelMeta() {
    return DATA.levels[state.level] || DATA.levels.g7;
  }
  function typeById(id) {
    for (var i = 0; i < DATA.types.length; i++) {
      if (DATA.types[i].id === id) return DATA.types[i];
    }
    return DATA.types[0];
  }

  var TYPE_LABELS = {
    subject: "主格",
    object: "宾格",
    possAdj: "形物",
    possPron: "名物",
    reflexive: "反身",
  };
  var TYPE_ORDER = ["subject", "object", "possAdj", "possPron", "reflexive"];

  var PERSON_ROWS = [
    {
      id: "p1s",
      person: "第一人称单数",
      cells: { subject: "I", object: "me", possAdj: "my", possPron: "mine", reflexive: "myself" },
      ipa: { subject: "/aɪ/", object: "/miː/", possAdj: "/maɪ/", possPron: "/maɪn/", reflexive: "/maɪˈself/" },
    },
    {
      id: "p2s",
      person: "第二人称单数",
      cells: { subject: "you", object: "you", possAdj: "your", possPron: "yours", reflexive: "yourself" },
      ipa: { subject: "/juː/", object: "/juː/", possAdj: "/jɔː/", possPron: "/jɔːz/", reflexive: "/jɔːˈself/" },
    },
    {
      id: "p3m",
      person: "第三人称单数（男）",
      cells: { subject: "he", object: "him", possAdj: "his", possPron: "his", reflexive: "himself" },
      ipa: { subject: "/hiː/", object: "/hɪm/", possAdj: "/hɪz/", possPron: "/hɪz/", reflexive: "/hɪmˈself/" },
    },
    {
      id: "p3f",
      person: "第三人称单数（女）",
      cells: { subject: "she", object: "her", possAdj: "her", possPron: "hers", reflexive: "herself" },
      ipa: { subject: "/ʃiː/", object: "/hɜː/", possAdj: "/hɜː/", possPron: "/hɜːz/", reflexive: "/hɜːˈself/" },
    },
    {
      id: "p3n",
      person: "第三人称单数（物）",
      cells: { subject: "it", object: "it", possAdj: "its", possPron: "its", reflexive: "itself" },
      ipa: { subject: "/ɪt/", object: "/ɪt/", possAdj: "/ɪts/", possPron: "/ɪts/", reflexive: "/ɪtˈself/" },
    },
    {
      id: "p1p",
      person: "第一人称复数",
      cells: { subject: "we", object: "us", possAdj: "our", possPron: "ours", reflexive: "ourselves" },
      ipa: { subject: "/wiː/", object: "/ʌs/", possAdj: "/aʊə/", possPron: "/aʊəz/", reflexive: "/aʊəˈselvz/" },
    },
    {
      id: "p2p",
      person: "第二人称复数",
      cells: { subject: "you", object: "you", possAdj: "your", possPron: "yours", reflexive: "yourselves" },
      ipa: { subject: "/juː/", object: "/juː/", possAdj: "/jɔː/", possPron: "/jɔːz/", reflexive: "/jɔːˈselvz/" },
    },
    {
      id: "p3p",
      person: "第三人称复数",
      cells: { subject: "they", object: "them", possAdj: "their", possPron: "theirs", reflexive: "themselves" },
      ipa: { subject: "/ðeɪ/", object: "/ðem/", possAdj: "/ðeə/", possPron: "/ðeəz/", reflexive: "/ðəmˈselvz/" },
    },
  ];

  var FORM_TEACH = {
    "subject:I": { image: "ex/ex-subject-g7-0.jpg", en: "I am a student.", zh: "我是一名学生。", en2: "I love English.", zh2: "我喜欢英语。", tip: "放在动词前，说明「谁做这件事」。" },
    "subject:you": { image: "ex/ex-subject-g7-1.jpg", en: "You are my friend.", zh: "你是我的朋友。", en2: "You and I are good friends.", zh2: "你我是好朋友。", tip: "you 单复数同形，都作主语。" },
    "subject:he": { image: "ex/ex-subject-g8-0.jpg", en: "He plays basketball after school.", zh: "他放学后打篮球。", en2: "He doesn't know the answer.", zh2: "他不知道答案。", tip: "指男性，动词第三人称单数要加 -s。" },
    "subject:she": { image: "ex/ex-subject-g7-2.jpg", en: "She likes apples.", zh: "她喜欢苹果。", en2: "She and I often study together.", zh2: "她和我经常一起学习。", tip: "指女性；并列主语都用主格。" },
    "subject:it": { image: "ex/ex-subject-g8-2.jpg", en: "It is a sunny day.", zh: "今天是晴天。", en2: "It is important to study hard.", zh2: "努力学习很重要。", tip: "指物、动物、天气、时间，也可作形式主语。" },
    "subject:we": { image: "ex/ex-subject-g7-3.jpg", en: "We have a new teacher.", zh: "我们有一位新老师。", en2: "We all like our English teacher.", zh2: "我们都喜欢我们的英语老师。", tip: "第一人称复数作主语。" },
    "subject:they": { image: "ex/ex-subject-g8-1.jpg", en: "They are going to the park.", zh: "他们要去公园。", en2: "They are the winners of the game.", zh2: "他们是比赛的获胜者。", tip: "指他们/她们/它们，作主语。" },
    "object:me": { image: "ex/ex-object-g7-0.jpg", en: "Please help me.", zh: "请帮助我。", en2: "Please give it to me.", zh2: "请把它给我。", tip: "动词或介词后用宾格，不能用 I。" },
    "object:you": { image: "ex/ex-object-g7-1.jpg", en: "I like you.", zh: "我喜欢你。", en2: "Between you and me, he is wrong.", zh2: "在你我之间，他错了。", tip: "you 主格宾格同形；介词后仍用 you。" },
    "object:him": { image: "ex/ex-object-g7-2.jpg", en: "She sees him every day.", zh: "她每天看见他。", en2: "I saw him at the library.", zh2: "我在图书馆看见了他。", tip: "he 的宾格是 him，不是 he。" },
    "object:her": { image: "ex/ex-object-g8-1.jpg", en: "I will call her later.", zh: "我稍后给她打电话。", en2: "This gift is for her.", zh2: "这份礼物是给她的。", tip: "动词后、介词后都用 her。" },
    "object:it": { image: "ex/ex-object-g8-2.jpg", en: "Please give it to me.", zh: "请把它给我。", en2: "I like it very much.", zh2: "我非常喜欢它。", tip: "it 主格宾格同形。" },
    "object:us": { image: "ex/ex-object-g8-0.jpg", en: "Can you help us with our homework?", zh: "你能帮助我们做作业吗？", en2: "Please tell us the truth.", zh2: "请告诉我们真相。", tip: "we 的宾格是 us；give/tell/show 后的人用宾格。" },
    "object:them": { image: "ex/ex-object-g7-3.jpg", en: "We love them.", zh: "我们爱他们。", en2: "Please tell them the good news.", zh2: "请告诉他们这个好消息。", tip: "they 的宾格是 them。" },
    "possAdj:my": { image: "ex/ex-possAdj-g7-0.jpg", en: "This is my book.", zh: "这是我的书。", en2: "My mother cooks dinner.", zh2: "我妈妈做晚饭。", tip: "后面必须再接名词，不能单独用。" },
    "possAdj:your": { image: "ex/ex-possAdj-g7-1.jpg", en: "Your bag is nice.", zh: "你的包很漂亮。", en2: "Your idea sounds great.", zh2: "你的主意听起来很棒。", tip: "your 后接名词：your bag。" },
    "possAdj:his": { image: "ex/ex-possAdj-g8-0.jpg", en: "His father is a doctor.", zh: "他的爸爸是医生。", en2: "This is his new bike.", zh2: "这是他的新自行车。", tip: "his 形物、名物同形；这里后面有名词，是形物。" },
    "possAdj:her": { image: "ex/ex-possAdj-g7-2.jpg", en: "Her name is Lily.", zh: "她的名字是莉莉。", en2: "Her desk is near the window.", zh2: "她的课桌靠近窗户。", tip: "her 后接名词=她的；单独用 her 才是宾格。" },
    "possAdj:its": { image: "ex/ex-possAdj-g8-1.jpg", en: "Its tail is long.", zh: "它的尾巴很长。", en2: "The dog wagged its tail.", zh2: "狗摇了摇它的尾巴。", tip: "its=它的；it's=it is。后面必须有名词。" },
    "possAdj:our": { image: "ex/ex-possAdj-g7-3.jpg", en: "Our school is big.", zh: "我们的学校很大。", en2: "Our teacher is very kind.", zh2: "我们的老师非常和蔼。", tip: "our + 名词；没有名词时改用 ours。" },
    "possAdj:their": { image: "ex/ex-possAdj-g8-2.jpg", en: "Their house is near the park.", zh: "他们的房子在公园附近。", en2: "Their parents are busy.", zh2: "他们的父母很忙。", tip: "their + 名词；不要和 there / they're 混淆。" },
    "possPron:mine": { image: "ex/ex-possPron-g7-0.jpg", en: "The book is mine.", zh: "这本书是我的。", en2: "Your phone is new, but mine is old.", zh2: "你的手机是新的，但我的旧了。", tip: "后面不再接名词，相当于 my + 名词。" },
    "possPron:yours": { image: "ex/ex-possPron-g7-1.jpg", en: "Is this yours?", zh: "这是你的吗？", en2: "The choice is yours.", zh2: "选择权是你的。", tip: "回答 Whose…? 常用 yours。" },
    "possPron:his": { image: "ex/ex-possPron-g8-0.jpg", en: "This seat is his.", zh: "这个座位是他的。", en2: "That is her idea, not his.", zh2: "那是她的主意，不是他的。", tip: "his 名物与形物同形；这里后面没有名词。" },
    "possPron:hers": { image: "ex/ex-possPron-g7-2.jpg", en: "The pen is hers.", zh: "这支笔是她的。", en2: "Whose bag is this? It's hers.", zh2: "这是谁的包？是她的。", tip: "hers 后面不加名词，不要写成 her's。" },
    "possPron:its": { image: "ex/ex-possAdj-g8-1.jpg", en: "The bone is its.", zh: "这根骨头是它的。", en2: "The nest is its, not ours.", zh2: "这个窝是它的，不是我们的。", tip: "its 作名物很少用，考试里几乎只考形物 its。" },
    "possPron:ours": { image: "ex/ex-possPron-g7-3.jpg", en: "The classroom is ours.", zh: "这间教室是我们的。", en2: "Their house is bigger than ours.", zh2: "他们的房子比我们的大。", tip: "ours = our + 名词，单独使用。" },
    "possPron:theirs": { image: "ex/ex-possPron-g8-1.jpg", en: "The cat is theirs.", zh: "这只猫是他们的。", en2: "Our school is bigger than theirs.", zh2: "我们的学校比他们的大。", tip: "theirs 后面不加名词。" },
    "reflexive:myself": { image: "ex/ex-reflexive-g7-0.jpg", en: "I can do it myself.", zh: "我自己能做。", en2: "I taught myself English.", zh2: "我自学英语。", tip: "动作回到 I，或强调「亲自」。" },
    "reflexive:yourself": { image: "ex/ex-reflexive-g8-0.jpg", en: "You should believe in yourself.", zh: "你应该相信自己。", en2: "Help yourself to some fruit.", zh2: "请随便吃些水果。", tip: "对一个人说 you 时用 yourself。" },
    "reflexive:himself": { image: "ex/ex-reflexive-g7-2.jpg", en: "He hurt himself.", zh: "他伤了自己。", en2: "He introduced himself to the class.", zh2: "他向全班介绍了自己。", tip: "he → himself，不是 hisself。" },
    "reflexive:herself": { image: "ex/ex-reflexive-g7-1.jpg", en: "She made the cake herself.", zh: "她自己做蛋糕。", en2: "She looked at herself in the mirror.", zh2: "她看着镜子里的自己。", tip: "she → herself；可表亲自或动作回到主语。" },
    "reflexive:itself": { image: "ex/use-possAdj-2.jpg", en: "The cat washed itself.", zh: "猫给自己洗了澡。", en2: "The door opened by itself.", zh2: "门自己开了。", tip: "it → itself，常用于动物或事物。" },
    "reflexive:ourselves": { image: "ex/ex-reflexive-g7-3.jpg", en: "We enjoyed ourselves at the party.", zh: "我们在聚会上玩得很开心。", en2: "We should help ourselves first.", zh2: "我们应该先帮助自己。", tip: "we → ourselves；enjoy oneself 是固定搭配。" },
    "reflexive:yourselves": { image: "ex/use-reflexive-2.jpg", en: "Help yourselves to some fruit.", zh: "请随便吃些水果。", en2: "Did you enjoy yourselves?", zh2: "你们玩得开心吗？", tip: "对两人或以上说 you 时用 yourselves。" },
    "reflexive:themselves": { image: "ex/ex-reflexive-g8-1.jpg", en: "They built the house themselves.", zh: "他们自己建了房子。", en2: "They enjoyed themselves at the party.", zh2: "他们在聚会上玩得很开心。", tip: "they → themselves，不是 theirselves。" },
  };

  function cleanForm(form) {
    return String(form || "")
      .replace(/（[^）]*）/g, "")
      .replace(/\([^)]*\)/g, "")
      .trim();
  }

  function personFor(typeId, form) {
    var key = cleanForm(form);
    var hits = PERSON_ROWS.filter(function (r) {
      return r.cells[typeId] === key;
    });
    if (!hits.length) return PERSON_ROWS[0];
    if (key === "yourselves") {
      return hits.filter(function (r) { return r.id === "p2p"; })[0] || hits[0];
    }
    if (key === "yourself") {
      return hits.filter(function (r) { return r.id === "p2s"; })[0] || hits[0];
    }
    return hits[0];
  }

  function teachFor(typeId, form) {
    return FORM_TEACH[typeId + ":" + cleanForm(form)] || null;
  }

  function formIndexInType(typeId, form) {
    var t = typeById(typeId);
    var key = cleanForm(form);
    for (var i = 0; i < t.forms.length; i++) {
      if (cleanForm(t.forms[i].form) === key) return i;
    }
    return 0;
  }
  function examplesFor(typeId) {
    var block = (DATA.examples && DATA.examples[typeId]) || {};
    return block[state.level] || block.g7 || [];
  }
  var QUIZ_ROUND_SIZE = 8;

  function shuffle(arr) {
    var a = (arr || []).slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function quizBank() {
    var src =
      (global.L05PronounsQuizData && global.L05PronounsQuizData[state.level]) ||
      (DATA.quiz && DATA.quiz[state.level]) ||
      (DATA.quiz && DATA.quiz.g7) ||
      [];
    return src;
  }

  function ensureQuizRound(force) {
    if (force || !state.quizRound || state.quizRoundLevel !== state.level) {
      state.quizRound = shuffle(quizBank()).slice(0, QUIZ_ROUND_SIZE);
      state.quizRoundLevel = state.level;
      state.quizIdx = 0;
      state.quizScore = 0;
      state.quizAnswered = false;
    }
    return state.quizRound;
  }

  function quizPool() {
    return ensureQuizRound(false);
  }
  function imitatePool() {
    return (DATA.imitate && DATA.imitate[state.level]) || DATA.imitate.g7 || [];
  }
  function compPool() {
    return (DATA.comprehensive && DATA.comprehensive[state.level]) || DATA.comprehensive.g7 || [];
  }

  /* —— Azure TTS (reuse kp-tts if present, else inline) —— */
  var _audio = null;
  var _blobUrl = null;

  function stopTts() {
    try {
      if (_audio) {
        _audio.pause();
        _audio = null;
      }
      if (_blobUrl) {
        URL.revokeObjectURL(_blobUrl);
        _blobUrl = null;
      }
    } catch (e) {}
    $$(".pr-tts.playing").forEach(function (b) {
      b.classList.remove("playing");
    });
  }

  function azureSpeak(text) {
    if (global.KpTTS && typeof global.KpTTS.speak === "function") {
      return global.KpTTS.speak(text);
    }
    var key = String(global.__AZURE_SPEECH_KEY__ || "").trim();
    var region = String(global.__AZURE_SPEECH_REGION__ || "southeastasia").trim();
    var safe = String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
    if (!key || !safe) return Promise.resolve(false);
    stopTts();
    var ssml =
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-GB">' +
      '<voice name="en-GB-RyanNeural"><prosody rate="-15%">' +
      safe +
      "</prosody></voice></speak>";
    return fetch("https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/ssml+xml; charset=utf-8",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "Ocp-Apim-Subscription-Key": key,
      },
      body: ssml,
    })
      .then(function (res) {
        if (!res.ok) throw new Error("tts " + res.status);
        return res.blob();
      })
      .then(function (blob) {
        _blobUrl = URL.createObjectURL(blob);
        _audio = new Audio(_blobUrl);
        return new Promise(function (resolve) {
          _audio.addEventListener(
            "ended",
            function () {
              stopTts();
              resolve(true);
            },
            { once: true }
          );
          _audio.addEventListener(
            "error",
            function () {
              stopTts();
              resolve(false);
            },
            { once: true }
          );
          _audio.play().catch(function () {
            stopTts();
            resolve(false);
          });
        });
      })
      .catch(function () {
        if (!global.speechSynthesis) return false;
        return new Promise(function (resolve) {
          var u = new SpeechSynthesisUtterance(text);
          u.lang = "en-GB";
          u.onend = function () {
            resolve(true);
          };
          u.onerror = function () {
            resolve(false);
          };
          speechSynthesis.speak(u);
        });
      });
  }

  function speakClick(btn, text) {
    if (!text) return;
    btn.classList.add("playing");
    azureSpeak(text).then(function () {
      btn.classList.remove("playing");
    });
  }

  /* —— DeepSeek enrich —— */
  function deepseekExtra(typeId, level) {
    var t = typeById(typeId);
    var sys =
      "你是初中英语老师。只输出 JSON：{\"en\":\"...\",\"zh\":\"...\",\"tip\":\"...\"}。一句实用例句，难度对应" +
      (DATA.levels[level] || {}).label +
      "，目标语法：" +
      t.nameZh +
      "。";
    return fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + DEEPSEEK_KEY,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.6,
        max_tokens: 200,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: "再给一句新鲜校园场景例句。" },
        ],
      }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        var raw = (((j.choices || [])[0] || {}).message || {}).content || "";
        raw = raw.trim();
        if (raw.indexOf("```") === 0) {
          raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
        }
        return JSON.parse(raw);
      });
  }

  /* —— Reveal helpers —— */
  function revealHtml(en, zh) {
    return (
      '<div class="pr-reveal-row">' +
      '<button type="button" class="pr-reveal en" data-role="en" aria-label="点击显示英文">' +
      '<span class="hint-txt">显示英文</span>' +
      '<span class="val" lang="en">' +
      esc(en) +
      "</span></button>" +
      '<button type="button" class="pr-reveal zh" data-role="zh" aria-label="点击显示中文">' +
      '<span class="hint-txt">显示中文</span>' +
      '<span class="val">' +
      esc(zh) +
      "</span></button>" +
      "</div>"
    );
  }

  function bindReveals(root) {
    $$( ".pr-reveal", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.toggle("is-open");
      });
    });
  }

  /* —— Views —— */
  function setView(name) {
    state.view = name;
    $$(".pr-view").forEach(function (v) {
      v.classList.toggle("on", v.getAttribute("data-view") === name);
    });
    $$(".pr-footer-nav button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-go") === name);
    });
    stopTts();
    if (state.raceTimer) {
      clearInterval(state.raceTimer);
      state.raceTimer = null;
    }
    if (name === "home") renderHome();
    if (name === "teach") renderTeach();
    if (name === "imitate") renderImitate();
    if (name === "practice") renderPractice();
    if (name === "comp") renderComp();
    if (name === "table") renderTable();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderHome() {
    var host = $("#view-home");
    if (!host) return;
    var lv = levelMeta();
    var stages = [
      { id: "teach", num: "01", title: "教师讲解 · 演示", desc: "五类代词用法，语音先行例句" },
      { id: "imitate", num: "02", title: "学生模仿", desc: "先听后跟读，点击揭开中英文" },
      { id: "practice", num: "03", title: "练习 · 竞赛", desc: "限时快选，挑战正确率" },
      { id: "comp", num: "04", title: "综合练习", desc: "五类代词混合闯关" },
      { id: "table", num: "05", title: "五种代词总表", desc: "一表通吃，点击揭开朗读" },
      { id: "testpdf", num: "06", title: "纸质测试 · PDF", desc: "对照表 + 30 填空，打印/下载", href: "test-pdf.html" },
    ];
    host.innerHTML =
      '<div class="pr-hero">' +
      '<img src="' +
      IMG +
      esc(DATA.meta.hero) +
      '" alt="" />' +
      '<div class="pr-hero__veil">' +
      '<p class="pr-brand">Steven\'s Class</p>' +
      "<h1>" +
      esc(DATA.meta.title) +
      "</h1>" +
      "<p>" +
      esc(DATA.meta.subtitle) +
      " · 当前 " +
      esc(lv.label) +
      "</p>" +
      '<div class="pr-hero__cta">' +
      '<button type="button" class="pr-btn" id="startTeach">开始讲解</button>' +
      '<button type="button" class="pr-btn ghost" id="startTable" style="color:#fff;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)">看总表</button>' +
      '<a class="pr-btn amber" href="test-pdf.html" style="text-decoration:none;display:inline-flex;align-items:center">纸质测试 PDF</a>' +
      "</div></div></div>" +
      '<section class="pr-section">' +
      '<h2 class="pr-section__title">选择难度</h2>' +
      '<p class="pr-section__lead">只显示对应年级的例句与练习</p>' +
      '<div class="pr-level" id="levelPick"></div>' +
      "</section>" +
      '<section class="pr-section">' +
      '<h2 class="pr-section__title">课堂路径</h2>' +
      '<p class="pr-section__lead">按顺序走完一遍，或直接跳到需要的环节</p>' +
      '<div class="pr-stages" id="stagePick"></div>' +
      "</section>";

    var lp = $("#levelPick", host);
    Object.keys(DATA.levels).forEach(function (k) {
      var L = DATA.levels[k];
      var b = document.createElement("button");
      b.type = "button";
      b.className = k === state.level ? "on" : "";
      b.innerHTML = '<span class="lv">' + esc(L.label) + '</span><span class="hint">' + esc(L.hint) + "</span>";
      b.addEventListener("click", function () {
        state.level = k;
        localStorage.setItem(STORAGE_LEVEL, k);
        state.quizRound = null;
        renderHome();
      });
      lp.appendChild(b);
    });

    var sp = $("#stagePick", host);
    stages.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pr-stage";
      b.innerHTML =
        '<span class="num">' +
        s.num +
        '</span><span class="body"><strong>' +
        esc(s.title) +
        "</strong><span>" +
        esc(s.desc) +
        '</span></span><span class="arrow" aria-hidden="true">→</span>';
      b.addEventListener("click", function () {
        if (s.href) {
          location.href = s.href;
          return;
        }
        setView(s.id);
      });
      sp.appendChild(b);
    });

    var st = $("#startTeach", host);
    if (st) st.addEventListener("click", function () { setView("teach"); });
    var tb = $("#startTable", host);
    if (tb) tb.addEventListener("click", function () { setView("table"); });
  }

  function renderTeach() {
    var host = $("#view-teach");
    var t = typeById(state.typeId);
    var exs = examplesFor(state.typeId);
    if (state.formIdx < 0 || state.formIdx >= t.forms.length) state.formIdx = 0;
    var curForm = t.forms[state.formIdx] || t.forms[0];
    var curKey = cleanForm(curForm.form);
    var person = personFor(state.typeId, curForm.form);
    var teach = teachFor(state.typeId, curForm.form) || {};
    var tabs = DATA.types
      .map(function (x) {
        return (
          '<button type="button" class="' +
          (x.id === state.typeId ? "on" : "") +
          '" data-type="' +
          x.id +
          '">' +
          esc(x.nameZh) +
          "</button>"
        );
      })
      .join("");

    var forms = t.forms
      .map(function (f, fi) {
        return (
          '<button type="button" class="pr-form-pill' +
          (fi === state.formIdx ? " on" : "") +
          '" data-form-idx="' +
          fi +
          '" data-speak="' +
          esc(cleanForm(f.form)) +
          '">' +
          esc(f.form) +
          " · " +
          esc(f.zh) +
          "</button>"
        );
      })
      .join("");

    var familyChips = TYPE_ORDER.map(function (tid) {
      var word = person.cells[tid];
      var ipa = (person.ipa && person.ipa[tid]) || "";
      return (
        '<button type="button" class="pr-family__chip' +
        (tid === state.typeId ? " on" : "") +
        '" data-jump-type="' +
        tid +
        '" data-jump-form="' +
        esc(word) +
        '"><span class="k">' +
        esc(TYPE_LABELS[tid]) +
        '</span><span class="v" lang="en">' +
        esc(word) +
        (ipa ? " " + esc(ipa) : "") +
        "</span></button>"
      );
    }).join("");

    var vocabImg = teach.image || t.image;
    var vocabHtml =
      '<section class="pr-section">' +
      '<h2 class="pr-section__title">词汇教学 · ' +
      esc(curForm.form) +
      "</h2>" +
      '<p class="pr-section__lead">词形家族 + 配图 + 语音 + 两句例句，点选上方单词或下方家族格切换</p>' +
      '<article class="pr-vocab">' +
      (vocabImg
        ? '<div class="pr-vocab__img-wrap"><img src="' +
          IMG +
          esc(vocabImg) +
          '" alt="' +
          esc(curForm.form) +
          " · " +
          esc(curForm.zh) +
          '" /></div>'
        : "") +
      '<div class="pr-vocab__body">' +
      '<p class="pr-vocab__word" lang="en">' +
      esc(curKey) +
      "</p>" +
      '<p class="pr-vocab__ipa">' +
      esc((person.ipa && person.ipa[state.typeId]) || "") +
      " · " +
      esc(person.person) +
      " · " +
      esc(t.nameZh) +
      "</p>" +
      '<p class="pr-vocab__zh">' +
      esc(curForm.zh) +
      " · " +
      esc(t.short) +
      "</p>" +
      '<div class="pr-family" aria-label="五种代词家族">' +
      familyChips +
      "</div>" +
      (teach.tip ? '<p class="pr-vocab__tip">' + esc(teach.tip) + "</p>" : "") +
      (teach.en
        ? '<div class="pr-vocab__ex"><div class="pr-vocab__ex-label">例句 01</div>' +
          '<div class="pr-actions" style="margin-top:0;margin-bottom:.45rem">' +
          '<button type="button" class="pr-tts" data-speak="' +
          esc(teach.en) +
          '">先听示范</button></div>' +
          revealHtml(teach.en, teach.zh) +
          "</div>"
        : "") +
      (teach.en2
        ? '<div class="pr-vocab__ex"><div class="pr-vocab__ex-label">例句 02</div>' +
          '<div class="pr-actions" style="margin-top:0;margin-bottom:.45rem">' +
          '<button type="button" class="pr-tts" data-speak="' +
          esc(teach.en2) +
          '">先听示范</button></div>' +
          revealHtml(teach.en2, teach.zh2) +
          "</div>"
        : "") +
      "</div></article></section>";

    var usages = t.usages
      .map(function (u, ui) {
        return (
          '<article class="pr-usage">' +
          '<div class="pr-usage__head"><span class="pr-usage__idx">' +
          String(ui + 1).padStart(2, "0") +
          "</span><h4>" +
          esc(u.title) +
          "</h4></div>" +
          "<p>" +
          esc(u.desc) +
          "</p>" +
          (u.image
            ? '<img class="pr-usage-img" src="' + IMG + esc(u.image) + '" alt="" loading="lazy" />'
            : "") +
          '<div class="pr-actions" style="margin-top:0;margin-bottom:.55rem">' +
          '<button type="button" class="pr-tts" data-speak="' +
          esc(u.en) +
          '">先听示范</button></div>' +
          revealHtml(u.en, u.zh) +
          "</article>"
        );
      })
      .join("");

    var exHtml = exs
      .map(function (ex, i) {
        return (
          '<article class="pr-ex-item" data-ex="' +
          i +
          '">' +
          '<div class="pr-ex-visual">' +
          (ex.image
            ? '<div class="pr-ex-visual__img"><img src="' +
              IMG +
              esc(ex.image) +
              '" alt="" loading="lazy" /></div>'
            : "") +
          '<div class="pr-ex-visual__body">' +
          '<div class="meta"><span class="tag">' +
          esc(ex.focus || "") +
          '</span><button type="button" class="pr-tts" data-speak="' +
          esc(ex.en) +
          '">语音先行</button></div>' +
          revealHtml(ex.en, ex.zh) +
          (ex.tip ? '<p class="tip">' + esc(ex.tip) + "</p>" : "") +
          "</div></div></article>"
        );
      })
      .join("");

    host.innerHTML =
      '<div class="pr-view-hd">' +
      '<button type="button" class="ghost" data-go="home">← 目录</button>' +
      "<h2>教师讲解</h2>" +
      '<span class="chip">' +
      esc(levelMeta().label) +
      "</span></div>" +
      '<div class="pr-type-tabs">' +
      tabs +
      "</div>" +
      '<div class="pr-scene-banner">' +
      '<img src="' +
      IMG +
      esc(t.image) +
      '" alt="' +
      esc(t.nameZh) +
      '" />' +
      '<div class="pr-scene-banner__meta"><div class="en">' +
      esc(t.nameEn) +
      "</div><h3>" +
      esc(t.nameZh) +
      " · " +
      esc(t.short) +
      "</h3></div></div>" +
      '<section class="pr-section" style="margin-bottom:.65rem">' +
      '<h2 class="pr-section__title">本类单词</h2>' +
      '<p class="pr-section__lead">点选后进入完整词汇教学：音标、词形家族、配图与两句例句</p>' +
      '<div class="pr-forms">' +
      forms +
      "</div></section>" +
      vocabHtml +
      '<section class="pr-section">' +
      '<h2 class="pr-section__title">用法讲解</h2>' +
      '<p class="pr-section__lead">配图完整显示 · 先听再揭开中英文</p>' +
      "</section>" +
      usages +
      '<hr class="pr-divider" />' +
      '<section class="pr-section">' +
      '<h2 class="pr-section__title">分层例句 · ' +
      esc(levelMeta().label) +
      "</h2>" +
      '<p class="pr-section__lead">先听语音，再点击揭开中英文</p>' +
      '<div class="pr-ex-list">' +
      exHtml +
      "</div>" +
      '<p class="pr-ds">语料 · DeepSeek · <button type="button" id="dsMore">再生成一句</button></p>' +
      '<div id="dsSlot"></div></section>';

    bindReveals(host);
    $$(".pr-type-tabs button", host).forEach(function (b) {
      b.addEventListener("click", function () {
        state.typeId = b.getAttribute("data-type");
        state.formIdx = 0;
        renderTeach();
      });
    });
    $$(".pr-form-pill[data-form-idx]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        state.formIdx = +b.getAttribute("data-form-idx") || 0;
        renderTeach();
      });
    });
    $$("[data-jump-type]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        var tid = b.getAttribute("data-jump-type");
        var word = b.getAttribute("data-jump-form");
        if (!tid || !word) return;
        state.typeId = tid;
        state.formIdx = formIndexInType(tid, word);
        renderTeach();
      });
    });
    $$("[data-speak]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        speakClick(b, b.getAttribute("data-speak"));
      });
    });
    $$("[data-go]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        setView(b.getAttribute("data-go"));
      });
    });
    var dsBtn = $("#dsMore", host);
    if (dsBtn) {
      dsBtn.addEventListener("click", function () {
        dsBtn.disabled = true;
        dsBtn.textContent = "生成中…";
        deepseekExtra(state.typeId, state.level)
          .then(function (item) {
            var slot = $("#dsSlot", host);
            var art = document.createElement("article");
            art.className = "pr-ex-item";
            art.innerHTML =
              '<div class="pr-ex-visual__body" style="padding:.5rem 0">' +
              '<div class="meta"><span class="tag">DeepSeek</span>' +
              '<button type="button" class="pr-tts" data-speak="' +
              esc(item.en) +
              '">语音先行</button></div>' +
              revealHtml(item.en, item.zh) +
              (item.tip ? '<p class="tip">' + esc(item.tip) + "</p>" : "") +
              "</div>";
            slot.appendChild(art);
            bindReveals(art);
            $$("[data-speak]", art).forEach(function (bb) {
              bb.addEventListener("click", function () {
                speakClick(bb, bb.getAttribute("data-speak"));
              });
            });
          })
          .catch(function () {
            alert("DeepSeek 暂时不可用，请稍后再试。");
          })
          .finally(function () {
            dsBtn.disabled = false;
            dsBtn.textContent = "再生成一句";
          });
      });
    }
  }

  function renderImitate() {
    var host = $("#view-imitate");
    var pool = imitatePool();
    if (state.imitateIdx >= pool.length) state.imitateIdx = 0;
    var item = pool[state.imitateIdx] || { en: "", zh: "", focus: "", type: "" };

    host.innerHTML =
      '<div class="pr-view-hd">' +
      '<button type="button" class="ghost" data-go="home">← 目录</button>' +
      "<h2>学生模仿</h2>" +
      '<span class="chip">' +
      esc(levelMeta().label) +
      " · " +
      (state.imitateIdx + 1) +
      "/" +
      pool.length +
      "</span></div>" +
      '<div class="pr-imitate-stage">' +
      (item.image
        ? '<div class="pr-imitate-hero"><img src="' +
          IMG +
          esc(item.image) +
          '" alt="" /></div>'
        : "") +
      "</div>" +
      '<div class="pr-audio-first">' +
      '<button type="button" class="big-play" id="imPlay" aria-label="播放">▶</button>' +
      '<p class="hint">先听完整句子，再揭开文字跟读</p>' +
      '<div class="pr-focus-pill">焦点 · ' +
      esc(item.focus || item.type || "") +
      "</div></div>" +
      '<div id="imReveal" style="opacity:.35;pointer-events:none;margin-top:.85rem">' +
      revealHtml(item.en, item.zh) +
      "</div>" +
      '<div class="pr-actions" style="justify-content:center;margin-top:1rem">' +
      '<button type="button" class="pr-btn ghost" id="imPrev">上一句</button>' +
      '<button type="button" class="pr-btn" id="imAgain">再听一遍</button>' +
      '<button type="button" class="pr-btn amber" id="imNext">下一句</button>' +
      "</div>";

    bindReveals(host);
    function unlock() {
      var box = $("#imReveal", host);
      box.style.opacity = "1";
      box.style.pointerEvents = "auto";
    }
    function play() {
      azureSpeak(item.en).then(unlock);
    }
    $("#imPlay", host).addEventListener("click", play);
    $("#imAgain", host).addEventListener("click", play);
    $("#imPrev", host).addEventListener("click", function () {
      state.imitateIdx = (state.imitateIdx - 1 + pool.length) % pool.length;
      renderImitate();
    });
    $("#imNext", host).addEventListener("click", function () {
      state.imitateIdx = (state.imitateIdx + 1) % pool.length;
      renderImitate();
    });
    $$("[data-go]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        setView(b.getAttribute("data-go"));
      });
    });
  }

  function renderQuizCard(host, pool, idxKey, scoreKey, answeredKey, title, race) {
    if (state[idxKey] >= pool.length) state[idxKey] = 0;
    var q = pool[state[idxKey]];
    if (!q) {
      host.innerHTML = '<div class="pr-panel"><p>暂无题目</p></div>';
      return;
    }
    var opts = (q.options || [])
      .map(function (o, i) {
        return (
          '<button type="button" class="pr-opt" data-i="' +
          i +
          '">' +
          esc(String.fromCharCode(65 + i)) +
          ". " +
          esc(o) +
          "</button>"
        );
      })
      .join("");

    var kindLabel = { blank: "语境填空", dialogue: "对话补全", choose: "选正确句", confuse: "易混辨析" }[q.kind] || "选择题";
    host.innerHTML =
      '<div class="pr-view-hd">' +
      '<button type="button" class="ghost" data-go="home">← 目录</button>' +
      "<h2>" +
      esc(title) +
      "</h2>" +
      '<span class="chip">' +
      esc(levelMeta().label) +
      (race ? " · 题库 " + quizBank().length + " · 本组 8" : "") +
      "</span></div>" +
      (race
        ? '<div class="pr-race-banner"><img src="' +
          IMG +
          esc(DATA.meta.raceImg) +
          '" alt="" /><div><strong>限时竞赛</strong><p class="pr-section__lead" style="margin:0">从本年级题库随机 8 题</p><div class="pr-timer" id="raceClock">--</div></div></div>'
        : "") +
      '<section class="pr-panel">' +
      '<div class="pr-quiz-hd"><span class="pr-score">得分 ' +
      state[scoreKey] +
      " / " +
      pool.length +
      '</span><span class="pr-kind-chip">' +
      esc(kindLabel) +
      "</span><span>" +
      (state[idxKey] + 1) +
      " / " +
      pool.length +
      "</span></div>" +
      (q.image
        ? '<figure class="pr-quiz-fig"><img src="' +
          IMG +
          esc(q.image) +
          '" alt="' +
          esc(q.zh || "") +
          '" /></figure>'
        : "") +
      '<p class="pr-q" lang="en">' +
      esc(q.q) +
      "</p>" +
      '<div class="pr-opts">' +
      opts +
      "</div>" +
      '<div class="pr-explain" id="explain">' +
      esc(q.explain || "") +
      (q.zh ? '<span class="pr-quiz-zh">' + esc(q.zh) + "</span>" : "") +
      "</div>" +
      '<div class="pr-actions">' +
      (race
        ? '<button type="button" class="pr-btn amber" id="startRace">开始 60 秒</button>' +
          '<button type="button" class="pr-btn ghost" id="reshuffle">换一组</button>'
        : "") +
      '<button type="button" class="pr-btn ghost" id="qPrev">上一题</button>' +
      '<button type="button" class="pr-btn" id="qNext">下一题</button>' +
      '<button type="button" class="pr-tts" data-speak="' +
      esc(q.q.replace(/_+/g, "blank")) +
      '">听题</button>' +
      "</div></section>";

    state[answeredKey] = false;
    $$(".pr-opt", host).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (state[answeredKey]) return;
        state[answeredKey] = true;
        var i = +btn.getAttribute("data-i");
        var ok = i === q.answer;
        if (ok) state[scoreKey] += 1;
        $$(".pr-opt", host).forEach(function (b, j) {
          b.disabled = true;
          if (j === q.answer) b.classList.add("ok");
          if (j === i && !ok) b.classList.add("bad");
        });
        var ex = $("#explain", host);
        if (ex) ex.classList.add("on");
        $(".pr-score", host).textContent =
          "得分 " + state[scoreKey] + " / " + pool.length;
      });
    });
    $("#qPrev", host).addEventListener("click", function () {
      state[idxKey] = (state[idxKey] - 1 + pool.length) % pool.length;
      renderPracticeOrComp(race);
    });
    $("#qNext", host).addEventListener("click", function () {
      state[idxKey] = (state[idxKey] + 1) % pool.length;
      renderPracticeOrComp(race);
    });
    $$("[data-speak]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        speakClick(b, b.getAttribute("data-speak"));
      });
    });
    $$("[data-go]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        setView(b.getAttribute("data-go"));
      });
    });
    var reshuffle = $("#reshuffle", host);
    if (reshuffle) {
      reshuffle.addEventListener("click", function () {
        if (state.raceTimer) {
          clearInterval(state.raceTimer);
          state.raceTimer = null;
        }
        state.raceMode = false;
        ensureQuizRound(true);
        renderPractice();
      });
    }
    var start = $("#startRace", host);
    if (start) {
      start.addEventListener("click", function () {
        if (state.raceTimer) clearInterval(state.raceTimer);
        ensureQuizRound(true);
        state.raceLeft = 60;
        state.quizScore = 0;
        state.quizIdx = 0;
        state.raceMode = true;
        state.raceTimer = setInterval(function () {
          state.raceLeft -= 1;
          var clock = document.getElementById("raceClock");
          if (clock) clock.textContent = Math.max(0, state.raceLeft) + "s";
          if (state.raceLeft <= 0) {
            clearInterval(state.raceTimer);
            state.raceTimer = null;
            state.raceMode = false;
            alert("时间到！得分 " + state.quizScore + " / " + QUIZ_ROUND_SIZE);
          }
        }, 1000);
        renderPractice();
      });
    }
    if (race && state.raceMode) {
      var clockEl = $("#raceClock", host);
      if (clockEl) clockEl.textContent = Math.max(0, state.raceLeft) + "s";
    }
  }

  function renderPracticeOrComp(isRace) {
    if (isRace) renderPractice();
    else renderComp();
  }

  function renderPractice() {
    renderQuizCard(
      $("#view-practice"),
      quizPool(),
      "quizIdx",
      "quizScore",
      "quizAnswered",
      "练习 · 竞赛",
      true
    );
  }

  function renderComp() {
    renderQuizCard(
      $("#view-comp"),
      compPool(),
      "compIdx",
      "compScore",
      "compAnswered",
      "综合练习",
      false
    );
  }

  function renderTable() {
    var host = $("#view-table");
    var T = DATA.table;
    var head =
      "<tr>" +
      T.headers
        .map(function (h, hi) {
          if (hi === 0) return "<th>" + esc(h) + "</th>";
            return (
            '<th class="pr-th-hideable pr-hideable" data-col="' +
            hi +
            '" title="点击显示/隐藏本列标题">' +
            '<span class="pr-cell-mask">···</span>' +
            '<span class="pr-cell-val" hidden>' +
            esc(h) +
            "</span></th>"
          );
        })
        .join("") +
      "</tr>";
    var body = T.rows
      .map(function (row, ri) {
        return (
          "<tr>" +
          row
            .map(function (cell, i) {
              var speak = cell.replace(/（[^）]*）/g, "").trim();
              if (i === 0) {
                return (
                  '<td class="pr-row-label pr-hideable" data-row="' +
                  ri +
                  '" title="点击显示/隐藏人称">' +
                  '<span class="pr-cell-mask">···</span>' +
                  '<span class="pr-cell-val" hidden>' +
                  esc(cell) +
                  "</span></td>"
                );
              }
              return (
                '<td class="pr-hideable speak" data-speak="' +
                esc(speak) +
                '" title="点击显示；已显示时再点朗读">' +
                '<span class="pr-cell-mask">?</span>' +
                '<span class="pr-cell-val" lang="en" hidden>' +
                esc(cell) +
                "</span></td>"
              );
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");

    host.innerHTML =
      '<div class="pr-view-hd">' +
      '<button type="button" class="ghost" data-go="home">← 目录</button>' +
      "<h2>五种代词总表</h2>" +
      '<span class="chip">逐格揭开</span></div>' +
      '<section class="pr-section">' +
      '<p class="pr-section__lead">默认隐藏 · 点格子揭开（再点收回）· Shift+点击已显示格朗读</p>' +
      '<div class="pr-actions" style="margin-top:0;margin-bottom:.85rem">' +
      '<button type="button" class="pr-btn amber" id="tblShowAll">全部显示</button>' +
      '<button type="button" class="pr-btn ghost" id="tblHideAll">全部隐藏</button>' +
      '<button type="button" class="pr-btn ghost" id="tblRevealNext">揭开下一格</button>' +
      "</div>" +
      '<div class="pr-table-wrap"><table class="pr-table pr-table-reveal" id="pronounTable"><thead>' +
      head +
      "</thead><tbody>" +
      body +
      "</tbody></table></div>" +
      '<div class="pr-memory pr-hideable is-hidden" id="memBlock" title="点击显示口诀">' +
      '<span class="pr-cell-mask">点击显示口诀</span>' +
      '<span class="pr-cell-val" hidden>口诀：' +
      esc(T.memory) +
      "</span></div>" +
      '<div class="pr-actions"><button type="button" class="pr-tts" id="memSpeak">朗读口诀</button></div>' +
      "</section>";

    function setCellOpen(el, open) {
      if (!el) return;
      var mask = el.querySelector(":scope > .pr-cell-mask") || el.querySelector(".pr-cell-mask");
      var val = el.querySelector(":scope > .pr-cell-val") || el.querySelector(".pr-cell-val");
      if (open) {
        el.classList.add("is-open");
        el.classList.remove("is-hidden");
        if (mask) {
          mask.hidden = true;
          mask.setAttribute("aria-hidden", "true");
        }
        if (val) {
          val.hidden = false;
          val.removeAttribute("aria-hidden");
        }
      } else {
        el.classList.remove("is-open");
        el.classList.add("is-hidden");
        if (mask) {
          mask.hidden = false;
          mask.removeAttribute("aria-hidden");
        }
        if (val) {
          val.hidden = true;
          val.setAttribute("aria-hidden", "true");
        }
      }
    }

    function allCells() {
      return $$(".pr-hideable", host);
    }

    function setAll(open) {
      allCells().forEach(function (el) {
        setCellOpen(el, open);
      });
    }

    allCells().forEach(function (el) {
      setCellOpen(el, false);
      el.addEventListener("click", function (ev) {
        var open = el.classList.contains("is-open");
        if (!open) {
          setCellOpen(el, true);
          if (el.getAttribute("data-speak")) {
            azureSpeak(el.getAttribute("data-speak"));
          }
          return;
        }
        // 已显示：再点收回；Shift+点击只朗读
        if (el.getAttribute("data-speak") && ev && ev.shiftKey) {
          azureSpeak(el.getAttribute("data-speak"));
          return;
        }
        setCellOpen(el, false);
      });
    });

    $("#tblShowAll", host).addEventListener("click", function () {
      setAll(true);
    });
    $("#tblHideAll", host).addEventListener("click", function () {
      setAll(false);
    });
    $("#tblRevealNext", host).addEventListener("click", function () {
      var next = allCells().find(function (el) {
        return !el.classList.contains("is-open");
      });
      if (next) {
        setCellOpen(next, true);
        if (next.getAttribute("data-speak")) azureSpeak(next.getAttribute("data-speak"));
      }
    });

    $("#memSpeak", host).addEventListener("click", function () {
      setCellOpen($("#memBlock", host), true);
      speakClick(
        this,
        "Subject for subject. Object after verb. Possessive adjective before noun. Possessive pronoun stands alone. Reflexive returns to the subject."
      );
    });
    $$("[data-go]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        setView(b.getAttribute("data-go"));
      });
    });
  }

  function boot() {
    if (!DATA) {
      document.body.innerHTML = "<p style='padding:2rem'>缺少 pronouns-data.js</p>";
      return;
    }
    $$(".pr-footer-nav button").forEach(function (b) {
      b.addEventListener("click", function () {
        setView(b.getAttribute("data-go"));
      });
    });
    setView("home");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof window !== "undefined" ? window : this);
