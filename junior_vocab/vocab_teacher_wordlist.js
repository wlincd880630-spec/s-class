/**
 * 教师模式：单词列表 - 选择任意单词进行展示学习
 * 仅在教师模式下显示「单词列表」按钮，点击后弹出本单元全部单词，可选择跳转学习
 */
(function () {
  "use strict";

  function injectWordListUI() {
    var topbarBtns = document.querySelector(".topbar-btns");
    if (!topbarBtns) return;
    if (document.getElementById("wordlist-btn")) return;

    var style = document.createElement("style");
    style.textContent =
      ".wordlist-btn{display:none !important}" +
      ".topbar-btns:has(.teacher) .wordlist-btn{display:inline-flex !important}" +
      "#wordlist-modal{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9999;display:none;align-items:center;justify-content:center;padding:20px}" +
      "#wordlist-modal.show{display:flex}" +
      "#wordlist-modal .modal-box{background:var(--surface,#161829);border:1px solid var(--border,rgba(255,255,255,.07));border-radius:16px;max-width:420px;width:100%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.5)}" +
      "#wordlist-modal .modal-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border,rgba(255,255,255,.07))}" +
      "#wordlist-modal .modal-title{font-size:1.1rem;font-weight:800;color:var(--text,#e2e8f0)}" +
      "#wordlist-modal .modal-close{background:none;border:none;color:var(--sub,#94a3b8);cursor:pointer;font-size:1.3rem;padding:4px 8px;border-radius:8px}" +
      "#wordlist-modal .modal-close:hover{background:rgba(255,255,255,.08);color:var(--text)}" +
      "#wordlist-modal .modal-body{overflow-y:auto;padding:12px;display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start}" +
      "#wordlist-modal .word-chip{display:inline-block;padding:10px 16px;background:var(--surface2,#1e2137);border:1px solid var(--border,rgba(255,255,255,.07));border-radius:10px;color:var(--text,#e2e8f0);cursor:pointer;font-size:.9rem;font-weight:600;transition:all .2s}" +
      "#wordlist-modal .word-chip:hover{border-color:var(--primary,#7c6df0);background:rgba(124,109,240,.15);color:#c4b5fd}" +
      "#wordlist-modal .word-chip.current{border-color:var(--accent,#22d3c5);background:rgba(34,211,197,.12);color:var(--accent)}" +
      "#wordlist-modal .empty-msg{color:var(--sub,#94a3b8);padding:24px;text-align:center;width:100%}";
    document.head.appendChild(style);

    var btn = document.createElement("button");
    btn.className = "tb-btn wordlist-btn";
    btn.id = "wordlist-btn";
    btn.innerHTML = "📋 单词列表";
    btn.title = "教师模式：选择任意单词进行展示学习";
    btn.onclick = showWordListModal;

    var adminBtn = document.getElementById("admin-btn");
    if (adminBtn) {
      topbarBtns.insertBefore(btn, adminBtn);
    } else {
      topbarBtns.appendChild(btn);
    }

    var modal = document.createElement("div");
    modal.id = "wordlist-modal";
    modal.innerHTML =
      '<div class="modal-box">' +
      '<div class="modal-header"><span class="modal-title">选择单词</span><button class="modal-close" type="button" aria-label="关闭">&times;</button></div>' +
      '<div class="modal-body" id="wordlist-body"></div>' +
      "</div>";
    modal.querySelector(".modal-close").onclick = closeWordListModal;
    modal.onclick = function (e) {
      if (e.target === modal) closeWordListModal();
    };
    document.body.appendChild(modal);
  }

  function showWordListModal() {
    var words = typeof allWords !== "undefined" && allWords && allWords.length ? allWords : [];
    var currentIdx = typeof wordIndex !== "undefined" ? wordIndex : 0;
    var body = document.getElementById("wordlist-body");
    var modal = document.getElementById("wordlist-modal");
    if (!body || !modal) return;

    if (words.length === 0) {
      body.innerHTML = '<p class="empty-msg">请先选择单元开始学习</p>';
    } else {
      body.innerHTML = "";
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        var chip = document.createElement("span");
        chip.className = "word-chip" + (i === currentIdx ? " current" : "");
        chip.textContent = (i + 1) + ". " + (w.word || "");
        chip.dataset.index = String(i);
        chip.onclick = (function (idx) {
          return function () {
            if (typeof wordIndex !== "undefined") wordIndex = idx;
            if (typeof showCurrentWord === "function") showCurrentWord();
            if (typeof showPage === "function") showPage("p1-pronounce");
            if (typeof saveProgress === "function") saveProgress();
            closeWordListModal();
          };
        })(i);
        body.appendChild(chip);
      }
    }
    modal.classList.add("show");
  }

  function closeWordListModal() {
    var modal = document.getElementById("wordlist-modal");
    if (modal) modal.classList.remove("show");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectWordListUI);
  } else {
    injectWordListUI();
  }
})();
