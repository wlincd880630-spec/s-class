/**
 * PET 精美讲义 / 文章 / 复习卷：新窗口排版后打印为 PDF
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function strip(html) {
    var d = document.createElement("div");
    d.innerHTML = html || "";
    return d.textContent || d.innerText || "";
  }
  function padNum(n) {
    n = String(n);
    return n.length < 2 ? "0" + n : n;
  }
  function splitEnglishSentences(text) {
    var t = String(text == null ? "" : text).replace(/\s+/g, " ").trim();
    if (!t) return [];
    var ABBR = /(?:\b(?:U\.S|U\.K|Mr|Mrs|Ms|Dr|Jr|Sr|Prof|Inc|Ltd|Co|vs|etc|Fig|No|St|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)|e\.g|i\.e)\.$/i;
    var out = [];
    var buf = "";
    var i;
    for (i = 0; i < t.length; i++) {
      var ch = t[i];
      buf += ch;
      var end = ch === "." || ch === "!" || ch === "?";
      if (!end) continue;
      if (ch === "." && t[i + 1] === ".") continue;
      if (ch === "." && /\d/.test(t[i - 1] || "") && /\d/.test(t[i + 1] || "")) continue;
      if (ch === "." && /[A-Za-z]/.test(t[i + 1] || "") && t[i + 2] === ".") continue;
      if (ABBR.test(buf.trim())) continue;
      var k = i + 1;
      while (k < t.length && /["'\u201d\u2019]/.test(t[k])) {
        buf += t[k];
        i = k;
        k++;
      }
      var j = i + 1;
      while (j < t.length && /\s/.test(t[j])) j++;
      if (j >= t.length) {
        out.push(buf.trim());
        buf = "";
        break;
      }
      if (/[A-Z0-9“"]/.test(t[j])) {
        out.push(buf.trim());
        buf = "";
      }
    }
    if (buf.trim()) out.push(buf.trim());
    return out.map(function (s) {
      return s.replace(/^["'\u201c\u201d]\s+/, "").replace(/\s+/g, " ").trim();
    }).filter(Boolean);
  }
  function normalizePassageSentences(list) {
    var joined = (list || []).map(function (s) { return String(s || "").trim(); }).filter(Boolean).join(" ");
    var split = splitEnglishSentences(joined);
    return split.length ? split : (list || []).slice();
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function absUrl(src) {
    if (!src) return "";
    if (/^https?:/i.test(src) || src.indexOf("data:") === 0) return src;
    try { return new URL(src, location.href).href; } catch (e) { return src; }
  }
  function imgOn(src) {
    return src
      ? '<img src="' + esc(absUrl(src)) + '" alt="">'
      : "";
  }

  function shell(title, bodyHtml, bodyClass) {
    return "<!DOCTYPE html><html lang=zh-CN><head><meta charset=utf-8><title>" +
      esc(title) + "</title><link rel=stylesheet href=\"" + esc(absUrl("css/print.css")) + "\">" +
      '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;800;900&family=Noto+Sans+SC:wght@500;700;900&display=swap" rel=stylesheet>' +
      "</head><body class=\"" + esc(bodyClass || "print-page") + "\">" +
      '<div class=screen-bar><div><strong>' + esc(title) + '</strong><div style="opacity:.7;font-size:12px">浏览器打印 → 另存为 PDF（建议关闭页眉页脚；配图为完整显示）</div></div>' +
      '<div><button class=btn onclick=window.print() style="background:#4f46e5;color:#fff">导出 PDF</button> ' +
      '<button class=btn onclick=window.close() style="background:#e2e8f0">关闭</button></div></div>' +
      bodyHtml + "</body></html>";
  }

  function cover(unit, kindLabel, blurb) {
    var art = PETStudio.articleImg(unit.id);
    var sub = esc(unit.subtitle || "");
    if (kindLabel) sub = sub ? sub + " · " + esc(kindLabel) : esc(kindLabel);
    return '<section class="sheet cover">' +
      '<img class=hero src="' + esc(absUrl(art)) + '" alt="">' +
      '<img class=badge src="' + esc(absUrl("img/print-badge.jpg")) + '" alt="">' +
      '<div class=meta><div class=kicker>S-CLASS · PET PRACTICE</div>' +
      "<h1>Unit " + unit.id + " · " + esc(unit.title) + "</h1>" +
      (sub ? "<p>" + sub + "</p>" : "") +
      (blurb ? "<p style='margin-top:10px'>" + esc(blurb) + "</p>" : "") +
      "<p style='margin-top:18px;font-size:12px;color:#c7d2fe'>Printed " + today() + "</p>" +
      "</div></section>";
  }

  function posOf(it) {
    if (it.kind === "phrase") return "phr.";
    var u = String(it.usage || "");
    if (/phrasal\s*verb/i.test(u)) return "phr.v.";
    if (/countable noun/i.test(u)) return "n. [C]";
    if (/uncountable noun/i.test(u)) return "n. [U]";
    if (/\bnoun\b/i.test(u)) return "n.";
    if (/\badjective\b/i.test(u)) return "adj.";
    if (/\badverb\b/i.test(u)) return "adv.";
    if (/\bverb\b/i.test(u)) return "v.";
    return "";
  }

  var EX_BADGE = {
    j1: { cls: "j1", label: "初一" },
    j2: { cls: "j2", label: "初二" },
    j3: { cls: "j3", label: "初三" },
    s1: { cls: "s1", label: "高一" },
    s2: { cls: "s2", label: "高二" },
    s3: { cls: "s3", label: "高三" },
    zk: { cls: "j3", label: "初三" },
    g10: { cls: "s1", label: "高一" },
    g11: { cls: "s2", label: "高二" },
    gk: { cls: "s3", label: "高三" }
  };
  var GRADE_LEVELS = [
    { id: "j1", label: "初一" },
    { id: "j2", label: "初二" },
    { id: "j3", label: "初三" },
    { id: "s1", label: "高一" },
    { id: "s2", label: "高二" },
    { id: "s3", label: "高三" }
  ];

  function familyHtml(it) {
    var list = it.family || [];
    if (!list.length) return "";
    var chips = list.map(function (row) {
      var posLabel = [row.posZh, row.pos].filter(Boolean).join(" ");
      return '<span class="family-chip"><b>' + esc(row.word) + "</b>" +
        "<i>" + esc(posLabel) + "</i>" + esc(row.meaning || "") + "</span>";
    }).join("");
    return '<div class="pdf-row"><span class="pdf-label">词性家族</span><span class="pdf-val family-wrap">' +
      chips + "</span></div>";
  }

  function exampleBlocks(it) {
    var list = it.handoutExamples || [];
    return list.map(function (ex) {
      var meta = EX_BADGE[ex.level] || EX_BADGE.zk;
      return '<div class="pdf-section">' +
        '<span class="pdf-badge ' + meta.cls + '">' + meta.label + "</span>" +
        '<div class="pdf-en">' + esc(ex.sentence) + "</div>" +
        (ex.trans ? '<div class="pdf-cn">' + esc(ex.trans) + "</div>" : "") +
        "</div>";
    }).join("");
  }

  function wordCard(it, i) {
    var hasPic = !!it.imageUrl;
    return '<article class="wcard' + (hasPic ? "" : " no-pic") + '">' +
      (hasPic
        ? '<div class="pic"><img src="' + esc(absUrl(it.imageUrl)) + '" alt="' + esc(it.word) + '"></div>'
        : "") +
      '<div class="wbody">' +
      '<div class="wtitle"><span class="idx">' + (i + 1) + ".</span> " +
      esc(it.word) +
      (it.phonetic ? ' <span class="ph">' + esc(it.phonetic) + "</span>" : "") +
      (posOf(it) ? ' <span class="pos">' + esc(posOf(it)) + "</span>" : "") +
      "</div>" +
      (it.definitionEn
        ? '<div class="pdf-row"><span class="pdf-label">英文释义</span><span class="pdf-val">' + esc(it.definitionEn) + "</span></div>"
        : "") +
      '<div class="pdf-row"><span class="pdf-label">中文释义</span><span class="pdf-val pdf-cn">' + esc(it.meaning) + "</span></div>" +
      (it.usageZh || it.usage
        ? '<div class="pdf-row"><span class="pdf-label">常见用法</span><span class="pdf-val">' +
          esc(it.usageZh || strip(it.usage)) + "</span></div>"
        : "") +
      familyHtml(it) +
      exampleBlocks(it) +
      "</div></article>";
  }

  function vocabCards(items) {
    return items.map(function (it, i) { return wordCard(it, i); }).join("");
  }

  function grammarExample(ex) {
    var lv = String(ex.level || "j3").toLowerCase();
    var meta = EX_BADGE[lv] || EX_BADGE.j3;
    return '<div class="pdf-section">' +
      '<span class="pdf-badge ' + meta.cls + '">' + meta.label + "</span>" +
      '<div class="pdf-en">' + esc(ex.en || ex.sentence || "") + "</div>" +
      (ex.cn || ex.trans ? '<div class="pdf-cn">' + esc(ex.cn || ex.trans) + "</div>" : "") +
      "</div>";
  }

  function exerciseBlock(ex, i) {
    var lv = String(ex.level || "j3").toLowerCase();
    var meta = EX_BADGE[lv] || EX_BADGE.j3;
    var type = String(ex.type || "choice");
    var h = '<div class="ex-q"><span class="n">' + (i + 1) + ".</span> " +
      '<span class="pdf-badge ' + meta.cls + '">' + meta.label + "</span> " +
      esc(ex.q || ex.question || "");
    if (type === "choice" && (ex.options || []).length) {
      h += '<div class="opts">';
      (ex.options || []).forEach(function (o, j) {
        h += "<div>" + String.fromCharCode(65 + j) + ". " + esc(o) + "</div>";
      });
      h += "</div>";
    } else if (type === "truefalse") {
      var tf = (ex.options && ex.options.length) ? ex.options : ["正确", "错误"];
      h += '<div class="opts">';
      tf.forEach(function (o, j) {
        h += "<div>" + String.fromCharCode(65 + j) + ". " + esc(o) + "</div>";
      });
      h += "</div>";
    } else if (type === "rewrite") {
      h += '<div class="blank">改写：________________________________</div>';
    } else if (type === "error") {
      h += '<div class="blank">改正：________________________________</div>';
    } else {
      h += '<div class="blank">______________________________</div>';
    }
    h += "</div>";
    return h;
  }

  function grammarArticle(g, idx) {
    var h = '<article class="glecture">' +
      "<h3>" + (idx + 1) + ". " + esc(g.title || g.word || "语法点") +
      (g.titleEn ? ' <small>' + esc(g.titleEn) + "</small>" : "") +
      "</h3>";
    if (g.usage) {
      var usageBody = (typeof PETUsageFormat !== "undefined" && PETUsageFormat.formatGrammarUsage)
        ? PETUsageFormat.formatGrammarUsage(strip(g.usage))
        : "<p>" + esc(strip(g.usage)).replace(/\\n/g, "\n").replace(/\n+/g, "</p><p>") + "</p>";
      h += '<div class="usage"><div class="subh">详细用法</div>' + usageBody + "</div>";
    }
    if (g.forms && g.forms.length) {
      h += '<ul class="forms">';
      g.forms.forEach(function (f) { h += "<li>" + esc(f) + "</li>"; });
      h += "</ul>";
    }
    if (g.notes && g.notes.length) {
      h += '<div class="notes"><div class="subh">易错提醒</div><ul>';
      g.notes.forEach(function (n) { h += "<li>" + esc(strip(n)) + "</li>"; });
      h += "</ul></div>";
    }
    if (g.examples && g.examples.length) {
      h += '<div class="subh">例句</div>';
      g.examples.forEach(function (ex) { h += grammarExample(ex); });
    }
    GRADE_LEVELS.forEach(function (lv) {
      var list = (g.exercises || []).filter(function (e) {
        return String(e.level || "") === lv.id;
      });
      if (!list.length) return;
      h += '<div class="subh">' + lv.label + "练习</div>";
      list.forEach(function (e, i) { h += exerciseBlock(e, i); });
    });
    h += "</article>";
    return h;
  }

  function grammarAnswers(points) {
    var html = '<section class="sheet long"><div class="inner">' +
      '<div class="sec-h"><div class="dot" style="background:#059669"></div><h2>语法练习参考答案</h2></div>';
    (points || []).forEach(function (g, gi) {
      var exs = g.exercises || [];
      if (!exs.length) return;
      html += '<div class="q ans"><b>' + (gi + 1) + ". " + esc(g.title) + "</b><div>";
      exs.forEach(function (e, i) {
        html += (i + 1) + ". " + esc(e.answer || e.correct || "") + "　";
      });
      html += "</div></div>";
    });
    html += '<div class="foot"><span>Answer Key</span><span>Grammar</span></div></div></section>';
    return html;
  }

  function renderHandout(bag) {
    var u = bag.unit;
    var grammar = bag.handoutGrammar || bag.grammar || [];
    var html = cover(u);
    html += '<section class="sheet long"><div class="inner">' +
      '<div class="sec-h"><div class="dot" style="background:#4f46e5"></div><h2>Vocabulary 单词</h2><span>' +
      bag.vocab.length + " words</span></div>" +
      vocabCards(bag.vocab) +
      '<div class="foot"><span>S-Class PET</span><span>Unit ' + u.id + " · Vocab</span></div></div></section>";
    html += '<section class="sheet long"><div class="inner">' +
      '<div class="sec-h"><div class="dot" style="background:#0d9488"></div><h2>Phrases 词组</h2><span>' +
      bag.colloc.length + " phrases</span></div>" +
      vocabCards(bag.colloc) +
      '<div class="foot"><span>S-Class PET</span><span>Unit ' + u.id + " · Phrases</span></div></div></section>";
    html += '<section class="sheet long"><div class="inner">' +
      '<div class="sec-h"><div class="dot" style="background:#7c3aed"></div><h2>Grammar 语法讲义</h2><span>' +
      grammar.length + " points</span></div>";
    grammar.forEach(function (g, i) {
      html += grammarArticle(g, i);
    });
    html += '<div class="foot"><span>S-Class PET</span><span>Unit ' + u.id + " · Grammar</span></div></div></section>";
    html += grammarAnswers(grammar);
    return html;
  }

  function passageCover(unit) {
    var art = absUrl(PETStudio.articleImg(unit.id));
    return '<section class="sheet pass-cover">' +
      '<div class="pass-cover-photo">' +
        '<div class="pass-cover-bg" style="background-image:url(\'' + esc(art) + "')\"></div>" +
        '<img src="' + esc(art) + '" alt="">' +
      "</div>" +
      '<div class="pass-cover-panel">' +
        '<div class="kicker">S-CLASS · CLOSE READING</div>' +
        "<h1>Unit " + unit.id + " · " + esc(unit.title) + "</h1>" +
        "<p>" + esc(unit.subtitle) + "</p>" +
        '<p class="pass-cover-date">Printed ' + today() + "</p>" +
      "</div></section>";
  }

  function renderPassage(bag) {
    var u = bag.unit;
    var html = passageCover(u);
    (bag.passages || []).forEach(function (p, idx) {
      var topic = (u.topics && u.topics[idx]) || p.title || ("Passage " + (idx + 1));
      var img = absUrl(PETStudio.passageImg(u.id, idx));
      var sents = normalizePassageSentences(p.sentences || []);
      html += '<section class="sheet long passage-sheet">' +
        '<div class="pass-stage">' +
          '<div class="pass-stage-bg" style="background-image:url(\'' + esc(img) + "')\"></div>" +
          '<div class="pass-stage-grad"></div>' +
          '<figure class="pass-portrait"><img src="' + esc(img) + '" alt="' + esc(topic) + '"></figure>' +
          '<header class="pass-masthead">' +
            '<div class="pass-kicker">Passage ' + padNum(idx + 1) + "</div>" +
            "<h2>" + esc(topic) + "</h2>" +
            "<span>" + sents.length + " sentences</span>" +
          "</header></div>" +
        '<div class="pass-body">';
      sents.forEach(function (s, i) {
        html += '<article class="sent-card">' +
          '<div class="sent-idx">' + padNum(i + 1) + "</div>" +
          '<div class="sent-copy"><p class="sent-en">' + esc(s) + "</p>" +
          '<div class="sent-rule" aria-hidden="true"></div></div></article>';
      });
      html += '<div class="foot"><span>S-Class PET Reading</span><span>Unit ' +
        u.id + " · P" + (idx + 1) + "</span></div></div></section>";
    });
    return html;
  }

  function mcqBlock(title, color, qs) {
    var h = '<div class=sec-h><div class=dot style="background:' + color + '"></div><h2>' + esc(title) + "</h2><span>" + qs.length + " 题</span></div>";
    qs.forEach(function (q, i) {
      h += '<div class=q><span class=n>' + (i + 1) + ".</span> " + esc(q.q) + '<div class=opts>';
      (q.options || []).forEach(function (o, j) {
        h += "<div>" + String.fromCharCode(65 + j) + ". " + esc(o) + "</div>";
      });
      h += "</div></div>";
    });
    return h;
  }

  function fillMark() {
    return "@@BLANK@@";
  }
  function fillHtml(text) {
    return esc(String(text || "")).replace(/@@BLANK@@/g, '<span class="fill-line"></span>');
  }
  function blankPhraseInSentence(sent, phrase) {
    var p = String(phrase || "").trim();
    var s = String(sent || "");
    if (!p || !s) return "";
    function escRe(x) {
      return String(x).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    var exact = new RegExp(escRe(p), "ig");
    if (exact.test(s)) return s.replace(exact, fillMark());
    var parts = p.split(/\s+/);
    if (parts.length >= 2) {
      var head = escRe(parts[0]);
      var rest = parts.slice(1).map(escRe).join("\\s+");
      var flex = new RegExp("\\b" + head + "(?:e?s|ed|ing|d)?\\s+" + rest, "ig");
      if (flex.test(s)) return s.replace(flex, fillMark());
      if (parts.length === 2) {
        var sep = new RegExp(
          "\\b" + head + "(?:e?s|ed|ing|d)?\\s+(?:it|them|him|her|this|that|me|you|us)\\s+" + escRe(parts[1]),
          "ig"
        );
        if (sep.test(s)) return s.replace(sep, fillMark());
      }
      var last = parts[parts.length - 1];
      if (parts.length >= 3 && last.length >= 4) {
        var span = new RegExp(
          "\\b" + head + "(?:e?s|ed|ing|d)?\\b[^.,;:!?]{0,32}?\\b" + escRe(last) + "\\b",
          "ig"
        );
        if (span.test(s)) return s.replace(span, fillMark());
      }
    }
    return "";
  }
  function paperLine(q, i) {
    var body = q.html || fillHtml(q.q || "");
    if (q.hint) {
      var hint = ' <span class="zh-hint">（' + esc(q.hint) + "）</span>";
      if (/fill-line/.test(body)) {
        body = body.replace(/<span class="fill-line"><\/span>/, '<span class="fill-line"></span>' + hint);
      } else {
        body += hint;
      }
    }
    return '<div class=q><span class=n>' + (i + 1) + ".</span> " + body + "</div>";
  }

  function buildPaperQs(bag, level) {
    var n = (PETStudio.LEVELS[level] || PETStudio.LEVELS.standard).count;
    var optN = (PETStudio.LEVELS[level] || PETStudio.LEVELS.standard).options;
    var vocab = PETStudio.pickN(bag.vocab, n);
    var meanings = bag.vocab.map(function (x) { return x.meaning; }).filter(Boolean);
    var words = bag.vocab.map(function (x) { return x.word; });
    var zh2en = vocab.map(function (it) {
      var opts = PETStudio.shuffle([it.word].concat(PETStudio.distractors(words, it.word, optN - 1)));
      return { q: "选出与「" + it.meaning + "」对应的单词", options: opts, answer: it.word };
    });
    var en2zh = vocab.map(function (it) {
      var opts = PETStudio.shuffle([it.meaning].concat(PETStudio.distractors(meanings, it.meaning, optN - 1)));
      return { q: it.word + (it.phonetic ? "  " + it.phonetic : ""), options: opts, answer: it.meaning };
    });
    var spells = PETStudio.pickN(bag.vocab, Math.min(8, bag.vocab.length)).map(function (it) {
      return {
        q: "根据释义拼写：" + it.meaning + "  " + (it.word[0] || "") + fillMark(),
        answer: it.word
      };
    });
    var gaps = [];
    PETStudio.pickN(bag.colloc, Math.min(8, bag.colloc.length)).forEach(function (it) {
      var phrase = it.word || it.phrase || "";
      var hint = it.meaning || "";
      var ex = {};
      (it.examples || []).forEach(function (row) {
        var src = String(row.source || "").toLowerCase();
        if (src.indexOf("zhongkao") !== -1 || src.indexOf("中考") !== -1) ex = row;
      });
      if (!ex.sentence) {
        (it.examples || []).forEach(function (row) {
          var src = String(row.source || "").toLowerCase();
          if (!ex.sentence && src.indexOf("article") === -1 && src.indexOf("文章") === -1) ex = row;
        });
      }
      var sent = String(ex.sentence || "");
      var blanked = blankPhraseInSentence(sent, phrase);
      if (!blanked) {
        var fill = (it.quizFill || []).find(function (r) {
          return r && (r.is_correct || r.isCorrect) && r.sentence && /_{2,}/.test(r.sentence);
        });
        if (fill) blanked = String(fill.sentence).replace(/_{2,}/g, fillMark());
      }
      if (!blanked) {
        if (sent && !/[\u4e00-\u9fff]/.test(sent)) {
          blanked = sent.replace(/[.?!]\s*$/, "") + " → " + fillMark();
        } else {
          blanked = fillMark();
        }
      }
      gaps.push({ q: blanked, hint: hint, answer: phrase });
    });
    var grammarQs = [];
    bag.grammar.forEach(function (g) {
      (g.quiz || []).slice(0, 2).forEach(function (qq) {
        grammarQs.push({
          q: qq.question,
          options: qq.options || [],
          answer: qq.correct,
          explain: qq.explanation || ""
        });
      });
    });
    grammarQs = PETStudio.pickN(grammarQs, Math.min(8, grammarQs.length));
    var pics = PETStudio.pickN(bag.vocab.filter(function (x) { return x.imageUrl; }), 6).map(function (it) {
      return { q: "看图写出单词", img: it.imageUrl, answer: it.word, meaning: it.meaning };
    });
    return { zh2en: zh2en, en2zh: en2zh, spells: spells, gaps: gaps, grammar: grammarQs, pics: pics };
  }

  function renderGamesPaper(bag, level) {
    var u = bag.unit;
    var pack = buildPaperQs(bag, level);
    var html = cover(u);
    html += '<section class=sheet><div class=inner>' +
      mcqBlock("A. 看义选词", "#4f46e5", pack.zh2en) +
      '<div class=foot><span>PET Review Games</span><span>A</span></div></div></section>';
    html += '<section class=sheet><div class=inner>' +
      mcqBlock("B. 看词选义", "#0d9488", pack.en2zh) +
      '<div class=foot><span>PET Review Games</span><span>B</span></div></div></section>';
    html += '<section class=sheet><div class=inner>' +
      '<div class=sec-h><div class=dot style="background:#d97706"></div><h2>C. 拼写冲刺</h2></div>';
    pack.spells.forEach(function (q, i) {
      html += paperLine(q, i);
    });
    html += '<div class=sec-h style="margin-top:16px"><div class=dot style="background:#e11d48"></div><h2>D. 词组填空</h2></div>';
    pack.gaps.forEach(function (q, i) {
      html += paperLine(q, i);
    });
    html += '<div class=foot><span>PET Review Games</span><span>C–D</span></div></div></section>';
    html += '<section class=sheet><div class=inner>' +
      mcqBlock("E. 语法诊所", "#7c3aed", pack.grammar) +
      '<div class=foot><span>PET Review Games</span><span>E</span></div></div></section>';
    if (pack.pics && pack.pics.length) {
      html += '<section class=sheet><div class=inner>' +
        '<div class=sec-h><div class=dot style="background:#0284c7"></div><h2>F. 看图写词</h2><span>' + pack.pics.length + " 题</span></div>" +
        '<div class=cards>';
      pack.pics.forEach(function (q, i) {
        html += '<article class=vcard><div class=n style="font-weight:900;color:#0284c7">' + (i + 1) + ".</div>" +
          '<img src="' + esc(q.img) + '" alt="">' +
          '<div class=ex>' + esc(q.meaning || "看图写词") + '</div>' +
          '<div class="fill-line wide"></div></article>';
      });
      html += '</div><div class=foot><span>PET Review Games</span><span>F</span></div></div></section>';
    }
    html += '<section class="sheet"><div class=inner><div class=sec-h><div class=dot style="background:#059669"></div><h2>参考答案</h2></div>';
    function ansList(name, arr) {
      html += '<div class="q ans"><b>' + name + "</b><div>";
      arr.forEach(function (q, i) { html += (i + 1) + ". " + esc(q.answer) + "　"; });
      html += "</div></div>";
    }
    ansList("A 看义选词", pack.zh2en);
    ansList("B 看词选义", pack.en2zh);
    ansList("C 拼写", pack.spells);
    ansList("D 词组", pack.gaps);
    ansList("E 语法", pack.grammar);
    if (pack.pics && pack.pics.length) ansList("F 看图写词", pack.pics);
    html += '<div class=foot><span>Answer Key</span><span>Unit ' + u.id + "</span></div></div></section>";
    return html;
  }

  function openPrint(title, html, bodyClass) {
    var w = window.open("", "_blank");
    if (!w) { alert("请允许弹出窗口以导出 PDF"); return; }
    w.document.write(shell(title, html, bodyClass));
    w.document.close();
  }

  global.PETStudio.GRADE_LEVELS = GRADE_LEVELS;
  global.PETStudio.printHandout = function (bag) {
    openPrint("PET Unit " + bag.unit.id + " 讲义", renderHandout(bag));
  };
  global.PETStudio.handoutDocument = function (bag) {
    return shell("PET Unit " + bag.unit.id + " 讲义", renderHandout(bag));
  };
  global.PETStudio.printPassage = function (bag) {
    openPrint("PET Unit " + bag.unit.id + " 文章", renderPassage(bag), "print-page passage-doc");
  };
  global.PETStudio.passageDocument = function (bag) {
    return shell("PET Unit " + bag.unit.id + " 文章", renderPassage(bag), "print-page passage-doc");
  };
  global.PETStudio.normalizePassageSentences = normalizePassageSentences;
  global.PETStudio.printGames = function (bag, level) {
    openPrint("PET Unit " + bag.unit.id + " 复习卷", renderGamesPaper(bag, level || "standard"));
  };
  global.PETStudio.buildPaperQs = buildPaperQs;
})(window);
