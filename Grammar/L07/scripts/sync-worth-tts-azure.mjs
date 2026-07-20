#!/usr/bin/env node
/**
 * L07 worth more than — Azure TTS 离线 MP3 + 更新 manifest.embed.js
 *
 * 环境变量：
 *   AZURE_SPEECH_KEY / SPEECH_KEY
 *   AZURE_SPEECH_REGION（默认 eastasia）
 *
 * 用法（在 Grammar/L07 目录）：
 *   node scripts/sync-worth-tts-azure.mjs
 *   node scripts/sync-worth-tts-azure.mjs --dry-run
 *   node scripts/sync-worth-tts-azure.mjs --upload-cos
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const L07 = path.join(__dirname, "..");
const OUT_DIR = path.join(L07, "assets", "tts-mp3", "l07-google-mp3");
const MANIFEST_JS = path.join(OUT_DIR, "manifest.embed.js");
const ROOT = path.join(L07, "..", "..");
const COS_CONFIG = path.join(ROOT, ".cos-config.json");

/** 课件中 worth 相关朗读句（与 data-tts / speak() 字符串一致） */
const WORTH_PHRASES = [
  "Which is worth more, the mobile phone on the left or the mobile phone on the right?",
  "Which is worth more, the stamp or the coin?",
  "What is worth more than money or prizes?",
  "Which book is worth more to an English learner?",
  "The old stamp on the left is more worth than the silver coin on the right.",
  "The old stamp is more worth than the silver coin.",
  "The old stamp on the left is worth more than the silver coin on the right.",
  "The old stamp is worth more than the silver coin.",
  "Good health is worth more than anything else in the world.",
  "Good health is worth more than anything else.",
  "Good health is worth more than money.",
  "This second-hand dictionary is worth more than that new notebook.",
];

function norm(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
}

function hash14(text) {
  return crypto.createHash("sha1").update(norm(text), "utf8").digest("hex").slice(0, 14);
}

function escapeXmlText(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function azureSynthesizeMp3(text, key, region, outFile) {
  const voiceName = "en-GB-RyanNeural";
  const xmlSafe = escapeXmlText(text);
  const ssml = `<speak version='1.0' xml:lang='en-GB'><voice xml:lang='en-GB' xml:gender='Female' name='${voiceName}'>${xmlSafe}</voice></speak>`;
  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    },
    body: ssml,
  });
  const buf = Buffer.from(await res.arrayBuffer());
  if (!res.ok) {
    throw new Error(`Azure ${res.status}: ${buf.toString("utf8").slice(0, 300)}`);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
  return buf.length;
}

function loadManifestEmbed() {
  const raw = fs.readFileSync(MANIFEST_JS, "utf8");
  const m = raw.match(/__L07_LOCAL_MANIFEST_EMBED__\s*=\s*(\{[\s\S]*\});/);
  if (!m) throw new Error("无法解析 manifest.embed.js");
  return { raw, data: JSON.parse(m[1]) };
}

function nextIndex(entries) {
  let max = 0;
  for (const e of entries) {
    const mm = String(e.file || "").match(/^l07_(\d+)_/);
    if (mm) max = Math.max(max, parseInt(mm[1], 10));
  }
  return max + 1;
}

function writeManifestEmbed(data) {
  data.generatedAt = new Date().toISOString();
  data.provider = "azure-speech";
  data.voice = "en-GB-RyanNeural";
  data.audioEncoding = "MP3";
  const body =
    '"use strict";\n(function (g) {\n  if (!g) return;\n  g.__L07_LOCAL_MANIFEST_EMBED__ = ' +
    JSON.stringify(data) +
    ";\n})(typeof window !== \"undefined\" ? window : this);\n";
  fs.writeFileSync(MANIFEST_JS, body, "utf8");
}

function uploadToCos(files) {
  if (!fs.existsSync(COS_CONFIG)) {
    console.warn("无 .cos-config.json，跳过 COS 上传");
    return Promise.resolve();
  }
  const cfg = JSON.parse(fs.readFileSync(COS_CONFIG, "utf8"));
  const cos = new COS({ SecretId: cfg.SecretId, SecretKey: cfg.SecretKey });
  const prefix = "s-class/Grammar/L07/assets/tts-mp3/l07-google-mp3/";
  return Promise.all(
    files.map(
      (f) =>
        new Promise((resolve, reject) => {
          const key = prefix + path.basename(f);
          cos.putObject(
            {
              Bucket: cfg.Bucket,
              Region: cfg.Region,
              Key: key,
              Body: fs.createReadStream(f),
              ContentLength: fs.statSync(f).size,
            },
            (err) => (err ? reject(err) : resolve(key))
          );
        })
    )
  );
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const uploadCos = process.argv.includes("--upload-cos");
  const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
  const region = String(process.env.AZURE_SPEECH_REGION || "eastasia").trim();

  if (!dryRun && !key) {
    console.error("请设置 AZURE_SPEECH_KEY");
    process.exit(1);
  }

  const { data } = loadManifestEmbed();
  const existingTexts = new Set((data.entries || []).map((e) => norm(e.text)));
  let idx = nextIndex(data.entries || []);
  const created = [];

  for (const phrase of WORTH_PHRASES) {
    const text = norm(phrase);
    if (!text) continue;
    if (existingTexts.has(text)) {
      console.log("已有:", text);
      continue;
    }
    const file = `l07_${String(idx).padStart(4, "0")}_${hash14(text)}.mp3`;
    const outFile = path.join(OUT_DIR, file);
    idx++;

    if (dryRun) {
      console.log("[dry-run]", file, "←", text);
      created.push({ text, file, outFile });
      continue;
    }

    console.log("合成:", text);
    const bytes = await azureSynthesizeMp3(text, key, region, outFile);
    console.log("  →", file, `(${bytes} bytes)`);
    data.entries.push({
      text,
      file,
      voice: "en-GB-RyanNeural",
      provider: "azure",
    });
    existingTexts.add(text);
    created.push({ text, file, outFile });
  }

  if (!dryRun && created.length) {
    writeManifestEmbed(data);
    console.log(`已更新 manifest.embed.js（+${created.length} 条）`);
  }

  if (uploadCos && created.length && !dryRun) {
    console.log("上传到 COS…");
    const keys = await uploadToCos(created.map((c) => c.outFile));
    keys.forEach((k) => console.log("COS OK", k));
  }

  if (!created.length) console.log("无新增条目。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
