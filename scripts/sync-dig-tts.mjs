#!/usr/bin/env node
/** 为 dig 词条下载 Azure TTS 并更新 manifest、上传 COS */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AUDIO_DIR = path.join(ROOT, "Primary/School_textbook/Courseware/audio");
const RATE_DIR = "r090";
const SPEECH_RATE = "0.90";
const VOICE = "en-GB-RyanNeural";
const LANG = "en-GB";
const COS_BASE =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware/audio/";

const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
const region = String(process.env.AZURE_SPEECH_REGION || "southeastasia").trim();

const DIG_TEXTS = ["dig", "We're digging.", "The boy is digging a hole in the garden."];

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSsml(text) {
  const safe = escapeXml(text);
  return (
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${LANG}">` +
    `<voice name="${VOICE}"><prosody rate="${SPEECH_RATE}">${safe}</prosody></voice></speak>`
  );
}

async function azureSynth(text, outFile) {
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    },
    body: buildSsml(text),
  });
  const buf = Buffer.from(await res.arrayBuffer());
  if (!res.ok) throw new Error(`Azure ${res.status}: ${buf.toString("utf8").slice(0, 120)}`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
  console.log("synthesized", text, "->", path.basename(outFile), buf.length, "bytes");
}

function parseDataJs(filePath) {
  const s = fs.readFileSync(filePath, "utf8");
  const jsonStart = s.indexOf("{", s.indexOf("TEXTBOOK_DATA = "));
  let depth = 0;
  let end = -1;
  for (let i = jsonStart; i < s.length; i++) {
    if (s[i] === "{") depth++;
    else if (s[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return JSON.parse(s.slice(jsonStart, end));
}

function collectAllTexts() {
  const COURSEWARE = path.join(ROOT, "Primary/School_textbook/Courseware");
  const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
  const texts = new Set();
  const norm = (s) =>
    String(s || "")
      .replace(/[\u2018\u2019\u201A\uFF07]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  for (const g of grades) {
    const data = parseDataJs(path.join(COURSEWARE, g, "assets/data/data.js"));
    for (const u of data.units || []) {
      for (const w of u.words || []) {
        const word = norm(w.word);
        if (word) texts.add(word);
        for (const sen of w.sentences || []) {
          const en = norm(sen.en);
          if (en) texts.add(en);
        }
      }
    }
  }
  return [...texts];
}

function buildManifest(texts) {
  const lookup = {};
  for (const t of texts) {
    const rel = `${RATE_DIR}/${sha20(t)}.mp3`;
    lookup[`${t}|${SPEECH_RATE}`] = rel;
    const titled = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
    if (titled !== t && !lookup[`${titled}|${SPEECH_RATE}`]) {
      lookup[`${titled}|${SPEECH_RATE}`] = rel;
    }
    if (t.toLowerCase() !== t && !lookup[`${t.toLowerCase()}|${SPEECH_RATE}`]) {
      lookup[`${t.toLowerCase()}|${SPEECH_RATE}`] = rel;
    }
  }
  return { voice: VOICE, rate: SPEECH_RATE, lookup };
}

async function uploadAudio(files) {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, ".cos-config.json"), "utf8"));
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey });
  const prefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
  const cosRoot = `${prefix}Primary/School_textbook/Courseware/audio/`;
  for (const local of files) {
    const rel = path.relative(AUDIO_DIR, local).replace(/\\/g, "/");
    await new Promise((res, rej) => {
      cos.putObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key: cosRoot + rel,
          Body: fs.readFileSync(local),
          ContentLength: fs.statSync(local).size,
          ContentType: rel.endsWith(".js") ? "application/javascript" : "audio/mpeg",
        },
        (e) => (e ? rej(e) : res())
      );
    });
    console.log("uploaded", rel);
  }
}

async function main() {
  if (!key) {
    console.error("请设置 AZURE_SPEECH_KEY 环境变量");
    process.exit(1);
  }
  const mp3Dir = path.join(AUDIO_DIR, RATE_DIR);
  const newMp3s = [];
  for (const t of DIG_TEXTS) {
    const out = path.join(mp3Dir, `${sha20(t)}.mp3`);
    await azureSynth(t, out);
    newMp3s.push(out);
    await new Promise((r) => setTimeout(r, 200));
  }

  const manifest = buildManifest(collectAllTexts());
  const manifestPath = path.join(AUDIO_DIR, "audio-manifest.js");
  fs.writeFileSync(manifestPath, `window.__LOCAL_AUDIO_MANIFEST = ${JSON.stringify(manifest)};`, "utf8");
  console.log("manifest keys:", Object.keys(manifest.lookup).length);

  await uploadAudio([...newMp3s, manifestPath]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
