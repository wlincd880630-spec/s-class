/**
 * 定语从句 · 课内翻页 + 测验挂载
 */
(function (global) {
  "use strict";

  function escHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initPager(pageCount, onPage) {
    var idx = 0;
    var pages = document.querySelectorAll("#l13rc-book .lesson-page");
    var mid = document.getElementById("pager-mid");
    var prev = document.getElementById("pager-prev");
    var next = document.getElementById("pager-next");

    function show(i) {
      idx = Math.max(0, Math.min(pageCount - 1, i));
      pages.forEach(function (p, n) {
        p.classList.toggle("active", n === idx);
      });
      if (mid) mid.textContent = idx + 1 + " / " + pageCount;
      if (prev) prev.disabled = idx <= 0;
      if (next) next.disabled = idx >= pageCount - 1;
      if (typeof onPage === "function") onPage(idx);
    }

    if (prev) prev.addEventListener("click", function () { show(idx - 1); });
    if (next) next.addEventListener("click", function () { show(idx + 1); });
    show(0);
    return { show: show, getIndex: function () { return idx; } };
  }

  function renderExamples(containerId, items, esc) {
    var el = document.getElementById(containerId);
    if (!el || !items) return;
    el.innerHTML = items
      .map(function (x) {
        var tier = x.tier ? '<span class="tier-label">分层 ' + esc(x.tier) + "</span> " : "";
        return (
          '<article class="example-card">' +
          tier +
          '<p class="zh-hint">' +
          esc(x.zh) +
          '</p><p class="en-line" lang="en">' +
          esc(x.en) +
          "</p></article>"
        );
      })
      .join("");
  }

  function renderTable(tableId, rows, esc) {
    if (global.L13RCUI && L13RCUI.initCorpusTable) {
      L13RCUI.initCorpusTable(tableId, rows, esc);
      return;
    }
    var table = document.getElementById(tableId);
    if (!table) return;
    table.innerHTML = "<thead><tr><th>说明</th><th>关系词</th><th>例句</th></tr></thead>";
    var tbody = document.createElement("tbody");
    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        esc(r[0]) +
        "</td><td><strong>" +
        esc(r[1]) +
        '</strong></td><td lang="en">' +
        esc(r[2]) +
        "</td>";
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
  }

  function mountQuiz(opts) {
    if (!global.L13RCQuiz) return null;
    var engine = L13RCQuiz.create({
      key: opts.key,
      items: opts.items || [],
      escHtml: escHtml,
      useTimer: !!opts.useTimer,
      quizTimeSec: opts.quizTimeSec || 0,
      onStateChange: opts.onStateChange || function () {}
    });
    engine.init();
    if (opts.onEnter !== false) engine.onEnter();
    return engine;
  }

  global.L13RCLesson = {
    escHtml: escHtml,
    initPager: initPager,
    renderExamples: renderExamples,
    renderTable: renderTable,
    mountQuiz: mountQuiz
  };
})(typeof window !== "undefined" ? window : global);
