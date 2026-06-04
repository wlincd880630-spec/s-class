import fs from "fs";
import path from "path";

const root = path.resolve("L06");
const pages = fs
  .readdirSync(root)
  .filter((n) => n.startsWith("lesson06-") && n.endsWith(".html"));

const manifest = {};
const MANIFEST_RE =
  /"((?:[^"\\]|\\.){2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;

function ingestFile(filePath) {
  const t = fs.readFileSync(filePath, "utf8");
  let m;
  while ((m = MANIFEST_RE.exec(t))) manifest[m[1]] = m[2];
}

for (const p of pages) ingestFile(path.join(root, p));
for (const name of fs.readdirSync(path.join(root, "assets"))) {
  if (name.endsWith("-manifest.js") || name.endsWith("-tts-manifest.js")) {
    ingestFile(path.join(root, "assets", name));
  }
}

const missingMp3 = [];
for (const rel of Object.values(manifest)) {
  const fp = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fp)) missingMp3.push(rel);
}

const brokenSpeak = [];
const bootstrapBeforeManifest = [];
const azureOnly = [];
const pageMp3Paths = {};

for (const name of pages) {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  if (
    /playLocalIfAvailable\(t\)\.then[\s\S]{0,120}\}\);\s*\}\s*\n\s*fetch\(/.test(
      html
    )
  ) {
    brokenSpeak.push(name);
  }
  const bootIdx = html.indexOf("lesson-tts-bootstrap.js");
  const manIdx = html.indexOf("handout-tts-manifest.js");
  if (bootIdx >= 0 && manIdx >= 0 && bootIdx < manIdx) {
    bootstrapBeforeManifest.push(name);
  }
  if (
    /speakSsmlAsync|SpeechSDK|lesson-tts-azure/.test(html) &&
    !/assets\/tts-mp3\/l06-page/.test(html) &&
    !html.includes("handout-tts-manifest")
  ) {
    if (!/playLocalMp3Url|playLocalIfAvailable|__LESSON_TTS_MANIFEST/.test(html)) {
      azureOnly.push(name);
    }
  }
  const paths = new Set();
  for (const m of html.matchAll(/assets\/tts-mp3\/[^"'\s]+/g) || []) {
    paths.add(m[0]);
  }
  if (paths.size) pageMp3Paths[name] = [...paths].slice(0, 3);

  const chips = [...html.matchAll(/data-tts="([^"]+)"/g)].map((x) => x[1].trim());
  const miss = chips.filter((c) => !manifest[c]);
  if (miss.length) {
    console.log(name, "unmapped chips:", miss.length, "sample:", miss.slice(0, 2));
  }
}

console.log(
  JSON.stringify(
    {
      pages: pages.length,
      manifestKeys: Object.keys(manifest).length,
      missingMp3: missingMp3.length,
      sampleMissingMp3: missingMp3.slice(0, 6),
      brokenSpeakAzure: brokenSpeak,
      bootstrapBeforeManifest,
      azureOnlyPages: azureOnly,
      pageMp3Paths,
    },
    null,
    2
  )
);
