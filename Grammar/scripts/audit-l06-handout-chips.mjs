import fs from "fs";
import path from "path";

const root = path.resolve("L06");
const html = fs.readFileSync(path.join(root, "lesson06-page10-handout.html"), "utf8");
const m = {};
const re = /"((?:[^"\\]|\\.){2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;
for (const name of ["handout-tts-manifest.js"]) {
  const man = fs.readFileSync(path.join(root, "assets", name), "utf8");
  let x;
  while ((x = re.exec(man))) m[x[1]] = x[2];
}
const chips = [...html.matchAll(/data-tts="([^"]+)"/g)].map((a) => a[1]);
const miss = chips.filter((c) => !m[c]);
const fileMiss = [];
for (const c of chips) {
  const rel = m[c];
  if (!rel) continue;
  if (!fs.existsSync(path.join(root, rel))) fileMiss.push(rel);
}
console.log(JSON.stringify({ chips: chips.length, keyMiss: miss.length, fileMiss: fileMiss.length, sampleKeyMiss: miss.slice(0, 5) }, null, 2));
