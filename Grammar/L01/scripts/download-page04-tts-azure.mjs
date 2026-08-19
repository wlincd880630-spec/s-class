#!/usr/bin/env node
/**
 * Lesson01 Page04 — 同步本页 STAGE1/2 练习朗读 MP3 到内联 manifest。
 *
 * 用法（Grammar/L01 目录）：
 *   set AZURE_SPEECH_KEY=你的密钥
 *   node scripts/download-page04-tts-azure.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HTML_PATH = path.join(ROOT, "lesson01-page04-slp-advanced.html");
const OUT_DIR = path.join(ROOT, "assets", "tts-mp3");

const DEFAULT_COS_BASE =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L01/assets/tts-mp3/";

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

function norm(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const n = norm(x);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

function hasCjk(t) {
  return /[\u3400-\u9fff]/.test(String(t || ""));
}

function extractConstArrayLiteral(html, name) {
  const prefix = `const ${name} = `;
  const i = html.indexOf(prefix);
  if (i === -1) throw new Error(`未找到 ${name}`);
  let j = i + prefix.length;
  while (j < html.length && /\s/.test(html[j])) j++;
  if (html[j] !== "[") throw new Error(`${name} 应为数组字面量`);
  let depth = 0;
  const start = j;
  for (; j < html.length; j++) {
    const c = html[j];
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        j++;
        return Function('"use strict"; return ' + html.slice(start, j))();
      }
    }
  }
  throw new Error(`${name} 数组未闭合`);
}

function collectPage04Phrases(html) {
  const phrases = [];
  for (const name of ["STAGE1_DRILL", "STAGE2_DRILL", "DRILL_QUESTIONS"]) {
    const arr = extractConstArrayLiteral(html, name);
    for (const row of arr) {
      if (!row) continue;
      if (row.line) phrases.push(row.line);
      if (row.tts) phrases.push(row.tts);
      if (row.q) phrases.push(row.q);
      if (row.correct) phrases.push(row.correct);
    }
  }
  const showcase = extractConstArrayLiteral(html, "STAGE2_SHOWCASE");
  for (const row of showcase) {
    if (row && row.stmt) phrases.push(row.stmt);
    if (row && row.q) phrases.push(row.q);
  }
  return unique(phrases);
}

function extractManifest(html) {
  const m = html.match(/window\.__LESSON_TTS_MANIFEST\s*=\s*(\{[\s\S]*?\n\});/);
  if (!m) throw new Error("未找到 window.__LESSON_TTS_MANIFEST");
  return Function('"use strict"; return ' + m[1])();
}

function escapeXmlText(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function azureSynthesizeMp3(text, key, region, outFile) {
  const en = !hasCjk(text);
  const voiceName = en ? "en-GB-RyanNeural" : "zh-CN-XiaoxiaoNeural";
  const lang = en ? "en-US" : "zh-CN";
  const xmlSafe = escapeXmlText(text);
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice xml:lang='${lang}' xml:gender='Female' name='${voiceName}'>${xmlSafe}</voice></speak>`;
  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
    },
    body: ssml
  });
  const buf = Buffer.from(await res.arrayBuffer());
  if (!res.ok) {
    throw new Error(`Azure ${res.status}: ${buf.toString("utf8").slice(0, 400)}`);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
}

function patchManifestHtml(html, additions, cosBase) {
  if (!additions.length) return html;
  const boot = '<script src="assets/lesson-tts-bootstrap.js"></script>';
  const idx = html.indexOf(boot);
  if (idx === -1) throw new Error("未找到 lesson-tts-bootstrap 锚点");
  const head = html.slice(0, idx);
  const manifestCloseIdx = head.lastIndexOf("\n};");
  if (manifestCloseIdx === -1) throw new Error("未找到 manifest 闭合");
  const before = head.slice(0, manifestCloseIdx);
  const afterManifestInHead = head.slice(manifestCloseIdx + 3);
  const lines = additions.map(({ text, hash }) => {
    const url = cosBase.replace(/\/?$/, "/") + hash + ".mp3";
    return `  ${JSON.stringify(text)}: ${JSON.stringify(url)}`;
  });
  const trimmed = before.trimEnd();
  const comma = trimmed.endsWith(",") ? "" : ",";
  return trimmed + comma + "\n" + lines.join(",\n") + "\n};" + afterManifestInHead + html.slice(idx);
}

async function main() {
  const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
  const region = String(process.env.AZURE_SPEECH_REGION || "southeastasia").trim();
  let html = fs.readFileSync(HTML_PATH, "utf8");
  const manifest = extractManifest(html);
  const wanted = collectPage04Phrases(html);
  const missing = wanted.filter((t) => !manifest[t]);

  console.log("本页朗读句:", wanted.length);
  console.log("缺失 manifest:", missing.length);
  missing.forEach((t) => console.log(" -", t));

  if (!missing.length) {
    console.log("manifest 已完整，无需生成。");
    return;
  }
  if (!key) {
    console.error("请设置 AZURE_SPEECH_KEY。");
    process.exit(1);
  }

  const added = [];
  for (let i = 0; i < missing.length; i++) {
    const text = missing[i];
    const hash = sha20(text);
    const outFile = path.join(OUT_DIR, `${hash}.mp3`);
    process.stdout.write(`[${i + 1}/${missing.length}] ${hash} ${text.slice(0, 70)}\n`);
    await azureSynthesizeMp3(text, key, region, outFile);
    added.push({ text, hash });
  }

  html = patchManifestHtml(html, added, DEFAULT_COS_BASE);
  fs.writeFileSync(HTML_PATH, html, "utf8");
  console.log("已更新 manifest 与本地 MP3:", HTML_PATH);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
