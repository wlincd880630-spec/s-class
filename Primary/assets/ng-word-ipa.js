/**
 * 学单词 · 音形对应注音统一为国际音标（英式 RP，与教材 Azure en-GB 一致）
 */
(function (global) {
  "use strict";

  var EXACT = {
    "短 a": "/æ/",
    "短 a（-at 里常见）": "/æ/",
    "短 e": "/e/",
    "短 i": "/ɪ/",
    "短 o": "/ɒ/",
    "短 o 发 /ʌ/": "/ʌ/",
    "短 u": "/ʌ/",
    schwa: "/ə/",
    "弱读 /ə/": "/ə/",
    "长 e": "/iː/",
    "长 e /ēē/": "/iː/",
    "长 /ā/": "/eɪ/",
    "长 /ī/": "/aɪ/",
    "长 /oo/": "/uː/",
    "短 /ʊ/": "/ʊ/",
    "短 /oo/": "/ʊ/",
    "长 /ū/": "/uː/",
    "发 /ə/": "/ə/",
    "发 /ē/": "/iː/",
    "发 /ā/": "/eɪ/",
    "发 /z/": "/z/",
    "发 /ōl/": "/əʊl/",
    "发长 /ū/": "/uː/",
    "y 发 /ē/": "/i/",
    "词尾 y /ē/": "/i/",
    "短 i 发 /ɪ/": "/ɪ/",
    "撇号": "—",
    "长 /ū/ 像 you": "/juː/",
    "短 o 发 /ɒ/": "/ɒ/",
    "/ndz/": "/ndz/",
    "/st/": "/st/",
    "/sw/": "/sw/",
    "/ld/": "/ld/",
    "/th/": "/ð/",
    "长 /ō/": "/əʊ/",
    "长 /oo/": "/uː/",
    "词尾 /ē/": "/i/",
    "u 发 /ĭ/": "/ɪ/",
    "i + silent e 发长 /ī/": "/aɪ/",
    "silent e 不发音": "—",
    "b 不发音": "—",
    "双写 p": "/p/",
    "双写 d": "/d/",
    "空格": "—",
    "字母": "",
    "词尾 -le": "/əl/",
    "/ay/ 像 day": "/eɪ/",
    "/ow/ 像 cow": "/aʊ/",
    "/aw/ 像 paw": "/ɔː/",
    "发 /ô/ 像 walk": "/ɔː/",
    "/": "—",
    "—": "—",
    "/—/": "—",
    "/sh/": "/ʃ/",
    "/ch/": "/tʃ/",
    "/ng/": "/ŋ/",
    "/oo/": "/uː/",
    "/oor/": "/ɔː/",
    "/or/": "/ɔː/",
    "/ar/": "/ɑː/",
    "/air/": "/eə/",
    "/aw/": "/ɔː/",
    "/ay/": "/eɪ/",
    "/ow/": "/aʊ/",
    "/ell/": "/el/",
    "/ing/": "/ɪŋ/",
    "/hood/": "/hʊd/",
    "/shən/": "/ʃən/",
    "/ô/": "/ɔː/",
    "/ôl/": "/ɔːl/",
    "/ā/": "/eɪ/",
    "/āl/": "/eɪl/",
    "/ă/": "/æ/",
    "/ī/": "/aɪ/",
    "/īr/": "/aɪə/",
    "/ō/": "/əʊ/",
    "/ū/": "/uː/",
    "/ē/": "/iː/",
    "/ĕ/": "/e/",
    "/ĭ/": "/ɪ/",
    "/ŏ/": "/ɒ/",
    "/ŭ/": "/ʌ/",
    "/ä/": "/ɑː/",
    "/än/": "/ɒn/",
    "/āt/": "/eɪt/",
    "/ər/": "/ə/",
    "/ərd/": "/əd/",
    "/tar/": "/tɑː/",
    "/and/": "/ænd/",
    "/an/": "/æn/",
    "/am/": "/æm/",
    "/eks/": "/eks/",
    "/j/": "/dʒ/",
    "/g/": "/ɡ/",
    "/y/": "/j/",
    "/a/": "/æ/"
  };

  var INNER = [
    ["ēē", "iː"],
    ["shən", "ʃən"],
    ["ənt", "ənt"],
    ["ərd", "əd"],
    ["hood", "hʊd"],
    ["ing", "ɪŋ"],
    ["air", "eə"],
    ["oor", "ɔː"],
    ["ell", "el"],
    ["ôl", "ɔːl"],
    ["āl", "eɪl"],
    ["īr", "aɪə"],
    ["āt", "eɪt"],
    ["än", "ɒn"],
    ["eks", "eks"],
    ["and", "ænd"],
    ["str", "str"],
    ["tch", "tʃ"],
    ["ng", "ŋ"],
    ["th", "θ"],
    ["sh", "ʃ"],
    ["ch", "tʃ"],
    ["oo", "uː"],
    ["aw", "ɔː"],
    ["ay", "eɪ"],
    ["ow", "aʊ"],
    ["mp", "mp"],
    ["pl", "pl"],
    ["br", "br"],
    ["pr", "pr"],
    ["sk", "sk"],
    ["st", "st"],
    ["sp", "sp"],
    ["bl", "bl"],
    ["ld", "ld"],
    ["nt", "nt"],
    ["am", "æm"],
    ["an", "æn"],
    ["ar", "ɑː"],
    ["or", "ɔː"],
    ["ər", "ə"],
    ["əs", "əs"],
    ["əl", "əl"],
    ["ən", "ən"],
    ["ă", "æ"],
    ["ĕ", "e"],
    ["ĭ", "ɪ"],
    ["ŏ", "ɒ"],
    ["ŭ", "ʌ"],
    ["ä", "ɑː"],
    ["ā", "eɪ"],
    ["ē", "iː"],
    ["ī", "aɪ"],
    ["ō", "əʊ"],
    ["ū", "uː"],
    ["ô", "ɔː"]
  ];

  var IPA_CHAR = /[ˈˌaeiouæɑɒɔʊuɪəɜʌeθðʃʒŋɡjwrhflmnpbtdkfvszxː.\-\s]/;
  var IPA_MARK = /[æɑɒɔʊɪəɜʌθðʃʒŋɡːˈˌ]/;
  var AMER_DIGRAPH = /^(th|sh|ch|ng|tch|wh)$/;

  function isIpaInner(inner) {
    if (!inner) return false;
    if (/[ăĕĭŏŭäāēīōūô]/.test(inner)) return false;
    if (AMER_DIGRAPH.test(inner)) return false;
    var i;
    for (i = 0; i < inner.length; i++) {
      if (!IPA_CHAR.test(inner.charAt(i))) return false;
    }
    if (IPA_MARK.test(inner)) return true;
    if (!/[aeiou]/.test(inner)) return true;
    return false;
  }

  function wrap(inner) {
    if (!inner || inner === "—") return "—";
    return "/" + inner + "/";
  }

  function thOf(word, grapheme) {
    var w = String(word || "").toLowerCase();
    var g = String(grapheme || "").toLowerCase();
    if (/^(thing|through|think|thumb|thick|three|earth|mouth|north|south)$/.test(w)) return "/θ/";
    if (g === "th" || g === "the") {
      if (/^(they|there|this|these|those|with|other|others|together|breathe|the|that|than|then)$/.test(w)) {
        return "/ð/";
      }
    }
    if (/^(they|there|this|these|those|with|other|others|together|breathe)$/.test(w)) return "/ð/";
    return "/θ/";
  }

  function letterFallback(grapheme) {
    var g = String(grapheme || "").toLowerCase();
    var map = {
      a: "æ",
      e: "e",
      i: "ɪ",
      o: "ɒ",
      u: "ʌ",
      y: "j",
      g: "ɡ",
      j: "dʒ",
      c: "k",
      q: "k",
      x: "ks"
    };
    if (map[g]) return wrap(map[g]);
    if (/^[a-z]+$/.test(g)) return wrap(g.replace(/g/g, "ɡ"));
    return "—";
  }

  function hint(raw, grapheme, word) {
    var src = raw == null ? "" : String(raw).trim();
    var g = grapheme == null ? "" : String(grapheme);
    var w = word == null ? "" : String(word);

    if (src === "/th/" || src === "th") return thOf(w, g);
    if (src === "/or/" && /^work$/i.test(w)) return "/ɜː/";

    if (EXACT.hasOwnProperty(src)) {
      if (EXACT[src] === "") return letterFallback(g);
      return EXACT[src];
    }

    var m = src.match(/^\/([^/]*)\/$/);
    var inner = m ? m[1] : src;
    if (inner === "—" || inner === "") return "—";

    if (isIpaInner(inner)) {
      inner = inner.replace(/g/g, "ɡ");
      return wrap(inner);
    }

    var i;
    for (i = 0; i < INNER.length; i++) {
      if (inner.indexOf(INNER[i][0]) >= 0) {
        inner = inner.split(INNER[i][0]).join(INNER[i][1]);
      }
    }
    inner = inner.replace(/g/g, "ɡ");
    if (!inner || /[\u4e00-\u9fff]/.test(inner)) {
      return letterFallback(g);
    }
    return wrap(inner);
  }

  function forPhoneme(ph, word) {
    var raw = ph && ph.symbol != null ? String(ph.symbol) : "";
    var letter = ph && ph.letter != null ? String(ph.letter) : "";
    var w = "";
    if (typeof word === "string") w = word;
    else if (word && typeof word === "object") w = word.word || word.key || "";
    var ipa = hint(raw, letter, w);
    return {
      symbol: ipa,
      silent: ipa === "—" || raw === "—" || raw === "/—/"
    };
  }

  global.NgWordIpa = {
    hint: hint,
    isIpaInner: isIpaInner,
    forPhoneme: forPhoneme
  };
})(typeof window !== "undefined" ? window : this);
