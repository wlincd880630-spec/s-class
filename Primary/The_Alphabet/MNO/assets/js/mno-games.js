(function () {
  "use strict";
  var L = window.MNO_REVIEW;

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
      if (i >= rows.length) {
        $("play").innerHTML = '<p class="feedback ok">完成！</p>';
        return;
      }
      var row = rows[i];
      var item = w(row.pic);
      $("play").innerHTML = '<p>听单词，点正确字母（' + (i + 1) + "/" + rows.length + "）</p>" +
        '<figure><img src="' + item.img + '" alt="" style="max-width:220px"></figure>' +
        '<div class="letter-pick">' + ["M", "N", "O"].map(function (ch) {
          return '<button type="button" class="btn btn-leaf" data-cap="' + ch + '">' + ch + "</button>";
        }).join("") + '</div><p class="feedback" id="play-fb"></p>';
      AAAudio.speakWord(item.en, true);
      $("play").querySelectorAll("[data-cap]").forEach(function (btn) {
        btn.onclick = function () {
          var ok = btn.getAttribute("data-cap") === row.cap;
          $("play-fb").textContent = ok ? "对了！" : "再听听看";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; if (i < rows.length) setTimeout(next, 700); else setTimeout(next, 700); }
        };
      });
    }
    next();
  }

  function game3() {
    var picked = {};
    $("play").innerHTML = '<div class="wb-ghi-sound"></div><p class="feedback" id="play-fb"></p><button type="button" class="btn btn-apple" id="check">检查</button>';
    var grid = $("play").querySelector(".wb-ghi-sound");
    grid.innerHTML = L.wbBeginningSound.map(function (row, ri) {
      var item = w(row.pic);
      return '<div class="wb-ghi-row"><img src="' + item.img + '" alt="">' +
        ["m", "n", "o"].map(function (ch) {
          return '<button type="button" class="btn btn-ghost wb-ghi-opt" data-r="' + ri + '" data-ch="' + ch + '">' + ch + "</button>";
        }).join("") + "</div>";
    }).join("");
    grid.querySelectorAll(".wb-ghi-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ri = btn.getAttribute("data-r");
        grid.querySelectorAll('[data-r="' + ri + '"]').forEach(function (b) { b.classList.remove("is-on"); });
        btn.classList.add("is-on");
        picked[ri] = btn.getAttribute("data-ch");
        AAAudio.speakWord(w(L.wbBeginningSound[ri].pic).en, true);
      });
    });
    $("check").onclick = function () {
      var ok = L.wbBeginningSound.every(function (row, ri) {
        return picked[ri] === row.answer;
      });
      $("play-fb").textContent = ok ? "全对！" : "再听每个词的开头音。";
      $("play-fb").className = "feedback " + (ok ? "ok" : "no");
    };
  }

  function game4() {
    var tm = L.wbTraceMatch;
    $("play").innerHTML = '<p>把图片连到正确的大写和小写字母</p><div class="tm-game"></div><p class="feedback" id="play-fb"></p>';
    var box = $("play").querySelector(".tm-game");
    box.innerHTML =
      '<div class="tm-caps">' + tm.caps.map(function (ch) {
        return '<button type="button" class="btn btn-leaf" data-cap="' + ch + '">' + ch + "</button>";
      }).join("") + "</div>" +
      '<div class="tm-pics">' + tm.pics.map(function (id) {
        return '<figure><img src="' + w(id).img + '" alt=""><figcaption>' + w(id).en + "</figcaption></figure>";
      }).join("") + "</div>" +
      '<div class="tm-lows">' + tm.lowers.map(function (ch) {
        return '<button type="button" class="btn btn-ghost" data-low="' + ch + '">' + ch + "</button>";
      }).join("") + "</div>";
    var answers = tm.pairs;
    var lowers = {};
    Object.keys(answers).forEach(function (cap) {
      lowers[answers[cap]] = cap.toLowerCase();
    });
    box.querySelectorAll("[data-cap]").forEach(function (btn) {
      btn.onclick = function () {
        var cap = btn.getAttribute("data-cap");
        var pic = answers[cap];
        AAAudio.speakWord(w(pic).en, true);
        btn.classList.toggle("is-on");
      };
    });
    var hint = tm.caps.map(function (cap) {
      var pic = answers[cap];
      return cap + "–" + w(pic).en + "–" + cap.toLowerCase();
    }).join(" · ");
    $("play-fb").textContent = hint;
    $("play-fb").className = "feedback ok";
  }

  var gid = Number((document.body && document.body.getAttribute("data-game")) || 0);
  if ($("hub-grid")) hub();
  if (gid === 1) game1();
  if (gid === 2) game2();
  if (gid === 3) game3();
  if (gid === 4) game4();
})();
