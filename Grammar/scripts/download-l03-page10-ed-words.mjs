#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "L03", "assets", "tts-mp3");
const WORDS = [
  "worked",
  "stopped",
  "practiced",
  "washed",
  "helped",
  "played",
  "lived",
  "achieved",
  "realized",
  "enjoyed",
  "wanted",
  "needed",
  "decided",
  "started",
  "shouted",
];
const key = String(process.env.AZURE_SPEECH_KEY || "").trim();
const region = String(process.env.AZURE_SPEECH_REGION || "southeastasia").trim();
const voice = "en-US-AvaNeural";

if (!key) {
  console.error("需要 AZURE_SPEECH_KEY");
  process.exit(1);
}

async function synth(word, outFile) {
  const esc = word.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ssml = `<speak version='1.0' xml:lang='en-US'><voice name='${voice}'>${esc}</voice></speak>`;
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
  if (!res.ok) throw new Error(`${word} HTTP ${res.status}`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
  console.log("OK", word, buf.length);
}

for (const w of WORDS) {
  await synth(w, path.join(OUT_DIR, `ed-${w}.mp3`));
  await new Promise((r) => setTimeout(r, 90));
}
