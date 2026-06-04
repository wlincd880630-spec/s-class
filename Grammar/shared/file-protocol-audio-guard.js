/**

 * file:// 安全提示：在 iframe / 嵌入预览中无法加载子目录 MP3（Chrome 报 unique security origins）。

 */

(function () {

  "use strict";

  if (typeof window === "undefined" || !window.document) return;

  if (location.protocol !== "file:") return;



  var inFrame = false;

  try {

    inFrame = window.self !== window.top;

  } catch (e) {

    inFrame = true;

  }

  window.__LESSON_FILE_IN_IFRAME__ = inFrame;



  var warned = false;



  function showBanner() {

    if (document.getElementById("lesson-file-protocol-banner")) return;

    var bar = document.createElement("div");

    bar.id = "lesson-file-protocol-banner";

    bar.setAttribute("role", "alert");

    bar.style.cssText =

      "position:fixed;left:0;right:0;top:0;z-index:99999;padding:12px 16px;" +

      "background:#fff3cd;border-bottom:2px solid #e0a800;color:#333;" +

      "font:14px/1.5 system-ui,'Microsoft YaHei',sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15);";

    bar.innerHTML =

      "<strong>发音在嵌入窗口中不可用</strong>（Chrome 限制 file:// 跨文件加载）。" +

      "请 <button type='button' id='lesson-open-top-window' style='margin:0 6px;padding:4px 12px;cursor:pointer'>在浏览器新标签页打开</button>" +

      "或运行 <code>scripts/start-local-preview.bat</code> 后用 http://localhost 打开。";

    document.documentElement.insertBefore(bar, document.body || document.documentElement.firstChild);

    var btn = document.getElementById("lesson-open-top-window");

    if (btn) {

      btn.addEventListener("click", function () {

        window.open(location.href, "_blank", "noopener,noreferrer");

      });

    }

    try {

      document.body.style.paddingTop = "56px";

    } catch (e2) {}

  }



  function warnOnce() {

    if (warned) return;

    warned = true;

    if (inFrame) showBanner();

  }



  if (inFrame) {

    if (document.readyState === "loading") {

      document.addEventListener("DOMContentLoaded", showBanner);

    } else {

      showBanner();

    }

  }



  document.addEventListener(

    "click",

    function (e) {

      var t = e.target.closest(

        "[data-mp3], .tts-mini, .tts-huge, .tts-chip, .tts-read-btn, [data-tts-read]"

      );

      if (!t) return;

      if (inFrame && !(window.__LESSON_INLINE_AUDIO_BLOBS && t.getAttribute("data-mp3"))) {

        warnOnce();

      }

    },

    true

  );



  window.lessonFileProtocolWarn = warnOnce;

})();


