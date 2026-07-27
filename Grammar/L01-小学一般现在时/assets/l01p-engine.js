(function (global) {
  "use strict";

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normSentence(s) {
    return String(s || "")
      .replace(/[.!?？！。]+$/g, "")
      .trim()
      .replace(/\s+/g, " ");
  }

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  /** 打乱词块；若结果与原文顺序相同则交换前两项，保证初始必为乱序。 */
  function shuffleTokenItems(items) {
    if (items.length < 2) return items.slice();
    var shuffled = shuffleArray(items);
    var same = true;
    for (var i = 0; i < items.length; i++) {
      if (shuffled[i].id !== items[i].id) {
        same = false;
        break;
      }
    }
    if (same) {
      var tmp = shuffled[0];
      shuffled[0] = shuffled[1];
      shuffled[1] = tmp;
    }
    return shuffled;
  }

  function tokensToItems(tokens) {
    return (tokens || []).map(function (t, i) {
      return { id: "t" + i, text: t };
    });
  }

  function itemsToText(items) {
    return items.map(function (it) {
      return it.text;
    });
  }

  function img(name) {
    return global.L01pImg ? global.L01pImg.url(name) : name;
  }

  function imgOnerror(name) {
    return global.L01pImg ? "this.src='" + esc(global.L01pImg.local(name)) + "'" : "";
  }

  function sceneImg(sentence, fallback) {
    var map = global.L01pScenes || {};
    return map[sentence] || fallback || "";
  }

  function speak(text, btn) {
    if (global.L01pTTS) return global.L01pTTS.speak(text, btn);
    return Promise.resolve();
  }

  function idx(page) {
    return global.L01pData.indexOf(page.id);
  }

  function nextPageId(pageId) {
    var i = global.L01pData.indexOf(pageId);
    var pages = global.L01pData.pages;
    return i >= 0 && i < pages.length - 1 ? pages[i + 1].id : null;
  }

  function header(page) {
    var pct = Math.round(((idx(page) + 1) / global.L01pData.total) * 100);
    return (
      '<header class="l01p-hd"><span class="l01p-hd__section">' +
      esc(page.section) +
      '</span><span class="l01p-hd__step">' +
      (idx(page) + 1) +
      " / " +
      global.L01pData.total +
      '</span></header><div class="l01p-hd__bar"><i style="width:' +
      pct +
      '%"></i></div>'
    );
  }

  function hero(page, sentence) {
    var im = page.image || sceneImg(sentence || page.sentence, "");
    if (!im) return "";
    var b = page.badge || "image";
    return (
      '<div class="l01p-hero"><span class="l01p-hero__badge l01p-hero__badge--' +
      b +
      '">' +
      esc(page.badgeText || "") +
      '</span><img src="' +
      img(im) +
      '" alt="" decoding="async" onerror="' +
      imgOnerror(im) +
      '" /></div>'
    );
  }

  function normApostrophe(s) {
    return String(s || "").replace(/[\u2018\u2019`´]/g, "'");
  }

  function sentBlock(sentence, zh, cls) {
    var s = normApostrophe(sentence);
    return (
      '<div class="l01p-sentence-wrap' +
      (cls ? " " + cls : "") +
      '"><p class="l01p-sentence en-line" lang="en">' +
      esc(s) +
      "</p>" +
      (zh ? '<span class="l01p-zh">' + esc(zh) + "</span>" : "") +
      "</div>"
    );
  }

  function ttsRow(sentence) {
    return (
      '<div class="l01p-toolbar"><button type="button" class="l01p-btn l01p-btn--play" data-speak="' +
      esc(sentence) +
      '" aria-label="朗读">🔊</button><span class="l01p-lead" style="margin:0;font-size:.78rem">点击蓝色单词可查 DeepSeek 词典</span></div>'
    );
  }

  function bindCommon(root) {
    (root || document).querySelectorAll("[data-speak]").forEach(function (btn) {
      if (btn._b) return;
      btn._b = true;
      btn.addEventListener("click", function () {
        btn.classList.add("is-on");
        speak(btn.getAttribute("data-speak"), btn).finally(function () {
          btn.classList.remove("is-on");
        });
      });
    });
    if (global.L01pWord) global.L01pWord.bind(root || document);
    else if (global.refreshHandoutLookup) global.refreshHandoutLookup(root || document.getElementById("l01pApp"));
  }

  function renderScene(page) {
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      "</h1>" +
      (page.lead ? '<p class="l01p-lead">' + esc(page.lead) + "</p>" : "") +
      sentBlock(page.sentence, page.zh, page.verbType ? "l01p-sentence-wrap--" + page.verbType : "") +
      (page.source ? '<p class="l01p-source">出处：' + esc(page.source) + "</p>" : "") +
      ttsRow(page.sentence) +
      "</div></article>"
    );
  }

  function renderSoundFirst(page) {
    return (
      header(page) +
      '<article class="l01p-card"><div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><div class="l01p-sound-panel"><button type="button" class="l01p-btn l01p-btn--play" id="sfPlay">🔊</button><p>' +
      esc(page.soundHint) +
      '</p></div><div id="sfReveal" class="l01p-reveal">' +
      (page.question ? '<p class="l01p-ask">' + esc(page.question) + "</p>" : "") +
      "</div>" +
      '<div class="l01p-toolbar"><button type="button" class="l01p-btn l01p-btn--ghost" id="sfShow" disabled>显示句子与图片</button></div></div></article>'
    );
  }

  function bindSoundFirst(page) {
    var played = false;
    var play = document.getElementById("sfPlay");
    var show = document.getElementById("sfShow");
    var rev = document.getElementById("sfReveal");
    if (play)
      play.addEventListener("click", function () {
        speak(page.audio, play).then(function () {
          played = true;
          if (show) show.disabled = false;
        });
      });
    if (show && rev)
      show.addEventListener("click", function () {
        if (!played) return;
        rev.classList.add("is-show");
        rev.insertAdjacentHTML(
          "beforeend",
          hero(page, page.sentence) +
            '<div style="padding:0 0 .5rem">' +
            sentBlock(page.sentence, page.zh) +
            ttsRow(page.sentence) +
            "</div>"
        );
        bindCommon(rev);
        show.disabled = true;
        speak(page.sentence);
      });
  }

  function renderSocratic(page) {
    var ch = (page.choices || [])
      .map(function (c, i) {
        return '<button type="button" class="l01p-choice" data-i="' + i + '">' + esc(c.text) + "</button>";
      })
      .join("");
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-ask">' +
      esc(page.question) +
      '</p><div class="l01p-choices" id="socCh">' +
      ch +
      '</div><div class="l01p-fb" id="socFb"></div><div id="socFollow" class="l01p-reveal"></div></div></article>'
    );
  }

  function bindSocratic(page) {
    var fb = document.getElementById("socFb");
    var fol = document.getElementById("socFollow");
    document.querySelectorAll("#socCh .l01p-choice").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var i = Number(btn.getAttribute("data-i"));
        var c = page.choices[i];
        document.querySelectorAll("#socCh .l01p-choice").forEach(function (b, j) {
          b.disabled = true;
          if (page.choices[j].correct) b.classList.add("is-ok");
          else if (j === i) b.classList.add("is-no");
        });
        fb.className = "l01p-fb is-show " + (c.correct ? "l01p-fb--ok" : "l01p-fb--no");
        fb.textContent = c.fb;
        if (page.sentence && fol) {
          fol.classList.add("is-show");
          fol.innerHTML =
            sentBlock(page.sentence, page.zh, page.verbType ? "l01p-sentence-wrap--" + page.verbType : "") +
            ttsRow(page.sentence);
          bindCommon(fol);
          speak(page.sentence);
        }
      });
    });
  }

  function renderDiscover(page) {
    return (
      header(page) +
      '<article class="l01p-card"><div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-lead">' +
      esc(page.lead) +
      '</p><div class="l01p-discover"><div class="l01p-discover__card" data-side="i"><img src="' +
      img(page.leftImage) +
      '" alt="" onerror="' +
      imgOnerror(page.leftImage) +
      '"/><div class="l01p-discover__txt">' +
      esc(page.leftLabel) +
      '</div></div><div class="l01p-discover__card" data-side="he"><img src="' +
      img(page.rightImage) +
      '" alt="" onerror="' +
      imgOnerror(page.rightImage) +
      '"/><div class="l01p-discover__txt">' +
      esc(page.rightLabel) +
      '</div></div></div><div id="discMorph" class="l01p-morph" style="margin-top:.65rem"></div><div class="l01p-toolbar"><button type="button" class="l01p-btn" id="discBtn">我发现了！对比动词</button></div><div class="l01p-fb" id="discFb"></div></div></article>'
    );
  }

  function bindDiscover(page) {
    var morph = document.getElementById("discMorph");
    var fb = document.getElementById("discFb");
    var btn = document.getElementById("discBtn");
    document.querySelectorAll(".l01p-discover__card").forEach(function (card) {
      card.addEventListener("click", function () {
        document.querySelectorAll(".l01p-discover__card").forEach(function (c) {
          c.classList.remove("is-pick");
        });
        card.classList.add("is-pick");
        var side = card.getAttribute("data-side");
        var s = side === "he" ? page.rightSentence : page.leftSentence;
        if (morph) {
          morph.innerHTML = sentBlock(s, side === "he" ? page.rightZh : page.leftZh);
          bindCommon(morph);
          speak(s);
        }
      });
    });
    if (btn)
      btn.addEventListener("click", function () {
        if (morph) {
          morph.innerHTML =
            '<span class="l01p-token l01p-token--subj">I</span><span class="l01p-token l01p-token--verb">play</span>' +
            '<span style="font-weight:900;color:#888;margin:0 .35rem">vs</span>' +
            '<span class="l01p-token l01p-token--subj">He</span><span class="l01p-token l01p-token--verb l01p-token--pop">play<span style="color:#c62828">s</span></span>';
        }
        if (fb) {
          fb.className = "l01p-fb is-show l01p-fb--ok";
          fb.textContent = page.discovery || "He/She/It 后面动词要加 s！";
        }
        speak("I play football. He plays football.");
      });
  }

  function renderBeMatch(page) {
    var chart = (page.chart || [])
      .map(function (c) {
        return (
          '<div class="l01p-be-chart__cell"><div class="l01p-be-chart__subj">' +
          esc(c.subjects) +
          '</div><div class="l01p-be-chart__be">' +
          esc(c.be) +
          "</div></div>"
        );
      })
      .join("");
    var drill = page.drill || [];
    var d0 = drill[0] || {};
    var opts = ["am", "is", "are"]
      .map(function (o, i) {
        return '<button type="button" class="l01p-choice" data-be="' + o + '">' + o + "</button>";
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
      '</p><div class="l01p-be-chart">' +
      chart +
      '</div><div class="l01p-be-drill" id="beDrill"><div class="l01p-be-drill__subj" id="beSubj">' +
      esc(d0.subject || "") +
      ' + <span style="color:#4a90d9">?</span></div><div class="l01p-choices" id="beOpts">' +
      opts +
      '</div><div class="l01p-fb" id="beFb"></div></div></div></article>'
    );
  }

  function bindBeMatch(page) {
    var drill = page.drill || [];
    var cur = 0;
    var subj = document.getElementById("beSubj");
    var fb = document.getElementById("beFb");
    var opts = document.getElementById("beOpts");

    function showItem() {
      var d = drill[cur];
      if (!d || !subj) return;
      subj.innerHTML = esc(d.subject) + ' + <span style="color:#4a90d9">?</span>';
      if (fb) {
        fb.className = "l01p-fb";
        fb.textContent = "";
      }
      if (opts)
        opts.querySelectorAll(".l01p-choice").forEach(function (b) {
          b.disabled = false;
          b.classList.remove("is-ok", "is-no");
        });
    }

    showItem();
    if (opts)
      opts.querySelectorAll(".l01p-choice").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.disabled) return;
          var d = drill[cur];
          var pick = btn.getAttribute("data-be");
          var ok = pick === d.ans;
          opts.querySelectorAll(".l01p-choice").forEach(function (b) {
            b.disabled = true;
            if (b.getAttribute("data-be") === d.ans) b.classList.add("is-ok");
            else if (b === btn) b.classList.add("is-no");
          });
          if (fb) {
            fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
            fb.innerHTML = ok
              ? sentBlock(d.sentence, d.zh, "l01p-sentence-wrap--state") + ttsRow(d.sentence)
              : "再想想：" + esc(d.subject) + " → " + esc(d.ans);
            if (ok) bindCommon(fb);
          }
          if (ok) {
            speak(d.sentence);
            setTimeout(function () {
              cur++;
              if (cur < drill.length) showItem();
              else if (fb) {
                fb.className = "l01p-fb is-show l01p-fb--ok";
                fb.textContent = "全部配对完成！am / is / are 记住了！";
              }
            }, 1200);
          }
        });
      });
  }

  function renderClassify(page) {
    var buckets = (page.buckets || [])
      .map(function (b) {
        return (
          '<div class="l01p-bucket l01p-bucket--' +
          b.key +
          '" data-bucket="' +
          b.key +
          '"><div class="l01p-bucket__label">' +
          esc(b.label) +
          '</div><div class="l01p-bucket__items"></div></div>'
        );
      })
      .join("");
    var bank = (page.items || [])
      .map(function (it, i) {
        return (
          '<button type="button" class="l01p-classify-card" data-i="' +
          i +
          '">' +
          esc(it.text) +
          "</button>"
        );
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
      '</p><div class="l01p-classify">' +
      buckets +
      '</div><p class="l01p-lead" style="margin-top:.45rem;font-weight:800">先点句子，再点篮子：</p><div class="l01p-classify-bank" id="clBank">' +
      bank +
      '</div><div class="l01p-fb" id="clFb"></div></div></article>'
    );
  }

  function bindClassify(page) {
    var pick = null;
    var fb = document.getElementById("clFb");
    var done = 0;
    var total = (page.items || []).length;

    document.querySelectorAll("#clBank .l01p-classify-card").forEach(function (card) {
      card.addEventListener("click", function () {
        if (card.classList.contains("is-done")) return;
        document.querySelectorAll("#clBank .l01p-classify-card").forEach(function (c) {
          c.classList.remove("is-pick");
        });
        card.classList.add("is-pick");
        pick = card;
        document.querySelectorAll(".l01p-bucket").forEach(function (b) {
          b.classList.add("is-target");
        });
      });
    });

    document.querySelectorAll(".l01p-bucket").forEach(function (bucket) {
      bucket.addEventListener("click", function () {
        if (!pick) return;
        var i = Number(pick.getAttribute("data-i"));
        var item = page.items[i];
        var key = bucket.getAttribute("data-bucket");
        var ok = key === item.bucket;
        document.querySelectorAll(".l01p-bucket").forEach(function (b) {
          b.classList.remove("is-target");
        });
        if (ok) {
          var placed = document.createElement("div");
          placed.className = "l01p-classify-card is-done";
          placed.textContent = item.text;
          bucket.querySelector(".l01p-bucket__items").appendChild(placed);
          pick.classList.add("is-done");
          pick.classList.remove("is-pick");
          pick = null;
          done++;
          speak(item.text);
          if (done >= total && fb) {
            fb.className = "l01p-fb is-show l01p-fb--ok";
            fb.textContent = "全部分对！动作义用实义动词，状态义用 am / is / are。";
          }
        } else if (fb) {
          fb.className = "l01p-fb is-show l01p-fb--no";
          fb.textContent = item.hint || "再想想：有 be 动词吗？";
          pick.classList.remove("is-pick");
          pick = null;
        }
      });
    });
  }

  function renderDynamic(page) {
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-lead">' +
      esc(page.lead) +
      '</p><div class="l01p-steps" id="dynSteps"></div><div class="l01p-morph" id="dynMorph"></div><div class="l01p-toolbar"><button type="button" class="l01p-btn" id="dynNext">下一步 ▶</button></div><div id="dynSent" class="l01p-reveal"></div></div></article>'
    );
  }

  function bindDynamic(page) {
    var steps = page.steps || [];
    var cur = 0;
    var morph = document.getElementById("dynMorph");
    var dots = document.getElementById("dynSteps");
    var next = document.getElementById("dynNext");
    var sent = document.getElementById("dynSent");
    var nxt = nextPageId(page.id);

    function renderDots() {
      if (!dots) return;
      dots.innerHTML = steps
        .map(function (_, i) {
          var cls = i < cur ? "is-done" : i === cur ? "is-on" : "";
          return '<span class="l01p-step-dot ' + cls + '">' + (i + 1) + "</span>";
        })
        .join("");
    }

    function showStep() {
      var st = steps[cur];
      if (!st) return;
      if (morph) morph.innerHTML = st.html;
      if (st.speak) speak(st.speak);
      renderDots();
      if (cur >= steps.length - 1) {
        if (next) {
          if (nxt) {
            next.outerHTML =
              '<a class="l01p-btn" id="dynNext" href="' + nxt + '.html">完成，下一页 →</a>';
          } else {
            next.textContent = "完成 ✓";
            next.disabled = true;
          }
        }
        if (sent && page.sentence) {
          sent.classList.add("is-show");
          sent.innerHTML =
            sentBlock(
              page.sentence,
              page.zh,
              page.kind === "neg" ? "l01p-sentence-wrap--neg" : page.kind === "q" ? "l01p-sentence-wrap--q" : ""
            ) + ttsRow(page.sentence);
          bindCommon(sent);
        }
      }
    }

    renderDots();
    showStep();
    if (next)
      next.addEventListener("click", function () {
        if (cur < steps.length - 1) {
          cur++;
          showStep();
        }
      });
  }

  function renderSpelling(page) {
    var tabs = page.rules
      .map(function (r, i) {
        return '<button type="button" class="l01p-spell-tab' + (i === 0 ? " is-on" : "") + '" data-i="' + i + '">' + esc(r.tab) + "</button>";
      })
      .join("");
    var panels = page.rules
      .map(function (r, i) {
        var rows = r.examples
          .map(function (e) {
            return '<div class="l01p-spell-row"><span>' + esc(e.from) + '</span><span class="l01p-spell-arrow">→</span><span style="color:#c62828">' + esc(e.to) + "</span></div>";
          })
          .join("");
        return (
          '<div class="l01p-spell-panel' +
          (i === 0 ? " is-on" : "") +
          '" data-i="' +
          i +
          '"><p class="l01p-lead" style="font-weight:800;color:#6a1b9a">' +
          esc(r.rule) +
          "</p>" +
          rows +
          (r.sample ? '<div style="margin-top:.5rem">' + sentBlock(r.sample, r.sampleZh) + ttsRow(r.sample) + "</div>" : "") +
          "</div>"
        );
      })
      .join("");
    return (
      header(page) +
      '<article class="l01p-card">' +
      (page.image ? hero(page) : "") +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><div class="l01p-spell-tabs" id="spellTabs">' +
      tabs +
      '</div><div id="spellPanels">' +
      panels +
      "</div></div></article>"
    );
  }

  function bindSpelling() {
    document.querySelectorAll("#spellTabs .l01p-spell-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var i = tab.getAttribute("data-i");
        document.querySelectorAll("#spellTabs .l01p-spell-tab").forEach(function (t) {
          t.classList.toggle("is-on", t === tab);
        });
        document.querySelectorAll("#spellPanels .l01p-spell-panel").forEach(function (p) {
          p.classList.toggle("is-on", p.getAttribute("data-i") === i);
        });
      });
    });
    bindCommon(document.getElementById("spellPanels"));
  }

  function renderOrderExercise(page, opts) {
    var hint =
      opts.hint ||
      "词块已随机打乱。点词块填入空槽，或先点空槽再点词块；点已填槽可退回。电脑可拖拽。";
    var audioPanel =
      opts.mode === "listen"
        ? '<div class="l01p-sound-panel l01p-order-audio">' +
          '<button type="button" class="l01p-btn l01p-btn--play" id="ordPlay" aria-label="播放句子">🔊</button>' +
          '<div><p class="l01p-order-audio__title">先听句子，再排序</p>' +
          '<p class="l01p-order-audio__sub">听不清可多点几次 · 排好后再检查</p></div></div>'
        : "";
    var checkBtn = opts.autoCheck
      ? ""
      : '<button type="button" class="l01p-btn" id="ordCheck">检查答案</button>';
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page, page.sentence) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-order-hint">' +
      hint +
      "</p>" +
      audioPanel +
      '<p class="l01p-order-label">① 按顺序填入</p>' +
      '<div class="l01p-order-slots" id="ordSlots" aria-label="句子排序槽"></div>' +
      '<p class="l01p-order-label">② 词块池 <span class="l01p-order-label__tag">已打乱</span></p>' +
      '<div class="l01p-order-pool" id="ordPool" aria-label="词块池"></div>' +
      '<div class="l01p-toolbar">' +
      '<button type="button" class="l01p-btn l01p-btn--ghost" id="ordReset">重来</button>' +
      checkBtn +
      "</div>" +
      '<div class="l01p-fb" id="ordFb"></div></div></article>'
    );
  }

  function bindOrderExercise(page, opts) {
    var correctItems = tokensToItems(page.tokens);
    var slotsEl = document.getElementById("ordSlots");
    var poolEl = document.getElementById("ordPool");
    var fb = document.getElementById("ordFb");
    var slots = [];
    var locked = false;
    var dragItem = null;
    var dragFrom = null;
    var focusSlot = -1;

    function speakAudio(btn) {
      speak(page.audio || page.sentence, btn);
    }

    function renderSlots() {
      if (!slotsEl) return;
      slotsEl.innerHTML = "";
      correctItems.forEach(function (_, i) {
        var filled = slots[i];
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className =
          "l01p-order-slot" +
          (filled ? " is-filled" : " is-empty") +
          (!filled && focusSlot === i ? " is-focus" : "");
        btn.setAttribute("data-slot", String(i));
        btn.setAttribute("aria-label", "第 " + (i + 1) + " 位");
        if (filled) {
          btn.textContent = filled.text;
          btn.setAttribute("data-id", filled.id);
        } else {
          btn.innerHTML = '<span class="l01p-order-slot__num">' + (i + 1) + "</span>";
        }
        btn.addEventListener("click", function () {
          onSlotTap(i);
        });
        btn.addEventListener("dragover", function (e) {
          e.preventDefault();
          btn.classList.add("is-target");
        });
        btn.addEventListener("dragleave", function () {
          btn.classList.remove("is-target");
        });
        btn.addEventListener("drop", function (e) {
          e.preventDefault();
          btn.classList.remove("is-target");
          onDropToSlot(i);
        });
        if (filled) {
          btn.draggable = !locked;
          btn.addEventListener("dragstart", function () {
            dragItem = filled;
            dragFrom = { type: "slot", index: i };
          });
          btn.addEventListener("dragend", function () {
            dragItem = null;
            dragFrom = null;
          });
        }
        slotsEl.appendChild(btn);
      });
    }

    function createPoolChip(item) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "l01p-order-chip";
      chip.textContent = item.text;
      chip.setAttribute("data-id", item.id);
      chip.draggable = !locked;
      chip.addEventListener("click", function () {
        placeFromPool(item, chip, focusSlot);
      });
      chip.addEventListener("dragstart", function () {
        dragItem = item;
        dragFrom = { type: "pool", el: chip };
      });
      chip.addEventListener("dragend", function () {
        dragItem = null;
        dragFrom = null;
      });
      return chip;
    }

    function renderPool(items) {
      if (!poolEl) return;
      poolEl.innerHTML = "";
      items.forEach(function (item) {
        poolEl.appendChild(createPoolChip(item));
      });
    }

    function firstEmptySlot() {
      for (var i = 0; i < slots.length; i++) {
        if (!slots[i]) return i;
      }
      return -1;
    }

    function placeFromPool(item, chipEl, slotIndex) {
      if (locked) return;
      var idx = typeof slotIndex === "number" && slotIndex >= 0 && !slots[slotIndex] ? slotIndex : firstEmptySlot();
      if (idx < 0) return;
      focusSlot = -1;
      slots[idx] = item;
      if (chipEl && chipEl.parentNode) chipEl.parentNode.removeChild(chipEl);
      renderSlots();
      maybeAutoCheck();
    }

    function returnToPool(item) {
      if (!poolEl || !item) return;
      poolEl.appendChild(createPoolChip(item));
    }

    function onSlotTap(index) {
      if (locked) return;
      var item = slots[index];
      if (item) {
        focusSlot = -1;
        slots[index] = null;
        renderSlots();
        returnToPool(item);
        return;
      }
      focusSlot = focusSlot === index ? -1 : index;
      renderSlots();
    }

    function onDropToSlot(index) {
      if (locked || !dragItem) return;
      var existing = slots[index];
      if (dragFrom && dragFrom.type === "pool") {
        if (dragFrom.el && dragFrom.el.parentNode) {
          dragFrom.el.parentNode.removeChild(dragFrom.el);
        }
        if (existing) returnToPool(existing);
        slots[index] = dragItem;
      } else if (dragFrom && dragFrom.type === "slot") {
        var fromIdx = dragFrom.index;
        if (fromIdx === index) return;
        slots[fromIdx] = existing || null;
        slots[index] = dragItem;
      }
      dragItem = null;
      dragFrom = null;
      renderSlots();
      maybeAutoCheck();
    }

    function isComplete() {
      return slots.length === correctItems.length && slots.every(Boolean);
    }

    function isCorrect() {
      if (!isComplete()) return false;
      for (var i = 0; i < correctItems.length; i++) {
        if (!slots[i] || slots[i].id !== correctItems[i].id) return false;
      }
      return true;
    }

    function showResult(ok) {
      if (ok) locked = true;
      if (!fb) return;
      fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
      if (ok) {
        fb.innerHTML =
          (opts.successText || "正确！") +
          sentBlock(page.sentence, page.zh) +
          ttsRow(page.sentence);
        bindCommon(fb);
        speak(page.sentence);
      } else {
        fb.textContent = opts.failText || "顺序还不对，再听一遍或点「重来」！";
        if (opts.autoCheck) {
          setTimeout(function () {
            resetBoard();
          }, 1400);
        }
      }
      if (slotsEl) {
        slotsEl.querySelectorAll(".l01p-order-slot").forEach(function (el, i) {
          if (!slots[i]) return;
          el.classList.add(slots[i].id === correctItems[i].id ? "is-correct" : "is-wrong");
        });
      }
    }

    function checkAnswer() {
      if (!isComplete()) {
        if (fb) {
          fb.className = "l01p-fb is-show l01p-fb--no";
          fb.textContent = "请先填满所有排序槽。";
        }
        return;
      }
      showResult(isCorrect());
    }

    function maybeAutoCheck() {
      if (opts.autoCheck && isComplete()) {
        setTimeout(checkAnswer, 180);
      }
    }

    function resetBoard() {
      locked = false;
      focusSlot = -1;
      slots = correctItems.map(function () {
        return null;
      });
      if (fb) {
        fb.className = "l01p-fb";
        fb.innerHTML = "";
      }
      renderSlots();
      renderPool(shuffleTokenItems(correctItems));
      if (opts.autoPlay) {
        setTimeout(function () {
          speakAudio();
        }, 350);
      }
    }

    if (poolEl) {
      poolEl.addEventListener("dragover", function (e) {
        e.preventDefault();
        poolEl.classList.add("is-target");
      });
      poolEl.addEventListener("dragleave", function () {
        poolEl.classList.remove("is-target");
      });
      poolEl.addEventListener("drop", function (e) {
        e.preventDefault();
        poolEl.classList.remove("is-target");
        if (locked || !dragItem || !dragFrom || dragFrom.type !== "slot") return;
        slots[dragFrom.index] = null;
        returnToPool(dragItem);
        dragItem = null;
        dragFrom = null;
        renderSlots();
      });
    }

    var resetBtn = document.getElementById("ordReset");
    if (resetBtn) resetBtn.addEventListener("click", resetBoard);
    var checkBtn = document.getElementById("ordCheck");
    if (checkBtn) checkBtn.addEventListener("click", checkAnswer);
    var playBtn = document.getElementById("ordPlay");
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        speakAudio(playBtn);
      });
    }

    resetBoard();
    bindCommon(document);
  }

  function renderPictureBuild(page) {
    return renderOrderExercise(page, {
      mode: "build",
      hint:
        (page.instruction || "将词块排成正确句子。") +
        " 词块已<strong>随机打乱</strong>：点词块填入空槽，点已填槽可退回；电脑也可拖拽。",
      autoCheck: true,
    });
  }

  function bindPictureBuild(page) {
    bindOrderExercise(page, {
      mode: "build",
      autoCheck: true,
      successText: "造句正确！",
      failText: "顺序不对，再试一次！",
    });
  }

  function renderListenOrder(page) {
    return renderOrderExercise(page, {
      mode: "listen",
      hint:
        "先听完整句子，再把<strong>已打乱</strong>的词块从左到右排好。手机：点词块 → 点空槽；电脑：可拖拽。",
      autoCheck: false,
    });
  }

  function bindListenOrder(page) {
    bindOrderExercise(page, {
      mode: "listen",
      autoCheck: false,
      autoPlay: true,
      failText: "还不对，再听一遍！可点 🔊 重听。",
    });
  }

  function renderQuiz(page) {
    var opts = page.opts
      .map(function (o, i) {
        return '<button type="button" class="l01p-choice" data-i="' + i + '">' + esc(o) + "</button>";
      })
      .join("");
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page, page.sentence) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-ask">' +
      esc(page.q) +
      '</p><div class="l01p-choices" id="qzCh">' +
      opts +
      '</div><div class="l01p-fb" id="qzFb"></div></div></article>'
    );
  }

  function bindQuiz(page) {
    var fb = document.getElementById("qzFb");
    document.querySelectorAll("#qzCh .l01p-choice").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var i = Number(btn.getAttribute("data-i"));
        var ok = i === page.ans;
        document.querySelectorAll("#qzCh .l01p-choice").forEach(function (b, j) {
          b.disabled = true;
          if (j === page.ans) b.classList.add("is-ok");
          else if (j === i) b.classList.add("is-no");
        });
        fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
        fb.textContent = ok ? "太棒了！✓" : page.hint;
        if (page.sentence && ok) {
          fb.innerHTML = "太棒了！✓" + sentBlock(page.sentence, page.zh) + ttsRow(page.sentence);
          bindCommon(fb);
          speak(page.sentence);
        }
      });
    });
  }

  function renderSummary(page) {
    var list = (page.checklist || [])
      .map(function (t) {
        return "<li>" + esc(t) + "</li>";
      })
      .join("");
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><ul style="margin:0;padding:0 0 0 1.1rem;line-height:1.85;font-weight:700">' +
      list +
      '</ul><div class="l01p-chant" style="margin-top:.65rem">' +
      esc(page.chant) +
      '</div><div class="l01p-toolbar"><button type="button" class="l01p-btn" data-speak="' +
      esc(page.chantSpeak || "I play football. She plays football. I am happy.") +
      '">🔊 听口诀</button><a class="l01p-btn l01p-btn--ghost" href="index.html">目录</a></div></div></article>'
    );
  }

  var RENDER = {
    scene: renderScene,
    "sound-first": renderSoundFirst,
    socratic: renderSocratic,
    discover: renderDiscover,
    "be-match": renderBeMatch,
    classify: renderClassify,
    dynamic: renderDynamic,
    spelling: renderSpelling,
    "picture-build": renderPictureBuild,
    "listen-order": renderListenOrder,
    quiz: renderQuiz,
    summary: renderSummary,
  };

  function bindScenePage() {
    bindCommon(document.getElementById("l01pApp"));
  }

  var BIND = {
    scene: bindScenePage,
    "sound-first": bindSoundFirst,
    socratic: bindSocratic,
    discover: bindDiscover,
    "be-match": bindBeMatch,
    classify: bindClassify,
    dynamic: bindDynamic,
    spelling: bindSpelling,
    "picture-build": bindPictureBuild,
    "listen-order": bindListenOrder,
    quiz: bindQuiz,
    summary: bindScenePage,
  };

  function renderPager(pageId) {
    var nav = document.getElementById("l01pPager");
    if (!nav) return;
    var i = global.L01pData.indexOf(pageId);
    var pages = global.L01pData.pages;
    var prev = i > 0 ? pages[i - 1].id : null;
    var next = i < pages.length - 1 ? pages[i + 1].id : null;
    nav.innerHTML =
      (prev
        ? '<a class="l01p-pager__prev" href="' + prev + '.html">← 上一页</a>'
        : '<a class="l01p-pager__prev is-muted" href="index.html">← 目录</a>') +
      '<a class="l01p-pager__logo" href="../index.html"><img src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png" alt="Logo" width="96" height="34" decoding="async"/></a>' +
      (next
        ? '<a class="l01p-pager__next" href="' + next + '.html">下一页 →</a>'
        : '<a class="l01p-pager__next" href="index.html">目录 →</a>');
  }

  function render(pageId) {
    var page = global.L01pData.byId(pageId);
    var app = document.getElementById("l01pApp");
    if (!page || !app) return;
    document.title = "L01P · " + page.title;
    var fn = RENDER[page.type];
    app.innerHTML = fn ? fn(page) : "<p>未知类型</p>";
    var b = BIND[page.type];
    try {
      if (b) b(page);
      else bindCommon(app);
    } catch (err) {
      console.error("[L01p] bind error:", err);
      bindCommon(app);
    }
    renderPager(pageId);
  }

  global.L01pEngine = { render: render };

  if (global.L01pPractice) {
    global.L01pPractice.register(RENDER, BIND, {
      esc: esc,
      header: header,
      hero: hero,
      sentBlock: sentBlock,
      ttsRow: ttsRow,
      bindCommon: bindCommon,
      speak: speak,
      img: img,
    });
  }
})(typeof window !== "undefined" ? window : null);
