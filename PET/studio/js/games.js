/**
 * PET 九种分层复习游戏
 */
(function (global) {
  "use strict";

  var state = {
    bag: null,
    game: null,
    level: "standard",
    queue: [],
    idx: 0,
    score: 0,
    lock: false,
    memory: null,
    spinDeg: 0,
    timerId: null
  };

  function clearTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function spellSeconds() {
    var s = levelCfg().seconds;
    if (!s) return 0;
    return Math.max(s, 40);
  }

  function attachTimer() {
    clearTimer();
    var sec = levelCfg().seconds;
    var el = $("timer");
    if (!sec || !el) return;
    var left = sec;
    el.textContent = left + "s";
    state.timerId = setInterval(function () {
      left -= 1;
      if (el) el.textContent = Math.max(0, left) + "s";
      if (left <= 0) {
        clearTimer();
        if (!state.lock) {
          state.lock = true;
          setTimeout(next, 350);
        }
      }
    }, 1000);
  }

  function $(id) { return document.getElementById(id); }

  function levelCfg() {
    return PETStudio.LEVELS[state.level] || PETStudio.LEVELS.standard;
  }

  function say(text) {
    if (window.PetSpeech && window.PetSpeech.playTTS) {
      window.PetSpeech.playTTS(
        window.PET_AZURE_KEY || "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
        window.PET_AZURE_REGION || "southeastasia",
        text
      );
      return;
    }
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  function hud() {
    var total = state.queue.length || 1;
    var sec = (state.game && state.game.key === "spell") ? spellSeconds() : levelCfg().seconds;
    var timed = sec
      ? '<span class=timer id=timer>' + sec + "s</span>"
      : "";
    return '<div class=hud><span>' + esc(state.game.name) + " · " + esc(levelCfg().label) +
      "</span>" + timed + "<span>题 " + (state.idx + 1) + "/" + total + " · 分 " + state.score + "</span></div>";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function done() {
    $("playRoot").innerHTML = '<div class=play-shell>' + hud() +
      '<div class=q-box>本局完成！得分 ' + state.score + " / " + state.queue.length + "</div>" +
      '<button class="btn btn-indigo" id="againBtn">再来一局</button> ' +
      '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
    $("againBtn").onclick = function () { startGame(state.game.key, state.level); };
    $("backGames").onclick = showList;
  }

  function next() {
    clearTimer();
    state.idx++;
    state.lock = false;
    if (state.idx >= state.queue.length) done();
    else renderCurrent();
  }

  function makeChoiceQs(fromMeaning) {
    var cfg = levelCfg();
    var pool = PETStudio.pickN(state.bag.vocab.concat(state.bag.colloc), cfg.count);
    var meanings = state.bag.vocab.concat(state.bag.colloc).map(function (x) { return x.meaning; });
    var words = state.bag.vocab.concat(state.bag.colloc).map(function (x) { return x.word; });
    return pool.map(function (it) {
      if (fromMeaning) {
        var opts = PETStudio.shuffle([it.word].concat(PETStudio.distractors(words, it.word, cfg.options - 1)));
        return { q: it.meaning, prompt: "选出对应的英文", options: opts, answer: it.word, speak: it.word, img: it.imageUrl };
      }
      var opts2 = PETStudio.shuffle([it.meaning].concat(PETStudio.distractors(meanings, it.meaning, cfg.options - 1)));
      return { q: it.word, prompt: it.phonetic || "选出正确中文", options: opts2, answer: it.meaning, speak: it.word, img: it.imageUrl };
    });
  }

  function renderChoice() {
    var q = state.queue[state.idx];
    var pic = (state.game.key === "picture" && q.img)
      ? '<div class=pic-wrap><img src="' + esc(q.img) + '" alt=""></div>'
      : "";
    $("playRoot").innerHTML = '<div class=play-shell>' + hud() +
      '<div class=note>' + esc(q.prompt || "") + "</div>" +
      pic +
      '<div class=q-box>' + esc(q.q) + "</div>" +
      (q.speak ? '<button class="btn btn-ghost" id="speakBtn">朗读</button>' : "") +
      '<div class=opts id=opts></div></div>';
    if ($("speakBtn")) $("speakBtn").onclick = function () { say(q.speak); };
    var box = $("opts");
    q.options.forEach(function (op) {
      var b = document.createElement("button");
      b.className = "opt";
      b.textContent = op;
      b.onclick = function () {
        if (state.lock) return;
        state.lock = true;
        var ok = op === q.answer;
        b.className = "opt " + (ok ? "ok" : "bad");
        if (ok) state.score++;
        else {
          Array.prototype.forEach.call(box.children, function (el) {
            if (el.textContent === q.answer) el.className = "opt ok";
          });
        }
        setTimeout(next, 700);
      };
      box.appendChild(b);
    });
    attachTimer();
  }

  function startMemory() {
    var want = { easy: 4, standard: 6, challenge: 8 };
    var pool = state.bag.vocab.filter(function (x) { return x.word && x.meaning; });
    var n = Math.min(want[state.level] || 6, pool.length);
    var items = PETStudio.pickN(pool, n);
    var cards = [];
    items.forEach(function (it, i) {
      var pid = "p" + i;
      cards.push({ pair: pid, kind: "en", text: it.word, img: it.imageUrl || "" });
      cards.push({ pair: pid, kind: "zh", text: it.meaning, img: "" });
    });
    state.memory = { cards: PETStudio.shuffle(cards), open: [], matched: {}, busy: false };
    state.queue = items;
    state.idx = 0;
    renderMemory();
  }

  function memoryHud() {
    var m = state.memory;
    var got = Object.keys(m.matched).length;
    var total = m.cards.length / 2;
    return '<div class=hud><span>' + esc(state.game.name) + " · " + esc(levelCfg().label) +
      "</span><span>配对 " + got + "/" + total + " · 分 " + state.score + "</span></div>";
  }

  function renderMemory() {
    var m = state.memory;
    if (!m) return;
    var html = '<div class="play-shell">' + memoryHud() +
      '<p class="note">翻开一张英文牌和一张中文牌，配对成功即可留下；点错会翻回去。</p>' +
      '<div class="board memory-board">';
    m.cards.forEach(function (c, i) {
      var matched = !!m.matched[c.pair];
      var open = m.open.indexOf(i) !== -1 || matched;
      html += '<button type="button" class="flip' +
        (open ? " open" : "") +
        (matched ? " done" : "") +
        (c.kind === "zh" ? " zh" : " en") +
        '" data-i="' + i + '">';
      if (open) {
        if (c.img) html += '<img src="' + esc(c.img) + '" alt="">';
        html += "<small>" + (c.kind === "en" ? "EN" : "中文") + "</small>";
        html += "<span>" + esc(c.text) + "</span>";
      } else {
        html += '<span class="qmark">?</span>';
      }
      html += "</button>";
    });
    html += '</div><div class="mem-actions"><button class="btn btn-ghost" type="button" id="backGames">返回游戏列表</button></div></div>';
    $("playRoot").innerHTML = html;
    $("backGames").onclick = showList;
    Array.prototype.forEach.call(document.querySelectorAll(".flip"), function (btn) {
      btn.onclick = function () {
        var i = Number(btn.getAttribute("data-i"));
        var card = m.cards[i];
        if (m.busy || m.matched[card.pair] || m.open.indexOf(i) !== -1 || m.open.length >= 2) return;
        m.open.push(i);
        renderMemory();
        if (m.open.length < 2) return;
        var a = m.cards[m.open[0]];
        var b = m.cards[m.open[1]];
        if (a.pair === b.pair) {
          m.matched[a.pair] = true;
          state.score++;
          m.open = [];
          renderMemory();
          if (Object.keys(m.matched).length >= m.cards.length / 2) {
            setTimeout(done, 500);
          }
        } else {
          m.busy = true;
          setTimeout(function () {
            m.open = [];
            m.busy = false;
            renderMemory();
          }, 800);
        }
      };
    });
  }

  function startSpell() {
    state.queue = PETStudio.pickN(state.bag.vocab, levelCfg().count).map(function (it) {
      return { item: it, typed: "" };
    });
    renderSpell();
  }

  function renderSpell() {
    var q = state.queue[state.idx];
    var w = (q.item.word || "").replace(/[^a-zA-Z]/g, "");
    if (!w) {
      setTimeout(next, 0);
      return;
    }
    $("playRoot").innerHTML = '<div class="play-shell spell-play">' + hud() +
      '<div class=note>' + esc(q.item.meaning) + "</div>" +
      '<div class=q-box>' + esc(q.item.phonetic || "听音 / 看义拼写") + "</div>" +
      '<button class="btn btn-ghost" id="speakBtn">朗读单词</button>' +
      '<div class=spell-row id=slots></div>' +
      '<input id=spellIn class=spell-input autocomplete=off autocapitalize=off spellcheck=false placeholder="在此居中输入拼写">' +
      '<div class=keys id=keys></div>' +
      '<p class=note>字母居中显示，也可用下方按键</p></div>';
    $("speakBtn").onclick = function () { say(q.item.word); };
    drawSpell(w, q.typed);
    var letters = PETStudio.shuffle((w + "abcdefghijklmnopqrstuvwxyz").slice(0, Math.max(w.length + 4, 12)).split(""));
    var keys = $("keys");
    letters.forEach(function (ch) {
      var b = document.createElement("button");
      b.className = "key";
      b.textContent = ch;
      b.onclick = function () { pushSpell(ch); };
      keys.appendChild(b);
    });
    var inp = $("spellIn");
    inp.focus();
    inp.oninput = function () {
      q.typed = (inp.value || "").replace(/[^a-zA-Z]/g, "").slice(0, w.length).toLowerCase();
      inp.value = q.typed;
      drawSpell(w, q.typed);
      if (q.typed.length === w.length) finishSpell();
    };
    function pushSpell(ch) {
      if (q.typed.length >= w.length) return;
      q.typed += ch.toLowerCase();
      drawSpell(w, q.typed);
      if (q.typed.length === w.length) finishSpell();
    }
    function finishSpell() {
      if (q.typed === w.toLowerCase()) state.score++;
      clearTimer();
      setTimeout(next, 500);
    }
    clearTimer();
    var sec = spellSeconds();
    var el = $("timer");
    if (sec && el) {
      var left = sec;
      el.textContent = left + "s";
      state.timerId = setInterval(function () {
        left -= 1;
        if (el) el.textContent = Math.max(0, left) + "s";
        if (left <= 0) {
          clearTimer();
          if (!state.lock) {
            state.lock = true;
            setTimeout(next, 350);
          }
        }
      }, 1000);
    }
  }

  function drawSpell(w, typed) {
    var el = $("slots");
    if (!el) return;
    el.innerHTML = w.split("").map(function (ch, i) {
      return '<div class=slot>' + esc(typed[i] || "") + "</div>";
    }).join("");
    var inp = $("spellIn");
    if (inp && document.activeElement !== inp) inp.value = typed;
  }

  function startGap() {
    var list = state.bag.colloc.filter(function (x) { return x.examples && x.examples.length; });
    state.queue = PETStudio.pickN(list, Math.min(levelCfg().count, list.length)).map(function (it) {
      var ex = it.examples[0];
      var raw = ex.sentence || "";
      var blank = raw;
      if (it.word && raw.toLowerCase().indexOf(it.word.toLowerCase()) !== -1) {
        blank = raw.replace(new RegExp(it.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), "______");
      }
      var words = state.bag.colloc.map(function (x) { return x.word; });
      var opts = PETStudio.shuffle([it.word].concat(PETStudio.distractors(words, it.word, levelCfg().options - 1)));
      return { q: blank, prompt: ex.trans || it.meaning, options: opts, answer: it.word, speak: raw };
    });
    renderChoice();
  }

  function startContext() {
    var qs = [];
    state.bag.vocab.concat(state.bag.colloc).forEach(function (it) {
      (it.quizFill || []).forEach(function (row) {
        qs.push({
          q: row.sentence,
          prompt: "选出正确语境（本词：" + it.word + "）",
          options: null,
          answer: row.is_correct === true || String(row.is_correct).toLowerCase() === "true",
          item: it,
          raw: row
        });
      });
    });
    var grouped = {};
    state.bag.vocab.concat(state.bag.colloc).forEach(function (it) {
      if (it.quizFill && it.quizFill.length) grouped[it.word] = it;
    });
    var items = PETStudio.pickN(Object.keys(grouped).map(function (k) { return grouped[k]; }), levelCfg().count);
    state.queue = items.map(function (it) {
      var rows = PETStudio.shuffle(it.quizFill.slice());
      var correct = "";
      rows.forEach(function (r) {
        if (r.is_correct === true || String(r.is_correct).toLowerCase() === "true") correct = r.sentence;
      });
      return {
        q: "哪一句最适合填入 / 使用「" + it.word + "」？",
        prompt: it.meaning,
        options: rows.map(function (r) { return r.sentence; }),
        answer: correct,
        speak: it.word
      };
    });
    renderChoice();
  }

  function startGrammar() {
    var qs = [];
    state.bag.grammar.forEach(function (g) {
      (g.quiz || []).forEach(function (qq) {
        qs.push({
          q: qq.question,
          prompt: g.title || "Grammar",
          options: qq.options || [],
          answer: qq.correct,
          speak: ""
        });
      });
    });
    state.queue = PETStudio.pickN(qs, Math.min(levelCfg().count, qs.length));
    renderChoice();
  }

  function startSpin() {
    var mix = makeChoiceQs(true).concat(makeChoiceQs(false));
    state.queue = PETStudio.pickN(mix, levelCfg().count);
    state.spinDeg = 0;
    renderSpin();
  }

  function renderSpin() {
    $("playRoot").innerHTML = '<div class=play-shell>' + hud() +
      '<div class=wheel id=wheel></div>' +
      '<div style="text-align:center"><button class="btn btn-rose" id="spinBtn">转动转盘</button> ' +
      '<button class="btn btn-teal" id="aiBtn">DeepSeek 加题</button></div>' +
      '<div id=spinQ></div></div>';
    $("spinBtn").onclick = function () {
      state.spinDeg += 720 + Math.floor(Math.random() * 360);
      $("wheel").style.transform = "rotate(" + state.spinDeg + "deg)";
      setTimeout(function () {
        renderChoice();
      }, 900);
    };
    $("aiBtn").onclick = function () {
      var btn = $("aiBtn");
      btn.disabled = true;
      btn.textContent = "出题中…";
      PETStudio.aiExtra("mixed-mcq", state.bag.vocab.concat(state.bag.colloc), 4)
        .then(function (arr) {
          (arr || []).forEach(function (x) {
            state.queue.push({ q: x.q, prompt: x.explain || "AI 加题", options: x.options, answer: x.answer, speak: "" });
          });
          btn.textContent = "已加入 " + (arr || []).length + " 题";
        })
        .catch(function (e) {
          btn.disabled = false;
          btn.textContent = "加题失败，重试";
          alert(e.message || "DeepSeek 不可用");
        });
    };
  }

  function renderCurrent() {
    if (state.game.key === "memory") return renderMemory();
    if (state.game.key === "spell") return renderSpell();
    if (state.game.key === "spin") {
      if (state.idx === 0 && !$("opts")) return renderSpin();
      return renderChoice();
    }
    renderChoice();
  }

  function startGame(key, level) {
    clearTimer();
    state.game = PETStudio.GAMES.filter(function (g) { return g.key === key; })[0];
    state.level = level || state.level;
    state.idx = 0;
    state.score = 0;
    state.lock = false;
    if (!state.game) return;
    if (key === "memory") startMemory();
    else if (key === "picture") { state.queue = makeChoiceQs(true).filter(function (q) { return q.img; }); if (!state.queue.length) state.queue = makeChoiceQs(true); renderChoice(); }
    else if (key === "zh2en") { state.queue = makeChoiceQs(true); renderChoice(); }
    else if (key === "en2zh") { state.queue = makeChoiceQs(false); renderChoice(); }
    else if (key === "spell") startSpell();
    else if (key === "gap") startGap();
    else if (key === "context") startContext();
    else if (key === "grammar") startGrammar();
    else if (key === "spin") startSpin();
  }

  function showList() {
    var g = PETStudio.GAMES.map(function (game) {
      return '<a class=card href="#" data-game="' + game.key + '">' +
        '<img src="' + esc(PETStudio.gameImg(game.id)) + '" alt="">' +
        '<div class=body><div class="tag ' + game.level + '">' + esc(game.tag) + " · " + esc(PETStudio.LEVELS[game.level].label) + "</div>" +
        "<h3>" + esc(game.name) + "</h3><p>" + esc(game.desc) + "</p></div></a>";
    }).join("");
    $("playRoot").innerHTML = '<div class=grid>' + g + "</div>";
    Array.prototype.forEach.call(document.querySelectorAll("[data-game]"), function (a) {
      a.onclick = function (e) {
        e.preventDefault();
        startGame(a.getAttribute("data-game"), $("levelSel").value);
      };
    });
  }

  function bind() {
    $("levelSel").onchange = function () { state.level = this.value; };
    $("printGamesBtn").onclick = function () {
      if (!state.bag) return;
      PETStudio.printGames(state.bag, $("levelSel").value);
    };
    $("aiPaperBtn").onclick = function () {
      if (!state.bag) return;
      var btn = $("aiPaperBtn");
      btn.disabled = true;
      PETStudio.aiExtra("worksheet", state.bag.vocab.concat(state.bag.colloc, state.bag.grammar), 8)
        .then(function (arr) {
          var w = window.open("", "_blank");
          if (!w) return;
          var body = (arr || []).map(function (x, i) {
            return "<div class=q><b>" + (i + 1) + ".</b> " + esc(x.q) + "<div class=opts>" +
              (x.options || []).map(function (o, j) { return "<div>" + String.fromCharCode(65 + j) + ". " + esc(o) + "</div>"; }).join("") +
              "</div><div class=note>答案：" + esc(x.answer) + " · " + esc(x.explain || "") + "</div></div>";
          }).join("");
          var css = new URL("css/print.css", location.href).href;
          w.document.write("<!DOCTYPE html><html><head><meta charset=utf-8><title>AI 加题</title><link rel=stylesheet href=\"" + css + "\"></head><body class=print-page>" +
            '<div class=screen-bar><button onclick=window.print()>导出 PDF</button></div><section class=sheet><div class=inner><h2>DeepSeek 加题卷</h2>' + body + "</div></section></body></html>");
          w.document.close();
        })
        .catch(function (e) {
          var pack = PETStudio.buildPaperQs(state.bag, $("levelSel").value);
          var arr = (pack.zh2en || []).slice(0, 8).map(function (x) {
            return { q: x.q, options: x.options, answer: x.answer, explain: "本单元词表（DeepSeek 暂不可用）" };
          });
          var w = window.open("", "_blank");
          if (!w) return;
          var body = arr.map(function (x, i) {
            return "<div class=q><b>" + (i + 1) + ".</b> " + esc(x.q) + "<div class=opts>" +
              (x.options || []).map(function (o, j) { return "<div>" + String.fromCharCode(65 + j) + ". " + esc(o) + "</div>"; }).join("") +
              "</div><div class=note>答案：" + esc(x.answer) + " · " + esc(x.explain || "") + "</div></div>";
          }).join("");
          var css = new URL("css/print.css", location.href).href;
          w.document.write("<!DOCTYPE html><html><head><meta charset=utf-8><title>加题卷</title><link rel=stylesheet href=\"" + css + "\"></head><body class=print-page>" +
            '<div class=screen-bar><button onclick=window.print()>导出 PDF</button></div><section class=sheet><div class=inner><h2>复习加题卷</h2><p class=note>' +
            esc(e.message || "DeepSeek 暂不可用") + "</p>" + body + "</div></section></body></html>");
          w.document.close();
        })
        .then(function () { btn.disabled = false; });
    };
  }

  global.PETStudio.mountGames = function (bag) {
    state.bag = bag;
    bind();
    showList();
  };
  global.PETStudio.startGame = startGame;
})(window);
