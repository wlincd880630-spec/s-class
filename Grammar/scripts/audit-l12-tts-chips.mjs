import fs from "fs";
import path from "path";

const root = path.resolve("L12");
const manifest = {};
const handout = path.join(root, "assets", "handout-tts-manifest.js");
if (fs.existsSync(handout)) {
  const t = fs.readFileSync(handout, "utf8");
  const re = /"([^"]{2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;
  let m;
  while ((m = re.exec(t))) manifest[m[1]] = m[2];
}

const html = fs.readFileSync(path.join(root, "lesson12-page07-handout.html"), "utf8");
const chipRe = /data-tts="([^"]+)"/g;
const miss = [];
const noFile = [];
let cm;
while ((cm = chipRe.exec(html))) {
  const key = cm[1];
  const rel = manifest[key];
  if (!rel) miss.push(key.slice(0, 80));
  else {
    const fp = path.join(root, rel);
    if (!fs.existsSync(fp)) noFile.push(rel);
  }
}
console.log(JSON.stringify({ chips: (html.match(/data-tts=/g) || []).length, manifestKeys: Object.keys(manifest).length, keyMiss: miss.length, fileMiss: noFile.length, sampleKeyMiss: miss.slice(0, 5), sampleFileMiss: noFile.slice(0, 5) }, null, 2));
