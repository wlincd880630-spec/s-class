/**
 * ABCDEF 复习 · 教具工坊：教材 PDF（Review 1）
 */
(function (global) {
  "use strict";

  var L = window.ABCDEF_REVIEW;
  var PACKS = ["book", "games"];

  function $(id) { return document.getElementById(id); }
  function w(id) { return L.words[id]; }

  function onsetHTML(item) {
    if (!item) return "";
    return '<span class="onset">' + item.onset + '</span><span class="rest">' + item.rest + "</span>";
  }
  function staveHTML(letters) {
    var cap = letters.charAt(0);
    var sm = letters.length > 1 ? letters.charAt(1) : letters.toLowerCase();
    return '<span class="letter-pair"><span class="letter-cap onset">' + cap + '</span><span class="letter-small rest">' + sm + "</span></span>";
  }
  function stave(html, mode) {
    return '<div class="stave-line"><div class="grid-lines"><i class="gl gl-sky"></i><i class="gl gl-cloud"></i><i class="gl gl-grass"></i><i class="gl gl-dirt"></i></div>' +
      (mode === "trace" ? '<div class="trace-word fs-md">' + html + '</div><canvas class="stave-ghost-cv" aria-hidden="true"></canvas>' : "") + "</div>";
  }
  function bookHead(kicker, title) {
    return '<header class="bk-head"><p class="bk-kicker">' + kicker + "</p>" + (title ? '<h1 class="bk-title">' + title + "</h1>" : "") + "</header>";
  }
  function bookFoot(page, total) {
    return '<div class="bk-foot"><span class="bk-foot-meta">S-Class · Review 1 · <b>Aa–Ff</b></span><span class="bk-foot-page">' + page + " / " + total + "</span></div>";
  }
  function bookSheet(inner) {
    return '<div class="sheet-frame"><article class="sheet book-sheet book-playful">' + inner + "</article></div>";
  }
  function nameRow() {
    return '<div class="name-row"><span>Name <i></i></span><span>Class <i></i></span><span>Date <i></i></span></div>";
  }

  function listenWriteHTML() {
    return L.listenWriteRows.map(function (row, ri) {
      return '<div class="bk-lw-row"><b>' + (ri + 1) + ".</b>" +
        row.pics.map(function (id) {
          var item = w(id);
          var on = row.sample && id === row.answer;
          return '<figure class="bk-lw-pic' + (on ? " is-sample" : "") + '"><img src="' + item.img + '" alt=""></figure>';
        }).join("") +
        (row.sample ? stave(staveHTML(row.letters), "trace") : stave("", "write")) + "</div>";
    }).join("");
  }

  function sameSoundFacesHTML() {
    return '<div class="bk-faces-grid">' + L.sameSoundFaces.map(function (row, i) {
      var item = w(row.pic);
      return '<div class="bk-face-cell' + (row.sample ? " is-sample" : "") + '"><b>' + (i + 1) + '</b><img src="' + item.img + '" alt=""><span class="bk-face-opt">😊 ☹️</span></div>';
    }).join("") + "</div>";
  }

  function matchSayHTML() {
    return '<div class="bk-match-say">' +
      '<div class="bk-ms-caps">' + L.matchSay.map(function (r) {
        return '<div class="bk-ms-cap' + (r.sample ? " is-sample" : "") + '">' + r.cap + "</div>";
      }).join("") + "</div>" +
      '<div class="bk-ms-pics">' + L.matchSay.reduce(function (acc, r) {
        return acc + r.pics.map(function (id) {
          return '<div class="bk-ms-pic"><img src="' + w(id).img + '" alt=""></div>';
        }).join("");
      }, "") + "</div>" +
      '<div class="bk-ms-smalls">' + L.matchSay.map(function (r) {
        return '<div class="bk-ms-sm">' + r.small + "</div>";
      }).join("") + "</div></div>";
  }

  function boardGameHTML() {
    var cells = ['<div class="bk-bg-cell is-start">Start</div>'];
    L.boardPath.forEach(function (id) {
      cells.push('<div class="bk-bg-cell"><img src="' + w(id).img + '" alt=""></div>');
    });
    cells.push('<div class="bk-bg-cell is-end">End</div>');
    return '<div class="bk-board"><div class="bk-spinner">Aa Bb Cc Dd Ee Ff</div><div class="bk-board-path">' + cells.join("") + "</div></div>";
  }

  function wbCircleHTML() {
    return '<div class="bk-wb-grid">' + L.wbCircleSound.map(function (row, i) {
      var item = w(row.pic);
      return '<div class="bk-wb-cell"><b>' + (i + 1) + "</b><img src=\"" + item.img + '" alt=""><div class="bk-wb-choices">' +
        row.choices.map(function (ch) {
          return '<span class="bk-wb-ch">' + ch + "</span>";
        }).join("") + "</div></div>";
    }).join("") + "</div>";
  }

  function wbMatchHTML() {
    return '<div class="bk-trace-match"><div class="bk-tm-col">' +
      L.wbMatch.map(function (r) {
        return '<div class="bk-tm-cap' + (r.sampleCap ? " is-sample" : "") + '"><div class="bk-tm-trace">' + r.cap + "</div></div>";
      }).join("") + '</div><div class="bk-tm-col is-pics">' +
      L.wbMatch.map(function (r) {
        return '<div class="bk-tm-pic"><img src="' + w(r.pic).img + '" alt=""></div>';
      }).join("") + '</div><div class="bk-tm-col">' +
      L.wbMatch.map(function (r) {
        return '<div class="bk-tm-small' + (r.sampleSmall ? " is-sample" : "") + '"><div class="bk-tm-trace">' + r.small + "</div></div>";
      }).join("") + "</div></div>";
  }

  function wbConnectHTML() {
    return '<div class="bk-connect">' + L.wbConnect.map(function (row, i) {
      var item = w(row.pic);
      return '<div class="bk-connect-item' + (i === 0 ? " is-sample" : "") + '"><span class="bk-connect-dot">' + row.letter + '</span><img src="' + item.img + '" alt="">' +
        (i === 0 ? stave(staveHTML("Aa"), "trace") : stave("", "write")) + "</div>";
    }).join("") + "</div>";
  }

  function symbolKeyHTML() {
    return '<div class="bk-sym-key">' + L.symbolKey.map(function (k) {
      return '<span class="bk-sym-k"><i>' + k.sym + "</i>" + k.letter + "</span>";
    }).join("") + "</div>";
  }

  function symbolWriteHTML() {
    return '<div class="bk-sym-write">' + L.symbolWrite.map(function (row, i) {
      return '<div class="bk-sym-item"><b>' + (i + 1) + '.</b><span class="bk-sym">' + row.sym + "</span>" +
        (row.sample ? stave(staveHTML(row.letter), "trace") : stave("", "write")) + "</div>";
    }).join("") + "</div>";
  }

  function buildBook() {
    var total = 10;
    var pages = [];
    pages.push(bookSheet('<p class="bk-brand">The Alphabet</p><p class="bk-unit">Review 1</p><p class="bk-display">Aa Bb Cc Dd Ee Ff</p>' +
      '<figure class="bk-hero"><img src="' + L.hero + '" alt=""></figure>' +
      '<p class="bk-words">Student\'s Book p.20–23 · Workbook p.10–11</p>' + nameRow() + bookFoot(1, total)));
    pages.push(bookSheet(bookHead("A", "Look and listen. Sing along.") +
      '<figure class="bk-hero"><img src="' + L.hero + '" alt=""></figure>' + bookFoot(2, total)));
    pages.push(bookSheet(bookHead("B", "Listen, circle, and write.") + '<div class="bk-lw-page">' + listenWriteHTML() + "</div>" + bookFoot(3, total)));
    pages.push(bookSheet(bookHead("C", "Listen. Do you hear the same sound? Draw 😊 or ☹️.") + sameSoundFacesHTML() + bookFoot(4, total)));
    pages.push(bookSheet(bookHead("D", "Match and say.") + matchSayHTML() + bookFoot(5, total)));
    pages.push(bookSheet(bookHead("E", "Play the game.") + boardGameHTML() + bookFoot(6, total)));
    pages.push(bookSheet(bookHead("A", "Say. Then circle the beginning sound.") + '<p class="bk-wb-label">Workbook · Review 1</p>' + wbCircleHTML() + bookFoot(7, total)));
    pages.push(bookSheet(bookHead("B", "Say and match.") + wbMatchHTML() + bookFoot(8, total)));
    pages.push(bookSheet(bookHead("C", "Write, say, and connect in A-B-C order.") + wbConnectHTML() + bookFoot(9, total)));
    pages.push(bookSheet(bookHead("D", "Look and write.") + symbolKeyHTML() + symbolWriteHTML() + bookFoot(10, total)));
    return pages.join("");
  }

  function buildGames() {
    var ids = L.boardPath.slice(0, 12);
    return '<div class="sheet-frame"><article class="sheet theme-candy"><div class="rainbow-bar"></div>' +
      '<div class="sh-head"><p class="sh-kicker">Review 1</p><h1 class="sh-title">Aa–Ff 复习图卡</h1></div>' + nameRow() +
      '<div class="circle-grid">' + ids.map(function (id, i) {
        var item = w(id);
        return '<div class="pic-tile t' + (i % 6) + '"><img src="' + item.img + '" alt="" style="height:28mm"><div class="lab">' + onsetHTML(item) + "</div></div>";
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
