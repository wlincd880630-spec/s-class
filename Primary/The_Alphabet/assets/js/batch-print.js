/**
 * 字母教材批量导出：按 A→Z 顺序合并或逐个保存 PDF。
 */
(function () {
  "use strict";

  var A = window.ALPHABET;
  var selected = {};
  var busy = false;
  var continueResolver = null;
  var reqSeq = 0;

  function $(id) { return document.getElementById(id); }

  function liveSet() {
    var set = {};
    (A.liveLetters ? A.liveLetters() : A.LETTERS.filter(function (ch) {
      return A.UNITS[ch] && A.UNITS[ch].live;
    })).forEach(function (ch) { set[ch] = true; });
    return set;
  }

  function selectedLetters() {
    return A.LETTERS.filter(function (ch) { return selected[ch]; });
  }

  function setStatus(text) {
    var el = $("batch-status");
    if (el) el.textContent = text;
  }

  function setProgress(cur, total) {
    var bar = $("batch-bar");
    if (!bar) return;
    var pct = total ? Math.round((cur / total) * 100) : 0;
    bar.style.width = pct + "%";
  }

  function chosenPack() {
    var el = document.querySelector('input[name="pack"]:checked');
    return el ? el.value : "book";
  }

  function chosenMode() {
    var el = document.querySelector('input[name="mode"]:checked');
    return el ? el.value : "merge";
  }

  function paintChips() {
    var box = $("batch-letters");
    if (!box) return;
    var live = liveSet();
    box.innerHTML = A.LETTERS.map(function (ch) {
      var on = selected[ch] ? " is-on" : "";
      var soon = live[ch] ? "" : " is-soon";
      var dis = live[ch] ? "" : " disabled";
      return '<button type="button" class="batch-chip' + on + soon + '" data-letter="' + ch + '"' + dis + '>' + ch + "</button>";
    }).join("");
    refreshSummary();
  }

  function refreshSummary() {
    var list = selectedLetters();
    if (!list.length) setStatus("尚未选择字母");
    else setStatus("已选 " + list.length + " 个：" + list.join(" "));
  }

  function applyPreset(name) {
    var live = liveSet();
    A.LETTERS.forEach(function (ch) { selected[ch] = false; });
    if (name === "all") {
      A.LETTERS.forEach(function (ch) { if (live[ch]) selected[ch] = true; });
    } else if (name === "none") {
      /* cleared */
    } else {
      name.split("").forEach(function (ch) {
        if (live[ch]) selected[ch] = true;
      });
    }
    paintChips();
  }

  function printHref(ch, pack) {
    var u = A.UNITS[ch];
    var base = A.printUrl(ch);
    if (!u || !u.live) return "";
    return base + "?pack=" + encodeURIComponent(pack || "book") + "&embed=1";
  }

  function waitMessage(iframe, type, reqId, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () {
        window.removeEventListener("message", onMsg);
        reject(new Error("等待 " + type + " 超时"));
      }, timeoutMs || 25000);
      function onMsg(e) {
        if (e.source !== iframe.contentWindow) return;
        var data = e.data;
        if (!data || data.source !== "alphabet-print" || data.type !== type) return;
        if (reqId && data.reqId && data.reqId !== reqId) return;
        clearTimeout(timer);
        window.removeEventListener("message", onMsg);
        resolve(data);
      }
      window.addEventListener("message", onMsg);
    });
  }

  function loadFrame(ch, pack) {
    var dock = $("frame-dock");
    var iframe = document.createElement("iframe");
    iframe.setAttribute("title", "装订 " + ch);
    iframe.src = printHref(ch, pack);
    dock.appendChild(iframe);
    return waitMessage(iframe, "ready", "", 25000).then(function () {
      return iframe;
    }, function (err) {
      if (iframe.contentWindow && iframe.contentWindow.AAPrint) return iframe;
      throw err;
    });
  }

  function styleAlreadyIn(href) {
    return Array.prototype.some.call(document.querySelectorAll("link[data-batch-style], link[rel='stylesheet']"), function (el) {
      return el.getAttribute("data-batch-style") === href || el.href === href;
    });
  }

  function ensureStyles(hrefs) {
    (hrefs || []).forEach(function (href) {
      if (!href || styleAlreadyIn(href)) return;
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-batch-style", href);
      document.head.appendChild(link);
    });
  }

  function harvest(iframe, pack) {
    var reqId = "h" + (++reqSeq);
    var pending = waitMessage(iframe, "harvest", reqId, 25000);
    iframe.contentWindow.postMessage({
      source: "alphabet-batch",
      type: "harvest",
      pack: pack,
      reqId: reqId
    }, "*");
    return pending;
  }

  function fitBatchSheets() {
    document.querySelectorAll("#batch-root .sheet-frame").forEach(function (frame) {
      var s = frame.querySelector(".sheet");
      if (!s) return;
      s.style.transform = "none";
      var scale = Math.min(1, frame.clientWidth / 794);
      s.style.transform = "scale(" + scale + ")";
      frame.style.height = (1123 * scale) + "px";
    });
  }

  function waitImages(root) {
    var imgs = Array.prototype.slice.call(root.querySelectorAll("img"));
    var fonts = document.fonts ? document.fonts.ready.catch(function () {}) : Promise.resolve();
    return Promise.race([
      Promise.all([fonts].concat(imgs.map(function (img) {
        if (img.complete && img.naturalWidth) return Promise.resolve();
        return new Promise(function (res) { img.onload = img.onerror = res; });
      }))),
      new Promise(function (res) { setTimeout(res, 4000); })
    ]);
  }

  function packLabel(pack) {
    if (pack === "games") return "纸质游戏";
    if (pack === "cards") return "教具卡";
    return "教材";
  }

  function printOnce(title) {
    var prev = document.title;
    document.title = title;
    return new Promise(function (resolve) {
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        window.removeEventListener("afterprint", finish);
        document.title = prev;
        resolve();
      }
      window.addEventListener("afterprint", finish);
      window.print();
      setTimeout(function () {
        if (!done) document.title = prev;
      }, 1500);
    });
  }

  function showContinue(label) {
    var btn = $("btn-continue");
    btn.textContent = label || "已保存，下一个";
    btn.classList.remove("hidden");
    return new Promise(function (resolve) {
      continueResolver = function () {
        btn.classList.add("hidden");
        continueResolver = null;
        resolve();
      };
    });
  }

  function exportMerged(letters, pack) {
    var root = $("batch-root");
    root.innerHTML = "";
    document.body.classList.add("is-batch-print");
    document.body.setAttribute("data-pack", pack);
    var chain = Promise.resolve();
    letters.forEach(function (ch, idx) {
      chain = chain.then(function () {
        setStatus("正在装订 " + A.UNITS[ch].pair + "（" + (idx + 1) + "/" + letters.length + "）…");
        setProgress(idx, letters.length);
        return loadFrame(ch, pack).then(function (iframe) {
          return harvest(iframe, pack).then(function (data) {
            iframe.remove();
            if (!data || !data.ok) throw new Error((data && data.error) || (ch + " 装订失败"));
            ensureStyles(data.styles);
            var section = document.createElement("section");
            section.className = "batch-letter pack is-on pack-" + pack;
            section.setAttribute("data-letter", ch);
            section.innerHTML = data.html;
            root.appendChild(section);
          });
        });
      });
    });
    return chain.then(function () {
      setStatus("已装订 " + letters.join(" ") + "，正在打开保存框…");
      setProgress(letters.length, letters.length);
      fitBatchSheets();
      return waitImages(root).then(function () {
        if (window.AAStave) window.AAStave.bindPrint(root);
        var title = "字母" + packLabel(pack) + "-" + letters.join("");
        return printOnce(title);
      });
    }).then(function () {
      setStatus("已导出合并 PDF：" + letters.join(" "));
    });
  }

  function exportEach(letters, pack) {
    var root = $("batch-root");
    root.innerHTML = "";
    var chain = Promise.resolve();
    letters.forEach(function (ch, idx) {
      chain = chain.then(function () {
        setStatus("正在生成 " + A.UNITS[ch].pair + "（" + (idx + 1) + "/" + letters.length + "）…");
        setProgress(idx, letters.length);
        return loadFrame(ch, pack).then(function (iframe) {
          return harvest(iframe, pack).then(function (data) {
            iframe.remove();
            if (!data || !data.ok) throw new Error((data && data.error) || (ch + " 生成失败"));
            ensureStyles(data.styles);
            root.innerHTML = "";
            var section = document.createElement("section");
            section.className = "batch-letter pack is-on pack-" + pack;
            section.setAttribute("data-letter", ch);
            section.innerHTML = data.html;
            root.appendChild(section);
            document.body.classList.add("is-batch-print");
            document.body.setAttribute("data-pack", pack);
            fitBatchSheets();
            return waitImages(root).then(function () {
              if (window.AAStave) window.AAStave.bindPrint(root);
              var title = "字母" + A.UNITS[ch].pair + "-" + packLabel(pack);
              setStatus("请保存 " + A.UNITS[ch].pair + "（" + (idx + 1) + "/" + letters.length + "）");
              var printed = printOnce(title);
              var next = showContinue(idx === letters.length - 1 ? "完成" : "已保存，下一个");
              return Promise.race([printed.then(function () {
                var btn = $("btn-continue");
                if (continueResolver) continueResolver();
                else btn.classList.add("hidden");
              }), next]);
            });
          });
        });
      });
    });
    return chain.then(function () {
      setProgress(letters.length, letters.length);
      setStatus("已按顺序导出 " + letters.join(" "));
    });
  }

  function startExport() {
    if (busy) return;
    var letters = selectedLetters();
    if (!letters.length) {
      setStatus("请先选择至少一个已上线的字母");
      return;
    }
    var pack = chosenPack();
    var mode = chosenMode();
    busy = true;
    $("btn-export").disabled = true;
    var run = mode === "each" ? exportEach(letters, pack) : exportMerged(letters, pack);
    run.catch(function (err) {
      console.error("[batch-print]", err);
      setStatus("导出失败：" + (err && err.message ? err.message : err));
    }).then(function () {
      busy = false;
      $("btn-export").disabled = false;
      $("btn-continue").classList.add("hidden");
    });
  }

  function init() {
    if (!A) return;
    applyPreset("ABCD");
    $("batch-letters").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-letter]");
      if (!btn || btn.disabled) return;
      var ch = btn.getAttribute("data-letter");
      selected[ch] = !selected[ch];
      paintChips();
    });
    document.querySelectorAll("[data-preset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyPreset(btn.getAttribute("data-preset"));
      });
    });
    $("btn-export").addEventListener("click", startExport);
    $("btn-continue").addEventListener("click", function () {
      if (continueResolver) continueResolver();
    });
    window.addEventListener("resize", fitBatchSheets);
    window.addEventListener("afterprint", fitBatchSheets);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
