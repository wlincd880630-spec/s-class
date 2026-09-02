/**
 * 国家地理分级阅读 · 课文 PDF / 打印
 * 用法：NgStoryPrint.init({ title, mediaCos, story, emoji, accent, wild, filename })
 */
(function (global) {
  "use strict";

  var A4_WIDTH_CSS_PX = Math.ceil((210 / 25.4) * 96);

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function joinUrl(base, rel) {
    if (!base) return rel;
    return String(base).replace(/\/?$/, "/") + rel;
  }

  function storyImgRel(index, cfg) {
    var n = index + 1;
    var z = n < 10 ? "0" : "";
    var ext = (cfg && cfg.imageExt) || "png";
    if (ext.charAt(0) === ".") ext = ext.slice(1);
    return "images/story/" + z + n + "." + ext;
  }

  /**
   * 企鹅/蝴蝶课文图在 www.s-class.top 同源相对路径，COS 上没有编号图。
   * Play Kitty 等课相反：站点相对路径 404，COS 上有图。
   * 按「相对路径 → mediaCos → 本地调试镜像」依次回退。
   */
  function storyImgCandidates(mediaCos, index, cfg) {
    if (cfg && typeof cfg.getStoryImage === "function") {
      var custom = cfg.getStoryImage(index, index + 1);
      return custom ? [custom] : [];
    }
    var rel = storyImgRel(index, cfg);
    var list = [];
    function add(u) {
      if (u && list.indexOf(u) < 0) list.push(u);
    }
    add(rel);
    add(joinUrl(mediaCos, rel));
    var h = ((global.location && location.hostname) || "").toLowerCase();
    if (h === "localhost" || h === "127.0.0.1") {
      var dir = ((location.pathname || "/") + "").replace(/[^/]+$/, "");
      add("https://www.s-class.top" + dir + rel);
    }
    return list;
  }

  function imgError(img) {
    if (!img) return;
    var rest = (img.getAttribute("data-fallbacks") || "").split("|").filter(Boolean);
    if (rest.length) {
      img.setAttribute("data-fallbacks", rest.slice(1).join("|"));
      img.removeAttribute("crossorigin");
      img.src = rest[0];
      return;
    }
    img.classList.add("is-hide");
  }

  function polaroidHtml(candidates, emoji) {
    var src = (candidates && candidates[0]) || "";
    var rest = candidates && candidates.length > 1 ? candidates.slice(1).join("|") : "";
    return (
      '<div class="story-polaroid">' +
      '<img src="' + esc(src) + '" alt=""' +
      (rest ? ' data-fallbacks="' + esc(rest) + '"' : "") +
      ' onerror="window.NgStoryPrint&&NgStoryPrint.imgError(this)">' +
      '<div class="art-fallback" aria-hidden="true">' + emoji + "</div>" +
      "</div>"
    );
  }

  function textBlockHtml(row, index, showZh) {
    var zhCls = showZh ? "story-zh" : "story-zh is-hidden";
    return (
      '<div class="story-text-block">' +
      '<span class="story-num-badge">#' + (index + 1) + "</span>" +
      '<p class="story-en">' + esc(row.en) + "</p>" +
      '<div class="story-divider"></div>' +
      '<p class="' + zhCls + '">' + esc(row.zh) + "</p>" +
      "</div>"
    );
  }

  function coverHtml(cfg) {
    var count = cfg.story.length;
    return (
      '<section class="story-print-sheet story-print-cover">' +
      '<div class="cover-frame" aria-hidden="true"></div>' +
      '<div class="story-print-inner">' +
      '<span class="ng-mark" aria-hidden="true"></span>' +
      '<p class="cover-tag">National Geographic · Level 1</p>' +
      "<h2>" + esc(cfg.title) + "</h2>" +
      '<p class="cover-sub">课文阅读 · 双语对照</p>' +
      '<p class="cover-desc">' +
      esc(cfg.subtitle || "国家地理分级阅读") +
      " · 共 " + count + " 句 · 配图 + 英文 + 中文翻译</p>" +
      '<div class="cover-meta">' +
      "<span>📖 " + count + " 页课文</span>" +
      "<span>🌏 EN + 中文</span>" +
      "</div></div></section>"
    );
  }

  function singlePageHtml(cfg, row, index, pageLabel) {
    var imgs = storyImgCandidates(cfg.mediaCos, index, cfg);
    return (
      '<section class="story-print-sheet">' +
      '<div class="story-print-inner">' +
      '<header class="story-page-hdr">' +
      '<span class="book-name">' + esc(cfg.title) + "</span>" +
      '<span class="page-num">' + esc(pageLabel) + "</span>" +
      "</header>" +
      '<div class="story-art-wrap">' +
      polaroidHtml(imgs, cfg.emoji) +
      "</div>" +
      textBlockHtml(row, index, cfg.showZh !== false) +
      '<footer class="story-page-footer">National Geographic Style · ' +
      esc(cfg.title) +
      "</footer></div></section>"
    );
  }

  function doublePageHtml(cfg, rows, indices, pageLabel) {
    var blocks = "";
    for (var i = 0; i < rows.length; i++) {
      var idx = indices[i];
      var imgs = storyImgCandidates(cfg.mediaCos, idx, cfg);
      blocks +=
        '<div class="story-block">' +
        '<div class="story-art-wrap">' +
        polaroidHtml(imgs, cfg.emoji) +
        "</div>" +
        textBlockHtml(rows[i], idx, cfg.showZh !== false) +
        "</div>";
    }
    return (
      '<section class="story-print-sheet story-print-sheet--double">' +
      '<div class="story-print-inner">' +
      '<header class="story-page-hdr">' +
      '<span class="book-name">' + esc(cfg.title) + "</span>" +
      '<span class="page-num">' + esc(pageLabel) + "</span>" +
      "</header>" +
      '<div class="story-double-grid">' +
      blocks +
      "</div>" +
      '<footer class="story-page-footer">National Geographic Style · ' +
      esc(cfg.title) +
      "</footer></div></section>"
    );
  }

  function buildAll(cfg) {
    var html = coverHtml(cfg);
    var story = cfg.story || [];
    var perPage = cfg.perPage === 2 ? 2 : 1;
    var contentPage = 0;

    if (perPage === 1) {
      story.forEach(function (row, i) {
        contentPage++;
        html += singlePageHtml(cfg, row, i, "第 " + contentPage + " 页");
      });
    } else {
      for (var i = 0; i < story.length; i += 2) {
        contentPage++;
        var chunk = story.slice(i, i + 2);
        var idxs = chunk.map(function (_, j) { return i + j; });
        html += doublePageHtml(cfg, chunk, idxs, "第 " + contentPage + " 页");
      }
    }
    return html;
  }

  function waitForImg(img) {
    return new Promise(function (resolve) {
      var tries = 0;
      function check() {
        if (img.classList.contains("is-hide")) return resolve();
        if (img.complete && img.naturalWidth > 0) return resolve();
        tries += 1;
        if (tries > 100) return resolve();
        setTimeout(check, 100);
      }
      check();
    });
  }

  function preloadImages(root) {
    var imgs = root ? [].slice.call(root.querySelectorAll(".story-polaroid img")) : [];
    if (!imgs.length) return Promise.resolve();
    return Promise.all(imgs.map(waitForImg));
  }

  function clearPreviewScale(area) {
    if (!area) return;
    [].forEach.call(area.querySelectorAll(".story-print-sheet"), function (el) {
      el.style.transform = "";
      el.style.marginBottom = "";
    });
  }

  function fitPreview(area) {
    if (!area || document.body.classList.contains("is-exporting")) return;
    var sheets = area.querySelectorAll(".story-print-sheet");
    if (!sheets.length) return;
    var avail = area.clientWidth || 0;
    if (avail < 40) return;
    var raw = sheets[0].offsetWidth;
    if (raw < 40) return;
    var scale = Math.min(1, avail / raw);
    var gap = 16;
    [].forEach.call(sheets, function (el) {
      el.style.transformOrigin = "top left";
      if (scale >= 0.995) {
        el.style.transform = "";
        el.style.marginBottom = "";
      } else {
        el.style.transform = "scale(" + scale + ")";
        el.style.marginBottom = Math.round(el.offsetHeight * (scale - 1) + gap) + "px";
      }
    });
  }

  var _pdfLibsPromise = null;
  function loadPdfLibs() {
    if (global.html2pdf) return Promise.resolve();
    if (_pdfLibsPromise) return _pdfLibsPromise;
    _pdfLibsPromise = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      s.crossOrigin = "anonymous";
      s.onload = function () {
        if (global.html2pdf) resolve();
        else reject(new Error("PDF 库加载不完整"));
      };
      s.onerror = function () {
        reject(new Error("PDF 库加载失败"));
      };
      document.head.appendChild(s);
    });
    return _pdfLibsPromise;
  }

  function applyAccent(cfg) {
    if (cfg.accent) {
      document.documentElement.style.setProperty("--accent", cfg.accent);
    }
    if (cfg.wild) {
      document.documentElement.style.setProperty("--wild", cfg.wild);
    }
  }

  function init(cfg) {
    if (!cfg || !cfg.story || !cfg.story.length) return;
    applyAccent(cfg);

    var area = document.getElementById("storyPrintArea");
    if (!area) return;

    function render() {
      var perPageEl = document.getElementById("optPerPage");
      var showZhEl = document.getElementById("optShowZh");
      cfg.perPage = perPageEl && perPageEl.value === "2" ? 2 : 1;
      cfg.showZh = !showZhEl || showZhEl.checked;
      area.innerHTML = buildAll(cfg);
      requestAnimationFrame(function () { fitPreview(area); });
    }

    var btnGen = document.getElementById("btnStoryGen");
    var btnPrint = document.getElementById("btnStoryPrint");
    var btnPdf = document.getElementById("btnStoryPdf");

    if (btnGen) btnGen.onclick = render;

    if (btnPrint) {
      btnPrint.onclick = function () {
        render();
        clearPreviewScale(area);
        document.body.classList.add("is-exporting");
        area.classList.add("is-exporting");
        preloadImages(area).then(function () {
          setTimeout(function () { global.print(); }, 200);
        });
      };
    }

    if (typeof global.addEventListener === "function") {
      global.addEventListener("afterprint", function () {
        document.body.classList.remove("is-exporting");
        area.classList.remove("is-exporting");
        fitPreview(area);
      });
      global.addEventListener("resize", function () { fitPreview(area); });
    }

    if (btnPdf) {
      btnPdf.onclick = function () {
        var old = btnPdf.textContent;
        btnPdf.disabled = true;
        btnPdf.textContent = "生成中…";
        render();
        clearPreviewScale(area);
        document.body.classList.add("is-exporting");
        area.classList.add("is-exporting");
        loadPdfLibs()
          .then(function () { return preloadImages(area); })
          .then(function () {
            return global.document.fonts
              ? global.document.fonts.ready.catch(function () {})
              : Promise.resolve();
          })
          .then(function () {
            var opt = {
              margin: [0, 0, 0, 0],
              filename: cfg.filename || "story.pdf",
              image: { type: "jpeg", quality: 0.92 },
              html2canvas: {
                scale: 1.5,
                useCORS: true,
                allowTaint: true,
                letterRendering: true,
                scrollX: 0,
                scrollY: 0,
                width: A4_WIDTH_CSS_PX,
                windowWidth: 1024,
                onclone: function (doc) {
                  var b = doc.body;
                  if (b) b.classList.add("is-exporting");
                  var a = doc.getElementById("storyPrintArea");
                  if (!a) return;
                  a.classList.add("is-exporting");
                  [].forEach.call(a.querySelectorAll(".story-print-sheet"), function (el) {
                    el.style.transform = "none";
                    el.style.marginBottom = "0";
                  });
                },
              },
              jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
              pagebreak: { mode: ["legacy"] },
            };
            return global.html2pdf().set(opt).from(area).save();
          })
          .catch(function (err) {
            alert("PDF 导出失败，请改用「打印 / 另存 PDF」。\n" + (err && err.message ? err.message : ""));
          })
          .finally(function () {
            document.body.classList.remove("is-exporting");
            area.classList.remove("is-exporting");
            fitPreview(area);
            btnPdf.disabled = false;
            btnPdf.textContent = old;
          });
      };
    }

    var perPageEl = document.getElementById("optPerPage");
    var showZhEl = document.getElementById("optShowZh");
    if (perPageEl) perPageEl.onchange = render;
    if (showZhEl) showZhEl.onchange = render;

    render();
  }

  global.NgStoryPrint = {
    init: init,
    buildAll: buildAll,
    preloadImages: preloadImages,
    imgError: imgError,
  };
})(typeof window !== "undefined" ? window : this);
