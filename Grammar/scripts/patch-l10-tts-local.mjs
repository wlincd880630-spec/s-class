#!/usr/bin/env node
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "L10");
const OUT_DIR = path.join(ROOT, "assets", "tts-mp3");
const key = process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY;
const region = process.env.AZURE_SPEECH_REGION || "southeastasia";

function sha20(t) {
  return crypto.createHash("sha1").update(String(t), "utf8").digest("hex").slice(0, 20);
}
function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

const texts = new Set();
for (const name of fs.readdirSync(ROOT)) {
  if (!name.endsWith(".html")) continue;
  const html = fs.readFileSync(path.join(ROOT, name), "utf8");
  for (const m of html.matchAll(/data-tts="([^"]+)"/g)) texts.add(m[1]);
  for (const m of html.matchAll(/speakEn(?:Slow)?\(\s*("(?:\\.|[^"\\])*")/g)) {
    try {
      texts.add(JSON.parse(m[1]));
    } catch {}
  }
  for (const m of html.matchAll(/azureTtsRestPlay\(\s*buildSsml\(\s*("(?:\\.|[^"\\])*")/g)) {
    try {
      texts.add(JSON.parse(m[1]));
    } catch {}
  }
}

async function synth(text, out) {
  const ssml = `<speak version='1.0' xml:lang='en-GB'><voice name='en-GB-RyanNeural'>${text.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</voice></speak>`;
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
  if (!res.ok) throw new Error(res.status + " " + buf.toString().slice(0, 200));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
}

const manifest = {};
for (const raw of texts) {
  const t = norm(raw);
  if (!t) continue;
  const fn = sha20(t) + ".mp3";
  const out = path.join(OUT_DIR, fn);
  if (!fs.existsSync(out) || fs.statSync(out).size < 80) {
    if (!key) throw new Error("需要 AZURE_SPEECH_KEY");
    console.log("synth", fn, t.slice(0, 50));
    await synth(t, out);
    await new Promise((r) => setTimeout(r, 120));
  }
  manifest[t] = "assets/tts-mp3/" + fn;
}

const manJs =
  "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, " +
  JSON.stringify(manifest, null, 2) +
  ");\n";
fs.writeFileSync(path.join(ROOT, "assets", "l10-tts-manifest.js"), manJs, "utf8");

const PLAY_FN = `  function azureTtsRestPlay(ssml, onOk, onFail) {
    onOk = onOk || function () {};
    onFail = onFail || function () {};
    var plain = window.LessonTTSBootstrap && window.LessonTTSBootstrap.extractSsmlVoicePlain
      ? window.LessonTTSBootstrap.extractSsmlVoicePlain(ssml)
      : "";
    if (plain && window.LessonTTSBootstrap) {
      window.LessonTTSBootstrap.playLocalIfAvailable(plain).then(function (ok) {
        if (ok) onOk();
        else onFail(new Error("本地 MP3 未找到"));
      });
      return;
    }
    onFail(new Error("无朗读文本"));
  }`;

for (const name of fs.readdirSync(ROOT)) {
  if (!name.endsWith(".html")) continue;
  const p = path.join(ROOT, name);
  let html = fs.readFileSync(p, "utf8");
  if (!html.includes("function azureTtsRestPlay")) continue;
  if (!html.includes("lesson-tts-bootstrap.js")) {
    html = html.replace("</head>", '  <script src="../assets/lesson-tts-bootstrap.js"></script>\n  <script src="assets/l10-tts-manifest.js"></script>\n</head>');
  }
  html = html.replace(/function azureTtsRestPlay\([\s\S]*?\n  \}/, PLAY_FN);
  html = html.replace(/\s*const AZURE_SPEECH_KEY = "[^"]*";?\n/g, "\n");
  fs.writeFileSync(p, html, "utf8");
  console.log("patched", name);
}
console.log("manifest entries:", Object.keys(manifest).length);
