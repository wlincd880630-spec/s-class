/**
 * L15 · 词汇浏览器 v3：富文本卡片 + 例句语境
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function norm(s) {
    return String(s || "").toLowerCase();
  }

  function catLabel(cat) {
    return (global.L15Corpus && global.L15Corpus.CAT_LABEL[cat]) || cat;
  }

  function itemHtml(it) {
    var tierBadge = it.tier
      ? '<span class="vocab-badge tier' + it.tier + '">Tier ' + it.tier + "</span>"
      : "";
    var yearBadge = it.year
      ? '<span class="vocab-badge year">' + esc(it.year) + "</span>"
      : "";
    var catBadge =
      '<span class="vocab-badge cat">' + esc(catLabel(it.cat)) + "</span>";
    var tts =
      '<button type="button" class="tts-btn" data-tts="' +
      esc(it.en).replace(/"/g, "") +
      '" aria-label="朗读">🔊 朗读</button>';
    var exEn = it.exEn || it.note || "";
    var exZh = it.exZh || it.zh || "";
    var exEn2 = it.exEn2 || "";
    var exZh2 = it.exZh2 || "";
    var examEn = it.examEn || "";
    var examZh = it.examZh || "";
    var examYear = it.examYear || it.year || "";
    var ctx = it.ctx || it.year || "";
    var isTier = it.cat === "tier2" || it.cat === "tier3";
    var isPredict = it.cat === "predict";

    return (
      '<article class="vocab-card" data-id="' +
      it.id +
      '" data-cat="' +
      esc(it.cat) +
      '">' +
      '<div class="vocab-card-head">' +
      '<div class="vocab-card-en" lang="en">' +
      esc(it.en) +
      "</div>" +
      tts +
      "</div>" +
      '<div class="vocab-card-badges">' +
      catBadge +
      tierBadge +
      yearBadge +
      "</div>" +
      '<div class="vocab-card-zh">' +
      esc(it.zh) +
      (it.tag ? " · " + esc(it.tag) : "") +
      "</div>" +
      (exEn
        ? '<div class="vocab-example' +
          (isTier ? " vocab-example-practical" : isPredict ? " vocab-example-predict" : "") +
          '">' +
          '<div class="vocab-example-label">' +
          (isTier ? "主题例句 · 中考运用" : isPredict ? "例句 ①" : "例句 · Context") +
          "</div>" +
          '<p class="vocab-example-en" lang="en">' +
          esc(exEn) +
          "</p>" +
          '<p class="vocab-example-zh">' +
          esc(exZh) +
          "</p>" +
          "</div>"
        : "") +
      (exEn2
        ? '<div class="vocab-example vocab-example-predict">' +
          '<div class="vocab-example-label">例句 ②</div>' +
          '<p class="vocab-example-en" lang="en">' +
          esc(exEn2) +
          "</p>" +
          '<p class="vocab-example-zh">' +
          esc(exZh2) +
          "</p>" +
          "</div>"
        : "") +
      (examEn
        ? '<div class="vocab-example vocab-example-exam">' +
          '<div class="vocab-example-label">真题原文 · ' +
          esc(examYear) +
          "</div>" +
          '<p class="vocab-example-en" lang="en">' +
          esc(examEn) +
          "</p>" +
          (examZh ? '<p class="vocab-example-zh">' + esc(examZh) + "</p>" : "") +
          "</div>"
        : "") +
      (ctx ? '<div class="vocab-ctx">' + esc(ctx) + "</div>" : "") +
      "</article>"
    );
  }

  function VocabBrowser(root, opts) {
    this.root = root;
    this.opts = opts || {};
    this.stepper = !!opts.stepper;
    this.perPage = this.stepper ? 1 : opts.perPage || 12;
    this.cats = opts.cats || null;
    this.tiers = opts.tiers || null;
    this.examOnly = !!opts.examOnly;
    this.page = 0;
    this.index = 0;
    this.activeCat = opts.defaultCat || (opts.cats && opts.cats[0]) || "all";
    this.year = opts.defaultYear || "";
    this.q = "";
    this._mount();
    this._bind();
    this.refresh();
  }

  function wordListItemHtml(it, idx, active) {
    var year = it.year || (it.cat === "predict" ? "预测" : "");
    return (
      '<button type="button" class="vb-word-item' +
      (active ? " is-active" : "") +
      '" data-idx="' +
      idx +
      '">' +
      '<span class="vb-word-item-en" lang="en">' +
      esc(it.en) +
      "</span>" +
      '<span class="vb-word-item-meta">' +
      (it.tier ? "T" + it.tier : "") +
      (year ? " · " + esc(year) : "") +
      "</span>" +
      "</button>"
    );
  }

  VocabBrowser.prototype._mount = function () {
    var self = this;
    var showTabs = this.opts.cats && this.opts.cats.length > 1;
    var tabs = showTabs ? '<div class="vb-tabs" data-role="tabs"></div>' : "";
    var yearSel =
      this.opts.showYear !== false
        ? '<select class="vb-year-sel" data-role="year"><option value="">全部年份</option></select>'
        : "";
    this.root.className = "l15-vocab-browser" + (this.stepper ? " vb-stepper" : "");
    if (this.stepper) {
      this.root.innerHTML =
        '<div class="vb-meta" data-role="meta"></div>' +
        '<div class="vb-toolbar">' +
        '<input type="search" class="vb-search" placeholder="搜索英文 / 中文 / 例句…" data-role="search" />' +
        yearSel +
        "</div>" +
        tabs +
        '<div class="vb-stepper-layout">' +
        '<aside class="vb-word-list-wrap">' +
        '<div class="vb-word-list-head">单词列表 <span data-role="list-count"></span></div>' +
        '<div class="vb-word-list" data-role="wordlist"></div>' +
        "</aside>" +
        '<div class="vb-stepper-main">' +
        '<div class="vb-stepper-stage" data-role="stage"></div>' +
        '<nav class="vb-stepper-nav" aria-label="词汇切换">' +
        '<button type="button" data-role="prev">上一个</button>' +
        '<span class="vb-status" data-role="status">0 / 0</span>' +
        '<button type="button" data-role="next">下一个</button>' +
        "</nav>" +
        "</div>" +
        "</div>";
    } else {
      this.root.innerHTML =
        '<div class="vb-meta" data-role="meta"></div>' +
        '<div class="vb-toolbar">' +
        '<input type="search" class="vb-search" placeholder="搜索英文 / 中文 / 例句…" data-role="search" />' +
        yearSel +
        "</div>" +
        tabs +
        '<div class="vb-list" data-role="list"></div>' +
        '<nav class="vb-pager" aria-label="词汇分页">' +
        '<button type="button" data-role="prev">← 上一页</button>' +
        '<span class="vb-status" data-role="status">0 / 0</span>' +
        '<button type="button" data-role="next">下一页 →</button>' +
        "</nav>";
    }
    this.el = {
      meta: this.root.querySelector('[data-role="meta"]'),
      search: this.root.querySelector('[data-role="search"]'),
      year: this.root.querySelector('[data-role="year"]'),
      tabs: this.root.querySelector('[data-role="tabs"]'),
      list: this.root.querySelector('[data-role="list"]'),
      wordlist: this.root.querySelector('[data-role="wordlist"]'),
      listCount: this.root.querySelector('[data-role="list-count"]'),
      stage: this.root.querySelector('[data-role="stage"]'),
      status: this.root.querySelector('[data-role="status"]'),
      prev: this.root.querySelector('[data-role="prev"]'),
      next: this.root.querySelector('[data-role="next"]'),
    };
    if (this.el.year && global.L15Corpus) {
      var C = global.L15Corpus;
      for (var y = 2018; y <= 2026; y++) {
        var o = document.createElement("option");
        o.value = String(y);
        o.textContent = y + " 年";
        this.el.year.appendChild(o);
      }
      var catsIncludePredict =
        !this.cats || this.cats.indexOf("predict") >= 0;
      if (catsIncludePredict) {
        var op = document.createElement("option");
        op.value = "predict";
        op.textContent = "预测补充";
        this.el.year.appendChild(op);
      }
    }
    if (this.el.tabs && global.L15Corpus) {
      this.opts.cats.forEach(function (c) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "vb-tab" + (c === self.activeCat ? " active" : "");
        b.dataset.cat = c;
        b.textContent = catLabel(c);
        self.el.tabs.appendChild(b);
      });
    }
  };

  VocabBrowser.prototype._bind = function () {
    var self = this;
    if (this.el.search) {
      this.el.search.addEventListener("input", function () {
        self.q = self.el.search.value.trim();
        self.page = 0;
        self.index = 0;
        self.refresh();
      });
    }
    if (this.el.year) {
      this.el.year.addEventListener("change", function () {
        self.year = self.el.year.value;
        self.page = 0;
        self.index = 0;
        self.refresh();
      });
    }
    if (this.el.tabs) {
      this.el.tabs.addEventListener("click", function (e) {
        var t = e.target.closest(".vb-tab");
        if (!t) return;
        self.activeCat = t.dataset.cat;
        self.el.tabs.querySelectorAll(".vb-tab").forEach(function (b) {
          b.classList.toggle("active", b === t);
        });
        self.page = 0;
        self.index = 0;
        self.refresh();
      });
    }
    if (this.stepper && this.el.wordlist) {
      this.el.wordlist.addEventListener("click", function (e) {
        var btn = e.target.closest(".vb-word-item");
        if (!btn) return;
        var idx = parseInt(btn.getAttribute("data-idx"), 10);
        if (!isNaN(idx)) {
          self.index = idx;
          self.refresh();
        }
      });
    }
    this.el.prev.addEventListener("click", function () {
      if (self.stepper) {
        if (self.index > 0) {
          self.index--;
          self.refresh();
        }
      } else if (self.page > 0) {
        self.page--;
        self.refresh();
      }
    });
    this.el.next.addEventListener("click", function () {
      if (self.stepper) {
        if (self.index < self.filtered.length - 1) {
          self.index++;
          self.refresh();
        }
      } else if (self.page < self.totalPages - 1) {
        self.page++;
        self.refresh();
      }
    });
  };

  VocabBrowser.prototype._source = function () {
    var C = global.L15Corpus;
    if (!C) return [];
    var list;
    if (this.cats && this.cats.length === 1) {
      list = C.byCat(this.cats[0]);
    } else if (this.activeCat && this.activeCat !== "all") {
      list = C.byCat(this.activeCat);
    } else if (this.cats) {
      list = [];
      this.cats.forEach(function (c) {
        list = list.concat(C.byCat(c));
      });
    } else {
      list = C.MASTER.slice();
    }
    if (this.examOnly) {
      list = list.filter(function (x) {
        return x.cat !== "predict";
      });
    }
    if (this.tiers) {
      var tiers = this.tiers;
      list = list.filter(function (x) {
        return tiers.indexOf(x.tier) >= 0;
      });
    }
    var self = this;
    if (this.year) {
      if (this.year === "predict") {
        if (this.cats && this.cats.indexOf("predict") >= 0) {
          list = C.byCat("predict");
        } else {
          list = list.filter(function (x) {
            return (
              x.cat === "predict" || String(x.year).indexOf("预测") >= 0
            );
          });
        }
      } else {
        list = list.filter(function (x) {
          return String(x.year).indexOf(self.year) >= 0;
        });
      }
    }
    if (this.q) {
      var q = norm(this.q);
      list = list.filter(function (x) {
        return (
          norm(x.en).indexOf(q) >= 0 ||
          norm(x.zh).indexOf(q) >= 0 ||
          norm(x.exEn).indexOf(q) >= 0 ||
          norm(x.exEn2).indexOf(q) >= 0 ||
          norm(x.exZh2).indexOf(q) >= 0 ||
          norm(x.examEn).indexOf(q) >= 0 ||
          norm(x.exZh).indexOf(q) >= 0 ||
          norm(x.ctx).indexOf(q) >= 0 ||
          norm(x.note).indexOf(q) >= 0 ||
          norm(x.tag).indexOf(q) >= 0
        );
      });
    }
    return list;
  };

  VocabBrowser.prototype.refresh = function () {
    if (this.stepper) {
      this._refreshStepper();
      return;
    }
    var items = this._source();
    this.filtered = items;
    this.totalPages = Math.max(1, Math.ceil(items.length / this.perPage));
    if (this.page >= this.totalPages) this.page = this.totalPages - 1;
    var start = this.page * this.perPage;
    var slice = items.slice(start, start + this.perPage);
    this.el.list.className = "vb-list";
    this.el.list.innerHTML = slice.map(itemHtml).join("");
    var total = global.L15Corpus ? global.L15Corpus.TOTAL : items.length;
    this.el.meta.innerHTML =
      '本页 <strong>' +
      slice.length +
      "</strong> 条 · 筛选 <strong>" +
      items.length +
      "</strong> · 全库 <strong>" +
      total +
      "</strong> 条 · 含例句语境";
    this.el.status.textContent =
      items.length === 0
        ? "0 / 0"
        : "第 " + (this.page + 1) + " / " + this.totalPages + " 页";
    this.el.prev.disabled = this.page <= 0;
    this.el.next.disabled = this.page >= this.totalPages - 1;
    this._wireTts();
    if (slice.length && this.el.list.scrollTop !== undefined) {
      this.el.list.scrollTop = 0;
    }
  };

  VocabBrowser.prototype._refreshStepper = function () {
    var items = this._source();
    this.filtered = items;
    if (this.index >= items.length) {
      this.index = Math.max(0, items.length - 1);
    }
    if (this.el.listCount) {
      this.el.listCount.textContent = items.length ? "（" + items.length + "）" : "";
    }
    if (this.el.wordlist) {
      this.el.wordlist.innerHTML = items.length
        ? items
            .map(function (it, i) {
              return wordListItemHtml(it, i, i === this.index);
            }, this)
            .join("")
        : '<p class="vb-word-list-empty">暂无匹配词汇</p>';
      var activeBtn = this.el.wordlist.querySelector(".vb-word-item.is-active");
      if (activeBtn && activeBtn.scrollIntoView) {
        activeBtn.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
    if (this.el.stage) {
      this.el.stage.innerHTML = items.length
        ? itemHtml(items[this.index])
        : '<p class="vb-stepper-empty zh-hint">请调整筛选条件，或从左侧列表选择单词。</p>';
    }
    var total = global.L15Corpus ? global.L15Corpus.TOTAL : items.length;
    this.el.meta.innerHTML =
      '当前 <strong>' +
      (items.length ? this.index + 1 : 0) +
      "</strong> / <strong>" +
      items.length +
      "</strong> · 筛选 <strong>" +
      items.length +
      "</strong> · 全库 <strong>" +
      total +
      "</strong> 条";
    this.el.status.textContent =
      items.length === 0 ? "0 / 0" : this.index + 1 + " / " + items.length;
    this.el.prev.disabled = this.index <= 0 || items.length === 0;
    this.el.next.disabled = this.index >= items.length - 1 || items.length === 0;
    this._wireTts(this.el.stage);
  };

  VocabBrowser.prototype._wireTts = function (root) {
    var scope = root || this.el.list;
    if (!scope) return;
    scope.querySelectorAll(".tts-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-tts") || "";
        if (global.playLessonAzureTtsPlain) global.playLessonAzureTtsPlain(t);
      });
    });
  };

  function renderWordBanks(container) {
    var C = global.L15Corpus;
    if (!C || !C.WORD_BANKS) return;
    var html =
      '<div class="stats-strip">' +
      Object.keys(C.WORD_BANKS)
        .sort()
        .map(function (y) {
          return (
            '<div class="stat-pill"><strong>' +
            y +
            '</strong><span>B 卷 ' +
            C.WORD_BANKS[y].length +
            " 词</span></div>"
          );
        })
        .join("") +
      "</div>";
    html += '<div class="bank-year-grid">';
    Object.keys(C.WORD_BANKS)
      .sort()
      .forEach(function (y) {
        html +=
          '<div class="bank-year-card"><h4>' +
          y +
          " 年 B 卷原词</h4><p>" +
          C.WORD_BANKS[y].join(" · ") +
          "</p></div>";
      });
    html += "</div>";
    html +=
      '<p class="zh-hint" style="margin-top:1rem">词性转化参考答案 · 每条含例句</p><div class="vb-list">';
    C.byCat("word-form").forEach(function (x) {
      html += itemHtml(x);
    });
    html += "</div>";
    container.innerHTML = html;
    container.querySelectorAll(".tts-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-tts") || "";
        if (global.playLessonAzureTtsPlain) global.playLessonAzureTtsPlain(t);
      });
    });
  }

  function initAll() {
    document
      .querySelectorAll("[data-l15-vocab-browser]:not([data-vb-inited])")
      .forEach(function (el) {
        el.setAttribute("data-vb-inited", "1");
        var cats = (el.dataset.cats || "").split(",").filter(Boolean);
        new VocabBrowser(el, {
          cats: cats.length ? cats : null,
          perPage: +(el.dataset.perPage || 12),
          stepper: el.dataset.stepper === "1",
          examOnly: el.dataset.examOnly === "1",
          showYear: el.dataset.showYear !== "0",
          defaultCat: el.dataset.defaultCat || cats[0],
        });
      });
    document
      .querySelectorAll("[data-l15-word-banks]:not([data-vb-inited])")
      .forEach(function (el) {
        el.setAttribute("data-vb-inited", "1");
        renderWordBanks(el);
      });
  }

  global.L15VocabBrowser = VocabBrowser;
  global.L15VocabBrowserInit = initAll;
  global.L15VocabCardHtml = itemHtml;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})(typeof window !== "undefined" ? window : globalThis);
