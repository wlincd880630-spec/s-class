/**
 * JKL 复习 · 教具工坊：教材 PDF（Jj Kk Ll）
 */
(function (global) {
  "use strict";

  var L = window.JKL_REVIEW;
  var PACKS = ["book", "games"];

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
  function staveHTML(letters) {
    var cap = letters.charAt(0);
    var sm = letters.length > 1 ? letters.charAt(1) : letters.toLowerCase();
    return (
      '<span class="letter-pair">' +
      '<span class="letter-cap onset">' + cap + "</span>" +
      '<span class="letter-small rest">' + sm + "</span>" +
      "</span>"
    );
  }
  function stave(html, mode) {
    return (
      '<div class="stave-line">' +
      '<div class="grid-lines"><i class="gl gl-sky"></i><i class="gl gl-cloud"></i><i class="gl gl-grass"></i><i class="gl gl-dirt"></i></div>' +
      (mode === "trace"
        ? '<div class="trace-word fs-md">' + html + "</div><canvas class="stave-ghost-cv" aria-hidden="true"></canvas>"
        : "") +
      "</div>"
    );
  }
  function letterStave(ch, mode) {
    return stave('<span class="letter-pair"><span class="letter-' + (ch.length === 1 && ch === ch.toUpperCase() ? "cap" : "small") + ' onset">' + ch + "</span></span>", mode);
  }
  function bookHead(kicker, title) {
    return '<header class="bk-head"><p class="bk-kicker">' + kicker + "</p>" +
      (title ? '<h1 class="bk-title">' + title + "</h1>" : "") + "</header>";
  }
  function bookFoot(page, total) {
    return '<div class="bk-foot"><span class="bk-foot-meta">S-Class · Unit 4 Review · <b>Jj Kk Ll</b></span>' +
      '<span class="bk-foot-page">' + page + " / " + total + "</span></div>";
  }
  function bookSheet(inner) {
    return '<div class="sheet-frame"><article class="sheet book-sheet book-playful">' + inner + "</article></div>";
  }
  function nameRow() {
    return '<div class="name-row"><span>Name <i></i></span><span>Class <i></i></span><span>Date <i></i></span></div>';
  }

  function sameSoundHTML() {
    return L.sameSoundBoxes.map(function (box) {
      return '<div class="bk-sound-box is-' + box.tone + '">' +
        box.pics.map(function (id) {
          var item = w(id);
          var sample = box.answer.indexOf(id) !== -1;
          return '<div class="bk-sound-pic' + (sample ? " is-sample" : "") + '"><img src="' + item.img + '" alt="' + item.en + '"></div>';
        }).join("") + "</div>";
    }).join("");
  }

  function listenCircleHTML() {
    var caps = ["J", "K", "L"];
    var lows = ["j", "k", "l"];
    return L.listenCircle.map(function (row) {
      var item = w(row.pic);
      return '<div class="bk-listen-row"><figure class="bk-listen-pic"><img src="' + item.img + '" alt=""></figure>' +
        '<div class="bk-listen-letters"><div class="bk-letter-row">' +
        caps.map(function (ch) {
          return '<span class="bk-letter-opt' + (row.sample && ch === row.cap ? " is-sample" : "") + '">' + ch + "</span>";
        }).join("") + '</div><div class="bk-letter-row is-small">' +
        lows.map(function (ch) {
          return '<span class="bk-letter-opt' + (row.sample && ch === row.small ? " is-sample" : "") + '">' + ch + "</span>";
        }).join("") + "</div></div></div>";
    }).join("");
  }

  function writeBlockHTML() {
    return L.writeItems.map(function (row) {
      var item = w(row.id);
      return '<div class="bk-write-item"><figure class="bk-write-sil"><img src="' + item.img + '" alt="" class="is-silhouette"></figure>' +
        (row.modeled ? stave(staveHTML(row.letters), "trace") : stave("", "write")) + "</div>";
    }).join("");
  }

  function wbBeginningSoundHTML() {
    return '<div class="bk-wb-ghi-grid">' +
      L.wbBeginningSound.map(function (row, i) {
        var item = w(row.pic);
        return '<div class="bk-wb-ghi-cell' + (row.sample ? " is-sample" : "") + '">' +
          '<b>' + (i + 1) + '</b><img src="' + item.img + '" alt="' + item.en + '">' +
          '<div class="bk-wb-ghi-opts"><span>j</span><span>k</span><span>l</span></div></div>';
      }).join("") + "</div>";
  }

  function wbTraceMatchHTML() {
    var tm = L.wbTraceMatch;
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
      '<p class="bk-brand">The Alphabet</p><p class="bk-unit">Unit 4 · Review</p>' +
      '<p class="bk-display">Jj Kk Ll</p><p class="bk-phrase">jet · kangaroo · lion</p>' +
      '<figure class="bk-hero"><img src="' + L.hero + '" alt=""></figure>' +
      '<p class="bk-words">' + L.pages + " · " + L.workbookPages + "</p>" + nameRow() + bookFoot(1, total)
    ));
    pages.push(bookSheet(bookHead("A", "Which ones begin with the same sound? Circle.") +
      '<div class="bk-sound-page">' + sameSoundHTML() + "</div>" + bookFoot(2, total)));
    pages.push(bookSheet(bookHead("B", "Listen and circle.") +
      '<div class="bk-listen-page">' + listenCircleHTML() + "</div>" + bookFoot(3, total)));
    pages.push(bookSheet(bookHead("C", "Write.") +
      '<div class="bk-write-page">' + writeBlockHTML() + "</div>" + bookFoot(4, total)));
    pages.push(bookSheet(bookHead("D", "Story") +
      '<p class="bk-story-hint">Look and listen. Read along.</p>' +
      '<figure class="bk-story"><img src="' + L.story + '" alt=""></figure>' +
      '<p class="bk-sight">Sight words: <b>' + L.sightWords.join(" · ") + "</b></p>" + bookFoot(5, total)));
    pages.push(bookSheet(bookHead("A", "Say. Then circle the beginning sound.") +
      '<p class="bk-wb-label">Workbook · Unit 4 Review</p>' + wbBeginningSoundHTML() + bookFoot(6, total)));
    pages.push(bookSheet(bookHead("B", "Trace and match.") + wbTraceMatchHTML() + bookFoot(7, total)));
    return pages.join("");
  }

  function buildGames() {
    var ids = ["jet", "kangaroo", "lion", "jam", "key", "leaf", "juice", "kite", "lamp", "king", "jacket", "leg"];
    return '<div class="sheet-frame"><article class="sheet theme-candy"><div class="rainbow-bar"></div>' +
      '<div class="sh-head"><p class="sh-kicker">Review games</p><h1 class="sh-title">Jj Kk Ll 复习图卡</h1></div>' +
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
