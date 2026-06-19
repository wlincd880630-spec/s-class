/**
 * L14 · 测验引擎（计时仅在本模式屏激活时运行，避免后台误标「已做」）
 */
(function (global) {
  "use strict";

  function stemText(q) {
    if (global.L14UI && typeof global.L14UI.quizStemText === "function") {
      return global.L14UI.quizStemText(q) || "请选择正确答案。";
    }
    if (!q) return "请选择正确答案。";
    if (q.stem) return q.stem;
    if (q.audio) return "听录音，选择与音频一致的句子。";
    if (q.prompt) return q.prompt;
    if (q.zh) return q.zh;
    return "请选择正确答案。";
  }

  function stemExtraHtml(q) {
    if (global.L14UI && typeof global.L14UI.quizStemExtraHtml === "function") {
      return global.L14UI.quizStemExtraHtml(q) || "";
    }
    if (q && q.audio && !q.stem) {
      return '<p class="zh-hint quiz-listen-hint">先点「播放本题」，再选答案。</p>';
    }
    return "";
  }

  function normOpts(q) {
    if (global.L14UI && typeof global.L14UI.quizOpts === "function") {
      return global.L14UI.quizOpts(q);
    }
    var raw = q && q.opts;
    if (!Array.isArray(raw)) return [];
    return raw
      .map(function (opt) {
        if (opt == null) return "";
        if (Array.isArray(opt)) return opt.filter(Boolean).join(" ");
        return String(opt);
      })
      .filter(function (s) {
        return s.length > 0;
      });
  }

  function fbText(q, saved) {
    var fb = q && q.fb != null ? String(q.fb) : "";
    if (!saved || !saved.answered) return "";
    return (saved.correct ? "✓ " : "") + fb;
  }

  function createQuizEngine(options) {
    const key = options.key;
    let items = options.items || [];
    const useTimer = !!options.useTimer;
    const escHtml = options.escHtml;
    const quizTimeSec = options.quizTimeSec || 8;
    const optRowClass = options.optRowClass || "opt-row";
    const optRowClassFn = options.optRowClassFn;
    const btnLangEnOnly = !!options.btnLangEnOnly;
    const onStateChange = options.onStateChange || function () {};

    const slotId = "quiz-" + key;
    const dotsId = "dots-" + key;
    const progId = "prog-" + key;
    const fxId = "quiz-fx-" + key;
    const fillId = "timer-fill-" + key;
    const textId = "timer-text-" + key;
    const barId = "timer-bar-" + key;

    let idx = 0;
    let state = normalizeState(options.initialState, items.length);
    let tickId = null;
    let fxTimer = null;
    let endAt = 0;
    let timerActive = false;

    function normalizeState(initial, len) {
      if (initial && initial.length === len) {
        return initial.map(function (s) {
          return { answered: !!s.answered, correct: !!s.correct, pick: s.pick };
        });
      }
      return Array.from({ length: len }, function () {
        return { answered: false, correct: false, pick: null };
      });
    }

    function exportState() {
      return state.map(function (s) {
        return { answered: s.answered, correct: s.correct, pick: s.pick };
      });
    }

    function notify() {
      onStateChange(exportState());
    }

    function clearTimer() {
      if (tickId) {
        clearInterval(tickId);
        tickId = null;
      }
    }

    function clearFx() {
      if (fxTimer) clearTimeout(fxTimer);
      const fx = document.getElementById(fxId);
      if (fx) {
        fx.hidden = true;
        fx.innerHTML = "";
      }
    }

    function showFx(kind) {
      const fx = document.getElementById(fxId);
      if (!fx) return;
      clearFx();
      fx.hidden = false;
      fx.className = "quiz-fx quiz-fx--" + (kind === "success" ? "success" : "fail") + " is-playing";
      fx.innerHTML = "<span class='quiz-fx-icon'>" + (kind === "success" ? "✓" : "✕") + "</span>";
      fxTimer = setTimeout(clearFx, 880);
    }

    function updateTimer(ratio, sec) {
      const fill = document.getElementById(fillId);
      const text = document.getElementById(textId);
      const bar = document.getElementById(barId);
      if (fill) fill.style.transform = "scaleX(" + Math.max(0, Math.min(1, ratio)) + ")";
      if (text) text.textContent = String(Math.max(0, sec));
      if (bar) {
        bar.classList.toggle("is-urgent", sec > 0 && sec <= 2);
        bar.classList.toggle("is-timeout", sec <= 0);
      }
    }

    function startTimer() {
      if (!useTimer || !timerActive) return;
      clearTimer();
      if (state[idx].answered) {
        updateTimer(state[idx].correct ? 1 : 0, 0);
        return;
      }
      endAt = Date.now() + quizTimeSec * 1000;
      function tick() {
        const left = Math.max(0, endAt - Date.now());
        updateTimer(left / (quizTimeSec * 1000), Math.ceil(left / 1000));
        if (left <= 0) {
          clearTimer();
          resolve(false, null);
        }
      }
      tick();
      tickId = setInterval(tick, 50);
    }

    function syncDots() {
      document.querySelectorAll("#" + dotsId + " button").forEach(function (b, j) {
        b.classList.toggle("active", j === idx);
        b.classList.toggle("done", !!(state[j] && state[j].answered && state[j].correct));
      });
    }

    function resolve(correct, pick) {
      if (state[idx].answered) return;
      clearTimer();
      state[idx].answered = true;
      state[idx].pick = pick;
      state[idx].correct = correct;
      notify();
      render(idx);
      if (correct) showFx("success");
      else showFx("fail");
    }

    function render(i) {
      idx = (i + items.length) % items.length;
      clearTimer();
      clearFx();
      const q = items[idx];
      const saved = state[idx];
      const slot = document.getElementById(slotId);
      if (!slot || !q) return;

      slot.innerHTML = "";
      const d = document.createElement("div");
      d.className = "quiz-item" + (saved.answered && saved.correct ? " done" : "");
      d.innerHTML =
        "<p class='quiz-stem'>" + (idx + 1) + ". " + escHtml(stemText(q)) + "</p>" +
        (stemExtraHtml(q) || "");
      const row = document.createElement("div");
      row.className = typeof optRowClassFn === "function" ? optRowClassFn(q, normOpts(q)) : optRowClass;
      const fb = document.createElement("div");
      fb.className = "fb";
      const opts = normOpts(q);
      opts.forEach(function (opt) {
        const btn = document.createElement("button");
        btn.type = "button";
        if (!btnLangEnOnly || /^[a-zA-Z]/.test(opt)) btn.setAttribute("lang", "en");
        btn.textContent = opt;
        if (saved.answered) {
          btn.disabled = true;
          if (opt === q.ans) btn.classList.add("ok");
          else if (opt === saved.pick) btn.classList.add("bad");
        }
        btn.addEventListener("click", function () {
          resolve(opt === q.ans, opt);
        });
        row.appendChild(btn);
      });
      if (saved.answered) fb.textContent = fbText(q, saved);
      d.appendChild(row);
      d.appendChild(fb);
      slot.appendChild(d);

      const prog = document.getElementById(progId);
      if (prog) prog.textContent = (idx + 1) + " / " + items.length;
      syncDots();

      if (timerActive && useTimer) startTimer();
      else if (useTimer && saved.answered) updateTimer(saved.correct ? 1 : 0, 0);
      else if (useTimer) updateTimer(1, quizTimeSec);
    }

    function bindNav() {
      document.querySelectorAll("[data-quiz-prev='" + key + "']").forEach(function (btn) {
        btn.onclick = function () {
          render(idx - 1);
        };
      });
      document.querySelectorAll("[data-quiz-next='" + key + "']").forEach(function (btn) {
        btn.onclick = function () {
          render(idx + 1);
        };
      });
    }

    function rebuildDots() {
      const dots = document.getElementById(dotsId);
      if (!dots) return;
      dots.innerHTML = "";
      items.forEach(function (_, j) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = String(j + 1);
        b.addEventListener("click", function () {
          render(j);
        });
        dots.appendChild(b);
      });
      bindNav();
    }

    function reloadItems(newItems, resetState) {
      if (newItems && newItems.length) items = newItems;
      idx = 0;
      if (resetState) {
        state = normalizeState(null, items.length);
      } else {
        state = normalizeState(exportState(), items.length);
      }
      notify();
      rebuildDots();
      if (timerActive) render(0);
      else render(idx);
    }

    function init() {
      rebuildDots();
      render(0);
    }

    function onEnter() {
      timerActive = true;
      render(idx);
    }

    function onLeave() {
      timerActive = false;
      clearTimer();
      clearFx();
    }

    return {
      init: init,
      onEnter: onEnter,
      onLeave: onLeave,
      reloadItems: reloadItems,
      rebuildDots: rebuildDots,
      getAudio: function () {
        return items[idx] && items[idx].audio;
      },
      getIdx: function () {
        return idx;
      }
    };
  }

  global.L14Quiz = {
    create: createQuizEngine
  };
})(typeof window !== "undefined" ? window : this);
