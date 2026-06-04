import fs from "fs";
import path from "path";

const L00 = path.resolve("L00-主谓宾与非谓语");
const manifest = {};
const t = fs.readFileSync(path.join(L00, "assets/l00-page4-tts-manifest.js"), "utf8");
const re = /"((?:[^"\\]|\\.){2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;
let m;
while ((m = re.exec(t))) manifest[m[1]] = m[2];

const missing = Object.values(manifest).filter(
  (rel) => !fs.existsSync(path.join(L00, rel))
);

const html = fs.readFileSync(path.join(L00, "page4.html"), "utf8");
const hasBroken = html.includes("encodeURIComponent(plainText)");
const orderOk =
  html.indexOf("l00-page4-tts-manifest.js") >= 0 &&
  html.indexOf("l00-page4-tts-manifest.js") < html.indexOf("lesson-tts-bootstrap.js");

console.log(
  JSON.stringify(
    {
      manifestKeys: Object.keys(manifest).length,
      missingMp3: missing.length,
      brokenInlineManifest: hasBroken,
      manifestBeforeBootstrap: orderOk,
    },
    null,
    2
  )
);
