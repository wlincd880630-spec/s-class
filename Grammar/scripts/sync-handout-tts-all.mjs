#!/usr/bin/env node
/**
 * 讲义：为完整英文例句补 🔊 按钮、注入本地 TTS、合并 manifest、Azure 下载 MP3
 *
 * 用法：
 *   node scripts/sync-handout-tts-all.mjs --patch-only
 *   AZURE_SPEECH_KEY=xxx node scripts/sync-handout-tts-all.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOT_SRC = path.join(ROOT, "L10", "assets", "lesson-tts-bootstrap.js");
const EN_VOICE = "en-GB-RyanNeural";
const ZH_VOICE = "zh-CN-XiaoxiaoNeural";
const patchOnly = process.argv.includes("--patch-only");

const HANDOUT_SOURCES = [
  "L00-主谓宾与非谓语/svo-handout-junior.html",
  "L00-主谓宾与非谓语/svo-handout-senior.html",
  "L00-主系表与非谓语/link-handout-junior.html",
  "L00-主系表与非谓语/link-handout-senior.html",
  "L01/lesson01-handout-zhongkao.html",
  "L02/lesson02-handout-writing.html",
  "L03/lesson03-page15-handout.html",
  "L05/lesson05-page09-handout.html",
  "L06/lesson06-page10-handout.html",
  "L07/lesson07-page10-handout-zhongkao.html",
  "L08/lesson08-page10-handout.html",
  "L09/lesson09-handout.html",
  "L10/L10-handout.html",
  "L11/lesson11-page08-handout.html",
  "L12/lesson12-page07-handout.html",
  "L13/lesson13-page08-handout.html",
  "L13-定语从句/rel-clause-handout.html",
  "L14/lesson14-page11-handout.html",
];

function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}
function isValidPhrase(t) {
  const n = norm(t);
  if (!n || n.length < 2) return false;
  if (/posterU\s*:|enRight\s*:|enLeft\s*:/.test(n)) return false;
  return true;
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
function stripTags(html) {
  return norm(
    String(html)
      .replace(/<button[\s\S]*?<\/button>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
  );
}
function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}
function isEnglishSpeakable(plain) {
  if (!plain || plain.length < 4) return false;
  if (!/[a-zA-Z]/.test(plain)) return false;
  const letters = (plain.match(/[a-zA-Z]/g) || []).join("");
  if (letters.length < 4) return false;
  if (/^(形|副|名|动|表|从|主|宾|易错|记忆|口诀)/.test(plain) && letters.length < 12) return false;
  return true;
}
function lessonFromFile(fp) {
  return path.relative(ROOT, fp).split(path.sep)[0];
}
function relToLesson(htmlPath, rel) {
  const lesson = lessonFromFile(htmlPath);
  const fileLesson = lessonFromFile(htmlPath);
  if (fileLesson === lesson) return rel;
  return path.posix.join("..", lesson, rel).replace(/\\/g, "/");
}

function chipHtml(plain) {
  const t = escapeAttr(plain);
  return ` <button type="button" class="tts-chip no-print" data-tts="${t}" aria-label="朗读">🔊</button>`;
}

function patchEnglishBlocks(html) {
  let n = 0;
  html = html.replace(/<li(\s[^>]*)?>([\s\S]*?)<\/li>/gi, (m, attrs, inner) => {
    if (/tts-chip|handout-blank/.test(inner)) return m;
    const plain = stripTags(inner);
    if (!isEnglishSpeakable(plain)) return m;
    n++;
    return `<li${attrs || ""}>${inner}${chipHtml(plain)}</li>`;
  });
  html = html.replace(/<p class="en-line"(\s[^>]*)?>([\s\S]*?)<\/p>/gi, (m, attrs, inner) => {
    if (/tts-chip/.test(inner)) return m;
    const plain = stripTags(inner);
    if (!isEnglishSpeakable(plain)) return m;
    n++;
    return `<p class="en-line"${attrs || ""}>${inner}${chipHtml(plain)}</p>`;
  });
  html = html.replace(/<td(\s[^>]*)?>([\s\S]*?)<\/td>/gi, (m, attrs, inner) => {
    if (/tts-chip|<th/i.test(inner) || /类型|结构|功能|引导/.test(stripTags(inner))) return m;
    const plain = stripTags(inner);
    if (!isEnglishSpeakable(plain)) return m;
    if (/^[\u3400-\u9fff\s·→、，。；：「」]+$/.test(plain.replace(/[a-zA-Z0-9°\s.,!?'"-]/g, ""))) return m;
    n++;
    return `<td${attrs || ""}>${inner}${chipHtml(plain)}</td>`;
  });
  return { html, chipsAdded: n };
}

function ensureBootstrap(lessonDir) {
  const dest = path.join(lessonDir, "assets", "lesson-tts-bootstrap.js");
  if (!fs.existsSync(path.join(lessonDir, "assets"))) fs.mkdirSync(path.join(lessonDir, "assets"), { recursive: true });
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(BOOT_SRC, dest);
    return true;
  }
  return false;
}

function injectAssets(html, htmlPath) {
  const lesson = lessonFromFile(htmlPath);
  if (!html.includes("grammar-handout-tts.css")) {
    const link = '  <link rel="stylesheet" href="../shared/grammar-handout-tts.css" />\n';
    html = html.includes("</head>") ? html.replace("</head>", link + "</head>") : link + html;
  }
  const bootRel = relToLesson(htmlPath, "assets/lesson-tts-bootstrap.js");
  const manRel = relToLesson(htmlPath, "assets/handout-tts-manifest.js");
  const playRel = "../shared/handout-tts.js";
  const block =
    `  <script src="${bootRel}"></script>\n` +
    `  <script src="${manRel}"></script>\n` +
    `  <script src="${playRel}" defer></script>\n`;
  if (!html.includes("handout-tts.js") && !html.includes("l01-handout-tts.js")) {
    if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, block + "</body>");
    else html += "\n" + block;
  }
  return html;
}

function extractTexts(html) {
  const out = [];
  for (const m of html.matchAll(/data-tts="([^"]+)"/g)) out.push(m[1]);
  return out.map(norm).filter((t) => isValidPhrase(t) && t.length >= 2);
}

function mergeManifests(lessonDir, texts, htmlPath) {
  const existing = new Map();
  const manPath = path.join(lessonDir, "assets", "handout-tts-manifest.js");
  const pageMan = path.join(lessonDir, "assets", "tts-manifest.js");
  const l10Man = path.join(lessonDir, "assets", "l10-tts-manifest.js");
  for (const p of [manPath, pageMan, l10Man]) {
    if (!fs.existsSync(p)) continue;
    const c = fs.readFileSync(p, "utf8");
    for (const m of c.matchAll(/("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g)) {
      try {
        const k = JSON.parse(m[1]);
        if (!isValidPhrase(k)) continue;
        existing.set(k, JSON.parse(m[2]));
      } catch {}
    }
  }
  for (const t of texts) {
    if (!isValidPhrase(t)) continue;
    const fn = mp3Name(t);
    existing.set(t, relToLesson(htmlPath, `assets/tts-mp3/${fn}`));
  }
  const lines = [...existing.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([text, rel]) => `  ${JSON.stringify(text)}: ${JSON.stringify(rel)}`);
  const body = `window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n${lines.join(",\n")}\n});\n`;
  fs.mkdirSync(path.dirname(manPath), { recursive: true });
  fs.writeFileSync(manPath, body, "utf8");
  return existing.size;
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

/** @type {Map<string, {text:string, lesson:string, fileName:string, voice:string}>} */
const jobs = new Map();

for (const rel of HANDOUT_SOURCES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) {
    console.warn("skip missing", rel);
    continue;
  }
  const lesson = lessonFromFile(fp);
  const lessonDir = path.join(ROOT, lesson);
  let html = fs.readFileSync(fp, "utf8");
  const { html: patched, chipsAdded } = patchEnglishBlocks(html);
  html = injectAssets(patched, fp);
  fs.writeFileSync(fp, html, "utf8");
  const bootNew = ensureBootstrap(lessonDir);
  const texts = extractTexts(html);
  const manCount = mergeManifests(lessonDir, texts, fp);
  console.log("patched", rel, "+chips", chipsAdded, "manifest", manCount, bootNew ? "+bootstrap" : "");
  for (const t of texts) {
    const fn = mp3Name(t);
    const id = `${lesson}|${fn}`;
    if (!jobs.has(id)) jobs.set(id, { text: t, lesson, fileName: fn, voice: pickVoice(t) });
  }
}

// 合并各课已有页面 manifest 中的条目（讲义可能引用课件 mp3）
for (const lesson of new Set([...jobs.values()].map((j) => j.lesson))) {
  const dir = path.join(ROOT, lesson, "assets");
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!/manifest\.js$/i.test(name)) continue;
    const c = fs.readFileSync(path.join(dir, name), "utf8");
    for (const m of c.matchAll(/("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")/g)) {
      try {
        const text = JSON.parse(m[1]);
        const url = JSON.parse(m[2]);
        if (!isValidPhrase(text)) continue;
        if (!/assets\/tts-mp3\//.test(url)) continue;
        const fn = path.basename(url);
        jobs.set(`${lesson}|${fn}`, { text, lesson, fileName: fn, voice: pickVoice(text) });
      } catch {}
    }
  }
}

console.log("\n讲义 TTS 待检查 MP3:", jobs.size);

let need = 0;
let got = 0;
const key = String(process.env.AZURE_SPEECH_KEY || process.env.SPEECH_KEY || "").trim();
const region = String(process.env.AZURE_SPEECH_REGION || "eastasia").trim();

for (const job of jobs.values()) {
  const out = path.join(ROOT, job.lesson, "assets", "tts-mp3", job.fileName);
  if (fs.existsSync(out) && fs.statSync(out).size > 80) continue;
  need++;
  if (patchOnly || !key) continue;
  try {
    await azureSynth(job.text, job.voice, key, region, out);
    got++;
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 90));
  } catch (e) {
    console.error("\nFAIL", job.lesson, job.fileName, e.message, job.text.slice(0, 50));
  }
}
console.log("\n缺失 MP3:", need - got, "新下载:", got);

if (need > 0 && !key && !patchOnly) {
  console.error("请设置 AZURE_SPEECH_KEY 后重新运行以下载缺失音频");
}

// 重建课堂同步讲义
const builds = [
  "build-l00-classroom-handout.mjs",
  "build-l00-svo-classroom-handout.mjs",
  "build-l02-classroom-handout.mjs",
  "build-l03-classroom-handout.mjs",
  "build-l05-classroom-handout.mjs",
  "build-l06-classroom-handout.mjs",
  "build-l07-classroom-handout.mjs",
  "build-l08-classroom-handout.mjs",
  "build-l09-classroom-handout.mjs",
  "build-l10-classroom-handout.mjs",
  "build-l11-classroom-handout.mjs",
  "build-l12-classroom-handout.mjs",
  "build-l13-classroom-handout.mjs",
  "build-l13rc-classroom-handout.mjs",
  "build-l14-classroom-handout.mjs",
];
console.log("\n重建课堂同步讲义…");
for (const b of builds) {
  const p = path.join(ROOT, "scripts", b);
  if (!fs.existsSync(p)) continue;
  const r = spawnSync(process.execPath, [p], { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) console.warn("build failed", b);
}

// 扩展 ensure-offline-tts（课件页 + L10 对比页完整句）
console.log("\n运行 ensure-offline-tts（课件页）…");
spawnSync(process.execPath, ["scripts/ensure-offline-tts.mjs", ...(patchOnly ? ["--skip-download"] : [])], {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
});

console.log("\n完成。可运行: node scripts/audit-tts-local.mjs");
