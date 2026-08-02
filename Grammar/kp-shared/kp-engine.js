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
    if (!name) return "";
    if (global.KpImg) {
      var host = typeof location !== "undefined" && location.hostname ? location.hostname : "";
      if (host === "localhost" || host === "127.0.0.1") return global.KpImg.local(name);
      return global.KpImg.url(name);
    }
    return name;
  }

  function imgOnerror(name) {
    return global.KpImg ? "this.src='" + esc(global.KpImg.local(name)) + "'" : "";
  }

  function sceneImg(sentence, fallback) {
    var map = global.KpScenes || {};
    return map[sentence] || fallback || "";
  }

  /** 按例句查找配图：场景表 → 词汇卡 example → 页面 fallback */
  function imageForSentence(sentence) {
    if (!sentence) return "";
    var fromScene = sceneImg(sentence, "");
    if (fromScene) return fromScene;
    var pools = global.KpCorpus;
    if (!pools) return "";
    var lists = [pools.vocabRegular, pools.vocabIrregular, pools.vocabTime, pools.vocabBe];
    var pi, wi, w;
    for (pi = 0; pi < lists.length; pi++) {
      var list = lists[pi] || [];
      for (wi = 0; wi < list.length; wi++) {
        w = list[wi];
        if (w.example === sentence && w.image) return w.image;
      }
    }
    return "";
  }

  var CONCEPT_IMAGES = {
    "kp-past-vs-present.jpg": true,
    "kp-was-were-chart.jpg": true,
    "kp-playground.jpg": true,
  };

  function resolveImage(page, sentence) {
    var sent = sentence || page.sentence || page.audio || "";
    var fromScene = imageForSentence(sent);
    if (page.image && CONCEPT_IMAGES[page.image]) return page.image;
    if (fromScene) return fromScene;
    return page.image || "";
  }

  function speak(text, btn) {
    if (global.KpTTS) return global.KpTTS.speak(text, btn);
    return Promise.resolve();
  }

  function idx(page) {
    return global.KpData.indexOf(page.id);
  }

  function nextPageId(pageId) {
    var i = global.KpData.indexOf(pageId);
    var pages = global.KpData.pages;
    return i >= 0 && i < pages.length - 1 ? pages[i + 1].id : null;
  }

  function header(page) {
    var pct = Math.round(((idx(page) + 1) / global.KpData.total) * 100);
    return (
      '<header class="kp-hd"><span class="kp-hd__section">' +
      esc(page.section) +
      '</span><span class="kp-hd__step">' +
      (idx(page) + 1) +
      " / " +
      global.KpData.total +
      '</span></header><div class="kp-hd__bar"><i style="width:' +
      pct +
      '%"></i></div>'
    );
  }

  function hero(page, sentence) {
    var im = resolveImage(page, sentence);
    if (!im) return "";
    var b = page.badge || "image";
    return (
      '<div class="kp-hero"><span class="kp-hero__badge kp-hero__badge--' +
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
      '<div class="kp-sentence-wrap' +
      (cls ? " " + cls : "") +
      '"><p class="kp-sentence en-line" lang="en">' +
      esc(s) +
      "</p>" +
      (zh ? '<span class="kp-zh">' + esc(zh) + "</span>" : "") +
      "</div>"
    );
  }

  function ttsRow(sentence) {
    return (
      '<div class="kp-toolbar"><button type="button" class="kp-btn kp-btn--play" data-speak="' +
      esc(sentence) +
      '" aria-label="朗读">🔊</button><span class="kp-lead" style="margin:0;font-size:.78rem">点击蓝色单词可查 DeepSeek 词典</span></div>'
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
    if (global.KpWord) global.KpWord.bind(root || document);
    else if (global.refreshHandoutLookup) global.refreshHandoutLookup(root || document.getElementById("kpApp"));
  }

  function renderScene(page) {
    return (
      header(page) +
      '<article class="kp-card">' +
      hero(page) +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      "</h1>" +
      (page.lead ? '<p class="kp-lead">' + esc(page.lead) + "</p>" : "") +
      sentBlock(page.sentence, page.zh, page.verbType ? "kp-sentence-wrap--" + page.verbType : "") +
      (page.source ? '<p class="kp-source">出处：' + esc(page.source) + "</p>" : "") +
      ttsRow(page.sentence) +
      "</div></article>"
    );
  }

  function renderSoundFirst(page) {
    return (
      header(page) +
      '<article class="kp-card"><div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><div class="kp-sound-panel"><button type="button" class="kp-btn kp-btn--play" id="sfPlay">🔊</button><p>' +
      esc(page.soundHint) +
      '</p></div><div id="sfReveal" class="kp-reveal">' +
      (page.question ? '<p class="kp-ask">' + esc(page.question) + "</p>" : "") +
      "</div>" +
      '<div class="kp-toolbar"><button type="button" class="kp-btn kp-btn--ghost" id="sfShow" disabled>显示句子与图片</button></div></div></article>'
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
        return '<button type="button" class="kp-choice" data-i="' + i + '">' + esc(c.text) + "</button>";
      })
      .join("");
    return (
      header(page) +
      '<article class="kp-card">' +
      hero(page) +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><p class="kp-ask">' +
      esc(page.question) +
      '</p><div class="kp-choices" id="socCh">' +
      ch +
      '</div><div class="kp-fb" id="socFb"></div><div id="socFollow" class="kp-reveal"></div></div></article>'
    );
  }

  function bindSocratic(page) {
    var fb = document.getElementById("socFb");
    var fol = document.getElementById("socFollow");
    document.querySelectorAll("#socCh .kp-choice").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var i = Number(btn.getAttribute("data-i"));
        var c = page.choices[i];
        document.querySelectorAll("#socCh .kp-choice").forEach(function (b, j) {
          b.disabled = true;
          if (page.choices[j].correct) b.classList.add("is-ok");
          else if (j === i) b.classList.add("is-no");
        });
        fb.className = "kp-fb is-show " + (c.correct ? "kp-fb--ok" : "kp-fb--no");
        fb.textContent = c.fb;
        if (page.sentence && fol) {
          fol.classList.add("is-show");
          fol.innerHTML =
            sentBlock(page.sentence, page.zh, page.verbType ? "kp-sentence-wrap--" + page.verbType : "") +
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
      '<article class="kp-card"><div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><p class="kp-lead">' +
      esc(page.lead) +
      '</p><div class="kp-discover"><div class="kp-discover__card" data-side="i"><img src="' +
      img(page.leftImage) +
      '" alt="" onerror="' +
      imgOnerror(page.leftImage) +
      '"/><div class="kp-discover__txt">' +
      esc(page.leftLabel) +
      '</div></div><div class="kp-discover__card" data-side="he"><img src="' +
      img(page.rightImage) +
      '" alt="" onerror="' +
      imgOnerror(page.rightImage) +
      '"/><div class="kp-discover__txt">' +
      esc(page.rightLabel) +
      '</div></div></div><div id="discMorph" class="kp-morph" style="margin-top:.65rem"></div><div class="kp-toolbar"><button type="button" class="kp-btn" id="discBtn">我发现了！对比动词</button></div><div class="kp-fb" id="discFb"></div></div></article>'
    );
  }

  function bindDiscover(page) {
    var morph = document.getElementById("discMorph");
    var fb = document.getElementById("discFb");
    var btn = document.getElementById("discBtn");
    document.querySelectorAll(".kp-discover__card").forEach(function (card) {
      card.addEventListener("click", function () {
        document.querySelectorAll(".kp-discover__card").forEach(function (c) {
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
          var base = page.morphBase || "play";
          var past = page.morphPast || "played";
          var hi = page.morphHighlight || "ed";
          var pastHtml = past;
          if (hi && past.toLowerCase().endsWith(hi.toLowerCase())) {
            pastHtml =
              esc(past.slice(0, past.length - hi.length)) +
              '<span style="color:#c62828">' +
              esc(hi) +
              "</span>";
          } else {
            pastHtml = esc(past);
          }
          morph.innerHTML =
            '<span class="kp-token kp-token--verb">' +
            esc(base) +
            "</span>" +
            '<span style="font-weight:900;color:#888;margin:0 .35rem">→</span>' +
            '<span class="kp-token kp-token--verb kp-token--pop">' +
            pastHtml +
            "</span>";
        }
        if (fb) {
          fb.className = "kp-fb is-show kp-fb--ok";
          fb.textContent = page.discovery || "过去发生的动作，规则动词要加 -ed：play → played！";
        }
        speak(page.morphSpeak || page.leftSentence + " " + page.rightSentence);
      });
  }

  function renderBeMatch(page) {
    var chart = (page.chart || [])
      .map(function (c) {
        return (
          '<div class="kp-be-chart__cell"><div class="kp-be-chart__subj">' +
          esc(c.subjects) +
          '</div><div class="kp-be-chart__be">' +
          esc(c.be) +
          "</div></div>"
        );
      })
      .join("");
    var drill = page.drill || [];
    var d0 = drill[0] || {};
    var beOpts = page.beOpts || ["was", "were", "is"];
    var opts = beOpts
      .map(function (o) {
        return '<button type="button" class="kp-choice" data-be="' + esc(o) + '">' + esc(o) + "</button>";
      })
      .join("");
    return (
      header(page) +
      '<article class="kp-card">' +
      hero(page) +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><p class="kp-lead">' +
      esc(page.lead) +
      '</p><div class="kp-be-chart">' +
      chart +
      '</div><div class="kp-be-drill" id="beDrill"><div class="kp-be-drill__subj" id="beSubj">' +
      esc(d0.subject || "") +
      ' + <span style="color:#4a90d9">?</span></div><div class="kp-choices" id="beOpts">' +
      opts +
      '</div><div class="kp-fb" id="beFb"></div></div></div></article>'
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
        fb.className = "kp-fb";
        fb.textContent = "";
      }
      if (opts)
        opts.querySelectorAll(".kp-choice").forEach(function (b) {
          b.disabled = false;
          b.classList.remove("is-ok", "is-no");
        });
    }

    showItem();
    if (opts)
      opts.querySelectorAll(".kp-choice").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.disabled) return;
          var d = drill[cur];
          var pick = btn.getAttribute("data-be");
          var ok = pick === d.ans;
          opts.querySelectorAll(".kp-choice").forEach(function (b) {
            b.disabled = true;
            if (b.getAttribute("data-be") === d.ans) b.classList.add("is-ok");
            else if (b === btn) b.classList.add("is-no");
          });
          if (fb) {
            fb.className = "kp-fb is-show " + (ok ? "kp-fb--ok" : "kp-fb--no");
            fb.innerHTML = ok
              ? sentBlock(d.sentence, d.zh, "kp-sentence-wrap--state") + ttsRow(d.sentence)
              : "再想想：" + esc(d.subject) + " → " + esc(d.ans);
            if (ok) bindCommon(fb);
          }
          if (ok) {
            speak(d.sentence);
            setTimeout(function () {
              cur++;
              if (cur < drill.length) showItem();
              else if (fb) {
                fb.className = "kp-fb is-show kp-fb--ok";
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
          '<div class="kp-bucket kp-bucket--' +
          b.key +
          '" data-bucket="' +
          b.key +
          '"><div class="kp-bucket__label">' +
          esc(b.label) +
          '</div><div class="kp-bucket__items"></div></div>'
        );
      })
      .join("");
    var bank = (page.items || [])
      .map(function (it, i) {
        return (
          '<button type="button" class="kp-classify-card" data-i="' +
          i +
          '">' +
          esc(it.text) +
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
      '</h1><p class="kp-lead">' +
      esc(page.lead) +
      '</p><div class="kp-classify">' +
      buckets +
      '</div><p class="kp-lead" style="margin-top:.45rem;font-weight:800">先点句子，再点篮子：</p><div class="kp-classify-bank" id="clBank">' +
      bank +
      '</div><div class="kp-fb" id="clFb"></div></div></article>'
    );
  }

  function bindClassify(page) {
    var pick = null;
    var fb = document.getElementById("clFb");
    var done = 0;
    var total = (page.items || []).length;

    document.querySelectorAll("#clBank .kp-classify-card").forEach(function (card) {
      card.addEventListener("click", function () {
        if (card.classList.contains("is-done")) return;
        document.querySelectorAll("#clBank .kp-classify-card").forEach(function (c) {
          c.classList.remove("is-pick");
        });
        card.classList.add("is-pick");
        pick = card;
        document.querySelectorAll(".kp-bucket").forEach(function (b) {
          b.classList.add("is-target");
        });
      });
    });

    document.querySelectorAll(".kp-bucket").forEach(function (bucket) {
      bucket.addEventListener("click", function () {
        if (!pick) return;
        var i = Number(pick.getAttribute("data-i"));
        var item = page.items[i];
        var key = bucket.getAttribute("data-bucket");
        var ok = key === item.bucket;
        document.querySelectorAll(".kp-bucket").forEach(function (b) {
          b.classList.remove("is-target");
        });
        if (ok) {
          var placed = document.createElement("div");
          placed.className = "kp-classify-card is-done";
          placed.textContent = item.text;
          bucket.querySelector(".kp-bucket__items").appendChild(placed);
          pick.classList.add("is-done");
          pick.classList.remove("is-pick");
          pick = null;
          done++;
          speak(item.text);
          if (done >= total && fb) {
            fb.className = "kp-fb is-show kp-fb--ok";
            fb.textContent = "全部分对！动作义用实义动词，状态义用 am / is / are。";
          }
        } else if (fb) {
          fb.className = "kp-fb is-show kp-fb--no";
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
      '<article class="kp-card">' +
      hero(page) +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><p class="kp-lead">' +
      esc(page.lead) +
      '</p><div class="kp-steps" id="dynSteps"></div><div class="kp-morph" id="dynMorph"></div><div class="kp-toolbar"><button type="button" class="kp-btn" id="dynNext">下一步 ▶</button></div><div id="dynSent" class="kp-reveal"></div></div></article>'
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
          return '<span class="kp-step-dot ' + cls + '">' + (i + 1) + "</span>";
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
              '<a class="kp-btn" id="dynNext" href="' + nxt + '.html">完成，下一页 →</a>';
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
              page.kind === "neg" ? "kp-sentence-wrap--neg" : page.kind === "q" ? "kp-sentence-wrap--q" : ""
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
        return '<button type="button" class="kp-spell-tab' + (i === 0 ? " is-on" : "") + '" data-i="' + i + '">' + esc(r.tab) + "</button>";
      })
      .join("");
    var panels = page.rules
      .map(function (r, i) {
        var rows = r.examples
          .map(function (e) {
            var focus = r.focusVerb && e.to === r.focusVerb;
            return (
              '<div class="kp-spell-row' +
              (focus ? " is-focus" : "") +
              '"><span>' +
              esc(e.from) +
              '</span><span class="kp-spell-arrow">→</span><span style="color:#c62828;font-weight:' +
              (focus ? "900" : "700") +
              '">' +
              esc(e.to) +
              "</span></div>"
            );
          })
          .join("");
        var sampleHtml = "";
        if (r.sample) {
          sampleHtml =
            '<div class="kp-spell-sample" style="margin-top:.65rem;padding:.55rem .7rem;border-radius:12px;background:#fff8e8;border:1px dashed #e0a84a">' +
            '<div style="font-size:.72rem;font-weight:800;color:#b86e00;margin-bottom:.25rem">例句 · 对应 ' +
            esc(r.focusVerb || r.examples[0].to) +
            "</div>" +
            sentBlock(r.sample, r.sampleZh) +
            ttsRow(r.sample) +
            "</div>";
        }
        return (
          '<div class="kp-spell-panel' +
          (i === 0 ? " is-on" : "") +
          '" data-i="' +
          i +
          '" data-image="' +
          esc(r.sampleImage || page.image || "") +
          '"><p class="kp-lead" style="font-weight:800;color:#6a1b9a">' +
          esc(r.rule) +
          "</p>" +
          rows +
          sampleHtml +
          "</div>"
        );
      })
      .join("");
    return (
      header(page) +
      '<article class="kp-card">' +
      (page.image ? hero(page) : "") +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      "</h1>" +
      (page.lead ? '<p class="kp-lead">' + esc(page.lead) + "</p>" : "") +
      '<div class="kp-spell-tabs" id="spellTabs">' +
      tabs +
      '</div><div id="spellPanels">' +
      panels +
      "</div></div></article>"
    );
  }

  function bindSpelling(page) {
    document.querySelectorAll("#spellTabs .kp-spell-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var i = tab.getAttribute("data-i");
        document.querySelectorAll("#spellTabs .kp-spell-tab").forEach(function (t) {
          t.classList.toggle("is-on", t === tab);
        });
        var onPanel = null;
        document.querySelectorAll("#spellPanels .kp-spell-panel").forEach(function (p) {
          var on = p.getAttribute("data-i") === i;
          p.classList.toggle("is-on", on);
          if (on) onPanel = p;
        });
        if (onPanel) {
          var nextImg = onPanel.getAttribute("data-image");
          var heroImg = document.querySelector(".kp-hero img");
          if (nextImg && heroImg) {
            heroImg.src = img(nextImg);
            heroImg.setAttribute("onerror", imgOnerror(nextImg));
          }
          var rule = (page.rules || [])[Number(i)] || {};
          if (rule.sample) speak(rule.sample);
        }
      });
    });
    bindCommon(document.getElementById("spellPanels"));
  }

  /** Fisher–Yates；尽量不与原序相同（支持字符串 / {id,text} 词牌） */
  function shuffleDistinct(arr) {
    var a = arr.slice();
    if (a.length <= 1) return a;
    var sig = function (list) {
      return list
        .map(function (x) {
          if (x && typeof x === "object") return String(x.id != null ? x.id : x.text);
          return String(x);
        })
        .join("\0");
    };
    var original = sig(arr);
    var attempt;
    for (attempt = 0; attempt < 16; attempt++) {
      var i;
      for (i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
      if (sig(a) !== original) return a;
    }
    var t = a[0];
    a[0] = a[1];
    a[1] = t;
    return a;
  }

  function makeTokenDeck(tokens) {
    return tokens.map(function (t, i) {
      return { id: "tk" + i, text: t };
    });
  }

  function orderSlotsHtml(n) {
    var h = "";
    var i;
    for (i = 0; i < n; i++) {
      h +=
        '<button type="button" class="kp-slot" data-slot="' +
        i +
        '" aria-label="空位 ' +
        (i + 1) +
        '"><span class="kp-slot__num">' +
        (i + 1) +
        '</span><span class="kp-slot__txt"></span></button>';
    }
    return h;
  }

  function orderBankHtml(deck) {
    return deck
      .map(function (tok) {
        return (
          '<button type="button" class="kp-chip kp-chip--bank" data-id="' +
          esc(tok.id) +
          '" data-t="' +
          esc(tok.text) +
          '">' +
          esc(tok.text) +
          "</button>"
        );
      })
      .join("");
  }

  /**
   * 统一「词库点选 → 填空」造句控制器
   * - 点词库：填入下一个空位
   * - 点已填空位：撤回该词；若已选中一词，则与目标空位交换
   * - 错位高亮、不自动清空
   */
  function bindTokenOrder(cfg) {
    var answer = cfg.answer;
    var deck = cfg.deck;
    var slotsEl = document.getElementById(cfg.slotsId);
    var bankEl = document.getElementById(cfg.bankId);
    var progEl = document.getElementById(cfg.progId);
    var fb = document.getElementById(cfg.fbId);
    var checkBtn = document.getElementById(cfg.checkId);
    var undoBtn = document.getElementById(cfg.undoId);
    var resetBtn = document.getElementById(cfg.resetId);
    var placed = answer.map(function () {
      return null;
    });
    var selectedSlot = -1;
    var solved = false;
    var byId = {};
    deck.forEach(function (t) {
      byId[t.id] = t;
    });

    function filledCount() {
      var n = 0;
      var i;
      for (i = 0; i < placed.length; i++) if (placed[i]) n++;
      return n;
    }

    function firstEmpty() {
      var i;
      for (i = 0; i < placed.length; i++) if (!placed[i]) return i;
      return -1;
    }

    function clearFb() {
      if (!fb) return;
      fb.className = "kp-fb";
      fb.innerHTML = "";
    }

    function updateProg() {
      if (!progEl) return;
      var n = filledCount();
      progEl.innerHTML =
        '<span class="kp-order-prog__fill">已填 <b>' +
        n +
        "</b> / " +
        answer.length +
        '</span><span class="kp-order-prog__hint">' +
        (solved
          ? "完成！"
          : n === 0
            ? "点下方单词填入空格"
            : n < answer.length
              ? "继续填 · 点空格可撤回或交换"
              : "点「检查」或再点空格微调") +
        "</span>";
      if (checkBtn) checkBtn.disabled = solved || n < answer.length;
    }

    function paint() {
      if (!slotsEl || !bankEl) return;
      var i;
      for (i = 0; i < placed.length; i++) {
        var slot = slotsEl.querySelector('[data-slot="' + i + '"]');
        if (!slot) continue;
        var tok = placed[i];
        slot.classList.toggle("is-filled", !!tok);
        slot.classList.toggle("is-pick", selectedSlot === i);
        if (solved) {
          slot.classList.add("is-ok");
          slot.classList.remove("is-no");
        } else {
          slot.classList.remove("is-ok", "is-no");
        }
        var txt = slot.querySelector(".kp-slot__txt");
        if (txt) txt.textContent = tok ? tok.text : "";
      }
      bankEl.querySelectorAll(".kp-chip--bank").forEach(function (chip) {
        var id = chip.getAttribute("data-id");
        var used = placed.some(function (p) {
          return p && p.id === id;
        });
        chip.classList.toggle("is-used", used);
        chip.disabled = used || solved;
      });
      updateProg();
    }

    function placeToken(tok) {
      if (solved) return;
      var idx = firstEmpty();
      if (idx < 0) return;
      placed[idx] = tok;
      selectedSlot = -1;
      clearFb();
      paint();
      if (filledCount() === answer.length && cfg.autoCheck) check();
    }

    function returnToken(idx) {
      if (solved || idx < 0 || !placed[idx]) return;
      placed[idx] = null;
      selectedSlot = -1;
      clearFb();
      paint();
    }

    function swapSlots(a, b) {
      if (solved || a < 0 || b < 0 || a === b) return;
      var tmp = placed[a];
      placed[a] = placed[b];
      placed[b] = tmp;
      selectedSlot = -1;
      clearFb();
      paint();
    }

    function undo() {
      if (solved) return;
      var i;
      for (i = placed.length - 1; i >= 0; i--) {
        if (placed[i]) {
          returnToken(i);
          return;
        }
      }
    }

    function reshuffle() {
      if (solved) return;
      placed = answer.map(function () {
        return null;
      });
      selectedSlot = -1;
      clearFb();
      var order = shuffleDistinct(deck.map(function (t) {
        return t.id;
      }));
      var frag = document.createDocumentFragment();
      order.forEach(function (id) {
        var chip = bankEl.querySelector('[data-id="' + id + '"]');
        if (chip) frag.appendChild(chip);
      });
      bankEl.appendChild(frag);
      paint();
    }

    function check() {
      if (solved || filledCount() < answer.length) return;
      var wrong = [];
      var i;
      for (i = 0; i < answer.length; i++) {
        var slot = slotsEl.querySelector('[data-slot="' + i + '"]');
        var ok = placed[i] && placed[i].text === answer[i];
        if (slot) {
          slot.classList.toggle("is-ok", ok);
          slot.classList.toggle("is-no", !ok);
        }
        if (!ok) wrong.push(i + 1);
      }
      if (wrong.length === 0) {
        solved = true;
        selectedSlot = -1;
        paint();
        if (fb) {
          fb.className = "kp-fb is-show kp-fb--ok";
          fb.innerHTML =
            '<div class="kp-order-win">太棒了！句子拼对了 🎉</div>' +
            sentBlock(cfg.sentence, cfg.zh) +
            ttsRow(cfg.sentence) +
            (cfg.revealHtml || "");
          bindCommon(fb);
        }
        speak(cfg.sentence);
        if (typeof cfg.onWin === "function") cfg.onWin();
        return;
      }
      if (fb) {
        fb.className = "kp-fb is-show kp-fb--no";
        fb.innerHTML =
          "第 <b>" +
          wrong.join("、") +
          "</b> 格不对。点标红的词可撤回，或点两格交换位置后再检查。";
      }
    }

    if (bankEl) {
      bankEl.querySelectorAll(".kp-chip--bank").forEach(function (chip) {
        chip.addEventListener("click", function () {
          if (chip.classList.contains("is-used") || solved) return;
          var tok = byId[chip.getAttribute("data-id")];
          if (tok) placeToken(tok);
        });
      });
    }

    if (slotsEl) {
      slotsEl.querySelectorAll(".kp-slot").forEach(function (slot) {
        slot.addEventListener("click", function () {
          if (solved) return;
          var idx = Number(slot.getAttribute("data-slot"));
          if (!placed[idx]) {
            selectedSlot = -1;
            paint();
            return;
          }
          if (selectedSlot < 0) {
            selectedSlot = idx;
            paint();
            return;
          }
          if (selectedSlot === idx) {
            returnToken(idx);
            return;
          }
          swapSlots(selectedSlot, idx);
        });
      });
    }

    if (undoBtn) undoBtn.addEventListener("click", undo);
    if (resetBtn) resetBtn.addEventListener("click", reshuffle);
    if (checkBtn) checkBtn.addEventListener("click", check);

    paint();
    return { reshuffle: reshuffle, check: check };
  }

  function renderPictureBuild(page) {
    var deck = shuffleDistinct(makeTokenDeck(page.tokens));
    var n = page.tokens.length;
    return (
      header(page) +
      '<article class="kp-card">' +
      hero(page) +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><p class="kp-lead">' +
      esc(page.instruction || "看图，把乱序单词点选成正确句子。") +
      '</p><div class="kp-order-prog" id="pbProg"></div>' +
      '<div class="kp-order-label">组成句子</div>' +
      '<div class="kp-slots" id="pbSlots" aria-label="造句空格">' +
      orderSlotsHtml(n) +
      '</div><div class="kp-order-label">单词库 <span class="kp-order-label__sub">已打乱 · 点选填入</span></div>' +
      '<div class="kp-bank" id="pbBank">' +
      orderBankHtml(deck) +
      '</div><div class="kp-toolbar kp-toolbar--order">' +
      '<button type="button" class="kp-btn kp-btn--ghost" id="pbUndo">撤回</button>' +
      '<button type="button" class="kp-btn kp-btn--ghost" id="pbReset">打乱重来</button>' +
      '<button type="button" class="kp-btn" id="pbCheck" disabled>检查</button>' +
      '</div><div class="kp-fb" id="pbFb"></div></div></article>'
    );
  }

  function bindPictureBuild(page) {
    var deck = [];
    document.querySelectorAll("#pbBank .kp-chip--bank").forEach(function (chip) {
      deck.push({ id: chip.getAttribute("data-id"), text: chip.getAttribute("data-t") });
    });
    bindTokenOrder({
      answer: page.tokens,
      deck: deck,
      slotsId: "pbSlots",
      bankId: "pbBank",
      progId: "pbProg",
      fbId: "pbFb",
      checkId: "pbCheck",
      undoId: "pbUndo",
      resetId: "pbReset",
      sentence: page.sentence,
      zh: page.zh,
      autoCheck: false,
    });
  }

  function renderListenOrder(page) {
    var deck = shuffleDistinct(makeTokenDeck(page.tokens));
    var n = page.tokens.length;
    return (
      header(page) +
      '<article class="kp-card">' +
      '<div class="kp-listen-hero" id="loHero">' +
      '<div class="kp-sound-panel kp-sound-panel--order">' +
      '<button type="button" class="kp-btn kp-btn--play kp-btn--play-lg" id="loPlay" aria-label="播放音频">🔊</button>' +
      "<p>先听完整句子，再把下方乱序单词排成正确顺序</p>" +
      '<button type="button" class="kp-btn kp-btn--ghost kp-btn--on-blue" id="loReplay">再听一遍</button>' +
      "</div>" +
      '<div class="kp-listen-reveal" id="loReveal" hidden></div>' +
      "</div>" +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><p class="kp-lead">操作：点单词填空 → 点已填空格可选中 → 再点另一格交换 → 点同一格撤回</p>' +
      '<div class="kp-order-prog" id="loProg"></div>' +
      '<div class="kp-order-label">听写排序</div>' +
      '<div class="kp-slots" id="loSlots" aria-label="排序空格">' +
      orderSlotsHtml(n) +
      '</div><div class="kp-order-label">乱序词库 <span class="kp-order-label__sub">点选填入空格</span></div>' +
      '<div class="kp-bank" id="loBank">' +
      orderBankHtml(deck) +
      '</div><div class="kp-toolbar kp-toolbar--order">' +
      '<button type="button" class="kp-btn kp-btn--ghost" id="loUndo">撤回</button>' +
      '<button type="button" class="kp-btn kp-btn--ghost" id="loReset">打乱重来</button>' +
      '<button type="button" class="kp-btn" id="loCheck" disabled>检查</button>' +
      '</div><div class="kp-fb" id="loFb"></div></div></article>'
    );
  }

  function bindListenOrder(page) {
    var audio = page.audio || page.sentence;
    var deck = [];
    document.querySelectorAll("#loBank .kp-chip--bank").forEach(function (chip) {
      deck.push({ id: chip.getAttribute("data-id"), text: chip.getAttribute("data-t") });
    });

    function playAudio(btn) {
      return speak(audio, btn || document.getElementById("loPlay"));
    }

    var playBtn = document.getElementById("loPlay");
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        playBtn.classList.add("is-on");
        playAudio(playBtn).finally(function () {
          playBtn.classList.remove("is-on");
        });
      });
    }
    var replayBtn = document.getElementById("loReplay");
    if (replayBtn) {
      replayBtn.addEventListener("click", function () {
        playAudio(playBtn);
      });
    }

    var revealImg = resolveImage(page, page.sentence || page.audio);
    var revealHtml = "";
    if (revealImg) {
      revealHtml =
        '<div class="kp-order-reveal-img"><img src="' +
        img(revealImg) +
        '" alt="" decoding="async" onerror="' +
        imgOnerror(revealImg) +
        '"/></div>';
    }

    bindTokenOrder({
      answer: page.tokens,
      deck: deck,
      slotsId: "loSlots",
      bankId: "loBank",
      progId: "loProg",
      fbId: "loFb",
      checkId: "loCheck",
      undoId: "loUndo",
      resetId: "loReset",
      sentence: page.sentence,
      zh: page.zh,
      revealHtml: revealHtml,
      autoCheck: false,
      onWin: function () {
        var reveal = document.getElementById("loReveal");
        if (reveal && revealImg) {
          reveal.hidden = false;
          reveal.innerHTML =
            '<img src="' +
            img(revealImg) +
            '" alt="" decoding="async" onerror="' +
            imgOnerror(revealImg) +
            '"/>';
        }
      },
    });

    setTimeout(function () {
      playAudio(playBtn);
    }, 420);
  }

  function renderQuiz(page) {
    var opts = page.opts
      .map(function (o, i) {
        return '<button type="button" class="kp-choice" data-i="' + i + '">' + esc(o) + "</button>";
      })
      .join("");
    return (
      header(page) +
      '<article class="kp-card">' +
      hero(page, page.sentence) +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><p class="kp-ask">' +
      esc(page.q) +
      '</p><div class="kp-choices" id="qzCh">' +
      opts +
      '</div><div class="kp-fb" id="qzFb"></div></div></article>'
    );
  }

  function bindQuiz(page) {
    var fb = document.getElementById("qzFb");
    document.querySelectorAll("#qzCh .kp-choice").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var i = Number(btn.getAttribute("data-i"));
        var ok = i === page.ans;
        document.querySelectorAll("#qzCh .kp-choice").forEach(function (b, j) {
          b.disabled = true;
          if (j === page.ans) b.classList.add("is-ok");
          else if (j === i) b.classList.add("is-no");
        });
        fb.className = "kp-fb is-show " + (ok ? "kp-fb--ok" : "kp-fb--no");
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
      '<article class="kp-card">' +
      hero(page) +
      '<div class="kp-body-inner"><h1 class="kp-title">' +
      esc(page.title) +
      '</h1><ul style="margin:0;padding:0 0 0 1.1rem;line-height:1.85;font-weight:700">' +
      list +
      '</ul><div class="kp-chant" style="margin-top:.65rem">' +
      esc(page.chant) +
      '</div><div class="kp-toolbar"><button type="button" class="kp-btn" data-speak="' +
      esc(page.chantSpeak || "I play football. She plays football. I am happy.") +
      '">🔊 听口诀</button><a class="kp-btn kp-btn--ghost" href="index.html">目录</a></div></div></article>'
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
    bindCommon(document.getElementById("kpApp"));
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
    var nav = document.getElementById("kpPager");
    if (!nav) return;
    var i = global.KpData.indexOf(pageId);
    var pages = global.KpData.pages;
    var prev = i > 0 ? pages[i - 1].id : null;
    var next = i < pages.length - 1 ? pages[i + 1].id : null;
    nav.innerHTML =
      (prev
        ? '<a class="kp-pager__prev" href="' + prev + '.html">← 上一页</a>'
        : '<a class="kp-pager__prev is-muted" href="index.html">← 目录</a>') +
      '<a class="kp-pager__logo" href="../index.html"><img src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.jpg" alt="Logo" width="96" height="34" decoding="async"/></a>' +
      (next
        ? '<a class="kp-pager__next" href="' + next + '.html">下一页 →</a>'
        : '<a class="kp-pager__next" href="index.html">目录 →</a>');
  }

  function render(pageId) {
    var page = global.KpData.byId(pageId);
    var app = document.getElementById("kpApp");
    if (!page || !app) return;
    document.title = "L03P · " + page.title;
    var fn = RENDER[page.type];
    app.innerHTML = fn ? fn(page) : "<p>未知类型</p>";
    var b = BIND[page.type];
    try {
      if (b) b(page);
      else bindCommon(app);
    } catch (err) {
      console.error("[Kp] bind error:", err);
      bindCommon(app);
    }
    renderPager(pageId);
  }

  global.KpEngine = { render: render };

  if (global.KpPractice) {
    global.KpPractice.register(RENDER, BIND, {
      esc: esc,
      header: header,
      hero: hero,
      sentBlock: sentBlock,
      ttsRow: ttsRow,
      bindCommon: bindCommon,
      speak: speak,
      img: img,
      imgOnerror: imgOnerror,
      resolveImage: resolveImage,
      imageForSentence: imageForSentence,
      shuffleDistinct: shuffleDistinct,
      makeTokenDeck: makeTokenDeck,
      orderSlotsHtml: orderSlotsHtml,
      orderBankHtml: orderBankHtml,
      bindTokenOrder: bindTokenOrder,
    });
  }
})(typeof window !== "undefined" ? window : null);
