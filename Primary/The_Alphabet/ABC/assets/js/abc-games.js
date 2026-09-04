(function () {
  "use strict";
  var L = window.ABC_REVIEW;

  function $(id) { return document.getElementById(id); }
  function w(id) { return L.words[id]; }

  function hub() {
    var grid = $("hub-grid");
    if (!grid) return;
    grid.innerHTML = L.games.map(function (g) {
      return (
        '<a class="game-card" href="game-' + g.id + '.html">' +
          '<span class="n">' + g.id + "</span>" +
          "<h3>" + g.title + "</h3>" +
          "<p>" + g.desc + "</p>" +
        "</a>"
      );
    }).join("");
  }

  function game1() {
    var box = $("play");
    var picked = {};
    box.innerHTML = L.sameSoundBoxes.map(function (b, bi) {
      return (
        '<div class="sound-box-game is-' + b.tone + '">' +
          '<p>框 ' + (bi + 1) + '：圈出两个相同开头音的图</p>' +
          b.pics.map(function (id) {
            return '<button type="button" class="pic-btn" data-box="' + bi + '" data-id="' + id + '"><img src="' + w(id).img + '" alt=""></button>';
          }).join("") +
        "</div>"
      );
    }).join("") + '<p class="feedback" id="play-fb"></p><button type="button" class="btn btn-apple" id="check">检查</button>';
    box.querySelectorAll(".pic-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var bi = btn.getAttribute("data-box");
        var id = btn.getAttribute("data-id");
        var key = bi + ":" + id;
        picked[key] = !picked[key];
        btn.classList.toggle("is-on", !!picked[key]);
        AAAudio.speakWord(w(id).en, true);
      });
    });
    $("check").onclick = function () {
      var ok = L.sameSoundBoxes.every(function (b, bi) {
        var sel = b.pics.filter(function (id) { return picked[bi + ":" + id]; });
        return sel.length === 2 && sel.every(function (id) { return b.answer.indexOf(id) !== -1; });
      });
      $("play-fb").textContent = ok ? "全对！" : "每一框要圈出两个相同开头音的图。";
      $("play-fb").className = "feedback " + (ok ? "ok" : "no");
    };
  }

  function game2() {
    var i = 0;
    var rows = L.listenCircle.slice();
    function next() {
      var row = rows[i];
      var item = w(row.pic);
      $("play").innerHTML =
        '<p>听单词，点正确字母（' + (i + 1) + "/" + rows.length + "）</p>" +
        '<figure><img src="' + item.img + '" alt="" style="max-width:220px"></figure>' +
        '<div class="letter-pick">' +
          ["A", "B", "C"].map(function (ch) {
            return '<button type="button" class="btn btn-leaf" data-cap="' + ch + '">' + ch + "</button>";
          }).join("") +
        "</div>" +
        '<p class="feedback" id="play-fb"></p>';
      AAAudio.speakWord(item.en, true);
      $("play").querySelectorAll("[data-cap]").forEach(function (btn) {
        btn.onclick = function () {
          var ok = btn.getAttribute("data-cap") === row.cap;
          $("play-fb").textContent = ok ? "对了！" : "再听听看";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; if (i < rows.length) setTimeout(next, 700); }
        };
      });
    }
    next();
  }

  function game3() {
    var picked = {};
    $("play").innerHTML = '<div class="wb-grid-game"></div><p class="feedback" id="play-fb"></p><button type="button" class="btn btn-apple" id="check">检查</button>';
    var grid = $("play").querySelector(".wb-grid-game");
    grid.innerHTML = L.wbSoundGrid.map(function (id) {
      var item = w(id);
      return (
        '<div class="wb-cell-game">' +
        '<img src="' + item.img + '" alt="">' +
        '<div class="wb-ch">' +
          ["a", "b", "c"].map(function (ch) {
            return '<button type="button" data-id="' + id + '" data-ch="' + ch + '">' + ch + "</button>";
          }).join("") +
        "</div></div>"
      );
    }).join("");
    grid.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var ch = btn.getAttribute("data-ch");
        picked[id] = ch;
        btn.parentElement.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-on"); });
        btn.classList.add("is-on");
        AAAudio.speakWord(w(id).en, true);
      });
    });
    $("check").onclick = function () {
      var ok = L.wbSoundGrid.every(function (id) { return picked[id] === w(id).letter; });
      $("play-fb").textContent = ok ? "全对！" : "再听听每个词的开头音。";
      $("play-fb").className = "feedback " + (ok ? "ok" : "no");
    };
  }

  function game4() {
    $("play").innerHTML = '<p>按顺序点：大写 → 图 → 小写</p><div id="tm-game"></div><p class="feedback" id="play-fb"></p>';
    var step = 0;
    var row = 0;
    var box = $("tm-game");
    box.innerHTML = L.wbTraceMatch.map(function (r, i) {
      var item = w(r.pic);
      return (
        '<div class="tm-row" data-i="' + i + '">' +
        '<button type="button" class="tm-cap" data-i="' + i + '">' + r.cap + "</button>" +
        '<button type="button" class="tm-pic" data-i="' + i + '"><img src="' + item.img + '" alt=""></button>' +
        '<button type="button" class="tm-sm" data-i="' + i + '">' + r.small + "</button>" +
        "</div>"
      );
    }).join("");
    function bind(cls, expect) {
      box.querySelectorAll("." + cls).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var i = Number(btn.getAttribute("data-i"));
          var ok = i === row && expect === step;
          if (!ok) { $("play-fb").textContent = "按 A→图→a 的顺序哦"; $("play-fb").className = "feedback no"; return; }
          btn.classList.add("good");
          step++;
          if (step === 3) { row++; step = 0; }
          if (row >= L.wbTraceMatch.length) {
            $("play-fb").textContent = "完成！";
            $("play-fb").className = "feedback ok";
          }
        });
      });
    }
    bind("tm-cap", 0);
    bind("tm-pic", 1);
    bind("tm-sm", 2);
  }

  var gid = Number((document.body && document.body.getAttribute("data-game")) || 0);
  if ($("hub-grid")) hub();
  if (gid === 1) game1();
  if (gid === 2) game2();
  if (gid === 3) game3();
  if (gid === 4) game4();
})();
