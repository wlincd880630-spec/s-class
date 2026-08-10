/* L05 Pronouns · 纸质测试页逻辑 */
(function () {
  "use strict";

  var DATA = window.L05PronounsTestData;
  if (!DATA) {
    document.body.innerHTML = "<p style='padding:2rem'>缺少 pronouns-test-data.js</p>";
    return;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderTable(showHints) {
    var T = DATA.table;
    var head =
      "<tr>" +
      T.headers
        .map(function (h) {
          return "<th>" + esc(h) + "</th>";
        })
        .join("") +
      "</tr>";
    var body = T.rows
      .map(function (row) {
        return (
          "<tr>" +
          row
            .map(function (cell, i) {
              if (i === 0) return "<td>" + esc(cell) + "</td>";
              var clean = String(cell).replace(/（[^）]*）/g, "").trim();
              if (showHints) {
                return '<td class="blank-cell">' + esc(clean) + "</td>";
              }
              return '<td class="blank-cell">&nbsp;</td>';
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
    return (
      '<div class="pt-table-wrap"><table class="pt-table' +
      (showHints ? " show-hints" : "") +
      '" id="ptTable"><thead>' +
      head +
      "</thead><tbody>" +
      body +
      "</tbody></table></div>"
    );
  }

  function renderQuestions() {
    return (
      '<ol class="pt-qlist">' +
      DATA.items
        .map(function (it, i) {
          var n = it.n || i + 1;
          var stem = esc(it.q).replace(/_+/g, '<span class="blank">______</span>');
          return (
            '<li class="pt-q"><span class="num">' +
            String(n).padStart(2, "0") +
            '</span><div><div class="stem" lang="en">' +
            stem +
            '</div><div class="meta"><span class="type-chip">' +
            esc(it.typeZh || it.type || "") +
            "</span>" +
            (it.zh ? esc(it.zh) : "") +
            "</div></div></li>"
          );
        })
        .join("") +
      "</ol>"
    );
  }

  function renderAnswers() {
    return (
      '<div class="pt-answers" id="ptAnswers">' +
      "<h2>参考答案（教师用 · 可单独打印本页）</h2>" +
      '<div class="pt-answers-grid">' +
      DATA.items
        .map(function (it, i) {
          var n = it.n || i + 1;
          return (
            "<div><span>" +
            n +
            ".</span> <b lang='en'>" +
            esc(it.answer) +
            "</b></div>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  function paint() {
    var showHints = !!(document.getElementById("chkHints") || {}).checked;
    var showKey = !!(document.getElementById("chkKey") || {}).checked;
    var sheet = document.getElementById("ptSheet");
    if (!sheet) return;
    sheet.classList.toggle("hints-on", showHints);

    sheet.innerHTML =
      '<header class="pt-banner">' +
      '<p class="brand">' +
      esc(DATA.brand || "Steven's Class") +
      " · Grammar L05</p>" +
      "<h1>" +
      esc(DATA.title) +
      "</h1>" +
      '<p class="sub">' +
      esc(DATA.subtitle) +
      " · 共 " +
      DATA.items.length +
      " 题填空</p>" +
      "</header>" +
      '<div class="pt-body">' +
      '<div class="pt-meta">' +
      '<div class="field"><span>姓名</span><div class="line"></div></div>' +
      '<div class="field"><span>班级</span><div class="line"></div></div>' +
      '<div class="field"><span>日期</span><div class="line"></div></div>' +
      "</div>" +
      '<div class="pt-note"><strong>答题说明</strong><ol>' +
      (DATA.instructions || [])
        .map(function (x) {
          return "<li>" + esc(x) + "</li>";
        })
        .join("") +
      "</ol></div>" +
      '<h2 class="pt-sec-title">一、代词对照表 <span class="badge">' +
      (showHints ? "提示已显示" : "空白练习") +
      "</span></h2>" +
      '<p class="pt-table-hint-tag">本卷表格已开启提示（答案可见），适合课堂对照练习。</p>' +
      renderTable(showHints) +
      '<h2 class="pt-sec-title">二、代词填空 <span class="badge">30 题</span></h2>' +
      renderQuestions() +
      '<div class="pt-footer">' +
      "<div>Steven's Class · 五种代词纸质测试</div>" +
      '<div class="pt-score">得分 <span class="box"></span> / 30</div>' +
      "</div>" +
      (showKey ? renderAnswers() : "") +
      "</div>";
  }

  function printPdf() {
    paint();
    setTimeout(function () {
      window.print();
    }, 80);
  }

  function downloadPdf() {
    var el = document.getElementById("ptSheet");
    if (!el) return;
    paint();
    if (typeof html2pdf === "undefined") {
      alert("PDF 组件加载中，请稍后再试；或使用「打印 / 另存 PDF」。");
      return;
    }
    var opt = {
      margin: [8, 8, 10, 8],
      filename: "L05-五种代词-纸质测试.pdf",
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };
    var btn = document.getElementById("btnDownload");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "生成中…";
    }
    html2pdf()
      .set(opt)
      .from(el)
      .save()
      .then(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "下载 PDF";
        }
      })
      .catch(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "下载 PDF";
        }
        alert("下载失败，请改用「打印 / 另存 PDF」。");
      });
  }

  function boot() {
    paint();
    var chk = document.getElementById("chkHints");
    var chkKey = document.getElementById("chkKey");
    if (chk) chk.addEventListener("change", paint);
    if (chkKey) chkKey.addEventListener("change", paint);
    var bp = document.getElementById("btnPrint");
    if (bp) bp.addEventListener("click", printPdf);
    var bd = document.getElementById("btnDownload");
    if (bd) bd.addEventListener("click", downloadPdf);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
