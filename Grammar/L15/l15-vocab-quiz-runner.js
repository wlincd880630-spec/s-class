/**
 * L15 · 词汇测验运行器（5 模式 · 全库）
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function normKey(s) {
    return String(s || "")
      .trim()
      .toLowerCase();
  }

  function Runner(root) {
    this.root = root;
    this.mode = "cloze";
    this.cat = "";
    this.questions = [];
    this.idx = 0;
    this.score = 0;
    this.answered = 0;
    this._mount();
    this._bind();
    this._loadMode("cloze");
  }

  Runner.prototype._mount = function () {
    var modes = global.L15VocabQuizGen.MODES;
    var tabs = modes
      .map(function (m) {
        return (
          '<button type="button" class="vq-tab" data-mode="' +
          m.id +
          '"><span class="vq-tab-icon">' +
          m.icon +
          "</span>" +
          m.label +
          "</button>"
        );
      })
      .join("");

    var cats = global.L15Corpus ? Object.keys(global.L15Corpus.CAT_LABEL) : [];
    var catOpts =
      '<option value="">全部分类</option>' +
      cats
        .map(function (c) {
          return (
            '<option value="' +
            c +
            '">' +
            esc(global.L15Corpus.CAT_LABEL[c]) +
            "</option>"
          );
        })
        .join("");

    this.root.innerHTML =
      '<div class="vq-header">' +
      '<p class="vq-lead">五种测验方式 · 结合例句与真题语境 · 覆盖全库 <strong id="vq-total-n">—</strong> 条</p>' +
      '<div class="vq-tabs" role="tablist">' +
      tabs +
      "</div>" +
      '<div class="vq-filters">' +
      '<select id="vq-cat-filter" class="vq-select">' +
      catOpts +
      "</select>" +
      '<button type="button" class="vq-btn ghost" id="vq-shuffle">随机顺序</button>' +
      '<button type="button" class="vq-btn ghost" id="vq-reset">重置进度</button>' +
      "</div>" +
      "</div>" +
      '<div class="vq-mode-desc" id="vq-mode-desc"></div>' +
      '<div class="vq-progress-bar"><div class="vq-progress-fill" id="vq-progress-fill"></div></div>' +
      '<div class="vq-stats">' +
      '<span id="vq-stat-idx">0 / 0</span>' +
      '<span id="vq-stat-score">正确 0</span>' +
      '<span id="vq-stat-mode"></span>' +
      "</div>" +
      '<div class="vq-card" id="vq-question">' +
      '<p class="vq-stem" id="vq-stem"></p>' +
      '<div class="vq-stem-html" id="vq-stem-html"></div>' +
      '<div class="vq-opts" id="vq-opts"></div>' +
      '<div class="vq-fb" id="vq-fb" hidden></div>' +
      "</div>" +
      '<div class="vq-nav">' +
      '<button type="button" class="vq-btn" id="vq-prev">← 上一题</button>' +
      '<button type="button" class="vq-btn tts" id="vq-tts">🔊 朗读例句</button>' +
      '<button type="button" class="vq-btn primary" id="vq-next">下一题 →</button>' +
      "</div>" +
      '<div class="vq-dots" id="vq-dots"></div>';

    this.el = {
      total: this.root.querySelector("#vq-total-n"),
      desc: this.root.querySelector("#vq-mode-desc"),
      stem: this.root.querySelector("#vq-stem"),
      stemHtml: this.root.querySelector("#vq-stem-html"),
      opts: this.root.querySelector("#vq-opts"),
      fb: this.root.querySelector("#vq-fb"),
      statIdx: this.root.querySelector("#vq-stat-idx"),
      statScore: this.root.querySelector("#vq-stat-score"),
      statMode: this.root.querySelector("#vq-stat-mode"),
      fill: this.root.querySelector("#vq-progress-fill"),
      dots: this.root.querySelector("#vq-dots"),
      catFilter: this.root.querySelector("#vq-cat-filter"),
    };

    if (global.L15Corpus) {
      this.el.total.textContent = global.L15Corpus.TOTAL;
    }
  };

  Runner.prototype._bind = function () {
    var self = this;
    this.root.querySelectorAll(".vq-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        self._loadMode(btn.dataset.mode);
      });
    });
    this.el.catFilter.addEventListener("change", function () {
      self.cat = self.el.catFilter.value;
      self._loadMode(self.mode);
    });
    this.root.querySelector("#vq-prev").onclick = function () {
      self._goto(self.idx - 1);
    };
    this.root.querySelector("#vq-next").onclick = function () {
      if (self._currentDone()) self._goto(self.idx + 1);
      else self.el.fb.hidden = false;
    };
    this.root.querySelector("#vq-shuffle").onclick = function () {
      self._shuffle();
    };
    this.root.querySelector("#vq-reset").onclick = function () {
      self.score = 0;
      self.answered = 0;
      self._state = {};
      self._goto(0);
    };
    this.root.querySelector("#vq-tts").onclick = function () {
      var q = self.questions[self.idx];
      if (q && q.tts && global.playLessonAzureTtsPlain) {
        global.playLessonAzureTtsPlain(q.tts);
      }
    };
    this._state = {};
  };

  Runner.prototype._loadMode = function (mode) {
    this.mode = mode;
    this.root.querySelectorAll(".vq-tab").forEach(function (b) {
      b.classList.toggle("active", b.dataset.mode === mode);
    });
    var m = global.L15VocabQuizGen.MODES.find(function (x) {
      return x.id === mode;
    });
    this.el.desc.innerHTML =
      "<strong>" +
      (m ? m.label : mode) +
      "</strong> — " +
      (m ? m.desc : "") +
      " · 本题库 " +
      (this.cat ? global.L15Corpus.CAT_LABEL[this.cat] : "全库");

    this.questions = global.L15VocabQuizGen.buildQuizSet(
      global.L15Corpus.MASTER,
      mode,
      { cat: this.cat || null }
    );
    this.idx = 0;
    this._buildDots();
    this._render();
  };

  Runner.prototype._shuffle = function () {
    var qs = this.questions.slice();
    for (var i = qs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = qs[i];
      qs[i] = qs[j];
      qs[j] = t;
    }
    this.questions = qs;
    this.idx = 0;
    this._buildDots();
    this._render();
  };

  Runner.prototype._buildDots = function () {
    var self = this;
    var max = Math.min(this.questions.length, 40);
    var step = Math.max(1, Math.ceil(this.questions.length / max));
    this.el.dots.innerHTML = "";
    for (var i = 0; i < this.questions.length; i += step) {
      (function (j) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = String(j + 1);
        b.className = "vq-dot";
        b.onclick = function () {
          self._goto(j);
        };
        self.el.dots.appendChild(b);
      })(i);
    }
  };

  Runner.prototype._currentDone = function () {
    return !!(this._state[this.idx] && this._state[this.idx].done);
  };

  Runner.prototype._goto = function (i) {
    if (!this.questions.length) return;
    this.idx = Math.max(0, Math.min(this.questions.length - 1, i));
    this._render();
  };

  Runner.prototype._render = function () {
    var q = this.questions[this.idx];
    if (!q) {
      this.el.stem.textContent = "当前筛选下暂无题目。";
      return;
    }

    var saved = this._state[this.idx] || {};
    this.el.stem.textContent = q.stem;
    this.el.stemHtml.innerHTML = q.stemHtml || "";
    this.el.statIdx.textContent = this.idx + 1 + " / " + this.questions.length;
    this.el.statScore.textContent =
      "正确 " + this.score + " / 已答 " + this.answered;
    this.el.statMode.textContent = q.modeLabel || q.mode;
    this.el.fill.style.width =
      ((this.idx + 1) / this.questions.length) * 100 + "%";

    this.el.opts.innerHTML = "";
    var self = this;
    q.opts.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "vq-opt";
      if (/^[a-zA-Z0-9]/.test(opt)) btn.setAttribute("lang", "en");
      btn.textContent = opt;
      if (saved.done) {
        btn.disabled = true;
        if (normKey(opt) === normKey(q.ans)) btn.classList.add("ok");
        else if (normKey(opt) === normKey(saved.pick)) btn.classList.add("bad");
      }
      btn.onclick = function () {
        if (saved.done) return;
        saved.done = true;
        saved.pick = opt;
        var ok =
          normKey(opt) === normKey(q.ans) ||
          String(opt).trim() === String(q.ans).trim();
        saved.ok = ok;
        self._state[self.idx] = saved;
        if (ok) self.score++;
        self.answered++;
        self._render();
      };
      self.el.opts.appendChild(btn);
    });

    this.el.fb.hidden = !saved.done;
    this.el.fb.className = "vq-fb " + (saved.ok ? "ok" : "bad");
    this.el.fb.textContent = saved.done
      ? (saved.ok ? "✓ " : "✗ ") + (q.fb || q.ans)
      : "";

    this.el.dots.querySelectorAll(".vq-dot").forEach(function (d, j) {
      var qi = j * Math.max(1, Math.ceil(this.questions.length / 40));
      d.classList.toggle("active", qi === this.idx);
      var st = this._state[qi];
      d.classList.toggle("done", !!(st && st.ok));
    }, this);
  };

  function initAll() {
    document.querySelectorAll("[data-l15-vocab-quiz]:not([data-vq-inited])").forEach(function (el) {
      el.setAttribute("data-vq-inited", "1");
      if (global.L15Corpus && global.L15VocabQuizGen) {
        new Runner(el);
      }
    });
  }

  global.L15VocabQuizRunner = { Runner: Runner, init: initAll };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})(typeof window !== "undefined" ? window : globalThis);
