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
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Aa/assets/img/hero-aa.jpg"
    },
    B: {
      id: "B",
      pair: "Bb",
      phrase: "big bear",
      live: true,
      folder: "Bb",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Bb/assets/img/hero-bb.jpg"
    },
    C: {
      id: "C",
      pair: "Cc",
      phrase: "cool cat",
      live: true,
      folder: "Cc",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Cc/assets/img/hero-cc.jpg"
    },
    D: {
      id: "D",
      pair: "Dd",
      phrase: "dizzy dog",
      live: true,
      folder: "Dd",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Dd/assets/img/hero-dd.jpg"
    },
    E: {
      id: "E",
      pair: "Ee",
      phrase: "energetic egg",
      live: true,
      folder: "Ee",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ee/assets/img/hero-ee.jpg"
    },
    F: {
      id: "F",
      pair: "Ff",
      phrase: "funny fish",
      live: true,
      folder: "Ff",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ff/assets/img/hero-ff.jpg"
    },
    G: {
      id: "G",
      pair: "Gg",
      phrase: "good gorilla",
      live: true,
      folder: "Gg",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Gg/assets/img/hero-gg.jpg"
    },
    H: {
      id: "H",
      pair: "Hh",
      phrase: "happy horse",
      live: true,
      folder: "Hh",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Hh/assets/img/hero-hh.jpg"
    },
    I: {
      id: "I",
      pair: "Ii",
      phrase: "interesting insect",
      live: true,
      folder: "Ii",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ii/assets/img/hero-ii.jpg"
    },
    S: {
      id: "S",
      pair: "Ss",
      phrase: "super seal",
      live: true,
      folder: "Ss",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ss/assets/img/hero-ss.jpg"
    },
    T: {
      id: "T",
      pair: "Tt",
      phrase: "tall turtle",
      live: true,
      folder: "Tt",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Tt/assets/img/hero-tt.jpg"
    },
    U: {
      id: "U",
      pair: "Uu",
      phrase: "unhappy umbrella",
      live: true,
      folder: "Uu",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Uu/assets/img/hero-uu.jpg"
    },
    V: {
      id: "V",
      pair: "Vv",
      phrase: "violet van",
      live: true,
      folder: "Vv",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Vv/assets/img/hero-vv.jpg"
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

  function inReviewFolder() {
    return /\/The_Alphabet\/(ABC|DEF|GHI|JKL|GHIJKL|ABCDEF|MNO)\//.test(pathNorm());
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
    if (inLetterFolder() || inReviewFolder()) return "../index.html#" + c;
    return "index.html#" + c;
  }

  function learnUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    if (inLetterFolder()) return "learn.html";
    if (inReviewFolder()) return "../" + u.folder + "/learn.html";
    return u.folder + "/learn.html";
  }

  function gamesUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    if (inLetterFolder()) return "games.html";
    if (inReviewFolder()) return "../" + u.folder + "/games.html";
    return u.folder + "/games.html";
  }
  function gamePlayUrl(ch, id) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    var file = "game-" + id + ".html";
    if (inLetterFolder()) return file;
    if (inReviewFolder()) return "../" + u.folder + "/" + file;
    return u.folder + "/" + file;
  }

  function workbookUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    if (inLetterFolder()) return "workbook.html";
    if (inReviewFolder()) return "../" + u.folder + "/workbook.html";
    return u.folder + "/workbook.html";
  }

  function printUrl(ch) {
    var u = UNITS[ch];
    if (!u || !u.live) return hubUrl(ch);
    if (inLetterFolder()) return "print.html";
    if (inReviewFolder()) return "../" + u.folder + "/print.html";
    return u.folder + "/print.html";
  }

  function reviewUrl() {
    return inReviewFolder() ? "../ABC/learn.html" : "ABC/learn.html";
  }

  function mnoReviewUrl() {
    return inReviewFolder() ? "../MNO/learn.html" : "MNO/learn.html";
  }

  function reviewPrintUrl() {
    return inReviewFolder() ? "../ABC/print.html" : "ABC/print.html";
  }

  function mnoReviewPrintUrl() {
    return inReviewFolder() ? "../MNO/print.html" : "MNO/print.html";
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
    reviewUrl: reviewUrl,
    mnoReviewUrl: mnoReviewUrl,
    reviewPrintUrl: reviewPrintUrl,
    mnoReviewPrintUrl: mnoReviewPrintUrl,
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
