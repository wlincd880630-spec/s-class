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

  function sentBlock(sentence, zh, cls) {
    var inner = global.L01pWord ? global.L01pWord.wrap(sentence) : esc(sentence);
    return (
      '<div class="l01p-sentence-wrap' +
      (cls ? " " + cls : "") +
      '"><p class="l01p-sentence">' +
      inner +
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

  function renderPictureBuild(page) {
    var chips = page.tokens
      .map(function (t) {
        return '<button type="button" class="l01p-chip" data-t="' + esc(t) + '">' + esc(t) + "</button>";
      })
      .join("");
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-lead">' +
      esc(page.instruction) +
      '</p><div class="l01p-build" id="pbBuild"></div><div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.45rem" id="pbBank">' +
      chips +
      '</div><div class="l01p-toolbar"><button type="button" class="l01p-btn l01p-btn--ghost" id="pbReset">重来</button></div><div class="l01p-fb" id="pbFb"></div></div></article>'
    );
  }

  function bindPictureBuild(page) {
    var picked = [];
    var build = document.getElementById("pbBuild");
    var fb = document.getElementById("pbFb");

    function reset() {
      picked = [];
      if (build) build.innerHTML = "";
      if (fb) fb.className = "l01p-fb";
      document.querySelectorAll("#pbBank .l01p-chip").forEach(function (c) {
        c.classList.remove("is-used");
      });
    }

    var resetBtn = document.getElementById("pbReset");
    if (resetBtn) resetBtn.addEventListener("click", reset);

    document.querySelectorAll("#pbBank .l01p-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        if (chip.classList.contains("is-used")) return;
        chip.classList.add("is-used");
        picked.push(chip.getAttribute("data-t"));
        var s = document.createElement("span");
        s.className = "l01p-chip";
        s.textContent = chip.getAttribute("data-t");
        build.appendChild(s);
        if (picked.length >= page.tokens.length) {
          var ok = normSentence(picked.join(" ")) === normSentence(page.sentence);
          fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
          fb.innerHTML = ok
            ? "正确！" + sentBlock(page.sentence, page.zh) + ttsRow(page.sentence)
            : "顺序不对，点「重来」再试一次！";
          if (ok) {
            bindCommon(fb);
            speak(page.sentence);
          } else {
            setTimeout(reset, 1500);
          }
        }
      });
    });
  }

  function renderListenOrder(page) {
    var shuffled = page.tokens.slice().sort(function () {
      return Math.random() - 0.5;
    });
    var items = shuffled
      .map(function (t) {
        return '<div class="l01p-order-item" draggable="true" data-t="' + esc(t) + '">' + esc(t) + "</div>";
      })
      .join("");
    return (
      header(page) +
      '<article class="l01p-card">' +
      hero(page, page.sentence) +
      '<div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><div class="l01p-sound-panel" style="padding:.75rem"><button type="button" class="l01p-btn l01p-btn--play" data-speak="' +
      esc(page.audio || page.sentence) +
      '">🔊</button><p>先听，再拖动或点击调整顺序</p></div><div id="loList" style="display:flex;flex-direction:column;gap:.35rem">' +
      items +
      '</div><div class="l01p-toolbar"><button type="button" class="l01p-btn" id="loCheck">检查答案</button></div><div class="l01p-fb" id="loFb"></div></div></article>'
    );
  }

  function bindListenOrder(page) {
    var list = document.getElementById("loList");
    var fb = document.getElementById("loFb");
    var drag = null;
    if (list) {
      list.querySelectorAll(".l01p-order-item").forEach(function (item) {
        item.addEventListener("dragstart", function () {
          drag = item;
        });
        item.addEventListener("dragover", function (e) {
          e.preventDefault();
        });
        item.addEventListener("drop", function (e) {
          e.preventDefault();
          if (drag && drag !== item) {
            var nodes = Array.from(list.children);
            var a = nodes.indexOf(drag);
            var b = nodes.indexOf(item);
            if (a < b) list.insertBefore(drag, item.nextSibling);
            else list.insertBefore(drag, item);
          }
        });
        item.addEventListener("click", function () {
          if (item.nextSibling) list.insertBefore(item.nextSibling, item);
        });
      });
    }
    var chk = document.getElementById("loCheck");
    if (chk)
      chk.addEventListener("click", function () {
        var order = Array.from(list.querySelectorAll(".l01p-order-item")).map(function (el) {
          return el.getAttribute("data-t");
        });
        var ok = order.join(" ") === page.tokens.join(" ");
        fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
        fb.innerHTML = ok
          ? sentBlock(page.sentence, page.zh) + ttsRow(page.sentence)
          : "还不对，再听一遍！";
        if (ok) {
          bindCommon(fb);
          speak(page.sentence);
        }
      });
    bindCommon(document);
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

  var BIND = {
    scene: bindCommon,
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
    summary: bindCommon,
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
    if (b) b(page);
    else bindCommon(app);
    renderPager(pageId);
  }

  global.L01pEngine = { render: render };
})(typeof window !== "undefined" ? window : null);
