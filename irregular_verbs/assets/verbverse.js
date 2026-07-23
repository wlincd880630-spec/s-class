/**
 * Verb Atlas · 通用界面工具
 */
(function (global) {
  "use strict";

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

  global.VerbVerse = {
    icon: icon,
    announce: announce,
    toast: toast,
    loadImage: loadImage,
    setButtonBusy: setButtonBusy,
    pulseButton: pulseButton,
    showSettlement: showSettlement,
    closeSettlement: closeSettlement,
  };
})(typeof window !== "undefined" ? window : this);
