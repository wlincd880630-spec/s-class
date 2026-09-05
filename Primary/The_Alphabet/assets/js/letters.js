/**
 * Level 1 The Alphabet · A–Z 课程注册表
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
    J: {
      id: "J",
      pair: "Jj",
      phrase: "jumbo jet",
      live: true,
      folder: "Jj",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Jj/assets/img/hero-jj.jpg"
    },
    K: {
      id: "K",
      pair: "Kk",
      phrase: "kicking kangaroo",
      live: true,
      folder: "Kk",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Kk/assets/img/hero-kk.jpg"
    },
    L: {
      id: "L",
      pair: "Ll",
      phrase: "lazy lion",
      live: true,
      folder: "Ll",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ll/assets/img/hero-ll.jpg"
    },
    M: {
      id: "M",
      pair: "Mm",
      phrase: "merry monkey",
      live: true,
      folder: "Mm",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Mm/assets/img/hero-mm.jpg"
    },
    N: {
      id: "N",
      pair: "Nn",
      phrase: "noisy nut",
      live: true,
      folder: "Nn",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Nn/assets/img/hero-nn.jpg"
    },
    P: {
      id: "P",
      pair: "Pp",
      phrase: "pink peach",
      live: true,
      folder: "Pp",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Pp/assets/img/hero-pp.jpg"
    },
    Q: {
      id: "Q",
      pair: "Qq",
      phrase: "quiet queen",
      live: true,
      folder: "Qq",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Qq/assets/img/hero-qq.jpg"
    },
    R: {
      id: "R",
      pair: "Rr",
      phrase: "racing rabbit",
      live: true,
      folder: "Rr",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Rr/assets/img/hero-rr.jpg"
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
    },
    W: {
      id: "W",
      pair: "Ww",
      phrase: "wise wolf",
      live: true,
      folder: "Ww",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Ww/assets/img/hero-ww.jpg"
    },
    X: {
      id: "X",
      pair: "Xx",
      phrase: "fox in a box",
      live: true,
      folder: "Xx",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Xx/assets/img/hero-xx.jpg"
    },
    Y: {
      id: "Y",
      pair: "Yy",
      phrase: "yellow yo-yo",
      live: true,
      folder: "Yy",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Yy/assets/img/hero-yy.jpg"
    },
    Z: {
      id: "Z",
      pair: "Zz",
      phrase: "zany zebra",
      live: true,
      folder: "Zz",
      hero: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/The_Alphabet/Zz/assets/img/hero-zz.jpg"
    }
  };

  LETTERS.forEach(function (ch) {
    if (!UNITS[ch]) {
      UNITS[ch] = { id: ch, pair: ch + ch.toLowerCase(), phrase: "", live: false, folder: ch + ch.toLowerCase() };
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
    return /\/The_Alphabet\/(ABC|DEF|GHI|JKL|MNO|STUV|WXYZ|STUVWXYZ|ABCDEF|GHIJKL|MNOPQR)\//.test(pathNorm());
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

  function batchPrintUrl() {
    if (inLetterFolder() || inReviewFolder()) return "../batch-print.html";
    return "batch-print.html";
  }

  function liveLetters() {
    return LETTERS.filter(function (ch) {
      return UNITS[ch] && UNITS[ch].live;
    });
  }

  function reviewCourseUrl(folder) {
    if (inReviewFolder()) return "../" + folder + "/learn.html";
    return folder + "/learn.html";
  }

  function reviewPrintCourseUrl(folder) {
    if (inReviewFolder()) return "../" + folder + "/print.html";
    return folder + "/print.html";
  }

  function reviewUrl() { return reviewCourseUrl("ABC"); }
  function defReviewUrl() { return reviewCourseUrl("DEF"); }
  function abcdefReviewUrl() { return reviewCourseUrl("ABCDEF"); }
  function ghiReviewUrl() { return reviewCourseUrl("GHI"); }
  function ghijklReviewUrl() { return reviewCourseUrl("GHIJKL"); }
  function jklReviewUrl() { return reviewCourseUrl("JKL"); }
  function mnoReviewUrl() { return reviewCourseUrl("MNO"); }
  function mnopqrReviewUrl() { return reviewCourseUrl("MNOPQR"); }
  function stuvReviewUrl() { return reviewCourseUrl("STUV"); }
  function wxyzReviewUrl() { return reviewCourseUrl("WXYZ"); }
  function stuvwxyzReviewUrl() { return reviewCourseUrl("STUVWXYZ"); }

  function reviewPrintUrl() { return reviewPrintCourseUrl("ABC"); }
  function defReviewPrintUrl() { return reviewPrintCourseUrl("DEF"); }
  function abcdefReviewPrintUrl() { return reviewPrintCourseUrl("ABCDEF"); }
  function ghiReviewPrintUrl() { return reviewPrintCourseUrl("GHI"); }
  function ghijklReviewPrintUrl() { return reviewPrintCourseUrl("GHIJKL"); }
  function jklReviewPrintUrl() { return reviewPrintCourseUrl("JKL"); }
  function mnoReviewPrintUrl() { return reviewPrintCourseUrl("MNO"); }
  function mnopqrReviewPrintUrl() { return reviewPrintCourseUrl("MNOPQR"); }
  function stuvReviewPrintUrl() { return reviewPrintCourseUrl("STUV"); }
  function wxyzReviewPrintUrl() { return reviewPrintCourseUrl("WXYZ"); }
  function stuvwxyzReviewPrintUrl() { return reviewPrintCourseUrl("STUVWXYZ"); }

  /** 主页字母条：复习课插在对应字母后面 */
  var REVIEWS = [
    { after: "C", folder: "ABC", tag: "U1", title: "Unit 1 复习", sub: "Aa · Bb · Cc", live: true },
    { after: "F", folder: "DEF", tag: "U2", title: "Unit 2 复习", sub: "Dd · Ee · Ff", live: true },
    { after: "F", folder: "ABCDEF", tag: "R1", title: "Review 1", sub: "Aa–Ff · Song", live: true },
    { after: "I", folder: "GHI", tag: "U3", title: "Unit 3 复习", sub: "Gg · Hh · Ii", live: true },
    { after: "L", folder: "JKL", tag: "U4", title: "Unit 4 复习", sub: "Jj · Kk · Ll", live: true },
    { after: "L", folder: "GHIJKL", tag: "R2", title: "Review 2", sub: "Gg–Ll · Song", live: true },
    { after: "O", folder: "MNO", tag: "U5", title: "Unit 5 复习", sub: "Mm · Nn · Oo", live: true },
    { after: "R", folder: "MNOPQR", tag: "R3", title: "Review 3", sub: "Mm–Rr · Song", live: true },
    { after: "V", folder: "STUV", tag: "U7", title: "Unit 7 复习", sub: "Ss–Vv · Story", live: true },
    { after: "Z", folder: "WXYZ", tag: "U8", title: "Unit 8 复习", sub: "Ww–Zz · Story", live: true },
    { after: "Z", folder: "STUVWXYZ", tag: "R4", title: "Review 4", sub: "Ss–Zz · Zoo Song", live: true }
  ];
  function mountRail(el, current) {
    if (!el) return;
    var now = String(current || "A").toUpperCase();
    el.innerHTML = LETTERS.map(function (ch) {
      var u = UNITS[ch];
      var cls = "az-chip" + (ch === now ? " is-on" : "") + (u.live ? " is-live" : " is-soon");
      return '<a class="' + cls + '" href="' + hubUrl(ch) + '">' + ch + "</a>";
    }).join("");
    scrollRailToActive(el);
  }

  function reviewChipHTML(r) {
    return (
      '<a class="az-chip is-review" href="' + reviewCourseUrl(r.folder) + '" title="' + r.title + " · " + r.sub + '">' +
      r.tag + "</a>"
    );
  }

  function mountHubRail(el, current) {
    if (!el) return;
    var now = String(current || "A").toUpperCase();
    var parts = [];
    LETTERS.forEach(function (ch) {
      var u = UNITS[ch];
      var cls = "az-chip" + (ch === now ? " is-on" : "") + (u.live ? " is-live" : " is-soon");
      parts.push('<a class="' + cls + '" href="' + hubUrl(ch) + '">' + ch + "</a>");
      REVIEWS.forEach(function (r) {
        if (r.after === ch && r.live) parts.push(reviewChipHTML(r));
      });
    });
    el.innerHTML = parts.join("");
    scrollRailToActive(el);
  }

  function scrollRailToActive(el) {
    var on = el.querySelector(".az-chip.is-on");
    if (on && on.scrollIntoView) {
      try { on.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" }); }
      catch (err) { on.scrollIntoView(false); }
    }
  }

  global.ALPHABET = {
    LETTERS: LETTERS,
    UNITS: UNITS,
    REVIEWS: REVIEWS,
    onHub: onHub,
    letterFromPath: letterFromPath,
    hubUrl: hubUrl,
    learnUrl: learnUrl,
    gamesUrl: gamesUrl,
    gamePlayUrl: gamePlayUrl,
    workbookUrl: workbookUrl,
    printUrl: printUrl,
    batchPrintUrl: batchPrintUrl,
    liveLetters: liveLetters,
    reviewUrl: reviewUrl,
    defReviewUrl: defReviewUrl,
    abcdefReviewUrl: abcdefReviewUrl,
    reviewPrintUrl: reviewPrintUrl,
    defReviewPrintUrl: defReviewPrintUrl,
    abcdefReviewPrintUrl: abcdefReviewPrintUrl,
    ghiReviewUrl: ghiReviewUrl,
    ghiReviewPrintUrl: ghiReviewPrintUrl,
    mnoReviewUrl: mnoReviewUrl,
    mnoReviewPrintUrl: mnoReviewPrintUrl,
    jklReviewUrl: jklReviewUrl,
    jklReviewPrintUrl: jklReviewPrintUrl,
    ghijklReviewUrl: ghijklReviewUrl,
    ghijklReviewPrintUrl: ghijklReviewPrintUrl,
    mnopqrReviewUrl: mnopqrReviewUrl,
    mnopqrReviewPrintUrl: mnopqrReviewPrintUrl,
    stuvReviewUrl: stuvReviewUrl,
    stuvReviewPrintUrl: stuvReviewPrintUrl,
    wxyzReviewUrl: wxyzReviewUrl,
    wxyzReviewPrintUrl: wxyzReviewPrintUrl,
    stuvwxyzReviewUrl: stuvwxyzReviewUrl,
    stuvwxyzReviewPrintUrl: stuvwxyzReviewPrintUrl,
    reviewCourseUrl: reviewCourseUrl,
    mountRail: mountRail,
    mountHubRail: mountHubRail
  };
})(window);
