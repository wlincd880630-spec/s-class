#!/usr/bin/env node
/**
 * 为 L13 page01 缺失的 8 句生成 MP3，并写入 page01 manifest。
 * 需要环境变量 AZURE_SPEECH_KEY（可选 AZURE_SPEECH_REGION，默认 southeastasia）。
 * 生成后请运行 scripts/upload-media-to-cos.js 上传 L13/assets/tts-mp3。
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = path.join(ROOT, "L13", "lesson13-page01-timeline-intro.html");
const OUT_DIR = path.join(ROOT, "L13", "assets", "tts-mp3");
const COS =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L13/assets/tts-mp3/";

const PHRASES = [
  "I was hungry yesterday afternoon, because I hadn't eaten anything for breakfast that morning.",
  "When we met at the museum gate, Tom had been worried for an hour.",
  "We hadn't been ready when the teacher started the quiz.",
  "Had you finished your homework before the lights went out?",
  "Had we been in our seats before the film began?",
  "What had you done before the lights went out?",
  "How long had you been hungry before you ate lunch?",
  "I am hungry, because I haven't eaten anything for breakfast.",
];

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

async function downloadTts(text, outPath) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION || "southeastasia";
  if (!key) throw new Error("缺少 AZURE_SPEECH_KEY");
  const voice = "en-US-AvaNeural";
  const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const ssml = `<speak version='1.0' xml:lang='en-US'><voice name='${voice}'>${esc}</voice></speak>`;
  const r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    },
    body: ssml,
  });
  if (!r.ok) throw new Error(`Azure TTS ${r.status} for: ${text.slice(0, 60)}`);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

function addToManifest(entries) {
  let html = fs.readFileSync(TARGET, "utf8");
  const blockRe =
    /(window\.__LESSON_TTS_MANIFEST\s*=\s*Object\.assign\(window\.__LESSON_TTS_MANIFEST\s*\|\|\s*\{\}\s*,\s*\{)([\s\S]*?)(\n\}\);)/;
  const match = html.match(blockRe);
  if (!match) throw new Error("manifest block not found");
  const current = {};
  const re = /"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(match[2]))) current[m[1]] = m[2];
  Object.assign(current, entries);
  const lines = Object.entries(current)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join("\n");
  html = html.replace(blockRe, `$1\n${lines}\n$3`);
  fs.writeFileSync(TARGET, html, "utf8");
}

const newEntries = {};
for (const text of PHRASES) {
  const file = sha20(text) + ".mp3";
  const out = path.join(OUT_DIR, file);
  if (!fs.existsSync(out)) {
    const n = await downloadTts(text, out);
    console.log("generated", n, "bytes", file);
  } else {
    console.log("exists", file);
  }
  newEntries[text] = COS + file;
}

addToManifest(newEntries);
console.log("manifest updated with", Object.keys(newEntries).length, "entries");
