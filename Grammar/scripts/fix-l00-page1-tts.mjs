#!/usr/bin/env node
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const L00 = path.join(ROOT, "L00-主谓宾与非谓语");
const MP3_DIR = path.join(L00, "assets", "tts-mp3");

const S1 = "What do these pictures tell us about Steven?";
const S2 = "Can you compose a sentence using what you see in the pictures?";
const SCOMB = S1 + " " + S2;

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

function loadAzure() {
  const fp = path.join(ROOT, "L03", "assets", "lesson-tts-azure-config.js");
  const c = fs.readFileSync(fp, "utf8");
  const km = c.match(/var\s+AZURE_KEY\s*=\s*"([^"]+)"/);
  const rm = c.match(/var\s+AZURE_REGION\s*=\s*"([^"]+)"/);
  return { key: km?.[1]?.trim() || "", region: rm?.[1]?.trim() || "eastasia" };
}

async function azureSynth(text, key, region, outFile) {
  const esc = String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const ssml = `<speak version='1.0' xml:lang='en-GB'><voice xml:lang='en-GB' name='en-GB-RyanNeural'>${esc}</voice></speak>`;
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    },
    body: ssml,
  });
  const buf = Buffer.from(await res.arrayBuffer());
  if (!res.ok) throw new Error(`Azure ${res.status}`);
  if (buf.length < 80) throw new Error("too small");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
  console.log("wrote", path.basename(outFile), buf.length);
}

const { key, region } = loadAzure();
if (!key) {
  console.error("no azure key");
  process.exit(1);
}

for (const t of [S1, S2]) {
  const fn = sha20(t) + ".mp3";
  const out = path.join(MP3_DIR, fn);
  if (fs.existsSync(out) && fs.statSync(out).size > 80) {
    console.log("skip", fn);
    continue;
  }
  await azureSynth(t, key, region, out);
  await new Promise((r) => setTimeout(r, 120));
}

// verify page1 manifest key
const page1 = fs.readFileSync(path.join(L00, "page1.html"), "utf8");
const m = page1.match(/data-tts-read="([^"]+)"/);
const dec = decodeURIComponent(m[1]);
console.log("button dec === combined?", dec === SCOMB);
console.log("manifest has combined?", page1.includes(JSON.stringify(SCOMB)));
