/**
 * 兼容旧接口：按课时取出字母页
 */
(function (global) {
  "use strict";

  function forLesson(id) {
    var lesson = global.PHONICS_LESSON_MAP && global.PHONICS_LESSON_MAP[id];
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

  function allWordIds(id) {
    var u = forLesson(id);
    if (!u) return [];
    var out = [];
    u.packs.forEach(function (p) {
      (p.words || []).forEach(function (w) {
        if (out.indexOf(w) === -1) out.push(w);
      });
    });
    return out;
  }

  global.phonicsLetterUnit = forLesson;
  global.phonicsLetterVocabIds = allWordIds;
})(typeof window !== "undefined" ? window : this);
