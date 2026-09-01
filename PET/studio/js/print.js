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

  function shell(title, bodyHtml) {
    return "<!DOCTYPE html><html lang=zh-CN><head><meta charset=utf-8><title>" +
      esc(title) + "</title><link rel=stylesheet href=\"" + esc(absUrl("css/print.css")) + "\">" +
      '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;800;900&family=Noto+Sans+SC:wght@500;700;900&display=swap" rel=stylesheet>' +
      "</head><body class=print-page>" +
      '<div class=screen-bar><div><strong>' + esc(title) + '</strong><div style="opacity:.7;font-size:12px">浏览器打印 → 另存为 PDF（建议关闭页眉页脚；配图为完整显示）</div></div>' +
      '<div><button class=btn onclick=window.print() style="background:#4f46e5;color:#fff">导出 PDF</button> ' +
      '<button class=btn onclick=window.close() style="background:#e2e8f0">关闭</button></div></div>' +
      bodyHtml + "</body></html>";
  }

  function cover(unit, kindLabel, blurb, extraImg) {
    var art = PETStudio.articleImg(unit.id);
    return '<section class="sheet cover">' +
      '<img class=hero src="' + esc(absUrl(art)) + '" alt="">' +
      '<img class=badge src="' + esc(absUrl("img/print-badge.jpg")) + '" alt="">' +
      '<div class=meta><div class=kicker>S-CLASS · PET PRACTICE</div>' +
      "<h1>Unit " + unit.id + " · " + esc(unit.title) + "</h1>" +
      "<p>" + esc(unit.subtitle) + " · " + esc(kindLabel) + "</p>" +
      "<p style='margin-top:10px'>" + esc(blurb) + "</p>" +
      "<p style='margin-top:18px;font-size:12px;color:#c7d2fe'>Printed " + today() + (extraImg ? "" : "") + "</p>" +
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
    zk: { cls: "zk", label: "中考" },
    g10: { cls: "g10", label: "高一" },
    g11: { cls: "g11", label: "高二" },
    gk: { cls: "gk", label: "高考" }
  };

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
      (it.usage
        ? '<div class="pdf-row"><span class="pdf-label">常见用法</span><span class="pdf-val">' + esc(strip(it.usage)) + "</span></div>"
        : "") +
      exampleBlocks(it) +
      "</div></article>";
  }

  function vocabCards(items) {
    return items.map(function (it, i) { return wordCard(it, i); }).join("");
  }

  function grammarExample(ex) {
    var lv = String(ex.level || "zk").toLowerCase();
    if (lv === "g10" || lv === "g11") lv = lv;
    else if (lv === "gk" || lv === "gaokao" || lv === "高考") lv = "gk";
    else lv = "zk";
    var meta = EX_BADGE[lv] || EX_BADGE.zk;
    return '<div class="pdf-section">' +
      '<span class="pdf-badge ' + meta.cls + '">' + meta.label + "</span>" +
      '<div class="pdf-en">' + esc(ex.en || ex.sentence || "") + "</div>" +
      (ex.cn || ex.trans ? '<div class="pdf-cn">' + esc(ex.cn || ex.trans) + "</div>" : "") +
      "</div>";
  }

  function exerciseBlock(ex, i) {
    var lv = String(ex.level || "zk").toLowerCase();
    var meta = lv === "gk" || lv === "gaokao" || lv === "高考" ? EX_BADGE.gk : EX_BADGE.zk;
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
      h += '<div class="opts"><div>A. True</div><div>B. False</div></div>';
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
      h += '<div class="usage"><div class="subh">详细用法</div><p>' + esc(strip(g.usage)).replace(/\n+/g, "</p><p>") + "</p></div>";
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
    var zk = (g.exercises || []).filter(function (e) {
      var lv = String(e.level || "zk").toLowerCase();
      return lv !== "gk" && lv !== "gaokao" && lv !== "高考";
    });
    var gk = (g.exercises || []).filter(function (e) {
      var lv = String(e.level || "").toLowerCase();
      return lv === "gk" || lv === "gaokao" || lv === "高考";
    });
    if (zk.length) {
      h += '<div class="subh">中考难度练习</div>';
      zk.forEach(function (e, i) { h += exerciseBlock(e, i); });
    }
    if (gk.length) {
      h += '<div class="subh">高考难度练习</div>';
      gk.forEach(function (e, i) { h += exerciseBlock(e, i); });
    }
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
    var html = cover(
      u,
      "单词 · 词组 · 语法讲义",
      "词汇/词组：音标 + 英中释义 + 中考/高一/高二三条例句，配图完整显示，不含课文原句。语法：独立讲义（详细用法、例句、中考与高考分层练习）。"
    );
    html += '<section class="sheet long"><div class="inner">' +
      '<div class="sec-h"><div class="dot" style="background:#4f46e5"></div><h2>Vocabulary 单词</h2><span>' +
      bag.vocab.length + " words · 音标保留 · 三条例句</span></div>" +
      '<p class="lead">每词 3 句：<span class="pdf-badge zk">中考</span> 初中常用 · ' +
      '<span class="pdf-badge g10">高一</span> 高中起步 · ' +
      '<span class="pdf-badge g11">高二</span> 进阶记忆。不含文章原文。</p>' +
      vocabCards(bag.vocab) +
      '<div class="foot"><span>S-Class PET</span><span>Unit ' + u.id + " · Vocab</span></div></div></section>";
    html += '<section class="sheet long"><div class="inner">' +
      '<div class="sec-h"><div class="dot" style="background:#0d9488"></div><h2>Phrases 词组</h2><span>' +
      bag.colloc.length + " phrases</span></div>" +
      '<p class="lead">词组同样保留音标（如有）、英中释义与三档例句，便于课前预习与课后复习。</p>' +
      vocabCards(bag.colloc) +
      '<div class="foot"><span>S-Class PET</span><span>Unit ' + u.id + " · Phrases</span></div></div></section>";
    html += '<section class="sheet long"><div class="inner">' +
      '<div class="sec-h"><div class="dot" style="background:#7c3aed"></div><h2>Grammar 语法讲义</h2><span>' +
      grammar.length + " points</span></div>" +
      '<p class="lead">本部分为独立语法课件：详细用法、结构公式、易错提醒、例句与分层练习。不呈现课文内容。</p>';
    grammar.forEach(function (g, i) {
      html += grammarArticle(g, i);
    });
    html += '<div class="foot"><span>S-Class PET</span><span>Unit ' + u.id + " · Grammar</span></div></div></section>";
    html += grammarAnswers(grammar);
    return html;
  }

  function renderPassage(bag) {
    var u = bag.unit;
    var html = cover(u, "文章精读讲义", "每篇文章配 3D 主题插图，便于朗读与翻译练习。");
    (bag.passages || []).forEach(function (p, idx) {
      var topic = (u.topics && u.topics[idx]) || p.title || ("Passage " + (idx + 1));
      html += '<section class=sheet>' +
        '<div class=pass-hero-wrap>' +
        '<img class=pass-hero src="' + esc(absUrl(PETStudio.passageImg(u.id, idx))) + '" alt="' + esc(topic) + '">' +
        '<div class=pass-label>Passage ' + (idx + 1) + " · " + esc(topic) + "</div></div>" +
        '<div class=inner><div class=sec-h><div class=dot style="background:#e11d48"></div><h2>' +
        esc(topic) + "</h2><span>" + (p.sentences || []).length + " sentences</span></div>";
      (p.sentences || []).forEach(function (s, i) {
        html += '<p class=sent><b style="color:#4f46e5">' + (i + 1) + ".</b> " + esc(s) + "</p>";
      });
      html += '<div class=foot><span>S-Class PET Reading</span><span>Unit ' + u.id + "</span></div></div></section>";
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
    var html = cover(u, "复习游戏纸质卷 · " + (PETStudio.LEVELS[level] || {}).label, "可印刷的分层复习题，卷末含参考答案。");
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

  function openPrint(title, html) {
    var w = window.open("", "_blank");
    if (!w) { alert("请允许弹出窗口以导出 PDF"); return; }
    w.document.write(shell(title, html));
    w.document.close();
  }

  global.PETStudio.printHandout = function (bag) {
    openPrint("PET Unit " + bag.unit.id + " 讲义", renderHandout(bag));
  };
  global.PETStudio.handoutDocument = function (bag) {
    return shell("PET Unit " + bag.unit.id + " 讲义", renderHandout(bag));
  };
  global.PETStudio.printPassage = function (bag) {
    openPrint("PET Unit " + bag.unit.id + " 文章", renderPassage(bag));
  };
  global.PETStudio.printGames = function (bag, level) {
    openPrint("PET Unit " + bag.unit.id + " 复习卷", renderGamesPaper(bag, level || "standard"));
  };
  global.PETStudio.buildPaperQs = buildPaperQs;
})(window);
