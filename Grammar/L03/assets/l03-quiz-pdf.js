/**
 * Lesson 03 · Page 09 时光塔综合练习 · 打印 / 另存 PDF
 * 生成配色丰富的 A4 练习卷 + 答案卷（新窗口 → 浏览器打印另存 PDF）
 */
(function (global) {
  "use strict";

  var LOGO_URL =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png";

  var FLOOR_META = [
    {
      key: "floor1",
      badge: "1F",
      title: "基础扫描",
      sub: "单项选择 ×10",
      accent: "#1565c0",
      soft: "#e3f2fd",
      soft2: "#bbdefb",
      ribbon: "linear-gradient(120deg, #1565c0 0%, #42a5f5 55%, #26c6da 100%)",
    },
    {
      key: "floor2",
      badge: "2F",
      title: "炼金填空",
      sub: "词汇变形 ×10",
      accent: "#2e7d32",
      soft: "#e8f5e9",
      soft2: "#c8e6c9",
      ribbon: "linear-gradient(120deg, #2e7d32 0%, #66bb6a 55%, #26a69a 100%)",
    },
    {
      key: "floor3",
      badge: "3F",
      title: "魔法变身",
      sub: "句型转换 ×5",
      accent: "#6a1b9a",
      soft: "#f3e5f5",
      soft2: "#e1bee7",
      ribbon: "linear-gradient(120deg, #6a1b9a 0%, #ab47bc 55%, #ec407a 100%)",
    },
    {
      key: "floor4",
      badge: "4F",
      title: "时光日记",
      sub: "语篇填空 ×10",
      accent: "#e65100",
      soft: "#fff3e0",
      soft2: "#ffe0b2",
      ribbon: "linear-gradient(120deg, #e65100 0%, #ff8f00 50%, #ffc107 100%)",
    },
  ];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function nl2br(s) {
    return esc(s).replace(/\n/g, "<br>");
  }

  function todayStr() {
    var d = new Date();
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  function getQuizData() {
    return global.L03_QUIZ_DATA || null;
  }

  function blankLine(widthEm) {
    return (
      '<span class="blank" style="min-width:' +
      (widthEm || 6) +
      'em"></span>'
    );
  }

  function renderFloor1Practice(items) {
    return items
      .map(function (item, i) {
        var opts = (item.options || [])
          .map(function (op, oi) {
            var letter = String.fromCharCode(65 + oi);
            return (
              '<label class="opt"><span class="bubble">' +
              letter +
              '</span><span class="en">' +
              esc(op) +
              "</span></label>"
            );
          })
          .join("");
        return (
          '<article class="q-item f1">' +
          '<div class="q-num">' +
          (i + 1) +
          "</div>" +
          '<div class="q-body"><p class="q-stem en">' +
          nl2br(item.q) +
          '</p><div class="opts">' +
          opts +
          "</div></div></article>"
        );
      })
      .join("");
  }

  function renderFloor2Practice(items) {
    return items
      .map(function (item, i) {
        var stem = esc(item.q).replace(
          /______/g,
          blankLine(7)
        );
        return (
          '<article class="q-item f2">' +
          '<div class="q-num">' +
          (i + 1) +
          "</div>" +
          '<div class="q-body"><p class="q-stem en">' +
          stem +
          "</p></div></article>"
        );
      })
      .join("");
  }

  function renderFloor3Practice(items) {
    return items
      .map(function (item, i) {
        return (
          '<article class="q-item f3">' +
          '<div class="q-num">' +
          (i + 1) +
          "</div>" +
          '<div class="q-body"><p class="q-stem">' +
          nl2br(item.q) +
          '</p><div class="write-lines">' +
          '<div class="write-line"></div>' +
          '<div class="write-line"></div>' +
          "</div></div></article>"
        );
      })
      .join("");
  }

  function renderFloor4Practice(floor4) {
    var text = String(floor4.text || "");
    var html = esc(text).replace(
      /\((\d+)\)____\(([^)]+)\)/g,
      function (_, n, hint) {
        return (
          '<span class="blank-num">(' +
          n +
          ')</span><span class="blank hint-blank"><span class="hint-tag">' +
          esc(hint) +
          "</span></span>"
        );
      }
    );
    return (
      '<div class="passage-card"><p class="passage en">' +
      html +
      "</p>" +
      '<div class="answer-grid">' +
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map(function (n) {
          return (
            '<div class="ans-slot"><span class="ans-n">' +
            n +
            "</span>" +
            blankLine(5) +
            "</div>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  function renderAnswerKey(data) {
    var parts = [];

    parts.push('<section class="answer-floor af1"><h3><span>1F</span> 基础扫描 · 答案</h3><ol class="ans-list">');
    data.floor1.forEach(function (item) {
      parts.push(
        '<li><strong class="ans-chip">' +
          esc(item.ans) +
          '</strong> <span class="exp">' +
          esc(item.exp || "") +
          "</span></li>"
      );
    });
    parts.push("</ol></section>");

    parts.push('<section class="answer-floor af2"><h3><span>2F</span> 炼金填空 · 答案</h3><ol class="ans-list">');
    data.floor2.forEach(function (item) {
      parts.push(
        '<li><strong class="ans-chip">' +
          esc(item.ans) +
          '</strong> <span class="exp">' +
          esc(item.exp || "") +
          "</span></li>"
      );
    });
    parts.push("</ol></section>");

    parts.push('<section class="answer-floor af3"><h3><span>3F</span> 魔法变身 · 答案</h3><ol class="ans-list">');
    data.floor3.forEach(function (item) {
      parts.push(
        '<li><strong class="ans-chip en">' +
          esc(item.ans) +
          '</strong> <span class="exp">' +
          esc(item.exp || "") +
          "</span></li>"
      );
    });
    parts.push("</ol></section>");

    parts.push('<section class="answer-floor af4"><h3><span>4F</span> 时光日记 · 答案</h3><ol class="ans-list cols">');
    (data.floor4.answers || []).forEach(function (ans, i) {
      var exp = (data.floor4.explanations && data.floor4.explanations[i]) || "";
      parts.push(
        '<li><strong class="ans-chip">' +
          esc(ans) +
          '</strong> <span class="exp">' +
          esc(exp) +
          "</span></li>"
      );
    });
    parts.push("</ol></section>");

    return parts.join("");
  }

  function buildCss() {
    return [
      "@page { size: A4 portrait; margin: 12mm 12mm 14mm; }",
      "* { box-sizing: border-box; }",
      "body { margin: 0; padding: 0; color: #2c2c2c; font-family: 'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }",
      ".en { font-family: 'Segoe UI','Cambria','Georgia',serif; }",
      ".sheet { width: 100%; }",
      /* cover */
      ".cover { min-height: 250mm; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; page-break-after: always; padding: 8mm 6mm; }",
      ".cover-logo { height: 48px; width: auto; margin-bottom: 14px; }",
      ".cover-banner { width: 100%; border-radius: 18px; padding: 22px 18px 20px; color: #fff; background: linear-gradient(135deg, #ff8f00 0%, #e85d4c 28%, #9b59b6 62%, #4a90d9 100%); box-shadow: 0 10px 28px rgba(60,40,20,0.18); }",
      ".cover-kicker { margin: 0 0 8px; font-size: 10.5pt; font-weight: 800; letter-spacing: 0.08em; opacity: 0.95; }",
      ".cover-title { margin: 0 0 8px; font-size: 22pt; font-weight: 900; line-height: 1.25; }",
      ".cover-sub { margin: 0; font-size: 10.5pt; line-height: 1.5; opacity: 0.96; }",
      ".cover-stats { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; width: 100%; }",
      ".cover-stats li { padding: 10px 14px; border-radius: 12px; font-size: 10pt; font-weight: 800; color: #fff; min-width: 120px; }",
      ".cover-stats .s1 { background: linear-gradient(135deg,#1565c0,#42a5f5); }",
      ".cover-stats .s2 { background: linear-gradient(135deg,#2e7d32,#66bb6a); }",
      ".cover-stats .s3 { background: linear-gradient(135deg,#6a1b9a,#ab47bc); }",
      ".cover-stats .s4 { background: linear-gradient(135deg,#e65100,#ffb300); }",
      ".meta-row { margin-top: 18px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }",
      ".meta-box { border: 2px solid #c8a060; border-radius: 12px; background: linear-gradient(180deg,#fffdf8,#fff3e0); padding: 10px 12px; text-align: left; font-size: 10pt; }",
      ".meta-box label { display: block; font-size: 8.5pt; color: #8d6e63; font-weight: 700; margin-bottom: 4px; }",
      ".meta-line { border-bottom: 1.5px solid #bcaaa4; min-height: 18px; }",
      ".cover-foot { margin-top: 16px; font-size: 8.5pt; color: #5d4037; line-height: 1.5; max-width: 420px; }",
      /* floor pages */
      ".floor-page { page-break-after: always; padding-top: 2mm; }",
      ".floor-page:last-of-type { page-break-after: auto; }",
      ".floor-head { border-radius: 14px; padding: 12px 14px; color: #fff; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }",
      ".floor-badge { display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,0.22); font-weight: 900; font-size: 13pt; border: 2px solid rgba(255,255,255,0.55); flex-shrink: 0; }",
      ".floor-head h2 { margin: 0; font-size: 14pt; font-weight: 900; }",
      ".floor-head p { margin: 2px 0 0; font-size: 9pt; opacity: 0.95; }",
      ".name-bar { display: flex; gap: 16px; margin-bottom: 10px; font-size: 9.5pt; color: #5d4037; }",
      ".name-bar span { flex: 1; border-bottom: 1.5px dashed #a1887f; padding-bottom: 2px; }",
      ".q-item { display: flex; gap: 8px; margin-bottom: 8px; padding: 8px 9px; border-radius: 10px; border: 1.5px solid rgba(93,64,55,0.28); background: #fff; break-inside: avoid; page-break-inside: avoid; }",
      ".q-item.f1 { background: linear-gradient(90deg,#e3f2fd 0%,#fff 28%); border-color: #90caf9; }",
      ".q-item.f2 { background: linear-gradient(90deg,#e8f5e9 0%,#fff 28%); border-color: #a5d6a7; }",
      ".q-item.f3 { background: linear-gradient(90deg,#f3e5f5 0%,#fff 28%); border-color: #ce93d8; }",
      ".q-num { width: 22px; height: 22px; border-radius: 50%; background: #5d4037; color: #fff; font-size: 9pt; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }",
      ".q-item.f1 .q-num { background: #1565c0; }",
      ".q-item.f2 .q-num { background: #2e7d32; }",
      ".q-item.f3 .q-num { background: #6a1b9a; }",
      ".q-body { flex: 1; min-width: 0; }",
      ".q-stem { margin: 0; font-size: 10pt; line-height: 1.45; color: #2c2c2c; white-space: pre-wrap; }",
      ".opts { display: flex; flex-wrap: wrap; gap: 6px 12px; margin-top: 6px; }",
      ".opt { display: inline-flex; align-items: center; gap: 5px; font-size: 9.5pt; }",
      ".bubble { width: 16px; height: 16px; border-radius: 50%; border: 1.6px solid #1565c0; color: #1565c0; font-size: 8pt; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }",
      ".blank { display: inline-block; min-height: 1.1em; border-bottom: 1.6px solid #5d4037; margin: 0 3px; vertical-align: baseline; }",
      ".hint-blank { position: relative; min-width: 5.5em; padding-bottom: 1px; }",
      ".hint-tag { position: absolute; left: 50%; top: -11px; transform: translateX(-50%); font-size: 7pt; color: #e65100; font-weight: 700; white-space: nowrap; background: #fff8e1; padding: 0 3px; border-radius: 4px; border: 1px solid #ffcc80; }",
      ".write-lines { margin-top: 6px; }",
      ".write-line { height: 18px; border-bottom: 1.4px dashed #b39ddb; margin-bottom: 4px; }",
      ".passage-card { border-radius: 12px; border: 2px solid #ffb74d; background: linear-gradient(180deg,#fff8e1,#fffdf7); padding: 12px 12px 10px; }",
      ".passage { margin: 0; font-size: 10.5pt; line-height: 1.85; text-align: justify; }",
      ".blank-num { display: inline-block; font-size: 8pt; font-weight: 800; color: #e65100; margin-right: 1px; }",
      ".answer-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 12px; }",
      ".ans-slot { display: flex; align-items: center; gap: 4px; font-size: 9pt; }",
      ".ans-n { width: 16px; height: 16px; border-radius: 4px; background: #ff8f00; color: #fff; font-size: 8pt; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }",
      ".page-foot { margin-top: 10px; text-align: center; font-size: 8pt; color: #8d6e63; }",
      /* answer key */
      ".answers-cover { page-break-before: always; margin-bottom: 12px; }",
      ".answers-banner { border-radius: 14px; padding: 14px 16px; color: #fff; background: linear-gradient(120deg,#1a237e 0%,#6a1b9a 40%,#c62828 75%,#ef6c00 100%); }",
      ".answers-banner h2 { margin: 0 0 4px; font-size: 16pt; }",
      ".answers-banner p { margin: 0; font-size: 9.5pt; opacity: 0.95; }",
      ".answer-floor { margin-top: 12px; border-radius: 12px; padding: 10px 12px; break-inside: avoid; page-break-inside: avoid; }",
      ".answer-floor.af1 { background: #e3f2fd; border: 2px solid #64b5f6; }",
      ".answer-floor.af2 { background: #e8f5e9; border: 2px solid #81c784; }",
      ".answer-floor.af3 { background: #f3e5f5; border: 2px solid #ba68c8; }",
      ".answer-floor.af4 { background: #fff3e0; border: 2px solid #ffb74d; }",
      ".answer-floor h3 { margin: 0 0 8px; font-size: 11.5pt; display: flex; align-items: center; gap: 8px; }",
      ".answer-floor h3 span { display: inline-flex; width: 28px; height: 28px; border-radius: 8px; align-items: center; justify-content: center; color: #fff; font-size: 9pt; }",
      ".af1 h3 span { background: #1565c0; }",
      ".af2 h3 span { background: #2e7d32; }",
      ".af3 h3 span { background: #6a1b9a; }",
      ".af4 h3 span { background: #e65100; }",
      ".ans-list { margin: 0; padding-left: 18px; }",
      ".ans-list li { margin-bottom: 5px; font-size: 9pt; line-height: 1.4; }",
      ".ans-list.cols { columns: 2; column-gap: 14px; }",
      ".ans-chip { display: inline-block; padding: 1px 7px; border-radius: 6px; background: #fff; border: 1.5px solid currentColor; color: #1565c0; font-weight: 800; margin-right: 4px; }",
      ".af2 .ans-chip { color: #2e7d32; }",
      ".af3 .ans-chip { color: #6a1b9a; }",
      ".af4 .ans-chip { color: #e65100; }",
      ".exp { color: #546e7a; font-size: 8.2pt; }",
      "@media print { body { background: #fff !important; } .cover, .floor-head, .q-item, .passage-card, .answer-floor, .answers-banner, .cover-stats li, .meta-box, .ans-chip, .q-num, .ans-n, .bubble, .hint-tag { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }",
    ].join("\n");
  }

  function buildHtml(data, mode) {
    var date = todayStr();
    var withAnswers = mode !== "practice";
    var floorsHtml = "";

    FLOOR_META.forEach(function (meta) {
      var body = "";
      if (meta.key === "floor1") body = renderFloor1Practice(data.floor1);
      else if (meta.key === "floor2") body = renderFloor2Practice(data.floor2);
      else if (meta.key === "floor3") body = renderFloor3Practice(data.floor3);
      else body = renderFloor4Practice(data.floor4);

      floorsHtml +=
        '<section class="floor-page">' +
        '<header class="floor-head" style="background:' +
        meta.ribbon +
        '">' +
        '<div class="floor-badge">' +
        meta.badge +
        "</div>" +
        "<div><h2>" +
        esc(meta.title) +
        "</h2><p>" +
        esc(meta.sub) +
        " · 一般过去时综合练习</p></div></header>" +
        '<div class="name-bar"><span>姓名 ______________</span><span>班级 ______________</span><span>得分 ______</span></div>' +
        body +
        '<p class="page-foot">Steven\'s Class · 第03讲 · 时光塔 · ' +
        meta.badge +
        " · " +
        date +
        "</p></section>";
    });

    var answerBlock = "";
    if (withAnswers) {
      answerBlock =
        '<section class="answers-cover">' +
        '<div class="answers-banner"><h2>参考答案 · 名师精讲</h2>' +
        "<p>建议先完成练习卷再对照；错题请抄入错题本，重点复习「Did / didn't + 原形」与不规则变化。</p></div>" +
        renderAnswerKey(data) +
        '<p class="page-foot">Steven\'s Class · 第03讲 Page 09 · Answer Key · ' +
        date +
        "</p></section>";
    }

    return (
      "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"/>" +
      "<title>第03讲 · 时光塔综合练习 · PDF</title>" +
      "<style>" +
      buildCss() +
      "</style></head><body><div class=\"sheet\">" +
      '<section class="cover">' +
      '<img class="cover-logo" src="' +
      LOGO_URL +
      '" alt="Steven\'s Class" width="204" height="61"/>' +
      '<div class="cover-banner">' +
      '<p class="cover-kicker">第03讲 · Page 09 · The Time Tower Final Quiz</p>' +
      '<h1 class="cover-title">巅峰竞技：时光塔 Boss 战</h1>' +
      '<p class="cover-sub">一般过去时综合练习卷 · 选择 / 词形 / 句转 / 语篇 · 共 35 题</p>' +
      "</div>" +
      '<ul class="cover-stats">' +
      '<li class="s1">1F 基础扫描<br>单项选择 ×10</li>' +
      '<li class="s2">2F 炼金填空<br>词汇变形 ×10</li>' +
      '<li class="s3">3F 魔法变身<br>句型转换 ×5</li>' +
      '<li class="s4">4F 时光日记<br>语篇填空 ×10</li>' +
      "</ul>" +
      '<div class="meta-row">' +
      '<div class="meta-box"><label>姓名 Name</label><div class="meta-line"></div></div>' +
      '<div class="meta-box"><label>班级 / 日期</label><div class="meta-line"></div></div>' +
      "</div>" +
      '<p class="cover-foot">打印提示：目标选「另存为 PDF」→ 纸张 A4 → 勾选「背景图形」→ 取消「页眉和页脚」。' +
      (withAnswers ? "本文件含练习卷 + 参考答案。" : "本文件为纯练习卷。") +
      "</p></section>" +
      floorsHtml +
      answerBlock +
      "</div></body></html>"
    );
  }

  function openAndPrint(html) {
    var w = global.open("", "_blank");
    if (!w) {
      alert("无法打开新窗口，请允许弹出窗口后重试。");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    function doPrint() {
      try {
        w.focus();
        w.print();
      } catch (e) {}
    }
    if (w.document.readyState === "complete") {
      setTimeout(doPrint, 280);
    } else {
      w.onload = function () {
        setTimeout(doPrint, 280);
      };
    }
  }

  function exportPdf(mode) {
    var data = getQuizData();
    if (!data || !data.floor1) {
      alert("题目数据尚未加载，请刷新页面后重试。");
      return;
    }
    openAndPrint(buildHtml(data, mode || "full"));
  }

  function ensureToolbar() {
    if (document.getElementById("l03-quiz-pdf-bar")) return;

    var bar = document.createElement("div");
    bar.id = "l03-quiz-pdf-bar";
    bar.className = "l03-quiz-pdf-bar no-print";
    bar.innerHTML =
      '<button type="button" class="btn-l03-quiz-pdf" id="btnL03QuizPdfFull" title="打印练习卷 + 答案">' +
      '<span class="pdf-ico" aria-hidden="true">PDF</span>' +
      "<span>打印 / 另存 PDF</span></button>" +
      '<button type="button" class="btn-l03-quiz-pdf btn-l03-quiz-pdf--alt" id="btnL03QuizPdfPractice" title="仅练习卷（无答案）">' +
      "<span>仅练习卷</span></button>" +
      '<p class="l03-quiz-pdf-hint">目标选「另存为 PDF」，勾选<strong>背景图形</strong></p>';

    document.body.appendChild(bar);

    document.getElementById("btnL03QuizPdfFull").addEventListener("click", function () {
      exportPdf("full");
    });
    document
      .getElementById("btnL03QuizPdfPractice")
      .addEventListener("click", function () {
        exportPdf("practice");
      });
  }

  global.exportL03QuizPdf = exportPdf;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureToolbar);
  } else {
    ensureToolbar();
  }
})(typeof window !== "undefined" ? window : this);
