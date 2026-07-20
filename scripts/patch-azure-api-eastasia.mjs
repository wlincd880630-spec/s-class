#!/usr/bin/env node
/**
 * 全站 Azure Speech API 密钥/区域/英式男声慢速 批量更新
 * 用法: node scripts/patch-azure-api-eastasia.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");

const OLD_KEY =
  "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu";
const NEW_KEY =
  "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc";

const EXT = new Set([
  ".html",
  ".js",
  ".mjs",
  ".json",
  ".py",
  ".md",
  ".ps1",
  ".txt",
]);

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".cursor",
  "dist",
  "build",
]);

let filesChanged = 0;
let totalReplacements = 0;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      walk(full, out);
    } else if (EXT.has(path.extname(name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function patchContent(text, filePath) {
  let s = text;
  let n = 0;

  function rep(from, to) {
    if (!from || s.indexOf(from) === -1) return;
    const parts = s.split(from);
    const count = parts.length - 1;
    if (count > 0) {
      s = parts.join(to);
      n += count;
    }
  }

  // 1. API Key
  rep(OLD_KEY, NEW_KEY);

  // 2. Azure region (southeastasia → eastasia)
  rep("southeastasia", "eastasia");

  // 3. TTS voice → 英式男声 RyanNeural
  rep("en-US-AriaNeural", "en-GB-RyanNeural");
  rep("en-US-JennyNeural", "en-GB-RyanNeural");
  rep("en-US-AvaMultilingualNeural", "en-GB-RyanNeural");
  rep("en-US-GuyNeural", "en-GB-RyanNeural");
  rep("en-US-AndrewNeural", "en-GB-RyanNeural");
  rep("en-US-AvaNeural", "en-GB-RyanNeural");
  rep("en-US-ChristopherNeural", "en-GB-RyanNeural");
  rep("xml:lang='en-US'", "xml:lang='en-GB'");
  rep('xml:lang="en-US"', 'xml:lang="en-GB"');
  rep("Ava（美）", "Ryan（英）");

  // 4. STT / browser fallback → 英式英语
  rep('speechRecognitionLanguage = "en-US"', 'speechRecognitionLanguage = "en-GB"');
  rep("speechRecognitionLanguage = 'en-US'", "speechRecognitionLanguage = 'en-GB'");
  rep('speechRecognitionLanguage: "en-US"', 'speechRecognitionLanguage: "en-GB"');
  rep("speechRecognitionLanguage: 'en-US'", "speechRecognitionLanguage: 'en-GB'");
  rep("u.lang = 'en-US'", "u.lang = 'en-GB'");
  rep('u.lang = "en-US"', 'u.lang = "en-GB"');
  rep("rec.lang = locale === 'zh-CN' ? 'zh-CN' : 'en-US'", "rec.lang = locale === 'zh-CN' ? 'zh-CN' : 'en-GB'");
  rep('browserRec.lang = "en-US"', 'browserRec.lang = "en-GB"');
  rep("browserRec.lang = 'en-US'", "browserRec.lang = 'en-GB'");
  rep('isEn ? "en-US" : "zh-CN"', 'isEn ? "en-GB" : "zh-CN"');

  // 5. lesson-tts-azure-play.js: add slow prosody if missing
  if (filePath.endsWith("lesson-tts-azure-play.js")) {
    const oldSsml =
      "'<voice name=\"en-GB-RyanNeural\">' +\n      safe +\n      \"</voice></speak>\"";
    const newSsml =
      "'<voice name=\"en-GB-RyanNeural\"><prosody rate=\"0.90\">' +\n      safe +\n      \"</prosody></voice></speak>\"";
    rep(oldSsml, newSsml);
  }

  return { s, n };
}

const files = walk(ROOT);
for (const file of files) {
  const rel = path.relative(ROOT, file);
  if (rel === "scripts/patch-azure-api-eastasia.mjs") continue;
  if (rel.endsWith("azure_log.txt")) continue;
  const orig = fs.readFileSync(file, "utf8");
  const { s, n } = patchContent(orig, file);
  if (n > 0 && s !== orig) {
    filesChanged++;
    totalReplacements += n;
    if (!dryRun) fs.writeFileSync(file, s, "utf8");
    console.log(`${dryRun ? "[dry-run] " : ""}${rel} (${n} replacements)`);
  }
}

console.log(
  `\n${dryRun ? "Would update" : "Updated"} ${filesChanged} files, ${totalReplacements} total replacements.`
);

// Verify no old key remains
let remaining = 0;
for (const file of files) {
  const t = fs.readFileSync(file, "utf8");
  if (t.includes(OLD_KEY)) remaining++;
}
if (remaining > 0) {
  console.warn(`WARNING: ${remaining} files still contain OLD_KEY`);
  process.exitCode = 1;
} else {
  console.log("OK: No old API key remaining.");
}
