"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.join(__dirname, "..", "..");
var src = fs.readFileSync(path.join(__dirname, "ng-word-ipa.js"), "utf8");
var sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
var NgWordIpa = sandbox.NgWordIpa || sandbox.window.NgWordIpa;
if (!NgWordIpa) throw new Error("NgWordIpa 未导出");

var failed = 0;
function eq(got, want, label) {
  if (got !== want) {
    failed += 1;
    console.error("FAIL", label, "got", JSON.stringify(got), "want", JSON.stringify(want));
  }
}

function isDisplayIpa(s) {
  if (s === "—") return true;
  if (!/^\/[^/]+\/$/.test(s)) return false;
  if (/[ăĕĭŏŭäāēīōūô]/.test(s)) return false;
  if (/(短|长|schwa|silent|不发音|双写|词尾|弱读|空格|字母|像 )/.test(s)) return false;
  if (/^\/(th|sh|ch|ng|oo|or|ay|aw|ow|air|oor|ell|ing)\/$/.test(s)) return false;
  return true;
}

var cases = [
  ["短 i", "i", "Animal", "/ɪ/"],
  ["schwa", "a", "Animal", "/ə/"],
  ["/ă/", "A", "Animal", "/æ/"],
  ["/n/", "n", "Animal", "/n/"],
  ["短 e", "e", "Pet", "/e/"],
  ["短 u", "u", "Pup", "/ʌ/"],
  ["短 o", "o", "roll", "/ɒ/"],
  ["短 a", "a", "catch", "/æ/"],
  ["短 a（-at 里常见）", "a", "swat", "/æ/"],
  ["短 o 发 /ʌ/", "o", "some", "/ʌ/"],
  ["弱读 /ə/", "o", "together", "/ə/"],
  ["长 e", "ee", "peek", "/iː/"],
  ["长 e /ēē/", "ee", "see", "/iː/"],
  ["长 /ā/", "ai", "tail", "/eɪ/"],
  ["长 /ī/", "ie", "lie", "/aɪ/"],
  ["长 /oo/", "oo", "food", "/uː/"],
  ["发 /ə/", "ea", "ocean", "/ə/"],
  ["发 /ē/", "ea", "leap", "/iː/"],
  ["发 /ā/", "eigh", "neighbor", "/eɪ/"],
  ["发 /z/", "se", "these", "/z/"],
  ["发 /ōl/", "ole", "blowhole", "/əʊl/"],
  ["发长 /ū/", "ough", "through", "/uː/"],
  ["y 发 /ē/", "y", "many", "/i/"],
  ["词尾 y /ē/", "y", "puppy", "/i/"],
  ["词尾 /ē/", "y", "library", "/i/"],
  ["u 发 /ĭ/", "u", "busy", "/ɪ/"],
  ["i + silent e 发长 /ī/", "i", "dive", "/aɪ/"],
  ["silent e 不发音", "e", "dive", "—"],
  ["b 不发音", "mb", "climb", "—"],
  ["双写 p", "pp", "puppy", "/p/"],
  ["双写 d", "dd", "cuddle", "/d/"],
  ["空格", " ", "need to", "—"],
  ["字母", "A", "A", "/æ/"],
  ["词尾 -le", "le", "cuddle", "/əl/"],
  ["/ay/ 像 day", "ay", "play", "/eɪ/"],
  ["/ow/ 像 cow", "ow", "down", "/aʊ/"],
  ["/aw/ 像 paw", "aw", "yawn", "/ɔː/"],
  ["发 /ô/ 像 walk", "al", "walk", "/ɔː/"],
  ["/sh/", "sh", "fish", "/ʃ/"],
  ["/ch/", "ch", "catch", "/tʃ/"],
  ["/ng/", "ng", "long", "/ŋ/"],
  ["/oo/", "oo", "food", "/uː/"],
  ["/or/", "or", "short", "/ɔː/"],
  ["/or/", "or", "work", "/ɜː/"],
  ["/ar/", "ar", "car", "/ɑː/"],
  ["/air/", "air", "air", "/eə/"],
  ["/aw/", "aw", "paw", "/ɔː/"],
  ["/ay/", "ay", "play", "/eɪ/"],
  ["/ow/", "ow", "cow", "/aʊ/"],
  ["/ell/", "ell", "smell", "/el/"],
  ["/ing/", "ing", "swing", "/ɪŋ/"],
  ["/hood/", "hood", "neighborhood", "/hʊd/"],
  ["/shən/", "tion", "station", "/ʃən/"],
  ["/ô/", "au", "restaurant", "/ɔː/"],
  ["/ôl/", "all", "call", "/ɔːl/"],
  ["/ā/", "ey", "they", "/eɪ/"],
  ["/āl/", "ail", "mail", "/eɪl/"],
  ["/ī/", "igh", "fight", "/aɪ/"],
  ["/īr/", "ire", "fire", "/aɪə/"],
  ["/ō/", "ow", "blow", "/əʊ/"],
  ["/ū/", "ough", "through", "/uː/"],
  ["/ē/", "ea", "sea", "/iː/"],
  ["/ĕ/", "e", "egg", "/e/"],
  ["/ĭ/", "i", "skin", "/ɪ/"],
  ["/ŏ/", "o", "hot", "/ɒ/"],
  ["/ŭ/", "u", "cup", "/ʌ/"],
  ["/ä/", "o", "fossil", "/ɑː/"],
  ["/än/", "on", "continent", "/ɒn/"],
  ["/āt/", "ate", "vertebrate", "/eɪt/"],
  ["/ər/", "er", "river", "/ə/"],
  ["/ərd/", "ard", "lizard", "/əd/"],
  ["/j/", "j", "jump", "/dʒ/"],
  ["/g/", "g", "tug", "/ɡ/"],
  ["/y/", "y", "yawn", "/j/"],
  ["/a/", "a", "back", "/æ/"],
  ["/th/", "th", "they", "/ð/"],
  ["/th/", "th", "this", "/ð/"],
  ["/th/", "th", "these", "/ð/"],
  ["/th/", "th", "there", "/ð/"],
  ["/th/", "th", "with", "/ð/"],
  ["/th/", "th", "others", "/ð/"],
  ["/th/", "th", "together", "/ð/"],
  ["/th/", "th", "thing", "/θ/"],
  ["/th/", "th", "through", "/θ/"],
  ["/th/", "the", "breathe", "/ð/"],
  ["/th/", "th", "heath", "/θ/"],
  ["/iən/", "ian", "librarian", "/iən/"],
  ["/əl/", "al", "hospital", "/əl/"],
  ["/ənt/", "ent", "different", "/ənt/"],
  ["/pl/", "ple", "people", "/pl/"],
  ["/mp/", "mp", "jump", "/mp/"],
  ["/str/", "str", "stretch", "/str/"],
  ["/æ/", "a", "am", "/æ/"],
  ["/ʌ/", "u", "pup", "/ʌ/"],
  ["/əʊ/", "o", "hello", "/əʊ/"],
  ["/ʃ/", "sh", "she", "/ʃ/"],
  ["/uː/", "oo", "moon", "/uː/"],
  ["/aɪ/", "y", "dry", "/aɪ/"],
  ["/e/", "e", "desert", "/e/"],
  ["/—/", "-", "cold-blooded", "—"],
  ["—", "-", "cold-blooded", "—"],
  ["/tar/", "tar", "Antarctica", "/tɑː/"],
  ["/and/", "and", "heathland", "/ænd/"],
  ["/eks/", "ex", "exoskeleton", "/eks/"]
];

cases.forEach(function (row) {
  eq(NgWordIpa.hint(row[0], row[1], row[2]), row[3], row[0] + " @ " + row[2]);
});

function collectHintsFromHtml(file) {
  var text = fs.readFileSync(file, "utf8");
  var hints = [];
  var re = /hint:\s*"([^"]*)"/g;
  var m;
  while ((m = re.exec(text))) hints.push(m[1]);
  return hints;
}

var ngBooks = [
  "Primary/Jump Pup/jump-pup-courseware/index.html",
  "Primary/Play Kitty/play-kitty-courseware/index.html",
  "Primary/Peek Otter/peek-otter-courseware/index.html",
  "Primary/Dive Dolphin/dive-dolphin-courseware/index.html",
  "Primary/Helpers in your neighborhood/helpers-neighborhood-courseware/index.html"
];

var seen = Object.create(null);
ngBooks.forEach(function (rel) {
  collectHintsFromHtml(path.join(root, rel)).forEach(function (h) {
    if (h === "字母") return;
    var out = NgWordIpa.hint(h, "", "");
    if (!isDisplayIpa(out)) {
      failed += 1;
      console.error("FAIL NG hint", JSON.stringify(h), "→", JSON.stringify(out), "in", rel);
    }
    seen[h] = out;
  });
});

function loadCourse(file) {
  var code = fs.readFileSync(file, "utf8");
  var ctx = { window: {}, console: console };
  vm.createContext(ctx);
  vm.runInContext(
    code +
      "; this.__data = (typeof REPTILE_COURSE !== 'undefined' ? REPTILE_COURSE : typeof DESERT_COURSE !== 'undefined' ? DESERT_COURSE : typeof MOON_COURSE !== 'undefined' ? MOON_COURSE : typeof TEXTBOOK_DATA !== 'undefined' ? TEXTBOOK_DATA : null);",
    ctx
  );
  if (!ctx.__data) throw new Error("无法读取词表 " + file);
  return ctx.__data;
}

var reptile = loadCourse(
  path.join(root, "Primary/What are reptiles/what-are-reptiles-courseware/assets/data/words-data.js")
);
reptile.words.forEach(function (w) {
  (w.phonemes || []).forEach(function (ph) {
    var out = NgWordIpa.forPhoneme(ph, w);
    if (!isDisplayIpa(out.symbol)) {
      failed += 1;
      console.error("FAIL reptile", w.word, ph.letter, ph.symbol, "→", out.symbol);
    }
  });
});

eq(NgWordIpa.hint("/ā/", "a", "scale"), "/eɪ/", "reptile scale /ā/");
eq(NgWordIpa.hint("/ī/", "i", "reptile"), "/aɪ/", "reptile /ī/");
eq(NgWordIpa.hint("/sh/", "ci", "species"), "/ʃ/", "reptile /sh/");
eq(NgWordIpa.hint("/g/", "g", "alligator"), "/ɡ/", "reptile /g/");

function wordsFromCourse(data) {
  if (data.words) return data.words;
  if (data.units) {
    var list = [];
    data.units.forEach(function (u) {
      (u.words || []).forEach(function (w) { list.push(w); });
    });
    return list;
  }
  return [];
}

function checkAlreadyIpaFile(file) {
  var data = loadCourse(file);
  wordsFromCourse(data).forEach(function (w) {
    (w.phonemes || []).forEach(function (ph) {
      var out = NgWordIpa.forPhoneme(ph, w);
      if (!isDisplayIpa(out.symbol)) {
        failed += 1;
        console.error("FAIL pass-through", file, w.word, ph.symbol, "→", out.symbol);
      }
    });
  });
}

checkAlreadyIpaFile(
  path.join(root, "Primary/Worlds Largest Deserts/worlds-largest-deserts-courseware/assets/data/words-data.js")
);
checkAlreadyIpaFile(
  path.join(root, "Primary/How many people have been to the Moon/how-many-people-have-been-to-the-moon-courseware/assets/data/words-data.js")
);

var schoolFiles = [
  "Primary/School_textbook/Courseware/3GA/assets/data/data.js",
  "Primary/School_textbook/Courseware/3GB/assets/data/data.js",
  "Primary/School_textbook/Courseware/4GA/assets/data/data.js",
  "Primary/School_textbook/Courseware/4GB/assets/data/data.js",
  "Primary/School_textbook/Courseware/5GA/assets/data/data.js",
  "Primary/School_textbook/Courseware/5GB/assets/data/data.js",
  "Primary/School_textbook/Courseware/6GA/assets/data/data.js"
];
schoolFiles.forEach(function (rel) {
  checkAlreadyIpaFile(path.join(root, rel));
});

if (failed) {
  console.error("Failed:", failed);
  process.exit(1);
}
console.log("ok", cases.length, "explicit + NG/reptile/desert/moon/school pass");
