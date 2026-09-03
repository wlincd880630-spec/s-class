/**
 * 跨单元混合复习：多选单元与目标单词，再进入九种游戏
 */
(function () {
  "use strict";

  var MIN_WORDS = 4;
  var cache = {};
  var selected = {};
  var filterKind = "all";
  var query = "";
  var loaded = {};

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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

  function syncBar() {
    var c = counts();
    $("mixCount").textContent = "已选 " + c.vocab + " 个单词 · " + c.phrase + " 个词组";
    $("startMix").disabled = c.total < MIN_WORDS;
    $("startMix").textContent = c.total < MIN_WORDS
      ? "至少再选 " + (MIN_WORDS - c.total) + " 个词"
      : "开始混合游戏（" + c.total + "）";
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
      return;
    }
    if (cache[id]) {
      renderWords();
      return;
    }
    loaded[id] = true;
    chip && chip.classList.add("loading");
    PETStudio.loadUnit(id).then(function (bag) {
      if (!loaded[id]) return;
      cache[id] = tagBag(bag);
      chip && chip.classList.remove("loading");
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

  function startGames() {
    var c = counts();
    if (c.total < MIN_WORDS) return;
    var bag = buildBag();
    $("pickerPanel").hidden = true;
    $("playPanel").hidden = false;
    $("unitTitle").textContent = "混合复习 · " + c.total + " 个目标词";
    $("mixStatus").textContent =
      "来自 " + bag.mixUnits.length + " 个单元 · 单词 " + c.vocab + " · 词组 " + c.phrase +
      " · 语法点 " + bag.grammar.length + "。点卡片开始游戏。";
    PETStudio.mountGames(bag);
    $("playPanel").scrollIntoView({ behavior: "smooth", block: "start" });
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
    $("editMix").onclick = function () {
      $("playPanel").hidden = true;
      $("pickerPanel").hidden = false;
      $("unitTitle").textContent = "跨单元混合复习";
      $("mixStatus").textContent = "勾选单元，再点选要练的单词 / 词组。";
    };
    renderWords();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
