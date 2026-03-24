/**
 * 主系表系列页：为 asset/ 开头的相对图片地址加上 LINKING_ASSET_BASE（见 cos-config.js）。
 */
(function (global) {
  "use strict";

  function stripTrailingSlash(b) {
    return String(b || "").replace(/\/+$/, "");
  }

  global.linkingAssetUrl = function (rel) {
    var r = String(rel || "").replace(/^\/+/, "");
    if (!r) return r;
    if (/^https?:\/\//i.test(r) || /^data:/i.test(r)) return r;
    var b = stripTrailingSlash(global.LINKING_ASSET_BASE);
    if (!b) return r;
    return b + "/" + r;
  };

  global.linkingRewriteImages = function (root) {
    var b = stripTrailingSlash(global.LINKING_ASSET_BASE);
    if (!b) return;
    var el = root && root.nodeType === 1 ? root : document;
    if (!el.querySelectorAll) return;
    var imgs = el.querySelectorAll("img[src]");
    Array.prototype.forEach.call(imgs, function (im) {
      var s = im.getAttribute("src");
      if (!s || /^https?:\/\//i.test(s) || /^data:/i.test(s)) return;
      if (s.indexOf("asset/") !== 0) return;
      im.setAttribute("src", global.linkingAssetUrl(s));
    });
  };

  function run() {
    global.linkingRewriteImages(document);
  }

  run();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
})(typeof window !== "undefined" ? window : globalThis);
