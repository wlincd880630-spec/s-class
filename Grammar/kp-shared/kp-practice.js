(function (global) {
  "use strict";

  function register(RENDER, BIND, d) {
    var esc = d.esc;
    var header = d.header;
    var hero = d.hero;
    var bindCommon = d.bindCommon;
    var speak = d.speak;

    function shuffle(arr) {
      return arr.slice().sort(function () {
        return Math.random() - 0.5;
      });
    }

    function poolOf(page) {
      if (page.questions && page.questions.length) return page.questions;
      if (page.pool && global.KpCorpus && global.KpCorpus[page.pool]) return global.KpCorpus[page.pool];
      if (global.KpCorpus && global.KpCorpus.questions && global.KpCorpus.questions.length) {
        return global.KpCorpus.questions;
      }
      return [];
    }

    function renderTimedQuiz(page) {
      return (
        header(page) +
        '<article class="kp-card"><div class="kp-body-inner"><h1 class="kp-title">' +
        esc(page.title) +
        "</h1>" +
        '<p class="kp-lead">' +
        esc(page.lead || "在时间内尽量多答对！") +
        "</p>" +
        '<div class="kp-timer"><span class="kp-timer__icon">⏱</span><span id="tqTime">' +
        (page.seconds || 60) +
        '</span>s<span class="kp-timer__score">得分 <b id="tqScore">0</b></span></div>' +
        '<div id="tqArea"></div><div class="kp-toolbar"><button type="button" class="kp-btn" id="tqStart">开始挑战</button></div>' +
        '<div class="kp-fb" id="tqFb"></div></div></article>'
      );
    }

    function bindTimedQuiz(page) {
      var pool = poolOf(page);
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
        if (!area || !order.length) return;
        if (qi >= order.length) qi = 0;
        var q = order[qi];
        var opts = q.opts
          .map(function (o, i) {
            return '<button type="button" class="kp-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        area.innerHTML = '<p class="kp-ask">' + esc(q.q) + '</p><div class="kp-choices" id="tqCh">' + opts + "</div>";
        clearTimeout(qTimer);
        qTimer = setTimeout(function () {
          qi++;
          if (left > 0) showQ();
        }, perQ * 1000);
        area.querySelectorAll("#tqCh .kp-choice").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var i = Number(btn.getAttribute("data-i"));
            var ok = i === q.ans;
            area.querySelectorAll(".kp-choice").forEach(function (b, j) {
              b.disabled = true;
              if (j === q.ans) b.classList.add("is-ok");
              else if (j === i) b.classList.add("is-no");
            });
            if (ok) {
              score++;
              var sc = document.getElementById("tqScore");
              if (sc) sc.textContent = score;
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
          fb.className = "kp-fb is-show kp-fb--ok";
          fb.innerHTML =
            "时间到！你答对了 <strong>" +
            score +
            "</strong> 题。" +
            (score >= (page.pass || 4) ? " 🎉 太棒了！" : " 再练一次试试！");
        }
      }

      var startBtn = document.getElementById("tqStart");
      if (startBtn)
        startBtn.addEventListener("click", function () {
          left = totalSec;
          score = 0;
          qi = 0;
          order = shuffle(pool);
          var sc = document.getElementById("tqScore");
          if (sc) sc.textContent = "0";
          var fb0 = document.getElementById("tqFb");
          if (fb0) {
            fb0.className = "kp-fb";
            fb0.innerHTML = "";
          }
          started = true;
          startBtn.textContent = "进行中…";
          var timeEl = document.getElementById("tqTime");
          if (timeEl) timeEl.textContent = left;
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

    function renderStreakQuiz(page) {
      return (
        header(page) +
        '<article class="kp-card"><div class="kp-body-inner"><h1 class="kp-title">' +
        esc(page.title) +
        "</h1>" +
        '<p class="kp-lead">' +
        esc(page.lead || "连续答对即可通关！") +
        '</p><div class="kp-streak-bar" id="stBar"></div>' +
        '<div id="stArea"><p class="kp-lead">点击「开始」</p></div>' +
        '<div class="kp-toolbar"><button type="button" class="kp-btn" id="stStart">开始闯关</button></div>' +
        '<div class="kp-fb" id="stFb"></div></div></article>'
      );
    }

    function bindStreakQuiz(page) {
      var target = page.target || 5;
      var sourcePool = poolOf(page);
      var pool = shuffle(sourcePool);
      var streak = 0;
      var pi = 0;

      function renderBar() {
        var bar = document.getElementById("stBar");
        if (!bar) return;
        var h = "";
        for (var i = 0; i < target; i++) {
          h += '<span class="kp-streak-dot' + (i < streak ? " is-on" : "") + '">' + (i + 1) + "</span>";
        }
        bar.innerHTML = h;
      }

      function showQ() {
        renderBar();
        var area = document.getElementById("stArea");
        if (!area || !sourcePool.length) return;
        if (pi >= pool.length) {
          pool = shuffle(sourcePool);
          pi = 0;
        }
        var q = pool[pi % pool.length];
        pi++;
        var opts = q.opts
          .map(function (o, i) {
            return '<button type="button" class="kp-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        area.innerHTML = '<p class="kp-ask">' + esc(q.q) + '</p><div class="kp-choices" id="stCh">' + opts + "</div>";
        area.querySelectorAll("#stCh .kp-choice").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var i = Number(btn.getAttribute("data-i"));
            var ok = i === q.ans;
            area.querySelectorAll(".kp-choice").forEach(function (b, j) {
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
                  fb.className = "kp-fb is-show kp-fb--ok";
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
                fb.className = "kp-fb is-show kp-fb--no";
                fb.textContent = (q.hint || "再想一想。") + " 连击清零，再试！";
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
          var fb = document.getElementById("stFb");
          if (fb) {
            fb.className = "kp-fb";
            fb.textContent = "";
          }
          showQ();
        });
    }

    function renderMultiQuiz(page) {
      var qs = page.questions || [];
      var html = qs
        .map(function (q, n) {
          var opts = q.opts
            .map(function (o, i) {
              return (
                '<label class="kp-mq-opt"><input type="radio" name="mq' +
                n +
                '" value="' +
                i +
                '"/> ' +
                esc(o) +
                "</label>"
              );
            })
            .join("");
          return (
            '<div class="kp-mq-item" data-n="' +
            n +
            '" data-ans="' +
            q.ans +
            '"><div class="kp-mq-num">' +
            (n + 1) +
            '</div><p class="kp-mq-q">' +
            esc(q.q) +
            '</p><div class="kp-mq-opts">' +
            opts +
            "</div></div>"
          );
        })
        .join("");
      return (
        header(page) +
        '<article class="kp-card">' +
        (page.image ? hero(page) : "") +
        '<div class="kp-body-inner"><h1 class="kp-title">' +
        esc(page.title) +
        '</h1><p class="kp-lead">' +
        esc(page.lead || "做完后点「交卷」") +
        '</p><div id="mqList">' +
        html +
        '</div><div class="kp-toolbar"><button type="button" class="kp-btn" id="mqSubmit">交卷</button></div><div class="kp-fb" id="mqFb"></div></div></article>'
      );
    }

    function bindMultiQuiz() {
      var btn = document.getElementById("mqSubmit");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var items = document.querySelectorAll(".kp-mq-item");
        var ok = 0;
        items.forEach(function (item) {
          var n = item.getAttribute("data-n");
          var ans = Number(item.getAttribute("data-ans"));
          var pick = item.querySelector('input[name="mq' + n + '"]:checked');
          var right = pick && Number(pick.value) === ans;
          item.classList.toggle("is-ok", !!right);
          item.classList.toggle("is-no", !!(pick && !right));
          if (right) ok++;
        });
        var fb = document.getElementById("mqFb");
        var total = items.length;
        if (!fb) return;
        fb.className =
          "kp-fb is-show " + (ok === total || ok >= total * 0.6 ? "kp-fb--ok" : "kp-fb--no");
        fb.innerHTML =
          "得分：" +
          ok +
          " / " +
          total +
          (ok === total ? " 全对！🎉" : ok >= total * 0.6 ? " 不错，再看看错题。" : " 加油，复习后再做！");
      });
    }

    function renderMatch(page) {
      var pairs = page.pairs || [];
      if (page.pool === "matchPairs" && global.KpCorpus && global.KpCorpus.matchPairs) {
        pairs = global.KpCorpus.matchPairs;
      }
      var en = shuffle(pairs);
      var zh = shuffle(pairs);
      var enHtml = en
        .map(function (p) {
          return (
            '<button type="button" class="kp-match-item" data-en="' +
            esc(p.en) +
            '">' +
            esc(p.en) +
            "</button>"
          );
        })
        .join("");
      var zhHtml = zh
        .map(function (p) {
          return (
            '<button type="button" class="kp-match-item kp-match-item--zh" data-en="' +
            esc(p.en) +
            '">' +
            esc(p.zh) +
            "</button>"
          );
        })
        .join("");
      return (
        header(page) +
        '<article class="kp-card">' +
        hero(page) +
        '<div class="kp-body-inner"><h1 class="kp-title">' +
        esc(page.title) +
        '</h1><p class="kp-lead">先点英文，再点对应中文</p><div class="kp-match"><div><div class="kp-match__label">English</div>' +
        enHtml +
        '</div><div><div class="kp-match__label">中文</div>' +
        zhHtml +
        '</div></div><div class="kp-fb" id="mpFb"></div></div></article>'
      );
    }

    function bindMatch(page) {
      var pickEn = null;
      var pickBtn = null;
      var done = 0;
      var pairs = page.pairs || [];
      if (page.pool === "matchPairs" && global.KpCorpus && global.KpCorpus.matchPairs) {
        pairs = global.KpCorpus.matchPairs;
      }
      var total = pairs.length;
      document.querySelectorAll(".kp-match-item:not(.kp-match-item--zh)").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.classList.contains("is-done")) return;
          document.querySelectorAll(".kp-match-item").forEach(function (b) {
            b.classList.remove("is-pick");
          });
          btn.classList.add("is-pick");
          pickEn = btn.getAttribute("data-en");
          pickBtn = btn;
        });
      });
      document.querySelectorAll(".kp-match-item--zh").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!pickEn || btn.classList.contains("is-done")) return;
          var match = btn.getAttribute("data-en") === pickEn;
          if (match) {
            btn.classList.add("is-done");
            if (pickBtn) pickBtn.classList.add("is-done");
            document.querySelectorAll(".kp-match-item").forEach(function (b) {
              b.classList.remove("is-pick");
            });
            pickEn = null;
            pickBtn = null;
            done++;
            speak(btn.getAttribute("data-en"));
            if (done >= total) {
              var fb = document.getElementById("mpFb");
              if (fb) {
                fb.className = "kp-fb is-show kp-fb--ok";
                fb.textContent = "全部配对成功！🎉";
              }
            }
          } else {
            pickEn = null;
            pickBtn = null;
            document.querySelectorAll(".kp-match-item").forEach(function (b) {
              b.classList.remove("is-pick");
            });
            var fb = document.getElementById("mpFb");
            if (fb) {
              fb.className = "kp-fb is-show kp-fb--no";
              fb.textContent = "不对哦，再试！";
            }
          }
        });
      });
    }

    function renderListenPick(page) {
      var qs = page.questions && page.questions.length ? page.questions : null;
      if (!qs && global.KpCorpus && global.KpCorpus.listenPick && global.KpCorpus.listenPick.length) {
        qs = global.KpCorpus.listenPick;
      }
      var first = qs ? qs[0] : page;
      var opts = (first.opts || page.opts || [])
        .map(function (o, i) {
          return '<button type="button" class="kp-choice" data-i="' + i + '">' + esc(o) + "</button>";
        })
        .join("");
      return (
        header(page) +
        '<article class="kp-card">' +
        hero(page, first.audio || page.audio) +
        '<div class="kp-body-inner"><h1 class="kp-title">' +
        esc(page.title) +
        '</h1><p class="kp-lead" id="lpProg"></p><div class="kp-sound-panel"><button type="button" class="kp-btn kp-btn--play" id="lpPlay">🔊</button><p>听句子，选正确答案</p></div>' +
        '<div class="kp-choices" id="lpCh">' +
        opts +
        '</div><div class="kp-toolbar"><button type="button" class="kp-btn" id="lpNext" hidden>下一题 →</button></div><div class="kp-fb" id="lpFb"></div></div></article>'
      );
    }

    function bindListenPick(page) {
      var qs = page.questions && page.questions.length ? page.questions.slice() : null;
      if (!qs && global.KpCorpus && global.KpCorpus.listenPick && global.KpCorpus.listenPick.length) {
        qs = global.KpCorpus.listenPick.slice();
      }
      if (!qs || !qs.length) {
        qs = [{ audio: page.audio || page.sentence, opts: page.opts, ans: page.ans, hint: page.hint, sentence: page.sentence, zh: page.zh }];
      }
      var qi = 0;
      var nextBtn = document.getElementById("lpNext");
      var ch = document.getElementById("lpCh");
      var fb = document.getElementById("lpFb");
      var prog = document.getElementById("lpProg");

      function current() {
        return qs[qi] || qs[0];
      }

      function paint() {
        var q = current();
        if (prog) prog.textContent = "第 " + (qi + 1) + " / " + qs.length + " 题";
        if (fb) {
          fb.className = "kp-fb";
          fb.innerHTML = "";
        }
        if (nextBtn) nextBtn.hidden = true;
        if (ch) {
          ch.innerHTML = (q.opts || [])
            .map(function (o, i) {
              return '<button type="button" class="kp-choice" data-i="' + i + '">' + esc(o) + "</button>";
            })
            .join("");
        }
        wire();
        speak(q.audio || q.sentence);
      }

      function wire() {
        var q = current();
        var play = document.getElementById("lpPlay");
        if (play) {
          play.onclick = function () {
            speak(q.audio || q.sentence, play);
          };
        }
        document.querySelectorAll("#lpCh .kp-choice").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var i = Number(btn.getAttribute("data-i"));
            var ok = i === q.ans;
            document.querySelectorAll("#lpCh .kp-choice").forEach(function (b, j) {
              b.disabled = true;
              if (j === q.ans) b.classList.add("is-ok");
              else if (j === i) b.classList.add("is-no");
            });
            if (fb) {
              fb.className = "kp-fb is-show " + (ok ? "kp-fb--ok" : "kp-fb--no");
              fb.textContent = ok ? "听对了！✓" : q.hint || page.hint || "再听一遍。";
            }
            if (ok) speak(q.audio || q.sentence);
            if (nextBtn && qi < qs.length - 1) nextBtn.hidden = false;
            else if (ok && qi >= qs.length - 1 && fb) fb.textContent = "全部听完了！🎉";
          });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          if (qi < qs.length - 1) {
            qi++;
            paint();
          }
        });
      }
      paint();
    }

    RENDER["timed-quiz"] = renderTimedQuiz;
    RENDER["streak-quiz"] = renderStreakQuiz;
    RENDER["multi-quiz"] = renderMultiQuiz;
    RENDER["match-pairs"] = renderMatch;
    RENDER["listen-pick"] = renderListenPick;

    BIND["timed-quiz"] = bindTimedQuiz;
    BIND["streak-quiz"] = bindStreakQuiz;
    BIND["multi-quiz"] = bindMultiQuiz;
    BIND["match-pairs"] = bindMatch;
    BIND["listen-pick"] = bindListenPick;

    void bindCommon;
  }

  global.KpPractice = { register: register };
})(typeof window !== "undefined" ? window : this);
