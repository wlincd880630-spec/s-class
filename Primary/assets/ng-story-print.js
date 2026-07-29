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

  function storyImgSrc(mediaCos, index, cfg) {
    var n = index + 1;
    var z = n < 10 ? "0" : "";
    if (cfg && typeof cfg.getStoryImage === "function") {
      return cfg.getStoryImage(index, n);
    }
    var ext = (cfg && cfg.imageExt) || "png";
    if (ext.charAt(0) === ".") ext = ext.slice(1);
    return mediaCos + "images/story/" + z + n + "." + ext;
  }

  function polaroidHtml(src, emoji) {
    return (
      '<div class="story-polaroid">' +
      '<img src="' + esc(src) + '" alt="" crossorigin="anonymous" ' +
      'onerror="this.classList.add(\'is-hide\')">' +
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
    var imgSrc = storyImgSrc(cfg.mediaCos, index, cfg);
    return (
      '<section class="story-print-sheet">' +
      '<div class="story-print-inner">' +
      '<header class="story-page-hdr">' +
      '<span class="book-name">' + esc(cfg.title) + "</span>" +
      '<span class="page-num">' + esc(pageLabel) + "</span>" +
      "</header>" +
      '<div class="story-art-wrap">' +
      polaroidHtml(imgSrc, cfg.emoji) +
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
      var imgSrc = storyImgSrc(cfg.mediaCos, idx, cfg);
      blocks +=
        '<div class="story-block">' +
        '<div class="story-art-wrap">' +
        polaroidHtml(imgSrc, cfg.emoji) +
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

  function preloadImages(root) {
    return new Promise(function (resolve) {
      var imgs = root ? [].slice.call(root.querySelectorAll("img")) : [];
      if (!imgs.length) {
        resolve();
        return;
      }
      var n = 0;
      function done() {
        if (++n >= imgs.length) resolve();
      }
      imgs.forEach(function (img) {
        if (img.complete) done();
        else {
          img.onload = done;
          img.onerror = done;
        }
      });
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
    }

    var btnGen = document.getElementById("btnStoryGen");
    var btnPrint = document.getElementById("btnStoryPrint");
    var btnPdf = document.getElementById("btnStoryPdf");

    if (btnGen) btnGen.onclick = render;

    if (btnPrint) {
      btnPrint.onclick = function () {
        render();
        preloadImages(area).then(function () {
          setTimeout(function () { global.print(); }, 200);
        });
      };
    }

    if (btnPdf) {
      btnPdf.onclick = function () {
        var old = btnPdf.textContent;
        btnPdf.disabled = true;
        btnPdf.textContent = "生成中…";
        render();
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
              image: { type: "jpeg", quality: 0.96 },
              html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                letterRendering: true,
                scrollX: 0,
                scrollY: 0,
                width: A4_WIDTH_CSS_PX,
                windowWidth: A4_WIDTH_CSS_PX,
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
  };
})(typeof window !== "undefined" ? window : this);
