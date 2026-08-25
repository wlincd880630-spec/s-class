(function (global) {
  "use strict";

  var GAMES = [
    { id: "pop", title: "音素泡泡", desc: "听到音素，点破正确字母泡泡", icon: "🫧" },
    { id: "pic", title: "听音选图", desc: "声音先行：先听词，再选 3D 图", icon: "🖼️" },
    { id: "blend", title: "拼读积木", desc: "按顺序点字母，滑读成词", icon: "🧱" },
    { id: "segment", title: "切音小火车", desc: "数一数这个词有几个音素", icon: "🚂" },
    { id: "memory", title: "奇形词翻翻乐", desc: "Heart words 配对记忆", icon: "🃏" },
    { id: "match", title: "字母组合对对碰", desc: "grapheme 对 IPA", icon: "🔗" },
    { id: "maze", title: "迷宫拼词", desc: "按拼写顺序点亮字母路", icon: "🌀" },
    { id: "clap", title: "拍音节奏", desc: "跟着节拍点出每一个音", icon: "👏" },
    { id: "spin", title: "转盘快问", desc: "随机题型综合复习", icon: "🎡" }
  ];

  var state = {
    game: "pop",
    stage: 1,
    diff: "easy",
    score: 0,
    lives: 3,
    round: 0,
    target: null
  };

  function $(id) {
    return document.getElementById(id);
  }

  function poolWords() {
    var max = state.stage;
    if (state.diff === "easy") max = Math.min(2, state.stage);
    if (state.diff === "hard") max = Math.max(state.stage, 4);
    var list = phonicsWordsUpTo(max);
    if (list.length < 4) list = PHONICS_WORDS.slice();
    return list;
  }

  function poolPhonemes() {
    return PHONEME_LIST.filter(function (p) {
      return p.stage <= state.stage;
    });
  }

  function hud() {
    $("hud").innerHTML =
      "<span>得分 <b>" +
      state.score +
      "</b></span><span>关卡 " +
      state.round +
      "</span><span>❤️ " +
      state.lives +
      "</span>";
  }

  function win() {
    state.score += 10;
    state.round += 1;
    Lab.toast("太棒了 +10");
    hud();
    setTimeout(runGame, 550);
  }

  function lose() {
    state.lives -= 1;
    Lab.toast("再试一次");
    hud();
    if (state.lives <= 0) {
      $("board").innerHTML =
        "<div style=\"text-align:center;padding:2rem\"><img class=\"pic md\" style=\"margin:0 auto 1rem\" src=\"assets/img/mascot.jpg\" alt=\"\"><h2>本局结束</h2><p class=\"muted\">得分 " +
        state.score +
        "</p><div class=\"btn-row\" style=\"justify-content:center\"><button class=\"btn sun\" id=\"restart\" type=\"button\">再来一局</button></div></div>";
      $("restart").onclick = function () {
        state.score = 0;
        state.lives = 3;
        state.round = 0;
        runGame();
      };
      return true;
    }
    return false;
  }

  function runGame() {
    hud();
    var fn = {
      pop: gamePop,
      pic: gamePic,
      blend: gameBlend,
      segment: gameSegment,
      memory: gameMemory,
      match: gameMatch,
      maze: gameMaze,
      clap: gameClap,
      spin: gameSpin
    }[state.game];
    if (fn) fn();
  }

  function gamePop() {
    var list = Lab.pick(poolPhonemes(), 5);
    var answer = list[0];
    state.target = answer;
    $("prompt").textContent = "听音素，点破带有这个音的泡泡 · " + answer.ipaDisplay;
    $("board").innerHTML = "<div class=\"bubbles\" id=\"bubbles\"></div>";
    var colors = ["#fb5607", "#2a9d8f", "#4361ee", "#7b2cbf", "#ffb703", "#e63946"];
    list.forEach(function (p, i) {
      var b = document.createElement("button");
      b.className = "bubble";
      b.textContent = p.graphemes[0];
      b.style.left = 8 + (i * 18) % 78 + "%";
      b.style.top = 12 + (i % 3) * 28 + "%";
      b.style.background = colors[i % colors.length];
      b.onclick = function () {
        if (p.id === answer.id) {
          Lab.playPhoneme(p.id);
          win();
        } else if (!lose()) {
          Lab.playPhoneme(p.id);
        }
      };
      $("bubbles").appendChild(b);
    });
    Lab.playPhoneme(answer.id);
  }

  function gamePic() {
    var words = Lab.pick(poolWords(), 4);
    var answer = words[0];
    words = Lab.shuffle(words);
    state.target = answer;
    $("prompt").textContent = "声音先行：先听单词，再选对的图（不显示英文）。音标 " + answer.ipa;
    $("board").innerHTML = "<div class=\"choice-grid\" id=\"pics\"></div>";
    words.forEach(function (w) {
      var b = document.createElement("button");
      b.className = "choice";
      b.innerHTML = "<img src=\"" + Lab.img(w.img) + "\" alt=\"\"><span class=\"muted\">?</span>";
      b.onclick = function () {
        if (w.word === answer.word) {
          b.innerHTML = "<img src=\"" + Lab.img(w.img) + "\" alt=\"\"><strong>" + w.word + " " + w.ipa + "</strong>";
          b.classList.add("good");
          Lab.playWord(w.word);
          win();
        } else {
          b.classList.add("bad");
          if (!lose()) Lab.playWord(answer.word);
        }
      };
      $("pics").appendChild(b);
    });
    Lab.playWord(answer.word);
  }

  function gameBlend() {
    var w = Lab.pick(poolWords(), 1)[0];
    state.target = w;
    var letters = Lab.shuffle(w.graphemes.slice());
    var built = [];
    $("prompt").textContent = "按正确顺序点字母，拼出你听到的词";
    $("board").innerHTML =
      "<div style=\"text-align:center\"><img class=\"pic md\" style=\"margin:0 auto 0.8rem\" src=\"" +
      Lab.img(w.img) +
      "\" alt=\"\"><div class=\"ipa-xl\" id=\"built\">_ _ _</div><div class=\"tiles\" id=\"bank\"></div></div>";
    Lab.playBlend(w.phonemes, w.word);
    var bank = $("bank");
    letters.forEach(function (g, idx) {
      var t = document.createElement("button");
      t.className = "tile";
      t.textContent = g;
      t.onclick = function () {
        if (t.disabled) return;
        built.push(g);
        t.disabled = true;
        t.style.opacity = "0.4";
        $("built").textContent = built.join(" ");
        Lab.playPhoneme(w.phonemes[Math.min(built.length - 1, w.phonemes.length - 1)]);
        if (built.length === w.graphemes.length) {
          if (built.join("") === w.graphemes.join("")) {
            Lab.playWord(w.word);
            win();
          } else if (!lose()) {
            built = [];
            $("built").textContent = "_ _ _";
            bank.querySelectorAll("button").forEach(function (x) {
              x.disabled = false;
              x.style.opacity = "1";
            });
          }
        }
      };
      bank.appendChild(t);
    });
  }

  function gameSegment() {
    var w = Lab.pick(poolWords(), 1)[0];
    state.target = w;
    var n = w.phonemes.length;
    $("prompt").textContent = "这个词有几个音素？先听慢拼，再选数字。";
    $("board").innerHTML =
      "<div style=\"text-align:center\"><img class=\"pic md\" style=\"margin:0 auto 0.7rem\" src=\"" +
      Lab.img(w.img) +
      "\" alt=\"\"><div class=\"grapheme-xl\">" +
      w.word +
      "</div><p class=\"ipa\">" +
      w.ipa +
      "</p><div class=\"btn-row\" style=\"justify-content:center\" id=\"nums\"></div></div>";
    Lab.playBlend(w.phonemes, w.word);
    [2, 3, 4, 5].forEach(function (num) {
      var b = document.createElement("button");
      b.className = "btn ghost";
      b.textContent = num + " 个音";
      b.onclick = function () {
        if (num === n) win();
        else if (!lose()) Lab.playBlend(w.phonemes, w.word);
      };
      $("nums").appendChild(b);
    });
  }

  function gameMemory() {
    var list = Lab.pick(phonicsSightUpTo(state.stage), 4);
    if (list.length < 4) list = Lab.pick(PHONICS_SIGHT, 4);
    var cards = [];
    list.forEach(function (s) {
      cards.push({ kind: "en", text: s.word, pair: s.word, speak: s.word });
      cards.push({ kind: "zh", text: s.zh || s.ipa, pair: s.word, speak: s.word });
    });
    cards = Lab.shuffle(cards);
    var open = [];
    var locked = {};
    $("prompt").textContent = "翻开两张，配对英文奇形词和意思/音标";
    $("board").innerHTML = "<div class=\"choice-grid\" id=\"mem\"></div>";
    cards.forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "choice";
      b.style.minHeight = "88px";
      b.innerHTML = "<strong>?</strong>";
      b.onclick = function () {
        if (locked[i] || b._open) return;
        b._open = true;
        b.innerHTML = "<strong>" + c.text + "</strong>";
        Lab.playWord(c.speak);
        open.push({ i: i, c: c, el: b });
        if (open.length === 2) {
          var a = open[0], d = open[1];
          if (a.c.pair === d.c.pair && a.c.kind !== d.c.kind) {
            locked[a.i] = locked[d.i] = true;
            a.el.classList.add("good");
            d.el.classList.add("good");
            open = [];
            if (Object.keys(locked).length === cards.length) win();
          } else {
            setTimeout(function () {
              a.el._open = d.el._open = false;
              a.el.innerHTML = d.el.innerHTML = "<strong>?</strong>";
              open = [];
              lose();
            }, 650);
          }
        }
      };
      $("mem").appendChild(b);
    });
  }

  function gameMatch() {
    var ph = Lab.pick(poolPhonemes(), 4);
    var left = Lab.shuffle(ph.slice());
    var right = Lab.shuffle(ph.slice());
    var selected = null;
    var done = 0;
    $("prompt").textContent = "把字母组合连到正确的国际音标";
    $("board").innerHTML =
      "<div class=\"grid-2\"><div id=\"leftCol\"></div><div id=\"rightCol\"></div></div>";
    function col(items, key) {
      var box = key === "g" ? $("leftCol") : $("rightCol");
      items.forEach(function (p) {
        var b = document.createElement("button");
        b.className = "word-chip";
        b.style.width = "100%";
        b.style.marginBottom = "0.5rem";
        b.textContent = key === "g" ? p.graphemes[0] : p.ipaDisplay;
        b.onclick = function () {
          if (b.classList.contains("good")) return;
          if (!selected) {
            selected = { p: p, el: b, key: key };
            b.classList.add("active");
            Lab.playPhoneme(p.id);
            return;
          }
          if (selected.key === key) {
            selected.el.classList.remove("active");
            selected = { p: p, el: b, key: key };
            b.classList.add("active");
            return;
          }
          if (selected.p.id === p.id) {
            selected.el.classList.add("good");
            b.classList.add("good");
            selected.el.classList.remove("active");
            selected = null;
            done += 1;
            Lab.playPhoneme(p.id);
            if (done >= ph.length) win();
          } else {
            selected.el.classList.remove("active");
            selected = null;
            if (!lose()) Lab.playPhoneme(p.id);
          }
        };
        box.appendChild(b);
      });
    }
    col(left, "g");
    col(right, "i");
  }

  function gameMaze() {
    var w = Lab.pick(poolWords().filter(function (x) { return x.word.length <= 5; }), 1)[0];
    state.target = w;
    var path = w.word.split("");
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var cells = [];
    for (var i = 0; i < 16; i++) {
      cells.push(i < path.length ? path[i] : Lab.pick(alphabet, 1)[0]);
    }
    cells = Lab.shuffle(cells);
    var expect = 0;
    $("prompt").textContent = "按顺序点出 " + w.word + " 的每一个字母  " + w.ipa;
    $("board").innerHTML =
      "<div style=\"text-align:center\"><img class=\"pic sm\" style=\"margin:0 auto 0.6rem\" src=\"" +
      Lab.img(w.img) +
      "\" alt=\"\"><div class=\"choice-grid\" id=\"maze\"></div></div>";
    $("maze").style.gridTemplateColumns = "repeat(4,1fr)";
    cells.forEach(function (ch) {
      var b = document.createElement("button");
      b.className = "tile";
      b.style.width = "100%";
      b.textContent = ch;
      b.onclick = function () {
        if (ch === path[expect]) {
          b.classList.add("active");
          expect += 1;
          if (expect >= path.length) {
            Lab.playWord(w.word);
            win();
          }
        } else if (!lose()) {
          Lab.playWord(w.word);
        }
      };
      $("maze").appendChild(b);
    });
    Lab.playWord(w.word);
  }

  function gameClap() {
    var w = Lab.pick(poolWords(), 1)[0];
    state.target = w;
    var tapped = 0;
    $("prompt").textContent = "每听到一个音素就点一下鼓。目标：" + w.word + " " + w.ipa;
    $("board").innerHTML =
      "<div style=\"text-align:center\"><img class=\"pic md\" style=\"margin:0 auto\" src=\"" +
      Lab.img(w.img) +
      "\" alt=\"\"><p class=\"grapheme-xl\" id=\"clapN\">0</p><p class=\"muted\">已拍次数</p>" +
      "<div class=\"btn-row\" style=\"justify-content:center\">" +
      "<button class=\"btn coral\" id=\"drum\" type=\"button\">拍！</button>" +
      "<button class=\"btn teal\" id=\"hear\" type=\"button\">再听慢拼</button>" +
      "<button class=\"btn sun\" id=\"ok\" type=\"button\">我拍完了</button></div></div>";
    Lab.playBlend(w.phonemes, w.word);
    $("drum").onclick = function () {
      tapped += 1;
      $("clapN").textContent = String(tapped);
    };
    $("hear").onclick = function () {
      Lab.playBlend(w.phonemes, w.word);
    };
    $("ok").onclick = function () {
      if (tapped === w.phonemes.length) win();
      else if (!lose()) {
        tapped = 0;
        $("clapN").textContent = "0";
        Lab.playBlend(w.phonemes, w.word);
      }
    };
  }

  function gameSpin() {
    var kinds = ["pop", "pic", "blend", "segment"];
    var pick = Lab.pick(kinds, 1)[0];
    $("prompt").textContent = "转盘抽到：" + GAMES.filter(function (g) { return g.id === pick; })[0].title;
    var fn = { pop: gamePop, pic: gamePic, blend: gameBlend, segment: gameSegment }[pick];
    fn();
  }

  function renderLobby() {
    if (!$("lobby")) return;
    $("lobby").innerHTML = GAMES.map(function (g) {
      return (
        "<a class=\"card\" href=\"play.html?game=" +
        g.id +
        "&stage=" +
        (Lab.qs("stage") || "1") +
        "&diff=" +
        (Lab.qs("diff") || "easy") +
        "\"><div style=\"font-size:1.8rem\">" +
        g.icon +
        "</div><h3>" +
        g.title +
        "</h3><p class=\"muted\">" +
        g.desc +
        "</p></a>"
      );
    }).join("");
  }

  function initPlay() {
    state.game = Lab.qs("game", "pop");
    state.stage = parseInt(Lab.qs("stage", "1"), 10) || 1;
    state.diff = Lab.qs("diff", "easy");
    var meta = GAMES.filter(function (g) { return g.id === state.game; })[0] || GAMES[0];
    state.game = meta.id;
    $("gameTitle").textContent = meta.title;
    $("gameDesc").textContent = meta.desc + " · 阶段 " + state.stage + " · " + ({ easy: "简单", medium: "进阶", hard: "挑战" }[state.diff] || state.diff);
    $("replay").onclick = function () {
      if (state.target) {
        if (state.target.azureIpa) Lab.playPhoneme(state.target.id);
        else if (state.target.word) Lab.playWord(state.target.word);
      }
    };
    $("nextQ").onclick = runGame;
    runGame();
  }

  global.PhonicsGames = { GAMES: GAMES, renderLobby: renderLobby, initPlay: initPlay };
  document.addEventListener("DOMContentLoaded", function () {
    if (document.body.getAttribute("data-page") === "games-lobby") renderLobby();
    if (document.body.getAttribute("data-page") === "games-play") initPlay();
  });
})(typeof window !== "undefined" ? window : this);
