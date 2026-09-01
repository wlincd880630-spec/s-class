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
      '<div class=screen-bar><div><strong>' + esc(title) + '</strong><div style="opacity:.7;font-size:12px">浏览器打印 → 另存为 PDF（建议横向关闭页眉页脚）</div></div>' +
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

  function vocabCards(items) {
    return items.map(function (it) {
      var ex = (it.examples && it.examples[0]) || {};
      return '<article class=vcard>' +
        (it.imageUrl ? '<img src="' + esc(it.imageUrl) + '" alt="">' : "") +
        '<div class=w>' + esc(it.word) + '</div>' +
        (it.phonetic ? '<div class=ph>' + esc(it.phonetic) + "</div>" : "") +
        '<div class=cn>' + esc(it.meaning) + "</div>" +
        (ex.sentence ? '<div class=ex>' + esc(ex.sentence) + "<br>" + esc(ex.trans || "") + "</div>" : "") +
        "</article>";
    }).join("");
  }

  function renderHandout(bag) {
    var u = bag.unit;
    var html = cover(u, "单词 · 词组 · 语法讲义", "彩色卡片排版，便于课前预习与课后复习。");
    html += '<section class=sheet><div class=inner>' +
      '<div class=sec-h><div class=dot style="background:#4f46e5"></div><h2>Vocabulary 单词</h2><span>' + bag.vocab.length + " words</span></div>" +
      '<div class=cards>' + vocabCards(bag.vocab) + "</div>" +
      '<div class=foot><span>S-Class PET</span><span>Unit ' + u.id + " · Vocab</span></div></div></section>";
    html += '<section class=sheet><div class=inner>' +
      '<div class=sec-h><div class=dot style="background:#0d9488"></div><h2>Phrases 词组</h2><span>' + bag.colloc.length + " phrases</span></div>" +
      '<div class=cards>' + vocabCards(bag.colloc) + "</div>" +
      '<div class=foot><span>S-Class PET</span><span>Unit ' + u.id + " · Phrases</span></div></div></section>";
    html += '<section class=sheet><div class=inner>' +
      '<div class=sec-h><div class=dot style="background:#7c3aed"></div><h2>Grammar 语法</h2><span>' + bag.grammar.length + " points</span></div>";
    bag.grammar.forEach(function (g) {
      html += '<article class=gbox><h3>' + esc(g.title || g.word) + "</h3>" +
        (g.sourceSentence ? '<div class=ex style="margin-bottom:6px">“' + esc(g.sourceSentence) + "” " + esc(g.sourceSentenceCn) + "</div>" : "") +
        '<div class=exp>' + esc(strip(g.explanation)).slice(0, 420) + "</div>" +
        (g.tips ? '<div class=ex style="margin-top:6px;color:#6d28d9">' + esc(strip(g.tips)).slice(0, 220) + "</div>" : "") +
        "</article>";
    });
    html += '<div class=foot><span>S-Class PET</span><span>Unit ' + u.id + " · Grammar</span></div></div></section>";
    return html;
  }

  function renderPassage(bag) {
    var u = bag.unit;
    var html = cover(u, "文章精读讲义", "每篇文章配 3D 主题插图，便于朗读与翻译练习。");
    (bag.passages || []).forEach(function (p, idx) {
      html += '<section class=sheet>' +
        '<img class=pass-hero src="' + esc(absUrl(PETStudio.passageImg(u.id, idx))) + '" alt="">' +
        '<div class=inner><div class=sec-h><div class=dot style="background:#e11d48"></div><h2>' +
        esc(p.title || ("Passage " + (idx + 1))) + "</h2><span>" + (p.sentences || []).length + " sentences</span></div>";
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
      return { q: "根据释义拼写：" + it.meaning + "  (" + (it.word[0] || "") + "______)", answer: it.word };
    });
    var gaps = [];
    PETStudio.pickN(bag.colloc, Math.min(8, bag.colloc.length)).forEach(function (it) {
      var ex = (it.examples && it.examples[0]) || {};
      var sent = ex.sentence || "";
      var blank = sent;
      if (it.word && sent.toLowerCase().indexOf(it.word.toLowerCase()) !== -1) {
        blank = sent.replace(new RegExp(it.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), "________");
      } else {
        blank = "________  (" + (ex.trans || it.meaning) + ")";
      }
      gaps.push({ q: blank, answer: it.word });
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
      html += '<div class=q><span class=n>' + (i + 1) + ".</span> " + esc(q.q) + "</div>";
    });
    html += '<div class=sec-h style="margin-top:16px"><div class=dot style="background:#e11d48"></div><h2>D. 词组填空</h2></div>';
    pack.gaps.forEach(function (q, i) {
      html += '<div class=q><span class=n>' + (i + 1) + ".</span> " + esc(q.q) + "</div>";
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
          '<div class=ex>________________</div></article>';
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
  global.PETStudio.printPassage = function (bag) {
    openPrint("PET Unit " + bag.unit.id + " 文章", renderPassage(bag));
  };
  global.PETStudio.printGames = function (bag, level) {
    openPrint("PET Unit " + bag.unit.id + " 复习卷", renderGamesPaper(bag, level || "standard"));
  };
  global.PETStudio.buildPaperQs = buildPaperQs;
})(window);
