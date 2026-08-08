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
    quizIdx: 0,
    quizScore: 0,
    quizAnswered: false,
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
  function examplesFor(typeId) {
    var block = (DATA.examples && DATA.examples[typeId]) || {};
    return block[state.level] || block.g7 || [];
  }
  function quizPool() {
    return (DATA.quiz && DATA.quiz[state.level]) || DATA.quiz.g7 || [];
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
    var region = String(global.__AZURE_SPEECH_REGION__ || "eastasia").trim();
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
      .map(function (f) {
        return (
          '<button type="button" class="pr-form-pill" data-speak="' +
          esc(f.form) +
          '">' +
          esc(f.form) +
          " · " +
          esc(f.zh) +
          "</button>"
        );
      })
      .join("");

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
      '<div class="pr-forms">' +
      forms +
      "</div>" +
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

    host.innerHTML =
      '<div class="pr-view-hd">' +
      '<button type="button" class="ghost" data-go="home">← 目录</button>' +
      "<h2>" +
      esc(title) +
      "</h2>" +
      '<span class="chip">' +
      esc(levelMeta().label) +
      "</span></div>" +
      (race
        ? '<div class="pr-race-banner"><img src="' +
          IMG +
          esc(DATA.meta.raceImg) +
          '" alt="" /><div><strong>限时竞赛</strong><div class="pr-timer" id="raceClock">--</div></div></div>'
        : "") +
      '<section class="pr-panel">' +
      '<div class="pr-quiz-hd"><span class="pr-score">得分 ' +
      state[scoreKey] +
      " / " +
      pool.length +
      '</span><span>' +
      (state[idxKey] + 1) +
      " / " +
      pool.length +
      "</span></div>" +
      '<p class="pr-q" lang="en">' +
      esc(q.q) +
      "</p>" +
      '<div class="pr-opts">' +
      opts +
      "</div>" +
      '<div class="pr-explain" id="explain">' +
      esc(q.explain || "") +
      "</div>" +
      '<div class="pr-actions">' +
      (race
        ? '<button type="button" class="pr-btn amber" id="startRace">开始 60 秒</button>'
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
    var start = $("#startRace", host);
    if (start) {
      start.addEventListener("click", function () {
        if (state.raceTimer) clearInterval(state.raceTimer);
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
            alert("时间到！得分 " + state.quizScore + " / " + quizPool().length);
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
      var mask = el.querySelector(".pr-cell-mask");
      var val = el.querySelector(".pr-cell-val");
      if (open) {
        el.classList.add("is-open");
        el.classList.remove("is-hidden");
        if (mask) mask.hidden = true;
        if (val) val.hidden = false;
      } else {
        el.classList.remove("is-open");
        el.classList.add("is-hidden");
        if (mask) mask.hidden = false;
        if (val) val.hidden = true;
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
