/* node Primary/assets/check-sentence-images.js */
var fs = require("fs");
var path = require("path");
var vm = require("vm");
var root = path.join(__dirname, "..");
var ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "ng-word-say-data.js"), "utf8"), ctx);
var prompts = JSON.parse(fs.readFileSync(path.join(__dirname, "ng-word-sentence-prompts.json"), "utf8"));
var missing = [];
var present = [];
Object.keys(prompts.courses).forEach(function (name) {
  var course = prompts.courses[name];
  var dir = path.join("/workspace", course.dir);
  course.items.forEach(function (item) {
    var p = path.join(dir, item.file);
    if (fs.existsSync(p) && fs.statSync(p).size > 1000) present.push(p);
    else missing.push(name + "/" + item.file);
  });
});
console.log("present", present.length);
console.log("missing", missing.length);
if (missing.length) console.log(missing.join("\n"));
process.exit(missing.length ? 1 : 0);
