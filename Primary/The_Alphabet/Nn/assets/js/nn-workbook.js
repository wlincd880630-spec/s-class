/**
 * Nn 互动练习册：描红、n 音配对书写、鸟巢迷宫连线。
 */
(function () {
  "use strict";
  var L = window.NN_LESSON;
  var step = 1;
  var titles = ["", "练习册 A · 描红", "练习册 B · 配对", "练习册 C · 迷宫"];
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

  var ctxA = bindTrace("N", "cap");
  var ctxa = bindTrace("n", "small");

  function renderMatch() {
    var grid = $("match-grid");
    var picks = {};
    grid.innerHTML = (L.wbMatchRows || []).map(function (row, i) {
      return (
        '<div class="wb-match-row">' +
        '<span class="wb-match-label">Nn</span>' +
        row.pics.map(function (id) {
          var item = L.words[id];
          var sample = id === row.answer;
          return (
            '<button type="button" class="word-pic' + (sample ? " selected" : "") + '" data-row="' + i + '" data-id="' + id + '">' +
            '<img src="' + item.img + '" alt="' + item.en + '">' +
            '<div class="en">' + item.en + "</div>" +
            (sample ? '<div class="zh">示范</div>' : "") +
            "</button>"
          );
        }).join("") +
        "</div>"
      );
    }).join("");
    (L.wbMatchRows || []).forEach(function (row, i) {
      picks[i] = row.answer;
    });
    grid.querySelectorAll(".word-pic").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var row = btn.getAttribute("data-row");
        var id = btn.getAttribute("data-id");
        var answer = L.wbMatchRows[row].answer;
        if (id === answer) return;
        picks[row] = id;
        var rowBtns = grid.querySelectorAll('[data-row="' + row + '"]');
        rowBtns.forEach(function (b) {
          b.classList.toggle("selected", b.getAttribute("data-id") === picks[row]);
        });
        var item = L.words[id];
        if (window.AAAudio && item) AAAudio.speakWord(item.en);
      });
    });
    $("btn-check-b").addEventListener("click", function () {
      var ok = true;
      (L.wbMatchRows || []).forEach(function (row, i) {
        var rowBtns = grid.querySelectorAll('[data-row="' + i + '"]');
        rowBtns.forEach(function (b) { b.classList.remove("wrong"); });
        if (picks[i] !== row.answer) {
          ok = false;
          rowBtns.forEach(function (b) {
            if (b.getAttribute("data-id") === picks[i]) b.classList.add("wrong");
          });
        }
      });
      $("fb-b").textContent = ok ? "全对！nut、nest、nose、net 都是 /n/ 开头。" : "再听一听，每行选出 n 开头的图。";
      $("fb-b").className = "feedback " + (ok ? "ok" : "no");
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

  renderMatch();
  showStep(1);
})();
