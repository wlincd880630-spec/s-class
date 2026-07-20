#!/usr/bin/env node
/**
 * 扫描 Grammar HTML/JS 中 __LESSON_TTS_MANIFEST（含 COS URL），
 * 为本地缺失的 assets/tts-mp3/*.mp3 调用 Azure 合成。不修改任何 HTML/JS。
 *
 *   $env:AZURE_SPEECH_KEY="..."
 *   $env:AZURE_SPEECH_REGION="eastasia"
 *   node scripts/download-missing-grammar-azure.mjs [--dry-run] [--probe-cos]
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const COS_PREFIX =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/";
const EN_VOICE = "en-GB-RyanNeural";
const ZH_VOICE = "zh-CN-XiaoxiaoNeural";

const dryRun = process.argv.includes("--dry-run");
const probeCos = process.argv.includes("--probe-cos");
const verbose = process.argv.includes("--verbose");

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
  return crypto
    .createHash("sha1")
    .update(String(text) + "|" + voice, "utf8")
    .digest("hex")
    .slice(0, 20);
}
function pickVoice(text) {
  return hasCjk(text) ? ZH_VOICE : EN_VOICE;
}
function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(html|js)$/i.test(name)) acc.push(p);
  }
  return acc;
}

function localPathFromUrl(url) {
  const u = String(url || "").split("?")[0];
  if (u.startsWith(COS_PREFIX)) {
    const rel = u.slice(COS_PREFIX.length).replace(/\\/g, "/");
    return path.join(ROOT, rel);
  }
  const m = u.match(/Grammar\/((?:L\d{2}(?:-[^/]+)?|L00-[^/]+)\/assets\/tts-mp3\/[^/]+\.mp3)/i);
  if (m) return path.join(ROOT, m[1]);
  if (/^assets\/tts-mp3\//i.test(u)) return null;
  return null;
}

function extractManifestPairs(content) {
  const pairs = [];
  const marker = "__LESSON_TTS_MANIFEST";
  let pos = 0;
  while ((pos = content.indexOf(marker, pos)) !== -1) {
    const slice = content.slice(pos, pos + 600000);
    const end = slice.search(/\n\}\)\s*;|\n\}\s*;/);
    const block = end > 0 ? slice.slice(0, end) : slice.slice(0, 120000);
    const pairRe = /("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g;
    let p;
    while ((p = pairRe.exec(block)) !== null) {
      try {
        const text = JSON.parse(p[1]);
        const url = JSON.parse(p[2]);
        if (/tts-mp3\/.+\.mp3/i.test(url)) pairs.push({ text, url });
      } catch {
        /* skip */
      }
    }
    pos += marker.length;
  }
  return pairs;
}

function isValidPhrase(t) {
  const n = norm(t);
  if (!n || n.length < 2) return false;
  if (/posterU\s*:|enRight\s*:|enLeft\s*:/.test(n)) return false;
  return true;
}

async function azureSynth(text, voice, key, region, outFile) {
  const lang = voice.startsWith("zh") ? "zh-CN" : "en-US";
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' name='${voice}'>${escapeXml(text)}</voice></speak>`;
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
  if (!res.ok) throw new Error(`Azure ${res.status}: ${buf.toString("utf8").slice(0, 120)}`);
  if (buf.length < 80) throw new Error("file too small");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
  return buf.length;
}

async function cosMissing(url) {
  try {
    const r = await fetch(url, { method: "HEAD" });
    return !r.ok;
  } catch {
    return true;
  }
}

const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
const region = String(process.env.AZURE_SPEECH_REGION || "eastasia").trim();
if (!dryRun && !key) {
  console.error("请设置 AZURE_SPEECH_KEY");
  process.exit(1);
}

/** @type {Map<string, {text:string, url:string, abs:string}>} */
const jobs = new Map();

for (const fp of walk(ROOT)) {
  const content = fs.readFileSync(fp, "utf8");
  for (const { text, url } of extractManifestPairs(content)) {
    if (!isValidPhrase(text)) continue;
    if (!/tts-mp3\/.+\.mp3/i.test(url)) continue;
    const abs = localPathFromUrl(url);
    if (!abs) continue;
    const id = abs.toLowerCase();
    if (!jobs.has(id)) jobs.set(id, { text: norm(text), url, abs });
  }
}

let skipOk = 0;
let needLocal = 0;
let downloaded = 0;
let failed = 0;
let cos404 = 0;

for (const job of jobs.values()) {
  const exists = fs.existsSync(job.abs) && fs.statSync(job.abs).size > 80;
  if (exists && !probeCos) {
    skipOk++;
    continue;
  }

  let need = !exists;
  if (probeCos || !exists) {
    const missingOnCos = await cosMissing(job.url);
    if (missingOnCos) {
      cos404++;
      need = true;
    } else if (exists) {
      skipOk++;
      continue;
    }
  }

  if (!need) {
    skipOk++;
    continue;
  }

  needLocal++;
  const rel = path.relative(ROOT, job.abs);
  const voice = pickVoice(job.text);
  const expected = (hasCjk(job.text) ? sha20Voice(job.text, voice) : sha20(job.text)) + ".mp3";
  const actual = path.basename(job.abs);
  if (expected !== actual && verbose) {
    console.warn("hash 名不一致:", rel, "期望", expected, "manifest", actual);
  }

  if (dryRun) {
    if (verbose) console.log("MISSING", rel, "←", job.text.slice(0, 72));
    continue;
  }

  try {
    const n = await azureSynth(job.text, voice, key, region, job.abs);
    downloaded++;
    console.log("OK", n, "bytes", rel);
    await new Promise((r) => setTimeout(r, 100));
  } catch (e) {
    failed++;
    console.error("FAIL", rel, e.message, job.text.slice(0, 50));
  }
}

console.log("\n--- 汇总 ---");
console.log("manifest 条目:", jobs.size);
console.log("本地已有:", skipOk);
console.log("COS 404:", cos404);
console.log("待下载:", needLocal);
if (!dryRun) console.log("成功:", downloaded, "失败:", failed);
