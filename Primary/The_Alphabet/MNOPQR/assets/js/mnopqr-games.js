(function () {
  "use strict";
  var L = window.MNOPQR_REVIEW;

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
    var rows = L.listenCircleWrite.slice();
    function next() {
      if (i >= rows.length) {
        $("play").innerHTML = '<p class="feedback ok">完成！</p>';
        return;
      }
      var row = rows[i];
      var picId = row.pics[0];
      var item = w(picId);
      var answer = row.answers[0];
      $("play").innerHTML = '<p>听单词，点正确字母（第 ' + (i + 1) + " 行第 1 图 · " + (i + 1) + "/" + rows.length + "）</p>" +
        '<figure><img src="' + item.img + '" alt="" style="max-width:220px"></figure>' +
        '<div class="letter-pick">' + ["M", "N", "O", "P", "Q", "R"].map(function (ch) {
          return '<button type="button" class="btn btn-leaf" data-cap="' + ch.toLowerCase() + '">' + ch + "</button>";
        }).join("") + '</div><p class="feedback" id="play-fb"></p>';
      AAAudio.speakWord(item.en, true);
      $("play").querySelectorAll("[data-cap]").forEach(function (btn) {
        btn.onclick = function () {
          var ok = btn.getAttribute("data-cap") === answer;
          $("play-fb").textContent = ok ? "对了！" : "再听听看";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; setTimeout(next, 700); }
        };
      });
    }
    next();
  }

  function game2() {
    var i = 0;
    var rows = L.sameSoundPairs.slice();
    function next() {
      if (i >= rows.length) {
        $("play").innerHTML = '<p class="feedback ok">完成！</p>';
        return;
      }
      var row = rows[i];
      var a = w(row.a);
      var b = w(row.b);
      $("play").innerHTML = '<p>这两个词开头音相同吗？（' + (i + 1) + "/" + rows.length + "）</p>" +
        '<div style="display:flex;gap:16px;justify-content:center;align-items:center">' +
        '<figure><img src="' + a.img + '" alt="" style="max-width:120px"><figcaption>' + a.en + "</figcaption></figure>" +
        '<figure><img src="' + b.img + '" alt="" style="max-width:120px"><figcaption>' + b.en + "</figcaption></figure></div>" +
        '<div class="letter-pick"><button type="button" class="btn btn-leaf" data-y="1">☺ 相同</button>' +
        '<button type="button" class="btn btn-ghost" data-y="0">☹ 不同</button></div>' +
        '<p class="feedback" id="play-fb"></p>';
      AAAudio.speakWord(a.en, true).then(function () { return AAAudio.speakWord(b.en, true); });
      $("play").querySelectorAll("[data-y]").forEach(function (btn) {
        btn.onclick = function () {
          var yes = btn.getAttribute("data-y") === "1";
          var ok = yes === row.same;
          $("play-fb").textContent = ok ? "对了！" : "再听听开头音";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; setTimeout(next, 700); }
        };
      });
    }
    next();
  }

  function game3() {
    var ms = L.matchSay;
    $("play").innerHTML = '<p>点击大写字母，听对应单词</p><div class="tm-game"></div><p class="feedback ok" id="play-fb"></p>';
    var box = $("play").querySelector(".tm-game");
    box.innerHTML =
      '<div class="tm-caps">' + ms.caps.map(function (ch) {
        return '<button type="button" class="btn btn-leaf" data-cap="' + ch + '">' + ch + "</button>";
      }).join("") + "</div>" +
      '<div class="tm-pics">' + ms.pics.map(function (id) {
        return '<figure><img src="' + w(id).img + '" alt=""></figure>';
      }).join("") + "</div>" +
      '<div class="tm-lows">' + ms.lowers.map(function (ch) {
        return '<button type="button" class="btn btn-ghost" data-low="' + ch + '">' + ch + "</button>";
      }).join("") + "</div>";
    var pairs = ms.pairs;
    box.querySelectorAll("[data-cap]").forEach(function (btn) {
      btn.onclick = function () {
        var cap = btn.getAttribute("data-cap");
        var pic = pairs[cap];
        if (pic) AAAudio.speakWord(w(pic).en, true);
        btn.classList.toggle("is-on");
      };
    });
    var hint = ms.caps.map(function (cap) {
      return cap + "–" + w(pairs[cap]).en + "–" + cap.toLowerCase();
    }).join(" · ");
    $("play-fb").textContent = hint;
  }

  function game4() {
    var picked = {};
    $("play").innerHTML = '<div class="wb-ghi-sound"></div><p class="feedback" id="play-fb"></p><button type="button" class="btn btn-apple" id="check">检查</button>';
    var grid = $("play").querySelector(".wb-ghi-sound");
    grid.innerHTML = L.wbBeginningSound.map(function (row, ri) {
      var item = w(row.id);
      return '<div class="wb-ghi-row"><img src="' + item.img + '" alt="">' +
        L.letterOpts.map(function (ch) {
          return '<button type="button" class="btn btn-ghost wb-ghi-opt" data-r="' + ri + '" data-ch="' + ch + '">' + ch + "</button>";
        }).join("") + "</div>";
    }).join("");
    grid.querySelectorAll(".wb-ghi-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ri = btn.getAttribute("data-r");
        grid.querySelectorAll('[data-r="' + ri + '"]').forEach(function (b) { b.classList.remove("is-on"); });
        btn.classList.add("is-on");
        picked[ri] = btn.getAttribute("data-ch");
        AAAudio.speakWord(w(L.wbBeginningSound[ri].id).en, true);
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

  var gid = Number((document.body && document.body.getAttribute("data-game")) || 0);
  if ($("hub-grid")) hub();
  if (gid === 1) game1();
  if (gid === 2) game2();
  if (gid === 3) game3();
  if (gid === 4) game4();
})();
