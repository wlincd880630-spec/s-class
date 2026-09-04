/**
 * Review 4 · STUVWXYZ 教具工坊：教材 PDF（SB p.88–90 + WB p.43–44）
 */
(function (global) {
  "use strict";

  var L = window.STUVWXYZ_REVIEW;
  var PACKS = ["book", "games"];
  var OPTS = L.letterOpts || ["s", "t", "u", "v", "w", "x", "y", "z"];

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
        ? '<div class="trace-word fs-md"><span class="letter-pair"><span class="letter-' + cls + ' onset">' + ch + "</span></span></div><canvas class="stave-ghost-cv" aria-hidden="true"></canvas>"
        : "") +
      "</div>"
    );
  }
  function stavePair(letters, mode) {
    var cap = letters.charAt(0);
    var sm = letters.length > 1 ? letters.charAt(1) : letters.toLowerCase();
    return letterStave(cap, mode) + letterStave(sm, mode);
  }
  function bookHead(kicker, title) {
    return '<header class="bk-head"><p class="bk-kicker">' + kicker + "</p>" +
      (title ? '<h1 class="bk-title">' + title + "</h1>" : "") + "</header>";
  }
  function bookFoot(page, total) {
    return '<div class="bk-foot"><span class="bk-foot-meta">S-Class · Review 4 · <b>Ss–Zz</b></span>' +
      '<span class="bk-foot-page">' + page + " / " + total + "</span></div>";
  }
  function bookSheet(inner) {
    return '<div class="sheet-frame"><article class="sheet book-sheet book-playful">' + inner + "</article></div>";
  }
  function nameRow() {
    return '<div class="name-row"><span>Name <i></i></span><span>Class <i></i></span><span>Date <i></i></span></div>';
  }

  function songHTML() {
    return '<figure class="bk-story"><img src="' + L.song + '" alt="Zoo song"></figure>' +
      '<p class="bk-story-hint">Disc 2 · Track 63 · Song</p>' +
      '<div class="bk-song-letters">' +
      (L.songLetters || []).map(function (row) {
        var item = w(row.id);
        return '<div class="bk-song-letter"><span class="bk-cap">' + row.letter + '</span><img src="' + item.img + '" alt=""><span>' + row.hint + "</span></div>";
      }).join("") + "</div>";
  }

  function findAnimalsHTML() {
    return '<div class="bk-find-grid">' +
      (L.findAnimals || []).map(function (id, i) {
        var item = w(id);
        return '<div class="bk-find-cell"><b>' + (i + 1) + '</b><img src="' + item.img + '" alt="' + item.en + '"><span>' + item.en + "</span></div>";
      }).join("") + "</div>";
  }

  function triviaHTML() {
    return '<div class="bk-trivia">' +
      (L.triviaQuiz || []).map(function (row, i) {
        var item = w(row.id);
        return '<div class="bk-trivia-row"><b>' + (i + 1) + '.</b><img src="' + item.img + '" alt="">' +
          '<p>' + row.question + '</p><div class="bk-trivia-box"></div></div>';
      }).join("") + "</div>";
  }

  function giftHTML() {
    return '<figure class="bk-story"><img src="' + L.gift + '" alt="Gift"></figure>' +
      '<div class="bk-gift-cans">' +
      (L.giftCans || []).map(function (row) {
        var item = w(row.id);
        return '<div class="bk-gift-can"><img src="' + item.img + '" alt=""><span>' + row.letter + "</span></div>";
      }).join("") + "</div>";
  }

  function goodbyeHTML() {
    return '<figure class="bk-story"><img src="' + L.goodbye + '" alt="Thank you"></figure>' +
      '<p class="bk-sight">Letters: <b>' + L.letters.join(" · ") + "</b></p>";
  }

  function wbColorHTML() {
    return '<div class="bk-color-grid">' +
      (L.wbColorGrid || []).map(function (row) {
        return '<div class="bk-color-group"><span class="bk-splatter">' + row.splatter + "</span>" +
          row.pics.map(function (id) {
            var item = w(id);
            return '<div class="bk-color-pic"><img src="' + item.img + '" alt="' + item.en + '"></div>';
          }).join("") + "</div>";
      }).join("") + "</div>";
  }

  function wbTraceHTML() {
    return '<div class="bk-wb-trace-pairs">' +
      (L.wbTracePairs || []).map(function (row) {
        var item = w(row.pic);
        return '<div class="bk-wb-trace-row' + (row.sample ? " is-sample" : "") + '">' +
          stavePair(row.letters, "trace") +
          '<img src="' + item.img + '" alt=""></div>';
      }).join("") + "</div>";
  }

  function wbWriteGridHTML() {
    return '<div class="bk-write-grid">' +
      (L.wbWriteGrid || []).map(function (row) {
        var item = w(row.id);
        return '<div class="bk-write-cell"><b>' + row.n + '</b><img src="' + item.img + '" alt="">' +
          '<div class="bk-write-stave">' + (row.letters ? letterStave(row.letters.charAt(0), "write") : "") + "</div></div>";
      }).join("") + "</div>";
  }

  function wbNumberHTML() {
    return '<div class="bk-listen-num">' +
      (L.wbListenNumber || []).map(function (row, i) {
        var item = w(row.id);
        return '<div class="bk-num-cell"><img src="' + item.img + '" alt=""><div class="num-box"></div></div>';
      }).join("") + "</div>";
  }

  function buildBook() {
    var total = 11;
    var pages = [];
    pages.push(bookSheet(
      '<p class="bk-brand">The Alphabet</p><p class="bk-unit">Review 4</p>' +
      '<p class="bk-display">Ss Tt Uu Vv<br>Ww Xx Yy Zz</p>' +
      '<figure class="bk-hero"><img src="' + L.hero + '" alt=""></figure>' +
      '<p class="bk-words">' + L.pages + " · " + L.workbookPages + "</p>" + nameRow() + bookFoot(1, total)
    ));
    pages.push(bookSheet(bookHead("A", "Look and listen. Sing along.") + songHTML() + bookFoot(2, total)));
    pages.push(bookSheet(bookHead("A", "Look and find. Talk.") +
      '<p class="bk-section">在动物园里找出这些动物。</p>' + findAnimalsHTML() + bookFoot(3, total)));
    pages.push(bookSheet(bookHead("B", "Listen. Then write.") + triviaHTML() + bookFoot(4, total)));
    pages.push(bookSheet(bookHead("C", "Look! A gift for you!") + giftHTML() + bookFoot(5, total)));
    pages.push(bookSheet(bookHead("D", "Thank you!") + goodbyeHTML() + bookFoot(6, total)));
    pages.push(bookSheet(bookHead("A", "Look at the pictures. Color the pictures Ss through Zz with the same beginning sound.") +
      '<p class="bk-wb-label">Workbook · p.43</p>' + wbColorHTML() + bookFoot(7, total)));
    pages.push(bookSheet(bookHead("B", "Say. Then trace and write.") + wbTraceHTML() + bookFoot(8, total)));
    pages.push(bookSheet(bookHead("C", "Say. Then write Ss through Zz.") + wbWriteGridHTML() + bookFoot(9, total)));
    pages.push(bookSheet(bookHead("D", "Say. Then listen and number the pictures.") + wbNumberHTML() + bookFoot(10, total)));
    pages.push(bookSheet(bookHead("E", "Time to say goodbye! Trace and write.") +
      '<div class="bk-goodbye-write">' + stavePair("Ss", "trace") + stavePair("Zz", "write") + "</div>" + bookFoot(11, total)));
    return pages.join("");
  }

  function buildGames() {
    var ids = ["seal", "tiger", "turtle", "umbrella", "violin", "wolf", "fox", "yak", "zebra", "sun", "watch", "yoyo", "zoo", "octopus", "lion", "kangaroo"];
    return '<div class="sheet-frame"><article class="sheet theme-candy"><div class="rainbow-bar"></div>' +
      '<div class="sh-head"><p class="sh-kicker">Review games</p><h1 class="sh-title">STUVWXYZ 复习图卡</h1></div>' +
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
