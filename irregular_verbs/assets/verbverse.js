/**
 * Verb Atlas · 通用界面工具
 */
(function (global) {
  "use strict";

  if (global.document && !global.document.querySelector('link[rel~="icon"]')) {
    var favicon = global.document.createElement("link");
    favicon.rel = "icon";
    favicon.href =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
          '<rect width="64" height="64" rx="20" fill="#0a1f3b"/>' +
          '<text x="32" y="41" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="white">VA</text>' +
        "</svg>"
      );
    global.document.head.appendChild(favicon);
  }

  var toastTimer = null;
  var settlementEscapeHandler = null;
  var iconPaths = {
    arrowLeft: '<path d="m15 18-6-6 6-6"/><path d="M9 12h10"/>',
    arrowRight: '<path d="m9 18 6-6-6-6"/><path d="M15 12H5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    headphones: '<path d="M4 14a8 8 0 0 1 16 0"/><path d="M18 19v-5h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2ZM6 19v-5H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2Z"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    sparkles: '<path d="m12 3-1.2 3.2L8 7.5l2.8 1.3L12 12l1.2-3.2L16 7.5l-2.8-1.3L12 3Z"/><path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14Z"/><path d="m19 13-.6 1.4L17 15l1.4.6L19 17l.6-1.4L21 15l-1.4-.6L19 13Z"/>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8.5 8.5 0 0 1 0 12"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
  };

  function icon(name, className) {
    var path = iconPaths[name] || iconPaths.sparkles;
    return (
      '<svg class="' +
      (className || "vv-icon") +
      '" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      path +
      "</svg>"
    );
  }

  function ensureLiveRegion() {
    var region = document.getElementById("vvLiveRegion");
    if (region) return region;
    region = document.createElement("div");
    region.id = "vvLiveRegion";
    region.className = "sr-only";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    document.body.appendChild(region);
    return region;
  }

  function announce(message) {
    var region = ensureLiveRegion();
    region.textContent = "";
    global.setTimeout(function () {
      region.textContent = String(message || "");
    }, 30);
  }

  function ensureToast() {
    var node = document.getElementById("vvToast");
    if (node) return node;
    node = document.createElement("div");
    node.id = "vvToast";
    node.className = "vv-toast";
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
    node.setAttribute("aria-atomic", "true");
    document.body.appendChild(node);
    return node;
  }

  function toast(message, options) {
    options = options || {};
    var node = ensureToast();
    global.clearTimeout(toastTimer);
    node.className = "vv-toast tone-" + (options.tone || "default");
    node.innerHTML =
      '<span class="vv-toast-icon">' +
      icon(options.tone === "error" ? "x" : "check") +
      '</span><span class="vv-toast-copy"></span>';
    node.querySelector(".vv-toast-copy").textContent = String(message || "");
    global.requestAnimationFrame(function () {
      node.classList.add("is-visible");
    });
    announce(message);
    toastTimer = global.setTimeout(function () {
      node.classList.remove("is-visible");
    }, Math.max(1600, Number(options.duration) || 2600));
    return node;
  }

  function loadImage(img, source, options) {
    options = options || {};
    if (!img) return Promise.resolve(false);
    var placeholder = options.placeholder || null;
    var fallback = options.fallback || "";
    var attemptedFallback = false;

    img.classList.remove("is-loaded", "is-error");
    if (options.alt !== undefined) img.alt = options.alt;
    if (placeholder) placeholder.classList.remove("is-hidden");

    return new Promise(function (resolve) {
      function fail() {
        if (fallback && !attemptedFallback) {
          attemptedFallback = true;
          img.src = fallback;
          return;
        }
        img.classList.add("is-error");
        if (placeholder) placeholder.classList.remove("is-hidden");
        resolve(false);
      }
      img.onload = function () {
        img.classList.add("is-loaded");
        img.classList.remove("is-error");
        if (placeholder) placeholder.classList.add("is-hidden");
        resolve(true);
      };
      img.onerror = fail;
      if (!source) {
        fail();
        return;
      }
      img.src = source;
    });
  }

  function setButtonBusy(button, busy, labels) {
    if (!button) return;
    labels = labels || {};
    if (busy) {
      if (!button.dataset.originalHtml) button.dataset.originalHtml = button.innerHTML;
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.innerHTML =
        '<span class="vv-spinner" aria-hidden="true"></span><span>' +
        (labels.busy || "请稍候") +
        "</span>";
    } else {
      button.disabled = false;
      button.removeAttribute("aria-busy");
      if (labels.done) {
        button.innerHTML = icon("check") + "<span>" + labels.done + "</span>";
      } else if (button.dataset.originalHtml) {
        button.innerHTML = button.dataset.originalHtml;
      }
    }
  }

  function pulseButton(button, className, duration) {
    if (!button) return;
    var stateClass = className || "is-active";
    button.classList.remove(stateClass);
    global.requestAnimationFrame(function () {
      button.classList.add(stateClass);
    });
    global.setTimeout(function () {
      button.classList.remove(stateClass);
    }, Number(duration) || 700);
  }

  function closeSettlement() {
    var modal = document.getElementById("vvSettlement");
    if (!modal) return;
    if (settlementEscapeHandler) {
      document.removeEventListener("keydown", settlementEscapeHandler);
      settlementEscapeHandler = null;
    }
    modal.classList.remove("is-open");
    document.body.classList.remove("has-modal");
    global.setTimeout(function () {
      modal.remove();
    }, 240);
  }

  function showSettlement(options) {
    options = options || {};
    closeSettlement();
    var modal = document.createElement("div");
    modal.id = "vvSettlement";
    modal.className = "vv-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "vvSettlementTitle");
    modal.innerHTML =
      '<div class="vv-modal-backdrop" data-close="true"></div>' +
      '<div class="vv-modal-card">' +
      '<button class="icon-button vv-modal-close" type="button" aria-label="关闭">' +
      icon("x") +
      "</button>" +
      '<div class="vv-modal-orbit" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '<p class="eyebrow">ATLAS CHECKPOINT</p>' +
      '<h2 id="vvSettlementTitle"></h2>' +
      '<p class="vv-modal-message"></p>' +
      '<div class="vv-modal-metric"><strong></strong><span>本轮完成动词</span></div>' +
      '<div class="vv-modal-actions">' +
      '<button type="button" class="button button-secondary" data-action="restart">再看一遍</button>' +
      '<a class="button button-primary" data-action="games" href="games/index.html">进入 5 个游戏' +
      icon("arrowRight") +
      "</a>" +
      "</div></div>";
    modal.querySelector("h2").textContent = options.title || "完成一条时态轨道";
    modal.querySelector(".vv-modal-message").textContent =
      options.message || "声音、图意、三态和例句已经连成一张记忆地图。";
    modal.querySelector(".vv-modal-metric strong").textContent = String(options.count || 0);
    var gamesLink = modal.querySelector('[data-action="games"]');
    if (options.gamesHref) gamesLink.href = options.gamesHref;
    modal.querySelector(".vv-modal-close").addEventListener("click", closeSettlement);
    modal.querySelector('[data-close="true"]').addEventListener("click", closeSettlement);
    modal.querySelector('[data-action="restart"]').addEventListener("click", function () {
      closeSettlement();
      if (typeof options.onRestart === "function") options.onRestart();
    });
    settlementEscapeHandler = function (event) {
      if (event.key === "Escape" && document.getElementById("vvSettlement")) {
        closeSettlement();
      }
    };
    document.addEventListener("keydown", settlementEscapeHandler);
    document.body.appendChild(modal);
    document.body.classList.add("has-modal");
    global.requestAnimationFrame(function () {
      modal.classList.add("is-open");
      modal.querySelector(".vv-modal-close").focus();
    });
    announce(options.title || "学习完成");
    return modal;
  }

  function uniqueStrings(values) {
    var seen = {};
    return (Array.isArray(values) ? values : []).filter(function (value) {
      var text = String(value === undefined || value === null ? "" : value).trim();
      var key = text.toLocaleLowerCase("en");
      if (!text || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function buildCoverageRounds(source) {
    return shuffleLocal(Array.isArray(source) ? source.filter(Boolean) : []);
  }

  function shuffleLocal(arr) {
    var a = Array.isArray(arr) ? arr.slice() : [];
    for (var i = a.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

  function buildRounds(source, count) {
    var items = Array.isArray(source) ? source.filter(Boolean) : [];
    var target = Math.max(0, Number(count) || 0);
    var rounds = [];
    if (!items.length || !target) return rounds;
    while (rounds.length < target) {
      var batch = items.slice();
      for (var i = batch.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = batch[i];
        batch[i] = batch[j];
        batch[j] = temp;
      }
      if (
        rounds.length &&
        batch.length > 1 &&
        rounds[rounds.length - 1] === batch[0]
      ) {
        var swap = batch[0];
        batch[0] = batch[1];
        batch[1] = swap;
      }
      rounds = rounds.concat(batch);
    }
    return rounds.slice(0, target);
  }

  function getGameStore(gameId) {
    var util = global.IrregularVerbsUtil;
    var empty = { version: 1, attempts: [], sessions: [], updatedAt: null };
    if (!util || typeof util.loadProgress !== "function") return empty;
    var stored = util.loadProgress("game-" + gameId);
    if (!stored || typeof stored !== "object") return empty;
    if (!Array.isArray(stored.attempts)) stored.attempts = [];
    if (!Array.isArray(stored.sessions)) stored.sessions = [];
    return stored;
  }

  function recordGameAttempt(gameId, details) {
    var util = global.IrregularVerbsUtil;
    var entry = Object.assign(
      { gameId: gameId, recordedAt: new Date().toISOString() },
      details || {}
    );
    if (util && typeof util.recordAttempt === "function") {
      return util.recordAttempt(gameId, entry);
    }
    if (!util || typeof util.saveProgress !== "function") return null;
    var store = getGameStore(gameId);
    store.attempts.push(entry);
    store.attempts = store.attempts.slice(-80);
    store.updatedAt = entry.recordedAt;
    util.saveProgress("game-" + gameId, store);
    return entry;
  }

  function recordGameSession(gameId, details) {
    var util = global.IrregularVerbsUtil;
    var entry = Object.assign(
      { gameId: gameId, completedAt: new Date().toISOString() },
      details || {}
    );
    if (util && typeof util.recordSession === "function") {
      return util.recordSession(gameId, entry);
    }
    if (!util || typeof util.saveProgress !== "function") return null;
    var store = getGameStore(gameId);
    store.sessions.push(entry);
    store.sessions = store.sessions.slice(-24);
    store.bestScore = Math.max(Number(store.bestScore) || 0, Number(entry.score) || 0);
    store.updatedAt = entry.completedAt;
    util.saveProgress("game-" + gameId, store);
    return entry;
  }

  function showGameSettlement(options) {
    options = options || {};
    var host =
      options.host ||
      document.querySelector("[data-game-stage]") ||
      document.querySelector(".game-shell");
    if (!host) return null;
    var mistakes = Array.isArray(options.mistakes) ? options.mistakes : [];
    var total = Math.max(0, Number(options.total) || 0);
    var score = Math.max(0, Number(options.score) || 0);
    var percent = total ? Math.round((score / total) * 100) : 0;
    var listHtml = mistakes.length
      ? '<div class="result-review"><h3>本轮回看</h3><ul>' +
        mistakes
          .map(function (item) {
            if (typeof item === "string") {
              return "<li>" + escapeGameHtml(item) + "</li>";
            }
            var prompt = item && item.prompt ? item.prompt + "：" : "";
            var answer = item && item.answer ? item.answer : "";
            return (
              "<li><span>" +
              escapeGameHtml(prompt) +
              "</span><strong>" +
              escapeGameHtml(answer) +
              "</strong></li>"
            );
          })
          .join("") +
        "</ul></div>"
      : '<p class="result-perfect">轨道清晰，没有错题。</p>';
    host.innerHTML =
      '<section class="game-result" tabindex="-1" aria-labelledby="gameResultTitle">' +
      '<div class="result-orbit" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '<p class="eyebrow">ATLAS CHECKPOINT</p>' +
      '<h1 id="gameResultTitle">' +
      escapeGameHtml(options.title || "本轮完成") +
      "</h1>" +
      '<p class="result-lede">' +
      escapeGameHtml(options.message || "三条时态轨道已经连成一张更清晰的记忆地图。") +
      "</p>" +
      '<div class="result-metrics">' +
      '<div><strong>' +
      score +
      "/" +
      total +
      "</strong><span>本轮得分</span></div>" +
      '<div><strong>' +
      percent +
      "%</strong><span>正确率</span></div>" +
      '<div><strong>' +
      mistakes.length +
      "</strong><span>待回看</span></div>" +
      "</div>" +
      listHtml +
      '<div class="result-actions">' +
      '<button class="button button-secondary" type="button" data-result-restart>再玩一次</button>' +
      '<a class="button button-secondary" href="' +
      escapeGameAttribute(options.backHref || "index.html") +
      '">返回大厅</a>' +
      '<a class="button button-primary" href="' +
      escapeGameAttribute(options.nextHref || "index.html") +
      '">下一游戏' +
      icon("arrowRight") +
      "</a></div></section>";
    host.querySelector("[data-result-restart]").addEventListener("click", function () {
      if (typeof options.onRestart === "function") {
        options.onRestart();
      } else {
        global.location.reload();
      }
    });
    var result = host.querySelector(".game-result");
    result.focus();
    announce((options.title || "本轮完成") + "，得分 " + score + " / " + total);
    return result;
  }

  function escapeGameHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeGameAttribute(value) {
    return escapeGameHtml(value).replace(/`/g, "&#96;");
  }

  global.VerbVerse = {
    icon: icon,
    announce: announce,
    toast: toast,
    loadImage: loadImage,
    setButtonBusy: setButtonBusy,
    pulseButton: pulseButton,
    showSettlement: showSettlement,
    closeSettlement: closeSettlement,
    uniqueStrings: uniqueStrings,
    buildRounds: buildRounds,
    buildCoverageRounds: buildCoverageRounds,
    recordGameAttempt: recordGameAttempt,
    recordGameSession: recordGameSession,
    showGameSettlement: showGameSettlement,
  };
})(typeof window !== "undefined" ? window : this);
