(function () {
  "use strict";
  var L = window.WXYZ_REVIEW;

  function $(id) { return document.getElementById(id); }
  function w(id) { return L.words[id]; }

  function render() {
    var box = $("slide");
    box.innerHTML =
      '<p class="slide-kicker">Story · D</p>' +
      '<figure class="story-hero"><img src="' + L.story + '" alt="Story"></figure>' +
      '<p class="bk-sight">Sight words: <b>' + L.sightWords.join(" · ") + "</b></p>" +
      '<div class="story-lines">' +
        L.storyPanels.map(function (p, i) {
          return '<button type="button" class="btn btn-ghost story-line" data-i="' + i + '">' + p.line + "</button>";
        }).join("") +
      "</div>" +
      '<button type="button" class="btn btn-apple" id="btn-story">听 Story</button>';
    $("btn-story").onclick = function () { AAAudio.playStory(); };
    box.querySelectorAll(".story-line").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var p = L.storyPanels[Number(btn.getAttribute("data-i"))];
        if (p && L.words[p.focus]) AAAudio.speakWord(L.words[p.focus].en, true);
      });
    });
  }

  if ($("slide")) render();
})();
