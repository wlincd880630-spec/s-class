/**
 * S-Class 触屏书写 / 白板标注工具
 * 在课程页提供全屏书写、撤回、清除、白纸白板与退出。
 * 自包含：注入样式与 DOM，可被任意页面通过 <script src> 引入。
 */
(function () {
  'use strict';

  if (window.__SCLASS_ANNOTATE_LOADED) return;
  window.__SCLASS_ANNOTATE_LOADED = true;

  var COLORS = [
    { id: 'red', value: '#e11d48', label: '红' },
    { id: 'blue', value: '#2563eb', label: '蓝' },
    { id: 'black', value: '#111827', label: '黑' },
    { id: 'green', value: '#059669', label: '绿' }
  ];
  var WIDTHS = [
    { id: 's', value: 3, label: '细' },
    { id: 'm', value: 6, label: '中' },
    { id: 'l', value: 10, label: '粗' }
  ];

  var state = {
    active: false,
    whiteboard: false,
    drawing: false,
    color: COLORS[0].value,
    width: WIDTHS[1].value,
    strokes: [],
    redoStack: [],
    current: null
  };

  var root, canvas, ctx, boardEl, fab, toolbar;
  var dpr = Math.max(1, window.devicePixelRatio || 1);

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function injectStyles() {
    if (document.getElementById('sclass-annotate-style')) return;
    var style = document.createElement('style');
    style.id = 'sclass-annotate-style';
    style.textContent = [
      '#sclass-annotate-root{all:initial;position:fixed;inset:0;z-index:2147483000;pointer-events:none;font-family:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;}',
      '#sclass-annotate-root *{box-sizing:border-box;font-family:inherit;}',
      '#sclass-annotate-fab{pointer-events:auto;position:fixed;right:16px;bottom:24px;z-index:2147483002;width:56px;height:56px;border:none;border-radius:50%;background:#0f766e;color:#fff;box-shadow:0 8px 24px rgba(15,118,110,.35);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;letter-spacing:.02em;line-height:1.15;padding:8px;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .15s ease,background .15s ease,box-shadow .15s ease;}',
      '#sclass-annotate-fab:hover{transform:scale(1.05);background:#0d9488;}',
      '#sclass-annotate-fab:active{transform:scale(.96);}',
      '#sclass-annotate-fab.is-active{background:#b45309;box-shadow:0 8px 24px rgba(180,83,9,.4);}',
      '#sclass-annotate-board{position:fixed;inset:0;z-index:2147483000;background:#fff;display:none;pointer-events:none;}',
      '#sclass-annotate-board.is-on{display:block;}',
      '#sclass-annotate-canvas{position:fixed;inset:0;z-index:2147483001;width:100%;height:100%;display:none;touch-action:none;cursor:crosshair;pointer-events:none;}',
      '#sclass-annotate-root.is-drawing #sclass-annotate-canvas{display:block;pointer-events:auto;}',
      '#sclass-annotate-toolbar{pointer-events:auto;position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147483003;display:none;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;max-width:calc(100vw - 24px);padding:8px 10px;background:rgba(15,23,42,.92);color:#f8fafc;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.28);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}',
      '#sclass-annotate-root.is-drawing #sclass-annotate-toolbar{display:flex;}',
      '#sclass-annotate-toolbar button,#sclass-annotate-toolbar .sclass-ann-swatch{appearance:none;border:1px solid transparent;background:rgba(255,255,255,.08);color:#fff;border-radius:10px;min-height:40px;min-width:40px;padding:0 10px;font-size:13px;font-weight:600;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;line-height:1;}',
      '#sclass-annotate-toolbar button:hover{background:rgba(255,255,255,.16);}',
      '#sclass-annotate-toolbar button:active{transform:scale(.97);}',
      '#sclass-annotate-toolbar button.is-on{background:#14b8a6;border-color:#5eead4;color:#042f2e;}',
      '#sclass-annotate-toolbar button.is-warn{background:rgba(248,113,113,.2);}',
      '#sclass-annotate-toolbar button:disabled{opacity:.4;cursor:default;}',
      '#sclass-annotate-toolbar .sclass-ann-group{display:flex;align-items:center;gap:4px;}',
      '#sclass-annotate-toolbar .sclass-ann-sep{width:1px;height:24px;background:rgba(255,255,255,.2);margin:0 2px;}',
      '#sclass-annotate-toolbar .sclass-ann-swatch{width:36px;min-width:36px;padding:0;border-radius:50%;border:2px solid rgba(255,255,255,.35);}',
      '#sclass-annotate-toolbar .sclass-ann-swatch.is-on{border-color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.35);}',
      '#sclass-annotate-hint{pointer-events:none;position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:2147483003;display:none;padding:8px 14px;border-radius:999px;background:rgba(15,23,42,.78);color:#fff;font-size:13px;white-space:nowrap;}',
      '#sclass-annotate-root.is-drawing #sclass-annotate-hint{display:block;}',
      '@media (max-width:720px){',
      '#sclass-annotate-toolbar{top:auto;bottom:88px;left:12px;right:12px;transform:none;max-width:none;justify-content:flex-start;}',
      '#sclass-annotate-hint{bottom:auto;top:12px;}',
      '#sclass-annotate-fab{right:12px;bottom:16px;width:52px;height:52px;font-size:12px;}',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') node.className = attrs[k];
        else if (k === 'cssText') node.style.cssText = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (text != null) node.textContent = text;
    return node;
  }

  function buildUI() {
    if (document.getElementById('sclass-annotate-root')) return;

    root = el('div', { id: 'sclass-annotate-root' });
    boardEl = el('div', { id: 'sclass-annotate-board', 'aria-hidden': 'true' });
    canvas = el('canvas', { id: 'sclass-annotate-canvas' });
    toolbar = el('div', { id: 'sclass-annotate-toolbar', role: 'toolbar', 'aria-label': '书写工具栏' });
    fab = el('button', {
      id: 'sclass-annotate-fab',
      type: 'button',
      title: '开启书写标注',
      'aria-label': '开启书写标注'
    }, '书写');
    var hint = el('div', { id: 'sclass-annotate-hint' }, '手指或触控笔可直接在屏幕上标注');

    // Colors
    var colorGroup = el('div', { className: 'sclass-ann-group' });
    COLORS.forEach(function (c, i) {
      var btn = el('button', {
        type: 'button',
        className: 'sclass-ann-swatch' + (i === 0 ? ' is-on' : ''),
        title: c.label,
        'data-color': c.value,
        'aria-label': c.label + '笔'
      });
      btn.style.background = c.value;
      colorGroup.appendChild(btn);
    });

    // Widths
    var widthGroup = el('div', { className: 'sclass-ann-group' });
    WIDTHS.forEach(function (w, i) {
      var btn = el('button', {
        type: 'button',
        className: i === 1 ? 'is-on' : '',
        title: w.label,
        'data-width': String(w.value)
      }, w.label);
      widthGroup.appendChild(btn);
    });

    var btnUndo = el('button', { type: 'button', id: 'sclass-ann-undo', title: '撤回' }, '撤回');
    var btnClear = el('button', { type: 'button', id: 'sclass-ann-clear', className: 'is-warn', title: '清除全部笔迹' }, '清除');
    var btnBoard = el('button', { type: 'button', id: 'sclass-ann-board', title: '显示白纸白板' }, '白板');
    var btnExitBoard = el('button', { type: 'button', id: 'sclass-ann-exit-board', title: '退出白纸', style: 'display:none' }, '退出白纸');
    var btnExit = el('button', { type: 'button', id: 'sclass-ann-exit', title: '退出书写' }, '退出书写');

    toolbar.appendChild(colorGroup);
    toolbar.appendChild(el('div', { className: 'sclass-ann-sep' }));
    toolbar.appendChild(widthGroup);
    toolbar.appendChild(el('div', { className: 'sclass-ann-sep' }));
    toolbar.appendChild(btnUndo);
    toolbar.appendChild(btnClear);
    toolbar.appendChild(el('div', { className: 'sclass-ann-sep' }));
    toolbar.appendChild(btnBoard);
    toolbar.appendChild(btnExitBoard);
    toolbar.appendChild(btnExit);

    root.appendChild(boardEl);
    root.appendChild(canvas);
    root.appendChild(toolbar);
    root.appendChild(hint);
    document.body.appendChild(root);
    // FAB stays outside root so it remains clickable when root pointer-events change
    document.body.appendChild(fab);

    ctx = canvas.getContext('2d');
    resizeCanvas();
    bindEvents();
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    dpr = Math.max(1, window.devicePixelRatio || 1);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    redraw();
  }

  function redraw() {
    if (!ctx || !canvas) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < state.strokes.length; i++) {
      drawStroke(state.strokes[i]);
    }
    if (state.current) drawStroke(state.current);
  }

  function drawStroke(stroke) {
    var pts = stroke.points;
    if (!pts || !pts.length) return;
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    if (pts.length === 1) {
      ctx.lineTo(pts[0].x + 0.01, pts[0].y);
    } else {
      for (var i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
    }
    ctx.stroke();
  }

  function pointFromEvent(e) {
    var t = e;
    if (e.touches && e.touches.length) t = e.touches[0];
    else if (e.changedTouches && e.changedTouches.length) t = e.changedTouches[0];
    return { x: t.clientX, y: t.clientY };
  }

  function startDraw(e) {
    if (!state.active) return;
    // Ignore multi-touch for pinch gestures
    if (e.touches && e.touches.length > 1) return;
    state.drawing = true;
    state.redoStack = [];
    var p = pointFromEvent(e);
    state.current = {
      color: state.color,
      width: state.width,
      points: [p]
    };
    redraw();
    e.preventDefault();
  }

  function moveDraw(e) {
    if (!state.drawing || !state.current) return;
    if (e.touches && e.touches.length > 1) return;
    var p = pointFromEvent(e);
    var pts = state.current.points;
    var last = pts[pts.length - 1];
    // Skip tiny jitter
    if (last && Math.hypot(p.x - last.x, p.y - last.y) < 1.5) return;
    pts.push(p);
    // Incremental draw for smoothness
    ctx.strokeStyle = state.current.color;
    ctx.lineWidth = state.current.width;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    e.preventDefault();
  }

  function endDraw(e) {
    if (!state.drawing) return;
    state.drawing = false;
    if (state.current && state.current.points.length) {
      state.strokes.push(state.current);
    }
    state.current = null;
    updateToolbarState();
    if (e) e.preventDefault();
  }

  function setActive(on) {
    state.active = !!on;
    if (on) {
      root.classList.add('is-drawing');
      fab.classList.add('is-active');
      fab.textContent = '书写中';
      fab.title = '退出书写';
      fab.setAttribute('aria-label', '退出书写');
      resizeCanvas();
    } else {
      root.classList.remove('is-drawing');
      fab.classList.remove('is-active');
      fab.textContent = '书写';
      fab.title = '开启书写标注';
      fab.setAttribute('aria-label', '开启书写标注');
      state.drawing = false;
      state.current = null;
      // Keep strokes when exiting so teacher can re-enter; clear only on explicit clear/exit board flow.
      // On full exit of writing, clear annotations to avoid blocking UI later.
      state.strokes = [];
      state.redoStack = [];
      setWhiteboard(false);
      redraw();
    }
    updateToolbarState();
  }

  function setWhiteboard(on) {
    state.whiteboard = !!on;
    if (on) boardEl.classList.add('is-on');
    else boardEl.classList.remove('is-on');
    var btnBoard = document.getElementById('sclass-ann-board');
    var btnExitBoard = document.getElementById('sclass-ann-exit-board');
    if (btnBoard && btnExitBoard) {
      btnBoard.style.display = on ? 'none' : '';
      btnExitBoard.style.display = on ? '' : 'none';
    }
  }

  function undo() {
    if (!state.strokes.length) return;
    state.redoStack.push(state.strokes.pop());
    redraw();
    updateToolbarState();
  }

  function clearAll() {
    state.strokes = [];
    state.redoStack = [];
    state.current = null;
    redraw();
    updateToolbarState();
  }

  function updateToolbarState() {
    var btnUndo = document.getElementById('sclass-ann-undo');
    if (btnUndo) btnUndo.disabled = !state.strokes.length;
  }

  function bindEvents() {
    fab.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setActive(!state.active);
    });

    toolbar.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || t === toolbar) return;
      if (t.closest) t = t.closest('button') || t;
      if (!t || t.tagName !== 'BUTTON') return;

      e.preventDefault();
      e.stopPropagation();

      if (t.getAttribute('data-color')) {
        state.color = t.getAttribute('data-color');
        Array.prototype.forEach.call(toolbar.querySelectorAll('[data-color]'), function (b) {
          b.classList.toggle('is-on', b === t);
        });
        return;
      }
      if (t.getAttribute('data-width')) {
        state.width = parseFloat(t.getAttribute('data-width'));
        Array.prototype.forEach.call(toolbar.querySelectorAll('[data-width]'), function (b) {
          b.classList.toggle('is-on', b === t);
        });
        return;
      }
      if (t.id === 'sclass-ann-undo') {
        undo();
        return;
      }
      if (t.id === 'sclass-ann-clear') {
        clearAll();
        return;
      }
      if (t.id === 'sclass-ann-board') {
        setWhiteboard(true);
        return;
      }
      if (t.id === 'sclass-ann-exit-board') {
        setWhiteboard(false);
        return;
      }
      if (t.id === 'sclass-ann-exit') {
        setActive(false);
      }
    });

    // Pointer events preferred; fall back handled via pointer which covers touch/mouse/pen
    canvas.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      startDraw(e);
    });
    canvas.addEventListener('pointermove', moveDraw);
    canvas.addEventListener('pointerup', endDraw);
    canvas.addEventListener('pointercancel', endDraw);
    canvas.addEventListener('pointerleave', function (e) {
      if (state.drawing) endDraw(e);
    });

    // Prevent page scroll while drawing on touch devices
    canvas.addEventListener('touchstart', function (e) { if (state.active) e.preventDefault(); }, { passive: false });
    canvas.addEventListener('touchmove', function (e) { if (state.active) e.preventDefault(); }, { passive: false });

    window.addEventListener('resize', function () {
      if (state.active) resizeCanvas();
    });

    window.addEventListener('orientationchange', function () {
      setTimeout(function () {
        if (state.active) resizeCanvas();
      }, 200);
    });

    // Esc exits writing
    document.addEventListener('keydown', function (e) {
      if (!state.active) return;
      if (e.key === 'Escape') setActive(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      }
    });
  }

  ready(function () {
    try {
      injectStyles();
      buildUI();
    } catch (err) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[S-Class annotate]', err);
      }
    }
  });
})();
