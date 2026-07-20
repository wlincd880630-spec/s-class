#!/usr/bin/env node
/** L15 · Azure TTS 批量下载（全库语料 + 页面短语） */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const L15 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../L15");
const OUT = path.join(L15, "assets", "tts-mp3");
const JSON_PATH = path.join(L15, "data", "chengdu-exam-vocab-master.json");
const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");
const delayMs = Number(process.env.TTS_DELAY_MS || "120");

const key = process.env.AZURE_SPEECH_KEY;
const region = process.env.AZURE_SPEECH_REGION || "eastasia";
if (!key && !dryRun) {
  console.error("Set AZURE_SPEECH_KEY and optionally AZURE_SPEECH_REGION");
  process.exit(1);
}

function sha20(t) {
  return crypto.createHash("sha1").update(String(t), "utf8").digest("hex").slice(0, 20);
}
function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}
function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function hasCjk(t) {
  return /[\u3400-\u9fff]/.test(String(t || ""));
}
function pickVoice(text) {
  return hasCjk(text) ? "zh-CN-XiaoxiaoNeural" : "en-GB-RyanNeural";
}
function ttsPlain(text) {
  // 箭头转化：读成 "quick, quickly" 更易懂
  return String(text)
    .replace(/\s*→\s*/g, ", ")
    .replace(/\s*\/\s*/g, ", ")
    .replace(/…/g, "...")
    .trim();
}

async function synth(text, outFile, retries = 3) {
  const spoken = ttsPlain(text);
  const voice = pickVoice(spoken);
  const lang = hasCjk(spoken) ? "zh-CN" : "en-US";
  const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${voice}">${escapeXml(spoken)}</voice></speak>`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      body: ssml,
    });
    if (res.ok) {
      fs.writeFileSync(outFile, Buffer.from(await res.arrayBuffer()));
      return;
    }
    const err = await res.text();
    if (attempt === retries) throw new Error(err.slice(0, 300));
    await sleep(400 * attempt);
  }
}

function collectTexts() {
  const texts = new Set();

  // ① 主语料 JSON
  if (fs.existsSync(JSON_PATH)) {
    const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
    for (const it of data.items || []) {
      if (it.en) texts.add(norm(it.en));
    }
  }

  // ② HTML data-tts
  for (const f of fs.readdirSync(L15).filter((x) => x.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(L15, f), "utf8");
    for (const m of html.matchAll(/data-tts="([^"]+)"/g)) texts.add(norm(m[1]));
  }

  // ③ 图表句型 + 小测（从 corpus pool 提取）
  const corpusPath = path.join(L15, "l15-corpus-pool.js");
  if (fs.existsSync(corpusPath)) {
    const corpus = fs.readFileSync(corpusPath, "utf8");
    for (const m of corpus.matchAll(/"en":\s*"((?:\\.|[^"\\])*)"/g)) {
      try {
        texts.add(norm(JSON.parse('"' + m[1].replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"')));
      } catch {
        texts.add(norm(m[1]));
      }
    }
    for (const m of corpus.matchAll(/stem:\s*"((?:\\.|[^"\\])*)"/g)) {
      texts.add(norm(m[1]));
    }
  }

  // ④ 教学示范句
  [
    "Word formation means changing the form of a word.",
    "Suffix ly turns an adjective into an adverb.",
    "Their books are on the desk.",
    "Discovery changed history.",
    "Death is a serious topic.",
    "Quickly, the paint disappeared.",
    "Make sure you finish your homework.",
    "According to the chart, most students prefer running.",
    "Keep calm and carry on.",
    "Get used to reading every day.",
    "Suddenly belongs to adverbs.",
    "Children is the plural of child.",
  ].forEach((t) => texts.add(norm(t)));

  return [...texts].filter((t) => t.length > 0 && t.length <= 300);
}

fs.mkdirSync(OUT, { recursive: true });
const allTexts = collectTexts();
console.log("Region:", region);
console.log("Texts to process:", allTexts.length, force ? "(force)" : "");

const manifest = {};
let downloaded = 0;
let skipped = 0;
let failed = 0;

for (let i = 0; i < allTexts.length; i++) {
  const t = allTexts[i];
  const fn = sha20(t) + ".mp3";
  const out = path.join(OUT, fn);
  manifest[t] = "assets/tts-mp3/" + fn;

  if (!force && fs.existsSync(out) && fs.statSync(out).size > 80) {
    skipped++;
    continue;
  }
  if (dryRun) {
    console.log(`[${i + 1}/${allTexts.length}] would`, t.slice(0, 60));
    continue;
  }

  try {
    await synth(t, out);
    downloaded++;
    if (downloaded % 25 === 0 || downloaded <= 3) {
      console.log(`[${i + 1}/${allTexts.length}] OK`, fn, t.slice(0, 50));
    }
    await sleep(delayMs);
  } catch (e) {
    failed++;
    console.error("FAIL", t.slice(0, 60), e.message);
  }
}

const manJs =
  "window.__LESSON_TTS_MANIFEST = " + JSON.stringify(manifest, null, 2) + ";\n";
fs.writeFileSync(path.join(L15, "assets", "l15-tts-manifest.js"), manJs, "utf8");

console.log("---");
console.log("manifest entries:", Object.keys(manifest).length);
console.log("downloaded:", downloaded, "skipped:", skipped, "failed:", failed);
console.log("mp3 dir:", OUT);
