(function () {
  "use strict";
  var L = window.AA_LESSON;
  var i = 0;
  var traceCtx = null;
  var slides = [{ type: "meet" }, { type: "video" }]
    .concat(L.vocab.map(function (w) { return { type: "word", id: w.id }; }))
    .concat([{ type: "trace", letter: "A" }, { type: "trace", letter: "a" }]);

  function $(id) { return document.getElementById(id); }

  function bindTrace(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1c4e80";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    var drawing = false;
    function pos(ev) {
      var r = canvas.getBoundingClientRect();
      var src = ev.touches ? ev.touches[0] : ev;
      return {
        x: (src.clientX - r.left) * (canvas.width / r.width),
        y: (src.clientY - r.top) * (canvas.height / r.height)
      };
    }
    function start(ev) {
      ev.preventDefault();
      drawing = true;
      var p = pos(ev);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    function move(ev) {
      if (!drawing) return;
      ev.preventDefault();
      var p = pos(ev);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    function end() { drawing = false; }
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);
    return ctx;
  }

  function paperHTML(letter) {
    var cap = letter === "A";
    return (
      '<div class="trace-board">' +
        '<div class="trace-paper">' +
          '<div class="trace-lines">' +
            '<i class="tl tl-sky"></i><i class="tl tl-mid"></i><i class="tl tl-base"></i><i class="tl tl-dirt"></i>' +
          "</div>" +
          '<div class="trace-letter ' + (cap ? "cap" : "small") + '">' + letter + "</div>" +
          '<canvas id="trace-cv" width="1200" height="600"></canvas>' +
        "</div>" +
      "</div>"
    );
  }

  function render() {
    var s = slides[i];
    var box = $("slide");
    var titles = {
      meet: "听字母",
      video: "看书写",
      word: "学单词",
      trace: "教师描红"
    };
    $("step-title").textContent = titles[s.type];
    $("step-pill").textContent = (i + 1) + " / " + slides.length;
    $("prog").style.width = ((i + 1) / slides.length * 100) + "%";
    $("btn-prev").disabled = i === 0;
    $("btn-next").textContent = i === slides.length - 1 ? "去做游戏 →" : "下一页";
    traceCtx = null;

    if (s.type === "meet") {
      box.innerHTML =
        '<p class="slide-kicker">01  Listen and repeat</p>' +
        "<h2>angry apple</h2>" +
        '<div class="meet-row">' +
          '<div class="meet-card"><img src="' + L.mascot.img + '" alt="angry apple"></div>' +
          '<div class="meet-card aa-mark"><div class="big">Aa</div><div class="ipa">the letter A</div></div>' +
        "</div>" +
        '<button type="button" class="btn btn-apple" id="btn-t03">听教材</button>';
      $("btn-t03").onclick = function () { AAAudio.playFile(L.tracks.t03); };
      return;
    }

    if (s.type === "video") {
      box.innerHTML =
        '<p class="slide-kicker">02  How to write Aa</p>' +
        "<h2>看书写</h2>" +
        '<div class="vid-frame"><video id="letter-video" controls playsinline preload="metadata" src="' +
        L.video + '" poster="' + L.mascot.img + '"></video></div>';
      return;
    }

    if (s.type === "word") {
      var w = L.words[s.id];
      var n = L.vocab.findIndex(function (x) { return x.id === s.id; }) + 1;
      box.innerHTML =
        '<p class="slide-kicker">0' + (n + 2) + "  Word</p>" +
        '<button type="button" class="word-hero" id="word-card">' +
          '<img src="' + w.img + '" alt="' + w.en + '">' +
          '<div class="en"><b>' + w.onset + "</b>" + w.rest + "</div>" +
          '<div class="zh">' + w.zh + "</div>" +
        "</button>" +
        '<button type="button" class="btn btn-apple" id="btn-hear">再听一次</button>';
      function play() {
        var clip = L.track04Clips[w.id];
        AAAudio.playClip(L.tracks.t04, clip[0], clip[1]).catch(function () {
          AAAudio.speakWord(w.en);
        });
      }
      $("word-card").onclick = play;
      $("btn-hear").onclick = play;
      play();
      return;
    }

    if (s.type === "trace") {
      var isA = s.letter === "A";
      box.innerHTML =
        '<p class="slide-kicker">' + (isA ? "07" : "08") + "  Teacher demo</p>" +
        "<h2>" + (isA ? "大写 A" : "小写 a") + "</h2>" +
        '<p class="hint">教师在四线格上示范描红</p>' +
        paperHTML(s.letter) +
        '<button type="button" class="btn btn-ghost" id="btn-clear">清除</button>';
      var cv = $("trace-cv");
      traceCtx = bindTrace(cv);
      $("btn-clear").onclick = function () {
        traceCtx.clearRect(0, 0, cv.width, cv.height);
      };
    }
  }

  $("btn-prev").onclick = function () {
    if (i > 0) {
      i -= 1;
      AAAudio.stop();
      render();
    }
  };
  $("btn-next").onclick = function () {
    if (i < slides.length - 1) {
      i += 1;
      AAAudio.stop();
      render();
    } else {
      location.href = "games.html";
    }
  };

  render();
})();
