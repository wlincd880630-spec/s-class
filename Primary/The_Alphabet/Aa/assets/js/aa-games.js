(function () {
  "use strict";
  var L = window.AA_LESSON;
  var score = 0;
  var currentGame = 0;
  var replayFn = null;

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
    $("score-pill").textContent = "★ " + score;
  }
  function fb(text, ok) {
    var el = $("play-fb");
    el.textContent = text || "";
    el.className = "feedback" + (ok === true ? " ok" : ok === false ? " no" : "");
  }
  function showHub() {
    currentGame = 0;
    AAAudio.stop();
    $("hub").classList.remove("hidden");
    $("play").classList.add("hidden");
    $("result").classList.add("hidden");
    $("game-title").textContent = "六个巩固游戏";
    $("btn-back").href = "index.html";
    $("btn-back").onclick = null;
  }
  function showResult(title, msg, again) {
    $("result-title").textContent = title;
    $("result-msg").textContent = msg;
    $("result").classList.remove("hidden");
    replayFn = again;
  }
  function openGame(id) {
    currentGame = id;
    var meta = L.games[id - 1];
    $("hub").classList.add("hidden");
    $("play").classList.remove("hidden");
    $("result").classList.add("hidden");
    $("game-title").textContent = meta.title;
    $("play-lead").textContent = meta.en + " · " + meta.desc;
    $("btn-back").removeAttribute("href");
    $("btn-back").onclick = function (e) {
      e.preventDefault();
      showHub();
    };
    fb("");
    if (id === 1) startG1();
    if (id === 2) startG2();
    if (id === 3) startG3();
    if (id === 4) startG4();
    if (id === 5) startG5();
    if (id === 6) startG6();
  }

  $("hub-grid").innerHTML = L.games.map(function (g) {
    return (
      '<button type="button" class="game-card" data-id="' + g.id + '">' +
        '<div class="emoji">' + g.emoji + "</div>" +
        '<div class="kicker">Game ' + g.id + "</div>" +
        "<strong>" + g.title + "</strong>" +
        "<span>" + g.desc + "</span>" +
      "</button>"
    );
  }).join("");
  $("hub-grid").addEventListener("click", function (e) {
    var btn = e.target.closest(".game-card");
    if (btn) openGame(Number(btn.getAttribute("data-id")));
  });
  $("btn-hub").addEventListener("click", showHub);
  $("btn-replay").addEventListener("click", function () {
    $("result").classList.add("hidden");
    if (replayFn) replayFn();
  });

  /* —— 1 Beginning sound —— */
  function startG1() {
    var poolA = L.vocab.slice();
    var poolX = L.distractors.slice();
    var round = 0;
    var total = 3;
    var picked = {};

    function deal() {
      picked = {};
      var aWords = shuffle(poolA).slice(0, 4);
      var xWords = shuffle(poolX).slice(0, 4);
      var cards = shuffle(aWords.concat(xWords));
      $("play-tools").innerHTML =
        '<button type="button" class="btn btn-leaf" id="g1-sound">听开头音 /æ/</button>' +
        '<button type="button" class="btn btn-ghost" id="g1-prompt">听提示</button>';
      $("play-board").innerHTML =
        "<p style=\"margin:8px 0 10px;font-weight:700;\">第 " + (round + 1) + " / " + total +
        " 轮 · 点出所有 <em>beginning sound /æ/</em> 的图</p>" +
        '<div class="choice-grid" id="g1-grid">' +
        cards.map(function (w) {
          return '<button type="button" class="choice" data-id="' + w.id + '"><img src="' + w.img + '" alt="' + w.en + '"></button>';
        }).join("") + "</div>";
      $("play-actions").innerHTML = '<button type="button" class="btn btn-apple" id="g1-check">检查</button>';
      $("g1-sound").onclick = function () { AAAudio.speakPhoneme(); };
      $("g1-prompt").onclick = function () { AAAudio.speakBeginningPrompt(); };
      $("g1-grid").onclick = function (e) {
        var c = e.target.closest(".choice");
        if (!c) return;
        var id = c.getAttribute("data-id");
        if (picked[id]) {
          delete picked[id];
          c.classList.remove("on");
        } else {
          picked[id] = true;
          c.classList.add("on");
        }
      };
      $("g1-check").onclick = check;
      fb("先听 /æ/，再点图。可以点多张。");
      AAAudio.speakPhoneme();
    }

    function check() {
      var correct = 0, miss = 0, extra = 0;
      document.querySelectorAll("#g1-grid .choice").forEach(function (c) {
        var w = word(c.getAttribute("data-id"));
        var on = !!picked[w.id];
        c.classList.remove("on", "good", "bad");
        if (w.a && on) { c.classList.add("good"); correct++; }
        else if (w.a && !on) { c.classList.add("bad"); miss++; }
        else if (!w.a && on) { c.classList.add("bad"); extra++; }
      });
      if (miss === 0 && extra === 0) {
        addScore(4);
        fb("全对！这些都是 /æ/ 开头。", true);
        round++;
        setTimeout(function () {
          if (round >= total) showResult("开头音小侦探完成", "你能听出 angry apple 的 /æ/ 了。", startG1);
          else deal();
        }, 900);
      } else {
        fb("再看看：漏了 " + miss + " 个 /æ/ 词，多点了 " + extra + " 个。", false);
      }
    }
    deal();
  }

  /* —— 2 Listen, point, repeat —— */
  function startG2() {
    var queue = shuffle(L.vocab.concat(L.vocab));
    var i = 0;
    var locked = false;

    function ask() {
      locked = false;
      var target = queue[i];
      var opts = shuffle(L.vocab.slice());
      $("play-tools").innerHTML =
        '<button type="button" class="btn btn-apple" id="g2-hear">再听一次</button>' +
        '<button type="button" class="btn btn-leaf" id="g2-azure">Azure 慢速</button>';
      $("play-board").innerHTML =
        "<p style=\"font-weight:700;\">第 " + (i + 1) + " / " + queue.length + " 题 · 点出你听到的图</p>" +
        '<div class="choice-grid" id="g2-grid">' +
        opts.map(function (w) {
          return '<button type="button" class="choice" data-id="' + w.id + '"><img src="' + w.img + '" alt=""></button>';
        }).join("") + "</div>";
      $("play-actions").innerHTML = "";
      function play() {
        var clip = L.track04Clips[target.id];
        AAAudio.playClip(L.tracks.t04, clip[0], clip[1]).catch(function () {
          AAAudio.speakWord(target.en);
        });
      }
      $("g2-hear").onclick = play;
      $("g2-azure").onclick = function () { AAAudio.speakWord(target.en, true); };
      $("g2-grid").onclick = function (e) {
        if (locked) return;
        var c = e.target.closest(".choice");
        if (!c) return;
        locked = true;
        var id = c.getAttribute("data-id");
        if (id === target.id) {
          c.classList.add("good");
          addScore(1);
          fb("对！ " + target.en, true);
          AAAudio.speakWord(target.en).then(function () {
            i++;
            if (i >= queue.length) showResult("听点完成", "教材 Track 04 的四个词都会点了。", startG2);
            else ask();
          });
        } else {
          c.classList.add("bad");
          fb("再听一次。", false);
          locked = false;
          play();
        }
      };
      fb("");
      play();
    }
    ask();
  }

  /* —— 3 Odd one out —— */
  function startG3() {
    var round = 0, total = 6;
    function deal() {
      var pair = shuffle(L.vocab).slice(0, 2);
      var odd = shuffle(L.distractors)[0];
      var cards = shuffle([pair[0], pair[1], odd]);
      $("play-tools").innerHTML = '<button type="button" class="btn btn-leaf" id="g3-ae">听 /æ/</button>';
      $("play-board").innerHTML =
        "<p style=\"font-weight:700;\">第 " + (round + 1) + " / " + total + " · 谁的开头音不是 /æ/？</p>" +
        '<div class="choice-grid" style="grid-template-columns:repeat(3,1fr)" id="g3-grid">' +
        cards.map(function (w) {
          return '<button type="button" class="choice" data-id="' + w.id + '"><img src="' + w.img + '" alt=""></button>';
        }).join("") + "</div>";
      $("play-actions").innerHTML = "";
      $("g3-ae").onclick = function () { AAAudio.speakPhoneme(); };
      $("g3-grid").onclick = function (e) {
        var c = e.target.closest(".choice");
        if (!c) return;
        var w = word(c.getAttribute("data-id"));
        if (!w.a) {
          c.classList.add("good");
          addScore(1);
          fb(w.en + " 不是 /æ/ 开头。", true);
          AAAudio.speakWord(w.en);
          round++;
          setTimeout(function () {
            if (round >= total) showResult("局外人完成", "能把 /æ/ 和其他开头音分开了。", startG3);
            else deal();
          }, 800);
        } else {
          c.classList.add("bad");
          fb(w.en + " 是 /æ/ 开头，再找找。", false);
          AAAudio.speakWord(w.en);
        }
      };
      fb("");
    }
    deal();
  }

  /* —— 4 Memory —— */
  function startG4() {
    var items = L.vocab.map(function (w) {
      return [
        { key: w.id, kind: "pic", html: '<img src="' + w.img + '" alt="">' },
        { key: w.id, kind: "word", html: "<b>" + w.onset + "</b>" + w.rest }
      ];
    });
    var deck = shuffle(items.reduce(function (a, b) { return a.concat(b); }, []));
    var first = null;
    var lock = false;
    var matched = 0;
    $("play-tools").innerHTML = "";
    $("play-board").innerHTML = '<div class="memory-grid" id="g4-grid"></div>';
    $("play-actions").innerHTML = "";
    var grid = $("g4-grid");
    deck.forEach(function (card, idx) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "mem-card";
      b.dataset.idx = String(idx);
      b.textContent = "?";
      grid.appendChild(b);
    });
    grid.onclick = function (e) {
      var b = e.target.closest(".mem-card");
      if (!b || lock || b.classList.contains("face") || b.classList.contains("matched") || b === first) return;
      var card = deck[Number(b.dataset.idx)];
      b.classList.add("face");
      b.innerHTML = card.html;
      if (card.kind === "word") AAAudio.speakWord(word(card.key).en);
      if (!first) { first = b; return; }
      lock = true;
      var c1 = deck[Number(first.dataset.idx)];
      var c2 = card;
      if (c1.key === c2.key && c1.kind !== c2.kind) {
        addScore(2);
        fb("配对成功！", true);
        setTimeout(function () {
          first.classList.add("matched");
          b.classList.add("matched");
          first = null;
          lock = false;
          matched++;
          if (matched >= 4) showResult("翻牌完成", "四个 Aa 单词都配对了。", startG4);
        }, 450);
      } else {
        fb("不是一对，再试。", false);
        setTimeout(function () {
          first.classList.remove("face");
          b.classList.remove("face");
          first.textContent = "?";
          b.textContent = "?";
          first.innerHTML = "?";
          b.innerHTML = "?";
          first = null;
          lock = false;
        }, 700);
      }
    };
    fb("翻开一张图、一张词，配成一对。");
  }

  /* —— 5 Aa or X (Track 05) —— */
  function startG5() {
    var i = 0;
    var items = L.track05Items;
    function ask() {
      var it = items[i];
      var w = word(it.id);
      $("play-tools").innerHTML =
        '<button type="button" class="btn btn-apple" id="g5-hear">▶ 教材 Track 05 本题</button>' +
        '<button type="button" class="btn btn-leaf" id="g5-azure">Azure 再读</button>';
      $("play-board").innerHTML =
        '<div class="apple-trail">' +
        items.map(function (_, n) {
          return "<i class=\"" + (n < i ? "done" : n === i ? "now" : "") + "\"></i>";
        }).join("") + "</div>" +
        '<div class="mascot-wrap" style="max-width:260px;margin:0 auto;">' +
          '<img src="' + w.img + '" alt="">' +
        "</div>" +
        "<p style=\"text-align:center;font-weight:700;\">听一听：写 <em>Aa</em> 还是打叉？</p>" +
        '<div class="big-choice">' +
          '<button type="button" class="btn btn-leaf" data-aa="1">Aa</button>' +
          '<button type="button" class="btn btn-apple" data-aa="0">✗</button>' +
        "</div>";
      $("play-actions").innerHTML = "";
      function play() {
        AAAudio.playClip(L.tracks.t05, it.start, it.end).catch(function () {
          AAAudio.speakWord(w.en);
        });
      }
      $("g5-hear").onclick = play;
      $("g5-azure").onclick = function () { AAAudio.speakWord(w.en); };
      $("play-board").querySelector(".big-choice").onclick = function (e) {
        var b = e.target.closest("button[data-aa]");
        if (!b) return;
        var chooseAa = b.getAttribute("data-aa") === "1";
        if (chooseAa === it.writeAa) {
          addScore(1);
          fb(it.writeAa ? (w.en + " → 写 Aa") : (w.en + " → 打叉"), true);
          i++;
          setTimeout(function () {
            if (i >= items.length) showResult("Aa 或打叉完成", "这是教材 D 题：Track 05 的六个苹果。", startG5);
            else ask();
          }, 700);
        } else {
          fb("再听开头音。", false);
          play();
        }
      };
      fb("第 " + (i + 1) + " 个苹果");
      play();
    }
    $("play-lead").textContent = "教材 D · Disc 1 Track 05 · 是 /æ/ 写 Aa，不是就打叉。";
    ask();
  }

  /* —— 6 Chant order + Track 06 —— */
  function startG6() {
    var order = L.chantOrder.slice();
    var slots = [null, null, null, null];
    var pool = shuffle(order.slice());

    function render() {
      $("play-tools").innerHTML =
        '<button type="button" class="btn btn-apple" id="g6-chant">▶ 教材 Chant Track 06</button>' +
        '<button type="button" class="btn btn-ghost" id="g6-reset">清空重排</button>';
      $("play-board").innerHTML =
        "<p style=\"font-weight:700;\">听 chant，按 ant → apple → alligator → axe 点进空位。</p>" +
        '<div class="chant-row" id="g6-slots"></div>' +
        '<div class="chant-row" id="g6-pool"></div>';
      $("play-actions").innerHTML = '<button type="button" class="btn btn-leaf" id="g6-check">检查顺序</button>';
      var slotBox = $("g6-slots");
      slots.forEach(function (id, idx) {
        var w = id ? word(id) : null;
        slotBox.insertAdjacentHTML("beforeend",
          '<button type="button" class="chant-slot" data-slot="' + idx + '">' +
          (w ? '<img src="' + w.img + '" alt=""><div>' + w.en + "</div>" : "<div>" + (idx + 1) + "</div>") +
          "</button>");
      });
      var poolBox = $("g6-pool");
      pool.forEach(function (id) {
        var w = word(id);
        poolBox.insertAdjacentHTML("beforeend",
          '<button type="button" class="chant-tile" data-id="' + id + '"><img src="' + w.img + '" alt=""><div>' + w.en + "</div></button>");
      });
      $("g6-chant").onclick = function () { AAAudio.playFile(L.tracks.t06); };
      $("g6-reset").onclick = startG6;
      $("g6-check").onclick = check;
      poolBox.onclick = function (e) {
        var t = e.target.closest(".chant-tile");
        if (!t) return;
        var id = t.getAttribute("data-id");
        var empty = slots.indexOf(null);
        if (empty < 0) return;
        slots[empty] = id;
        pool = pool.filter(function (x) { return x !== id; });
        AAAudio.speakWord(word(id).en);
        render();
      };
      slotBox.onclick = function (e) {
        var t = e.target.closest(".chant-slot");
        if (!t) return;
        var idx = Number(t.getAttribute("data-slot"));
        if (!slots[idx]) return;
        pool.push(slots[idx]);
        slots[idx] = null;
        render();
      };
    }

    function check() {
      var ok = slots.every(function (id, n) { return id === order[n]; });
      if (ok) {
        addScore(4);
        fb("顺序对了！跟唱 Track 06。", true);
        AAAudio.playFile(L.tracks.t06).then(function () {
          showResult("Chant 完成", "ant, apple, alligator, axe!", startG6);
        });
      } else {
        fb("再听 chant，按跳格子的顺序排。", false);
        AAAudio.playFile(L.tracks.t06);
      }
    }
    render();
    fb("先点播放教材 chant。");
  }
})();
