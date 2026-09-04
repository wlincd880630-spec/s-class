(function () {
  "use strict";
  var L = window.LL_LESSON;
  var SCORE_KEY = "ll-games-stars";
  var GAME_ID = Number((document.body && document.body.getAttribute("data-game")) || 0) || 0;
  var score = 0;
  try { score = Number(sessionStorage.getItem(SCORE_KEY) || 0) || 0; } catch (err) { score = 0; }
  var currentGame = GAME_ID;
  var replayFn = null;
  var gameTimer = null;
  var gameGen = 0;

  function gameFile(id) {
    return "game-" + id + ".html";
  }
  function hubFile() {
    return "games.html";
  }

  function clearGameTimer() {
    if (gameTimer) {
      clearTimeout(gameTimer);
      gameTimer = null;
    }
  }
  function later(fn, ms) {
    var gen = gameGen;
    clearGameTimer();
    gameTimer = setTimeout(function () {
      if (gen !== gameGen) return;
      fn();
    }, ms);
  }

  function $(id) { return document.getElementById(id); }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function word(id) { return L.words[id]; }
  function addScore(n) {
    score += n;
    try { sessionStorage.setItem(SCORE_KEY, String(score)); } catch (err) {}
    var pill = $("score-pill");
    if (pill) pill.textContent = "★ " + score;
  }
  function paintScore() {
    var pill = $("score-pill");
    if (pill) pill.textContent = "★ " + score;
  }
  function fb(text, ok) {
    var el = $("play-fb");
    if (!el) return;
    el.textContent = text || "";
    el.className = "feedback" + (ok === true ? " ok" : ok === false ? " no" : "");
  }
  function picCardHTML(w) {
    return (
      '<div class="pic-card">' +
        '<button type="button" class="choice" data-id="' + w.id + '">' +
          '<img src="' + w.img + '" alt="">' +
        "</button>" +
        '<button type="button" class="say-btn" data-say="' + w.id + '">听</button>' +
      "</div>"
    );
  }
  function speakCard(sayBtn) {
    var spoken = word(sayBtn.getAttribute("data-say"));
    if (!spoken) return;
    AAAudio.unlock();
    sayBtn.classList.add("is-on");
    AAAudio.speakWord(spoken.en).then(function () {
      sayBtn.classList.remove("is-on");
    }, function () {
      sayBtn.classList.remove("is-on");
    });
  }
  function playWordClip(w) {
    AAAudio.speakWord(w.en, true);
  }

  function wordPickerHTML(selected, pool) {
    return (
      '<div class="pick-row" id="word-picks">' +
      pool.map(function (w) {
        var on = selected.indexOf(w.id) !== -1;
        return (
          '<button type="button" class="pick-chip' + (on ? " is-on" : "") + '" data-id="' + w.id + '">' +
          '<img src="' + w.img + '" alt="">' + w.en +
          "</button>"
        );
      }).join("") +
      "</div>"
    );
  }
  function bindPicker(selected) {
    var box = $("word-picks");
    if (!box) return;
    box.onclick = function (e) {
      var btn = e.target.closest(".pick-chip");
      if (!btn) return;
      var id = btn.getAttribute("data-id");
      var at = selected.indexOf(id);
      if (at === -1) selected.push(id);
      else selected.splice(at, 1);
      btn.classList.toggle("is-on", selected.indexOf(id) !== -1);
    };
  }
  function pickedWords(ids, fallback) {
    var list = (ids || []).map(word).filter(Boolean);
    return list.length ? list : (fallback || L.vocab.slice());
  }

  function paintHub() {
    var grid = $("hub-grid");
    if (!grid) return;
    grid.innerHTML = L.games.map(function (g) {
      var n = g.id < 10 ? "0" + g.id : String(g.id);
      return (
        '<a class="hub-item" href="' + gameFile(g.id) + '">' +
          '<span class="n">' + n + "</span>" +
          "<div><strong>" + g.title + "</strong><small>" + g.desc + "</small></div>" +
          '<span class="go">→</span>' +
        "</a>"
      );
    }).join("");
  }

  function paintRail() {
    var el = $("game-rail");
    if (!el) return;
    var chips = [
      '<a class="game-chip is-hub" href="' + hubFile() + '" title="游戏目录"><span class="n">目录</span></a>'
    ];
    L.games.forEach(function (g) {
      var on = g.id === GAME_ID ? " is-on" : "";
      var n = g.id < 10 ? "0" + g.id : String(g.id);
      chips.push(
        '<a class="game-chip' + on + '" href="' + gameFile(g.id) + '" title="' + g.title + '"' +
          (g.id === GAME_ID ? ' aria-current="page"' : "") + ">" +
          '<span class="n">' + n + "</span>" +
          '<span class="t">' + (g.short || g.title) + "</span>" +
        "</a>"
      );
    });
    el.innerHTML = chips.join("");
  }

  function showResult(title, msg, again) {
    $("result-title").textContent = title;
    $("result-msg").textContent = msg;
    $("result").classList.remove("hidden");
    replayFn = again;
    var next = $("btn-next-game");
    if (next) {
      var nid = currentGame >= L.games.length ? 1 : currentGame + 1;
      var meta = L.games[nid - 1];
      next.href = gameFile(nid);
      next.textContent = "下一游戏 · " + (meta.short || meta.title);
    }
  }
  function openGame(id) {
    gameGen += 1;
    clearGameTimer();
    currentGame = id;
    var meta = L.games[id - 1];
    if ($("result")) $("result").classList.add("hidden");
    if ($("game-title") && meta) $("game-title").textContent = meta.title;
    if ($("play-lead") && meta) $("play-lead").textContent = meta.desc;
    fb("");
    if (id === 1) startG1();
    if (id === 2) startG2();
    if (id === 3) startG3();
    if (id === 4) startG4();
    if (id === 5) startG5();
    if (id === 6) startG6();
    if (id === 7) startG7();
  }

  paintScore();
  paintHub();
  paintRail();
  if ($("btn-replay")) {
    $("btn-replay").addEventListener("click", function () {
      $("result").classList.add("hidden");
      if (replayFn) replayFn();
    });
  }
  if (GAME_ID) {
    if (window.AAAudio && AAAudio.unlock) {
      document.addEventListener("pointerdown", function unlockOnce() {
        AAAudio.unlock();
      }, { once: true });
    }
    window.addEventListener("pagehide", function () {
      if (window.AAAudio) AAAudio.stop();
    });
    openGame(GAME_ID);
  }

  function startG1() {
    var round = 0, total = 3, picked = {};
    function deal() {
      picked = {};
      var cards = shuffle(L.vocab.slice().concat(shuffle(L.distractors).slice(0, 4)));
      $("play-tools").innerHTML = "";
      $("play-board").innerHTML =
        '<p class="round-mark">' + (round + 1) + " / " + total + "</p>" +
        '<div class="choice-grid" id="g1-grid">' +
        cards.map(picCardHTML).join("") + "</div>";
      $("play-actions").innerHTML = '<button type="button" class="btn btn-leaf" id="g1-check">检查</button>';
      $("g1-grid").onclick = function (e) {
        var say = e.target.closest(".say-btn");
        if (say) {
          speakCard(say);
          return;
        }
        var c = e.target.closest(".choice");
        if (!c) return;
        var id = c.getAttribute("data-id");
        if (picked[id]) { delete picked[id]; c.classList.remove("on"); }
        else { picked[id] = true; c.classList.add("on"); }
      };
      $("g1-check").onclick = check;
      fb("");
    }
    function check() {
      var miss = 0, extra = 0;
      document.querySelectorAll("#g1-grid .choice").forEach(function (c) {
        var w = word(c.getAttribute("data-id"));
        var on = !!picked[w.id];
        c.classList.remove("on", "good", "bad");
        if (w.l && on) c.classList.add("good");
        else if (w.l && !on) { c.classList.add("bad"); miss++; }
        else if (!w.l && on) { c.classList.add("bad"); extra++; }
      });
      if (miss === 0 && extra === 0) {
        addScore(4);
        fb("全对", true);
        round++;
        later(function () {
          if (round >= total) showResult("完成", "开头音听清了。", startG1);
          else deal();
        }, 800);
      } else {
        fb("再看一看", false);
      }
    }
    deal();
  }

  function startG2() {
    var queue = shuffle(L.vocab.concat(L.vocab));
    var n = 0, locked = false;
    function ask() {
      locked = false;
      var target = queue[n];
      var opts = shuffle(L.vocab.slice());
      $("play-tools").innerHTML = '<button type="button" class="btn btn-apple" id="g2-hear">听</button>';
      $("play-board").innerHTML =
        '<p class="round-mark">' + (n + 1) + " / " + queue.length + "</p>" +
        '<div class="choice-grid" id="g2-grid">' +
        opts.map(function (w) {
          return '<button type="button" class="choice" data-id="' + w.id + '"><img src="' + w.img + '" alt=""></button>';
        }).join("") + "</div>";
      $("play-actions").innerHTML = "";
      $("g2-hear").onclick = function () { playWordClip(target); };
      $("g2-grid").onclick = function (e) {
        if (locked) return;
        var c = e.target.closest(".choice");
        if (!c) return;
        locked = true;
        if (c.getAttribute("data-id") === target.id) {
          c.classList.add("good");
          addScore(1);
          fb(target.en, true);
          n++;
          later(function () {
            if (n >= queue.length) showResult("完成", "四个单词都会点了。", startG2);
            else ask();
          }, 700);
        } else {
          c.classList.add("bad");
          fb("再听", false);
          locked = false;
          playWordClip(target);
        }
      };
      fb("");
      playWordClip(target);
    }
    ask();
  }

  function startG3() {
    var round = 0, total = 6;
    function deal() {
      var pair = shuffle(L.vocab).slice(0, 2);
      var odd = shuffle(L.distractors)[0];
      var cards = shuffle([pair[0], pair[1], odd]);
      $("play-tools").innerHTML = "";
      $("play-board").innerHTML =
        '<p class="round-mark">' + (round + 1) + " / " + total + "</p>" +
        '<div class="choice-grid" style="grid-template-columns:repeat(3,1fr)" id="g3-grid">' +
        cards.map(picCardHTML).join("") + "</div>";
      $("play-actions").innerHTML = "";
      $("g3-grid").onclick = function (e) {
        var say = e.target.closest(".say-btn");
        if (say) {
          speakCard(say);
          return;
        }
        var c = e.target.closest(".choice");
        if (!c) return;
        var w = word(c.getAttribute("data-id"));
        if (!w.l) {
          c.classList.add("good");
          addScore(1);
          fb(w.en, true);
          round++;
          later(function () {
            if (round >= total) showResult("完成", "能把 d 开头分开了。", startG3);
            else deal();
          }, 700);
        } else {
          c.classList.add("bad");
          fb("再找", false);
        }
      };
      fb("");
    }
    deal();
  }

  function startG4() {
    var selected = L.vocab.map(function (w) { return w.id; });
    var pool = L.vocab.slice();

    function setup() {
      $("play-tools").innerHTML = "";
      $("play-board").innerHTML =
        '<p class="round-mark">选本局单词</p>' +
        wordPickerHTML(selected, pool);
      $("play-actions").innerHTML = '<button type="button" class="btn btn-apple" id="g4-go">开始记忆</button>';
      bindPicker(selected);
      $("g4-go").onclick = function () {
        var words = pickedWords(selected, pool);
        if (words.length < 2) {
          fb("至少选两个单词", false);
          return;
        }
        playRound(words);
      };
      fb("");
    }

    function playRound(words) {
      var items = words.map(function (w) {
        return [
          { key: w.id, kind: "pic", html: '<img src="' + w.img + '" alt="">' },
          { key: w.id, kind: "word", html: "<b>" + w.onset + "</b>" + w.rest }
        ];
      });
      var deck = shuffle(items.reduce(function (a, b) { return a.concat(b); }, []));
      var first = null, lock = false, matched = 0, phase = "preview";
      var cols = words.length <= 2 ? 2 : words.length === 3 ? 3 : 4;
      $("play-tools").innerHTML = "";
      $("play-board").innerHTML = '<div class="memory-grid" id="g4-grid" style="grid-template-columns:repeat(' + cols + ',1fr)"></div>';
      $("play-actions").innerHTML = '<button type="button" class="btn btn-apple" id="g4-start">记住了，开始配对</button>';
      var grid = $("g4-grid");
      deck.forEach(function (card, idx) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "mem-card preview";
        b.dataset.idx = String(idx);
        b.innerHTML = card.html;
        grid.appendChild(b);
      });
      fb("看清位置");

      function hideAll() {
        phase = "play";
        Array.prototype.forEach.call(grid.children, function (b) {
          b.classList.remove("preview", "face");
          b.innerHTML = "";
        });
        $("play-actions").innerHTML = "";
        fb("翻开一张图、一张词");
      }
      $("g4-start").onclick = hideAll;

      grid.onclick = function (e) {
        if (phase !== "play") return;
        var b = e.target.closest(".mem-card");
        if (!b || lock || b.classList.contains("face") || b.classList.contains("matched") || b === first) return;
        var card = deck[Number(b.dataset.idx)];
        b.classList.add("face");
        b.innerHTML = card.html;
        if (!first) { first = b; return; }
        lock = true;
        var c1 = deck[Number(first.dataset.idx)];
        if (c1.key === card.key && c1.kind !== card.kind) {
          addScore(2);
          fb("一对", true);
          later(function () {
            first.classList.add("matched");
            b.classList.add("matched");
            first = null;
            lock = false;
            matched++;
            if (matched >= words.length) showResult("完成", "位置都记住了。", startG4);
          }, 400);
        } else {
          fb("不是一对", false);
          later(function () {
            first.classList.remove("face");
            b.classList.remove("face");
            first.innerHTML = "";
            b.innerHTML = "";
            first = null;
            lock = false;
          }, 650);
        }
      };
    }
    setup();
  }

  function startG5() {
    var n = 0;
    var items = L.track05Items;
    var answered = false;
    function ask() {
      answered = false;
      var it = items[n];
      var w = word(it.id);
      $("play-tools").innerHTML = '<button type="button" class="btn btn-apple" id="g5-hear">听</button>';
      $("play-board").innerHTML =
        '<div class="play-stage">' +
          '<div class="apple-trail">' +
          items.map(function (_, k) {
            return "<i class=\"" + (k < n ? "done" : k === n ? "now" : "") + "\"></i>";
          }).join("") + "</div>" +
          '<div class="g5-pic"><img src="' + w.img + '" alt=""></div>' +
          '<div id="g5-word"></div>' +
          '<div class="big-choice" id="g5-choice">' +
            '<button type="button" class="btn btn-leaf" data-bb="1">Ll</button>' +
            '<button type="button" class="btn btn-apple" data-bb="0">✗</button>' +
          "</div>" +
        "</div>";
      $("play-actions").innerHTML = "";
      function play() {
        AAAudio.playClip(L.tracks.t05, it.start, it.end).catch(function () {
          AAAudio.speakWord(w.en);
        });
      }
      $("g5-hear").onclick = play;
      $("g5-choice").onclick = function (e) {
        if (answered) return;
        var b = e.target.closest("button[data-bb]");
        if (!b) return;
        var chooseLl = b.getAttribute("data-bb") === "1";
        if (chooseLl !== it.writeLl) {
          fb("再听开头音", false);
          play();
          return;
        }
        answered = true;
        addScore(1);
        $("play-tools").innerHTML = "";
        $("g5-choice").classList.add("hidden");
        $("g5-word").innerHTML =
          '<div class="giant-word"><b>' + w.onset + "</b>" + w.rest + "</div>";
        fb(it.writeLl ? "写 Ll" : "打叉", true);
        $("play-actions").innerHTML = '<button type="button" class="btn btn-apple" id="g5-next">下一题</button>';
        $("g5-next").onclick = function () {
          n++;
          if (n >= items.length) showResult("完成", "六道听音都做完了。", startG5);
          else ask();
        };
      };
      fb((n + 1) + " / " + items.length);
      play();
    }
    ask();
  }

  function startG6() {
    var order = L.chantOrder.slice();
    var slots = [null, null, null, null];
    var pool = shuffle(order.slice());

    $("play-tools").innerHTML =
      '<button type="button" class="btn btn-apple" id="g6-chant">听歌</button>' +
      '<button type="button" class="btn btn-ghost" id="g6-reset">重排</button>';
    $("play-board").innerHTML =
      '<div class="chant-row" id="g6-slots"></div>' +
      '<div class="chant-row" id="g6-pool"></div>';
    $("play-actions").innerHTML = '<button type="button" class="btn btn-leaf" id="g6-check">检查</button>';

    $("g6-chant").onclick = function () { AAAudio.playChant(); };
    $("g6-reset").onclick = startG6;
    $("g6-check").onclick = check;

    function paint() {
      var slotBox = $("g6-slots");
      var poolBox = $("g6-pool");
      slotBox.innerHTML = "";
      poolBox.innerHTML = "";
      slots.forEach(function (id, idx) {
        var w = id ? word(id) : null;
        slotBox.insertAdjacentHTML("beforeend",
          '<button type="button" class="chant-slot" data-slot="' + idx + '">' +
          (w ? '<img src="' + w.img + '" alt="">' : "<div>" + (idx + 1) + "</div>") +
          "</button>");
      });
      pool.forEach(function (id) {
        var w = word(id);
        poolBox.insertAdjacentHTML("beforeend",
          '<button type="button" class="chant-tile" data-id="' + id + '"><img src="' + w.img + '" alt=""></button>');
      });
    }

    $("g6-pool").onclick = function (e) {
      var t = e.target.closest(".chant-tile");
      if (!t) return;
      var id = t.getAttribute("data-id");
      var empty = slots.indexOf(null);
      if (empty < 0) return;
      slots[empty] = id;
      pool = pool.filter(function (x) { return x !== id; });
      paint();
    };
    $("g6-slots").onclick = function (e) {
      var t = e.target.closest(".chant-slot");
      if (!t) return;
      var idx = Number(t.getAttribute("data-slot"));
      if (!slots[idx]) return;
      pool.push(slots[idx]);
      slots[idx] = null;
      paint();
    };

    function check() {
      var ok = slots.every(function (id, n) { return id === order[n]; });
      if (ok) {
        addScore(4);
        fb("顺序对了", true);
        showResult("完成", "leaf, leg, lamp, lion", startG6);
      } else {
        fb("再听，按歌曲顺序排", false);
      }
    }

    paint();
    fb("听歌时可继续排队");
    AAAudio.playFile(L.tracks.t06);
  }

  function startG7() {
    var selected = L.vocab.map(function (w) { return w.id; });
    var lettersPool = ["a", "b", "c", "d"];

    function setup() {
      $("play-tools").innerHTML = "";
      $("play-board").innerHTML =
        '<p class="round-mark">选本局单词</p>' +
        wordPickerHTML(selected, L.vocab);
      $("play-actions").innerHTML = '<button type="button" class="btn btn-apple" id="g7-go">开始</button>';
      bindPicker(selected);
      $("g7-go").onclick = function () {
        var words = shuffle(pickedWords(selected, L.vocab));
        playQueue(words);
      };
      fb("");
    }

    function playQueue(words) {
      var n = 0;
      var locked = false;
      function ask() {
        locked = false;
        var w = words[n];
        var choices = shuffle([w.onset].concat(lettersPool.filter(function (ch) { return ch !== w.onset; })).slice(0, 4));
        $("play-tools").innerHTML = '<button type="button" class="btn btn-apple" id="g7-hear">听</button>';
        $("play-board").innerHTML =
          '<div class="play-stage">' +
            '<p class="round-mark">' + (n + 1) + " / " + words.length + "</p>" +
            '<div class="g5-pic"><img src="' + w.img + '" alt=""></div>' +
            '<div class="blank-word" id="g7-blank"><span class="hole"></span>' + w.rest + "</div>" +
            '<div class="onset-row" id="g7-letters">' +
            choices.map(function (ch) {
              return '<button type="button" class="onset-btn" data-ch="' + ch + '">' + ch + "</button>";
            }).join("") + "</div>" +
          "</div>";
        $("play-actions").innerHTML = "";
        $("g7-hear").onclick = function () { playWordClip(w); };
        $("g7-letters").onclick = function (e) {
          if (locked) return;
          var b = e.target.closest(".onset-btn");
          if (!b) return;
          var ch = b.getAttribute("data-ch");
          if (ch !== w.onset) {
            b.classList.add("bad");
            fb("再听", false);
            playWordClip(w);
            return;
          }
          locked = true;
          b.classList.add("good");
          addScore(1);
          $("g7-blank").innerHTML = '<span class="hole">' + w.onset + "</span>" + w.rest;
          later(function () {
            $("g7-letters").classList.add("hidden");
            $("play-tools").innerHTML = "";
            $("g7-blank").innerHTML = '<div class="giant-word"><b>' + w.onset + "</b>" + w.rest + "</div>";
            fb("", true);
            $("play-actions").innerHTML = '<button type="button" class="btn btn-apple" id="g7-next">下一个</button>';
            $("g7-next").onclick = function () {
              n++;
              if (n >= words.length) showResult("完成", "会填开头字母了。", startG7);
              else ask();
            };
          }, 280);
        };
        fb("");
        playWordClip(w);
      }
      ask();
    }
    setup();
  }
})();
