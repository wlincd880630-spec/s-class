/**
 * ABC 复习 · 教具工坊：教材 PDF（Student's Book + Workbook）
 */
(function (global) {
  "use strict";

  var L = window.ABC_REVIEW;
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
  function wordFaces(item) {
    var html = onsetHTML(item);
    return (
      '<div class="lab lab-faces">' +
        '<span class="lab-print">' + html + "</span>" +
        '<span class="lab-hand">' + html + "</span>" +
      "</div>"
    );
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
      '<span class="bk-foot-meta">S-Class · Unit 1 Review · <b>Aa Bb Cc</b></span>' +
      '<span class="bk-foot-page">' + page + " / " + total + "</span>" +
      "</div>"
    );
  }
  function bookSheet(inner) {
    return '<div class="sheet-frame"><article class="sheet book-sheet book-playful">' + inner + "</article></div>";
  }
  function nameRow() {
    return (
      '<div class="name-row">' +
      "<span>Name <i></i></span><span>Class <i></i></span><span>Date <i></i></span>" +
      "</div>"
    );
  }

  function sameSoundHTML() {
    return L.sameSoundBoxes.map(function (box, bi) {
      return (
        '<div class="bk-sound-box is-' + box.tone + '">' +
          box.pics.map(function (id) {
            var item = w(id);
            var sample = box.answer.indexOf(id) !== -1;
            return (
              '<div class="bk-sound-pic' + (sample ? " is-sample" : "") + '">' +
              '<img src="' + item.img + '" alt="' + item.en + '">' +
              "</div>"
            );
          }).join("") +
        "</div>"
      );
    }).join("");
  }

  function listenCircleHTML() {
    return L.listenCircle.map(function (row) {
      var item = w(row.pic);
      var caps = ["A", "B", "C"];
      var lows = ["a", "b", "c"];
      return (
        '<div class="bk-listen-row">' +
          '<figure class="bk-listen-pic"><img src="' + item.img + '" alt="' + item.en + '"></figure>' +
          '<div class="bk-listen-letters">' +
            '<div class="bk-letter-row">' +
              caps.map(function (ch) {
                var on = row.sample && ch === row.cap;
                return '<span class="bk-letter-opt' + (on ? " is-sample" : "") + '">' + ch + "</span>";
              }).join("") +
            "</div>" +
            '<div class="bk-letter-row is-small">' +
              lows.map(function (ch) {
                var on = row.sample && ch === row.small;
                return '<span class="bk-letter-opt' + (on ? " is-sample" : "") + '">' + ch + "</span>";
              }).join("") +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  function writeBlockHTML() {
    return L.writeItems.map(function (row) {
      var item = w(row.id);
      var html = staveHTML(row.letters);
      return (
        '<div class="bk-write-item">' +
          '<figure class="bk-write-sil"><img src="' + item.img + '" alt="" class="is-silhouette"></figure>' +
          (row.modeled
            ? stave(html, "trace", "fs-md", "")
            : stave("", "write", "fs-md", "")) +
        "</div>"
      );
    }).join("");
  }

  function wbSoundGridHTML() {
    return (
      '<div class="bk-wb-grid">' +
        L.wbSoundGrid.map(function (id, i) {
          var item = w(id);
          var sample = L.wbSoundSample.id === id;
          return (
            '<div class="bk-wb-cell">' +
              '<b>' + (i + 1) + "</b>" +
              '<img src="' + item.img + '" alt="">' +
              '<div class="bk-wb-choices">' +
                ["a", "b", "c"].map(function (ch) {
                  var on = sample && ch === L.wbSoundSample.letter;
                  return '<span class="bk-wb-ch' + (on ? " is-sample" : "") + '">' + ch + "</span>";
                }).join("") +
              "</div>" +
            "</div>"
          );
        }).join("") +
      "</div>"
    );
  }

  function wbTraceMatchHTML() {
    return (
      '<div class="bk-trace-match">' +
        '<div class="bk-tm-col">' +
          L.wbTraceMatch.map(function (row) {
            return (
              '<div class="bk-tm-cap' + (row.sample ? " is-sample" : "") + '">' +
                '<div class="bk-tm-trace">' + row.cap + "</div>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
        '<div class="bk-tm-col is-pics">' +
          L.wbTraceMatch.map(function (row) {
            var item = w(row.pic);
            return '<div class="bk-tm-pic"><img src="' + item.img + '" alt=""></div>';
          }).join("") +
        "</div>" +
        '<div class="bk-tm-col">' +
          L.wbTraceMatch.map(function (row) {
            return (
              '<div class="bk-tm-small' + (row.sample ? " is-sample" : "") + '">' +
                '<div class="bk-tm-trace">' + row.small + "</div>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</div>"
    );
  }

  function buildBook() {
    var total = 7;
    var pages = [];
    pages.push(bookSheet(
      '<p class="bk-brand">The Alphabet</p>' +
      '<p class="bk-unit">Unit 1 · Review</p>' +
      '<p class="bk-display">Aa Bb Cc</p>' +
      '<p class="bk-phrase">apple · bear · cat</p>' +
      '<figure class="bk-hero"><img src="' + L.hero + '" alt="Unit 1 Review"></figure>' +
      '<p class="bk-words">Student\'s Book p.10–11 · Workbook p.5</p>' +
      nameRow() +
      bookFoot(1, total)
    ));
    pages.push(bookSheet(
      bookHead("A", "Which ones begin with the same sound? Circle.") +
      '<div class="bk-sound-page">' + sameSoundHTML() + "</div>" +
      bookFoot(2, total)
    ));
    pages.push(bookSheet(
      bookHead("B", "Listen and circle.") +
      '<div class="bk-listen-page">' + listenCircleHTML() + "</div>" +
      bookFoot(3, total)
    ));
    pages.push(bookSheet(
      bookHead("C", "Write.") +
      '<div class="bk-write-page">' + writeBlockHTML() + "</div>" +
      bookFoot(4, total)
    ));
    pages.push(bookSheet(
      bookHead("D", "Story") +
      '<p class="bk-story-hint">Look and listen. Read along.</p>' +
      '<figure class="bk-story"><img src="' + L.story + '" alt="Story"></figure>' +
      '<p class="bk-sight">Sight words: <b>' + L.sightWords.join(" · ") + "</b></p>" +
      bookFoot(5, total)
    ));
    pages.push(bookSheet(
      bookHead("A", "Say. Then circle the beginning sound.") +
      '<p class="bk-wb-label">Workbook · Unit 1 Review</p>' +
      wbSoundGridHTML() +
      bookFoot(6, total)
    ));
    pages.push(bookSheet(
      bookHead("B", "Trace and match.") +
      wbTraceMatchHTML() +
      bookFoot(7, total)
    ));
    return pages.join("");
  }

  function buildGames() {
    var items = L.wbSoundGrid.map(function (id) { return w(id); });
    return (
      '<div class="sheet-frame"><article class="sheet theme-candy">' +
      '<div class="rainbow-bar"></div>' +
      '<div class="sh-head"><div><p class="sh-kicker">Review games</p><h1 class="sh-title">Aa Bb Cc 复习游戏</h1></div></div>' +
      nameRow() +
      '<p style="font-size:14pt;margin:8mm 0;">屏幕练一练请打开 <strong>ABC/games.html</strong>；本页为可打印复习图卡。</p>' +
      '<div class="circle-grid">' +
        items.map(function (item, i) {
          return (
            '<div class="pic-tile t' + (i % 6) + '">' +
            '<img src="' + item.img + '" alt="" style="height:28mm">' +
            '<div class="lab">' + onsetHTML(item) + "</div>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      "</article></div>"
    );
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
      tab.addEventListener("click", function () {
        showPack(tab.getAttribute("data-pack"));
      });
    });
    document.querySelectorAll("[data-export]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        exportPack(btn.getAttribute("data-export"));
      });
    });
    showPack("book");
    window.addEventListener("resize", fitSheets);
  }

  global.AAPrint = { showPack: showPack, exportPack: exportPack };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window);
