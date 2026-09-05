/**
 * 教具工坊共用：导出说明、打印前降载、批量导出桥接。
 */
(function () {
  "use strict";

  var MSG_SOURCE = "alphabet-print";

  function inFrame() {
    try { return window !== window.top; } catch (err) { return true; }
  }

  function queryParams() {
    var out = {};
    var raw = (location.search || "").replace(/^\?/, "");
    if (!raw) return out;
    raw.split("&").forEach(function (part) {
      if (!part) return;
      var kv = part.split("=");
      var k = decodeURIComponent(kv[0] || "").trim();
      var v = decodeURIComponent((kv.slice(1).join("=") || "").replace(/\+/g, " "));
      if (k) out[k] = v;
    });
    return out;
  }

  function batchHref() {
    return new URL("../batch-print.html", location.href).href;
  }

  function injectHints() {
    document.querySelectorAll(".pack-intro").forEach(function (sec) {
      if (sec.querySelector(".hint-print")) return;
      if (!sec.querySelector("[data-export]")) return;
      var p = document.createElement("p");
      p.className = "hint-print";
      p.innerHTML =
        "点导出后会打开系统打印框，目标请选「另存为 PDF」。" +
        "中文已改为系统黑体/雅黑，避免把站酷快乐体按 CID 编码嵌进 PDF（那会让打印机非常慢）。" +
        ' 多个字母请用 <a href="' + batchHref() + '">批量导出</a>。';
      sec.appendChild(p);
    });
  }

  function bindTopbarPill() {
    document.querySelectorAll(".topbar .pill").forEach(function (pill) {
      if (pill.getAttribute("data-export-pill") === "1") return;
      if (!/PDF|打印|导出/.test(pill.textContent || "")) return;
      pill.setAttribute("data-export-pill", "1");
      pill.setAttribute("role", "button");
      pill.tabIndex = 0;
      function go() {
        var pack = document.body.getAttribute("data-pack") || "book";
        if (window.AAPrint && typeof window.AAPrint.exportPack === "function") {
          window.AAPrint.exportPack(pack);
        } else {
          window.print();
        }
      }
      pill.addEventListener("click", go);
      pill.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
    });
  }

  function activePackRoot() {
    return document.querySelector(".pack.is-on") || document.getElementById("print-root");
  }

  function preparePrint() {
    document.documentElement.classList.add("is-print-export");
    document.body.classList.add("is-print-export");
    if (!window.AAStave) return;
    window.AAStave.setPrintMode(true);
    var root = activePackRoot();
    if (root && typeof window.AAStave.paintAllNow === "function") {
      window.AAStave.paintAllNow(root);
    } else if (root) {
      window.AAStave.bindPrint(root);
    }
  }

  function finishPrint() {
    document.documentElement.classList.remove("is-print-export");
    document.body.classList.remove("is-print-export");
    if (!window.AAStave) return;
    window.AAStave.setPrintMode(false);
    var root = activePackRoot();
    if (root) window.AAStave.bindPrint(root);
  }

  function waitAssets(packId) {
    var sel = packId ? ".pack-" + packId + " img" : "#print-root img, .pack.is-on img";
    var fonts = document.fonts ? document.fonts.ready.catch(function () {}) : Promise.resolve();
    var imgs = Array.prototype.slice.call(document.querySelectorAll(sel));
    var imgWait = Promise.all(imgs.map(function (img) {
      if (img.complete && img.naturalWidth) return Promise.resolve();
      return new Promise(function (res) {
        img.onload = img.onerror = res;
      });
    }));
    var ready = Promise.all([fonts, imgWait]);
    return Promise.race([
      ready,
      new Promise(function (res) { setTimeout(res, 4000); })
    ]);
  }

  function availablePacks() {
    return Array.prototype.slice.call(document.querySelectorAll("[data-export]"))
      .map(function (btn) { return btn.getAttribute("data-export"); })
      .filter(Boolean);
  }

  function pageMeta() {
    return {
      source: MSG_SOURCE,
      type: "ready",
      title: document.title || "",
      href: location.href,
      pack: document.body.getAttribute("data-pack") || "book",
      packs: availablePacks()
    };
  }

  function announceReady() {
    if (!inFrame()) return;
    try {
      window.parent.postMessage(pageMeta(), "*");
    } catch (err) {}
  }

  function flattenCanvases(root) {
    if (!root) return 0;
    var n = 0;
    Array.prototype.slice.call(root.querySelectorAll("canvas")).forEach(function (cv) {
      try {
        if (!cv.width || !cv.height) return;
        var img = document.createElement("img");
        img.className = cv.className;
        img.setAttribute("aria-hidden", "true");
        img.alt = "";
        img.src = cv.toDataURL("image/png");
        var style = cv.getAttribute("style") || "";
        img.setAttribute("style", style);
        if (cv.parentNode) cv.parentNode.replaceChild(img, cv);
        n += 1;
      } catch (err) {}
    });
    return n;
  }

  function harvestPack(packId) {
    var id = packId || document.body.getAttribute("data-pack") || "book";
    if (window.AAPrint && typeof window.AAPrint.showPack === "function") {
      window.AAPrint.showPack(id);
    }
    var pack = document.getElementById("pack-" + id) || document.querySelector(".pack-" + id);
    if (!pack) return { ok: false, error: "missing pack " + id };
    if (window.AAStave) {
      window.AAStave.setPrintMode(true);
      if (typeof window.AAStave.paintAllNow === "function") window.AAStave.paintAllNow(pack);
    }
    flattenCanvases(pack);
    var sheets = pack.querySelectorAll(".sheet-frame, .sheet");
    var styles = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(function (link) { return link.href; })
      .filter(Boolean);
    return {
      ok: true,
      pack: id,
      html: pack.innerHTML,
      sheetCount: sheets.length,
      styles: styles,
      title: document.title || ""
    };
  }

  function onMessage(e) {
    var data = e && e.data;
    if (!data || data.source !== "alphabet-batch") return;
    var pack = data.pack || "book";
    if (data.type === "show" && window.AAPrint) {
      window.AAPrint.showPack(pack);
      return;
    }
    if (data.type === "export" && window.AAPrint) {
      window.AAPrint.exportPack(pack);
      return;
    }
    if (data.type === "harvest") {
      waitAssets(pack).then(function () {
        var result = harvestPack(pack);
        result.source = MSG_SOURCE;
        result.type = "harvest";
        result.reqId = data.reqId || "";
        try { e.source.postMessage(result, "*"); } catch (err) {}
      });
    }
  }

  function applyQuery() {
    var q = queryParams();
    var pack = q.pack || q.autoprint;
    if (pack && window.AAPrint && typeof window.AAPrint.showPack === "function") {
      window.AAPrint.showPack(pack);
    }
    if (q.autoprint && !inFrame() && window.AAPrint && typeof window.AAPrint.exportPack === "function") {
      waitAssets(q.autoprint).then(function () {
        window.AAPrint.exportPack(q.autoprint);
      });
    }
  }

  function boot() {
    injectHints();
    bindTopbarPill();
    window.addEventListener("beforeprint", preparePrint);
    window.addEventListener("afterprint", finishPrint);
    window.addEventListener("message", onMessage);
    applyQuery();
    setTimeout(announceReady, 80);
  }

  window.AlphabetPrint = {
    waitAssets: waitAssets,
    preparePrint: preparePrint,
    finishPrint: finishPrint,
    harvestPack: harvestPack,
    flattenCanvases: flattenCanvases
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
