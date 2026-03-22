/**
 * junior_vocab 例句 PDF 打印
 * 按浏览顺序输出：左栏英文+句子结构 | 中间对折线 | 右栏中文+首字母
 * 点击 PDF 后调用 DeepSeek API 分析句子结构，请等待完成后再打印
 */
(function () {
  "use strict";

  var DEEPSEEK_KEY = (typeof window !== "undefined" && window.VOCAB_DEEPSEEK_KEY) ? window.VOCAB_DEEPSEEK_KEY : "sk-daa16008e81843deba6fefe9dce51465";
  var ROLE_COLORS = {
    Subject: ["#E74C3C", "主语"],
    Predicate: ["#2ECC71", "谓语"],
    LinkingVerb: ["#27AE60", "系动词"],
    Predicative: ["#16A085", "表语"],
    Object: ["#3498DB", "宾语"],
    ObjectComplement: ["#E67E22", "宾补"],
    Attribute: ["#F39C12", "定语"],
    Adverbial: ["#9B59B6", "状语"],
    Complement: ["#1ABC9C", "补语"],
    MainClause: ["#2980B9", "主句"],
    SubordinateClause: ["#8E44AD", "从句"],
    Conjunction: ["#7F8C8D", "连词"],
    Appositive: ["#1E8449", "同位语"],
    Punctuation: ["#BDC3C7", "标点"]
  };

  function escapeHtml(s) {
    if (!s) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function analyzeSentence(sentence) {
    var prompt = 'Analyze the grammatical structure of this English sentence in detail.\n' +
      'Return a JSON array where each element has:\n' +
      '- "text": the word or phrase (group related words together naturally)\n' +
      '- "role": one of: Subject, Predicate, LinkingVerb, Predicative, Object, ObjectComplement, Attribute, Adverbial, Complement, MainClause, SubordinateClause, Conjunction, Appositive, Punctuation\n' +
      '  (Subject=主语, Predicate=谓语, LinkingVerb=系动词如is/are/seem, Predicative=表语, Object=宾语, ObjectComplement=宾补, Attribute=定语, Adverbial=状语, Complement=补语, MainClause=主句, SubordinateClause=从句, Conjunction=连词, Appositive=同位语)\n' +
      '- "color": use these exact hex codes:\n' +
      '  Subject=#E74C3C, Predicate=#2ECC71, LinkingVerb=#27AE60, Predicative=#16A085, Object=#3498DB, ObjectComplement=#E67E22, Attribute=#F39C12, Adverbial=#9B59B6, Complement=#1ABC9C, MainClause=#2980B9, SubordinateClause=#8E44AD, Conjunction=#7F8C8D, Appositive=#1E8449, Punctuation=#BDC3C7\n\n' +
      'Sentence: "' + sentence.replace(/"/g, '\\"') + '"\n\n' +
      'Return ONLY the JSON array, no markdown, no explanation.';
    return fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + DEEPSEEK_KEY },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.1 })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
        content = content.replace(/^```json\s*|\s*```$/g, "").trim();
        try {
          return JSON.parse(content);
        } catch (e) {
          return [{ text: sentence, role: "Subject", color: "#999999" }];
        }
      })
      .catch(function (e) {
        return [{ text: sentence, role: "Subject", color: "#999999" }];
      });
  }

  function renderAnalysisHtml(analysis) {
    if (!analysis || !analysis.length) return "";
    var parts = [];
    for (var i = 0; i < analysis.length; i++) {
      var t = analysis[i];
      var text = t.text || "";
      var role = t.role || "";
      var color = t.color || "#999";
      var cnLabel = (ROLE_COLORS[role] && ROLE_COLORS[role][1]) ? ROLE_COLORS[role][1] : role;
      if (role === "Punctuation") {
        parts.push('<span style="color:' + color + '">' + escapeHtml(text) + "</span>");
      } else {
        parts.push('<span class="token" style="color:' + color + ';border-bottom:2px solid ' + color + '" title="' + escapeHtml(cnLabel) + '">' + escapeHtml(text) + "</span>");
      }
    }
    return parts.join(" ");
  }

  function getInitials(sentence) {
    if (!sentence) return "";
    var tokens = sentence.match(/[a-zA-Z']+|[^a-zA-Z'\s]/g) || [];
    var result = [];
    for (var i = 0; i < tokens.length; i++) {
      if (/[a-zA-Z]/.test(tokens[i])) {
        result.push(tokens[i][0] + "_");
      } else {
        result.push(tokens[i]);
      }
    }
    return result.join(" ");
  }

  function inferPageTitle() {
    if (typeof window.VOCAB_PDF_TITLE === "string" && window.VOCAB_PDF_TITLE) {
      return window.VOCAB_PDF_TITLE;
    }
    var path = (window.location.pathname || "").replace(/\\/g, "/");
    var m = path.match(/junior_vocab\/(G7_B2|G8_B2|G9)\/Unit(\d+)/i);
    if (!m) return "人教版英语 词汇例句";
    var gradeMap = { G7_B2: "七年级下", G8_B2: "八年级下", G9: "九年级全" };
    var grade = gradeMap[m[1]] || m[1];
    var unit = "Unit" + m[2];
    return "人教版英语 " + grade + " · " + unit + " 词汇例句";
  }

  function getRolesInAnalysis(analysis) {
    var roles = {};
    if (!analysis || !analysis.length) return roles;
    for (var i = 0; i < analysis.length; i++) {
      var r = analysis[i].role;
      if (r && r !== "Punctuation" && ROLE_COLORS[r]) roles[r] = true;
    }
    return roles;
  }

  var ROLE_ORDER = ["Subject","Predicate","LinkingVerb","Predicative","Object","ObjectComplement","Attribute","Adverbial","Complement","MainClause","SubordinateClause","Conjunction","Appositive"];

  function getMiniTagsForRoles(roles) {
    var html = "";
    for (var i = 0; i < ROLE_ORDER.length; i++) {
      var r = ROLE_ORDER[i];
      if (roles[r]) {
        var v = ROLE_COLORS[r];
        if (v && v[1] !== "标点") {
          html += '<span class="mini-tag" style="color:' + v[0] + ';border-color:' + v[0] + '">' + v[1] + "</span>";
        }
      }
    }
    return html;
  }

  function getLegendItemsForRoles(roles) {
    var html = "";
    for (var i = 0; i < ROLE_ORDER.length; i++) {
      var r = ROLE_ORDER[i];
      if (roles[r]) {
        var v = ROLE_COLORS[r];
        if (v && v[1] !== "标点") {
          html += '<span class="legend-item"><span class="legend-dot" style="background:' + v[0] + '"></span>' + v[1] + "</span>";
        }
      }
    }
    return html;
  }

  function buildPdfHtml(data, pageTitle, analysisMap) {
    analysisMap = analysisMap || {};
    var words = (data && data.units && data.units[0] && data.units[0].words) ? data.units[0].words : [];
    var allRolesUsed = {};

    var blocks = [];
    for (var w = 0; w < words.length; w++) {
      var word = words[w];
      var examples = word.examples || [];
      if (examples.length === 0) continue;

      var wordHeader =
        '<div class="word-header">' +
        '<span class="word-en">' + escapeHtml(word.word || "") + "</span>" +
        '<span class="word-ipa">' + escapeHtml(word.ipa || "") + "</span>" +
        '<span class="word-cn">' + escapeHtml(word.meaning_cn || "") + "</span>" +
        '<span class="word-usage">' + escapeHtml(word.usage || "") + "</span>" +
        "</div>";

      var rows = [];
      for (var e = 0; e < examples.length; e++) {
        var ex = examples[e];
        var en = (ex.en || "").trim();
        var cn = ex.cn || "";
        var initials = getInitials(en);
        var analysis = analysisMap[en];
        var rolesInThis = getRolesInAnalysis(analysis);
        for (var r in rolesInThis) allRolesUsed[r] = true;
        var miniTags = getMiniTagsForRoles(rolesInThis);
        var analysisHtml = analysis && analysis.length
          ? '<div class="analysis">' + renderAnalysisHtml(analysis) + (miniTags ? '</div><div class="analysis-legend-mini">' + miniTags + "</div>" : "</div>")
          : '<div class="analysis-hint">（分析中...）</div>';

        rows.push(
          '<div class="example-row">' +
            '<div class="col-left">' +
              '<div class="en-sentence">' + escapeHtml(ex.en || "") + "</div>" +
              analysisHtml +
            "</div>" +
            '<div class="col-divider"><div class="fold-line"></div></div>' +
            '<div class="col-right">' +
              '<div class="cn-sentence">' + escapeHtml(cn) + "</div>" +
              '<div class="initials">' + escapeHtml(initials) + "</div>" +
            "</div>" +
          "</div>"
        );
      }
      blocks.push('<div class="word-block">' + wordHeader + rows.join("") + "</div>");
    }

    var legendItems = getLegendItemsForRoles(allRolesUsed);

    return (
      "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><title>" +
      escapeHtml(pageTitle) +
      '</title><style>' +
      "*{box-sizing:border-box;margin:0;padding:0}" +
      "body{font-family:\"Times New Roman\",\"SimSun\",serif;font-size:10pt;line-height:1.6;background:#fff}" +
      ".page-header{text-align:center;padding:10mm 18mm 6mm;border-bottom:2px solid #1a1a1a}" +
      ".page-header h1{font-size:16pt;letter-spacing:3px}" +
      ".page-header p{font-size:9pt;color:#555;margin-top:3px}" +
      ".legend{display:flex;flex-wrap:wrap;gap:6px 14px;padding:5mm 18mm;border-bottom:1px dashed #ccc;font-size:8.5pt}" +
      ".legend-item{display:flex;align-items:center;gap:4px}" +
      ".legend-dot{width:10px;height:10px;border-radius:50%;display:inline-block}" +
      ".word-block{padding:4mm 18mm 0;page-break-inside:avoid}" +
      ".word-header{display:flex;align-items:baseline;gap:8px;background:#f5f5f5;padding:3px 8px;border-left:3px solid #3498DB;margin-bottom:2mm;font-size:9.5pt}" +
      ".word-en{font-weight:bold;font-size:11pt;color:#1a1a1a}" +
      ".word-ipa{color:#666;font-family:monospace}" +
      ".word-cn{color:#E74C3C;font-weight:bold}" +
      ".word-usage{color:#888;font-size:8.5pt}" +
      ".example-row{display:flex;align-items:stretch;min-height:22mm;border-bottom:1px dotted #ddd;margin-bottom:1mm}" +
      ".col-left{flex:0 0 55%;padding:3mm 4mm 3mm 0}" +
      ".en-sentence{font-size:10.5pt;font-weight:500;color:#1a1a1a;margin-bottom:2mm;line-height:1.5}" +
      ".analysis{font-size:9.5pt;line-height:1.8;margin-bottom:1mm}.token{display:inline;padding:0 1px;font-size:9pt}" +
      ".analysis-legend-mini{display:flex;flex-wrap:wrap;gap:3px;margin-top:1mm}.mini-tag{font-size:7pt;border:1px solid;border-radius:3px;padding:0 3px;line-height:1.4}" +
      ".analysis-hint{font-size:8pt;color:#999;margin-top:1mm}" +
      ".col-divider{flex:0 0 5%;display:flex;justify-content:center;padding:2mm 0}" +
      ".fold-line{width:1px;background:repeating-linear-gradient(to bottom,#aaa 0,#aaa 4px,transparent 4px,transparent 8px);height:100%}" +
      ".col-right{flex:0 0 40%;padding:3mm 0 3mm 4mm}" +
      ".cn-sentence{font-size:10pt;color:#333;margin-bottom:2mm;line-height:1.5}" +
      ".initials{font-size:9pt;color:#888;font-family:\"Courier New\",monospace;letter-spacing:2px;line-height:1.8;border-top:1px dashed #ddd;padding-top:1mm}" +
      "@media print{@page{size:A4;margin:0}body{background:#fff}.word-block{page-break-inside:avoid}}" +
      "</style></head><body>" +
      '<div class="page-header">' +
      "<h1>" + escapeHtml(pageTitle) + "</h1>" +
      "<p>例句朗读 · 句子结构分析 · 中文对照 · 首字母背诵</p>" +
      '<p style="margin-top:4px;font-size:8pt;color:#888">左侧：英文例句 + 句子成分彩色标注 &nbsp;|&nbsp; 中间：对折线 &nbsp;|&nbsp; 右侧：中文翻译 + 首字母提示</p>' +
      "</div>" +
      (legendItems ? '<div class="legend"><strong style="margin-right:4px">句子成分图例（本页出现的成分）：</strong>' + legendItems + "</div>" : "") +
      blocks.join("") +
      "</body></html>"
    );
  }

  function showPdfLoading(total, onCancel) {
    var overlay = document.createElement("div");
    overlay.id = "vocab-pdf-overlay";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-family:system-ui,sans-serif;";
    overlay.innerHTML =
      '<div style="text-align:center;padding:24px;background:rgba(30,30,40,.95);border-radius:16px;max-width:360px;box-shadow:0 20px 60px rgba(0,0,0,.5);">' +
      '<div style="font-size:18px;font-weight:700;margin-bottom:12px;">正在分析句子结构</div>' +
      '<div id="vocab-pdf-progress" style="font-size:14px;color:#94a3b8;margin-bottom:16px;">0 / ' + total + ' 句</div>' +
      '<div style="width:100%;height:6px;background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden;">' +
      '<div id="vocab-pdf-bar" style="height:100%;background:linear-gradient(90deg,#7c6df0,#22d3c5);border-radius:99px;width:0%;transition:width .3s;"></div>' +
      '</div>' +
      '<div style="font-size:12px;color:#64748b;margin-top:12px;">请稍候，正在调用 DeepSeek 分析…</div>' +
      '<button id="vocab-pdf-cancel" style="margin-top:16px;padding:8px 20px;background:rgba(248,113,113,.2);color:#f87171;border:1px solid rgba(248,113,113,.4);border-radius:8px;cursor:pointer;font-size:14px;">取消</button>' +
      '</div>';
    document.body.appendChild(overlay);
    var update = function (done) {
      var pct = total > 0 ? Math.round((done / total) * 100) : 0;
      var prog = document.getElementById("vocab-pdf-progress");
      var bar = document.getElementById("vocab-pdf-bar");
      if (prog) prog.textContent = done + " / " + total + " 句";
      if (bar) bar.style.width = pct + "%";
    };
    var cancelBtn = document.getElementById("vocab-pdf-cancel");
    if (cancelBtn && onCancel) cancelBtn.onclick = function () { onCancel(); removeOverlay(); };
    return { update: update, remove: removeOverlay };
    function removeOverlay() {
      var o = document.getElementById("vocab-pdf-overlay");
      if (o) o.remove();
    }
  }

  window.openVocabPdf = function () {
    var data = (typeof window !== "undefined" && window.VOCAB_DATA) ? window.VOCAB_DATA : null;
    if (!data || !data.units || !data.units[0]) {
      alert("未找到词汇数据，请刷新页面后重试。");
      return;
    }
    var words = data.units[0].words || [];
    var sentences = [];
    for (var i = 0; i < words.length; i++) {
      var exs = words[i].examples || [];
      for (var j = 0; j < exs.length; j++) {
        var en = (exs[j].en || "").trim();
        if (en) sentences.push(en);
      }
    }
    var unique = [];
    var seen = {};
    for (var k = 0; k < sentences.length; k++) {
      if (!seen[sentences[k]]) { seen[sentences[k]] = true; unique.push(sentences[k]); }
    }
    var total = unique.length;
    if (total === 0) {
      alert("没有找到例句数据。");
      return;
    }
    var loading = showPdfLoading(total);
    var analysisMap = {};
    var cancelled = false;
    var doneCount = 0;
    var nextIdx = 0;
    var finished = false;
    var CONCURRENCY = 6;

    function finish() {
      if (finished) return;
      finished = true;
      loading.remove();
      if (!cancelled) {
        var title = inferPageTitle();
        var html = buildPdfHtml(data, title, analysisMap);
        var w = window.open("", "_blank", "width=900,height=700,scrollbars=yes");
        if (w) {
          w.document.write(html);
          w.document.close();
          w.focus();
          setTimeout(function () { w.print(); }, 400);
        } else {
          alert("请允许弹出窗口以打开打印预览。");
        }
      }
    }

    function startOne() {
      if (cancelled || nextIdx >= unique.length) {
        if (doneCount >= unique.length) finish();
        return;
      }
      var idx = nextIdx++;
      var sent = unique[idx];
      analyzeSentence(sent).then(function (result) {
        if (cancelled) return;
        analysisMap[sent] = result;
        doneCount++;
        loading.update(doneCount);
        if (doneCount >= unique.length) finish();
        else startOne();
      }).catch(function () {
        if (cancelled) return;
        analysisMap[sent] = [{ text: sent, role: "Subject", color: "#999999" }];
        doneCount++;
        loading.update(doneCount);
        if (doneCount >= unique.length) finish();
        else startOne();
      });
    }

    var cancelBtn = document.getElementById("vocab-pdf-cancel");
    if (cancelBtn) cancelBtn.onclick = function () { cancelled = true; loading.remove(); };

    for (var i = 0; i < CONCURRENCY && i < unique.length; i++) startOne();
  };
})();
