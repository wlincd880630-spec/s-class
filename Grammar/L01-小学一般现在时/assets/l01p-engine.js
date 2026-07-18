(function (global) {
  "use strict";

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function img(name) {
    return global.L01pImg ? global.L01pImg.url(name) : name;
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
      '" alt="" decoding="async" onerror="this.src=\'' +
      esc(global.L01pImg.local(im)) +
      "'\" /></div>"
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

  /* ── scene：每句必配图 ── */
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

  /* ── sound-first ── */
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

  /* ── socratic ── */
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
          fol.innerHTML = sentBlock(page.sentence, page.zh, page.verbType ? "l01p-sentence-wrap--" + page.verbType : "") + ttsRow(page.sentence);
          bindCommon(fol);
          speak(page.sentence);
        }
      });
    });
  }

  /* ── discover-3s：自我发现对比 ── */
  function renderDiscover(page) {
    return (
      header(page) +
      '<article class="l01p-card"><div class="l01p-body-inner"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-lead">' +
      esc(page.lead) +
      '</p><div class="l01p-discover"><div class="l01p-discover__card" data-side="i"><img src="' +
      img(page.leftImage) +
      '" alt=""/><div class="l01p-discover__txt">' +
      esc(page.leftLabel) +
      '</div></div><div class="l01p-discover__card" data-side="he"><img src="' +
      img(page.rightImage) +
      '" alt=""/><div class="l01p-discover__txt">' +
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
            '<span style="font-weight:900;color:#94a3b8;margin:0 .35rem">vs</span>' +
            '<span class="l01p-token l01p-token--subj">He</span><span class="l01p-token l01p-token--verb l01p-token--pop">play<span style="color:#f59e0b">s</span></span>';
        }
        if (fb) {
          fb.className = "l01p-fb is-show l01p-fb--ok";
          fb.textContent = page.discovery || "He/She/It 后面动词要加 s！";
        }
        speak("I play football. He plays football.");
      });
  }

  /* ── dynamic-neg / dynamic-q ── */
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
        if (next) next.textContent = "完成 ✓";
        if (sent && page.sentence) {
          sent.classList.add("is-show");
          sent.innerHTML =
            sentBlock(page.sentence, page.zh, page.kind === "neg" ? "l01p-sentence-wrap--neg" : "l01p-sentence-wrap--q") +
            ttsRow(page.sentence);
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

  /* ── spelling-lab ── */
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
            return '<div class="l01p-spell-row"><span>' + esc(e.from) + '</span><span class="l01p-spell-arrow">→</span><span style="color:#b91c1c">' + esc(e.to) + "</span></div>";
          })
          .join("");
        return (
          '<div class="l01p-spell-panel' +
          (i === 0 ? " is-on" : "") +
          '" data-i="' +
          i +
          '"><p class="l01p-lead" style="font-weight:800;color:#6d28d9">' +
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
      '<article class="l01p-card"><div class="l01p-body-inner"><h1 class="l01p-title">' +
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

  /* ── picture-build / listen-order / quiz / summary ── */
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
      '</div><div class="l01p-fb" id="pbFb"></div></div></article>'
    );
  }

  function bindPictureBuild(page) {
    var picked = [];
    var build = document.getElementById("pbBuild");
    var fb = document.getElementById("pbFb");
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
          var ok = picked.join(" ") === page.sentence;
          fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
          fb.innerHTML = ok
            ? "正确！" + sentBlock(page.sentence, page.zh) + ttsRow(page.sentence)
            : "再试一次，正确顺序：" + esc(page.sentence);
          if (ok) bindCommon(fb);
          if (ok) speak(page.sentence);
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
      '">🔊</button><p>先听，再拖动排序</p></div><div id="loList" style="display:flex;flex-direction:column;gap:.35rem">' +
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
      '</h1><p class="l01p-ask" style="background:#ede9fe;border-color:#c4b5fd;color:#4c1d95">' +
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
        if (page.sentence && ok) speak(page.sentence);
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
      '</h1><ul style="margin:0;padding:0;list-style:none">' +
      list +
      '</ul><div class="l01p-chant" style="margin-top:.65rem">' +
      esc(page.chant) +
      '</div><div class="l01p-toolbar"><button type="button" class="l01p-btn" data-speak="I play football. She plays football.">🔊 听口诀</button><a class="l01p-btn l01p-btn--ghost" href="index.html">目录</a></div></div></article>'
    );
  }

  var RENDER = {
    scene: renderScene,
    "sound-first": renderSoundFirst,
    socratic: renderSocratic,
    discover: renderDiscover,
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
      (prev ? '<a class="l01p-pager__prev" href="' + prev + '.html">← 上一页</a>' : '<a class="l01p-pager__prev is-muted" href="index.html">← 目录</a>') +
      '<a class="l01p-pager__logo" href="../index.html"><img src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png" alt="Logo" width="96" height="34" decoding="async"/></a>' +
      (next ? '<a class="l01p-pager__next" href="' + next + '.html">下一页 →</a>' : '<a class="l01p-pager__next" href="index.html">目录 →</a>');
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
