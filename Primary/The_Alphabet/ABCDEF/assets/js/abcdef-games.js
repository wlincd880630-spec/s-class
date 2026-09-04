(function () {
  "use strict";
  var L = window.ABCDEF_REVIEW;

  function $(id) { return document.getElementById(id); }
  function w(id) { return L.words[id]; }

  function hub() {
    var grid = $("hub-grid");
    if (!grid) return;
    grid.innerHTML = L.games.map(function (g) {
      return '<a class="game-card" href="game-' + g.id + '.html"><span class="n">' + g.id + "</span><h3>" + g.title + "</h3><p>" + g.desc + "</p></a>";
    }).join("");
  }

  function game1() {
    var i = 0;
    var rows = L.listenWriteRows.slice();
    function next() {
      if (i >= rows.length) return;
      var row = rows[i];
      $("play").innerHTML = '<p>听单词，点正确的图（' + (i + 1) + "/" + rows.length + "）</p>" +
        '<div class="pic-row">' + row.pics.map(function (id) {
          return '<button type="button" class="pic-btn" data-id="' + id + '"><img src="' + w(id).img + '" alt=""></button>';
        }).join("") + '</div><p class="feedback" id="play-fb"></p>';
      AAAudio.speakWord(w(row.answer).en, true);
      $("play").querySelectorAll(".pic-btn").forEach(function (btn) {
        btn.onclick = function () {
          var ok = btn.getAttribute("data-id") === row.answer;
          $("play-fb").textContent = ok ? "对了！写 " + row.letters : "再听听";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; setTimeout(next, 700); }
        };
      });
    }
    next();
  }

  function game2() {
    var i = 0;
    function next() {
      if (i >= L.sameSoundFaces.length) return;
      var row = L.sameSoundFaces[i];
      $("play").innerHTML = '<p>这两个词开头音一样吗？（' + (i + 1) + "/" + L.sameSoundFaces.length + "）</p>" +
        '<figure><img src="' + w(row.pic).img + '" alt="" style="max-width:200px"></figure>' +
        '<div class="letter-pick"><button type="button" class="btn btn-leaf" data-y="1">😊 一样</button>' +
        '<button type="button" class="btn btn-leaf" data-y="0">☹️ 不一样</button></div><p class="feedback" id="play-fb"></p>';
      AAAudio.speakWord(w(row.pair[0]).en, true).then(function () {
        return AAAudio.speakWord(w(row.pair[1]).en, true);
      });
      $("play").querySelectorAll("[data-y]").forEach(function (btn) {
        btn.onclick = function () {
          var ok = (btn.getAttribute("data-y") === "1") === row.same;
          $("play-fb").textContent = ok ? "对了！" : "再听听";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; setTimeout(next, 600); }
        };
      });
    }
    next();
  }

  function game3() {
    $("play").innerHTML = '<p>按顺序点：大写 → 两张图 → 小写</p><div id="ms-game"></div><p class="feedback" id="play-fb"></p>';
    var row = 0;
    var step = 0;
    var box = $("ms-game");
    box.innerHTML = L.matchSay.map(function (r, i) {
      return '<div class="tm-row" data-i="' + i + '"><button type="button" class="tm-cap" data-i="' + i + '">' + r.cap + "</button>" +
        r.pics.map(function (id, pi) {
          return '<button type="button" class="tm-pic" data-i="' + i + '" data-pi="' + pi + '"><img src="' + w(id).img + '" alt=""></button>';
        }).join("") +
        '<button type="button" class="tm-sm" data-i="' + i + '">' + r.small + "</button></div>";
    }).join("");
    function bind(cls, expect) {
      box.querySelectorAll("." + cls).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var i = Number(btn.getAttribute("data-i"));
          if (i !== row || expect !== step) {
            $("play-fb").textContent = "按 C→图→图→c 的顺序哦";
            $("play-fb").className = "feedback no";
            return;
          }
          btn.classList.add("good");
          step++;
          if (step === 4) { row++; step = 0; }
          if (row >= L.matchSay.length) {
            $("play-fb").textContent = "完成！";
            $("play-fb").className = "feedback ok";
          }
        });
      });
    }
    bind("tm-cap", 0);
    bind("tm-pic", 1);
    bind("tm-pic", 2);
    bind("tm-sm", 3);
  }

  function game4() {
    var pos = 0;
    var letters = ["A", "B", "C", "D", "E", "F"];
    $("play").innerHTML = '<p>转字母，走到下一个对应图</p><div class="board-mini" id="board"></div>' +
      '<button type="button" class="btn btn-apple" id="spin">转一下</button><p class="feedback" id="play-fb"></p>';
    var board = $("board");
    board.innerHTML = L.boardPath.map(function (id, i) {
      return '<div class="board-cell' + (i === pos ? " is-here" : "") + '" data-i="' + i + '"><img src="' + w(id).img + '" alt=""></div>';
    }).join("");
    $("spin").onclick = function () {
      var letter = letters[Math.floor(Math.random() * letters.length)];
      var target = letter.toLowerCase();
      var found = -1;
      for (var j = pos + 1; j < L.boardPath.length; j++) {
        if (w(L.boardPath[j]).letter === target) { found = j; break; }
      }
      if (found < 0) {
        $("play-fb").textContent = "转到 " + letter + "，前面没有对应图了";
        $("play-fb").className = "feedback no";
        return;
      }
      pos = found;
      board.querySelectorAll(".board-cell").forEach(function (c) {
        c.classList.toggle("is-here", Number(c.getAttribute("data-i")) === pos);
      });
      $("play-fb").textContent = "转到 " + letter + "，走到 " + w(L.boardPath[pos]).en;
      $("play-fb").className = "feedback ok";
      if (pos >= L.boardPath.length - 1) {
        $("play-fb").textContent = "到终点啦！";
      }
    };
  }

  function game5() {
    var picked = {};
    $("play").innerHTML = '<div class="wb-grid-game"></div><p class="feedback" id="play-fb"></p><button type="button" class="btn btn-apple" id="check">检查</button>';
    var grid = $("play").querySelector(".wb-grid-game");
    grid.innerHTML = L.wbCircleSound.map(function (row) {
      var item = w(row.pic);
      return '<div class="wb-cell-game"><img src="' + item.img + '" alt=""><div class="wb-ch">' +
        row.choices.map(function (ch) {
          return '<button type="button" data-id="' + row.pic + '" data-ch="' + ch + '">' + ch + "</button>";
        }).join("") + "</div></div>";
    }).join("");
    grid.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        picked[btn.getAttribute("data-id")] = btn.getAttribute("data-ch");
        btn.parentElement.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-on"); });
        btn.classList.add("is-on");
        AAAudio.speakWord(w(btn.getAttribute("data-id")).en, true);
      });
    });
    $("check").onclick = function () {
      var ok = L.wbCircleSound.every(function (row) { return picked[row.pic] === row.answer; });
      $("play-fb").textContent = ok ? "全对！" : "再听听每个词的开头音。";
      $("play-fb").className = "feedback " + (ok ? "ok" : "no");
    };
  }

  function game6() {
    var symMap = {};
    L.symbolKey.forEach(function (k) { symMap[k.sym] = k.letter; });
    var i = 0;
    function next() {
      if (i >= L.symbolWrite.length) return;
      var row = L.symbolWrite[i];
      $("play").innerHTML = '<p>写出符号代表的字母（' + (i + 1) + "/" + L.symbolWrite.length + "）</p>" +
        '<p class="sym-big">' + row.sym + "</p>" +
        '<div class="letter-pick">' + ["A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f"].map(function (ch) {
          return '<button type="button" class="btn btn-leaf" data-ch="' + ch + '">' + ch + "</button>";
        }).join("") + '</div><p class="feedback" id="play-fb"></p>';
      $("play").querySelectorAll("[data-ch]").forEach(function (btn) {
        btn.onclick = function () {
          var ok = btn.getAttribute("data-ch") === row.letter;
          $("play-fb").textContent = ok ? "对了！" : "看看符号表";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; setTimeout(next, 500); }
        };
      });
    }
    next();
  }

  var gid = Number((document.body && document.body.getAttribute("data-game")) || 0);
  if ($("hub-grid")) hub();
  if (gid === 1) game1();
  if (gid === 2) game2();
  if (gid === 3) game3();
  if (gid === 4) game4();
  if (gid === 5) game5();
  if (gid === 6) game6();
})();
