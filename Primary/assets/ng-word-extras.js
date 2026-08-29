/**
 * 国家地理分级阅读 · 学单词增强
 * - 单词列表快跳
 * - 听音排序（可与课题不一致的另一句）
 * - 看图造句
 */
(function (global) {
  "use strict";

  function slug(key) {
    return String(key || "").toLowerCase().replace(/\s+/g, "-");
  }

  function sceneSrc(w, kind) {
    var s = slug(w && w.key);
    if (kind === "ex") return "images/sentences/" + s + "-ex.png";
    if (kind === "sort") return "images/sentences/" + s + "-sort.png";
    return "images/sentences/" + s + ".png";
  }

  function sentenceSrc(w, mediaCos) {
    return sceneSrc(w, "say");
  }

  function pack(en, zh) {
    return { en: en || "", zh: zh || "" };
  }

  function sayOf(w, sayMap) {
    var hit = sayMap && w && sayMap[w.key];
    if (hit && hit.say && hit.say.en) return pack(hit.say.en, hit.say.zh);
    if (hit && hit.en) return pack(hit.en, hit.zh);
    if (w && w.say && w.say.en) return pack(w.say.en, w.say.zh);
    return pack((w && w.ex) || "", (w && w.zh) || "");
  }

  function sortOf(w, sayMap) {
    var hit = sayMap && w && sayMap[w.key];
    if (hit && hit.sort && hit.sort.en) return pack(hit.sort.en, hit.sort.zh);
    if (w && w.sort && w.sort.en) return pack(w.sort.en, w.sort.zh);
    var say = sayOf(w, sayMap);
    var key = (w && w.key) || "";
    if (key && say.en) {
      var fallback = pack("I can say " + key + ".", "我会说 " + ((w && w.zh) || key) + "。");
      if (normalize(fallback.en) !== normalize(say.en)) return fallback;
    }
    return say;
  }

  function exOf(w, sayMap) {
    var hit = sayMap && w && sayMap[w.key];
    if (hit && hit.ex && hit.ex.en) return pack(hit.ex.en, hit.ex.zh);
    if (w && w.ex) return pack(w.ex, (hit && hit.ex && hit.ex.zh) || (w.zh || ""));
    return sortOf(w, sayMap);
  }

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[^a-z0-9'\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(en) {
    return String(en || "").trim().split(/\s+/).filter(Boolean);
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

  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function hasTargetWord(input, key) {
    var k = normalize(key);
    var t = normalize(input);
    if (!k || !t) return false;
    var parts = k.split(" ");
    var stem = parts[parts.length - 1];
    var head = parts.slice(0, -1).join(" ");
    var stemRe = escapeRe(stem) + "(s|es|ed|ing|ies)?";
    var re = head
      ? new RegExp("\\b" + escapeRe(head) + "\\s+" + stemRe + "\\b")
      : new RegExp("\\b" + stemRe + "\\b");
    return re.test(t);
  }

  function wordCount(s) {
    var t = normalize(s);
    return t ? t.split(" ").length : 0;
  }

  function renderJumpList(host, words, currentIndex, onPick) {
    if (!host) return;
    host.innerHTML = "";
    host.setAttribute("role", "navigation");
    host.setAttribute("aria-label", "单词列表");
    (words || []).forEach(function (w, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "word-jump-chip" + (i === currentIndex ? " is-on" : "");
      b.setAttribute("aria-current", i === currentIndex ? "true" : "false");
      b.innerHTML = "<span>" + w.key + "</span><span class=\"zh\">" + (w.zh || "") + "</span>";
      b.title = "跳到 " + w.key + (w.zh ? " / " + w.zh : "");
      b.addEventListener("click", function () {
        if (typeof onPick === "function") onPick(i);
      });
      host.appendChild(b);
    });
    var on = host.querySelector(".word-jump-chip.is-on");
    if (on && on.scrollIntoView) {
      try { on.scrollIntoView({ block: "nearest", inline: "nearest" }); } catch (e) { on.scrollIntoView(); }
    }
  }

  function clearHost(el) {
    if (!el) return;
    el.innerHTML = "";
    el.style.display = "none";
    el.setAttribute("aria-hidden", "true");
  }

  function showHost(el) {
    if (!el) return;
    el.style.display = "block";
    el.removeAttribute("aria-hidden");
  }

  function mountSay(poolHost, actionsHost, msgEl, w, say, api) {
    api = api || {};
    if (!poolHost) return;
    showHost(poolHost);
    poolHost.innerHTML = "";
    if (actionsHost) actionsHost.innerHTML = "";
    if (msgEl) msgEl.innerHTML = "";

    var box = document.createElement("div");
    box.className = "w-say-box";
    var ta = document.createElement("textarea");
    ta.className = "w-say-input";
    ta.rows = 3;
    ta.setAttribute("aria-label", "看图造句输入");
    ta.placeholder = "用上 " + w.key + "，写一句英文……";
    var model = document.createElement("div");
    model.className = "w-say-model";
    model.innerHTML = "<p class=\"en\">" + say.en + "</p><p class=\"zh\">" + (say.zh || "") + "</p>";
    box.appendChild(ta);
    box.appendChild(model);
    poolHost.appendChild(box);

    function btn(label, primary) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = primary ? "btn primary" : "btn";
      b.textContent = label;
      return b;
    }

    var bHearWord = btn("听单词");
    var bCheck = btn("检查", true);
    var bModel = btn("看参考");
    var bHear = btn("听参考");
    if (actionsHost) {
      actionsHost.appendChild(bHearWord);
      actionsHost.appendChild(bCheck);
      actionsHost.appendChild(bModel);
      actionsHost.appendChild(bHear);
    }

    bHearWord.addEventListener("click", function () {
      if (api.speak) api.speak(w.key, { slow: true });
    });
    bHear.addEventListener("click", function () {
      if (api.speak) api.speak(say.en, { slow: true });
    });
    bModel.addEventListener("click", function () {
      model.classList.add("is-on");
      if (api.speak) api.speak(say.en, { slow: true });
    });
    bCheck.addEventListener("click", function () {
      var raw = ta.value;
      if (!normalize(raw)) {
        if (msgEl) msgEl.innerHTML = "<span class='bad'>先写一句再检查哦</span>";
        return;
      }
      if (wordCount(raw) < 2) {
        if (msgEl) msgEl.innerHTML = "<span class='bad'>再写长一点，至少两个单词</span>";
        return;
      }
      if (!hasTargetWord(raw, w.key)) {
        if (msgEl) msgEl.innerHTML = "<span class='bad'>记得用上单词 " + w.key + " 哦</span>";
        return;
      }
      if (msgEl) msgEl.innerHTML = "<span class='ok'>很好！用上了 " + w.key + "</span>";
      model.classList.add("is-on");
      if (api.celebrate) api.celebrate();
    });
  }

  function tokensEqual(a, b) {
    if (a.length !== b.length) return false;
    var i;
    for (i = 0; i < a.length; i++) {
      if (normalize(a[i]) !== normalize(b[i])) return false;
    }
    return true;
  }

  function mountSort(poolHost, actionsHost, msgEl, w, say, api) {
    api = api || {};
    if (!poolHost) return;
    showHost(poolHost);
    poolHost.innerHTML = "";
    if (actionsHost) actionsHost.innerHTML = "";
    if (msgEl) msgEl.innerHTML = "";

    var answer = tokenize(say.en);
    var pool = shuffle(answer.map(function (t, i) { return { t: t, i: i }; }));
    if (answer.length > 1) {
      var same = pool.every(function (p, i) { return p.t === answer[i]; });
      if (same) pool = pool.reverse();
    }
    var chosen = [];

    var box = document.createElement("div");
    box.className = "w-sort-box";
    var hint = document.createElement("p");
    hint.className = "w-sort-hint";
    hint.textContent = "先听句子，再点词按顺序排好。点句子里的词可以收回。";
    var line = document.createElement("div");
    line.className = "w-sort-line";
    line.setAttribute("aria-label", "已排句子");
    var poolRow = document.createElement("div");
    poolRow.className = "w-sort-pool";
    box.appendChild(hint);
    box.appendChild(line);
    box.appendChild(poolRow);
    poolHost.appendChild(box);

    function paint() {
      line.innerHTML = "";
      poolRow.innerHTML = "";
      line.classList.remove("is-ok");
      chosen.forEach(function (item, ci) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "w-sort-tile";
        b.textContent = item.t;
        b.addEventListener("click", function () {
          chosen.splice(ci, 1);
          if (msgEl) msgEl.innerHTML = "";
          paint();
        });
        line.appendChild(b);
      });
      pool.forEach(function (item) {
        var used = chosen.some(function (c) { return c.i === item.i; });
        var b = document.createElement("button");
        b.type = "button";
        b.className = "w-sort-tile" + (used ? " is-used" : "");
        b.textContent = item.t;
        b.disabled = used;
        if (!used) {
          b.addEventListener("click", function () {
            chosen.push(item);
            if (msgEl) msgEl.innerHTML = "";
            paint();
          });
        }
        poolRow.appendChild(b);
      });
    }

    function btn(label, primary) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = primary ? "btn primary" : "btn";
      b.textContent = label;
      return b;
    }

    var bReset = btn("重排");
    var bCheck = btn("检查", true);
    var bHear = btn("再听句子");
    if (actionsHost) {
      actionsHost.appendChild(bReset);
      actionsHost.appendChild(bCheck);
      actionsHost.appendChild(bHear);
    }
    bHear.addEventListener("click", function () {
      if (api.speak) api.speak(say.en, { slow: true });
    });
    bReset.addEventListener("click", function () {
      chosen = [];
      pool = shuffle(answer.map(function (t, i) { return { t: t, i: i }; }));
      if (msgEl) msgEl.innerHTML = "";
      paint();
    });
    bCheck.addEventListener("click", function () {
      if (chosen.length !== answer.length) {
        if (msgEl) msgEl.innerHTML = "<span class='bad'>词还没排完哦</span>";
        return;
      }
      var got = chosen.map(function (c) { return c.t; });
      if (tokensEqual(got, answer)) {
        line.classList.add("is-ok");
        if (msgEl) msgEl.innerHTML = "<span class='ok'>对！</span>";
        if (api.celebrate) api.celebrate();
        if (api.speak) api.speak(say.en, { slow: false });
      } else {
        if (msgEl) msgEl.innerHTML = "<span class='bad'>再试一次</span>";
      }
    });
    paint();
    if (api.autoPlay && api.speak) api.speak(say.en, { slow: true });
  }

  global.NGWordExtras = {
    slug: slug,
    sentenceSrc: sentenceSrc,
    sceneSrc: sceneSrc,
    sayOf: sayOf,
    sortOf: sortOf,
    exOf: exOf,
    tokenize: tokenize,
    normalize: normalize,
    hasTargetWord: hasTargetWord,
    renderJumpList: renderJumpList,
    mountSay: mountSay,
    mountSort: mountSort,
    clearHost: clearHost,
    showHost: showHost
  };
})(window);
