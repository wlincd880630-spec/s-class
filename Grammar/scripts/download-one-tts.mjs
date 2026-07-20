import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const text = process.argv[2];
const out = process.argv[3];
const key = process.env.AZURE_SPEECH_KEY;
const region = process.env.AZURE_SPEECH_REGION || "eastasia";
const voice = "en-GB-RyanNeural";
const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const ssml = `<speak version='1.0' xml:lang='en-GB'><voice name='${voice}'>${esc}</voice></speak>`;
const r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
  method: "POST",
  headers: {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "application/ssml+xml",
    "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
  },
  body: ssml,
});
const buf = Buffer.from(await r.arrayBuffer());
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, buf);
console.log("OK", buf.length, out);
