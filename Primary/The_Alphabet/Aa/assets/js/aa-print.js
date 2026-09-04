/**
 * Aa 教具工坊：生成教材 / 纸质游戏 / 教具卡。
 * 连线、选图、选词、迷宫、四线格、圈图、涂色已并入教材 PDF。
 * 导出使用浏览器「打印 → 另存为 PDF」。
 */
(function (global) {
  "use strict";

  var L = window.AA_LESSON;
  var PACKS = ["book", "games", "cards"];

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
    if (!item.a) {
      return '<span class="rest">' + item.en + "</span>";
    }
    return '<span class="onset">' + item.onset + '</span><span class="rest">' + item.rest + "</span>";
  }
  function wordFaces(item) {
    var html = onsetHTML(item);
    return (
      '<div class="lab lab-faces">' +
        '<span class="lab-print">' + html + "</span>" +
        '<span class="lab-hand">' + html + "</span>" +
      "</div>"
    );
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
  function stave(html, mode, fs, tag, extra) {
    return (
      '<div class="stave-line' + (extra ? " " + extra : "") + '">' +
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
      '<span class="bk-foot-meta">S-Class · The Alphabet · <b>Aa</b></span>' +
      '<span class="bk-foot-page">' + page + " / " + total + "</span>" +
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
  function tile(item, i, withWord, dual) {
    return (
      '<div class="pic-tile t' + (i % 6) + '">' +
      '<img src="' + item.img + '" alt="' + item.en + '">' +
      (withWord !== false ? (dual ? wordFaces(item) : '<div class="lab">' + onsetHTML(item) + "</div>") : "") +
      "</div>"
    );
  }

  function bookSection(title) {
    return '<p class="bk-section">' + title + "</p>";
  }

  function wordCopyBlock(item) {
    var html = staveHTML(item);
    var fs = fsClass(item.en);
    return (
      '<div class="bk-copy-item">' +
        '<div class="bk-copy-meta">' +
          '<img src="' + item.img + '" alt="' + item.en + '">' +
          wordFaces(item) +
        "</div>" +
        stave(html, "trace", fs, "Trace") +
        stave("", "write", fs, "Write") +
        stave("", "write", fs, "Write") +
      "</div>"
    );
  }

  function buildBook() {
    var pages = [];
    var total = 13;
    var maze = L.wordMaze;
    pages.push(bookSheet("book-cover",
      '<p class="bk-brand">The Alphabet</p>' +
      '<p class="bk-unit">Unit 1</p>' +
      '<p class="bk-display">Aa</p>' +
      '<p class="bk-display-hand">Aa</p>' +
      '<p class="bk-phrase">angry apple</p>' +
      '<p class="bk-ipa">/æ/</p>' +
      '<figure class="bk-hero"><img src="' + L.mascot.img + '" alt="angry apple"></figure>' +
      '<p class="bk-words">apple  ·  axe  ·  ant  ·  alligator</p>' +
      nameRow() +
      bookFoot(1, total)
    ));
    pages.push(bookSheet("",
      bookHead("A", "Listen and say") +
      '<div class="bk-split">' +
        '<figure class="bk-plate">' +
          '<img src="' + L.mascot.img + '" alt="angry apple">' +
          '<figcaption class="bk-caption">angry apple</figcaption>' +
        "</figure>" +
        '<div class="bk-letter">' +
          '<div class="bk-faces">' +
            '<div class="bk-face is-print">' +
              '<span class="face-lab">Print</span>' +
              '<span class="pair">Aa</span>' +
            "</div>" +
            '<div class="bk-face is-hand">' +
              '<span class="face-lab">Hand</span>' +
              '<span class="pair">Aa</span>' +
            "</div>" +
          "</div>" +
          '<span class="ipa">/æ/</span>' +
        "</div>" +
      "</div>" +
      stave(staveHTML({ kind: "letter", id: "Aa" }), "trace", "fs-lg", "Trace") +
      stave("", "write", "fs-lg", "Write") +
      bookFoot(2, total)
    ));
    pages.push(bookSheet("",
      bookHead("B", "Listen, point and say") +
      '<div class="vocab-4 bk-vocab">' +
        L.vocab.map(function (item, i) { return tile(item, i, true, true); }).join("") +
      "</div>" +
      bookFoot(3, total)
    ));
    pages.push(bookSheet("",
      bookHead("C", "Trace and write") +
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
      bookHead("D", "Listen and write") +
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
      bookHead("E", "Listen and chant") +
      '<div class="vocab-4 bk-vocab">' +
        L.chantOrder.map(function (id, i) {
          var item = w(id);
          return (
            '<div class="pic-tile t' + i + '">' +
            '<img src="' + item.img + '" alt="">' +
            wordFaces(item) +
            '<div class="num-box"></div>' +
            "</div>"
          );
        }).join("") +
      "</div>" +
      bookFoot(6, total)
    ));
    pages.push(bookSheet("",
      bookHead("F", "Match") +
      '<div class="bk-match">' +
        '<div class="bk-match-col">' +
          L.vocab.map(function (item, i) {
            return '<div class="bk-match-row"><b>' + (i + 1) + '</b><img src="' + item.img + '" alt=""></div>';
          }).join("") +
        "</div>" +
        '<div class="bk-match-col">' +
          (L.matchWords || []).map(function (id, i) {
            var item = w(id);
            return '<div class="bk-match-row is-word"><b>' + String.fromCharCode(65 + i) + "</b>" + wordFaces(item) + "</div>";
          }).join("") +
        "</div>" +
      "</div>" +
      bookFoot(7, total)
    ));
    pages.push(bookSheet("",
      bookHead("G", "Circle the picture") +
      '<div class="bk-choose">' +
        (L.choosePicture || []).map(function (row) {
          var prompt = w(row.word);
          return (
            '<div class="bk-choose-row">' +
            '<div class="bk-choose-prompt">' + wordFaces(prompt) + "</div>" +
            row.pics.map(function (id) {
              var item = w(id);
              return (
                '<div class="bk-opt">' +
                '<span class="bk-ring"></span>' +
                '<img src="' + item.img + '" alt="">' +
                "</div>"
              );
            }).join("") +
            "</div>"
          );
        }).join("") +
      "</div>" +
      bookFoot(8, total)
    ));
    pages.push(bookSheet("",
      bookHead("H", "Circle the word") +
      '<div class="bk-choose is-words">' +
        (L.chooseWord || []).map(function (row) {
          var prompt = w(row.pic);
          return (
            '<div class="bk-choose-row">' +
            '<div class="bk-choose-prompt is-pic"><img src="' + prompt.img + '" alt=""></div>' +
            row.words.map(function (id) {
              var item = w(id);
              return '<div class="bk-opt is-word"><span class="bk-ring"></span>' + wordFaces(item) + "</div>";
            }).join("") +
            "</div>"
          );
        }).join("") +
      "</div>" +
      bookFoot(9, total)
    ));
    pages.push(bookSheet("",
      bookHead("I", "Word maze") +
      '<div class="bk-maze-clues">' +
        maze.words.map(function (id) {
          var item = w(id);
          return '<div class="bk-maze-clue"><img src="' + item.img + '" alt="">' + wordFaces(item) + "</div>";
        }).join("") +
      "</div>" +
      '<div class="bk-maze" style="grid-template-columns:repeat(' + maze.size + ',minmax(0,1fr))">' +
        maze.grid.map(function (row) {
          return row.split("").map(function (ch) {
            return '<span class="bk-maze-cell">' + ch + "</span>";
          }).join("");
        }).join("") +
      "</div>" +
      bookFoot(10, total)
    ));
    pages.push(bookSheet("",
      bookHead("J", "Trace and write") +
      '<div class="bk-copy-page">' +
        wordCopyBlock(w("apple")) +
        wordCopyBlock(w("axe")) +
      "</div>" +
      bookFoot(11, total)
    ));
    pages.push(bookSheet("",
      bookHead("K", "Trace and write") +
      '<div class="bk-copy-page">' +
        wordCopyBlock(w("ant")) +
        wordCopyBlock(w("alligator")) +
      "</div>" +
      bookFoot(12, total)
    ));
    pages.push(bookSheet("",
      bookHead("L", "Circle and colour") +
      bookSection('Circle the <span class="bk-ipa-inline">/æ/</span> pictures') +
      '<div class="bk-picnic">' +
        L.workbookCircle.map(function (id) {
          var item = w(id);
          var sample = id === L.workbookCircleExample;
          return (
            '<div class="bk-opt is-pic' + (sample ? " is-sample" : "") + '">' +
            '<span class="bk-ring' + (sample ? " is-sample" : "") + '"></span>' +
            '<img src="' + item.img + '" alt="' + item.en + '">' +
            "</div>"
          );
        }).join("") +
      "</div>" +
      bookSection('Colour A and <span class="bk-keep-case">a</span>') +
      '<div class="bk-balloons">' +
        L.workbookLetters.map(function (ch) {
          return '<div class="bk-balloon">' + ch + "</div>";
        }).join("") +
      "</div>" +
      bookFoot(13, total)
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
    pages.push(sheet("theme-candy match-game",
      header("Game 4 · Match", "图片和单词手拉手", "连线") +
      task("4", "从左边的图拉线到右边的单词。做完后可以沿虚线剪开，变成配对卡。") +
      '<div class="match-cols">' +
        '<div class="match-col">' +
          L.vocab.map(function (item, i) {
            return '<div class="row is-pic"><b>' + (i + 1) + '</b><img src="' + item.img + '" alt=""></div>';
          }).join("") +
        "</div>" +
        '<div class="match-mid" aria-hidden="true"></div>' +
        '<div class="match-col">' +
          [L.vocab[2], L.vocab[0], L.vocab[3], L.vocab[1]].map(function (item) {
            return '<div class="row is-word"><span class="word-chip">' + onsetHTML(item) + "</span></div>";
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
    var total = 11;
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
      '<div class="cut-grid">' +
        L.vocab.map(function (item) {
          return '<div class="cut-card"><img src="' + item.img + '" alt=""></div>';
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
      header("More pictures", "分类用干扰图", "剪开") +
      '<div class="cut-grid">' +
        ["banana", "computer", "ball", "cat"].map(function (id) {
          var item = w(id);
          return '<div class="cut-card"><img src="' + item.img + '" alt=""><div class="lab">' + item.en + "</div></div>";
        }).join("") +
      "</div>" +
      foot(10, total, "干扰图")
    ));
    pages.push(sheet("theme-candy",
      header("Mascot + letter", "angry apple 与 Aa 小卡", "剪开") +
      '<div class="cut-grid">' +
        '<div class="cut-card"><img src="' + L.mascot.img + '" alt=""><div class="lab">' + onsetHTML(w("angry-apple")) + "</div></div>" +
        '<div class="cut-card word-only"><div class="lab" style="font-size:64pt;">Aa</div><div class="ipa" style="font-size:28pt;color:#2e7d32;">/æ/</div></div>' +
        '<div class="cut-card word-only"><div class="lab" style="font-size:80pt;color:#c62828;">A</div></div>' +
        '<div class="cut-card word-only"><div class="lab" style="font-size:80pt;color:#2e7d32;">a</div></div>' +
      "</div>" +
      foot(11, total, "字母小卡")
    ));
    return pages.join("");
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
    mountPack("games", buildGames());
    mountPack("cards", buildCards());

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
    exportPack: exportPack
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window);
