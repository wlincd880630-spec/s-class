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
assert(X.slug("Need to") === "need-to", "slug need-to");
assert(X.sentenceSrc({ key: "Play" }) === "images/sentences/play.png", "sentence src");
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

if (fails) {
  console.error(fails + " failed");
  process.exit(1);
}
console.log("all passed");
