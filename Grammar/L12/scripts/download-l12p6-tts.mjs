#!/usr/bin/env node
/**
 * 使用 Azure 认知语音「文本转语音」REST API，将 Page06 听力稿导出为本地 MP3。
 *
 * 安全：请勿把密钥写入 HTML 或提交到 Git。仅在本地终端设置环境变量：
 *
 * PowerShell:
 *   $env:AZURE_SPEECH_KEY="你的密钥"
 *   $env:AZURE_SPEECH_REGION="southeastasia"
 *   node scripts/download-l12p6-tts.mjs
 *
 * cmd.exe:
 *   set AZURE_SPEECH_KEY=你的密钥
 *   set AZURE_SPEECH_REGION=southeastasia
 *   node scripts\download-l12p6-tts.mjs
 *
 * 需要 Node 18+（内置 fetch）。
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const key = process.env.AZURE_SPEECH_KEY;
const region = process.env.AZURE_SPEECH_REGION || "southeastasia";
const voice = process.env.AZURE_SPEECH_VOICE || "en-GB-RyanNeural";

/** 与 lesson12-page06-unit-wrap.html 听力稿保持一致 */
const LISTENING_TEXT =
  "Our school science club has invented a small machine for plastic bottles. " +
  "It is reported that the machine melts and presses bottles into key rings. " +
  "It is believed that many students will bring clean bottles next month. " +
  "The teachers hope that each class will record its own recycling numbers. " +
  "It is said that the city may invite our club to show the machine at the youth science fair.";

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  if (!key) {
    console.error("缺少环境变量 AZURE_SPEECH_KEY。请勿把密钥写进 HTML。");
    process.exit(1);
  }

  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const ssml = `<speak version="1.0" xml:lang="en-GB"><voice xml:lang="en-GB" name="${voice}">${escapeXml(
    LISTENING_TEXT
  )}</voice></speak>`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      "User-Agent": "L12P6-tts-download-script"
    },
    body: ssml
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    console.error(`Azure TTS 失败 HTTP ${res.status}`, t.slice(0, 500));
    process.exit(1);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const outDir = path.join(__dirname, "..", "assets");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "l12p6-listening-invention.mp3");
  fs.writeFileSync(outFile, buf);
  console.log("已写入:", outFile, `(${buf.length} bytes)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
