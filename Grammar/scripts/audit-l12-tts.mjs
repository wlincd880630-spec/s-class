import fs from "fs";
import path from "path";

const root = path.resolve("L12");
const mp3Dir = path.join(root, "assets", "tts-mp3");
const manifest = {};

function ingestFile(filePath) {
  const t = fs.readFileSync(filePath, "utf8");
  const re = /"([^"]{2,500})":\s*"(assets\/tts-mp3\/[^"]+\.mp3)"/g;
  let m;
  while ((m = re.exec(t))) manifest[m[1]] = m[2];
}

for (const name of fs.readdirSync(root)) {
  if (name.startsWith("lesson12-page") && name.endsWith(".html")) {
    ingestFile(path.join(root, name));
  }
}
const handout = path.join(root, "assets", "handout-tts-manifest.js");
if (fs.existsSync(handout)) ingestFile(handout);
for (const name of fs.readdirSync(path.join(root, "assets"))) {
  if (name.endsWith("-tts-manifest.js")) {
    ingestFile(path.join(root, "assets", name));
  }
}

const missing = [];
for (const rel of Object.values(manifest)) {
  const fp = path.join(root, rel.replace(/^assets\//, "assets/"));
  if (!fs.existsSync(fp)) missing.push(rel);
}

// page04 speakEn phrases without manifest
const p04 = fs.readFileSync(path.join(root, "lesson12-page04-wh-if-object-clauses.html"), "utf8");
const speakRe = /speakEn(?:Slow)?\(\s*["']([^"']+)["']/g;
const p04Missing = [];
let sm;
while ((sm = speakRe.exec(p04))) {
  const phrase = sm[1].trim();
  if (!manifest[phrase]) p04Missing.push(phrase);
}

console.log(JSON.stringify({
  manifestKeys: Object.keys(manifest).length,
  missingMp3: missing.length,
  page04Unmapped: p04Missing.length,
  sampleMissing: missing.slice(0, 8),
  sampleP04: p04Missing.slice(0, 12),
}, null, 2));
