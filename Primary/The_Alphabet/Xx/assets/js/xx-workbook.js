/**
 * Xx 互动练习册：描红、圈词尾 x 音、迷宫连线。
 */
(function () {
  "use strict";
  var L = window.XX_LESSON;
  var step = 1;
  var titles = ["", "练习册 A · 描红", "练习册 B · 圈词尾 x", "练习册 C · 连线"];
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

  var ctxX = bindTrace("X", "cap");
  var ctxx = bindTrace("x", "small");

  function renderCircle() {
    var grid = $("circle-grid");
    var picked = {};
    grid.innerHTML = (L.workbookCircle || []).map(function (id, i) {
      var item = L.words[id];
      return (
        '<button type="button" class="word-pic wb-circle-pic" data-id="' + id + '">' +
          '<span class="wb-num">' + (i + 1) + "</span>" +
          '<img src="' + item.img + '" alt="' + item.en + '">' +
          '<div class="en">' + item.en + "</div>" +
        "</button>"
      );
    }).join("");
    grid.querySelectorAll(".wb-circle-pic").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        picked[id] = !picked[id];
        btn.classList.toggle("selected", picked[id]);
        if (window.AAAudio && L.words[id]) AAAudio.speakWord(L.words[id].en);
      });
    });
    $("btn-check-b").addEventListener("click", function () {
      var answers = L.workbookCircleAnswers || [];
      var ok = answers.every(function (id) { return picked[id]; }) &&
        (L.workbookCircle || []).every(function (id) {
          return answers.indexOf(id) !== -1 ? picked[id] : !picked[id];
        });
      grid.querySelectorAll(".wb-circle-pic").forEach(function (btn) {
        var id = btn.getAttribute("data-id");
        var should = answers.indexOf(id) !== -1;
        btn.classList.toggle("wrong", !!picked[id] !== should);
      });
      $("fb-b").textContent = ok
        ? "全对！fox、box、wax、six 词尾都有 /ks/ 音。"
        : "再听一遍：只圈词尾有 x 音的图。";
      $("fb-b").className = "feedback " + (ok ? "ok" : "no");
    });
  }

  function renderPath() {
    var grid = $("path-grid");
    var order = [];
    var path = L.connectPath || [];
    grid.innerHTML = path.map(function (id, i) {
      var item = L.words[id];
      return (
        '<button type="button" class="word-pic wb-path-pic" data-id="' + id + '" data-i="' + i + '">' +
          '<img src="' + item.img + '" alt="' + item.en + '">' +
          '<div class="en">' + item.en + "</div>" +
        "</button>"
      );
    }).join("");
    grid.querySelectorAll(".wb-path-pic").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var i = Number(btn.getAttribute("data-i"));
        if (order.length === i && order.indexOf(id) === -1) {
          order.push(id);
          btn.classList.add("is-on");
          if (window.AAAudio && L.words[id]) AAAudio.speakWord(L.words[id].en);
        }
      });
    });
    $("btn-check-c").addEventListener("click", function () {
      var ok = order.length === path.length && order.every(function (id, i) { return id === path[i]; });
      grid.querySelectorAll(".wb-path-pic").forEach(function (btn) {
        btn.classList.toggle("wrong", !ok);
      });
      $("fb-c").textContent = ok
        ? "全对！fox → envelope → six → box，最后在心里写 Xx。"
        : "按顺序点：狐狸 → 蜡封信封 → 六 → 盒子。";
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
    if (ctxX) ctxX.clearRect(0, 0, ctxX.canvas.width, ctxX.canvas.height);
    if (ctxx) ctxx.clearRect(0, 0, ctxx.canvas.width, ctxx.canvas.height);
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
  renderPath();
  showStep(1);
})();
