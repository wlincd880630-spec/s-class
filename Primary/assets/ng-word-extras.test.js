/* node Primary/assets/ng-word-extras.test.js */
var fs = require("fs");
var vm = require("vm");
var path = require("path");
var ctx = { window: {}, document: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "ng-word-extras.js"), "utf8"), ctx);
var X = ctx.window.NGWordExtras;
var fails = 0;
function assert(cond, msg) {
  if (!cond) {
    fails += 1;
    console.error("FAIL", msg);
  } else {
    console.log("ok", msg);
  }
}

assert(X.slug("Mail carrier") === "mail-carrier", "slug spaces");
assert(X.slug("Can't") === "cant", "slug apostrophe");
assert(X.slug("Need to") === "need-to", "slug need-to");
assert(X.sentenceSrc({ key: "Play" }) === "images/sentences/play.png", "sentence src say");
assert(X.sceneSrc({ key: "Play" }, "ex") === "images/sentences/play-ex.png", "scene src ex");
assert(X.sceneSrc({ key: "Play" }, "sort") === "images/sentences/play-sort.png", "scene src sort");
assert(X.tokenize("The kitty likes to play.").length === 5, "tokenize 5");
assert(X.normalize("Play!") === "play", "normalize punct");
assert(X.hasTargetWord("The kitty likes to play.", "Play"), "has Play");
assert(X.hasTargetWord("The kitty is playing.", "Play"), "has playing");
assert(!X.hasTargetWord("The kitty is cute.", "Play"), "no Play");
assert(X.hasTargetWord("The mail carrier brings letters.", "Mail carrier"), "phrase target");
assert(X.hasTargetWord("Dolphins need to breathe.", "Need to"), "need to");

var sayData = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "ng-word-say-data.js"), "utf8"), sayData);
var map = sayData.window.NG_WORD_SAY;
assert(map["play-kitty"].Play.en.indexOf("play") >= 0, "say kitty play");
assert(Object.keys(map["dive-dolphin"]).length === 43, "dolphin 43");
assert(typeof X.exOf === "function", "exOf exported");

var longSay = X.sayOf({ key: "Long" }, map["dive-dolphin"]);
var longSort = X.sortOf({ key: "Long" }, map["dive-dolphin"]);
var longEx = X.exOf({ key: "Long" }, map["dive-dolphin"]);
assert(longSay.en === "This ruler is long.", "Long say is off-theme");
assert(longSort.en === "I have long hair.", "Long sort is off-theme");
assert(longEx.en === "The bus is long.", "Long ex is off-theme");

var themeBan = {
  "play-kitty": /\b(kitty|kitten|cat)\b/i,
  "jump-pup": /\b(jump,? pup|this is my pup)\b/i,
  "peek-otter": /\b(otter)\b/i,
  "dive-dolphin": /\b(dolphin|dolphins)\b/i
};

Object.keys(map).forEach(function (book) {
  Object.keys(map[book]).forEach(function (key) {
    var w = { key: key };
    var say = X.sayOf(w, map[book]);
    var sort = X.sortOf(w, map[book]);
    var ex = X.exOf(w, map[book]);
    assert(!!say.en && !!sort.en && !!ex.en, book + " " + key + " has three sentences");
    assert(X.normalize(say.en) !== X.normalize(sort.en), book + " " + key + " say/sort differ");
    assert(X.normalize(say.en) !== X.normalize(ex.en), book + " " + key + " say/ex differ");
    assert(X.normalize(sort.en) !== X.normalize(ex.en), book + " " + key + " sort/ex differ");
    assert(X.hasTargetWord(say.en, key), book + " " + key + " say has target");
    assert(X.hasTargetWord(sort.en, key), book + " " + key + " sort has target");
    assert(X.hasTargetWord(ex.en, key), book + " " + key + " ex has target");
    var ban = themeBan[book];
    if (ban && !/^(dolphin|pup|puppy)$/i.test(key)) {
      assert(!ban.test(ex.en + " " + sort.en + " " + say.en), book + " " + key + " stays off theme");
    }
  });
});

if (fails) {
  console.error(fails + " failed");
  process.exit(1);
}
console.log("all passed");
