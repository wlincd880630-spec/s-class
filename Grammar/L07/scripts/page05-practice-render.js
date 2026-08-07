  function pickRandomOral() {
    var pool = allScenePool();
    if (!pool.length) {
      oralPick = null;
      oralRevealed = false;
      return;
    }
    oralPick = pool[Math.floor(Math.random() * pool.length)];
    oralRevealed = false;
  }

  function buildSceneCard(L, sc, si, opts) {
    opts = opts || {};
    var card = document.createElement("article");
    card.className = "scene-card";

    var tag = document.createElement("div");
    tag.className = "scene-card__tag";
    tag.textContent = "场景 " + (si + 1) + " · " + L.listen;
    card.appendChild(tag);

    var wrap = document.createElement("div");
    wrap.className = "scene-img-wrap scene-card__img";
    var img = document.createElement("img");
    img.src = sc.img;
    img.alt = L.listen + " 情景 " + (si + 1);
    img.loading = "lazy";
    wrap.appendChild(img);
    card.appendChild(wrap);

    var sent = sceneSentence(sc);
    var qWrap = document.createElement("div");
    qWrap.className = "warm-q-wrap scene-card__sent" + (opts.revealed ? " is-revealed" : "");
    qWrap.setAttribute("role", "button");
    qWrap.setAttribute("tabindex", "0");
    qWrap.setAttribute("aria-label", "点击显示比较级句子");

    var qEl = document.createElement("p");
    qEl.className = "warm-q";
    qEl.innerHTML = questionWithHighlight(sent, L.listen);
    qWrap.appendChild(qEl);

    if (!opts.revealed) {
      function reveal() {
        qWrap.classList.add("is-revealed");
      }
      qWrap.addEventListener("click", function () {
        if (!qWrap.classList.contains("is-revealed")) reveal();
      });
      qWrap.addEventListener("keydown", function (ev) {
        if (qWrap.classList.contains("is-revealed")) return;
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          reveal();
        }
      });
    }

    card.appendChild(qWrap);

    var row = document.createElement("div");
    row.className = "btn-row scene-card__actions";
    var btnListen = document.createElement("button");
    btnListen.type = "button";
    btnListen.className = "speak";
    btnListen.textContent = "🔊";
    btnListen.setAttribute("aria-label", "朗读句子");
    btnListen.addEventListener("click", function (ev) {
      ev.stopPropagation();
      speakPlainAzure(sent);
    });
    row.appendChild(btnListen);

    if (opts.showSentBtn) {
      var btnSent = document.createElement("button");
      btnSent.type = "button";
      btnSent.className = "primary";
      btnSent.textContent = "拖词造句";
      btnSent.addEventListener("click", function () {
        lessonI = LESSONS.indexOf(L);
        sceneI = si;
        lessonPhase = "sent";
        mode = "lesson";
        render();
      });
      row.appendChild(btnSent);
    }
    card.appendChild(row);
    return card;
  }

  function renderScenePractice(root) {
    var L = LESSONS[lessonI];
    root.className = "panel panel--scenes";

    var h = document.createElement("h2");
    h.textContent = "十五练 " + (lessonI + 1) + "/15 · " + L.listen;
    root.appendChild(h);

    var guide = document.createElement("p");
    guide.className = "scene-guide";
    guide.textContent =
      "每个形容词配有 2 张卡通 3D 左右对比情景图。先看图 → 点击遮罩显示比较级句子 → 听朗读 → 可进入拖词造句。";
    root.appendChild(guide);

    var adjBar = document.createElement("div");
    adjBar.className = "lab-adj-bar";
    var sel = document.createElement("select");
    sel.setAttribute("aria-label", "选择形容词");
    LESSONS.forEach(function (item, i) {
      var opt = document.createElement("option");
      opt.value = String(i);
      opt.textContent = i + 1 + "/15 · " + item.listen;
      if (i === lessonI) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", function () {
      var v = parseInt(sel.value, 10);
      if (Number.isNaN(v) || v === lessonI) return;
      lessonI = v;
      sceneI = 0;
      render();
    });
    adjBar.appendChild(sel);

    var btnOral = document.createElement("button");
    btnOral.type = "button";
    btnOral.className = "primary";
    btnOral.textContent = "去口语测试 →";
    btnOral.addEventListener("click", function () {
      mode = "oral";
      pickRandomOral();
      render();
    });
    adjBar.appendChild(btnOral);
    root.appendChild(adjBar);

    var grid = document.createElement("div");
    grid.className = "scene-grid";
    (L.scenes || []).forEach(function (sc, si) {
      grid.appendChild(buildSceneCard(L, sc, si, { showSentBtn: true }));
    });
    root.appendChild(grid);

    var nav = document.createElement("div");
    nav.className = "lab-actions";
    var prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "← 上一词";
    prev.disabled = lessonI <= 0;
    prev.addEventListener("click", function () {
      if (lessonI > 0) {
        lessonI--;
        render();
      }
    });
    var next = document.createElement("button");
    next.type = "button";
    next.className = "primary";
    next.textContent = lessonI < LESSONS.length - 1 ? "下一词 →" : "完成 · 口语测试 →";
    next.addEventListener("click", function () {
      if (lessonI < LESSONS.length - 1) {
        lessonI++;
        render();
      } else {
        mode = "oral";
        pickRandomOral();
        render();
      }
    });
    nav.appendChild(prev);
    nav.appendChild(next);
    root.appendChild(nav);
  }

  function renderOral(root) {
    root.className = "panel panel--oral";
    if (!oralPick) pickRandomOral();
    if (!oralPick) {
      root.innerHTML = "<h2>口语测试</h2><p>暂无情景数据。</p>";
      return;
    }

    var L = oralPick.L;
    var sc = oralPick.sc;
    var sent = sceneSentence(sc);

    var h = document.createElement("h2");
    h.textContent = "口语测试 · 随机抽图造句";
    root.appendChild(h);

    var guide = document.createElement("p");
    guide.className = "scene-guide";
    guide.textContent =
      "系统随机抽取「单词 + 情景图」。请学生看图说出完整比较级句子，再点「显示答案」或「听示范」核对。";
    root.appendChild(guide);

    var meta = document.createElement("div");
    meta.className = "oral-meta";
    meta.innerHTML =
      '<span class="oral-meta__word">' +
      escapeHtml(L.listen) +
      "</span>" +
      '<span class="oral-meta__hint">词 ' +
      (oralPick.li + 1) +
      "/15 · 场景 " +
      (oralPick.si + 1) +
      "/2</span>";
    root.appendChild(meta);

    var wrap = document.createElement("div");
    wrap.className = "scene-img-wrap oral-stage__img";
    var img = document.createElement("img");
    img.src = sc.img;
    img.alt = L.listen + " 随机口语测试";
    wrap.appendChild(img);
    root.appendChild(wrap);

    var prompt = document.createElement("p");
    prompt.className = "oral-prompt";
    prompt.textContent = "👄 请看图，用 more + " + L.adj + " 说出一整句比较级句子。";
    root.appendChild(prompt);

    var ansWrap = document.createElement("div");
    ansWrap.className = "warm-q-wrap oral-answer" + (oralRevealed ? " is-revealed" : "");
    ansWrap.setAttribute("role", "button");
    ansWrap.setAttribute("tabindex", "0");
    var ans = document.createElement("p");
    ans.className = "warm-q";
    ans.innerHTML = questionWithHighlight(sent, L.listen);
    ansWrap.appendChild(ans);
    if (!oralRevealed) {
      ansWrap.addEventListener("click", function () {
        oralRevealed = true;
        render();
      });
      ansWrap.addEventListener("keydown", function (ev) {
        if (oralRevealed) return;
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          oralRevealed = true;
          render();
        }
      });
    }
    root.appendChild(ansWrap);

    var row = document.createElement("div");
    row.className = "btn-row oral-actions";

    var btnReveal = document.createElement("button");
    btnReveal.type = "button";
    btnReveal.className = "primary";
    btnReveal.textContent = oralRevealed ? "已显示答案" : "显示答案";
    btnReveal.addEventListener("click", function () {
      oralRevealed = true;
      render();
    });
    row.appendChild(btnReveal);

    var btnListen = document.createElement("button");
    btnListen.type = "button";
    btnListen.className = "speak";
    btnListen.textContent = "🔊 听示范";
    btnListen.addEventListener("click", function () {
      speakPlainAzure(sent);
    });
    row.appendChild(btnListen);

    var btnOk = document.createElement("button");
    btnOk.type = "button";
    btnOk.textContent = "✓ 说对了";
    btnOk.addEventListener("click", function () {
      oralTotal++;
      oralScore++;
      showToast("很棒！", true);
      pickRandomOral();
      render();
    });
    row.appendChild(btnOk);

    var btnTry = document.createElement("button");
    btnTry.type = "button";
    btnTry.textContent = "再想想";
    btnTry.addEventListener("click", function () {
      oralTotal++;
      showToast("再看图，再试一次或听示范。", false);
      oralRevealed = true;
      render();
    });
    row.appendChild(btnTry);

    var btnNext = document.createElement("button");
    btnNext.type = "button";
    btnNext.className = "primary";
    btnNext.textContent = "🎲 下一题";
    btnNext.addEventListener("click", function () {
      oralTotal++;
      pickRandomOral();
      render();
    });
    row.appendChild(btnNext);
    root.appendChild(row);

    if (oralTotal > 0) {
      var stat = document.createElement("p");
      stat.className = "oral-stat";
      stat.textContent =
        "本轮已练 " + oralTotal + " 题 · 自评正确 " + oralScore + " 题";
      root.appendChild(stat);
    }
  }

  function renderLesson(root) {
    var L = LESSONS[lessonI];
    var sc = getScene(L, sceneI) || { img: L.img, chunks: L.chunks, sentence: "" };
    root.classList.toggle("panel--lesson-sent", lessonPhase === "sent");

    if (lessonPhase === "scenes") {
      renderScenePractice(root);
      return;
    }

    var h = document.createElement("h2");
    h.textContent =
      "看图造句 " + (lessonI + 1) + "/15 · 场景 " + (sceneI + 1) + "/2 · " + L.listen;
    root.appendChild(h);

    var p2 = document.createElement("p");
    p2.className = "lesson-sent-intro";
    p2.textContent = "请看图 → 拖词排成正确的比较级句子。";
    root.appendChild(p2);

    var layout = document.createElement("div");
    layout.className = "lesson-sent-layout";

    var colImg = document.createElement("div");
    colImg.className = "lesson-sent-col lesson-sent-col--img";
    var img = document.createElement("img");
    img.className = "lesson-img lesson-img--stage";
    img.src = sc.img;
    img.alt = "情景图";
    colImg.appendChild(img);

    var colSlots = document.createElement("div");
    colSlots.className = "lesson-sent-col lesson-sent-col--slots";

    function goSentScenario(idx) {
      clearDragListeners();
      var n = LESSONS.length;
      lessonI = ((idx % n) + n) % n;
      sceneI = 0;
      lessonPhase = "sent";
      render();
    }

    var scenarioBar = document.createElement("div");
    scenarioBar.className = "lesson-sent-scenario-bar";

    var btnPrevSc = document.createElement("button");
    btnPrevSc.type = "button";
    btnPrevSc.className = "scenario-nav-btn";
    btnPrevSc.textContent = "← 上一词";
    btnPrevSc.addEventListener("click", function () {
      goSentScenario(lessonI - 1);
    });

    var selSc = document.createElement("select");
    selSc.className = "scenario-jump-select";
    selSc.setAttribute("aria-label", "选择形容词");
    for (var si = 0; si < LESSONS.length; si++) {
      var opt = document.createElement("option");
      opt.value = String(si);
      opt.textContent = si + 1 + "/" + LESSONS.length + " · " + LESSONS[si].listen;
      if (si === lessonI) opt.selected = true;
      selSc.appendChild(opt);
    }
    selSc.addEventListener("change", function () {
      var v = parseInt(selSc.value, 10);
      if (Number.isNaN(v) || v === lessonI) return;
      goSentScenario(v);
    });

    var selScene = document.createElement("select");
    selScene.className = "scenario-jump-select";
    selScene.setAttribute("aria-label", "选择场景");
    (L.scenes || []).forEach(function (s, i) {
      var o2 = document.createElement("option");
      o2.value = String(i);
      o2.textContent = "场景 " + (i + 1);
      if (i === sceneI) o2.selected = true;
      selScene.appendChild(o2);
    });
    selScene.addEventListener("change", function () {
      var v = parseInt(selScene.value, 10);
      if (Number.isNaN(v) || v === sceneI) return;
      sceneI = v;
      render();
    });

    var btnNextSc = document.createElement("button");
    btnNextSc.type = "button";
    btnNextSc.className = "scenario-nav-btn";
    btnNextSc.textContent = "下一词 →";
    btnNextSc.addEventListener("click", function () {
      goSentScenario(lessonI + 1);
    });

    var btnBack = document.createElement("button");
    btnBack.type = "button";
    btnBack.className = "scenario-nav-btn";
    btnBack.textContent = "回十五练";
    btnBack.addEventListener("click", function () {
      lessonPhase = "scenes";
      render();
    });

    scenarioBar.appendChild(btnPrevSc);
    scenarioBar.appendChild(selSc);
    scenarioBar.appendChild(selScene);
    scenarioBar.appendChild(btnNextSc);
    scenarioBar.appendChild(btnBack);
    colSlots.appendChild(scenarioBar);

    var chunks = sc.chunks || L.chunks || [];

    var listen2 = document.createElement("div");
    listen2.className = "btn-row";
    var b2 = document.createElement("button");
    b2.type = "button";
    b2.className = "primary";
    b2.textContent = "听示范句";
    b2.addEventListener("click", function () {
      speakPlainAzure(sceneSentence(sc) || chunks.join(" "));
    });
    listen2.appendChild(b2);
    colSlots.appendChild(listen2);

    var slotsWrap = document.createElement("div");
    slotsWrap.className = "sent-slots lesson-sent-slots";
    sentSlots = [];
    chunks.forEach(function () {
      var s = document.createElement("div");
      s.className = "sent-slot";
      slotsWrap.appendChild(s);
      sentSlots.push(s);
    });
    colSlots.appendChild(slotsWrap);

    var bank2 = document.createElement("div");
    bank2.className = "bank lesson-sent-bank";
    shuffle(chunks).forEach(function (tok) {
      var c = document.createElement("div");
      c.className = "drag-chip";
      c.textContent = tok;
      c.dataset.text = tok;
      bank2.appendChild(c);
      attachDrag(c, bank2, function (cx, cy) {
        return nearestSentSlot(cx, cy);
      }, function () {});
    });
    colSlots.appendChild(bank2);

    var actions = document.createElement("div");
    actions.className = "lesson-sent-actions";
    var btnCheck = document.createElement("button");
    btnCheck.type = "button";
    btnCheck.className = "primary";
    btnCheck.textContent = "检查句子顺序";
    btnCheck.addEventListener("click", function () {
      var ok = true;
      for (var i = 0; i < sentSlots.length; i++) {
        var ch = sentSlots[i].querySelector(".drag-chip");
        if (!ch || ch.dataset.text !== chunks[i]) ok = false;
      }
      if (!ok) {
        showToast("顺序不对：注意比较级结构 + than。", false);
        return;
      }
      showToast("Great!", true);
      speakPlainAzure(chunks.join(" "), "en-GB-RyanNeural", "cheerful").finally(function () {
        window.setTimeout(function () {
          if (sceneI < (L.scenes || []).length - 1) {
            sceneI++;
          } else {
            lessonI++;
            sceneI = 0;
          }
          lessonPhase = "sent";
          if (lessonI >= LESSONS.length) mode = "oral";
          render();
        }, 400);
      });
    });
    actions.appendChild(btnCheck);
    colSlots.appendChild(actions);

    layout.appendChild(colImg);
    layout.appendChild(colSlots);
    root.appendChild(layout);

    speakPlainAzure(sceneSentence(sc) || chunks.join(" "), "en-GB-RyanNeural", "friendly");
  }
