(function () {
  "use strict";
  var L = window.STUVWXYZ_REVIEW;

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
    $("play").innerHTML =
      '<figure><img src="' + L.song + '" alt="" style="max-width:100%;border-radius:12px"></figure>' +
      '<p>在图里找 S T U V W X Y Z 八个字母线索。</p>' +
      '<div class="song-letter-hints">' +
      (L.songLetters || []).map(function (row) {
        var item = w(row.id);
        return '<button type="button" class="btn btn-ghost song-hint-btn" data-id="' + row.id + '"><b>' + row.letter + "</b> " + item.en + "</button>";
      }).join("") + "</div>" +
      '<button type="button" class="btn btn-apple" id="btn-song" style="margin-top:12px">听 Song</button>';
    $("btn-song").onclick = function () { AAAudio.playSong(); };
    $("play").querySelectorAll(".song-hint-btn").forEach(function (btn) {
      btn.onclick = function () { AAAudio.speakWord(w(btn.getAttribute("data-id")).en, true); };
    });
  }

  function game2() {
    var found = {};
    $("play").innerHTML = '<p>点图找出 8 种动物：</p><div class="find-grid" id="g2"></div><p class="feedback" id="play-fb"></p>';
    var grid = $("g2");
    var all = (L.findAnimals || []).concat(["monkey", "zebra", "yak", "fox"]);
    grid.innerHTML = all.map(function (id) {
      var item = w(id);
      return '<button type="button" class="pic-btn" data-id="' + id + '"><img src="' + item.img + '" alt=""><span>' + item.en + "</span></button>";
    }).join("");
    grid.querySelectorAll(".pic-btn").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-id");
        found[id] = true;
        btn.classList.add("is-on");
        AAAudio.speakWord(w(id).en, true);
        var ok = (L.findAnimals || []).every(function (x) { return found[x]; });
        $("play-fb").textContent = ok ? "找到了全部 8 种动物！" : "继续找：seal, tiger, octopus, jaguar, lion, kangaroo, elephant, wolf";
        $("play-fb").className = "feedback " + (ok ? "ok" : "");
      };
    });
  }

  function game3() {
    var i = 0;
    var rows = L.triviaQuiz || [];
    function next() {
      if (i >= rows.length) {
        $("play").innerHTML = '<p class="feedback ok">完成！</p>';
        return;
      }
      var row = rows[i];
      var item = w(row.id);
      $("play").innerHTML = '<p>' + row.question + " (" + (i + 1) + "/" + rows.length + ")</p>" +
        '<figure><img src="' + item.img + '" alt="" style="max-width:240px"></figure>' +
        '<div class="num-pick" id="nums"></div><p class="feedback" id="play-fb"></p>';
      var nums = $("nums");
      [4, 5, 6, 7, 8, 9, 10].forEach(function (n) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "btn btn-leaf";
        b.textContent = String(n);
        b.onclick = function () {
          var ok = n === row.answer;
          $("play-fb").textContent = ok ? "对了！答案是 " + row.answer + "。" : "再数一数。";
          $("play-fb").className = "feedback " + (ok ? "ok" : "no");
          if (ok) { i++; setTimeout(next, 700); }
        };
        nums.appendChild(b);
      });
    }
    next();
  }

  function game4() {
    var picked = {};
    $("play").innerHTML = '<p>点选与字母开头音相同的图（练习册 A）。</p><div class="color-game" id="g4"></div><p class="feedback" id="play-fb"></p>';
    var box = $("g4");
    (L.wbColorGrid || []).forEach(function (row, gi) {
      var wrap = document.createElement("div");
      wrap.className = "color-group";
      wrap.innerHTML = '<span class="splatter">' + row.splatter + "</span>";
      row.pics.forEach(function (id) {
        var item = w(id);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pic-btn";
        btn.innerHTML = '<img src="' + item.img + '" alt="">';
        btn.onclick = function () {
          var key = gi + ":" + id;
          picked[key] = !picked[key];
          btn.classList.toggle("is-on", !!picked[key]);
          AAAudio.speakWord(item.en, true);
        };
        wrap.appendChild(btn);
      });
      box.appendChild(wrap);
    });
    $("play-fb").textContent = "涂色/点选与 splatter 字母开头音相同的图。";
  }

  var gid = Number((document.body && document.body.getAttribute("data-game")) || 0);
  if ($("hub-grid")) hub();
  if (gid === 1) game1();
  if (gid === 2) game2();
  if (gid === 3) game3();
  if (gid === 4) game4();
})();
