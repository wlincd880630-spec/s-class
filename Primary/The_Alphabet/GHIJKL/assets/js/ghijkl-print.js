/**
 * Review 2 · GHIJKL 教具工坊：教材 PDF（SB p.40–43 + WB p.19–21）
 */
(function (global) {
  "use strict";

  var L = window.GHIJKL_REVIEW;
  var PACKS = ["book", "games"];
  var OPTS = L.letterOpts || ["g", "h", "i", "j", "k", "l"];

  function $(id) { return document.getElementById(id); }
  function w(id) {
    var item = L.words && L.words[id];
    if (item) return item;
    console.warn("[print] missing word:", id);
    return { id: id, en: id, zh: "", onset: "", rest: id, img: "", c: false };
  }

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
        ? '<div class="trace-word fs-md"><span class="letter-pair"><span class="letter-' + cls + ' onset">' + ch + "</span></span></div><canvas class="stave-ghost-cv" aria-hidden="true"></canvas>"
        : "") +
      "</div>"
    );
  }
  function bookHead(kicker, title) {
    return '<header class="bk-head"><p class="bk-kicker">' + kicker + "</p>" +
      (title ? '<h1 class="bk-title">' + title + "</h1>" : "") + "</header>";
  }
  function bookFoot(page, total) {
    return '<div class="bk-foot"><span class="bk-foot-meta">S-Class · Review 2 · <b>Gg Hh Ii Jj Kk Ll</b></span>' +
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

  function listenCircleCHTML() {
    return '<div class="bk-ghijkl-grid">' +
      L.listenCircleC.map(function (row, i) {
        var item = w(row.id);
        return '<div class="bk-ghijkl-cell' + (row.sample ? " is-sample" : "") + '">' +
          '<b>' + (i + 1) + '</b><img src="' + item.img + '" alt="' + item.en + '">' +
          letterOptsHTML(row.answer, row.sample) + "</div>";
      }).join("") + "</div>";
  }

  function listenCircleDHTML() {
    var pairs = ["Ee", "Bb", "Jj", "Gg", "Aa", "Hh", "Ii", "Kk", "Ll"];
    return '<div class="bk-ghijkl-d">' +
      L.listenCircleD.map(function (row, i) {
        var item = w(row.id);
        return '<div class="bk-ghijkl-d-row">' +
          '<b>' + (i + 1) + '.</b><img src="' + item.img + '" alt="">' +
          '<div class="bk-ghijkl-pairs">' +
          pairs.map(function (p) {
            return '<span class="bk-pair-opt' + (p === row.letters ? " is-sample" : "") + '">' + p + "</span>";
          }).join("") +
          "</div></div>";
      }).join("") + "</div>";
  }

  function wbTraceCapsHTML() {
    return '<div class="bk-wb-trace-caps">' +
      L.wbTraceCaps.map(function (row) {
        return '<div class="bk-wb-trace-row' + (row.sample ? " is-sample" : "") + '">' +
          letterStave(row.cap, "trace") + letterStave(row.small, "trace") + "</div>";
      }).join("") + "</div>";
  }

  function wbBeginningSoundHTML() {
    return '<div class="bk-ghijkl-grid">' +
      L.wbBeginningSound.map(function (row, i) {
        var item = w(row.id);
        return '<div class="bk-ghijkl-cell' + (row.sample ? " is-sample" : "") + '">' +
          '<b>' + (i + 1) + '</b><img src="' + item.img + '" alt="' + item.en + '">' +
          letterOptsHTML(row.answer, row.sample) + "</div>";
      }).join("") + "</div>";
  }

  function wbTraceLlHTML() {
    var tm = L.wbTraceLl;
    return '<div class="bk-trace-match">' +
      '<div class="bk-tm-col">' +
        tm.caps.map(function (ch) {
          return '<div class="bk-tm-letter">' + letterStave(ch, "trace") + "</div>";
        }).join("") +
      "</div>" +
      '<div class="bk-tm-pics">' +
        tm.pics.map(function (id, i) {
          var item = w(id);
          return '<div class="bk-tm-pic"><b>' + (i + 1) + '</b><img src="' + item.img + '" alt="' + item.en + '"></div>';
        }).join("") +
      "</div>" +
      '<div class="bk-tm-col">' +
        tm.lowers.map(function (ch) {
          return '<div class="bk-tm-letter">' + letterStave(ch, "trace") + "</div>";
        }).join("") +
      "</div></div>";
  }

  function buildBook() {
    var total = 7;
    var pages = [];
    pages.push(bookSheet(
      '<p class="bk-brand">The Alphabet</p><p class="bk-unit">Review 2</p>' +
      '<p class="bk-display">Gg Hh Ii Jj Kk Ll</p>' +
      '<figure class="bk-hero"><img src="' + L.hero + '" alt=""></figure>' +
      '<p class="bk-words">' + L.pages + " · " + L.workbookPages + "</p>" + nameRow() + bookFoot(1, total)
    ));
    pages.push(bookSheet(bookHead("A", "Look and listen. Sing along.") +
      '<figure class="bk-story"><img src="' + L.song + '" alt="Song party"></figure>' +
      '<p class="bk-story-hint">Disc 1 · Track 58 · Song</p>' + bookFoot(2, total)));
    pages.push(bookSheet(bookHead("C", "Listen and write. Circle g h i j k l.") +
      listenCircleCHTML() + bookFoot(3, total)));
    pages.push(bookSheet(bookHead("D", "Listen and write.") +
      listenCircleDHTML() + bookFoot(4, total)));
    pages.push(bookSheet(bookHead("A", "Trace, write, and say.") +
      '<p class="bk-wb-label">Workbook · Review 2</p>' + wbTraceCapsHTML() + bookFoot(5, total)));
    pages.push(bookSheet(bookHead("B", "Listen and circle.") +
      wbBeginningSoundHTML() + bookFoot(6, total)));
    pages.push(bookSheet(bookHead("C", "Trace and match.") + wbTraceLlHTML() + bookFoot(7, total)));
    return pages.join("");
  }

  function buildGames() {
    var ids = ["gorilla", "horse", "insect", "jet", "kangaroo", "lion", "gift", "hat", "igloo", "jam", "key", "leaf", "lamp", "king", "leg", "kite"];
    return '<div class="sheet-frame"><article class="sheet theme-candy"><div class="rainbow-bar"></div>' +
      '<div class="sh-head"><p class="sh-kicker">Review games</p><h1 class="sh-title">GHIJKL 复习图卡</h1></div>' +
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
    try { mountPack("book", buildBook()); } catch (err) { console.error("[print] book failed", err); }
    try { mountPack("games", buildGames()); } catch (err) { console.error("[print] games failed", err); }
    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () { showPack(tab.getAttribute("data-pack")); });
    });
    document.querySelectorAll("[data-export]").forEach(function (btn) {
      btn.addEventListener("click", function () { exportPack(btn.getAttribute("data-export")); });
    });
    showPack("book");
    window.addEventListener("resize", fitSheets);
  }

  global.AAPrint = { showPack: showPack, exportPack: exportPack };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window);
