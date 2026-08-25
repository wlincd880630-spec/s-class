(function () {
  "use strict";

  var lesson;
  var mode = "iDo";
  var method = "sound";
  var revealed = false;
  var currentWordIndex = 0;
  var groupScore = { a: 0, b: 0 };
  var groupTurn = "a";
  var quizItem = null;

  function $(id) {
    return document.getElementById(id);
  }

  function init() {
    var id = Lab.qs("id", "L01");
    lesson = PHONICS_LESSON_MAP[id] || PHONICS_LESSONS[0];
    method = Lab.qs("method", "sound") === "picture" ? "picture" : "sound";
    renderChrome();
    bind();
    render();
  }

  function renderChrome() {
    var stage = PHONICS_STAGES[lesson.stage - 1];
    $("lessonKicker").textContent = "第 " + lesson.hours + " 课时 · 阶段 " + lesson.stage + " · " + stage.title;
    $("lessonTitle").textContent = lesson.title;
    $("lessonEn").textContent = lesson.titleEn;
    $("ruleBox").innerHTML =
      "<strong>" +
      lesson.ruleName +
      "</strong><p>" +
      lesson.rule +
      "</p>";
    var sel = $("lessonJump");
    sel.innerHTML = PHONICS_LESSONS.map(function (item) {
      return (
        "<option value=\"" +
        item.id +
        "\"" +
        (item.id === lesson.id ? " selected" : "") +
        ">" +
        item.id +
        " · " +
        item.title +
        "</option>"
      );
    }).join("");
  }

  function bind() {
    $("lessonJump").addEventListener("change", function () {
      location.href = "course.html?id=" + this.value + "&method=" + method;
    });
    document.querySelectorAll("[data-mode]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-mode");
        revealed = false;
        currentWordIndex = 0;
        quizItem = null;
        render();
      });
    });
    document.querySelectorAll("[data-method]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        method = btn.getAttribute("data-method");
        revealed = false;
        render();
      });
    });
    $("prevWord").addEventListener("click", function () {
      var words = Lab.wordObjs(lesson.words);
      currentWordIndex = (currentWordIndex + words.length - 1) % words.length;
      revealed = false;
      render();
    });
    $("nextWord").addEventListener("click", function () {
      var words = Lab.wordObjs(lesson.words);
      currentWordIndex = (currentWordIndex + 1) % words.length;
      revealed = false;
      render();
    });
    $("markDone").addEventListener("click", function () {
      Lab.markLesson(lesson.id, { mode: mode });
      Lab.toast("本课已记入进度");
      $("progressHint").textContent = "已完成 " + Lab.completedCount() + " / 30 课";
    });
  }

  function render() {
    document.querySelectorAll("[data-mode]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === mode);
    });
    document.querySelectorAll("[data-method]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-method") === method);
    });
    $("progressHint").textContent = "已完成 " + Lab.completedCount() + " / 30 课";
    if (mode === "iDo") renderIDo();
    else if (mode === "weDo") renderWeDo();
    else if (mode === "group") renderGroup();
    else renderIndependent();
  }

  function phonemeRow() {
    return Lab.phonemeObjs(lesson.phonemes)
      .map(function (p) {
        return (
          "<button class=\"phoneme-chip\" type=\"button\" data-ph=\"" +
          p.id +
          "\"><span class=\"grapheme\">" +
          p.graphemes[0] +
          "</span><div class=\"ipa\">" +
          p.ipaDisplay +
          "</div><small>" +
          p.keywordZh +
          "</small></button>"
        );
      })
      .join("");
  }

  function currentWord() {
    var words = Lab.wordObjs(lesson.words);
    if (!words.length) return null;
    return words[currentWordIndex % words.length];
  }

  function tilesFor(word) {
    if (!word) return "";
    return (
      "<div class=\"tiles\">" +
      word.graphemes
        .map(function (g, i) {
          var ph = word.phonemes[i];
          var p = PHONEMES[ph];
          return (
            "<button class=\"tile\" type=\"button\" data-ph=\"" +
            ph +
            "\">" +
            g +
            "<small>" +
            (p ? p.ipaDisplay : "") +
            "</small></button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function attachPhonemeClicks(root) {
    root.querySelectorAll("[data-ph]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Lab.playPhoneme(btn.getAttribute("data-ph"));
        btn.classList.add("active");
        setTimeout(function () {
          btn.classList.remove("active");
        }, 500);
      });
    });
  }

  function renderIDo() {
    var word = currentWord();
    var p0 = Lab.phonemeObjs(lesson.phonemes)[0];
    var hidePic = method === "sound" && !revealed;
    var hideGrapheme = method === "picture" && !revealed;
    var picKey = word ? word.img : p0.img;
    $("stage").innerHTML =
      "<div class=\"sound-card\">" +
      "<img class=\"pic" +
      (hidePic ? " hidden-pic" : "") +
      "\" id=\"mainPic\" src=\"" +
      Lab.img(picKey) +
      "\" alt=\"\">" +
      "<div>" +
      "<p class=\"kicker\">教师展示 · " +
      (method === "sound" ? "声音先行" : "图片先行") +
      "</p>" +
      (hideGrapheme
        ? "<p class=\"ipa-xl\">?</p><p class=\"muted\">先看图、猜一猜这个词/音，再揭示字母。</p>"
        : "<div class=\"grapheme-xl\">" +
          (word ? word.word : p0.graphemes[0]) +
          "</div><div class=\"ipa-xl\">" +
          (word ? word.ipa : p0.ipaDisplay) +
          "</div>") +
      "<p style=\"margin:0.5rem 0 0.8rem\">" +
      (word ? word.zh : p0.keywordZh + " · " + p0.tip) +
      "</p>" +
      tilesFor(word) +
      "<div class=\"btn-row\">" +
      "<button class=\"btn teal\" id=\"btnSound\" type=\"button\">▶ 单独音素</button>" +
      "<button class=\"btn sun\" id=\"btnBlend\" type=\"button\">滑读拼成词</button>" +
      "<button class=\"btn ghost\" id=\"btnWord\" type=\"button\">整词</button>" +
      "<button class=\"btn coral\" id=\"btnReveal\" type=\"button\">揭示</button>" +
      "</div></div></div>" +
      "<h3 class=\"section-title\" style=\"margin-top:1.2rem\">本课音素（点按听纯音 + IPA）</h3>" +
      "<div class=\"grid-auto\" id=\"phRow\">" +
      phonemeRow() +
      "</div>" +
      "<h3 class=\"section-title\" style=\"margin-top:1.2rem\">展示脚本</h3>" +
      "<ul class=\"muted\">" +
      lesson.iDo.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
      "</ul>" +
      sightBlock();
    attachPhonemeClicks($("stage"));
    $("stage").querySelectorAll("[data-sight]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Lab.playWord(btn.getAttribute("data-sight"));
      });
    });
    $("btnSound").onclick = function () {
      if (word) Lab.playPhoneme(word.phonemes[0]);
      else Lab.playPhoneme(p0.id);
    };
    $("btnBlend").onclick = function () {
      if (word) Lab.playBlend(word.phonemes, word.word);
    };
    $("btnWord").onclick = function () {
      if (word) Lab.playWord(word.word);
      else Lab.playWord(p0.keyword);
    };
    $("btnReveal").onclick = function () {
      revealed = true;
      render();
    };
  }

  function renderWeDo() {
    var word = currentWord();
    $("stage").innerHTML =
      "<p class=\"kicker\">学生模仿 · 我做你做</p>" +
      "<div style=\"text-align:center\">" +
      "<img class=\"pic md\" style=\"margin:0 auto 0.7rem\" src=\"" +
      Lab.img(word ? word.img : "mascot") +
      "\" alt=\"\">" +
      "<div class=\"grapheme-xl\">" +
      (word ? word.word : "") +
      "</div>" +
      "<div class=\"ipa\">" +
      (word ? word.ipa + " · " + word.zh : "") +
      "</div>" +
      tilesFor(word) +
      "<div class=\"btn-row\" style=\"justify-content:center\">" +
      "<button class=\"btn teal\" id=\"echoPh\" type=\"button\">1. 听音素 · 跟读</button>" +
      "<button class=\"btn sun\" id=\"echoBlend\" type=\"button\">2. 慢拼 · 跟读</button>" +
      "<button class=\"btn coral\" id=\"echoWord\" type=\"button\">3. 整词 · 跟读</button>" +
      "</div>" +
      "<p class=\"muted\" style=\"margin-top:0.8rem\">教师先点，学生立刻模仿口型。爆破音要截断，不要加「呃」。</p>" +
      "</div>" +
      "<h3 class=\"section-title\" style=\"margin-top:1rem\">跟读任务</h3>" +
      "<ul class=\"muted\">" +
      lesson.weDo.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
      "</ul>" +
      sightBlock();
    attachPhonemeClicks($("stage"));
    $("stage").querySelectorAll("[data-sight]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Lab.playWord(btn.getAttribute("data-sight"));
      });
    });
    if (word) {
      $("echoPh").onclick = function () {
        Lab.playPhoneme(word.phonemes[0]);
      };
      $("echoBlend").onclick = function () {
        Lab.playBlend(word.phonemes, word.word);
      };
      $("echoWord").onclick = function () {
        Lab.playWord(word.word);
      };
    }
  }

  function sightBlock() {
    var list = Lab.sightObjs(lesson.sight);
    if (!list.length) return "";
    return (
      "<h3 class=\"section-title\">Heart Words 奇形词</h3>" +
      "<div class=\"grid-auto\">" +
      list
        .map(function (s) {
          return (
            "<button class=\"card\" type=\"button\" data-sight=\"" +
            s.word +
            "\"><span class=\"badge\">heart</span><h3>" +
            s.word +
            " <span class=\"ipa\">" +
            s.ipa +
            "</span></h3><p class=\"muted\">" +
            s.zh +
            " · " +
            (s.tip || "") +
            "</p></button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function nextQuiz() {
    var words = Lab.wordObjs(lesson.words);
    var answer = Lab.pick(words, 1)[0];
    var distractors = Lab.pick(
      words.filter(function (w) { return w.word !== answer.word; }),
      3
    );
    quizItem = {
      answer: answer,
      choices: Lab.shuffle([answer].concat(distractors)).slice(0, 4)
    };
  }

  function renderGroup() {
    if (!quizItem) nextQuiz();
    var q = quizItem;
    $("stage").innerHTML =
      "<div class=\"scoreboard\"><div>小组 A <b>" +
      groupScore.a +
      "</b></div><div>当前：<b>" +
      (groupTurn === "a" ? "A 队" : "B 队") +
      "</b></div><div>小组 B <b>" +
      groupScore.b +
      "</b></div></div>" +
      "<p class=\"kicker\">小组测试 · 听音选图</p>" +
      "<div class=\"btn-row\"><button class=\"btn teal\" id=\"playQ\" type=\"button\">▶ 播放题目</button>" +
      "<button class=\"btn ghost\" id=\"switchT\" type=\"button\">换队</button></div>" +
      "<div class=\"choice-grid\" id=\"gChoices\"></div>" +
      "<ul class=\"muted\" style=\"margin-top:1rem\">" +
      lesson.group.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
      "</ul>";
    var box = $("gChoices");
    q.choices.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "choice";
      b.type = "button";
      b.innerHTML = "<img src=\"" + Lab.img(c.img) + "\" alt=\"" + c.zh + "\"><strong>" + c.zh + "</strong>";
      b.onclick = function () {
        var good = c.word === q.answer.word;
        b.classList.add(good ? "good" : "bad");
        if (good) {
          groupScore[groupTurn] += 1;
          Lab.playWord("Yes!");
          Lab.toast("答对了");
          setTimeout(function () {
            nextQuiz();
            render();
          }, 700);
        } else {
          Lab.toast("再听一次");
        }
      };
      box.appendChild(b);
    });
    $("playQ").onclick = function () {
      Lab.playWord(q.answer.word);
    };
    $("switchT").onclick = function () {
      groupTurn = groupTurn === "a" ? "b" : "a";
      render();
    };
    setTimeout(function () {
      Lab.playWord(q.answer.word);
    }, 400);
  }

  function renderIndependent() {
    var words = Lab.wordObjs(lesson.words);
    $("stage").innerHTML =
      "<p class=\"kicker\">独立练习</p>" +
      "<p class=\"lede\">先自己拼，再点按钮核对读音与 IPA。</p>" +
      "<div class=\"grid-auto\" id=\"selfGrid\"></div>" +
      "<h3 class=\"section-title\" style=\"margin-top:1rem\">任务清单</h3>" +
      "<ul class=\"muted\">" +
      lesson.independent.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
      "</ul>" +
      "<div class=\"btn-row\">" +
      "<a class=\"btn sun\" href=\"print.html?id=" +
      lesson.id +
      "\">导出彩色 PDF 练习</a>" +
      "<a class=\"btn teal\" href=\"play.html?game=blend&stage=" +
      lesson.stage +
      "\">进入对应游戏</a>" +
      "</div>" +
      sightBlock();
    var grid = $("selfGrid");
    words.forEach(function (w) {
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML =
        "<img class=\"pic\" src=\"" +
        Lab.img(w.img) +
        "\" alt=\"" +
        w.zh +
        "\">" +
        "<h3>" +
        w.word +
        " <span class=\"ipa\">" +
        w.ipa +
        "</span></h3>" +
        "<p class=\"muted\">" +
        w.zh +
        "</p>" +
        tilesFor(w) +
        "<div class=\"btn-row\"><button class=\"btn teal\" type=\"button\">听拼读</button></div>";
      card.querySelector("button").onclick = function () {
        Lab.playBlend(w.phonemes, w.word);
      };
      grid.appendChild(card);
    });
    attachPhonemeClicks($("stage"));
    $("stage").querySelectorAll("[data-sight]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Lab.playWord(btn.getAttribute("data-sight"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
