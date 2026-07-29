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

  function buildAnswerKey(verbs, levelId, quizTargets) {
    var targets = normalizeQuizTargets(quizTargets);
    var head =
      "<tr><th>#</th><th>Base</th>" +
      (targets.past ? '<th class="th-past">Past</th>' : "") +
      (targets.pp ? '<th class="th-pp">PP</th>' : "") +
      "<th>含义</th></tr>";
    var rows = verbs
      .map(function (verb, index) {
        var pp = verb.id === "can" ? "been able to" : verb.pp;
        return (
          '<tr class="' +
          (index % 2 ? "is-alt" : "") +
          '"><td class="td-no">' +
          String(index + 1).padStart(2, "0") +
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

  var PRINT_CSS =
    '*{box-sizing:border-box}body{margin:0;background:#fff;color:#0a1f3b;font-family:"Noto Sans SC","DM Sans",sans-serif}' +
    ".pdf-doc{--base:#155eef;--past:#d88a17;--pp:#7654d8;width:794px;margin:0 auto;background:#fff}" +
    ".pdf-cover{position:relative;overflow:hidden;min-height:1040px;padding:42px 34px 36px;background:linear-gradient(145deg,#071628 0%,#0f2f55 42%,#134e4a 78%,#1d4ed8 118%);color:#fff;page-break-after:always;display:flex;flex-direction:column}" +
    ".pdf-cover-glow{position:absolute;border-radius:50%;pointer-events:none}" +
    ".pdf-cover-glow-a{top:-80px;right:-40px;width:240px;height:240px;background:rgba(56,189,248,.28)}" +
    ".pdf-cover-glow-b{bottom:-90px;left:-60px;width:260px;height:260px;background:rgba(251,191,36,.18)}" +
    ".pdf-cover-watermark{position:absolute;right:4px;bottom:28px;font-family:Outfit,sans-serif;font-size:120px;font-weight:800;letter-spacing:-.08em;line-height:.8;opacity:.08}" +
    ".pdf-cover-top{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;gap:10px}" +
    ".pdf-cover-badge,.pdf-cover-level-pill{display:inline-flex;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:6px 12px;font-family:Outfit,sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}" +
    ".pdf-cover-level-pill{background:rgba(255,255,255,.14);letter-spacing:.04em;text-transform:none}" +
    ".pdf-cover-kicker{position:relative;z-index:1;margin:48px 0 10px;color:#7dd3fc;font-family:Outfit,sans-serif;font-size:12px;font-weight:800;letter-spacing:.18em}" +
    ".pdf-cover-title{position:relative;z-index:1;margin:0 0 12px;max-width:14ch;font-family:Outfit,sans-serif;font-size:48px;letter-spacing:-.05em;line-height:.95}" +
    ".pdf-cover-sub{position:relative;z-index:1;margin:0;color:rgba(255,255,255,.86);font-size:18px}" +
    ".pdf-cover-legend{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;margin:28px 0 0}" +
    ".pdf-legend-chip{display:inline-flex;border-radius:999px;padding:5px 11px;font-size:11px;font-weight:800}" +
    ".pdf-legend-base{background:#dbeafe;color:#1d4ed8}" +
    ".pdf-legend-past{background:#fde68a;color:#92400e}" +
    ".pdf-legend-pp{background:#ddd6fe;color:#5b21b6}" +
    ".pdf-cover-meta{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:36px 0 18px}" +
    ".pdf-cover-meta-4{grid-template-columns:repeat(2,1fr)}" +
    ".pdf-meta-card{border:1px solid rgba(255,255,255,.18);border-radius:16px;background:rgba(255,255,255,.1);padding:14px}" +
    ".pdf-meta-target{background:rgba(251,191,36,.18);border-color:rgba(251,191,36,.35)}" +
    ".pdf-meta-card span{display:block;color:rgba(255,255,255,.72);font-size:11px;margin-bottom:4px;letter-spacing:.08em}" +
    ".pdf-meta-card strong{font-family:Outfit,sans-serif;font-size:16px}" +
    ".pdf-cover-note{position:relative;z-index:1;margin:0;max-width:520px;color:rgba(255,255,255,.8);font-size:14px;line-height:1.55}" +
    ".pdf-cover-footer{position:relative;z-index:1;display:flex;gap:8px;margin-top:auto;padding-top:40px}" +
    ".pdf-cover-footer span{border-radius:999px;padding:4px 10px;font-family:Outfit,sans-serif;font-size:11px;font-weight:800}" +
    ".pdf-cover-footer span:nth-child(1){background:#2563eb}" +
    ".pdf-cover-footer span:nth-child(2){background:#d97706}" +
    ".pdf-cover-footer span:nth-child(3){background:#7c3aed}" +
    ".pdf-sheet{background:linear-gradient(180deg,#f4f7ff 0%,#f7f3ea 48%,#f8f1e4 100%)}" +
    ".pdf-sheet-ribbon{display:flex;justify-content:space-between;gap:8px;padding:10px 16px;background:linear-gradient(90deg,#0f2f55,#155eef 55%,#0f766e);color:#fff;font-family:Outfit,sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em}" +
    ".pdf-cards{padding:14px 12px 18px;display:grid;gap:12px}" +
    ".pdf-verb-card,.pdf-quiz-card{border:1px solid rgba(10,31,59,.1);border-radius:20px;background:#fffdf9;overflow:hidden;page-break-inside:avoid}" +
    ".pdf-verb-head,.pdf-quiz-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(90deg,#eff6ff,#fff 55%,#fff7ed);border-bottom:1px solid rgba(10,31,59,.07)}" +
    ".pdf-verb-index,.pdf-quiz-no{display:grid;place-items:center;width:32px;height:32px;border-radius:12px;background:var(--level-color,#155eef);color:#fff;font-family:Outfit,sans-serif;font-size:11px;font-weight:800}" +
    ".pdf-verb-title,.pdf-quiz-title{display:grid;gap:2px;flex:1;min-width:0}" +
    ".pdf-verb-title strong,.pdf-quiz-title strong{font-family:Outfit,sans-serif;font-size:22px;letter-spacing:-.04em;line-height:1.05}" +
    ".pdf-verb-title span,.pdf-quiz-title span{color:#5b6b82;font-size:12px}" +
    ".pdf-orbit-mini{display:inline-flex;gap:4px;align-items:center}" +
    ".pdf-orbit-dot{width:8px;height:8px;border-radius:50%}" +
    ".pdf-orbit-base{background:#155eef}.pdf-orbit-past{background:#d88a17}.pdf-orbit-pp{background:#7654d8}" +
    ".pdf-verb-level{border-radius:999px;background:var(--level-color,#155eef);color:#fff;padding:4px 10px;font-size:11px;font-weight:800;white-space:nowrap}" +
    ".pdf-tense-stack{display:grid}" +
    ".pdf-tense-row{display:grid;grid-template-columns:118px 1fr;gap:10px;padding:12px 14px;border-top:1px solid rgba(10,31,59,.05)}" +
    ".pdf-tense-row:first-child{border-top:0}" +
    ".pdf-tense-base{background:linear-gradient(90deg,rgba(21,94,239,.08),rgba(21,94,239,.01))}" +
    ".pdf-tense-past{background:linear-gradient(90deg,rgba(216,138,23,.1),rgba(216,138,23,.015))}" +
    ".pdf-tense-pp{background:linear-gradient(90deg,rgba(118,84,216,.1),rgba(118,84,216,.015))}" +
    ".pdf-tense-form{display:grid;align-content:start;gap:5px}" +
    ".pdf-tense-label{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#5b6b82}" +
    ".pdf-form-pill{display:inline-flex;width:fit-content;max-width:100%;border-radius:999px;padding:4px 10px;font-family:DM Sans,sans-serif;font-size:14px;font-weight:800;line-height:1.2}" +
    ".pdf-tense-base .pdf-form-pill{background:#e8efff;color:#0e46bd}" +
    ".pdf-tense-past .pdf-form-pill{background:#fff1d6;color:#9a5f0a}" +
    ".pdf-tense-pp .pdf-form-pill{background:#eee9ff;color:#5538b8}" +
    ".pdf-en{margin:0 0 4px;font-family:DM Sans,sans-serif;font-size:13px;line-height:1.48}" +
    ".pdf-cn{margin:0;color:#5b6b82;font-size:12px}" +
    ".pdf-mark{padding:1px 3px;border-radius:4px;font-weight:800}" +
    ".pdf-mark-base{background:#bfdbfe;color:#1e3a8a}" +
    ".pdf-mark-past{background:#fde68a;color:#92400e}" +
    ".pdf-mark-pp{background:#ddd6fe;color:#5b21b6}" +
    ".pdf-quiz-body{display:grid;gap:10px;padding:12px 14px 14px;background:linear-gradient(180deg,#fff,#f8fafc)}" +
    ".pdf-quiz-item{border:1px solid rgba(10,31,59,.08);border-radius:16px;padding:12px 14px;border-left-width:5px}" +
    ".pdf-quiz-item-past{border-left-color:#d88a17;background:linear-gradient(180deg,#fffbeb,#fff)}" +
    ".pdf-quiz-item-pp{border-left-color:#7654d8;background:linear-gradient(180deg,#f5f3ff,#fff)}" +
    ".pdf-quiz-label{display:inline-flex;align-items:center;gap:6px;margin-bottom:6px;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}" +
    ".pdf-quiz-item-past .pdf-quiz-label{color:#b45309}" +
    ".pdf-quiz-item-pp .pdf-quiz-label{color:#6d28d9}" +
    ".pdf-quiz-tone-dot{width:8px;height:8px;border-radius:50%;background:currentColor}" +
    ".pdf-write-line{display:flex;align-items:flex-end;gap:8px;margin-top:10px;padding:6px 10px;border-radius:10px;background:rgba(255,255,255,.85);border:1px dashed rgba(10,31,59,.18)}" +
    ".pdf-write-line span{color:#5b6b82;font-size:11px;font-weight:700;white-space:nowrap}" +
    ".pdf-write-line em{flex:1;border-bottom:2px solid rgba(10,31,59,.18);height:16px;font-style:normal}" +
    ".pdf-answers{margin:4px 12px 16px;border:1px solid rgba(10,31,59,.1);border-radius:20px;background:#fff;overflow:hidden;page-break-before:always}" +
    ".pdf-answers-banner{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(90deg,#0f2f55,var(--level-color,#155eef));color:#fff}" +
    ".pdf-answers-banner h2{margin:0;font-family:Outfit,sans-serif;font-size:18px}" +
    ".pdf-answers-tag{border-radius:999px;background:rgba(255,255,255,.18);padding:4px 10px;font-size:11px;font-weight:800}" +
    ".pdf-answers-table-wrap{padding:6px 10px 12px}" +
    ".pdf-answers table{width:100%;border-collapse:collapse;font-size:12px}" +
    ".pdf-answers th,.pdf-answers td{padding:7px 5px;text-align:left;border-bottom:1px solid rgba(10,31,59,.07)}" +
    ".pdf-answers th{color:#647185;font-size:10px;letter-spacing:.08em;text-transform:uppercase}" +
    ".pdf-answers .th-past{color:#b45309}.pdf-answers .th-pp{color:#6d28d9}" +
    ".pdf-answers tr.is-alt td{background:#f8fafc}" +
    ".pdf-answers .td-no{font-family:Outfit,sans-serif;font-weight:800;color:var(--level-color,#155eef)}" +
    ".pdf-answers .td-base{font-weight:800;color:#1d4ed8}" +
    ".pdf-answers .td-past{font-weight:700;color:#b45309}" +
    ".pdf-answers .td-pp{font-weight:700;color:#6d28d9}" +
    ".pdf-answers .td-cn{color:#5b6b82}" +
    ".pdf-missing{padding:14px;color:#b45309}" +
    ".pdf-speak-btn{display:none!important}";

  function waitFrames(count) {
    return new Promise(function (resolve) {
      function step(left) {
        if (left <= 0) {
          // Give layout/fonts a beat after paint
          global.setTimeout(resolve, 80);
          return;
        }
        global.requestAnimationFrame(function () {
          step(left - 1);
        });
      }
      step(count || 2);
    });
  }

  function buildExportNode(options) {
    var level = LEVEL_MAP[options.levelId] || LEVELS[2];
    var sourceHtml =
      options.verbs && options.verbs.length
        ? buildDocumentHtml(options)
        : options.root
          ? options.root.outerHTML
          : "";
    if (!sourceHtml) throw new Error("没有可导出的内容");

    var holder = document.createElement("div");
    holder.id = "iv-pdf-export-stage";
    holder.setAttribute("aria-hidden", "true");
    // Keep in viewport (not off-screen). html2canvas often captures blank from
    // left:-9999 / iframe / opacity:0 staging nodes.
    holder.style.cssText =
      "position:fixed;left:0;top:0;width:794px;" +
      "z-index:2147483000;background:#ffffff;pointer-events:none;opacity:0.02;";

    var style = document.createElement("style");
    style.id = "iv-pdf-export-style";
    style.textContent =
      PRINT_CSS +
      "\n#iv-pdf-export-stage{width:794px;}" +
      "\n#iv-pdf-export-stage .pdf-speak-btn{display:none!important;}";

    var wrap = document.createElement("div");
    wrap.innerHTML = sourceHtml;
    var docNode = wrap.firstElementChild;
    if (!docNode) throw new Error("导出内容解析失败");
    docNode.style.setProperty("--level-color", level.color);
    docNode.style.width = "794px";
    docNode.style.margin = "0";
    docNode.style.borderRadius = "0";
    docNode.style.boxShadow = "none";
    docNode.querySelectorAll(".pdf-speak-btn").forEach(function (btn) {
      btn.remove();
    });

    holder.appendChild(style);
    holder.appendChild(docNode);
    document.body.appendChild(holder);
    return { holder: holder, target: docNode };
  }

  function teardownExportNode(holder) {
    try {
      if (holder && holder.parentNode) holder.parentNode.removeChild(holder);
    } catch (e) {}
  }

  function exportPdf(root, options) {
    options = options || {};
    if (root && !options.root) options.root = root;

    return ensureHtml2Pdf()
      .then(function () {
        var filename =
          options.filename ||
          (options.mode === "quiz"
            ? "VerbAtlas_Quiz_" + quizFilenameSuffix(options.quizTargets) + "_"
            : "VerbAtlas_Study_") +
            (options.levelId || "j1") +
            "_" +
            todayLabel() +
            ".pdf";

        var stage = buildExportNode(options);
        var holder = stage.holder;
        var target = stage.target;

        // Force layout measurement before capture
        void target.offsetHeight;

        return waitFrames(3).then(function () {
          if (!target.offsetWidth || !target.offsetHeight) {
            teardownExportNode(holder);
            throw new Error("导出节点尺寸为 0，无法生成 PDF");
          }

          var opt = {
            margin: [8, 8, 10, 8],
            filename: filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: "#ffffff",
              logging: false,
              scrollX: 0,
              scrollY: 0,
              windowWidth: 794,
              windowHeight: Math.max(target.scrollHeight, target.offsetHeight, 1123),
              onclone: function (clonedDoc) {
                var stageClone = clonedDoc.getElementById("iv-pdf-export-stage");
                if (stageClone) {
                  stageClone.style.opacity = "1";
                  stageClone.style.overflow = "visible";
                  stageClone.style.left = "0";
                  stageClone.style.top = "0";
                  stageClone.style.position = "static";
                  stageClone.style.width = "794px";
                }
              },
            },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ["css", "legacy"] },
          };

          return global
            .html2pdf()
            .set(opt)
            .from(target)
            .toPdf()
            .get("pdf")
            .then(function (pdf) {
              // Guard against all-white / empty output
              var pages = pdf.internal.getNumberOfPages();
              if (!pages) throw new Error("PDF 页数为 0");
              pdf.save(filename);
              teardownExportNode(holder);
              return { pages: pages, filename: filename };
            })
            .catch(function (err) {
              teardownExportNode(holder);
              throw err;
            });
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
