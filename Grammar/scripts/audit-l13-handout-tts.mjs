import fs from "fs";
import path from "path";

const root = path.resolve("L13");
const html = fs.readFileSync(path.join(root, "lesson13-page08-handout.html"), "utf8");
const MANIFEST_RE =
  /"((?:[^"\\]|\\.){2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;
const manifest = {};
const t = fs.readFileSync(path.join(root, "assets/handout-tts-manifest.js"), "utf8");
let m;
while ((m = MANIFEST_RE.exec(t))) manifest[m[1]] = m[2];

const chips = [...html.matchAll(/data-tts="([^"]+)"/g)].map((x) => x[1]);
const missingMp3 = [];
const unmapped = chips.filter((c) => !manifest[c]);
for (const rel of Object.values(manifest)) {
  if (!fs.existsSync(path.join(root, rel))) missingMp3.push(rel);
}

const bootIdx = html.indexOf("lesson-tts-bootstrap.js");
const manIdx = html.indexOf("handout-tts-manifest.js");

console.log(
  JSON.stringify(
    {
      chips: chips.length,
      manifestKeys: Object.keys(manifest).length,
      unmappedChips: unmapped.length,
      missingMp3: missingMp3.length,
      bootstrapBeforeManifest: bootIdx >= 0 && manIdx >= 0 && bootIdx < manIdx,
      sampleUnmapped: unmapped.slice(0, 3),
      sampleMissing: missingMp3.slice(0, 3),
    },
    null,
    2
  )
);
