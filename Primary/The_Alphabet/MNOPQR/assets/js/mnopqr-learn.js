(function () {
  "use strict";
  var L = window.MNOPQR_REVIEW;

  function $(id) { return document.getElementById(id); }

  function render() {
    var box = $("slide");
    box.innerHTML =
      '<p class="slide-kicker">Song · A</p>' +
      '<figure class="story-hero"><img src="' + L.song + '" alt="Review 3 Song"></figure>' +
      '<p class="bk-sight">Letters: <b>' + L.letters.join(" · ") + "</b></p>" +
      '<button type="button" class="btn btn-apple" id="btn-song">听 Song · Disc 2 Track 27</button>' +
      '<a class="btn btn-ghost" href="print.html" style="margin-top:12px;display:inline-block;">导出教材 PDF</a>';
    $("btn-song").onclick = function () { AAAudio.playSong(); };
  }

  if ($("slide")) render();
})();
