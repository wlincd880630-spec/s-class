/**
 * S-Class 触屏教学标注 / 白板
 * 两个入口按钮：页面标注（透明叠层）+ 全屏白板
 * 工具栏：撤回、清除、切换白板、退出白板、退出书写
 */
(function () {
  "use strict";

  if (document.documentElement.hasAttribute("data-no-drawing-overlay")) return;

  var ROOT_ID = "sclass-drawing-overlay";
  var FAB_ID = "sclass-drawing-fabs";
  var PEN_COLOR = "#e53935";
  var PEN_WIDTH = 3;
  var MARKER = "sclass-drawing-overlay.js";

  var mode = null; // null | 'annotate' | 'whiteboard'
  var entryMode = null;
  var strokes = [];
  var currentStroke = null;
  var drawing = false;
  var canvasW = 0;
  var canvasH = 0;

  var root, whiteboardBg, canvas, ctx, toolbar, fabs;
  var btnUndo, btnClear, btnWhiteboard, btnExitWhiteboard, btnExit;

  function createEl(tag, cls, html) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html != null) el.innerHTML = html;
    return el;
  }

  function buildUI() {
    if (document.getElementById(ROOT_ID)) return;

    fabs = createEl("div", "sclass-draw-fabs");
    fabs.id = FAB_ID;

    var fabAnnotate = createEl("button", "sclass-draw-fab", "标注");
    fabAnnotate.type = "button";
    fabAnnotate.title = "在页面上标注";
    fabAnnotate.setAttribute("aria-label", "在页面上标注");
    fabAnnotate.addEventListener("click", function () {
      enterMode("annotate", "annotate");
    });

    var fabWhiteboard = createEl("button", "sclass-draw-fab sclass-draw-fab--whiteboard", "白板");
    fabWhiteboard.type = "button";
    fabWhiteboard.title = "打开全屏白板";
    fabWhiteboard.setAttribute("aria-label", "打开全屏白板");
    fabWhiteboard.addEventListener("click", function () {
      enterMode("whiteboard", "whiteboard");
    });

    fabs.appendChild(fabAnnotate);
    fabs.appendChild(fabWhiteboard);
    document.body.appendChild(fabs);

    root = createEl("div", "sclass-draw-root");
    root.id = ROOT_ID;
    root.setAttribute("role", "application");
    root.setAttribute("aria-label", "触屏书写");

    whiteboardBg = createEl("div", "sclass-draw-whiteboard-bg");
    canvas = createEl("canvas", "sclass-draw-canvas");
    ctx = canvas.getContext("2d");

    toolbar = createEl("div", "sclass-draw-toolbar");

    btnUndo = makeToolBtn("撤回", function () {
      undo();
    });
    btnClear = makeToolBtn("清除", function () {
      clearStrokes();
    });
    btnWhiteboard = makeToolBtn("白板", function () {
      switchToWhiteboard();
    });
    btnExitWhiteboard = makeToolBtn("退出白板", function () {
      exitWhiteboard();
    });
    btnExit = makeToolBtn("退出", function () {
      exitMode();
    });
    btnExit.classList.add("is-exit");

    toolbar.appendChild(btnUndo);
    toolbar.appendChild(btnClear);
    toolbar.appendChild(btnWhiteboard);
    toolbar.appendChild(btnExitWhiteboard);
    toolbar.appendChild(btnExit);

    root.appendChild(whiteboardBg);
    root.appendChild(canvas);
    root.appendChild(toolbar);
    document.body.appendChild(root);

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    window.addEventListener("resize", onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
      window.visualViewport.addEventListener("scroll", onResize);
    }
  }

  function makeToolBtn(label, handler) {
    var btn = createEl("button", "", label);
    btn.type = "button";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      handler();
    });
    return btn;
  }

  function enterMode(nextMode, from) {
    mode = nextMode;
    entryMode = from || nextMode;
    strokes = [];
    currentStroke = null;
    drawing = false;

    root.classList.add("is-active");
    root.classList.toggle("is-annotate", nextMode === "annotate");
    root.classList.toggle("is-whiteboard", nextMode === "whiteboard");
    document.documentElement.classList.add("sclass-draw-active");
    fabs.classList.add("is-hidden");

    updateToolbar();
    resizeCanvas();
    redraw();
  }

  function exitMode() {
    mode = null;
    entryMode = null;
    strokes = [];
    currentStroke = null;
    drawing = false;

    root.classList.remove("is-active", "is-annotate", "is-whiteboard");
    document.documentElement.classList.remove("sclass-draw-active");
    fabs.classList.remove("is-hidden");
  }

  function switchToWhiteboard() {
    if (mode === "whiteboard") return;
    strokes = [];
    currentStroke = null;
    mode = "whiteboard";
    root.classList.remove("is-annotate");
    root.classList.add("is-whiteboard");
    updateToolbar();
    resizeCanvas();
    redraw();
  }

  function exitWhiteboard() {
    if (entryMode === "whiteboard") {
      exitMode();
      return;
    }
    strokes = [];
    currentStroke = null;
    mode = "annotate";
    root.classList.remove("is-whiteboard");
    root.classList.add("is-annotate");
    updateToolbar();
    resizeCanvas();
    redraw();
  }

  function updateToolbar() {
    var isWb = mode === "whiteboard";
    btnWhiteboard.style.display = isWb ? "none" : "";
    btnExitWhiteboard.style.display = isWb ? "" : "none";
  }

  function resizeCanvas() {
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvasW = w;
    canvasH = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }

  function onResize() {
    if (!mode) return;
    resizeCanvas();
  }

  function canvasPoint(e) {
    var rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e) {
    if (!mode) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    drawing = true;
    var pt = canvasPoint(e);
    currentStroke = {
      color: PEN_COLOR,
      width: PEN_WIDTH,
      points: [pt],
    };
    strokes.push(currentStroke);
    drawStrokeSegment(currentStroke, 0);
  }

  function onPointerMove(e) {
    if (!drawing || !currentStroke) return;
    e.preventDefault();
    var pt = canvasPoint(e);
    var pts = currentStroke.points;
    var prev = pts[pts.length - 1];
    pts.push(pt);
    drawStrokeSegment(currentStroke, pts.length - 2);
  }

  function onPointerUp(e) {
    if (!drawing) return;
    e.preventDefault();
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {}
    drawing = false;
    currentStroke = null;
  }

  function drawStrokeSegment(stroke, fromIdx) {
    var pts = stroke.points;
    if (pts.length < 2) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.beginPath();
    ctx.moveTo(pts[fromIdx].x, pts[fromIdx].y);
    for (var i = fromIdx + 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function redraw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasW, canvasH);
    for (var i = 0; i < strokes.length; i++) {
      var s = strokes[i];
      if (s.points.length < 2) continue;
      for (var j = 0; j < s.points.length - 1; j++) {
        drawStrokeSegment(s, j);
      }
    }
  }

  function undo() {
    if (!strokes.length) return;
    strokes.pop();
    currentStroke = null;
    drawing = false;
    redraw();
  }

  function clearStrokes() {
    strokes = [];
    currentStroke = null;
    drawing = false;
    redraw();
  }

  function init() {
    if (!document.body) return;
    buildUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  global.SClassDrawingOverlay = {
    version: MARKER,
    enterAnnotate: function () {
      enterMode("annotate", "annotate");
    },
    enterWhiteboard: function () {
      enterMode("whiteboard", "whiteboard");
    },
    exit: exitMode,
  };
})(typeof window !== "undefined" ? window : this);
