(function () {
  "use strict";
  var L = window.AA_LESSON;
  var step = 1;
  var titles = ["", "Aa · 学字母", "Aa · 学单词", "Aa · 描红"];

  function $(id) { return document.getElementById(id); }

  function renderVocab() {
    var grid = $("vocab-grid");
    grid.innerHTML = L.vocab.map(function (w) {
      return (
        '<button type="button" class="word-pic" data-id="' + w.id + '">' +
          '<img src="' + w.img + '" alt="' + w.en + '">' +
          '<div class="en"><b>' + w.onset + "</b>" + w.rest + "</div>" +
          '<div class="zh">' + w.zh + "</div>" +
        "</button>"
      );
    }).join("");
    grid.querySelectorAll(".word-pic").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var clip = L.track04Clips[id];
        var w = L.words[id];
        AAAudio.playClip(L.tracks.t04, clip[0], clip[1]).then(function () {
          return AAAudio.speakWord(w.en);
        }).catch(function () {
          AAAudio.speakWord(w.en);
        });
      });
    });
  }

  function bindTrace(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1565c0";
    ctx.lineWidth = 7;
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

  var ctxA = bindTrace($("canvas-A"));
  var ctxa = bindTrace($("canvas-a"));

  function showStep(n) {
    step = n;
    [1, 2, 3].forEach(function (i) {
      $("step-" + i).classList.toggle("hidden", i !== n);
    });
    document.querySelectorAll(".step-dot").forEach(function (d) {
      d.classList.toggle("on", Number(d.getAttribute("data-step")) === n);
    });
    $("step-title").textContent = titles[n];
    $("step-pill").textContent = n + " / 3";
    $("btn-prev").disabled = n === 1;
    $("btn-next").textContent = n === 3 ? "去做游戏 →" : "下一步";
    AAAudio.stop();
  }

  $("btn-track03").addEventListener("click", function () {
    AAAudio.playFile(L.tracks.t03);
  });
  $("btn-phoneme").addEventListener("click", function () { AAAudio.speakPhoneme(); });
  $("btn-letter").addEventListener("click", function () { AAAudio.speakLetter(); });
  $("btn-prompt").addEventListener("click", function () { AAAudio.speakBeginningPrompt(); });
  $("btn-track04").addEventListener("click", function () { AAAudio.playFile(L.tracks.t04); });
  $("btn-clear-trace").addEventListener("click", function () {
    ctxA.clearRect(0, 0, 640, 320);
    ctxa.clearRect(0, 0, 640, 320);
  });
  $("btn-say-trace").addEventListener("click", function () {
    AAAudio.speakLetter().then(function () { return AAAudio.speakPhoneme(); });
  });
  $("btn-prev").addEventListener("click", function () {
    if (step > 1) showStep(step - 1);
  });
  $("btn-next").addEventListener("click", function () {
    if (step < 3) showStep(step + 1);
    else location.href = "games.html";
  });

  renderVocab();
  showStep(1);
})();
