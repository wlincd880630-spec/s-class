/**
 * Level 1 The Alphabet · A–Z 课程注册表
 * 主页只进这一课；字母在页内切换，不在首页拆成 26 条链接。
 */
(function (global) {
  "use strict";

  var LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  var UNITS = {
    A: {
      id: "A",
      pair: "Aa",
      phrase: "angry apple",
      live: true,
      folder: "Aa",
      hero: "Aa/assets/img/hero-aa.jpg"
    },
    B: {
      id: "B",
      pair: "Bb",
      phrase: "big bear",
      live: true,
      folder: "Bb",
      hero: "Bb/assets/img/hero-bb.jpg"
    }
  };

  LETTERS.forEach(function (ch) {
    if (!UNITS[ch]) {
      UNITS[ch] = {
        id: ch,
        pair: ch + ch.toLowerCase(),
        phrase: "",
        live: false,
        folder: ch + ch.toLowerCase()
      };
    }
  });

  function pathNorm() {
    var p = location.pathname || "";
    if (p.length > 1 && p.charAt(p.length - 1) === "/") p += "index.html";
    return p;
  }

  function inLetterFolder() {
    return /\/The_Alphabet\/[A-Z][a-z]\//.test(pathNorm());
  }

  function onHub() {
    var p = pathNorm();
    return /\/The_Alphabet$/.test(p.replace(/\/index\.html$/, "")) ||
      /\/The_Alphabet\/index\.html$/.test(p);
  }

  function letterFromPath() {
    var m = pathNorm().match(/\/The_Alphabet\/([A-Z])[a-z]\//);
    return m ? m[1] : "A";
  }

  function hubUrl(ch) {
    var c = String(ch || "A").toUpperCase();
    if (onHub()) return "#" + c;
    if (inLetterFolder()) return "../index.html#" + c;
    return "index.html#" + c;
  }

  function learnUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    return inLetterFolder() ? "learn.html" : u.folder + "/learn.html";
  }

  function gamesUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    return inLetterFolder() ? "games.html" : u.folder + "/games.html";
  }
  function gamePlayUrl(ch, id) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    var file = "game-" + id + ".html";
    return inLetterFolder() ? file : u.folder + "/" + file;
  }

  function workbookUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    return inLetterFolder() ? "workbook.html" : u.folder + "/workbook.html";
  }

  function printUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    return inLetterFolder() ? "print.html" : u.folder + "/print.html";
  }

  function mountRail(el, current) {
    if (!el) return;
    var now = String(current || "A").toUpperCase();
    el.innerHTML = LETTERS.map(function (ch) {
      var u = UNITS[ch];
      var cls = "az-chip" + (ch === now ? " is-on" : "") + (u.live ? " is-live" : " is-soon");
      return '<a class="' + cls + '" href="' + hubUrl(ch) + '">' + ch + "</a>";
    }).join("");
    var on = el.querySelector(".az-chip.is-on");
    if (on && on.scrollIntoView) {
      try {
        on.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" });
      } catch (err) {
        on.scrollIntoView(false);
      }
    }
  }

  global.ALPHABET = {
    LETTERS: LETTERS,
    UNITS: UNITS,
    onHub: onHub,
    letterFromPath: letterFromPath,
    hubUrl: hubUrl,
    learnUrl: learnUrl,
    gamesUrl: gamesUrl,
    gamePlayUrl: gamePlayUrl,
    workbookUrl: workbookUrl,
    printUrl: printUrl,
    mountRail: mountRail
  };
})(window);
