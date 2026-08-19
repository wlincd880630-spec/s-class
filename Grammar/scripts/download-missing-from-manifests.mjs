#!/usr/bin/env node
/**
 * 扫描全部 *tts-manifest.js，为缺失的 assets/tts-mp3/*.mp3 调用 Azure 合成。
 *
 *   set AZURE_SPEECH_KEY=你的密钥
 *   set AZURE_SPEECH_REGION=southeastasia
 *   node scripts/download-missing-from-manifests.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const EN_VOICE = "en-GB-RyanNeural";
const ZH_VOICE = "zh-CN-XiaoxiaoNeural";

function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}
function hasCjk(t) {
  return /[\u3400-\u9fff]/.test(String(t || ""));
}
function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}
function sha20Voice(text, voice) {
  return crypto.createHash("sha1").update(String(text) + "|" + voice, "utf8").digest("hex").slice(0, 20);
}
function pickVoice(text) {
  return hasCjk(text) ? ZH_VOICE : EN_VOICE;
}
function mp3Name(text) {
  const v = pickVoice(text);
  return (hasCjk(text) ? sha20Voice(text, v) : sha20(text)) + ".mp3";
}
function isValidPhrase(t) {
  const n = norm(t);
  if (!n || n.length < 2) return false;
  if (/posterU\s*:|enRight\s*:|enLeft\s*:/.test(n)) return false;
  return true;
}

function walkManifests(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkManifests(p, acc);
    else if (/tts-manifest\.js$/i.test(name)) acc.push(p);
  }
}

async function azureSynth(text, voice, key, region, outFile) {
  const lang = voice.startsWith("zh") ? "zh-CN" : "en-US";
  const esc = String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' name='${voice}'>${esc}</voice></speak>`;
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
}

function loadAzureFromRepoConfig() {
  const fp = path.join(ROOT, "L03", "assets", "lesson-tts-azure-config.js");
  if (!fs.existsSync(fp)) return { key: "", region: "" };
  const c = fs.readFileSync(fp, "utf8");
  const km = c.match(/var\s+AZURE_KEY\s*=\s*"([^"]+)"/);
  const rm = c.match(/var\s+AZURE_REGION\s*=\s*"([^"]+)"/);
  return { key: km ? km[1].trim() : "", region: rm ? rm[1].trim() : "" };
}

const fromCfg = loadAzureFromRepoConfig();
const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || fromCfg.key || "").trim();
const region = String(
  process.env.AZURE_SPEECH_REGION || process.env.SPEECH_REGION || fromCfg.region || "southeastasia"
).trim();
if (!key) {
  console.error("请设置 AZURE_SPEECH_KEY 或配置 L03/assets/lesson-tts-azure-config.js");
  process.exit(1);
}

const manifests = [];
walkManifests(ROOT, manifests);
/** @type {Map<string, {text:string, lesson:string, fileName:string, voice:string}>} */
const jobs = new Map();

for (const fp of manifests) {
  const lesson = path.relative(ROOT, fp).split(path.sep)[0];
  const c = fs.readFileSync(fp, "utf8");
  const re = /("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g;
  let m;
  while ((m = re.exec(c))) {
    let text;
    let rel;
    try {
      text = JSON.parse(m[1]);
      rel = JSON.parse(m[2]);
    } catch {
      continue;
    }
    if (!isValidPhrase(text)) continue;
    if (!/assets\/tts-mp3\//.test(rel)) continue;
    const fn = path.basename(rel);
    const id = `${lesson}|${fn}`;
    if (!jobs.has(id)) jobs.set(id, { text, lesson, fileName: fn, voice: pickVoice(text) });
  }
}

let need = 0;
let got = 0;
let skip = 0;

for (const job of jobs.values()) {
  const out = path.join(ROOT, job.lesson, "assets", "tts-mp3", job.fileName);
  if (fs.existsSync(out) && fs.statSync(out).size > 80) {
    skip++;
    continue;
  }
  const expected = mp3Name(job.text);
  if (expected !== job.fileName) {
    console.warn("hash 不一致", job.lesson, job.fileName, "期望", expected, job.text.slice(0, 40));
  }
  need++;
  try {
    await azureSynth(job.text, job.voice, key, region, out);
    got++;
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 90));
  } catch (e) {
    console.error("\nFAIL", job.lesson, job.fileName, e.message, job.text.slice(0, 50));
  }
}

console.log("\nmanifest 文件:", manifests.length);
console.log("唯一条目:", jobs.size, "已有:", skip, "待下:", need, "成功:", got, "仍缺:", need - got);
