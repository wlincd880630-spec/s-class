/**
 * Review 3 · MNOPQR 教具工坊：教材 PDF（SB p.60–63 + WB p.30–31）
 */
(function (global) {
  "use strict";

  var L = window.MNOPQR_REVIEW;
  var PACKS = ["book", "games"];
  var OPTS = L.letterOpts || ["m", "n", "o", "p", "q", "r"];

  function $(id) { return document.getElementById(id); }
  function w(id) { return L.words[id]; }

  function onsetHTML(item) {
    if (!item) return "";
    return '<span class="onset">' + item.onset + '</span><span class="rest">' + item.rest + "</span>";
  }
  function letterStave(ch, mode) {
    var cls = ch.length === 1 && ch === ch.toUpperCase() ? "cap" : "small";
    return (
      '<div class="stave-line">' +
      '<div class="grid-lines"><i class="gl gl-sky"></i><i class="gl gl-cloud"></i><i class="gl gl-grass"></i><i class="gl gl-dirt"></i></div>' +
      (mode === "trace"
        ? '<div class="trace-word fs-md"><span class="letter-pair"><span class="letter-' + cls + ' onset">' + ch + '</span></span></div><canvas class="stave-ghost-cv" aria-hidden="true"></canvas>'
        : "") +
      "</div>"
    );
  }
  function bookHead(kicker, title) {
    return '<header class="bk-head"><p class="bk-kicker">' + kicker + "</p>" +
      (title ? '<h1 class="bk-title">' + title + "</h1>" : "") + "</header>";
  }
  function bookFoot(page, total) {
    return '<div class="bk-foot"><span class="bk-foot-meta">S-Class · Review 3 · <b>Mm Nn Oo Pp Qq Rr</b></span>' +
      '<span class="bk-foot-page">' + page + " / " + total + "</span></div>";
  }
  function bookSheet(inner) {
    return '<div class="sheet-frame"><article class="sheet book-sheet book-playful">' + inner + "</article></div>";
  }
  function nameRow() {
    return '<div class="name-row"><span>Name <i></i></span><span>Class <i></i></span><span>Date <i></i></span></div>';
  }

  function letterOptsHTML(answer, sample) {
    return '<div class="bk-letter-row is-small">' +
      OPTS.map(function (ch) {
        return '<span class="bk-letter-opt' + (sample && answer === ch ? " is-sample" : "") + '">' + ch + "</span>";
      }).join("") + "</div>";
  }

  function listenCircleWriteHTML() {
    return '<div class="bk-lcw">' +
      L.listenCircleWrite.map(function (row, ri) {
        return '<div class="bk-lcw-row' + (row.sample ? " is-sample" : "") + '">' +
          '<b>' + (ri + 1) + '.</b>' +
          row.pics.map(function (id, ci) {
            var item = w(id);
            var ans = row.answers[ci];
            return '<div class="bk-lcw-cell"><img src="' + item.img + '" alt="' + item.en + '">' +
              letterOptsHTML(ans, row.sample) +
              '<div class="bk-lcw-lines"><i></i><i></i></div></div>';
          }).join("") +
          "</div>";
      }).join("") + "</div>";
  }

  function sameSoundHTML() {
    return '<div class="bk-same-pairs">' +
      L.sameSoundPairs.map(function (row, i) {
        var a = w(row.a);
        var b = w(row.b);
        return '<div class="bk-same-row' + (row.sample ? " is-sample" : "") + '">' +
          '<b>' + (i + 1) + '.</b>' +
          '<img src="' + a.img + '" alt=""><span class="bk-face">☺ / ☹</span><img src="' + b.img + '" alt="">' +
          "</div>";
      }).join("") + "</div>";
  }

  function matchSayHTML() {
    var ms = L.matchSay;
    return '<div class="bk-match-say">' +
      '<div class="bk-ms-caps">' + ms.caps.map(function (ch) {
        return '<span class="bk-ms-cap">' + ch + "</span>";
      }).join("") + "</div>" +
      '<div class="bk-ms-pics">' + ms.pics.map(function (id) {
        var item = w(id);
        return '<img src="' + item.img + '" alt="' + item.en + '">';
      }).join("") + "</div>" +
      '<div class="bk-ms-lows">' + ms.lowers.map(function (ch) {
        return '<span class="bk-ms-low">' + ch + "</span>";
      }).join("") + "</div></div>";
  }

  function wbBeginningSoundHTML() {
    return '<div class="bk-mnopqr-grid">' +
      L.wbBeginningSound.map(function (row, i) {
        var item = w(row.id);
        return '<div class="bk-mnopqr-cell' + (row.sample ? " is-sample" : "") + '">' +
          '<b>' + (i + 1) + '</b><img src="' + item.img + '" alt="' + item.en + '">' +
          letterOptsHTML(row.answer, row.sample) + "</div>";
      }).join("") + "</div>";
  }

  function wbTripleMatchHTML() {
    return '<div class="bk-triple-match">' +
      L.wbTripleMatch.map(function (row) {
        var item = w(row.pic);
        return '<div class="bk-triple-row' + (row.sample ? " is-sample" : "") + '">' +
          letterStave(row.cap, "trace") +
          '<img src="' + item.img + '" alt="' + item.en + '">' +
          letterStave(row.small, "trace") +
          "</div>";
      }).join("") + "</div>";
  }

  function wbLetterWordHTML() {
    return '<div class="bk-letter-word">' +
      L.wbLetterWord.map(function (row) {
        var item = w(row.pic);
        return '<div class="bk-lw-row' + (row.sample ? " is-sample" : "") + '">' +
          '<span class="bk-lw-cap">' + row.letter + '</span>' +
          '<img src="' + item.img + '" alt="">' +
          '<div class="bk-lw-write">' + letterStave(row.letter.toLowerCase(), "trace") + "</div>" +
          "</div>";
      }).join("") + "</div>";
  }

  function wbSubstitutionHTML() {
    return '<div class="bk-sub-table">' +
      '<p class="bk-sub-hint">Use the code to write words.</p>' +
      '<table><thead><tr><th>Code</th><th>Letter</th></tr></thead><tbody>' +
      L.wbSubstitution.map(function (row) {
        return "<tr><td>" + row.sym + "</td><td>" + row.letter + "</td></tr>";
      }).join("") +
      "</tbody></table>" +
      '<div class="bk-sub-practice">' +
        ["★●▲", "■♦♥", "★■♦"].map(function (code) {
          return '<div class="bk-sub-line"><span>' + code + '</span><i></i><i></i></div>';
        }).join("") +
      "</div></div>";
  }

  function buildBook() {
    var total = 10;
    var pages = [];
    pages.push(bookSheet(
      '<p class="bk-brand">The Alphabet</p><p class="bk-unit">Review 3</p>' +
      '<p class="bk-display">Mm Nn Oo Pp Qq Rr</p>' +
      '<figure class="bk-hero"><img src="' + L.hero + '" alt=""></figure>' +
      '<p class="bk-words">' + L.pages + " · " + L.workbookPages + "</p>" + nameRow() + bookFoot(1, total)
    ));
    pages.push(bookSheet(bookHead("A", "Look and listen. Sing along.") +
      '<figure class="bk-story"><img src="' + L.song + '" alt="Song"></figure>' +
      '<p class="bk-story-hint">Disc 2 · Track 27 · Song</p>' + bookFoot(2, total)));
    pages.push(bookSheet(bookHead("B", "Listen, circle, and write.") +
      listenCircleWriteHTML() + bookFoot(3, total)));
    pages.push(bookSheet(bookHead("C", "Do they begin with the same sound? Draw ☺ or ☹.") +
      sameSoundHTML() + bookFoot(4, total)));
    pages.push(bookSheet(bookHead("D", "Match and say.") +
      matchSayHTML() + bookFoot(5, total)));
    pages.push(bookSheet(bookHead("E", "Play the game.") +
      '<figure class="bk-story"><img src="' + L.gameBoard + '" alt="Game board"></figure>' +
      '<p class="bk-story-hint">Spin M–R and move on the board.</p>' + bookFoot(6, total)));
    pages.push(bookSheet(bookHead("A", "Listen and circle the beginning sound.") +
      '<p class="bk-wb-label">Workbook · Review 3</p>' + wbBeginningSoundHTML() + bookFoot(7, total)));
    pages.push(bookSheet(bookHead("B", "Trace and match.") +
      wbTripleMatchHTML() + bookFoot(8, total)));
    pages.push(bookSheet(bookHead("C", "Match and write.") +
      wbLetterWordHTML() + bookFoot(9, total)));
    pages.push(bookSheet(bookHead("D", "Use the code to write words.") +
      wbSubstitutionHTML() + bookFoot(10, total)));
    return pages.join("");
  }

  function buildGames() {
    var ids = ["monkey", "nest", "ox", "panda", "queen", "rabbit", "milk", "nut", "octopus", "peach", "question", "robot", "mouse", "net", "olive", "pen", "pineapple", "rose", "rice", "ostrich", "money", "nose"];
    return '<div class="sheet-frame"><article class="sheet theme-candy"><div class="rainbow-bar"></div>' +
      '<div class="sh-head"><p class="sh-kicker">Review games</p><h1 class="sh-title">MNOPQR 复习图卡</h1></div>' +
      nameRow() + '<div class="circle-grid">' +
      ids.map(function (id, i) {
        var item = w(id);
        return '<div class="pic-tile t' + (i % 6) + '"><img src="' + item.img + '" alt="" style="height:28mm">' +
          '<div class="lab">' + onsetHTML(item) + "</div></div>";
      }).join("") + "</article></div>";
  }

  function mountPack(id, html) {
    var el = $("pack-" + id);
    if (!el) return;
    el.innerHTML = html;
    if (window.AAStave) window.AAStave.bindPrint(el);
  }

  function fitSheets() {
    document.querySelectorAll(".sheet-frame").forEach(function (frame) {
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
    if (window.AAStave && $("pack-" + id)) window.AAStave.bindPrint($("pack-" + id));
  }

  function exportPack(id) {
    showPack(id);
    setTimeout(function () { window.print(); }, 280);
  }

  function init() {
    if (!$("print-root")) return;
    mountPack("book", buildBook());
    mountPack("games", buildGames());
    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () { showPack(tab.getAttribute("data-pack")); });
    });
    document.querySelectorAll("[data-export]").forEach(function (btn) {
      btn.addEventListener("click", function () { exportPack(btn.getAttribute("data-export")); });
    });
    showPack("book");
    window.addEventListener("resize", fitSheets);
  }

  global.AAPrint = { exportPack: exportPack };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window);
