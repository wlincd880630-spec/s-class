/**
 * Zz 互动练习册：描红、配对、写 Zz 或打叉。
 */
(function () {
  "use strict";
  var L = window.ZZ_LESSON;
  var step = 1;
  var titles = ["", "练习册 A · 描红", "练习册 B · 配对", "练习册 C · Zz / ✗"];
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

  var ctxY = bindTrace("Z", "cap");
  var ctxy = bindTrace("z", "small");

  function renderMatch() {
    var grid = $("match-grid");
    var picked = {};
    grid.innerHTML = (L.wbMatchRows || []).map(function (row, ri) {
      return (
        '<div class="wb-match-row" data-row="' + ri + '">' +
          '<div class="wb-match-label">第 ' + (ri + 1) + " 行</div>" +
          row.pics.map(function (id) {
            var item = L.words[id];
            return (
              '<button type="button" class="word-pic" data-row="' + ri + '" data-id="' + id + '">' +
              '<img src="' + item.img + '" alt="' + item.en + '">' +
              '<div class="en">' + item.en + "</div>" +
              "</button>"
            );
          }).join("") +
        "</div>"
      );
    }).join("");
    grid.querySelectorAll(".word-pic").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ri = btn.getAttribute("data-row");
        var id = btn.getAttribute("data-id");
        picked[ri] = id;
        grid.querySelectorAll('.word-pic[data-row="' + ri + '"]').forEach(function (b) {
          b.classList.toggle("selected", b === btn);
        });
        if (window.AAAudio && L.words[id]) AAAudio.speakWord(L.words[id].en);
      });
    });
    $("btn-check-b").addEventListener("click", function () {
      var ok = true;
      (L.wbMatchRows || []).forEach(function (row, ri) {
        var rowEl = grid.querySelector('.wb-match-row[data-row="' + ri + '"]');
        rowEl.querySelectorAll(".word-pic").forEach(function (b) { b.classList.remove("wrong"); });
        if (picked[ri] !== row.answer) {
          ok = false;
          var bad = rowEl.querySelector('[data-id="' + picked[ri] + '"]');
          if (bad) bad.classList.add("wrong");
        }
      });
      $("fb-b").textContent = ok ? "全对！zebra、zero、zip、zoo 都是 /z/ 开头。" : "再看看：每行只选 z 开头的图。";
      $("fb-b").className = "feedback " + (ok ? "ok" : "no");
    });
  }

  function renderCross() {
    var grid = $("cross-grid");
    var answers = {};
    grid.innerHTML = (L.track05Items || []).map(function (row, i) {
      var item = L.words[row.id];
      return (
        '<div class="wb-cross-item" data-i="' + i + '">' +
          '<img src="' + item.img + '" alt="' + item.en + '">' +
          '<div class="en">' + item.en + "</div>" +
          '<div class="btn-row">' +
            '<button type="button" class="btn btn-leaf" data-pick="zz" data-i="' + i + '">Zz</button>' +
            '<button type="button" class="btn btn-ghost" data-pick="x" data-i="' + i + '">✗</button>' +
          "</div>" +
        "</div>"
      );
    }).join("");
    grid.querySelectorAll("[data-pick]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = btn.getAttribute("data-i");
        var pick = btn.getAttribute("data-pick");
        answers[i] = pick;
        var wrap = grid.querySelector('.wb-cross-item[data-i="' + i + '"]');
        wrap.querySelectorAll("[data-pick]").forEach(function (b) {
          b.classList.toggle("is-on", b === btn);
        });
        var item = L.words[L.track05Items[i].id];
        if (window.AAAudio && item) AAAudio.speakWord(item.en);
      });
    });
    $("btn-check-c").addEventListener("click", function () {
      var ok = true;
      (L.track05Items || []).forEach(function (row, i) {
        var want = row.writeZz ? "zz" : "x";
        var wrap = grid.querySelector('.wb-cross-item[data-i="' + i + '"]');
        wrap.classList.remove("wrong");
        if (answers[i] !== want) {
          ok = false;
          wrap.classList.add("wrong");
        }
      });
      $("fb-c").textContent = ok ? "全对！zebra、zipper、zip 写 Zz；book 打叉。" : "再听一遍：/z/ 开头写 Zz，否则打叉。";
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
    if (ctxY) ctxY.clearRect(0, 0, ctxY.canvas.width, ctxY.canvas.height);
    if (ctxy) ctxy.clearRect(0, 0, ctxy.canvas.width, ctxy.canvas.height);
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
  renderCross();
  showStep(1);
})();
