#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const text =
  "We use the Present Simple to talk about habits, facts, schedules, and states.";
const out = path.join(ROOT, "L01", "assets", "tts-mp3", "bbcba0177c26186a49e2.mp3");

const cfg = fs.readFileSync(path.join(ROOT, "L03", "assets", "lesson-tts-azure-config.js"), "utf8");
const key = cfg.match(/AZURE_KEY = "([^"]+)"/)[1];
const region = cfg.match(/AZURE_REGION = "([^"]+)"/)[1];
const esc = text
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");
const ssml = `<speak version='1.0' xml:lang='en-GB'><voice name='en-GB-RyanNeural'>${esc}</voice></speak>`;
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
if (!res.ok) throw new Error(String(res.status));
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, buf);
console.log("wrote", out, buf.length);
