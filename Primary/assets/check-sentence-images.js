/* node Primary/assets/check-sentence-images.js */
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var courses = {
  "play-kitty": "Primary/Play Kitty/play-kitty-courseware/images/sentences",
  "jump-pup": "Primary/Jump Pup/jump-pup-courseware/images/sentences",
  "peek-otter": "Primary/Peek Otter/peek-otter-courseware/images/sentences",
  "dive-dolphin": "Primary/Dive Dolphin/dive-dolphin-courseware/images/sentences",
  helpers: "Primary/Helpers in your neighborhood/helpers-neighborhood-courseware/images/sentences",
  "flutter-butterfly": "Primary/Flutter Butterfly/flutter-butterfly-courseware/images/sentences"
};

var extras = { window: {}, document: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "ng-word-extras.js"), "utf8"), extras);
var X = extras.window.NGWordExtras;

var say = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "ng-word-say-data.js"), "utf8"), say);
var map = say.window.NG_WORD_SAY;

var missing = [];
var present = 0;
var kinds = ["ex", "sort", "say"];

Object.keys(courses).forEach(function (book) {
  var dir = path.join("/workspace", courses[book]);
  Object.keys(map[book]).forEach(function (key) {
    kinds.forEach(function (kind) {
      var rel = X.sceneSrc({ key: key }, kind);
      var file = path.basename(rel);
      var p = path.join(dir, file);
      if (fs.existsSync(p) && fs.statSync(p).size > 1000) present += 1;
      else missing.push(book + "/" + file);
    });
  });
});

console.log("present", present);
console.log("missing", missing.length);
if (missing.length) console.log(missing.join("\n"));
process.exit(missing.length ? 1 : 0);
