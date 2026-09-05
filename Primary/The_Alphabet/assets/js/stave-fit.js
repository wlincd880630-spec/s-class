/**
 * 四线格描红：按字形墨水盒贴线（大写贴顶线→底线，小写贴中线→底线）。
 * 格线比例与 Lesson 02 字母抄写作业一致：格带占行高 50%，线在 0 / 33 / 67 / 100%。
 */
(function (global) {
  "use strict";

  var BAND = { top: 0.25, height: 0.50 };
  var LINES = { sky: 0, mid: 0.33, base: 0.67, desc: 1 };
  var HAND = '"Patrick Hand", "Segoe Print", cursive';
  var TRACE_FILL = "rgba(144, 202, 249, 0.55)";
  var ONSET_FILL = "#e53935";
  var REST_FILL = "rgba(144, 202, 249, 0.85)";
  var printMode = false;

  function currentDpr() {
    var raw = window.devicePixelRatio || 1;
    if (printMode || (document.documentElement && document.documentElement.classList.contains("is-print-export"))) {
      return Math.min(raw, 1.5);
    }
    return Math.min(raw, 2);
  }

  function setPrintMode(on) {
    printMode = !!on;
  }

  function yOf(h, name) {
    return (BAND.top + LINES[name] * BAND.height) * h;
  }

  function fontStr(size, family, weight) {
    return (weight || "700") + " " + size + "px " + family;
  }

  function measure(ctx, letter, size, family, weight) {
    ctx.font = fontStr(size, family, weight);
    var m = ctx.measureText(letter);
    return {
      ascent: m.actualBoundingBoxAscent || 0,
      descent: m.actualBoundingBoxDescent || 0,
      ink: (m.actualBoundingBoxAscent || 0) + (m.actualBoundingBoxDescent || 0),
      advance: m.width
    };
  }

  function sizeForAscent(ctx, letter, target, family, weight) {
    var probe = 200;
    var m = measure(ctx, letter, probe, family, weight);
    var body = m.ascent;
    if (!(body > 0.5)) body = m.ink;
    if (!(body > 0.5)) return target * 1.6;
    return probe * (target / body);
  }

  function kindOf(ch) {
    if (!ch || ch === " " || ch === "\u00a0") return "space";
    if (/[A-Zbdfhklt]/.test(ch)) return "cap";
    if (/[a-z]/.test(ch)) return "small";
    return "space";
  }

  function paintRun(canvas, runs, opts) {
    if (!canvas) return false;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (w < 8 || h < 8) return false;
    opts = opts || {};
    var family = opts.family || HAND;
    var weight = opts.weight || "700";
    var dpr = currentDpr();
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var baseY = yOf(h, "base");
    var skyY = yOf(h, "sky");
    var midY = yOf(h, "mid");
    var capSize = sizeForAscent(ctx, "A", baseY - skyY, family, weight);
    var smallSize = sizeForAscent(ctx, "o", baseY - midY, family, weight);
    var gap = Math.max(1.5, h * 0.012);

    var glyphs = [];
    var i;
    for (i = 0; i < runs.length; i++) {
      var run = runs[i];
      var ch = run.ch;
      if (!ch || ch === " " || ch === "\u00a0") {
        glyphs.push({ type: "space" });
        continue;
      }
      var kind = run.kind || kindOf(ch);
      var size = kind === "small" ? smallSize : capSize;
      var m = measure(ctx, ch, size, family, weight);
      glyphs.push({
        type: "g",
        ch: ch,
        size: size,
        fill: run.fill,
        advance: m.advance
      });
    }

    var spaceW = 0;
    for (i = 0; i < glyphs.length; i++) {
      if (glyphs[i].type === "g") {
        spaceW = glyphs[i].advance * 0.38;
        break;
      }
    }
    if (!spaceW) spaceW = w * 0.04;

    var total = 0;
    for (i = 0; i < glyphs.length; i++) {
      if (glyphs[i].type === "space") {
        total += spaceW;
        continue;
      }
      total += glyphs[i].advance;
      if (i < glyphs.length - 1 && glyphs[i + 1].type === "g") total += gap;
    }

    var x;
    if (opts.align === "center") {
      x = (w - total) / 2;
    } else {
      var rowHmm = parseFloat(getComputedStyle(canvas.parentNode).getPropertyValue("--row-h")) || 24;
      x = (12 / rowHmm) * h;
    }

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    var drawn = [];
    for (i = 0; i < glyphs.length; i++) {
      var g = glyphs[i];
      if (g.type === "space") {
        x += spaceW;
        continue;
      }
      ctx.font = fontStr(g.size, family, weight);
      ctx.fillStyle = g.fill || TRACE_FILL;
      ctx.fillText(g.ch, x, baseY);
      drawn.push({ ch: g.ch, size: g.size, x: x, advance: g.advance });
      x += g.advance;
      if (i < glyphs.length - 1 && glyphs[i + 1].type === "g") x += gap;
    }

    if (opts.startDot && drawn.length) {
      paintStartDot(ctx, drawn[0], baseY, h);
    }
    return true;
  }

  function paintStartDot(ctx, g, baseY, h) {
    ctx.font = fontStr(g.size, HAND, "700");
    var met = ctx.measureText(g.ch);
    var ascent = met.actualBoundingBoxAscent || g.size * 0.7;
    var r = Math.max(3.2, h * 0.032);
    var dx;
    var dy;
    if (g.ch === "A") {
      dx = g.x + Math.max(3, g.advance * 0.06);
      dy = baseY - r * 0.2;
    } else if (g.ch === "a") {
      dx = g.x + g.advance * 0.46;
      dy = baseY - ascent + r * 0.6;
    } else {
      return;
    }
    ctx.beginPath();
    ctx.fillStyle = "#43a047";
    ctx.arc(dx, dy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = Math.max(1, r * 0.28);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }

  function paintLetter(canvas, letter, kind, family, fill, weight) {
    return paintRun(
      canvas,
      [{ ch: letter, kind: kind, fill: fill || "rgba(28, 25, 23, 0.22)" }],
      { family: family, weight: weight, align: "center" }
    );
  }

  function schedule(fn) {
    requestAnimationFrame(function () {
      fn();
      requestAnimationFrame(fn);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fn);
  }

  function bind(canvas, letter, kind, family, fill, weight) {
    var obs = null;
    function paint() {
      paintLetter(canvas, letter, kind, family, fill, weight);
    }
    schedule(paint);
    if (window.ResizeObserver) {
      obs = new ResizeObserver(paint);
      obs.observe(canvas.parentNode || canvas);
    }
    return function unbind() {
      if (obs) obs.disconnect();
    };
  }

  function runsFromWordEl(el) {
    var runs = [];
    function walk(node, fill) {
      if (!node) return;
      if (node.nodeType === 3) {
        var t = node.textContent || "";
        for (var i = 0; i < t.length; i++) {
          runs.push({ ch: t[i], fill: fill, kind: kindOf(t[i]) });
        }
        return;
      }
      if (node.nodeType !== 1) return;
      var f = fill;
      if (node.classList.contains("onset")) f = ONSET_FILL;
      else if (node.classList.contains("rest")) f = REST_FILL;
      for (var c = node.firstChild; c; c = c.nextSibling) walk(c, f);
    }
    walk(el, TRACE_FILL);
    return runs;
  }

  function paintStaveLine(line) {
    var canvas = line.querySelector("canvas.stave-ghost-cv");
    var word = line.querySelector(".trace-word");
    if (!canvas || !word) return;
    var center = line.classList.contains("model-stave") || word.classList.contains("center");
    var model = line.classList.contains("model-stave");
    var runs = runsFromWordEl(word);
    if (model) {
      runs.forEach(function (run) {
        run.fill = "rgba(66, 165, 245, 0.42)";
      });
    }
    var ok = paintRun(canvas, runs, {
      family: HAND,
      weight: "400",
      align: center ? "center" : "left",
      startDot: false
    });
    if (ok) line.classList.add("is-fitted");
  }

  function paintAllNow(root) {
    if (!root) return;
    [].slice.call(root.querySelectorAll(".stave-line")).forEach(paintStaveLine);
  }

  function bindPrint(root) {
    if (!root) return function () {};
    if (root._aaStaveUnbind) root._aaStaveUnbind();
    var lines = [].slice.call(root.querySelectorAll(".stave-line"));
    var obs = [];
    function paintAll() {
      lines.forEach(paintStaveLine);
    }
    schedule(paintAll);
    if (window.ResizeObserver) {
      lines.forEach(function (line) {
        var ro = new ResizeObserver(paintAll);
        ro.observe(line);
        obs.push(ro);
      });
    }
    function unbind() {
      obs.forEach(function (o) {
        o.disconnect();
      });
    }
    root._aaStaveUnbind = unbind;
    return unbind;
  }

  global.AAStave = {
    BAND: BAND,
    LINES: LINES,
    yOf: yOf,
    paintLetter: paintLetter,
    paintRun: paintRun,
    bind: bind,
    bindPrint: bindPrint,
    paintStaveLine: paintStaveLine,
    paintAllNow: paintAllNow,
    setPrintMode: setPrintMode
  };
})(window);
