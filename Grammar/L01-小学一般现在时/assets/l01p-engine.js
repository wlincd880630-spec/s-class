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

  function speak(text, btn) {
    if (global.L01pTTS) return global.L01pTTS.speak(text, btn);
    return Promise.resolve();
  }

  function wrapSentence(text, cls) {
    var inner = global.L01pWord ? global.L01pWord.wrap(text) : esc(text);
    return (
      '<div class="l01p-sentence' +
      (cls ? " " + cls : "") +
      '">' +
      inner +
      "</div>"
    );
  }

  function header(page, idx, total) {
    var pct = Math.round(((idx + 1) / total) * 100);
    return (
      '<header class="l01p-hd">' +
      '<span class="l01p-hd__section">' +
      esc(page.section) +
      "</span>" +
      '<span class="l01p-hd__step">' +
      (idx + 1) +
      " / " +
      total +
      "</span></header>" +
      '<div class="l01p-hd__bar"><i style="width:' +
      pct +
      '%"></i></div>'
    );
  }

  function mediaBlock(page) {
    if (!page.image) return "";
    var tall = page.imageTall ? " l01p-card__media--tall" : "";
    var badgeCls = page.badge ? " l01p-card__badge--" + page.badge : "";
    return (
      '<div class="l01p-card__media' +
      tall +
      '">' +
      (page.badgeText
        ? '<span class="l01p-card__badge' + badgeCls + '">' + esc(page.badgeText) + "</span>"
        : "") +
      '<img src="' +
      img(page.image) +
      '" alt="" decoding="async" onerror="this.src=\'' +
      esc(global.L01pImg ? global.L01pImg.local(page.image) : page.image) +
      "'\" />" +
      "</div>"
    );
  }

  function renderSoundFirst(page) {
    var html =
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card"><div class="l01p-card__body">' +
      "<h1 class=\"l01p-title\">" +
      esc(page.title) +
      "</h1>" +
      '<div class="l01p-sound-stage" id="l01pSoundStage">' +
      '<button type="button" class="l01p-sound-btn" id="l01pSoundBtn" aria-label="播放">🔊</button>' +
      '<p class="l01p-sound-hint">' +
      esc(page.soundHint || "先听，再思考") +
      "</p></div>" +
      '<div class="l01p-reveal" id="l01pReveal">' +
      (page.question ? '<p class="l01p-ask">' + esc(page.question) + "</p>" : "") +
      (page.revealTitle ? "<h2 class=\"l01p-title\">" + esc(page.revealTitle) + "</h2>" : "") +
      (page.revealText ? '<p class="l01p-lead">' + esc(page.revealText) + "</p>" : "") +
      "</div>" +
      '<div class="l01p-btn-row"><button type="button" class="l01p-btn l01p-btn--ghost" id="l01pShowBtn" disabled>显示答案</button></div>' +
      "</div></article>";
    return html;
  }

  function bindSoundFirst(page) {
    var btn = document.getElementById("l01pSoundBtn");
    var show = document.getElementById("l01pShowBtn");
    var reveal = document.getElementById("l01pReveal");
    var played = false;
    if (btn) {
      btn.addEventListener("click", function () {
        btn.classList.add("is-playing");
        speak(page.audio, btn).finally(function () {
          btn.classList.remove("is-playing");
          played = true;
          if (show) show.disabled = false;
        });
      });
    }
    if (show && reveal) {
      show.addEventListener("click", function () {
        if (!played) return;
        reveal.classList.add("is-show");
        var extra = "";
        if (page.image) {
          extra =
            '<div class="l01p-card__media" style="margin-top:0.65rem;border-radius:12px;overflow:hidden"><img src="' +
            img(page.image) +
            '" alt="" style="max-height:180px;width:100%;object-fit:cover" onerror="this.src=\'' +
            esc(global.L01pImg.local(page.image)) +
            "'\" /></div>";
        }
        if (page.sentence) {
          extra +=
            wrapSentence(page.sentence, page.verbType === "state" ? "l01p-sentence--state" : page.verbType === "action" ? "l01p-sentence--action" : "") +
            (page.zh ? '<span class="l01p-zh">' + esc(page.zh) + "</span>" : "");
        }
        reveal.insertAdjacentHTML("beforeend", extra);
        if (global.L01pWord) global.L01pWord.bind(reveal);
        show.disabled = true;
        show.textContent = "已显示 ✓";
        if (page.sentence) speak(page.sentence);
      });
    }
  }

  function renderSocratic(page) {
    var choices = (page.choices || [])
      .map(function (c, i) {
        return (
          '<button type="button" class="l01p-choice" data-i="' +
          i +
          '">' +
          esc(c.text) +
          "</button>"
        );
      })
      .join("");
  return (
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card">' +
      mediaBlock(page) +
      '<div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-ask">' +
      esc(page.question) +
      '</p><div class="l01p-choices" id="l01pChoices">' +
      choices +
      '</div><div class="l01p-fb" id="l01pFb"></div><div id="l01pFollow" class="l01p-reveal"></div></div></article>'
    );
  }

  function bindSocratic(page) {
    var fb = document.getElementById("l01pFb");
    var follow = document.getElementById("l01pFollow");
    document.querySelectorAll("#l01pChoices .l01p-choice").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var i = Number(btn.getAttribute("data-i"));
        var c = page.choices[i];
        document.querySelectorAll("#l01pChoices .l01p-choice").forEach(function (b, j) {
          b.disabled = true;
          if (page.choices[j].correct) b.classList.add("is-ok");
          else if (j === i) b.classList.add("is-no");
        });
        fb.className = "l01p-fb is-show " + (c.correct ? "l01p-fb--ok" : "l01p-fb--no");
        fb.textContent = c.fb;
        if (page.sentence && follow) {
          follow.classList.add("is-show");
          follow.innerHTML =
            wrapSentence(page.sentence, page.verbType ? "l01p-sentence--" + page.verbType : "") +
            (page.zh ? '<span class="l01p-zh">' + esc(page.zh) + "</span>" : "");
          if (global.L01pWord) global.L01pWord.bind(follow);
          speak(page.sentence);
        }
      });
    });
  }

  function renderImageFirst(page) {
    return (
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card">' +
      mediaBlock(page) +
      '<div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-lead">' +
      esc(page.question) +
      "</p>" +
      (page.tip ? '<p class="l01p-lead" style="font-size:0.82rem">' + esc(page.tip) + "</p>" : "") +
      '<div class="l01p-reveal" id="l01pImgReveal">' +
      '<button type="button" class="l01p-btn" id="l01pImgBtn">显示句子 🔊</button></div></div></article>'
    );
  }

  function bindImageFirst(page) {
    var box = document.getElementById("l01pImgReveal");
    var btn = document.getElementById("l01pImgBtn");
    if (!btn || !box) return;
    btn.addEventListener("click", function () {
      box.innerHTML =
        wrapSentence(page.sentence, page.verbType ? "l01p-sentence--" + page.verbType : "") +
        (page.zh ? '<span class="l01p-zh">' + esc(page.zh) + "</span>" : "");
      box.classList.add("is-show");
      if (global.L01pWord) global.L01pWord.bind(box);
      speak(page.sentence);
    });
  }

  function renderCompare(page) {
    return (
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card">' +
      (page.image
        ? '<div class="l01p-card__media"><img src="' +
          img(page.image) +
          '" alt="" style="max-height:160px" onerror="this.src=\'' +
          esc(global.L01pImg.local(page.image)) +
          "'\" /></div>"
        : "") +
      '<div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      "</h1>" +
      (page.tip ? '<p class="l01p-lead">' + esc(page.tip) + "</p>" : "") +
      '<div class="l01p-compare">' +
      '<div class="l01p-compare__col l01p-compare__col--action" data-side="left" tabindex="0">' +
      '<div class="l01p-compare__label">' +
      esc(page.left.label) +
      "</div>" +
      (page.image
        ? ""
        : '<img src="' + img("l01p-action-football.png") + '" alt="" onerror="this.style.display=\'none\'" />') +
      '<div class="l01p-compare__txt"><strong>' +
      esc(page.left.verbs) +
      "</strong><br>" +
      esc(page.left.zh) +
      "</div></div>" +
      '<div class="l01p-compare__col l01p-compare__col--state" data-side="right" tabindex="0">' +
      '<div class="l01p-compare__label">' +
      esc(page.right.label) +
      "</div>" +
      (page.image
        ? ""
        : '<img src="' + img("l01p-state-reading.png") + '" alt="" onerror="this.style.display=\'none\'" />') +
      '<div class="l01p-compare__txt"><strong>' +
      esc(page.right.verbs) +
      "</strong><br>" +
      esc(page.right.zh) +
      "</div></div></div>" +
      '<div id="l01pCompareSent"></div></div></article>'
    );
  }

  function bindCompare(page) {
    var out = document.getElementById("l01pCompareSent");
    document.querySelectorAll(".l01p-compare__col").forEach(function (col) {
      col.addEventListener("click", function () {
        document.querySelectorAll(".l01p-compare__col").forEach(function (c) {
          c.classList.remove("is-active");
        });
        col.classList.add("is-active");
        var side = col.getAttribute("data-side");
        var data = side === "left" ? page.left : page.right;
        if (out) {
          out.innerHTML =
            wrapSentence(data.sentence, side === "left" ? "l01p-sentence--action" : "l01p-sentence--state") +
            '<span class="l01p-zh">' +
            esc(data.zh) +
            "</span>";
          if (global.L01pWord) global.L01pWord.bind(out);
          speak(data.sentence);
        }
      });
    });
  }

  function renderDemo(page) {
    return (
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card"><div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><div class="l01p-demo" id="l01pDemo">' +
      '<span class="l01p-demo__subj" id="l01pDemoSubj">I</span>' +
      '<span class="l01p-demo__arrow">↓</span>' +
      '<span class="l01p-demo__verb" id="l01pDemoVerb">play</span>' +
      '<span class="l01p-demo__tail" id="l01pDemoTail">s</span>' +
      "</div>" +
      (page.rule ? '<p class="l01p-lead" style="text-align:center">' + page.rule + "</p>" : "") +
      '<div class="l01p-btn-row"><button type="button" class="l01p-btn" id="l01pDemoBtn">切换主语 ▶</button></div>' +
      '<div id="l01pDemoSent" class="l01p-reveal"></div></div></article>'
    );
  }

  function bindDemo(page) {
    var subs = page.subjects || ["I", "He"];
    var idx = 0;
    var subjEl = document.getElementById("l01pDemoSubj");
    var verbEl = document.getElementById("l01pDemoVerb");
    var tailEl = document.getElementById("l01pDemoTail");
    var sentEl = document.getElementById("l01pDemoSent");
    var btn = document.getElementById("l01pDemoBtn");

    function update() {
      var s = subs[idx % subs.length];
      var isThird = /^(he|she|it|tom|my|the)/i.test(s) || ["He", "She", "It", "Tom"].indexOf(s) >= 0;
      if (subjEl) subjEl.textContent = s;
      if (verbEl) {
        verbEl.textContent = isThird ? "play" : "play";
        verbEl.classList.add("pop");
        setTimeout(function () {
          verbEl.classList.remove("pop");
        }, 450);
      }
      if (tailEl) tailEl.classList.toggle("is-on", isThird);
      if (sentEl) {
        var sent = isThird ? page.sentence : "I play football.";
        sentEl.classList.add("is-show");
        sentEl.innerHTML = wrapSentence(sent) + '<span class="l01p-zh">' + esc(page.zh) + "</span>";
        if (global.L01pWord) global.L01pWord.bind(sentEl);
      }
    }

    if (btn) {
      btn.addEventListener("click", function () {
        idx++;
        update();
        speak(idx % 2 === 0 ? page.sentence : "I play football.");
      });
    }
    update();
  }

  function renderClassify(page) {
    var bank = page.items
      .map(function (it, i) {
        return (
          '<button type="button" class="l01p-token" data-i="' +
          i +
          '" data-type="' +
          it.type +
          '">' +
          esc(it.word) +
          "</button>"
        );
      })
      .join("");
    return (
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card"><div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-lead">' +
      esc(page.instruction) +
      '</p><div class="l01p-sort-bank" id="l01pBank">' +
      bank +
      '</div><div class="l01p-sort-zones"><div class="l01p-sort-zone l01p-sort-zone--action" data-zone="action">动作义 Action</div><div class="l01p-sort-zone l01p-sort-zone--state" data-zone="state">状态义 State</div></div><div class="l01p-fb" id="l01pFb"></div></div></article>'
    );
  }

  function bindClassify(page) {
    var placed = 0;
    var fb = document.getElementById("l01pFb");
    document.querySelectorAll("#l01pBank .l01p-token").forEach(function (tok) {
      tok.addEventListener("click", function () {
        if (tok.classList.contains("is-used")) return;
        var type = tok.getAttribute("data-type");
        var zone = document.querySelector('.l01p-sort-zone[data-zone="' + type + '"]');
        if (!zone) return;
        zone.appendChild(tok);
        tok.classList.add("is-used");
        placed++;
        if (placed >= page.items.length && fb) {
          fb.className = "l01p-fb is-show l01p-fb--ok";
          fb.textContent = "全部分类正确！动作义看得见，状态义是感受。";
        }
      });
    });
  }

  function renderPictureBuild(page) {
    var tokens = page.tokens
      .map(function (t, i) {
        return '<button type="button" class="l01p-token" data-t="' + esc(t) + '" data-ord="' + i + '">' + esc(t) + "</button>";
      })
      .join("");
    return (
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card">' +
      mediaBlock(page) +
      '<div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><p class="l01p-lead">' +
      esc(page.instruction) +
      '</p><div class="l01p-build" id="l01pBuild"></div><div id="l01pTokenBank" style="display:flex;flex-wrap:wrap;gap:0.4rem">' +
      tokens +
      '</div><div class="l01p-fb" id="l01pFb"></div></div></article>'
    );
  }

  function bindPictureBuild(page) {
    var build = document.getElementById("l01pBuild");
    var fb = document.getElementById("l01pFb");
    var picked = [];
    document.querySelectorAll("#l01pTokenBank .l01p-token").forEach(function (tok) {
      tok.addEventListener("click", function () {
        if (tok.classList.contains("is-used")) return;
        tok.classList.add("is-used", "in-slot");
        picked.push(tok.getAttribute("data-t"));
        var span = document.createElement("span");
        span.className = "l01p-token in-slot";
        span.textContent = tok.getAttribute("data-t");
        build.appendChild(span);
        if (picked.length >= page.tokens.length) {
          var ok = picked.join(" ") === page.sentence.replace(/\s+/g, " ").trim();
          if (fb) {
            fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
            fb.innerHTML = ok
              ? "正确！" + wrapSentence(page.sentence) + '<span class="l01p-zh">' + esc(page.zh) + "</span>"
              : "再试一次！正确顺序：" + esc(page.sentence);
            if (ok && global.L01pWord) global.L01pWord.bind(fb);
            if (ok) speak(page.sentence);
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
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card"><div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><div class="l01p-sound-stage" style="padding:1rem"><button type="button" class="l01p-sound-btn" id="l01pOrderPlay" style="width:64px;height:64px;font-size:1.5rem">🔊</button><p class="l01p-sound-hint">先听，再拖动排序</p></div>' +
      '<div class="l01p-order-list" id="l01pOrderList">' +
      items +
      '</div><div class="l01p-btn-row"><button type="button" class="l01p-btn" id="l01pOrderCheck">检查答案</button></div><div class="l01p-fb" id="l01pFb"></div></div></article>'
    );
  }

  function bindListenOrder(page) {
    var list = document.getElementById("l01pOrderList");
    var play = document.getElementById("l01pOrderPlay");
    var check = document.getElementById("l01pOrderCheck");
    var fb = document.getElementById("l01pFb");
    if (play) {
      play.addEventListener("click", function () {
        speak(page.audio, play);
      });
    }
    if (list) {
      var dragEl = null;
      list.querySelectorAll(".l01p-order-item").forEach(function (item) {
        item.addEventListener("dragstart", function () {
          dragEl = item;
          item.classList.add("dragging");
        });
        item.addEventListener("dragend", function () {
          item.classList.remove("dragging");
          dragEl = null;
        });
        item.addEventListener("dragover", function (e) {
          e.preventDefault();
        });
        item.addEventListener("drop", function (e) {
          e.preventDefault();
          if (dragEl && dragEl !== item) {
            var nodes = Array.from(list.children);
            var from = nodes.indexOf(dragEl);
            var to = nodes.indexOf(item);
            if (from < to) list.insertBefore(dragEl, item.nextSibling);
            else list.insertBefore(dragEl, item);
          }
        });
        item.addEventListener("click", function () {
          if (!item.nextSibling) return;
          list.insertBefore(item.nextSibling, item);
        });
      });
    }
    if (check && list) {
      check.addEventListener("click", function () {
        var order = Array.from(list.querySelectorAll(".l01p-order-item")).map(function (el) {
          return el.getAttribute("data-t");
        });
        var ok = order.join(" ") === page.tokens.join(" ");
        if (fb) {
          fb.className = "l01p-fb is-show " + (ok ? "l01p-fb--ok" : "l01p-fb--no");
          fb.innerHTML = ok
            ? "排序正确！" + wrapSentence(page.sentence) + '<span class="l01p-zh">' + esc(page.zh) + "</span>"
            : "还不对，再听一遍试试。";
          if (ok && global.L01pWord) global.L01pWord.bind(fb);
          if (ok) speak(page.sentence);
        }
      });
    }
  }

  function renderSummary(page) {
    var items = (page.checklist || [])
      .map(function (t) {
        return "<li>" + esc(t) + "</li>";
      })
      .join("");
    return (
      header(page, global.L01pData.indexOf(page.id), global.L01pData.total) +
      '<article class="l01p-card">' +
      mediaBlock(page) +
      '<div class="l01p-card__body"><h1 class="l01p-title">' +
      esc(page.title) +
      '</h1><ul class="l01p-checklist">' +
      items +
      '</ul><div class="l01p-chant" style="margin-top:0.65rem;white-space:pre-line">' +
      esc(page.chant) +
      '</div><div class="l01p-btn-row"><button type="button" class="l01p-btn" id="l01pChantPlay">🔊 听口诀</button><a class="l01p-btn l01p-btn--ghost" href="index.html">返回目录</a></div></div></article>'
    );
  }

  function bindSummary(page) {
    var btn = document.getElementById("l01pChantPlay");
    if (btn && page.chant) {
      btn.addEventListener("click", function () {
        speak("I play football. She plays football. We do not run. Does he read books?");
      });
    }
  }

  var BINDERS = {
    "sound-first": bindSoundFirst,
    socratic: bindSocratic,
    "image-first": bindImageFirst,
    compare: bindCompare,
    demo: bindDemo,
    classify: bindClassify,
    "picture-build": bindPictureBuild,
    "listen-order": bindListenOrder,
    summary: bindSummary,
  };

  var RENDERERS = {
    "sound-first": renderSoundFirst,
    socratic: renderSocratic,
    "image-first": renderImageFirst,
    compare: renderCompare,
    demo: renderDemo,
    classify: renderClassify,
    "picture-build": renderPictureBuild,
    "listen-order": renderListenOrder,
    summary: renderSummary,
  };

  function render(pageId) {
    var page = global.L01pData.byId(pageId);
    var app = document.getElementById("l01pApp");
    if (!page || !app) return;
    document.title = "L01P · " + page.title;
    var fn = RENDERERS[page.type];
    app.innerHTML = fn ? fn(page) : "<p>未知页面类型</p>";
    var binder = BINDERS[page.type];
    if (binder) binder(page);
    renderPager(pageId);
  }

  function renderPager(pageId) {
    var nav = document.getElementById("l01pPager");
    if (!nav || !global.L01pData) return;
    var idx = global.L01pData.indexOf(pageId);
    var pages = global.L01pData.pages;
    var prev = idx > 0 ? pages[idx - 1].id : null;
    var next = idx < pages.length - 1 ? pages[idx + 1].id : null;
    nav.innerHTML =
      (prev
        ? '<a class="l01p-pager__prev" href="' + prev + '.html">← 上一页</a>'
        : '<a class="l01p-pager__prev is-muted" href="index.html">← 目录</a>') +
      '<a class="l01p-pager__logo" href="../index.html" aria-label="主页"><img src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png" alt="Steven\'s Class" width="96" height="34" decoding="async" /></a>' +
      (next
        ? '<a class="l01p-pager__next" href="' + next + '.html">下一页 →</a>'
        : '<a class="l01p-pager__next" href="index.html">目录 →</a>');
  }

  global.L01pEngine = { render: render };
})(typeof window !== "undefined" ? window : null);
