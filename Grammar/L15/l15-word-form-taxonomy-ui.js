/**
 * L15 · 九年真题词形变化 · 归类展示
 * 依赖：l15-word-form-taxonomy.js
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function T() {
    return global.L15WordFormTaxonomy;
  }

  function statsStrip(tax) {
    var m = tax.meta;
    return (
      '<div class="wf-tax-stats">' +
      '<span class="wf-tax-stat"><strong>' +
      m.years.length +
      "</strong> 年真题</span>" +
      '<span class="wf-tax-stat"><strong>' +
      m.blankCount +
      "</strong> 空</span>" +
      '<span class="wf-tax-stat"><strong>' +
      m.unchangedBlanks +
      "</strong> 原形直填</span>" +
      '<span class="wf-tax-stat"><strong>' +
      m.transformedBlanks +
      "</strong> 需变形</span>" +
      '<span class="wf-tax-stat"><strong>' +
      m.transformTypeCount +
      "</strong> 变形类型</span>" +
      "</div>"
    );
  }

  function renderWordBanksEnhanced(container) {
    var tax = T();
    var C = global.L15Corpus;
    if (!tax || !C || !C.WORD_BANKS) {
      return false;
    }
    var html = statsStrip(tax);
    html += '<div class="bank-year-grid">';
    Object.keys(tax.byYear)
      .sort()
      .forEach(function (y) {
        var yd = tax.byYear[y];
        var answers = yd.blanks
          .map(function (b) {
            return b.form;
          })
          .join(" · ");
        var unused =
          yd.unused && yd.unused.length
            ? '<p class="wf-tax-unused">干扰项：' + esc(yd.unused.join(" · ")) + "</p>"
            : "";
        html +=
          '<div class="bank-year-card wf-tax-year-card">' +
          "<h4>" +
          esc(y) +
          " 年 · 10 空答案</h4>" +
          '<p class="wf-tax-answers" lang="en">' +
          esc(answers) +
          "</p>" +
          '<p class="wf-tax-bank"><span class="wf-tax-bank-label">词库</span> ' +
          esc(yd.bank.join(" · ")) +
          "</p>" +
          unused +
          "</div>";
      });
    html += "</div>";
    html +=
      '<p class="zh-hint wf-tax-hint">→ 第 <strong>2</strong> 屏按变形类型归类；第 <strong>3</strong> 屏按年份互动填空（词库 + 原文 + 苏格拉底式引导）。</p>';
    container.innerHTML = html;
    return true;
  }

  function renderByCategory(container) {
    var tax = T();
    if (!tax) {
      container.innerHTML = "<p class=\"zh-hint\">词形归类数据未加载。</p>";
      return;
    }
    var groups = tax.CAT_GROUP || {};
    var labels = tax.CAT_GROUP_LABEL || {};
    var activeGroup = container.dataset.wfGroup || "noun";

    var tabs = Object.keys(groups)
      .map(function (g) {
        return (
          '<button type="button" class="wf-tax-tab' +
          (g === activeGroup ? " is-active" : "") +
          '" data-wf-group="' +
          esc(g) +
          '">' +
          esc(labels[g] || g) +
          "</button>"
        );
      })
      .join("");

    var catIds = groups[activeGroup] || [];
    var rows = [];
    catIds.forEach(function (catId) {
      var block = tax.byCategory[catId];
      if (!block) return;
      block.items.forEach(function (it) {
        rows.push({
          group: labels[activeGroup] || activeGroup,
          type: block.label,
          base: it.base,
          form: it.form,
          year: it.year,
          rule: it.rule || "",
        });
      });
    });

    var table =
      '<table class="wf-tax-table rule-table"><thead><tr>' +
      "<th>大类</th><th>变形类型</th><th>原形</th><th>答案</th><th>年份</th><th>规则提示</th>" +
      "</tr></thead><tbody>";
    rows.forEach(function (r) {
      table +=
        "<tr><td>" +
        esc(r.group) +
        "</td><td>" +
        esc(r.type) +
        '</td><td lang="en"><strong>' +
        esc(r.base) +
        '</strong></td><td lang="en" class="wf-tax-form">' +
        esc(r.form) +
        "</td><td>" +
        esc(r.year) +
        "</td><td class=\"wf-tax-rule\">" +
        esc(r.rule) +
        "</td></tr>";
    });
    table += "</tbody></table>";

    container.innerHTML =
      statsStrip(tax) +
      '<p class="zh-hint">按<strong>名词 / 动词 / 代词 / 形容词 / 副词</strong>等维度汇总 2018–2026 全部 90 空考查词汇。</p>' +
      '<div class="wf-tax-tabs" role="tablist">' +
      tabs +
      "</div>" +
      '<p class="wf-tax-meta">当前 <strong>' +
      rows.length +
      "</strong> 条 · " +
      esc(labels[activeGroup] || activeGroup) +
      "</p>" +
      table;

    container.querySelectorAll(".wf-tax-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        container.dataset.wfGroup = btn.getAttribute("data-wf-group") || "noun";
        renderByCategory(container);
      });
    });
  }

  function renderInlineReveal(body) {
    return (
      '<button type="button" class="wf-drill-q-reveal wf-drill-q-reveal--inline">' +
      '<span class="wf-drill-q-reveal-hint" data-open="点击显示" data-closed="">点击显示</span>' +
      '<span class="wf-drill-q-reveal-body" hidden>' +
      esc(body) +
      "</span></button>"
    );
  }

  function renderPromptTextWithInline(text) {
    if (!text || text.indexOf("[[") === -1) return esc(text);
    var parts = text.split(/\[\[([^\]]+)\]\]/);
    var html = "";
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 0) html += esc(parts[i]);
      else html += renderInlineReveal(parts[i]);
    }
    return html;
  }

  function renderPromptContent(p) {
    if (p == null) return "";
    if (typeof p === "string") return renderPromptTextWithInline(p);
    var html = renderPromptTextWithInline(p.text || "");
    if (p.reveals && p.reveals.length) {
      html += '<div class="wf-drill-q-reveals">';
      p.reveals.forEach(function (r) {
        html +=
          '<button type="button" class="wf-drill-q-reveal">' +
          '<span class="wf-drill-q-reveal-hint" data-open="' +
          esc(r.label || "点击显示") +
          '" data-closed="点击隐藏">' +
          esc(r.label || "点击显示") +
          "</span>" +
          '<span class="wf-drill-q-reveal-body" hidden>' +
          esc(r.body) +
          "</span></button>";
      });
      html += "</div>";
    }
    return html;
  }

  function togglePromptReveal(btn) {
    var body = btn.querySelector(".wf-drill-q-reveal-body");
    var hint = btn.querySelector(".wf-drill-q-reveal-hint");
    if (!body) return;
    var open = body.hidden;
    body.hidden = !open;
    var inline = btn.classList.contains("wf-drill-q-reveal--inline");
    if (hint) {
      if (inline) {
        hint.style.display = open ? "none" : "";
      } else {
        hint.textContent = open
          ? hint.getAttribute("data-closed") || "点击隐藏"
          : hint.getAttribute("data-open") || "点击显示";
      }
    }
  }

  function getDrillRoot(el) {
    return el && el.closest ? el.closest("[data-l15-wf-taxonomy-year]") : null;
  }

  function drillStep(btn, delta) {
    if (!btn || btn.disabled) return false;
    var root = getDrillRoot(btn);
    if (!root) return false;
    var state = root._wfDrillState;
    if (!state || state.active == null) return false;
    var tax = T();
    if (!tax) return false;
    var activeYear = state.year || root.dataset.wfYear;
    var yd = tax.byYear[activeYear];
    if (!yd) return false;
    var b = blankByN(yd.blanks, state.active);
    if (!b || !b.prompts || !b.prompts.length) return false;
    var qIdx = Number(state.qIdx) || 0;
    var next = qIdx + delta;
    if (next < 0 || next >= b.prompts.length) return false;
    state.qIdx = next;
    syncGuidePanel(root);
    return false;
  }

  function revealDrillAnswer(btn) {
    var root = getDrillRoot(btn);
    if (!root || !root._wfDrillState || root._wfDrillState.active == null) return false;
    root._wfDrillState.revealed[root._wfDrillState.active] = true;
    renderByYear(root);
    return false;
  }

  function ensureGlobalDrillHandlers() {
    if (global._l15WfDrillGlobalBound) return;
    global._l15WfDrillGlobalBound = true;
    document.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        var nextBtn = t.closest("[data-wf-q-next]");
        if (nextBtn && !nextBtn.disabled) {
          e.preventDefault();
          e.stopImmediatePropagation();
          drillStep(nextBtn, 1);
          return;
        }
        var prevBtn = t.closest("[data-wf-q-prev]");
        if (prevBtn && !prevBtn.disabled) {
          e.preventDefault();
          e.stopImmediatePropagation();
          drillStep(prevBtn, -1);
          return;
        }
        var showBtn = t.closest("[data-wf-show-ans]");
        if (showBtn) {
          revealDrillAnswer(showBtn);
          return;
        }
        var revBtn = t.closest(".wf-drill-q-reveal");
        if (revBtn) {
          e.preventDefault();
          e.stopPropagation();
          togglePromptReveal(revBtn);
        }
      },
      true
    );
  }

  function blankByN(blanks, n) {
    for (var i = 0; i < blanks.length; i++) {
      if (blanks[i].n == n) return blanks[i];
    }
    return null;
  }

  function syncGuidePanel(container) {
    var tax = T();
    if (!tax) return;
    var state = container._wfDrillState;
    if (!state) return;
    var activeYear = state.year || container.dataset.wfYear;
    var yd = tax.byYear[activeYear];
    if (!yd) return;
    var guide = container.querySelector(".wf-drill-guide");
    if (guide) {
      guide.innerHTML = renderGuidePanel(yd, state, tax);
    }
  }

  function bindYearDrill(container) {
    if (container._wfYearDrillBound) return;
    container._wfYearDrillBound = true;

    container.addEventListener("click", function (e) {
      var tax = T();
      if (!tax) return;
      var state = container._wfDrillState;
      if (!state) return;

      var yearBtn = e.target.closest(".wf-tax-tab[data-wf-year]");
      if (yearBtn && container.contains(yearBtn)) {
        var y = yearBtn.getAttribute("data-wf-year") || "";
        if (container.dataset.wfYear !== y) {
          container.dataset.wfYear = y;
          container._wfDrillState = null;
          renderByYear(container);
        }
        return;
      }

      var blankBtn = e.target.closest(".wf-drill-blank");
      if (blankBtn && container.contains(blankBtn)) {
        var n = parseInt(blankBtn.getAttribute("data-blank-n"), 10);
        if (state.lastActive !== n) {
          state.qIdx = 0;
          state.lastActive = n;
        }
        state.active = n;
        renderByYear(container);
        return;
      }

      var qPrev = e.target.closest("[data-wf-q-prev]");
      if (qPrev && container.contains(qPrev)) {
        return;
      }

      var qNext = e.target.closest("[data-wf-q-next]");
      if (qNext && container.contains(qNext)) {
        return;
      }

      var showBtn = e.target.closest("[data-wf-show-ans]");
      if (showBtn && container.contains(showBtn)) {
        return;
      }
    });
  }

  function renderByYear(container) {
    var tax = T();
    if (!tax) {
      container.innerHTML = "<p class=\"zh-hint\">词形归类数据未加载。</p>";
      return;
    }
    var years = Object.keys(tax.byYear).sort();
    var activeYear = container.dataset.wfYear || years[years.length - 1];
    if (years.indexOf(activeYear) < 0) activeYear = years[0];

    var yd = tax.byYear[activeYear];
    if (!container._wfDrillState || container._wfDrillState.year !== activeYear) {
      container._wfDrillState = {
        year: activeYear,
        active: null,
        revealed: {},
        qIdx: 0,
        lastActive: null,
      };
    }
    var state = container._wfDrillState;
    state.year = activeYear;

    var yearTabs = years
      .map(function (y) {
        return (
          '<button type="button" class="wf-tax-tab' +
          (y === activeYear ? " is-active" : "") +
          '" data-wf-year="' +
          esc(y) +
          '">' +
          esc(y) +
          "</button>"
        );
      })
      .join("");

    var bankChips = yd.bank
      .map(function (w) {
        return '<span class="wf-drill-chip" lang="en">' + esc(w) + "</span>";
      })
      .join("");

    var passageHtml = passageToHtml(yd.passage || "", yd.blanks, state, tax);
    var guideHtml = renderGuidePanel(yd, state, tax);

    container.innerHTML =
      '<div class="wf-tax-tabs" role="tablist">' +
      yearTabs +
      "</div>" +
      '<div class="wf-drill-bank"><span class="wf-drill-bank-label">Word Bank · 12 词</span>' +
      bankChips +
      "</div>" +
      '<div class="wf-drill-layout">' +
      '<div class="wf-drill-passage-wrap">' +
      '<h3 class="wf-drill-passage-title">' +
      esc(activeYear) +
      " 年 · B 卷短文填空</h3>" +
      '<div class="wf-drill-passage" lang="en">' +
      passageHtml +
      "</div>" +
      "</div>" +
      '<aside class="wf-drill-guide" aria-live="polite">' +
      guideHtml +
      "</aside>" +
      "</div>";

    bindYearDrill(container);
  }

  function blankBySlot(blanks, slot) {
    for (var i = 0; i < blanks.length; i++) {
      if ((blanks[i].slot || blanks[i].n) === slot) return blanks[i];
    }
    return null;
  }

  function passageToHtml(passage, blanks, state, tax) {
    if (!passage) return "<p class=\"zh-hint\">该年语篇待补充。</p>";
    var parts = passage.split(/(__\d+__)/g);
    return parts
      .map(function (part) {
        var m = part.match(/^__(\d+)__$/);
        if (!m) {
          return esc(part).replace(/\r\n|\n/g, "<br/>");
        }
        var slot = parseInt(m[1], 10);
        var b = blankBySlot(blanks, slot);
        if (!b) return esc(part);
        var revealed = !!state.revealed[b.n];
        var active = state.active === b.n;
        var cls =
          "wf-drill-blank" +
          (active ? " is-active" : "") +
          (revealed ? " is-revealed" : "");
        var label = revealed ? esc(b.form) : "(" + b.n + ")";
        return (
          '<button type="button" class="' +
          cls +
          '" data-blank-n="' +
          b.n +
          '" aria-label="第 ' +
          b.n +
          ' 空">' +
          label +
          "</button>"
        );
      })
      .join("");
  }

  function renderGuidePanel(yd, state, tax) {
    if (state.active == null) {
      return (
        '<div class="wf-drill-guide-empty">' +
        "<p><strong>点击文中空格</strong>开始。</p>" +
        "<p>每一空按<strong>语篇线索</strong>给出引导问，<strong>一次只显示一问</strong>，用「上一问 / 下一问」切换；问完再显示答案。</p>" +
        "</div>"
      );
    }
    var b = null;
    for (var i = 0; i < yd.blanks.length; i++) {
      if (yd.blanks[i].n == state.active) {
        b = yd.blanks[i];
        break;
      }
    }
    if (!b) return "";
    var prompts = b.prompts || [];
    var qIdx = Number(state.qIdx) || 0;
    if (qIdx >= prompts.length) qIdx = Math.max(0, prompts.length - 1);
    state.qIdx = qIdx;
    var currentP = prompts.length ? prompts[qIdx] : "";
    var revealed = !!state.revealed[b.n];
    return (
      '<div class="wf-drill-guide-panel">' +
      '<h4 class="wf-drill-guide-title">第 <span lang="en">' +
      b.n +
      "</span> 空 · 引导思考</h4>" +
      (prompts.length
        ? '<div class="wf-drill-q-stepper">' +
          '<p class="wf-drill-q-progress" aria-live="polite">引导问 <strong>' +
          (qIdx + 1) +
          "</strong> / " +
          prompts.length +
          "</p>" +
          '<div class="wf-drill-q-card">' +
          '<div class="wf-drill-q-card-inner">' +
          '<span class="wf-guide-q-n">' +
          (qIdx + 1) +
          ".</span> " +
          renderPromptContent(currentP) +
          "</div></div>" +
          '<nav class="wf-drill-q-nav" aria-label="引导问切换">' +
          '<button type="button" class="wf-drill-q-btn" data-wf-q-prev' +
          (qIdx <= 0 ? " disabled" : "") +
          ' onclick="return L15WordFormTaxonomyUI.drillStep(this,-1)">上一问</button>' +
          '<button type="button" class="wf-drill-q-btn" data-wf-q-next' +
          (qIdx >= prompts.length - 1 ? " disabled" : "") +
          ' onclick="return L15WordFormTaxonomyUI.drillStep(this,1)">下一问</button>' +
          "</nav>" +
          (qIdx >= prompts.length - 1 && !revealed
            ? '<p class="wf-drill-q-hint">问完可点下方「显示答案」核对。</p>'
            : "") +
          "</div>"
        : '<p class="zh-hint">暂无引导问。</p>') +
      (revealed
        ? '<p class="wf-drill-ans-banner" lang="en"><strong>答案：</strong>' +
          esc(b.form) +
          "</p>"
        : '<button type="button" class="wf-drill-show-btn" data-wf-show-ans onclick="L15WordFormTaxonomyUI.revealDrillAnswer(this);return false">显示答案</button>') +
      "</div>"
    );
  }

  function renderHighlights(container) {
    var tax = T();
    if (!tax) return;
    var highlights = [
      { t: "they 系", d: "their · them · themselves — 几乎年年考，分清物主/宾格/反身" },
      { t: "形容词 → 副词 -ly", d: "slow/Slowly · sudden/Suddenly · sad/sadly · bad/badly · total/totally …" },
      { t: "比较级不规则", d: "many→more · little→less · good→best · well→better · far→further" },
      { t: "名词化", d: "die→death · discover→discovery · direct→direction · important→importance" },
      { t: "反身代词", d: "itself · ourselves · themselves（2018/2019/2020/2025）" },
      { t: "不定式", d: "to understand · to hold · to touch · not to touch · to offer …" },
      { t: "2026 新增", d: "death · were · Suddenly · discovery · less · their · sadly · keep · to touch" },
    ];
    container.innerHTML =
      '<ul class="wf-tax-highlights">' +
      highlights
        .map(function (h) {
          return (
            "<li><strong>" +
            esc(h.t) +
            "</strong><span>" +
            esc(h.d) +
            "</span></li>"
          );
        })
        .join("") +
      "</ul>";
  }

  function initAll() {
    ensureGlobalDrillHandlers();
    document.querySelectorAll("[data-l15-wf-taxonomy-banks]:not([data-wf-inited])").forEach(function (el) {
      el.setAttribute("data-wf-inited", "1");
      renderWordBanksEnhanced(el);
    });
    document.querySelectorAll("[data-l15-wf-taxonomy-cat]:not([data-wf-inited])").forEach(function (el) {
      el.setAttribute("data-wf-inited", "1");
      renderByCategory(el);
    });
    document.querySelectorAll("[data-l15-wf-taxonomy-year]:not([data-wf-inited])").forEach(function (el) {
      el.setAttribute("data-wf-inited", "1");
      renderByYear(el);
    });
    document.querySelectorAll("[data-l15-wf-taxonomy-hl]:not([data-wf-inited])").forEach(function (el) {
      el.setAttribute("data-wf-inited", "1");
      renderHighlights(el);
    });
  }

  global.L15WordFormTaxonomyUI = {
    init: initAll,
    drillStep: drillStep,
    revealDrillAnswer: revealDrillAnswer,
    renderWordBanksEnhanced: renderWordBanksEnhanced,
    renderByCategory: renderByCategory,
    renderByYear: renderByYear,
  };

  ensureGlobalDrillHandlers();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})(typeof window !== "undefined" ? window : globalThis);
