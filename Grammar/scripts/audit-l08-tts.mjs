import fs from "fs";
import path from "path";

const root = path.resolve("L08");
const pages = fs
  .readdirSync(root)
  .filter((n) => n.startsWith("lesson08-page") && n.endsWith(".html"));

const manifest = {};
const MANIFEST_RE =
  /"((?:[^"\\]|\\.){2,500})":\s*"(assets\/(?:tts-mp3|audio)\/[^"]+\.mp3)"/g;

function ingestFile(filePath) {
  const t = fs.readFileSync(filePath, "utf8");
  let m;
  while ((m = MANIFEST_RE.exec(t))) manifest[m[1]] = m[2];
}

for (const p of pages) ingestFile(path.join(root, p));
for (const name of ["handout-tts-manifest.js", "l08-handout-manifest.embed.js"]) {
  const fp = path.join(root, "assets", name);
  if (fs.existsSync(fp)) ingestFile(fp);
}

const missingMp3 = [];
for (const rel of Object.values(manifest)) {
  const fp = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fp)) missingMp3.push(rel);
}

const brokenSpeak = [];
const bootstrapBeforeManifest = [];
const noPlayLocal = [];

for (const name of pages) {
  const fp = path.join(root, name);
  const html = fs.readFileSync(fp, "utf8");
  if (!html.includes("play-local-mp3.js")) noPlayLocal.push(name);
  if (
    /playLocalIfAvailable\(t\)\.then\(function \(ok\)/.test(html) &&
    /playLocalIfAvailable\(t\)\.then[\s\S]{0,120}\}\);\s*\}\s*\n\s*fetch\(/.test(html)
  ) {
    brokenSpeak.push(name);
  }
  const bootIdx = html.indexOf("lesson-tts-bootstrap.js");
  const manIdx = html.indexOf("__LESSON_TTS_MANIFEST");
  if (bootIdx >= 0 && manIdx >= 0 && bootIdx < manIdx) {
    bootstrapBeforeManifest.push(name);
  }
  const chips = [...html.matchAll(/data-tts="([^"]+)"/g)].map((x) => x[1].trim());
  const unmapped = chips.filter((c) => !manifest[c]);
  if (unmapped.length) {
    console.log(name, "unmapped chips:", unmapped.length, unmapped.slice(0, 3));
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
      noPlayLocal,
    },
    null,
    2
  )
);
