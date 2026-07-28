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
    var resolveImage = d.resolveImage;
    var imageForSentence = d.imageForSentence;
    var imgUrl = d.img;

    function shuffle(arr) {
      return arr.slice().sort(function () { return Math.random() - 0.5; });
    }

    /* ── 词汇卡：点开放大 + 例句图 + 句子排序 + 看图造句 ── */
    function exampleTokens(en) {
      return String(en || "")
        .replace(/[.!?？！。]+$/g, "")
        .replace(/[,，]/g, "")
        .replace(/[“”"'‘’]/g, "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    }

    function vocabWords(page) {
      var words = page.words || [];
      if (page.pool && global.L03pCorpus && global.L03pCorpus[page.pool]) words = global.L03pCorpus[page.pool];
      if (page.pool === "vocabDaily" && global.L03pCorpus) words = global.L03pCorpus.vocabDaily;
      if (page.pool === "vocabBe" && global.L03pCorpus) words = global.L03pCorpus.vocabBe;
      if (page.pool === "vocabTime" && global.L03pCorpus) words = global.L03pCorpus.vocabTime;
      return words;
    }

    function renderVocab(page) {
      var words = vocabWords(page);
      var cards = words
        .map(function (w, i) {
          var cardImg = (imageForSentence && imageForSentence(w.example)) || w.image;
          var base = w.base ? '<span class="l03p-vocab-card__base">' + esc(w.base) + " → </span>" : "";
          return (
            '<button type="button" class="l03p-vocab-card" data-i="' +
            i +
            '" aria-label="打开 ' +
            esc(w.word) +
            '">' +
            (cardImg
              ? '<img src="' +
                d.img(cardImg) +
                '" alt="" class="l03p-vocab-card__img" loading="lazy" onerror="' +
                (d.imgOnerror ? d.imgOnerror(cardImg) : "") +
                '"/>'
              : '<div class="l03p-vocab-card__phimg">📖</div>') +
            '<div class="l03p-vocab-card__word">' +
            base +
            esc(w.word) +
            "</div>" +
            '<div class="l03p-vocab-card__zh">' +
            esc(w.zh) +
            "</div>" +
            '<div class="l03p-vocab-card__hint">点开看图 · 排序 · 造句</div>' +
            "</button>"
          );
        })
        .join("");
      return (
        header(page) +
        '<article class="l03p-card">' +
        '<div class="l03p-body-inner"><h1 class="l03p-title">' +
        esc(page.title) +
        "</h1>" +
        (page.lead ? '<p class="l03p-lead">' + esc(page.lead) + "</p>" : "") +
        '<div class="l03p-vocab-grid" id="vocabGrid">' +
        cards +
        '</div></div></article><div class="l03p-vocab-overlay" id="vocabOverlay" hidden></div>'
      );
    }

    function practicePanelHtml(prefix) {
      return (
        '<div class="l03p-order-prog" id="' +
        prefix +
        'Prog"></div>' +
        '<div class="l03p-order-label">组成句子</div>' +
        '<div class="l03p-slots" id="' +
        prefix +
        'Slots"></div>' +
        '<div class="l03p-order-label">乱序词库 <span class="l03p-order-label__sub">点选填入</span></div>' +
        '<div class="l03p-bank" id="' +
        prefix +
        'Bank"></div>' +
        '<div class="l03p-toolbar">' +
        '<button type="button" class="l03p-btn" id="' +
        prefix +
        'Check">检查</button>' +
        '<button type="button" class="l03p-btn l03p-btn--ghost" id="' +
        prefix +
        'Undo">撤回</button>' +
        '<button type="button" class="l03p-btn l03p-btn--ghost" id="' +
        prefix +
        'Reset">打乱重来</button></div>' +
        '<div class="l03p-fb" id="' +
        prefix +
        'Fb"></div>'
      );
    }

    function openVocabDetail(page, words, index) {
      var overlay = document.getElementById("vocabOverlay");
      if (!overlay) return;
      var w = words[index];
      if (!w) return;
      var baseLine = w.base
        ? '<div class="l03p-vocab-detail__morph"><span class="l03p-token l03p-token--verb">' +
          esc(w.base) +
          '</span><span class="l03p-vocab-detail__arrow">→</span><span class="l03p-token l03p-token--verb l03p-token--pop">' +
          esc(w.word) +
          "</span></div>"
        : '<div class="l03p-vocab-detail__morph"><span class="l03p-token l03p-token--verb l03p-token--pop">' +
          esc(w.word) +
          "</span></div>";
      var detailImg = (imageForSentence && imageForSentence(w.example)) || w.image;
      var imgHtml = detailImg
        ? '<div class="l03p-vocab-detail__hero"><img src="' +
          d.img(detailImg) +
          '" alt="" onerror="' +
          (d.imgOnerror ? d.imgOnerror(detailImg) : "") +
          '"/></div>'
        : "";
      overlay.hidden = false;
      overlay.innerHTML =
        '<div class="l03p-vocab-detail" role="dialog" aria-modal="true">' +
        '<button type="button" class="l03p-vocab-detail__close" id="vocabClose" aria-label="关闭">×</button>' +
        '<div class="l03p-vocab-detail__nav">' +
        '<button type="button" class="l03p-btn l03p-btn--ghost" id="vocabPrev"' +
        (index <= 0 ? " disabled" : "") +
        ">← 上一个</button>" +
        '<button type="button" class="l03p-btn l03p-btn--ghost" id="vocabNext"' +
        (index >= words.length - 1 ? " disabled" : "") +
        ">下一个 →</button></div>" +
        imgHtml +
        baseLine +
        '<div class="l03p-vocab-detail__zh">' +
        esc(w.zh) +
        "</div>" +
        sentBlock(w.example, w.exampleZh) +
        ttsRow(w.example) +
        '<div class="l03p-vocab-tabs" id="vocabTabs">' +
        '<button type="button" class="l03p-vocab-tab is-on" data-tab="order">句子排序</button>' +
        '<button type="button" class="l03p-vocab-tab" data-tab="build">看图造句</button></div>' +
        '<div class="l03p-vocab-pane is-on" data-pane="order">' +
        '<p class="l03p-lead" style="margin:.35rem 0 .45rem">把乱序单词排成正确例句。</p>' +
        practicePanelHtml("vo") +
        "</div>" +
        '<div class="l03p-vocab-pane" data-pane="build">' +
        '<p class="l03p-lead" style="margin:.35rem 0 .45rem">看情景图，用词库拼出句子。</p>' +
        (detailImg
          ? '<div class="l03p-vocab-build-img"><img src="' +
            d.img(detailImg) +
            '" alt=""/></div>'
          : "") +
        practicePanelHtml("vb") +
        "</div></div>";

      document.body.classList.add("l03p-vocab-open");
      speak(w.example);
      bindCommon(overlay);

      function bindPractice(prefix) {
        var tokens = exampleTokens(w.example);
        var deck = d.makeTokenDeck(tokens);
        var slotsEl = document.getElementById(prefix + "Slots");
        var bankEl = document.getElementById(prefix + "Bank");
        if (slotsEl) slotsEl.innerHTML = d.orderSlotsHtml(tokens.length);
        if (bankEl) bankEl.innerHTML = d.orderBankHtml(d.shuffleDistinct(deck.slice()));
        d.bindTokenOrder({
          answer: tokens,
          deck: deck,
          slotsId: prefix + "Slots",
          bankId: prefix + "Bank",
          progId: prefix + "Prog",
          fbId: prefix + "Fb",
          checkId: prefix + "Check",
          undoId: prefix + "Undo",
          resetId: prefix + "Reset",
          sentence: w.example,
          zh: w.exampleZh,
        });
      }
      bindPractice("vo");
      bindPractice("vb");

      overlay.querySelectorAll(".l03p-vocab-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          var name = tab.getAttribute("data-tab");
          overlay.querySelectorAll(".l03p-vocab-tab").forEach(function (t) {
            t.classList.toggle("is-on", t === tab);
          });
          overlay.querySelectorAll(".l03p-vocab-pane").forEach(function (p) {
            p.classList.toggle("is-on", p.getAttribute("data-pane") === name);
          });
        });
      });

      function close() {
        overlay.hidden = true;
        overlay.innerHTML = "";
        document.body.classList.remove("l03p-vocab-open");
      }
      document.getElementById("vocabClose").addEventListener("click", close);
      overlay.addEventListener("click", function (ev) {
        if (ev.target === overlay) close();
      });
      document.getElementById("vocabPrev").addEventListener("click", function () {
        if (index > 0) openVocabDetail(page, words, index - 1);
      });
      document.getElementById("vocabNext").addEventListener("click", function () {
        if (index < words.length - 1) openVocabDetail(page, words, index + 1);
      });
    }

    function bindVocab(page) {
      var words = vocabWords(page);
      document.querySelectorAll("#vocabGrid .l03p-vocab-card").forEach(function (card) {
        card.addEventListener("click", function () {
          openVocabDetail(page, words, Number(card.getAttribute("data-i")));
        });
      });
      bindCommon(document.getElementById("l03pApp"));
    }

    /* ── 限时答题 ── */
    function renderTimedQuiz(page) {
      return (
        header(page) +
        '<article class="l03p-card"><div class="l03p-body-inner"><h1 class="l03p-title">' + esc(page.title) + "</h1>" +
        '<p class="l03p-lead">' + esc(page.lead || "在时间内尽量多答对！") + "</p>" +
        '<div class="l03p-timer"><span class="l03p-timer__icon">⏱</span><span id="tqTime">' + (page.seconds || 60) + "</span>s" +
        '<span class="l03p-timer__score">得分 <b id="tqScore">0</b></span></div>' +
        '<div id="tqArea"></div><div class="l03p-toolbar"><button type="button" class="l03p-btn" id="tqStart">开始挑战</button></div>' +
        '<div class="l03p-fb" id="tqFb"></div></div></article>'
      );
    }

    function bindTimedQuiz(page) {
      var pool = page.questions || [];
      if (page.pool && global.L03pCorpus && global.L03pCorpus[page.pool]) {
        pool = global.L03pCorpus[page.pool];
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
            return '<button type="button" class="l03p-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        area.innerHTML =
          '<p class="l03p-ask">' + esc(q.q) + '</p><div class="l03p-choices" id="tqCh">' + opts + "</div>";
        clearTimeout(qTimer);
        qTimer = setTimeout(function () {
          qi++;
          if (left > 0) showQ();
        }, perQ * 1000);
        area.querySelectorAll("#tqCh .l03p-choice").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var i = Number(btn.getAttribute("data-i"));
            var ok = i === q.ans;
            area.querySelectorAll(".l03p-choice").forEach(function (b, j) {
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
          fb.className = "l03p-fb is-show l03p-fb--ok";
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
            document.getElementById("tqFb").className = "l03p-fb";
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
        '<article class="l03p-card"><div class="l03p-body-inner"><h1 class="l03p-title">' + esc(page.title) + "</h1>" +
        '<p class="l03p-lead">' + esc(page.lead || "连续答对即可通关！") + "</p>" +
        '<div class="l03p-streak-bar" id="stBar"></div>' +
        '<div id="stArea"><p class="l03p-lead">点击「开始」</p></div>' +
        '<div class="l03p-toolbar"><button type="button" class="l03p-btn" id="stStart">开始闯关</button></div>' +
        '<div class="l03p-fb" id="stFb"></div></div></article>'
      );
    }

    function bindStreakQuiz(page) {
      var target = page.target || 5;
      var sourcePool = page.questions || [];
      if (page.pool && global.L03pCorpus && global.L03pCorpus[page.pool]) {
        sourcePool = global.L03pCorpus[page.pool];
      }
      var pool = shuffle(sourcePool);
      var streak = 0;
      var pi = 0;

      function renderBar() {
        var bar = document.getElementById("stBar");
        if (!bar) return;
        var h = "";
        for (var i = 0; i < target; i++) {
          h += '<span class="l03p-streak-dot' + (i < streak ? " is-on" : "") + '">' + (i + 1) + "</span>";
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
            return '<button type="button" class="l03p-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        area.innerHTML = '<p class="l03p-ask">' + esc(q.q) + '</p><div class="l03p-choices" id="stCh">' + opts + "</div>";
        area.querySelectorAll("#stCh .l03p-choice").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.disabled) return;
            var i = Number(btn.getAttribute("data-i"));
            var ok = i === q.ans;
            area.querySelectorAll(".l03p-choice").forEach(function (b, j) {
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
                  fb.className = "l03p-fb is-show l03p-fb--ok";
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
                fb.className = "l03p-fb is-show l03p-fb--no";
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
          document.getElementById("stFb").className = "l03p-fb";
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
              return '<label class="l03p-mq-opt"><input type="radio" name="mq' + n + '" value="' + i + '"/> ' + esc(o) + "</label>";
            })
            .join("");
          return (
            '<div class="l03p-mq-item" data-n="' + n + '" data-ans="' + q.ans + '"><div class="l03p-mq-num">' +
            (n + 1) +
            "</div><p class=\"l03p-mq-q\">" +
            esc(q.q) +
            '</p><div class="l03p-mq-opts">' +
            opts +
            "</div></div>"
          );
        })
        .join("");
      return (
        header(page) +
        '<article class="l03p-card">' +
        (page.image ? hero(page) : "") +
        '<div class="l03p-body-inner"><h1 class="l03p-title">' +
        esc(page.title) +
        '</h1><p class="l03p-lead">' +
        esc(page.lead || "做完后点「交卷」") +
        '</p><div id="mqList">' +
        html +
        '</div><div class="l03p-toolbar"><button type="button" class="l03p-btn" id="mqSubmit">交卷</button></div><div class="l03p-fb" id="mqFb"></div></div></article>'
      );
    }

    function bindMultiQuiz(page) {
      document.getElementById("mqSubmit").addEventListener("click", function () {
        var items = document.querySelectorAll(".l03p-mq-item");
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
        fb.className = "l03p-fb is-show " + (ok === total ? "l03p-fb--ok" : ok >= total * 0.6 ? "l03p-fb--ok" : "l03p-fb--no");
        fb.innerHTML = "得分：" + ok + " / " + total + (ok === total ? " 全对！🎉" : ok >= total * 0.6 ? " 不错，再看看错题。" : " 加油，复习后再做！");
      });
    }

    /* ── 配对游戏 ── */
    function renderMatch(page) {
      var pairs = page.pairs || [];
      if (page.pool === "matchPairs" && global.L03pCorpus) pairs = global.L03pCorpus.matchPairs;
      var en = shuffle(pairs);
      var zh = shuffle(pairs);
      var enHtml = en
        .map(function (p, i) {
          return '<button type="button" class="l03p-match-item" data-idx="' + i + '" data-en="' + esc(p.en) + '">' + esc(p.en) + "</button>";
        })
        .join("");
      var zhHtml = zh
        .map(function (p, i) {
          return '<button type="button" class="l03p-match-item l03p-match-item--zh" data-idx="' + i + '" data-en="' + esc(p.en) + '">' + esc(p.zh) + "</button>";
        })
        .join("");
      return (
        header(page) +
        '<article class="l03p-card">' +
        hero(page) +
        '<div class="l03p-body-inner"><h1 class="l03p-title">' +
        esc(page.title) +
        '</h1><p class="l03p-lead">先点英文，再点对应中文</p><div class="l03p-match"><div><div class="l03p-match__label">English</div>' +
        enHtml +
        '</div><div><div class="l03p-match__label">中文</div>' +
        zhHtml +
        '</div></div><div class="l03p-fb" id="mpFb"></div></div></article>'
      );
    }

    function bindMatch(page) {
      var pickEn = null;
      var pickBtn = null;
      var done = 0;
      var pairs = page.pairs || [];
      if (page.pool === "matchPairs" && global.L03pCorpus) pairs = global.L03pCorpus.matchPairs;
      var total = pairs.length;
      document.querySelectorAll(".l03p-match-item:not(.l03p-match-item--zh)").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.classList.contains("is-done")) return;
          document.querySelectorAll(".l03p-match-item").forEach(function (b) {
            b.classList.remove("is-pick");
          });
          btn.classList.add("is-pick");
          pickEn = btn.getAttribute("data-en");
          pickBtn = btn;
        });
      });
      document.querySelectorAll(".l03p-match-item--zh").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!pickEn || btn.classList.contains("is-done")) return;
          var match = btn.getAttribute("data-en") === pickEn;
          if (match) {
            btn.classList.add("is-done");
            if (pickBtn) pickBtn.classList.add("is-done");
            document.querySelectorAll(".l03p-match-item").forEach(function (b) {
              b.classList.remove("is-pick");
            });
            pickEn = null;
            pickBtn = null;
            done++;
            speak(btn.getAttribute("data-en"));
            if (done >= total) {
              var fb = document.getElementById("mpFb");
              fb.className = "l03p-fb is-show l03p-fb--ok";
              fb.textContent = "全部配对成功！🎉";
            }
          } else {
            pickEn = null;
            pickBtn = null;
            document.querySelectorAll(".l03p-match-item").forEach(function (b) {
              b.classList.remove("is-pick");
            });
            var fb = document.getElementById("mpFb");
            fb.className = "l03p-fb is-show l03p-fb--no";
            fb.textContent = "不对哦，再试！";
          }
        });
      });
    }

    /* ── 听音快选 ── */
    function renderListenPick(page) {
      var item = page;
      if (page.pool && global.L03pCorpus && global.L03pCorpus[page.pool]) {
        var list = global.L03pCorpus[page.pool];
        item = list[page.startIndex || 0] || list[0];
      }
      var opts = item.opts
        .map(function (o, i) {
          return '<button type="button" class="l03p-choice" data-i="' + i + '">' + esc(o) + "</button>";
        })
        .join("");
      var rounds = page.rounds ? '<p class="l03p-lead" id="lpRound"></p>' : "";
      var nextBtn = page.rounds ? '<div class="l03p-toolbar"><button type="button" class="l03p-btn l03p-btn--ghost" id="lpNext" hidden>下一题 →</button></div>' : "";
      return (
        header(page) +
        '<article class="l03p-card">' +
        hero(page, item.audio) +
        '<div class="l03p-body-inner"><h1 class="l03p-title">' +
        esc(page.title) +
        '</h1>' + rounds +
        '<div class="l03p-sound-panel"><button type="button" class="l03p-btn l03p-btn--play" id="lpPlay">🔊</button><p>听句子，选正确答案</p></div>' +
        '<div class="l03p-choices" id="lpCh">' +
        opts +
        '</div>' + nextBtn +
        '<div class="l03p-fb" id="lpFb"></div></div></article>'
      );
    }

    function bindListenPick(page) {
      var list = [];
      if (page.pool && global.L03pCorpus && global.L03pCorpus[page.pool]) {
        list = global.L03pCorpus[page.pool].slice();
        if (page.rounds && page.rounds > 1) {
          list = shuffle(list);
        } else if (page.startIndex) {
          var si = page.startIndex % list.length;
          list = list.slice(si).concat(list.slice(0, si));
        }
      } else {
        list = [{ audio: page.audio, opts: page.opts, ans: page.ans, zh: page.zh, hint: page.hint }];
      }
      var totalRounds = page.rounds || 1;
      var round = 0;
      var score = 0;
      var current = null;

      function updateHeroForCurrent() {
        if (!current) return;
        var heroImg = document.querySelector(".l03p-hero img");
        if (!heroImg || !resolveImage) return;
        var name = resolveImage(page, current.audio);
        if (!name) return;
        heroImg.src = imgUrl(name);
        heroImg.setAttribute("onerror", "this.src='assets/img/" + name.replace(/'/g, "") + "'");
      }

      function renderRound() {
        current = list[round % list.length];
        var area = document.getElementById("lpCh");
        var fb = document.getElementById("lpFb");
        var next = document.getElementById("lpNext");
        var roundEl = document.getElementById("lpRound");
        if (roundEl) roundEl.textContent = "第 " + (round + 1) + " / " + totalRounds + " 题 · 得分 " + score;
        if (!area) return;
        updateHeroForCurrent();
        area.innerHTML = current.opts
          .map(function (o, i) {
            return '<button type="button" class="l03p-choice" data-i="' + i + '">' + esc(o) + "</button>";
          })
          .join("");
        if (fb) { fb.className = "l03p-fb"; fb.innerHTML = ""; }
        if (next) next.hidden = true;
        setTimeout(function () { speak(current.audio); }, 300);
        area.querySelectorAll(".l03p-choice").forEach(function (btn) {
          btn.addEventListener("click", onPick);
        });
      }

      function onPick() {
        var btn = this;
        if (btn.disabled) return;
        var i = Number(btn.getAttribute("data-i"));
        var ok = i === current.ans;
        var fb = document.getElementById("lpFb");
        document.querySelectorAll("#lpCh .l03p-choice").forEach(function (b, j) {
          b.disabled = true;
          if (j === current.ans) b.classList.add("is-ok");
          else if (j === i) b.classList.add("is-no");
        });
        if (ok) score++;
        if (fb) {
          fb.className = "l03p-fb is-show " + (ok ? "l03p-fb--ok" : "l03p-fb--no");
          fb.innerHTML = ok
            ? sentBlock(current.audio, current.zh) + ttsRow(current.audio)
            : esc(current.hint || page.hint || "再听一遍！");
          if (ok) bindCommon(fb);
        }
        var next = document.getElementById("lpNext");
        if (round + 1 >= totalRounds) {
          if (fb) {
            fb.className = "l03p-fb is-show " + (score >= Math.ceil(totalRounds * 0.6) ? "l03p-fb--ok" : "l03p-fb--no");
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
          return '<a class="l03p-hub-card" href="' + esc(m.href) + '"><span class="l03p-hub-card__icon">' + esc(m.icon) + '</span><strong>' + esc(m.title) + "</strong><span>" + esc(m.desc) + "</span></a>";
        })
        .join("");
      return (
        header(page) +
        '<article class="l03p-card">' +
        hero(page) +
        '<div class="l03p-body-inner"><h1 class="l03p-title">' +
        esc(page.title) +
        '</h1><p class="l03p-lead">' +
        esc(page.lead) +
        '</p><div class="l03p-hub-grid">' +
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

  global.L03pPractice = { register: register };
})(typeof window !== "undefined" ? window : null);
