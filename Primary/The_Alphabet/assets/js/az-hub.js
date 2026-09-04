(function () {
  "use strict";
  var A = window.ALPHABET;
  var rail = document.getElementById("az-rail");
  var pane = document.getElementById("letter-pane");

  function current() {
    var h = (location.hash || "#A").replace("#", "").toUpperCase();
    return A.UNITS[h] ? h : "A";
  }

  function reviewLinks(ch) {
    var items = [];
    if (ch === "A" || ch === "B" || ch === "C") {
      items.push(
        '<li><a href="' + A.reviewUrl() + '"><span class="n">★</span>' +
        "<div><strong>Unit 1 复习</strong><small>Aa · Bb · Cc · Story</small></div><span class=\"go\">→</span></a></li>"
      );
    }
    if (ch === "D" || ch === "E" || ch === "F") {
      items.push(
        '<li><a href="' + A.defReviewUrl() + '"><span class="n">★</span>' +
        "<div><strong>Unit 2 复习</strong><small>Dd · Ee · Ff · Story</small></div><span class=\"go\">→</span></a></li>"
      );
    }
    if (ch === "G" || ch === "H" || ch === "I") {
      items.push(
        '<li><a href="' + A.ghiReviewUrl() + '"><span class="n">★</span>' +
        "<div><strong>Unit 3 复习</strong><small>Gg · Hh · Ii · Story</small></div><span class=\"go\">→</span></a></li>"
      );
    }
    if (A.UNITS[ch] && A.UNITS[ch].live) {
      items.push(
        '<li><a href="' + A.abcdefReviewUrl() + '"><span class="n">★</span>' +
        "<div><strong>Review 1</strong><small>Aa–Ff · Song · 大富翁</small></div><span class=\"go\">→</span></a></li>"
      );
    }
    if (ch === "M" || ch === "N" || ch === "O") {
      items.push(
        '<li><a href="' + A.mnoReviewUrl() + '"><span class="n">★</span>' +
        "<div><strong>Unit 5 复习</strong><small>Mm · Nn · Oo · Story</small></div><span class=\"go\">→</span></a></li>"
      );
    }
    if (ch === "W" || ch === "X" || ch === "Y" || ch === "Z") {
      items.push(
        '<li><a href="' + A.wxyzReviewUrl() + '"><span class="n">★</span>' +
        "<div><strong>Unit 8 复习</strong><small>Ww · Xx · Yy · Zz · Story</small></div><span class=\"go\">→</span></a></li>"
      );
    }
    if (ch === "S" || ch === "T" || ch === "U" || ch === "V" || ch === "W" || ch === "X" || ch === "Y" || ch === "Z") {
      items.push(
        '<li><a href="' + A.stuvwxyzReviewUrl() + '"><span class="n">★</span>' +
        "<div><strong>Review 4</strong><small>Ss–Zz · Zoo Song · 动物园</small></div><span class=\"go\">→</span></a></li>"
      );
    }
    return items.join("");
  }

  function liveHTML(u) {
    return (
      '<figure class="cover-art">' +
        '<img src="' + u.hero + '" alt="' + u.pair + " " + u.phrase + '" onerror="this.classList.add(\'is-broken\')">' +
      "</figure>" +
      '<div class="cover-copy">' +
        '<p class="kicker">Letter ' + u.pair + " · 字母课</p>" +
        '<p class="cover-aa"><span class="aa-cap">' + u.pair.charAt(0) + '</span><span class="aa-low">' + u.pair.charAt(1) + "</span></p>" +
        '<p class="cover-sub">' + u.phrase + "</p>" +
        '<ol class="flow">' +
          reviewLinks(u.id) +
          "<li>" +
            '<a href="' + A.reviewUrl() + '">' +
              '<span class="n">★</span>' +
              "<div><strong>Unit 1 复习</strong><small>Aa · Bb · Cc · Story</small></div>" +
              '<span class="go">→</span>' +
            "</a>" +
          "</li>" +
          "<li>" +
            '<a href="' + A.learnUrl(u.id) + '">' +
              '<span class="n">01</span>' +
              "<div><strong>学一学</strong><small>字母 · 单词 · 描红</small></div>" +
              '<span class="go">→</span>' +
            "</a>" +
          "</li>" +
          "<li>" +
            '<a href="' + A.gamesUrl(u.id) + '">' +
              '<span class="n">02</span>' +
              "<div><strong>练一练</strong><small>七个游戏</small></div>" +
              '<span class="go">→</span>' +
            "</a>" +
          "</li>" +
          "<li>" +
            '<a href="' + A.workbookUrl(u.id) + '">' +
              '<span class="n">03</span>' +
              "<div><strong>练习册</strong><small>描红 · 圈图 · 涂色</small></div>" +
              '<span class="go">→</span>' +
            "</a>" +
          "</li>" +
          "<li>" +
            '<a href="' + A.printUrl(u.id) + '">' +
              '<span class="n">04</span>' +
              "<div><strong>教具工坊</strong><small>导出纸质 PDF</small></div>" +
              '<span class="go">→</span>' +
            "</a>" +
          "</li>" +
        "</ol>" +
      "</div>"
    );
  }

  function soonHTML(u) {
    return (
      '<div class="soon-pane">' +
        '<p class="kicker">Letter ' + u.pair + "</p>" +
        '<p class="cover-aa">' + u.pair + "</p>" +
        '<p class="cover-sub">即将开放</p>' +
      "</div>"
    );
  }

  function paint() {
    var ch = current();
    if ((location.hash || "") !== "#" + ch) {
      history.replaceState(null, "", "#" + ch);
    }
    A.mountRail(rail, ch);
    var u = A.UNITS[ch];
    document.title = "The Alphabet · " + u.pair;
    if (u.live) {
      pane.className = "cover";
      pane.innerHTML = liveHTML(u);
    } else {
      pane.className = "cover soon";
      pane.innerHTML = soonHTML(u);
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    var i = A.LETTERS.indexOf(current());
    if (e.key === "ArrowLeft" && i > 0) location.hash = A.LETTERS[i - 1];
    if (e.key === "ArrowRight" && i < A.LETTERS.length - 1) location.hash = A.LETTERS[i + 1];
  });
  window.addEventListener("hashchange", paint);
  paint();
})();
