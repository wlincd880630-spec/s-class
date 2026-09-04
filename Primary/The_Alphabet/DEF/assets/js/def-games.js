(function () {
  "use strict";
  var L = window.DEF_REVIEW;

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
    var box = $("play");
    var picked = {};
    box.innerHTML = L.sameSoundBoxes.map(function (b, bi) {
      return '<div class="sound-box-game is-' + b.tone + '"><p>框 ' + (bi + 1) + '：圈出两个相同开头音的图</p>' +
        b.pics.map(function (id) {
          return '<button type="button" class="pic-btn" data-box="' + bi + '" data-id="' + id + '"><img src="' + w(id).img + '" alt=""></button>';
        }).join("") + "</div>";
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
      $("play").innerHTML = '<p>听单词，点正确字母（' + (i + 1) + "/" + rows.length + "）</p>" +
        '<figure><img src="' + item.img + '" alt="" style="max-width:220px"></figure>' +
        '<div class="letter-pick">' + ["D", "E", "F"].map(function (ch) {
          return '<button type="button" class="btn btn-leaf" data-cap="' + ch + '">' + ch + "</button>";
        }).join("") + '</div><p class="feedback" id="play-fb"></p>';
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
    $("play").innerHTML = '<div class="wb-check-game"></div><p class="feedback" id="play-fb"></p><button type="button" class="btn btn-apple" id="check">检查</button>';
    var grid = $("play").querySelector(".wb-check-game");
    grid.innerHTML = L.wbSoundCheck.map(function (row, ri) {
      return '<div class="wb-check-row"><b>' + row.letter + "</b>" +
        row.pics.map(function (id, pi) {
          return '<button type="button" class="wb-check-btn" data-r="' + ri + '" data-p="' + pi + '"><img src="' + w(id).img + '" alt=""></button>';
        }).join("") + "</div>";
    }).join("");
    grid.querySelectorAll(".wb-check-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ri = btn.getAttribute("data-r");
        var pi = btn.getAttribute("data-p");
        var key = ri + ":" + pi;
        picked[key] = !picked[key];
        btn.classList.toggle("is-on", !!picked[key]);
        AAAudio.speakWord(w(L.wbSoundCheck[ri].pics[pi]).en, true);
      });
    });
    $("check").onclick = function () {
      var ok = L.wbSoundCheck.every(function (row, ri) {
        return row.pics.every(function (id, pi) {
          return !!picked[ri + ":" + pi] === row.answers[pi];
        });
      });
      $("play-fb").textContent = ok ? "全对！" : "只给开头音对的图打勾。";
      $("play-fb").className = "feedback " + (ok ? "ok" : "no");
    };
  }

  function game4() {
    $("play").innerHTML = '<p>听单词，选对应图形和字母</p><div id="shape-game"></div><p class="feedback" id="play-fb"></p>';
    var i = 0;
    var rows = L.wbShapeWrite.filter(function (r) { return !r.modeled; });
    function next() {
      if (i >= rows.length) {
        $("play-fb").textContent = "完成！";
        $("play-fb").className = "feedback ok";
        return;
      }
      var row = rows[i];
      var item = w(row.pic);
      var box = $("shape-game");
      box.innerHTML = '<figure><img src="' + item.img + '" alt="" style="max-width:180px"></figure>' +
        '<div class="shape-pick">' +
        ["circle", "square", "triangle"].map(function (s) {
          return '<button type="button" class="btn btn-leaf" data-shape="' + s + '">' +
            ({ circle: "○ Dd", square: "□ Ee", triangle: "△ Ff" }[s]) + "</button>";
        }).join("") + "</div>";
      AAAudio.speakWord(item.en, true);
      box.querySelectorAll("[data-shape]").forEach(function (btn) {
        btn.onclick = function () {
          if (btn.getAttribute("data-shape") === row.shape) { i++; setTimeout(next, 500); }
          else { $("play-fb").textContent = "再想想图形哦"; $("play-fb").className = "feedback no"; }
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
})();
