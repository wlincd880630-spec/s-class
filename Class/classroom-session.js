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
    key: "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc",
    region: "eastasia"
  };

  var DEEPSEEK = {
    key: "sk-daa16008e81843deba6fefe9dce51465",
    url: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-v4-flash"
  };

  var SESSION_STORE = "sclass-class-session-v1";
  var RESTART_MS = 4 * 60 * 1000; // Azure 浏览器会话定期重连，撑满两小时课

  /** 标准姓名 → 常见误听/误写（含生僻字） */
  var NAME_ALIASES = {
    "邓斯茹": ["邓思茹", "邓斯如", "邓斯儒", "邓司茹", "邓斯乳", "邓丝茹"],
    "朱希曈": ["朱希同", "朱希童", "朱希彤", "朱西曈", "朱希通", "朱希瞳", "朱希铜", "朱习曈", "朱希僮"],
    "雷峻仁": ["雷俊仁", "雷峻人", "雷骏仁", "雷俊人", "雷君仁", "雷浚仁"],
    "王思淼": ["王思渺", "王思秒", "王思妙", "王思淼", "王司淼", "王思淼淼", "王思邈"],
    "严江艺": ["严江意", "严江毅", "严讲艺", "颜江艺", "严将艺", "严江义"],
    "王雅萱": ["王雅宣", "王雅暄", "王雅旋", "王雅瑄", "王亚萱", "王雅喧"],
    "孙悦博": ["孙月博", "孙悦伯", "孙悦波", "孙悦薄", "孙跃博", "孙悦勃"],
    "徐梓媗": ["徐梓萱", "徐梓暄", "徐梓宣", "徐子萱", "徐梓煊", "徐梓璇", "徐梓喧", "徐梓媗"],
    "谢淑媛": ["谢淑园", "谢淑元", "谢淑缘", "谢书媛", "谢淑远", "谢淑媛媛"],
    "李雨馨": ["李雨欣", "李雨心", "李雨鑫", "李玉馨", "李雨辛", "李语馨"],
    "宋芊彤": ["宋千彤", "宋芊同", "宋芊童", "宋纤彤", "宋茜彤", "宋芊佟", "宋千童"],
    "高梓轩": ["高子轩", "高梓宣", "高梓暄", "高梓萱", "高梓轩轩", "高紫轩"],
    "袁梓瑞": ["袁子瑞", "袁梓睿", "袁梓锐", "袁梓蕊", "袁梓瑞瑞", "袁紫瑞"],
    "黎小菲": ["黎小飞", "黎小非", "李小菲", "黎小霏", "黎晓菲", "黎小啡"],
    "谢林翰": ["谢林含", "谢林寒", "谢林韩", "谢临翰", "谢林涵", "谢林汗"]
  };

  var PINYIN = {
    "邓斯茹": "dengsiru",
    "朱希曈": "zhuxitong",
    "雷峻仁": "leijunren",
    "王思淼": "wangsimiao",
    "严江艺": "yanjiangyi",
    "王雅萱": "wangyaxuan",
    "孙悦博": "sunyuebo",
    "徐梓媗": "xuzixuan",
    "谢淑媛": "xieshuyuan",
    "李雨馨": "liyuxin",
    "宋芊彤": "songqiantong",
    "高梓轩": "gaozixuan",
    "袁梓瑞": "yuanzirui",
    "黎小菲": "lixiaofei",
    "谢林翰": "xielinhan"
  };

  var state = {
    running: false,
    startedAt: null,
    segments: [],   // {t, text, raw, names[]}
    events: [],     // {t, type, student, detail}
    interim: "",
    recognizer: null,
    restartTimer: null,
    onUpdate: null,
    roster: Object.keys(NAME_ALIASES)
  };

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
    var pairs = [];
    Object.keys(NAME_ALIASES).forEach(function (canon) {
      pairs.push({ from: canon, to: canon });
      (NAME_ALIASES[canon] || []).forEach(function (alias) {
        if (alias && alias !== canon) pairs.push({ from: alias, to: canon });
      });
    });
    pairs.sort(function (a, b) { return b.from.length - a.from.length; });
    return pairs;
  }

  var ALIAS_PAIRS = buildAliasRegex();

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

  function pushSegment(rawText) {
    var corrected = correctNames(rawText);
    if (!corrected.text.trim()) return;
    state.segments.push({
      t: nowIso(),
      raw: rawText,
      text: corrected.text,
      names: corrected.names,
      fixes: corrected.fixes
    });
    state.interim = "";
    notify();
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
        "表扬", "批评", "举手", "安静", "分组", "今天", "知识点"
      ].forEach(function (p) { phraseList.addPhrase(p); });
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

        var audio = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recognizer = new SpeechSDK.SpeechRecognizer(cfg, audio);
        attachPhraseList(recognizer);

        recognizer.recognizing = function (_s, e) {
          if (!state.running) return;
          if (e.result && e.result.text) {
            var mid = correctNames(e.result.text);
            state.interim = mid.text;
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
    if (options.roster && options.roster.length) {
      state.roster = options.roster.slice();
    }
    if (typeof options.onUpdate === "function") state.onUpdate = options.onUpdate;

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
    var samples = [
      "请邓思茹回答",
      "朱希同你来说",
      "徐梓萱加分",
      "表扬李雨欣",
      "谢林含要注意",
      "宋千彤很好",
      "高子轩举手了"
    ];
    return samples.map(function (s) {
      var r = correctNames(s);
      return { raw: s, text: r.text, names: r.names, fixes: r.fixes };
    });
  }

  loadPersisted();

  global.ClassSession = {
    start: start,
    stop: stop,
    clear: clearSession,
    logEvent: logEvent,
    correctNames: correctNames,
    generateReport: generateReport,
    getSnapshot: getSnapshot,
    selfTestNames: selfTestNames,
    roster: function () { return state.roster.slice(); },
    setOnUpdate: function (fn) { state.onUpdate = fn; }
  };
})(window);
