/**
 * 跨单元混合复习：多选单元与目标单词，再进入九种游戏。
 * 选词与进行中的词包会写入本机 localStorage，离开页面后再进来仍可直接换游戏。
 */
(function () {
  "use strict";

  var MIN_WORDS = 4;
  var STORE_VER = 1;
  var cache = {};
  var selected = {};
  var filterKind = "all";
  var query = "";
  var loaded = {};
  var pendingKeys = [];
  var restoring = false;
  var playing = false;

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function currentUser() {
    try {
      return localStorage.getItem("current-user") || localStorage.getItem("authing-user") || "guest";
    } catch (e) {
      return "guest";
    }
  }

  function storeKey() {
    return "pet-studio-mix:" + currentUser();
  }

  function itemKey(it) {
    return Number(it.unitId) + ":" + (it.kind || "vocab") + ":" + String(it.word || "").toLowerCase();
  }

  function cloneItem(it, unit) {
    return {
      kind: it.kind,
      lesson: it.lesson,
      word: it.word,
      phrase: it.phrase,
      title: it.title,
      phonetic: it.phonetic,
      meaning: it.meaning,
      definitionEn: it.definitionEn,
      usage: it.usage,
      examples: it.examples,
      options: it.options,
      quizFill: it.quizFill,
      imageFile: it.imageFile,
      imageUrl: it.imageUrl,
      explanation: it.explanation,
      sourceSentence: it.sourceSentence,
      sourceSentenceCn: it.sourceSentenceCn,
      guide: it.guide,
      quiz: it.quiz,
      tips: it.tips,
      gaokaoEx: it.gaokaoEx,
      unitId: unit.id,
      unitTitle: unit.title
    };
  }

  function selectedList() {
    return Object.keys(selected).map(function (k) { return selected[k]; });
  }

  function counts() {
    var vocab = 0;
    var phrase = 0;
    selectedList().forEach(function (it) {
      if (it.kind === "phrase") phrase++;
      else vocab++;
    });
    return { vocab: vocab, phrase: phrase, total: vocab + phrase };
  }

  function checkedUnitIds() {
    var ids = [];
    PETStudio.UNITS.forEach(function (u) {
      if (cache[u.id] || loaded[u.id]) ids.push(u.id);
    });
    selectedList().forEach(function (it) {
      if (ids.indexOf(it.unitId) < 0) ids.push(it.unitId);
    });
    return ids;
  }

  function loadSnapshot() {
    try {
      var data = JSON.parse(localStorage.getItem(storeKey()) || "null");
      if (!data || data.v !== STORE_VER) return null;
      if (!Array.isArray(data.keys)) data.keys = [];
      if (!Array.isArray(data.units)) data.units = [];
      return data;
    } catch (e) {
      return null;
    }
  }

  function persist(patch) {
    if (restoring) return;
    var prev = loadSnapshot() || {};
    var data = {
      v: STORE_VER,
      units: checkedUnitIds(),
      keys: Object.keys(selected),
      level: ($("levelSel") && $("levelSel").value) || prev.level || "standard",
      playing: playing,
      game: prev.game || "",
      updatedAt: Date.now()
    };
    if (patch) {
      Object.keys(patch).forEach(function (k) { data[k] = patch[k]; });
    }
    try {
      localStorage.setItem(storeKey(), JSON.stringify(data));
    } catch (e) {}
  }

  function unitsFromSnapshot(snap) {
    var ids = [];
    function add(id) {
      id = Number(id);
      if (id && ids.indexOf(id) < 0) ids.push(id);
    }
    (snap.units || []).forEach(add);
    (snap.keys || []).forEach(function (k) {
      add(String(k).split(":")[0]);
    });
    return ids;
  }

  function poolItems() {
    var out = [];
    PETStudio.UNITS.forEach(function (u) {
      var bag = cache[u.id];
      if (!bag) return;
      (bag.vocab || []).forEach(function (it) { out.push(it); });
      (bag.colloc || []).forEach(function (it) { out.push(it); });
    });
    return out;
  }

  function applyPendingKeys() {
    if (!pendingKeys.length) return;
    var leftover = [];
    var pool = poolItems();
    var map = {};
    pool.forEach(function (it) { map[itemKey(it)] = it; });
    pendingKeys.forEach(function (key) {
      if (map[key]) selected[key] = map[key];
      else leftover.push(key);
    });
    pendingKeys = leftover;
  }

  function visibleItems() {
    var q = query.trim().toLowerCase();
    return poolItems().filter(function (it) {
      if (filterKind === "vocab" && it.kind === "phrase") return false;
      if (filterKind === "phrase" && it.kind !== "phrase") return false;
      if (!q) return true;
      return String(it.word || "").toLowerCase().indexOf(q) >= 0 ||
        String(it.meaning || "").toLowerCase().indexOf(q) >= 0 ||
        String(it.unitTitle || "").toLowerCase().indexOf(q) >= 0;
    });
  }

  function gameName(key) {
    var hit = (PETStudio.GAMES || []).filter(function (g) { return g.key === key; })[0];
    return hit ? hit.name : "";
  }

  function setHeroHidden(hide) {
    var hero = document.querySelector("body.mix .hero");
    if (hero) hero.hidden = !!hide;
  }

  function updateResumeBar() {
    var bar = $("resumeBar");
    if (!bar) return;
    if (playing || restoring) {
      bar.hidden = true;
      return;
    }
    var c = counts();
    if (c.total < 1) {
      bar.hidden = true;
      return;
    }
    var snap = loadSnapshot() || {};
    var ready = c.total >= MIN_WORDS;
    var last = gameName(snap.game || "");
    bar.hidden = false;
    $("resumeTitle").textContent = "已记住 " + c.total + " 个词 · " + checkedUnitIds().length + " 个单元";
    $("resumeHint").textContent = ready
      ? (last ? "可直接继续或换游戏，上次玩的是「" + last + "」。不必回到课程页重新选词。" : "选词已保存在本机。玩完一个游戏后可直接点游戏条切换。")
      : "至少再选 " + (MIN_WORDS - c.total) + " 个词即可开始。";
    if ($("resumePlay")) $("resumePlay").disabled = !ready;
  }

  function updatePackBar() {
    var bar = $("packBar");
    if (!bar) return;
    var c = counts();
    if (!playing || c.total < 1) {
      bar.hidden = true;
      if ($("packWords")) $("packWords").hidden = true;
      return;
    }
    bar.hidden = false;
    $("packText").textContent = "当前词包 · " + c.total + " 个目标词（单词 " + c.vocab +
      " · 词组 " + c.phrase + "）· 来自 " + checkedUnitIds().length + " 个单元";
  }

  function renderPackWords() {
    var box = $("packWords");
    if (!box) return;
    box.innerHTML = selectedList().map(function (it) {
      return '<span class="pack-chip">' + esc(it.word) +
        "<small>U" + it.unitId + "</small></span>";
    }).join("");
  }

  function syncBar() {
    var c = counts();
    $("mixCount").textContent = "已选 " + c.vocab + " 个单词 · " + c.phrase + " 个词组";
    $("startMix").disabled = c.total < MIN_WORDS;
    $("startMix").textContent = c.total < MIN_WORDS
      ? "至少再选 " + (MIN_WORDS - c.total) + " 个词"
      : "开始混合游戏（" + c.total + "）";
    updateResumeBar();
    updatePackBar();
    persist();
  }

  function renderWords() {
    var box = $("wordList");
    var items = visibleItems();
    if (!items.length) {
      var anyUnit = PETStudio.UNITS.some(function (u) { return cache[u.id]; });
      box.innerHTML = "<p class=note>" + (anyUnit ? "没有符合筛选的单词。" : "先勾选上方单元，载入单词后再勾选目标词。") + "</p>";
      syncBar();
      return;
    }
    var html = "";
    var lastUnit = null;
    items.forEach(function (it) {
      if (it.unitId !== lastUnit) {
        lastUnit = it.unitId;
        html += '<div class="mix-unit-h">Unit ' + it.unitId + " · " + esc(it.unitTitle) +
          ' <button type="button" class="linkish" data-sel-unit="' + it.unitId + '">全选本单元</button></div>';
      }
      var key = itemKey(it);
      html += '<label class="mix-word' + (selected[key] ? " on" : "") + '">' +
        '<input type="checkbox" data-key="' + esc(key) + '"' + (selected[key] ? " checked" : "") + ">" +
        '<span class="w">' + esc(it.word) + "</span>" +
        '<span class="m">' + esc(it.meaning) + "</span>" +
        '<span class="k">' + (it.kind === "phrase" ? "词组" : "单词") + "</span>" +
        "</label>";
    });
    box.innerHTML = html;
    syncBar();
  }

  function tagBag(bag) {
    var u = bag.unit;
    return {
      unit: u,
      vocab: (bag.vocab || []).map(function (it) { return cloneItem(it, u); }),
      colloc: (bag.colloc || []).map(function (it) {
        var row = cloneItem(it, u);
        row.kind = "phrase";
        return row;
      }),
      grammar: (bag.grammar || []).map(function (it) { return cloneItem(it, u); })
    };
  }

  function setUnit(id, on) {
    var chip = document.querySelector('.mix-chip[data-unit="' + id + '"]');
    if (chip) chip.classList.toggle("on", on);
    var inp = chip && chip.querySelector("input");
    if (inp) inp.checked = on;
    if (!on) {
      Object.keys(selected).forEach(function (k) {
        if (selected[k].unitId === Number(id)) delete selected[k];
      });
      delete cache[id];
      loaded[id] = false;
      renderWords();
      return Promise.resolve();
    }
    if (cache[id]) {
      applyPendingKeys();
      renderWords();
      return Promise.resolve();
    }
    loaded[id] = true;
    chip && chip.classList.add("loading");
    return PETStudio.loadUnit(id).then(function (bag) {
      if (!loaded[id]) return;
      cache[id] = tagBag(bag);
      chip && chip.classList.remove("loading");
      applyPendingKeys();
      renderWords();
    }).catch(function (e) {
      loaded[id] = false;
      chip && chip.classList.remove("loading");
      $("mixStatus").textContent = "Unit " + id + " 读取失败：" + (e.message || e);
    });
  }

  function buildBag() {
    var list = selectedList();
    var vocab = [];
    var colloc = [];
    var grammar = [];
    var unitIds = [];
    list.forEach(function (it) {
      if (unitIds.indexOf(it.unitId) < 0) unitIds.push(it.unitId);
      if (it.kind === "phrase") colloc.push(it);
      else vocab.push(it);
    });
    unitIds.forEach(function (id) {
      var bag = cache[id];
      if (bag && bag.grammar) grammar = grammar.concat(bag.grammar);
    });
    var c = counts();
    return {
      unit: {
        id: "mix",
        title: "跨单元混合",
        subtitle: "单词 " + c.vocab + " · 词组 " + c.phrase,
        mix: true
      },
      vocab: vocab,
      colloc: colloc,
      grammar: grammar,
      passages: [],
      mix: true,
      mixUnits: unitIds
    };
  }

  function showPicker() {
    playing = false;
    setHeroHidden(false);
    $("playPanel").hidden = true;
    $("pickerPanel").hidden = false;
    $("unitTitle").textContent = "跨单元混合复习";
    $("mixStatus").textContent = "勾选单元，再点选要练的单词 / 词组。选词会记住，下次进来不用重选。";
    renderWords();
    persist({ playing: false });
  }

  function startGames() {
    var c = counts();
    if (c.total < MIN_WORDS) return;
    var bag = buildBag();
    playing = true;
    setHeroHidden(true);
    $("pickerPanel").hidden = true;
    if ($("resumeBar")) $("resumeBar").hidden = true;
    $("playPanel").hidden = false;
    $("unitTitle").textContent = "混合复习 · " + c.total + " 个目标词";
    $("mixStatus").textContent =
      "来自 " + bag.mixUnits.length + " 个单元 · 单词 " + c.vocab + " · 词组 " + c.phrase +
      " · 语法点 " + bag.grammar.length + "。点卡片或上方游戏条开始，玩完可直接换下一个。";
    updatePackBar();
    persist({ playing: true });
    PETStudio.mountGames(bag);
    $("playPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function restoreFromSnapshot() {
    var snap = loadSnapshot();
    if (!snap || (!(snap.keys && snap.keys.length) && !(snap.units && snap.units.length))) {
      restoring = false;
      renderWords();
      return Promise.resolve();
    }
    pendingKeys = (snap.keys || []).slice();
    if (snap.level && $("levelSel")) $("levelSel").value = snap.level;
    var ids = unitsFromSnapshot(snap);
    if (!ids.length) {
      restoring = false;
      renderWords();
      return Promise.resolve();
    }
    if (snap.playing && pendingKeys.length >= MIN_WORDS) {
      $("pickerPanel").hidden = true;
    }
    restoring = true;
    $("mixStatus").textContent = "正在恢复上次选的 " + pendingKeys.length + " 个词…";
    return Promise.all(ids.map(function (id) {
      return setUnit(id, true);
    })).then(function () {
      restoring = false;
      applyPendingKeys();
      renderWords();
      var c = counts();
      var ready = c.total >= MIN_WORDS;
      $("mixStatus").textContent = ready
        ? "已恢复上次选择的 " + c.total + " 个词。可直接开始或换游戏。"
        : "勾选单元，再点选要练的单词 / 词组。";
      persist({
        playing: !!(snap.playing && ready),
        game: snap.game || "",
        level: snap.level || "standard"
      });
      if (snap.playing && ready) startGames();
      else {
        $("pickerPanel").hidden = false;
        updateResumeBar();
      }
    }).catch(function () {
      restoring = false;
      $("pickerPanel").hidden = false;
      renderWords();
    });
  }

  function boot() {
    var chips = $("unitChips");
    PETStudio.UNITS.forEach(function (u) {
      var lab = document.createElement("label");
      lab.className = "mix-chip";
      lab.setAttribute("data-unit", u.id);
      lab.innerHTML = '<input type="checkbox"> <b>U' + u.id + "</b> " + esc(u.subtitle);
      lab.querySelector("input").onchange = function () {
        setUnit(u.id, this.checked);
      };
      chips.appendChild(lab);
    });
    $("wordList").addEventListener("change", function (e) {
      var inp = e.target.closest("input[data-key]");
      if (!inp) return;
      var key = inp.getAttribute("data-key");
      var hit = visibleItems().filter(function (it) { return itemKey(it) === key; })[0];
      if (!hit) return;
      if (inp.checked) selected[key] = hit;
      else delete selected[key];
      var row = inp.closest(".mix-word");
      if (row) row.classList.toggle("on", inp.checked);
      syncBar();
    });
    $("wordList").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-sel-unit]");
      if (!btn) return;
      var uid = Number(btn.getAttribute("data-sel-unit"));
      visibleItems().forEach(function (it) {
        if (it.unitId !== uid) return;
        if (filterKind === "vocab" && it.kind === "phrase") return;
        if (filterKind === "phrase" && it.kind !== "phrase") return;
        selected[itemKey(it)] = it;
      });
      renderWords();
    });
    $("mixSearch").oninput = function () {
      query = this.value || "";
      renderWords();
    };
    Array.prototype.forEach.call(document.querySelectorAll("[data-kind]"), function (btn) {
      btn.onclick = function () {
        filterKind = btn.getAttribute("data-kind");
        Array.prototype.forEach.call(document.querySelectorAll("[data-kind]"), function (b) {
          b.classList.toggle("on", b === btn);
        });
        renderWords();
      };
    });
    $("selVisible").onclick = function () {
      visibleItems().forEach(function (it) { selected[itemKey(it)] = it; });
      renderWords();
    };
    $("clearSel").onclick = function () {
      selected = {};
      pendingKeys = [];
      renderWords();
    };
    $("allUnits").onclick = function () {
      PETStudio.UNITS.forEach(function (u) {
        var chip = document.querySelector('.mix-chip[data-unit="' + u.id + '"]');
        var inp = chip && chip.querySelector("input");
        if (inp && !inp.checked) {
          inp.checked = true;
          setUnit(u.id, true);
        }
      });
    };
    $("noUnits").onclick = function () {
      PETStudio.UNITS.forEach(function (u) {
        var chip = document.querySelector('.mix-chip[data-unit="' + u.id + '"]');
        var inp = chip && chip.querySelector("input");
        if (inp && inp.checked) {
          inp.checked = false;
          loaded[u.id] = false;
          setUnit(u.id, false);
        }
      });
    };
    $("startMix").onclick = startGames;
    $("editMix").onclick = showPicker;
    if ($("resumePlay")) $("resumePlay").onclick = startGames;
    if ($("resumeEdit")) {
      $("resumeEdit").onclick = function () {
        $("pickerPanel").scrollIntoView({ behavior: "smooth", block: "start" });
      };
    }
    if ($("packToggle")) {
      $("packToggle").onclick = function () {
        var box = $("packWords");
        if (!box) return;
        var open = box.hidden;
        box.hidden = !open;
        if (open) renderPackWords();
        $("packToggle").textContent = open ? "收起已选词" : "查看已选词";
      };
    }
    PETStudio.onMixState = function (patch) {
      persist(patch || {});
    };
    restoreFromSnapshot();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
