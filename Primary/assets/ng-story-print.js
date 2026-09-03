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
    if (img.hasAttribute("crossorigin") && img.getAttribute("data-cors-fallback") !== "1") {
      img.setAttribute("data-cors-fallback", "1");
      var retrySrc = img.src;
      img.removeAttribute("crossorigin");
      img.src = "";
      img.src = retrySrc;
      return;
    }
    var rest = (img.getAttribute("data-fallbacks") || "").split("|").filter(Boolean);
    if (rest.length) {
      img.removeAttribute("data-cors-fallback");
      img.setAttribute("data-fallbacks", rest.slice(1).join("|"));
      img.setAttribute("crossorigin", "anonymous");
      img.src = rest[0];
      return;
    }
    img.classList.add("is-hide");
  }

  function publicOrigin() {
    var loc = global.location;
    var h = ((loc && loc.hostname) || "").toLowerCase();
    if (loc && loc.protocol === "https:" && h && h !== "localhost" && h !== "127.0.0.1") {
      return loc.origin;
    }
    return "https://www.s-class.top";
  }

  function coursewareIndexPath() {
    var path = "";
    try {
      path = String((global.location && location.pathname) || "");
    } catch (e1) {}
    if (!path) return "/index.html";
    return path.replace(/[^/]+$/, "index.html");
  }

  /** 微信可打开的学课文地址。i 从 1 起，对应 PDF 第 i 句。 */
  function storyLearnUrl(cfg, index1) {
    var explicit = cfg && cfg.learnUrl;
    if (explicit) {
      var base = String(explicit);
      var join = base.indexOf("?") >= 0 ? "&" : "?";
      return base + join + "view=story&i=" + index1;
    }
    return publicOrigin() + coursewareIndexPath() + "?view=story&i=" + index1;
  }

  function qrHtml(url, extraClass, caption) {
    return (
      '<div class="story-qr' + (extraClass ? " " + extraClass : "") +
      '" data-qr-url="' + esc(url) + '">' +
      '<img alt="扫码学课文" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">' +
      '<span class="story-qr-cap">' + esc(caption || "扫码学课文") + "</span>" +
      "</div>"
    );
  }

  var _qrLibPromise = null;
  function loadScriptTag(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error("script load failed: " + src)); };
      document.head.appendChild(s);
    });
  }

  function qrScriptCandidates() {
    var dir = "";
    try {
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src || "";
        var m = src.match(/^(.*)ng-story-print\.js(?:\?.*)?$/);
        if (m) {
          dir = m[1];
          break;
        }
      }
    } catch (e1) {}
    return [
      dir ? dir + "vendor/qrcode.min.js" : "",
      "../../assets/vendor/qrcode.min.js",
      "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js",
    ].filter(Boolean);
  }

  function loadQrLib() {
    if (global.QRCode && typeof global.QRCode.toDataURL === "function") {
      return Promise.resolve();
    }
    if (_qrLibPromise) return _qrLibPromise;
    var sources = qrScriptCandidates();
    _qrLibPromise = (function next(i) {
      if (i >= sources.length) {
        _qrLibPromise = null;
        return Promise.reject(new Error("QR 库加载失败"));
      }
      if (global.QRCode && typeof global.QRCode.toDataURL === "function") {
        return Promise.resolve();
      }
      return loadScriptTag(sources[i])
        .then(function () {
          if (global.QRCode && typeof global.QRCode.toDataURL === "function") return;
          return next(i + 1);
        })
        .catch(function () { return next(i + 1); });
    })(0);
    return _qrLibPromise;
  }

  var _qrCache = {};
  function qrDataUrl(url) {
    if (!url) return Promise.resolve("");
    if (_qrCache[url]) return Promise.resolve(_qrCache[url]);
    return loadQrLib().then(function () {
      return global.QRCode.toDataURL(url, {
        width: 240,
        margin: 2,
        color: { dark: "#1a1a1a", light: "#ffffff" },
        errorCorrectionLevel: "M",
      });
    }).then(function (data) {
      _qrCache[url] = data;
      return data;
    });
  }

  function fillQrCodes(root) {
    var nodes = root ? [].slice.call(root.querySelectorAll(".story-qr[data-qr-url]")) : [];
    if (!nodes.length) return Promise.resolve();
    return loadQrLib().then(function () {
      return Promise.all(nodes.map(function (el) {
        var url = el.getAttribute("data-qr-url") || "";
        var img = el.querySelector("img");
        if (!url || !img) return Promise.resolve();
        return qrDataUrl(url).then(function (data) {
          if (data) img.src = data;
        }).catch(function () {
          el.classList.add("is-hide");
        });
      }));
    }).catch(function () {
      nodes.forEach(function (el) { el.classList.add("is-hide"); });
    });
  }

  function polaroidHtml(candidates, emoji) {
    var src = (candidates && candidates[0]) || "";
    var rest = candidates && candidates.length > 1 ? candidates.slice(1).join("|") : "";
    return (
      '<div class="story-polaroid">' +
      '<img src="' + esc(src) + '" alt="" crossorigin="anonymous"' +
      (rest ? ' data-fallbacks="' + esc(rest) + '"' : "") +
      ' onerror="window.NgStoryPrint&&NgStoryPrint.imgError(this)">' +
      '<div class="art-fallback" aria-hidden="true">' + emoji + "</div>" +
      "</div>"
    );
  }

  function coverHeroHtml(cfg) {
    var candidates = storyImgCandidates(cfg.mediaCos, 0, cfg);
    var src = (candidates && candidates[0]) || "";
    var rest = candidates && candidates.length > 1 ? candidates.slice(1).join("|") : "";
    var emoji = esc(cfg.emoji || "📖");
    return (
      '<div class="cover-hero" aria-hidden="true">' +
      '<img class="cover-hero-img" src="' + esc(src) + '" alt="" crossorigin="anonymous"' +
      (rest ? ' data-fallbacks="' + esc(rest) + '"' : "") +
      ' onerror="window.NgStoryPrint&&NgStoryPrint.imgError(this)">' +
      '<div class="cover-hero-fallback">' + emoji + "</div>" +
      '<div class="cover-scrim"></div>' +
      "</div>"
    );
  }

  var GOLDEN = 0.382;

  function clampNum(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  /** 把封面主体放到黄金分割点：16:9 图铺满 A4 时只平移，不放大到裁掉主体。 */
  function applyCoverFocal(root, cfg) {
    var img = root && root.querySelector(".cover-hero-img");
    if (!img || !cfg || !cfg.coverFocal) return;
    var focal = cfg.coverFocal;
    if (focal.x == null || focal.y == null) return;

    function place() {
      if (img.classList.contains("is-hide")) return;
      var iw = img.naturalWidth || 0;
      var ih = img.naturalHeight || 0;
      if (iw < 8 || ih < 8) return;
      var fx = clampNum(Number(focal.x) || 0.5, 0.08, 0.92);
      var fy = clampNum(Number(focal.y) || 0.38, 0.08, 0.92);
      var ax = focal.anchorX != null ? clampNum(Number(focal.anchorX), 0.22, 0.78) : GOLDEN;
      var ay = focal.anchorY != null ? clampNum(Number(focal.anchorY), 0.18, 0.55) : GOLDEN;
      var Cw = 210;
      var Ch = 297;
      var Sw = Math.max(Cw, Ch * iw / ih);
      var Sh = Math.max(Ch, Cw * ih / iw);
      var posX = ax * 100;
      var posY = ay * 100;
      if (Sw > Cw + 0.05) {
        posX = ((fx * Sw / Cw) - ax) / (Sw / Cw - 1) * 100;
      }
      if (Sh > Ch + 0.05) {
        posY = ((fy * Sh / Ch) - ay) / (Sh / Ch - 1) * 100;
      }
      posX = clampNum(posX, 0, 100);
      posY = clampNum(posY, 0, 100);
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.maxWidth = "none";
      img.style.maxHeight = "none";
      img.style.left = "0";
      img.style.top = "0";
      img.style.transform = "none";
      img.style.objectFit = "cover";
      img.style.objectPosition = posX.toFixed(1) + "% " + posY.toFixed(1) + "%";
    }

    img.addEventListener("load", place);
    if (img.complete) place();
  }

  /**
   * 与课件金字塔朗读相同：There → There are → There are many …
   * PDF 用静态层，不带播放按钮和「点每一层朗读」说明。
   */
  function pyramidLayers(sentence) {
    var raw = String(sentence || "").trim();
    var endPunct = "";
    var m = raw.match(/([.!?]+)$/);
    if (m) {
      endPunct = m[1];
      raw = raw.slice(0, -endPunct.length).trim();
    }
    var words = raw.split(/\s+/).filter(Boolean);
    if (!words.length) {
      return [{ text: String(sentence || ""), newWord: String(sentence || "") }];
    }
    return words.map(function (w, i) {
      var text = words.slice(0, i + 1).join(" ");
      if (i === words.length - 1) text += endPunct;
      return { text: text, newWord: String(w).replace(/[.,;:!?]+$/g, "") };
    });
  }

  function pyramidLayerInner(ly) {
    var text = String(ly.text || "");
    var punct = "";
    var m = text.match(/([.,!?]+)$/);
    if (m) {
      punct = m[1];
      text = text.slice(0, -punct.length);
    }
    var parts = text.split(/\s+/).filter(Boolean);
    var last = parts.pop() || "";
    var old = parts.join(" ");
    return (old ? '<span class="py-old">' + esc(old) + " </span>" : "") +
      '<span class="py-new">' + esc(last) + "</span>" +
      (punct ? '<span class="py-old">' + esc(punct) + "</span>" : "");
  }

  function pyramidSizeClass(n) {
    if (n <= 3) return "short";
    if (n <= 6) return "mid";
    if (n <= 9) return "long";
    if (n <= 14) return "xl";
    if (n <= 22) return "xxl";
    return "mega";
  }

  function splitSentences(en) {
    var raw = String(en || "").trim();
    if (!raw) return [];
    var parts = raw.match(/[^.!?]+[.!?]+(?:["'”’])?|[^.!?]+$/g);
    if (!parts) return [raw];
    return parts.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function countWords(s) {
    return String(s || "").trim().split(/\s+/).filter(Boolean).length;
  }

  function wordPyramidRows(list) {
    var n = Math.max(list.length, 1);
    return list.map(function (ly, i) {
      var pct = n === 1 ? 72 : 38 + Math.round((i / (n - 1)) * 62);
      return (
        '<div class="py-print-layer" style="--py-w:' + pct + '%">' +
        '<span class="py-idx">' + (i + 1) + "</span>" +
        '<span class="py-text">' + pyramidLayerInner(ly) + "</span>" +
        "</div>"
      );
    }).join("");
  }

  function sentencePyramidRows(sentences) {
    var n = Math.max(sentences.length, 1);
    return sentences.map(function (sent, i) {
      var old = sentences.slice(0, i).join(" ");
      var inner = (old ? '<span class="py-old">' + esc(old) + " </span>" : "") +
        '<span class="py-new">' + esc(sent) + "</span>";
      return (
        '<div class="py-print-layer" style="--py-w:100%">' +
        '<span class="py-idx">' + (i + 1) + "</span>" +
        '<span class="py-text">' + inner + "</span>" +
        "</div>"
      );
    }).join("");
  }

  function pyramidHtml(en) {
    var sentences = splitSentences(en);
    var nWords = countWords(en);
    var useSent = nWords > 14 && sentences.length >= 2;
    var list = useSent ? sentences : pyramidLayers(en);
    var n = Math.max(list.length, 1);
    var size = useSent ? "sent" : pyramidSizeClass(n);
    var rows = useSent ? sentencePyramidRows(sentences) : wordPyramidRows(list);
    return (
      '<div class="story-pyramid-print pyramid-print--' + size +
      (useSent ? " pyramid-print--sent" : "") +
      '" data-layers="' + n + '" role="group" aria-label="金字塔朗读">' +
      rows +
      "</div>"
    );
  }

  function textBlockHtml(row, index, showZh) {
    var zhCls = showZh ? "story-zh" : "story-zh is-hidden";
    return (
      '<div class="story-text-block">' +
      '<span class="story-num-badge">#' + (index + 1) + "</span>" +
      pyramidHtml(row.en) +
      '<div class="story-divider"></div>' +
      '<p class="' + zhCls + '">' + esc(row.zh) + "</p>" +
      "</div>"
    );
  }

  function coverHtml(cfg) {
    var kicker = esc(cfg.coverKicker || "Leveled Reader");
    return (
      '<section class="story-print-sheet story-print-cover">' +
      coverHeroHtml(cfg) +
      '<div class="story-print-inner">' +
      '<div class="cover-copy">' +
      '<p class="cover-kicker">' + kicker + "</p>" +
      "<h2>" + esc(cfg.title) + "</h2>" +
      '<p class="cover-tag">Story Book</p>' +
      "</div>" +
      '<div class="cover-footer">' +
      '<p class="cover-hint">Scan to open this lesson</p>' +
      qrHtml(storyLearnUrl(cfg, 1), "story-qr--cover", "微信扫码 · 学课文") +
      "</div>" +
      "</div></section>"
    );
  }

  function singlePageHtml(cfg, row, index, pageLabel) {
    var imgs = storyImgCandidates(cfg.mediaCos, index, cfg);
    return (
      '<section class="story-print-sheet">' +
      '<div class="story-print-inner">' +
      '<header class="story-page-hdr">' +
      '<span class="book-name">' + esc(cfg.title) + "</span>" +
      '<div class="story-hdr-meta">' +
      qrHtml(storyLearnUrl(cfg, index + 1), "", "扫码学本句") +
      '<span class="page-num">' + esc(pageLabel) + "</span>" +
      "</div></header>" +
      '<div class="story-art-wrap">' +
      polaroidHtml(imgs, cfg.emoji) +
      "</div>" +
      textBlockHtml(row, index, cfg.showZh !== false) +
      "</div></section>"
    );
  }

  function buildAll(cfg) {
    var html = coverHtml(cfg);
    var story = cfg.story || [];
    story.forEach(function (row, i) {
      html += singlePageHtml(cfg, row, i, "第 " + (i + 1) + " 页");
    });
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
    var imgs = root
      ? [].slice.call(root.querySelectorAll(".story-polaroid img, .cover-hero-img"))
      : [];
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

  function fitSheetText(root) {
    if (!root || !global.getComputedStyle) return;
    [].forEach.call(root.querySelectorAll(".story-print-sheet"), function (sheet) {
      var py = sheet.querySelector(".story-pyramid-print");
      if (!py) return;
      var zh = sheet.querySelector(".story-zh");
      var guard = 0;
      while (sheet.scrollHeight - sheet.clientHeight > 0 && guard < 16) {
        var fs = parseFloat(global.getComputedStyle(py).fontSize) || 16;
        if (fs > 10.5) {
          py.style.fontSize = (fs * 0.88).toFixed(2) + "px";
        } else if (zh) {
          var zfs = parseFloat(global.getComputedStyle(zh).fontSize) || 16;
          if (zfs <= 10.5) break;
          zh.style.fontSize = (zfs * 0.9).toFixed(2) + "px";
        } else {
          break;
        }
        void sheet.offsetHeight;
        guard += 1;
      }
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

  var PDF_LIB_SCRIPTS = [
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  ];

  function pdfLibsReady() {
    return !!(global.html2canvas && global.jspdf && global.jspdf.jsPDF);
  }

  var _pdfLibsPromise = null;
  function loadPdfLibs() {
    if (pdfLibsReady()) return Promise.resolve();
    if (_pdfLibsPromise) return _pdfLibsPromise;
    _pdfLibsPromise = PDF_LIB_SCRIPTS.reduce(function (chain, src) {
      return chain.then(function () {
        if (pdfLibsReady()) return;
        return loadScriptTag(src);
      });
    }, Promise.resolve()).then(function () {
      if (!pdfLibsReady()) {
        _pdfLibsPromise = null;
        throw new Error("PDF 库加载不完整");
      }
    }).catch(function (err) {
      _pdfLibsPromise = null;
      throw err || new Error("PDF 库加载失败");
    });
    return _pdfLibsPromise;
  }

  function prepareExportClone(doc) {
    var b = doc.body;
    if (b) b.classList.add("is-exporting");
    var a = doc.getElementById("storyPrintArea");
    if (!a) return;
    a.classList.add("is-exporting");
    [].forEach.call(a.querySelectorAll(".story-print-sheet"), function (el) {
      el.style.transform = "none";
      el.style.marginBottom = "0";
    });
    [].forEach.call(a.querySelectorAll("img"), function (img) {
      var src = img.getAttribute("src") || "";
      if (src && src.indexOf("data:") !== 0) {
        img.crossOrigin = "anonymous";
      }
    });
  }

  function captureSheetCanvas(sheet) {
    var w = sheet.offsetWidth || A4_WIDTH_CSS_PX;
    var h = sheet.offsetHeight || Math.ceil((297 / 25.4) * 96);
    return global.html2canvas(sheet, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      width: w,
      height: h,
      windowWidth: w,
      windowHeight: h,
      onclone: function (doc) {
        prepareExportClone(doc);
      },
    });
  }

  function ensureRemoteImagesCors(root) {
    var imgs = root
      ? [].slice.call(root.querySelectorAll("img[src]")).filter(function (img) {
          var src = img.getAttribute("src") || "";
          return src.indexOf("http") === 0;
        })
      : [];
    if (!imgs.length) return Promise.resolve();
    return Promise.all(imgs.map(function (img) {
      if (img.complete && img.naturalWidth > 0 && img.crossOrigin === "anonymous") {
        return Promise.resolve();
      }
      return new Promise(function (resolve) {
        var src = img.src;
        img.crossOrigin = "anonymous";
        img.onload = img.onerror = resolve;
        img.src = "";
        img.src = src;
      });
    }));
  }

  function exportPdfSheets(area, filename) {
    var sheets = [].slice.call(area.querySelectorAll(".story-print-sheet"));
    if (!sheets.length) return Promise.reject(new Error("无可导出的页面"));
    var JsPDF = global.jspdf.jsPDF;
    var pdf = new JsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    });
    var pageW = pdf.internal.pageSize.getWidth();
    var pageH = pdf.internal.pageSize.getHeight();

    function step(i) {
      if (i >= sheets.length) {
        pdf.save(filename || "story.pdf");
        return Promise.resolve();
      }
      return captureSheetCanvas(sheets[i]).then(function (canvas) {
        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, pageW, pageH);
        return step(i + 1);
      });
    }
    return step(0);
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
      var showZhEl = document.getElementById("optShowZh");
      cfg.showZh = !showZhEl || showZhEl.checked;
      area.innerHTML = buildAll(cfg);
      applyCoverFocal(area, cfg);
      return fillQrCodes(area).then(function () {
        fitSheetText(area);
        function afterFonts() {
          fitSheetText(area);
          fitPreview(area);
        }
        if (global.document && document.fonts && document.fonts.ready) {
          return document.fonts.ready.then(afterFonts).catch(afterFonts);
        }
        return new Promise(function (resolve) {
          requestAnimationFrame(function () { afterFonts(); resolve(); });
        });
      });
    }

    var btnGen = document.getElementById("btnStoryGen");
    var btnPrint = document.getElementById("btnStoryPrint");
    var btnPdf = document.getElementById("btnStoryPdf");

    if (btnGen) btnGen.onclick = render;

    if (btnPrint) {
      btnPrint.onclick = function () {
        render().then(function () {
          clearPreviewScale(area);
          document.body.classList.add("is-exporting");
          area.classList.add("is-exporting");
          return preloadImages(area);
        }).then(function () {
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
        var mask = document.createElement("div");
        mask.setAttribute("aria-busy", "true");
        mask.style.cssText =
          "position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:2147483000;" +
          "display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;" +
          "font-family:system-ui,sans-serif;";
        mask.textContent = "正在生成课文 PDF…";
        btnPdf.disabled = true;
        btnPdf.textContent = "生成中…";
        render()
          .then(function () {
            clearPreviewScale(area);
            document.body.classList.add("is-exporting");
            area.classList.add("is-exporting");
            document.body.appendChild(mask);
            return loadPdfLibs();
          })
          .then(function () { return preloadImages(area); })
          .then(function () { return ensureRemoteImagesCors(area); })
          .then(function () {
            return global.document.fonts
              ? global.document.fonts.ready.catch(function () {})
              : Promise.resolve();
          })
          .then(function () {
            return exportPdfSheets(area, cfg.filename || "story.pdf");
          })
          .catch(function (err) {
            alert("PDF 导出失败，请改用「打印 / 另存 PDF」。\n" + (err && err.message ? err.message : ""));
          })
          .finally(function () {
            if (mask.parentNode) mask.parentNode.removeChild(mask);
            document.body.classList.remove("is-exporting");
            area.classList.remove("is-exporting");
            fitPreview(area);
            btnPdf.disabled = false;
            btnPdf.textContent = old;
          });
      };
    }

    var showZhEl = document.getElementById("optShowZh");
    if (showZhEl) showZhEl.onchange = render;

    render();
  }

  global.NgStoryPrint = {
    init: init,
    buildAll: buildAll,
    preloadImages: preloadImages,
    imgError: imgError,
    fillQrCodes: fillQrCodes,
    storyLearnUrl: storyLearnUrl,
    pyramidLayers: pyramidLayers,
    fitSheetText: fitSheetText,
  };
})(typeof window !== "undefined" ? window : this);
