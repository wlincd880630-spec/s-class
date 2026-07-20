#!/usr/bin/env node
/**
 * 外研版 School_textbook：Azure TTS 批量下载 + manifest + HTML/COS 补丁
 *
 * 环境变量：AZURE_SPEECH_KEY、AZURE_SPEECH_REGION（默认 eastasia）
 *
 * 用法：
 *   node scripts/sync-school-textbook-tts.mjs              # 下载缺失 mp3 + 写 manifest + patch HTML
 *   node scripts/sync-school-textbook-tts.mjs --dry-run    # 仅统计
 *   node scripts/sync-school-textbook-tts.mjs --skip-download
 *   node scripts/sync-school-textbook-tts.mjs --upload-cos # 上传 audio 到腾讯云 COS
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import COS from "cos-nodejs-sdk-v5";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COURSEWARE = path.join(ROOT, "Primary/School_textbook/Courseware");
const AUDIO_DIR = path.join(COURSEWARE, "audio");
const RATE_DIR = "r090";
const SPEECH_RATE = "0.90";
const VOICE = "en-GB-RyanNeural";
const LANG = "en-GB";

const COS_BASE =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware/audio/";

const dryRun = process.argv.includes("--dry-run");
const skipDownload = process.argv.includes("--skip-download");
const uploadCos = process.argv.includes("--upload-cos");
const force = process.argv.includes("--force");

const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
const region = String(process.env.AZURE_SPEECH_REGION || "eastasia").trim();

function norm(s) {
  return String(s || "")
    .replace(/[\u2018\u2019\u201A\uFF07]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

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

function parseDataJs(filePath) {
  const s = fs.readFileSync(filePath, "utf8");
  const start = s.indexOf("TEXTBOOK_DATA = ");
  if (start < 0) return null;
  const jsonStart = s.indexOf("{", start);
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

function collectTexts() {
  const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
  const texts = new Set();
  for (const g of grades) {
    const fp = path.join(COURSEWARE, g, "assets/data/data.js");
    const data = parseDataJs(fp);
    if (!data) {
      console.warn("skip data.js:", g);
      continue;
    }
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
  return [...texts].sort((a, b) => a.localeCompare(b));
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
  if (buf.length < 80) throw new Error("file too small");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
  return buf.length;
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

function writeManifest(manifest) {
  const out = path.join(AUDIO_DIR, "audio-manifest.js");
  const body = `window.__LOCAL_AUDIO_MANIFEST = ${JSON.stringify(manifest)};`;
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  fs.writeFileSync(out, body, "utf8");
  console.log("wrote", path.relative(ROOT, out), "keys:", Object.keys(manifest.lookup).length);
}

function ensureLocalAudioJs() {
  const src = path.join(ROOT, "Primary/Jump Pup/audio/local-audio.js");
  const dst = path.join(AUDIO_DIR, "local-audio.js");
  if (!fs.existsSync(dst) || force) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
    fs.copyFileSync(src, dst);
    console.log("copied local-audio.js");
  }
}

function patchUtilsSpeakText() {
  const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
  const insertBlock = `  // 优先播放预生成 MP3（COS / 本地）
  if (window.LocalAudio && window.__LOCAL_AUDIO_MANIFEST) {
    try {
      const ok = await window.LocalAudio.speak(text, { rate: AZURE_CONFIG.speechRate });
      if (ok) {
        if (onEnd) onEnd();
        return;
      }
    } catch (e) {
      console.warn('LocalAudio 播放失败，回退 Azure', e);
    }
  }
`;
  let patched = 0;
  for (const g of grades) {
    const fp = path.join(COURSEWARE, g, "assets/js/utils.js");
    let s = fs.readFileSync(fp, "utf8");
    if (s.includes("优先播放预生成 MP3")) continue;
    const markerRe = /async function speakText\(text, onEnd\) \{\r?\n  if \(!text\) return;\r?\n/;
    if (markerRe.test(s)) {
      s = s.replace(
        markerRe,
        `async function speakText(text, onEnd) {\n  if (!text) return;\n${insertBlock}`
      );
      if (!dryRun) fs.writeFileSync(fp, s, "utf8");
      patched++;
    } else {
      console.warn("speakText marker not found:", g);
    }
  }
  console.log("patched utils.js:", patched);
}

function patchHtmlScripts() {
  const manifestCos = `${COS_BASE}audio-manifest.js?v=1`;
  const localCos = `${COS_BASE}local-audio.js?v=1`;
  const inject =
    `  <script src="${manifestCos}"></script>\n` +
    `  <script src="${localCos}"></script>\n`;
  const grades = fs.readdirSync(COURSEWARE).filter((d) => /^\d[A-Z]{2}$/.test(d));
  let count = 0;
  for (const g of grades) {
    const dir = path.join(COURSEWARE, g);
    for (const name of fs.readdirSync(dir)) {
      if (!/\.html$/i.test(name) || name === "index.html") continue;
      const fp = path.join(dir, name);
      let s = fs.readFileSync(fp, "utf8");
      if (s.includes("School_textbook/Courseware/audio/audio-manifest.js")) continue;
      if (!s.includes('src="assets/js/utils.js"')) continue;
      s = s.replace(
        /(<script src="assets\/data\/data\.js"><\/script>)\s*(<script src="assets\/js\/utils\.js"><\/script>)/,
        `$1\n${inject}$2`
      );
      if (!dryRun) fs.writeFileSync(fp, s, "utf8");
      count++;
    }
  }
  console.log("patched HTML:", count);
}

async function uploadToCos() {
  const configPath = path.join(ROOT, ".cos-config.json");
  if (!fs.existsSync(configPath)) {
    console.error("找不到 .cos-config.json，跳过 COS 上传");
    return;
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const cos = new COS({ SecretId: config.SecretId, SecretKey: config.SecretKey, Timeout: 600000 });
  const Bucket = config.Bucket;
  const Region = config.Region;
  const prefix = (config.CosPrefix || "s-class/").replace(/\/+$/, "") + "/";
  const cosRoot = `${prefix}Primary/School_textbook/Courseware/audio/`;

  function walk(dir, acc = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, acc);
      else acc.push(p);
    }
    return acc;
  }

  const files = walk(AUDIO_DIR);
  let ok = 0;
  let fail = 0;
  for (const local of files) {
    const rel = path.relative(AUDIO_DIR, local).replace(/\\/g, "/");
    const Key = cosRoot + rel;
    const size = fs.statSync(local).size;
    const ct = rel.endsWith(".js")
      ? "application/javascript"
      : rel.endsWith(".mp3")
        ? "audio/mpeg"
        : "application/octet-stream";
    try {
      await new Promise((resolve, reject) => {
        cos.putObject(
          {
            Bucket,
            Region,
            Key,
            Body: fs.createReadStream(local),
            ContentLength: size,
            ContentType: ct,
          },
          (e) => (e ? reject(e) : resolve())
        );
      });
      ok++;
      if (ok % 200 === 0) console.log("  uploaded", ok, "/", files.length);
    } catch (e) {
      fail++;
      console.error("fail", rel, e.message);
    }
  }
  console.log(`COS upload done: ${ok} ok, ${fail} fail`);
}

async function main() {
  const texts = collectTexts();
  console.log("unique texts:", texts.length);

  if (dryRun) {
    console.log("dry-run — sample:", texts.slice(0, 5));
    return;
  }

  ensureLocalAudioJs();

  const mp3Dir = path.join(AUDIO_DIR, RATE_DIR);
  fs.mkdirSync(mp3Dir, { recursive: true });

  if (!skipDownload) {
    if (!key) {
      console.error("请设置 AZURE_SPEECH_KEY");
      process.exit(1);
    }
    let done = 0;
    let skipped = 0;
    let failed = 0;
    for (const t of texts) {
      const out = path.join(mp3Dir, `${sha20(t)}.mp3`);
      if (!force && fs.existsSync(out) && fs.statSync(out).size > 80) {
        skipped++;
        continue;
      }
      try {
        await azureSynth(t, out);
        done++;
        if (done % 50 === 0) console.log(`  synthesized ${done} (skip ${skipped}, fail ${failed})`);
        await new Promise((r) => setTimeout(r, 120));
      } catch (e) {
        failed++;
        console.error("fail:", JSON.stringify(t).slice(0, 60), e.message);
      }
    }
    console.log(`download: ${done} new, ${skipped} skipped, ${failed} failed`);
  }

  writeManifest(buildManifest(texts));
  patchUtilsSpeakText();
  patchHtmlScripts();

  if (uploadCos) await uploadToCos();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
