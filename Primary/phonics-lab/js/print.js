(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  function header(title, lesson, sub) {
    return (
      "<div class=\"pdf-head\">" +
      "<img src=\"assets/img/mascot.jpg\" alt=\"\">" +
      "<div class=\"pdf-head-text\">" +
      "<p class=\"pdf-kicker\">S-Class · Oxford Phonics World</p>" +
      "<h2>" +
      title +
      "</h2>" +
      "<p>" +
      lesson.id +
      " · " +
      lesson.title +
      " · " +
      lesson.hours +
      " 课时" +
      (sub ? " · " + sub : "") +
      "</p></div>" +
      "<div class=\"pdf-meta\">姓名 ________<br>日期 ________</div></div>"
    );
  }

  function sheet(inner, tone) {
    return "<section class=\"sheet pdf-sheet" + (tone ? " " + tone : "") + "\">" + inner + "</section>";
  }

  function fourLine() {
    return "<div class=\"pdf-lines\"></div>";
  }

  function wordCard(w, i) {
    return (
      "<div class=\"pdf-word\">" +
      "<span class=\"pdf-n\">" +
      (i + 1) +
      "</span>" +
      "<img src=\"" +
      Lab.img(w.img) +
      "\" alt=\"\">" +
      "<div><b>" +
      w.word +
      "</b><span>" +
      (w.zh || "") +
      "</span>" +
      fourLine() +
      "</div></div>"
    );
  }

  function render() {
    var id = $("lessonSel").value;
    var lesson = PHONICS_LESSON_MAP[id];
    var words = Lab.wordObjs(lesson.words);
    var sight = Lab.sightObjs(lesson.sight);
    var text = phonicsText(lesson.id);
    var html = "";

    html += sheet(
      header("课后作业", lesson, "Home") +
        "<div class=\"pdf-hero\">" +
        "<p class=\"pdf-focus\">" +
        (lesson.focus ? lesson.focus.title + " · " + lesson.focus.sound : "") +
        "</p>" +
        "<ol class=\"pdf-hw\">" +
        (lesson.homework || [])
          .map(function (h) {
            return "<li><i></i>" + h.text + "</li>";
          })
          .join("") +
        "</ol></div>" +
        "<p class=\"pdf-label\">四线格抄写</p>" +
        fourLine() +
        fourLine() +
        fourLine() +
        "<div class=\"pdf-sign\">家长签字 ________　　用时 ______ 分钟　　朗读 □ 抄写 □</div>",
      "sun"
    );

    if (lesson.letters && lesson.letters.length) {
      var packs = phonicsLetters(lesson.letters);
      html += sheet(
        header("字母口诀", lesson, "A Listen") +
          "<div class=\"pdf-alpha\">" +
          packs
            .map(function (p) {
              return (
                "<div class=\"pdf-alpha-cell\"><img src=\"" +
                Lab.img(p.img) +
                "\" alt=\"\"><b>" +
                p.letters +
                "</b><span>" +
                p.mnemonic +
                "</span></div>"
              );
            })
            .join("") +
          "</div>"
      );
      packs.slice(0, 4).forEach(function (p) {
        var vocab = Lab.wordObjs(p.words);
        html += sheet(
          header(p.letters + " · 指读", lesson, "B Point") +
            "<p class=\"pdf-label\">Listen, point, and say.  " +
            p.mnemonic +
            "</p>" +
            "<div class=\"pdf-4\">" +
            vocab
              .map(function (w, i) {
                return (
                  "<div class=\"pdf-pic-card\"><span>" +
                  (i + 1) +
                  "</span><img src=\"" +
                  Lab.img(w.img) +
                  "\" alt=\"\"><b>" +
                  w.word +
                  "</b></div>"
                );
              })
              .join("") +
            "</div>" +
            "<p class=\"pdf-label\">描红</p>" +
            "<div class=\"pdf-trace-big\">" +
            p.letters[0] +
            "　" +
            p.letters[1] +
            "</div>" +
            fourLine()
        );
      });
    }

    html += sheet(
      header("看图拼写", lesson, "Blend") +
        "<div class=\"pdf-words\">" +
        words.map(wordCard).join("") +
        "</div>"
    );

    html += sheet(
      header("听辨 · 首 / 中 / 尾", lesson, "Listen") +
        "<p class=\"pdf-label\">教师读单词。学生圈出听到的字母。</p>" +
        ["首字母", "中间字母", "尾字母"]
          .map(function (kind, k) {
            return (
              "<div class=\"pdf-listen-block\"><h3>" +
              kind +
              "</h3>" +
              words
                .slice(0, 6)
                .map(function (w, i) {
                  var letters = "abcdefghijklmnopqrstuvwxyz".split("").slice(k * 4, k * 4 + 4);
                  if (w.graphemes && w.graphemes[k === 2 ? w.graphemes.length - 1 : k === 0 ? 0 : 1]) {
                    letters[0] = w.graphemes[k === 2 ? w.graphemes.length - 1 : k === 0 ? 0 : Math.floor((w.graphemes.length - 1) / 2)];
                  }
                  return (
                    "<div class=\"pdf-listen-row\"><img src=\"" +
                    Lab.img(w.img) +
                    "\" alt=\"\"><span>" +
                    (i + 1) +
                    "</span>" +
                    letters
                      .map(function (ch) {
                        return "<i>" + ch + "</i>";
                      })
                      .join("") +
                    "</div>"
                  );
                })
                .join("") +
              "</div>"
            );
          })
          .join("")
    );

    if (sight.length) {
      html += sheet(
        header("奇形词", lesson, "Heart Words") +
          "<div class=\"pdf-sight\">" +
          sight
            .map(function (s) {
              return (
                "<div class=\"pdf-sight-card\"><b>" +
                s.word +
                "</b><span>" +
                s.ipa +
                " · " +
                s.zh +
                "</span>" +
                fourLine() +
                "</div>"
              );
            })
            .join("") +
          "</div>"
      );
    }

    html += sheet(
      header("听写", lesson, "Write") +
        "<div class=\"pdf-dict\">" +
        words
          .map(function (w, i) {
            return "<div class=\"pdf-dict-cell\"><span>" + (i + 1) + "</span>" + fourLine() + "</div>";
          })
          .join("") +
        "</div>"
    );

    html += sheet(
      header("图词连线", lesson, "Match") +
        "<div class=\"pdf-match\">" +
        "<div>" +
        words
          .map(function (w) {
            return (
              "<div class=\"pdf-match-pic\"><img src=\"" +
              Lab.img(w.img) +
              "\" alt=\"\"><span></span></div>"
            );
          })
          .join("") +
        "</div><div>" +
        Lab.shuffle(words.slice())
          .map(function (w) {
            return "<div class=\"pdf-match-word\">" + w.word + "</div>";
          })
          .join("") +
        "</div></div>"
    );

    html += sheet(
      header("句子 · " + text.passage.title, lesson, "Read") +
        "<p class=\"pdf-label\">" +
        text.passage.titleZh +
        " · 点读后抄写</p>" +
        text.sentences
          .map(function (s) {
            return (
              "<div class=\"pdf-sent\"><img src=\"" +
              Lab.img(s.img) +
              "\" alt=\"\"><div><b>" +
              s.en +
              "</b><span>" +
              s.zh +
              "</span>" +
              fourLine() +
              "</div></div>"
            );
          })
          .join("")
    );

    html += sheet(
      header("对话 · " + text.talk.title, lesson, "Talk") +
        "<p class=\"pdf-label\">" +
        (text.talk.scene || "") +
        " · 一人当 A，一人当 B</p>" +
        text.talk.lines
          .map(function (ln) {
            return (
              "<div class=\"pdf-talk\"><b class=\"" +
              (ln.role === "A" ? "a" : "b") +
              "\">" +
              ln.role +
              "</b><div><strong>" +
              ln.en +
              "</strong><span>" +
              ln.zh +
              "</span></div></div>"
            );
          })
          .join("") +
        "<div class=\"pdf-sign\">表演 □　　家长签字 ________</div>"
    );

    $("printArea").innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!$("lessonSel")) return;
    $("lessonSel").innerHTML = PHONICS_LESSONS.map(function (item) {
      return "<option value=\"" + item.id + "\">" + item.id + " · " + item.title + "</option>";
    }).join("");
    var preset = Lab.qs("id");
    if (preset && PHONICS_LESSON_MAP[preset]) $("lessonSel").value = preset;
    $("lessonSel").addEventListener("change", render);
    $("btnPrint").addEventListener("click", function () {
      window.print();
    });
    render();
  });
})();
