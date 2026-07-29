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
        ? '<div class="pdf-meta-card pdf-meta-target"><span>测试目标</span><strong>' +
          escapeHtml(quizTargetLabel(quizTargets, "zh")) +
          "</strong></div>"
        : "";
    var legend =
      options.mode === "quiz"
        ? '<div class="pdf-cover-legend">' +
          (quizTargets.past
            ? '<span class="pdf-legend-chip pdf-legend-past">Past · 过去式</span>'
            : "") +
          (quizTargets.pp
            ? '<span class="pdf-legend-chip pdf-legend-pp">PP · 过去分词</span>'
            : "") +
          "</div>"
        : '<div class="pdf-cover-legend">' +
          '<span class="pdf-legend-chip pdf-legend-base">Base · 原形</span>' +
          '<span class="pdf-legend-chip pdf-legend-past">Past · 过去式</span>' +
          '<span class="pdf-legend-chip pdf-legend-pp">PP · 过去分词</span>' +
          "</div>";

    return (
      '<section class="pdf-cover" style="--level-color:' +
      level.color +
      '">' +
      '<div class="pdf-cover-glow pdf-cover-glow-a" aria-hidden="true"></div>' +
      '<div class="pdf-cover-glow pdf-cover-glow-b" aria-hidden="true"></div>' +
      '<div class="pdf-cover-watermark" aria-hidden="true">VA</div>' +
      '<div class="pdf-cover-top">' +
      '<div class="pdf-cover-badge">Verb Atlas · S-Class</div>' +
      '<div class="pdf-cover-level-pill">' +
      escapeHtml(level.label) +
      "</div>" +
      "</div>" +
      '<p class="pdf-cover-kicker">' +
      (options.mode === "quiz" ? "PRACTICE SHEET" : "STUDY ATLAS") +
      "</p>" +
      '<h1 class="pdf-cover-title" lang="en">' +
      escapeHtml(modeLabel) +
      "</h1>" +
      '<p class="pdf-cover-sub">' +
      escapeHtml(modeCn) +
      "</p>" +
      legend +
      '<div class="pdf-cover-meta' +
      (options.mode === "quiz" ? " pdf-cover-meta-4" : "") +
      '">' +
      '<div class="pdf-meta-card"><span>难度</span><strong>' +
      escapeHtml(level.label) +
      "</strong></div>" +
      '<div class="pdf-meta-card"><span>词数</span><strong>' +
      options.verbs.length +
      "</strong></div>" +
      metaExtra +
      '<div class="pdf-meta-card"><span>日期</span><strong>' +
      todayLabel() +
      "</strong></div>" +
      "</div>" +
      '<p class="pdf-cover-note">' +
      (options.mode === "quiz"
        ? escapeHtml(quizNote)
        : "每词含原形、过去式、过去分词及对应难度例句；彩色轨道帮助记忆三态。") +
      "</p>" +
      '<div class="pdf-cover-footer" aria-hidden="true">' +
      "<span>Present</span><span>Past</span><span>Perfect</span>" +
      "</div>" +
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
          '<strong class="pdf-form-pill" lang="en">' +
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
      '<div class="pdf-orbit-mini" aria-hidden="true">' +
      '<span class="pdf-orbit-dot pdf-orbit-base"></span>' +
      '<span class="pdf-orbit-dot pdf-orbit-past"></span>' +
      '<span class="pdf-orbit-dot pdf-orbit-pp"></span>' +
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
    var tone = options.tone || "past";
    return (
      '<div class="pdf-quiz-item pdf-quiz-item-' +
      tone +
      '">' +
      '<div class="pdf-quiz-label">' +
      '<span class="pdf-quiz-tone-dot" aria-hidden="true"></span>' +
      escapeHtml(label) +
      "</div>" +
      '<p class="pdf-en" lang="en">' +
      escapeHtml(blank) +
      "</p>" +
      (example && example.cn ? '<p class="pdf-cn">' + escapeHtml(example.cn) + "</p>" : "") +
      '<div class="pdf-write-line"><span>填写</span><em></em></div>' +
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
        tone: "past",
      });
    }
    if (targets.pp) {
      body += buildQuizItem({
        label: "过去分词 Past Participle",
        blank: ppBlank,
        example: ppEx,
        aria: "朗读过去分词原句（含答案）",
        tone: "pp",
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
      (verb.ipa ? " · " + escapeHtml(verb.ipa) : "") +
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

  function buildAnswerKey(verbs, levelId, quizTargets, startIndex) {
    var targets = normalizeQuizTargets(quizTargets);
    var offset = startIndex || 0;
    var head =
      "<tr><th>#</th><th>Base</th>" +
      (targets.past ? '<th class="th-past">Past</th>' : "") +
      (targets.pp ? '<th class="th-pp">PP</th>' : "") +
      "<th>含义</th></tr>";
    var rows = verbs
      .map(function (verb, index) {
        var pp = verb.id === "can" ? "been able to" : verb.pp;
        var n = offset + index + 1;
        return (
          '<tr class="' +
          (index % 2 ? "is-alt" : "") +
          '"><td class="td-no">' +
          String(n).padStart(2, "0") +
          '</td><td lang="en" class="td-base">' +
          escapeHtml(verb.base) +
          "</td>" +
          (targets.past
            ? '<td lang="en" class="td-past">' + escapeHtml(verb.past) + "</td>"
            : "") +
          (targets.pp ? '<td lang="en" class="td-pp">' + escapeHtml(pp) + "</td>" : "") +
          '<td class="td-cn">' +
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
      '<div class="pdf-answers-banner">' +
      "<h2>参考答案 Answer Key</h2>" +
      '<span class="pdf-answers-tag">' +
      escapeHtml(quizTargetLabel(targets, "zh")) +
      "</span>" +
      "</div>" +
      '<div class="pdf-answers-table-wrap"><table><thead>' +
      head +
      "</thead><tbody>" +
      rows +
      "</tbody></table></div></section>"
    );
  }

  function buildDocumentHtml(options) {
    var verbs = options.verbs || [];
    var levelId = options.levelId || "j1";
    var mode = options.mode || "study";
    var quizTargets = normalizeQuizTargets(options.quizTargets);
    var level = LEVEL_MAP[levelId] || LEVELS[2];
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
      '" style="--level-color:' +
      level.color +
      '">' +
      buildCoverHtml(options) +
      '<div class="pdf-sheet">' +
      '<div class="pdf-sheet-ribbon" aria-hidden="true">' +
      "<span>Verb Atlas</span><span>" +
      escapeHtml(level.label) +
      "</span><span>" +
      (mode === "quiz" ? escapeHtml(quizTargetLabel(quizTargets, "zh")) : "Study Sheet") +
      "</span></div>" +
      '<div class="pdf-cards">' +
      cards.join("") +
      "</div>" +
      (mode === "quiz" ? buildAnswerKey(verbs, levelId, quizTargets) : "") +
      "</div></div>"
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

  // A4 @ 96dpi — one canvas = one PDF page. No html2pdf pagebreak slicing.
  var PAGE_W = 794;
  var PAGE_H = 1123;
  var CARD_GAP = 12;
  var ANSWER_ROWS_PER_PAGE = 24;

  var PRINT_CSS =
    '#iv-pdf-export-stage,#iv-pdf-export-stage *{box-sizing:border-box}' +
    '#iv-pdf-export-stage{color:#0a1f3b;font-family:"Noto Sans SC","DM Sans",sans-serif}' +
    "#iv-pdf-export-stage .pdf-page{--base:#155eef;--past:#d88a17;--pp:#7654d8;width:794px;height:1123px;overflow:hidden;margin:0;background:#fff}" +
    "#iv-pdf-export-stage .pdf-page-cover{background:transparent}" +
    "#iv-pdf-export-stage .pdf-cover{position:relative;overflow:hidden;height:1123px;padding:42px 34px 36px;background:linear-gradient(145deg,#071628 0%,#0f2f55 42%,#134e4a 78%,#1d4ed8 118%);color:#fff;display:flex;flex-direction:column}" +
    "#iv-pdf-export-stage .pdf-cover-glow{position:absolute;border-radius:50%;pointer-events:none}" +
    "#iv-pdf-export-stage .pdf-cover-glow-a{top:-80px;right:-40px;width:240px;height:240px;background:rgba(56,189,248,.28)}" +
    "#iv-pdf-export-stage .pdf-cover-glow-b{bottom:-90px;left:-60px;width:260px;height:260px;background:rgba(251,191,36,.18)}" +
    "#iv-pdf-export-stage .pdf-cover-watermark{position:absolute;right:4px;bottom:28px;font-family:Outfit,sans-serif;font-size:120px;font-weight:800;letter-spacing:-.08em;line-height:.8;opacity:.08}" +
    "#iv-pdf-export-stage .pdf-cover-top{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;gap:10px}" +
    "#iv-pdf-export-stage .pdf-cover-badge,#iv-pdf-export-stage .pdf-cover-level-pill{display:inline-flex;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:6px 12px;font-family:Outfit,sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}" +
    "#iv-pdf-export-stage .pdf-cover-level-pill{background:rgba(255,255,255,.14);letter-spacing:.04em;text-transform:none}" +
    "#iv-pdf-export-stage .pdf-cover-kicker{position:relative;z-index:1;margin:48px 0 10px;color:#7dd3fc;font-family:Outfit,sans-serif;font-size:12px;font-weight:800;letter-spacing:.18em}" +
    "#iv-pdf-export-stage .pdf-cover-title{position:relative;z-index:1;margin:0 0 12px;max-width:14ch;font-family:Outfit,sans-serif;font-size:48px;letter-spacing:-.05em;line-height:.95}" +
    "#iv-pdf-export-stage .pdf-cover-sub{position:relative;z-index:1;margin:0;color:rgba(255,255,255,.86);font-size:18px}" +
    "#iv-pdf-export-stage .pdf-cover-legend{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;margin:28px 0 0}" +
    "#iv-pdf-export-stage .pdf-legend-chip{display:inline-flex;border-radius:999px;padding:5px 11px;font-size:11px;font-weight:800}" +
    "#iv-pdf-export-stage .pdf-legend-base{background:#dbeafe;color:#1d4ed8}" +
    "#iv-pdf-export-stage .pdf-legend-past{background:#fde68a;color:#92400e}" +
    "#iv-pdf-export-stage .pdf-legend-pp{background:#ddd6fe;color:#5b21b6}" +
    "#iv-pdf-export-stage .pdf-cover-meta{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:36px 0 18px}" +
    "#iv-pdf-export-stage .pdf-cover-meta-4{grid-template-columns:repeat(2,1fr)}" +
    "#iv-pdf-export-stage .pdf-meta-card{border:1px solid rgba(255,255,255,.18);border-radius:16px;background:rgba(255,255,255,.1);padding:14px}" +
    "#iv-pdf-export-stage .pdf-meta-target{background:rgba(251,191,36,.18);border-color:rgba(251,191,36,.35)}" +
    "#iv-pdf-export-stage .pdf-meta-card span{display:block;color:rgba(255,255,255,.72);font-size:11px;margin-bottom:4px;letter-spacing:.08em}" +
    "#iv-pdf-export-stage .pdf-meta-card strong{font-family:Outfit,sans-serif;font-size:16px}" +
    "#iv-pdf-export-stage .pdf-cover-note{position:relative;z-index:1;margin:0;max-width:520px;color:rgba(255,255,255,.8);font-size:14px;line-height:1.55}" +
    "#iv-pdf-export-stage .pdf-cover-footer{position:relative;z-index:1;display:flex;gap:8px;margin-top:auto;padding-top:40px}" +
    "#iv-pdf-export-stage .pdf-cover-footer span{border-radius:999px;padding:4px 10px;font-family:Outfit,sans-serif;font-size:11px;font-weight:800}" +
    "#iv-pdf-export-stage .pdf-cover-footer span:nth-child(1){background:#2563eb}" +
    "#iv-pdf-export-stage .pdf-cover-footer span:nth-child(2){background:#d97706}" +
    "#iv-pdf-export-stage .pdf-cover-footer span:nth-child(3){background:#7c3aed}" +
    "#iv-pdf-export-stage .pdf-sheet{height:1123px;display:flex;flex-direction:column;background:linear-gradient(180deg,#f4f7ff 0%,#f7f3ea 48%,#f8f1e4 100%)}" +
    "#iv-pdf-export-stage .pdf-sheet-ribbon{flex:0 0 auto;display:flex;justify-content:space-between;gap:8px;padding:10px 16px;background:linear-gradient(90deg,#0f2f55,#155eef 55%,#0f766e);color:#fff;font-family:Outfit,sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em}" +
    "#iv-pdf-export-stage .pdf-cards{flex:1 1 auto;padding:14px 12px 18px;display:grid;align-content:start;gap:12px;overflow:hidden}" +
    "#iv-pdf-export-stage .pdf-verb-card,#iv-pdf-export-stage .pdf-quiz-card{border:1px solid rgba(10,31,59,.1);border-radius:20px;background:#fffdf9;overflow:hidden}" +
    "#iv-pdf-export-stage .pdf-verb-head,#iv-pdf-export-stage .pdf-quiz-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(90deg,#eff6ff,#fff 55%,#fff7ed);border-bottom:1px solid rgba(10,31,59,.07)}" +
    "#iv-pdf-export-stage .pdf-verb-index,#iv-pdf-export-stage .pdf-quiz-no{display:grid;place-items:center;width:32px;height:32px;border-radius:12px;background:var(--level-color,#155eef);color:#fff;font-family:Outfit,sans-serif;font-size:11px;font-weight:800}" +
    "#iv-pdf-export-stage .pdf-verb-title,#iv-pdf-export-stage .pdf-quiz-title{display:grid;gap:2px;flex:1;min-width:0}" +
    "#iv-pdf-export-stage .pdf-verb-title strong,#iv-pdf-export-stage .pdf-quiz-title strong{font-family:Outfit,sans-serif;font-size:22px;letter-spacing:-.04em;line-height:1.05}" +
    "#iv-pdf-export-stage .pdf-verb-title span,#iv-pdf-export-stage .pdf-quiz-title span{color:#5b6b82;font-size:12px}" +
    "#iv-pdf-export-stage .pdf-orbit-mini{display:inline-flex;gap:4px;align-items:center}" +
    "#iv-pdf-export-stage .pdf-orbit-dot{width:8px;height:8px;border-radius:50%}" +
    "#iv-pdf-export-stage .pdf-orbit-base{background:#155eef}#iv-pdf-export-stage .pdf-orbit-past{background:#d88a17}#iv-pdf-export-stage .pdf-orbit-pp{background:#7654d8}" +
    "#iv-pdf-export-stage .pdf-verb-level{border-radius:999px;background:var(--level-color,#155eef);color:#fff;padding:4px 10px;font-size:11px;font-weight:800;white-space:nowrap}" +
    "#iv-pdf-export-stage .pdf-tense-stack{display:grid}" +
    "#iv-pdf-export-stage .pdf-tense-row{display:grid;grid-template-columns:118px 1fr;gap:10px;padding:12px 14px;border-top:1px solid rgba(10,31,59,.05)}" +
    "#iv-pdf-export-stage .pdf-tense-row:first-child{border-top:0}" +
    "#iv-pdf-export-stage .pdf-tense-base{background:linear-gradient(90deg,rgba(21,94,239,.08),rgba(21,94,239,.01))}" +
    "#iv-pdf-export-stage .pdf-tense-past{background:linear-gradient(90deg,rgba(216,138,23,.1),rgba(216,138,23,.015))}" +
    "#iv-pdf-export-stage .pdf-tense-pp{background:linear-gradient(90deg,rgba(118,84,216,.1),rgba(118,84,216,.015))}" +
    "#iv-pdf-export-stage .pdf-tense-form{display:grid;align-content:start;gap:5px}" +
    "#iv-pdf-export-stage .pdf-tense-label{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#5b6b82}" +
    "#iv-pdf-export-stage .pdf-form-pill{display:inline-flex;width:fit-content;max-width:100%;border-radius:999px;padding:4px 10px;font-family:DM Sans,sans-serif;font-size:14px;font-weight:800;line-height:1.2}" +
    "#iv-pdf-export-stage .pdf-tense-base .pdf-form-pill{background:#e8efff;color:#0e46bd}" +
    "#iv-pdf-export-stage .pdf-tense-past .pdf-form-pill{background:#fff1d6;color:#9a5f0a}" +
    "#iv-pdf-export-stage .pdf-tense-pp .pdf-form-pill{background:#eee9ff;color:#5538b8}" +
    "#iv-pdf-export-stage .pdf-en{margin:0 0 4px;font-family:DM Sans,sans-serif;font-size:13px;line-height:1.48}" +
    "#iv-pdf-export-stage .pdf-cn{margin:0;color:#5b6b82;font-size:12px}" +
    "#iv-pdf-export-stage .pdf-mark{padding:1px 3px;border-radius:4px;font-weight:800}" +
    "#iv-pdf-export-stage .pdf-mark-base{background:#bfdbfe;color:#1e3a8a}" +
    "#iv-pdf-export-stage .pdf-mark-past{background:#fde68a;color:#92400e}" +
    "#iv-pdf-export-stage .pdf-mark-pp{background:#ddd6fe;color:#5b21b6}" +
    "#iv-pdf-export-stage .pdf-quiz-body{display:grid;gap:10px;padding:12px 14px 14px;background:linear-gradient(180deg,#fff,#f8fafc)}" +
    "#iv-pdf-export-stage .pdf-quiz-item{border:1px solid rgba(10,31,59,.08);border-radius:16px;padding:12px 14px;border-left-width:5px}" +
    "#iv-pdf-export-stage .pdf-quiz-item-past{border-left-color:#d88a17;background:linear-gradient(180deg,#fffbeb,#fff)}" +
    "#iv-pdf-export-stage .pdf-quiz-item-pp{border-left-color:#7654d8;background:linear-gradient(180deg,#f5f3ff,#fff)}" +
    "#iv-pdf-export-stage .pdf-quiz-label{display:inline-flex;align-items:center;gap:6px;margin-bottom:6px;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}" +
    "#iv-pdf-export-stage .pdf-quiz-item-past .pdf-quiz-label{color:#b45309}" +
    "#iv-pdf-export-stage .pdf-quiz-item-pp .pdf-quiz-label{color:#6d28d9}" +
    "#iv-pdf-export-stage .pdf-quiz-tone-dot{width:8px;height:8px;border-radius:50%;background:currentColor}" +
    "#iv-pdf-export-stage .pdf-write-line{display:flex;align-items:flex-end;gap:8px;margin-top:10px;padding:6px 10px;border-radius:10px;background:rgba(255,255,255,.85);border:1px dashed rgba(10,31,59,.18)}" +
    "#iv-pdf-export-stage .pdf-write-line span{color:#5b6b82;font-size:11px;font-weight:700;white-space:nowrap}" +
    "#iv-pdf-export-stage .pdf-write-line em{flex:1;border-bottom:2px solid rgba(10,31,59,.18);height:16px;font-style:normal}" +
    "#iv-pdf-export-stage .pdf-answers{margin:0;border:1px solid rgba(10,31,59,.1);border-radius:20px;background:#fff;overflow:hidden}" +
    "#iv-pdf-export-stage .pdf-answers-banner{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(90deg,#0f2f55,var(--level-color,#155eef));color:#fff}" +
    "#iv-pdf-export-stage .pdf-answers-banner h2{margin:0;font-family:Outfit,sans-serif;font-size:18px}" +
    "#iv-pdf-export-stage .pdf-answers-tag{border-radius:999px;background:rgba(255,255,255,.18);padding:4px 10px;font-size:11px;font-weight:800}" +
    "#iv-pdf-export-stage .pdf-answers-table-wrap{padding:6px 10px 12px}" +
    "#iv-pdf-export-stage .pdf-answers table{width:100%;border-collapse:collapse;font-size:12px}" +
    "#iv-pdf-export-stage .pdf-answers th,#iv-pdf-export-stage .pdf-answers td{padding:7px 5px;text-align:left;border-bottom:1px solid rgba(10,31,59,.07)}" +
    "#iv-pdf-export-stage .pdf-answers th{color:#647185;font-size:10px;letter-spacing:.08em;text-transform:uppercase}" +
    "#iv-pdf-export-stage .pdf-answers .th-past{color:#b45309}#iv-pdf-export-stage .pdf-answers .th-pp{color:#6d28d9}" +
    "#iv-pdf-export-stage .pdf-answers tr.is-alt td{background:#f8fafc}" +
    "#iv-pdf-export-stage .pdf-answers .td-no{font-family:Outfit,sans-serif;font-weight:800;color:var(--level-color,#155eef)}" +
    "#iv-pdf-export-stage .pdf-answers .td-base{font-weight:800;color:#1d4ed8}" +
    "#iv-pdf-export-stage .pdf-answers .td-past{font-weight:700;color:#b45309}" +
    "#iv-pdf-export-stage .pdf-answers .td-pp{font-weight:700;color:#6d28d9}" +
    "#iv-pdf-export-stage .pdf-answers .td-cn{color:#5b6b82}" +
    "#iv-pdf-export-stage .pdf-missing{padding:14px;color:#b45309}" +
    "#iv-pdf-export-stage .pdf-speak-btn{display:none!important}" +
    "#iv-pdf-measure-host{position:absolute;left:0;top:0;width:770px;visibility:hidden;pointer-events:none}";

  function waitFrames(count) {
    return new Promise(function (resolve) {
      function step(left) {
        if (left <= 0) {
          global.setTimeout(resolve, 60);
          return;
        }
        global.requestAnimationFrame(function () {
          step(left - 1);
        });
      }
      step(count || 2);
    });
  }

  function getJsPdfCtor() {
    if (global.jspdf && global.jspdf.jsPDF) return global.jspdf.jsPDF;
    if (typeof global.jsPDF === "function") return global.jsPDF;
    return null;
  }

  function ensureExportStage() {
    var holder = document.getElementById("iv-pdf-export-stage");
    if (!holder) {
      holder = document.createElement("div");
      holder.id = "iv-pdf-export-stage";
      holder.setAttribute("aria-hidden", "true");
      document.body.appendChild(holder);
    }
    // Fully opaque & in-flow for html2canvas; sit behind UI so user barely notices.
    holder.style.cssText =
      "position:fixed;left:0;top:0;width:" +
      PAGE_W +
      "px;z-index:-1;background:#ffffff;pointer-events:none;opacity:1;overflow:visible;";

    var style = document.getElementById("iv-pdf-export-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "iv-pdf-export-style";
      document.head.appendChild(style);
    }
    style.textContent = PRINT_CSS;
    return holder;
  }

  function teardownExportStage() {
    var holder = document.getElementById("iv-pdf-export-stage");
    if (holder) holder.innerHTML = "";
    var style = document.getElementById("iv-pdf-export-style");
    if (style && style.parentNode) style.parentNode.removeChild(style);
    if (holder && holder.parentNode) holder.parentNode.removeChild(holder);
  }

  function stripSpeakButtons(root) {
    if (!root) return;
    root.querySelectorAll(".pdf-speak-btn").forEach(function (btn) {
      btn.remove();
    });
  }

  function ribbonHtml(options) {
    var level = LEVEL_MAP[options.levelId] || LEVELS[2];
    var quizTargets = normalizeQuizTargets(options.quizTargets);
    var mode = options.mode || "study";
    return (
      '<div class="pdf-sheet-ribbon" aria-hidden="true">' +
      "<span>Verb Atlas</span><span>" +
      escapeHtml(level.label) +
      "</span><span>" +
      (mode === "quiz" ? escapeHtml(quizTargetLabel(quizTargets, "zh")) : "Study Sheet") +
      "</span></div>"
    );
  }

  function buildCoverPageEl(options) {
    var level = LEVEL_MAP[options.levelId] || LEVELS[2];
    var page = document.createElement("div");
    page.className = "pdf-page pdf-page-cover";
    page.style.setProperty("--level-color", level.color);
    page.innerHTML = buildCoverHtml(options);
    return page;
  }

  function buildSheetPageEl(options, cardsHtml) {
    var level = LEVEL_MAP[options.levelId] || LEVELS[2];
    var page = document.createElement("div");
    page.className = "pdf-page pdf-page-sheet";
    page.style.setProperty("--level-color", level.color);
    page.innerHTML =
      '<div class="pdf-sheet">' +
      ribbonHtml(options) +
      '<div class="pdf-cards">' +
      cardsHtml +
      "</div></div>";
    stripSpeakButtons(page);
    return page;
  }

  function buildAnswerPageEl(options, verbsChunk, startIndex) {
    var level = LEVEL_MAP[options.levelId] || LEVELS[2];
    var page = document.createElement("div");
    page.className = "pdf-page pdf-page-sheet";
    page.style.setProperty("--level-color", level.color);
    page.innerHTML =
      '<div class="pdf-sheet">' +
      ribbonHtml(options) +
      '<div class="pdf-cards">' +
      buildAnswerKey(verbsChunk, options.levelId, options.quizTargets, startIndex) +
      "</div></div>";
    return page;
  }

  function measureCardHeights(cardHtmlList, holder) {
    var host = document.createElement("div");
    host.id = "iv-pdf-measure-host";
    host.className = "pdf-cards";
    host.style.cssText =
      "position:absolute;left:0;top:0;width:770px;padding:0;display:grid;gap:0;visibility:hidden;";
    holder.appendChild(host);

    var heights = cardHtmlList.map(function (html) {
      host.innerHTML = html;
      stripSpeakButtons(host);
      var el = host.firstElementChild;
      return el ? el.offsetHeight : 200;
    });

    holder.removeChild(host);
    return heights;
  }

  function packByHeight(cardHtmlList, heights, maxHeight) {
    var pages = [];
    var bucket = [];
    var used = 0;
    cardHtmlList.forEach(function (html, i) {
      var h = heights[i] || 200;
      var need = bucket.length ? CARD_GAP + h : h;
      if (bucket.length && used + need > maxHeight) {
        pages.push(bucket);
        bucket = [];
        used = 0;
        need = h;
      }
      // Oversized single card: still place alone (may clip slightly)
      bucket.push(html);
      used += need;
    });
    if (bucket.length) pages.push(bucket);
    return pages;
  }

  function buildExportPages(options) {
    var verbs = options.verbs || [];
    var levelId = options.levelId || "j1";
    var mode = options.mode || "study";
    var quizTargets = normalizeQuizTargets(options.quizTargets);
    var holder = ensureExportStage();
    holder.innerHTML = "";

    var pages = [];
    pages.push(buildCoverPageEl(options));

    var cardHtmlList =
      mode === "quiz"
        ? verbs.map(function (verb, i) {
            return buildQuizCard(verb, levelId, i, quizTargets);
          })
        : verbs.map(function (verb, i) {
            return buildStudyCard(verb, levelId, i);
          });

    // Usable height under ribbon + padding (~34 + 14*2)
    var maxContent = PAGE_H - 34 - 28 - 8;
    var heights = measureCardHeights(cardHtmlList, holder);
    var packed = packByHeight(cardHtmlList, heights, maxContent);
    packed.forEach(function (group) {
      pages.push(buildSheetPageEl(options, group.join("")));
    });

    if (mode === "quiz" && verbs.length) {
      for (var i = 0; i < verbs.length; i += ANSWER_ROWS_PER_PAGE) {
        var chunk = verbs.slice(i, i + ANSWER_ROWS_PER_PAGE);
        pages.push(buildAnswerPageEl(options, chunk, i));
      }
    }

    return pages;
  }

  function canvasLooksBlank(canvas) {
    try {
      var ctx = canvas.getContext("2d");
      var w = canvas.width;
      var h = canvas.height;
      if (!w || !h) return true;
      // Sample a grid of pixels; mostly white/transparent => blank
      var stepX = Math.max(1, Math.floor(w / 12));
      var stepY = Math.max(1, Math.floor(h / 16));
      var colored = 0;
      var samples = 0;
      for (var y = stepY; y < h; y += stepY) {
        for (var x = stepX; x < w; x += stepX) {
          var d = ctx.getImageData(x, y, 1, 1).data;
          samples++;
          if (d[3] < 8) continue;
          if (d[0] < 250 || d[1] < 250 || d[2] < 250) colored++;
        }
      }
      return colored < Math.max(3, samples * 0.02);
    } catch (e) {
      return false;
    }
  }

  function capturePage(pageEl) {
    var h2c = global.html2canvas;
    if (!h2c) return Promise.reject(new Error("html2canvas 不可用"));
    return h2c(pageEl, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: PAGE_W,
      height: PAGE_H,
      windowWidth: PAGE_W,
      windowHeight: PAGE_H,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
    });
  }

  function exportPdf(root, options) {
    options = options || {};
    if (root && !options.root) options.root = root;

    if (!(options.verbs && options.verbs.length)) {
      return Promise.reject(new Error("没有可导出的词汇"));
    }

    return ensureHtml2Pdf()
      .then(function () {
        var JsPDF = getJsPdfCtor();
        if (!JsPDF) throw new Error("jsPDF 不可用");
        if (!global.html2canvas) throw new Error("html2canvas 不可用");

        var filename =
          options.filename ||
          (options.mode === "quiz"
            ? "VerbAtlas_Quiz_" + quizFilenameSuffix(options.quizTargets) + "_"
            : "VerbAtlas_Study_") +
            (options.levelId || "j1") +
            "_" +
            todayLabel() +
            ".pdf";

        var holder = ensureExportStage();
        var pageEls = buildExportPages(options);
        var pdf = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

        var chain = Promise.resolve();
        pageEls.forEach(function (pageEl, index) {
          chain = chain.then(function () {
            holder.innerHTML = "";
            holder.appendChild(pageEl);
            void pageEl.offsetHeight;
            return waitFrames(2).then(function () {
              return capturePage(pageEl).then(function (canvas) {
                if (canvasLooksBlank(canvas)) {
                  throw new Error("第 " + (index + 1) + " 页渲染为空白，请刷新后重试");
                }
                var img = canvas.toDataURL("image/jpeg", 0.93);
                if (index > 0) pdf.addPage();
                pdf.addImage(img, "JPEG", 0, 0, 210, 297);
              });
            });
          });
        });

        return chain
          .then(function () {
            var pages = pdf.internal.getNumberOfPages();
            if (!pages) throw new Error("PDF 页数为 0");
            pdf.save(filename);
            teardownExportStage();
            return { pages: pages, filename: filename };
          })
          .catch(function (err) {
            teardownExportStage();
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
