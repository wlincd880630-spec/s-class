/**
 * Lesson 05 · HTML5 拖拽在触摸屏上的补偿（Pointer Events + Touch 回退）
 * 桌面端仍使用原生 dragstart/drop；仅对 touch/pen 使用指针轨迹 + elementFromPoint 模拟放手命中。
 */
(function (global) {
  "use strict";

  function injectStyles() {
    if (document.getElementById("lesson-dnd-touch-style")) return;
    var s = document.createElement("style");
    s.id = "lesson-dnd-touch-style";
    s.textContent =
      ".lesson-dnd-touch-dragging{z-index:50!important;opacity:0.92!important;transform:scale(1.04);touch-action:none!important;-webkit-user-select:none;user-select:none;}" +
      ".lesson-dnd-drop-hover{outline:3px dashed rgba(21,101,192,.95)!important;outline-offset:4px!important;border-radius:12px;}";
    document.head.appendChild(s);
  }

  function clearHover(cls, root) {
    var scope = root || document;
    scope.querySelectorAll("." + cls).forEach(function (n) {
      n.classList.remove(cls);
    });
  }

  /**
   * @param {object} opts
   * @param {Element} opts.root - 事件委托根（必须在 DOM 内）
   * @param {string} opts.dragSelector
   * @param {string} opts.dropSelector
   * @param {function(Element, Event): string} [opts.getPayload]
   * @param {function(Element, Event): boolean} [opts.canDrag]
   * @param {function({dragEl, dropEl, payload, originalEvent}): void} opts.onDrop
   * @param {string} [opts.hoverClass]
   * @returns {function(): void} destroy
   */
  function bindTouchDrop(opts) {
    injectStyles();
    var root = opts.root;
    var dragSel = opts.dragSelector;
    var dropSel = opts.dropSelector;
    var hoverCls = opts.hoverClass || "lesson-dnd-drop-hover";
    var getPayload =
      opts.getPayload ||
      function (el) {
        if (el.dataset && el.dataset.word != null) return String(el.dataset.word);
        if (el.dataset && el.dataset.item != null) return String(el.dataset.item);
        if (el.dataset && el.dataset.dragId != null) return String(el.dataset.dragId);
        return String(el.textContent || "").trim();
      };
    var canDrag = opts.canDrag || function () {
      return true;
    };
    var onDrop = opts.onDrop;

    function handleStart(clientX, clientY, dragEl, payload, ev) {
      dragEl.classList.add("lesson-dnd-touch-dragging");

      function updateHover(x, y) {
        clearHover(hoverCls, root);
        var under = document.elementFromPoint(x, y);
        var drop = under && under.closest(dropSel);
        if (drop && root.contains(drop)) drop.classList.add(hoverCls);
      }

      function finish(x, y, originalEvent) {
        clearHover(hoverCls, root);
        dragEl.classList.remove("lesson-dnd-touch-dragging");
        var under = document.elementFromPoint(x, y);
        var drop = under && under.closest(dropSel);
        if (drop && root.contains(drop) && onDrop) {
          onDrop({
            dragEl: dragEl,
            dropEl: drop,
            payload: payload,
            originalEvent: originalEvent
          });
          /* 阻止触摸放手后浏览器合成的「幽灵点击」再次触发按钮逻辑 */
          function killClick(ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            dragEl.removeEventListener("click", killClick, true);
          }
          dragEl.addEventListener("click", killClick, true);
        }
      }

      updateHover(clientX, clientY);

      return { updateHover: updateHover, finish: finish };
    }

    /* Pointer Events（Chrome / Edge / 新版 Safari） */
    function onPointerDown(e) {
      if (e.pointerType === "mouse") return;
      var dragEl = e.target.closest(dragSel);
      if (!dragEl || !root.contains(dragEl)) return;
      if (!canDrag(dragEl, e)) return;
      e.preventDefault();
      var payload = getPayload(dragEl, e);
      var state = handleStart(e.clientX, e.clientY, dragEl, payload, e);

      function move(ev) {
        if (ev.pointerId !== e.pointerId) return;
        ev.preventDefault();
        state.updateHover(ev.clientX, ev.clientY);
      }
      function up(ev) {
        if (ev.pointerId !== e.pointerId) return;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
        state.finish(ev.clientX, ev.clientY, ev);
      }

      document.addEventListener("pointermove", move, { passive: false });
      document.addEventListener("pointerup", up);
      document.addEventListener("pointercancel", up);
    }

    /* Touch 回退（旧版 WebKit） */
    function onTouchStart(e) {
      if (typeof PointerEvent !== "undefined") return;
      if (e.touches.length !== 1) return;
      var touch = e.touches[0];
      var dragEl = e.target.closest(dragSel);
      if (!dragEl || !root.contains(dragEl)) return;
      if (!canDrag(dragEl, e)) return;
      e.preventDefault();
      var payload = getPayload(dragEl, e);
      var state = handleStart(touch.clientX, touch.clientY, dragEl, payload, e);

      function move(ev) {
        if (ev.touches.length !== 1) return;
        ev.preventDefault();
        var t = ev.touches[0];
        state.updateHover(t.clientX, t.clientY);
      }
      function end(ev) {
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", end);
        document.removeEventListener("touchcancel", end);
        var t = ev.changedTouches && ev.changedTouches[0];
        if (t) state.finish(t.clientX, t.clientY, ev);
        else state.finish(0, 0, ev);
      }

      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("touchend", end);
      document.addEventListener("touchcancel", end);
    }

    root.addEventListener("pointerdown", onPointerDown, true);
    root.addEventListener("touchstart", onTouchStart, { capture: true, passive: false });

    return function destroy() {
      root.removeEventListener("pointerdown", onPointerDown, true);
      root.removeEventListener("touchstart", onTouchStart, { capture: true });
    };
  }

  global.LessonDnD = {
    bindTouchDrop: bindTouchDrop
  };
})(typeof window !== "undefined" ? window : this);
