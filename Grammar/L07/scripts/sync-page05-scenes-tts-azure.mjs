#!/usr/bin/env node
/**
 * L07 Page05 双场景比较级句子 — Azure TTS 离线 MP3 + 更新 manifest.embed.js
 *
 * 环境变量：
 *   AZURE_SPEECH_KEY / SPEECH_KEY（也可用 shared/lesson-tts-azure-config.js 中的 key）
 *   AZURE_SPEECH_REGION（默认 southeastasia）
 *
 * 用法：
 *   node Grammar/L07/scripts/sync-page05-scenes-tts-azure.mjs
 *   node Grammar/L07/scripts/sync-page05-scenes-tts-azure.mjs --dry-run
 *   node Grammar/L07/scripts/sync-page05-scenes-tts-azure.mjs --upload-cos
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import vm from "vm";
import COS from "cos-nodejs-sdk-v5";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const L07 = path.join(__dirname, "..");
const ROOT = path.join(L07, "..", "..");
const OUT_DIR = path.join(L07, "assets", "tts-mp3", "l07-google-mp3");
const MANIFEST_JS = path.join(OUT_DIR, "manifest.embed.js");
const SCENES_JS = path.join(L07, "lesson07-page05-scenes-data.js");
const COS_CONFIG = path.join(ROOT, ".cos-config.json");
const AZURE_CFG = path.join(ROOT, "Grammar", "shared", "lesson-tts-azure-config.js");

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

function loadPhrasesFromScenes() {
  const code = fs.readFileSync(SCENES_JS, "utf8");
  const sandbox = { window: {}, this: {} };
  sandbox.window = sandbox;
  vm.runInNewContext(code, sandbox, { filename: "lesson07-page05-scenes-data.js" });
  const lessons = sandbox.L07_P05_LESSONS || [];
  const out = [];
  const seen = new Set();
  for (const L of lessons) {
    for (const sc of L.scenes || []) {
      const t = norm(sc.sentence);
      if (!t || seen.has(t)) continue;
      seen.add(t);
      out.push(t);
    }
    const listen = norm(L.listen);
    if (listen && !seen.has(listen)) {
      seen.add(listen);
      out.push(listen);
    }
  }
  return out;
}

function readAzureKeyFromConfig() {
  try {
    const raw = fs.readFileSync(AZURE_CFG, "utf8");
    const km = raw.match(/AZURE_KEY\s*=\s*"([^"]+)"/);
    const rm = raw.match(/AZURE_REGION\s*=\s*"([^"]+)"/);
    return {
      key: km ? km[1] : "",
      region: rm ? rm[1] : "eastasia",
    };
  } catch {
    return { key: "", region: "southeastasia" };
  }
}

async function azureSynthesizeMp3(text, key, region, outFile) {
  const voiceName = "en-GB-RyanNeural";
  const xmlSafe = escapeXmlText(text);
  const ssml = `<speak version='1.0' xml:lang='en-GB'><voice xml:lang='en-GB' name='${voiceName}'><prosody rate='0.90'>${xmlSafe}</prosody></voice></speak>`;
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
  if (buf.length < 200) throw new Error(`Azure empty audio for: ${text}`);
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
  data.provider = data.provider || "azure-speech";
  data.voice = data.voice || "en-GB-RyanNeural";
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
    return Promise.resolve([]);
  }
  const cfg = JSON.parse(fs.readFileSync(COS_CONFIG, "utf8"));
  const cos = new COS({
    SecretId: cfg.SecretId,
    SecretKey: cfg.SecretKey,
    Timeout: 180000,
  });
  const prefix = "s-class/Grammar/L07/assets/tts-mp3/l07-google-mp3/";
  const CONCURRENCY = 4;
  const queue = [...files];
  const keys = [];
  return Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const f = queue.shift();
        const key = prefix + path.basename(f);
        await new Promise((resolve, reject) => {
          cos.putObject(
            {
              Bucket: cfg.Bucket,
              Region: cfg.Region,
              Key: key,
              Body: fs.createReadStream(f),
              ContentLength: fs.statSync(f).size,
              ContentType: "audio/mpeg",
            },
            (err) => (err ? reject(err) : resolve())
          );
        });
        keys.push(key);
        console.log("COS OK", key);
      }
    })
  ).then(() => keys);
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const uploadCos = process.argv.includes("--upload-cos");
  const fromCfg = readAzureKeyFromConfig();
  const key = String(
    process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || fromCfg.key || ""
  ).trim();
  const region = String(
    process.env.AZURE_SPEECH_REGION || fromCfg.region || "southeastasia"
  ).trim();

  if (!dryRun && !key) {
    console.error("请设置 AZURE_SPEECH_KEY");
    process.exit(1);
  }

  const phrases = loadPhrasesFromScenes();
  console.log(`场景句（含 listen）共 ${phrases.length} 条`);

  const { data } = loadManifestEmbed();
  data.entries = data.entries || [];
  const existingTexts = new Set(data.entries.map((e) => norm(e.text)));
  let idx = nextIndex(data.entries);
  const created = [];

  for (const phrase of phrases) {
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
      source: "l07-page05-scenes",
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
    await uploadToCos(created.map((c) => c.outFile));
  }

  if (!created.length) console.log("无新增条目。");
  else console.log(`完成：新增 ${created.length} 条`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
