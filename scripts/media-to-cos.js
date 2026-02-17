/**
 * 页面加载时，将 HTML 中的本地/相对媒体链接自动改为腾讯云 COS 地址。
 * 依赖：在引入本脚本之前设置 window.MEDIA_BASE（必填）、window.MEDIA_PREFIX（选填，不填则按当前页面路径推导）。
 */
(function () {
  var MEDIA_EXT = /\.(jpg|jpeg|png|gif|webp|bmp|svg|ico|mp4|webm|mov|avi|mkv|mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i;

  function isRelative(url) {
    if (!url || typeof url !== 'string') return false;
    var t = url.trim();
    return t.length > 0 && !/^https?:\/\//i.test(t) && !/^data:/.test(t) && !/^#/.test(t) && !/^blob:/.test(t);
  }

  function isMediaUrl(url) {
    return MEDIA_EXT.test(url.split('?')[0]);
  }

  function getPrefix() {
    if (window.MEDIA_PREFIX) return window.MEDIA_PREFIX.replace(/\/+$/, '');
    var path = (typeof location !== 'undefined' && location.pathname) ? location.pathname : '';
    var withoutFile = path.replace(/^\//, '').replace(/\/[^/]+$/, '');
    return withoutFile || '';
  }

  function resolveUrl(relativePath, prefix) {
    var path = relativePath.replace(/^\.\//, '').trim();
    if (prefix) path = prefix + '/' + path;
    return path.replace(/\/+/g, '/');
  }

  function rewrite() {
    var base = window.MEDIA_BASE;
    if (!base) return;
    base = base.replace(/\/+$/, '') + '/';
    var prefix = getPrefix();

    var selectors = 'img[src], video[src], audio[src], source[src], video source[src], audio source[src]';
    document.querySelectorAll(selectors).forEach(function (el) {
      var url = el.getAttribute('src');
      if (!isRelative(url) || !isMediaUrl(url)) return;
      var full = base + resolveUrl(url, prefix);
      el.setAttribute('src', full);
    });

    document.querySelectorAll('a[href]').forEach(function (el) {
      var url = el.getAttribute('href');
      if (!isRelative(url) || !isMediaUrl(url)) return;
      var full = base + resolveUrl(url, prefix);
      el.setAttribute('href', full);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewrite);
  } else {
    rewrite();
  }
})();
