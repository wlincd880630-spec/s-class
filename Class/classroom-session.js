/**
 * S-Class 课堂纪要：Azure 持续听写 + 学生姓名强关联纠错 + DeepSeek 课后总结
 *
 * 核心策略：
 * 1) PhraseListGrammar 把 15 个标准姓名注入识别器（提升召回）
 * 2) 转写落盘前用别名/拼音近似表强制替换成标准汉字
 * 3) 课后把纠名后的稿 + 课堂事件交给 DeepSeek，要求评价里只用标准姓名
 */
(function (global) {
  "use strict";

  var AZURE = {
    key: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
    region: "southeastasia"
  };

  var DEEPSEEK = {
    key: "sk-daa16008e81843deba6fefe9dce51465",
    url: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-v4-flash"
  };

  var SESSION_STORE = "sclass-class-session-v1";
  var RESTART_MS = 4 * 60 * 1000; // Azure 浏览器会话定期重连，撑满两小时课

  /** 标准姓名 → 常见误听/误写（含生僻字）；可由 configure() 按班级覆盖 */
  var NAME_ALIASES = {};
  var ALIAS_PAIRS = [];

  var CN_NUM = {
    "零": 0, "一": 1, "二": 2, "两": 2, "三": 3, "四": 4,
    "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10
  };

  var state = {
    running: false,
    startedAt: null,
    segments: [],   // {t, text, raw, names[], commands[]}
    events: [],     // {t, type, student, detail}
    interim: "",
    interimCommands: [],
    recognizer: null,
    restartTimer: null,
    onUpdate: null,
    onVoiceCommand: null,
    roster: []
  };

  function rebuildAliasPairs() {
    var pairs = [];
    Object.keys(NAME_ALIASES).forEach(function (canon) {
      pairs.push({ from: canon, to: canon });
      (NAME_ALIASES[canon] || []).forEach(function (alias) {
        if (alias && alias !== canon) pairs.push({ from: alias, to: canon });
      });
    });
    pairs.sort(function (a, b) { return b.from.length - a.from.length; });
    ALIAS_PAIRS = pairs;
  }

  /** 配置当前班级花名册 / 别名 / 存储键 / 语音口令回调 */
  function configure(options) {
    options = options || {};
    if (options.roster && options.roster.length) {
      state.roster = options.roster.slice();
    }
    if (options.aliases && typeof options.aliases === "object") {
      NAME_ALIASES = options.aliases;
      // 确保花名册姓名也在别名表里
      state.roster.forEach(function (n) {
        if (!NAME_ALIASES[n]) NAME_ALIASES[n] = [];
      });
      rebuildAliasPairs();
    }
    if (options.sessionKey) SESSION_STORE = options.sessionKey;
    if (typeof options.onUpdate === "function") state.onUpdate = options.onUpdate;
    if (typeof options.onVoiceCommand === "function") state.onVoiceCommand = options.onVoiceCommand;
    loadPersisted();
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function elapsedLabel() {
    if (!state.startedAt) return "00:00:00";
    var ms = Date.now() - state.startedAt;
    var s = Math.floor(ms / 1000);
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    return [h, m, sec].map(function (n) { return String(n).padStart(2, "0"); }).join(":");
  }

  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /** 最长别名优先替换，保证输出标准姓名汉字 */
  function buildAliasRegex() {
    return ALIAS_PAIRS;
  }

  // kept for compatibility — pairs rebuilt in configure()
  rebuildAliasPairs();

  function levenshtein(a, b) {
    a = String(a); b = String(b);
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var dp = new Array(n + 1);
    for (var j = 0; j <= n; j++) dp[j] = j;
    for (var i = 1; i <= m; i++) {
      var prev = dp[0];
      dp[0] = i;
      for (var k = 1; k <= n; k++) {
        var tmp = dp[k];
        var cost = a.charAt(i - 1) === b.charAt(k - 1) ? 0 : 1;
        dp[k] = Math.min(dp[k] + 1, dp[k - 1] + 1, prev + cost);
        prev = tmp;
      }
    }
    return dp[n];
  }

  function findNamesInText(text) {
    var found = [];
    state.roster.forEach(function (name) {
      if (text.indexOf(name) !== -1) found.push(name);
    });
    return found;
  }

  /**
   * 强纠名：别名表 → 滑动窗口近似匹配标准姓名
   * 返回 { text, names, fixes:[{from,to}] }
   */
  function correctNames(raw) {
    var text = String(raw || "");
    var fixes = [];

    ALIAS_PAIRS.forEach(function (p) {
      if (text.indexOf(p.from) === -1) return;
      var re = new RegExp(escapeRegExp(p.from), "g");
      if (p.from !== p.to) {
        var before = text;
        text = text.replace(re, p.to);
        if (before !== text) fixes.push({ from: p.from, to: p.to });
      }
    });

    // 对 2–4 字窗口做编辑距离纠名（抓「邓斯如」这类漏网）
    var chars = text.split("");
    var replaced = chars.slice();
    var used = {};
    for (var len = 4; len >= 2; len--) {
      for (var i = 0; i <= replaced.length - len; i++) {
        var slice = replaced.slice(i, i + len).join("");
        if (/[，。！？、,.!?\s]/.test(slice)) continue;
        var best = null;
        var bestDist = 99;
        state.roster.forEach(function (name) {
          if (name.length !== len) return;
          var d = levenshtein(slice, name);
          var allow = len <= 2 ? 0 : 1;
          if (d <= allow && d < bestDist) {
            bestDist = d;
            best = name;
          }
        });
        if (best && best !== slice && !used[i]) {
          for (var k = 0; k < len; k++) replaced[i + k] = best.charAt(k);
          used[i] = true;
          fixes.push({ from: slice, to: best });
          i += len - 1;
        }
      }
    }
    text = replaced.join("");

    return {
      text: text,
      names: findNamesInText(text),
      fixes: fixes
    };
  }

  function persist() {
    try {
      localStorage.setItem(SESSION_STORE, JSON.stringify({
        running: state.running,
        startedAt: state.startedAt,
        segments: state.segments,
        events: state.events
      }));
    } catch (e) {}
  }

  function loadPersisted() {
    try {
      var raw = localStorage.getItem(SESSION_STORE);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (!data) return;
      state.startedAt = data.startedAt || null;
      state.segments = Array.isArray(data.segments) ? data.segments : [];
      state.events = Array.isArray(data.events) ? data.events : [];
      // 不自动恢复 running（需重新授权麦克风）
      state.running = false;
    } catch (e) {}
  }

  function notify() {
    persist();
    if (typeof state.onUpdate === "function") {
      state.onUpdate(getSnapshot());
    }
  }

  function getSnapshot() {
    return {
      running: state.running,
      startedAt: state.startedAt,
      elapsed: elapsedLabel(),
      interim: state.interim,
      interimCommands: state.interimCommands || [],
      segments: state.segments.slice(),
      events: state.events.slice(),
      fullText: state.segments.map(function (s) { return s.text; }).join(""),
      nameHits: tallyNames()
    };
  }

  function tallyNames() {
    var map = {};
    state.roster.forEach(function (n) { map[n] = 0; });
    state.segments.forEach(function (seg) {
      (seg.names || []).forEach(function (n) {
        if (map[n] != null) map[n] += 1;
      });
    });
    state.events.forEach(function (ev) {
      if (ev.student && map[ev.student] != null) map[ev.student] += 1;
    });
    return map;
  }

  function parseNumToken(tok) {
    if (!tok) return 1;
    tok = String(tok).replace(/[０-９]/g, function (d) {
      return String.fromCharCode(d.charCodeAt(0) - 65248);
    });
    if (/^\d+$/.test(tok)) return Math.max(1, Math.min(20, parseInt(tok, 10)));
    if (CN_NUM[tok] != null) return Math.max(1, CN_NUM[tok] || 1);
    return 1;
  }

  /** 压平语音转写，去掉空格/标点，统一全角数字与加减号 */
  function normalizeSpeechText(text) {
    return String(text || "")
      .replace(/[０-９]/g, function (d) {
        return String.fromCharCode(d.charCodeAt(0) - 65248);
      })
      .replace(/[＋﹢]/g, "+")
      .replace(/[－﹣—–]/g, "-")
      .replace(/[\s\u00A0\u3000]+/g, "")
      .replace(/[，,。！？!?、；;：:\.·•…~～"'“”‘’（）()【】\[\]<>《》]/g, "");
  }

  /**
   * 从已纠名文本中解析语音口令：
   * 「刁维凡加一分」「给张弛加五分」「漆岢鑫减一分」「侯婉鑫小锤子」「罗逸花束」
   */
  function parseVoiceCommands(text) {
    var src = normalizeSpeechText(correctNames(String(text || "")).text);
    var cmds = [];
    if (!src || !state.roster.length) return cmds;

    var names = state.roster.slice().sort(function (a, b) { return b.length - a.length; });
    var nameAlt = names.map(escapeRegExp).join("|");
    if (!nameAlt) return cmds;

    function pushCmd(student, action, delta, raw) {
      cmds.push({
        student: student,
        action: action, // points | whip | bouquet
        delta: delta || 0,
        raw: raw
      });
    }

    var m;
    var num = "([一二两三四五六七八九十\\d]+)";

    // NAME加N分 / 给NAME加N分 / NAME加上N分 / NAME+N分
    var reAdd = new RegExp(
      "(?:给)?(" + nameAlt + ")(?:同学)?(?:加|加上|奖励|\\+)\\s*" + num + "分?",
      "g"
    );
    while ((m = reAdd.exec(src))) {
      pushCmd(m[1], "points", parseNumToken(m[2]), m[0]);
    }

    // 加N分给NAME
    var reAddRev = new RegExp(
      "(?:加|加上|奖励|\\+)\\s*" + num + "分?(?:给|到)(" + nameAlt + ")(?:同学)?",
      "g"
    );
    while ((m = reAddRev.exec(src))) {
      pushCmd(m[2], "points", parseNumToken(m[1]), m[0]);
    }

    // NAME加分（默认 +1）；避免与「加一分」重复
    var reAddPlain = new RegExp("(?:给)?(" + nameAlt + ")(?:同学)?加分", "g");
    while ((m = reAddPlain.exec(src))) {
      var already = cmds.some(function (c) {
        return c.student === m[1] && c.action === "points" && c.delta > 0;
      });
      if (!already) pushCmd(m[1], "points", 1, m[0]);
    }

    // NAME减/扣 N 分
    var reSub = new RegExp(
      "(?:给)?(" + nameAlt + ")(?:同学)?(?:减|扣|-)\\s*" + num + "分?",
      "g"
    );
    while ((m = reSub.exec(src))) {
      pushCmd(m[1], "points", -parseNumToken(m[2]), m[0]);
    }
    var reSubPlain = new RegExp("(" + nameAlt + ")(?:同学)?(?:扣分|减分)", "g");
    while ((m = reSubPlain.exec(src))) {
      var alreadySub = cmds.some(function (c) {
        return c.student === m[1] && c.action === "points" && c.delta < 0;
      });
      if (!alreadySub) pushCmd(m[1], "points", -1, m[0]);
    }

    // 小锤子 / 花束
    var reWhip = new RegExp("(" + nameAlt + ")(?:同学)?(?:的)?(?:小)?(?:锤子|鞭子|惩罚)", "g");
    while ((m = reWhip.exec(src))) pushCmd(m[1], "whip", 0, m[0]);
    var reWhip2 = new RegExp("(?:小)?(?:锤子|鞭子)(" + nameAlt + ")", "g");
    while ((m = reWhip2.exec(src))) pushCmd(m[1], "whip", 0, m[0]);

    var reFlower = new RegExp("(" + nameAlt + ")(?:同学)?(?:的)?(?:花束|送花|小红花|表扬|红花)", "g");
    while ((m = reFlower.exec(src))) pushCmd(m[1], "bouquet", 0, m[0]);
    var reFlower2 = new RegExp("(?:花束|送花|小红花|红花)(?:给)?(" + nameAlt + ")", "g");
    while ((m = reFlower2.exec(src))) pushCmd(m[1], "bouquet", 0, m[0]);

    // 去重
    var seen = {};
    return cmds.filter(function (c) {
      var k = c.student + "|" + c.action + "|" + c.delta;
      if (seen[k]) return false;
      seen[k] = true;
      return true;
    });
  }

  var recentCmdKeys = {};
  function emitVoiceCommands(commands) {
    if (!commands || !commands.length) return;
    var now = Date.now();
    commands.forEach(function (cmd) {
      var k = cmd.student + "|" + cmd.action + "|" + cmd.delta;
      if (recentCmdKeys[k] && now - recentCmdKeys[k] < 2500) return; // 防抖：2.5 秒内同口令不重复执行
      recentCmdKeys[k] = now;
      logEvent("语音口令", cmd.student, cmd.raw + (cmd.action === "points" ? (" → " + (cmd.delta > 0 ? "+" : "") + cmd.delta) : ""));
      if (typeof state.onVoiceCommand === "function") {
        try { state.onVoiceCommand(cmd); } catch (e) { console.warn(e); }
      }
    });
  }

  function pushSegment(rawText) {
    var corrected = correctNames(rawText);
    if (!corrected.text.trim()) return;
    var commands = parseVoiceCommands(corrected.text);
    state.segments.push({
      t: nowIso(),
      raw: rawText,
      text: corrected.text,
      names: corrected.names,
      fixes: corrected.fixes,
      commands: commands
    });
    state.interim = "";
    notify();
    emitVoiceCommands(commands);
  }

  function logEvent(type, student, detail) {
    var canon = student ? correctNames(student).text : "";
    // 若纠名后仍不在花名册，尝试精确命中
    if (student && state.roster.indexOf(canon) === -1) {
      var hit = state.roster.find(function (n) { return student.indexOf(n) !== -1 || n.indexOf(student) !== -1; });
      canon = hit || student;
    }
    state.events.push({
      t: nowIso(),
      type: type,
      student: canon || "",
      detail: detail || ""
    });
    notify();
  }

  function stopRecognizerOnly() {
    clearTimeout(state.restartTimer);
    state.restartTimer = null;
    try {
      if (state.recognizer) {
        state.recognizer.stopContinuousRecognitionAsync(
          function () {
            try { state.recognizer.close(); } catch (e) {}
            state.recognizer = null;
          },
          function () {
            try { state.recognizer.close(); } catch (e) {}
            state.recognizer = null;
          }
        );
      }
    } catch (e) {
      state.recognizer = null;
    }
  }

  function attachPhraseList(recognizer) {
    try {
      if (!global.SpeechSDK || !SpeechSDK.PhraseListGrammar) return;
      var phraseList = SpeechSDK.PhraseListGrammar.fromRecognizer(recognizer);
      state.roster.forEach(function (name) {
        phraseList.addPhrase(name);
        (NAME_ALIASES[name] || []).slice(0, 4).forEach(function (alias) {
          phraseList.addPhrase(alias);
        });
      });
      // 课堂常用触发语，帮助抓点评句
      [
        "请", "回答", "很好", "注意", "加分", "扣分", "小锤子", "花束",
        "表扬", "批评", "举手", "安静", "分组", "今天", "知识点",
        "加一分", "加两分", "加五分", "减一分", "扣一分", "送花", "小红花"
      ].forEach(function (p) { phraseList.addPhrase(p); });
      // 完整口令例句（提升「姓名+加分」连读召回）
      state.roster.forEach(function (name) {
        ["加一分", "加两分", "加五分", "减一分", "扣一分", "加分", "小锤子", "花束"].forEach(function (tail) {
          phraseList.addPhrase(name + tail);
        });
      });
    } catch (e) {
      console.warn("PhraseListGrammar failed", e);
    }
  }

  function startRecognizer() {
    return new Promise(function (resolve, reject) {
      if (typeof SpeechSDK === "undefined") {
        reject(new Error("Azure Speech SDK 未加载"));
        return;
      }
      try {
        var cfg = SpeechSDK.SpeechConfig.fromSubscription(AZURE.key, AZURE.region);
        cfg.speechRecognitionLanguage = "zh-CN";
        // 略提高中间结果频率，方便 UI 显示
        try {
          cfg.setProperty(
            SpeechSDK.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs,
            "5000"
          );
        } catch (e0) {}
        // 缩短句末静音，口令「加一分」更快出最终结果
        try {
          cfg.setProperty("Speech_SegmentationSilenceTimeoutMs", "400");
        } catch (e1) {}
        try {
          cfg.setProperty(
            SpeechSDK.PropertyId.Speech_SegmentationSilenceTimeoutMs,
            "400"
          );
        } catch (e2) {}

        var audio = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recognizer = new SpeechSDK.SpeechRecognizer(cfg, audio);
        attachPhraseList(recognizer);

        recognizer.recognizing = function (_s, e) {
          if (!state.running) return;
          if (e.result && e.result.text) {
            var mid = correctNames(e.result.text);
            state.interim = mid.text;
            state.interimCommands = parseVoiceCommands(mid.text);
            notify();
          }
        };

        recognizer.recognized = function (_s, e) {
          if (!state.running) return;
          if (e.result && e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech && e.result.text) {
            pushSegment(e.result.text);
          }
        };

        recognizer.canceled = function (_s, e) {
          console.warn("recognition canceled", e);
          if (state.running) {
            // 网络抖动时尝试重启
            scheduleRestart(800);
          }
        };

        recognizer.sessionStopped = function () {
          if (state.running) scheduleRestart(500);
        };

        recognizer.startContinuousRecognitionAsync(
          function () {
            state.recognizer = recognizer;
            scheduleRestart(RESTART_MS);
            resolve();
          },
          function (err) {
            try { recognizer.close(); } catch (e) {}
            reject(err || new Error("无法启动麦克风听写"));
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  function scheduleRestart(ms) {
    clearTimeout(state.restartTimer);
    state.restartTimer = setTimeout(function () {
      if (!state.running) return;
      stopRecognizerOnly();
      startRecognizer().catch(function (err) {
        console.warn("restart failed", err);
        scheduleRestart(3000);
      });
    }, ms);
  }

  function start(options) {
    options = options || {};
    if (options.roster || options.aliases || options.sessionKey || options.onVoiceCommand || options.onUpdate) {
      configure(options);
    }
    if (typeof options.onUpdate === "function") state.onUpdate = options.onUpdate;
    if (typeof options.onVoiceCommand === "function") state.onVoiceCommand = options.onVoiceCommand;

    if (state.running) return Promise.resolve(getSnapshot());

    state.running = true;
    if (!state.startedAt) state.startedAt = Date.now();
    notify();

    return startRecognizer().then(function () {
      logEvent("session", "", "开始上课听写");
      return getSnapshot();
    }).catch(function (err) {
      state.running = false;
      notify();
      throw err;
    });
  }

  function stop() {
    state.running = false;
    state.interim = "";
    stopRecognizerOnly();
    logEvent("session", "", "结束上课听写");
    notify();
    return getSnapshot();
  }

  function clearSession() {
    stopRecognizerOnly();
    state.running = false;
    state.startedAt = null;
    state.segments = [];
    state.events = [];
    state.interim = "";
    try { localStorage.removeItem(SESSION_STORE); } catch (e) {}
    notify();
  }

  function buildPrompt(studentStats) {
    var roster = state.roster.join("、");
    var transcript = state.segments.map(function (s, i) {
      return "[" + (i + 1) + "] " + s.text;
    }).join("\n");
    if (transcript.length > 28000) {
      transcript = transcript.slice(0, 14000) + "\n…(中间省略)…\n" + transcript.slice(-14000);
    }
    var events = state.events.map(function (e) {
      return "- " + e.t + " | " + e.type + (e.student ? " | " + e.student : "") + (e.detail ? " | " + e.detail : "");
    }).join("\n");

    var statsLines = (studentStats || []).map(function (s) {
      return s.name + "：积分" + s.points + "，小锤子" + (s.whips || 0) + "次，小红花" + (s.flowers || 0) + "次";
    }).join("\n");

    return [
      "你是英语老师的课后助教。请根据「课堂转写（姓名已纠错）」和「课堂事件」写一份中文课后纪要。",
      "",
      "【硬性要求：姓名】",
      "1. 花名册标准姓名（只能用这些汉字，禁止改写、谐音、拼音）：" + roster,
      "2. 提到学生时必须用标准姓名全文，不得简称、错字、同音替换。",
      "3. 若转写里某处姓名仍可疑，以花名册为准对齐。",
      "",
      "【输出结构，用 Markdown】",
      "## 今日课堂流程",
      "（按时间概述导入/讲解/操练/检测等）",
      "",
      "## 知识点与内容",
      "（列出本课知识要点 3–8 条）",
      "",
      "## 教师即时点评摘录",
      "（从转写中抓取老师对具体学生的临时评价，每条带上标准姓名）",
      "",
      "## 每位学生课堂表现",
      "为花名册每一位各写一段（3–6 句）：参与度、对错/奖惩、口头点评、下节建议。若该生几乎未被点到，如实写「本节提及较少」，仍要给简短建议。",
      "",
      "## 下节课建议",
      "",
      "【课堂工具数据】",
      statsLines || "（无）",
      "",
      "【课堂事件】",
      events || "（无）",
      "",
      "【课堂转写】",
      transcript || "（无转写，仅根据事件与积分撰写）"
    ].join("\n");
  }

  function generateReport(studentStats) {
    var prompt = buildPrompt(studentStats);
    return fetch(DEEPSEEK.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + DEEPSEEK.key
      },
      body: JSON.stringify({
        model: DEEPSEEK.model,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "你严格遵守花名册标准汉字姓名，绝不输出错别字姓名。用简洁专业的中文写课后纪要。"
          },
          { role: "user", content: prompt }
        ]
      })
    }).then(function (res) {
      if (!res.ok) throw new Error("DeepSeek HTTP " + res.status);
      return res.json();
    }).then(function (data) {
      var text =
        (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
        "";
      // 再过一遍纠名，防止模型偶尔写错
      var fixed = correctNames(text);
      return {
        markdown: fixed.text,
        nameHits: tallyNames(),
        generatedAt: nowIso(),
        elapsed: elapsedLabel(),
        segmentCount: state.segments.length,
        eventCount: state.events.length
      };
    });
  }

  // 自测纠名（控制台可调 ClassSession.selfTestNames()）
  function selfTestNames() {
    var samples = state.roster.slice(0, 3).map(function (n) { return n + "加一分"; });
    if (!samples.length) {
      samples = ["调微凡加一分", "漆可鑫减一分", "张驰加五分"];
    }
    return samples.map(function (s) {
      var r = correctNames(s);
      return { raw: s, text: r.text, names: r.names, fixes: r.fixes, commands: parseVoiceCommands(r.text) };
    });
  }

  // 默认不自动 load；等页面 configure 后再 load
  // loadPersisted();

  global.ClassSession = {
    configure: configure,
    start: start,
    stop: stop,
    clear: clearSession,
    logEvent: logEvent,
    correctNames: correctNames,
    parseVoiceCommands: parseVoiceCommands,
    generateReport: generateReport,
    getSnapshot: getSnapshot,
    selfTestNames: selfTestNames,
    roster: function () { return state.roster.slice(); },
    setOnUpdate: function (fn) { state.onUpdate = fn; },
    setOnVoiceCommand: function (fn) { state.onVoiceCommand = fn; }
  };
})(window);
