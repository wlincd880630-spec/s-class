/**
 * PET 九种分层复习游戏
 */
(function (global) {
  "use strict";

  var state = {
    bag: null,
    game: null,
    level: "standard",
    queue: [],
    idx: 0,
    score: 0,
    lock: false,
    memory: null,
    spinDeg: 0,
    timerId: null,
    examSource: "zhongkao",
    gapNote: "",
    clinicPoint: null,
    spellKey: null,
    spellPool: [],
    spellSeen: {},
    spellBatchSize: 20,
    spellRound: 0,
    spellTotal: 0
  };

  var SPELL_BATCHES = [15, 20, 30, 40, 50];

  function clearTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function spellSeconds() {
    var s = levelCfg().seconds;
    if (!s) return 0;
    return Math.max(s, 40);
  }

  function timedGame() {
    var k = state.game && state.game.key;
    return k !== "gap" && k !== "grammar" && k !== "memory";
  }

  function attachTimer() {
    clearTimer();
    if (!timedGame()) return;
    var sec = levelCfg().seconds;
    var el = $("timer");
    if (!sec || !el) return;
    var left = sec;
    el.textContent = left + "s";
    state.timerId = setInterval(function () {
      left -= 1;
      if (el) el.textContent = Math.max(0, left) + "s";
      if (left <= 0) {
        clearTimer();
        if (!state.lock) {
          state.lock = true;
          setTimeout(next, 350);
        }
      }
    }, 1000);
  }

  function $(id) { return document.getElementById(id); }

  function levelCfg() {
    return PETStudio.LEVELS[state.level] || PETStudio.LEVELS.standard;
  }

  function say(text) {
    if (window.PetSpeech && window.PetSpeech.playTTS) {
      window.PetSpeech.playTTS(
        window.PET_AZURE_KEY || "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
        window.PET_AZURE_REGION || "southeastasia",
        text
      );
      return;
    }
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  function hudRight() {
    var total = state.queue.length || 1;
    var n = Math.min(state.idx + 1, total);
    var bits = [];
    if (state.game && state.game.key === "spell" && state.spellTotal) {
      bits.push("第 " + (state.spellRound || 1) + " 组");
      bits.push("已测 " + spellSeenCount() + "/" + state.spellTotal);
    }
    bits.push("题 " + n + "/" + total);
    bits.push("分 " + state.score);
    return bits.join(" · ");
  }

  function hud() {
    var sec = !timedGame() ? 0 : ((state.game && state.game.key === "spell") ? spellSeconds() : levelCfg().seconds);
    var timed = sec ? '<span class=timer id=timer>' + sec + "s" + "</span>" : "";
    return '<div class=hud><span>' + esc(state.game.name) + " · " + esc(levelCfg().label) +
      "</span>" + timed + "<span>" + hudRight() + "</span></div>";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function stripHtml(html) {
    var d = document.createElement("div");
    d.innerHTML = html || "";
    return String(d.textContent || d.innerText || "").replace(/\s+/g, " ").trim();
  }

  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function optionLabel(op) {
    if (/^true$/i.test(String(op))) return "正确 True";
    if (/^false$/i.test(String(op))) return "错误 False";
    return String(op);
  }

  function stripBilingualLabel(s) {
    return String(s || "")
      .replace(/[（(]\s*[A-Za-z][A-Za-z0-9/'’+.\s&-]*[）)]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function clinicTermZh(s) {
    var map = {
      ability: "能力",
      permission: "允许",
      possibility: "可能性",
      request: "请求",
      speculation: "推测",
      true: "正确",
      false: "错误"
    };
    return map[String(s || "").trim().toLowerCase()] || "";
  }

  function clinicOptLabel(op) {
    var zh = clinicTermZh(op);
    if (zh) return zh;
    if (/^true$/i.test(String(op))) return "正确";
    if (/^false$/i.test(String(op))) return "错误";
    return stripBilingualLabel(String(op));
  }

  function mostlyEnglish(s) {
    var t = String(s || "");
    var en = (t.match(/[A-Za-z]/g) || []).length;
    var zh = (t.match(/[\u4e00-\u9fff]/g) || []).length;
    return en >= 8 && en > zh;
  }

  function sanitizeClinicHtml(html) {
    var allow = { P: 1, UL: 1, OL: 1, LI: 1, B: 1, STRONG: 1, EM: 1, BR: 1 };
    var src = document.createElement("div");
    src.innerHTML = String(html || "");
    function copy(from) {
      var out = document.createDocumentFragment();
      Array.prototype.forEach.call(from.childNodes, function (n) {
        if (n.nodeType === 3) {
          out.appendChild(document.createTextNode(n.nodeValue));
          return;
        }
        if (n.nodeType !== 1) return;
        if (n.tagName === "BR") {
          out.appendChild(document.createElement("br"));
          return;
        }
        if (allow[n.tagName]) {
          var el = document.createElement(n.tagName.toLowerCase());
          el.appendChild(copy(n));
          out.appendChild(el);
          return;
        }
        out.appendChild(copy(n));
      });
      return out;
    }
    var dest = document.createElement("div");
    dest.appendChild(copy(src));
    return dest.innerHTML;
  }

  function clinicRich(htmlOrText) {
    var raw = String(htmlOrText || "").trim();
    if (!raw) return "";
    if (/<[a-z][\s\S]*>/i.test(raw)) return sanitizeClinicHtml(raw);
    return "<p>" + esc(raw) + "</p>";
  }

  function examKind(src) {
    var s = String(src || "").toLowerCase();
    if (s.indexOf("gaokao") !== -1 || s.indexOf("高考") !== -1) return "gaokao";
    if (s.indexOf("zhongkao") !== -1 || s.indexOf("中考") !== -1) return "zhongkao";
    if (s.indexOf("article") !== -1 || s.indexOf("文章") !== -1) return "article";
    return s;
  }

  function firstFlex(word) {
    var w = String(word || "").replace(/[’']/g, "'").toLowerCase();
    var irr = {
      make: "make|makes|made|making",
      go: "go|goes|went|gone|going",
      get: "get|gets|got|getting",
      run: "run|runs|ran|running",
      blow: "blow|blows|blew|blown|blowing",
      take: "take|takes|took|taken|taking",
      come: "come|comes|came|coming",
      break: "break|breaks|broke|broken|breaking",
      stick: "stick|sticks|stuck|sticking",
      keep: "keep|keeps|kept|keeping",
      leave: "leave|leaves|left|leaving",
      feel: "feel|feels|felt|feeling",
      lead: "lead|leads|led|leading",
      pay: "pay|pays|paid|paying",
      bring: "bring|brings|brought|bringing",
      build: "build|builds|built|building",
      fall: "fall|falls|fell|fallen|falling",
      stand: "stand|stands|stood|standing",
      win: "win|wins|won|winning",
      cut: "cut|cuts|cutting",
      spend: "spend|spends|spent|spending",
      deal: "deal|deals|dealt|dealing",
      fight: "fight|fights|fought|fighting",
      draw: "draw|draws|drew|drawn|drawing",
      wake: "wake|wakes|woke|woken|waking",
      sit: "sit|sits|sat|sitting",
      give: "give|gives|gave|given|giving",
      find: "find|finds|found|finding",
      think: "think|thinks|thought|thinking",
      buy: "buy|buys|bought|buying",
      catch: "catch|catches|caught|catching",
      drive: "drive|drives|drove|driven|driving",
      went: "went|go|goes|gone|going",
      can: "can|could",
      "can't": "can't|cannot|couldn't|could not",
      cannot: "cannot|can't|could not|couldn't",
      do: "do|does|did|done|doing",
      have: "have|has|had|having",
      be: "be|am|is|are|was|were|been|being",
      is: "is|are|was|were|be|been|being"
    };
    if (irr[w]) return "(?:" + irr[w] + ")";
    var stem = escapeRe(String(word).replace(/e$/i, ""));
    return stem + "(?:e|es|ed|ing|s)?";
  }

  function flexRestWord(w) {
    if (/^(your|my|our|his|her|their)$/i.test(w)) return "(?:your|my|our|his|her|their)";
    if (/self$/i.test(w) || /selves$/i.test(w)) {
      return "(?:yourself|myself|himself|herself|themselves|ourselves)";
    }
    if (/^(us|me|you|them)$/i.test(w)) return "(?:us|me|you|them|him|her)";
    return escapeRe(w);
  }

  function phraseRegexes(phrase) {
    var p = String(phrase || "").replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
    if (!p) return [];
    var out = [escapeRe(p)];
    var chunks = p.split(/\.{2,}|…/).map(function (x) {
      return x.replace(/^[\s,]+|[\s,]+$/g, "");
    }).filter(Boolean);
    if (chunks.length >= 2) {
      var bits = chunks.map(function (ch, idx) {
        var words = ch.split(/\s+/).filter(Boolean);
        if (!words.length) return "";
        var head = idx === 0 ? firstFlex(words[0]) : flexRestWord(words[0]);
        var tail = words.slice(1).map(flexRestWord).join("\\s+");
        return "\\b" + head + (tail ? "\\s+" + tail : "");
      }).filter(Boolean);
      if (bits.length) out.push(bits.join(".{0,56}?"));
    }
    var parts = p.replace(/\.{2,}|…/g, " ").split(/\s+/).filter(Boolean);
    if (!parts.length) return out;
    var flexFirst = firstFlex(parts[0]);
    var rest = parts.slice(1).map(flexRestWord).join("\\s+");
    if (rest) {
      out.push("\\b" + flexFirst + "\\s+" + rest + "\\b");
      out.push("\\b" + flexFirst + "\\s+(?:it|them|him|her|this|that|one)\\s+" + rest + "\\b");
    } else {
      out.push("\\b" + flexFirst + "\\b");
    }
    if (parts.length === 2) {
      out.push("\\b" + flexFirst + "\\s+(?:\\S+\\s+){0,8}" + flexRestWord(parts[1]) + "\\b");
    } else if (parts.length >= 3) {
      out.push("\\b" + flexFirst + ".{0,42}?" + parts.slice(-2).map(flexRestWord).join("\\s+"));
    }
    return out;
  }

  function findPhraseMatch(sentence, phrase) {
    var raw = String(sentence || "");
    var regs = phraseRegexes(phrase);
    var i;
    for (i = 0; i < regs.length; i++) {
      var re = new RegExp(regs[i], "ig");
      var m = re.exec(raw);
      if (m) return { index: m.index, text: m[0] };
    }
    return null;
  }

  function blankPhrase(sentence, phrase) {
    var raw = String(sentence || "");
    if (!raw) return "______";
    var regs = phraseRegexes(phrase);
    var i;
    var next;
    for (i = 0; i < regs.length; i++) {
      next = raw.replace(new RegExp(regs[i], "ig"), "______");
      if (next !== raw) return next;
    }
    if (!String(phrase || "").trim()) return raw;
    return raw.replace(/\s*$/, "") + " （______）";
  }

  function markPhraseHtml(sentence, phrase) {
    var raw = String(sentence || "");
    var hit = findPhraseMatch(raw, phrase);
    if (!hit) return esc(raw);
    return esc(raw.slice(0, hit.index)) +
      '<mark class="gap-fill">' + esc(hit.text) + "</mark>" +
      esc(raw.slice(hit.index + hit.text.length));
  }

  function sameSent(a, b) {
    return String(a || "").replace(/\s+/g, " ").trim().toLowerCase() ===
      String(b || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function pickExamExample(it, want) {
    var list = it.examples || [];
    var arts = [];
    list.forEach(function (ex) {
      if (examKind(ex.source) === "article" && ex.sentence) arts.push(ex.sentence);
    });
    var i;
    for (i = 0; i < list.length; i++) {
      if (examKind(list[i].source) !== want || !list[i].sentence) continue;
      if (arts.some(function (a) { return sameSent(a, list[i].sentence); })) continue;
      return list[i];
    }
    if (want === "gaokao" && it.gaokaoEx && it.gaokaoEx.sentence) {
      if (!arts.some(function (a) { return sameSent(a, it.gaokaoEx.sentence); })) {
        return { sentence: it.gaokaoEx.sentence, trans: it.gaokaoEx.trans || "", source: "Gaokao" };
      }
    }
    return null;
  }

  function isQuizCorrect(row) {
    if (!row) return false;
    return row.is_correct === true || row.isCorrect === true ||
      String(row.is_correct).toLowerCase() === "true" ||
      String(row.isCorrect).toLowerCase() === "true";
  }

  function unbindSpellKeys() {
    if (state.spellKey) {
      document.removeEventListener("keydown", state.spellKey);
      state.spellKey = null;
    }
  }

  function spellLetters(q) {
    return String((q && q.item && q.item.word) || "").replace(/[^a-zA-Z]/g, "");
  }

  function refreshHudScore() {
    var hudEl = document.querySelector(".play-shell .hud");
    if (!hudEl) return;
    var spans = hudEl.querySelectorAll("span");
    if (!spans.length) return;
    spans[spans.length - 1].textContent = hudRight();
  }

  function spellItemKey(it) {
    return Number(it.unitId || 0) + ":" + String(it.word || "").toLowerCase();
  }

  function spellSeenCount() {
    return Object.keys(state.spellSeen || {}).length;
  }

  function spellableItems() {
    return (state.bag.vocab || []).concat(state.bag.colloc || []).filter(function (it) {
      return spellLetters({ item: it }).length > 0;
    });
  }

  function unusedSpellItems() {
    return (state.spellPool || []).filter(function (it) {
      return !state.spellSeen[spellItemKey(it)];
    });
  }

  function spellBatchTake() {
    var left = unusedSpellItems().length;
    var size = state.spellBatchSize || 20;
    return Math.min(size, left);
  }

  function spellSizePicksHtml() {
    var cur = state.spellBatchSize || 20;
    if (SPELL_BATCHES.indexOf(cur) < 0) {
      cur = 20;
      state.spellBatchSize = 20;
    }
    var left = unusedSpellItems().length;
    var take = Math.min(cur, left);
    var html = '<div class="spell-sizes" id="spellSizes">';
    SPELL_BATCHES.forEach(function (n) {
      html += '<button type="button" class="kind-btn' + (n === cur ? " on" : "") +
        '" data-spell-size="' + n + '">' + n + "</button>";
    });
    html += "</div>";
    if (!left) return html;
    var hint = "本组将测 " + take + " 词";
    if (take === left) hint += "（最后一组，不重复补题）";
    else hint += " · 测完还剩 " + (left - take) + " 词";
    html += '<p class="note" id="spellBatchHint">' + hint + "</p>";
    return html;
  }

  function bindSpellSizePicks(rerender) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-spell-size]"), function (btn) {
      btn.onclick = function () {
        state.spellBatchSize = Number(btn.getAttribute("data-spell-size")) || 20;
        rerender();
      };
    });
  }

  function spellMissHtml() {
    if (!state.game || state.game.key !== "spell") return "";
    var misses = (state.queue || []).filter(function (q) {
      return q && q.item && !q.skip && q.ok !== true;
    });
    if (!misses.length) {
      return '<p class="spell-all-ok">本组单词全部拼对。</p>';
    }
    return '<div class="miss-box"><div class="miss-h">本组需要再练的单词（' + misses.length +
      '）</div><ul class="miss-list">' +
      misses.map(function (q) {
        var typed = q.typed ? q.typed : "未作答";
        return "<li><b>" + esc(q.item.word) + "</b> " + esc(q.item.meaning || "") +
          ' <span class="miss-you">你的拼写：' + esc(typed) + "</span></li>";
      }).join("") + "</ul></div>";
  }

  function done() {
    if (state.game && state.game.key === "spell") {
      showSpellGroupDone();
      return;
    }
    unbindSpellKeys();
    $("playRoot").innerHTML = '<div class=play-shell>' + hud() +
      '<div class=q-box>本局完成！得分 ' + state.score + " / " + state.queue.length + "</div>" +
      '<button class="btn btn-indigo" id="againBtn">再来一局</button> ' +
      '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
    $("againBtn").onclick = function () {
      if (state.game.key === "gap" && state.examSource) beginGap();
      else if (state.game.key === "grammar" && state.clinicPoint) startGrammarStation(state.clinicPoint);
      else startGame(state.game.key, state.level);
    };
    if (state.game.key === "grammar") {
      var extra = document.createElement("button");
      extra.className = "btn btn-teal";
      extra.id = "clinicLobbyBtn";
      extra.textContent = "选择其他语法点";
      extra.onclick = showGrammarLobby;
      $("againBtn").insertAdjacentElement("afterend", extra);
      extra.insertAdjacentText("beforebegin", " ");
    }
    $("backGames").onclick = showList;
  }

  function next() {
    unbindSpellKeys();
    clearTimer();
    state.idx++;
    state.lock = false;
    if (state.idx >= state.queue.length) done();
    else renderCurrent();
  }

  function makeChoiceQs(fromMeaning) {
    var cfg = levelCfg();
    var pool = PETStudio.pickN(state.bag.vocab.concat(state.bag.colloc), cfg.count);
    var meanings = state.bag.vocab.concat(state.bag.colloc).map(function (x) { return x.meaning; });
    var words = state.bag.vocab.concat(state.bag.colloc).map(function (x) { return x.word; });
    return pool.map(function (it) {
      if (fromMeaning) {
        var opts = PETStudio.shuffle([it.word].concat(PETStudio.distractors(words, it.word, cfg.options - 1)));
        return { q: it.meaning, prompt: "选出对应的英文", options: opts, answer: it.word, speak: it.word, img: it.imageUrl };
      }
      var opts2 = PETStudio.shuffle([it.meaning].concat(PETStudio.distractors(meanings, it.meaning, cfg.options - 1)));
      return { q: it.word, prompt: it.phonetic || "选出正确中文", options: opts2, answer: it.meaning, speak: it.word, img: it.imageUrl };
    });
  }

  function bindOpts(q, manual) {
    var box = $("opts");
    if (!box) return;
    (q.options || []).forEach(function (op) {
      var b = document.createElement("button");
      b.className = "opt";
      b.textContent = (q.labelOpt || optionLabel)(op);
      b.setAttribute("data-answer", op);
      b.onclick = function () {
        if (state.lock) return;
        state.lock = true;
        var ok = op === q.answer;
        b.className = "opt " + (ok ? "ok" : "bad");
        if (ok) state.score++;
        else {
          Array.prototype.forEach.call(box.children, function (el) {
            if (el.getAttribute("data-answer") === q.answer) el.className = "opt ok";
          });
        }
        var explain = $("explainBox");
        if (explain && q.explain) {
          explain.hidden = false;
          explain.textContent = q.explain;
        }
        if (manual) {
          var nextBtn = $("clinicNext");
          if (nextBtn) {
            nextBtn.hidden = false;
            nextBtn.textContent = state.idx + 1 >= state.queue.length ? "完成本语法点" : "下一题";
            nextBtn.onclick = next;
          }
          return;
        }
        setTimeout(next, q.explain ? 1800 : 700);
      };
      box.appendChild(b);
    });
  }

  function renderChoice() {
    var q = state.queue[state.idx];
    var pic = (state.game.key === "picture" && q.img)
      ? '<div class=pic-wrap><img src="' + esc(q.img) + '" alt=""></div>'
      : "";
    $("playRoot").innerHTML = '<div class=play-shell>' + hud() +
      '<div class=note>' + esc(q.prompt || "") + "</div>" +
      pic +
      '<div class=q-box>' + esc(q.q) + "</div>" +
      (q.speak ? '<button class="btn btn-ghost" id="speakBtn">朗读</button>' : "") +
      '<div class=opts id=opts></div>' +
      '<div class="explain" id="explainBox" hidden></div></div>';
    if ($("speakBtn")) $("speakBtn").onclick = function () { say(q.speak); };
    bindOpts(q);
    attachTimer();
  }

  function startMemory() {
    var want = { easy: 4, standard: 6, challenge: 8 };
    var pool = state.bag.vocab.filter(function (x) { return x.word && x.meaning; });
    var n = Math.min(want[state.level] || 6, pool.length);
    var items = PETStudio.pickN(pool, n);
    var cards = [];
    items.forEach(function (it, i) {
      var pid = "p" + i;
      cards.push({ pair: pid, kind: "en", text: it.word, img: it.imageUrl || "" });
      cards.push({ pair: pid, kind: "zh", text: it.meaning, img: "" });
    });
    state.memory = {
      cards: PETStudio.shuffle(cards),
      open: [],
      matched: {},
      busy: false,
      phase: "preview"
    };
    state.queue = items;
    state.idx = 0;
    renderMemory();
  }

  function memoryHud() {
    var m = state.memory;
    var got = Object.keys(m.matched).length;
    var total = m.cards.length / 2;
    var right = m.phase === "preview"
      ? "先看牌记忆"
      : ("配对 " + got + "/" + total + " · 分 " + state.score);
    return '<div class=hud><span>' + esc(state.game.name) + " · " + esc(levelCfg().label) +
      "</span><span>" + right + "</span></div>";
  }

  function renderMemory() {
    var m = state.memory;
    if (!m) return;
    var preview = m.phase === "preview";
    var note = preview
      ? "所有牌默认亮着。先记住英文、图片和中文的位置，再点「反转开始配对」。"
      : "翻开一张英文牌和一张中文牌，配对成功即可留下；点错会翻回去。";
    var html = '<div class="play-shell">' + memoryHud() +
      '<p class="note">' + note + "</p>" +
      '<div class="board memory-board">';
    m.cards.forEach(function (c, i) {
      var matched = !!m.matched[c.pair];
      var open = preview || m.open.indexOf(i) !== -1 || matched;
      html += '<button type="button" class="flip' +
        (open ? " open" : "") +
        (matched ? " done" : "") +
        (preview ? " preview" : "") +
        (c.kind === "zh" ? " zh" : " en") +
        '" id="mem-card-' + i + '" data-i="' + i + '">';
      if (open) {
        if (c.img) html += '<img src="' + esc(c.img) + '" alt="">';
        html += "<small>" + (c.kind === "en" ? "EN" : "中文") + "</small>";
        html += "<span>" + esc(c.text) + "</span>";
      } else {
        html += '<span class="qmark">?</span>';
      }
      html += "</button>";
    });
    html += '</div><div class="mem-actions">';
    if (preview) {
      html += '<button class="btn btn-indigo" type="button" id="flipStart">反转开始配对</button> ';
    }
    html += '<button class="btn btn-ghost" type="button" id="backGames">返回游戏列表</button></div></div>';
    $("playRoot").innerHTML = html;
    $("backGames").onclick = showList;
    if (preview) {
      $("flipStart").onclick = function () {
        m.phase = "play";
        m.open = [];
        m.busy = false;
        renderMemory();
      };
      return;
    }
    Array.prototype.forEach.call(document.querySelectorAll(".flip"), function (btn) {
      btn.onclick = function () {
        var i = Number(btn.getAttribute("data-i"));
        var card = m.cards[i];
        if (m.phase !== "play" || m.busy || m.matched[card.pair] || m.open.indexOf(i) !== -1 || m.open.length >= 2) return;
        m.open.push(i);
        renderMemory();
        if (m.open.length < 2) return;
        var a = m.cards[m.open[0]];
        var b = m.cards[m.open[1]];
        if (a.pair === b.pair) {
          m.matched[a.pair] = true;
          state.score++;
          m.open = [];
          renderMemory();
          if (Object.keys(m.matched).length >= m.cards.length / 2) {
            setTimeout(done, 500);
          }
        } else {
          m.busy = true;
          setTimeout(function () {
            m.open = [];
            m.busy = false;
            renderMemory();
          }, 800);
        }
      };
    });
  }

  function startSpell() {
    unbindSpellKeys();
    state.spellPool = spellableItems();
    state.spellSeen = {};
    state.spellRound = 0;
    state.spellTotal = state.spellPool.length;
    if (!state.spellBatchSize || SPELL_BATCHES.indexOf(state.spellBatchSize) < 0) {
      state.spellBatchSize = 20;
    }
    showSpellSetup();
  }

  function showSpellSetup() {
    unbindSpellKeys();
    var total = state.spellTotal;
    var left = unusedSpellItems().length;
    if (!total) {
      $("playRoot").innerHTML = '<div class="play-shell"><p class="note">没有可拼写的单词。</p>' +
        '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
      $("backGames").onclick = showList;
      return;
    }
    var take = spellBatchTake();
    $("playRoot").innerHTML = '<div class="play-shell" id="spellSetup">' +
      "<h2>拼写冲刺</h2>" +
      '<p class="note">目标 <b>' + total + "</b> 个词。选每组题量，测过的词不会再出现，每组随机排序。最后一组用剩余词，不重复补题。</p>" +
      '<p class="note">已测 ' + spellSeenCount() + " · 剩余 " + left + "</p>" +
      '<div class="field"><label>每组数量</label></div>' +
      spellSizePicksHtml() +
      '<button class="btn btn-indigo" id="spellStartBtn">开始（' + take + " 词）</button> " +
      '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
    bindSpellSizePicks(showSpellSetup);
    $("spellStartBtn").onclick = beginSpellBatch;
    $("backGames").onclick = showList;
  }

  function beginSpellBatch() {
    var unused = unusedSpellItems();
    if (!unused.length) {
      showSpellGroupDone();
      return;
    }
    var n = Math.min(state.spellBatchSize || 20, unused.length);
    var batch = PETStudio.shuffle(unused.slice()).slice(0, n);
    state.spellRound += 1;
    state.idx = 0;
    state.score = 0;
    state.lock = false;
    state.queue = batch.map(function (it) {
      return { item: it, typed: "", ok: null, settled: false };
    });
    renderSpell();
  }

  function showSpellGroupDone() {
    unbindSpellKeys();
    var left = unusedSpellItems().length;
    var allDone = left === 0;
    var take = spellBatchTake();
    var title = allDone
      ? "全部测完！共 " + state.spellTotal + " 词"
      : "第 " + state.spellRound + " 组完成！得分 " + state.score + " / " + state.queue.length;
    var html = '<div class="play-shell" id="spellGroupDone">' + hud() +
      '<div class=q-box>' + title + "</div>" +
      '<p class="note">已测 ' + spellSeenCount() + " / " + state.spellTotal +
      (allDone ? "" : " · 还剩 " + left + " 个词") + "</p>";
    if (!allDone) {
      html += '<div class="field"><label>下一组数量</label></div>' + spellSizePicksHtml() +
        '<button class="btn btn-indigo" id="spellNextGroup">开始（' + take + " 词）</button> ";
    } else {
      html += '<button class="btn btn-indigo" id="spellRestart">全部重测</button> ';
    }
    html += '<button class="btn btn-ghost" id="backGames">返回游戏列表</button>' +
      spellMissHtml() + "</div>";
    $("playRoot").innerHTML = html;
    bindSpellSizePicks(showSpellGroupDone);
    if ($("spellNextGroup")) $("spellNextGroup").onclick = beginSpellBatch;
    if ($("spellRestart")) $("spellRestart").onclick = startSpell;
    $("backGames").onclick = showList;
  }

  function settleSpell() {
    var q = state.queue[state.idx];
    if (!q || q.settled) return;
    var w = spellLetters(q);
    q.settled = true;
    state.lock = true;
    clearTimer();
    q.ok = q.typed === w.toLowerCase();
    if (q.item) state.spellSeen[spellItemKey(q.item)] = true;
    if (q.ok) state.score++;
    drawSpell(w, q.typed, q.ok);
    refreshHudScore();
    var box = $("spellResult");
    if (box) {
      var last = state.idx >= state.queue.length - 1;
      var nextLabel = last ? "查看结果" : "下一个";
      var msg = q.ok
        ? '<p class="explain">拼写正确</p>'
        : '<p class="explain spell-wrong">正确拼写：<b>' + esc(q.item.word) + "</b>" +
          (q.typed ? " · 你写了 " + esc(q.typed) : " · 未作答") + "</p>";
      box.innerHTML = msg +
        '<button type="button" class="btn btn-indigo" id="spellNextBtn">' + nextLabel + "</button>" +
        '<p class="note">点「' + nextLabel + "」或按回车继续</p>";
      $("spellNextBtn").onclick = function () { advanceSpell(); };
    }
    var inp = $("spellIn");
    if (inp) {
      inp.readOnly = true;
    }
    Array.prototype.forEach.call(document.querySelectorAll("#keys .key"), function (b) {
      b.disabled = true;
    });
  }

  function advanceSpell() {
    var q = state.queue[state.idx];
    if (!q || !q.settled || q.leaving) return;
    q.leaving = true;
    next();
  }

  function renderSpell() {
    var q = state.queue[state.idx];
    if (!q) {
      done();
      return;
    }
    var w = spellLetters(q);
    if (!w) {
      q.skip = true;
      q.ok = true;
      q.settled = true;
      if (q.item) state.spellSeen[spellItemKey(q.item)] = true;
      setTimeout(next, 0);
      return;
    }
    unbindSpellKeys();
    $("playRoot").innerHTML = '<div class="play-shell spell-play">' + hud() +
      '<div class=note>' + esc(q.item.meaning) + "</div>" +
      '<div class=q-box>' + esc(q.item.phonetic || "听音 / 看义拼写") + "</div>" +
      '<button class="btn btn-ghost" id="speakBtn">朗读单词</button>' +
      '<div class=spell-row id=slots></div>' +
      '<input id=spellIn class=spell-input autocomplete=off autocapitalize=off spellcheck=false placeholder="在此居中输入拼写">' +
      '<div class=keys id=keys></div>' +
      '<div id=spellResult></div>' +
      '<p class=note>写满后仍可用退格修改，按回车才判断。判完后再按回车或点「下一个」进入下一词。</p></div>';
    $("speakBtn").onclick = function () { say(q.item.word); };
    drawSpell(w, q.typed);
    var letters = PETStudio.shuffle((w + "abcdefghijklmnopqrstuvwxyz").slice(0, Math.max(w.length + 4, 12)).split(""));
    var keys = $("keys");
    letters.forEach(function (ch) {
      var b = document.createElement("button");
      b.className = "key";
      b.textContent = ch;
      b.onclick = function () { pushSpell(ch); };
      keys.appendChild(b);
    });
    var del = document.createElement("button");
    del.className = "key key-del";
    del.type = "button";
    del.textContent = "退格";
    del.onclick = function () { popSpell(); };
    keys.appendChild(del);
    var inp = $("spellIn");
    inp.focus();
    inp.oninput = function () {
      if (q.settled) return;
      q.typed = (inp.value || "").replace(/[^a-zA-Z]/g, "").slice(0, w.length).toLowerCase();
      inp.value = q.typed;
      drawSpell(w, q.typed);
    };
    function pushSpell(ch) {
      if (q.settled || q.typed.length >= w.length) return;
      q.typed += ch.toLowerCase();
      if (inp) inp.value = q.typed;
      drawSpell(w, q.typed);
      if (inp) inp.focus();
    }
    function popSpell() {
      if (q.settled || !q.typed.length) return;
      q.typed = q.typed.slice(0, -1);
      if (inp) inp.value = q.typed;
      drawSpell(w, q.typed);
      if (inp) inp.focus();
    }
    state.spellKey = function (e) {
      if (q.settled) {
        if (e.key === "Enter" && !e.repeat) {
          e.preventDefault();
          advanceSpell();
        }
        return;
      }
      if (e.key === "Backspace") {
        if (e.target && e.target.id === "spellIn") return;
        e.preventDefault();
        popSpell();
        return;
      }
      if (e.key !== "Enter") return;
      if (e.repeat) return;
      e.preventDefault();
      settleSpell();
    };
    document.addEventListener("keydown", state.spellKey);
    clearTimer();
    var sec = spellSeconds();
    var el = $("timer");
    if (sec && el) {
      var left = sec;
      el.textContent = left + "s";
      state.timerId = setInterval(function () {
        left -= 1;
        if (el) el.textContent = Math.max(0, left) + "s";
        if (left <= 0) {
          clearTimer();
          settleSpell();
        }
      }, 1000);
    }
  }

  function drawSpell(w, typed, ok) {
    var el = $("slots");
    if (!el) return;
    var judged = ok === true || ok === false;
    el.innerHTML = w.split("").map(function (ch, i) {
      var cls = "slot";
      if (judged) {
        cls += (String(typed[i] || "").toLowerCase() === ch.toLowerCase()) ? " ok" : " bad";
      }
      return '<div class="' + cls + '">' + esc(typed[i] || "") + "</div>";
    }).join("");
    var inp = $("spellIn");
    if (inp && document.activeElement !== inp) inp.value = typed;
  }

  function showGapSetup() {
    var cur = state.examSource || "zhongkao";
    $("playRoot").innerHTML = '<div class="play-shell gap-setup">' +
      "<h2>词组填空</h2>" +
      '<p class="note">先读英文例句，从四个词组里选出填空答案。选错可再选，选对后句子补全，再点中文翻译。</p>' +
      '<div class="source-picks">' +
      '<button type="button" class="src-btn' + (cur === "zhongkao" ? " on" : "") + '" data-src="zhongkao" id="srcZhongkao">中考例句</button>' +
      '<button type="button" class="src-btn' + (cur === "gaokao" ? " on" : "") + '" data-src="gaokao" id="srcGaokao">高考例句</button>' +
      "</div>" +
      '<button class="btn btn-indigo" id="gapStart">开始作答</button> ' +
      '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
    Array.prototype.forEach.call(document.querySelectorAll(".src-btn"), function (btn) {
      btn.onclick = function () {
        state.examSource = btn.getAttribute("data-src");
        showGapSetup();
      };
    });
    $("gapStart").onclick = function () { beginGap(); };
    $("backGames").onclick = showList;
  }

  function gaokaoCacheKey() {
    var id = state.bag && state.bag.unit ? state.bag.unit.id : 0;
    return "pet-gap-gaokao-u" + id;
  }

  function loadGaokaoCache() {
    try {
      var map = JSON.parse(sessionStorage.getItem(gaokaoCacheKey()) || "{}");
      (state.bag.colloc || []).forEach(function (it) {
        var hit = map[String(it.word).toLowerCase()];
        if (hit && hit.sentence) it.gaokaoEx = hit;
      });
    } catch (e) {}
  }

  function saveGaokaoCache() {
    try {
      var map = {};
      (state.bag.colloc || []).forEach(function (it) {
        if (it.gaokaoEx && it.gaokaoEx.sentence) map[String(it.word).toLowerCase()] = it.gaokaoEx;
      });
      sessionStorage.setItem(gaokaoCacheKey(), JSON.stringify(map));
    } catch (e) {}
  }

  function ensureGaokaoExamples() {
    loadGaokaoCache();
    var items = (state.bag.colloc || []).filter(function (x) { return x.word; });
    var missing = items.filter(function (x) { return !(x.gaokaoEx && x.gaokaoEx.sentence); });
    if (!missing.length) return Promise.resolve();
    if (typeof PETStudio.aiExamSentences !== "function") {
      return Promise.reject(new Error("无生成接口"));
    }
    return PETStudio.aiExamSentences(missing, "gaokao").then(function (arr) {
      var map = {};
      (arr || []).forEach(function (row) {
        var k = String(row.phrase || row.word || "").toLowerCase();
        if (k && row.sentence) map[k] = { sentence: row.sentence, trans: row.trans || "" };
      });
      function lookupEx(word) {
        var k = String(word || "").toLowerCase();
        if (map[k]) return map[k];
        var keys = Object.keys(map);
        var i;
        for (i = 0; i < keys.length; i++) {
          if (keys[i].indexOf(k) !== -1 || k.indexOf(keys[i]) !== -1) return map[keys[i]];
        }
        return null;
      }
      missing.forEach(function (it) {
        var hit = lookupEx(it.word);
        if (hit) it.gaokaoEx = hit;
      });
      saveGaokaoCache();
      var got = items.filter(function (x) { return x.gaokaoEx && x.gaokaoEx.sentence; }).length;
      if (!got) throw new Error("未得到高考例句");
    });
  }

  function buildGapQueue(want) {
    var list = (state.bag.colloc || []).filter(function (it) {
      return it.word && it.meaning && pickExamExample(it, want);
    });
    if (!list.length) {
      state.queue = [];
      return false;
    }
    var words = state.bag.colloc.map(function (x) { return x.word; }).filter(Boolean);
    state.queue = PETStudio.pickN(list, Math.min(levelCfg().count, list.length)).map(function (it) {
      var ex = pickExamExample(it, want);
      var raw = ex.sentence || "";
      return {
        kind: "gap",
        meaning: it.meaning || "",
        q: blankPhrase(raw, it.word),
        trans: ex.trans || "",
        sourceLabel: want === "gaokao" ? "高考" : "中考",
        options: PETStudio.shuffle([it.word].concat(PETStudio.distractors(words, it.word, 3))),
        answer: it.word,
        speak: raw,
        solved: false,
        showZh: false,
        missed: false,
        wrong: []
      };
    });
    state.idx = 0;
    state.score = 0;
    state.lock = false;
    return true;
  }

  function beginGap() {
    var src = state.examSource || "zhongkao";
    if (src === "gaokao") {
      if (buildGapQueue("gaokao")) {
        state.gapNote = "";
        renderGap();
        return;
      }
      $("playRoot").innerHTML = '<div class="play-shell"><p class="note" id="gapLoading">正在生成高考例句…</p></div>';
      ensureGaokaoExamples().then(function () {
        state.gapNote = "";
        if (!buildGapQueue("gaokao")) {
          state.examSource = "zhongkao";
          state.gapNote = "本单元暂无高考例句，已改用中考例句。";
          buildGapQueue("zhongkao");
        }
        renderGap();
      }).catch(function (e) {
        state.examSource = "zhongkao";
        state.gapNote = "高考例句暂不可用（" + (e.message || "网络") + "），已改用中考例句。";
        buildGapQueue("zhongkao");
        renderGap();
      });
      return;
    }
    state.gapNote = "";
    if (!buildGapQueue("zhongkao")) {
      $("playRoot").innerHTML = '<div class="play-shell"><p class="note">本单元没有可用的中考词组例句。</p>' +
        '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
      $("backGames").onclick = showList;
      return;
    }
    renderGap();
  }

  function rebindQueueSource(want) {
    (state.queue || []).forEach(function (q) {
      if (q.kind !== "gap") return;
      var it = null;
      (state.bag.colloc || []).some(function (x) {
        if (x.word === q.answer) { it = x; return true; }
        return false;
      });
      if (!it) return;
      var ex = pickExamExample(it, want);
      if (!ex || !ex.sentence) return;
      q.q = blankPhrase(ex.sentence, it.word);
      q.trans = ex.trans || "";
      q.sourceLabel = want === "gaokao" ? "高考" : "中考";
      q.speak = ex.sentence;
    });
  }

  function bindSourceSwitch() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-src]"), function (btn) {
      btn.onclick = function () {
        var src = btn.getAttribute("data-src");
        if (!src || src === state.examSource) return;
        state.examSource = src;
        if (state.queue && state.queue.length && state.queue[0].kind === "gap") {
          rebindQueueSource(src);
          renderGap();
          return;
        }
        beginGap();
      };
    });
  }

  function sourceSwitchHtml() {
    var cur = state.examSource || "zhongkao";
    return '<div class="source-picks compact">' +
      '<button type="button" class="src-btn' + (cur === "zhongkao" ? " on" : "") + '" data-src="zhongkao">中考例句</button>' +
      '<button type="button" class="src-btn' + (cur === "gaokao" ? " on" : "") + '" data-src="gaokao">高考例句</button>' +
      "</div>";
  }

  function renderGap() {
    var q = state.queue[state.idx];
    if (!q) {
      $("playRoot").innerHTML = '<div class="play-shell"><p class="note">没有题目。</p>' +
        '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
      if ($("backGames")) $("backGames").onclick = showList;
      return;
    }
    var note = state.gapNote ? '<p class="toast">' + esc(state.gapNote) + "</p>" : "";
    var sent = q.solved ? markPhraseHtml(q.speak, q.answer) : esc(q.q);
    var follow = "";
    if (q.solved) {
      follow += '<div class="gap-follow">';
      if (!q.showZh) {
        follow += '<button class="btn btn-teal" type="button" id="gapZhBtn">中文翻译</button>';
      } else {
        follow += '<div class="gap-zh">' + esc(q.trans || q.meaning || "暂无中文翻译") + "</div>";
        follow += '<button class="btn btn-indigo" type="button" id="gapNext">' +
          (state.idx + 1 >= state.queue.length ? "完成本局" : "下一题") + "</button>";
      }
      follow += "</div>";
    }
    $("playRoot").innerHTML = '<div class="play-shell">' + hud() + note +
      sourceSwitchHtml() +
      '<div class="exam-line"><span class="exam-tag">' + esc(q.sourceLabel) + "例句</span></div>" +
      '<p class="gap-sent' + (q.solved ? " filled" : "") + '">' + sent + "</p>" +
      '<div class="opts" id="opts"></div>' +
      follow +
      '<div class="mem-actions"><button class="btn btn-ghost" type="button" id="backGames">返回游戏列表</button></div></div>';
    $("backGames").onclick = showList;
    bindSourceSwitch();
    bindGapOpts(q);
    if ($("gapZhBtn")) {
      $("gapZhBtn").onclick = function () {
        q.showZh = true;
        renderGap();
      };
    }
    if ($("gapNext")) $("gapNext").onclick = next;
  }

  function bindGapOpts(q) {
    var box = $("opts");
    if (!box) return;
    (q.options || []).forEach(function (op) {
      var b = document.createElement("button");
      var wrong = (q.wrong || []).indexOf(op) !== -1;
      b.className = "opt" + (q.solved && op === q.answer ? " ok" : "") + (wrong ? " bad" : "");
      b.textContent = optionLabel(op);
      b.setAttribute("data-answer", op);
      if (q.solved || wrong) {
        b.disabled = true;
        box.appendChild(b);
        return;
      }
      b.onclick = function () {
        if (q.solved) return;
        if (op === q.answer) {
          q.solved = true;
          if (!q.missed) state.score++;
          renderGap();
          return;
        }
        q.missed = true;
        q.wrong = q.wrong || [];
        if (q.wrong.indexOf(op) === -1) q.wrong.push(op);
        renderGap();
      };
      box.appendChild(b);
    });
  }

  function startContext() {
    var grouped = {};
    state.bag.vocab.concat(state.bag.colloc).forEach(function (it) {
      if (it.quizFill && it.quizFill.length) grouped[it.word] = it;
    });
    var items = PETStudio.pickN(Object.keys(grouped).map(function (k) { return grouped[k]; }), levelCfg().count);
    state.queue = items.map(function (it) {
      var rows = PETStudio.shuffle(it.quizFill.slice());
      var correct = "";
      rows.forEach(function (r) {
        if (isQuizCorrect(r)) correct = r.sentence;
      });
      return {
        q: "哪一句最适合填入 / 使用「" + it.word + "」？",
        prompt: it.meaning,
        options: rows.map(function (r) { return r.sentence; }),
        answer: correct,
        speak: it.word
      };
    });
    renderChoice();
  }

  function clinicLabel(g) {
    var exp = stripHtml(g && g.explanation || "");
    var first = (exp.split(/[。！？\n]/)[0] || "").trim();
    if (first.length >= 8 && first.length <= 52) return first;
    if (g && g.sourceSentenceCn) return String(g.sourceSentenceCn).slice(0, 36);
    return (g && g.title) || "语法点";
  }

  function grammarItems(g) {
    var out = [];
    function push(row, kindLabel) {
      if (!row || !row.question) return;
      var opts = (row.options || []).slice();
      var ans = row.correct;
      if (!opts.length && /^true|false$/i.test(String(ans))) opts = ["True", "False"];
      if (!opts.length) return;
      out.push({
        q: row.question,
        prompt: kindLabel,
        options: opts,
        answer: ans,
        explain: stripBilingualLabel(row.explanation || row.hint || ""),
        speak: "",
        g: g,
        kind: "quiz",
        qType: kindLabel,
        labelOpt: clinicOptLabel
      });
    }
    (g.guide || []).forEach(function (row) { push(row, "引导题"); });
    var quizzes = g.quiz || [];
    var cap = ({ easy: 2, standard: 4, challenge: quizzes.length })[state.level];
    if (cap == null) cap = 4;
    quizzes.slice(0, cap).forEach(function (row) { push(row, "巩固练习"); });
    return out;
  }

  function grammarPoints() {
    return (state.bag.grammar || []).filter(function (g) {
      return (g.quiz && g.quiz.length) || (g.guide && g.guide.length);
    });
  }

  function showGrammarLobby() {
    var points = grammarPoints();
    if (!points.length) {
      $("playRoot").innerHTML = '<div class="play-shell"><p class="note">本单元还没有语法练习题。</p>' +
        '<button class="btn btn-ghost" id="backGames">返回游戏列表</button></div>';
      $("backGames").onclick = showList;
      return;
    }
    var cards = points.map(function (g, i) {
      var n = grammarItems(g).length;
      return '<button type="button" class="clinic-station" data-gi="' + i + '">' +
        '<div class="clinic-kicker">语法点 ' + (i + 1) + "</div>" +
        "<h3>" + esc(clinicLabel(g)) + "</h3>" +
        (g.sourceSentenceCn ? "<p>" + esc(g.sourceSentenceCn) + "</p>" : "") +
        "<span>" + n + " 道练习</span></button>";
    }).join("");
    $("playRoot").innerHTML = '<div class="play-shell">' +
      '<div class="hud"><span>' + esc(state.game.name) + " · " + esc(levelCfg().label) +
      "</span><span>" + points.length + " 个语法点</span></div>" +
      '<p class="note">先选一个本课语法点，看课文原句和要点，再做该点的引导题与练习题。</p>' +
      '<div class="clinic-lobby">' + cards + "</div>" +
      '<div class="mem-actions"><button class="btn btn-ghost" type="button" id="backGames">返回游戏列表</button></div></div>';
    $("backGames").onclick = showList;
    Array.prototype.forEach.call(document.querySelectorAll(".clinic-station"), function (btn) {
      btn.onclick = function () {
        var g = points[Number(btn.getAttribute("data-gi"))];
        if (g) startGrammarStation(g);
      };
    });
  }

  function startGrammarStation(g) {
    var qs = grammarItems(g);
    if (!qs.length) {
      showGrammarLobby();
      return;
    }
    qs[0].showIntro = true;
    qs[0].introSeen = false;
    state.clinicPoint = g;
    state.queue = qs;
    state.idx = 0;
    state.score = 0;
    state.lock = false;
    renderGrammar();
  }

  function startGrammar() {
    showGrammarLobby();
  }

  function renderGrammarIntro(q) {
    var g = q.g || {};
    var expHtml = clinicRich(g.explanation || "");
    var tipsHtml = clinicRich(g.tips || "");
    var exHtml = (g.examples || []).map(function (ex) {
      var en = ex.en || ex.sentence || "";
      if (!en) return "";
      return "<li>" + esc(en) + "</li>";
    }).join("");
    var blocks = "";
    if (g.sourceSentence) {
      blocks += '<section class="clinic-block"><h3>课文原句</h3>' +
        '<p class="clinic-quote">' + esc(g.sourceSentence) + "</p></section>";
    }
    if (expHtml) {
      blocks += '<section class="clinic-block"><h3>语法讲解</h3>' +
        '<div class="clinic-exp">' + expHtml + "</div></section>";
    }
    if (exHtml) {
      blocks += '<section class="clinic-block"><h3>例句</h3>' +
        '<ul class="clinic-ex">' + exHtml + "</ul></section>";
    }
    if (tipsHtml) {
      blocks += '<section class="clinic-block clinic-tips-block"><h3>中考提示</h3>' +
        '<div class="clinic-tips">' + tipsHtml + "</div></section>";
    }
    $("playRoot").innerHTML = '<div class="play-shell">' + hud() +
      '<div class="clinic-card">' +
      '<div class="clinic-kicker">语法诊所</div>' +
      "<h2>" + esc(clinicLabel(g)) + "</h2>" +
      blocks +
      '<p class="note">接下来按顺序完成本语法点的引导题和练习题，看完解析再进入下一题。</p>' +
      '<button class="btn btn-indigo" id="clinicGo">开始练习</button> ' +
      '<button class="btn btn-ghost" id="clinicLobby">其他语法点</button>' +
      "</div></div>";
    $("clinicGo").onclick = function () {
      q.introSeen = true;
      renderGrammar();
    };
    $("clinicLobby").onclick = showGrammarLobby;
  }

  function clinicAskHtml(q) {
    var stem = String(q.q || "").trim();
    var html = '<div class="clinic-chip qtype">' + esc(q.qType || "练习") + "</div>";
    if (mostlyEnglish(stem)) {
      html += '<p class="clinic-ask">请根据下面的英文题干作答。</p>';
      html += '<div class="q-box clinic-stem">' + esc(stem) + "</div>";
    } else {
      html += '<div class="q-box">' + esc(stripBilingualLabel(stem)) + "</div>";
    }
    return html;
  }

  function renderGrammar() {
    var q = state.queue[state.idx];
    if (!q) return done();
    if (q.showIntro && !q.introSeen) return renderGrammarIntro(q);
    $("playRoot").innerHTML = '<div class="play-shell">' + hud() +
      clinicAskHtml(q) +
      '<div class="opts" id="opts"></div>' +
      '<div class="explain" id="explainBox" hidden></div>' +
      '<div class="mem-actions">' +
      '<button class="btn btn-indigo" type="button" id="clinicNext" hidden>下一题</button> ' +
      '<button class="btn btn-ghost" type="button" id="clinicLobby">其他语法点</button></div></div>';
    $("clinicLobby").onclick = showGrammarLobby;
    bindOpts(q, true);
  }

  function startSpin() {
    var mix = makeChoiceQs(true).concat(makeChoiceQs(false));
    state.queue = PETStudio.pickN(mix, levelCfg().count);
    state.spinDeg = 0;
    renderSpin();
  }

  function renderSpin() {
    $("playRoot").innerHTML = '<div class=play-shell>' + hud() +
      '<div class=wheel id=wheel></div>' +
      '<div style="text-align:center"><button class="btn btn-rose" id="spinBtn">转动转盘</button> ' +
      '<button class="btn btn-teal" id="aiBtn">DeepSeek 加题</button></div>' +
      '<div id=spinQ></div></div>';
    $("spinBtn").onclick = function () {
      state.spinDeg += 720 + Math.floor(Math.random() * 360);
      $("wheel").style.transform = "rotate(" + state.spinDeg + "deg)";
      setTimeout(function () {
        renderChoice();
      }, 900);
    };
    $("aiBtn").onclick = function () {
      var btn = $("aiBtn");
      btn.disabled = true;
      btn.textContent = "出题中…";
      PETStudio.aiExtra("mixed-mcq", state.bag.vocab.concat(state.bag.colloc), 4)
        .then(function (arr) {
          (arr || []).forEach(function (x) {
            state.queue.push({ q: x.q, prompt: x.explain || "AI 加题", options: x.options, answer: x.answer, speak: "" });
          });
          btn.textContent = "已加入 " + (arr || []).length + " 题";
        })
        .catch(function (e) {
          btn.disabled = false;
          btn.textContent = "加题失败，重试";
          alert(e.message || "DeepSeek 不可用");
        });
    };
  }

  function renderCurrent() {
    if (state.game.key === "memory") return renderMemory();
    if (state.game.key === "spell") return renderSpell();
    if (state.game.key === "gap") return renderGap();
    if (state.game.key === "grammar") return renderGrammar();
    if (state.game.key === "spin") {
      if (state.idx === 0 && !$("opts")) return renderSpin();
      return renderChoice();
    }
    renderChoice();
  }

  function startGame(key, level) {
    unbindSpellKeys();
    clearTimer();
    state.game = PETStudio.GAMES.filter(function (g) { return g.key === key; })[0];
    state.level = level || state.level;
    state.idx = 0;
    state.score = 0;
    state.lock = false;
    state.gapNote = "";
    if (!state.game) return;
    if (key === "memory") startMemory();
    else if (key === "picture") { state.queue = makeChoiceQs(true).filter(function (q) { return q.img; }); if (!state.queue.length) state.queue = makeChoiceQs(true); renderChoice(); }
    else if (key === "zh2en") { state.queue = makeChoiceQs(true); renderChoice(); }
    else if (key === "en2zh") { state.queue = makeChoiceQs(false); renderChoice(); }
    else if (key === "spell") startSpell();
    else if (key === "gap") showGapSetup();
    else if (key === "context") startContext();
    else if (key === "grammar") startGrammar();
    else if (key === "spin") startSpin();
  }

  function showList() {
    unbindSpellKeys();
    var g = PETStudio.GAMES.map(function (game) {
      return '<a class=card href="#" data-game="' + game.key + '">' +
        '<img src="' + esc(PETStudio.gameImg(game.id)) + '" alt="">' +
        '<div class=body><div class="tag ' + game.level + '">' + esc(game.tag) + " · " + esc(PETStudio.LEVELS[game.level].label) + "</div>" +
        "<h3>" + esc(game.name) + "</h3><p>" + esc(game.desc) + "</p></div></a>";
    }).join("");
    $("playRoot").innerHTML = '<div class=grid>' + g + "</div>";
    Array.prototype.forEach.call(document.querySelectorAll("[data-game]"), function (a) {
      a.onclick = function (e) {
        e.preventDefault();
        startGame(a.getAttribute("data-game"), ($("levelSel") && $("levelSel").value) || state.level);
      };
    });
  }

  var bound = false;

  function bind() {
    if (bound) return;
    bound = true;
    if ($("levelSel")) {
      $("levelSel").onchange = function () { state.level = this.value; };
    }
    if ($("printGamesBtn")) {
      $("printGamesBtn").onclick = function () {
        if (!state.bag) return;
        PETStudio.printGames(state.bag, ($("levelSel") && $("levelSel").value) || state.level);
      };
    }
    if ($("aiPaperBtn")) {
      $("aiPaperBtn").onclick = function () {
        if (!state.bag) return;
        var btn = $("aiPaperBtn");
        btn.disabled = true;
        PETStudio.aiExtra("worksheet", state.bag.vocab.concat(state.bag.colloc, state.bag.grammar), 8)
          .then(function (arr) {
            var w = window.open("", "_blank");
            if (!w) return;
            var body = (arr || []).map(function (x, i) {
              return "<div class=q><b>" + (i + 1) + ".</b> " + esc(x.q) + "<div class=opts>" +
                (x.options || []).map(function (o, j) { return "<div>" + String.fromCharCode(65 + j) + ". " + esc(o) + "</div>"; }).join("") +
                "</div><div class=note>答案：" + esc(x.answer) + " · " + esc(x.explain || "") + "</div></div>";
            }).join("");
            var css = new URL("css/print.css", location.href).href;
            w.document.write("<!DOCTYPE html><html><head><meta charset=utf-8><title>AI 加题</title><link rel=stylesheet href=\"" + css + "\"></head><body class=print-page>" +
              '<div class=screen-bar><button onclick=window.print()>导出 PDF</button></div><section class=sheet><div class=inner><h2>DeepSeek 加题卷</h2>' + body + "</div></section></body></html>");
            w.document.close();
          })
          .catch(function (e) {
            var pack = PETStudio.buildPaperQs(state.bag, ($("levelSel") && $("levelSel").value) || state.level);
            var arr = (pack.zh2en || []).slice(0, 8).map(function (x) {
              return { q: x.q, options: x.options, answer: x.answer, explain: "本单元词表（DeepSeek 暂不可用）" };
            });
            var w = window.open("", "_blank");
            if (!w) return;
            var body = arr.map(function (x, i) {
              return "<div class=q><b>" + (i + 1) + ".</b> " + esc(x.q) + "<div class=opts>" +
                (x.options || []).map(function (o, j) { return "<div>" + String.fromCharCode(65 + j) + ". " + esc(o) + "</div>"; }).join("") +
                "</div><div class=note>答案：" + esc(x.answer) + " · " + esc(x.explain || "") + "</div></div>";
            }).join("");
            var css = new URL("css/print.css", location.href).href;
            w.document.write("<!DOCTYPE html><html><head><meta charset=utf-8><title>加题卷</title><link rel=stylesheet href=\"" + css + "\"></head><body class=print-page>" +
              '<div class=screen-bar><button onclick=window.print()>导出 PDF</button></div><section class=sheet><div class=inner><h2>复习加题卷</h2><p class=note>' +
              esc(e.message || "DeepSeek 暂不可用") + "</p>" + body + "</div></section></body></html>");
            w.document.close();
          })
          .then(function () { btn.disabled = false; });
      };
    }
  }

  global.PETStudio.mountGames = function (bag) {
    state.bag = bag;
    bind();
    showList();
  };
  global.PETStudio.startGame = startGame;
})(window);
