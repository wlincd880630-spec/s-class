/**
 * Verb Atlas · PDF 工坊
 * 讲义 / 测试卷 HTML 预览（含 Azure 朗读）+ html2pdf 导出
 */
(function (global) {
  "use strict";

  var LEVELS = [
    { id: "g5", label: "小学五年级", short: "小五", color: "#0d9488" },
    { id: "g6", label: "小学六年级", short: "小六", color: "#0891b2" },
    { id: "j1", label: "初一", short: "初一", color: "#155eef" },
    { id: "j2", label: "初二", short: "初二", color: "#4f46e5" },
    { id: "j3", label: "初三中考", short: "初三", color: "#7654d8" },
    { id: "s1", label: "高一", short: "高一", color: "#c2410c" },
    { id: "s2", label: "高二", short: "高二", color: "#b45309" },
    { id: "s3", label: "高三高考", short: "高三", color: "#be123c" },
  ];

  var LEVEL_MAP = LEVELS.reduce(function (acc, item) {
    acc[item.id] = item;
    return acc;
  }, {});

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getExamplesStore() {
    return global.IV_PDF_EXAMPLES || null;
  }

  function getLevelExamples(verbId, levelId) {
    var store = getExamplesStore();
    if (!store || !store.byId || !store.byId[verbId]) return null;
    return store.byId[verbId].levels[levelId] || null;
  }

  function formVariants(form) {
    return String(form || "")
      .split(/\s*\/\s*/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function presentHighlightForms(verb) {
    var base = String(verb.base || "");
    var extra = {
      be: ["am", "is", "are", "be"],
      have: ["have", "has"],
      do: ["do", "does"],
      go: ["go", "goes"],
      can: ["can"],
    };
    var list = formVariants(base).concat(extra[verb.id] || []);
    if (base && !extra[verb.id]) {
      if (/[sxz]$/i.test(base) || /(ch|sh)$/i.test(base)) list.push(base + "es");
      else if (/[^aeiou]y$/i.test(base)) list.push(base.slice(0, -1) + "ies");
      else list.push(base + "s");
    }
    if (base && verb.id !== "be") {
      if (/e$/i.test(base) && !/(ee|ye|oe)$/i.test(base)) list.push(base.slice(0, -1) + "ing");
      else list.push(base + "ing");
    }
    return list.join(" / ");
  }

  function blankSentence(en, form) {
    if (!en) return "";
    if (!form || form === "—" || form === "-") return en;
    var variants = formVariants(form).sort(function (a, b) {
      return b.length - a.length;
    });
    var out = en;
    variants.forEach(function (v) {
      if (v.indexOf(" ") >= 0) {
        out = out.replace(new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "______");
        return;
      }
      var escaped = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var re = new RegExp("\\b" + escaped + "\\b", "gi");
      out = out.replace(re, "______");
    });
    return out;
  }

  function highlightForm(en, form, tone) {
    if (!en) return "";
    if (!form || form === "—" || form === "-") return escapeHtml(en);
    var variants = formVariants(form).sort(function (a, b) {
      return b.length - a.length;
    });
    var pattern = variants
      .map(function (v) {
        return v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("|");
    if (!pattern) return escapeHtml(en);
    var re = new RegExp("\\b(" + pattern + ")\\b", "gi");
    // multi-word forms like "been able to"
    variants.forEach(function (v) {
      if (v.indexOf(" ") >= 0) {
        var multi = new RegExp("(" + v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
        en = String(en).replace(multi, "<<<$1>>>");
      }
    });
    var html = escapeHtml(en).replace(/&lt;&lt;&lt;(.*?)&gt;&gt;&gt;/g, '<mark class="pdf-mark pdf-mark-' + tone + '">$1</mark>');
    return html.replace(re, '<mark class="pdf-mark pdf-mark-' + tone + '">$1</mark>');
  }

  function todayLabel() {
    var d = new Date();
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  function normalizeQuizTargets(targets) {
    var raw = targets && typeof targets === "object" ? targets : { past: true, pp: true };
    var past = Object.prototype.hasOwnProperty.call(raw, "past") ? !!raw.past : true;
    var pp = Object.prototype.hasOwnProperty.call(raw, "pp") ? !!raw.pp : true;
    if (!past && !pp) {
      past = true;
      pp = true;
    }
    return { past: past, pp: pp };
  }

  function quizTargetLabel(targets, lang) {
    var t = normalizeQuizTargets(targets);
    if (t.past && t.pp) {
      return lang === "en" ? "Past & Past Participle" : "过去式 · 过去分词";
    }
    if (t.past) return lang === "en" ? "Past Tense Only" : "仅过去式";
    return lang === "en" ? "Past Participle Only" : "仅过去分词";
  }

  function quizFilenameSuffix(targets) {
    var t = normalizeQuizTargets(targets);
    if (t.past && t.pp) return "both";
    if (t.past) return "past";
    return "pp";
  }

  function buildCoverHtml(options) {
    var level = LEVEL_MAP[options.levelId] || LEVELS[2];
    var quizTargets = normalizeQuizTargets(options.quizTargets);
    var modeLabel =
      options.mode === "quiz"
        ? quizTargetLabel(quizTargets, "en") + " Quiz"
        : "Irregular Verb Study Sheet";
    var modeCn =
      options.mode === "quiz"
        ? quizTargetLabel(quizTargets, "zh") + "测试卷"
        : "不规则动词学习讲义";
    var quizNote = "根据例句语境填写" + quizTargetLabel(quizTargets, "zh") + "；页末附参考答案。";
    var metaExtra =
      options.mode === "quiz"
        ? "<div><span>测试目标</span><strong>" +
          escapeHtml(quizTargetLabel(quizTargets, "zh")) +
          "</strong></div>"
        : "";
    return (
      '<section class="pdf-cover" style="--level-color:' +
      level.color +
      '">' +
      '<div class="pdf-cover-badge">Verb Atlas · S-Class</div>' +
      '<h1 class="pdf-cover-title" lang="en">' +
      escapeHtml(modeLabel) +
      "</h1>" +
      '<p class="pdf-cover-sub">' +
      escapeHtml(modeCn) +
      "</p>" +
      '<div class="pdf-cover-meta' +
      (options.mode === "quiz" ? " pdf-cover-meta-4" : "") +
      '">' +
      "<div><span>难度</span><strong>" +
      escapeHtml(level.label) +
      "</strong></div>" +
      "<div><span>词数</span><strong>" +
      options.verbs.length +
      "</strong></div>" +
      metaExtra +
      "<div><span>日期</span><strong>" +
      todayLabel() +
      "</strong></div>" +
      "</div>" +
      '<p class="pdf-cover-note">' +
      (options.mode === "quiz"
        ? escapeHtml(quizNote)
        : "每词含原形、过去式、过去分词及对应难度例句；预览页可点按喇叭朗读。") +
      "</p>" +
      "</section>"
    );
  }

  function buildStudyCard(verb, levelId, index) {
    var level = LEVEL_MAP[levelId] || LEVELS[2];
    var examples = getLevelExamples(verb.id, levelId);
    if (!examples) {
      return (
        '<article class="pdf-verb-card pdf-missing">' +
        "<header><strong lang=\"en\">" +
        escapeHtml(verb.base) +
        "</strong><span>" +
        escapeHtml(verb.cn) +
        "</span></header>" +
        "<p>该词分级例句尚未生成，请稍后重试或重新运行 DeepSeek 生成脚本。</p></article>"
      );
    }

    var pastLabel = verb.past;
    var ppLabel = verb.id === "can" ? "been able to" : verb.pp;
    var rows = [
      {
        key: "base",
        label: "动词原形",
        form: verb.base,
        highlight: presentHighlightForms(verb),
        tone: "base",
        example: examples.base,
      },
      {
        key: "past",
        label: "过去式",
        form: pastLabel,
        highlight: pastLabel,
        tone: "past",
        example: examples.past,
      },
      {
        key: "pp",
        label: "过去分词",
        form: ppLabel,
        highlight: ppLabel,
        tone: "pp",
        example: examples.pp,
      },
    ];

    var body = rows
      .map(function (row) {
        var en = row.example && row.example.en ? row.example.en : "";
        var cn = row.example && row.example.cn ? row.example.cn : "";
        return (
          '<div class="pdf-tense-row pdf-tense-' +
          row.tone +
          '">' +
          '<div class="pdf-tense-form">' +
          '<span class="pdf-tense-label">' +
          escapeHtml(row.label) +
          "</span>" +
          '<strong lang="en">' +
          escapeHtml(row.form) +
          "</strong>" +
          "</div>" +
          '<div class="pdf-tense-example">' +
          '<p class="pdf-en" lang="en">' +
          highlightForm(en, row.highlight, row.tone) +
          "</p>" +
          '<p class="pdf-cn">' +
          escapeHtml(cn) +
          "</p>" +
          '<button type="button" class="pdf-speak-btn" data-speak="' +
          escapeHtml(en) +
          '" aria-label="朗读' +
          escapeHtml(row.label) +
          '例句">' +
          '<span class="pdf-speak-icon" aria-hidden="true"></span>朗读' +
          "</button>" +
          "</div></div>"
        );
      })
      .join("");

    return (
      '<article class="pdf-verb-card" style="--level-color:' +
      level.color +
      '">' +
      '<header class="pdf-verb-head">' +
      '<div class="pdf-verb-index">' +
      String(index + 1).padStart(2, "0") +
      "</div>" +
      '<div class="pdf-verb-title">' +
      '<strong lang="en">' +
      escapeHtml(verb.base) +
      "</strong>" +
      "<span>" +
      escapeHtml(verb.cn) +
      (verb.ipa ? " · " + escapeHtml(verb.ipa) : "") +
      "</span>" +
      "</div>" +
      '<div class="pdf-verb-level">' +
      escapeHtml(level.short) +
      "</div>" +
      "</header>" +
      '<div class="pdf-tense-stack">' +
      body +
      "</div></article>"
    );
  }

  function buildQuizItem(options) {
    var label = options.label;
    var blank = options.blank;
    var example = options.example;
    var aria = options.aria;
    return (
      '<div class="pdf-quiz-item">' +
      '<div class="pdf-quiz-label">' +
      escapeHtml(label) +
      "</div>" +
      '<p class="pdf-en" lang="en">' +
      escapeHtml(blank) +
      "</p>" +
      (example && example.cn ? '<p class="pdf-cn">' + escapeHtml(example.cn) + "</p>" : "") +
      '<div class="pdf-write-line"><span>填写：</span><em></em></div>' +
      (example && example.en
        ? '<button type="button" class="pdf-speak-btn" data-speak="' +
          escapeHtml(example.en) +
          '" aria-label="' +
          escapeHtml(aria) +
          '">听完整句</button>'
        : "") +
      "</div>"
    );
  }

  function buildQuizCard(verb, levelId, index, quizTargets) {
    var targets = normalizeQuizTargets(quizTargets);
    var level = LEVEL_MAP[levelId] || LEVELS[2];
    var examples = getLevelExamples(verb.id, levelId);
    var pastEx = examples && examples.past ? examples.past : null;
    var ppEx = examples && examples.pp ? examples.pp : null;
    var pastBlank = pastEx ? blankSentence(pastEx.en, verb.past) : "（例句缺失）";
    var ppBlank = ppEx
      ? blankSentence(ppEx.en, verb.id === "can" ? "been able to" : verb.pp)
      : "（例句缺失）";

    if (verb.id === "can" && ppEx && ppEx.en) {
      ppBlank = ppEx.en
        .replace(/\bbeen able to\b/gi, "______")
        .replace(/\bable to\b/gi, "______");
    }

    var body = "";
    if (targets.past) {
      body += buildQuizItem({
        label: "过去式 Past",
        blank: pastBlank,
        example: pastEx,
        aria: "朗读过去式原句（含答案）",
      });
    }
    if (targets.pp) {
      body += buildQuizItem({
        label: "过去分词 Past Participle",
        blank: ppBlank,
        example: ppEx,
        aria: "朗读过去分词原句（含答案）",
      });
    }

    return (
      '<article class="pdf-quiz-card" style="--level-color:' +
      level.color +
      '">' +
      '<header class="pdf-quiz-head">' +
      '<span class="pdf-quiz-no">' +
      String(index + 1).padStart(2, "0") +
      "</span>" +
      '<div class="pdf-quiz-title">' +
      '<strong lang="en">' +
      escapeHtml(verb.base) +
      "</strong>" +
      "<span>" +
      escapeHtml(verb.cn) +
      "</span>" +
      "</div>" +
      '<div class="pdf-verb-level">' +
      escapeHtml(quizTargetLabel(targets, "zh")) +
      "</div>" +
      "</header>" +
      '<div class="pdf-quiz-body">' +
      body +
      "</div></article>"
    );
  }

  function buildAnswerKey(verbs, levelId, quizTargets) {
    var targets = normalizeQuizTargets(quizTargets);
    var head =
      "<tr><th>#</th><th>Base</th>" +
      (targets.past ? "<th>Past</th>" : "") +
      (targets.pp ? "<th>PP</th>" : "") +
      "<th>含义</th></tr>";
    var rows = verbs
      .map(function (verb, index) {
        var pp = verb.id === "can" ? "been able to" : verb.pp;
        return (
          "<tr><td>" +
          String(index + 1).padStart(2, "0") +
          '</td><td lang="en">' +
          escapeHtml(verb.base) +
          "</td>" +
          (targets.past ? '<td lang="en">' + escapeHtml(verb.past) + "</td>" : "") +
          (targets.pp ? '<td lang="en">' + escapeHtml(pp) + "</td>" : "") +
          "<td>" +
          escapeHtml(verb.cn) +
          "</td></tr>"
        );
      })
      .join("");
    var level = LEVEL_MAP[levelId] || LEVELS[2];
    return (
      '<section class="pdf-answers" style="--level-color:' +
      level.color +
      '">' +
      "<h2>参考答案 Answer Key · " +
      escapeHtml(quizTargetLabel(targets, "zh")) +
      "</h2>" +
      "<table><thead>" +
      head +
      "</thead><tbody>" +
      rows +
      "</tbody></table></section>"
    );
  }

  function buildDocumentHtml(options) {
    var verbs = options.verbs || [];
    var levelId = options.levelId || "j1";
    var mode = options.mode || "study";
    var quizTargets = normalizeQuizTargets(options.quizTargets);
    var cards =
      mode === "quiz"
        ? verbs.map(function (verb, i) {
            return buildQuizCard(verb, levelId, i, quizTargets);
          })
        : verbs.map(function (verb, i) {
            return buildStudyCard(verb, levelId, i);
          });

    return (
      '<div class="pdf-doc" data-mode="' +
      escapeHtml(mode) +
      '" data-quiz-targets="' +
      (quizTargets.past ? "past" : "") +
      (quizTargets.past && quizTargets.pp ? "+" : "") +
      (quizTargets.pp ? "pp" : "") +
      '">' +
      buildCoverHtml(options) +
      '<div class="pdf-cards">' +
      cards.join("") +
      "</div>" +
      (mode === "quiz" ? buildAnswerKey(verbs, levelId, quizTargets) : "") +
      "</div>"
    );
  }

  function bindSpeakButtons(root, TTS, VV) {
    if (!root) return;
    root.querySelectorAll(".pdf-speak-btn").forEach(function (btn) {
      if (!btn.querySelector(".pdf-speak-icon") || btn.querySelector(".pdf-speak-icon").childNodes.length === 0) {
        var iconHost = btn.querySelector(".pdf-speak-icon");
        if (iconHost && VV) iconHost.innerHTML = VV.icon("volume");
      }
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-speak") || "";
        if (!text || !TTS) return;
        root.querySelectorAll(".pdf-speak-btn.is-playing").forEach(function (node) {
          node.classList.remove("is-playing");
        });
        btn.classList.add("is-playing");
        TTS.speak(text).then(function (ok) {
          btn.classList.remove("is-playing");
          if (!ok && VV) VV.toast("当前设备暂时无法播放语音。", { tone: "error" });
        });
      });
    });
  }

  function ensureHtml2Pdf() {
    if (global.html2pdf) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      s.onload = resolve;
      s.onerror = function () {
        reject(new Error("html2pdf 加载失败"));
      };
      document.head.appendChild(s);
    });
  }

  var PRINT_CSS =
    '*{box-sizing:border-box}body{margin:0;background:#fff;color:#0a1f3b;font-family:"Noto Sans SC","DM Sans",sans-serif}' +
    ".pdf-doc{width:794px;margin:0 auto;background:#fff}" +
    ".pdf-cover{position:relative;padding:36px 28px 30px;background:linear-gradient(145deg,#0a1f3b 0%,#18314f 52%,#102a4a 100%);color:#fff;page-break-after:always}" +
    ".pdf-cover:before{content:'';position:absolute;left:0;right:0;bottom:0;height:8px;background:var(--level-color,#155eef)}" +
    ".pdf-cover-badge{display:inline-flex;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:6px 12px;font-family:Outfit,sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}" +
    ".pdf-cover-title{margin:22px 0 8px;font-family:Outfit,sans-serif;font-size:34px;letter-spacing:-.04em;line-height:1}" +
    ".pdf-cover-sub{margin:0;color:rgba(255,255,255,.82);font-size:15px}" +
    ".pdf-cover-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:26px 0 14px}" +
    ".pdf-cover-meta-4{grid-template-columns:repeat(2,1fr)}" +
    ".pdf-cover-meta>div{border:1px solid rgba(255,255,255,.18);border-radius:14px;background:rgba(255,255,255,.08);padding:12px}" +
    ".pdf-cover-meta span{display:block;color:rgba(255,255,255,.7);font-size:11px;margin-bottom:4px}" +
    ".pdf-cover-meta strong{font-family:Outfit,sans-serif;font-size:16px}" +
    ".pdf-cover-note{margin:0;color:rgba(255,255,255,.78);font-size:13px}" +
    ".pdf-cards{padding:16px 14px 18px;display:grid;gap:12px;background:#f7f3ea}" +
    ".pdf-verb-card,.pdf-quiz-card{border:1px solid rgba(10,31,59,.12);border-radius:18px;background:#fffdf8;overflow:hidden;page-break-inside:avoid}" +
    ".pdf-verb-head,.pdf-quiz-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#fff;border-bottom:1px solid rgba(10,31,59,.08);border-left:6px solid var(--level-color,#155eef)}" +
    ".pdf-verb-index,.pdf-quiz-no{display:grid;place-items:center;width:30px;height:30px;border-radius:10px;background:var(--level-color,#155eef);color:#fff;font-family:Outfit,sans-serif;font-size:11px;font-weight:800}" +
    ".pdf-verb-title,.pdf-quiz-title{display:grid;gap:2px;flex:1}" +
    ".pdf-verb-title strong,.pdf-quiz-title strong{font-family:DM Sans,sans-serif;font-size:20px;letter-spacing:-.03em;line-height:1.1}" +
    ".pdf-verb-title span,.pdf-quiz-title span{color:#647185;font-size:12px}" +
    ".pdf-verb-level{border-radius:999px;background:var(--level-color,#155eef);color:#fff;padding:4px 10px;font-size:11px;font-weight:800}" +
    ".pdf-tense-stack{display:grid}" +
    ".pdf-tense-row{display:grid;grid-template-columns:110px 1fr;gap:10px;padding:12px 14px;border-top:1px solid rgba(10,31,59,.06)}" +
    ".pdf-tense-row:first-child{border-top:0}" +
    ".pdf-tense-form{display:grid;align-content:start;gap:4px}" +
    ".pdf-tense-label{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#647185}" +
    ".pdf-tense-form strong{font-family:DM Sans,sans-serif;font-size:15px}" +
    ".pdf-tense-base .pdf-tense-form strong{color:#155eef}" +
    ".pdf-tense-past .pdf-tense-form strong{color:#d88a17}" +
    ".pdf-tense-pp .pdf-tense-form strong{color:#7654d8}" +
    ".pdf-en{margin:0 0 4px;font-family:DM Sans,sans-serif;font-size:13px;line-height:1.45}" +
    ".pdf-cn{margin:0;color:#647185;font-size:12px}" +
    ".pdf-mark{padding:0 .15em;border-radius:.2em;font-weight:700}" +
    ".pdf-mark-base{background:#e8efff;color:#0e46bd}" +
    ".pdf-mark-past{background:#fff2dc;color:#9a5f0a}" +
    ".pdf-mark-pp{background:#eee9ff;color:#5538b8}" +
    ".pdf-quiz-body{display:grid;gap:10px;padding:12px 14px 14px}" +
    ".pdf-quiz-item{border:1px solid rgba(10,31,59,.08);border-radius:14px;background:#fff;padding:12px 14px}" +
    ".pdf-quiz-label{margin-bottom:6px;color:var(--level-color,#155eef);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}" +
    ".pdf-write-line{display:flex;align-items:flex-end;gap:8px;margin-top:10px}" +
    ".pdf-write-line span{color:#647185;font-size:12px;white-space:nowrap}" +
    ".pdf-write-line em{flex:1;border-bottom:1.5px dashed rgba(10,31,59,.28);height:18px;font-style:normal}" +
    ".pdf-answers{margin:8px 14px 18px;border:1px solid rgba(10,31,59,.1);border-radius:18px;background:#fff;padding:14px 16px;page-break-before:always}" +
    ".pdf-answers h2{margin:0 0 10px;color:var(--level-color,#155eef);font-family:Outfit,sans-serif;font-size:18px}" +
    ".pdf-answers table{width:100%;border-collapse:collapse;font-size:12px}" +
    ".pdf-answers th,.pdf-answers td{border-bottom:1px solid rgba(10,31,59,.08);padding:6px 4px;text-align:left}" +
    ".pdf-answers th{color:#647185;font-size:10px;letter-spacing:.06em;text-transform:uppercase}" +
    ".pdf-missing{padding:14px;color:#b45309}" +
    ".pdf-speak-btn{display:none!important}";

  function exportPdf(root, options) {
    options = options || {};
    return ensureHtml2Pdf().then(function () {
      var filename =
        options.filename ||
        (options.mode === "quiz"
          ? "VerbAtlas_Quiz_" + quizFilenameSuffix(options.quizTargets) + "_"
          : "VerbAtlas_Study_") +
          (options.levelId || "j1") +
          "_" +
          todayLabel() +
          ".pdf";

      var level = LEVEL_MAP[options.levelId] || LEVELS[2];
      var clone = root.cloneNode(true);
      clone.querySelectorAll(".pdf-speak-btn").forEach(function (btn) {
        btn.remove();
      });
      clone.style.setProperty("--level-color", level.color);

      var iframe = document.createElement("iframe");
      iframe.style.cssText = "position:fixed;left:-10000px;top:0;width:820px;height:1100px;border:0;opacity:0;pointer-events:none";
      document.body.appendChild(iframe);
      var doc = iframe.contentDocument;
      doc.open();
      doc.write(
        "<!DOCTYPE html><html><head><meta charset='UTF-8'/><style>" +
          PRINT_CSS +
          "</style></head><body></body></html>"
      );
      doc.close();
      doc.body.appendChild(doc.importNode(clone, true));
      var target = doc.body.firstElementChild;

      var opt = {
        margin: [8, 8, 10, 8],
        filename: filename,
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          windowWidth: 820,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      return global
        .html2pdf()
        .set(opt)
        .from(target)
        .save()
        .then(function () {
          iframe.remove();
          return true;
        })
        .catch(function (err) {
          iframe.remove();
          throw err;
        });
    });
  }

  global.IrregularVerbsPdf = {
    LEVELS: LEVELS,
    LEVEL_MAP: LEVEL_MAP,
    getLevelExamples: getLevelExamples,
    getExamplesStore: getExamplesStore,
    normalizeQuizTargets: normalizeQuizTargets,
    quizTargetLabel: quizTargetLabel,
    buildDocumentHtml: buildDocumentHtml,
    bindSpeakButtons: bindSpeakButtons,
    exportPdf: exportPdf,
    blankSentence: blankSentence,
  };
})(typeof window !== "undefined" ? window : this);
