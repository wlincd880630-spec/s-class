(function () {
  "use strict";
  var L = window.HH_LESSON;
  var i = 0;
  var traceCtx = null;
  var unbindGhost = null;
  var slides = [{ type: "meet" }]
    .concat(L.vocab.map(function (w) { return { type: "word", id: w.id }; }))
    .concat([{ type: "video" }, { type: "trace", letter: "H" }, { type: "trace", letter: "h" }]);

  function $(id) { return document.getElementById(id); }

  function bindTrace(canvas) {
    var ctx = canvas.getContext("2d");
    var drawing = false;
    function tune() {
      ctx.strokeStyle = "#1c4e80";
      ctx.lineWidth = Math.max(8, canvas.height / 55);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
    tune();
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

  function paperHTML() {
    return (
      '<div class="trace-board">' +
        '<div class="trace-staff" id="trace-staff">' +
          '<i class="ln sky"></i><i class="ln mid"></i><i class="ln base"></i><i class="ln desc"></i>' +
          '<canvas class="trace-ghost-cv" id="trace-ghost"></canvas>' +
          '<canvas id="trace-cv" width="1400" height="700"></canvas>' +
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
      trace: "描红"
    };
    $("step-title").textContent = titles[s.type];
    $("step-pill").textContent = (i + 1) + " / " + slides.length;
    $("prog").style.width = ((i + 1) / slides.length * 100) + "%";
    $("btn-prev").disabled = i === 0;
    $("btn-next").textContent = i === slides.length - 1 ? "去做游戏 →" : "下一页";
    traceCtx = null;
    if (unbindGhost) {
      unbindGhost();
      unbindGhost = null;
    }

    if (s.type === "meet") {
      box.innerHTML =
        '<p class="slide-kicker">Listen</p>' +
        '<div class="meet-row">' +
          '<div class="meet-card"><img src="' + L.mascot.img + '" alt="happy horse"></div>' +
          '<div class="meet-card ff-mark"><div class="big">Hh</div></div>' +
        "</div>" +
        "<h2>happy horse</h2>" +
        '<button type="button" class="btn btn-apple" id="btn-t03">听</button>';
      $("btn-t03").onclick = function () { AAAudio.speakListenIntro(); };
      return;
    }

    if (s.type === "video") {
      box.innerHTML =
        '<p class="slide-kicker">Write</p>' +
        '<div class="vid-frame"><video id="letter-video" controls playsinline preload="metadata" src="' +
        L.video + '" poster="' + L.mascot.img + '"></video></div>';
      return;
    }

    if (s.type === "word") {
      var w = L.words[s.id];
      box.innerHTML =
        '<p class="slide-kicker">Word</p>' +
        '<button type="button" class="word-hero" id="word-card">' +
          '<img src="' + w.img + '" alt="' + w.en + '">' +
          '<div class="en"><b>' + w.onset + "</b>" + w.rest + "</div>" +
        "</button>" +
        '<button type="button" class="btn btn-apple" id="btn-hear">听</button>';
      function play() {
        AAAudio.speakWord(w.en, true);
      }
      $("word-card").onclick = play;
      $("btn-hear").onclick = play;
      play();
      return;
    }

    if (s.type === "trace") {
      var isA = s.letter === "H";
      box.innerHTML =
        '<p class="slide-kicker">Trace</p>' +
        "<h2>" + (isA ? "H" : "h") + "</h2>" +
        paperHTML() +
        '<button type="button" class="btn btn-ghost" id="btn-clear">清除</button>';
      var cv = $("trace-cv");
      traceCtx = bindTrace(cv);
      var family = getComputedStyle(document.documentElement).getPropertyValue("--letter") || "Fredoka, sans-serif";
      unbindGhost = window.AAStave.bind(
        $("trace-ghost"),
        s.letter,
        isA ? "cap" : "small",
        family,
        "rgba(28, 25, 23, 0.22)"
      );
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
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") $("btn-next").click();
    if (e.key === "ArrowLeft") $("btn-prev").click();
  });

  render();
})();
