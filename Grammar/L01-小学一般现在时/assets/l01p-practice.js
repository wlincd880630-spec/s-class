(function (global) {
  "use strict";

  function register(RENDER, BIND, d) {
    var esc = d.esc;
    var header = d.header;
    var hero = d.hero;
    var sentBlock = d.sentBlock;
    var ttsRow = d.ttsRow;
    var bindCommon = d.bindCommon;
    var speak = d.speak;

    function shuffle(arr) {
      return arr.slice().sort(function () { return Math.random() - 0.5; });
    }

    /* ── 词汇卡 ── */
    function renderVocab(page) {
      var words = page.words || [];
      if (page.pool === "vocabDaily" && global.L01pCorpus) words = global.L01pCorpus.vocabDaily;
      if (page.pool === "vocabBe" && global.L01pCorpus) words = global.L01pCorpus.vocabBe;
      if (page.pool === "vocabTime" && global.L01pCorpus) words = global.L01pCorpus.vocabTime;
      var cards = words
        .map(function (w, i) {
          return (
            '<div class="l01p-vocab-card" data-i="' + i + '">' +
            (w.image ? '<img src="' + d.img(w.image) + '" alt="" class="l01p-vocab-card__img"/>' : "") +
            '<div class="l01p-vocab-card__word">' + esc(w.word) +
            (w.phonetic ? ' <span class="l01p-vocab-card__ph">' + esc(w.phonetic) + "</span>" : "") +
            "</div><div class=\"l01p-vocab-card__zh\">" + esc(w.zh) + "</div>" +
            '<div class="l01p-vocab-card__ex en-line" lang="en">' + esc(w.example) + "</div>" +
            '<div class="l01p-vocab-card__exzh">' + esc(w.exampleZh) + "</div>" +
            (w.source ? '<div class="l01p-vocab-card__src">出处：' + esc(w.source) + "</div>" : "") +
            '<button type="button" class="l01p-btn l01p-btn--ghost l01p-vocab-card__btn" data-speak="' + esc(w.example) + '">🔊</button></div>'
          );
        })
        .join("");
      return (
        header(page) +
        '<article class="l01p-card">' +
        (page.image ? hero(page) : "") +
        '<div class="l01p-body-inner"><h1 class="l01p-title">' + esc(page.title) + "</h1>" +
        (page.lead ? '<p class="l01p-lead">' + esc(page.lead) + "</p>" : "") +
        '<div class="l01p-vocab-grid">' + cards + "</div></div></article>"
      );
    }

    function bindVocab() {
      bindCommon(document.getElementById("l01pApp"));
    }

    /* ── 限时答题 ── */
    function renderTimedQuiz(page) {
      return (
        header(page) +
        '<article class="l01p-card"><div class="l01p-body-inner"><h1 class="l01p-title">' + esc(page.title) + "</h1>" +
        '<p class="l01p-lead">' + esc(page.lead || "在时间内尽量多答对！") + "</p>" +
        '<div class="l01p-timer"><span class="l01p-timer__icon">⏱</span><span id="tqTime">' + (page.seconds || 60) + "</span>s" +
        '<span class="l01p-timer__score">得分 <b id="tqScore">0</b></span></div>' +
        '<div id="tqArea"></div><div class="l01p-toolbar"><button type="button" class="l01p-btn" id="tqStart">开始挑战</button></div>' +
        '<div class="l01p-fb" id="tqFb"></div></div></article>'
      );
    }

    function bindTimedQuiz(page) {
      var pool = page.questions || [];
      if (page.pool && global.L01pCorpus && global.L01pCorpus[page.pool]) {
        pool = global.L01pCorpus[page.pool];
      }
      var perQ = page.perQuestion || 12;
      var totalSec = page.seconds || 60;
      var score = 0;
      var qi = 0;
      var timer = null;
      var qTimer = null;
      var left = totalSec;
      var started = false;
      var order = shuffle(pool);

      function showQ() {
        var area = document.getElementById("tqArea");
        if (!area) return;
        if (qi >= order.length) qi = 0;
        var q = order[qi];
        var opts = q.opts
          .map(function (o, i) {
            return '<button type="button" class="l01p-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        area.innerHTML =
          '<p class="l01p-ask">' + esc(q.q) + '</p><div class="l01p-choices" id="tqCh">' + opts + "</div>";
        clearTimeout(qTimer);
        qTimer = setTimeout(function () {
          qi++;
          if (left > 0) showQ();
        }, perQ * 1000);
        area.querySelectorAll("#tqCh .l01p-choice").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var i = Number(btn.getAttribute("data-i"));
            var ok = i === q.ans;
            area.querySelectorAll(".l01p-choice").forEach(function (b, j) {
              b.disabled = true;
              if (j === q.ans) b.classList.add("is-ok");
              else if (j === i) b.classList.add("is-no");
            });
            if (ok) {
              score++;
              document.getElementById("tqScore").textContent = score;
              speak(q.sentence || q.q);
            }
            clearTimeout(qTimer);
            setTimeout(function () {
              qi++;
              if (left > 0) showQ();
            }, ok ? 600 : 900);
          });
        });
      }

      function endGame() {
        clearInterval(timer);
        clearTimeout(qTimer);
        started = false;
        var fb = document.getElementById("tqFb");
        var start = document.getElementById("tqStart");
        if (start) start.textContent = "再来一次";
        if (fb) {
          fb.className = "l01p-fb is-show l01p-fb--ok";
          fb.innerHTML = "时间到！你答对了 <strong>" + score + "</strong> 题。" + (score >= (page.pass || 5) ? " 🎉 太棒了！" : " 再练一次试试！");
        }
      }

      var startBtn = document.getElementById("tqStart");
      if (startBtn)
        startBtn.addEventListener("click", function () {
          if (started) {
            left = totalSec;
            score = 0;
            qi = 0;
            order = shuffle(pool);
            document.getElementById("tqScore").textContent = "0";
            document.getElementById("tqFb").className = "l01p-fb";
          }
          started = true;
          left = totalSec;
          startBtn.textContent = "进行中…";
          showQ();
          clearInterval(timer);
          timer = setInterval(function () {
            left--;
            var el = document.getElementById("tqTime");
            if (el) el.textContent = left;
            if (left <= 0) endGame();
          }, 1000);
        });
    }

    /* ── 连对闯关 ── */
    function renderStreakQuiz(page) {
      return (
        header(page) +
        '<article class="l01p-card"><div class="l01p-body-inner"><h1 class="l01p-title">' + esc(page.title) + "</h1>" +
        '<p class="l01p-lead">' + esc(page.lead || "连续答对即可通关！") + "</p>" +
        '<div class="l01p-streak-bar" id="stBar"></div>' +
        '<div id="stArea"><p class="l01p-lead">点击「开始」</p></div>' +
        '<div class="l01p-toolbar"><button type="button" class="l01p-btn" id="stStart">开始闯关</button></div>' +
        '<div class="l01p-fb" id="stFb"></div></div></article>'
      );
    }

    function bindStreakQuiz(page) {
      var target = page.target || 5;
      var sourcePool = page.questions || [];
      if (page.pool && global.L01pCorpus && global.L01pCorpus[page.pool]) {
        sourcePool = global.L01pCorpus[page.pool];
      }
      var pool = shuffle(sourcePool);
      var streak = 0;
      var pi = 0;

      function renderBar() {
        var bar = document.getElementById("stBar");
        if (!bar) return;
        var h = "";
        for (var i = 0; i < target; i++) {
          h += '<span class="l01p-streak-dot' + (i < streak ? " is-on" : "") + '">' + (i + 1) + "</span>";
        }
        bar.innerHTML = h;
      }

      function showQ() {
        renderBar();
        var area = document.getElementById("stArea");
        if (!area) return;
        if (pi >= pool.length) {
          pool = shuffle(sourcePool);
          pi = 0;
        }
        var q = pool[pi % pool.length];
        pi++;
        var opts = q.opts
          .map(function (o, i) {
            return '<button type="button" class="l01p-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        area.innerHTML = '<p class="l01p-ask">' + esc(q.q) + '</p><div class="l01p-choices" id="stCh">' + opts + "</div>";
        area.querySelectorAll("#stCh .l01p-choice").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var i = Number(btn.getAttribute("data-i"));
            var ok = i === q.ans;
            area.querySelectorAll(".l01p-choice").forEach(function (b, j) {
              b.disabled = true;
              if (j === q.ans) b.classList.add("is-ok");
              else if (j === i) b.classList.add("is-no");
            });
            var fb = document.getElementById("stFb");
            if (ok) {
              streak++;
              renderBar();
              if (streak >= target) {
                if (fb) {
                  fb.className = "l01p-fb is-show l01p-fb--ok";
                  fb.textContent = "🎉 连对 " + target + " 题，闯关成功！";
                }
                speak("Great job!");
              } else {
                setTimeout(showQ, 700);
              }
            } else {
              streak = 0;
              renderBar();
              if (fb) {
                fb.className = "l01p-fb is-show l01p-fb--no";
                fb.textContent = q.hint + " 连击清零，再试！";
              }
              setTimeout(showQ, 1200);
            }
          });
        });
      }

      var start = document.getElementById("stStart");
      if (start)
        start.addEventListener("click", function () {
          streak = 0;
          pi = 0;
          document.getElementById("stFb").className = "l01p-fb";
          showQ();
        });
    }

    /* ── 课堂套题 ── */
    function renderMultiQuiz(page) {
      var qs = page.questions || [];
      var html = qs
        .map(function (q, n) {
          var opts = q.opts
            .map(function (o, i) {
              return '<label class="l01p-mq-opt"><input type="radio" name="mq' + n + '" value="' + i + '"/> ' + esc(o) + "</label>";
            })
            .join("");
          return (
            '<div class="l01p-mq-item" data-n="' + n + '" data-ans="' + q.ans + '"><div class="l01p-mq-num">' +
            (n + 1) +
            "</div><p class=\"l01p-mq-q\">" +
            esc(q.q) +
            '</p><div class="l01p-mq-opts">' +
            opts +
            "</div></div>"
          );
        })
        .join("");
      return (
        header(page) +
        '<article class="l01p-card">' +
        (page.image ? hero(page) : "") +
        '<div class="l01p-body-inner"><h1 class="l01p-title">' +
        esc(page.title) +
        '</h1><p class="l01p-lead">' +
        esc(page.lead || "做完后点「交卷」") +
        '</p><div id="mqList">' +
        html +
        '</div><div class="l01p-toolbar"><button type="button" class="l01p-btn" id="mqSubmit">交卷</button></div><div class="l01p-fb" id="mqFb"></div></div></article>'
      );
    }

    function bindMultiQuiz(page) {
      document.getElementById("mqSubmit").addEventListener("click", function () {
        var items = document.querySelectorAll(".l01p-mq-item");
        var ok = 0;
        items.forEach(function (item) {
          var n = item.getAttribute("data-n");
          var ans = Number(item.getAttribute("data-ans"));
          var pick = item.querySelector('input[name="mq' + n + '"]:checked');
          var right = pick && Number(pick.value) === ans;
          item.classList.toggle("is-ok", right);
          item.classList.toggle("is-no", pick && !right);
          if (right) ok++;
        });
        var fb = document.getElementById("mqFb");
        var total = items.length;
        fb.className = "l01p-fb is-show " + (ok === total ? "l01p-fb--ok" : ok >= total * 0.6 ? "l01p-fb--ok" : "l01p-fb--no");
        fb.innerHTML = "得分：" + ok + " / " + total + (ok === total ? " 全对！🎉" : ok >= total * 0.6 ? " 不错，再看看错题。" : " 加油，复习后再做！");
      });
    }

    /* ── 配对游戏 ── */
    function renderMatch(page) {
      var pairs = page.pairs || [];
      if (page.pool === "matchPairs" && global.L01pCorpus) pairs = global.L01pCorpus.matchPairs;
      var en = shuffle(pairs);
      var zh = shuffle(pairs);
      var enHtml = en
        .map(function (p, i) {
          return '<button type="button" class="l01p-match-item" data-idx="' + i + '" data-en="' + esc(p.en) + '">' + esc(p.en) + "</button>";
        })
        .join("");
      var zhHtml = zh
        .map(function (p, i) {
          return '<button type="button" class="l01p-match-item l01p-match-item--zh" data-idx="' + i + '" data-en="' + esc(p.en) + '">' + esc(p.zh) + "</button>";
        })
        .join("");
      return (
        header(page) +
        '<article class="l01p-card">' +
        hero(page) +
        '<div class="l01p-body-inner"><h1 class="l01p-title">' +
        esc(page.title) +
        '</h1><p class="l01p-lead">先点英文，再点对应中文</p><div class="l01p-match"><div><div class="l01p-match__label">English</div>' +
        enHtml +
        '</div><div><div class="l01p-match__label">中文</div>' +
        zhHtml +
        '</div></div><div class="l01p-fb" id="mpFb"></div></div></article>'
      );
    }

    function bindMatch(page) {
      var pickEn = null;
      var pickBtn = null;
      var done = 0;
      var pairs = page.pairs || [];
      if (page.pool === "matchPairs" && global.L01pCorpus) pairs = global.L01pCorpus.matchPairs;
      var total = pairs.length;
      document.querySelectorAll(".l01p-match-item:not(.l01p-match-item--zh)").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.classList.contains("is-done")) return;
          document.querySelectorAll(".l01p-match-item").forEach(function (b) {
            b.classList.remove("is-pick");
          });
          btn.classList.add("is-pick");
          pickEn = btn.getAttribute("data-en");
          pickBtn = btn;
        });
      });
      document.querySelectorAll(".l01p-match-item--zh").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!pickEn || btn.classList.contains("is-done")) return;
          var match = btn.getAttribute("data-en") === pickEn;
          if (match) {
            btn.classList.add("is-done");
            if (pickBtn) pickBtn.classList.add("is-done");
            document.querySelectorAll(".l01p-match-item").forEach(function (b) {
              b.classList.remove("is-pick");
            });
            pickEn = null;
            pickBtn = null;
            done++;
            speak(btn.getAttribute("data-en"));
            if (done >= total) {
              var fb = document.getElementById("mpFb");
              fb.className = "l01p-fb is-show l01p-fb--ok";
              fb.textContent = "全部配对成功！🎉";
            }
          } else {
            pickEn = null;
            pickBtn = null;
            document.querySelectorAll(".l01p-match-item").forEach(function (b) {
              b.classList.remove("is-pick");
            });
            var fb = document.getElementById("mpFb");
            fb.className = "l01p-fb is-show l01p-fb--no";
            fb.textContent = "不对哦，再试！";
          }
        });
      });
    }

    /* ── 听音快选 ── */
    function renderListenPick(page) {
      var item = page;
      if (page.pool && global.L01pCorpus && global.L01pCorpus[page.pool]) {
        var list = global.L01pCorpus[page.pool];
        item = list[page.startIndex || 0] || list[0];
      }
      var opts = item.opts
        .map(function (o, i) {
          return '<button type="button" class="l01p-choice" data-i="' + i + '">' + esc(o) + "</button>";
        })
        .join("");
      var rounds = page.rounds ? '<p class="l01p-lead" id="lpRound"></p>' : "";
      var nextBtn = page.rounds ? '<div class="l01p-toolbar"><button type="button" class="l01p-btn l01p-btn--ghost" id="lpNext" hidden>下一题 →</button></div>' : "";
      return (
        header(page) +
        '<article class="l01p-card">' +
        hero(page, item.audio) +
        '<div class="l01p-body-inner"><h1 class="l01p-title">' +
        esc(page.title) +
        '</h1>' + rounds +
        '<div class="l01p-sound-panel"><button type="button" class="l01p-btn l01p-btn--play" id="lpPlay">🔊</button><p>听句子，选正确答案</p></div>' +
        '<div class="l01p-choices" id="lpCh">' +
        opts +
        '</div>' + nextBtn +
        '<div class="l01p-fb" id="lpFb"></div></div></article>'
      );
    }

    function bindListenPick(page) {
      var list = [];
      if (page.pool && global.L01pCorpus && global.L01pCorpus[page.pool]) {
        list = shuffle(global.L01pCorpus[page.pool]);
      } else {
        list = [{ audio: page.audio, opts: page.opts, ans: page.ans, zh: page.zh, hint: page.hint }];
      }
      var totalRounds = page.rounds || 1;
      var round = 0;
      var score = 0;
      var current = null;

      function renderRound() {
        current = list[round % list.length];
        var area = document.getElementById("lpCh");
        var fb = document.getElementById("lpFb");
        var next = document.getElementById("lpNext");
        var roundEl = document.getElementById("lpRound");
        if (roundEl) roundEl.textContent = "第 " + (round + 1) + " / " + totalRounds + " 题 · 得分 " + score;
        if (!area) return;
        area.innerHTML = current.opts
          .map(function (o, i) {
            return '<button type="button" class="l01p-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        if (fb) { fb.className = "l01p-fb"; fb.innerHTML = ""; }
        if (next) next.hidden = true;
        setTimeout(function () { speak(current.audio); }, 300);
        area.querySelectorAll(".l01p-choice").forEach(function (btn) {
          btn.addEventListener("click", onPick);
        });
      }

      function onPick() {
        var btn = this;
        if (btn.disabled) return;
        var i = Number(btn.getAttribute("data-i"));
        var ok = i === current.ans;
        var fb = document.getElementById("lpFb");
        document.querySelectorAll("#lpCh .l01p-choice").forEach(function (b, j) {
          b.disabled = true;
          if (j === current.ans) b.classList.add("is-ok");
          else if (j === i) b.classList.add("is-no");
        });
        if (ok) score++;
        if (fb) {
          fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
          fb.innerHTML = ok
            ? sentBlock(current.audio, current.zh) + ttsRow(current.audio)
            : esc(current.hint || page.hint || "再听一遍！");
          if (ok) bindCommon(fb);
        }
        var next = document.getElementById("lpNext");
        if (round + 1 >= totalRounds) {
          if (fb) {
            fb.className = "l01p-fb is-show " + (score >= Math.ceil(totalRounds * 0.6) ? "l01p-fb--ok" : "l01p-fb--no");
            fb.innerHTML = "完成！得分 " + score + " / " + totalRounds + (score === totalRounds ? " 全对！🎉" : " 继续加油！");
          }
        } else if (next) {
          next.hidden = false;
        }
      }

      var play = document.getElementById("lpPlay");
      if (play) {
        play.addEventListener("click", function () {
          if (current) speak(current.audio, play);
        });
      }
      var nextBtn = document.getElementById("lpNext");
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          round++;
          renderRound();
        });
      }
      renderRound();
    }

    /* ── 课堂练习导学 ── */
    function renderPracticeHub(page) {
      var modes = (page.modes || [])
        .map(function (m) {
          return '<a class="l01p-hub-card" href="' + esc(m.href) + '"><span class="l01p-hub-card__icon">' + esc(m.icon) + '</span><strong>' + esc(m.title) + "</strong><span>" + esc(m.desc) + "</span></a>";
        })
        .join("");
      return (
        header(page) +
        '<article class="l01p-card">' +
        hero(page) +
        '<div class="l01p-body-inner"><h1 class="l01p-title">' +
        esc(page.title) +
        '</h1><p class="l01p-lead">' +
        esc(page.lead) +
        '</p><div class="l01p-hub-grid">' +
        modes +
        "</div></div></article>"
      );
    }

    RENDER["vocab-cards"] = renderVocab;
    RENDER["timed-quiz"] = renderTimedQuiz;
    RENDER["streak-quiz"] = renderStreakQuiz;
    RENDER["multi-quiz"] = renderMultiQuiz;
    RENDER["match-pairs"] = renderMatch;
    RENDER["listen-pick"] = renderListenPick;
    RENDER["practice-hub"] = renderPracticeHub;

    BIND["vocab-cards"] = bindVocab;
    BIND["timed-quiz"] = bindTimedQuiz;
    BIND["streak-quiz"] = bindStreakQuiz;
    BIND["multi-quiz"] = bindMultiQuiz;
    BIND["match-pairs"] = bindMatch;
    BIND["listen-pick"] = bindListenPick;
    BIND["practice-hub"] = bindVocab;
  }

  global.L01pPractice = { register: register };
})(typeof window !== "undefined" ? window : null);
