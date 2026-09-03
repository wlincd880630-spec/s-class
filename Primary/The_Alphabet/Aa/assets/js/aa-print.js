/**
 * Aa 教具工坊：生成 A4 作业包 / 练习册 / 纸质游戏 / 四线格 / 教具卡。
 * 导出使用浏览器「打印 → 另存为 PDF」，保留彩印与手写体。
 */
(function (global) {
  "use strict";

  var L = window.AA_LESSON;
  var PACKS = ["book", "workbook", "games", "copy", "cards", "guide"];

  function $(id) {
    return document.getElementById(id);
  }
  function w(id) {
    return L.words[id];
  }
  function fsClass(text) {
    var n = String(text).replace(/\s/g, "").length;
    if (n <= 3) return "fs-lg";
    if (n <= 5) return "fs-md";
    if (n <= 8) return "fs-sm";
    return "fs-xs";
  }
  function onsetHTML(item) {
    if (!item) return "";
    if (item.id === "Aa" || item.kind === "letter") {
      return '<span class="letter-pair"><span class="letter-cap onset">A</span><span class="letter-small rest">a</span></span>';
    }
    if (item.id === "angry-apple") {
      return '<span class="onset">a</span>ngry <span class="onset">a</span>pple';
    }
    return '<span class="onset">' + item.onset + '</span><span class="rest">' + item.rest + "</span>";
  }
  function staveHTML(item) {
    if (!item) return "";
    if (item.id === "Aa" || item.kind === "letter") {
      return '<span class="letter-pair"><span class="letter-cap onset">A</span><span class="letter-small rest">a</span></span>';
    }
    if (item.id === "angry-apple") {
      return (
        '<span class="letter-pair">' +
        '<span class="letter-small onset">a</span><span class="letter-small rest">ngry</span> ' +
        '<span class="letter-small onset">a</span><span class="letter-small rest">pple</span>' +
        "</span>"
      );
    }
    return (
      '<span class="letter-pair">' +
      '<span class="letter-small onset">' + item.onset + "</span>" +
      '<span class="letter-small rest">' + item.rest + "</span>" +
      "</span>"
    );
  }
  function stave(html, mode, fs, tag) {
    return (
      '<div class="stave-line">' +
      (tag ? '<span class="stave-tag">' + tag + "</span>" : "") +
      '<div class="grid-lines"><i class="gl gl-sky"></i><i class="gl gl-cloud"></i><i class="gl gl-grass"></i><i class="gl gl-dirt"></i></div>' +
      (mode === "trace"
        ? '<div class="trace-word ' + (fs || "fs-md") + '">' + html + "</div>" +
          '<canvas class="stave-ghost-cv" aria-hidden="true"></canvas>'
        : "") +
      "</div>"
    );
  }
  function modelCard(letter, kind, title, hint) {
    var cls = kind === "small" ? "letter-small" : "letter-cap";
    var head = "";
    if (title) head += '<div class="model-title">' + title + "</div>";
    if (hint) head += '<p class="model-hint">' + hint + "</p>";
    return (
      '<div class="model-card">' +
      head +
      '<div class="stave-line model-stave">' +
      '<div class="grid-lines"><i class="gl gl-sky"></i><i class="gl gl-cloud"></i><i class="gl gl-grass"></i><i class="gl gl-dirt"></i></div>' +
      '<div class="trace-word center">' +
      '<span class="' + cls + '">' + letter + "</span>" +
      '<span class="' + cls + '">' + letter + "</span>" +
      '<span class="' + cls + '">' + letter + "</span>" +
      "</div>" +
      '<canvas class="stave-ghost-cv" aria-hidden="true"></canvas>' +
      "</div></div>"
    );
  }
  function bookHead(kicker, title) {
    return (
      '<header class="bk-head">' +
      '<p class="bk-kicker">' + kicker + "</p>" +
      (title ? '<h1 class="bk-title">' + title + "</h1>" : "") +
      "</header>"
    );
  }
  function bookFoot(page, total) {
    return (
      '<div class="bk-foot">' +
      "<span>S-Class  ·  The Alphabet  ·  Aa</span>" +
      "<span>" + page + "  /  " + total + "</span>" +
      "</div>"
    );
  }
  function bookSheet(extra, inner) {
    return frame('<article class="sheet book-sheet ' + (extra || "") + '">' + inner + "</article>");
  }
  function header(kicker, title, badge) {
    return (
      '<div class="rainbow-bar"></div>' +
      '<div class="sh-head">' +
      "<div><p class=\"sh-kicker\">" + kicker + "</p><h1 class=\"sh-title\">" + title + "</h1></div>" +
      (badge ? '<div class="sh-badge">' + badge + "</div>" : "") +
      "</div>"
    );
  }
  function nameRow() {
    return (
      '<div class="name-row">' +
      "<span>Name <i></i></span><span>Class <i></i></span><span>Date <i></i></span>" +
      "</div>"
    );
  }
  function foot(page, total, pack) {
    return '<div class="foot"><span>S-Class · Aa · ' + pack + "</span><span>" + page + " / " + total + "</span></div>";
  }
  function frame(inner) {
    return '<div class="sheet-frame">' + inner + "</div>";
  }
  function sheet(theme, inner) {
    return frame('<article class="sheet ' + (theme || "") + '">' + inner + "</article>");
  }
  function task(n, text, color) {
    return '<div class="task ' + (color || "") + '"><span class="n">' + n + "</span><p>" + text + "</p></div>";
  }
  function tile(item, i, withWord) {
    return (
      '<div class="pic-tile t' + (i % 6) + '">' +
      '<img src="' + item.img + '" alt="' + item.en + '">' +
      (withWord !== false ? '<div class="lab">' + onsetHTML(item) + "</div>" : "") +
      "</div>"
    );
  }

  function copyCatalog() {
    return [
      { id: "Aa", en: "Aa", zh: "字母 Aa", img: L.hero, kind: "letter", a: true },
      w("apple"),
      w("axe"),
      w("ant"),
      w("alligator"),
      w("angry-apple")
    ];
  }

  function buildBook() {
    var pages = [];
    var total = 6;
    pages.push(bookSheet("book-cover",
      '<p class="bk-brand">The Alphabet</p>' +
      '<p class="bk-unit">Unit 1</p>' +
      '<p class="bk-display">Aa</p>' +
      '<p class="bk-phrase">angry apple</p>' +
      '<p class="bk-ipa">/æ/</p>' +
      '<figure class="bk-hero"><img src="' + L.mascot.img + '" alt="angry apple"></figure>' +
      '<p class="bk-words">apple  ·  axe  ·  ant  ·  alligator</p>' +
      nameRow() +
      bookFoot(1, total)
    ));
    pages.push(bookSheet("",
      bookHead("A  ·  Listen and say", "Angry apple") +
      '<div class="bk-split">' +
        '<figure class="bk-plate"><img src="' + L.mascot.img + '" alt="angry apple"></figure>' +
        '<div class="bk-letter">' +
          '<span class="pair">Aa</span>' +
          '<span class="ipa">/æ/</span>' +
        "</div>" +
      "</div>" +
      stave(staveHTML({ kind: "letter", id: "Aa" }), "trace", "fs-lg", "Trace") +
      stave("", "write", "fs-lg", "Write") +
      bookFoot(2, total)
    ));
    pages.push(bookSheet("",
      bookHead("B  ·  Listen, point and say", "Four friends") +
      '<div class="vocab-4 bk-vocab">' +
        L.vocab.map(function (item, i) { return tile(item, i, true); }).join("") +
      "</div>" +
      bookFoot(3, total)
    ));
    pages.push(bookSheet("",
      bookHead("C  ·  Trace and write", "Aa") +
      '<div class="letter-models">' +
        modelCard("A", "cap") +
        modelCard("a", "small") +
      "</div>" +
      stave('<span class="letter-pair"><span class="letter-cap onset">A</span></span>', "trace", "fs-lg", "Trace") +
      stave('<span class="letter-pair"><span class="letter-cap onset">A</span></span>', "trace", "fs-lg", "Trace") +
      stave("", "write", "fs-lg", "Write") +
      stave('<span class="letter-pair"><span class="letter-small onset">a</span></span>', "trace", "fs-lg", "Trace") +
      stave('<span class="letter-pair"><span class="letter-small onset">a</span></span>', "trace", "fs-lg", "Trace") +
      stave("", "write", "fs-lg", "Write") +
      bookFoot(4, total)
    ));
    pages.push(bookSheet("",
      bookHead("D  ·  Listen and write", "Aa or X") +
      '<div class="six-grid bk-vocab">' +
        L.track05Items.map(function (row, i) {
          var item = w(row.id);
          return (
            '<div class="pic-tile t' + (i % 6) + '">' +
            '<img src="' + item.img + '" alt="' + item.en + '">' +
            '<div class="write-box">Aa / X</div>' +
            "</div>"
          );
        }).join("") +
      "</div>" +
      bookFoot(5, total)
    ));
    pages.push(bookSheet("",
      bookHead("E  ·  Listen and chant", "Chant") +
      '<div class="vocab-4 bk-vocab">' +
        L.chantOrder.map(function (id, i) {
          var item = w(id);
          return (
            '<div class="pic-tile t' + i + '">' +
            '<img src="' + item.img + '" alt="">' +
            '<div class="lab">' + onsetHTML(item) + "</div>" +
            '<div class="num-box"></div>' +
            "</div>"
          );
        }).join("") +
      "</div>" +
      bookFoot(6, total)
    ));
    return pages.join("");
  }

  function buildWorkbook() {
    var pages = [];
    var total = 4;
    var letters = L.workbookLetters;
    pages.push(sheet("theme-candy",
      header("Workbook · Unit 1", "Aa 练习册（新彩页）", "不是原版复印件") +
      nameRow() +
      '<div class="hero-row">' +
        '<img src="' + L.hero + '" alt="Aa">' +
        '<div class="bubble">圈出 /æ/ 开头的图<br>给 A a 涂色<br>四线格里写 Aa</div>' +
      "</div>" +
      '<p style="text-align:center;font-size:16pt;">本练习册重新排版：野餐圈图 · 气球涂色 · 手写四线格。<br>请用蜡笔、彩铅完成，写字请用铅笔。</p>' +
      foot(1, total, "练习册")
    ));
    pages.push(sheet("theme-sky",
      header("A · Trace, write, and say", "描红大 A 和小 a", "四线格") +
      task("A", "沿四线格里的浅色手写体描，再自己写。") +
      '<div class="letter-models">' +
        modelCard("A", "cap") +
        modelCard("a", "small") +
      "</div>" +
      stave('<span class="letter-pair"><span class="letter-cap onset">A</span></span>', "trace", "fs-lg", "描") +
      stave('<span class="letter-pair"><span class="letter-cap onset">A</span></span>', "trace", "fs-lg", "描") +
      stave("", "write", "fs-lg", "写") +
      stave('<span class="letter-pair"><span class="letter-small onset">a</span></span>', "trace", "fs-lg", "描") +
      stave('<span class="letter-pair"><span class="letter-small onset">a</span></span>', "trace", "fs-lg", "描") +
      stave("", "write", "fs-lg", "写") +
      foot(2, total, "练习册")
    ));
    pages.push(sheet("theme-leaf",
      header("B · Circle the a sound", "野餐布上圈一圈", "/æ/") +
      task("B", "圈出开头音是 /æ/ 的图。第一张 apple 已示范圈好。banana、computer 不要圈。", "leaf") +
      '<div class="circle-grid">' +
        L.workbookCircle.map(function (id, i) {
          var item = w(id);
          var sample = id === L.workbookCircleExample;
          return (
            '<div class="pic-tile t' + (i % 6) + ' circ-wrap">' +
            (sample ? '<span class="ring sample"></span>' : "") +
            '<img src="' + item.img + '" alt="' + item.en + '">' +
            '<div class="lab">' + item.en + "</div>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      foot(3, total, "练习册")
    ));
    pages.push(sheet("",
      header("C · Color A and a", "给字母气球涂色", "再写 Aa") +
      task("C", "只给大写 A 和小写 a 的气球涂上喜欢的颜色。B b C c 不要涂。然后在四线格写 Aa。", "sun") +
      '<div class="balloon-board">' +
        letters.map(function (ch) {
          return '<div class="balloon">' + ch + "</div>";
        }).join("") +
      "</div>" +
      stave(staveHTML({ kind: "letter", id: "Aa" }), "trace", "fs-lg", "描") +
      stave(staveHTML({ kind: "letter", id: "Aa" }), "trace", "fs-lg", "描") +
      stave("", "write", "fs-lg", "写") +
      foot(4, total, "练习册")
    ));
    return pages.join("");
  }

  function buildGames() {
    var pages = [];
    var total = 8;
    pages.push(sheet("theme-candy",
      header("Paper games · Aa", "六个复习游戏 · 纸上也能玩", "课堂 / 回家") +
      nameRow() +
      '<ul class="howto">' +
        "<li><b>① 开头音小侦探</b> 蜡笔圈出 /æ/ 开头的图。</li>" +
        "<li><b>② 听一听点一点</b> 老师读词，学生在图旁写 1–4。</li>" +
        "<li><b>③ 谁是局外人</b> 每一行打叉不是 /æ/ 的那张。</li>" +
        "<li><b>④ 图词连线 + 剪卡配对</b> 先连线，再剪开做实物配对。</li>" +
        "<li><b>⑤ 写 Aa 还是打叉</b> 老师读（或放 Track 05），学生写。</li>" +
        "<li><b>⑥ Chant 排队</b> 剪下四张图，按歌曲顺序排好。</li>" +
      "</ul>" +
      foot(1, total, "游戏")
    ));
    pages.push(sheet("theme-leaf",
      header("Game 1 · Beginning sound", "开头音小侦探", "圈一圈") +
      task("1", "用红蜡笔圈出开头音是 /æ/ 的图。不是 /æ/ 的请不要圈。") +
      '<div class="circle-grid">' +
        L.soundHunt.map(function (id, i) {
          var item = w(id);
          return (
            '<div class="pic-tile t' + (i % 6) + '">' +
            '<img src="' + item.img + '" alt="' + item.en + '" style="height:28mm">' +
            '<div class="lab">' + item.en + "</div>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      foot(2, total, "游戏")
    ));
    pages.push(sheet("theme-sky",
      header("Game 2 · Listen and number", "听一听，写序号", "老师读") +
      task("2", "老师按任意顺序读四个单词（或放 Track 04）。学生在格子里写 1、2、3、4。", "sky") +
      '<div class="vocab-4">' +
        L.vocab.map(function (item, i) {
          return (
            '<div class="pic-tile t' + i + '">' +
            '<img src="' + item.img + '" alt="">' +
            '<div class="num-box" style="width:14mm;height:14mm;font-size:16pt;"></div>' +
            "</div>"
          );
        }).join("") +
      "</div>" +
      '<p style="font-size:14pt;margin-top:6mm;">不会写数字的小朋友，可以按听到的顺序在图上点点、画星星。</p>' +
      foot(3, total, "游戏")
    ));
    pages.push(sheet("",
      header("Game 3 · Odd one out", "谁是局外人", "打叉") +
      task("3", "每一行有三张图。把不是 /æ/ 开头的那一张打 X。", "sun") +
      L.oddOneOutPrint.map(function (row, r) {
        return (
          '<div class="odd-row">' +
          '<div class="n">' + (r + 1) + "</div>" +
          row.map(function (id, i) {
            var item = w(id);
            return '<div class="tile t' + i + '"><img src="' + item.img + '" alt=""><div class="lab">' + item.en + "</div></div>";
          }).join("") +
          "</div>"
        );
      }).join("") +
      foot(4, total, "游戏")
    ));
    pages.push(sheet("theme-candy",
      header("Game 4 · Match", "图片和单词手拉手", "连线") +
      task("4", "从左边的图拉线到右边的单词。做完后可以沿虚线剪开，变成配对卡。") +
      '<div class="match-cols">' +
        '<div class="match-col">' +
          L.vocab.map(function (item, i) {
            return '<div class="row"><b>' + (i + 1) + '</b><img src="' + item.img + '" alt=""></div>';
          }).join("") +
        "</div>" +
        '<div class="match-mid"></div>' +
        '<div class="match-col">' +
          [L.vocab[2], L.vocab[0], L.vocab[3], L.vocab[1]].map(function (item) {
            return '<div class="row word-chip">' + onsetHTML(item) + "</div>";
          }).join("") +
        "</div>" +
      "</div>" +
      foot(5, total, "游戏")
    ));
    pages.push(sheet("",
      header("Game 4 · Cut and pair", "剪下来做翻牌 / 配对", "教具") +
      task("4b", "沿虚线剪开。一组图、一组词。可玩记忆翻牌、找朋友、绕教室贴配对。") +
      '<div class="cut-grid">' +
        L.vocab.map(function (item) {
          return '<div class="cut-card"><img src="' + item.img + '" alt="" style="height:58mm"><div class="lab">' + item.en + "</div></div>";
        }).join("") +
      "</div>" +
      foot(6, total, "游戏")
    ));
    pages.push(sheet("theme-sky",
      header("Game 5 · Aa or X", "听音写 Aa 或打叉", "Track 05") +
      task("5", "老师放 Track 05 或读图名。是 /æ/ 就写 Aa，不是就打 X。", "sky") +
      '<div class="six-grid">' +
        L.track05Items.map(function (row, i) {
          var item = w(row.id);
          return (
            '<div class="pic-tile t' + (i % 6) + '">' +
            '<img src="' + item.img + '" alt="" style="height:32mm">' +
            '<div class="write-box">Aa / X</div>' +
            "</div>"
          );
        }).join("") +
      "</div>" +
      foot(7, total, "游戏")
    ));
    pages.push(sheet("theme-leaf",
      header("Game 6 · Chant line-up", "Chant 排队", "Track 06") +
      task("6", "剪下四张图。边唱 chant 边排队：ant, apple, alligator, axe。", "leaf") +
      '<div class="cut-grid">' +
        L.chantOrder.map(function (id, i) {
          var item = w(id);
          return (
            '<div class="cut-card">' +
            '<div style="font-size:14pt;color:#00897b;">cut · ' + (i + 1) + "</div>" +
            '<img src="' + item.img + '" alt="" style="height:58mm">' +
            '<div class="lab">' + onsetHTML(item) + "</div>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      foot(8, total, "游戏")
    ));
    return pages.join("");
  }

  function foldCard(item) {
    return (
      '<div class="fold-card">' +
      '<div class="fold-tag">对折 · 正面图 · 背面词</div>' +
      '<div class="fold-mid"></div>' +
      '<div class="fold-pic"><img src="' + item.img + '" alt="' + item.en + '"></div>' +
      '<div class="fold-word"><div class="en">' + onsetHTML(item) + '</div><div class="zh">' + item.zh + "</div>" +
      (item.a ? '<div class="ipa">/æ/</div>' : "") +
      "</div></div>"
    );
  }

  function buildCards() {
    var pages = [];
    var total = 12;
    pages.push(sheet("theme-poster-a",
      '<div class="letter-poster"><div class="giant">A</div><div class="sub">the letter A · /æ/</div>' +
      '<img src="' + L.mascot.img + '" alt="angry apple"></div>' +
      foot(1, total, "字母卡")
    ));
    pages.push(sheet("theme-poster-s",
      '<div class="letter-poster"><div class="giant">a</div><div class="sub">little a · /æ/</div>' +
      '<img src="' + w("apple").img + '" alt="apple"></div>' +
      foot(2, total, "字母卡")
    ));
    pages.push(sheet("theme-poster",
      '<div class="letter-poster"><div class="giant">Aa</div><div class="sub">angry apple · beginning sound /æ/</div>' +
      '<img src="' + L.hero + '" alt="Aa"></div>' +
      foot(3, total, "字母卡")
    ));
    pages.push(sheet("",
      header("Fold cards 1–2", "对折闪卡 · 图背对词", "剪开对折") +
      '<div class="fold-page" style="height:236mm">' + foldCard(w("apple")) + foldCard(w("axe")) + "</div>" +
      foot(4, total, "对折卡")
    ));
    pages.push(sheet("",
      header("Fold cards 3–4", "对折闪卡 · 图背对词", "剪开对折") +
      '<div class="fold-page" style="height:236mm">' + foldCard(w("ant")) + foldCard(w("alligator")) + "</div>" +
      foot(5, total, "对折卡")
    ));
    pages.push(sheet("",
      header("Picture cards", "纯图片卡 · 背面可手写单词", "剪开") +
      '<p class="task" style="margin-bottom:2mm;">正面只有图。剪开后背面自己写 apple… 或与单词卡配对。</p>' +
      '<div class="cut-grid">' +
        L.vocab.map(function (item) {
          return '<div class="cut-card"><img src="' + item.img + '" alt=""><div style="font-size:12pt;color:#90a4ae;">picture only</div></div>';
        }).join("") +
      "</div>" +
      foot(6, total, "图片卡")
    ));
    pages.push(sheet("",
      header("Word cards", "纯单词卡 · 图词配对用", "剪开") +
      '<div class="cut-grid">' +
        L.vocab.map(function (item) {
          return '<div class="cut-card word-only"><div class="lab">' + onsetHTML(item) + '</div><div class="zh">' + item.zh + "</div></div>";
        }).join("") +
      "</div>" +
      foot(7, total, "单词卡")
    ));
    pages.push(sheet("theme-leaf",
      header("Mini pictures", "口袋小图卡 ×8", "口袋表 / 分类") +
      '<div class="mini-grid">' +
        ["apple", "axe", "ant", "alligator", "banana", "computer", "bear", "cup"].map(function (id) {
          var item = w(id);
          return '<div class="cut-card"><img src="' + item.img + '" alt=""><div class="lab">' + item.en + "</div></div>";
        }).join("") +
      "</div>" +
      foot(8, total, "小图卡")
    ));
    pages.push(sheet("theme-sky",
      header("Mini words", "口袋单词卡 ×8", "与小图配对") +
      '<div class="mini-grid">' +
        ["apple", "axe", "ant", "alligator", "banana", "computer", "bear", "cup"].map(function (id) {
          var item = w(id);
          return '<div class="cut-card word-only"><div class="lab">' + onsetHTML(item) + "</div></div>";
        }).join("") +
      "</div>" +
      foot(9, total, "小词卡")
    ));
    pages.push(sheet("",
      header("Sorting mats", "开头音分类垫", "把图卡放进来") +
      '<div class="sort-mat yes"><h3>/æ/ 火车厢</h3><p>apple · axe · ant · alligator · angry apple</p><div class="sort-slots"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>' +
      '<div class="sort-mat no"><h3>不是 /æ/ 的篮子</h3><p>banana · computer · bear · cup · ball · cat · dog</p><div class="sort-slots"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>' +
      foot(10, total, "分类垫")
    ));
    pages.push(sheet("",
      header("More pictures", "分类用干扰图", "剪开") +
      '<div class="cut-grid">' +
        ["banana", "computer", "ball", "cat"].map(function (id) {
          var item = w(id);
          return '<div class="cut-card"><img src="' + item.img + '" alt=""><div class="lab">' + item.en + "</div></div>";
        }).join("") +
      "</div>" +
      foot(11, total, "干扰图")
    ));
    pages.push(sheet("theme-candy",
      header("Mascot + letter", "angry apple 与 Aa 小卡", "剪开") +
      '<div class="cut-grid">' +
        '<div class="cut-card"><img src="' + L.mascot.img + '" alt=""><div class="lab">' + onsetHTML(w("angry-apple")) + "</div></div>" +
        '<div class="cut-card word-only"><div class="lab" style="font-size:64pt;">Aa</div><div class="ipa" style="font-size:28pt;color:#2e7d32;">/æ/</div></div>' +
        '<div class="cut-card word-only"><div class="lab" style="font-size:80pt;color:#c62828;">A</div></div>' +
        '<div class="cut-card word-only"><div class="lab" style="font-size:80pt;color:#2e7d32;">a</div></div>' +
      "</div>" +
      foot(12, total, "字母小卡")
    ));
    return pages.join("");
  }

  function buildGuide() {
    var total = 2;
    return sheet("theme-leaf",
      header("Teacher kit", "教具可以怎么玩", "课堂手册") +
      '<ul class="howto">' +
        "<li><b>对折闪卡</b> 沿红线对折、胶水粘好。正面只见图，提问 What's this? 翻过来读单词。</li>" +
        "<li><b>图词配对</b> 图片卡与单词卡分开发。两人一组找朋友；或一边贴墙，拿着另一边去贴。</li>" +
        "<li><b>绕教室</b> 墙上贴四张图，每人一张单词卡，听到chant就去站到对应图下面。</li>" +
        "<li><b>听音举卡</b> 全班每人一张图或词。老师说 /æ/ 或 apple，持卡的孩子站起来。</li>" +
        "<li><b>苍蝇拍</b> 两名学生听词，拍桌子上的图片卡，先拍到的得苹果贴纸。</li>" +
        "<li><b>开头音分类</b> 用分类垫：/æ/ 火车厢 vs 不是 /æ/ 的篮子。边分边说 a-apple。</li>" +
        "<li><b>缺了谁</b> 摆出四张图，收起一张，问 What's missing?</li>" +
        "<li><b>记忆翻牌</b> 图卡词卡背面朝上，翻两张，配对就收走。</li>" +
        "<li><b>口袋表</b> 小卡插入口袋。老师说词，学生把卡从口袋里抽出来读。</li>" +
        "<li><b>字母海报</b> 贴在门口。进教室摸一摸 A，说 /æ/；用手指在空中书空。</li>" +
        "<li><b>书空 + 四线格</b> 先空中写，再描红 3 次，最后独立写 3 次。</li>" +
        "<li><b>Chant 排队</b> 四名学生各持一张图，全班唱 Track 06，按顺序站成小火车。</li>" +
      "</ul>" +
      foot(1, total, "手册")
    ) + sheet("",
      header("More ideas", "回家与分层", "给家长") +
      '<ul class="howto">' +
        "<li><b>冰箱配对</b> 磁贴或胶带：一边图一边词，每天吃饭前配对一次。</li>" +
        "<li><b>睡前闪卡</b> 只看图说词；隔天只看词找家里的实物（apple 可用真苹果）。</li>" +
        "<li><b>描红作业</b> 在工坊勾选单词，导出四线格：每个词描红 3 次、独立写 3 次。</li>" +
        "<li><b>练习册 B 答案</b> 圈 apple · alligator · axe · ant。banana、computer 不圈。</li>" +
        "<li><b>Track 05 答案</b> ant Aa · bear X · apple Aa · alligator Aa · cup X · axe Aa。</li>" +
        "<li><b>分层</b> 尚未认词的孩子只玩图片与开头音；已会读的孩子拿掉图，只读单词卡。</li>" +
        "<li><b>不要依赖颜色作弊</b> 大卡没有一对一的独特底色，必须看图或读词才能配对。</li>" +
        "<li><b>打印建议</b> 彩色、A4、边距无、打开「背景图形」。卡纸更耐用。对折卡可覆膜。</li>" +
        "<li><b>安全</b> 低龄班请老师代剪圆角；小卡不放入口袋以外的嘴里。</li>" +
      "</ul>" +
      '<div class="bubble" style="margin-top:8mm;">Hi, I\'m an angry apple!<br>Let\'s play with Aa.</div>' +
      foot(2, total, "手册")
    );
  }

  function buildCopy(ids) {
    var catalog = copyCatalog();
    var map = {};
    catalog.forEach(function (item) { map[item.id] = item; });
    var items = (ids || []).map(function (id) { return map[id]; }).filter(Boolean);
    if (!items.length) {
      return sheet("", header("Copy pack", "请先勾选单词", "") + "<p>没有选择单词。</p>");
    }
    var total = items.length + 1;
    var cover = sheet("theme-sky",
      header("Handwriting · Aa", "四线格抄写", "描红 ×3 · 书写 ×3") +
      nameRow() +
      '<p class="trace-legend"><span><i class="t"></i>浅蓝字 = 描红</span><span><i class="w"></i>空格 = 自己写</span></p>' +
      '<div class="vocab-4">' +
        items.map(function (item, i) { return tile(item, i, true); }).join("") +
      "</div>" +
      '<p style="font-size:14pt;margin-top:5mm;">每个单词一页。先描 3 次，再独立写 3 次。写字坐姿：一拳一尺一寸。边写边说单词。</p>' +
      foot(1, total, "抄写")
    );
    var pages = items.map(function (item, idx) {
      var html = staveHTML(item);
      var fs = fsClass(item.en);
      var traces = [1, 2, 3].map(function (n) {
        return stave(html, "trace", fs, "描 " + n);
      }).join("");
      var writes = [1, 2, 3].map(function (n) {
        return stave("", "write", fs, "写 " + n);
      }).join("");
      return sheet("",
        header("Copy · " + item.en, item.zh, (idx + 2) + "/" + total) +
        '<div class="copy-hero">' +
          '<img src="' + item.img + '" alt="' + item.en + '">' +
          "<div><p class=\"en\">" + onsetHTML(item) + "</p><p class=\"zh\">" + item.zh + "</p>" +
          (item.a ? '<p class="ipa">beginning sound /æ/</p>' : "") +
          "</div>" +
        "</div>" +
        '<p class="trace-legend"><span><i class="t"></i>描红 3 次</span><span><i class="w"></i>独立书写 3 次</span></p>' +
        traces + writes +
        foot(idx + 2, total, "抄写")
      );
    });
    return cover + pages.join("");
  }

  function selectedCopyIds() {
    return Array.prototype.slice.call(document.querySelectorAll(".copy-chip input:checked")).map(function (el) {
      return el.value;
    });
  }

  function renderCopyPicker() {
    var box = $("copy-picker");
    if (!box) return;
    var defaults = L.copyDefaults || [];
    box.innerHTML = copyCatalog().map(function (item) {
      var on = defaults.indexOf(item.id) !== -1;
      return (
        '<label class="copy-chip' + (on ? " is-on" : "") + '">' +
        '<input type="checkbox" value="' + item.id + '"' + (on ? " checked" : "") + ">" +
        '<img src="' + item.img + '" alt="">' +
        "<span>" + item.en + "</span></label>"
      );
    }).join("");
    box.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("change", function () {
        input.parentElement.classList.toggle("is-on", input.checked);
        mountPack("copy", buildCopy(selectedCopyIds()));
        fitSheets();
      });
    });
  }

  function mountPack(id, html) {
    var el = $("pack-" + id);
    if (!el) return;
    el.innerHTML = html;
    if (window.AAStave) window.AAStave.bindPrint(el);
  }

  function fitSheets() {
    var frames = document.querySelectorAll(".sheet-frame");
    frames.forEach(function (frame) {
      var s = frame.querySelector(".sheet");
      if (!s) return;
      s.style.transform = "none";
      var scale = Math.min(1, frame.clientWidth / 794);
      s.style.transform = "scale(" + scale + ")";
      frame.style.height = (1123 * scale) + "px";
    });
  }

  function showPack(id) {
    document.body.setAttribute("data-pack", id);
    PACKS.forEach(function (p) {
      var pack = $("pack-" + p);
      var tab = document.querySelector('.tab[data-pack="' + p + '"]');
      var intro = $("intro-" + p);
      if (pack) pack.classList.toggle("is-on", p === id);
      if (tab) tab.classList.toggle("is-on", p === id);
      if (intro) intro.classList.toggle("hidden", p !== id);
    });
    fitSheets();
    var el = $("pack-" + id);
    if (window.AAStave && el) window.AAStave.bindPrint(el);
  }

  function waitAssets(packId) {
    var fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    var imgs = Array.prototype.slice.call(document.querySelectorAll(".pack-" + packId + " img"));
    var imgWait = Promise.all(imgs.map(function (img) {
      if (img.complete && img.naturalWidth) return Promise.resolve();
      return new Promise(function (res) {
        img.onload = img.onerror = res;
      });
    }));
    return Promise.all([fonts, imgWait]);
  }

  function exportPack(id) {
    showPack(id);
    if (id === "copy") mountPack("copy", buildCopy(selectedCopyIds()));
    waitAssets(id).then(function () {
      fitSheets();
      var el = $("pack-" + id);
      if (window.AAStave && el) window.AAStave.bindPrint(el);
      setTimeout(function () { window.print(); }, 280);
    });
  }

  function init() {
    if (!$("print-root")) return;
    mountPack("book", buildBook());
    mountPack("workbook", buildWorkbook());
    mountPack("games", buildGames());
    mountPack("cards", buildCards());
    mountPack("guide", buildGuide());
    renderCopyPicker();
    mountPack("copy", buildCopy(selectedCopyIds()));

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-pack");
        showPack(id);
        if (history.replaceState) history.replaceState(null, "", "#" + id);
        else location.hash = id;
      });
    });
    document.querySelectorAll("[data-export]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        exportPack(btn.getAttribute("data-export"));
      });
    });
    var all = $("btn-copy-all");
    var vocab = $("btn-copy-vocab");
    var none = $("btn-copy-none");
    if (all) all.addEventListener("click", function () {
      document.querySelectorAll(".copy-chip input").forEach(function (i) { i.checked = true; i.parentElement.classList.add("is-on"); });
      mountPack("copy", buildCopy(selectedCopyIds()));
      fitSheets();
    });
    if (vocab) vocab.addEventListener("click", function () {
      document.querySelectorAll(".copy-chip input").forEach(function (i) {
        var on = (L.copyDefaults || []).indexOf(i.value) !== -1;
        i.checked = on;
        i.parentElement.classList.toggle("is-on", on);
      });
      mountPack("copy", buildCopy(selectedCopyIds()));
      fitSheets();
    });
    if (none) none.addEventListener("click", function () {
      document.querySelectorAll(".copy-chip input").forEach(function (i) { i.checked = false; i.parentElement.classList.remove("is-on"); });
      mountPack("copy", buildCopy(selectedCopyIds()));
      fitSheets();
    });

    var hash = (location.hash || "").replace("#", "");
    showPack(PACKS.indexOf(hash) !== -1 ? hash : "book");
    window.addEventListener("resize", fitSheets);
    window.addEventListener("afterprint", function () { fitSheets(); });
    window.addEventListener("hashchange", function () {
      var id = (location.hash || "").replace("#", "");
      if (PACKS.indexOf(id) !== -1) showPack(id);
    });
  }

  global.AAPrint = {
    exportPack: exportPack,
    buildCopy: buildCopy,
    copyCatalog: copyCatalog
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window);
