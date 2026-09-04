(function () {
  "use strict";
  var L = window.STUVWXYZ_REVIEW;

  function $(id) { return document.getElementById(id); }

  function render() {
    var box = $("slide");
    box.innerHTML =
      '<p class="slide-kicker">Song · A</p>' +
      '<figure class="story-hero"><img src="' + L.song + '" alt="Review 4 Zoo Song"></figure>' +
      '<p class="bk-sight">Letters: <b>' + L.letters.join(" · ") + "</b></p>" +
      '<div class="song-letter-hints">' +
      (L.songLetters || []).map(function (row) {
        var item = L.words[row.id];
        return '<div class="song-hint"><b>' + row.letter + '</b><img src="' + item.img + '" alt=""><span>' + row.hint + "</span></div>";
      }).join("") +
      "</div>" +
      '<button type="button" class="btn btn-apple" id="btn-song">听 Song · Track 63</button>' +
      '<a class="btn btn-ghost" href="print.html" style="margin-top:12px;display:inline-block;">导出教材 PDF</a>';
    $("btn-song").onclick = function () { AAAudio.playSong(); };
  }

  if ($("slide")) render();
})();
