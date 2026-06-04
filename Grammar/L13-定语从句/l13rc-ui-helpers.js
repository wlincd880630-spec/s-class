/**
 * L13RC · 课件 UI 辅助（不展示教材/真题出处�? */
(function (global) {
  "use strict";

  function corpusRowHtml(row, escHtml) {
    const en = row.length >= 3 ? row[1] : row[0];
    const zh = row.length >= 3 ? row[2] : row[1];
    return "<td lang='en'>" + escHtml(en != null ? en : "") + "</td><td>" + escHtml(zh != null ? zh : "") + "</td>";
  }

  function initCorpusTable(tableId, rows, escHtml) {
    const table = document.getElementById(tableId);
    if (!table || !rows) return;
    table.innerHTML = "<thead><tr><th>英文</th><th>中文</th></tr></thead>";
    const tbody = document.createElement("tbody");
    rows.forEach(function (row) {
      const tr = document.createElement("tr");
      tr.innerHTML = corpusRowHtml(row, escHtml);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
  }

  /** 测验题干：听音题�?audio，普通题�?stem */
  function quizStemText(q) {
    if (!q) return "请选择正确答案�?;
    if (q.stem != null && String(q.stem).length) return String(q.stem);
    if (q.audio) return "听录音，选择与音频一致的句子�?;
    if (q.prompt != null && String(q.prompt).length) return String(q.prompt);
    if (q.zh != null && String(q.zh).length) return String(q.zh);
    return "请选择正确答案�?;
  }

  function quizStemExtraHtml(q) {
    if (q && q.audio) {
      return "<p class=\"zh-hint quiz-listen-hint\">先点「播放本题」，再选答案�?/p>";
    }
    return "";
  }

  /** 规范化选项，避�?undefined 或嵌套数组渲染成错项 */
  function quizOpts(q) {
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

  function readCardHtml(r, escHtml, enExtraClass, enHtml) {
    const cls = enExtraClass ? " en-line " + enExtraClass : " en-line";
    const enBody = enHtml != null ? enHtml : escHtml(r && r.en != null ? r.en : "");
    return (
      "<p class='zh-hint'>" + escHtml(r && r.zh != null ? r.zh : "") + "</p>" +
      "<p class='" + cls.trim() + "' lang='en'>" + enBody + "</p>"
    );
  }

  global.L13RCUI = {
    initCorpusTable: initCorpusTable,
    corpusRowHtml: corpusRowHtml,
    readCardHtml: readCardHtml,
    quizStemText: quizStemText,
    quizStemExtraHtml: quizStemExtraHtml,
    quizOpts: quizOpts
  };
})(typeof window !== "undefined" ? window : this);
