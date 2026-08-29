(function () {
  "use strict";

  var lesson;
  var content = "letter";
  var mode = "iDo";
  var packIndex = 0;
  var activity = "A";
  var listenKind = "first";
  var storyPage = 0;
  var groupScore = { a: 0, b: 0 };
  var groupTurn = "a";
  var flipped = {};
  var quiz = null;

  var STEPS = [
    { id: "letter", label: "字母" },
    { id: "blend", label: "拼读" },
    { id: "listen", label: "听辨" },
    { id: "story", label: "故事" },
    { id: "sentence", label: "句子" },
    { id: "talk", label: "对话" },
    { id: "homework", label: "作业" }
  ];
  var ACTS = [
    { id: "A", label: "A 听读" },
    { id: "B", label: "B 指读" },
    { id: "C", label: "C 描红" },
    { id: "D", label: "D 打叉" },
    { id: "E", label: "E 歌谣" }
  ];
  var LISTENS = [
    { id: "first", label: "首字母" },
    { id: "middle", label: "中间字母" },
    { id: "last", label: "尾字母" },
    { id: "mark", label: "听辨打叉" }
  ];

  function $(id) {
    return document.getElementById(id);
  }

  function packs() {
    return lesson.letters ? phonicsLetters(lesson.letters) : [];
  }

  function pack() {
    return packs()[packIndex] || packs()[0] || null;
  }

  function wordOf(id) {
    return phonicsGetWord(id) || {
      id: id,
      word: id,
      zh: "",
      ipa: "",
      img: id,
      img2: id,
      graphemes: String(id).split("")
    };
  }

  function flipSrc(w, key) {
    return flipped[key] ? Lab.img(w.img2 || w.img) : Lab.img(w.img);
  }

  function card(w, n, extra) {
    var key = w.word;
    return (
      "<div class=\"vocab-card\" data-vocab=\"" +
      w.word +
      "\">" +
      (n ? "<span class=\"vocab-num\">" + n + "</span>" : "") +
      Lab.pic(flipSrc(w, key), "pic", w.zh) +
      "<h3>" +
      w.word +
      "</h3>" +
      "<p class=\"muted\">" +
      (w.zh || "") +
      (w.ipa ? " · " + w.ipa : "") +
      "</p>" +
      (extra || "") +
      "</div>"
    );
  }

  function bindCards(root) {
    root.querySelectorAll("[data-vocab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-vocab");
        Lab.playWord(id);
        btn.classList.add("active");
        setTimeout(function () {
          btn.classList.remove("active");
        }, 400);
      });
    });
    root.querySelectorAll("[data-flip]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var id = btn.getAttribute("data-flip");
        flipped[id] = !flipped[id];
        render();
      });
    });
  }

  function teacherNote() {
    return "<p class=\"teacher-note\">音素由教师示范 · 点图只听单词</p>";
  }

  function init() {
    var id = Lab.qs("id", "L01");
    lesson = PHONICS_LESSON_MAP[id] || PHONICS_LESSONS[0];
    content = Lab.qs("content", lesson.type === "letters" || lesson.letters ? "letter" : "blend");
    if (content === "word") content = "blend";
    renderChrome();
    bind();
    render();
  }

  function renderChrome() {
    var st = PHONICS_STAGES[lesson.stage - 1];
    $("lessonTitle").textContent = lesson.title;
    $("lessonKicker").textContent = lesson.id + " · " + lesson.hours + "h · " + st.title;
    $("lessonJump").innerHTML = PHONICS_LESSONS.map(function (item) {
      return (
        "<option value=\"" +
        item.id +
        "\"" +
        (item.id === lesson.id ? " selected" : "") +
        ">" +
        item.id +
        " " +
        item.title +
        "</option>"
      );
    }).join("");
    $("progressHint").textContent = Lab.completedCount() + " / 30";
  }

  function bind() {
    $("lessonJump").onchange = function () {
      location.href = "course.html?id=" + this.value;
    };
    $("markDone").onclick = function () {
      Lab.markLesson(lesson.id, { mode: mode });
      Lab.toast("已记入进度");
      renderChrome();
    };
    document.querySelectorAll("[data-content]").forEach(function (btn) {
      btn.onclick = function () {
        content = btn.getAttribute("data-content");
        quiz = null;
        render();
      };
    });
    document.querySelectorAll("[data-mode]").forEach(function (btn) {
      btn.onclick = function () {
        mode = btn.getAttribute("data-mode");
        quiz = null;
        render();
      };
    });
  }

  function render() {
    document.querySelectorAll("[data-content]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-content") === content);
    });
    document.querySelectorAll("[data-mode]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === mode);
    });
    $("modeNav").hidden = content === "homework";
    if (mode === "games" && content !== "homework") return renderGames();
    renderSubnav();
    if (content === "letter") return renderLetter();
    if (content === "blend") return renderBlend();
    if (content === "listen") return renderListen();
    if (content === "story") return renderStory();
    if (content === "sentence") return renderSentence();
    if (content === "talk") return renderTalk();
    return renderHomework();
  }

  function chipRow(items, current, attr) {
    return (
      "<div class=\"chip-row\">" +
      items
        .map(function (it) {
          var id = it.id || it;
          var label = it.label || it.letters || it;
          return (
            "<button class=\"chip" +
            (String(current) === String(id) ? " active" : "") +
            "\" type=\"button\" data-" +
            attr +
            "=\"" +
            id +
            "\">" +
            label +
            "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderSubnav() {
    var html = "";
    if (content === "letter" && packs().length) {
      html += chipRow(
        packs().map(function (p) {
          return { id: p.id, label: p.letters };
        }),
        pack() && pack().id,
        "pack"
      );
      html += chipRow(ACTS, activity, "act");
    }
    if (content === "listen") html += chipRow(LISTENS, listenKind, "listen");
    $("subnav").innerHTML = html;
    $("subnav").querySelectorAll("[data-pack]").forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute("data-pack");
        packs().forEach(function (p, i) {
          if (p.id === id) packIndex = i;
        });
        render();
      };
    });
    $("subnav").querySelectorAll("[data-act]").forEach(function (b) {
      b.onclick = function () {
        activity = b.getAttribute("data-act");
        render();
      };
    });
    $("subnav").querySelectorAll("[data-listen]").forEach(function (b) {
      b.onclick = function () {
        listenKind = b.getAttribute("data-listen");
        quiz = null;
        render();
      };
    });
  }

  function renderLetter() {
    var p = pack();
    if (!p) {
      $("stage").innerHTML = "<p class=\"lede\">本课从拼读开始。</p>";
      content = "blend";
      return render();
    }
    if (activity === "B") return renderB(p);
    if (activity === "C") return renderC(p);
    if (activity === "D") return renderD(p);
    if (activity === "E") return renderE(p);
    return renderA(p);
  }

  function renderA(p) {
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>" +
      p.letters +
      "</b> " +
      p.sound +
      " · " +
      p.mnemonic +
      "</div>" +
      teacherNote() +
      "<div class=\"hero-card\">" +
      Lab.pic(Lab.img(p.img), "pic xl", p.mnemonicZh) +
      "<h2>" +
      p.mnemonic +
      "</h2>" +
      "<p>" +
      p.mnemonicZh +
      "</p>" +
      "<p class=\"muted\">" +
      p.tip +
      "</p>" +
      "<div class=\"btn-row\">" +
      "<button class=\"btn teal\" id=\"sayWord\" type=\"button\">听口诀单词</button>" +
      "</div></div>";
    $("sayWord").onclick = function () {
      Lab.playWord(p.mnemonic);
    };
  }

  function renderB(p) {
    var words = p.words.map(wordOf);
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>" +
      p.letters +
      "</b> Listen, point, and say.</div>" +
      (mode === "iDo" ? teacherNote() : "") +
      "<div class=\"vocab-grid\">" +
      words
        .map(function (w, i) {
          return card(w, i + 1, "<span class=\"mini\" data-flip=\"" + w.word + "\">换图</span>");
        })
        .join("") +
      "</div>" +
      "<div class=\"btn-row\"><button class=\"btn teal\" id=\"playAll\" type=\"button\">四个词连听</button></div>";
    bindCards($("stage"));
    $("playAll").onclick = function () {
      var i = 0;
      function next() {
        if (i >= words.length) return;
        Lab.playWord(words[i].word);
        i += 1;
        setTimeout(next, 1400);
      }
      next();
    };
  }

  function renderC(p) {
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>" +
      p.letters +
      "</b> Trace.</div>" +
      "<div class=\"trace-card\"><div class=\"trace-letter\">" +
      p.letters +
      "</div><div class=\"trace-lines\"></div><div class=\"trace-lines\"></div><div class=\"trace-lines\"></div></div>" +
      "<p class=\"muted\">四线格抄写 · 教师先范写</p>";
  }

  function renderD(p) {
    var items = (p.mark || []).map(function (m) {
      return { w: wordOf(m.word), hit: m.hit };
    });
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>" +
      p.letters +
      "</b> Listen and cross.</div>" +
      "<div class=\"vocab-grid mark-grid\">" +
      items
        .map(function (it, i) {
          return (
            "<button class=\"vocab-card\" type=\"button\" data-mark=\"" +
            i +
            "\">" +
            Lab.pic(Lab.img(it.w.img), "pic", it.w.zh) +
            "<strong>" +
            it.w.word +
            "</strong></button>"
          );
        })
        .join("") +
      "</div>" +
      "<div class=\"btn-row\"><button class=\"btn sun\" id=\"playMark\" type=\"button\">听首音词</button></div>";
    $("stage").querySelectorAll("[data-mark]").forEach(function (b) {
      b.onclick = function () {
        var it = items[parseInt(b.getAttribute("data-mark"), 10)];
        if (it.hit) {
          b.classList.add("ok");
          Lab.playWord(it.w.word);
          if (mode === "group") {
            groupScore[groupTurn] += 1;
            Lab.toast("对 +1");
          }
        } else {
          b.classList.add("cross");
          Lab.toast("打叉");
        }
      };
    });
    $("playMark").onclick = function () {
      var hits = items.filter(function (it) {
        return it.hit;
      });
      Lab.playWord(hits[Math.floor(Math.random() * hits.length)].w.word);
    };
  }

  function renderE(p) {
    var words = (p.chant || p.words).map(wordOf);
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>" +
      p.letters +
      "</b> Chant.</div>" +
      "<div class=\"chant-row\">" +
      words
        .map(function (w, i) {
          return card(w, i + 1);
        })
        .join("") +
      "</div>" +
      "<div class=\"btn-row\"><button class=\"btn teal\" id=\"chant\" type=\"button\">▶ 歌谣</button></div>";
    bindCards($("stage"));
    $("chant").onclick = function () {
      var i = 0;
      function next() {
        if (i >= words.length) return;
        Lab.playWord(words[i].word);
        i += 1;
        setTimeout(next, 1100);
      }
      next();
    };
  }

  function renderBlend() {
    var fam = lesson.families || [];
    var words = Lab.wordObjs(lesson.words);
    if (!words.length) words = (lesson.chant || []).map(wordOf);
    var html =
      "<div class=\"opw-banner\"><b>拼读</b> " +
      ((lesson.focus && lesson.focus.tip) || "") +
      "</div>" +
      teacherNote();
    if (fam.length) {
      fam.forEach(function (f) {
        html +=
          "<h3 class=\"section-title\">-" +
          f.id +
          "</h3><div class=\"vocab-grid\">" +
          f.words
            .map(function (id, i) {
              return card(wordOf(id), i + 1, "<span class=\"mini\" data-flip=\"" + id + "\">换图</span>");
            })
            .join("") +
          "</div>";
      });
    } else {
      html +=
        "<div class=\"vocab-grid\">" +
        words
          .map(function (w, i) {
            return card(w, i + 1, "<span class=\"mini\" data-flip=\"" + w.word + "\">换图</span>");
          })
          .join("") +
        "</div>";
    }
    html +=
      "<div class=\"btn-row\"><button class=\"btn teal\" id=\"playBlend\" type=\"button\">听单词</button></div>";
    $("stage").innerHTML = html;
    bindCards($("stage"));
    $("playBlend").onclick = function () {
      var w = words[Math.floor(Math.random() * words.length)];
      if (w) Lab.playWord(w.word);
    };
  }

  function letterOf(w, kind) {
    var g = w.graphemes && w.graphemes.length ? w.graphemes : String(w.word).split("");
    if (kind === "first") return g[0];
    if (kind === "last") return g[g.length - 1];
    return g[Math.floor((g.length - 1) / 2)] || g[0];
  }

  function renderListen() {
    if (listenKind === "mark") {
      var p = pack() || { letters: "Listen", mark: (lesson.words || []).slice(0, 6).map(function (id, i) {
        return { word: id, hit: i % 2 === 0 };
      }) };
      return renderD(p);
    }
    var pool = Lab.wordObjs(lesson.words);
    if (pool.length < 3) pool = PHONICS_WORDS.slice(0, 20);
    if (!quiz) {
      var ans = pool[Math.floor(Math.random() * pool.length)];
      var right = letterOf(ans, listenKind);
      var opts = [right];
      "abcdefghijklmnopqrstuvwxyz".split("").forEach(function (ch) {
        if (opts.length < 4 && opts.indexOf(ch) === -1) opts.push(ch);
      });
      quiz = { word: ans, answer: right, opts: Lab.shuffle(opts).slice(0, 4) };
    }
    var title = listenKind === "first" ? "听词，点首字母" : listenKind === "last" ? "听词，点尾字母" : "听词，点中间字母";
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>听辨</b> " +
      title +
      (mode === "group" ? " · " + groupTurn.toUpperCase() + "队 " + groupScore.a + ":" + groupScore.b : "") +
      "</div>" +
      "<div class=\"hero-card\">" +
      Lab.pic(Lab.img(quiz.word.img), "pic lg", "") +
      "<div class=\"btn-row\"><button class=\"btn teal\" id=\"playQ\" type=\"button\">▶ 听单词</button></div>" +
      "<div class=\"letter-opts\" id=\"opts\"></div></div>";
    var box = $("opts");
    quiz.opts.forEach(function (ch) {
      var b = document.createElement("button");
      b.className = "letter-opt";
      b.type = "button";
      b.textContent = ch;
      b.onclick = function () {
        if (ch === quiz.answer) {
          Lab.toast("对了");
          Lab.playWord(quiz.word.word);
          if (mode === "group") groupScore[groupTurn] += 1;
          quiz = null;
          setTimeout(render, 700);
        } else Lab.toast("再听一次");
      };
      box.appendChild(b);
    });
    $("playQ").onclick = function () {
      Lab.playWord(quiz.word.word);
    };
    setTimeout(function () {
      Lab.playWord(quiz.word.word);
    }, 350);
  }

  function renderStory() {
    var t = phonicsText(lesson.id);
    var pages = (t.passage.sentences || []).map(function (en, i) {
      return { en: en, zh: "", img: (t.sentences[i] && t.sentences[i].img) || t.passage.img };
    });
    if (!pages.length) pages = [{ en: t.passage.title, zh: t.passage.titleZh, img: t.passage.img }];
    if (storyPage >= pages.length) storyPage = 0;
    var pg = pages[storyPage];
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>" +
      t.passage.title +
      "</b> " +
      (t.passage.titleZh || "") +
      " · " +
      (storyPage + 1) +
      "/" +
      pages.length +
      "</div>" +
      "<div class=\"hero-card\">" +
      Lab.pic(Lab.img(pg.img), "pic xl", "") +
      "<h2>" +
      pg.en +
      "</h2>" +
      "<div class=\"btn-row\">" +
      "<button class=\"btn ghost\" id=\"prevP\" type=\"button\">上一页</button>" +
      "<button class=\"btn teal\" id=\"sayP\" type=\"button\">听句子</button>" +
      "<button class=\"btn ghost\" id=\"nextP\" type=\"button\">下一页</button>" +
      "</div></div>";
    $("sayP").onclick = function () {
      Lab.playSentence(pg.en);
    };
    $("prevP").onclick = function () {
      storyPage = (storyPage + pages.length - 1) % pages.length;
      render();
    };
    $("nextP").onclick = function () {
      storyPage = (storyPage + 1) % pages.length;
      render();
    };
  }

  function renderSentence() {
    var t = phonicsText(lesson.id);
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>句子</b> 点一层听一句</div>" +
      t.sentences
        .map(function (s, i) {
          return (
            "<div class=\"sent-block\">" +
            Lab.pic(Lab.img(s.img), "pic sm", "") +
            "<div>" +
            (window.Pyramid ? Pyramid.html(s.en, { zh: s.zh }) : "<p>" + s.en + "</p>") +
            "</div></div>"
          );
        })
        .join("");
    $("stage").querySelectorAll("[data-layer]").forEach(function (btn) {
      btn.onclick = function () {
        Lab.playSentence(btn.getAttribute("data-text") || btn.textContent);
      };
    });
  }

  function renderTalk() {
    var t = phonicsText(lesson.id).talk;
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>" +
      t.title +
      "</b> " +
      (t.titleEn || "") +
      "</div>" +
      "<div class=\"talk-list\">" +
      t.lines
        .map(function (ln) {
          return (
            "<button class=\"talk-line\" type=\"button\" data-say=\"" +
            ln.en.replace(/"/g, "&quot;") +
            "\"><b>" +
            ln.role +
            "</b> " +
            ln.en +
            "<span class=\"muted\">" +
            ln.zh +
            "</span></button>"
          );
        })
        .join("") +
      "</div>" +
      "<div class=\"btn-row\"><button class=\"btn teal\" id=\"playTalk\" type=\"button\">听整段</button></div>";
    $("stage").querySelectorAll("[data-say]").forEach(function (b) {
      b.onclick = function () {
        Lab.playSentence(b.getAttribute("data-say"));
      };
    });
    $("playTalk").onclick = function () {
      var i = 0;
      function next() {
        if (i >= t.lines.length) return;
        Lab.playSentence(t.lines[i].en);
        i += 1;
        setTimeout(next, 2200);
      }
      next();
    };
  }

  function renderHomework() {
    var list = lesson.homework || [];
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>课后作业</b></div>" +
      "<ol class=\"hw-list\">" +
      list
        .map(function (h) {
          return "<li><label><input type=\"checkbox\"> " + h.text + "</label></li>";
        })
        .join("") +
      "</ol>" +
      "<h3 class=\"section-title\">抄写</h3>" +
      "<div class=\"trace-lines\"></div><div class=\"trace-lines\"></div><div class=\"trace-lines\"></div>" +
      "<div class=\"btn-row\">" +
      "<a class=\"btn sun\" href=\"print.html?id=" +
      lesson.id +
      "\">打开精美作业 PDF</a>" +
      "<a class=\"btn teal\" href=\"games.html?lesson=" +
      lesson.id +
      "\">复习游戏</a>" +
      "</div>";
  }

  function renderGames() {
    $("subnav").innerHTML = "";
    var id = lesson.id;
    $("stage").innerHTML =
      "<div class=\"opw-banner\"><b>复习游戏</b></div>" +
      "<div class=\"game-launch\">" +
      [
        ["point", "听音指图"],
        ["first", "听词点首字母"],
        ["middle", "听词点中间字母"],
        ["last", "听词点尾字母"],
        ["mark", "听辨打叉"],
        ["race", "小组抢答"],
        ["chant", "歌谣点读"]
      ]
        .map(function (g) {
          return (
            "<a class=\"btn teal\" href=\"play.html?game=" +
            g[0] +
            "&lesson=" +
            id +
            "\">" +
            g[1] +
            "</a>"
          );
        })
        .join("") +
      "</div>";
  }

  document.addEventListener("DOMContentLoaded", init);
})();
