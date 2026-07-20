#!/usr/bin/env node
/**
 * L01 讲义例句 TTS：Azure 英式男声（教材语速略慢）→ 本地 MP3 → 更新内联 manifest → 上传 COS
 *
 * 用法（在 Grammar/L01 目录）：
 *   set AZURE_SPEECH_KEY=你的密钥
 *   node scripts/generate-handout-example-tts.mjs
 *
 * 可选：
 *   --dry-run     只列出例句，不合成
 *   --skip-upload 只生成 MP3 与更新 HTML，不上传 COS
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const L01 = path.join(__dirname, "..");
const REPO = path.join(L01, "..", "..");
const HTML_ZK = path.join(L01, "lesson01-handout-zhongkao.html");
const OUT_DIR = path.join(L01, "assets", "tts-mp3");
const BUILD_SCRIPT = path.join(L01, "..", "scripts", "build-l01-classroom-handout.mjs");
const UPLOAD_SCRIPT = path.join(REPO, "scripts", "upload-media-to-cos.js");

const COS_BASE =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L01/assets/tts-mp3/";

const EN_VOICE = "en-GB-RyanNeural";
const ZH_VOICE = "zh-CN-YunxiNeural";
const PROSODY_RATE = "-10%";

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

function norm(s) {
  return String(s || "")
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function hasCjk(t) {
  return /[\u3400-\u9fff]/.test(String(t || ""));
}

function pickVoice(text) {
  return hasCjk(text) ? ZH_VOICE : EN_VOICE;
}

function pickLang(voice) {
  return voice.startsWith("zh") ? "zh-CN" : "en-GB";
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractExamplePhrases(html) {
  const out = [];
  for (const m of html.matchAll(/data-tts="([^"]+)"/g)) {
    const t = norm(m[1]);
    if (t) out.push(t);
  }
  return [...new Set(out)];
}

function extractManifest(html) {
  const m = html.match(/window\.__LESSON_TTS_MANIFEST\s*=\s*(\{[\s\S]*?\n\});/);
  if (!m) throw new Error("未找到 window.__LESSON_TTS_MANIFEST");
  return Function('"use strict"; return ' + m[1])();
}

function cosUrlFor(text) {
  return COS_BASE + sha20(text) + ".mp3";
}

async function azureSynth(text, key, region, outFile) {
  const voice = pickVoice(text);
  const lang = pickLang(voice);
  const xmlSafe = escapeXml(text);
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' name='${voice}'><prosody rate="${PROSODY_RATE}">${xmlSafe}</prosody></voice></speak>`;
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
  if (buf.length < 80) throw new Error("MP3 过小");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
}

function upsertManifestInHtml(html, phraseMap) {
  const manifest = extractManifest(html);
  for (const [text, url] of phraseMap) {
    manifest[text] = url;
  }
  const lines = Object.entries(manifest)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`);
  const block =
    "/* 由 scripts/generate-handout-example-tts.mjs 生成；请勿手改大段（可重新运行脚本覆盖） */\n" +
    "window.__LESSON_TTS_MANIFEST = {\n" +
    lines.join(",\n") +
    "\n};";
  return html.replace(
    /\/\* 由 scripts\/[^*]+\*\/\s*window\.__LESSON_TTS_MANIFEST\s*=\s*\{[\s\S]*?\n\};/,
    block
  );
}

function updateHandoutManifestJs(phraseMap) {
  const manPath = path.join(L01, "assets", "handout-tts-manifest.js");
  let existing = {};
  if (fs.existsSync(manPath)) {
    const c = fs.readFileSync(manPath, "utf8");
    const m = c.match(/Object\.assign\([^,]+,\s*(\{[\s\S]*\})\s*\)/);
    if (m) {
      try {
        existing = Function('"use strict"; return ' + m[1])();
      } catch {}
    }
  }
  for (const [text, url] of phraseMap) {
    existing[text] = url;
  }
  const lines = Object.entries(existing)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`);
  const body = `window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n${lines.join(",\n")}\n});\n`;
  fs.writeFileSync(manPath, body, "utf8");
}

function parseArgs() {
  const a = process.argv.slice(2);
  return {
    dryRun: a.includes("--dry-run"),
    skipUpload: a.includes("--skip-upload"),
  };
}

async function main() {
  const { dryRun, skipUpload } = parseArgs();
  const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
  const region = String(process.env.AZURE_SPEECH_REGION || "eastasia").trim();

  let html = fs.readFileSync(HTML_ZK, "utf8");
  const phrases = extractExamplePhrases(html);
  console.log("讲义例句（data-tts）:", phrases.length);

  if (dryRun) {
    phrases.forEach((p, i) => console.log(String(i + 1).padStart(3), sha20(p), p.slice(0, 80)));
    return;
  }

  if (!key) {
    console.error("请设置环境变量 AZURE_SPEECH_KEY");
    process.exit(1);
  }

  const phraseMap = new Map();
  for (let i = 0; i < phrases.length; i++) {
    const text = phrases[i];
    const hash = sha20(text);
    const outFile = path.join(OUT_DIR, `${hash}.mp3`);
    process.stdout.write(`[${i + 1}/${phrases.length}] ${hash} ${text.slice(0, 55)}…\n`);
    await azureSynth(text, key, region, outFile);
    phraseMap.set(text, cosUrlFor(text));
    await new Promise((r) => setTimeout(r, 120));
  }

  html = upsertManifestInHtml(html, phraseMap);
  fs.writeFileSync(HTML_ZK, html, "utf8");
  console.log("已更新:", HTML_ZK);

  updateHandoutManifestJs(phraseMap);
  console.log("已更新 handout-tts-manifest.js");

  if (fs.existsSync(BUILD_SCRIPT)) {
    const r = spawnSync(process.execPath, [BUILD_SCRIPT], { cwd: path.join(L01, ".."), stdio: "inherit" });
    if (r.status !== 0) throw new Error("build-l01-classroom-handout 失败");
  }

  if (!skipUpload && fs.existsSync(UPLOAD_SCRIPT)) {
    console.log("\n上传到腾讯云 COS…");
    const r = spawnSync(process.execPath, [UPLOAD_SCRIPT], { cwd: REPO, stdio: "inherit" });
    if (r.status !== 0) throw new Error("COS 上传失败");
  }

  console.log("\n完成。例句 MP3:", phrases.length, "COS 前缀:", COS_BASE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
