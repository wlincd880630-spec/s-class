/**

 * 讲义 · 本地 MP3（data-mp3 由 lesson-local-audio.js 统一播放）

 */

(function () {

  "use strict";



  function boot() {

    if (window.LessonLocalAudio && window.LessonLocalAudio.wireTtsChips) {

      window.LessonLocalAudio.wireTtsChips(document);

    }

  }



  if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", boot);

  } else {

    boot();

  }

})();


