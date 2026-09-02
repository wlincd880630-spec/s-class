/**
 * Flutter, butterfly! · 课件生命循环游戏
 * 1) 四阶段排序 + 英文对应
 * 2) 各 life stage 与课文句子搭配
 * 图片：Old World Swallowtail（Papilio machaon）真实照片 + 少量科普补图
 */
(function (global) {
  "use strict";

  var IMG = "images/lifecycle/";

  var CYCLE = [
    {
      id: "egg",
      title: "Egg",
      zhTitle: "卵",
      en: "The egg is yellow. Then it turns brown.",
      zh: "卵先是黄色，然后变成棕色。",
      photos: ["egg-yellow-b.jpg", "egg-yellow.jpg", "egg-brown.jpg", "egg-brown-b.jpg"]
    },
    {
      id: "caterpillar",
      title: "Caterpillar",
      zhTitle: "毛毛虫",
      en: "The caterpillar crawls and eats leaves.",
      zh: "毛毛虫爬行，吃叶子。",
      photos: ["cat-green.jpg", "cat-green-eat.jpg", "cat-green-side.jpg", "cat-green-dill.jpg"]
    },
    {
      id: "pupa",
      title: "Pupa",
      zhTitle: "蛹",
      en: "Now it's a pupa inside a hard covering.",
      zh: "现在它是蛹，在坚硬的外壳里。",
      photos: ["pupa-green.jpg", "pupa-brown.jpg", "pupa-chrysalis.jpg", "pupa-pupation.jpg"]
    },
    {
      id: "butterfly",
      title: "Butterfly",
      zhTitle: "蝴蝶",
      en: "A butterfly comes out! Flutter, butterfly!",
      zh: "蝴蝶出来了！飞起来吧，蝴蝶！",
      photos: ["adult-underside.jpg", "adult-open.jpg", "adult-land.jpg", "adult-spread.jpg", "emerge-ready.jpg"]
    }
  ];

  var STAGES = [
    {
      id: "lands",
      en: "A butterfly lands on a plant.",
      zh: "一只蝴蝶落在植物上。",
      photos: ["adult-land.jpg", "egg-laying.jpg", "adult-nectar-b.jpg"]
    },
    {
      id: "yellow-egg",
      en: "It lays an egg. The new egg is yellow.",
      zh: "它产下黄色的卵。",
      photos: ["egg-yellow-b.jpg", "egg-laying.jpg", "egg-yellow.jpg"]
    },
    {
      id: "brown-egg",
      en: "The egg turns brown.",
      zh: "卵变成棕色。",
      photos: ["egg-brown.jpg", "egg-brown-b.jpg"]
    },
    {
      id: "hatch",
      en: "Then the egg hatches! The caterpillar comes out.",
      zh: "卵孵化了，毛毛虫出来了。",
      photos: ["hatch.jpg"]
    },
    {
      id: "young",
      en: "The young caterpillar is black.",
      zh: "幼小的毛毛虫是黑色的。",
      photos: ["young-black.jpg"]
    },
    {
      id: "green",
      en: "The caterpillar grows bigger. It turns green.",
      zh: "毛毛虫长大，变成绿色。",
      photos: ["cat-green-eat.jpg", "cat-green-side.jpg", "cat-green.jpg"]
    },
    {
      id: "pupa",
      en: "Now it's a pupa. It's inside a hard covering.",
      zh: "现在它是蛹，在坚硬的外壳里。",
      photos: ["pupa-green.jpg", "pupa-chrysalis.jpg", "pupa-brown.jpg"]
    },
    {
      id: "out",
      en: "A butterfly comes out!",
      zh: "一只蝴蝶出来了！",
      photos: ["emerge-out.jpg", "emerge-ready.jpg", "emerge-chrysalis.jpg"]
    }
  ];

  var state = { mode: "hub", selPhoto: null, selCap: null, selStage: null, round: 0 };

  function src(file) {
    return IMG + file;
  }

  function speak(text) {
    if (window.LocalAudio && LocalAudio.speak) return LocalAudio.speak(text, { slow: false });
    if (window.NgAzureTTS && NgAzureTTS.speak) return NgAzureTTS.speak(text, {});
    return Promise.resolve(false);
  }

  function celebrate() {
    var el = document.getElementById("okCelebrate");
    if (!el) return;
    el.setAttribute("aria-hidden", "false");
    el.classList.add("is-on");
    setTimeout(function () {
      el.classList.remove("is-on");
      el.setAttribute("aria-hidden", "true");
    }, 1600);
  }

  function shuffle(arr) {
    var a = arr.slice();
    var i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = (Math.random() * (i + 1)) | 0;
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function imgTag(file, alt) {
    return (
      '<img src="' + src(file) + '" alt="' + (alt || "") + '" loading="lazy" ' +
      'onerror="this.style.background=\'#33691e\';this.removeAttribute(\'src\')">'
    );
  }

  function btn(label, cls, id) {
    return '<button type="button" class="btn' + (cls ? " " + cls : "") + '" id="' + id + '">' + label + "</button>";
  }

  function hubFig(file, cap) {
    return "<figure>" + imgTag(file, cap) + "<figcaption>" + cap + "</figcaption></figure>";
  }

  function bindActivate(el, fn) {
    if (!el) return;
    el.onclick = fn;
    el.onkeydown = function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        fn();
      }
    };
  }

  function renderHub(root) {
    state.mode = "hub";
    root.innerHTML =
      '<div class="lc-head"><h2>🦋 生命游戏</h2>' +
      "<p>Old World Swallowtail 金凤蝶真实照片 · 根据课文排出生命循环，再把阶段和句子配起来。</p></div>" +
      '<div class="lc-hub">' +
      '<div class="lc-card" id="lcOpen1" role="button" tabindex="0">' +
      '<div class="lc-card-photos">' +
      hubFig("egg-yellow-b.jpg", "卵 Egg") +
      hubFig("cat-green.jpg", "毛虫 Caterpillar") +
      hubFig("pupa-green.jpg", "蛹 Pupa") +
      hubFig("adult-land.jpg", "蝴蝶 Butterfly") +
      "</div><div class=\"lc-card-body\"><span class=\"lc-badge\">Game 1</span>" +
      "<b>生命循环排序</b><span>把 egg → caterpillar → pupa → butterfly 的大图放进正确的格子，再配上英文。</span></div></div>" +
      '<div class="lc-card" id="lcOpen2" role="button" tabindex="0">' +
      '<div class="lc-card-photos">' +
      hubFig("egg-laying.jpg", "产卵 Lands / lays") +
      hubFig("egg-brown.jpg", "棕卵 Brown egg") +
      hubFig("cat-green-eat.jpg", "吃叶子 Eats") +
      hubFig("emerge-out.jpg", "破蛹 Comes out") +
      "</div><div class=\"lc-card-body\"><span class=\"lc-badge\">Game 2</span>" +
      "<b>阶段与文字搭配</b><span>看真实大图，点选对应的课文句子。共 8 个 life stage，分两轮。</span></div></div>" +
      "</div>";
    bindActivate(document.getElementById("lcOpen1"), function () { startCycle(root); });
    bindActivate(document.getElementById("lcOpen2"), function () { startMatch(root, 0); });
  }

  function startCycle(root) {
    state.mode = "cycle";
    state.selPhoto = null;
    state.selCap = null;
    state.placed = {};
    state.caps = {};
    var photos = [];
    CYCLE.forEach(function (st) {
      photos.push({ id: st.id + "-0", stage: st.id, file: st.photos[0] });
    });
    state.photoPool = shuffle(photos);
    state.capPool = shuffle(CYCLE.map(function (st) {
      return { id: st.id, en: st.en, zh: st.zh };
    }));
    drawCycle(root);
  }

  function drawCycle(root) {
    var html = '<div class="lc-head"><h2>生命循环排序</h2><p>先点照片，再点格子；英文句子也同样点选放入。四步：Egg → Caterpillar → Pupa → Butterfly。</p></div>';
    html += '<div class="lc-toolbar">' + btn("← 游戏首页", "", "lcBack") + btn("听顺序", "primary", "lcHear") + btn("检查", "primary", "lcCheck") + btn("再来", "", "lcReset") + '<span class="sub" id="lcHint">点一张图，再点上面的格子</span></div>';
    html += '<div class="lc-cycle-board">';
    html += '<div class="lc-cols">';
    CYCLE.forEach(function (st, i) {
      html += '<div class="lc-col" data-col="' + st.id + '">';
      html += '<div class="lc-col-title">' + (i + 1) + ". " + st.title + "<small>" + st.zhTitle + "</small></div>";
      html += '<div class="lc-drop" data-drop="' + st.id + '"></div>';
      html += '<div class="lc-cap-slot" data-cap="' + st.id + '"></div>';
      html += "</div>";
    });
    html += "</div>";
    html += '<div class="lc-pool" id="lcPool"></div>';
    html += '<div class="lc-caps" id="lcCaps"></div>';
    html += "</div>";
    html += '<p class="lc-msg" id="lcMsg"></p>';
    root.innerHTML = html;

    paintCycleBits(root);
    document.getElementById("lcBack").onclick = function () { renderHub(root); };
    document.getElementById("lcReset").onclick = function () { startCycle(root); };
    document.getElementById("lcHear").onclick = function () {
      var i = 0;
      function next() {
        if (i >= CYCLE.length) return;
        speak(CYCLE[i].title + ". " + CYCLE[i].en).then(function () {
          i += 1;
          setTimeout(next, 280);
        });
      }
      next();
    };
    document.getElementById("lcCheck").onclick = function () { checkCycle(root); };

    root.querySelectorAll(".lc-col").forEach(function (col) {
      col.addEventListener("click", function (ev) {
        if (ev.target.closest(".lc-photo") && col.contains(ev.target.closest(".lc-photo")) && !state.selPhoto && !state.selCap) {
          return;
        }
        placeInto(root, col.getAttribute("data-col"));
      });
    });
  }

  function paintCycleBits(root) {
    var pool = document.getElementById("lcPool");
    var caps = document.getElementById("lcCaps");
    pool.innerHTML = "";
    caps.innerHTML = "";
    root.querySelectorAll(".lc-drop").forEach(function (d) {
      d.innerHTML = '<span class="lc-drop-hint">点照片，再点这里</span>';
    });
    root.querySelectorAll(".lc-cap-slot").forEach(function (d) { d.innerHTML = ""; });

    state.photoPool.forEach(function (p) {
      if (state.placed[p.id]) return;
      pool.appendChild(makePhotoBtn(root, p, false));
    });
    Object.keys(state.placed).forEach(function (pid) {
      var p = findPhoto(pid);
      var col = state.placed[pid];
      var drop = root.querySelector('.lc-drop[data-drop="' + col + '"]');
      if (p && drop) {
        drop.innerHTML = "";
        drop.appendChild(makePhotoBtn(root, p, true));
      }
    });
    state.capPool.forEach(function (c) {
      if (state.caps[c.id]) return;
      caps.appendChild(makeCapBtn(root, c, false));
    });
    Object.keys(state.caps).forEach(function (cid) {
      var c = findCap(cid);
      var slot = root.querySelector('.lc-cap-slot[data-cap="' + state.caps[cid] + '"]');
      if (c && slot) slot.appendChild(makeCapBtn(root, c, true));
    });
    highlightSel(root);
  }

  function findPhoto(id) {
    var i;
    for (i = 0; i < state.photoPool.length; i++) if (state.photoPool[i].id === id) return state.photoPool[i];
    return null;
  }
  function findCap(id) {
    var i;
    for (i = 0; i < state.capPool.length; i++) if (state.capPool[i].id === id) return state.capPool[i];
    return null;
  }

  function makePhotoBtn(root, p, inCol) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "lc-photo" + (state.selPhoto === p.id ? " is-sel" : "");
    b.setAttribute("data-pid", p.id);
    b.innerHTML = imgTag(p.file, p.stage);
    b.onclick = function (ev) {
      ev.stopPropagation();
      if (inCol && !state.selPhoto && !state.selCap) {
        delete state.placed[p.id];
        paintCycleBits(root);
        return;
      }
      state.selPhoto = state.selPhoto === p.id ? null : p.id;
      state.selCap = null;
      highlightSel(root);
    };
    return b;
  }

  function makeCapBtn(root, c, inCol) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "lc-chip" + (state.selCap === c.id ? " is-sel" : "");
    b.setAttribute("data-cid", c.id);
    b.textContent = c.en;
    b.onclick = function (ev) {
      ev.stopPropagation();
      if (inCol && !state.selCap && !state.selPhoto) {
        delete state.caps[c.id];
        paintCycleBits(root);
        return;
      }
      state.selCap = state.selCap === c.id ? null : c.id;
      state.selPhoto = null;
      speak(c.en);
      highlightSel(root);
    };
    return b;
  }

  function highlightSel(root) {
    root.querySelectorAll(".lc-photo").forEach(function (el) {
      el.classList.toggle("is-sel", el.getAttribute("data-pid") === state.selPhoto);
    });
    root.querySelectorAll(".lc-chip").forEach(function (el) {
      el.classList.toggle("is-sel", el.getAttribute("data-cid") === state.selCap);
    });
    root.querySelectorAll(".lc-col").forEach(function (el) {
      el.classList.toggle("is-target", !!(state.selPhoto || state.selCap));
    });
  }

  function placeInto(root, colId) {
    if (state.selPhoto) {
      state.placed[state.selPhoto] = colId;
      state.selPhoto = null;
    }
    if (state.selCap) {
      Object.keys(state.caps).forEach(function (k) {
        if (state.caps[k] === colId) delete state.caps[k];
      });
      state.caps[state.selCap] = colId;
      state.selCap = null;
    }
    paintCycleBits(root);
  }

  function checkCycle(root) {
    var msg = document.getElementById("lcMsg");
    var photoOk = 0;
    var photoN = state.photoPool.length;
    state.photoPool.forEach(function (p) {
      if (state.placed[p.id] === p.stage) photoOk += 1;
    });
    var capOk = 0;
    CYCLE.forEach(function (st) {
      if (state.caps[st.id] === st.id) capOk += 1;
    });
    var allPhotos = photoOk === photoN && photoN > 0;
    var allCaps = capOk === CYCLE.length;
    root.querySelectorAll(".lc-col").forEach(function (col) {
      var id = col.getAttribute("data-col");
      var photosIn = state.photoPool.filter(function (p) { return state.placed[p.id] === id; });
      var photosGood = photosIn.length && photosIn.every(function (p) { return p.stage === id; });
      col.classList.toggle("is-ok", photosGood && state.caps[id] === id);
    });
    if (allPhotos && allCaps) {
      msg.className = "lc-msg ok";
      msg.textContent = "太棒了！Egg → Caterpillar → Pupa → Butterfly，照片和英文都对了。";
      celebrate();
      speak("Flutter, butterfly!");
    } else {
      msg.className = "lc-msg bad";
      msg.textContent = "照片对了 " + photoOk + " / " + photoN + "，句子对了 " + capOk + " / 4。再看看格子里的图片和文字。";
    }
  }

  function startMatch(root, round) {
    state.mode = "match";
    state.round = round;
    state.selStage = null;
    state.selText = null;
    state.matched = {};
    var slice = STAGES.slice(round * 4, round * 4 + 4);
    state.roundItems = slice;
    state.photoOrder = shuffle(slice.map(function (s) { return s.id; }));
    state.textOrder = shuffle(slice.map(function (s) { return s.id; }));
    drawMatch(root);
  }

  function drawMatch(root) {
    var roundLabel = "第 " + (state.round + 1) + " / 2 轮";
    var html = '<div class="lc-head"><h2>阶段与文字搭配</h2><p>' + roundLabel + " · 点一张真实照片，再点对应的英文句子。</p></div>";
    html += '<div class="lc-toolbar">' + btn("← 游戏首页", "", "lcBack") + btn("听本轮", "primary", "lcHear") + '<span class="sub">已配对 <b id="lcPairN">0</b> / 4</span></div>';
    html += '<div class="lc-match"><div class="lc-match-col" id="lcPhotos"></div><div class="lc-match-col" id="lcTexts"></div></div>';
    html += '<p class="lc-msg" id="lcMsg"></p>';
    root.innerHTML = html;
    document.getElementById("lcBack").onclick = function () { renderHub(root); };
    document.getElementById("lcHear").onclick = function () {
      var items = state.roundItems;
      var i = 0;
      function next() {
        if (i >= items.length) return;
        speak(items[i].en).then(function () {
          i += 1;
          setTimeout(next, 250);
        });
      }
      next();
    };
    paintMatch(root);
  }

  function itemById(id) {
    var i;
    for (i = 0; i < STAGES.length; i++) if (STAGES[i].id === id) return STAGES[i];
    return null;
  }

  function paintMatch(root) {
    var photos = document.getElementById("lcPhotos");
    var texts = document.getElementById("lcTexts");
    photos.innerHTML = "";
    texts.innerHTML = "";
    state.photoOrder.forEach(function (id) {
      var it = itemById(id);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lc-m-photo" + (state.matched[id] ? " is-ok" : "") + (state.selStage === id ? " is-sel" : "");
      b.setAttribute("data-id", id);
      var extras = "";
      if (it.photos.length > 1) {
        extras = '<div class="lc-thumbs">' + it.photos.slice(1).map(function (f) {
          return imgTag(f, "");
        }).join("") + "</div>";
      }
      b.innerHTML = '<div class="lc-m-main">' + imgTag(it.photos[0], it.en) + "</div>" + extras;
      b.onclick = function () {
        if (state.matched[id]) return;
        state.selStage = state.selStage === id ? null : id;
        tryPair(root);
        refreshMatchSel(root);
      };
      photos.appendChild(b);
    });
    state.textOrder.forEach(function (id) {
      var it = itemById(id);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lc-m-text" + (state.matched[id] ? " is-ok" : "") + (state.selText === id ? " is-sel" : "");
      b.setAttribute("data-id", id);
      b.innerHTML = "<div><b>" + it.en + "</b><small>" + it.zh + "</small></div>";
      b.onclick = function () {
        if (state.matched[id]) return;
        state.selText = state.selText === id ? null : id;
        speak(it.en);
        tryPair(root);
        refreshMatchSel(root);
      };
      texts.appendChild(b);
    });
    var n = Object.keys(state.matched).length;
    var pairN = document.getElementById("lcPairN");
    if (pairN) pairN.textContent = String(n);
  }

  function refreshMatchSel(root) {
    root.querySelectorAll(".lc-m-photo").forEach(function (el) {
      var id = el.getAttribute("data-id");
      el.classList.toggle("is-sel", state.selStage === id && !state.matched[id]);
      el.classList.toggle("is-ok", !!state.matched[id]);
    });
    root.querySelectorAll(".lc-m-text").forEach(function (el) {
      var id = el.getAttribute("data-id");
      el.classList.toggle("is-sel", state.selText === id && !state.matched[id]);
      el.classList.toggle("is-ok", !!state.matched[id]);
    });
  }

  function tryPair(root) {
    if (!state.selStage || !state.selText) return;
    var msg = document.getElementById("lcMsg");
    if (state.selStage === state.selText) {
      state.matched[state.selStage] = true;
      state.selStage = null;
      state.selText = null;
      celebrate();
      var n = Object.keys(state.matched).length;
      if (msg) {
        msg.className = "lc-msg ok";
        msg.textContent = n === 4 ? (state.round === 0 ? "本轮完成！进入下一轮。" : "全部完成！你认识蝴蝶的每一个阶段了。") : "配对正确！";
      }
      paintMatch(root);
      if (n === 4) {
        setTimeout(function () {
          if (state.round === 0) startMatch(root, 1);
          else renderHub(root);
        }, 2400);
      }
    } else {
      var pEl = root.querySelector('.lc-m-photo[data-id="' + state.selStage + '"]');
      var tEl = root.querySelector('.lc-m-text[data-id="' + state.selText + '"]');
      if (pEl) pEl.classList.add("is-bad");
      if (tEl) tEl.classList.add("is-bad");
      if (msg) {
        msg.className = "lc-msg bad";
        msg.textContent = "还没配上。再看看照片里的生命阶段。";
      }
      setTimeout(function () {
        if (pEl) pEl.classList.remove("is-bad");
        if (tEl) tEl.classList.remove("is-bad");
        state.selStage = null;
        state.selText = null;
        refreshMatchSel(root);
      }, 420);
    }
  }

  function mount() {
    var root = document.getElementById("lcRoot");
    if (!root) return;
    if (state.mode === "hub" || !root.innerHTML) renderHub(root);
  }

  global.FlutterLifeCycleGames = { mount: mount };
})(typeof window !== "undefined" ? window : this);
