/**
 * Aa 互动练习册：描红、圈 /æ/ 图、给 A/a 气球涂色。
 */
(function () {
  "use strict";
  var L = window.AA_LESSON;
  var step = 1;
  var titles = ["", "练习册 A · 描红", "练习册 B · 圈图", "练习册 C · 涂色"];
  var HAND = '"Patrick Hand", "Segoe Print", cursive';

  function $(id) { return document.getElementById(id); }

  function bindTrace(letter, kind) {
    var canvas = $("canvas-" + letter);
    var ghost = $("ghost-" + letter);
    var wrap = $("stave-" + letter);
    if (!canvas || !wrap) return null;
    var ctx = canvas.getContext("2d");
    var dpr = Math.max(1, window.devicePixelRatio || 1);

    if (window.AAStave && ghost) {
      window.AAStave.bind(ghost, letter, kind, HAND, "rgba(144, 202, 249, 0.55)");
    }

    function size() {
      var r = wrap.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#1565c0";
      ctx.lineWidth = Math.max(4, r.height * 0.045) * dpr;
    }
    size();
    if (window.ResizeObserver) new ResizeObserver(size).observe(wrap);

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

  var ctxA = bindTrace("A", "cap");
  var ctxa = bindTrace("a", "small");

  function renderCircle() {
    var grid = $("circle-grid");
    var picked = {};
    grid.innerHTML = L.workbookCircle.map(function (id) {
      var item = L.words[id];
      var sample = id === L.workbookCircleExample;
      return (
        '<button type="button" class="word-pic' + (sample ? " selected" : "") + '" data-id="' + id + '">' +
        '<img src="' + item.img + '" alt="' + item.en + '">' +
        '<div class="en">' + item.en + "</div>" +
        '<div class="zh">' + item.zh + "</div>" +
        (sample ? '<div class="zh">示范：已圈</div>' : "") +
        "</button>"
      );
    }).join("");
    if (L.workbookCircleExample) picked[L.workbookCircleExample] = true;
    grid.querySelectorAll(".word-pic").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        if (id === L.workbookCircleExample) return;
        picked[id] = !picked[id];
        btn.classList.toggle("selected", !!picked[id]);
        var item = L.words[id];
        if (window.AAAudio && item) AAAudio.speakWord(item.en, true);
      });
    });
    $("btn-check-b").addEventListener("click", function () {
      var ok = true;
      L.workbookCircle.forEach(function (id) {
        var item = L.words[id];
        var should = !!item.a;
        var did = !!picked[id];
        var btn = grid.querySelector('[data-id="' + id + '"]');
        btn.classList.remove("wrong");
        if (should !== did) {
          ok = false;
          btn.classList.add("wrong");
        }
      });
      $("fb-b").textContent = ok ? "全对！apple、alligator、axe、ant 都是 /æ/。" : "再看看：只圈 /æ/ 开头的图。";
      $("fb-b").className = "feedback " + (ok ? "ok" : "no");
    });
  }

  function renderBalloons() {
    var board = $("balloon-grid");
    var picked = {};
    board.innerHTML = L.workbookLetters.map(function (ch, i) {
      return '<button type="button" class="letter-btn" data-i="' + i + '" data-ch="' + ch + '">' + ch + "</button>";
    }).join("");
    board.querySelectorAll(".letter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = btn.getAttribute("data-i");
        var ch = btn.getAttribute("data-ch");
        var isA = ch === "A" || ch === "a";
        picked[i] = !picked[i];
        btn.classList.toggle("good", picked[i] && isA);
        btn.classList.toggle("bad", picked[i] && !isA);
        if (!picked[i]) {
          btn.classList.remove("good", "bad");
        }
        if (window.AAAudio && isA) AAAudio.speakLetter();
      });
    });
    $("btn-check-c").addEventListener("click", function () {
      var ok = true;
      board.querySelectorAll(".letter-btn").forEach(function (btn) {
        var ch = btn.getAttribute("data-ch");
        var isA = ch === "A" || ch === "a";
        var on = btn.classList.contains("good") || btn.classList.contains("bad");
        if (isA && !btn.classList.contains("good")) ok = false;
        if (!isA && on) ok = false;
      });
      $("fb-c").textContent = ok ? "涂对了！只给 A 和 a 涂色。" : "只涂 A 和 a，其它字母不要涂。";
      $("fb-c").className = "feedback " + (ok ? "ok" : "no");
    });
  }

  function showStep(n) {
    step = n;
    [1, 2, 3].forEach(function (i) {
      $("wb-" + i).classList.toggle("hidden", i !== n);
    });
    document.querySelectorAll(".step-dot").forEach(function (d) {
      d.classList.toggle("on", Number(d.getAttribute("data-step")) === n);
    });
    $("step-title").textContent = titles[n];
    $("step-pill").textContent = n + " / 3";
    $("btn-prev").disabled = n === 1;
    $("btn-next").textContent = n === 3 ? "去教具工坊 →" : "下一页";
    if (window.AAAudio) AAAudio.stop();
  }

  $("btn-clear-trace").addEventListener("click", function () {
    if (ctxA) ctxA.clearRect(0, 0, ctxA.canvas.width, ctxA.canvas.height);
    if (ctxa) ctxa.clearRect(0, 0, ctxa.canvas.width, ctxa.canvas.height);
  });
  $("btn-say-trace").addEventListener("click", function () {
    AAAudio.speakLetter().then(function () { return AAAudio.speakPhoneme(); });
  });
  $("btn-prev").addEventListener("click", function () {
    if (step > 1) showStep(step - 1);
  });
  $("btn-next").addEventListener("click", function () {
    if (step < 3) showStep(step + 1);
    else location.href = "print.html";
  });

  renderCircle();
  renderBalloons();
  showStep(1);
})();
