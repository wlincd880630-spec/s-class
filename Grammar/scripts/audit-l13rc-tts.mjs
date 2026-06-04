import fs from "fs";
import path from "path";

const root = path.resolve("L13-定语从句");
const htmlFiles = fs.readdirSync(root).filter((n) => n.endsWith(".html"));

const MANIFEST_RE =
  /"((?:[^"\\]|\\.){2,500})":\s*"([^"]+\.mp3)"/g;
const SPEAK_RE =
  /(?:window\.speak|speak)\(\s*['"]((?:\\.|[^'"])+)['"]/g;
const CHIP_RE = /data-tts="([^"]+)"/g;
const TEXT_FIELD_RE = /text:\s*['"]((?:\\.|[^'"])+)['"]/g;

const manifest = {};
function ingestFile(filePath) {
  const t = fs.readFileSync(filePath, "utf8");
  let m;
  while ((m = MANIFEST_RE.exec(t))) manifest[m[1]] = m[2];
}

for (const name of htmlFiles) ingestFile(path.join(root, name));
const assetsDir = path.join(root, "assets");
for (const name of fs.readdirSync(assetsDir)) {
  if (name.endsWith("-manifest.js") || name.endsWith("-tts-manifest.js")) {
    ingestFile(path.join(assetsDir, name));
  }
}

const speakTexts = new Set();
const chipTexts = new Set();
const narrationTexts = new Set();

for (const name of htmlFiles) {
  const t = fs.readFileSync(path.join(root, name), "utf8");
  let m;
  while ((m = SPEAK_RE.exec(t))) {
    speakTexts.add(m[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  }
  while ((m = CHIP_RE.exec(t))) chipTexts.add(m[1]);
  while ((m = TEXT_FIELD_RE.exec(t))) {
    const tx = m[1].replace(/\\'/g, "'").trim();
    if (tx) narrationTexts.add(tx);
  }
}

const missingMp3 = [];
const wrongPath = [];
for (const [k, rel] of Object.entries(manifest)) {
  if (rel.includes("../L13/")) wrongPath.push(rel);
  const fp = path.join(root, rel.replace(/^\.\.\/L13\//, "").replace(/^\.\.\//, ""));
  const fp2 = path.join(root, rel.replace(/^\.\.\//, ""));
  const canonical = rel.replace(/^\.\.\/L13\//, "").replace(/^\.\.\//, "");
  const fpCanon = path.join(root, canonical);
  if (!fs.existsSync(fpCanon)) missingMp3.push(canonical);
}

const unmappedSpeak = [...speakTexts].filter((t) => !manifest[t]);
const unmappedChips = [...chipTexts].filter((t) => !manifest[t]);
const unmappedNarr = [...narrationTexts].filter((t) => !manifest[t]);

const bootstrapBeforeManifest = [];
for (const name of htmlFiles) {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  const bootIdx = html.indexOf("lesson-tts-bootstrap.js");
  const manIdx = html.indexOf("handout-tts-manifest.js");
  if (bootIdx >= 0 && manIdx >= 0 && bootIdx < manIdx) {
    bootstrapBeforeManifest.push(name);
  }
}

console.log(
  JSON.stringify(
    {
      htmlFiles: htmlFiles.length,
      manifestKeys: Object.keys(manifest).length,
      wrongPathCount: wrongPath.length,
      missingMp3: missingMp3.length,
      sampleMissingMp3: missingMp3.slice(0, 8),
      unmappedSpeak: unmappedSpeak.length,
      sampleUnmappedSpeak: unmappedSpeak.slice(0, 5),
      unmappedChips: unmappedChips.length,
      unmappedNarration: unmappedNarr.length,
      sampleUnmappedNarr: unmappedNarr.slice(0, 5),
      bootstrapBeforeManifest,
    },
    null,
    2
  )
);
