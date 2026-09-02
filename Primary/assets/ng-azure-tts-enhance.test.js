/* node Primary/assets/ng-azure-tts-enhance.test.js */
var fs = require("fs");
var path = require("path");
var vm = require("vm");
var ctx = { window: {}, document: { createElement: function () { return {}; }, head: { appendChild: function () {} } } };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "ng-azure-tts-enhance.js"), "utf8"), ctx);
var T = ctx.window.NgAzureTTS;
var fails = 0;
function assert(cond, msg) {
  if (!cond) {
    fails += 1;
    console.error("FAIL", msg);
  } else {
    console.log("ok", msg);
  }
}

assert(T.RATE_SLOW === 0.5, "slow is half speed");
assert(T.RATE_NORMAL === 1, "normal is 1");
assert(T.resolveTargetRate({ slow: true }) === 0.5, "slow flag -> 0.5");
assert(T.resolveTargetRate({ slow: false }) === 1, "normal flag -> 1");
assert(T.resolveTargetRate({ rate: 0.7 }) === 0.5, "legacy 0.7 maps to half");
assert(T.resolveTargetRate({ rate: 0.8 }) === 0.5, "legacy 0.8 maps to half");
assert(T.resolveTargetRate({ rate: 1 }) === 1, "rate 1 stays normal");
assert(T.storyOpts(true).rate === 0.5 && T.storyOpts(true).slow === true, "storyOpts slow");
assert(T.storyOpts(true).azureOnly === true, "storyOpts slow is Azure-only");
assert(T.storyOpts(false).rate === 1 && T.storyOpts(false).slow === false, "storyOpts normal");
assert(T.storyOpts(false).azureOnly === true, "storyOpts normal is Azure-only");
assert(typeof T.speakStory === "function", "speakStory exported");
assert(T.AZURE.voice === "en-GB-RyanNeural", "textbook British male voice");
assert(T.textVariants("on-the-ice").indexOf("on the ice") >= 0, "hyphen slug maps to phrase");
assert(T.textVariants("cant").indexOf("can't") >= 0, "cant maps to can't");
assert(T.AZURE.slowRate === "-50%", "Azure SSML uses -50%");

ctx.window.LocalAudio = { speak: function () {}, stop: function () {} };
ctx.window.__LOCAL_AUDIO_MANIFEST = { lookup: { "Hello|0.80": "clip.mp3" } };
T.enhance("LocalAudio");
ctx.window.LocalAudio.speak("Hello", { azureOnly: true, slow: true });
assert(ctx.window.NgAzureTTS.lastSpeak.source !== "local", "azureOnly skips local clips");
assert(String(ctx.window.NgAzureTTS.lastSsml).indexOf("en-GB-RyanNeural") >= 0, "story SSML uses Ryan");
assert(String(ctx.window.NgAzureTTS.lastSsml).indexOf('rate="-50%"') >= 0, "slow SSML is -50%");

if (fails) {
  console.error(fails + " failed");
  process.exit(1);
}
console.log("all passed");
