(function (global) {
  "use strict";

  var KEY = "phonics-lab-progress-v1";

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveProgress(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function markLesson(id, extra) {
    var p = loadProgress();
    p.lessons = p.lessons || {};
    p.lessons[id] = Object.assign({ done: true, at: Date.now() }, extra || {});
    p.lastLesson = id;
    saveProgress(p);
    return p;
  }

  function completedCount() {
    var p = loadProgress();
    return Object.keys(p.lessons || {}).length;
  }

  function img(key) {
    if (!key) return "assets/img/mascot.jpg";
    if (key.indexOf("/") !== -1 || key.indexOf(".") !== -1) return key;
    return "assets/img/" + key + ".jpg";
  }

  function img2(word) {
    if (!word) return img("mascot");
    if (typeof word === "string") {
      var w0 = global.phonicsGetWord ? global.phonicsGetWord(word) : null;
      return w0 ? img(w0.img2 || w0.img) : img(word);
    }
    return img(word.img2 || word.img);
  }

  function pic(src, cls, alt) {
    var fb = String(src || "").replace(/2\.jpg$/i, ".jpg");
    if (fb === src) fb = "assets/img/mascot.jpg";
    return (
      "<img class=\"" +
      (cls || "pic") +
      "\" src=\"" +
      src +
      "\" alt=\"" +
      (alt || "") +
      "\" data-fb=\"" +
      fb +
      "\" onerror=\"this.onerror=null;this.src=this.getAttribute('data-fb')||'assets/img/mascot.jpg'\">"
    );
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function pick(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  function qs(name, fallback) {
    var u = new URLSearchParams(location.search);
    return u.get(name) || fallback;
  }

  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstChild;
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.display = "block";
    clearTimeout(t._tid);
    t._tid = setTimeout(function () {
      t.style.display = "none";
    }, 1600);
  }

  function wordObjs(ids) {
    return (ids || [])
      .map(function (id) {
        return global.phonicsGetWord ? global.phonicsGetWord(id) : null;
      })
      .filter(Boolean);
  }

  function phonemeObjs(ids) {
    return (ids || [])
      .map(function (id) {
        return global.PHONEMES && global.PHONEMES[id];
      })
      .filter(Boolean);
  }

  function sightObjs(words) {
    var all = global.PHONICS_SIGHT || [];
    return (words || [])
      .map(function (w) {
        for (var i = 0; i < all.length; i++) if (all[i].word === w) return all[i];
        return { word: w, zh: "", ipa: "", tip: "", heart: "" };
      });
  }

  function playPhoneme() {
    toast("音素由教师示范");
    return Promise.resolve(false);
  }
  function playPhonemeThenWord(id) {
    var w = global.phonicsGetWord ? global.phonicsGetWord(id) : null;
    return playWord(w ? w.word : id);
  }

  function letterUnit(lessonId) {
    var lesson = global.PHONICS_LESSON_MAP && global.PHONICS_LESSON_MAP[lessonId];
    if (!lesson || !lesson.letters || !global.phonicsLetters) return null;
    var packs = global.phonicsLetters(lesson.letters);
    if (!packs.length) return null;
    return {
      unit: lesson.titleEn,
      letters: packs.map(function (p) { return p.letters; }).join(" "),
      blurb: lesson.focus && lesson.focus.tip,
      packs: packs
    };
  }

  function vocabObjs(ids) {
    return wordObjs(ids);
  }
  function playWord(text) {
    if (global.PhonicsTTS) return global.PhonicsTTS.speakWord(text);
  }
  function playBlend(ids, word) {
    if (global.PhonicsTTS) return global.PhonicsTTS.speakWord(word || "");
  }
  function playSentence(text) {
    if (global.PhonicsTTS) return global.PhonicsTTS.speakWord(text);
  }

  global.Lab = {
    loadProgress: loadProgress,
    saveProgress: saveProgress,
    markLesson: markLesson,
    completedCount: completedCount,
    img: img,
    img2: img2,
    pic: pic,
    shuffle: shuffle,
    pick: pick,
    qs: qs,
    el: el,
    toast: toast,
    wordObjs: wordObjs,
    phonemeObjs: phonemeObjs,
    sightObjs: sightObjs,
    playPhoneme: playPhoneme,
    playPhonemeThenWord: playPhonemeThenWord,
    letterUnit: letterUnit,
    vocabObjs: vocabObjs,
    playWord: playWord,
    playBlend: playBlend,
    playSentence: playSentence
  };
})(typeof window !== "undefined" ? window : this);
