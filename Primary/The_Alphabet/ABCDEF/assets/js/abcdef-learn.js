(function () {
  "use strict";
  var L = window.ABCDEF_REVIEW;

  function $(id) { return document.getElementById(id); }

  function render() {
    var box = $("slide");
    box.innerHTML =
      '<p class="slide-kicker">Song · A</p>' +
      '<figure class="story-hero"><img src="' + L.hero + '" alt="Review 1 Song"></figure>' +
      '<p class="bk-sight">Letters: <b>' + L.letters.join(" · ") + "</b></p>" +
      '<button type="button" class="btn btn-apple" id="btn-song">听 Song</button>';
    $("btn-song").onclick = function () { AAAudio.playSong(); };
  }

  if ($("slide")) render();
})();
