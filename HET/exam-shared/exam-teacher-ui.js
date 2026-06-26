/**
 * 教师版答案布局：选择题逐题折叠；语篇/12选10/表格原文内联答案，文末统一「答案解析」
 */
(function () {
  "use strict";

  function wordFromBank(letter, bankRoot) {
    if (!bankRoot || !letter) return letter;
    const L = String(letter).trim().toUpperCase();
    if (!/^[A-L]$/.test(L)) return letter;
    const items = bankRoot.querySelectorAll(".word-bank li, .word-bank-abcd li");
    for (const li of items) {
      const t = li.textContent.trim();
      const m = t.match(/^([A-L])[.)]\s*(.+)$/i);
      if (m && m[1].toUpperCase() === L) return m[2].trim();
    }
    return letter;
  }

  function answerTextFromKey(keyEl, bankRoot) {
    if (!keyEl) return "";
    const ans = keyEl.querySelector(".tk-ans");
    let text = ans ? ans.textContent.trim() : "";
    if (/^[A-L]$/.test(text)) text = wordFromBank(text, bankRoot);
    return text;
  }

  function putInlineAns(blankEl, text) {
    if (!blankEl || !text) return;
    if (blankEl.querySelector(".exam-inline-ans")) return;
    const span = document.createElement("span");
    span.className = "exam-inline-ans screen-only";
    span.textContent = text;
    blankEl.appendChild(span);
  }

  function collectKeys(container) {
    const keys = [];
    container.querySelectorAll(".teacher-after-q .teacher-key, .teacher-key").forEach((k) => {
      if (k.closest(".exam-parse-panel, .exam-parse-single")) return;
      keys.push(k);
    });
    return keys;
  }

  function buildGroupPanel(keys, label) {
    if (!keys.length) return null;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "exam-parse-group-btn no-print";
    btn.textContent = label || "答案解析";

    const panel = document.createElement("div");
    panel.className = "exam-parse-panel no-print";
    keys.forEach((k) => {
      const clone = k.cloneNode(true);
      panel.appendChild(clone);
    });

    keys.forEach((k) => {
      const wrap = k.closest(".teacher-after-q");
      if (wrap) wrap.remove();
      else if (k.parentElement) k.remove();
    });

    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      btn.textContent = open ? "收起解析" : label || "答案解析";
    });

    const frag = document.createDocumentFragment();
    frag.appendChild(btn);
    frag.appendChild(panel);
    return frag;
  }

  function setupSingleQuestion(qUnit) {
    if (qUnit.dataset.examParseDone) return;
    const key = qUnit.querySelector(":scope > .teacher-key");
    if (!key) return;
    qUnit.dataset.examParseDone = "1";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "exam-parse-btn no-print";
    btn.textContent = "答案解析";

    const panel = document.createElement("div");
    panel.className = "exam-parse-single no-print";
    panel.appendChild(key);

    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      btn.textContent = open ? "收起解析" : "答案解析";
    });

    qUnit.appendChild(btn);
    qUnit.appendChild(panel);
  }

  function processPassageBlock(block) {
    if (block.dataset.examPassageDone) return;
    block.dataset.examPassageDone = "1";

    const sec = block.closest(".sec") || block.parentElement;
    const bankRoot = sec || block;

    const keys = [];
    block.querySelectorAll(".teacher-after-q").forEach((wrap) => {
      const key = wrap.querySelector(".teacher-key");
      if (key) keys.push(key);

      const id = wrap.id || "";
      const m = id.match(/tq(\d+)/);
      let blank = null;
      if (m) blank = block.querySelector("#blank-q" + m[1]);
      if (!blank) {
        let prev = wrap.previousElementSibling;
        while (prev && !blank) {
          blank = prev.querySelector(".inline-blank, .blank-wrap, .passage-blank-wrap");
          if (!blank && prev.matches(".inline-blank, .blank-wrap, .passage-blank-wrap")) blank = prev;
          prev = prev.previousElementSibling;
        }
      }
      const text = answerTextFromKey(key, bankRoot);
      if (blank) putInlineAns(blank, text);
    });

    block.querySelectorAll(".blank-wrap, .b-blank-wrap, .inline-blank").forEach((bw) => {
      const fill = bw.querySelector(".teacher-fill");
      if (fill && !bw.querySelector(".exam-inline-ans")) {
        putInlineAns(bw, fill.textContent.trim());
      }
    });

    const frag = buildGroupPanel(keys, "答案解析");
    if (frag) {
      const anchor = block.querySelector(".word-bank") || block.lastElementChild;
      if (anchor && anchor.parentNode === block) {
        block.insertBefore(frag, anchor.nextSibling);
      } else {
        block.appendChild(frag);
      }
    }
  }

  function processChartTable(table) {
    if (table.dataset.examChartDone) return;
    table.dataset.examChartDone = "1";

    const keys = [];
    table.querySelectorAll("tr.chart-teacher-row .teacher-key").forEach((k) => keys.push(k));

    table.querySelectorAll(".blank-wrap, .blank-wrap").forEach((bw) => {
      const fill = bw.querySelector(".teacher-fill");
      if (fill && !bw.querySelector(".exam-inline-ans")) {
        putInlineAns(bw, fill.textContent.trim());
      }
    });

    const frag = buildGroupPanel(keys, "答案解析");
    if (frag) table.parentNode.insertBefore(frag, table.nextSibling);
  }

  function processClozeMcSection(sec) {
    if (sec.dataset.examClozeMcDone) return;
    sec.dataset.examClozeMcDone = "1";

    const passage = sec.querySelector(".passage-cloze-mc");
    const grid = sec.querySelector(".cloze-abc-grid");
    if (!passage || !grid) return;

    grid.querySelectorAll(".q-unit").forEach((unit) => {
      const qid = unit.id && unit.id.replace("q", "");
      if (!qid) return;
      const key = unit.querySelector(".teacher-key");
      const correct = unit.querySelector(".opt-correct .opt-body");
      const ans = correct ? correct.textContent.trim() : answerTextFromKey(key, sec);
      const wrap = passage.querySelector('.passage-blank-wrap .blank-num');
      // match by blank number in passage
      passage.querySelectorAll(".passage-blank-wrap").forEach((pw) => {
        const num = pw.querySelector(".blank-num");
        if (num && num.textContent.replace(/\D/g, "") === qid) {
          putInlineAns(pw, ans);
        }
      });
    });

    const keys = [];
    grid.querySelectorAll(".q-unit > .teacher-key").forEach((k) => keys.push(k));
    const frag = buildGroupPanel(keys, "答案解析");
    if (frag) grid.parentNode.insertBefore(frag, grid.nextSibling);
  }

  function processReadBlock(block) {
    block.querySelectorAll(".q-unit, .q-item.print-q-page").forEach((el) => {
      const unit = el.classList.contains("q-unit") ? el : el.closest(".q-unit") || el;
      if (unit.querySelector(".teacher-key") || unit.querySelector(".exam-parse-btn")) {
        if (unit.classList.contains("q-unit")) setupSingleQuestion(unit);
      }
    });
  }

  function initExamTeacherUi() {
    if (!document.body.classList.contains("teacher-edition")) return;

    document.querySelectorAll("table.chart").forEach(processChartTable);

    document.querySelectorAll(".passage-select, .dialogue-box, .fill-word-pick").forEach(processPassageBlock);

    document.querySelectorAll(".sec").forEach((sec) => {
      if (sec.querySelector(".passage-cloze-mc") && sec.querySelector(".cloze-abc-grid")) {
        processClozeMcSection(sec);
      }
    });

    document.querySelectorAll(
      ".q-abc-grid.listen-abc-grid .q-unit, .q-abc-grid.listen-abc-grid .q-unit-row, .q-group.q-listen .q-unit, .q-unit-pic"
    ).forEach(setupSingleQuestion);

    document.querySelectorAll(".cloze-abc-grid .q-unit").forEach((unit) => {
      if (!unit.closest(".sec")?.dataset.examClozeMcDone) setupSingleQuestion(unit);
    });

    document.querySelectorAll(".read-block").forEach(processReadBlock);

    document.querySelectorAll(".read-a-questions > .q-item").forEach((item) => {
      const key = item.querySelector(".teacher-key");
      if (!key || item.dataset.examParseDone) return;
      item.dataset.examParseDone = "1";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "exam-parse-btn no-print";
      btn.textContent = "答案解析";
      const panel = document.createElement("div");
      panel.className = "exam-parse-single no-print";
      panel.appendChild(key);
      btn.addEventListener("click", () => {
        const open = panel.classList.toggle("is-open");
        btn.classList.toggle("is-open", open);
        btn.textContent = open ? "收起解析" : "答案解析";
      });
      item.appendChild(btn);
      item.appendChild(panel);
    });

    document.querySelectorAll(".short-ans .teacher-after-q").forEach((wrap) => {
      const sec = wrap.closest(".sec") || wrap.parentElement;
      if (sec && !sec.dataset.examShortDone) {
        sec.dataset.examShortDone = "1";
        const keys = [];
        sec.querySelectorAll(".short-ans .teacher-after-q .teacher-key").forEach((k) => keys.push(k));
        sec.querySelectorAll(".short-ans .blank-wrap, .short-ans .b-blank-wrap").forEach((bw) => {
          const fill = bw.querySelector(".teacher-fill");
          if (fill) putInlineAns(bw, fill.textContent.trim());
        });
        const anchor = sec.querySelector(".short-ans");
        const frag = buildGroupPanel(keys, "答案解析");
        if (frag && anchor) anchor.appendChild(frag);
      }
    });
  }

  window.initExamTeacherUi = initExamTeacherUi;

  function boot() {
    initExamTeacherUi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
