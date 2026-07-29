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

  function buildCoverHtml(options) {
    var level = LEVEL_MAP[options.levelId] || LEVELS[2];
    var modeLabel = options.mode === "quiz" ? "Past & Past Participle Quiz" : "Irregular Verb Study Sheet";
    var modeCn = options.mode === "quiz" ? "过去式 · 过去分词测试卷" : "不规则动词学习讲义";
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
      '<div class="pdf-cover-meta">' +
      "<div><span>难度</span><strong>" +
      escapeHtml(level.label) +
      "</strong></div>" +
      "<div><span>词数</span><strong>" +
      options.verbs.length +
      "</strong></div>" +
      "<div><span>日期</span><strong>" +
      todayLabel() +
      "</strong></div>" +
      "</div>" +
      '<p class="pdf-cover-note">' +
      (options.mode === "quiz"
        ? "根据例句语境填写过去式与过去分词；页末附参考答案。"
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

  function buildQuizCard(verb, levelId, index) {
    var level = LEVEL_MAP[levelId] || LEVELS[2];
    var examples = getLevelExamples(verb.id, levelId);
    var pastEx = examples && examples.past ? examples.past : null;
    var ppEx = examples && examples.pp ? examples.pp : null;
    var pastBlank = pastEx ? blankSentence(pastEx.en, verb.past) : "（例句缺失）";
    var ppTarget = verb.id === "can" ? "been able to" : verb.pp;
    var ppBlank = ppEx
      ? blankSentence(ppEx.en, verb.id === "can" ? "been able to|able to".split("|")[0] : verb.pp)
      : "（例句缺失）";

    // For can, blank "been able to" or "able to"
    if (verb.id === "can" && ppEx && ppEx.en) {
      ppBlank = ppEx.en
        .replace(/\bbeen able to\b/gi, "______")
        .replace(/\bable to\b/gi, "______");
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
      "</header>" +
      '<div class="pdf-quiz-body">' +
      '<div class="pdf-quiz-item">' +
      '<div class="pdf-quiz-label">过去式 Past</div>' +
      '<p class="pdf-en" lang="en">' +
      escapeHtml(pastBlank) +
      "</p>" +
      (pastEx && pastEx.cn ? '<p class="pdf-cn">' + escapeHtml(pastEx.cn) + "</p>" : "") +
      '<div class="pdf-write-line"><span>填写：</span><em></em></div>' +
      (pastEx && pastEx.en
        ? '<button type="button" class="pdf-speak-btn" data-speak="' +
          escapeHtml(pastEx.en) +
          '" aria-label="朗读过去式原句（含答案）">听完整句</button>'
        : "") +
      "</div>" +
      '<div class="pdf-quiz-item">' +
      '<div class="pdf-quiz-label">过去分词 Past Participle</div>' +
      '<p class="pdf-en" lang="en">' +
      escapeHtml(ppBlank) +
      "</p>" +
      (ppEx && ppEx.cn ? '<p class="pdf-cn">' + escapeHtml(ppEx.cn) + "</p>" : "") +
      '<div class="pdf-write-line"><span>填写：</span><em></em></div>' +
      (ppEx && ppEx.en
        ? '<button type="button" class="pdf-speak-btn" data-speak="' +
          escapeHtml(ppEx.en) +
          '" aria-label="朗读过去分词原句（含答案）">听完整句</button>'
        : "") +
      "</div>" +
      "</div></article>"
    );
  }

  function buildAnswerKey(verbs, levelId) {
    var rows = verbs
      .map(function (verb, index) {
        var pp = verb.id === "can" ? "been able to" : verb.pp;
        return (
          '<tr><td>' +
          String(index + 1).padStart(2, "0") +
          '</td><td lang="en">' +
          escapeHtml(verb.base) +
          '</td><td lang="en">' +
          escapeHtml(verb.past) +
          '</td><td lang="en">' +
          escapeHtml(pp) +
          "</td><td>" +
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
      "<h2>参考答案 Answer Key</h2>" +
      "<table><thead><tr><th>#</th><th>Base</th><th>Past</th><th>PP</th><th>含义</th></tr></thead><tbody>" +
      rows +
      "</tbody></table></section>"
    );
  }

  function buildDocumentHtml(options) {
    var verbs = options.verbs || [];
    var levelId = options.levelId || "j1";
    var mode = options.mode || "study";
    var cards =
      mode === "quiz"
        ? verbs.map(function (verb, i) {
            return buildQuizCard(verb, levelId, i);
          })
        : verbs.map(function (verb, i) {
            return buildStudyCard(verb, levelId, i);
          });

    return (
      '<div class="pdf-doc" data-mode="' +
      escapeHtml(mode) +
      '">' +
      buildCoverHtml(options) +
      '<div class="pdf-cards">' +
      cards.join("") +
      "</div>" +
      (mode === "quiz" ? buildAnswerKey(verbs, levelId) : "") +
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

  function exportPdf(root, options) {
    options = options || {};
    return ensureHtml2Pdf().then(function () {
      var filename =
        options.filename ||
        (options.mode === "quiz" ? "VerbAtlas_Quiz_" : "VerbAtlas_Study_") +
          (options.levelId || "j1") +
          "_" +
          todayLabel() +
          ".pdf";

      // Clone and strip interactive buttons for cleaner print
      var clone = root.cloneNode(true);
      clone.querySelectorAll(".pdf-speak-btn").forEach(function (btn) {
        btn.remove();
      });
      clone.style.width = "794px";
      clone.style.padding = "0";
      clone.style.background = "#fff";

      var holder = document.createElement("div");
      holder.style.position = "fixed";
      holder.style.left = "-10000px";
      holder.style.top = "0";
      holder.style.width = "794px";
      holder.appendChild(clone);
      document.body.appendChild(holder);

      var opt = {
        margin: [10, 10, 12, 10],
        filename: filename,
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      return global
        .html2pdf()
        .set(opt)
        .from(clone)
        .save()
        .then(function () {
          holder.remove();
          return true;
        })
        .catch(function (err) {
          holder.remove();
          throw err;
        });
    });
  }

  global.IrregularVerbsPdf = {
    LEVELS: LEVELS,
    LEVEL_MAP: LEVEL_MAP,
    getLevelExamples: getLevelExamples,
    getExamplesStore: getExamplesStore,
    buildDocumentHtml: buildDocumentHtml,
    bindSpeakButtons: bindSpeakButtons,
    exportPdf: exportPdf,
    blankSentence: blankSentence,
  };
})(typeof window !== "undefined" ? window : this);
