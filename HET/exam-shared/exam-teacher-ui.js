/**
 * 教师版答案布局
 * - 听力：不提供书面答案
 * - 选择题：题下「答案解析」折叠
 * - 语篇/对话/12选10/表格：原文或表内红色答案，文末/表下统一「答案解析」
 */
(function () {
  "use strict";

  function isListening(el) {
    return !!(el && el.closest("#part-listen"));
  }

  function wordFromBank(letter, bankRoot) {
    if (!bankRoot || !letter) return letter;
    const L = String(letter).trim().toUpperCase();
    if (!/^[A-L]$/.test(L)) return letter;
    const items = bankRoot.querySelectorAll(".word-bank li, .word-bank-abcd li");
    for (const li of items) {
      const m = li.textContent.trim().match(/^([A-L])[.)]\s*(.+)$/i);
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

  function repairPassageParagraphs(block) {
    if (!block) return;

    block.querySelectorAll("p.cloze-continue").forEach((cont) => {
      let prev = cont.previousElementSibling;
      while (prev && prev.matches(".teacher-after-q, .exam-parse-group-wrap")) {
        prev = prev.previousElementSibling;
      }
      if (prev && prev.tagName === "P") {
        while (cont.firstChild) prev.appendChild(cont.firstChild);
        cont.remove();
      }
    });

    [...block.childNodes].forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      if (!node.textContent.replace(/\s+/g, " ").trim()) {
        node.remove();
        return;
      }
      let prev = node.previousSibling;
      while (prev && prev.nodeType === Node.TEXT_NODE && !prev.textContent.trim()) {
        prev = prev.previousSibling;
      }
      if (prev && prev.nodeType === Node.ELEMENT_NODE && prev.tagName === "P") {
        prev.appendChild(node);
      }
    });
  }

  function showInlineAnswer(blankEl, text) {
    if (!blankEl || !text) return;
    const fill = blankEl.querySelector(".teacher-fill");
    if (fill) {
      fill.textContent = text;
      fill.classList.add("screen-only");
    } else if (!blankEl.querySelector(".exam-inline-ans")) {
      const span = document.createElement("span");
      span.className = "exam-inline-ans screen-only";
      span.textContent = text;
      blankEl.appendChild(span);
    }
    blankEl.querySelectorAll(".teacher-inline-ans").forEach((el) => el.remove());
  }

  function makeToggleButton(className, label) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className + " no-print";
    btn.textContent = label;
    return btn;
  }

  function buildGroupPanel(keys, label) {
    if (!keys.length) return null;
    const btn = makeToggleButton("exam-parse-group-btn", label || "答案解析");
    const panel = document.createElement("div");
    panel.className = "exam-parse-panel no-print";
    keys.forEach((k) => panel.appendChild(k));

    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      btn.textContent = open ? "收起解析" : label || "答案解析";
    });

    const wrap = document.createElement("div");
    wrap.className = "exam-parse-group-wrap no-print";
    wrap.appendChild(btn);
    wrap.appendChild(panel);
    return wrap;
  }

  function detachKeys(wraps) {
    const keys = [];
    wraps.forEach((wrap) => {
      const key = wrap.querySelector(".teacher-key");
      if (key) keys.push(key);
      wrap.remove();
    });
    return keys;
  }

  function setupSingleQuestion(unit) {
    if (!unit || unit.dataset.examParseDone || isListening(unit)) return;
    const key = unit.querySelector(":scope > .teacher-key") || unit.querySelector(".teacher-key");
    if (!key || key.closest(".exam-parse-panel, .exam-parse-single")) return;
    if (unit.closest(".cloze-abc-grid")) return;

    unit.dataset.examParseDone = "1";
    const btn = makeToggleButton("exam-parse-btn", "答案解析");
    const panel = document.createElement("div");
    panel.className = "exam-parse-single no-print";
    if (key.parentElement) key.parentElement.removeChild(key);
    panel.appendChild(key);

    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      btn.textContent = open ? "收起解析" : "答案解析";
    });

    unit.appendChild(btn);
    unit.appendChild(panel);
  }

  function stripListeningSection() {
    const part = document.getElementById("part-listen");
    if (!part || part.dataset.listenStripped) return;
    part.dataset.listenStripped = "1";

    part.querySelectorAll(".opt-correct").forEach((el) => el.classList.remove("opt-correct"));
    part.querySelectorAll('input[type="radio"]').forEach((inp) => {
      inp.checked = false;
      inp.disabled = true;
    });
    part.querySelectorAll(".teacher-key, .teacher-after-q").forEach((el) => el.remove());
    part.querySelectorAll(".teacher-fill, .teacher-inline-ans, .ans-letter-inline").forEach((el) => el.remove());
    part.querySelectorAll("tr.chart-teacher-row").forEach((el) => el.remove());
    part.querySelectorAll(".exam-parse-btn, .exam-parse-single, .exam-parse-group-wrap").forEach((el) => el.remove());

    const note = document.createElement("p");
    note.className = "listen-no-answer-note no-print";
    note.textContent = "听力部分不提供书面答案，请结合上方音频课堂讲解。";
    const panel = part.querySelector(".listen-panel");
    if (panel && panel.nextSibling) {
      part.insertBefore(note, panel.nextSibling);
    } else {
      part.insertBefore(note, part.firstElementChild?.nextSibling || null);
    }

    part.querySelectorAll(".listen-abc-grid").forEach((grid) => {
      [...grid.querySelectorAll(".q-unit-row")].forEach((unit) => {
        const row = unit.querySelector(".q-row-opts-grid");
        if (!row) return;
        grid.insertBefore(row, unit);
        unit.remove();
      });
    });
  }

  function processPassageBlock(block) {
    if (!block || block.dataset.examPassageDone || isListening(block)) return;
    block.dataset.examPassageDone = "1";

    const bankRoot = block.closest(".sec") || block;
    const wraps = [...block.querySelectorAll(".teacher-after-q")];

    wraps.forEach((wrap) => {
      const key = wrap.querySelector(".teacher-key");
      const id = wrap.id || "";
      const m = id.match(/tq(\d+)/);
      let blank = m ? block.querySelector("#blank-q" + m[1]) : null;
      if (!blank) {
        let prev = wrap.previousElementSibling;
        while (prev && !blank) {
          if (prev.matches(".inline-blank, .blank-wrap, .passage-blank-wrap")) blank = prev;
          else blank = prev.querySelector?.(".inline-blank, .blank-wrap, .passage-blank-wrap");
          prev = prev.previousElementSibling;
        }
      }
      const text = answerTextFromKey(key, bankRoot);
      if (blank && text) showInlineAnswer(blank, text);
    });

    block.querySelectorAll(".blank-wrap, .b-blank-wrap, .inline-blank").forEach((bw) => {
      const fill = bw.querySelector(".teacher-fill");
      if (fill && fill.textContent.trim()) showInlineAnswer(bw, fill.textContent.trim());
    });

    const keys = detachKeys(wraps);
    repairPassageParagraphs(block);
    const group = buildGroupPanel(keys, "答案解析");
    if (group) {
      const bank = block.querySelector(".word-bank");
      if (bank) bank.after(group);
      else block.appendChild(group);
    }
  }

  function processChartTable(table) {
    if (!table || table.dataset.examChartDone || isListening(table)) return;
    table.dataset.examChartDone = "1";

    table.querySelectorAll(".blank-wrap, .b-blank-wrap").forEach((bw) => {
      const fill = bw.querySelector(".teacher-fill");
      if (fill && fill.textContent.trim()) showInlineAnswer(bw, fill.textContent.trim());
    });

    const wraps = [...table.querySelectorAll("tr.chart-teacher-row .teacher-after-q")];
    const keys = detachKeys(wraps);
    table.querySelectorAll("tr.chart-teacher-row").forEach((tr) => tr.remove());

    const group = buildGroupPanel(keys, "答案解析");
    if (group) table.after(group);
  }

  function processClozeMcSection(sec) {
    if (!sec || sec.dataset.examClozeMcDone || isListening(sec)) return;
    const passage = sec.querySelector(".passage-cloze-mc");
    const grid = sec.querySelector(".cloze-abc-grid");
    if (!passage || !grid) return;
    sec.dataset.examClozeMcDone = "1";

    const keys = [];
    grid.querySelectorAll(".q-unit").forEach((unit) => {
      const qid = (unit.id || "").replace(/^q/, "");
      const key = unit.querySelector(":scope > .teacher-key");
      const correct = unit.querySelector(".opt-correct .opt-body");
      const ans = correct ? correct.textContent.trim() : answerTextFromKey(key, sec);

      passage.querySelectorAll(".passage-blank-wrap").forEach((pw) => {
        const num = pw.querySelector(".blank-num");
        if (num && num.textContent.replace(/\D/g, "") === qid) showInlineAnswer(pw, ans);
      });

      if (key) {
        keys.push(key);
        key.remove();
      }
    });

    const group = buildGroupPanel(keys, "答案解析");
    if (group) grid.after(group);
  }

  function taskWrapIdForName(name) {
    const m = String(name || "").match(/^([qb])(\w+)$/i);
    if (!m) return null;
    return m[1].toLowerCase() === "b" ? `tq-b${m[2]}` : `tq${m[2]}`;
  }

  function getTaskAnswerText(keyEl) {
    if (!keyEl) return "";
    const sample = keyEl.querySelector(".tk-sample");
    if (sample) {
      const sampleText = sample.textContent.replace(/^书面参考答案[：:]\s*/u, "").trim();
      if (sampleText) return sampleText;
    }
    const ans = keyEl.querySelector(".tk-ans");
    const ansText = ans ? ans.textContent.trim() : "";
    if (ansText && ansText !== "(open)") return ansText;
    return ansText === "(open)" ? "" : ansText;
  }

  function insertAfter(anchor, node) {
    if (!anchor || !anchor.parentNode) return;
    if (anchor.nextSibling) anchor.parentNode.insertBefore(node, anchor.nextSibling);
    else anchor.parentNode.appendChild(node);
  }

  function collectTaskWraps(shortAns) {
    const wraps = [...shortAns.querySelectorAll(":scope > .teacher-after-q")];
    let sib = shortAns.nextElementSibling;
    while (sib && sib.classList.contains("teacher-after-q")) {
      wraps.push(sib);
      sib = sib.nextElementSibling;
    }
    return wraps;
  }

  function setupTaskQuestion(textarea, keyEl, wrap) {
    if (!textarea || textarea.dataset.examTaskDone) return;
    textarea.dataset.examTaskDone = "1";

    let anchor = textarea;
    const lineBlock = textarea.nextElementSibling;
    if (lineBlock && lineBlock.classList.contains("line-block")) anchor = lineBlock;

    const block = document.createElement("div");
    block.className = "exam-task-block no-print";

    const ansText = getTaskAnswerText(keyEl);
    if (ansText) {
      const ansP = document.createElement("p");
      ansP.className = "exam-task-ans";
      const label = document.createElement("strong");
      label.textContent = "参考答案：";
      const val = document.createElement("span");
      val.className = "exam-inline-ans";
      val.textContent = ansText;
      ansP.appendChild(label);
      ansP.appendChild(val);
      block.appendChild(ansP);
    }

    if (keyEl) {
      const btn = makeToggleButton("exam-parse-btn", "答案解析");
      const panel = document.createElement("div");
      panel.className = "exam-parse-single no-print";
      panel.appendChild(keyEl);
      btn.addEventListener("click", () => {
        const open = panel.classList.toggle("is-open");
        btn.classList.toggle("is-open", open);
        btn.textContent = open ? "收起解析" : "答案解析";
      });
      block.appendChild(btn);
      block.appendChild(panel);
    }

    insertAfter(anchor, block);
    if (wrap) wrap.remove();
  }

  function processTaskReading(shortAns) {
    if (!shortAns || shortAns.dataset.examTaskDone) return;
    shortAns.dataset.examTaskDone = "1";

    const wrapMap = new Map();
    collectTaskWraps(shortAns).forEach((wrap) => {
      if (wrap.id) wrapMap.set(wrap.id, wrap);
    });

    shortAns.querySelectorAll("textarea[name]").forEach((ta) => {
      const wid = taskWrapIdForName(ta.getAttribute("name"));
      const wrap = wid ? wrapMap.get(wid) : null;
      const key = wrap ? wrap.querySelector(".teacher-key") : null;
      if (key && key.parentElement) key.parentElement.removeChild(key);
      setupTaskQuestion(ta, key, wrap);
      if (wid) wrapMap.delete(wid);
    });

    const leftover = [];
    wrapMap.forEach((wrap) => {
      const key = wrap.querySelector(".teacher-key");
      if (key) leftover.push(key);
      wrap.remove();
    });
    const group = buildGroupPanel(leftover, "答案解析");
    if (group) shortAns.appendChild(group);
  }

  function processShortAnswer(sec) {
    if (!sec || sec.dataset.examShortDone || isListening(sec)) return;
    sec.dataset.examShortDone = "1";

    const shortAns = sec.querySelector(".short-ans");
    if (shortAns) processTaskReading(shortAns);

    const chartRoot = sec.querySelector(".read-bed-chart, .read-table-ans");
    if (chartRoot) {
      chartRoot.querySelectorAll(".blank-wrap, .b-blank-wrap").forEach((bw) => {
        const fill = bw.querySelector(".teacher-fill");
        if (fill && fill.textContent.trim()) showInlineAnswer(bw, fill.textContent.trim());
      });
      const wraps = [...chartRoot.querySelectorAll(".teacher-after-q")].filter(
        (w) => !shortAns || !shortAns.contains(w)
      );
      const keys = detachKeys(wraps);
      const group = buildGroupPanel(keys, "答案解析");
      if (group) chartRoot.appendChild(group);
    }
  }

  function initExamTeacherUi() {
    if (!document.body.classList.contains("teacher-edition")) return;

    stripListeningSection();

    document.querySelectorAll("table.chart").forEach(processChartTable);
    document.querySelectorAll(".passage-select, .dialogue-box, .fill-word-pick").forEach(processPassageBlock);

    document.querySelectorAll(".sec").forEach((sec) => {
      if (isListening(sec)) return;
      if (sec.querySelector(".passage-cloze-mc") && sec.querySelector(".cloze-abc-grid")) {
        processClozeMcSection(sec);
      }
      processShortAnswer(sec);
    });

    document.querySelectorAll(".read-a-questions .q-unit, .read-block .q-unit").forEach(setupSingleQuestion);
  }

  window.initExamTeacherUi = initExamTeacherUi;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initExamTeacherUi);
  } else {
    initExamTeacherUi();
  }
})();
