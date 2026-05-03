#!/usr/bin/env node
/**
 * Lesson 01 Page 03 — 阶段一/阶段二离线 MP3 生成器
 *
 * 说明：
 * - Vertex AI 本身不直接导出 MP3；同一 GCP/Vertex 项目下调用 Cloud Text-to-Speech API。
 * - 默认项目：s-class-edtech-production，可用 GCP_PROJECT_ID 覆盖。
 * - 令牌来源：GOOGLE_ACCESS_TOKEN，或本机 gcloud auth print-access-token。
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execFileSync, execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HTML_PATH = path.join(ROOT, "lesson01-page03-be-magic.html");
const OUT_DIR = path.join(ROOT, "assets", "tts-mp3");
const QUOTA_PROJECT = String(process.env.GCP_PROJECT_ID || "s-class-edtech-production").trim();

function sha20(text) {
  return crypto.createHash("sha1").update(String(text), "utf8").digest("hex").slice(0, 20);
}

function unique(arr) {
  return Array.from(new Set(arr.map((s) => String(s || "").replace(/\s+/g, " ").trim()).filter(Boolean)));
}

function jsStringUnescape(raw) {
  return Function('"use strict"; return "' + raw.replace(/"/g, '\\"') + '";')();
}

function getAccessToken() {
  const env = String(process.env.GOOGLE_ACCESS_TOKEN || "").trim();
  if (env) return env;
  try {
    return String(execFileSync("gcloud", ["auth", "print-access-token"], { encoding: "utf8" })).trim();
  } catch (e) {}
  try {
    return String(execFileSync("gcloud.cmd", ["auth", "print-access-token"], { encoding: "utf8" })).trim();
  } catch (e2) {}
  try {
    return String(
      execFileSync(
        "C:\\Users\\wl88i\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd",
        ["auth", "print-access-token"],
        { encoding: "utf8" }
      )
    ).trim();
  } catch (e3) {}
  try {
    return String(
      execSync('"C:\\Users\\wl88i\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd" auth print-access-token', {
        encoding: "utf8",
        shell: true
      })
    ).trim();
  } catch (e4) {}
  console.error("无法取得 Google access token。请先运行 gcloud auth login，或设置 GOOGLE_ACCESS_TOKEN。");
  process.exit(1);
}

function extractManifest(html) {
  const m = html.match(/window\.__LESSON_TTS_MANIFEST\s*=\s*(\{[\s\S]*?\n\});/);
  if (!m) throw new Error("未找到 window.__LESSON_TTS_MANIFEST");
  return Function('"use strict"; return ' + m[1])();
}

function extractPhrases(html) {
  const phrases = [];

  const spell = html.match(/const\s+SPELL_LINES\s*=\s*\n?\s*"([\s\S]*?)";/);
  if (spell) phrases.push(jsStringUnescape(spell[1]));

  for (const m of html.matchAll(/shortTts:\s*"([^"]+)"/g)) phrases.push(jsStringUnescape(m[1]));
  for (const m of html.matchAll(/fullForTts:\s*"([^"]+)"/g)) phrases.push(jsStringUnescape(m[1]));

  return unique(phrases);
}

function hasCjk(text) {
  return /[\u3400-\u9fff]/.test(text);
}

async function synthesizeMp3(token, text, outFile) {
  const isChinese = hasCjk(text);
  const voice = isChinese
    ? { languageCode: "cmn-CN", name: "cmn-CN-Wavenet-A" }
    : { languageCode: "en-US", name: "en-US-Neural2-F" };
  const res = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      ...(QUOTA_PROJECT ? { "x-goog-user-project": QUOTA_PROJECT } : {})
    },
    body: JSON.stringify({
      input: { text },
      voice,
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: isChinese ? 0.92 : 0.94
      }
    })
  });
  const raw = await res.text();
  if (!res.ok) throw new Error("Cloud TTS " + res.status + " " + raw.slice(0, 300));
  const json = JSON.parse(raw);
  if (!json.audioContent) throw new Error("Cloud TTS 响应缺少 audioContent");
  fs.writeFileSync(outFile, Buffer.from(json.audioContent, "base64"));
}

function patchManifest(html, manifest, added) {
  if (!added.length) return html;
  const insertion = added
    .map(({ text, rel }) => '  ' + JSON.stringify(text) + ': ' + JSON.stringify(rel) + ",")
    .join("\n");
  return html.replace(/(\n\s*"[^"]+"\s*:\s*"[^"]+\.mp3")\s*\n\};\s*\n\s*<\/script>/, "$1,\n" + insertion + "\n};\n\n</script>");
}

fs.mkdirSync(OUT_DIR, { recursive: true });

let html = fs.readFileSync(HTML_PATH, "utf8");
const manifest = extractManifest(html);
const phrases = extractPhrases(html);
const added = [];
const jobs = [];

for (const text of phrases) {
  let rel = manifest[text] || manifest[String(text).replace(/\s+/g, " ").trim()];
  if (!rel) {
    rel = "assets/tts-mp3/" + sha20(text) + ".mp3";
    manifest[text] = rel;
    added.push({ text, rel });
  }
  const outFile = path.join(ROOT, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(outFile)) jobs.push({ text, rel, outFile });
}

html = patchManifest(html, manifest, added);
if (added.length) fs.writeFileSync(HTML_PATH, html, "utf8");

console.log("目标短语:", phrases.length);
console.log("新增 manifest:", added.length);
console.log("待生成 MP3:", jobs.length);

const token = getAccessToken();
let ok = 0;
for (const job of jobs) {
  try {
    await synthesizeMp3(token, job.text, job.outFile);
    ok++;
    console.log("[OK]", ok + "/" + jobs.length, job.rel, job.text);
  } catch (e) {
    console.error("[FAIL]", job.text, e && e.message ? e.message : e);
    process.exitCode = 2;
  }
}

const manifestFile = path.join(OUT_DIR, "manifest-page03.json");
fs.writeFileSync(
  manifestFile,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      gcpProjectId: QUOTA_PROJECT,
      sourceHtml: path.relative(ROOT, HTML_PATH).replace(/\\/g, "/"),
      files: phrases.map((text) => ({ text, mp3: manifest[text] }))
    },
    null,
    2
  ),
  "utf8"
);

console.log("完成。清单:", manifestFile);
